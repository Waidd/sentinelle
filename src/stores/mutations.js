import * as types from './mutation-types';

export default {
  [types.CONNECTION_STATUS_CHANGED]: (state, status) => {
    // eslint-disable-next-line no-param-reassign
    state.connected = status;
  },

  [types.RECEIVED_ITEMS]: (state, items) => {
    const filteredItems = items
      .filter(item => !state.items.find(each => item.guid === each.guid))
      .map(item => ({ ...item, date: new Date(item.date) }));

    state.items.push(...filteredItems);
  },
};
