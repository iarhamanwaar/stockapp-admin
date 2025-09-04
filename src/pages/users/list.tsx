import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTable as useRefineTable,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { LoadingTable } from "@/components/ui/loading";

interface User extends BaseRecord {
  id: string;
  email: string;
  role: string;
  phoneNumber: string;
  isVerified: boolean;
  createdAt: string;
}

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "email",
        accessorKey: "email", 
        header: "Email",
      },
      {
        id: "role",
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => (
          <Badge variant="secondary">{getValue<string>()}</Badge>
        ),
      },
      {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Phone Number",
      },
      {
        id: "isVerified",
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ getValue }) => (
          <Badge variant={getValue<boolean>() ? "default" : "destructive"}>
            {getValue<boolean>() ? "Yes" : "No"}
          </Badge>
        ),
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => {
          const date = new Date(getValue<string>());
          return date.toLocaleDateString();
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/users/show/${row.original.id}`)}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/users/edit/${row.original.id}`)}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQueryResult: { data: tableData, isLoading },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      resource: "user",
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage system users and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingTable rows={8} columns={6} />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {getRowModel().rows?.length ? (
                    getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};