import { useState, useEffect } from 'react';
import '../styles/ProgressCap.css';

/**
 * ProgressCap Component
 * 
 * Floating mascot cap that moves based on page scroll progress
 * Travels from top to bottom as user scrolls through the page
 */
const ProgressCap = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate total scrollable height
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const totalScroll = documentHeight - windowHeight;

            // Calculate scroll progress as percentage
            const scrolled = window.scrollY;
            const progress = totalScroll > 0 ? (scrolled / totalScroll) * 100 : 0;

            setScrollProgress(progress);

            // Hide on first 100px (navbar area)
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate vertical position based on scroll progress
    // 10% = near top, 90% = near bottom
    const capPosition = 10 + (scrollProgress * 0.8);

    return (
        <>
            {isVisible && (
                <div 
                    className="progress-cap-container"
                    style={{ top: `${capPosition}%` }}
                >
                    <div className="cap-label">
                        {Math.round(scrollProgress)}%
                    </div>
                    <img 
                        src="/walking-cap.png" 
                        alt="Progress Cap" 
                        className="progress-cap-img"
                    />
                </div>
            )}
        </>
    );
};

export default ProgressCap;
