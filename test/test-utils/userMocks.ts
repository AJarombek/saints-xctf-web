/**
 * Mock users used in tests.
 * @author Andrew Jarombek
 * @since 3/4/2021
 */

import { User, UserDetails } from '../../src/redux/types';
import { saintsXCTFTeamMember } from './teamMocks';

export const andy: User = {
  activation_code: 'abc123',
  class_year: 2017,
  deleted: false,
  description: 'I sometimes like to run.',
  email: 'andrew@jarombek.com',
  favorite_event: '5000m, 8K',
  first: 'Andy',
  last: 'Jarombek',
  last_signin: '2021-01-14 20:22:46',
  location: 'Riverside, CT',
  member_since: '2016-12-23',
  password: null,
  profilepic_name: null,
  salt: null,
  subscribed: null,
  username: 'andy',
  week_start: 'monday'
};

export const andyUserDetails: UserDetails = {
  user: andy,
  memberships: {
    teams: [saintsXCTFTeamMember]
  }
};
