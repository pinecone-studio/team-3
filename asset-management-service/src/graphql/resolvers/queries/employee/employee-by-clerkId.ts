import { eq } from "drizzle-orm";
import { createDB, employees } from "../../../../db";
import {  EmployeeStatus, QueryResolvers } from "../../../../types/generated";

export const getEmployeeByClerkID: QueryResolvers['getEmployeeByClerkID'] =
  async (_, { clerkId }, context) => {

    const DB = createDB(context.env)

    const [employee] = await DB
      .select()
      .from(employees)
      .where(eq(employees.clerkId, clerkId))

      return {
        ...employee,
        hireDate: employee.hireDate.toISOString(),
        terminationDate: employee.terminationDate?.toISOString() ?? null,
        clerkId: employee.clerkId ?? "", 
        status: employee.status ?? EmployeeStatus.Active
      }
}