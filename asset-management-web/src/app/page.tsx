"use client";
import { ClerkDegraded, useUser } from "@clerk/nextjs";
import { HomePage } from "./_components/HomePage";

export default function Home() {
  const { user } = useUser();
  console.log(user?.id);
  return (
    <div>
      <HomePage />
    </div>
  );
}
