import React, { useState } from "react";
import { IResourceComponentsProps, useList, useCustomMutation, useNotification } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ApprovalStatusBadge } from "@/components/ApprovalStatusBadge";
import { SellerWithApproval, getEmail } from "@/types/approval";

export const PendingSellers: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { open } = useNotification();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState<'approve' | 'reject' | null>(null);

  const { data, isLoading, refetch } = useList<SellerWithApproval>({
    resource: "sellers",
    filters: [
      {
        field: "approvalStatus",
        operator: "eq",
        value: "pending",
      },
    ],
    pagination: {
      pageSize: 50,
    },
  });

  const { mutate: approve } = useCustomMutation();
  const { mutate: reject } = useCustomMutation();

  const pendingSellers = data?.data || [];

  const handleApprove = (sellerId: string) => {
    setProcessingId(sellerId);
    setProcessingAction('approve');

    approve(
      {
        url: `sellers/${sellerId}/approve`,
        method: 'post',
        values: {},
        successNotification: () => ({
          message: 'Seller approved successfully',
          description: 'The seller has been approved and can now access the app.',
          type: 'success',
        }),
        errorNotification: () => ({
          message: 'Approval failed',
          description: 'There was an error approving this seller. Please try again.',
          type: 'error',
        }),
      },
      {
        onSuccess: () => {
          setProcessingId(null);
          setProcessingAction(null);
          refetch();
        },
        onError: () => {
          setProcessingId(null);
          setProcessingAction(null);
        },
      }
    );
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      open?.({
        type: 'error',
        message: 'Rejection reason required',
        description: 'Please provide a reason for rejecting this application.',
      });
      return;
    }

    if (!selectedSellerId) return;

    setProcessingId(selectedSellerId);
    setProcessingAction('reject');

    reject(
      {
        url: `sellers/${selectedSellerId}/reject`,
        method: 'post',
        values: { reason: rejectionReason },
        successNotification: () => ({
          message: 'Seller rejected',
          description: 'The seller has been notified of the rejection.',
          type: 'success',
        }),
        errorNotification: () => ({
          message: 'Rejection failed',
          description: 'There was an error rejecting this seller. Please try again.',
          type: 'error',
        }),
      },
      {
        onSuccess: () => {
          setProcessingId(null);
          setProcessingAction(null);
          setShowRejectDialog(false);
          setSelectedSellerId(null);
          setRejectionReason('');
          refetch();
        },
        onError: () => {
          setProcessingId(null);
          setProcessingAction(null);
        },
      }
    );
  };

  const openRejectDialog = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    setShowRejectDialog(true);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading pending sellers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pending Seller Applications</h1>
          <p className="text-muted-foreground mt-1">
            Review and approve seller applications waiting for verification
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
        >
          <ArrowPathIcon className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {pendingSellers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">
                There are no pending seller applications at the moment.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {pendingSellers.map((seller) => (
            <Card key={seller.id} className="hover:border-primary transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">{seller.businessName}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{getEmail(seller)}</span>
                      {seller.address && (
                        <>
                          <span>•</span>
                          <span>{seller.address}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApprovalStatusBadge status={seller.approvalStatus} />
                    {((seller.totalRejections || seller.approvalMetadata?.totalRejections || 0) > 0) && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                        {seller.totalRejections || seller.approvalMetadata?.totalRejections}x rejected
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/sellers/show/${seller.id}`)}
                    disabled={processingId === seller.id}
                    className="gap-1.5"
                  >
                    <EyeIcon className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(seller.id)}
                    disabled={processingId === seller.id}
                    className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                  >
                    {processingId === seller.id && processingAction === 'approve' ? 'Approving...' : (
                      <>
                        <span>✓</span>
                        Approve
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openRejectDialog(seller.id)}
                    disabled={processingId === seller.id}
                    className="bg-red-600 hover:bg-red-700 text-white gap-1.5"
                  >
                    {processingId === seller.id && processingAction === 'reject' ? 'Rejecting...' : (
                      <>
                        <span>✕</span>
                        Reject
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Reject Application</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={4}
                placeholder="E.g., Business license document is unclear or expired..."
                required
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectDialog(false);
                  setSelectedSellerId(null);
                  setRejectionReason('');
                }}
                disabled={processingAction === 'reject'}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={processingAction === 'reject' || !rejectionReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                {processingAction === 'reject' ? 'Rejecting...' : '✕ Reject'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
