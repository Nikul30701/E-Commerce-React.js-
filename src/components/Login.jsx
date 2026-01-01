import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const {login} = useAuth();

    const handleSubmit = () => {
        if (login(email, password)) {
            setEmail('');
            setPassword('');
        } else {
            setError('Invalid email or password');
            console.log('Invalid email or password');
        }
    }

    return (
        <div className='min-h-screen bg-liner-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4'>
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                        Welcome
                    </h1>
                    <p className='text-gray-600 mb-6'>Sign in to your account</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>
                    )}

                    <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </button>
                </div>

                <div className='mt-6 pt-6 border-t text-center'>
                    <p className='text-gray-600 text-sm mb-2'>Demo Cardential</p>
                    <p className='text-xs text-gray-500'>abc@gmail.com + abc12</p>
                </div>
            </div>
        </div>
    )
}

export default Login
