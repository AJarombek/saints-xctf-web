/**
 * Home navigation bar displayed at the top of the home page.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React, {useState, createRef} from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { AJButton, AJMobileHamburger, AJNavList } from 'jarombek-react-components';
import saints_xctf_logo from '../../assets/saintsxctf_logo.png';

const HomeNavBar = () => {
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

  return (
    <>
      <div className={navBarClass}>
        <figure className="sxctf-logo">
          <img src={saints_xctf_logo} onClick={() => history.push('#')}/>
        </figure>
        <h1 onClick={() => history.push('#')}>SaintsXCTF</h1>
        <div className="sxctf-nav-buttons">
          <AJButton type="text" onClick={() => {
            history.push('/#about');
            hashRoute();
          }}>
            About
          </AJButton>
          <AJButton type="text" onClick={() => {
            history.push('/#testimonials');
            hashRoute();
          }}>
            Testimonials
          </AJButton>
          <AJButton type="outlined" onClick={() => history.push('/signup')}>
            Sign Up
          </AJButton>
          <AJButton type="contained" onClick={() => history.push('/login')}>
            Log In
          </AJButton>
        </div>
        <div className="sxctf-nav-hamburger">
          <AJMobileHamburger
            onClick={() => setShowDropdown(!showDropdown)}
            ref={mobileHamburgerRef}
          />
        </div>
      </div>
      <div className={dropdownClass}>
        <AJNavList
          items={[
            {
              content: 'About',
              onClick: () => {
                navigateMobile('#about');
                mobileHamburgerRef.current.click();
              }
            },
            {
              content: 'Testimonials',
              onClick: () => {
                navigateMobile('#testimonials');
                mobileHamburgerRef.current.click();
              }
            },
            {
              content: 'Sign Up',
              onClick: () => navigateMobile('/signup')
            },
            {
              content: 'Log In',
              onClick: () => navigateMobile('/login')
            },
            {
              content: <img className="mobile-dropdown-logo" src={saints_xctf_logo} />,
              onClick: () => navigateMobile('#')
            }
          ]}
        />
      </div>
    </>
  );
};

export default HomeNavBar;
