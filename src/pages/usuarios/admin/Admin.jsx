import React from 'react';
import '../../../css/Admin.css';
import CrearProducto from './CrearProducto.jsx';
import { useState } from 'react';


const Admin = () => {
  const [activeTab, setActiveTab] = useState('crearProducto');

  return (
    <div>
      <p className='titulo-admin center'>Dashboard Admin</p>
      <div className='contenido-admin'>
        <div className='li-admin' >
          <ul className='pages-admin'>
            <li className={`link-admin ${activeTab === 'crearProducto' ? 'activo' : ''}`} onClick={() => setActiveTab('crearProducto')}>Nuevo Producto</li>
          </ul>
        </div>
        <div>
          {activeTab === 'crearProducto' && (
            <CrearProducto />
          )}

        </div>
      </div>
    </div>

  )
}

export default Admin