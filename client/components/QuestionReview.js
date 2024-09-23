import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { updateSingleQuestion } from '../store/singleQuestionStore';

function QuestionReview() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const user = useSelector((state) => state.auth); // Get user information from the Redux store
  const waitingQuestions = questions.filter((q) => q.status === 'waiting'); // Get questions with 'waiting' status

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

    // Create FormData to handle potential file uploads and text updates
    const formData = new FormData();
    formData.append('id', question.id);
    formData.append('text', question.text);
    formData.append('optionA', question.optionA);
    formData.append('optionB', question.optionB);
    formData.append('status', newStatus);

    if (newStatus === 'accepted') {
      const latestDate = questions.reduce((latest, q) => {
        const questionDate = new Date(q.dateAsked);
        return questionDate > latest ? questionDate : latest;
      }, new Date(0));

      const newDateAsked = new Date(latestDate);
      newDateAsked.setDate(newDateAsked.getDate() + 1);
      formData.append('dateAsked', newDateAsked.toISOString().split('T')[0]);
    }

    // Dispatch updateSingleQuestion action with FormData
    await dispatch(updateSingleQuestion(formData));

    // Refresh the data by re-fetching questions
    dispatch(fetchQuestions());

    // Clear the error message
    setError('');
  };

  // Check if the user is an admin
  if (!user || !user.admin) {
    return <p>You Are not an Admin!</p>;
  }

  return (
    <div className="page-container">
      <h2 className="page-heading">Review Questions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="review-grid-container">
        <div className="review-grid-header">Text</div>
        <div className="review-grid-header">Option A</div>
        <div className="review-grid-header">Image A</div>
        <div className="review-grid-header">Option B</div>
        <div className="review-grid-header">Image B</div>
        <div className="review-grid-header">Created By</div>
        {/* <div className="review-grid-header">Status</div> */}
        <div className="review-grid-header">Action</div>
        {waitingQuestions.map((question) => (
          <React.Fragment key={question.id}>
            <div className="review-grid-row">{question.text}</div>
            <div className="review-grid-row">{question.optionA}</div>
            <div className="review-grid-row">
              {question.imageA && (
                <img
                  src={question.imageA}
                  alt="Option A"
                  className="review-image-thumbnail"
                />
              )}
            </div>
            <div className="review-grid-row">{question.optionB}</div>
            <div className="review-grid-row">
              {question.imageB && (
                <img
                  src={question.imageB}
                  alt="Option B"
                  className="review-image-thumbnail"
                />
              )}
            </div>
            <div className="review-grid-row">{question.createdBy}</div>
            <div className="review-grid-row">
  <div className="action-container">
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default QuestionReview;
