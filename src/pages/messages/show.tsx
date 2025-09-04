import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const MessageShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="messages"
      title="Message"
      listPath="/messages"
    />
  );
};