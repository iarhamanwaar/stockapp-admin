import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const NotificationEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="notifications"
      title="Notification"
      listPath="/notifications"
      fields={[
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'message', label: 'Message', type: 'textarea' },
        { key: 'priority', label: 'Priority', type: 'text' },
        { key: 'type', label: 'Type', type: 'text' },
      ]}
    />
  );
};
