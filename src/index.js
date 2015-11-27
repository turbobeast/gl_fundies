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

var squares = [];
var combinedSquares = [];

function randomCol () {
  let r = 0.2 + Math.random() * 0.4;
  let g = Math.random() * 0.8;
  let b = 0.9 + Math.random() * 0.1;
  let a = 1;

  return [r, g, b, a];
}

for(let i = 0; i < 40; i += 1) {
  squares.push({
      elements: GLUtils.cube( 0, 0, Math.random() * 0.2),
      offset: new Matrix4().translate(Math.random() * 2 - 1, Math.random() * 2 -1, Math.random() * 2 -1 ),
      color: randomCol()
    });
}

// for(let i = 0; i < squares.length; i += 1) {
//   combinedSquares = combinedSquares.concat(squares[i]);
// }
//var square = GLUtils.cube(0,0,0.3);

GLBuffer.vertexBuffer(gl, program, combinedSquares, 3, "a_position");

var transMatLoc = gl.getUniformLocation(program, 'u_translation');
var colorLoc = gl.getUniformLocation(program, 'u_color');
var rotMatLoc = gl.getUniformLocation(program, 'u_rotation');

var transMat = new Matrix4().identity();
transMat.translate(0.3,0.1,0);
transMat = transMat.createYRotMatrix(2).multiply(new Matrix4().createXRotMatrix(1));
gl.uniformMatrix4fv(transMatLoc, false, transMat.elements);
gl.uniform4fv(colorLoc, [1.0, 0.1, 0.2, 1.0]);

var yRot = 0;
setInterval(() => {
  gl.clearColor(0.0,0.0,0.0,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  yRot += 0.01;
  transMat = transMat.createYRotMatrix(yRot).multiply(new Matrix4().createXRotMatrix(-yRot + 1));
  for(let i = 0; i < squares.length; i += 1) {
    GLBuffer.vertexBuffer(gl, program, squares[i].elements, 3, "a_position");

    gl.uniformMatrix4fv(transMatLoc, false, squares[i].offset.elements);
    gl.uniformMatrix4fv(rotMatLoc, false, transMat.elements);
    gl.uniform4fv(colorLoc, squares[i].color);
    gl.drawArrays(gl.TRIANGLES, 0, squares[i].elements.length / 3);

    gl.uniform4fv(colorLoc, [1,0,0,1]);
    gl.drawArrays(gl.LINES, 0, squares[i].elements.length / 3);

  }
}, 1000/60);
