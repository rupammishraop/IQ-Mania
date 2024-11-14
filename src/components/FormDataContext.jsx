import React, { createContext, useState, useContext } from 'react';

// Create the context
const FormDataContext = createContext();

// Create a Provider component
export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState(null);

    // Function to update form data
    const updateFormData = (data) => {
        setFormData(data);
    };

    return (
        <FormDataContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

// Custom hook to use form data in any component
export const useFormData = () => {
    return useContext(FormDataContext);
};
