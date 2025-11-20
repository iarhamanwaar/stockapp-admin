import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const MaterialList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="materials"
      title="Materials"
      description="Manage materials with bilingual support (English/Spanish)"
      basePath="/materials"
      columns={['id', 'name', 'nameEs', 'description', 'type', 'isActive', 'createdAt']}
      searchPlaceholder="Search by material name (English or Spanish)..."
    />
  );
};