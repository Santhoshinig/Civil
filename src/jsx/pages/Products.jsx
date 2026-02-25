import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import '../../styles/Products.css';
import useTilt from '../hooks/useTilt';

/**
 * ProductCard Component
 * 
 * Individual card with high-fidelity 3D tilt effect.
 */
const ProductCard = ({ product, index, onClick }) => {
    return (
        <div
            className="product-card animate-slide-left"
            style={{ animationDelay: `${(index % 8) * 0.1}s` }}
            onClick={() => onClick(product.id)}
        >
            {/* View Icon - Positioned absolute to the card */}
            <div className="product-view-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </div>

            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-card-image" />
            </div>

            <div className="product-card-inner">
                <div className="product-info-section">
                    <h3 className="product-card-title">{product.title}</h3>
                    <p className="product-card-description">{product.description}</p>
                </div>

                <div className="product-view-footer">
                    <span className="view-product-text">View product</span>
                    <span className="view-product-arrow">→</span>
                </div>
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
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8);
    const [partnerInfo, setPartnerInfo] = useState(null);

    // Get partner from query param
    const searchParams = new URLSearchParams(location.search);
    const partnerFilter = searchParams.get('partner');

    // Fetch products and partner info from Firebase
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Partner Info if filter exists
                if (partnerFilter) {
                    const partnerDoc = await getDoc(doc(db, 'partners', partnerFilter));
                    if (partnerDoc.exists()) {
                        setPartnerInfo(partnerDoc.data());
                    }
                }

                const productsCollectionRef = collection(db, 'products');
                const snapshot = await getDocs(productsCollectionRef);

                if (!snapshot.empty) {
                    const firebaseProducts = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        tags: Array.isArray(doc.data().tags) ? doc.data().tags : []
                    }));
                    setProducts(firebaseProducts);

                    // Initial filtering
                    if (partnerFilter) {
                        setFilteredProducts(firebaseProducts.filter(p =>
                            p.partner?.toLowerCase() === partnerFilter.toLowerCase() ||
                            p.brand?.toLowerCase() === partnerFilter.toLowerCase()
                        ));
                    } else {
                        setFilteredProducts(firebaseProducts);
                    }
                } else {
                    setProducts([]);
                    setFilteredProducts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [partnerFilter]);

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
    }, [loading, filteredProducts, visibleCount]);

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
                <div className="breadcrumb-nav">
                    <span onClick={() => navigate('/partners')}>Partners</span>
                    <span className="separator">/</span>
                    <span className="current">{partnerInfo ? partnerInfo.name : (partnerFilter ? 'Loading...' : 'All Products')}</span>
                </div>

                <div className="section-header">
                    <h2 className="section-title">
                        {partnerInfo ? `${partnerInfo.name} Products` : (partnerFilter ? 'Loading...' : 'Our Products')}
                    </h2>
                    <p className="section-subtitle">
                        {partnerInfo ? `Exclusive range of high-performance solutions from ${partnerInfo.name}` : 'Premium chemical products for diverse industrial applications'}
                    </p>
                </div>

                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, visibleCount).map((product, index) => (
                            <ProductCard
                                key={product.id || index}
                                product={product}
                                index={index}
                                onClick={handleProductClick}
                            />
                        ))
                    ) : (
                        <div className="no-products">
                            <p>No products found for this partner.</p>
                            <button className="btn btn-primary" onClick={() => navigate('/partners')}>
                                Back to Partners
                            </button>
                        </div>
                    )}
                </div>

                {visibleCount < filteredProducts.length && (
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
