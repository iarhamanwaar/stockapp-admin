import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";

export const BusinessTypeEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const businessTypeData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Description"}
          name={["description"]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={"Active"}
          name={["isActive"]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};