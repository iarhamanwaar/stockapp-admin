import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const ChatList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="chats"
      title="Chats"
      description="Monitor chat conversations"
      basePath="/chats"
      columns={['id', 'participants', 'lastMessage', 'status', 'messageCount', 'createdAt', 'updatedAt']}
      enableSearch={false}
      canDelete={false}
    />
  );
};
