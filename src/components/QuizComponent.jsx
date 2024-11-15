import React, { useState, useEffect } from 'react';
import { CSSProperties } from "react"
import { useNavigate } from 'react-router-dom'
import { useFormData } from './FormDataContext';
import { Client, Databases, ID } from "appwrite";
import ClipLoader from "react-spinners/ClipLoader";


const QuizComponent = () => {
    const navigate = useNavigate();
    const { formData } = useFormData();
    let [loading, setLoading] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);



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



    const questions = [
        { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], answer: "Paris" },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer: "Shakespeare" },
        { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
        // Add up to 15 questions as needed
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [showIntroModal, setShowIntroModal] = useState(true); // Intro modal state
    const [showResults, setShowResults] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    // Only start timer when the quiz begins
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

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
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


        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.answer) {
                correctAnswers += 1;
            }
        });

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

    const handleAreYouReady =() =>{
        enterFullScreen();
        setShowIntroModal(false);
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
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
                        className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20"
                        style={{
                            backgroundImage: "url('https://mittalinstitute.org/web_components/images/education.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
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
                                        checked={selectedOption === option}
                                        onChange={handleOptionChange}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex items-center justify-center mt-8">
                            <ClipLoader color="black" loading={loading} size={150} />
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={!selectedOption}
                            className="w-full px-4 py-2 mt-10 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                        </button>
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
    );




};

export default QuizComponent;
