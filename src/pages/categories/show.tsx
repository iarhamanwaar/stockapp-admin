import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="categories"
      title="Category"
      listPath="/categories"
    />
  );
};