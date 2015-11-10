import ResizeHandler from './resizeHandler';

export default class Canvas {
  constructor (cid) {
    this.canvas = document.getElementById(cid);
    let handler = new ResizeHandler();
    handler.registerListener( (w, h) => {
      this.canvas.width = (w * window.devicePixelRatio);
      this.canvas.height = (h * window.devicePixelRatio);
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
    });
  }

};
