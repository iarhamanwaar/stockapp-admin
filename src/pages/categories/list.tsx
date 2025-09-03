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

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "categories",
  });

  return (
    <List>
      <Table 
        {...tableProps} 
        rowKey="id"
        loading={tableProps.loading}
      >
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="description" title={"Description"} />
        <Table.Column
          dataIndex="isActive"
          title={"Active"}
          render={(value: boolean) => (value ? "Yes" : "No")}
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
              <EditButton hideText size="small" recordItemId={record.id} resource="categories" />
              <ShowButton hideText size="small" recordItemId={record.id} resource="categories" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};