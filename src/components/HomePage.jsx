import Navbar from './Navbar';
import Hero from './Hero';
import Overview from './Overview';
import Services from './Services';
import ProductsPreview from './ProductsPreview';
import Contact from './Contact';
import Footer from './Footer';

/**
 * HomePage Component
 * 
 * Logic: Combines all the landing page sections into a single view.
 */
const HomePage = ({ activeSection }) => {
    return (
        <div className="page-transition">
            <Hero />
            <Overview />
            <Contact />
        </div>
    );
};

export default HomePage;
