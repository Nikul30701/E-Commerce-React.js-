import React from 'react'

const LoadingSkeleton = () => {
    return (
        <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[...Array(8).map((_, i) => (
                <div key={i} className='bg-gray-200 rounded-lg h-64 animate-pulse' />
            ))]}
        </div>
    )
}

export default LoadingSkeleton
