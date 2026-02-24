import { useState } from 'react';
import { useContact } from '../context/ContactContext';
import '../../styles/ContactModal.css';
import '../../styles/Contact.css'; // Reusing form styles

const ContactModal = () => {
    const { isContactOpen, closeContact } = useContact();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isContactOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Inquiry Data Sent:', formData);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
            closeContact();
        }, 3000);
    };

    return (
        <div className="contact-modal-overlay" onClick={closeContact}>
            <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeContact}>×</button>

                <div className="contact-modal-header">
                    <h2 className="contact-modal-title">Contact Us</h2>
                    <p className="contact-modal-subtitle">We'd love to hear from you!</p>
                </div>

                {isSubmitted ? (
                    <div className="form-success active" style={{ display: 'block' }}>
                        <div className="success-icon">✓</div>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully.</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="modal-name">Full Name *</label>
                            <input
                                type="text"
                                id="modal-name"
                                name="name"
                                required
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-email">Email Address *</label>
                            <input
                                type="email"
                                id="modal-email"
                                name="email"
                                required
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-phone">Phone Number *</label>
                            <input
                                type="tel"
                                id="modal-phone"
                                name="phone"
                                required
                                placeholder="+91 XXXX XXX XXX"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-message">Message *</label>
                            <textarea
                                id="modal-message"
                                name="message"
                                required
                                rows="4"
                                placeholder="Tell us about your requirements..."
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full">
                            Send Message
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactModal;
