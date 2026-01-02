import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import api from '../services/api'
import { Filter, Layers } from 'lucide-react'

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart()

    const categories = ['all', 'electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing']

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = selectedCategory === 'all'
                ? await api.getProducts()
                : await api.getProductsByCategory(selectedCategory)

            setProducts(data);
        } catch (err) {
            setError(err.message || 'Failed to load products');
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory])

    return (
        <div className="min-h-screen bg-[#FAFBFC]">
            {/* Header Section */}
            <header className='bg-white border-b border-gray-100 pb-8 pt-6'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
                        <div>
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Layers size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Curated Collection</span>
                            </div>
                            <h1 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>
                                Discover Products
                            </h1>
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                            Showing <span className="text-gray-900">{products.length}</span> items
                        </div>
                    </div>
                </div>
            </header>

            <div className='max-w-7xl mx-auto px-6 py-8'>
                <div className='flex items-center gap-4 mb-10'>
                    
                    {/* Horizontal Scroll for Categories */}
                    <div className='flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0'>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                    selectedCategory === cat
                                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                                        : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-r-xl mb-10 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold">Oops!</span>
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {/* Grid Content */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => <LoadingSkeleton key={i} />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4 text-gray-400">
                            <Layers size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                        <p className="text-gray-500">Try selecting a different category or refresh the page.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product, index) => (
                            <div 
                                key={product.id} 
                                className="animate-in fade-in zoom-in-95 duration-500"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <ProductCard
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductListing
