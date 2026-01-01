import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false);
    },[])

    const login = useCallback((email, password) => {
        const userData = {id:1, email, name:email.split('@')[0]};
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData))
    })

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user')
        localStorage.removeItem('cart'); // clear cart on logout the account
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
