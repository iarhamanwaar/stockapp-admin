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

const { Title } = Typography;

export const RiderShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"First Name"}</Title>
      <TextField value={record?.firstName} />
      <Title level={5}>{"Last Name"}</Title>
      <TextField value={record?.lastName} />
      <Title level={5}>{"Email"}</Title>
      <TextField value={record?.email} />
      <Title level={5}>{"Phone"}</Title>
      <TextField value={record?.phone} />
      <Title level={5}>{"Vehicle Type"}</Title>
      <TextField value={record?.vehicleType} />
      <Title level={5}>{"Available"}</Title>
      <BooleanField value={record?.isAvailable} />
      <Title level={5}>{"Status"}</Title>
      <Tag color={record?.status === 'active' ? 'green' : record?.status === 'inactive' ? 'red' : 'orange'}>
        {record?.status?.toUpperCase()}
      </Tag>
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
