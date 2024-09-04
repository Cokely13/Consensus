import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { createUserResponse } from '../store/allUserResponsesStore';

function QuestionOfTheDay() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions || []); // Default to an empty array
  const { id: userId } = useSelector((state) => state.auth); // Get user ID from auth state
  const user = useSelector((state) => state.singleUser); // Get user details including responses
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Fetch questions and the user's data when the component mounts
    dispatch(fetchQuestions());
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (questions.length > 0 && user.user_responses && user.user_responses.length >= 0) {
      // Extract the question IDs the user has already voted on
      const votedQuestionIds = new Set(user.user_responses.map((response) => response.questionId));

      console.log("votedQuestion", votedQuestionIds)

      // Filter out questions the user hasn't voted on yet and have no consensus
      const questionsNotVotedOrExpired = questions.filter(
        (question) => !votedQuestionIds.has(question.id) && !question.consensus.length
      );

      // Select a random question from those not voted on and without consensus
      if (questionsNotVotedOrExpired.length > 0) {
        const randomIndex = Math.floor(Math.random() * questionsNotVotedOrExpired.length);
        setSelectedQuestion(questionsNotVotedOrExpired[randomIndex]);
      } else {
        setSelectedQuestion(null); // No questions left to vote on
      }
    }
  }, [questions, user]);

  const handleVote = (option) => {
    const responseOption = option === 'optionA' ? 'option_a' : 'option_b';
    const userResponse = {
      userId,
      questionId: selectedQuestion.id,
      response: responseOption,
    };

    dispatch(createUserResponse(userResponse));
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
        <div>{questions.length > 0 ? 'No more questions available to vote on.' : 'Loading questions...'}</div>
      )}
    </div>
  );
}

export default QuestionOfTheDay;
