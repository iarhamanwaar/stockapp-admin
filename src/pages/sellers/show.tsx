import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useInvalidate,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { SellerWithApproval } from "@/types/approval";
import { ApprovalStatusBadge } from "@/components/ApprovalStatusBadge";
import { DocumentViewer } from "@/components/DocumentViewer";
import { ApprovalActions } from "@/components/ApprovalActions";

export const SellerShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const invalidate = useInvalidate();

  const { queryResult } = useShow({
    resource: "sellers",
    id: id,
  });
  const { data, isLoading } = queryResult;

  const record = data?.data as SellerWithApproval;

  // Transform flat document URLs into DocumentViewer format
  const transformedDocuments = React.useMemo(() => {
    if (!record) return null;

    const docs: any = {};

    // Helper to extract filename from URL
    const getFileName = (url: string): string => {
      try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        return pathname.split('/').pop() || 'document';
      } catch {
        return 'document';
      }
    };

    // Transform business license
    if (record.businessLicenseUrl) {
      docs.businessLicense = {
        url: record.businessLicenseUrl,
        fileName: getFileName(record.businessLicenseUrl),
        uploadedAt: record.createdAt || new Date().toISOString(),
      };
    }

    // Transform ID card front
    if (record.idCardFrontUrl) {
      docs.idCardFront = {
        url: record.idCardFrontUrl,
        fileName: getFileName(record.idCardFrontUrl),
        uploadedAt: record.createdAt || new Date().toISOString(),
      };
    }

    // Transform ID card back
    if (record.idCardBackUrl) {
      docs.idCardBack = {
        url: record.idCardBackUrl,
        fileName: getFileName(record.idCardBackUrl),
        uploadedAt: record.createdAt || new Date().toISOString(),
      };
    }

    // Transform selfie
    if (record.selfieUrl) {
      docs.profilePhoto = {
        url: record.selfieUrl,
        fileName: getFileName(record.selfieUrl),
        uploadedAt: record.createdAt || new Date().toISOString(),
      };
    }

    // Transform tax document
    if (record.taxDocumentUrl) {
      docs.taxDocument = {
        url: record.taxDocumentUrl,
        fileName: getFileName(record.taxDocumentUrl),
        uploadedAt: record.createdAt || new Date().toISOString(),
      };
    }

    // Transform proof of address
    if (record.proofOfAddressUrl) {
      docs.proofOfAddress = {
        url: record.proofOfAddressUrl,
        fileName: getFileName(record.proofOfAddressUrl),
        uploadedAt: record.createdAt || new Date().toISOString(),
      };
    }

    // Return null if no documents found
    return Object.keys(docs).length > 0 ? docs : null;
  }, [record]);

  const handleApprovalSuccess = () => {
    invalidate({
      resource: "sellers",
      invalidates: ["detail"],
      id: id,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading seller...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/sellers")}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Sellers
          </Button>
          <h1 className="text-2xl font-bold">Seller Details</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/sellers/edit/${record?.id}`)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Approval Status Section */}
      {record?.approvalStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Approval Status</CardTitle>
            <CardDescription>Current application status and timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <ApprovalStatusBadge status={record.approvalStatus} size="lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {record.submittedAt && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                  <div className="text-sm">{new Date(record.submittedAt).toLocaleString()}</div>
                </div>
              )}
              {record.approvedAt && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Approved</label>
                  <div className="text-sm">{new Date(record.approvedAt).toLocaleString()}</div>
                </div>
              )}
              {record.rejectedAt && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rejected</label>
                  <div className="text-sm">{new Date(record.rejectedAt).toLocaleString()}</div>
                </div>
              )}
            </div>
            {/* Total Rejections Counter */}
            {((record.totalRejections || record.approvalMetadata?.totalRejections || 0) > 0) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <label className="text-sm font-medium text-yellow-900">Total Rejections</label>
                    <div className="text-sm text-yellow-700">
                      This application has been rejected {record.totalRejections || record.approvalMetadata?.totalRejections} time(s)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Most Recent Rejection Reason */}
            {(record.approvalMetadata?.lastRejectionReason || record.approvalMetadata?.rejectionReason) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <label className="text-sm font-medium text-red-900">Latest Rejection Reason</label>
                <div className="text-sm text-red-700 mt-1 whitespace-pre-wrap">
                  {record.approvalMetadata.lastRejectionReason || record.approvalMetadata.rejectionReason}
                </div>
              </div>
            )}

            {/* Internal Notes */}
            {record.approvalMetadata?.notes && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="text-sm font-medium text-blue-900">Internal Notes</label>
                <div className="text-sm text-blue-700 mt-1 whitespace-pre-wrap">{record.approvalMetadata.notes}</div>
              </div>
            )}

            {/* Rejection History */}
            {record.approvalMetadata?.rejectionHistory && record.approvalMetadata.rejectionHistory.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900">
                      Rejection History ({record.approvalMetadata.rejectionHistory.length})
                    </label>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-3 space-y-3">
                    {record.approvalMetadata.rejectionHistory.map((item, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded p-3">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-medium text-gray-900">
                            Rejection #{(record.approvalMetadata?.rejectionHistory?.length || 0) - index}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.rejectedAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Reason:</span> {item.rejectionReason}
                        </div>
                        {item.notes && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Notes:</span> {item.notes}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          Rejected by: {item.rejectedBy}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Approval Actions Section */}
      {record?.approvalStatus && (
        <ApprovalActions
          resource="sellers"
          recordId={record.id}
          currentStatus={record.approvalStatus}
          onSuccess={handleApprovalSuccess}
        />
      )}

      {/* Documents Section */}
      {transformedDocuments && (
        <DocumentViewer documents={transformedDocuments} title="Business Documents" />
      )}

      {/* Show message if no documents */}
      {!transformedDocuments && (
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>No documents uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>This seller has not uploaded any documents yet.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Basic Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Seller #{record?.id}</CardTitle>
          <CardDescription>Business and contact information</CardDescription>
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
              <label className="text-sm font-medium text-muted-foreground">Business Name</label>
              <div className="text-sm">{record?.businessName || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Business Type</label>
              <div className="text-sm">{record?.businessType || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Contact Person</label>
              <div className="text-sm">{record?.contactPerson || "N/A"}</div>
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
            {record?.address && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <div className="text-sm">{record.address}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};