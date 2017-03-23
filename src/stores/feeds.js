'use strict';

import Events from 'events';

import FaviconStore from './favicon.js';

import faviconOn from '../assets/favicon_black_on.png';
import faviconOff from '../assets/favicon_black_off.png';

class FeedsStore extends Events {
  constructor (serverURL) {
    super();

    this.serverURL = '';
    this.items = [];
    this.connected = true;
    this.eventSource = null;
  }

  start (serverURL) {
    this.serverURL = serverURL;
    this.connect();
  }

  connect () {
    this.eventSource = new window.EventSource(`${this.serverURL}/stream/items`);
    this.eventSource.onmessage = (event) => {
      console.log('incomming message');
      this._onEntries(JSON.parse(event.data));
    };
    this.eventSource.onerror = this._onError.bind(this);
    this.eventSource.onopen = this._onOpen.bind(this);
  }

  _onError () {
    console.error('connection lost');

    this.connected = false;
    this.emit('disconnected');

    FaviconStore.set(faviconOff);
  }

  _onOpen () {
    console.log('connection open');

    this.connected = true;
    this.emit('connected');

    FaviconStore.set(faviconOn);
  }

  _onEntries (items) {
    this.items = items
    .map((item) => {
      item.date = new Date(item.date);
      return item;
    })
    .filter((item) => {
      return !this.items.find((each) => item.guid === each.guid);
    })
    .concat(this.items)
    .sort((a, b) => b.date - a.date);

    if (this.items.length > 100) {
      this.items = this.items.slice(0, 100);
    }

    this.emit('update', this.items);
  }
}

export default new FeedsStore();
