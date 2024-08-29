import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import usersReducer from './allUsersStore'
import singleUserReducer from './singleUserStore'
import singleQuestionReducer from './singleQuestionStore'
import questionsReducer from './allQuestionsStore'
import groupQuestionsReducer from './allGroupQuestionStore'
import singleGroupReducer from './singleGroupStore'
import allGroupsReducer from './allGroupsStore'
import consensusesReducer from './allConsensusesStore'
import singleConsensusReducer from './singleConsensusStore'
import groupMembersReducer from './allGroupMembersStore'
import singleGroupMemberReducer from './singleGroupMemberStore'
import singleGroupQuestionReducer from './singleGroupQuestionStore'
import groupQuestionsReducer from './allGroupQuestionStore'

const reducer = combineReducers({ auth,
  allUsers: usersReducer,
  allQuestions: questionsReducer,
  singleQuestion: singleQuestionReducer,
  singleUser: singleUserReducer,
  singleGroup: singleGroupReducer,
  allGroups: allGroupsReducer,
  singleConsensus: singleConsensusReducer,
  allConsensuses: consensusesReducer,
  singleGroupMember: singleGroupMemberReducer,
  allGroupMembers: groupMembersReducer,
  singleGroupQuestion: singleGroupQuestionReducer,
  allGroupQuestions: groupQuestionsReducer,

 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
