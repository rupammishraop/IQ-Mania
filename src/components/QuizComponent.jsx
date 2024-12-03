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


    // round 3 all question

    /*
    const originalQuestions = [
        {
            question: "Find the HCF of 48 and 180.",
            hindiQuestion: "48 और 180 का HCF ज्ञात कीजिए।",
            options: ["6", "12", "24", "36"],
            hindiOptions: [],
            answer: "12",
            hindiAnswer: "12"
        },
        {
            question: "The third Veda is?",
            hindiQuestion: "तीसरा वेद है?",
            options: ["Samaveda", "Atharvaveda", "Yajurveda", "Rigveda"],
            hindiOptions: ["सामवेद", "अथर्ववेद", "यजुर्वेद", "ऋग्वेद"],
            answer: "Yajurveda",
            hindiAnswer: "यजुर्वेद"
        },
        {
            question: "What is dramatic irony?",
            hindiQuestion: "",
            options: [
                "When something turns out differently than expected",
                "When a character says one thing but means another",
                "When the audience knows something the characters do not",
                "When a character directly addresses the audience"
            ],
            hindiOptions: [],
            answer: "When the audience knows something the characters do not",
            hindiAnswer: ""
        },
        {
            question: "What does 'GUI' stand for in computer terms?",
            hindiQuestion: "कंप्यूटर के संदर्भ में 'GUI' का क्या अर्थ है?",
            options: [
                "General User Interface",
                "Graphical User Interface",
                "Global Unifying Interface",
                "Graphical Unified Interface"
            ],
            hindiOptions: [],
            answer: "Graphical User Interface",
            hindiAnswer: ""
        },
        {
            question: "Fatty foods become rancid due to the process of?",
            hindiQuestion: "वसायुक्त खाद्य पदार्थ किस प्रक्रिया के कारण बासी हो जाते हैं?",
            options: ["Oxidation", "Corrosion", "Reduction", "Hydrogenation"],
            hindiOptions: [],
            answer: "Oxidation",
            hindiAnswer: "ऑक्सीकरण"
        },
        {
            question: "The area of the triangle with vertices (1, 2), (-4, -3), and (4, 1) is?",
            hindiQuestion: "",
            options: ["7 sq. units", "20 sq. units", "10 sq. units", "14 sq. units"],
            hindiOptions: [],
            answer: "10 sq. units",
            hindiAnswer: ""
        },
        {
            question: "Shankaracharya's birthplace is?",
            hindiQuestion: "शंकराचार्य का जन्म स्थान है?",
            options: ["Maharashtra", "Odisha", "Kerala", "Bengal"],
            hindiOptions: ["महाराष्ट्र", "उड़ीसा", "केरल", "बंगाल"],
            answer: "Kerala",
            hindiAnswer: "केरल"
        },
        {
            question: "Who wrote 'The Jungle Book'?",
            hindiQuestion: "",
            options: ["Roald Dahl", "Rudyard Kipling", "Lewis Carroll", "Dr. Seuss"],
            hindiOptions: [],
            answer: "Rudyard Kipling",
            hindiAnswer: ""
        },
        {
            question: "The first electronic digital computer contained?",
            hindiQuestion: "प्रथम इलेक्ट्रॉनिक डिजिटल कंप्यूटर में शामिल है?",
            options: ["Electronic valves", "Vacuum tubes", "Transistors", "Semiconductor memory"],
            hindiOptions: [],
            answer: "Vacuum tubes",
            hindiAnswer: ""
        },
        {
            question: "If the net external force on a body is zero, it has?",
            hindiQuestion: "यदि किसी पिंड पर शुद्ध बाह्य बल शून्य है, तो इसमें क्या है?",
            options: ["Zero velocity", "Zero acceleration", "Non-zero acceleration", "None"],
            hindiOptions: [],
            answer: "Zero acceleration",
            hindiAnswer: ""
        },
        {
            question: "What is the volume of a sphere with radius 7 cm? (Use π = 22/7)",
            hindiQuestion: "",
            options: ["1436 cm^3", "1446 cm^3", "1436.5 cm^3", "1446.5 cm^3"],
            hindiOptions: [],
            answer: "1436 cm^3",
            hindiAnswer: ""
        },
        {
            question: "A sentence expressing strong emotion is called?",
            hindiQuestion: "",
            options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"],
            hindiOptions: [],
            answer: "Exclamatory",
            hindiAnswer: ""
        },
        {
            question: "PDA stands for?",
            hindiQuestion: "पीडीए का मतलब क्या है?",
            options: [
                "Personal Digital Applications",
                "Private Digital Applications",
                "Personal Digital Assistants",
                "Private Digital Assistants"
            ],
            hindiOptions: [],
            answer: "Personal Digital Assistants",
            hindiAnswer: ""
        },
        {
            question: "Hydroelectric power plants generate electricity using the energy of?",
            hindiQuestion: "जलविद्युत संयंत्र किसकी ऊर्जा का उपयोग करके बिजली उत्पन्न करते हैं?",
            options: ["Fossil fuel", "Tides", "Wind", "Falling water"],
            hindiOptions: [],
            answer: "Falling water",
            hindiAnswer: ""
        },
        {
            question: "Sound travels through which medium?",
            hindiQuestion: "ध्वनि किस माध्यम से यात्रा करती है?",
            options: ["Solid", "Liquid", "Gas", "All of the above"],
            hindiOptions: ["ठोस", "तरल", "गैस", "उपरोक्त सभी"],
            answer: "All of the above",
            hindiAnswer: "उपरोक्त सभी"
        }
    ];

    */



    // Round 2 all questions

    const originalQuestions = [
        {
            question: "What is the value of (sin 300° + cos 600°) - (sin 600° + cos 300°)?",
            hindiQuestion: "",
            options: ["1 + √2", "1 + 2√2", "1 + √3", "1 + 2√3"],
            hindiOptions: [],
            answer: "1 + √3",
            hindiAnswer: ""
        },
        {
            question: "If the sum of two sides of an equilateral triangle is 16 cm, then find the third side.",
            hindiQuestion: "यदि एक समबाहु त्रिभुज की दो भुजाओं का योग 16 सेमी है, तो तीसरी भुजा ज्ञात कीजिए।",
            options: ["4 cm", "16 cm", "Cannot be found", "8 cm"],
            hindiOptions: ["4 सेमी", "16 सेमी", "ज्ञात नहीं किया जा सकता", "8 सेमी"],
            answer: "8 cm",
            hindiAnswer: "8 सेमी"
        },
        {
            question: "What is the sum of all angles of a hexagon?",
            hindiQuestion: "षट्भुज के सभी कोणों का योग कितना होता है?",
            options: ["540°", "720°", "900°", "1080°"],
            hindiOptions: [],
            answer: "720°",
            hindiAnswer: "720°"
        },
        {
            question: "Genetics is a study of:",
            hindiQuestion: "जेनेटिक्स एक अध्ययन है:",
            options: ["Development of organisms", "Mechanism of inheritance", "Nuclear division", "Variation between species"],
            hindiOptions: ["जीवों का विकास", "विरासत की प्रक्रिया", "कोशिका विभाजन", "प्रजातियों के बीच भिन्नता"],
            answer: "Mechanism of inheritance",
            hindiAnswer: "विरासत की प्रक्रिया"
        },
        {
            question: "The pH of which of the following is more than 7?",
            hindiQuestion: "निम्नलिखित में से किसका pH मान 7 से अधिक है?",
            options: ["Gastric Juice", "Vinegar", "Blood plasma", "Lemon Juice"],
            hindiOptions: ["जठर रस", "सिरका", "रक्त प्लाज्मा", "नींबू का रस"],
            answer: "Blood plasma",
            hindiAnswer: "रक्त प्लाज्मा"
        },
        {
            question: "",
            hindiQuestion: "भारतीय संस्कृति में पहला पुरुषार्थ किसे माना गया है?",
            options: ["Moksha", "Kaam", "Dharma", "Artha"],
            hindiOptions: ["मोक्ष", "काम", "धर्म", "अर्थ"],
            answer: "Kaam",
            hindiAnswer: "काम"
        },
        {
            question: "Which word is an example of a conjunction?",
            hindiQuestion: "",
            options: ["Because", "Very", "Quickly", "House"],
            hindiOptions: [],
            answer: "Because",
            hindiAnswer: "क्योंकि"
        },
        {
            question: "She sings ________ beautifully that everyone enjoys her performances.",
            hindiQuestion: "",
            options: ["so", "too", "such", "very"],
            hindiOptions: [],
            answer: "so",
            hindiAnswer: "इतना"
        },
        {
            question: "What is the correct plural form of the word 'cactus'?",
            hindiQuestion: "'",
            options: ["Cacti", "Cactuss", "Cactusies", "Cactuses"],
            hindiOptions: [],
            answer: "Cacti",
            hindiAnswer: "कैकटस"
        },
        {
            question: "The Dronacharya Award is awarded in which category of sports?",
            hindiQuestion: "द्रोणाचार्य पुरस्कार खेल की किस श्रेणी में प्रदान किया जाता है?",
            options: ["Players", "Coach", "Umpires", "Sports Journalists"],
            hindiOptions: ["खिलाड़ी", "कोच", "अंपायर", "खेल पत्रकार"],
            answer: "Coach",
            hindiAnswer: "कोच"
        },
        {
            question: "Usain Bolt is considered the greatest sprinter of all times. Which country does he belong to?",
            hindiQuestion: "उसेन बोल्ट को सर्वकालिक महान धावक माना जाता है। वह किस देश के हैं?",
            options: ["USA", "Kenya", "Jamaica", "Nigeria"],
            hindiOptions: ["यूएसए", "केन्या", "जमैका", "नाइजीरिया"],
            answer: "Jamaica",
            hindiAnswer: "जमैका"
        },
        {
            question: "Which poet is known as the National Poet?",
            hindiQuestion: "किस कवि को राष्ट्र कवि कहा जाता है?",
            options: ["Makhanlal Chaturvedi", "Maithili Sharan Gupt", "Subhadra Kumari Chauhan", "None of these"],
            hindiOptions: ["माखनलाल चतुर्वेदी", "मैथिलीशरण गुप्त", "सुभद्राकुमारी चौहान", "इनमें से कोई नहीं"],
            answer: "Maithili Sharan Gupt",
            hindiAnswer: "मैथिलीशरण गुप्त"
        },
        {
            question: "",
            hindiQuestion: "शब्दयुग्म का अर्थ है?",
            options: ["शब्दों का जोड़ा", "शब्द का प्रयोग", "शब्दों की गिनती", "शब्दों की व्याख्या"],
            hindiOptions: [],
            answer: "Pair of words",
            hindiAnswer: "शब्दों का जोड़ा"
        },
        {
            question: "What is the smallest unit of digital information?",
            hindiQuestion: "डिजिटल सूचना की सबसे छोटी इकाई क्या है?",
            options: ["Bit", "Byte", "Pixel", "Kilobyte"],
            hindiOptions: ["बिट", "बाइट", "पिक्सेल", "किलोबाइट"],
            answer: "Bit",
            hindiAnswer: "बिट"
        },
        {
            question: "Which device is used to convert analog signals into digital signals?",
            hindiQuestion: "एनालॉग सिग्नल को डिजिटल सिग्नल में बदलने के लिए किस उपकरण का उपयोग किया जाता है?",
            options: ["Modem", "Scanner", "Printer", "Speaker"],
            hindiOptions: ["मोडेम", "स्कैनर", "प्रिंटर", "स्पीकर"],
            answer: "Modem",
            hindiAnswer: "मोडेम"
        }
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


    const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Track quiz completion

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // Some browsers require this to be set
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => { window.removeEventListener('beforeunload', handleBeforeUnload); };
    }, []);




    // Handle quiz completion
    const handleQuizCompletion = () => {
        setIsQuizCompleted(true);
    };


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
        handleQuizCompletion(true);
        setLoading(false)
    };

    const handleShowResult = () => {
        setShowResults(false)
        exitFullScreen();
        navigate("/")
    }

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const handleAreYouReady = () => {
        if (formData == null) {
            alert("Firstly you have registered yourself before running quiz");
            navigate("/")
        } else {
            setLoading(true);
            const shuffledQuestions = shuffleArray(originalQuestions);
            setQuestions(shuffledQuestions);
            enterFullScreen();
            setShowIntroModal(false);
            setLoading(false);
        }

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
                                <h2 className="text-3xl font-bold text-center text-blue-600">Round-2</h2>
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
                                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
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
                                        Thank you!
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
