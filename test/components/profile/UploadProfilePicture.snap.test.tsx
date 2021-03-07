/**
 * Snapshot test for the UploadProfilePicture component.
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
import UploadProfilePicture from '../../../src/components/profile/UploadProfilePicture';
import { andy } from '../../test-utils/userMocks';

const mockStore = configureStore([thunk]);

describe('UploadProfilePicture Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <UploadProfilePicture user={andy} profilePictureUrl="picture.png" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
