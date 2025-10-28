import React from 'react';
import axios from 'axios';
import '../css/Paso4Finalizar.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const Paso4Finalizar = ({ formData, cart, total, prevStep }) => {
    const { clearCart } = useCart();
    const navigate = useNavigate()

    const handleConfirmar = async () => {
        try {
            if (formData.metodoPago === "stripe") {
                const response = await axios.post(
                    `${apiUrl}/api/orders/crear-orden`,
                    {
                        cart,
                        email: formData.email
                    }
                );

                // Redirige al checkout de Stripe
                window.location.href = response.data.url;
            } else {
                // Flujo normal para pago en efectivo
                const nuevaOrden = {
                    comprador: {
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono,
                        direccion: formData.direccion,
                    },
                    metodoPago: formData.metodoPago,
                    productos: cart.map(item => ({
                        productoId: item.product._id,
                        nombre: item.product.nombre,
                        cantidad: item.quantity,
                        precioUnitario: item.product.precio,
                        subtotal: item.product.precio * item.quantity,
                    })),
                    total: total(),
                    fecha: new Date(),
                };

                const response = await axios.post(
                    `${apiUrl}/api/orders/crear-orden`,
                    nuevaOrden
                );

                alert("✅ ¡Compra confirmada! Gracias por tu pedido.");
                clearCart();
                navigate('/gracias');
            }

        } catch (error) {
            console.error("❌ Error al crear la orden:", error);
            alert("Hubo un error al procesar tu pedido.");
        }
    };

    return (
        <div className="resumen-final">
            <h3>Confirmá tu compra</h3>

            <section className="resumen-datos">
                <h4>Datos del comprador</h4>
                <p><strong>Nombre:</strong> {formData.nombre}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Teléfono:</strong> {formData.telefono}</p>
                <p><strong>Dirección de envío:</strong> {formData.direccion}</p>
                <p>
                    <strong>Método de pago:</strong>{" "}
                    {formData.metodoPago === "efectivo"
                        ? "Efectivo (al recibir)"
                        : "Stripe (Tarjeta de crédito/débito)"}
                </p>

            </section>

            <section className="resumen-carrito">
                <h4>Detalle del pedido</h4>
                <ul>
                    {cart.map((item, i) => (
                        <li key={i} className="item-resumen">
                            <span>{item.product.nombre} x{item.quantity}</span>
                            <span>${item.product.precio * item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <h4 className="total-compra">Total: ${total()}</h4>
            </section>

            <div className="btn-checkout">
                <button type="button" onClick={prevStep}>Atrás</button>
                <button
                    type="button"
                    onClick={handleConfirmar}
                    className="btn-confirmar"
                >
                    Confirmar compra
                </button>
            </div>
        </div>
    );
};

export default Paso4Finalizar;
