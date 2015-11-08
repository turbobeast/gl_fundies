"use strict";

module.exports = {

  listeners: [],
  listening: false,
  resizeTimer: null,


  handleResize (e) {
    if(this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    this.resizeTimer = setTimeout(this.heavyLifting.bind(this), 200);
  },

  heavyLifting (e) {
    console.dir(this);
    this.resizeTimer = null;
    let i = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    for(i = 0; i < this.listeners.length; i += 1) {
      this.listeners[i](width, height);
    }
  },

  registerListener (func) {
    if(typeof func === 'function') {
      this.listeners.push(func);
    } else {
      throw 'come on, send a function!';
    }

    if(!this.listening) {
      window.addEventListener('resize', this.handleResize);
    }
    this.handleResize(null);
    return this.listeners.length-1;
  }


};
