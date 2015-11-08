"use strict";

export default class GLBuffer {

  static vertexBuffer (gl, program, verts, dimensions, attrName) {
    let vertices, buffer, attribute;

    vertices = new Float32Array(verts);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    attribute = gl.getAttribLocation(program, attrName);

    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, dimensions, gl.FLOAT, false, 0, 0);
  }

}
