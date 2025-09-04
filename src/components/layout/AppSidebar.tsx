import React from "react";
import { useMenu, useLogout } from "@refinedev/core";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  UserIcon,
  UsersIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  PhotoIcon,
  TagIcon,
  RectangleStackIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  TruckIcon,
  StarIcon,
  CurrencyDollarIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  ChartBarSquareIcon,
  ArrowLeftStartOnRectangleIcon,
  CubeIcon,
  BuildingOffice2Icon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ComponentType<any>> = {
  "dashboard": ChartBarSquareIcon,
  "user": UsersIcon,
  "products": CubeIcon,
  "order": ShoppingCartIcon,
  "productimage": PhotoIcon,
  "categories": RectangleStackIcon,
  "businesstypes": BuildingOffice2Icon,
  "materials": TagIcon,
  "sellers": BuildingStorefrontIcon,
  "buyers": UserGroupIcon,
  "riders": TruckIcon,
  "productreviews": StarIcon,
  "sellerreviews": StarIcon,
  "transactions": CurrencyDollarIcon,
  "notifications": BellIcon,
  "chats": ChatBubbleLeftRightIcon,
  "messages": EnvelopeIcon,
  "banks": BuildingLibraryIcon,
};

export const AppSidebar: React.FC = () => {
  const { menuItems } = useMenu();
  const { mutate: logout } = useLogout();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="text-xl font-bold text-sidebar-primary">StockApp Admin</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = iconMap[item.key] || iconMap[item.name] || Squares2X2Icon;
                const isActive = item.route === "/" 
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.route || "");
                
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                    >
                      <Link to={item.route || "#"} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => logout()}>
              <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};