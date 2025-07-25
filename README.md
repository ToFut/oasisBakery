# Bakery OS - The Oasis Cafe System

A comprehensive React-based management system for bakery operations, featuring role-based dashboards, real-time data integration, and mobile-first design.

## Features

### Role-Based Access
- **Chain Owner**: Multi-store overview, analytics, and chain-wide management
- **Store Manager**: Store-specific operations, inventory, staff management
- **Driver**: Route management, delivery tracking, barcode scanning
- **Store Staff**: Task management, order processing, time clock

### Key Functionalities
- 📊 Real-time dashboards with data source indicators
- 🛒 Order management with status tracking
- 📦 Inventory management with PAR levels
- 👥 Staff management with 7shifts integration
- 🚚 Delivery routes and barcode scanning
- ⏰ Time clock functionality
- 📋 Task management and completion tracking
- 🔔 Alert system with resolution workflows
- 📈 Analytics and reporting
- 🏪 Multi-store location management

### Data Sources
The app integrates with multiple APIs and services:
- **Square API**: Order processing and sales data
- **Uber Eats**: Delivery order management
- **7shifts API**: Staff scheduling and time tracking
- **Shopify**: Inventory management and multi-location support
- **Bakery OS Rules Engine**: Automated task generation and alerts

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## Usage

### Switching User Roles
Click on the user avatar in the top-right corner to switch between different user roles:
- Chain Owner (Michael Rodriguez)
- Store Manager (Sarah Chen)
- Driver (James Wilson)
- Store Staff (Emma Davis)

### Navigation
Each role has a customized bottom navigation with relevant tabs and notification badges.

### Interactive Features
- **Orders**: Mark orders as ready or complete
- **Inventory**: Adjust stock levels with +/- buttons
- **Tasks**: Check off completed tasks
- **Alerts**: Resolve or escalate alerts
- **Clock**: Clock in/out functionality
- **Scanner**: Barcode scanning interface for deliveries

## Technology Stack

- **React 18**: Modern React with hooks
- **Lucide React**: Beautiful, customizable icons
- **Tailwind CSS**: Utility-first CSS framework
- **Mobile-First Design**: Optimized for mobile devices

## Data Flow

The app demonstrates a comprehensive data integration architecture:
1. **External APIs** → **Data Normalization** → **Bakery OS Database**
2. **Real-time Updates** → **State Management** → **UI Components**
3. **User Actions** → **API Calls** → **Database Updates**

## Development

This is a demonstration app showing the complete implementation of a bakery management system. All data is mock data for demonstration purposes.

## License

MIT License 