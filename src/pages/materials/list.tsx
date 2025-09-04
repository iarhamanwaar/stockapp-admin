import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const MaterialList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="materials"
      title="Materials"
      description="Manage materials"
      basePath="/materials"
      columns={['id', 'name', 'description', 'type', 'isActive', 'createdAt']}
    />
  );
};