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
import { Table, Space, Rate } from "antd";

export const SellerReviewList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex="rating"
          title={"Rating"}
          render={(rating: number) => <Rate disabled defaultValue={rating} />}
        />
        <Table.Column
          dataIndex="comment"
          title={"Comment"}
          render={(comment: string) => (
            <span>{comment?.length > 50 ? `${comment.substring(0, 50)}...` : comment}</span>
          )}
        />
        <Table.Column
          dataIndex="isApproved"
          title={"Approved"}
          render={(value: boolean) => (
            <BooleanField value={value} />
          )}
        />
        <Table.Column
          dataIndex="sellerId"
          title={"Seller ID"}
        />
        <Table.Column
          dataIndex="buyerId"
          title={"Buyer ID"}
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
