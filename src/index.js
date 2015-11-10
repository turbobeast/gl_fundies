import fragmentShader from '../shaders/fragment.shader.glsl';
import vertexShader from '../shaders/vertex.shader.glsl';

import Canvas from './Canvas';
import GLContext from './GLContext';
import GLProgram from './GLProgram';
import GLBuffer from './GLBuffer';
import GLUtils from './math/GLUtils';

var canv = new Canvas('canvas');


var gl = GLContext.getContext(canv.canvas);
var program = GLProgram.create(gl, vertexShader, fragmentShader);
gl.useProgram(program);

var square = GLUtils.quad( window.innerWidth * 0.5, window.innerHeight * 0.5, window.innerWidth * 0.2, window.innerHeight * 0.2);
var verts = GLUtils.toWebGLSpace(square);
GLBuffer.vertexBuffer(gl, program, verts, 2, "a_position");


setInterval(() => {
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}, 1000/60);
