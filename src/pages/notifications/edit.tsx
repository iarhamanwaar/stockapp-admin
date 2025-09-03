import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

const { TextArea } = Input;

export const NotificationEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const notificationData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Message"}
          name={["message"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={"Priority"}
          name={["priority"]}
          initialValue={"medium"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Type"}
          name={["type"]}
          initialValue={"general"}
        >
          <Select
            options={[
              { value: "general", label: "General" },
              { value: "order", label: "Order" },
              { value: "payment", label: "Payment" },
              { value: "system", label: "System" },
              { value: "marketing", label: "Marketing" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Read"}
          name={["isRead"]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
