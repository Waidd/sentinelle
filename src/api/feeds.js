'use strict';

import Events from 'events';

class FeedsAPI extends Events {
  constructor (serverURL) {
    super();

    this.serverURL = serverURL;
    this.eventSource = null;
    this.connected = false;
  }

  start () {
    this.eventSource = new window.EventSource(`${this.serverURL}/stream/items`);
    this.eventSource.onmessage = this._onMessage.bind(this);
    this.eventSource.onerror = this._onError.bind(this);
    this.eventSource.onopen = this._onOpen.bind(this);
  }

  stop () {
    // @TODO
  }

  _onMessage (event) {
    console.log('incomming message');
    this.emit('items', JSON.parse(event.data));
  }

  _onError () {
    console.error('connection lost');

    this.connected = false;
    this.emit('disconnected');
  }

  _onOpen () {
    console.log('connection open');

    this.connected = true;
    this.emit('connected');
  }
}

export default FeedsAPI;
