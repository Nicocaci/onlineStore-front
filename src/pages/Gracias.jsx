import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from '../context/CartContext';
import axios from "axios";
import "../css/Gracias.css";
const apiUrl = import.meta.env.VITE_API_URL;

const Gracias = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [pagoStripe, setPagoStripe] = useState(null);
    const { clearCart } = useCart();

    const sessionId = params.get("session_id"); // viene desde Stripe si el pago fue online

    useEffect(() => {
        const verificarPagoStripe = async () => {
            if (!sessionId) return; // si no hay session_id, fue pago en efectivo
            setLoading(true);
            try {
                const res = await axios.get(`${apiUrl}/api/checkout/session/${sessionId}`);
                setPagoStripe(res.data);

                // ✅ Si el pago fue exitoso, vaciar el carrito
                if (res.data.payment_status === "paid") {
                    clearCart();
                    console.log("🧹 Carrito vaciado tras compra exitosa");
                }
            } catch (error) {
                console.error("Error al verificar pago:", error);
            } finally {
                setLoading(false);
            }
        };

        verificarPagoStripe();
    }, [sessionId]);

    return (
        <div className="gracias-container">
            <div className="gracias-card">
                <h1>🎉 ¡Gracias por tu compra!</h1>

                {loading ? (
                    <p>Verificando tu pago...</p>
                ) : sessionId && pagoStripe ? (
                    <>
                        <p>Tu pago en línea se procesó correctamente ✅</p>
                        <p>
                            Monto: <strong>{(pagoStripe.amount_total / 100).toFixed(2)} {pagoStripe.currency.toUpperCase()}</strong>
                        </p>
                        <p>ID de transacción: {pagoStripe.id}</p>
                    </>
                ) : !sessionId ? (
                    <p>
                        Tu pedido fue recibido correctamente. En breve te enviaremos los detalles a tu
                        correo.
                    </p>
                ) : (
                    <p>Hubo un problema al verificar el pago. Si ya fue debitado, comunicate con soporte.</p>
                )}

                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        </div>
    );
};

export default Gracias;
