import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { updateSingleQuestion } from '../store/singleQuestionStore';

function QuestionReview() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const waitingQuestions = useSelector((state) =>
    state.allQuestions.filter((q) => q.status === 'waiting')
  ); // Get questions with 'waiting' status

  const [selectedStatus, setSelectedStatus] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all questions when the component mounts
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleStatusChange = (questionId, status) => {
    setSelectedStatus({ ...selectedStatus, [questionId]: status });
  };

  const handleSubmit = async (question) => {
    const newStatus = selectedStatus[question.id];

    if (!newStatus) {
      setError('Please select a status for each question');
      return;
    }

    let updatedFields = { ...question, status: newStatus };

    if (newStatus === 'accepted') {
      // Correct way to get the latest date
      const latestDate = questions.reduce((latest, q) => {
        const questionDate = new Date(q.dateAsked);
        return questionDate > latest ? questionDate : latest;
      }, new Date(0)); // Initialize to the earliest possible date

      console.log("latest", latestDate)
      // Add 1 day to the latest date
      const newDateAsked = new Date(latestDate);
      newDateAsked.setDate(newDateAsked.getDate() + 1); // Increment by one day

      // Correctly format the date to YYYY-MM-DD
      updatedFields.dateAsked = newDateAsked.toISOString().split('T')[0];
    }

    // Dispatch updateSingleQuestion action
    dispatch(updateSingleQuestion(updatedFields));
  };

  return (
    <div>
      <h2>Review Questions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="grid-container">
        <div className="grid-header">
          <div>Text</div>
          <div>Option A</div>
          <div>Option B</div>
          <div>Created By</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {waitingQuestions.map((question) => (
          <div key={question.id} className="grid-row">
            <div>{question.text}</div>
            <div>{question.optionA}</div>
            <div>{question.optionB}</div>
            <div>{question.createdBy}</div>
            <div>{question.status}</div>
            <div>
              <select
                value={selectedStatus[question.id] || ''}
                onChange={(e) => handleStatusChange(question.id, e.target.value)}
              >
                <option value="">Select</option>
                <option value="accepted">Accept</option>
                <option value="rejected">Reject</option>
              </select>
              <button onClick={() => handleSubmit(question)}>Submit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionReview;
