/**
 * Component for editing a group as an admin.
 * @author Andrew Jarombek
 * @since 1/26/2021
 */

import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import UploadGroupPicture from '../UploadGroupPicture';
import { Group, GroupMeta } from '../../../redux/types';
import AutoResizeTextArea from '../../shared/AutoResizeTextArea';
import RadioButton from '../../shared/RadioButton';
import { AJButton } from 'jarombek-react-components';
import { useDispatch } from 'react-redux';
import { putGroup } from '../../../redux/modules/groups';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup';
import LoadingSpinner from '../../shared/LoadingSpinner';
import classNames from 'classnames';

interface Props {
  group: GroupMeta;
}

const useStyles = createUseStyles(styles);

const EditGroup: React.FunctionComponent<Props> = ({ group }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const descriptionRef = useRef(null);

  const [description, setDescription] = useState('');
  const [weekStart, setWeekStart] = useState('');

  const [updatingGroupDetails, setUpdatingGroupDetails] = useState(false);
  const [errorUpdatingGroupDetails, setErrorUpdatingGroupDetails] = useState(false);

  const resetDetails = (groupDetails: Group): void => {
    setDescription(groupDetails.description);
    setWeekStart(groupDetails.week_start);
  };

  useEffect(() => {
    if (group) {
      resetDetails(group);
    }
  }, [group]);

  const onWeekStartChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setWeekStart(e.target.value);
    }
  };

  const onSubmitDetails = async (): Promise<void> => {
    setUpdatingGroupDetails(true);

    const newGroup: Group = {
      id: group.id,
      group_name: group.group_name,
      group_title: group.group_title,
      grouppic_name: group.grouppic_name,
      description,
      week_start: weekStart
    };

    const updatedGroup = (await dispatch(putGroup(newGroup))) as Group;

    if (updatedGroup) {
      resetDetails(updatedGroup);
    } else {
      setErrorUpdatingGroupDetails(true);
    }

    setUpdatingGroupDetails(false);
  };

  const onCancelDetails = (): void => {
    resetDetails(group);
  };

  return (
    <div className={classes.editGroup}>
      <h3 className={classes.title}>Group Details</h3>
      <div className={classes.form}>
        <div>
          <p className={classes.inputTitle}>Description</p>
          <AutoResizeTextArea
            maxLength={1000}
            placeholder="..."
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setDescription(e.target.value)}
            useCustomValue={true}
            value={description}
            disabled={false}
            className={classes.textArea}
            ref={descriptionRef}
          />
        </div>
        <div>
          <p className={classes.inputTitle}>Week Start</p>
          <div className={classes.radioGroup}>
            <RadioButton
              id="sunday"
              name="weekStart"
              value="sunday"
              label="Sunday"
              onChange={onWeekStartChange}
              defaultChecked={group.week_start === 'sunday'}
              className={classes.radio}
            />
            <RadioButton
              id="monday"
              name="weekStart"
              value="monday"
              label="Monday"
              onChange={onWeekStartChange}
              defaultChecked={group.week_start === 'monday'}
              className={classes.radio}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <AJButton
            type="contained"
            disabled={false}
            onClick={onSubmitDetails}
            className={classNames(classes.submitButton, updatingGroupDetails && classes.disabledSubmitButton)}
          >
            <p>{updatingGroupDetails ? 'Saving Details...' : 'Save Details'}</p>
            {updatingGroupDetails && <LoadingSpinner className={classes.buttonSpinner} />}
          </AJButton>
          <AJButton type="text" disabled={false} onClick={onCancelDetails} className={classes.cancelButton}>
            Cancel
          </AJButton>
        </div>
      </div>
      <h3 className={classes.title}>Profile Picture</h3>
      <div className={classes.form}>
        <UploadGroupPicture
          group={group}
          groupPictureUrl={
            group.grouppic_name ? `/uasset/group/${group.id}/${group.grouppic_name}` : '/asset/saintsxctf.png'
          }
        />
      </div>
      {errorUpdatingGroupDetails && (
        <DefaultErrorPopup
          message="Failed to update the group details"
          onClose={(): void => setErrorUpdatingGroupDetails(false)}
          retryable={true}
          onRetry={onSubmitDetails}
        />
      )}
    </div>
  );
};

export default EditGroup;
