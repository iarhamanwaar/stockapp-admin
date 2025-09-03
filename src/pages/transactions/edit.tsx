import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";

export const TransactionEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const transactionData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Amount"}
          name={["amount"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
          />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"pending"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "failed", label: "Failed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Type"}
          name={["type"]}
          initialValue={"credit"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "credit", label: "Credit" },
              { value: "debit", label: "Debit" },
              { value: "refund", label: "Refund" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Payment Method"}
          name={["paymentMethod"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "credit_card", label: "Credit Card" },
              { value: "debit_card", label: "Debit Card" },
              { value: "paypal", label: "PayPal" },
              { value: "bank_transfer", label: "Bank Transfer" },
              { value: "cash", label: "Cash" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Reference"}
          name={["reference"]}
        >
          <Input placeholder="Transaction reference number" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
