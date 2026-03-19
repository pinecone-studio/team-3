"use client";
import { useDeleteAssetMutation, useGetAssetsQuery, useUpdateAssetMutation } from "@/gql/graphql";
import AssetManagement from "./_components/AssetManagement";

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
      <div className="flex h-screen w-full items-center justify-center bg-[#F9FAFB]">
        <div className="text-center font-gilroy">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0251CB] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-500">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  const assets = data?.getAssets || [];

  return <AssetManagement refetch={refetch} assets={assets} onDelete={handleDelete} onUpdate={handleUpdate}/>;
}
