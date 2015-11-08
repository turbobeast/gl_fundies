"use strict";

export default class GLShader {

  static makeShader (gl, shader, srcCode) {
    gl.shaderSource(shader, srcCode);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
  }

  static fragment (gl, srcCode) {
    let shader = gl.createShader(gl.FRAGMENT_SHADER);
    return GLShader.makeShader(gl, shader, srcCode);
  }

  static vertex (gl, srcCode) {
    let shader = gl.createShader(gl.VERTEX_SHADER);
    return GLShader.makeShader(gl, shader, srcCode);
  }

}
