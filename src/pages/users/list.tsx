import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
} from "@refinedev/core";
import {
  useTable,
  List,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Button } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "../../components";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "user",
  });
  
  const navigate = useNavigate();

  return (
    <List>
      <Table {...tableProps} rowKey="id" loading={tableProps.loading}>
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="role" title={"Role"} />
        <Table.Column dataIndex="phoneNumber" title={"Phone"} />
        <Table.Column
          dataIndex="isVerified"
          title={"Verified"}
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
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                size="small"
                onClick={() => navigate(`/users/edit/${record.id}`)}
              />
              <Button 
                icon={<EyeOutlined />} 
                size="small"
                onClick={() => navigate(`/users/show/${record.id}`)}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};