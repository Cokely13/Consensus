import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSingleUser } from '../store/singleUserStore';

function MyVotes() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const { id: userId } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    // Filter questions with dates today or in the past and status "accepted"
    const today = new Date().toISOString().split('T')[0];
    const filtered = questions.filter(
      (question) => question.status === 'accepted' && question.dateAsked <= today
    );

    // Sort questions by dateAsked in descending order (newest first)
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.dateAsked) - new Date(a.dateAsked)
    );

    setFilteredQuestions(sorted);
  }, [questions]);

  // Helper function to determine user's vote
  const getUserVote = (questionId) => {
    const userResponse = user.user_responses?.find(
      (response) => response.questionId === questionId
    );

    if (!userResponse) return 'Did Not Vote';
    return userResponse.response === 'option_a' ? 'Option A' : 'Option B';
  };

  return (
    <div>
      <h2>My Votes</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Date Asked</th>
            <th>Status</th>
            <th>Your Vote</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question) => (
            <tr key={question.id}>
              <td>{question.text}</td>
              <td>{question.optionA}</td>
              <td>{question.optionB}</td>
              <td>{question.dateAsked}</td>
              <td>{question.status}</td>
              <td>{getUserVote(question.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyVotes;
