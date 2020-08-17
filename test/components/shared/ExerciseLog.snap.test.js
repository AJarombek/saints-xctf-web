/**
 * Snapshot test for the ExerciseLog component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import ExerciseLog from '../../../src/components/shared/ExerciseLog';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ExerciseLog
      user={{username: 'andy', first: 'Andrew', last: 'Jarombek'}}
      addComment={() => {}}
      bucket="all"
      filterBy="all"
      index={0}
      log={{log_id: 1}}
      newComments={{}}
      page={1}
      postComment={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
