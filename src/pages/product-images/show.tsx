import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import {
  Show,
  TextField,
  DateField,
  ImageField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductImageShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Image"}</Title>
      <ImageField 
        value={record?.imageUrl} 
        title="Product Image"
        width={300}
        height={300}
        style={{ objectFit: 'cover' }}
      />
      <Title level={5}>{"Image URL"}</Title>
      <TextField value={record?.imageUrl} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};