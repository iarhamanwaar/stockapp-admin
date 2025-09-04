import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const SellerEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="sellers"
      title="Seller"
      listPath="/sellers"
      fields={[
        { key: 'businessName', label: 'Business Name', type: 'text' },
        { key: 'contactPerson', label: 'Contact Person', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'text' },
        { key: 'address', label: 'Address', type: 'textarea' },
        { key: 'businessType', label: 'Business Type', type: 'text' },
        { key: 'status', label: 'Status', type: 'text' },
      ]}
    />
  );
};