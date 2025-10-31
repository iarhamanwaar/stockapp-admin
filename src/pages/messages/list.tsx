import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const MessageList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="messages"
      title="Messages"
      description="Monitor chat messages"
      basePath="/messages"
      columns={['id', 'content', 'senderId', 'chatId', 'messageType', 'isRead', 'timestamp']}
      searchPlaceholder="Search by message content..."
      canDelete={false}
    />
  );
};