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
  let r = 0.1 + Math.random() * 0.4;
  let g = Math.random() * 0.8;
  let b = 0.2 + Math.random() * 0.1;
  let a = 1;

  return [r, g, b, a];
}

for(let i = 0; i < 100; i += 1) {
  squares.push({
      elements: GLUtils.cube( 0, 0, Math.random() * 2),
      offset: new Matrix4().translate(Math.random() * 20 - 10, Math.random() * 20 -10, Math.random() * 20 - 10),
      color: randomCol()
    });
}

GLBuffer.vertexBuffer(gl, program, combinedSquares, 3, "a_position");

var transMatLoc = gl.getUniformLocation(program, 'u_translation');
var colorLoc = gl.getUniformLocation(program, 'u_color');
var rotMatLoc = gl.getUniformLocation(program, 'u_rotation');

var transMat = new Matrix4().identity();
transMat.translate(0.3,0.1,0);
transMat = transMat.createYRotMatrix(2).multiply(new Matrix4().createXRotMatrix(1));
gl.uniformMatrix4fv(transMatLoc, false, transMat.elements);
gl.uniform4fv(colorLoc, [1.0, 0.1, 0.2, 1.0]);

var cameraLoc = gl.getUniformLocation(program, 'u_camera');
var camera = new Matrix4();


var yRot = 0;
var zVel = 0;
var zAccel = 0;
var zPos = 0;
window.addEventListener("keydown", event => {
  event.preventDefault();
  if(event.keyCode == 38) {
    zAccel = 0.01;
  } else if (event.keyCode == 40) {
    zAccel = -0.01;
  }
}, false);

window.addEventListener("keyup", event => {
  event.preventDefault();
  zAccel = 0;
}, false);

  camera = camera.perspective(140, (window.innerWidth/window.innerHeight), 1, 3000);
  //gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
function looper () {
  gl.clearColor(0.0,0.0,0.0,1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  yRot += 0.04;

  zVel += zAccel;
  zVel *= 0.99;
  zPos += zVel;

  transMat = transMat.translate(0,0,zPos).multiply( new Matrix4().createYRotMatrix(yRot)).multiply(new Matrix4().createXRotMatrix(-yRot + 1));
  gl.uniformMatrix4fv(rotMatLoc, false, transMat.elements);
  gl.uniformMatrix4fv(cameraLoc, false, camera.elements);
  for(let i = 0; i < squares.length; i += 1) {

    GLBuffer.vertexBuffer(gl, program, squares[i].elements, 3, "a_position");
    gl.uniformMatrix4fv(transMatLoc, false, squares[i].offset.elements);
    gl.uniform4fv(colorLoc, squares[i].color);
    gl.drawArrays(gl.TRIANGLES, 0, squares[i].elements.length / 3);
  }

  requestAnimationFrame(looper);
}

looper();
