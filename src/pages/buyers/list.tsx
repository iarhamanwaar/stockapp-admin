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
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const BuyerList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column dataIndex="firstName" title={"First Name"} />
        <Table.Column dataIndex="lastName" title={"Last Name"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="phone" title={"Phone"} />
        <Table.Column
          dataIndex="isVerified"
          title={"Verified"}
          render={(value: boolean) => (value ? "Yes" : "No")}
        />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(value: string) => value?.toUpperCase() || "ACTIVE"}
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