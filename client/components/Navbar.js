
// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { Link, NavLink } from 'react-router-dom';
// import { logout } from '../store';

// const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-container">
//         {/* Logo or Brand Name */}
//         <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
//           MyApp
//         </Link>

//         {/* Hamburger Menu Icon */}
//         <div className="menu-icon" onClick={toggleMobileMenu} aria-label="Menu">
//           <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
//         </div>

//         {/* Navigation Links */}
//         <nav className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
//           {isLoggedIn ? (
//             <ul className="nav-links">
//               <li>
//                 <NavLink to="/home" onClick={closeMobileMenu}>
//                   Home
//                 </NavLink>
//               </li>
//               <li className="nav-item dropdown">
//                 <span className="nav-link" onClick={closeMobileMenu}>
//                   Personal <i className="fas fa-caret-down"></i>
//                 </span>
//                 <ul className="dropdown-menu">
//                   <li>
//                   <NavLink to="/profile" onClick={closeMobileMenu}>
//                   Profile
//                 </NavLink>
//                   </li>
//                   <li>
//                   <NavLink to="/users" onClick={closeMobileMenu}>
//                   Users
//                 </NavLink>
//                   </li>
//                   <li>
//                   <NavLink to="/myvotes" onClick={closeMobileMenu}>
//                   MyVotes
//                 </NavLink>
//               </li>
//                   <li>
//                     <NavLink to="/invites" onClick={closeMobileMenu}>
//                       Invites
//                     </NavLink>
//                   </li>
//                 </ul>
//               </li>

//               {/* Groups Dropdown */}
//               <li className="nav-item dropdown">
//                 <span className="nav-link" onClick={closeMobileMenu}>
//                   Groups <i className="fas fa-caret-down"></i>
//                 </span>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <NavLink to="/groups" onClick={closeMobileMenu}>
//                       Groups
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/mygroups" onClick={closeMobileMenu}>
//                       MyGroups
//                     </NavLink>
//                   </li>
//                   <li>
//                 <NavLink to="/group" onClick={closeMobileMenu}>
//                   CreateGroup
//                 </NavLink>
//               </li>
//                   <li>
//                     <NavLink to="/invites" onClick={closeMobileMenu}>
//                       Invites
//                     </NavLink>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <span className="nav-link" onClick={closeMobileMenu}>
//                   Questions <i className="fas fa-caret-down"></i>
//                 </span>
//                 <ul className="dropdown-menu">

//                   <li>
//                 <NavLink to="/archive" onClick={closeMobileMenu}>
//                   Archive
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/create" onClick={closeMobileMenu}>
//                   CreateQuestion
//                 </NavLink>
//               </li>

//                 </ul>
//               </li>

//               {/* Admin Dropdown */}
//               {isAdmin && (
//                 <li className="nav-item dropdown">
//                   <span className="nav-link" onClick={closeMobileMenu}>
//                     Admin <i className="fas fa-caret-down"></i>
//                   </span>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <NavLink to="/questions" onClick={closeMobileMenu}>
//                         Questions
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink to="/review" onClick={closeMobileMenu}>
//                         Review
//                       </NavLink>
//                     </li>
//                   </ul>
//                 </li>
//               )}

//               <li>
//                 <a href="#" onClick={handleClick} className="logout">
//                   Logout
//                 </a>
//               </li>
//             </ul>
//           ) : (
//             <ul className="nav-links">
//               <li>
//                 <NavLink to="/login" onClick={closeMobileMenu}>
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/signup" onClick={closeMobileMenu}>
//                   Sign Up
//                 </NavLink>
//               </li>
//             </ul>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//     isAdmin: state.auth.admin,
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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // For mobile dropdowns

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Close any open dropdowns
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
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
              <li className="nav-item">
                <NavLink to="/home" onClick={closeMobileMenu} className="nav-link">
                  Home
                </NavLink>
              </li>
              {/* Personal Dropdown */}
              <li
                className={`nav-item dropdown ${
                  activeDropdown === 'personal' ? 'active' : ''
                }`}
                onMouseEnter={() => setActiveDropdown('personal')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span
                  className="nav-link"
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      toggleDropdown('personal');
                    }
                  }}
                >
                  Personal <i className="fas fa-caret-down"></i>
                </span>
                <ul className="dropdown-menu">
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
                    <NavLink to="/invites" onClick={closeMobileMenu}>
                      Invites
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Groups Dropdown */}
              <li
                className={`nav-item dropdown ${
                  activeDropdown === 'groups' ? 'active' : ''
                }`}
                onMouseEnter={() => setActiveDropdown('groups')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span
                  className="nav-link"
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      toggleDropdown('groups');
                    }
                  }}
                >
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
                    <NavLink to="/group" onClick={closeMobileMenu}>
                      CreateGroup
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/invites" onClick={closeMobileMenu}>
                      Invites
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Questions Dropdown */}
              <li
                className={`nav-item dropdown ${
                  activeDropdown === 'questions' ? 'active' : ''
                }`}
                onMouseEnter={() => setActiveDropdown('questions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span
                  className="nav-link"
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      toggleDropdown('questions');
                    }
                  }}
                >
                  Questions <i className="fas fa-caret-down"></i>
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/archive" onClick={closeMobileMenu}>
                      Archive
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/create" onClick={closeMobileMenu}>
                      CreateQuestion
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Admin Dropdown */}
              {isAdmin && (
                <li
                  className={`nav-item dropdown ${
                    activeDropdown === 'admin' ? 'active' : ''
                  }`}
                  onMouseEnter={() => setActiveDropdown('admin')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span
                    className="nav-link"
                    onClick={() => {
                      if (window.innerWidth <= 768) {
                        toggleDropdown('admin');
                      }
                    }}
                  >
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

              <li className="nav-item">
                <a href="#" onClick={handleClick} className="nav-link logout">
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              <li className="nav-item">
                <NavLink to="/login" onClick={closeMobileMenu} className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" onClick={closeMobileMenu} className="nav-link">
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

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
  isAdmin: state.auth.admin,
});

const mapDispatch = (dispatch) => ({
  handleClick() {
    dispatch(logout());
  },
});

export default connect(mapState, mapDispatch)(Navbar);
