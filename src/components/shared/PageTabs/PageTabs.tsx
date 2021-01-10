/**
 * Component for on the profile and group pages which lists all the viewable tabs.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { ProfileTab } from '../../profile/ProfileBody/ProfileBody';
import classNames from 'classnames';

type Tab = {
  tab: number;
  onView: () => void;
  content: ReactNode;
};

interface Props {
  currentTab: number;
  tabs: Tab[];
}

const useStyles = createUseStyles(styles);

const PageTabs: React.FunctionComponent<Props> = ({ currentTab, tabs }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.tabs, 'tabs')}>
      {tabs.map((tab: Tab) => (
        <p
          className={classNames(classes.tab, currentTab === tab.tab && classes.currentTab)}
          onClick={tab.onView}
          key={tab.tab}
        >
          {tab.content}
        </p>
      ))}
    </div>
  );
};

export default PageTabs;
