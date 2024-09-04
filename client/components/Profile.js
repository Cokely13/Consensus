// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchSingleUser } from '../store/singleUserStore';
// import { fetchQuestions } from '../store/allQuestionsStore';

// function Profile() {
//   const dispatch = useDispatch();
//   const { id } = useSelector((state) => state.auth);
//   const user = useSelector((state) => state.singleUser);
//   const questions = useSelector((state) => state.allQuestions);

//   console.log("user", user)

//   useEffect(() => {
//     // Fetch user and questions when component mounts
//     dispatch(fetchSingleUser(id));
//     dispatch(fetchQuestions());
//   }, [dispatch, id]);

//   const calculateVotes = (userResponses, option) => {
//     return userResponses.filter((response) => response.response === option).length;
//   };

//   const getTotalQuestionsAnswered = () => {
//     return user.user_responses ? user.user_responses.length : 0;
//   };

//   const getPercentagePopularAnswers = () => {
//     if (!user.user_responses|| user.user_responses.length === 0) return 0;

//     const popularAnswersCount = user.user_responses.reduce((count, userResponse) => {
//       const question = questions.find((q) => q.id === userResponse.questionId);
//       if (!question) return count;

//       const optionAVotes = calculateVotes(question.user_responses, 'option_a');
//       const optionBVotes = calculateVotes(question.user_responses, 'option_b');

//       const mostPopularAnswer = optionAVotes > optionBVotes ? 'option_a' : 'option_b';

//       return userResponse.response === mostPopularAnswer ? count + 1 : count;
//     }, 0);

//     return ((popularAnswersCount / user.user_responses.length) * 100).toFixed(2);
//   };

//   return (
//     <div>
//       <h2>Profile</h2>
//       {user ? (
//         <div>
//           <p>Username: {user.username}</p>
//           <p>Total Questions Answered: {getTotalQuestionsAnswered()}</p>
//           <p>Percentage of Popular Answers: {getPercentagePopularAnswers()}%</p>
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchQuestions } from '../store/allQuestionsStore';

function Profile() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const questions = useSelector((state) => state.allQuestions);

  useEffect(() => {
    // Fetch user and questions when component mounts
    dispatch(fetchSingleUser(id));
    dispatch(fetchQuestions());
  }, [dispatch, id]);

  const calculateVotes = (userResponses, option) => {
    return userResponses.filter((response) => response.response === option).length;
  };

  const getTotalQuestionsAnswered = () => {
    return user.user_responses ? user.user_responses.length : 0;
  };

  const getPercentagePopularAnswers = () => {
    if (!user.user_responses || user.user_responses.length === 0) return 0;

    const popularAnswersCount = user.user_responses.reduce((count, userResponse) => {
      const question = questions.find((q) => q.id === userResponse.questionId);
      if (!question) return count;

      const optionAVotes = calculateVotes(question.user_responses, 'option_a');
      const optionBVotes = calculateVotes(question.user_responses, 'option_b');

      const mostPopularAnswer = optionAVotes > optionBVotes ? 'option_a' : 'option_b';

      return userResponse.response === mostPopularAnswer ? count + 1 : count;
    }, 0);

    return ((popularAnswersCount / user.user_responses.length) * 100).toFixed(2);
  };

  const getConsensusCount = () => {
    if (!user.user_responses || user.user_responses.length === 0) return 0;

    const consensusCount = user.user_responses.reduce((count, userResponse) => {
      const question = questions.find((q) => q.id === userResponse.questionId);
      if (!question || !question.consensus || !question.consensus.length) return count;

      const consensusAnswer = question.consensus[0].consensusAnswer; // Assuming single consensus per question

      return userResponse.response === consensusAnswer ? count + 1 : count;
    }, 0);

    return consensusCount;
  };

  const getSoleDissenterCount = () => {
    if (!user.user_responses || user.user_responses.length === 0) return 0;

    const soleDissenterCount = user.user_responses.reduce((count, userResponse) => {
      const question = questions.find((q) => q.id === userResponse.questionId);
      if (!question) return count;

      const userResponseCount = calculateVotes(question.user_responses, userResponse.response);

      // If user is the only one who voted for their answer
      return userResponseCount === 1 ? count + 1 : count;
    }, 0);

    return soleDissenterCount;
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Total Questions Answered: {getTotalQuestionsAnswered()}</p>
          <p>Percentage of Popular Answers: {getPercentagePopularAnswers()}%</p>
          <p>With Consensus: {getConsensusCount()}</p>
          <p>Sole Dissenter: {getSoleDissenterCount()}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;
