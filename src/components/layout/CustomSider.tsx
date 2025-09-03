import React from "react";
import { ThemedSiderV2 } from "@refinedev/antd";
import type { RefineThemedLayoutV2SiderProps } from "@refinedev/antd";

const CustomSider: React.FC<RefineThemedLayoutV2SiderProps> = (props) => {
  return (
    <ThemedSiderV2
      {...props}
      width={240}
      collapsedWidth={80}
      Title={({ collapsed }) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '8px' : '0 16px',
            fontSize: collapsed ? '14px' : '18px',
            fontWeight: '600',
            color: 'var(--brand-primary)',
            fontFamily: 'var(--font-family-primary)',
            textAlign: collapsed ? 'center' : 'left',
            lineHeight: collapsed ? '1.2' : '1.4',
            minHeight: '48px',
            backgroundColor: 'transparent',
            borderRadius: 'var(--border-radius-md)',
            margin: collapsed ? '0 var(--spacing-xs)' : '0 var(--spacing-xs)',
            transition: 'all 0.3s ease',
          }}
        >
          {collapsed ? "SA" : "Stock App Admin"}
        </div>
      )}
      render={({ items, logout, collapsed }) => {
        return (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%',
              padding: 'var(--spacing-sm) 0'
            }}
          >
            <div 
              style={{ 
                flex: 1, 
                padding: '0 var(--spacing-xs)',
                overflowX: 'hidden',
                overflowY: 'auto'
              }}
              className="custom-sider-menu"
            >
              {items}
            </div>
            <div style={{ marginTop: 'auto' }}>
              {logout}
            </div>
          </div>
        );
      }}
    />
  );
};

export default CustomSider;