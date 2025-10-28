const Paso1Datos = ({ formData, updateFormData, nextStep }) => {
    const handleChange = e => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.nombre && formData.email && formData.telefono) {
            nextStep();
        } else {
            alert("Completá todos los campos.");
        }
    };

    return (
        <form onSubmit={handleNext} className="checkout-form">
            <input
                className="input-100"
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />
            <input
                className="input-100"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                className="input-100"
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono || ""}
                onChange={handleChange}
                required
            />
            <button type="submit">Siguiente</button>
        </form>
    );
};

export default Paso1Datos;
