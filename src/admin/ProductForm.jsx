/**
 * Product Form Component
 * Add/Edit product with drag & drop image upload
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { uploadToCloudinary } from '../cloudinary/config';
import '../styles/Admin.css';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        code: '',
        description: '',
        fullDescription: '',
        tags: [],
        features: [],
        idealFor: [],
        shades: ['#e2e8f0', '#94a3b8', '#475569', '#1e293b'],
        image: '',
        views: 0
    });

    const [tagInput, setTagInput] = useState('');
    const [featureInput, setFeatureInput] = useState('');
    const [idealForInput, setIdealForInput] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const docRef = doc(db, 'products', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData(data);
                setImagePreview(data.image || '');
            } else {
                alert('Product not found');
                navigate('/admin/products');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    // Drag and Drop Handlers
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
            // Show local preview immediately
            const localPreview = URL.createObjectURL(file);
            setImagePreview(localPreview);

            // Upload to Cloudinary
            const imageUrl = await uploadToCloudinary(file);

            setFormData(prev => ({ ...prev, image: imageUrl }));
            setImagePreview(imageUrl);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
            setImagePreview('');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const addFeature = () => {
        if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
            setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
            setFeatureInput('');
        }
    };

    const removeFeature = (feature) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter(f => f !== feature) }));
    };

    const addIdealFor = () => {
        if (idealForInput.trim() && !formData.idealFor.includes(idealForInput.trim())) {
            setFormData(prev => ({ ...prev, idealFor: [...prev.idealFor, idealForInput.trim()] }));
            setIdealForInput('');
        }
    };

    const removeIdealFor = (item) => {
        setFormData(prev => ({ ...prev, idealFor: prev.idealFor.filter(i => i !== item) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.code) {
            alert('Please fill in title and code');
            return;
        }

        setLoading(true);

        try {
            const productData = {
                ...formData,
                updatedAt: new Date().toISOString()
            };

            if (isEditing) {
                await setDoc(doc(db, 'products', id), productData);
            } else {
                productData.createdAt = new Date().toISOString();
                productData.views = 0;
                await addDoc(collection(db, 'products'), productData);
            }

            navigate('/admin/products');
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-page">
            <div className="form-header">
                <button className="back-btn" onClick={() => navigate('/admin/products')}>
                    ← Back
                </button>
                <h1>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
            </div>

            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Left Column - Image Upload */}
                    <div className="form-left">
                        <div
                            className={`image-upload-zone ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {imagePreview ? (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Preview" />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => {
                                            setImagePreview('');
                                            setFormData(prev => ({ ...prev, image: '' }));
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    {uploading ? (
                                        <>
                                            <div className="loading-spinner"></div>
                                            <p>Uploading...</p>
                                        </>
                                    ) : (
                                        <>
                                            <span className="upload-icon">📁</span>
                                            <p>Drag & drop image here</p>
                                            <span>or</span>
                                            <label className="browse-btn">
                                                Browse Files
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    hidden
                                                />
                                            </label>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Form Fields */}
                    <div className="form-right">
                        <div className="form-group">
                            <label>Product Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Construction Chemicals"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Product Code *</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="e.g., CC-001"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Short Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Brief product description..."
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label>Full Description</label>
                            <textarea
                                name="fullDescription"
                                value={formData.fullDescription}
                                onChange={handleChange}
                                placeholder="Detailed product description..."
                                rows={5}
                            />
                        </div>



                        {/* Tags */}
                        <div className="form-group">
                            <label>Tags</label>
                            <div className="tag-input-wrapper">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add tag..."
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                />
                                <button type="button" onClick={addTag}>Add</button>
                            </div>
                            <div className="tags-list">
                                {formData.tags.map((tag, i) => (
                                    <span key={i} className="form-tag">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)}>✕</button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="form-group">
                            <label>Features</label>
                            <div className="tag-input-wrapper">
                                <input
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    placeholder="Add feature..."
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                />
                                <button type="button" onClick={addFeature}>Add</button>
                            </div>
                            <div className="tags-list">
                                {formData.features.map((feature, i) => (
                                    <span key={i} className="form-tag feature">
                                        {feature}
                                        <button type="button" onClick={() => removeFeature(feature)}>✕</button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Ideal For */}
                        <div className="form-group">
                            <label>Ideal For</label>
                            <div className="tag-input-wrapper">
                                <input
                                    type="text"
                                    value={idealForInput}
                                    onChange={(e) => setIdealForInput(e.target.value)}
                                    placeholder="Add use case..."
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIdealFor())}
                                />
                                <button type="button" onClick={addIdealFor}>Add</button>
                            </div>
                            <div className="tags-list">
                                {formData.idealFor.map((item, i) => (
                                    <span key={i} className="form-tag ideal">
                                        {item}
                                        <button type="button" onClick={() => removeIdealFor(item)}>✕</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate('/admin/products')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading || uploading}
                    >
                        {loading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            isEditing ? 'Update Product' : 'Add Product'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
