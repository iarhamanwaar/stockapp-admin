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

export const NotificationList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column
          dataIndex="message"
          title={"Message"}
          render={(message: string) => (
            <span>{message?.length > 60 ? `${message.substring(0, 60)}...` : message}</span>
          )}
        />
        <Table.Column
          dataIndex="priority"
          title={"Priority"}
          render={(priority: string) => {
            let color = 'default';
            switch (priority) {
              case 'high':
                color = 'red';
                break;
              case 'medium':
                color = 'orange';
                break;
              case 'low':
                color = 'green';
                break;
              default:
                color = 'default';
            }
            return <Tag color={color}>{priority?.toUpperCase()}</Tag>;
          }}
        />
        <Table.Column
          dataIndex="isRead"
          title={"Read"}
          render={(value: boolean) => (
            <BooleanField value={value} />
          )}
        />
        <Table.Column dataIndex="userId" title={"User ID"} />
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
              <EditButton hideText size="small" recordItemId={record.id} resource="notifications" />
              <ShowButton hideText size="small" recordItemId={record.id} resource="notifications" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
