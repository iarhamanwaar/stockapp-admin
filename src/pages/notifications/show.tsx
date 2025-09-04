import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericShow } from "../../components/GenericShow";

export const NotificationShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericShow 
      resource="notifications"
      title="Notification"
      listPath="/notifications"
    />
  );
};