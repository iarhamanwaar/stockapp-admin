import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="products"
      title="Product"
      listPath="/products"
      fields={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'price', label: 'Price', type: 'number' },
        { key: 'salePrice', label: 'Sale Price', type: 'number' },
      ]}
    />
  );
};