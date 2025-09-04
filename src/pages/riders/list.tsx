import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const RiderList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList 
      resource="riders"
      title="Riders"
      description="Manage delivery riders"
      basePath="/riders"
      columns={['id', 'firstName', 'lastName', 'email', 'phone', 'vehicleType', 'isAvailable', 'status', 'createdAt']}
    />
  );
};