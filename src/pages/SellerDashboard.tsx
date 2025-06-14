import React, { useState } from 'react';
import { Plus, Package, TrendingUp, DollarSign, Eye, Edit, Trash2, Star, Upload, Image as ImageIcon, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    organic: false,
    images: [] as string[]
  });

  const stats = [
    {
      label: 'Total Products',
      value: '24',
      change: '+3 this month',
      icon: <Package className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Total Sales',
      value: '₹45,230',
      change: '+12% this month',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Orders',
      value: '156',
      change: '+8 today',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      label: 'Rating',
      value: '4.8',
      change: '124 reviews',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 80,
      stock: 25,
      sold: 145,
      status: 'approved',
      category: 'vegetables',
      images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=150'],
      description: 'Fresh organic tomatoes grown without pesticides',
      organic: true
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      price: 50,
      stock: 0,
      sold: 89,
      status: 'approved',
      category: 'vegetables',
      images: ['https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=150'],
      description: 'Sweet and crunchy fresh carrots',
      organic: false
    },
    {
      id: '3',
      name: 'Organic Lettuce',
      price: 40,
      stock: 18,
      sold: 67,
      status: 'pending',
      category: 'vegetables',
      images: ['https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=150'],
      description: 'Crisp organic lettuce perfect for salads',
      organic: true
    }
  ]);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'ORD001',
      customer: 'Priya Sharma',
      product: 'Organic Tomatoes',
      quantity: 2,
      amount: 160,
      status: 'processing',
      date: '2025-01-15',
      customerPhone: '+91 98765 43210',
      deliveryAddress: '123 Green Street, Mumbai'
    },
    {
      id: 'ORD002',
      customer: 'Rajesh Kumar',
      product: 'Fresh Carrots',
      quantity: 3,
      amount: 150,
      status: 'shipped',
      date: '2025-01-14',
      customerPhone: '+91 98765 43211',
      deliveryAddress: '456 Blue Avenue, Delhi'
    },
    {
      id: 'ORD003',
      customer: 'Anita Patel',
      product: 'Organic Lettuce',
      quantity: 1,
      amount: 40,
      status: 'delivered',
      date: '2025-01-13',
      customerPhone: '+91 98765 43212',
      deliveryAddress: '789 Red Road, Pune'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.description && newProduct.stock) {
      const productToAdd = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock),
        sold: 0,
        status: 'pending',
        category: newProduct.category,
        images: newProduct.images.length > 0 ? newProduct.images : ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=150'],
        description: newProduct.description,
        organic: newProduct.organic
      };
      
      setProducts(prev => [...prev, productToAdd]);
      setShowAddProduct(false);
      setNewProduct({
        name: '',
        price: '',
        category: '',
        description: '',
        stock: '',
        organic: false,
        images: []
      });
      alert('Product submitted for admin review!');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setNewProduct(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    }
  };

  const removeImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setRecentOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'My Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Seller Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user?.name} - Manage your products and track your sales
        </p>
        {user?.businessName && (
          <p className="text-sm text-green-600 font-medium">
            {user.businessName} • {user.businessType}
          </p>
        )}
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
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setShowAddProduct(true)}
                    className="bg-green-500 text-white p-4 rounded-lg text-left hover:bg-green-600 transition-colors"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    <p className="font-medium">Add New Product</p>
                    <p className="text-sm text-green-100">List a new item for sale</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="bg-blue-500 text-white p-4 rounded-lg text-left hover:bg-blue-600 transition-colors"
                  >
                    <Package className="h-6 w-6 mb-2" />
                    <p className="font-medium">Manage Inventory</p>
                    <p className="text-sm text-blue-100">Update stock levels</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="bg-purple-500 text-white p-4 rounded-lg text-left hover:bg-purple-600 transition-colors"
                  >
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <p className="font-medium">View Analytics</p>
                    <p className="text-sm text-purple-100">Track your performance</p>
                  </button>
                </div>
              </div>

              {/* Recent Orders */}
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
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.slice(0, 3).map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.product} (x{order.quantity})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Products</h3>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.organic && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Organic
                        </span>
                      )}
                      <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(product.status)}`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <p className="text-lg font-bold text-green-600 mb-2">₹{product.price}/kg</p>
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>Stock: {product.stock} kg</span>
                        <span>Sold: {product.sold}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>
                        <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button className="bg-red-100 text-red-700 py-2 px-3 rounded text-sm font-medium hover:bg-red-200 transition-colors">
                          <Trash2 className="h-4 w-4" />
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
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{order.amount}</p>
                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Customer Details</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Name:</strong> {order.customer}</p>
                          <p><strong>Phone:</strong> {order.customerPhone}</p>
                          <p><strong>Address:</strong> {order.deliveryAddress}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Order Details</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Product:</strong> {order.product}</p>
                          <p><strong>Quantity:</strong> {order.quantity} kg</p>
                          <p><strong>Total:</strong> ₹{order.amount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {order.status === 'processing' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                          Mark as Shipped
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          Mark as Delivered
                        </button>
                      )}
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        Contact Customer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Monthly Sales Trend</h4>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - Sales data visualization would go here
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Top Selling Products</h4>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                        <span className="text-gray-600">{product.sold} sold</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New Product</h3>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per kg (₹) *
                    </label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter price"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="grains">Grains</option>
                      <option value="dairy">Dairy</option>
                      <option value="handmade">Handmade</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock (kg) *
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter stock quantity"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe your product"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProduct.organic}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, organic: e.target.checked }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">This is an organic product</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                          <span>Upload images</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>

                  {newProduct.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {newProduct.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> Your product will be reviewed by our admin team before it goes live. 
                    This process typically takes 1-2 business days.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddProduct}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Submit for Review</span>
                  </button>
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;