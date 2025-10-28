import { useState } from "react";
import '../css/AuthModal.css';
import axios from "axios";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";



const AuthModal = ({ isOpen, onClose, type, setType }) => {
    const { refreshCartContext } = useCart();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        direccion: '',
        email: '',
        contraseña: '',
        confirmar: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSumbit = async (e) => {
        e.preventDefault();

        const endpoint = type === 'login' ? `http://localhost:8080/api/usuarios/iniciarSesion` : `http://localhost:8080/api/usuarios/registro`;

        const payload = type === 'login' ?
            { email: formData.email, contraseña: formData.contraseña }
            : {
                nombre: formData.nombre,
                apellido: formData.apellido,
                dni: formData.dni,
                direccion: formData.direccion,
                email: formData.email,
                contraseña: formData.contraseña,
                role: 'user',
            }

        try {
            const response = await axios.post(endpoint, payload, {
                withCredentials: true,
            });
            Swal.fire({
                icon: 'success',
                title: type === 'login' ? 'Bienvenido a DigitalShop' : 'Registro exitoso',
                text: response.data.message,
                confirmButtonColor: '#ff7d12',
            }).then(() => {
                onClose();
                refreshCartContext();
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
    };

    if (!isOpen) return null;
return (
    <div className="modal-overlay">
        <div className="modal-content-user">
            <button className="close-btn" onClick={onClose}>×</button>
            <h2 className='title-user'>{type === 'login' ? 'Iniciar sesión' : 'Registrarse'}</h2>

            <form onSubmit={handleSumbit}>
                {type === 'register' && (
                    <>
                        <div className='grid-form'>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Apellido:</label>
                                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                            </div>
                            <div className="form-group ">
                                <label>DNI/CUIT:</label>
                                <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
                            </div>
                            <div className="form-group  ">
                                <label>Dirección:</label>
                                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
                            </div>
                        </div>
                    </>

                )}

                <div className='grid-form'>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                    </div>

                    {type === 'register' && (
                        <div className="form-group">
                            <label>Confirmar contraseña:</label>
                            <input type="password" name="confirmar" value={formData.confirmar} onChange={handleChange} required />
                        </div>
                    )}
                </div>
                <button type="submit" className="submit-btn">
                    {type === 'login' ? 'Ingresar' : 'Registrarme'}
                </button>
            </form>

            <div className="modal-footer">
                {type === 'login' ? (
                    <p>
                        ¿No tenés cuenta?{" "}
                        <button className="link-btn" onClick={() => setType('register')}>
                            Registrate
                        </button>
                    </p>
                ) : (
                    <p>
                        ¿Ya tenés cuenta?{" "}
                        <button className="link-btn" onClick={() => setType('login')}>
                            Iniciar sesión
                        </button>
                    </p>
                )}
            </div>
        </div>
    </div>
)
}




export default AuthModal;