import React, {useEffect, useEffectEvent, useState} from 'react'
import useCart from '../context/CartContext'


const ProductListing = () => {
    const [products, setProducts] =useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart()

    const categories = ['all', 'electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing']

    const fetchProducts = useEffectEvent(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = 
                selectedCategory === 'all'
                ? await api.getProducts()
                : await api.getProductByCategory(selectedCategory)
            
            setProducts(data);
        } catch (err) {
            setError(err.message || 'Failed to load products');
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    })

    useEffect(() => {
        fetchProducts();
    },[selectedCategory])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* header */}
            <div className='bg-white shadow-sm sticky top-0 z-10'>
                <div className='max-w-7xl mx-auto px-4 py-4'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Shop Products
                    </h1>
                    <p className='text-gray-600 text-sm'>Browse our amazing collection</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* categories filter */}
                <div className='mb-8 flex flex-wrap gap-2'>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                                selectedCategory === cat
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Error State */}
                {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    <p className="font-semibold">Error Loading Products</p>
                    <p className="text-sm">{error}</p>
                </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                <LoadingSkeleton />
                ) : products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No products found</p>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                    />
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default ProductListing
