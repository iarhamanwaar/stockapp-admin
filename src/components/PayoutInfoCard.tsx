import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PayoutInfo } from "@/types/approval";

interface PayoutInfoCardProps {
  payoutInfo?: PayoutInfo | null;
}

const getConnectStatusBadge = (status: string | null) => {
  switch (status) {
    case 'active':
      return <Badge variant="default">Active</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'restricted':
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Restricted</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">Not Set Up</Badge>;
  }
};

const getMethodLabel = (method: string | null) => {
  switch (method) {
    case 'stripe':
      return 'Stripe';
    case 'paypal':
      return 'PayPal';
    case 'apple_pay':
      return 'Apple Pay';
    default:
      return 'Not configured';
  }
};

export const PayoutInfoCard: React.FC<PayoutInfoCardProps> = ({ payoutInfo }) => {
  const hasPayoutSetup = payoutInfo && (payoutInfo.stripeAccountId || payoutInfo.method || payoutInfo.paypalEmail);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Information</CardTitle>
        <CardDescription>Payment method and payout status</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasPayoutSetup ? (
          <div className="text-center py-8 text-gray-500">
            <p>No payout method has been set up yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Payout Method</label>
              <div className="text-sm">{getMethodLabel(payoutInfo.method)}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Connect Status</label>
              <div className="text-sm mt-0.5">
                {getConnectStatusBadge(payoutInfo.connectStatus)}
              </div>
            </div>
            {payoutInfo.stripeAccountId && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Stripe Account ID</label>
                <div className="text-sm font-mono">{payoutInfo.stripeAccountId}</div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Payouts Enabled</label>
              <div className="text-sm mt-0.5">
                <Badge variant={payoutInfo.payoutsEnabled ? 'default' : 'destructive'}>
                  {payoutInfo.payoutsEnabled ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Charges Enabled</label>
              <div className="text-sm mt-0.5">
                <Badge variant={payoutInfo.chargesEnabled ? 'default' : 'destructive'}>
                  {payoutInfo.chargesEnabled ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
            {payoutInfo.paypalEmail && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">PayPal Email</label>
                <div className="text-sm">{payoutInfo.paypalEmail}</div>
              </div>
            )}
            {payoutInfo.cardLast4 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Card</label>
                <div className="text-sm">**** {payoutInfo.cardLast4}</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
