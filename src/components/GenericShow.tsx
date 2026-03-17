import React from "react";
import {
  IResourceComponentsProps,
  useShow,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingCard } from "@/components/ui/loading";
import { GenericDelete } from "./GenericDelete";

interface GenericShowProps extends IResourceComponentsProps {
  resource: string;
  title: string;
  listPath: string;
  canDelete?: boolean; // Add option to enable/disable delete
}

export const GenericShow: React.FC<GenericShowProps> = ({ 
  resource, 
  title, 
  listPath,
  canDelete = true, // Default to true
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { queryResult } = useShow({ 
    resource,
    id: id,
  });
  const { data, isLoading, error } = queryResult;

  const record = data?.data;

  if (isLoading) {
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
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Loading {title}...</CardTitle>
            <CardDescription>Please wait while we fetch the {title.toLowerCase()} information</CardDescription>
          </CardHeader>
          <CardContent>
            <LoadingCard lines={8} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
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
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error Loading {title}</CardTitle>
            <CardDescription>Unable to load {title.toLowerCase()} information. This might be because the backend API is not running.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Since we're using hardcoded authentication, the data endpoints are not available.</p>
              <p>This page will work once connected to a real backend API.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isImageUrl = (key: string, value: any): boolean => {
    if (typeof value !== 'string') return false;
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('image') || lowerKey.includes('img') || lowerKey.includes('photo') || lowerKey.includes('thumbnail') || lowerKey.includes('avatar')) {
      return true;
    }
    if (/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i.test(value)) {
      return true;
    }
    return false;
  };

  const isImageArray = (key: string, value: any): boolean => {
    if (!Array.isArray(value) || value.length === 0) return false;
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('image') || lowerKey.includes('img') || lowerKey.includes('photo') || lowerKey.includes('gallery')) {
      return value.some((v: any) => typeof v === 'string' || (typeof v === 'object' && v?.imageUrl));
    }
    return false;
  };

  const renderValue = (key: string, value: any) => {
    if (value === null || value === undefined) return "N/A";

    // Handle image arrays (e.g. images: [{imageUrl: "..."}, ...] or ["url1", "url2"])
    if (isImageArray(key, value)) {
      const urls = (value as any[])
        .map((v: any) => (typeof v === 'string' ? v : v?.imageUrl))
        .filter(Boolean);
      if (urls.length === 0) return "N/A";
      return (
        <div className="flex flex-wrap gap-2 mt-1">
          {urls.map((url: string, i: number) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={url}
                alt={`${key} ${i + 1}`}
                className="h-24 w-24 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </a>
          ))}
        </div>
      );
    }

    // Handle single image URLs
    if (isImageUrl(key, value)) {
      return (
        <div className="mt-1">
          <a href={value} target="_blank" rel="noopener noreferrer">
            <img
              src={value}
              alt={key}
              className="h-32 w-32 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                if (img.nextSibling) return;
                const fallback = document.createElement('span');
                fallback.className = 'text-sm text-muted-foreground';
                fallback.textContent = value;
                img.parentElement?.appendChild(fallback);
              }}
            />
          </a>
        </div>
      );
    }

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

    if (Array.isArray(value)) {
      if (value.length === 0) return 'N/A';
      // Array of objects - render as readable list
      if (typeof value[0] === 'object' && value[0] !== null) {
        return (
          <div className="space-y-2 mt-1">
            {value.map((item: any, i: number) => (
              <div key={i} className="bg-gray-50 rounded p-2 text-xs">
                {Object.entries(item)
                  .filter(([k]) => !['id', 'deletedAt', 'createdAt', 'updatedAt'].includes(k))
                  .map(([k, v]) => (
                    <div key={k}>
                      <span className="font-medium capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}:</span>{' '}
                      {v === null || v === undefined ? 'N/A' : String(v)}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        );
      }
      return value.join(', ') || 'N/A';
    }

    // Handle nested objects - extract meaningful display value
    if (typeof value === 'object' && value !== null) {
      const displayValue = value.name || value.businessName || value.email || value.title || value.label;
      if (displayValue) {
        return String(displayValue);
      }
      // Render key-value pairs for objects like stockInfo
      return (
        <div className="bg-gray-50 rounded p-2 text-xs mt-1 space-y-1">
          {Object.entries(value)
            .filter(([k]) => !['id', 'deletedAt', 'createdAt', 'updatedAt'].includes(k))
            .map(([k, v]) => (
              <div key={k}>
                <span className="font-medium capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}:</span>{' '}
                {v === null || v === undefined ? 'N/A' : typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v)}
              </div>
            ))}
        </div>
      );
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
          {canDelete && record?.id && (
            <GenericDelete
              id={String(record.id)}
              resource={resource}
              title={title}
              redirectTo={listPath}
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              }
            />
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title} #{record?.id}</CardTitle>
          <CardDescription>View {title.toLowerCase()} details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {record && Object.entries(record)
              .filter(([key]) => {
                // Skip redundant ID fields when the related object is present
                if (key === 'categoryId' && record.category) return false;
                if ((key === 'userId' || key === 'supplierId') && record.user) return false;
                return true;
              })
              .map(([key, value]) => {
              const isImg = isImageUrl(key, value) || isImageArray(key, value);
              const isWide = isImg || (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value as any).name && !(value as any).email);
              return (
                <div key={key} className={isWide ? 'md:col-span-2' : ''}>
                  <label className="text-sm font-medium text-muted-foreground capitalize">
                    {key === 'user' ? 'Supplier' : key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="text-sm">{renderValue(key, value)}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};