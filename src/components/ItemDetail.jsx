import { useState, useEffect, use } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import '../css/ItemDetail.css'
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlUD = import.meta.env.VITE_API_URL_UPLOADS;



const ItemDetail = () => {
    const { prodId } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addProductFromCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/api/productos/${prodId}`)
                console.log("Producto Obtenido:", response.data);
                setProducto(response.data)
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError("Error al obtener el producto")
                setProducto(null)
            } finally {
                setLoading(false)
            }
        };

        fetchProducts();
    }, [prodId]);


    const handleAddToCart = (productId) => {
        const quantity = 1;
        addProductFromCart(productId, quantity)
    }

    if (loading) {
        return <p>Cargando Productos...</p>
    }

    if (error) {
        return <p>{error}</p>
    }
    if (!producto) {
        return <p>Producto no encontrado</p>
    }


    return (
        <div key={producto?._id} className="detail-container">
            <div className="grid-1">
                <img
                    className='img-detail'
                    src={
                        producto.img?.[0]?.startsWith("http")
                            ? producto.img[0]
                            : `${apiUrlUD}/uploads/${producto.img?.[0]}`
                    }
                    alt={producto.nombre}
                />
            </div>
            <div className="grid-2">
                <p className="title-detail">{producto?.nombre}</p>
                <p className="description-detail"><strong className="content-detail">Categoría:     </strong>{producto?.categoria}</p>
                <p className="description-detail"><strong className="content-detail">Descripción:   </strong>{producto?.descripcion}</p>
                <p className="price-detail"><strong className="content-detail">Precio:   </strong> ${producto?.precio}</p>
                <div className="btn-container">
                    <button className="btn-detail" onClick={() => handleAddToCart(producto?._id)}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail