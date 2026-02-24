import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Services.css';
import useTilt from '../hooks/useTilt';

/**
 * Service Definition Data 
 */
export const servicesData = [
    {
        id: 'waterproofing',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
            </svg>
        ),
        title: 'Precision Waterproofing Systems',
        image: '/waterproof.jpg',
        description: 'Advanced systems designed to prevent moisture intrusion and structural damage.',
        fullDescription: `Civil Doctor delivers engineered waterproofing solutions designed to prevent water ingress, protect structural integrity and extend the service life of buildings.

Our approach combines precise surface preparation, high-performance membranes and proven application systems to create seamless, durable barriers against moisture intrusion. Each solution is selected based on structural requirements, exposure conditions and long-term performance expectations.

Waterproofing is not a surface treatment — it is structural protection.`,
        expertiseAreas: [
            'Terrace & Roof Slabs — Protection against rainwater penetration',
            'Basements & Foundations — Prevention of groundwater ingress',
            'Bathrooms & Wet Areas — Internal moisture control',
            'Water Tanks & Sumps — Seepage prevention',
            'Retaining Walls — Lateral water pressure resistance',
            'Podiums & Parking Decks — Traffic-resistant waterproofing systems',
            'Balconies & Sunshades — Surface and joint protection',
        ],
        subServices: [
            'Membrane Waterproofing (APP / SBS Modified Bitumen)',
            'Liquid Applied Elastomer Coatings',
            'Cementitious Waterproofing Systems',
            'Polyurethane (PU) Based Systems',
            'Crystalline Waterproofing Treatment',
            'Injection Grouting for Active Leaks',
        ],
        delay: '0s',
    },
    {
        id: 'protective-coatings',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
        ),
        title: 'High-Performance Protective Coating Systems',
        image: '/service-worker-painting-car-auto-service.jpg',
        description: 'Engineered surface protection designed to prevent corrosion, chemical attack and environmental deterioration.',
        fullDescription: `Civil Doctor delivers advanced protective coating systems formulated to enhance durability and extend the service life of concrete and steel structures. Our solutions are selected based on environmental exposure, structural requirements and performance expectations, ensuring long-term resistance against moisture, chemicals, abrasion and corrosion.

Protective coatings are not merely aesthetic finishes — they are critical defence systems that preserve structural integrity.`,
        expertiseAreas: [
            'Concrete structures exposed to weathering',
            'Steel structures prone to corrosion',
            'Industrial floors and process areas',
            'Water tanks and treatment facilities',
            'Marine and coastal environments',
            'Basements, podium decks and parking structures',
        ],
        subServices: [
            'Epoxy Coating Systems',
            'Polyurethane (PU) Coatings',
            'Anti-Carbonation Coatings',
            'Anti-Corrosive Coatings for Steel',
            'Chemical Resistant Coatings',
            'Abrasion Resistant Floor Coatings',
            'Elastomeric Protective Coatings',
        ],
        delay: '0.1s',
    },
    {
        id: 'flooring',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: 'Industrial & Structural Flooring Systems',
        image: '/EPOXY-FLOORING.webp',
        description: 'High-performance flooring solutions engineered for strength, durability and long-term wear resistance.',
        fullDescription: `Civil Doctor delivers specialised flooring systems designed to withstand mechanical loads, chemical exposure, abrasion and continuous usage. Our flooring solutions combine structural performance with precision application, ensuring durability, safety and aesthetic refinement across demanding environments.

Every system is selected based on load conditions, operational requirements and environmental exposure — ensuring performance that endures.`,
        expertiseAreas: [
            'Industrial plants and manufacturing facilities',
            'Warehouses and logistics centres',
            'Commercial buildings and retail spaces',
            'Parking decks and podium slabs',
            'Hospitals and institutional buildings',
            'Laboratories and process areas',
        ],
        subServices: [
            'Epoxy Flooring Systems',
            'Polyurethane (PU) Flooring',
            'Self-Levelling Flooring Systems',
            'Anti-Static (ESD) Flooring',
            'Heavy Duty Industrial Screeds',
            'Decorative and Metallic Floor Finishes',
            'Anti-Skid and Safety Floor Coatings',
        ],
        delay: '0.2s',
    },
    {
        id: 'repair-rehab',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.7-3.7a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0l-3.7 3.7z" />
                <path d="M20 16v4a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h4" />
            </svg>
        ),
        title: 'Structural Repair & Rehabilitation',
        image: '/services/structural structure reapir.jpg',
        description: 'Restoring structural integrity through precision-driven repair and strengthening solutions.',
        fullDescription: `Civil Doctor delivers comprehensive structural repair and rehabilitation systems designed to restore strength, enhance load capacity and extend the service life of deteriorated structures.

Our approach focuses on accurate condition assessment, root cause identification and engineered intervention to address structural distress, material degradation and long-term durability concerns.

Rehabilitation is not repair alone — it is the restoration of performance, safety and resilience.`,
        expertiseAreas: [
            'Deteriorated concrete structures',
            'Corrosion-affected reinforced concrete',
            'Cracked or distressed structural elements',
            'Ageing residential and commercial buildings',
            'Industrial structures exposed to aggressive environments',
            'Structural members with reduced load capacity',
        ],
        subServices: [
            'Concrete Repair and Section Restoration',
            'Structural Strengthening',
            'Corrosion Mitigation and Rebar Treatment',
            'Crack Injection (Epoxy / PU)',
            'Micro Concrete and Polymer Modified Repairs',
            'Structural Grouting',
            'Carbon Fiber Reinforcement Systems',
        ],
        delay: '0.3s',
    },
    {
        id: 'structural-diagnostics',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
        ),
        title: 'Structural Diagnostics & Technical Assessment',
        image: '/services/structural diagonastic.jpg',
        description: 'Comprehensive evaluation of structural condition to identify root causes and performance risks.',
        fullDescription: `Civil Doctor provides methodical structural assessment services to evaluate integrity, durability, and serviceability. Through detailed inspection and technical analysis, we identify distress patterns, moisture pathways, material degradation, and potential structural vulnerabilities before they escalate into major failures.

Accurate diagnosis forms the foundation of engineered solutions.`,
        expertiseAreas: [
            'Ageing residential and commercial buildings',
            'Industrial structures',
            'Water-affected structures',
            'Pre-rehabilitation assessment projects',
            'Structural distress investigations',
        ],
        subServices: [
            'Structural Condition Assessment',
            'Crack Mapping & Distress Analysis',
            'Leak Source Identification',
            'Concrete Strength Evaluation (NDT Coordination)',
            'Structural Stability Review',
            'Technical Reporting & Recommendations',
        ],
        delay: '0.4s',
    },
    {
        id: 'injection-grouting',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Injection Grouting & Leak Control Systems',
        image: '/CONSTRUCTION JOINT SEALANT.webp',
        description: 'Targeted sealing and stabilization solutions for active leaks and structural voids.',
        fullDescription: `Civil Doctor delivers precision injection systems designed to arrest active water ingress, seal cracks, and restore structural continuity. Using controlled pressure techniques and performance-grade materials, we eliminate leak paths at their source and stabilize affected structural components.

This is corrective engineering — not surface patchwork.`,
        expertiseAreas: [
            'Basements and retaining walls',
            'Water tanks and sumps',
            'Expansion joints',
            'Cracked concrete members',
            'Underground structures',
        ],
        subServices: [
            'PU Injection Grouting',
            'Epoxy Crack Injection',
            'Pressure Cement Grouting',
            'Void Filling & Soil Stabilization',
            'Structural Bonding Systems',
        ],
        delay: '0.5s',
    },
    {
        id: 'concrete-durability',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
            </svg>
        ),
        title: 'Concrete Durability & Corrosion Protection',
        image: '/services/glo-concrete-protection-cathodic-protection.gif',
        description: 'Advanced treatment systems designed to enhance longevity and protect reinforcement.',
        fullDescription: `Civil Doctor provides engineered durability solutions that mitigate carbonation, chloride ingress, and reinforcement corrosion. Our systems restore protective cover, prevent further deterioration, and significantly extend structural service life.

Durability is engineered — not assumed.`,
        expertiseAreas: [
            'Coastal and humid environments',
            'Corrosion-affected structures',
            'Industrial facilities',
            'Parking decks and podiums',
            'Infrastructure exposed to aggressive conditions',
        ],
        subServices: [
            'Anti-Carbonation Coatings',
            'Corrosion Inhibitor Systems',
            'Rebar Treatment & Passivation',
            'Protective Surface Coatings',
        ],
        delay: '0s',
    },
    {
        id: 'surface-bonding',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        title: 'Surface Bonding & Tile Installation Systems',
        image: '/services/tile.jpg',
        description: 'High-performance tile adhesive and bonding systems for durable surface installations.',
        fullDescription: `Through our authorized distribution partnerships, Civil Doctor provides advanced bonding solutions for tile and stone installations. Engineered adhesives and grouting systems ensure superior adhesion strength, moisture resistance, and long-term performance across residential, commercial, and industrial environments.

Precision installation begins with performance materials.`,
        expertiseAreas: [
            'Residential and commercial flooring',
            'Bathrooms and wet areas',
            'Facades and exterior cladding',
            'Industrial and institutional facilities',
            'Swimming pools and water features',
        ],
        subServices: [
            'Cement-Based Tile Adhesives',
            'Polymer-Modified Adhesives',
            'Epoxy Tile Adhesives',
            'Epoxy & Cementitious Grouts',
            'Tile Waterproofing Underlayment Systems',
        ],
        delay: '0.1s',
    },
    {
        id: 'precision-grouting',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" />
            </svg>
        ),
        title: 'Precision Grouting & Anchoring Systems',
        image: '/services/anchor-bolt-grouting-process.webp',
        description: 'High-strength grouting solutions for load transfer, stability, and alignment.',
        fullDescription: `Civil Doctor provides non-shrink and high-performance grouting systems designed to ensure structural load transfer, equipment alignment, and foundation stability. Our engineered solutions support heavy machinery, structural base plates, and anchoring applications requiring precision and durability.

Performance begins at the base.`,
        expertiseAreas: [
            'Machinery foundations',
            'Industrial equipment installations',
            'Structural base plates',
            'Column anchoring systems',
            'Infrastructure repair projects',
        ],
        subServices: [
            'Non-Shrink Cementitious Grouts',
            'Epoxy Grouting Systems',
            'Anchor Bolt Grouting',
            'Base Plate Grouting',
            'Structural Anchoring Solutions',
        ],
        delay: '0.2s',
    },
    {
        id: 'fosroc',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Fosroc — Authorized Distribution & Application Partner',
        image: '/services/forsoc.jpg',
        description: 'Certified supply and application of internationally proven Fosroc construction chemical systems.',
        fullDescription: `Civil Doctor, operating under Vaari Traders, is proud to be an authorized distributor and certified applicator of Fosroc construction chemical systems in Salem.

Fosroc is globally recognized for delivering high-performance construction solutions designed to enhance durability, structural integrity, and long-term performance. Through this partnership, Civil Doctor integrates internationally proven material systems with certified execution standards — ensuring technical reliability at every stage.

Our association with Fosroc enables us to provide end-to-end solutions backed by research-driven innovation, stringent quality control, and on-site application expertise.`,
        expertiseAreas: [
            'Waterproofing Systems — Cementitious, Membrane, Liquid-Applied, Crystalline',
            'Structural Repair & Rehabilitation — Polymer mortars, Micro-Concrete, Corrosion protection',
            'Industrial Flooring — Epoxy, PU, Self-Leveling, Chemical-Resistant, Anti-Static',
            'Grouting & Anchoring — Non-Shrink Cementitious, Epoxy, Anchor Bolt, Base Plate',
            'Joint & Sealant Systems — PU Sealants, Polysulfide, Expansion Joint Systems',
        ],
        subServices: [
            'Genuine, Certified Material Supply',
            'Technical Product Guidance',
            'Manufacturer-Compliant Application Standards',
            'Integrated Supply + Execution Model',
            'Long-Term Performance Assurance',
        ],
        delay: '0.3s',
    },
    {
        id: 'ramco-hardworker',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        ),
        title: 'Ramco Hard Worker — Authorized Distribution Partner',
        image: '/EPOXY-FLOORING.webp',
        description: 'Authorized distributor of Ramco Hard Worker construction chemical systems in Salem (Prime Traders).',
        fullDescription: `Prime Traders is an authorized distributor of Ramco Hard Worker construction chemical systems in Salem — a dedicated chemical product division launched by Ramco Cements Ltd.

Hard Worker offers a broad suite of engineered solutions designed for performance, compatibility, and ease of application across structural, waterproofing, installation, and finishing needs. The Hard Worker brand represents about 20 specialized products tailored for different structural and installation requirements.`,
        expertiseAreas: [
            'Tile and stone installations (floor & wall)',
            'Wet areas, terraces, and balconies',
            'Concrete correction and repair',
            'Masonry block fixing',
            'Structural overlays and bonding',
            'Waterproofing of critical areas',
        ],
        subServices: [
            'Tile Adhesive Systems (HW201–HW207)',
            'Grouting Systems — Cementitious & Epoxy (HW210, HW211)',
            'Waterproofing Systems (HW101, HW103)',
            'Surface Repair & Structural Products (HW301, HW401)',
            'Bonding Agent Epoxy & SBR (HW403, HW404)',
            'Anchoring Grout (HW402)',
        ],
        delay: '0.4s',
    },
];


/**
 * ServiceCard Component
 */
const ServiceCard = ({ service, onClick }) => {
    const tiltRef = useTilt();
    return (
        <div
            ref={tiltRef}
            className="service-card animate-slide-left"
            style={{ animationDelay: service.delay, cursor: 'pointer' }}
            onClick={() => onClick(service.id)}
        >
            <div className="service-image-container">
                <img src={service.image} alt={service.title} className="service-card-image" />
                <div className="service-icon-overlay">{service.icon}</div>
            </div>
            <div className="service-card-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <span className="service-link">
                    Know More →
                </span>
            </div>
        </div>
    );
};

/**
 * Services Component
 */
const Services = () => {
    const servicesRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        const elements = servicesRef.current?.querySelectorAll('.service-card');
        elements?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleServiceClick = (serviceId) => {
        navigate(`/service/${serviceId}`);
    };

    return (
        <section id="services" className="services-section" ref={servicesRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Services</h2>
                </div>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            onClick={handleServiceClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
