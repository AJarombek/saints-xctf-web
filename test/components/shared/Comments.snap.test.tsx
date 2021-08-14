/**
 * Snapshot test for the Comments component.
 * @author Andrew Jarombek
 * @since 8/17/2020
 */

import React from 'react';
import Comments from '../../../src/components/shared/Comments';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { andy } from '../../test-utils/userMocks';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const mockStore = configureStore([thunk]);

describe('Comments Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <Comments
              comments={[
                {
                  comment_id: 1,
                  username: 'andy',
                  first: 'Andy',
                  last: 'Jarombek',
                  log_id: 3,
                  time: '2020-08-17 19:00:00',
                  content: 'Test comment.'
                }
              ]}
              feel={6}
              logId={2}
              logUsername="andy"
              user={andy}
              inFeed={false}
            />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
