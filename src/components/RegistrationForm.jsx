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
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            {/* Background SVG Animation */}
            <svg
                className="absolute inset-0 w-full h-full object-cover z-0"
                preserveAspectRatio="xMidYMid slice"
                viewBox="10 10 80 80"
            >
                <defs>
                    <style>
                        {`
                  @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  .out-top {
                    animation: rotate 20s linear infinite;
                    transform-origin: 13px 25px;
                  }
                  .in-top {
                    animation: rotate 10s linear infinite;
                    transform-origin: 13px 25px;
                  }
                  .out-bottom {
                    animation: rotate 25s linear infinite;
                    transform-origin: 84px 93px;
                  }
                  .in-bottom {
                    animation: rotate 15s linear infinite;
                    transform-origin: 84px 93px;
                  }
                `}
                    </style>
                </defs>
                <path
                    fill="#9b5de5"
                    className="out-top"
                    d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
                />
                <path
                    fill="#f15bb5"
                    className="in-top"
                    d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
                />
                <path
                    fill="#00bbf9"
                    className="out-bottom"
                    d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
                />
                <path
                    fill="#00f5d4"
                    className="in-bottom"
                    d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
                />
            </svg>

            {/* Registration Form */}
            <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-center ">
                    <img
                        id="clgLogo"
                        className="w-32 h-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu8Dd0riPysu6qXugKi2zrXV6MS-u14R-MqA&s"
                        alt="Mittal Logo"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Registration for IQ-Mania
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="studentName"
                            className="block text-sm font-medium text-gray-700 ml-0"
                        >
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
                        <label
                            htmlFor="schoolName"
                            className="block text-sm font-medium text-gray-700"
                        >
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
                        <label
                            htmlFor="tokenNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
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
                        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-serif"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;

