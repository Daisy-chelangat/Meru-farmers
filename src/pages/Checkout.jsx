// Create a new file: src/pages/Checkout.jsx

import React, { useState } from 'react';
import { Smartphone, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';

const Checkout = ({ cart, onBack, onSuccess }) => {
  const [step, setStep] = useState('payment'); // payment, mpesa, processing, success
  const [phoneNumber, setPhoneNumber] = useState('');

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.slice(0, 10);
  };

  const handleMpesaPayment = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    setStep('processing');

    // Simulate M-Pesa STK Push
    setTimeout(() => {
      const transaction = {
        id: 'TXN' + Date.now(),
        date: new Date().toISOString(),
        customer: phoneNumber,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: getTotal(),
        status: 'completed',
        method: 'M-Pesa'
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('customer_transactions') || '[]');
      localStorage.setItem('customer_transactions', JSON.stringify([...existing, transaction]));

      setStep('success');
    }, 3000);
  };

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  // PAYMENT METHOD SELECTION
  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Payment Method</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-green-600 text-lg">KSh {getTotal().toFixed(1)}</span>
              </div>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setStep('mpesa')}
                className="w-full flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">M-Pesa</h3>
                  <p className="text-sm text-gray-600">Pay with your phone</p>
                </div>
              </button>
              <button
                onClick={() => alert('Card payment coming soon!')}
                className="w-full flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Card Payment</h3>
                  <p className="text-sm text-gray-600">Visa, Mastercard</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // M-PESA PAYMENT FORM
  if (step === 'mpesa') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setStep('payment')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">M-Pesa Payment</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{item.name} x{item.quantity}</span>
                  <span className="font-semibold">KSh {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-3 pt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-green-600 text-lg">KSh {getTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                placeholder="0712345678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter the phone number registered with M-Pesa
              </p>
            </div>

            <button
              onClick={handleMpesaPayment}
              disabled={!phoneNumber || phoneNumber.length < 10}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition"
            >
              Send Payment Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PROCESSING
  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Smartphone className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Request Sent</h2>
          <p className="text-gray-600 mb-4">
            Please check your phone for the M-Pesa prompt
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800 font-semibold mb-1">
              STK Push sent to: {phoneNumber}
            </p>
            <p className="text-sm text-green-700">
              Enter your M-Pesa PIN on your phone to complete the payment
            </p>
          </div>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been confirmed and payment processed
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Order Details</h3>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span className="font-semibold">KSh {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-3 pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">M-Pesa</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Phone Number:</span>
                <span className="font-semibold">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Total Paid:</span>
                <span className="font-bold text-green-600">KSh {getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleSuccess}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition mb-3"
          >
            Continue Shopping
          </button>
          <p className="text-sm text-gray-500">
            You will receive a confirmation SMS shortly
          </p>
        </div>
      </div>
    );
  }
};

export default Checkout;