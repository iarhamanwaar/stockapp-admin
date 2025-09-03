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
import { Typography } from "antd";

const { Title } = Typography;

export const BusinessTypeShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "businesstypes",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit canDelete resource="businesstypes">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Description"}</Title>
      <TextField value={record?.description} />
      <Title level={5}>{"Active"}</Title>
      <BooleanField value={record?.isActive} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};