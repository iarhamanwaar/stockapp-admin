import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const NotificationList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="notifications"
      title="Notifications"
      description="Manage system notifications"
      basePath="/notifications"
      columns={['id', 'title', 'message', 'type', 'status', 'createdAt']}
      searchPlaceholder="Search by title or message..."
      canCreate={false}
    />
  );
};