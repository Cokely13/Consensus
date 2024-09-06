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

//   // const calculateStreak = (userResponses, streakType) => {
//   //   let currentStreak = 0;
//   //   let noVoteStreak = 0;

//   //   // Sort responses by date descending
//   //   const sortedResponses = userResponses.sort(
//   //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   //   );

//   //   for (let i = 0; i < sortedResponses.length; i++) {
//   //     const response = sortedResponses[i];
//   //     const question = questions.find((q) => q.id === response.questionId);
//   //     if (!question) continue; // Skip if the question is not found

//   //     const consensus = question.consensus.length > 0 ? question.consensus[0].consensusAnswer : null;
//   //     if (!consensus) continue; // Skip if there's no consensus for the question

//   //     console.log("response", response.response)
//   //     if (streakType === 'correct' && response.response === consensus) {
//   //       currentStreak++;
//   //     } else if (streakType === 'incorrect' && response.response !== consensus) {
//   //       currentStreak++;
//   //     } else  {
//   //       noVoteStreak++;
//   //     }
//   //   }

//   //   setStreak({
//   //     correct: streakType === 'correct' ? currentStreak : 0,
//   //     incorrect: streakType === 'incorrect' ? currentStreak : 0,
//   //     noVote: streakType === 'noVote' ? noVoteStreak : 0,
//   //   });
//   // };

//   const calculateStreak = (userResponses, streakType) => {
//     let currentStreak = 0;

//     // Sort responses by date descending
//     const sortedResponses = userResponses.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );

//     // Iterate through each question to determine streaks
//     for (let i = 0; i < questions.length; i++) {
//       const question = questions[i];
//       if (!question.consensus.length) continue; // Skip if there's no consensus for the question

//       const consensusAnswer = question.consensus[0].consensusAnswer;

//       // Find the user's response for the current question
//       const userResponse = sortedResponses.find(
//         (response) => response.questionId === question.id
//       );

//       if (userResponse) {
//         // Check if the user answered correctly or incorrectly
//         if (streakType === 'correct' && userResponse.response === consensusAnswer) {
//           currentStreak++;
//         } else if (streakType === 'incorrect' && userResponse.response !== consensusAnswer) {
//           currentStreak++;
//         } else {
//           break; // Streak ends if the answer doesn't match the streak type
//         }
//       } else if (streakType === 'noVote') {
//         // If no response from the user and we are checking 'noVote' streak
//         currentStreak++;
//       } else {
//         break; // Streak ends for 'correct' or 'incorrect' if there's no response
//       }
//     }

//     setStreak({
//       correct: streakType === 'correct' ? currentStreak : 0,
//       incorrect: streakType === 'incorrect' ? currentStreak : 0,
//       noVote: streakType === 'noVote' ? currentStreak : 0,
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
//       {streak.correct > 0 && <p>Correct Streak: {streak.correct} days</p>}
//       {streak.incorrect > 0 && <p>Incorrect Streak: {streak.incorrect} days</p>}
//       {streak.noVote > 0 && <p>No Vote Streak: {streak.noVote} days</p>}
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
  const questions = useSelector((state) => state.allQuestions || []);
  const { id: userId } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [yesterdayConsensus, setYesterdayConsensus] = useState('');
  const [yesterdayQuestionText, setYesterdayQuestionText] = useState('');
  const [yesterdayResult, setYesterdayResult] = useState('');
  const [streak, setStreak] = useState({ correct: 0, incorrect: 0, noVote: 0 });
  const [careerHigh, setCareerHigh] = useState({ winStreak: 0, lossStreak: 0, noVoteStreak: 0 });

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (questions.length > 0 && user.user_responses) {
      const today = new Date().toISOString().split('T')[0];
      const todayQuestion = questions.find((question) => question.dateAsked === today);

      if (todayQuestion) {
        setSelectedQuestion(todayQuestion);

        const hasUserVoted = user.user_responses.some(
          (response) => response.questionId === todayQuestion.id
        );

        setHasVoted(hasUserVoted);
      } else {
        setSelectedQuestion(null);
      }

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
          setYesterdayResult('');
        }
      } else {
        setYesterdayQuestionText('No question was asked yesterday.');
        setYesterdayConsensus('');
        setYesterdayResult('');
      }

      // Calculate career high streaks
      calculateCareerHigh(user.user_responses);
    }
  }, [questions, user]);

  const calculateStreak = (userResponses, streakType) => {
    let currentStreak = 0;

    const sortedResponses = userResponses.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.consensus.length) continue;

      const consensusAnswer = question.consensus[0].consensusAnswer;
      const userResponse = sortedResponses.find(
        (response) => response.questionId === question.id
      );

      if (userResponse) {
        if (streakType === 'correct' && userResponse.response === consensusAnswer) {
          currentStreak++;
        } else if (streakType === 'incorrect' && userResponse.response !== consensusAnswer) {
          currentStreak++;
        } else {
          break;
        }
      } else if (streakType === 'noVote') {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak({
      correct: streakType === 'correct' ? currentStreak : streak.correct,
      incorrect: streakType === 'incorrect' ? currentStreak : streak.incorrect,
      noVote: streakType === 'noVote' ? currentStreak : streak.noVote,
    });
  };

  const calculateCareerHigh = (userResponses) => {
    let winStreak = 0;
    let lossStreak = 0;
    let noVoteStreak = 0;
    let currentWin = 0;
    let currentLoss = 0;
    let currentNoVote = 0;

    const sortedResponses = userResponses.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt) // Sort by ascending date
    );

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.consensus.length) continue;

      const consensusAnswer = question.consensus[0].consensusAnswer;
      const userResponse = sortedResponses.find(
        (response) => response.questionId === question.id
      );

      if (userResponse) {
        if (userResponse.response === consensusAnswer) {
          currentWin++;
          winStreak = Math.max(winStreak, currentWin);
          currentLoss = 0;
          currentNoVote = 0;
        } else {
          currentLoss++;
          lossStreak = Math.max(lossStreak, currentLoss);
          currentWin = 0;
          currentNoVote = 0;
        }
      } else {
        currentNoVote++;
        noVoteStreak = Math.max(noVoteStreak, currentNoVote);
        currentWin = 0;
        currentLoss = 0;
      }
    }

    setCareerHigh({ winStreak, lossStreak, noVoteStreak });
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

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
      <h4>Current Streak:</h4>
      {streak.correct > 0 && <p>Correct Streak: {streak.correct} days</p>}
      {streak.incorrect > 0 && <p>Incorrect Streak: {streak.incorrect} days</p>}
      {streak.noVote > 0 && <p>No Vote Streak: {streak.noVote} days</p>}
      <h4>Career High Streaks:</h4>
       <p>Longest Win Streak: {careerHigh.winStreak} days</p>
       <p>Longest Loss Streak: {careerHigh.lossStreak} days</p>
      <p>Longest No Vote Streak: {careerHigh.noVoteStreak} days</p>
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
