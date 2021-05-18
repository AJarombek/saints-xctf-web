/**
 * Component on the profile page which shows the flair given to the user.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { FlairMeta } from '../../../redux/types';
import classNames from 'classnames';

interface Props {
  flair?: FlairMeta;
}

const useStyles = createUseStyles(styles);

const Flair: React.FunctionComponent<Props> = ({ flair = {} }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.flair, 'flairList')}>
      {flair.items?.slice(0, 2).map((item) => (
        <p key={item.flair_id} data-cypress="flair">
          {item.flair}
        </p>
      ))}
    </div>
  );
};

export default memo<Props>(Flair);
