// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchUsers } from '../store/allUsersStore';
// import { fetchQuestions } from '../store/allQuestionsStore';

// function UserDetailPage() {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   const { id: mainUserId } = useSelector((state) => state.auth);
//   const users = useSelector((state) => state.allUsers);
//   const questions = useSelector((state) => state.allQuestions);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [similarityScore, setSimilarityScore] = useState(0);

//   useEffect(() => {
//     dispatch(fetchUsers());
//     dispatch(fetchQuestions());
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (users.length > 0) {
//       const foundUser = users.find((user) => user.id === Number(userId));
//       setSelectedUser(foundUser);
//     }
//   }, [users, userId]);

//   useEffect(() => {
//     if (selectedUser && selectedUser.user_responses && questions.length > 0) {
//       const mainUser = users.find((user) => user.id === mainUserId);

//       if (!mainUser || !mainUser.user_responses) return;

//       // Create a Set of question IDs both users have answered
//       const answeredByMainUser = new Set(mainUser.user_responses.map((response) => response.questionId));
//       const answeredByOtherUser = new Set(selectedUser.user_responses.map((response) => response.questionId));

//       // Get the intersection of the two sets to find common questions
//       const commonQuestionIds = [...answeredByMainUser].filter((questionId) =>
//         answeredByOtherUser.has(questionId)
//       );

//       // Calculate similarity score
//       const sameAnswersCount = commonQuestionIds.reduce((count, questionId) => {
//         const mainUserResponse = mainUser.user_responses.find((response) => response.questionId === questionId);
//         const otherUserResponse = selectedUser.user_responses.find((response) => response.questionId === questionId);

//         return mainUserResponse.response === otherUserResponse.response ? count + 1 : count;
//       }, 0);

//       const similarity = commonQuestionIds.length > 0 ? ((sameAnswersCount / commonQuestionIds.length) * 100).toFixed(2) : 0;
//       setSimilarityScore(similarity);
//     }
//   }, [selectedUser, users, questions, mainUserId]);

//   return (
//     <div className="user-detail-page-container">
//       {selectedUser ? (
//         <>
//           {/* Display User Image */}
//           {selectedUser.image && (
//             <img
//               src={selectedUser.image}
//               alt={selectedUser.username}
//               className="userdetail-image-thumbnail"
//             />
//           )}
//           <h2 className="user-detail-page-heading">{selectedUser.username}'s Profile</h2>
//           <div className="user-detail-info">
//             <p><strong>Career High Win Streak:</strong> {selectedUser.careerHighWinStreak}</p>
//             <p><strong>Career High Loss Streak:</strong> {selectedUser.careerHighLossStreak}</p>
//             <p><strong>Career High No Vote Streak:</strong> {selectedUser.careerHighNoVoteStreak}</p>
//             <p><strong>Similarity with you:</strong> {similarityScore}%</p>
//           </div>
//         </>
//       ) : (
//         <p className="loading-message">Loading user data...</p>
//       )}
//     </div>
//   );
// }

// export default UserDetailPage;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../store/allUsersStore';
import { fetchQuestions } from '../store/allQuestionsStore';


function UserDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { id: mainUserId } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.allUsers);
  const questions = useSelector((state) => state.allQuestions);
  const [selectedUser, setSelectedUser] = useState(null);
  const [similarityScore, setSimilarityScore] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((user) => user.id === Number(userId));
      setSelectedUser(foundUser);
    }
  }, [users, userId]);

  useEffect(() => {
    if (selectedUser && selectedUser.user_responses && questions.length > 0) {
      const mainUser = users.find((user) => user.id === mainUserId);

      if (!mainUser || !mainUser.user_responses) return;

      // Create a Set of question IDs both users have answered
      const answeredByMainUser = new Set(
        mainUser.user_responses.map((response) => response.questionId)
      );
      const answeredByOtherUser = new Set(
        selectedUser.user_responses.map((response) => response.questionId)
      );

      // Get the intersection of the two sets to find common questions
      const commonQuestionIds = [...answeredByMainUser].filter((questionId) =>
        answeredByOtherUser.has(questionId)
      );

      // Calculate similarity score
      const sameAnswersCount = commonQuestionIds.reduce((count, questionId) => {
        const mainUserResponse = mainUser.user_responses.find(
          (response) => response.questionId === questionId
        );
        const otherUserResponse = selectedUser.user_responses.find(
          (response) => response.questionId === questionId
        );

        return mainUserResponse.response === otherUserResponse.response ? count + 1 : count;
      }, 0);

      const similarity =
        commonQuestionIds.length > 0
          ? ((sameAnswersCount / commonQuestionIds.length) * 100).toFixed(2)
          : 0;
      setSimilarityScore(similarity);
    }
  }, [selectedUser, users, questions, mainUserId]);

  return (
    <div className="user-detail-page-container">
      {selectedUser ? (
        <div className="userdetail-detail-card">
          <div className="userdetail-detail-header">
            <div className="userdetail-image-container">
              {selectedUser.image ? (
                <img src={selectedUser.image} alt={selectedUser.username} />
              ) : (
                <div className="placeholder">
                  <i className="fas fa-user-circle"></i>
                </div>
              )}
            </div>
            <h2 className="userdetail-detail-page-heading">{selectedUser.username}'s Profile</h2>
          </div>
          <div className="userdetail-detail-stats">
            <div className="userdetailstat-item">
              <i className="fas fa-trophy"></i>
              <p>Career High Win Streak</p>
              <h3>{selectedUser.careerHighWinStreak} days</h3>
            </div>
            <div className="userdetailstat-item">
              <i className="fas fa-thumbs-down"></i>
              <p>Career High Loss Streak</p>
              <h3>{selectedUser.careerHighLossStreak} days</h3>
            </div>
            <div className="userdetailstat-item">
              <i className="fas fa-user-clock"></i>
              <p>Career High No Vote Streak</p>
              <h3>{selectedUser.careerHighNoVoteStreak} days</h3>
            </div>
            <div className="userdetailstat-item">
              <i className="fas fa-user-friends"></i>
              <p>Similarity with You</p>
              <h3>{similarityScore}%</h3>
            </div>
          </div>
        </div>
      ) : (
        <p className="userdetailloading-message">Loading user data...</p>
      )}
    </div>
  );
}

export default UserDetailPage;
