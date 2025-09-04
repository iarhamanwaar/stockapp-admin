import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { GenericEdit } from "../../components/GenericEdit";

export const ProductReviewEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <GenericEdit 
      resource="productreviews"
      title="Product Review"
      listPath="/product-reviews"
      fields={[
        { key: 'rating', label: 'Rating', type: 'number' },
        { key: 'comment', label: 'Comment', type: 'textarea' },
        { key: 'moderatorNotes', label: 'Moderator Notes', type: 'textarea' },
      ]}
    />
  );
};
