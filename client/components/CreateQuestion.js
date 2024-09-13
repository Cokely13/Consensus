// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createQuestion } from '../store/allQuestionsStore';

// function CreateQuestion() {
//   const dispatch = useDispatch();
//   const { id: userId } = useSelector((state) => state.auth);

//   const [text, setText] = useState('');
//   const [optionA, setOptionA] = useState('');
//   const [optionB, setOptionB] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!text || !optionA || !optionB) {
//       setError('All fields are required');
//       return;
//     }

//     const newQuestion = {
//       text,
//       optionA,
//       optionB,
//       createdBy: userId,
//     };

//     dispatch(createQuestion(newQuestion));

//     setText('');
//     setOptionA('');
//     setOptionB('');
//     setError('');
//   };

//   return (
//     <div className="form-container">
//       <h2>Create a New Question</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p className="error">{error}</p>}
//         <div>
//           <label>Question Text:</label>
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Option A:</label>
//           <input
//             type="text"
//             value={optionA}
//             onChange={(e) => setOptionA(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Option B:</label>
//           <input
//             type="text"
//             value={optionB}
//             onChange={(e) => setOptionB(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Create Question</button>
//       </form>
//     </div>
//   );
// }

// export default CreateQuestion;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../store/allQuestionsStore';

function CreateQuestion() {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.auth);

  const [text, setText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [imageA, setImageA] = useState(null);
  const [imageB, setImageB] = useState(null);
  const [previewUrlA, setPreviewUrlA] = useState(null);
  const [previewUrlB, setPreviewUrlB] = useState(null);
  const [error, setError] = useState('');

  const handleFileChangeA = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageA(file);
      setPreviewUrlA(URL.createObjectURL(file)); // Set the URL for preview
    }
  };

  const handleFileChangeB = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageB(file);
      setPreviewUrlB(URL.createObjectURL(file)); // Set the URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !optionA || !optionB) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('text', text);
    formData.append('optionA', optionA);
    formData.append('optionB', optionB);
    formData.append('createdBy', userId);

    // Append images if selected
    if (imageA) {
      formData.append('imageA', imageA);
    }
    if (imageB) {
      formData.append('imageB', imageB);
    }

    try {
      // Dispatch the action to create a question with image uploads
      await dispatch(createQuestion(formData));

      // Clear form fields after submission
      setText('');
      setOptionA('');
      setOptionB('');
      setImageA(null);
      setImageB(null);
      setPreviewUrlA(null);
      setPreviewUrlB(null);
      setError('');
    } catch (error) {
      console.error('Failed to create question:', error);
      setError('Failed to create question. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Question Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option A:</label>
          <input
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image for Option A:</label>
          <input type="file" onChange={handleFileChangeA} />
          {previewUrlA && (
            <div className="image-preview">
              <img src={previewUrlA} alt="Preview for Option A" style={{ maxWidth: '20%', height: 'auto' }} />
            </div>
          )}
        </div>
        <div>
          <label>Option B:</label>
          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image for Option B:</label>
          <input type="file" onChange={handleFileChangeB} />
          {previewUrlB && (
            <div className="image-preview">
              <img src={previewUrlB} alt="Preview for Option B" style={{ maxWidth: '20%', height: 'auto' }} />
            </div>
          )}
        </div>
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}

export default CreateQuestion;
