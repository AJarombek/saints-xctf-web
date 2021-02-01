/**
 * Setup Enzyme with the React adapter.  This file is identified as Jest test framework
 * config in jest.client-config.js and jest.server-config.js.
 * @author Andrew Jarombek
 * @since 3/21/2018
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nodeCrypto from 'crypto';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

window.crypto = {
  getRandomValues: function (array) {
    return nodeCrypto.randomFillSync(array);
  }
};

expect.extend({ toMatchImageSnapshot });

configure({ adapter: new Adapter() });
