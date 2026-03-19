"use client"

import { useState } from "react"

import { Download, Printer, Plus, ImageIcon, Smartphone } from "lucide-react"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Table, TableBody, TableCell, TableRow, Tabs, TabsContent, TabsList, TabsTrigger } from "@/libs"
import { useGetAssetByIdQuery } from "@/gql/graphql"
import { useSearchParams } from "next/navigation"


const assetData = {
    id: "cmmtvvdgt0127rjiaet1skrq9",
    assetId: "SAM-0011",
    shelfQrId: "cpc5q8uxrr",
    name: "macbook (copy 10)",
    status: "Available",
    created: "3/17/2026, 8:37 AM",
    category: "notebook",
    description: "asdasd",
    value: "$123.00",
}

export default function AssetDetailPage() {
    const [availableForBookings, setAvailableForBookings] = useState(true)
    const searchParams = useSearchParams();
    const assetId = searchParams.get('assetId');

    // Hook-г condition-д оруулахгүй, skip ашиглана
    const { data, loading, error } = useGetAssetByIdQuery({
        variables: { getAssetByIdId: assetId ?? '' }, // id null бол placeholder
        skip: !assetId, // ⚡ assetId байхгүй бол query дуудаагүй
    });

    if (!assetId) return <p>No asset selected</p>;

    const asset = data?.getAssetById;

    console.log(asset)
    return (
        <div className="min-h-screen bg-background">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                        <Smartphone className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">{assetData.name}</h1>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-sm text-green-600">{assetData.status}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        <Tabs defaultValue="overview" >
                            <TabsList className="bg-transparent border-b rounded-none w-full justify-start p-0 h-auto space-x-2">
                                <TabsTrigger
                                    value="overview"
                                    className="flex-none rounded-none border-b-2  data-[state=active]:border-b-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2 text-muted-foreground data-[state=active]:text-primary"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activity"
                                    className="flex-none rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2 text-muted-foreground data-[state=active]:text-primary"
                                >
                                    Activity
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-6">
                                <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium text-muted-foreground w-40">ID</TableCell>
                                                <TableCell>{asset?.id}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium text-muted-foreground">Serial Дугаар</TableCell>
                                                <TableCell>{asset?.serialNumber}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="activity" className="mt-6">
                                <div className="border rounded-lg p-6 text-center text-muted-foreground">
                                    No activity yet
                                </div>
                            </TabsContent>

                            <TabsContent value="bookings" className="mt-6">
                                <div className="border rounded-lg p-6 text-center text-muted-foreground">
                                    No bookings yet
                                </div>
                            </TabsContent>

                            <TabsContent value="reminders" className="mt-6">
                                <div className="border rounded-lg p-6 text-center text-muted-foreground">
                                    No reminders set
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 space-y-6">
                        {/* Available for bookings */}
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium">Available for bookings</p>
                                <p className="text-sm text-muted-foreground">
                                    Asset is available for being used in bookings
                                </p>
                            </div>
                            <Switch
                                checked={availableForBookings}
                                onCheckedChange={setAvailableForBookings}
                            />
                        </div>

                        {/* Shelf QR Code Select */}
                        <div className="flex items-center gap-2">
                            <Select defaultValue="shelf-qr">
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Select QR Code" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="shelf-qr">Shelf QR Code</SelectItem>
                                    <SelectItem value="asset-qr">Asset QR Code</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* QR Code Card */}
                        <div className="border rounded-lg p-6">
                            <div className="flex flex-col items-center text-center">
                                <p className="font-medium mb-4">{assetData.name}</p>
                                {/* QR Code placeholder */}
                                <div className="w-32 h-32 bg-foreground p-2 rounded mb-4">
                                    <div className="w-full h-full bg-background flex items-center justify-center">
                                        <svg
                                            viewBox="0 0 100 100"
                                            className="w-full h-full"
                                        >
                                            {/* Simple QR code pattern */}
                                            <rect x="0" y="0" width="100" height="100" fill="white" />
                                            <rect x="5" y="5" width="25" height="25" fill="black" />
                                            <rect x="10" y="10" width="15" height="15" fill="white" />
                                            <rect x="13" y="13" width="9" height="9" fill="black" />
                                            <rect x="70" y="5" width="25" height="25" fill="black" />
                                            <rect x="75" y="10" width="15" height="15" fill="white" />
                                            <rect x="78" y="13" width="9" height="9" fill="black" />
                                            <rect x="5" y="70" width="25" height="25" fill="black" />
                                            <rect x="10" y="75" width="15" height="15" fill="white" />
                                            <rect x="13" y="78" width="9" height="9" fill="black" />
                                            {/* Random pattern for middle */}
                                            <rect x="35" y="5" width="5" height="5" fill="black" />
                                            <rect x="45" y="5" width="5" height="5" fill="black" />
                                            <rect x="55" y="5" width="5" height="5" fill="black" />
                                            <rect x="35" y="15" width="5" height="5" fill="black" />
                                            <rect x="50" y="15" width="5" height="5" fill="black" />
                                            <rect x="35" y="35" width="5" height="5" fill="black" />
                                            <rect x="45" y="35" width="10" height="10" fill="black" />
                                            <rect x="60" y="35" width="5" height="5" fill="black" />
                                            <rect x="35" y="50" width="5" height="5" fill="black" />
                                            <rect x="50" y="50" width="5" height="5" fill="black" />
                                            <rect x="60" y="50" width="5" height="5" fill="black" />
                                            <rect x="75" y="40" width="5" height="5" fill="black" />
                                            <rect x="85" y="45" width="5" height="5" fill="black" />
                                            <rect x="70" y="55" width="5" height="5" fill="black" />
                                            <rect x="80" y="60" width="5" height="5" fill="black" />
                                            <rect x="35" y="65" width="5" height="5" fill="black" />
                                            <rect x="50" y="70" width="5" height="5" fill="black" />
                                            <rect x="60" y="75" width="5" height="5" fill="black" />
                                            <rect x="70" y="70" width="25" height="25" fill="black" />
                                            <rect x="75" y="75" width="15" height="15" fill="white" />
                                            <rect x="78" y="78" width="9" height="9" fill="black" />
                                            <rect x="45" y="85" width="5" height="5" fill="black" />
                                            <rect x="55" y="90" width="5" height="5" fill="black" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{assetData.shelfQrId}</p>
                                <p className="text-sm text-muted-foreground">
                                    Powered by <span className="font-semibold text-foreground">shelf.nu</span>
                                </p>
                            </div>
                        </div>

                        {/* Download and Print buttons */}
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                            </Button>
                        </div>

                        {/* Waiting for QR scan */}
                        <div className="border rounded-lg p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-lg border flex items-center justify-center mb-4">
                                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p className="font-medium">Waiting for first QR code scan</p>
                                <p className="text-sm text-muted-foreground">
                                    {"Scan your asset's QR code with a"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
