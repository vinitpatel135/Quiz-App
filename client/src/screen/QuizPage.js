import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Common/Api';

const QuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // Use navigate instead of history
    const [quiz, setQuiz] = useState({});
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const getQuizById = async () => {
        try {
            const data = await api.listQuizById(id)
            console.log("By id :=" ,data)
            setQuiz(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // axios.get(`/api/quizzes/${id}`)
        //   .then(response => setQuiz(response.data))
        //   .catch(error => console.log(error));
        getQuizById()
        // eslint-disable-next-line
    }, [id]);

    const handleAnswerChange = (e) => {
        setAnswers({
            ...answers,
            [currentQuestion]: e.target.value,
        });
    };

    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const submitQuiz = async () => {
        // axios.post('/api/submit', { quizId: id, answers })
        //   .then(response => {
        //     toast.success('Quiz Submitted Successfully!');
        //     navigate(`/score/${response.data.score}`);  // Use navigate for redirection
        //   })
        //   .catch(error => {
        //     toast.error('Failed to Submit Quiz.');
        //   });
        try {
            const data = await api.submitQuiz({ quizId: id, answers })
            console.log("submit", data)
            toast.success('Quiz Submitted Successfully!');
            navigate(`/score/${data.data.score}`);
        } catch (error) {
            console.log(error)
        }
    };

    if (!quiz.questions) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <h2 className="text-3xl font-bold text-center mb-8">{quiz.title}</h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {currentQuestion < quiz.questions.length ? (
                    <div>
                        <p className="text-xl mb-4">{quiz.questions[currentQuestion].question}</p>
                        <div className="space-y-4">
                            {quiz.questions[currentQuestion].options.map((option, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion}`}
                                        value={option}
                                        onChange={handleAnswerChange}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between">
                            <p className="text-sm text-gray-500">
                                Question {currentQuestion + 1} of {quiz.questions.length}
                            </p>
                            <button
                                onClick={currentQuestion < quiz.questions.length - 1 ? nextQuestion : submitQuiz}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                            >
                                {currentQuestion < quiz.questions.length - 1 ? 'Next' : 'Submit'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={submitQuiz} className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400">
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
