import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { uploadToCloudinary } from '../cloudinary/config';
import '../styles/Admin.css';

const BulkUpload = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [results, setResults] = useState(null);

    const handleCsvChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCsvFile(e.target.files[0]);
        }
    };

    const handleImagesChange = (e) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const parseCSV = (text) => {
        // Handle line endings and split rows
        const lines = text.split(/\r?\n/);

        // Regex to split by comma ONLY if it's not inside double quotes
        const csvRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

        const headers = lines[0].split(csvRegex).map(h =>
            h.trim().toLowerCase().replace(/^"|"$/g, '')
        );

        const products = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Split values using the same robust regex
            const values = line.split(csvRegex).map(v =>
                v.trim().replace(/^"|"$/g, '')
            );

            const product = {};

            headers.forEach((header, index) => {
                let value = values[index] || '';

                // Handle comma separated fields inside the app logic (semi-colon separated in CSV)
                const cleanHeader = header.replace(/\s/g, '');
                if (['tags', 'features', 'idealfor'].includes(cleanHeader)) {
                    product[cleanHeader === 'idealfor' ? 'idealFor' : cleanHeader] =
                        value ? value.split(';').map(t => t.trim()) : [];
                } else if (cleanHeader === 'fulldescription') {
                    product['fullDescription'] = value;
                } else {
                    product[header] = value;
                }
            });

            products.push(product);
        }
        return products;
    };

    const handleUpload = async () => {
        if (!csvFile) {
            alert('Please select a CSV file');
            return;
        }

        setLoading(true);
        setStatus('Reading CSV...');

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target.result;
                const products = parseCSV(text);

                setStatus(`Uploading ${imageFiles.length} images to Cloudinary...`);
                const imageUrlMap = {};

                for (const file of imageFiles) {
                    try {
                        const url = await uploadToCloudinary(file);
                        imageUrlMap[file.name] = url;
                    } catch (err) {
                        console.error(`Error uploading ${file.name}:`, err);
                    }
                }

                setStatus(`Saving ${products.length} products to Firestore...`);
                let successCount = 0;
                let errorCount = 0;
                let unmatchedImages = [];

                for (const product of products) {
                    try {
                        let matched = false;
                        // Match image from map if possible (Case-insensitive and robust matching)
                        const rawImageName = (product.image || product.filename || '').trim();

                        if (rawImageName) {
                            // 1. Direct match
                            if (imageUrlMap[rawImageName]) {
                                product.image = imageUrlMap[rawImageName];
                                matched = true;
                            } else {
                                // 2. Case-insensitive match or match without extension
                                const normalizedName = rawImageName.toLowerCase();
                                const matchedFile = Object.keys(imageUrlMap).find(filename => {
                                    const fn = filename.toLowerCase();
                                    return fn === normalizedName ||
                                        fn.split('.')[0] === normalizedName ||
                                        fn === normalizedName.split('.')[0];
                                });

                                if (matchedFile) {
                                    product.image = imageUrlMap[matchedFile];
                                    matched = true;
                                }
                            }
                        }

                        if (rawImageName && !matched) {
                            unmatchedImages.push(`${product.title} (${rawImageName})`);
                        }

                        // Clean up temp fields
                        delete product.filename;

                        // Ensure required fields
                        const finalProduct = {
                            title: product.title || 'Untitled Product',
                            code: product.code || `BULK-${Math.floor(Math.random() * 1000)}`,
                            description: product.description || '',
                            fullDescription: product.fullDescription || '',
                            tags: product.tags || [],
                            features: product.features || [],
                            idealFor: product.idealFor || [],
                            image: product.image || '',
                            views: 0,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        };

                        await addDoc(collection(db, 'products'), finalProduct);
                        successCount++;
                    } catch (err) {
                        console.error('Error saving product:', err);
                        errorCount++;
                    }
                }

                setResults({
                    success: successCount,
                    errors: errorCount,
                    unmatched: unmatchedImages
                });
                setStatus('Bulk upload complete!');
                setLoading(false);
            };
            reader.readAsText(csvFile);
        } catch (error) {
            console.error('Bulk upload error:', error);
            alert('Failed to process bulk upload');
            setLoading(false);
        }
    };

    return (
        <div className="bulk-upload-page">
            <div className="form-header">
                <button className="back-btn" onClick={() => navigate('/admin/products')}>
                    ← Back
                </button>
                <h1>Bulk Product Upload</h1>
                <p>Upload a CSV file and multiple images at once.</p>
            </div>

            <div className="bulk-upload-card">
                <div className="upload-instructions">
                    <h3>Instructions:</h3>
                    <ol>
                        <li>Prepare a CSV file with columns: <strong>title, code, description, fulldescription, tags, features, idealfor, image</strong></li>
                        <li>In the <strong>image</strong> column, specify the filename (e.g., product1.jpg).</li>
                        <li>Use semicolon (;) to separate items in tags, features, and idealfor columns.</li>
                        <li>Select the CSV file and all corresponding images below.</li>
                    </ol>
                </div>

                <div className="upload-sections-grid">
                    <div className="upload-box">
                        <label>1. Select CSV File</label>
                        <div className="file-input-wrapper">
                            <input type="file" accept=".csv" onChange={handleCsvChange} id="csv-upload" hidden />
                            <label htmlFor="csv-upload" className="custom-file-btn">
                                {csvFile ? csvFile.name : 'Choose CSV File'}
                            </label>
                        </div>
                    </div>

                    <div className="upload-box">
                        <label>2. Select Product Images</label>
                        <div className="file-input-wrapper">
                            <input type="file" multiple accept="image/*" onChange={handleImagesChange} id="images-upload" hidden />
                            <label htmlFor="images-upload" className="custom-file-btn">
                                {imageFiles.length > 0 ? `${imageFiles.length} images selected` : 'Choose Images'}
                            </label>
                        </div>
                    </div>
                </div>

                {status && <div className="upload-status">{status}</div>}

                {results && (
                    <div className="upload-results">
                        <div className="result-item success">
                            <span className="count">{results.success}</span>
                            <span className="label">Successfully Uploaded</span>
                        </div>
                        <div className="result-item error">
                            <span className="count">{results.errors}</span>
                            <span className="label">Failed</span>
                        </div>

                        {results.unmatched && results.unmatched.length > 0 && (
                            <div className="result-warning">
                                <h4>⚠️ {results.unmatched.length} Image Mismatches:</h4>
                                <p>The following products were uploaded but their images didn't match the files you selected:</p>
                                <ul>
                                    {results.unmatched.map((name, i) => (
                                        <li key={i}>{name}</li>
                                    ))}
                                </ul>
                                <p><small>Tip: Check if the filename in CSV matches your actual image filename (e.g. "image.jpg" vs "image.png")</small></p>
                            </div>
                        )}
                    </div>
                )}

                <div className="bulk-actions">
                    <button
                        className="submit-btn"
                        onClick={handleUpload}
                        disabled={loading || !csvFile}
                    >
                        {loading ? 'Processing...' : 'Start Bulk Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkUpload;
