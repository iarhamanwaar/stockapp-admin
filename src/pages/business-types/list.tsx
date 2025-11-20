import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const BusinessTypeList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="businesstypes"
      title="Business Types"
      description="Manage business types with bilingual support (English/Spanish)"
      basePath="/business-types"
      columns={['id', 'name', 'nameEs', 'description', 'isActive', 'createdAt']}
      searchPlaceholder="Search by business type name (English or Spanish)..."
    />
  );
};