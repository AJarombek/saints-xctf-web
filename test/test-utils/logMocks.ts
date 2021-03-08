/**
 * Mock logs used in tests.
 * @author Andrew Jarombek
 * @since 3/4/2021
 */

import { Log, LogType, Metric } from '../../src/redux/types';

export const march6thLog: Log = {
  log_id: 1,
  username: 'andy',
  first: 'Andy',
  last: 'Jarombek',
  name: 'Central Park Trails + Strides',
  date: '2021-03-06',
  type: 'run' as LogType,
  distance: 6.01,
  metric: 'miles' as Metric,
  miles: 6.01,
  time: '00:39:56',
  pace: '00:06:38',
  feel: 6,
  location: 'New York, NY',
  description: '',
  time_created: '2021-03-07 20:45:00',
  comments: []
};
