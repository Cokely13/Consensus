// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchQuestions } from '../store/allQuestionsStore';
// // import { fetchSingleUser } from '../store/singleUserStore';
// // import { createUserResponse } from '../store/allUserResponsesStore';

// // function QuestionOfTheDay() {
// //   const dispatch = useDispatch();
// //   const questions = useSelector((state) => state.allQuestions || []); // Default to an empty array
// //   const { id: userId } = useSelector((state) => state.auth); // Get user ID from auth state
// //   const user = useSelector((state) => state.singleUser); // Get user details including responses
// //   const [selectedQuestion, setSelectedQuestion] = useState(null);
// //   const [hasVoted, setHasVoted] = useState(false);
// //   const [timeLeft, setTimeLeft] = useState('');
// //   const [yesterdayConsensus, setYesterdayConsensus] = useState('');
// //   const [yesterdayQuestionText, setYesterdayQuestionText] = useState('');
// //   const [yesterdayResult, setYesterdayResult] = useState('');
// //   const [todayDate, setTodayDate] = useState(''); // State to hold today's date

// //   useEffect(() => {
// //     // Fetch questions and the user's data when the component mounts
// //     dispatch(fetchQuestions());
// //     dispatch(fetchSingleUser(userId));

// //     // Set today's date in YYYY-MM-DD format
// //     const today = new Date().toISOString().split('T')[0];
// //     setTodayDate(today);
// //   }, [dispatch, userId]);

// //   useEffect(() => {
// //     if (questions.length > 0 && user.user_responses) {
// //       // Find today's question
// //       const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
// //       const todayQuestion = questions.find(
// //         (question) => question.dateAsked === today
// //       );

// //       if (todayQuestion) {
// //         setSelectedQuestion(todayQuestion);

// //         // Check if the user has already voted on today's question
// //         const hasUserVoted = user.user_responses.some(
// //           (response) => response.questionId === todayQuestion.id
// //         );

// //         setHasVoted(hasUserVoted);
// //       } else {
// //         setSelectedQuestion(null); // No question for today
// //       }

// //       // Determine yesterday's question and consensus
// //       const yesterday = new Date();
// //       yesterday.setDate(yesterday.getDate() - 1);
// //       const yesterdayDate = yesterday.toISOString().split('T')[0]; // Get yesterday's date in YYYY-MM-DD format
// //       const yesterdayQuestion = questions.find(
// //         (question) => question.dateAsked === yesterdayDate
// //       );

// //       if (yesterdayQuestion) {
// //         setYesterdayQuestionText(
// //           `Yesterday's question was ${yesterdayQuestion.optionA} or ${yesterdayQuestion.optionB}.`
// //         );

// //         if (yesterdayQuestion.consensus.length > 0) {
// //           const consensusAnswer = yesterdayQuestion.consensus[0].consensusAnswer;
// //           const otherOption =
// //             consensusAnswer === 'option_a' ? yesterdayQuestion.optionB : yesterdayQuestion.optionA;
// //           const consensusOption =
// //             consensusAnswer === 'option_a' ? yesterdayQuestion.optionA : yesterdayQuestion.optionB;
// //           setYesterdayConsensus(
// //             `The consensus yesterday was that ${consensusOption} is better than ${otherOption}.`
// //           );

// //           // Check if the user voted on yesterday's question
// //           const userResponse = user.user_responses.find(
// //             (response) => response.questionId === yesterdayQuestion.id
// //           );

// //           if (userResponse) {
// //             if (userResponse.response === consensusAnswer) {
// //               setYesterdayResult('You were right yesterday!');
// //             } else {
// //               setYesterdayResult('You were WRONG yesterday!');
// //             }
// //           } else {
// //             setYesterdayResult("You didn't vote yesterday!!");
// //           }
// //         } else {
// //           setYesterdayConsensus('No consensus was reached yesterday.');
// //           setYesterdayResult(''); // No result if no consensus was reached
// //         }
// //       } else {
// //         setYesterdayQuestionText('No question was asked yesterday.');
// //         setYesterdayConsensus('');
// //         setYesterdayResult('');
// //       }
// //     }
// //   }, [questions, user]);

