import Services from '../components/Services';
import { useEffect } from 'react';

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="services-page-wrapper page-transition">
            <Services />
        </div>
    );
};

export default ServicesPage;
