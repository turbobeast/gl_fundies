attribute vec3 a_position;
uniform mat4 u_translation;

void main() {
  gl_Position = u_translation * vec4(a_position, 1);
}
