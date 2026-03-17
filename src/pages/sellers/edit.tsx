import React, { useState, useEffect, useRef } from "react";
import {
  IResourceComponentsProps,
  useOne,
  useUpdate,
  useCustomMutation,
  useNotification,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner, LoadingCard } from "@/components/ui/loading";
import { APPROVAL_STATUS_OPTIONS, ApprovalStatus } from "../../types/approval";

export const SellerEdit: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { open } = useNotification();

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [originalApprovalStatus, setOriginalApprovalStatus] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const { data, isLoading: dataLoading, error } = useOne({
    resource: "sellers",
    id: id as string,
    queryOptions: { enabled: !!id },
  });

  const { mutate: updateRecord, isLoading: updateLoading } = useUpdate();
  const { mutate: approveMutation, isLoading: approveLoading } = useCustomMutation();
  const { mutate: rejectMutation, isLoading: rejectLoading } = useCustomMutation();

  const isSubmitting = updateLoading || approveLoading || rejectLoading;

  const fields = [
    { key: 'businessName', label: 'Business Name', type: 'text' as const },
    { key: 'contactPerson', label: 'Contact Person', type: 'text' as const },
    { key: 'email', label: 'Email', type: 'email' as const },
    { key: 'phone', label: 'Phone', type: 'text' as const },
    { key: 'address', label: 'Address', type: 'textarea' as const },
    { key: 'businessType', label: 'Business Type', type: 'text' as const },
  ];

  useEffect(() => {
    if (data?.data) {
      const initialData: Record<string, any> = {};
      fields.forEach(field => {
        initialData[field.key] = data.data[field.key] || '';
      });
      initialData.approvalStatus = data.data.approvalStatus || 'pending';
      setFormData(initialData);
      setOriginalApprovalStatus(data.data.approvalStatus || 'pending');
    }
  }, [data]);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleApprovalStatusChange = (value: string) => {
    handleInputChange('approvalStatus', value);
    if (value === 'rejected') {
      setShowRejectDialog(true);
    }
  };

  const handleRejectDialogDone = () => {
    if (!rejectionReason.trim()) {
      open?.({
        type: 'error',
        message: 'Rejection reason required',
        description: 'Please provide a reason for rejecting this application.',
      });
      return;
    }
    setShowRejectDialog(false);
  };

  const handleRejectDialogClose = () => {
    setShowRejectDialog(false);
    setRejectionReason('');
    // Revert approval status back to original
    setFormData(prev => ({ ...prev, approvalStatus: originalApprovalStatus }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStatus = formData.approvalStatus;
    const statusChanged = newStatus !== originalApprovalStatus;

    // Build the field values (excluding approvalStatus)
    const fieldValues: Record<string, any> = {};
    fields.forEach(field => {
      fieldValues[field.key] = formData[field.key];
    });

    // Always include approvalStatus in field values for PUT
    const allValues = { ...fieldValues, approvalStatus: newStatus };

    if (statusChanged && newStatus === 'approved') {
      // Call approve API first (sets status + sends notification), then save other fields
      approveMutation(
        {
          url: `sellers/${id}/approve`,
          method: 'post',
          values: {},
          successNotification: () => ({
            message: 'Seller approved successfully',
            description: 'The seller has been approved and notified.',
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
            updateRecord(
              { resource: "sellers", id: id as string, values: allValues },
              { onSuccess: () => navigate("/sellers") }
            );
          },
        }
      );
    } else if (statusChanged && newStatus === 'rejected') {
      if (!rejectionReason.trim()) {
        open?.({
          type: 'error',
          message: 'Rejection reason required',
          description: 'Please select "Action Required" again and provide a reason.',
        });
        return;
      }
      // Call reject API first (sets status + sends notification), then save other fields
      rejectMutation(
        {
          url: `sellers/${id}/reject`,
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
            updateRecord(
              { resource: "sellers", id: id as string, values: allValues },
              { onSuccess: () => navigate("/sellers") }
            );
          },
        }
      );
    } else {
      // Normal update (status changed to pending/under_review, or only field edits)
      updateRecord(
        {
          resource: "sellers",
          id: id as string,
          values: allValues,
        },
        { onSuccess: () => navigate("/sellers") }
      );
    }
  };

  if (id && dataLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/sellers")}>
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Sellers
          </Button>
          <h1 className="text-2xl font-bold">Edit Seller</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Loading Seller...</CardTitle>
            <CardDescription>Please wait while we fetch the seller data</CardDescription>
          </CardHeader>
          <CardContent>
            <LoadingCard lines={fields.length + 1} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (id && error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/sellers")}>
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Sellers
          </Button>
          <h1 className="text-2xl font-bold">Edit Seller</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Seller</CardTitle>
            <CardDescription>Unable to load seller data for editing.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/sellers")}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Sellers
        </Button>
        <h1 className="text-2xl font-bold">Edit Seller</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Seller</CardTitle>
          <CardDescription>Update seller information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.key}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      disabled={isSubmitting}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      type={field.type}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      disabled={isSubmitting}
                    />
                  )}
                </div>
              ))}

              {/* Approval Status Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="approvalStatus">Approval Status</Label>
                <Select
                  value={formData.approvalStatus || undefined}
                  onValueChange={handleApprovalStatusChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="approvalStatus">
                    <SelectValue placeholder="Select approval status" />
                  </SelectTrigger>
                  <SelectContent>
                    {APPROVAL_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.approvalStatus === 'rejected' && rejectionReason && (
                  <p className="text-sm text-muted-foreground">
                    Rejection reason: {rejectionReason}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center"
              >
                {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
                <CheckIcon className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/sellers")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Rejection Reason Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Rejection Reason</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason <span className="text-red-500">*</span>
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
                onClick={handleRejectDialogClose}
              >
                Close
              </Button>
              <Button
                onClick={handleRejectDialogDone}
                disabled={!rejectionReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
