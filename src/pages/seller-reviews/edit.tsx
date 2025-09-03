import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Rate } from "antd";

const { TextArea } = Input;

export const SellerReviewEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "sellerreviews",
  });

  const reviewData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete resource="sellerreviews">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Rating"}
          name={["rating"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          label={"Comment"}
          name={["comment"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={"Approved"}
          name={["isApproved"]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
