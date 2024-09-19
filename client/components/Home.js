import React from 'react'
import { connect } from 'react-redux'
import QuestionOfTheDay from './QuestionOfTheDay'

/**
 * COMPONENT
 */
export const Home = props => {
  const { username } = props

  return (
    <div className="home-container">
      {/* <h1 className="home-heading">Consensus</h1> */}
      <QuestionOfTheDay />
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
