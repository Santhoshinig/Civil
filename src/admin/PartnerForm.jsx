import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { uploadToCloudinary } from '../cloudinary/config';
import '../styles/Admin.css';

const PartnerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [logoPreview, setLogoPreview] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        logo: ''
    });

    useEffect(() => {
        if (isEditing) {
            fetchPartner();
        }
    }, [id]);

    const fetchPartner = async () => {
        try {
            const docRef = doc(db, 'partners', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData(data);
                setLogoPreview(data.logo || '');
            } else {
                alert('Partner not found');
                navigate('/admin/partners');
            }
        } catch (error) {
            console.error('Error fetching partner:', error);
        }
    };

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await handleImageUpload(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            await handleImageUpload(e.target.files[0]);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setUploading(true);
        try {
            const localPreview = URL.createObjectURL(file);
            setLogoPreview(localPreview);

            const imageUrl = await uploadToCloudinary(file);
            setFormData(prev => ({ ...prev, logo: imageUrl }));
            setLogoPreview(imageUrl);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload logo.');
            setLogoPreview('');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' && !isEditing) {
            const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, name: value, slug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.slug) {
            alert('Please fill in partner name and slug');
            return;
        }

        setLoading(true);
        try {
            const partnerData = {
                ...formData,
                updatedAt: new Date().toISOString()
            };

            // Use slug as the document ID to maintain consistent relations with products
            await setDoc(doc(db, 'partners', formData.slug), partnerData);

            navigate('/admin/partners');
        } catch (error) {
            console.error('Error saving partner:', error);
            alert('Failed to save partner');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-page">
            <div className="form-header">
                <button className="back-btn" onClick={() => navigate('/admin/partners')}>
                    ← Back to Partners
                </button>
                <h1>{isEditing ? 'Edit Partner' : 'Add New Partner'}</h1>
            </div>

            <form className="product-form" style={{ maxWidth: '800px', margin: '0 auto' }} onSubmit={handleSubmit}>
                <div className="form-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                    <div className="form-left">
                        <div
                            className={`image-upload-zone ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            style={{ height: '200px' }}
                        >
                            {logoPreview ? (
                                <div className="image-preview" style={{ height: '100%', background: 'white', borderRadius: '12px' }}>
                                    <img src={logoPreview} alt="Logo Preview" style={{ objectFit: 'contain', padding: '10px' }} />
                                    <div className="preview-overlay">
                                        <label className="change-image-btn">
                                            📷 Change Logo
                                            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    {uploading ? (
                                        <div className="loading-spinner"></div>
                                    ) : (
                                        <>
                                            <span className="upload-icon">🖼️</span>
                                            <p>Partner Logo</p>
                                            <label className="browse-btn">Browse<input type="file" accept="image/*" onChange={handleFileChange} hidden /></label>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-right">
                        <div className="form-group">
                            <label>Partner Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Fosroc"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Partner Slug (ID)</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="e.g., fosroc"
                                disabled={isEditing}
                                required
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginTop: '4px' }}>
                                This slug is used to link products to this partner.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-actions" style={{ marginTop: '40px' }}>
                    <button type="button" className="cancel-btn" onClick={() => navigate('/admin/partners')}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading || uploading}>
                        {loading ? <span className="loading-spinner"></span> : (isEditing ? 'Update Partner' : 'Add Partner')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartnerForm;
