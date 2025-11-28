import React, { useState } from "react";
import { IResourceComponentsProps, useCustom, useCustomMutation } from "@refinedev/core";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, UserIcon, CubeIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { LoadingCard } from "@/components/ui/loading";
import { ProductReport, ReportStatus } from "@/types/report";

const statusColors: Record<ReportStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export const ProductReportShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newStatus, setNewStatus] = useState<ReportStatus | "">("");
  const [adminNotes, setAdminNotes] = useState("");

  const { data, isLoading, refetch } = useCustom<ProductReport>({
    url: `reports/product/${id}`,
    method: "get",
  });

  const { mutate: updateStatus, isLoading: isUpdating } = useCustomMutation();

  const report = data?.data;

  const handleUpdateStatus = () => {
    if (!newStatus) return;

    updateStatus(
      {
        url: `reports/${id}/status`,
        method: "patch",
        values: {
          status: newStatus,
          adminNotes: adminNotes || null,
        },
      },
      {
        onSuccess: () => {
          refetch();
          setNewStatus("");
          setAdminNotes("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/reports/product")}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Product Reports
        </Button>
        <Card>
          <CardHeader>
            <LoadingCard lines={2} />
          </CardHeader>
          <CardContent>
            <LoadingCard lines={6} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/reports/product")}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Product Reports
        </Button>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Report not found
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/reports/product")}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Product Reports
        </Button>
        <h1 className="text-2xl font-bold">Product Report Details</h1>
        <Badge className={statusColors[report.status]} variant="secondary">
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Reporter Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reporter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{report.reporter.name}</p>
                <p className="text-sm text-muted-foreground">{report.reporter.email}</p>
              </div>
            </div>
            <Badge variant="outline">{report.reporter.role}</Badge>
          </CardContent>
        </Card>

        {/* Product Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reported Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              {report.product?.thumbnail ? (
                <img
                  src={report.product.thumbnail}
                  alt={report.product.name}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                  <CubeIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className="font-medium">{report.product?.name || "N/A"}</p>
                <p className="text-sm text-muted-foreground">
                  ${Number(report.product?.price || 0).toFixed(2)}
                </p>
              </div>
            </div>
            <Badge variant="outline">{report.product?.status || "unknown"}</Badge>
          </CardContent>
        </Card>

        {/* Seller Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Seller</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <BuildingStorefrontIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{report.seller?.storeName || "N/A"}</p>
                <p className="text-sm text-muted-foreground">{report.seller?.email || "N/A"}</p>
              </div>
            </div>
            {report.seller?.phoneNumber && (
              <p className="text-sm text-muted-foreground">Phone: {report.seller.phoneNumber}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Reason */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Report Reason</CardTitle>
          <CardDescription>
            Reported on {new Date(report.createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{report.reason}</p>
          {report.adminNotes && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground mb-1">Admin Notes:</p>
              <p className="text-sm">{report.adminNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Update Status</CardTitle>
          <CardDescription>Change the report status and add notes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ReportStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Admin Notes (Optional)</Label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes about your decision..."
              rows={3}
            />
          </div>
          <Button onClick={handleUpdateStatus} disabled={!newStatus || isUpdating}>
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
