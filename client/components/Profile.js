import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore';
import { fetchQuestions } from '../store/allQuestionsStore';

function Profile() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const questions = useSelector((state) => state.allQuestions);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [newPhoto, setNewPhoto] = useState(false); // Changed initial state to false
  const [activeTab, setActiveTab] = useState('stats'); // For tabbed interface

  useEffect(() => {
    dispatch(fetchSingleUser(id));
    dispatch(fetchQuestions());
  }, [dispatch, id]);

  const imageUrl = user.image;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
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
      const uploadResponse = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (uploadResponse.ok) {
        const responseData = await uploadResponse.json();
        dispatch(updateSingleUser({ id, image: responseData.imageUrl }));
        alert('Photo uploaded and profile updated successfully');
        setNewPhoto(false);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error);
      alert('Upload failed');
    }
  };

  // Statistic calculation functions remain the same...
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

      const consensusAnswer = question.consensus[0].consensusAnswer;

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

      return userResponseCount === 1 ? count + 1 : count;
    }, 0);

    return soleDissenterCount;
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image-container">
            {user.image ? (
              <img src={imageUrl} alt={`${user.username}'s profile`} />
            ) : (
              <div className="placeholder">
                <i className="fas fa-user-circle"></i>
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>{user.username}</h2>
            <button className="button change-photo-button" onClick={() => setNewPhoto(true)}>
              Change Photo
            </button>
          </div>
        </div>

        {/* Photo Upload Section */}
     {/* Photo Upload Section */}
{newPhoto && (
  <div className="upload-section">
    <div className="image-preview">
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" />
      ) : (
        <div className="placeholder">
          <i className="fas fa-user-circle"></i>
        </div>
      )}
    </div>

    <div className="button-group">
  <label htmlFor="file-input" className="button-common button2">
    Choose a Photo
  </label>
  <input id="file-input" type="file" onChange={handleFileChange} />
  <button onClick={handleUpload} className="button-common button3 upload-button">
    Upload Photo
  </button>
</div>
  </div>
)}


        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === 'stats' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
          <button
            className={activeTab === 'activity' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'stats' && (
            <div className="profile-stats">
              <div className="stat-item">
                <i className="fas fa-question-circle"></i>
                <p>Total Questions Answered</p>
                <h3>{getTotalQuestionsAnswered()}</h3>
              </div>
              <div className="stat-item">
                <i className="fas fa-percentage"></i>
                <p>Popular Answers</p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${getPercentagePopularAnswers()}%` }}
                  ></div>
                </div>
                <span>{getPercentagePopularAnswers()}%</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-users"></i>
                <p>With Consensus</p>
                <h3>{getConsensusCount()}</h3>
              </div>
              <div className="stat-item">
                <i className="fas fa-user-slash"></i>
                <p>Sole Dissenter</p>
                <h3>{getSoleDissenterCount()}</h3>
              </div>
              <div className="stat-item">
                <i className="fas fa-trophy"></i>
                <p>Longest Win Streak</p>
                <h3>{user.careerHighWinStreak} days</h3>
              </div>
              <div className="stat-item">
                <i className="fas fa-thumbs-down"></i>
                <p>Longest Loss Streak</p>
                <h3>{user.careerHighLossStreak} days</h3>
              </div>
            </div>
          )}
          {activeTab === 'activity' && (
            <div className="activity-section">
              <p>No recent activity to display.</p>
              {/* You can populate this section with user's recent activity */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore';
// import { fetchQuestions } from '../store/allQuestionsStore';

// function Profile() {
//   const dispatch = useDispatch();
//   const { id } = useSelector((state) => state.auth);
//   const user = useSelector((state) => state.singleUser);
//   const questions = useSelector((state) => state.allQuestions);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [newPhoto, setNewPhoto] = useState(false);
//   const [activeTab, setActiveTab] = useState('stats');

//   useEffect(() => {
//     dispatch(fetchSingleUser(id));
//     dispatch(fetchQuestions());
//   }, [dispatch, id]);

//   const imageUrl = user.image;

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert('Please select a file to upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', selectedFile);

//     try {
//       const uploadResponse = await fetch(`/api/users/${user.id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (uploadResponse.ok) {
//         const responseData = await uploadResponse.json();
//         dispatch(updateSingleUser({ id, image: responseData.imageUrl }));
//         alert('Photo uploaded and profile updated successfully');
//         setNewPhoto(false);
//       } else {
//         alert('Upload failed');
//       }
//     } catch (error) {
//       console.error(
//         'Error uploading file:',
//         error.response ? error.response.data : error
//       );
//       alert('Upload failed');
//     }
//   };

//   // Statistic calculation functions remain the same...

//   // Function to get the user's most recent vote
//   const getMostRecentVote = () => {
//     if (!user.user_responses || user.user_responses.length === 0) return null;

//     // Sort user responses by date (assuming 'createdAt' field exists)
//     const sortedResponses = [...user.user_responses].sort((a, b) => {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//     const mostRecentResponse = sortedResponses[0];
//     const question = questions.find((q) => q.id === mostRecentResponse.questionId);

//     return {
//       questionText: question ? question.text : 'Question not found',
//       userChoice: mostRecentResponse.response,
//       optionAText: question ? question.optionA : '',
//       optionBText: question ? question.optionB : '',
//       optionAImage: question ? question.imageA : '',
//       optionBImage: question ? question.imageB : '',
//     };
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <div className="profile-image-container">
//             {user.image ? (
//               <img src={imageUrl} alt={`${user.username}'s profile`} />
//             ) : (
//               <div className="placeholder">
//                 <i className="fas fa-user-circle"></i>
//               </div>
//             )}
//           </div>
//           <div className="profile-info">
//             <h2>{user.username}</h2>
//             <button className="button change-photo-button" onClick={() => setNewPhoto(true)}>
//               Change Photo
//             </button>
//           </div>
//         </div>

//         {/* Photo Upload Section */}
//         {newPhoto && (
//           <div className="upload-section">
//             <div className="image-preview">
//               {previewUrl ? (
//                 <img src={previewUrl} alt="Preview" />
//               ) : (
//                 <div className="placeholder">
//                   <i className="fas fa-user-circle"></i>
//                 </div>
//               )}
//             </div>
//             <div className="button-group">
//               <label htmlFor="file-input" className="button-common button2">
//                 Choose a Photo
//               </label>
//               <input id="file-input" type="file" onChange={handleFileChange} />
//               <button onClick={handleUpload} className="button-common button3 upload-button">
//                 Upload Photo
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="tabs">
//           <button
//             className={activeTab === 'stats' ? 'tab active' : 'tab'}
//             onClick={() => setActiveTab('stats')}
//           >
//             Stats
//           </button>
//           <button
//             className={activeTab === 'activity' ? 'tab active' : 'tab'}
//             onClick={() => setActiveTab('activity')}
//           >
//             Activity
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === 'stats' && (
//             <div className="profile-stats">
//               {/* Existing stats content */}
//             </div>
//           )}
//           {activeTab === 'activity' && (
//             <div className="activity-section">
//               {user && questions.length > 0 ? (
//                 (() => {
//                   const recentVote = getMostRecentVote();
//                   if (recentVote) {
//                     return (
//                       <div className="recent-vote">
//                         <h3>Most Recent Vote</h3>
//                         <p><strong>Question:</strong> {recentVote.questionText}</p>
//                         <div className="vote-options">
//                           <div className={`vote-option ${recentVote.userChoice === 'option_a' ? 'selected' : ''}`}>
//                             {recentVote.optionAText}
//                             {recentVote.optionAImage && (
//                               <img src={recentVote.optionAImage} alt="Option A" />
//                             )}
//                           </div>
//                           <div className={`vote-option ${recentVote.userChoice === 'option_b' ? 'selected' : ''}`}>
//                             {recentVote.optionBText}
//                             {recentVote.optionBImage && (
//                               <img src={recentVote.optionBImage} alt="Option B" />
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   } else {
//                     return <p>No recent activity to display.</p>;
//                   }
//                 })()
//               ) : (
//                 <p>Loading activity...</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
