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
        {
            question: "Which poet is known as the National Poet?",
            hindiQuestion: "किस कवि को राष्ट्र कवि कहा जाता है?",
            options: ["Makhanlal Chaturvedi", "Maithili Sharan Gupt", "Subhadra Kumari Chauhan", "None of these"],
            hindiOptions: ["माखनलाल चतुर्वेदी", "मैथिलीशरण गुप्त", "सुभद्राकुमारी चौहान", "इनमें से कोई नहीं"],
            answer: "Maithili Sharan Gupt",
            hindiAnswer: "मैथिलीशरण गुप्त"
        },
        {
            question: "Choose the correct tense to complete the sentence: By next year, they ____ in this city for ten years.",
            hindiQuestion: "वाक्य पूरा करने के लिए सही काल चुनें: अगले वर्ष तक, वे इस शहर में दस वर्षों तक ____।",
            options: ["live", "will live", "have lived", "will have lived"],
            hindiOptions: ["रहेंगे", "रहते होंगे", "रहे हैं", "रह चुके होंगे"],
            answer: "will have lived",
            hindiAnswer: "रह चुके होंगे"
        },
        {
            question: "Which component connects peripherals to the motherboard?",
            hindiQuestion: "कौन सा घटक बाह्य उपकरणों को मदरबोर्ड से जोड़ता है?",
            options: ["USB", "PCI", "SATA", "HDMI"],
            hindiOptions: ["यूएसबी", "पीसीआई", "साटा", "एचडीएमआई"],
            answer: "USB",
            hindiAnswer: "यूएसबी"
        },
        {
            question: "Genetics is a study of:",
            hindiQuestion: "जेनेटिक्स का अध्ययन है:",
            options: ["Development of organisms", "Mechanism of inheritance", "Nuclear division", "Variation between species"],
            hindiOptions: ["जीवों का विकास", "वंशानुक्रम की प्रक्रिया", "नाभिकीय विभाजन", "प्रजातियों के बीच अंतर"],
            answer: "Mechanism of inheritance",
            hindiAnswer: "वंशानुक्रम की प्रक्रिया"
        },
        {
            question: "What is the result when you reduce Rs. 80 by 11%?",
            hindiQuestion: "रु. 80 को 11% घटाने पर परिणाम क्या होगा?",
            options: ["Rs 71.20", "Rs 69", "Rs 69.90", "Rs 69.20"],
            hindiOptions: ["रु 71.20", "रु 69", "रु 69.90", "रु 69.20"],
            answer: "Rs 71.20",
            hindiAnswer: "रु 71.20"
        },
        {
            question: "What is the genre of 'Shatranj ke Khiladi'?",
            hindiQuestion: "शतरंज के खिलाड़ी की विधा क्या है?",
            options: ["Poetry", "Story", "One-act play", "Drama"],
            hindiOptions: ["कविता", "कहानी", "एकांकी", "नाटक"],
            answer: "Story",
            hindiAnswer: "कहानी"
        },
        {
            question: "The news about the recent discoveries ____ really exciting.",
            hindiQuestion: "हाल की खोजों के बारे में खबर ____ वास्तव में रोमांचक है।",
            options: ["are", "is", "were", "have"],
            hindiOptions: ["हैं", "है", "थे", "हुए"],
            answer: "is",
            hindiAnswer: "है"
        },
        {
            question: "Which device reads optical discs?",
            hindiQuestion: "कौन सा उपकरण ऑप्टिकल डिस्क को पढ़ता है?",
            options: ["CD drive", "DVD drive", "Hard drive", "SSD"],
            hindiOptions: ["सीडी ड्राइव", "डीवीडी ड्राइव", "हार्ड ड्राइव", "एसएसडी"],
            answer: "DVD drive",
            hindiAnswer: "डीवीडी ड्राइव"
        },
        {
            question: "Nandan-kanan zoo is popular for its?",
            hindiQuestion: "नंदन-कानन चिड़ियाघर इसके लिए लोकप्रिय है?",
            options: ["Nilgiri tahr", "Whale", "White tiger", "Hippo"],
            hindiOptions: ["नीलगिरी तहर", "व्हेल", "सफेद बाघ", "दरियाई घोड़ा"],
            answer: "White tiger",
            hindiAnswer: "सफेद बाघ"
        },
        {
            question: "The value of (x – y)(x + y) + (y – z)(y + z) + (z – x)(z + x) is:",
            hindiQuestion: "(x – y)(x + y) + (y – z)(y + z) + (z – x)(z + x) का मान क्या है?",
            options: ["x + y + z", "x² + y² + z²", "xy + yz + zx", "0"],
            hindiOptions: [],
            answer: "0",
            hindiAnswer: "0"
        },
        {
            question: "Who is the author of the essay 'Bharat Ek Hai'?",
            hindiQuestion: '"भारत एक है" निबंध के लेखक हैं?',
            options: ["Dr. Tribhuwan Nath Shukla", "Sharad Joshi", "Heera Lal", "Ramdhari Singh Dinkar"],
            hindiOptions: ["डॉ. त्रिभुवन नाथ शुक्ल", "शरद जोशी", "हीरा लाल", "रामधारी सिंह दिनकर"],
            answer: "Ramdhari Singh Dinkar",
            hindiAnswer: "रामधारी सिंह दिनकर"
        },
        {
            question: "Which of the following options cannot be converted into passive voice?",
            hindiQuestion: "निम्नलिखित में से कौन सा विकल्प निरोधात्मक वाक्य में परिवर्तित नहीं किया जा सकता है?",
            options: [
                "She sang a beautiful song.",
                "He is driving the car.",
                "The children played outside.",
                "She sleeps soundly."
            ],
            hindiOptions: [
                "उसने एक सुंदर गीत गाया।",
                "वह कार चला रहा है।",
                "बच्चे बाहर खेले।",
                "वह शांति से सोती है।"
            ],
            answer: "She sleeps soundly.",
            hindiAnswer: "वह शांति से सोती है।"
        },
        {
            question: "Which type of memory is typically the fastest?",
            hindiQuestion: "किस प्रकार की मेमोरी आमतौर पर सबसे तेज़ होती है?",
            options: ["RAM", "Cache memory", "SSD", "HDD"],
            hindiOptions: ["रैम", "कैश मेमोरी", "एसएसडी", "एचडीडी"],
            answer: "Cache memory",
            hindiAnswer: "कैश मेमोरी"
        },
        {
            question: "Tubectomy is carried out by blocking the?",
            hindiQuestion: "ट्यूबेक्टोमी को अवरुद्ध करके किया जाता है?",
            options: ["Oviduct", "Uterus", "Cervix", "Vagina"],
            hindiOptions: ["अंडवाहिनी", "गर्भाशय", "गर्भाशय ग्रीवा", "योनि"],
            answer: "Oviduct",
            hindiAnswer: "अंडवाहिनी"
        },
        {
            question: "Which of the following are positive directions?",
            hindiQuestion: "निम्नलिखित में से कौन से सकारात्मक दिशाएँ हैं?",
            options: ["OX’ and OY’", "OX and OY’", "OX’ and OY", "OX and OY"],
            hindiOptions: ["OX’ और OY’", "OX और OY’", "OX’ और OY", "OX और OY"],
            answer: "OX and OY",
            hindiAnswer: "OX और OY"
        }
        // Add more questions in a similar format
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
                <div className="relative h-screen flex items-center justify-center "
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



                                <h3 className="text-2xl font-semibold mt-10">
                                    <span className="block text-center w-full text-red-500">Question {currentQuestionIndex + 1}</span>

                                    {questions[currentQuestionIndex].question}
                                    <div>
                                        {questions[currentQuestionIndex].hindiQuestion}
                                    </div>


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
                                            {questions[currentQuestionIndex].hindiOptions?.[index] && (
                                                <span className="text-gray-900">({questions[currentQuestionIndex].hindiOptions[index]})</span>
                                            )}

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
