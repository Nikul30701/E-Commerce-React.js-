import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import { useCart } from './context/CartContext'
import Login from './components/Login'
import ProductListing from './components/ProductListing'
import Cart from './components/Cart'
import { ShoppingCart, Home, LogOut, Menu, X, User } from 'lucide-react';

const App = () => {
    const { user, logout, isLoading } = useAuth()
    const { totalItems } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('shop')

    if (isLoading) {
        return (
            <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className='text-gray-500 font-medium animate-pulse'>Loading Experience...</p>
            </div>
        )
    }

    if (!user) return <Login />

    return (
        <div className='min-h-screen bg-[#FAFBFC] text-gray-900 font-sans'>
            {/* Navbar */}
            <nav className='bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-6 py-4'>
                    <div className='flex items-center justify-between'>
                        
                        {/* Logo */}
                        <div 
                            onClick={() => setCurrentPage('shop')} 
                            className='flex items-center gap-2.5 cursor-pointer group'
                        >
                            <div className='w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105'>
                                R
                            </div>
                            <span className='font-bold text-xl tracking-tight'>ReactShop</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className='hidden md:flex items-center gap-8'>
                            <button
                                onClick={() => setCurrentPage('shop')}
                                className={`flex items-center gap-2 text-sm font-semibold transition-all ${currentPage === 'shop' ? 'text-blue-600' : 'text-gray-500 hover:text-black'}`}
                            >
                                <Home size={18} />
                                Shop
                            </button>

                            <button
                                onClick={() => setCurrentPage('cart')}
                                className={`relative flex items-center gap-2 text-sm font-semibold transition-all ${currentPage === 'cart' ? 'text-blue-600' : 'text-gray-500 hover:text-black'}`}
                            >
                                <ShoppingCart size={18} />
                                Cart
                                {totalItems > 0 && (
                                    <span className='absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white'>
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* User Profile Pill */}
                            <div className='flex items-center gap-4 pl-6 border-l border-gray-100'>
                                <div className='flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100'>
                                    <div className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center'>
                                        <User size={14} className='text-gray-600' />
                                    </div>
                                    <span className='text-sm font-medium text-gray-700'>{user.name}</span>
                                </div>
                                
                                <button
                                    onClick={logout}
                                    className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='md:hidden p-2 bg-gray-50 rounded-lg text-gray-600'
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Mobile Navigation Dropdown */}
                    {isMobileMenuOpen && (
                        <div className='md:hidden mt-4 pb-4 space-y-2 animate-in fade-in slide-in-from-top-2'>
                            <button 
                                onClick={() => {setCurrentPage('shop'); setIsMobileMenuOpen(false)}}
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium ${currentPage === 'shop' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Shop
                            </button>
                            <button 
                                onClick={() => {setCurrentPage('cart'); setIsMobileMenuOpen(false)}}
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium flex justify-between items-center ${currentPage === 'cart' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Cart <span>{totalItems}</span>
                            </button>
                            <button 
                                onClick={logout}
                                className="w-full text-left px-4 py-3 text-red-600 font-semibold border-t border-gray-50 mt-2"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content Area */}
            <main className='max-w-7xl mx-auto px-6 py-8 min-h-[calc(100vh-200px)]'>
                {currentPage === 'cart' ? <Cart /> : <ProductListing />}
            </main>

            {/* Footer */}
            <footer className='bg-white border-t border-gray-100 py-12'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
                        <div className='flex items-center gap-2 font-bold text-gray-900'>
                            <div className='w-6 h-6 bg-black text-white rounded flex items-center justify-center text-xs'>R</div>
                            ReactShop
                        </div>
                        <div className='text-center md:text-right'>
                            <p className='text-gray-400 text-sm'>&copy; 2026 ShopHub. Premium E-Commerce Experience.</p>
                            <div className='flex gap-4 mt-2 justify-center md:justify-end text-xs font-medium text-gray-500'>
                                <span className='hover:text-black cursor-pointer'>Privacy</span>
                                <span className='hover:text-black cursor-pointer'>Terms</span>
                                <span className='hover:text-black cursor-pointer'>Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
