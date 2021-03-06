/**
 * Snapshot test for the MonthlyCalendar component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MonthlyCalendar from '../../../src/components/profile/MonthlyCalendar';
import { andy } from '../../test-utils/userMocks';
import { oneRun } from '../../test-utils/rangeViewMocks';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('MonthlyCalendar Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly when leaving group', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MonthlyCalendar rangeViews={oneRun} user={andy} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
