/**
 * Snapshot test for the UploadGroupPicture component.
 * @author Andrew Jarombek
 * @since 3/5/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UploadGroupPicture from '../../../src/components/group-admin/UploadGroupPicture';
import { alumni } from '../../test-utils/groupMocks';

const mockStore = configureStore([thunk]);

describe('UploadGroupPicture Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <UploadGroupPicture group={alumni} groupPictureUrl="picture.png" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
