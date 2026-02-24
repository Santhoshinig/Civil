import React, { useState, useEffect, useRef } from 'react';
import '../../styles/BuildingScanner.css';

/**
 * BuildingScanner Component
 * 
 * Features:
 * 1. Multiple before/after transformation animations
 * 2. Continuous scanning with multiple repair stages
 * 3. Damaged vs. Renovated visualization
 */
const BuildingScanner = () => {
    const [stage, setStage] = useState(0);
    const intervalRef = useRef(null);
    const stageRef = useRef(0);

    // Animation loops infinitely through all 3 stages - each shows ONCE per cycle
    useEffect(() => {
        // Only set up interval once
        if (intervalRef.current) {
            return;
        }

        intervalRef.current = setInterval(() => {
            stageRef.current = (stageRef.current + 1) % 3;
            setStage(stageRef.current);
        }, 4000); // 4 seconds per stage

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    // Array of before/after image pairs - Ordered: Ceiling → Floor → House
    const stages = [
        {
            before: '/cracked.jpg',
            after: '/renovated crack.png',
            label: 'CEILING REPAIR'
        },
        {
            before: '/fllor.png',
            after: '/renovated floor.png',
            label: 'FLOOR RESTORATION'
        },
        {
            before: '/Damaged Indian Home.png',
            after: '/Renovated Indian Home (1).png',
            label: 'HOUSE STRUCTURE'
        }
    ];

    const currentStage = stages[stage];

    return (
        <div className="building-scanner-container">
            {/* Base Building Image - Damaged (starts visible) */}
            <div className="image-layer base-image">
                <img
                    src={currentStage.before}
                    alt="Damaged"
                    style={{ filter: 'brightness(0.9) contrast(1.05)' }}
                />
            </div>

            {/* Perfect Building Overlay - Renovated Revealed by Scan */}
            <div className="image-layer perfect-layer" key={`perfect-${stage}`}>
                <img
                    src={currentStage.after}
                    alt="Renovated"
                />
            </div>

            {/* Scanning Line */}
            <div className="scan-line" key={`scan-${stage}`}>
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
