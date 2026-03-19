"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery, gql } from "@apollo/client";
import { Employee } from "@/gql/graphql";
import { useUser } from "@clerk/nextjs";

const GET_EMPLOYEE_BY_CLERK_ID = gql`
  query GetEmployeeByClerkID($clerkId: String!) {
    getEmployeeByClerkID(clerkId: $clerkId) {
      id
      clerkId
      firstName
      lastName
      email
      status
      hireDate
      terminationDate
      role
    }
  }
`;

type UserContextType = {
  employee: Employee | null;
  isLoading: boolean;
  isSignedIn: boolean;
  error: Error | undefined;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const { user, isLoaded, isSignedIn } = useUser();

  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery(GET_EMPLOYEE_BY_CLERK_ID, {
    variables: { clerkId: user?.id ?? "" },
    skip: !isLoaded || !isSignedIn || !user?.id,
  });

  const isLoading = !isLoaded || queryLoading;

  const employee: Employee | null = data?.getEmployeeByClerkID ?? null;

  return (
    <UserContext.Provider
      value={{ employee, isLoading, isSignedIn: !!isSignedIn, error }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useEmployee(): UserContextType {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useEmployee must be used within a UserProvider");
  }
  return context;
}

export function useRequiredEmployee(): Employee {
  const { employee, isLoading } = useEmployee();
  if (isLoading || !employee) {
    throw new Error("Employee data is not available yet");
  }
  return employee;
}
