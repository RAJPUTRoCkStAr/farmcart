import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, MapPin, Clock, Star, Package, CreditCard, Truck, Eye, Plus, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    isDefault: false
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      address: '123 Green Street, Eco City, EC 12345',
      isDefault: true
    },
    {
      id: 2,
      label: 'Office',
      address: '456 Work Avenue, Business District, BD 67890',
      isDefault: false
    }
  ]);

  const recentOrders = [
    {
      id: 'ORD001',
      date: '2025-01-15',
      items: [
        { name: 'Organic Tomatoes', quantity: 2, price: 80 },
        { name: 'Fresh Carrots', quantity: 1, price: 50 }
      ],
      total: 210,
      status: 'delivered',
      seller: 'Green Valley Farm',
      paymentMethod: 'UPI',
      deliveryAddress: '123 Green Street, Eco City',
      trackingId: 'TRK001234'
    },
    {
      id: 'ORD002',
      date: '2025-01-12',
      items: [
        { name: 'Fresh Mangoes', quantity: 3, price: 120 }
      ],
      total: 360,
      status: 'in-transit',
      seller: 'Sunshine Orchards',
      paymentMethod: 'Card',
      deliveryAddress: '123 Green Street, Eco City',
      trackingId: 'TRK001235'
    },
    {
      id: 'ORD003',
      date: '2025-01-10',
      items: [
        { name: 'Farm Fresh Milk', quantity: 2, price: 60 }
      ],
      total: 120,
      status: 'processing',
      seller: 'Happy Cow Dairy',
      paymentMethod: 'COD',
      deliveryAddress: '123 Green Street, Eco City',
      trackingId: 'TRK001236'
    }
  ];

  const wishlistItems = [
    {
      id: '1',
      name: 'Organic Spinach',
      price: 60,
      image: 'https://images.pexels.com/photos/2316819/pexels-photo-2316819.jpeg?auto=compress&cs=tinysrgb&w=150',
      inStock: true,
      seller: 'Green Valley Farm'
    },
    {
      id: '2',
      name: 'Fresh Strawberries',
      price: 200,
      image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=150',
      inStock: false,
      seller: 'Berry Farm'
    }
  ];

  const cartItems = [
    {
      id: '1',
      name: 'Organic Broccoli',
      price: 90,
      quantity: 1,
      image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=150',
      seller: 'Green Valley Farm'
    },
    {
      id: '2',
      name: 'Fresh Apples',
      price: 100,
      quantity: 2,
      image: 'https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg?auto=compress&cs=tinysrgb&w=150',
      seller: 'Mountain Orchards'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Package className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.address) {
      const newId = Math.max(...addresses.map(a => a.id)) + 1;
      const addressToAdd = { ...newAddress, id: newId };
      
      if (newAddress.isDefault) {
        // Set all other addresses to non-default
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
      }
      
      setAddresses(prev => [...prev, addressToAdd]);
      setNewAddress({ label: '', address: '', isDefault: false });
      setShowAddAddress(false);
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleReorder = (order: any) => {
    // Add all items from the order to cart
    console.log('Reordering items:', order.items);
    alert(`Added ${order.items.length} items to cart for reorder!`);
  };

  const handleViewOrderDetails = (order: any) => {
    alert(`Viewing details for order ${order.id}\n\nItems: ${order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}\nTotal: ₹${order.total}\nStatus: ${order.status}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Order History' },
    { id: 'cart', label: 'Current Cart' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'addresses', label: 'Addresses' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage your orders, cart, and account preferences
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{recentOrders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
              <p className="text-sm text-gray-600">Wishlist Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{cartItems.length}</p>
              <p className="text-sm text-gray-600">Cart Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Avg Rating Given</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    to="/products"
                    className="bg-green-500 text-white p-4 rounded-lg text-left hover:bg-green-600 transition-colors block"
                  >
                    <ShoppingBag className="h-6 w-6 mb-2" />
                    <p className="font-medium">Continue Shopping</p>
                    <p className="text-sm text-green-100">Explore fresh products</p>
                  </Link>
                  <Link
                    to="/cart"
                    className="bg-blue-500 text-white p-4 rounded-lg text-left hover:bg-blue-600 transition-colors block"
                  >
                    <Package className="h-6 w-6 mb-2" />
                    <p className="font-medium">View Cart</p>
                    <p className="text-sm text-blue-100">{cartItems.length} items in cart</p>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="bg-purple-500 text-white p-4 rounded-lg text-left hover:bg-purple-600 transition-colors block"
                  >
                    <Heart className="h-6 w-6 mb-2" />
                    <p className="font-medium">My Wishlist</p>
                    <p className="text-sm text-purple-100">{wishlistItems.length} saved items</p>
                  </Link>
                </div>
              </div>

              {/* Recent Orders Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{order.total}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''} from {order.seller}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order History</h3>
              <div className="space-y-6">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">Placed on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{order.total}</p>
                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Items Ordered</h5>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} x{item.quantity}</span>
                              <span>₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Order Details</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Seller:</strong> {order.seller}</p>
                          <p><strong>Payment:</strong> {order.paymentMethod}</p>
                          <p><strong>Delivery:</strong> {order.deliveryAddress}</p>
                          {order.trackingId && (
                            <p><strong>Tracking:</strong> {order.trackingId}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleViewOrderDetails(order)}
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      {order.status === 'delivered' && (
                        <button 
                          onClick={() => handleReorder(order)}
                          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          Reorder
                        </button>
                      )}
                      {order.status === 'in-transit' && (
                        <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Current Cart</h3>
                <Link
                  to="/cart"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Go to Cart
                </Link>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <Link
                    to="/products"
                    className="text-green-600 hover:text-green-700 font-medium mt-2 inline-block"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">by {item.seller}</p>
                        <p className="text-green-600 font-bold">₹{item.price} x {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-xl font-bold text-green-600">
                        ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Wishlist</h3>
                <Link
                  to="/wishlist"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  View All
                </Link>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <Link
                    to="/products"
                    className="text-green-600 hover:text-green-700 font-medium mt-2 inline-block"
                  >
                    Discover products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">by {item.seller}</p>
                        <p className="text-green-600 font-bold">₹{item.price}</p>
                        <span className={`text-xs ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
                <button 
                  onClick={() => setShowAddAddress(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Add New Address Form */}
              {showAddAddress && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-4">Add New Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label (e.g., Home, Office)
                      </label>
                      <input
                        type="text"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter address label"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Complete Address
                      </label>
                      <input
                        type="text"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter complete address"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                    </label>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleAddAddress}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Address</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowAddAddress(false);
                        setNewAddress({ label: '', address: '', isDefault: false });
                      }}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{address.label}</h4>
                            {address.isDefault && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{address.address}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-green-600 hover:text-green-700 text-sm"
                          >
                            Set Default
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;