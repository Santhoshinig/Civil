import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../../styles/HeroTrustCards.css';

const HeroTrustCards = () => {
    return (
        <div className="hero-trust-cards animate-slide-up">
            {/* Card 1: Join Our Community */}
            <div className="trust-card join-community-card">
                <div className="card-header">
                    <div className="card-icon-box orange">
                        <span className="icon">👥</span>
                    </div>
                    <div className="card-titles">
                        <h3>Join Our Community</h3>
                    </div>
                </div>
                <p className="card-description">
                    Connect with fellow homeowners, get expert tips, and stay updated with the latest building solutions and offers.
                </p>

                <div className="card-visual community-visual">
                    <div className="community-avatars-circle">
                        {/* Circle of avatars with center animation */}
                        <div className="avatars-ring">
                            <div className="avatar thumb1"></div>
                            <div className="avatar thumb2"></div>
                            <div className="avatar thumb3"></div>
                            <div className="avatar thumb4"></div>
                            <div className="avatar thumb5"></div>
                        </div>
                        <div className="center-lottie">
                            <DotLottieReact
                                src="https://lottie.host/98c51f33-6625-4c01-8e05-64e05f0a07e0/A08r65XkFv.lottie"
                                loop
                                autoplay
                            />
                        </div>
                    </div>
                </div>

                <a href="https://chat.whatsapp.com/G5g27K2V5Z5J5z5Z5z5Z5Z" target="_blank" rel="noopener noreferrer" className="card-btn orange-btn">
                    <span>👤+ Join Community</span>
                    <span className="arrow">→</span>
                </a>
            </div>

            {/* Card 2: Get Expert Support */}
            <div className="trust-card expert-support-card">
                <div className="card-header">
                    <div className="card-icon-box yellow">
                        <span className="icon">🎧</span>
                    </div>
                    <div className="card-titles">
                        <h3>Get Expert Support</h3>
                    </div>
                </div>
                <p className="card-description">
                    Have questions about your project? Our specialists are here to help with personalized guidance and solutions.
                </p>

                <div className="support-schedule">
                    <span className="clock-icon">🕒</span>
                    <span>Mon - Sat, 9:30 AM - 7:30 PM</span>
                </div>

                <div className="card-visual expert-visual">
                    <div className="expert-avatar-box">
                        <DotLottieReact
                            src="https://lottie.host/6e0f316b-191d-4054-95e2-63251c6c9a38/7xI8D8S9z8.json"
                            loop
                            autoplay
                        />
                    </div>
                </div>

                <a href="https://wa.me/919688898230" target="_blank" rel="noopener noreferrer" className="card-btn whatsapp-btn">
                    <span className="link-content">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.764-5.766zm3.392 8.221c-.142.399-.715.746-1.02.788-.228.031-.525.053-1.503-.339-.512-.204-1.096-.462-1.742-1.037-.646-.576-1.121-1.166-1.428-1.531-.132-.158-.034-.243.085-.373l.366-.4c.108-.119.141-.186.208-.314.067-.127.034-.237-.017-.339-.051-.102-.457-1.101-.626-1.508-.165-.399-.335-.344-.459-.351-.122-.007-.263-.008-.406-.008-.143 0-.376.054-.572.261-.196.207-.751.733-.751 1.787 0 1.054.767 2.074.873 2.221.106.147 1.503 2.298 3.642 3.22.508.219.905.35 1.215.449.51.161.974.138 1.341.083.409-.061 1.256-.513 1.432-1.008.176-.496.176-.921.124-1.008-.052-.087-.19-.138-.431-.259z" />
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964 1-.3.614-2.22c-.666-1.055-1.017-2.277-1.015-3.535.004-3.738 3.041-6.776 6.782-6.776 1.812.001 3.515.707 4.795 1.989 1.279 1.281 1.984 2.986 1.983 4.797-.005 3.738-3.042 6.775-6.784 6.775z" />
                        </svg>
                        Chat on WhatsApp
                    </span>
                    <div className="notification-badge">
                        <DotLottieReact
                            src="https://lottie.host/80404434-2e90-4131-a2c9-dd149ec4731a/U8f3N83vH8.lottie"
                            loop
                            autoplay
                        />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default HeroTrustCards;
