/**
 * Mock user/group statistics used in tests.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import { StatsMeta } from '../../src/redux/types';

export const basicStats: StatsMeta = {
  miles_all_time: 50,
  miles_past_year: 40,
  miles_past_month: 30,
  miles_past_week: 20,
  run_miles_all_time: 40,
  run_miles_past_year: 30,
  run_miles_past_month: 20,
  run_miles_past_week: 10,
  feel_all_time: 6.5,
  feel_past_year: 6.6,
  feel_past_month: 7.1,
  feel_past_week: 7.2
};
