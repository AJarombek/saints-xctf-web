/**
 * Component where admins upload group pictures or users upload profile pictures.
 * @author Andrew Jarombek
 * @since 12/21/2020
 */

import React, {Dispatch, SetStateAction, useMemo} from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import UploadFile from '../../shared/UploadFile/UploadFile';
import { AJButton } from 'jarombek-react-components';
import LoadingSpinner from '../../shared/LoadingSpinner';
import classNames from 'classnames';
import AlertPopup from '../../shared/AlertPopup';

type UploadPictureType = 'user' | 'group';

interface Props {
  pictureType: UploadPictureType;
  pictureUrl: string;
  onUpload: () => Promise<void>;
  errorUpdating?: boolean;
  onCloseErrorUpdatingModal: () => void;
  onRetry: () => void;
  setFile: Dispatch<SetStateAction<File>>;
  saving: boolean;
}

const useStyles = createUseStyles(styles);

const UploadPicture: React.FunctionComponent<Props> = ({
  pictureType,
  pictureUrl,
  onUpload,
  errorUpdating,
  onCloseErrorUpdatingModal,
  onRetry,
  setFile,
  saving
}) => {
  const classes = useStyles();

  const errorUpdatingMessage = useMemo(() => {
    if (pictureType === 'group') {
      return 'Failed to update your user details with the new profile picture.';
    } else if (pictureType === 'user') {
      return 'Failed to update group details with the new group picture.';
    } else {
      return null;
    }
  }, [pictureType]);

  const onSubmitPicture = (): void => {};

  const onCancelPicture = (): void => {};

  return (
    <>
      <div className={classes.profilePictureContainer}>
        <figure className={classes.picture}>
          <img src={pictureUrl} alt="" />
        </figure>
        <UploadFile onUpload={onUpload} setFile={setFile} />
      </div>
      <div className={classes.actions}>
        <AJButton
          type="contained"
          disabled={false}
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
      {errorUpdating && (
        <AlertPopup
          message={
            <div className={classes.alertMessage}>
              <p>
                {errorUpdatingMessage} If this error persists, contact{' '}
                <a className={classes.emailLink} href="mailto:andrew@jarombek.com">
                  andrew@jarombek.com
                </a>
                .
              </p>
              <p onClick={onRetry} className={classes.retry}>
                Retry
              </p>
            </div>
          }
          onClose={onCloseErrorUpdatingModal}
          type="error"
        />
      )}
    </>
  );
};

export default UploadPicture;
