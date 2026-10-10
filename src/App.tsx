import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import ProductList from './components/ProductList/ProductList';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
import { Product } from './types/product';
import { ApiProductsResponse } from './types/apiProduct';
import { mergeProgramsWithApi } from './utils/mergePrograms';
import './App.css';

// Contenido propio del servicio (programas de psicología)
const PROGRAMS_URL = '/programas.json';
// API pública: de aquí salen la valoración y los cupos disponibles de cada programa
const API_URL = 'https://dummyjson.com/products';

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  // Estados del consumo de datos
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  // Estados de la interfaz
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const [programsResponse, apiResponse] = await Promise.all([
          fetch(PROGRAMS_URL, { signal: controller.signal }),
          fetch(API_URL, { signal: controller.signal }),
        ]);
        if (!programsResponse.ok) {
          throw new Error(`Error ${programsResponse.status}: no se pudieron obtener los programas.`);
        }
        if (!apiResponse.ok) {
          throw new Error(`Error ${apiResponse.status}: no se pudo obtener la información de la API.`);
        }
        const programs: Product[] = await programsResponse.json();
        const apiData: ApiProductsResponse = await apiResponse.json();
        setProducts(mergeProgramsWithApi(programs, apiData.products));
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(
          err instanceof Error
            ? err.message
            : 'Ocurrió un error inesperado. Revisa tu conexión e inténtalo de nuevo.'
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [reloadKey]);

  const handleRetry = useCallback(() => setReloadKey((k) => k + 1), []);

  const handleAddToCart = (product: Product, delta: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prevCart.filter((item) => item.product.id !== product.id);
        }
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else if (delta > 0) {
        return [...prevCart, { product, quantity: delta }];
      }
      return prevCart;
    });
  };

  const categories = ['Todos', 'Niños', 'Adolescentes', 'Adultos'];

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="app-container">
      <Header />

      <main className="main-layout">
        {/* Banner Hero Nube de Bienvenida */}
        <section className="hero-cloud-section">
          <div className="hero-cloud-card">
            <span className="cloud-icon">☁️</span>
            <h2>¡Bienvenidos a TerapiasKids! 🌸</h2>
            <p>
              Un espacio de construcción y aprendizaje de la salud mental y emocional de niños, niñas y familias.
              En la infancia temprana y la adolescencia, las emociones, hábitos y rutinas son la base de un desarrollo saludable.
            </p>
          </div>
        </section>

        {/* Controles de Búsqueda y Categorías */}
        <div className="controls-bar">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar programa o taller..."
          />

          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sección Principal con Catálogo y Carrito */}
        <div className="content-grid">
          <section id="catalog" className="catalog-section">
            <div className="catalog-header">
              <h2>Catálogo de Programas</h2>
              <p>Ordenados por nivel de atención y necesidades</p>
            </div>

            {loading && <Loader />}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}
            {!loading && !error && (
              <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
            )}
          </section>

          {/* Carrito de Compras / Matrícula */}
          <aside className="cart-sidebar">
            <h3>Mi Selección 🎒</h3>
            {cart.length === 0 ? (
              <p className="cart-empty">No has seleccionado ningún programa aún.</p>
            ) : (
              <div className="cart-content">
                <ul className="cart-list">
                  {cart.map((item) => (
                    <li key={item.product.id} className="cart-item">
                      <div>
                        <strong>{item.product.name}</strong>
                        <p>{item.quantity} x ${item.product.price.toLocaleString('es-CL')}</p>
                      </div>
                      <button
                        className="btn-remove-item"
                        onClick={() => handleAddToCart(item.product, -item.quantity)}
                        aria-label={`Quitar ${item.product.name}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="cart-total-box">
                  <span>Total:</span>
                  <strong>${totalCartPrice.toLocaleString('es-CL')} CLP</strong>
                </div>

                <Button
                  variant="primary"
                  onClick={() => alert('¡Matrícula confirmada con éxito en TerapiasKids!')}
                >
                  Confirmar Inscripción
                </Button>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
