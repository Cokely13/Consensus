import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, updateQuestion } from '../store/allQuestionsStore';

function QuestionReview() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions.filter((q) => q.status === 'waiting')); // Get questions with 'waiting' status

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

    let updatedFields = { status: newStatus };

    if (newStatus === 'accepted') {
      // Find the latest dateAsked from all questions
      const latestDate = new Date(Math.max(...questions.map(q => new Date(q.dateAsked))));
      const newDateAsked = new Date(latestDate);
      newDateAsked.setDate(newDateAsked.getDate() + 1); // Set to the next day

      updatedFields.dateAsked = newDateAsked.toISOString().split('T')[0];
    }

    // Dispatch update question action
    dispatch(updateQuestion(question.id, updatedFields));
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
        {questions.map((question) => (
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
