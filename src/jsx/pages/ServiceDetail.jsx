import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { servicesData } from '../components/Services';
import '../../styles/Services.css';
import { useContact } from '../context/ContactContext';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { openContact } = useContact();

    // Find the service in the data array
    const service = servicesData.find(s => s.id === serviceId);

    // State for randomized suggestions
    const [suggestedServices, setSuggestedServices] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Randomize suggestions
        if (serviceId) {
            const others = servicesData.filter(s => s.id !== serviceId);
            const shuffled = [...others].sort(() => 0.5 - Math.random());
            setSuggestedServices(shuffled.slice(0, 3));
        }
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
                height: '320px',
                overflow: 'hidden',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${service.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
            }}>
                <div className="breadcrumb">
                    <Link to="/services">Services</Link>
                    <span style={{ opacity: 0.5 }}>/</span>
                    <span style={{ fontWeight: '600', color: 'white' }}>{service.title}</span>
                </div>
                <div className="container">
                    <h1 style={{ fontSize: 'min(3rem, 8vw)', fontWeight: '800', marginBottom: '0', lineHeight: '1.2' }}>{service.title}</h1>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <div className="service-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
                    {/* LEFT COLUMN */}
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
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444', marginBottom: '30px', whiteSpace: 'pre-line' }}>
                            {service.fullDescription}
                        </p>

                        {/* Expertise Areas */}
                        {service.expertiseAreas && (
                            <div style={{ marginBottom: '35px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px', letterSpacing: '0.5px' }}>
                                    Our Expertise Solutions In
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {service.expertiseAreas.map((area, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1rem', color: '#334155', lineHeight: '1.6' }}>
                                            <span style={{
                                                minWidth: '8px', height: '8px', marginTop: '7px',
                                                background: 'var(--primary)', borderRadius: '50%', display: 'inline-block'
                                            }}></span>
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                    <div className="service-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {/* We Also Expertise In - Moved to Sidebar */}
                        <div className="service-features-highlight" style={{
                            background: '#f8fafc',
                            padding: '30px',
                            borderRadius: '24px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h3 style={{ marginBottom: '20px', color: 'var(--primary)', fontSize: '1.3rem' }}>We Also Expertise In</h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', listStyle: 'none', padding: 0 }}>
                                {service.subServices.map((sub, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1rem', color: '#334155', lineHeight: '1.4' }}>
                                        <span style={{
                                            minWidth: '22px',
                                            height: '22px',
                                            background: 'var(--secondary)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            flexShrink: 0,
                                            marginTop: '2px'
                                        }}>✓</span>
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        </div>

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
                        gap: '30px',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
                    }}>
                        {suggestedServices.map((otherService) => (
                            <div
                                key={otherService.id}
                                className="service-card visible"
                                style={{
                                    cursor: 'pointer',
                                    background: 'white',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid #eef2f6'
                                }}
                                onClick={() => navigate(`/service/${otherService.id}`)}
                            >
                                <div className="service-image-container" style={{ height: '160px', position: 'relative' }}>
                                    <img src={otherService.image} alt={otherService.title} className="service-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div className="service-icon-overlay" style={{
                                        position: 'absolute',
                                        bottom: '-15px',
                                        right: '15px',
                                        width: '40px',
                                        height: '40px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 'var(--shadow-md)'
                                    }}>
                                        {otherService.icon}
                                    </div>
                                </div>
                                <div className="service-card-body" style={{
                                    padding: '25px 20px 20px',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    alignItems: 'flex-start'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '700',
                                        color: 'var(--primary)',
                                        marginBottom: '10px',
                                        lineHeight: '1.3',
                                        minHeight: '2.6em',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {otherService.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        marginBottom: '20px',
                                        color: '#64748b',
                                        lineHeight: '1.6',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '3',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        flex: 1
                                    }}>
                                        {otherService.description}
                                    </p>
                                    <span className="service-link" style={{
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '8px 18px',
                                        borderRadius: '50px',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        Know More →
                                    </span>
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
