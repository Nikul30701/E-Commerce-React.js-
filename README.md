# 🛒 React E-Commerce App

A modern **React E-Commerce application** built with real-world frontend practices such as Context API, React Router, Tailwind CSS, and API optimization techniques.

---

## 🚀 Features

- 🛍️ Product listing using Fake Store API  
- 🧩 Category-based product filtering  
- 🛒 Cart management (Add / Remove / Quantity update)  
- 💾 Cart persistence using Local Storage  
- ⚡ Skeleton loaders for slow API handling  
- 🧭 Routing with React Router DOM  
- 🎨 Tailwind CSS with CSS variables (`--primary`)  
- 📱 Fully responsive UI  

---

## 🧠 Tech Stack

- **Frontend:** React (Hooks)  
- **State Management:** Context API + useReducer  
- **Routing:** React Router DOM  
- **Styling:** Tailwind CSS  
- **Icons:** lucide-react  
- **API:** Fake Store API  
- **Build Tool:** Vite  

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── ProductCard.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── LoadingSkeleton.jsx
├── context/
│   └── CartContext.jsx
├── pages/
│   └── ProductListing.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
