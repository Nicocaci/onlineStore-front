import React from 'react';
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import '../../../css/NuevoProducto.css'

const CrearProducto = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        categoria: "",
        descripcion: "",
        marca: "",
        precio: "",
        imagen: null,
        estado: "true"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            imagen: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("nombre", formData.nombre);
            data.append("categoria", formData.categoria);
            data.append("descripcion", formData.descripcion);
            data.append("marca", formData.marca);
            data.append("precio", formData.precio);
            if (formData.imagen) {
                data.append("img", formData.imagen)
            }

            const response = await axios.post("http://localhost:8080/api/productos",
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            Swal.fire({
                icon: 'success',
                title: 'Producto creado con éxito',
                text: response.data.message,
                confirmButtonColor: '#ff7d12',
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message,
                    confirmButtonColor: '#d33',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No se pudo conectar con el servidor',
                    confirmButtonColor: '#d33',
                });
            }
        }
    }

    return (
        <div className='contenedor-productos'>
            <form className='form-producto' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='flex-producto'>
                    <label>Nombre</label>
                    <input type="text" name='nombre' value={formData.nombre} onChange={handleChange} />
                    <label >Categoria</label>
                    <input type="text" name='categoria' value={formData.categoria} onChange={handleChange} />
                    <label >Descripcion</label>
                    <input type="text" name='descripcion' value={formData.descripcion} onChange={handleChange} />
                    <label>Precio</label>
                    <input type="number" name='precio' value={formData.precio} onChange={handleChange} />

                </div>
                <div className='flex-producto'>
                    <label >Marca</label>
                    <input type="text" name='marca' value={formData.marca} onChange={handleChange} />
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button className='boton-producto' type='submit'>Confirmar</button>
                </div>
            </form>
        </div>
    )
}

export default CrearProducto;