import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore';
import { createUserResponse } from '../store/allUserResponsesStore';
import PieChart from './PieChart';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { format } from 'date-fns';

function QuestionOfTheDay() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions || []);
  const users = useSelector((state) => state.allUsers || []);
  const { id: userId } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [yesterdayQuestion, setYesterdayQuestion] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [todaysVote, setTodaysVote] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [yesterdayConsensus, setYesterdayConsensus] = useState('');
  const [yesterdayResult, setYesterdayResult] = useState('');
  const [streak, setStreak] = useState({ correct: 0, incorrect: 0, noVote: 0 });
  const formattedDate = format(new Date(), 'EEEE, MMMM do, yyyy');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [careerHigh, setCareerHigh] = useState({
    winStreak: 0,
    lossStreak: 0,
    noVoteStreak: 0,
  });

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
    if (userId) {
      dispatch(fetchSingleUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (questions.length > 0 && user && user.user_responses) {
      const today = new Date().toISOString().split('T')[0];
      const todayQuestion = questions.find((question) => question.dateAsked === today);

      if (todayQuestion) {
        setSelectedQuestion(todayQuestion);
        const userResponse = user.user_responses.find(
          (response) => response.questionId === todayQuestion.id
        );
        if (userResponse) {
          setHasVoted(true);
          setTodaysVote(userResponse.response);
        } else {
          setHasVoted(false);
          setTodaysVote('');
        }
      } else {
        setSelectedQuestion(null);
        setHasVoted(false);
        setTodaysVote('');
      }

      // Handle yesterday's question
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split('T')[0];

      const yQuestion = questions.find((question) => question.dateAsked === yesterdayDate);

      if (yQuestion) {
        setYesterdayQuestion(yQuestion);

        if (yQuestion.consensus.length > 0 && yQuestion.consensus[0].consensusAnswer) {
          const consensusAnswer = yQuestion.consensus[0].consensusAnswer;
          const consensusOption =
            consensusAnswer === 'option_a' ? yQuestion.optionA : yQuestion.optionB;
          const otherOption =
            consensusAnswer === 'option_a' ? yQuestion.optionB : yQuestion.optionA;

          setYesterdayConsensus(
            `The consensus yesterday was that ${consensusOption} is better than ${otherOption}.`
          );

          const userResponse = user.user_responses.find(
            (response) => response.questionId === yQuestion.id
          );

          if (userResponse) {
            if (userResponse.response === consensusAnswer) {
              setYesterdayResult('You were right yesterday!');
              calculateStreak(user.user_responses, 'correct');
            } else {
              setYesterdayResult('You were wrong yesterday.');
              calculateStreak(user.user_responses, 'incorrect');
            }
          } else {
            setYesterdayResult("You didn't vote yesterday.");
            calculateStreak(user.user_responses, 'noVote');
          }
        } else {
          setYesterdayConsensus('No consensus was reached yesterday.');
          setYesterdayResult('');
        }
      } else {
        setYesterdayConsensus('No question was asked yesterday.');
        setYesterdayResult('');
      }

      calculateCareerHigh(user.user_responses);
    }
  }, [questions, user]);


  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const timeDifference = midnight - now;

      if (timeDifference > 0) {
        const totalSeconds = Math.floor(timeDifference / 1000);
        setTimeLeftSeconds(totalSeconds);
      } else {
        setTimeLeftSeconds(0);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);


  const handleVote = async (option) => {
    const responseOption = option === 'optionA' ? 'option_a' : 'option_b';
    const userResponse = {
      userId,
      questionId: selectedQuestion.id,
      response: responseOption,
    };

    try {
      // Dispatch action to create user response
      await dispatch(createUserResponse(userResponse));

      // Update local state to reflect that the user has voted
      setHasVoted(true);
      setTodaysVote(responseOption);

      // Re-fetch questions to update the vote count
      await dispatch(fetchQuestions());

      // **Dispatch action to fetch updated user data**
      await dispatch(fetchSingleUser(userId));
    } catch (error) {
      console.error('Error casting vote:', error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

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

        setStreak((prevStreak) => ({
          ...prevStreak,
          [streakType]: currentStreak,
        }));
      };

  const calculateCareerHigh = (userResponses) => {
    let winStreak = 0;
    let lossStreak = 0;
    let noVoteStreak = 0;
    let currentWin = 0;
    let currentLoss = 0;
    let currentNoVote = 0;

    const sortedResponses = userResponses.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
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



   const calculateChartData = () => {
    if (!yesterdayQuestion || !yesterdayQuestion.user_responses) {
      return { percentageA: 0, percentageB: 0, percentageNoVote: 0 };
    }

    if (!Array.isArray(users) || users.length === 0) {
      return { percentageA: 0, percentageB: 0, percentageNoVote: 0 };
    }

    const votesA = yesterdayQuestion.user_responses.filter(
      (response) => response.response === 'option_a'
    ).length;

    const votesB = yesterdayQuestion.user_responses.filter(
      (response) => response.response === 'option_b'
    ).length;

    const totalVotes = votesA + votesB;
    const totalUsers = users.length;
    const noVotes = totalUsers - totalVotes;

    return {
      percentageA: votesA,
      percentageB: votesB,
      percentageNoVote: noVotes,
    };
  };

    const chartData = calculateChartData();

    console.log("selected", selectedQuestion)

  return (
    <div className="qotd-container">
      {selectedQuestion ? (
        <div className="qotd-question-section">
          <h2 className="qotd-heading">Question of the Day</h2>
          {/* <p className="qotd-date">{new Date().toLocaleDateString()}</p> */}
          <div className="qotd-date-container">
  <p className="qotd-date">
    <i className="fas fa-calendar-alt" style={{ marginRight: '10px' }}></i>
    {formattedDate}
  </p>
</div>
          <h3 className="qotd-timer">
            <p>
            {hasVoted
              ? 'Time Until the Next Question:'
              : 'Time Left to Answer the Question:'}{' '}
              </p>
  <div className="countdown-container">
              <div className="timer-border">
                <CountdownCircleTimer
                  isPlaying
                  duration={86400}
                  initialRemainingTime={timeLeftSeconds}
                  colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000'],
                  ]}
                  size={200}
                  strokeWidth={16}
                  trailColor="#d9d9d9"
                  onComplete={() => ({ shouldRepeat: false })}
                >
                  {({ remainingTime }) => {
                    const hours = Math.floor((remainingTime / 3600) % 24);
                    const minutes = Math.floor((remainingTime / 60) % 60);
                    const seconds = remainingTime % 60;
                    return (
                      <div className="timer-text">
                        {hours}h {minutes}m {seconds}s
                      </div>
                    );
                  }}
                </CountdownCircleTimer>
              </div>
            </div>
            {timeLeft}
          </h3>
          {!hasVoted ? (
            <div className="qotd-options-container">
              <div className="qotd-option">
                <img
                  src={selectedQuestion.imageA}
                  alt={selectedQuestion.optionA}
                  className="qotd-option-image"
                />
                <button
                  onClick={() => handleVote('optionA')}
                  className="qotd-vote-button"
                >
                  {selectedQuestion.optionA}
                </button>
              </div>
              <div className="qotd-option">
                <img
                  src={selectedQuestion.imageB}
                  alt={selectedQuestion.optionB}
                  className="qotd-option-image"
                />
                <button
                  onClick={() => handleVote('optionB')}
                  className="qotd-vote-button"
                >
                  {selectedQuestion.optionB}
                </button>
              </div>
            </div>
          ) : (
            <div className="qotd-already-voted">
              <p>Your Vote:</p>
              {todaysVote === 'option_a' ? (
                <div>
                  <img
                    src={selectedQuestion.imageA}
                    alt={selectedQuestion.optionA}
                    className="qotd-option-image"
                  />
                  <p>{selectedQuestion.optionA}</p>
                </div>
              ) : (
                <div>
                  <img
                    src={selectedQuestion.imageB}
                    alt={selectedQuestion.optionB}
                    className="qotd-option-image"
                  />
                  <p>{selectedQuestion.optionB}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="qotd-no-question">
          {questions.length > 0 ? 'No question for today.' : 'Loading questions...'}
        </div>
      )}
   <div className="qotd-total-votes-container">
  {selectedQuestion ? (
    <div className="qotd-total-votes">
      <i className="fas fa-vote-yea vote-icon"></i>
      <span>Total Votes: {selectedQuestion.user_responses ? selectedQuestion.user_responses.length : 0}</span>
    </div>
  ) : (
    <div className="qotd-total-votes">
      <i className="fas fa-vote-yea vote-icon"></i>
      <span>Total Votes: 0</span>
    </div>
  )}
</div>
      {yesterdayQuestion && (
        <div className="qotd-yesterday-section">
          <h3 className="qotd-yesterday-heading">Yesterday's Question Results</h3>
          <div className="qotd-pie-chart-container">
            <PieChart
              data={chartData}
              questionText={`${yesterdayQuestion.optionA} or ${yesterdayQuestion.optionB}`}
              optionALabel={yesterdayQuestion.optionA}
              optionBLabel={yesterdayQuestion.optionB}
            />
          </div>
          <div className="qotd-winner-image-container">
            <h4>Yesterday's Winner:</h4>
            {yesterdayQuestion.consensus.length > 0 &&
            yesterdayQuestion.consensus[0].consensusAnswer ? (
              <img
                src={
                  yesterdayQuestion.consensus[0].consensusAnswer === 'option_a'
                    ? yesterdayQuestion.imageA
                    : yesterdayQuestion.imageB
                }
                alt="Yesterday's Winner"
                className="qotd-winner-image"
              />
            ) : (
              <p>No consensus winner yesterday.</p>
            )}
          </div>
          <p className="qotd-yesterday-result">{yesterdayResult}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionOfTheDay;

