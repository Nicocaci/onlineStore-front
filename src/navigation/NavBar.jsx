import React, { useState, useRef, useEffect } from 'react';
import '../css/NavBar.css';
import AuthModal from '../utils/AuthModal.jsx';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import CartDropDown from './CartDropDown.jsx';
const apiUrl = import.meta.env.VITE_API_URL;

const NavBar = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [authType, setAuthType] = useState('login');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const openAuthModal = (type) => {
        setAuthType(type);
        setShowAuthModal(true);
    };

    const toggleCart = () => setShowCart(prev => !prev);
    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogOut = async () => {
        try {
            Swal.fire({
                title: 'Cerrando sesión...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            await axios.post(`${apiUrl}/api/usuarios/cerrarSesion`, {}, { withCredentials: true });
            localStorage.removeItem('token');

            Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Has cerrado sesión exitosamente.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ff7d12',
            }).then(() => {
                window.location.href = '/';
            });
        } catch (error) {
            console.error("Error en logout:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cerrar sesión, intenta nuevamente.',
            });
        }
    };

    return (
        <div>
            {/* Barra superior */}
            <div className='login-container center'>
                <ul className='li-none flex-col-navbar'>
                    <li className='underline-1' onClick={() => openAuthModal('login')}>Iniciar Sesión</li>
                    <li className='underline-2' onClick={() => openAuthModal('registro')}>Registrarse</li>
                    <li className='underline-3' onClick={handleLogOut}>Cerrar Sesión</li>
                </ul>
            </div>

            {/* NAVBAR */}
            <div className='navbar-container'>
                {/* Logo a la izquierda */}
                <div className='logo'>
                    <h1>LOGO</h1>
                </div>

                {/* Menú centrado */}
                <div className='menu-desktop'>
                    <ul className='li-none link-navBar flex-col-navbar'>
                        <li><Link className='link-navBar underline-1' to="/">Inicio</Link></li>
                        <li><Link className='link-navBar underline-2' to="/productos">Producto</Link></li>
                        <li><Link className='link-navBar underline-3' to="/perfil">Perfil</Link></li>
                    </ul>
                </div>

                {/* Carrito a la derecha */}
                <div className='right-section'>
                    <button className='cart-button' onClick={toggleCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="black" className="bi bi-cart logo-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    </button>
                    <CartDropDown visible={showCart} onClose={() => setShowCart(false)} />
                </div>

                {/* Botón hamburguesa (solo mobile) */}
                <button ref={buttonRef} className='hamburger-btn' onClick={toggleMobileMenu}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </button>
            </div>

            {/* Menú móvil */}
            {mobileMenuOpen && (
                <div ref={menuRef} className='mobile-menu'>
                    <ul className='li-none link-navBar flex-col-navbar'>
                        <li><Link onClick={() => setMobileMenuOpen(false)} className='link-navBar underline-1' to="/">Inicio</Link></li>
                        <li><Link onClick={() => setMobileMenuOpen(false)} className='link-navBar underline-2' to="/productos">Producto</Link></li>
                        <li><Link onClick={() => setMobileMenuOpen(false)} className='link-navBar underline-3' to="/perfil">Perfil</Link></li>
                    </ul>
                </div>
            )}

            {/* Modal Login/Registro */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                type={authType}
                setType={setAuthType}
            />
        </div>
    );
};

export default NavBar;
