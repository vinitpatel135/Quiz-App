import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../Common/Api';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    const getQuiz = async () => {
        try {
            const data = await api.listAllQuiz()
            console.log("All Quiz :-",data)
            setQuizzes(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // axios.get('/api/quizzes')
        //   .then(response => setQuizzes(response.data))
        //   .catch(error => console.log(error));
        getQuiz()
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <h1 className="text-4xl font-bold text-center mb-10">Available Quizzes</h1>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {quizzes.map(quiz => (
                    <Link to={`/quiz/${quiz._id}`} key={quiz._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300 hover:-translate-y-1">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold">{quiz.title}</h2>
                            <p className="text-gray-600 mt-4">{quiz.description}</p>
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Start Quiz</button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuizList;
