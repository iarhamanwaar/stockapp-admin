// Approval system types for riders and sellers

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'under_review';

export interface DocumentInfo {
  url: string;
  fileName: string;
  uploadedAt: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface RejectionHistoryItem {
  rejectedBy: string;
  rejectedAt: string;
  rejectionReason: string;
  notes?: string;
}

export interface ApprovalMetadata {
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string; // Legacy field
  lastRejectionReason?: string; // New: Most recent rejection
  notes?: string;
  totalRejections?: number; // New: Count of rejections
  rejectionHistory?: RejectionHistoryItem[]; // New: Full history
}

export interface SellerDocuments {
  [key: string]: DocumentInfo | undefined;
  businessLicense?: DocumentInfo;
  idCard?: DocumentInfo;
  taxDocument?: DocumentInfo;
  proofOfAddress?: DocumentInfo;
}

export interface RiderDocuments {
  [key: string]: DocumentInfo | undefined;
  idCard?: DocumentInfo;
  drivingLicense?: DocumentInfo;
  vehicleRegistration?: DocumentInfo;
  insurance?: DocumentInfo;
  profilePhoto?: DocumentInfo;
}

export interface SellerWithApproval {
  id: string;
  name: string;
  email?: string; // Flattened at top level (confirmed)
  businessName: string;
  phone: string;
  phoneNumber?: string;
  businessType: string;
  address: string;
  contactPerson: string;
  status: string;
  isVerified: boolean;
  approvalStatus: ApprovalStatus;
  documents?: SellerDocuments;
  approvalMetadata?: ApprovalMetadata;
  totalRejections?: number; // New: Also available at top level
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt?: string;
  // Flat document URL fields from backend
  businessLicenseUrl?: string;
  idCardFrontUrl?: string;
  idCardBackUrl?: string;
  selfieUrl?: string;
  taxDocumentUrl?: string;
  proofOfAddressUrl?: string;
  user?: {
    id: string;
    email: string;
    isVerified?: boolean;
  };
}

export interface RiderWithApproval {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email?: string; // Flattened at top level (confirmed)
  phone: string;
  phoneNumber?: string;
  vehicleType: string;
  isAvailable: boolean;
  status: string;
  isVerified?: boolean;
  approvalStatus: ApprovalStatus;
  documents?: RiderDocuments;
  approvalMetadata?: ApprovalMetadata;
  totalRejections?: number; // New: Also available at top level
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt?: string;
  // Flat document URL fields from backend
  driverLicenceFrontUrl?: string;
  driverLicenceBackUrl?: string;
  selfieUrl?: string;
  user?: {
    id: string;
    email: string;
    isVerified?: boolean;
  };
}

export interface ApprovalActionPayload {
  reason?: string;
  notes?: string;
}

// Helper function to get email from either flat or nested structure
export const getEmail = (record: SellerWithApproval | RiderWithApproval): string => {
  return record.email || record.user?.email || 'N/A';
};

// Helper function to get isVerified from either flat or nested structure
export const getIsVerified = (record: SellerWithApproval | RiderWithApproval): boolean => {
  return record.isVerified ?? record.user?.isVerified ?? false;
};
