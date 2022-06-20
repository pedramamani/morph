/*
MIT License

Copyright (c) 2012 - 2021 @jonobr1 / http://jono.fyi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var Two = (() => {
    var M,
        aC = Object.defineProperty,
        aD = Object.getOwnPropertyDescriptor,
        aE = Object.getOwnPropertyNames,
        aF = Object.prototype.hasOwnProperty,
        aG = (a, b, c) =>
            b in a ? aC(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c),
        aH = (a) => aC(a, "__esModule", { value: !0 }),
        j = (c, a) => {
            for (var b in a) aC(c, b, { get: a[b], enumerable: !0 });
        },
        aI = (c, a, e, d) => {
            if ((a && "object" == typeof a) || "function" == typeof a)
                for (let b of aE(a))
                    !aF.call(c, b) &&
                        (e || "default" !== b) &&
                        aC(c, b, { get: () => a[b], enumerable: !(d = aD(a, b)) || d.enumerable });
            return c;
        },
        N =
            ((M = "undefined" != typeof WeakMap ? new WeakMap() : 0),
            (a, b) => (M && M.get(a)) || ((b = aI(aH({}), a, 1)), M && M.set(a, b), b)),
        a = (c, a, b) => (aG(c, "symbol" != typeof a ? a + "" : a, b), b),
        v = {};
    j(v, { default: () => b });
    var O = { move: "M", line: "L", curve: "C", arc: "A", close: "Z" },
        w = {};
    j(w, {
        HALF_PI: () => $,
        NumArray: () => x,
        TWO_PI: () => aK,
        decomposeMatrix: () => aL,
        getComputedMatrix: () => aM,
        getPoT: () => aP,
        lerp: () => aN,
        mod: () => aQ,
        setMatrix: () => P,
        toFixed: () => aS,
    }),
        "u" > typeof window ? (c = window) : "u" > typeof global ? (c = global) : "u" > typeof self && (c = self);
    var c,
        aJ,
        aK = 2 * Math.PI,
        $ = 0.5 * Math.PI;
    function aL(a, c, d, e, f, g) {
        let b;
        return (
            arguments.length <= 1 ? ((b = a.a), (c = a.b), (d = a.c), (e = a.d), (f = a.e), (g = a.f)) : (b = a),
            {
                translateX: f,
                translateY: g,
                scaleX: Math.sqrt(b * b + c * c),
                scaleY: Math.sqrt(d * d + e * e),
                rotation: (180 * Math.atan2(c, b)) / Math.PI,
            }
        );
    }
    function P(a) {
        aJ = a;
    }
    function aM(f, b) {
        b = (b && b.identity()) || new aJ();
        let c = f,
            d = [];
        for (; c && c._matrix; ) d.push(c._matrix), (c = c.parent);
        d.reverse();
        for (let e = 0; e < d.length; e++) {
            let a = d[e].elements;
            b.multiply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
        }
        return b;
    }
    function aN(a, b, c) {
        return c * (b - a) + a;
    }
    var aO = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
    function aP(b) {
        let a = 0;
        for (; aO[a] && aO[a] < b; ) a++;
        return aO[a];
    }
    function aQ(a, b) {
        for (; a < 0; ) a += b;
        return a % b;
    }
    var x = c.Float32Array || Array,
        aR = Math.floor;
    function aS(a) {
        return aR(1e6 * a) / 1e6;
    }
    var y = {};
    j(y, {
        Curve: () => aW,
        getAnchorsFromArcData: () => a3,
        getComponentOnCubicBezier: () => aX,
        getControlPoints: () => a1,
        getCurveBoundingBox: () => a$,
        getCurveFromPoints: () => a0,
        getCurveLength: () => aZ,
        getReflection: () => a2,
        integrate: () => a_,
        subdivide: () => aY,
    });
    var k = class {
        _events = {};
        _bound = !1;
        constructor() {}
        addEventListener(a, b) {
            return (this._events[a] || (this._events[a] = [])).push(b), (this._bound = !0), this;
        }
        on() {
            return this.addEventListener.apply(this, arguments);
        }
        bind() {
            return this.addEventListener.apply(this, arguments);
        }
        removeEventListener(a, c) {
            if (!this._events) return this;
            if (!a && !c) return (this._events = {}), (this._bound = !1), this;
            let g = a ? [a] : Object.keys(this._events);
            for (let d = 0, i = g.length; d < i; d++) {
                a = g[d];
                let e = this._events[a];
                if (e) {
                    let h = [];
                    if (c)
                        for (let f = 0, j = e.length; f < j; f++) {
                            let b = e[f];
                            (b = b.handler ? b.handler : b), c !== b && h.push(b);
                        }
                    this._events[a] = h;
                }
            }
            return this;
        }
        off() {
            return this.removeEventListener.apply(this, arguments);
        }
        unbind() {
            return this.removeEventListener.apply(this, arguments);
        }
        dispatchEvent(c) {
            if (!this._events) return this;
            let d = Array.prototype.slice.call(arguments, 1),
                a = this._events[c];
            if (a) for (let b = 0; b < a.length; b++) a[b].call(this, ...d);
            return this;
        }
        trigger() {
            return this.dispatchEvent.apply(this, arguments);
        }
        listen(b, c, d) {
            let e = this;
            function a() {
                d.apply(e, arguments);
            }
            return b && ((a.obj = b), (a.name = c), (a.handler = d), b.on(c, a)), e;
        }
        ignore(a, b, c) {
            return a.off(b, c), this;
        }
    };
    a(k, "Types", {
        play: "play",
        pause: "pause",
        update: "update",
        render: "render",
        resize: "resize",
        change: "change",
        remove: "remove",
        insert: "insert",
        order: "order",
        load: "load",
    }),
        a(k, "Methods", [
            "addEventListener",
            "on",
            "removeEventListener",
            "off",
            "unbind",
            "dispatchEvent",
            "trigger",
            "listen",
            "ignore",
        ]);
    var aT = {
            x: {
                enumerable: !0,
                get: function () {
                    return this._x;
                },
                set: function (a) {
                    this._x !== a && ((this._x = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
            y: {
                enumerable: !0,
                get: function () {
                    return this._y;
                },
                set: function (a) {
                    this._y !== a && ((this._y = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
        },
        g = class extends k {
            _x = 0;
            _y = 0;
            constructor(b = 0, c = 0) {
                for (let a in (super(), aT)) Object.defineProperty(this, a, aT[a]);
                (this.x = b), (this.y = c);
            }
            static add(a, b) {
                return new g(a.x + b.x, a.y + b.y);
            }
            static sub(a, b) {
                return new g(a.x - b.x, a.y - b.y);
            }
            static subtract(a, b) {
                return g.sub(a, b);
            }
            static ratioBetween(a, b) {
                return (a.x * b.x + a.y * b.y) / (a.length() * b.length());
            }
            static angleBetween(a, b) {
                if (arguments.length >= 4) {
                    let c = arguments[0] - arguments[2],
                        d = arguments[1] - arguments[3];
                    return Math.atan2(d, c);
                }
                let e = a.x - b.x,
                    f = a.y - b.y;
                return Math.atan2(f, e);
            }
            static distanceBetween(a, b) {
                return Math.sqrt(g.distanceBetweenSquared(a, b));
            }
            static distanceBetweenSquared(a, b) {
                let c = a.x - b.x,
                    d = a.y - b.y;
                return c * c + d * d;
            }
            set(a, b) {
                return (this.x = a), (this.y = b), this;
            }
            copy(a) {
                return (this.x = a.x), (this.y = a.y), this;
            }
            clear() {
                return (this.x = 0), (this.y = 0), this;
            }
            clone() {
                return new g(this.x, this.y);
            }
            add(a, b) {
                return (
                    arguments.length <= 0 ||
                        (arguments.length <= 1
                            ? "number" == typeof a
                                ? ((this.x += a), (this.y += a))
                                : a &&
                                  "number" == typeof a.x &&
                                  "number" == typeof a.y &&
                                  ((this.x += a.x), (this.y += a.y))
                            : ((this.x += a), (this.y += b))),
                    this
                );
            }
            addSelf(a) {
                return this.add.apply(this, arguments);
            }
            sub(a, b) {
                return (
                    arguments.length <= 0 ||
                        (arguments.length <= 1
                            ? "number" == typeof a
                                ? ((this.x -= a), (this.y -= a))
                                : a &&
                                  "number" == typeof a.x &&
                                  "number" == typeof a.y &&
                                  ((this.x -= a.x), (this.y -= a.y))
                            : ((this.x -= a), (this.y -= b))),
                    this
                );
            }
            subtract() {
                return this.sub.apply(this, arguments);
            }
            subSelf(a) {
                return this.sub.apply(this, arguments);
            }
            subtractSelf(a) {
                return this.sub.apply(this, arguments);
            }
            multiply(a, b) {
                return (
                    arguments.length <= 0 ||
                        (arguments.length <= 1
                            ? "number" == typeof a
                                ? ((this.x *= a), (this.y *= a))
                                : a &&
                                  "number" == typeof a.x &&
                                  "number" == typeof a.y &&
                                  ((this.x *= a.x), (this.y *= a.y))
                            : ((this.x *= a), (this.y *= b))),
                    this
                );
            }
            multiplySelf(a) {
                return this.multiply.apply(this, arguments);
            }
            multiplyScalar(a) {
                return this.multiply(a);
            }
            divide(a, b) {
                return (
                    arguments.length <= 0 ||
                        (arguments.length <= 1
                            ? "number" == typeof a
                                ? ((this.x /= a), (this.y /= a))
                                : a &&
                                  "number" == typeof a.x &&
                                  "number" == typeof a.y &&
                                  ((this.x /= a.x), (this.y /= a.y))
                            : ((this.x /= a), (this.y /= b)),
                        isNaN(this.x) && (this.x = 0),
                        isNaN(this.y) && (this.y = 0)),
                    this
                );
            }
            divideSelf(a) {
                return this.divide.apply(this, arguments);
            }
            divideScalar(a) {
                return this.divide(a);
            }
            negate() {
                return this.multiply(-1);
            }
            dot(a) {
                return this.x * a.x + this.y * a.y;
            }
            length() {
                return Math.sqrt(this.lengthSquared());
            }
            lengthSquared() {
                return this.x * this.x + this.y * this.y;
            }
            normalize() {
                return this.divideScalar(this.length());
            }
            distanceTo(a) {
                return Math.sqrt(this.distanceToSquared(a));
            }
            distanceToSquared(a) {
                let b = this.x - a.x,
                    c = this.y - a.y;
                return b * b + c * c;
            }
            setLength(a) {
                return this.normalize().multiplyScalar(a);
            }
            equals(b, a) {
                return (a = typeof a > "u" ? 1e-4 : a), this.distanceTo(b) < a;
            }
            lerp(a, b) {
                let c = (a.x - this.x) * b + this.x,
                    d = (a.y - this.y) * b + this.y;
                return this.set(c, d);
            }
            isZero(a) {
                return (a = typeof a > "u" ? 1e-4 : a), this.length() < a;
            }
            toString() {
                return this.x + ", " + this.y;
            }
            toObject() {
                return { x: this.x, y: this.y };
            }
            rotate(a) {
                let b = this.x,
                    c = this.y,
                    d = Math.cos(a),
                    e = Math.sin(a);
                return (this.x = b * d - c * e), (this.y = b * e + c * d), this;
            }
        },
        e = g;
    a(e, "zero", new g()),
        a(e, "left", new g(-1, 0)),
        a(e, "right", new g(1, 0)),
        a(e, "up", new g(0, -1)),
        a(e, "down", new g(0, 1));
    var Q = class extends e {
            controls = { left: new e(), right: new e() };
            _command = O.move;
            _relative = !0;
            _rx = 0;
            _ry = 0;
            _xAxisRotation = 0;
            _largeArcFlag = 0;
            _sweepFlag = 1;
            constructor(c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = O.move) {
                for (let a in (super(c, d), aU)) Object.defineProperty(this, a, aU[a]);
                (this.command = i), (this.relative = !0);
                let b = Q.makeBroadcast(this);
                this.controls.left.set(e, f).addEventListener(k.Types.change, b),
                    this.controls.right.set(g, h).addEventListener(k.Types.change, b);
            }
            static makeBroadcast(a) {
                return function () {
                    a._bound && a.dispatchEvent(k.Types.change);
                };
            }
            copy(a) {
                return (
                    (this.x = a.x),
                    (this.y = a.y),
                    "string" == typeof a.command && (this.command = a.command),
                    a.controls &&
                        (a.controls.left && this.controls.left.copy(a.controls.left),
                        a.controls.right && this.controls.right.copy(a.controls.right)),
                    "boolean" == typeof a.relative && (this.relative = a.relative),
                    "number" == typeof a.rx && (this.rx = a.rx),
                    "number" == typeof a.ry && (this.ry = a.ry),
                    "number" == typeof a.xAxisRotation && (this.xAxisRotation = a.xAxisRotation),
                    "number" == typeof a.largeArcFlag && (this.largeArcFlag = a.largeArcFlag),
                    "number" == typeof a.sweepFlag && (this.sweepFlag = a.sweepFlag),
                    this
                );
            }
            clone() {
                return new Q().copy(this);
            }
            toObject() {
                return {
                    x: this.x,
                    y: this.y,
                    command: this.command,
                    relative: this.relative,
                    controls: { left: this.controls.left.toObject(), right: this.controls.right.toObject() },
                    rx: this.rx,
                    ry: this.ry,
                    xAxisRotation: this.xAxisRotation,
                    largeArcFlag: this.largeArcFlag,
                    sweepFlag: this.sweepFlag,
                };
            }
            toString() {
                return JSON.stringify(this.toObject());
            }
        },
        aU = {
            command: {
                enumerable: !0,
                get: function () {
                    return this._command;
                },
                set: function (a) {
                    this._command !== a && ((this._command = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
            relative: {
                enumerable: !0,
                get: function () {
                    return this._relative;
                },
                set: function (a) {
                    !!a !== this._relative &&
                        ((this._relative = !!a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
            rx: {
                enumerable: !0,
                get: function () {
                    return this._rx;
                },
                set: function (a) {
                    this._rx !== a && ((this._rx = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
            ry: {
                enumerable: !0,
                get: function () {
                    return this._ry;
                },
                set: function (a) {
                    this._ry !== a && ((this._ry = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
            xAxisRotation: {
                enumerable: !0,
                get: function () {
                    return this._xAxisRotation;
                },
                set: function (a) {
                    this._xAxisRotation !== a &&
                        ((this._xAxisRotation = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
            largeArcFlag: {
                enumerable: !0,
                get: function () {
                    return this._largeArcFlag;
                },
                set: function (a) {
                    this._largeArcFlag !== a &&
                        ((this._largeArcFlag = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
            sweepFlag: {
                get: function () {
                    return this._sweepFlag;
                },
                set: function (a) {
                    this._sweepFlag !== a && ((this._sweepFlag = a), this._bound && this.dispatchEvent(k.Types.change));
                },
            },
        },
        aV = 0,
        d = {
            nextFrameID: null,
            Types: { webgl: "WebGLRenderer", svg: "SVGRenderer", canvas: "CanvasRenderer" },
            Version: "v0.8.10",
            PublishDate: "2022-06-09T16:09:22.888Z",
            Identifier: "two-",
            Resolution: 12,
            AutoCalculateImportedMatrices: !0,
            Instances: [],
            uniqueId: function () {
                return aV++;
            },
        },
        aW = {
            CollinearityEpsilon: 1e-30,
            RecursionLimit: 16,
            CuspLimit: 0,
            Tolerance: { distance: 0.25, angle: 0, epsilon: Number.EPSILON },
            abscissas: [
                [0.5773502691896257],
                [0, 0.7745966692414834],
                [0.33998104358485626, 0.8611363115940526],
                [0, 0.5384693101056831, 0.906179845938664],
                [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
                [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
                [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
                [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
                [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
                [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
                [
                    0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749,
                    0.9815606342467192,
                ],
                [
                    0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099,
                    0.9175983992229779, 0.9841830547185881,
                ],
                [
                    0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765,
                    0.9284348836635735, 0.9862838086968123,
                ],
                [
                    0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701,
                    0.8482065834104272, 0.937273392400706, 0.9879925180204854,
                ],
                [
                    0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003,
                    0.8656312023878318, 0.9445750230732326, 0.9894009349916499,
                ],
            ],
            weights: [
                [1],
                [0.8888888888888888, 0.5555555555555556],
                [0.6521451548625461, 0.34785484513745385],
                [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
                [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
                [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
                [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
                [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
                [
                    0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806,
                    0.06667134430868814,
                ],
                [
                    0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426,
                    0.1255803694649046, 0.05566856711617366,
                ],
                [
                    0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622,
                    0.10693932599531843, 0.04717533638651183,
                ],
                [
                    0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574,
                    0.13887351021978725, 0.09212149983772845, 0.04048400476531588,
                ],
                [
                    0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355,
                    0.12151857068790319, 0.08015808715976021, 0.03511946033175186,
                ],
                [
                    0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392,
                    0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727,
                ],
                [
                    0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674,
                    0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096,
                ],
            ],
        };
    function aX(a, c, d, e, f) {
        let b = 1 - a;
        return b * b * b * c + 3 * b * b * a * d + 3 * b * a * a * e + a * a * a * f;
    }
    function aY(d, e, i, j, k, l, a, b, f) {
        let g = (f = f || aW.RecursionLimit) + 1;
        if (0.001 > Math.abs(d - a) && 0.001 > Math.abs(e - b)) return [new Q(a, b)];
        let h = [];
        for (let c = 0; c < g; c++) {
            let _ = c / g,
                m = aX(_, d, i, k, a),
                n = aX(_, e, j, l, b);
            h.push(new Q(m, n));
        }
        return h;
    }
    function aZ(a, b, c, d, e, f, g, h, k) {
        if (a === c && b === d && e === g && f === h) {
            let i = g - a,
                j = h - b;
            return Math.sqrt(i * i + j * j);
        }
        let l = 9 * (c - e) + 3 * (g - a),
            m = 6 * (a + e) - 12 * c,
            n = 3 * (c - a),
            _ = 9 * (d - f) + 3 * (h - b),
            o = 6 * (b + f) - 12 * d,
            p = 3 * (d - b);
        return a_(
            function (a) {
                let b = (l * a + m) * a + n,
                    c = (_ * a + o) * a + p;
                return Math.sqrt(b * b + c * c);
            },
            0,
            1,
            k || aW.RecursionLimit
        );
    }
    function a$(f, g, k, l, m, n, o, p) {
        let h = [],
            c = [[], []],
            e,
            d,
            _,
            a,
            q,
            r,
            u,
            s;
        for (let t = 0; t < 2; ++t) {
            if (
                (0 == t
                    ? ((d = 6 * f - 12 * k + 6 * m), (e = -3 * f + 9 * k - 9 * m + 3 * o), (_ = 3 * k - 3 * f))
                    : ((d = 6 * g - 12 * l + 6 * n), (e = -3 * g + 9 * l - 9 * n + 3 * p), (_ = 3 * l - 3 * g)),
                1e-12 > Math.abs(e))
            ) {
                if (1e-12 > Math.abs(d)) continue;
                0 < (a = -_ / d) && a < 1 && h.push(a);
                continue;
            }
            (s = Math.sqrt((u = d * d - 4 * _ * e))),
                !(u < 0) &&
                    (0 < (q = (-d + s) / (2 * e)) && q < 1 && h.push(q),
                    0 < (r = (-d - s) / (2 * e)) && r < 1 && h.push(r));
        }
        let i = h.length,
            j = i,
            b;
        for (; i--; )
            (b = 1 - (a = h[i])),
                (c[0][i] = b * b * b * f + 3 * b * b * a * k + 3 * b * a * a * m + a * a * a * o),
                (c[1][i] = b * b * b * g + 3 * b * b * a * l + 3 * b * a * a * n + a * a * a * p);
        return (
            (c[0][j] = f),
            (c[1][j] = g),
            (c[0][j + 1] = o),
            (c[1][j + 1] = p),
            (c[0].length = c[1].length = j + 2),
            {
                min: { x: Math.min.apply(0, c[0]), y: Math.min.apply(0, c[1]) },
                max: { x: Math.max.apply(0, c[0]), y: Math.max.apply(0, c[1]) },
            }
        );
    }
    function a_(c, f, j, a) {
        let k = aW.abscissas[a - 2],
            g = aW.weights[a - 2],
            d = 0.5 * (j - f),
            e = d + f,
            b = 0,
            l = (a + 1) >> 1,
            h = 1 & a ? g[b++] * c(e) : 0;
        for (; b < l; ) {
            let i = d * k[b];
            h += g[b++] * (c(e + i) + c(e - i));
        }
        return d * h;
    }
    function a0(b, d) {
        let c = b.length,
            f = c - 1;
        for (let a = 0; a < c; a++) {
            let g = b[a],
                h = d ? aQ(a - 1, c) : Math.max(a - 1, 0),
                i = d ? aQ(a + 1, c) : Math.min(a + 1, f),
                j = b[h],
                e = g,
                k = b[i];
            a1(j, e, k), (e.command = 0 === a ? O.move : O.curve);
        }
    }
    function a1(f, a, g) {
        let h = e.angleBetween(f, a),
            i = e.angleBetween(g, a),
            c = e.distanceBetween(f, a),
            d = e.distanceBetween(g, a),
            b = (h + i) / 2;
        return c < 1e-4 || d < 1e-4
            ? ("boolean" != typeof a.relative || a.relative || (a.controls.left.copy(a), a.controls.right.copy(a)), a)
            : ((c *= 0.33),
              (d *= 0.33),
              i < h ? (b += $) : (b -= $),
              (a.controls.left.x = Math.cos(b) * c),
              (a.controls.left.y = Math.sin(b) * c),
              (b -= Math.PI),
              (a.controls.right.x = Math.cos(b) * d),
              (a.controls.right.y = Math.sin(b) * d),
              "boolean" != typeof a.relative ||
                  a.relative ||
                  ((a.controls.left.x += a.x),
                  (a.controls.left.y += a.y),
                  (a.controls.right.x += a.x),
                  (a.controls.right.y += a.y)),
              a);
    }
    function a2(a, b, c) {
        return new e(2 * a.x - (b.x + a.x) - (c ? a.x : 0), 2 * a.y - (b.y + a.y) - (c ? a.y : 0));
    }
    function a3(n, o, g, h, i, j, k) {
        let c = d.Resolution,
            l = [];
        for (let a = 0; a < c; a++) {
            let b = (a + 1) / c;
            k && (b = 1 - b);
            let e = b * j + i,
                _ = g * Math.cos(e),
                m = h * Math.sin(e),
                f = new Q(_, m);
            (f.command = O.line), l.push(f);
        }
    }
    var a4 = c.devicePixelRatio || 1;
    function a5(a) {
        return (
            a.webkitBackingStorePixelRatio ||
            a.mozBackingStorePixelRatio ||
            a.msBackingStorePixelRatio ||
            a.oBackingStorePixelRatio ||
            a.backingStorePixelRatio ||
            1
        );
    }
    function R(a) {
        return a4 / a5(a);
    }
    var a6 = Array.prototype.slice;
    function a7(b) {
        if (null == b) return !1;
        let a = b.length;
        return "number" == typeof a && a >= 0 && a < 4294967296;
    }
    var z = {
            isNaN: function (a) {
                return "number" == typeof a && a !== +a;
            },
            isElement: function (a) {
                return !!(a && 1 === a.nodeType);
            },
            isObject: function (a) {
                let b = typeof a;
                return "function" === b || ("object" === b && !!a);
            },
            extend: function (b) {
                let c = a6.call(arguments, 1);
                for (let a = 0; a < c.length; a++) {
                    let d = c[a];
                    for (let e in d) b[e] = d[e];
                }
                return b;
            },
            defaults: function (a) {
                let d = a6.call(arguments, 1);
                for (let b = 0; b < d.length; b++) {
                    let e = d[b];
                    for (let c in e) void 0 === a[c] && (a[c] = e[c]);
                }
                return a;
            },
            each: function (a, e, f) {
                let g = f || this,
                    c = !a7(a) && Object.keys(a),
                    h = (c || a).length;
                for (let b = 0; b < h; b++) {
                    let d = c ? c[b] : b;
                    e.call(g, a[d], d, a);
                }
                return a;
            },
            performance: c.performance && c.performance.now ? c.performance : Date,
        },
        a8 = class extends k {
            _flagId = !1;
            _flagClassName = !1;
            _renderer = {};
            _id = "";
            _className = "";
            classList = [];
            constructor() {
                for (let a in (super(), a9)) Object.defineProperty(this, a, a9[a]);
            }
            flagReset() {
                this._flagId = this._flagClassName = !1;
            }
        },
        a9 = {
            renderer: {
                enumerable: !1,
                get: function () {
                    return this._renderer;
                },
            },
            id: {
                enumerable: !0,
                get: function () {
                    return this._id;
                },
                set: function (a) {
                    let b = this._id;
                    a !== this._id &&
                        ((this._id = a),
                        (this._flagId = !0),
                        this.parent &&
                            (delete this.parent.children.ids[b], (this.parent.children.ids[this._id] = this)));
                },
            },
            className: {
                enumerable: !0,
                get: function () {
                    return this._className;
                },
                set: function (a) {
                    this._className !== a &&
                        ((this._flagClassName = !0), (this.classList = a.split(/\s+?/)), (this._className = a));
                },
            },
        },
        ba = Math.cos,
        bb = Math.sin,
        bc = Math.tan,
        bd = [],
        S = class extends k {
            elements = new x(9);
            manual = !1;
            constructor(b, c, d, e, f, g) {
                super();
                let a = b;
                Array.isArray(a) || (a = Array.prototype.slice.call(arguments)),
                    this.identity(),
                    a.length > 0 && this.set(a);
            }
            static Multiply(c, a, b) {
                if (a.length <= 3) {
                    let d = c,
                        z,
                        A,
                        B,
                        e = a[0] || 0,
                        f = a[1] || 0,
                        g = a[2] || 0;
                    return (
                        (z = d[0] * e + d[1] * f + d[2] * g),
                        (A = d[3] * e + d[4] * f + d[5] * g),
                        (B = d[6] * e + d[7] * f + d[8] * g),
                        { x: z, y: A, z: B }
                    );
                }
                let h = c[0],
                    i = c[1],
                    j = c[2],
                    k = c[3],
                    l = c[4],
                    m = c[5],
                    n = c[6],
                    o = c[7],
                    _ = c[8],
                    p = a[0],
                    q = a[1],
                    r = a[2],
                    s = a[3],
                    t = a[4],
                    u = a[5],
                    v = a[6],
                    w = a[7],
                    y = a[8];
                return (
                    ((b = b || new x(9))[0] = h * p + i * s + j * v),
                    (b[1] = h * q + i * t + j * w),
                    (b[2] = h * r + i * u + j * y),
                    (b[3] = k * p + l * s + m * v),
                    (b[4] = k * q + l * t + m * w),
                    (b[5] = k * r + l * u + m * y),
                    (b[6] = n * p + o * s + _ * v),
                    (b[7] = n * q + o * t + _ * w),
                    (b[8] = n * r + o * u + _ * y),
                    b
                );
            }
            set(b, c, d, e, f, g, h, i, j) {
                if (typeof c > "u") {
                    let a = b;
                    (b = a[0]),
                        (c = a[1]),
                        (d = a[2]),
                        (e = a[3]),
                        (f = a[4]),
                        (g = a[5]),
                        (h = a[6]),
                        (i = a[7]),
                        (j = a[8]);
                }
                return (
                    (this.elements[0] = b),
                    (this.elements[1] = c),
                    (this.elements[2] = d),
                    (this.elements[3] = e),
                    (this.elements[4] = f),
                    (this.elements[5] = g),
                    (this.elements[6] = h),
                    (this.elements[7] = i),
                    (this.elements[8] = j),
                    this.trigger(k.Types.change)
                );
            }
            copy(a) {
                return (
                    (this.elements[0] = a.elements[0]),
                    (this.elements[1] = a.elements[1]),
                    (this.elements[2] = a.elements[2]),
                    (this.elements[3] = a.elements[3]),
                    (this.elements[4] = a.elements[4]),
                    (this.elements[5] = a.elements[5]),
                    (this.elements[6] = a.elements[6]),
                    (this.elements[7] = a.elements[7]),
                    (this.elements[8] = a.elements[8]),
                    (this.manual = a.manual),
                    this.trigger(k.Types.change)
                );
            }
            identity() {
                return (
                    (this.elements[0] = S.Identity[0]),
                    (this.elements[1] = S.Identity[1]),
                    (this.elements[2] = S.Identity[2]),
                    (this.elements[3] = S.Identity[3]),
                    (this.elements[4] = S.Identity[4]),
                    (this.elements[5] = S.Identity[5]),
                    (this.elements[6] = S.Identity[6]),
                    (this.elements[7] = S.Identity[7]),
                    (this.elements[8] = S.Identity[8]),
                    this.trigger(k.Types.change)
                );
            }
            multiply(a, e, f, y, b, z, A, B, C) {
                if (typeof e > "u")
                    return (
                        (this.elements[0] *= a),
                        (this.elements[1] *= a),
                        (this.elements[2] *= a),
                        (this.elements[3] *= a),
                        (this.elements[4] *= a),
                        (this.elements[5] *= a),
                        (this.elements[6] *= a),
                        (this.elements[7] *= a),
                        (this.elements[8] *= a),
                        this.trigger(k.Types.change)
                    );
                if (typeof y > "u") {
                    (a = a || 0), (e = e || 0), (f = f || 0);
                    let D = (b = this.elements)[0] * a + b[1] * e + b[2] * f,
                        E = b[3] * a + b[4] * e + b[5] * f,
                        F = b[6] * a + b[7] * e + b[8] * f;
                    return { x: D, y: E, z: F };
                }
                let c = this.elements,
                    d = [a, e, f, y, b, z, A, B, C],
                    _ = c[0],
                    g = c[1],
                    h = c[2],
                    i = c[3],
                    j = c[4],
                    l = c[5],
                    m = c[6],
                    n = c[7],
                    o = c[8],
                    p = d[0],
                    q = d[1],
                    r = d[2],
                    s = d[3],
                    t = d[4],
                    u = d[5],
                    v = d[6],
                    w = d[7],
                    x = d[8];
                return (
                    (this.elements[0] = _ * p + g * s + h * v),
                    (this.elements[1] = _ * q + g * t + h * w),
                    (this.elements[2] = _ * r + g * u + h * x),
                    (this.elements[3] = i * p + j * s + l * v),
                    (this.elements[4] = i * q + j * t + l * w),
                    (this.elements[5] = i * r + j * u + l * x),
                    (this.elements[6] = m * p + n * s + o * v),
                    (this.elements[7] = m * q + n * t + o * w),
                    (this.elements[8] = m * r + n * u + o * x),
                    this.trigger(k.Types.change)
                );
            }
            inverse(a) {
                let c = this.elements;
                a = a || new S();
                let d = c[0],
                    e = c[1],
                    f = c[2],
                    g = c[3],
                    h = c[4],
                    i = c[5],
                    j = c[6],
                    k = c[7],
                    l = c[8],
                    _ = l * h - i * k,
                    m = -l * g + i * j,
                    n = k * g - h * j,
                    b = d * _ + e * m + f * n;
                return b
                    ? ((b = 1 / b),
                      (a.elements[0] = _ * b),
                      (a.elements[1] = (-l * e + f * k) * b),
                      (a.elements[2] = (i * e - f * h) * b),
                      (a.elements[3] = m * b),
                      (a.elements[4] = (l * d - f * j) * b),
                      (a.elements[5] = (-i * d + f * g) * b),
                      (a.elements[6] = n * b),
                      (a.elements[7] = (-k * d + e * j) * b),
                      (a.elements[8] = (h * d - e * g) * b),
                      a)
                    : null;
            }
            scale(a, b) {
                return arguments.length <= 1 && (b = a), this.multiply(a, 0, 0, 0, b, 0, 0, 0, 1);
            }
            rotate(a) {
                let b = ba(a),
                    c = bb(a);
                return this.multiply(b, -c, 0, c, b, 0, 0, 0, 1);
            }
            translate(a, b) {
                return this.multiply(1, 0, a, 0, 1, b, 0, 0, 1);
            }
            skewX(a) {
                let b = bc(a);
                return this.multiply(1, b, 0, 0, 1, 0, 0, 0, 1);
            }
            skewY(a) {
                let b = bc(a);
                return this.multiply(1, 0, 0, b, 1, 0, 0, 0, 1);
            }
            toString(a) {
                return (bd.length = 0), this.toTransformArray(a, bd), bd.map(aS).join(" ");
            }
            toTransformArray(l, a) {
                let b = this.elements,
                    i = !!a,
                    c = b[0],
                    d = b[1],
                    e = b[2],
                    f = b[3],
                    g = b[4],
                    h = b[5];
                if (l) {
                    let j = b[6],
                        _ = b[7],
                        k = b[8];
                    if (i) {
                        (a[0] = c),
                            (a[1] = f),
                            (a[2] = j),
                            (a[3] = d),
                            (a[4] = g),
                            (a[5] = _),
                            (a[6] = e),
                            (a[7] = h),
                            (a[8] = k);
                        return;
                    }
                    return [c, f, j, d, g, _, e, h, k];
                }
                if (i) {
                    (a[0] = c), (a[1] = f), (a[2] = d), (a[3] = g), (a[4] = e), (a[5] = h);
                    return;
                }
                return [c, f, d, g, e, h];
            }
            toArray(l, a) {
                let b = this.elements,
                    i = !!a,
                    c = b[0],
                    d = b[1],
                    e = b[2],
                    f = b[3],
                    g = b[4],
                    h = b[5];
                if (l) {
                    let j = b[6],
                        _ = b[7],
                        k = b[8];
                    if (i) {
                        (a[0] = c),
                            (a[1] = d),
                            (a[2] = e),
                            (a[3] = f),
                            (a[4] = g),
                            (a[5] = h),
                            (a[6] = j),
                            (a[7] = _),
                            (a[8] = k);
                        return;
                    }
                    return [c, d, e, f, g, h, j, _, k];
                }
                if (i) {
                    (a[0] = c), (a[1] = d), (a[2] = e), (a[3] = f), (a[4] = g), (a[5] = h);
                    return;
                }
                return [c, d, e, f, g, h];
            }
            toObject() {
                return { elements: this.toArray(!0), manual: !!this.manual };
            }
            clone() {
                return new S().copy(this);
            }
        },
        f = S;
    a(f, "Identity", [1, 0, 0, 0, 1, 0, 0, 0, 1]), P(f);
    var T = class extends a8 {
            _flagMatrix = !0;
            _flagScale = !1;
            _matrix = null;
            _worldMatrix = null;
            _position = null;
            _rotation = 0;
            _scale = 1;
            _skewX = 0;
            _skewY = 0;
            constructor() {
                for (let a in (super(), be)) Object.defineProperty(this, a, be[a]);
                (this._renderer.flagMatrix = bf.bind(this)),
                    (this.isShape = !0),
                    (this.id = d.Identifier + d.uniqueId()),
                    (this.matrix = new f()),
                    (this.worldMatrix = new f()),
                    (this.position = new e()),
                    (this.rotation = 0),
                    (this.scale = 1),
                    (this.skewX = 0),
                    (this.skewY = 0);
            }
            get renderer() {
                return this._renderer;
            }
            set renderer(a) {
                this._renderer = a;
            }
            get translation() {
                return be.position.get.apply(this, arguments);
            }
            set translation(a) {
                be.position.set.apply(this, arguments);
            }
            addTo(a) {
                return a.add(this), this;
            }
            remove() {
                return this.parent && this.parent.remove(this), this;
            }
            clone(b) {
                let a = new T();
                return (
                    a.position.copy(this.position),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix),
                    b && b.add(a),
                    a._update()
                );
            }
            _update(a) {
                return (
                    !this._matrix.manual &&
                        this._flagMatrix &&
                        (this._matrix.identity().translate(this.position.x, this.position.y),
                        this._scale instanceof e
                            ? this._matrix.scale(this._scale.x, this._scale.y)
                            : this._matrix.scale(this._scale),
                        this._matrix.rotate(this.rotation),
                        this._matrix.skewX(this.skewX),
                        this._matrix.skewY(this.skewY)),
                    a && this.parent && this.parent._update && this.parent._update(),
                    this
                );
            }
            flagReset() {
                return (this._flagMatrix = this._flagScale = !1), super.flagReset.call(this), this;
            }
        },
        be = {
            position: {
                enumerable: !0,
                get: function () {
                    return this._position;
                },
                set: function (a) {
                    this._position && this._position.unbind(k.Types.change, this._renderer.flagMatrix),
                        (this._position = a),
                        this._position.bind(k.Types.change, this._renderer.flagMatrix),
                        bf.call(this);
                },
            },
            rotation: {
                enumerable: !0,
                get: function () {
                    return this._rotation;
                },
                set: function (a) {
                    (this._rotation = a), (this._flagMatrix = !0);
                },
            },
            scale: {
                enumerable: !0,
                get: function () {
                    return this._scale;
                },
                set: function (a) {
                    this._scale instanceof e && this._scale.unbind(k.Types.change, this._renderer.flagMatrix),
                        (this._scale = a),
                        this._scale instanceof e && this._scale.bind(k.Types.change, this._renderer.flagMatrix),
                        (this._flagMatrix = !0),
                        (this._flagScale = !0);
                },
            },
            skewX: {
                enumerable: !0,
                get: function () {
                    return this._skewX;
                },
                set: function (a) {
                    (this._skewX = a), (this._flagMatrix = !0);
                },
            },
            skewY: {
                enumerable: !0,
                get: function () {
                    return this._skewY;
                },
                set: function (a) {
                    (this._skewY = a), (this._flagMatrix = !0);
                },
            },
            matrix: {
                enumerable: !0,
                get: function () {
                    return this._matrix;
                },
                set: function (a) {
                    (this._matrix = a), (this._flagMatrix = !0);
                },
            },
            worldMatrix: {
                enumerable: !0,
                get: function () {
                    return aM(this, this._worldMatrix), this._worldMatrix;
                },
                set: function (a) {
                    this._worldMatrix = a;
                },
            },
        };
    function bf() {
        this._flagMatrix = !0;
    }
    var U = class extends Array {
            _events = new k();
            get _bound() {
                return this._events._bound;
            }
            set _bound(a) {
                this._events._bound = a;
            }
            addEventListener() {
                return this._events.addEventListener.apply(this, arguments);
            }
            on() {
                return this._events.on.apply(this, arguments);
            }
            bind() {
                return this._events.bind.apply(this, arguments);
            }
            removeEventListener() {
                return this._events.removeEventListener.apply(this, arguments);
            }
            off() {
                return this._events.off.apply(this, arguments);
            }
            unbind() {
                return this._events.unbind.apply(this, arguments);
            }
            dispatchEvent() {
                return this._events.dispatchEvent.apply(this, arguments);
            }
            trigger() {
                return this._events.trigger.apply(this, arguments);
            }
            listen() {
                return this._events.listen.apply(this, arguments);
            }
            ignore() {
                return this._events.ignore.apply(this, arguments);
            }
            constructor() {
                super(),
                    arguments[0] && Array.isArray(arguments[0])
                        ? arguments[0].length > 0 && this.push.apply(this, arguments[0])
                        : arguments.length > 0 && this.push.apply(this, arguments);
            }
            pop() {
                let a = super.pop.apply(this, arguments);
                return this.trigger(k.Types.remove, [a]), a;
            }
            shift() {
                let a = super.shift.apply(this, arguments);
                return this.trigger(k.Types.remove, [a]), a;
            }
            push() {
                let a = super.push.apply(this, arguments);
                return this.trigger(k.Types.insert, arguments), a;
            }
            unshift() {
                let a = super.unshift.apply(this, arguments);
                return this.trigger(k.Types.insert, arguments), a;
            }
            splice() {
                let a = super.splice.apply(this, arguments);
                if ((this.trigger(k.Types.remove, a), arguments.length > 2)) {
                    let b = this.slice(arguments[0], arguments[0] + arguments.length - 2);
                    this.trigger(k.Types.insert, b), this.trigger(k.Types.order);
                }
                return a;
            }
            sort() {
                return super.sort.apply(this, arguments), this.trigger(k.Types.order), this;
            }
            reverse() {
                return super.reverse.apply(this, arguments), this.trigger(k.Types.order), this;
            }
            indexOf() {
                return super.indexOf.apply(this, arguments);
            }
        },
        V = class extends U {
            ids = {};
            constructor(a) {
                (a = Array.isArray(a) ? a : Array.prototype.slice.call(arguments)),
                    super(a),
                    this.attach(a),
                    this.on(k.Types.insert, this.attach),
                    this.on(k.Types.remove, this.detach);
            }
            attach(c) {
                for (let b = 0; b < c.length; b++) {
                    let a = c[b];
                    a && a.id && (this.ids[a.id] = a);
                }
                return this;
            }
            detach(b) {
                for (let a = 0; a < b.length; a++) delete this.ids[b[a].id];
                return this;
            }
        },
        bg = Math.min,
        bh = Math.max,
        W = class extends T {
            _flagAdditions = !1;
            _flagSubtractions = !1;
            _flagOrder = !1;
            _flagOpacity = !0;
            _flagBeginning = !1;
            _flagEnding = !1;
            _flagLength = !1;
            _flagMask = !1;
            _fill = "#fff";
            _stroke = "#000";
            _linewidth = 1;
            _opacity = 1;
            _visible = !0;
            _cap = "round";
            _join = "round";
            _miter = 4;
            _closed = !0;
            _curved = !1;
            _automatic = !0;
            _beginning = 0;
            _ending = 1;
            _length = 0;
            _mask = null;
            constructor(a) {
                for (let b in (super(), bi)) Object.defineProperty(this, b, bi[b]);
                (this._renderer.type = "group"),
                    (this.additions = []),
                    (this.subtractions = []),
                    (this.children = Array.isArray(a) ? a : Array.prototype.slice.call(arguments));
            }
            static InsertChildren(b) {
                for (let a = 0; a < b.length; a++) bj.call(this, b[a], this);
            }
            static RemoveChildren(b) {
                for (let a = 0; a < b.length; a++) bj.call(this, b[a]);
            }
            static OrderChildren(a) {
                this._flagOrder = !0;
            }
            clone(b) {
                let a = new W(),
                    c = this.children.map(function (a) {
                        return a.clone();
                    });
                return (
                    a.add(c),
                    (a.opacity = this.opacity),
                    this.mask && (a.mask = this.mask),
                    a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.className = this.className),
                    this.matrix.manual && a.matrix.copy(this.matrix),
                    b && b.add(a),
                    a._update()
                );
            }
            toObject() {
                let a = {
                    children: [],
                    translation: this.translation.toObject(),
                    rotation: this.rotation,
                    scale: this.scale instanceof e ? this.scale.toObject() : this.scale,
                    opacity: this.opacity,
                    className: this.className,
                    mask: this.mask ? this.mask.toObject() : null,
                };
                return (
                    this.matrix.manual && (a.matrix = this.matrix.toObject()),
                    z.each(
                        this.children,
                        function (b, c) {
                            a.children[c] = b.toObject();
                        },
                        this
                    ),
                    a
                );
            }
            corner() {
                let a = this.getBoundingClientRect(!0);
                for (let b = 0; b < this.children.length; b++) {
                    let c = this.children[b];
                    (c.translation.x -= a.left), (c.translation.y -= a.top);
                }
                return this.mask && ((this.mask.translation.x -= a.left), (this.mask.translation.y -= a.top)), this;
            }
            center() {
                let a = this.getBoundingClientRect(!0),
                    d = a.left + a.width / 2 - this.translation.x,
                    e = a.top + a.height / 2 - this.translation.y;
                for (let b = 0; b < this.children.length; b++) {
                    let c = this.children[b];
                    c.isShape && ((c.translation.x -= d), (c.translation.y -= e));
                }
                return this.mask && ((this.mask.translation.x -= d), (this.mask.translation.y -= e)), this;
            }
            getById(b) {
                let c = null;
                function a(d) {
                    if (d.id === b) return d;
                    if (d.children) {
                        for (let e = 0; e < d.children.length; e++) if ((c = a(d.children[e]))) return c;
                    }
                    return null;
                }
                return a(this);
            }
            getByClassName(b) {
                let c = [];
                function a(d) {
                    if ((Array.prototype.indexOf.call(d.classList, b) >= 0 && c.push(d), d.children))
                        for (let e = 0; e < d.children.length; e++) a(d.children[e]);
                    return c;
                }
                return a(this);
            }
            getByType(b) {
                let c = [];
                function a(d) {
                    if ((d instanceof b && c.push(d), d.children))
                        for (let e = 0; e < d.children.length; e++) a(d.children[e]);
                    return c;
                }
                return a(this);
            }
            add(a) {
                a = a instanceof Array ? a.slice() : Array.prototype.slice.call(arguments);
                for (let c = 0; c < a.length; c++) {
                    let b = a[c];
                    if (!(b && b.id)) continue;
                    let d = Array.prototype.indexOf.call(this.children, b);
                    d >= 0 && this.children.splice(d, 1), this.children.push(b);
                }
                return this;
            }
            remove(a) {
                let f = arguments.length,
                    d = this.parent;
                if (f <= 0 && d) return d.remove(this), this;
                a = a instanceof Array ? a.slice() : Array.prototype.slice.call(arguments);
                for (let b = 0; b < a.length; b++) {
                    let c = a[b];
                    if (!c || !this.children.ids[c.id]) continue;
                    let e = this.children.indexOf(c);
                    e >= 0 && this.children.splice(e, 1);
                }
                return this;
            }
            getBoundingClientRect(j) {
                let a, e, f, g, h, i, m, n, o, p;
                this._update(!0);
                let _ = 1 / 0,
                    b = -1 / 0,
                    c = 1 / 0,
                    d = -1 / 0,
                    q = /texture|gradient/i;
                e = j ? this._matrix : aM(this);
                for (let k = 0; k < this.children.length; k++) {
                    let l = this.children[k];
                    !l.visible ||
                        q.test(l._renderer.type) ||
                        ((m =
                            "number" != typeof (a = l.getBoundingClientRect(j)).top ||
                            z.isNaN(a.top) ||
                            !isFinite(a.top)),
                        (n = "number" != typeof a.left || z.isNaN(a.left) || !isFinite(a.left)),
                        (o = "number" != typeof a.right || z.isNaN(a.right) || !isFinite(a.right)),
                        (p = "number" != typeof a.bottom || z.isNaN(a.bottom) || !isFinite(a.bottom)),
                        m ||
                            n ||
                            o ||
                            p ||
                            ((c = bg(a.top, c)), (_ = bg(a.left, _)), (b = bh(a.right, b)), (d = bh(a.bottom, d))));
                }
                return (
                    j &&
                        ((f = e.multiply(_, c, 1)),
                        (g = e.multiply(_, d, 1)),
                        (h = e.multiply(b, c, 1)),
                        (i = e.multiply(b, d, 1)),
                        (c = bg(f.y, g.y, h.y, i.y)),
                        (_ = bg(f.x, g.x, h.x, i.x)),
                        (b = bh(f.x, g.x, h.x, i.x)),
                        (d = bh(f.y, g.y, h.y, i.y))),
                    { top: c, left: _, right: b, bottom: d, width: b - _, height: d - c }
                );
            }
            noFill() {
                return (
                    this.children.forEach(function (a) {
                        a.noFill();
                    }),
                    this
                );
            }
            noStroke() {
                return (
                    this.children.forEach(function (a) {
                        a.noStroke();
                    }),
                    this
                );
            }
            subdivide() {
                let a = arguments;
                return (
                    this.children.forEach(function (b) {
                        b.subdivide.apply(b, a);
                    }),
                    this
                );
            }
            _update() {
                let d, c, a;
                if (this._flagBeginning || this._flagEnding) {
                    let h = Math.min(this._beginning, this._ending),
                        i = Math.max(this._beginning, this._ending),
                        g = this.length,
                        b = 0,
                        e = h * g,
                        f = i * g;
                    for (d = 0; d < this.children.length; d++)
                        e > b + (c = (a = this.children[d]).length)
                            ? ((a.beginning = 1), (a.ending = 1))
                            : f < b
                            ? ((a.beginning = 0), (a.ending = 0))
                            : e > b && e < b + c
                            ? ((a.beginning = (e - b) / c), (a.ending = 1))
                            : f > b && f < b + c
                            ? ((a.beginning = 0), (a.ending = (f - b) / c))
                            : ((a.beginning = 0), (a.ending = 1)),
                            (b += c);
                }
                return super._update.apply(this, arguments);
            }
            flagReset() {
                return (
                    this._flagAdditions && ((this.additions.length = 0), (this._flagAdditions = !1)),
                    this._flagSubtractions && ((this.subtractions.length = 0), (this._flagSubtractions = !1)),
                    (this._flagOrder =
                        this._flagMask =
                        this._flagOpacity =
                        this._flagBeginning =
                        this._flagEnding =
                            !1),
                    super.flagReset.call(this),
                    this
                );
            }
        },
        l = W;
    a(l, "Children", V),
        a(l, "Properties", ["fill", "stroke", "linewidth", "cap", "join", "miter", "closed", "curved", "automatic"]);
    var bi = {
        visible: {
            enumerable: !0,
            get: function () {
                return this._visible;
            },
            set: function (a) {
                (this._flagVisible = this._visible !== a || this._flagVisible), (this._visible = a);
            },
        },
        opacity: {
            enumerable: !0,
            get: function () {
                return this._opacity;
            },
            set: function (a) {
                (this._flagOpacity = this._opacity !== a || this._flagOpacity), (this._opacity = a);
            },
        },
        beginning: {
            enumerable: !0,
            get: function () {
                return this._beginning;
            },
            set: function (a) {
                (this._flagBeginning = this._beginning !== a || this._flagBeginning), (this._beginning = a);
            },
        },
        ending: {
            enumerable: !0,
            get: function () {
                return this._ending;
            },
            set: function (a) {
                (this._flagEnding = this._ending !== a || this._flagEnding), (this._ending = a);
            },
        },
        length: {
            enumerable: !0,
            get: function () {
                if (this._flagLength || this._length <= 0) {
                    if (((this._length = 0), !this.children)) return this._length;
                    for (let a = 0; a < this.children.length; a++) {
                        let b = this.children[a];
                        this._length += b.length;
                    }
                }
                return this._length;
            },
        },
        fill: {
            enumerable: !0,
            get: function () {
                return this._fill;
            },
            set: function (b) {
                this._fill = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].fill = b;
            },
        },
        stroke: {
            enumerable: !0,
            get: function () {
                return this._stroke;
            },
            set: function (b) {
                this._stroke = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].stroke = b;
            },
        },
        linewidth: {
            enumerable: !0,
            get: function () {
                return this._linewidth;
            },
            set: function (b) {
                this._linewidth = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].linewidth = b;
            },
        },
        join: {
            enumerable: !0,
            get: function () {
                return this._join;
            },
            set: function (b) {
                this._join = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].join = b;
            },
        },
        miter: {
            enumerable: !0,
            get: function () {
                return this._miter;
            },
            set: function (b) {
                this._miter = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].miter = b;
            },
        },
        cap: {
            enumerable: !0,
            get: function () {
                return this._cap;
            },
            set: function (b) {
                this._cap = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].cap = b;
            },
        },
        closed: {
            enumerable: !0,
            get: function () {
                return this._closed;
            },
            set: function (b) {
                this._closed = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].closed = b;
            },
        },
        curved: {
            enumerable: !0,
            get: function () {
                return this._curved;
            },
            set: function (b) {
                this._curved = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].curved = b;
            },
        },
        automatic: {
            enumerable: !0,
            get: function () {
                return this._automatic;
            },
            set: function (b) {
                this._automatic = b;
                for (let a = 0; a < this.children.length; a++) this.children[a].automatic = b;
            },
        },
        children: {
            enumerable: !0,
            get: function () {
                return this._children;
            },
            set: function (a) {
                let b = l.InsertChildren.bind(this),
                    c = l.RemoveChildren.bind(this),
                    d = l.OrderChildren.bind(this);
                this._children && (this._children.unbind(), this._children.length > 0 && c(this._children)),
                    (this._children = new V(a)),
                    this._children.bind(k.Types.insert, b),
                    this._children.bind(k.Types.remove, c),
                    this._children.bind(k.Types.order, d),
                    a.length > 0 && b(a);
            },
        },
        mask: {
            enumerable: !0,
            get: function () {
                return this._mask;
            },
            set: function (a) {
                (this._mask = a), (this._flagMask = !0), z.isObject(a) && !a.clip && (a.clip = !0);
            },
        },
    };
    function bj(c, a) {
        let b = c.parent,
            d;
        if (
            b === a ||
            (b &&
                b.children.ids[c.id] &&
                ((d = Array.prototype.indexOf.call(b.children, c)), b.children.splice(d, 1), e()),
            a)
        ) {
            a.subtractions.length > 0 &&
                (d = Array.prototype.indexOf.call(a.subtractions, c)) >= 0 &&
                a.subtractions.splice(d, 1),
                a.additions.length > 0 &&
                    (d = Array.prototype.indexOf.call(a.additions, c)) >= 0 &&
                    a.additions.splice(d, 1),
                (c.parent = a),
                a.additions.push(c),
                (a._flagAdditions = !0);
            return;
        }
        function e() {
            (d = Array.prototype.indexOf.call(b.additions, c)) >= 0 && b.additions.splice(d, 1),
                (d = Array.prototype.indexOf.call(b.subtractions, c)) < 0 &&
                    (b.subtractions.push(c), (b._flagSubtractions = !0));
        }
        e(),
            b._flagAdditions && 0 === b.additions.length && (b._flagAdditions = !1),
            b._flagSubtractions && 0 === b.subtractions.length && (b._flagSubtractions = !1),
            delete c.parent;
    }
    var bk = new f(),
        bl = [],
        bm = Math.max,
        bn = Math.min,
        bo = Math.abs,
        bp = Math.sin,
        bq = Math.cos,
        br = Math.acos,
        bs = Math.sqrt,
        X = {
            isHidden: /(undefined|none|transparent)/i,
            alignments: { left: "start", middle: "center", right: "end" },
            shim: function (a, b) {
                return (
                    (a.tagName = a.nodeName = b || "canvas"),
                    (a.nodeType = 1),
                    (a.getAttribute = function (a) {
                        return this[a];
                    }),
                    (a.setAttribute = function (a, b) {
                        return (this[a] = b), this;
                    }),
                    a
                );
            },
            group: {
                renderChild: function (a) {
                    X[a._renderer.type].render.call(a, this.ctx, !0, this.clip);
                },
                render: function (b) {
                    if (!this._visible) return this;
                    this._update();
                    let a = this._matrix.elements,
                        d = this.parent;
                    this._renderer.opacity = this._opacity * (d && d._renderer ? d._renderer.opacity : 1);
                    let c = this._mask,
                        f = bv(a),
                        g = !f || !!c;
                    if (
                        (this._renderer.context || (this._renderer.context = {}),
                        (this._renderer.context.ctx = b),
                        g && (b.save(), f || b.transform(a[0], a[3], a[1], a[4], a[2], a[5])),
                        c && X[c._renderer.type].render.call(c, b, !0),
                        this._opacity > 0 && 0 !== this._scale)
                    )
                        for (let e = 0; e < this.children.length; e++) {
                            let h = this.children[e];
                            X[h._renderer.type].render.call(h, b);
                        }
                    return g && b.restore(), this.flagReset();
                },
            },
            path: {
                render: function (a, T, G) {
                    let f,
                        c,
                        u,
                        d,
                        v,
                        H,
                        B,
                        C,
                        D,
                        _,
                        w,
                        x,
                        I,
                        E,
                        g,
                        b,
                        h,
                        J,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r,
                        s,
                        t,
                        j,
                        k,
                        y,
                        z,
                        F,
                        A,
                        l,
                        K;
                    if (
                        ((K = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1),
                        (y = this._mask),
                        (z = this._clip),
                        (v = this._opacity * (K || 1)),
                        (H = this._visible),
                        !T && (!H || z || 0 === v))
                    )
                        return this;
                    this._update(),
                        (f = this._matrix.elements),
                        (c = this._stroke),
                        (u = this._linewidth),
                        (d = this._fill),
                        (B = this._cap),
                        (C = this._join),
                        (D = this._miter),
                        (_ = this._closed),
                        (I = (x = (w = this._renderer.vertices).length) - 1),
                        (F = bv(f)),
                        (l = this.dashes),
                        F || (a.save(), a.transform(f[0], f[3], f[1], f[4], f[2], f[5])),
                        y && X[y._renderer.type].render.call(y, a, !0),
                        d &&
                            ("string" == typeof d
                                ? (a.fillStyle = d)
                                : (X[d._renderer.type].render.call(d, a, this), (a.fillStyle = d._renderer.effect))),
                        c &&
                            ("string" == typeof c
                                ? (a.strokeStyle = c)
                                : (X[c._renderer.type].render.call(c, a, this), (a.strokeStyle = c._renderer.effect)),
                            u && (a.lineWidth = u),
                            D && (a.miterLimit = D),
                            C && (a.lineJoin = C),
                            !_ && B && (a.lineCap = B)),
                        "number" == typeof v && (a.globalAlpha = v),
                        l && l.length > 0 && ((a.lineDashOffset = l.offset || 0), a.setLineDash(l)),
                        a.beginPath();
                    let L, M, N, P, Q, R, S;
                    for (let i = 0; i < x; i++)
                        switch (((j = (b = w[i]).x), (k = b.y), b.command)) {
                            case O.close:
                                a.closePath();
                                break;
                            case O.arc:
                                (L = b.rx),
                                    (M = b.ry),
                                    (N = b.xAxisRotation),
                                    (P = b.largeArcFlag),
                                    (Q = b.sweepFlag),
                                    (E = _ ? aQ(i - 1, x) : bm(i - 1, 0)),
                                    (g = w[E]),
                                    (R = g.x),
                                    (S = g.y),
                                    X.renderSvgArcCommand(a, R, S, L, M, P, Q, N, j, k);
                                break;
                            case O.curve:
                                (q =
                                    ((g = w[(E = _ ? aQ(i - 1, x) : Math.max(i - 1, 0))]).controls &&
                                        g.controls.right) ||
                                    e.zero),
                                    (r = (b.controls && b.controls.left) || e.zero),
                                    g._relative ? ((o = q.x + g.x), (p = q.y + g.y)) : ((o = q.x), (p = q.y)),
                                    b._relative ? ((m = r.x + b.x), (n = r.y + b.y)) : ((m = r.x), (n = r.y)),
                                    a.bezierCurveTo(o, p, m, n, j, k),
                                    i >= I &&
                                        _ &&
                                        ((h = J),
                                        (s = (b.controls && b.controls.right) || e.zero),
                                        (t = (h.controls && h.controls.left) || e.zero),
                                        b._relative ? ((o = s.x + b.x), (p = s.y + b.y)) : ((o = s.x), (p = s.y)),
                                        h._relative ? ((m = t.x + h.x), (n = t.y + h.y)) : ((m = t.x), (n = t.y)),
                                        (j = h.x),
                                        (k = h.y),
                                        a.bezierCurveTo(o, p, m, n, j, k));
                                break;
                            case O.line:
                                a.lineTo(j, k);
                                break;
                            case O.move:
                                (J = b), a.moveTo(j, k);
                        }
                    return (
                        _ && a.closePath(),
                        !z &&
                            !G &&
                            (X.isHidden.test(d) ||
                                ((A = d._renderer && d._renderer.offset) &&
                                    (a.save(),
                                    a.translate(-d._renderer.offset.x, -d._renderer.offset.y),
                                    a.scale(d._renderer.scale.x, d._renderer.scale.y)),
                                a.fill(),
                                A && a.restore()),
                            X.isHidden.test(c) ||
                                ((A = c._renderer && c._renderer.offset) &&
                                    (a.save(),
                                    a.translate(-c._renderer.offset.x, -c._renderer.offset.y),
                                    a.scale(c._renderer.scale.x, c._renderer.scale.y),
                                    (a.lineWidth = u / c._renderer.scale.x)),
                                a.stroke(),
                                A && a.restore())),
                        F || a.restore(),
                        z && !G && a.clip(),
                        l && l.length > 0 && a.setLineDash(bl),
                        this.flagReset()
                    );
                },
            },
            points: {
                render: function (a, t, u) {
                    let e, b, g, c, h, o, p, q, r, _, j, k, l, i, f, s;
                    if (
                        ((s = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1),
                        (h = this._opacity * (s || 1)),
                        (o = this._visible),
                        !t && (!o || 0 === h))
                    )
                        return this;
                    this._update(),
                        (e = this._matrix.elements),
                        (b = this._stroke),
                        (g = this._linewidth),
                        (c = this._fill),
                        (r = (q = this._renderer.collection).length),
                        (l = bv(e)),
                        (f = this.dashes),
                        (p = this._size),
                        l || (a.save(), a.transform(e[0], e[3], e[1], e[4], e[2], e[5])),
                        c &&
                            ("string" == typeof c
                                ? (a.fillStyle = c)
                                : (X[c._renderer.type].render.call(c, a, this), (a.fillStyle = c._renderer.effect))),
                        b &&
                            ("string" == typeof b
                                ? (a.strokeStyle = b)
                                : (X[b._renderer.type].render.call(b, a, this), (a.strokeStyle = b._renderer.effect)),
                            g && (a.lineWidth = g)),
                        "number" == typeof h && (a.globalAlpha = h),
                        f && f.length > 0 && ((a.lineDashOffset = f.offset || 0), a.setLineDash(f)),
                        a.beginPath();
                    let m = 0.5 * p,
                        d;
                    this._sizeAttenuation ||
                        (aM(this, bk),
                        (d = aL((d = bk.elements)[0], d[3], d[1], d[4], d[2], d[5])),
                        (m /= Math.max(d.scaleX, d.scaleY)));
                    for (let n = 0; n < r; n++)
                        (j = (_ = q[n]).x), (k = _.y), a.moveTo(j + m, k), a.arc(j, k, m, 0, aK);
                    return (
                        u ||
                            (X.isHidden.test(c) ||
                                ((i = c._renderer && c._renderer.offset) &&
                                    (a.save(),
                                    a.translate(-c._renderer.offset.x, -c._renderer.offset.y),
                                    a.scale(c._renderer.scale.x, c._renderer.scale.y)),
                                a.fill(),
                                i && a.restore()),
                            X.isHidden.test(b) ||
                                ((i = b._renderer && b._renderer.offset) &&
                                    (a.save(),
                                    a.translate(-b._renderer.offset.x, -b._renderer.offset.y),
                                    a.scale(b._renderer.scale.x, b._renderer.scale.y),
                                    (a.lineWidth = g / b._renderer.scale.x)),
                                a.stroke(),
                                i && a.restore())),
                        l || a.restore(),
                        f && f.length > 0 && a.setLineDash(bl),
                        this.flagReset()
                    );
                },
            },
            text: {
                render: function (a, A, v) {
                    let B = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1,
                        r = this._opacity * B,
                        C = this._visible,
                        s = this._mask,
                        t = this._clip;
                    if (!A && (!C || t || 0 === r)) return this;
                    this._update();
                    let d = this._matrix.elements,
                        b = this._stroke,
                        u = this._linewidth,
                        c = this._fill,
                        _ = this._decoration,
                        w = bv(d),
                        D = c._renderer && c._renderer.offset && b._renderer && b._renderer.offset,
                        e = this.dashes,
                        x = X.alignments[this._alignment] || this._alignment,
                        y = this._baseline,
                        j,
                        k,
                        l,
                        m,
                        z,
                        n,
                        o,
                        p,
                        g,
                        q,
                        h;
                    if (
                        (w || (a.save(), a.transform(d[0], d[3], d[1], d[4], d[2], d[5])),
                        s && X[s._renderer.type].render.call(s, a, !0),
                        D ||
                            (a.font = [
                                this._style,
                                this._weight,
                                this._size + "px/" + this._leading + "px",
                                this._family,
                            ].join(" ")),
                        (a.textAlign = x),
                        (a.textBaseline = y),
                        c &&
                            ("string" == typeof c
                                ? (a.fillStyle = c)
                                : (X[c._renderer.type].render.call(c, a, this), (a.fillStyle = c._renderer.effect))),
                        b &&
                            ("string" == typeof b
                                ? (a.strokeStyle = b)
                                : (X[b._renderer.type].render.call(b, a, this), (a.strokeStyle = b._renderer.effect)),
                            u && (a.lineWidth = u)),
                        "number" == typeof r && (a.globalAlpha = r),
                        e && e.length > 0 && ((a.lineDashOffset = e.offset || 0), a.setLineDash(e)),
                        t ||
                            v ||
                            (X.isHidden.test(c) ||
                                (c._renderer && c._renderer.offset
                                    ? ((n = c._renderer.scale.x),
                                      (o = c._renderer.scale.y),
                                      a.save(),
                                      a.translate(-c._renderer.offset.x, -c._renderer.offset.y),
                                      a.scale(n, o),
                                      (j = this._size / c._renderer.scale.y),
                                      (k = this._leading / c._renderer.scale.y),
                                      (a.font = [this._style, this._weight, j + "px/", k + "px", this._family].join(
                                          " "
                                      )),
                                      (l = c._renderer.offset.x / c._renderer.scale.x),
                                      (m = c._renderer.offset.y / c._renderer.scale.y),
                                      a.fillText(this.value, l, m),
                                      a.restore())
                                    : a.fillText(this.value, 0, 0)),
                            X.isHidden.test(b) ||
                                (b._renderer && b._renderer.offset
                                    ? ((n = b._renderer.scale.x),
                                      (o = b._renderer.scale.y),
                                      a.save(),
                                      a.translate(-b._renderer.offset.x, -b._renderer.offset.y),
                                      a.scale(n, o),
                                      (j = this._size / b._renderer.scale.y),
                                      (k = this._leading / b._renderer.scale.y),
                                      (a.font = [this._style, this._weight, j + "px/", k + "px", this._family].join(
                                          " "
                                      )),
                                      (l = b._renderer.offset.x / b._renderer.scale.x),
                                      (m = b._renderer.offset.y / b._renderer.scale.y),
                                      (z = u / b._renderer.scale.x),
                                      (a.lineWidth = z),
                                      a.strokeText(this.value, l, m),
                                      a.restore())
                                    : a.strokeText(this.value, 0, 0))),
                        /(underline|strikethrough)/i.test(_))
                    ) {
                        let f = a.measureText(this.value),
                            i = 1;
                        switch (_) {
                            case "underline":
                                (g = f.actualBoundingBoxAscent), (h = f.actualBoundingBoxAscent);
                                break;
                            case "strikethrough":
                                (g = 0), (h = 0), (i = 0.5);
                        }
                        switch (y) {
                            case "top":
                                (g += this._size * i), (h += this._size * i);
                                break;
                            case "baseline":
                            case "bottom":
                                (g -= this._size * i), (h -= this._size * i);
                        }
                        switch (x) {
                            case "left":
                            case "start":
                                (p = 0), (q = f.width);
                                break;
                            case "right":
                            case "end":
                                (p = -f.width), (q = 0);
                                break;
                            default:
                                (p = -f.width / 2), (q = f.width / 2);
                        }
                        (a.lineWidth = Math.max(Math.floor(this._size / 15), 1)),
                            (a.strokeStyle = a.fillStyle),
                            a.beginPath(),
                            a.moveTo(p, g),
                            a.lineTo(q, h),
                            a.stroke();
                    }
                    return (
                        w || a.restore(), t && !v && a.clip(), e && e.length > 0 && a.setLineDash(bl), this.flagReset()
                    );
                },
            },
            "linear-gradient": {
                render: function (i, g) {
                    if (g) {
                        if (
                            (this._update(),
                            !this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits)
                        ) {
                            let a,
                                b = this.left._x,
                                c = this.left._y,
                                d = this.right._x,
                                e = this.right._y;
                            /objectBoundingBox/i.test(this._units) &&
                                ((b = (b - 0.5) * (a = g.getBoundingClientRect(!0)).width),
                                (c = (c - 0.5) * a.height),
                                (d = (d - 0.5) * a.width),
                                (e = (e - 0.5) * a.height)),
                                (this._renderer.effect = i.createLinearGradient(b, c, d, e));
                            for (let f = 0; f < this.stops.length; f++) {
                                let h = this.stops[f];
                                this._renderer.effect.addColorStop(h._offset, h._color);
                            }
                        }
                        return this.flagReset();
                    }
                },
            },
            "radial-gradient": {
                render: function (j, g) {
                    if (g) {
                        if (
                            (this._update(),
                            !this._renderer.effect ||
                                this._flagCenter ||
                                this._flagFocal ||
                                this._flagRadius ||
                                this._flagStops ||
                                this._flagUnits)
                        ) {
                            let a,
                                b = this.center._x,
                                c = this.center._y,
                                d = this.focal._x,
                                e = this.focal._y,
                                h = this._radius;
                            /objectBoundingBox/i.test(this._units) &&
                                ((b = b * (a = g.getBoundingClientRect(!0)).width * 0.5),
                                (c = c * a.height * 0.5),
                                (d = d * a.width * 0.5),
                                (e = e * a.height * 0.5),
                                (h *= 0.5 * Math.min(a.width, a.height))),
                                (this._renderer.effect = j.createRadialGradient(b, c, 0, d, e, h));
                            for (let f = 0; f < this.stops.length; f++) {
                                let i = this.stops[f];
                                this._renderer.effect.addColorStop(i._offset, i._color);
                            }
                        }
                        return this.flagReset();
                    }
                },
            },
            texture: {
                render: function (b) {
                    this._update();
                    let a = this.image;
                    return (
                        (!this._renderer.effect ||
                            ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) &&
                                this.loaded)) &&
                            (this._renderer.effect = b.createPattern(this.image, this._repeat)),
                        (this._flagOffset || this._flagLoaded || this._flagScale) &&
                            (this._renderer.offset instanceof e || (this._renderer.offset = new e()),
                            (this._renderer.offset.x = -this._offset.x),
                            (this._renderer.offset.y = -this._offset.y),
                            a &&
                                ((this._renderer.offset.x += a.width / 2),
                                (this._renderer.offset.y += a.height / 2),
                                this._scale instanceof e
                                    ? ((this._renderer.offset.x *= this._scale.x),
                                      (this._renderer.offset.y *= this._scale.y))
                                    : ((this._renderer.offset.x *= this._scale),
                                      (this._renderer.offset.y *= this._scale)))),
                        (this._flagScale || this._flagLoaded) &&
                            (this._renderer.scale instanceof e || (this._renderer.scale = new e()),
                            this._scale instanceof e
                                ? this._renderer.scale.copy(this._scale)
                                : this._renderer.scale.set(this._scale, this._scale)),
                        this.flagReset()
                    );
                },
            },
            renderSvgArcCommand: function (w, j, k, a, b, x, l, c, m, n) {
                (c = (c * Math.PI) / 180), (a = bo(a)), (b = bo(b));
                let o = (j - m) / 2,
                    p = (k - n) / 2,
                    _ = bq(c) * o + bp(c) * p,
                    d = -bp(c) * o + bq(c) * p,
                    q = _ * _,
                    r = d * d,
                    g = a * a,
                    h = b * b,
                    s = q / g + r / h;
                if (s > 1) {
                    let t = bs(s);
                    (a *= t), (b *= t), (g = a * a), (h = b * b);
                }
                let u = g * r + h * q,
                    i = bs(bm(0, (g * h - u) / u));
                x === l && (i = -i);
                let e = (i * a * d) / b,
                    f = (-i * b * _) / a,
                    y = bq(c) * e - bp(c) * f + (j + m) / 2,
                    z = bp(c) * e + bq(c) * f + (k + n) / 2,
                    v = bu(1, 0, (_ - e) / a, (d - f) / b),
                    A = bu((_ - e) / a, (d - f) / b, (-_ - e) / a, (-d - f) / b) % aK;
                bt(w, y, z, a, b, v, v + A, 0 === l, c);
            },
        },
        m = class extends k {
            constructor(a) {
                super();
                let b = !1 !== a.smoothing;
                (this.domElement = a.domElement || document.createElement("canvas")),
                    (this.ctx = this.domElement.getContext("2d")),
                    (this.overdraw = a.overdraw || !1),
                    "u" > typeof this.ctx.imageSmoothingEnabled && (this.ctx.imageSmoothingEnabled = b),
                    (this.scene = new l()),
                    (this.scene.parent = this);
            }
            setSize(a, b, c) {
                return (
                    (this.width = a),
                    (this.height = b),
                    (this.ratio = typeof c > "u" ? R(this.ctx) : c),
                    (this.domElement.width = a * this.ratio),
                    (this.domElement.height = b * this.ratio),
                    this.domElement.style && z.extend(this.domElement.style, { width: a + "px", height: b + "px" }),
                    this.trigger(k.Types.resize, a, b, c)
                );
            }
            render() {
                let a = 1 === this.ratio;
                return (
                    a || (this.ctx.save(), this.ctx.scale(this.ratio, this.ratio)),
                    this.overdraw || this.ctx.clearRect(0, 0, this.width, this.height),
                    X.group.render.call(this.scene, this.ctx),
                    a || this.ctx.restore(),
                    this
                );
            }
        };
    function bt(q, a, b, r, s, h, t, u, c) {
        let i = t - h,
            j = aW.Tolerance.epsilon,
            k = Math.abs(i) < j,
            _ = aQ(i, aK);
        _ < j && (_ = k ? 0 : aK), !0 !== u || k || (_ === aK ? (_ = -aK) : (_ -= aK));
        for (let e = 0; e < d.Resolution; e++) {
            let l = h + (e / (d.Resolution - 1)) * _,
                f = a + r * Math.cos(l),
                g = b + s * Math.sin(l);
            if (0 !== c) {
                let m = Math.cos(c),
                    n = Math.sin(c),
                    o = f - a,
                    p = g - b;
                (f = o * m - p * n + a), (g = o * n + p * m + b);
            }
            q.lineTo(f, g);
        }
    }
    function bu(a, b, c, d) {
        let f = a * c + b * d,
            g = bs(a * a + b * b) * bs(c * c + d * d),
            e = br(bm(-1, bn(1, f / g)));
        return a * d - b * c < 0 && (e = -e), e;
    }
    function bv(a) {
        return 1 == a[0] && 0 == a[3] && 0 == a[1] && 1 == a[4] && 0 == a[2] && 0 == a[5];
    }
    a(m, "Utils", X);
    var Y = {
            Image: null,
            isHeadless: !1,
            shim: function (a, b) {
                return m.Utils.shim(a), "u" > typeof b && (Y.Image = b), (Y.isHeadless = !0), a;
            },
        },
        A = {
            hasEventListeners: "function" == typeof c.addEventListener,
            bind: function (a, b, c, d) {
                return this.hasEventListeners ? a.addEventListener(b, c, !!d) : a.attachEvent("on" + b, c), A;
            },
            unbind: function (a, b, c, d) {
                return A.hasEventListeners ? a.removeEventListeners(b, c, !!d) : a.detachEvent("on" + b, c), A;
            },
            getRequestAnimationFrame: function () {
                let d = ["ms", "moz", "webkit", "o"],
                    e = 0,
                    a = c.requestAnimationFrame;
                if (!a) {
                    for (let b = 0; b < d.length; b++) a = c[d[b] + "RequestAnimationFrame"] || a;
                    a =
                        a ||
                        function (f, g) {
                            let a = new Date().getTime(),
                                b = Math.max(0, 16 - (a - e)),
                                d = c.setTimeout(function () {
                                    f(a + b);
                                }, b);
                            return (e = a + b), d;
                        };
                }
                return a;
            },
        },
        Z = c.document ? c.document.createElement("div") : {};
    (Z.id = "help-two-load"),
        Object.defineProperty(A, "temp", {
            enumerable: !0,
            get: function () {
                return (
                    z.isElement(Z) &&
                        !c.document.head.contains(Z) &&
                        ((Z.style.display = "none"), c.document.head.appendChild(Z)),
                    Z
                );
            },
        });
    var aa = class extends Error {
            name = "Two.js";
            message;
            constructor(a) {
                super(), (this.message = a);
            }
        },
        n = class {
            map = {};
            constructor() {}
            add(a, b) {
                return (this.map[a] = b), this;
            }
            remove(a) {
                return delete this.map[a], this;
            }
            get(a) {
                return this.map[a];
            }
            contains(a) {
                return a in this.map;
            }
        };
    function bw(a, b) {
        if (0 === b || 1 === b) return !0;
        let e = a._length * b,
            c = 0;
        for (let d = 0; d < a._lengths.length; d++) {
            let f = a._lengths[d];
            if (c >= e) return e - c >= 0;
            c += f;
        }
        return !1;
    }
    function bx(a, c) {
        let e = a._length;
        if (c <= 0) return 0;
        if (c >= e) return a._lengths.length - 1;
        for (let b = 0, d = 0; b < a._lengths.length; b++) {
            if (d + a._lengths[b] >= c) return Math.max(b - 1, 0) + (c -= d) / a._lengths[b];
            d += a._lengths[b];
        }
        return -1;
    }
    function ab(a, b, l) {
        let h,
            c,
            d,
            i,
            j,
            e,
            f,
            k,
            g = b.controls && b.controls.right,
            _ = a.controls && a.controls.left;
        return (
            (h = b.x),
            (j = b.y),
            (c = (g || b).x),
            (e = (g || b).y),
            (d = (_ || a).x),
            (f = (_ || a).y),
            (i = a.x),
            (k = a.y),
            g && b._relative && ((c += b.x), (e += b.y)),
            _ && a._relative && ((d += a.x), (f += a.y)),
            aZ(h, j, c, e, d, f, i, k, l)
        );
    }
    function by(a, b, l) {
        let h,
            c,
            d,
            i,
            j,
            e,
            f,
            k,
            g = b.controls && b.controls.right,
            _ = a.controls && a.controls.left;
        return (
            (h = b.x),
            (j = b.y),
            (c = (g || b).x),
            (e = (g || b).y),
            (d = (_ || a).x),
            (f = (_ || a).y),
            (i = a.x),
            (k = a.y),
            g && b._relative && ((c += b.x), (e += b.y)),
            _ && a._relative && ((d += a.x), (f += a.y)),
            aY(h, j, c, e, d, f, i, k, l)
        );
    }
    var ac = class extends a8 {
            _flagOffset = !0;
            _flagOpacity = !0;
            _flagColor = !0;
            _offset = 0;
            _opacity = 1;
            _color = "#fff";
            constructor(a, b, c) {
                for (let d in (super(), bz)) Object.defineProperty(this, d, bz[d]);
                (this._renderer.type = "stop"),
                    (this.offset = "number" == typeof a ? a : ac.Index <= 0 ? 0 : 1),
                    (this.opacity = "number" == typeof c ? c : 1),
                    (this.color = "string" == typeof b ? b : ac.Index <= 0 ? "#fff" : "#000"),
                    (ac.Index = (ac.Index + 1) % 2);
            }
            clone(a) {
                let b = new ac();
                return (
                    z.each(
                        ac.Properties,
                        function (a) {
                            b[a] = this[a];
                        },
                        this
                    ),
                    a && a.stops && a.stops.push(b),
                    b
                );
            }
            toObject() {
                let a = {};
                return (
                    z.each(
                        ac.Properties,
                        function (b) {
                            a[b] = this[b];
                        },
                        this
                    ),
                    a
                );
            }
            flagReset() {
                return (this._flagOffset = this._flagColor = this._flagOpacity = !1), super.flagReset.call(this), this;
            }
        },
        h = ac;
    a(h, "Index", 0), a(h, "Properties", ["offset", "opacity", "color"]);
    var bz = {
            offset: {
                enumerable: !0,
                get: function () {
                    return this._offset;
                },
                set: function (a) {
                    (this._offset = a), (this._flagOffset = !0), this.parent && (this.parent._flagStops = !0);
                },
            },
            opacity: {
                enumerable: !0,
                get: function () {
                    return this._opacity;
                },
                set: function (a) {
                    (this._opacity = a), (this._flagOpacity = !0), this.parent && (this.parent._flagStops = !0);
                },
            },
            color: {
                enumerable: !0,
                get: function () {
                    return this._color;
                },
                set: function (a) {
                    (this._color = a), (this._flagColor = !0), this.parent && (this.parent._flagStops = !0);
                },
            },
        },
        ad = class extends a8 {
            _flagStops = !1;
            _flagSpread = !1;
            _flagUnits = !1;
            _spread = "";
            _units = "";
            constructor(a) {
                for (let b in (super(), bA)) Object.defineProperty(this, b, bA[b]);
                (this._renderer.type = "gradient"),
                    (this.id = d.Identifier + d.uniqueId()),
                    (this.classList = []),
                    (this._renderer.flagStops = bB.bind(this)),
                    (this._renderer.bindStops = bC.bind(this)),
                    (this._renderer.unbindStops = bD.bind(this)),
                    (this.spread = "pad"),
                    (this.units = "objectBoundingBox"),
                    a && (this.stops = a);
            }
            clone(a) {
                let c = this.stops.map(function (a) {
                        return a.clone();
                    }),
                    b = new ad(c);
                return (
                    z.each(
                        ad.Properties,
                        function (a) {
                            b[a] = this[a];
                        },
                        this
                    ),
                    a && a.add(b),
                    b
                );
            }
            toObject() {
                let a = {
                    stops: this.stops.map(function (a) {
                        return a.toObject();
                    }),
                };
                return (
                    z.each(
                        ad.Properties,
                        function (b) {
                            a[b] = this[b];
                        },
                        this
                    ),
                    a
                );
            }
            _update() {
                return (this._flagSpread || this._flagStops) && this.trigger(k.Types.change), this;
            }
            flagReset() {
                return (this._flagSpread = this._flagUnits = this._flagStops = !1), super.flagReset.call(this), this;
            }
        },
        o = ad;
    a(o, "Stop", h), a(o, "Properties", ["spread", "stops", "renderer", "units"]);
    var bA = {
        spread: {
            enumerable: !0,
            get: function () {
                return this._spread;
            },
            set: function (a) {
                (this._spread = a), (this._flagSpread = !0);
            },
        },
        units: {
            enumerable: !0,
            get: function () {
                return this._units;
            },
            set: function (a) {
                (this._units = a), (this._flagUnits = !0);
            },
        },
        stops: {
            enumerable: !0,
            get: function () {
                return this._stops;
            },
            set: function (c) {
                let a = this._renderer.bindStops,
                    b = this._renderer.unbindStops;
                this._stops && this._stops.unbind(k.Types.insert, a).unbind(k.Types.remove, b),
                    (this._stops = new U((c || []).slice(0))),
                    this._stops.bind(k.Types.insert, a).bind(k.Types.remove, b),
                    a(this._stops);
            },
        },
    };
    function bB() {
        this._flagStops = !0;
    }
    function bC(a) {
        let b = a.length;
        for (; b--; ) a[b].bind(k.Types.change, this._renderer.flagStops), (a[b].parent = this);
        this._renderer.flagStops();
    }
    function bD(a) {
        let b = a.length;
        for (; b--; ) a[b].unbind(k.Types.change, this._renderer.flagStops), delete a[b].parent;
        this._renderer.flagStops();
    }
    var ae = class extends o {
            _flagEndPoints = !1;
            _left = null;
            _right = null;
            constructor(a, b, c, d, g) {
                for (let f in (super(g), bE)) Object.defineProperty(this, f, bE[f]);
                (this._renderer.type = "linear-gradient"),
                    (this._renderer.flagEndPoints = bF.bind(this)),
                    (this.left = new e()),
                    (this.right = new e()),
                    "number" == typeof a && (this.left.x = a),
                    "number" == typeof b && (this.left.y = b),
                    "number" == typeof c && (this.right.x = c),
                    "number" == typeof d && (this.right.y = d);
            }
            clone(a) {
                let c = this.stops.map(function (a) {
                        return a.clone();
                    }),
                    b = new ae(this.left._x, this.left._y, this.right._x, this.right._y, c);
                return (
                    z.each(
                        o.Properties,
                        function (a) {
                            b[a] = this[a];
                        },
                        this
                    ),
                    a && a.add(b),
                    b
                );
            }
            toObject() {
                let a = super.toObject.call(this);
                return (a.left = this.left.toObject()), (a.right = this.right.toObject()), a;
            }
            _update() {
                return (
                    (this._flagEndPoints || this._flagSpread || this._flagStops) && this.trigger(k.Types.change), this
                );
            }
            flagReset() {
                return (this._flagEndPoints = !1), super.flagReset.call(this), this;
            }
        },
        p = ae;
    a(p, "Properties", ["left", "right"]), a(p, "Stop", h);
    var bE = {
        left: {
            enumerable: !0,
            get: function () {
                return this._left;
            },
            set: function (a) {
                this._left instanceof e && this._left.unbind(k.Types.change, this._renderer.flagEndPoints),
                    (this._left = a),
                    this._left.bind(k.Types.change, this._renderer.flagEndPoints),
                    (this._flagEndPoints = !0);
            },
        },
        right: {
            enumerable: !0,
            get: function () {
                return this._right;
            },
            set: function (a) {
                this._right instanceof e && this._right.unbind(k.Types.change, this._renderer.flagEndPoints),
                    (this._right = a),
                    this._right.bind(k.Types.change, this._renderer.flagEndPoints),
                    (this._flagEndPoints = !0);
            },
        },
    };
    function bF() {
        this._flagEndPoints = !0;
    }
    var af = class extends o {
            _flagRadius = !1;
            _flagCenter = !1;
            _flagFocal = !1;
            _radius = 0;
            _center = null;
            _focal = null;
            constructor(a, b, c, h, d, f) {
                for (let g in (super(h), bG)) Object.defineProperty(this, g, bG[g]);
                (this._renderer.type = "radial-gradient"),
                    (this._renderer.flagCenter = bH.bind(this)),
                    (this._renderer.flagFocal = bI.bind(this)),
                    (this.center = new e()),
                    (this.radius = "number" == typeof c ? c : 1),
                    (this.focal = new e()),
                    "number" == typeof a && (this.center.x = a),
                    "number" == typeof b && (this.center.y = b),
                    this.focal.copy(this.center),
                    "number" == typeof d && (this.focal.x = d),
                    "number" == typeof f && (this.focal.y = f);
            }
            clone(a) {
                let c = this.stops.map(function (a) {
                        return a.clone();
                    }),
                    b = new af(this.center._x, this.center._y, this._radius, c, this.focal._x, this.focal._y);
                return (
                    z.each(
                        o.Properties.concat(af.Properties),
                        function (a) {
                            b[a] = this[a];
                        },
                        this
                    ),
                    a && a.add(b),
                    b
                );
            }
            toObject() {
                let a = super.toObject.call(this);
                return (
                    z.each(
                        af.Properties,
                        function (b) {
                            a[b] = this[b];
                        },
                        this
                    ),
                    (a.center = this.center.toObject()),
                    (a.focal = this.focal.toObject()),
                    a
                );
            }
            _update() {
                return (
                    (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) &&
                        this.trigger(k.Types.change),
                    this
                );
            }
            flagReset() {
                return (this._flagRadius = this._flagCenter = this._flagFocal = !1), super.flagReset.call(this), this;
            }
        },
        q = af;
    a(q, "Stop", h), a(q, "Properties", ["center", "radius", "focal"]);
    var bG = {
        radius: {
            enumerable: !0,
            get: function () {
                return this._radius;
            },
            set: function (a) {
                (this._radius = a), (this._flagRadius = !0);
            },
        },
        center: {
            enumerable: !0,
            get: function () {
                return this._center;
            },
            set: function (a) {
                this._center && this._center.unbind(k.Types.change, this._renderer.flagCenter),
                    (this._center = a),
                    this._center.bind(k.Types.change, this._renderer.flagCenter),
                    (this._flagCenter = !0);
            },
        },
        focal: {
            enumerable: !0,
            get: function () {
                return this._focal;
            },
            set: function (a) {
                this._focal && this._focal.unbind(k.Types.change, this._renderer.flagFocal),
                    (this._focal = a),
                    this._focal.bind(k.Types.change, this._renderer.flagFocal),
                    (this._flagFocal = !0);
            },
        },
    };
    function bH() {
        this._flagCenter = !0;
    }
    function bI() {
        this._flagFocal = !0;
    }
    var ag,
        ah = { video: /\.(mp4|webm|ogg)$/i, image: /\.(jpe?g|png|gif|tiff|webp)$/i, effect: /texture|gradient/i };
    c.document && (ag = document.createElement("a"));
    var ai = class extends a8 {
            _flagSrc = !1;
            _flagImage = !1;
            _flagVideo = !1;
            _flagLoaded = !1;
            _flagRepeat = !1;
            _flagOffset = !1;
            _flagScale = !1;
            _src = "";
            _image = null;
            _loaded = !1;
            _repeat = "no-repeat";
            _scale = 1;
            _offset = null;
            constructor(a, f) {
                for (let c in (super(), (this._renderer = {}), bJ)) Object.defineProperty(this, c, bJ[c]);
                if (
                    ((this._renderer.type = "texture"),
                    (this._renderer.flagOffset = bK.bind(this)),
                    (this._renderer.flagScale = bL.bind(this)),
                    (this.id = d.Identifier + d.uniqueId()),
                    (this.classList = []),
                    (this.loaded = !1),
                    (this.repeat = "no-repeat"),
                    (this.offset = new e()),
                    "function" == typeof f)
                ) {
                    let g = function () {
                        this.unbind(k.Types.load, g), "function" == typeof f && f();
                    }.bind(this);
                    this.bind(k.Types.load, g);
                }
                if ("string" == typeof a) this.src = a;
                else if ("object" == typeof a) {
                    let b = Object.prototype.toString.call(a);
                    ("[object HTMLImageElement]" === b ||
                        "[object HTMLCanvasElement]" === b ||
                        "[object HTMLVideoElement]" === b ||
                        "[object Image]" === b) &&
                        (this.image = a);
                }
                this._update();
            }
            static getAbsoluteURL(a) {
                return ag ? ((ag.href = a), ag.href) : a;
            }
            static loadHeadlessBuffer(a, b) {
                (a.image.onload = b), (a.image.src = a.src);
            }
            static getTag(a) {
                return (a && a.nodeName && a.nodeName.toLowerCase()) || "img";
            }
            static getImage(d) {
                let b = ai.getAbsoluteURL(d);
                if (ai.ImageRegistry.contains(b)) return ai.ImageRegistry.get(b);
                let a;
                return (
                    Y.Image
                        ? ((a = new Y.Image()), m.Utils.shim(a, "img"))
                        : c.document
                        ? (a = ah.video.test(b) ? document.createElement("video") : document.createElement("img"))
                        : console.warn("Two.js: no prototypical image defined for Two.Texture"),
                    (a.crossOrigin = "anonymous"),
                    a
                );
            }
            static load(a, d) {
                let b = a.image,
                    c = ai.getTag(b);
                a._flagImage &&
                    (/canvas/i.test(c)
                        ? ai.Register.canvas(a, d)
                        : ((a._src = (!Y.isHeadless && b.getAttribute("two-src")) || b.src), ai.Register[c](a, d))),
                    a._flagSrc &&
                        (b || ((b = ai.getImage(a.src)), (a.image = b)), (c = ai.getTag(b)), ai.Register[c](a, d));
            }
            clone() {
                let a = new ai(this.src);
                return (a.repeat = this.repeat), a.offset.copy(this.origin), (a.scale = this.scale), a;
            }
            toObject() {
                return {
                    src: this.src,
                    repeat: this.repeat,
                    origin: this.origin.toObject(),
                    scale: "number" == typeof this.scale ? this.scale : this.scale.toObject(),
                };
            }
            _update() {
                return (
                    (this._flagSrc || this._flagImage) &&
                        (this.trigger(k.Types.change),
                        (this._flagSrc || this._flagImage) &&
                            ((this.loaded = !1),
                            ai.load(
                                this,
                                function () {
                                    (this.loaded = !0), this.trigger(k.Types.change).trigger(k.Types.load);
                                }.bind(this)
                            ))),
                    this._image && this._image.readyState >= 4 && (this._flagVideo = !0),
                    this
                );
            }
            flagReset() {
                return (
                    (this._flagSrc =
                        this._flagImage =
                        this._flagLoaded =
                        this._flagRepeat =
                        this._flagVideo =
                        this._flagScale =
                        this._flagOffset =
                            !1),
                    super.flagReset.call(this),
                    this
                );
            }
        },
        i = ai;
    a(i, "Properties", ["src", "loaded", "repeat", "scale", "offset", "image"]),
        a(i, "RegularExpressions", ah),
        a(i, "ImageRegistry", new n()),
        a(i, "Register", {
            canvas: function (a, b) {
                (a._src = "#" + a.id), ai.ImageRegistry.add(a.src, a.image), "function" == typeof b && b();
            },
            img: function (b, e) {
                let a = b.image,
                    c = function (b) {
                        !Y.isHeadless &&
                            a.removeEventListener &&
                            "function" == typeof a.removeEventListener &&
                            (a.removeEventListener("load", c, !1), a.removeEventListener("error", d, !1)),
                            "function" == typeof e && e();
                    },
                    d = function (e) {
                        throw (
                            (Y.isHeadless ||
                                "function" != typeof a.removeEventListener ||
                                (a.removeEventListener("load", c, !1), a.removeEventListener("error", d, !1)),
                            new aa("unable to load " + b.src))
                        );
                    };
                "number" == typeof a.width && a.width > 0 && "number" == typeof a.height && a.height > 0
                    ? c()
                    : Y.isHeadless ||
                      "function" != typeof a.addEventListener ||
                      (a.addEventListener("load", c, !1), a.addEventListener("error", d, !1)),
                    (b._src = ai.getAbsoluteURL(b._src)),
                    (!Y.isHeadless && a && a.getAttribute("two-src")) ||
                        (Y.isHeadless || a.setAttribute("two-src", b.src),
                        ai.ImageRegistry.add(b.src, a),
                        Y.isHeadless ? ai.loadHeadlessBuffer(b, c) : (b.image.src = b.src));
            },
            video: function (a, d) {
                if (Y.isHeadless) throw new aa("video textures are not implemented in headless environments.");
                let b = function (e) {
                        a.image.removeEventListener("canplaythrough", b, !1),
                            a.image.removeEventListener("error", c, !1),
                            (a.image.width = a.image.videoWidth),
                            (a.image.height = a.image.videoHeight),
                            "function" == typeof d && d();
                    },
                    c = function (d) {
                        throw (
                            (a.image.removeEventListener("canplaythrough", b, !1),
                            a.image.removeEventListener("error", c, !1),
                            new aa("unable to load " + a.src))
                        );
                    };
                (a._src = ai.getAbsoluteURL(a._src)),
                    a.image.getAttribute("two-src") ||
                        (a.image.setAttribute("two-src", a.src), ai.ImageRegistry.add(a.src, a.image)),
                    a.image.readyState >= 4
                        ? b()
                        : (a.image.addEventListener("canplaythrough", b, !1),
                          a.image.addEventListener("error", c, !1),
                          (a.image.src = a.src),
                          a.image.load());
            },
        });
    var bJ = {
        src: {
            enumerable: !0,
            get: function () {
                return this._src;
            },
            set: function (a) {
                (this._src = a), (this._flagSrc = !0);
            },
        },
        loaded: {
            enumerable: !0,
            get: function () {
                return this._loaded;
            },
            set: function (a) {
                (this._loaded = a), (this._flagLoaded = !0);
            },
        },
        repeat: {
            enumerable: !0,
            get: function () {
                return this._repeat;
            },
            set: function (a) {
                (this._repeat = a), (this._flagRepeat = !0);
            },
        },
        image: {
            enumerable: !0,
            get: function () {
                return this._image;
            },
            set: function (a) {
                let b;
                (b = "canvas" === i.getTag(a) ? "#" + a.id : a.src),
                    i.ImageRegistry.contains(b) ? (this._image = i.ImageRegistry.get(a.src)) : (this._image = a),
                    (this._flagImage = !0);
            },
        },
        offset: {
            enumerable: !0,
            get: function () {
                return this._offset;
            },
            set: function (a) {
                this._offset && this._offset.unbind(k.Types.change, this._renderer.flagOffset),
                    (this._offset = a),
                    this._offset.bind(k.Types.change, this._renderer.flagOffset),
                    (this._flagOffset = !0);
            },
        },
        scale: {
            enumerable: !0,
            get: function () {
                return this._scale;
            },
            set: function (a) {
                this._scale instanceof e && this._scale.unbind(k.Types.change, this._renderer.flagScale),
                    (this._scale = a),
                    this._scale instanceof e && this._scale.bind(k.Types.change, this._renderer.flagScale),
                    (this._flagScale = !0);
            },
        },
    };
    function bK() {
        this._flagOffset = !0;
    }
    function bL() {
        this._flagScale = !0;
    }
    var bM = Math.min,
        bN = Math.max,
        bO = Math.ceil,
        bP = Math.floor,
        bQ = new e(),
        aj = class extends T {
            _flagVertices = !0;
            _flagLength = !0;
            _flagFill = !0;
            _flagStroke = !0;
            _flagLinewidth = !0;
            _flagOpacity = !0;
            _flagVisible = !0;
            _flagCap = !0;
            _flagJoin = !0;
            _flagMiter = !0;
            _flagMask = !1;
            _flagClip = !1;
            _length = 0;
            _fill = "#fff";
            _stroke = "#000";
            _linewidth = 1;
            _opacity = 1;
            _visible = !0;
            _cap = "round";
            _join = "round";
            _miter = 4;
            _closed = !0;
            _curved = !1;
            _automatic = !0;
            _beginning = 0;
            _ending = 1;
            _mask = null;
            _clip = !1;
            _dashes = null;
            constructor(b, c, d, e) {
                for (let a in (super(), bR)) Object.defineProperty(this, a, bR[a]);
                (this._renderer.type = "path"),
                    (this._renderer.flagVertices = bS.bind(this)),
                    (this._renderer.bindVertices = bT.bind(this)),
                    (this._renderer.unbindVertices = bU.bind(this)),
                    (this._renderer.flagFill = bV.bind(this)),
                    (this._renderer.flagStroke = bW.bind(this)),
                    (this._renderer.vertices = []),
                    (this._renderer.collection = []),
                    (this.closed = !!c),
                    (this.curved = !!d),
                    (this.beginning = 0),
                    (this.ending = 1),
                    (this.fill = "#fff"),
                    (this.stroke = "#000"),
                    (this.linewidth = 1),
                    (this.opacity = 1),
                    (this.className = ""),
                    (this.visible = !0),
                    (this.cap = "butt"),
                    (this.join = "miter"),
                    (this.miter = 4),
                    (this.vertices = b),
                    (this.automatic = !e),
                    (this.dashes = []),
                    (this.dashes.offset = 0);
            }
            clone(d) {
                let a = new aj();
                for (let b = 0; b < this.vertices.length; b++) a.vertices.push(this.vertices[b].clone());
                for (let c = 0; c < aj.Properties.length; c++) {
                    let e = aj.Properties[c];
                    a[e] = this[e];
                }
                return (
                    (a.className = this.className),
                    a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix),
                    d && d.add(a),
                    a._update()
                );
            }
            toObject() {
                let a = {
                    vertices: this.vertices.map(function (a) {
                        return a.toObject();
                    }),
                };
                return (
                    z.each(
                        aj.Properties,
                        function (b) {
                            "u" > typeof this[b] && (this[b].toObject ? (a[b] = this[b].toObject()) : (a[b] = this[b]));
                        },
                        this
                    ),
                    (a.className = this.className),
                    (a.translation = this.translation.toObject()),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale instanceof e ? this.scale.toObject() : this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && (a.matrix = this.matrix.toObject()),
                    a
                );
            }
            noFill() {
                return (this.fill = "transparent"), this;
            }
            noStroke() {
                return (this.stroke = void 0), this;
            }
            corner() {
                let a = this.getBoundingClientRect(!0),
                    d = a.width / 2,
                    e = a.height / 2,
                    f = a.left + a.width / 2,
                    g = a.top + a.height / 2;
                for (let c = 0; c < this.vertices.length; c++) {
                    let b = this.vertices[c];
                    (b.x -= f), (b.y -= g), (b.x += d), (b.y += e);
                }
                return (
                    this.mask &&
                        ((this.mask.translation.x -= f),
                        (this.mask.translation.x += d),
                        (this.mask.translation.y -= g),
                        (this.mask.translation.y += e)),
                    this
                );
            }
            center() {
                let a = this.getBoundingClientRect(!0),
                    c = a.left + a.width / 2 - this.translation.x,
                    d = a.top + a.height / 2 - this.translation.y;
                for (let b = 0; b < this.vertices.length; b++) {
                    let e = this.vertices[b];
                    (e.x -= c), (e.y -= d);
                }
                return this.mask && ((this.mask.translation.x -= c), (this.mask.translation.y -= d)), this;
            }
            getBoundingClientRect(s) {
                let i,
                    a,
                    m,
                    h,
                    c,
                    b,
                    o,
                    p,
                    q,
                    r,
                    _,
                    j,
                    k,
                    l,
                    d = 1 / 0,
                    e = -1 / 0,
                    f = 1 / 0,
                    g = -1 / 0;
                if (
                    (this._update(!0),
                    (i = s ? this._matrix : aM(this)),
                    (a = (this.linewidth || 0) / 2),
                    (m = this._renderer.vertices.length) <= 0)
                )
                    return { width: 0, height: 0 };
                for (h = 0; h < m; h++)
                    if (
                        ((b = this._renderer.vertices[h]),
                        (c = this._renderer.vertices[(h + m - 1) % m]).controls && b.controls)
                    ) {
                        (o = c.controls.right.x),
                            (p = c.controls.right.y),
                            c.relative && ((o += c.x), (p += c.y)),
                            (q = b.controls.left.x),
                            (r = b.controls.left.y),
                            b.relative && ((q += b.x), (r += b.y));
                        let n = a$(c.x, c.y, o, p, q, r, b.x, b.y);
                        (f = bM(n.min.y - a, f)),
                            (d = bM(n.min.x - a, d)),
                            (e = bN(n.max.x + a, e)),
                            (g = bN(n.max.y + a, g));
                    } else
                        h <= 1 &&
                            ((f = bM(c.y - a, f)), (d = bM(c.x - a, d)), (e = bN(c.x + a, e)), (g = bN(c.y + a, g))),
                            (f = bM(b.y - a, f)),
                            (d = bM(b.x - a, d)),
                            (e = bN(b.x + a, e)),
                            (g = bN(b.y + a, g));
                return (
                    (_ = i.multiply(d, f, 1)),
                    (j = i.multiply(d, g, 1)),
                    (k = i.multiply(e, f, 1)),
                    (l = i.multiply(e, g, 1)),
                    (f = bM(_.y, j.y, k.y, l.y)),
                    (d = bM(_.x, j.x, k.x, l.x)),
                    (e = bN(_.x, j.x, k.x, l.x)),
                    (g = bN(_.y, j.y, k.y, l.y)),
                    { top: f, left: d, right: e, bottom: g, width: e - d, height: g - f }
                );
            }
            getPointAt(a, b) {
                let m,
                    h,
                    v,
                    f,
                    p,
                    i,
                    j,
                    q,
                    g,
                    _,
                    k,
                    l,
                    r,
                    n,
                    o,
                    s = this.length * Math.min(Math.max(a, 0), 1),
                    t = this.vertices.length,
                    D = t - 1,
                    c = null,
                    d = null;
                for (let e = 0, E = this._lengths.length, u = 0; e < E; e++) {
                    if (u + this._lengths[e] >= s) {
                        this._closed
                            ? ((m = aQ(e, t)), (h = aQ(e - 1, t)), 0 === e && ((m = h), (h = e)))
                            : ((m = e), (h = Math.min(Math.max(e - 1, 0), D))),
                            (c = this.vertices[m]),
                            (d = this.vertices[h]),
                            (s -= u),
                            (a = 0 !== this._lengths[e] ? s / this._lengths[e] : 0);
                        break;
                    }
                    u += this._lengths[e];
                }
                if (null === c || null === d) return null;
                if (!c) return d;
                if (!d) return c;
                (o = d.controls && d.controls.right),
                    (n = c.controls && c.controls.left),
                    (p = d.x),
                    (_ = d.y),
                    (i = (o || d).x),
                    (k = (o || d).y),
                    (j = (n || c).x),
                    (l = (n || c).y),
                    (q = c.x),
                    (r = c.y),
                    o && d.relative && ((i += d.x), (k += d.y)),
                    n && c.relative && ((j += c.x), (l += c.y)),
                    (f = aX(a, p, i, j, q)),
                    (g = aX(a, _, k, l, r));
                let F = aN(p, i, a),
                    G = aN(_, k, a),
                    w = aN(i, j, a),
                    x = aN(k, l, a),
                    H = aN(j, q, a),
                    I = aN(l, r, a),
                    y = aN(F, w, a),
                    A = aN(G, x, a),
                    B = aN(w, H, a),
                    C = aN(x, I, a);
                return z.isObject(b)
                    ? ((b.x = f),
                      (b.y = g),
                      b instanceof Q &&
                          ((b.controls.left.x = y),
                          (b.controls.left.y = A),
                          (b.controls.right.x = B),
                          (b.controls.right.y = C),
                          ("boolean" != typeof b.relative || b.relative) &&
                              ((b.controls.left.x -= f),
                              (b.controls.left.y -= g),
                              (b.controls.right.x -= f),
                              (b.controls.right.y -= g))),
                      (b.t = a),
                      b)
                    : (((v = new Q(f, g, y - f, A - g, B - f, C - g, this._curved ? O.curve : O.line)).t = a), v);
            }
            plot() {
                if (this.curved) return a0(this._collection, this.closed), this;
                for (let a = 0; a < this._collection.length; a++)
                    this._collection[a].command = 0 === a ? O.move : O.line;
                return this;
            }
            subdivide(c) {
                this._update();
                let a = this.vertices.length - 1,
                    d = this._closed || this.vertices[a]._command === O.close,
                    e = this.vertices[a],
                    b = [],
                    f;
                return (
                    z.each(
                        this.vertices,
                        function (g, h) {
                            if (h <= 0 && !d) {
                                e = g;
                                return;
                            }
                            if (g.command === O.move) {
                                b.push(new Q(e.x, e.y)), h > 0 && (b[b.length - 1].command = O.line), (e = g);
                                return;
                            }
                            (f = by(g, e, c)),
                                (b = b.concat(f)),
                                z.each(f, function (a, b) {
                                    b <= 0 && e.command === O.move ? (a.command = O.move) : (a.command = O.line);
                                }),
                                h >= a &&
                                    (this._closed && this._automatic
                                        ? ((e = g),
                                          (f = by(g, e, c)),
                                          (b = b.concat(f)),
                                          z.each(f, function (a, b) {
                                              b <= 0 && e.command === O.move
                                                  ? (a.command = O.move)
                                                  : (a.command = O.line);
                                          }))
                                        : d && b.push(new Q(g.x, g.y)),
                                    (b[b.length - 1].command = d ? O.close : O.line)),
                                (e = g);
                        },
                        this
                    ),
                    (this._automatic = !1),
                    (this._curved = !1),
                    (this.vertices = b),
                    this
                );
            }
            _updateLength(e, a) {
                a || this._update();
                let b = this.vertices.length,
                    c = b - 1,
                    f = this.vertices[c],
                    d = 0;
                return (
                    typeof this._lengths > "u" && (this._lengths = []),
                    z.each(
                        this.vertices,
                        function (g, a) {
                            if (a <= 0 || g.command === O.move) {
                                (f = g), (this._lengths[a] = 0);
                                return;
                            }
                            (this._lengths[a] = ab(g, f, e)),
                                (d += this._lengths[a]),
                                a >= c &&
                                    ((f = this.vertices[(a + 1) % b]),
                                    (this._lengths[a + 1] = ab(g, f, e)),
                                    (d += this._lengths[a + 1])),
                                (f = g);
                        },
                        this
                    ),
                    (this._length = d),
                    (this._flagLength = !1),
                    this
                );
            }
            _update() {
                if (this._flagVertices) {
                    this._automatic && this.plot(), this._flagLength && this._updateLength(void 0, !0);
                    let l = this._collection.length,
                        k = this._closed,
                        h = Math.min(this._beginning, this._ending),
                        i = Math.max(this._beginning, this._ending),
                        m = bx(this, h * this._length),
                        n = bx(this, i * this._length),
                        g = bO(m),
                        j = bP(n),
                        d,
                        c,
                        f,
                        _,
                        b,
                        a;
                    for (this._renderer.vertices.length = 0, a = 0; a < l; a++)
                        this._renderer.collection.length <= a && this._renderer.collection.push(new Q()),
                            a > j && !c
                                ? ((b = this._renderer.collection[a].copy(this._collection[a])),
                                  this.getPointAt(i, b),
                                  (b.command = this._renderer.collection[a].command),
                                  this._renderer.vertices.push(b),
                                  (c = b),
                                  (f = this._collection[a - 1]) &&
                                      f.controls &&
                                      (b.relative ? b.controls.right.clear() : b.controls.right.copy(b),
                                      f.relative
                                          ? this._renderer.collection[a - 1].controls.right
                                                .copy(f.controls.right)
                                                .lerp(e.zero, 1 - b.t)
                                          : this._renderer.collection[a - 1].controls.right
                                                .copy(f.controls.right)
                                                .lerp(f, 1 - b.t)))
                                : a >= g &&
                                  a <= j &&
                                  ((b = this._renderer.collection[a].copy(this._collection[a])),
                                  this._renderer.vertices.push(b),
                                  a === j && bw(this, i)
                                      ? ((c = b),
                                        !k &&
                                            c.controls &&
                                            (c.relative ? c.controls.right.clear() : c.controls.right.copy(c)))
                                      : a === g &&
                                        bw(this, h) &&
                                        (((d = b).command = O.move),
                                        !k &&
                                            d.controls &&
                                            (d.relative ? d.controls.left.clear() : d.controls.left.copy(d))));
                    g > 0 &&
                        !d &&
                        ((a = g - 1),
                        (b = this._renderer.collection[a].copy(this._collection[a])),
                        this.getPointAt(h, b),
                        (b.command = O.move),
                        this._renderer.vertices.unshift(b),
                        (_ = this._collection[a + 1]) &&
                            _.controls &&
                            (b.controls.left.clear(),
                            _.relative
                                ? this._renderer.collection[a + 1].controls.left.copy(_.controls.left).lerp(e.zero, b.t)
                                : (bQ.copy(_),
                                  this._renderer.collection[a + 1].controls.left.copy(_.controls.left).lerp(_, b.t))));
                }
                return T.prototype._update.apply(this, arguments), this;
            }
            flagReset() {
                return (
                    (this._flagVertices =
                        this._flagLength =
                        this._flagFill =
                        this._flagStroke =
                        this._flagLinewidth =
                        this._flagOpacity =
                        this._flagVisible =
                        this._flagCap =
                        this._flagJoin =
                        this._flagMiter =
                        this._flagClip =
                            !1),
                    T.prototype.flagReset.call(this),
                    this
                );
            }
        },
        r = aj;
    a(r, "Properties", [
        "fill",
        "stroke",
        "linewidth",
        "opacity",
        "visible",
        "cap",
        "join",
        "miter",
        "closed",
        "curved",
        "automatic",
        "beginning",
        "ending",
    ]),
        a(r, "Utils", { getCurveLength: ab });
    var bR = {
        linewidth: {
            enumerable: !0,
            get: function () {
                return this._linewidth;
            },
            set: function (a) {
                (this._linewidth = a), (this._flagLinewidth = !0);
            },
        },
        opacity: {
            enumerable: !0,
            get: function () {
                return this._opacity;
            },
            set: function (a) {
                (this._opacity = a), (this._flagOpacity = !0);
            },
        },
        visible: {
            enumerable: !0,
            get: function () {
                return this._visible;
            },
            set: function (a) {
                (this._visible = a), (this._flagVisible = !0);
            },
        },
        cap: {
            enumerable: !0,
            get: function () {
                return this._cap;
            },
            set: function (a) {
                (this._cap = a), (this._flagCap = !0);
            },
        },
        join: {
            enumerable: !0,
            get: function () {
                return this._join;
            },
            set: function (a) {
                (this._join = a), (this._flagJoin = !0);
            },
        },
        miter: {
            enumerable: !0,
            get: function () {
                return this._miter;
            },
            set: function (a) {
                (this._miter = a), (this._flagMiter = !0);
            },
        },
        fill: {
            enumerable: !0,
            get: function () {
                return this._fill;
            },
            set: function (a) {
                (this._fill instanceof o ||
                    this._fill instanceof p ||
                    this._fill instanceof q ||
                    this._fill instanceof i) &&
                    this._fill.unbind(k.Types.change, this._renderer.flagFill),
                    (this._fill = a),
                    (this._flagFill = !0),
                    (this._fill instanceof o ||
                        this._fill instanceof p ||
                        this._fill instanceof q ||
                        this._fill instanceof i) &&
                        this._fill.bind(k.Types.change, this._renderer.flagFill);
            },
        },
        stroke: {
            enumerable: !0,
            get: function () {
                return this._stroke;
            },
            set: function (a) {
                (this._stroke instanceof o ||
                    this._stroke instanceof p ||
                    this._stroke instanceof q ||
                    this._stroke instanceof i) &&
                    this._stroke.unbind(k.Types.change, this._renderer.flagStroke),
                    (this._stroke = a),
                    (this._flagStroke = !0),
                    (this._stroke instanceof o ||
                        this._stroke instanceof p ||
                        this._stroke instanceof q ||
                        this._stroke instanceof i) &&
                        this._stroke.bind(k.Types.change, this._renderer.flagStroke);
            },
        },
        length: {
            get: function () {
                return this._flagLength && this._updateLength(), this._length;
            },
        },
        closed: {
            enumerable: !0,
            get: function () {
                return this._closed;
            },
            set: function (a) {
                (this._closed = !!a), (this._flagVertices = !0);
            },
        },
        curved: {
            enumerable: !0,
            get: function () {
                return this._curved;
            },
            set: function (a) {
                (this._curved = !!a), (this._flagVertices = !0);
            },
        },
        automatic: {
            enumerable: !0,
            get: function () {
                return this._automatic;
            },
            set: function (a) {
                if (a === this._automatic) return;
                this._automatic = !!a;
                let b = this._automatic ? "ignore" : "listen";
                z.each(this.vertices, function (a) {
                    a[b]();
                });
            },
        },
        beginning: {
            enumerable: !0,
            get: function () {
                return this._beginning;
            },
            set: function (a) {
                (this._beginning = a), (this._flagVertices = !0);
            },
        },
        ending: {
            enumerable: !0,
            get: function () {
                return this._ending;
            },
            set: function (a) {
                (this._ending = a), (this._flagVertices = !0);
            },
        },
        vertices: {
            enumerable: !0,
            get: function () {
                return this._collection;
            },
            set: function (a) {
                let b = this._renderer.bindVertices,
                    c = this._renderer.unbindVertices;
                this._collection && this._collection.unbind(k.Types.insert, b).unbind(k.Types.remove, c),
                    a instanceof U ? (this._collection = a) : (this._collection = new U(a || [])),
                    this._collection.bind(k.Types.insert, b).bind(k.Types.remove, c),
                    b(this._collection);
            },
        },
        mask: {
            enumerable: !0,
            get: function () {
                return this._mask;
            },
            set: function (a) {
                (this._mask = a), (this._flagMask = !0), z.isObject(a) && !a.clip && (a.clip = !0);
            },
        },
        clip: {
            enumerable: !0,
            get: function () {
                return this._clip;
            },
            set: function (a) {
                (this._clip = a), (this._flagClip = !0);
            },
        },
        dashes: {
            enumerable: !0,
            get: function () {
                return this._dashes;
            },
            set: function (a) {
                "number" != typeof a.offset && (a.offset = (this.dashes && this._dashes.offset) || 0),
                    (this._dashes = a);
            },
        },
    };
    function bS() {
        (this._flagVertices = !0), (this._flagLength = !0), this.parent && (this.parent._flagLength = !0);
    }
    function bT(a) {
        let b = a.length;
        for (; b--; ) a[b].bind(k.Types.change, this._renderer.flagVertices);
        this._renderer.flagVertices();
    }
    function bU(a) {
        let b = a.length;
        for (; b--; ) a[b].unbind(k.Types.change, this._renderer.flagVertices);
        this._renderer.flagVertices();
    }
    function bV() {
        this._flagFill = !0;
    }
    function bW() {
        this._flagStroke = !0;
    }
    var ak = class extends r {
            constructor(a, b, c, d) {
                for (let f in (super([new Q(), new Q(), new Q(), new Q()], !0, !1, !0), bX))
                    Object.defineProperty(this, f, bX[f]);
                (this.width = "number" == typeof c ? c : 1),
                    (this.height = "number" == typeof d ? d : 1),
                    (this.origin = new e()),
                    "number" == typeof a && (this.translation.x = a),
                    "number" == typeof b && (this.translation.y = b),
                    this._update();
            }
            _flagWidth = 0;
            _flagHeight = 0;
            _width = 0;
            _height = 0;
            _origin = null;
            _update() {
                if (this._flagVertices || this._flagWidth || this._flagHeight) {
                    let a = this._width / 2,
                        b = this._height / 2;
                    this._closed || 4 !== this.vertices.length || this.vertices.push(new Q()),
                        (this.vertices[0].set(-a, -b).sub(this._origin).command = O.move),
                        (this.vertices[1].set(a, -b).sub(this._origin).command = O.line),
                        (this.vertices[2].set(a, b).sub(this._origin).command = O.line),
                        (this.vertices[3].set(-a, b).sub(this._origin).command = O.line),
                        this.vertices[4] && (this.vertices[4].set(-a, -b).sub(this._origin).command = O.line);
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (this._flagWidth = this._flagHeight = !1), super.flagReset.call(this), this;
            }
            clone(c) {
                let a = new ak(0, 0, this.width, this.height);
                a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix);
                for (let b = 0; b < r.Properties.length; b++) {
                    let d = r.Properties[b];
                    a[d] = this[d];
                }
                return c && c.add(a), a;
            }
            toObject() {
                let a = super.toObject.call(this);
                return (a.width = this.width), (a.height = this.height), (a.origin = this.origin.toObject()), a;
            }
        },
        B = ak;
    a(B, "Properties", ["width", "height"]);
    var bX = {
            width: {
                enumerable: !0,
                get: function () {
                    return this._width;
                },
                set: function (a) {
                    (this._width = a), (this._flagWidth = !0);
                },
            },
            height: {
                enumerable: !0,
                get: function () {
                    return this._height;
                },
                set: function (a) {
                    (this._height = a), (this._flagHeight = !0);
                },
            },
            origin: {
                enumerable: !0,
                get: function () {
                    return this._origin;
                },
                set: function (a) {
                    this._origin && this._origin.unbind(k.Types.change, this._renderer.flagVertices),
                        (this._origin = a),
                        this._origin.bind(k.Types.change, this._renderer.flagVertices),
                        this._renderer.flagVertices();
                },
            },
        },
        al = class extends B {
            _flagTexture = !1;
            _flagColumns = !1;
            _flagRows = !1;
            _flagFrameRate = !1;
            _flagIndex = !1;
            _amount = 1;
            _duration = 0;
            _startTime = 0;
            _playing = !1;
            _firstFrame = 0;
            _lastFrame = 0;
            _loop = !0;
            _texture = null;
            _columns = 1;
            _rows = 1;
            _frameRate = 0;
            _index = 0;
            _origin = null;
            constructor(a, g, h, b, c, d) {
                for (let f in (super(g, h, 0, 0), bY)) Object.defineProperty(this, f, bY[f]);
                this.noStroke(),
                    this.noFill(),
                    a instanceof i ? (this.texture = a) : "string" == typeof a && (this.texture = new i(a)),
                    (this.origin = new e()),
                    this._update(),
                    "number" == typeof b && (this.columns = b),
                    "number" == typeof c && (this.rows = c),
                    "number" == typeof d && (this.frameRate = d),
                    (this.index = 0);
            }
            play(a, b, c) {
                return (
                    (this._playing = !0),
                    (this._firstFrame = 0),
                    (this._lastFrame = this.amount - 1),
                    (this._startTime = z.performance.now()),
                    "number" == typeof a && (this._firstFrame = a),
                    "number" == typeof b && (this._lastFrame = b),
                    "function" == typeof c ? (this._onLastFrame = c) : delete this._onLastFrame,
                    this._index !== this._firstFrame &&
                        (this._startTime -= (1e3 * Math.abs(this._index - this._firstFrame)) / this._frameRate),
                    this
                );
            }
            pause() {
                return (this._playing = !1), this;
            }
            stop() {
                return (this._playing = !1), (this._index = 0), this;
            }
            clone(b) {
                let a = new al(
                    this.texture,
                    this.translation.x,
                    this.translation.y,
                    this.columns,
                    this.rows,
                    this.frameRate
                );
                return (
                    this.playing && (a.play(this._firstFrame, this._lastFrame), (a._loop = this._loop)),
                    b && b.add(a),
                    a
                );
            }
            toObject() {
                let a = super.toObject.call(this);
                return (
                    (a.texture = this.texture.toObject()),
                    (a.columns = this.columns),
                    (a.rows = this.rows),
                    (a.frameRate = this.frameRate),
                    (a.index = this.index),
                    (a._firstFrame = this._firstFrame),
                    (a._lastFrame = this._lastFrame),
                    (a._loop = this._loop),
                    a
                );
            }
            _update() {
                let a = this._texture,
                    g = this._columns,
                    m = this._rows,
                    b,
                    c,
                    d,
                    j,
                    e,
                    f,
                    h,
                    i,
                    _;
                if (
                    a &&
                    ((this._flagColumns || this._flagRows) && (this._amount = this._columns * this._rows),
                    this._flagFrameRate && (this._duration = (1e3 * this._amount) / this._frameRate),
                    this._flagTexture && (this.fill = a),
                    a.loaded)
                ) {
                    (h = a.image.width),
                        (i = a.image.height),
                        (b = h / g),
                        (c = i / m),
                        (j = this._amount),
                        this.width !== b && (this.width = b),
                        this.height !== c && (this.height = c),
                        this._playing &&
                            this._frameRate > 0 &&
                            (z.isNaN(this._lastFrame) && (this._lastFrame = j - 1),
                            (d = z.performance.now() - this._startTime),
                            (e = (1e3 * ((_ = this._lastFrame + 1) - this._firstFrame)) / this._frameRate),
                            this._loop ? (d %= e) : (d = Math.min(d, e)),
                            (f = Math.floor((f = aN(this._firstFrame, _, d / e)))) !== this._index &&
                                ((this._index = f),
                                f >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()));
                    let n = this._index % g,
                        o = Math.floor(this._index / g),
                        k = -b * n + (h - b) / 2,
                        l = -c * o + (i - c) / 2;
                    k !== a.offset.x && (a.offset.x = k), l !== a.offset.y && (a.offset.y = l);
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (
                    (this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = !1),
                    super.flagReset.call(this),
                    this
                );
            }
        },
        C = al;
    a(C, "Properties", ["texture", "columns", "rows", "frameRate", "index"]);
    var bY = {
            texture: {
                enumerable: !0,
                get: function () {
                    return this._texture;
                },
                set: function (a) {
                    (this._texture = a), (this._flagTexture = !0);
                },
            },
            columns: {
                enumerable: !0,
                get: function () {
                    return this._columns;
                },
                set: function (a) {
                    (this._columns = a), (this._flagColumns = !0);
                },
            },
            rows: {
                enumerable: !0,
                get: function () {
                    return this._rows;
                },
                set: function (a) {
                    (this._rows = a), (this._flagRows = !0);
                },
            },
            frameRate: {
                enumerable: !0,
                get: function () {
                    return this._frameRate;
                },
                set: function (a) {
                    (this._frameRate = a), (this._flagFrameRate = !0);
                },
            },
            index: {
                enumerable: !0,
                get: function () {
                    return this._index;
                },
                set: function (a) {
                    (this._index = a), (this._flagIndex = !0);
                },
            },
        },
        bZ = Math.cos,
        b$ = Math.sin,
        am = class extends r {
            _flagRadius = !1;
            _radius = 0;
            constructor(a, b, c, d) {
                let h = d ? Math.max(d, 2) : 4,
                    e = [];
                for (let f = 0; f < h; f++) e.push(new Q(0, 0, 0, 0, 0, 0));
                for (let g in (super(e, !0, !0, !0), b_)) Object.defineProperty(this, g, b_[g]);
                "number" == typeof c && (this.radius = c),
                    this._update(),
                    "number" == typeof a && (this.translation.x = a),
                    "number" == typeof b && (this.translation.y = b);
            }
            _update() {
                if (this._flagVertices || this._flagRadius) {
                    let c = this.vertices.length;
                    !this._closed && c > 2 && (c -= 1);
                    let g = (4 / 3) * Math.tan(Math.PI / (2 * c)),
                        f = this._radius,
                        d = f * g;
                    for (let b = 0; b < this.vertices.length; b++) {
                        let a = (b / c) * aK,
                            h = f * bZ(a),
                            i = f * b$(a),
                            j = d * bZ(a - $),
                            k = d * b$(a - $),
                            _ = d * bZ(a + $),
                            l = d * b$(a + $),
                            e = this.vertices[b];
                        (e.command = 0 === b ? O.move : O.curve),
                            e.set(h, i),
                            e.controls.left.set(j, k),
                            e.controls.right.set(_, l);
                    }
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (this._flagRadius = !1), super.flagReset.call(this), this;
            }
            clone(c) {
                let a = new am(0, 0, this.radius, this.vertices.length);
                a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix);
                for (let b = 0; b < r.Properties.length; b++) {
                    let d = r.Properties[b];
                    a[d] = this[d];
                }
                return c && c.add(a), a;
            }
            toObject() {
                let b = super.toObject.call(this);
                for (let a = 0; a < am.Properties.length; a++) {
                    let c = am.Properties[a];
                    b[c] = this[c];
                }
                return b;
            }
        },
        D = am;
    a(D, "Properties", ["radius"]);
    var b_ = {
            radius: {
                enumerable: !0,
                get: function () {
                    return this._radius;
                },
                set: function (a) {
                    (this._radius = a), (this._flagRadius = !0);
                },
            },
        },
        b0 = Math.cos,
        b1 = Math.sin,
        an = class extends r {
            _flagWidth = !1;
            _flagHeight = !1;
            _width = 0;
            _height = 0;
            constructor(c, d, a, b, e) {
                "number" != typeof b && "number" == typeof a && (b = a);
                let i = e ? Math.max(e, 2) : 4,
                    f = [];
                for (let g = 0; g < i; g++) f.push(new Q());
                for (let h in (super(f, !0, !0, !0), b2)) Object.defineProperty(this, h, b2[h]);
                "number" == typeof a && (this.width = 2 * a),
                    "number" == typeof b && (this.height = 2 * b),
                    this._update(),
                    "number" == typeof c && (this.translation.x = c),
                    "number" == typeof d && (this.translation.y = d);
            }
            _update() {
                if (this._flagVertices || this._flagWidth || this._flagHeight) {
                    let e = this.vertices.length;
                    !this._closed && e > 2 && (e -= 1);
                    let c = (4 / 3) * Math.tan(Math.PI / (2 * this.vertices.length)),
                        f = this._width / 2,
                        g = this._height / 2;
                    for (let b = 0; b < this.vertices.length; b++) {
                        let a = (b / e) * aK,
                            h = f * b0(a),
                            i = g * b1(a),
                            j = f * c * b0(a - $),
                            k = g * c * b1(a - $),
                            _ = f * c * b0(a + $),
                            l = g * c * b1(a + $),
                            d = this.vertices[b];
                        (d.command = 0 === b ? O.move : O.curve),
                            d.set(h, i),
                            d.controls.left.set(j, k),
                            d.controls.right.set(_, l);
                    }
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (this._flagWidth = this._flagHeight = !1), super.flagReset.call(this), this;
            }
            clone(c) {
                let e = this.width / 2,
                    f = this.height / 2,
                    g = this.vertices.length,
                    a = new an(0, 0, e, f, g);
                a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix);
                for (let b = 0; b < r.Properties.length; b++) {
                    let d = r.Properties[b];
                    a[d] = this[d];
                }
                return c && c.add(a), a;
            }
            toObject() {
                let b = super.toObject.call(this);
                for (let a = 0; a < an.Properties.length; a++) {
                    let c = an.Properties[a];
                    b[c] = this[c];
                }
                return b;
            }
        },
        E = an;
    a(E, "Properties", ["width", "height"]);
    var b2 = {
            width: {
                enumerable: !0,
                get: function () {
                    return this._width;
                },
                set: function (a) {
                    (this._width = a), (this._flagWidth = !0);
                },
            },
            height: {
                enumerable: !0,
                get: function () {
                    return this._height;
                },
                set: function (a) {
                    (this._height = a), (this._flagHeight = !0);
                },
            },
        },
        ao = class extends r {
            constructor(b, c, d, e) {
                for (let a in (super([new Q(b, c), new Q(d, e)]), b3)) Object.defineProperty(this, a, b3[a]);
                (this.vertices[0].command = O.move), (this.vertices[1].command = O.line), (this.automatic = !1);
            }
        },
        b3 = {
            left: {
                enumerable: !0,
                get: function () {
                    return this.vertices[0];
                },
                set: function (a) {
                    if (z.isObject(a)) this.vertices.splice(0, 1, a);
                    else {
                        let b = new aa("Two.Line.x argument is not an object.");
                        console.warn(b.name, b.message);
                    }
                },
            },
            right: {
                enumerable: !0,
                get: function () {
                    return this.vertices[0];
                },
                set: function (a) {
                    if (z.isObject(a)) this.vertices.splice(1, 1, a);
                    else {
                        let b = new aa("Two.Line.y argument is not an object.");
                        console.warn(b.name, b.message);
                    }
                },
            },
        },
        ap = class extends r {
            _flagWidth = !1;
            _flagHeight = !1;
            _flagRadius = !1;
            _width = 0;
            _height = 0;
            _radius = 12;
            constructor(e, f, a, b, c) {
                typeof c > "u" && "number" == typeof a && "number" == typeof b && (c = Math.floor(Math.min(a, b) / 12));
                let g = [];
                for (let d = 0; d < 10; d++) g.push(new Q(0, 0, 0, 0, 0, 0, 0 === d ? O.move : O.curve));
                for (let h in (super(g), b4)) Object.defineProperty(this, h, b4[h]);
                (this.closed = !0),
                    (this.automatic = !1),
                    (this._renderer.flagRadius = b5.bind(this)),
                    "number" == typeof a && (this.width = a),
                    "number" == typeof b && (this.height = b),
                    "number" == typeof c && (this.radius = c),
                    this._update(),
                    "number" == typeof e && (this.translation.x = e),
                    "number" == typeof f && (this.translation.y = f);
            }
            _update() {
                if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {
                    let g = this._width,
                        h = this._height,
                        b,
                        f;
                    this._radius instanceof e
                        ? ((b = this._radius.x), (f = this._radius.y))
                        : ((b = this._radius), (f = this._radius));
                    let a,
                        c = g / 2,
                        d = h / 2;
                    ((a = this.vertices[0]).x = -(c - b)),
                        (a.y = -d),
                        ((a = this.vertices[1]).x = c - b),
                        (a.y = -d),
                        a.controls.left.clear(),
                        (a.controls.right.x = b),
                        (a.controls.right.y = 0),
                        ((a = this.vertices[2]).x = c),
                        (a.y = -(d - f)),
                        a.controls.right.clear(),
                        a.controls.left.clear(),
                        ((a = this.vertices[3]).x = c),
                        (a.y = d - f),
                        a.controls.left.clear(),
                        (a.controls.right.x = 0),
                        (a.controls.right.y = f),
                        ((a = this.vertices[4]).x = c - b),
                        (a.y = d),
                        a.controls.right.clear(),
                        a.controls.left.clear(),
                        ((a = this.vertices[5]).x = -(c - b)),
                        (a.y = d),
                        a.controls.left.clear(),
                        (a.controls.right.x = -b),
                        (a.controls.right.y = 0),
                        ((a = this.vertices[6]).x = -c),
                        (a.y = d - f),
                        a.controls.left.clear(),
                        a.controls.right.clear(),
                        ((a = this.vertices[7]).x = -c),
                        (a.y = -(d - f)),
                        a.controls.left.clear(),
                        (a.controls.right.x = 0),
                        (a.controls.right.y = -f),
                        ((a = this.vertices[8]).x = -(c - b)),
                        (a.y = -d),
                        a.controls.left.clear(),
                        a.controls.right.clear(),
                        (a = this.vertices[9]).copy(this.vertices[8]);
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (this._flagWidth = this._flagHeight = this._flagRadius = !1), super.flagReset.call(this), this;
            }
            clone(c) {
                let e = this.width,
                    f = this.height,
                    g = this.radius,
                    a = new ap(0, 0, e, f, g);
                a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix);
                for (let b = 0; b < r.Properties.length; b++) {
                    let d = r.Properties[b];
                    a[d] = this[d];
                }
                return c && c.add(a), a;
            }
            toObject() {
                let a = super.toObject.call(this);
                for (let b = 0; b < ap.Properties.length; b++) {
                    let c = ap.Properties[b];
                    a[c] = this[c];
                }
                return (a.radius = "number" == typeof this.radius ? this.radius : this.radius.toObject()), a;
            }
        },
        F = ap;
    a(F, "Properties", ["width", "height", "radius"]);
    var b4 = {
        width: {
            enumerable: !0,
            get: function () {
                return this._width;
            },
            set: function (a) {
                (this._width = a), (this._flagWidth = !0);
            },
        },
        height: {
            enumerable: !0,
            get: function () {
                return this._height;
            },
            set: function (a) {
                (this._height = a), (this._flagHeight = !0);
            },
        },
        radius: {
            enumerable: !0,
            get: function () {
                return this._radius;
            },
            set: function (a) {
                this._radius instanceof e && this._radius.unbind(k.Types.change, this._renderer.flagRadius),
                    (this._radius = a),
                    this._radius instanceof e && this._radius.bind(k.Types.change, this._renderer.flagRadius),
                    (this._flagRadius = !0);
            },
        },
    };
    function b5() {
        this._flagRadius = !0;
    }
    var b6 = Math.min,
        b7 = Math.max,
        aq = class extends T {
            _flagValue = !0;
            _flagFamily = !0;
            _flagSize = !0;
            _flagLeading = !0;
            _flagAlignment = !0;
            _flagBaseline = !0;
            _flagStyle = !0;
            _flagWeight = !0;
            _flagDecoration = !0;
            _flagFill = !0;
            _flagStroke = !0;
            _flagLinewidth = !0;
            _flagOpacity = !0;
            _flagVisible = !0;
            _flagMask = !1;
            _flagClip = !1;
            _value = "";
            _family = "sans-serif";
            _size = 13;
            _leading = 17;
            _alignment = "center";
            _baseline = "middle";
            _style = "normal";
            _weight = 500;
            _decoration = "none";
            _fill = "#000";
            _stroke = "transparent";
            _linewidth = 1;
            _opacity = 1;
            _visible = !0;
            _mask = null;
            _clip = !1;
            _dashes = null;
            constructor(g, d, e, a) {
                for (let f in (super(), b8)) Object.defineProperty(this, f, b8[f]);
                if (
                    ((this._renderer.type = "text"),
                    (this._renderer.flagFill = b9.bind(this)),
                    (this._renderer.flagStroke = ca.bind(this)),
                    (this.value = g),
                    "number" == typeof d && (this.translation.x = d),
                    "number" == typeof e && (this.translation.y = e),
                    (this.dashes = []),
                    (this.dashes.offset = 0),
                    !z.isObject(a))
                )
                    return this;
                for (let b = 0; b < aq.Properties.length; b++) {
                    let c = aq.Properties[b];
                    c in a && (this[c] = a[c]);
                }
            }
            clone(c) {
                let a = new aq(this.value);
                a.translation.copy(this.translation), (a.rotation = this.rotation), (a.scale = this.scale);
                for (let b = 0; b < aq.Properties.length; b++) {
                    let d = aq.Properties[b];
                    a[d] = this[d];
                }
                return this.matrix.manual && a.matrix.copy(this.matrix), c && c.add(a), a._update();
            }
            toObject() {
                let a = { translation: this.translation.toObject(), rotation: this.rotation, scale: this.scale };
                this.matrix.manual && (a.matrix = this.matrix.toObject());
                for (let b = 0; b < aq.Properties.length; b++) {
                    let c = aq.Properties[b];
                    a[c] = this[c];
                }
                return a;
            }
            noFill() {
                return (this.fill = "transparent"), this;
            }
            noStroke() {
                return (this.stroke = void 0), (this.linewidth = void 0), this;
            }
            getBoundingClientRect(l) {
                let f, g, h, i, j, b, c, d, e;
                this._update(!0), (f = l ? this._matrix : aM(this));
                let k = this.leading,
                    _ = this.value.length * this.size * aq.Ratio,
                    a = (this._linewidth || 0) / 2;
                switch (this.alignment) {
                    case "left":
                        (b = -a), (c = _ + a);
                        break;
                    case "right":
                        (b = -(_ + a)), (c = a);
                        break;
                    default:
                        (b = -(_ / 2 + a)), (c = _ / 2 + a);
                }
                switch (this.baseline) {
                    case "top":
                        (d = -a), (e = k + a);
                        break;
                    case "bottom":
                        (d = -(k + a)), (e = a);
                        break;
                    default:
                        (d = -(k / 2 + a)), (e = k / 2 + a);
                }
                return (
                    (g = f.multiply(b, d, 1)),
                    (h = f.multiply(b, e, 1)),
                    (i = f.multiply(c, d, 1)),
                    (j = f.multiply(c, e, 1)),
                    (d = b6(g.y, h.y, i.y, j.y)),
                    (b = b6(g.x, h.x, i.x, j.x)),
                    (c = b7(g.x, h.x, i.x, j.x)),
                    (e = b7(g.y, h.y, i.y, j.y)),
                    { top: d, left: b, right: c, bottom: e, width: c - b, height: e - d }
                );
            }
            flagReset() {
                return (
                    super.flagReset.call(this),
                    (this._flagValue =
                        this._flagFamily =
                        this._flagSize =
                        this._flagLeading =
                        this._flagAlignment =
                        this._flagFill =
                        this._flagStroke =
                        this._flagLinewidth =
                        this._flagOpacity =
                        this._flagVisible =
                        this._flagClip =
                        this._flagDecoration =
                        this._flagClassName =
                        this._flagBaseline =
                        this._flagWeight =
                        this._flagStyle =
                            !1),
                    this
                );
            }
        },
        s = aq;
    a(s, "Ratio", 0.6),
        a(s, "Properties", [
            "value",
            "family",
            "size",
            "leading",
            "alignment",
            "linewidth",
            "style",
            "weight",
            "decoration",
            "baseline",
            "opacity",
            "visible",
            "fill",
            "stroke",
        ]);
    var b8 = {
        value: {
            enumerable: !0,
            get: function () {
                return this._value;
            },
            set: function (a) {
                (this._value = a), (this._flagValue = !0);
            },
        },
        family: {
            enumerable: !0,
            get: function () {
                return this._family;
            },
            set: function (a) {
                (this._family = a), (this._flagFamily = !0);
            },
        },
        size: {
            enumerable: !0,
            get: function () {
                return this._size;
            },
            set: function (a) {
                (this._size = a), (this._flagSize = !0);
            },
        },
        leading: {
            enumerable: !0,
            get: function () {
                return this._leading;
            },
            set: function (a) {
                (this._leading = a), (this._flagLeading = !0);
            },
        },
        alignment: {
            enumerable: !0,
            get: function () {
                return this._alignment;
            },
            set: function (a) {
                (this._alignment = a), (this._flagAlignment = !0);
            },
        },
        linewidth: {
            enumerable: !0,
            get: function () {
                return this._linewidth;
            },
            set: function (a) {
                (this._linewidth = a), (this._flagLinewidth = !0);
            },
        },
        style: {
            enumerable: !0,
            get: function () {
                return this._style;
            },
            set: function (a) {
                (this._style = a), (this._flagStyle = !0);
            },
        },
        weight: {
            enumerable: !0,
            get: function () {
                return this._weight;
            },
            set: function (a) {
                (this._weight = a), (this._flagWeight = !0);
            },
        },
        decoration: {
            enumerable: !0,
            get: function () {
                return this._decoration;
            },
            set: function (a) {
                (this._decoration = a), (this._flagDecoration = !0);
            },
        },
        baseline: {
            enumerable: !0,
            get: function () {
                return this._baseline;
            },
            set: function (a) {
                (this._baseline = a), (this._flagBaseline = !0);
            },
        },
        opacity: {
            enumerable: !0,
            get: function () {
                return this._opacity;
            },
            set: function (a) {
                (this._opacity = a), (this._flagOpacity = !0);
            },
        },
        visible: {
            enumerable: !0,
            get: function () {
                return this._visible;
            },
            set: function (a) {
                (this._visible = a), (this._flagVisible = !0);
            },
        },
        fill: {
            enumerable: !0,
            get: function () {
                return this._fill;
            },
            set: function (a) {
                (this._fill instanceof o ||
                    this._fill instanceof p ||
                    this._fill instanceof q ||
                    this._fill instanceof i) &&
                    this._fill.unbind(k.Types.change, this._renderer.flagFill),
                    (this._fill = a),
                    (this._flagFill = !0),
                    (this._fill instanceof o ||
                        this._fill instanceof p ||
                        this._fill instanceof q ||
                        this._fill instanceof i) &&
                        this._fill.bind(k.Types.change, this._renderer.flagFill);
            },
        },
        stroke: {
            enumerable: !0,
            get: function () {
                return this._stroke;
            },
            set: function (a) {
                (this._stroke instanceof o ||
                    this._stroke instanceof p ||
                    this._stroke instanceof q ||
                    this._stroke instanceof i) &&
                    this._stroke.unbind(k.Types.change, this._renderer.flagStroke),
                    (this._stroke = a),
                    (this._flagStroke = !0),
                    (this._stroke instanceof o ||
                        this._stroke instanceof p ||
                        this._stroke instanceof q ||
                        this._stroke instanceof i) &&
                        this._stroke.bind(k.Types.change, this._renderer.flagStroke);
            },
        },
        mask: {
            enumerable: !0,
            get: function () {
                return this._mask;
            },
            set: function (a) {
                (this._mask = a), (this._flagMask = !0), z.isObject(a) && !a.clip && (a.clip = !0);
            },
        },
        clip: {
            enumerable: !0,
            get: function () {
                return this._clip;
            },
            set: function (a) {
                (this._clip = a), (this._flagClip = !0);
            },
        },
        dashes: {
            enumerable: !0,
            get: function () {
                return this._dashes;
            },
            set: function (a) {
                "number" != typeof a.offset && (a.offset = (this.dashes && this._dashes.offset) || 0),
                    (this._dashes = a);
            },
        },
    };
    function b9() {
        this._flagFill = !0;
    }
    function ca() {
        this._flagStroke = !0;
    }
    var cb = {
            path: /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]\d+)?/g,
            cssBackgroundImage: /url\(['"]?#([\w\d-_]*)['"]?\)/i,
            unitSuffix: /[a-zA-Z%]*/i,
        },
        cc = { start: "left", middle: "center", end: "right" },
        cd = ["id", "class", "transform", "xmlns", "viewBox"],
        ce = ["x", "y", "width", "height", "href", "xlink:href"];
    function cf(a) {
        return cc[a];
    }
    function cg(a) {
        let b = a.getAttribute("dominant-baseline"),
            c = a.getAttribute("alignment-baseline");
        return b || c;
    }
    function ch(a) {
        return a.replace(/svg:/gi, "").toLowerCase();
    }
    function ci(a, b) {
        if (((b.x += a.translateX), (b.y += a.translateY), (b.x *= a.scaleX), (b.y *= a.scaleY), 0 !== a.rotation)) {
            let c = b.length();
            (b.x = c * Math.cos(a.rotation)), (b.y = c * Math.sin(a.rotation));
        }
    }
    function cj(g, a) {
        a || (a = {});
        let c = g.split(";");
        for (let b = 0; b < c.length; b++) {
            let d = c[b].split(":"),
                e = d[0],
                f = d[1];
            typeof e > "u" || typeof f > "u" || (a[e] = f.replace(/\s/, ""));
        }
        return a;
    }
    function ck(a) {
        let c = {},
            f = cl(a),
            g = Math.max(f.length, a.style.length);
        for (let b = 0; b < g; b++) {
            let d = a.style[b],
                e = f[b];
            d && (c[d] = a.style[d]), e && (c[e] = a.getAttribute(e));
        }
        return c;
    }
    function cl(d) {
        let a = d.getAttributeNames();
        for (let b = 0; b < cd.length; b++) {
            let e = cd[b],
                c = Array.prototype.indexOf.call(a, e);
            c >= 0 && a.splice(c, 1);
        }
        return a;
    }
    function cm(a, k) {
        let b = k.split(/[\s,]/),
            c = -parseFloat(b[0]),
            d = -parseFloat(b[1]),
            f = parseFloat(b[2]),
            g = parseFloat(b[3]);
        if (c && d)
            for (let h = 0; h < a.children.length; h++) {
                let _ = a.children[h];
                "translation" in _ ? _.translation.add(c, d) : "x" in _ ? (_.x = c) : "y" in _ && (_.y = d);
            }
        let l = "number" == typeof a.x,
            m = "number" == typeof a.y,
            i = "number" == typeof a.width,
            j = "number" == typeof a.height;
        return (
            l && (a.translation.x += a.x),
            m && (a.translation.y += a.y),
            (i || j) && (a.scale = new e(1, 1)),
            i && (a.scale.x = a.width / f),
            j && (a.scale.y = a.height / g),
            (a.mask = new B(0, 0, f, g)),
            a.mask.origin.set(-f / 2, -g / 2),
            a
        );
    }
    function cn(g, a, y) {
        let f = {},
            A = {},
            B = {},
            k,
            i,
            j,
            b,
            t,
            n,
            _,
            u,
            v,
            m,
            h,
            r,
            C,
            D,
            E,
            w;
        if (c.getComputedStyle) {
            let x = c.getComputedStyle(g);
            for (k = x.length; k--; ) (j = x[k]), (b = x[j]), "u" > typeof b && (f[j] = b);
        }
        for (k = 0; k < g.attributes.length; k++)
            (n = g.attributes[k]), /style/i.test(n.nodeName) ? cj(n.value, B) : (A[n.nodeName] = n.value);
        for (j in ("u" > typeof f.opacity &&
            ((f["stroke-opacity"] = f.opacity), (f["fill-opacity"] = f.opacity), delete f.opacity),
        y && z.defaults(f, y),
        z.extend(f, B, A),
        (f.visible =
            !(typeof f.display > "u" && /none/i.test(f.display)) ||
            (typeof f.visibility > "u" && /hidden/i.test(f.visibility))),
        f))
            switch (((b = f[j]), j)) {
                case "gradientTransform":
                    if (
                        /none/i.test(b) ||
                        null ===
                            (i =
                                g.gradientTransform &&
                                g.gradientTransform.baseVal &&
                                g.gradientTransform.baseVal.length > 0
                                    ? g.gradientTransform.baseVal[0].matrix
                                    : g.getCTM
                                    ? g.getCTM()
                                    : null)
                    )
                        break;
                    switch (((_ = aL(i)), a._renderer.type)) {
                        case "linear-gradient":
                            ci(_, a.left), ci(_, a.right);
                            break;
                        case "radial-gradient":
                            (a.center.x += _.translateX),
                                (a.center.y += _.translateY),
                                (a.focal.x += _.translateX),
                                (a.focal.y += _.translateY),
                                (a.radius *= Math.max(_.scaleX, _.scaleY));
                    }
                    break;
                case "transform":
                    if (
                        /none/i.test(b) ||
                        null ===
                            (i =
                                g.transform && g.transform.baseVal && g.transform.baseVal.length > 0
                                    ? g.transform.baseVal[0].matrix
                                    : g.getCTM
                                    ? g.getCTM()
                                    : null)
                    )
                        break;
                    d.AutoCalculateImportedMatrices
                        ? ((_ = aL(i)),
                          a.translation.set(_.translateX, _.translateY),
                          (a.rotation = Math.PI * (_.rotation / 180)),
                          (a.scale = new e(_.scaleX, _.scaleY)),
                          (u = parseFloat((f.x + "").replace("px"))),
                          (v = parseFloat((f.y + "").replace("px"))),
                          u && (a.translation.x = u),
                          v && (a.translation.y = v))
                        : ((i = g.getCTM()), (a._matrix.manual = !0), a._matrix.set(i.a, i.b, i.c, i.d, i.e, i.f));
                    break;
                case "visible":
                    if (a instanceof l) {
                        a._visible = b;
                        break;
                    }
                    a.visible = b;
                    break;
                case "stroke-linecap":
                    if (a instanceof l) {
                        a._cap = b;
                        break;
                    }
                    a.cap = b;
                    break;
                case "stroke-linejoin":
                    if (a instanceof l) {
                        a._join = b;
                        break;
                    }
                    a.join = b;
                    break;
                case "stroke-miterlimit":
                    if (a instanceof l) {
                        a._miter = b;
                        break;
                    }
                    a.miter = b;
                    break;
                case "stroke-width":
                    if (a instanceof l) {
                        a._linewidth = parseFloat(b);
                        break;
                    }
                    a.linewidth = parseFloat(b);
                    break;
                case "opacity":
                case "stroke-opacity":
                case "fill-opacity":
                    if (a instanceof l) {
                        a._opacity = parseFloat(b);
                        break;
                    }
                    a.opacity = parseFloat(b);
                    break;
                case "clip-path":
                    if (
                        cb.cssBackgroundImage.test(b) &&
                        ((m = b.replace(cb.cssBackgroundImage, "$1")),
                        ar.defs.current &&
                            ar.defs.current.contains(m) &&
                            (h = ar.defs.current.get(m)) &&
                            h.childNodes.length > 0)
                    )
                        switch (
                            ((r = ch((h = h.childNodes[0]).nodeName)),
                            (a.mask = ar[r].call(this, h, {})),
                            a._renderer.type)
                        ) {
                            case "text":
                            case "path":
                                a.position.add(a.mask.position), a.mask.position.clear();
                        }
                    break;
                case "fill":
                case "stroke":
                    (t = (a instanceof l ? "_" : "") + j),
                        cb.cssBackgroundImage.test(b)
                            ? ((m = b.replace(cb.cssBackgroundImage, "$1")),
                              ar.defs.current && ar.defs.current.contains(m)
                                  ? ((h = ar.defs.current.get(m)).object ||
                                        ((r = ch(h.nodeName)), (h.object = ar[r].call(this, h, {}))),
                                    (h = h.object))
                                  : (h = cp(this).getById(m)),
                              (a[t] = h))
                            : (a[t] = /none/i.test(b) ? "transparent" : b);
                    break;
                case "id":
                    a.id = b;
                    break;
                case "class":
                case "className":
                    (a.classList = b.split(" ")), (a._flagClassName = !0);
                    break;
                case "x":
                case "y":
                    if (((C = a instanceof o), (D = a instanceof p), (E = a instanceof q), C || D || E)) break;
                    b.match("[a-z%]$") &&
                        !b.endsWith("px") &&
                        ((w = new aa("only pixel values are supported with the " + j + " attribute.")),
                        console.warn(w.name, w.message)),
                        (a.translation[j] = parseFloat(b));
                    break;
                case "font-family":
                    a instanceof s && (a.family = b);
                    break;
                case "font-size":
                    a instanceof s && (a.size = b);
                    break;
                case "font-weight":
                    a instanceof s && (a.weight = b);
                    break;
                case "font-style":
                    a instanceof s && (a.style = b);
                    break;
                case "text-decoration":
                    a instanceof s && (a.decoration = b);
                    break;
                case "line-height":
                    a instanceof s && (a.leading = b);
            }
        return Object.keys(g.dataset).length && (a.dataset = g.dataset), f;
    }
    function co(a, d) {
        for (let b = 0, e = a.childNodes.length; b < e; b++) {
            let c = a.childNodes[b];
            c.id && "#text" !== ch(a.nodeName) && d.add(c.id, c);
        }
    }
    function cp(a) {
        for (; a.parent; ) a = a.parent;
        return a.scene;
    }
    var ar = {
        svg: function (a) {
            let d = (ar.defs.current = new n()),
                e = a.getElementsByTagName("defs");
            for (let c = 0; c < e.length; c++) co(e[c], d);
            let b = ar.g.call(this, a),
                f = a.getAttribute("viewBox"),
                g = a.getAttribute("x"),
                h = a.getAttribute("y"),
                i = a.getAttribute("width"),
                j = a.getAttribute("height");
            return (
                (b.defs = d),
                null !== g && (b.x = parseFloat(g.replace(cb.unitSuffix, ""))),
                null !== h && (b.y = parseFloat(h.replace(cb.unitSuffix, ""))),
                null !== i && (b.width = parseFloat(i.replace(cb.unitSuffix, ""))),
                null !== j && (b.height = parseFloat(j.replace(cb.unitSuffix, ""))),
                null !== f && cm(b, f),
                delete ar.defs.current,
                b
            );
        },
        defs: function (a) {
            return null;
        },
        use: function (b, h) {
            let a,
                e = b.getAttribute("href") || b.getAttribute("xlink:href");
            if (!e) return (a = new aa("encountered <use /> with no href.")), console.warn(a.name, a.message), null;
            let g = e.slice(1);
            if (!ar.defs.current.contains(g))
                return (
                    (a = new aa("unable to find element for reference " + e + ".")),
                    console.warn(a.name, a.message),
                    null
                );
            let c = ar.defs.current.get(g).cloneNode(!0);
            for (let f = 0; f < b.attributes.length; f++) {
                let d = b.attributes[f],
                    i = ce.includes(d.nodeName),
                    j = !c.hasAttribute(d.nodeName);
                (i || j) && c.setAttribute(d.nodeName, d.value);
            }
            return ar[ch(c.nodeName)].call(this, c, h);
        },
        g: function (b, h) {
            let a = new l();
            cn.call(this, b, a, h), this.add(a);
            let i = ck.call(this, b);
            for (let c = 0, j = b.childNodes.length; c < j; c++) {
                let e = b.childNodes[c],
                    f = e.nodeName;
                if (!f) return;
                let g = ch(f);
                if (g in ar) {
                    let d = ar[g].call(a, e, i);
                    d && !d.parent && a.add(d);
                }
            }
            return a;
        },
        polygon: function (a, d) {
            let c;
            c = "string" == typeof a ? a : a.getAttribute("points");
            let e = [];
            c.replace(/(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g, function (c, a, b) {
                e.push(new Q(parseFloat(a), parseFloat(b)));
            });
            let b = new r(e, !0).noStroke();
            return (b.fill = "black"), cn.call(this, a, b, d), b;
        },
        polyline: function (b, c) {
            let a = ar.polygon.call(this, b, c);
            return (a.closed = !1), a;
        },
        path: function (c, f) {
            let a;
            a = "string" == typeof c ? c : c.getAttribute("d");
            let g = [],
                h = !1,
                i = !1;
            if (a) {
                let j = new Q(),
                    k,
                    l,
                    d = a.match(/[a-df-z][^a-df-z]*/gi),
                    m = d.length - 1;
                z.each(d.slice(0), function (_, j) {
                    let b = _.slice(1).trim().match(cb.path),
                        f = _[0],
                        k = f.toLowerCase(),
                        a,
                        c,
                        h,
                        e,
                        g,
                        i = [];
                    switch ((0 === j && (d = []), k)) {
                        case "h":
                        case "v":
                            b.length > 1 && (a = 1);
                            break;
                        case "m":
                        case "l":
                        case "t":
                            b.length > 2 && (a = 2);
                            break;
                        case "s":
                        case "q":
                            b.length > 4 && (a = 4);
                            break;
                        case "c":
                            b.length > 6 && (a = 6);
                            break;
                        case "a":
                            b.length > 7 && (a = 7);
                    }
                    if (a) {
                        for (c = 0, h = b.length, g = 0; c < h; c += a) {
                            if (((e = f), g > 0))
                                switch (f) {
                                    case "m":
                                        e = "l";
                                        break;
                                    case "M":
                                        e = "L";
                                }
                            i.push(e + b.slice(c, c + a).join(" ")), g++;
                        }
                        d = Array.prototype.concat.apply(d, i);
                    } else d.push(_);
                }),
                    z.each(d, function (_, G) {
                        let a,
                            v,
                            w,
                            z = _[0],
                            s = z.toLowerCase();
                        (l = _.slice(1).trim().match(cb.path)), (i = z === s);
                        let d, f, o, p, q, r, b, c, t, u, x, n, A, B, C, D, E;
                        switch (s) {
                            case "z":
                                if (G >= m) h = !0;
                                else {
                                    (v = j.x), (w = j.y), (a = new Q(v, w, void 0, void 0, void 0, void 0, O.close));
                                    for (let y = g.length - 1; y >= 0; y--) {
                                        let F = g[y];
                                        if (/m/i.test(F.command)) {
                                            j = F;
                                            break;
                                        }
                                    }
                                }
                                break;
                            case "m":
                            case "l":
                                (k = void 0),
                                    (v = parseFloat(l[0])),
                                    (w = parseFloat(l[1])),
                                    (a = new Q(v, w, void 0, void 0, void 0, void 0, /m/i.test(s) ? O.move : O.line)),
                                    i && a.addSelf(j),
                                    (j = a);
                                break;
                            case "h":
                            case "v":
                                (u = /h/i.test(s) ? "x" : "y"),
                                    (x = /x/i.test(u) ? "y" : "x"),
                                    ((a = new Q(void 0, void 0, void 0, void 0, void 0, void 0, O.line))[u] =
                                        parseFloat(l[0])),
                                    (a[x] = j[x]),
                                    i && (a[u] += j[u]),
                                    (j = a);
                                break;
                            case "c":
                            case "s":
                                (d = j.x),
                                    (f = j.y),
                                    k || (k = new e()),
                                    /c/i.test(s)
                                        ? ((o = parseFloat(l[0])),
                                          (p = parseFloat(l[1])),
                                          (q = parseFloat(l[2])),
                                          (r = parseFloat(l[3])),
                                          (b = parseFloat(l[4])),
                                          (c = parseFloat(l[5])))
                                        : ((o = (t = a2(j, k, i)).x),
                                          (p = t.y),
                                          (q = parseFloat(l[0])),
                                          (r = parseFloat(l[1])),
                                          (b = parseFloat(l[2])),
                                          (c = parseFloat(l[3]))),
                                    i && ((o += d), (p += f), (q += d), (r += f), (b += d), (c += f)),
                                    j.controls.right.set(o - j.x, p - j.y),
                                    (a = new Q(b, c, q - b, r - c, void 0, void 0, O.curve)),
                                    (j = a),
                                    (k = a.controls.left);
                                break;
                            case "t":
                            case "q":
                                (d = j.x),
                                    (f = j.y),
                                    k || (k = new e()),
                                    /q/i.test(s)
                                        ? ((o = parseFloat(l[0])),
                                          (p = parseFloat(l[1])),
                                          (q = parseFloat(l[0])),
                                          (r = parseFloat(l[1])),
                                          (b = parseFloat(l[2])),
                                          (c = parseFloat(l[3])))
                                        : ((o = (t = a2(j, k, i)).x),
                                          (p = t.y),
                                          (q = t.x),
                                          (r = t.y),
                                          (b = parseFloat(l[0])),
                                          (c = parseFloat(l[1]))),
                                    i && ((o += d), (p += f), (q += d), (r += f), (b += d), (c += f)),
                                    j.controls.right.set((o - j.x) * 0.33, (p - j.y) * 0.33),
                                    (a = new Q(b, c, q - b, r - c, void 0, void 0, O.curve)),
                                    (j = a),
                                    (k = a.controls.left);
                                break;
                            case "a":
                                (d = j.x),
                                    (f = j.y),
                                    (A = parseFloat(l[0])),
                                    (B = parseFloat(l[1])),
                                    (C = parseFloat(l[2])),
                                    (D = parseFloat(l[3])),
                                    (E = parseFloat(l[4])),
                                    (b = parseFloat(l[5])),
                                    (c = parseFloat(l[6])),
                                    i && ((b += d), (c += f)),
                                    (n = new Q(b, c)),
                                    (n.command = O.arc),
                                    (n.rx = A),
                                    (n.ry = B),
                                    (n.xAxisRotation = C),
                                    (n.largeArcFlag = D),
                                    (n.sweepFlag = E),
                                    (a = n),
                                    (j = n),
                                    (k = void 0);
                        }
                        a && (Array.isArray(a) ? (g = g.concat(a)) : g.push(a));
                    });
            }
            (a = new r(g, h, void 0, !0).noStroke()).fill = "black";
            let b = a.getBoundingClientRect(!0);
            return (
                (b.centroid = { x: b.left + b.width / 2, y: b.top + b.height / 2 }),
                z.each(a.vertices, function (a) {
                    a.subSelf(b.centroid);
                }),
                cn.call(this, c, a, f),
                a.translation.addSelf(b.centroid),
                a
            );
        },
        circle: function (b, c) {
            let d = parseFloat(b.getAttribute("cx")),
                e = parseFloat(b.getAttribute("cy")),
                f = parseFloat(b.getAttribute("r")),
                a = new D(0, 0, f).noStroke();
            return (a.fill = "black"), cn.call(this, b, a, c), (a.translation.x = d), (a.translation.y = e), a;
        },
        ellipse: function (a, c) {
            let d = parseFloat(a.getAttribute("cx")),
                e = parseFloat(a.getAttribute("cy")),
                f = parseFloat(a.getAttribute("rx")),
                g = parseFloat(a.getAttribute("ry")),
                b = new E(0, 0, f, g).noStroke();
            return (b.fill = "black"), cn.call(this, a, b, c), (b.translation.x = d), (b.translation.y = e), b;
        },
        rect: function (a, e) {
            let f = parseFloat(a.getAttribute("rx")),
                g = parseFloat(a.getAttribute("ry"));
            if (!z.isNaN(f) || !z.isNaN(g)) return ar["rounded-rect"](a);
            let c = parseFloat(a.getAttribute("width")),
                d = parseFloat(a.getAttribute("height")),
                h = c / 2,
                i = d / 2,
                b = new B(0, 0, c, d).noStroke();
            return (b.fill = "black"), cn.call(this, a, b, e), (b.translation.x += h), (b.translation.y += i), b;
        },
        "rounded-rect": function (a, f) {
            let g = parseFloat(a.getAttribute("rx")) || 0,
                h = parseFloat(a.getAttribute("ry")) || 0,
                c = parseFloat(a.getAttribute("width")),
                d = parseFloat(a.getAttribute("height")),
                i = new e(g, h),
                b = new F(0, 0, c, d, i).noStroke();
            return (
                (b.fill = "black"), cn.call(this, a, b, f), (b.translation.x += c / 2), (b.translation.y += d / 2), b
            );
        },
        line: function (a, c) {
            let d = parseFloat(a.getAttribute("x1")),
                e = parseFloat(a.getAttribute("y1")),
                f = parseFloat(a.getAttribute("x2")),
                g = parseFloat(a.getAttribute("y2")),
                b = new ao(d, e, f, g).noFill();
            return cn.call(this, a, b, c), b;
        },
        lineargradient: function (a, t) {
            let d = a.getAttribute("gradientUnits"),
                j = a.getAttribute("spreadMethod");
            d || (d = "objectBoundingBox"), j || (j = "pad");
            let k = parseFloat(a.getAttribute("x1") || 0),
                l = parseFloat(a.getAttribute("y1") || 0),
                m = parseFloat(a.getAttribute("x2") || 0),
                n = parseFloat(a.getAttribute("y2") || 0),
                q = (m + k) / 2,
                r = (n + l) / 2;
            /userSpaceOnUse/i.test(d) && ((k -= q), (l -= r), (m -= q), (n -= r));
            let s = [];
            for (let _ = 0; _ < a.children.length; _++) {
                let e = a.children[_],
                    b = e.getAttribute("offset");
                /%/gi.test(b) && (b = parseFloat(b.replace(/%/gi, "")) / 100), (b = parseFloat(b));
                let o = e.getAttribute("stop-color"),
                    f = e.getAttribute("stop-opacity"),
                    g = e.getAttribute("style"),
                    c;
                null === o &&
                    (o = (c = !!g && g.match(/stop-color:\s?([#a-fA-F0-9]*)/)) && c.length > 1 ? c[1] : void 0),
                    (f =
                        null === f
                            ? (c = !!g && g.match(/stop-opacity:\s?([0-9.-]*)/)) && c.length > 1
                                ? parseFloat(c[1])
                                : 1
                            : parseFloat(f)),
                    s.push(new h(b, o, f));
            }
            let i = new p(k, l, m, n, s);
            return (i.spread = j), (i.units = d), cn.call(this, a, i, t), i;
        },
        radialgradient: function (a, t) {
            let f = a.getAttribute("gradientUnits"),
                m = a.getAttribute("spreadMethod");
            f || (f = "objectBoundingBox"), m || (m = "pad");
            let g = parseFloat(a.getAttribute("cx")) || 0,
                i = parseFloat(a.getAttribute("cy")) || 0,
                u = parseFloat(a.getAttribute("r")),
                d = parseFloat(a.getAttribute("fx")),
                e = parseFloat(a.getAttribute("fy"));
            z.isNaN(d) && (d = g), z.isNaN(e) && (e = i);
            let p = Math.abs(g + d) / 2,
                r = Math.abs(i + e) / 2;
            /userSpaceOnUse/i.test(f) && ((g -= p), (i -= r), (d -= p), (e -= r));
            let s = [];
            for (let n = 0; n < a.children.length; n++) {
                let j = a.children[n],
                    b = j.getAttribute("offset");
                /%/gi.test(b) && (b = parseFloat(b.replace(/%/gi, "")) / 100), (b = parseFloat(b));
                let o = j.getAttribute("stop-color"),
                    k = j.getAttribute("stop-opacity"),
                    l = j.getAttribute("style"),
                    c;
                null === o &&
                    (o = (c = !!l && l.match(/stop-color:\s?([#a-fA-F0-9]*)/)) && c.length > 1 ? c[1] : void 0),
                    (k =
                        null === k
                            ? (c = !!l && l.match(/stop-opacity:\s?([0-9.-]*)/)) && c.length > 1
                                ? parseFloat(c[1])
                                : 1
                            : parseFloat(k)),
                    s.push(new h(b, o, k));
            }
            let _ = new q(g, i, u, s, d, e);
            return (_.spread = m), (_.units = f), cn.call(this, a, _, t), _;
        },
        text: function (a, c) {
            let d = cf(a.getAttribute("text-anchor")) || "left",
                e = cg(a) || "baseline",
                f = a.textContent,
                b = new s(f);
            return cn.call(this, a, b, c), (b.alignment = d), (b.baseline = e), b;
        },
        clippath: function (a, b) {
            return ar.defs.current && !ar.defs.current.contains(a.id) && ar.defs.current.add(a.id, a), null;
        },
        image: function (a, g) {
            let c,
                d = a.getAttribute("href") || a.getAttribute("xlink:href");
            if (!d) return (c = new aa("encountered <image /> with no href.")), console.warn(c.name, c.message), null;
            let h = parseFloat(a.getAttribute("x")) || 0,
                i = parseFloat(a.getAttribute("y")) || 0,
                e = parseFloat(a.getAttribute("width")),
                f = parseFloat(a.getAttribute("height")),
                b = new C(d, h, i);
            return z.isNaN(e) || (b.width = e), z.isNaN(f) || (b.height = f), cn.call(this, a, b, g), b;
        },
    };
    function as(b, c) {
        let a = new XMLHttpRequest();
        return (
            a.open("GET", b),
            (a.onreadystatechange = function () {
                4 === a.readyState && 200 === a.status && c(a.responseText);
            }),
            a.send(),
            a
        );
    }
    var at = class extends B {
            _flagTextures = !1;
            _flagFrameRate = !1;
            _flagIndex = !1;
            _amount = 1;
            _duration = 0;
            _index = 0;
            _startTime = 0;
            _playing = !1;
            _firstFrame = 0;
            _lastFrame = 0;
            _loop = !0;
            _textures = null;
            _frameRate = 0;
            _origin = null;
            constructor(a, d, f, b) {
                for (let c in (super(d, f, 0, 0), cq)) Object.defineProperty(this, c, cq[c]);
                (this._renderer.flagTextures = cr.bind(this)),
                    (this._renderer.bindTextures = cs.bind(this)),
                    (this._renderer.unbindTextures = ct.bind(this)),
                    this.noStroke(),
                    this.noFill(),
                    Array.isArray(a) ? (this.textures = a.map(cu.bind(this))) : (this.textures = [cu(a)]),
                    (this.origin = new e()),
                    this._update(),
                    "number" == typeof b ? (this.frameRate = b) : (this.frameRate = at.DefaultFrameRate),
                    (this.index = 0);
            }
            play(a, b, c) {
                return (
                    (this._playing = !0),
                    (this._firstFrame = 0),
                    (this._lastFrame = this.amount - 1),
                    (this._startTime = z.performance.now()),
                    "number" == typeof a && (this._firstFrame = a),
                    "number" == typeof b && (this._lastFrame = b),
                    "function" == typeof c ? (this._onLastFrame = c) : delete this._onLastFrame,
                    this._index !== this._firstFrame &&
                        (this._startTime -= (1e3 * Math.abs(this._index - this._firstFrame)) / this._frameRate),
                    this
                );
            }
            pause() {
                return (this._playing = !1), this;
            }
            stop() {
                return (this._playing = !1), (this._index = this._firstFrame), this;
            }
            clone(b) {
                let a = new at(this.textures, this.translation.x, this.translation.y, this.frameRate);
                return (a._loop = this._loop), this._playing && a.play(), b && b.add(a), a;
            }
            toObject() {
                let a = super.toObject.call(this);
                return (
                    (a.textures = this.textures.map(function (a) {
                        return a.toObject();
                    })),
                    (a.frameRate = this.frameRate),
                    (a.index = this.index),
                    (a._firstFrame = this._firstFrame),
                    (a._lastFrame = this._lastFrame),
                    (a._loop = this._loop),
                    a
                );
            }
            _update() {
                let e = this._textures,
                    b,
                    c,
                    d,
                    h,
                    f,
                    a,
                    g,
                    j;
                return (
                    e &&
                        (this._flagTextures && (this._amount = e.length),
                        this._flagFrameRate && (this._duration = (1e3 * this._amount) / this._frameRate),
                        this._playing && this._frameRate > 0
                            ? ((h = this._amount),
                              z.isNaN(this._lastFrame) && (this._lastFrame = h - 1),
                              (d = z.performance.now() - this._startTime),
                              (f = (1e3 * ((j = this._lastFrame + 1) - this._firstFrame)) / this._frameRate),
                              this._loop ? (d %= f) : (d = Math.min(d, f)),
                              (g = Math.floor((g = aN(this._firstFrame, j, d / f)))) !== this._index &&
                                  ((this._index = g),
                                  (a = e[this._index]).loaded &&
                                      ((b = a.image.width),
                                      (c = a.image.height),
                                      this.width !== b && (this.width = b),
                                      this.height !== c && (this.height = c),
                                      (this.fill = a),
                                      g >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame())))
                            : (!this._flagIndex && this.fill instanceof i) ||
                              ((a = e[this._index]).loaded &&
                                  ((b = a.image.width),
                                  (c = a.image.height),
                                  this.width !== b && (this.width = b),
                                  this.height !== c && (this.height = c)),
                              (this.fill = a))),
                    super._update.call(this),
                    this
                );
            }
            flagReset() {
                return (this._flagTextures = this._flagFrameRate = !1), super.flagReset.call(this), this;
            }
        },
        t = at;
    a(t, "Properties", ["textures", "frameRate", "index"]), a(t, "DefaultFrameRate", 30);
    var cq = {
        frameRate: {
            enumerable: !0,
            get: function () {
                return this._frameRate;
            },
            set: function (a) {
                (this._frameRate = a), (this._flagFrameRate = !0);
            },
        },
        index: {
            enumerable: !0,
            get: function () {
                return this._index;
            },
            set: function (a) {
                (this._index = a), (this._flagIndex = !0);
            },
        },
        textures: {
            enumerable: !0,
            get: function () {
                return this._textures;
            },
            set: function (c) {
                let a = this._renderer.bindTextures,
                    b = this._renderer.unbindTextures;
                this._textures && this._textures.unbind(k.Types.insert, a).unbind(k.Types.remove, b),
                    (this._textures = new U((c || []).slice(0))),
                    this._textures.bind(k.Types.insert, a).bind(k.Types.remove, b),
                    a(this._textures);
            },
        },
    };
    function cr() {
        this._flagTextures = !0;
    }
    function cs(a) {
        let b = a.length;
        for (; b--; ) a[b].bind(k.Types.change, this._renderer.flagTextures);
        this._renderer.flagTextures();
    }
    function ct(a) {
        let b = a.length;
        for (; b--; ) a[b].unbind(k.Types.change, this._renderer.flagTextures);
        this._renderer.flagTextures();
    }
    function cu(a) {
        return a instanceof i ? a : "string" == typeof a ? new i(a) : void 0;
    }
    var au = class extends r {
            _flagStartAngle = !1;
            _flagEndAngle = !1;
            _flagInnerRadius = !1;
            _flagOuterRadius = !1;
            _startAngle = 0;
            _endAngle = aK;
            _innerRadius = 0;
            _outerRadius = 0;
            constructor(a, b, c, e, f, g, k) {
                let l = k || 3 * d.Resolution,
                    h = [];
                for (let i = 0; i < l; i++) h.push(new Q());
                for (let j in (super(h, !0, !1, !0), cv)) Object.defineProperty(this, j, cv[j]);
                "number" == typeof c && (this.innerRadius = c),
                    "number" == typeof e && (this.outerRadius = e),
                    "number" == typeof f && (this.startAngle = f),
                    "number" == typeof g && (this.endAngle = g),
                    this._update(),
                    "number" == typeof a && (this.translation.x = a),
                    "number" == typeof b && (this.translation.y = b);
            }
            _update() {
                if (
                    this._flagVertices ||
                    this._flagStartAngle ||
                    this._flagEndAngle ||
                    this._flagInnerRadius ||
                    this._flagOuterRadius
                ) {
                    let h = this._startAngle,
                        i = this._endAngle,
                        k = this._innerRadius,
                        q = this._outerRadius,
                        l = aQ(h, aK) === aQ(i, aK),
                        r = k > 0,
                        b = this.vertices,
                        g = r ? b.length / 2 : b.length,
                        j,
                        e = 0,
                        c,
                        _,
                        m,
                        a,
                        d,
                        n,
                        o,
                        p,
                        f;
                    for (l ? g-- : r || (g -= 2), c = 0, _ = g - 1; c < g; c++)
                        (m = c / _),
                            (a = b[e]),
                            (d = m * (i - h) + h),
                            (n = (i - h) / g),
                            (o = q * Math.cos(d)),
                            (p = q * Math.sin(d)),
                            (j = 0 === c ? O.move : O.curve),
                            (a.command = j),
                            (a.x = o),
                            (a.y = p),
                            a.controls.left.clear(),
                            a.controls.right.clear(),
                            a.command === O.curve &&
                                ((f = (q * n) / Math.PI),
                                (a.controls.left.x = f * Math.cos(d - $)),
                                (a.controls.left.y = f * Math.sin(d - $)),
                                (a.controls.right.x = f * Math.cos(d + $)),
                                (a.controls.right.y = f * Math.sin(d + $)),
                                1 === c && a.controls.left.multiplyScalar(2),
                                c === _ && a.controls.right.multiplyScalar(2)),
                            e++;
                    if (r) {
                        for (l ? ((b[e].command = O.close), e++) : (_ = --g - 1), c = 0; c < g; c++)
                            (m = c / _),
                                (a = b[e]),
                                (d = (1 - m) * (i - h) + h),
                                (n = (i - h) / g),
                                (o = k * Math.cos(d)),
                                (p = k * Math.sin(d)),
                                (j = O.curve),
                                c <= 0 && (j = l ? O.move : O.line),
                                (a.command = j),
                                (a.x = o),
                                (a.y = p),
                                a.controls.left.clear(),
                                a.controls.right.clear(),
                                a.command === O.curve &&
                                    ((f = (k * n) / Math.PI),
                                    (a.controls.left.x = f * Math.cos(d + $)),
                                    (a.controls.left.y = f * Math.sin(d + $)),
                                    (a.controls.right.x = f * Math.cos(d - $)),
                                    (a.controls.right.y = f * Math.sin(d - $)),
                                    1 === c && a.controls.left.multiplyScalar(2),
                                    c === _ && a.controls.right.multiplyScalar(2)),
                                e++;
                        b[e].copy(b[0]), (b[e].command = O.line);
                    } else
                        l ||
                            ((b[e].command = O.line),
                            (b[e].x = 0),
                            (b[e].y = 0),
                            b[++e].copy(b[0]),
                            (b[e].command = O.line));
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (
                    super.flagReset.call(this),
                    (this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = !1),
                    this
                );
            }
            clone(c) {
                let e = this.innerRadius,
                    f = this.outerRadius,
                    g = this.startAngle,
                    h = this.endAngle,
                    i = this.vertices.length,
                    a = new au(0, 0, e, f, g, h, i);
                a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix);
                for (let b = 0; b < r.Properties.length; b++) {
                    let d = r.Properties[b];
                    a[d] = this[d];
                }
                return c && c.add(a), a;
            }
            toObject() {
                let b = super.toObject.call(this);
                for (let a = 0; a < au.Properties.length; a++) {
                    let c = au.Properties[a];
                    b[c] = this[c];
                }
                return b;
            }
        },
        G = au;
    a(G, "Properties", ["startAngle", "endAngle", "innerRadius", "outerRadius"]);
    var cv = {
            startAngle: {
                enumerable: !0,
                get: function () {
                    return this._startAngle;
                },
                set: function (a) {
                    (this._startAngle = a), (this._flagStartAngle = !0);
                },
            },
            endAngle: {
                enumerable: !0,
                get: function () {
                    return this._endAngle;
                },
                set: function (a) {
                    (this._endAngle = a), (this._flagEndAngle = !0);
                },
            },
            innerRadius: {
                enumerable: !0,
                get: function () {
                    return this._innerRadius;
                },
                set: function (a) {
                    (this._innerRadius = a), (this._flagInnerRadius = !0);
                },
            },
            outerRadius: {
                enumerable: !0,
                get: function () {
                    return this._outerRadius;
                },
                set: function (a) {
                    (this._outerRadius = a), (this._flagOuterRadius = !0);
                },
            },
        },
        cw = Math.ceil,
        cx = Math.floor,
        av = class extends T {
            _flagVertices = !0;
            _flagLength = !0;
            _flagFill = !0;
            _flagStroke = !0;
            _flagLinewidth = !0;
            _flagOpacity = !0;
            _flagVisible = !0;
            _flagSize = !0;
            _flagSizeAttenuation = !0;
            _length = 0;
            _fill = "#fff";
            _stroke = "#000";
            _linewidth = 1;
            _opacity = 1;
            _visible = !0;
            _size = 1;
            _sizeAttenuation = !1;
            _beginning = 0;
            _ending = 1;
            _dashes = null;
            constructor(b) {
                for (let a in (super(), cy)) Object.defineProperty(this, a, cy[a]);
                (this._renderer.type = "points"),
                    (this._renderer.flagVertices = bS.bind(this)),
                    (this._renderer.bindVertices = bT.bind(this)),
                    (this._renderer.unbindVertices = bU.bind(this)),
                    (this._renderer.flagFill = bV.bind(this)),
                    (this._renderer.flagStroke = bW.bind(this)),
                    (this._renderer.vertices = null),
                    (this._renderer.collection = null),
                    (this.sizeAttenuation = !1),
                    (this.beginning = 0),
                    (this.ending = 1),
                    (this.fill = "#fff"),
                    (this.stroke = "#000"),
                    (this.className = ""),
                    (this.visible = !0),
                    (this.vertices = b),
                    (this.dashes = []),
                    (this.dashes.offset = 0);
            }
            clone(d) {
                let a = new av();
                for (let b = 0; b < this.vertices.length; b++) a.vertices.push(this.vertices[b].clone());
                for (let c = 0; c < av.Properties.length; c++) {
                    let e = av.Properties[c];
                    a[e] = this[e];
                }
                return (
                    (a.className = this.className),
                    a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix),
                    d && d.add(a),
                    a._update()
                );
            }
            toObject() {
                let a = {
                    vertices: this.vertices.map(function (a) {
                        return a.toObject();
                    }),
                };
                return (
                    z.each(
                        av.Properties,
                        function (b) {
                            a[b] = this[b];
                        },
                        this
                    ),
                    (a.className = this.className),
                    (a.translation = this.translation.toObject()),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale instanceof e ? this.scale.toObject() : this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && (a.matrix = this.matrix.toObject()),
                    a
                );
            }
            noFill = r.prototype.noFill;
            noStroke = r.prototype.noStroke;
            corner = r.prototype.corner;
            center = r.prototype.center;
            getBoundingClientRect = r.prototype.getBoundingClientRect;
            subdivide(i) {
                this._update();
                let b = [];
                for (let a = 0; a < this.vertices.length; a++) {
                    let d = this.vertices[a],
                        c = this.vertices[a - 1];
                    if (!c) continue;
                    let e = d.x,
                        f = d.y,
                        g = c.x,
                        h = c.y,
                        j = aY(e, f, e, f, g, h, g, h, i);
                    b = b.concat(j);
                }
                return (this.vertices = b), this;
            }
            _updateLength = r.prototype._updateLength;
            _update() {
                if (this._flagVertices) {
                    this._flagLength && this._updateLength(void 0, !0);
                    let d = Math.min(this._beginning, this._ending),
                        e = Math.max(this._beginning, this._ending),
                        f = bx(this, d * this._length),
                        g = bx(this, e * this._length),
                        h = cw(f),
                        i = cx(g),
                        c = 0,
                        b;
                    (this._renderer.vertices = []), (this._renderer.collection = []);
                    for (let a = 0; a < this._collection.length; a++)
                        a >= h &&
                            a <= i &&
                            ((b = this._collection[a]),
                            this._renderer.collection.push(b),
                            (this._renderer.vertices[2 * c + 0] = b.x),
                            (this._renderer.vertices[2 * c + 1] = b.y),
                            c++);
                }
                return super._update.apply(this, arguments), this;
            }
            flagReset() {
                return (
                    (this._flagVertices =
                        this._flagLength =
                        this._flagFill =
                        this._flagStroke =
                        this._flagLinewidth =
                        this._flagOpacity =
                        this._flagVisible =
                        this._flagSize =
                        this._flagSizeAttenuation =
                            !1),
                    super.flagReset.call(this),
                    this
                );
            }
        },
        H = av;
    a(H, "Properties", [
        "fill",
        "stroke",
        "linewidth",
        "opacity",
        "visible",
        "size",
        "sizeAttenuation",
        "beginning",
        "ending",
    ]);
    var cy = {
            linewidth: {
                enumerable: !0,
                get: function () {
                    return this._linewidth;
                },
                set: function (a) {
                    (this._linewidth = a), (this._flagLinewidth = !0);
                },
            },
            opacity: {
                enumerable: !0,
                get: function () {
                    return this._opacity;
                },
                set: function (a) {
                    (this._opacity = a), (this._flagOpacity = !0);
                },
            },
            visible: {
                enumerable: !0,
                get: function () {
                    return this._visible;
                },
                set: function (a) {
                    (this._visible = a), (this._flagVisible = !0);
                },
            },
            size: {
                enumerable: !0,
                get: function () {
                    return this._size;
                },
                set: function (a) {
                    (this._size = a), (this._flagSize = !0);
                },
            },
            sizeAttenuation: {
                enumerable: !0,
                get: function () {
                    return this._sizeAttenuation;
                },
                set: function (a) {
                    (this._sizeAttenuation = a), (this._flagSizeAttenuation = !0);
                },
            },
            fill: {
                enumerable: !0,
                get: function () {
                    return this._fill;
                },
                set: function (a) {
                    (this._fill instanceof o ||
                        this._fill instanceof p ||
                        this._fill instanceof q ||
                        this._fill instanceof i) &&
                        this._fill.unbind(k.Types.change, this._renderer.flagFill),
                        (this._fill = a),
                        (this._flagFill = !0),
                        (this._fill instanceof o ||
                            this._fill instanceof p ||
                            this._fill instanceof q ||
                            this._fill instanceof i) &&
                            this._fill.bind(k.Types.change, this._renderer.flagFill);
                },
            },
            stroke: {
                enumerable: !0,
                get: function () {
                    return this._stroke;
                },
                set: function (a) {
                    (this._stroke instanceof o ||
                        this._stroke instanceof p ||
                        this._stroke instanceof q ||
                        this._stroke instanceof i) &&
                        this._stroke.unbind(k.Types.change, this._renderer.flagStroke),
                        (this._stroke = a),
                        (this._flagStroke = !0),
                        (this._stroke instanceof o ||
                            this._stroke instanceof p ||
                            this._stroke instanceof q ||
                            this._stroke instanceof i) &&
                            this._stroke.bind(k.Types.change, this._renderer.flagStroke);
                },
            },
            length: {
                get: function () {
                    return this._flagLength && this._updateLength(), this._length;
                },
            },
            beginning: {
                enumerable: !0,
                get: function () {
                    return this._beginning;
                },
                set: function (a) {
                    (this._beginning = a), (this._flagVertices = !0);
                },
            },
            ending: {
                enumerable: !0,
                get: function () {
                    return this._ending;
                },
                set: function (a) {
                    (this._ending = a), (this._flagVertices = !0);
                },
            },
            vertices: {
                enumerable: !0,
                get: function () {
                    return this._collection;
                },
                set: function (a) {
                    let b = this._renderer.bindVertices,
                        c = this._renderer.unbindVertices;
                    this._collection && this._collection.unbind(k.Types.insert, b).unbind(k.Types.remove, c),
                        a instanceof U ? (this._collection = a) : (this._collection = new U(a || [])),
                        this._collection.bind(k.Types.insert, b).bind(k.Types.remove, c),
                        b(this._collection);
                },
            },
            dashes: {
                enumerable: !0,
                get: function () {
                    return this._dashes;
                },
                set: function (a) {
                    "number" != typeof a.offset && (a.offset = (this.dashes && this._dashes.offset) || 0),
                        (this._dashes = a);
                },
            },
        },
        cz = Math.cos,
        cA = Math.sin,
        aw = class extends r {
            _flagWidth = !1;
            _flagHeight = !1;
            _flagSides = !1;
            _radius = 0;
            _width = 0;
            _height = 0;
            _sides = 0;
            constructor(b, c, d, a) {
                for (let e in ((a = Math.max(a || 0, 3)), super(), cB)) Object.defineProperty(this, e, cB[e]);
                (this.closed = !0),
                    (this.automatic = !1),
                    "number" == typeof d && (this.radius = d),
                    "number" == typeof a && (this.sides = a),
                    this._update(),
                    "number" == typeof b && (this.translation.x = b),
                    "number" == typeof c && (this.translation.y = c);
            }
            _update() {
                if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagSides) {
                    let b = this._sides,
                        g = b + 1,
                        c = this.vertices.length;
                    c > b && (this.vertices.splice(b - 1, c - b), (c = b));
                    for (let a = 0; a < g; a++) {
                        let d = aK * ((a + 0.5) / b) + Math.PI / 2,
                            e = (this._width * cz(d)) / 2,
                            f = (this._height * cA(d)) / 2;
                        a >= c ? this.vertices.push(new Q(e, f)) : this.vertices[a].set(e, f),
                            (this.vertices[a].command = 0 === a ? O.move : O.line);
                    }
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (this._flagWidth = this._flagHeight = this._flagSides = !1), super.flagReset.call(this), this;
            }
            clone(c) {
                let a = new aw(0, 0, 0, this.sides);
                a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    (a.width = this.width),
                    (a.height = this.height),
                    this.matrix.manual && a.matrix.copy(this.matrix);
                for (let b = 0; b < r.Properties.length; b++) {
                    let d = r.Properties[b];
                    a[d] = this[d];
                }
                return c && c.add(a), a;
            }
            toObject() {
                let b = super.toObject.call(this);
                for (let a = 0; a < aw.Properties.length; a++) {
                    let c = aw.Properties[a];
                    b[c] = this[c];
                }
                return b;
            }
        },
        I = aw;
    a(I, "Properties", ["width", "height", "sides"]);
    var cB = {
            radius: {
                enumerable: !0,
                get: function () {
                    return this._radius;
                },
                set: function (a) {
                    (this._radius = a), (this.width = 2 * a), (this.height = 2 * a);
                },
            },
            width: {
                enumerable: !0,
                get: function () {
                    return this._width;
                },
                set: function (a) {
                    (this._width = a), (this._flagWidth = !0), (this._radius = Math.max(this.width, this.height) / 2);
                },
            },
            height: {
                enumerable: !0,
                get: function () {
                    return this._height;
                },
                set: function (a) {
                    (this._height = a), (this._flagHeight = !0), (this._radius = Math.max(this.width, this.height) / 2);
                },
            },
            sides: {
                enumerable: !0,
                get: function () {
                    return this._sides;
                },
                set: function (a) {
                    (this._sides = a), (this._flagSides = !0);
                },
            },
        },
        cC = Math.cos,
        cD = Math.sin,
        ax = class extends r {
            _flagInnerRadius = !1;
            _flagOuterRadius = !1;
            _flagSides = !1;
            _innerRadius = 0;
            _outerRadius = 0;
            _sides = 0;
            constructor(d, e, b, c, a) {
                for (let f in (arguments.length <= 3 && (b = (c = b) / 2),
                ("number" != typeof a || a <= 0) && (a = 5),
                super(),
                cE))
                    Object.defineProperty(this, f, cE[f]);
                (this.closed = !0),
                    (this.automatic = !1),
                    "number" == typeof b && (this.innerRadius = b),
                    "number" == typeof c && (this.outerRadius = c),
                    "number" == typeof a && (this.sides = a),
                    this._update(),
                    "number" == typeof d && (this.translation.x = d),
                    "number" == typeof e && (this.translation.y = e);
            }
            _update() {
                if (this._flagVertices || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
                    let b = 2 * this._sides,
                        h = b + 1,
                        c = this.vertices.length;
                    c > b && (this.vertices.splice(b - 1, c - b), (c = b));
                    for (let a = 0; a < h; a++) {
                        let d = aK * ((a + 0.5) / b),
                            e = (a % 2 ? this._outerRadius : this._innerRadius) / 2,
                            f = e * cC(d),
                            g = e * cD(d);
                        a >= c ? this.vertices.push(new Q(f, g)) : this.vertices[a].set(f, g),
                            (this.vertices[a].command = 0 === a ? O.move : O.line);
                    }
                }
                return super._update.call(this), this;
            }
            flagReset() {
                return (
                    (this._flagInnerRadius = this._flagOuterRadius = this._flagSides = !1),
                    super.flagReset.call(this),
                    this
                );
            }
            clone(c) {
                let e = this.innerRadius,
                    f = this.outerRadius,
                    g = this.sides,
                    a = new ax(0, 0, e, f, g);
                a.translation.copy(this.translation),
                    (a.rotation = this.rotation),
                    (a.scale = this.scale),
                    (a.skewX = this.skewX),
                    (a.skewY = this.skewY),
                    this.matrix.manual && a.matrix.copy(this.matrix);
                for (let b = 0; b < r.Properties.length; b++) {
                    let d = r.Properties[b];
                    a[d] = this[d];
                }
                return c && c.add(a), a;
            }
            toObject() {
                let b = super.toObject.call(this);
                for (let a = 0; a < ax.Properties.length; a++) {
                    let c = ax.Properties[a];
                    b[c] = this[c];
                }
                return b;
            }
        },
        J = ax;
    a(J, "Properties", ["innerRadius", "outerRadius", "sides"]);
    var cE = {
            innerRadius: {
                enumerable: !0,
                get: function () {
                    return this._innerRadius;
                },
                set: function (a) {
                    (this._innerRadius = a), (this._flagInnerRadius = !0);
                },
            },
            outerRadius: {
                enumerable: !0,
                get: function () {
                    return this._outerRadius;
                },
                set: function (a) {
                    (this._outerRadius = a), (this._flagOuterRadius = !0);
                },
            },
            sides: {
                enumerable: !0,
                get: function () {
                    return this._sides;
                },
                set: function (a) {
                    (this._sides = a), (this._flagSides = !0);
                },
            },
        },
        cF = new f(),
        ay = {
            version: 1.1,
            ns: "http://www.w3.org/2000/svg",
            xlink: "http://www.w3.org/1999/xlink",
            alignments: { left: "start", center: "middle", right: "end" },
            createElement: function (d, a) {
                let b = d,
                    c = document.createElementNS(ay.ns, b);
                return (
                    "svg" === b && (a = z.defaults(a || {}, { version: ay.version })),
                    a && Object.keys(a).length > 0 && ay.setAttributes(c, a),
                    c
                );
            },
            setAttributes: function (d, c) {
                let b = Object.keys(c);
                for (let a = 0; a < b.length; a++)
                    /href/.test(b[a]) ? d.setAttributeNS(ay.xlink, b[a], c[b[a]]) : d.setAttribute(b[a], c[b[a]]);
                return this;
            },
            removeAttributes: function (a, b) {
                for (let c in b) a.removeAttribute(c);
                return this;
            },
            toString: function (p, r) {
                let q = p.length,
                    z = q - 1,
                    s,
                    t = "";
                for (let d = 0; d < q; d++) {
                    let a = p[d],
                        k = p[r ? aQ(d - 1, q) : Math.max(d - 1, 0)],
                        c,
                        b,
                        _,
                        f,
                        g,
                        h,
                        l,
                        m,
                        n,
                        o,
                        u,
                        v,
                        w,
                        x,
                        y,
                        i = aS(a.x),
                        j = aS(a.y);
                    switch (a.command) {
                        case O.close:
                            c = O.close;
                            break;
                        case O.arc:
                            (u = a.rx),
                                (v = a.ry),
                                (w = a.xAxisRotation),
                                (x = a.largeArcFlag),
                                (y = a.sweepFlag),
                                (c = O.arc + " " + u + " " + v + " " + w + " " + x + " " + y + " " + i + " " + j);
                            break;
                        case O.curve:
                            (l = (k.controls && k.controls.right) || e.zero),
                                (m = (a.controls && a.controls.left) || e.zero),
                                k.relative
                                    ? ((_ = aS(l.x + k.x)), (f = aS(l.y + k.y)))
                                    : ((_ = aS(l.x)), (f = aS(l.y))),
                                a.relative
                                    ? ((g = aS(m.x + a.x)), (h = aS(m.y + a.y)))
                                    : ((g = aS(m.x)), (h = aS(m.y))),
                                (c =
                                    (0 === d ? O.move : O.curve) +
                                    " " +
                                    _ +
                                    " " +
                                    f +
                                    " " +
                                    g +
                                    " " +
                                    h +
                                    " " +
                                    i +
                                    " " +
                                    j);
                            break;
                        case O.move:
                            (s = a), (c = O.move + " " + i + " " + j);
                            break;
                        default:
                            c = a.command + " " + i + " " + j;
                    }
                    d >= z &&
                        r &&
                        (a.command === O.curve &&
                            ((b = s),
                            (n = (a.controls && a.controls.right) || a),
                            (o = (b.controls && b.controls.left) || b),
                            a.relative ? ((_ = aS(n.x + a.x)), (f = aS(n.y + a.y))) : ((_ = aS(n.x)), (f = aS(n.y))),
                            b.relative ? ((g = aS(o.x + b.x)), (h = aS(o.y + b.y))) : ((g = aS(o.x)), (h = aS(o.y))),
                            (i = aS(b.x)),
                            (j = aS(b.y)),
                            (c += " C " + _ + " " + f + " " + g + " " + h + " " + i + " " + j)),
                        a.command !== O.close && (c += " Z")),
                        (t += c + " ");
                }
                return t;
            },
            pointsToString: function (b, e) {
                let c = "",
                    d = 0.5 * e;
                for (let a = 0; a < b.length; a++) {
                    let f = b[a].x,
                        g = b[a].y - d;
                    (c += O.move + " " + f + " " + g + " "), (c += "a " + d + " " + d + " 0 1 0 0.001 0 Z");
                }
                return c;
            },
            getClip: function (b, c) {
                let a = b._renderer.clip;
                return (
                    a ||
                        ((a = b._renderer.clip = ay.createElement("clipPath", { "clip-rule": "nonzero" })),
                        c.defs.appendChild(a)),
                    a
                );
            },
            group: {
                appendChild: function (b) {
                    let a = b._renderer.elem;
                    if (!a) return;
                    let c = a.nodeName;
                    !c || /(radial|linear)gradient/i.test(c) || b._clip || this.elem.appendChild(a);
                },
                removeChild: function (b) {
                    let a = b._renderer.elem;
                    a && a.parentNode == this.elem && a.nodeName && !b._clip && this.elem.removeChild(a);
                },
                orderChild: function (a) {
                    this.elem.appendChild(a._renderer.elem);
                },
                renderChild: function (a) {
                    ay[a._renderer.type].render.call(a, this);
                },
                render: function (a) {
                    if ((!this._visible && !this._flagVisible) || (0 === this._opacity && !this._flagOpacity))
                        return this;
                    this._update(),
                        this._renderer.elem ||
                            ((this._renderer.elem = ay.createElement("g", { id: this.id })),
                            a.appendChild(this._renderer.elem));
                    let e = this._matrix.manual || this._flagMatrix,
                        b = { domElement: a, elem: this._renderer.elem };
                    e && this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
                    for (let c = 0; c < this.children.length; c++) {
                        let d = this.children[c];
                        ay[d._renderer.type].render.call(d, a);
                    }
                    return (
                        this._flagId && this._renderer.elem.setAttribute("id", this._id),
                        this._flagOpacity && this._renderer.elem.setAttribute("opacity", this._opacity),
                        this._flagVisible &&
                            this._renderer.elem.setAttribute("display", this._visible ? "inline" : "none"),
                        this._flagClassName && this._renderer.elem.setAttribute("class", this.classList.join(" ")),
                        this._flagAdditions && this.additions.forEach(ay.group.appendChild, b),
                        this._flagSubtractions && this.subtractions.forEach(ay.group.removeChild, b),
                        this._flagOrder && this.children.forEach(ay.group.orderChild, b),
                        this._flagMask &&
                            (this._mask
                                ? (ay[this._mask._renderer.type].render.call(this._mask, a),
                                  this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")"))
                                : this._renderer.elem.removeAttribute("clip-path")),
                        this.dataset && Object.assign(this._renderer.elem.dataset, this.dataset),
                        this.flagReset()
                    );
                },
            },
            path: {
                render: function (b) {
                    if (0 === this._opacity && !this._flagOpacity) return this;
                    this._update();
                    let a = {};
                    if (
                        ((this._matrix.manual || this._flagMatrix) &&
                            (a.transform = "matrix(" + this._matrix.toString() + ")"),
                        this._flagId && (a.id = this._id),
                        this._flagVertices)
                    ) {
                        let e = ay.toString(this._renderer.vertices, this._closed);
                        a.d = e;
                    }
                    if (
                        (this._fill &&
                            this._fill._renderer &&
                            (this._fill._update(), ay[this._fill._renderer.type].render.call(this._fill, b, !0)),
                        this._flagFill &&
                            (a.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill),
                        this._stroke &&
                            this._stroke._renderer &&
                            (this._stroke._update(), ay[this._stroke._renderer.type].render.call(this._stroke, b, !0)),
                        this._flagStroke &&
                            (a.stroke =
                                this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke),
                        this._flagLinewidth && (a["stroke-width"] = this._linewidth),
                        this._flagOpacity &&
                            ((a["stroke-opacity"] = this._opacity), (a["fill-opacity"] = this._opacity)),
                        this._flagClassName && (a.class = this.classList.join(" ")),
                        this._flagVisible && (a.visibility = this._visible ? "visible" : "hidden"),
                        this._flagCap && (a["stroke-linecap"] = this._cap),
                        this._flagJoin && (a["stroke-linejoin"] = this._join),
                        this._flagMiter && (a["stroke-miterlimit"] = this._miter),
                        this.dashes &&
                            this.dashes.length > 0 &&
                            ((a["stroke-dasharray"] = this.dashes.join(" ")),
                            (a["stroke-dashoffset"] = this.dashes.offset || 0)),
                        this._renderer.elem
                            ? ay.setAttributes(this._renderer.elem, a)
                            : ((a.id = this._id),
                              (this._renderer.elem = ay.createElement("path", a)),
                              b.appendChild(this._renderer.elem)),
                        this._flagClip)
                    ) {
                        let d = ay.getClip(this, b),
                            c = this._renderer.elem;
                        this._clip
                            ? (c.removeAttribute("id"), d.setAttribute("id", this.id), d.appendChild(c))
                            : (d.removeAttribute("id"),
                              c.setAttribute("id", this.id),
                              this.parent._renderer.elem.appendChild(c));
                    }
                    return (
                        this._flagMask &&
                            (this._mask
                                ? (ay[this._mask._renderer.type].render.call(this._mask, b),
                                  this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")"))
                                : this._renderer.elem.removeAttribute("clip-path")),
                        this.flagReset()
                    );
                },
            },
            points: {
                render: function (c) {
                    if (0 === this._opacity && !this._flagOpacity) return this;
                    this._update();
                    let a = {};
                    if (
                        ((this._matrix.manual || this._flagMatrix) &&
                            (a.transform = "matrix(" + this._matrix.toString() + ")"),
                        this._flagId && (a.id = this._id),
                        this._flagVertices || this._flagSize || this._flagSizeAttenuation)
                    ) {
                        let d = this._size;
                        if (!this._sizeAttenuation) {
                            aM(this, cF);
                            let b = cF.elements,
                                e = aL(b[0], b[3], b[1], b[4], b[2], b[5]);
                            d /= Math.max(e.scaleX, e.scaleY);
                        }
                        let f = ay.pointsToString(this._renderer.collection, d);
                        a.d = f;
                    }
                    return (
                        this._fill &&
                            this._fill._renderer &&
                            (this._fill._update(), ay[this._fill._renderer.type].render.call(this._fill, c, !0)),
                        this._flagFill &&
                            (a.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill),
                        this._stroke &&
                            this._stroke._renderer &&
                            (this._stroke._update(), ay[this._stroke._renderer.type].render.call(this._stroke, c, !0)),
                        this._flagStroke &&
                            (a.stroke =
                                this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke),
                        this._flagLinewidth && (a["stroke-width"] = this._linewidth),
                        this._flagOpacity &&
                            ((a["stroke-opacity"] = this._opacity), (a["fill-opacity"] = this._opacity)),
                        this._flagClassName && (a.class = this.classList.join(" ")),
                        this._flagVisible && (a.visibility = this._visible ? "visible" : "hidden"),
                        this.dashes &&
                            this.dashes.length > 0 &&
                            ((a["stroke-dasharray"] = this.dashes.join(" ")),
                            (a["stroke-dashoffset"] = this.dashes.offset || 0)),
                        this._renderer.elem
                            ? ay.setAttributes(this._renderer.elem, a)
                            : ((a.id = this._id),
                              (this._renderer.elem = ay.createElement("path", a)),
                              c.appendChild(this._renderer.elem)),
                        this.flagReset()
                    );
                },
            },
            text: {
                render: function (b) {
                    this._update();
                    let a = {};
                    if (
                        ((this._matrix.manual || this._flagMatrix) &&
                            (a.transform = "matrix(" + this._matrix.toString() + ")"),
                        this._flagId && (a.id = this._id),
                        this._flagFamily && (a["font-family"] = this._family),
                        this._flagSize && (a["font-size"] = this._size),
                        this._flagLeading && (a["line-height"] = this._leading),
                        this._flagAlignment && (a["text-anchor"] = ay.alignments[this._alignment] || this._alignment),
                        this._flagBaseline && (a["alignment-baseline"] = a["dominant-baseline"] = this._baseline),
                        this._flagStyle && (a["font-style"] = this._style),
                        this._flagWeight && (a["font-weight"] = this._weight),
                        this._flagDecoration && (a["text-decoration"] = this._decoration),
                        this._fill &&
                            this._fill._renderer &&
                            (this._fill._update(), ay[this._fill._renderer.type].render.call(this._fill, b, !0)),
                        this._flagFill &&
                            (a.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill),
                        this._stroke &&
                            this._stroke._renderer &&
                            (this._stroke._update(), ay[this._stroke._renderer.type].render.call(this._stroke, b, !0)),
                        this._flagStroke &&
                            (a.stroke =
                                this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke),
                        this._flagLinewidth && (a["stroke-width"] = this._linewidth),
                        this._flagOpacity && (a.opacity = this._opacity),
                        this._flagClassName && (a.class = this.classList.join(" ")),
                        this._flagVisible && (a.visibility = this._visible ? "visible" : "hidden"),
                        this.dashes &&
                            this.dashes.length > 0 &&
                            ((a["stroke-dasharray"] = this.dashes.join(" ")),
                            (a["stroke-dashoffset"] = this.dashes.offset || 0)),
                        this._renderer.elem
                            ? ay.setAttributes(this._renderer.elem, a)
                            : ((a.id = this._id),
                              (this._renderer.elem = ay.createElement("text", a)),
                              b.defs.appendChild(this._renderer.elem)),
                        this._flagClip)
                    ) {
                        let d = ay.getClip(this, b),
                            c = this._renderer.elem;
                        this._clip
                            ? (c.removeAttribute("id"), d.setAttribute("id", this.id), d.appendChild(c))
                            : (d.removeAttribute("id"),
                              c.setAttribute("id", this.id),
                              this.parent._renderer.elem.appendChild(c));
                    }
                    return (
                        this._flagMask &&
                            (this._mask
                                ? (ay[this._mask._renderer.type].render.call(this._mask, b),
                                  this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")"))
                                : this._renderer.elem.removeAttribute("clip-path")),
                        this._flagValue && (this._renderer.elem.textContent = this._value),
                        this.flagReset()
                    );
                },
            },
            "linear-gradient": {
                render: function (f, g) {
                    g || this._update();
                    let b = {};
                    if (
                        (this._flagId && (b.id = this._id),
                        this._flagEndPoints &&
                            ((b.x1 = this.left._x),
                            (b.y1 = this.left._y),
                            (b.x2 = this.right._x),
                            (b.y2 = this.right._y)),
                        this._flagSpread && (b.spreadMethod = this._spread),
                        this._flagUnits && (b.gradientUnits = this._units),
                        this._renderer.elem
                            ? ay.setAttributes(this._renderer.elem, b)
                            : ((b.id = this._id),
                              (this._renderer.elem = ay.createElement("linearGradient", b)),
                              f.defs.appendChild(this._renderer.elem)),
                        this._flagStops)
                    ) {
                        let e = this._renderer.elem.childNodes.length !== this.stops.length;
                        if (e)
                            for (; this._renderer.elem.lastChild; )
                                this._renderer.elem.removeChild(this._renderer.elem.lastChild);
                        for (let d = 0; d < this.stops.length; d++) {
                            let a = this.stops[d],
                                c = {};
                            a._flagOffset && (c.offset = 100 * a._offset + "%"),
                                a._flagColor && (c["stop-color"] = a._color),
                                a._flagOpacity && (c["stop-opacity"] = a._opacity),
                                a._renderer.elem
                                    ? ay.setAttributes(a._renderer.elem, c)
                                    : (a._renderer.elem = ay.createElement("stop", c)),
                                e && this._renderer.elem.appendChild(a._renderer.elem),
                                a.flagReset();
                        }
                    }
                    return this.flagReset();
                },
            },
            "radial-gradient": {
                render: function (f, g) {
                    g || this._update();
                    let a = {};
                    if (
                        (this._flagId && (a.id = this._id),
                        this._flagCenter && ((a.cx = this.center._x), (a.cy = this.center._y)),
                        this._flagFocal && ((a.fx = this.focal._x), (a.fy = this.focal._y)),
                        this._flagRadius && (a.r = this._radius),
                        this._flagSpread && (a.spreadMethod = this._spread),
                        this._flagUnits && (a.gradientUnits = this._units),
                        this._renderer.elem
                            ? ay.setAttributes(this._renderer.elem, a)
                            : ((a.id = this._id),
                              (this._renderer.elem = ay.createElement("radialGradient", a)),
                              f.defs.appendChild(this._renderer.elem)),
                        this._flagStops)
                    ) {
                        let e = this._renderer.elem.childNodes.length !== this.stops.length;
                        if (e)
                            for (; this._renderer.elem.lastChild; )
                                this._renderer.elem.removeChild(this._renderer.elem.lastChild);
                        for (let d = 0; d < this.stops.length; d++) {
                            let b = this.stops[d],
                                c = {};
                            b._flagOffset && (c.offset = 100 * b._offset + "%"),
                                b._flagColor && (c["stop-color"] = b._color),
                                b._flagOpacity && (c["stop-opacity"] = b._opacity),
                                b._renderer.elem
                                    ? ay.setAttributes(b._renderer.elem, c)
                                    : (b._renderer.elem = ay.createElement("stop", c)),
                                e && this._renderer.elem.appendChild(b._renderer.elem),
                                b.flagReset();
                        }
                    }
                    return this.flagReset();
                },
            },
            texture: {
                render: function (d, f) {
                    f || this._update();
                    let a = {},
                        b = { x: 0, y: 0 },
                        c = this.image;
                    if ((this._flagId && (a.id = this._id), this._flagLoaded && this.loaded))
                        switch (c.nodeName.toLowerCase()) {
                            case "canvas":
                                b.href = b["xlink:href"] = c.toDataURL("image/png");
                                break;
                            case "img":
                            case "image":
                                b.href = b["xlink:href"] = this.src;
                        }
                    return (
                        (this._flagOffset || this._flagLoaded || this._flagScale) &&
                            ((a.x = this._offset.x),
                            (a.y = this._offset.y),
                            c &&
                                ((a.x -= c.width / 2),
                                (a.y -= c.height / 2),
                                this._scale instanceof e
                                    ? ((a.x *= this._scale.x), (a.y *= this._scale.y))
                                    : ((a.x *= this._scale), (a.y *= this._scale))),
                            a.x > 0 && (a.x *= -1),
                            a.y > 0 && (a.y *= -1)),
                        (this._flagScale || this._flagLoaded || this._flagRepeat) &&
                            ((a.width = 0), (a.height = 0), c) &&
                            ((b.width = a.width = c.width),
                            (b.height = a.height = c.height),
                            "no-repeat" === this._repeat && ((a.width += 1), (a.height += 1)),
                            this._scale instanceof e
                                ? ((a.width *= this._scale.x), (a.height *= this._scale.y))
                                : ((a.width *= this._scale), (a.height *= this._scale))),
                        (this._flagScale || this._flagLoaded) &&
                            (this._renderer.image
                                ? ay.setAttributes(this._renderer.image, b)
                                : (this._renderer.image = ay.createElement("image", b))),
                        this._renderer.elem
                            ? 0 !== Object.keys(a).length && ay.setAttributes(this._renderer.elem, a)
                            : ((a.id = this._id),
                              (a.patternUnits = "userSpaceOnUse"),
                              (this._renderer.elem = ay.createElement("pattern", a)),
                              d.defs.appendChild(this._renderer.elem)),
                        this._renderer.elem &&
                            this._renderer.image &&
                            !this._renderer.appended &&
                            (this._renderer.elem.appendChild(this._renderer.image), (this._renderer.appended = !0)),
                        this.flagReset()
                    );
                },
            },
        },
        K = class extends k {
            constructor(a) {
                super(),
                    (this.domElement = a.domElement || ay.createElement("svg")),
                    (this.scene = new l()),
                    (this.scene.parent = this),
                    (this.defs = ay.createElement("defs")),
                    this.domElement.appendChild(this.defs),
                    (this.domElement.defs = this.defs),
                    (this.domElement.style.overflow = "hidden");
            }
            setSize(a, b) {
                return (
                    (this.width = a),
                    (this.height = b),
                    ay.setAttributes(this.domElement, { width: a, height: b }),
                    this.trigger(k.Types.resize, a, b)
                );
            }
            render() {
                return ay.group.render.call(this.scene, this.domElement), this;
            }
        };
    a(K, "Utils", ay);
    var cG = {
            create: function (a, c, d) {
                let b = a.createShader(a[d]);
                if ((a.shaderSource(b, c), a.compileShader(b), !a.getShaderParameter(b, a.COMPILE_STATUS))) {
                    let e = a.getShaderInfoLog(b);
                    throw (a.deleteShader(b), new aa("unable to compile shader " + b + ": " + e));
                }
                return b;
            },
            types: { vertex: "VERTEX_SHADER", fragment: "FRAGMENT_SHADER" },
            path: {
                vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform mat3 u_matrix;
      uniform vec2 u_resolution;
      uniform vec4 u_rect;

      varying vec2 v_textureCoords;

      void main() {
        vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;
        vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
                fragment: `
      precision mediump float;

      uniform sampler2D u_image;
      varying vec2 v_textureCoords;

      void main() {
        vec4 texel = texture2D(u_image, v_textureCoords);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `,
            },
            points: {
                vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform float u_size;
      uniform mat3 u_matrix;
      uniform vec2 u_resolution;

      varying vec2 v_textureCoords;

      void main() {
        vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_PointSize = u_size;
        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
                fragment: `
      precision mediump float;

      uniform sampler2D u_image;

      void main() {
        vec4 texel = texture2D(u_image, gl_PointCoord);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `,
            },
        },
        cH = f.Multiply,
        cI = [1, 0, 0, 0, 1, 0, 0, 0, 1],
        cJ = new x(9),
        cK = m.Utils,
        cL = new x([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        u = {
            precision: 0.9,
            isHidden: /(undefined|none|transparent)/i,
            canvas: c.document ? c.document.createElement("canvas") : { getContext: function () {} },
            alignments: { left: "start", middle: "center", right: "end" },
            matrix: new f(),
            group: {
                removeChild: function (a, b) {
                    if (a.children) for (let c = 0; c < a.children.length; c++) u.group.removeChild(a.children[c], b);
                    a._renderer.texture && (b.deleteTexture(a._renderer.texture), delete a._renderer.texture),
                        a._renderer.positionBuffer &&
                            (b.deleteBuffer(a._renderer.positionBuffer), delete a._renderer.positionBuffer);
                },
                render: function (a, d) {
                    if (!this._visible) return;
                    this._update();
                    let b = this.parent,
                        f = (b._matrix && b._matrix.manual) || b._flagMatrix,
                        h = this._matrix.manual || this._flagMatrix;
                    (f || h) &&
                        (this._renderer.matrix || (this._renderer.matrix = new x(9)),
                        this._matrix.toTransformArray(!0, cJ),
                        cH(cJ, b._renderer.matrix, this._renderer.matrix),
                        this._renderer.scale instanceof e || (this._renderer.scale = new e()),
                        this._scale instanceof e
                            ? ((this._renderer.scale.x = this._scale.x), (this._renderer.scale.y = this._scale.y))
                            : ((this._renderer.scale.x = this._scale), (this._renderer.scale.y = this._scale)),
                        /renderer/i.test(b._renderer.type) ||
                            ((this._renderer.scale.x *= b._renderer.scale.x),
                            (this._renderer.scale.y *= b._renderer.scale.y)),
                        f && (this._flagMatrix = !0)),
                        this._mask &&
                            (a.clear(a.STENCIL_BUFFER_BIT),
                            a.enable(a.STENCIL_TEST),
                            a.stencilFunc(a.ALWAYS, 1, 0),
                            a.stencilOp(a.KEEP, a.KEEP, a.REPLACE),
                            a.colorMask(!1, !1, !1, !1),
                            u[this._mask._renderer.type].render.call(this._mask, a, d, this),
                            a.stencilFunc(a.EQUAL, 1, 255),
                            a.stencilOp(a.KEEP, a.KEEP, a.KEEP),
                            a.colorMask(!0, !0, !0, !0)),
                        (this._flagOpacity = b._flagOpacity || this._flagOpacity),
                        (this._renderer.opacity = this._opacity * (b && b._renderer ? b._renderer.opacity : 1));
                    let c;
                    if (this._flagSubtractions)
                        for (c = 0; c < this.subtractions.length; c++) u.group.removeChild(this.subtractions[c], a);
                    for (c = 0; c < this.children.length; c++) {
                        let g = this.children[c];
                        u[g._renderer.type].render.call(g, a, d);
                    }
                    return this._mask && a.disable(a.STENCIL_TEST), this.flagReset();
                },
            },
            path: {
                updateCanvas: function (c) {
                    let z,
                        g,
                        h,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r,
                        _,
                        j,
                        v,
                        s = c._renderer.vertices,
                        w = this.canvas,
                        a = this.ctx,
                        x = c._renderer.scale,
                        d = c._stroke,
                        A = c._linewidth,
                        f = c._fill,
                        C = c._renderer.opacity || c._opacity,
                        D = c._cap,
                        E = c._join,
                        F = c._miter,
                        t = c._closed,
                        y = c.dashes,
                        B = s.length,
                        Q = B - 1;
                    (w.width = Math.max(Math.ceil(c._renderer.rect.width * x.x), 1)),
                        (w.height = Math.max(Math.ceil(c._renderer.rect.height * x.y), 1));
                    let G = c._renderer.rect.centroid,
                        R = G.x,
                        S = G.y;
                    a.clearRect(0, 0, w.width, w.height),
                        f &&
                            ("string" == typeof f
                                ? (a.fillStyle = f)
                                : (u[f._renderer.type].render.call(f, a, c), (a.fillStyle = f._renderer.effect))),
                        d &&
                            ("string" == typeof d
                                ? (a.strokeStyle = d)
                                : (u[d._renderer.type].render.call(d, a, c), (a.strokeStyle = d._renderer.effect)),
                            A && (a.lineWidth = A),
                            F && (a.miterLimit = F),
                            E && (a.lineJoin = E),
                            !t && D && (a.lineCap = D)),
                        "number" == typeof C && (a.globalAlpha = C),
                        y && y.length > 0 && ((a.lineDashOffset = y.offset || 0), a.setLineDash(y));
                    let H, I, J, K, L, M, N, P;
                    a.save(), a.scale(x.x, x.y), a.translate(R, S), a.beginPath();
                    for (let i = 0; i < s.length; i++) {
                        let b = s[i];
                        switch (((_ = b.x), (j = b.y), b.command)) {
                            case O.close:
                                a.closePath();
                                break;
                            case O.arc:
                                (I = b.rx),
                                    (J = b.ry),
                                    (K = b.xAxisRotation),
                                    (L = b.largeArcFlag),
                                    (M = b.sweepFlag),
                                    (z = t ? aQ(i - 1, B) : Math.max(i - 1, 0)),
                                    (g = s[z]),
                                    (N = g.x),
                                    (P = g.y),
                                    cK.renderSvgArcCommand(a, N, P, I, J, L, M, K, _, j);
                                break;
                            case O.curve:
                                (o =
                                    ((g = s[(z = t ? aQ(i - 1, B) : Math.max(i - 1, 0))]).controls &&
                                        g.controls.right) ||
                                    e.zero),
                                    (p = (b.controls && b.controls.left) || e.zero),
                                    g._relative ? ((m = o.x + g.x), (n = o.y + g.y)) : ((m = o.x), (n = o.y)),
                                    b._relative ? ((k = p.x + b.x), (l = p.y + b.y)) : ((k = p.x), (l = p.y)),
                                    a.bezierCurveTo(m, n, k, l, _, j),
                                    i >= Q &&
                                        t &&
                                        ((h = H),
                                        (q = (b.controls && b.controls.right) || e.zero),
                                        (r = (h.controls && h.controls.left) || e.zero),
                                        b._relative ? ((m = q.x + b.x), (n = q.y + b.y)) : ((m = q.x), (n = q.y)),
                                        h._relative ? ((k = r.x + h.x), (l = r.y + h.y)) : ((k = r.x), (l = r.y)),
                                        (_ = h.x),
                                        (j = h.y),
                                        a.bezierCurveTo(m, n, k, l, _, j));
                                break;
                            case O.line:
                                a.lineTo(_, j);
                                break;
                            case O.move:
                                (H = b), a.moveTo(_, j);
                        }
                    }
                    t && a.closePath(),
                        u.isHidden.test(f) ||
                            ((v = f._renderer && f._renderer.offset) &&
                                (a.save(),
                                a.translate(-f._renderer.offset.x, -f._renderer.offset.y),
                                a.scale(f._renderer.scale.x, f._renderer.scale.y)),
                            a.fill(),
                            v && a.restore()),
                        u.isHidden.test(d) ||
                            ((v = d._renderer && d._renderer.offset) &&
                                (a.save(),
                                a.translate(-d._renderer.offset.x, -d._renderer.offset.y),
                                a.scale(d._renderer.scale.x, d._renderer.scale.y),
                                (a.lineWidth = A / d._renderer.scale.x)),
                            a.stroke(),
                            v && a.restore()),
                        a.restore();
                },
                getBoundingClientRect: function (i, b, a) {
                    let c = 1 / 0,
                        e = -1 / 0,
                        d = 1 / 0,
                        f = -1 / 0,
                        g,
                        h;
                    i.forEach(function (a) {
                        let h = a.x,
                            i = a.y,
                            _ = a.controls,
                            j,
                            k,
                            l,
                            m,
                            b,
                            g;
                        (d = Math.min(i, d)),
                            (c = Math.min(h, c)),
                            (e = Math.max(h, e)),
                            (f = Math.max(i, f)),
                            a.controls &&
                                ((b = _.left),
                                (g = _.right),
                                b &&
                                    g &&
                                    ((j = a._relative ? b.x + h : b.x),
                                    (k = a._relative ? b.y + i : b.y),
                                    (l = a._relative ? g.x + h : g.x),
                                    (m = a._relative ? g.y + i : g.y),
                                    j &&
                                        k &&
                                        l &&
                                        m &&
                                        ((d = Math.min(k, m, d)),
                                        (c = Math.min(j, l, c)),
                                        (e = Math.max(j, l, e)),
                                        (f = Math.max(k, m, f)))));
                    }),
                        "number" == typeof b && ((d -= b), (c -= b), (e += b), (f += b)),
                        (g = e - c),
                        (h = f - d),
                        (a.top = d),
                        (a.left = c),
                        (a.right = e),
                        (a.bottom = f),
                        (a.width = g),
                        (a.height = h),
                        a.centroid || (a.centroid = {}),
                        (a.centroid.x = -c),
                        (a.centroid.y = -d);
                },
                render: function (a, b, g) {
                    if (!this._visible || !this._opacity) return this;
                    this._update();
                    let c = g || this.parent,
                        d = b[this._renderer.type],
                        j = c._matrix.manual || c._flagMatrix,
                        k = this._matrix.manual || this._flagMatrix,
                        h = this._renderer.parent !== c,
                        l =
                            this._flagVertices ||
                            this._flagFill ||
                            (this._fill instanceof p &&
                                (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints)) ||
                            (this._fill instanceof q &&
                                (this._fill._flagSpread ||
                                    this._fill._flagStops ||
                                    this._fill._flagRadius ||
                                    this._fill._flagCenter ||
                                    this._fill._flagFocal)) ||
                            (this._fill instanceof i &&
                                ((this._fill._flagLoaded && this._fill.loaded) ||
                                    this._fill._flagImage ||
                                    this._fill._flagVideo ||
                                    this._fill._flagRepeat ||
                                    this._fill._flagOffset ||
                                    this._fill._flagScale)) ||
                            (this._stroke instanceof p &&
                                (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints)) ||
                            (this._stroke instanceof q &&
                                (this._stroke._flagSpread ||
                                    this._stroke._flagStops ||
                                    this._stroke._flagRadius ||
                                    this._stroke._flagCenter ||
                                    this._stroke._flagFocal)) ||
                            (this._stroke instanceof i &&
                                ((this._stroke._flagLoaded && this._stroke.loaded) ||
                                    this._stroke._flagImage ||
                                    this._stroke._flagVideo ||
                                    this._stroke._flagRepeat ||
                                    this._stroke._flagOffset ||
                                    this._fill._flagScale)) ||
                            this._flagStroke ||
                            this._flagLinewidth ||
                            this._flagOpacity ||
                            c._flagOpacity ||
                            this._flagVisible ||
                            this._flagCap ||
                            this._flagJoin ||
                            this._flagMiter ||
                            this._flagScale ||
                            (this.dashes && this.dashes.length > 0) ||
                            !this._renderer.texture;
                    if (
                        ((j || k || h) &&
                            (this._renderer.matrix || (this._renderer.matrix = new x(9)),
                            this._matrix.toTransformArray(!0, cJ),
                            cH(cJ, c._renderer.matrix, this._renderer.matrix),
                            this._renderer.scale instanceof e || (this._renderer.scale = new e()),
                            this._scale instanceof e
                                ? ((this._renderer.scale.x = this._scale.x * c._renderer.scale.x),
                                  (this._renderer.scale.y = this._scale.y * c._renderer.scale.y))
                                : ((this._renderer.scale.x = this._scale * c._renderer.scale.x),
                                  (this._renderer.scale.y = this._scale * c._renderer.scale.y)),
                            h && (this._renderer.parent = c)),
                        this._mask &&
                            (a.clear(a.STENCIL_BUFFER_BIT),
                            a.enable(a.STENCIL_TEST),
                            a.stencilFunc(a.ALWAYS, 1, 0),
                            a.stencilOp(a.KEEP, a.KEEP, a.REPLACE),
                            a.colorMask(!1, !1, !1, !1),
                            u[this._mask._renderer.type].render.call(this._mask, a, b, this),
                            a.stencilFunc(a.EQUAL, 1, 255),
                            a.stencilOp(a.KEEP, a.KEEP, a.KEEP),
                            a.colorMask(!0, !0, !0, !0)),
                        l
                            ? (this._renderer.rect || (this._renderer.rect = {}),
                              (this._renderer.opacity = this._opacity * c._renderer.opacity),
                              u.path.getBoundingClientRect(
                                  this._renderer.vertices,
                                  this._linewidth,
                                  this._renderer.rect
                              ),
                              u.updateTexture.call(u, a, this))
                            : (this._fill && this._fill._update && this._fill._update(),
                              this._stroke && this._stroke._update && this._stroke._update()),
                        (this._clip && !g) || !this._renderer.texture)
                    )
                        return this;
                    b.current !== d &&
                        (a.useProgram(d),
                        a.bindBuffer(a.ARRAY_BUFFER, b.buffers.position),
                        a.vertexAttribPointer(d.position, 2, a.FLOAT, !1, 0, 0),
                        a.enableVertexAttribArray(d.position),
                        a.bufferData(a.ARRAY_BUFFER, cL, a.STATIC_DRAW),
                        b.resolution.flagged ||
                            a.uniform2f(
                                a.getUniformLocation(d, "u_resolution"),
                                b.resolution.width,
                                b.resolution.height
                            ),
                        (b.current = d)),
                        b.resolution.flagged &&
                            a.uniform2f(
                                a.getUniformLocation(d, "u_resolution"),
                                b.resolution.width,
                                b.resolution.height
                            ),
                        a.bindTexture(a.TEXTURE_2D, this._renderer.texture);
                    let f = this._renderer.rect;
                    return (
                        a.uniformMatrix3fv(d.matrix, !1, this._renderer.matrix),
                        a.uniform4f(d.rect, f.left, f.top, f.right, f.bottom),
                        a.drawArrays(a.TRIANGLES, 0, 6),
                        this._mask && a.disable(a.STENCIL_TEST),
                        this.flagReset()
                    );
                },
            },
            points: {
                updateCanvas: function (d) {
                    let f,
                        e = this.canvas,
                        a = this.ctx,
                        b = d._stroke,
                        g = d._linewidth,
                        c = d._fill,
                        j = d._renderer.opacity || d._opacity,
                        h = d.dashes,
                        k = d._size,
                        i = k;
                    u.isHidden.test(b) || (i += g), (e.width = aP(i)), (e.height = e.width);
                    let l = i / e.width,
                        _ = e.width / 2,
                        m = e.height / 2;
                    a.clearRect(0, 0, e.width, e.height),
                        c &&
                            ("string" == typeof c
                                ? (a.fillStyle = c)
                                : (u[c._renderer.type].render.call(c, a, d), (a.fillStyle = c._renderer.effect))),
                        b &&
                            ("string" == typeof b
                                ? (a.strokeStyle = b)
                                : (u[b._renderer.type].render.call(b, a, d), (a.strokeStyle = b._renderer.effect)),
                            g && (a.lineWidth = g / l)),
                        "number" == typeof j && (a.globalAlpha = j),
                        h && h.length > 0 && ((a.lineDashOffset = h.offset || 0), a.setLineDash(h)),
                        a.save(),
                        a.translate(_, m),
                        a.scale(u.precision, u.precision),
                        a.beginPath(),
                        a.arc(0, 0, (k / l) * 0.5, 0, aK),
                        a.restore(),
                        closed && a.closePath(),
                        u.isHidden.test(c) ||
                            ((f = c._renderer && c._renderer.offset) &&
                                (a.save(),
                                a.translate(-c._renderer.offset.x, -c._renderer.offset.y),
                                a.scale(c._renderer.scale.x, c._renderer.scale.y)),
                            a.fill(),
                            f && a.restore()),
                        u.isHidden.test(b) ||
                            ((f = b._renderer && b._renderer.offset) &&
                                (a.save(),
                                a.translate(-b._renderer.offset.x, -b._renderer.offset.y),
                                a.scale(b._renderer.scale.x, b._renderer.scale.y),
                                (a.lineWidth = g / b._renderer.scale.x)),
                            a.stroke(),
                            f && a.restore());
                },
                render: function (a, c, g) {
                    if (!this._visible || !this._opacity) return this;
                    this._update();
                    let f = this._size,
                        b = g || this.parent,
                        d = c[this._renderer.type],
                        k = this._sizeAttenuation,
                        l = this._stroke,
                        m = this._linewidth,
                        n = b._matrix.manual || b._flagMatrix,
                        o = this._matrix.manual || this._flagMatrix,
                        h = this._renderer.parent !== b,
                        _ = this._renderer.vertices,
                        r = this._renderer.collection.length,
                        s = this._flagVertices,
                        t =
                            this._flagFill ||
                            (this._fill instanceof p &&
                                (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints)) ||
                            (this._fill instanceof q &&
                                (this._fill._flagSpread ||
                                    this._fill._flagStops ||
                                    this._fill._flagRadius ||
                                    this._fill._flagCenter ||
                                    this._fill._flagFocal)) ||
                            (this._fill instanceof i &&
                                ((this._fill._flagLoaded && this._fill.loaded) ||
                                    this._fill._flagImage ||
                                    this._fill._flagVideo ||
                                    this._fill._flagRepeat ||
                                    this._fill._flagOffset ||
                                    this._fill._flagScale)) ||
                            (this._stroke instanceof p &&
                                (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints)) ||
                            (this._stroke instanceof q &&
                                (this._stroke._flagSpread ||
                                    this._stroke._flagStops ||
                                    this._stroke._flagRadius ||
                                    this._stroke._flagCenter ||
                                    this._stroke._flagFocal)) ||
                            (this._stroke instanceof i &&
                                ((this._stroke._flagLoaded && this._stroke.loaded) ||
                                    this._stroke._flagImage ||
                                    this._stroke._flagVideo ||
                                    this._stroke._flagRepeat ||
                                    this._stroke._flagOffset ||
                                    this._fill._flagScale)) ||
                            this._flagStroke ||
                            this._flagLinewidth ||
                            this._flagOpacity ||
                            b._flagOpacity ||
                            this._flagVisible ||
                            this._flagScale ||
                            (this.dashes && this.dashes.length > 0) ||
                            !this._renderer.texture;
                    if (
                        ((n || o || h) &&
                            (this._renderer.matrix || (this._renderer.matrix = new x(9)),
                            this._matrix.toTransformArray(!0, cJ),
                            cH(cJ, b._renderer.matrix, this._renderer.matrix),
                            this._renderer.scale instanceof e || (this._renderer.scale = new e()),
                            this._scale instanceof e
                                ? ((this._renderer.scale.x = this._scale.x * b._renderer.scale.x),
                                  (this._renderer.scale.y = this._scale.y * b._renderer.scale.y))
                                : ((this._renderer.scale.x = this._scale * b._renderer.scale.x),
                                  (this._renderer.scale.y = this._scale * b._renderer.scale.y)),
                            h && (this._renderer.parent = b)),
                        s)
                    ) {
                        let j = this._renderer.positionBuffer;
                        j && a.deleteBuffer(j),
                            (this._renderer.positionBuffer = a.createBuffer()),
                            a.bindBuffer(a.ARRAY_BUFFER, this._renderer.positionBuffer),
                            a.vertexAttribPointer(d.position, 2, a.FLOAT, !1, 0, 0),
                            a.enableVertexAttribArray(d.position),
                            a.bufferData(a.ARRAY_BUFFER, _, a.STATIC_DRAW);
                    }
                    return (
                        t
                            ? ((this._renderer.opacity = this._opacity * b._renderer.opacity),
                              u.updateTexture.call(u, a, this))
                            : (this._fill && this._fill._update && this._fill._update(),
                              this._stroke && this._stroke._update && this._stroke._update()),
                        (!this._clip || g) && this._renderer.texture
                            ? (u.isHidden.test(l) || (f += m),
                              (f /= u.precision),
                              k && (f *= Math.max(this._renderer.scale.x, this._renderer.scale.y)),
                              c.current !== d &&
                                  (a.useProgram(d),
                                  c.resolution.flagged ||
                                      a.uniform2f(
                                          a.getUniformLocation(d, "u_resolution"),
                                          c.resolution.width,
                                          c.resolution.height
                                      ),
                                  (c.current = d)),
                              c.resolution.flagged &&
                                  a.uniform2f(
                                      a.getUniformLocation(d, "u_resolution"),
                                      c.resolution.width,
                                      c.resolution.height
                                  ),
                              a.bindTexture(a.TEXTURE_2D, this._renderer.texture),
                              a.uniformMatrix3fv(d.matrix, !1, this._renderer.matrix),
                              a.uniform1f(d.size, f * c.resolution.ratio),
                              a.drawArrays(a.POINTS, 0, r),
                              this.flagReset())
                            : this
                    );
                },
            },
            text: {
                updateCanvas: function (b) {
                    let f = this.canvas,
                        a = this.ctx,
                        e = b._renderer.scale,
                        c = b._stroke,
                        o = b._linewidth * e,
                        d = b._fill,
                        r = b._renderer.opacity || b._opacity,
                        g = b.dashes,
                        s = b._decoration;
                    (f.width = Math.max(Math.ceil(b._renderer.rect.width * e.x), 1)),
                        (f.height = Math.max(Math.ceil(b._renderer.rect.height * e.y), 1));
                    let t = b._renderer.rect.centroid,
                        y = t.x,
                        _ = t.y,
                        h,
                        i,
                        j,
                        k,
                        v,
                        l,
                        m,
                        w,
                        p,
                        x,
                        q,
                        z = d._renderer && d._renderer.offset && c._renderer && c._renderer.offset;
                    if (
                        (a.clearRect(0, 0, f.width, f.height),
                        z || (a.font = [b._style, b._weight, b._size + "px/" + b._leading + "px", b._family].join(" ")),
                        (a.textAlign = "center"),
                        (a.textBaseline = "middle"),
                        d &&
                            ("string" == typeof d
                                ? (a.fillStyle = d)
                                : (u[d._renderer.type].render.call(d, a, b), (a.fillStyle = d._renderer.effect))),
                        c &&
                            ("string" == typeof c
                                ? (a.strokeStyle = c)
                                : (u[c._renderer.type].render.call(c, a, b), (a.strokeStyle = c._renderer.effect)),
                            o && (a.lineWidth = o)),
                        "number" == typeof r && (a.globalAlpha = r),
                        g && g.length > 0 && ((a.lineDashOffset = g.offset || 0), a.setLineDash(g)),
                        a.save(),
                        a.scale(e.x, e.y),
                        a.translate(y, _),
                        u.isHidden.test(d) ||
                            (d._renderer && d._renderer.offset
                                ? ((l = d._renderer.scale.x),
                                  (m = d._renderer.scale.y),
                                  a.save(),
                                  a.translate(-d._renderer.offset.x, -d._renderer.offset.y),
                                  a.scale(l, m),
                                  (h = b._size / d._renderer.scale.y),
                                  (i = b._leading / d._renderer.scale.y),
                                  (a.font = [b._style, b._weight, h + "px/", i + "px", b._family].join(" ")),
                                  (j = d._renderer.offset.x / d._renderer.scale.x),
                                  (k = d._renderer.offset.y / d._renderer.scale.y),
                                  a.fillText(b.value, j, k),
                                  a.restore())
                                : a.fillText(b.value, 0, 0)),
                        u.isHidden.test(c) ||
                            (c._renderer && c._renderer.offset
                                ? ((l = c._renderer.scale.x),
                                  (m = c._renderer.scale.y),
                                  a.save(),
                                  a.translate(-c._renderer.offset.x, -c._renderer.offset.y),
                                  a.scale(l, m),
                                  (h = b._size / c._renderer.scale.y),
                                  (i = b._leading / c._renderer.scale.y),
                                  (a.font = [b._style, b._weight, h + "px/", i + "px", b._family].join(" ")),
                                  (j = c._renderer.offset.x / c._renderer.scale.x),
                                  (k = c._renderer.offset.y / c._renderer.scale.y),
                                  (v = o / c._renderer.scale.x),
                                  (a.lineWidth = v),
                                  a.strokeText(b.value, j, k),
                                  a.restore())
                                : a.strokeText(b.value, 0, 0)),
                        /(underline|strikethrough)/i.test(s))
                    ) {
                        let n = a.measureText(b.value);
                        switch (s) {
                            case "underline":
                                (p = n.actualBoundingBoxAscent), (q = n.actualBoundingBoxAscent);
                                break;
                            case "strikethrough":
                                (p = 0), (q = 0);
                        }
                        (w = -n.width / 2),
                            (x = n.width / 2),
                            (a.lineWidth = Math.max(Math.floor(b._size / 15), 1)),
                            (a.strokeStyle = a.fillStyle),
                            a.beginPath(),
                            a.moveTo(w, p),
                            a.lineTo(x, q),
                            a.stroke();
                    }
                    a.restore();
                },
                getBoundingClientRect: function (b, a) {
                    let e = u.ctx;
                    (e.font = [b._style, b._weight, b._size + "px/" + b._leading + "px", b._family].join(" ")),
                        (e.textAlign = "center"),
                        (e.textBaseline = b._baseline);
                    let c = 1.25 * e.measureText(b._value).width,
                        d = 1.25 * Math.max(b._size, b._leading);
                    this._linewidth &&
                        !u.isHidden.test(this._stroke) &&
                        ((c += 2 * this._linewidth), (d += 2 * this._linewidth));
                    let f = c / 2,
                        g = d / 2;
                    switch (u.alignments[b._alignment] || b._alignment) {
                        case u.alignments.left:
                            (a.left = 0), (a.right = c);
                            break;
                        case u.alignments.right:
                            (a.left = -c), (a.right = 0);
                            break;
                        default:
                            (a.left = -f), (a.right = f);
                    }
                    switch (b._baseline) {
                        case "bottom":
                            (a.top = -d), (a.bottom = 0);
                            break;
                        case "top":
                            (a.top = 0), (a.bottom = d);
                            break;
                        default:
                            (a.top = -g), (a.bottom = g);
                    }
                    (a.width = c),
                        (a.height = d),
                        a.centroid || (a.centroid = {}),
                        (a.centroid.x = f),
                        (a.centroid.y = g);
                },
                render: function (a, b, g) {
                    if (!this._visible || !this._opacity) return this;
                    this._update();
                    let c = g || this.parent,
                        d = b[this._renderer.type],
                        j = c._matrix.manual || c._flagMatrix,
                        k = this._matrix.manual || this._flagMatrix,
                        h = this._renderer.parent !== c,
                        l =
                            this._flagVertices ||
                            this._flagFill ||
                            (this._fill instanceof p &&
                                (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints)) ||
                            (this._fill instanceof q &&
                                (this._fill._flagSpread ||
                                    this._fill._flagStops ||
                                    this._fill._flagRadius ||
                                    this._fill._flagCenter ||
                                    this._fill._flagFocal)) ||
                            (this._fill instanceof i &&
                                ((this._fill._flagLoaded && this._fill.loaded) ||
                                    this._fill._flagImage ||
                                    this._fill._flagVideo ||
                                    this._fill._flagRepeat ||
                                    this._fill._flagOffset ||
                                    this._fill._flagScale)) ||
                            (this._stroke instanceof p &&
                                (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints)) ||
                            (this._stroke instanceof q &&
                                (this._stroke._flagSpread ||
                                    this._stroke._flagStops ||
                                    this._stroke._flagRadius ||
                                    this._stroke._flagCenter ||
                                    this._stroke._flagFocal)) ||
                            (this._stroke instanceof i &&
                                ((this._stroke._flagLoaded && this._stroke.loaded) ||
                                    this._stroke._flagImage ||
                                    this._stroke._flagVideo ||
                                    this._stroke._flagRepeat ||
                                    this._stroke._flagOffset ||
                                    this._fill._flagScale)) ||
                            this._flagStroke ||
                            this._flagLinewidth ||
                            this._flagOpacity ||
                            c._flagOpacity ||
                            this._flagVisible ||
                            this._flagScale ||
                            this._flagValue ||
                            this._flagFamily ||
                            this._flagSize ||
                            this._flagLeading ||
                            this._flagAlignment ||
                            this._flagBaseline ||
                            this._flagStyle ||
                            this._flagWeight ||
                            this._flagDecoration ||
                            (this.dashes && this.dashes.length > 0) ||
                            !this._renderer.texture;
                    if (
                        ((j || k || h) &&
                            (this._renderer.matrix || (this._renderer.matrix = new x(9)),
                            this._matrix.toTransformArray(!0, cJ),
                            cH(cJ, c._renderer.matrix, this._renderer.matrix),
                            this._renderer.scale instanceof e || (this._renderer.scale = new e()),
                            this._scale instanceof e
                                ? ((this._renderer.scale.x = this._scale.x * c._renderer.scale.x),
                                  (this._renderer.scale.y = this._scale.y * c._renderer.scale.y))
                                : ((this._renderer.scale.x = this._scale * c._renderer.scale.x),
                                  (this._renderer.scale.y = this._scale * c._renderer.scale.y)),
                            h && (this._renderer.parent = c)),
                        this._mask &&
                            (a.clear(a.STENCIL_BUFFER_BIT),
                            a.enable(a.STENCIL_TEST),
                            a.stencilFunc(a.ALWAYS, 1, 0),
                            a.stencilOp(a.KEEP, a.KEEP, a.REPLACE),
                            a.colorMask(!1, !1, !1, !1),
                            u[this._mask._renderer.type].render.call(this._mask, a, b, this),
                            a.stencilFunc(a.EQUAL, 1, 255),
                            a.stencilOp(a.KEEP, a.KEEP, a.KEEP),
                            a.colorMask(!0, !0, !0, !0)),
                        l
                            ? (this._renderer.rect || (this._renderer.rect = {}),
                              (this._renderer.opacity = this._opacity * c._renderer.opacity),
                              u.text.getBoundingClientRect(this, this._renderer.rect),
                              u.updateTexture.call(u, a, this))
                            : (this._fill && this._fill._update && this._fill._update(),
                              this._stroke && this._stroke._update && this._stroke._update()),
                        (this._clip && !g) || !this._renderer.texture)
                    )
                        return this;
                    b.current !== d &&
                        (a.useProgram(d),
                        a.bindBuffer(a.ARRAY_BUFFER, b.buffers.position),
                        a.vertexAttribPointer(d.position, 2, a.FLOAT, !1, 0, 0),
                        a.enableVertexAttribArray(d.position),
                        a.bufferData(a.ARRAY_BUFFER, cL, a.STATIC_DRAW),
                        b.resolution.flagged ||
                            a.uniform2f(
                                a.getUniformLocation(d, "u_resolution"),
                                b.resolution.width,
                                b.resolution.height
                            ),
                        (b.current = d)),
                        b.resolution.flagged &&
                            a.uniform2f(
                                a.getUniformLocation(d, "u_resolution"),
                                b.resolution.width,
                                b.resolution.height
                            ),
                        a.bindTexture(a.TEXTURE_2D, this._renderer.texture);
                    let f = this._renderer.rect;
                    return (
                        a.uniformMatrix3fv(d.matrix, !1, this._renderer.matrix),
                        a.uniform4f(d.rect, f.left, f.top, f.right, f.bottom),
                        a.drawArrays(a.TRIANGLES, 0, 6),
                        this._mask && a.disable(a.STENCIL_TEST),
                        this.flagReset()
                    );
                },
            },
            "linear-gradient": {
                render: function (g, h) {
                    if (!(!g.canvas.getContext("2d") || !h)) {
                        if (
                            (this._update(),
                            !this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits)
                        ) {
                            let a,
                                b = this.left._x,
                                c = this.left._y,
                                d = this.right._x,
                                e = this.right._y;
                            /objectBoundingBox/i.test(this._units) &&
                                ((b = (b - 0.5) * (a = h.getBoundingClientRect(!0)).width),
                                (c = (c - 0.5) * a.height),
                                (d = (d - 0.5) * a.width),
                                (e = (e - 0.5) * a.height)),
                                (this._renderer.effect = g.createLinearGradient(b, c, d, e));
                            for (let f = 0; f < this.stops.length; f++) {
                                let i = this.stops[f];
                                this._renderer.effect.addColorStop(i._offset, i._color);
                            }
                        }
                        return this.flagReset();
                    }
                },
            },
            "radial-gradient": {
                render: function (g, h) {
                    if (!(!g.canvas.getContext("2d") || !h)) {
                        if (
                            (this._update(),
                            !this._renderer.effect ||
                                this._flagCenter ||
                                this._flagFocal ||
                                this._flagRadius ||
                                this._flagStops ||
                                this._flagUnits)
                        ) {
                            let a,
                                b = this.center._x,
                                c = this.center._y,
                                d = this.focal._x,
                                e = this.focal._y,
                                i = this._radius;
                            /objectBoundingBox/i.test(this._units) &&
                                ((b = b * (a = h.getBoundingClientRect(!0)).width * 0.5),
                                (c = c * a.height * 0.5),
                                (d = d * a.width * 0.5),
                                (e = e * a.height * 0.5),
                                (i *= 0.5 * Math.min(a.width, a.height))),
                                (this._renderer.effect = g.createRadialGradient(b, c, 0, d, e, i));
                            for (let f = 0; f < this.stops.length; f++) {
                                let j = this.stops[f];
                                this._renderer.effect.addColorStop(j._offset, j._color);
                            }
                        }
                        return this.flagReset();
                    }
                },
            },
            texture: {
                render: function (b, c) {
                    if (!b.canvas.getContext("2d")) return;
                    this._update();
                    let a = this.image;
                    if ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded)
                        this._renderer.effect = b.createPattern(a, this._repeat);
                    else if (!this._renderer.effect) return this.flagReset();
                    return (
                        (this._flagOffset || this._flagLoaded || this._flagScale) &&
                            (this._renderer.offset instanceof e || (this._renderer.offset = new e()),
                            (this._renderer.offset.x = -this._offset.x),
                            (this._renderer.offset.y = -this._offset.y),
                            a &&
                                ((this._renderer.offset.x += a.width / 2),
                                (this._renderer.offset.y += a.height / 2),
                                this._scale instanceof e
                                    ? ((this._renderer.offset.x *= this._scale.x),
                                      (this._renderer.offset.y *= this._scale.y))
                                    : ((this._renderer.offset.x *= this._scale),
                                      (this._renderer.offset.y *= this._scale)))),
                        (this._flagScale || this._flagLoaded) &&
                            (this._renderer.scale instanceof e || (this._renderer.scale = new e()),
                            this._scale instanceof e
                                ? this._renderer.scale.copy(this._scale)
                                : this._renderer.scale.set(this._scale, this._scale)),
                        this.flagReset()
                    );
                },
            },
            updateTexture: function (a, b) {
                if (
                    (this[b._renderer.type].updateCanvas.call(u, b), this.canvas.width <= 0 || this.canvas.height <= 0)
                ) {
                    b._renderer.texture && a.deleteTexture(b._renderer.texture), delete b._renderer.texture;
                    return;
                }
                b._renderer.texture || (b._renderer.texture = a.createTexture()),
                    a.bindTexture(a.TEXTURE_2D, b._renderer.texture),
                    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
                    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
                    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR),
                    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, this.canvas);
            },
            program: {
                create: function (a, d) {
                    let b, c;
                    if (
                        ((b = a.createProgram()),
                        z.each(d, function (c) {
                            a.attachShader(b, c);
                        }),
                        a.linkProgram(b),
                        !a.getProgramParameter(b, a.LINK_STATUS))
                    )
                        throw (
                            ((c = a.getProgramInfoLog(b)), a.deleteProgram(b), new aa("unable to link program: " + c))
                        );
                    return b;
                },
            },
            TextureRegistry: new n(),
        };
    u.ctx = u.canvas.getContext("2d");
    var L = class extends k {
        constructor(c) {
            super();
            let a, b, d, e;
            if (
                ((this.domElement = c.domElement || document.createElement("canvas")),
                "u" > typeof c.offscreenElement &&
                    ((u.canvas = c.offscreenElement), (u.ctx = u.canvas.getContext("2d"))),
                (this.scene = new l()),
                (this.scene.parent = this),
                (this._renderer = { type: "renderer", matrix: new x(cI), scale: 1, opacity: 1 }),
                (this._flagMatrix = !0),
                (c = z.defaults(c || {}, {
                    antialias: !1,
                    alpha: !0,
                    premultipliedAlpha: !0,
                    stencil: !0,
                    preserveDrawingBuffer: !0,
                    overdraw: !1,
                })),
                (this.overdraw = c.overdraw),
                (a = this.ctx =
                    this.domElement.getContext("webgl", c) || this.domElement.getContext("experimental-webgl", c)),
                !this.ctx)
            )
                throw new aa("unable to create a webgl context. Try using another renderer.");
            (d = cG.create(a, cG.path.vertex, cG.types.vertex)),
                (e = cG.create(a, cG.path.fragment, cG.types.fragment)),
                (this.programs = {
                    current: null,
                    buffers: { position: a.createBuffer() },
                    resolution: { width: 0, height: 0, ratio: 1, flagged: !1 },
                }),
                (b = this.programs.path = u.program.create(a, [d, e])),
                (this.programs.text = this.programs.path),
                (b.position = a.getAttribLocation(b, "a_position")),
                (b.matrix = a.getUniformLocation(b, "u_matrix")),
                (b.rect = a.getUniformLocation(b, "u_rect"));
            let f = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, f),
                a.vertexAttribPointer(b.position, 2, a.FLOAT, !1, 0, 0),
                a.enableVertexAttribArray(b.position),
                a.bufferData(a.ARRAY_BUFFER, cL, a.STATIC_DRAW),
                (d = cG.create(a, cG.points.vertex, cG.types.vertex)),
                (e = cG.create(a, cG.points.fragment, cG.types.fragment)),
                (b = this.programs.points = u.program.create(a, [d, e])),
                (b.position = a.getAttribLocation(b, "a_position")),
                (b.matrix = a.getUniformLocation(b, "u_matrix")),
                (b.size = a.getUniformLocation(b, "u_size")),
                a.enable(a.BLEND),
                a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
                a.blendEquation(a.FUNC_ADD),
                a.blendFunc(a.ONE, a.ONE_MINUS_SRC_ALPHA);
        }
        setSize(a, b, c) {
            let d,
                e,
                f = this.ctx;
            return (
                (this.width = a),
                (this.height = b),
                (this.ratio = typeof c > "u" ? R(f) : c),
                (this.domElement.width = a * this.ratio),
                (this.domElement.height = b * this.ratio),
                z.isObject(this.domElement.style) &&
                    z.extend(this.domElement.style, { width: a + "px", height: b + "px" }),
                (this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio),
                (this._flagMatrix = !0),
                (d = a * this.ratio),
                (e = b * this.ratio),
                f.viewport(0, 0, d, e),
                (this.programs.resolution.width = d),
                (this.programs.resolution.height = e),
                (this.programs.resolution.ratio = this.ratio),
                (this.programs.resolution.flagged = !0),
                this.trigger(k.Types.resize, a, b, c)
            );
        }
        render() {
            let a = this.ctx;
            return (
                this.overdraw || a.clear(a.COLOR_BUFFER_BIT),
                u.group.render.call(this.scene, a, this.programs),
                (this._flagMatrix = !1),
                (this.programs.resolution.flagged = !0),
                this
            );
        }
    };
    a(L, "Utils", u);
    var az = z.extend({ Error: aa, getRatio: R, read: ar, xhr: as }, z, Y, y, w),
        aA = class {
            _events = new k();
            get _bound() {
                return this._events._bound;
            }
            set _bound(a) {
                this._events._bound = a;
            }
            addEventListener() {
                return this._events.addEventListener.apply(this, arguments);
            }
            on() {
                return this._events.addEventListener.apply(this, arguments);
            }
            bind() {
                return this._events.addEventListener.apply(this, arguments);
            }
            removeEventListener() {
                return this._events.removeEventListener.apply(this, arguments);
            }
            off() {
                return this._events.removeEventListener.apply(this, arguments);
            }
            unbind() {
                return this._events.removeEventListener.apply(this, arguments);
            }
            dispatchEvent() {
                return this._events.dispatchEvent.apply(this, arguments);
            }
            trigger() {
                return this._events.dispatchEvent.apply(this, arguments);
            }
            listen() {
                return this._events.listen.apply(this, arguments);
            }
            ignore() {
                return this._events.ignore.apply(this, arguments);
            }
            type = "";
            renderer = null;
            scene = null;
            width = 0;
            height = 0;
            frameCount = 0;
            timeDelta = 0;
            playing = !1;
            constructor(c) {
                let a = z.defaults(c || {}, {
                    fullscreen: !1,
                    fitted: !1,
                    width: 640,
                    height: 480,
                    type: aA.Types.svg,
                    autostart: !1,
                });
                if (
                    (z.each(
                        a,
                        function (b, a) {
                            /fullscreen/i.test(a) || /autostart/i.test(a) || (this[a] = b);
                        },
                        this
                    ),
                    z.isElement(a.domElement))
                ) {
                    let b = a.domElement.tagName.toLowerCase();
                    /^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + b) ||
                        (this.type = aA.Types[b]);
                }
                (this.renderer = new aA[this.type](this)),
                    this.setPlaying(a.autostart),
                    (this.frameCount = 0),
                    a.fullscreen
                        ? ((this.fit = cM.bind(this)),
                          (this.fit.domElement = window),
                          (this.fit.attached = !0),
                          z.extend(document.body.style, {
                              overflow: "hidden",
                              margin: 0,
                              padding: 0,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              position: "fixed",
                          }),
                          z.extend(this.renderer.domElement.style, {
                              display: "block",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              position: "fixed",
                          }),
                          A.bind(this.fit.domElement, "resize", this.fit),
                          this.fit())
                        : a.fitted
                        ? ((this.fit = cN.bind(this)), z.extend(this.renderer.domElement.style, { display: "block" }))
                        : z.isElement(a.domElement) ||
                          (this.renderer.setSize(a.width, a.height, this.ratio),
                          (this.width = a.width),
                          (this.height = a.height)),
                    this.renderer.bind(k.Types.resize, cO.bind(this)),
                    (this.scene = this.renderer.scene),
                    aA.Instances.push(this),
                    a.autostart && aB.init();
            }
            appendTo(a) {
                return (
                    a.appendChild(this.renderer.domElement),
                    this.fit &&
                        (this.fit.domElement !== window && ((this.fit.domElement = a), (this.fit.attached = !1)),
                        this.update()),
                    this
                );
            }
            play() {
                return (this.playing = !0), aB.init(), this.trigger(k.Types.play);
            }
            pause() {
                return (this.playing = !1), this.trigger(k.Types.pause);
            }
            setPlaying(a) {
                this.playing = a;
            }
            release(a) {
                let c, b, d;
                if (!z.isObject(a)) return this.release(this.scene);
                if (("function" == typeof a.unbind && a.unbind(), a.vertices))
                    for (
                        "function" == typeof a.vertices.unbind && a.vertices.unbind(), c = 0;
                        c < a.vertices.length;
                        c++
                    )
                        "function" == typeof (b = a.vertices[c]).unbind && b.unbind(),
                            b.controls &&
                                (b.controls.left &&
                                    "function" == typeof b.controls.left.unbind &&
                                    b.controls.left.unbind(),
                                b.controls.right &&
                                    "function" == typeof b.controls.right.unbind &&
                                    b.controls.right.unbind());
                if (a.children) {
                    for (c = 0; c < a.children.length; c++) (d = a.children[c]), this.release(d);
                    "function" == typeof a.children.unbind && a.children.unbind();
                }
                return a;
            }
            update() {
                let e = !!this._lastFrame,
                    b = z.performance.now();
                e && (this.timeDelta = parseFloat((b - this._lastFrame).toFixed(3))),
                    (this._lastFrame = b),
                    this.fit &&
                        this.fit.domElement &&
                        !this.fit.attached &&
                        (A.bind(this.fit.domElement, "resize", this.fit), (this.fit.attached = !0), this.fit());
                let c = this.width,
                    d = this.height,
                    a = this.renderer;
                return (
                    (c !== a.width || d !== a.height) && a.setSize(c, d, this.ratio),
                    this.trigger(k.Types.update, this.frameCount, this.timeDelta),
                    this.render()
                );
            }
            render() {
                return this.renderer.render(), this.trigger(k.Types.render, this.frameCount++);
            }
            add(a) {
                return a instanceof Array || (a = Array.prototype.slice.call(arguments)), this.scene.add(a), this;
            }
            remove(a) {
                return a instanceof Array || (a = Array.prototype.slice.call(arguments)), this.scene.remove(a), this;
            }
            clear() {
                return this.scene.remove(this.scene.children), this;
            }
            makeLine(b, c, d, e) {
                let a = new ao(b, c, d, e);
                return this.scene.add(a), a;
            }
            makeArrow(f, g, a, b, h) {
                let d = "number" == typeof h ? h : 10,
                    e = Math.atan2(b - g, a - f),
                    i = [
                        new Q(f, g, void 0, void 0, void 0, void 0, O.move),
                        new Q(a, b, void 0, void 0, void 0, void 0, O.line),
                        new Q(
                            a - d * Math.cos(e - Math.PI / 4),
                            b - d * Math.sin(e - Math.PI / 4),
                            void 0,
                            void 0,
                            void 0,
                            void 0,
                            O.line
                        ),
                        new Q(a, b, void 0, void 0, void 0, void 0, O.move),
                        new Q(
                            a - d * Math.cos(e + Math.PI / 4),
                            b - d * Math.sin(e + Math.PI / 4),
                            void 0,
                            void 0,
                            void 0,
                            void 0,
                            O.line
                        ),
                    ],
                    c = new r(i, !1, !1, !0);
                return c.noFill(), (c.cap = "round"), (c.join = "round"), this.scene.add(c), c;
            }
            makeRectangle(b, c, d, e) {
                let a = new B(b, c, d, e);
                return this.scene.add(a), a;
            }
            makeRoundedRectangle(b, c, d, e, f) {
                let a = new F(b, c, d, e, f);
                return this.scene.add(a), a;
            }
            makeCircle(b, c, d, e) {
                let a = new D(b, c, d, e);
                return this.scene.add(a), a;
            }
            makeEllipse(b, c, d, e, f) {
                let a = new E(b, c, d, e, f);
                return this.scene.add(a), a;
            }
            makeStar(b, c, d, e, f) {
                let a = new J(b, c, d, e, f);
                return this.scene.add(a), a;
            }
            makeCurve(a) {
                let e = arguments.length;
                if (!Array.isArray(a)) {
                    a = [];
                    for (let b = 0; b < e; b += 2) {
                        let f = arguments[b];
                        if ("number" != typeof f) break;
                        let h = arguments[b + 1];
                        a.push(new Q(f, h));
                    }
                }
                let g = arguments[e - 1],
                    c = new r(a, !("boolean" == typeof g && g), !0),
                    d = c.getBoundingClientRect();
                return c.center().translation.set(d.left + d.width / 2, d.top + d.height / 2), this.scene.add(c), c;
            }
            makePolygon(b, c, d, e) {
                let a = new I(b, c, d, e);
                return this.scene.add(a), a;
            }
            makeArcSegment(b, c, d, e, f, g, h) {
                let a = new G(b, c, d, e, f, g, h);
                return this.scene.add(a), a;
            }
            makePoints(c) {
                let g = arguments.length,
                    b = c;
                if (!Array.isArray(c)) {
                    b = [];
                    for (let a = 0; a < g; a += 2) {
                        let d = arguments[a];
                        if ("number" != typeof d) break;
                        let h = arguments[a + 1];
                        b.push(new e(d, h));
                    }
                }
                let f = new H(b);
                return this.scene.add(f), f;
            }
            makePath(e) {
                let f = arguments.length,
                    d = e;
                if (!Array.isArray(e)) {
                    d = [];
                    for (let b = 0; b < f; b += 2) {
                        let g = arguments[b];
                        if ("number" != typeof g) break;
                        let i = arguments[b + 1];
                        d.push(new Q(g, i));
                    }
                }
                let h = arguments[f - 1],
                    c = new r(d, !("boolean" == typeof h && h)),
                    a = c.getBoundingClientRect();
                return (
                    "number" == typeof a.top &&
                        "number" == typeof a.left &&
                        "number" == typeof a.right &&
                        "number" == typeof a.bottom &&
                        c.center().translation.set(a.left + a.width / 2, a.top + a.height / 2),
                    this.scene.add(c),
                    c
                );
            }
            makeText(b, c, d, e) {
                let a = new s(b, c, d, e);
                return this.add(a), a;
            }
            makeLinearGradient(b, c, d, e) {
                let f = Array.prototype.slice.call(arguments, 4),
                    a = new p(b, c, d, e, f);
                return this.add(a), a;
            }
            makeRadialGradient(b, c, d) {
                let e = Array.prototype.slice.call(arguments, 3),
                    a = new q(b, c, d, e);
                return this.add(a), a;
            }
            makeSprite(b, c, d, e, f, g, h) {
                let a = new C(b, c, d, e, f, g);
                return h && a.play(), this.add(a), a;
            }
            makeImageSequence(b, c, d, e, f) {
                let a = new t(b, c, d, e);
                return f && a.play(), this.add(a), a;
            }
            makeTexture(a, b) {
                return new i(a, b);
            }
            makeGroup(a) {
                a instanceof Array || (a = Array.prototype.slice.call(arguments));
                let b = new l();
                return this.scene.add(b), b.add(a), b;
            }
            interpret(c, e, b) {
                let d = c.tagName.toLowerCase();
                if (((b = !("u" > typeof b) || b), !(d in ar))) return null;
                let a = ar[d].call(this, c);
                return b ? this.add(e && a instanceof l ? a.children : a) : a.parent && a.remove(), a;
            }
            load(a, d) {
                let b = new l(),
                    e,
                    f,
                    g,
                    c = function (a) {
                        for (A.temp.innerHTML = a, f = 0; f < A.temp.children.length; f++)
                            (e = A.temp.children[f]), null !== (g = this.interpret(e, !1, !1)) && b.add(g);
                        "function" == typeof d &&
                            d(b, A.temp.children.length <= 1 ? A.temp.children[0] : A.temp.children);
                    }.bind(this);
                return /\.svg$/i.test(a) ? (as(a, c), b) : (c(a), b);
            }
        },
        b = aA;
    function cM() {
        let a = document.body.getBoundingClientRect(),
            b = (this.width = a.width),
            c = (this.height = a.height);
        this.renderer.setSize(b, c, this.ratio);
    }
    function cN() {
        let a = this.renderer.domElement.parentElement;
        if (!a) {
            console.warn("Two.js: Attempting to fit to parent, but no parent found.");
            return;
        }
        let b = a.getBoundingClientRect(),
            c = (this.width = b.width),
            d = (this.height = b.height);
        this.renderer.setSize(c, d, this.ratio);
    }
    function cO(a, b) {
        (this.width = a), (this.height = b), this.trigger(k.Types.resize, a, b);
    }
    a(b, "nextFrameID", d.nextFrameID),
        a(b, "Types", d.Types),
        a(b, "Version", d.Version),
        a(b, "PublishDate", d.PublishDate),
        a(b, "Identifier", d.Identifier),
        a(b, "Resolution", d.Resolution),
        a(b, "AutoCalculateImportedMatrices", d.AutoCalculateImportedMatrices),
        a(b, "Instances", d.Instances),
        a(b, "uniqueId", d.uniqueId),
        a(b, "Anchor", Q),
        a(b, "Collection", U),
        a(b, "Events", k),
        a(b, "Group", l),
        a(b, "Matrix", f),
        a(b, "Path", r),
        a(b, "Registry", n),
        a(b, "Shape", T),
        a(b, "Text", s),
        a(b, "Vector", e),
        a(b, "Gradient", o),
        a(b, "ImageSequence", t),
        a(b, "LinearGradient", p),
        a(b, "RadialGradient", q),
        a(b, "Sprite", C),
        a(b, "Stop", h),
        a(b, "Texture", i),
        a(b, "ArcSegment", G),
        a(b, "Circle", D),
        a(b, "Ellipse", E),
        a(b, "Line", ao),
        a(b, "Points", H),
        a(b, "Polygon", I),
        a(b, "Rectangle", B),
        a(b, "RoundedRectangle", F),
        a(b, "Star", J),
        a(b, "CanvasRenderer", m),
        a(b, "SVGRenderer", K),
        a(b, "WebGLRenderer", L),
        a(b, "Commands", O),
        a(b, "Utils", az);
    var aB = A.getRequestAnimationFrame();
    function cP() {
        for (let a = 0; a < b.Instances.length; a++) {
            let c = b.Instances[a];
            c.playing && c.update();
        }
        b.nextFrameID = aB(cP);
    }
    return (
        (aB.init = function () {
            cP(), (aB.init = function () {});
        }),
        N(v)
    );
})().default;

export default Two;
