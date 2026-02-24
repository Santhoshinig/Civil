import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Overview from '../components/Overview';
import Services from '../components/Services';
import ProductsPreview from '../components/ProductsPreview';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import Clients from '../components/Clients';

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
            <Services />
            <ProductsPreview />
            <Clients />
            <Contact />
        </div>
    );
};

export default HomePage;
