/**
 * Home navigation bar displayed at the top of the home page.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React, {useState, createRef} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { AJButton, AJMobileHamburger, AJNavList } from 'jarombek-react-components';
import saintsXCTFLogo from '../../../assets/saintsxctf_logo.png';

const NavBar = ({ includeHeaders = [] }) => {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  const mobileHamburgerRef = createRef();

  const navBarClass = showDropdown ?
    classnames('sxctf-nav-bar', 'sxctf-nav-bar-dropdown-visible') :
    classnames('sxctf-nav-bar', 'sxctf-nav-bar-dropdown-hidden');

  const dropdownClass = showDropdown ?
    classnames('sxctf-nav-dropdown', 'sxctf-nav-dropdown-visible') :
    classnames('sxctf-nav-dropdown', 'sxctf-nav-dropdown-hidden');

  /**
   * Navigate to a new page using the mobile dropdown navigation list.
   * @param path The new path to navigate to within the website.
   */
  const navigateMobile = (path) => {
    setShowDropdown(!showDropdown);
    history.push(path);

    if (path.includes('#')) {
      hashRoute();
    }
  };

  /**
   * There is an issue with React Router not working with hashed routes.  This helper method uses
   * the DOM API to navigate to the hashed route.
   */
  const hashRoute = () => {
    const { hash } = window.location;
    if (hash !== '') {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView();
      }
    }
  };

  const mobileNavItems = [
    {
      name: 'dashboard',
      content: 'Dashboard',
      onClick: () => navigateMobile('/dashboard')
    },
    {
      name: 'profile',
      content: 'Profile',
      onClick: () => navigateMobile('/profile')
    },
    {
      name: 'groups',
      content: 'Groups',
      onClick: () => navigateMobile('/groups')
    },
    {
      name: 'admin',
      content: 'Admin',
      onClick: () => navigateMobile('/admin')
    },
    {
      name: 'signOut',
      content: 'Sign Out',
      onClick: () => {}
    },
    {
      name: 'home',
      content: 'Home',
      onClick: () => navigateMobile('/')
    },
    {
      name: 'about',
      content: 'About',
      onClick: () => {
        navigateMobile('#about');
        mobileHamburgerRef.current.click();
      }
    },
    {
      name: 'testimonials',
      content: 'Testimonials',
      onClick: () => {
        navigateMobile('#testimonials');
        mobileHamburgerRef.current.click();
      }
    },
    {
      name: 'register',
      content: 'Register',
      onClick: () => navigateMobile('/register')
    },
    {
      name: 'signIn',
      content: 'Sign In',
      onClick: () => navigateMobile('/signin')
    },
    {
      name: 'logo',
      content: <img className="mobile-dropdown-logo" src={saintsXCTFLogo} alt="" />,
      onClick: () => navigateMobile('#')
    }
  ];

  return (
    <>
      <div className={navBarClass}>
        <figure className="sxctf-logo">
          <img
            src={saintsXCTFLogo}
            onClick={() => history.push('/#')}
            alt=""
          />
        </figure>
        <h1 onClick={() => history.push('/#')}>SaintsXCTF</h1>
        <div className="sxctf-nav-buttons">
          { includeHeaders.includes('home') &&
            <AJButton type="text" onClick={() => history.push('/')}>
              Home
            </AJButton>
          }
          { includeHeaders.includes('about') &&
            <AJButton type="text" onClick={() => {
              history.push('/#about');
              hashRoute();
            }}>
              About
            </AJButton>
          }
          { includeHeaders.includes('testimonials') &&
            <AJButton type="text" onClick={() => {
              history.push('/#testimonials');
              hashRoute();
            }}>
              Testimonials
            </AJButton>
          }
          { includeHeaders.includes('register') &&
            <AJButton type="outlined" onClick={() => history.push('/register')}>
              Register
            </AJButton>
          }
          { includeHeaders.includes('signIn') &&
            <AJButton type="contained" onClick={() => history.push('/signin')}>
              Sign In
            </AJButton>
          }
          { includeHeaders.includes('dashboard') &&
            <AJButton type="text" onClick={() => history.push('/dashboard')}>
              Dashboard
            </AJButton>
          }
          { includeHeaders.includes('profile') &&
            <AJButton type="text" onClick={() => history.push('/profile')}>
              Profile
            </AJButton>
          }
          { includeHeaders.includes('groups') &&
            <AJButton type="text" onClick={() => history.push('/groups')}>
              Groups
            </AJButton>
          }
          { includeHeaders.includes('admin') &&
            <AJButton type="outlined" onClick={() => history.push('/admin')}>
              Admin
            </AJButton>
          }
          { includeHeaders.includes('signOut') &&
            <AJButton type="contained" onClick={() => history.push('/signout')}>
              Sign Out
            </AJButton>
          }
        </div>
        <div className="sxctf-nav-hamburger">
          <AJMobileHamburger
            onClick={() => setShowDropdown(!showDropdown)}
            ref={mobileHamburgerRef}
          />
        </div>
      </div>
      <div className={dropdownClass}>
        <AJNavList items={mobileNavItems.filter(item => includeHeaders.includes(item.name))}/>
      </div>
    </>
  );
};

NavBar.propTypes = {
  includeHeaders: PropTypes.arrayOf(PropTypes.string)
};

export default NavBar;
