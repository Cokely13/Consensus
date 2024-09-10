// import React from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {logout} from '../store'

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>Consensus</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <Link to="/profile">Profile</Link>
//           <Link to="/questions">Questions</Link>
//           <Link to="/users">Users</Link>
//           <Link to="/create">CreateQuestion</Link>
//           <Link to="/group">CreateGroup</Link>
//           <Link to="/groups">Groups</Link>
//           <Link to="/mygroups">MyGroups</Link>
//           <Link to="/invites">Invites</Link>
//           <Link to="/archive">Archive</Link>
//           <Link to="/review">Review</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <h1>Consensus</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/questions">Questions</Link>
          <Link to="/users">Users</Link>
          <Link to="/create">CreateQuestion</Link>
          <Link to="/group">CreateGroup</Link>
          <Link to="/groups">Groups</Link>
          <Link to="/mygroups">MyGroups</Link>
          <Link to="/invites">Invites</Link>
          {/* Only show Archive and Review links for admin users */}
          {isAdmin && (
            <>
              <Link to="/archive">Archive</Link>
              <Link to="/review">Review</Link>
            </>
          )}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin, // Check if the user is an admin
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
