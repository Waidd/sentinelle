'use strict';

class FaviconStore {
  constructor () {
    this.favicon = document.querySelector("link[rel='shortcut icon']");
  }

  set (href) {
    this.favicon.href = href;
  }
}

export default new FaviconStore();
