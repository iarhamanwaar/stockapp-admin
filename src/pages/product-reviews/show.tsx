import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const ProductReviewShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="productreviews"
      title="Product Review"
      listPath="/product-reviews"
    />
  );
};