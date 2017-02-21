'use strict';

import Events from 'events';
import configuration from '../configuration.js';

class FeedsStore extends Events {
  constructor (serverURL) {
    super();
    this.serverURL = serverURL;
    this.items = [];
  }

  start () {
    this.client = new window.WebSocket(this.serverURL);
    this.client.onopen = this._onOpen.bind(this);
    this.client.onmessage = this._onMessage.bind(this);
    this.client.onclose = this._onClose.bind(this);
  }

  _onClose () {
    console.error('connection lost');
  }

  _onOpen () {
    console.log('connection open');

    setInterval(() => {
      console.log('ping');
      this.client.send(JSON.stringify({type: 'ping'}));
    }, 30000);
  }

  _onEntries (items) {
    items.forEach((item) => {
      item.date = new Date(item.date);
    });

    this.items = this.items.concat(items);
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
      this._onEntries(event.items);
    } else if (event.type === 'pong') {
      console.log('pong');
    } else {
      console.log('unexpected event', event);
    }
  }
}

// bad, very bad !
let feedsStore = new FeedsStore(configuration.tourdeguet.url);
feedsStore.start();

export default feedsStore;