// //   useEffect(() => {
// //     const calculateTimeLeft = () => {
// //       const now = new Date();
// //       const midnight = new Date();
// //       midnight.setHours(24, 0, 0, 0); // Set to midnight

// //       const timeDifference = midnight - now;

// //       if (timeDifference > 0) {
// //         const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
// //         const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
// //         const seconds = Math.floor((timeDifference / 1000) % 60);
// //         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
// //       } else {
// //         setTimeLeft('Time is up!');
// //       }
// //     };

// //     // Initial call
// //     calculateTimeLeft();

// //     // Update every second
// //     const timer = setInterval(calculateTimeLeft, 1000);

// //     // Clear the interval on component unmount
// //     return () => clearInterval(timer);
// //   }, []);

// //   const handleVote = (option) => {
// //     const responseOption = option === 'optionA' ? 'option_a' : 'option_b';
// //     const userResponse = {
// //       userId,
// //       questionId: selectedQuestion.id,
// //       response: responseOption,
// //     };

// //     dispatch(createUserResponse(userResponse));
// //     setHasVoted(true);
// //   };

// //   return (
// //     <div>
// //       <h4>Today's Date is: {todayDate}</h4>
// //       <div>{yesterdayQuestionText}</div>
// //       <div>{yesterdayConsensus}</div>
// //       <div>{yesterdayResult}</div>
// //       <h3>
// //         {hasVoted ? 'Time Until the Next Question:' : 'Time Left to Answer the Question:'} {timeLeft}
// //       </h3>
// //       {selectedQuestion ? (
// //         <div>
// //           <h2>Question of the Day</h2>
// //           <div>{selectedQuestion.text}</div>
// //           {!hasVoted ? (
// //             <div>
// //               <button onClick={() => handleVote('optionA')}>{selectedQuestion.optionA}</button>
// //               <button onClick={() => handleVote('optionB')}>{selectedQuestion.optionB}</button>
// //             </div>
// //           ) : (
// //             <div>You have already voted</div>
// //           )}
// //         </div>
// //       ) : (
// //         <div>{questions.length > 0 ? 'No question for today.' : 'Loading questions...'}</div>
// //       )}
// //     </div>
// //   );
// // }

// // export default QuestionOfTheDay;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchSingleUser } from '../store/singleUserStore';
// import { createUserResponse } from '../store/allUserResponsesStore';

// function QuestionOfTheDay() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions || []); // Default to an empty array
//   const { id: userId } = useSelector((state) => state.auth); // Get user ID from auth state
//   const user = useSelector((state) => state.singleUser); // Get user details including responses
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState('');
//   const [yesterdayConsensus, setYesterdayConsensus] = useState('');
//   const [yesterdayQuestionText, setYesterdayQuestionText] = useState('');
//   const [yesterdayResult, setYesterdayResult] = useState('');
//   const [streak, setStreak] = useState({ correct: 0, incorrect: 0, noVote: 0 });

//   useEffect(() => {
//     // Fetch questions and the user's data when the component mounts
//     dispatch(fetchQuestions());
//     dispatch(fetchSingleUser(userId));
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (questions.length > 0 && user.user_responses) {
//       // Find today's question
//       const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//       const todayQuestion = questions.find((question) => question.dateAsked === today);

//       if (todayQuestion) {
//         setSelectedQuestion(todayQuestion);

//         // Check if the user has already voted on today's question
//         const hasUserVoted = user.user_responses.some(
//           (response) => response.questionId === todayQuestion.id
//         );

//         setHasVoted(hasUserVoted);
//       } else {
//         setSelectedQuestion(null); // No question for today
//       }

//       // Determine yesterday's question and consensus
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);
//       const yesterdayDate = yesterday.toISOString().split('T')[0];
//       const yesterdayQuestion = questions.find(
//         (question) => question.dateAsked === yesterdayDate
//       );

//       if (yesterdayQuestion) {
//         setYesterdayQuestionText(
//           `Yesterday's question was ${yesterdayQuestion.optionA} or ${yesterdayQuestion.optionB}.`
//         );

