import { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../../styles/LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setIsVisible(true);
        } else {
            // Wait for fade out animation
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 800); // fade out duration
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isVisible) return null;

    return (
        <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
            <div className="loading-content">
                <div className="lottie-container">
                    <DotLottieReact
                        src="https://lottie.host/71c9c79c-0811-4faf-915c-d7ffeda98cad/zUYhO4jSzr.lottie"
                        loop
                        autoplay
                        style={{ width: '300px', height: '300px' }}
                    />
                </div>

                <div className="loading-text-container">
                    <h2 className="loading-brand">CIVIL DOCTOR</h2>
                    <p className="loading-status">Loading...</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
