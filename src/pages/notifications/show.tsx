import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import {
  Show,
  TextField,
  DateField,
  BooleanField,
} from "@refinedev/antd";
import { Typography, Tag } from "antd";

const { Title, Paragraph } = Typography;

export const NotificationShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "notifications",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit canDelete resource="notifications">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Message"}</Title>
      <Paragraph>{record?.message}</Paragraph>
      <Title level={5}>{"Priority"}</Title>
      <Tag color={
        record?.priority === 'high' ? 'red' :
        record?.priority === 'medium' ? 'orange' :
        record?.priority === 'low' ? 'green' : 'default'
      }>
        {record?.priority?.toUpperCase()}
      </Tag>
      <Title level={5}>{"Read"}</Title>
      <BooleanField value={record?.isRead} />
      <Title level={5}>{"User ID"}</Title>
      <TextField value={record?.userId} />
      <Title level={5}>{"Type"}</Title>
      <TextField value={record?.type || 'General'} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
