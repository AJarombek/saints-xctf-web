/**
 * Snapshot test for the Calendar component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Calendar from '../../../src/components/profile/Calendar';
import { andy } from '../../test-utils/userMocks';
import { oneRun } from '../../test-utils/rangeViewMocks';
import moment from 'moment';

const mockStore = configureStore([thunk]);

describe('Calendar Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Calendar rangeViews={oneRun} filter="r" user={andy} month={moment('09-01-2021', 'MM-DD-YYYY')} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
