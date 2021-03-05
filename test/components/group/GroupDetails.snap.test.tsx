/**
 * Snapshot test for the GroupDetails component.
 * @author Andrew Jarombek
 * @since 3/4/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { alumni } from '../../test-utils/groupMocks';
import GroupDetails from '../../../src/components/group/GroupDetails';

const mockStore = configureStore([thunk]);

describe('GroupDetails Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <GroupDetails
              group={alumni}
              stats={{
                miles_all_time: 50,
                miles_past_year: 40,
                miles_past_month: 30,
                miles_past_week: 20,
                run_miles_all_time: 40,
                run_miles_past_year: 30,
                run_miles_past_month: 20,
                run_miles_past_week: 10,
                feel_all_time: 6.5,
                feel_past_year: 6.6,
                feel_past_month: 7.1,
                feel_past_week: 7.2
              }}
            />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
