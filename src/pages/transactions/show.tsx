import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import {
  Show,
  TextField,
  DateField,
  NumberField,
} from "@refinedev/antd";
import { Typography, Tag } from "antd";

const { Title } = Typography;

export const TransactionShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "transactions",
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit canDelete resource="transactions">
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Amount"}</Title>
      <NumberField value={record?.amount} options={{ style: "currency", currency: "USD" }} />
      <Title level={5}>{"Status"}</Title>
      <Tag color={
        record?.status === 'completed' ? 'green' :
        record?.status === 'pending' ? 'orange' :
        record?.status === 'failed' ? 'red' :
        record?.status === 'cancelled' ? 'gray' : 'default'
      }>
        {record?.status?.toUpperCase()}
      </Tag>
      <Title level={5}>{"Type"}</Title>
      <Tag color={record?.type === 'credit' ? 'green' : record?.type === 'debit' ? 'red' : 'blue'}>
        {record?.type?.toUpperCase()}
      </Tag>
      <Title level={5}>{"Payment Method"}</Title>
      <TextField value={record?.paymentMethod} />
      <Title level={5}>{"Order ID"}</Title>
      <TextField value={record?.orderId} />
      <Title level={5}>{"User ID"}</Title>
      <TextField value={record?.userId} />
      <Title level={5}>{"Reference"}</Title>
      <TextField value={record?.reference || 'N/A'} />
      <Title level={5}>{"Created at"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Updated at"}</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
