'use strict';

import * as types from './mutation-types';

export default {
  [types.CONNECTION_STATUS_CHANGED]: (state, status) => {
    state.connected = status;
  },

  [types.RECEIVED_ITEMS]: (state, items) => {
    items = items
    .map((item) => {
      item.date = new Date(item.date);
      return item;
    })
    .filter((item) => {
      return !state.items.find((each) => item.guid === each.guid);
    });

    state.items.push(...items);
  }
};
