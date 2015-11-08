import fragmentShader from '../shaders/fragment.shader.glsl';
import vertexShader from '../shaders/vertex.shader.glsl';

import Canvas from './Canvas';
import GLContext from './GLContext';
import GLProgram from './GLProgram';
import GLBuffer from './GLBuffer';

var canv = new Canvas('canvas');
var gl = GLContext.getContext(canv.canvas);
var program = GLProgram.create(gl, vertexShader, fragmentShader);
gl.useProgram(program);

var verts = [-1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0];

GLBuffer.vertexBuffer(gl, program, verts, 2, "a_position");
gl.drawArrays(gl.TRIANGLES, 0, 6);
