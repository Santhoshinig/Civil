import { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContact = () => {
    return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const openContact = () => setIsContactOpen(true);
    const closeContact = () => setIsContactOpen(false);

    return (
        <ContactContext.Provider value={{ isContactOpen, openContact, closeContact }}>
            {children}
        </ContactContext.Provider>
    );
};
