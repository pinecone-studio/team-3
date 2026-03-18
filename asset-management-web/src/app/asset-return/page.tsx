"use client";

import {
  useGetAdminEmployeesQuery,
  useGetAssetsReturnQuery,
} from "@/gql/graphql";
import AssetReturnPageContent from "./_components/PageContent";

export default function AssetReturnPage() {
  const { data, loading, error } = useGetAdminEmployeesQuery();
  const {
    data: assetData,
    loading: assetLoading,
    error: assetError,
  } = useGetAssetsReturnQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (loading || assetLoading) return <p>Loading...</p>;
  if (error || assetError) return <p>Error гарлаа</p>;

  const storedEmployeeId =
    typeof window !== "undefined" ? localStorage.getItem("employeeId") : null;

  const employeesWithTermination = data?.getEmployees.filter(
    (emp) => emp.terminationDate !== null,
  );

  const employeeToShow = employeesWithTermination?.find(
    (emp) => emp.id === storedEmployeeId,
  );

  if (!employeeToShow) return <p>Буцаалтын мэдээлэл олдсонгүй.</p>;
  const userAssets =
    assetData?.getAssets.filter(
      (asset) => asset.assignedTo === storedEmployeeId,
    ) || [];
  const pageData = {
    deadline: "2026.03.20",
    lastWorkingDay: employeeToShow.terminationDate,
    daysLeft: 9,
    location: {
      room: "IT хэлтэс, 3-р давхар, 305 өрө",
      person: `${employeeToShow.firstName} ${employeeToShow.lastName}`,
      phone: "9911-2233",
    },
    assets: userAssets,
  };

  return <AssetReturnPageContent data={pageData} />;
}
