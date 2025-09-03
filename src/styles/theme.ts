import { ThemeConfig } from 'antd';

export const stockAppTheme: ThemeConfig = {
  token: {
    // Brand Colors
    colorPrimary: '#3B1040',
    colorPrimaryHover: '#50287D',
    colorPrimaryActive: '#2A0B30',
    colorPrimaryBg: '#EDE9EE',
    colorPrimaryBgHover: '#E0D8E4',
    colorPrimaryBorder: '#50287D',
    colorPrimaryBorderHover: '#6D3999',
    
    // Background Colors
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F3F3F3',
    colorBgSpotlight: '#F5F5F5',
    colorBgMask: 'rgba(59, 16, 64, 0.45)',
    
    // Text Colors
    colorText: '#1A1A1A',
    colorTextSecondary: '#424448',
    colorTextTertiary: '#555555',
    colorTextQuaternary: '#999999',
    colorTextDescription: '#555555',
    colorTextDisabled: '#999999',
    colorTextHeading: '#1A1A1A',
    colorTextLabel: '#1A1A1A',
    colorTextPlaceholder: '#9F9D9F',
    
    // Border Colors
    colorBorder: '#ddd',
    colorBorderSecondary: '#EFEFEF',
    
    // Status Colors
    colorError: '#FF6060',
    colorErrorBg: '#FFF2F2',
    colorErrorBorder: '#FFB3B3',
    colorSuccess: '#60ff70',
    colorSuccessBg: '#F2FFF2',
    colorSuccessBorder: '#B3FFB3',
    colorWarning: '#6A0DAD',
    colorWarningBg: '#F9F0FF',
    colorWarningBorder: '#D9B3FF',
    
    // Typography
    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontFamilyCode: "'SF Pro Text', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    
    // Font Sizes
    fontSize: 16,
    fontSizeSM: 14,
    fontSizeLG: 18,
    fontSizeXL: 20,
    fontSizeHeading1: 36,
    fontSizeHeading2: 28,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 18,
    
    // Font Weights
    fontWeightStrong: 600,
    
    // Line Heights
    lineHeight: 1.5,
    lineHeightLG: 1.5,
    lineHeightSM: 1.5,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.2,
    lineHeightHeading3: 1.2,
    lineHeightHeading4: 1.2,
    lineHeightHeading5: 1.2,
    
    // Spacing
    paddingSM: 12,
    padding: 16,
    paddingLG: 24,
    paddingXL: 32,
    
    marginSM: 12,
    margin: 16,
    marginLG: 24,
    marginXL: 32,
    
    // Border Radius
    borderRadius: 10,
    borderRadiusLG: 16,
    borderRadiusSM: 6,
    borderRadiusXS: 4,
    borderRadiusOuter: 10,
    
    // Control Heights
    controlHeight: 56,
    controlHeightLG: 64,
    controlHeightSM: 48,
    controlHeightXS: 40,
    
    // Shadows
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    boxShadowSecondary: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    boxShadowTertiary: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    
    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    // Button Component
    Button: {
      controlHeight: 56,
      borderRadius: 10,
      primaryShadow: 'none',
      fontWeight: 600,
      paddingContentHorizontal: 24,
    },
    
    // Input Component
    Input: {
      controlHeight: 56,
      borderRadius: 10,
      paddingInline: 16,
      colorBgContainer: '#F3F3F3',
      colorBorder: 'transparent',
      activeBorderColor: '#3B1040',
      hoverBorderColor: '#50287D',
      activeShadow: '0 0 0 2px rgba(59, 16, 64, 0.1)',
    },
    
    // Card Component
    Card: {
      borderRadius: 10,
      paddingLG: 24,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      headerBg: '#FFFFFF',
      colorBorderSecondary: '#EFEFEF',
    },
    
    // Table Component
    Table: {
      borderRadius: 10,
      colorBorderSecondary: '#EFEFEF',
      headerBg: '#F5F5F5',
      headerColor: '#1A1A1A',
      headerSortActiveBg: '#EDE9EE',
      headerSortHoverBg: '#F0F0F0',
      rowHoverBg: '#FAFAFA',
    },
    
    // Layout Component
    Layout: {
      siderBg: '#FFFFFF',
      headerBg: '#FFFFFF',
      headerHeight: 56,
      headerPadding: '0 24px',
      bodyBg: '#F3F3F3',
      footerBg: '#FFFFFF',
      footerPadding: '24px',
      triggerBg: '#3B1040',
      triggerColor: '#FFFFFF',
    },
    
    // Menu Component
    Menu: {
      itemBg: 'transparent',
      itemColor: '#424448',
      itemHoverColor: '#3B1040',
      itemHoverBg: '#EDE9EE',
      itemSelectedColor: '#3B1040',
      itemSelectedBg: '#EDE9EE',
      itemActiveBg: '#EDE9EE',
      itemBorderRadius: 10,
      itemMarginInline: 8,
      iconSize: 18,
      fontSize: 16,
      itemHeight: 48,
    },
    
    // Form Component
    Form: {
      itemMarginBottom: 24,
      verticalLabelPadding: '0 0 8px',
      labelColor: '#1A1A1A',
      labelFontSize: 16,
      labelRequiredMarkColor: '#FF6060',
    },
    
    // Select Component
    Select: {
      controlHeight: 56,
      borderRadius: 10,
      colorBgContainer: '#F3F3F3',
      colorBorder: 'transparent',
      optionSelectedBg: '#EDE9EE',
      optionActiveBg: '#F5F5F5',
    },
    
    // Typography Component
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 16,
      fontFamilyCode: "'SF Pro Text', Consolas, Monaco, monospace",
    },
    
    // Pagination Component
    Pagination: {
      itemBg: '#FFFFFF',
      itemActiveBg: '#3B1040',
      itemSize: 40,
      borderRadius: 8,
    },
    
    // Modal Component
    Modal: {
      borderRadius: 16,
      paddingLG: 32,
      headerBg: '#FFFFFF',
      footerBg: '#FFFFFF',
    },
    
    // Badge Component
    Badge: {
      borderRadius: 20,
    },
    
    // Tag Component
    Tag: {
      borderRadius: 20,
    },
    
    // Statistic Component
    Statistic: {
      titleFontSize: 16,
      contentFontSize: 28,
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    },
    
    // Avatar Component
    Avatar: {
      borderRadius: 50,
      containerSize: 40,
      containerSizeLG: 48,
      containerSizeSM: 32,
    },
    
    // Switch Component
    Switch: {
      handleSize: 22,
      trackHeight: 28,
      trackMinWidth: 52,
      trackPadding: 3,
      borderRadius: 20,
    },
  },
  algorithm: [], // Using default algorithm, can be switched to dark theme later
};