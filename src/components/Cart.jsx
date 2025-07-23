import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      {error && <p className="error-message">{error}</p>}

      <ul className="cart-list">
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <li key={value._id} className="cart-item">
                  <span className="item-name">{value.productName}</span>
                  <span className="item-price">₹{value.price}</span>
                  <button
                    className="qty-btn decrement-btn"
                    onClick={() => decrement(value._id, value.qty)}
                  >
                    -
                  </button>
                  <span className="item-qty">{value.qty}</span>
                  <button
                    className="qty-btn increment-btn"
                    onClick={() => increment(value._id, value.qty)}
                  >
                    +
                  </button>
                  <span className="item-total">₹{value.price * value.qty}</span>
                </li>
              )
          )}
      </ul>

      <h5 className="order-value">Total: ₹{orderValue}</h5>

      <div className="cart-actions">
        {user?.token ? (
          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        ) : (
          <button className="login-order-btn" onClick={() => Navigate("/login")}>
            Login to Order
          </button>
        )}
      </div>
    </div>
  );
}
