import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingCard } from "@/components/ui/loading";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { queryResult } = useShow({
    resource: "user",
    id: id,
  });
  const { data, isLoading, error } = queryResult;

  const record = data?.data;

  if (isLoading) {
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
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Loading User...</CardTitle>
            <CardDescription>Please wait while we fetch the user information</CardDescription>
          </CardHeader>
          <CardContent>
            <LoadingCard lines={8} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
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
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error Loading User</CardTitle>
            <CardDescription>Unable to load user information. This might be because the backend API is not running.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Since we're using hardcoded authentication, the user data endpoints are not available.</p>
              <p>This page will work once connected to a real backend API.</p>
            </div>
          </CardContent>
        </Card>
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