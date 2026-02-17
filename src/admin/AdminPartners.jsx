import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/Admin.css';

const AdminPartners = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'partners'));
            let partnersData = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            // Seed initial data if empty
            if (partnersData.length === 0) {
                const initialPartners = [
                    { slug: 'ardex', name: 'Ardex Endura', logo: '/partners/ardex endura.svg' },
                    { slug: 'fosroc', name: 'Fosroc', logo: '/partners/fosroc.svg' },
                    { slug: 'myk', name: 'MYK Laticrete', logo: '/partners/MYK-L-Logo-1-2.svg' },
                    { slug: 'ramco', name: 'Ramco Cements', logo: '/partners/the_ramco_cements_limited_logo.jpg' },
                    { slug: 'allied', name: 'Allied', logo: '/partners/allied.svg' }
                ];

                for (const p of initialPartners) {
                    await setDoc(doc(db, 'partners', p.slug), {
                        name: p.name,
                        slug: p.slug,
                        logo: p.logo,
                        updatedAt: new Date().toISOString()
                    });
                }

                // Refresh data
                const refreshSnapshot = await getDocs(collection(db, 'partners'));
                partnersData = refreshSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
            }

            setPartners(partnersData);
        } catch (error) {
            console.error("Error fetching partners:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePartner = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this partner? Products associated with this partner will no longer be visible under their category.')) {
            try {
                await deleteDoc(doc(db, 'partners', id));
                setPartners(partners.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error deleting partner:", error);
                alert("Failed to delete partner");
            }
        }
    };

    if (loading) return <div className="admin-loading">Loading Partners...</div>;

    return (
        <div className="admin-partners">
            <div className="dashboard-header">
                <div className="header-title-area">
                    <h1>Partner Management</h1>
                    <p>Add or manage partners and their products</p>
                </div>
                <div className="dashboard-actions">
                    <button className="add-product-btn" onClick={() => navigate('/admin/partners/new')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add New Partner
                    </button>
                </div>
            </div>

            <div className="partners-grid-admin">
                {partners.map((partner) => (
                    <div
                        key={partner.id}
                        className="partner-card-admin"
                        onClick={() => navigate(`/admin/partners/${partner.id}/products`)}
                    >
                        <div className="partner-logo-box">
                            <img src={partner.logo} alt={partner.name} />
                        </div>
                        <div className="partner-info-admin">
                            <h3>{partner.name}</h3>
                            <div className="partner-card-actions">
                                <button className="manage-btn">Manage Products →</button>
                                <div className="mini-actions" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="edit-icon-btn"
                                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/partners/edit/${partner.id}`); }}
                                        title="Edit Partner"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    </button>
                                    <button
                                        className="delete-icon-btn"
                                        onClick={(e) => handleDeletePartner(e, partner.id)}
                                        title="Delete Partner"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPartners;
