import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";

const Cart = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

    const INR_RATE = 90.17;
    const formatCurrency = (val) => `₹${(val * INR_RATE).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

    if (cart.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-gray-300" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Your bag is empty.</h2>
                <p className="text-gray-500 mb-8 text-center max-w-sm">
                    Looks like you haven't added anything to your bag yet. Let's find something amazing for you!
                </p>
                <Link
                    to="/"
                    className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105"
                >
                    <ArrowLeft size={18} />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFBFC] py-12">
            <div className="max-w-6xl mx-auto px-6">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping Bag</h1>
                    <p className="text-gray-500 mt-1">You have {totalItems} items in your selection.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left: Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 border border-gray-100 hover:border-gray-200 transition-all shadow-sm"
                            >
                                <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden p-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 line-clamp-1 max-w-[250px]">
                                            {item.title}
                                        </h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                                        Unit Price: {formatCurrency(item.price)}
                                    </p>

                                    <div className="flex justify-between items-end mt-auto">
                                        {/* Minimalist Quantity Controls */}
                                        <div className="flex items-center border border-gray-100 bg-gray-50 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity === 1}
                                                className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-30"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-bold w-10 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <p className="font-black text-lg text-gray-900">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2 mt-4"
                        >
                            <Trash2 size={14} />
                            Empty Selection
                        </button>
                    </div>

                    {/* Right: Summary Sidebar (Sticky) */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(totalPrice / INR_RATE)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold uppercase text-xs tracking-widest">Free</span>
                                </div>
                                <div className="border-t border-gray-50 pt-4 flex justify-between">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-black text-blue-600">
                                        {formatCurrency(totalPrice / INR_RATE)}
                                    </span>
                                </div>
                            </div>

                            {showCheckout ? (
                                <Checkout
                                    onConfirm={() => {
                                        clearCart();
                                        setShowCheckout(false);
                                    }}
                                />
                            ) : (
                                <button
                                    onClick={() => setShowCheckout(true)}
                                    className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-gray-200"
                                >
                                    Go to Checkout
                                </button>
                            )}

                            <p className="text-[10px] text-gray-400 text-center mt-6 uppercase font-bold tracking-[0.1em]">
                                Secure Checkout Powered by ShopHub
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
