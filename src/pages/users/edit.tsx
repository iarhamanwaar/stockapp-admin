import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="user"
      title="User"
      listPath="/users"
      fields={[
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
      ]}
    />
  );
};