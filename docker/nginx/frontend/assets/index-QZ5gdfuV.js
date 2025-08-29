(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) o(c);
  new MutationObserver((c) => {
    for (const f of c)
      if (f.type === 'childList')
        for (const h of f.addedNodes)
          h.tagName === 'LINK' && h.rel === 'modulepreload' && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(c) {
    const f = {};
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === 'use-credentials'
        ? (f.credentials = 'include')
        : c.crossOrigin === 'anonymous'
        ? (f.credentials = 'omit')
        : (f.credentials = 'same-origin'),
      f
    );
  }
  function o(c) {
    if (c.ep) return;
    c.ep = !0;
    const f = i(c);
    fetch(c.href, f);
  }
})();
function Ry(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, 'default')
    ? n.default
    : n;
}
var bu = { exports: {} },
  Ji = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Km;
function uS() {
  if (Km) return Ji;
  Km = 1;
  var n = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.fragment');
  function i(o, c, f) {
    var h = null;
    if (
      (f !== void 0 && (h = '' + f),
      c.key !== void 0 && (h = '' + c.key),
      'key' in c)
    ) {
      f = {};
      for (var m in c) m !== 'key' && (f[m] = c[m]);
    } else f = c;
    return (
      (c = f.ref),
      { $$typeof: n, type: o, key: h, ref: c !== void 0 ? c : null, props: f }
    );
  }
  return (Ji.Fragment = s), (Ji.jsx = i), (Ji.jsxs = i), Ji;
}
var Fm;
function fS() {
  return Fm || ((Fm = 1), (bu.exports = uS())), bu.exports;
}
var S = fS(),
  _u = { exports: {} },
  he = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ym;
function dS() {
  if (Ym) return he;
  Ym = 1;
  var n = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    i = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    c = Symbol.for('react.profiler'),
    f = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    m = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    d = Symbol.for('react.memo'),
    v = Symbol.for('react.lazy'),
    p = Symbol.iterator;
  function b(R) {
    return R === null || typeof R != 'object'
      ? null
      : ((R = (p && R[p]) || R['@@iterator']),
        typeof R == 'function' ? R : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    E = {};
  function M(R, P, ee) {
    (this.props = R),
      (this.context = P),
      (this.refs = E),
      (this.updater = ee || T);
  }
  (M.prototype.isReactComponent = {}),
    (M.prototype.setState = function (R, P) {
      if (typeof R != 'object' && typeof R != 'function' && R != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, R, P, 'setState');
    }),
    (M.prototype.forceUpdate = function (R) {
      this.updater.enqueueForceUpdate(this, R, 'forceUpdate');
    });
  function O() {}
  O.prototype = M.prototype;
  function L(R, P, ee) {
    (this.props = R),
      (this.context = P),
      (this.refs = E),
      (this.updater = ee || T);
  }
  var U = (L.prototype = new O());
  (U.constructor = L), w(U, M.prototype), (U.isPureReactComponent = !0);
  var G = Array.isArray,
    I = { H: null, A: null, T: null, S: null, V: null },
    Z = Object.prototype.hasOwnProperty;
  function Y(R, P, ee, J, re, de) {
    return (
      (ee = de.ref),
      {
        $$typeof: n,
        type: R,
        key: P,
        ref: ee !== void 0 ? ee : null,
        props: de,
      }
    );
  }
  function K(R, P) {
    return Y(R.type, P, void 0, void 0, void 0, R.props);
  }
  function X(R) {
    return typeof R == 'object' && R !== null && R.$$typeof === n;
  }
  function F(R) {
    var P = { '=': '=0', ':': '=2' };
    return (
      '$' +
      R.replace(/[=:]/g, function (ee) {
        return P[ee];
      })
    );
  }
  var ne = /\/+/g;
  function oe(R, P) {
    return typeof R == 'object' && R !== null && R.key != null
      ? F('' + R.key)
      : P.toString(36);
  }
  function me() {}
  function Se(R) {
    switch (R.status) {
      case 'fulfilled':
        return R.value;
      case 'rejected':
        throw R.reason;
      default:
        switch (
          (typeof R.status == 'string'
            ? R.then(me, me)
            : ((R.status = 'pending'),
              R.then(
                function (P) {
                  R.status === 'pending' &&
                    ((R.status = 'fulfilled'), (R.value = P));
                },
                function (P) {
                  R.status === 'pending' &&
                    ((R.status = 'rejected'), (R.reason = P));
                }
              )),
          R.status)
        ) {
          case 'fulfilled':
            return R.value;
          case 'rejected':
            throw R.reason;
        }
    }
    throw R;
  }
  function be(R, P, ee, J, re) {
    var de = typeof R;
    (de === 'undefined' || de === 'boolean') && (R = null);
    var le = !1;
    if (R === null) le = !0;
    else
      switch (de) {
        case 'bigint':
        case 'string':
        case 'number':
          le = !0;
          break;
        case 'object':
          switch (R.$$typeof) {
            case n:
            case s:
              le = !0;
              break;
            case v:
              return (le = R._init), be(le(R._payload), P, ee, J, re);
          }
      }
    if (le)
      return (
        (re = re(R)),
        (le = J === '' ? '.' + oe(R, 0) : J),
        G(re)
          ? ((ee = ''),
            le != null && (ee = le.replace(ne, '$&/') + '/'),
            be(re, P, ee, '', function (Ot) {
              return Ot;
            }))
          : re != null &&
            (X(re) &&
              (re = K(
                re,
                ee +
                  (re.key == null || (R && R.key === re.key)
                    ? ''
                    : ('' + re.key).replace(ne, '$&/') + '/') +
                  le
              )),
            P.push(re)),
        1
      );
    le = 0;
    var Je = J === '' ? '.' : J + ':';
    if (G(R))
      for (var Te = 0; Te < R.length; Te++)
        (J = R[Te]), (de = Je + oe(J, Te)), (le += be(J, P, ee, de, re));
    else if (((Te = b(R)), typeof Te == 'function'))
      for (R = Te.call(R), Te = 0; !(J = R.next()).done; )
        (J = J.value), (de = Je + oe(J, Te++)), (le += be(J, P, ee, de, re));
    else if (de === 'object') {
      if (typeof R.then == 'function') return be(Se(R), P, ee, J, re);
      throw (
        ((P = String(R)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (P === '[object Object]'
              ? 'object with keys {' + Object.keys(R).join(', ') + '}'
              : P) +
            '). If you meant to render a collection of children, use an array instead.'
        ))
      );
    }
    return le;
  }
  function C(R, P, ee) {
    if (R == null) return R;
    var J = [],
      re = 0;
    return (
      be(R, J, '', '', function (de) {
        return P.call(ee, de, re++);
      }),
      J
    );
  }
  function V(R) {
    if (R._status === -1) {
      var P = R._result;
      (P = P()),
        P.then(
          function (ee) {
            (R._status === 0 || R._status === -1) &&
              ((R._status = 1), (R._result = ee));
          },
          function (ee) {
            (R._status === 0 || R._status === -1) &&
              ((R._status = 2), (R._result = ee));
          }
        ),
        R._status === -1 && ((R._status = 0), (R._result = P));
    }
    if (R._status === 1) return R._result.default;
    throw R._result;
  }
  var W =
    typeof reportError == 'function'
      ? reportError
      : function (R) {
          if (
            typeof window == 'object' &&
            typeof window.ErrorEvent == 'function'
          ) {
            var P = new window.ErrorEvent('error', {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof R == 'object' &&
                R !== null &&
                typeof R.message == 'string'
                  ? String(R.message)
                  : String(R),
              error: R,
            });
            if (!window.dispatchEvent(P)) return;
          } else if (
            typeof process == 'object' &&
            typeof process.emit == 'function'
          ) {
            process.emit('uncaughtException', R);
            return;
          }
          console.error(R);
        };
  function ae() {}
  return (
    (he.Children = {
      map: C,
      forEach: function (R, P, ee) {
        C(
          R,
          function () {
            P.apply(this, arguments);
          },
          ee
        );
      },
      count: function (R) {
        var P = 0;
        return (
          C(R, function () {
            P++;
          }),
          P
        );
      },
      toArray: function (R) {
        return (
          C(R, function (P) {
            return P;
          }) || []
        );
      },
      only: function (R) {
        if (!X(R))
          throw Error(
            'React.Children.only expected to receive a single React element child.'
          );
        return R;
      },
    }),
    (he.Component = M),
    (he.Fragment = i),
    (he.Profiler = c),
    (he.PureComponent = L),
    (he.StrictMode = o),
    (he.Suspense = g),
    (he.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I),
    (he.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (R) {
        return I.H.useMemoCache(R);
      },
    }),
    (he.cache = function (R) {
      return function () {
        return R.apply(null, arguments);
      };
    }),
    (he.cloneElement = function (R, P, ee) {
      if (R == null)
        throw Error(
          'The argument must be a React element, but you passed ' + R + '.'
        );
      var J = w({}, R.props),
        re = R.key,
        de = void 0;
      if (P != null)
        for (le in (P.ref !== void 0 && (de = void 0),
        P.key !== void 0 && (re = '' + P.key),
        P))
          !Z.call(P, le) ||
            le === 'key' ||
            le === '__self' ||
            le === '__source' ||
            (le === 'ref' && P.ref === void 0) ||
            (J[le] = P[le]);
      var le = arguments.length - 2;
      if (le === 1) J.children = ee;
      else if (1 < le) {
        for (var Je = Array(le), Te = 0; Te < le; Te++)
          Je[Te] = arguments[Te + 2];
        J.children = Je;
      }
      return Y(R.type, re, void 0, void 0, de, J);
    }),
    (he.createContext = function (R) {
      return (
        (R = {
          $$typeof: h,
          _currentValue: R,
          _currentValue2: R,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (R.Provider = R),
        (R.Consumer = { $$typeof: f, _context: R }),
        R
      );
    }),
    (he.createElement = function (R, P, ee) {
      var J,
        re = {},
        de = null;
      if (P != null)
        for (J in (P.key !== void 0 && (de = '' + P.key), P))
          Z.call(P, J) &&
            J !== 'key' &&
            J !== '__self' &&
            J !== '__source' &&
            (re[J] = P[J]);
      var le = arguments.length - 2;
      if (le === 1) re.children = ee;
      else if (1 < le) {
        for (var Je = Array(le), Te = 0; Te < le; Te++)
          Je[Te] = arguments[Te + 2];
        re.children = Je;
      }
      if (R && R.defaultProps)
        for (J in ((le = R.defaultProps), le))
          re[J] === void 0 && (re[J] = le[J]);
      return Y(R, de, void 0, void 0, null, re);
    }),
    (he.createRef = function () {
      return { current: null };
    }),
    (he.forwardRef = function (R) {
      return { $$typeof: m, render: R };
    }),
    (he.isValidElement = X),
    (he.lazy = function (R) {
      return { $$typeof: v, _payload: { _status: -1, _result: R }, _init: V };
    }),
    (he.memo = function (R, P) {
      return { $$typeof: d, type: R, compare: P === void 0 ? null : P };
    }),
    (he.startTransition = function (R) {
      var P = I.T,
        ee = {};
      I.T = ee;
      try {
        var J = R(),
          re = I.S;
        re !== null && re(ee, J),
          typeof J == 'object' &&
            J !== null &&
            typeof J.then == 'function' &&
            J.then(ae, W);
      } catch (de) {
        W(de);
      } finally {
        I.T = P;
      }
    }),
    (he.unstable_useCacheRefresh = function () {
      return I.H.useCacheRefresh();
    }),
    (he.use = function (R) {
      return I.H.use(R);
    }),
    (he.useActionState = function (R, P, ee) {
      return I.H.useActionState(R, P, ee);
    }),
    (he.useCallback = function (R, P) {
      return I.H.useCallback(R, P);
    }),
    (he.useContext = function (R) {
      return I.H.useContext(R);
    }),
    (he.useDebugValue = function () {}),
    (he.useDeferredValue = function (R, P) {
      return I.H.useDeferredValue(R, P);
    }),
    (he.useEffect = function (R, P, ee) {
      var J = I.H;
      if (typeof ee == 'function')
        throw Error(
          'useEffect CRUD overload is not enabled in this build of React.'
        );
      return J.useEffect(R, P);
    }),
    (he.useId = function () {
      return I.H.useId();
    }),
    (he.useImperativeHandle = function (R, P, ee) {
      return I.H.useImperativeHandle(R, P, ee);
    }),
    (he.useInsertionEffect = function (R, P) {
      return I.H.useInsertionEffect(R, P);
    }),
    (he.useLayoutEffect = function (R, P) {
      return I.H.useLayoutEffect(R, P);
    }),
    (he.useMemo = function (R, P) {
      return I.H.useMemo(R, P);
    }),
    (he.useOptimistic = function (R, P) {
      return I.H.useOptimistic(R, P);
    }),
    (he.useReducer = function (R, P, ee) {
      return I.H.useReducer(R, P, ee);
    }),
    (he.useRef = function (R) {
      return I.H.useRef(R);
    }),
    (he.useState = function (R) {
      return I.H.useState(R);
    }),
    (he.useSyncExternalStore = function (R, P, ee) {
      return I.H.useSyncExternalStore(R, P, ee);
    }),
    (he.useTransition = function () {
      return I.H.useTransition();
    }),
    (he.version = '19.1.1'),
    he
  );
}
var Xm;
function Ka() {
  return Xm || ((Xm = 1), (_u.exports = dS())), _u.exports;
}
var z = Ka();
const an = Ry(z);
var wu = { exports: {} },
  er = {},
  Tu = { exports: {} },
  Eu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wm;
function hS() {
  return (
    Wm ||
      ((Wm = 1),
      (function (n) {
        function s(C, V) {
          var W = C.length;
          C.push(V);
          e: for (; 0 < W; ) {
            var ae = (W - 1) >>> 1,
              R = C[ae];
            if (0 < c(R, V)) (C[ae] = V), (C[W] = R), (W = ae);
            else break e;
          }
        }
        function i(C) {
          return C.length === 0 ? null : C[0];
        }
        function o(C) {
          if (C.length === 0) return null;
          var V = C[0],
            W = C.pop();
          if (W !== V) {
            C[0] = W;
            e: for (var ae = 0, R = C.length, P = R >>> 1; ae < P; ) {
              var ee = 2 * (ae + 1) - 1,
                J = C[ee],
                re = ee + 1,
                de = C[re];
              if (0 > c(J, W))
                re < R && 0 > c(de, J)
                  ? ((C[ae] = de), (C[re] = W), (ae = re))
                  : ((C[ae] = J), (C[ee] = W), (ae = ee));
              else if (re < R && 0 > c(de, W))
                (C[ae] = de), (C[re] = W), (ae = re);
              else break e;
            }
          }
          return V;
        }
        function c(C, V) {
          var W = C.sortIndex - V.sortIndex;
          return W !== 0 ? W : C.id - V.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == 'object' &&
            typeof performance.now == 'function')
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            m = h.now();
          n.unstable_now = function () {
            return h.now() - m;
          };
        }
        var g = [],
          d = [],
          v = 1,
          p = null,
          b = 3,
          T = !1,
          w = !1,
          E = !1,
          M = !1,
          O = typeof setTimeout == 'function' ? setTimeout : null,
          L = typeof clearTimeout == 'function' ? clearTimeout : null,
          U = typeof setImmediate < 'u' ? setImmediate : null;
        function G(C) {
          for (var V = i(d); V !== null; ) {
            if (V.callback === null) o(d);
            else if (V.startTime <= C)
              o(d), (V.sortIndex = V.expirationTime), s(g, V);
            else break;
            V = i(d);
          }
        }
        function I(C) {
          if (((E = !1), G(C), !w))
            if (i(g) !== null) (w = !0), Z || ((Z = !0), oe());
            else {
              var V = i(d);
              V !== null && be(I, V.startTime - C);
            }
        }
        var Z = !1,
          Y = -1,
          K = 5,
          X = -1;
        function F() {
          return M ? !0 : !(n.unstable_now() - X < K);
        }
        function ne() {
          if (((M = !1), Z)) {
            var C = n.unstable_now();
            X = C;
            var V = !0;
            try {
              e: {
                (w = !1), E && ((E = !1), L(Y), (Y = -1)), (T = !0);
                var W = b;
                try {
                  t: {
                    for (
                      G(C), p = i(g);
                      p !== null && !(p.expirationTime > C && F());

                    ) {
                      var ae = p.callback;
                      if (typeof ae == 'function') {
                        (p.callback = null), (b = p.priorityLevel);
                        var R = ae(p.expirationTime <= C);
                        if (((C = n.unstable_now()), typeof R == 'function')) {
                          (p.callback = R), G(C), (V = !0);
                          break t;
                        }
                        p === i(g) && o(g), G(C);
                      } else o(g);
                      p = i(g);
                    }
                    if (p !== null) V = !0;
                    else {
                      var P = i(d);
                      P !== null && be(I, P.startTime - C), (V = !1);
                    }
                  }
                  break e;
                } finally {
                  (p = null), (b = W), (T = !1);
                }
                V = void 0;
              }
            } finally {
              V ? oe() : (Z = !1);
            }
          }
        }
        var oe;
        if (typeof U == 'function')
          oe = function () {
            U(ne);
          };
        else if (typeof MessageChannel < 'u') {
          var me = new MessageChannel(),
            Se = me.port2;
          (me.port1.onmessage = ne),
            (oe = function () {
              Se.postMessage(null);
            });
        } else
          oe = function () {
            O(ne, 0);
          };
        function be(C, V) {
          Y = O(function () {
            C(n.unstable_now());
          }, V);
        }
        (n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (C) {
            C.callback = null;
          }),
          (n.unstable_forceFrameRate = function (C) {
            0 > C || 125 < C
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (K = 0 < C ? Math.floor(1e3 / C) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return b;
          }),
          (n.unstable_next = function (C) {
            switch (b) {
              case 1:
              case 2:
              case 3:
                var V = 3;
                break;
              default:
                V = b;
            }
            var W = b;
            b = V;
            try {
              return C();
            } finally {
              b = W;
            }
          }),
          (n.unstable_requestPaint = function () {
            M = !0;
          }),
          (n.unstable_runWithPriority = function (C, V) {
            switch (C) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                C = 3;
            }
            var W = b;
            b = C;
            try {
              return V();
            } finally {
              b = W;
            }
          }),
          (n.unstable_scheduleCallback = function (C, V, W) {
            var ae = n.unstable_now();
            switch (
              (typeof W == 'object' && W !== null
                ? ((W = W.delay),
                  (W = typeof W == 'number' && 0 < W ? ae + W : ae))
                : (W = ae),
              C)
            ) {
              case 1:
                var R = -1;
                break;
              case 2:
                R = 250;
                break;
              case 5:
                R = 1073741823;
                break;
              case 4:
                R = 1e4;
                break;
              default:
                R = 5e3;
            }
            return (
              (R = W + R),
              (C = {
                id: v++,
                callback: V,
                priorityLevel: C,
                startTime: W,
                expirationTime: R,
                sortIndex: -1,
              }),
              W > ae
                ? ((C.sortIndex = W),
                  s(d, C),
                  i(g) === null &&
                    C === i(d) &&
                    (E ? (L(Y), (Y = -1)) : (E = !0), be(I, W - ae)))
                : ((C.sortIndex = R),
                  s(g, C),
                  w || T || ((w = !0), Z || ((Z = !0), oe()))),
              C
            );
          }),
          (n.unstable_shouldYield = F),
          (n.unstable_wrapCallback = function (C) {
            var V = b;
            return function () {
              var W = b;
              b = V;
              try {
                return C.apply(this, arguments);
              } finally {
                b = W;
              }
            };
          });
      })(Eu)),
    Eu
  );
}
var Zm;
function gS() {
  return Zm || ((Zm = 1), (Tu.exports = hS())), Tu.exports;
}
var xu = { exports: {} },
  rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jm;
function mS() {
  if (Jm) return rt;
  Jm = 1;
  var n = Ka();
  function s(g) {
    var d = 'https://react.dev/errors/' + g;
    if (1 < arguments.length) {
      d += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        d += '&args[]=' + encodeURIComponent(arguments[v]);
    }
    return (
      'Minified React error #' +
      g +
      '; visit ' +
      d +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function i() {}
  var o = {
      d: {
        f: i,
        r: function () {
          throw Error(s(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for('react.portal');
  function f(g, d, v) {
    var p =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: p == null ? null : '' + p,
      children: g,
      containerInfo: d,
      implementation: v,
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(g, d) {
    if (g === 'font') return '';
    if (typeof d == 'string') return d === 'use-credentials' ? d : '';
  }
  return (
    (rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (rt.createPortal = function (g, d) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!d || (d.nodeType !== 1 && d.nodeType !== 9 && d.nodeType !== 11))
        throw Error(s(299));
      return f(g, d, null, v);
    }),
    (rt.flushSync = function (g) {
      var d = h.T,
        v = o.p;
      try {
        if (((h.T = null), (o.p = 2), g)) return g();
      } finally {
        (h.T = d), (o.p = v), o.d.f();
      }
    }),
    (rt.preconnect = function (g, d) {
      typeof g == 'string' &&
        (d
          ? ((d = d.crossOrigin),
            (d =
              typeof d == 'string'
                ? d === 'use-credentials'
                  ? d
                  : ''
                : void 0))
          : (d = null),
        o.d.C(g, d));
    }),
    (rt.prefetchDNS = function (g) {
      typeof g == 'string' && o.d.D(g);
    }),
    (rt.preinit = function (g, d) {
      if (typeof g == 'string' && d && typeof d.as == 'string') {
        var v = d.as,
          p = m(v, d.crossOrigin),
          b = typeof d.integrity == 'string' ? d.integrity : void 0,
          T = typeof d.fetchPriority == 'string' ? d.fetchPriority : void 0;
        v === 'style'
          ? o.d.S(g, typeof d.precedence == 'string' ? d.precedence : void 0, {
              crossOrigin: p,
              integrity: b,
              fetchPriority: T,
            })
          : v === 'script' &&
            o.d.X(g, {
              crossOrigin: p,
              integrity: b,
              fetchPriority: T,
              nonce: typeof d.nonce == 'string' ? d.nonce : void 0,
            });
      }
    }),
    (rt.preinitModule = function (g, d) {
      if (typeof g == 'string')
        if (typeof d == 'object' && d !== null) {
          if (d.as == null || d.as === 'script') {
            var v = m(d.as, d.crossOrigin);
            o.d.M(g, {
              crossOrigin: v,
              integrity: typeof d.integrity == 'string' ? d.integrity : void 0,
              nonce: typeof d.nonce == 'string' ? d.nonce : void 0,
            });
          }
        } else d == null && o.d.M(g);
    }),
    (rt.preload = function (g, d) {
      if (
        typeof g == 'string' &&
        typeof d == 'object' &&
        d !== null &&
        typeof d.as == 'string'
      ) {
        var v = d.as,
          p = m(v, d.crossOrigin);
        o.d.L(g, v, {
          crossOrigin: p,
          integrity: typeof d.integrity == 'string' ? d.integrity : void 0,
          nonce: typeof d.nonce == 'string' ? d.nonce : void 0,
          type: typeof d.type == 'string' ? d.type : void 0,
          fetchPriority:
            typeof d.fetchPriority == 'string' ? d.fetchPriority : void 0,
          referrerPolicy:
            typeof d.referrerPolicy == 'string' ? d.referrerPolicy : void 0,
          imageSrcSet:
            typeof d.imageSrcSet == 'string' ? d.imageSrcSet : void 0,
          imageSizes: typeof d.imageSizes == 'string' ? d.imageSizes : void 0,
          media: typeof d.media == 'string' ? d.media : void 0,
        });
      }
    }),
    (rt.preloadModule = function (g, d) {
      if (typeof g == 'string')
        if (d) {
          var v = m(d.as, d.crossOrigin);
          o.d.m(g, {
            as: typeof d.as == 'string' && d.as !== 'script' ? d.as : void 0,
            crossOrigin: v,
            integrity: typeof d.integrity == 'string' ? d.integrity : void 0,
          });
        } else o.d.m(g);
    }),
    (rt.requestFormReset = function (g) {
      o.d.r(g);
    }),
    (rt.unstable_batchedUpdates = function (g, d) {
      return g(d);
    }),
    (rt.useFormState = function (g, d, v) {
      return h.H.useFormState(g, d, v);
    }),
    (rt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (rt.version = '19.1.1'),
    rt
  );
}
var ep;
function Cy() {
  if (ep) return xu.exports;
  ep = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (s) {
        console.error(s);
      }
  }
  return n(), (xu.exports = mS()), xu.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tp;
function pS() {
  if (tp) return er;
  tp = 1;
  var n = gS(),
    s = Ka(),
    i = Cy();
  function o(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += '&args[]=' + encodeURIComponent(arguments[a]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (f(e) !== e) throw Error(o(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var a = e, r = t; ; ) {
      var l = a.return;
      if (l === null) break;
      var u = l.alternate;
      if (u === null) {
        if (((r = l.return), r !== null)) {
          a = r;
          continue;
        }
        break;
      }
      if (l.child === u.child) {
        for (u = l.child; u; ) {
          if (u === a) return m(l), e;
          if (u === r) return m(l), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== r.return) (a = l), (r = u);
      else {
        for (var y = !1, _ = l.child; _; ) {
          if (_ === a) {
            (y = !0), (a = l), (r = u);
            break;
          }
          if (_ === r) {
            (y = !0), (r = l), (a = u);
            break;
          }
          _ = _.sibling;
        }
        if (!y) {
          for (_ = u.child; _; ) {
            if (_ === a) {
              (y = !0), (a = u), (r = l);
              break;
            }
            if (_ === r) {
              (y = !0), (r = u), (a = l);
              break;
            }
            _ = _.sibling;
          }
          if (!y) throw Error(o(189));
        }
      }
      if (a.alternate !== r) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? e : t;
  }
  function d(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = d(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign,
    p = Symbol.for('react.element'),
    b = Symbol.for('react.transitional.element'),
    T = Symbol.for('react.portal'),
    w = Symbol.for('react.fragment'),
    E = Symbol.for('react.strict_mode'),
    M = Symbol.for('react.profiler'),
    O = Symbol.for('react.provider'),
    L = Symbol.for('react.consumer'),
    U = Symbol.for('react.context'),
    G = Symbol.for('react.forward_ref'),
    I = Symbol.for('react.suspense'),
    Z = Symbol.for('react.suspense_list'),
    Y = Symbol.for('react.memo'),
    K = Symbol.for('react.lazy'),
    X = Symbol.for('react.activity'),
    F = Symbol.for('react.memo_cache_sentinel'),
    ne = Symbol.iterator;
  function oe(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ne && e[ne]) || e['@@iterator']),
        typeof e == 'function' ? e : null);
  }
  var me = Symbol.for('react.client.reference');
  function Se(e) {
    if (e == null) return null;
    if (typeof e == 'function')
      return e.$$typeof === me ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case w:
        return 'Fragment';
      case M:
        return 'Profiler';
      case E:
        return 'StrictMode';
      case I:
        return 'Suspense';
      case Z:
        return 'SuspenseList';
      case X:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case T:
          return 'Portal';
        case U:
          return (e.displayName || 'Context') + '.Provider';
        case L:
          return (e._context.displayName || 'Context') + '.Consumer';
        case G:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case Y:
          return (
            (t = e.displayName || null), t !== null ? t : Se(e.type) || 'Memo'
          );
        case K:
          (t = e._payload), (e = e._init);
          try {
            return Se(e(t));
          } catch {}
      }
    return null;
  }
  var be = Array.isArray,
    C = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    ae = [],
    R = -1;
  function P(e) {
    return { current: e };
  }
  function ee(e) {
    0 > R || ((e.current = ae[R]), (ae[R] = null), R--);
  }
  function J(e, t) {
    R++, (ae[R] = e.current), (e.current = t);
  }
  var re = P(null),
    de = P(null),
    le = P(null),
    Je = P(null);
  function Te(e, t) {
    switch ((J(le, t), J(de, e), J(re, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? _m(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = _m(t)), (e = wm(t, e));
        else
          switch (e) {
            case 'svg':
              e = 1;
              break;
            case 'math':
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    ee(re), J(re, e);
  }
  function Ot() {
    ee(re), ee(de), ee(le);
  }
  function ha(e) {
    e.memoizedState !== null && J(Je, e);
    var t = re.current,
      a = wm(t, e.type);
    t !== a && (J(de, e), J(re, a));
  }
  function kt(e) {
    de.current === e && (ee(re), ee(de)),
      Je.current === e && (ee(Je), (Fi._currentValue = W));
  }
  var Js = Object.prototype.hasOwnProperty,
    ei = n.unstable_scheduleCallback,
    Fa = n.unstable_cancelCallback,
    ol = n.unstable_shouldYield,
    ll = n.unstable_requestPaint,
    Dt = n.unstable_now,
    Ya = n.unstable_getCurrentPriorityLevel,
    ga = n.unstable_ImmediatePriority,
    ti = n.unstable_UserBlockingPriority,
    ma = n.unstable_NormalPriority,
    Ne = n.unstable_LowPriority,
    et = n.unstable_IdlePriority,
    Xt = n.log,
    ad = n.unstable_setDisableYieldValue,
    ni = null,
    bt = null;
  function Dn(e) {
    if (
      (typeof Xt == 'function' && ad(e),
      bt && typeof bt.setStrictMode == 'function')
    )
      try {
        bt.setStrictMode(ni, e);
      } catch {}
  }
  var _t = Math.clz32 ? Math.clz32 : Xv,
    Fv = Math.log,
    Yv = Math.LN2;
  function Xv(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Fv(e) / Yv) | 0)) | 0;
  }
  var yr = 256,
    vr = 4194304;
  function pa(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Sr(e, t, a) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var l = 0,
      u = e.suspendedLanes,
      y = e.pingedLanes;
    e = e.warmLanes;
    var _ = r & 134217727;
    return (
      _ !== 0
        ? ((r = _ & ~u),
          r !== 0
            ? (l = pa(r))
            : ((y &= _),
              y !== 0
                ? (l = pa(y))
                : a || ((a = _ & ~e), a !== 0 && (l = pa(a)))))
        : ((_ = r & ~u),
          _ !== 0
            ? (l = pa(_))
            : y !== 0
            ? (l = pa(y))
            : a || ((a = r & ~e), a !== 0 && (l = pa(a)))),
      l === 0
        ? 0
        : t !== 0 &&
          t !== l &&
          (t & u) === 0 &&
          ((u = l & -l),
          (a = t & -t),
          u >= a || (u === 32 && (a & 4194048) !== 0))
        ? t
        : l
    );
  }
  function ai(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Wv(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function sd() {
    var e = yr;
    return (yr <<= 1), (yr & 4194048) === 0 && (yr = 256), e;
  }
  function id() {
    var e = vr;
    return (vr <<= 1), (vr & 62914560) === 0 && (vr = 4194304), e;
  }
  function cl(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function si(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function Zv(e, t, a, r, l, u) {
    var y = e.pendingLanes;
    (e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0);
    var _ = e.entanglements,
      x = e.expirationTimes,
      N = e.hiddenUpdates;
    for (a = y & ~a; 0 < a; ) {
      var H = 31 - _t(a),
        Q = 1 << H;
      (_[H] = 0), (x[H] = -1);
      var j = N[H];
      if (j !== null)
        for (N[H] = null, H = 0; H < j.length; H++) {
          var B = j[H];
          B !== null && (B.lane &= -536870913);
        }
      a &= ~Q;
    }
    r !== 0 && rd(e, r, 0),
      u !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(y & ~t));
  }
  function rd(e, t, a) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var r = 31 - _t(t);
    (e.entangledLanes |= t),
      (e.entanglements[r] = e.entanglements[r] | 1073741824 | (a & 4194090));
  }
  function od(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var r = 31 - _t(a),
        l = 1 << r;
      (l & t) | (e[r] & t) && (e[r] |= t), (a &= ~l);
    }
  }
  function ul(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function fl(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function ld() {
    var e = V.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Pm(e.type));
  }
  function Jv(e, t) {
    var a = V.p;
    try {
      return (V.p = e), t();
    } finally {
      V.p = a;
    }
  }
  var Nn = Math.random().toString(36).slice(2),
    st = '__reactFiber$' + Nn,
    ft = '__reactProps$' + Nn,
    Xa = '__reactContainer$' + Nn,
    dl = '__reactEvents$' + Nn,
    e0 = '__reactListeners$' + Nn,
    t0 = '__reactHandles$' + Nn,
    cd = '__reactResources$' + Nn,
    ii = '__reactMarker$' + Nn;
  function hl(e) {
    delete e[st], delete e[ft], delete e[dl], delete e[e0], delete e[t0];
  }
  function Wa(e) {
    var t = e[st];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Xa] || a[st])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (e = Rm(e); e !== null; ) {
            if ((a = e[st])) return a;
            e = Rm(e);
          }
        return t;
      }
      (e = a), (a = e.parentNode);
    }
    return null;
  }
  function Za(e) {
    if ((e = e[st] || e[Xa])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ri(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Ja(e) {
    var t = e[cd];
    return (
      t ||
        (t = e[cd] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Ye(e) {
    e[ii] = !0;
  }
  var ud = new Set(),
    fd = {};
  function ya(e, t) {
    es(e, t), es(e + 'Capture', t);
  }
  function es(e, t) {
    for (fd[e] = t, e = 0; e < t.length; e++) ud.add(t[e]);
  }
  var n0 = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    dd = {},
    hd = {};
  function a0(e) {
    return Js.call(hd, e)
      ? !0
      : Js.call(dd, e)
      ? !1
      : n0.test(e)
      ? (hd[e] = !0)
      : ((dd[e] = !0), !1);
  }
  function br(e, t, a) {
    if (a0(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var r = t.toLowerCase().slice(0, 5);
            if (r !== 'data-' && r !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + a);
      }
  }
  function _r(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + a);
    }
  }
  function cn(e, t, a, r) {
    if (r === null) e.removeAttribute(a);
    else {
      switch (typeof r) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, '' + r);
    }
  }
  var gl, gd;
  function ts(e) {
    if (gl === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (gl = (t && t[1]) || ''),
          (gd =
            -1 <
            a.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < a.stack.indexOf('@')
              ? '@unknown:0:0'
              : '');
      }
    return (
      `
` +
      gl +
      e +
      gd
    );
  }
  var ml = !1;
  function pl(e, t) {
    if (!e || ml) return '';
    ml = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Q.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Q, []);
                } catch (B) {
                  var j = B;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (B) {
                  j = B;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                j = B;
              }
              (Q = e()) &&
                typeof Q.catch == 'function' &&
                Q.catch(function () {});
            }
          } catch (B) {
            if (B && j && typeof B.stack == 'string') return [B.stack, j.stack];
          }
          return [null, null];
        },
      };
      r.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var l = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        'name'
      );
      l &&
        l.configurable &&
        Object.defineProperty(r.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var u = r.DetermineComponentFrameRoot(),
        y = u[0],
        _ = u[1];
      if (y && _) {
        var x = y.split(`
`),
          N = _.split(`
`);
        for (
          l = r = 0;
          r < x.length && !x[r].includes('DetermineComponentFrameRoot');

        )
          r++;
        for (; l < N.length && !N[l].includes('DetermineComponentFrameRoot'); )
          l++;
        if (r === x.length || l === N.length)
          for (
            r = x.length - 1, l = N.length - 1;
            1 <= r && 0 <= l && x[r] !== N[l];

          )
            l--;
        for (; 1 <= r && 0 <= l; r--, l--)
          if (x[r] !== N[l]) {
            if (r !== 1 || l !== 1)
              do
                if ((r--, l--, 0 > l || x[r] !== N[l])) {
                  var H =
                    `
` + x[r].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      H.includes('<anonymous>') &&
                      (H = H.replace('<anonymous>', e.displayName)),
                    H
                  );
                }
              while (1 <= r && 0 <= l);
            break;
          }
      }
    } finally {
      (ml = !1), (Error.prepareStackTrace = a);
    }
    return (a = e ? e.displayName || e.name : '') ? ts(a) : '';
  }
  function s0(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ts(e.type);
      case 16:
        return ts('Lazy');
      case 13:
        return ts('Suspense');
      case 19:
        return ts('SuspenseList');
      case 0:
      case 15:
        return pl(e.type, !1);
      case 11:
        return pl(e.type.render, !1);
      case 1:
        return pl(e.type, !0);
      case 31:
        return ts('Activity');
      default:
        return '';
    }
  }
  function md(e) {
    try {
      var t = '';
      do (t += s0(e)), (e = e.return);
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  function Nt(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function pd(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === 'input' &&
      (t === 'checkbox' || t === 'radio')
    );
  }
  function i0(e) {
    var t = pd(e) ? 'checked' : 'value',
      a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = '' + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var l = a.get,
        u = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (y) {
            (r = '' + y), u.call(this, y);
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (y) {
            r = '' + y;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function wr(e) {
    e._valueTracker || (e._valueTracker = i0(e));
  }
  function yd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      r = '';
    return (
      e && (r = pd(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = r),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Tr(e) {
    if (
      ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var r0 = /[\n"\\]/g;
  function Lt(e) {
    return e.replace(r0, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function yl(e, t, a, r, l, u, y, _) {
    (e.name = ''),
      y != null &&
      typeof y != 'function' &&
      typeof y != 'symbol' &&
      typeof y != 'boolean'
        ? (e.type = y)
        : e.removeAttribute('type'),
      t != null
        ? y === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) &&
            (e.value = '' + Nt(t))
          : e.value !== '' + Nt(t) && (e.value = '' + Nt(t))
        : (y !== 'submit' && y !== 'reset') || e.removeAttribute('value'),
      t != null
        ? vl(e, y, Nt(t))
        : a != null
        ? vl(e, y, Nt(a))
        : r != null && e.removeAttribute('value'),
      l == null && u != null && (e.defaultChecked = !!u),
      l != null &&
        (e.checked = l && typeof l != 'function' && typeof l != 'symbol'),
      _ != null &&
      typeof _ != 'function' &&
      typeof _ != 'symbol' &&
      typeof _ != 'boolean'
        ? (e.name = '' + Nt(_))
        : e.removeAttribute('name');
  }
  function vd(e, t, a, r, l, u, y, _) {
    if (
      (u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (e.type = u),
      t != null || a != null)
    ) {
      if (!((u !== 'submit' && u !== 'reset') || t != null)) return;
      (a = a != null ? '' + Nt(a) : ''),
        (t = t != null ? '' + Nt(t) : a),
        _ || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (r = r ?? l),
      (r = typeof r != 'function' && typeof r != 'symbol' && !!r),
      (e.checked = _ ? e.checked : !!r),
      (e.defaultChecked = !!r),
      y != null &&
        typeof y != 'function' &&
        typeof y != 'symbol' &&
        typeof y != 'boolean' &&
        (e.name = y);
  }
  function vl(e, t, a) {
    (t === 'number' && Tr(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function ns(e, t, a, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < a.length; l++) t['$' + a[l]] = !0;
      for (a = 0; a < e.length; a++)
        (l = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== l && (e[a].selected = l),
          l && r && (e[a].defaultSelected = !0);
    } else {
      for (a = '' + Nt(a), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === a) {
          (e[l].selected = !0), r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Sd(e, t, a) {
    if (
      t != null &&
      ((t = '' + Nt(t)), t !== e.value && (e.value = t), a == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Nt(a) : '';
  }
  function bd(e, t, a, r) {
    if (t == null) {
      if (r != null) {
        if (a != null) throw Error(o(92));
        if (be(r)) {
          if (1 < r.length) throw Error(o(93));
          r = r[0];
        }
        a = r;
      }
      a == null && (a = ''), (t = a);
    }
    (a = Nt(t)),
      (e.defaultValue = a),
      (r = e.textContent),
      r === a && r !== '' && r !== null && (e.value = r);
  }
  function as(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var o0 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function _d(e, t, a) {
    var r = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? r
        ? e.setProperty(t, '')
        : t === 'float'
        ? (e.cssFloat = '')
        : (e[t] = '')
      : r
      ? e.setProperty(t, a)
      : typeof a != 'number' || a === 0 || o0.has(t)
      ? t === 'float'
        ? (e.cssFloat = a)
        : (e[t] = ('' + a).trim())
      : (e[t] = a + 'px');
  }
  function wd(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(o(62));
    if (((e = e.style), a != null)) {
      for (var r in a)
        !a.hasOwnProperty(r) ||
          (t != null && t.hasOwnProperty(r)) ||
          (r.indexOf('--') === 0
            ? e.setProperty(r, '')
            : r === 'float'
            ? (e.cssFloat = '')
            : (e[r] = ''));
      for (var l in t)
        (r = t[l]), t.hasOwnProperty(l) && a[l] !== r && _d(e, l, r);
    } else for (var u in t) t.hasOwnProperty(u) && _d(e, u, t[u]);
  }
  function Sl(e) {
    if (e.indexOf('-') === -1) return !1;
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var l0 = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    c0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Er(e) {
    return c0.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var bl = null;
  function _l(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ss = null,
    is = null;
  function Td(e) {
    var t = Za(e);
    if (t && (e = t.stateNode)) {
      var a = e[ft] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (yl(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === 'radio' && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + Lt('' + t) + '"][type="radio"]'
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var r = a[t];
              if (r !== e && r.form === e.form) {
                var l = r[ft] || null;
                if (!l) throw Error(o(90));
                yl(
                  r,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              (r = a[t]), r.form === e.form && yd(r);
          }
          break e;
        case 'textarea':
          Sd(e, a.value, a.defaultValue);
          break e;
        case 'select':
          (t = a.value), t != null && ns(e, !!a.multiple, t, !1);
      }
    }
  }
  var wl = !1;
  function Ed(e, t, a) {
    if (wl) return e(t, a);
    wl = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (
        ((wl = !1),
        (ss !== null || is !== null) &&
          (co(), ss && ((t = ss), (e = is), (is = ss = null), Td(t), e)))
      )
        for (t = 0; t < e.length; t++) Td(e[t]);
    }
  }
  function oi(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var r = a[ft] || null;
    if (r === null) return null;
    a = r[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        (r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === 'button' ||
            e === 'input' ||
            e === 'select' ||
            e === 'textarea'
          ))),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != 'function') throw Error(o(231, t, typeof a));
    return a;
  }
  var un = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Tl = !1;
  if (un)
    try {
      var li = {};
      Object.defineProperty(li, 'passive', {
        get: function () {
          Tl = !0;
        },
      }),
        window.addEventListener('test', li, li),
        window.removeEventListener('test', li, li);
    } catch {
      Tl = !1;
    }
  var Ln = null,
    El = null,
    xr = null;
  function xd() {
    if (xr) return xr;
    var e,
      t = El,
      a = t.length,
      r,
      l = 'value' in Ln ? Ln.value : Ln.textContent,
      u = l.length;
    for (e = 0; e < a && t[e] === l[e]; e++);
    var y = a - e;
    for (r = 1; r <= y && t[a - r] === l[u - r]; r++);
    return (xr = l.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Rr(e) {
    var t = e.keyCode;
    return (
      'charCode' in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Cr() {
    return !0;
  }
  function Rd() {
    return !1;
  }
  function dt(e) {
    function t(a, r, l, u, y) {
      (this._reactName = a),
        (this._targetInst = l),
        (this.type = r),
        (this.nativeEvent = u),
        (this.target = y),
        (this.currentTarget = null);
      for (var _ in e)
        e.hasOwnProperty(_) && ((a = e[_]), (this[_] = a ? a(u) : u[_]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? Cr
          : Rd),
        (this.isPropagationStopped = Rd),
        this
      );
    }
    return (
      v(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Cr));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Cr));
        },
        persist: function () {},
        isPersistent: Cr,
      }),
      t
    );
  }
  var va = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ar = dt(va),
    ci = v({}, va, { view: 0, detail: 0 }),
    u0 = dt(ci),
    xl,
    Rl,
    ui,
    Mr = v({}, ci, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Al,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== ui &&
              (ui && e.type === 'mousemove'
                ? ((xl = e.screenX - ui.screenX), (Rl = e.screenY - ui.screenY))
                : (Rl = xl = 0),
              (ui = e)),
            xl);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Rl;
      },
    }),
    Cd = dt(Mr),
    f0 = v({}, Mr, { dataTransfer: 0 }),
    d0 = dt(f0),
    h0 = v({}, ci, { relatedTarget: 0 }),
    Cl = dt(h0),
    g0 = v({}, va, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    m0 = dt(g0),
    p0 = v({}, va, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    y0 = dt(p0),
    v0 = v({}, va, { data: 0 }),
    Ad = dt(v0),
    S0 = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    b0 = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    _0 = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    };
  function w0(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = _0[e])
      ? !!t[e]
      : !1;
  }
  function Al() {
    return w0;
  }
  var T0 = v({}, ci, {
      key: function (e) {
        if (e.key) {
          var t = S0[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Rr(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
          ? b0[e.keyCode] || 'Unidentified'
          : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Al,
      charCode: function (e) {
        return e.type === 'keypress' ? Rr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Rr(e)
          : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
      },
    }),
    E0 = dt(T0),
    x0 = v({}, Mr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Md = dt(x0),
    R0 = v({}, ci, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Al,
    }),
    C0 = dt(R0),
    A0 = v({}, va, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    M0 = dt(A0),
    O0 = v({}, Mr, {
      deltaX: function (e) {
        return 'deltaX' in e
          ? e.deltaX
          : 'wheelDeltaX' in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    k0 = dt(O0),
    D0 = v({}, va, { newState: 0, oldState: 0 }),
    N0 = dt(D0),
    L0 = [9, 13, 27, 32],
    Ml = un && 'CompositionEvent' in window,
    fi = null;
  un && 'documentMode' in document && (fi = document.documentMode);
  var j0 = un && 'TextEvent' in window && !fi,
    Od = un && (!Ml || (fi && 8 < fi && 11 >= fi)),
    kd = ' ',
    Dd = !1;
  function Nd(e, t) {
    switch (e) {
      case 'keyup':
        return L0.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Ld(e) {
    return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
  }
  var rs = !1;
  function B0(e, t) {
    switch (e) {
      case 'compositionend':
        return Ld(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Dd = !0), kd);
      case 'textInput':
        return (e = t.data), e === kd && Dd ? null : e;
      default:
        return null;
    }
  }
  function z0(e, t) {
    if (rs)
      return e === 'compositionend' || (!Ml && Nd(e, t))
        ? ((e = xd()), (xr = El = Ln = null), (rs = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return Od && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var U0 = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function jd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!U0[e.type] : t === 'textarea';
  }
  function Bd(e, t, a, r) {
    ss ? (is ? is.push(r) : (is = [r])) : (ss = r),
      (t = po(t, 'onChange')),
      0 < t.length &&
        ((a = new Ar('onChange', 'change', null, a, r)),
        e.push({ event: a, listeners: t }));
  }
  var di = null,
    hi = null;
  function I0(e) {
    pm(e, 0);
  }
  function Or(e) {
    var t = ri(e);
    if (yd(t)) return e;
  }
  function zd(e, t) {
    if (e === 'change') return t;
  }
  var Ud = !1;
  if (un) {
    var Ol;
    if (un) {
      var kl = 'oninput' in document;
      if (!kl) {
        var Id = document.createElement('div');
        Id.setAttribute('oninput', 'return;'),
          (kl = typeof Id.oninput == 'function');
      }
      Ol = kl;
    } else Ol = !1;
    Ud = Ol && (!document.documentMode || 9 < document.documentMode);
  }
  function Hd() {
    di && (di.detachEvent('onpropertychange', Pd), (hi = di = null));
  }
  function Pd(e) {
    if (e.propertyName === 'value' && Or(hi)) {
      var t = [];
      Bd(t, hi, e, _l(e)), Ed(I0, t);
    }
  }
  function H0(e, t, a) {
    e === 'focusin'
      ? (Hd(), (di = t), (hi = a), di.attachEvent('onpropertychange', Pd))
      : e === 'focusout' && Hd();
  }
  function P0(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
      return Or(hi);
  }
  function q0(e, t) {
    if (e === 'click') return Or(t);
  }
  function $0(e, t) {
    if (e === 'input' || e === 'change') return Or(t);
  }
  function G0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var wt = typeof Object.is == 'function' ? Object.is : G0;
  function gi(e, t) {
    if (wt(e, t)) return !0;
    if (
      typeof e != 'object' ||
      e === null ||
      typeof t != 'object' ||
      t === null
    )
      return !1;
    var a = Object.keys(e),
      r = Object.keys(t);
    if (a.length !== r.length) return !1;
    for (r = 0; r < a.length; r++) {
      var l = a[r];
      if (!Js.call(t, l) || !wt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function qd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $d(e, t) {
    var a = qd(e);
    e = 0;
    for (var r; a; ) {
      if (a.nodeType === 3) {
        if (((r = e + a.textContent.length), e <= t && r >= t))
          return { node: a, offset: t - e };
        e = r;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = qd(a);
    }
  }
  function Gd(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? Gd(e, t.parentNode)
        : 'contains' in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function Vd(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Tr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Tr(e.document);
    }
    return t;
  }
  function Dl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  var V0 = un && 'documentMode' in document && 11 >= document.documentMode,
    os = null,
    Nl = null,
    mi = null,
    Ll = !1;
  function Qd(e, t, a) {
    var r =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Ll ||
      os == null ||
      os !== Tr(r) ||
      ((r = os),
      'selectionStart' in r && Dl(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (mi && gi(mi, r)) ||
        ((mi = r),
        (r = po(Nl, 'onSelect')),
        0 < r.length &&
          ((t = new Ar('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: r }),
          (t.target = os))));
  }
  function Sa(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var ls = {
      animationend: Sa('Animation', 'AnimationEnd'),
      animationiteration: Sa('Animation', 'AnimationIteration'),
      animationstart: Sa('Animation', 'AnimationStart'),
      transitionrun: Sa('Transition', 'TransitionRun'),
      transitionstart: Sa('Transition', 'TransitionStart'),
      transitioncancel: Sa('Transition', 'TransitionCancel'),
      transitionend: Sa('Transition', 'TransitionEnd'),
    },
    jl = {},
    Kd = {};
  un &&
    ((Kd = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete ls.animationend.animation,
      delete ls.animationiteration.animation,
      delete ls.animationstart.animation),
    'TransitionEvent' in window || delete ls.transitionend.transition);
  function ba(e) {
    if (jl[e]) return jl[e];
    if (!ls[e]) return e;
    var t = ls[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Kd) return (jl[e] = t[a]);
    return e;
  }
  var Fd = ba('animationend'),
    Yd = ba('animationiteration'),
    Xd = ba('animationstart'),
    Q0 = ba('transitionrun'),
    K0 = ba('transitionstart'),
    F0 = ba('transitioncancel'),
    Wd = ba('transitionend'),
    Zd = new Map(),
    Bl =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Bl.push('scrollEnd');
  function Kt(e, t) {
    Zd.set(e, t), ya(t, [e]);
  }
  var Jd = new WeakMap();
  function jt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Jd.get(e);
      return a !== void 0
        ? a
        : ((t = { value: e, source: t, stack: md(t) }), Jd.set(e, t), t);
    }
    return { value: e, source: t, stack: md(t) };
  }
  var Bt = [],
    cs = 0,
    zl = 0;
  function kr() {
    for (var e = cs, t = (zl = cs = 0); t < e; ) {
      var a = Bt[t];
      Bt[t++] = null;
      var r = Bt[t];
      Bt[t++] = null;
      var l = Bt[t];
      Bt[t++] = null;
      var u = Bt[t];
      if (((Bt[t++] = null), r !== null && l !== null)) {
        var y = r.pending;
        y === null ? (l.next = l) : ((l.next = y.next), (y.next = l)),
          (r.pending = l);
      }
      u !== 0 && eh(a, l, u);
    }
  }
  function Dr(e, t, a, r) {
    (Bt[cs++] = e),
      (Bt[cs++] = t),
      (Bt[cs++] = a),
      (Bt[cs++] = r),
      (zl |= r),
      (e.lanes |= r),
      (e = e.alternate),
      e !== null && (e.lanes |= r);
  }
  function Ul(e, t, a, r) {
    return Dr(e, t, a, r), Nr(e);
  }
  function us(e, t) {
    return Dr(e, null, null, t), Nr(e);
  }
  function eh(e, t, a) {
    e.lanes |= a;
    var r = e.alternate;
    r !== null && (r.lanes |= a);
    for (var l = !1, u = e.return; u !== null; )
      (u.childLanes |= a),
        (r = u.alternate),
        r !== null && (r.childLanes |= a),
        u.tag === 22 &&
          ((e = u.stateNode), e === null || e._visibility & 1 || (l = !0)),
        (e = u),
        (u = u.return);
    return e.tag === 3
      ? ((u = e.stateNode),
        l &&
          t !== null &&
          ((l = 31 - _t(a)),
          (e = u.hiddenUpdates),
          (r = e[l]),
          r === null ? (e[l] = [t]) : r.push(t),
          (t.lane = a | 536870912)),
        u)
      : null;
  }
  function Nr(e) {
    if (50 < Hi) throw ((Hi = 0), (Gc = null), Error(o(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var fs = {};
  function Y0(e, t, a, r) {
    (this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Tt(e, t, a, r) {
    return new Y0(e, t, a, r);
  }
  function Il(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function fn(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Tt(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function th(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Lr(e, t, a, r, l, u) {
    var y = 0;
    if (((r = e), typeof e == 'function')) Il(e) && (y = 1);
    else if (typeof e == 'string')
      y = W1(e, a, re.current)
        ? 26
        : e === 'html' || e === 'head' || e === 'body'
        ? 27
        : 5;
    else
      e: switch (e) {
        case X:
          return (e = Tt(31, a, t, l)), (e.elementType = X), (e.lanes = u), e;
        case w:
          return _a(a.children, l, u, t);
        case E:
          (y = 8), (l |= 24);
          break;
        case M:
          return (
            (e = Tt(12, a, t, l | 2)), (e.elementType = M), (e.lanes = u), e
          );
        case I:
          return (e = Tt(13, a, t, l)), (e.elementType = I), (e.lanes = u), e;
        case Z:
          return (e = Tt(19, a, t, l)), (e.elementType = Z), (e.lanes = u), e;
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case O:
              case U:
                y = 10;
                break e;
              case L:
                y = 9;
                break e;
              case G:
                y = 11;
                break e;
              case Y:
                y = 14;
                break e;
              case K:
                (y = 16), (r = null);
                break e;
            }
          (y = 29),
            (a = Error(o(130, e === null ? 'null' : typeof e, ''))),
            (r = null);
      }
    return (
      (t = Tt(y, a, t, l)), (t.elementType = e), (t.type = r), (t.lanes = u), t
    );
  }
  function _a(e, t, a, r) {
    return (e = Tt(7, e, r, t)), (e.lanes = a), e;
  }
  function Hl(e, t, a) {
    return (e = Tt(6, e, null, t)), (e.lanes = a), e;
  }
  function Pl(e, t, a) {
    return (
      (t = Tt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var ds = [],
    hs = 0,
    jr = null,
    Br = 0,
    zt = [],
    Ut = 0,
    wa = null,
    dn = 1,
    hn = '';
  function Ta(e, t) {
    (ds[hs++] = Br), (ds[hs++] = jr), (jr = e), (Br = t);
  }
  function nh(e, t, a) {
    (zt[Ut++] = dn), (zt[Ut++] = hn), (zt[Ut++] = wa), (wa = e);
    var r = dn;
    e = hn;
    var l = 32 - _t(r) - 1;
    (r &= ~(1 << l)), (a += 1);
    var u = 32 - _t(t) + l;
    if (30 < u) {
      var y = l - (l % 5);
      (u = (r & ((1 << y) - 1)).toString(32)),
        (r >>= y),
        (l -= y),
        (dn = (1 << (32 - _t(t) + l)) | (a << l) | r),
        (hn = u + e);
    } else (dn = (1 << u) | (a << l) | r), (hn = e);
  }
  function ql(e) {
    e.return !== null && (Ta(e, 1), nh(e, 1, 0));
  }
  function $l(e) {
    for (; e === jr; )
      (jr = ds[--hs]), (ds[hs] = null), (Br = ds[--hs]), (ds[hs] = null);
    for (; e === wa; )
      (wa = zt[--Ut]),
        (zt[Ut] = null),
        (hn = zt[--Ut]),
        (zt[Ut] = null),
        (dn = zt[--Ut]),
        (zt[Ut] = null);
  }
  var lt = null,
    Ue = null,
    Ee = !1,
    Ea = null,
    Wt = !1,
    Gl = Error(o(519));
  function xa(e) {
    var t = Error(o(418, ''));
    throw (vi(jt(t, e)), Gl);
  }
  function ah(e) {
    var t = e.stateNode,
      a = e.type,
      r = e.memoizedProps;
    switch (((t[st] = e), (t[ft] = r), a)) {
      case 'dialog':
        ve('cancel', t), ve('close', t);
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ve('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < qi.length; a++) ve(qi[a], t);
        break;
      case 'source':
        ve('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        ve('error', t), ve('load', t);
        break;
      case 'details':
        ve('toggle', t);
        break;
      case 'input':
        ve('invalid', t),
          vd(
            t,
            r.value,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name,
            !0
          ),
          wr(t);
        break;
      case 'select':
        ve('invalid', t);
        break;
      case 'textarea':
        ve('invalid', t), bd(t, r.value, r.defaultValue, r.children), wr(t);
    }
    (a = r.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      r.suppressHydrationWarning === !0 ||
      bm(t.textContent, a)
        ? (r.popover != null && (ve('beforetoggle', t), ve('toggle', t)),
          r.onScroll != null && ve('scroll', t),
          r.onScrollEnd != null && ve('scrollend', t),
          r.onClick != null && (t.onclick = yo),
          (t = !0))
        : (t = !1),
      t || xa(e);
  }
  function sh(e) {
    for (lt = e.return; lt; )
      switch (lt.tag) {
        case 5:
        case 13:
          Wt = !1;
          return;
        case 27:
        case 3:
          Wt = !0;
          return;
        default:
          lt = lt.return;
      }
  }
  function pi(e) {
    if (e !== lt) return !1;
    if (!Ee) return sh(e), (Ee = !0), !1;
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type),
          (a =
            !(a !== 'form' && a !== 'button') || ru(e.type, e.memoizedProps))),
        (a = !a)),
      a && Ue && xa(e),
      sh(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((a = e.data), a === '/$')) {
              if (t === 0) {
                Ue = Yt(e.nextSibling);
                break e;
              }
              t--;
            } else (a !== '$' && a !== '$!' && a !== '$?') || t++;
          e = e.nextSibling;
        }
        Ue = null;
      }
    } else
      t === 27
        ? ((t = Ue), Xn(e.type) ? ((e = uu), (uu = null), (Ue = e)) : (Ue = t))
        : (Ue = lt ? Yt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function yi() {
    (Ue = lt = null), (Ee = !1);
  }
  function ih() {
    var e = Ea;
    return (
      e !== null &&
        (mt === null ? (mt = e) : mt.push.apply(mt, e), (Ea = null)),
      e
    );
  }
  function vi(e) {
    Ea === null ? (Ea = [e]) : Ea.push(e);
  }
  var Vl = P(null),
    Ra = null,
    gn = null;
  function jn(e, t, a) {
    J(Vl, t._currentValue), (t._currentValue = a);
  }
  function mn(e) {
    (e._currentValue = Vl.current), ee(Vl);
  }
  function Ql(e, t, a) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function Kl(e, t, a, r) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var u = l.dependencies;
      if (u !== null) {
        var y = l.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var _ = u;
          u = l;
          for (var x = 0; x < t.length; x++)
            if (_.context === t[x]) {
              (u.lanes |= a),
                (_ = u.alternate),
                _ !== null && (_.lanes |= a),
                Ql(u.return, a, e),
                r || (y = null);
              break e;
            }
          u = _.next;
        }
      } else if (l.tag === 18) {
        if (((y = l.return), y === null)) throw Error(o(341));
        (y.lanes |= a),
          (u = y.alternate),
          u !== null && (u.lanes |= a),
          Ql(y, a, e),
          (y = null);
      } else y = l.child;
      if (y !== null) y.return = l;
      else
        for (y = l; y !== null; ) {
          if (y === e) {
            y = null;
            break;
          }
          if (((l = y.sibling), l !== null)) {
            (l.return = y.return), (y = l);
            break;
          }
          y = y.return;
        }
      l = y;
    }
  }
  function Si(e, t, a, r) {
    e = null;
    for (var l = t, u = !1; l !== null; ) {
      if (!u) {
        if ((l.flags & 524288) !== 0) u = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var y = l.alternate;
        if (y === null) throw Error(o(387));
        if (((y = y.memoizedProps), y !== null)) {
          var _ = l.type;
          wt(l.pendingProps.value, y.value) ||
            (e !== null ? e.push(_) : (e = [_]));
        }
      } else if (l === Je.current) {
        if (((y = l.alternate), y === null)) throw Error(o(387));
        y.memoizedState.memoizedState !== l.memoizedState.memoizedState &&
          (e !== null ? e.push(Fi) : (e = [Fi]));
      }
      l = l.return;
    }
    e !== null && Kl(t, e, a, r), (t.flags |= 262144);
  }
  function zr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!wt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ca(e) {
    (Ra = e),
      (gn = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function it(e) {
    return rh(Ra, e);
  }
  function Ur(e, t) {
    return Ra === null && Ca(e), rh(e, t);
  }
  function rh(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), gn === null)) {
      if (e === null) throw Error(o(308));
      (gn = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else gn = gn.next = t;
    return a;
  }
  var X0 =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, r) {
                  e.push(r);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                });
            };
          },
    W0 = n.unstable_scheduleCallback,
    Z0 = n.unstable_NormalPriority,
    Qe = {
      $$typeof: U,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Fl() {
    return { controller: new X0(), data: new Map(), refCount: 0 };
  }
  function bi(e) {
    e.refCount--,
      e.refCount === 0 &&
        W0(Z0, function () {
          e.controller.abort();
        });
  }
  var _i = null,
    Yl = 0,
    gs = 0,
    ms = null;
  function J0(e, t) {
    if (_i === null) {
      var a = (_i = []);
      (Yl = 0),
        (gs = Wc()),
        (ms = {
          status: 'pending',
          value: void 0,
          then: function (r) {
            a.push(r);
          },
        });
    }
    return Yl++, t.then(oh, oh), t;
  }
  function oh() {
    if (--Yl === 0 && _i !== null) {
      ms !== null && (ms.status = 'fulfilled');
      var e = _i;
      (_i = null), (gs = 0), (ms = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function e1(e, t) {
    var a = [],
      r = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (l) {
          a.push(l);
        },
      };
    return (
      e.then(
        function () {
          (r.status = 'fulfilled'), (r.value = t);
          for (var l = 0; l < a.length; l++) (0, a[l])(t);
        },
        function (l) {
          for (r.status = 'rejected', r.reason = l, l = 0; l < a.length; l++)
            (0, a[l])(void 0);
        }
      ),
      r
    );
  }
  var lh = C.S;
  C.S = function (e, t) {
    typeof t == 'object' &&
      t !== null &&
      typeof t.then == 'function' &&
      J0(e, t),
      lh !== null && lh(e, t);
  };
  var Aa = P(null);
  function Xl() {
    var e = Aa.current;
    return e !== null ? e : ke.pooledCache;
  }
  function Ir(e, t) {
    t === null ? J(Aa, Aa.current) : J(Aa, t.pool);
  }
  function ch() {
    var e = Xl();
    return e === null ? null : { parent: Qe._currentValue, pool: e };
  }
  var wi = Error(o(460)),
    uh = Error(o(474)),
    Hr = Error(o(542)),
    Wl = { then: function () {} };
  function fh(e) {
    return (e = e.status), e === 'fulfilled' || e === 'rejected';
  }
  function Pr() {}
  function dh(e, t, a) {
    switch (
      ((a = e[a]),
      a === void 0 ? e.push(t) : a !== t && (t.then(Pr, Pr), (t = a)),
      t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), gh(e), e);
      default:
        if (typeof t.status == 'string') t.then(Pr, Pr);
        else {
          if (((e = ke), e !== null && 100 < e.shellSuspendCounter))
            throw Error(o(482));
          (e = t),
            (e.status = 'pending'),
            e.then(
              function (r) {
                if (t.status === 'pending') {
                  var l = t;
                  (l.status = 'fulfilled'), (l.value = r);
                }
              },
              function (r) {
                if (t.status === 'pending') {
                  var l = t;
                  (l.status = 'rejected'), (l.reason = r);
                }
              }
            );
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), gh(e), e);
        }
        throw ((Ti = t), wi);
    }
  }
  var Ti = null;
  function hh() {
    if (Ti === null) throw Error(o(459));
    var e = Ti;
    return (Ti = null), e;
  }
  function gh(e) {
    if (e === wi || e === Hr) throw Error(o(483));
  }
  var Bn = !1;
  function Zl(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Jl(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function zn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Un(e, t, a) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (xe & 2) !== 0)) {
      var l = r.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (r.pending = t),
        (t = Nr(e)),
        eh(e, null, a),
        t
      );
    }
    return Dr(e, r, t, a), Nr(e);
  }
  function Ei(e, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var r = t.lanes;
      (r &= e.pendingLanes), (a |= r), (t.lanes = a), od(e, a);
    }
  }
  function ec(e, t) {
    var a = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), a === r)) {
      var l = null,
        u = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var y = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          u === null ? (l = u = y) : (u = u.next = y), (a = a.next);
        } while (a !== null);
        u === null ? (l = u = t) : (u = u.next = t);
      } else l = u = t;
      (a = {
        baseState: r.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: u,
        shared: r.shared,
        callbacks: r.callbacks,
      }),
        (e.updateQueue = a);
      return;
    }
    (e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t);
  }
  var tc = !1;
  function xi() {
    if (tc) {
      var e = ms;
      if (e !== null) throw e;
    }
  }
  function Ri(e, t, a, r) {
    tc = !1;
    var l = e.updateQueue;
    Bn = !1;
    var u = l.firstBaseUpdate,
      y = l.lastBaseUpdate,
      _ = l.shared.pending;
    if (_ !== null) {
      l.shared.pending = null;
      var x = _,
        N = x.next;
      (x.next = null), y === null ? (u = N) : (y.next = N), (y = x);
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (_ = H.lastBaseUpdate),
        _ !== y &&
          (_ === null ? (H.firstBaseUpdate = N) : (_.next = N),
          (H.lastBaseUpdate = x)));
    }
    if (u !== null) {
      var Q = l.baseState;
      (y = 0), (H = N = x = null), (_ = u);
      do {
        var j = _.lane & -536870913,
          B = j !== _.lane;
        if (B ? (_e & j) === j : (r & j) === j) {
          j !== 0 && j === gs && (tc = !0),
            H !== null &&
              (H = H.next =
                {
                  lane: 0,
                  tag: _.tag,
                  payload: _.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var fe = e,
              ce = _;
            j = t;
            var Me = a;
            switch (ce.tag) {
              case 1:
                if (((fe = ce.payload), typeof fe == 'function')) {
                  Q = fe.call(Me, Q, j);
                  break e;
                }
                Q = fe;
                break e;
              case 3:
                fe.flags = (fe.flags & -65537) | 128;
              case 0:
                if (
                  ((fe = ce.payload),
                  (j = typeof fe == 'function' ? fe.call(Me, Q, j) : fe),
                  j == null)
                )
                  break e;
                Q = v({}, Q, j);
                break e;
              case 2:
                Bn = !0;
            }
          }
          (j = _.callback),
            j !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = l.callbacks),
              B === null ? (l.callbacks = [j]) : B.push(j));
        } else
          (B = {
            lane: j,
            tag: _.tag,
            payload: _.payload,
            callback: _.callback,
            next: null,
          }),
            H === null ? ((N = H = B), (x = Q)) : (H = H.next = B),
            (y |= j);
        if (((_ = _.next), _ === null)) {
          if (((_ = l.shared.pending), _ === null)) break;
          (B = _),
            (_ = B.next),
            (B.next = null),
            (l.lastBaseUpdate = B),
            (l.shared.pending = null);
        }
      } while (!0);
      H === null && (x = Q),
        (l.baseState = x),
        (l.firstBaseUpdate = N),
        (l.lastBaseUpdate = H),
        u === null && (l.shared.lanes = 0),
        (Qn |= y),
        (e.lanes = y),
        (e.memoizedState = Q);
    }
  }
  function mh(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function ph(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) mh(a[e], t);
  }
  var ps = P(null),
    qr = P(0);
  function yh(e, t) {
    (e = wn), J(qr, e), J(ps, t), (wn = e | t.baseLanes);
  }
  function nc() {
    J(qr, wn), J(ps, ps.current);
  }
  function ac() {
    (wn = qr.current), ee(ps), ee(qr);
  }
  var In = 0,
    ge = null,
    Ce = null,
    Ge = null,
    $r = !1,
    ys = !1,
    Ma = !1,
    Gr = 0,
    Ci = 0,
    vs = null,
    t1 = 0;
  function qe() {
    throw Error(o(321));
  }
  function sc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!wt(e[a], t[a])) return !1;
    return !0;
  }
  function ic(e, t, a, r, l, u) {
    return (
      (In = u),
      (ge = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (C.H = e === null || e.memoizedState === null ? eg : tg),
      (Ma = !1),
      (u = a(r, l)),
      (Ma = !1),
      ys && (u = Sh(t, a, r, l)),
      vh(e),
      u
    );
  }
  function vh(e) {
    C.H = Xr;
    var t = Ce !== null && Ce.next !== null;
    if (((In = 0), (Ge = Ce = ge = null), ($r = !1), (Ci = 0), (vs = null), t))
      throw Error(o(300));
    e === null ||
      Xe ||
      ((e = e.dependencies), e !== null && zr(e) && (Xe = !0));
  }
  function Sh(e, t, a, r) {
    ge = e;
    var l = 0;
    do {
      if ((ys && (vs = null), (Ci = 0), (ys = !1), 25 <= l))
        throw Error(o(301));
      if (((l += 1), (Ge = Ce = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        (u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0);
      }
      (C.H = l1), (u = t(a, r));
    } while (ys);
    return u;
  }
  function n1() {
    var e = C.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? Ai(t) : t),
      (e = e.useState()[0]),
      (Ce !== null ? Ce.memoizedState : null) !== e && (ge.flags |= 1024),
      t
    );
  }
  function rc() {
    var e = Gr !== 0;
    return (Gr = 0), e;
  }
  function oc(e, t, a) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a);
  }
  function lc(e) {
    if ($r) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      $r = !1;
    }
    (In = 0), (Ge = Ce = ge = null), (ys = !1), (Ci = Gr = 0), (vs = null);
  }
  function ht() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ge === null ? (ge.memoizedState = Ge = e) : (Ge = Ge.next = e), Ge;
  }
  function Ve() {
    if (Ce === null) {
      var e = ge.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ce.next;
    var t = Ge === null ? ge.memoizedState : Ge.next;
    if (t !== null) (Ge = t), (Ce = e);
    else {
      if (e === null)
        throw ge.alternate === null ? Error(o(467)) : Error(o(310));
      (Ce = e),
        (e = {
          memoizedState: Ce.memoizedState,
          baseState: Ce.baseState,
          baseQueue: Ce.baseQueue,
          queue: Ce.queue,
          next: null,
        }),
        Ge === null ? (ge.memoizedState = Ge = e) : (Ge = Ge.next = e);
    }
    return Ge;
  }
  function cc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ai(e) {
    var t = Ci;
    return (
      (Ci += 1),
      vs === null && (vs = []),
      (e = dh(vs, e, t)),
      (t = ge),
      (Ge === null ? t.memoizedState : Ge.next) === null &&
        ((t = t.alternate),
        (C.H = t === null || t.memoizedState === null ? eg : tg)),
      e
    );
  }
  function Vr(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return Ai(e);
      if (e.$$typeof === U) return it(e);
    }
    throw Error(o(438, String(e)));
  }
  function uc(e) {
    var t = null,
      a = ge.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var r = ge.alternate;
      r !== null &&
        ((r = r.updateQueue),
        r !== null &&
          ((r = r.memoCache),
          r != null &&
            (t = {
              data: r.data.map(function (l) {
                return l.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = cc()), (ge.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), r = 0; r < e; r++) a[r] = F;
    return t.index++, a;
  }
  function pn(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Qr(e) {
    var t = Ve();
    return fc(t, Ce, e);
  }
  function fc(e, t, a) {
    var r = e.queue;
    if (r === null) throw Error(o(311));
    r.lastRenderedReducer = a;
    var l = e.baseQueue,
      u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var y = l.next;
        (l.next = u.next), (u.next = y);
      }
      (t.baseQueue = l = u), (r.pending = null);
    }
    if (((u = e.baseState), l === null)) e.memoizedState = u;
    else {
      t = l.next;
      var _ = (y = null),
        x = null,
        N = t,
        H = !1;
      do {
        var Q = N.lane & -536870913;
        if (Q !== N.lane ? (_e & Q) === Q : (In & Q) === Q) {
          var j = N.revertLane;
          if (j === 0)
            x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: N.action,
                  hasEagerState: N.hasEagerState,
                  eagerState: N.eagerState,
                  next: null,
                }),
              Q === gs && (H = !0);
          else if ((In & j) === j) {
            (N = N.next), j === gs && (H = !0);
            continue;
          } else
            (Q = {
              lane: 0,
              revertLane: N.revertLane,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null,
            }),
              x === null ? ((_ = x = Q), (y = u)) : (x = x.next = Q),
              (ge.lanes |= j),
              (Qn |= j);
          (Q = N.action),
            Ma && a(u, Q),
            (u = N.hasEagerState ? N.eagerState : a(u, Q));
        } else
          (j = {
            lane: Q,
            revertLane: N.revertLane,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null,
          }),
            x === null ? ((_ = x = j), (y = u)) : (x = x.next = j),
            (ge.lanes |= Q),
            (Qn |= Q);
        N = N.next;
      } while (N !== null && N !== t);
      if (
        (x === null ? (y = u) : (x.next = _),
        !wt(u, e.memoizedState) && ((Xe = !0), H && ((a = ms), a !== null)))
      )
        throw a;
      (e.memoizedState = u),
        (e.baseState = y),
        (e.baseQueue = x),
        (r.lastRenderedState = u);
    }
    return l === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function dc(e) {
    var t = Ve(),
      a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var r = a.dispatch,
      l = a.pending,
      u = t.memoizedState;
    if (l !== null) {
      a.pending = null;
      var y = (l = l.next);
      do (u = e(u, y.action)), (y = y.next);
      while (y !== l);
      wt(u, t.memoizedState) || (Xe = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (a.lastRenderedState = u);
    }
    return [u, r];
  }
  function bh(e, t, a) {
    var r = ge,
      l = Ve(),
      u = Ee;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var y = !wt((Ce || l).memoizedState, a);
    y && ((l.memoizedState = a), (Xe = !0)), (l = l.queue);
    var _ = Th.bind(null, r, l, e);
    if (
      (Mi(2048, 8, _, [e]),
      l.getSnapshot !== t || y || (Ge !== null && Ge.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        Ss(9, Kr(), wh.bind(null, r, l, a, t), null),
        ke === null)
      )
        throw Error(o(349));
      u || (In & 124) !== 0 || _h(r, t, a);
    }
    return a;
  }
  function _h(e, t, a) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ge.updateQueue),
      t === null
        ? ((t = cc()), (ge.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e));
  }
  function wh(e, t, a, r) {
    (t.value = a), (t.getSnapshot = r), Eh(t) && xh(e);
  }
  function Th(e, t, a) {
    return a(function () {
      Eh(t) && xh(e);
    });
  }
  function Eh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !wt(e, a);
    } catch {
      return !0;
    }
  }
  function xh(e) {
    var t = us(e, 2);
    t !== null && At(t, e, 2);
  }
  function hc(e) {
    var t = ht();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Ma)) {
        Dn(!0);
        try {
          a();
        } finally {
          Dn(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pn,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Rh(e, t, a, r) {
    return (e.baseState = a), fc(e, Ce, typeof r == 'function' ? r : pn);
  }
  function a1(e, t, a, r, l) {
    if (Yr(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var u = {
        payload: l,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (y) {
          u.listeners.push(y);
        },
      };
      C.T !== null ? a(!0) : (u.isTransition = !1),
        r(u),
        (a = t.pending),
        a === null
          ? ((u.next = t.pending = u), Ch(t, u))
          : ((u.next = a.next), (t.pending = a.next = u));
    }
  }
  function Ch(e, t) {
    var a = t.action,
      r = t.payload,
      l = e.state;
    if (t.isTransition) {
      var u = C.T,
        y = {};
      C.T = y;
      try {
        var _ = a(l, r),
          x = C.S;
        x !== null && x(y, _), Ah(e, t, _);
      } catch (N) {
        gc(e, t, N);
      } finally {
        C.T = u;
      }
    } else
      try {
        (u = a(l, r)), Ah(e, t, u);
      } catch (N) {
        gc(e, t, N);
      }
  }
  function Ah(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (r) {
            Mh(e, t, r);
          },
          function (r) {
            return gc(e, t, r);
          }
        )
      : Mh(e, t, a);
  }
  function Mh(e, t, a) {
    (t.status = 'fulfilled'),
      (t.value = a),
      Oh(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Ch(e, a)));
  }
  function gc(e, t, a) {
    var r = e.pending;
    if (((e.pending = null), r !== null)) {
      r = r.next;
      do (t.status = 'rejected'), (t.reason = a), Oh(t), (t = t.next);
      while (t !== r);
    }
    e.action = null;
  }
  function Oh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function kh(e, t) {
    return t;
  }
  function Dh(e, t) {
    if (Ee) {
      var a = ke.formState;
      if (a !== null) {
        e: {
          var r = ge;
          if (Ee) {
            if (Ue) {
              t: {
                for (var l = Ue, u = Wt; l.nodeType !== 8; ) {
                  if (!u) {
                    l = null;
                    break t;
                  }
                  if (((l = Yt(l.nextSibling)), l === null)) {
                    l = null;
                    break t;
                  }
                }
                (u = l.data), (l = u === 'F!' || u === 'F' ? l : null);
              }
              if (l) {
                (Ue = Yt(l.nextSibling)), (r = l.data === 'F!');
                break e;
              }
            }
            xa(r);
          }
          r = !1;
        }
        r && (t = a[0]);
      }
    }
    return (
      (a = ht()),
      (a.memoizedState = a.baseState = t),
      (r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: kh,
        lastRenderedState: t,
      }),
      (a.queue = r),
      (a = Wh.bind(null, ge, r)),
      (r.dispatch = a),
      (r = hc(!1)),
      (u = Sc.bind(null, ge, !1, r.queue)),
      (r = ht()),
      (l = { state: t, dispatch: null, action: e, pending: null }),
      (r.queue = l),
      (a = a1.bind(null, ge, l, u, a)),
      (l.dispatch = a),
      (r.memoizedState = e),
      [t, a, !1]
    );
  }
  function Nh(e) {
    var t = Ve();
    return Lh(t, Ce, e);
  }
  function Lh(e, t, a) {
    if (
      ((t = fc(e, t, kh)[0]),
      (e = Qr(pn)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var r = Ai(t);
      } catch (y) {
        throw y === wi ? Hr : y;
      }
    else r = t;
    t = Ve();
    var l = t.queue,
      u = l.dispatch;
    return (
      a !== t.memoizedState &&
        ((ge.flags |= 2048), Ss(9, Kr(), s1.bind(null, l, a), null)),
      [r, u, e]
    );
  }
  function s1(e, t) {
    e.action = t;
  }
  function jh(e) {
    var t = Ve(),
      a = Ce;
    if (a !== null) return Lh(t, a, e);
    Ve(), (t = t.memoizedState), (a = Ve());
    var r = a.queue.dispatch;
    return (a.memoizedState = e), [t, r, !1];
  }
  function Ss(e, t, a, r) {
    return (
      (e = { tag: e, create: a, deps: r, inst: t, next: null }),
      (t = ge.updateQueue),
      t === null && ((t = cc()), (ge.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((r = a.next), (a.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Kr() {
    return { destroy: void 0, resource: void 0 };
  }
  function Bh() {
    return Ve().memoizedState;
  }
  function Fr(e, t, a, r) {
    var l = ht();
    (r = r === void 0 ? null : r),
      (ge.flags |= e),
      (l.memoizedState = Ss(1 | t, Kr(), a, r));
  }
  function Mi(e, t, a, r) {
    var l = Ve();
    r = r === void 0 ? null : r;
    var u = l.memoizedState.inst;
    Ce !== null && r !== null && sc(r, Ce.memoizedState.deps)
      ? (l.memoizedState = Ss(t, u, a, r))
      : ((ge.flags |= e), (l.memoizedState = Ss(1 | t, u, a, r)));
  }
  function zh(e, t) {
    Fr(8390656, 8, e, t);
  }
  function Uh(e, t) {
    Mi(2048, 8, e, t);
  }
  function Ih(e, t) {
    return Mi(4, 2, e, t);
  }
  function Hh(e, t) {
    return Mi(4, 4, e, t);
  }
  function Ph(e, t) {
    if (typeof t == 'function') {
      e = e();
      var a = t(e);
      return function () {
        typeof a == 'function' ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function qh(e, t, a) {
    (a = a != null ? a.concat([e]) : null), Mi(4, 4, Ph.bind(null, t, e), a);
  }
  function mc() {}
  function $h(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    return t !== null && sc(t, r[1]) ? r[0] : ((a.memoizedState = [e, t]), e);
  }
  function Gh(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    if (t !== null && sc(t, r[1])) return r[0];
    if (((r = e()), Ma)) {
      Dn(!0);
      try {
        e();
      } finally {
        Dn(!1);
      }
    }
    return (a.memoizedState = [r, t]), r;
  }
  function pc(e, t, a) {
    return a === void 0 || (In & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Kg()), (ge.lanes |= e), (Qn |= e), a);
  }
  function Vh(e, t, a, r) {
    return wt(a, t)
      ? a
      : ps.current !== null
      ? ((e = pc(e, a, r)), wt(e, t) || (Xe = !0), e)
      : (In & 42) === 0
      ? ((Xe = !0), (e.memoizedState = a))
      : ((e = Kg()), (ge.lanes |= e), (Qn |= e), t);
  }
  function Qh(e, t, a, r, l) {
    var u = V.p;
    V.p = u !== 0 && 8 > u ? u : 8;
    var y = C.T,
      _ = {};
    (C.T = _), Sc(e, !1, t, a);
    try {
      var x = l(),
        N = C.S;
      if (
        (N !== null && N(_, x),
        x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var H = e1(x, r);
        Oi(e, t, H, Ct(e));
      } else Oi(e, t, r, Ct(e));
    } catch (Q) {
      Oi(e, t, { then: function () {}, status: 'rejected', reason: Q }, Ct());
    } finally {
      (V.p = u), (C.T = y);
    }
  }
  function i1() {}
  function yc(e, t, a, r) {
    if (e.tag !== 5) throw Error(o(476));
    var l = Kh(e).queue;
    Qh(
      e,
      l,
      t,
      W,
      a === null
        ? i1
        : function () {
            return Fh(e), a(r);
          }
    );
  }
  function Kh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pn,
        lastRenderedState: W,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: pn,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Fh(e) {
    var t = Kh(e).next.queue;
    Oi(e, t, {}, Ct());
  }
  function vc() {
    return it(Fi);
  }
  function Yh() {
    return Ve().memoizedState;
  }
  function Xh() {
    return Ve().memoizedState;
  }
  function r1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ct();
          e = zn(a);
          var r = Un(t, e, a);
          r !== null && (At(r, t, a), Ei(r, t, a)),
            (t = { cache: Fl() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function o1(e, t, a) {
    var r = Ct();
    (a = {
      lane: r,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Yr(e)
        ? Zh(t, a)
        : ((a = Ul(e, t, a, r)), a !== null && (At(a, e, r), Jh(a, t, r)));
  }
  function Wh(e, t, a) {
    var r = Ct();
    Oi(e, t, a, r);
  }
  function Oi(e, t, a, r) {
    var l = {
      lane: r,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Yr(e)) Zh(t, l);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var y = t.lastRenderedState,
            _ = u(y, a);
          if (((l.hasEagerState = !0), (l.eagerState = _), wt(_, y)))
            return Dr(e, t, l, 0), ke === null && kr(), !1;
        } catch {
        } finally {
        }
      if (((a = Ul(e, t, l, r)), a !== null))
        return At(a, e, r), Jh(a, t, r), !0;
    }
    return !1;
  }
  function Sc(e, t, a, r) {
    if (
      ((r = {
        lane: 2,
        revertLane: Wc(),
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Yr(e))
    ) {
      if (t) throw Error(o(479));
    } else (t = Ul(e, a, r, 2)), t !== null && At(t, e, 2);
  }
  function Yr(e) {
    var t = e.alternate;
    return e === ge || (t !== null && t === ge);
  }
  function Zh(e, t) {
    ys = $r = !0;
    var a = e.pending;
    a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (e.pending = t);
  }
  function Jh(e, t, a) {
    if ((a & 4194048) !== 0) {
      var r = t.lanes;
      (r &= e.pendingLanes), (a |= r), (t.lanes = a), od(e, a);
    }
  }
  var Xr = {
      readContext: it,
      use: Vr,
      useCallback: qe,
      useContext: qe,
      useEffect: qe,
      useImperativeHandle: qe,
      useLayoutEffect: qe,
      useInsertionEffect: qe,
      useMemo: qe,
      useReducer: qe,
      useRef: qe,
      useState: qe,
      useDebugValue: qe,
      useDeferredValue: qe,
      useTransition: qe,
      useSyncExternalStore: qe,
      useId: qe,
      useHostTransitionStatus: qe,
      useFormState: qe,
      useActionState: qe,
      useOptimistic: qe,
      useMemoCache: qe,
      useCacheRefresh: qe,
    },
    eg = {
      readContext: it,
      use: Vr,
      useCallback: function (e, t) {
        return (ht().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: it,
      useEffect: zh,
      useImperativeHandle: function (e, t, a) {
        (a = a != null ? a.concat([e]) : null),
          Fr(4194308, 4, Ph.bind(null, t, e), a);
      },
      useLayoutEffect: function (e, t) {
        return Fr(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Fr(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = ht();
        t = t === void 0 ? null : t;
        var r = e();
        if (Ma) {
          Dn(!0);
          try {
            e();
          } finally {
            Dn(!1);
          }
        }
        return (a.memoizedState = [r, t]), r;
      },
      useReducer: function (e, t, a) {
        var r = ht();
        if (a !== void 0) {
          var l = a(t);
          if (Ma) {
            Dn(!0);
            try {
              a(t);
            } finally {
              Dn(!1);
            }
          }
        } else l = t;
        return (
          (r.memoizedState = r.baseState = l),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: l,
          }),
          (r.queue = e),
          (e = e.dispatch = o1.bind(null, ge, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = ht();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = hc(e);
        var t = e.queue,
          a = Wh.bind(null, ge, t);
        return (t.dispatch = a), [e.memoizedState, a];
      },
      useDebugValue: mc,
      useDeferredValue: function (e, t) {
        var a = ht();
        return pc(a, e, t);
      },
      useTransition: function () {
        var e = hc(!1);
        return (
          (e = Qh.bind(null, ge, e.queue, !0, !1)),
          (ht().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, a) {
        var r = ge,
          l = ht();
        if (Ee) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), ke === null)) throw Error(o(349));
          (_e & 124) !== 0 || _h(r, t, a);
        }
        l.memoizedState = a;
        var u = { value: a, getSnapshot: t };
        return (
          (l.queue = u),
          zh(Th.bind(null, r, u, e), [e]),
          (r.flags |= 2048),
          Ss(9, Kr(), wh.bind(null, r, u, a, t), null),
          a
        );
      },
      useId: function () {
        var e = ht(),
          t = ke.identifierPrefix;
        if (Ee) {
          var a = hn,
            r = dn;
          (a = (r & ~(1 << (32 - _t(r) - 1))).toString(32) + a),
            (t = '«' + t + 'R' + a),
            (a = Gr++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '»');
        } else (a = t1++), (t = '«' + t + 'r' + a.toString(32) + '»');
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: vc,
      useFormState: Dh,
      useActionState: Dh,
      useOptimistic: function (e) {
        var t = ht();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a),
          (t = Sc.bind(null, ge, !0, a)),
          (a.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: uc,
      useCacheRefresh: function () {
        return (ht().memoizedState = r1.bind(null, ge));
      },
    },
    tg = {
      readContext: it,
      use: Vr,
      useCallback: $h,
      useContext: it,
      useEffect: Uh,
      useImperativeHandle: qh,
      useInsertionEffect: Ih,
      useLayoutEffect: Hh,
      useMemo: Gh,
      useReducer: Qr,
      useRef: Bh,
      useState: function () {
        return Qr(pn);
      },
      useDebugValue: mc,
      useDeferredValue: function (e, t) {
        var a = Ve();
        return Vh(a, Ce.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Qr(pn)[0],
          t = Ve().memoizedState;
        return [typeof e == 'boolean' ? e : Ai(e), t];
      },
      useSyncExternalStore: bh,
      useId: Yh,
      useHostTransitionStatus: vc,
      useFormState: Nh,
      useActionState: Nh,
      useOptimistic: function (e, t) {
        var a = Ve();
        return Rh(a, Ce, e, t);
      },
      useMemoCache: uc,
      useCacheRefresh: Xh,
    },
    l1 = {
      readContext: it,
      use: Vr,
      useCallback: $h,
      useContext: it,
      useEffect: Uh,
      useImperativeHandle: qh,
      useInsertionEffect: Ih,
      useLayoutEffect: Hh,
      useMemo: Gh,
      useReducer: dc,
      useRef: Bh,
      useState: function () {
        return dc(pn);
      },
      useDebugValue: mc,
      useDeferredValue: function (e, t) {
        var a = Ve();
        return Ce === null ? pc(a, e, t) : Vh(a, Ce.memoizedState, e, t);
      },
      useTransition: function () {
        var e = dc(pn)[0],
          t = Ve().memoizedState;
        return [typeof e == 'boolean' ? e : Ai(e), t];
      },
      useSyncExternalStore: bh,
      useId: Yh,
      useHostTransitionStatus: vc,
      useFormState: jh,
      useActionState: jh,
      useOptimistic: function (e, t) {
        var a = Ve();
        return Ce !== null
          ? Rh(a, Ce, e, t)
          : ((a.baseState = e), [e, a.queue.dispatch]);
      },
      useMemoCache: uc,
      useCacheRefresh: Xh,
    },
    bs = null,
    ki = 0;
  function Wr(e) {
    var t = ki;
    return (ki += 1), bs === null && (bs = []), dh(bs, e, t);
  }
  function Di(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Zr(e, t) {
    throw t.$$typeof === p
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]'
              ? 'object with keys {' + Object.keys(t).join(', ') + '}'
              : e
          )
        ));
  }
  function ng(e) {
    var t = e._init;
    return t(e._payload);
  }
  function ag(e) {
    function t(k, A) {
      if (e) {
        var D = k.deletions;
        D === null ? ((k.deletions = [A]), (k.flags |= 16)) : D.push(A);
      }
    }
    function a(k, A) {
      if (!e) return null;
      for (; A !== null; ) t(k, A), (A = A.sibling);
      return null;
    }
    function r(k) {
      for (var A = new Map(); k !== null; )
        k.key !== null ? A.set(k.key, k) : A.set(k.index, k), (k = k.sibling);
      return A;
    }
    function l(k, A) {
      return (k = fn(k, A)), (k.index = 0), (k.sibling = null), k;
    }
    function u(k, A, D) {
      return (
        (k.index = D),
        e
          ? ((D = k.alternate),
            D !== null
              ? ((D = D.index), D < A ? ((k.flags |= 67108866), A) : D)
              : ((k.flags |= 67108866), A))
          : ((k.flags |= 1048576), A)
      );
    }
    function y(k) {
      return e && k.alternate === null && (k.flags |= 67108866), k;
    }
    function _(k, A, D, q) {
      return A === null || A.tag !== 6
        ? ((A = Hl(D, k.mode, q)), (A.return = k), A)
        : ((A = l(A, D)), (A.return = k), A);
    }
    function x(k, A, D, q) {
      var se = D.type;
      return se === w
        ? H(k, A, D.props.children, q, D.key)
        : A !== null &&
          (A.elementType === se ||
            (typeof se == 'object' &&
              se !== null &&
              se.$$typeof === K &&
              ng(se) === A.type))
        ? ((A = l(A, D.props)), Di(A, D), (A.return = k), A)
        : ((A = Lr(D.type, D.key, D.props, null, k.mode, q)),
          Di(A, D),
          (A.return = k),
          A);
    }
    function N(k, A, D, q) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== D.containerInfo ||
        A.stateNode.implementation !== D.implementation
        ? ((A = Pl(D, k.mode, q)), (A.return = k), A)
        : ((A = l(A, D.children || [])), (A.return = k), A);
    }
    function H(k, A, D, q, se) {
      return A === null || A.tag !== 7
        ? ((A = _a(D, k.mode, q, se)), (A.return = k), A)
        : ((A = l(A, D)), (A.return = k), A);
    }
    function Q(k, A, D) {
      if (
        (typeof A == 'string' && A !== '') ||
        typeof A == 'number' ||
        typeof A == 'bigint'
      )
        return (A = Hl('' + A, k.mode, D)), (A.return = k), A;
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case b:
            return (
              (D = Lr(A.type, A.key, A.props, null, k.mode, D)),
              Di(D, A),
              (D.return = k),
              D
            );
          case T:
            return (A = Pl(A, k.mode, D)), (A.return = k), A;
          case K:
            var q = A._init;
            return (A = q(A._payload)), Q(k, A, D);
        }
        if (be(A) || oe(A))
          return (A = _a(A, k.mode, D, null)), (A.return = k), A;
        if (typeof A.then == 'function') return Q(k, Wr(A), D);
        if (A.$$typeof === U) return Q(k, Ur(k, A), D);
        Zr(k, A);
      }
      return null;
    }
    function j(k, A, D, q) {
      var se = A !== null ? A.key : null;
      if (
        (typeof D == 'string' && D !== '') ||
        typeof D == 'number' ||
        typeof D == 'bigint'
      )
        return se !== null ? null : _(k, A, '' + D, q);
      if (typeof D == 'object' && D !== null) {
        switch (D.$$typeof) {
          case b:
            return D.key === se ? x(k, A, D, q) : null;
          case T:
            return D.key === se ? N(k, A, D, q) : null;
          case K:
            return (se = D._init), (D = se(D._payload)), j(k, A, D, q);
        }
        if (be(D) || oe(D)) return se !== null ? null : H(k, A, D, q, null);
        if (typeof D.then == 'function') return j(k, A, Wr(D), q);
        if (D.$$typeof === U) return j(k, A, Ur(k, D), q);
        Zr(k, D);
      }
      return null;
    }
    function B(k, A, D, q, se) {
      if (
        (typeof q == 'string' && q !== '') ||
        typeof q == 'number' ||
        typeof q == 'bigint'
      )
        return (k = k.get(D) || null), _(A, k, '' + q, se);
      if (typeof q == 'object' && q !== null) {
        switch (q.$$typeof) {
          case b:
            return (
              (k = k.get(q.key === null ? D : q.key) || null), x(A, k, q, se)
            );
          case T:
            return (
              (k = k.get(q.key === null ? D : q.key) || null), N(A, k, q, se)
            );
          case K:
            var pe = q._init;
            return (q = pe(q._payload)), B(k, A, D, q, se);
        }
        if (be(q) || oe(q)) return (k = k.get(D) || null), H(A, k, q, se, null);
        if (typeof q.then == 'function') return B(k, A, D, Wr(q), se);
        if (q.$$typeof === U) return B(k, A, D, Ur(A, q), se);
        Zr(A, q);
      }
      return null;
    }
    function fe(k, A, D, q) {
      for (
        var se = null, pe = null, ie = A, ue = (A = 0), Ze = null;
        ie !== null && ue < D.length;
        ue++
      ) {
        ie.index > ue ? ((Ze = ie), (ie = null)) : (Ze = ie.sibling);
        var we = j(k, ie, D[ue], q);
        if (we === null) {
          ie === null && (ie = Ze);
          break;
        }
        e && ie && we.alternate === null && t(k, ie),
          (A = u(we, A, ue)),
          pe === null ? (se = we) : (pe.sibling = we),
          (pe = we),
          (ie = Ze);
      }
      if (ue === D.length) return a(k, ie), Ee && Ta(k, ue), se;
      if (ie === null) {
        for (; ue < D.length; ue++)
          (ie = Q(k, D[ue], q)),
            ie !== null &&
              ((A = u(ie, A, ue)),
              pe === null ? (se = ie) : (pe.sibling = ie),
              (pe = ie));
        return Ee && Ta(k, ue), se;
      }
      for (ie = r(ie); ue < D.length; ue++)
        (Ze = B(ie, k, ue, D[ue], q)),
          Ze !== null &&
            (e &&
              Ze.alternate !== null &&
              ie.delete(Ze.key === null ? ue : Ze.key),
            (A = u(Ze, A, ue)),
            pe === null ? (se = Ze) : (pe.sibling = Ze),
            (pe = Ze));
      return (
        e &&
          ie.forEach(function (ta) {
            return t(k, ta);
          }),
        Ee && Ta(k, ue),
        se
      );
    }
    function ce(k, A, D, q) {
      if (D == null) throw Error(o(151));
      for (
        var se = null,
          pe = null,
          ie = A,
          ue = (A = 0),
          Ze = null,
          we = D.next();
        ie !== null && !we.done;
        ue++, we = D.next()
      ) {
        ie.index > ue ? ((Ze = ie), (ie = null)) : (Ze = ie.sibling);
        var ta = j(k, ie, we.value, q);
        if (ta === null) {
          ie === null && (ie = Ze);
          break;
        }
        e && ie && ta.alternate === null && t(k, ie),
          (A = u(ta, A, ue)),
          pe === null ? (se = ta) : (pe.sibling = ta),
          (pe = ta),
          (ie = Ze);
      }
      if (we.done) return a(k, ie), Ee && Ta(k, ue), se;
      if (ie === null) {
        for (; !we.done; ue++, we = D.next())
          (we = Q(k, we.value, q)),
            we !== null &&
              ((A = u(we, A, ue)),
              pe === null ? (se = we) : (pe.sibling = we),
              (pe = we));
        return Ee && Ta(k, ue), se;
      }
      for (ie = r(ie); !we.done; ue++, we = D.next())
        (we = B(ie, k, ue, we.value, q)),
          we !== null &&
            (e &&
              we.alternate !== null &&
              ie.delete(we.key === null ? ue : we.key),
            (A = u(we, A, ue)),
            pe === null ? (se = we) : (pe.sibling = we),
            (pe = we));
      return (
        e &&
          ie.forEach(function (cS) {
            return t(k, cS);
          }),
        Ee && Ta(k, ue),
        se
      );
    }
    function Me(k, A, D, q) {
      if (
        (typeof D == 'object' &&
          D !== null &&
          D.type === w &&
          D.key === null &&
          (D = D.props.children),
        typeof D == 'object' && D !== null)
      ) {
        switch (D.$$typeof) {
          case b:
            e: {
              for (var se = D.key; A !== null; ) {
                if (A.key === se) {
                  if (((se = D.type), se === w)) {
                    if (A.tag === 7) {
                      a(k, A.sibling),
                        (q = l(A, D.props.children)),
                        (q.return = k),
                        (k = q);
                      break e;
                    }
                  } else if (
                    A.elementType === se ||
                    (typeof se == 'object' &&
                      se !== null &&
                      se.$$typeof === K &&
                      ng(se) === A.type)
                  ) {
                    a(k, A.sibling),
                      (q = l(A, D.props)),
                      Di(q, D),
                      (q.return = k),
                      (k = q);
                    break e;
                  }
                  a(k, A);
                  break;
                } else t(k, A);
                A = A.sibling;
              }
              D.type === w
                ? ((q = _a(D.props.children, k.mode, q, D.key)),
                  (q.return = k),
                  (k = q))
                : ((q = Lr(D.type, D.key, D.props, null, k.mode, q)),
                  Di(q, D),
                  (q.return = k),
                  (k = q));
            }
            return y(k);
          case T:
            e: {
              for (se = D.key; A !== null; ) {
                if (A.key === se)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === D.containerInfo &&
                    A.stateNode.implementation === D.implementation
                  ) {
                    a(k, A.sibling),
                      (q = l(A, D.children || [])),
                      (q.return = k),
                      (k = q);
                    break e;
                  } else {
                    a(k, A);
                    break;
                  }
                else t(k, A);
                A = A.sibling;
              }
              (q = Pl(D, k.mode, q)), (q.return = k), (k = q);
            }
            return y(k);
          case K:
            return (se = D._init), (D = se(D._payload)), Me(k, A, D, q);
        }
        if (be(D)) return fe(k, A, D, q);
        if (oe(D)) {
          if (((se = oe(D)), typeof se != 'function')) throw Error(o(150));
          return (D = se.call(D)), ce(k, A, D, q);
        }
        if (typeof D.then == 'function') return Me(k, A, Wr(D), q);
        if (D.$$typeof === U) return Me(k, A, Ur(k, D), q);
        Zr(k, D);
      }
      return (typeof D == 'string' && D !== '') ||
        typeof D == 'number' ||
        typeof D == 'bigint'
        ? ((D = '' + D),
          A !== null && A.tag === 6
            ? (a(k, A.sibling), (q = l(A, D)), (q.return = k), (k = q))
            : (a(k, A), (q = Hl(D, k.mode, q)), (q.return = k), (k = q)),
          y(k))
        : a(k, A);
    }
    return function (k, A, D, q) {
      try {
        ki = 0;
        var se = Me(k, A, D, q);
        return (bs = null), se;
      } catch (ie) {
        if (ie === wi || ie === Hr) throw ie;
        var pe = Tt(29, ie, null, k.mode);
        return (pe.lanes = q), (pe.return = k), pe;
      } finally {
      }
    };
  }
  var _s = ag(!0),
    sg = ag(!1),
    It = P(null),
    Zt = null;
  function Hn(e) {
    var t = e.alternate;
    J(Ke, Ke.current & 1),
      J(It, e),
      Zt === null &&
        (t === null || ps.current !== null || t.memoizedState !== null) &&
        (Zt = e);
  }
  function ig(e) {
    if (e.tag === 22) {
      if ((J(Ke, Ke.current), J(It, e), Zt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Zt = e);
      }
    } else Pn();
  }
  function Pn() {
    J(Ke, Ke.current), J(It, It.current);
  }
  function yn(e) {
    ee(It), Zt === e && (Zt = null), ee(Ke);
  }
  var Ke = P(0);
  function Jr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === '$?' || cu(a))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function bc(e, t, a, r) {
    (t = e.memoizedState),
      (a = a(r, t)),
      (a = a == null ? t : v({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var _c = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var r = Ct(),
        l = zn(r);
      (l.payload = t),
        a != null && (l.callback = a),
        (t = Un(e, l, r)),
        t !== null && (At(t, e, r), Ei(t, e, r));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var r = Ct(),
        l = zn(r);
      (l.tag = 1),
        (l.payload = t),
        a != null && (l.callback = a),
        (t = Un(e, l, r)),
        t !== null && (At(t, e, r), Ei(t, e, r));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Ct(),
        r = zn(a);
      (r.tag = 2),
        t != null && (r.callback = t),
        (t = Un(e, r, a)),
        t !== null && (At(t, e, a), Ei(t, e, a));
    },
  };
  function rg(e, t, a, r, l, u, y) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(r, u, y)
        : t.prototype && t.prototype.isPureReactComponent
        ? !gi(a, r) || !gi(l, u)
        : !0
    );
  }
  function og(e, t, a, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == 'function' &&
        t.componentWillReceiveProps(a, r),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, r),
      t.state !== e && _c.enqueueReplaceState(t, t.state, null);
  }
  function Oa(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var r in t) r !== 'ref' && (a[r] = t[r]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = v({}, a));
      for (var l in e) a[l] === void 0 && (a[l] = e[l]);
    }
    return a;
  }
  var eo =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          if (
            typeof window == 'object' &&
            typeof window.ErrorEvent == 'function'
          ) {
            var t = new window.ErrorEvent('error', {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == 'object' &&
                e !== null &&
                typeof e.message == 'string'
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == 'object' &&
            typeof process.emit == 'function'
          ) {
            process.emit('uncaughtException', e);
            return;
          }
          console.error(e);
        };
  function lg(e) {
    eo(e);
  }
  function cg(e) {
    console.error(e);
  }
  function ug(e) {
    eo(e);
  }
  function to(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function fg(e, t, a) {
    try {
      var r = e.onCaughtError;
      r(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function wc(e, t, a) {
    return (
      (a = zn(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        to(e, t);
      }),
      a
    );
  }
  function dg(e) {
    return (e = zn(e)), (e.tag = 3), e;
  }
  function hg(e, t, a, r) {
    var l = a.type.getDerivedStateFromError;
    if (typeof l == 'function') {
      var u = r.value;
      (e.payload = function () {
        return l(u);
      }),
        (e.callback = function () {
          fg(t, a, r);
        });
    }
    var y = a.stateNode;
    y !== null &&
      typeof y.componentDidCatch == 'function' &&
      (e.callback = function () {
        fg(t, a, r),
          typeof l != 'function' &&
            (Kn === null ? (Kn = new Set([this])) : Kn.add(this));
        var _ = r.stack;
        this.componentDidCatch(r.value, {
          componentStack: _ !== null ? _ : '',
        });
      });
  }
  function c1(e, t, a, r, l) {
    if (
      ((a.flags |= 32768),
      r !== null && typeof r == 'object' && typeof r.then == 'function')
    ) {
      if (
        ((t = a.alternate),
        t !== null && Si(t, a, l, !0),
        (a = It.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 13:
            return (
              Zt === null ? Qc() : a.alternate === null && Ie === 0 && (Ie = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = l),
              r === Wl
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([r])) : t.add(r),
                  Fc(e, r, l)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              r === Wl
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([r]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([r])) : a.add(r)),
                  Fc(e, r, l)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return Fc(e, r, l), Qc(), !1;
    }
    if (Ee)
      return (
        (t = It.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = l),
            r !== Gl && ((e = Error(o(422), { cause: r })), vi(jt(e, a))))
          : (r !== Gl && ((t = Error(o(423), { cause: r })), vi(jt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (l &= -l),
            (e.lanes |= l),
            (r = jt(r, a)),
            (l = wc(e.stateNode, r, l)),
            ec(e, l),
            Ie !== 4 && (Ie = 2)),
        !1
      );
    var u = Error(o(520), { cause: r });
    if (
      ((u = jt(u, a)),
      Ii === null ? (Ii = [u]) : Ii.push(u),
      Ie !== 4 && (Ie = 2),
      t === null)
    )
      return !0;
    (r = jt(r, a)), (a = t);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = l & -l),
            (a.lanes |= e),
            (e = wc(a.stateNode, r, e)),
            ec(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (u = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (u !== null &&
                  typeof u.componentDidCatch == 'function' &&
                  (Kn === null || !Kn.has(u)))))
          )
            return (
              (a.flags |= 65536),
              (l &= -l),
              (a.lanes |= l),
              (l = dg(l)),
              hg(l, e, a, r),
              ec(a, l),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var gg = Error(o(461)),
    Xe = !1;
  function tt(e, t, a, r) {
    t.child = e === null ? sg(t, null, a, r) : _s(t, e.child, a, r);
  }
  function mg(e, t, a, r, l) {
    a = a.render;
    var u = t.ref;
    if ('ref' in r) {
      var y = {};
      for (var _ in r) _ !== 'ref' && (y[_] = r[_]);
    } else y = r;
    return (
      Ca(t),
      (r = ic(e, t, a, y, u, l)),
      (_ = rc()),
      e !== null && !Xe
        ? (oc(e, t, l), vn(e, t, l))
        : (Ee && _ && ql(t), (t.flags |= 1), tt(e, t, r, l), t.child)
    );
  }
  function pg(e, t, a, r, l) {
    if (e === null) {
      var u = a.type;
      return typeof u == 'function' &&
        !Il(u) &&
        u.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = u), yg(e, t, u, r, l))
        : ((e = Lr(a.type, null, r, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((u = e.child), !Oc(e, l))) {
      var y = u.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : gi), a(y, r) && e.ref === t.ref)
      )
        return vn(e, t, l);
    }
    return (
      (t.flags |= 1),
      (e = fn(u, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function yg(e, t, a, r, l) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (gi(u, r) && e.ref === t.ref)
        if (((Xe = !1), (t.pendingProps = r = u), Oc(e, l)))
          (e.flags & 131072) !== 0 && (Xe = !0);
        else return (t.lanes = e.lanes), vn(e, t, l);
    }
    return Tc(e, t, a, r, l);
  }
  function vg(e, t, a) {
    var r = t.pendingProps,
      l = r.children,
      u = e !== null ? e.memoizedState : null;
    if (r.mode === 'hidden') {
      if ((t.flags & 128) !== 0) {
        if (((r = u !== null ? u.baseLanes | a : a), e !== null)) {
          for (l = t.child = e.child, u = 0; l !== null; )
            (u = u | l.lanes | l.childLanes), (l = l.sibling);
          t.childLanes = u & ~r;
        } else (t.childLanes = 0), (t.child = null);
        return Sg(e, t, r, a);
      }
      if ((a & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Ir(t, u !== null ? u.cachePool : null),
          u !== null ? yh(t, u) : nc(),
          ig(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Sg(e, t, u !== null ? u.baseLanes | a : a, a)
        );
    } else
      u !== null
        ? (Ir(t, u.cachePool), yh(t, u), Pn(), (t.memoizedState = null))
        : (e !== null && Ir(t, null), nc(), Pn());
    return tt(e, t, l, a), t.child;
  }
  function Sg(e, t, a, r) {
    var l = Xl();
    return (
      (l = l === null ? null : { parent: Qe._currentValue, pool: l }),
      (t.memoizedState = { baseLanes: a, cachePool: l }),
      e !== null && Ir(t, null),
      nc(),
      ig(t),
      e !== null && Si(e, t, r, !0),
      null
    );
  }
  function no(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Tc(e, t, a, r, l) {
    return (
      Ca(t),
      (a = ic(e, t, a, r, void 0, l)),
      (r = rc()),
      e !== null && !Xe
        ? (oc(e, t, l), vn(e, t, l))
        : (Ee && r && ql(t), (t.flags |= 1), tt(e, t, a, l), t.child)
    );
  }
  function bg(e, t, a, r, l, u) {
    return (
      Ca(t),
      (t.updateQueue = null),
      (a = Sh(t, r, a, l)),
      vh(e),
      (r = rc()),
      e !== null && !Xe
        ? (oc(e, t, u), vn(e, t, u))
        : (Ee && r && ql(t), (t.flags |= 1), tt(e, t, a, u), t.child)
    );
  }
  function _g(e, t, a, r, l) {
    if ((Ca(t), t.stateNode === null)) {
      var u = fs,
        y = a.contextType;
      typeof y == 'object' && y !== null && (u = it(y)),
        (u = new a(r, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = _c),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = r),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Zl(t),
        (y = a.contextType),
        (u.context = typeof y == 'object' && y !== null ? it(y) : fs),
        (u.state = t.memoizedState),
        (y = a.getDerivedStateFromProps),
        typeof y == 'function' && (bc(t, a, y, r), (u.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function' ||
          (typeof u.UNSAFE_componentWillMount != 'function' &&
            typeof u.componentWillMount != 'function') ||
          ((y = u.state),
          typeof u.componentWillMount == 'function' && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == 'function' &&
            u.UNSAFE_componentWillMount(),
          y !== u.state && _c.enqueueReplaceState(u, u.state, null),
          Ri(t, r, u, l),
          xi(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
        (r = !0);
    } else if (e === null) {
      u = t.stateNode;
      var _ = t.memoizedProps,
        x = Oa(a, _);
      u.props = x;
      var N = u.context,
        H = a.contextType;
      (y = fs), typeof H == 'object' && H !== null && (y = it(H));
      var Q = a.getDerivedStateFromProps;
      (H =
        typeof Q == 'function' ||
        typeof u.getSnapshotBeforeUpdate == 'function'),
        (_ = t.pendingProps !== _),
        H ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((_ || N !== y) && og(t, u, r, y)),
        (Bn = !1);
      var j = t.memoizedState;
      (u.state = j),
        Ri(t, r, u, l),
        xi(),
        (N = t.memoizedState),
        _ || j !== N || Bn
          ? (typeof Q == 'function' && (bc(t, a, Q, r), (N = t.memoizedState)),
            (x = Bn || rg(t, a, x, r, j, N, y))
              ? (H ||
                  (typeof u.UNSAFE_componentWillMount != 'function' &&
                    typeof u.componentWillMount != 'function') ||
                  (typeof u.componentWillMount == 'function' &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == 'function' &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == 'function' &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == 'function' &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = N)),
            (u.props = r),
            (u.state = N),
            (u.context = y),
            (r = x))
          : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
            (r = !1));
    } else {
      (u = t.stateNode),
        Jl(e, t),
        (y = t.memoizedProps),
        (H = Oa(a, y)),
        (u.props = H),
        (Q = t.pendingProps),
        (j = u.context),
        (N = a.contextType),
        (x = fs),
        typeof N == 'object' && N !== null && (x = it(N)),
        (_ = a.getDerivedStateFromProps),
        (N =
          typeof _ == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function') ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((y !== Q || j !== x) && og(t, u, r, x)),
        (Bn = !1),
        (j = t.memoizedState),
        (u.state = j),
        Ri(t, r, u, l),
        xi();
      var B = t.memoizedState;
      y !== Q ||
      j !== B ||
      Bn ||
      (e !== null && e.dependencies !== null && zr(e.dependencies))
        ? (typeof _ == 'function' && (bc(t, a, _, r), (B = t.memoizedState)),
          (H =
            Bn ||
            rg(t, a, H, r, j, B, x) ||
            (e !== null && e.dependencies !== null && zr(e.dependencies)))
            ? (N ||
                (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                  typeof u.componentWillUpdate != 'function') ||
                (typeof u.componentWillUpdate == 'function' &&
                  u.componentWillUpdate(r, B, x),
                typeof u.UNSAFE_componentWillUpdate == 'function' &&
                  u.UNSAFE_componentWillUpdate(r, B, x)),
              typeof u.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == 'function' &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != 'function' ||
                (y === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                (y === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = B)),
          (u.props = r),
          (u.state = B),
          (u.context = x),
          (r = H))
        : (typeof u.componentDidUpdate != 'function' ||
            (y === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != 'function' ||
            (y === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return (
      (u = r),
      no(e, t),
      (r = (t.flags & 128) !== 0),
      u || r
        ? ((u = t.stateNode),
          (a =
            r && typeof a.getDerivedStateFromError != 'function'
              ? null
              : u.render()),
          (t.flags |= 1),
          e !== null && r
            ? ((t.child = _s(t, e.child, null, l)),
              (t.child = _s(t, null, a, l)))
            : tt(e, t, a, l),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = vn(e, t, l)),
      e
    );
  }
  function wg(e, t, a, r) {
    return yi(), (t.flags |= 256), tt(e, t, a, r), t.child;
  }
  var Ec = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function xc(e) {
    return { baseLanes: e, cachePool: ch() };
  }
  function Rc(e, t, a) {
    return (e = e !== null ? e.childLanes & ~a : 0), t && (e |= Ht), e;
  }
  function Tg(e, t, a) {
    var r = t.pendingProps,
      l = !1,
      u = (t.flags & 128) !== 0,
      y;
    if (
      ((y = u) ||
        (y =
          e !== null && e.memoizedState === null ? !1 : (Ke.current & 2) !== 0),
      y && ((l = !0), (t.flags &= -129)),
      (y = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ee) {
        if ((l ? Hn(t) : Pn(), Ee)) {
          var _ = Ue,
            x;
          if ((x = _)) {
            e: {
              for (x = _, _ = Wt; x.nodeType !== 8; ) {
                if (!_) {
                  _ = null;
                  break e;
                }
                if (((x = Yt(x.nextSibling)), x === null)) {
                  _ = null;
                  break e;
                }
              }
              _ = x;
            }
            _ !== null
              ? ((t.memoizedState = {
                  dehydrated: _,
                  treeContext: wa !== null ? { id: dn, overflow: hn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (x = Tt(18, null, null, 0)),
                (x.stateNode = _),
                (x.return = t),
                (t.child = x),
                (lt = t),
                (Ue = null),
                (x = !0))
              : (x = !1);
          }
          x || xa(t);
        }
        if (
          ((_ = t.memoizedState),
          _ !== null && ((_ = _.dehydrated), _ !== null))
        )
          return cu(_) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        yn(t);
      }
      return (
        (_ = r.children),
        (r = r.fallback),
        l
          ? (Pn(),
            (l = t.mode),
            (_ = ao({ mode: 'hidden', children: _ }, l)),
            (r = _a(r, l, a, null)),
            (_.return = t),
            (r.return = t),
            (_.sibling = r),
            (t.child = _),
            (l = t.child),
            (l.memoizedState = xc(a)),
            (l.childLanes = Rc(e, y, a)),
            (t.memoizedState = Ec),
            r)
          : (Hn(t), Cc(t, _))
      );
    }
    if (
      ((x = e.memoizedState), x !== null && ((_ = x.dehydrated), _ !== null))
    ) {
      if (u)
        t.flags & 256
          ? (Hn(t), (t.flags &= -257), (t = Ac(e, t, a)))
          : t.memoizedState !== null
          ? (Pn(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (Pn(),
            (l = r.fallback),
            (_ = t.mode),
            (r = ao({ mode: 'visible', children: r.children }, _)),
            (l = _a(l, _, a, null)),
            (l.flags |= 2),
            (r.return = t),
            (l.return = t),
            (r.sibling = l),
            (t.child = r),
            _s(t, e.child, null, a),
            (r = t.child),
            (r.memoizedState = xc(a)),
            (r.childLanes = Rc(e, y, a)),
            (t.memoizedState = Ec),
            (t = l));
      else if ((Hn(t), cu(_))) {
        if (((y = _.nextSibling && _.nextSibling.dataset), y)) var N = y.dgst;
        (y = N),
          (r = Error(o(419))),
          (r.stack = ''),
          (r.digest = y),
          vi({ value: r, source: null, stack: null }),
          (t = Ac(e, t, a));
      } else if (
        (Xe || Si(e, t, a, !1), (y = (a & e.childLanes) !== 0), Xe || y)
      ) {
        if (
          ((y = ke),
          y !== null &&
            ((r = a & -a),
            (r = (r & 42) !== 0 ? 1 : ul(r)),
            (r = (r & (y.suspendedLanes | a)) !== 0 ? 0 : r),
            r !== 0 && r !== x.retryLane))
        )
          throw ((x.retryLane = r), us(e, r), At(y, e, r), gg);
        _.data === '$?' || Qc(), (t = Ac(e, t, a));
      } else
        _.data === '$?'
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (Ue = Yt(_.nextSibling)),
            (lt = t),
            (Ee = !0),
            (Ea = null),
            (Wt = !1),
            e !== null &&
              ((zt[Ut++] = dn),
              (zt[Ut++] = hn),
              (zt[Ut++] = wa),
              (dn = e.id),
              (hn = e.overflow),
              (wa = t)),
            (t = Cc(t, r.children)),
            (t.flags |= 4096));
      return t;
    }
    return l
      ? (Pn(),
        (l = r.fallback),
        (_ = t.mode),
        (x = e.child),
        (N = x.sibling),
        (r = fn(x, { mode: 'hidden', children: r.children })),
        (r.subtreeFlags = x.subtreeFlags & 65011712),
        N !== null ? (l = fn(N, l)) : ((l = _a(l, _, a, null)), (l.flags |= 2)),
        (l.return = t),
        (r.return = t),
        (r.sibling = l),
        (t.child = r),
        (r = l),
        (l = t.child),
        (_ = e.child.memoizedState),
        _ === null
          ? (_ = xc(a))
          : ((x = _.cachePool),
            x !== null
              ? ((N = Qe._currentValue),
                (x = x.parent !== N ? { parent: N, pool: N } : x))
              : (x = ch()),
            (_ = { baseLanes: _.baseLanes | a, cachePool: x })),
        (l.memoizedState = _),
        (l.childLanes = Rc(e, y, a)),
        (t.memoizedState = Ec),
        r)
      : (Hn(t),
        (a = e.child),
        (e = a.sibling),
        (a = fn(a, { mode: 'visible', children: r.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((y = t.deletions),
          y === null ? ((t.deletions = [e]), (t.flags |= 16)) : y.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Cc(e, t) {
    return (
      (t = ao({ mode: 'visible', children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function ao(e, t) {
    return (
      (e = Tt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Ac(e, t, a) {
    return (
      _s(t, e.child, null, a),
      (e = Cc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Eg(e, t, a) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Ql(e.return, t, a);
  }
  function Mc(e, t, a, r, l) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: a,
          tailMode: l,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = r),
        (u.tail = a),
        (u.tailMode = l));
  }
  function xg(e, t, a) {
    var r = t.pendingProps,
      l = r.revealOrder,
      u = r.tail;
    if ((tt(e, t, r.children, a), (r = Ke.current), (r & 2) !== 0))
      (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Eg(e, a, t);
          else if (e.tag === 19) Eg(e, a, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    switch ((J(Ke, r), l)) {
      case 'forwards':
        for (a = t.child, l = null; a !== null; )
          (e = a.alternate),
            e !== null && Jr(e) === null && (l = a),
            (a = a.sibling);
        (a = l),
          a === null
            ? ((l = t.child), (t.child = null))
            : ((l = a.sibling), (a.sibling = null)),
          Mc(t, !1, l, a, u);
        break;
      case 'backwards':
        for (a = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Jr(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = a), (a = l), (l = e);
        }
        Mc(t, !0, a, null, u);
        break;
      case 'together':
        Mc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function vn(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Qn |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Si(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (
        e = t.child, a = fn(e, e.pendingProps), t.child = a, a.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (a = a.sibling = fn(e, e.pendingProps)),
          (a.return = t);
      a.sibling = null;
    }
    return t.child;
  }
  function Oc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && zr(e)));
  }
  function u1(e, t, a) {
    switch (t.tag) {
      case 3:
        Te(t, t.stateNode.containerInfo),
          jn(t, Qe, e.memoizedState.cache),
          yi();
        break;
      case 27:
      case 5:
        ha(t);
        break;
      case 4:
        Te(t, t.stateNode.containerInfo);
        break;
      case 10:
        jn(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null
            ? (Hn(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
            ? Tg(e, t, a)
            : (Hn(t), (e = vn(e, t, a)), e !== null ? e.sibling : null);
        Hn(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (
          ((r = (a & t.childLanes) !== 0),
          r || (Si(e, t, a, !1), (r = (a & t.childLanes) !== 0)),
          l)
        ) {
          if (r) return xg(e, t, a);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          J(Ke, Ke.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), vg(e, t, a);
      case 24:
        jn(t, Qe, e.memoizedState.cache);
    }
    return vn(e, t, a);
  }
  function Rg(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Xe = !0;
      else {
        if (!Oc(e, a) && (t.flags & 128) === 0) return (Xe = !1), u1(e, t, a);
        Xe = (e.flags & 131072) !== 0;
      }
    else (Xe = !1), Ee && (t.flags & 1048576) !== 0 && nh(t, Br, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var r = t.elementType,
            l = r._init;
          if (((r = l(r._payload)), (t.type = r), typeof r == 'function'))
            Il(r)
              ? ((e = Oa(r, e)), (t.tag = 1), (t = _g(null, t, r, e, a)))
              : ((t.tag = 0), (t = Tc(null, t, r, e, a)));
          else {
            if (r != null) {
              if (((l = r.$$typeof), l === G)) {
                (t.tag = 11), (t = mg(null, t, r, e, a));
                break e;
              } else if (l === Y) {
                (t.tag = 14), (t = pg(null, t, r, e, a));
                break e;
              }
            }
            throw ((t = Se(r) || r), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Tc(e, t, t.type, t.pendingProps, a);
      case 1:
        return (r = t.type), (l = Oa(r, t.pendingProps)), _g(e, t, r, l, a);
      case 3:
        e: {
          if ((Te(t, t.stateNode.containerInfo), e === null))
            throw Error(o(387));
          r = t.pendingProps;
          var u = t.memoizedState;
          (l = u.element), Jl(e, t), Ri(t, r, null, a);
          var y = t.memoizedState;
          if (
            ((r = y.cache),
            jn(t, Qe, r),
            r !== u.cache && Kl(t, [Qe], a, !0),
            xi(),
            (r = y.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: r, isDehydrated: !1, cache: y.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = wg(e, t, r, a);
              break e;
            } else if (r !== l) {
              (l = jt(Error(o(424)), t)), vi(l), (t = wg(e, t, r, a));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === 'HTML' ? e.ownerDocument.body : e;
              }
              for (
                Ue = Yt(e.firstChild),
                  lt = t,
                  Ee = !0,
                  Ea = null,
                  Wt = !0,
                  a = sg(t, null, r, a),
                  t.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((yi(), r === l)) {
              t = vn(e, t, a);
              break e;
            }
            tt(e, t, r, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          no(e, t),
          e === null
            ? (a = Om(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ee ||
                ((a = t.type),
                (e = t.pendingProps),
                (r = vo(le.current).createElement(a)),
                (r[st] = t),
                (r[ft] = e),
                at(r, a, e),
                Ye(r),
                (t.stateNode = r))
            : (t.memoizedState = Om(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          ha(t),
          e === null &&
            Ee &&
            ((r = t.stateNode = Cm(t.type, t.pendingProps, le.current)),
            (lt = t),
            (Wt = !0),
            (l = Ue),
            Xn(t.type) ? ((uu = l), (Ue = Yt(r.firstChild))) : (Ue = l)),
          tt(e, t, t.pendingProps.children, a),
          no(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ee &&
            ((l = r = Ue) &&
              ((r = U1(r, t.type, t.pendingProps, Wt)),
              r !== null
                ? ((t.stateNode = r),
                  (lt = t),
                  (Ue = Yt(r.firstChild)),
                  (Wt = !1),
                  (l = !0))
                : (l = !1)),
            l || xa(t)),
          ha(t),
          (l = t.type),
          (u = t.pendingProps),
          (y = e !== null ? e.memoizedProps : null),
          (r = u.children),
          ru(l, u) ? (r = null) : y !== null && ru(l, y) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((l = ic(e, t, n1, null, null, a)), (Fi._currentValue = l)),
          no(e, t),
          tt(e, t, r, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ee &&
            ((e = a = Ue) &&
              ((a = I1(a, t.pendingProps, Wt)),
              a !== null
                ? ((t.stateNode = a), (lt = t), (Ue = null), (e = !0))
                : (e = !1)),
            e || xa(t)),
          null
        );
      case 13:
        return Tg(e, t, a);
      case 4:
        return (
          Te(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = _s(t, null, r, a)) : tt(e, t, r, a),
          t.child
        );
      case 11:
        return mg(e, t, t.type, t.pendingProps, a);
      case 7:
        return tt(e, t, t.pendingProps, a), t.child;
      case 8:
        return tt(e, t, t.pendingProps.children, a), t.child;
      case 12:
        return tt(e, t, t.pendingProps.children, a), t.child;
      case 10:
        return (
          (r = t.pendingProps),
          jn(t, t.type, r.value),
          tt(e, t, r.children, a),
          t.child
        );
      case 9:
        return (
          (l = t.type._context),
          (r = t.pendingProps.children),
          Ca(t),
          (l = it(l)),
          (r = r(l)),
          (t.flags |= 1),
          tt(e, t, r, a),
          t.child
        );
      case 14:
        return pg(e, t, t.type, t.pendingProps, a);
      case 15:
        return yg(e, t, t.type, t.pendingProps, a);
      case 19:
        return xg(e, t, a);
      case 31:
        return (
          (r = t.pendingProps),
          (a = t.mode),
          (r = { mode: r.mode, children: r.children }),
          e === null
            ? ((a = ao(r, a)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a))
            : ((a = fn(e.child, r)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a)),
          t
        );
      case 22:
        return vg(e, t, a);
      case 24:
        return (
          Ca(t),
          (r = it(Qe)),
          e === null
            ? ((l = Xl()),
              l === null &&
                ((l = ke),
                (u = Fl()),
                (l.pooledCache = u),
                u.refCount++,
                u !== null && (l.pooledCacheLanes |= a),
                (l = u)),
              (t.memoizedState = { parent: r, cache: l }),
              Zl(t),
              jn(t, Qe, l))
            : ((e.lanes & a) !== 0 && (Jl(e, t), Ri(t, null, null, a), xi()),
              (l = e.memoizedState),
              (u = t.memoizedState),
              l.parent !== r
                ? ((l = { parent: r, cache: r }),
                  (t.memoizedState = l),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = l),
                  jn(t, Qe, r))
                : ((r = u.cache),
                  jn(t, Qe, r),
                  r !== l.cache && Kl(t, [Qe], a, !0))),
          tt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Sn(e) {
    e.flags |= 4;
  }
  function Cg(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !jm(t))) {
      if (
        ((t = It.current),
        t !== null &&
          ((_e & 4194048) === _e
            ? Zt !== null
            : ((_e & 62914560) !== _e && (_e & 536870912) === 0) || t !== Zt))
      )
        throw ((Ti = Wl), uh);
      e.flags |= 8192;
    }
  }
  function so(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? id() : 536870912), (e.lanes |= t), (xs |= t));
  }
  function Ni(e, t) {
    if (!Ee)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), (t = t.sibling);
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = e.tail;
          for (var r = null; a !== null; )
            a.alternate !== null && (r = a), (a = a.sibling);
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function ze(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        (a |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags & 65011712),
          (r |= l.flags & 65011712),
          (l.return = e),
          (l = l.sibling);
    else
      for (l = e.child; l !== null; )
        (a |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags),
          (r |= l.flags),
          (l.return = e),
          (l = l.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = a), t;
  }
  function f1(e, t, a) {
    var r = t.pendingProps;
    switch (($l(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ze(t), null;
      case 1:
        return ze(t), null;
      case 3:
        return (
          (a = t.stateNode),
          (r = null),
          e !== null && (r = e.memoizedState.cache),
          t.memoizedState.cache !== r && (t.flags |= 2048),
          mn(Qe),
          Ot(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (pi(t)
              ? Sn(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ih())),
          ze(t),
          null
        );
      case 26:
        return (
          (a = t.memoizedState),
          e === null
            ? (Sn(t),
              a !== null ? (ze(t), Cg(t, a)) : (ze(t), (t.flags &= -16777217)))
            : a
            ? a !== e.memoizedState
              ? (Sn(t), ze(t), Cg(t, a))
              : (ze(t), (t.flags &= -16777217))
            : (e.memoizedProps !== r && Sn(t), ze(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        kt(t), (a = le.current);
        var l = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== r && Sn(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(o(166));
            return ze(t), null;
          }
          (e = re.current),
            pi(t) ? ah(t) : ((e = Cm(l, r, a)), (t.stateNode = e), Sn(t));
        }
        return ze(t), null;
      case 5:
        if ((kt(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && Sn(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(o(166));
            return ze(t), null;
          }
          if (((e = re.current), pi(t))) ah(t);
          else {
            switch (((l = vo(le.current)), e)) {
              case 1:
                e = l.createElementNS('http://www.w3.org/2000/svg', a);
                break;
              case 2:
                e = l.createElementNS('http://www.w3.org/1998/Math/MathML', a);
                break;
              default:
                switch (a) {
                  case 'svg':
                    e = l.createElementNS('http://www.w3.org/2000/svg', a);
                    break;
                  case 'math':
                    e = l.createElementNS(
                      'http://www.w3.org/1998/Math/MathML',
                      a
                    );
                    break;
                  case 'script':
                    (e = l.createElement('div')),
                      (e.innerHTML = '<script></script>'),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case 'select':
                    (e =
                      typeof r.is == 'string'
                        ? l.createElement('select', { is: r.is })
                        : l.createElement('select')),
                      r.multiple
                        ? (e.multiple = !0)
                        : r.size && (e.size = r.size);
                    break;
                  default:
                    e =
                      typeof r.is == 'string'
                        ? l.createElement(a, { is: r.is })
                        : l.createElement(a);
                }
            }
            (e[st] = t), (e[ft] = r);
            e: for (l = t.child; l !== null; ) {
              if (l.tag === 5 || l.tag === 6) e.appendChild(l.stateNode);
              else if (l.tag !== 4 && l.tag !== 27 && l.child !== null) {
                (l.child.return = l), (l = l.child);
                continue;
              }
              if (l === t) break e;
              for (; l.sibling === null; ) {
                if (l.return === null || l.return === t) break e;
                l = l.return;
              }
              (l.sibling.return = l.return), (l = l.sibling);
            }
            t.stateNode = e;
            e: switch ((at(e, a, r), a)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                e = !!r.autoFocus;
                break e;
              case 'img':
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Sn(t);
          }
        }
        return ze(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== r && Sn(t);
        else {
          if (typeof r != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = le.current), pi(t))) {
            if (
              ((e = t.stateNode),
              (a = t.memoizedProps),
              (r = null),
              (l = lt),
              l !== null)
            )
              switch (l.tag) {
                case 27:
                case 5:
                  r = l.memoizedProps;
              }
            (e[st] = t),
              (e = !!(
                e.nodeValue === a ||
                (r !== null && r.suppressHydrationWarning === !0) ||
                bm(e.nodeValue, a)
              )),
              e || xa(t);
          } else (e = vo(e).createTextNode(r)), (e[st] = t), (t.stateNode = e);
        }
        return ze(t), null;
      case 13:
        if (
          ((r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((l = pi(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(o(317));
              l[st] = t;
            } else
              yi(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            ze(t), (l = !1);
          } else
            (l = ih()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = l),
              (l = !0);
          if (!l) return t.flags & 256 ? (yn(t), t) : (yn(t), null);
        }
        if ((yn(t), (t.flags & 128) !== 0)) return (t.lanes = a), t;
        if (
          ((a = r !== null), (e = e !== null && e.memoizedState !== null), a)
        ) {
          (r = t.child),
            (l = null),
            r.alternate !== null &&
              r.alternate.memoizedState !== null &&
              r.alternate.memoizedState.cachePool !== null &&
              (l = r.alternate.memoizedState.cachePool.pool);
          var u = null;
          r.memoizedState !== null &&
            r.memoizedState.cachePool !== null &&
            (u = r.memoizedState.cachePool.pool),
            u !== l && (r.flags |= 2048);
        }
        return (
          a !== e && a && (t.child.flags |= 8192),
          so(t, t.updateQueue),
          ze(t),
          null
        );
      case 4:
        return Ot(), e === null && tu(t.stateNode.containerInfo), ze(t), null;
      case 10:
        return mn(t.type), ze(t), null;
      case 19:
        if ((ee(Ke), (l = t.memoizedState), l === null)) return ze(t), null;
        if (((r = (t.flags & 128) !== 0), (u = l.rendering), u === null))
          if (r) Ni(l, !1);
          else {
            if (Ie !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = Jr(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      Ni(l, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      so(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;

                  )
                    th(a, e), (a = a.sibling);
                  return J(Ke, (Ke.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null &&
              Dt() > oo &&
              ((t.flags |= 128), (r = !0), Ni(l, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = Jr(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                so(t, e),
                Ni(l, !0),
                l.tail === null &&
                  l.tailMode === 'hidden' &&
                  !u.alternate &&
                  !Ee)
              )
                return ze(t), null;
            } else
              2 * Dt() - l.renderingStartTime > oo &&
                a !== 536870912 &&
                ((t.flags |= 128), (r = !0), Ni(l, !1), (t.lanes = 4194304));
          l.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = l.last),
              e !== null ? (e.sibling = u) : (t.child = u),
              (l.last = u));
        }
        return l.tail !== null
          ? ((t = l.tail),
            (l.rendering = t),
            (l.tail = t.sibling),
            (l.renderingStartTime = Dt()),
            (t.sibling = null),
            (e = Ke.current),
            J(Ke, r ? (e & 1) | 2 : e & 1),
            t)
          : (ze(t), null);
      case 22:
      case 23:
        return (
          yn(t),
          ac(),
          (r = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== r && (t.flags |= 8192)
            : r && (t.flags |= 8192),
          r
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (ze(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : ze(t),
          (a = t.updateQueue),
          a !== null && so(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (r = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (r = t.memoizedState.cachePool.pool),
          r !== a && (t.flags |= 2048),
          e !== null && ee(Aa),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          mn(Qe),
          ze(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function d1(e, t) {
    switch (($l(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          mn(Qe),
          Ot(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return kt(t), null;
      case 13:
        if (
          (yn(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(o(340));
          yi();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return ee(Ke), null;
      case 4:
        return Ot(), null;
      case 10:
        return mn(t.type), null;
      case 22:
      case 23:
        return (
          yn(t),
          ac(),
          e !== null && ee(Aa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return mn(Qe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ag(e, t) {
    switch (($l(t), t.tag)) {
      case 3:
        mn(Qe), Ot();
        break;
      case 26:
      case 27:
      case 5:
        kt(t);
        break;
      case 4:
        Ot();
        break;
      case 13:
        yn(t);
        break;
      case 19:
        ee(Ke);
        break;
      case 10:
        mn(t.type);
        break;
      case 22:
      case 23:
        yn(t), ac(), e !== null && ee(Aa);
        break;
      case 24:
        mn(Qe);
    }
  }
  function Li(e, t) {
    try {
      var a = t.updateQueue,
        r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var l = r.next;
        a = l;
        do {
          if ((a.tag & e) === e) {
            r = void 0;
            var u = a.create,
              y = a.inst;
            (r = u()), (y.destroy = r);
          }
          a = a.next;
        } while (a !== l);
      }
    } catch (_) {
      Oe(t, t.return, _);
    }
  }
  function qn(e, t, a) {
    try {
      var r = t.updateQueue,
        l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        r = u;
        do {
          if ((r.tag & e) === e) {
            var y = r.inst,
              _ = y.destroy;
            if (_ !== void 0) {
              (y.destroy = void 0), (l = t);
              var x = a,
                N = _;
              try {
                N();
              } catch (H) {
                Oe(l, x, H);
              }
            }
          }
          r = r.next;
        } while (r !== u);
      }
    } catch (H) {
      Oe(t, t.return, H);
    }
  }
  function Mg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        ph(t, a);
      } catch (r) {
        Oe(e, e.return, r);
      }
    }
  }
  function Og(e, t, a) {
    (a.props = Oa(e.type, e.memoizedProps)), (a.state = e.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (r) {
      Oe(e, t, r);
    }
  }
  function ji(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof a == 'function' ? (e.refCleanup = a(r)) : (a.current = r);
      }
    } catch (l) {
      Oe(e, t, l);
    }
  }
  function Jt(e, t) {
    var a = e.ref,
      r = e.refCleanup;
    if (a !== null)
      if (typeof r == 'function')
        try {
          r();
        } catch (l) {
          Oe(e, t, l);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (l) {
          Oe(e, t, l);
        }
      else a.current = null;
  }
  function kg(e) {
    var t = e.type,
      a = e.memoizedProps,
      r = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && r.focus();
          break e;
        case 'img':
          a.src ? (r.src = a.src) : a.srcSet && (r.srcset = a.srcSet);
      }
    } catch (l) {
      Oe(e, e.return, l);
    }
  }
  function kc(e, t, a) {
    try {
      var r = e.stateNode;
      N1(r, e.type, a, t), (r[ft] = t);
    } catch (l) {
      Oe(e, e.return, l);
    }
  }
  function Dg(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Xn(e.type)) ||
      e.tag === 4
    );
  }
  function Dc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Dg(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && Xn(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Nc(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === 'HTML'
              ? a.ownerDocument.body
              : a
            ).insertBefore(e, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === 'HTML'
                ? a.ownerDocument.body
                : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = yo));
    else if (
      r !== 4 &&
      (r === 27 && Xn(e.type) && ((a = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Nc(e, t, a), e = e.sibling; e !== null; )
        Nc(e, t, a), (e = e.sibling);
  }
  function io(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (
      r !== 4 &&
      (r === 27 && Xn(e.type) && (a = e.stateNode), (e = e.child), e !== null)
    )
      for (io(e, t, a), e = e.sibling; e !== null; )
        io(e, t, a), (e = e.sibling);
  }
  function Ng(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var r = e.type, l = t.attributes; l.length; )
        t.removeAttributeNode(l[0]);
      at(t, r, a), (t[st] = e), (t[ft] = a);
    } catch (u) {
      Oe(e, e.return, u);
    }
  }
  var bn = !1,
    $e = !1,
    Lc = !1,
    Lg = typeof WeakSet == 'function' ? WeakSet : Set,
    We = null;
  function h1(e, t) {
    if (((e = e.containerInfo), (su = Eo), (e = Vd(e)), Dl(e))) {
      if ('selectionStart' in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var r = a.getSelection && a.getSelection();
          if (r && r.rangeCount !== 0) {
            a = r.anchorNode;
            var l = r.anchorOffset,
              u = r.focusNode;
            r = r.focusOffset;
            try {
              a.nodeType, u.nodeType;
            } catch {
              a = null;
              break e;
            }
            var y = 0,
              _ = -1,
              x = -1,
              N = 0,
              H = 0,
              Q = e,
              j = null;
            t: for (;;) {
              for (
                var B;
                Q !== a || (l !== 0 && Q.nodeType !== 3) || (_ = y + l),
                  Q !== u || (r !== 0 && Q.nodeType !== 3) || (x = y + r),
                  Q.nodeType === 3 && (y += Q.nodeValue.length),
                  (B = Q.firstChild) !== null;

              )
                (j = Q), (Q = B);
              for (;;) {
                if (Q === e) break t;
                if (
                  (j === a && ++N === l && (_ = y),
                  j === u && ++H === r && (x = y),
                  (B = Q.nextSibling) !== null)
                )
                  break;
                (Q = j), (j = Q.parentNode);
              }
              Q = B;
            }
            a = _ === -1 || x === -1 ? null : { start: _, end: x };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      iu = { focusedElem: e, selectionRange: a }, Eo = !1, We = t;
      We !== null;

    )
      if (
        ((t = We), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (We = e);
      else
        for (; We !== null; ) {
          switch (((t = We), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                (e = void 0),
                  (a = t),
                  (l = u.memoizedProps),
                  (u = u.memoizedState),
                  (r = a.stateNode);
                try {
                  var fe = Oa(a.type, l, a.elementType === a.type);
                  (e = r.getSnapshotBeforeUpdate(fe, u)),
                    (r.__reactInternalSnapshotBeforeUpdate = e);
                } catch (ce) {
                  Oe(a, a.return, ce);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)
                )
                  lu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      lu(e);
                      break;
                    default:
                      e.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (We = e);
            break;
          }
          We = t.return;
        }
  }
  function jg(e, t, a) {
    var r = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        $n(e, a), r & 4 && Li(5, a);
        break;
      case 1:
        if (($n(e, a), r & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (y) {
              Oe(a, a.return, y);
            }
          else {
            var l = Oa(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (y) {
              Oe(a, a.return, y);
            }
          }
        r & 64 && Mg(a), r & 512 && ji(a, a.return);
        break;
      case 3:
        if (($n(e, a), r & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            ph(e, t);
          } catch (y) {
            Oe(a, a.return, y);
          }
        }
        break;
      case 27:
        t === null && r & 4 && Ng(a);
      case 26:
      case 5:
        $n(e, a), t === null && r & 4 && kg(a), r & 512 && ji(a, a.return);
        break;
      case 12:
        $n(e, a);
        break;
      case 13:
        $n(e, a),
          r & 4 && Ug(e, a),
          r & 64 &&
            ((e = a.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((a = w1.bind(null, a)), H1(e, a))));
        break;
      case 22:
        if (((r = a.memoizedState !== null || bn), !r)) {
          (t = (t !== null && t.memoizedState !== null) || $e), (l = bn);
          var u = $e;
          (bn = r),
            ($e = t) && !u ? Gn(e, a, (a.subtreeFlags & 8772) !== 0) : $n(e, a),
            (bn = l),
            ($e = u);
        }
        break;
      case 30:
        break;
      default:
        $n(e, a);
    }
  }
  function Bg(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Bg(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && hl(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var Be = null,
    gt = !1;
  function _n(e, t, a) {
    for (a = a.child; a !== null; ) zg(e, t, a), (a = a.sibling);
  }
  function zg(e, t, a) {
    if (bt && typeof bt.onCommitFiberUnmount == 'function')
      try {
        bt.onCommitFiberUnmount(ni, a);
      } catch {}
    switch (a.tag) {
      case 26:
        $e || Jt(a, t),
          _n(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        $e || Jt(a, t);
        var r = Be,
          l = gt;
        Xn(a.type) && ((Be = a.stateNode), (gt = !1)),
          _n(e, t, a),
          Gi(a.stateNode),
          (Be = r),
          (gt = l);
        break;
      case 5:
        $e || Jt(a, t);
      case 6:
        if (
          ((r = Be),
          (l = gt),
          (Be = null),
          _n(e, t, a),
          (Be = r),
          (gt = l),
          Be !== null)
        )
          if (gt)
            try {
              (Be.nodeType === 9
                ? Be.body
                : Be.nodeName === 'HTML'
                ? Be.ownerDocument.body
                : Be
              ).removeChild(a.stateNode);
            } catch (u) {
              Oe(a, t, u);
            }
          else
            try {
              Be.removeChild(a.stateNode);
            } catch (u) {
              Oe(a, t, u);
            }
        break;
      case 18:
        Be !== null &&
          (gt
            ? ((e = Be),
              xm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === 'HTML'
                  ? e.ownerDocument.body
                  : e,
                a.stateNode
              ),
              Zi(e))
            : xm(Be, a.stateNode));
        break;
      case 4:
        (r = Be),
          (l = gt),
          (Be = a.stateNode.containerInfo),
          (gt = !0),
          _n(e, t, a),
          (Be = r),
          (gt = l);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        $e || qn(2, a, t), $e || qn(4, a, t), _n(e, t, a);
        break;
      case 1:
        $e ||
          (Jt(a, t),
          (r = a.stateNode),
          typeof r.componentWillUnmount == 'function' && Og(a, t, r)),
          _n(e, t, a);
        break;
      case 21:
        _n(e, t, a);
        break;
      case 22:
        ($e = (r = $e) || a.memoizedState !== null), _n(e, t, a), ($e = r);
        break;
      default:
        _n(e, t, a);
    }
  }
  function Ug(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Zi(e);
      } catch (a) {
        Oe(t, t.return, a);
      }
  }
  function g1(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Lg()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Lg()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function jc(e, t) {
    var a = g1(e);
    t.forEach(function (r) {
      var l = T1.bind(null, e, r);
      a.has(r) || (a.add(r), r.then(l, l));
    });
  }
  function Et(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var l = a[r],
          u = e,
          y = t,
          _ = y;
        e: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (Xn(_.type)) {
                (Be = _.stateNode), (gt = !1);
                break e;
              }
              break;
            case 5:
              (Be = _.stateNode), (gt = !1);
              break e;
            case 3:
            case 4:
              (Be = _.stateNode.containerInfo), (gt = !0);
              break e;
          }
          _ = _.return;
        }
        if (Be === null) throw Error(o(160));
        zg(u, y, l),
          (Be = null),
          (gt = !1),
          (u = l.alternate),
          u !== null && (u.return = null),
          (l.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) Ig(t, e), (t = t.sibling);
  }
  var Ft = null;
  function Ig(e, t) {
    var a = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Et(t, e),
          xt(e),
          r & 4 && (qn(3, e, e.return), Li(3, e), qn(5, e, e.return));
        break;
      case 1:
        Et(t, e),
          xt(e),
          r & 512 && ($e || a === null || Jt(a, a.return)),
          r & 64 &&
            bn &&
            ((e = e.updateQueue),
            e !== null &&
              ((r = e.callbacks),
              r !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? r : a.concat(r)))));
        break;
      case 26:
        var l = Ft;
        if (
          (Et(t, e),
          xt(e),
          r & 512 && ($e || a === null || Jt(a, a.return)),
          r & 4)
        ) {
          var u = a !== null ? a.memoizedState : null;
          if (((r = e.memoizedState), a === null))
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  (r = e.type),
                    (a = e.memoizedProps),
                    (l = l.ownerDocument || l);
                  t: switch (r) {
                    case 'title':
                      (u = l.getElementsByTagName('title')[0]),
                        (!u ||
                          u[ii] ||
                          u[st] ||
                          u.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          u.hasAttribute('itemprop')) &&
                          ((u = l.createElement(r)),
                          l.head.insertBefore(
                            u,
                            l.querySelector('head > title')
                          )),
                        at(u, r, a),
                        (u[st] = e),
                        Ye(u),
                        (r = u);
                      break e;
                    case 'link':
                      var y = Nm('link', 'href', l).get(r + (a.href || ''));
                      if (y) {
                        for (var _ = 0; _ < y.length; _++)
                          if (
                            ((u = y[_]),
                            u.getAttribute('href') ===
                              (a.href == null || a.href === ''
                                ? null
                                : a.href) &&
                              u.getAttribute('rel') ===
                                (a.rel == null ? null : a.rel) &&
                              u.getAttribute('title') ===
                                (a.title == null ? null : a.title) &&
                              u.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            y.splice(_, 1);
                            break t;
                          }
                      }
                      (u = l.createElement(r)),
                        at(u, r, a),
                        l.head.appendChild(u);
                      break;
                    case 'meta':
                      if (
                        (y = Nm('meta', 'content', l).get(
                          r + (a.content || '')
                        ))
                      ) {
                        for (_ = 0; _ < y.length; _++)
                          if (
                            ((u = y[_]),
                            u.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              u.getAttribute('name') ===
                                (a.name == null ? null : a.name) &&
                              u.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              u.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              u.getAttribute('charset') ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            y.splice(_, 1);
                            break t;
                          }
                      }
                      (u = l.createElement(r)),
                        at(u, r, a),
                        l.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, r));
                  }
                  (u[st] = e), Ye(u), (r = u);
                }
                e.stateNode = r;
              } else Lm(l, e.type, e.stateNode);
            else e.stateNode = Dm(l, r, e.memoizedProps);
          else
            u !== r
              ? (u === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : u.count--,
                r === null
                  ? Lm(l, e.type, e.stateNode)
                  : Dm(l, r, e.memoizedProps))
              : r === null &&
                e.stateNode !== null &&
                kc(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        Et(t, e),
          xt(e),
          r & 512 && ($e || a === null || Jt(a, a.return)),
          a !== null && r & 4 && kc(e, e.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (Et(t, e),
          xt(e),
          r & 512 && ($e || a === null || Jt(a, a.return)),
          e.flags & 32)
        ) {
          l = e.stateNode;
          try {
            as(l, '');
          } catch (B) {
            Oe(e, e.return, B);
          }
        }
        r & 4 &&
          e.stateNode != null &&
          ((l = e.memoizedProps), kc(e, l, a !== null ? a.memoizedProps : l)),
          r & 1024 && (Lc = !0);
        break;
      case 6:
        if ((Et(t, e), xt(e), r & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          (r = e.memoizedProps), (a = e.stateNode);
          try {
            a.nodeValue = r;
          } catch (B) {
            Oe(e, e.return, B);
          }
        }
        break;
      case 3:
        if (
          ((_o = null),
          (l = Ft),
          (Ft = So(t.containerInfo)),
          Et(t, e),
          (Ft = l),
          xt(e),
          r & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Zi(t.containerInfo);
          } catch (B) {
            Oe(e, e.return, B);
          }
        Lc && ((Lc = !1), Hg(e));
        break;
      case 4:
        (r = Ft),
          (Ft = So(e.stateNode.containerInfo)),
          Et(t, e),
          xt(e),
          (Ft = r);
        break;
      case 12:
        Et(t, e), xt(e);
        break;
      case 13:
        Et(t, e),
          xt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (Pc = Dt()),
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((e.updateQueue = null), jc(e, r)));
        break;
      case 22:
        l = e.memoizedState !== null;
        var x = a !== null && a.memoizedState !== null,
          N = bn,
          H = $e;
        if (
          ((bn = N || l),
          ($e = H || x),
          Et(t, e),
          ($e = H),
          (bn = N),
          xt(e),
          r & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = l ? t._visibility & -2 : t._visibility | 1,
              l && (a === null || x || bn || $e || ka(e)),
              a = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                x = a = t;
                try {
                  if (((u = x.stateNode), l))
                    (y = u.style),
                      typeof y.setProperty == 'function'
                        ? y.setProperty('display', 'none', 'important')
                        : (y.display = 'none');
                  else {
                    _ = x.stateNode;
                    var Q = x.memoizedProps.style,
                      j =
                        Q != null && Q.hasOwnProperty('display')
                          ? Q.display
                          : null;
                    _.style.display =
                      j == null || typeof j == 'boolean' ? '' : ('' + j).trim();
                  }
                } catch (B) {
                  Oe(x, x.return, B);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = l ? '' : x.memoizedProps;
                } catch (B) {
                  Oe(x, x.return, B);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), (t = t.return);
            }
            a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        r & 4 &&
          ((r = e.updateQueue),
          r !== null &&
            ((a = r.retryQueue),
            a !== null && ((r.retryQueue = null), jc(e, a))));
        break;
      case 19:
        Et(t, e),
          xt(e),
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((e.updateQueue = null), jc(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Et(t, e), xt(e);
    }
  }
  function xt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, r = e.return; r !== null; ) {
          if (Dg(r)) {
            a = r;
            break;
          }
          r = r.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var l = a.stateNode,
              u = Dc(e);
            io(e, u, l);
            break;
          case 5:
            var y = a.stateNode;
            a.flags & 32 && (as(y, ''), (a.flags &= -33));
            var _ = Dc(e);
            io(e, _, y);
            break;
          case 3:
          case 4:
            var x = a.stateNode.containerInfo,
              N = Dc(e);
            Nc(e, N, x);
            break;
          default:
            throw Error(o(161));
        }
      } catch (H) {
        Oe(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Hg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Hg(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function $n(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) jg(e, t.alternate, t), (t = t.sibling);
  }
  function ka(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          qn(4, t, t.return), ka(t);
          break;
        case 1:
          Jt(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == 'function' && Og(t, t.return, a),
            ka(t);
          break;
        case 27:
          Gi(t.stateNode);
        case 26:
        case 5:
          Jt(t, t.return), ka(t);
          break;
        case 22:
          t.memoizedState === null && ka(t);
          break;
        case 30:
          ka(t);
          break;
        default:
          ka(t);
      }
      e = e.sibling;
    }
  }
  function Gn(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate,
        l = e,
        u = t,
        y = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Gn(l, u, a), Li(4, u);
          break;
        case 1:
          if (
            (Gn(l, u, a),
            (r = u),
            (l = r.stateNode),
            typeof l.componentDidMount == 'function')
          )
            try {
              l.componentDidMount();
            } catch (N) {
              Oe(r, r.return, N);
            }
          if (((r = u), (l = r.updateQueue), l !== null)) {
            var _ = r.stateNode;
            try {
              var x = l.shared.hiddenCallbacks;
              if (x !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < x.length; l++)
                  mh(x[l], _);
            } catch (N) {
              Oe(r, r.return, N);
            }
          }
          a && y & 64 && Mg(u), ji(u, u.return);
          break;
        case 27:
          Ng(u);
        case 26:
        case 5:
          Gn(l, u, a), a && r === null && y & 4 && kg(u), ji(u, u.return);
          break;
        case 12:
          Gn(l, u, a);
          break;
        case 13:
          Gn(l, u, a), a && y & 4 && Ug(l, u);
          break;
        case 22:
          u.memoizedState === null && Gn(l, u, a), ji(u, u.return);
          break;
        case 30:
          break;
        default:
          Gn(l, u, a);
      }
      t = t.sibling;
    }
  }
  function Bc(e, t) {
    var a = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && bi(a));
  }
  function zc(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && bi(e));
  }
  function en(e, t, a, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) Pg(e, t, a, r), (t = t.sibling);
  }
  function Pg(e, t, a, r) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        en(e, t, a, r), l & 2048 && Li(9, t);
        break;
      case 1:
        en(e, t, a, r);
        break;
      case 3:
        en(e, t, a, r),
          l & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && bi(e)));
        break;
      case 12:
        if (l & 2048) {
          en(e, t, a, r), (e = t.stateNode);
          try {
            var u = t.memoizedProps,
              y = u.id,
              _ = u.onPostCommit;
            typeof _ == 'function' &&
              _(
                y,
                t.alternate === null ? 'mount' : 'update',
                e.passiveEffectDuration,
                -0
              );
          } catch (x) {
            Oe(t, t.return, x);
          }
        } else en(e, t, a, r);
        break;
      case 13:
        en(e, t, a, r);
        break;
      case 23:
        break;
      case 22:
        (u = t.stateNode),
          (y = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? en(e, t, a, r)
              : Bi(e, t)
            : u._visibility & 2
            ? en(e, t, a, r)
            : ((u._visibility |= 2),
              ws(e, t, a, r, (t.subtreeFlags & 10256) !== 0)),
          l & 2048 && Bc(y, t);
        break;
      case 24:
        en(e, t, a, r), l & 2048 && zc(t.alternate, t);
        break;
      default:
        en(e, t, a, r);
    }
  }
  function ws(e, t, a, r, l) {
    for (l = l && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var u = e,
        y = t,
        _ = a,
        x = r,
        N = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          ws(u, y, _, x, l), Li(8, y);
          break;
        case 23:
          break;
        case 22:
          var H = y.stateNode;
          y.memoizedState !== null
            ? H._visibility & 2
              ? ws(u, y, _, x, l)
              : Bi(u, y)
            : ((H._visibility |= 2), ws(u, y, _, x, l)),
            l && N & 2048 && Bc(y.alternate, y);
          break;
        case 24:
          ws(u, y, _, x, l), l && N & 2048 && zc(y.alternate, y);
          break;
        default:
          ws(u, y, _, x, l);
      }
      t = t.sibling;
    }
  }
  function Bi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          r = t,
          l = r.flags;
        switch (r.tag) {
          case 22:
            Bi(a, r), l & 2048 && Bc(r.alternate, r);
            break;
          case 24:
            Bi(a, r), l & 2048 && zc(r.alternate, r);
            break;
          default:
            Bi(a, r);
        }
        t = t.sibling;
      }
  }
  var zi = 8192;
  function Ts(e) {
    if (e.subtreeFlags & zi)
      for (e = e.child; e !== null; ) qg(e), (e = e.sibling);
  }
  function qg(e) {
    switch (e.tag) {
      case 26:
        Ts(e),
          e.flags & zi &&
            e.memoizedState !== null &&
            J1(Ft, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Ts(e);
        break;
      case 3:
      case 4:
        var t = Ft;
        (Ft = So(e.stateNode.containerInfo)), Ts(e), (Ft = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = zi), (zi = 16777216), Ts(e), (zi = t))
            : Ts(e));
        break;
      default:
        Ts(e);
    }
  }
  function $g(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function Ui(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          (We = r), Vg(r, e);
        }
      $g(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Gg(e), (e = e.sibling);
  }
  function Gg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ui(e), e.flags & 2048 && qn(9, e, e.return);
        break;
      case 3:
        Ui(e);
        break;
      case 12:
        Ui(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), ro(e))
          : Ui(e);
        break;
      default:
        Ui(e);
    }
  }
  function ro(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          (We = r), Vg(r, e);
        }
      $g(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          qn(8, t, t.return), ro(t);
          break;
        case 22:
          (a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), ro(t));
          break;
        default:
          ro(t);
      }
      e = e.sibling;
    }
  }
  function Vg(e, t) {
    for (; We !== null; ) {
      var a = We;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          qn(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var r = a.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          bi(a.memoizedState.cache);
      }
      if (((r = a.child), r !== null)) (r.return = a), (We = r);
      else
        e: for (a = e; We !== null; ) {
          r = We;
          var l = r.sibling,
            u = r.return;
          if ((Bg(r), r === a)) {
            We = null;
            break e;
          }
          if (l !== null) {
            (l.return = u), (We = l);
            break e;
          }
          We = u;
        }
    }
  }
  var m1 = {
      getCacheForType: function (e) {
        var t = it(Qe),
          a = t.data.get(e);
        return a === void 0 && ((a = e()), t.data.set(e, a)), a;
      },
    },
    p1 = typeof WeakMap == 'function' ? WeakMap : Map,
    xe = 0,
    ke = null,
    ye = null,
    _e = 0,
    Re = 0,
    Rt = null,
    Vn = !1,
    Es = !1,
    Uc = !1,
    wn = 0,
    Ie = 0,
    Qn = 0,
    Da = 0,
    Ic = 0,
    Ht = 0,
    xs = 0,
    Ii = null,
    mt = null,
    Hc = !1,
    Pc = 0,
    oo = 1 / 0,
    lo = null,
    Kn = null,
    nt = 0,
    Fn = null,
    Rs = null,
    Cs = 0,
    qc = 0,
    $c = null,
    Qg = null,
    Hi = 0,
    Gc = null;
  function Ct() {
    if ((xe & 2) !== 0 && _e !== 0) return _e & -_e;
    if (C.T !== null) {
      var e = gs;
      return e !== 0 ? e : Wc();
    }
    return ld();
  }
  function Kg() {
    Ht === 0 && (Ht = (_e & 536870912) === 0 || Ee ? sd() : 536870912);
    var e = It.current;
    return e !== null && (e.flags |= 32), Ht;
  }
  function At(e, t, a) {
    ((e === ke && (Re === 2 || Re === 9)) || e.cancelPendingCommit !== null) &&
      (As(e, 0), Yn(e, _e, Ht, !1)),
      si(e, a),
      ((xe & 2) === 0 || e !== ke) &&
        (e === ke &&
          ((xe & 2) === 0 && (Da |= a), Ie === 4 && Yn(e, _e, Ht, !1)),
        tn(e));
  }
  function Fg(e, t, a) {
    if ((xe & 6) !== 0) throw Error(o(327));
    var r = (!a && (t & 124) === 0 && (t & e.expiredLanes) === 0) || ai(e, t),
      l = r ? S1(e, t) : Kc(e, t, !0),
      u = r;
    do {
      if (l === 0) {
        Es && !r && Yn(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), u && !y1(a))) {
          (l = Kc(e, t, !1)), (u = !1);
          continue;
        }
        if (l === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var y = 0;
          else
            (y = e.pendingLanes & -536870913),
              (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0);
          if (y !== 0) {
            t = y;
            e: {
              var _ = e;
              l = Ii;
              var x = _.current.memoizedState.isDehydrated;
              if ((x && (As(_, y).flags |= 256), (y = Kc(_, y, !1)), y !== 2)) {
                if (Uc && !x) {
                  (_.errorRecoveryDisabledLanes |= u), (Da |= u), (l = 4);
                  break e;
                }
                (u = mt),
                  (mt = l),
                  u !== null && (mt === null ? (mt = u) : mt.push.apply(mt, u));
              }
              l = y;
            }
            if (((u = !1), l !== 2)) continue;
          }
        }
        if (l === 1) {
          As(e, 0), Yn(e, t, 0, !0);
          break;
        }
        e: {
          switch (((r = e), (u = l), u)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Yn(r, t, Ht, !Vn);
              break e;
            case 2:
              mt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((l = Pc + 300 - Dt()), 10 < l)) {
            if ((Yn(r, t, Ht, !Vn), Sr(r, 0, !0) !== 0)) break e;
            r.timeoutHandle = Tm(
              Yg.bind(null, r, a, mt, lo, Hc, t, Ht, Da, xs, Vn, u, 2, -0, 0),
              l
            );
            break e;
          }
          Yg(r, a, mt, lo, Hc, t, Ht, Da, xs, Vn, u, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    tn(e);
  }
  function Yg(e, t, a, r, l, u, y, _, x, N, H, Q, j, B) {
    if (
      ((e.timeoutHandle = -1),
      (Q = t.subtreeFlags),
      (Q & 8192 || (Q & 16785408) === 16785408) &&
        ((Ki = { stylesheets: null, count: 0, unsuspend: Z1 }),
        qg(t),
        (Q = eS()),
        Q !== null))
    ) {
      (e.cancelPendingCommit = Q(
        nm.bind(null, e, t, u, a, r, l, y, _, x, H, 1, j, B)
      )),
        Yn(e, u, y, !N);
      return;
    }
    nm(e, t, u, a, r, l, y, _, x);
  }
  function y1(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var r = 0; r < a.length; r++) {
          var l = a[r],
            u = l.getSnapshot;
          l = l.value;
          try {
            if (!wt(u(), l)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        (a.return = t), (t = a);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function Yn(e, t, a, r) {
    (t &= ~Ic),
      (t &= ~Da),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      r && (e.warmLanes |= t),
      (r = e.expirationTimes);
    for (var l = t; 0 < l; ) {
      var u = 31 - _t(l),
        y = 1 << u;
      (r[u] = -1), (l &= ~y);
    }
    a !== 0 && rd(e, a, t);
  }
  function co() {
    return (xe & 6) === 0 ? (Pi(0), !1) : !0;
  }
  function Vc() {
    if (ye !== null) {
      if (Re === 0) var e = ye.return;
      else (e = ye), (gn = Ra = null), lc(e), (bs = null), (ki = 0), (e = ye);
      for (; e !== null; ) Ag(e.alternate, e), (e = e.return);
      ye = null;
    }
  }
  function As(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && ((e.timeoutHandle = -1), j1(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      Vc(),
      (ke = e),
      (ye = a = fn(e.current, null)),
      (_e = t),
      (Re = 0),
      (Rt = null),
      (Vn = !1),
      (Es = ai(e, t)),
      (Uc = !1),
      (xs = Ht = Ic = Da = Qn = Ie = 0),
      (mt = Ii = null),
      (Hc = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var l = 31 - _t(r),
          u = 1 << l;
        (t |= e[l]), (r &= ~u);
      }
    return (wn = t), kr(), a;
  }
  function Xg(e, t) {
    (ge = null),
      (C.H = Xr),
      t === wi || t === Hr
        ? ((t = hh()), (Re = 3))
        : t === uh
        ? ((t = hh()), (Re = 4))
        : (Re =
            t === gg
              ? 8
              : t !== null &&
                typeof t == 'object' &&
                typeof t.then == 'function'
              ? 6
              : 1),
      (Rt = t),
      ye === null && ((Ie = 1), to(e, jt(t, e.current)));
  }
  function Wg() {
    var e = C.H;
    return (C.H = Xr), e === null ? Xr : e;
  }
  function Zg() {
    var e = C.A;
    return (C.A = m1), e;
  }
  function Qc() {
    (Ie = 4),
      Vn || ((_e & 4194048) !== _e && It.current !== null) || (Es = !0),
      ((Qn & 134217727) === 0 && (Da & 134217727) === 0) ||
        ke === null ||
        Yn(ke, _e, Ht, !1);
  }
  function Kc(e, t, a) {
    var r = xe;
    xe |= 2;
    var l = Wg(),
      u = Zg();
    (ke !== e || _e !== t) && ((lo = null), As(e, t)), (t = !1);
    var y = Ie;
    e: do
      try {
        if (Re !== 0 && ye !== null) {
          var _ = ye,
            x = Rt;
          switch (Re) {
            case 8:
              Vc(), (y = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              It.current === null && (t = !0);
              var N = Re;
              if (((Re = 0), (Rt = null), Ms(e, _, x, N), a && Es)) {
                y = 0;
                break e;
              }
              break;
            default:
              (N = Re), (Re = 0), (Rt = null), Ms(e, _, x, N);
          }
        }
        v1(), (y = Ie);
        break;
      } catch (H) {
        Xg(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (gn = Ra = null),
      (xe = r),
      (C.H = l),
      (C.A = u),
      ye === null && ((ke = null), (_e = 0), kr()),
      y
    );
  }
  function v1() {
    for (; ye !== null; ) Jg(ye);
  }
  function S1(e, t) {
    var a = xe;
    xe |= 2;
    var r = Wg(),
      l = Zg();
    ke !== e || _e !== t
      ? ((lo = null), (oo = Dt() + 500), As(e, t))
      : (Es = ai(e, t));
    e: do
      try {
        if (Re !== 0 && ye !== null) {
          t = ye;
          var u = Rt;
          t: switch (Re) {
            case 1:
              (Re = 0), (Rt = null), Ms(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (fh(u)) {
                (Re = 0), (Rt = null), em(t);
                break;
              }
              (t = function () {
                (Re !== 2 && Re !== 9) || ke !== e || (Re = 7), tn(e);
              }),
                u.then(t, t);
              break e;
            case 3:
              Re = 7;
              break e;
            case 4:
              Re = 5;
              break e;
            case 7:
              fh(u)
                ? ((Re = 0), (Rt = null), em(t))
                : ((Re = 0), (Rt = null), Ms(e, t, u, 7));
              break;
            case 5:
              var y = null;
              switch (ye.tag) {
                case 26:
                  y = ye.memoizedState;
                case 5:
                case 27:
                  var _ = ye;
                  if (!y || jm(y)) {
                    (Re = 0), (Rt = null);
                    var x = _.sibling;
                    if (x !== null) ye = x;
                    else {
                      var N = _.return;
                      N !== null ? ((ye = N), uo(N)) : (ye = null);
                    }
                    break t;
                  }
              }
              (Re = 0), (Rt = null), Ms(e, t, u, 5);
              break;
            case 6:
              (Re = 0), (Rt = null), Ms(e, t, u, 6);
              break;
            case 8:
              Vc(), (Ie = 6);
              break e;
            default:
              throw Error(o(462));
          }
        }
        b1();
        break;
      } catch (H) {
        Xg(e, H);
      }
    while (!0);
    return (
      (gn = Ra = null),
      (C.H = r),
      (C.A = l),
      (xe = a),
      ye !== null ? 0 : ((ke = null), (_e = 0), kr(), Ie)
    );
  }
  function b1() {
    for (; ye !== null && !ol(); ) Jg(ye);
  }
  function Jg(e) {
    var t = Rg(e.alternate, e, wn);
    (e.memoizedProps = e.pendingProps), t === null ? uo(e) : (ye = t);
  }
  function em(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = bg(a, t, t.pendingProps, t.type, void 0, _e);
        break;
      case 11:
        t = bg(a, t, t.pendingProps, t.type.render, t.ref, _e);
        break;
      case 5:
        lc(t);
      default:
        Ag(a, t), (t = ye = th(t, wn)), (t = Rg(a, t, wn));
    }
    (e.memoizedProps = e.pendingProps), t === null ? uo(e) : (ye = t);
  }
  function Ms(e, t, a, r) {
    (gn = Ra = null), lc(t), (bs = null), (ki = 0);
    var l = t.return;
    try {
      if (c1(e, l, t, a, _e)) {
        (Ie = 1), to(e, jt(a, e.current)), (ye = null);
        return;
      }
    } catch (u) {
      if (l !== null) throw ((ye = l), u);
      (Ie = 1), to(e, jt(a, e.current)), (ye = null);
      return;
    }
    t.flags & 32768
      ? (Ee || r === 1
          ? (e = !0)
          : Es || (_e & 536870912) !== 0
          ? (e = !1)
          : ((Vn = e = !0),
            (r === 2 || r === 9 || r === 3 || r === 6) &&
              ((r = It.current),
              r !== null && r.tag === 13 && (r.flags |= 16384))),
        tm(t, e))
      : uo(t);
  }
  function uo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        tm(t, Vn);
        return;
      }
      e = t.return;
      var a = f1(t.alternate, t, wn);
      if (a !== null) {
        ye = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ye = t;
        return;
      }
      ye = t = e;
    } while (t !== null);
    Ie === 0 && (Ie = 5);
  }
  function tm(e, t) {
    do {
      var a = d1(e.alternate, e);
      if (a !== null) {
        (a.flags &= 32767), (ye = a);
        return;
      }
      if (
        ((a = e.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ye = e;
        return;
      }
      ye = e = a;
    } while (e !== null);
    (Ie = 6), (ye = null);
  }
  function nm(e, t, a, r, l, u, y, _, x) {
    e.cancelPendingCommit = null;
    do fo();
    while (nt !== 0);
    if ((xe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= zl),
        Zv(e, a, u, y, _, x),
        e === ke && ((ye = ke = null), (_e = 0)),
        (Rs = t),
        (Fn = e),
        (Cs = a),
        (qc = u),
        ($c = l),
        (Qg = r),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            E1(ma, function () {
              return om(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (r = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || r)
      ) {
        (r = C.T), (C.T = null), (l = V.p), (V.p = 2), (y = xe), (xe |= 4);
        try {
          h1(e, t, a);
        } finally {
          (xe = y), (V.p = l), (C.T = r);
        }
      }
      (nt = 1), am(), sm(), im();
    }
  }
  function am() {
    if (nt === 1) {
      nt = 0;
      var e = Fn,
        t = Rs,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        (a = C.T), (C.T = null);
        var r = V.p;
        V.p = 2;
        var l = xe;
        xe |= 4;
        try {
          Ig(t, e);
          var u = iu,
            y = Vd(e.containerInfo),
            _ = u.focusedElem,
            x = u.selectionRange;
          if (
            y !== _ &&
            _ &&
            _.ownerDocument &&
            Gd(_.ownerDocument.documentElement, _)
          ) {
            if (x !== null && Dl(_)) {
              var N = x.start,
                H = x.end;
              if ((H === void 0 && (H = N), 'selectionStart' in _))
                (_.selectionStart = N),
                  (_.selectionEnd = Math.min(H, _.value.length));
              else {
                var Q = _.ownerDocument || document,
                  j = (Q && Q.defaultView) || window;
                if (j.getSelection) {
                  var B = j.getSelection(),
                    fe = _.textContent.length,
                    ce = Math.min(x.start, fe),
                    Me = x.end === void 0 ? ce : Math.min(x.end, fe);
                  !B.extend && ce > Me && ((y = Me), (Me = ce), (ce = y));
                  var k = $d(_, ce),
                    A = $d(_, Me);
                  if (
                    k &&
                    A &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== k.node ||
                      B.anchorOffset !== k.offset ||
                      B.focusNode !== A.node ||
                      B.focusOffset !== A.offset)
                  ) {
                    var D = Q.createRange();
                    D.setStart(k.node, k.offset),
                      B.removeAllRanges(),
                      ce > Me
                        ? (B.addRange(D), B.extend(A.node, A.offset))
                        : (D.setEnd(A.node, A.offset), B.addRange(D));
                  }
                }
              }
            }
            for (Q = [], B = _; (B = B.parentNode); )
              B.nodeType === 1 &&
                Q.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (
              typeof _.focus == 'function' && _.focus(), _ = 0;
              _ < Q.length;
              _++
            ) {
              var q = Q[_];
              (q.element.scrollLeft = q.left), (q.element.scrollTop = q.top);
            }
          }
          (Eo = !!su), (iu = su = null);
        } finally {
          (xe = l), (V.p = r), (C.T = a);
        }
      }
      (e.current = t), (nt = 2);
    }
  }
  function sm() {
    if (nt === 2) {
      nt = 0;
      var e = Fn,
        t = Rs,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        (a = C.T), (C.T = null);
        var r = V.p;
        V.p = 2;
        var l = xe;
        xe |= 4;
        try {
          jg(e, t.alternate, t);
        } finally {
          (xe = l), (V.p = r), (C.T = a);
        }
      }
      nt = 3;
    }
  }
  function im() {
    if (nt === 4 || nt === 3) {
      (nt = 0), ll();
      var e = Fn,
        t = Rs,
        a = Cs,
        r = Qg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (nt = 5)
        : ((nt = 0), (Rs = Fn = null), rm(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (
        (l === 0 && (Kn = null),
        fl(a),
        (t = t.stateNode),
        bt && typeof bt.onCommitFiberRoot == 'function')
      )
        try {
          bt.onCommitFiberRoot(ni, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (r !== null) {
        (t = C.T), (l = V.p), (V.p = 2), (C.T = null);
        try {
          for (var u = e.onRecoverableError, y = 0; y < r.length; y++) {
            var _ = r[y];
            u(_.value, { componentStack: _.stack });
          }
        } finally {
          (C.T = t), (V.p = l);
        }
      }
      (Cs & 3) !== 0 && fo(),
        tn(e),
        (l = e.pendingLanes),
        (a & 4194090) !== 0 && (l & 42) !== 0
          ? e === Gc
            ? Hi++
            : ((Hi = 0), (Gc = e))
          : (Hi = 0),
        Pi(0);
    }
  }
  function rm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), bi(t)));
  }
  function fo(e) {
    return am(), sm(), im(), om();
  }
  function om() {
    if (nt !== 5) return !1;
    var e = Fn,
      t = qc;
    qc = 0;
    var a = fl(Cs),
      r = C.T,
      l = V.p;
    try {
      (V.p = 32 > a ? 32 : a), (C.T = null), (a = $c), ($c = null);
      var u = Fn,
        y = Cs;
      if (((nt = 0), (Rs = Fn = null), (Cs = 0), (xe & 6) !== 0))
        throw Error(o(331));
      var _ = xe;
      if (
        ((xe |= 4),
        Gg(u.current),
        Pg(u, u.current, y, a),
        (xe = _),
        Pi(0, !1),
        bt && typeof bt.onPostCommitFiberRoot == 'function')
      )
        try {
          bt.onPostCommitFiberRoot(ni, u);
        } catch {}
      return !0;
    } finally {
      (V.p = l), (C.T = r), rm(e, t);
    }
  }
  function lm(e, t, a) {
    (t = jt(a, t)),
      (t = wc(e.stateNode, t, 2)),
      (e = Un(e, t, 2)),
      e !== null && (si(e, 2), tn(e));
  }
  function Oe(e, t, a) {
    if (e.tag === 3) lm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          lm(t, e, a);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof r.componentDidCatch == 'function' &&
              (Kn === null || !Kn.has(r)))
          ) {
            (e = jt(a, e)),
              (a = dg(2)),
              (r = Un(t, a, 2)),
              r !== null && (hg(a, r, t, e), si(r, 2), tn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function Fc(e, t, a) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new p1();
      var l = new Set();
      r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(a) ||
      ((Uc = !0), l.add(a), (e = _1.bind(null, e, t, a)), t.then(e, e));
  }
  function _1(e, t, a) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      ke === e &&
        (_e & a) === a &&
        (Ie === 4 || (Ie === 3 && (_e & 62914560) === _e && 300 > Dt() - Pc)
          ? (xe & 2) === 0 && As(e, 0)
          : (Ic |= a),
        xs === _e && (xs = 0)),
      tn(e);
  }
  function cm(e, t) {
    t === 0 && (t = id()), (e = us(e, t)), e !== null && (si(e, t), tn(e));
  }
  function w1(e) {
    var t = e.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), cm(e, a);
  }
  function T1(e, t) {
    var a = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          l = e.memoizedState;
        l !== null && (a = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    r !== null && r.delete(t), cm(e, a);
  }
  function E1(e, t) {
    return ei(e, t);
  }
  var ho = null,
    Os = null,
    Yc = !1,
    go = !1,
    Xc = !1,
    Na = 0;
  function tn(e) {
    e !== Os &&
      e.next === null &&
      (Os === null ? (ho = Os = e) : (Os = Os.next = e)),
      (go = !0),
      Yc || ((Yc = !0), R1());
  }
  function Pi(e, t) {
    if (!Xc && go) {
      Xc = !0;
      do
        for (var a = !1, r = ho; r !== null; ) {
          if (e !== 0) {
            var l = r.pendingLanes;
            if (l === 0) var u = 0;
            else {
              var y = r.suspendedLanes,
                _ = r.pingedLanes;
              (u = (1 << (31 - _t(42 | e) + 1)) - 1),
                (u &= l & ~(y & ~_)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0);
            }
            u !== 0 && ((a = !0), hm(r, u));
          } else
            (u = _e),
              (u = Sr(
                r,
                r === ke ? u : 0,
                r.cancelPendingCommit !== null || r.timeoutHandle !== -1
              )),
              (u & 3) === 0 || ai(r, u) || ((a = !0), hm(r, u));
          r = r.next;
        }
      while (a);
      Xc = !1;
    }
  }
  function x1() {
    um();
  }
  function um() {
    go = Yc = !1;
    var e = 0;
    Na !== 0 && (L1() && (e = Na), (Na = 0));
    for (var t = Dt(), a = null, r = ho; r !== null; ) {
      var l = r.next,
        u = fm(r, t);
      u === 0
        ? ((r.next = null),
          a === null ? (ho = l) : (a.next = l),
          l === null && (Os = a))
        : ((a = r), (e !== 0 || (u & 3) !== 0) && (go = !0)),
        (r = l);
    }
    Pi(e);
  }
  function fm(e, t) {
    for (
      var a = e.suspendedLanes,
        r = e.pingedLanes,
        l = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;

    ) {
      var y = 31 - _t(u),
        _ = 1 << y,
        x = l[y];
      x === -1
        ? ((_ & a) === 0 || (_ & r) !== 0) && (l[y] = Wv(_, t))
        : x <= t && (e.expiredLanes |= _),
        (u &= ~_);
    }
    if (
      ((t = ke),
      (a = _e),
      (a = Sr(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (r = e.callbackNode),
      a === 0 ||
        (e === t && (Re === 2 || Re === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        r !== null && r !== null && Fa(r),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((a & 3) === 0 || ai(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((r !== null && Fa(r), fl(a))) {
        case 2:
        case 8:
          a = ti;
          break;
        case 32:
          a = ma;
          break;
        case 268435456:
          a = et;
          break;
        default:
          a = ma;
      }
      return (
        (r = dm.bind(null, e)),
        (a = ei(a, r)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      r !== null && r !== null && Fa(r),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function dm(e, t) {
    if (nt !== 0 && nt !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var a = e.callbackNode;
    if (fo() && e.callbackNode !== a) return null;
    var r = _e;
    return (
      (r = Sr(
        e,
        e === ke ? r : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      r === 0
        ? null
        : (Fg(e, r, t),
          fm(e, Dt()),
          e.callbackNode != null && e.callbackNode === a
            ? dm.bind(null, e)
            : null)
    );
  }
  function hm(e, t) {
    if (fo()) return null;
    Fg(e, t, !0);
  }
  function R1() {
    B1(function () {
      (xe & 6) !== 0 ? ei(ga, x1) : um();
    });
  }
  function Wc() {
    return Na === 0 && (Na = sd()), Na;
  }
  function gm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
      ? e
      : Er('' + e);
  }
  function mm(e, t) {
    var a = t.ownerDocument.createElement('input');
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute('form', e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function C1(e, t, a, r, l) {
    if (t === 'submit' && a && a.stateNode === l) {
      var u = gm((l[ft] || null).action),
        y = r.submitter;
      y &&
        ((t = (t = y[ft] || null)
          ? gm(t.formAction)
          : y.getAttribute('formAction')),
        t !== null && ((u = t), (y = null)));
      var _ = new Ar('action', 'action', null, r, l);
      e.push({
        event: _,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (Na !== 0) {
                  var x = y ? mm(l, y) : new FormData(l);
                  yc(
                    a,
                    { pending: !0, data: x, method: l.method, action: u },
                    null,
                    x
                  );
                }
              } else
                typeof u == 'function' &&
                  (_.preventDefault(),
                  (x = y ? mm(l, y) : new FormData(l)),
                  yc(
                    a,
                    { pending: !0, data: x, method: l.method, action: u },
                    u,
                    x
                  ));
            },
            currentTarget: l,
          },
        ],
      });
    }
  }
  for (var Zc = 0; Zc < Bl.length; Zc++) {
    var Jc = Bl[Zc],
      A1 = Jc.toLowerCase(),
      M1 = Jc[0].toUpperCase() + Jc.slice(1);
    Kt(A1, 'on' + M1);
  }
  Kt(Fd, 'onAnimationEnd'),
    Kt(Yd, 'onAnimationIteration'),
    Kt(Xd, 'onAnimationStart'),
    Kt('dblclick', 'onDoubleClick'),
    Kt('focusin', 'onFocus'),
    Kt('focusout', 'onBlur'),
    Kt(Q0, 'onTransitionRun'),
    Kt(K0, 'onTransitionStart'),
    Kt(F0, 'onTransitionCancel'),
    Kt(Wd, 'onTransitionEnd'),
    es('onMouseEnter', ['mouseout', 'mouseover']),
    es('onMouseLeave', ['mouseout', 'mouseover']),
    es('onPointerEnter', ['pointerout', 'pointerover']),
    es('onPointerLeave', ['pointerout', 'pointerover']),
    ya(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' '
      )
    ),
    ya(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    ya('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    ya(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' ')
    ),
    ya(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    ya(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    );
  var qi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    O1 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'
        .split(' ')
        .concat(qi)
    );
  function pm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var r = e[a],
        l = r.event;
      r = r.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var y = r.length - 1; 0 <= y; y--) {
            var _ = r[y],
              x = _.instance,
              N = _.currentTarget;
            if (((_ = _.listener), x !== u && l.isPropagationStopped()))
              break e;
            (u = _), (l.currentTarget = N);
            try {
              u(l);
            } catch (H) {
              eo(H);
            }
            (l.currentTarget = null), (u = x);
          }
        else
          for (y = 0; y < r.length; y++) {
            if (
              ((_ = r[y]),
              (x = _.instance),
              (N = _.currentTarget),
              (_ = _.listener),
              x !== u && l.isPropagationStopped())
            )
              break e;
            (u = _), (l.currentTarget = N);
            try {
              u(l);
            } catch (H) {
              eo(H);
            }
            (l.currentTarget = null), (u = x);
          }
      }
    }
  }
  function ve(e, t) {
    var a = t[dl];
    a === void 0 && (a = t[dl] = new Set());
    var r = e + '__bubble';
    a.has(r) || (ym(t, e, 2, !1), a.add(r));
  }
  function eu(e, t, a) {
    var r = 0;
    t && (r |= 4), ym(a, e, r, t);
  }
  var mo = '_reactListening' + Math.random().toString(36).slice(2);
  function tu(e) {
    if (!e[mo]) {
      (e[mo] = !0),
        ud.forEach(function (a) {
          a !== 'selectionchange' && (O1.has(a) || eu(a, !1, e), eu(a, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[mo] || ((t[mo] = !0), eu('selectionchange', !1, t));
    }
  }
  function ym(e, t, a, r) {
    switch (Pm(t)) {
      case 2:
        var l = aS;
        break;
      case 8:
        l = sS;
        break;
      default:
        l = mu;
    }
    (a = l.bind(null, t, a, e)),
      (l = void 0),
      !Tl ||
        (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
        (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: l })
          : e.addEventListener(t, a, !0)
        : l !== void 0
        ? e.addEventListener(t, a, { passive: l })
        : e.addEventListener(t, a, !1);
  }
  function nu(e, t, a, r, l) {
    var u = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var y = r.tag;
        if (y === 3 || y === 4) {
          var _ = r.stateNode.containerInfo;
          if (_ === l) break;
          if (y === 4)
            for (y = r.return; y !== null; ) {
              var x = y.tag;
              if ((x === 3 || x === 4) && y.stateNode.containerInfo === l)
                return;
              y = y.return;
            }
          for (; _ !== null; ) {
            if (((y = Wa(_)), y === null)) return;
            if (((x = y.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              r = u = y;
              continue e;
            }
            _ = _.parentNode;
          }
        }
        r = r.return;
      }
    Ed(function () {
      var N = u,
        H = _l(a),
        Q = [];
      e: {
        var j = Zd.get(e);
        if (j !== void 0) {
          var B = Ar,
            fe = e;
          switch (e) {
            case 'keypress':
              if (Rr(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              B = E0;
              break;
            case 'focusin':
              (fe = 'focus'), (B = Cl);
              break;
            case 'focusout':
              (fe = 'blur'), (B = Cl);
              break;
            case 'beforeblur':
            case 'afterblur':
              B = Cl;
              break;
            case 'click':
              if (a.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              B = Cd;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              B = d0;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              B = C0;
              break;
            case Fd:
            case Yd:
            case Xd:
              B = m0;
              break;
            case Wd:
              B = M0;
              break;
            case 'scroll':
            case 'scrollend':
              B = u0;
              break;
            case 'wheel':
              B = k0;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              B = y0;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              B = Md;
              break;
            case 'toggle':
            case 'beforetoggle':
              B = N0;
          }
          var ce = (t & 4) !== 0,
            Me = !ce && (e === 'scroll' || e === 'scrollend'),
            k = ce ? (j !== null ? j + 'Capture' : null) : j;
          ce = [];
          for (var A = N, D; A !== null; ) {
            var q = A;
            if (
              ((D = q.stateNode),
              (q = q.tag),
              (q !== 5 && q !== 26 && q !== 27) ||
                D === null ||
                k === null ||
                ((q = oi(A, k)), q != null && ce.push($i(A, q, D))),
              Me)
            )
              break;
            A = A.return;
          }
          0 < ce.length &&
            ((j = new B(j, fe, null, a, H)),
            Q.push({ event: j, listeners: ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((j = e === 'mouseover' || e === 'pointerover'),
            (B = e === 'mouseout' || e === 'pointerout'),
            j &&
              a !== bl &&
              (fe = a.relatedTarget || a.fromElement) &&
              (Wa(fe) || fe[Xa]))
          )
            break e;
          if (
            (B || j) &&
            ((j =
              H.window === H
                ? H
                : (j = H.ownerDocument)
                ? j.defaultView || j.parentWindow
                : window),
            B
              ? ((fe = a.relatedTarget || a.toElement),
                (B = N),
                (fe = fe ? Wa(fe) : null),
                fe !== null &&
                  ((Me = f(fe)),
                  (ce = fe.tag),
                  fe !== Me || (ce !== 5 && ce !== 27 && ce !== 6)) &&
                  (fe = null))
              : ((B = null), (fe = N)),
            B !== fe)
          ) {
            if (
              ((ce = Cd),
              (q = 'onMouseLeave'),
              (k = 'onMouseEnter'),
              (A = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((ce = Md),
                (q = 'onPointerLeave'),
                (k = 'onPointerEnter'),
                (A = 'pointer')),
              (Me = B == null ? j : ri(B)),
              (D = fe == null ? j : ri(fe)),
              (j = new ce(q, A + 'leave', B, a, H)),
              (j.target = Me),
              (j.relatedTarget = D),
              (q = null),
              Wa(H) === N &&
                ((ce = new ce(k, A + 'enter', fe, a, H)),
                (ce.target = D),
                (ce.relatedTarget = Me),
                (q = ce)),
              (Me = q),
              B && fe)
            )
              t: {
                for (ce = B, k = fe, A = 0, D = ce; D; D = ks(D)) A++;
                for (D = 0, q = k; q; q = ks(q)) D++;
                for (; 0 < A - D; ) (ce = ks(ce)), A--;
                for (; 0 < D - A; ) (k = ks(k)), D--;
                for (; A--; ) {
                  if (ce === k || (k !== null && ce === k.alternate)) break t;
                  (ce = ks(ce)), (k = ks(k));
                }
                ce = null;
              }
            else ce = null;
            B !== null && vm(Q, j, B, ce, !1),
              fe !== null && Me !== null && vm(Q, Me, fe, ce, !0);
          }
        }
        e: {
          if (
            ((j = N ? ri(N) : window),
            (B = j.nodeName && j.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && j.type === 'file'))
          )
            var se = zd;
          else if (jd(j))
            if (Ud) se = $0;
            else {
              se = P0;
              var pe = H0;
            }
          else
            (B = j.nodeName),
              !B ||
              B.toLowerCase() !== 'input' ||
              (j.type !== 'checkbox' && j.type !== 'radio')
                ? N && Sl(N.elementType) && (se = zd)
                : (se = q0);
          if (se && (se = se(e, N))) {
            Bd(Q, se, a, H);
            break e;
          }
          pe && pe(e, j, N),
            e === 'focusout' &&
              N &&
              j.type === 'number' &&
              N.memoizedProps.value != null &&
              vl(j, 'number', j.value);
        }
        switch (((pe = N ? ri(N) : window), e)) {
          case 'focusin':
            (jd(pe) || pe.contentEditable === 'true') &&
              ((os = pe), (Nl = N), (mi = null));
            break;
          case 'focusout':
            mi = Nl = os = null;
            break;
          case 'mousedown':
            Ll = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            (Ll = !1), Qd(Q, a, H);
            break;
          case 'selectionchange':
            if (V0) break;
          case 'keydown':
          case 'keyup':
            Qd(Q, a, H);
        }
        var ie;
        if (Ml)
          e: {
            switch (e) {
              case 'compositionstart':
                var ue = 'onCompositionStart';
                break e;
              case 'compositionend':
                ue = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                ue = 'onCompositionUpdate';
                break e;
            }
            ue = void 0;
          }
        else
          rs
            ? Nd(e, a) && (ue = 'onCompositionEnd')
            : e === 'keydown' &&
              a.keyCode === 229 &&
              (ue = 'onCompositionStart');
        ue &&
          (Od &&
            a.locale !== 'ko' &&
            (rs || ue !== 'onCompositionStart'
              ? ue === 'onCompositionEnd' && rs && (ie = xd())
              : ((Ln = H),
                (El = 'value' in Ln ? Ln.value : Ln.textContent),
                (rs = !0))),
          (pe = po(N, ue)),
          0 < pe.length &&
            ((ue = new Ad(ue, e, null, a, H)),
            Q.push({ event: ue, listeners: pe }),
            ie
              ? (ue.data = ie)
              : ((ie = Ld(a)), ie !== null && (ue.data = ie)))),
          (ie = j0 ? B0(e, a) : z0(e, a)) &&
            ((ue = po(N, 'onBeforeInput')),
            0 < ue.length &&
              ((pe = new Ad('onBeforeInput', 'beforeinput', null, a, H)),
              Q.push({ event: pe, listeners: ue }),
              (pe.data = ie))),
          C1(Q, e, N, a, H);
      }
      pm(Q, t);
    });
  }
  function $i(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function po(e, t) {
    for (var a = t + 'Capture', r = []; e !== null; ) {
      var l = e,
        u = l.stateNode;
      if (
        ((l = l.tag),
        (l !== 5 && l !== 26 && l !== 27) ||
          u === null ||
          ((l = oi(e, a)),
          l != null && r.unshift($i(e, l, u)),
          (l = oi(e, t)),
          l != null && r.push($i(e, l, u))),
        e.tag === 3)
      )
        return r;
      e = e.return;
    }
    return [];
  }
  function ks(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function vm(e, t, a, r, l) {
    for (var u = t._reactName, y = []; a !== null && a !== r; ) {
      var _ = a,
        x = _.alternate,
        N = _.stateNode;
      if (((_ = _.tag), x !== null && x === r)) break;
      (_ !== 5 && _ !== 26 && _ !== 27) ||
        N === null ||
        ((x = N),
        l
          ? ((N = oi(a, u)), N != null && y.unshift($i(a, N, x)))
          : l || ((N = oi(a, u)), N != null && y.push($i(a, N, x)))),
        (a = a.return);
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var k1 = /\r\n?/g,
    D1 = /\u0000|\uFFFD/g;
  function Sm(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        k1,
        `
`
      )
      .replace(D1, '');
  }
  function bm(e, t) {
    return (t = Sm(t)), Sm(e) === t;
  }
  function yo() {}
  function Ae(e, t, a, r, l, u) {
    switch (a) {
      case 'children':
        typeof r == 'string'
          ? t === 'body' || (t === 'textarea' && r === '') || as(e, r)
          : (typeof r == 'number' || typeof r == 'bigint') &&
            t !== 'body' &&
            as(e, '' + r);
        break;
      case 'className':
        _r(e, 'class', r);
        break;
      case 'tabIndex':
        _r(e, 'tabindex', r);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        _r(e, a, r);
        break;
      case 'style':
        wd(e, r, u);
        break;
      case 'data':
        if (t !== 'object') {
          _r(e, 'data', r);
          break;
        }
      case 'src':
      case 'href':
        if (r === '' && (t !== 'a' || a !== 'href')) {
          e.removeAttribute(a);
          break;
        }
        if (
          r == null ||
          typeof r == 'function' ||
          typeof r == 'symbol' ||
          typeof r == 'boolean'
        ) {
          e.removeAttribute(a);
          break;
        }
        (r = Er('' + r)), e.setAttribute(a, r);
        break;
      case 'action':
      case 'formAction':
        if (typeof r == 'function') {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && Ae(e, t, 'name', l.name, l, null),
                Ae(e, t, 'formEncType', l.formEncType, l, null),
                Ae(e, t, 'formMethod', l.formMethod, l, null),
                Ae(e, t, 'formTarget', l.formTarget, l, null))
              : (Ae(e, t, 'encType', l.encType, l, null),
                Ae(e, t, 'method', l.method, l, null),
                Ae(e, t, 'target', l.target, l, null)));
        if (r == null || typeof r == 'symbol' || typeof r == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        (r = Er('' + r)), e.setAttribute(a, r);
        break;
      case 'onClick':
        r != null && (e.onclick = yo);
        break;
      case 'onScroll':
        r != null && ve('scroll', e);
        break;
      case 'onScrollEnd':
        r != null && ve('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (r != null) {
          if (typeof r != 'object' || !('__html' in r)) throw Error(o(61));
          if (((a = r.__html), a != null)) {
            if (l.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        e.multiple = r && typeof r != 'function' && typeof r != 'symbol';
        break;
      case 'muted':
        e.muted = r && typeof r != 'function' && typeof r != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (
          r == null ||
          typeof r == 'function' ||
          typeof r == 'boolean' ||
          typeof r == 'symbol'
        ) {
          e.removeAttribute('xlink:href');
          break;
        }
        (a = Er('' + r)),
          e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a);
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        r != null && typeof r != 'function' && typeof r != 'symbol'
          ? e.setAttribute(a, '' + r)
          : e.removeAttribute(a);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        r && typeof r != 'function' && typeof r != 'symbol'
          ? e.setAttribute(a, '')
          : e.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        r === !0
          ? e.setAttribute(a, '')
          : r !== !1 &&
            r != null &&
            typeof r != 'function' &&
            typeof r != 'symbol'
          ? e.setAttribute(a, r)
          : e.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        r != null &&
        typeof r != 'function' &&
        typeof r != 'symbol' &&
        !isNaN(r) &&
        1 <= r
          ? e.setAttribute(a, r)
          : e.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        r == null || typeof r == 'function' || typeof r == 'symbol' || isNaN(r)
          ? e.removeAttribute(a)
          : e.setAttribute(a, r);
        break;
      case 'popover':
        ve('beforetoggle', e), ve('toggle', e), br(e, 'popover', r);
        break;
      case 'xlinkActuate':
        cn(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', r);
        break;
      case 'xlinkArcrole':
        cn(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', r);
        break;
      case 'xlinkRole':
        cn(e, 'http://www.w3.org/1999/xlink', 'xlink:role', r);
        break;
      case 'xlinkShow':
        cn(e, 'http://www.w3.org/1999/xlink', 'xlink:show', r);
        break;
      case 'xlinkTitle':
        cn(e, 'http://www.w3.org/1999/xlink', 'xlink:title', r);
        break;
      case 'xlinkType':
        cn(e, 'http://www.w3.org/1999/xlink', 'xlink:type', r);
        break;
      case 'xmlBase':
        cn(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', r);
        break;
      case 'xmlLang':
        cn(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', r);
        break;
      case 'xmlSpace':
        cn(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', r);
        break;
      case 'is':
        br(e, 'is', r);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== 'o' && a[0] !== 'O') ||
          (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = l0.get(a) || a), br(e, a, r));
    }
  }
  function au(e, t, a, r, l, u) {
    switch (a) {
      case 'style':
        wd(e, r, u);
        break;
      case 'dangerouslySetInnerHTML':
        if (r != null) {
          if (typeof r != 'object' || !('__html' in r)) throw Error(o(61));
          if (((a = r.__html), a != null)) {
            if (l.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof r == 'string'
          ? as(e, r)
          : (typeof r == 'number' || typeof r == 'bigint') && as(e, '' + r);
        break;
      case 'onScroll':
        r != null && ve('scroll', e);
        break;
      case 'onScrollEnd':
        r != null && ve('scrollend', e);
        break;
      case 'onClick':
        r != null && (e.onclick = yo);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!fd.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((l = a.endsWith('Capture')),
              (t = a.slice(2, l ? a.length - 7 : void 0)),
              (u = e[ft] || null),
              (u = u != null ? u[a] : null),
              typeof u == 'function' && e.removeEventListener(t, u, l),
              typeof r == 'function')
            ) {
              typeof u != 'function' &&
                u !== null &&
                (a in e
                  ? (e[a] = null)
                  : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, r, l);
              break e;
            }
            a in e
              ? (e[a] = r)
              : r === !0
              ? e.setAttribute(a, '')
              : br(e, a, r);
          }
    }
  }
  function at(e, t, a) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        ve('error', e), ve('load', e);
        var r = !1,
          l = !1,
          u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var y = a[u];
            if (y != null)
              switch (u) {
                case 'src':
                  r = !0;
                  break;
                case 'srcSet':
                  l = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, t));
                default:
                  Ae(e, t, u, y, a, null);
              }
          }
        l && Ae(e, t, 'srcSet', a.srcSet, a, null),
          r && Ae(e, t, 'src', a.src, a, null);
        return;
      case 'input':
        ve('invalid', e);
        var _ = (u = y = l = null),
          x = null,
          N = null;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var H = a[r];
            if (H != null)
              switch (r) {
                case 'name':
                  l = H;
                  break;
                case 'type':
                  y = H;
                  break;
                case 'checked':
                  x = H;
                  break;
                case 'defaultChecked':
                  N = H;
                  break;
                case 'value':
                  u = H;
                  break;
                case 'defaultValue':
                  _ = H;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (H != null) throw Error(o(137, t));
                  break;
                default:
                  Ae(e, t, r, H, a, null);
              }
          }
        vd(e, u, _, x, N, y, l, !1), wr(e);
        return;
      case 'select':
        ve('invalid', e), (r = y = u = null);
        for (l in a)
          if (a.hasOwnProperty(l) && ((_ = a[l]), _ != null))
            switch (l) {
              case 'value':
                u = _;
                break;
              case 'defaultValue':
                y = _;
                break;
              case 'multiple':
                r = _;
              default:
                Ae(e, t, l, _, a, null);
            }
        (t = u),
          (a = y),
          (e.multiple = !!r),
          t != null ? ns(e, !!r, t, !1) : a != null && ns(e, !!r, a, !0);
        return;
      case 'textarea':
        ve('invalid', e), (u = l = r = null);
        for (y in a)
          if (a.hasOwnProperty(y) && ((_ = a[y]), _ != null))
            switch (y) {
              case 'value':
                r = _;
                break;
              case 'defaultValue':
                l = _;
                break;
              case 'children':
                u = _;
                break;
              case 'dangerouslySetInnerHTML':
                if (_ != null) throw Error(o(91));
                break;
              default:
                Ae(e, t, y, _, a, null);
            }
        bd(e, r, l, u), wr(e);
        return;
      case 'option':
        for (x in a)
          if (a.hasOwnProperty(x) && ((r = a[x]), r != null))
            switch (x) {
              case 'selected':
                e.selected =
                  r && typeof r != 'function' && typeof r != 'symbol';
                break;
              default:
                Ae(e, t, x, r, a, null);
            }
        return;
      case 'dialog':
        ve('beforetoggle', e), ve('toggle', e), ve('cancel', e), ve('close', e);
        break;
      case 'iframe':
      case 'object':
        ve('load', e);
        break;
      case 'video':
      case 'audio':
        for (r = 0; r < qi.length; r++) ve(qi[r], e);
        break;
      case 'image':
        ve('error', e), ve('load', e);
        break;
      case 'details':
        ve('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        ve('error', e), ve('load', e);
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (N in a)
          if (a.hasOwnProperty(N) && ((r = a[N]), r != null))
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(o(137, t));
              default:
                Ae(e, t, N, r, a, null);
            }
        return;
      default:
        if (Sl(t)) {
          for (H in a)
            a.hasOwnProperty(H) &&
              ((r = a[H]), r !== void 0 && au(e, t, H, r, a, void 0));
          return;
        }
    }
    for (_ in a)
      a.hasOwnProperty(_) && ((r = a[_]), r != null && Ae(e, t, _, r, a, null));
  }
  function N1(e, t, a, r) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var l = null,
          u = null,
          y = null,
          _ = null,
          x = null,
          N = null,
          H = null;
        for (B in a) {
          var Q = a[B];
          if (a.hasOwnProperty(B) && Q != null)
            switch (B) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                x = Q;
              default:
                r.hasOwnProperty(B) || Ae(e, t, B, null, r, Q);
            }
        }
        for (var j in r) {
          var B = r[j];
          if (((Q = a[j]), r.hasOwnProperty(j) && (B != null || Q != null)))
            switch (j) {
              case 'type':
                u = B;
                break;
              case 'name':
                l = B;
                break;
              case 'checked':
                N = B;
                break;
              case 'defaultChecked':
                H = B;
                break;
              case 'value':
                y = B;
                break;
              case 'defaultValue':
                _ = B;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (B != null) throw Error(o(137, t));
                break;
              default:
                B !== Q && Ae(e, t, j, B, r, Q);
            }
        }
        yl(e, y, _, x, N, H, u, l);
        return;
      case 'select':
        B = y = _ = j = null;
        for (u in a)
          if (((x = a[u]), a.hasOwnProperty(u) && x != null))
            switch (u) {
              case 'value':
                break;
              case 'multiple':
                B = x;
              default:
                r.hasOwnProperty(u) || Ae(e, t, u, null, r, x);
            }
        for (l in r)
          if (
            ((u = r[l]),
            (x = a[l]),
            r.hasOwnProperty(l) && (u != null || x != null))
          )
            switch (l) {
              case 'value':
                j = u;
                break;
              case 'defaultValue':
                _ = u;
                break;
              case 'multiple':
                y = u;
              default:
                u !== x && Ae(e, t, l, u, r, x);
            }
        (t = _),
          (a = y),
          (r = B),
          j != null
            ? ns(e, !!a, j, !1)
            : !!r != !!a &&
              (t != null ? ns(e, !!a, t, !0) : ns(e, !!a, a ? [] : '', !1));
        return;
      case 'textarea':
        B = j = null;
        for (_ in a)
          if (
            ((l = a[_]),
            a.hasOwnProperty(_) && l != null && !r.hasOwnProperty(_))
          )
            switch (_) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Ae(e, t, _, null, r, l);
            }
        for (y in r)
          if (
            ((l = r[y]),
            (u = a[y]),
            r.hasOwnProperty(y) && (l != null || u != null))
          )
            switch (y) {
              case 'value':
                j = l;
                break;
              case 'defaultValue':
                B = l;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (l != null) throw Error(o(91));
                break;
              default:
                l !== u && Ae(e, t, y, l, r, u);
            }
        Sd(e, j, B);
        return;
      case 'option':
        for (var fe in a)
          if (
            ((j = a[fe]),
            a.hasOwnProperty(fe) && j != null && !r.hasOwnProperty(fe))
          )
            switch (fe) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Ae(e, t, fe, null, r, j);
            }
        for (x in r)
          if (
            ((j = r[x]),
            (B = a[x]),
            r.hasOwnProperty(x) && j !== B && (j != null || B != null))
          )
            switch (x) {
              case 'selected':
                e.selected =
                  j && typeof j != 'function' && typeof j != 'symbol';
                break;
              default:
                Ae(e, t, x, j, r, B);
            }
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var ce in a)
          (j = a[ce]),
            a.hasOwnProperty(ce) &&
              j != null &&
              !r.hasOwnProperty(ce) &&
              Ae(e, t, ce, null, r, j);
        for (N in r)
          if (
            ((j = r[N]),
            (B = a[N]),
            r.hasOwnProperty(N) && j !== B && (j != null || B != null))
          )
            switch (N) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (j != null) throw Error(o(137, t));
                break;
              default:
                Ae(e, t, N, j, r, B);
            }
        return;
      default:
        if (Sl(t)) {
          for (var Me in a)
            (j = a[Me]),
              a.hasOwnProperty(Me) &&
                j !== void 0 &&
                !r.hasOwnProperty(Me) &&
                au(e, t, Me, void 0, r, j);
          for (H in r)
            (j = r[H]),
              (B = a[H]),
              !r.hasOwnProperty(H) ||
                j === B ||
                (j === void 0 && B === void 0) ||
                au(e, t, H, j, r, B);
          return;
        }
    }
    for (var k in a)
      (j = a[k]),
        a.hasOwnProperty(k) &&
          j != null &&
          !r.hasOwnProperty(k) &&
          Ae(e, t, k, null, r, j);
    for (Q in r)
      (j = r[Q]),
        (B = a[Q]),
        !r.hasOwnProperty(Q) ||
          j === B ||
          (j == null && B == null) ||
          Ae(e, t, Q, j, r, B);
  }
  var su = null,
    iu = null;
  function vo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function _m(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function wm(e, t) {
    if (e === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === 'foreignObject' ? 0 : e;
  }
  function ru(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ou = null;
  function L1() {
    var e = window.event;
    return e && e.type === 'popstate'
      ? e === ou
        ? !1
        : ((ou = e), !0)
      : ((ou = null), !1);
  }
  var Tm = typeof setTimeout == 'function' ? setTimeout : void 0,
    j1 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Em = typeof Promise == 'function' ? Promise : void 0,
    B1 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Em < 'u'
        ? function (e) {
            return Em.resolve(null).then(e).catch(z1);
          }
        : Tm;
  function z1(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Xn(e) {
    return e === 'head';
  }
  function xm(e, t) {
    var a = t,
      r = 0,
      l = 0;
    do {
      var u = a.nextSibling;
      if ((e.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === '/$')) {
          if (0 < r && 8 > r) {
            a = r;
            var y = e.ownerDocument;
            if ((a & 1 && Gi(y.documentElement), a & 2 && Gi(y.body), a & 4))
              for (a = y.head, Gi(a), y = a.firstChild; y; ) {
                var _ = y.nextSibling,
                  x = y.nodeName;
                y[ii] ||
                  x === 'SCRIPT' ||
                  x === 'STYLE' ||
                  (x === 'LINK' && y.rel.toLowerCase() === 'stylesheet') ||
                  a.removeChild(y),
                  (y = _);
              }
          }
          if (l === 0) {
            e.removeChild(u), Zi(t);
            return;
          }
          l--;
        } else
          a === '$' || a === '$?' || a === '$!'
            ? l++
            : (r = a.charCodeAt(0) - 48);
      else r = 0;
      a = u;
    } while (a);
    Zi(t);
  }
  function lu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          lu(a), hl(a);
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (a.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(a);
    }
  }
  function U1(e, t, a, r) {
    for (; e.nodeType === 1; ) {
      var l = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (r) {
        if (!e[ii])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((u = e.getAttribute('rel')),
                u === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                u !== l.rel ||
                e.getAttribute('href') !==
                  (l.href == null || l.href === '' ? null : l.href) ||
                e.getAttribute('crossorigin') !==
                  (l.crossOrigin == null ? null : l.crossOrigin) ||
                e.getAttribute('title') !== (l.title == null ? null : l.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((u = e.getAttribute('src')),
                (u !== (l.src == null ? null : l.src) ||
                  e.getAttribute('type') !== (l.type == null ? null : l.type) ||
                  e.getAttribute('crossorigin') !==
                    (l.crossOrigin == null ? null : l.crossOrigin)) &&
                  u &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var u = l.name == null ? null : '' + l.name;
        if (l.type === 'hidden' && e.getAttribute('name') === u) return e;
      } else return e;
      if (((e = Yt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function I1(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') &&
          !a) ||
        ((e = Yt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function cu(e) {
    return (
      e.data === '$!' ||
      (e.data === '$?' && e.ownerDocument.readyState === 'complete')
    );
  }
  function H1(e, t) {
    var a = e.ownerDocument;
    if (e.data !== '$?' || a.readyState === 'complete') t();
    else {
      var r = function () {
        t(), a.removeEventListener('DOMContentLoaded', r);
      };
      a.addEventListener('DOMContentLoaded', r), (e._reactRetry = r);
    }
  }
  function Yt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === '$' || t === '$!' || t === '$?' || t === 'F!' || t === 'F')
        )
          break;
        if (t === '/$') return null;
      }
    }
    return e;
  }
  var uu = null;
  function Rm(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '$' || a === '$!' || a === '$?') {
          if (t === 0) return e;
          t--;
        } else a === '/$' && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Cm(e, t, a) {
    switch (((t = vo(a)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function Gi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    hl(e);
  }
  var Pt = new Map(),
    Am = new Set();
  function So(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var Tn = V.d;
  V.d = { f: P1, r: q1, D: $1, C: G1, L: V1, m: Q1, X: F1, S: K1, M: Y1 };
  function P1() {
    var e = Tn.f(),
      t = co();
    return e || t;
  }
  function q1(e) {
    var t = Za(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Fh(t) : Tn.r(e);
  }
  var Ds = typeof document > 'u' ? null : document;
  function Mm(e, t, a) {
    var r = Ds;
    if (r && typeof t == 'string' && t) {
      var l = Lt(t);
      (l = 'link[rel="' + e + '"][href="' + l + '"]'),
        typeof a == 'string' && (l += '[crossorigin="' + a + '"]'),
        Am.has(l) ||
          (Am.add(l),
          (e = { rel: e, crossOrigin: a, href: t }),
          r.querySelector(l) === null &&
            ((t = r.createElement('link')),
            at(t, 'link', e),
            Ye(t),
            r.head.appendChild(t)));
    }
  }
  function $1(e) {
    Tn.D(e), Mm('dns-prefetch', e, null);
  }
  function G1(e, t) {
    Tn.C(e, t), Mm('preconnect', e, t);
  }
  function V1(e, t, a) {
    Tn.L(e, t, a);
    var r = Ds;
    if (r && e && t) {
      var l = 'link[rel="preload"][as="' + Lt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((l += '[imagesrcset="' + Lt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' &&
            (l += '[imagesizes="' + Lt(a.imageSizes) + '"]'))
        : (l += '[href="' + Lt(e) + '"]');
      var u = l;
      switch (t) {
        case 'style':
          u = Ns(e);
          break;
        case 'script':
          u = Ls(e);
      }
      Pt.has(u) ||
        ((e = v(
          {
            rel: 'preload',
            href: t === 'image' && a && a.imageSrcSet ? void 0 : e,
            as: t,
          },
          a
        )),
        Pt.set(u, e),
        r.querySelector(l) !== null ||
          (t === 'style' && r.querySelector(Vi(u))) ||
          (t === 'script' && r.querySelector(Qi(u))) ||
          ((t = r.createElement('link')),
          at(t, 'link', e),
          Ye(t),
          r.head.appendChild(t)));
    }
  }
  function Q1(e, t) {
    Tn.m(e, t);
    var a = Ds;
    if (a && e) {
      var r = t && typeof t.as == 'string' ? t.as : 'script',
        l =
          'link[rel="modulepreload"][as="' + Lt(r) + '"][href="' + Lt(e) + '"]',
        u = l;
      switch (r) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          u = Ls(e);
      }
      if (
        !Pt.has(u) &&
        ((e = v({ rel: 'modulepreload', href: e }, t)),
        Pt.set(u, e),
        a.querySelector(l) === null)
      ) {
        switch (r) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Qi(u))) return;
        }
        (r = a.createElement('link')),
          at(r, 'link', e),
          Ye(r),
          a.head.appendChild(r);
      }
    }
  }
  function K1(e, t, a) {
    Tn.S(e, t, a);
    var r = Ds;
    if (r && e) {
      var l = Ja(r).hoistableStyles,
        u = Ns(e);
      t = t || 'default';
      var y = l.get(u);
      if (!y) {
        var _ = { loading: 0, preload: null };
        if ((y = r.querySelector(Vi(u)))) _.loading = 5;
        else {
          (e = v({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Pt.get(u)) && fu(e, a);
          var x = (y = r.createElement('link'));
          Ye(x),
            at(x, 'link', e),
            (x._p = new Promise(function (N, H) {
              (x.onload = N), (x.onerror = H);
            })),
            x.addEventListener('load', function () {
              _.loading |= 1;
            }),
            x.addEventListener('error', function () {
              _.loading |= 2;
            }),
            (_.loading |= 4),
            bo(y, t, r);
        }
        (y = { type: 'stylesheet', instance: y, count: 1, state: _ }),
          l.set(u, y);
      }
    }
  }
  function F1(e, t) {
    Tn.X(e, t);
    var a = Ds;
    if (a && e) {
      var r = Ja(a).hoistableScripts,
        l = Ls(e),
        u = r.get(l);
      u ||
        ((u = a.querySelector(Qi(l))),
        u ||
          ((e = v({ src: e, async: !0 }, t)),
          (t = Pt.get(l)) && du(e, t),
          (u = a.createElement('script')),
          Ye(u),
          at(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        r.set(l, u));
    }
  }
  function Y1(e, t) {
    Tn.M(e, t);
    var a = Ds;
    if (a && e) {
      var r = Ja(a).hoistableScripts,
        l = Ls(e),
        u = r.get(l);
      u ||
        ((u = a.querySelector(Qi(l))),
        u ||
          ((e = v({ src: e, async: !0, type: 'module' }, t)),
          (t = Pt.get(l)) && du(e, t),
          (u = a.createElement('script')),
          Ye(u),
          at(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        r.set(l, u));
    }
  }
  function Om(e, t, a, r) {
    var l = (l = le.current) ? So(l) : null;
    if (!l) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = Ns(a.href)),
            (a = Ja(l).hoistableStyles),
            (r = a.get(t)),
            r ||
              ((r = { type: 'style', instance: null, count: 0, state: null }),
              a.set(t, r)),
            r)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          e = Ns(a.href);
          var u = Ja(l).hoistableStyles,
            y = u.get(e);
          if (
            (y ||
              ((l = l.ownerDocument || l),
              (y = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, y),
              (u = l.querySelector(Vi(e))) &&
                !u._p &&
                ((y.instance = u), (y.state.loading = 5)),
              Pt.has(e) ||
                ((a = {
                  rel: 'preload',
                  as: 'style',
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Pt.set(e, a),
                u || X1(l, e, a, y.state))),
            t && r === null)
          )
            throw Error(o(528, ''));
          return y;
        }
        if (t && r !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' &&
          t &&
          typeof t != 'function' &&
          typeof t != 'symbol'
            ? ((t = Ls(a)),
              (a = Ja(l).hoistableScripts),
              (r = a.get(t)),
              r ||
                ((r = {
                  type: 'script',
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, r)),
              r)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Ns(e) {
    return 'href="' + Lt(e) + '"';
  }
  function Vi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function km(e) {
    return v({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function X1(e, t, a, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (r.loading = 1)
      : ((t = e.createElement('link')),
        (r.preload = t),
        t.addEventListener('load', function () {
          return (r.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (r.loading |= 2);
        }),
        at(t, 'link', a),
        Ye(t),
        e.head.appendChild(t));
  }
  function Ls(e) {
    return '[src="' + Lt(e) + '"]';
  }
  function Qi(e) {
    return 'script[async]' + e;
  }
  function Dm(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var r = e.querySelector('style[data-href~="' + Lt(a.href) + '"]');
          if (r) return (t.instance = r), Ye(r), r;
          var l = v({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (r = (e.ownerDocument || e).createElement('style')),
            Ye(r),
            at(r, 'style', l),
            bo(r, a.precedence, e),
            (t.instance = r)
          );
        case 'stylesheet':
          l = Ns(a.href);
          var u = e.querySelector(Vi(l));
          if (u) return (t.state.loading |= 4), (t.instance = u), Ye(u), u;
          (r = km(a)),
            (l = Pt.get(l)) && fu(r, l),
            (u = (e.ownerDocument || e).createElement('link')),
            Ye(u);
          var y = u;
          return (
            (y._p = new Promise(function (_, x) {
              (y.onload = _), (y.onerror = x);
            })),
            at(u, 'link', r),
            (t.state.loading |= 4),
            bo(u, a.precedence, e),
            (t.instance = u)
          );
        case 'script':
          return (
            (u = Ls(a.src)),
            (l = e.querySelector(Qi(u)))
              ? ((t.instance = l), Ye(l), l)
              : ((r = a),
                (l = Pt.get(u)) && ((r = v({}, a)), du(r, l)),
                (e = e.ownerDocument || e),
                (l = e.createElement('script')),
                Ye(l),
                at(l, 'link', r),
                e.head.appendChild(l),
                (t.instance = l))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((r = t.instance), (t.state.loading |= 4), bo(r, a.precedence, e));
    return t.instance;
  }
  function bo(e, t, a) {
    for (
      var r = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        l = r.length ? r[r.length - 1] : null,
        u = l,
        y = 0;
      y < r.length;
      y++
    ) {
      var _ = r[y];
      if (_.dataset.precedence === t) u = _;
      else if (u !== l) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function fu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function du(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var _o = null;
  function Nm(e, t, a) {
    if (_o === null) {
      var r = new Map(),
        l = (_o = new Map());
      l.set(a, r);
    } else (l = _o), (r = l.get(a)), r || ((r = new Map()), l.set(a, r));
    if (r.has(e)) return r;
    for (
      r.set(e, null), a = a.getElementsByTagName(e), l = 0;
      l < a.length;
      l++
    ) {
      var u = a[l];
      if (
        !(
          u[ii] ||
          u[st] ||
          (e === 'link' && u.getAttribute('rel') === 'stylesheet')
        ) &&
        u.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var y = u.getAttribute(t) || '';
        y = e + y;
        var _ = r.get(y);
        _ ? _.push(u) : r.set(y, [u]);
      }
    }
    return r;
  }
  function Lm(e, t, a) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        a,
        t === 'title' ? e.querySelector('head > title') : null
      );
  }
  function W1(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (
          typeof t.precedence != 'string' ||
          typeof t.href != 'string' ||
          t.href === ''
        )
          break;
        return !0;
      case 'link':
        if (
          typeof t.rel != 'string' ||
          typeof t.href != 'string' ||
          t.href === '' ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case 'stylesheet':
            return (
              (e = t.disabled), typeof t.precedence == 'string' && e == null
            );
          default:
            return !0;
        }
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function jm(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  var Ki = null;
  function Z1() {}
  function J1(e, t, a) {
    if (Ki === null) throw Error(o(475));
    var r = Ki;
    if (
      t.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var l = Ns(a.href),
          u = e.querySelector(Vi(l));
        if (u) {
          (e = u._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (r.count++, (r = wo.bind(r)), e.then(r, r)),
            (t.state.loading |= 4),
            (t.instance = u),
            Ye(u);
          return;
        }
        (u = e.ownerDocument || e),
          (a = km(a)),
          (l = Pt.get(l)) && fu(a, l),
          (u = u.createElement('link')),
          Ye(u);
        var y = u;
        (y._p = new Promise(function (_, x) {
          (y.onload = _), (y.onerror = x);
        })),
          at(u, 'link', a),
          (t.instance = u);
      }
      r.stylesheets === null && (r.stylesheets = new Map()),
        r.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (r.count++,
          (t = wo.bind(r)),
          e.addEventListener('load', t),
          e.addEventListener('error', t));
    }
  }
  function eS() {
    if (Ki === null) throw Error(o(475));
    var e = Ki;
    return (
      e.stylesheets && e.count === 0 && hu(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var a = setTimeout(function () {
              if ((e.stylesheets && hu(e, e.stylesheets), e.unsuspend)) {
                var r = e.unsuspend;
                (e.unsuspend = null), r();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(a);
              }
            );
          }
        : null
    );
  }
  function wo() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) hu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var To = null;
  function hu(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (To = new Map()),
        t.forEach(tS, e),
        (To = null),
        wo.call(e));
  }
  function tS(e, t) {
    if (!(t.state.loading & 4)) {
      var a = To.get(e);
      if (a) var r = a.get(null);
      else {
        (a = new Map()), To.set(e, a);
        for (
          var l = e.querySelectorAll(
              'link[data-precedence],style[data-precedence]'
            ),
            u = 0;
          u < l.length;
          u++
        ) {
          var y = l[u];
          (y.nodeName === 'LINK' || y.getAttribute('media') !== 'not all') &&
            (a.set(y.dataset.precedence, y), (r = y));
        }
        r && a.set(null, r);
      }
      (l = t.instance),
        (y = l.getAttribute('data-precedence')),
        (u = a.get(y) || r),
        u === r && a.set(null, l),
        a.set(y, l),
        this.count++,
        (r = wo.bind(this)),
        l.addEventListener('load', r),
        l.addEventListener('error', r),
        u
          ? u.parentNode.insertBefore(l, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(l, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Fi = {
    $$typeof: U,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function nS(e, t, a, r, l, u, y, _) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = cl(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = cl(0)),
      (this.hiddenUpdates = cl(null)),
      (this.identifierPrefix = r),
      (this.onUncaughtError = l),
      (this.onCaughtError = u),
      (this.onRecoverableError = y),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = _),
      (this.incompleteTransitions = new Map());
  }
  function Bm(e, t, a, r, l, u, y, _, x, N, H, Q) {
    return (
      (e = new nS(e, t, a, y, _, x, N, Q)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = Tt(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Fl()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: r, isDehydrated: a, cache: t }),
      Zl(u),
      e
    );
  }
  function zm(e) {
    return e ? ((e = fs), e) : fs;
  }
  function Um(e, t, a, r, l, u) {
    (l = zm(l)),
      r.context === null ? (r.context = l) : (r.pendingContext = l),
      (r = zn(t)),
      (r.payload = { element: a }),
      (u = u === void 0 ? null : u),
      u !== null && (r.callback = u),
      (a = Un(e, r, t)),
      a !== null && (At(a, e, t), Ei(a, e, t));
  }
  function Im(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function gu(e, t) {
    Im(e, t), (e = e.alternate) && Im(e, t);
  }
  function Hm(e) {
    if (e.tag === 13) {
      var t = us(e, 67108864);
      t !== null && At(t, e, 67108864), gu(e, 67108864);
    }
  }
  var Eo = !0;
  function aS(e, t, a, r) {
    var l = C.T;
    C.T = null;
    var u = V.p;
    try {
      (V.p = 2), mu(e, t, a, r);
    } finally {
      (V.p = u), (C.T = l);
    }
  }
  function sS(e, t, a, r) {
    var l = C.T;
    C.T = null;
    var u = V.p;
    try {
      (V.p = 8), mu(e, t, a, r);
    } finally {
      (V.p = u), (C.T = l);
    }
  }
  function mu(e, t, a, r) {
    if (Eo) {
      var l = pu(r);
      if (l === null) nu(e, t, r, xo, a), qm(e, r);
      else if (rS(l, e, t, a, r)) r.stopPropagation();
      else if ((qm(e, r), t & 4 && -1 < iS.indexOf(e))) {
        for (; l !== null; ) {
          var u = Za(l);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var y = pa(u.pendingLanes);
                  if (y !== 0) {
                    var _ = u;
                    for (_.pendingLanes |= 2, _.entangledLanes |= 2; y; ) {
                      var x = 1 << (31 - _t(y));
                      (_.entanglements[1] |= x), (y &= ~x);
                    }
                    tn(u), (xe & 6) === 0 && ((oo = Dt() + 500), Pi(0));
                  }
                }
                break;
              case 13:
                (_ = us(u, 2)), _ !== null && At(_, u, 2), co(), gu(u, 2);
            }
          if (((u = pu(r)), u === null && nu(e, t, r, xo, a), u === l)) break;
          l = u;
        }
        l !== null && r.stopPropagation();
      } else nu(e, t, r, null, a);
    }
  }
  function pu(e) {
    return (e = _l(e)), yu(e);
  }
  var xo = null;
  function yu(e) {
    if (((xo = null), (e = Wa(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (xo = e), null;
  }
  function Pm(e) {
    switch (e) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (Ya()) {
          case ga:
            return 2;
          case ti:
            return 8;
          case ma:
          case Ne:
            return 32;
          case et:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var vu = !1,
    Wn = null,
    Zn = null,
    Jn = null,
    Yi = new Map(),
    Xi = new Map(),
    ea = [],
    iS =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function qm(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Wn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Zn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Jn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Yi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Xi.delete(t.pointerId);
    }
  }
  function Wi(e, t, a, r, l, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: r,
          nativeEvent: u,
          targetContainers: [l],
        }),
        t !== null && ((t = Za(t)), t !== null && Hm(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function rS(e, t, a, r, l) {
    switch (t) {
      case 'focusin':
        return (Wn = Wi(Wn, e, t, a, r, l)), !0;
      case 'dragenter':
        return (Zn = Wi(Zn, e, t, a, r, l)), !0;
      case 'mouseover':
        return (Jn = Wi(Jn, e, t, a, r, l)), !0;
      case 'pointerover':
        var u = l.pointerId;
        return Yi.set(u, Wi(Yi.get(u) || null, e, t, a, r, l)), !0;
      case 'gotpointercapture':
        return (
          (u = l.pointerId), Xi.set(u, Wi(Xi.get(u) || null, e, t, a, r, l)), !0
        );
    }
    return !1;
  }
  function $m(e) {
    var t = Wa(e.target);
    if (t !== null) {
      var a = f(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = h(a)), t !== null)) {
            (e.blockedOn = t),
              Jv(e.priority, function () {
                if (a.tag === 13) {
                  var r = Ct();
                  r = ul(r);
                  var l = us(a, r);
                  l !== null && At(l, a, r), gu(a, r);
                }
              });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ro(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = pu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var r = new a.constructor(a.type, a);
        (bl = r), a.target.dispatchEvent(r), (bl = null);
      } else return (t = Za(a)), t !== null && Hm(t), (e.blockedOn = a), !1;
      t.shift();
    }
    return !0;
  }
  function Gm(e, t, a) {
    Ro(e) && a.delete(t);
  }
  function oS() {
    (vu = !1),
      Wn !== null && Ro(Wn) && (Wn = null),
      Zn !== null && Ro(Zn) && (Zn = null),
      Jn !== null && Ro(Jn) && (Jn = null),
      Yi.forEach(Gm),
      Xi.forEach(Gm);
  }
  function Co(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      vu ||
        ((vu = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, oS)));
  }
  var Ao = null;
  function Vm(e) {
    Ao !== e &&
      ((Ao = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Ao === e && (Ao = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            r = e[t + 1],
            l = e[t + 2];
          if (typeof r != 'function') {
            if (yu(r || a) === null) continue;
            break;
          }
          var u = Za(a);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            yc(u, { pending: !0, data: l, method: a.method, action: r }, r, l));
        }
      }));
  }
  function Zi(e) {
    function t(x) {
      return Co(x, e);
    }
    Wn !== null && Co(Wn, e),
      Zn !== null && Co(Zn, e),
      Jn !== null && Co(Jn, e),
      Yi.forEach(t),
      Xi.forEach(t);
    for (var a = 0; a < ea.length; a++) {
      var r = ea[a];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < ea.length && ((a = ea[0]), a.blockedOn === null); )
      $m(a), a.blockedOn === null && ea.shift();
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (r = 0; r < a.length; r += 3) {
        var l = a[r],
          u = a[r + 1],
          y = l[ft] || null;
        if (typeof u == 'function') y || Vm(a);
        else if (y) {
          var _ = null;
          if (u && u.hasAttribute('formAction')) {
            if (((l = u), (y = u[ft] || null))) _ = y.formAction;
            else if (yu(l) !== null) continue;
          } else _ = y.action;
          typeof _ == 'function' ? (a[r + 1] = _) : (a.splice(r, 3), (r -= 3)),
            Vm(a);
        }
      }
  }
  function Su(e) {
    this._internalRoot = e;
  }
  (Mo.prototype.render = Su.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        r = Ct();
      Um(a, r, e, t, null, null);
    }),
    (Mo.prototype.unmount = Su.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          Um(e.current, 2, null, e, null, null), co(), (t[Xa] = null);
        }
      });
  function Mo(e) {
    this._internalRoot = e;
  }
  Mo.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ld();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ea.length && t !== 0 && t < ea[a].priority; a++);
      ea.splice(a, 0, e), a === 0 && $m(e);
    }
  };
  var Qm = s.version;
  if (Qm !== '19.1.1') throw Error(o(527, Qm, '19.1.1'));
  V.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return (
      (e = g(t)),
      (e = e !== null ? d(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var lS = {
    bundleType: 0,
    version: '19.1.1',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: C,
    reconcilerVersion: '19.1.1',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Oo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Oo.isDisabled && Oo.supportsFiber)
      try {
        (ni = Oo.inject(lS)), (bt = Oo);
      } catch {}
  }
  return (
    (er.createRoot = function (e, t) {
      if (!c(e)) throw Error(o(299));
      var a = !1,
        r = '',
        l = lg,
        u = cg,
        y = ug,
        _ = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (l = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (y = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (_ = t.unstable_transitionCallbacks)),
        (t = Bm(e, 1, !1, null, null, a, r, l, u, y, _, null)),
        (e[Xa] = t.current),
        tu(e),
        new Su(t)
      );
    }),
    (er.hydrateRoot = function (e, t, a) {
      if (!c(e)) throw Error(o(299));
      var r = !1,
        l = '',
        u = lg,
        y = cg,
        _ = ug,
        x = null,
        N = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (r = !0),
          a.identifierPrefix !== void 0 && (l = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
          a.onCaughtError !== void 0 && (y = a.onCaughtError),
          a.onRecoverableError !== void 0 && (_ = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 &&
            (x = a.unstable_transitionCallbacks),
          a.formState !== void 0 && (N = a.formState)),
        (t = Bm(e, 1, !0, t, a ?? null, r, l, u, y, _, x, N)),
        (t.context = zm(null)),
        (a = t.current),
        (r = Ct()),
        (r = ul(r)),
        (l = zn(r)),
        (l.callback = null),
        Un(a, l, r),
        (a = r),
        (t.current.lanes = a),
        si(t, a),
        tn(t),
        (e[Xa] = t.current),
        tu(e),
        new Mo(t)
      );
    }),
    (er.version = '19.1.1'),
    er
  );
}
var np;
function yS() {
  if (np) return wu.exports;
  np = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (s) {
        console.error(s);
      }
  }
  return n(), (wu.exports = pS()), wu.exports;
}
var vS = yS(),
  Xs = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(n) {
      return (
        this.listeners.add(n),
        this.onSubscribe(),
        () => {
          this.listeners.delete(n), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Ha = typeof window > 'u' || 'Deno' in globalThis;
function ut() {}
function SS(n, s) {
  return typeof n == 'function' ? n(s) : n;
}
function uf(n) {
  return typeof n == 'number' && n >= 0 && n !== 1 / 0;
}
function Ay(n, s) {
  return Math.max(n + (s || 0) - Date.now(), 0);
}
function ra(n, s) {
  return typeof n == 'function' ? n(s) : n;
}
function $t(n, s) {
  return typeof n == 'function' ? n(s) : n;
}
function ap(n, s) {
  const {
    type: i = 'all',
    exact: o,
    fetchStatus: c,
    predicate: f,
    queryKey: h,
    stale: m,
  } = n;
  if (h) {
    if (o) {
      if (s.queryHash !== Of(h, s.options)) return !1;
    } else if (!ur(s.queryKey, h)) return !1;
  }
  if (i !== 'all') {
    const g = s.isActive();
    if ((i === 'active' && !g) || (i === 'inactive' && g)) return !1;
  }
  return !(
    (typeof m == 'boolean' && s.isStale() !== m) ||
    (c && c !== s.state.fetchStatus) ||
    (f && !f(s))
  );
}
function sp(n, s) {
  const { exact: i, status: o, predicate: c, mutationKey: f } = n;
  if (f) {
    if (!s.options.mutationKey) return !1;
    if (i) {
      if (Pa(s.options.mutationKey) !== Pa(f)) return !1;
    } else if (!ur(s.options.mutationKey, f)) return !1;
  }
  return !((o && s.state.status !== o) || (c && !c(s)));
}
function Of(n, s) {
  return (s?.queryKeyHashFn || Pa)(n);
}
function Pa(n) {
  return JSON.stringify(n, (s, i) =>
    ff(i)
      ? Object.keys(i)
          .sort()
          .reduce((o, c) => ((o[c] = i[c]), o), {})
      : i
  );
}
function ur(n, s) {
  return n === s
    ? !0
    : typeof n != typeof s
    ? !1
    : n && s && typeof n == 'object' && typeof s == 'object'
    ? Object.keys(s).every((i) => ur(n[i], s[i]))
    : !1;
}
function My(n, s) {
  if (n === s) return n;
  const i = ip(n) && ip(s);
  if (i || (ff(n) && ff(s))) {
    const o = i ? n : Object.keys(n),
      c = o.length,
      f = i ? s : Object.keys(s),
      h = f.length,
      m = i ? [] : {},
      g = new Set(o);
    let d = 0;
    for (let v = 0; v < h; v++) {
      const p = i ? v : f[v];
      ((!i && g.has(p)) || i) && n[p] === void 0 && s[p] === void 0
        ? ((m[p] = void 0), d++)
        : ((m[p] = My(n[p], s[p])), m[p] === n[p] && n[p] !== void 0 && d++);
    }
    return c === h && d === c ? n : m;
  }
  return s;
}
function qo(n, s) {
  if (!s || Object.keys(n).length !== Object.keys(s).length) return !1;
  for (const i in n) if (n[i] !== s[i]) return !1;
  return !0;
}
function ip(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function ff(n) {
  if (!rp(n)) return !1;
  const s = n.constructor;
  if (s === void 0) return !0;
  const i = s.prototype;
  return !(
    !rp(i) ||
    !i.hasOwnProperty('isPrototypeOf') ||
    Object.getPrototypeOf(n) !== Object.prototype
  );
}
function rp(n) {
  return Object.prototype.toString.call(n) === '[object Object]';
}
function bS(n) {
  return new Promise((s) => {
    setTimeout(s, n);
  });
}
function df(n, s, i) {
  return typeof i.structuralSharing == 'function'
    ? i.structuralSharing(n, s)
    : i.structuralSharing !== !1
    ? My(n, s)
    : s;
}
function _S(n, s, i = 0) {
  const o = [...n, s];
  return i && o.length > i ? o.slice(1) : o;
}
function wS(n, s, i = 0) {
  const o = [s, ...n];
  return i && o.length > i ? o.slice(0, -1) : o;
}
var kf = Symbol();
function Oy(n, s) {
  return !n.queryFn && s?.initialPromise
    ? () => s.initialPromise
    : !n.queryFn || n.queryFn === kf
    ? () => Promise.reject(new Error(`Missing queryFn: '${n.queryHash}'`))
    : n.queryFn;
}
function ky(n, s) {
  return typeof n == 'function' ? n(...s) : !!n;
}
var TS = class extends Xs {
    #t;
    #e;
    #n;
    constructor() {
      super(),
        (this.#n = (n) => {
          if (!Ha && window.addEventListener) {
            const s = () => n();
            return (
              window.addEventListener('visibilitychange', s, !1),
              () => {
                window.removeEventListener('visibilitychange', s);
              }
            );
          }
        });
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(n) {
      (this.#n = n),
        this.#e?.(),
        (this.#e = n((s) => {
          typeof s == 'boolean' ? this.setFocused(s) : this.onFocus();
        }));
    }
    setFocused(n) {
      this.#t !== n && ((this.#t = n), this.onFocus());
    }
    onFocus() {
      const n = this.isFocused();
      this.listeners.forEach((s) => {
        s(n);
      });
    }
    isFocused() {
      return typeof this.#t == 'boolean'
        ? this.#t
        : globalThis.document?.visibilityState !== 'hidden';
    }
  },
  Df = new TS(),
  ES = class extends Xs {
    #t = !0;
    #e;
    #n;
    constructor() {
      super(),
        (this.#n = (n) => {
          if (!Ha && window.addEventListener) {
            const s = () => n(!0),
              i = () => n(!1);
            return (
              window.addEventListener('online', s, !1),
              window.addEventListener('offline', i, !1),
              () => {
                window.removeEventListener('online', s),
                  window.removeEventListener('offline', i);
              }
            );
          }
        });
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(n) {
      (this.#n = n), this.#e?.(), (this.#e = n(this.setOnline.bind(this)));
    }
    setOnline(n) {
      this.#t !== n &&
        ((this.#t = n),
        this.listeners.forEach((i) => {
          i(n);
        }));
    }
    isOnline() {
      return this.#t;
    }
  },
  $o = new ES();
function hf() {
  let n, s;
  const i = new Promise((c, f) => {
    (n = c), (s = f);
  });
  (i.status = 'pending'), i.catch(() => {});
  function o(c) {
    Object.assign(i, c), delete i.resolve, delete i.reject;
  }
  return (
    (i.resolve = (c) => {
      o({ status: 'fulfilled', value: c }), n(c);
    }),
    (i.reject = (c) => {
      o({ status: 'rejected', reason: c }), s(c);
    }),
    i
  );
}
function xS(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function Dy(n) {
  return (n ?? 'online') === 'online' ? $o.isOnline() : !0;
}
var Ny = class extends Error {
  constructor(n) {
    super('CancelledError'),
      (this.revert = n?.revert),
      (this.silent = n?.silent);
  }
};
function Ly(n) {
  let s = !1,
    i = 0,
    o;
  const c = hf(),
    f = () => c.status !== 'pending',
    h = (E) => {
      f() || (b(new Ny(E)), n.abort?.());
    },
    m = () => {
      s = !0;
    },
    g = () => {
      s = !1;
    },
    d = () =>
      Df.isFocused() &&
      (n.networkMode === 'always' || $o.isOnline()) &&
      n.canRun(),
    v = () => Dy(n.networkMode) && n.canRun(),
    p = (E) => {
      f() || (o?.(), c.resolve(E));
    },
    b = (E) => {
      f() || (o?.(), c.reject(E));
    },
    T = () =>
      new Promise((E) => {
        (o = (M) => {
          (f() || d()) && E(M);
        }),
          n.onPause?.();
      }).then(() => {
        (o = void 0), f() || n.onContinue?.();
      }),
    w = () => {
      if (f()) return;
      let E;
      const M = i === 0 ? n.initialPromise : void 0;
      try {
        E = M ?? n.fn();
      } catch (O) {
        E = Promise.reject(O);
      }
      Promise.resolve(E)
        .then(p)
        .catch((O) => {
          if (f()) return;
          const L = n.retry ?? (Ha ? 0 : 3),
            U = n.retryDelay ?? xS,
            G = typeof U == 'function' ? U(i, O) : U,
            I =
              L === !0 ||
              (typeof L == 'number' && i < L) ||
              (typeof L == 'function' && L(i, O));
          if (s || !I) {
            b(O);
            return;
          }
          i++,
            n.onFail?.(i, O),
            bS(G)
              .then(() => (d() ? void 0 : T()))
              .then(() => {
                s ? b(O) : w();
              });
        });
    };
  return {
    promise: c,
    status: () => c.status,
    cancel: h,
    continue: () => (o?.(), c),
    cancelRetry: m,
    continueRetry: g,
    canStart: v,
    start: () => (v() ? w() : T().then(w), c),
  };
}
var RS = (n) => setTimeout(n, 0);
function CS() {
  let n = [],
    s = 0,
    i = (m) => {
      m();
    },
    o = (m) => {
      m();
    },
    c = RS;
  const f = (m) => {
      s
        ? n.push(m)
        : c(() => {
            i(m);
          });
    },
    h = () => {
      const m = n;
      (n = []),
        m.length &&
          c(() => {
            o(() => {
              m.forEach((g) => {
                i(g);
              });
            });
          });
    };
  return {
    batch: (m) => {
      let g;
      s++;
      try {
        g = m();
      } finally {
        s--, s || h();
      }
      return g;
    },
    batchCalls:
      (m) =>
      (...g) => {
        f(() => {
          m(...g);
        });
      },
    schedule: f,
    setNotifyFunction: (m) => {
      i = m;
    },
    setBatchNotifyFunction: (m) => {
      o = m;
    },
    setScheduler: (m) => {
      c = m;
    },
  };
}
var Fe = CS(),
  jy = class {
    #t;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      this.clearGcTimeout(),
        uf(this.gcTime) &&
          (this.#t = setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime));
    }
    updateGcTime(n) {
      this.gcTime = Math.max(this.gcTime || 0, n ?? (Ha ? 1 / 0 : 300 * 1e3));
    }
    clearGcTimeout() {
      this.#t && (clearTimeout(this.#t), (this.#t = void 0));
    }
  },
  AS = class extends jy {
    #t;
    #e;
    #n;
    #a;
    #s;
    #r;
    #o;
    constructor(n) {
      super(),
        (this.#o = !1),
        (this.#r = n.defaultOptions),
        this.setOptions(n.options),
        (this.observers = []),
        (this.#a = n.client),
        (this.#n = this.#a.getQueryCache()),
        (this.queryKey = n.queryKey),
        (this.queryHash = n.queryHash),
        (this.#t = MS(this.options)),
        (this.state = n.state ?? this.#t),
        this.scheduleGc();
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#s?.promise;
    }
    setOptions(n) {
      (this.options = { ...this.#r, ...n }),
        this.updateGcTime(this.options.gcTime);
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === 'idle' &&
        this.#n.remove(this);
    }
    setData(n, s) {
      const i = df(this.state.data, n, this.options);
      return (
        this.#i({
          data: i,
          type: 'success',
          dataUpdatedAt: s?.updatedAt,
          manual: s?.manual,
        }),
        i
      );
    }
    setState(n, s) {
      this.#i({ type: 'setState', state: n, setStateOptions: s });
    }
    cancel(n) {
      const s = this.#s?.promise;
      return this.#s?.cancel(n), s ? s.then(ut).catch(ut) : Promise.resolve();
    }
    destroy() {
      super.destroy(), this.cancel({ silent: !0 });
    }
    reset() {
      this.destroy(), this.setState(this.#t);
    }
    isActive() {
      return this.observers.some((n) => $t(n.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === kf ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      return this.getObserversCount() > 0
        ? this.observers.some((n) => ra(n.options.staleTime, this) === 'static')
        : !1;
    }
    isStale() {
      return this.getObserversCount() > 0
        ? this.observers.some((n) => n.getCurrentResult().isStale)
        : this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(n = 0) {
      return this.state.data === void 0
        ? !0
        : n === 'static'
        ? !1
        : this.state.isInvalidated
        ? !0
        : !Ay(this.state.dataUpdatedAt, n);
    }
    onFocus() {
      this.observers
        .find((s) => s.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#s?.continue();
    }
    onOnline() {
      this.observers
        .find((s) => s.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#s?.continue();
    }
    addObserver(n) {
      this.observers.includes(n) ||
        (this.observers.push(n),
        this.clearGcTimeout(),
        this.#n.notify({ type: 'observerAdded', query: this, observer: n }));
    }
    removeObserver(n) {
      this.observers.includes(n) &&
        ((this.observers = this.observers.filter((s) => s !== n)),
        this.observers.length ||
          (this.#s &&
            (this.#o ? this.#s.cancel({ revert: !0 }) : this.#s.cancelRetry()),
          this.scheduleGc()),
        this.#n.notify({ type: 'observerRemoved', query: this, observer: n }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#i({ type: 'invalidate' });
    }
    async fetch(n, s) {
      if (
        this.state.fetchStatus !== 'idle' &&
        this.#s?.status() !== 'rejected'
      ) {
        if (this.state.data !== void 0 && s?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#s) return this.#s.continueRetry(), this.#s.promise;
      }
      if ((n && this.setOptions(n), !this.options.queryFn)) {
        const m = this.observers.find((g) => g.options.queryFn);
        m && this.setOptions(m.options);
      }
      const i = new AbortController(),
        o = (m) => {
          Object.defineProperty(m, 'signal', {
            enumerable: !0,
            get: () => ((this.#o = !0), i.signal),
          });
        },
        c = () => {
          const m = Oy(this.options, s),
            d = (() => {
              const v = {
                client: this.#a,
                queryKey: this.queryKey,
                meta: this.meta,
              };
              return o(v), v;
            })();
          return (
            (this.#o = !1),
            this.options.persister ? this.options.persister(m, d, this) : m(d)
          );
        },
        h = (() => {
          const m = {
            fetchOptions: s,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#a,
            state: this.state,
            fetchFn: c,
          };
          return o(m), m;
        })();
      this.options.behavior?.onFetch(h, this),
        (this.#e = this.state),
        (this.state.fetchStatus === 'idle' ||
          this.state.fetchMeta !== h.fetchOptions?.meta) &&
          this.#i({ type: 'fetch', meta: h.fetchOptions?.meta }),
        (this.#s = Ly({
          initialPromise: s?.initialPromise,
          fn: h.fetchFn,
          abort: i.abort.bind(i),
          onFail: (m, g) => {
            this.#i({ type: 'failed', failureCount: m, error: g });
          },
          onPause: () => {
            this.#i({ type: 'pause' });
          },
          onContinue: () => {
            this.#i({ type: 'continue' });
          },
          retry: h.options.retry,
          retryDelay: h.options.retryDelay,
          networkMode: h.options.networkMode,
          canRun: () => !0,
        }));
      try {
        const m = await this.#s.start();
        if (m === void 0)
          throw new Error(`${this.queryHash} data is undefined`);
        return (
          this.setData(m),
          this.#n.config.onSuccess?.(m, this),
          this.#n.config.onSettled?.(m, this.state.error, this),
          m
        );
      } catch (m) {
        if (m instanceof Ny) {
          if (m.silent) return this.#s.promise;
          if (m.revert)
            return (
              this.setState({ ...this.#e, fetchStatus: 'idle' }),
              this.state.data
            );
        }
        throw (
          (this.#i({ type: 'error', error: m }),
          this.#n.config.onError?.(m, this),
          this.#n.config.onSettled?.(this.state.data, m, this),
          m)
        );
      } finally {
        this.scheduleGc();
      }
    }
    #i(n) {
      const s = (i) => {
        switch (n.type) {
          case 'failed':
            return {
              ...i,
              fetchFailureCount: n.failureCount,
              fetchFailureReason: n.error,
            };
          case 'pause':
            return { ...i, fetchStatus: 'paused' };
          case 'continue':
            return { ...i, fetchStatus: 'fetching' };
          case 'fetch':
            return {
              ...i,
              ...By(i.data, this.options),
              fetchMeta: n.meta ?? null,
            };
          case 'success':
            const o = {
              ...i,
              data: n.data,
              dataUpdateCount: i.dataUpdateCount + 1,
              dataUpdatedAt: n.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: 'success',
              ...(!n.manual && {
                fetchStatus: 'idle',
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return (this.#e = n.manual ? o : void 0), o;
          case 'error':
            const c = n.error;
            return {
              ...i,
              error: c,
              errorUpdateCount: i.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: i.fetchFailureCount + 1,
              fetchFailureReason: c,
              fetchStatus: 'idle',
              status: 'error',
            };
          case 'invalidate':
            return { ...i, isInvalidated: !0 };
          case 'setState':
            return { ...i, ...n.state };
        }
      };
      (this.state = s(this.state)),
        Fe.batch(() => {
          this.observers.forEach((i) => {
            i.onQueryUpdate();
          }),
            this.#n.notify({ query: this, type: 'updated', action: n });
        });
    }
  };
function By(n, s) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Dy(s.networkMode) ? 'fetching' : 'paused',
    ...(n === void 0 && { error: null, status: 'pending' }),
  };
}
function MS(n) {
  const s =
      typeof n.initialData == 'function' ? n.initialData() : n.initialData,
    i = s !== void 0,
    o = i
      ? typeof n.initialDataUpdatedAt == 'function'
        ? n.initialDataUpdatedAt()
        : n.initialDataUpdatedAt
      : 0;
  return {
    data: s,
    dataUpdateCount: 0,
    dataUpdatedAt: i ? o ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: i ? 'success' : 'pending',
    fetchStatus: 'idle',
  };
}
var OS = class extends Xs {
    constructor(n = {}) {
      super(), (this.config = n), (this.#t = new Map());
    }
    #t;
    build(n, s, i) {
      const o = s.queryKey,
        c = s.queryHash ?? Of(o, s);
      let f = this.get(c);
      return (
        f ||
          ((f = new AS({
            client: n,
            queryKey: o,
            queryHash: c,
            options: n.defaultQueryOptions(s),
            state: i,
            defaultOptions: n.getQueryDefaults(o),
          })),
          this.add(f)),
        f
      );
    }
    add(n) {
      this.#t.has(n.queryHash) ||
        (this.#t.set(n.queryHash, n), this.notify({ type: 'added', query: n }));
    }
    remove(n) {
      const s = this.#t.get(n.queryHash);
      s &&
        (n.destroy(),
        s === n && this.#t.delete(n.queryHash),
        this.notify({ type: 'removed', query: n }));
    }
    clear() {
      Fe.batch(() => {
        this.getAll().forEach((n) => {
          this.remove(n);
        });
      });
    }
    get(n) {
      return this.#t.get(n);
    }
    getAll() {
      return [...this.#t.values()];
    }
    find(n) {
      const s = { exact: !0, ...n };
      return this.getAll().find((i) => ap(s, i));
    }
    findAll(n = {}) {
      const s = this.getAll();
      return Object.keys(n).length > 0 ? s.filter((i) => ap(n, i)) : s;
    }
    notify(n) {
      Fe.batch(() => {
        this.listeners.forEach((s) => {
          s(n);
        });
      });
    }
    onFocus() {
      Fe.batch(() => {
        this.getAll().forEach((n) => {
          n.onFocus();
        });
      });
    }
    onOnline() {
      Fe.batch(() => {
        this.getAll().forEach((n) => {
          n.onOnline();
        });
      });
    }
  },
  kS = class extends jy {
    #t;
    #e;
    #n;
    constructor(n) {
      super(),
        (this.mutationId = n.mutationId),
        (this.#e = n.mutationCache),
        (this.#t = []),
        (this.state = n.state || zy()),
        this.setOptions(n.options),
        this.scheduleGc();
    }
    setOptions(n) {
      (this.options = n), this.updateGcTime(this.options.gcTime);
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(n) {
      this.#t.includes(n) ||
        (this.#t.push(n),
        this.clearGcTimeout(),
        this.#e.notify({ type: 'observerAdded', mutation: this, observer: n }));
    }
    removeObserver(n) {
      (this.#t = this.#t.filter((s) => s !== n)),
        this.scheduleGc(),
        this.#e.notify({
          type: 'observerRemoved',
          mutation: this,
          observer: n,
        });
    }
    optionalRemove() {
      this.#t.length ||
        (this.state.status === 'pending'
          ? this.scheduleGc()
          : this.#e.remove(this));
    }
    continue() {
      return this.#n?.continue() ?? this.execute(this.state.variables);
    }
    async execute(n) {
      const s = () => {
        this.#a({ type: 'continue' });
      };
      this.#n = Ly({
        fn: () =>
          this.options.mutationFn
            ? this.options.mutationFn(n)
            : Promise.reject(new Error('No mutationFn found')),
        onFail: (c, f) => {
          this.#a({ type: 'failed', failureCount: c, error: f });
        },
        onPause: () => {
          this.#a({ type: 'pause' });
        },
        onContinue: s,
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#e.canRun(this),
      });
      const i = this.state.status === 'pending',
        o = !this.#n.canStart();
      try {
        if (i) s();
        else {
          this.#a({ type: 'pending', variables: n, isPaused: o }),
            await this.#e.config.onMutate?.(n, this);
          const f = await this.options.onMutate?.(n);
          f !== this.state.context &&
            this.#a({ type: 'pending', context: f, variables: n, isPaused: o });
        }
        const c = await this.#n.start();
        return (
          await this.#e.config.onSuccess?.(c, n, this.state.context, this),
          await this.options.onSuccess?.(c, n, this.state.context),
          await this.#e.config.onSettled?.(
            c,
            null,
            this.state.variables,
            this.state.context,
            this
          ),
          await this.options.onSettled?.(c, null, n, this.state.context),
          this.#a({ type: 'success', data: c }),
          c
        );
      } catch (c) {
        try {
          throw (
            (await this.#e.config.onError?.(c, n, this.state.context, this),
            await this.options.onError?.(c, n, this.state.context),
            await this.#e.config.onSettled?.(
              void 0,
              c,
              this.state.variables,
              this.state.context,
              this
            ),
            await this.options.onSettled?.(void 0, c, n, this.state.context),
            c)
          );
        } finally {
          this.#a({ type: 'error', error: c });
        }
      } finally {
        this.#e.runNext(this);
      }
    }
    #a(n) {
      const s = (i) => {
        switch (n.type) {
          case 'failed':
            return {
              ...i,
              failureCount: n.failureCount,
              failureReason: n.error,
            };
          case 'pause':
            return { ...i, isPaused: !0 };
          case 'continue':
            return { ...i, isPaused: !1 };
          case 'pending':
            return {
              ...i,
              context: n.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: n.isPaused,
              status: 'pending',
              variables: n.variables,
              submittedAt: Date.now(),
            };
          case 'success':
            return {
              ...i,
              data: n.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: 'success',
              isPaused: !1,
            };
          case 'error':
            return {
              ...i,
              data: void 0,
              error: n.error,
              failureCount: i.failureCount + 1,
              failureReason: n.error,
              isPaused: !1,
              status: 'error',
            };
        }
      };
      (this.state = s(this.state)),
        Fe.batch(() => {
          this.#t.forEach((i) => {
            i.onMutationUpdate(n);
          }),
            this.#e.notify({ mutation: this, type: 'updated', action: n });
        });
    }
  };
function zy() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
    submittedAt: 0,
  };
}
var DS = class extends Xs {
  constructor(n = {}) {
    super(),
      (this.config = n),
      (this.#t = new Set()),
      (this.#e = new Map()),
      (this.#n = 0);
  }
  #t;
  #e;
  #n;
  build(n, s, i) {
    const o = new kS({
      mutationCache: this,
      mutationId: ++this.#n,
      options: n.defaultMutationOptions(s),
      state: i,
    });
    return this.add(o), o;
  }
  add(n) {
    this.#t.add(n);
    const s = ko(n);
    if (typeof s == 'string') {
      const i = this.#e.get(s);
      i ? i.push(n) : this.#e.set(s, [n]);
    }
    this.notify({ type: 'added', mutation: n });
  }
  remove(n) {
    if (this.#t.delete(n)) {
      const s = ko(n);
      if (typeof s == 'string') {
        const i = this.#e.get(s);
        if (i)
          if (i.length > 1) {
            const o = i.indexOf(n);
            o !== -1 && i.splice(o, 1);
          } else i[0] === n && this.#e.delete(s);
      }
    }
    this.notify({ type: 'removed', mutation: n });
  }
  canRun(n) {
    const s = ko(n);
    if (typeof s == 'string') {
      const o = this.#e.get(s)?.find((c) => c.state.status === 'pending');
      return !o || o === n;
    } else return !0;
  }
  runNext(n) {
    const s = ko(n);
    return typeof s == 'string'
      ? this.#e
          .get(s)
          ?.find((o) => o !== n && o.state.isPaused)
          ?.continue() ?? Promise.resolve()
      : Promise.resolve();
  }
  clear() {
    Fe.batch(() => {
      this.#t.forEach((n) => {
        this.notify({ type: 'removed', mutation: n });
      }),
        this.#t.clear(),
        this.#e.clear();
    });
  }
  getAll() {
    return Array.from(this.#t);
  }
  find(n) {
    const s = { exact: !0, ...n };
    return this.getAll().find((i) => sp(s, i));
  }
  findAll(n = {}) {
    return this.getAll().filter((s) => sp(n, s));
  }
  notify(n) {
    Fe.batch(() => {
      this.listeners.forEach((s) => {
        s(n);
      });
    });
  }
  resumePausedMutations() {
    const n = this.getAll().filter((s) => s.state.isPaused);
    return Fe.batch(() => Promise.all(n.map((s) => s.continue().catch(ut))));
  }
};
function ko(n) {
  return n.options.scope?.id;
}
function op(n) {
  return {
    onFetch: (s, i) => {
      const o = s.options,
        c = s.fetchOptions?.meta?.fetchMore?.direction,
        f = s.state.data?.pages || [],
        h = s.state.data?.pageParams || [];
      let m = { pages: [], pageParams: [] },
        g = 0;
      const d = async () => {
        let v = !1;
        const p = (w) => {
            Object.defineProperty(w, 'signal', {
              enumerable: !0,
              get: () => (
                s.signal.aborted
                  ? (v = !0)
                  : s.signal.addEventListener('abort', () => {
                      v = !0;
                    }),
                s.signal
              ),
            });
          },
          b = Oy(s.options, s.fetchOptions),
          T = async (w, E, M) => {
            if (v) return Promise.reject();
            if (E == null && w.pages.length) return Promise.resolve(w);
            const L = (() => {
                const Z = {
                  client: s.client,
                  queryKey: s.queryKey,
                  pageParam: E,
                  direction: M ? 'backward' : 'forward',
                  meta: s.options.meta,
                };
                return p(Z), Z;
              })(),
              U = await b(L),
              { maxPages: G } = s.options,
              I = M ? wS : _S;
            return {
              pages: I(w.pages, U, G),
              pageParams: I(w.pageParams, E, G),
            };
          };
        if (c && f.length) {
          const w = c === 'backward',
            E = w ? NS : lp,
            M = { pages: f, pageParams: h },
            O = E(o, M);
          m = await T(M, O, w);
        } else {
          const w = n ?? f.length;
          do {
            const E = g === 0 ? h[0] ?? o.initialPageParam : lp(o, m);
            if (g > 0 && E == null) break;
            (m = await T(m, E)), g++;
          } while (g < w);
        }
        return m;
      };
      s.options.persister
        ? (s.fetchFn = () =>
            s.options.persister?.(
              d,
              {
                client: s.client,
                queryKey: s.queryKey,
                meta: s.options.meta,
                signal: s.signal,
              },
              i
            ))
        : (s.fetchFn = d);
    },
  };
}
function lp(n, { pages: s, pageParams: i }) {
  const o = s.length - 1;
  return s.length > 0 ? n.getNextPageParam(s[o], s, i[o], i) : void 0;
}
function NS(n, { pages: s, pageParams: i }) {
  return s.length > 0 ? n.getPreviousPageParam?.(s[0], s, i[0], i) : void 0;
}
var LS = class {
    #t;
    #e;
    #n;
    #a;
    #s;
    #r;
    #o;
    #i;
    constructor(n = {}) {
      (this.#t = n.queryCache || new OS()),
        (this.#e = n.mutationCache || new DS()),
        (this.#n = n.defaultOptions || {}),
        (this.#a = new Map()),
        (this.#s = new Map()),
        (this.#r = 0);
    }
    mount() {
      this.#r++,
        this.#r === 1 &&
          ((this.#o = Df.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#t.onFocus());
          })),
          (this.#i = $o.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#t.onOnline());
          })));
    }
    unmount() {
      this.#r--,
        this.#r === 0 &&
          (this.#o?.(), (this.#o = void 0), this.#i?.(), (this.#i = void 0));
    }
    isFetching(n) {
      return this.#t.findAll({ ...n, fetchStatus: 'fetching' }).length;
    }
    isMutating(n) {
      return this.#e.findAll({ ...n, status: 'pending' }).length;
    }
    getQueryData(n) {
      const s = this.defaultQueryOptions({ queryKey: n });
      return this.#t.get(s.queryHash)?.state.data;
    }
    ensureQueryData(n) {
      const s = this.defaultQueryOptions(n),
        i = this.#t.build(this, s),
        o = i.state.data;
      return o === void 0
        ? this.fetchQuery(n)
        : (n.revalidateIfStale &&
            i.isStaleByTime(ra(s.staleTime, i)) &&
            this.prefetchQuery(s),
          Promise.resolve(o));
    }
    getQueriesData(n) {
      return this.#t.findAll(n).map(({ queryKey: s, state: i }) => {
        const o = i.data;
        return [s, o];
      });
    }
    setQueryData(n, s, i) {
      const o = this.defaultQueryOptions({ queryKey: n }),
        f = this.#t.get(o.queryHash)?.state.data,
        h = SS(s, f);
      if (h !== void 0)
        return this.#t.build(this, o).setData(h, { ...i, manual: !0 });
    }
    setQueriesData(n, s, i) {
      return Fe.batch(() =>
        this.#t
          .findAll(n)
          .map(({ queryKey: o }) => [o, this.setQueryData(o, s, i)])
      );
    }
    getQueryState(n) {
      const s = this.defaultQueryOptions({ queryKey: n });
      return this.#t.get(s.queryHash)?.state;
    }
    removeQueries(n) {
      const s = this.#t;
      Fe.batch(() => {
        s.findAll(n).forEach((i) => {
          s.remove(i);
        });
      });
    }
    resetQueries(n, s) {
      const i = this.#t;
      return Fe.batch(
        () => (
          i.findAll(n).forEach((o) => {
            o.reset();
          }),
          this.refetchQueries({ type: 'active', ...n }, s)
        )
      );
    }
    cancelQueries(n, s = {}) {
      const i = { revert: !0, ...s },
        o = Fe.batch(() => this.#t.findAll(n).map((c) => c.cancel(i)));
      return Promise.all(o).then(ut).catch(ut);
    }
    invalidateQueries(n, s = {}) {
      return Fe.batch(
        () => (
          this.#t.findAll(n).forEach((i) => {
            i.invalidate();
          }),
          n?.refetchType === 'none'
            ? Promise.resolve()
            : this.refetchQueries(
                { ...n, type: n?.refetchType ?? n?.type ?? 'active' },
                s
              )
        )
      );
    }
    refetchQueries(n, s = {}) {
      const i = { ...s, cancelRefetch: s.cancelRefetch ?? !0 },
        o = Fe.batch(() =>
          this.#t
            .findAll(n)
            .filter((c) => !c.isDisabled() && !c.isStatic())
            .map((c) => {
              let f = c.fetch(void 0, i);
              return (
                i.throwOnError || (f = f.catch(ut)),
                c.state.fetchStatus === 'paused' ? Promise.resolve() : f
              );
            })
        );
      return Promise.all(o).then(ut);
    }
    fetchQuery(n) {
      const s = this.defaultQueryOptions(n);
      s.retry === void 0 && (s.retry = !1);
      const i = this.#t.build(this, s);
      return i.isStaleByTime(ra(s.staleTime, i))
        ? i.fetch(s)
        : Promise.resolve(i.state.data);
    }
    prefetchQuery(n) {
      return this.fetchQuery(n).then(ut).catch(ut);
    }
    fetchInfiniteQuery(n) {
      return (n.behavior = op(n.pages)), this.fetchQuery(n);
    }
    prefetchInfiniteQuery(n) {
      return this.fetchInfiniteQuery(n).then(ut).catch(ut);
    }
    ensureInfiniteQueryData(n) {
      return (n.behavior = op(n.pages)), this.ensureQueryData(n);
    }
    resumePausedMutations() {
      return $o.isOnline()
        ? this.#e.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#t;
    }
    getMutationCache() {
      return this.#e;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(n) {
      this.#n = n;
    }
    setQueryDefaults(n, s) {
      this.#a.set(Pa(n), { queryKey: n, defaultOptions: s });
    }
    getQueryDefaults(n) {
      const s = [...this.#a.values()],
        i = {};
      return (
        s.forEach((o) => {
          ur(n, o.queryKey) && Object.assign(i, o.defaultOptions);
        }),
        i
      );
    }
    setMutationDefaults(n, s) {
      this.#s.set(Pa(n), { mutationKey: n, defaultOptions: s });
    }
    getMutationDefaults(n) {
      const s = [...this.#s.values()],
        i = {};
      return (
        s.forEach((o) => {
          ur(n, o.mutationKey) && Object.assign(i, o.defaultOptions);
        }),
        i
      );
    }
    defaultQueryOptions(n) {
      if (n._defaulted) return n;
      const s = {
        ...this.#n.queries,
        ...this.getQueryDefaults(n.queryKey),
        ...n,
        _defaulted: !0,
      };
      return (
        s.queryHash || (s.queryHash = Of(s.queryKey, s)),
        s.refetchOnReconnect === void 0 &&
          (s.refetchOnReconnect = s.networkMode !== 'always'),
        s.throwOnError === void 0 && (s.throwOnError = !!s.suspense),
        !s.networkMode && s.persister && (s.networkMode = 'offlineFirst'),
        s.queryFn === kf && (s.enabled = !1),
        s
      );
    }
    defaultMutationOptions(n) {
      return n?._defaulted
        ? n
        : {
            ...this.#n.mutations,
            ...(n?.mutationKey && this.getMutationDefaults(n.mutationKey)),
            ...n,
            _defaulted: !0,
          };
    }
    clear() {
      this.#t.clear(), this.#e.clear();
    }
  },
  jS = class extends Xs {
    constructor(n, s) {
      super(),
        (this.options = s),
        (this.#t = n),
        (this.#i = null),
        (this.#o = hf()),
        this.options.experimental_prefetchInRender ||
          this.#o.reject(
            new Error(
              'experimental_prefetchInRender feature flag is not enabled'
            )
          ),
        this.bindMethods(),
        this.setOptions(s);
    }
    #t;
    #e = void 0;
    #n = void 0;
    #a = void 0;
    #s;
    #r;
    #o;
    #i;
    #m;
    #d;
    #h;
    #c;
    #u;
    #l;
    #g = new Set();
    bindMethods() {
      this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
      this.listeners.size === 1 &&
        (this.#e.addObserver(this),
        cp(this.#e, this.options) ? this.#f() : this.updateResult(),
        this.#S());
    }
    onUnsubscribe() {
      this.hasListeners() || this.destroy();
    }
    shouldFetchOnReconnect() {
      return gf(this.#e, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
      return gf(this.#e, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
      (this.listeners = new Set()),
        this.#b(),
        this.#_(),
        this.#e.removeObserver(this);
    }
    setOptions(n) {
      const s = this.options,
        i = this.#e;
      if (
        ((this.options = this.#t.defaultQueryOptions(n)),
        this.options.enabled !== void 0 &&
          typeof this.options.enabled != 'boolean' &&
          typeof this.options.enabled != 'function' &&
          typeof $t(this.options.enabled, this.#e) != 'boolean')
      )
        throw new Error(
          'Expected enabled to be a boolean or a callback that returns a boolean'
        );
      this.#w(),
        this.#e.setOptions(this.options),
        s._defaulted &&
          !qo(this.options, s) &&
          this.#t
            .getQueryCache()
            .notify({
              type: 'observerOptionsUpdated',
              query: this.#e,
              observer: this,
            });
      const o = this.hasListeners();
      o && up(this.#e, i, this.options, s) && this.#f(),
        this.updateResult(),
        o &&
          (this.#e !== i ||
            $t(this.options.enabled, this.#e) !== $t(s.enabled, this.#e) ||
            ra(this.options.staleTime, this.#e) !== ra(s.staleTime, this.#e)) &&
          this.#p();
      const c = this.#y();
      o &&
        (this.#e !== i ||
          $t(this.options.enabled, this.#e) !== $t(s.enabled, this.#e) ||
          c !== this.#l) &&
        this.#v(c);
    }
    getOptimisticResult(n) {
      const s = this.#t.getQueryCache().build(this.#t, n),
        i = this.createResult(s, n);
      return (
        zS(this, i) &&
          ((this.#a = i), (this.#r = this.options), (this.#s = this.#e.state)),
        i
      );
    }
    getCurrentResult() {
      return this.#a;
    }
    trackResult(n, s) {
      return new Proxy(n, {
        get: (i, o) => (this.trackProp(o), s?.(o), Reflect.get(i, o)),
      });
    }
    trackProp(n) {
      this.#g.add(n);
    }
    getCurrentQuery() {
      return this.#e;
    }
    refetch({ ...n } = {}) {
      return this.fetch({ ...n });
    }
    fetchOptimistic(n) {
      const s = this.#t.defaultQueryOptions(n),
        i = this.#t.getQueryCache().build(this.#t, s);
      return i.fetch().then(() => this.createResult(i, s));
    }
    fetch(n) {
      return this.#f({ ...n, cancelRefetch: n.cancelRefetch ?? !0 }).then(
        () => (this.updateResult(), this.#a)
      );
    }
    #f(n) {
      this.#w();
      let s = this.#e.fetch(this.options, n);
      return n?.throwOnError || (s = s.catch(ut)), s;
    }
    #p() {
      this.#b();
      const n = ra(this.options.staleTime, this.#e);
      if (Ha || this.#a.isStale || !uf(n)) return;
      const i = Ay(this.#a.dataUpdatedAt, n) + 1;
      this.#c = setTimeout(() => {
        this.#a.isStale || this.updateResult();
      }, i);
    }
    #y() {
      return (
        (typeof this.options.refetchInterval == 'function'
          ? this.options.refetchInterval(this.#e)
          : this.options.refetchInterval) ?? !1
      );
    }
    #v(n) {
      this.#_(),
        (this.#l = n),
        !(
          Ha ||
          $t(this.options.enabled, this.#e) === !1 ||
          !uf(this.#l) ||
          this.#l === 0
        ) &&
          (this.#u = setInterval(() => {
            (this.options.refetchIntervalInBackground || Df.isFocused()) &&
              this.#f();
          }, this.#l));
    }
    #S() {
      this.#p(), this.#v(this.#y());
    }
    #b() {
      this.#c && (clearTimeout(this.#c), (this.#c = void 0));
    }
    #_() {
      this.#u && (clearInterval(this.#u), (this.#u = void 0));
    }
    createResult(n, s) {
      const i = this.#e,
        o = this.options,
        c = this.#a,
        f = this.#s,
        h = this.#r,
        g = n !== i ? n.state : this.#n,
        { state: d } = n;
      let v = { ...d },
        p = !1,
        b;
      if (s._optimisticResults) {
        const K = this.hasListeners(),
          X = !K && cp(n, s),
          F = K && up(n, i, s, o);
        (X || F) && (v = { ...v, ...By(d.data, n.options) }),
          s._optimisticResults === 'isRestoring' && (v.fetchStatus = 'idle');
      }
      let { error: T, errorUpdatedAt: w, status: E } = v;
      b = v.data;
      let M = !1;
      if (s.placeholderData !== void 0 && b === void 0 && E === 'pending') {
        let K;
        c?.isPlaceholderData && s.placeholderData === h?.placeholderData
          ? ((K = c.data), (M = !0))
          : (K =
              typeof s.placeholderData == 'function'
                ? s.placeholderData(this.#h?.state.data, this.#h)
                : s.placeholderData),
          K !== void 0 && ((E = 'success'), (b = df(c?.data, K, s)), (p = !0));
      }
      if (s.select && b !== void 0 && !M)
        if (c && b === f?.data && s.select === this.#m) b = this.#d;
        else
          try {
            (this.#m = s.select),
              (b = s.select(b)),
              (b = df(c?.data, b, s)),
              (this.#d = b),
              (this.#i = null);
          } catch (K) {
            this.#i = K;
          }
      this.#i &&
        ((T = this.#i), (b = this.#d), (w = Date.now()), (E = 'error'));
      const O = v.fetchStatus === 'fetching',
        L = E === 'pending',
        U = E === 'error',
        G = L && O,
        I = b !== void 0,
        Y = {
          status: E,
          fetchStatus: v.fetchStatus,
          isPending: L,
          isSuccess: E === 'success',
          isError: U,
          isInitialLoading: G,
          isLoading: G,
          data: b,
          dataUpdatedAt: v.dataUpdatedAt,
          error: T,
          errorUpdatedAt: w,
          failureCount: v.fetchFailureCount,
          failureReason: v.fetchFailureReason,
          errorUpdateCount: v.errorUpdateCount,
          isFetched: v.dataUpdateCount > 0 || v.errorUpdateCount > 0,
          isFetchedAfterMount:
            v.dataUpdateCount > g.dataUpdateCount ||
            v.errorUpdateCount > g.errorUpdateCount,
          isFetching: O,
          isRefetching: O && !L,
          isLoadingError: U && !I,
          isPaused: v.fetchStatus === 'paused',
          isPlaceholderData: p,
          isRefetchError: U && I,
          isStale: Nf(n, s),
          refetch: this.refetch,
          promise: this.#o,
          isEnabled: $t(s.enabled, n) !== !1,
        };
      if (this.options.experimental_prefetchInRender) {
        const K = (ne) => {
            Y.status === 'error'
              ? ne.reject(Y.error)
              : Y.data !== void 0 && ne.resolve(Y.data);
          },
          X = () => {
            const ne = (this.#o = Y.promise = hf());
            K(ne);
          },
          F = this.#o;
        switch (F.status) {
          case 'pending':
            n.queryHash === i.queryHash && K(F);
            break;
          case 'fulfilled':
            (Y.status === 'error' || Y.data !== F.value) && X();
            break;
          case 'rejected':
            (Y.status !== 'error' || Y.error !== F.reason) && X();
            break;
        }
      }
      return Y;
    }
    updateResult() {
      const n = this.#a,
        s = this.createResult(this.#e, this.options);
      if (
        ((this.#s = this.#e.state),
        (this.#r = this.options),
        this.#s.data !== void 0 && (this.#h = this.#e),
        qo(s, n))
      )
        return;
      this.#a = s;
      const i = () => {
        if (!n) return !0;
        const { notifyOnChangeProps: o } = this.options,
          c = typeof o == 'function' ? o() : o;
        if (c === 'all' || (!c && !this.#g.size)) return !0;
        const f = new Set(c ?? this.#g);
        return (
          this.options.throwOnError && f.add('error'),
          Object.keys(this.#a).some((h) => {
            const m = h;
            return this.#a[m] !== n[m] && f.has(m);
          })
        );
      };
      this.#T({ listeners: i() });
    }
    #w() {
      const n = this.#t.getQueryCache().build(this.#t, this.options);
      if (n === this.#e) return;
      const s = this.#e;
      (this.#e = n),
        (this.#n = n.state),
        this.hasListeners() && (s?.removeObserver(this), n.addObserver(this));
    }
    onQueryUpdate() {
      this.updateResult(), this.hasListeners() && this.#S();
    }
    #T(n) {
      Fe.batch(() => {
        n.listeners &&
          this.listeners.forEach((s) => {
            s(this.#a);
          }),
          this.#t
            .getQueryCache()
            .notify({ query: this.#e, type: 'observerResultsUpdated' });
      });
    }
  };
function BS(n, s) {
  return (
    $t(s.enabled, n) !== !1 &&
    n.state.data === void 0 &&
    !(n.state.status === 'error' && s.retryOnMount === !1)
  );
}
function cp(n, s) {
  return BS(n, s) || (n.state.data !== void 0 && gf(n, s, s.refetchOnMount));
}
function gf(n, s, i) {
  if ($t(s.enabled, n) !== !1 && ra(s.staleTime, n) !== 'static') {
    const o = typeof i == 'function' ? i(n) : i;
    return o === 'always' || (o !== !1 && Nf(n, s));
  }
  return !1;
}
function up(n, s, i, o) {
  return (
    (n !== s || $t(o.enabled, n) === !1) &&
    (!i.suspense || n.state.status !== 'error') &&
    Nf(n, i)
  );
}
function Nf(n, s) {
  return $t(s.enabled, n) !== !1 && n.isStaleByTime(ra(s.staleTime, n));
}
function zS(n, s) {
  return !qo(n.getCurrentResult(), s);
}
var US = class extends Xs {
    #t;
    #e = void 0;
    #n;
    #a;
    constructor(s, i) {
      super(), (this.#t = s), this.setOptions(i), this.bindMethods(), this.#s();
    }
    bindMethods() {
      (this.mutate = this.mutate.bind(this)),
        (this.reset = this.reset.bind(this));
    }
    setOptions(s) {
      const i = this.options;
      (this.options = this.#t.defaultMutationOptions(s)),
        qo(this.options, i) ||
          this.#t
            .getMutationCache()
            .notify({
              type: 'observerOptionsUpdated',
              mutation: this.#n,
              observer: this,
            }),
        i?.mutationKey &&
        this.options.mutationKey &&
        Pa(i.mutationKey) !== Pa(this.options.mutationKey)
          ? this.reset()
          : this.#n?.state.status === 'pending' &&
            this.#n.setOptions(this.options);
    }
    onUnsubscribe() {
      this.hasListeners() || this.#n?.removeObserver(this);
    }
    onMutationUpdate(s) {
      this.#s(), this.#r(s);
    }
    getCurrentResult() {
      return this.#e;
    }
    reset() {
      this.#n?.removeObserver(this), (this.#n = void 0), this.#s(), this.#r();
    }
    mutate(s, i) {
      return (
        (this.#a = i),
        this.#n?.removeObserver(this),
        (this.#n = this.#t.getMutationCache().build(this.#t, this.options)),
        this.#n.addObserver(this),
        this.#n.execute(s)
      );
    }
    #s() {
      const s = this.#n?.state ?? zy();
      this.#e = {
        ...s,
        isPending: s.status === 'pending',
        isSuccess: s.status === 'success',
        isError: s.status === 'error',
        isIdle: s.status === 'idle',
        mutate: this.mutate,
        reset: this.reset,
      };
    }
    #r(s) {
      Fe.batch(() => {
        if (this.#a && this.hasListeners()) {
          const i = this.#e.variables,
            o = this.#e.context;
          s?.type === 'success'
            ? (this.#a.onSuccess?.(s.data, i, o),
              this.#a.onSettled?.(s.data, null, i, o))
            : s?.type === 'error' &&
              (this.#a.onError?.(s.error, i, o),
              this.#a.onSettled?.(void 0, s.error, i, o));
        }
        this.listeners.forEach((i) => {
          i(this.#e);
        });
      });
    }
  },
  Uy = z.createContext(void 0),
  Lf = (n) => {
    const s = z.useContext(Uy);
    if (!s)
      throw new Error('No QueryClient set, use QueryClientProvider to set one');
    return s;
  },
  IS = ({ client: n, children: s }) => (
    z.useEffect(
      () => (
        n.mount(),
        () => {
          n.unmount();
        }
      ),
      [n]
    ),
    S.jsx(Uy.Provider, { value: n, children: s })
  ),
  Iy = z.createContext(!1),
  HS = () => z.useContext(Iy);
Iy.Provider;
function PS() {
  let n = !1;
  return {
    clearReset: () => {
      n = !1;
    },
    reset: () => {
      n = !0;
    },
    isReset: () => n,
  };
}
var qS = z.createContext(PS()),
  $S = () => z.useContext(qS),
  GS = (n, s) => {
    (n.suspense || n.throwOnError || n.experimental_prefetchInRender) &&
      (s.isReset() || (n.retryOnMount = !1));
  },
  VS = (n) => {
    z.useEffect(() => {
      n.clearReset();
    }, [n]);
  },
  QS = ({
    result: n,
    errorResetBoundary: s,
    throwOnError: i,
    query: o,
    suspense: c,
  }) =>
    n.isError &&
    !s.isReset() &&
    !n.isFetching &&
    o &&
    ((c && n.data === void 0) || ky(i, [n.error, o])),
  KS = (n) => {
    if (n.suspense) {
      const s = (o) => (o === 'static' ? o : Math.max(o ?? 1e3, 1e3)),
        i = n.staleTime;
      (n.staleTime = typeof i == 'function' ? (...o) => s(i(...o)) : s(i)),
        typeof n.gcTime == 'number' && (n.gcTime = Math.max(n.gcTime, 1e3));
    }
  },
  FS = (n, s) => n.isLoading && n.isFetching && !s,
  YS = (n, s) => n?.suspense && s.isPending,
  fp = (n, s, i) =>
    s.fetchOptimistic(n).catch(() => {
      i.clearReset();
    });
function XS(n, s, i) {
  const o = HS(),
    c = $S(),
    f = Lf(),
    h = f.defaultQueryOptions(n);
  f.getDefaultOptions().queries?._experimental_beforeQuery?.(h),
    (h._optimisticResults = o ? 'isRestoring' : 'optimistic'),
    KS(h),
    GS(h, c),
    VS(c);
  const m = !f.getQueryCache().get(h.queryHash),
    [g] = z.useState(() => new s(f, h)),
    d = g.getOptimisticResult(h),
    v = !o && n.subscribed !== !1;
  if (
    (z.useSyncExternalStore(
      z.useCallback(
        (p) => {
          const b = v ? g.subscribe(Fe.batchCalls(p)) : ut;
          return g.updateResult(), b;
        },
        [g, v]
      ),
      () => g.getCurrentResult(),
      () => g.getCurrentResult()
    ),
    z.useEffect(() => {
      g.setOptions(h);
    }, [h, g]),
    YS(h, d))
  )
    throw fp(h, g, c);
  if (
    QS({
      result: d,
      errorResetBoundary: c,
      throwOnError: h.throwOnError,
      query: f.getQueryCache().get(h.queryHash),
      suspense: h.suspense,
    })
  )
    throw d.error;
  return (
    f.getDefaultOptions().queries?._experimental_afterQuery?.(h, d),
    h.experimental_prefetchInRender &&
      !Ha &&
      FS(d, o) &&
      (m ? fp(h, g, c) : f.getQueryCache().get(h.queryHash)?.promise)
        ?.catch(ut)
        .finally(() => {
          g.updateResult();
        }),
    h.notifyOnChangeProps ? d : g.trackResult(d)
  );
}
function mr(n, s) {
  return XS(n, jS);
}
function rr(n, s) {
  const i = Lf(),
    [o] = z.useState(() => new US(i, n));
  z.useEffect(() => {
    o.setOptions(n);
  }, [o, n]);
  const c = z.useSyncExternalStore(
      z.useCallback((h) => o.subscribe(Fe.batchCalls(h)), [o]),
      () => o.getCurrentResult(),
      () => o.getCurrentResult()
    ),
    f = z.useCallback(
      (h, m) => {
        o.mutate(h, m).catch(ut);
      },
      [o]
    );
  if (c.error && ky(o.options.throwOnError, [c.error])) throw c.error;
  return { ...c, mutate: f, mutateAsync: c.mutate };
}
const WS = 'modulepreload',
  ZS = function (n) {
    return '/' + n;
  },
  dp = {},
  JS = function (s, i, o) {
    let c = Promise.resolve();
    if (i && i.length > 0) {
      let g = function (d) {
        return Promise.all(
          d.map((v) =>
            Promise.resolve(v).then(
              (p) => ({ status: 'fulfilled', value: p }),
              (p) => ({ status: 'rejected', reason: p })
            )
          )
        );
      };
      document.getElementsByTagName('link');
      const h = document.querySelector('meta[property=csp-nonce]'),
        m = h?.nonce || h?.getAttribute('nonce');
      c = g(
        i.map((d) => {
          if (((d = ZS(d)), d in dp)) return;
          dp[d] = !0;
          const v = d.endsWith('.css'),
            p = v ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${d}"]${p}`)) return;
          const b = document.createElement('link');
          if (
            ((b.rel = v ? 'stylesheet' : WS),
            v || (b.as = 'script'),
            (b.crossOrigin = ''),
            (b.href = d),
            m && b.setAttribute('nonce', m),
            document.head.appendChild(b),
            v)
          )
            return new Promise((T, w) => {
              b.addEventListener('load', T),
                b.addEventListener('error', () =>
                  w(new Error(`Unable to preload CSS for ${d}`))
                );
            });
        })
      );
    }
    function f(h) {
      const m = new Event('vite:preloadError', { cancelable: !0 });
      if (((m.payload = h), window.dispatchEvent(m), !m.defaultPrevented))
        throw h;
    }
    return c.then((h) => {
      for (const m of h || []) m.status === 'rejected' && f(m.reason);
      return s().catch(f);
    });
  };
var eb = function () {
    return null;
  },
  tb = 'Invariant failed';
function On(n, s) {
  if (!n) throw new Error(tb);
}
const qs = new WeakMap(),
  Uo = new WeakMap(),
  Go = { current: [] };
let Ru = !1,
  or = 0;
const ir = new Set(),
  Do = new Map();
function Hy(n) {
  const s = Array.from(n).sort((i, o) =>
    i instanceof $s && i.options.deps.includes(o)
      ? 1
      : o instanceof $s && o.options.deps.includes(i)
      ? -1
      : 0
  );
  for (const i of s) {
    if (Go.current.includes(i)) continue;
    Go.current.push(i), i.recompute();
    const o = Uo.get(i);
    if (o)
      for (const c of o) {
        const f = qs.get(c);
        f && Hy(f);
      }
  }
}
function nb(n) {
  n.listeners.forEach((s) => s({ prevVal: n.prevState, currentVal: n.state }));
}
function ab(n) {
  n.listeners.forEach((s) => s({ prevVal: n.prevState, currentVal: n.state }));
}
function Py(n) {
  if (
    (or > 0 && !Do.has(n) && Do.set(n, n.prevState),
    ir.add(n),
    !(or > 0) && !Ru)
  )
    try {
      for (Ru = !0; ir.size > 0; ) {
        const s = Array.from(ir);
        ir.clear();
        for (const i of s) {
          const o = Do.get(i) ?? i.prevState;
          (i.prevState = o), nb(i);
        }
        for (const i of s) {
          const o = qs.get(i);
          o && (Go.current.push(i), Hy(o));
        }
        for (const i of s) {
          const o = qs.get(i);
          if (o) for (const c of o) ab(c);
        }
      }
    } finally {
      (Ru = !1), (Go.current = []), Do.clear();
    }
}
function lr(n) {
  or++;
  try {
    n();
  } finally {
    if ((or--, or === 0)) {
      const s = Array.from(ir)[0];
      s && Py(s);
    }
  }
}
function sb(n) {
  return typeof n == 'function';
}
class mf {
  constructor(s, i) {
    (this.listeners = new Set()),
      (this.subscribe = (o) => {
        var c, f;
        this.listeners.add(o);
        const h =
          (f = (c = this.options) == null ? void 0 : c.onSubscribe) == null
            ? void 0
            : f.call(c, o, this);
        return () => {
          this.listeners.delete(o), h?.();
        };
      }),
      (this.prevState = s),
      (this.state = s),
      (this.options = i);
  }
  setState(s) {
    var i, o, c;
    (this.prevState = this.state),
      (i = this.options) != null && i.updateFn
        ? (this.state = this.options.updateFn(this.prevState)(s))
        : sb(s)
        ? (this.state = s(this.prevState))
        : (this.state = s),
      (c = (o = this.options) == null ? void 0 : o.onUpdate) == null ||
        c.call(o),
      Py(this);
  }
}
class $s {
  constructor(s) {
    (this.listeners = new Set()),
      (this._subscriptions = []),
      (this.lastSeenDepValues = []),
      (this.getDepVals = () => {
        const i = [],
          o = [];
        for (const c of this.options.deps) i.push(c.prevState), o.push(c.state);
        return (
          (this.lastSeenDepValues = o),
          { prevDepVals: i, currDepVals: o, prevVal: this.prevState ?? void 0 }
        );
      }),
      (this.recompute = () => {
        var i, o;
        this.prevState = this.state;
        const {
          prevDepVals: c,
          currDepVals: f,
          prevVal: h,
        } = this.getDepVals();
        (this.state = this.options.fn({
          prevDepVals: c,
          currDepVals: f,
          prevVal: h,
        })),
          (o = (i = this.options).onUpdate) == null || o.call(i);
      }),
      (this.checkIfRecalculationNeededDeeply = () => {
        for (const f of this.options.deps)
          f instanceof $s && f.checkIfRecalculationNeededDeeply();
        let i = !1;
        const o = this.lastSeenDepValues,
          { currDepVals: c } = this.getDepVals();
        for (let f = 0; f < c.length; f++)
          if (c[f] !== o[f]) {
            i = !0;
            break;
          }
        i && this.recompute();
      }),
      (this.mount = () => (
        this.registerOnGraph(),
        this.checkIfRecalculationNeededDeeply(),
        () => {
          this.unregisterFromGraph();
          for (const i of this._subscriptions) i();
        }
      )),
      (this.subscribe = (i) => {
        var o, c;
        this.listeners.add(i);
        const f =
          (c = (o = this.options).onSubscribe) == null
            ? void 0
            : c.call(o, i, this);
        return () => {
          this.listeners.delete(i), f?.();
        };
      }),
      (this.options = s),
      (this.state = s.fn({
        prevDepVals: void 0,
        prevVal: void 0,
        currDepVals: this.getDepVals().currDepVals,
      }));
  }
  registerOnGraph(s = this.options.deps) {
    for (const i of s)
      if (i instanceof $s)
        i.registerOnGraph(), this.registerOnGraph(i.options.deps);
      else if (i instanceof mf) {
        let o = qs.get(i);
        o || ((o = new Set()), qs.set(i, o)), o.add(this);
        let c = Uo.get(this);
        c || ((c = new Set()), Uo.set(this, c)), c.add(i);
      }
  }
  unregisterFromGraph(s = this.options.deps) {
    for (const i of s)
      if (i instanceof $s) this.unregisterFromGraph(i.options.deps);
      else if (i instanceof mf) {
        const o = qs.get(i);
        o && o.delete(this);
        const c = Uo.get(this);
        c && c.delete(i);
      }
  }
}
const oa = '__TSR_index',
  hp = 'popstate',
  gp = 'beforeunload';
function qy(n) {
  let s = n.getLocation();
  const i = new Set(),
    o = (h) => {
      (s = n.getLocation()), i.forEach((m) => m({ location: s, action: h }));
    },
    c = (h) => {
      n.notifyOnIndexChange ?? !0 ? o(h) : (s = n.getLocation());
    },
    f = async ({ task: h, navigateOpts: m, ...g }) => {
      var d, v;
      if (m?.ignoreBlocker ?? !1) {
        h();
        return;
      }
      const b = ((d = n.getBlockers) == null ? void 0 : d.call(n)) ?? [],
        T = g.type === 'PUSH' || g.type === 'REPLACE';
      if (typeof document < 'u' && b.length && T)
        for (const w of b) {
          const E = fr(g.path, g.state);
          if (
            await w.blockerFn({
              currentLocation: s,
              nextLocation: E,
              action: g.type,
            })
          ) {
            (v = n.onBlocked) == null || v.call(n);
            return;
          }
        }
      h();
    };
  return {
    get location() {
      return s;
    },
    get length() {
      return n.getLength();
    },
    subscribers: i,
    subscribe: (h) => (
      i.add(h),
      () => {
        i.delete(h);
      }
    ),
    push: (h, m, g) => {
      const d = s.state[oa];
      (m = pf(d + 1, m)),
        f({
          task: () => {
            n.pushState(h, m), o({ type: 'PUSH' });
          },
          navigateOpts: g,
          type: 'PUSH',
          path: h,
          state: m,
        });
    },
    replace: (h, m, g) => {
      const d = s.state[oa];
      (m = pf(d, m)),
        f({
          task: () => {
            n.replaceState(h, m), o({ type: 'REPLACE' });
          },
          navigateOpts: g,
          type: 'REPLACE',
          path: h,
          state: m,
        });
    },
    go: (h, m) => {
      f({
        task: () => {
          n.go(h), c({ type: 'GO', index: h });
        },
        navigateOpts: m,
        type: 'GO',
      });
    },
    back: (h) => {
      f({
        task: () => {
          n.back(h?.ignoreBlocker ?? !1), c({ type: 'BACK' });
        },
        navigateOpts: h,
        type: 'BACK',
      });
    },
    forward: (h) => {
      f({
        task: () => {
          n.forward(h?.ignoreBlocker ?? !1), c({ type: 'FORWARD' });
        },
        navigateOpts: h,
        type: 'FORWARD',
      });
    },
    canGoBack: () => s.state[oa] !== 0,
    createHref: (h) => n.createHref(h),
    block: (h) => {
      var m;
      if (!n.setBlockers) return () => {};
      const g = ((m = n.getBlockers) == null ? void 0 : m.call(n)) ?? [];
      return (
        n.setBlockers([...g, h]),
        () => {
          var d, v;
          const p = ((d = n.getBlockers) == null ? void 0 : d.call(n)) ?? [];
          (v = n.setBlockers) == null ||
            v.call(
              n,
              p.filter((b) => b !== h)
            );
        }
      );
    },
    flush: () => {
      var h;
      return (h = n.flush) == null ? void 0 : h.call(n);
    },
    destroy: () => {
      var h;
      return (h = n.destroy) == null ? void 0 : h.call(n);
    },
    notify: o,
  };
}
function pf(n, s) {
  s || (s = {});
  const i = jf();
  return { ...s, key: i, __TSR_key: i, [oa]: n };
}
function ib(n) {
  var s, i;
  const o = typeof document < 'u' ? window : void 0,
    c = o.history.pushState,
    f = o.history.replaceState;
  let h = [];
  const m = () => h,
    g = (F) => (h = F),
    d = (F) => F,
    v = () =>
      fr(
        `${o.location.pathname}${o.location.search}${o.location.hash}`,
        o.history.state
      );
  if (
    !((s = o.history.state) != null && s.__TSR_key) &&
    !((i = o.history.state) != null && i.key)
  ) {
    const F = jf();
    o.history.replaceState({ [oa]: 0, key: F, __TSR_key: F }, '');
  }
  let p = v(),
    b,
    T = !1,
    w = !1,
    E = !1,
    M = !1;
  const O = () => p;
  let L, U;
  const G = () => {
      L &&
        ((X._ignoreSubscribers = !0),
        (L.isPush ? o.history.pushState : o.history.replaceState)(
          L.state,
          '',
          L.href
        ),
        (X._ignoreSubscribers = !1),
        (L = void 0),
        (U = void 0),
        (b = void 0));
    },
    I = (F, ne, oe) => {
      const me = d(ne);
      U || (b = p),
        (p = fr(ne, oe)),
        (L = { href: me, state: oe, isPush: L?.isPush || F === 'push' }),
        U || (U = Promise.resolve().then(() => G()));
    },
    Z = (F) => {
      (p = v()), X.notify({ type: F });
    },
    Y = async () => {
      if (w) {
        w = !1;
        return;
      }
      const F = v(),
        ne = F.state[oa] - p.state[oa],
        oe = ne === 1,
        me = ne === -1,
        Se = (!oe && !me) || T;
      T = !1;
      const be = Se ? 'GO' : me ? 'BACK' : 'FORWARD',
        C = Se ? { type: 'GO', index: ne } : { type: me ? 'BACK' : 'FORWARD' };
      if (E) E = !1;
      else {
        const V = m();
        if (typeof document < 'u' && V.length) {
          for (const W of V)
            if (
              await W.blockerFn({
                currentLocation: p,
                nextLocation: F,
                action: be,
              })
            ) {
              (w = !0), o.history.go(1), X.notify(C);
              return;
            }
        }
      }
      (p = v()), X.notify(C);
    },
    K = (F) => {
      if (M) {
        M = !1;
        return;
      }
      let ne = !1;
      const oe = m();
      if (typeof document < 'u' && oe.length)
        for (const me of oe) {
          const Se = me.enableBeforeUnload ?? !0;
          if (Se === !0) {
            ne = !0;
            break;
          }
          if (typeof Se == 'function' && Se() === !0) {
            ne = !0;
            break;
          }
        }
      if (ne) return F.preventDefault(), (F.returnValue = '');
    },
    X = qy({
      getLocation: O,
      getLength: () => o.history.length,
      pushState: (F, ne) => I('push', F, ne),
      replaceState: (F, ne) => I('replace', F, ne),
      back: (F) => (F && (E = !0), (M = !0), o.history.back()),
      forward: (F) => {
        F && (E = !0), (M = !0), o.history.forward();
      },
      go: (F) => {
        (T = !0), o.history.go(F);
      },
      createHref: (F) => d(F),
      flush: G,
      destroy: () => {
        (o.history.pushState = c),
          (o.history.replaceState = f),
          o.removeEventListener(gp, K, { capture: !0 }),
          o.removeEventListener(hp, Y);
      },
      onBlocked: () => {
        b && p !== b && (p = b);
      },
      getBlockers: m,
      setBlockers: g,
      notifyOnIndexChange: !1,
    });
  return (
    o.addEventListener(gp, K, { capture: !0 }),
    o.addEventListener(hp, Y),
    (o.history.pushState = function (...F) {
      const ne = c.apply(o.history, F);
      return X._ignoreSubscribers || Z('PUSH'), ne;
    }),
    (o.history.replaceState = function (...F) {
      const ne = f.apply(o.history, F);
      return X._ignoreSubscribers || Z('REPLACE'), ne;
    }),
    X
  );
}
function rb(n = { initialEntries: ['/'] }) {
  const s = n.initialEntries;
  let i = n.initialIndex
    ? Math.min(Math.max(n.initialIndex, 0), s.length - 1)
    : s.length - 1;
  const o = s.map((f, h) => pf(h, void 0));
  return qy({
    getLocation: () => fr(s[i], o[i]),
    getLength: () => s.length,
    pushState: (f, h) => {
      i < s.length - 1 && (s.splice(i + 1), o.splice(i + 1)),
        o.push(h),
        s.push(f),
        (i = Math.max(s.length - 1, 0));
    },
    replaceState: (f, h) => {
      (o[i] = h), (s[i] = f);
    },
    back: () => {
      i = Math.max(i - 1, 0);
    },
    forward: () => {
      i = Math.min(i + 1, s.length - 1);
    },
    go: (f) => {
      i = Math.min(Math.max(i + f, 0), s.length - 1);
    },
    createHref: (f) => f,
  });
}
function fr(n, s) {
  const i = n.indexOf('#'),
    o = n.indexOf('?'),
    c = jf();
  return {
    href: n,
    pathname: n.substring(
      0,
      i > 0 ? (o > 0 ? Math.min(i, o) : i) : o > 0 ? o : n.length
    ),
    hash: i > -1 ? n.substring(i) : '',
    search: o > -1 ? n.slice(o, i === -1 ? void 0 : i) : '',
    state: s || { [oa]: 0, key: c, __TSR_key: c },
  };
}
function jf() {
  return (Math.random() + 1).toString(36).substring(7);
}
function yf(n) {
  return n[n.length - 1];
}
function ob(n) {
  return typeof n == 'function';
}
function Ua(n, s) {
  return ob(n) ? n(s) : n;
}
function mp(n, s) {
  return s.reduce((i, o) => ((i[o] = n[o]), i), {});
}
function qt(n, s) {
  if (n === s) return n;
  const i = s,
    o = vp(n) && vp(i);
  if (o || (pp(n) && pp(i))) {
    const c = o ? n : Object.keys(n).concat(Object.getOwnPropertySymbols(n)),
      f = c.length,
      h = o ? i : Object.keys(i).concat(Object.getOwnPropertySymbols(i)),
      m = h.length,
      g = o ? [] : {};
    let d = 0;
    for (let v = 0; v < m; v++) {
      const p = o ? v : h[v];
      ((!o && c.includes(p)) || o) && n[p] === void 0 && i[p] === void 0
        ? ((g[p] = void 0), d++)
        : ((g[p] = qt(n[p], i[p])), g[p] === n[p] && n[p] !== void 0 && d++);
    }
    return f === m && d === f ? n : g;
  }
  return i;
}
function pp(n) {
  return (
    vf(n) && Object.getOwnPropertyNames(n).length === Object.keys(n).length
  );
}
function vf(n) {
  if (!yp(n)) return !1;
  const s = n.constructor;
  if (typeof s > 'u') return !0;
  const i = s.prototype;
  return !(!yp(i) || !i.hasOwnProperty('isPrototypeOf'));
}
function yp(n) {
  return Object.prototype.toString.call(n) === '[object Object]';
}
function vp(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function Sp(n, s) {
  let i = Object.keys(n);
  return s && (i = i.filter((o) => n[o] !== void 0)), i;
}
function Gs(n, s, i) {
  if (n === s) return !0;
  if (typeof n != typeof s) return !1;
  if (vf(n) && vf(s)) {
    const o = i?.ignoreUndefined ?? !0,
      c = Sp(n, o),
      f = Sp(s, o);
    return !i?.partial && c.length !== f.length
      ? !1
      : f.every((h) => Gs(n[h], s[h], i));
  }
  return Array.isArray(n) && Array.isArray(s)
    ? n.length !== s.length
      ? !1
      : !n.some((o, c) => !Gs(o, s[c], i))
    : !1;
}
function Vs(n) {
  let s, i;
  const o = new Promise((c, f) => {
    (s = c), (i = f);
  });
  return (
    (o.status = 'pending'),
    (o.resolve = (c) => {
      (o.status = 'resolved'), (o.value = c), s(c), n?.(c);
    }),
    (o.reject = (c) => {
      (o.status = 'rejected'), i(c);
    }),
    o
  );
}
function la(n) {
  return !!(n && typeof n == 'object' && typeof n.then == 'function');
}
const Rn = 0,
  qa = 1,
  $a = 2,
  Qs = 3;
function Cn(n) {
  return Bf(n.filter((s) => s !== void 0).join('/'));
}
function Bf(n) {
  return n.replace(/\/{2,}/g, '/');
}
function zf(n) {
  return n === '/' ? n : n.replace(/^\/{1,}/, '');
}
function Ks(n) {
  return n === '/' ? n : n.replace(/\/{1,}$/, '');
}
function Cu(n) {
  return Ks(zf(n));
}
function Vo(n, s) {
  return n?.endsWith('/') && n !== '/' && n !== `${s}/` ? n.slice(0, -1) : n;
}
function lb(n, s, i) {
  return Vo(n, i) === Vo(s, i);
}
function cb(n) {
  const { type: s, value: i } = n;
  if (s === Rn) return i;
  const { prefixSegment: o, suffixSegment: c } = n;
  if (s === qa) {
    const f = i.substring(1);
    if (o && c) return `${o}{$${f}}${c}`;
    if (o) return `${o}{$${f}}`;
    if (c) return `{$${f}}${c}`;
  }
  if (s === Qs) {
    const f = i.substring(1);
    return o && c
      ? `${o}{-$${f}}${c}`
      : o
      ? `${o}{-$${f}}`
      : c
      ? `{-$${f}}${c}`
      : `{-$${f}}`;
  }
  if (s === $a) {
    if (o && c) return `${o}{$}${c}`;
    if (o) return `${o}{$}`;
    if (c) return `{$}${c}`;
  }
  return i;
}
function ub({
  basepath: n,
  base: s,
  to: i,
  trailingSlash: o = 'never',
  caseSensitive: c,
  parseCache: f,
}) {
  var h;
  (s = Qo(n, s, c)), (i = Qo(n, i, c));
  let m = Fs(s, f).slice();
  const g = Fs(i, f);
  m.length > 1 && ((h = yf(m)) == null ? void 0 : h.value) === '/' && m.pop();
  for (let p = 0, b = g.length; p < b; p++) {
    const T = g[p],
      w = T.value;
    w === '/'
      ? p
        ? p === b - 1 && m.push(T)
        : (m = [T])
      : w === '..'
      ? m.pop()
      : w === '.' || m.push(T);
  }
  m.length > 1 &&
    (yf(m).value === '/'
      ? o === 'never' && m.pop()
      : o === 'always' && m.push({ type: Rn, value: '/' }));
  const d = m.map(cb);
  return Cn([n, ...d]);
}
const Fs = (n, s) => {
    if (!n) return [];
    const i = s?.get(n);
    if (i) return i;
    const o = pb(n);
    return s?.set(n, o), o;
  },
  fb = /^\$.{1,}$/,
  db = /^(.*?)\{(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/,
  hb = /^(.*?)\{-(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/,
  gb = /^\$$/,
  mb = /^(.*?)\{\$\}(.*)$/;
function pb(n) {
  n = Bf(n);
  const s = [];
  if (
    (n.slice(0, 1) === '/' &&
      ((n = n.substring(1)), s.push({ type: Rn, value: '/' })),
    !n)
  )
    return s;
  const i = n.split('/').filter(Boolean);
  return (
    s.push(
      ...i.map((o) => {
        const c = o.match(mb);
        if (c) {
          const m = c[1],
            g = c[2];
          return {
            type: $a,
            value: '$',
            prefixSegment: m || void 0,
            suffixSegment: g || void 0,
          };
        }
        const f = o.match(hb);
        if (f) {
          const m = f[1],
            g = f[2],
            d = f[3];
          return {
            type: Qs,
            value: g,
            prefixSegment: m || void 0,
            suffixSegment: d || void 0,
          };
        }
        const h = o.match(db);
        if (h) {
          const m = h[1],
            g = h[2],
            d = h[3];
          return {
            type: qa,
            value: '' + g,
            prefixSegment: m || void 0,
            suffixSegment: d || void 0,
          };
        }
        if (fb.test(o)) {
          const m = o.substring(1);
          return {
            type: qa,
            value: '$' + m,
            prefixSegment: void 0,
            suffixSegment: void 0,
          };
        }
        return gb.test(o)
          ? {
              type: $a,
              value: '$',
              prefixSegment: void 0,
              suffixSegment: void 0,
            }
          : {
              type: Rn,
              value: o.includes('%25')
                ? o
                    .split('%25')
                    .map((m) => decodeURI(m))
                    .join('%25')
                : decodeURI(o),
            };
      })
    ),
    n.slice(-1) === '/' &&
      ((n = n.substring(1)), s.push({ type: Rn, value: '/' })),
    s
  );
}
function No({
  path: n,
  params: s,
  leaveWildcards: i,
  leaveParams: o,
  decodeCharMap: c,
  parseCache: f,
}) {
  const h = Fs(n, f);
  function m(p) {
    const b = s[p],
      T = typeof b == 'string';
    return p === '*' || p === '_splat'
      ? T
        ? encodeURI(b)
        : b
      : T
      ? yb(b, c)
      : b;
  }
  let g = !1;
  const d = {},
    v = Cn(
      h.map((p) => {
        if (p.type === Rn) return p.value;
        if (p.type === $a) {
          d._splat = s._splat;
          const b = p.prefixSegment || '',
            T = p.suffixSegment || '';
          if (!('_splat' in s))
            return (
              (g = !0), i ? `${b}${p.value}${T}` : b || T ? `${b}${T}` : void 0
            );
          const w = m('_splat');
          return i ? `${b}${p.value}${w ?? ''}${T}` : `${b}${w}${T}`;
        }
        if (p.type === qa) {
          const b = p.value.substring(1);
          !g && !(b in s) && (g = !0), (d[b] = s[b]);
          const T = p.prefixSegment || '',
            w = p.suffixSegment || '';
          if (o) {
            const E = m(p.value);
            return `${T}${p.value}${E ?? ''}${w}`;
          }
          return `${T}${m(b) ?? 'undefined'}${w}`;
        }
        if (p.type === Qs) {
          const b = p.value.substring(1),
            T = p.prefixSegment || '',
            w = p.suffixSegment || '';
          if (!(b in s) || s[b] == null)
            return i ? `${T}${b}${w}` : T || w ? `${T}${w}` : void 0;
          if (((d[b] = s[b]), o)) {
            const E = m(p.value);
            return `${T}${p.value}${E ?? ''}${w}`;
          }
          return i ? `${T}${b}${m(b) ?? ''}${w}` : `${T}${m(b) ?? ''}${w}`;
        }
        return p.value;
      })
    );
  return { usedParams: d, interpolatedPath: v, isMissingParams: g };
}
function yb(n, s) {
  let i = encodeURIComponent(n);
  if (s) for (const [o, c] of s) i = i.replaceAll(o, c);
  return i;
}
function Sf(n, s, i, o) {
  const c = vb(n, s, i, o);
  if (!(i.to && !c)) return c ?? {};
}
function Qo(n, s, i = !1) {
  const o = i ? n : n.toLowerCase(),
    c = i ? s : s.toLowerCase();
  switch (!0) {
    case o === '/':
      return s;
    case c === o:
      return '';
    case s.length < n.length:
      return s;
    case c[o.length] !== '/':
      return s;
    case c.startsWith(o):
      return s.slice(n.length);
    default:
      return s;
  }
}
function vb(n, s, { to: i, fuzzy: o, caseSensitive: c }, f) {
  if (n !== '/' && !s.startsWith(n)) return;
  (s = Qo(n, s, c)), (i = Qo(n, `${i ?? '$'}`, c));
  const h = Fs(s.startsWith('/') ? s : `/${s}`, f),
    m = Fs(i.startsWith('/') ? i : `/${i}`, f),
    g = {};
  return Sb(h, m, g, o, c) ? g : void 0;
}
function Sb(n, s, i, o, c) {
  var f, h, m;
  let g = 0,
    d = 0;
  for (; g < n.length || d < s.length; ) {
    const v = n[g],
      p = s[d];
    if (p) {
      if (p.type === $a) {
        const b = n.slice(g);
        let T;
        if (p.prefixSegment || p.suffixSegment) {
          if (!v) return !1;
          const w = p.prefixSegment || '',
            E = p.suffixSegment || '',
            M = v.value;
          if (
            ('prefixSegment' in p && !M.startsWith(w)) ||
            ('suffixSegment' in p &&
              !((f = n[n.length - 1]) != null && f.value.endsWith(E)))
          )
            return !1;
          let O = decodeURI(Cn(b.map((L) => L.value)));
          w && O.startsWith(w) && (O = O.slice(w.length)),
            E && O.endsWith(E) && (O = O.slice(0, O.length - E.length)),
            (T = O);
        } else T = decodeURI(Cn(b.map((w) => w.value)));
        return (i['*'] = T), (i._splat = T), !0;
      }
      if (p.type === Rn) {
        if (p.value === '/' && !v?.value) {
          d++;
          continue;
        }
        if (v) {
          if (c) {
            if (p.value !== v.value) return !1;
          } else if (p.value.toLowerCase() !== v.value.toLowerCase()) return !1;
          g++, d++;
          continue;
        } else return !1;
      }
      if (p.type === qa) {
        if (!v || v.value === '/') return !1;
        let b = '',
          T = !1;
        if (p.prefixSegment || p.suffixSegment) {
          const w = p.prefixSegment || '',
            E = p.suffixSegment || '',
            M = v.value;
          if ((w && !M.startsWith(w)) || (E && !M.endsWith(E))) return !1;
          let O = M;
          w && O.startsWith(w) && (O = O.slice(w.length)),
            E && O.endsWith(E) && (O = O.slice(0, O.length - E.length)),
            (b = decodeURIComponent(O)),
            (T = !0);
        } else (b = decodeURIComponent(v.value)), (T = !0);
        T && ((i[p.value.substring(1)] = b), g++), d++;
        continue;
      }
      if (p.type === Qs) {
        if (!v) {
          d++;
          continue;
        }
        if (v.value === '/') {
          d++;
          continue;
        }
        let b = '',
          T = !1;
        if (p.prefixSegment || p.suffixSegment) {
          const w = p.prefixSegment || '',
            E = p.suffixSegment || '',
            M = v.value;
          if ((!w || M.startsWith(w)) && (!E || M.endsWith(E))) {
            let O = M;
            w && O.startsWith(w) && (O = O.slice(w.length)),
              E && O.endsWith(E) && (O = O.slice(0, O.length - E.length)),
              (b = decodeURIComponent(O)),
              (T = !0);
          }
        } else {
          let w = !0;
          for (let E = d + 1; E < s.length; E++) {
            const M = s[E];
            if (M?.type === Rn && M.value === v.value) {
              w = !1;
              break;
            }
            if (M?.type === qa || M?.type === $a) {
              n.length < s.length && (w = !1);
              break;
            }
          }
          w && ((b = decodeURIComponent(v.value)), (T = !0));
        }
        T && ((i[p.value.substring(1)] = b), g++), d++;
        continue;
      }
    }
    if (g < n.length && d >= s.length)
      return (
        (i['**'] = Cn(n.slice(g).map((b) => b.value))),
        !!o && ((h = s[s.length - 1]) == null ? void 0 : h.value) !== '/'
      );
    if (d < s.length && g >= n.length) {
      for (let b = d; b < s.length; b++)
        if (((m = s[b]) == null ? void 0 : m.type) !== Qs) return !1;
      break;
    }
    break;
  }
  return !0;
}
function rn(n) {
  return !!n?.isNotFound;
}
function bb() {
  try {
    if (typeof window < 'u' && typeof window.sessionStorage == 'object')
      return window.sessionStorage;
  } catch {
    return;
  }
}
const Ko = 'tsr-scroll-restoration-v1_3',
  _b = (n, s) => {
    let i;
    return (...o) => {
      i ||
        (i = setTimeout(() => {
          n(...o), (i = null);
        }, s));
    };
  };
function wb() {
  const n = bb();
  if (!n) return;
  const s = n.getItem(Ko);
  let i = s ? JSON.parse(s) : {};
  return {
    state: i,
    set: (o) => ((i = Ua(o, i) || i), n.setItem(Ko, JSON.stringify(i))),
  };
}
const Au = wb(),
  bf = (n) => n.state.__TSR_key || n.href;
function Tb(n) {
  const s = [];
  let i;
  for (; (i = n.parentNode); )
    s.unshift(`${n.tagName}:nth-child(${[].indexOf.call(i.children, n) + 1})`),
      (n = i);
  return `${s.join(' > ')}`.toLowerCase();
}
let Fo = !1;
function $y({
  storageKey: n,
  key: s,
  behavior: i,
  shouldScrollRestoration: o,
  scrollToTopSelectors: c,
  location: f,
}) {
  var h;
  let m;
  try {
    m = JSON.parse(sessionStorage.getItem(n) || '{}');
  } catch (v) {
    console.error(v);
    return;
  }
  const g = s || ((h = window.history.state) == null ? void 0 : h.key),
    d = m[g];
  (Fo = !0),
    (() => {
      if (o && d && Object.keys(d).length > 0) {
        for (const p in d) {
          const b = d[p];
          if (p === 'window')
            window.scrollTo({ top: b.scrollY, left: b.scrollX, behavior: i });
          else if (p) {
            const T = document.querySelector(p);
            T && ((T.scrollLeft = b.scrollX), (T.scrollTop = b.scrollY));
          }
        }
        return;
      }
      const v = (f ?? window.location).hash.split('#')[1];
      if (v) {
        const p =
          (window.history.state || {}).__hashScrollIntoViewOptions ?? !0;
        if (p) {
          const b = document.getElementById(v);
          b && b.scrollIntoView(p);
        }
        return;
      }
      ['window', ...(c?.filter((p) => p !== 'window') ?? [])].forEach((p) => {
        const b =
          p === 'window'
            ? window
            : typeof p == 'function'
            ? p()
            : document.querySelector(p);
        b && b.scrollTo({ top: 0, left: 0, behavior: i });
      });
    })(),
    (Fo = !1);
}
function Eb(n, s) {
  if (
    Au === void 0 ||
    ((n.options.scrollRestoration ?? !1) && (n.isScrollRestoring = !0),
    typeof document > 'u' || n.isScrollRestorationSetup)
  )
    return;
  (n.isScrollRestorationSetup = !0), (Fo = !1);
  const o = n.options.getScrollRestorationKey || bf;
  window.history.scrollRestoration = 'manual';
  const c = (f) => {
    if (Fo || !n.isScrollRestoring) return;
    let h = '';
    if (f.target === document || f.target === window) h = 'window';
    else {
      const g = f.target.getAttribute('data-scroll-restoration-id');
      g ? (h = `[data-scroll-restoration-id="${g}"]`) : (h = Tb(f.target));
    }
    const m = o(n.state.location);
    Au.set((g) => {
      const d = (g[m] = g[m] || {}),
        v = (d[h] = d[h] || {});
      if (h === 'window')
        (v.scrollX = window.scrollX || 0), (v.scrollY = window.scrollY || 0);
      else if (h) {
        const p = document.querySelector(h);
        p && ((v.scrollX = p.scrollLeft || 0), (v.scrollY = p.scrollTop || 0));
      }
      return g;
    });
  };
  typeof document < 'u' && document.addEventListener('scroll', _b(c, 100), !0),
    n.subscribe('onRendered', (f) => {
      const h = o(f.toLocation);
      if (!n.resetNextScroll) {
        n.resetNextScroll = !0;
        return;
      }
      $y({
        storageKey: Ko,
        key: h,
        behavior: n.options.scrollRestorationBehavior,
        shouldScrollRestoration: n.isScrollRestoring,
        scrollToTopSelectors: n.options.scrollToTopSelectors,
        location: n.history.location,
      }),
        n.isScrollRestoring && Au.set((m) => ((m[h] = m[h] || {}), m));
    });
}
function xb(n) {
  if (typeof document < 'u' && document.querySelector) {
    const s = n.state.location.state.__hashScrollIntoViewOptions ?? !0;
    if (s && n.state.location.hash !== '') {
      const i = document.getElementById(n.state.location.hash);
      i && i.scrollIntoView(s);
    }
  }
}
function Rb(n, s) {
  const i = Object.entries(n).flatMap(([c, f]) =>
    Array.isArray(f) ? f.map((h) => [c, String(h)]) : [[c, String(f)]]
  );
  return '' + new URLSearchParams(i).toString();
}
function Mu(n) {
  return n
    ? n === 'false'
      ? !1
      : n === 'true'
      ? !0
      : +n * 0 === 0 && +n + '' === n
      ? +n
      : n
    : '';
}
function Cb(n, s) {
  const i = n;
  return [...new URLSearchParams(i).entries()].reduce((f, [h, m]) => {
    const g = f[h];
    return (
      g == null
        ? (f[h] = Mu(m))
        : (f[h] = Array.isArray(g) ? [...g, Mu(m)] : [g, Mu(m)]),
      f
    );
  }, {});
}
const Ab = Ob(JSON.parse),
  Mb = kb(JSON.stringify, JSON.parse);
function Ob(n) {
  return (s) => {
    s.substring(0, 1) === '?' && (s = s.substring(1));
    const i = Cb(s);
    for (const o in i) {
      const c = i[o];
      if (typeof c == 'string')
        try {
          i[o] = n(c);
        } catch {}
    }
    return i;
  };
}
function kb(n, s) {
  function i(o) {
    if (typeof o == 'object' && o !== null)
      try {
        return n(o);
      } catch {}
    else if (typeof o == 'string' && typeof s == 'function')
      try {
        return s(o), n(o);
      } catch {}
    return o;
  }
  return (o) => {
    (o = { ...o }),
      Object.keys(o).forEach((f) => {
        const h = o[f];
        typeof h > 'u' || h === void 0 ? delete o[f] : (o[f] = i(h));
      });
    const c = Rb(o).toString();
    return c ? `?${c}` : '';
  };
}
const Gt = '__root__';
function Db(n) {
  if (((n.statusCode = n.statusCode || n.code || 307), !n.reloadDocument))
    try {
      new URL(`${n.href}`), (n.reloadDocument = !0);
    } catch {}
  const s = new Headers(n.headers || {});
  n.href && s.get('Location') === null && s.set('Location', n.href);
  const i = new Response(null, { status: n.statusCode, headers: s });
  if (((i.options = n), n.throw)) throw i;
  return i;
}
function sn(n) {
  return n instanceof Response && !!n.options;
}
function Nb(n) {
  const s = new Map();
  let i, o;
  const c = (f) => {
    f.next &&
      (f.prev
        ? ((f.prev.next = f.next),
          (f.next.prev = f.prev),
          (f.next = void 0),
          o && ((o.next = f), (f.prev = o)))
        : ((f.next.prev = void 0),
          (i = f.next),
          (f.next = void 0),
          o && ((f.prev = o), (o.next = f))),
      (o = f));
  };
  return {
    get(f) {
      const h = s.get(f);
      if (h) return c(h), h.value;
    },
    set(f, h) {
      if (s.size >= n && i) {
        const g = i;
        s.delete(g.key),
          g.next && ((i = g.next), (g.next.prev = void 0)),
          g === o && (o = void 0);
      }
      const m = s.get(f);
      if (m) (m.value = h), c(m);
      else {
        const g = { key: f, value: h, prev: o };
        o && (o.next = g), (o = g), i || (i = g), s.set(f, g);
      }
    },
  };
}
const Io = (n) => {
    var s;
    if (!n.rendered)
      return (n.rendered = !0), (s = n.onReady) == null ? void 0 : s.call(n);
  },
  el = (n, s) =>
    !!(n.preload && !n.router.state.matches.some((i) => i.id === s)),
  Gy = (n, s) => {
    var i;
    const o = n.router.routesById[s.routeId ?? ''] ?? n.router.routeTree;
    !o.options.notFoundComponent &&
      (i = n.router.options) != null &&
      i.defaultNotFoundComponent &&
      (o.options.notFoundComponent = n.router.options.defaultNotFoundComponent),
      On(o.options.notFoundComponent);
    const c = n.matches.find((f) => f.routeId === o.id);
    On(c, 'Could not find match for route: ' + o.id),
      n.updateMatch(c.id, (f) => ({
        ...f,
        status: 'notFound',
        error: s,
        isFetching: !1,
      })),
      s.routerCode === 'BEFORE_LOAD' &&
        o.parentRoute &&
        ((s.routeId = o.parentRoute.id), Gy(n, s));
  },
  ia = (n, s, i) => {
    var o, c, f;
    if (!(!sn(i) && !rn(i))) {
      if (sn(i) && i.redirectHandled && !i.options.reloadDocument) throw i;
      if (s) {
        (o = s._nonReactive.beforeLoadPromise) == null || o.resolve(),
          (c = s._nonReactive.loaderPromise) == null || c.resolve(),
          (s._nonReactive.beforeLoadPromise = void 0),
          (s._nonReactive.loaderPromise = void 0);
        const h = sn(i) ? 'redirected' : 'notFound';
        n.updateMatch(s.id, (m) => ({
          ...m,
          status: h,
          isFetching: !1,
          error: i,
        })),
          rn(i) && !i.routeId && (i.routeId = s.routeId),
          (f = s._nonReactive.loadPromise) == null || f.resolve();
      }
      throw sn(i)
        ? ((n.rendered = !0),
          (i.options._fromLocation = n.location),
          (i.redirectHandled = !0),
          (i = n.router.resolveRedirect(i)),
          i)
        : (Gy(n, i), i);
    }
  },
  Vy = (n, s) => {
    const i = n.router.getMatch(s);
    return !!(
      (!n.router.isServer && i._nonReactive.dehydrated) ||
      (n.router.isServer && i.ssr === !1)
    );
  },
  tr = (n, s, i, o) => {
    var c, f;
    const { id: h, routeId: m } = n.matches[s],
      g = n.router.looseRoutesById[m];
    if (i instanceof Promise) throw i;
    (i.routerCode = o),
      n.firstBadMatchIndex ?? (n.firstBadMatchIndex = s),
      ia(n, n.router.getMatch(h), i);
    try {
      (f = (c = g.options).onError) == null || f.call(c, i);
    } catch (d) {
      (i = d), ia(n, n.router.getMatch(h), i);
    }
    n.updateMatch(h, (d) => {
      var v, p;
      return (
        (v = d._nonReactive.beforeLoadPromise) == null || v.resolve(),
        (d._nonReactive.beforeLoadPromise = void 0),
        (p = d._nonReactive.loadPromise) == null || p.resolve(),
        {
          ...d,
          error: i,
          status: 'error',
          isFetching: !1,
          updatedAt: Date.now(),
          abortController: new AbortController(),
        }
      );
    });
  },
  Lb = (n, s, i, o) => {
    var c;
    const f = n.router.getMatch(s),
      h = (c = n.matches[i - 1]) == null ? void 0 : c.id,
      m = h ? n.router.getMatch(h) : void 0;
    if (n.router.isShell()) {
      f.ssr = s === Gt;
      return;
    }
    if (m?.ssr === !1) {
      f.ssr = !1;
      return;
    }
    const g = (w) => (w === !0 && m?.ssr === 'data-only' ? 'data-only' : w),
      d = n.router.options.defaultSsr ?? !0;
    if (o.options.ssr === void 0) {
      f.ssr = g(d);
      return;
    }
    if (typeof o.options.ssr != 'function') {
      f.ssr = g(o.options.ssr);
      return;
    }
    const { search: v, params: p } = f,
      b = {
        search: Lo(v, f.searchError),
        params: Lo(p, f.paramsError),
        location: n.location,
        matches: n.matches.map((w) => ({
          index: w.index,
          pathname: w.pathname,
          fullPath: w.fullPath,
          staticData: w.staticData,
          id: w.id,
          routeId: w.routeId,
          search: Lo(w.search, w.searchError),
          params: Lo(w.params, w.paramsError),
          ssr: w.ssr,
        })),
      },
      T = o.options.ssr(b);
    if (la(T))
      return T.then((w) => {
        f.ssr = g(w ?? d);
      });
    f.ssr = g(T ?? d);
  },
  Qy = (n, s, i, o) => {
    var c;
    if (o._nonReactive.pendingTimeout !== void 0) return;
    const f = i.options.pendingMs ?? n.router.options.defaultPendingMs;
    if (
      !!(
        n.onReady &&
        !n.router.isServer &&
        !el(n, s) &&
        (i.options.loader || i.options.beforeLoad || Yy(i)) &&
        typeof f == 'number' &&
        f !== 1 / 0 &&
        (i.options.pendingComponent ??
          ((c = n.router.options) == null ? void 0 : c.defaultPendingComponent))
      )
    ) {
      const m = setTimeout(() => {
        Io(n);
      }, f);
      o._nonReactive.pendingTimeout = m;
    }
  },
  jb = (n, s, i) => {
    const o = n.router.getMatch(s);
    if (!o._nonReactive.beforeLoadPromise && !o._nonReactive.loaderPromise)
      return !0;
    Qy(n, s, i, o);
    const c = () => {
      let f = !0;
      const h = n.router.getMatch(s);
      return (
        h.status === 'error'
          ? (f = !0)
          : h.preload &&
            (h.status === 'redirected' || h.status === 'notFound') &&
            ia(n, h, h.error),
        f
      );
    };
    return o._nonReactive.beforeLoadPromise
      ? o._nonReactive.beforeLoadPromise.then(c)
      : c();
  },
  Bb = (n, s, i, o) => {
    var c;
    const f = n.router.getMatch(s),
      h = f._nonReactive.loadPromise;
    f._nonReactive.loadPromise = Vs(() => {
      h?.resolve();
    });
    const { paramsError: m, searchError: g } = f;
    m && tr(n, i, m, 'PARSE_PARAMS'),
      g && tr(n, i, g, 'VALIDATE_SEARCH'),
      Qy(n, s, o, f);
    const d = new AbortController(),
      v = (c = n.matches[i - 1]) == null ? void 0 : c.id,
      p = v ? n.router.getMatch(v) : void 0,
      T = {
        ...(p?.context ?? n.router.options.context ?? void 0),
        ...f.__routeContext,
      };
    let w = !1;
    const E = () => {
        w ||
          ((w = !0),
          n.updateMatch(s, (K) => ({
            ...K,
            isFetching: 'beforeLoad',
            fetchCount: K.fetchCount + 1,
            abortController: d,
            context: T,
          })));
      },
      M = () => {
        var K;
        (K = f._nonReactive.beforeLoadPromise) == null || K.resolve(),
          (f._nonReactive.beforeLoadPromise = void 0),
          n.updateMatch(s, (X) => ({ ...X, isFetching: !1 }));
      };
    if (!o.options.beforeLoad) {
      lr(() => {
        E(), M();
      });
      return;
    }
    f._nonReactive.beforeLoadPromise = Vs();
    const { search: O, params: L, cause: U } = f,
      G = el(n, s),
      I = {
        search: O,
        abortController: d,
        params: L,
        preload: G,
        context: T,
        location: n.location,
        navigate: (K) => n.router.navigate({ ...K, _fromLocation: n.location }),
        buildLocation: n.router.buildLocation,
        cause: G ? 'preload' : U,
        matches: n.matches,
      },
      Z = (K) => {
        if (K === void 0) {
          lr(() => {
            E(), M();
          });
          return;
        }
        (sn(K) || rn(K)) && (E(), tr(n, i, K, 'BEFORE_LOAD')),
          lr(() => {
            E(),
              n.updateMatch(s, (X) => ({
                ...X,
                __beforeLoadContext: K,
                context: { ...X.context, ...K },
              })),
              M();
          });
      };
    let Y;
    try {
      if (((Y = o.options.beforeLoad(I)), la(Y)))
        return (
          E(),
          Y.catch((K) => {
            tr(n, i, K, 'BEFORE_LOAD');
          }).then(Z)
        );
    } catch (K) {
      E(), tr(n, i, K, 'BEFORE_LOAD');
    }
    Z(Y);
  },
  zb = (n, s) => {
    const { id: i, routeId: o } = n.matches[s],
      c = n.router.looseRoutesById[o],
      f = () => {
        if (n.router.isServer) {
          const g = Lb(n, i, s, c);
          if (la(g)) return g.then(h);
        }
        return h();
      },
      h = () => {
        if (Vy(n, i)) return;
        const g = jb(n, i, c);
        return la(g) ? g.then(m) : m(g);
      },
      m = (g) => {
        if (g) return Bb(n, i, s, c);
      };
    return f();
  },
  cr = (n, s, i) => {
    var o, c, f, h, m, g;
    const d = n.router.getMatch(s);
    if (!d || (!i.options.head && !i.options.scripts && !i.options.headers))
      return;
    const v = {
      matches: n.matches,
      match: d,
      params: d.params,
      loaderData: d.loaderData,
    };
    return Promise.all([
      (c = (o = i.options).head) == null ? void 0 : c.call(o, v),
      (h = (f = i.options).scripts) == null ? void 0 : h.call(f, v),
      (g = (m = i.options).headers) == null ? void 0 : g.call(m, v),
    ]).then(([p, b, T]) => {
      const w = p?.meta,
        E = p?.links,
        M = p?.scripts,
        O = p?.styles;
      return {
        meta: w,
        links: E,
        headScripts: M,
        headers: T,
        scripts: b,
        styles: O,
      };
    });
  },
  Ky = (n, s, i, o) => {
    const c = n.matchPromises[i - 1],
      {
        params: f,
        loaderDeps: h,
        abortController: m,
        context: g,
        cause: d,
      } = n.router.getMatch(s),
      v = el(n, s);
    return {
      params: f,
      deps: h,
      preload: !!v,
      parentMatchPromise: c,
      abortController: m,
      context: g,
      location: n.location,
      navigate: (p) => n.router.navigate({ ...p, _fromLocation: n.location }),
      cause: v ? 'preload' : d,
      route: o,
    };
  },
  bp = async (n, s, i, o) => {
    var c, f, h, m;
    try {
      const g = n.router.getMatch(s);
      try {
        (!n.router.isServer || g.ssr === !0) && Fy(o);
        const d =
            (f = (c = o.options).loader) == null
              ? void 0
              : f.call(c, Ky(n, s, i, o)),
          v = o.options.loader && la(d);
        if (
          (!!(
            v ||
            o._lazyPromise ||
            o._componentsPromise ||
            o.options.head ||
            o.options.scripts ||
            o.options.headers ||
            g._nonReactive.minPendingPromise
          ) && n.updateMatch(s, (E) => ({ ...E, isFetching: 'loader' })),
          o.options.loader)
        ) {
          const E = v ? await d : d;
          ia(n, n.router.getMatch(s), E),
            E !== void 0 && n.updateMatch(s, (M) => ({ ...M, loaderData: E }));
        }
        o._lazyPromise && (await o._lazyPromise);
        const b = cr(n, s, o),
          T = b ? await b : void 0,
          w = g._nonReactive.minPendingPromise;
        w && (await w),
          o._componentsPromise && (await o._componentsPromise),
          n.updateMatch(s, (E) => ({
            ...E,
            error: void 0,
            status: 'success',
            isFetching: !1,
            updatedAt: Date.now(),
            ...T,
          }));
      } catch (d) {
        let v = d;
        const p = g._nonReactive.minPendingPromise;
        p && (await p), ia(n, n.router.getMatch(s), d);
        try {
          (m = (h = o.options).onError) == null || m.call(h, d);
        } catch (w) {
          (v = w), ia(n, n.router.getMatch(s), w);
        }
        const b = cr(n, s, o),
          T = b ? await b : void 0;
        n.updateMatch(s, (w) => ({
          ...w,
          error: v,
          status: 'error',
          isFetching: !1,
          ...T,
        }));
      }
    } catch (g) {
      const d = n.router.getMatch(s);
      if (d) {
        const v = cr(n, s, o);
        if (v) {
          const p = await v;
          n.updateMatch(s, (b) => ({ ...b, ...p }));
        }
        d._nonReactive.loaderPromise = void 0;
      }
      ia(n, d, g);
    }
  },
  Ub = async (n, s) => {
    var i, o;
    const { id: c, routeId: f } = n.matches[s];
    let h = !1,
      m = !1;
    const g = n.router.looseRoutesById[f];
    if (Vy(n, c)) {
      if (n.router.isServer) {
        const p = cr(n, c, g);
        if (p) {
          const b = await p;
          n.updateMatch(c, (T) => ({ ...T, ...b }));
        }
        return n.router.getMatch(c);
      }
    } else {
      const p = n.router.getMatch(c);
      if (p._nonReactive.loaderPromise) {
        if (p.status === 'success' && !n.sync && !p.preload) return p;
        await p._nonReactive.loaderPromise;
        const b = n.router.getMatch(c);
        b.error && ia(n, b, b.error);
      } else {
        const b = Date.now() - p.updatedAt,
          T = el(n, c),
          w = T
            ? g.options.preloadStaleTime ??
              n.router.options.defaultPreloadStaleTime ??
              3e4
            : g.options.staleTime ?? n.router.options.defaultStaleTime ?? 0,
          E = g.options.shouldReload,
          M = typeof E == 'function' ? E(Ky(n, c, s, g)) : E,
          O = !!T && !n.router.state.matches.some((I) => I.id === c),
          L = n.router.getMatch(c);
        (L._nonReactive.loaderPromise = Vs()),
          O !== L.preload && n.updateMatch(c, (I) => ({ ...I, preload: O }));
        const { status: U, invalid: G } = L;
        if (
          ((h = U === 'success' && (G || (M ?? b > w))),
          !(T && g.options.preload === !1))
        )
          if (h && !n.sync)
            (m = !0),
              (async () => {
                var I, Z;
                try {
                  await bp(n, c, s, g);
                  const Y = n.router.getMatch(c);
                  (I = Y._nonReactive.loaderPromise) == null || I.resolve(),
                    (Z = Y._nonReactive.loadPromise) == null || Z.resolve(),
                    (Y._nonReactive.loaderPromise = void 0);
                } catch (Y) {
                  sn(Y) && (await n.router.navigate(Y.options));
                }
              })();
          else if (U !== 'success' || (h && n.sync)) await bp(n, c, s, g);
          else {
            const I = cr(n, c, g);
            if (I) {
              const Z = await I;
              n.updateMatch(c, (Y) => ({ ...Y, ...Z }));
            }
          }
      }
    }
    const d = n.router.getMatch(c);
    m ||
      ((i = d._nonReactive.loaderPromise) == null || i.resolve(),
      (o = d._nonReactive.loadPromise) == null || o.resolve()),
      clearTimeout(d._nonReactive.pendingTimeout),
      (d._nonReactive.pendingTimeout = void 0),
      m || (d._nonReactive.loaderPromise = void 0),
      (d._nonReactive.dehydrated = void 0);
    const v = m ? d.isFetching : !1;
    return v !== d.isFetching || d.invalid !== !1
      ? (n.updateMatch(c, (p) => ({ ...p, isFetching: v, invalid: !1 })),
        n.router.getMatch(c))
      : d;
  };
async function _p(n) {
  const s = Object.assign(n, { matchPromises: [] });
  !s.router.isServer &&
    s.router.state.matches.some((i) => i._forcePending) &&
    Io(s);
  try {
    for (let c = 0; c < s.matches.length; c++) {
      const f = zb(s, c);
      la(f) && (await f);
    }
    const i = s.firstBadMatchIndex ?? s.matches.length;
    for (let c = 0; c < i; c++) s.matchPromises.push(Ub(s, c));
    await Promise.all(s.matchPromises);
    const o = Io(s);
    la(o) && (await o);
  } catch (i) {
    if (rn(i) && !s.preload) {
      const o = Io(s);
      throw (la(o) && (await o), i);
    }
    if (sn(i)) throw i;
  }
  return s.matches;
}
async function Fy(n) {
  if (
    (!n._lazyLoaded &&
      n._lazyPromise === void 0 &&
      (n.lazyFn
        ? (n._lazyPromise = n.lazyFn().then((s) => {
            const { id: i, ...o } = s.options;
            Object.assign(n.options, o),
              (n._lazyLoaded = !0),
              (n._lazyPromise = void 0);
          }))
        : (n._lazyLoaded = !0)),
    !n._componentsLoaded && n._componentsPromise === void 0)
  ) {
    const s = () => {
      var i;
      const o = [];
      for (const c of Xy) {
        const f = (i = n.options[c]) == null ? void 0 : i.preload;
        f && o.push(f());
      }
      if (o.length)
        return Promise.all(o).then(() => {
          (n._componentsLoaded = !0), (n._componentsPromise = void 0);
        });
      (n._componentsLoaded = !0), (n._componentsPromise = void 0);
    };
    n._componentsPromise = n._lazyPromise ? n._lazyPromise.then(s) : s();
  }
  return n._componentsPromise;
}
function Lo(n, s) {
  return s ? { status: 'error', error: s } : { status: 'success', value: n };
}
function Yy(n) {
  var s;
  for (const i of Xy) if ((s = n.options[i]) != null && s.preload) return !0;
  return !1;
}
const Xy = [
  'component',
  'errorComponent',
  'pendingComponent',
  'notFoundComponent',
];
function Ia(n) {
  const s = n.resolvedLocation,
    i = n.location,
    o = s?.pathname !== i.pathname,
    c = s?.href !== i.href,
    f = s?.hash !== i.hash;
  return {
    fromLocation: s,
    toLocation: i,
    pathChanged: o,
    hrefChanged: c,
    hashChanged: f,
  };
}
class Ib {
  constructor(s) {
    (this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`),
      (this.resetNextScroll = !0),
      (this.shouldViewTransition = void 0),
      (this.isViewTransitionTypesSupported = void 0),
      (this.subscribers = new Set()),
      (this.isScrollRestoring = !1),
      (this.isScrollRestorationSetup = !1),
      (this.startTransition = (i) => i()),
      (this.update = (i) => {
        var o;
        i.notFoundRoute &&
          console.warn(
            'The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.'
          );
        const c = this.options;
        (this.options = { ...this.options, ...i }),
          (this.isServer = this.options.isServer ?? typeof document > 'u'),
          (this.pathParamsDecodeCharMap = this.options
            .pathParamsAllowedCharacters
            ? new Map(
                this.options.pathParamsAllowedCharacters.map((f) => [
                  encodeURIComponent(f),
                  f,
                ])
              )
            : void 0),
          (!this.basepath || (i.basepath && i.basepath !== c.basepath)) &&
            (i.basepath === void 0 || i.basepath === '' || i.basepath === '/'
              ? (this.basepath = '/')
              : (this.basepath = `/${Cu(i.basepath)}`)),
          (!this.history ||
            (this.options.history && this.options.history !== this.history)) &&
            ((this.history =
              this.options.history ??
              (this.isServer
                ? rb({ initialEntries: [this.basepath || '/'] })
                : ib())),
            this.updateLatestLocation()),
          this.options.routeTree !== this.routeTree &&
            ((this.routeTree = this.options.routeTree), this.buildRouteTree()),
          this.__store ||
            ((this.__store = new mf(Pb(this.latestLocation), {
              onUpdate: () => {
                this.__store.state = {
                  ...this.state,
                  cachedMatches: this.state.cachedMatches.filter(
                    (f) => !['redirected'].includes(f.status)
                  ),
                };
              },
            })),
            Eb(this)),
          typeof window < 'u' &&
            'CSS' in window &&
            typeof ((o = window.CSS) == null ? void 0 : o.supports) ==
              'function' &&
            (this.isViewTransitionTypesSupported = window.CSS.supports(
              'selector(:active-view-transition-type(a)'
            ));
      }),
      (this.updateLatestLocation = () => {
        this.latestLocation = this.parseLocation(
          this.history.location,
          this.latestLocation
        );
      }),
      (this.buildRouteTree = () => {
        const {
          routesById: i,
          routesByPath: o,
          flatRoutes: c,
        } = Fb({
          routeTree: this.routeTree,
          initRoute: (h, m) => {
            h.init({ originalIndex: m });
          },
        });
        (this.routesById = i), (this.routesByPath = o), (this.flatRoutes = c);
        const f = this.options.notFoundRoute;
        f &&
          (f.init({ originalIndex: 99999999999 }), (this.routesById[f.id] = f));
      }),
      (this.subscribe = (i, o) => {
        const c = { eventType: i, fn: o };
        return (
          this.subscribers.add(c),
          () => {
            this.subscribers.delete(c);
          }
        );
      }),
      (this.emit = (i) => {
        this.subscribers.forEach((o) => {
          o.eventType === i.type && o.fn(i);
        });
      }),
      (this.parseLocation = (i, o) => {
        const c = ({ pathname: g, search: d, hash: v, state: p }) => {
            const b = this.options.parseSearch(d),
              T = this.options.stringifySearch(b);
            return {
              pathname: g,
              searchStr: T,
              search: qt(o?.search, b),
              hash: v.split('#').reverse()[0] ?? '',
              href: `${g}${T}${v}`,
              state: qt(o?.state, p),
            };
          },
          f = c(i),
          { __tempLocation: h, __tempKey: m } = f.state;
        if (h && (!m || m === this.tempLocationKey)) {
          const g = c(h);
          return (
            (g.state.key = f.state.key),
            (g.state.__TSR_key = f.state.__TSR_key),
            delete g.state.__tempLocation,
            { ...g, maskedLocation: f }
          );
        }
        return f;
      }),
      (this.resolvePathWithBase = (i, o) =>
        ub({
          basepath: this.basepath,
          base: i,
          to: Bf(o),
          trailingSlash: this.options.trailingSlash,
          caseSensitive: this.options.caseSensitive,
          parseCache: this.parsePathnameCache,
        })),
      (this.matchRoutes = (i, o, c) =>
        typeof i == 'string'
          ? this.matchRoutesInternal({ pathname: i, search: o }, c)
          : this.matchRoutesInternal(i, o)),
      (this.parsePathnameCache = Nb(1e3)),
      (this.getMatchedRoutes = (i, o) =>
        Yb({
          pathname: i,
          routePathname: o,
          basepath: this.basepath,
          caseSensitive: this.options.caseSensitive,
          routesByPath: this.routesByPath,
          routesById: this.routesById,
          flatRoutes: this.flatRoutes,
          parseCache: this.parsePathnameCache,
        })),
      (this.cancelMatch = (i) => {
        const o = this.getMatch(i);
        o &&
          (o.abortController.abort(),
          clearTimeout(o._nonReactive.pendingTimeout),
          (o._nonReactive.pendingTimeout = void 0));
      }),
      (this.cancelMatches = () => {
        var i;
        (i = this.state.pendingMatches) == null ||
          i.forEach((o) => {
            this.cancelMatch(o.id);
          });
      }),
      (this.buildLocation = (i) => {
        const o = (f = {}) => {
            var h;
            const m = f._fromLocation || this.latestLocation,
              g = this.matchRoutes(m, { _buildLocation: !0 }),
              d = yf(g);
            let v = this.resolvePathWithBase(d.fullPath, '.');
            const p = f.to
                ? this.resolvePathWithBase(v, `${f.to}`)
                : this.resolvePathWithBase(v, '.'),
              b = !!f.to && !Tp(f.to.toString(), v) && !Tp(p, v);
            f.unsafeRelative === 'path'
              ? (v = m.pathname)
              : b && f.from && (v = f.from),
              (v = this.resolvePathWithBase(v, '.'));
            const T = d.search,
              w = { ...d.params },
              E = f.to
                ? this.resolvePathWithBase(v, `${f.to}`)
                : this.resolvePathWithBase(v, '.');
            let M =
              f.params === !1 || f.params === null
                ? {}
                : (f.params ?? !0) === !0
                ? w
                : { ...w, ...Ua(f.params, w) };
            const O = No({
                path: E,
                params: M ?? {},
                parseCache: this.parsePathnameCache,
              }).interpolatedPath,
              L = this.matchRoutes(O, void 0, { _buildLocation: !0 }).map(
                (X) => this.looseRoutesById[X.routeId]
              );
            Object.keys(M).length > 0 &&
              L.map((X) => {
                var F;
                return (
                  ((F = X.options.params) == null ? void 0 : F.stringify) ??
                  X.options.stringifyParams
                );
              })
                .filter(Boolean)
                .forEach((X) => {
                  M = { ...M, ...X(M) };
                });
            const U = No({
              path: E,
              params: M ?? {},
              leaveWildcards: !1,
              leaveParams: i.leaveParams,
              decodeCharMap: this.pathParamsDecodeCharMap,
              parseCache: this.parsePathnameCache,
            }).interpolatedPath;
            let G = T;
            if (
              i._includeValidateSearch &&
              (h = this.options.search) != null &&
              h.strict
            ) {
              let X = {};
              L.forEach((F) => {
                try {
                  F.options.validateSearch &&
                    (X = {
                      ...X,
                      ...(_f(F.options.validateSearch, { ...X, ...G }) ?? {}),
                    });
                } catch {}
              }),
                (G = X);
            }
            (G = Xb({
              search: G,
              dest: f,
              destRoutes: L,
              _includeValidateSearch: i._includeValidateSearch,
            })),
              (G = qt(T, G));
            const I = this.options.stringifySearch(G),
              Z = f.hash === !0 ? m.hash : f.hash ? Ua(f.hash, m.hash) : void 0,
              Y = Z ? `#${Z}` : '';
            let K =
              f.state === !0 ? m.state : f.state ? Ua(f.state, m.state) : {};
            return (
              (K = qt(m.state, K)),
              {
                pathname: U,
                search: G,
                searchStr: I,
                state: K,
                hash: Z ?? '',
                href: `${U}${I}${Y}`,
                unmaskOnReload: f.unmaskOnReload,
              }
            );
          },
          c = (f = {}, h) => {
            var m;
            const g = o(f);
            let d = h ? o(h) : void 0;
            if (!d) {
              let v = {};
              const p =
                (m = this.options.routeMasks) == null
                  ? void 0
                  : m.find((b) => {
                      const T = Sf(
                        this.basepath,
                        g.pathname,
                        { to: b.from, caseSensitive: !1, fuzzy: !1 },
                        this.parsePathnameCache
                      );
                      return T ? ((v = T), !0) : !1;
                    });
              if (p) {
                const { from: b, ...T } = p;
                (h = { ...mp(i, ['from']), ...T, params: v }), (d = o(h));
              }
            }
            if (d) {
              const v = o(h);
              g.maskedLocation = v;
            }
            return g;
          };
        return i.mask ? c(i, { ...mp(i, ['from']), ...i.mask }) : c(i);
      }),
      (this.commitLocation = ({
        viewTransition: i,
        ignoreBlocker: o,
        ...c
      }) => {
        const f = () => {
            const g = [
              'key',
              '__TSR_key',
              '__TSR_index',
              '__hashScrollIntoViewOptions',
            ];
            g.forEach((v) => {
              c.state[v] = this.latestLocation.state[v];
            });
            const d = Gs(c.state, this.latestLocation.state);
            return (
              g.forEach((v) => {
                delete c.state[v];
              }),
              d
            );
          },
          h = this.latestLocation.href === c.href,
          m = this.commitLocationPromise;
        if (
          ((this.commitLocationPromise = Vs(() => {
            m?.resolve();
          })),
          h && f())
        )
          this.load();
        else {
          let { maskedLocation: g, hashScrollIntoView: d, ...v } = c;
          g &&
            ((v = {
              ...g,
              state: {
                ...g.state,
                __tempKey: void 0,
                __tempLocation: {
                  ...v,
                  search: v.searchStr,
                  state: {
                    ...v.state,
                    __tempKey: void 0,
                    __tempLocation: void 0,
                    __TSR_key: void 0,
                    key: void 0,
                  },
                },
              },
            }),
            (v.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) &&
              (v.state.__tempKey = this.tempLocationKey)),
            (v.state.__hashScrollIntoViewOptions =
              d ?? this.options.defaultHashScrollIntoView ?? !0),
            (this.shouldViewTransition = i),
            this.history[c.replace ? 'replace' : 'push'](v.href, v.state, {
              ignoreBlocker: o,
            });
        }
        return (
          (this.resetNextScroll = c.resetScroll ?? !0),
          this.history.subscribers.size || this.load(),
          this.commitLocationPromise
        );
      }),
      (this.buildAndCommitLocation = ({
        replace: i,
        resetScroll: o,
        hashScrollIntoView: c,
        viewTransition: f,
        ignoreBlocker: h,
        href: m,
        ...g
      } = {}) => {
        if (m) {
          const v = this.history.location.state.__TSR_index,
            p = fr(m, { __TSR_index: i ? v : v + 1 });
          (g.to = p.pathname),
            (g.search = this.options.parseSearch(p.search)),
            (g.hash = p.hash.slice(1));
        }
        const d = this.buildLocation({ ...g, _includeValidateSearch: !0 });
        return this.commitLocation({
          ...d,
          viewTransition: f,
          replace: i,
          resetScroll: o,
          hashScrollIntoView: c,
          ignoreBlocker: h,
        });
      }),
      (this.navigate = ({ to: i, reloadDocument: o, href: c, ...f }) => {
        if (!o && c)
          try {
            new URL(`${c}`), (o = !0);
          } catch {}
        if (o) {
          if (!c) {
            const h = this.buildLocation({ to: i, ...f });
            c = this.history.createHref(h.href);
          }
          return (
            f.replace ? window.location.replace(c) : (window.location.href = c),
            Promise.resolve()
          );
        }
        return this.buildAndCommitLocation({
          ...f,
          href: c,
          to: i,
          _isNavigate: !0,
        });
      }),
      (this.beforeLoad = () => {
        if (
          (this.cancelMatches(), this.updateLatestLocation(), this.isServer)
        ) {
          const o = this.buildLocation({
              to: this.latestLocation.pathname,
              search: !0,
              params: !0,
              hash: !0,
              state: !0,
              _includeValidateSearch: !0,
            }),
            c = (f) => {
              try {
                return encodeURI(decodeURI(f));
              } catch {
                return f;
              }
            };
          if (Cu(c(this.latestLocation.href)) !== Cu(c(o.href)))
            throw Db({ href: o.href });
        }
        const i = this.matchRoutes(this.latestLocation);
        this.__store.setState((o) => ({
          ...o,
          status: 'pending',
          statusCode: 200,
          isLoading: !0,
          location: this.latestLocation,
          pendingMatches: i,
          cachedMatches: o.cachedMatches.filter(
            (c) => !i.some((f) => f.id === c.id)
          ),
        }));
      }),
      (this.load = async (i) => {
        let o, c, f;
        for (
          f = new Promise((h) => {
            this.startTransition(async () => {
              var m;
              try {
                this.beforeLoad();
                const g = this.latestLocation,
                  d = this.state.resolvedLocation;
                this.state.redirect ||
                  this.emit({
                    type: 'onBeforeNavigate',
                    ...Ia({ resolvedLocation: d, location: g }),
                  }),
                  this.emit({
                    type: 'onBeforeLoad',
                    ...Ia({ resolvedLocation: d, location: g }),
                  }),
                  await _p({
                    router: this,
                    sync: i?.sync,
                    matches: this.state.pendingMatches,
                    location: g,
                    updateMatch: this.updateMatch,
                    onReady: async () => {
                      this.startViewTransition(async () => {
                        let v, p, b;
                        lr(() => {
                          this.__store.setState((T) => {
                            const w = T.matches,
                              E = T.pendingMatches || T.matches;
                            return (
                              (v = w.filter(
                                (M) => !E.some((O) => O.id === M.id)
                              )),
                              (p = E.filter(
                                (M) => !w.some((O) => O.id === M.id)
                              )),
                              (b = w.filter((M) =>
                                E.some((O) => O.id === M.id)
                              )),
                              {
                                ...T,
                                isLoading: !1,
                                loadedAt: Date.now(),
                                matches: E,
                                pendingMatches: void 0,
                                cachedMatches: [
                                  ...T.cachedMatches,
                                  ...v.filter((M) => M.status !== 'error'),
                                ],
                              }
                            );
                          }),
                            this.clearExpiredCache();
                        }),
                          [
                            [v, 'onLeave'],
                            [p, 'onEnter'],
                            [b, 'onStay'],
                          ].forEach(([T, w]) => {
                            T.forEach((E) => {
                              var M, O;
                              (O = (M =
                                this.looseRoutesById[E.routeId].options)[w]) ==
                                null || O.call(M, E);
                            });
                          });
                      });
                    },
                  });
              } catch (g) {
                sn(g)
                  ? ((o = g),
                    this.isServer ||
                      this.navigate({
                        ...o.options,
                        replace: !0,
                        ignoreBlocker: !0,
                      }))
                  : rn(g) && (c = g),
                  this.__store.setState((d) => ({
                    ...d,
                    statusCode: o
                      ? o.status
                      : c
                      ? 404
                      : d.matches.some((v) => v.status === 'error')
                      ? 500
                      : 200,
                    redirect: o,
                  }));
              }
              this.latestLoadPromise === f &&
                ((m = this.commitLocationPromise) == null || m.resolve(),
                (this.latestLoadPromise = void 0),
                (this.commitLocationPromise = void 0)),
                h();
            });
          }),
            this.latestLoadPromise = f,
            await f;
          this.latestLoadPromise && f !== this.latestLoadPromise;

        )
          await this.latestLoadPromise;
        this.hasNotFoundMatch() &&
          this.__store.setState((h) => ({ ...h, statusCode: 404 }));
      }),
      (this.startViewTransition = (i) => {
        const o =
          this.shouldViewTransition ?? this.options.defaultViewTransition;
        if (
          (delete this.shouldViewTransition,
          o &&
            typeof document < 'u' &&
            'startViewTransition' in document &&
            typeof document.startViewTransition == 'function')
        ) {
          let c;
          if (typeof o == 'object' && this.isViewTransitionTypesSupported) {
            const f = this.latestLocation,
              h = this.state.resolvedLocation,
              m =
                typeof o.types == 'function'
                  ? o.types(Ia({ resolvedLocation: h, location: f }))
                  : o.types;
            c = { update: i, types: m };
          } else c = i;
          document.startViewTransition(c);
        } else i();
      }),
      (this.updateMatch = (i, o) => {
        var c;
        const f =
          (c = this.state.pendingMatches) != null && c.some((h) => h.id === i)
            ? 'pendingMatches'
            : this.state.matches.some((h) => h.id === i)
            ? 'matches'
            : this.state.cachedMatches.some((h) => h.id === i)
            ? 'cachedMatches'
            : '';
        f &&
          this.__store.setState((h) => {
            var m;
            return {
              ...h,
              [f]:
                (m = h[f]) == null
                  ? void 0
                  : m.map((g) => (g.id === i ? o(g) : g)),
            };
          });
      }),
      (this.getMatch = (i) => {
        var o;
        const c = (f) => f.id === i;
        return (
          this.state.cachedMatches.find(c) ??
          ((o = this.state.pendingMatches) == null ? void 0 : o.find(c)) ??
          this.state.matches.find(c)
        );
      }),
      (this.invalidate = (i) => {
        const o = (c) => {
          var f;
          return ((f = i?.filter) == null ? void 0 : f.call(i, c)) ?? !0
            ? {
                ...c,
                invalid: !0,
                ...(i?.forcePending || c.status === 'error'
                  ? { status: 'pending', error: void 0 }
                  : void 0),
              }
            : c;
        };
        return (
          this.__store.setState((c) => {
            var f;
            return {
              ...c,
              matches: c.matches.map(o),
              cachedMatches: c.cachedMatches.map(o),
              pendingMatches:
                (f = c.pendingMatches) == null ? void 0 : f.map(o),
            };
          }),
          (this.shouldViewTransition = !1),
          this.load({ sync: i?.sync })
        );
      }),
      (this.resolveRedirect = (i) => (
        i.options.href ||
          ((i.options.href = this.buildLocation(i.options).href),
          i.headers.set('Location', i.options.href)),
        i.headers.get('Location') || i.headers.set('Location', i.options.href),
        i
      )),
      (this.clearCache = (i) => {
        const o = i?.filter;
        o !== void 0
          ? this.__store.setState((c) => ({
              ...c,
              cachedMatches: c.cachedMatches.filter((f) => !o(f)),
            }))
          : this.__store.setState((c) => ({ ...c, cachedMatches: [] }));
      }),
      (this.clearExpiredCache = () => {
        const i = (o) => {
          const c = this.looseRoutesById[o.routeId];
          if (!c.options.loader) return !0;
          const f =
            (o.preload
              ? c.options.preloadGcTime ?? this.options.defaultPreloadGcTime
              : c.options.gcTime ?? this.options.defaultGcTime) ?? 300 * 1e3;
          return o.status === 'error' ? !0 : Date.now() - o.updatedAt >= f;
        };
        this.clearCache({ filter: i });
      }),
      (this.loadRouteChunk = Fy),
      (this.preloadRoute = async (i) => {
        const o = this.buildLocation(i);
        let c = this.matchRoutes(o, { throwOnError: !0, preload: !0, dest: i });
        const f = new Set(
            [...this.state.matches, ...(this.state.pendingMatches ?? [])].map(
              (m) => m.id
            )
          ),
          h = new Set([...f, ...this.state.cachedMatches.map((m) => m.id)]);
        lr(() => {
          c.forEach((m) => {
            h.has(m.id) ||
              this.__store.setState((g) => ({
                ...g,
                cachedMatches: [...g.cachedMatches, m],
              }));
          });
        });
        try {
          return (
            (c = await _p({
              router: this,
              matches: c,
              location: o,
              preload: !0,
              updateMatch: (m, g) => {
                f.has(m)
                  ? (c = c.map((d) => (d.id === m ? g(d) : d)))
                  : this.updateMatch(m, g);
              },
            })),
            c
          );
        } catch (m) {
          if (sn(m))
            return m.options.reloadDocument
              ? void 0
              : await this.preloadRoute({ ...m.options, _fromLocation: o });
          rn(m) || console.error(m);
          return;
        }
      }),
      (this.matchRoute = (i, o) => {
        const c = {
            ...i,
            to: i.to ? this.resolvePathWithBase(i.from || '', i.to) : void 0,
            params: i.params || {},
            leaveParams: !0,
          },
          f = this.buildLocation(c);
        if (o?.pending && this.state.status !== 'pending') return !1;
        const m = (o?.pending === void 0 ? !this.state.isLoading : o.pending)
            ? this.latestLocation
            : this.state.resolvedLocation || this.state.location,
          g = Sf(
            this.basepath,
            m.pathname,
            { ...o, to: f.pathname },
            this.parsePathnameCache
          );
        return !g || (i.params && !Gs(g, i.params, { partial: !0 }))
          ? !1
          : g && (o?.includeSearch ?? !0)
          ? Gs(m.search, f.search, { partial: !0 })
            ? g
            : !1
          : g;
      }),
      (this.hasNotFoundMatch = () =>
        this.__store.state.matches.some(
          (i) => i.status === 'notFound' || i.globalNotFound
        )),
      this.update({
        defaultPreloadDelay: 50,
        defaultPendingMs: 1e3,
        defaultPendingMinMs: 500,
        context: void 0,
        ...s,
        caseSensitive: s.caseSensitive ?? !1,
        notFoundMode: s.notFoundMode ?? 'fuzzy',
        stringifySearch: s.stringifySearch ?? Mb,
        parseSearch: s.parseSearch ?? Ab,
      }),
      typeof document < 'u' && (self.__TSR_ROUTER__ = this);
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutesInternal(s, i) {
    var o;
    const {
      foundRoute: c,
      matchedRoutes: f,
      routeParams: h,
    } = this.getMatchedRoutes(
      s.pathname,
      (o = i?.dest) == null ? void 0 : o.to
    );
    let m = !1;
    (c ? c.path !== '/' && h['**'] : Ks(s.pathname)) &&
      (this.options.notFoundRoute
        ? f.push(this.options.notFoundRoute)
        : (m = !0));
    const g = (() => {
        if (m) {
          if (this.options.notFoundMode !== 'root')
            for (let b = f.length - 1; b >= 0; b--) {
              const T = f[b];
              if (T.children) return T.id;
            }
          return Gt;
        }
      })(),
      d = f.map((b) => {
        var T;
        let w;
        const E =
          ((T = b.options.params) == null ? void 0 : T.parse) ??
          b.options.parseParams;
        if (E)
          try {
            const M = E(h);
            Object.assign(h, M);
          } catch (M) {
            if (((w = new Hb(M.message, { cause: M })), i?.throwOnError))
              throw w;
            return w;
          }
      }),
      v = [],
      p = (b) =>
        b?.id
          ? b.context ?? this.options.context ?? void 0
          : this.options.context ?? void 0;
    return (
      f.forEach((b, T) => {
        var w, E;
        const M = v[T - 1],
          [O, L, U] = (() => {
            const Se = M?.search ?? s.search,
              be = M?._strictSearch ?? void 0;
            try {
              const C = _f(b.options.validateSearch, { ...Se }) ?? void 0;
              return [{ ...Se, ...C }, { ...be, ...C }, void 0];
            } catch (C) {
              let V = C;
              if (
                (C instanceof Yo || (V = new Yo(C.message, { cause: C })),
                i?.throwOnError)
              )
                throw V;
              return [Se, {}, V];
            }
          })(),
          G =
            ((E = (w = b.options).loaderDeps) == null
              ? void 0
              : E.call(w, { search: O })) ?? '',
          I = G ? JSON.stringify(G) : '',
          { usedParams: Z, interpolatedPath: Y } = No({
            path: b.fullPath,
            params: h,
            decodeCharMap: this.pathParamsDecodeCharMap,
          }),
          K =
            No({
              path: b.id,
              params: h,
              leaveWildcards: !0,
              decodeCharMap: this.pathParamsDecodeCharMap,
              parseCache: this.parsePathnameCache,
            }).interpolatedPath + I,
          X = this.getMatch(K),
          F = this.state.matches.find((Se) => Se.routeId === b.id),
          ne = F ? 'stay' : 'enter';
        let oe;
        if (X)
          oe = {
            ...X,
            cause: ne,
            params: F ? qt(F.params, h) : h,
            _strictParams: Z,
            search: qt(F ? F.search : X.search, O),
            _strictSearch: L,
          };
        else {
          const Se =
            b.options.loader || b.options.beforeLoad || b.lazyFn || Yy(b)
              ? 'pending'
              : 'success';
          oe = {
            id: K,
            index: T,
            routeId: b.id,
            params: F ? qt(F.params, h) : h,
            _strictParams: Z,
            pathname: Cn([this.basepath, Y]),
            updatedAt: Date.now(),
            search: F ? qt(F.search, O) : O,
            _strictSearch: L,
            searchError: void 0,
            status: Se,
            isFetching: !1,
            error: void 0,
            paramsError: d[T],
            __routeContext: void 0,
            _nonReactive: { loadPromise: Vs() },
            __beforeLoadContext: void 0,
            context: {},
            abortController: new AbortController(),
            fetchCount: 0,
            cause: ne,
            loaderDeps: F ? qt(F.loaderDeps, G) : G,
            invalid: !1,
            preload: !1,
            links: void 0,
            scripts: void 0,
            headScripts: void 0,
            meta: void 0,
            staticData: b.options.staticData || {},
            fullPath: b.fullPath,
          };
        }
        i?.preload || (oe.globalNotFound = g === b.id), (oe.searchError = U);
        const me = p(M);
        (oe.context = {
          ...me,
          ...oe.__routeContext,
          ...oe.__beforeLoadContext,
        }),
          v.push(oe);
      }),
      v.forEach((b, T) => {
        const w = this.looseRoutesById[b.routeId];
        if (!this.getMatch(b.id) && i?._buildLocation !== !0) {
          const M = v[T - 1],
            O = p(M);
          if (w.options.context) {
            const L = {
              deps: b.loaderDeps,
              params: b.params,
              context: O ?? {},
              location: s,
              navigate: (U) => this.navigate({ ...U, _fromLocation: s }),
              buildLocation: this.buildLocation,
              cause: b.cause,
              abortController: b.abortController,
              preload: !!b.preload,
              matches: v,
            };
            b.__routeContext = w.options.context(L) ?? void 0;
          }
          b.context = { ...O, ...b.__routeContext, ...b.__beforeLoadContext };
        }
      }),
      v
    );
  }
}
class Yo extends Error {}
class Hb extends Error {}
const wp = (n) => (n.endsWith('/') && n.length > 1 ? n.slice(0, -1) : n);
function Tp(n, s) {
  return wp(n) === wp(s);
}
function Pb(n) {
  return {
    loadedAt: 0,
    isLoading: !1,
    isTransitioning: !1,
    status: 'idle',
    resolvedLocation: void 0,
    location: n,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200,
  };
}
function _f(n, s) {
  if (n == null) return {};
  if ('~standard' in n) {
    const i = n['~standard'].validate(s);
    if (i instanceof Promise) throw new Yo('Async validation not supported');
    if (i.issues)
      throw new Yo(JSON.stringify(i.issues, void 0, 2), { cause: i });
    return i.value;
  }
  return 'parse' in n ? n.parse(s) : typeof n == 'function' ? n(s) : {};
}
const qb = 0.5,
  $b = 0.4,
  Gb = 0.25,
  Vb = 0.05,
  Qb = 0.02,
  Kb = 0.01,
  Ep = 2e-4,
  xp = 1e-4;
function Rp(n, s) {
  return n.prefixSegment && n.suffixSegment
    ? s + Vb + Ep * n.prefixSegment.length + xp * n.suffixSegment.length
    : n.prefixSegment
    ? s + Qb + Ep * n.prefixSegment.length
    : n.suffixSegment
    ? s + Kb + xp * n.suffixSegment.length
    : s;
}
function Fb({ routeTree: n, initRoute: s }) {
  const i = {},
    o = {},
    c = (g) => {
      g.forEach((d, v) => {
        s?.(d, v);
        const p = i[d.id];
        if (
          (On(!p, `Duplicate routes found with id: ${String(d.id)}`),
          (i[d.id] = d),
          !d.isRoot && d.path)
        ) {
          const T = Ks(d.fullPath);
          (!o[T] || d.fullPath.endsWith('/')) && (o[T] = d);
        }
        const b = d.children;
        b?.length && c(b);
      });
    };
  c([n]);
  const f = [];
  Object.values(i).forEach((g, d) => {
    var v;
    if (g.isRoot || !g.path) return;
    const p = zf(g.fullPath);
    let b = Fs(p),
      T = 0;
    for (
      ;
      b.length > T + 1 && ((v = b[T]) == null ? void 0 : v.value) === '/';

    )
      T++;
    T > 0 && (b = b.slice(T));
    let w = 0,
      E = !1;
    const M = b.map((O, L) => {
      if (O.value === '/') return 0.75;
      let U;
      if (
        (O.type === qa
          ? (U = qb)
          : O.type === Qs
          ? ((U = $b), w++)
          : O.type === $a && (U = Gb),
        U)
      ) {
        for (let G = L + 1; G < b.length; G++) {
          const I = b[G];
          if (I.type === Rn && I.value !== '/') return (E = !0), Rp(O, U + 0.2);
        }
        return Rp(O, U);
      }
      return 1;
    });
    f.push({
      child: g,
      trimmed: p,
      parsed: b,
      index: d,
      scores: M,
      optionalParamCount: w,
      hasStaticAfter: E,
    });
  });
  const m = f
    .sort((g, d) => {
      const v = Math.min(g.scores.length, d.scores.length);
      for (let p = 0; p < v; p++)
        if (g.scores[p] !== d.scores[p]) return d.scores[p] - g.scores[p];
      if (g.scores.length !== d.scores.length) {
        if (g.optionalParamCount !== d.optionalParamCount) {
          if (g.hasStaticAfter === d.hasStaticAfter)
            return g.optionalParamCount - d.optionalParamCount;
          if (g.hasStaticAfter && !d.hasStaticAfter) return -1;
          if (!g.hasStaticAfter && d.hasStaticAfter) return 1;
        }
        return d.scores.length - g.scores.length;
      }
      for (let p = 0; p < v; p++)
        if (g.parsed[p].value !== d.parsed[p].value)
          return g.parsed[p].value > d.parsed[p].value ? 1 : -1;
      return g.index - d.index;
    })
    .map((g, d) => ((g.child.rank = d), g.child));
  return { routesById: i, routesByPath: o, flatRoutes: m };
}
function Yb({
  pathname: n,
  routePathname: s,
  basepath: i,
  caseSensitive: o,
  routesByPath: c,
  routesById: f,
  flatRoutes: h,
  parseCache: m,
}) {
  let g = {};
  const d = Ks(n),
    v = (w) => {
      var E;
      return Sf(
        i,
        d,
        {
          to: w.fullPath,
          caseSensitive:
            ((E = w.options) == null ? void 0 : E.caseSensitive) ?? o,
          fuzzy: !0,
        },
        m
      );
    };
  let p = s !== void 0 ? c[s] : void 0;
  if (p) g = v(p);
  else {
    let w;
    for (const E of h) {
      const M = v(E);
      if (M)
        if (E.path !== '/' && M['**'])
          w || (w = { foundRoute: E, routeParams: M });
        else {
          (p = E), (g = M);
          break;
        }
    }
    !p && w && ((p = w.foundRoute), (g = w.routeParams));
  }
  let b = p || f[Gt];
  const T = [b];
  for (; b.parentRoute; ) (b = b.parentRoute), T.push(b);
  return T.reverse(), { matchedRoutes: T, routeParams: g, foundRoute: p };
}
function Xb({ search: n, dest: s, destRoutes: i, _includeValidateSearch: o }) {
  const c =
      i.reduce((m, g) => {
        var d;
        const v = [];
        if ('search' in g.options)
          (d = g.options.search) != null &&
            d.middlewares &&
            v.push(...g.options.search.middlewares);
        else if (g.options.preSearchFilters || g.options.postSearchFilters) {
          const p = ({ search: b, next: T }) => {
            let w = b;
            'preSearchFilters' in g.options &&
              g.options.preSearchFilters &&
              (w = g.options.preSearchFilters.reduce((M, O) => O(M), b));
            const E = T(w);
            return 'postSearchFilters' in g.options &&
              g.options.postSearchFilters
              ? g.options.postSearchFilters.reduce((M, O) => O(M), E)
              : E;
          };
          v.push(p);
        }
        if (o && g.options.validateSearch) {
          const p = ({ search: b, next: T }) => {
            const w = T(b);
            try {
              return { ...w, ...(_f(g.options.validateSearch, w) ?? void 0) };
            } catch {
              return w;
            }
          };
          v.push(p);
        }
        return m.concat(v);
      }, []) ?? [],
    f = ({ search: m }) =>
      s.search ? (s.search === !0 ? m : Ua(s.search, m)) : {};
  c.push(f);
  const h = (m, g) => {
    if (m >= c.length) return g;
    const d = c[m];
    return d({ search: g, next: (p) => h(m + 1, p) });
  };
  return h(0, n);
}
const Wb = 'Error preloading route! ☝️';
class Wy {
  constructor(s) {
    if (
      ((this.init = (i) => {
        var o, c;
        this.originalIndex = i.originalIndex;
        const f = this.options,
          h = !f?.path && !f?.id;
        (this.parentRoute =
          (c = (o = this.options).getParentRoute) == null ? void 0 : c.call(o)),
          h ? (this._path = Gt) : this.parentRoute || On(!1);
        let m = h ? Gt : f?.path;
        m && m !== '/' && (m = zf(m));
        const g = f?.id || m;
        let d = h
          ? Gt
          : Cn([this.parentRoute.id === Gt ? '' : this.parentRoute.id, g]);
        m === Gt && (m = '/'), d !== Gt && (d = Cn(['/', d]));
        const v = d === Gt ? '/' : Cn([this.parentRoute.fullPath, m]);
        (this._path = m), (this._id = d), (this._fullPath = v), (this._to = v);
      }),
      (this.clone = (i) => {
        (this._path = i._path),
          (this._id = i._id),
          (this._fullPath = i._fullPath),
          (this._to = i._to),
          (this.options.getParentRoute = i.options.getParentRoute),
          (this.children = i.children);
      }),
      (this.addChildren = (i) => this._addFileChildren(i)),
      (this._addFileChildren = (i) => (
        Array.isArray(i) && (this.children = i),
        typeof i == 'object' &&
          i !== null &&
          (this.children = Object.values(i)),
        this
      )),
      (this._addFileTypes = () => this),
      (this.updateLoader = (i) => (Object.assign(this.options, i), this)),
      (this.update = (i) => (Object.assign(this.options, i), this)),
      (this.lazy = (i) => ((this.lazyFn = i), this)),
      (this.options = s || {}),
      (this.isRoot = !s?.getParentRoute),
      s?.id && s?.path)
    )
      throw new Error("Route cannot have both an 'id' and a 'path' option.");
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class Zb extends Wy {
  constructor(s) {
    super(s);
  }
}
function Uf(n) {
  const s = n.errorComponent ?? tl;
  return S.jsx(Jb, {
    getResetKey: n.getResetKey,
    onCatch: n.onCatch,
    children: ({ error: i, reset: o }) =>
      i ? z.createElement(s, { error: i, reset: o }) : n.children,
  });
}
class Jb extends z.Component {
  constructor() {
    super(...arguments), (this.state = { error: null });
  }
  static getDerivedStateFromProps(s) {
    return { resetKey: s.getResetKey() };
  }
  static getDerivedStateFromError(s) {
    return { error: s };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(s, i) {
    i.error && i.resetKey !== this.state.resetKey && this.reset();
  }
  componentDidCatch(s, i) {
    this.props.onCatch && this.props.onCatch(s, i);
  }
  render() {
    return this.props.children({
      error:
        this.state.resetKey !== this.props.getResetKey()
          ? null
          : this.state.error,
      reset: () => {
        this.reset();
      },
    });
  }
}
function tl({ error: n }) {
  const [s, i] = z.useState(!1);
  return S.jsxs('div', {
    style: { padding: '.5rem', maxWidth: '100%' },
    children: [
      S.jsxs('div', {
        style: { display: 'flex', alignItems: 'center', gap: '.5rem' },
        children: [
          S.jsx('strong', {
            style: { fontSize: '1rem' },
            children: 'Something went wrong!',
          }),
          S.jsx('button', {
            style: {
              appearance: 'none',
              fontSize: '.6em',
              border: '1px solid currentColor',
              padding: '.1rem .2rem',
              fontWeight: 'bold',
              borderRadius: '.25rem',
            },
            onClick: () => i((o) => !o),
            children: s ? 'Hide Error' : 'Show Error',
          }),
        ],
      }),
      S.jsx('div', { style: { height: '.25rem' } }),
      s
        ? S.jsx('div', {
            children: S.jsx('pre', {
              style: {
                fontSize: '.7em',
                border: '1px solid red',
                borderRadius: '.25rem',
                padding: '.3rem',
                color: 'red',
                overflow: 'auto',
              },
              children: n.message
                ? S.jsx('code', { children: n.message })
                : null,
            }),
          })
        : null,
    ],
  });
}
function e_({ children: n, fallback: s = null }) {
  return t_()
    ? S.jsx(an.Fragment, { children: n })
    : S.jsx(an.Fragment, { children: s });
}
function t_() {
  return an.useSyncExternalStore(
    n_,
    () => !0,
    () => !1
  );
}
function n_() {
  return () => {};
}
var Ou = { exports: {} },
  ku = {},
  Du = { exports: {} },
  Nu = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cp;
function a_() {
  if (Cp) return Nu;
  Cp = 1;
  var n = Ka();
  function s(p, b) {
    return (p === b && (p !== 0 || 1 / p === 1 / b)) || (p !== p && b !== b);
  }
  var i = typeof Object.is == 'function' ? Object.is : s,
    o = n.useState,
    c = n.useEffect,
    f = n.useLayoutEffect,
    h = n.useDebugValue;
  function m(p, b) {
    var T = b(),
      w = o({ inst: { value: T, getSnapshot: b } }),
      E = w[0].inst,
      M = w[1];
    return (
      f(
        function () {
          (E.value = T), (E.getSnapshot = b), g(E) && M({ inst: E });
        },
        [p, T, b]
      ),
      c(
        function () {
          return (
            g(E) && M({ inst: E }),
            p(function () {
              g(E) && M({ inst: E });
            })
          );
        },
        [p]
      ),
      h(T),
      T
    );
  }
  function g(p) {
    var b = p.getSnapshot;
    p = p.value;
    try {
      var T = b();
      return !i(p, T);
    } catch {
      return !0;
    }
  }
  function d(p, b) {
    return b();
  }
  var v =
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
      ? d
      : m;
  return (
    (Nu.useSyncExternalStore =
      n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : v),
    Nu
  );
}
var Ap;
function s_() {
  return Ap || ((Ap = 1), (Du.exports = a_())), Du.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mp;
function i_() {
  if (Mp) return ku;
  Mp = 1;
  var n = Ka(),
    s = s_();
  function i(d, v) {
    return (d === v && (d !== 0 || 1 / d === 1 / v)) || (d !== d && v !== v);
  }
  var o = typeof Object.is == 'function' ? Object.is : i,
    c = s.useSyncExternalStore,
    f = n.useRef,
    h = n.useEffect,
    m = n.useMemo,
    g = n.useDebugValue;
  return (
    (ku.useSyncExternalStoreWithSelector = function (d, v, p, b, T) {
      var w = f(null);
      if (w.current === null) {
        var E = { hasValue: !1, value: null };
        w.current = E;
      } else E = w.current;
      w = m(
        function () {
          function O(Z) {
            if (!L) {
              if (((L = !0), (U = Z), (Z = b(Z)), T !== void 0 && E.hasValue)) {
                var Y = E.value;
                if (T(Y, Z)) return (G = Y);
              }
              return (G = Z);
            }
            if (((Y = G), o(U, Z))) return Y;
            var K = b(Z);
            return T !== void 0 && T(Y, K) ? ((U = Z), Y) : ((U = Z), (G = K));
          }
          var L = !1,
            U,
            G,
            I = p === void 0 ? null : p;
          return [
            function () {
              return O(v());
            },
            I === null
              ? void 0
              : function () {
                  return O(I());
                },
          ];
        },
        [v, p, b, T]
      );
      var M = c(d, w[0], w[1]);
      return (
        h(
          function () {
            (E.hasValue = !0), (E.value = M);
          },
          [M]
        ),
        g(M),
        M
      );
    }),
    ku
  );
}
var Op;
function r_() {
  return Op || ((Op = 1), (Ou.exports = i_())), Ou.exports;
}
var o_ = r_();
function l_(n, s = (i) => i) {
  return o_.useSyncExternalStoreWithSelector(
    n.subscribe,
    () => n.state,
    () => n.state,
    s,
    c_
  );
}
function c_(n, s) {
  if (Object.is(n, s)) return !0;
  if (typeof n != 'object' || n === null || typeof s != 'object' || s === null)
    return !1;
  if (n instanceof Map && s instanceof Map) {
    if (n.size !== s.size) return !1;
    for (const [o, c] of n) if (!s.has(o) || !Object.is(c, s.get(o))) return !1;
    return !0;
  }
  if (n instanceof Set && s instanceof Set) {
    if (n.size !== s.size) return !1;
    for (const o of n) if (!s.has(o)) return !1;
    return !0;
  }
  if (n instanceof Date && s instanceof Date)
    return n.getTime() === s.getTime();
  const i = Object.keys(n);
  if (i.length !== Object.keys(s).length) return !1;
  for (let o = 0; o < i.length; o++)
    if (
      !Object.prototype.hasOwnProperty.call(s, i[o]) ||
      !Object.is(n[i[o]], s[i[o]])
    )
      return !1;
  return !0;
}
const Lu = z.createContext(null);
function Zy() {
  return typeof document > 'u'
    ? Lu
    : window.__TSR_ROUTER_CONTEXT__
    ? window.__TSR_ROUTER_CONTEXT__
    : ((window.__TSR_ROUTER_CONTEXT__ = Lu), Lu);
}
function Qt(n) {
  const s = z.useContext(Zy());
  return n?.warn, s;
}
function vt(n) {
  const s = Qt({ warn: n?.router === void 0 }),
    i = n?.router || s,
    o = z.useRef(void 0);
  return l_(i.__store, (c) => {
    if (n?.select) {
      if (n.structuralSharing ?? i.options.defaultStructuralSharing) {
        const f = qt(o.current, n.select(c));
        return (o.current = f), f;
      }
      return n.select(c);
    }
    return c;
  });
}
const nl = z.createContext(void 0),
  u_ = z.createContext(void 0);
function Vt(n) {
  const s = z.useContext(n.from ? u_ : nl);
  return vt({
    select: (o) => {
      const c = o.matches.find((f) =>
        n.from ? n.from === f.routeId : f.id === s
      );
      if (
        (On(
          !((n.shouldThrow ?? !0) && !c),
          `Could not find ${
            n.from ? `an active match from "${n.from}"` : 'a nearest match!'
          }`
        ),
        c !== void 0)
      )
        return n.select ? n.select(c) : c;
    },
    structuralSharing: n.structuralSharing,
  });
}
function If(n) {
  return Vt({
    from: n.from,
    strict: n.strict,
    structuralSharing: n.structuralSharing,
    select: (s) => (n.select ? n.select(s.loaderData) : s.loaderData),
  });
}
function Hf(n) {
  const { select: s, ...i } = n;
  return Vt({ ...i, select: (o) => (s ? s(o.loaderDeps) : o.loaderDeps) });
}
function Pf(n) {
  return Vt({
    from: n.from,
    strict: n.strict,
    shouldThrow: n.shouldThrow,
    structuralSharing: n.structuralSharing,
    select: (s) => (n.select ? n.select(s.params) : s.params),
  });
}
function pr(n) {
  return Vt({
    from: n.from,
    strict: n.strict,
    shouldThrow: n.shouldThrow,
    structuralSharing: n.structuralSharing,
    select: (s) => (n.select ? n.select(s.search) : s.search),
  });
}
function St(n) {
  const { navigate: s, state: i } = Qt(),
    o = Vt({ strict: !1, select: (c) => c.index });
  return z.useCallback(
    (c) => {
      const f = c.from ?? n?.from ?? i.matches[o].fullPath;
      return s({ ...c, from: f });
    },
    [n?.from, s]
  );
}
var Jy = Cy();
const jo = typeof window < 'u' ? z.useLayoutEffect : z.useEffect;
function ju(n) {
  const s = z.useRef({ value: n, prev: null }),
    i = s.current.value;
  return n !== i && (s.current = { value: n, prev: i }), s.current.prev;
}
function f_(n, s, i = {}, o = {}) {
  z.useEffect(() => {
    if (!n.current || o.disabled || typeof IntersectionObserver != 'function')
      return;
    const c = new IntersectionObserver(([f]) => {
      s(f);
    }, i);
    return (
      c.observe(n.current),
      () => {
        c.disconnect();
      }
    );
  }, [s, i, o.disabled, n]);
}
function d_(n) {
  const s = z.useRef(null);
  return z.useImperativeHandle(n, () => s.current, []), s;
}
function h_(n, s) {
  const i = Qt(),
    [o, c] = z.useState(!1),
    f = z.useRef(!1),
    h = d_(s),
    {
      activeProps: m,
      inactiveProps: g,
      activeOptions: d,
      to: v,
      preload: p,
      preloadDelay: b,
      hashScrollIntoView: T,
      replace: w,
      startTransition: E,
      resetScroll: M,
      viewTransition: O,
      children: L,
      target: U,
      disabled: G,
      style: I,
      className: Z,
      onClick: Y,
      onFocus: K,
      onMouseEnter: X,
      onMouseLeave: F,
      onTouchStart: ne,
      ignoreBlocker: oe,
      params: me,
      search: Se,
      hash: be,
      state: C,
      mask: V,
      reloadDocument: W,
      unsafeRelative: ae,
      from: R,
      _fromLocation: P,
      ...ee
    } = n,
    J = z.useMemo(() => {
      try {
        return new URL(v), 'external';
      } catch {}
      return 'internal';
    }, [v]),
    re = vt({ select: (Ne) => Ne.location.search, structuralSharing: !0 }),
    de = Vt({ strict: !1, select: (Ne) => n.from ?? Ne.fullPath }),
    le = z.useMemo(
      () => i.buildLocation({ ...n, from: de }),
      [
        i,
        re,
        n._fromLocation,
        de,
        n.hash,
        n.to,
        n.search,
        n.params,
        n.state,
        n.mask,
        n.unsafeRelative,
      ]
    ),
    Je = J === 'external',
    Te = n.reloadDocument || Je ? !1 : p ?? i.options.defaultPreload,
    Ot = b ?? i.options.defaultPreloadDelay ?? 0,
    ha = vt({
      select: (Ne) => {
        if (Je) return !1;
        if (d?.exact) {
          if (!lb(Ne.location.pathname, le.pathname, i.basepath)) return !1;
        } else {
          const et = Vo(Ne.location.pathname, i.basepath),
            Xt = Vo(le.pathname, i.basepath);
          if (
            !(
              et.startsWith(Xt) &&
              (et.length === Xt.length || et[Xt.length] === '/')
            )
          )
            return !1;
        }
        return (d?.includeSearch ?? !0) &&
          !Gs(Ne.location.search, le.search, {
            partial: !d?.exact,
            ignoreUndefined: !d?.explicitUndefined,
          })
          ? !1
          : d?.includeHash
          ? Ne.location.hash === le.hash
          : !0;
      },
    }),
    kt = z.useCallback(() => {
      i.preloadRoute({ ...n, from: de }).catch((Ne) => {
        console.warn(Ne), console.warn(Wb);
      });
    }, [
      i,
      n.to,
      n._fromLocation,
      de,
      n.search,
      n.hash,
      n.params,
      n.state,
      n.mask,
      n.unsafeRelative,
      n.hashScrollIntoView,
      n.href,
      n.ignoreBlocker,
      n.reloadDocument,
      n.replace,
      n.resetScroll,
      n.viewTransition,
    ]),
    Js = z.useCallback(
      (Ne) => {
        Ne?.isIntersecting && kt();
      },
      [kt]
    );
  if (
    (f_(h, Js, v_, { disabled: !!G || Te !== 'viewport' }),
    z.useEffect(() => {
      f.current || (!G && Te === 'render' && (kt(), (f.current = !0)));
    }, [G, kt, Te]),
    Je)
  )
    return {
      ...ee,
      ref: h,
      type: J,
      href: v,
      ...(L && { children: L }),
      ...(U && { target: U }),
      ...(G && { disabled: G }),
      ...(I && { style: I }),
      ...(Z && { className: Z }),
      ...(Y && { onClick: Y }),
      ...(K && { onFocus: K }),
      ...(X && { onMouseEnter: X }),
      ...(F && { onMouseLeave: F }),
      ...(ne && { onTouchStart: ne }),
    };
  const ei = (Ne) => {
      if (
        !G &&
        !S_(Ne) &&
        !Ne.defaultPrevented &&
        (!U || U === '_self') &&
        Ne.button === 0
      ) {
        Ne.preventDefault(),
          Jy.flushSync(() => {
            c(!0);
          });
        const et = i.subscribe('onResolved', () => {
          et(), c(!1);
        });
        i.navigate({
          ...n,
          from: de,
          replace: w,
          resetScroll: M,
          hashScrollIntoView: T,
          startTransition: E,
          viewTransition: O,
          ignoreBlocker: oe,
        });
      }
    },
    Fa = (Ne) => {
      G || (Te && kt());
    },
    ol = Fa,
    ll = (Ne) => {
      if (!(G || !Te))
        if (!Ot) kt();
        else {
          const et = Ne.target;
          if (nr.has(et)) return;
          const Xt = setTimeout(() => {
            nr.delete(et), kt();
          }, Ot);
          nr.set(et, Xt);
        }
    },
    Dt = (Ne) => {
      if (G || !Te || !Ot) return;
      const et = Ne.target,
        Xt = nr.get(et);
      Xt && (clearTimeout(Xt), nr.delete(et));
    },
    Ya = ha ? Ua(m, {}) ?? g_ : Bu,
    ga = ha ? Bu : Ua(g, {}) ?? Bu,
    ti = [Z, Ya.className, ga.className].filter(Boolean).join(' '),
    ma = (I || Ya.style || ga.style) && { ...I, ...Ya.style, ...ga.style };
  return {
    ...ee,
    ...Ya,
    ...ga,
    href: G
      ? void 0
      : le.maskedLocation
      ? i.history.createHref(le.maskedLocation.href)
      : i.history.createHref(le.href),
    ref: h,
    onClick: ar([Y, ei]),
    onFocus: ar([K, Fa]),
    onMouseEnter: ar([X, ll]),
    onMouseLeave: ar([F, Dt]),
    onTouchStart: ar([ne, ol]),
    disabled: !!G,
    target: U,
    ...(ma && { style: ma }),
    ...(ti && { className: ti }),
    ...(G && m_),
    ...(ha && p_),
    ...(o && y_),
  };
}
const Bu = {},
  g_ = { className: 'active' },
  m_ = { role: 'link', 'aria-disabled': !0 },
  p_ = { 'data-status': 'active', 'aria-current': 'page' },
  y_ = { 'data-transitioning': 'transitioning' },
  nr = new WeakMap(),
  v_ = { rootMargin: '100px' },
  ar = (n) => (s) => {
    n.filter(Boolean).forEach((i) => {
      s.defaultPrevented || i(s);
    });
  },
  qf = z.forwardRef((n, s) => {
    const { _asChild: i, ...o } = n,
      { type: c, ref: f, ...h } = h_(o, s),
      m =
        typeof o.children == 'function'
          ? o.children({ isActive: h['data-status'] === 'active' })
          : o.children;
    return (
      i === void 0 && delete h.disabled,
      z.createElement(i || 'a', { ...h, ref: f }, m)
    );
  });
function S_(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
class b_ extends Wy {
  constructor(s) {
    super(s),
      (this.useMatch = (i) =>
        Vt({
          select: i?.select,
          from: this.id,
          structuralSharing: i?.structuralSharing,
        })),
      (this.useRouteContext = (i) =>
        Vt({
          ...i,
          from: this.id,
          select: (o) => (i?.select ? i.select(o.context) : o.context),
        })),
      (this.useSearch = (i) =>
        pr({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useParams = (i) =>
        Pf({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useLoaderDeps = (i) => Hf({ ...i, from: this.id })),
      (this.useLoaderData = (i) => If({ ...i, from: this.id })),
      (this.useNavigate = () => St({ from: this.fullPath })),
      (this.Link = an.forwardRef((i, o) =>
        S.jsx(qf, { ref: o, from: this.fullPath, ...i })
      )),
      (this.$$typeof = Symbol.for('react.memo'));
  }
}
function on(n) {
  return new b_(n);
}
class __ extends Zb {
  constructor(s) {
    super(s),
      (this.useMatch = (i) =>
        Vt({
          select: i?.select,
          from: this.id,
          structuralSharing: i?.structuralSharing,
        })),
      (this.useRouteContext = (i) =>
        Vt({
          ...i,
          from: this.id,
          select: (o) => (i?.select ? i.select(o.context) : o.context),
        })),
      (this.useSearch = (i) =>
        pr({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useParams = (i) =>
        Pf({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useLoaderDeps = (i) => Hf({ ...i, from: this.id })),
      (this.useLoaderData = (i) => If({ ...i, from: this.id })),
      (this.useNavigate = () => St({ from: this.fullPath })),
      (this.Link = an.forwardRef((i, o) =>
        S.jsx(qf, { ref: o, from: this.fullPath, ...i })
      )),
      (this.$$typeof = Symbol.for('react.memo'));
  }
}
function w_(n) {
  return new __(n);
}
function kp(n) {
  return typeof n == 'object'
    ? new Dp(n, { silent: !0 }).createRoute(n)
    : new Dp(n, { silent: !0 }).createRoute;
}
class Dp {
  constructor(s, i) {
    (this.path = s),
      (this.createRoute = (o) => {
        this.silent;
        const c = on(o);
        return (c.isRoot = !1), c;
      }),
      (this.silent = i?.silent);
  }
}
class Np {
  constructor(s) {
    (this.useMatch = (i) =>
      Vt({
        select: i?.select,
        from: this.options.id,
        structuralSharing: i?.structuralSharing,
      })),
      (this.useRouteContext = (i) =>
        Vt({
          from: this.options.id,
          select: (o) => (i?.select ? i.select(o.context) : o.context),
        })),
      (this.useSearch = (i) =>
        pr({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.options.id,
        })),
      (this.useParams = (i) =>
        Pf({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.options.id,
        })),
      (this.useLoaderDeps = (i) => Hf({ ...i, from: this.options.id })),
      (this.useLoaderData = (i) => If({ ...i, from: this.options.id })),
      (this.useNavigate = () => {
        const i = Qt();
        return St({ from: i.routesById[this.options.id].fullPath });
      }),
      (this.options = s),
      (this.$$typeof = Symbol.for('react.memo'));
  }
}
function Lp(n) {
  return typeof n == 'object' ? new Np(n) : (s) => new Np({ id: n, ...s });
}
function T_() {
  const n = Qt(),
    s = z.useRef({ router: n, mounted: !1 }),
    [i, o] = z.useState(!1),
    { hasPendingMatches: c, isLoading: f } = vt({
      select: (p) => ({
        isLoading: p.isLoading,
        hasPendingMatches: p.matches.some((b) => b.status === 'pending'),
      }),
      structuralSharing: !0,
    }),
    h = ju(f),
    m = f || i || c,
    g = ju(m),
    d = f || c,
    v = ju(d);
  return (
    (n.startTransition = (p) => {
      o(!0),
        z.startTransition(() => {
          p(), o(!1);
        });
    }),
    z.useEffect(() => {
      const p = n.history.subscribe(n.load),
        b = n.buildLocation({
          to: n.latestLocation.pathname,
          search: !0,
          params: !0,
          hash: !0,
          state: !0,
          _includeValidateSearch: !0,
        });
      return (
        Ks(n.latestLocation.href) !== Ks(b.href) &&
          n.commitLocation({ ...b, replace: !0 }),
        () => {
          p();
        }
      );
    }, [n, n.history]),
    jo(() => {
      if (
        (typeof window < 'u' && n.ssr) ||
        (s.current.router === n && s.current.mounted)
      )
        return;
      (s.current = { router: n, mounted: !0 }),
        (async () => {
          try {
            await n.load();
          } catch (b) {
            console.error(b);
          }
        })();
    }, [n]),
    jo(() => {
      h && !f && n.emit({ type: 'onLoad', ...Ia(n.state) });
    }, [h, n, f]),
    jo(() => {
      v && !d && n.emit({ type: 'onBeforeRouteMount', ...Ia(n.state) });
    }, [d, v, n]),
    jo(() => {
      g &&
        !m &&
        (n.emit({ type: 'onResolved', ...Ia(n.state) }),
        n.__store.setState((p) => ({
          ...p,
          status: 'idle',
          resolvedLocation: p.location,
        })),
        xb(n));
    }, [m, g, n]),
    null
  );
}
function E_(n) {
  const s = vt({
    select: (i) => `not-found-${i.location.pathname}-${i.status}`,
  });
  return S.jsx(Uf, {
    getResetKey: () => s,
    onCatch: (i, o) => {
      var c;
      if (rn(i)) (c = n.onCatch) == null || c.call(n, i, o);
      else throw i;
    },
    errorComponent: ({ error: i }) => {
      var o;
      if (rn(i)) return (o = n.fallback) == null ? void 0 : o.call(n, i);
      throw i;
    },
    children: n.children,
  });
}
function x_() {
  return S.jsx('p', { children: 'Not Found' });
}
function Ps(n) {
  return S.jsx(S.Fragment, { children: n.children });
}
function ev(n, s, i) {
  return s.options.notFoundComponent
    ? S.jsx(s.options.notFoundComponent, { data: i })
    : n.options.defaultNotFoundComponent
    ? S.jsx(n.options.defaultNotFoundComponent, { data: i })
    : S.jsx(x_, {});
}
function R_({ children: n }) {
  return typeof document < 'u'
    ? null
    : S.jsx('script', {
        className: '$tsr',
        dangerouslySetInnerHTML: {
          __html: [n].filter(Boolean).join(`
`),
        },
      });
}
function C_() {
  const n = Qt(),
    i = (n.options.getScrollRestorationKey || bf)(n.latestLocation),
    o = i !== bf(n.latestLocation) ? i : void 0;
  if (!n.isScrollRestoring || !n.isServer) return null;
  const c = { storageKey: Ko, shouldScrollRestoration: !0 };
  return (
    o && (c.key = o),
    S.jsx(R_, { children: `(${$y.toString()})(${JSON.stringify(c)})` })
  );
}
const tv = z.memo(function ({ matchId: s }) {
  var i, o;
  const c = Qt(),
    f = vt({
      select: (U) => {
        const G = U.matches.find((I) => I.id === s);
        return (
          On(G),
          { routeId: G.routeId, ssr: G.ssr, _displayPending: G._displayPending }
        );
      },
      structuralSharing: !0,
    }),
    h = c.routesById[f.routeId],
    m = h.options.pendingComponent ?? c.options.defaultPendingComponent,
    g = m ? S.jsx(m, {}) : null,
    d = h.options.errorComponent ?? c.options.defaultErrorComponent,
    v = h.options.onCatch ?? c.options.defaultOnCatch,
    p = h.isRoot
      ? h.options.notFoundComponent ??
        ((i = c.options.notFoundRoute) == null ? void 0 : i.options.component)
      : h.options.notFoundComponent,
    b = f.ssr === !1 || f.ssr === 'data-only',
    T =
      (!h.isRoot || h.options.wrapInSuspense || b) &&
      (h.options.wrapInSuspense ??
        m ??
        (((o = h.options.errorComponent) == null ? void 0 : o.preload) || b))
        ? z.Suspense
        : Ps,
    w = d ? Uf : Ps,
    E = p ? E_ : Ps,
    M = vt({ select: (U) => U.loadedAt }),
    O = vt({
      select: (U) => {
        var G;
        const I = U.matches.findIndex((Z) => Z.id === s);
        return (G = U.matches[I - 1]) == null ? void 0 : G.routeId;
      },
    }),
    L = h.isRoot ? h.options.shellComponent ?? Ps : Ps;
  return S.jsxs(L, {
    children: [
      S.jsx(nl.Provider, {
        value: s,
        children: S.jsx(T, {
          fallback: g,
          children: S.jsx(w, {
            getResetKey: () => M,
            errorComponent: d || tl,
            onCatch: (U, G) => {
              if (rn(U)) throw U;
              v?.(U, G);
            },
            children: S.jsx(E, {
              fallback: (U) => {
                if (
                  !p ||
                  (U.routeId && U.routeId !== f.routeId) ||
                  (!U.routeId && !h.isRoot)
                )
                  throw U;
                return z.createElement(p, U);
              },
              children:
                b || f._displayPending
                  ? S.jsx(e_, {
                      fallback: g,
                      children: S.jsx(jp, { matchId: s }),
                    })
                  : S.jsx(jp, { matchId: s }),
            }),
          }),
        }),
      }),
      O === Gt && c.options.scrollRestoration
        ? S.jsxs(S.Fragment, { children: [S.jsx(A_, {}), S.jsx(C_, {})] })
        : null,
    ],
  });
});
function A_() {
  const n = Qt(),
    s = z.useRef(void 0);
  return S.jsx(
    'script',
    {
      suppressHydrationWarning: !0,
      ref: (i) => {
        i &&
          (s.current === void 0 || s.current.href !== n.latestLocation.href) &&
          (n.emit({ type: 'onRendered', ...Ia(n.state) }),
          (s.current = n.latestLocation));
      },
    },
    n.latestLocation.state.__TSR_key
  );
}
const jp = z.memo(function ({ matchId: s }) {
    var i, o, c, f;
    const h = Qt(),
      {
        match: m,
        key: g,
        routeId: d,
      } = vt({
        select: (b) => {
          const T = b.matches.find((L) => L.id === s),
            w = T.routeId,
            E =
              h.routesById[w].options.remountDeps ??
              h.options.defaultRemountDeps,
            M = E?.({
              routeId: w,
              loaderDeps: T.loaderDeps,
              params: T._strictParams,
              search: T._strictSearch,
            });
          return {
            key: M ? JSON.stringify(M) : void 0,
            routeId: w,
            match: {
              id: T.id,
              status: T.status,
              error: T.error,
              _forcePending: T._forcePending,
              _displayPending: T._displayPending,
            },
          };
        },
        structuralSharing: !0,
      }),
      v = h.routesById[d],
      p = z.useMemo(() => {
        const b = v.options.component ?? h.options.defaultComponent;
        return b ? S.jsx(b, {}, g) : S.jsx(M_, {});
      }, [g, v.options.component, h.options.defaultComponent]);
    if (m._displayPending)
      throw (i = h.getMatch(m.id)) == null
        ? void 0
        : i._nonReactive.displayPendingPromise;
    if (m._forcePending)
      throw (o = h.getMatch(m.id)) == null
        ? void 0
        : o._nonReactive.minPendingPromise;
    if (m.status === 'pending') {
      const b = v.options.pendingMinMs ?? h.options.defaultPendingMinMs;
      if (b) {
        const T = h.getMatch(m.id);
        if (T && !T._nonReactive.minPendingPromise && !h.isServer) {
          const w = Vs();
          (T._nonReactive.minPendingPromise = w),
            setTimeout(() => {
              w.resolve(), (T._nonReactive.minPendingPromise = void 0);
            }, b);
        }
      }
      throw (c = h.getMatch(m.id)) == null
        ? void 0
        : c._nonReactive.loadPromise;
    }
    if (m.status === 'notFound') return On(rn(m.error)), ev(h, v, m.error);
    if (m.status === 'redirected')
      throw (
        (On(sn(m.error)),
        (f = h.getMatch(m.id)) == null ? void 0 : f._nonReactive.loadPromise)
      );
    if (m.status === 'error') {
      if (h.isServer) {
        const b =
          (v.options.errorComponent ?? h.options.defaultErrorComponent) || tl;
        return S.jsx(b, {
          error: m.error,
          reset: void 0,
          info: { componentStack: '' },
        });
      }
      throw m.error;
    }
    return p;
  }),
  M_ = z.memo(function () {
    const s = Qt(),
      i = z.useContext(nl),
      o = vt({
        select: (d) => {
          var v;
          return (v = d.matches.find((p) => p.id === i)) == null
            ? void 0
            : v.routeId;
        },
      }),
      c = s.routesById[o],
      f = vt({
        select: (d) => {
          const p = d.matches.find((b) => b.id === i);
          return On(p), p.globalNotFound;
        },
      }),
      h = vt({
        select: (d) => {
          var v;
          const p = d.matches,
            b = p.findIndex((T) => T.id === i);
          return (v = p[b + 1]) == null ? void 0 : v.id;
        },
      }),
      m = s.options.defaultPendingComponent
        ? S.jsx(s.options.defaultPendingComponent, {})
        : null;
    if (f) return ev(s, c, void 0);
    if (!h) return null;
    const g = S.jsx(tv, { matchId: h });
    return i === Gt ? S.jsx(z.Suspense, { fallback: m, children: g }) : g;
  });
function O_() {
  const n = Qt(),
    s = n.options.defaultPendingComponent
      ? S.jsx(n.options.defaultPendingComponent, {})
      : null,
    i = n.isServer || (typeof document < 'u' && n.ssr) ? Ps : z.Suspense,
    o = S.jsxs(i, {
      fallback: s,
      children: [!n.isServer && S.jsx(T_, {}), S.jsx(k_, {})],
    });
  return n.options.InnerWrap ? S.jsx(n.options.InnerWrap, { children: o }) : o;
}
function k_() {
  const n = Qt(),
    s = vt({
      select: (c) => {
        var f;
        return (f = c.matches[0]) == null ? void 0 : f.id;
      },
    }),
    i = vt({ select: (c) => c.loadedAt }),
    o = s ? S.jsx(tv, { matchId: s }) : null;
  return S.jsx(nl.Provider, {
    value: s,
    children: n.options.disableGlobalCatchBoundary
      ? o
      : S.jsx(Uf, {
          getResetKey: () => i,
          errorComponent: tl,
          onCatch: (c) => {
            c.message || c.toString();
          },
          children: o,
        }),
  });
}
const D_ = (n) => new N_(n);
class N_ extends Ib {
  constructor(s) {
    super(s);
  }
}
typeof globalThis < 'u'
  ? ((globalThis.createFileRoute = kp), (globalThis.createLazyFileRoute = Lp))
  : typeof window < 'u' &&
    ((window.createFileRoute = kp), (window.createLazyFileRoute = Lp));
function L_({ router: n, children: s, ...i }) {
  Object.keys(i).length > 0 &&
    n.update({
      ...n.options,
      ...i,
      context: { ...n.options.context, ...i.context },
    });
  const o = Zy(),
    c = S.jsx(o.Provider, { value: n, children: s });
  return n.options.Wrap ? S.jsx(n.options.Wrap, { children: c }) : c;
}
function j_({ router: n, ...s }) {
  return S.jsx(L_, { router: n, ...s, children: S.jsx(O_, {}) });
}
function B_() {
  return S.jsx(qf, {
    to: '/login',
    style: { fontSize: '24px' },
    children: 'Login',
  });
}
const z_ = {
    fontFamily: {
      primary:
        'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
    },
    fontWeight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '28px',
      display: '32px',
      hero: '40px',
    },
    lineHeight: { tight: 1.2, normal: 1.4 },
  },
  U_ = {
    dark: '#000000',
    white: '#FFFFFF',
    gray: '#ABABAB',
    lightGray: '#E7E9EC',
    main: '#20AEEA',
    lightMain: '#EFFAFF',
    warning: '#FF0000',
    warningLight: '#FFD5D5',
    middleGray: '#CDCDCD',
    green: '#6EDF74',
    error: '#FF0000',
    red: '#FF0000',
  },
  I_ = { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '20px' },
  H_ = { sm: '4px', md: '8px' },
  $ = { typography: z_, colors: U_, spacing: I_, borderRadius: H_ },
  fa = ({
    children: n,
    variant: s = 'primary',
    size: i = 'medium',
    disabled: o = !1,
    onClick: c,
    className: f = '',
    type: h = 'button',
    fullWidth: m = !1,
  }) => {
    const g = () => {
        switch (s) {
          case 'primary':
            return {
              backgroundColor: o ? $.colors.middleGray : $.colors.main,
              color: $.colors.white,
              border: 'none',
            };
          case 'secondary':
            return {
              backgroundColor: '#acacac',
              color: $.colors.white,
              border: 'none',
            };
          case 'error':
            return {
              backgroundColor: o ? $.colors.middleGray : $.colors.warning,
              color: $.colors.white,
              border: 'none',
            };
          case 'success':
            return {
              backgroundColor: o ? $.colors.middleGray : $.colors.green,
              color: $.colors.white,
              border: 'none',
            };
          case 'warning':
            return {
              backgroundColor: $.colors.white,
              color: $.colors.dark,
              border: `1px solid ${$.colors.warning}`,
            };
          case 'kakao':
            return {
              backgroundColor: '#fee500',
              color: '#191919',
              border: 'none',
            };
          case 'neutral':
            return {
              backgroundColor: $.colors.lightGray,
              color: $.colors.dark,
              border: 'none',
            };
          default:
            return {
              backgroundColor: o ? $.colors.middleGray : $.colors.main,
              color: $.colors.white,
              border: 'none',
            };
        }
      },
      d = () => {
        switch (i) {
          case 'small':
            return {
              padding: `${$.spacing.xs} ${$.spacing.sm}`,
              fontSize: $.typography.fontSize.sm,
            };
          case 'medium':
            return {
              padding: `${$.spacing.sm} ${$.spacing.lg}`,
              fontSize: $.typography.fontSize.md,
            };
          case 'large':
            return {
              padding: `${$.spacing.md} ${$.spacing.xl}`,
              fontSize: $.typography.fontSize.lg,
            };
          default:
            return {
              padding: `${$.spacing.sm} ${$.spacing.lg}`,
              fontSize: $.typography.fontSize.md,
            };
        }
      },
      p = {
        ...{
          borderRadius: $.borderRadius.md,
          fontWeight: $.typography.fontWeight.medium,
          cursor: o ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: $.typography.fontFamily.primary,
          outline: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: $.spacing.xs,
          width: m ? '100%' : 'auto',
        },
        ...g(),
        ...d(),
      };
    return S.jsx('button', {
      type: h,
      style: p,
      onClick: o ? void 0 : c,
      disabled: o,
      className: f,
      children: n,
    });
  },
  Ho = ({
    children: n,
    variant: s = 'primary',
    size: i = 'medium',
    className: o = '',
    style: c,
  }) => {
    const f = () => {
        switch (s) {
          case 'primary':
            return { backgroundColor: $.colors.main, color: $.colors.white };
          case 'error':
            return { backgroundColor: $.colors.warning, color: $.colors.white };
          case 'success':
            return { backgroundColor: $.colors.green, color: $.colors.white };
          case 'warning':
            return { backgroundColor: $.colors.warning, color: $.colors.white };
          case 'neutral':
            return {
              backgroundColor: $.colors.lightGray,
              color: $.colors.dark,
            };
          default:
            return { backgroundColor: $.colors.main, color: $.colors.white };
        }
      },
      h = () => {
        switch (i) {
          case 'small':
            return {
              padding: `${$.spacing.xs} ${$.spacing.sm}`,
              fontSize: $.typography.fontSize.xs,
              borderRadius: $.borderRadius.sm,
            };
          case 'medium':
            return {
              padding: `${$.spacing.sm} ${$.spacing.md}`,
              fontSize: $.typography.fontSize.sm,
              borderRadius: $.borderRadius.md,
            };
          case 'large':
            return {
              padding: `${$.spacing.md} ${$.spacing.lg}`,
              fontSize: $.typography.fontSize.md,
              borderRadius: $.borderRadius.md,
            };
          default:
            return {
              padding: `${$.spacing.sm} ${$.spacing.md}`,
              fontSize: $.typography.fontSize.sm,
              borderRadius: $.borderRadius.md,
            };
        }
      },
      g = {
        ...{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: $.typography.fontWeight.medium,
          fontFamily: $.typography.fontFamily.primary,
          lineHeight: $.typography.lineHeight.tight,
          whiteSpace: 'nowrap',
        },
        ...f(),
        ...h(),
        ...c,
      };
    return S.jsx('span', { style: g, className: o, children: n });
  },
  te = ({
    children: n,
    size: s = 'md',
    color: i = 'dark',
    align: o = 'left',
    weight: c = 'regular',
    className: f = '',
    as: h,
    style: m,
    responsiveSize: g,
  }) => {
    const d = () => {
        const E = typeof window < 'u' ? window.innerWidth : 9999,
          M = g ? (E <= 375 ? g.mobile : g.default) : s;
        return {
          fontSize: $.typography.fontSize[M],
          fontWeight: $.typography.fontWeight[c],
          lineHeight: $.typography.lineHeight.normal,
          fontFamily: $.typography.fontFamily.primary,
        };
      },
      v = () => ({ color: $.colors[i] }),
      b = { ...{ textAlign: o, margin: 0, padding: 0 }, ...d(), ...v(), ...m },
      w = (() => {
        if (h) return h;
        switch (s) {
          case 'hero':
          case 'display':
          case 'xxxl':
            return 'h1';
          case 'xxl':
            return 'h2';
          case 'xl':
            return 'h3';
          case 'lg':
            return 'h4';
          default:
            return 'p';
        }
      })();
    return S.jsx(w, { style: b, className: f, children: n });
  },
  P_ = '_container_p11ze_1',
  q_ = '_latest_p11ze_27',
  $_ = '_past_p11ze_35',
  G_ = '_info_p11ze_43',
  V_ = '_badge_p11ze_51',
  Q_ = '_text_p11ze_59',
  js = { container: P_, latest: q_, past: $_, info: G_, badge: V_, text: Q_ },
  An = ({
    type: n,
    date: s,
    location: i,
    className: o = '',
    variant: c = 'latest',
    suffix: f = '',
  }) => {
    const h = c === 'latest',
      m = c === 'info';
    return S.jsxs('div', {
      className: `${js.container} ${
        h ? js.latest : m ? js.info : js.past
      } ${o}`,
      children: [
        S.jsx(Ho, {
          variant: h ? 'error' : 'neutral',
          size: 'small',
          className: js.badge,
          style: {
            backgroundColor: h ? '#FD0202' : m ? '#20AEEA' : '#ABABAB',
            color: 'white',
            fontSize: '14px',
          },
          children: n,
        }),
        S.jsxs('span', { className: js.text, children: [s, ' ', i, ' ', f] }),
      ],
    });
  },
  K_ = '_container_77e2j_1',
  F_ = '_content_77e2j_31',
  Y_ = '_textSection_77e2j_45',
  X_ = '_title_77e2j_59',
  W_ = '_subtitle_77e2j_67',
  Z_ = '_iconSection_77e2j_79',
  J_ = '_shellsIcon_77e2j_95',
  La = {
    container: K_,
    content: F_,
    textSection: Y_,
    title: X_,
    subtitle: W_,
    iconSection: Z_,
    shellsIcon: J_,
  },
  ew = ({ onClick: n, className: s = '' }) =>
    S.jsx('button', {
      className: `${La.container} ${s}`,
      onClick: n,
      children: S.jsxs('div', {
        className: La.content,
        children: [
          S.jsxs('div', {
            className: La.textSection,
            children: [
              S.jsx(te, {
                size: 'lg',
                color: 'white',
                weight: 'bold',
                className: La.title,
                children: '무엇을 잡으셨나요?',
              }),
              S.jsx(te, {
                size: 'sm',
                color: 'white',
                className: La.subtitle,
                children: '수확물 확인하기 >',
              }),
            ],
          }),
          S.jsx('div', {
            className: La.iconSection,
            children: S.jsx('img', {
              src: '/shells.svg',
              alt: '조개들',
              className: La.shellsIcon,
            }),
          }),
        ],
      }),
    }),
  tw = '_container_191qn_1',
  nw = '_content_191qn_39',
  aw = '_textSection_191qn_51',
  sw = '_iconSection_191qn_63',
  iw = '_locationIcon_191qn_77',
  Bs = {
    container: tw,
    content: nw,
    textSection: aw,
    iconSection: sw,
    locationIcon: iw,
  },
  rw = ({ onClick: n, className: s = '' }) =>
    S.jsx('button', {
      className: `${Bs.container} ${s}`,
      onClick: n,
      children: S.jsxs('div', {
        className: Bs.content,
        children: [
          S.jsx('div', {
            className: Bs.textSection,
            children: S.jsx(te, {
              size: 'lg',
              color: 'dark',
              weight: 'bold',
              className: Bs.title,
              children: '위치 트래킹',
            }),
          }),
          S.jsx('div', {
            className: Bs.iconSection,
            children: S.jsx('img', {
              src: '/tracking.svg',
              alt: '위치 트래킹',
              className: Bs.locationIcon,
            }),
          }),
        ],
      }),
    }),
  ow = '_container_1s6oz_1',
  lw = '_divider_1s6oz_17',
  cw = '_weatherWidget_1s6oz_35',
  zu = { container: ow, divider: lw, weatherWidget: cw },
  uw = '_widgetData_1f6a8_1',
  fw = '_textSection_1f6a8_19',
  Uu = { widgetData: uw, textSection: fw },
  dw = ({ icon: n, subtitle: s, data: i }) =>
    S.jsxs('div', {
      className: Uu.widgetData,
      children: [
        S.jsx('div', { className: Uu.iconSection, children: n }),
        S.jsxs('div', {
          className: Uu.textSection,
          children: [
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              weight: 'semiBold',
              style: { marginBottom: '4px' },
              children: s,
            }),
            S.jsx(te, {
              responsiveSize: { default: 'xl', mobile: 'lg' },
              size: 'xl',
              color: 'dark',
              weight: 'bold',
              style: { letterSpacing: '-0.4px' },
              children: i,
            }),
          ],
        }),
      ],
    }),
  nv = ({ items: n }) =>
    S.jsx('div', {
      className: zu.container,
      children: n.map((s, i) =>
        S.jsxs(
          an.Fragment,
          {
            children: [
              S.jsx('div', {
                className: zu.weatherWidget,
                children: S.jsx(dw, { ...s }),
              }),
              i !== n.length - 1 && S.jsx('div', { className: zu.divider }),
            ],
          },
          i
        )
      ),
    }),
  hw = '_container_l4glg_1',
  gw = '_content_l4glg_39',
  mw = '_textSection_l4glg_51',
  pw = '_iconSection_l4glg_63',
  yw = '_locationIcon_l4glg_77',
  zs = {
    container: hw,
    content: gw,
    textSection: mw,
    iconSection: pw,
    locationIcon: yw,
  },
  vw = ({ onClick: n, className: s = '' }) =>
    S.jsx('button', {
      className: `${zs.container} ${s}`,
      onClick: n,
      children: S.jsxs('div', {
        className: zs.content,
        children: [
          S.jsx('div', {
            className: zs.textSection,
            children: S.jsx(te, {
              size: 'lg',
              color: 'dark',
              weight: 'bold',
              className: zs.title,
              children: '채집 안내서',
            }),
          }),
          S.jsx('div', {
            className: zs.iconSection,
            children: S.jsx('img', {
              src: '/sea-shell.svg',
              alt: '채집 안내서',
              className: zs.locationIcon,
            }),
          }),
        ],
      }),
    }),
  Sw = () => {};
var Bp = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const av = function (n) {
    const s = [];
    let i = 0;
    for (let o = 0; o < n.length; o++) {
      let c = n.charCodeAt(o);
      c < 128
        ? (s[i++] = c)
        : c < 2048
        ? ((s[i++] = (c >> 6) | 192), (s[i++] = (c & 63) | 128))
        : (c & 64512) === 55296 &&
          o + 1 < n.length &&
          (n.charCodeAt(o + 1) & 64512) === 56320
        ? ((c = 65536 + ((c & 1023) << 10) + (n.charCodeAt(++o) & 1023)),
          (s[i++] = (c >> 18) | 240),
          (s[i++] = ((c >> 12) & 63) | 128),
          (s[i++] = ((c >> 6) & 63) | 128),
          (s[i++] = (c & 63) | 128))
        : ((s[i++] = (c >> 12) | 224),
          (s[i++] = ((c >> 6) & 63) | 128),
          (s[i++] = (c & 63) | 128));
    }
    return s;
  },
  bw = function (n) {
    const s = [];
    let i = 0,
      o = 0;
    for (; i < n.length; ) {
      const c = n[i++];
      if (c < 128) s[o++] = String.fromCharCode(c);
      else if (c > 191 && c < 224) {
        const f = n[i++];
        s[o++] = String.fromCharCode(((c & 31) << 6) | (f & 63));
      } else if (c > 239 && c < 365) {
        const f = n[i++],
          h = n[i++],
          m = n[i++],
          g =
            (((c & 7) << 18) | ((f & 63) << 12) | ((h & 63) << 6) | (m & 63)) -
            65536;
        (s[o++] = String.fromCharCode(55296 + (g >> 10))),
          (s[o++] = String.fromCharCode(56320 + (g & 1023)));
      } else {
        const f = n[i++],
          h = n[i++];
        s[o++] = String.fromCharCode(
          ((c & 15) << 12) | ((f & 63) << 6) | (h & 63)
        );
      }
    }
    return s.join('');
  },
  sv = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + '+/=';
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + '-_.';
    },
    HAS_NATIVE_SUPPORT: typeof atob == 'function',
    encodeByteArray(n, s) {
      if (!Array.isArray(n))
        throw Error('encodeByteArray takes an array as a parameter');
      this.init_();
      const i = s ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        o = [];
      for (let c = 0; c < n.length; c += 3) {
        const f = n[c],
          h = c + 1 < n.length,
          m = h ? n[c + 1] : 0,
          g = c + 2 < n.length,
          d = g ? n[c + 2] : 0,
          v = f >> 2,
          p = ((f & 3) << 4) | (m >> 4);
        let b = ((m & 15) << 2) | (d >> 6),
          T = d & 63;
        g || ((T = 64), h || (b = 64)), o.push(i[v], i[p], i[b], i[T]);
      }
      return o.join('');
    },
    encodeString(n, s) {
      return this.HAS_NATIVE_SUPPORT && !s
        ? btoa(n)
        : this.encodeByteArray(av(n), s);
    },
    decodeString(n, s) {
      return this.HAS_NATIVE_SUPPORT && !s
        ? atob(n)
        : bw(this.decodeStringToByteArray(n, s));
    },
    decodeStringToByteArray(n, s) {
      this.init_();
      const i = s ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        o = [];
      for (let c = 0; c < n.length; ) {
        const f = i[n.charAt(c++)],
          m = c < n.length ? i[n.charAt(c)] : 0;
        ++c;
        const d = c < n.length ? i[n.charAt(c)] : 64;
        ++c;
        const p = c < n.length ? i[n.charAt(c)] : 64;
        if ((++c, f == null || m == null || d == null || p == null))
          throw new _w();
        const b = (f << 2) | (m >> 4);
        if ((o.push(b), d !== 64)) {
          const T = ((m << 4) & 240) | (d >> 2);
          if ((o.push(T), p !== 64)) {
            const w = ((d << 6) & 192) | p;
            o.push(w);
          }
        }
      }
      return o;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let n = 0; n < this.ENCODED_VALS.length; n++)
          (this.byteToCharMap_[n] = this.ENCODED_VALS.charAt(n)),
            (this.charToByteMap_[this.byteToCharMap_[n]] = n),
            (this.byteToCharMapWebSafe_[n] =
              this.ENCODED_VALS_WEBSAFE.charAt(n)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]] = n),
            n >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)] = n),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)] = n));
      }
    },
  };
class _w extends Error {
  constructor() {
    super(...arguments), (this.name = 'DecodeBase64StringError');
  }
}
const ww = function (n) {
    const s = av(n);
    return sv.encodeByteArray(s, !0);
  },
  iv = function (n) {
    return ww(n).replace(/\./g, '');
  },
  Tw = function (n) {
    try {
      return sv.decodeString(n, !0);
    } catch (s) {
      console.error('base64Decode failed: ', s);
    }
    return null;
  };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ew() {
  if (typeof self < 'u') return self;
  if (typeof window < 'u') return window;
  if (typeof global < 'u') return global;
  throw new Error('Unable to locate global object.');
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xw = () => Ew().__FIREBASE_DEFAULTS__,
  Rw = () => {
    if (typeof process > 'u' || typeof Bp > 'u') return;
    const n = Bp.__FIREBASE_DEFAULTS__;
    if (n) return JSON.parse(n);
  },
  Cw = () => {
    if (typeof document > 'u') return;
    let n;
    try {
      n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const s = n && Tw(n[1]);
    return s && JSON.parse(s);
  },
  Aw = () => {
    try {
      return Sw() || xw() || Rw() || Cw();
    } catch (n) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
      return;
    }
  },
  rv = () => Aw()?.config;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mw {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((s, i) => {
        (this.resolve = s), (this.reject = i);
      }));
  }
  wrapCallback(s) {
    return (i, o) => {
      i ? this.reject(i) : this.resolve(o),
        typeof s == 'function' &&
          (this.promise.catch(() => {}), s.length === 1 ? s(i) : s(i, o));
    };
  }
}
function ov() {
  try {
    return typeof indexedDB == 'object';
  } catch {
    return !1;
  }
}
function lv() {
  return new Promise((n, s) => {
    try {
      let i = !0;
      const o = 'validate-browser-context-for-indexeddb-analytics-module',
        c = self.indexedDB.open(o);
      (c.onsuccess = () => {
        c.result.close(), i || self.indexedDB.deleteDatabase(o), n(!0);
      }),
        (c.onupgradeneeded = () => {
          i = !1;
        }),
        (c.onerror = () => {
          s(c.error?.message || '');
        });
    } catch (i) {
      s(i);
    }
  });
}
function Ow() {
  return !(typeof navigator > 'u' || !navigator.cookieEnabled);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const kw = 'FirebaseError';
class Ws extends Error {
  constructor(s, i, o) {
    super(i),
      (this.code = s),
      (this.customData = o),
      (this.name = kw),
      Object.setPrototypeOf(this, Ws.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, al.prototype.create);
  }
}
class al {
  constructor(s, i, o) {
    (this.service = s), (this.serviceName = i), (this.errors = o);
  }
  create(s, ...i) {
    const o = i[0] || {},
      c = `${this.service}/${s}`,
      f = this.errors[s],
      h = f ? Dw(f, o) : 'Error',
      m = `${this.serviceName}: ${h} (${c}).`;
    return new Ws(c, m, o);
  }
}
function Dw(n, s) {
  return n.replace(Nw, (i, o) => {
    const c = s[o];
    return c != null ? String(c) : `<${o}?>`;
  });
}
const Nw = /\{\$([^}]+)}/g;
function wf(n, s) {
  if (n === s) return !0;
  const i = Object.keys(n),
    o = Object.keys(s);
  for (const c of i) {
    if (!o.includes(c)) return !1;
    const f = n[c],
      h = s[c];
    if (zp(f) && zp(h)) {
      if (!wf(f, h)) return !1;
    } else if (f !== h) return !1;
  }
  for (const c of o) if (!i.includes(c)) return !1;
  return !0;
}
function zp(n) {
  return n !== null && typeof n == 'object';
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $f(n) {
  return n && n._delegate ? n._delegate : n;
}
class da {
  constructor(s, i, o) {
    (this.name = s),
      (this.instanceFactory = i),
      (this.type = o),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = 'LAZY'),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(s) {
    return (this.instantiationMode = s), this;
  }
  setMultipleInstances(s) {
    return (this.multipleInstances = s), this;
  }
  setServiceProps(s) {
    return (this.serviceProps = s), this;
  }
  setInstanceCreatedCallback(s) {
    return (this.onInstanceCreated = s), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ja = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Lw {
  constructor(s, i) {
    (this.name = s),
      (this.container = i),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(s) {
    const i = this.normalizeInstanceIdentifier(s);
    if (!this.instancesDeferred.has(i)) {
      const o = new Mw();
      if (
        (this.instancesDeferred.set(i, o),
        this.isInitialized(i) || this.shouldAutoInitialize())
      )
        try {
          const c = this.getOrInitializeService({ instanceIdentifier: i });
          c && o.resolve(c);
        } catch {}
    }
    return this.instancesDeferred.get(i).promise;
  }
  getImmediate(s) {
    const i = this.normalizeInstanceIdentifier(s?.identifier),
      o = s?.optional ?? !1;
    if (this.isInitialized(i) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: i });
      } catch (c) {
        if (o) return null;
        throw c;
      }
    else {
      if (o) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(s) {
    if (s.name !== this.name)
      throw Error(`Mismatching Component ${s.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = s), !!this.shouldAutoInitialize())) {
      if (Bw(s))
        try {
          this.getOrInitializeService({ instanceIdentifier: ja });
        } catch {}
      for (const [i, o] of this.instancesDeferred.entries()) {
        const c = this.normalizeInstanceIdentifier(i);
        try {
          const f = this.getOrInitializeService({ instanceIdentifier: c });
          o.resolve(f);
        } catch {}
      }
    }
  }
  clearInstance(s = ja) {
    this.instancesDeferred.delete(s),
      this.instancesOptions.delete(s),
      this.instances.delete(s);
  }
  async delete() {
    const s = Array.from(this.instances.values());
    await Promise.all([
      ...s.filter((i) => 'INTERNAL' in i).map((i) => i.INTERNAL.delete()),
      ...s.filter((i) => '_delete' in i).map((i) => i._delete()),
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(s = ja) {
    return this.instances.has(s);
  }
  getOptions(s = ja) {
    return this.instancesOptions.get(s) || {};
  }
  initialize(s = {}) {
    const { options: i = {} } = s,
      o = this.normalizeInstanceIdentifier(s.instanceIdentifier);
    if (this.isInitialized(o))
      throw Error(`${this.name}(${o}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const c = this.getOrInitializeService({
      instanceIdentifier: o,
      options: i,
    });
    for (const [f, h] of this.instancesDeferred.entries()) {
      const m = this.normalizeInstanceIdentifier(f);
      o === m && h.resolve(c);
    }
    return c;
  }
  onInit(s, i) {
    const o = this.normalizeInstanceIdentifier(i),
      c = this.onInitCallbacks.get(o) ?? new Set();
    c.add(s), this.onInitCallbacks.set(o, c);
    const f = this.instances.get(o);
    return (
      f && s(f, o),
      () => {
        c.delete(s);
      }
    );
  }
  invokeOnInitCallbacks(s, i) {
    const o = this.onInitCallbacks.get(i);
    if (o)
      for (const c of o)
        try {
          c(s, i);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: s, options: i = {} }) {
    let o = this.instances.get(s);
    if (
      !o &&
      this.component &&
      ((o = this.component.instanceFactory(this.container, {
        instanceIdentifier: jw(s),
        options: i,
      })),
      this.instances.set(s, o),
      this.instancesOptions.set(s, i),
      this.invokeOnInitCallbacks(o, s),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, s, o);
      } catch {}
    return o || null;
  }
  normalizeInstanceIdentifier(s = ja) {
    return this.component ? (this.component.multipleInstances ? s : ja) : s;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== 'EXPLICIT';
  }
}
function jw(n) {
  return n === ja ? void 0 : n;
}
function Bw(n) {
  return n.instantiationMode === 'EAGER';
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zw {
  constructor(s) {
    (this.name = s), (this.providers = new Map());
  }
  addComponent(s) {
    const i = this.getProvider(s.name);
    if (i.isComponentSet())
      throw new Error(
        `Component ${s.name} has already been registered with ${this.name}`
      );
    i.setComponent(s);
  }
  addOrOverwriteComponent(s) {
    this.getProvider(s.name).isComponentSet() && this.providers.delete(s.name),
      this.addComponent(s);
  }
  getProvider(s) {
    if (this.providers.has(s)) return this.providers.get(s);
    const i = new Lw(s, this);
    return this.providers.set(s, i), i;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Le;
(function (n) {
  (n[(n.DEBUG = 0)] = 'DEBUG'),
    (n[(n.VERBOSE = 1)] = 'VERBOSE'),
    (n[(n.INFO = 2)] = 'INFO'),
    (n[(n.WARN = 3)] = 'WARN'),
    (n[(n.ERROR = 4)] = 'ERROR'),
    (n[(n.SILENT = 5)] = 'SILENT');
})(Le || (Le = {}));
const Uw = {
    debug: Le.DEBUG,
    verbose: Le.VERBOSE,
    info: Le.INFO,
    warn: Le.WARN,
    error: Le.ERROR,
    silent: Le.SILENT,
  },
  Iw = Le.INFO,
  Hw = {
    [Le.DEBUG]: 'log',
    [Le.VERBOSE]: 'log',
    [Le.INFO]: 'info',
    [Le.WARN]: 'warn',
    [Le.ERROR]: 'error',
  },
  Pw = (n, s, ...i) => {
    if (s < n.logLevel) return;
    const o = new Date().toISOString(),
      c = Hw[s];
    if (c) console[c](`[${o}]  ${n.name}:`, ...i);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${s})`
      );
  };
class qw {
  constructor(s) {
    (this.name = s),
      (this._logLevel = Iw),
      (this._logHandler = Pw),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(s) {
    if (!(s in Le))
      throw new TypeError(`Invalid value "${s}" assigned to \`logLevel\``);
    this._logLevel = s;
  }
  setLogLevel(s) {
    this._logLevel = typeof s == 'string' ? Uw[s] : s;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(s) {
    if (typeof s != 'function')
      throw new TypeError('Value assigned to `logHandler` must be a function');
    this._logHandler = s;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(s) {
    this._userLogHandler = s;
  }
  debug(...s) {
    this._userLogHandler && this._userLogHandler(this, Le.DEBUG, ...s),
      this._logHandler(this, Le.DEBUG, ...s);
  }
  log(...s) {
    this._userLogHandler && this._userLogHandler(this, Le.VERBOSE, ...s),
      this._logHandler(this, Le.VERBOSE, ...s);
  }
  info(...s) {
    this._userLogHandler && this._userLogHandler(this, Le.INFO, ...s),
      this._logHandler(this, Le.INFO, ...s);
  }
  warn(...s) {
    this._userLogHandler && this._userLogHandler(this, Le.WARN, ...s),
      this._logHandler(this, Le.WARN, ...s);
  }
  error(...s) {
    this._userLogHandler && this._userLogHandler(this, Le.ERROR, ...s),
      this._logHandler(this, Le.ERROR, ...s);
  }
}
const $w = (n, s) => s.some((i) => n instanceof i);
let Up, Ip;
function Gw() {
  return (
    Up ||
    (Up = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function Vw() {
  return (
    Ip ||
    (Ip = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const cv = new WeakMap(),
  Tf = new WeakMap(),
  uv = new WeakMap(),
  Iu = new WeakMap(),
  Gf = new WeakMap();
function Qw(n) {
  const s = new Promise((i, o) => {
    const c = () => {
        n.removeEventListener('success', f), n.removeEventListener('error', h);
      },
      f = () => {
        i(Mn(n.result)), c();
      },
      h = () => {
        o(n.error), c();
      };
    n.addEventListener('success', f), n.addEventListener('error', h);
  });
  return (
    s
      .then((i) => {
        i instanceof IDBCursor && cv.set(i, n);
      })
      .catch(() => {}),
    Gf.set(s, n),
    s
  );
}
function Kw(n) {
  if (Tf.has(n)) return;
  const s = new Promise((i, o) => {
    const c = () => {
        n.removeEventListener('complete', f),
          n.removeEventListener('error', h),
          n.removeEventListener('abort', h);
      },
      f = () => {
        i(), c();
      },
      h = () => {
        o(n.error || new DOMException('AbortError', 'AbortError')), c();
      };
    n.addEventListener('complete', f),
      n.addEventListener('error', h),
      n.addEventListener('abort', h);
  });
  Tf.set(n, s);
}
let Ef = {
  get(n, s, i) {
    if (n instanceof IDBTransaction) {
      if (s === 'done') return Tf.get(n);
      if (s === 'objectStoreNames') return n.objectStoreNames || uv.get(n);
      if (s === 'store')
        return i.objectStoreNames[1]
          ? void 0
          : i.objectStore(i.objectStoreNames[0]);
    }
    return Mn(n[s]);
  },
  set(n, s, i) {
    return (n[s] = i), !0;
  },
  has(n, s) {
    return n instanceof IDBTransaction && (s === 'done' || s === 'store')
      ? !0
      : s in n;
  },
};
function Fw(n) {
  Ef = n(Ef);
}
function Yw(n) {
  return n === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (s, ...i) {
        const o = n.call(Hu(this), s, ...i);
        return uv.set(o, s.sort ? s.sort() : [s]), Mn(o);
      }
    : Vw().includes(n)
    ? function (...s) {
        return n.apply(Hu(this), s), Mn(cv.get(this));
      }
    : function (...s) {
        return Mn(n.apply(Hu(this), s));
      };
}
function Xw(n) {
  return typeof n == 'function'
    ? Yw(n)
    : (n instanceof IDBTransaction && Kw(n),
      $w(n, Gw()) ? new Proxy(n, Ef) : n);
}
function Mn(n) {
  if (n instanceof IDBRequest) return Qw(n);
  if (Iu.has(n)) return Iu.get(n);
  const s = Xw(n);
  return s !== n && (Iu.set(n, s), Gf.set(s, n)), s;
}
const Hu = (n) => Gf.get(n);
function sl(n, s, { blocked: i, upgrade: o, blocking: c, terminated: f } = {}) {
  const h = indexedDB.open(n, s),
    m = Mn(h);
  return (
    o &&
      h.addEventListener('upgradeneeded', (g) => {
        o(Mn(h.result), g.oldVersion, g.newVersion, Mn(h.transaction), g);
      }),
    i && h.addEventListener('blocked', (g) => i(g.oldVersion, g.newVersion, g)),
    m
      .then((g) => {
        f && g.addEventListener('close', () => f()),
          c &&
            g.addEventListener('versionchange', (d) =>
              c(d.oldVersion, d.newVersion, d)
            );
      })
      .catch(() => {}),
    m
  );
}
function Pu(n, { blocked: s } = {}) {
  const i = indexedDB.deleteDatabase(n);
  return (
    s && i.addEventListener('blocked', (o) => s(o.oldVersion, o)),
    Mn(i).then(() => {})
  );
}
const Ww = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Zw = ['put', 'add', 'delete', 'clear'],
  qu = new Map();
function Hp(n, s) {
  if (!(n instanceof IDBDatabase && !(s in n) && typeof s == 'string')) return;
  if (qu.get(s)) return qu.get(s);
  const i = s.replace(/FromIndex$/, ''),
    o = s !== i,
    c = Zw.includes(i);
  if (
    !(i in (o ? IDBIndex : IDBObjectStore).prototype) ||
    !(c || Ww.includes(i))
  )
    return;
  const f = async function (h, ...m) {
    const g = this.transaction(h, c ? 'readwrite' : 'readonly');
    let d = g.store;
    return (
      o && (d = d.index(m.shift())),
      (await Promise.all([d[i](...m), c && g.done]))[0]
    );
  };
  return qu.set(s, f), f;
}
Fw((n) => ({
  ...n,
  get: (s, i, o) => Hp(s, i) || n.get(s, i, o),
  has: (s, i) => !!Hp(s, i) || n.has(s, i),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Jw {
  constructor(s) {
    this.container = s;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((i) => {
        if (eT(i)) {
          const o = i.getImmediate();
          return `${o.library}/${o.version}`;
        } else return null;
      })
      .filter((i) => i)
      .join(' ');
  }
}
function eT(n) {
  return n.getComponent()?.type === 'VERSION';
}
const xf = '@firebase/app',
  Pp = '0.14.1';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const kn = new qw('@firebase/app'),
  tT = '@firebase/app-compat',
  nT = '@firebase/analytics-compat',
  aT = '@firebase/analytics',
  sT = '@firebase/app-check-compat',
  iT = '@firebase/app-check',
  rT = '@firebase/auth',
  oT = '@firebase/auth-compat',
  lT = '@firebase/database',
  cT = '@firebase/data-connect',
  uT = '@firebase/database-compat',
  fT = '@firebase/functions',
  dT = '@firebase/functions-compat',
  hT = '@firebase/installations',
  gT = '@firebase/installations-compat',
  mT = '@firebase/messaging',
  pT = '@firebase/messaging-compat',
  yT = '@firebase/performance',
  vT = '@firebase/performance-compat',
  ST = '@firebase/remote-config',
  bT = '@firebase/remote-config-compat',
  _T = '@firebase/storage',
  wT = '@firebase/storage-compat',
  TT = '@firebase/firestore',
  ET = '@firebase/ai',
  xT = '@firebase/firestore-compat',
  RT = 'firebase';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Rf = '[DEFAULT]',
  CT = {
    [xf]: 'fire-core',
    [tT]: 'fire-core-compat',
    [aT]: 'fire-analytics',
    [nT]: 'fire-analytics-compat',
    [iT]: 'fire-app-check',
    [sT]: 'fire-app-check-compat',
    [rT]: 'fire-auth',
    [oT]: 'fire-auth-compat',
    [lT]: 'fire-rtdb',
    [cT]: 'fire-data-connect',
    [uT]: 'fire-rtdb-compat',
    [fT]: 'fire-fn',
    [dT]: 'fire-fn-compat',
    [hT]: 'fire-iid',
    [gT]: 'fire-iid-compat',
    [mT]: 'fire-fcm',
    [pT]: 'fire-fcm-compat',
    [yT]: 'fire-perf',
    [vT]: 'fire-perf-compat',
    [ST]: 'fire-rc',
    [bT]: 'fire-rc-compat',
    [_T]: 'fire-gcs',
    [wT]: 'fire-gcs-compat',
    [TT]: 'fire-fst',
    [xT]: 'fire-fst-compat',
    [ET]: 'fire-vertex',
    'fire-js': 'fire-js',
    [RT]: 'fire-js-all',
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Xo = new Map(),
  AT = new Map(),
  Cf = new Map();
function qp(n, s) {
  try {
    n.container.addComponent(s);
  } catch (i) {
    kn.debug(
      `Component ${s.name} failed to register with FirebaseApp ${n.name}`,
      i
    );
  }
}
function Ga(n) {
  const s = n.name;
  if (Cf.has(s))
    return (
      kn.debug(`There were multiple attempts to register component ${s}.`), !1
    );
  Cf.set(s, n);
  for (const i of Xo.values()) qp(i, n);
  for (const i of AT.values()) qp(i, n);
  return !0;
}
function Vf(n, s) {
  const i = n.container.getProvider('heartbeat').getImmediate({ optional: !0 });
  return i && i.triggerHeartbeat(), n.container.getProvider(s);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const MT = {
    'no-app':
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    'bad-app-name': "Illegal App name: '{$appName}'",
    'duplicate-app':
      "Firebase App named '{$appName}' already exists with different options or config",
    'app-deleted': "Firebase App named '{$appName}' already deleted",
    'server-app-deleted': 'Firebase Server App has been deleted',
    'no-options':
      'Need to provide options, when not being deployed to hosting via source.',
    'invalid-app-argument':
      'firebase.{$appName}() takes either no argument or a Firebase App instance.',
    'invalid-log-argument':
      'First argument to `onLog` must be null or a function.',
    'idb-open':
      'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
    'idb-get':
      'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
    'idb-set':
      'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
    'idb-delete':
      'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
    'finalization-registry-not-supported':
      'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',
    'invalid-server-app-environment':
      'FirebaseServerApp is not for use in browser environments.',
  },
  ca = new al('app', 'Firebase', MT);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class OT {
  constructor(s, i, o) {
    (this._isDeleted = !1),
      (this._options = { ...s }),
      (this._config = { ...i }),
      (this._name = i.name),
      (this._automaticDataCollectionEnabled = i.automaticDataCollectionEnabled),
      (this._container = o),
      this.container.addComponent(new da('app', () => this, 'PUBLIC'));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(s) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = s);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(s) {
    this._isDeleted = s;
  }
  checkDestroyed() {
    if (this.isDeleted) throw ca.create('app-deleted', { appName: this._name });
  }
}
function fv(n, s = {}) {
  let i = n;
  typeof s != 'object' && (s = { name: s });
  const o = { name: Rf, automaticDataCollectionEnabled: !0, ...s },
    c = o.name;
  if (typeof c != 'string' || !c)
    throw ca.create('bad-app-name', { appName: String(c) });
  if ((i || (i = rv()), !i)) throw ca.create('no-options');
  const f = Xo.get(c);
  if (f) {
    if (wf(i, f.options) && wf(o, f.config)) return f;
    throw ca.create('duplicate-app', { appName: c });
  }
  const h = new zw(c);
  for (const g of Cf.values()) h.addComponent(g);
  const m = new OT(i, o, h);
  return Xo.set(c, m), m;
}
function kT(n = Rf) {
  const s = Xo.get(n);
  if (!s && n === Rf && rv()) return fv();
  if (!s) throw ca.create('no-app', { appName: n });
  return s;
}
function ua(n, s, i) {
  let o = CT[n] ?? n;
  i && (o += `-${i}`);
  const c = o.match(/\s|\//),
    f = s.match(/\s|\//);
  if (c || f) {
    const h = [`Unable to register library "${o}" with version "${s}":`];
    c &&
      h.push(
        `library name "${o}" contains illegal characters (whitespace or "/")`
      ),
      c && f && h.push('and'),
      f &&
        h.push(
          `version name "${s}" contains illegal characters (whitespace or "/")`
        ),
      kn.warn(h.join(' '));
    return;
  }
  Ga(new da(`${o}-version`, () => ({ library: o, version: s }), 'VERSION'));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const DT = 'firebase-heartbeat-database',
  NT = 1,
  dr = 'firebase-heartbeat-store';
let $u = null;
function dv() {
  return (
    $u ||
      ($u = sl(DT, NT, {
        upgrade: (n, s) => {
          switch (s) {
            case 0:
              try {
                n.createObjectStore(dr);
              } catch (i) {
                console.warn(i);
              }
          }
        },
      }).catch((n) => {
        throw ca.create('idb-open', { originalErrorMessage: n.message });
      })),
    $u
  );
}
async function LT(n) {
  try {
    const i = (await dv()).transaction(dr),
      o = await i.objectStore(dr).get(hv(n));
    return await i.done, o;
  } catch (s) {
    if (s instanceof Ws) kn.warn(s.message);
    else {
      const i = ca.create('idb-get', { originalErrorMessage: s?.message });
      kn.warn(i.message);
    }
  }
}
async function $p(n, s) {
  try {
    const o = (await dv()).transaction(dr, 'readwrite');
    await o.objectStore(dr).put(s, hv(n)), await o.done;
  } catch (i) {
    if (i instanceof Ws) kn.warn(i.message);
    else {
      const o = ca.create('idb-set', { originalErrorMessage: i?.message });
      kn.warn(o.message);
    }
  }
}
function hv(n) {
  return `${n.name}!${n.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const jT = 1024,
  BT = 30;
class zT {
  constructor(s) {
    (this.container = s), (this._heartbeatsCache = null);
    const i = this.container.getProvider('app').getImmediate();
    (this._storage = new IT(i)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((o) => ((this._heartbeatsCache = o), o)));
  }
  async triggerHeartbeat() {
    try {
      const i = this.container
          .getProvider('platform-logger')
          .getImmediate()
          .getPlatformInfoString(),
        o = Gp();
      if (
        (this._heartbeatsCache?.heartbeats == null &&
          ((this._heartbeatsCache = await this._heartbeatsCachePromise),
          this._heartbeatsCache?.heartbeats == null)) ||
        this._heartbeatsCache.lastSentHeartbeatDate === o ||
        this._heartbeatsCache.heartbeats.some((c) => c.date === o)
      )
        return;
      if (
        (this._heartbeatsCache.heartbeats.push({ date: o, agent: i }),
        this._heartbeatsCache.heartbeats.length > BT)
      ) {
        const c = HT(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(c, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (s) {
      kn.warn(s);
    }
  }
  async getHeartbeatsHeader() {
    try {
      if (
        (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
        this._heartbeatsCache?.heartbeats == null ||
          this._heartbeatsCache.heartbeats.length === 0)
      )
        return '';
      const s = Gp(),
        { heartbeatsToSend: i, unsentEntries: o } = UT(
          this._heartbeatsCache.heartbeats
        ),
        c = iv(JSON.stringify({ version: 2, heartbeats: i }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = s),
        o.length > 0
          ? ((this._heartbeatsCache.heartbeats = o),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        c
      );
    } catch (s) {
      return kn.warn(s), '';
    }
  }
}
function Gp() {
  return new Date().toISOString().substring(0, 10);
}
function UT(n, s = jT) {
  const i = [];
  let o = n.slice();
  for (const c of n) {
    const f = i.find((h) => h.agent === c.agent);
    if (f) {
      if ((f.dates.push(c.date), Vp(i) > s)) {
        f.dates.pop();
        break;
      }
    } else if ((i.push({ agent: c.agent, dates: [c.date] }), Vp(i) > s)) {
      i.pop();
      break;
    }
    o = o.slice(1);
  }
  return { heartbeatsToSend: i, unsentEntries: o };
}
class IT {
  constructor(s) {
    (this.app = s),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return ov()
      ? lv()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const i = await LT(this.app);
      return i?.heartbeats ? i : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(s) {
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return $p(this.app, {
        lastSentHeartbeatDate:
          s.lastSentHeartbeatDate ?? o.lastSentHeartbeatDate,
        heartbeats: s.heartbeats,
      });
    } else return;
  }
  async add(s) {
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return $p(this.app, {
        lastSentHeartbeatDate:
          s.lastSentHeartbeatDate ?? o.lastSentHeartbeatDate,
        heartbeats: [...o.heartbeats, ...s.heartbeats],
      });
    } else return;
  }
}
function Vp(n) {
  return iv(JSON.stringify({ version: 2, heartbeats: n })).length;
}
function HT(n) {
  if (n.length === 0) return -1;
  let s = 0,
    i = n[0].date;
  for (let o = 1; o < n.length; o++)
    n[o].date < i && ((i = n[o].date), (s = o));
  return s;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function PT(n) {
  Ga(new da('platform-logger', (s) => new Jw(s), 'PRIVATE')),
    Ga(new da('heartbeat', (s) => new zT(s), 'PRIVATE')),
    ua(xf, Pp, n),
    ua(xf, Pp, 'esm2020'),
    ua('fire-js', '');
}
PT('');
var qT = 'firebase',
  $T = '12.1.0';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ ua(qT, $T, 'app');
const gv = '@firebase/installations',
  Qf = '0.6.19';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const mv = 1e4,
  pv = `w:${Qf}`,
  yv = 'FIS_v2',
  GT = 'https://firebaseinstallations.googleapis.com/v1',
  VT = 3600 * 1e3,
  QT = 'installations',
  KT = 'Installations';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const FT = {
    'missing-app-config-values':
      'Missing App configuration value: "{$valueName}"',
    'not-registered': 'Firebase Installation is not registered.',
    'installation-not-found': 'Firebase Installation not found.',
    'request-failed':
      '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    'app-offline': 'Could not process request. Application offline.',
    'delete-pending-registration':
      "Can't delete installation while there is a pending registration request.",
  },
  Va = new al(QT, KT, FT);
function vv(n) {
  return n instanceof Ws && n.code.includes('request-failed');
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Sv({ projectId: n }) {
  return `${GT}/projects/${n}/installations`;
}
function bv(n) {
  return {
    token: n.token,
    requestStatus: 2,
    expiresIn: XT(n.expiresIn),
    creationTime: Date.now(),
  };
}
async function _v(n, s) {
  const o = (await s.json()).error;
  return Va.create('request-failed', {
    requestName: n,
    serverCode: o.code,
    serverMessage: o.message,
    serverStatus: o.status,
  });
}
function wv({ apiKey: n }) {
  return new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-goog-api-key': n,
  });
}
function YT(n, { refreshToken: s }) {
  const i = wv(n);
  return i.append('Authorization', WT(s)), i;
}
async function Tv(n) {
  const s = await n();
  return s.status >= 500 && s.status < 600 ? n() : s;
}
function XT(n) {
  return Number(n.replace('s', '000'));
}
function WT(n) {
  return `${yv} ${n}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ZT(
  { appConfig: n, heartbeatServiceProvider: s },
  { fid: i }
) {
  const o = Sv(n),
    c = wv(n),
    f = s.getImmediate({ optional: !0 });
  if (f) {
    const d = await f.getHeartbeatsHeader();
    d && c.append('x-firebase-client', d);
  }
  const h = { fid: i, authVersion: yv, appId: n.appId, sdkVersion: pv },
    m = { method: 'POST', headers: c, body: JSON.stringify(h) },
    g = await Tv(() => fetch(o, m));
  if (g.ok) {
    const d = await g.json();
    return {
      fid: d.fid || i,
      registrationStatus: 2,
      refreshToken: d.refreshToken,
      authToken: bv(d.authToken),
    };
  } else throw await _v('Create Installation', g);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ev(n) {
  return new Promise((s) => {
    setTimeout(s, n);
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function JT(n) {
  return btoa(String.fromCharCode(...n))
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const eE = /^[cdef][\w-]{21}$/,
  Af = '';
function tE() {
  try {
    const n = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(n),
      (n[0] = 112 + (n[0] % 16));
    const i = nE(n);
    return eE.test(i) ? i : Af;
  } catch {
    return Af;
  }
}
function nE(n) {
  return JT(n).substr(0, 22);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function il(n) {
  return `${n.appName}!${n.appId}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xv = new Map();
function Rv(n, s) {
  const i = il(n);
  Cv(i, s), aE(i, s);
}
function Cv(n, s) {
  const i = xv.get(n);
  if (i) for (const o of i) o(s);
}
function aE(n, s) {
  const i = sE();
  i && i.postMessage({ key: n, fid: s }), iE();
}
let za = null;
function sE() {
  return (
    !za &&
      'BroadcastChannel' in self &&
      ((za = new BroadcastChannel('[Firebase] FID Change')),
      (za.onmessage = (n) => {
        Cv(n.data.key, n.data.fid);
      })),
    za
  );
}
function iE() {
  xv.size === 0 && za && (za.close(), (za = null));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const rE = 'firebase-installations-database',
  oE = 1,
  Qa = 'firebase-installations-store';
let Gu = null;
function Kf() {
  return (
    Gu ||
      (Gu = sl(rE, oE, {
        upgrade: (n, s) => {
          switch (s) {
            case 0:
              n.createObjectStore(Qa);
          }
        },
      })),
    Gu
  );
}
async function Wo(n, s) {
  const i = il(n),
    c = (await Kf()).transaction(Qa, 'readwrite'),
    f = c.objectStore(Qa),
    h = await f.get(i);
  return (
    await f.put(s, i), await c.done, (!h || h.fid !== s.fid) && Rv(n, s.fid), s
  );
}
async function Av(n) {
  const s = il(n),
    o = (await Kf()).transaction(Qa, 'readwrite');
  await o.objectStore(Qa).delete(s), await o.done;
}
async function rl(n, s) {
  const i = il(n),
    c = (await Kf()).transaction(Qa, 'readwrite'),
    f = c.objectStore(Qa),
    h = await f.get(i),
    m = s(h);
  return (
    m === void 0 ? await f.delete(i) : await f.put(m, i),
    await c.done,
    m && (!h || h.fid !== m.fid) && Rv(n, m.fid),
    m
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Ff(n) {
  let s;
  const i = await rl(n.appConfig, (o) => {
    const c = lE(o),
      f = cE(n, c);
    return (s = f.registrationPromise), f.installationEntry;
  });
  return i.fid === Af
    ? { installationEntry: await s }
    : { installationEntry: i, registrationPromise: s };
}
function lE(n) {
  const s = n || { fid: tE(), registrationStatus: 0 };
  return Mv(s);
}
function cE(n, s) {
  if (s.registrationStatus === 0) {
    if (!navigator.onLine) {
      const c = Promise.reject(Va.create('app-offline'));
      return { installationEntry: s, registrationPromise: c };
    }
    const i = {
        fid: s.fid,
        registrationStatus: 1,
        registrationTime: Date.now(),
      },
      o = uE(n, i);
    return { installationEntry: i, registrationPromise: o };
  } else
    return s.registrationStatus === 1
      ? { installationEntry: s, registrationPromise: fE(n) }
      : { installationEntry: s };
}
async function uE(n, s) {
  try {
    const i = await ZT(n, s);
    return Wo(n.appConfig, i);
  } catch (i) {
    throw (
      (vv(i) && i.customData.serverCode === 409
        ? await Av(n.appConfig)
        : await Wo(n.appConfig, { fid: s.fid, registrationStatus: 0 }),
      i)
    );
  }
}
async function fE(n) {
  let s = await Qp(n.appConfig);
  for (; s.registrationStatus === 1; )
    await Ev(100), (s = await Qp(n.appConfig));
  if (s.registrationStatus === 0) {
    const { installationEntry: i, registrationPromise: o } = await Ff(n);
    return o || i;
  }
  return s;
}
function Qp(n) {
  return rl(n, (s) => {
    if (!s) throw Va.create('installation-not-found');
    return Mv(s);
  });
}
function Mv(n) {
  return dE(n) ? { fid: n.fid, registrationStatus: 0 } : n;
}
function dE(n) {
  return n.registrationStatus === 1 && n.registrationTime + mv < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function hE({ appConfig: n, heartbeatServiceProvider: s }, i) {
  const o = gE(n, i),
    c = YT(n, i),
    f = s.getImmediate({ optional: !0 });
  if (f) {
    const d = await f.getHeartbeatsHeader();
    d && c.append('x-firebase-client', d);
  }
  const h = { installation: { sdkVersion: pv, appId: n.appId } },
    m = { method: 'POST', headers: c, body: JSON.stringify(h) },
    g = await Tv(() => fetch(o, m));
  if (g.ok) {
    const d = await g.json();
    return bv(d);
  } else throw await _v('Generate Auth Token', g);
}
function gE(n, { fid: s }) {
  return `${Sv(n)}/${s}/authTokens:generate`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Yf(n, s = !1) {
  let i;
  const o = await rl(n.appConfig, (f) => {
    if (!Ov(f)) throw Va.create('not-registered');
    const h = f.authToken;
    if (!s && yE(h)) return f;
    if (h.requestStatus === 1) return (i = mE(n, s)), f;
    {
      if (!navigator.onLine) throw Va.create('app-offline');
      const m = SE(f);
      return (i = pE(n, m)), m;
    }
  });
  return i ? await i : o.authToken;
}
async function mE(n, s) {
  let i = await Kp(n.appConfig);
  for (; i.authToken.requestStatus === 1; )
    await Ev(100), (i = await Kp(n.appConfig));
  const o = i.authToken;
  return o.requestStatus === 0 ? Yf(n, s) : o;
}
function Kp(n) {
  return rl(n, (s) => {
    if (!Ov(s)) throw Va.create('not-registered');
    const i = s.authToken;
    return bE(i) ? { ...s, authToken: { requestStatus: 0 } } : s;
  });
}
async function pE(n, s) {
  try {
    const i = await hE(n, s),
      o = { ...s, authToken: i };
    return await Wo(n.appConfig, o), i;
  } catch (i) {
    if (
      vv(i) &&
      (i.customData.serverCode === 401 || i.customData.serverCode === 404)
    )
      await Av(n.appConfig);
    else {
      const o = { ...s, authToken: { requestStatus: 0 } };
      await Wo(n.appConfig, o);
    }
    throw i;
  }
}
function Ov(n) {
  return n !== void 0 && n.registrationStatus === 2;
}
function yE(n) {
  return n.requestStatus === 2 && !vE(n);
}
function vE(n) {
  const s = Date.now();
  return s < n.creationTime || n.creationTime + n.expiresIn < s + VT;
}
function SE(n) {
  const s = { requestStatus: 1, requestTime: Date.now() };
  return { ...n, authToken: s };
}
function bE(n) {
  return n.requestStatus === 1 && n.requestTime + mv < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function _E(n) {
  const s = n,
    { installationEntry: i, registrationPromise: o } = await Ff(s);
  return o ? o.catch(console.error) : Yf(s).catch(console.error), i.fid;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function wE(n, s = !1) {
  const i = n;
  return await TE(i), (await Yf(i, s)).token;
}
async function TE(n) {
  const { registrationPromise: s } = await Ff(n);
  s && (await s);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function EE(n) {
  if (!n || !n.options) throw Vu('App Configuration');
  if (!n.name) throw Vu('App Name');
  const s = ['projectId', 'apiKey', 'appId'];
  for (const i of s) if (!n.options[i]) throw Vu(i);
  return {
    appName: n.name,
    projectId: n.options.projectId,
    apiKey: n.options.apiKey,
    appId: n.options.appId,
  };
}
function Vu(n) {
  return Va.create('missing-app-config-values', { valueName: n });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const kv = 'installations',
  xE = 'installations-internal',
  RE = (n) => {
    const s = n.getProvider('app').getImmediate(),
      i = EE(s),
      o = Vf(s, 'heartbeat');
    return {
      app: s,
      appConfig: i,
      heartbeatServiceProvider: o,
      _delete: () => Promise.resolve(),
    };
  },
  CE = (n) => {
    const s = n.getProvider('app').getImmediate(),
      i = Vf(s, kv).getImmediate();
    return { getId: () => _E(i), getToken: (c) => wE(i, c) };
  };
function AE() {
  Ga(new da(kv, RE, 'PUBLIC')), Ga(new da(xE, CE, 'PRIVATE'));
}
AE();
ua(gv, Qf);
ua(gv, Qf, 'esm2020');
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ME = '/firebase-messaging-sw.js',
  OE = '/firebase-cloud-messaging-push-scope',
  Dv =
    'BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4',
  kE = 'https://fcmregistrations.googleapis.com/v1',
  Nv = 'google.c.a.c_id',
  DE = 'google.c.a.c_l',
  NE = 'google.c.a.ts',
  LE = 'google.c.a.e',
  Fp = 1e4;
var Yp;
(function (n) {
  (n[(n.DATA_MESSAGE = 1)] = 'DATA_MESSAGE'),
    (n[(n.DISPLAY_NOTIFICATION = 3)] = 'DISPLAY_NOTIFICATION');
})(Yp || (Yp = {}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */ var hr;
(function (n) {
  (n.PUSH_RECEIVED = 'push-received'),
    (n.NOTIFICATION_CLICKED = 'notification-clicked');
})(hr || (hr = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function xn(n) {
  const s = new Uint8Array(n);
  return btoa(String.fromCharCode(...s))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}
function jE(n) {
  const s = '='.repeat((4 - (n.length % 4)) % 4),
    i = (n + s).replace(/\-/g, '+').replace(/_/g, '/'),
    o = atob(i),
    c = new Uint8Array(o.length);
  for (let f = 0; f < o.length; ++f) c[f] = o.charCodeAt(f);
  return c;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Qu = 'fcm_token_details_db',
  BE = 5,
  Xp = 'fcm_token_object_Store';
async function zE(n) {
  if (
    'databases' in indexedDB &&
    !(await indexedDB.databases()).map((f) => f.name).includes(Qu)
  )
    return null;
  let s = null;
  return (
    (
      await sl(Qu, BE, {
        upgrade: async (o, c, f, h) => {
          if (c < 2 || !o.objectStoreNames.contains(Xp)) return;
          const m = h.objectStore(Xp),
            g = await m.index('fcmSenderId').get(n);
          if ((await m.clear(), !!g)) {
            if (c === 2) {
              const d = g;
              if (!d.auth || !d.p256dh || !d.endpoint) return;
              s = {
                token: d.fcmToken,
                createTime: d.createTime ?? Date.now(),
                subscriptionOptions: {
                  auth: d.auth,
                  p256dh: d.p256dh,
                  endpoint: d.endpoint,
                  swScope: d.swScope,
                  vapidKey:
                    typeof d.vapidKey == 'string' ? d.vapidKey : xn(d.vapidKey),
                },
              };
            } else if (c === 3) {
              const d = g;
              s = {
                token: d.fcmToken,
                createTime: d.createTime,
                subscriptionOptions: {
                  auth: xn(d.auth),
                  p256dh: xn(d.p256dh),
                  endpoint: d.endpoint,
                  swScope: d.swScope,
                  vapidKey: xn(d.vapidKey),
                },
              };
            } else if (c === 4) {
              const d = g;
              s = {
                token: d.fcmToken,
                createTime: d.createTime,
                subscriptionOptions: {
                  auth: xn(d.auth),
                  p256dh: xn(d.p256dh),
                  endpoint: d.endpoint,
                  swScope: d.swScope,
                  vapidKey: xn(d.vapidKey),
                },
              };
            }
          }
        },
      })
    ).close(),
    await Pu(Qu),
    await Pu('fcm_vapid_details_db'),
    await Pu('undefined'),
    UE(s) ? s : null
  );
}
function UE(n) {
  if (!n || !n.subscriptionOptions) return !1;
  const { subscriptionOptions: s } = n;
  return (
    typeof n.createTime == 'number' &&
    n.createTime > 0 &&
    typeof n.token == 'string' &&
    n.token.length > 0 &&
    typeof s.auth == 'string' &&
    s.auth.length > 0 &&
    typeof s.p256dh == 'string' &&
    s.p256dh.length > 0 &&
    typeof s.endpoint == 'string' &&
    s.endpoint.length > 0 &&
    typeof s.swScope == 'string' &&
    s.swScope.length > 0 &&
    typeof s.vapidKey == 'string' &&
    s.vapidKey.length > 0
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const IE = 'firebase-messaging-database',
  HE = 1,
  gr = 'firebase-messaging-store';
let Ku = null;
function Lv() {
  return (
    Ku ||
      (Ku = sl(IE, HE, {
        upgrade: (n, s) => {
          switch (s) {
            case 0:
              n.createObjectStore(gr);
          }
        },
      })),
    Ku
  );
}
async function PE(n) {
  const s = jv(n),
    o = await (await Lv()).transaction(gr).objectStore(gr).get(s);
  if (o) return o;
  {
    const c = await zE(n.appConfig.senderId);
    if (c) return await Xf(n, c), c;
  }
}
async function Xf(n, s) {
  const i = jv(n),
    c = (await Lv()).transaction(gr, 'readwrite');
  return await c.objectStore(gr).put(s, i), await c.done, s;
}
function jv({ appConfig: n }) {
  return n.appId;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const qE = {
    'missing-app-config-values':
      'Missing App configuration value: "{$valueName}"',
    'only-available-in-window': 'This method is available in a Window context.',
    'only-available-in-sw':
      'This method is available in a service worker context.',
    'permission-default':
      'The notification permission was not granted and dismissed instead.',
    'permission-blocked':
      'The notification permission was not granted and blocked instead.',
    'unsupported-browser':
      "This browser doesn't support the API's required to use the Firebase SDK.",
    'indexed-db-unsupported':
      "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
    'failed-service-worker-registration':
      'We are unable to register the default service worker. {$browserErrorMessage}',
    'token-subscribe-failed':
      'A problem occurred while subscribing the user to FCM: {$errorInfo}',
    'token-subscribe-no-token':
      'FCM returned no token when subscribing the user to push.',
    'token-unsubscribe-failed':
      'A problem occurred while unsubscribing the user from FCM: {$errorInfo}',
    'token-update-failed':
      'A problem occurred while updating the user from FCM: {$errorInfo}',
    'token-update-no-token':
      'FCM returned no token when updating the user to push.',
    'use-sw-after-get-token':
      'The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.',
    'invalid-sw-registration':
      'The input to useServiceWorker() must be a ServiceWorkerRegistration.',
    'invalid-bg-handler':
      'The input to setBackgroundMessageHandler() must be a function.',
    'invalid-vapid-key': 'The public VAPID key must be a string.',
    'use-vapid-key-after-get-token':
      'The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.',
  },
  ot = new al('messaging', 'Messaging', qE);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function $E(n, s) {
  const i = await Zf(n),
    o = Bv(s),
    c = { method: 'POST', headers: i, body: JSON.stringify(o) };
  let f;
  try {
    f = await (await fetch(Wf(n.appConfig), c)).json();
  } catch (h) {
    throw ot.create('token-subscribe-failed', { errorInfo: h?.toString() });
  }
  if (f.error) {
    const h = f.error.message;
    throw ot.create('token-subscribe-failed', { errorInfo: h });
  }
  if (!f.token) throw ot.create('token-subscribe-no-token');
  return f.token;
}
async function GE(n, s) {
  const i = await Zf(n),
    o = Bv(s.subscriptionOptions),
    c = { method: 'PATCH', headers: i, body: JSON.stringify(o) };
  let f;
  try {
    f = await (await fetch(`${Wf(n.appConfig)}/${s.token}`, c)).json();
  } catch (h) {
    throw ot.create('token-update-failed', { errorInfo: h?.toString() });
  }
  if (f.error) {
    const h = f.error.message;
    throw ot.create('token-update-failed', { errorInfo: h });
  }
  if (!f.token) throw ot.create('token-update-no-token');
  return f.token;
}
async function VE(n, s) {
  const o = { method: 'DELETE', headers: await Zf(n) };
  try {
    const f = await (await fetch(`${Wf(n.appConfig)}/${s}`, o)).json();
    if (f.error) {
      const h = f.error.message;
      throw ot.create('token-unsubscribe-failed', { errorInfo: h });
    }
  } catch (c) {
    throw ot.create('token-unsubscribe-failed', { errorInfo: c?.toString() });
  }
}
function Wf({ projectId: n }) {
  return `${kE}/projects/${n}/registrations`;
}
async function Zf({ appConfig: n, installations: s }) {
  const i = await s.getToken();
  return new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-goog-api-key': n.apiKey,
    'x-goog-firebase-installations-auth': `FIS ${i}`,
  });
}
function Bv({ p256dh: n, auth: s, endpoint: i, vapidKey: o }) {
  const c = { web: { endpoint: i, auth: s, p256dh: n } };
  return o !== Dv && (c.web.applicationPubKey = o), c;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const QE = 10080 * 60 * 1e3;
async function KE(n) {
  const s = await YE(n.swRegistration, n.vapidKey),
    i = {
      vapidKey: n.vapidKey,
      swScope: n.swRegistration.scope,
      endpoint: s.endpoint,
      auth: xn(s.getKey('auth')),
      p256dh: xn(s.getKey('p256dh')),
    },
    o = await PE(n.firebaseDependencies);
  if (o) {
    if (XE(o.subscriptionOptions, i))
      return Date.now() >= o.createTime + QE
        ? FE(n, {
            token: o.token,
            createTime: Date.now(),
            subscriptionOptions: i,
          })
        : o.token;
    try {
      await VE(n.firebaseDependencies, o.token);
    } catch (c) {
      console.warn(c);
    }
    return Wp(n.firebaseDependencies, i);
  } else return Wp(n.firebaseDependencies, i);
}
async function FE(n, s) {
  try {
    const i = await GE(n.firebaseDependencies, s),
      o = { ...s, token: i, createTime: Date.now() };
    return await Xf(n.firebaseDependencies, o), i;
  } catch (i) {
    throw i;
  }
}
async function Wp(n, s) {
  const o = {
    token: await $E(n, s),
    createTime: Date.now(),
    subscriptionOptions: s,
  };
  return await Xf(n, o), o.token;
}
async function YE(n, s) {
  const i = await n.pushManager.getSubscription();
  return (
    i ||
    n.pushManager.subscribe({
      userVisibleOnly: !0,
      applicationServerKey: jE(s),
    })
  );
}
function XE(n, s) {
  const i = s.vapidKey === n.vapidKey,
    o = s.endpoint === n.endpoint,
    c = s.auth === n.auth,
    f = s.p256dh === n.p256dh;
  return i && o && c && f;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Zp(n) {
  const s = {
    from: n.from,
    collapseKey: n.collapse_key,
    messageId: n.fcmMessageId,
  };
  return WE(s, n), ZE(s, n), JE(s, n), s;
}
function WE(n, s) {
  if (!s.notification) return;
  n.notification = {};
  const i = s.notification.title;
  i && (n.notification.title = i);
  const o = s.notification.body;
  o && (n.notification.body = o);
  const c = s.notification.image;
  c && (n.notification.image = c);
  const f = s.notification.icon;
  f && (n.notification.icon = f);
}
function ZE(n, s) {
  s.data && (n.data = s.data);
}
function JE(n, s) {
  if (!s.fcmOptions && !s.notification?.click_action) return;
  n.fcmOptions = {};
  const i = s.fcmOptions?.link ?? s.notification?.click_action;
  i && (n.fcmOptions.link = i);
  const o = s.fcmOptions?.analytics_label;
  o && (n.fcmOptions.analyticsLabel = o);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function e2(n) {
  return typeof n == 'object' && !!n && Nv in n;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function t2(n) {
  if (!n || !n.options) throw Fu('App Configuration Object');
  if (!n.name) throw Fu('App Name');
  const s = ['projectId', 'apiKey', 'appId', 'messagingSenderId'],
    { options: i } = n;
  for (const o of s) if (!i[o]) throw Fu(o);
  return {
    appName: n.name,
    projectId: i.projectId,
    apiKey: i.apiKey,
    appId: i.appId,
    senderId: i.messagingSenderId,
  };
}
function Fu(n) {
  return ot.create('missing-app-config-values', { valueName: n });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class n2 {
  constructor(s, i, o) {
    (this.deliveryMetricsExportedToBigQueryEnabled = !1),
      (this.onBackgroundMessageHandler = null),
      (this.onMessageHandler = null),
      (this.logEvents = []),
      (this.isLogServiceStarted = !1);
    const c = t2(s);
    this.firebaseDependencies = {
      app: s,
      appConfig: c,
      installations: i,
      analyticsProvider: o,
    };
  }
  _delete() {
    return Promise.resolve();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function a2(n) {
  try {
    (n.swRegistration = await navigator.serviceWorker.register(ME, {
      scope: OE,
    })),
      n.swRegistration.update().catch(() => {}),
      await s2(n.swRegistration);
  } catch (s) {
    throw ot.create('failed-service-worker-registration', {
      browserErrorMessage: s?.message,
    });
  }
}
async function s2(n) {
  return new Promise((s, i) => {
    const o = setTimeout(
        () => i(new Error(`Service worker not registered after ${Fp} ms`)),
        Fp
      ),
      c = n.installing || n.waiting;
    n.active
      ? (clearTimeout(o), s())
      : c
      ? (c.onstatechange = (f) => {
          f.target?.state === 'activated' &&
            ((c.onstatechange = null), clearTimeout(o), s());
        })
      : (clearTimeout(o), i(new Error('No incoming service worker found.')));
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function i2(n, s) {
  if ((!s && !n.swRegistration && (await a2(n)), !(!s && n.swRegistration))) {
    if (!(s instanceof ServiceWorkerRegistration))
      throw ot.create('invalid-sw-registration');
    n.swRegistration = s;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function r2(n, s) {
  s ? (n.vapidKey = s) : n.vapidKey || (n.vapidKey = Dv);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function zv(n, s) {
  if (!navigator) throw ot.create('only-available-in-window');
  if (
    (Notification.permission === 'default' &&
      (await Notification.requestPermission()),
    Notification.permission !== 'granted')
  )
    throw ot.create('permission-blocked');
  return (
    await r2(n, s?.vapidKey), await i2(n, s?.serviceWorkerRegistration), KE(n)
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function o2(n, s, i) {
  const o = l2(s);
  (await n.firebaseDependencies.analyticsProvider.get()).logEvent(o, {
    message_id: i[Nv],
    message_name: i[DE],
    message_time: i[NE],
    message_device_time: Math.floor(Date.now() / 1e3),
  });
}
function l2(n) {
  switch (n) {
    case hr.NOTIFICATION_CLICKED:
      return 'notification_open';
    case hr.PUSH_RECEIVED:
      return 'notification_foreground';
    default:
      throw new Error();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function c2(n, s) {
  const i = s.data;
  if (!i.isFirebaseMessaging) return;
  n.onMessageHandler &&
    i.messageType === hr.PUSH_RECEIVED &&
    (typeof n.onMessageHandler == 'function'
      ? n.onMessageHandler(Zp(i))
      : n.onMessageHandler.next(Zp(i)));
  const o = i.data;
  e2(o) && o[LE] === '1' && (await o2(n, i.messageType, o));
}
const Jp = '@firebase/messaging',
  ey = '0.12.23';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const u2 = (n) => {
    const s = new n2(
      n.getProvider('app').getImmediate(),
      n.getProvider('installations-internal').getImmediate(),
      n.getProvider('analytics-internal')
    );
    return (
      navigator.serviceWorker.addEventListener('message', (i) => c2(s, i)), s
    );
  },
  f2 = (n) => {
    const s = n.getProvider('messaging').getImmediate();
    return { getToken: (o) => zv(s, o) };
  };
function d2() {
  Ga(new da('messaging', u2, 'PUBLIC')),
    Ga(new da('messaging-internal', f2, 'PRIVATE')),
    ua(Jp, ey),
    ua(Jp, ey, 'esm2020');
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function h2() {
  try {
    await lv();
  } catch {
    return !1;
  }
  return (
    typeof window < 'u' &&
    ov() &&
    Ow() &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window &&
    'fetch' in window &&
    ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
    PushSubscription.prototype.hasOwnProperty('getKey')
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function g2(n, s) {
  if (!navigator) throw ot.create('only-available-in-window');
  return (
    (n.onMessageHandler = s),
    () => {
      n.onMessageHandler = null;
    }
  );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function m2(n = kT()) {
  return (
    h2().then(
      (s) => {
        if (!s) throw ot.create('unsupported-browser');
      },
      (s) => {
        throw ot.create('indexed-db-unsupported');
      }
    ),
    Vf($f(n), 'messaging').getImmediate()
  );
}
async function p2(n, s) {
  return (n = $f(n)), zv(n, s);
}
function y2(n, s) {
  return (n = $f(n)), g2(n, s);
}
d2();
const v2 = {
    apiKey: 'AIzaSyB6zO4euaX3bhPUBi-HFuF7rlkPs4AoKjk',
    authDomain: 'haeruhand-e75bf.firebaseapp.com',
    projectId: 'haeruhand-e75bf',
    storageBucket: 'haeruhand-e75bf.firebasestorage.app',
    messagingSenderId: '418951530336',
    appId: '1:418951530336:web:81509cfbac299a6d4ac005',
    measurementId: 'G-6H0X5S11CR',
  },
  S2 = fv(v2),
  ty = m2(S2);
class b2 {
  baseURL;
  constructor() {
    this.baseURL = 'https://haeruhand.o-r.kr/api';
  }
  getHeaders() {
    const s =
        sessionStorage.getItem('accessToken') ||
        localStorage.getItem('accessToken'),
      i = { Accept: 'application/json' };
    return s && (i.Authorization = `Bearer ${s}`), i;
  }
  getHeadersWithContentType() {
    const s = this.getHeaders();
    return (s['Content-Type'] = 'application/json'), s;
  }
  async get(s) {
    const i = await fetch(`${this.baseURL}${s}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    if (!i.ok) {
      const o = await i.text();
      throw new Error(`HTTP error! status: ${i.status}, message: ${o}`);
    }
    return await i.json();
  }
  async post(s, i, o) {
    const c = { ...this.getHeadersWithContentType(), ...o?.headers },
      f = await fetch(`${this.baseURL}${s}`, {
        method: 'POST',
        headers: c,
        body: i ? JSON.stringify(i) : void 0,
      });
    if (!f.ok) {
      const h = await f.text();
      throw new Error(`HTTP error! status: ${f.status}, message: ${h}`);
    }
    return await f.json();
  }
  async put(s, i) {
    const o = await fetch(`${this.baseURL}${s}`, {
      method: 'PUT',
      headers: this.getHeadersWithContentType(),
      body: i ? JSON.stringify(i) : void 0,
    });
    if (!o.ok) {
      const c = await o.text();
      throw new Error(`HTTP error! status: ${o.status}, message: ${c}`);
    }
    return await o.json();
  }
  async delete(s) {
    const i = await fetch(`${this.baseURL}${s}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!i.ok) {
      const o = await i.text();
      throw new Error(`HTTP error! status: ${i.status}, message: ${o}`);
    }
    return await i.json();
  }
  async uploadFile(s, i) {
    const o = await fetch(s, {
      method: 'PUT',
      headers: { 'Content-Type': i.type },
      body: i,
    });
    if (!o.ok) {
      const c = await o.text();
      throw new Error(`Upload failed! status: ${o.status}, message: ${c}`);
    }
  }
}
const Mt = new b2(),
  Yu = {
    VAPID_KEY:
      'BPmUYT3NHWepnMYOesYmwJIVNLqvwxO5gr9ULki1_kMa4mMF2ZvIhI1DllnONoNF2hhk9WqhP1CsIfU12BCJkaE',
    NOTIFICATION_ICON: '/haeruhand_app.png',
    NOTIFICATION_TAG: 'fcm-notification',
  },
  sr = {
    FCM_TOKEN_REGISTER: '/v1/notifications/tokens',
    FCM_TOKEN_UPDATE: (n) => `/v1/notifications/tokens/${n}`,
    FCM_TOKEN_DELETE: (n) => `/v1/notifications/tokens/${n}`,
    FCM_SEND_NOTIFICATION: '/v1/notifications/send',
    FCM_PING: '/v1/notifications/ping',
  },
  _2 = () => {
    const [n, s] = z.useState(null),
      [i, o] = z.useState(null),
      [c, f] = z.useState(!1),
      [h, m] = z.useState(null),
      g = z.useCallback(async () => {
        try {
          return (await Notification.requestPermission()) !== 'granted'
            ? (m('알림 권한이 필요합니다'), !1)
            : !0;
        } catch {
          return m('알림 권한 요청 중 오류가 발생했습니다'), !1;
        }
      }, []),
      d = z.useCallback(async () => {
        try {
          const O = await p2(ty, { vapidKey: Yu.VAPID_KEY });
          return O ? (s(O), O) : (m('토큰을 생성할 수 없습니다'), null);
        } catch {
          return m('토큰 생성 중 오류가 발생했습니다'), null;
        }
      }, []),
      v = z.useCallback(async (O, L) => {
        try {
          const U = await Mt.post(
            sr.FCM_TOKEN_REGISTER,
            { fcmToken: L },
            { headers: { 'X-User-Id': O.toString() } }
          );
          return U.is_success
            ? (f(!0), o(U.data.tokenId), !0)
            : (m(U.message || '토큰 등록에 실패했습니다'), !1);
        } catch {
          return m('토큰 등록 중 오류가 발생했습니다'), !1;
        }
      }, []),
      p = z.useCallback(
        async (O) => {
          if (!i) return m('토큰 ID가 없습니다'), !1;
          try {
            const L = await Mt.put(sr.FCM_TOKEN_UPDATE(i), { fcmToken: O });
            return L.is_success
              ? (o(L.data.tokenId), !0)
              : (m(L.message || '토큰 갱신에 실패했습니다'), !1);
          } catch {
            return m('토큰 갱신 중 오류가 발생했습니다'), !1;
          }
        },
        [i]
      ),
      b = z.useCallback(async () => {
        if (!i) return m('토큰 ID가 없습니다'), !1;
        try {
          const O = await Mt.delete(sr.FCM_TOKEN_DELETE(i));
          return O.is_success
            ? (f(!1), o(null), s(null), !0)
            : (m(O.message || '토큰 삭제에 실패했습니다'), !1);
        } catch {
          return m('토큰 삭제 중 오류가 발생했습니다'), !1;
        }
      }, [i]),
      T = z.useCallback(async (O) => {
        try {
          const L = await Mt.post(sr.FCM_SEND_NOTIFICATION, O);
          return L.is_success
            ? L.data
            : (m(L.message || '알림 전송에 실패했습니다'), null);
        } catch {
          return m('알림 전송 중 오류가 발생했습니다'), null;
        }
      }, []),
      w = z.useCallback(async () => {
        try {
          const O = await Mt.get(sr.FCM_PING);
          return O.is_success
            ? (console.log('FCM 서비스 상태:', O.data), !0)
            : (m(O.message || 'FCM 서비스 상태 확인에 실패했습니다'), !1);
        } catch {
          return m('FCM 서비스 상태 확인 중 오류가 발생했습니다'), !1;
        }
      }, []),
      E = z.useCallback(
        async (O) => {
          try {
            if (!(await g())) return !1;
            const U = await d();
            if (!U) return !1;
            let G;
            return i ? (G = await p(U)) : (G = await v(O, U)), G;
          } catch {
            return m('FCM 초기화 중 오류가 발생했습니다'), !1;
          }
        },
        [g, d, v, p, i]
      ),
      M = z.useCallback(
        (O) =>
          y2(ty, (L) => {
            console.log('포그라운드 메시지 수신:', L);
            const U = L.notification?.title || '알림',
              G = L.notification?.body || '새로운 메시지';
            Notification.permission === 'granted' &&
              navigator.serviceWorker.ready.then((I) => {
                I.showNotification(U, {
                  body: G,
                  icon: Yu.NOTIFICATION_ICON,
                  tag: Yu.NOTIFICATION_TAG,
                  requireInteraction: !0,
                });
              }),
              O?.(L);
          }),
        []
      );
    return {
      token: n,
      tokenId: i,
      isRegistered: c,
      error: h,
      initializeFCM: E,
      handleForegroundMessage: M,
      requestNotificationPermission: g,
      generateToken: d,
      registerToken: v,
      updateToken: p,
      deleteToken: b,
      sendNotification: T,
      checkFCMService: w,
    };
  },
  w2 = '_skeletonBase_nth7s_21',
  T2 = '_skeletonWarningBanner_nth7s_37',
  E2 = '_skeletonWarningContent_nth7s_53',
  x2 = '_skeletonWarningIcon_nth7s_65',
  R2 = '_skeletonWarningText_nth7s_77',
  C2 = '_skeletonWarningTitle_nth7s_91',
  A2 = '_skeletonWarningSubtitle_nth7s_101',
  M2 = '_skeletonWeatherWidget_nth7s_113',
  O2 = '_skeletonWidgetIcon_nth7s_135',
  k2 = '_skeletonWidgetContent_nth7s_147',
  D2 = '_skeletonWidgetSubtitle_nth7s_161',
  N2 = '_skeletonWidgetData_nth7s_171',
  L2 = '_skeletonMap_nth7s_183',
  j2 = '_skeletonMapContent_nth7s_201',
  B2 = '_skeletonMapPlaceholder_nth7s_215',
  z2 = '_skeletonCategoryButtons_nth7s_229',
  U2 = '_skeletonCategoryButton_nth7s_229',
  I2 = '_skeletonHarvestButton_nth7s_259',
  H2 = '_skeletonHarvestIcon_nth7s_283',
  P2 = '_skeletonHarvestText_nth7s_295',
  q2 = '_skeletonActionButtons_nth7s_307',
  $2 = '_skeletonActionButton_nth7s_307',
  je = {
    skeletonBase: w2,
    skeletonWarningBanner: T2,
    skeletonWarningContent: E2,
    skeletonWarningIcon: x2,
    skeletonWarningText: R2,
    skeletonWarningTitle: C2,
    skeletonWarningSubtitle: A2,
    skeletonWeatherWidget: M2,
    skeletonWidgetIcon: O2,
    skeletonWidgetContent: k2,
    skeletonWidgetSubtitle: D2,
    skeletonWidgetData: N2,
    skeletonMap: L2,
    skeletonMapContent: j2,
    skeletonMapPlaceholder: B2,
    skeletonCategoryButtons: z2,
    skeletonCategoryButton: U2,
    skeletonHarvestButton: I2,
    skeletonHarvestIcon: H2,
    skeletonHarvestText: P2,
    skeletonActionButtons: q2,
    skeletonActionButton: $2,
  },
  yt = ({ className: n, children: s, style: i }) =>
    S.jsx('div', {
      className: `${je.skeletonBase} ${n || ''}`,
      style: i,
      children: s,
    }),
  Ba = () =>
    S.jsx('div', {
      className: je.skeletonWarningBanner,
      children: S.jsxs('div', {
        className: je.skeletonWarningContent,
        children: [
          S.jsx(yt, { className: je.skeletonWarningIcon }),
          S.jsxs('div', {
            className: je.skeletonWarningText,
            children: [
              S.jsx(yt, { className: je.skeletonWarningTitle }),
              S.jsx(yt, { className: je.skeletonWarningSubtitle }),
            ],
          }),
        ],
      }),
    }),
  Zo = () =>
    S.jsxs('div', {
      className: je.skeletonWeatherWidget,
      children: [
        S.jsx(yt, { className: je.skeletonWidgetIcon }),
        S.jsxs('div', {
          className: je.skeletonWidgetContent,
          children: [
            S.jsx(yt, { className: je.skeletonWidgetSubtitle }),
            S.jsx(yt, { className: je.skeletonWidgetData }),
          ],
        }),
      ],
    }),
  G2 = () =>
    S.jsx('div', {
      className: je.skeletonMap,
      children: S.jsxs('div', {
        className: je.skeletonMapContent,
        children: [
          S.jsx(yt, { className: je.skeletonMapPlaceholder }),
          S.jsxs('div', {
            className: je.skeletonCategoryButtons,
            children: [
              S.jsx(yt, { className: je.skeletonCategoryButton }),
              S.jsx(yt, { className: je.skeletonCategoryButton }),
              S.jsx(yt, { className: je.skeletonCategoryButton }),
            ],
          }),
        ],
      }),
    }),
  V2 = () =>
    S.jsxs('div', {
      className: je.skeletonHarvestButton,
      children: [
        S.jsx(yt, { className: je.skeletonHarvestIcon }),
        S.jsx(yt, { className: je.skeletonHarvestText }),
      ],
    }),
  Q2 = () =>
    S.jsxs('div', {
      className: je.skeletonActionButtons,
      children: [
        S.jsx(yt, { className: je.skeletonActionButton }),
        S.jsx(yt, { className: je.skeletonActionButton }),
      ],
    }),
  K2 = '_loadingOverlay_lkl1n_3',
  F2 = '_spinnerContainer_lkl1n_29',
  Y2 = '_spinner_lkl1n_29',
  X2 = '_loadingText_lkl1n_57',
  Bo = {
    loadingOverlay: K2,
    spinnerContainer: F2,
    spinner: Y2,
    loadingText: X2,
  },
  W2 = ({ message: n = '로딩 중...', size: s = 'medium', overlay: i = !0 }) => {
    const o = { small: '24px', medium: '48px', large: '64px' },
      c = S.jsxs('div', {
        className: Bo.spinnerContainer,
        children: [
          S.jsx('div', {
            className: Bo.spinner,
            style: { width: o[s], height: o[s] },
          }),
          n &&
            S.jsx(te, {
              size: 'lg',
              weight: 'medium',
              color: 'dark',
              className: Bo.loadingText,
              children: n,
            }),
        ],
      });
    return i ? S.jsx('div', { className: Bo.loadingOverlay, children: c }) : c;
  },
  Z2 = async (n = 0, s = 20) =>
    await Mt.get(`/v1/weather/warnings?page=${n}&size=${s}`),
  J2 = async (n, s = 0, i = 20) =>
    await Mt.get(`/v1/weather/warnings/region/${n}?page=${s}&size=${i}`),
  ex = (n = 0, s = 20) =>
    mr({
      queryKey: ['weather-warnings', n, s],
      queryFn: () => Z2(n, s),
      staleTime: 300 * 1e3,
      gcTime: 600 * 1e3,
    }),
  Jf = (n, s = 0, i = 20) =>
    mr({
      queryKey: ['weather-warnings-region', n, s, i],
      queryFn: () => J2(n, s, i),
      staleTime: 300 * 1e3,
      gcTime: 600 * 1e3,
      enabled: !0,
    }),
  na = (n) => String(n).padStart(2, '0'),
  tx = (n) => {
    if (Array.isArray(n)) {
      const [, i, o, c, f] = n;
      return `${na(i)}월 ${na(o)}일 ${na(c)}시 ${na(f)}분`;
    }
    const s = new Date(n);
    return Number.isNaN(s.getTime())
      ? ''
      : `${na(s.getMonth() + 1)}월 ${na(s.getDate())}일 ${na(
          s.getHours()
        )}시 ${na(s.getMinutes())}분`;
  },
  nx = {
    L1090000: '제주도',
    L1090900: '제주도남부',
    L1090500: '제주도산지',
    L1090600: '제주도서부',
    L1090700: '제주도북부',
    L1090800: '제주도동부',
    L1091100: '제주도북부중산간',
    L1091200: '제주도남부중산간',
    L1091000: '추자도',
    S1323000: '제주도앞바다',
    S1323100: '제주도북부앞바다',
    S1323200: '제주도동부앞바다',
    S1323300: '제주도남부앞바다',
    S1323400: '제주도서부앞바다',
    S1324020: '제주도남쪽바깥먼바다',
    S1324110: '제주도남동쪽안쪽먼바다',
    S1324210: '제주도남서쪽안쪽먼바다',
    S1330000: '제주도전해상',
    S2320400: '제주도북부앞바다중 연안바다',
    S2320610: '제주도서부앞바다중 북서연안바다',
    S2320620: '제주도서부앞바다중 남서연안바다',
    S2320700: '제주도남부앞바다중 연안바다',
    S2320900: '제주도동부앞바다중 북동연안바다',
    S2321000: '제주도동부앞바다중 남동연안바다',
    S2330100: '남해서부서쪽먼바다중 추자도연안바다',
    S2330200: '제주도동부앞바다중 우도연안바다',
    S2330300: '제주도서부앞바다중 가파도연안바다',
  },
  ax = (n) => (n ? nx[n] ?? n : ''),
  ed = (n) =>
    (n.data?.content ?? []).map((s) => ({
      id: s.id,
      type: `${s.warningType}${s.warningLevel}`,
      date: tx(s.announcedAt),
      location: ax(s.regionCode),
    })),
  sx = '_container_111kf_1',
  ix = '_fixedContent_111kf_21',
  rx = '_header_111kf_39',
  ox = '_backButton_111kf_55',
  lx = '_backButtonIcon_111kf_79',
  cx = '_title_111kf_89',
  ux = '_filterTabs_111kf_101',
  fx = '_filterTab_111kf_101',
  dx = '_active_111kf_149',
  hx = '_scrollContent_111kf_159',
  gx = '_alertList_111kf_181',
  mx = '_alertItem_111kf_207',
  pt = {
    container: sx,
    fixedContent: ix,
    header: rx,
    backButton: ox,
    backButtonIcon: lx,
    title: cx,
    filterTabs: ux,
    filterTab: fx,
    active: dx,
    scrollContent: hx,
    alertList: gx,
    alertItem: mx,
  },
  px = () => {
    const [n, s] = z.useState([]),
      [i, o] = z.useState('aewol'),
      [c, f] = z.useState(null),
      h = St();
    z.useEffect(() => {
      const M = localStorage.getItem('selectedLocation');
      if (M)
        try {
          const O = JSON.parse(M);
          f(O);
          const L = [
            { id: 'all', name: '전체', active: !1 },
            { id: 'gueom', name: '구업', active: O.id === 'gueom' },
            { id: 'gonae', name: '고내', active: O.id === 'gonae' },
            { id: 'aewol', name: '애월', active: O.id === 'aewol' },
            { id: 'suwon', name: '수원', active: O.id === 'suwon' },
          ];
          s(L), o(O.id);
        } catch (O) {
          console.error('저장된 지역 정보를 파싱할 수 없습니다:', O),
            f({ id: 'aewol', name: '애월', displayName: '애월3리 어촌계' }),
            s([
              { id: 'all', name: '전체', active: !1 },
              { id: 'gueom', name: '구업', active: !1 },
              { id: 'gonae', name: '고내', active: !1 },
              { id: 'aewol', name: '애월', active: !0 },
              { id: 'suwon', name: '수원', active: !1 },
            ]),
            o('aewol');
        }
      else
        f({ id: 'aewol', name: '애월', displayName: '애월3리 어촌계' }),
          s([
            { id: 'all', name: '전체', active: !1 },
            { id: 'gueom', name: '구업', active: !1 },
            { id: 'gonae', name: '고내', active: !1 },
            { id: 'aewol', name: '애월', active: !0 },
            { id: 'suwon', name: '수원', active: !1 },
          ]),
          o('aewol');
    }, []);
    const m = ex(0, 20),
      g = Jf('L1090700', 0, 20),
      v = i === 'all' ? m : g,
      p = (M) => {
        s((O) => O.map((L) => ({ ...L, active: L.id === M }))), o(M);
      },
      b = () => {
        h({ to: '/main' });
      },
      T = v.data ? ed(v.data) : [],
      w = v.isPending,
      E = v.error;
    return S.jsxs('div', {
      className: pt.container,
      children: [
        S.jsxs('div', {
          className: pt.fixedContent,
          children: [
            S.jsxs('div', {
              className: pt.header,
              children: [
                S.jsx('button', {
                  className: pt.backButton,
                  onClick: b,
                  children: S.jsx('img', {
                    src: '/backButton.svg',
                    alt: '뒤로가기',
                    className: pt.backButtonIcon,
                  }),
                }),
                S.jsx(te, {
                  size: 'xl',
                  color: 'dark',
                  weight: 'bold',
                  className: pt.title,
                  children: c?.displayName || '애월3리 어촌계',
                }),
              ],
            }),
            S.jsx('div', {
              className: pt.filterTabs,
              children: n.map((M) =>
                S.jsx(
                  'button',
                  {
                    className: `${pt.filterTab} ${M.active ? pt.active : ''}`,
                    onClick: () => p(M.id),
                    children: S.jsx(te, {
                      size: 'md',
                      color: M.active ? 'dark' : 'gray',
                      weight: M.active ? 'bold' : 'regular',
                      children: M.name,
                    }),
                  },
                  M.id
                )
              ),
            }),
          ],
        }),
        S.jsx('div', {
          className: pt.scrollContent,
          children: S.jsx('div', {
            className: pt.alertList,
            children: w
              ? S.jsxs(S.Fragment, {
                  children: [
                    S.jsx(Ba, {}),
                    S.jsx(Ba, {}),
                    S.jsx(Ba, {}),
                    S.jsx(Ba, {}),
                    S.jsx(Ba, {}),
                  ],
                })
              : E
              ? S.jsx(An, {
                  type: '오류',
                  date:
                    E instanceof Error
                      ? E.message
                      : '요청 중 오류가 발생했습니다.',
                  location: '',
                  variant: 'info',
                  className: pt.alertItem,
                  suffix: '발표',
                })
              : T.length === 0
              ? S.jsx(An, {
                  type: '정보',
                  date: '현재 발효중인 특보가 없습니다',
                  location: '',
                  variant: 'info',
                  className: pt.alertItem,
                  suffix: '',
                })
              : T.map((M, O) =>
                  S.jsx(
                    An,
                    {
                      type: M.type,
                      date: M.date,
                      location: M.location,
                      variant: O === 0 ? 'latest' : 'past',
                      className: pt.alertItem,
                      suffix: '발표',
                    },
                    M.id
                  )
                ),
          }),
        }),
      ],
    });
  },
  yx = async (n) =>
    await Mt.post('/v1/storage/signed-urls', { type: 'ai', imageExtension: n }),
  vx = async ({ signedUrl: n, file: s }) => await Mt.uploadFile(n, s),
  Sx = async (n) => await Mt.post('/v1/seafood-detect', { imageUrl: n }),
  bx = () => {
    const n = rr({
        mutationFn: yx,
        onSuccess: (c) => {
          console.log('Signed URL 응답:', c.data);
        },
        onError: (c) => {
          console.error('Signed URL 요청 중 오류:', c);
        },
      }),
      s = rr({
        mutationFn: vx,
        onSuccess: () => {
          console.log('파일 업로드 성공!');
        },
        onError: (c) => {
          console.error('파일 업로드 중 오류:', c);
        },
      }),
      i = rr({
        mutationFn: Sx,
        onSuccess: (c) => {
          console.log('AI 분석 결과:', c.data);
        },
        onError: (c) => {
          console.error('AI 분석 중 오류:', c);
        },
      });
    return {
      analyzePhoto: async (c) => {
        try {
          const f = c.name.split('.').pop()?.toLowerCase() || 'jpeg';
          console.log('파일 확장자:', f);
          const h = await n.mutateAsync(f),
            { signedUrl: m, imageUrl: g } = h.data;
          await s.mutateAsync({ signedUrl: m, file: c }),
            console.log('최종 이미지 URL:', g);
          const d = await i.mutateAsync(g);
          return { imageUrl: g, analysisResult: d.data };
        } catch (f) {
          throw (console.error('전체 분석 프로세스 중 오류:', f), f);
        }
      },
      signedUrlMutation: n,
      uploadFileMutation: s,
      seafoodDetectionMutation: i,
      isLoading: n.isPending || s.isPending || i.isPending,
      error: n.error || s.error || i.error,
    };
  },
  _x = '_container_190qp_1',
  wx = '_header_190qp_19',
  Tx = '_backButton_190qp_37',
  Ex = '_backButtonIcon_190qp_61',
  xx = '_titleSection_190qp_71',
  Rx = '_subtitleSection_190qp_85',
  Cx = '_imageSection_190qp_99',
  Ax = '_imageContainer_190qp_117',
  Mx = '_placeholder_190qp_129',
  Ox = '_previewImage_190qp_151',
  kx = '_restrictionOverlay_190qp_173',
  Dx = '_warningText_190qp_199',
  Nx = '_buttonSection_190qp_227',
  Lx = '_subContentSection_190qp_239',
  ct = {
    container: _x,
    header: wx,
    backButton: Tx,
    backButtonIcon: Ex,
    titleSection: xx,
    subtitleSection: Rx,
    imageSection: Cx,
    imageContainer: Ax,
    placeholder: Mx,
    previewImage: Ox,
    restrictionOverlay: kx,
    warningText: Dx,
    buttonSection: Nx,
    subContentSection: Lx,
  },
  jx = (n) => {
    if (!n) return '';
    const s = n.split(' ');
    return s.length === 2 && /^Bearer$/i.test(s[0]) ? s[1] : n;
  },
  Bx = () =>
    sessionStorage.getItem('accessToken') ||
    localStorage.getItem('accessToken') ||
    '',
  ny = () =>
    sessionStorage.getItem('refreshToken') ||
    localStorage.getItem('refreshToken') ||
    '',
  Zs = () => {
    const n = St(),
      s = Lf(),
      i = z.useMemo(() => {
        const h = Bx(),
          m =
            sessionStorage.getItem('userInfo') ||
            localStorage.getItem('userInfo');
        return { isAuth: !!(h && m), token: h, userInfo: m };
      }, []),
      o = rr({
        mutationFn: async () => {
          const h = ny();
          if (!h) throw new Error('Refresh token not found');
          const m = await fetch(
              'https://haeruhand.o-r.kr/api/v1/user/reissue',
              {
                method: 'POST',
                headers: { 'X-Refresh-Token': h, Accept: 'application/json' },
              }
            ),
            g =
              m.headers.get('Authorization') || m.headers.get('authorization'),
            d =
              m.headers.get('X-Refresh-Token') ||
              m.headers.get('x-refresh-token'),
            v =
              m.headers.get('X-Access-Token-Expires-In') ||
              m.headers.get('x-access-token-expires-in'),
            p = await m.text();
          let b;
          try {
            b = p ? JSON.parse(p) : void 0;
          } catch {}
          if (!m.ok) {
            const M = b?.message || p || m.statusText;
            throw new Error(`Token reissue failed: ${M}`);
          }
          const T = jx(g),
            w = d || ny(),
            E = v ? Number(v) : b?.data?.accessTokenExpiresIn ?? void 0;
          if (
            (T && T.length > 20 && sessionStorage.setItem('accessToken', T),
            w && sessionStorage.setItem('refreshToken', w),
            typeof E == 'number' && !Number.isNaN(E))
          ) {
            const M = Date.now() + E * 1e3;
            sessionStorage.setItem('accessTokenExpiresAt', String(M));
          }
          return !0;
        },
      }),
      c = z.useCallback(() => {
        sessionStorage.clear(),
          localStorage.removeItem('accessToken'),
          localStorage.removeItem('refreshToken'),
          localStorage.removeItem('accessTokenExpiresAt'),
          s.clear(),
          n({ to: '/login' });
      }, [n, s]),
      f = z.useCallback(() => i.isAuth, [i.isAuth]);
    return (
      z.useEffect(() => {
        const h = async () => {
          const g =
            sessionStorage.getItem('accessTokenExpiresAt') ||
            localStorage.getItem('accessTokenExpiresAt');
          if (!g) return;
          const d = Number(g);
          if (Number.isNaN(d)) return;
          if (Date.now() >= d - 6e4)
            try {
              await o.mutateAsync();
            } catch (p) {
              console.error('Token reissue failed:', p), c();
            }
        };
        h();
        const m = setInterval(h, 300 * 1e3);
        return () => clearInterval(m);
      }, [o, c]),
      { isAuthenticated: f, logout: c, reissueToken: o.mutateAsync }
    );
  },
  zx = '_overlay_1nks4_3',
  Ux = '_modalWindow_1nks4_25',
  Ix = '_closeButton_1nks4_61',
  Hx = '_closeButtonIcon_1nks4_87',
  Px = '_buttons_1nks4_97',
  Us = {
    overlay: zx,
    modalWindow: Ux,
    closeButton: Ix,
    closeButtonIcon: Hx,
    buttons: Px,
  },
  qx = (n) => {
    if (!n) return '';
    const s = n.split(' ');
    return s.length === 2 && /^Bearer$/i.test(s[0]) ? s[1] : n;
  },
  $x = async (n) => {
    const i = await fetch('https://haeruhand.o-r.kr/api/v1/user/issue/kakao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: n }),
      }),
      o = i.headers.get('Authorization') || i.headers.get('authorization'),
      c = i.headers.get('X-Refresh-Token') || i.headers.get('x-refresh-token'),
      f =
        i.headers.get('X-Access-Token-Expires-In') ||
        i.headers.get('x-access-token-expires-in');
    if (!i.ok) {
      const v = await i.text().catch(() => '');
      throw new Error(`HTTP ${i.status} ${i.statusText} ${v}`);
    }
    const h = await i.json(),
      m = qx(o),
      g = c || '',
      d = f
        ? Number(f)
        : h.data?.accessTokenExpiresIn
        ? Number(h.data.accessTokenExpiresIn)
        : void 0;
    return { body: h, accessToken: m, refreshToken: g, expiresInSec: d };
  },
  Uv = () => {
    const n = St(),
      s = rr({
        mutationFn: $x,
        onSuccess: ({
          body: o,
          accessToken: c,
          refreshToken: f,
          expiresInSec: h,
        }) => {
          if (!o.is_success) throw new Error(o.message || '카카오 로그인 실패');
          if (
            sessionStorage.getItem('userInfo') &&
            sessionStorage.getItem('accessToken')
          ) {
            console.log('이미 로그인된 상태, 리다이렉트만 수행'),
              n({ to: '/map' });
            return;
          }
          if (
            (sessionStorage.setItem('userInfo', JSON.stringify(o.data.user)),
            c && c.length > 20 && sessionStorage.setItem('accessToken', c),
            f && sessionStorage.setItem('refreshToken', f),
            typeof h == 'number' && !Number.isNaN(h))
          ) {
            const g = Date.now() + h * 1e3;
            sessionStorage.setItem('accessTokenExpiresAt', String(g));
          }
          const m = sessionStorage.getItem('pendingDeepLink');
          if (m)
            try {
              const g = JSON.parse(m),
                { code: d, token: v, url: p } = g;
              sessionStorage.setItem(
                'locationRoom',
                JSON.stringify({
                  roomId: null,
                  roomCode: d,
                  deepLink: p,
                  joinToken: v,
                })
              ),
                sessionStorage.setItem('isLocationRoomHost', 'false'),
                sessionStorage.removeItem('hostRoomCode'),
                sessionStorage.removeItem('pendingDeepLink'),
                setTimeout(() => {
                  n({ to: '/buddy' });
                }, 100);
            } catch (g) {
              console.error('딥링크 처리 실패:', g),
                setTimeout(() => {
                  n({ to: '/map' });
                }, 100);
            }
          else
            setTimeout(() => {
              n({ to: '/map' });
            }, 100);
        },
        onError: (o) => {
          console.error('로그인 실패:', o),
            o.message.includes('HTTP 500')
              ? alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
              : alert(
                  o instanceof Error ? o.message : '로그인에 실패했습니다.'
                );
        },
      });
    return {
      loginWithKakao: (o) => {
        s.mutate(o);
      },
      isLoading: s.isPending,
      isError: s.isError,
      error: s.error,
    };
  },
  Iv = ({ message: n }) => {
    const s = pr,
      { loginWithKakao: i, isLoading: o } = Uv(),
      { isAuthenticated: c } = Zs(),
      f = St(),
      h = z.useRef(!1);
    if (c()) return null;
    const m = () => {
      f({ to: '/main' });
    };
    z.useEffect(() => {
      s.code && !h.current && ((h.current = !0), i(s.code));
    }, [s.code, i]);
    const g = () => {
      if (o) return;
      const d =
        'https://kauth.kakao.com/oauth/authorize?client_id=434231d018b4c369436c39181c2be5e3&redirect_uri=https://haeruhand.o-r.kr/login&response_type=code';
      window.location.href = d;
    };
    return Jy.createPortal(
      S.jsxs('div', {
        children: [
          S.jsx('div', { className: Us.overlay, onClick: m }),
          S.jsxs('div', {
            className: Us.modalWindow,
            children: [
              S.jsx('button', {
                className: Us.closeButton,
                children: S.jsx('img', {
                  src: '/closeButtonGray.svg',
                  alt: '메인페이지 이동',
                  className: Us.closeButtonIcon,
                  onClick: m,
                }),
              }),
              S.jsxs('div', {
                className: Us.content,
                children: [
                  S.jsxs(te, {
                    style: {
                      marginTop: $.spacing.md,
                      padding: `${$.spacing.lg} 0 ${$.spacing.xs}`,
                    },
                    align: 'center',
                    size: 'xxl',
                    children: [n, '하려면'],
                  }),
                  S.jsx(te, {
                    style: {
                      marginBottom: $.spacing.md,
                      padding: `0 0 ${$.spacing.lg}`,
                    },
                    align: 'center',
                    size: 'xxl',
                    children: '로그인이 필요해요!',
                  }),
                  S.jsxs('div', {
                    className: Us.buttons,
                    children: [
                      S.jsx(fa, {
                        variant: 'kakao',
                        onClick: g,
                        disabled: o,
                        children: o ? '로그인 중...' : '카카오로 시작하기',
                      }),
                      S.jsx(fa, {
                        variant: 'secondary',
                        onClick: m,
                        children: '메인페이지로 돌아가기',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      document.body
    );
  },
  Gx = () => {
    const [n, s] = z.useState(null),
      [i, o] = z.useState(''),
      [c, f] = z.useState(''),
      [h, m] = z.useState(''),
      [g, d] = z.useState(''),
      [v, p] = z.useState(!1),
      [b, T] = z.useState(!1),
      w = z.useRef(null),
      E = St(),
      { isAuthenticated: M } = Zs(),
      { analyzePhoto: O, isLoading: L, error: U } = bx(),
      G = () => {
        E({ to: '/main' });
      },
      I = () => {
        w.current?.click();
      },
      Z = async (Y) => {
        const K = Y.target.files?.[0];
        if (K)
          try {
            p(!1), o(''), f(''), m(''), d('');
            const X = new FileReader();
            (X.onload = (ne) => {
              s(ne.target?.result);
            }),
              X.readAsDataURL(K);
            const F = await O(K);
            if (
              (console.log('분석 완료:', F),
              o(F.analysisResult.fishName),
              F.analysisResult.regulationFish)
            ) {
              f(F.analysisResult.regulationFish.restrictionStartDate),
                m(F.analysisResult.regulationFish.restrictionEndDate);
              const ne =
                F.analysisResult.regulationFish.minimumLengthCentimeter;
              ne == null ? d('없음') : d(`${ne}cm`);
            } else f('금어기 정보 없음'), m(''), d('정보 없음');
            T(F.analysisResult.currentlyRestricted), p(!0);
          } catch (X) {
            console.error('파일 분석 중 오류 발생:', X);
          }
      };
    return S.jsxs('div', {
      className: ct.container,
      children: [
        !M() && S.jsx(Iv, { message: '수확물을 AI로 확인' }),
        L && S.jsx(W2, { message: 'AI가 분석 중입니다...', size: 'large' }),
        S.jsx('div', {
          className: ct.header,
          children: S.jsx('button', {
            className: ct.backButton,
            onClick: G,
            children: S.jsx('img', {
              src: '/backButton.svg',
              alt: '뒤로가기',
              className: ct.backButtonIcon,
            }),
          }),
        }),
        S.jsxs('div', {
          className: ct.titleSection,
          children: [
            S.jsx(te, {
              size: 'xl',
              weight: 'bold',
              color: 'dark',
              children: '저희에게 사진을 보여주세요',
            }),
            S.jsxs('div', {
              className: ct.subtitleSection,
              children: [
                S.jsx(te, {
                  size: 'md',
                  weight: 'regular',
                  color: 'dark',
                  children: '뭘 잡으셨는지, 잡아도 되는지',
                }),
                S.jsx(te, {
                  size: 'md',
                  weight: 'regular',
                  color: 'dark',
                  children: '잡아도 되는 크기인지 모두 알려드릴게요',
                }),
              ],
            }),
          ],
        }),
        S.jsx('div', {
          className: ct.imageSection,
          children: S.jsx('div', {
            className: ct.imageContainer,
            children: n
              ? S.jsxs(S.Fragment, {
                  children: [
                    S.jsx('img', {
                      src: n,
                      alt: '선택된 이미지',
                      className: ct.previewImage,
                    }),
                    v &&
                      b &&
                      S.jsx('div', {
                        className: ct.restrictionOverlay,
                        children: S.jsx(te, {
                          size: 'xxl',
                          weight: 'bold',
                          className: ct.warningText,
                          children: '채집 금지기간',
                        }),
                      }),
                  ],
                })
              : S.jsx('div', {
                  className: ct.placeholder,
                  children: S.jsx(te, {
                    size: 'lg',
                    weight: 'regular',
                    color: 'gray',
                    children: '사진을 업로드해주세요',
                  }),
                }),
          }),
        }),
        U &&
          S.jsxs('div', {
            style: { color: 'red', margin: '10px 0' },
            children: ['오류가 발생했습니다: ', U.message],
          }),
        S.jsx('input', {
          ref: w,
          type: 'file',
          accept: 'image/*',
          onChange: Z,
          style: { display: 'none' },
        }),
        v &&
          S.jsxs('div', {
            className: ct.subContentSection,
            children: [
              S.jsxs(te, {
                size: 'lg',
                weight: 'semiBold',
                color: 'dark',
                children: ['이름: ', i],
              }),
              S.jsxs(te, {
                size: 'md',
                weight: b ? 'bold' : 'regular',
                color: 'dark',
                className: b ? ct.warningText : void 0,
                children: ['금어기: ', c, ' ', h && `~ ${h}`],
              }),
              S.jsxs(te, {
                size: 'md',
                weight: 'regular',
                color: 'dark',
                children: ['금지체장: ', g],
              }),
            ],
          }),
        S.jsx('div', {
          className: ct.buttonSection,
          children: S.jsx(fa, {
            size: 'large',
            variant: 'primary',
            fullWidth: !0,
            onClick: I,
            disabled: L,
            children: L ? '분석 중...' : '업로드하기',
          }),
        }),
      ],
    });
  },
  Vx = '_container_uklrk_1',
  Qx = '_header_uklrk_21',
  Kx = '_backButton_uklrk_39',
  Fx = '_backButtonIcon_uklrk_63',
  Yx = '_titleSection_uklrk_73',
  Xx = '_subtitleSection_uklrk_87',
  Wx = '_content_uklrk_101',
  Zx = '_qrSection_uklrk_125',
  Jx = '_buttonSection_uklrk_155',
  eR = '_qrInfo_uklrk_167',
  nn = {
    container: Vx,
    header: Qx,
    backButton: Kx,
    backButtonIcon: Fx,
    titleSection: Yx,
    subtitleSection: Xx,
    content: Wx,
    qrSection: Zx,
    buttonSection: Jx,
    qrInfo: eR,
  };
var Is = {},
  Xu = { exports: {} },
  Wu,
  ay;
function tR() {
  if (ay) return Wu;
  ay = 1;
  var n = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Wu = n), Wu;
}
var Zu, sy;
function nR() {
  if (sy) return Zu;
  sy = 1;
  var n = tR();
  function s() {}
  function i() {}
  return (
    (i.resetWarningCache = s),
    (Zu = function () {
      function o(h, m, g, d, v, p) {
        if (p !== n) {
          var b = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
          );
          throw ((b.name = 'Invariant Violation'), b);
        }
      }
      o.isRequired = o;
      function c() {
        return o;
      }
      var f = {
        array: o,
        bigint: o,
        bool: o,
        func: o,
        number: o,
        object: o,
        string: o,
        symbol: o,
        any: o,
        arrayOf: c,
        element: o,
        elementType: o,
        instanceOf: c,
        node: o,
        objectOf: c,
        oneOf: c,
        oneOfType: c,
        shape: c,
        exact: c,
        checkPropTypes: i,
        resetWarningCache: s,
      };
      return (f.PropTypes = f), f;
    }),
    Zu
  );
}
var iy;
function Hv() {
  return iy || ((iy = 1), (Xu.exports = nR()())), Xu.exports;
}
var Ju, ry;
function Pv() {
  return ry || ((ry = 1), (Ju = { L: 1, M: 0, Q: 3, H: 2 })), Ju;
}
var ef, oy;
function qv() {
  return (
    oy ||
      ((oy = 1),
      (ef = {
        MODE_NUMBER: 1,
        MODE_ALPHA_NUM: 2,
        MODE_8BIT_BYTE: 4,
        MODE_KANJI: 8,
      })),
    ef
  );
}
var tf, ly;
function aR() {
  if (ly) return tf;
  ly = 1;
  var n = qv();
  function s(i) {
    (this.mode = n.MODE_8BIT_BYTE), (this.data = i);
  }
  return (
    (s.prototype = {
      getLength: function (i) {
        return this.data.length;
      },
      write: function (i) {
        for (var o = 0; o < this.data.length; o++)
          i.put(this.data.charCodeAt(o), 8);
      },
    }),
    (tf = s),
    tf
  );
}
var nf, cy;
function sR() {
  if (cy) return nf;
  cy = 1;
  var n = Pv();
  function s(i, o) {
    (this.totalCount = i), (this.dataCount = o);
  }
  return (
    (s.RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16],
    ]),
    (s.getRSBlocks = function (i, o) {
      var c = s.getRsBlockTable(i, o);
      if (c == null)
        throw new Error(
          'bad rs block @ typeNumber:' + i + '/errorCorrectLevel:' + o
        );
      for (var f = c.length / 3, h = new Array(), m = 0; m < f; m++)
        for (
          var g = c[m * 3 + 0], d = c[m * 3 + 1], v = c[m * 3 + 2], p = 0;
          p < g;
          p++
        )
          h.push(new s(d, v));
      return h;
    }),
    (s.getRsBlockTable = function (i, o) {
      switch (o) {
        case n.L:
          return s.RS_BLOCK_TABLE[(i - 1) * 4 + 0];
        case n.M:
          return s.RS_BLOCK_TABLE[(i - 1) * 4 + 1];
        case n.Q:
          return s.RS_BLOCK_TABLE[(i - 1) * 4 + 2];
        case n.H:
          return s.RS_BLOCK_TABLE[(i - 1) * 4 + 3];
        default:
          return;
      }
    }),
    (nf = s),
    nf
  );
}
var af, uy;
function iR() {
  if (uy) return af;
  uy = 1;
  function n() {
    (this.buffer = new Array()), (this.length = 0);
  }
  return (
    (n.prototype = {
      get: function (s) {
        var i = Math.floor(s / 8);
        return ((this.buffer[i] >>> (7 - (s % 8))) & 1) == 1;
      },
      put: function (s, i) {
        for (var o = 0; o < i; o++) this.putBit(((s >>> (i - o - 1)) & 1) == 1);
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (s) {
        var i = Math.floor(this.length / 8);
        this.buffer.length <= i && this.buffer.push(0),
          s && (this.buffer[i] |= 128 >>> this.length % 8),
          this.length++;
      },
    }),
    (af = n),
    af
  );
}
var sf, fy;
function $v() {
  if (fy) return sf;
  fy = 1;
  for (
    var n = {
        glog: function (i) {
          if (i < 1) throw new Error('glog(' + i + ')');
          return n.LOG_TABLE[i];
        },
        gexp: function (i) {
          for (; i < 0; ) i += 255;
          for (; i >= 256; ) i -= 255;
          return n.EXP_TABLE[i];
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256),
      },
      s = 0;
    s < 8;
    s++
  )
    n.EXP_TABLE[s] = 1 << s;
  for (var s = 8; s < 256; s++)
    n.EXP_TABLE[s] =
      n.EXP_TABLE[s - 4] ^
      n.EXP_TABLE[s - 5] ^
      n.EXP_TABLE[s - 6] ^
      n.EXP_TABLE[s - 8];
  for (var s = 0; s < 255; s++) n.LOG_TABLE[n.EXP_TABLE[s]] = s;
  return (sf = n), sf;
}
var rf, dy;
function Gv() {
  if (dy) return rf;
  dy = 1;
  var n = $v();
  function s(i, o) {
    if (i.length == null) throw new Error(i.length + '/' + o);
    for (var c = 0; c < i.length && i[c] == 0; ) c++;
    this.num = new Array(i.length - c + o);
    for (var f = 0; f < i.length - c; f++) this.num[f] = i[f + c];
  }
  return (
    (s.prototype = {
      get: function (i) {
        return this.num[i];
      },
      getLength: function () {
        return this.num.length;
      },
      multiply: function (i) {
        for (
          var o = new Array(this.getLength() + i.getLength() - 1), c = 0;
          c < this.getLength();
          c++
        )
          for (var f = 0; f < i.getLength(); f++)
            o[c + f] ^= n.gexp(n.glog(this.get(c)) + n.glog(i.get(f)));
        return new s(o, 0);
      },
      mod: function (i) {
        if (this.getLength() - i.getLength() < 0) return this;
        for (
          var o = n.glog(this.get(0)) - n.glog(i.get(0)),
            c = new Array(this.getLength()),
            f = 0;
          f < this.getLength();
          f++
        )
          c[f] = this.get(f);
        for (var f = 0; f < i.getLength(); f++)
          c[f] ^= n.gexp(n.glog(i.get(f)) + o);
        return new s(c, 0).mod(i);
      },
    }),
    (rf = s),
    rf
  );
}
var of, hy;
function rR() {
  if (hy) return of;
  hy = 1;
  var n = qv(),
    s = Gv(),
    i = $v(),
    o = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7,
    },
    c = {
      PATTERN_POSITION_TABLE: [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170],
      ],
      G15: 1335,
      G18: 7973,
      G15_MASK: 21522,
      getBCHTypeInfo: function (f) {
        for (var h = f << 10; c.getBCHDigit(h) - c.getBCHDigit(c.G15) >= 0; )
          h ^= c.G15 << (c.getBCHDigit(h) - c.getBCHDigit(c.G15));
        return ((f << 10) | h) ^ c.G15_MASK;
      },
      getBCHTypeNumber: function (f) {
        for (var h = f << 12; c.getBCHDigit(h) - c.getBCHDigit(c.G18) >= 0; )
          h ^= c.G18 << (c.getBCHDigit(h) - c.getBCHDigit(c.G18));
        return (f << 12) | h;
      },
      getBCHDigit: function (f) {
        for (var h = 0; f != 0; ) h++, (f >>>= 1);
        return h;
      },
      getPatternPosition: function (f) {
        return c.PATTERN_POSITION_TABLE[f - 1];
      },
      getMask: function (f, h, m) {
        switch (f) {
          case o.PATTERN000:
            return (h + m) % 2 == 0;
          case o.PATTERN001:
            return h % 2 == 0;
          case o.PATTERN010:
            return m % 3 == 0;
          case o.PATTERN011:
            return (h + m) % 3 == 0;
          case o.PATTERN100:
            return (Math.floor(h / 2) + Math.floor(m / 3)) % 2 == 0;
          case o.PATTERN101:
            return ((h * m) % 2) + ((h * m) % 3) == 0;
          case o.PATTERN110:
            return (((h * m) % 2) + ((h * m) % 3)) % 2 == 0;
          case o.PATTERN111:
            return (((h * m) % 3) + ((h + m) % 2)) % 2 == 0;
          default:
            throw new Error('bad maskPattern:' + f);
        }
      },
      getErrorCorrectPolynomial: function (f) {
        for (var h = new s([1], 0), m = 0; m < f; m++)
          h = h.multiply(new s([1, i.gexp(m)], 0));
        return h;
      },
      getLengthInBits: function (f, h) {
        if (1 <= h && h < 10)
          switch (f) {
            case n.MODE_NUMBER:
              return 10;
            case n.MODE_ALPHA_NUM:
              return 9;
            case n.MODE_8BIT_BYTE:
              return 8;
            case n.MODE_KANJI:
              return 8;
            default:
              throw new Error('mode:' + f);
          }
        else if (h < 27)
          switch (f) {
            case n.MODE_NUMBER:
              return 12;
            case n.MODE_ALPHA_NUM:
              return 11;
            case n.MODE_8BIT_BYTE:
              return 16;
            case n.MODE_KANJI:
              return 10;
            default:
              throw new Error('mode:' + f);
          }
        else if (h < 41)
          switch (f) {
            case n.MODE_NUMBER:
              return 14;
            case n.MODE_ALPHA_NUM:
              return 13;
            case n.MODE_8BIT_BYTE:
              return 16;
            case n.MODE_KANJI:
              return 12;
            default:
              throw new Error('mode:' + f);
          }
        else throw new Error('type:' + h);
      },
      getLostPoint: function (f) {
        for (var h = f.getModuleCount(), m = 0, g = 0; g < h; g++)
          for (var d = 0; d < h; d++) {
            for (var v = 0, p = f.isDark(g, d), b = -1; b <= 1; b++)
              if (!(g + b < 0 || h <= g + b))
                for (var T = -1; T <= 1; T++)
                  d + T < 0 ||
                    h <= d + T ||
                    (b == 0 && T == 0) ||
                    (p == f.isDark(g + b, d + T) && v++);
            v > 5 && (m += 3 + v - 5);
          }
        for (var g = 0; g < h - 1; g++)
          for (var d = 0; d < h - 1; d++) {
            var w = 0;
            f.isDark(g, d) && w++,
              f.isDark(g + 1, d) && w++,
              f.isDark(g, d + 1) && w++,
              f.isDark(g + 1, d + 1) && w++,
              (w == 0 || w == 4) && (m += 3);
          }
        for (var g = 0; g < h; g++)
          for (var d = 0; d < h - 6; d++)
            f.isDark(g, d) &&
              !f.isDark(g, d + 1) &&
              f.isDark(g, d + 2) &&
              f.isDark(g, d + 3) &&
              f.isDark(g, d + 4) &&
              !f.isDark(g, d + 5) &&
              f.isDark(g, d + 6) &&
              (m += 40);
        for (var d = 0; d < h; d++)
          for (var g = 0; g < h - 6; g++)
            f.isDark(g, d) &&
              !f.isDark(g + 1, d) &&
              f.isDark(g + 2, d) &&
              f.isDark(g + 3, d) &&
              f.isDark(g + 4, d) &&
              !f.isDark(g + 5, d) &&
              f.isDark(g + 6, d) &&
              (m += 40);
        for (var E = 0, d = 0; d < h; d++)
          for (var g = 0; g < h; g++) f.isDark(g, d) && E++;
        var M = Math.abs((100 * E) / h / h - 50) / 5;
        return (m += M * 10), m;
      },
    };
  return (of = c), of;
}
var lf, gy;
function oR() {
  if (gy) return lf;
  gy = 1;
  var n = aR(),
    s = sR(),
    i = iR(),
    o = rR(),
    c = Gv();
  function f(m, g) {
    (this.typeNumber = m),
      (this.errorCorrectLevel = g),
      (this.modules = null),
      (this.moduleCount = 0),
      (this.dataCache = null),
      (this.dataList = []);
  }
  var h = f.prototype;
  return (
    (h.addData = function (m) {
      var g = new n(m);
      this.dataList.push(g), (this.dataCache = null);
    }),
    (h.isDark = function (m, g) {
      if (m < 0 || this.moduleCount <= m || g < 0 || this.moduleCount <= g)
        throw new Error(m + ',' + g);
      return this.modules[m][g];
    }),
    (h.getModuleCount = function () {
      return this.moduleCount;
    }),
    (h.make = function () {
      if (this.typeNumber < 1) {
        var m = 1;
        for (m = 1; m < 40; m++) {
          for (
            var g = s.getRSBlocks(m, this.errorCorrectLevel),
              d = new i(),
              v = 0,
              p = 0;
            p < g.length;
            p++
          )
            v += g[p].dataCount;
          for (var p = 0; p < this.dataList.length; p++) {
            var b = this.dataList[p];
            d.put(b.mode, 4),
              d.put(b.getLength(), o.getLengthInBits(b.mode, m)),
              b.write(d);
          }
          if (d.getLengthInBits() <= v * 8) break;
        }
        this.typeNumber = m;
      }
      this.makeImpl(!1, this.getBestMaskPattern());
    }),
    (h.makeImpl = function (m, g) {
      (this.moduleCount = this.typeNumber * 4 + 17),
        (this.modules = new Array(this.moduleCount));
      for (var d = 0; d < this.moduleCount; d++) {
        this.modules[d] = new Array(this.moduleCount);
        for (var v = 0; v < this.moduleCount; v++) this.modules[d][v] = null;
      }
      this.setupPositionProbePattern(0, 0),
        this.setupPositionProbePattern(this.moduleCount - 7, 0),
        this.setupPositionProbePattern(0, this.moduleCount - 7),
        this.setupPositionAdjustPattern(),
        this.setupTimingPattern(),
        this.setupTypeInfo(m, g),
        this.typeNumber >= 7 && this.setupTypeNumber(m),
        this.dataCache == null &&
          (this.dataCache = f.createData(
            this.typeNumber,
            this.errorCorrectLevel,
            this.dataList
          )),
        this.mapData(this.dataCache, g);
    }),
    (h.setupPositionProbePattern = function (m, g) {
      for (var d = -1; d <= 7; d++)
        if (!(m + d <= -1 || this.moduleCount <= m + d))
          for (var v = -1; v <= 7; v++)
            g + v <= -1 ||
              this.moduleCount <= g + v ||
              ((0 <= d && d <= 6 && (v == 0 || v == 6)) ||
              (0 <= v && v <= 6 && (d == 0 || d == 6)) ||
              (2 <= d && d <= 4 && 2 <= v && v <= 4)
                ? (this.modules[m + d][g + v] = !0)
                : (this.modules[m + d][g + v] = !1));
    }),
    (h.getBestMaskPattern = function () {
      for (var m = 0, g = 0, d = 0; d < 8; d++) {
        this.makeImpl(!0, d);
        var v = o.getLostPoint(this);
        (d == 0 || m > v) && ((m = v), (g = d));
      }
      return g;
    }),
    (h.createMovieClip = function (m, g, d) {
      var v = m.createEmptyMovieClip(g, d),
        p = 1;
      this.make();
      for (var b = 0; b < this.modules.length; b++)
        for (var T = b * p, w = 0; w < this.modules[b].length; w++) {
          var E = w * p,
            M = this.modules[b][w];
          M &&
            (v.beginFill(0, 100),
            v.moveTo(E, T),
            v.lineTo(E + p, T),
            v.lineTo(E + p, T + p),
            v.lineTo(E, T + p),
            v.endFill());
        }
      return v;
    }),
    (h.setupTimingPattern = function () {
      for (var m = 8; m < this.moduleCount - 8; m++)
        this.modules[m][6] == null && (this.modules[m][6] = m % 2 == 0);
      for (var g = 8; g < this.moduleCount - 8; g++)
        this.modules[6][g] == null && (this.modules[6][g] = g % 2 == 0);
    }),
    (h.setupPositionAdjustPattern = function () {
      for (
        var m = o.getPatternPosition(this.typeNumber), g = 0;
        g < m.length;
        g++
      )
        for (var d = 0; d < m.length; d++) {
          var v = m[g],
            p = m[d];
          if (this.modules[v][p] == null)
            for (var b = -2; b <= 2; b++)
              for (var T = -2; T <= 2; T++)
                b == -2 || b == 2 || T == -2 || T == 2 || (b == 0 && T == 0)
                  ? (this.modules[v + b][p + T] = !0)
                  : (this.modules[v + b][p + T] = !1);
        }
    }),
    (h.setupTypeNumber = function (m) {
      for (var g = o.getBCHTypeNumber(this.typeNumber), d = 0; d < 18; d++) {
        var v = !m && ((g >> d) & 1) == 1;
        this.modules[Math.floor(d / 3)][(d % 3) + this.moduleCount - 8 - 3] = v;
      }
      for (var d = 0; d < 18; d++) {
        var v = !m && ((g >> d) & 1) == 1;
        this.modules[(d % 3) + this.moduleCount - 8 - 3][Math.floor(d / 3)] = v;
      }
    }),
    (h.setupTypeInfo = function (m, g) {
      for (
        var d = (this.errorCorrectLevel << 3) | g,
          v = o.getBCHTypeInfo(d),
          p = 0;
        p < 15;
        p++
      ) {
        var b = !m && ((v >> p) & 1) == 1;
        p < 6
          ? (this.modules[p][8] = b)
          : p < 8
          ? (this.modules[p + 1][8] = b)
          : (this.modules[this.moduleCount - 15 + p][8] = b);
      }
      for (var p = 0; p < 15; p++) {
        var b = !m && ((v >> p) & 1) == 1;
        p < 8
          ? (this.modules[8][this.moduleCount - p - 1] = b)
          : p < 9
          ? (this.modules[8][15 - p - 1 + 1] = b)
          : (this.modules[8][15 - p - 1] = b);
      }
      this.modules[this.moduleCount - 8][8] = !m;
    }),
    (h.mapData = function (m, g) {
      for (
        var d = -1,
          v = this.moduleCount - 1,
          p = 7,
          b = 0,
          T = this.moduleCount - 1;
        T > 0;
        T -= 2
      )
        for (T == 6 && T--; ; ) {
          for (var w = 0; w < 2; w++)
            if (this.modules[v][T - w] == null) {
              var E = !1;
              b < m.length && (E = ((m[b] >>> p) & 1) == 1);
              var M = o.getMask(g, v, T - w);
              M && (E = !E),
                (this.modules[v][T - w] = E),
                p--,
                p == -1 && (b++, (p = 7));
            }
          if (((v += d), v < 0 || this.moduleCount <= v)) {
            (v -= d), (d = -d);
            break;
          }
        }
    }),
    (f.PAD0 = 236),
    (f.PAD1 = 17),
    (f.createData = function (m, g, d) {
      for (var v = s.getRSBlocks(m, g), p = new i(), b = 0; b < d.length; b++) {
        var T = d[b];
        p.put(T.mode, 4),
          p.put(T.getLength(), o.getLengthInBits(T.mode, m)),
          T.write(p);
      }
      for (var w = 0, b = 0; b < v.length; b++) w += v[b].dataCount;
      if (p.getLengthInBits() > w * 8)
        throw new Error(
          'code length overflow. (' + p.getLengthInBits() + '>' + w * 8 + ')'
        );
      for (
        p.getLengthInBits() + 4 <= w * 8 && p.put(0, 4);
        p.getLengthInBits() % 8 != 0;

      )
        p.putBit(!1);
      for (
        ;
        !(
          p.getLengthInBits() >= w * 8 ||
          (p.put(f.PAD0, 8), p.getLengthInBits() >= w * 8)
        );

      )
        p.put(f.PAD1, 8);
      return f.createBytes(p, v);
    }),
    (f.createBytes = function (m, g) {
      for (
        var d = 0,
          v = 0,
          p = 0,
          b = new Array(g.length),
          T = new Array(g.length),
          w = 0;
        w < g.length;
        w++
      ) {
        var E = g[w].dataCount,
          M = g[w].totalCount - E;
        (v = Math.max(v, E)), (p = Math.max(p, M)), (b[w] = new Array(E));
        for (var O = 0; O < b[w].length; O++) b[w][O] = 255 & m.buffer[O + d];
        d += E;
        var L = o.getErrorCorrectPolynomial(M),
          U = new c(b[w], L.getLength() - 1),
          G = U.mod(L);
        T[w] = new Array(L.getLength() - 1);
        for (var O = 0; O < T[w].length; O++) {
          var I = O + G.getLength() - T[w].length;
          T[w][O] = I >= 0 ? G.get(I) : 0;
        }
      }
      for (var Z = 0, O = 0; O < g.length; O++) Z += g[O].totalCount;
      for (var Y = new Array(Z), K = 0, O = 0; O < v; O++)
        for (var w = 0; w < g.length; w++)
          O < b[w].length && (Y[K++] = b[w][O]);
      for (var O = 0; O < p; O++)
        for (var w = 0; w < g.length; w++)
          O < T[w].length && (Y[K++] = T[w][O]);
      return Y;
    }),
    (lf = f),
    lf
  );
}
var zo = {},
  my;
function lR() {
  if (my) return zo;
  (my = 1), Object.defineProperty(zo, '__esModule', { value: !0 });
  var n =
      Object.assign ||
      function (d) {
        for (var v = 1; v < arguments.length; v++) {
          var p = arguments[v];
          for (var b in p)
            Object.prototype.hasOwnProperty.call(p, b) && (d[b] = p[b]);
        }
        return d;
      },
    s = Hv(),
    i = f(s),
    o = Ka(),
    c = f(o);
  function f(d) {
    return d && d.__esModule ? d : { default: d };
  }
  function h(d, v) {
    var p = {};
    for (var b in d)
      v.indexOf(b) >= 0 ||
        (Object.prototype.hasOwnProperty.call(d, b) && (p[b] = d[b]));
    return p;
  }
  var m = {
      bgColor: i.default.oneOfType([i.default.object, i.default.string])
        .isRequired,
      bgD: i.default.string.isRequired,
      fgColor: i.default.oneOfType([i.default.object, i.default.string])
        .isRequired,
      fgD: i.default.string.isRequired,
      size: i.default.number.isRequired,
      title: i.default.string,
      viewBoxSize: i.default.number.isRequired,
      xmlns: i.default.string,
    },
    g = (0, o.forwardRef)(function (d, v) {
      var p = d.bgColor,
        b = d.bgD,
        T = d.fgD,
        w = d.fgColor,
        E = d.size,
        M = d.title,
        O = d.viewBoxSize,
        L = d.xmlns,
        U = L === void 0 ? 'http://www.w3.org/2000/svg' : L,
        G = h(d, [
          'bgColor',
          'bgD',
          'fgD',
          'fgColor',
          'size',
          'title',
          'viewBoxSize',
          'xmlns',
        ]);
      return c.default.createElement(
        'svg',
        n({}, G, {
          height: E,
          ref: v,
          viewBox: '0 0 ' + O + ' ' + O,
          width: E,
          xmlns: U,
        }),
        M ? c.default.createElement('title', null, M) : null,
        c.default.createElement('path', { d: b, fill: p }),
        c.default.createElement('path', { d: T, fill: w })
      );
    });
  return (g.displayName = 'QRCodeSvg'), (g.propTypes = m), (zo.default = g), zo;
}
var py;
function cR() {
  if (py) return Is;
  (py = 1),
    Object.defineProperty(Is, '__esModule', { value: !0 }),
    (Is.QRCode = void 0);
  var n =
      Object.assign ||
      function (E) {
        for (var M = 1; M < arguments.length; M++) {
          var O = arguments[M];
          for (var L in O)
            Object.prototype.hasOwnProperty.call(O, L) && (E[L] = O[L]);
        }
        return E;
      },
    s = Hv(),
    i = p(s),
    o = Pv(),
    c = p(o),
    f = oR(),
    h = p(f),
    m = Ka(),
    g = p(m),
    d = lR(),
    v = p(d);
  function p(E) {
    return E && E.__esModule ? E : { default: E };
  }
  function b(E, M) {
    var O = {};
    for (var L in E)
      M.indexOf(L) >= 0 ||
        (Object.prototype.hasOwnProperty.call(E, L) && (O[L] = E[L]));
    return O;
  }
  var T = {
      bgColor: i.default.oneOfType([i.default.object, i.default.string]),
      fgColor: i.default.oneOfType([i.default.object, i.default.string]),
      level: i.default.string,
      size: i.default.number,
      value: i.default.string.isRequired,
    },
    w = (0, m.forwardRef)(function (E, M) {
      var O = E.bgColor,
        L = O === void 0 ? '#FFFFFF' : O,
        U = E.fgColor,
        G = U === void 0 ? '#000000' : U,
        I = E.level,
        Z = I === void 0 ? 'L' : I,
        Y = E.size,
        K = Y === void 0 ? 256 : Y,
        X = E.value,
        F = b(E, ['bgColor', 'fgColor', 'level', 'size', 'value']),
        ne = new h.default(-1, c.default[Z]);
      ne.addData(X), ne.make();
      var oe = ne.modules;
      return g.default.createElement(
        v.default,
        n({}, F, {
          bgColor: L,
          bgD: oe
            .map(function (me, Se) {
              return me
                .map(function (be, C) {
                  return be ? '' : 'M ' + C + ' ' + Se + ' l 1 0 0 1 -1 0 Z';
                })
                .join(' ');
            })
            .join(' '),
          fgColor: G,
          fgD: oe
            .map(function (me, Se) {
              return me
                .map(function (be, C) {
                  return be ? 'M ' + C + ' ' + Se + ' l 1 0 0 1 -1 0 Z' : '';
                })
                .join(' ');
            })
            .join(' '),
          ref: M,
          size: K,
          viewBoxSize: oe.length,
        })
      );
    });
  return (
    (Is.QRCode = w),
    (w.displayName = 'QRCode'),
    (w.propTypes = T),
    (Is.default = w),
    Is
  );
}
var uR = cR();
const fR = Ry(uR),
  yy = (n) => {
    let s;
    const i = new Set(),
      o = (d, v) => {
        const p = typeof d == 'function' ? d(s) : d;
        if (!Object.is(p, s)) {
          const b = s;
          (s =
            v ?? (typeof p != 'object' || p === null)
              ? p
              : Object.assign({}, s, p)),
            i.forEach((T) => T(s, b));
        }
      },
      c = () => s,
      m = {
        setState: o,
        getState: c,
        getInitialState: () => g,
        subscribe: (d) => (i.add(d), () => i.delete(d)),
      },
      g = (s = n(o, c, m));
    return m;
  },
  dR = (n) => (n ? yy(n) : yy),
  hR = (n) => n;
function gR(n, s = hR) {
  const i = an.useSyncExternalStore(
    n.subscribe,
    an.useCallback(() => s(n.getState()), [n, s]),
    an.useCallback(() => s(n.getInitialState()), [n, s])
  );
  return an.useDebugValue(i), i;
}
const vy = (n) => {
    const s = dR(n),
      i = (o) => gR(s, o);
    return Object.assign(i, s), i;
  },
  mR = (n) => (n ? vy(n) : vy),
  Jo = mR((n, s) => ({
    connected: !1,
    members: {},
    async connect({ wsUrl: i, accessToken: o, room: c }) {
      const f = s();
      if (f.connected && f.stomp) {
        console.log('이미 연결된 소켓이 있습니다.');
        return;
      }
      if (f.stomp && !f.connected) {
        console.log('연결 중인 소켓이 있습니다. 대기합니다.');
        return;
      }
      if (f.stomp)
        try {
          f.stomp.disconnect();
        } catch {}
      const h = window.Stomp;
      if (!h)
        throw (
          (console.error('STOMP 라이브러리가 로드되지 않았습니다.'),
          new Error('STOMP 라이브러리가 로드되지 않았습니다.'))
        );
      console.log('WebSocket 연결 시작:', i), console.log('방 정보:', c);
      const m = new WebSocket(i),
        g = h.over(m);
      (g.debug = null),
        (g.heartbeat.outgoing = 1e3),
        (g.heartbeat.incoming = 1e3),
        (g.reconnect_delay = 3e3),
        (g.onStompError = (d) => {
          console.error('STOMP ERROR frame:', d?.headers?.message, d?.body),
            n({ connected: !1 });
          try {
            g.disconnect();
          } catch {}
        }),
        (m.onclose = (d) => {
          console.warn('WS closed:', d?.code, d?.reason), n({ connected: !1 });
        }),
        await new Promise((d, v) => {
          g.connect(
            {
              Authorization: `Bearer ${o}`,
              'room-code': c.roomCode,
              'join-token': c.joinToken,
            },
            () => {
              console.log('STOMP 연결 성공'), d();
            },
            (p) => {
              console.error('STOMP 연결 실패:', p), v(p);
            }
          );
        }),
        g.subscribe(`/sub/location.${c.roomCode}`, (d) => {
          try {
            const v = JSON.parse(d.body);
            if (
              (console.log('위치 메시지 수신:', v), v?.type === 'MEMBER_JOINED')
            ) {
              const p = {
                userId: v.userId,
                nickname: v.nickname || `User ${v.userId}`,
                color: v.color,
                lastUpdateTime: new Date().toLocaleTimeString(),
              };
              s().onMemberUpdate?.(p),
                n((b) => ({
                  members: {
                    ...b.members,
                    [p.userId]: { ...(b.members[p.userId] || {}), ...p },
                  },
                }));
            } else if (v?.type === 'LOCATION') {
              console.log('LOCATION 처리:', v);
              const p = s().members[v.userId],
                b = p?.nickname || v.nickname || `User ${v.userId}`,
                T = {
                  userId: v.userId,
                  nickname: b,
                  latitude: v.latitude,
                  longitude: v.longitude,
                  accuracy: v.accuracy,
                  color: p?.color,
                  lastUpdateTime: new Date().toLocaleTimeString(),
                };
              console.log('생성된 위치 멤버 객체:', T),
                s().onMemberUpdate?.(T),
                n((w) => {
                  const E = {
                    ...w.members,
                    [T.userId]: { ...(w.members[T.userId] || {}), ...T },
                  };
                  return (
                    console.log('위치 멤버 상태 업데이트:', E), { members: E }
                  );
                });
            } else if (v?.type === 'LOCATION_UPDATE' && v.data) {
              const p = {
                userId: v.data.userId,
                nickname: v.data.nickname || `User ${v.data.userId}`,
                latitude: v.data.latitude,
                longitude: v.data.longitude,
                accuracy: v.data.accuracy,
                lastUpdateTime: new Date().toLocaleTimeString(),
              };
              s().onMemberUpdate?.(p),
                n((b) => ({
                  members: {
                    ...b.members,
                    [p.userId]: { ...(b.members[p.userId] || {}), ...p },
                  },
                }));
            }
          } catch (v) {
            console.error('위치 업데이트 메시지 파싱 오류:', v);
          }
        }),
        g.subscribe(`/user/sub/location.${c.roomCode}`, (d) => {
          try {
            const v = JSON.parse(d.body);
            if (v?.type === 'MEMBER_LIST' && v.data?.members) {
              const p = {};
              v.data.members.forEach((b) => {
                p[b.userId] = {
                  userId: b.userId,
                  nickname: b.nickname,
                  latitude: b.latitude,
                  longitude: b.longitude,
                  color: b.color,
                  lastUpdateTime: b.lastUpdateTime || null,
                };
              }),
                n({ members: p });
            }
          } catch (v) {
            console.error('멤버 리스트 메시지 파싱 오류:', v);
          }
        }),
        g.send(
          '/pub/location.join',
          {
            Authorization: `Bearer ${o}`,
            'room-code': c.roomCode,
            'join-token': c.joinToken,
            'content-type': 'application/json',
          },
          '{}'
        ),
        n({ connected: !0, stomp: g, room: c });
    },
    disconnect() {
      const { stomp: i } = s();
      try {
        i?.disconnect?.(() => {
          console.log('WebSocket 연결 해제됨');
        });
      } catch (o) {
        console.error('WebSocket 해제 오류:', o);
      }
      n({ connected: !1, stomp: void 0, room: void 0, members: {} });
    },
    sendLocation(i) {
      const { stomp: o, room: c } = s();
      o?.connected &&
        c &&
        o.send(
          '/pub/location.update',
          {
            'room-code': c.roomCode,
            'join-token': c.joinToken,
            'content-type': 'application/json',
          },
          JSON.stringify({ ...i, accuracy: i.accuracy ?? 5 })
        );
    },
    setOnMemberUpdate(i) {
      s().onMemberUpdate = i;
    },
    getMembers() {
      return Object.values(s().members);
    },
    clearMembers() {
      n({ members: {} });
    },
  })),
  Vv = 'https://haeruhand.o-r.kr/api',
  pR = () => {
    const n = new URL(Vv, location.origin);
    return `${n.protocol === 'https:' ? 'wss' : 'ws'}://${n.host}/api/v1/ws`;
  },
  yR = pR(),
  vR = () =>
    sessionStorage.getItem('accessToken') ||
    localStorage.getItem('accessToken') ||
    '';
function SR() {
  const n = St(),
    { connect: s } = Jo(),
    [i, o] = z.useState(''),
    [c, f] = z.useState(''),
    h = z.useRef(!1),
    m = () => n({ to: '/buddy' }),
    g = (v) => {
      try {
        return new URL(v.replace('seafeet://', 'http://')).searchParams.get(
          'token'
        );
      } catch {
        return null;
      }
    },
    d = () => {
      try {
        const v = localStorage.getItem('selectedFishery');
        if (v) {
          const p = JSON.parse(v);
          return Number(p.id) || 0;
        }
      } catch {}
      return 1;
    };
  return (
    z.useEffect(() => {
      if (h.current) return;
      (h.current = !0),
        (async () => {
          const p = sessionStorage.getItem('locationRoom'),
            b = sessionStorage.getItem('isLocationRoomHost') === 'true',
            T = vR();
          console.log('방 초기화 시작:', {
            saved: !!p,
            isHost: b,
            hasToken: !!T,
          });
          const w = async (E, M) => {
            if (!T) return;
            const { connected: O } = Jo.getState?.() ?? {};
            if (O) {
              console.log('이미 연결되어 있습니다.');
              return;
            }
            try {
              await s({
                wsUrl: yR,
                accessToken: T,
                room: { roomCode: E, joinToken: M },
              }),
                console.log('Share 페이지에서 WebSocket 연결 성공');
            } catch (L) {
              console.warn(
                'WS connect from /share failed (continue showing QR):',
                L
              );
            }
          };
          if (p && b)
            try {
              const { roomCode: E, deepLink: M, joinToken: O } = JSON.parse(p);
              if (E && M) {
                console.log('기존 방 재사용:', E), f(E), o(M), O && w(E, O);
                return;
              }
            } catch (E) {
              console.error('저장된 방 정보 파싱 오류:', E);
            }
          if (!T) {
            alert('로그인이 필요합니다.'), n({ to: '/login' });
            return;
          }
          console.log('새 방 생성 시작');
          try {
            const E = d(),
              M = await fetch(`${Vv}/v1/location/rooms`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${T}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({ fisheryId: E }),
              }),
              O = await M.text();
            if (!M.ok) {
              let Y = O;
              try {
                const K = JSON.parse(O);
                Y = K.message || K.error || O;
              } catch {}
              throw new Error(`HTTP ${M.status} - ${Y}`);
            }
            const L = JSON.parse(O);
            if (!L.is_success || !L.data)
              throw new Error(L.message || '방 생성 실패');
            const { roomId: U, roomCode: G, deepLink: I } = L.data;
            o(I), f(G);
            const Z = g(I) || '';
            sessionStorage.setItem(
              'locationRoom',
              JSON.stringify({
                roomId: U,
                roomCode: G,
                deepLink: I,
                joinToken: Z,
              })
            ),
              sessionStorage.setItem('isLocationRoomHost', 'true'),
              sessionStorage.setItem('hostRoomCode', G),
              Z && w(G, Z);
          } catch (E) {
            console.error('방 생성 오류:', E),
              alert(
                E?.message || '방을 생성할 수 없습니다. 다시 시도해 주세요.'
              ),
              n({ to: '/buddy' });
          }
        })();
    }, []),
    S.jsxs('div', {
      className: nn.container,
      children: [
        S.jsx('div', {
          className: nn.header,
          children: S.jsx('button', {
            className: nn.backButton,
            onClick: m,
            children: S.jsx('img', {
              src: '/backButton.svg',
              alt: '뒤로가기',
              className: nn.backButtonIcon,
            }),
          }),
        }),
        S.jsxs('div', {
          className: nn.titleSection,
          children: [
            S.jsx(te, {
              size: 'xl',
              weight: 'bold',
              color: 'dark',
              children: '친구에게 QR을 보여주세요',
            }),
            S.jsxs('div', {
              className: nn.subtitleSection,
              children: [
                S.jsx(te, {
                  size: 'md',
                  weight: 'regular',
                  color: 'dark',
                  children: '서로의 위치를 확인하고,',
                }),
                S.jsx(te, {
                  size: 'md',
                  weight: 'regular',
                  color: 'dark',
                  children: '더 안전하게 해루질할 수 있어요',
                }),
              ],
            }),
          ],
        }),
        S.jsx('div', {
          className: nn.content,
          children: S.jsxs('div', {
            className: nn.qrSection,
            children: [
              i
                ? S.jsx('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 16,
                      background: '#fff',
                      borderRadius: 12,
                      border: '2px solid #e0e0e0',
                      margin: '0 auto',
                    },
                    children: S.jsx(fR, {
                      value: i,
                      size: 220,
                      level: 'M',
                      bgColor: '#FFFFFF',
                      fgColor: '#000000',
                    }),
                  })
                : S.jsx('div', {
                    style: {
                      width: 220,
                      height: 220,
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      margin: '0 auto',
                    },
                    children: S.jsx(te, {
                      size: 'md',
                      color: 'gray',
                      children: 'QR 코드 로딩 중...',
                    }),
                  }),
              c &&
                S.jsx('div', {
                  className: nn.qrInfo,
                  children: S.jsxs(te, {
                    size: 'sm',
                    weight: 'regular',
                    color: 'gray',
                    children: ['방 코드: ', c],
                  }),
                }),
            ],
          }),
        }),
        S.jsx('div', {
          className: nn.buttonSection,
          children: S.jsx(fa, {
            size: 'large',
            variant: 'primary',
            fullWidth: !0,
            onClick: m,
            children: '돌아가기',
          }),
        }),
      ],
    })
  );
}
const bR = async () => await Mt.get('/v1/fisheries'),
  _R = () =>
    mr({
      queryKey: ['fisheries'],
      queryFn: bR,
      staleTime: 600 * 1e3,
      gcTime: 1800 * 1e3,
    }),
  Sy = { gueom: 1, gonae: 2, aewol: 3, suwon: 5 },
  by = (n, s) => n.find((i) => i.id === s),
  wR = async () => await Mt.get('/v1/weather/fishery'),
  TR = () =>
    mr({
      queryKey: ['weather-fishery'],
      queryFn: wR,
      staleTime: 300 * 1e3,
      gcTime: 600 * 1e3,
    }),
  ER = '_container_161fw_1',
  xR = '_fixedContent_161fw_21',
  RR = '_header_161fw_37',
  CR = '_scrollContent_161fw_55',
  AR = '_mapSection_161fw_87',
  MR = '_map_161fw_87',
  OR = '_mapDimmed_161fw_123',
  kR = '_hanlimMap_161fw_131',
  DR = '_aewolMap_161fw_155',
  NR = '_infoSection_161fw_221',
  LR = '_locationButtons_161fw_249',
  jR = '_locationButton_161fw_249',
  BR = '_selected_161fw_287',
  zR = '_buttonSection_161fw_309',
  UR = '_loadingMessage_161fw_339',
  IR = '_errorMessage_161fw_355',
  HR = '_warningBanner_161fw_383',
  He = {
    container: ER,
    fixedContent: xR,
    header: RR,
    scrollContent: CR,
    mapSection: AR,
    map: MR,
    mapDimmed: OR,
    hanlimMap: kR,
    aewolMap: DR,
    infoSection: NR,
    locationButtons: LR,
    locationButton: jR,
    selected: BR,
    buttonSection: zR,
    loadingMessage: UR,
    errorMessage: IR,
    warningBanner: HR,
  },
  _y = [
    { id: 'gueom', name: '구업', displayName: '구업어촌계유어장' },
    { id: 'gonae', name: '고내', displayName: '고내어촌계유어장' },
    { id: 'aewol', name: '애월', displayName: '애월어촌계유어장' },
    { id: 'suwon', name: '수원', displayName: '수원어촌계유어장' },
  ],
  PR = () => {
    const [n, s] = z.useState(null),
      i = St(),
      { isAuthenticated: o } = Zs(),
      { data: c, isLoading: f, error: h } = _R(),
      { data: m, isLoading: g, error: d } = TR(),
      { data: v, isLoading: p, error: b } = Jf('L1090700');
    z.useEffect(() => {
      if (!o()) {
        console.log('로그인이 필요합니다. 로그인 페이지로 이동합니다.'),
          i({ to: '/login' });
        return;
      }
      console.log('로그인 상태 확인됨, API 호출 시작');
    }, [o, i]);
    const T = z.useMemo(() => {
        if (!m?.data || m.data.length === 0) return null;
        const Y = new Date().getHours() < 12 ? '오전' : '오후';
        return m.data.find((K) => K.forecastTimePeriod === Y) || m.data[0];
      }, [m]),
      w = z.useMemo(
        () =>
          !v?.data?.content || v.data.content.length === 0 ? null : ed(v)[0],
        [v]
      ),
      E = (I) => {
        switch (I) {
          case '맑음':
            return '/sun.png';
          case '구름많음':
            return '/cloudy.png';
          case '흐림':
            return '/foggy.png';
          default:
            return '/sun.png';
        }
      },
      M = (I) => {
        switch (I) {
          case '보통':
            return '/normal.svg';
          case '좋음':
            return '/smile.png';
          case '나쁨':
            return '/sad.png';
          case '위험':
            return '/danger.png';
          default:
            return '/normal.svg';
        }
      },
      O = (I) => {
        if ((s(I), c?.data)) {
          const Z = Sy[I];
          if (Z) {
            const Y = by(c.data, Z);
            Y
              ? console.log(`${I} 선택 - 어장 정보:`, Y)
              : console.log(
                  `${I} 선택 - 해당 ID(${Z})의 어장을 찾을 수 없습니다.`
                );
          }
        }
        m?.data && console.log(`${I} 선택 - 날씨 정보:`, m.data);
      },
      L = () => {
        if (!n) {
          alert('지역을 선택해주세요!');
          return;
        }
        const I = _y.find((Z) => Z.id === n);
        if (
          (I && localStorage.setItem('selectedLocation', JSON.stringify(I)),
          c?.data)
        ) {
          const Z = Sy[n];
          if (Z) {
            const Y = by(c.data, Z);
            Y && localStorage.setItem('selectedFishery', JSON.stringify(Y));
          }
        }
        T && localStorage.setItem('currentWeather', JSON.stringify(T)),
          m?.data &&
            localStorage.setItem('weatherData', JSON.stringify(m.data)),
          i({ to: '/main' });
      },
      U = !o() || f || g,
      G = h || d;
    return o()
      ? S.jsxs('div', {
          className: He.container,
          children: [
            S.jsx('div', {
              className: He.fixedContent,
              children: S.jsxs('div', {
                className: He.header,
                children: [
                  S.jsx(te, {
                    size: 'xl',
                    weight: 'bold',
                    color: 'dark',
                    className: He.title,
                    children: '오늘은 어디서 해루질 해볼까요?',
                  }),
                  S.jsx(te, {
                    size: 'md',
                    weight: 'regular',
                    color: 'dark',
                    className: He.subtitle,
                    children: '지역에 맞는 날씨와 주의사항을 알려드릴게요',
                  }),
                ],
              }),
            }),
            S.jsxs('div', {
              className: He.scrollContent,
              children: [
                S.jsxs('div', {
                  className: He.mapSection,
                  children: [
                    S.jsx('img', {
                      src: '/jeju_map.svg',
                      alt: '제주도 지도',
                      className: `${He.map} ${
                        n === 'suwon' ||
                        n === 'aewol' ||
                        n === 'gonae' ||
                        n === 'gueom'
                          ? He.mapDimmed
                          : ''
                      }`,
                    }),
                    n === 'suwon' &&
                      S.jsx('img', {
                        src: '/jeju_hanlim_1.svg',
                        alt: '한림 지도',
                        className: He.hanlimMap,
                      }),
                    n === 'aewol' &&
                      S.jsx('img', {
                        src: '/jeju_aewol_3.svg',
                        alt: '애월 지도',
                        className: He.aewolMap,
                      }),
                    n === 'gonae' &&
                      S.jsx('img', {
                        src: '/jeju_aewol_2.svg',
                        alt: '고내 지도',
                        className: He.aewolMap,
                      }),
                    n === 'gueom' &&
                      S.jsx('img', {
                        src: '/jeju_aewol_1.svg',
                        alt: '구역 지도',
                        className: He.aewolMap,
                      }),
                  ],
                }),
                S.jsx('div', {
                  className: He.locationButtons,
                  children: _y.map((I) =>
                    S.jsx(
                      'button',
                      {
                        className: `${He.locationButton} ${
                          n === I.id ? He.selected : ''
                        }`,
                        onClick: () => O(I.id),
                        disabled: U,
                        children: I.name,
                      },
                      I.id
                    )
                  ),
                }),
                U &&
                  S.jsx('div', {
                    className: He.loadingMessage,
                    children: S.jsx(te, {
                      size: 'md',
                      color: 'gray',
                      children: '정보를 불러오는 중...',
                    }),
                  }),
                G &&
                  S.jsx('div', {
                    className: He.errorMessage,
                    children: S.jsx(te, {
                      size: 'md',
                      color: 'error',
                      children: '정보를 불러올 수 없습니다.',
                    }),
                  }),
                S.jsxs('div', {
                  className: He.buttonSection,
                  children: [
                    S.jsxs('div', {
                      className: He.infoSection,
                      children: [
                        S.jsx('div', {
                          className: He.warningBanner,
                          children: p
                            ? S.jsx(Ba, {})
                            : b
                            ? S.jsx(An, {
                                type: '폭염주의보',
                                date: '특보 정보를 불러올 수 없습니다',
                                location: '',
                                variant: 'info',
                                suffix: '',
                              })
                            : w
                            ? S.jsx(An, {
                                type: w.type,
                                date: w.date,
                                location: w.location,
                                variant: 'latest',
                                suffix: '발효',
                              })
                            : S.jsx(An, {
                                type: '폭염주의보',
                                date: '현재 발효 중인 특보가 없습니다',
                                location: '',
                                variant: 'info',
                                suffix: '',
                              }),
                        }),
                        g
                          ? S.jsxs(S.Fragment, {
                              children: [S.jsx(Zo, {}), S.jsx(Zo, {})],
                            })
                          : S.jsx(nv, {
                              items: [
                                {
                                  icon: S.jsx('img', {
                                    src: E(T?.weatherDescription || '맑음'),
                                    alt: '날씨 아이콘',
                                    style: { width: '24px', height: '24px' },
                                  }),
                                  subtitle: '현재 날씨',
                                  data: T
                                    ? `${T.averageWaterTemperature}℃ / ${T.weatherDescription}`
                                    : '32.7℃ / 맑음',
                                },
                                {
                                  icon: S.jsx('img', {
                                    src: M(T?.seaTravelIndex || '보통'),
                                    alt: '위험도 아이콘',
                                    style: { width: '24px', height: '24px' },
                                  }),
                                  subtitle: '위험도',
                                  data: T?.seaTravelIndex || '보통',
                                },
                              ],
                            }),
                      ],
                    }),
                    S.jsx(fa, {
                      size: 'large',
                      variant: 'primary',
                      fullWidth: !0,
                      onClick: L,
                      disabled: !n || U,
                      children: '해루하러 가기',
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      : S.jsx('div', {
          className: He.container,
          children: S.jsx('div', {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            },
            children: S.jsx(te, {
              size: 'lg',
              color: 'gray',
              children: '로그인 확인 중...',
            }),
          }),
        });
  },
  qR = '_container_tkohw_1',
  $R = '_wrapper_tkohw_19',
  GR = '_buttonSection_tkohw_37',
  VR = '_backButton_tkohw_45',
  QR = '_backButtonIcon_tkohw_65',
  KR = '_map_tkohw_75',
  FR = '_buddyList_tkohw_117',
  YR = '_buddy_tkohw_117',
  XR = '_dot_tkohw_159',
  En = {
    container: qR,
    wrapper: $R,
    buttonSection: GR,
    backButton: VR,
    backButtonIcon: QR,
    map: KR,
    buddyList: FR,
    buddy: YR,
    dot: XR,
  },
  WR = (n) => {
    const {
        initializeFCM: s,
        handleForegroundMessage: i,
        isRegistered: o,
        error: c,
        tokenId: f,
        deleteToken: h,
        sendNotification: m,
        checkFCMService: g,
      } = _2(),
      { connected: d } = Jo(),
      v = z.useRef(null);
    return (
      z.useEffect(() => {
        (async () => {
          d &&
            !o &&
            (console.log('소켓 연결됨, FCM 초기화 시작...'),
            (await s(n))
              ? console.log('FCM 초기화 성공')
              : console.error('FCM 초기화 실패:', c || '알 수 없는 오류'));
        })();
      }, [d, o, n, s, c]),
      z.useEffect(
        () => (
          d &&
            o &&
            (v.current && v.current(),
            (v.current = i((p) => {
              console.log('FCM 포그라운드 메시지 수신:', p);
            }))),
          () => {
            v.current && (v.current(), (v.current = null));
          }
        ),
        [d, o, i]
      ),
      z.useEffect(() => {
        (async () => {
          if ('serviceWorker' in navigator)
            try {
              const b = await navigator.serviceWorker.register(
                '/firebase-messaging-sw.js'
              );
              console.log('Service Worker 등록 성공:', b);
            } catch (b) {
              console.error('Service Worker 등록 실패:', b);
            }
        })();
      }, []),
      {
        isRegistered: o,
        error: c,
        connected: d,
        tokenId: f,
        deleteToken: h,
        sendNotification: m,
        checkFCMService: g,
      }
    );
  },
  td = 'https://haeruhand.o-r.kr/api',
  ZR = () => {
    const n = new URL(td, location.origin);
    return `${n.protocol === 'https:' ? 'wss' : 'ws'}://${n.host}/api/v1/ws`;
  },
  Qv = ZR();
console.log('[API_BASE]', td);
console.log('[WS_URL]', Qv);
const wy = () =>
    sessionStorage.getItem('accessToken') ||
    localStorage.getItem('accessToken') ||
    '',
  JR = () => {
    sessionStorage.removeItem('locationRoom'),
      sessionStorage.removeItem('isLocationRoomHost'),
      sessionStorage.removeItem('hostRoomCode');
  },
  eC = async () => {
    if (!navigator.geolocation)
      return console.error('Geolocation이 지원되지 않습니다.'), !1;
    if (navigator.permissions)
      try {
        const n = await navigator.permissions.query({ name: 'geolocation' });
        return console.log('GPS 권한 상태:', n.state), n.state === 'granted';
      } catch (n) {
        console.log('권한 확인 실패, 직접 시도:', n);
      }
    return !0;
  },
  tC = () =>
    new Promise((n, s) => {
      navigator.geolocation.getCurrentPosition(
        n,
        (i) => {
          console.log('빠른 GPS 실패, 정확도 높은 모드로 재시도:', i),
            navigator.geolocation.getCurrentPosition(n, s, {
              enableHighAccuracy: !0,
              timeout: 1e4,
              maximumAge: 6e4,
            });
        },
        { enableHighAccuracy: !1, timeout: 5e3, maximumAge: 3e5 }
      );
    }),
  nC = () => {
    const n = St(),
      { isAuthenticated: s } = Zs(),
      {
        connected: i,
        connect: o,
        disconnect: c,
        sendLocation: f,
        setOnMemberUpdate: h,
        getMembers: m,
        clearMembers: g,
      } = Jo(),
      { isRegistered: d, error: v } = WR(1),
      p = z.useRef(null),
      b = z.useRef(null),
      T = z.useRef(new Map()),
      w = z.useRef(null),
      E = z.useRef(!1),
      [M, O] = z.useState(null),
      [L, U] = z.useState([]),
      [G, I] = z.useState(!1),
      Z = () => {
        try {
          const C = sessionStorage.getItem('userInfo'),
            V = localStorage.getItem('userInfo');
          console.log('sessionStorage userInfo:', C),
            console.log('localStorage userInfo:', V);
          const W = C || V,
            ae = W ? JSON.parse(W) : null;
          return console.log('파싱된 userInfo:', ae), ae;
        } catch (C) {
          return console.error('userInfo 파싱 오류:', C), null;
        }
      },
      Y = () => {
        try {
          const C = sessionStorage.getItem('locationRoom');
          return C ? JSON.parse(C) : null;
        } catch {
          return null;
        }
      },
      K = (C) => {
        try {
          const V = C.startsWith('seafeet://')
            ? C.replace('seafeet://', 'http://')
            : C;
          return new URL(V).searchParams.get('token');
        } catch {
          return null;
        }
      },
      X = () => {
        try {
          w.current != null &&
            (navigator.geolocation.clearWatch(w.current), (w.current = null)),
            T.current.forEach((C) => {
              C.marker.setMap && C.marker.setMap(null),
                C.overlay.setMap && C.overlay.setMap(null);
            }),
            T.current.clear();
        } catch {}
      },
      F = () => {
        if (!p.current) return;
        p.current.relayout();
        const C = b.current?.getPosition();
        C && p.current.setCenter(C);
      },
      ne = (C) => {
        if (
          !p.current ||
          C.userId === M?.userId ||
          C.latitude == null ||
          C.longitude == null
        )
          return;
        const V = C.userId,
          W = new window.kakao.maps.LatLng(C.latitude, C.longitude);
        let ae = T.current.get(V);
        if (ae) ae.marker.setPosition(W), ae.overlay.setPosition(W);
        else {
          const R = C.color || '#2196F3',
            P = new window.kakao.maps.MarkerImage(
              `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <circle cx="9" cy="9" r="8" fill="${R}" stroke="black" stroke-width="2"/>
          </svg>
        `)}`,
              new window.kakao.maps.Size(18, 18)
            ),
            ee = new window.kakao.maps.CustomOverlay({
              position: W,
              content: `
          <div style="
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            margin-bottom: 8px;
            text-align: center;
          ">
            ${C.nickname}
          </div>
        `,
              yAnchor: 1.2,
            });
          (ae = new window.kakao.maps.Marker({
            map: p.current,
            position: W,
            image: P,
          })),
            T.current.set(V, { marker: ae, overlay: ee }),
            ee.setMap(p.current);
        }
      },
      oe = (C, V) => {
        if (
          (console.log('moveMapToMyLocation 호출:', C),
          console.log('userInfo:', M),
          console.log('currentUserInfo:', V),
          console.log('mapRef.current:', p.current),
          !G && C.latitude && C.longitude && p.current)
        ) {
          const W = new window.kakao.maps.LatLng(C.latitude, C.longitude);
          p.current.setCenter(W),
            I(!0),
            console.log('지도 중심을 첫 번째 위치로 이동:', W);
        } else
          console.log('지도 이동 조건 불만족:', {
            hasMovedToLocation: G,
            hasLatitude: !!C.latitude,
            hasLongitude: !!C.longitude,
            hasMapRef: !!p.current,
          });
      };
    z.useEffect(() => {
      if (E.current) return;
      E.current = !0;
      const C = async () => {
        await new Promise((V) => {
          if (window.kakao?.maps) return V();
          const W = document.createElement('script');
          (W.src =
            '//dapi.kakao.com/v2/maps/sdk.js?appkey=e0bdd2802078f55b46ab9c2abc457170&autoload=false'),
            (W.async = !0),
            (W.onload = () => V()),
            document.head.appendChild(W);
        }),
          await new Promise((V) => {
            if (window.Stomp) return V();
            const W = document.createElement('script');
            (W.src =
              'https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js'),
              (W.async = !0),
              (W.onload = () => V()),
              document.head.appendChild(W);
          });
      };
      return (
        (async () => {
          await C();
          const V = Z();
          console.log('설정할 userInfo:', V),
            O(V),
            window.kakao.maps.load(() => {
              const ae = document.getElementById('map');
              if (!ae) return;
              p.current = new window.kakao.maps.Map(ae, {
                center: new window.kakao.maps.LatLng(33.4996, 126.5312),
                level: 2,
              });
              const R = () => setTimeout(F, 100);
              window.addEventListener('pageshow', R),
                navigator.geolocation.getCurrentPosition(
                  (P) => {
                    const { latitude: ee, longitude: J } = P.coords,
                      re = new window.kakao.maps.LatLng(ee, J);
                    p.current.setCenter(re),
                      f({
                        latitude: ee,
                        longitude: J,
                        accuracy: P.coords.accuracy || 5,
                      }),
                      (w.current = navigator.geolocation.watchPosition(
                        (de) => {
                          f({
                            latitude: de.coords.latitude,
                            longitude: de.coords.longitude,
                            accuracy: de.coords.accuracy || 5,
                          });
                        },
                        (de) => console.error('GPS watch error', de?.message),
                        {
                          enableHighAccuracy: !0,
                          maximumAge: 3e3,
                          timeout: 5e3,
                        }
                      ));
                  },
                  (P) => {
                    console.error('GPS 초기화 실패:', P);
                  }
                );
            }),
            h((ae) => {
              console.log('멤버 업데이트 콜백 호출:', ae),
                oe(ae, V),
                ne(ae),
                U((R) => {
                  console.log('이전 멤버들:', R);
                  const P = new Map(R.map((J) => [J.userId, J]));
                  P.set(ae.userId, { ...(P.get(ae.userId) || {}), ...ae });
                  const ee = Array.from(P.values());
                  return console.log('새로운 멤버들:', ee), ee;
                });
            });
          const W = Y();
          if (W?.roomCode) {
            const ae = wy();
            if (ae) {
              const R = {
                roomCode: W.roomCode,
                joinToken: W.joinToken || K(W.deepLink) || '',
              };
              try {
                await o({ wsUrl: Qv, accessToken: ae, room: R }),
                  setTimeout(async () => {
                    try {
                      if (!(await eC())) {
                        console.log('GPS 권한이 없습니다.');
                        return;
                      }
                      const J = await tC();
                      f({
                        latitude: J.coords.latitude,
                        longitude: J.coords.longitude,
                        accuracy: J.coords.accuracy || 5,
                      });
                    } catch (ee) {
                      console.error('연결 후 GPS 획득 실패:', ee);
                    }
                  }, 500);
                const P = m();
                U(P), P.forEach(ne);
              } catch (P) {
                console.error('WS connect fail', P);
              }
            }
          }
        })(),
        () => {
          X(), h(void 0);
        }
      );
    }, [o, f, h, m]);
    const me = () => {
        X(), n({ to: '/main' });
      },
      Se = async () => {
        try {
          const C = sessionStorage.getItem('isLocationRoomHost') === 'true',
            V = sessionStorage.getItem('hostRoomCode'),
            W = wy();
          C &&
            V &&
            W &&
            (await fetch(`${td}/v1/location/rooms/${V}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${W}` },
            }).catch(() => {}));
        } catch {}
      },
      be = async () => {
        X(), await Se(), c(), JR(), g(), n({ to: '/main' });
      };
    return S.jsxs('div', {
      className: En.container,
      children: [
        !s() && S.jsx(Iv, { message: '위치 트래킹을 시작' }),
        S.jsxs('div', {
          style: {
            position: 'fixed',
            top: 8,
            right: 8,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 11,
          },
          children: [
            'WS: ',
            i ? '🟢' : '🔴',
            ' / FCM: ',
            d ? '🟢' : '🔴',
            ' / members:',
            ' ',
            L.length,
          ],
        }),
        v &&
          S.jsxs('div', {
            style: {
              position: 'fixed',
              top: 40,
              right: 8,
              zIndex: 9999,
              background: 'rgba(255,0,0,0.8)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: 6,
              fontSize: 11,
            },
            children: ['FCM 오류: ', v],
          }),
        S.jsx('div', { id: 'map', className: En.map }),
        S.jsxs('div', {
          className: En.wrapper,
          children: [
            S.jsx('button', {
              className: En.backButton,
              onClick: me,
              children: S.jsx('img', {
                src: '/backButton.svg',
                alt: '뒤로가기',
                className: En.backButtonIcon,
              }),
            }),
            S.jsxs('div', {
              className: En.buddyList,
              children: [
                S.jsx('div', {
                  children: S.jsxs(te, {
                    size: 'xs',
                    weight: 'regular',
                    color: 'white',
                    children: ['참여자 ', L.length, '명'],
                  }),
                }),
                L.map((C) =>
                  S.jsxs(
                    'div',
                    {
                      className: En.buddy,
                      children: [
                        S.jsx('div', {
                          className: En.dot,
                          style: { backgroundColor: C.color || '#4fc1ff' },
                        }),
                        S.jsx(te, {
                          size: 'sm',
                          weight: 'regular',
                          color: 'white',
                          children: C.nickname,
                        }),
                      ],
                    },
                    C.userId
                  )
                ),
              ],
            }),
            S.jsxs('div', {
              className: En.buttonSection,
              children: [
                S.jsx(fa, {
                  size: 'large',
                  variant: 'primary',
                  fullWidth: !0,
                  onClick: () => n({ to: '/share' }),
                  children: 'QR 공유하기',
                }),
                S.jsx(fa, {
                  size: 'large',
                  variant: 'secondary',
                  fullWidth: !0,
                  onClick: be,
                  children: '그만하기',
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  aC = async (n = 'DT_0004') => await Mt.get(`/v1/tides/station/${n}`),
  sC = (n = 'DT_0004') =>
    mr({
      queryKey: ['tides', n],
      queryFn: () => aC(n),
      staleTime: 600 * 1e3,
      gcTime: 1800 * 1e3,
    }),
  Ty = (n) => {
    if (!n || n.length < 2) return '';
    const [s, i] = n;
    return `${String(s).padStart(2, '0')}:${String(i).padStart(2, '0')}`;
  },
  iC = '_container_1glue_3',
  rC = '_fixedContent_1glue_23',
  oC = '_header_1glue_43',
  lC = '_logo_1glue_61',
  cC = '_bellButton_1glue_71',
  uC = '_bellIcon_1glue_83',
  fC = '_bellMarker_1glue_101',
  dC = '_backButtonContainer_1glue_123',
  hC = '_backButton_1glue_123',
  gC = '_backButtonIcon_1glue_157',
  mC = '_scrollContent_1glue_171',
  pC = '_notFooter_1glue_195',
  yC = '_warningBanner_1glue_203',
  vC = '_weatherWidgets_1glue_211',
  SC = '_mapContainer_1glue_225',
  bC = '_map_1glue_225',
  _C = '_categorySearch_1glue_271',
  wC = '_categoryButton_1glue_295',
  TC = '_badgeIcon_1glue_307',
  EC = '_harvestButton_1glue_351',
  xC = '_buttons_1glue_359',
  RC = '_kakaoMap_1glue_371',
  De = {
    container: iC,
    fixedContent: rC,
    header: oC,
    logo: lC,
    bellButton: cC,
    bellIcon: uC,
    bellMarker: fC,
    backButtonContainer: dC,
    backButton: hC,
    backButtonIcon: gC,
    scrollContent: mC,
    notFooter: pC,
    warningBanner: yC,
    weatherWidgets: vC,
    mapContainer: SC,
    map: bC,
    categorySearch: _C,
    categoryButton: wC,
    badgeIcon: TC,
    harvestButton: EC,
    buttons: xC,
    kakaoMap: RC,
  },
  CC = '/assets/closeButtonLightGray-BknypqfS.png',
  AC = '_overlay_15t4e_3',
  MC = '_modalWindow_15t4e_27',
  OC = '_headerTitle_15t4e_83',
  kC = '_closeModal_15t4e_93',
  DC = '_boxInWindow_15t4e_115',
  NC = '_toggleButton_15t4e_143',
  LC = '_list_15t4e_175',
  jC = '_banTable_15t4e_223',
  BC = '_listItem_15t4e_307',
  Pe = {
    overlay: AC,
    modalWindow: MC,
    headerTitle: OC,
    closeModal: kC,
    boxInWindow: DC,
    toggleButton: NC,
    list: LC,
    banTable: jC,
    listItem: BC,
  },
  zC = [
    { species: '대구', start: '01-16', end: '02-15', minLength: '35cm 이하' },
    {
      species: '문치가자미',
      start: '12-01',
      end: '01-31',
      minLength: '20cm 이하',
    },
    { species: '연어', start: '10-01', end: '11-30' },
    {
      species: '전어',
      start: '05-01',
      end: '07-15',
      note: '전국(강원특별자치도 및 경상북도 제외)',
    },
    {
      species: '쥐노래미',
      start: '11-01',
      end: '12-31',
      note: '주3)의 해역은 11월 15일부터 12월 14일까지',
      minLength: '20cm 이하',
    },
    {
      species: '참홍어',
      start: '06-01',
      end: '07-15',
      minLength: '체반폭 42cm 이하',
    },
    {
      species: '참조기',
      start: '07-01',
      end: '07-31',
      note: '근해자망어업중유자망(유동성그물)은 04-22 ~ 08-10',
      minLength: '15cm 이하',
      minNote: '20% 미만 포획 시 제외',
    },
    {
      species: '갈치',
      start: '07-01',
      end: '07-31',
      note: '북위 33도00분00초 이북 해역',
      minLength: '항문장 18cm 이하',
      minNote: '20% 미만 포획 시 제외',
    },
    {
      species: '고등어',
      start: '04-01',
      end: '06-30',
      note: '기간 중 1개월, 해양수산부장관 고시',
      minLength: '21cm 이하',
      minNote: '20% 미만 포획 시 제외',
    },
    {
      species: '말쥐치',
      start: '05-01',
      end: '07-31',
      note: '정치망어업, 연안어업 및 구획어업은 06-01 ~ 07-31',
      minLength: '18cm 이하',
    },
    { species: '옥돔', start: '07-21', end: '08-20' },
    { species: '명태', start: '01-01', end: '12-31' },
    { species: '삼치', start: '05-01', end: '05-31' },
    { species: '감성돔', start: '05-01', end: '05-31', minLength: '25cm 이하' },
    {
      species: '꽃게',
      start: '06-01',
      end: '09-30',
      note: '기간 중 2개월, 해양수산부장관 고시',
      minLength: '두흉갑장 6.4cm 이하',
    },
    {
      species: '대게류(붉은대게 제외)',
      start: '06-01',
      end: '11-30',
      note: '동경131도30분 이동수역은 06-01 ~ 10-31 / 기타',
      minLength: '두흉갑장 9cm 이하',
    },
    {
      species: '붉은대게',
      start: '07-10',
      end: '08-25',
      note: '강원특별자치도 연안자망어업은 06-01 ~ 07-10',
    },
    { species: '대하', start: '05-01', end: '06-30' },
    {
      species: '새조개',
      start: '06-16',
      end: '09-30',
      note: '부산, 울산, 경남, 전남(무안·영광 제외) 및 제주는 06-01 ~ 09-30',
    },
    {
      species: '소라',
      start: '06-01',
      end: '08-31',
      note: '제주특별자치도(추자도 제외)',
      minLength: '7cm 이하',
      minNote: '각고 5cm 이하. 제주도 및 경북 울릉도·독도산은 7cm 이하',
    },
    {
      species: '소라(추자도)',
      start: '07-01',
      end: '08-31',
      note: '제주특별자치도 제주시 추자면 추자도',
      minLength: '7cm 이하',
    },
    {
      species: '소라',
      start: '06-01',
      end: '07-31',
      note: '경상북도 울릉군 울릉도와 독도',
      minLength: '제주도 7cm 이하',
      minNote: '각고 5cm 이하. 제주도 및 경북 울릉도·독도산은 7cm 이하',
    },
    {
      species: '전복류',
      start: '09-01',
      end: '10-31',
      note: '제주특별자치도는 10-01 ~ 12-31',
    },
    { species: '전복류(제주도)', start: '10-01', end: '12-31' },
    {
      species: '코끼리조개',
      start: '05-01',
      end: '06-30',
      note: '강원특별자치도와 경상북도 한정',
    },
    {
      species: '키조개',
      start: '07-01',
      end: '08-31',
      minLength: '각장 18cm 이하',
      minNote: '부산, 울산, 강원특별자치도, 경상북도 및 경상남도산 한정',
    },
    { species: '가리비', start: '03-01', end: '06-30', note: '주7)의 해역' },
    {
      species: '오분자기',
      start: '07-01',
      end: '08-31',
      note: '제주특별자치도 한정',
      minLength: '각장 4cm 이하',
      minNote: '제주특별자치도산 한정',
    },
    {
      species: '넓미역',
      start: '09-01',
      end: '11-30',
      note: '제주특별자치도 한정',
    },
    { species: '우뭇가사리', start: '11-01', end: '03-31' },
    { species: '톳', start: '10-01', end: '01-31' },
    { species: '해삼', start: '07-01', end: '07-31' },
    {
      species: '살오징어',
      start: '04-01',
      end: '05-31',
      note: '근해채낚기·연안복합·정치망은 04-01 ~ 04-30',
      minLength: '외투장 15cm 이하',
      minNote: ' 20% 미만 포획 시 제외',
    },
    {
      species: '낙지',
      start: '06-01',
      end: '06-30',
      note: '시·도지사 고시 기간(04-01 ~ 09-30 중 1개월 이상)',
    },
    { species: '주꾸미', start: '05-11', end: '08-31' },
    {
      species: '참문어',
      start: '05-16',
      end: '06-30',
      note: '시·도지사 고시 기간(05-01 ~ 09-15 중 46일 이상)',
    },
  ],
  UC = (n, s, i) => (n <= s ? i >= n && i <= s : i >= n || i <= s),
  IC = (n, s) => {
    const i = s.toISOString().slice(5, 10);
    return n.filter((o) => UC(o.start, o.end, i));
  },
  HC = ({ onClose: n }) => {
    const [s, i] = z.useState('prohibitedItems'),
      c = IC(zC, new Date()),
      f = ({ label: g, value: d }) =>
        S.jsx('div', {
          onClick: () => i(d),
          children: S.jsx(te, {
            size: 'lg',
            style: {
              cursor: 'pointer',
              color: s === d ? $.colors.white : $.colors.gray,
              backgroundColor: s === d ? $.colors.main : $.colors.white,
              borderRadius: s === d ? $.borderRadius.md : 'none',
              padding: `1px ${$.spacing.sm}`,
            },
            children: g,
          }),
        }),
      h = () =>
        S.jsxs('div', {
          children: [
            S.jsxs('div', {
              children: [
                S.jsx(te, {
                  size: 'md',
                  style: {
                    margin: `${$.spacing.lg} ${$.spacing.sm} 0`,
                    flex: '0 0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  children: '보호 중인 친구들이에요,',
                }),
                S.jsx(te, {
                  size: 'md',
                  style: {
                    margin: `${$.spacing.xs} ${$.spacing.sm} ${$.spacing.md}`,
                    flex: '0 0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  children: '눈으로만 봐주세요!',
                }),
              ],
            }),
            S.jsx('div', {
              className: Pe.list,
              children:
                c.length === 0
                  ? S.jsx('li', {
                      className: Pe.listItem,
                      children: '오늘 금어기 어종이 없습니다',
                    })
                  : S.jsxs('table', {
                      className: Pe.banTable,
                      children: [
                        S.jsx('thead', {
                          children: S.jsxs('tr', {
                            children: [
                              S.jsx('th', { children: '어종명' }),
                              S.jsx('th', { children: '금지 체장/체중' }),
                            ],
                          }),
                        }),
                        S.jsx('tbody', {
                          children: c.map((g) =>
                            S.jsxs(
                              'tr',
                              {
                                children: [
                                  S.jsx('td', { children: g.species }),
                                  S.jsx('td', {
                                    children: g.minLength || g.minWeight || '-',
                                  }),
                                ],
                              },
                              g.species
                            )
                          ),
                        }),
                      ],
                    }),
            }),
          ],
        }),
      m = () =>
        S.jsxs('div', {
          children: [
            S.jsx(te, {
              size: 'md',
              style: {
                padding: $.spacing.md,
                margin: `${$.spacing.sm} ${$.spacing.sm} ${$.spacing.xs}`,
                height: '65px',
                flex: '0 0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              children: '이건 써도 괜찮아요!',
            }),
            S.jsxs('div', {
              className: Pe.list,
              children: [
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/투망.png', alt: '투망' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md} 0 ${$.spacing.sm}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '투망',
                    }),
                    S.jsx(te, {
                      size: 'sm',
                      color: 'gray',
                      style: {
                        marginBottom: $.spacing.md,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '그물 아래 둘레 25m 초과하면 안 됨',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/뜰채(쪽지).png', alt: '뜰채' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md} 0 ${$.spacing.sm}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '뜰채(쪽지)',
                    }),
                    S.jsx(te, {
                      size: 'sm',
                      color: 'gray',
                      style: {
                        marginBottom: $.spacing.md,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children:
                        '테의 가장 긴 변의 길이(테가 원형인 경우에는 지름의 길이)는 1m를 초과해서는 안 됨',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/반두(쪽대).png', alt: '반두' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md} 0 ${$.spacing.sm}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '반두(쪽대)',
                    }),
                    S.jsx(te, {
                      size: 'sm',
                      color: 'gray',
                      style: {
                        marginBottom: $.spacing.md,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '그물의 가장 긴 변이 2m를 초과해서는 안 됨',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/손들망.png', alt: '손들망' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md} 0 ${$.spacing.sm}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '손들망',
                    }),
                    S.jsx(te, {
                      size: 'sm',
                      color: 'gray',
                      style: {
                        marginBottom: $.spacing.md,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children:
                        '그물의 가장 긴 변(틀이나 테가 원형인 경우에는 지름의 길이)는 2m를 초과해서는 안 됨',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/외줄낚시.png', alt: '외줄낚시' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '외줄낚시',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/가리.png', alt: '가리' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md} 0 ${$.spacing.sm}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '가리',
                    }),
                    S.jsx(te, {
                      size: 'sm',
                      color: 'gray',
                      style: {
                        marginBottom: $.spacing.md,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children:
                        '가로ㆍ세로ㆍ높이의 길이(원통형인 경우는 지름)는 각각 80cm를 초과해서는 안 됨',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/통발.png', alt: '통발' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md} 0 ${$.spacing.sm}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '통발',
                    }),
                    S.jsx(te, {
                      size: 'sm',
                      color: 'gray',
                      style: {
                        marginBottom: $.spacing.md,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children:
                        '가로ㆍ세로ㆍ높이의 길이(원통형인 경우는 지름)는 각각 80cm를 초과해서는 안 되며, 통발의 개수는 1개를 초과해서는 안 됨',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/낫대.png', alt: '낫대' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `0 0 ${$.spacing.md}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '낫대',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/집게.png', alt: '집게' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '집게',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/갈고리.png', alt: '갈고리' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '갈고리',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/호미.png', alt: '호미' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '호미',
                    }),
                  ],
                }),
                S.jsxs('li', {
                  className: Pe.listItem,
                  children: [
                    S.jsx('img', { src: '/삽.png', alt: '삽' }),
                    S.jsx(te, {
                      size: 'md',
                      style: {
                        margin: `${$.spacing.md}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      children: '삽',
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
    return S.jsxs('div', {
      children: [
        S.jsx('div', { className: Pe.overlay, onClick: n }),
        S.jsxs('div', {
          className: Pe.modalWindow,
          children: [
            S.jsx('header', {
              className: Pe.headerTitle,
              children: S.jsx(te, {
                style: {
                  color: $.colors.white,
                  fontSize: $.typography.fontSize.xxxl,
                  marginBottom: $.spacing.xs,
                },
                children: '채집 안내서',
              }),
            }),
            S.jsx('div', {
              className: Pe.closeModal,
              onClick: n,
              tabIndex: 0,
              role: 'button',
              'aria-label': '닫기',
              children: S.jsx('img', {
                src: CC,
                alt: 'close',
                style: { display: 'block' },
              }),
            }),
            S.jsxs('div', {
              className: Pe.boxInWindow,
              children: [
                S.jsxs('div', {
                  className: Pe.toggleButton,
                  children: [
                    S.jsx(f, {
                      label: '채집 금지 목록',
                      value: 'prohibitedItems',
                    }),
                    S.jsx('span', { children: '|' }),
                    S.jsx(f, {
                      label: '사용 가능 도구',
                      value: 'availableTools',
                    }),
                  ],
                }),
                S.jsx('div', {
                  children:
                    s === 'prohibitedItems' ? S.jsx(h, {}) : S.jsx(m, {}),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  PC = '_container_1uz9z_1',
  qC = '_title_1uz9z_9',
  $C = '_logo_1uz9z_19',
  GC = '_description_1uz9z_31',
  VC = '_line_1uz9z_39',
  QC = '_callPublic_1uz9z_53',
  KC = '_callVillage_1uz9z_61',
  FC = '_appLaunch_1uz9z_69',
  aa = {
    container: PC,
    title: qC,
    logo: $C,
    description: GC,
    line: VC,
    callPublic: QC,
    callVillage: KC,
    appLaunch: FC,
  },
  YC = () =>
    S.jsxs('div', {
      className: aa.container,
      children: [
        S.jsx('div', {
          className: aa.title,
          children: S.jsx('img', {
            src: '/haeruhand_logo.svg',
            alt: '해루핸 로고',
            className: aa.logo,
          }),
        }),
        S.jsxs('div', {
          className: aa.description,
          children: [
            S.jsx(te, {
              size: 'sm',
              weight: 'regular',
              style: { color: 'gray' },
              children:
                '실시간 위치 공유부터 AI 어종 판별까지 해루질의 모든 것을 담은 스마트 플랫폼,',
            }),
            S.jsx(te, {
              size: 'md',
              weight: 'semiBold',
              style: { color: 'gray', margin: '4px 0px 2px 12px' },
              children: '해루핸',
            }),
            S.jsx(te, {
              size: 'sm',
              weight: 'regular',
              style: { color: 'gray' },
              children: '입니다',
            }),
          ],
        }),
        S.jsx('div', { className: aa.line }),
        S.jsxs('div', {
          className: aa.callPublic,
          children: [
            S.jsx(te, {
              size: 'sm',
              weight: 'semiBold',
              style: { color: 'gray' },
              children: '공공기관 연락처',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '제주도청 | 064-120 (유료 07시~22시, 연중무휴)',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              style: { margin: '0px 0px 20px 52px' },
              children: '| 064-710-2222 (야간/공휴일 전환)',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '제주지방해양경찰서 | 064-801-2000',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '제주시 해양경찰서 | 064-766-2000',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '서귀포시 해양경찰서 | 064-793-2000',
            }),
          ],
        }),
        S.jsxs('div', {
          className: aa.callVillage,
          children: [
            S.jsx(te, {
              size: 'sm',
              weight: 'semiBold',
              style: { color: 'gray' },
              children: '어촌계 연락처',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '구엄 | 064-720-3106',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '고내 | 064-720-3106',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '애월 | 064-720-3106',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: '수원 | 064-795-0514',
            }),
          ],
        }),
        S.jsxs('div', {
          className: aa.appLaunch,
          children: [
            S.jsx(te, {
              size: 'sm',
              weight: 'semiBold',
              style: { color: 'gray' },
              children: '해루핸 출시일',
            }),
            S.jsx(te, { size: 'sm', color: 'gray', children: '2025.08.18' }),
          ],
        }),
        S.jsxs('div', {
          children: [
            S.jsx(te, {
              size: 'sm',
              weight: 'semiBold',
              style: { color: 'gray' },
              children: '해루핸 문의',
            }),
            S.jsx(te, {
              size: 'sm',
              color: 'gray',
              children: 'ssafy@ssafy.com',
            }),
          ],
        }),
      ],
    });
function XC(n, s = 'main-map') {
  const i = z.useRef(null),
    o = z.useRef([]),
    c = z.useRef(null),
    f = z.useRef(null),
    h = z.useRef(null),
    [m, g] = z.useState(!1),
    [d, v] = z.useState(!1),
    p = z.useCallback(() => {
      h.current && (clearTimeout(h.current), (h.current = null)),
        f.current && (f.current.setMap(null), (f.current = null));
    }, []),
    b = z.useCallback(() => {
      c.current && (c.current.setMap(null), (c.current = null));
    }, []);
  z.useEffect(() => {
    if (!d || !i.current) return;
    const L = () => b();
    return (
      window.kakao.maps.event.addListener(i.current, 'click', L),
      () => {
        window.kakao.maps.event.removeListener(i.current, 'click', L);
      }
    );
  }, [d, b]);
  const T = z.useCallback(
      (L) => {
        if (!i.current) return;
        const U = `
        <div class="search-overlay-message">
          ${L}
        </div>
      `,
          G = new window.kakao.maps.CustomOverlay({
            content: U,
            map: i.current,
            position: i.current.getCenter(),
            yAnchor: 0.5,
            xAnchor: 0.5,
            zIndex: 99,
          });
        (f.current = G),
          (h.current = setTimeout(() => {
            p();
          }, 2e3));
      },
      [p]
    ),
    w = z.useCallback(
      (L) => {
        const U = new window.kakao.maps.Marker({
            map: i.current,
            position: new window.kakao.maps.LatLng(L.y, L.x),
          }),
          G = `
        <div class="marker-info-overlay">
        <strong style="font-size:16px;">${L.place_name || ''}</strong><br/>
        ${L.road_address_name ? `<span>${L.road_address_name}</span><br/>` : ''}
        <span>${L.address_name || ''}</span><br/>
        ${L.phone ? `<span>${L.phone}</span>` : ''}
        </div>
      `;
        window.kakao.maps.event.addListener(U, 'click', function () {
          b();
          const I = new window.kakao.maps.CustomOverlay({
            content: G,
            map: i.current,
            position: new window.kakao.maps.LatLng(L.y, L.x),
            yAnchor: 1,
            zIndex: 2,
          });
          c.current = I;
        }),
          o.current.push(U);
      },
      [b]
    ),
    E = z.useCallback(() => {
      o.current.forEach((L) => L.setMap(null)), (o.current = []);
    }, []),
    M = z.useCallback(
      (L) => {
        if (!d || !i.current) return;
        b(), p();
        const U = new window.kakao.maps.services.Places(),
          I = { location: i.current.getCenter(), radius: 2e3 };
        g(!0),
          U.categorySearch(
            L,
            (Z, Y) => {
              if ((g(!1), Y === window.kakao.maps.services.Status.OK)) {
                E(), Z.forEach((X) => w(X));
                const K = new window.kakao.maps.LatLngBounds();
                Z.forEach((X) =>
                  K.extend(new window.kakao.maps.LatLng(X.y, X.x))
                ),
                  i.current.setBounds(K);
              } else
                Y === window.kakao.maps.services.Status.ZERO_RESULT
                  ? (E(), T('검색 결과가 없습니다'))
                  : console.error('검색 실패', Y);
            },
            I
          );
      },
      [d, E, w]
    ),
    O = z.useCallback(
      (L) => {
        if (!d || !i.current) return;
        b(), p();
        const U = new window.kakao.maps.services.Places(),
          I = { location: i.current.getCenter(), radius: 2e3 };
        g(!0),
          U.keywordSearch(
            L,
            (Z, Y) => {
              if ((g(!1), Y === window.kakao.maps.services.Status.OK)) {
                E(), Z.forEach((X) => w(X));
                const K = new window.kakao.maps.LatLngBounds();
                Z.forEach((X) => {
                  K.extend(new window.kakao.maps.LatLng(X.y, X.x));
                }),
                  i.current.setBounds(K);
              } else
                Y === window.kakao.maps.services.Status.ZERO_RESULT
                  ? (E(), T('검색 결과가 없습니다'))
                  : console.error('키워드 검색 실패', Y);
            },
            I
          );
      },
      [d, E, w]
    );
  return (
    z.useEffect(() => {
      if (!n) return;
      if (window.kakao && window.kakao.maps) {
        U();
        return;
      }
      const L = document.createElement('script');
      (L.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=e0bdd2802078f55b46ab9c2abc457170&libraries=services&autoload=false'),
        (L.async = !0),
        (L.onload = () => {
          window.kakao.maps.load(() => {
            U();
          });
        }),
        document.head.appendChild(L);
      function U() {
        const G = document.getElementById(s);
        if (!G) {
          console.error(`Map container (${s})를 찾을 수 없습니다.`);
          return;
        }
        const I = {
            center: new window.kakao.maps.LatLng(
              n?.latitude || 33.4996,
              n?.longitude || 126.5312
            ),
            level: 4,
            draggable: !0,
          },
          Z = new window.kakao.maps.Map(G, I);
        (i.current = Z), v(!0);
      }
    }, [n, s]),
    {
      map: i,
      loading: m,
      isSdkLoaded: d,
      searchConvenienceStore: () => M('CS2'),
      searchParkingLot: () => M('PK6'),
      searchToilet: () => O('화장실'),
    }
  );
}
const WC = () => {
    const n = St(),
      [s, i] = z.useState(null),
      [o, c] = z.useState([]),
      [f, h] = z.useState(null),
      [m, g] = z.useState(!1),
      [d, v] = z.useState(null),
      { data: p, isLoading: b, error: T } = sC('DT_0004'),
      { data: w, isLoading: E, error: M } = Jf('L1090700', 0, 20),
      [O, L] = z.useState(!1),
      U = () => L(!0),
      G = () => L(!1);
    z.useEffect(() => {
      const C = localStorage.getItem('selectedLocation');
      if (C)
        try {
          const ae = JSON.parse(C);
          i(ae);
        } catch (ae) {
          console.error('저장된 지역 정보를 파싱할 수 없습니다:', ae),
            i({ id: 'aewol', name: '애월', displayName: '애월3리 어촌계' });
        }
      else i({ id: 'aewol', name: '애월', displayName: '애월3리 어촌계' });
      const V = localStorage.getItem('weatherData');
      if (V)
        try {
          const ae = JSON.parse(V);
          c(ae);
        } catch (ae) {
          console.error('저장된 날씨 데이터를 파싱할 수 없습니다:', ae);
        }
      const W = localStorage.getItem('selectedFishery');
      if (W)
        try {
          const ae = JSON.parse(W);
          h(ae);
        } catch (ae) {
          console.error('저장된 어장 데이터를 파싱할 수 없습니다:', ae);
        }
    }, []),
      z.useEffect(() => {
        if (!w?.data?.content || w.data.content.length === 0) {
          g(!1);
          return;
        }
        const C = w.data.content[0];
        if (!C || !C.warningType || !C.warningLevel || !C.announcedAt) {
          g(!1);
          return;
        }
        const V = `${C.warningType}${C.warningLevel}_${
            Array.isArray(C.announcedAt)
              ? C.announcedAt.join('_')
              : C.announcedAt
          }`,
          W = localStorage.getItem('lastCheckedWarning');
        g(W !== V);
      }, [w]);
    const I = () => {
        if (w?.data?.content && w.data.content.length > 0) {
          const C = w.data.content[0];
          if (C && C.warningType && C.warningLevel && C.announcedAt) {
            const V = `${C.warningType}${C.warningLevel}_${
              Array.isArray(C.announcedAt)
                ? C.announcedAt.join('_')
                : C.announcedAt
            }`;
            localStorage.setItem('lastCheckedWarning', V), g(!1);
          }
        }
        n({ to: '/weather' });
      },
      {
        searchConvenienceStore: Z,
        searchParkingLot: Y,
        searchToilet: K,
      } = XC(f),
      X = (C, V) => {
        v(C), V();
      },
      F = z.useMemo(() => {
        if (!o || o.length === 0) return '22.7℃';
        const W = new Date().getHours() < 12 ? '오전' : '오후',
          ae = o.find((R) => R.forecastTimePeriod === W);
        return ae ? `${ae.averageWaterTemperature}℃` : '22.7℃';
      }, [o]),
      ne = z.useMemo(() => {
        if (!w?.data?.content || w.data.content.length === 0) return null;
        const C = ed(w);
        return C.length > 0 ? C[0] : null;
      }, [w]),
      oe = () => {
        n({ to: '/buddy' });
      },
      me = () => {
        n({ to: '/photo' });
      },
      Se = () => {
        localStorage.removeItem('selectedLocation'),
          localStorage.removeItem('selectedFishery'),
          localStorage.removeItem('currentWeather'),
          localStorage.removeItem('weatherData'),
          n({ to: '/map' });
      },
      be = p?.data
        ? `${Ty(p.data.fishingStartTime)} ~ ${Ty(p.data.fishingEndTime)}`
        : T
        ? '준비중'
        : '09:10 ~ 11:00';
    return S.jsxs('div', {
      className: De.container,
      children: [
        S.jsxs('div', {
          className: De.fixedContent,
          children: [
            S.jsxs('div', {
              className: De.header,
              children: [
                S.jsx('img', {
                  src: '/haeruhand_logo.svg',
                  alt: '해루핸 로고',
                  className: De.logo,
                }),
                S.jsxs('button', {
                  className: De.bellButton,
                  onClick: I,
                  children: [
                    S.jsx('img', {
                      src: '/bell.svg',
                      alt: '특보 조회',
                      className: De.bellIcon,
                    }),
                    m && S.jsx('div', { className: De.bellMarker }),
                  ],
                }),
              ],
            }),
            S.jsxs('div', {
              className: De.backButtonContainer,
              children: [
                S.jsx('button', {
                  className: De.backButton,
                  onClick: Se,
                  children: S.jsx('img', {
                    src: '/backButton.svg',
                    alt: '뒤로가기',
                    className: De.backButtonIcon,
                  }),
                }),
                S.jsx(te, {
                  size: 'xl',
                  weight: 'bold',
                  color: 'dark',
                  children: s?.displayName || '애월3리 어촌계',
                }),
              ],
            }),
          ],
        }),
        S.jsxs('div', {
          className: De.scrollContent,
          children: [
            S.jsxs('div', {
              className: De.notFooter,
              children: [
                S.jsx('div', {
                  className: De.warningBanner,
                  onClick: I,
                  children: E
                    ? S.jsx(Ba, {})
                    : M
                    ? S.jsx(An, {
                        type: '폭염주의보',
                        date: '특보 정보를 불러올 수 없습니다',
                        location: '',
                        variant: 'info',
                        suffix: '',
                      })
                    : ne
                    ? S.jsx(An, {
                        type: ne.type,
                        date: ne.date,
                        location: ne.location,
                        variant: 'latest',
                        suffix: '발효',
                      })
                    : S.jsx(An, {
                        type: '폭염주의보',
                        date: '현재 발효 중인 특보가 없습니다',
                        location: '',
                        variant: 'info',
                        suffix: '',
                      }),
                }),
                S.jsx('div', {
                  className: De.weatherWidgets,
                  children: b
                    ? S.jsxs(S.Fragment, {
                        children: [S.jsx(Zo, {}), S.jsx(Zo, {})],
                      })
                    : S.jsx(nv, {
                        items: [
                          {
                            icon: S.jsx('img', {
                              src: '/wave.svg',
                              alt: '파도 아이콘',
                              style: { width: '24px', height: '24px' },
                            }),
                            subtitle: '해루 가능 시간',
                            data: be,
                          },
                          {
                            icon: S.jsx('img', {
                              src: '/seaTemp.svg',
                              alt: '수온 아이콘',
                              style: { width: '24px', height: '24px' },
                            }),
                            subtitle: '현재 수온',
                            data: F,
                          },
                        ],
                      }),
                }),
                S.jsx('div', {
                  className: De.mapContainer,
                  children: f
                    ? S.jsxs('div', {
                        className: De.map,
                        children: [
                          S.jsx('div', {
                            id: 'main-map',
                            className: De.kakaoMap,
                          }),
                          S.jsxs('div', {
                            className: De.categorySearch,
                            children: [
                              S.jsx('button', {
                                className: De.categoryButton,
                                onClick: () => X('convenienceStore', Z),
                                children: S.jsxs(Ho, {
                                  variant:
                                    d === 'convenienceStore'
                                      ? 'primary'
                                      : 'neutral',
                                  size: 'medium',
                                  style: { borderRadius: '100px' },
                                  children: [
                                    S.jsx('img', {
                                      src: '/convenienceStoreIcon.svg',
                                      alt: '편의점',
                                      className: De.badgeIcon,
                                    }),
                                    '편의점',
                                  ],
                                }),
                              }),
                              S.jsx('button', {
                                className: De.categoryButton,
                                onClick: () => X('parkingLot', Y),
                                children: S.jsxs(Ho, {
                                  variant:
                                    d === 'parkingLot' ? 'primary' : 'neutral',
                                  size: 'medium',
                                  style: { borderRadius: '100px' },
                                  children: [
                                    S.jsx('img', {
                                      src: '/parkingIcon.svg',
                                      alt: '주차장',
                                      className: De.badgeIcon,
                                    }),
                                    '주차장',
                                  ],
                                }),
                              }),
                              S.jsx('button', {
                                className: De.categoryButton,
                                onClick: () => X('toilet', K),
                                children: S.jsxs(Ho, {
                                  variant:
                                    d === 'toilet' ? 'primary' : 'neutral',
                                  size: 'medium',
                                  style: { borderRadius: '100px' },
                                  children: [
                                    S.jsx('img', {
                                      src: '/toiletIcon.svg',
                                      alt: '화장실',
                                      className: De.badgeIcon,
                                    }),
                                    '화장실',
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      })
                    : S.jsx(G2, {}),
                }),
                S.jsx('div', {
                  className: De.harvestButton,
                  children: b ? S.jsx(V2, {}) : S.jsx(ew, { onClick: me }),
                }),
                S.jsx('div', {
                  className: De.buttons,
                  children: b
                    ? S.jsx(Q2, {})
                    : S.jsxs(S.Fragment, {
                        children: [
                          S.jsx(vw, { onClick: U }),
                          S.jsx(rw, { onClick: oe }),
                        ],
                      }),
                }),
                O && S.jsx(HC, { onClose: G }),
              ],
            }),
            S.jsx('footer', { children: S.jsx(YC, {}) }),
          ],
        }),
      ],
    });
  },
  ZC = '_container_16gv7_1',
  JC = '_content_16gv7_19',
  eA = '_text_16gv7_35',
  tA = '_logo_16gv7_47',
  nA = '_loginSection_16gv7_57',
  Hs = { container: ZC, content: JC, text: eA, logo: tA, loginSection: nA },
  aA = () => {
    const n = pr({ from: '/login' }),
      { loginWithKakao: s, isLoading: i } = Uv(),
      { isAuthenticated: o } = Zs(),
      c = St(),
      f = z.useRef(!1),
      h = sessionStorage.getItem('pendingDeepLink'),
      m = !!h;
    z.useEffect(() => {
      if (o()) {
        if ((console.log('이미 로그인된 사용자'), m))
          try {
            const d = JSON.parse(h),
              { code: v, token: p, url: b } = d;
            sessionStorage.setItem(
              'locationRoom',
              JSON.stringify({
                roomId: null,
                roomCode: v,
                deepLink: b,
                joinToken: p,
              })
            ),
              sessionStorage.setItem('isLocationRoomHost', 'false'),
              sessionStorage.removeItem('hostRoomCode'),
              sessionStorage.removeItem('pendingDeepLink'),
              c({ to: '/buddy' });
          } catch (d) {
            console.error('딥링크 처리 실패:', d), c({ to: '/map' });
          }
        else c({ to: '/map' });
        return;
      }
      n.code &&
        !f.current &&
        ((f.current = !0),
        console.log('카카오 인증 코드 처리 시작:', n.code),
        s(n.code));
    }, [n.code, o, c, s]);
    const g = () => {
      console.log('카카오 로그인 시작...');
      const d =
        'https://kauth.kakao.com/oauth/authorize?client_id=434231d018b4c369436c39181c2be5e3&redirect_uri=https://haeruhand.o-r.kr/login&response_type=code';
      console.log('카카오 로그인 URL:', d), (window.location.href = d);
    };
    return o()
      ? S.jsx('div', { children: '해루핸으로 들어가는 중...' })
      : S.jsxs('div', {
          className: Hs.container,
          children: [
            S.jsxs('div', {
              className: Hs.content,
              children: [
                S.jsx(te, {
                  size: 'sm',
                  color: 'gray',
                  className: Hs.text,
                  children: m
                    ? '친구와 함께 해루질을 시작하려면 로그인이 필요합니다'
                    : '즐겁고 안전한 해루질을 위한 스마트 가이드',
                }),
                S.jsx('img', {
                  src: '/haeruhand_logo.svg',
                  alt: '해루핸 로고',
                  className: Hs.logo,
                }),
              ],
            }),
            S.jsxs('div', {
              className: Hs.loginSection,
              children: [
                S.jsx(fa, {
                  variant: 'kakao',
                  size: 'large',
                  onClick: g,
                  disabled: i,
                  children: i ? '로그인 중...' : '카카오로 시작하기',
                }),
                S.jsx('div', {
                  className: Hs.terms,
                  children: S.jsxs(te, {
                    size: 'xs',
                    color: 'gray',
                    align: 'center',
                    children: [
                      '로그인 시',
                      ' ',
                      S.jsx('span', {
                        style: {
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        },
                        children: '서비스 이용약관',
                      }),
                      '과',
                      ' ',
                      S.jsx('span', {
                        style: {
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        },
                        children: '개인정보 처리방침',
                      }),
                      '에 동의하게 됩니다.',
                    ],
                  }),
                }),
              ],
            }),
          ],
        });
  },
  sA = '_container_l0whs_1',
  iA = '_content_l0whs_21',
  rA = '_logo_l0whs_37',
  oA = '_loadingSpinner_l0whs_49',
  sa = { container: sA, content: iA, logo: rA, loadingSpinner: oA };
function lA() {
  const n = St(),
    [s, i] = z.useState(!1),
    { isAuthenticated: o } = Zs();
  return (
    z.useEffect(() => {
      const c = new URLSearchParams(location.search),
        f = c.get('code'),
        h = c.get('token');
      if (!f || !h) {
        console.error('필수 파라미터가 없습니다:', { roomCode: f, token: h }),
          n({ to: '/main' });
        return;
      }
      const m = o(),
        g = () => {
          if (m) {
            const p = `https://haeruhand.o-r.kr/join?code=${f}&token=${h}`;
            sessionStorage.setItem(
              'locationRoom',
              JSON.stringify({
                roomId: null,
                roomCode: f,
                deepLink: p,
                joinToken: h,
              })
            ),
              sessionStorage.setItem('isLocationRoomHost', 'false'),
              sessionStorage.removeItem('hostRoomCode'),
              n({ to: '/buddy' });
          } else
            sessionStorage.setItem(
              'pendingDeepLink',
              JSON.stringify({
                url: `https://haeruhand.o-r.kr/join?code=${f}&token=${h}`,
                code: f,
                token: h,
                timestamp: Date.now(),
              })
            ),
              n({ to: '/login' });
        },
        d = /Android|iPhone/i.test(navigator.userAgent),
        v = window.Capacitor !== void 0;
      if (d && !v) {
        i(!0);
        const p = `seafeet://join?code=${f}&token=${encodeURIComponent(h)}`,
          b = Date.now();
        (window.location.href = p),
          setTimeout(() => {
            !document.hidden &&
              Date.now() - b > 1900 &&
              (console.log('앱이 설치되지 않음 - 웹에서 처리'), i(!1), g());
          }, 2e3);
      } else g();
    }, [n, o]),
    s
      ? S.jsx('div', {
          className: sa.container,
          children: S.jsxs('div', {
            className: sa.content,
            children: [
              S.jsx('img', {
                src: '/haeruhand_logo.svg',
                alt: '해루핸 로고',
                className: sa.logo,
              }),
              S.jsx('div', { className: sa.loadingSpinner }),
              S.jsx(te, {
                size: 'lg',
                align: 'center',
                children: '해루핸 앱으로 이동 중...',
              }),
              S.jsx(te, {
                size: 'sm',
                color: 'gray',
                align: 'center',
                children: '앱이 설치되어 있지 않다면 잠시 후 웹에서 계속됩니다',
              }),
            ],
          }),
        })
      : S.jsx('div', {
          className: sa.container,
          children: S.jsxs('div', {
            className: sa.content,
            children: [
              S.jsx('img', {
                src: '/haeruhand_logo.svg',
                alt: '해루핸 로고',
                className: sa.logo,
              }),
              S.jsx('div', { className: sa.loadingSpinner }),
              S.jsx(te, {
                size: 'lg',
                align: 'center',
                children: '방에 참여하는 중...',
              }),
              S.jsx(te, {
                size: 'sm',
                color: 'gray',
                align: 'center',
                children: '잠시만 기다려주세요',
              }),
            ],
          }),
        })
  );
}
const ln = w_(),
  cA = on({ getParentRoute: () => ln, path: '/', component: B_ }),
  uA = on({ getParentRoute: () => ln, path: '/weather', component: px }),
  fA = on({ getParentRoute: () => ln, path: '/photo', component: Gx }),
  dA = on({ getParentRoute: () => ln, path: '/share', component: SR }),
  hA = on({ getParentRoute: () => ln, path: '/map', component: PR }),
  gA = on({ getParentRoute: () => ln, path: '/buddy', component: nC }),
  mA = on({ getParentRoute: () => ln, path: '/main', component: WC }),
  pA = on({ getParentRoute: () => ln, path: '/login', component: aA }),
  yA = on({ getParentRoute: () => ln, path: '/join', component: lA }),
  vA = ln.addChildren([cA, uA, fA, dA, hA, gA, mA, pA, yA]),
  Po = D_({ routeTree: vA });
/*! Capacitor: https://capacitorjs.com/ - MIT License */ var Ys;
(function (n) {
  (n.Unimplemented = 'UNIMPLEMENTED'), (n.Unavailable = 'UNAVAILABLE');
})(Ys || (Ys = {}));
class cf extends Error {
  constructor(s, i, o) {
    super(s), (this.message = s), (this.code = i), (this.data = o);
  }
}
const SA = (n) => {
    var s, i;
    return n?.androidBridge
      ? 'android'
      : !(
          (i =
            (s = n?.webkit) === null || s === void 0
              ? void 0
              : s.messageHandlers) === null || i === void 0
        ) && i.bridge
      ? 'ios'
      : 'web';
  },
  bA = (n) => {
    const s = n.CapacitorCustomPlatform || null,
      i = n.Capacitor || {},
      o = (i.Plugins = i.Plugins || {}),
      c = () => (s !== null ? s.name : SA(n)),
      f = () => c() !== 'web',
      h = (p) => {
        const b = d.get(p);
        return !!(b?.platforms.has(c()) || m(p));
      },
      m = (p) => {
        var b;
        return (b = i.PluginHeaders) === null || b === void 0
          ? void 0
          : b.find((T) => T.name === p);
      },
      g = (p) => n.console.error(p),
      d = new Map(),
      v = (p, b = {}) => {
        const T = d.get(p);
        if (T)
          return (
            console.warn(
              `Capacitor plugin "${p}" already registered. Cannot register plugins twice.`
            ),
            T.proxy
          );
        const w = c(),
          E = m(p);
        let M;
        const O = async () => (
            !M && w in b
              ? (M =
                  typeof b[w] == 'function' ? (M = await b[w]()) : (M = b[w]))
              : s !== null &&
                !M &&
                'web' in b &&
                (M =
                  typeof b.web == 'function'
                    ? (M = await b.web())
                    : (M = b.web)),
            M
          ),
          L = (K, X) => {
            var F, ne;
            if (E) {
              const oe = E?.methods.find((me) => X === me.name);
              if (oe)
                return oe.rtype === 'promise'
                  ? (me) => i.nativePromise(p, X.toString(), me)
                  : (me, Se) => i.nativeCallback(p, X.toString(), me, Se);
              if (K)
                return (F = K[X]) === null || F === void 0 ? void 0 : F.bind(K);
            } else {
              if (K)
                return (ne = K[X]) === null || ne === void 0
                  ? void 0
                  : ne.bind(K);
              throw new cf(
                `"${p}" plugin is not implemented on ${w}`,
                Ys.Unimplemented
              );
            }
          },
          U = (K) => {
            let X;
            const F = (...ne) => {
              const oe = O().then((me) => {
                const Se = L(me, K);
                if (Se) {
                  const be = Se(...ne);
                  return (X = be?.remove), be;
                } else
                  throw new cf(
                    `"${p}.${K}()" is not implemented on ${w}`,
                    Ys.Unimplemented
                  );
              });
              return K === 'addListener' && (oe.remove = async () => X()), oe;
            };
            return (
              (F.toString = () => `${K.toString()}() { [capacitor code] }`),
              Object.defineProperty(F, 'name', {
                value: K,
                writable: !1,
                configurable: !1,
              }),
              F
            );
          },
          G = U('addListener'),
          I = U('removeListener'),
          Z = (K, X) => {
            const F = G({ eventName: K }, X),
              ne = async () => {
                const me = await F;
                I({ eventName: K, callbackId: me }, X);
              },
              oe = new Promise((me) => F.then(() => me({ remove: ne })));
            return (
              (oe.remove = async () => {
                console.warn(
                  "Using addListener() without 'await' is deprecated."
                ),
                  await ne();
              }),
              oe
            );
          },
          Y = new Proxy(
            {},
            {
              get(K, X) {
                switch (X) {
                  case '$$typeof':
                    return;
                  case 'toJSON':
                    return () => ({});
                  case 'addListener':
                    return E ? Z : G;
                  case 'removeListener':
                    return I;
                  default:
                    return U(X);
                }
              },
            }
          );
        return (
          (o[p] = Y),
          d.set(p, {
            name: p,
            proxy: Y,
            platforms: new Set([...Object.keys(b), ...(E ? [w] : [])]),
          }),
          Y
        );
      };
    return (
      i.convertFileSrc || (i.convertFileSrc = (p) => p),
      (i.getPlatform = c),
      (i.handleError = g),
      (i.isNativePlatform = f),
      (i.isPluginAvailable = h),
      (i.registerPlugin = v),
      (i.Exception = cf),
      (i.DEBUG = !!i.DEBUG),
      (i.isLoggingEnabled = !!i.isLoggingEnabled),
      i
    );
  },
  _A = (n) => (n.Capacitor = bA(n)),
  Mf = _A(
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {}
  ),
  nd = Mf.registerPlugin;
class Kv {
  constructor() {
    (this.listeners = {}),
      (this.retainedEventArguments = {}),
      (this.windowListeners = {});
  }
  addListener(s, i) {
    let o = !1;
    this.listeners[s] || ((this.listeners[s] = []), (o = !0)),
      this.listeners[s].push(i);
    const f = this.windowListeners[s];
    f && !f.registered && this.addWindowListener(f),
      o && this.sendRetainedArgumentsForEvent(s);
    const h = async () => this.removeListener(s, i);
    return Promise.resolve({ remove: h });
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const s in this.windowListeners)
      this.removeWindowListener(this.windowListeners[s]);
    this.windowListeners = {};
  }
  notifyListeners(s, i, o) {
    const c = this.listeners[s];
    if (!c) {
      if (o) {
        let f = this.retainedEventArguments[s];
        f || (f = []), f.push(i), (this.retainedEventArguments[s] = f);
      }
      return;
    }
    c.forEach((f) => f(i));
  }
  hasListeners(s) {
    var i;
    return !!(!((i = this.listeners[s]) === null || i === void 0) && i.length);
  }
  registerWindowListener(s, i) {
    this.windowListeners[i] = {
      registered: !1,
      windowEventName: s,
      pluginEventName: i,
      handler: (o) => {
        this.notifyListeners(i, o);
      },
    };
  }
  unimplemented(s = 'not implemented') {
    return new Mf.Exception(s, Ys.Unimplemented);
  }
  unavailable(s = 'not available') {
    return new Mf.Exception(s, Ys.Unavailable);
  }
  async removeListener(s, i) {
    const o = this.listeners[s];
    if (!o) return;
    const c = o.indexOf(i);
    this.listeners[s].splice(c, 1),
      this.listeners[s].length ||
        this.removeWindowListener(this.windowListeners[s]);
  }
  addWindowListener(s) {
    window.addEventListener(s.windowEventName, s.handler), (s.registered = !0);
  }
  removeWindowListener(s) {
    s &&
      (window.removeEventListener(s.windowEventName, s.handler),
      (s.registered = !1));
  }
  sendRetainedArgumentsForEvent(s) {
    const i = this.retainedEventArguments[s];
    i &&
      (delete this.retainedEventArguments[s],
      i.forEach((o) => {
        this.notifyListeners(s, o);
      }));
  }
}
const Ey = (n) =>
    encodeURIComponent(n)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape),
  xy = (n) => n.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class wA extends Kv {
  async getCookies() {
    const s = document.cookie,
      i = {};
    return (
      s.split(';').forEach((o) => {
        if (o.length <= 0) return;
        let [c, f] = o.replace(/=/, 'CAP_COOKIE').split('CAP_COOKIE');
        (c = xy(c).trim()), (f = xy(f).trim()), (i[c] = f);
      }),
      i
    );
  }
  async setCookie(s) {
    try {
      const i = Ey(s.key),
        o = Ey(s.value),
        c = `; expires=${(s.expires || '').replace('expires=', '')}`,
        f = (s.path || '/').replace('path=', ''),
        h = s.url != null && s.url.length > 0 ? `domain=${s.url}` : '';
      document.cookie = `${i}=${o || ''}${c}; path=${f}; ${h};`;
    } catch (i) {
      return Promise.reject(i);
    }
  }
  async deleteCookie(s) {
    try {
      document.cookie = `${s.key}=; Max-Age=0`;
    } catch (i) {
      return Promise.reject(i);
    }
  }
  async clearCookies() {
    try {
      const s = document.cookie.split(';') || [];
      for (const i of s)
        document.cookie = i
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    } catch (s) {
      return Promise.reject(s);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (s) {
      return Promise.reject(s);
    }
  }
}
nd('CapacitorCookies', { web: () => new wA() });
const TA = async (n) =>
    new Promise((s, i) => {
      const o = new FileReader();
      (o.onload = () => {
        const c = o.result;
        s(c.indexOf(',') >= 0 ? c.split(',')[1] : c);
      }),
        (o.onerror = (c) => i(c)),
        o.readAsDataURL(n);
    }),
  EA = (n = {}) => {
    const s = Object.keys(n);
    return Object.keys(n)
      .map((c) => c.toLocaleLowerCase())
      .reduce((c, f, h) => ((c[f] = n[s[h]]), c), {});
  },
  xA = (n, s = !0) =>
    n
      ? Object.entries(n)
          .reduce((o, c) => {
            const [f, h] = c;
            let m, g;
            return (
              Array.isArray(h)
                ? ((g = ''),
                  h.forEach((d) => {
                    (m = s ? encodeURIComponent(d) : d), (g += `${f}=${m}&`);
                  }),
                  g.slice(0, -1))
                : ((m = s ? encodeURIComponent(h) : h), (g = `${f}=${m}`)),
              `${o}&${g}`
            );
          }, '')
          .substr(1)
      : null,
  RA = (n, s = {}) => {
    const i = Object.assign(
        { method: n.method || 'GET', headers: n.headers },
        s
      ),
      c = EA(n.headers)['content-type'] || '';
    if (typeof n.data == 'string') i.body = n.data;
    else if (c.includes('application/x-www-form-urlencoded')) {
      const f = new URLSearchParams();
      for (const [h, m] of Object.entries(n.data || {})) f.set(h, m);
      i.body = f.toString();
    } else if (
      c.includes('multipart/form-data') ||
      n.data instanceof FormData
    ) {
      const f = new FormData();
      if (n.data instanceof FormData)
        n.data.forEach((m, g) => {
          f.append(g, m);
        });
      else for (const m of Object.keys(n.data)) f.append(m, n.data[m]);
      i.body = f;
      const h = new Headers(i.headers);
      h.delete('content-type'), (i.headers = h);
    } else
      (c.includes('application/json') || typeof n.data == 'object') &&
        (i.body = JSON.stringify(n.data));
    return i;
  };
class CA extends Kv {
  async request(s) {
    const i = RA(s, s.webFetchExtra),
      o = xA(s.params, s.shouldEncodeUrlParams),
      c = o ? `${s.url}?${o}` : s.url,
      f = await fetch(c, i),
      h = f.headers.get('content-type') || '';
    let { responseType: m = 'text' } = f.ok ? s : {};
    h.includes('application/json') && (m = 'json');
    let g, d;
    switch (m) {
      case 'arraybuffer':
      case 'blob':
        (d = await f.blob()), (g = await TA(d));
        break;
      case 'json':
        g = await f.json();
        break;
      case 'document':
      case 'text':
      default:
        g = await f.text();
    }
    const v = {};
    return (
      f.headers.forEach((p, b) => {
        v[b] = p;
      }),
      { data: g, headers: v, status: f.status, url: f.url }
    );
  }
  async get(s) {
    return this.request(Object.assign(Object.assign({}, s), { method: 'GET' }));
  }
  async post(s) {
    return this.request(
      Object.assign(Object.assign({}, s), { method: 'POST' })
    );
  }
  async put(s) {
    return this.request(Object.assign(Object.assign({}, s), { method: 'PUT' }));
  }
  async patch(s) {
    return this.request(
      Object.assign(Object.assign({}, s), { method: 'PATCH' })
    );
  }
  async delete(s) {
    return this.request(
      Object.assign(Object.assign({}, s), { method: 'DELETE' })
    );
  }
}
nd('CapacitorHttp', { web: () => new CA() });
const AA = nd('App', {
    web: () =>
      JS(() => import('./web-C89TFsD-.js'), []).then((n) => new n.AppWeb()),
  }),
  MA = new LS({
    defaultOptions: {
      queries: { retry: 1, refetchOnWindowFocus: !1 },
      mutations: { retry: 1 },
    },
  });
window.Capacitor &&
  AA.addListener('appUrlOpen', ({ url: n }) => {
    console.log('App opened with URL:', n);
    try {
      if (n.includes('seafeet://join') || n.includes('/join?')) {
        const i = new URL(n),
          o = i.searchParams.get('code'),
          c = i.searchParams.get('token');
        if (o && c) {
          sessionStorage.setItem(
            'pendingDeepLink',
            JSON.stringify({ url: n, code: o, token: c, timestamp: Date.now() })
          );
          const f =
              sessionStorage.getItem('accessToken') ||
              localStorage.getItem('accessToken'),
            h =
              sessionStorage.getItem('userInfo') ||
              localStorage.getItem('userInfo');
          f && h
            ? (sessionStorage.setItem(
                'locationRoom',
                JSON.stringify({
                  roomId: null,
                  roomCode: o,
                  deepLink: n,
                  joinToken: c,
                })
              ),
              sessionStorage.setItem('isLocationRoomHost', 'false'),
              sessionStorage.removeItem('hostRoomCode'),
              sessionStorage.removeItem('pendingDeepLink'),
              Po.navigate({ to: '/buddy' }))
            : Po.navigate({ to: '/login' });
        }
      }
      const s = new URL(n);
      if (s.hostname === 'oauth' && s.pathname === '/callback') {
        const i = s.searchParams.get('accessToken'),
          o = s.searchParams.get('refreshToken'),
          c = s.searchParams.get('memberId');
        i &&
          o &&
          (sessionStorage.setItem('accessToken', i),
          sessionStorage.setItem('refreshToken', o),
          c && sessionStorage.setItem('memberId', c),
          Po.navigate({ to: '/main' }));
      }
    } catch (s) {
      console.error('딥링크 처리 오류:', s);
    }
  });
vS.createRoot(document.getElementById('root')).render(
  S.jsx(z.StrictMode, {
    children: S.jsxs(IS, {
      client: MA,
      children: [S.jsx(j_, { router: Po }), S.jsx(eb, { initialIsOpen: !1 })],
    }),
  })
);
export { Kv as W };
