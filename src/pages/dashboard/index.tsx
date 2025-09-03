import React from "react";
import { useCustom } from "@refinedev/core";
import { Card, Col, Row, Statistic, Typography, List, Avatar } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  FileImageOutlined,
  TagOutlined,
  ShopOutlined,
  TruckOutlined,
  StarOutlined,
  DollarOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { PageLoading } from "../../components";

const { Title } = Typography;

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalImages: number;
  totalCategories: number;
  totalSellers: number;
  totalBuyers: number;
  totalRiders: number;
  totalReviews: number;
  totalTransactions: number;
}

interface RecentUser {
  id: string;
  email: string;
  createdAt: string;
}

interface RecentOrder {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}

interface DashboardData {
  stats: DashboardStats;
  recentActivity: {
    recentUsers: RecentUser[];
    recentOrders: RecentOrder[];
  };
}

export const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useCustom<DashboardData>({
    url: "dashboard/stats",
    method: "get",
  });

  if (isLoading) return <PageLoading tip="Loading dashboard data..." />;
  if (error) return (
    <div style={{ padding: '24px', textAlign: 'center', color: '#FF6060' }}>
      <h3>Error loading dashboard</h3>
      <p>Unable to load dashboard statistics. Please try again.</p>
    </div>
  );

  const stats = data?.data?.stats;
  const recentActivity = data?.data?.recentActivity;

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <UserOutlined style={{ fontSize: 24, color: "#3B1040" }} />,
      color: "#3B1040",
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: <ProductOutlined style={{ fontSize: 24, color: "#50287D" }} />,
      color: "#50287D",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingCartOutlined style={{ fontSize: 24, color: "#6A0DAD" }} />,
      color: "#6A0DAD",
    },
    {
      title: "Total Images",
      value: stats?.totalImages || 0,
      icon: <FileImageOutlined style={{ fontSize: 24, color: "#3B1040" }} />,
      color: "#3B1040",
    },
    {
      title: "Categories",
      value: stats?.totalCategories || 0,
      icon: <TagOutlined style={{ fontSize: 24, color: "#50287D" }} />,
      color: "#50287D",
    },
    {
      title: "Sellers",
      value: stats?.totalSellers || 0,
      icon: <ShopOutlined style={{ fontSize: 24, color: "#6A0DAD" }} />,
      color: "#6A0DAD",
    },
    {
      title: "Buyers",
      value: stats?.totalBuyers || 0,
      icon: <UserOutlined style={{ fontSize: 24, color: "#3B1040" }} />,
      color: "#3B1040",
    },
    {
      title: "Riders",
      value: stats?.totalRiders || 0,
      icon: <TruckOutlined style={{ fontSize: 24, color: "#50287D" }} />,
      color: "#50287D",
    },
    {
      title: "Reviews",
      value: stats?.totalReviews || 0,
      icon: <StarOutlined style={{ fontSize: 24, color: "#6A0DAD" }} />,
      color: "#6A0DAD",
    },
    {
      title: "Transactions",
      value: stats?.totalTransactions || 0,
      icon: <DollarOutlined style={{ fontSize: 24, color: "#3B1040" }} />,
      color: "#3B1040",
    },
  ];

  return (
    <div style={{ padding: 0 }}>
      <Title level={2} className="h2-semibold" style={{ marginBottom: 24, color: '#1A1A1A' }}>Dashboard</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((stat, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Users" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={recentActivity?.recentUsers || []}
              renderItem={(user: RecentUser) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={user.email}
                    description={new Date(user.createdAt).toLocaleDateString()}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Recent Orders" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={recentActivity?.recentOrders || []}
              renderItem={(order: RecentOrder) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ShoppingCartOutlined />} />}
                    title={`Order #${order.id}`}
                    description={
                      <div>
                        <div>Status: {order.status}</div>
                        <div>Total: ${order.total}</div>
                        <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};