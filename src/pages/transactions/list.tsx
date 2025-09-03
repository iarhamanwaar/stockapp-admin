import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  NumberField,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const TransactionList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex="amount"
          title={"Amount"}
          render={(amount: number) => <NumberField value={amount} options={{ style: "currency", currency: "USD" }} />}
        />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(status: string) => {
            let color = 'default';
            switch (status) {
              case 'completed':
                color = 'green';
                break;
              case 'pending':
                color = 'orange';
                break;
              case 'failed':
                color = 'red';
                break;
              case 'cancelled':
                color = 'gray';
                break;
              default:
                color = 'default';
            }
            return <Tag color={color}>{status?.toUpperCase()}</Tag>;
          }}
        />
        <Table.Column
          dataIndex="type"
          title={"Type"}
          render={(type: string) => {
            const color = type === 'credit' ? 'green' : type === 'debit' ? 'red' : 'blue';
            return <Tag color={color}>{type?.toUpperCase()}</Tag>;
          }}
        />
        <Table.Column dataIndex="paymentMethod" title={"Payment Method"} />
        <Table.Column dataIndex="orderId" title={"Order ID"} />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} resource="transactions" />
              <ShowButton hideText size="small" recordItemId={record.id} resource="transactions" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
