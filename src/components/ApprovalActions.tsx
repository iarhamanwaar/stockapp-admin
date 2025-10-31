import React, { useState } from 'react';
import { useCustomMutation, useNotification } from '@refinedev/core';
import { ApprovalStatus } from '../types/approval';

interface ApprovalActionsProps {
  resource: 'sellers' | 'riders';
  recordId: string;
  currentStatus: ApprovalStatus;
  onSuccess?: () => void;
}

export const ApprovalActions: React.FC<ApprovalActionsProps> = ({
  resource,
  recordId,
  currentStatus,
  onSuccess
}) => {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [notes, setNotes] = useState('');
  const { open } = useNotification();

  const { mutate: approve, isLoading: isApproving } = useCustomMutation();
  const { mutate: reject, isLoading: isRejecting } = useCustomMutation();

  const handleApprove = () => {
    approve(
      {
        url: `${resource}/${recordId}/approve`,
        method: 'post',
        values: { notes },
        successNotification: () => ({
          message: 'Application approved successfully',
          description: `The ${resource.slice(0, -1)} has been approved and can now access the app.`,
          type: 'success',
        }),
        errorNotification: () => ({
          message: 'Approval failed',
          description: 'There was an error approving this application. Please try again.',
          type: 'error',
        }),
      },
      {
        onSuccess: () => {
          setShowApproveDialog(false);
          setNotes('');
          onSuccess?.();
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

    reject(
      {
        url: `${resource}/${recordId}/reject`,
        method: 'post',
        values: { reason: rejectionReason, notes },
        successNotification: () => ({
          message: 'Application rejected',
          description: `The ${resource.slice(0, -1)} has been rejected.`,
          type: 'success',
        }),
        errorNotification: () => ({
          message: 'Rejection failed',
          description: 'There was an error rejecting this application. Please try again.',
          type: 'error',
        }),
      },
      {
        onSuccess: () => {
          setShowRejectDialog(false);
          setRejectionReason('');
          setNotes('');
          onSuccess?.();
        },
      }
    );
  };


  if (currentStatus !== 'pending' && currentStatus !== 'under_review') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Approval Actions</h3>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowApproveDialog(true)}
          disabled={isApproving}
          className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isApproving ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Approving...</span>
            </>
          ) : (
            <>
              <span>✓</span>
              <span>Approve Application</span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowRejectDialog(true)}
          disabled={isRejecting}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isRejecting ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Rejecting...</span>
            </>
          ) : (
            <>
              <span>✕</span>
              <span>Reject Application</span>
            </>
          )}
        </button>
      </div>

      {/* Approve Confirmation Dialog */}
      {showApproveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Approval</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to approve this {resource.slice(0, -1)}? They will gain immediate access to the application.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Add any internal notes about this approval..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowApproveDialog(false);
                  setNotes('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isApproving}
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isApproving ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Approving...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Confirm Approval</span>
                  </>
                )}
              </button>
            </div>
          </div>
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internal Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={2}
                placeholder="Add any internal notes..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason('');
                  setNotes('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isRejecting}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isRejecting || !rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isRejecting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Rejecting...</span>
                  </>
                ) : (
                  <>
                    <span>✕</span>
                    <span>Reject</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
