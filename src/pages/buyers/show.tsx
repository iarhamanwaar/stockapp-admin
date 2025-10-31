import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const BuyerShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="buyers"
      title="Buyer"
      listPath="/buyers"
      
    />
  );
};