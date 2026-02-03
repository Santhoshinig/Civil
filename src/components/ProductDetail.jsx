import { useNavigate, useParams, Link } from 'react-router-dom';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';
=======
import { useEffect } from 'react';
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
import { productsData } from '../data/products';
import '../styles/ProductDetail.css';

/**
 * ProductDetail Component
 * 
 * Logic: Displays detailed information about a single product
<<<<<<< HEAD
 * Fetches from Firebase first, falls back to local data.
 * Increments view count on visit.
=======
 * Inspired by the Asian Paints clean, luxury aesthetic.
 * 
 * Layout Hierarchy: Name -> Price -> Description -> Ideal For -> Inquiry
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
 */
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
<<<<<<< HEAD
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Find related products (just using local data for now as fallback/mix)
    const relatedProducts = productsData.filter(p => p.id !== id).slice(0, 3);

=======
    const product = productsData.find(p => p.id === id);

    // Filter relevant products (excluding current one)
    const relatedProducts = productsData.filter(p => p.id !== id).slice(0, 3);

    // Scroll to top on mount or when product ID changes
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

<<<<<<< HEAD
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
=======
    if (!product) {
        return (
            <div className="error-page">
                <h2>Product not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078

    const scrollToContact = () => {
        navigate('/#contact');
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

<<<<<<< HEAD
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

=======
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb">
                    <Link to="/">Home</Link> /
<<<<<<< HEAD
                    <Link to="/products-page">Products</Link> /
=======
                    <Link to="/#products">Products</Link> /
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
                    <span className="current">{product.title}</span>
                </div>

                <div className="detail-grid">
                    {/* Left: Product Image */}
                    <div className="detail-image-section animate-left">
                        <div className="detail-image-wrapper">
<<<<<<< HEAD
                            <img src={product.image || 'https://via.placeholder.com/600'} alt={product.title} className="main-product-img" />
=======
                            <img src={product.image} alt={product.title} className="main-product-img" />
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="detail-info-section animate-right">
                        <div className="info-header">
<<<<<<< HEAD
                            <h1 className="product-name">{product.title}</h1>
                            <p className="product-code">CODE: {product.code}</p>
=======
                            <h1 className="product-name">{product.title.toLowerCase()}</h1>
                            <p className="product-code">COLOUR CODE: {product.code}</p>
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078

                            {/* Price positioned immediately after name per user request */}
                            <div className="price-top-display">
                                <span className="price-label">Price: </span>
<<<<<<< HEAD
                                <span className="price-amount">{product.price || 'Available on Request'}</span>
=======
                                <span className="price-amount">{product.price}</span>
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
                                <p className="tax-info">(Inclusive of all taxes)</p>
                            </div>
                        </div>

                        <div className="info-body">
                            {/* Product Description */}
                            <p className="product-long-desc">
<<<<<<< HEAD
                                {product.fullDescription || product.description}
=======
                                {product.fullDescription}
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
                            </p>

                            {/* Technical Use-Case Tags */}
                            <div className="ideal-sections">
<<<<<<< HEAD
                                {product.idealFor && product.idealFor.length > 0 && product.idealFor.map((item, idx) => (
=======
                                {product.idealFor.map((item, idx) => (
>>>>>>> 0d6cb52b6a91dcc7ab9c937f0ec50610c4c4e078
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
