import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const BusinessTypeList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="businesstypes"
      title="Business Types"
      description="Manage business types"
      basePath="/business-types"
      columns={['id', 'name', 'description', 'isActive', 'createdAt']}
    />
  );
};