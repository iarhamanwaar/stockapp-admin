import React from "react";
import { useCustom } from "@refinedev/core";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingCard, LoadingSpinner } from "@/components/ui/loading";
import {
  UserIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  PhotoIcon,
  TagIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  StarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your StockApp admin panel</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <LoadingCard lines={1} />
              </CardHeader>
              <CardContent>
                <LoadingCard lines={2} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Loading recent activity...</CardDescription>
            </CardHeader>
            <CardContent>
              <LoadingCard lines={5} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Loading recent activity...</CardDescription>
            </CardHeader>
            <CardContent>
              <LoadingCard lines={5} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error loading dashboard</CardTitle>
            <CardDescription>Unable to load dashboard statistics. Please try again.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const stats = data?.data?.stats;
  const recentActivity = data?.data?.recentActivity;

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: UserIcon,
      description: "Active users in the system",
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: ShoppingBagIcon,
      description: "Products in catalog",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCartIcon,
      description: "Orders processed",
    },
    {
      title: "Total Images",
      value: stats?.totalImages || 0,
      icon: PhotoIcon,
      description: "Product images uploaded",
    },
    {
      title: "Categories",
      value: stats?.totalCategories || 0,
      icon: TagIcon,
      description: "Product categories",
    },
    {
      title: "Sellers",
      value: stats?.totalSellers || 0,
      icon: BuildingStorefrontIcon,
      description: "Active sellers",
    },
    {
      title: "Buyers",
      value: stats?.totalBuyers || 0,
      icon: UserIcon,
      description: "Registered buyers",
    },
    {
      title: "Riders",
      value: stats?.totalRiders || 0,
      icon: TruckIcon,
      description: "Delivery riders",
    },
    {
      title: "Reviews",
      value: stats?.totalReviews || 0,
      icon: StarIcon,
      description: "Customer reviews",
    },
    {
      title: "Transactions",
      value: stats?.totalTransactions || 0,
      icon: CurrencyDollarIcon,
      description: "Financial transactions",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your StockApp admin panel</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity?.recentUsers?.map((user: RecentUser) => (
                <div key={user.id} className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">No recent users</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest order activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity?.recentOrders?.map((order: RecentOrder) => (
                <div key={order.id} className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCartIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.status} • ${order.total} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">No recent orders</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};