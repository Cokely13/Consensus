

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
//         {questions.map((question) => (
//           <div key={question.id} className="grid-row">
//             <div>{question.text}</div>
//             <div>{question.optionA}</div>
//             <div>{calculateVotes(question.user_responses, 'option_a')}</div>
//             <div>{question.optionB}</div>
//             <div>{calculateVotes(question.user_responses, 'option_b')}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Archive;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';

function Archive() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const calculateVotes = (userResponses, option) => {
    return userResponses.filter((response) => response.response === option).length;
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
        </div>
        {questions.map((question) => {
          const optionAVotes = calculateVotes(question.user_responses, 'option_a');
          const optionBVotes = calculateVotes(question.user_responses, 'option_b');

          // Determine which option has more votes
          const highlightOptionA = optionAVotes > optionBVotes ? 'highlight' : '';
          const highlightOptionB = optionBVotes > optionAVotes ? 'highlight' : '';

          return (
            <div key={question.id} className="grid-row">
              <div>{question.text}</div>
              <div className={highlightOptionA}>{question.optionA}</div>
              <div >{optionAVotes}</div>
              <div className={highlightOptionB}>{question.optionB}</div>
              <div >{optionBVotes}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Archive;
