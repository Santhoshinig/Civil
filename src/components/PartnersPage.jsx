import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/PartnersPage.css';

const PartnersPage = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'partners'));
                const partnersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Fallback to initial partners if collection is empty
                if (partnersData.length === 0) {
                    const fallback = [
                        { id: 'ardex', name: 'Ardex Endura', logo: '/partners/ardex endura.svg' },
                        { id: 'fosroc', name: 'Fosroc', logo: '/partners/fosroc.svg' },
                        { id: 'myk', name: 'MYK Laticrete', logo: '/partners/MYK-L-Logo-1-2.svg' },
                        { id: 'ramco', name: 'Ramco Cements', logo: '/partners/the_ramco_cements_limited_logo.jpg' },
                        { id: 'allied', name: 'Allied', logo: '/partners/allied.svg' }
                    ];
                    setPartners(fallback);
                } else {
                    setPartners(partnersData);
                }
            } catch (error) {
                console.error("Error fetching partners:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPartners();
    }, []);

    const handlePartnerClick = (id) => {
        navigate(`/products-page?partner=${id}`);
    };

    if (loading) return <div className="partners-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div className="loading-spinner large"></div></div>;

    return (
        <section className="partners-page">
            <div className="container">
                <div className="partners-grid-v2">
                    {partners.map((partner, index) => (
                        <div
                            key={partner.id}
                            className="partner-card-v2"
                            onClick={() => handlePartnerClick(partner.id)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="partner-logo-box">
                                <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                            </div>
                            <h3 className="partner-name">{partner.name}</h3>
                            <button className="partner-view-btn">
                                View Products →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersPage;
