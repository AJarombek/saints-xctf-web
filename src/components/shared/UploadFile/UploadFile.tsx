/**
 * Component which uploads a file either via drag-and-drop or input click.
 * @author Andrew Jarombek
 * @since 11/20/2020
 */

import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

interface Props {
  setFile: Dispatch<SetStateAction<File>>;
  className?: ClassValue;
}

const useStyles = createUseStyles(styles);

const UploadFile: React.FunctionComponent<Props> = ({ setFile, className }) => {
  const classes = useStyles();

  const fileInputRef = useRef(null);

  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((count) => ++count);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((count) => --count);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files?.length) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  const handleClickUpload = (): void => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files[0]);
  };

  return (
    <div
      className={classNames(
        classes.uploadFile,
        !!dragCounter ? classes.uploadFileBoxDrag : classes.uploadFileBoxEmpty,
        className
      )}
      data-cypress="uploadFile"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClickUpload}
    >
      <input
        type="file"
        accept="image/*"
        className={classes.hiddenInput}
        onChange={handleFileInput}
        ref={fileInputRef}
      />
      <p className={classNames(classes.uploadText, !!dragCounter ? classes.uploadTextDrag : classes.uploadTextEmpty)}>
        Click here or drag and drop a file.
      </p>
    </div>
  );
};

export default UploadFile;
