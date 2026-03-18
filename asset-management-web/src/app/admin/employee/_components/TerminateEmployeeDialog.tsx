"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/libs";
import { AlertTriangle, Calendar, UserX, X } from "lucide-react";
import { EmployeeStatus, useUpdateEmployeeMutation } from "@/gql/graphql";

interface TerminateEmployeeDialogProps {
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    employeeCode: string;
    department: string;
  };
  onClose: () => void;
  onConfirm: (employeeId: string, terminationDate: string) => void;
}

export default function TerminateEmployeeDialog({
  employee,
  onClose,
  onConfirm,
}: TerminateEmployeeDialogProps) {
  const [loading, setLoading] = useState(false);
  const [terminationDate, setTerminationDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [updateEmployee] = useUpdateEmployeeMutation();

  const handleConfirm = async () => {
    if (!terminationDate) return;

    setLoading(true);
    try {
      await updateEmployee({
        variables: {
          updateEmployeeId: employee.id,
          input: {
            terminationDate,
            status: EmployeeStatus.Terminated,
          },
        },
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-md bg-white">
        <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-[18px] font-bold text-gray-900">
            Ажлаас чөлөөлөх
          </DialogTitle>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          ></button>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-8">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-gray-900">
                Ажилтны мэдээлэл
              </h3>
              <p className="text-[12px] text-gray-400">
                Сонгогдсон ажилтны үндсэн мэдээлэл
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-gray-900">
                  Ажилтны нэр
                </label>
                <div className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] text-gray-700 font-medium">
                  {employee.lastName} {employee.firstName}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-gray-900">
                  Ажилтны код
                </label>
                <div className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] text-gray-700 font-medium">
                  {employee.employeeCode}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-gray-900">
                Чөлөөлөх мэдээлэл
              </h3>
              <p className="text-[12px] text-gray-400">
                Ажлаас чөлөөлөх огноо болон шалтгаан
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-gray-900 flex items-center gap-1">
                Чөлөөлөх огноо <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={terminationDate}
                  onChange={(e) => setTerminationDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[12px] text-amber-900 font-bold">
                  Анхааруулга
                </p>
                <p className="text-[11px] text-amber-800/80 leading-relaxed">
                  Ажилтныг системээс хассанаар түүний хандах эрхүүд болон
                  идэвхтэй төлөвүүд цуцлагдах болно. Энэ үйлдлийг буцаах
                  боломжгүй.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-[13px] font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
              disabled={loading}
            >
              Болих
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading || !terminationDate}
              className="px-8 py-2.5 bg-[#2F6FED] text-white text-[13px] font-bold rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Уншиж байна...
                </>
              ) : (
                "Хадгалах"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
