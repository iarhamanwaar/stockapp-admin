import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "user",
  });

  const userData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete resource="user">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Email"}
          name={["email"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Role"}
          name={["role"]}
          initialValue={"buyer"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"buyer"}
            options={[
              { value: "buyer", label: "Buyer" },
              { value: "supplier", label: "Supplier" },
              { value: "rider", label: "Rider" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Phone Number"}
          name={["phoneNumber"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Verified"}
          name={["isVerified"]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={"Language"}
          name={["language"]}
        >
          <Select
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Spanish" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};