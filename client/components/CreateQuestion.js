// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createQuestion } from '../store/allQuestionsStore';

// function CreateQuestion() {
//   const dispatch = useDispatch();
//   const { id: userId } = useSelector((state) => state.auth); // Get the user ID from the auth state

//   const [text, setText] = useState('');
//   const [optionA, setOptionA] = useState('');
//   const [optionB, setOptionB] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     if (!text || !optionA || !optionB) {
//       setError('All fields are required');
//       return;
//     }

//     // Create a new question object
//     const newQuestion = {
//       text,
//       optionA,
//       optionB,
//       createdBy: userId,
//     };

//     // Dispatch the action to create a question
//     dispatch(createQuestion(newQuestion));

//     // Reset form fields after submission
//     setText('');
//     setOptionA('');
//     setOptionB('');
//     setError('');
//   };

//   return (
//     <div>
//       <h2>Create a New Question</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
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
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !optionA || !optionB) {
      setError('All fields are required');
      return;
    }

    const newQuestion = {
      text,
      optionA,
      optionB,
      createdBy: userId,
    };

    dispatch(createQuestion(newQuestion));

    setText('');
    setOptionA('');
    setOptionB('');
    setError('');
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
          <label>Option B:</label>
          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}

export default CreateQuestion;
