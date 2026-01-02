import React from 'react';

const SkeletonCard = () => (
    <div className="flex flex-col h-full bg-white rounded-2xl p-4 border border-gray-50 shadow-sm">
        {/* Product Image Area */}
        <div className="bg-gray-100 animate-pulse aspect-square w-full rounded-xl mb-4" />
        
        {/* Category & Title Area */}
        <div className="space-y-3 grow">
            {/* Category Tag */}
            <div className="bg-gray-100 animate-pulse h-3 w-1/4 rounded-full" />
            
            {/* Title Lines */}
            <div className="space-y-2">
                <div className="bg-gray-100 animate-pulse h-4 w-full rounded-md" />
                <div className="bg-gray-100 animate-pulse h-4 w-5/6 rounded-md" />
            </div>

            {/* Rating Stars */}
            <div className="bg-gray-100 animate-pulse h-3 w-20 rounded-md mt-2" />
        </div>

        {/* Footer: Price and Button */}
        <div className="flex justify-between items-end mt-6 pt-4 border-t border-gray-50">
            <div className="space-y-1">
                <div className="bg-gray-100 animate-pulse h-2 w-8 rounded" />
                <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-md" />
            </div>
            
            {/* The circular Add to Cart button */}
            <div className="bg-gray-200 animate-pulse h-11 w-11 rounded-xl" />
        </div>
    </div>
);

const LoadingSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10'>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="opacity-0 animate-in fade-in duration-500" 
                        style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                    >
                        <SkeletonCard />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;
