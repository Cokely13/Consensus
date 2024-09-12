import React from 'react'
import {connect} from 'react-redux'
import QuestionOfTheDay from './QuestionOfTheDay'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <QuestionOfTheDay/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
