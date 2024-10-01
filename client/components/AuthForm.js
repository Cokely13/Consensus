// import React from 'react'
// import {connect} from 'react-redux'
// import {authenticate} from '../store'

// /**
//  * COMPONENT
//  */
// const AuthForm = props => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  const isSignUp = name === 'signup';

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} name={name} className="auth-form">
        {/* Username Input */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input name="username" type="text" className="form-input" required />
        </div>

        {/* Email Input for Sign Up */}
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input name="email" type="email" className="form-input" required />
          </div>
        )}

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input name="password" type="password" className="form-input" required />
        </div>

        {/* Confirm Password Input for Sign Up */}
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input name="confirmPassword" type="password" className="form-input" required />
          </div>
        )}

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="auth-button">
            {displayName}
          </button>
        </div>

        {/* Error Message */}
        {error && error.response && <div className="error-message">{error.response.data}</div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapLogin = (state) => ({
  name: 'login',
  displayName: 'Login',
  error: state.auth.error,
});

const mapSignup = (state) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.auth.error,
});

const mapDispatch = (dispatch) => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    if (formName === 'signup') {
      const email = evt.target.email.value;
      const confirmPassword = evt.target.confirmPassword.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      dispatch(authenticate(username, password, formName, email));
    } else {
      // For login, dispatch authenticate without email
      dispatch(authenticate(username, password, formName));
    }
  },
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
