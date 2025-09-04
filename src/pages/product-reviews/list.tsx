import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const ProductReviewList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="productreviews"
      title="Product Reviews"
      description="Moderate product reviews"
      basePath="/product-reviews"
      columns={['id', 'rating', 'comment', 'status', 'productId', 'buyerId', 'createdAt']}
    />
  );
};
