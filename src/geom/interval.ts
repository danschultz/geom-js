export default class Interval {
  constructor(private _min: number, private _max: number) {

  }

  intersects(other: Interval): boolean {
    return !this.intersection(other).isEmpty;
  }

  intersection(other: Interval): Interval {
    return new Interval(
      Math.max(this.min, other.min), Math.min(this.max, other.max));
  }

  union(other: Interval): Interval {
    return new Interval(
      Math.min(this.min, other.min), Math.max(this.max, other.max));
  }

  private ifNotEmpty(block: () => number): number {
    return !this.isEmpty ? block() : 0;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  get center(): number {
    return this.ifNotEmpty(() => (this.min + this.max) * 0.5);
  }

  get length(): number {
    return this.ifNotEmpty(() => this.max - this.min);
  }

  get isEmpty(): boolean {
    return this.min > this.max;
  }
}