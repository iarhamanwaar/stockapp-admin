# StockApp Admin Panel

A modern admin panel built with [Refine](https://refine.dev/) for managing the StockApp e-commerce platform.

## Features

- **User Management**: View and manage users, buyers, suppliers, and riders
- **Product Management**: Full CRUD operations for products with image support
- **Order Management**: Track and update order statuses
- **Image Display**: Beautiful thumbnails and image previews
- **Modern UI**: Built with Ant Design components
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Library**: Ant Design
- **Admin Framework**: Refine
- **Build Tool**: Vite
- **Routing**: React Router v6

## Development

### Prerequisites

- Node.js 20.11+ 
- npm or yarn
- StockApp backend running on `http://localhost:5500`

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The admin panel will be available at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

## Configuration

The admin panel connects to the StockApp NestJS API running on `http://localhost:5500`. Make sure:

1. The backend server is running
2. CORS is enabled for `http://localhost:3001`
3. Required API endpoints are available

## API Integration

The admin panel uses a custom data provider that maps to your NestJS API endpoints:

- `/user` - User management
- `/products` - Product management  
- `/order` - Order management
- `/productimage` - Product image management

## Deployment

Build the app and serve the `dist` folder with any static file server:

```bash
npm run build
npm run serve
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request