import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const TransactionEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="transactions"
      title="Transaction"
      listPath="/transactions"
      fields={[
        { key: 'amount', label: 'Amount', type: 'number' },
        { key: 'status', label: 'Status', type: 'text' },
        { key: 'type', label: 'Type', type: 'text' },
        { key: 'paymentMethod', label: 'Payment Method', type: 'text' },
        { key: 'reference', label: 'Reference', type: 'text' },
      ]}
    />
  );
};
