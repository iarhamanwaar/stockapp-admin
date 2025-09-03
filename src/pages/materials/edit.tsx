import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Select } from "antd";

export const MaterialEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "materials",
  });

  const materialData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete resource="materials">
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
          label={"Type"}
          name={["type"]}
        >
          <Select
            options={[
              { value: "fabric", label: "Fabric" },
              { value: "leather", label: "Leather" },
              { value: "metal", label: "Metal" },
              { value: "plastic", label: "Plastic" },
              { value: "wood", label: "Wood" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select material type"
          />
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