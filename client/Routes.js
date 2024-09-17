import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import Users from './components/Users'
import Questions from './components/Questions'
import Archive from './components/Archive';
import UserDetailPage from './components/UserDetailPage';
import Profile from './components/Profile';
import CreateQuestion from './components/CreateQuestion';
import QuestionReview from './components/QuestionReview';
import CreateGroup from './components/CreateGroup';
import Groups from './components/Groups';
import GroupDetailPage from './components/GroupDetailPage';
import Invites from './components/Invites';
import MyGroups from './components/MyGroups';
import MyVotes from './components/MyVotes';
import EditQuestion from './components/EditQuestion';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:userId" component={UserDetailPage} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/myvotes" component={MyVotes} />
            <Route exact path="/archive" component={Archive} />
            <Route exact path="/group" component={CreateGroup} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/mygroups" component={MyGroups} />
            <Route exact path="/invites" component={Invites} />
            <Route exact path="/groups/:groupId" component={GroupDetailPage} />
            <Route exact path="/create" component={CreateQuestion} />
            <Route exact path="/review" component={QuestionReview} />
            <Route path="/edit-question/:id" component={EditQuestion} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
