import { useState, useEffect, useRef } from 'react';
import '../../styles/Contact.css';

/**
 * Contact Component
 * 
 * Handles inquiry submission and provides physical/digital 
 * points of contact.
 */
const Contact = () => {
    const contactRef = useRef(null);

    // Controlled Internal Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    // UI state for success messaging
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        /**
         * Slide-in animation listener
         */
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = contactRef.current?.querySelectorAll('.animate-slide-left, .animate-slide-right');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    /**
     * Controlled Input Handler
     */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Submission Handling Logic
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate API Call Success
        console.log('Inquiry Data Sent:', formData);
        setIsSubmitted(true);

        // Automatic Form Reset after a delay
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
        }, 5000);
    };

    return (
        <section id="contact" className="contact-section" ref={contactRef}>
            <div className="container">
                {/* Context Heading */}
                <div className="section-header">
                    <h2 className="section-title">Contact Us</h2>
                    <p className="section-subtitle">
                        Get in touch with our team for inquiries, quotes, or support
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Action Side: Inquiry Form */}
                    <div className="contact-form-wrapper animate-slide-left">
                        <form
                            className={`contact-form ${isSubmitted ? 'hidden' : ''}`}
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Full Name <span className="required-star">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address <span className="required-star">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="your.email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number <span className="required-star">*</span></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message <span className="required-star">*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="5"
                                    placeholder="Tell us about your requirements..."
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-full">
                                Send Message
                            </button>
                        </form>

                        {/* Post-Success State Overlay */}
                        <div className={`form-success ${isSubmitted ? 'active' : ''}`}>
                            <div className="success-icon">✓</div>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                        </div>
                    </div>

                    {/* Info Side: Company Identifiers */}
                    <div className="contact-info animate-slide-right">
                        {/* Location Link/Address */}
                        <div className="info-card">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h3>Our Location</h3>
                                <p>
                                    No. 50, Suramangalam Main Rd,
                                    <br />
                                    Sundaram Colony, Meyyanur,
                                    <br />
                                    Salem, Tamil Nadu 636004
                                </p>
                            </div>
                        </div>

                        {/* Telephone Lines */}
                        <div className="info-card">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h3>Phone</h3>
                                <p>+91-96888 98230</p>
                                <p>+91-91590 40422</p>
                            </div>
                        </div>

                        {/* Digital Correspondence */}
                        <div className="info-card">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h3>Email</h3>
                                <p>civildoctorslm@gmail.com</p>
                            </div>
                        </div>

                        {/* Availability Tracker */}
                        <div className="info-card">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h3>Business Hours</h3>
                                <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
