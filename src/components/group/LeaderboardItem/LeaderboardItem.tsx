/**
 * Component for a single item in a leaderboard bar chart.
 * @author Andrew Jarombek
 * @since 1/13/2021
 */

import React, { useMemo, memo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { CurrentLeaderboardItem } from '../Leaderboard';

const useStyles = createUseStyles(styles);

interface Props {
  item: CurrentLeaderboardItem;
  leaderMiles: number;
}

const LeaderboardItem: React.FunctionComponent<Props> = ({ item, leaderMiles }) => {
  const width = useMemo(() => {
    return (item.value / leaderMiles) * 100;
  }, [item.value, leaderMiles]);

  const classes = useStyles({ barWidth: width });

  return (
    <div key={item.username} className={classes.leaderboardItem}>
      <p className={classes.itemName}>
        {item.first} {item.last}
      </p>
      <div className={classes.bar}>
        <div className={classes.barBackground} />
        <div className={classes.barFill}>
          <p className={width < 20 ? classes.textAfter : classes.textInner}>{item.value.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(LeaderboardItem);
