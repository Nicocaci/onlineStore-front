import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Products.css';

const ProductosDestacados = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/productos");
            if (Array.isArray(response.data)) {
                setProductos(response.data);
            } else {
                console.log("La API no devolvió un array");
                setProductos([])
            }
        } catch (error) {
            console.error("Error al obtener los productos", error);
        }
    }
    return (
        <div>
            <div>
                <p className='title center'>Productos Destacados</p>
            </div>
            <div className='card-container'>
                {productos.map((p) => (
                    <div className='card' key={p._id}>
                        <img
                            className='img-card'
                            src={
                                p.img?.[0]?.startsWith("http")
                                    ? p.img[0]
                                    : `http://localhost:8080/uploads/${p.img?.[0]}`
                            }
                            alt={p.nombre}
                        />
                        <div className='card-content'>
                            <p>{p.nombre}</p>
                            <p>${p.precio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductosDestacados