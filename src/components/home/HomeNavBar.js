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

const HomeNavBar = ({ excludeHeaders = [] }) => {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  const mobileHamburgerRef = createRef();

  const navBarClass = showDropdown ?
    classnames('sxctf-home-nav-bar', 'sxctf-home-nav-bar-dropdown-visible') :
    classnames('sxctf-home-nav-bar');

  const dropdownClass = showDropdown ?
    classnames('sxctf-nav-dropdown', 'sxctf-nav-dropdown-visible') :
    classnames('sxctf-nav-dropdown');

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
          { !excludeHeaders.includes('about') &&
            <AJButton type="text" onClick={() => {
              history.push('/#about');
              hashRoute();
            }}>
              About
            </AJButton>
          }
          { !excludeHeaders.includes('testimonials') &&
            <AJButton type="text" onClick={() => {
              history.push('/#testimonials');
              hashRoute();
            }}>
              Testimonials
            </AJButton>
          }
          { !excludeHeaders.includes('register') &&
            <AJButton type="outlined" onClick={() => history.push('/register')}>
              Register
            </AJButton>
          }
          { !excludeHeaders.includes('signIn') &&
            <AJButton type="contained" onClick={() => history.push('/signin')}>
              Sign In
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
        <AJNavList items={mobileNavItems.filter(item => !excludeHeaders.includes(item.name))}/>
      </div>
    </>
  );
};

HomeNavBar.propTypes = {
  excludeHeaders: PropTypes.arrayOf(PropTypes.string)
};

export default HomeNavBar;
