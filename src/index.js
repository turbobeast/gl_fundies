'use strict'

import fragmentShader from '../shaders/fragment.shader.glsl'
import vertexShader from '../shaders/vertex.shader.glsl'

import Canvas from './Canvas'
import GLContext from './GLContext'
import GLProgram from './GLProgram'
import GLBuffer from './GLBuffer'
import GLUtils from './math/GLUtils'
import Matrix4 from './math/Matrix4'

const canv = new Canvas('canvas')

const gl = GLContext.getContext(canv.canvas)
const program = GLProgram.create(gl, vertexShader, fragmentShader)
gl.useProgram(program)

const squares = []
const combinedSquares = []

const yello = [255, 222, 23, 255]
const red = [239, 65, 54, 255]
const orange = [247, 148, 30, 255]
const cols = [orange, yello, red, orange]
const randomCol = () => cols[Math.floor(Math.random() * cols.length)].map(val => val/255)

for (let i = 0; i < 100; i += 1) {
  squares.push({
    elements: GLUtils.cube(0, 0, Math.random() * 2),
    offset: new Matrix4().translate(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10),
    color: randomCol()
  })
}

GLBuffer.vertexBuffer(gl, program, combinedSquares, 3, 'a_position')

const transMatLoc = gl.getUniformLocation(program, 'u_translation')
const colorLoc = gl.getUniformLocation(program, 'u_color')
const rotMatLoc = gl.getUniformLocation(program, 'u_rotation')

var transMat = new Matrix4().identity()
transMat.translate(0.3, 0.1, 0)
transMat = transMat.createYRotMatrix(2).multiply(new Matrix4().createXRotMatrix(1))
gl.uniformMatrix4fv(transMatLoc, false, transMat.elements)
gl.uniform4fv(colorLoc, [1.0, 0.1, 0.2, 1.0])

var cameraLoc = gl.getUniformLocation(program, 'u_camera')
var camera = new Matrix4()

let yRot = 0
let zVel = 0
let zAccel = 0
let zPos = 0
window.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (parseInt(event.keyCode, 10) === 38) {
    zAccel = 0.01
  } else if (parseInt(event.keyCode, 10) === 40) {
    zAccel = -0.01
  }
}, false)

window.addEventListener('keyup', event => {
  event.preventDefault()
  zAccel = 0
}, false)

camera = camera.perspective(140, (window.innerWidth / window.innerHeight), 1, 3000)
  // gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST)
function looper () {
  gl.clearColor(0.0, 0.0, 0.0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  yRot += 0.04

  zVel += zAccel
  zVel *= 0.99
  zPos += zVel

  transMat = transMat.translate(0, 0, zPos).multiply(new Matrix4().createYRotMatrix(yRot))
    .multiply(new Matrix4().createXRotMatrix(-yRot + 1))
  gl.uniformMatrix4fv(rotMatLoc, false, transMat.elements)
  gl.uniformMatrix4fv(cameraLoc, false, camera.elements)
  for (let i = 0; i < squares.length; i += 1) {
    GLBuffer.vertexBuffer(gl, program, squares[i].elements, 3, 'a_position')
    gl.uniformMatrix4fv(transMatLoc, false, squares[i].offset.elements)
    gl.uniform4fv(colorLoc, squares[i].color)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, squares[i].elements.length / 3)
  }

  window.requestAnimationFrame(looper)
}

looper()
