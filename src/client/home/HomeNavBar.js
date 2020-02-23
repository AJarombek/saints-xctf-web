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

  return (
    <>
      <div className={navBarClass}>
        <figure className="sxctf-logo">
          <img src={saints_xctf_logo}/>
        </figure>
        <h1>SaintsXCTF</h1>
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
            {text: 'About', onClick: () => history.push('/#about')},
            {text: 'Testimonials', onClick: () => history.push('/#testimonials')},
            {text: 'Sign Up', onClick: () => history.push('/signup')},
            {text: 'Log In', onClick: () => history.push('/login')}
          ]}
        />
      </div>
    </>
  );
};

export default HomeNavBar;
