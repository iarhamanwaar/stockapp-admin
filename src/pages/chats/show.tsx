import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";

export const ChatShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { queryResult } = useShow({
    resource: "chats",
    id: id,
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading chat...</div>
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
            onClick={() => navigate("/chats")}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Chats
          </Button>
          <h1 className="text-2xl font-bold">Chat Details</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat #{record?.id}</CardTitle>
          <CardDescription>View chat conversation details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <div className="text-sm">{record?.id || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="text-sm">
                <Badge>{record?.status || "Active"}</Badge>
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
          
          {record?.participants && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Participants</label>
              <div className="mt-2 space-y-2">
                {record.participants.map((participant: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                      {participant.name?.[0] || "U"}
                    </div>
                    <span className="text-sm">{participant.name || participant.email || "Unknown User"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};