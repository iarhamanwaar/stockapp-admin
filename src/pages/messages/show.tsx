import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import {
  Show,
  TextField,
  DateField,
} from "@refinedev/antd";
import { Typography, Tag, Card, Image } from "antd";

const { Title, Paragraph } = Typography;

export const MessageShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "messages",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const renderMessageContent = () => {
    if (record?.messageType === 'image' && record?.imageUrl) {
      return (
        <div>
          <Image
            width={200}
            src={record.imageUrl}
            alt="Message image"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1xkE8C8uNgbPROr0SqsNFxuFlRtJlx0km7K7//7+5/3XxJN"
          />
          {record.content && (
            <Paragraph style={{ marginTop: 16 }}>
              {record.content}
            </Paragraph>
          )}
        </div>
      );
    }
    
    if (record?.messageType === 'file' && record?.fileUrl) {
      return (
        <div>
          <Card size="small">
            <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
              {record.fileName || 'Download File'}
            </a>
          </Card>
          {record.content && (
            <Paragraph style={{ marginTop: 16 }}>
              {record.content}
            </Paragraph>
          )}
        </div>
      );
    }
    
    return <Paragraph>{record?.content || 'No content'}</Paragraph>;
  };

  return (
    <Show isLoading={isLoading} resource="messages">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      
      <Title level={5}>{"Content"}</Title>
      {renderMessageContent()}
      
      <Title level={5}>{"Message Type"}</Title>
      <Tag color={
        record?.messageType === 'text' ? 'blue' :
        record?.messageType === 'image' ? 'green' :
        record?.messageType === 'file' ? 'orange' :
        record?.messageType === 'system' ? 'gray' : 'default'
      }>
        {record?.messageType?.toUpperCase() || 'TEXT'}
      </Tag>
      
      <Title level={5}>{"Sender ID"}</Title>
      <TextField value={record?.senderId} />
      
      <Title level={5}>{"Chat ID"}</Title>
      <TextField value={record?.chatId} />
      
      <Title level={5}>{"Read Status"}</Title>
      <Tag color={record?.isRead ? 'green' : 'orange'}>
        {record?.isRead ? 'READ' : 'unread'}
      </Tag>
      
      <Title level={5}>{"Reply To"}</Title>
      <TextField value={record?.replyToMessageId || 'N/A'} />
      
      <Title level={5}>{"Sent at"}</Title>
      <DateField value={record?.timestamp} />
      
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