//         if (yesterdayQuestion.consensus.length > 0) {
//           const consensusAnswer = yesterdayQuestion.consensus[0].consensusAnswer;
//           const otherOption =
//             consensusAnswer === 'option_a' ? yesterdayQuestion.optionB : yesterdayQuestion.optionA;
//           const consensusOption =
//             consensusAnswer === 'option_a' ? yesterdayQuestion.optionA : yesterdayQuestion.optionB;
//           setYesterdayConsensus(
//             `The consensus yesterday was that ${consensusOption} is better than ${otherOption}.`
//           );

//           // Check if the user voted on yesterday's question
//           const userResponse = user.user_responses.find(
//             (response) => response.questionId === yesterdayQuestion.id
//           );

//           if (userResponse) {
//             if (userResponse.response === consensusAnswer) {
//               setYesterdayResult('You were right yesterday!');
//               calculateStreak(user.user_responses, 'correct');
//             } else {
//               setYesterdayResult('You were WRONG yesterday!');
//               calculateStreak(user.user_responses, 'incorrect');
//             }
//           } else {
//             setYesterdayResult("You didn't vote yesterday!!");
//             calculateStreak(user.user_responses, 'noVote');
//           }
//         } else {
//           setYesterdayConsensus('No consensus was reached yesterday.');
//           setYesterdayResult(''); // No result if no consensus was reached
//         }
//       } else {
//         setYesterdayQuestionText('No question was asked yesterday.');
//         setYesterdayConsensus('');
//         setYesterdayResult('');
//       }
//     }
//   }, [questions, user]);

//   const calculateStreak = (userResponses, streakType) => {
//     let currentStreak = 0;
//     let noVoteStreak = 0;

//     // Sort responses by date descending
//     const sortedResponses = userResponses.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );

//     for (let i = 0; i < sortedResponses.length; i++) {
//       const response = sortedResponses[i];
//       const question = questions.find((q) => q.id === response.questionId);
//       if (!question) continue; // Skip if the question is not found

//       const consensus = question.consensus.length > 0 ? question.consensus[0].consensusAnswer : null;
//       if (!consensus) continue; // Skip if there's no consensus for the question

//       if (streakType === 'correct' && response.response === consensus) {
//         currentStreak++;
//       } else if (streakType === 'incorrect' && response.response !== consensus) {
//         currentStreak++;
//       } else if (streakType === 'noVote' && response.response === null) {
//         noVoteStreak++;
//       } else {
//         break; // Streak ends if a different condition is met
//       }
//     }

//     setStreak({
//       correct: streakType === 'correct' ? currentStreak : 0,
//       incorrect: streakType === 'incorrect' ? currentStreak : 0,
//       noVote: streakType === 'noVote' ? noVoteStreak : 0,
//     });
//   };

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const now = new Date();
//       const midnight = new Date();
//       midnight.setHours(24, 0, 0, 0); // Set to midnight

//       const timeDifference = midnight - now;

//       if (timeDifference > 0) {
//         const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
//         const seconds = Math.floor((timeDifference / 1000) % 60);
//         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
//       } else {
//         setTimeLeft('Time is up!');
//       }
//     };

//     // Initial call
//     calculateTimeLeft();

//     // Update every second
//     const timer = setInterval(calculateTimeLeft, 1000);

//     // Clear the interval on component unmount
//     return () => clearInterval(timer);
//   }, []);

//   const handleVote = (option) => {
//     const responseOption = option === 'optionA' ? 'option_a' : 'option_b';
//     const userResponse = {
//       userId,
//       questionId: selectedQuestion.id,
//       response: responseOption,
//     };

//     dispatch(createUserResponse(userResponse));
//     setHasVoted(true);
//   };

