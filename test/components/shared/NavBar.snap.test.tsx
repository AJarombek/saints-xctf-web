/**
 * Snapshot test for the NavBar component.
 * @author Andrew Jarombek
 * @since 2/23/2020
 */

import React from 'react';
import NavBar from '../../../src/components/shared/NavBar';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';

const mockStore = configureStore([thunk]);

// Mock react router's useHistory() hook before the tests execute.
jest.mock('react-router-dom', () => {
  const historyObj = {
    push: jest.fn()
  };

  return {
    ...jest.requireActual('react-router-dom'),
    useHistory: () => historyObj
  };
});

describe('NavBar Snapshot Tests', () => {
  let store: Store = null;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <div>
              <NavBar includeHeaders={['home', 'register', 'logo']} bodyRef={null} />
            </div>
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
