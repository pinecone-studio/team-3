import { drizzle } from 'drizzle-orm/d1';
import { EmployeeStatus, QueryResolvers } from '../../../../types/generated';
import { assets, employees } from '../../../../db';
import { eq } from 'drizzle-orm';

export const getEmployees: QueryResolvers['getEmployees'] = async (_, __, context) => {
  const DB = drizzle(context.env.DB);

  const result = await DB.select().from(employees);

  const mapped = await Promise.all(
    result.map(async (emp) => {
      const employeeAssets = await DB
        .select()
        .from(assets)
        .where(eq(assets.assignedTo, emp.id));

      return {
        ...emp,
        id: emp.id.toString(),
        assetLength: employeeAssets.length, 
        status: (emp.status as EmployeeStatus) ?? EmployeeStatus.Active,
        hireDate: emp.hireDate ? new Date(emp.hireDate).toISOString() : '',
        terminationDate: emp.terminationDate
          ? new Date(emp.terminationDate).toISOString()
          : undefined,
        imageUrl: emp.imageUrl ?? undefined,
        birthDayAndMonth: emp.birthDayAndMonth ?? undefined,
        birthdayPoster: emp.birthdayPoster ?? undefined,
        github: emp.github ?? undefined,
        clerkId: emp.clerkId ?? '',
        role: emp.role ?? 'Employee',
        isAdmin: emp.isAdmin ?? false,
        isSalaryCompany: emp.isSalaryCompany ?? true,
        isKpi: emp.isKpi ?? false,
      };
    })
  );

  return mapped;
};