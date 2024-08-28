import Axios from "axios";

const SET_GROUPS ="SET_GROUPS"
const CREATE_GROUP = "CREATE_GROUP"
const DELETE_GROUP = "DELETE_GROUP"


export const setGroups = (group) =>{
  return{
    type: SET_GROUPS,
    group
  }
};

const _createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  };
};

const _deleteGroup = (group) => {
  return {
    type: DELETE_GROUP,
    group
  };
};

export const fetchGroups = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/groups");
        dispatch(setGroups(data));
  };
};

export const createGroup = (group) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/groups", group);
    dispatch(_createGroup(created));
    // history.push("/groups");
  };
};

export const deleteGroup = (id, history) => {
  return async (dispatch) => {
    const { data: group } = await Axios.delete(`/api/groups/${id}`);
    dispatch(_deleteGroup(group));
    history.push("/groups");
  };
};


const initialState = [];
export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUPS:
      return action.group;
      case CREATE_GROUP:
        return [...state, action.group];
        case DELETE_GROUP:
      return state.filter((group) => group.id !== action.group.id)
      ;
      default:
        return state;
    }
  }
