import React from 'react';
import { ApprovalStatus } from '../types/approval';

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const ApprovalStatusBadge: React.FC<ApprovalStatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = false
}) => {
  const getStatusConfig = (status: ApprovalStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Application Submitted',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: '⏳'
        };
      case 'approved':
        return {
          label: 'Approved',
          className: 'bg-green-100 text-green-800 border-green-300',
          icon: '✓'
        };
      case 'rejected':
        return {
          label: 'Action Required',
          className: 'bg-red-100 text-red-800 border-red-300',
          icon: '✗'
        };
      case 'under_review':
        return {
          label: 'Validation in Progress',
          className: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: '🔄'
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: '?'
        };
    }
  };

  const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      case 'md':
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = getSizeClasses(size);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.className} ${sizeClasses}`}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
};
