import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const ProductImageList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="productimage"
      title="Product Images"
      description="Manage product images"
      basePath="/product-images"
      columns={['id', 'imageUrl', 'createdAt']}
      searchPlaceholder="Search by image URL..."
    />
  );
};