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

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "order",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id" loading={tableProps.loading}>
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column 
          dataIndex="totalAmount" 
          title={"Total"}
          render={(value: number) => value ? `$${value}` : "-"}
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