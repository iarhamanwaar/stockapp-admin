import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="products"
      title="Products"
      description="Manage product catalog"
      basePath="/products"
      columns={['id', 'name', 'price', 'salePrice', 'onSale', 'createdAt']}
    />
  );
};