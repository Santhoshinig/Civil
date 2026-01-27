import React, { useState, useEffect } from 'react';
import '../styles/BuildingScanner.css';

/**
 * BuildingScanner Component
 * 
 * Features:
 * 1. High-resolution building image
 * 2. Animated scanning laser line
 * 3. Conditional visibility of structural defects (cracks, seepage)
 */
const BuildingScanner = () => {
    const [scanPos, setScanPos] = useState(0);

    return (
        <div className="building-scanner-container">
            {/* Base Building Image */}
            <div className="image-layer base-image">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                    alt="Building Structure"
                />
            </div>

            {/* Defect Analysis Overlay - Revealed by Scan */}
            <div className="image-layer defect-layer">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                    alt="Defect Analysis"
                    style={{ filter: 'grayscale(1) brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)' }}
                />

                {/* SVG Defects */}
                <svg className="defects-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Crack 1 */}
                    <path className="defect-path crack" d="M30 20 L35 25 L32 30 L38 35 L34 40" stroke="var(--accent)" strokeWidth="0.5" fill="none" />
                    {/* Crack 2 */}
                    <path className="defect-path crack" d="M70 50 L75 55 L72 60 L78 65 L74 70" stroke="var(--accent)" strokeWidth="0.5" fill="none" />
                    {/* Seepage Area */}
                    <ellipse className="defect-path seepage" cx="50" cy="60" rx="10" ry="8" fill="rgba(0, 150, 255, 0.3)" />

                    {/* Defect Labels */}
                    <text x="32" y="18" className="defect-label" fill="var(--accent)" fontSize="2">CRACK DETECTED</text>
                    <text x="72" y="48" className="defect-label" fill="var(--accent)" fontSize="2">STRUCTURAL WEAKNESS</text>
                    <text x="50" y="50" className="defect-label" fill="#0096ff" fontSize="2" textAnchor="middle">SEEPAGE ZONE</text>
                </svg>
            </div>

            {/* Scanning Line */}
            <div className="scan-line">
                <div className="scan-glow"></div>
                <div className="scan-label">STRUCTURAL ANALYSIS IN PROGRESS...</div>
            </div>

            {/* Scanner Frame */}
            <div className="scanner-frame">
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
            </div>
        </div>
    );
};

export default BuildingScanner;
