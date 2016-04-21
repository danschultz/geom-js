!function(e){function r(e,r,t){e in i||(i[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return c[e]||(c[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,s=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var s=0;s<i.dependencies.length;++s)i.dependencies[s]===o&&i.setters[s](a)}return o.locked=!1,r},r.name);o.setters=s.setters,o.execute=s.execute;for(var l=0,d=r.normalizedDeps.length;d>l;l++){var f,p=r.normalizedDeps[l],v=i[p],m=c[p];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=u(p),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[l]&&o.setters[l](f)}}}function o(e){var r={};if("object"==typeof e||"function"==typeof e)if(l){var t;for(var n in e)(t=Object.getOwnPropertyDescriptor(e,n))&&f(r,n,t)}else{var o=e&&e.hasOwnProperty;for(var n in e)(!o||e.hasOwnProperty(n))&&(r[n]=e[n])}return r["default"]=e,f(r,"__useDefault",{value:!0}),r}function a(r,t){var n=i[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,l=n.normalizedDeps.length;l>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(i[d]?a(d,t):u(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function u(e){if(v[e])return v[e];if("@node/"==e.substr(0,6))return p(e.substr(6));var r=i[e];if(!r)throw"Module "+e+" not present.";return n(i[e]),a(e,[]),i[e]=void 0,r.declarative&&f(r.module.exports,"__esModule",{value:!0}),v[e]=r.declarative?r.module.exports:r.esModule}var i={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},l=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(d){l=!1}var f;!function(){try{Object.defineProperty({},"a",{})&&(f=Object.defineProperty)}catch(e){f=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var c={},p="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,v={"@empty":{}};return function(e,t,n){return function(a){a(function(a){for(var i=0;i<t.length;i++)(function(e,r){r&&r.__esModule?v[e]=r:v[e]=o(r)})(t[i],arguments[i]);n({register:r});var s=u(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)u(e[i]);return s.__useDefault?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1","1"], [], function($__System) {

$__System.register("2", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Interval;
  return {
    setters: [],
    execute: function() {
      Interval = (function() {
        function Interval(_min, _max) {
          this._min = _min;
          this._max = _max;
        }
        Interval.prototype.intersects = function(other) {
          return !this.intersection(other).isEmpty;
        };
        Interval.prototype.intersection = function(other) {
          return new Interval(Math.max(this.min, other.min), Math.min(this.max, other.max));
        };
        Interval.prototype.union = function(other) {
          return new Interval(Math.min(this.min, other.min), Math.max(this.max, other.max));
        };
        Interval.prototype.ifNotEmpty = function(block) {
          return !this.isEmpty ? block() : 0;
        };
        Object.defineProperty(Interval.prototype, "min", {
          get: function() {
            return this._min;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Interval.prototype, "max", {
          get: function() {
            return this._max;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Interval.prototype, "center", {
          get: function() {
            var _this = this;
            return this.ifNotEmpty(function() {
              return (_this.min + _this.max) * 0.5;
            });
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Interval.prototype, "length", {
          get: function() {
            var _this = this;
            return this.ifNotEmpty(function() {
              return _this.max - _this.min;
            });
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Interval.prototype, "isEmpty", {
          get: function() {
            return this.min > this.max;
          },
          enumerable: true,
          configurable: true
        });
        return Interval;
      }());
      exports_1("default", Interval);
    }
  };
});

$__System.register("3", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Point;
  return {
    setters: [],
    execute: function() {
      Point = (function() {
        function Point(_x, _y) {
          if (_x === void 0) {
            _x = 0;
          }
          if (_y === void 0) {
            _y = 0;
          }
          this._x = _x;
          this._y = _y;
        }
        Point.prototype.add = function(other) {
          return new Point(this.x + other.x, this.y + other.y);
        };
        Point.prototype.subtract = function(other) {
          return this.add(other.negate());
        };
        Point.prototype.negate = function() {
          return new Point(-this.x, -this.y);
        };
        Point.prototype.scale = function(multiplierX, multiplierY) {
          multiplierY = multiplierY != null ? multiplierY : multiplierX;
          return new Point(this.x * multiplierX, this.y * multiplierY);
        };
        Point.prototype.toObject = function() {
          return {
            x: this.x,
            y: this.y
          };
        };
        Object.defineProperty(Point.prototype, "x", {
          get: function() {
            return this._x;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
          get: function() {
            return this._y;
          },
          enumerable: true,
          configurable: true
        });
        return Point;
      }());
      exports_1("default", Point);
    }
  };
});

$__System.register("4", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function add(a, b) {
    return a + b;
  }
  exports_1("add", add);
  function subtract(a, b) {
    return a - b;
  }
  exports_1("subtract", subtract);
  return {
    setters: [],
    execute: function() {}
  };
});

$__System.register("5", ["2", "3", "4"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var interval_1,
      point_1,
      shape_js_1;
  var Rect;
  return {
    setters: [function(interval_1_1) {
      interval_1 = interval_1_1;
    }, function(point_1_1) {
      point_1 = point_1_1;
    }, function(shape_js_1_1) {
      shape_js_1 = shape_js_1_1;
    }],
    execute: function() {
      Rect = (function() {
        function Rect(_x, _y, _width, _height) {
          if (_x === void 0) {
            _x = 0;
          }
          if (_y === void 0) {
            _y = 0;
          }
          if (_width === void 0) {
            _width = 0;
          }
          if (_height === void 0) {
            _height = 0;
          }
          this._x = _x;
          this._y = _y;
          this._width = _width;
          this._height = _height;
        }
        Rect.fromPoints = function(points) {
          return points.map(function(point) {
            return new Rect(point.x, point.y);
          }).reduce(function(a, b) {
            return a.union(b);
          });
        };
        Rect.fromIntervals = function(horizontal, vertical) {
          return new Rect(horizontal.min, vertical.min, horizontal.length, vertical.length);
        };
        Rect.prototype.expand = function(delta) {
          return new Rect(this.x, this.y, shape_js_1.add(this.width, delta.x), this.height + delta.y);
        };
        Rect.prototype.intersects = function(other) {
          return this.horizontalAxis.intersects(other.horizontalAxis) && this.verticalAxis.intersects(other.verticalAxis);
        };
        Rect.prototype.offset = function(delta) {
          return new Rect(this.x + delta.x, this.y + delta.y, this.width, this.height);
        };
        Rect.prototype.scale = function(scaleX, scaleY) {
          scaleY = scaleY == null ? scaleX : scaleY;
          return new Rect(this.x * scaleX, this.y * scaleY, this.width * scaleX, this.height * scaleY);
        };
        Rect.prototype.union = function(other) {
          return Rect.fromIntervals(this.horizontalAxis.union(other.horizontalAxis), this.verticalAxis.union(other.verticalAxis));
        };
        Rect.prototype.toObject = function() {
          return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
          };
        };
        Object.defineProperty(Rect.prototype, "x", {
          get: function() {
            return this._x;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "y", {
          get: function() {
            return this._y;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "width", {
          get: function() {
            return this._width;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "height", {
          get: function() {
            return this._height;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "topLeft", {
          get: function() {
            return new point_1.default(this.x, this.y);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottomRight", {
          get: function() {
            return new point_1.default(this.right, this.bottom);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "right", {
          get: function() {
            return this.x + this.width;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottom", {
          get: function() {
            return this.y + this.height;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "horizontalAxis", {
          get: function() {
            return new interval_1.default(this.x, this.right);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Rect.prototype, "verticalAxis", {
          get: function() {
            return new interval_1.default(this.y, this.bottom);
          },
          enumerable: true,
          configurable: true
        });
        return Rect;
      }());
      exports_1("default", Rect);
    }
  };
});

$__System.register("1", ["2", "3", "5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [function(interval_1_1) {
      exports_1({"Interval": interval_1_1["default"]});
    }, function(point_1_1) {
      exports_1({"Point": point_1_1["default"]});
    }, function(rect_1_1) {
      exports_1({"Rect": rect_1_1["default"]});
    }],
    execute: function() {}
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    geom = factory();
});
//# sourceMappingURL=geom-js.js.map