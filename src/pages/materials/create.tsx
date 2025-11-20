import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const MaterialCreate: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit
      resource="materials"
      title="Material"
      listPath="/materials"
      fields={[
        { key: 'name', label: 'Name (English)', type: 'text' },
        { key: 'nameEs', label: 'Name (Spanish)', type: 'text' },
        { key: 'type', label: 'Type', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
};
