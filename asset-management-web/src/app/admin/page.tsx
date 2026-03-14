"use client";
// import { useTestQueryQuery } from "@/gql/graphql";
import AdminHomePage from "./homepage/page";

export default function AdminPage() {
  // const { data, loading, error, refetch } = useTestQueryQuery()
  // console.log(data);

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {" "}
      <AdminHomePage />{" "}
    </div>
  );
}
