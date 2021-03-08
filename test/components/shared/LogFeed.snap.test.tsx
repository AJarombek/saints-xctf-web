/**
 * Snapshot test for the LogFeed component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import LogFeed from '../../../src/components/shared/LogFeed';
import { andy } from '../../test-utils/userMocks';
import { march6thLog } from '../../test-utils/logMocks';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('LogFeed Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <LogFeed
              logFeeds={{
                'user-andy': {
                  filterBy: 'user',
                  bucket: 'andy',
                  pages: {
                    1: {
                      items: [march6thLog],
                      pages: 1
                    }
                  }
                }
              }}
              page={1}
              user={andy}
              filterBy="user"
              bucket="andy"
            />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
