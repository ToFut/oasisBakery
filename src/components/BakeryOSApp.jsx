import React, { useState, useEffect } from 'react';
import { Clock, Package, Truck, ClipboardList, Bell, BarChart3, ShoppingCart, QrCode, CheckCircle, AlertTriangle, MapPin, DollarSign, Users, TrendingUp, Search, Filter, Plus, Minus, Camera, MessageCircle, Settings, ChevronDown, Building, User, LogOut, Menu, X, Eye, Calendar, FileText, Zap, Route, Scan } from 'lucide-react';

const BakeryOSApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [selectedStore, setSelectedStore] = useState('williamsburg');

  // User types with different permissions
  const [currentUser, setCurrentUser] = useState({
    id: 'user_001',
    name: 'Sarah Chen',
    email: 'sarah.chen@oasiscafe.com',
    role: 'store_manager',
    store: 'Williamsburg',
    storeId: 2,
    permissions: ['orders', 'inventory', 'staff', 'reports'],
    avatar: 'SC',
    shift: '7:00 AM - 3:00 PM',
    clockedIn: true
  });

  const userTypes = {
    chain_owner: {
      name: 'Michael Rodriguez',
      email: 'michael@oasiscafe.com',
      role: 'chain_owner',
      store: 'All Locations',
      storeId: 'all',
      permissions: ['analytics', 'all_stores', 'reports', 'settings', 'staff_management'],
      avatar: 'MR',
      tabs: ['dashboard', 'analytics', 'stores', 'alerts']
    },
    store_manager: {
      name: 'Sarah Chen',
      email: 'sarah.chen@oasiscafe.com',
      role: 'store_manager',
      store: 'Williamsburg',
      storeId: 2,
      permissions: ['orders', 'inventory', 'staff', 'reports', 'deliveries'],
      avatar: 'SC',
      tabs: ['dashboard', 'orders', 'inventory', 'staff', 'alerts']
    },
    driver: {
      name: 'James Wilson',
      email: 'james.wilson@oasiscafe.com',
      role: 'driver',
      store: 'Fleet Operations',
      storeId: 'fleet',
      permissions: ['deliveries', 'routes', 'inventory_receive'],
      avatar: 'JW',
      tabs: ['routes', 'deliveries', 'scanner', 'clock']
    },
    store_staff: {
      name: 'Emma Davis',
      email: 'emma.davis@oasiscafe.com',
      role: 'store_staff',
      store: 'Williamsburg',
      storeId: 2,
      permissions: ['orders', 'tasks', 'basic_inventory'],
      avatar: 'ED',
      tabs: ['tasks', 'orders', 'clock', 'alerts']
    }
  };

  const stores = [
    { id: 'williamsburg', name: 'Williamsburg', status: 'operational', sales: 1247.50, staff: 6, orders: 12 },
    { id: 'brooklyn_heights', name: 'Brooklyn Heights', status: 'operational', sales: 982.25, staff: 5, orders: 8 },
    { id: 'park_slope', name: 'Park Slope', status: 'maintenance', sales: 0, staff: 4, orders: 0 },
    { id: 'lic', name: 'Long Island City', status: 'operational', sales: 1456.75, staff: 7, orders: 15 },
    { id: 'astoria', name: 'Astoria', status: 'operational', sales: 891.30, staff: 5, orders: 9 },
    { id: 'dumbo', name: 'DUMBO', status: 'operational', sales: 1103.80, staff: 6, orders: 11 }
  ];

  // Mock data
  const [orders, setOrders] = useState([
    { id: 'SQ001', time: '9:23 AM', items: ['2x Specialty Latte', '1x Almond Croissant'], total: 12.50, status: 'preparing', channel: 'Square', store: 'Williamsburg' },
    { id: 'UE002', time: '9:25 AM', items: ['1x Cold Brew', '2x Blueberry Muffins'], total: 8.75, status: 'ready', channel: 'Uber Eats', store: 'Williamsburg' },
    { id: 'SQ003', time: '9:27 AM', items: ['3x Double Espresso', '1x Everything Bagel'], total: 15.25, status: 'new', channel: 'Square', store: 'Williamsburg' },
    { id: 'DD004', time: '9:30 AM', items: ['1x Iced Americano', '1x Chocolate Chip Cookie'], total: 6.50, status: 'new', channel: 'DoorDash', store: 'Brooklyn Heights' }
  ]);

  const [routes, setRoutes] = useState([
    { id: 'R001', name: 'Morning Supply Run', stores: ['Williamsburg', 'Brooklyn Heights'], items: 12, status: 'active', eta: '10:30 AM', progress: 60 },
    { id: 'R002', name: 'Afternoon Restock', stores: ['Park Slope', 'LIC', 'Astoria'], items: 8, status: 'pending', eta: '2:15 PM', progress: 0 }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete morning inventory count', type: 'inventory', completed: false, priority: 'high', assignee: 'Sarah Chen', dueTime: '10:00 AM', store: 'Williamsburg' },
    { id: 2, title: 'Process flour delivery (15kg)', type: 'delivery', completed: false, priority: 'high', assignee: 'James Wilson', dueTime: '9:30 AM', store: 'Williamsburg' },
    { id: 3, title: 'Staff meeting preparation', type: 'management', completed: true, priority: 'medium', assignee: 'Sarah Chen', dueTime: '11:00 AM', store: 'Williamsburg' },
    { id: 4, title: 'Clean espresso machine', type: 'maintenance', completed: false, priority: 'medium', assignee: 'Emma Davis', dueTime: '2:00 PM', store: 'Williamsburg' },
    { id: 5, title: 'Update POS system pricing', type: 'system', completed: false, priority: 'low', assignee: 'Emma Davis', dueTime: '3:00 PM', store: 'Williamsburg' }
  ]);

  const [inventory, setInventory] = useState([
    { sku: 'FLR001', name: 'Organic All-Purpose Flour', onHand: 8, parLevel: 15, unit: 'kg', status: 'low', cost: 2.50, location: 'Storage A', lastUpdated: '8:30 AM' },
    { sku: 'SUG001', name: 'Fair Trade Sugar', onHand: 12, parLevel: 10, unit: 'kg', status: 'good', cost: 1.80, location: 'Storage A', lastUpdated: '8:00 AM' },
    { sku: 'COC001', name: 'Premium Cocoa Powder', onHand: 3, parLevel: 8, unit: 'kg', status: 'critical', cost: 8.90, location: 'Storage B', lastUpdated: '7:45 AM' },
    { sku: 'VAN001', name: 'Madagascar Vanilla Extract', onHand: 6, parLevel: 5, unit: 'bottles', status: 'good', cost: 12.50, location: 'Refrigerated', lastUpdated: '8:15 AM' }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'inventory', severity: 'critical', message: 'Premium Cocoa Powder critically low (3kg remaining)', store: 'Williamsburg', time: '8:45 AM', resolved: false },
    { id: 2, type: 'delivery', severity: 'warning', message: 'Flour delivery 30 minutes overdue', store: 'Williamsburg', time: '8:30 AM', resolved: false },
    { id: 3, type: 'staff', severity: 'info', message: 'Emma Davis clocked in late (7:15 AM)', store: 'Williamsburg', time: '7:15 AM', resolved: false },
    { id: 4, type: 'system', severity: 'warning', message: 'POS system running slow at Brooklyn Heights', store: 'Brooklyn Heights', time: '9:00 AM', resolved: false }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: 'Emma Davis', role: 'Barista', status: 'clocked_in', shift: '7:00 AM - 3:00 PM', clockedAt: '7:15 AM' },
    { id: 2, name: 'Mike Johnson', role: 'Baker', status: 'clocked_in', shift: '5:00 AM - 1:00 PM', clockedAt: '5:00 AM' },
    { id: 3, name: 'Lisa Park', role: 'Cashier', status: 'clocked_in', shift: '8:00 AM - 4:00 PM', clockedAt: '8:00 AM' },
    { id: 4, name: 'Tom Wilson', role: 'Supervisor', status: 'break', shift: '6:00 AM - 2:00 PM', clockedAt: '6:00 AM' }
  ]);

  const switchUser = (userType) => {
    setCurrentUser(userTypes[userType]);
    setActiveTab(userTypes[userType].tabs[0]);
    setShowUserMenu(false);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const fulfillOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'fulfilled' } : order
    ));
  };

  const adjustInventory = (sku, adjustment) => {
    setInventory(inventory.map(item =>
      item.sku === sku ? {
        ...item,
        onHand: Math.max(0, item.onHand + adjustment),
        status: item.onHand + adjustment < item.parLevel * 0.3 ? 'critical' :
                item.onHand + adjustment < item.parLevel * 0.6 ? 'low' : 'good',
        lastUpdated: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      } : item
    ));
  };

  const resolveAlert = (alertId) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      chain_owner: 'Chain Owner',
      store_manager: 'Store Manager',
      driver: 'Delivery Driver',
      store_staff: 'Store Staff'
    };
    return roleNames[role] || role;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      critical: 'text-red-600 bg-red-50 border-red-200',
      low: 'text-orange-600 bg-orange-50 border-orange-200',
      good: 'text-green-600 bg-green-50 border-green-200',
      warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      info: 'text-blue-600 bg-blue-50 border-blue-200',
      new: 'text-blue-600 bg-blue-50 border-blue-200',
      preparing: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      ready: 'text-green-600 bg-green-50 border-green-200',
      fulfilled: 'text-gray-600 bg-gray-50 border-gray-200',
      operational: 'text-green-600 bg-green-50 border-green-200',
      maintenance: 'text-red-600 bg-red-50 border-red-200',
      active: 'text-blue-600 bg-blue-50 border-blue-200',
      pending: 'text-orange-600 bg-orange-50 border-orange-200',
      clocked_in: 'text-green-600 bg-green-50 border-green-200',
      break: 'text-orange-600 bg-orange-50 border-orange-200',
      clocked_out: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return statusColors[status] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  // Dashboard for different user types
  const renderDashboard = () => {
    if (currentUser.role === 'chain_owner') {
      return (
        <div className="p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Chain Overview</h2>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          {/* Data Source Indicator */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-xs font-medium text-blue-800 mb-1">📊 DATA SOURCES</div>
            <div className="text-xs text-blue-700">
              Revenue: Square API + Uber Eats API • Staff: 7shifts API • Alerts: Bakery OS Rules Engine • Store Status: Shopify Multi-location API
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <DollarSign size={20} className="text-green-500" />
                <TrendingUp size={14} className="text-green-500" />
              </div>
              <div className="text-xl font-bold text-gray-900">$6,681.10</div>
              <div className="text-xs text-gray-600">Total Revenue</div>
              <div className="text-xs text-green-600 mt-1">+12.5% vs yesterday</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Building size={20} className="text-blue-500" />
                <Eye size={14} className="text-blue-500" />
              </div>
              <div className="text-xl font-bold text-gray-900">5/6</div>
              <div className="text-xs text-gray-600">Stores Operational</div>
              <div className="text-xs text-orange-600 mt-1">Park Slope maintenance</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Users size={20} className="text-purple-500" />
                <Clock size={14} className="text-purple-500" />
              </div>
              <div className="text-xl font-bold text-gray-900">33</div>
              <div className="text-xs text-gray-600">Staff Clocked In</div>
              <div className="text-xs text-purple-600 mt-1">All locations</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle size={20} className="text-red-500" />
                <Bell size={14} className="text-red-500" />
              </div>
              <div className="text-xl font-bold text-gray-900">{alerts.filter(a => !a.resolved).length}</div>
              <div className="text-xs text-gray-600">Active Alerts</div>
              <div className="text-xs text-red-600 mt-1">Needs attention</div>
            </div>
          </div>

          {/* Store Performance */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Store Performance</h3>
            <div className="space-y-3">
              {stores.map(store => (
                <div key={store.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      store.status === 'operational' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-sm">{store.name}</div>
                      <div className="text-xs text-gray-600">{store.staff} staff • {store.orders} orders</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600 text-sm">${store.sales.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">Today</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Store Manager Dashboard
    if (currentUser.role === 'store_manager') {
      return (
        <div className="p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">{currentUser.store} Dashboard</h2>
            <div className="text-sm text-gray-600">{new Date().toLocaleDateString()}</div>
          </div>
          
          {/* Data Source Indicator */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-xs font-medium text-green-800 mb-1">📊 DATA SOURCES</div>
            <div className="text-xs text-green-700">
              Sales: Square API • Orders: Square + Uber Eats Webhooks • Staff: 7shifts API • Inventory: Shopify location_id={currentUser.storeId}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign size={18} className="text-green-500" />
                <span className="font-semibold text-sm">Sales Today</span>
              </div>
              <div className="text-xl font-bold text-green-600">$1,247.50</div>
              <div className="text-xs text-gray-500">Target: $1,200</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingCart size={18} className="text-blue-500" />
                <span className="font-semibold text-sm">Orders</span>
              </div>
              <div className="text-xl font-bold text-blue-600">{orders.filter(o => o.store === currentUser.store && o.status !== 'fulfilled').length}</div>
              <div className="text-xs text-gray-500">Active orders</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Users size={18} className="text-purple-500" />
                <span className="font-semibold text-sm">Staff</span>
              </div>
              <div className="text-xl font-bold text-purple-600">{staff.filter(s => s.status === 'clocked_in').length}/8</div>
              <div className="text-xs text-gray-500">Clocked in</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Package size={18} className="text-orange-500" />
                <span className="font-semibold text-sm">Inventory</span>
              </div>
              <div className="text-xl font-bold text-orange-600">{inventory.filter(i => i.status === 'critical' || i.status === 'low').length}</div>
              <div className="text-xs text-gray-500">Need restock</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Priority Tasks</h3>
            {tasks.filter(t => !t.completed && t.priority === 'high').slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg mb-2">
                <div>
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="text-xs text-gray-600">Due: {task.dueTime} • {task.assignee}</div>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">HIGH</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Driver Dashboard
    if (currentUser.role === 'driver') {
      return (
        <div className="p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Driver Dashboard</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">On Route</span>
            </div>
          </div>
          
          {/* Data Source Indicator */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="text-xs font-medium text-orange-800 mb-1">📊 DATA SOURCES</div>
            <div className="text-xs text-orange-700">
              Routes: Bakery OS Internal • GPS: Device Location API • Deliveries: Shopify inventory adjustments • Scans: QR/Barcode API
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Current Route: Morning Supply Run</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Williamsburg</div>
                  <div className="text-xs text-gray-600">4 items delivered</div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">COMPLETED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Brooklyn Heights</div>
                  <div className="text-xs text-gray-600">8 items to deliver</div>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">IN PROGRESS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Items to Deliver</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600">Completed Stops</div>
            </div>
          </div>
        </div>
      );
    }

    // Store Staff Dashboard
    return (
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">My Tasks</h2>
          <div className="text-sm text-gray-600">Shift: {currentUser.shift}</div>
        </div>
        
        {/* Data Source Indicator */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="text-xs font-medium text-purple-800 mb-1">📊 DATA SOURCES</div>
          <div className="text-xs text-purple-700">
            Tasks: Bakery OS Rules (role + shift + 7shifts) • Clock: 7shifts API • Tasks Auto-generated from deliveries + schedule
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Checklist</h3>
            <span className="text-sm text-gray-600">
              {tasks.filter(t => t.assignee === currentUser.name && t.completed).length} of {tasks.filter(t => t.assignee === currentUser.name).length} complete
            </span>
          </div>
          {tasks.filter(t => t.assignee === currentUser.name).map(task => (
            <div key={task.id} className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
              task.completed ? 'bg-green-50' : 'bg-gray-50'
            }`}>
              <button onClick={() => toggleTask(task.id)}>
                <CheckCircle 
                  size={20} 
                  className={task.completed ? 'text-green-500' : 'text-gray-400'} 
                />
              </button>
              <div className="flex-1">
                <div className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </div>
                <div className="text-xs text-gray-600">Due: {task.dueTime}</div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Orders view
  const renderOrders = () => (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Order Management</h2>
        <div className="flex space-x-2">
          <button className="p-2 border border-gray-300 rounded-lg">
            <Filter size={16} />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="text-xs font-medium text-blue-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-blue-700">
          GET: Square Orders API + Uber Eats Webhooks → SNS → Normalized orders table • POST: Order status updates (preparing→ready→fulfilled)
        </div>
      </div>

      <div className="space-y-3">
        {orders.filter(order => 
          currentUser.role === 'chain_owner' || order.store === currentUser.store
        ).map(order => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold">#{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{order.time} • {order.channel} • {order.store}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">${order.total}</div>
              </div>
            </div>

            <div className="space-y-1 mb-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="text-sm text-gray-700">{item}</div>
              ))}
            </div>

            {order.status !== 'fulfilled' && (
              <div className="flex space-x-2">
                <button 
                  onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'ready'} : o))}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg font-medium text-sm"
                >
                  Mark Ready
                </button>
                <button 
                  onClick={() => fulfillOrder(order.id)}
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg font-medium text-sm"
                >
                  Complete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Inventory view
  const renderInventory = () => (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Inventory - {currentUser.store}</h2>
        <Search size={20} className="text-gray-500" />
      </div>

      {/* Data Source Indicator */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="text-xs font-medium text-green-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-green-700">
          GET: Shopify inventoryAdjustQuantity(location_id={currentUser.storeId}) • POST: Manual adjustments + Delivery scans auto-update stock levels
        </div>
      </div>
      
      {inventory.map(item => (
        <div key={item.sku} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">SKU: {item.sku} • {item.location}</div>
              <div className="text-xs text-gray-500">Updated: {item.lastUpdated}</div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
              {item.status.toUpperCase()}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm">
              <span className="font-medium">{item.onHand} {item.unit}</span>
              <span className="text-gray-500"> / {item.parLevel} par</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => adjustInventory(item.sku, -1)}
                className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center"
              >
                <Minus size={16} />
              </button>
              <button 
                onClick={() => adjustInventory(item.sku, 1)}
                className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                item.status === 'critical' ? 'bg-red-500' : 
                item.status === 'low' ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(100, (item.onHand / item.parLevel) * 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Staff view
  const renderStaff = () => (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Staff Management</h2>
        <div className="text-sm text-gray-600">{staff.filter(s => s.status === 'clocked_in').length} active</div>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <div className="text-xs font-medium text-purple-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-purple-700">
          GET: 7shifts API (schedules, roles, punch data) • POST: Clock in/out events synced to 7shifts • Real-time status updates
        </div>
      </div>

      {staff.map(member => (
        <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{member.name}</div>
              <div className="text-sm text-gray-600">{member.role} • {member.shift}</div>
              <div className="text-xs text-gray-500">Clocked in: {member.clockedAt}</div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
              {member.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // Routes view for drivers
  const renderRoutes = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Delivery Routes</h2>

      {/* Data Source Indicator */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <div className="text-xs font-medium text-orange-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-orange-700">
          GET: Bakery OS routes table + delivery_events • POST: Route progress updates, GPS coordinates • Auto-generated from inventory needs
        </div>
      </div>
      
      {routes.map(route => (
        <div key={route.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-semibold">{route.name}</div>
              <div className="text-sm text-gray-600">{route.items} items • ETA: {route.eta}</div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
              {route.status.toUpperCase()}
            </span>
          </div>
          
          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Stops:</div>
            <div className="text-sm text-gray-600">{route.stores.join(' → ')}</div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${route.progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{route.progress}% complete</div>
        </div>
      ))}
    </div>
  );

  // Deliveries view
  const renderDeliveries = () => (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Deliveries</h2>
        <button
          onClick={() => setScanMode(!scanMode)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${ scanMode ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700' }`}
        >
          <QrCode size={16} />
          <span>{scanMode ? 'Exit Scan' : 'Scan Mode'}</span>
        </button>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="text-xs font-medium text-yellow-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-yellow-700">
          GET: delivery_events table • POST: Barcode scan → inventoryAdjustQuantity → Shopify stock update • Auto-logs delivery completion
        </div>
      </div>

      {scanMode && (
        <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
          <Camera size={48} className="mx-auto text-blue-500 mb-4" />
          <p className="text-blue-700 font-medium">Scan delivery barcode</p>
          <p className="text-sm text-blue-600 mt-2">Auto-updates inventory levels</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Flour Delivery #DEL001</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">PENDING</span>
          </div>
          <div className="text-sm text-gray-600 mb-3">
            <div>Items: 15kg All-Purpose Flour</div>
            <div>Expected: 9:00 AM</div>
            <div>From: Central Kitchen</div>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2">
            <QrCode size={16} />
            <span>Scan to Receive</span>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Cocoa Delivery #DEL002</span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">COMPLETED</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <div>Items: 4kg Cocoa Powder</div>
            <div>Received: 8:15 AM by James Wilson</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Scanner view
  const renderScanner = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Barcode Scanner</h2>

      {/* Data Source Indicator */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
        <div className="text-xs font-medium text-indigo-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-indigo-700">
          POST: Camera API → Barcode detection → delivery_events table → Shopify inventoryAdjustQuantity mutation → Real-time inventory sync
        </div>
      </div>
      
      <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-12 text-center">
        <Camera size={64} className="mx-auto text-blue-500 mb-4" />
        <p className="text-blue-700 font-medium text-lg mb-2">Position barcode in frame</p>
        <p className="text-sm text-blue-600">Auto-scans when detected</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Recent Scans</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
            <span className="text-sm">DEL002 - Cocoa Powder</span>
            <span className="text-xs text-green-600">8:15 AM</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm">DEL001 - Sugar Delivery</span>
            <span className="text-xs text-gray-600">7:45 AM</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Clock view
  const renderClock = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Time Clock</h2>

      {/* Data Source Indicator */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
        <div className="text-xs font-medium text-teal-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-teal-700">
          GET: 7shifts API (shifts, schedules) • POST: time_punches table → 7shifts sync • Real-time clock in/out events trigger task generation
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
        <div className="mb-4">
          <div className="text-3xl font-bold">{new Date().toLocaleTimeString()}</div>
          <div className="text-gray-500">{new Date().toLocaleDateString()}</div>
        </div>
        
        <div className="mb-6">
          <div className="text-lg font-semibold">{currentUser.name}</div>
          <div className="text-gray-600">{getRoleDisplayName(currentUser.role)} - {currentUser.store}</div>
          <div className="text-sm text-gray-500">Shift: {currentUser.shift}</div>
        </div>
        
        <div className={`mb-4 p-4 rounded-lg ${
          currentUser.clockedIn ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <Clock size={32} className="mx-auto mb-2" />
          <div className="font-medium text-lg">
            {currentUser.clockedIn ? 'Clocked In' : 'Clocked Out'}
          </div>
          {currentUser.clockedIn && <div className="text-sm">Since 7:00 AM</div>}
        </div>
        
        <button 
          onClick={() => setCurrentUser({...currentUser, clockedIn: !currentUser.clockedIn})}
          className={`w-full py-3 rounded-lg font-semibold ${
            currentUser.clockedIn 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}
        >
          {currentUser.clockedIn ? 'Clock Out' : 'Clock In'}
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Today's Punches</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Clock In</span>
            <span className="text-green-600">7:00 AM</span>
          </div>
          <div className="flex justify-between">
            <span>Break Start</span>
            <span className="text-orange-600">10:30 AM</span>
          </div>
          <div className="flex justify-between">
            <span>Break End</span>
            <span className="text-green-600">10:45 AM</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Tasks view
  const renderTasks = () => (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Task Management</h2>
        <span className="text-sm text-gray-500">
          {tasks.filter(t => t.completed).length} of {tasks.length} complete
        </span>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
        <div className="text-xs font-medium text-pink-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-pink-700">
          GET: tasks table (auto-generated from 7shifts role + delivery_events + store_id) • POST: Task completion updates → workflow triggers
        </div>
      </div>
      
      {tasks.map(task => (
        <div key={task.id} className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${
          task.completed ? 'opacity-60' : ''
        }`}>
          <div className="flex items-start space-x-3">
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                task.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && <CheckCircle size={16} />}
            </button>
            
            <div className="flex-1">
              <div className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500 capitalize">{task.type}</span>
                <span className="text-xs text-gray-500">Due: {task.dueTime}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Assigned to: {task.assignee}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Alerts view
  const renderAlerts = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Alerts & Notifications</h2>

      {/* Data Source Indicator */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <div className="text-xs font-medium text-red-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-red-700">
          GET: alerts table (Bakery OS Rules Engine) • Triggers: PAR breaches, missed punches, delivery delays • POST: Alert resolution, escalation
        </div>
      </div>
      
      {alerts.map(alert => (
        <div key={alert.id} className={`bg-white border-l-4 rounded-lg p-4 shadow-sm ${
          alert.severity === 'critical' ? 'border-red-500' :
          alert.severity === 'warning' ? 'border-yellow-500' : 'border-blue-500'
        }`}>
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className={`mt-0.5 ${
              alert.severity === 'critical' ? 'text-red-500' :
              alert.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'
            }`} />
            <div className="flex-1">
              <div className="font-medium">{alert.message}</div>
              <div className="text-sm text-gray-500 mt-1">{alert.time} • {alert.store}</div>
            </div>
            <button className="text-blue-500 hover:text-blue-600">
              <MessageCircle size={20} />
            </button>
          </div>
          
          {!alert.resolved && (
            <div className="mt-3 flex space-x-2">
              <button 
                onClick={() => resolveAlert(alert.id)}
                className="px-3 py-1 bg-green-100 text-green-600 rounded text-sm font-medium"
              >
                Resolve
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium">
                Escalate
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Analytics view for chain owner
  const renderAnalytics = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Analytics & Reports</h2>

      {/* Data Source Indicator */}
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
        <div className="text-xs font-medium text-violet-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-violet-700">
          GET: Aggregated data from orders + time_punches + inventory tables • Daily CSV reports • Labor % calculations (7shifts hours vs sales)
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">Revenue Trends</h3>
        <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
          <TrendingUp size={48} className="text-gray-400" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">Labor Efficiency</h3>
        <div className="space-y-3">
          {stores.map(store => (
            <div key={store.id} className="flex items-center justify-between">
              <span className="text-sm">{store.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Stores view for chain owner
  const renderStores = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Store Locations</h2>

      {/* Data Source Indicator */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
        <div className="text-xs font-medium text-cyan-800 mb-1">📊 DATA SOURCES</div>
        <div className="text-xs text-cyan-700">
          GET: Shopify locations API + aggregated orders/staff data per location_id • Real-time operational status • Multi-store analytics
        </div>
      </div>
      
      {stores.map(store => (
        <div key={store.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-semibold text-lg">{store.name}</div>
              <div className="text-sm text-gray-600">{store.staff} staff members</div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(store.status)}`}>
              {store.status.toUpperCase()}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">${store.sales.toFixed(2)}</div>
              <div className="text-xs text-gray-600">Sales Today</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{store.orders}</div>
              <div className="text-xs text-gray-600">Orders</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{store.staff}</div>
              <div className="text-xs text-gray-600">Staff</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'orders': return renderOrders();
      case 'inventory': return renderInventory();
      case 'staff': return renderStaff();
      case 'routes': return renderRoutes();
      case 'deliveries': return renderDeliveries();
      case 'scanner': return renderScanner();
      case 'clock': return renderClock();
      case 'tasks': return renderTasks();
      case 'alerts': return renderAlerts();
      case 'analytics': return renderAnalytics();
      case 'stores': return renderStores();
      default: return renderDashboard();
    }
  };

  // Navigation tabs based on user role
  const renderTabs = () => {
    const tabsConfig = {
      chain_owner: [
        { id: 'dashboard', icon: BarChart3, label: 'Overview' },
        { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
        { id: 'stores', icon: Building, label: 'Stores' },
        { id: 'alerts', icon: Bell, label: 'Alerts', count: alerts.filter(a => !a.resolved).length }
      ],
      store_manager: [
        { id: 'dashboard', icon: BarChart3, label: 'Home' },
        { id: 'orders', icon: ShoppingCart, label: 'Orders', count: orders.filter(o => o.status !== 'fulfilled' && o.store === currentUser.store).length },
        { id: 'inventory', icon: Package, label: 'Stock' },
        { id: 'staff', icon: Users, label: 'Staff' },
        { id: 'alerts', icon: Bell, label: 'Alerts', count: alerts.filter(a => !a.resolved).length }
      ],
      driver: [
        { id: 'routes', icon: Route, label: 'Routes' },
        { id: 'deliveries', icon: Truck, label: 'Deliveries' },
        { id: 'scanner', icon: Scan, label: 'Scanner' },
        { id: 'clock', icon: Clock, label: 'Clock' }
      ],
      store_staff: [
        { id: 'tasks', icon: ClipboardList, label: 'Tasks', count: tasks.filter(t => !t.completed && t.assignee === currentUser.name).length },
        { id: 'orders', icon: ShoppingCart, label: 'Orders' },
        { id: 'clock', icon: Clock, label: 'Clock' },
        { id: 'alerts', icon: Bell, label: 'Alerts' }
      ]
    };

    const userTabs = tabsConfig[currentUser.role] || [];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto">
          <div className={`grid gap-1 p-2 ${
            userTabs.length === 4 ? 'grid-cols-4' : 'grid-cols-5'
          }`}>
            {userTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <tab.icon size={18} />
                  {tab.count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {tab.count > 9 ? '9+' : tab.count}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium leading-tight text-center">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Professional Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Bakery OS</h1>
              <p className="text-xs text-gray-600">The Oasis Cafe System</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {currentUser.avatar}
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="font-medium text-gray-900">{currentUser.name}</div>
                    <div className="text-sm text-gray-600">{getRoleDisplayName(currentUser.role)}</div>
                    <div className="text-xs text-gray-500">{currentUser.store}</div>
                  </div>
                  
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 px-3 py-2">Switch Role</div>
                    {Object.entries(userTypes).map(([key, user]) => (
                      <button
                        key={key}
                        onClick={() => switchUser(key)}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 ${
                          currentUser.role === key ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{user.name}</div>
                            <div className="text-xs text-gray-600">{getRoleDisplayName(user.role)}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 p-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center space-x-2">
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600 flex items-center space-x-2">
                      <LogOut size={16} />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-24">
        {/* Dashboard content will be rendered here */}
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      {/* Navigation tabs will be rendered here */}
      {renderTabs()}
    </div>
  );
};

export default BakeryOSApp; 