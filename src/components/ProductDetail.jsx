import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { productsData } from '../data/products';
import '../styles/ProductDetail.css';

/**
 * ProductDetail Component
 * 
 * Logic: Displays detailed information about a single product
 * Inspired by the Asian Paints clean, luxury aesthetic.
 * 
 * Layout Hierarchy: Name -> Price -> Description -> Ideal For -> Inquiry
 */
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = productsData.find(p => p.id === id);

    // Filter relevant products (excluding current one)
    const relatedProducts = productsData.filter(p => p.id !== id).slice(0, 3);

    // Scroll to top on mount or when product ID changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    if (!product) {
        return (
            <div className="error-page">
                <h2>Product not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    const scrollToContact = () => {
        navigate('/#contact');
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb">
                    <Link to="/">Home</Link> /
                    <Link to="/#products">Products</Link> /
                    <span className="current">{product.title}</span>
                </div>

                <div className="detail-grid">
                    {/* Left: Product Image */}
                    <div className="detail-image-section animate-left">
                        <div className="detail-image-wrapper">
                            <img src={product.image} alt={product.title} className="main-product-img" />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="detail-info-section animate-right">
                        <div className="info-header">
                            <h1 className="product-name">{product.title.toLowerCase()}</h1>
                            <p className="product-code">COLOUR CODE: {product.code}</p>

                            {/* Price positioned immediately after name per user request */}
                            <div className="price-top-display">
                                <span className="price-label">Price: </span>
                                <span className="price-amount">{product.price}</span>
                                <p className="tax-info">(Inclusive of all taxes)</p>
                            </div>
                        </div>

                        <div className="info-body">
                            {/* Product Description */}
                            <p className="product-long-desc">
                                {product.fullDescription}
                            </p>

                            {/* Technical Use-Case Tags */}
                            <div className="ideal-sections">
                                {product.idealFor.map((item, idx) => (
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
