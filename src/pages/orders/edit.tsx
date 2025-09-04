import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="order"
      title="Order"
      listPath="/orders"
      fields={[
        { key: 'status', label: 'Status', type: 'text' },
      ]}
    />
  );
};