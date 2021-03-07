/**
 * Snapshot test for the ProfileDetails component.
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
import ProfileDetails from '../../../src/components/profile/ProfileDetails';
import { andy } from '../../test-utils/userMocks';
import { basicStats } from '../../test-utils/statsMocks';

const mockStore = configureStore([thunk]);

describe('ProfileDetails Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ProfileDetails user={andy} stats={basicStats} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
