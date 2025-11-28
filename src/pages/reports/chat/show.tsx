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
import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { LoadingCard } from "@/components/ui/loading";
import { ChatReport, ReportStatus } from "@/types/report";

const statusColors: Record<ReportStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export const ChatReportShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newStatus, setNewStatus] = useState<ReportStatus | "">("");
  const [adminNotes, setAdminNotes] = useState("");

  const { data, isLoading, refetch } = useCustom<ChatReport>({
    url: `reports/chat/${id}`,
    method: "get",
  });

  const { mutate: updateStatus, isLoading: isUpdating } = useCustomMutation();

  const report = data?.data;

  // Helper to get display name - use email username if name is "Unknown User" or empty
  const getDisplayName = (user: { name?: string; email?: string; phoneNumber?: string | null }) => {
    if (user.name && user.name !== "Unknown User") {
      return user.name;
    }
    if (user.email) {
      return user.email.split("@")[0];
    }
    return user.phoneNumber || "Unknown";
  };

  // Helper to get sender display name from chat message
  const getSenderDisplayName = (message: { senderName?: string; senderId: string }) => {
    if (message.senderName && message.senderName !== "Unknown User") {
      return message.senderName;
    }
    // Try to match senderId with reporter or reportedUser to get better name
    if (report) {
      if (message.senderId === report.reporter.id) {
        return getDisplayName(report.reporter);
      }
      if (message.senderId === report.reportedUser.id) {
        return getDisplayName(report.reportedUser);
      }
    }
    return message.senderName || "Unknown";
  };

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
        <Button variant="outline" size="sm" onClick={() => navigate("/reports/chat")}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Chat Reports
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
        <Button variant="outline" size="sm" onClick={() => navigate("/reports/chat")}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Chat Reports
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
        <Button variant="outline" size="sm" onClick={() => navigate("/reports/chat")}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Chat Reports
        </Button>
        <h1 className="text-2xl font-bold">Chat Report Details</h1>
        <Badge className={statusColors[report.status]} variant="secondary">
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
                <p className="font-medium">
                  {getDisplayName(report.reporter)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {report.reporter.email || report.reporter.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
            {report.reporter.email && report.reporter.phoneNumber && (
              <p className="text-sm text-muted-foreground">Phone: {report.reporter.phoneNumber}</p>
            )}
            <Badge variant="outline">{report.reporter.role}</Badge>
          </CardContent>
        </Card>

        {/* Reported User Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reported User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium">
                  {getDisplayName(report.reportedUser)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {report.reportedUser.email || report.reportedUser.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
            {report.reportedUser.email && report.reportedUser.phoneNumber && (
              <p className="text-sm text-muted-foreground">Phone: {report.reportedUser.phoneNumber}</p>
            )}
            <Badge variant="outline">{report.reportedUser.role}</Badge>
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

      {/* Chat Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Chat Messages</CardTitle>
          <CardDescription>Last 15 messages from the reported chat</CardDescription>
        </CardHeader>
        <CardContent>
          {report.chatMessages && report.chatMessages.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {report.chatMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{getSenderDisplayName(message)}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm break-words">{message.content}</p>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="mt-2 max-w-[200px] rounded-md"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No messages available</p>
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
