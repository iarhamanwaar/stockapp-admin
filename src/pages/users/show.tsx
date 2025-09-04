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

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { queryResult } = useShow({
    resource: "user",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading user...</div>
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
            onClick={() => navigate("/users")}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/users/edit/${record?.id}`)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User #{record?.id}</CardTitle>
          <CardDescription>View user information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <div className="text-sm">{record?.id || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="text-sm">{record?.email || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <div className="text-sm">
                <Badge variant="secondary">{record?.role || "User"}</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
              <div className="text-sm">{record?.phoneNumber || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Verified</label>
              <div className="text-sm">
                <Badge variant={record?.isVerified ? 'default' : 'destructive'}>
                  {record?.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};