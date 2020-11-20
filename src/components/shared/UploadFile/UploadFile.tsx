/**
 * Component which uploads a file either via drag-and-drop or input click.
 * @author Andrew Jarombek
 * @since 11/20/2020
 */

import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

interface Props {
  className?: ClassValue;
}

const useStyles = createUseStyles(styles);

const UploadFile: React.FunctionComponent<Props> = ({ className }) => {
  const classes = useStyles();

  const fileInputRef = useRef(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClickUpload = (): void => {

  };

  const handleClickUploadInput = (): void => {

  };

  return (
    <div
      className={classNames(classes.uploadFile, className)}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClickUpload}
    >
      <input type="file" className={classes.hiddenInput} onClick={handleClickUploadInput} ref={fileInputRef} />
      <p>Click here or drag and drop a file.</p>
    </div>
  );
};

export default UploadFile;
