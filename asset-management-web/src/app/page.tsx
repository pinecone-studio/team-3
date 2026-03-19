"use client";
import { useEffect } from "react"; // 1. Add this import
import { useUser } from "@clerk/nextjs";
import { HomePage } from "./_components/HomePage";
import { useEmployee } from "./_providers/user-provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const { employee } = useEmployee();
  const router = useRouter();

  useEffect(() => {
    // 2. Move the logic inside useEffect
    if (employee) {
      router.push("/employee-dashboard");
    }
  }, [employee, router]); // 3. Run whenever employee data is loaded/updated

  // 4. Return a "Loading" state or null to prevent flickering
  // of the Admin page before the redirect happens.
  if (!employee) return <div>Уншиж байна...</div>;
  if (!employee.isAdmin) return null;

  return (
    <div>
      <HomePage />
    </div>
  );
}
