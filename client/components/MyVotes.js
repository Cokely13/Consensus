// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchSingleUser } from '../store/singleUserStore';

// function MyVotes() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);
//   const { id: userId } = useSelector((state) => state.auth);
//   const user = useSelector((state) => state.singleUser);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);

//   useEffect(() => {
//     dispatch(fetchQuestions());
//     dispatch(fetchSingleUser(userId));
//   }, [dispatch, userId]);

//   useEffect(() => {
//     // Filter questions with dates today or in the past and status "accepted"
//     const today = new Date().toISOString().split('T')[0];
//     const filtered = questions.filter(
//       (question) => question.status === 'accepted' && question.dateAsked <= today
//     );

//     // Sort questions by dateAsked in descending order (newest first)
//     const sorted = [...filtered].sort(
//       (a, b) => new Date(b.dateAsked) - new Date(a.dateAsked)
//     );

//     setFilteredQuestions(sorted);
//   }, [questions]);

//   // Helper function to determine user's vote
//   const getUserVote = (questionId) => {
//     const userResponse = user.user_responses?.find(
//       (response) => response.questionId === questionId
//     );

//     if (!userResponse) return 'Did Not Vote';
//     return userResponse.response === 'option_a' ? 'Option A' : 'Option B';
//   };

//   return (
//     <div className="my-votes-container">
//       <h2>My Votes</h2>
//       {filteredQuestions.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Question</th>
//               <th>Option A</th>
//               <th>Option B</th>
//               <th>Date Asked</th>
//               {/* <th>Status</th> */}
//               <th>Your Vote</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredQuestions.map((question) => (
//               <tr key={question.id}>
//                 <td>{question.text}</td>
//                 <td>{question.optionA}</td>
//                 <td>{question.optionB}</td>
//                 <td>{new Date(question.dateAsked).toLocaleDateString()}</td>
//                 {/* <td>{question.status}</td> */}
//                 <td>{getUserVote(question.id)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="loading">Loading or No Votes Found...</p>
//       )}
//     </div>
//   );
// }

// export default MyVotes;

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

  // Helper function to determine user's vote and return the corresponding image
  const getUserVote = (question) => {
    const userResponse = user.user_responses?.find(
      (response) => response.questionId === question.id
    );

    if (!userResponse) return 'Did Not Vote';

    if (userResponse.response === 'option_a') {
      return (
        <img
          src={question.imageA}
          alt="Your Vote - Option A"
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
        />
      );
    } else if (userResponse.response === 'option_b') {
      return (
        <img
          src={question.imageB}
          alt="Your Vote - Option B"
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
        />
      );
    }
  };

  // return (
  //   <div className="my-votes-container">
  //     <h2>My Votes</h2>
  //     {filteredQuestions.length > 0 ? (
  //       <table className="myVotesGrid" >
  //         <thead>
  //           <tr>
  //             <th>Question</th>
  //             <th>Option A</th>
  //             <th>Option B</th>
  //             <th>Date Asked</th>
  //             <th>Your Vote</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {filteredQuestions.map((question) => (
  //             <tr key={question.id}>
  //               <td>{question.text}</td>
  //               <td>{question.optionA}</td>
  //               <td>{question.optionB}</td>
  //               <td>{new Date(question.dateAsked).toLocaleDateString()}</td>
  //               <td>{getUserVote(question)}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     ) : (
  //       <p className="loading">Loading or No Votes Found...</p>
  //     )}
  //   </div>
  // );
  return (
    <div className="my-votes-container">
      <h2>My Votes</h2>
      {filteredQuestions.length > 0 ? (
        <div className="myVotesGrid">
          <div className="myVotesGrid-header">Question</div>
          <div className="myVotesGrid-header">Option A</div>
          <div className="myVotesGrid-header">Option B</div>
          <div className="myVotesGrid-header">Date Asked</div>
          <div className="myVotesGrid-header">Your Vote</div>

          {filteredQuestions.map((question) => (
            <React.Fragment key={question.id}>
              <div className="myVotesGrid-cell">{question.text}</div>
              <div className="myVotesGrid-cell">{question.optionA}</div>
              <div className="myVotesGrid-cell">{question.optionB}</div>
              <div className="myVotesGrid-cell">{new Date(question.dateAsked).toLocaleDateString()}</div>
              <div className="myVotesGrid-cell">{getUserVote(question)}</div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="loading">Loading or No Votes Found...</p>
      )}
    </div>
  );

}

export default MyVotes;
