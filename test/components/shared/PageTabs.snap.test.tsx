/**
 * Snapshot test for the PageTabs component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import PageTabs from '../../../src/components/shared/PageTabs';
import { ProfileTab } from '../../../src/components/profile/ProfileBody/ProfileBody';

describe('PageTabs Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <PageTabs
          currentTab={ProfileTab.LOGS}
          tabs={[
            { tab: ProfileTab.LOGS, onView: (): void => null, content: 'Exercise Logs' },
            { tab: ProfileTab.CALENDAR, onView: (): void => null, content: 'Monthly Calendar' },
            { tab: ProfileTab.CHART, onView: (): void => null, content: 'Weekly Chart' },
            { tab: ProfileTab.DETAILS, onView: (): void => null, content: 'Details' }
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
