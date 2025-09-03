import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
} from "@refinedev/core";
import {
  useTable,
  List,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { PageLoading } from "../../components";

export const MessageList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "messages",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id" loading={tableProps.loading}>
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex="content"
          title={"Content"}
          render={(content: string) => (
            <span>
              {content?.length > 50 
                ? `${content.substring(0, 50)}...` 
                : content || 'No content'
              }
            </span>
          )}
        />
        <Table.Column dataIndex="senderId" title={"Sender ID"} />
        <Table.Column dataIndex="chatId" title={"Chat ID"} />
        <Table.Column
          dataIndex="messageType"
          title={"Type"}
          render={(type: string) => {
            let color = 'default';
            switch (type) {
              case 'text':
                color = 'blue';
                break;
              case 'image':
                color = 'green';
                break;
              case 'file':
                color = 'orange';
                break;
              case 'system':
                color = 'gray';
                break;
              default:
                color = 'default';
            }
            return <Tag color={color}>{type?.toUpperCase() || 'TEXT'}</Tag>;
          }}
        />
        <Table.Column
          dataIndex="isRead"
          title={"Read"}
          render={(isRead: boolean) => (
            <Tag color={isRead ? 'green' : 'orange'}>
              {isRead ? 'READ' : 'unread'}
            </Tag>
          )}
        />
        <Table.Column
          dataIndex={["timestamp"]}
          title={"Sent at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
