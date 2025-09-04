import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const MaterialShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="materials"
      title="Material"
      listPath="/materials"
    />
  );
};