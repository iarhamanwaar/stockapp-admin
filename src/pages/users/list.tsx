import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="user"
      title="Users"
      description="Manage system users and their permissions"
      basePath="/users"
      columns={['id', 'email', 'role', 'phoneNumber', 'isVerified', 'createdAt']}
      searchPlaceholder="Search by email or phone..."
      canCreate={false}
    />
  );
};
