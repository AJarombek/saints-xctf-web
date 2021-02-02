/**
 * Component for editing a group as an admin.
 * @author Andrew Jarombek
 * @since 1/26/2021
 */

import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import UploadGroupPicture from '../UploadGroupPicture';
import { GroupMeta } from '../../../redux/types';
import AutoResizeTextArea from '../../shared/AutoResizeTextArea';
import RadioButton from '../../shared/RadioButton';

interface Props {
  group: GroupMeta;
}

const useStyles = createUseStyles(styles);

const EditGroup: React.FunctionComponent<Props> = ({ group }) => {
  const classes = useStyles();

  const descriptionRef = useRef(null);

  const [description, setDescription] = useState('');
  const [weekStart, setWeekStart] = useState('');

  const onWeekStartChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setWeekStart(e.target.value);
    }
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
    </div>
  );
};

export default EditGroup;
