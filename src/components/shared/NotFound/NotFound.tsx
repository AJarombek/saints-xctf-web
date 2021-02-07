/**
 * Component for a not found page (a client-side 404 error page).
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

// @ts-ignore
import saintsXCTFLogo from '../../../../assets/saintsxctf_logo.png';

interface Props {
  fullPage: boolean;
  className?: ClassValue;
}

const useStyles = createUseStyles(styles);

const NotFound: React.FunctionComponent<Props> = ({ fullPage, className }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.container, fullPage && classes.fullPageContainer, className)}>
      <img src={saintsXCTFLogo} alt="" className={classes.logo} />
      <h4 className={classes.title}>Page Not Found</h4>
      <p className={classes.description}>The requested page is invalid or no longer exists.</p>
    </div>
  );
};

export default NotFound;
