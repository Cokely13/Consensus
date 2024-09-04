

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchQuestions } from '../store/allQuestionsStore';

// function Archive() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);

//   useEffect(() => {
//     dispatch(fetchQuestions());
//   }, [dispatch]);

//   const calculateVotes = (userResponses, option) => {
//     return userResponses.filter((response) => response.response === option).length;
//   };

//   return (
//     <div>
//       <h2>Archive</h2>
//       <div className="grid-container">
//         <div className="grid-header">
//           <div>Question</div>
//           <div>Option A</div>
//           <div>Votes for Option A</div>
//           <div>Option B</div>
//           <div>Votes for Option B</div>
//         </div>
//         {questions.map((question) => {
//           const optionAVotes = calculateVotes(question.user_responses, 'option_a');
//           const optionBVotes = calculateVotes(question.user_responses, 'option_b');

//           // Determine which option has more votes
//           const highlightOptionA = optionAVotes > optionBVotes ? 'highlight' : '';
//           const highlightOptionB = optionBVotes > optionAVotes ? 'highlight' : '';

//           return (
//             <div key={question.id} className="grid-row">
//               <div>{question.text}</div>
//               <div className={highlightOptionA}>{question.optionA}</div>
//               <div >{optionAVotes}</div>
//               <div className={highlightOptionB}>{question.optionB}</div>
//               <div >{optionBVotes}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Archive;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { createConsensus } from '../store/allConsensusesStore'; // Import createConsensus action
import { updateSingleQuestion } from '../store/singleQuestionStore'; // Import updateQuestion action

function Archive() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const calculateVotes = (userResponses, option) => {
    return userResponses.filter((response) => response.response === option).length;
  };

  const handleCreateConsensus = (question) => {
    const optionAVotes = calculateVotes(question.user_responses, 'option_a');
    const optionBVotes = calculateVotes(question.user_responses, 'option_b');

    if (optionAVotes === optionBVotes) {
      alert('Cannot Do, No Consensus');
      return;
    }

    // Determine the consensus answer
    const consensusAnswer = optionAVotes > optionBVotes ? 'option_a' : 'option_b';

    // Update the question to mark it as expired
    // dispatch(updateSingleQuestion(question.id, { expired: true }));

    // Create a new consensus
    dispatch(
      createConsensus({
        questionId: question.id,
        consensusAnswer,
        calculatedAt: new Date().toISOString(),
      })
    );
  };

  const handleReopenQuestion = (question) => {
    // Reopen the question by setting expired to false
    dispatch(updateQuestion(question.id, { expired: false }));
  };

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
          <div>Action</div>
        </div>
        {questions.map((question) => {
          const optionAVotes = calculateVotes(question.user_responses, 'option_a');
          const optionBVotes = calculateVotes(question.user_responses, 'option_b');

          const highlightOptionA = optionAVotes > optionBVotes ? 'highlight' : '';
          const highlightOptionB = optionBVotes > optionAVotes ? 'highlight' : '';

          const hasConsensus = optionAVotes !== optionBVotes;
          const isExpired = question.consensus.length ? true : false

          return (
            <div key={question.id} className="grid-row">
              <div>{question.text}</div>
              <div className={highlightOptionA}>{question.optionA}</div>
              <div>{optionAVotes}</div>
              <div className={highlightOptionB}>{question.optionB}</div>
              <div>{optionBVotes}</div>
              <div>
                {isExpired ? (
                  <button onClick={() => handleReopenQuestion(question)}>
                    Reopen the Question
                  </button>
                ) : (
                  <button onClick={() => handleCreateConsensus(question)}>
                    Create Consensus
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Archive;
