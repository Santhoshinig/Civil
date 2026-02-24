import React from 'react';
import '../../styles/ConstructionAnimation.css';

/**
 * ConstructionAnimation Component
 * 
 * Features:
 * 1. Self-drawing path animation of a building/structure
 * 2. Scanning light effect (representing inspection/quality)
 * 3. Floating maintenance icons
 */
const ConstructionAnimation = () => {
    return (
        <div className="construction-animation-container">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="construction-svg">
                <defs>
                    <linearGradient id="build-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--secondary)" opacity="0.8" />
                        <stop offset="100%" stopColor="var(--primary-light)" opacity="0.6" />
                    </linearGradient>

                    <filter id="build-glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Building Silhouette */}
                <path
                    className="build-path"
                    d="M100 350 V150 L150 100 L200 150 V100 L250 50 L300 100 V350 H100 Z"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#build-glow)"
                />

                {/* Ground Line */}
                <line x1="50" y1="350" x2="350" y2="350" stroke="white" strokeWidth="2" strokeDasharray="5 5" />

                {/* Scanning Light */}
                <rect className="scan-bar" x="80" y="100" width="240" height="2" fill="var(--accent)" opacity="0.5" />

                {/* Abstract Structural Elements */}
                <circle className="element e1" cx="150" cy="200" r="4" fill="var(--secondary)" />
                <circle className="element e2" cx="250" cy="250" r="4" fill="var(--accent)" />
                <circle className="element e3" cx="200" cy="300" r="4" fill="var(--secondary)" />
            </svg>

            {/* Visual Flare */}
            <div className="construction-flare"></div>
        </div>
    );
};

export default ConstructionAnimation;
