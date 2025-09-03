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

export const BankShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "banks",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit canDelete resource="banks">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Bank Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Bank Code"}</Title>
      <TextField value={record?.code} />
      <Title level={5}>{"Country"}</Title>
      <TextField value={record?.country} />
      <Title level={5}>{"Active"}</Title>
      <BooleanField value={record?.isActive} />
      <Title level={5}>{"Supported Services"}</Title>
      <div>
        {record?.supportedServices?.map((service: string, index: number) => (
          <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
            {service}
          </Tag>
        )) || 'No services listed'}
      </div>
      <Title level={5}>{"Swift Code"}</Title>
      <TextField value={record?.swiftCode || 'N/A'} />
      <Title level={5}>{"Website"}</Title>
      <TextField value={record?.website || 'N/A'} />
      <Title level={5}>{"Contact Email"}</Title>
      <TextField value={record?.contactEmail || 'N/A'} />
      <Title level={5}>{"Phone"}</Title>
      <TextField value={record?.phone || 'N/A'} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
