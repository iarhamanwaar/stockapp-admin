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

export const ChatList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "chats",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id" loading={tableProps.loading}>
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex="participants"
          title={"Participants"}
          render={(participants: any[]) => (
            <span>
              {participants?.length > 0 
                ? `${participants.length} participants`
                : 'No participants'
              }
            </span>
          )}
        />
        <Table.Column
          dataIndex="lastMessage"
          title={"Last Message"}
          render={(lastMessage: string) => (
            <span>
              {lastMessage?.length > 40 
                ? `${lastMessage.substring(0, 40)}...` 
                : lastMessage || 'No messages'
              }
            </span>
          )}
        />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(status: string) => {
            const color = status === 'active' ? 'green' : status === 'archived' ? 'gray' : 'orange';
            return <Tag color={color}>{status?.toUpperCase() || 'UNKNOWN'}</Tag>;
          }}
        />
        <Table.Column
          dataIndex="messageCount"
          title={"Messages"}
          render={(count: number) => count || 0}
        />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["updatedAt"]}
          title={"Last Activity"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} resource="chats" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
