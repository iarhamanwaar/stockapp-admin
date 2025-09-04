import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const BuyerEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="buyers"
      title="Buyer"
      listPath="/buyers"
      fields={[
        { key: 'firstName', label: 'First Name', type: 'text' },
        { key: 'lastName', label: 'Last Name', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'text' },
        { key: 'address', label: 'Address', type: 'textarea' },
        { key: 'status', label: 'Status', type: 'text' },
      ]}
    />
  );
};