import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const SellerReviewShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="sellerreviews"
      title="Seller Review"
      listPath="/seller-reviews"
    />
  );
};