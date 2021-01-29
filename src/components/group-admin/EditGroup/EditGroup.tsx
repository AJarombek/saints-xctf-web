/**
 * Component for editing a group as an admin.
 * @author Andrew Jarombek
 * @since 1/26/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import UploadGroupPicture from '../UploadGroupPicture';
import { GroupMeta } from '../../../redux/types';

interface Props {
  group: GroupMeta;
}

const useStyles = createUseStyles(styles);

const EditGroup: React.FunctionComponent<Props> = ({ group }) => {
  const classes = useStyles();

  return (
    <div className={classes.editGroup}>
      <h3 className={classes.title}>Group Details</h3>
      <div className={classes.form}>

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
