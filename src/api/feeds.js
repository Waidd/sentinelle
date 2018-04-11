import Events from 'events';

class FeedsAPI extends Events {
  constructor(serverURL) {
    super();

    this.serverURL = serverURL;
    this.eventSource = null;
    this.connected = false;
  }

  start() {
    this.eventSource = new window.EventSource(`${this.serverURL}/stream/items`);
    this.eventSource.onmessage = this.onMessage.bind(this);
    this.eventSource.onerror = this.onError.bind(this);
    this.eventSource.onopen = this.onOpen.bind(this);
  }

  // stop() {
  //   @TODO
  // }

  onMessage(event) {
    // console.log('incomming message');
    this.emit('items', JSON.parse(event.data));
  }

  onError() {
    // console.error('connection lost');
    this.connected = false;
    this.emit('disconnected');
  }

  onOpen() {
    // console.log('connection open');
    this.connected = true;
    this.emit('connected');
  }
}

export default FeedsAPI;
