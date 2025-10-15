import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const PricingEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit
      resource="pricing"
      title="Pricing Configuration"
      listPath="/pricing"
      fields={[
        {
          key: 'serviceFeePercentage',
          label: 'Service Fee Percentage (%)',
          type: 'number'
        },
        {
          key: 'vendorCommissionPercentage',
          label: 'Vendor Commission Percentage (%)',
          type: 'number'
        },
        {
          key: 'taxPercentage',
          label: 'Tax Percentage (%)',
          type: 'number'
        },
        {
          key: 'deliveryBaseFee',
          label: 'Delivery Base Fee (MXN)',
          type: 'number'
        },
        {
          key: 'deliveryRatePerKm',
          label: 'Delivery Rate per Kilometer (MXN)',
          type: 'number'
        },
        {
          key: 'deliveryRatePerKg',
          label: 'Delivery Rate per Kilogram (MXN)',
          type: 'number'
        },
        {
          key: 'deliveryRatePerCubicMeter',
          label: 'Delivery Rate per Cubic Meter (MXN)',
          type: 'number'
        },
        {
          key: 'deliverySurgeFee',
          label: 'Delivery Surge Fee (MXN)',
          type: 'number'
        },
        {
          key: 'riderPickupFee',
          label: 'Rider Pickup Fee (MXN)',
          type: 'number'
        },
        {
          key: 'riderDropoffFee',
          label: 'Rider Dropoff Fee (MXN)',
          type: 'number'
        },
        {
          key: 'riderDistanceFeePerKm',
          label: 'Rider Distance Fee per Kilometer (MXN)',
          type: 'number'
        },
        {
          key: 'riderBonusFee',
          label: 'Rider Bonus Fee (MXN)',
          type: 'number'
        },
        {
          key: 'smallOrderThreshold',
          label: 'Small Order Threshold (MXN)',
          type: 'number'
        },
        {
          key: 'smallOrderFee',
          label: 'Small Order Fee (MXN)',
          type: 'number'
        },
        {
          key: 'notes',
          label: 'Notes',
          type: 'textarea'
        },
      ]}
    />
  );
};
