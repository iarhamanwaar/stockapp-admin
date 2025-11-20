import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="categories"
      title="Categories"
      description="Manage categories with bilingual support (English/Spanish)"
      basePath="/categories"
      columns={['id', 'name', 'nameEs', 'description', 'isActive', 'createdAt']}
      searchPlaceholder="Search by category name (English or Spanish)..."
    />
  );
};