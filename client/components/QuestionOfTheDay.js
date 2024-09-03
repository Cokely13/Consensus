import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { createUserResponse } from '../store/userResponsesStore'; // Import the createUserResponse action

function QuestionOfTheDay() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const { id } = useSelector(state => state.auth);
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
    // Create the userResponse object
    const userResponse = {
      userId: id, // Replace with actual logged-in user ID
      questionId: selectedQuestion.id,
      response: option,
    };

    // Dispatch the createUserResponse action to save the vote
    dispatch(createUserResponse(userResponse));

    // Set hasVoted to true to display the confirmation message
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
