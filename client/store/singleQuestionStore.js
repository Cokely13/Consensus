import axios from "axios";

// Action Types
const SET_SINGLE_QUESTION = "SET_SINGLE_QUESTION";
const UPDATE_SINGLE_QUESTION = "UPDATE_SINGLE_QUESTION";
const TOKEN = "token";

// Action creators
export const _setSingleQuestion= (questiondata) => {
  return {
    type: SET_SINGLE_QUESTION,
    questiondata,
  };
};

const _updateSingleQuestion = (questiondata) => {
  return {
    type: UPDATE_SINGLE_QUESTION,
    questiondata,
  };
};

//Thunks
export const fetchQuestion = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/questions/${id}`);
    dispatch(_setSingleQuestion(data));
  };
};

// export const updateSingleQuestion = (question) => {
//   return async (dispatch) => {
//     try {
//         await axios.put(`/api/questions/${question.id}`, question);
//         const { data: questionData } = await axios.get(`/api/questions/${question.id}`);
//         dispatch(_updateSingleQuestion(questionData));
//         history.push(`/questions/${question.id}`)
//       }
//      catch (error) {
//       console.log("QUESTION", question)
//     }
//   };
// };

export const updateSingleQuestion = (formData) => {
  return async (dispatch) => {
    try {
      // Make sure to pass the formData directly to axios.put
      await axios.put(`/api/questions/${formData.get('id')}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Fetch the updated question data
      const { data: questionData } = await axios.get(`/api/questions/${formData.get('id')}`);
      dispatch(_updateSingleQuestion(questionData));
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };
};


// reducer
const initialState = [];
const singleQuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_QUESTION:
      return action.questiondata;
    case UPDATE_SINGLE_QUESTION:
      return action.questiondata;
    default:
      return state;
  }
};

export default singleQuestionReducer;
