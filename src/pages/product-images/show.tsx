import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const ProductImageShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="productimage"
      title="Product Image"
      listPath="/product-images"
    />
  );
};