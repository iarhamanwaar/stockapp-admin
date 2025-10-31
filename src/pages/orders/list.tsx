import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="order"
      title="Orders"
      description="Manage orders"
      basePath="/orders"
      columns={['id', 'status', 'totalAmount', 'createdAt']}
      searchPlaceholder="Search by buyer name, phone, address, or city..."
    />
  );
};