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

//   console.log("questions", questions);

//   return (
//     <div className="page-container">
//       <h2 className="page-heading">Questions</h2>
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
//               <td>{new Date(question.dateAsked).toLocaleDateString()}</td>
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
            {user.admin && <th>Action</th>} {/* Display Action column for admins */}
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
              {user.admin && ( // Show Edit button for admins
                <td>
                  <Link to={`/edit-question/${question.id}`}>
                    <button>Edit Question</button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Questions;
