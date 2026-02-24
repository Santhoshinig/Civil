import React from 'react';
import '../../styles/ChemistryAnimation.css';

/**
 * ChemistryAnimation Component
 * 
 * Features:
 * 1. Self-drawing path animation (SVG dash-array)
 * 2. Morphing fluid surface (SVG keyframe transforms)
 * 3. Dynamic bubble particles
 * 
 * Logic: Uses recursive CSS animations to create a "living" laboratory icon.
 */
const ChemistryAnimation = () => {
    return (
        <div className="chemistry-animation-container">
            <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="chemistry-svg">
                {/* Defs for gradients and glow */}
                <defs>
                    <linearGradient id="fluid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent)" opacity="0.8" />
                        <stop offset="100%" stopColor="var(--primary-light)" opacity="0.6" />
                    </linearGradient>

                    <filter id="flask-glow">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Self-Drawing Flask Outline */}
                <path
                    className="flask-path"
                    d="M150 100 H250 V250 C250 250 350 280 350 400 C350 460 300 480 200 480 C100 480 50 460 50 400 C50 280 150 250 150 250 V100 Z"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#flask-glow)"
                />

                {/* Morphing Fluid */}
                <path
                    className="fluid-morph"
                    d="M155 300 C155 300 100 320 100 400 C100 450 150 470 200 470 C250 470 300 450 300 400 C300 320 245 300 245 300 Z"
                    fill="url(#fluid-gradient)"
                >
                    <animate
                        attributeName="d"
                        dur="2s"
                        repeatCount="indefinite"
                        values="
                            M155 300 C155 300 100 320 100 400 C100 450 150 470 200 470 C250 470 300 450 300 400 C300 320 245 300 245 300 Z;
                            M155 320 C155 320 110 340 110 400 C110 440 160 460 210 460 C260 460 290 440 290 400 C290 340 245 320 245 320 Z;
                            M155 300 C155 300 100 320 100 400 C100 450 150 470 200 470 C250 470 300 450 300 400 C300 320 245 300 245 300 Z
                        "
                    />
                </path>

                {/* Rising Bubbles */}
                <circle className="bubble b1" cx="180" cy="400" r="5" fill="white" />
                <circle className="bubble b2" cx="220" cy="420" r="3" fill="white" />
                <circle className="bubble b3" cx="200" cy="380" r="4" fill="white" />
                <circle className="bubble b4" cx="160" cy="430" r="2" fill="white" />
                <circle className="bubble b5" cx="240" cy="390" r="3" fill="white" />
            </svg>

            {/* Visual Flare */}
            <div className="animation-flare"></div>
        </div>
    );
};

export default ChemistryAnimation;
