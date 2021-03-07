/**
 * Snapshot test for the WeeklyChart component.
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
import { andy } from '../../test-utils/userMocks';
import WeeklyChart from '../../../src/components/profile/WeeklyChart';
import { oneRun } from '../../test-utils/rangeViewMocks';

const mockStore = configureStore([thunk]);

const createNodeMock = (): { parentElement: HTMLElement } => {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
};

describe('WeeklyChart Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <WeeklyChart rangeViews={oneRun} user={andy} />
        </Provider>,
        { createNodeMock }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
