import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/Products.css';
import useTilt from '../hooks/useTilt';

/**
 * ProductCard Component
 * 
 * Individual card with high-fidelity 3D tilt effect.
 */
const ProductCard = ({ product, index, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const tiltRef = useTilt();

    return (
        <div
            ref={tiltRef}
            className="product-card animate-slide-left"
            style={{ animationDelay: `${(index % 8) * 0.1}s`, cursor: 'pointer' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(product.id)}
        >
            <div className="product-image">
                <div className="product-image-placeholder">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className={`product-overlay ${isHovered ? 'active' : ''}`}>
                    <button className="product-btn" onClick={(e) => {
                        e.stopPropagation();
                        onClick(product.id);
                    }}>
                        Know More
                    </button>
                </div>
            </div>

            <div className="product-content">
                <h3 className="product-title" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                {product.tags && product.tags.length > 0 && (
                    <div className="product-tags">
                        <span className="tag">{product.tags[0]}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * Products Component
 * Fetches products from Firebase AND manages visibility count
 */
const Products = () => {
    const productsRef = useRef(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    // Fetch products from Firebase
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollectionRef = collection(db, 'products');
                const snapshot = await getDocs(productsCollectionRef);

                if (!snapshot.empty) {
                    const firebaseProducts = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        tags: Array.isArray(doc.data().tags) ? doc.data().tags : []
                    }));
                    setProducts(firebaseProducts);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = productsRef.current?.querySelectorAll('.product-card');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [loading, products, visibleCount]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 8);
    };

    if (loading) {
        return (
            <section className="products-section">
                <div className="container">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading products...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="products-section page-transition" ref={productsRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Products</h2>
                    <p className="section-subtitle">
                        Premium chemical products for diverse industrial applications
                    </p>
                </div>

                <div className="products-grid">
                    {products.slice(0, visibleCount).map((product, index) => (
                        <ProductCard
                            key={product.id || index}
                            product={product}
                            index={index}
                            onClick={handleProductClick}
                        />
                    ))}
                </div>

                {visibleCount < products.length && (
                    <div className="load-more-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                        <button className="btn btn-primary" onClick={handleLoadMore}>
                            Know More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;
