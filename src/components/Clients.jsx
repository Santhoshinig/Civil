import React from 'react';
import '../styles/Clients.css';

/**
 * Clients Component
 * 
 * Logic: Renders a high-fidelity horizontal marquee of client logos.
 * Uses a continuous CSS animation loop for a professional "running" effect.
 */
const Clients = () => {
    // Array of client data - placeholders until user provides actual logos
    const clients = [
        { id: 1, name: "Fun Mall", logo: "/clients/fum mall.png" },
        { id: 2, name: "KMCH", logo: "/clients/kmch.png" },
        { id: 3, name: "Neuro Foundation", logo: "/clients/neuro foundation.png" },
        { id: 4, name: "PSG Hospitals", logo: "/clients/psg.jpg" },
        { id: 5, name: "Senthil Public School", logo: "/clients/senthilpublic.png" },
        { id: 6, name: "PSK", logo: "/clients/psk.png" },
        { id: 7, name: "Thiagarajar Polytechnic College", logo: "/clients/Thiagarajar College.jpg" },
        { id: 8, name: "Kovai Public School", logo: "/clients/kovai public school.png" },
        { id: 9, name: "Greenfield", logo: "/clients/greenfield.jpeg" },
        { id: 10, name: "Muthu Silks", logo: "/clients/muthu silks.webp" },
        { id: 11, name: "Salem Steel Plant", logo: "/clients/steelplant.webp" },
    ];

    // Double the array for seamless circular scroll
    const marqueeItems = [...clients, ...clients];

    return (
        <section id="clients" className="clients-section">
            <div className="clients-container">
                <h2 className="section-title">Our Trusted Clients</h2>

                <div className="clients-marquee-wrapper">
                    <div className="clients-marquee">
                        {marqueeItems.map((client, index) => (
                            <div key={`${client.id}-${index}`} className="client-logo-item">
                                <img src={client.logo} alt={client.name} title={client.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
