import React from 'react';
import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem.jsx';
import { Link } from 'react-router-dom';
import '../css/CartDropDown.css';


const CartDropDown = ({ visible, onClose }) => {
    const { cart, removeProductFromCart, total } = useCart();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose(); // Cierra si se hace clic fuera del dropdown
            }
        };

        if (visible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [visible, onClose]);


    return (
        <div ref={dropdownRef} className={`cart-dropdown ${visible ? "visible" : ""}`}>
            <div className="cart-header">
                <h3 className='cart-title'>Tu Carrito</h3>
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>
            </div>
            {!cart || cart.length === 0 ? (
                <p className="empty">El carrito está vacío</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map((item) => (
                            item.product ? (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    removeProductFromCart={removeProductFromCart}
                                />
                            ) : (
                                <li key={item._id} className="cart-item empty-product">
                                    <div className="details">
                                        <h4>Producto eliminado</h4>
                                        <button className="remove-btn" onClick={() => removeProductFromCart(item._id)}>
                                            <p className=''>Eliminar del carrito</p>
                                        </button>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>

                    {/* Subtotal */}
                    <div className="cart-subtotal">
                        <h4>Subtotal: ${total().toLocaleString('es-AR')}</h4>
                    </div>
                    <div className="checkout-btn-container">
                        <Link to="/checkOut">
                            <button className="checkout-btn" onClick={onClose}>Finalizar Compra</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartDropDown