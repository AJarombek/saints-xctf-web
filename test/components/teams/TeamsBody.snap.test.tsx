/**
 * Snapshot test for the TeamsBody component.
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
import { MemoryRouter } from 'react-router-dom';
import TeamsBody from '../../../src/components/teams/TeamsBody/TeamsBody';
import { andy } from '../../test-utils/userMocks';

const mockStore = configureStore([thunk]);

describe('TeamsBody Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <TeamsBody user={andy} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
