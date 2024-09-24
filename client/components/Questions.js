// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { Link } from 'react-router-dom';

// function Questions() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);
//   const user = useSelector((state) => state.auth); // Get user information

//   useEffect(() => {
//     dispatch(fetchQuestions());
//   }, [dispatch]);

//   // Sort questions by dateAsked in descending order (newest first)
//   const sortedQuestions = [...questions].sort(
//     (a, b) => new Date(b.dateAsked) - new Date(a.dateAsked)
//   );


//   return (
//     <div className="page-container">
//       <h2 className="page-heading">Questions</h2>
//       <table className="questionstable-custom">
//         <thead>
//           <tr>
//             <th>Question</th>
//             <th>Option A</th>
//             <th>Image A</th>
//             <th>Option B</th>
//             <th>Image B</th>
//             <th>Date Asked</th>
//             <th>Status</th>
//             {user.admin && <th>Action</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedQuestions.map((question) => (
//             <tr key={question.id}>
//               <td>{question.text}</td>
//               <td>{question.optionA}</td>
//               <td>
//                 {question.imageA && (
//                   <img
//                     src={question.imageA}
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                   />
//                 )}
//               </td>
//               <td>{question.optionB}</td>
//               <td>
//                 {question.imageB && (
//                   <img
//                     src={question.imageB}
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                   />
//                 )}
//               </td>
//               <td>{new Date(question.dateAsked).toLocaleDateString()}</td>
//               <td>{question.status}</td>
//               {user.admin && (
//                 <td>
//                   <Link to={`/edit-question/${question.id}`}>
//                     <button className="edit-button">Edit Question</button>
//                   </Link>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Questions;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { Link } from 'react-router-dom';

function Questions() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const user = useSelector((state) => state.auth); // Get user information

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // Sort questions by dateAsked in descending order (newest first)
  const sortedQuestions = [...questions].sort(
    (a, b) => new Date(b.dateAsked) - new Date(a.dateAsked)
  );

  return (
    <div className="questions-page-container">
      <h2 className="questions-page-heading">Questions</h2>
      <div className="questions-grid">
        {/* Grid Headers */}
        <div className="questions-grid-header">Question</div>
        <div className="questions-grid-header">Option A</div>
        <div className="questions-grid-header">Image A</div>
        <div className="questions-grid-header">Option B</div>
        <div className="questions-grid-header">Image B</div>
        <div className="questions-grid-header">Date Asked</div>
        <div className="questions-grid-header">Status</div>
        {user.admin && <div className="questions-grid-header">Action</div>}

        {/* Grid Rows */}
        {sortedQuestions.map((question) => (
          <React.Fragment key={question.id}>
            <div className="questions-grid-cell">{question.text}</div>
            <div className="questions-grid-cell">{question.optionA}</div>
            <div className="questions-grid-cell">
              {question.imageA && (
                <img
                  src={question.imageA}
                  alt="Option A"
                  className="questions-image"
                />
              )}
            </div>
            <div className="questions-grid-cell">{question.optionB}</div>
            <div className="questions-grid-cell">
              {question.imageB && (
                <img
                  src={question.imageB}
                  alt="Option B"
                  className="questions-image"
                />
              )}
            </div>
            <div className="questions-grid-cell">
              {new Date(question.dateAsked).toLocaleDateString()}
            </div>
            <div className="questions-grid-cell">{question.status}</div>
            {user.admin && (
              <div className="questions-grid-cell">
                <Link to={`/edit-question/${question.id}`}>
                  <button className="questions-edit-button">Edit Question</button>
                </Link>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Questions;
