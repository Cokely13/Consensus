import axios from "axios";

// Action Types
const SET_SINGLE_INVITE = "SET_SINGLE_INVITE";
const UPDATE_SINGLE_INVITE = "UPDATE_SINGLE_INVITE";
const TOKEN = "token";

// Action creators
export const _setSingleInvite= (invitedata) => {
  return {
    type: SET_SINGLE_INVITE,
    invitedata,
  };
};

const _updateSingleInvite = (invitedata) => {
  return {
    type: UPDATE_SINGLE_INVITE,
    invitedata,
  };
};

//Thunks
export const fetchInvite = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/invites/${id}`);
    dispatch(_setSingleInvite(data));
  };
};

export const updateSingleInvite = (invite, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/invites/${invite.id}`, invite);
        const { data: inviteData } = await axios.get(`/api/invites/${invite.id}`);
        dispatch(_updateSingleInvite(inviteData));
        history.push(`/invites/${invite.id}`)
      }
     catch (error) {
      console.log("INVITE", invite)
    }
  };
};

// reducer
const initialState = [];
const singleInviteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_INVITE:
      return action.invitedata;
    case UPDATE_SINGLE_INVITE:
      return action.invitedata;
    default:
      return state;
  }
};

export default singleInviteReducer;
