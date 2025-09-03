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
import { Typography, Rate } from "antd";

const { Title, Paragraph } = Typography;

export const ProductReviewShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "productreviews",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit canDelete resource="productreviews">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Rating"}</Title>
      <Rate disabled defaultValue={record?.rating} />
      <Title level={5}>{"Comment"}</Title>
      <Paragraph>{record?.comment || 'No comment provided'}</Paragraph>
      <Title level={5}>{"Approved"}</Title>
      <BooleanField value={record?.isApproved} />
      <Title level={5}>{"Moderator Notes"}</Title>
      <Paragraph>{record?.moderatorNotes || 'No moderator notes'}</Paragraph>
      <Title level={5}>{"Product ID"}</Title>
      <TextField value={record?.productId} />
      <Title level={5}>{"User ID"}</Title>
      <TextField value={record?.userId} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
