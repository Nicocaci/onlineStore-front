import React from 'react';
import '../css/CheckOutStepper.css';

const pasos = ['Datos', 'Pago', 'Envío', 'Confirmar'];


const CheckOutStepper = ({ step }) => {
    return (
        <div className='stepper-container'>
            {pasos.map((nombrePaso, index) => {
                const numero = index + 1;
                const activo = step === numero;
                const completado = step > numero;

                return (
                    <div className={`step ${activo ? 'active' : ''} ${completado ? 'completed' : ''}`} key={index}>
                        <div className="step-number">{numero}</div>
                        <div className="step-label">{nombrePaso}</div>
                        {index !== pasos.length - 1 && <div className="step-line"></div>}
                    </div>
                )
            })}
        </div>
    )
}

export default CheckOutStepper