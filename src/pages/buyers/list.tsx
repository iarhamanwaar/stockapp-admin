import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const BuyerList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="buyers"
      title="Buyers"
      description="Manage buyers"
      basePath="/buyers"
      columns={['id', 'firstName', 'lastName', 'email', 'phone', 'isVerified', 'status', 'createdAt']}
    />
  );
};