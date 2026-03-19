"use client";

import { Plus, Upload } from "lucide-react";
import {
  DialogTrigger,
  Dialog,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  DialogFooter,
} from "@/libs";
import { useState } from "react";
import {
  GetMaintenanceTicketsDocument,
  useCreateMaintenanceTicketMutation,
  useGetAssetsByEmployeeIdForReportQuery,

} from "@/gql/graphql";
import { useEmployee } from "@/app/_providers/user-provider";

export default function ReportDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [description, setDescription] = useState("");
  const { employee } = useEmployee();

  const employeeId = employee?.id;

  const { data, loading: assetsLoading } =
    useGetAssetsByEmployeeIdForReportQuery({
      variables: {
        employeeId: employeeId as string,
      },
      skip: !employeeId,
    });
  console.log("asset data", data);
  console.log("employee", employeeId);

  const assets =
    data?.getAssetsByEmployeeId?.filter(
      (asset): asset is NonNullable<typeof asset> => asset !== null,
    ) || [];

  const [createTicket, { loading }] = useCreateMaintenanceTicketMutation();

  const handleSubmit = async () => {
    if (!selectedAsset || !description.trim() || !employeeId) return;

    try {
      await createTicket({
        variables: {
          input: {
            assetId: selectedAsset,
            description: description.trim(),
            reporterId: employeeId,
          },
        },
        refetchQueries: [{ query: GetMaintenanceTicketsDocument }],
      });

      setDialogOpen(false);
      setSelectedAsset("");
      setDescription("");
    } catch (err) {
      console.error("Create ticket error:", err);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0251CB] hover:bg-[#0241a1] h-[36px] px-4 text-white text-[14px] font-medium rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Шинэ мэдэгдэл
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-[500px] flex flex-col p-6 rounded-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-[20px] font-semibold">
            Асуудал мэдэгдэх
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4 w-full">
          <div className="space-y-2">
            <Label>Төхөөрөмж сонгох</Label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="w-full py-5 border-[#E2E8F0]">
                <SelectValue placeholder="Төхөөрөмж сонгоно уу" />
              </SelectTrigger>

              <SelectContent>
                {assetsLoading ? (
                  <div className="p-2 text-sm text-gray-500">
                    Түр хүлээнэ үү...
                  </div>
                ) : assets.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500">
                    Төхөөрөмж олдсонгүй
                  </div>
                ) : (
                  assets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.category?.name} ({asset.assetTag})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Тайлбар</Label>
            <Textarea
              className="border-[#E2E8F0] h-[85px] p-2 resize-none"
              placeholder="Асуудлаа дэлгэрэнгүй тайлбарлана уу..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Зураг хавсаргах</Label>
            <div className="border border-dashed border-[#E2E8F0] rounded-xl p-8 text-center bg-[#F8FAFC]">
              <Upload className="h-6 w-6 mx-auto text-[#94A3B8] mb-2" />
              <p className="text-[13px] text-[#64748B]">
                Зураг чирж оруулах эсвэл
                <span className="text-[#0251CB] font-medium">Файл сонгох</span>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 flex">
          <Button
            variant="outline"
            className="h-10 w-[220px]"
            onClick={() => setDialogOpen(false)}
          >
            Буцах
          </Button>

          <Button
            className="bg-[#0251CB] w-[220px] h-10 text-white"
            disabled={!selectedAsset || !description || loading}
            onClick={handleSubmit}
          >
            {loading ? "Илгээж байна..." : "Илгээх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
