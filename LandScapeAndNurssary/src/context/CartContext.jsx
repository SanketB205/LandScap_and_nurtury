import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, token } = useAuth()

  // Fetch cart from backend on mount or auth change
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    } else {
      setCartItems([])
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        setCartItems(data.products || [])
      }
    } catch (err) {
      console.error('Error fetching cart:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) return false

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      })
      const data = await res.json()
      if (res.ok) {
        setCartItems(data.products)
        return true
      }
    } catch (err) {
      console.error('Error adding to cart:', err)
    }
    return false
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      })
      const data = await res.json()
      if (res.ok) {
        setCartItems(data.products)
      }
    } catch (err) {
      console.error('Error updating quantity:', err)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        setCartItems(data.products)
      }
    } catch (err) {
      console.error('Error removing from cart:', err)
    }
  }

  const clearCart = async () => {
    try {
      const res = await fetch('/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        setCartItems([])
      }
    } catch (err) {
      console.error('Error clearing cart:', err)
    }
  }

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.productId.price * item.quantity)
  }, 0)

  const cartCount = cartItems.reduce((count, item) => {
    return count + item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
