import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';
import { productsData } from '../data/products';
import '../styles/ProductDetail.css';

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
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Find related products (just using local data for now as fallback/mix)
    const relatedProducts = productsData.filter(p => p.id !== id).slice(0, 3);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // 1. Check local static data first (fastest for legacy products)
                // Note: Admin created products will have different IDs not in this list
                const localProduct = productsData.find(p => p.id === id);

                if (localProduct) {
                    setProduct({ ...localProduct, source: 'local' });
                    setLoading(false);
                    return;
                }

                // 2. If not local, fetch from Firebase
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data(), source: 'firebase' });

                    // Increment view count in background
                    try {
                        await updateDoc(docRef, {
                            views: increment(1)
                        });
                    } catch (err) {
                        console.error("Error incrementing views:", err);
                    }
                } else {
                    console.error("Product not found in Local or Firebase");
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
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="container" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="loading-spinner" style={{ borderTopColor: '#f97316' }}></div>
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
                    <Link to="/">Home</Link> /
                    <Link to="/products-page">Products</Link> /
                    <span className="current">{product.title}</span>
                </div>

                <div className="detail-grid">
                    {/* Left: Product Image */}
                    <div className="detail-image-section animate-left">
                        <div className="detail-image-wrapper">
                            <img src={product.image || 'https://via.placeholder.com/600'} alt={product.title} className="main-product-img" />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="detail-info-section animate-right">
                        <div className="info-header">
                            <h1 className="product-name">{product.title}</h1>
                            <p className="product-code">CODE: {product.code}</p>

                            {/* Price positioned immediately after name per user request */}
                            <div className="price-top-display">
                                <span className="price-label">Price: </span>
                                <span className="price-amount">{product.price || 'Available on Request'}</span>
                                <p className="tax-info">(Inclusive of all taxes)</p>
                            </div>
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
                                <div className="purchase-card">
                                    <div className="quantity-selector">
                                        <label>Quantity</label>
                                        <select>
                                            <option>1 Unit</option>
                                            <option>5 Units</option>
                                            <option>Bulk Order</option>
                                        </select>
                                    </div>
                                    <div className="inquiry-hint">
                                        <p>Need a custom quote?</p>
                                    </div>
                                </div>
                                <button className="btn btn-primary buy-btn" onClick={scrollToContact}>Request Inquiry</button>
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
