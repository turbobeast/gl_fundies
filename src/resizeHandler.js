"use strict";

export default class Resize {

  constructor () {
    this.listeners = [];
    this.listening = false;
    this.resizeTimer = null;
  }

  handleResize () {
    if(this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    this.resizeTimer = setTimeout(this.heavyLifting.bind(this), 200);
  }

  heavyLifting () {
    this.resizeTimer = null;
    let i = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    for(i = 0; i < this.listeners.length; i += 1) {
      this.listeners[i](width, height);
    }
  }

  registerListener (func) {
    if(typeof func === 'function') {
      this.listeners.push(func.bind(this));
    } else {
      throw 'come on, send a function!';
    }

    if(!this.listening) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }
    this.heavyLifting(null);
    return this.listeners.length-1;
  }
}
