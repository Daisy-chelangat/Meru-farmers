import React, { useState } from 'react';

const CartSystemPreview = () => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'dairy', label: 'Dairy' }
  ];

  const sampleProducts = [
    {
      _id: '1',
      name: 'Fresh Tomatoes',
      description: 'Organic tomatoes freshly harvested from Meru highlands. Perfect for salads and cooking.',
      price: 80,
      category: 'vegetables',
      unit: 'kg',
      quantity: 50,
      farmerName: 'John Mwangi',
      location: 'Meru Town',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'
    },
    {
      _id: '2',
      name: 'Sweet Bananas',
      description: 'Naturally ripened sweet bananas. Rich in potassium and perfect for snacking.',
      price: 60,
      category: 'fruits',
      unit: 'dozen',
      quantity: 30,
      farmerName: 'Mary Njeri',
      location: 'Tigania',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400'
    },
    {
      _id: '3',
      name: 'Maize Grains',
      description: 'Freshly milled maize flour from locally grown maize. Perfect for ugali.',
      price: 120,
      category: 'grains',
      unit: 'kg',
      quantity: 100,
      farmerName: 'Peter Mutembei',
      location: 'Meru Central',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
    },
    {
      _id: '4',
      name: 'Fresh Milk',
      description: 'Pure fresh milk from grass-fed cows. Delivered daily from local farms.',
      price: 50,
      category: 'dairy',
      unit: 'liter',
      quantity: 40,
      farmerName: 'Grace Kanini',
      location: 'Nkubu',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400'
    },
    {
      _id: '5',
      name: 'Green Kale',
      description: 'Fresh sukuma wiki, organically grown without chemicals. Rich in vitamins.',
      price: 40,
      category: 'vegetables',
      unit: 'kg',
      quantity: 25,
      farmerName: 'John Mwangi',
      location: 'Meru Town',
      image: 'https://i.pinimg.com/736x/69/8e/00/698e0062f0bd4e9d0635bc1d73e10661.jpg'
    },
    {
      _id: '6',
      name: 'Avocados',
      description: 'Premium Hass avocados, perfectly ripe and ready to eat. High in healthy fats.',
      price: 150,
      category: 'fruits',
      unit: 'kg',
      quantity: 20,
      farmerName: 'Mary Njeri',
      location: 'Tigania',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400'
    }
  ];

  const handleAddToCart = (product) => {
    const existingItem = cart.items.find(item => item.productId._id === product._id);
    
    let newItems;
    if (existingItem) {
      newItems = cart.items.map(item =>
        item.productId._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...cart.items, {
        _id: `item-${Date.now()}`,
        productId: product,
        quantity: 1,
        price: product.price
      }];
    }

    const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCart({ items: newItems, totalAmount });
    setIsCartOpen(true);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newItems = cart.items.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCart({ items: newItems, totalAmount });
  };

  const handleRemoveItem = (itemId) => {
    const newItems = cart.items.filter(item => item._id !== itemId);
    const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCart({ items: newItems, totalAmount });
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart({ items: [], totalAmount: 0 });
    }
  };

  const isInCart = (productId) => {
    return cart.items.some(item => item.productId._id === productId);
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Cart Icon */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-6 px-4 rounded-lg mb-8 mx-4 mt-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Fresh Farm Products from Meru</h1>
            <p className="text-sm md:text-lg opacity-90">Support local farmers, get fresh produce</p>
          </div>
          
          {/* Cart Icon Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white text-green-600 p-3 md:p-4 rounded-full hover:bg-gray-100 transition"
          >
            <span className="text-xl md:text-2xl">🛒</span>
            {cart.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cart.items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-green-500 focus:outline-none transition"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 md:px-6 py-2 rounded-full font-semibold transition text-sm md:text-base ${
                  category === cat.value
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {isInCart(product._id) && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    In Cart ✓
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Farmer Info */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    👤 {product.farmerName}
                  </span>
                  <span className="flex items-center gap-1">
                    📍 {product.location}
                  </span>
                </div>

                {/* Price & Stock */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">KSh {product.price}</span>
                    <span className="text-gray-500">per {product.unit}</span>
                  </div>
                  <span className={`text-sm font-medium ${product.quantity > 10 ? 'text-green-600' : 'text-orange-500'}`}>
                    {product.quantity} {product.unit} available
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    isInCart(product._id)
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isInCart(product._id) ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex justify-between items-center flex-shrink-0">
              <h2 className="text-xl font-bold">
                🛒 Your Cart ({cart.items.length})
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-gray-200 text-3xl font-bold leading-none"
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.items.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item._id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <img 
                          src={item.productId.image} 
                          alt={item.productId.name}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 mb-1 truncate">
                            {item.productId.name}
                          </h3>
                          <p className="text-green-600 font-bold mb-2">
                            KSh {item.price} / {item.productId.unit}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              🗑️
                            </button>
                          </div>

                          {/* Subtotal */}
                          <p className="text-sm text-gray-600">
                            Subtotal: <span className="font-semibold">KSh {(item.price * item.quantity).toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Clear Cart Button */}
                  {cart.items.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="w-full py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 font-medium"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer - Total & Checkout */}
            {cart.items.length > 0 && (
              <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    KSh {cart.totalAmount.toFixed(2)}
                  </span>
                </div>
                <button 
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                  onClick={() => alert('Checkout functionality coming soon!')}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartSystemPreview;