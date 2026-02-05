import { useEffect, useState } from 'react';

/**
 * CustomCursor Component
 * 
 * Logic: Follows the mouse with a delay (lerp) to create a smooth, 
 * high-fidelity trailing effect. Reacts to links/buttons.
 */
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // diverse checks for touch capability
        const checkIsMobile = () => {
            return (
                window.matchMedia('(pointer: coarse)').matches ||
                window.matchMedia('(hover: none)').matches ||
                navigator.maxTouchPoints > 0
            );
        };
        setIsMobile(checkIsMobile());
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (isHidden) setIsHidden(false);

            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.classList.contains('service-link') ||
                target.classList.contains('product-card') ||
                target.closest('button') ||
                target.closest('a');

            setIsPointer(isClickable);
        };

        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isHidden, isMobile]);

    if (isMobile) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: isPointer ? '60px' : '20px',
                height: isPointer ? '60px' : '20px',
                backgroundColor: isPointer ? 'rgba(249, 115, 22, 0.15)' : 'rgba(251, 146, 60, 0.4)',
                border: isPointer ? '2px solid var(--secondary)' : 'none',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                transform: `translate(${position.x - (isPointer ? 30 : 10)}px, ${position.y - (isPointer ? 30 : 10)}px)`,
                transition: 'width 0.3s, height 0.3s, background-color 0.3s, border 0.3s, transform 0.1s ease-out',
                opacity: isHidden ? 0 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: isPointer ? 'blur(4px)' : 'none'
            }}
        >
            {isPointer && <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '10px' }}>VIEW</div>}
        </div>
    );
};

export default CustomCursor;
