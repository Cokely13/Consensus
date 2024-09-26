// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { logout } from '../store';

// const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
//   <div className="navbar" >
//     <nav className="navbar-links" >
//       {isLoggedIn ? (
//         <>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <Link to="/profile">Profile</Link>
//           <Link to="/users">Users</Link>
//           <Link to="/myvotes">MyVotes</Link>
//           <Link to="/create">CreateQuestion</Link>
//           <Link to="/group">CreateGroup</Link>
//           <Link to="/groups">Groups</Link>
//           <Link to="/mygroups">MyGroups</Link>
//           <Link to="/archive">Archive</Link>
//           <Link to="/invites">Invites</Link>
//           {/* Only show Archive and Review links for admin users */}
//           {isAdmin && (
//             <>
//               <Link to="/questions">Questions</Link>
//               <Link to="/review">Review</Link>
//             </>
//           )}
//           <a href="#" onClick={handleClick} className="logout">
//             Logout
//           </a>
//         </>
//       ) : (
//         <>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </>
//       )}
//     </nav>
//   </div>
// );

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//     isAdmin: state.auth.admin, // Check if the user is an admin
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

// export default connect(mapState, mapDispatch)(Navbar);

// Navbar.jsx

// Navbar.jsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo or Brand Name */}
        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
          MyApp
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMobileMenu} aria-label="Menu">
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        {/* Navigation Links */}
        <nav className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {isLoggedIn ? (
            <ul className="nav-links">
              <li>
                <NavLink to="/home" onClick={closeMobileMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" onClick={closeMobileMenu}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" onClick={closeMobileMenu}>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/myvotes" onClick={closeMobileMenu}>
                  MyVotes
                </NavLink>
              </li>
              <li>
                <NavLink to="/create" onClick={closeMobileMenu}>
                  CreateQuestion
                </NavLink>
              </li>

              {/* Groups Dropdown */}
              <li className="nav-item dropdown">
                <span className="nav-link" onClick={closeMobileMenu}>
                  Groups <i className="fas fa-caret-down"></i>
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/groups" onClick={closeMobileMenu}>
                      Groups
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/mygroups" onClick={closeMobileMenu}>
                      MyGroups
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/invites" onClick={closeMobileMenu}>
                      Invites
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Admin Dropdown */}
              {isAdmin && (
                <li className="nav-item dropdown">
                  <span className="nav-link" onClick={closeMobileMenu}>
                    Admin <i className="fas fa-caret-down"></i>
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/questions" onClick={closeMobileMenu}>
                        Questions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/review" onClick={closeMobileMenu}>
                        Review
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <li>
                <NavLink to="/archive" onClick={closeMobileMenu}>
                  Archive
                </NavLink>
              </li>
              <li>
                <NavLink to="/group" onClick={closeMobileMenu}>
                  CreateGroup
                </NavLink>
              </li>
              <li>
                <a href="#" onClick={handleClick} className="logout">
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              <li>
                <NavLink to="/login" onClick={closeMobileMenu}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" onClick={closeMobileMenu}>
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
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
