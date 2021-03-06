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
import AlertPopup from '../../shared/AlertPopup';

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
  const [activationCode, setActivationCode] = useState<string>(null);
  const [activationCodeSentEmail, setActivationCodeSentEmail] = useState<string>(null);
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
      if (emailPattern.test(newEmail)) {
        setEmailStatus(ImageInputStatus.SUCCESS);
      } else {
        setEmailStatus(ImageInputStatus.FAILURE);
      }
    }
  };

  const onReset = (): void => {
    setActivationCode(null);
    setApproval(false);
    setEmail('');
    setEmailStatus(ImageInputStatus.NONE);
  };

  const onSendActivationCodeEmail = async (email: string, code: string): Promise<void> => {
    setSending(true);
    const emailSent = await dispatch(sendActivationCodeEmail(email, `${code}`));
    setErrorSendingActivationCodeEmail(!emailSent);
    setSending(false);

    if (emailSent) {
      setActivationCodeSentEmail(email);
      onReset();
    }
  };

  const onSendActivationCode = async (): Promise<void> => {
    setSending(true);
    const code = await dispatch(createActivationCode(email, groupId));

    if (code) {
      setActivationCode(`${code}`);
      await onSendActivationCodeEmail(email, `${code}`);
    } else {
      setErrorCreatingActivationCode(true);
      setSending(false);
    }
  };

  return (
    <>
      <div className={classes.sendActivationCode} id="sendActivationCode">
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
              <div className={classes.approvalMessage} data-cypress="approvalMessage">
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
          message="An unexpected error occurred while creating a new activation code"
          onClose={(): void => setErrorCreatingActivationCode(false)}
          closeable={true}
        />
      )}
      {errorSendingActivationCodeEmail && (
        <DefaultErrorPopup
          message="An unexpected error occurred while sending the new activation code to the email address entered"
          onClose={(): void => setErrorSendingActivationCodeEmail(false)}
          closeable={true}
          retryable={true}
          onRetry={(): Promise<void> => onSendActivationCodeEmail(email, activationCode)}
        />
      )}
      {!!activationCodeSentEmail && (
        <AlertPopup
          message={`Activation code sent to ${activationCodeSentEmail}!`}
          onClose={(): void => setActivationCodeSentEmail(null)}
          type="success"
          autoCloseInterval={3000}
        />
      )}
    </>
  );
};

export default SendActivationCode;
