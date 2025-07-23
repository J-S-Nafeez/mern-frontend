import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Dubai Cafe</h3>
        <p>Experience the taste of authentic Arabian flavors at Dubai Cafe, right inside your campus!</p>

        <div className="footer-links">
          <a href="/">Menu</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/cart">MyCart </a>
        </div>

        <div className="footer-contact">
          <p><strong>Email:</strong> support@dubaicafe.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> Dubai Cafe, LPU Campus, Punjab</p>
        </div>

        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a> |
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>
        </div>

        <p className="footer-copy">&copy; 2025 Dubai Cafe. Freshness Served Daily. All rights reserved.</p>
      </div>
    </footer>
  );
}
