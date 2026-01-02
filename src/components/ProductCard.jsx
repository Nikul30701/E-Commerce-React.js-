import React, { useState } from 'react'
import { ShoppingCart, Check, Star } from 'lucide-react'; 
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleClick = (e) => {

        e.preventDefault();
        setIsAdding(true);
        onAddToCart(product);
        setTimeout(() => setIsAdding(false), 800);
    }
    const INR_RATE = 90.17;

    return (
        <div className='group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden'>
            {/* Image Container */}
            <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-gray-50/50">
                <div className="aspect-square p-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
                
                <span className="absolute left-3 top-3 rounded-full bg-[#e0dcdb] backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-[#330000] uppercase shadow-sm border border-white/20">
                    {product.category}
                </span>
            </Link>

            {/* Product Details */}
            <div className='p-5 flex flex-col grow'>
                <h3 className="font-medium text-gray-800 line-clamp-2 mb-2 grow leading-relaxed">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-md">
                        <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-xs font-bold text-yellow-700">{product.rating?.rate || 4.5}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                        ({product.rating?.count || 0} reviews)
                    </span>
                </div>

                {/* Price */}
                <div className='flex items-center justify-between pt-4 border-t border-gray-50'>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Price</span>
                        <span className='text-xl font-black text-gray-900'>
                            ₹{(product.price * INR_RATE).toFixed(2)}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={isAdding}
                        className={`relative flex items-center justify-center h-11 w-11 rounded-xl transition-all duration-300 active:scale-90 ${
                            isAdding 
                                ? 'bg-green-500 text-white shadow-green-200 shadow-lg'
                                : 'bg-gray-900 text-white hover:bg-blue-600 shadow-lg shadow-gray-200 hover:shadow-blue-200'
                        }`}
                    >
                        {isAdding 
                            ? <Check size={20} strokeWidth={3} />
                            : <ShoppingCart size={20} />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ProductCard)
