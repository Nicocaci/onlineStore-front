import React from 'react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Paso1Datos from '../components/Paso1Datos';
import Paso2Pago from '../components/Paso2Pago';
import Paso3Envio from '../components/Paso3Envio';
import Paso4Finalizar from '../components/Paso4Finalizar';
import '../css/CheckOut.css';
import CheckOutStepper from '../components/CheckOutStepper';



const CheckOut = () => {
    const { cart, total } = useCart();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        direccion: '',
        metodoPago: ''
    });

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="checkout-container">
            <h2 className='titulo-checkout'>Finalizar Cómpra - Paso {step}</h2>
            <CheckOutStepper step={step} />
            {step === 1 && <Paso1Datos formData={formData} updateFormData={updateFormData} nextStep={nextStep} />}
            {step === 2 && <Paso2Pago formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <Paso3Envio formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <Paso4Finalizar formData={formData} cart={cart} total={total} prevStep={prevStep} />}
        </div>
    )
}

export default CheckOut