//   return (
//     <div>
//       <h3>Today's Date: {new Date().toLocaleDateString()}</h3>
//       <div>{yesterdayQuestionText}</div>
//       <div>{yesterdayConsensus}</div>
//       <div>{yesterdayResult}</div>
//       <h3>
//         {hasVoted ? 'Time Until the Next Question:' : 'Time Left to Answer the Question:'} {timeLeft}
//       </h3>
//       <h4>Streak:</h4>
//       <p>Correct Streak: {streak.correct} days</p>
//       <p>Incorrect Streak: {streak.incorrect} days</p>
//       <p>No Vote Streak: {streak.noVote} days</p>
//       {selectedQuestion ? (
//         <div>
//           <h2>Question of the Day</h2>
//           <div>{selectedQuestion.text}</div>
//           {!hasVoted ? (
//             <div>
//               <button onClick={() => handleVote('optionA')}>{selectedQuestion.optionA}</button>
//               <button onClick={() => handleVote('optionB')}>{selectedQuestion.optionB}</button>
//             </div>
//           ) : (
//             <div>You have already voted</div>
//           )}
//         </div>
//       ) : (
//         <div>{questions.length > 0 ? 'No question for today.' : 'Loading questions...'}</div>
//       )}
//     </div>
//   );
// }

// export default QuestionOfTheDay;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { createUserResponse } from '../store/allUserResponsesStore';

