export default class Vector4 {

  constructor (x,y,z,w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  dot (vec) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
  }

  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z );
  }

  crossProduct (vec) {
    let x = this.y * vec.z - this.z * vec.y;
    let y = this.z * vec.x - this.x * vec.z;
    let z = this.x * vec.y - this.y * vec.x;
    return new Vector4(x, y, z, 0);
  }

  clone () {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  normalize () {
    let mag = this.length();
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;
    this.w /= mag;
    return this;
  }

  scale (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  }

  subtract (vec) {
    return new Vector4(this.x - vec.x, this.y - vec.y, this.z - vec.z, this.w - vec.w);
  }

}
