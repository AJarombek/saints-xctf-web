/**
 * Component for displaying a list of statistics.
 * @author Andrew Jarombek
 * @since 11/14/2020
 */

import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';

interface Props {
  title: ReactNode;
  sections: Array<object>;
}

const useStyles = createUseStyles(styles);

const StatisticSection: React.FunctionComponent<Props> = ({ title, stats }) => {
  const classes = useStyles();

  return (
    <div className={classes.stats}>
      <h5>{title}</h5>
      {stats.map((stat, i) => (
        <div key={i} className={classes.section}>
          <p>{stat.name}</p>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticSection;
