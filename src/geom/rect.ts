import Interval from "./interval";
import Point from "./point";

export default class Rect {
  constructor(private _x: number = 0, private _y: number = 0, private _width: number = 0, private _height: number = 0) {

  }

  static fromPoints(points: Array<Point>): Rect {
    return points
      .map((point) => new Rect(point.x, point.y))
      .reduce((a, b) => a.union(b));
  }
  
  static fromIntervals(horizontal: Interval, vertical: Interval): Rect {
    return new Rect(horizontal.min, vertical.min, horizontal.length, vertical.length);
  }

  expand(delta: Point): Rect {
    return new Rect(this.x, this.y, this.width + delta.x, this.height + delta.y);
  }

  intersects(other: Rect): boolean {
    return this.horizontalAxis.intersects(other.horizontalAxis)
      && this.verticalAxis.intersects(other.verticalAxis);
  }

  offset(delta: Point): Rect {
    return new Rect(this.x + delta.x, this.y + delta.y, this.width, this.height);
  }

  scale(scaleX: number, scaleY?: number) {
    scaleY = scaleY == null ? scaleX : scaleY;
    return new Rect(this.x * scaleX, this.y * scaleY, this.width * scaleX, this.height * scaleY);
  }

  union(other: Rect): Rect {
    return Rect.fromIntervals(
      this.horizontalAxis.union(other.horizontalAxis),
      this.verticalAxis.union(other.verticalAxis));
  }

  toObject(): Object {
    return {x: this.x, y: this.y, width: this.width, height: this.height};
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get topLeft(): Point {
    return new Point(this.x, this.y);
  }

  get bottomRight(): Point {
    return new Point(this.right, this.bottom);
  }

  get right(): number {
    return this.x + this.width;
  }

  get bottom(): number {
    return this.y + this.height;
  }

  get horizontalAxis(): Interval {
    return new Interval(this.x, this.right);
  }

  get verticalAxis(): Interval {
    return new Interval(this.y, this.bottom);
  }
}