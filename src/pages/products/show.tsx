import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import {
  Show,
  TextField,
  NumberField,
  DateField,
  BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "products",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit canDelete resource="products">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Description"}</Title>
      <TextField value={record?.description} />
      <Title level={5}>{"Price"}</Title>
      <NumberField value={record?.price ?? ""} />
      <Title level={5}>{"Sale Price"}</Title>
      <NumberField value={record?.salePrice ?? ""} />
      <Title level={5}>{"On Sale"}</Title>
      <BooleanField value={record?.onSale} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};