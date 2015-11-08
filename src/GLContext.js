
export default class GLContext {

  static getContext (canv) {
    let cTexts = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context = null;
    for (var i = 0; i < cTexts.length; i += 1) {
      try {
        context = canv.getContext(cTexts[i]);
      } catch (e) {
        continue;
      }

      if(context) {
          break;
      }
    }
    return context;
  }

}
