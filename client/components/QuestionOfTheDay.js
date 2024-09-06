import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore';
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

    // Update the user with the new career highs
    if (
      winStreak > user.careerHighWinStreak ||
      lossStreak > user.careerHighLossStreak ||
      noVoteStreak > user.careerHighNoVoteStreak
    ) {
      dispatch(
        updateSingleUser({
          ...user,
          careerHighWinStreak: Math.max(winStreak, user.careerHighWinStreak),
          careerHighLossStreak: Math.max(lossStreak, user.careerHighLossStreak),
          careerHighNoVoteStreak: Math.max(noVoteStreak, user.careerHighNoVoteStreak),
        })
      );
    }
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
