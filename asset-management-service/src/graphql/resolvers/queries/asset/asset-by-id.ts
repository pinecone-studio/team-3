import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../../types/generated';
import { assets, categories, department, subCategory } from '../../../../db';
import { eq, isNull } from 'drizzle-orm';

export const getAssetById: QueryResolvers['getAssetById'] = async (_, { id }, context) => {
  const DB = drizzle(context.env.DB);

  const result = await DB
    .select({
      asset: assets,
      category: categories,
      subCategory: subCategory,
      department: department,
    })
    .from(assets)
    .leftJoin(categories, eq(assets.categoryId, categories.id))
    .leftJoin(subCategory, eq(assets.subCategoryId, subCategory.id))
    .leftJoin(department, eq(assets.departmentId, department.id))
    .where(eq(assets.id, id))
    .get();

  if (!result) {
    throw new Error(`Asset with id "${id}" not found`);
  }

  const { asset, category, subCategory: sub, department: dept } = result;

  return {
    ...asset,
    category: category ?? undefined,
    subCategory: sub ?? undefined,
    department: dept ?? undefined,
    purchaseDate: asset.purchaseDate
      ? asset.purchaseDate.toISOString().split('T')[0]
      : undefined,
    deletedAt: asset.deletedAt
      ? asset.deletedAt.toISOString()
      : undefined,
    assignedTo: asset.assignedTo ?? undefined,
    serialNumber: asset.serialNumber ?? undefined,
    locationId: asset.locationId ?? undefined,
    purchaseCost: asset.purchaseCost ?? undefined,
    currentBookValue: asset.currentBookValue ?? undefined,
  };
};