/**
 * Home navigation bar displayed at the top of the home page.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React, {useState, createRef} from 'react';
import {createUseStyles} from "react-jss";
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import styles from "./styles";
import { AJButton, AJMobileHamburger, AJNavList } from 'jarombek-react-components';

// @ts-ignore
import saintsXCTFLogo from '../../../../assets/saintsxctf_logo.png';

interface IProps {
  includeHeaders?: Array<string>;
  signOut?: () => void;
}

const useStyles = createUseStyles(styles);

const NavBar: React.FunctionComponent<IProps> = ({ includeHeaders = [], signOut = () => {} }) => {
  const classes = useStyles();

  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  const mobileHamburgerRef: React.RefObject<HTMLInputElement> = createRef();

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
  const navigateMobile = (path: string) => {
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
      onClick: signOut
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
        mobileHamburgerRef.current?.click();
      }
    },
    {
      name: 'testimonials',
      content: 'Testimonials',
      onClick: () => {
        navigateMobile('#testimonials');
        mobileHamburgerRef.current?.click();
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
            <AJButton type="text" className="homeButton" onClick={() => history.push('/')}>
              Home
            </AJButton>
          }
          { includeHeaders.includes('about') &&
            <AJButton type="text" className="aboutButton" onClick={() => {
              history.push('/#about');
              hashRoute();
            }}>
              About
            </AJButton>
          }
          { includeHeaders.includes('testimonials') &&
            <AJButton type="text"  className="testimonialsButton" onClick={() => {
              history.push('/#testimonials');
              hashRoute();
            }}>
              Testimonials
            </AJButton>
          }
          { includeHeaders.includes('register') &&
            <AJButton type="outlined" className="registerButton" onClick={() => history.push('/register')}>
              Register
            </AJButton>
          }
          { includeHeaders.includes('signIn') &&
            <AJButton type="contained" className="signInButton" onClick={() => history.push('/signin')}>
              Sign In
            </AJButton>
          }
          { includeHeaders.includes('dashboard') &&
            <AJButton type="text" className="dashboardButton" onClick={() => history.push('/dashboard')}>
              Dashboard
            </AJButton>
          }
          { includeHeaders.includes('profile') &&
            <AJButton type="text" className="profileButton" onClick={() => history.push('/profile')}>
              Profile
            </AJButton>
          }
          { includeHeaders.includes('groups') &&
            <AJButton type="text" className="groupsButton" onClick={() => history.push('/groups')}>
              Groups
            </AJButton>
          }
          { includeHeaders.includes('admin') &&
            <AJButton type="outlined" className="adminButton" onClick={() => history.push('/admin')}>
              Admin
            </AJButton>
          }
          { includeHeaders.includes('signOut') &&
            <AJButton type="contained" className="signOutButton" onClick={signOut}>
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

export default NavBar;