function QuestionOfTheDay() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions || []); // Default to an empty array
  const { id: userId } = useSelector((state) => state.auth); // Get user ID from auth state
  const user = useSelector((state) => state.singleUser); // Get user details including responses
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [yesterdayConsensus, setYesterdayConsensus] = useState('');
  const [yesterdayQuestionText, setYesterdayQuestionText] = useState('');
  const [yesterdayResult, setYesterdayResult] = useState('');
  const [streak, setStreak] = useState({ correct: 0, incorrect: 0, noVote: 0 });

  useEffect(() => {
    // Fetch questions and the user's data when the component mounts
    dispatch(fetchQuestions());
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (questions.length > 0 && user.user_responses) {
      // Find today's question
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const todayQuestion = questions.find((question) => question.dateAsked === today);

      if (todayQuestion) {
        setSelectedQuestion(todayQuestion);

        // Check if the user has already voted on today's question
        const hasUserVoted = user.user_responses.some(
          (response) => response.questionId === todayQuestion.id
        );

        setHasVoted(hasUserVoted);
      } else {
        setSelectedQuestion(null); // No question for today
      }

      // Determine yesterday's question and consensus
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split('T')[0];
      const yesterdayQuestion = questions.find(
        (question) => question.dateAsked === yesterdayDate
      );

      if (yesterdayQuestion) {
        setYesterdayQuestionText(
          `Yesterday's question was ${yesterdayQuestion.optionA} or ${yesterdayQuestion.optionB}.`
        );

        if (yesterdayQuestion.consensus.length > 0) {
          const consensusAnswer = yesterdayQuestion.consensus[0].consensusAnswer;
          const otherOption =
            consensusAnswer === 'option_a' ? yesterdayQuestion.optionB : yesterdayQuestion.optionA;
          const consensusOption =
            consensusAnswer === 'option_a' ? yesterdayQuestion.optionA : yesterdayQuestion.optionB;
          setYesterdayConsensus(
            `The consensus yesterday was that ${consensusOption} is better than ${otherOption}.`
          );

          // Check if the user voted on yesterday's question
          const userResponse = user.user_responses.find(
            (response) => response.questionId === yesterdayQuestion.id
          );

          if (userResponse) {
            if (userResponse.response === consensusAnswer) {
              setYesterdayResult('You were right yesterday!');
              calculateStreak(user.user_responses, 'correct');
            } else {
              setYesterdayResult('You were WRONG yesterday!');
              calculateStreak(user.user_responses, 'incorrect');
            }
          } else {
            setYesterdayResult("You didn't vote yesterday!!");
            calculateStreak(user.user_responses, 'noVote');
          }
        } else {
          setYesterdayConsensus('No consensus was reached yesterday.');
          setYesterdayResult(''); // No result if no consensus was reached
        }
      } else {
        setYesterdayQuestionText('No question was asked yesterday.');
        setYesterdayConsensus('');
        setYesterdayResult('');
      }
    }
  }, [questions, user]);

  // const calculateStreak = (userResponses, streakType) => {
  //   let currentStreak = 0;
  //   let noVoteStreak = 0;

  //   // Sort responses by date descending
  //   const sortedResponses = userResponses.sort(
  //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //   );

  //   for (let i = 0; i < sortedResponses.length; i++) {
  //     const response = sortedResponses[i];
  //     const question = questions.find((q) => q.id === response.questionId);
  //     if (!question) continue; // Skip if the question is not found

  //     const consensus = question.consensus.length > 0 ? question.consensus[0].consensusAnswer : null;
  //     if (!consensus) continue; // Skip if there's no consensus for the question

  //     console.log("response", response.response)
  //     if (streakType === 'correct' && response.response === consensus) {
  //       currentStreak++;
  //     } else if (streakType === 'incorrect' && response.response !== consensus) {
  //       currentStreak++;
  //     } else  {
  //       noVoteStreak++;
  //     }
  //   }

  //   setStreak({
  //     correct: streakType === 'correct' ? currentStreak : 0,
  //     incorrect: streakType === 'incorrect' ? currentStreak : 0,
  //     noVote: streakType === 'noVote' ? noVoteStreak : 0,
  //   });
  // };

  const calculateStreak = (userResponses, streakType) => {
    let currentStreak = 0;

    // Sort responses by date descending
    const sortedResponses = userResponses.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Iterate through each question to determine streaks
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.consensus.length) continue; // Skip if there's no consensus for the question

      const consensusAnswer = question.consensus[0].consensusAnswer;

      // Find the user's response for the current question
      const userResponse = sortedResponses.find(
        (response) => response.questionId === question.id
      );

      if (userResponse) {
        // Check if the user answered correctly or incorrectly
        if (streakType === 'correct' && userResponse.response === consensusAnswer) {
          currentStreak++;
        } else if (streakType === 'incorrect' && userResponse.response !== consensusAnswer) {
          currentStreak++;
        } else {
          break; // Streak ends if the answer doesn't match the streak type
        }
      } else if (streakType === 'noVote') {
        // If no response from the user and we are checking 'noVote' streak
        currentStreak++;
      } else {
        break; // Streak ends for 'correct' or 'incorrect' if there's no response
      }
    }

    setStreak({
      correct: streakType === 'correct' ? currentStreak : 0,
      incorrect: streakType === 'incorrect' ? currentStreak : 0,
      noVote: streakType === 'noVote' ? currentStreak : 0,
    });
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Set to midnight

      const timeDifference = midnight - now;

      if (timeDifference > 0) {
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Time is up!');
      }
    };

    // Initial call
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const handleVote = (option) => {
    const responseOption = option === 'optionA' ? 'option_a' : 'option_b';
    const userResponse = {
      userId,
      questionId: selectedQuestion.id,
      response: responseOption,
    };

    dispatch(createUserResponse(userResponse));
    setHasVoted(true);
  };

  return (
    <div>
      <h3>Today's Date: {new Date().toLocaleDateString()}</h3>
      <div>{yesterdayQuestionText}</div>
      <div>{yesterdayConsensus}</div>
      <div>{yesterdayResult}</div>
      <h3>
        {hasVoted ? 'Time Until the Next Question:' : 'Time Left to Answer the Question:'} {timeLeft}
      </h3>
      <h4>Streak:</h4>
      {streak.correct > 0 && <p>Correct Streak: {streak.correct} days</p>}
      {streak.incorrect > 0 && <p>Incorrect Streak: {streak.incorrect} days</p>}
      {streak.noVote > 0 && <p>No Vote Streak: {streak.noVote} days</p>}
      {selectedQuestion ? (
        <div>
          <h2>Question of the Day</h2>
          <div>{selectedQuestion.text}</div>
          {!hasVoted ? (
            <div>
              <button onClick={() => handleVote('optionA')}>{selectedQuestion.optionA}</button>
              <button onClick={() => handleVote('optionB')}>{selectedQuestion.optionB}</button>
            </div>
          ) : (
            <div>You have already voted</div>
          )}
        </div>
      ) : (
        <div>{questions.length > 0 ? 'No question for today.' : 'Loading questions...'}</div>
      )}
    </div>
  );
}

export default QuestionOfTheDay;
