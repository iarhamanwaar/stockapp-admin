import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const ProductImageEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Image URL"}
          name={["imageUrl"]}
          rules={[
            {
              required: true,
              message: "Please input image URL",
            },
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
      </Form>
    </Edit>
  );
};