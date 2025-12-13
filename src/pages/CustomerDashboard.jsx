import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import Checkout from './Checkout';

const CustomerDashboard = () => {
  const [products] = useState([
    {
      _id: '1',
      name: 'Fresh Tomatoes',
      description: 'Organic tomatoes freshly harvested from Meru highlands',
      price: 80,
      category: 'vegetables',
      unit: 'kg',
      quantity: 50,
      location: 'Meru Town',
      farmer: 'John Doe Farm',
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
      farmer: 'Jane Farm',
      image: 'https://i.pinimg.com/736x/69/8e/00/698e0062f0bd4e9d0635bc1d73e10661.jpg'
    },
    {
      _id: '3',
      name: 'Fresh Mangoes',
      description: 'Sweet and juicy mangoes from coastal region',
      price: 120,
      category: 'fruits',
      unit: 'kg',
      quantity: 30,
      location: 'Kilifi',
      farmer: 'Coastal Fresh Farms',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=150'
    },
    {
      _id: '4',
      name: 'White Maize',
      description: 'High quality white maize grain',
      price: 60,
      category: 'grains',
      unit: 'kg',
      quantity: 100,
      location: 'Kitale',
      farmer: 'Rift Valley Grains',
      image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=150'
    }
  ]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, cartQuantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item._id === productId) {
        const newQuantity = item.cartQuantity + change;
        return { ...item, cartQuantity: Math.max(0, newQuantity) };
      }
      return item;
    }).filter(item => item.cartQuantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = ['all', 'vegetables', 'fruits', 'grains', 'dairy', 'livestock'];
  if (showCheckout) {
    return (
      <Checkout 
        cart={cart} 
        onBack={() => setShowCheckout(false)}
        onSuccess={() => {
          setShowCheckout(false);
          setCart([]);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white text-center py-12 px-4 rounded-lg mb-8 mx-4 mt-4">
        <h1 className="text-4xl font-bold mb-2">Customer Dashboard</h1>
        <p className="text-lg opacity-90">Browse fresh farm products and manage your cart</p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Filter by Category:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                      selectedCategory === cat
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Available Products</h2>
              
              {filteredProducts.map(product => (
                <div key={product._id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="flex gap-5">
                    <img 
                      src={product.image || 'https://via.placeholder.com/120'} 
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          KSh {product.price}/{product.unit}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          📍 {product.location}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {product.farmer}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                          {product.category}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
              <div className="flex items-center gap-2 mb-5">
                <ShoppingCart className="text-green-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">My Cart</h2>
                <span className="ml-auto bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {cart.length}
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-1">Add products to get started!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item._id} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 flex-1">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                            <button
                              onClick={() => updateCartQuantity(item._id, -1)}
                              className="text-gray-600 hover:text-gray-800 p-1"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-semibold px-3">{item.cartQuantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item._id, 1)}
                              className="text-gray-600 hover:text-gray-800 p-1"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-bold text-green-600">
                            KSh {(item.price * item.cartQuantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          KSh {item.price}/{item.unit}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        KSh {getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    
                    <button onClick={() => setShowCheckout(true)}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                      Proceed to Checkout
                    </button>
                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;