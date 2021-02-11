/**
 * Component which displays an uploaded file and its progress of being uploaded to the server.
 * @author Andrew Jarombek
 * @since 2/10/2021
 */

import React, { Dispatch, SetStateAction } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

interface Props {
  setFile: Dispatch<SetStateAction<File>>;
  className?: ClassValue;
}

const useStyles = createUseStyles(styles);

const UploadedFile: React.FunctionComponent<Props> = ({ setFile, className }) => {
  const classes = useStyles();

  return <div className={classNames(classes.uploadedFile, className)}></div>;
};

export default UploadedFile;
