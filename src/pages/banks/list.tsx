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

export const BankList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Bank Name"} />
        <Table.Column dataIndex="code" title={"Bank Code"} />
        <Table.Column dataIndex="country" title={"Country"} />
        <Table.Column
          dataIndex="isActive"
          title={"Active"}
          render={(value: boolean) => (
            <BooleanField value={value} />
          )}
        />
        <Table.Column
          dataIndex="supportedServices"
          title={"Services"}
          render={(services: string[]) => (
            <div>
              {services?.map((service, index) => (
                <Tag key={index} color="blue">
                  {service}
                </Tag>
              )) || 'N/A'}
            </div>
          )}
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
              <EditButton hideText size="small" recordItemId={record.id} resource="banks" />
              <ShowButton hideText size="small" recordItemId={record.id} resource="banks" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
