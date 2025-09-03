import React from "react";
import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "./dataProvider";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";

import { ProductList, ProductShow, ProductEdit } from "./pages/products";
import { UserList, UserShow, UserEdit } from "./pages/users";
import { OrderList, OrderShow, OrderEdit } from "./pages/orders";
import { ProductImageList, ProductImageShow, ProductImageEdit } from "./pages/product-images";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "user",
                list: "/users",
                create: "/users/create",
                edit: "/users/edit/:id",
                show: "/users/show/:id",
                meta: {
                  canDelete: true,
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
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "stockapp-admin",
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2
                    Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="user" />}
                />
                
                {/* User Routes */}
                <Route path="/users">
                  <Route index element={<UserList />} />
                  <Route path="show/:id" element={<UserShow />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                </Route>

                {/* Product Routes */}
                <Route path="/products">
                  <Route index element={<ProductList />} />
                  <Route path="show/:id" element={<ProductShow />} />
                  <Route path="edit/:id" element={<ProductEdit />} />
                </Route>

                {/* Order Routes */}
                <Route path="/orders">
                  <Route index element={<OrderList />} />
                  <Route path="show/:id" element={<OrderShow />} />
                  <Route path="edit/:id" element={<OrderEdit />} />
                </Route>

                {/* Product Image Routes */}
                <Route path="/product-images">
                  <Route index element={<ProductImageList />} />
                  <Route path="show/:id" element={<ProductImageShow />} />
                  <Route path="edit/:id" element={<ProductImageEdit />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;