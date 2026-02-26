import React from 'react';
import '../../styles/ExpertConsultation.css';

const ExpertConsultation = () => {
    return (
        <div className="expert-consultation-card animate-slide-up">
            <div className="consultation-badge">
                <span className="pulse-dot"></span>
                PREMIUM DIAGNOSTIC SERVICE
            </div>

            <div className="consultation-content">
                <h3>Verified Expert Consultation</h3>
                <p>
                    Ensure structural integrity with a professional audit.
                    Get precise engineering reports and tailored solutions for your infrastructure.
                </p>
            </div>

            <div className="consultation-actions">
                <button className="consult-btn primary">
                    <span className="btn-icon">📋</span>
                    Schedule Site Visit
                </button>
                <button className="consult-btn secondary">
                    Get Diagnostic Report
                </button>
            </div>

            <div className="consultation-footer">
                <span className="verify-icon">🛡️</span>
                ISO Certified Engineering Standards
            </div>
        </div>
    );
};

export default ExpertConsultation;
