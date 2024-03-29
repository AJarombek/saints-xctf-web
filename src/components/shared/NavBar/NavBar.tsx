/**
 * Home navigation bar displayed at the top of the home page.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React, { useState, createRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles';
import { AJButton, AJMobileHamburger, AJNavList } from 'jarombek-react-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import saintsXCTFLogo from '../../../../assets/saintsxctf_logo.png';
import { UserMeta } from '../../../redux/types';
import { useDispatch } from 'react-redux';
import { signOut, SignOutAction } from '../../../redux/modules/auth';
import { useSignInCheck } from '../../../hooks/shared';

interface Props {
  includeHeaders?: Array<string>;
  user?: UserMeta;
  bodyRef: React.RefObject<any>;
  dryTheme?: NavBarTheme;
  stickyTheme?: NavBarDropdownTheme;
  dryDropdownTheme?: NavBarDropdownTheme;
  stickyDropdownTheme?: NavBarDropdownTheme;
  dryDropdownHeaderTheme?: NavBarTheme;
  stickyDropdownHeaderTheme?: NavBarDropdownTheme;
}

type NavBarTheme = 'light' | 'dark' | 'transparent';
type NavBarDropdownTheme = 'light' | 'dark';

const useStyles = createUseStyles(styles);

const handleScroll = (ref: React.RefObject<any>, setStickyHeader: (isSticky: boolean) => void): void => {
  if (ref.current) {
    setStickyHeader(ref.current.getBoundingClientRect().top <= -100);
  }
};

const NavBar: React.FunctionComponent<Props> = ({
  includeHeaders = [],
  user,
  bodyRef,
  dryTheme = 'light',
  stickyTheme = 'light',
  dryDropdownTheme = 'light',
  stickyDropdownTheme = 'light',
  dryDropdownHeaderTheme = 'light',
  stickyDropdownHeaderTheme = 'light',
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [stickyHeader, setStickyHeader] = useState<boolean>(false);

  const mobileHamburgerRef: React.RefObject<HTMLInputElement> = createRef();

  const signedIn = useSignInCheck(false);

  useEffect(() => {
    const scrollEventListener = (): void => handleScroll(bodyRef, setStickyHeader);
    window.addEventListener('scroll', scrollEventListener);

    return (): void => {
      window.removeEventListener('scroll', scrollEventListener);
    };
  }, [bodyRef]);

  const stickyHeaderClass =
    stickyTheme === 'light'
      ? classes.lightTheme
      : stickyTheme === 'dark'
      ? classes.darkTheme
      : classes.transparentTheme;

  const dryHeaderClass =
    dryTheme === 'light' ? classes.lightTheme : dryTheme === 'dark' ? classes.darkTheme : classes.transparentTheme;

  const stickyDropdownHeaderClass =
    stickyDropdownHeaderTheme === 'light'
      ? classes.lightDropdownHeaderTheme
      : stickyDropdownHeaderTheme === 'dark'
      ? classes.darkDropdownHeaderTheme
      : classes.transparentDropdownHeaderTheme;

  const dryDropdownHeaderClass =
    dryDropdownHeaderTheme === 'light'
      ? classes.lightDropdownHeaderTheme
      : dryDropdownHeaderTheme === 'dark'
      ? classes.darkDropdownHeaderTheme
      : classes.transparentDropdownHeaderTheme;

  const headerClass = stickyHeader
    ? classnames(classes.sticky, stickyHeaderClass, stickyDropdownHeaderClass)
    : classnames(classes.dry, dryHeaderClass, dryDropdownHeaderClass);

  const stickyDropdownClass = stickyHeader
    ? classnames(
        classes.stickyDropdown,
        stickyDropdownTheme === 'light' ? classes.lightDropdownTheme : classes.darkDropdownTheme,
      )
    : classnames(
        classes.dryDropdown,
        dryDropdownTheme === 'light' ? classes.lightDropdownTheme : classes.darkDropdownTheme,
      );

  const navBarClass = showDropdown
    ? classnames('sxctf-nav-bar', 'sxctf-nav-bar-dropdown-visible', headerClass)
    : classnames('sxctf-nav-bar', 'sxctf-nav-bar-dropdown-hidden', headerClass);

  const dropdownClass = showDropdown
    ? classnames('sxctf-nav-dropdown', 'sxctf-nav-dropdown-visible', stickyDropdownClass)
    : classnames('sxctf-nav-dropdown', 'sxctf-nav-dropdown-hidden', stickyDropdownClass);

  /**
   * There is an issue with React Router not working with hashed routes.  This helper method uses
   * the DOM API to navigate to the hashed route.
   */
  const hashRoute = (): void => {
    const { hash } = window.location;
    if (hash !== '') {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView();
      }
    }
  };

  /**
   * Navigate to a new page using the mobile dropdown navigation list.
   * @param path The new path to navigate to within the website.
   */
  const navigateMobile = (path: string): void => {
    setShowDropdown(!showDropdown);
    navigate(path);

    if (path.includes('#')) {
      hashRoute();
    }
  };

  const mobileNavItems = [
    {
      name: 'dashboard',
      content: 'Dashboard',
      onClick: (): void => navigateMobile('/dashboard'),
    },
    {
      name: 'profile',
      content: 'Profile',
      onClick: (): void => navigateMobile(`/profile/${user?.username}`),
    },
    {
      name: 'teams',
      content: 'Teams',
      onClick: (): void => navigateMobile('/teams'),
    },
    {
      name: 'createNewLog',
      content: 'Create New Log',
      onClick: (): void => navigateMobile('/log/new'),
    },
    {
      name: 'admin',
      content: 'Admin',
      onClick: (): void => navigateMobile('/admin'),
    },
    {
      name: 'signOut',
      content: 'Sign Out',
      onClick: (): SignOutAction => dispatch(signOut()),
    },
    {
      name: 'home',
      content: 'Home',
      onClick: (): void => navigateMobile('/'),
    },
    {
      name: 'about',
      content: 'About',
      onClick: (): void => {
        navigateMobile('#about');
        mobileHamburgerRef.current?.click();
      },
    },
    {
      name: 'testimonials',
      content: 'Testimonials',
      onClick: (): void => {
        navigateMobile('#testimonials');
        mobileHamburgerRef.current?.click();
      },
    },
    {
      name: 'register',
      content: 'Register',
      onClick: (): void => navigateMobile('/register'),
    },
    {
      name: 'signIn',
      content: 'Sign In',
      onClick: (): void => navigateMobile('/signin'),
    },
    {
      name: 'logo',
      content: <img className="mobile-dropdown-logo" src={saintsXCTFLogo} alt="" />,
      onClick: (): void => navigateMobile(signedIn ? '/dashboard' : '/'),
    },
  ];

  return (
    <>
      <div className={navBarClass}>
        <figure className="sxctf-logo">
          <img src={saintsXCTFLogo} onClick={(): void => navigate(signedIn ? '/dashboard' : '/')} alt="" />
        </figure>
        <h1 onClick={(): void => navigate(signedIn ? '/dashboard' : '/')}>SaintsXCTF</h1>
        <div className="sxctf-nav-buttons">
          {includeHeaders.includes('home') && (
            <AJButton type="text" className="homeButton" onClick={(): void => navigate('/')}>
              Home
            </AJButton>
          )}
          {includeHeaders.includes('about') && (
            <AJButton
              type="text"
              className="aboutButton"
              onClick={(): void => {
                navigate('/#about');
                hashRoute();
              }}
            >
              About
            </AJButton>
          )}
          {includeHeaders.includes('testimonials') && (
            <AJButton
              type="text"
              className="testimonialsButton"
              onClick={(): void => {
                navigate('/#testimonials');
                hashRoute();
              }}
            >
              Testimonials
            </AJButton>
          )}
          {includeHeaders.includes('register') && (
            <AJButton type="outlined" className="registerButton" onClick={(): void => navigate('/register')}>
              Register
            </AJButton>
          )}
          {includeHeaders.includes('signIn') && (
            <AJButton type="contained" className="signInButton" onClick={(): void => navigate('/signin')}>
              Sign In
            </AJButton>
          )}
          {includeHeaders.includes('dashboard') && (
            <AJButton type="text" className="dashboardButton" onClick={(): void => navigate('/dashboard')}>
              Dashboard
            </AJButton>
          )}
          {includeHeaders.includes('profile') && (
            <AJButton
              type="text"
              className="profileButton"
              onClick={(): void => navigate(`/profile/${user?.username}`)}
            >
              Profile
            </AJButton>
          )}
          {includeHeaders.includes('teams') && (
            <AJButton type="text" className="teamsButton" onClick={(): void => navigate('/teams')}>
              Teams
            </AJButton>
          )}
          {includeHeaders.includes('admin') && (
            <AJButton type="outlined" className="adminButton" onClick={(): void => navigate('/admin')}>
              Admin
            </AJButton>
          )}
          {includeHeaders.includes('signOut') && (
            <AJButton type="contained" className="signOutButton" onClick={(): SignOutAction => dispatch(signOut())}>
              Sign Out
            </AJButton>
          )}
        </div>
        <div className="sxctf-nav-hamburger">
          <AJMobileHamburger onClick={(): void => setShowDropdown(!showDropdown)} ref={mobileHamburgerRef} />
        </div>
      </div>
      <div className={dropdownClass}>
        <AJNavList
          className={classes.navList}
          items={mobileNavItems.filter((item) => includeHeaders.includes(item.name))}
        />
      </div>
    </>
  );
};

export default NavBar;
