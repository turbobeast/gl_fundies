import ResizeHandler from './resizeHandler';

export default class Canvas {
  constructor (cid) {
    this.canvas = document.getElementById(cid);
    ResizeHandler.registerListener( (w, h) => {
      this.canvas.width = w + 'px';
      this.canvas.height = h + 'px';
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
    });
  }

};
