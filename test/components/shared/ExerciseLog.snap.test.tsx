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

const mockStore = configureStore([thunk]);

it('renders correctly', () => {
  let store = null;

  beforeEach(() => {
    store = mockStore({});
  });

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
              type: 'run',
              distance: 6.15,
              metric: 'miles',
              miles: 6.15,
              time: '00:41:51',
              pace: '00:06:48',
              feel: 7,
              location: 'New York, NY',
              description: 'Reservoir Loop',
              timeCreated: '2020-08-26 12:34:00',
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
