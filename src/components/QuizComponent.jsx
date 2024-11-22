import React, { useState, useEffect } from 'react';
import { CSSProperties } from "react"
import { useNavigate } from 'react-router-dom'
import { useFormData } from './FormDataContext';
import { Client, Databases, ID } from "appwrite";
import ClipLoader from "react-spinners/ClipLoader";


const QuizComponent = () => {
    const navigate = useNavigate();
    const { formData } = useFormData();

    const [isFullScreen, setIsFullScreen] = useState(false);



    // Suffling code

    // Defining Full Screen Mode features

    const enterFullScreen = () => {
        const element = document.documentElement; // the root element of the page
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
        setIsFullScreen(true);
    };


    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        setIsFullScreen(false);
    };

    const toggleFullScreen = () => {
        if (isFullScreen) {
            exitFullScreen();
        } else {
            enterFullScreen();
        }
    };

    // Define the CSS override for the loader
    const override = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px", // Full screen height to center vertically
        width: "100px",  // Full screen width to center horizontally
    };


    const client = new Client()
        .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Using the .env variable
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Using the .env variable

    const databases = new Databases(client);

    // console.log(import.meta.env.VITE_APPWRITE_ENDPOINT)

    if (formData == null) {
        navigate("/")
    }

    const [questions, setQuestions] = useState([]);



    const originalQuestions = [
        { question: "What is the chemical formula for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
        { question: "What is the capital of India?", options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"], answer: "New Delhi" },
        { question: "Who discovered gravity?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], answer: "Isaac Newton" },
        { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
        { question: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: "Nitrogen" },
        { question: "What is the SI unit of force?", options: ["Joule", "Pascal", "Newton", "Watt"], answer: "Newton" },
        { question: "Who wrote the Indian National Anthem?", options: ["Rabindranath Tagore", "Sarojini Naidu", "Bankim Chandra Chatterjee", "Subhash Chandra Bose"], answer: "Rabindranath Tagore" },
        { question: "What is the Pythagorean theorem?", options: ["a² + b² = c²", "a² - b² = c²", "a + b = c", "a × b = c"], answer: "a² + b² = c²" },
        { question: "What is the boiling point of water in Celsius?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
        { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: "Mars" },
        { question: "What is the value of π (pi) up to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
        { question: "Who is known as the Father of the Indian Constitution?", options: ["Mahatma Gandhi", "B. R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"], answer: "B. R. Ambedkar" },
        { question: "Which organ is responsible for pumping blood in the human body?", options: ["Lungs", "Liver", "Heart", "Kidneys"], answer: "Heart" },
        { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Pb"], answer: "Au" },
        { question: "What is the speed of light in a vacuum?", options: ["3 × 10^6 m/s", "3 × 10^7 m/s", "3 × 10^8 m/s", "3 × 10^9 m/s"], answer: "3 × 10^8 m/s" }
    ];


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [showIntroModal, setShowIntroModal] = useState(true); // Intro modal state
    const [showResults, setShowResults] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
    // const [questions, setQuestions] = useState([]);
    let [loading, setLoading] = useState(false);





    useEffect(() => {

        if (!showIntroModal) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            if (timeLeft === 0) {
                handleSubmit();
            }

            return () => clearInterval(timer);
        }
    }, [timeLeft, showIntroModal]);

    const handleOptionChange = (option) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = option;
        setSelectedAnswers(updatedAnswers);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };


    const handleNext = () => {

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: selectedOption,
        }));

        setSelectedOption("");
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {


        const correctAnswers = questions.reduce((count, question, index) => {
            return selectedAnswers[index] === question.answer ? count + 1 : count;
        }, 0);

        setCorrectCount(correctAnswers);

        setCorrectCount(correctAnswers);
        setLoading(true);

        try {


            const result = await databases.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID, // Database ID
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                ID.unique(), // Collection ID
                {
                    name: formData.studentName,
                    schoolName: formData.schoolName,
                    tokenNo: formData.tokenNumber,
                    correctAnswer: correctAnswers,
                }
            );
            console.log('Student result submitted:', result);
            setLoading(false);
            setShowResults(true);
        } catch (error) {
            console.error('Error submitting result to Appwrite:', error);
        }

        setLoading(false)
    };

    const handleShowResult = () => {
        setShowResults(false)
        exitFullScreen();
        navigate("/")
    }

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const handleAreYouReady = () => {
        setLoading(true);
        const shuffledQuestions = shuffleArray(originalQuestions);
        setQuestions(shuffledQuestions);
        enterFullScreen();
        setShowIntroModal(false);
        setLoading(false);
    }


    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (

        <>
            {loading ? (
                <div className="flex items-center justify-center w-full h-screen bg-blue-500">
                    <ClipLoader color="black" loading={loading} size={150} />
                </div>
            ) : (
                <div className="relative h-screen flex items-center justify-center overflow-hidden"
                    onContextMenu={(e) => e.preventDefault()} >
                    {/* Background Animation */}
                    <div className="area fixed inset-0 -z-10 overflow-hidden">
                        <ul className="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div id='quizContainer' className="context w-full flex flex-col items-center justify-center p-4 space-y-6">
                        {/* Intro Modal */}
                        {showIntroModal && (
                            <div
                                id="entryImg"
                                className="fixed  flex items-center justify-center bg-transparent  "
                                
                            >
                                <div className="p-6 bg-black bg-opacity-75 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-bold text-center text-white">Are you ready for the Quiz?</h2>
                                    <button
                                        onClick={() => handleAreYouReady()}
                                        className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    >
                                        Yes, I'm ready!
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Quiz Content */}
                        {!showIntroModal && (
                            <div className="z-10 w-full max-w-3xl p-8 bg-gray-100 rounded-lg shadow-2xl mb-10">
                                <h2 className="text-3xl font-bold text-center text-blue-600">Quiz Time</h2>
                                <div className="text-3xl font-bold text-black mt-4 text-center">
                                    Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                </div>


                                {/* Progress Bar */}
                                <div className="flex flex-wrap justify-center items-center mt-6 space-x-2 sm:space-x-4">
                                    {questions.map((_, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setCurrentQuestionIndex(index)} // Jump to the question on click
                                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm cursor-pointer ${selectedAnswers[index] ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>



                                <h3 className="text-3xl font-semibold mt-10">
                                    Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
                                </h3>
                                <div className="mt-8 space-y-5 text-2xl">
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <label key={index} className="flex items-center space-x-8 text-2xl">
                                            <input
                                                type="radio"
                                                name="option"
                                                value={option}
                                                checked={selectedAnswers[currentQuestionIndex] === option}
                                                onChange={() => handleOptionChange(option)}
                                                className="form-radio text-blue-600"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center mt-8">
                                    <ClipLoader color="black" loading={loading} size={150} />
                                </div>
                                <div className="flex justify-between mt-10">
                                    {/* Previous Button */}
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentQuestionIndex === 0}
                                        className="px-4 w-40 py-2 text-white bg-blue-600 rounded-md hover:bg-gray-600 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>

                                    {/* Next/Submit Button */}
                                    <button
                                        onClick={handleNext}
                                        disabled={!selectedAnswers[currentQuestionIndex]}
                                        className="px-4 py-2 w-40 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                                    </button>
                                </div>
                            </div>

                        )}

                        {/* Results Modal */}
                        {showResults && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
                                <div className="p-8 bg-white rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-bold text-center text-blue-600">Quiz Results</h2>
                                    <p className="mt-4 text-lg text-center">
                                        Thank you! You answered {correctCount} out of {questions.length} questions correctly!
                                    </p>
                                    <button
                                        onClick={() => handleShowResult()}
                                        className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>

    );




};

export default QuizComponent;
