import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


//Creamos el contexto para usarlo en toda la app
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setCartId(decoded.cart)
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (!cartId) return;

        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/carrito/${cartId}`, {
                    withCredentials: true,
                });
                setCart(response.data.products);
            } catch (error) {
                console.error("Error al cargar carrito:", error);
            }
        };
        fetchCart();
    }, [cartId]);

    const refreshCartContext = () => {
        const token = Cookies.get('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setCartId(decoded.cart)
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }
    const addProductFromCart = async (pid, quantity = 1) => {
        try {
            await axios.post(
                `http://localhost:8080/api/carrito/${cartId}/productos/${pid}`,
                { quantity },
                { withCredentials: true }
            );

            const response = await axios.get(
                `http://localhost:8080/api/carrito/${cartId}`,
                { withCredentials: true }
            );

            setCart(response.data.products);
            toast.success("Producto agregado correctamente");
        } catch (error) {
            console.error("Error al agregar producto:", error);
            toast.error("Error al agregar producto, debes iniciar sesión primero");
        }
    };


    const removeProductFromCart = async (pid, quantity = 1) => {
        try {
            await axios.delete(`http://localhost:8080/api/carrito/${cartId}/productos/${pid}`, {
                data: { quantity },
                withCredentials: true,
            });

            const response = await axios.get(`http://localhost:8080/api/carrito/${cartId}`, { withCredentials: true });
            setCart(response.data.products);

            toast.success("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            toast.error("Error al eliminar producto");
        }
    };


    const clearCart = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/carrito/${cartId}/productos`, {
                withCredentials: true,
            });
            setCart([]);
            toast.success("Carrito vaciado correctamente")
        } catch (error) {
            console.error("Error al vaciar carrito:", error);
            toast.error("Error al vaciar carrito");
        }
    }

    const total = () => {
        if (!cart || cart.length === 0) return 0;

        return cart.reduce((total, item) => {
            const price = item.product?.precio || 0;
            const quantity = item.quantity || 1;
            return total + price * quantity;
        }, 0);
    };


    return (
        <CartContext.Provider
            value={{
                cart,
                refreshCartContext,
                addProductFromCart,
                clearCart,
                removeProductFromCart,
                total
            }}>
            {children}
        </CartContext.Provider>
    )
}
