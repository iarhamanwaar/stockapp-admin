import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const MaterialEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="materials"
      title="Material"
      listPath="/materials"
      fields={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'type', label: 'Type', type: 'text' },
      ]}
    />
  );
};