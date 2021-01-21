/**
 * Component for sending an activation code to an email.
 * @author Andrew Jarombek
 * @since 1/19/2021
 */

import React, { ChangeEvent, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useDispatch } from 'react-redux';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { AJButton } from 'jarombek-react-components';

interface Props {
  groupId: number;
}

const useStyles = createUseStyles(styles);

const emailPattern = /^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/;

const SendActivationCode: React.FunctionComponent<Props> = ({ groupId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);

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

  return (
    <div className={classes.sendActivationCode}>
      <h3 className={classes.title}>Send Activation Code</h3>
      <div className={classes.container}>
        <p className={classes.inputTitle}>Enter an Email Address</p>
        <ImageInput
          type="date"
          name="date"
          placeholder=""
          useCustomValue={true}
          value={email}
          onChange={onChangeEmail}
          status={emailStatus}
        />
      </div>
      {emailStatus === ImageInputStatus.SUCCESS && (
        <>
          <div>
            Sending an email to this address will give its recipient access to the {'TEAM'} team and {'GROUP'} group.
          </div>
          <div>
            <p>I Approve</p>
          </div>
          <div>
            <AJButton type="text" onClick={() => {}} disabled={false}>
              Reset
            </AJButton>
            <AJButton type="contained" onClick={() => {}} disabled={false}>
              Send Activation Code
            </AJButton>
          </div>
        </>
      )}
    </div>
  );
};

export default SendActivationCode;
