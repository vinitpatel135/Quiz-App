import React from 'react';
import { ToastContainer } from 'react-toastify';
import QuizList from './screen/QuizList';
import QuizPage from './screen/QuizPage';
import ScoreSummary from './screen/ScoreSummary';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/score/:score" element={<ScoreSummary />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
