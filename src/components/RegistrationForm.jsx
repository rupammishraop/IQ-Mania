import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from './FormDataContext';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const { updateFormData } = useFormData();

    const [formData, setFormData] = useState({
        studentName: '',
        schoolName: '',
        tokenNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update context with the form data
        updateFormData(formData);
        // console.log('Form submitted:', formData);
        navigate('/quiz');
    };

    return (
        <div id='backgroundImg' className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-center  bg-gray-100">
                    <img
                        id="clgLogo"
                        className="w-32 h-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu8Dd0riPysu6qXugKi2zrXV6MS-u14R-MqA&s"
                        alt="Mittal Logo"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Registration for Q-Main
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 ml-0">
                            Student Name
                        </label>
                        <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
                            School Name
                        </label>
                        <input
                            type="text"
                            id="schoolName"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your school name"
                        />
                    </div>
                    <div>
                        <label htmlFor="tokenNumber" className="block text-sm font-medium text-gray-700">
                            Token Number
                        </label>
                        <input
                            type="text"
                            id="tokenNumber"
                            name="tokenNumber"
                            value={formData.tokenNumber}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your token number"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;

