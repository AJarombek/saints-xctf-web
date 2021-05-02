/**
 * Snapshot test for the PickTeams component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PickTeams from '../../../src/components/profile/PickTeams';
import { MemoryRouter } from 'react-router-dom';
import { andyUserDetails } from '../../test-utils/userMocks';

const mockStore = configureStore([thunk]);

describe('PickTeams Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <PickTeams
              username="andy"
              userDetails={andyUserDetails}
              membershipChangesMade={false}
              setMembershipChangesMade={null}
            />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
