
export default class GLUtils {

  static quad (xPos, yPos, width, height) {
    let halfWidth = width * 0.5;
    let halfHeight = height * 0.5;

    let topLeft = { x: xPos - halfWidth, y: yPos - halfHeight }; //-1.0, -1.0
    let topRight = { x: xPos + halfWidth, y: yPos - halfHeight }; //1.0, -1.0
    let bottomLeft = { x: xPos - halfWidth, y: yPos + halfHeight }; //-1.0, 1.0
    let bottomRight = { x: xPos + halfWidth, y: yPos + halfHeight }; //1.0, 1.0

    return [topLeft.x, topLeft.y,
            topRight.x, topRight.y,
            bottomLeft.x, bottomLeft.y,
            bottomLeft.x, bottomLeft.y,
            topRight.x, topRight.y,
            bottomRight.x, bottomRight.y];
  }

  static toWebGLSpace (coords, canvas) {
    let width = canvas ? canvas.width : window.innerWidth;
    let height = canvas ? canvas.height : window.innerHeight;
    let transCoords = [];

    for(var i = 0; i < coords.length; i += 2) {
      let x = coords[i];
      let y = coords[i + 1];
      transCoords.push(-1 + ((x / width) * 2), 1 + ((y / height) * -2));
    }
    return transCoords;
  }


}
