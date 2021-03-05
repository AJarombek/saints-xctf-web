/**
 * Snapshot test for the ExerciseLog component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import ExerciseLog from '../../../src/components/shared/ExerciseLog';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LogType, Metric } from '../../../src/redux/types';
import { emptyStore } from '../../test-utils/storeMocks';
import { Store } from 'redux';

const mockStore = configureStore([thunk]);

describe('ExerciseLog Snapshot Tests', () => {
  let store: Store = null;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <ExerciseLog
              log={{
                log_id: 1,
                username: 'andy',
                first: 'Andrew',
                last: 'Jarombek',
                name: 'Test Log',
                date: '2020-08-26',
                type: 'run' as LogType,
                distance: 6.15,
                metric: 'miles' as Metric,
                miles: 6.15,
                time: '00:41:51',
                pace: '00:06:48',
                feel: 7,
                location: 'New York, NY',
                description: 'Reservoir Loop',
                time_created: '2020-08-26 12:34:00',
                comments: []
              }}
              user={{ username: 'andy', first: 'Andrew', last: 'Jarombek' }}
              inFeed={false}
              linkProfile={true}
            />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
