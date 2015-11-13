import Vector4 from './Vector4';
import GLUtils from './GLUtils';

export default class Matrix4 {
  constructor(a1 = 1, a2 = 0, a3 = 0, a4 = 0,
              b1 = 0, b2 = 1, b3 = 0, b4 = 0,
              c1 = 0, c2 = 0, c3 = 1, c4 = 0,
              d1 = 0, d2 = 0, d3 = 0, d4 = 1) {

    this.elements = new Float32Array(16);;
    this.elements[0] = a1;
    this.elements[1] = b1;
    this.elements[2] = c1;
    this.elements[3] = d1;

    this.elements[4] = a2;
    this.elements[5] = b2;
    this.elements[6] = c2;
    this.elements[7] = d2;

    this.elements[8] = a3;
    this.elements[9] = b3;
    this.elements[10] = c3;
    this.elements[11] = d3;

    this.elements[12] = a4;
    this.elements[13] = b4;
    this.elements[14] = c4;
    this.elements[15] = d4;
  }

  identity () {
    return new Matrix4(1, 0, 0, 0,
                       0, 1, 0, 0,
                       0, 0, 1, 0,
                       0, 0, 0, 1);
  }

  transpose () {

    let A11 = this.elements[0], A12 = this.elements[1], A13 = this.elements[2], A14 = this.elements[3];
    let A21 = this.elements[4], A22 = this.elements[5], A23 = this.elements[6], A24 = this.elements[7];
    let A31 = this.elements[8], A32 = this.elements[9], A33 = this.elements[10], A34 = this.elements[11];
    let A41 = this.elements[12], A42 = this.elements[13], A43 = this.elements[14], A44 = this.elements[15];

    let e = this.elements;
    e[0] = A11; e[1] = A21; e[2] = A31; e[3] = A41;
    e[4] = A12; e[5] = A22; e[6] = A32; e[7] = A42;
    e[8] = A13; e[9] = A23; e[10] = A33; e[11] = A43;
    e[12] = A14; e[13] = A24; e[14] = A34; e[15] = A44;

    return this;
  }

  multiply (matb) {

    //references to all members in this matrix
    let A11 = this.elements[0], A12 = this.elements[1], A13 = this.elements[2], A14 = this.elements[3];
    let A21 = this.elements[4], A22 = this.elements[5], A23 = this.elements[6], A24 = this.elements[7];
    let A31 = this.elements[8], A32 = this.elements[9], A33 = this.elements[10], A34 = this.elements[11];
    let A41 = this.elements[12], A42 = this.elements[13], A43 = this.elements[14], A44 = this.elements[15];

    //references to all members in matrix b
    let B11 = matb.elements[0], B12 = matb.elements[1], B13 = matb.elements[2], B14 = matb.elements[3];
    let B21 = matb.elements[4], B22 = matb.elements[5], B23 = matb.elements[6], B24 = matb.elements[7];
    let B31 = matb.elements[8], B32 = matb.elements[9], B33 = matb.elements[10], B34 = matb.elements[11];
    let B41 = matb.elements[12], B42 = matb.elements[13], B43 = matb.elements[14], B44 = matb.elements[15];

    //mutliply the bastards
    let e = this.elements;

    e[0] = (B11 * A11) + (B12 * A21) + (B13 * A31) + (B14 * A41);
    e[1] = (B11 * A12) + (B12 * A22) + (B13 * A32) + (B14 * A42);
    e[2] = (B11 * A13) + (B12 * A23) + (B13 * A33) + (B14 * A43);
    e[3] = (B11 * A14) + (B12 * A24) + (B13 * A34) + (B14 * A44);

    e[4] = (B21 * A11) + (B22 * A21) + (B23 * A31) + (B24 * A41);
    e[5] = (B21 * A12) + (B22 * A22) + (B23 * A32) + (B24 * A42);
    e[6] = (B21 * A13) + (B22 * A23) + (B23 * A33) + (B24 * A43);
    e[7] = (B21 * A14) + (B22 * A24) + (B23 * A34) + (B24 * A44);

    e[8] = (B31 * A11) + (B32 * A21) + (B33 * A31) + (B34 * A41);
    e[9] = (B31 * A12) + (B32 * A22) + (B33 * A32) + (B34 * A42);
    e[10] = (B31 * A13) + (B32 * A23) + (B33 * A33) + (B34 * A43);
    e[11] = (B31 * A14) + (B32 * A24) + (B33 * A34) + (B34 * A44);

    e[12] = (B41 * A11) + (B42 * A21) + (B43 * A31) + (B44 * A41);
    e[13] = (B41 * A12) + (B42 * A22) + (B43 * A32) + (B44 * A42);
    e[14] = (B41 * A13) + (B42 * A23) + (B43 * A33) + (B44 * A43);
    e[15] = (B41 * A14) + (B42 * A24) + (B43 * A34) + (B44 * A44);

    return this;

  }


