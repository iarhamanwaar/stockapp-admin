import React, { useState } from "react";
import { IResourceComponentsProps, useCustom } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EyeIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { LoadingTable } from "@/components/ui/loading";
import { ChatReport, ReportStatus } from "@/types/report";

const statusColors: Record<ReportStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export const ChatReportList: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const limit = 10;

  const { data, isLoading } = useCustom<{
    data: ChatReport[];
    total: number;
    page: number;
    totalPages: number;
  }>({
    url: `reports/chat`,
    method: "get",
    config: {
      query: {
        page,
        limit,
        ...(status !== "all" && { status }),
      },
    },
  });

  const reports = data?.data?.data || [];
  const total = data?.data?.total || 0;
  const totalPages = data?.data?.totalPages || 1;

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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Chat Reports</CardTitle>
              <CardDescription>Review and manage chat-related reports</CardDescription>
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingTable rows={5} columns={6} />
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No chat reports found
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-sm">
                              {getDisplayName(report.reporter)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {report.reporter.email || report.reporter.phoneNumber || "N/A"}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {report.reporter.role}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-sm">
                              {getDisplayName(report.reportedUser)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {report.reportedUser.email || report.reportedUser.phoneNumber || "N/A"}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {report.reportedUser.role}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm max-w-[200px] truncate">{report.reason}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[report.status]} variant="secondary">
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/reports/chat/show/${report.id}`)}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {reports.length} of {total} reports
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <span className="flex items-center px-3 text-sm">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
