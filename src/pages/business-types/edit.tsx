import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const BusinessTypeEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit
      resource="businesstypes"
      title="Business Type"
      listPath="/business-types"
      fields={[
        { key: 'name', label: 'Name (English)', type: 'text' },
        { key: 'nameEs', label: 'Name (Spanish)', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
};