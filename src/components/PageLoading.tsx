import React from 'react';
import { Spin } from 'antd';

interface PageLoadingProps {
  tip?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ tip }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        gap: '16px',
      }}
    >
      <Spin size="large" />
      {tip && (
        <div
          style={{
            color: 'var(--text-medium)',
            fontFamily: 'var(--font-family-text)',
            fontSize: 'var(--font-size-p1)',
          }}
        >
          {tip}
        </div>
      )}
    </div>
  );
};