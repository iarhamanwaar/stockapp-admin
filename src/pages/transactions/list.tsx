import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const TransactionList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="transactions"
      title="Transactions"
      description="Manage financial transactions"
      basePath="/transactions"
      columns={['id', 'amount', 'status', 'type', 'paymentMethod', 'reference', 'createdAt']}
    />
  );
};
