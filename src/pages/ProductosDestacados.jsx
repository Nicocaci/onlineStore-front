import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Products.css';

const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlUD = import.meta.env.VITE_API_URL_UPLOADS;

const ProductosDestacados = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/productos`);
            if (Array.isArray(response.data)) {
                setProductos(response.data);
            } else {
                console.log("La API no devolvió un array");
                setProductos([]);
            }
        } catch (error) {
            console.error("Error al obtener los productos", error);
        }
    };

    // 🔹 Agrupar productos por marca y tomar el primero de cada una
    const productosPorMarca = {};
    productos.forEach((p) => {
        if (!productosPorMarca[p.marca]) {
            productosPorMarca[p.marca] = [];
        }
        productosPorMarca[p.marca].push(p);
    });

    const destacadosPorMarca = Object.values(productosPorMarca).map(
        (arr) => arr[0] // primer producto de cada marca
    );

    return (
        <div>
            <div>
                <p className='title center'>Productos Destacados</p>
            </div>
            <div className='card-container'>
                {destacadosPorMarca.map((p) => (
                    <Link className='link-none' key={p._id} to={`/producto/${p._id}`}>
                        <div className='card' key={p._id}>
                            <img
                                className='img-card'
                                src={
                                    p.img?.[0]?.startsWith("http")
                                        ? p.img[0]
                                        : `${apiUrlUD}/uploads/${p.img?.[0]}`
                                }
                                alt={p.nombre}
                            />
                            <div className='card-content'>
                                <p>{p.nombre}</p>
                                <p className='card-precio'>${p.precio.toLocaleString('es-AR')}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <a className='center link-none' href="/productos"><button className='btn-home'> Ir a productos</button></a>
        </div>
    );
};

export default ProductosDestacados;
