import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const SellerReviewEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="sellerreviews"
      title="Seller Review"
      listPath="/seller-reviews"
      fields={[
        { key: 'rating', label: 'Rating', type: 'number' },
        { key: 'comment', label: 'Comment', type: 'textarea' },
        { key: 'status', label: 'Status', type: 'text' },
      ]}
    />
  );
};