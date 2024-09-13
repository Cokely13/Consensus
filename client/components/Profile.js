import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore';
import { fetchQuestions } from '../store/allQuestionsStore';

function Profile() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const questions = useSelector((state) => state.allQuestions);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    // Fetch user and questions when component mounts
    dispatch(fetchSingleUser(id));
    dispatch(fetchQuestions());
  }, [dispatch, id]);

  console.log("user", user)

  const imageUrl = user.image

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Set the URL for preview
  }
};



const handleUpload = async () => {
  if (!selectedFile) {
    alert('Please select a file to upload');
    return;
  }

  const formData = new FormData();
  formData.append('image', selectedFile);

  try {
    // Upload the photo to your server
    const uploadResponse = await fetch(`/api/users/${user.id}`, {
      method: 'PUT', // Change this to PUT
      body: formData,
    });

    if (uploadResponse.ok) {
      const responseData = await uploadResponse.json();
      // Assuming the server response contains the URL of the uploaded image
      dispatch(updateSingleUser({ id, image: responseData.imageUrl }));
      alert('Photo uploaded and profile updated successfully');
      setNewPhoto(false)
    } else {
      alert('Upload failed');
    }
  } catch (error) {
    console.error('Error uploading file:', error.response ? error.response.data : error);
    alert('Upload failed');
  }
};

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

  console.log("Image URL:", imageUrl);

  return (
    <div className="profile-container">
      <div>
      <h2>Profile</h2>
      {user.image && (
    <div   >
       <div className="user-image-container" style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              margin: 'auto',
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '3px solid black'
            }}> </div>
    </div>
  )}
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Total Questions Answered: {getTotalQuestionsAnswered()}</p>
          <p>Percentage of Popular Answers: {getPercentagePopularAnswers()}%</p>
          <p>With Consensus: {getConsensusCount()}</p>
          <p>Sole Dissenter: {getSoleDissenterCount()}</p>
        </div>
      ) : (
        <p className="loading">Loading user data...</p>
      )}
    </div>
    {newPhoto ? <div style={{ margin: '20px 0' }} >
        <input  type="file" onChange={handleFileChange} />
        <button className="btn btn-success"onClick={handleUpload}>Upload Photo</button>
        {previewUrl && (
          <div className="change-photo-button-container">
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '20%', height: 'auto' }} />
          </div>
        )}
      </div> : <div className="change-photo-button-container"><button className="btn btn-secondary" onClick={() => setNewPhoto(true)}>Change Photo</button></div>}
    </div>
  );
}

export default Profile;
