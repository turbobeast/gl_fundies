attribute vec3 a_position;
uniform mat4 u_translation;
uniform mat4 u_rotation;
uniform vec4 u_color;
varying vec4 v_color;

void main() {
  v_color = u_color;
  gl_Position = u_translation *  u_rotation * vec4(a_position, 1);
}
