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
  BooleanField,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const RiderList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="firstName" title={"First Name"} />
        <Table.Column dataIndex="lastName" title={"Last Name"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="phone" title={"Phone"} />
        <Table.Column dataIndex="vehicleType" title={"Vehicle Type"} />
        <Table.Column
          dataIndex="isAvailable"
          title={"Available"}
          render={(value: boolean) => (
            <BooleanField value={value} />
          )}
        />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(status: string) => {
            const color = status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'orange';
            return <Tag color={color}>{status?.toUpperCase()}</Tag>;
          }}
        />
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
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
