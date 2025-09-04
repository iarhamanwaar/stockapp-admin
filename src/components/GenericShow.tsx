import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface GenericShowProps extends IResourceComponentsProps {
  resource: string;
  title: string;
  listPath: string;
}

export const GenericShow: React.FC<GenericShowProps> = ({ 
  resource, 
  title, 
  listPath 
}) => {
  const navigate = useNavigate();
  const { queryResult } = useShow({ resource });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading {title.toLowerCase()}...</div>
      </div>
    );
  }

  const renderValue = (key: string, value: any) => {
    if (value === null || value === undefined) return "N/A";
    
    if (typeof value === "boolean") {
      return (
        <Badge variant={value ? 'default' : 'destructive'}>
          {value ? "Yes" : "No"}
        </Badge>
      );
    }
    
    if (key.includes("date") || key.includes("At")) {
      return new Date(value).toLocaleString();
    }
    
    if (key.includes("status")) {
      return <Badge>{value}</Badge>;
    }
    
    return value.toString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(listPath)}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to {title}
          </Button>
          <h1 className="text-2xl font-bold">{title} Details</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`${listPath}/edit/${record?.id}`)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title} #{record?.id}</CardTitle>
          <CardDescription>View {title.toLowerCase()} details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {record && Object.entries(record).map(([key, value]) => (
              <div key={key}>
                <label className="text-sm font-medium text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="text-sm">{renderValue(key, value)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};