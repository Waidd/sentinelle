'use strict';

import FeedsAPI from '../api/feeds';
import * as types from './mutation-types';

export const start = ({ commit }, serverURL) => {
  const api = new FeedsAPI(serverURL);
  api.on('connected', () => {
    commit(types.CONNECTION_STATUS_CHANGED, true);
  });
  api.on('disconnected', () => {
    commit(types.CONNECTION_STATUS_CHANGED, false);
  });
  api.on('items', (items) => {
    commit(types.RECEIVED_ITEMS, items);
  });
  api.start();
};
