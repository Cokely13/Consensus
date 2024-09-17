import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { createConsensus } from '../store/allConsensusesStore';
import { updateSingleQuestion } from '../store/singleQuestionStore';

function Archive() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const calculateVotes = (userResponses, option) => {
    return userResponses.filter((response) => response.response === option).length;
  };

  const handleCreateConsensus = async (question) => {
    const optionAVotes = calculateVotes(question.user_responses, 'option_a');
    const optionBVotes = calculateVotes(question.user_responses, 'option_b');

    if (optionAVotes === optionBVotes) {
      alert('Cannot Do, No Consensus');
      return;
    }

    const consensusAnswer = optionAVotes > optionBVotes ? 'option_a' : 'option_b';

    await dispatch(
      createConsensus({
        questionId: question.id,
        consensusAnswer,
        calculatedAt: new Date().toISOString(),
      })
    );

    dispatch(fetchQuestions());
  };

  const handleReopenQuestion = async (question) => {
    await dispatch(updateSingleQuestion(question.id, { expired: false }));
    dispatch(fetchQuestions());
  };

  if (!user || !user.admin) {
    return <p>You Are not an Admin!</p>;
  }

  return (
    <div className="archive-page-container">
      <h2 className="archive-page-heading">Archive</h2>
      <div className="archive-grid-container">
        {/* Header Row */}
        <div className="archive-grid-header">Question</div>
        <div className="archive-grid-header">Option A</div>
        <div className="archive-grid-header">Votes for Option A</div>
        <div className="archive-grid-header">Option B</div>
        <div className="archive-grid-header">Votes for Option B</div>
        <div className="archive-grid-header">Date Asked</div>
        <div className="archive-grid-header">Action</div>

        {/* Data Rows */}
        {questions.map((question) => {
          const optionAVotes = calculateVotes(question.user_responses, 'option_a');
          const optionBVotes = calculateVotes(question.user_responses, 'option_b');

          const highlightOptionA = optionAVotes > optionBVotes ? 'highlight-option-a' : '';
          const highlightOptionB = optionBVotes > optionAVotes ? 'highlight-option-b' : '';

          const isExpired = question.consensus.length ? true : false;

          return (
            <React.Fragment key={question.id}>
              <div className="archive-grid-cell">{question.text}</div>
              <div className={`archive-grid-cell ${highlightOptionA}`}>{question.optionA}</div>
              <div className="archive-grid-cell">{optionAVotes}</div>
              <div className={`archive-grid-cell ${highlightOptionB}`}>{question.optionB}</div>
              <div className="archive-grid-cell">{optionBVotes}</div>
              <div className="archive-grid-cell">{new Date(question.dateAsked).toLocaleDateString()}</div>
              <div className="archive-grid-cell">
                {isExpired ? (
                  <button
                    className="archive-button"
                    onClick={() => handleReopenQuestion(question)}
                  >
                    Reopen the Question
                  </button>
                ) : (
                  <button
                    className="archive-button"
                    onClick={() => handleCreateConsensus(question)}
                  >
                    Create Consensus
                  </button>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Archive;
