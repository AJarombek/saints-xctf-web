/**
 * Component where admins upload group pictures or users upload profile pictures.
 * @author Andrew Jarombek
 * @since 12/21/2020
 */

import React, { Dispatch, SetStateAction } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import UploadFile from '../../shared/UploadFile/UploadFile';
import { AJButton } from 'jarombek-react-components';
import LoadingSpinner from '../../shared/LoadingSpinner';
import classNames from 'classnames';
import DefaultErrorPopup from '../DefaultErrorPopup';
import UploadedFile from '../UploadedFile';
import { Meta, UploadingPicture } from '../../../redux/types';

interface Props {
  pictureUrl: string;
  uploadingPicture: UploadingPicture & Meta;
  errorUpdating?: boolean;
  errorUpdatingMessage?: string;
  onCloseErrorUpdatingModal: () => void;
  onRetryUpdate: () => void;
  errorUploading?: boolean;
  errorUploadingMessage?: string;
  onCloseErrorUploadingModal: () => void;
  onRetryUpload: () => void;
  file: File;
  setFile: Dispatch<SetStateAction<File>>;
  saving: boolean;
  onSubmitPicture: () => void;
  onCancelPicture: () => void;
}

const useStyles = createUseStyles(styles);

const UploadPicture: React.FunctionComponent<Props> = ({
  pictureUrl,
  uploadingPicture,
  errorUpdating,
  errorUpdatingMessage,
  onCloseErrorUpdatingModal,
  onRetryUpdate,
  errorUploading,
  errorUploadingMessage,
  onCloseErrorUploadingModal,
  onRetryUpload,
  file,
  setFile,
  saving,
  onSubmitPicture,
  onCancelPicture
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.profilePictureContainer}>
        <figure className={classes.picture}>
          <img src={pictureUrl} alt="" />
        </figure>
        {!file && <UploadFile setFile={setFile} />}
        {!!file && <UploadedFile setFile={setFile} file={file} uploadingPicture={uploadingPicture} />}
      </div>
      <div className={classes.actions}>
        <AJButton
          type="contained"
          disabled={!file || saving}
          onClick={onSubmitPicture}
          className={classNames(classes.submitButton, saving && classes.disabledSubmitButton)}
        >
          <p>{saving ? 'Saving Picture...' : 'Save Picture'}</p>
          {saving && <LoadingSpinner className={classes.buttonSpinner} />}
        </AJButton>
        <AJButton type="text" disabled={false} onClick={onCancelPicture} className={classes.cancelButton}>
          Cancel
        </AJButton>
      </div>
      {errorUploading && (
        <DefaultErrorPopup
          message={errorUploadingMessage}
          onClose={onCloseErrorUploadingModal}
          retryable={true}
          onRetry={onRetryUpload}
        />
      )}
      {errorUpdating && (
        <DefaultErrorPopup
          message={errorUpdatingMessage}
          onClose={onCloseErrorUpdatingModal}
          retryable={true}
          onRetry={onRetryUpdate}
        />
      )}
    </>
  );
};

export default UploadPicture;
