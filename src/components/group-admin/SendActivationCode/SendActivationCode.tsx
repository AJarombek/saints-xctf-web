/**
 * Component for sending an activation code to an email.
 * @author Andrew Jarombek
 * @since 1/19/2021
 */

import React, { ChangeEvent, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { AJButton } from 'jarombek-react-components';
import CheckBox from '../../shared/CheckBox';
import { GroupMeta, RootState, TeamMeta } from '../../../redux/types';
import LoadingSpinner from '../../shared/LoadingSpinner';
import classNames from 'classnames';
import { createActivationCode, sendActivationCodeEmail } from '../../../redux/modules/auth';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup';

interface Props {
  groupId: number;
}

const useStyles = createUseStyles(styles);

const emailPattern = /^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/;

const SendActivationCode: React.FunctionComponent<Props> = ({ groupId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups?.group);
  const teamInfo: Record<string, TeamMeta> = useSelector((state: RootState) => state.groups.team ?? {});

  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [approval, setApproval] = useState(false);
  const [sending, setSending] = useState(false);
  const [activationCodeNotSent, setActivationCodeNotSent] = useState<string>(null);
  const [errorCreatingActivationCode, setErrorCreatingActivationCode] = useState(false);
  const [errorSendingActivationCodeEmail, setErrorSendingActivationCodeEmail] = useState(false);

  const group: GroupMeta = useMemo(() => {
    return groups ? groups[groupId] : null;
  }, [groups, groupId]);

  const teamTitle: string = useMemo(() => {
    return teamInfo[groupId]?.title;
  }, [groupId, teamInfo]);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!newEmail) {
      setEmailStatus(ImageInputStatus.NONE);
    } else {
      if (emailPattern.test(email)) {
        setEmailStatus(ImageInputStatus.SUCCESS);
      } else {
        setEmailStatus(ImageInputStatus.FAILURE);
      }
    }
  };

  const onReset = (): void => {
    setApproval(false);
    setEmail('');
    setEmailStatus(ImageInputStatus.NONE);
  };

  const onSendActivationCodeEmail = async (email: string, activationCode: string): Promise<void> => {
    setSending(true);
    const emailSent = await dispatch(sendActivationCodeEmail(email, `${activationCode}`));
    setErrorSendingActivationCodeEmail(!emailSent);
    setSending(false);
  };

  const onSendActivationCode = async (): Promise<void> => {
    setSending(true);
    const activationCode = await dispatch(createActivationCode(email, groupId));

    if (activationCode) {
      await onSendActivationCodeEmail(email, `${activationCode}`);
    } else {
      setActivationCodeNotSent(`${activationCode}`);
      setErrorCreatingActivationCode(true);
      setSending(false);
    }
  };

  return (
    <>
      <div className={classes.sendActivationCode}>
        <h3 className={classes.title}>Send Activation Code</h3>
        <div className={classes.container}>
          <p className={classes.inputTitle}>Enter an Email Address</p>
          <ImageInput
            type="text"
            name="email"
            placeholder=""
            useCustomValue={true}
            value={email}
            onChange={onChangeEmail}
            status={emailStatus}
            className={classes.input}
          />
          {emailStatus === ImageInputStatus.SUCCESS && (
            <>
              <div className={classes.approvalMessage}>
                Sending an email to this address will give its recipient access to the <strong>{teamTitle}</strong> team
                and <strong>{group.group_title}</strong> group.
              </div>
              <div className={classes.approval}>
                <CheckBox id="emailApproval" checked={approval} onChange={(): void => setApproval(!approval)} />
                <p>I Approve</p>
              </div>
              <div className={classes.actions}>
                <AJButton type="text" onClick={onReset} disabled={sending}>
                  Reset
                </AJButton>
                <AJButton
                  type="contained"
                  onClick={onSendActivationCode}
                  disabled={sending || !approval}
                  className={classNames(classes.button, (sending || !approval) && classes.disabledButton)}
                >
                  <p>{sending ? 'Sending' : 'Send Activation Code'}</p>
                  {sending && <LoadingSpinner className={classes.spinner} />}
                </AJButton>
              </div>
            </>
          )}
        </div>
      </div>
      {errorCreatingActivationCode && (
        <DefaultErrorPopup
          message="An unexpected error occurred while creating a new activation code."
          onClose={(): void => setErrorCreatingActivationCode(false)}
        />
      )}
      {errorSendingActivationCodeEmail && (
        <DefaultErrorPopup
          message="An unexpected error occurred while sending the new activation code to the email address entered."
          onClose={(): void => setErrorSendingActivationCodeEmail(false)}
          retryable={true}
          onRetry={(): Promise<void> => onSendActivationCodeEmail(email, activationCodeNotSent)}
        />
      )}
    </>
  );
};

export default SendActivationCode;
