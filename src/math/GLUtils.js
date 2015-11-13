
export default class GLUtils {

  static quad (xPos, yPos, width, height) {
    let halfWidth = width * 0.5;
    let halfHeight = height * 0.5;

    let topLeft = { x: xPos - halfWidth, y: yPos - halfHeight };
    let topRight = { x: xPos + halfWidth, y: yPos - halfHeight };
    let bottomLeft = { x: xPos - halfWidth, y: yPos + halfHeight };
    let bottomRight = { x: xPos + halfWidth, y: yPos + halfHeight };

    return [topLeft.x, topLeft.y,
            topRight.x, topRight.y,
            bottomLeft.x, bottomLeft.y,
            bottomLeft.x, bottomLeft.y,
            topRight.x, topRight.y,
            bottomRight.x, bottomRight.y];
  }

  static quad3 (xPos, yPos, width, height) {
    let halfWidth = width * 0.5;
    let halfHeight = height * 0.5;

    let topLeft = { x: xPos - halfWidth, y: yPos - halfHeight };
    let topRight = { x: xPos + halfWidth, y: yPos - halfHeight };
    let bottomLeft = { x: xPos - halfWidth, y: yPos + halfHeight };
    let bottomRight = { x: xPos + halfWidth, y: yPos + halfHeight };

    return [topLeft.x, topLeft.y, 0,
            topRight.x, topRight.y, 0,
            bottomLeft.x, bottomLeft.y, 0,
            bottomLeft.x, bottomLeft.y, 0,
            topRight.x, topRight.y, 0,
            bottomRight.x, bottomRight.y, 0];
  }

  static toWeb2dGLSpace (coords, canvas) {
    console.log(dimensions);
    let width = canvas ? canvas.width : window.innerWidth;
    let height = canvas ? canvas.height : window.innerHeight;
    let transCoords = [];

    for(var i = 0; i < coords.length; i += 2) {
      let x = coords[i];
      let y = coords[i + 1];
      transCoords.push(-1 + ((x / width) * 2), 1 + ((y / height) * -2) );
    }
    return transCoords;
  }


  static toWebGLSpace (coords, canvas) {
    let width = canvas ? canvas.width : window.innerWidth;
    let height = canvas ? canvas.height : window.innerHeight;
    let transCoords = [];

    for(var i = 0; i < coords.length; i += 3) {
      let x = coords[i];
      let y = coords[i + 1];
      transCoords.push(-1 + ((x / width) * 2), 1 + ((y / height) * -2), coords[i + 2]);
    }
    return transCoords;
  }

  static toRadians (degrees) {
    return (degrees / 180) * Math.PI;
  }

  static toDegrees (radians) {
    return radians * 180 / Math.PI;
  }

}
