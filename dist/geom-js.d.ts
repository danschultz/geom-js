declare module "interval" {
    export default class Interval {
        private _min;
        private _max;
        constructor(_min: number, _max: number);
        intersects(other: Interval): boolean;
        intersection(other: Interval): Interval;
        union(other: Interval): Interval;
        private ifNotEmpty(block);
        min: number;
        max: number;
        center: number;
        length: number;
        isEmpty: boolean;
    }
}
declare module "point" {
    export default class Point {
        private _x;
        private _y;
        constructor(_x?: number, _y?: number);
        add(other: Point): Point;
        subtract(other: Point): Point;
        negate(): Point;
        scale(multiplierX: number, multiplierY: number): Point;
        toObject(): Object;
        x: number;
        y: number;
    }
}
declare module "rect" {
    import Interval from "interval";
    import Point from "point";
    export default class Rect {
        private _x;
        private _y;
        private _width;
        private _height;
        constructor(_x?: number, _y?: number, _width?: number, _height?: number);
        static fromPoints(points: Array<Point>): Rect;
        static fromIntervals(horizontal: Interval, vertical: Interval): Rect;
        expand(delta: Point): Rect;
        intersects(other: Rect): boolean;
        offset(delta: Point): Rect;
        scale(scaleX: number, scaleY?: number): Rect;
        union(other: Rect): Rect;
        toObject(): Object;
        x: number;
        y: number;
        width: number;
        height: number;
        topLeft: Point;
        bottomRight: Point;
        right: number;
        bottom: number;
        horizontalAxis: Interval;
        verticalAxis: Interval;
    }
}
declare module "geom" {
    export { default as Interval } from "interval";
    export { default as Point } from "point";
    export { default as Rect } from "rect";
}
