import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const SellerList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="sellers"
      title="Sellers"
      description="Manage sellers and their store information"
      basePath="/sellers"
      columns={['id', 'name', 'email', 'businessName', 'status', 'isVerified', 'createdAt']}
    />
  );
};