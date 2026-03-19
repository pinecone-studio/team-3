"use client";
import {
  useDeleteAssetMutation,
  useGetAssetsQuery,
  useUpdateAssetMutation,
} from "@/gql/graphql";
import AssetManagement from "./_components/AssetManagement";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function AdminAssetPage() {
  const { data, loading, error, refetch } = useGetAssetsQuery();
  const [deleteAsset] = useDeleteAssetMutation();
  const [updateAsset] = useUpdateAssetMutation();
  const handleDelete = async (id: string) => {
    if (!confirm("Та энэ хөрөнгийг устгахдаа итгэлтэй байна уу?")) return;

    try {
      await deleteAsset({ variables: { deleteAssetId: id } });
      alert("Хөрөнгө амжилттай устлаа!");
      refetch();
    } catch (err: any) {
      console.error(err);
      alert("Устгах үед алдаа гарлаа: " + err.message);
    }
  };
  const handleUpdate = async (id: string, input: any) => {
    try {
      await updateAsset({ variables: { updateAssetId: id, input } });
      alert("Хөрөнгө амжилттай шинэчлэгдлээ!");
      refetch();
    } catch (err: any) {
      console.error(err);
      alert("Шинэчлэх үед алдаа гарлаа: " + err.message);
    }
  };

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-6 text-center">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <p className="text-red-600 font-bold font-gilroy">Алдаа гарлаа!</p>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        {/* Controlled size container */}
        <div className="w-32 h-32 md:w-48 md:h-48">
          <DotLottieReact
            src="/loader.lottie"
            loop
            autoplay
            onError={(error) => console.error("Lottie Error:", error)}
          />
        </div>
      </div>
    );
  }

  const assets = data?.getAssets || [];

  return (
    <AssetManagement
      refetch={refetch}
      assets={assets}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}
