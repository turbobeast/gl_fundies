import Shader from './GLShader'

export default class GLProgram {

  static create (gl, vShaderSrc, fShaderSrc) {
    let shader, vertexShader, fragmentShader, program;

    vertexShader = Shader.vertex(gl, vShaderSrc);
    fragmentShader = Shader.fragment(gl, fShaderSrc);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        return null;
    }

    return program;
  }

}
