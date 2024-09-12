// // import { useDispatch, useSelector } from 'react-redux';
// // import React, { useEffect, useState } from 'react';
// // import { fetchQuestions } from '../store/allQuestionsStore';
// // import { Link } from 'react-router-dom';



// // function Questions() {
// //   const dispatch = useDispatch();
// //   const questions = useSelector((state) => state.allQuestions);


// //   useEffect(() => {
// //     dispatch(fetchQuestions());
// //   }, [dispatch]);


// //   return (
// //     <div>
// //     <div>Questions</div>
// //     <div>
// //         {questions.map((question) => (
// //           <div key={question.id}>
// //             <div>{question.text}</div>
// //             <div>{question.optionA}</div>
// //             <div>{question.optionB}</div>
// //             <div>{question.dateAsked}</div>
// //             <div>{question.status}</div>
// //             </div>))}
// //     </div>
// //     </div>
// //   )
// // }

// // export default Questions


// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { fetchQuestions } from '../store/allQuestionsStore';

// function Questions() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);

//   useEffect(() => {
//     dispatch(fetchQuestions());
//   }, [dispatch]);

//   // Sort questions by dateAsked in descending order (newest first)
//   const sortedQuestions = [...questions].sort(
//     (a, b) => new Date(b.dateAsked) - new Date(a.dateAsked)
//   );

//   console.log("questions", questions)

//   return (
//     <div>
//       <h2>Questions</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Question</th>
//             <th>Option A</th>
//             <th>Option B</th>
//             <th>Date Asked</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedQuestions.map((question) => (
//             <tr key={question.id}>
//               <td>{question.text}</td>
//               <td>{question.optionA}</td>
//               <td>{question.optionB}</td>
//               <td>{question.dateAsked}</td>
//               <td>{question.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Questions;

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchQuestions } from '../store/allQuestionsStore';

function Questions() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // Sort questions by dateAsked in descending order (newest first)
  const sortedQuestions = [...questions].sort(
    (a, b) => new Date(b.dateAsked) - new Date(a.dateAsked)
  );

  console.log("questions", questions);

  return (
    <div className="page-container">
      <h2 className="page-heading">Questions</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Date Asked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedQuestions.map((question) => (
            <tr key={question.id}>
              <td>{question.text}</td>
              <td>{question.optionA}</td>
              <td>{question.optionB}</td>
              <td>{new Date(question.dateAsked).toLocaleDateString()}</td>
              <td>{question.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Questions;
