import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store';
// import logo from '../images/logo.png'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
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
        {isLoggedIn &&  (
        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
        <img src="/logo.png" alt="Logo" className="navbar-logo-image" />
        </Link>)}


        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMobileMenu} aria-label="Menu">
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        {/* Navigation Links */}
        <nav className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {isLoggedIn ? (
            <ul className="nav-links">
              {/* Home Link */}
              <li className="nav-item">
                <NavLink to="/home" onClick={closeMobileMenu} className="nav-link">
                  Home
                </NavLink>
              </li>

              {/* Personal Dropdown */}
              <li
                className={`nav-item dropdown ${activeDropdown === 'personal' ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (window.innerWidth > 768) {
                    setActiveDropdown('personal');
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 768) {
                    setActiveDropdown(null);
                  }
                }}
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
                className={`nav-item dropdown ${activeDropdown === 'groups' ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (window.innerWidth > 768) {
                    setActiveDropdown('groups');
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 768) {
                    setActiveDropdown(null);
                  }
                }}
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
                className={`nav-item dropdown ${activeDropdown === 'questions' ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (window.innerWidth > 768) {
                    setActiveDropdown('questions');
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 768) {
                    setActiveDropdown(null);
                  }
                }}
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
                  className={`nav-item dropdown ${activeDropdown === 'admin' ? 'active' : ''}`}
                  onMouseEnter={() => {
                    if (window.innerWidth > 768) {
                      setActiveDropdown('admin');
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth > 768) {
                      setActiveDropdown(null);
                    }
                  }}
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

              {/* Logout */}
              <li className="nav-item">
                <a href="#" onClick={handleClick} className="nav-link logout">
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              {/* Login and Sign Up Links */}
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