  createZRotMatrix (theta) {
    var cos = Math.cos(theta),
        sin = Math.sin(theta);

    return new Matrix4(cos, -sin, 0, 0,
                       sin, cos,  0, 0,
                       0,   0,    1, 0,
                       0,   0,    0, 1);
  }

  createZRotMatrixFromDegrees (degrees) {
    var rads = GLUtils.toRadians(degrees);
    return this.createZRotMatrix(rads);
  }

  createYRotMatrix (theta) {
    var cos = Math.cos(theta),
        sin = Math.sin(theta);

    return new Matrix4(cos, 0, sin, 0,
                       0,   1, 0,   0,
                      -sin, 0, cos, 0,
                       0,   0, 0,   1);
  }

  createYRotMatrixFromDegrees (degrees) {
    var rads = GLUtils.toRadians(degrees);
    return this.createYRotMatrix(rads);
  }

  createXRotMatrix (theta) {
    var cos = Math.cos(theta),
        sin = Math.sin(theta);

    return new Matrix4(1, 0,   0,    0,
                       0, cos, -sin, 0,
                       0, sin, cos,  0,
                       0, 0,   0,    1);
  }

  createXRotMatrixFromDegrees (degrees) {
    var rads = GLUtils.toRadians(degrees);
    return this.createXRotMatrix(rads);
  }

  multiplyVector (vec) {
    var x = (vec.x * this.elements[0]) + (vec.y * this.elements[4]) + (vec.z * this.elements[8]) + (vec.w * this.elements[12]);
    var y = (vec.x * this.elements[1]) + (vec.y * this.elements[5]) + (vec.z * this.elements[9]) + (vec.w * this.elements[13]);
    var z = (vec.x * this.elements[2]) + (vec.y * this.elements[6]) + (vec.z * this.elements[10]) + (vec.w * this.elements[14]);
    var w = (vec.x * this.elements[3]) + (vec.y * this.elements[7]) + (vec.z * this.elements[11]) + (vec.w * this.elements[15]);
    return new Vector4(x,y,z,w);
  }


  translate (x,y,z) {
    var e = this.elements;
    e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
    e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
    e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    return this;
  }

  setPerspective (fovy, aspect, near, far) {
    var rd, ct;

    if (near === far || aspect === 0) {
      throw 'null frustum';
    }
    if (near <= 0) {
      throw 'near <= 0';
    }
    if (far <= 0) {
      throw 'far <= 0';
    }

    //fovy = Math.PI * fovy / 180 / 2;
    fovy = GLUtils.toRadians(fovy * 0.5);
    let sin = Math.sin(fovy);
    if (sin === 0) {
      throw 'null frustum';
    }

    rd = 1 / (far - near);
    ct = Math.cos(fovy) / sin;

    let e = this.elements;
    e[0] = ct / aspect; e[1] = 0;  e[2] = 0;                     e[3] = 0;
    e[4] = 0;           e[5] = ct; e[6] = 0;                     e[7] = 0;
    e[8] = 0;           e[9] = 0;  e[10] = -(far + near) * rd;   e[11] = -1;
    e[12] = 0;          e[13] = 0; e[14] = -2 * near * far * rd; e[15] = 0;

    return this;
  }

  set (mat) {
    this.elements = mat.elements;
  }

  setLookAt (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {

    let center = new Vector4(centerX, centerY, centerZ);
    let eye = new Vector4(eyeX, eyeY, eyeZ);
    let f = center.subtract(eye);
    let up = f.clone().normalize();

    let s = f.crossProduct(up).normalize();
    let u = s.crossProduct(f);

    // Set to this.
    let e = this.elements;
    e[0] = s.x; e[1] = u.x; e[2] = -f.x;  e[3] = 0;
    e[4] = s.y; e[5] = u.y; e[6] = -f.y;  e[7] = 0;
    e[8] = s.z; e[9] = u.z; e[10] = -f.z; e[11] = 0;
    e[12] = 0;  e[13] = 0;  e[14] = 0;    e[15] = 1;

    // Translate.
    return this.translate(-eye.x, -eye.y, -eye.z);
  }


}

module.exports = Matrix4;
