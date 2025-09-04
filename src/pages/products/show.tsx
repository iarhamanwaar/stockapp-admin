import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="products"
      title="Product"
      listPath="/products"
    />
  );
};