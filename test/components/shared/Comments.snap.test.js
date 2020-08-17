/**
 * Snapshot test for the Comments component.
 * @author Andrew Jarombek
 * @since 8/17/2020
 */

import React from 'react';
import Comments from '../../../src/components/shared/Comments';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Comments
      comments={[
        {
          comment_id: 1,
          username: 'andy',
          first: 'Andy',
          last: 'Jarombek',
          log_id: 3,
          time: '2020-08-17 19:00:00',
          content: 'Test comment.'
        }
      ]}
      feel={6}
      postComment={() => {}}
      addComment={() => {}}
      newComments={{}}
      logId={2}
      user={{}}
      page={1}
      filterBy="all"
      bucket="all"
      index={1}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
