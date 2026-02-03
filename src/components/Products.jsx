import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { productsData as fallbackProducts } from '../data/products';
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
            style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(product.id)}
        >
            <div className="product-image">
                <div className="image-placeholder">
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
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-tags">
                    {product.tags?.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

/**
 * Products Component
 * Fetches products from Firebase AND merges with local data
 */
const Products = () => {
    const productsRef = useRef(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    // Fetch products from Firebase and merge with local
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch from Firebase
                const productsCollectionRef = collection(db, 'products');
                const snapshot = await getDocs(productsCollectionRef);

                let firebaseProducts = [];
                if (!snapshot.empty) {
                    firebaseProducts = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        // Ensure tags is strictly an array
                        tags: Array.isArray(doc.data().tags) ? doc.data().tags : []
                    }));
                }

                // Merge Firebase products with local hardcoded products
                // We display Firebase products first (newest), then local ones
                const combinedProducts = [...firebaseProducts, ...fallbackProducts];

                setProducts(combinedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
                // On error, still show local products
                setProducts(fallbackProducts);
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
                        // Logic: Remove class when out of view to re-trigger animation
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = productsRef.current?.querySelectorAll('.product-card');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [loading, products]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
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
        <section id="products" className="products-section" ref={productsRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Products</h2>
                    <p className="section-subtitle">
                        Premium chemical products for diverse industrial applications
                    </p>
                </div>

                <div className="products-grid">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id || index}
                            product={product}
                            index={index}
                            onClick={handleProductClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
