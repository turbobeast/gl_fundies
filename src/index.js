import fragmentShader from '../shaders/fragment.shader.glsl';
import vertexShader from '../shaders/vertex.shader.glsl';

import Canvas from './Canvas';
import GLContext from './GLContext';
import GLProgram from './GLProgram';
import GLBuffer from './GLBuffer';
import GLUtils from './math/GLUtils';
import Matrix4 from './math/Matrix4';

var canv = new Canvas('canvas');

var gl = GLContext.getContext(canv.canvas);
var program = GLProgram.create(gl, vertexShader, fragmentShader);
gl.useProgram(program);

var square = GLUtils.cube(0,0,0.3);

GLBuffer.vertexBuffer(gl, program, square, 3, "a_position");

var transMatLoc = gl.getUniformLocation(program, 'u_translation');
var colorLoc = gl.getUniformLocation(program, 'u_color');

var transMat = new Matrix4().identity();
transMat.translate(0.3,0.1,0);
transMat = transMat.createYRotMatrix(2).multiply(new Matrix4().createXRotMatrix(1));
gl.uniformMatrix4fv(transMatLoc, false, transMat.elements);
gl.uniform4fv(colorLoc, [1.0, 0.1, 0.2, 1.0]);

var yRot = 0;
setInterval(() => {
  yRot += 0.01;
  transMat = transMat.createYRotMatrix(yRot).multiply(new Matrix4().createXRotMatrix(-yRot + 1));
  gl.uniformMatrix4fv(transMatLoc, false, transMat.elements);
  gl.uniform4fv(colorLoc, [1.0, 0.1, 0.4, 0.7]);
  gl.drawArrays(gl.TRIANGLES, 0, square.length / 3);
}, 1000/60);
