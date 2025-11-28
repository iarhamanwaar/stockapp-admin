import React, { useState } from "react";
import { IResourceComponentsProps, useCreate, useList } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner, LoadingCard } from "@/components/ui/loading";

interface BusinessType {
  id: string;
  name: string;
  nameEs?: string;
}

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    nameEs: "",
    description: "",
    businessTypeId: "",
  });

  // Fetch business types for dropdown
  const { data: businessTypesData, isLoading: businessTypesLoading } = useList<BusinessType>({
    resource: "business-types",
    pagination: {
      pageSize: 100, // Get all business types
    },
  });

  const { mutate: createCategory, isLoading: isSubmitting } = useCreate();

  const businessTypes = businessTypesData?.data || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.businessTypeId) {
      alert("Please select a business type");
      return;
    }

    createCategory(
      {
        resource: "categories",
        values: {
          name: formData.name,
          nameEs: formData.nameEs || undefined,
          description: formData.description || undefined,
          businessTypeId: formData.businessTypeId,
          isActive: true,
        },
      },
      {
        onSuccess: () => {
          navigate("/categories");
        },
      }
    );
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/categories")}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
          <h1 className="text-2xl font-bold">Create Category</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
          <CardDescription>
            Create a new category and assign it to a business type
          </CardDescription>
        </CardHeader>
        <CardContent>
          {businessTypesLoading ? (
            <LoadingCard lines={4} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Business Type Selection */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessTypeId">Business Type *</Label>
                  <Select
                    value={formData.businessTypeId}
                    onValueChange={(value) => handleInputChange("businessTypeId", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((bt) => (
                        <SelectItem key={bt.id} value={bt.id}>
                          {bt.name} {bt.nameEs ? `(${bt.nameEs})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Select which business type this category belongs to
                  </p>
                </div>

                {/* Name (English) */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name (English) *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter category name in English"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {/* Name (Spanish) */}
                <div className="space-y-2">
                  <Label htmlFor="nameEs">Name (Spanish)</Label>
                  <Input
                    id="nameEs"
                    type="text"
                    value={formData.nameEs}
                    onChange={(e) => handleInputChange("nameEs", e.target.value)}
                    placeholder="Enter category name in Spanish"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter category description (optional)"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.businessTypeId || !formData.name}
                  className="flex items-center justify-center"
                >
                  {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
                  <CheckIcon className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Creating..." : "Create Category"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/categories")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
