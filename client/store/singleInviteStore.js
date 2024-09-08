// import axios from "axios";

// // Action Types
// const SET_SINGLE_INVITE = "SET_SINGLE_INVITE";
// const UPDATE_SINGLE_INVITE = "UPDATE_SINGLE_INVITE";
// const TOKEN = "token";

// // Action creators
// export const _setSingleInvite= (invitedata) => {
//   return {
//     type: SET_SINGLE_INVITE,
//     invitedata,
//   };
// };

// const _updateSingleInvite = (invitedata) => {
//   return {
//     type: UPDATE_SINGLE_INVITE,
//     invitedata,
//   };
// };

// //Thunks
// export const fetchInvite = (id) => {
//   return async (dispatch) => {
//     const { data } = await axios.get(`/api/invites/${id}`);
//     dispatch(_setSingleInvite(data));
//   };
// };

// export const updateSingleInvite = (invite, history) => {
//   return async (dispatch) => {
//     try {
//         await axios.put(`/api/invites/${invite.id}`, invite);
//         const { data: inviteData } = await axios.get(`/api/invites/${invite.id}`);
//         dispatch(_updateSingleInvite(inviteData));
//         history.push(`/invites/${invite.id}`)
//       }
//      catch (error) {
//       console.log("INVITE", invite)
//     }
//   };
// };

// // reducer
// const initialState = [];
// const singleInviteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_SINGLE_INVITE:
//       return action.invitedata;
//     case UPDATE_SINGLE_INVITE:
//       return action.invitedata;
//     default:
//       return state;
//   }
// };

// export default singleInviteReducer;

import axios from "axios";

// Action Types
const SET_SINGLE_INVITE = "SET_SINGLE_INVITE";
const UPDATE_SINGLE_INVITE = "UPDATE_SINGLE_INVITE";

// Action creators
export const _setSingleInvite = (inviteData) => {
  return {
    type: SET_SINGLE_INVITE,
    inviteData,
  };
};

const _updateSingleInvite = (inviteData) => {
  return {
    type: UPDATE_SINGLE_INVITE,
    inviteData,
  };
};

// Thunks
export const fetchInvite = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/invites/${id}`);
      dispatch(_setSingleInvite(data));
    } catch (error) {
      console.error("Error fetching invite:", error);
    }
  };
};

export const updateSingleInvite = (invite, history) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/invites/${invite.id}`, invite);
      const { data: inviteData } = await axios.get(`/api/invites/${invite.id}`);
      dispatch(_updateSingleInvite(inviteData));
      if (history) {
        history.push(`/invites/${invite.id}`);
      }
    } catch (error) {
      console.error("Error updating invite:", error);
    }
  };
};

// Reducer
const initialState = {};

const singleInviteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_INVITE:
      return action.inviteData;
    case UPDATE_SINGLE_INVITE:
      return action.inviteData;
    default:
      return state;
  }
};

export default singleInviteReducer;
