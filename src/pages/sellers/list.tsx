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
import { PageLoading } from "../../components";

export const SellerList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "sellers",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id" loading={tableProps.loading}>
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column dataIndex="businessName" title={"Business Name"} />
        <Table.Column dataIndex="contactPerson" title={"Contact Person"} />
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
          render={(value: string) => value?.toUpperCase() || "PENDING"}
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
              <EditButton hideText size="small" recordItemId={record.id} resource="sellers" />
              <ShowButton hideText size="small" recordItemId={record.id} resource="sellers" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};