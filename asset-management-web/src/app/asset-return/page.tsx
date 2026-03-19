"use client";

import {
  useGetAdminEmployeesQuery,
  useGetAssetsReturnQuery,
  useGetEmployeeByIdQuery,
} from "@/gql/graphql";
import AssetReturnPageContent from "./_components/PageContent";
import { useUser } from "@clerk/nextjs";

export default function AssetReturnPage() {
  // const { user } = useUser();

  // const employeeId = user?.id;
  const employeeId = "-H7_24M85L-FMHKpkv4gp"; // test ID "tur"

  const {
    data: empData,
    loading: empLoading,
    error: empError,
  } = useGetEmployeeByIdQuery({
    // variables: { getEmployeeByIdId: employeeId || "" },
    // skip: !employeeId,
    variables: { getEmployeeByIdId: employeeId },
    skip: !employeeId,
  });

  const {
    data: assetData,
    loading: assetLoading,
    error: assetError,
  } = useGetAssetsReturnQuery();

  if (empLoading || assetLoading) return <p>Уншиж байна...</p>;
  if (empError || assetError) return <p>Алдаа гарлаа</p>;

  const employee = empData?.getEmployeeById;
  if (!employee || !employee.terminationDate)
    return <p>Буцаалтын мэдээлэл олдсонгүй.</p>;

  const userAssets =
    assetData?.getAssets?.filter((asset) => asset?.assignedTo === employeeId) ||
    [];
  const pageData = {
    deadline: "2026.03.20",
    lastWorkingDay: employee.terminationDate,
    daysLeft: 9,
    location: {
      room: "IT хэлтэс, 3-р давхар, 305 өрө",
      person: `${employee.firstName} ${employee.lastName}`,
      phone: "9911-2233",
    },
    assets: userAssets,
  };

  return <AssetReturnPageContent data={pageData} />;
}
