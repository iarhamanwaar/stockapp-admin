import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="categories"
      title="Category"
      listPath="/categories"
      fields={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
};