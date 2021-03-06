/**
 * Snapshot test for the ProfileBody component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { andy } from '../../test-utils/userMocks';
import ProfileBody from '../../../src/components/profile/ProfileBody';
import { ProfileTab } from '../../../src/components/profile/ProfileBody/ProfileBody';
import { basicStats } from '../../test-utils/statsMocks';
import { oneRun } from '../../test-utils/rangeViewMocks';

const mockStore = configureStore([thunk]);

describe('ProfileBody Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <ProfileBody
              user={andy}
              signedInUser={andy}
              flair={{
                items: [
                  {
                    flair: 'Sample Flair',
                    flair_id: 1,
                    username: 'andy'
                  }
                ]
              }}
              stats={basicStats}
              rangeViews={oneRun}
              defaultTab={ProfileTab.LOGS}
            />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
