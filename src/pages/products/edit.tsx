import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

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
          label={"Price"}
          name={["price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber step={0.01} min={0} precision={2} />
        </Form.Item>
        <Form.Item
          label={"Sale Price"}
          name={["salePrice"]}
        >
          <InputNumber step={0.01} min={0} precision={2} />
        </Form.Item>
        <Form.Item
          label={"On Sale"}
          name={["onSale"]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};