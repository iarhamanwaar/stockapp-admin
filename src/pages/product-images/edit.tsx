import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const ProductImageEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="productimage"
      title="Product Image"
      listPath="/product-images"
      fields={[
        { key: 'imageUrl', label: 'Image URL', type: 'text' },
      ]}
    />
  );
};