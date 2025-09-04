import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
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
import { EyeIcon, PencilIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { LoadingTable } from "@/components/ui/loading";

interface GenericListProps extends IResourceComponentsProps {
  resource: string;
  title: string;
  description: string;
  basePath: string;
  columns: string[];
}

export const GenericList: React.FC<GenericListProps> = ({ 
  resource, 
  title, 
  description,
  basePath,
  columns: fieldColumns
}) => {
  const navigate = useNavigate();

  const columns = React.useMemo<ColumnDef<BaseRecord>[]>(
    () => [
      ...fieldColumns.map(field => ({
        id: field,
        accessorKey: field,
        header: field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1'),
        cell: ({ getValue, row }: any) => {
          const value = getValue();
          
          // Handle different data types
          if (typeof value === 'boolean') {
            return <Badge variant={value ? 'default' : 'destructive'}>{value ? "Yes" : "No"}</Badge>;
          }
          
          if (field.includes('status')) {
            return <Badge variant="secondary">{value || 'Unknown'}</Badge>;
          }
          
          if (field.includes('date') || field.includes('At')) {
            return value ? new Date(value).toLocaleDateString() : 'N/A';
          }
          
          return value || 'N/A';
        },
      })),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`${basePath}/show/${row.original.id}`)}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => navigate(`${basePath}/edit/${row.original.id}`)}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [navigate, basePath, fieldColumns]
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQueryResult: { data: tableData, isLoading },
      current,
      setCurrent,
      pageCount,
      pageSize,
      setPageSize,
    },
  } = useTable({
    columns,
    refineCoreProps: {
      resource,
      pagination: {
        current: 1,
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingTable rows={8} columns={fieldColumns.length + 1} />
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
                        No {title.toLowerCase()} found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          {!isLoading && (
            <div className="flex items-center justify-between space-x-6 lg:space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="h-8 w-[70px] rounded border border-input bg-background px-3 py-2 text-sm"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {current} of {pageCount || 1}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => setCurrent(1)}
                  disabled={current === 1}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                  <ChevronLeftIcon className="h-4 w-4 -ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrent(current - 1)}
                  disabled={current === 1}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrent(current + 1)}
                  disabled={current === pageCount}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => setCurrent(pageCount || 1)}
                  disabled={current === pageCount}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronRightIcon className="h-4 w-4" />
                  <ChevronRightIcon className="h-4 w-4 -ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};