/**
 * Snapshot test for the PickGroup component.
 * It will be amazing if you can make it, but again you should do what you feel you can and what makes you feel safe.
 * After all, the most important thing is that you do what makes you happiest.  That is what I want most.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import PickGroup from '../../../src/components/profile/PickGroup';
import { alumniMember } from '../../test-utils/groupMocks';

describe('PickGroup Snapshot Tests', () => {
  it('renders correctly when group joined', () => {
    const tree = renderer
      .create(<PickGroup group={alumniMember} onMembershipClick={(): void => null} joined={true} left={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when group left', () => {
    const tree = renderer
      .create(<PickGroup group={alumniMember} onMembershipClick={(): void => null} joined={false} left={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
