/**
 * Snapshot test for the ExerciseLog component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import ExerciseLog from '../../../src/components/shared/ExerciseLog';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

it('renders correctly', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <ExerciseLog
        user={{username: 'andy', first: 'Andrew', last: 'Jarombek'}}
        addComment={() => {}}
        bucket="all"
        filterBy="all"
        index={0}
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
        newComments={{}}
        page={1}
        postComment={() => {}}
      />
    </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
