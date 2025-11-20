import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const BankList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="banks"
      title="Banks"
      description="Manage banking institutions"
      basePath="/banks"
      columns={['id', 'name', 'code', 'description', 'createdAt']}
      searchPlaceholder="Search by bank name..."
      canCreate={false}
    />
  );
};