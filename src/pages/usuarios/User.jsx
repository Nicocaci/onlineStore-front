import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../css/User.css'
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const User = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    dni: '',
    direccion: ''
  });

  useEffect(() => {
    if (loading) return;
    if (!user || !user.id) {
      console.error("Debes iniciar sesión primero");
      navigate('/');
      return;
    }
    fetchUsuario();
  }, [user, loading, navigate])

  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/usuarios/${user.id}`);
      console.log(response);
      setFormData(response.data);
    } catch (error) {
      console.error("Error al obtener el usuario", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/usuarios/${user.id}`, formData);
      alert("Información actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar los datos del usuario", error);
      alert("Hubo un error al actualizar tus datos.");
    }
  }

  return (
    <div>
      <p className='title'>Perfil User</p>
      <div>
        <form className='formUser center' onSubmit={handleUpdate}>
          <div className='grid-form-1'>
            <label>Email: </label>
            <input type="email" name='email'  value={formData.email} onChange={handleChange} disabled />

            <label>Nombre: </label>
            <input type="text" name='nombre' value={formData.nombre} onChange={handleChange} />

            <label>Apellido: </label>
            <input type="text" name='apellido' value={formData.apellido} onChange={handleChange} />

          </div>
          <div className='grid-form-1'> 
            <label>DNI: </label>
            <input type="text" name='dni' value={formData.dni} onChange={handleChange} />
            <label>Dirección: </label>
            <input type="text" name='direccion' value={formData.direccion} onChange={handleChange} />
            <div className='center'>
              <button className='btn-usuario' type='submit'>Actualizar Información</button>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}

export default User;