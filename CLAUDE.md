# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
- `npm run dev` - Start development server on http://localhost:3001
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run serve` - Preview production build

### Prerequisites
- Backend API must be running on http://localhost:5500
- CORS enabled for http://localhost:3001 on the backend

## Architecture Overview

This is a React-based admin panel built with Refine framework for managing a StockApp e-commerce platform.

### Tech Stack
- **Framework**: Refine (admin framework) + React 18 + TypeScript
- **UI Library**: Ant Design
- **Build Tool**: Vite
- **Routing**: React Router v6

### Core Architecture

#### Data Provider (`src/dataProvider.ts`)
Custom data provider that maps Refine operations to NestJS API endpoints:
- Uses admin-specific endpoints prefixed with `/admin-api/`
- Handles CRUD operations for all entities
- Supports pagination, search, and filtering
- Includes custom endpoint for dashboard statistics
- Base API URL: http://localhost:5500

#### Resource Configuration (`src/App.tsx`)
All resources configured in Refine with full CRUD support:

**Core Entities:**
- **user** → `/admin-api/users` (User management)
- **products** → `/admin-api/products` (Product catalog)
- **order** → `/admin-api/orders` (Order management)  
- **productimage** → `/admin-api/product-images` (Product image management)

**Business Entities:**
- **categories** → `/admin-api/categories` (Product categories)
- **businesstypes** → `/admin-api/business-types` (Business type management)
- **materials** → `/admin-api/materials` (Product materials)

**User Role Entities:**
- **sellers** → `/admin-api/sellers` (Seller management)
- **buyers** → `/admin-api/buyers` (Buyer management)
- **riders** → `/admin-api/riders` (Delivery rider management)

**Review & Transaction Entities:**
- **productreviews** → `/admin-api/product-reviews` (Product review moderation)
- **sellerreviews** → `/admin-api/seller-reviews` (Seller review moderation)
- **transactions** → `/admin-api/transactions` (Transaction management)

**Communication & System:**
- **notifications** → `/admin-api/notifications` (System notifications)
- **chats** → `/admin-api/chats` (Chat monitoring - read-only)
- **messages** → `/admin-api/messages` (Message monitoring - read-only)
- **banks** → `/admin-api/banks` (Banking institutions)

#### Page Structure (`src/pages/`)
Each resource follows consistent CRUD pattern:
- `list.tsx` - Table view with search/filter
- `show.tsx` - Detail view
- `edit.tsx` - Edit form
- Exports consolidated through `index.ts`

### Key Features
- **Dashboard with Statistics** - Comprehensive overview of all system metrics
- **Full CRUD Operations** - Create, read, update, delete for all entities
- **Advanced Search & Filtering** - Search and status filtering across all resources
- **Review Moderation** - Tools for managing product and seller reviews
- **User Role Management** - Separate interfaces for sellers, buyers, and riders
- **Transaction Monitoring** - Financial transaction oversight and management
- **Communication Oversight** - Chat and message monitoring capabilities
- **Business Management** - Categories, materials, and business type administration
- **Responsive UI** - Ant Design components with sidebar navigation
- **Type Safety** - Full TypeScript implementation throughout

### API Integration Notes
- All API calls go through custom data provider
- Resource names in Refine map to specific backend endpoints
- Pagination uses `page` and `limit` query parameters
- Search filtering uses `search` query parameter
- Status filtering uses `status` query parameter