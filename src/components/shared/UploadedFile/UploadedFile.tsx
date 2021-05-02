/**
 * Component which displays an uploaded file and its progress of being uploaded to the server.
 * @author Andrew Jarombek
 * @since 2/10/2021
 */

import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';
import { Meta, UploadingPicture } from '../../../redux/types';
import ProgressBar from '../ProgressBar';

interface Props {
  file: File;
  setFile: Dispatch<SetStateAction<File>>;
  uploadingPicture: UploadingPicture & Meta;
  className?: ClassValue;
}

const useStyles = createUseStyles(styles);

const UploadedFile: React.FunctionComponent<Props> = ({ file, setFile, uploadingPicture, className }) => {
  const classes = useStyles();

  const percentUploaded = useMemo(() => {
    return uploadingPicture ? (uploadingPicture.uploadedSize / uploadingPicture.totalSize) * 100 : 0;
  }, [uploadingPicture]);

  const generateFileSize = useCallback((size) => {
    if (size) {
      if (size < 1_000) {
        return `${Math.round(size)}B`;
      } else if (size < 1_000_000) {
        return `${Math.round(size / 1_000)}KB`;
      } else {
        return `${Math.round(size / 1_000_000)}MB`;
      }
    } else {
      return null;
    }
  }, []);

  return (
    <div className={classNames(classes.uploadedFile, className)} data-cypress="uploadedFile">
      <p>{file?.name}</p>
      <div className={classes.progressSection}>
        <ProgressBar
          progress={percentUploaded}
          inProgress={uploadingPicture?.isFetching}
          className={classes.progressBar}
        />
        <p className={classes.removeIcon} onClick={(): void => setFile(null)}>
          &#xe019;
        </p>
      </div>
      <div className={classes.uploadStatus}>
        {!!uploadingPicture?.isFetching && (
          <p className={classes.uploadPercentage}>
            {`${percentUploaded.toFixed(2)}%`} - {generateFileSize(uploadingPicture.uploadedSize)} of{' '}
            {generateFileSize(uploadingPicture.totalSize)}
          </p>
        )}
        {!uploadingPicture?.isFetching && !!uploadingPicture?.serverError && (
          <p className={classes.uploadFailed} data-cypress="uploadedFileError">
            Picture Upload Failed!
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadedFile;
