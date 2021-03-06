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
import { basicStats } from '../../test-utils/statsMocks';

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
            <GroupDetails group={alumni} stats={basicStats} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
