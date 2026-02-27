import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/**
 * BackgroundLottie Component
 * Renders a full-screen, subtle Lottie construction animation as a fixed background.
 */
const BackgroundLottie = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                opacity: 0.03,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <DotLottieReact
                src="https://lottie.host/f6f07b81-2e4a-4260-b0a4-abe524f2a011/YiXiaf2B1D.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default BackgroundLottie;
