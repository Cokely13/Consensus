import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';

function QuestionOfTheDay() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    // Select a random question when questions are loaded
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setSelectedQuestion(questions[randomIndex]);
    }
  }, [questions]);

  const handleVote = (option) => {
    // Here you would typically make an API call to record the user's vote
    console.log(`User voted for: ${option}`);
    setHasVoted(true);
  };

  return (
    <div>
      {selectedQuestion ? (
        <div>
          <h2>Question of the Day</h2>
          <div>{selectedQuestion.text}</div>
          {!hasVoted ? (
            <div>
              <button onClick={() => handleVote('optionA')}>{selectedQuestion.optionA}</button>
              <button onClick={() => handleVote('optionB')}>{selectedQuestion.optionB}</button>
            </div>
          ) : (
            <div>You have already voted</div>
          )}
        </div>
      ) : (
        <div>Loading question...</div>
      )}
    </div>
  );
}

export default QuestionOfTheDay;
