import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';

function Archive() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div>
      <h2>Archive</h2>
      <div className="grid-container">
        <div className="grid-header">
          <div>Question</div>
          <div>Option A</div>
          <div>Votes for Option A</div>
          <div>Option B</div>
          <div>Votes for Option B</div>
        </div>
        {questions.map((question) => (
          <div key={question.id} className="grid-row">
            <div>{question.text}</div>
            <div>{question.optionA}</div>
            <div>{question.optionAVotes || 0}</div>
            <div>{question.optionB}</div>
            <div>{question.optionBVotes || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Archive;
