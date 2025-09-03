import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Rate } from "antd";

const { TextArea } = Input;

export const ProductReviewEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const reviewData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <Form.Item
          label={"Moderator Notes"}
          name={["moderatorNotes"]}
        >
          <TextArea rows={3} placeholder="Add moderator notes..." />
        </Form.Item>
      </Form>
    </Edit>
  );
};
