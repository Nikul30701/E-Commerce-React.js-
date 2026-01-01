import React, { createContext, useCallback, useReducer, useContext } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART' : {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state.map(item => 
                    item.id === action.payload.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            }
            return [ ...state, {...action.payload, quantity:1}]
        }
        case 'REMOVE_FROM_CART' : {
            return state.filter(item => item.id !== action.payload.id);
        }
        case 'UPDATE_QUANTITY' : 
            return state.map(item => 
                item.id === action.payload.id
                ? {...item, quantity: Math.max(1, action.payload.quantity)}
                : item
            );
        case 'CLEAR_CART' : 
            return [];
        case 'LOAD_CART' :
            return action.payload;
        default:
            return state;
    }
}

const CartProvider= () => {
    
    const [cart, dispatch] = useReducer(cartReducer, [])

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart)})
        }
    }, [])

    // save cart to localstorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = useCallback((product) => {
        dispatch({type: 'ADD_TO_CART', payload: product})
    }, [])

    const removeFromCart = useCallback((productId) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: productId})
    }, [])

    const updateQuantity =useCallback((productId, quantity) => {
        dispatch({type: 'UPDATE_QUANTITY', payload: {id: productId, quantity,}})
    })

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);


    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity)
    
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity,clearCart, totalPrice, totalItems}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider')
    return context
}
