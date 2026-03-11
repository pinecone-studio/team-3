"use client";
import { useTestQueryQuery } from "@/gql/graphql";
import { Button, Input } from "../libs";
import { HomePage } from "./_components/HomePage";

export default function Home() {
  // const { data, loading, error, refetch } = useTestQueryQuery()
  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>

  return <div><HomePage/></div>;
}
