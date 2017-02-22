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
    this.client = null;
    this.keepAliveInterval = null;
  }

  start (serverURL) {
    this.serverURL = serverURL;

    this.client = new window.WebSocket(this.serverURL);
    this.client.onopen = this._onOpen.bind(this);
    this.client.onmessage = this._onMessage.bind(this);
    this.client.onclose = this._onClose.bind(this);
  }

  _onClose () {
    console.error('connection lost');

    this.connected = false;
    this.emit('disconnected');

    this.keepAliveInterval && clearInterval(this.keepAliveInterval);
    this.keepAliveInterval = null;

    FaviconStore.set(faviconOff);
  }

  _onOpen () {
    console.log('connection open');

    this.connected = true;
    this.emit('connected');

    FaviconStore.set(faviconOn);

    this.keepAliveInterval = setInterval(() => {
      console.log('ping');
      this.client.send(JSON.stringify({type: 'ping'}));
    }, 30000);
  }

  _onEntries (items, override = false) {
    items.forEach((item) => {
      item.date = new Date(item.date);
    });

    this.items = override ? items : this.items.concat(items);
    this.items.sort((a, b) => b.date - a.date);

    if (this.items.length > 100) {
      this.items = this.items.slice(0, 100);
    }

    this.emit('update', this.items);
  }

  _onMessage (event) {
    event = JSON.parse(event.data);

    if (event.type === 'update') {
      this._onEntries(event.items);
    } else if (event.type === 'entries') {
      this._onEntries(event.items, true);
    } else if (event.type === 'pong') {
      console.log('pong');
    } else {
      console.log('unexpected event', event);
    }
  }
}

export default new FeedsStore();
