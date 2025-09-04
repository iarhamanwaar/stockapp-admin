import React from "react";
import {
  IResourceComponentsProps,
  useForm,
  useGo,
} from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner, LoadingCard } from "@/components/ui/loading";

interface GenericEditProps extends IResourceComponentsProps {
  resource: string;
  title: string;
  listPath: string;
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'email' | 'number' }[];
}

export const GenericEdit: React.FC<GenericEditProps> = ({ 
  resource, 
  title, 
  listPath,
  fields
}) => {
  const navigate = useNavigate();
  const go = useGo();
  const { id } = useParams();

  const {
    refineCore: { formLoading, mutationResult, onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resource,
    action: id ? "edit" : "create",
    id: id as string,
  });

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
            Back to {title}s
          </Button>
          <h1 className="text-2xl font-bold">{id ? "Edit" : "Create"} {title}</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{id ? "Edit" : "Create"} {title}</CardTitle>
          <CardDescription>
            {id ? `Update ${title.toLowerCase()} information` : `Create a new ${title.toLowerCase()}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.key}
                      {...register(field.key)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      type={field.type}
                      {...register(field.key)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                  {errors[field.key] && (
                    <p className="text-sm text-destructive">
                      {errors[field.key]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={formLoading}
                className="flex items-center justify-center"
              >
                {formLoading && <LoadingSpinner size="sm" className="mr-2" />}
                <CheckIcon className="h-4 w-4 mr-2" />
                {formLoading ? "Saving..." : "Save"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(listPath)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};