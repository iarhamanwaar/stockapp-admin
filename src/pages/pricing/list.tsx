import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericList } from "../../components/GenericList";

export const PricingList: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericList
      resource="pricing"
      title="Pricing Configurations"
      description="Manage pricing models and fee structures"
      basePath="/pricing"
      columns={[
        'id',
        'serviceFeePercentage',
        'vendorCommissionPercentage',
        'deliveryBaseFee',
        'isActive',
        'createdAt'
      ]}
      enableSearch={false}
      canDelete={false}
      canCreate={false}
    />
  );
};
