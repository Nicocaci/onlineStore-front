import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Products.css';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlUD = import.meta.env.VITE_API_URL_UPLOADS;

const Products = () => {
    const [products, setProducts] = useState([]); // todos los productos
    const [filteredProducts, setFilteredProducts] = useState([]); // productos filtrados
    const [searchTerm, setSearchTerm] = useState(''); // texto de búsqueda
    const [selectedCategory, setSelectedCategory] = useState(''); // categoría seleccionada
    const [marcas, setMarcas] = useState([]);
    const [selectedMarca, setSelectedMarca] = useState('');
    const [categories, setCategories] = useState([]); // lista de categorías

    // ⚡ Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6); // productos por página

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/productos`);
            if (Array.isArray(response.data)) {
                setProducts(response.data);
                setFilteredProducts(response.data);

                // Obtener categorías y marcas únicas
                const uniqueCategories = [...new Set(response.data.map(p => p.categoria))];
                const uniqueMarcas = [...new Set(response.data.map(p => p.marca))];
                setCategories(uniqueCategories);
                setMarcas(uniqueMarcas);
            } else {
                console.error("La API no devolvió un array", response.data);
                setProducts([]);
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error("Error al obtener los productos", error);
        }
    };

    // 🔹 Filtrar productos cada vez que cambian los filtros
    useEffect(() => {
        let filtered = products;

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(p =>
                p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== '') {
            filtered = filtered.filter(p => p.categoria === selectedCategory);
        }

        if (selectedMarca !== '') {
            filtered = filtered.filter(p => p.marca === selectedMarca);
        }

        setFilteredProducts(filtered);
        setCurrentPage(1); // resetear a la primera página al cambiar filtros
    }, [searchTerm, selectedCategory, selectedMarca, products]);

    // 🔹 Paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!products.length) return <div>Cargando productos...</div>;

    return (
        <div className="products-container">
            <p className='center titulo-products'>Productos</p>

            {/* 🔍 Filtros */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    value={selectedMarca}
                    onChange={(e) => setSelectedMarca(e.target.value)}
                    className='filtro-marcas'
                >
                    <option value="">Todas las marcas</option>
                    {marcas.map((marca) => (
                        <option key={marca} value={marca}>{marca}</option>
                    ))}
                </select>
            </div>

            {/* 🛍️ Lista de productos */}
            <div className='card-container'>
                {currentProducts.length > 0 ? (
                    currentProducts.map((p) => (
                        <Link className='link-none' key={p._id} to={`/producto/${p._id}`}>
                            <div className='card'>
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
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>

            {/* 🔹 Paginación */}
            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={currentPage === i + 1 ? "active" : ""}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
