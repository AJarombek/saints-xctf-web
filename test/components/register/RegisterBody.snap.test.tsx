/**
 * Snapshot test for the RegisterBody component.
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
import RegisterBody from '../../../src/components/register/RegisterBody';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([thunk]);

describe('RegisterBody Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly - personal info stage', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <RegisterBody stage={0} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly - credentials stage', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <RegisterBody stage={1} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly - completed stage', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <RegisterBody stage={2} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
