import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { doc, getDoc, updateDoc, increment, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/ProductDetail.css';
import useTilt from '../hooks/useTilt';
import { useContact } from '../context/ContactContext';

/**
 * ProductDetail Component
 * 
 * Logic: Displays detailed information about a single product
 * Fetches from Firebase first, falls back to local data.
 * Increments view count on visit.
 */
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { openContact } = useContact();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const hasIncrementedView = useRef(false);
    const lastViewedId = useRef(null);
    const tiltRef = useTilt();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            // Reset increment flag if ID changes
            if (lastViewedId.current !== id) {
                hasIncrementedView.current = false;
                lastViewedId.current = id;
            }

            setLoading(true);
            try {
                // 1. Fetch from Firebase
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data(), source: 'firebase' });

                    // Increment view count in background - robust guard with 5s cooldown
                    const now = Date.now();
                    const lastIncrement = sessionStorage.getItem(`last_inc_${id}`);

                    if (!hasIncrementedView.current && (!lastIncrement || now - parseInt(lastIncrement) > 5000)) {
                        hasIncrementedView.current = true;
                        sessionStorage.setItem(`last_inc_${id}`, now.toString());

                        try {
                            const docRefToUpdate = doc(db, 'products', id);
                            await updateDoc(docRefToUpdate, {
                                views: increment(1)
                            });
                        } catch (err) {
                            hasIncrementedView.current = false;
                            console.error("Error incrementing views:", err);
                        }
                    }
                } else {
                    console.error("Product not found");
                }

                // 2. Fetch related products from Firebase
                const productsCollectionRef = collection(db, 'products');
                const relSnapshot = await getDocs(productsCollectionRef);
                if (!relSnapshot.empty) {
                    const allProducts = relSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                    setRelatedProducts(allProducts.filter(p => p.id !== id).slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const scrollToContact = () => {
        navigate('/#contact');
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="container" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="loading-spinner" style={{ borderTopColor: '#0ea5e9' }}></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="error-page">
                <h2>Product not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb">
                    <Link to="/products-page">Product</Link> /
                    <span className="current">{product.title}</span>
                </div>

                <div className="detail-grid">
                    {/* Left: Product Image */}
                    <div className="detail-image-section animate-left">
                        <div ref={tiltRef} className="detail-image-wrapper">
                            <img src={product.image || 'https://via.placeholder.com/600'} alt={product.title} className="main-product-img" />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="detail-info-section animate-right">
                        <div className="info-header">
                            <h1 className="product-name">{product.title}</h1>
                            <p className="product-code">CODE: {product.code}</p>


                        </div>

                        <div className="info-body">
                            {/* Product Description */}
                            <p className="product-long-desc">
                                {product.fullDescription || product.description}
                            </p>

                            {/* Technical Use-Case Tags */}
                            <div className="ideal-sections">
                                {product.idealFor && product.idealFor.length > 0 && product.idealFor.map((item, idx) => (
                                    <div key={idx} className="ideal-tag">
                                        IDEAL FOR {item.toUpperCase()}
                                    </div>
                                ))}
                            </div>

                            {/* Inquiry Action Section */}
                            <div className="purchase-section">
                                <button className="btn btn-primary buy-btn" onClick={openContact}>Request Personalized Quote</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Relevant Product Suggestions */}
                <div className="related-products-section">
                    <h2 className="related-title">You may also like</h2>
                    <div className="related-grid">
                        {relatedProducts.map((rp) => (
                            <div key={rp.id} className="related-card" onClick={() => navigate(`/product/${rp.id}`)}>
                                <div className="related-image">
                                    <img src={rp.image} alt={rp.title} />
                                </div>
                                <div className="related-content">
                                    <h3>{rp.title}</h3>
                                    <p>{rp.description.substring(0, 60)}...</p>
                                    <span className="view-link">Know More →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
