import { useState } from 'react';
import '../css/CartDropDown.css'

const CartItem = ({ item, removeProductFromCart }) => {
    const producto = item.product;
    const [qtyToRemove, setQtyToRemove] = useState(1);


    const handleRemove = () => {
        removeProductFromCart(producto._id);
    };

    console.log("🧩 ITEM DATA:", item);


    return (
        <li key={item._id} className="cart-item">
            <div className="details">
                <div className='img-container-cart'>
                    <img
                        className='img-card'
                        src={
                            producto?.img?.[0]?.startsWith("http")
                                ? p.img[0]
                                : `http://localhost:8080/uploads/${producto?.img?.[0]}`
                        }
                        alt={producto?.nombre}
                    />
                    <div>
                        <h4>{producto?.nombre}</h4>
                        <h4>{producto?.categoria}</h4>
                        <p>Cantidad: {item.quantity || 1}</p>
                        <h4>$ {producto?.precio.toLocaleString('es-AR')}</h4>
                    </div>
                </div>

                <label className='label-cart'>Eliminar cantidad:</label>
                <button className="remove-btn" onClick={handleRemove}>
                    Eliminar
                </button>
            </div>
        </li>
    )
}

export default CartItem