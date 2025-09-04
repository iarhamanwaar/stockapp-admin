import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading';

interface PageLoadingProps {
  tip?: string;
  fullPage?: boolean;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ 
  tip = "Loading...", 
  fullPage = false 
}) => {
  const containerClasses = fullPage 
    ? "min-h-screen flex items-center justify-center"
    : "flex flex-col items-center justify-center min-h-[50vh]";

  return (
    <div 
      className={containerClasses}
      style={fullPage ? { backgroundColor: "var(--bg-light-gray)" } : {}}
    >
      <div className="flex flex-col items-center space-y-4">
        {fullPage && (
          <div className="flex items-center space-x-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--brand-primary)" }}
            >
              <span className="text-white text-lg">📦</span>
            </div>
            <span
              className="text-xl font-semibold"
              style={{ color: "var(--text-dark)" }}
            >
              StockApp Admin
            </span>
          </div>
        )}
        <LoadingSpinner size="lg" />
        <p
          className="text-base font-medium"
          style={{ color: "var(--text-medium)" }}
        >
          {tip}
        </p>
      </div>
    </div>
  );
};