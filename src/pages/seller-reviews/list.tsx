import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const SellerReviewList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="sellerreviews"
      title="Seller Reviews"
      description="Moderate seller reviews"
      basePath="/seller-reviews"
      columns={['id', 'rating', 'comment', 'status', 'sellerId', 'buyerId', 'createdAt']}
    />
  );
};
