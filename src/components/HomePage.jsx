import Navbar from './Navbar';
import Hero from './Hero';
import Overview from './Overview';
import Services from './Services';
import Products from './Products';
import Contact from './Contact';
import Footer from './Footer';

/**
 * HomePage Component
 * 
 * Logic: Combines all the landing page sections into a single view.
 */
const HomePage = ({ activeSection }) => {
    return (
        <>
            <Hero />
            <Overview />
            <Services />
            <Products />
            <Contact />
        </>
    );
};

export default HomePage;
