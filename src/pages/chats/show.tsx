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
import { Typography, Tag, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const ChatShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "chats",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} resource="chats">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      
      <Title level={5}>{"Participants"}</Title>
      <List
        size="small"
        dataSource={record?.participants || []}
        renderItem={(participant: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={participant?.name || participant?.email || `User ${participant?.id}`}
              description={participant?.role || 'User'}
            />
          </List.Item>
        )}
        locale={{ emptyText: 'No participants' }}
      />
      
      <Title level={5}>{"Status"}</Title>
      <Tag color={
        record?.status === 'active' ? 'green' : 
        record?.status === 'archived' ? 'gray' : 'orange'
      }>
        {record?.status?.toUpperCase() || 'UNKNOWN'}
      </Tag>
      
      <Title level={5}>{"Last Message"}</Title>
      <Paragraph>{record?.lastMessage || 'No messages yet'}</Paragraph>
      
      <Title level={5}>{"Message Count"}</Title>
      <TextField value={record?.messageCount || 0} />
      
      <Title level={5}>{"Chat Type"}</Title>
      <TextField value={record?.type || 'Direct'} />
      
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      
      <Title level={5}>{"Last Activity"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
