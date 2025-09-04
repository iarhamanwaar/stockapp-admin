import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const RiderEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="riders"
      title="Rider"
      listPath="/riders"
      fields={[
        { key: 'firstName', label: 'First Name', type: 'text' },
        { key: 'lastName', label: 'Last Name', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'text' },
        { key: 'vehicleType', label: 'Vehicle Type', type: 'text' },
        { key: 'status', label: 'Status', type: 'text' },
      ]}
    />
  );
};
