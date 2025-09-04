import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const RiderShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { queryResult } = useShow({
    resource: "riders",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading rider...</div>
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
            onClick={() => navigate("/riders")}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Riders
          </Button>
          <h1 className="text-2xl font-bold">Rider Details</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/riders/edit/${record?.id}`)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rider #{record?.id}</CardTitle>
          <CardDescription>View rider information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <div className="text-sm">{record?.id || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <div className="text-sm">{record?.name || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="text-sm">{record?.email || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <div className="text-sm">{record?.phone || record?.phoneNumber || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="text-sm">
                <Badge variant={
                  record?.status === 'active' ? 'default' : 
                  record?.status === 'inactive' ? 'secondary' : 'destructive'
                }>
                  {record?.status || "Unknown"}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Vehicle Type</label>
              <div className="text-sm">{record?.vehicleType || "N/A"}</div>
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