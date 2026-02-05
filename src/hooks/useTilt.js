import { useEffect, useRef } from 'react';

/**
 * useTilt Hook
 * 
 * Adds a 3D perspective tilt effect to an element based on mouse position.
 * Perfectly mimics "real-time rendering" depth.
 */
const useTilt = () => {
    const elRef = useRef(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3; // Max 3 degrees for professional feel
            const rotateY = ((x - centerX) / centerX) * 3;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-10px)`;
            el.style.transition = 'transform 0.1s ease-out';
        };

        const handleMouseLeave = () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)`;
            el.style.transition = 'transform 0.5s ease-out';
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return elRef;
};

export default useTilt;
