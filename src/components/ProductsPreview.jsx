import { useNavigate } from 'react-router-dom';
import '../styles/ProductsPreview.css';

/**
 * ProductsPreview Component
 * 
 * Shows a preview image of all products on the home page
 * with a button to navigate to the full products page
 */
const ProductsPreview = () => {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate('/products-page');
        // Scroll to top immediately
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

    return (
        <section className="products-preview-section" id="products">
            <div className="container">
                <div className="preview-content">
                    <div className="preview-image">
                        <img src="/products.png" alt="Our Products" />
                    </div>

                    <div className="preview-text">
                        <h2>Explore Our Products</h2>
                        <p>Discover our comprehensive range of premium chemical products designed for diverse industrial applications and solutions.</p>
                        <button className="explore-btn" onClick={handleExplore}>
                            Explore Our Products
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsPreview;
