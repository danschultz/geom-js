define("interval", ["require", "exports"], function (require, exports) {
    "use strict";
    var Interval = (function () {
        function Interval(_min, _max) {
            this._min = _min;
            this._max = _max;
        }
        Interval.prototype.intersects = function (other) {
            return !this.intersection(other).isEmpty;
        };
        Interval.prototype.intersection = function (other) {
            return new Interval(Math.max(this.min, other.min), Math.min(this.max, other.max));
        };
        Interval.prototype.union = function (other) {
            return new Interval(Math.min(this.min, other.min), Math.max(this.max, other.max));
        };
        Interval.prototype.ifNotEmpty = function (block) {
            return !this.isEmpty ? block() : 0;
        };
        Object.defineProperty(Interval.prototype, "min", {
            get: function () {
                return this._min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Interval.prototype, "max", {
            get: function () {
                return this._max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Interval.prototype, "center", {
            get: function () {
                var _this = this;
                return this.ifNotEmpty(function () { return (_this.min + _this.max) * 0.5; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Interval.prototype, "length", {
            get: function () {
                var _this = this;
                return this.ifNotEmpty(function () { return _this.max - _this.min; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Interval.prototype, "isEmpty", {
            get: function () {
                return this.min > this.max;
            },
            enumerable: true,
            configurable: true
        });
        return Interval;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Interval;
});
define("point", ["require", "exports"], function (require, exports) {
    "use strict";
    var Point = (function () {
        function Point(_x, _y) {
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            this._x = _x;
            this._y = _y;
        }
        Point.prototype.add = function (other) {
            return new Point(this.x + other.x, this.y + other.y);
        };
        Point.prototype.subtract = function (other) {
            return this.add(other.negate());
        };
        Point.prototype.negate = function () {
            return new Point(-this.x, -this.y);
        };
        Point.prototype.scale = function (multiplierX, multiplierY) {
            multiplierY = multiplierY != null ? multiplierY : multiplierX;
            return new Point(this.x * multiplierX, this.y * multiplierY);
        };
        Point.prototype.toObject = function () {
            return { x: this.x, y: this.y };
        };
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        return Point;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Point;
});
define("rect", ["require", "exports", "interval", "point"], function (require, exports, interval_1, point_1) {
    "use strict";
    var Rect = (function () {
        function Rect(_x, _y, _width, _height) {
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            if (_width === void 0) { _width = 0; }
            if (_height === void 0) { _height = 0; }
            this._x = _x;
            this._y = _y;
            this._width = _width;
            this._height = _height;
        }
        Rect.fromPoints = function (points) {
            return points
                .map(function (point) { return new Rect(point.x, point.y); })
                .reduce(function (a, b) { return a.union(b); });
        };
        Rect.fromIntervals = function (horizontal, vertical) {
            return new Rect(horizontal.min, vertical.min, horizontal.length, vertical.length);
        };
        Rect.prototype.expand = function (delta) {
            return new Rect(this.x, this.y, this.width + delta.x, this.height + delta.y);
        };
        Rect.prototype.intersects = function (other) {
            return this.horizontalAxis.intersects(other.horizontalAxis)
                && this.verticalAxis.intersects(other.verticalAxis);
        };
        Rect.prototype.offset = function (delta) {
            return new Rect(this.x + delta.x, this.y + delta.y, this.width, this.height);
        };
        Rect.prototype.scale = function (scaleX, scaleY) {
            scaleY = scaleY == null ? scaleX : scaleY;
            return new Rect(this.x * scaleX, this.y * scaleY, this.width * scaleX, this.height * scaleY);
        };
        Rect.prototype.union = function (other) {
            return Rect.fromIntervals(this.horizontalAxis.union(other.horizontalAxis), this.verticalAxis.union(other.verticalAxis));
        };
        Rect.prototype.toObject = function () {
            return { x: this.x, y: this.y, width: this.width, height: this.height };
        };
        Object.defineProperty(Rect.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "topLeft", {
            get: function () {
                return new point_1.default(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottomRight", {
            get: function () {
                return new point_1.default(this.right, this.bottom);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "horizontalAxis", {
            get: function () {
                return new interval_1.default(this.x, this.right);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "verticalAxis", {
            get: function () {
                return new interval_1.default(this.y, this.bottom);
            },
            enumerable: true,
            configurable: true
        });
        return Rect;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Rect;
});
define("geom", ["require", "exports", "interval", "point", "rect"], function (require, exports, interval_2, point_2, rect_1) {
    "use strict";
    exports.Interval = interval_2.default;
    exports.Point = point_2.default;
    exports.Rect = rect_1.default;
});
