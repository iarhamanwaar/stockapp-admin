import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const BankEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="banks"
      title="Bank"
      listPath="/banks"
      fields={[
        { key: 'name', label: 'Bank Name', type: 'text' },
        { key: 'code', label: 'Bank Code', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
};