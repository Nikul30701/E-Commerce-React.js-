
const api = {
    getProducts: async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            if (!response.ok) throw new Error('Failed to fetch products')
            return await response.json()
        } catch (error) {
            console.error('API Error:', error)
            throw error;
        }
    },
    getProductById: async (id) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            if (!response.ok) throw new Error('Product not found')
            return await response.json()
        } catch (error) {
            console.error('API Error:', error)
            throw error;
        }
    },

    getProductsByCategory: async (category) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
            if (!response.ok) throw new Error('Category not found')
            return await response.json()
        } catch (error) {
            console.error('API Error:', error)
            throw error;
        }
    }
}

export default api;
