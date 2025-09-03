import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const RiderEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const riderData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"First Name"}
          name={["firstName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Last Name"}
          name={["lastName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={["email"]}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Phone"}
          name={["phone"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Vehicle Type"}
          name={["vehicleType"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "motorcycle", label: "Motorcycle" },
              { value: "bicycle", label: "Bicycle" },
              { value: "car", label: "Car" },
              { value: "van", label: "Van" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Available"}
          name={["isAvailable"]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"active"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "suspended", label: "Suspended" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
