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
  ImageField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ProductImageList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column 
          dataIndex="imageUrl" 
          title={"Image"} 
          render={(value: string) => (
            <ImageField 
              value={value} 
              title="Product Image"
              width={80}
              height={80}
              style={{ objectFit: 'cover' }}
            />
          )}
        />
        <Table.Column dataIndex="imageUrl" title={"Image URL"} width={200} />
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
              <EditButton hideText size="small" recordItemId={record.id} resource="productimage" />
              <ShowButton hideText size="small" recordItemId={record.id} resource="productimage" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};