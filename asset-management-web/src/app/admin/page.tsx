"use client";

import dynamic from "next/dynamic";

const AdminHomePage = dynamic(() => import("./homepage/page"), { ssr: false });
export default function AdminPage() {
  // const { data, loading, error, refetch } = useTestQueryQuery()
  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {" "}
      <AdminHomePage />{" "}
    </div>
  );
}
