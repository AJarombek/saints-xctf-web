/**
 * Registration redux module which follows the ducks pattern.
 * I had still hoped it was me.
 * @author Andrew Jarombek
 * @since 5/10/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';

// Actions
const REGISTER_PERSONAL_INFO_REQUEST = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_REQUEST';
const REGISTER_PERSONAL_INFO_FAILURE = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_FAILURE';
const REGISTER_PERSONAL_INFO_SUCCESS = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_SUCCESS';
const REGISTER_CREDENTIALS_REQUEST = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_REQUEST';
const REGISTER_CREDENTIALS_FAILURE = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_FAILURE';
const REGISTER_CREDENTIALS_SUCCESS = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_SUCCESS';
const REGISTER_TEAMS_REQUEST = 'saints-xctf-web/registration/REGISTER_TEAMS_REQUEST';
const REGISTER_TEAMS_FAILURE = 'saints-xctf-web/registration/REGISTER_TEAMS_FAILURE';
const REGISTER_TEAMS_SUCCESS = 'saints-xctf-web/registration/REGISTER_TEAMS_SUCCESS';
const REGISTER_GROUPS_REQUEST = 'saints-xctf-web/registration/REGISTER_GROUPS_REQUEST';
const REGISTER_GROUPS_FAILURE = 'saints-xctf-web/registration/REGISTER_GROUPS_FAILURE';
const REGISTER_GROUPS_SUCCESS = 'saints-xctf-web/registration/REGISTER_GROUPS_SUCCESS';
const REGISTER_BACK = 'saints-xctf-web/registration/REGISTER_BACK';

// Reducer
const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_CREDENTIALS_REQUEST:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_CREDENTIALS_FAILURE:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_CREDENTIALS_SUCCESS:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_TEAMS_REQUEST:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_TEAMS_FAILURE:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_TEAMS_SUCCESS:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_GROUPS_REQUEST:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_GROUPS_FAILURE:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_GROUPS_SUCCESS:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_BACK:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    default:
      return state;
  }
}

// Action Creators
