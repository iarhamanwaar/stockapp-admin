import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useCustomMutation,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "/admin-api";

export const PricingShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { queryResult } = useShow({
    resource: "pricing",
    id: id,
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const handleActivate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}${API_BASE_PATH}/pricing/${id}/activate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error activating pricing config:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading pricing configuration...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/pricing")}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Pricing
          </Button>
          <h1 className="text-2xl font-bold">Pricing Configuration Details</h1>
          {record?.isActive && (
            <Badge className="bg-green-600">Active</Badge>
          )}
        </div>
        <div className="flex gap-2">
          {!record?.isActive && (
            <Button
              variant="default"
              size="sm"
              onClick={handleActivate}
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Activate
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/pricing/edit/${record?.id}`)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Percentages</CardTitle>
          <CardDescription>Service fees and commission rates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Service Fee %</label>
              <div className="text-2xl font-bold">{record?.serviceFeePercentage || 0}%</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Vendor Commission %</label>
              <div className="text-2xl font-bold">{record?.vendorCommissionPercentage || 0}%</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tax %</label>
              <div className="text-2xl font-bold">{record?.taxPercentage || 0}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Fees</CardTitle>
          <CardDescription>Base delivery fee and variable rates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Base Fee (MXN)</label>
              <div className="text-xl font-semibold">${record?.deliveryBaseFee || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Surge Fee (MXN)</label>
              <div className="text-xl font-semibold">${record?.deliverySurgeFee || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Rate per km (MXN)</label>
              <div className="text-xl font-semibold">${record?.deliveryRatePerKm || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Rate per kg (MXN)</label>
              <div className="text-xl font-semibold">${record?.deliveryRatePerKg || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Rate per m³ (MXN)</label>
              <div className="text-xl font-semibold">${record?.deliveryRatePerCubicMeter || 0}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rider Payout</CardTitle>
          <CardDescription>Rider compensation structure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Pickup Fee (MXN)</label>
              <div className="text-xl font-semibold">${record?.riderPickupFee || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Dropoff Fee (MXN)</label>
              <div className="text-xl font-semibold">${record?.riderDropoffFee || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Distance Fee per km (MXN)</label>
              <div className="text-xl font-semibold">${record?.riderDistanceFeePerKm || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Bonus Fee (MXN)</label>
              <div className="text-xl font-semibold">${record?.riderBonusFee || 0}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Small Order Settings</CardTitle>
          <CardDescription>Minimum order threshold and fee</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Small Order Threshold (MXN)</label>
              <div className="text-xl font-semibold">${record?.smallOrderThreshold || 0}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Small Order Fee (MXN)</label>
              <div className="text-xl font-semibold">${record?.smallOrderFee || 0}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notes</label>
              <div className="text-sm">{record?.notes || "No notes"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created At</label>
              <div className="text-sm">
                {record?.createdAt
                  ? new Date(record.createdAt).toLocaleString()
                  : "N/A"
                }
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Updated At</label>
              <div className="text-sm">
                {record?.updatedAt
                  ? new Date(record.updatedAt).toLocaleString()
                  : "N/A"
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
