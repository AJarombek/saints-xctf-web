/**
 * Home navigation bar displayed at the top of the home page.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { AJButton, AJMobileHamburger, AJNavList } from 'jarombek-react-components';
import saints_xctf_logo from '../../assets/saintsxctf_logo.png';

const HomeNavBar = () => {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  const navBarClass = showDropdown ?
    classnames('sxctf-home-nav-bar', 'sxctf-home-nav-bar-dropdown-visible') :
    classnames('sxctf-home-nav-bar');

  const dropdownClass = showDropdown ?
    classnames('sxctf-nav-dropdown', 'sxctf-nav-dropdown-visible') :
    classnames('sxctf-nav-dropdown');

  const navigateMobile = (path) => {
    setShowDropdown(!showDropdown);
    history.push(path);
  };

  return (
    <>
      <div className={navBarClass}>
        <figure className="sxctf-logo">
          <img src={saints_xctf_logo} onClick={() => history.push('#')}/>
        </figure>
        <h1 onClick={() => history.push('#')}>SaintsXCTF</h1>
        <div className="sxctf-nav-buttons">
          <AJButton type="text" onClick={() => history.push('/#about')}>
            About
          </AJButton>
          <AJButton type="text" onClick={() => history.push('/#testimonials')}>
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
          <AJMobileHamburger onClick={() => setShowDropdown(!showDropdown)}/>
        </div>
      </div>
      <div className={dropdownClass}>
        <AJNavList
          items={[
            {content: 'About', onClick: () => navigateMobile('#about')},
            {content: 'Testimonials', onClick: () => navigateMobile('#testimonials')},
            {content: 'Sign Up', onClick: () => navigateMobile('/signup')},
            {content: 'Log In', onClick: () => navigateMobile('/login')},
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
