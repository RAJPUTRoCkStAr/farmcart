import React, { useState } from 'react';
import { Users, Package, ShoppingBag, TrendingUp, CheckCircle, XCircle, Eye, UserCheck, UserX, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      label: 'Total Users',
      value: '2,847',
      change: '+12% this month',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Active Sellers',
      value: '456',
      change: '+8 this week',
      icon: <UserCheck className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Total Products',
      value: '12,340',
      change: '+156 pending approval',
      icon: <Package className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      label: 'Total Orders',
      value: '8,923',
      change: '+23% this month',
      icon: <ShoppingBag className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const pendingProducts = [
    {
      id: '1',
      name: 'Organic Honey',
      seller: 'Sweet Bee Farm',
      category: 'Dairy',
      price: 450,
      submittedDate: '2025-01-15',
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Handmade Pottery Set',
      seller: 'Clay Works Studio',
      category: 'Handmade',
      price: 800,
      submittedDate: '2025-01-14',
      image: 'https://images.pexels.com/photos/1123767/pexels-photo-1123767.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Fresh Mushrooms',
      seller: 'Forest Farm',
      category: 'Vegetables',
      price: 120,
      submittedDate: '2025-01-13',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const pendingSellers = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      businessName: 'Kumar Organic Farm',
      location: 'Punjab, India',
      businessType: 'Farm',
      submittedDate: '2025-01-15',
      documents: 3,
      canSell: false
    },
    {
      id: '2',
      name: 'Priya Sharma',
      businessName: 'Artisan Crafts',
      location: 'Rajasthan, India',
      businessType: 'Handicrafts',
      submittedDate: '2025-01-14',
      documents: 4,
      canSell: false
    }
  ];

  const allUsers = [
    {
      id: '1',
      name: 'Anita Patel',
      email: 'anita@example.com',
      role: 'buyer',
      joinDate: '2025-01-10',
      status: 'active',
      canSell: false,
      totalOrders: 12
    },
    {
      id: '2',
      name: 'Rajesh Singh',
      email: 'rajesh@example.com',
      role: 'seller',
      joinDate: '2025-01-08',
      status: 'active',
      canSell: true,
      totalProducts: 25
    },
    {
      id: '3',
      name: 'Meera Gupta',
      email: 'meera@example.com',
      role: 'buyer',
      joinDate: '2025-01-05',
      status: 'active',
      canSell: false,
      totalOrders: 8
    },
    {
      id: '4',
      name: 'Suresh Patel',
      email: 'suresh@example.com',
      role: 'buyer',
      joinDate: '2025-01-03',
      status: 'active',
      canSell: false,
      totalOrders: 3
    }
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'Anita Patel',
      seller: 'Green Valley Farm',
      amount: 450,
      status: 'completed',
      date: '2025-01-15'
    },
    {
      id: 'ORD002',
      customer: 'Rajesh Singh',
      seller: 'Sunshine Orchards',
      amount: 280,
      status: 'in-transit',
      date: '2025-01-15'
    },
    {
      id: 'ORD003',
      customer: 'Meera Gupta',
      seller: 'Happy Cow Dairy',
      amount: 120,
      status: 'processing',
      date: '2025-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleSellerPermission = (userId: string, currentCanSell: boolean) => {
    // In a real app, this would make an API call
    console.log(`Toggling seller permission for user ${userId} from ${currentCanSell} to ${!currentCanSell}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'User Management' },
    { id: 'products', label: 'Product Approvals' },
    { id: 'sellers', label: 'Seller Verification' },
    { id: 'orders', label: 'Order Management' },
    { id: 'analytics', label: 'Platform Analytics' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user?.name} - Manage the FarmCart platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Product Approvals</h4>
                    <p className="text-2xl font-bold text-yellow-900">156</p>
                    <p className="text-sm text-yellow-700">Products awaiting review</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Seller Verification</h4>
                    <p className="text-2xl font-bold text-blue-900">23</p>
                    <p className="text-sm text-blue-700">New seller applications</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Reported Issues</h4>
                    <p className="text-2xl font-bold text-red-900">8</p>
                    <p className="text-sm text-red-700">Customer complaints</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Seller
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.seller}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <div className="text-sm text-gray-600">
                  {allUsers.length} total users
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seller Permission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'seller' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.totalOrders ? `${user.totalOrders} orders` : user.totalProducts ? `${user.totalProducts} products` : 'No activity'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleSellerPermission(user.id, user.canSell)}
                            className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              user.canSell
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {user.canSell ? (
                              <>
                                <UserCheck className="h-3 w-3" />
                                <span>Can Sell</span>
                              </>
                            ) : (
                              <>
                                <UserX className="h-3 w-3" />
                                <span>Cannot Sell</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            View Profile
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Suspend
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Approvals Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Product Approvals</h3>
                <div className="text-sm text-gray-600">
                  {pendingProducts.length} products awaiting review
                </div>
              </div>

              <div className="space-y-4">
                {pendingProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">by {product.seller}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">Category: {product.category}</span>
                          <span className="text-sm text-gray-500">Price: ₹{product.price}</span>
                          <span className="text-sm text-gray-500">Submitted: {product.submittedDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>Review</span>
                        </button>
                        <button className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm font-medium hover:bg-red-200 transition-colors flex items-center space-x-1">
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seller Verification Tab */}
          {activeTab === 'sellers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Seller Verification</h3>
                <div className="text-sm text-gray-600">
                  {pendingSellers.length} applications awaiting review
                </div>
              </div>

              <div className="space-y-4">
                {pendingSellers.map((seller) => (
                  <div key={seller.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{seller.name}</h4>
                        <p className="text-sm text-gray-600">{seller.businessName}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">Location: {seller.location}</span>
                          <span className="text-sm text-gray-500">Type: {seller.businessType}</span>
                          <span className="text-sm text-gray-500">Documents: {seller.documents}</span>
                          <span className="text-sm text-gray-500">Applied: {seller.submittedDate}</span>
                        </div>
                        <div className="mt-2">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                            seller.canSell ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {seller.canSell ? (
                              <>
                                <UserCheck className="h-3 w-3" />
                                <span>Can Sell</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-3 w-3" />
                                <span>Pending Verification</span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>Review</span>
                        </button>
                        <button className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm font-medium hover:bg-red-200 transition-colors flex items-center space-x-1">
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">All Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seller
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.seller}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            View Details
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Revenue Trend</h4>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - Revenue analytics would go here
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">User Growth</h4>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - User growth analytics would go here
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Top Categories</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Vegetables</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fruits</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dairy</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Handmade</span>
                      <span className="font-medium">17%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Platform Health</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Active Sellers</span>
                      <span className="text-green-600 font-medium">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order Success Rate</span>
                      <span className="text-green-600 font-medium">96.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Satisfaction</span>
                      <span className="text-green-600 font-medium">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Uptime</span>
                      <span className="text-green-600 font-medium">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;