import React from 'react'

const Checkout = () => {
    const [formData, setFormData] = useState({name: '', email:''})
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleSubmit = () => {
        if (formData.name && formData.email) {
            setIsConfirmed(true);
        }
    }

    if (isConfirmed) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Order Confirmed!</h3>
                <p className="text-green-600 mb-6">Thank you for your purchase</p>
                <a href="/" className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Back to Shopping
                </a>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            <div>
                <label className='block text-gray-700 fnt-semibold mb-2'>Full Name</label>
                <input 
                    type="text"
                    placeholder='Enter name.....'
                    value={formData.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    onChange={(e) => setFormData({ ...formData, name:e.target.value})}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Delivery Address</label>
                <textarea
                    placeholder="123 Main Street, City, State"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    rows="3"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Card Number (Mock)</label>
                <input
                    type="text"
                    placeholder="4111 1111 1111 1111"
                    value={formData.card}
                    onChange={(e) => setFormData({ ...formData, card: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
            </div>
            <button
                onClick={handleSubmit}
                className='w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700'
            >Confirm Order</button>
        </div>
    )
}

export default Checkout
