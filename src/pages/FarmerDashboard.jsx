import React, { useState } from 'react';

const FarmerDashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      _id: '1',
      name: 'Fresh Tomatoes',
      description: 'Organic tomatoes freshly harvested from Meru highlands',
      price: 80,
      category: 'vegetables',
      unit: 'kg',
      quantity: 50,
      location: 'Meru Town',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150'
    },
    {
      _id: '2',
      name: 'Green Kale',
      description: 'Fresh sukuma wiki, organically grown without chemicals',
      price: 40,
      category: 'vegetables',
      unit: 'kg',
      quantity: 25,
      location: 'Meru Town',
      image: 'https://i.pinimg.com/736x/69/8e/00/698e0062f0bd4e9d0635bc1d73e10661.jpg'
    }
  ]);

  const [orders] = useState([
    {
      customerName: 'Jane Wanjiku',
      customerEmail: 'jane@example.com',
      customerPhone: '+254 712 345 678',
      items: [
        { name: 'Fresh Tomatoes', quantity: 5, unit: 'kg', price: 80 },
        { name: 'Green Kale', quantity: 3, unit: 'kg', price: 40 }
      ],
      orderTotal: 520,
      orderedAt: new Date()
    },
    {
      customerName: 'David Kimathi',
      customerEmail: 'david@example.com',
      customerPhone: '+254 723 456 789',
      items: [
        { name: 'Fresh Tomatoes', quantity: 10, unit: 'kg', price: 80 }
      ],
      orderTotal: 800,
      orderedAt: new Date(Date.now() - 86400000)
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'vegetables',
    unit: 'kg',
    quantity: '',
    location: '',
    image: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingProduct) {
      setProducts(products.map(p => p._id === editingProduct._id ? { ...formData, _id: p._id } : p));
    } else {
      setProducts([...products, { ...formData, _id: Date.now().toString() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'vegetables',
      unit: 'kg',
      quantity: '',
      location: '',
      image: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white text-center py-12 px-4 rounded-lg mb-8 mx-4 mt-4">
        <h1 className="text-4xl font-bold mb-2">Farmer Dashboard</h1>
        <p className="text-lg opacity-90">Manage your products and view customer orders</p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex border-b-2 border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 font-semibold transition ${
              activeTab === 'products'
                ? 'text-green-600 border-b-3 border-blue-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
            style={activeTab === 'products' ? { borderBottom: '3px solid hsl(128, 84.10%, 32.20%)' } : {}}
          >
            My Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-3 font-semibold transition ${
              activeTab === 'orders'
                ? 'text-green-600 border-b-3 border-blue-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
            style={activeTab === 'orders' ? { borderBottom: '3px solid hsl(128, 84.10%, 32.20%)' } : {}}
          >
            Customer Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
              >
                {showForm ? 'Cancel' : '+ Add Product'}
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (KSh)"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                    <option value="dairy">Dairy</option>
                    <option value="livestock">Livestock</option>
                  </select>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="piece">Piece</option>
                    <option value="liter">Liter</option>
                    <option value="dozen">Dozen</option>
                    <option value="bag">Bag</option>
                  </select>

                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity Available"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL (optional)"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={handleSubmit} className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button onClick={resetForm} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="space-y-4">
              {products.map(product => (
                <div key={product._id} className="bg-white p-5 rounded-xl shadow-md flex gap-5 hover:shadow-lg transition">
                  <img 
                    src={product.image || 'https://via.placeholder.com/120'} 
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        Price: KSh {product.price}/{product.unit}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        Stock: {product.quantity} {product.unit}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => editProduct(product)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Orders</h2>
            
            <div className="space-y-5">
              {orders.map((order, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex justify-between items-start mb-5 pb-4 border-b-2 border-gray-100">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{order.customerName}</h3>
                      <p className="text-gray-600 text-sm">
                        📧 {order.customerEmail} | 📞 {order.customerPhone}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        KSh {order.orderTotal.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-3">Items:</h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="text-gray-600">{item.quantity} {item.unit}</span>
                        <span className="font-semibold text-green-600">
                          KSh {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-200 text-sm text-gray-500">
                    Order placed: {order.orderedAt.toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboardPreview;