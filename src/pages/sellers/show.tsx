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

export const SellerShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "sellers",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit canDelete resource="sellers">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Business Name"}</Title>
      <TextField value={record?.businessName} />
      <Title level={5}>{"Contact Person"}</Title>
      <TextField value={record?.contactPerson} />
      <Title level={5}>{"Email"}</Title>
      <TextField value={record?.email} />
      <Title level={5}>{"Phone"}</Title>
      <TextField value={record?.phone} />
      <Title level={5}>{"Address"}</Title>
      <TextField value={record?.address} />
      <Title level={5}>{"Business Type"}</Title>
      <TextField value={record?.businessType} />
      <Title level={5}>{"Verified"}</Title>
      <BooleanField value={record?.isVerified} />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status?.toUpperCase() || "PENDING"} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};