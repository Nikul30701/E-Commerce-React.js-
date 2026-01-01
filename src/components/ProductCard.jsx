import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react';


const ProductCard = ({product, onAddToCart}) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleClick = () => {
        setIsAdding(true);
        onAddToCart(product);
        setTimeout(() => setIsAdding(false), 500);
    }
    return (
        <div className='bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full'>
                {/* Images of Product */}
            <div className='h-48 bg-gray-100 flex items-center justify-center p-4 overflow-hidden'>
                <img 
                    src={product.image}
                    alt={product.title}
                    className='h-full w-full object-contain hover:scale-110 transition-transform'
                />
            </div>
            {/* Product Details */}
            <div className='p-4 flex flex-col grow'>
                <span className="text-xs font-semibold text-blue-600 uppercase mb-2">
                    {product.category}
                </span>
                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 grow">
                    {product.title}
                </h3>
                {/* rating */}
                <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs text-gray-600">⭐ {product.rating?.rate || 4.5}</span>
                </div>

                {/* Price and Button */}
                <div className='flex items-center justify-between pt-3 border-t'>
                    <span className='className="text-lg font-bold text-gray-900'>
                        Rs.{product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleClick}
                        className={`p-2 rounded-lg transition-all ${
                            isAdding 
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                :  'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        {isAdding 
                            ? '✅'
                            : <ShoppingCart size={18} />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
