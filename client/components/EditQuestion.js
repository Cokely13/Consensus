import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchQuestion, updateSingleQuestion } from '../store/singleQuestionStore';

function EditQuestion() {
  const { id } = useParams(); // Get question ID from URL
  const dispatch = useDispatch();
  const history = useHistory();
  const question = useSelector((state) => state.singleQuestion);

  // Initialize state with empty strings to avoid uncontrolled to controlled input warning
  const [text, setText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [imageA, setImageA] = useState(null);
  const [imageB, setImageB] = useState(null);
  const [previewImageA, setPreviewImageA] = useState('');
  const [previewImageB, setPreviewImageB] = useState('');

  useEffect(() => {
    // Fetch the question to edit when component mounts
    dispatch(fetchQuestion(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (question) {
      setText(question.text || ''); // Use empty string as a fallback
      setOptionA(question.optionA || '');
      setOptionB(question.optionB || '');
      setPreviewImageA(question.imageA || '');
      setPreviewImageB(question.imageB || '');
    }
  }, [question]);

  const handleFileChangeA = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageA(file);
      setPreviewImageA(URL.createObjectURL(file));
    }
  };

  const handleFileChangeB = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageB(file);
      setPreviewImageB(URL.createObjectURL(file));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('text', text);
  //   formData.append('id', id);
  //   formData.append('optionA', optionA);
  //   formData.append('optionB', optionB);
  //   if (imageA) formData.append('imageA', imageA);
  //   if (imageB) formData.append('imageB', imageB);

  //   try {
  //     await dispatch(updateSingleQuestion(formData));
  //     alert('Question updated successfully!');
  //     history.push('/questions'); // Redirect back to questions list
  //   } catch (error) {
  //     console.error('Failed to update question:', error);
  //     alert('Failed to update question.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id); // Make sure to include the question ID in FormData
    formData.append('text', text);
    formData.append('optionA', optionA);
    formData.append('optionB', optionB);
    if (imageA) formData.append('imageA', imageA);
    if (imageB) formData.append('imageB', imageB);

    try {
      // Pass the FormData directly to the thunk
      await dispatch(updateSingleQuestion(formData));
      alert('Question updated successfully!');
      history.push('/questions'); // Redirect back to questions list
    } catch (error) {
      console.error('Failed to update question:', error);
      alert('Failed to update question.');
    }
  };

  return (
    <div className="edit-question-container">
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit}>
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
          {previewImageA && <img src={previewImageA} alt="Option A" style={{ width: '100px' }} />}
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
          {previewImageB && <img src={previewImageB} alt="Option B" style={{ width: '100px' }} />}
        </div>
        <button type="submit">Update Question</button>
      </form>
    </div>
  );
}

export default EditQuestion;
