import React from "react";
import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ErrorComponent } from "./components/ErrorComponent";
import { Login } from "./pages/login";

import { ProductList, ProductShow, ProductEdit } from "./pages/products";
import { UserList, UserShow, UserEdit } from "./pages/users";
import { OrderList, OrderShow, OrderEdit } from "./pages/orders";
import { ProductImageList, ProductImageShow, ProductImageEdit } from "./pages/product-images";
import { CategoryList, CategoryShow, CategoryEdit, CategoryCreate } from "./pages/categories";
import { BusinessTypeList, BusinessTypeShow, BusinessTypeEdit, BusinessTypeCreate } from "./pages/business-types";
import { MaterialList, MaterialShow, MaterialEdit, MaterialCreate } from "./pages/materials";
import { SellerList, SellerShow, SellerEdit, PendingSellers } from "./pages/sellers";
import { BuyerList, BuyerShow, BuyerEdit } from "./pages/buyers";
import { RiderList, RiderShow, RiderEdit, PendingRiders } from "./pages/riders";
import { ProductReviewList, ProductReviewShow, ProductReviewEdit } from "./pages/product-reviews";
import { SellerReviewList, SellerReviewShow, SellerReviewEdit } from "./pages/seller-reviews";
import { TransactionList, TransactionShow, TransactionEdit } from "./pages/transactions";
import { NotificationList, NotificationShow, NotificationEdit } from "./pages/notifications";
import { ChatList, ChatShow } from "./pages/chats";
import { MessageList, MessageShow } from "./pages/messages";
import { BankList, BankShow, BankEdit } from "./pages/banks";
import { PricingList, PricingShow, PricingEdit } from "./pages/pricing";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          resources={[
            {
              name: "dashboard",
              list: "/",
              meta: {
                label: "Dashboard",
                icon: "dashboard",
              },
            },
            {
              name: "user",
              list: "/users",
              create: "/users/create",
              edit: "/users/edit/:id",
              show: "/users/show/:id",
              meta: {
                canDelete: true,
                label: "Users",
              },
            },
            {
              name: "products",
              list: "/products",
              create: "/products/create", 
              edit: "/products/edit/:id",
              show: "/products/show/:id",
              meta: {
                canDelete: true,
                label: "Products",
              },
            },
            {
              name: "order",
              list: "/orders",
              create: "/orders/create",
              edit: "/orders/edit/:id", 
              show: "/orders/show/:id",
              meta: {
                canDelete: true,
                label: "Orders",
              },
            },
            {
              name: "productimage",
              list: "/product-images",
              create: "/product-images/create",
              edit: "/product-images/edit/:id",
              show: "/product-images/show/:id", 
              meta: {
                canDelete: true,
                label: "Product Images",
              },
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                canDelete: true,
                label: "Categories",
              },
            },
            {
              name: "businesstypes",
              list: "/business-types",
              create: "/business-types/create",
              edit: "/business-types/edit/:id",
              show: "/business-types/show/:id",
              meta: {
                canDelete: true,
                label: "Business Types",
              },
            },
            {
              name: "materials",
              list: "/materials",
              create: "/materials/create",
              edit: "/materials/edit/:id",
              show: "/materials/show/:id",
              meta: {
                canDelete: true,
                label: "Materials",
              },
            },
            {
              name: "sellers",
              list: "/sellers",
              create: "/sellers/create",
              edit: "/sellers/edit/:id",
              show: "/sellers/show/:id",
              meta: {
                canDelete: true,
                label: "Sellers",
              },
            },
            {
              name: "pending-sellers",
              list: "/sellers/pending",
              show: "/sellers/show/:id",
              meta: {
                label: "Pending Sellers",
                icon: "⏳",
              },
            },
            {
              name: "buyers",
              list: "/buyers",
              create: "/buyers/create",
              edit: "/buyers/edit/:id",
              show: "/buyers/show/:id",
              meta: {
                canDelete: true,
                label: "Buyers",
              },
            },
            {
              name: "riders",
              list: "/riders",
              create: "/riders/create",
              edit: "/riders/edit/:id",
              show: "/riders/show/:id",
              meta: {
                canDelete: true,
                label: "Riders",
              },
            },
            {
              name: "pending-riders",
              list: "/riders/pending",
              show: "/riders/show/:id",
              meta: {
                label: "Pending Riders",
                icon: "⏳",
              },
            },
            {
              name: "productreviews",
              list: "/product-reviews",
              create: "/product-reviews/create",
              edit: "/product-reviews/edit/:id",
              show: "/product-reviews/show/:id",
              meta: {
                canDelete: true,
                label: "Product Reviews",
              },
            },
            {
              name: "sellerreviews",
              list: "/seller-reviews",
              create: "/seller-reviews/create",
              edit: "/seller-reviews/edit/:id",
              show: "/seller-reviews/show/:id",
              meta: {
                canDelete: true,
                label: "Seller Reviews",
              },
            },
            {
              name: "transactions",
              list: "/transactions",
              create: "/transactions/create",
              edit: "/transactions/edit/:id",
              show: "/transactions/show/:id",
              meta: {
                canDelete: true,
                label: "Transactions",
              },
            },
            {
              name: "notifications",
              list: "/notifications",
              create: "/notifications/create",
              edit: "/notifications/edit/:id",
              show: "/notifications/show/:id",
              meta: {
                canDelete: true,
                label: "Notifications",
              },
            },
            {
              name: "chats",
              list: "/chats",
              edit: "/chats/edit/:id",
              show: "/chats/show/:id",
              meta: {
                canDelete: true,
                label: "Chats",
              },
            },
            {
              name: "messages",
              list: "/messages",
              show: "/messages/show/:id",
              meta: {
                canDelete: true,
                label: "Messages",
              },
            },
            {
              name: "banks",
              list: "/banks",
              create: "/banks/create",
              edit: "/banks/edit/:id",
              show: "/banks/show/:id",
              meta: {
                canDelete: true,
                label: "Banks",
              },
            },
            {
              name: "pricing",
              list: "/pricing",
              create: "/pricing/create",
              edit: "/pricing/edit/:id",
              show: "/pricing/show/:id",
              meta: {
                canDelete: false,
                label: "Pricing Config",
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "stockapp-admin",
            title: {
              text: "Stock App Admin",
              icon: "📦",
            },
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<Login />}
                >
                  <AppLayout />
                </Authenticated>
              }
            >
              <Route index element={<Dashboard />} />
              
              <Route path="/users" element={<UserList />} />
              <Route path="/users/show/:id" element={<UserShow />} />
              <Route path="/users/edit/:id" element={<UserEdit />} />

              <Route path="/products" element={<ProductList />} />
              <Route path="/products/show/:id" element={<ProductShow />} />
              <Route path="/products/edit/:id" element={<ProductEdit />} />

              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/show/:id" element={<OrderShow />} />
              <Route path="/orders/edit/:id" element={<OrderEdit />} />

              <Route path="/product-images" element={<ProductImageList />} />
              <Route path="/product-images/show/:id" element={<ProductImageShow />} />
              <Route path="/product-images/edit/:id" element={<ProductImageEdit />} />

              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/show/:id" element={<CategoryShow />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              <Route path="/business-types" element={<BusinessTypeList />} />
              <Route path="/business-types/create" element={<BusinessTypeCreate />} />
              <Route path="/business-types/show/:id" element={<BusinessTypeShow />} />
              <Route path="/business-types/edit/:id" element={<BusinessTypeEdit />} />

              <Route path="/materials" element={<MaterialList />} />
              <Route path="/materials/create" element={<MaterialCreate />} />
              <Route path="/materials/show/:id" element={<MaterialShow />} />
              <Route path="/materials/edit/:id" element={<MaterialEdit />} />

              <Route path="/sellers/pending" element={<PendingSellers />} />
              <Route path="/sellers" element={<SellerList />} />
              <Route path="/sellers/show/:id" element={<SellerShow />} />
              <Route path="/sellers/edit/:id" element={<SellerEdit />} />

              <Route path="/buyers" element={<BuyerList />} />
              <Route path="/buyers/show/:id" element={<BuyerShow />} />
              <Route path="/buyers/edit/:id" element={<BuyerEdit />} />

              <Route path="/riders/pending" element={<PendingRiders />} />
              <Route path="/riders" element={<RiderList />} />
              <Route path="/riders/show/:id" element={<RiderShow />} />
              <Route path="/riders/edit/:id" element={<RiderEdit />} />

              <Route path="/product-reviews" element={<ProductReviewList />} />
              <Route path="/product-reviews/show/:id" element={<ProductReviewShow />} />
              <Route path="/product-reviews/edit/:id" element={<ProductReviewEdit />} />

              <Route path="/seller-reviews" element={<SellerReviewList />} />
              <Route path="/seller-reviews/show/:id" element={<SellerReviewShow />} />
              <Route path="/seller-reviews/edit/:id" element={<SellerReviewEdit />} />

              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/transactions/show/:id" element={<TransactionShow />} />
              <Route path="/transactions/edit/:id" element={<TransactionEdit />} />

              <Route path="/notifications" element={<NotificationList />} />
              <Route path="/notifications/show/:id" element={<NotificationShow />} />
              <Route path="/notifications/edit/:id" element={<NotificationEdit />} />

              <Route path="/chats" element={<ChatList />} />
              <Route path="/chats/show/:id" element={<ChatShow />} />

              <Route path="/messages" element={<MessageList />} />
              <Route path="/messages/show/:id" element={<MessageShow />} />

              <Route path="/banks" element={<BankList />} />
              <Route path="/banks/show/:id" element={<BankShow />} />
              <Route path="/banks/edit/:id" element={<BankEdit />} />

              <Route path="/pricing" element={<PricingList />} />
              <Route path="/pricing/show/:id" element={<PricingShow />} />
              <Route path="/pricing/edit/:id" element={<PricingEdit />} />

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;