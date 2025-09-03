import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const BankEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "banks",
  });

  const bankData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete resource="banks">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Bank Name"}
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
          label={"Bank Code"}
          name={["code"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Country"}
          name={["country"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            options={[
              { value: "US", label: "United States" },
              { value: "CA", label: "Canada" },
              { value: "GB", label: "United Kingdom" },
              { value: "DE", label: "Germany" },
              { value: "FR", label: "France" },
              { value: "JP", label: "Japan" },
              { value: "AU", label: "Australia" },
              { value: "IN", label: "India" },
              { value: "BR", label: "Brazil" },
              { value: "MX", label: "Mexico" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Swift Code"}
          name={["swiftCode"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Website"}
          name={["website"]}
        >
          <Input type="url" placeholder="https://..." />
        </Form.Item>
        <Form.Item
          label={"Contact Email"}
          name={["contactEmail"]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label={"Phone"}
          name={["phone"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Supported Services"}
          name={["supportedServices"]}
        >
          <Select
            mode="multiple"
            placeholder="Select supported services"
            options={[
              { value: "transfers", label: "Transfers" },
              { value: "payments", label: "Payments" },
              { value: "deposits", label: "Deposits" },
              { value: "withdrawals", label: "Withdrawals" },
              { value: "loans", label: "Loans" },
              { value: "cards", label: "Cards" },
              { value: "mobile_banking", label: "Mobile Banking" },
              { value: "online_banking", label: "Online Banking" },
            ]}
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
