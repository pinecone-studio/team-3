"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/libs";

import { AssetStatusEnum, useCreateAssignmentMutation } from "@/gql/graphql";
import { User, Package, AlertCircle, X, ChevronDown } from "lucide-react";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  employeeCode: string;
};

interface Asset {
  id: string;
  assetTag: string;
  model?: string;
  status: AssetStatusEnum;
  category?: {
    id: string;
    name: string;
  } | null;
}

interface AssetAssignDialogProps {
  employee: Employee;
  availableAssets: Asset[];
  onClose: () => void;
}

export default function AssetAssignDialog({
  employee,
  availableAssets,
  onClose,
}: AssetAssignDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [loading, setLoading] = useState(false);
  const [createAssignment] = useCreateAssignmentMutation();

  const handleAssign = async () => {
    if (!selectedAssetId) return;
    setLoading(true);
    try {
      const res = await createAssignment({
        variables: {
          input: {
            employeeId: employee.id,
            assetId: selectedAssetId,
            conditionAtAssign: "New",
          },
        },
      });

      if (res.data?.createAssignment) {
        onClose();
        alert("Амжилттай олголоо");
      }
    } catch (err) {
      console.error("Assignment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const categoriesUniqueById = availableAssets
    .map((a) => a.category)
    .filter((c): c is { id: string; name: string } => !!c)
    .reduce<{ id: string; name: string }[]>((acc, curr) => {
      if (!acc.find((c) => c.id === curr.id)) acc.push(curr);
      return acc;
    }, []);

  const categories = categoriesUniqueById.map((c) => c.name);

  const filteredAssets = selectedCategory
    ? availableAssets.filter(
        (a) =>
          a.category?.name === selectedCategory && a.status === "AVAILABLE",
      )
    : [];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-md bg-white">
        <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div>
              <DialogTitle className="text-[18px] font-bold text-gray-900">
                Хөрөнгө олгох
              </DialogTitle>
              <p className="text-[12px] text-gray-400 font-normal mt-0.5">
                Ажилтанд шинэ хөрөнгө бүртгэх
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-6">
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
            <div className="w-11 h-11 bg-white rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-gray-800">
                {employee.lastName[0]}. {employee.firstName}
              </p>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">
                {employee.employeeCode} • {employee.department}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-900 px-1">
                Ангилал сонгох <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#2F6FED]/10 focus:border-[#2F6FED] transition-all cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedAssetId("");
                  }}
                  disabled={loading || categories.length === 0}
                >
                  <option value="" disabled>
                    -- Ангилал сонгох --
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-900 px-1">
                Олгох хөрөнгө сонгох <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#2F6FED]/10 focus:border-[#2F6FED] transition-all cursor-pointer disabled:bg-gray-50/50"
                  value={selectedAssetId}
                  onChange={(e) => setSelectedAssetId(e.target.value)}
                  disabled={
                    loading || !selectedCategory || filteredAssets.length === 0
                  }
                >
                  <option value="" disabled>
                    -- Сонгох --
                  </option>
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetTag} {asset.model ? `- ${asset.model}` : ""}
                      </option>
                    ))
                  ) : (
                    <option disabled>Боломжтой хөрөнгө алга</option>
                  )}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {filteredAssets.length === 0 && selectedCategory && (
                <div className="flex items-center gap-1.5 px-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <p className="text-[11px] text-amber-600 font-medium">
                    Энэ ангилалд олгох боломжтой хөрөнгө байхгүй байна.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 text-[13px] font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Цуцлах
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedAssetId || loading}
              className="flex-1 py-3 text-[13px] font-bold text-white bg-[#2F6FED] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-[#2F6FED]/20 disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Уншиж байна...</span>
                </div>
              ) : (
                "Олгох"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
