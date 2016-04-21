export default class Point {
  constructor(private _x: number = 0, private _y: number = 0) {

  }

  add(other: Point) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  subtract(other: Point) {
    return this.add(other.negate());
  }

  negate(): Point {
    return new Point(-this.x, -this.y);
  }

  scale(multiplierX: number, multiplierY: number): Point {
    multiplierY = multiplierY != null ? multiplierY : multiplierX;
    return new Point(this.x * multiplierX, this.y * multiplierY);
  }

  toObject(): Object {
    return {x: this.x, y: this.y};
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}