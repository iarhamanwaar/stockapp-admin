import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Select } from "antd";

export const SellerEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "sellers",
  });

  const sellerData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete resource="sellers">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Business Name"}
          name={["businessName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Contact Person"}
          name={["contactPerson"]}
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
          label={"Address"}
          name={["address"]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label={"Business Type"}
          name={["businessType"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"pending"}
        >
          <Select
            options={[
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
              { value: "suspended", label: "Suspended" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Verified"}
          name={["isVerified"]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};