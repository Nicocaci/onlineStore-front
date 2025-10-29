const Paso2Pago = ({ formData, updateFormData, nextStep, prevStep }) => {
    const handleSelect = (e) => {
        updateFormData({ metodoPago: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.metodoPago) nextStep();
        else alert("Seleccioná un método de pago.");
    };

    return (
        <form onSubmit={handleNext} className="checkout-form">
            <h3>Elegí una forma de pago</h3>
            <label className="radio-option">
                <input
                    type="radio"
                    name="metodoPago"
                    value="stripe"
                    checked={formData.metodoPago === "stripe"}
                    onChange={handleSelect}
                />
                Stripe (Tarjeta de crédito/débito)
            </label>

            <div className="btn-checkout">
                <button type="button" onClick={prevStep}>Atrás</button>
                <button type="submit">Siguiente</button>
            </div>
        </form>
    );
};

export default Paso2Pago;
