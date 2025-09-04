import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="order"
      title="Order"
      listPath="/orders"
    />
  );
};