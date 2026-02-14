import React, { useState, useEffect } from 'react';
import '../styles/FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        let timeout;
        const handleScroll = () => {
            setScrolling(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setScrolling(false), 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <a
            href="https://wa.me/919688898230"
            className={`floating-whatsapp ${scrolling ? 'scrolling' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
        >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.89 9.886-.001 2.15.633 4.192 1.815 5.834l-1.104 4.036 4.149-1.086zm11.41-7.149c-.314-.157-1.86-.918-2.147-1.023-.289-.104-.499-.157-.709.157-.21.314-.811 1.023-.996 1.231-.184.21-.368.236-.682.079-.314-.157-1.328-.49-2.53-1.561-.936-.835-1.566-1.867-1.75-2.18-.184-.314-.02-.485.137-.641.141-.14.314-.368.471-.551.157-.184.21-.314.314-.525.105-.21.052-.394-.026-.551-.079-.157-.709-1.707-.971-2.337-.256-.612-.516-.529-.709-.539-.183-.01-.393-.012-.603-.012s-.551.079-.839.394c-.289.314-1.102 1.076-1.102 2.625s1.128 3.045 1.285 3.255c.158.21 2.221 3.391 5.381 4.755.752.325 1.339.519 1.797.665.755.239 1.442.205 1.984.124.605-.09 1.86-.761 2.122-1.496.262-.735.262-1.365.184-1.496-.079-.131-.289-.21-.603-.368z" /></svg>
        </a>
    );
};

export default FloatingWhatsApp;
