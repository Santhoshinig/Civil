import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesData } from './Services';
import '../styles/Services.css';
import { useContact } from '../context/ContactContext';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { openContact } = useContact();

    // Find the service in the data array
    const service = servicesData.find(s => s.id === serviceId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [serviceId]);

    if (!service) {
        return (
            <div className="container page-transition" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Service Not Found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/services')}>Back to Services</button>
            </div>
        );
    }

    return (
        <div className="service-detail-page page-transition">
            <div className="service-hero" style={{
                position: 'relative',
                height: '250px',
                overflow: 'hidden',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${service.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                marginTop: '-80px'
            }}>
                <div className="container" style={{ paddingTop: '60px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{service.title}</h1>
                    <div className="modal-divider" style={{ background: 'var(--secondary)', width: '50px', height: '3px', margin: '0 auto' }}></div>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 0' }}>
                <div className="service-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
                    <div className="service-main-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <div className="service-icon-large" style={{
                                width: '50px',
                                height: '50px',
                                background: 'var(--light)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)',
                                boxShadow: 'var(--shadow-sm)',
                                flexShrink: 0
                            }}>
                                {service.icon}
                            </div>
                            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: 0 }}>Expert {service.title}</h2>
                        </div>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#444', marginBottom: '40px' }}>
                            {service.fullDescription}
                        </p>

                        <div className="service-features-highlight" style={{
                            background: '#f8fafc',
                            padding: '40px',
                            borderRadius: '30px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h3 style={{ marginBottom: '25px', color: 'var(--primary)', fontSize: '1.4rem' }}>Our Specialized Solutions</h3>
                            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', listStyle: 'none', padding: 0 }}>
                                {service.subServices.map((sub, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#334155' }}>
                                        <span style={{
                                            width: '24px',
                                            height: '24px',
                                            background: 'var(--secondary)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.8rem'
                                        }}>✓</span>
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="service-sidebar" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="contact-card-sidebar" style={{
                            background: 'var(--primary)',
                            padding: '40px',
                            borderRadius: '30px',
                            color: 'white',
                            height: 'fit-content',
                            boxShadow: '0 20px 40px rgba(5, 25, 35, 0.2)',
                            width: '100%'
                        }}>
                            <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Need a Consultation?</h3>
                            <p style={{ marginBottom: '30px', opacity: 0.9, lineHeight: '1.6' }}>
                                Request a site visit from our technical experts for a precise structural diagnosis.
                            </p>
                            <button className="btn" style={{
                                background: 'white',
                                color: 'var(--primary)',
                                width: '100%',
                                border: 'none',
                                padding: '15px',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }} onClick={openContact}>
                                Contact Us Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Services Recommendations */}
            <div style={{ background: '#f8fafc', padding: '60px 0', borderTop: '1px solid #e2e8f0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '10px' }}>Explore Other Services</h2>
                    </div>

                    <div className="services-grid" style={{
                        gap: '25px',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {servicesData
                            .filter(s => s.id !== serviceId)
                            .slice(0, 3)
                            .map((otherService) => (
                                <div
                                    key={otherService.id}
                                    className="service-card"
                                    style={{
                                        cursor: 'pointer',
                                        background: 'white',
                                        opacity: 1,
                                        transform: 'none',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    onClick={() => navigate(`/service/${otherService.id}`)}
                                >
                                    <div className="service-image-container" style={{ height: '180px' }}>
                                        <img src={otherService.image} alt={otherService.title} className="service-card-image" style={{ height: '100%', objectFit: 'cover' }} />
                                        <div className="service-icon-overlay" style={{ width: '40px', height: '40px' }}>{otherService.icon}</div>
                                    </div>
                                    <div className="service-card-body" style={{ flex: 1, padding: '20px' }}>
                                        <h3 className="service-title" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{otherService.title}</h3>
                                        <p className="service-description" style={{ fontSize: '0.9rem', marginBottom: '15px', color: '#64748b' }}>{otherService.description}</p>
                                        <span className="service-link" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Know More →</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
