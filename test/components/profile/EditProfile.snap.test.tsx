/**
 * Snapshot test for the EditProfile component.
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
import { andy } from '../../test-utils/userMocks';
import EditProfile from '../../../src/components/profile/EditProfile';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([thunk]);

describe('EditProfile Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      ...emptyStore,
      profile: {
        users: {
          andy: {
            user: andy,
            uploadingProfilePicture: {
              uploaded: false,
              uploadedSize: null,
              totalSize: null
            }
          }
        }
      }
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <EditProfile user={andy} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
