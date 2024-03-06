import './style.css';
import { getCurrentInstance as Di, defineComponent as $n, inject as _i, ref as O, computed as Ut, watch as N, onBeforeUnmount as Bn, onMounted as Ln, useSlots as Pi, openBlock as Ne, createElementBlock as je, normalizeClass as un, normalizeStyle as Xe, renderSlot as Wn, createCommentVNode as Oi, provide as ki, onBeforeMount as Ai, nextTick as Tt, withDirectives as Ri, createVNode as Hi, vShow as $i } from "vue";
function Bi(e) {
  let t = 0, n;
  for (let i = 0, o = e.length; i < o; i++)
    n = e[i].y + e[i].h, n > t && (t = n);
  return t;
}
function Ye(e) {
  const t = Array(e.length);
  for (let n = 0, i = e.length; n < i; n++)
    t[n] = Li(e[n]);
  return t;
}
function Li(e) {
  return JSON.parse(JSON.stringify(e));
}
function Fn(e, t) {
  return !(e === t || e.x + e.w <= t.x || e.x >= t.x + t.w || e.y + e.h <= t.y || e.y >= t.y + t.h);
}
function Kt(e, t, n) {
  const i = jn(e), o = Xn(e), r = Array(e.length);
  for (let a = 0, s = o.length; a < s; a++) {
    let c = o[a];
    c.static || (c = Wi(i, c, t, n), i.push(c)), r[e.indexOf(c)] = c, c.moved = !1;
  }
  return r;
}
function Wi(e, t, n, i) {
  if (n)
    for (; t.y > 0 && !se(e, t); )
      t.y--;
  else if (i) {
    const r = i[t.i].y;
    for (; t.y > r && !se(e, t); )
      t.y--;
  }
  let o;
  for (; o = se(e, t); )
    t.y = o.y + o.h;
  return t;
}
function Fi(e, t) {
  const n = jn(e);
  for (let i = 0, o = e.length; i < o; i++) {
    const r = e[i];
    if (r.x + r.w > t.cols && (r.x = t.cols - r.w), r.x < 0 && (r.x = 0, r.w = t.cols), !r.static)
      n.push(r);
    else
      for (; se(n, r); )
        r.y++;
  }
  return e;
}
function fn(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (e[n].i === t)
      return e[n];
}
function se(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (Fn(e[n], t))
      return e[n];
}
function Nn(e, t) {
  return e.filter((n) => Fn(n, t));
}
function jn(e) {
  return e.filter((t) => t.static);
}
function Ge(e, t, n, i, o, r) {
  if (t.static)
    return e;
  const a = t.x, s = t.y, c = i && t.y > i;
  typeof n == "number" && (t.x = n), typeof i == "number" && (t.y = i), t.moved = !0;
  let l = Xn(e);
  c && (l = l.reverse());
  const u = Nn(l, t);
  if (r && u.length)
    return t.x = a, t.y = s, t.moved = !1, e;
  for (let f = 0, h = u.length; f < h; f++) {
    const m = u[f];
    m.moved || t.y > m.y && t.y - m.y > m.h / 4 || (m.static ? e = dn(e, m, t, o) : e = dn(e, t, m, o));
  }
  return e;
}
function dn(e, t, n, i) {
  if (i) {
    const r = {
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
      i: "-1"
    };
    if (r.y = Math.max(t.y - n.h, 0), !se(e, r))
      return Ge(e, n, void 0, r.y, !1);
  }
  return Ge(e, n, void 0, n.y + 1, !1);
}
function Ni(e, t, n, i) {
  const o = "translate3d(" + t + "px," + e + "px, 0)";
  return {
    transform: o,
    WebkitTransform: o,
    MozTransform: o,
    msTransform: o,
    OTransform: o,
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function ji(e, t, n, i) {
  const o = "translate3d(" + t * -1 + "px," + e + "px, 0)";
  return {
    transform: o,
    WebkitTransform: o,
    MozTransform: o,
    msTransform: o,
    OTransform: o,
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Xi(e, t, n, i) {
  return {
    top: e + "px",
    left: t + "px",
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Yi(e, t, n, i) {
  return {
    top: e + "px",
    right: t + "px",
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Xn(e) {
  return [].concat(e).sort(function(n, i) {
    return n.y === i.y && n.x === i.x ? 0 : n.y > i.y || n.y === i.y && n.x > i.x ? 1 : -1;
  });
}
function Gi(e, t) {
  t = t || "Layout";
  const n = ["x", "y", "w", "h"], i = [];
  if (!Array.isArray(e))
    throw new Error(t + " must be an array!");
  for (let o = 0, r = e.length; o < r; o++) {
    const a = e[o];
    for (let s = 0; s < n.length; s++)
      if (typeof a[n[s]] != "number")
        throw new Error(
          "VueGridLayout: " + t + "[" + o + "]." + n[s] + " must be a number!"
        );
    if (a.i === void 0 || a.i === null)
      throw new Error("VueGridLayout: " + t + "[" + o + "].i cannot be null!");
    if (typeof a.i != "number" && typeof a.i != "string")
      throw new Error("VueGridLayout: " + t + "[" + o + "].i must be a string or number!");
    if (i.indexOf(a.i) >= 0)
      throw new Error("VueGridLayout: " + t + "[" + o + "].i must be unique!");
    if (i.push(a.i), a.static !== void 0 && typeof a.static != "boolean")
      throw new Error("VueGridLayout: " + t + "[" + o + "].static must be a boolean!");
  }
}
function hn(e) {
  return qi(e);
}
function qi(e) {
  const t = e.target, n = t.offsetParent || document.body, i = t.offsetParent === document.body ? { left: 0, top: 0 } : n.getBoundingClientRect(), o = e.clientX + n.scrollLeft - i.left, r = e.clientY + n.scrollTop - i.top;
  return { x: o, y: r };
}
function pn(e, t, n, i) {
  return Ui(e) ? {
    deltaX: n - e,
    deltaY: i - t,
    lastX: e,
    lastY: t,
    x: n,
    y: i
  } : {
    deltaX: 0,
    deltaY: 0,
    lastX: n,
    lastY: i,
    x: n,
    y: i
  };
}
function Ui(e) {
  return typeof e == "number" && !isNaN(e);
}
function Vi(e, t) {
  const n = Yn(e);
  let i = n[0];
  for (let o = 1, r = n.length; o < r; o++) {
    const a = n[o];
    t > e[a] && (i = a);
  }
  return i;
}
function qe(e, t) {
  if (!t[e])
    throw new Error(
      "ResponsiveGridLayout: `cols` entry for breakpoint " + e + " is missing!"
    );
  return t[e];
}
function Ki(e, t, n, i, o, r, a) {
  if (t[i])
    return Ye(t[i]);
  let s = e;
  const c = Yn(n), l = c.slice(c.indexOf(i));
  for (let u = 0, f = l.length; u < f; u++) {
    const h = l[u];
    if (t[h]) {
      s = t[h];
      break;
    }
  }
  return s = Ye(s || []), Kt(Fi(s, { cols: r }), a);
}
function Yn(e) {
  return Object.keys(e).sort(function(n, i) {
    return e[n] - e[i];
  });
}
let Ji = "auto";
function Zi() {
  return typeof document < "u";
}
function Gn() {
  return typeof window < "u";
}
function gn() {
  return Zi() ? typeof document.dir < "u" ? document.dir : document.getElementsByTagName("html")[0].getAttribute("dir") || "auto" : Ji;
}
function Qi(e, t) {
  return Gn ? (window.addEventListener(e, t), !0) : (t(), !1);
}
function to(e, t) {
  Gn && window.removeEventListener(e, t);
}
const U = {
  init: eo,
  document: null,
  DocumentFragment: null,
  SVGElement: null,
  SVGSVGElement: null,
  SVGElementInstance: null,
  Element: null,
  HTMLElement: null,
  Event: null,
  Touch: null,
  PointerEvent: null
};
function Vt() {
}
function eo(e) {
  const t = e;
  U.document = t.document, U.DocumentFragment = t.DocumentFragment || Vt, U.SVGElement = t.SVGElement || Vt, U.SVGSVGElement = t.SVGSVGElement || Vt, U.SVGElementInstance = t.SVGElementInstance || Vt, U.Element = t.Element || Vt, U.HTMLElement = t.HTMLElement || U.Element, U.Event = t.Event, U.Touch = t.Touch || Vt, U.PointerEvent = t.PointerEvent || t.MSPointerEvent;
}
var qn = (e) => !!(e && e.Window) && e instanceof e.Window;
let Un, kt;
function Vn(e) {
  Un = e;
  const t = e.document.createTextNode("");
  t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), kt = e;
}
typeof window < "u" && window && Vn(window);
function jt(e) {
  return qn(e) ? e : (e.ownerDocument || e).defaultView || kt.window;
}
const no = (e) => e === kt || qn(e), io = (e) => Te(e) && e.nodeType === 11, Te = (e) => !!e && typeof e == "object", Kn = (e) => typeof e == "function", oo = (e) => typeof e == "number", ro = (e) => typeof e == "boolean", so = (e) => typeof e == "string", ao = (e) => {
  if (!e || typeof e != "object")
    return !1;
  const t = jt(e) || kt;
  return /object|function/.test(typeof Element) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
}, lo = (e) => Te(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString()), co = (e) => Te(e) && typeof e.length < "u" && Kn(e.splice);
var g = {
  window: no,
  docFrag: io,
  object: Te,
  func: Kn,
  number: oo,
  bool: ro,
  string: so,
  element: ao,
  plainObject: lo,
  array: co
};
const tt = {
  init: uo,
  supportsTouch: null,
  supportsPointerEvent: null,
  isIOS7: null,
  isIOS: null,
  isIe9: null,
  isOperaMobile: null,
  prefixedMatchesSelector: null,
  pEventTypes: null,
  wheelEvent: null
};
function uo(e) {
  const t = U.Element, n = e.navigator || {};
  tt.supportsTouch = "ontouchstart" in e || g.func(e.DocumentTouch) && U.document instanceof e.DocumentTouch, tt.supportsPointerEvent = n.pointerEnabled !== !1 && !!U.PointerEvent, tt.isIOS = /iP(hone|od|ad)/.test(n.platform), tt.isIOS7 = /iP(hone|od|ad)/.test(n.platform) && /OS 7[^\d]/.test(n.appVersion), tt.isIe9 = /MSIE 9/.test(n.userAgent), tt.isOperaMobile = n.appName === "Opera" && tt.supportsTouch && /Presto/.test(n.userAgent), tt.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", tt.pEventTypes = tt.supportsPointerEvent ? U.PointerEvent === e.MSPointerEvent ? {
    up: "MSPointerUp",
    down: "MSPointerDown",
    over: "mouseover",
    out: "mouseout",
    move: "MSPointerMove",
    cancel: "MSPointerCancel"
  } : {
    up: "pointerup",
    down: "pointerdown",
    over: "pointerover",
    out: "pointerout",
    move: "pointermove",
    cancel: "pointercancel"
  } : null, tt.wheelEvent = U.document && "onmousewheel" in U.document ? "mousewheel" : "wheel";
}
function Ft(e, t) {
  if (e.contains)
    return e.contains(t);
  for (; t; ) {
    if (t === e)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
function Jn(e, t) {
  for (; g.element(e); ) {
    if (Xt(e, t))
      return e;
    e = At(e);
  }
  return null;
}
function At(e) {
  let t = e.parentNode;
  if (g.docFrag(t)) {
    for (; (t = t.host) && g.docFrag(t); )
      ;
    return t;
  }
  return t;
}
function Xt(e, t) {
  return kt !== Un && (t = t.replace(/\/deep\//g, " ")), e[tt.prefixedMatchesSelector](t);
}
function Ue(e, t, n) {
  for (; g.element(e); ) {
    if (Xt(e, t))
      return !0;
    if (e = At(e), e === n)
      return Xt(e, t);
  }
  return !1;
}
function vn(e) {
  return e.correspondingUseElement || e;
}
function fo(e) {
  return e = e || kt, {
    x: e.scrollX || e.document.documentElement.scrollLeft,
    y: e.scrollY || e.document.documentElement.scrollTop
  };
}
function Qe(e) {
  const t = e instanceof U.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
  return t && {
    left: t.left,
    right: t.right,
    top: t.top,
    bottom: t.bottom,
    width: t.width || t.right - t.left,
    height: t.height || t.bottom - t.top
  };
}
function tn(e) {
  const t = Qe(e);
  if (!tt.isIOS7 && t) {
    const n = fo(jt(e));
    t.left += n.x, t.right += n.x, t.top += n.y, t.bottom += n.y;
  }
  return t;
}
function mn(e) {
  return g.string(e) ? (U.document.querySelector(e), !0) : !1;
}
function _(e, t) {
  for (const i in t)
    e[i] = t[i];
  return e;
}
function ce(e, t) {
  let n = !1;
  return function() {
    return n || (kt.console.warn(t), n = !0), e.apply(this, arguments);
  };
}
function Zn(e, t) {
  return e.name = t.name, e.axis = t.axis, e.edges = t.edges, e;
}
function ho(e) {
  const {
    Interactable: t
    // tslint:disable-line no-shadowed-variable
  } = e;
  t.prototype.getAction = function(i, o, r, a) {
    const s = po(this, o, r, a, e);
    return this.options.actionChecker ? this.options.actionChecker(i, o, s, this, a, r) : s;
  }, t.prototype.ignoreFrom = ce(function(n) {
    return this._backCompatOption("ignoreFrom", n);
  }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = ce(function(n) {
    return this._backCompatOption("allowFrom", n);
  }, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), t.prototype.actionChecker = vo, t.prototype.styleCursor = go;
}
function po(e, t, n, i, o) {
  const r = e.getRect(i), a = t.buttons || {
    0: 1,
    1: 4,
    3: 8,
    4: 16
  }[t.button], s = {
    action: null,
    interactable: e,
    interaction: n,
    element: i,
    rect: r,
    buttons: a
  };
  return o.fire("auto-start:check", s), s.action;
}
function go(e) {
  return g.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor;
}
function vo(e) {
  return g.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker;
}
var mo = {
  id: "auto-start/interactableMethods",
  install: ho
};
function yo(e) {
  const {
    interactStatic: t,
    defaults: n
  } = e;
  e.usePlugin(mo), n.base.actionChecker = null, n.base.styleCursor = !0, _(n.perAction, {
    manualStart: !1,
    max: 1 / 0,
    maxPerElement: 1,
    allowFrom: null,
    ignoreFrom: null,
    // only allow left button by default
    // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
    mouseButtons: 1
  }), t.maxInteractions = (i) => ni(i, e), e.autoStart = {
    // Allow this many interactions to happen simultaneously
    maxInteractions: 1 / 0,
    withinInteractionLimit: Ie,
    cursorElement: null
  };
}
function bo(e, t) {
  let {
    interaction: n,
    pointer: i,
    event: o,
    eventTarget: r
  } = e;
  if (n.interacting())
    return;
  const a = ti(n, i, o, r, t);
  ei(n, a, t);
}
function xo(e, t) {
  let {
    interaction: n,
    pointer: i,
    event: o,
    eventTarget: r
  } = e;
  if (n.pointerType !== "mouse" || n.pointerIsDown || n.interacting())
    return;
  const a = ti(n, i, o, r, t);
  ei(n, a, t);
}
function wo(e, t) {
  const {
    interaction: n
  } = e;
  if (!n.pointerIsDown || n.interacting() || !n.pointerWasMoved || !n.prepared.name)
    return;
  t.fire("autoStart:before-start", e);
  const {
    interactable: i
  } = n, o = n.prepared.name;
  o && i && (i.options[o].manualStart || !Ie(i, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, i, n.element), ii(n, t)));
}
function Eo(e, t) {
  let {
    interaction: n
  } = e;
  const {
    interactable: i
  } = n;
  i && i.options.styleCursor && Ve(n.element, "", t);
}
function Qn(e, t, n, i, o) {
  return t.testIgnoreAllow(t.options[e.name], n, i) && t.options[e.name].enabled && Ie(t, n, e, o) ? e : null;
}
function So(e, t, n, i, o, r, a) {
  for (let s = 0, c = i.length; s < c; s++) {
    const l = i[s], u = o[s], f = l.getAction(t, n, e, u);
    if (!f)
      continue;
    const h = Qn(f, l, u, r, a);
    if (h)
      return {
        action: h,
        interactable: l,
        element: u
      };
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function ti(e, t, n, i, o) {
  let r = [], a = [], s = i;
  function c(l) {
    r.push(l), a.push(s);
  }
  for (; g.element(s); ) {
    r = [], a = [], o.interactables.forEachMatch(s, c);
    const l = So(e, t, n, r, a, i, o);
    if (l.action && !l.interactable.options[l.action.name].manualStart)
      return l;
    s = At(s);
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function ei(e, t, n) {
  let {
    action: i,
    interactable: o,
    element: r
  } = t;
  i = i || {
    name: null
  }, e.interactable = o, e.element = r, Zn(e.prepared, i), e.rect = o && i.name ? o.getRect(r) : null, ii(e, n), n.fire("autoStart:prepared", {
    interaction: e
  });
}
function Ie(e, t, n, i) {
  const o = e.options, r = o[n.name].max, a = o[n.name].maxPerElement, s = i.autoStart.maxInteractions;
  let c = 0, l = 0, u = 0;
  if (!(r && a && s))
    return !1;
  for (const f of i.interactions.list) {
    const h = f.prepared.name;
    if (f.interacting()) {
      if (c++, c >= s)
        return !1;
      if (f.interactable === e && (l += h === n.name ? 1 : 0, l >= r || f.element === t && (u++, h === n.name && u >= a)))
        return !1;
    }
  }
  return s > 0;
}
function ni(e, t) {
  return g.number(e) ? (t.autoStart.maxInteractions = e, this) : t.autoStart.maxInteractions;
}
function Ve(e, t, n) {
  const {
    cursorElement: i
  } = n.autoStart;
  i && i !== e && (i.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = t, e.style.cursor = t, n.autoStart.cursorElement = t ? e : null;
}
function ii(e, t) {
  const {
    interactable: n,
    element: i,
    prepared: o
  } = e;
  if (!(e.pointerType === "mouse" && n && n.options.styleCursor)) {
    t.autoStart.cursorElement && Ve(t.autoStart.cursorElement, "", t);
    return;
  }
  let r = "";
  if (o.name) {
    const a = n.options[o.name].cursorChecker;
    g.func(a) ? r = a(o, n, i, e._interacting) : r = t.actions.map[o.name].getCursor(o);
  }
  Ve(e.element, r || "", t);
}
const en = {
  id: "auto-start/base",
  before: ["actions"],
  install: yo,
  listeners: {
    "interactions:down": bo,
    "interactions:move": (e, t) => {
      xo(e, t), wo(e, t);
    },
    "interactions:stop": Eo
  },
  maxInteractions: ni,
  withinInteractionLimit: Ie,
  validateAction: Qn
};
function To(e, t) {
  let {
    interaction: n,
    eventTarget: i,
    dx: o,
    dy: r
  } = e;
  if (n.prepared.name !== "drag")
    return;
  const a = Math.abs(o), s = Math.abs(r), c = n.interactable.options.drag, l = c.startAxis, u = a > s ? "x" : a < s ? "y" : "xy";
  if (n.prepared.axis = c.lockAxis === "start" ? u[0] : c.lockAxis, u !== "xy" && l !== "xy" && l !== u) {
    n.prepared.name = null;
    let f = i;
    const h = function(m) {
      if (m === n.interactable)
        return;
      const x = n.interactable.options.drag;
      if (!x.manualStart && m.testIgnoreAllow(x, f, i)) {
        const T = m.getAction(n.downPointer, n.downEvent, n, f);
        if (T && T.name === "drag" && Io(u, m) && en.validateAction(T, m, f, i, t))
          return m;
      }
    };
    for (; g.element(f); ) {
      const m = t.interactables.forEachMatch(f, h);
      if (m) {
        n.prepared.name = "drag", n.interactable = m, n.element = f;
        break;
      }
      f = At(f);
    }
  }
}
function Io(e, t) {
  if (!t)
    return !1;
  const n = t.options.drag.startAxis;
  return e === "xy" || n === "xy" || n === e;
}
var zo = {
  id: "auto-start/dragAxis",
  listeners: {
    "autoStart:before-start": To
  }
};
function Mo(e) {
  const {
    defaults: t
  } = e;
  e.usePlugin(en), t.perAction.hold = 0, t.perAction.delay = 0;
}
function He(e) {
  const t = e.prepared && e.prepared.name;
  if (!t)
    return null;
  const n = e.interactable.options;
  return n[t].hold || n[t].delay;
}
const Co = {
  id: "auto-start/hold",
  install: Mo,
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.autoStartHoldTimer = null;
    },
    "autoStart:prepared": (e) => {
      let {
        interaction: t
      } = e;
      const n = He(t);
      n > 0 && (t.autoStartHoldTimer = setTimeout(() => {
        t.start(t.prepared, t.interactable, t.element);
      }, n));
    },
    "interactions:move": (e) => {
      let {
        interaction: t,
        duplicate: n
      } = e;
      t.autoStartHoldTimer && t.pointerWasMoved && !n && (clearTimeout(t.autoStartHoldTimer), t.autoStartHoldTimer = null);
    },
    // prevent regular down->move autoStart
    "autoStart:before-start": (e) => {
      let {
        interaction: t
      } = e;
      He(t) > 0 && (t.prepared.name = null);
    }
  },
  getHoldDuration: He
};
var Do = {
  id: "auto-start",
  install(e) {
    e.usePlugin(en), e.usePlugin(Co), e.usePlugin(zo);
  }
};
const oi = (e, t) => {
  for (const n of t)
    e.push(n);
  return e;
}, ri = (e) => oi([], e), ze = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (t(e[n], n, e))
      return n;
  return -1;
}, ye = (e, t) => e[ze(e, t)];
function Zt(e) {
  const t = {};
  for (const n in e) {
    const i = e[n];
    g.plainObject(i) ? t[n] = Zt(i) : g.array(i) ? t[n] = ri(i) : t[n] = i;
  }
  return t;
}
let yn = 0, It, Wt;
function _o(e) {
  if (It = e.requestAnimationFrame, Wt = e.cancelAnimationFrame, !It) {
    const t = ["ms", "moz", "webkit", "o"];
    for (const n of t)
      It = e[`${n}RequestAnimationFrame`], Wt = e[`${n}CancelAnimationFrame`] || e[`${n}CancelRequestAnimationFrame`];
  }
  It = It && It.bind(e), Wt = Wt && Wt.bind(e), It || (It = (t) => {
    const n = Date.now(), i = Math.max(0, 16 - (n - yn)), o = e.setTimeout(() => {
      t(n + i);
    }, i);
    return yn = n + i, o;
  }, Wt = (t) => clearTimeout(t));
}
var Jt = {
  request: (e) => It(e),
  cancel: (e) => Wt(e),
  init: _o
};
function Nt(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (o) => !0, i = arguments.length > 3 ? arguments[3] : void 0;
  if (i = i || {}, g.string(e) && e.search(" ") !== -1 && (e = bn(e)), g.array(e))
    return e.forEach((o) => Nt(o, t, n, i)), i;
  if (g.object(e) && (t = e, e = ""), g.func(t) && n(e))
    i[e] = i[e] || [], i[e].push(t);
  else if (g.array(t))
    for (const o of t)
      Nt(e, o, n, i);
  else if (g.object(t))
    for (const o in t) {
      const r = bn(o).map((a) => `${e}${a}`);
      Nt(r, t[o], n, i);
    }
  return i;
}
function bn(e) {
  return e.trim().split(/ +/);
}
function xn(e, t) {
  for (const n of t) {
    if (e.immediatePropagationStopped)
      break;
    n(e);
  }
}
class si {
  constructor(t) {
    this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = _({}, t || {});
  }
  fire(t) {
    let n;
    const i = this.global;
    (n = this.types[t.type]) && xn(t, n), !t.propagationStopped && i && (n = i[t.type]) && xn(t, n);
  }
  on(t, n) {
    const i = Nt(t, n);
    for (t in i)
      this.types[t] = oi(this.types[t] || [], i[t]);
  }
  off(t, n) {
    const i = Nt(t, n);
    for (t in i) {
      const o = this.types[t];
      if (!(!o || !o.length))
        for (const r of i[t]) {
          const a = o.indexOf(r);
          a !== -1 && o.splice(a, 1);
        }
    }
  }
  getRect(t) {
    return null;
  }
}
const Po = ["webkit", "moz"];
function ai(e, t) {
  e.__set || (e.__set = {});
  for (const n in t)
    Po.some((i) => n.indexOf(i) === 0) || typeof e[n] != "function" && n !== "__set" && Object.defineProperty(e, n, {
      get() {
        return n in e.__set ? e.__set[n] : e.__set[n] = t[n];
      },
      set(i) {
        e.__set[n] = i;
      },
      configurable: !0
    });
  return e;
}
var Me = (e, t) => Math.sqrt(e * e + t * t);
function $e(e, t) {
  e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
}
function Oo(e, t, n) {
  e.page.x = n.page.x - t.page.x, e.page.y = n.page.y - t.page.y, e.client.x = n.client.x - t.client.x, e.client.y = n.client.y - t.client.y, e.timeStamp = n.timeStamp - t.timeStamp;
}
function ko(e, t) {
  const n = Math.max(t.timeStamp / 1e3, 1e-3);
  e.page.x = t.page.x / n, e.page.y = t.page.y / n, e.client.x = t.client.x / n, e.client.y = t.client.y / n, e.timeStamp = n;
}
function Ao(e) {
  e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
}
function li(e) {
  return e instanceof U.Event || e instanceof U.Touch;
}
function xe(e, t, n) {
  return n = n || {}, e = e || "page", n.x = t[e + "X"], n.y = t[e + "Y"], n;
}
function Ro(e, t) {
  return t = t || {
    x: 0,
    y: 0
  }, tt.isOperaMobile && li(e) ? (xe("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : xe("page", e, t), t;
}
function Ho(e, t) {
  return t = t || {}, tt.isOperaMobile && li(e) ? xe("screen", e, t) : xe("client", e, t), t;
}
function we(e) {
  return g.number(e.pointerId) ? e.pointerId : e.identifier;
}
function $o(e, t, n) {
  const i = t.length > 1 ? ci(t) : t[0];
  Ro(i, e.page), Ho(i, e.client), e.timeStamp = n;
}
function nn(e) {
  const t = [];
  return g.array(e) ? (t[0] = e[0], t[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (t[0] = e.touches[0], t[1] = e.changedTouches[0]) : e.touches.length === 0 && (t[0] = e.changedTouches[0], t[1] = e.changedTouches[1]) : (t[0] = e.touches[0], t[1] = e.touches[1]), t;
}
function ci(e) {
  const t = {
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    screenX: 0,
    screenY: 0
  };
  for (const n of e)
    for (const i in t)
      t[i] += n[i];
  for (const n in t)
    t[n] /= e.length;
  return t;
}
function Bo(e) {
  if (!e.length)
    return null;
  const t = nn(e), n = Math.min(t[0].pageX, t[1].pageX), i = Math.min(t[0].pageY, t[1].pageY), o = Math.max(t[0].pageX, t[1].pageX), r = Math.max(t[0].pageY, t[1].pageY);
  return {
    x: n,
    y: i,
    left: n,
    top: i,
    right: o,
    bottom: r,
    width: o - n,
    height: r - i
  };
}
function Lo(e, t) {
  const n = t + "X", i = t + "Y", o = nn(e), r = o[0][n] - o[1][n], a = o[0][i] - o[1][i];
  return Me(r, a);
}
function Wo(e, t) {
  const n = t + "X", i = t + "Y", o = nn(e), r = o[1][n] - o[0][n], a = o[1][i] - o[0][i];
  return 180 * Math.atan2(a, r) / Math.PI;
}
function Fo(e) {
  return g.string(e.pointerType) ? e.pointerType : g.number(e.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][e.pointerType] : (
    // if the PointerEvent API isn't available, then the "pointer" must
    // be either a MouseEvent, TouchEvent, or Touch object
    /touch/.test(e.type || "") || e instanceof U.Touch ? "touch" : "mouse"
  );
}
function ui(e) {
  const t = g.func(e.composedPath) ? e.composedPath() : e.path;
  return [vn(t ? t[0] : e.target), vn(e.currentTarget)];
}
function ee() {
  return {
    page: {
      x: 0,
      y: 0
    },
    client: {
      x: 0,
      y: 0
    },
    timeStamp: 0
  };
}
function No(e) {
  var t;
  const n = [], i = {}, o = [], r = {
    add: a,
    remove: s,
    addDelegate: c,
    removeDelegate: l,
    delegateListener: u,
    delegateUseCapture: f,
    delegatedEvents: i,
    documents: o,
    targets: n,
    supportsOptions: !1,
    supportsPassive: !1
  };
  (t = e.document) == null || t.createElement("div").addEventListener("test", null, {
    get capture() {
      return r.supportsOptions = !0;
    },
    get passive() {
      return r.supportsPassive = !0;
    }
  }), e.events = r;
  function a(h, m, x, T) {
    if (!h.addEventListener)
      return;
    const y = ne(T);
    let C = ye(n, (I) => I.eventTarget === h);
    C || (C = {
      eventTarget: h,
      events: {}
    }, n.push(C)), C.events[m] || (C.events[m] = []), ye(C.events[m], (I) => I.func === x && ve(I.options, y)) || (h.addEventListener(m, x, r.supportsOptions ? y : y.capture), C.events[m].push({
      func: x,
      options: y
    }));
  }
  function s(h, m, x, T) {
    if (!h.addEventListener || !h.removeEventListener)
      return;
    const y = ze(n, (v) => v.eventTarget === h), C = n[y];
    if (!C || !C.events)
      return;
    if (m === "all") {
      for (m in C.events)
        C.events.hasOwnProperty(m) && s(h, m, "all");
      return;
    }
    let I = !1;
    const M = C.events[m];
    if (M)
      if (x === "all") {
        for (let v = M.length - 1; v >= 0; v--) {
          const d = M[v];
          s(h, m, d.func, d.options);
        }
        return;
      } else {
        const v = ne(T);
        for (let d = 0; d < M.length; d++) {
          const D = M[d];
          if (D.func === x && ve(D.options, v)) {
            h.removeEventListener(m, x, r.supportsOptions ? v : v.capture), M.splice(d, 1), M.length === 0 && (delete C.events[m], I = !0);
            break;
          }
        }
      }
    I && !Object.keys(C.events).length && n.splice(y, 1);
  }
  function c(h, m, x, T, y) {
    const C = ne(y);
    if (!i[x]) {
      i[x] = [];
      for (const v of o)
        a(v, x, u), a(v, x, f, !0);
    }
    const I = i[x];
    let M = ye(I, (v) => v.selector === h && v.context === m);
    M || (M = {
      selector: h,
      context: m,
      listeners: []
    }, I.push(M)), M.listeners.push({
      func: T,
      options: C
    });
  }
  function l(h, m, x, T, y) {
    const C = ne(y), I = i[x];
    let M = !1, v;
    if (I)
      for (v = I.length - 1; v >= 0; v--) {
        const d = I[v];
        if (d.selector === h && d.context === m) {
          const {
            listeners: D
          } = d;
          for (let w = D.length - 1; w >= 0; w--) {
            const B = D[w];
            if (B.func === T && ve(B.options, C)) {
              D.splice(w, 1), D.length || (I.splice(v, 1), s(m, x, u), s(m, x, f, !0)), M = !0;
              break;
            }
          }
          if (M)
            break;
        }
      }
  }
  function u(h, m) {
    const x = ne(m), T = new jo(h), y = i[h.type], [C] = ui(h);
    let I = C;
    for (; g.element(I); ) {
      for (let M = 0; M < y.length; M++) {
        const v = y[M], {
          selector: d,
          context: D
        } = v;
        if (Xt(I, d) && Ft(D, C) && Ft(D, I)) {
          const {
            listeners: w
          } = v;
          T.currentTarget = I;
          for (const B of w)
            ve(B.options, x) && B.func(T);
        }
      }
      I = At(I);
    }
  }
  function f(h) {
    return u.call(this, h, !0);
  }
  return r;
}
class jo {
  constructor(t) {
    this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = t, ai(this, t);
  }
  preventOriginalDefault() {
    this.originalEvent.preventDefault();
  }
  stopPropagation() {
    this.originalEvent.stopPropagation();
  }
  stopImmediatePropagation() {
    this.originalEvent.stopImmediatePropagation();
  }
}
function ne(e) {
  return g.object(e) ? {
    capture: !!e.capture,
    passive: !!e.passive
  } : {
    capture: !!e,
    passive: !1
  };
}
function ve(e, t) {
  return e === t ? !0 : typeof e == "boolean" ? !!t.capture === e && !t.passive : !!e.capture == !!t.capture && !!e.passive == !!t.passive;
}
var Xo = {
  id: "events",
  install: No
};
const Yo = function(t) {
  return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t, this) : g.bool(t) ? (this.options.preventDefault = t ? "always" : "never", this) : this.options.preventDefault;
};
function Go(e, t, n) {
  const i = e.options.preventDefault;
  if (i !== "never") {
    if (i === "always") {
      n.preventDefault();
      return;
    }
    if (t.events.supportsPassive && /^touch(start|move)$/.test(n.type)) {
      const o = jt(n.target).document, r = t.getDocOptions(o);
      if (!(r && r.events) || r.events.passive !== !1)
        return;
    }
    /^(mouse|pointer|touch)*(down|start)/i.test(n.type) || g.element(n.target) && Xt(n.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n.preventDefault();
  }
}
function qo(e) {
  let {
    interaction: t,
    event: n
  } = e;
  t.interactable && t.interactable.checkAndPreventDefault(n);
}
function Uo(e) {
  const {
    Interactable: t
  } = e;
  t.prototype.preventDefault = Yo, t.prototype.checkAndPreventDefault = function(n) {
    return Go(this, e, n);
  }, e.interactions.docEvents.push({
    type: "dragstart",
    listener(n) {
      for (const i of e.interactions.list)
        if (i.element && (i.element === n.target || Ft(i.element, n.target))) {
          i.interactable.checkAndPreventDefault(n);
          return;
        }
    }
  });
}
var Vo = {
  id: "core/interactablePreventDefault",
  install: Uo,
  listeners: ["down", "move", "up", "cancel"].reduce((e, t) => (e[`interactions:${t}`] = qo, e), {})
};
function fi(e, t, n) {
  return e === "parent" ? At(n) : e === "self" ? t.getRect(n) : Jn(n, e);
}
function ue(e, t, n, i) {
  let o = e;
  return g.string(o) ? o = fi(o, t, n) : g.func(o) && (o = o(...i)), g.element(o) && (o = tn(o)), o;
}
function Ce(e) {
  return e && {
    x: "x" in e ? e.x : e.left,
    y: "y" in e ? e.y : e.top
  };
}
function Ko(e) {
  return e && !("left" in e && "top" in e) && (e = _({}, e), e.left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
}
function wn(e) {
  return e && !("x" in e && "y" in e) && (e = _({}, e), e.x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
}
function on(e, t, n) {
  e.left && (t.left += n.x), e.right && (t.right += n.x), e.top && (t.top += n.y), e.bottom && (t.bottom += n.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
}
function rn(e, t, n) {
  const i = n && e.options[n], r = i && i.origin || e.options.origin, a = ue(r, e, t, [e && t]);
  return Ce(a) || {
    x: 0,
    y: 0
  };
}
class di {
  constructor(t) {
    this.immediatePropagationStopped = !1, this.propagationStopped = !1, this._interaction = t;
  }
  preventDefault() {
  }
  /**
   * Don't call any other listeners (even on the current target)
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
  /**
   * Don't call listeners on the remaining targets
   */
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  }
}
Object.defineProperty(di.prototype, "interaction", {
  get() {
    return this._interaction._proxy;
  },
  set() {
  }
});
const hi = {
  base: {
    preventDefault: "auto",
    deltaSource: "page"
  },
  perAction: {
    enabled: !1,
    origin: {
      x: 0,
      y: 0
    }
  },
  actions: {}
};
class sn extends di {
  constructor(t, n, i, o, r, a, s) {
    super(t), this.relatedTarget = null, this.screenX = void 0, this.screenY = void 0, this.button = void 0, this.buttons = void 0, this.ctrlKey = void 0, this.shiftKey = void 0, this.altKey = void 0, this.metaKey = void 0, this.page = void 0, this.client = void 0, this.delta = void 0, this.rect = void 0, this.x0 = void 0, this.y0 = void 0, this.t0 = void 0, this.dt = void 0, this.duration = void 0, this.clientX0 = void 0, this.clientY0 = void 0, this.velocity = void 0, this.speed = void 0, this.swipe = void 0, this.axes = void 0, this.preEnd = void 0, r = r || t.element;
    const c = t.interactable, l = (c && c.options || hi).deltaSource, u = rn(c, r, i), f = o === "start", h = o === "end", m = f ? this : t.prevEvent, x = f ? t.coords.start : h ? {
      page: m.page,
      client: m.client,
      timeStamp: t.coords.cur.timeStamp
    } : t.coords.cur;
    this.page = _({}, x.page), this.client = _({}, x.client), this.rect = _({}, t.rect), this.timeStamp = x.timeStamp, h || (this.page.x -= u.x, this.page.y -= u.y, this.client.x -= u.x, this.client.y -= u.y), this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.button = n.button, this.buttons = n.buttons, this.target = r, this.currentTarget = r, this.preEnd = a, this.type = s || i + (o || ""), this.interactable = c, this.t0 = f ? t.pointers[t.pointers.length - 1].downTime : m.t0, this.x0 = t.coords.start.page.x - u.x, this.y0 = t.coords.start.page.y - u.y, this.clientX0 = t.coords.start.client.x - u.x, this.clientY0 = t.coords.start.client.y - u.y, f || h ? this.delta = {
      x: 0,
      y: 0
    } : this.delta = {
      x: this[l].x - m[l].x,
      y: this[l].y - m[l].y
    }, this.dt = t.coords.delta.timeStamp, this.duration = this.timeStamp - this.t0, this.velocity = _({}, t.coords.velocity[l]), this.speed = Me(this.velocity.x, this.velocity.y), this.swipe = h || o === "inertiastart" ? this.getSwipe() : null;
  }
  getSwipe() {
    const t = this._interaction;
    if (t.prevEvent.speed < 600 || this.timeStamp - t.prevEvent.timeStamp > 150)
      return null;
    let n = 180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX) / Math.PI;
    const i = 22.5;
    n < 0 && (n += 360);
    const o = 135 - i <= n && n < 225 + i, r = 225 - i <= n && n < 315 + i, a = !o && (315 - i <= n || n < 45 + i), s = !r && 45 - i <= n && n < 135 + i;
    return {
      up: r,
      down: s,
      left: o,
      right: a,
      angle: n,
      speed: t.prevEvent.speed,
      velocity: {
        x: t.prevEvent.velocityX,
        y: t.prevEvent.velocityY
      }
    };
  }
  preventDefault() {
  }
  /**
   * Don't call listeners on the remaining targets
   */
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  }
  /**
   * Don't call any other listeners (even on the current target)
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
Object.defineProperties(sn.prototype, {
  pageX: {
    get() {
      return this.page.x;
    },
    set(e) {
      this.page.x = e;
    }
  },
  pageY: {
    get() {
      return this.page.y;
    },
    set(e) {
      this.page.y = e;
    }
  },
  clientX: {
    get() {
      return this.client.x;
    },
    set(e) {
      this.client.x = e;
    }
  },
  clientY: {
    get() {
      return this.client.y;
    },
    set(e) {
      this.client.y = e;
    }
  },
  dx: {
    get() {
      return this.delta.x;
    },
    set(e) {
      this.delta.x = e;
    }
  },
  dy: {
    get() {
      return this.delta.y;
    },
    set(e) {
      this.delta.y = e;
    }
  },
  velocityX: {
    get() {
      return this.velocity.x;
    },
    set(e) {
      this.velocity.x = e;
    }
  },
  velocityY: {
    get() {
      return this.velocity.y;
    },
    set(e) {
      this.velocity.y = e;
    }
  }
});
class Jo {
  constructor(t, n, i, o, r) {
    this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = t, this.pointer = n, this.event = i, this.downTime = o, this.downTarget = r;
  }
}
let Zo = /* @__PURE__ */ function(e) {
  return e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = "", e;
}({}), Qo = /* @__PURE__ */ function(e) {
  return e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = "", e;
}({}), tr = 0;
class er {
  /** @internal */
  get pointerMoveTolerance() {
    return 1;
  }
  constructor(t) {
    this.interactable = null, this.element = null, this.rect = null, this._rects = void 0, this.edges = null, this._scopeFire = void 0, this.prepared = {
      name: null,
      axis: null,
      edges: null
    }, this.pointerType = void 0, this.pointers = [], this.downEvent = null, this.downPointer = {}, this._latestPointer = {
      pointer: null,
      event: null,
      eventTarget: null
    }, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = ce(function(r) {
      this.move(r);
    }, "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
      // Starting InteractEvent pointer coordinates
      start: ee(),
      // Previous native pointer move event coordinates
      prev: ee(),
      // current native pointer move event coordinates
      cur: ee(),
      // Change in coordinates and time of the pointer
      delta: ee(),
      // pointer velocity
      velocity: ee()
    }, this._id = tr++;
    let {
      pointerType: n,
      scopeFire: i
    } = t;
    this._scopeFire = i, this.pointerType = n;
    const o = this;
    this._proxy = {};
    for (const r in Zo)
      Object.defineProperty(this._proxy, r, {
        get() {
          return o[r];
        }
      });
    for (const r in Qo)
      Object.defineProperty(this._proxy, r, {
        value: function() {
          return o[r](...arguments);
        }
      });
    this._scopeFire("interactions:new", {
      interaction: this
    });
  }
  pointerDown(t, n, i) {
    const o = this.updatePointer(t, n, i, !0), r = this.pointers[o];
    this._scopeFire("interactions:down", {
      pointer: t,
      event: n,
      eventTarget: i,
      pointerIndex: o,
      pointerInfo: r,
      type: "down",
      interaction: this
    });
  }
  /**
   * ```js
   * interact(target)
   *   .draggable({
   *     // disable the default drag start by down->move
   *     manualStart: true
   *   })
   *   // start dragging after the user holds the pointer down
   *   .on('hold', function (event) {
   *     var interaction = event.interaction
   *
   *     if (!interaction.interacting()) {
   *       interaction.start({ name: 'drag' },
   *                         event.interactable,
   *                         event.currentTarget)
   *     }
   * })
   * ```
   *
   * Start an action with the given Interactable and Element as tartgets. The
   * action must be enabled for the target Interactable and an appropriate
   * number of pointers must be held down - 1 for drag/resize, 2 for gesture.
   *
   * Use it with `interactable.<action>able({ manualStart: false })` to always
   * [start actions manually](https://github.com/taye/interact.js/issues/114)
   *
   * @param action - The action to be performed - drag, resize, etc.
   * @param target - The Interactable to target
   * @param element - The DOM Element to target
   * @returns Whether the interaction was successfully started
   */
  start(t, n, i) {
    return this.interacting() || !this.pointerIsDown || this.pointers.length < (t.name === "gesture" ? 2 : 1) || !n.options[t.name].enabled ? !1 : (Zn(this.prepared, t), this.interactable = n, this.element = i, this.rect = n.getRect(i), this.edges = this.prepared.edges ? _({}, this.prepared.edges) : {
      left: !0,
      right: !0,
      top: !0,
      bottom: !0
    }, this._stopped = !1, this._interacting = this._doPhase({
      interaction: this,
      event: this.downEvent,
      phase: "start"
    }) && !this._stopped, this._interacting);
  }
  pointerMove(t, n, i) {
    !this.simulation && !(this.modification && this.modification.endResult) && this.updatePointer(t, n, i, !1);
    const o = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
    let r, a;
    this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, a = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = Me(r, a) > this.pointerMoveTolerance);
    const s = this.getPointerIndex(t), c = {
      pointer: t,
      pointerIndex: s,
      pointerInfo: this.pointers[s],
      event: n,
      type: "move",
      eventTarget: i,
      dx: r,
      dy: a,
      duplicate: o,
      interaction: this
    };
    o || ko(this.coords.velocity, this.coords.delta), this._scopeFire("interactions:move", c), !o && !this.simulation && (this.interacting() && (c.type = null, this.move(c)), this.pointerWasMoved && $e(this.coords.prev, this.coords.cur));
  }
  /**
   * ```js
   * interact(target)
   *   .draggable(true)
   *   .on('dragmove', function (event) {
   *     if (someCondition) {
   *       // change the snap settings
   *       event.interactable.draggable({ snap: { targets: [] }})
   *       // fire another move event with re-calculated snap
   *       event.interaction.move()
   *     }
   *   })
   * ```
   *
   * Force a move of the current action at the same coordinates. Useful if
   * snap/restrict has been changed and you want a movement with the new
   * settings.
   */
  move(t) {
    (!t || !t.event) && Ao(this.coords.delta), t = _({
      pointer: this._latestPointer.pointer,
      event: this._latestPointer.event,
      eventTarget: this._latestPointer.eventTarget,
      interaction: this
    }, t || {}), t.phase = "move", this._doPhase(t);
  }
  /**
   * @internal
   * End interact move events and stop auto-scroll unless simulation is running
   */
  pointerUp(t, n, i, o) {
    let r = this.getPointerIndex(t);
    r === -1 && (r = this.updatePointer(t, n, i, !1));
    const a = /cancel$/i.test(n.type) ? "cancel" : "up";
    this._scopeFire(`interactions:${a}`, {
      pointer: t,
      pointerIndex: r,
      pointerInfo: this.pointers[r],
      event: n,
      eventTarget: i,
      type: a,
      curEventTarget: o,
      interaction: this
    }), this.simulation || this.end(n), this.removePointer(t, n);
  }
  /** @internal */
  documentBlur(t) {
    this.end(t), this._scopeFire("interactions:blur", {
      event: t,
      type: "blur",
      interaction: this
    });
  }
  /**
   * ```js
   * interact(target)
   *   .draggable(true)
   *   .on('move', function (event) {
   *     if (event.pageX > 1000) {
   *       // end the current action
   *       event.interaction.end()
   *       // stop all further listeners from being called
   *       event.stopImmediatePropagation()
   *     }
   *   })
   * ```
   */
  end(t) {
    this._ending = !0, t = t || this._latestPointer.event;
    let n;
    this.interacting() && (n = this._doPhase({
      event: t,
      interaction: this,
      phase: "end"
    })), this._ending = !1, n === !0 && this.stop();
  }
  currentAction() {
    return this._interacting ? this.prepared.name : null;
  }
  interacting() {
    return this._interacting;
  }
  stop() {
    this._scopeFire("interactions:stop", {
      interaction: this
    }), this.interactable = this.element = null, this._interacting = !1, this._stopped = !0, this.prepared.name = this.prevEvent = null;
  }
  /** @internal */
  getPointerIndex(t) {
    const n = we(t);
    return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : ze(this.pointers, (i) => i.id === n);
  }
  /** @internal */
  getPointerInfo(t) {
    return this.pointers[this.getPointerIndex(t)];
  }
  /** @internal */
  updatePointer(t, n, i, o) {
    const r = we(t);
    let a = this.getPointerIndex(t), s = this.pointers[a];
    return o = o === !1 ? !1 : o || /(down|start)$/i.test(n.type), s ? s.pointer = t : (s = new Jo(r, t, n, null, null), a = this.pointers.length, this.pointers.push(s)), $o(this.coords.cur, this.pointers.map((c) => c.pointer), this._now()), Oo(this.coords.delta, this.coords.prev, this.coords.cur), o && (this.pointerIsDown = !0, s.downTime = this.coords.cur.timeStamp, s.downTarget = i, ai(this.downPointer, t), this.interacting() || ($e(this.coords.start, this.coords.cur), $e(this.coords.prev, this.coords.cur), this.downEvent = n, this.pointerWasMoved = !1)), this._updateLatestPointer(t, n, i), this._scopeFire("interactions:update-pointer", {
      pointer: t,
      event: n,
      eventTarget: i,
      down: o,
      pointerInfo: s,
      pointerIndex: a,
      interaction: this
    }), a;
  }
  /** @internal */
  removePointer(t, n) {
    const i = this.getPointerIndex(t);
    if (i === -1)
      return;
    const o = this.pointers[i];
    this._scopeFire("interactions:remove-pointer", {
      pointer: t,
      event: n,
      eventTarget: null,
      pointerIndex: i,
      pointerInfo: o,
      interaction: this
    }), this.pointers.splice(i, 1), this.pointerIsDown = !1;
  }
  /** @internal */
  _updateLatestPointer(t, n, i) {
    this._latestPointer.pointer = t, this._latestPointer.event = n, this._latestPointer.eventTarget = i;
  }
  destroy() {
    this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null;
  }
  /** @internal */
  _createPreparedEvent(t, n, i, o) {
    return new sn(this, t, this.prepared.name, n, this.element, i, o);
  }
  /** @internal */
  _fireEvent(t) {
    var n;
    (n = this.interactable) == null || n.fire(t), (!this.prevEvent || t.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = t);
  }
  /** @internal */
  _doPhase(t) {
    const {
      event: n,
      phase: i,
      preEnd: o,
      type: r
    } = t, {
      rect: a
    } = this;
    if (a && i === "move" && (on(this.edges, a, this.coords.delta[this.interactable.options.deltaSource]), a.width = a.right - a.left, a.height = a.bottom - a.top), this._scopeFire(`interactions:before-action-${i}`, t) === !1)
      return !1;
    const c = t.iEvent = this._createPreparedEvent(n, i, o, r);
    return this._scopeFire(`interactions:action-${i}`, t), i === "start" && (this.prevEvent = c), this._fireEvent(c), this._scopeFire(`interactions:after-action-${i}`, t), !0;
  }
  /** @internal */
  _now() {
    return Date.now();
  }
}
const Ke = {
  methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
  search(e) {
    for (const t of Ke.methodOrder) {
      const n = Ke[t](e);
      if (n)
        return n;
    }
    return null;
  },
  // try to resume simulation with a new pointer
  simulationResume(e) {
    let {
      pointerType: t,
      eventType: n,
      eventTarget: i,
      scope: o
    } = e;
    if (!/down|start/i.test(n))
      return null;
    for (const r of o.interactions.list) {
      let a = i;
      if (r.simulation && r.simulation.allowResume && r.pointerType === t)
        for (; a; ) {
          if (a === r.element)
            return r;
          a = At(a);
        }
    }
    return null;
  },
  // if it's a mouse or pen interaction
  mouseOrPen(e) {
    let {
      pointerId: t,
      pointerType: n,
      eventType: i,
      scope: o
    } = e;
    if (n !== "mouse" && n !== "pen")
      return null;
    let r;
    for (const a of o.interactions.list)
      if (a.pointerType === n) {
        if (a.simulation && !En(a, t))
          continue;
        if (a.interacting())
          return a;
        r || (r = a);
      }
    if (r)
      return r;
    for (const a of o.interactions.list)
      if (a.pointerType === n && !(/down/i.test(i) && a.simulation))
        return a;
    return null;
  },
  // get interaction that has this pointer
  hasPointer(e) {
    let {
      pointerId: t,
      scope: n
    } = e;
    for (const i of n.interactions.list)
      if (En(i, t))
        return i;
    return null;
  },
  // get first idle interaction with a matching pointerType
  idle(e) {
    let {
      pointerType: t,
      scope: n
    } = e;
    for (const i of n.interactions.list) {
      if (i.pointers.length === 1) {
        const o = i.interactable;
        if (o && !(o.options.gesture && o.options.gesture.enabled))
          continue;
      } else if (i.pointers.length >= 2)
        continue;
      if (!i.interacting() && t === i.pointerType)
        return i;
    }
    return null;
  }
};
function En(e, t) {
  return e.pointers.some((n) => {
    let {
      id: i
    } = n;
    return i === t;
  });
}
const pi = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];
function nr(e) {
  const t = {};
  for (const r of pi)
    t[r] = gi(r, e);
  const n = tt.pEventTypes;
  let i;
  U.PointerEvent ? i = [{
    type: n.down,
    listener: o
  }, {
    type: n.down,
    listener: t.pointerDown
  }, {
    type: n.move,
    listener: t.pointerMove
  }, {
    type: n.up,
    listener: t.pointerUp
  }, {
    type: n.cancel,
    listener: t.pointerUp
  }] : i = [{
    type: "mousedown",
    listener: t.pointerDown
  }, {
    type: "mousemove",
    listener: t.pointerMove
  }, {
    type: "mouseup",
    listener: t.pointerUp
  }, {
    type: "touchstart",
    listener: o
  }, {
    type: "touchstart",
    listener: t.pointerDown
  }, {
    type: "touchmove",
    listener: t.pointerMove
  }, {
    type: "touchend",
    listener: t.pointerUp
  }, {
    type: "touchcancel",
    listener: t.pointerUp
  }], i.push({
    type: "blur",
    listener(r) {
      for (const a of e.interactions.list)
        a.documentBlur(r);
    }
  }), e.prevTouchTime = 0, e.Interaction = class extends er {
    get pointerMoveTolerance() {
      return e.interactions.pointerMoveTolerance;
    }
    set pointerMoveTolerance(r) {
      e.interactions.pointerMoveTolerance = r;
    }
    _now() {
      return e.now();
    }
  }, e.interactions = {
    // all active and idle interactions
    list: [],
    new(r) {
      r.scopeFire = (s, c) => e.fire(s, c);
      const a = new e.Interaction(r);
      return e.interactions.list.push(a), a;
    },
    listeners: t,
    docEvents: i,
    pointerMoveTolerance: 1
  };
  function o() {
    for (const r of e.interactions.list)
      if (!(!r.pointerIsDown || r.pointerType !== "touch" || r._interacting))
        for (const a of r.pointers)
          e.documents.some((s) => {
            let {
              doc: c
            } = s;
            return Ft(c, a.downTarget);
          }) || r.removePointer(a.pointer, a.event);
  }
  e.usePlugin(Vo);
}
function gi(e, t) {
  return function(n) {
    const i = t.interactions.list, o = Fo(n), [r, a] = ui(n), s = [];
    if (/^touch/.test(n.type)) {
      t.prevTouchTime = t.now();
      for (const c of n.changedTouches) {
        const l = c, u = we(l), f = {
          pointer: l,
          pointerId: u,
          pointerType: o,
          eventType: n.type,
          eventTarget: r,
          curEventTarget: a,
          scope: t
        }, h = Sn(f);
        s.push([f.pointer, f.eventTarget, f.curEventTarget, h]);
      }
    } else {
      let c = !1;
      if (!tt.supportsPointerEvent && /mouse/.test(n.type)) {
        for (let l = 0; l < i.length && !c; l++)
          c = i[l].pointerType !== "mouse" && i[l].pointerIsDown;
        c = c || t.now() - t.prevTouchTime < 500 || // on iOS and Firefox Mobile, MouseEvent.timeStamp is zero if simulated
        n.timeStamp === 0;
      }
      if (!c) {
        const l = {
          pointer: n,
          pointerId: we(n),
          pointerType: o,
          eventType: n.type,
          curEventTarget: a,
          eventTarget: r,
          scope: t
        }, u = Sn(l);
        s.push([l.pointer, l.eventTarget, l.curEventTarget, u]);
      }
    }
    for (const [c, l, u, f] of s)
      f[e](c, n, l, u);
  };
}
function Sn(e) {
  const {
    pointerType: t,
    scope: n
  } = e, o = {
    interaction: Ke.search(e),
    searchDetails: e
  };
  return n.fire("interactions:find", o), o.interaction || n.interactions.new({
    pointerType: t
  });
}
function Be(e, t) {
  let {
    doc: n,
    scope: i,
    options: o
  } = e;
  const {
    interactions: {
      docEvents: r
    },
    events: a
  } = i, s = a[t];
  i.browser.isIOS && !o.events && (o.events = {
    passive: !1
  });
  for (const l in a.delegatedEvents)
    s(n, l, a.delegateListener), s(n, l, a.delegateUseCapture, !0);
  const c = o && o.events;
  for (const {
    type: l,
    listener: u
  } of r)
    s(n, l, u, c);
}
const ir = {
  id: "core/interactions",
  install: nr,
  listeners: {
    "scope:add-document": (e) => Be(e, "add"),
    "scope:remove-document": (e) => Be(e, "remove"),
    "interactable:unset": (e, t) => {
      let {
        interactable: n
      } = e;
      for (let i = t.interactions.list.length - 1; i >= 0; i--) {
        const o = t.interactions.list[i];
        o.interactable === n && (o.stop(), t.fire("interactions:destroy", {
          interaction: o
        }), o.destroy(), t.interactions.list.length > 2 && t.interactions.list.splice(i, 1));
      }
    }
  },
  onDocSignal: Be,
  doOnInteractions: gi,
  methodNames: pi
};
function fe(e, t) {
  if (t.phaselessTypes[e])
    return !0;
  for (const n in t.map)
    if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases)
      return !0;
  return !1;
}
var Ot = /* @__PURE__ */ function(e) {
  return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
}(Ot || {});
class or {
  /** @internal */
  get _defaults() {
    return {
      base: {},
      perAction: {},
      actions: {}
    };
  }
  constructor(t, n, i, o) {
    this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new si(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || i, this._win = jt(mn(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = o, this.set(n);
  }
  setOnEvents(t, n) {
    return g.func(n.onstart) && this.on(`${t}start`, n.onstart), g.func(n.onmove) && this.on(`${t}move`, n.onmove), g.func(n.onend) && this.on(`${t}end`, n.onend), g.func(n.oninertiastart) && this.on(`${t}inertiastart`, n.oninertiastart), this;
  }
  updatePerActionListeners(t, n, i) {
    var o;
    const r = (o = this._actions.map[t]) == null ? void 0 : o.filterEventType, a = (s) => (r == null || r(s)) && fe(s, this._actions);
    (g.array(n) || g.object(n)) && this._onOff(Ot.Off, t, n, void 0, a), (g.array(i) || g.object(i)) && this._onOff(Ot.On, t, i, void 0, a);
  }
  setPerAction(t, n) {
    const i = this._defaults;
    for (const o in n) {
      const r = o, a = this.options[t], s = n[r];
      r === "listeners" && this.updatePerActionListeners(t, a.listeners, s), g.array(s) ? a[r] = ri(s) : g.plainObject(s) ? (a[r] = _(a[r] || {}, Zt(s)), g.object(i.perAction[r]) && "enabled" in i.perAction[r] && (a[r].enabled = s.enabled !== !1)) : g.bool(s) && g.object(i.perAction[r]) ? a[r].enabled = s : a[r] = s;
    }
  }
  /**
   * The default function to get an Interactables bounding rect. Can be
   * overridden using {@link Interactable.rectChecker}.
   *
   * @param {Element} [element] The element to measure.
   * @return {Rect} The object's bounding rectangle.
   */
  getRect(t) {
    return t = t || (g.element(this.target) ? this.target : null), g.string(this.target) && (t = t || this._context.querySelector(this.target)), tn(t);
  }
  /**
   * Returns or sets the function used to calculate the interactable's
   * element's rectangle
   *
   * @param {function} [checker] A function which returns this Interactable's
   * bounding rectangle. See {@link Interactable.getRect}
   * @return {function | object} The checker function or this Interactable
   */
  rectChecker(t) {
    return g.func(t) ? (this.getRect = (n) => {
      const i = _({}, t.apply(this, n));
      return "width" in i || (i.width = i.right - i.left, i.height = i.bottom - i.top), i;
    }, this) : t === null ? (delete this.getRect, this) : this.getRect;
  }
  /** @internal */
  _backCompatOption(t, n) {
    if (mn(n) || g.object(n)) {
      this.options[t] = n;
      for (const i in this._actions.map)
        this.options[i][t] = n;
      return this;
    }
    return this.options[t];
  }
  /**
   * Gets or sets the origin of the Interactable's element.  The x and y
   * of the origin will be subtracted from action event coordinates.
   *
   * @param {Element | object | string} [origin] An HTML or SVG Element whose
   * rect will be used, an object eg. { x: 0, y: 0 } or string 'parent', 'self'
   * or any CSS selector
   *
   * @return {object} The current origin or this Interactable
   */
  origin(t) {
    return this._backCompatOption("origin", t);
  }
  /**
   * Returns or sets the mouse coordinate types used to calculate the
   * movement of the pointer.
   *
   * @param {string} [newValue] Use 'client' if you will be scrolling while
   * interacting; Use 'page' if you want autoScroll to work
   * @return {string | object} The current deltaSource or this Interactable
   */
  deltaSource(t) {
    return t === "page" || t === "client" ? (this.options.deltaSource = t, this) : this.options.deltaSource;
  }
  /** @internal */
  getAllElements() {
    const {
      target: t
    } = this;
    return g.string(t) ? Array.from(this._context.querySelectorAll(t)) : g.func(t) && t.getAllElements ? t.getAllElements() : g.element(t) ? [t] : [];
  }
  /**
   * Gets the selector context Node of the Interactable. The default is
   * `window.document`.
   *
   * @return {Node} The context Node of this Interactable
   */
  context() {
    return this._context;
  }
  inContext(t) {
    return this._context === t.ownerDocument || Ft(this._context, t);
  }
  /** @internal */
  testIgnoreAllow(t, n, i) {
    return !this.testIgnore(t.ignoreFrom, n, i) && this.testAllow(t.allowFrom, n, i);
  }
  /** @internal */
  testAllow(t, n, i) {
    return t ? g.element(i) ? g.string(t) ? Ue(i, t, n) : g.element(t) ? Ft(t, i) : !1 : !1 : !0;
  }
  /** @internal */
  testIgnore(t, n, i) {
    return !t || !g.element(i) ? !1 : g.string(t) ? Ue(i, t, n) : g.element(t) ? Ft(t, i) : !1;
  }
  /**
   * Calls listeners for the given InteractEvent type bound globally
   * and directly to this Interactable
   *
   * @param {InteractEvent} iEvent The InteractEvent object to be fired on this
   * Interactable
   * @return {Interactable} this Interactable
   */
  fire(t) {
    return this.events.fire(t), this;
  }
  /** @internal */
  _onOff(t, n, i, o, r) {
    g.object(n) && !g.array(n) && (o = i, i = null);
    const a = Nt(n, i, r);
    for (let s in a) {
      s === "wheel" && (s = tt.wheelEvent);
      for (const c of a[s])
        fe(s, this._actions) ? this.events[t === Ot.On ? "on" : "off"](s, c) : g.string(this.target) ? this._scopeEvents[t === Ot.On ? "addDelegate" : "removeDelegate"](this.target, this._context, s, c, o) : this._scopeEvents[t === Ot.On ? "add" : "remove"](this.target, s, c, o);
    }
    return this;
  }
  /**
   * Binds a listener for an InteractEvent, pointerEvent or DOM event.
   *
   * @param {string | array | object} types The types of events to listen
   * for
   * @param {function | array | object} [listener] The event listener function(s)
   * @param {object | boolean} [options] options object or useCapture flag for
   * addEventListener
   * @return {Interactable} This Interactable
   */
  on(t, n, i) {
    return this._onOff(Ot.On, t, n, i);
  }
  /**
   * Removes an InteractEvent, pointerEvent or DOM event listener.
   *
   * @param {string | array | object} types The types of events that were
   * listened for
   * @param {function | array | object} [listener] The event listener function(s)
   * @param {object | boolean} [options] options object or useCapture flag for
   * removeEventListener
   * @return {Interactable} This Interactable
   */
  off(t, n, i) {
    return this._onOff(Ot.Off, t, n, i);
  }
  /**
   * Reset the options of this Interactable
   *
   * @param {object} options The new settings to apply
   * @return {object} This Interactable
   */
  set(t) {
    const n = this._defaults;
    g.object(t) || (t = {}), this.options = Zt(n.base);
    for (const i in this._actions.methodDict) {
      const o = i, r = this._actions.methodDict[o];
      this.options[o] = {}, this.setPerAction(o, _(_({}, n.perAction), n.actions[o])), this[r](t[o]);
    }
    for (const i in t) {
      if (i === "getRect") {
        this.rectChecker(t.getRect);
        continue;
      }
      g.func(this[i]) && this[i](t[i]);
    }
    return this;
  }
  /**
   * Remove this interactable from the list of interactables and remove it's
   * action capabilities and event listeners
   */
  unset() {
    if (g.string(this.target))
      for (const t in this._scopeEvents.delegatedEvents) {
        const n = this._scopeEvents.delegatedEvents[t];
        for (let i = n.length - 1; i >= 0; i--) {
          const {
            selector: o,
            context: r,
            listeners: a
          } = n[i];
          o === this.target && r === this._context && n.splice(i, 1);
          for (let s = a.length - 1; s >= 0; s--)
            this._scopeEvents.removeDelegate(this.target, this._context, t, a[s][0], a[s][1]);
        }
      }
    else
      this._scopeEvents.remove(this.target, "all");
  }
}
class rr {
  constructor(t) {
    this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = t, t.addListeners({
      "interactable:unset": (n) => {
        let {
          interactable: i
        } = n;
        const {
          target: o
        } = i, r = g.string(o) ? this.selectorMap[o] : o[this.scope.id], a = ze(r, (s) => s === i);
        r.splice(a, 1);
      }
    });
  }
  new(t, n) {
    n = _(n || {}, {
      actions: this.scope.actions
    });
    const i = new this.scope.Interactable(t, n, this.scope.document, this.scope.events);
    return this.scope.addDocument(i._doc), this.list.push(i), g.string(t) ? (this.selectorMap[t] || (this.selectorMap[t] = []), this.selectorMap[t].push(i)) : (i.target[this.scope.id] || Object.defineProperty(t, this.scope.id, {
      value: [],
      configurable: !0
    }), t[this.scope.id].push(i)), this.scope.fire("interactable:new", {
      target: t,
      options: n,
      interactable: i,
      win: this.scope._win
    }), i;
  }
  getExisting(t, n) {
    const i = n && n.context || this.scope.document, o = g.string(t), r = o ? this.selectorMap[t] : t[this.scope.id];
    if (r)
      return ye(r, (a) => a._context === i && (o || a.inContext(t)));
  }
  forEachMatch(t, n) {
    for (const i of this.list) {
      let o;
      if ((g.string(i.target) ? (
        // target is a selector and the element matches
        g.element(t) && Xt(t, i.target)
      ) : (
        // target is the element
        t === i.target
      )) && // the element is in context
      i.inContext(t) && (o = n(i)), o !== void 0)
        return o;
    }
  }
}
function sr(e) {
  const t = (n, i) => {
    let o = e.interactables.getExisting(n, i);
    return o || (o = e.interactables.new(n, i), o.events.global = t.globalEvents), o;
  };
  return t.getPointerAverage = ci, t.getTouchBBox = Bo, t.getTouchDistance = Lo, t.getTouchAngle = Wo, t.getElementRect = tn, t.getElementClientRect = Qe, t.matchesSelector = Xt, t.closest = Jn, t.globalEvents = {}, t.version = "1.10.26", t.scope = e, t.use = function(n, i) {
    return this.scope.usePlugin(n, i), this;
  }, t.isSet = function(n, i) {
    return !!this.scope.interactables.get(n, i && i.context);
  }, t.on = ce(function(i, o, r) {
    if (g.string(i) && i.search(" ") !== -1 && (i = i.trim().split(/ +/)), g.array(i)) {
      for (const a of i)
        this.on(a, o, r);
      return this;
    }
    if (g.object(i)) {
      for (const a in i)
        this.on(a, i[a], o);
      return this;
    }
    return fe(i, this.scope.actions) ? this.globalEvents[i] ? this.globalEvents[i].push(o) : this.globalEvents[i] = [o] : this.scope.events.add(this.scope.document, i, o, {
      options: r
    }), this;
  }, "The interact.on() method is being deprecated"), t.off = ce(function(i, o, r) {
    if (g.string(i) && i.search(" ") !== -1 && (i = i.trim().split(/ +/)), g.array(i)) {
      for (const a of i)
        this.off(a, o, r);
      return this;
    }
    if (g.object(i)) {
      for (const a in i)
        this.off(a, i[a], o);
      return this;
    }
    if (fe(i, this.scope.actions)) {
      let a;
      i in this.globalEvents && (a = this.globalEvents[i].indexOf(o)) !== -1 && this.globalEvents[i].splice(a, 1);
    } else
      this.scope.events.remove(this.scope.document, i, o, r);
    return this;
  }, "The interact.off() method is being deprecated"), t.debug = function() {
    return this.scope;
  }, t.supportsTouch = function() {
    return tt.supportsTouch;
  }, t.supportsPointerEvent = function() {
    return tt.supportsPointerEvent;
  }, t.stop = function() {
    for (const n of this.scope.interactions.list)
      n.stop();
    return this;
  }, t.pointerMoveTolerance = function(n) {
    return g.number(n) ? (this.scope.interactions.pointerMoveTolerance = n, this) : this.scope.interactions.pointerMoveTolerance;
  }, t.addDocument = function(n, i) {
    this.scope.addDocument(n, i);
  }, t.removeDocument = function(n) {
    this.scope.removeDocument(n);
  }, t;
}
class ar {
  constructor() {
    this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = tt, this.defaults = Zt(hi), this.Eventable = si, this.actions = {
      map: {},
      phases: {
        start: !0,
        move: !0,
        end: !0
      },
      methodDict: {},
      phaselessTypes: {}
    }, this.interactStatic = sr(this), this.InteractEvent = sn, this.Interactable = void 0, this.interactables = new rr(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = {
      list: [],
      map: {}
    }, this.onWindowUnload = (n) => this.removeDocument(n.target);
    const t = this;
    this.Interactable = class extends or {
      get _defaults() {
        return t.defaults;
      }
      set(n) {
        return super.set(n), t.fire("interactable:set", {
          options: n,
          interactable: this
        }), this;
      }
      unset() {
        super.unset();
        const n = t.interactables.list.indexOf(this);
        n < 0 || (t.interactables.list.splice(n, 1), t.fire("interactable:unset", {
          interactable: this
        }));
      }
    };
  }
  addListeners(t, n) {
    this.listenerMaps.push({
      id: n,
      map: t
    });
  }
  fire(t, n) {
    for (const {
      map: {
        [t]: i
      }
    } of this.listenerMaps)
      if (i && i(n, this, t) === !1)
        return !1;
  }
  init(t) {
    return this.isInitialized ? this : lr(this, t);
  }
  pluginIsInstalled(t) {
    const {
      id: n
    } = t;
    return n ? !!this._plugins.map[n] : this._plugins.list.indexOf(t) !== -1;
  }
  usePlugin(t, n) {
    if (!this.isInitialized)
      return this;
    if (this.pluginIsInstalled(t))
      return this;
    if (t.id && (this._plugins.map[t.id] = t), this._plugins.list.push(t), t.install && t.install(this, n), t.listeners && t.before) {
      let i = 0;
      const o = this.listenerMaps.length, r = t.before.reduce((a, s) => (a[s] = !0, a[Tn(s)] = !0, a), {});
      for (; i < o; i++) {
        const a = this.listenerMaps[i].id;
        if (a && (r[a] || r[Tn(a)]))
          break;
      }
      this.listenerMaps.splice(i, 0, {
        id: t.id,
        map: t.listeners
      });
    } else
      t.listeners && this.listenerMaps.push({
        id: t.id,
        map: t.listeners
      });
    return this;
  }
  addDocument(t, n) {
    if (this.getDocIndex(t) !== -1)
      return !1;
    const i = jt(t);
    n = n ? _({}, n) : {}, this.documents.push({
      doc: t,
      options: n
    }), this.events.documents.push(t), t !== this.document && this.events.add(i, "unload", this.onWindowUnload), this.fire("scope:add-document", {
      doc: t,
      window: i,
      scope: this,
      options: n
    });
  }
  removeDocument(t) {
    const n = this.getDocIndex(t), i = jt(t), o = this.documents[n].options;
    this.events.remove(i, "unload", this.onWindowUnload), this.documents.splice(n, 1), this.events.documents.splice(n, 1), this.fire("scope:remove-document", {
      doc: t,
      window: i,
      scope: this,
      options: o
    });
  }
  getDocIndex(t) {
    for (let n = 0; n < this.documents.length; n++)
      if (this.documents[n].doc === t)
        return n;
    return -1;
  }
  getDocOptions(t) {
    const n = this.getDocIndex(t);
    return n === -1 ? null : this.documents[n].options;
  }
  now() {
    return (this.window.Date || Date).now();
  }
}
function lr(e, t) {
  return e.isInitialized = !0, g.window(t) && Vn(t), U.init(t), tt.init(t), Jt.init(t), e.window = t, e.document = t.document, e.usePlugin(ir), e.usePlugin(Xo), e;
}
function Tn(e) {
  return e && e.replace(/\/.*$/, "");
}
const vi = new ar(), Mt = vi.interactStatic, cr = typeof globalThis < "u" ? globalThis : window;
vi.init(cr);
Mt.use(Do);
function ur(e) {
  const {
    defaults: t,
    actions: n
  } = e;
  e.autoScroll = P, P.now = () => e.now(), n.phaselessTypes.autoscroll = !0, t.perAction.autoScroll = P.defaults;
}
const P = {
  defaults: {
    enabled: !1,
    margin: 60,
    // the item that is scrolled (Window or HTMLElement)
    container: null,
    // the scroll speed in pixels per second
    speed: 300
  },
  now: Date.now,
  interaction: null,
  i: 0,
  // the handle returned by window.setInterval
  // Direction each pulse is to scroll in
  x: 0,
  y: 0,
  isScrolling: !1,
  prevTime: 0,
  margin: 0,
  speed: 0,
  start(e) {
    P.isScrolling = !0, Jt.cancel(P.i), e.autoScroll = P, P.interaction = e, P.prevTime = P.now(), P.i = Jt.request(P.scroll);
  },
  stop() {
    P.isScrolling = !1, P.interaction && (P.interaction.autoScroll = null), Jt.cancel(P.i);
  },
  // scroll the window by the values in scroll.x/y
  scroll() {
    const {
      interaction: e
    } = P, {
      interactable: t,
      element: n
    } = e, i = e.prepared.name, o = t.options[i].autoScroll, r = In(o.container, t, n), a = P.now(), s = (a - P.prevTime) / 1e3, c = o.speed * s;
    if (c >= 1) {
      const l = {
        x: P.x * c,
        y: P.y * c
      };
      if (l.x || l.y) {
        const u = zn(r);
        g.window(r) ? r.scrollBy(l.x, l.y) : r && (r.scrollLeft += l.x, r.scrollTop += l.y);
        const f = zn(r), h = {
          x: f.x - u.x,
          y: f.y - u.y
        };
        (h.x || h.y) && t.fire({
          type: "autoscroll",
          target: n,
          interactable: t,
          delta: h,
          interaction: e,
          container: r
        });
      }
      P.prevTime = a;
    }
    P.isScrolling && (Jt.cancel(P.i), P.i = Jt.request(P.scroll));
  },
  check(e, t) {
    var n;
    return (n = e.options[t].autoScroll) == null ? void 0 : n.enabled;
  },
  onInteractionMove(e) {
    let {
      interaction: t,
      pointer: n
    } = e;
    if (!(t.interacting() && P.check(t.interactable, t.prepared.name)))
      return;
    if (t.simulation) {
      P.x = P.y = 0;
      return;
    }
    let i, o, r, a;
    const {
      interactable: s,
      element: c
    } = t, l = t.prepared.name, u = s.options[l].autoScroll, f = In(u.container, s, c);
    if (g.window(f))
      a = n.clientX < P.margin, i = n.clientY < P.margin, o = n.clientX > f.innerWidth - P.margin, r = n.clientY > f.innerHeight - P.margin;
    else {
      const h = Qe(f);
      a = n.clientX < h.left + P.margin, i = n.clientY < h.top + P.margin, o = n.clientX > h.right - P.margin, r = n.clientY > h.bottom - P.margin;
    }
    P.x = o ? 1 : a ? -1 : 0, P.y = r ? 1 : i ? -1 : 0, P.isScrolling || (P.margin = u.margin, P.speed = u.speed, P.start(t));
  }
};
function In(e, t, n) {
  return (g.string(e) ? fi(e, t, n) : e) || jt(n);
}
function zn(e) {
  return g.window(e) && (e = window.document.body), {
    x: e.scrollLeft,
    y: e.scrollTop
  };
}
const fr = {
  id: "auto-scroll",
  install: ur,
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.autoScroll = null;
    },
    "interactions:destroy": (e) => {
      let {
        interaction: t
      } = e;
      t.autoScroll = null, P.stop(), P.interaction && (P.interaction = null);
    },
    "interactions:stop": P.stop,
    "interactions:action-move": (e) => P.onInteractionMove(e)
  }
};
Mt.use(fr);
function dr(e) {
  const {
    actions: t,
    Interactable: n,
    defaults: i
  } = e;
  n.prototype.draggable = be.draggable, t.map.drag = be, t.methodDict.drag = "draggable", i.actions.drag = be.defaults;
}
function Le(e) {
  let {
    interaction: t
  } = e;
  if (t.prepared.name !== "drag")
    return;
  const n = t.prepared.axis;
  n === "x" ? (t.coords.cur.page.y = t.coords.start.page.y, t.coords.cur.client.y = t.coords.start.client.y, t.coords.velocity.client.y = 0, t.coords.velocity.page.y = 0) : n === "y" && (t.coords.cur.page.x = t.coords.start.page.x, t.coords.cur.client.x = t.coords.start.client.x, t.coords.velocity.client.x = 0, t.coords.velocity.page.x = 0);
}
function Mn(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "drag")
    return;
  const i = n.prepared.axis;
  if (i === "x" || i === "y") {
    const o = i === "x" ? "y" : "x";
    t.page[o] = n.coords.start.page[o], t.client[o] = n.coords.start.client[o], t.delta[o] = 0;
  }
}
const hr = function(t) {
  return g.object(t) ? (this.options.drag.enabled = t.enabled !== !1, this.setPerAction("drag", t), this.setOnEvents("drag", t), /^(xy|x|y|start)$/.test(t.lockAxis) && (this.options.drag.lockAxis = t.lockAxis), /^(xy|x|y)$/.test(t.startAxis) && (this.options.drag.startAxis = t.startAxis), this) : g.bool(t) ? (this.options.drag.enabled = t, this) : this.options.drag;
}, be = {
  id: "actions/drag",
  install: dr,
  listeners: {
    "interactions:before-action-move": Le,
    "interactions:action-resume": Le,
    // dragmove
    "interactions:action-move": Mn,
    "auto-start:check": (e) => {
      const {
        interaction: t,
        interactable: n,
        buttons: i
      } = e, o = n.options.drag;
      if (!(!(o && o.enabled) || // check mouseButton setting if the pointer is down
      t.pointerIsDown && /mouse|pointer/.test(t.pointerType) && !(i & n.options.drag.mouseButtons)))
        return e.action = {
          name: "drag",
          axis: o.lockAxis === "start" ? o.startAxis : o.lockAxis
        }, !1;
    }
  },
  draggable: hr,
  beforeMove: Le,
  move: Mn,
  defaults: {
    startAxis: "xy",
    lockAxis: "xy"
  },
  getCursor() {
    return "move";
  },
  filterEventType: (e) => e.search("drag") === 0
};
Mt.use(be);
function pr(e) {
  const {
    actions: t,
    browser: n,
    Interactable: i,
    // tslint:disable-line no-shadowed-variable
    defaults: o
  } = e;
  zt.cursors = yr(n), zt.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, i.prototype.resizable = function(r) {
    return vr(this, r, e);
  }, t.map.resize = zt, t.methodDict.resize = "resizable", o.actions.resize = zt.defaults;
}
function gr(e) {
  const {
    interaction: t,
    interactable: n,
    element: i,
    rect: o,
    buttons: r
  } = e;
  if (!o)
    return;
  const a = _({}, t.coords.cur.page), s = n.options.resize;
  if (!(!(s && s.enabled) || // check mouseButton setting if the pointer is down
  t.pointerIsDown && /mouse|pointer/.test(t.pointerType) && !(r & s.mouseButtons))) {
    if (g.object(s.edges)) {
      const c = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      };
      for (const l in c)
        c[l] = mr(l, s.edges[l], a, t._latestPointer.eventTarget, i, o, s.margin || zt.defaultMargin);
      c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
        name: "resize",
        edges: c
      });
    } else {
      const c = s.axis !== "y" && a.x > o.right - zt.defaultMargin, l = s.axis !== "x" && a.y > o.bottom - zt.defaultMargin;
      (c || l) && (e.action = {
        name: "resize",
        axes: (c ? "x" : "") + (l ? "y" : "")
      });
    }
    return e.action ? !1 : void 0;
  }
}
function vr(e, t, n) {
  return g.object(t) ? (e.options.resize.enabled = t.enabled !== !1, e.setPerAction("resize", t), e.setOnEvents("resize", t), g.string(t.axis) && /^x$|^y$|^xy$/.test(t.axis) ? e.options.resize.axis = t.axis : t.axis === null && (e.options.resize.axis = n.defaults.actions.resize.axis), g.bool(t.preserveAspectRatio) ? e.options.resize.preserveAspectRatio = t.preserveAspectRatio : g.bool(t.square) && (e.options.resize.square = t.square), e) : g.bool(t) ? (e.options.resize.enabled = t, e) : e.options.resize;
}
function mr(e, t, n, i, o, r, a) {
  if (!t)
    return !1;
  if (t === !0) {
    const s = g.number(r.width) ? r.width : r.right - r.left, c = g.number(r.height) ? r.height : r.bottom - r.top;
    if (a = Math.min(a, Math.abs((e === "left" || e === "right" ? s : c) / 2)), s < 0 && (e === "left" ? e = "right" : e === "right" && (e = "left")), c < 0 && (e === "top" ? e = "bottom" : e === "bottom" && (e = "top")), e === "left") {
      const l = s >= 0 ? r.left : r.right;
      return n.x < l + a;
    }
    if (e === "top") {
      const l = c >= 0 ? r.top : r.bottom;
      return n.y < l + a;
    }
    if (e === "right")
      return n.x > (s >= 0 ? r.right : r.left) - a;
    if (e === "bottom")
      return n.y > (c >= 0 ? r.bottom : r.top) - a;
  }
  return g.element(i) ? g.element(t) ? (
    // the value is an element to use as a resize handle
    t === i
  ) : (
    // otherwise check if element matches value as selector
    Ue(i, t, o)
  ) : !1;
}
function yr(e) {
  return e.isIe9 ? {
    x: "e-resize",
    y: "s-resize",
    xy: "se-resize",
    top: "n-resize",
    left: "w-resize",
    bottom: "s-resize",
    right: "e-resize",
    topleft: "se-resize",
    bottomright: "se-resize",
    topright: "ne-resize",
    bottomleft: "ne-resize"
  } : {
    x: "ew-resize",
    y: "ns-resize",
    xy: "nwse-resize",
    top: "ns-resize",
    left: "ew-resize",
    bottom: "ns-resize",
    right: "ew-resize",
    topleft: "nwse-resize",
    bottomright: "nwse-resize",
    topright: "nesw-resize",
    bottomleft: "nesw-resize"
  };
}
function br(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.prepared.edges)
    return;
  const i = t, o = n.rect;
  n._rects = {
    start: _({}, o),
    corrected: _({}, o),
    previous: _({}, o),
    delta: {
      left: 0,
      right: 0,
      width: 0,
      top: 0,
      bottom: 0,
      height: 0
    }
  }, i.edges = n.prepared.edges, i.rect = n._rects.corrected, i.deltaRect = n._rects.delta;
}
function xr(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.prepared.edges)
    return;
  const i = t, r = n.interactable.options.resize.invert, a = r === "reposition" || r === "negate", s = n.rect, {
    start: c,
    corrected: l,
    delta: u,
    previous: f
  } = n._rects;
  if (_(f, l), a) {
    if (_(l, s), r === "reposition") {
      if (l.top > l.bottom) {
        const h = l.top;
        l.top = l.bottom, l.bottom = h;
      }
      if (l.left > l.right) {
        const h = l.left;
        l.left = l.right, l.right = h;
      }
    }
  } else
    l.top = Math.min(s.top, c.bottom), l.bottom = Math.max(s.bottom, c.top), l.left = Math.min(s.left, c.right), l.right = Math.max(s.right, c.left);
  l.width = l.right - l.left, l.height = l.bottom - l.top;
  for (const h in l)
    u[h] = l[h] - f[h];
  i.edges = n.prepared.edges, i.rect = l, i.deltaRect = u;
}
function wr(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.prepared.edges)
    return;
  const i = t;
  i.edges = n.prepared.edges, i.rect = n._rects.corrected, i.deltaRect = n._rects.delta;
}
function Cn(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.resizeAxes)
    return;
  const i = n.interactable.options, o = t;
  i.resize.square ? (n.resizeAxes === "y" ? o.delta.x = o.delta.y : o.delta.y = o.delta.x, o.axes = "xy") : (o.axes = n.resizeAxes, n.resizeAxes === "x" ? o.delta.y = 0 : n.resizeAxes === "y" && (o.delta.x = 0));
}
const zt = {
  id: "actions/resize",
  before: ["actions/drag"],
  install: pr,
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.resizeAxes = "xy";
    },
    "interactions:action-start": (e) => {
      br(e), Cn(e);
    },
    "interactions:action-move": (e) => {
      xr(e), Cn(e);
    },
    "interactions:action-end": wr,
    "auto-start:check": gr
  },
  defaults: {
    square: !1,
    preserveAspectRatio: !1,
    axis: "xy",
    // use default margin
    margin: NaN,
    // object with props left, right, top, bottom which are
    // true/false values to resize when the pointer is over that edge,
    // CSS selectors to match the handles for each direction
    // or the Elements for each handle
    edges: null,
    // a value of 'none' will limit the resize rect to a minimum of 0x0
    // 'negate' will alow the rect to have negative width/height
    // 'reposition' will keep the width/height positive by swapping
    // the top and bottom edges and/or swapping the left and right edges
    invert: "none"
  },
  cursors: null,
  getCursor(e) {
    let {
      edges: t,
      axis: n,
      name: i
    } = e;
    const o = zt.cursors;
    let r = null;
    if (n)
      r = o[i + n];
    else if (t) {
      let a = "";
      for (const s of ["top", "bottom", "left", "right"])
        t[s] && (a += s);
      r = o[a];
    }
    return r;
  },
  filterEventType: (e) => e.search("resize") === 0,
  defaultMargin: null
};
Mt.use(zt);
var Er = () => {
}, Sr = () => {
}, Tr = (e) => {
  const t = [["x", "y"], ["left", "top"], ["right", "bottom"], ["width", "height"]].filter((i) => {
    let [o, r] = i;
    return o in e || r in e;
  }), n = (i, o) => {
    const {
      range: r,
      limits: a = {
        left: -1 / 0,
        right: 1 / 0,
        top: -1 / 0,
        bottom: 1 / 0
      },
      offset: s = {
        x: 0,
        y: 0
      }
    } = e, c = {
      range: r,
      grid: e,
      x: null,
      y: null
    };
    for (const [l, u] of t) {
      const f = Math.round((i - s.x) / e[l]), h = Math.round((o - s.y) / e[u]);
      c[l] = Math.max(a.left, Math.min(a.right, f * e[l] + s.x)), c[u] = Math.max(a.top, Math.min(a.bottom, h * e[u] + s.y));
    }
    return c;
  };
  return n.grid = e, n.coordFields = t, n;
}, Ir = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  edgeTarget: Er,
  elements: Sr,
  grid: Tr
});
const zr = {
  id: "snappers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    t.snappers = _(t.snappers || {}, Ir), t.createSnapGrid = t.snappers.grid;
  }
};
class mi {
  constructor(t) {
    this.states = [], this.startOffset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = me(), this.edges = {
      left: !1,
      right: !1,
      top: !1,
      bottom: !1
    };
  }
  start(t, n) {
    let {
      phase: i
    } = t;
    const {
      interaction: o
    } = this, r = Mr(o);
    this.prepareStates(r), this.startEdges = _({}, o.edges), this.edges = _({}, this.startEdges), this.startOffset = Cr(o.rect, n), this.startDelta = {
      x: 0,
      y: 0
    };
    const a = this.fillArg({
      phase: i,
      pageCoords: n,
      preEnd: !1
    });
    return this.result = me(), this.startAll(a), this.result = this.setAll(a);
  }
  fillArg(t) {
    const {
      interaction: n
    } = this;
    return t.interaction = n, t.interactable = n.interactable, t.element = n.element, t.rect || (t.rect = n.rect), t.edges || (t.edges = this.startEdges), t.startOffset = this.startOffset, t;
  }
  startAll(t) {
    for (const n of this.states)
      n.methods.start && (t.state = n, n.methods.start(t));
  }
  setAll(t) {
    const {
      phase: n,
      preEnd: i,
      skipModifiers: o,
      rect: r,
      edges: a
    } = t;
    t.coords = _({}, t.pageCoords), t.rect = _({}, r), t.edges = _({}, a);
    const s = o ? this.states.slice(o) : this.states, c = me(t.coords, t.rect);
    for (const h of s) {
      var l;
      const {
        options: m
      } = h, x = _({}, t.coords);
      let T = null;
      (l = h.methods) != null && l.set && this.shouldDo(m, i, n) && (t.state = h, T = h.methods.set(t), on(t.edges, t.rect, {
        x: t.coords.x - x.x,
        y: t.coords.y - x.y
      })), c.eventProps.push(T);
    }
    _(this.edges, t.edges), c.delta.x = t.coords.x - t.pageCoords.x, c.delta.y = t.coords.y - t.pageCoords.y, c.rectDelta.left = t.rect.left - r.left, c.rectDelta.right = t.rect.right - r.right, c.rectDelta.top = t.rect.top - r.top, c.rectDelta.bottom = t.rect.bottom - r.bottom;
    const u = this.result.coords, f = this.result.rect;
    if (u && f) {
      const h = c.rect.left !== f.left || c.rect.right !== f.right || c.rect.top !== f.top || c.rect.bottom !== f.bottom;
      c.changed = h || u.x !== c.coords.x || u.y !== c.coords.y;
    }
    return c;
  }
  applyToInteraction(t) {
    const {
      interaction: n
    } = this, {
      phase: i
    } = t, o = n.coords.cur, r = n.coords.start, {
      result: a,
      startDelta: s
    } = this, c = a.delta;
    i === "start" && _(this.startDelta, a.delta);
    for (const [f, h] of [[r, s], [o, c]])
      f.page.x += h.x, f.page.y += h.y, f.client.x += h.x, f.client.y += h.y;
    const {
      rectDelta: l
    } = this.result, u = t.rect || n.rect;
    u.left += l.left, u.right += l.right, u.top += l.top, u.bottom += l.bottom, u.width = u.right - u.left, u.height = u.bottom - u.top;
  }
  setAndApply(t) {
    const {
      interaction: n
    } = this, {
      phase: i,
      preEnd: o,
      skipModifiers: r
    } = t, a = this.setAll(this.fillArg({
      preEnd: o,
      phase: i,
      pageCoords: t.modifiedCoords || n.coords.cur.page
    }));
    if (this.result = a, !a.changed && (!r || r < this.states.length) && n.interacting())
      return !1;
    if (t.modifiedCoords) {
      const {
        page: s
      } = n.coords.cur, c = {
        x: t.modifiedCoords.x - s.x,
        y: t.modifiedCoords.y - s.y
      };
      a.coords.x += c.x, a.coords.y += c.y, a.delta.x += c.x, a.delta.y += c.y;
    }
    this.applyToInteraction(t);
  }
  beforeEnd(t) {
    const {
      interaction: n,
      event: i
    } = t, o = this.states;
    if (!o || !o.length)
      return;
    let r = !1;
    for (const a of o) {
      t.state = a;
      const {
        options: s,
        methods: c
      } = a, l = c.beforeEnd && c.beforeEnd(t);
      if (l)
        return this.endResult = l, !1;
      r = r || !r && this.shouldDo(s, !0, t.phase, !0);
    }
    r && n.move({
      event: i,
      preEnd: !0
    });
  }
  stop(t) {
    const {
      interaction: n
    } = t;
    if (!this.states || !this.states.length)
      return;
    const i = _({
      states: this.states,
      interactable: n.interactable,
      element: n.element,
      rect: null
    }, t);
    this.fillArg(i);
    for (const o of this.states)
      i.state = o, o.methods.stop && o.methods.stop(i);
    this.states = null, this.endResult = null;
  }
  prepareStates(t) {
    this.states = [];
    for (let n = 0; n < t.length; n++) {
      const {
        options: i,
        methods: o,
        name: r
      } = t[n];
      this.states.push({
        options: i,
        methods: o,
        index: n,
        name: r
      });
    }
    return this.states;
  }
  restoreInteractionCoords(t) {
    let {
      interaction: {
        coords: n,
        rect: i,
        modification: o
      }
    } = t;
    if (!o.result)
      return;
    const {
      startDelta: r
    } = o, {
      delta: a,
      rectDelta: s
    } = o.result, c = [[n.start, r], [n.cur, a]];
    for (const [l, u] of c)
      l.page.x -= u.x, l.page.y -= u.y, l.client.x -= u.x, l.client.y -= u.y;
    i.left -= s.left, i.right -= s.right, i.top -= s.top, i.bottom -= s.bottom;
  }
  shouldDo(t, n, i, o) {
    return (
      // ignore disabled modifiers
      !(!t || t.enabled === !1 || // check if we require endOnly option to fire move before end
      o && !t.endOnly || // don't apply endOnly modifiers when not ending
      t.endOnly && !n || // check if modifier should run be applied on start
      i === "start" && !t.setStart)
    );
  }
  copyFrom(t) {
    this.startOffset = t.startOffset, this.startDelta = t.startDelta, this.startEdges = t.startEdges, this.edges = t.edges, this.states = t.states.map((n) => Zt(n)), this.result = me(_({}, t.result.coords), _({}, t.result.rect));
  }
  destroy() {
    for (const t in this)
      this[t] = null;
  }
}
function me(e, t) {
  return {
    rect: t,
    coords: e,
    delta: {
      x: 0,
      y: 0
    },
    rectDelta: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventProps: [],
    changed: !0
  };
}
function Mr(e) {
  const t = e.interactable.options[e.prepared.name], n = t.modifiers;
  return n && n.length ? n : ["snap", "snapSize", "snapEdges", "restrict", "restrictEdges", "restrictSize"].map((i) => {
    const o = t[i];
    return o && o.enabled && {
      options: o,
      methods: o._methods
    };
  }).filter((i) => !!i);
}
function Cr(e, t) {
  return e ? {
    left: t.x - e.left,
    top: t.y - e.top,
    right: e.right - t.x,
    bottom: e.bottom - t.y
  } : {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
}
function Rt(e, t) {
  const {
    defaults: n
  } = e, i = {
    start: e.start,
    set: e.set,
    beforeEnd: e.beforeEnd,
    stop: e.stop
  }, o = (r) => {
    const a = r || {};
    a.enabled = a.enabled !== !1;
    for (const c in n)
      c in a || (a[c] = n[c]);
    const s = {
      options: a,
      methods: i,
      name: t,
      enable: () => (a.enabled = !0, s),
      disable: () => (a.enabled = !1, s)
    };
    return s;
  };
  return t && typeof t == "string" && (o._defaults = n, o._methods = i), o;
}
function We(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  const i = n.modification.result;
  i && (t.modifiers = i.eventProps);
}
const Dr = {
  id: "modifiers/base",
  before: ["actions"],
  install: (e) => {
    e.defaults.perAction.modifiers = [];
  },
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.modification = new mi(t);
    },
    "interactions:before-action-start": (e) => {
      const {
        interaction: t
      } = e, n = e.interaction.modification;
      n.start(e, t.coords.start.page), t.edges = n.edges, n.applyToInteraction(e);
    },
    "interactions:before-action-move": (e) => {
      const {
        interaction: t
      } = e, {
        modification: n
      } = t, i = n.setAndApply(e);
      return t.edges = n.edges, i;
    },
    "interactions:before-action-end": (e) => {
      const {
        interaction: t
      } = e, {
        modification: n
      } = t, i = n.beforeEnd(e);
      return t.edges = n.startEdges, i;
    },
    "interactions:action-start": We,
    "interactions:action-move": We,
    "interactions:action-end": We,
    "interactions:after-action-start": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:after-action-move": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:stop": (e) => e.interaction.modification.stop(e)
  }
}, _r = {
  start(e) {
    const {
      state: t,
      rect: n,
      edges: i,
      pageCoords: o
    } = e;
    let {
      ratio: r,
      enabled: a
    } = t.options;
    const {
      equalDelta: s,
      modifiers: c
    } = t.options;
    r === "preserve" && (r = n.width / n.height), t.startCoords = _({}, o), t.startRect = _({}, n), t.ratio = r, t.equalDelta = s;
    const l = t.linkedEdges = {
      top: i.top || i.left && !i.bottom,
      left: i.left || i.top && !i.right,
      bottom: i.bottom || i.right && !i.top,
      right: i.right || i.bottom && !i.left
    };
    if (t.xIsPrimaryAxis = !!(i.left || i.right), t.equalDelta) {
      const f = (l.left ? 1 : -1) * (l.top ? 1 : -1);
      t.edgeSign = {
        x: f,
        y: f
      };
    } else
      t.edgeSign = {
        x: l.left ? -1 : 1,
        y: l.top ? -1 : 1
      };
    if (a !== !1 && _(i, l), !(c != null && c.length))
      return;
    const u = new mi(e.interaction);
    u.copyFrom(e.interaction.modification), u.prepareStates(c), t.subModification = u, u.startAll({
      ...e
    });
  },
  set(e) {
    const {
      state: t,
      rect: n,
      coords: i
    } = e, {
      linkedEdges: o
    } = t, r = _({}, i), a = t.equalDelta ? Pr : Or;
    if (_(e.edges, o), a(t, t.xIsPrimaryAxis, i, n), !t.subModification)
      return null;
    const s = _({}, n);
    on(o, s, {
      x: i.x - r.x,
      y: i.y - r.y
    });
    const c = t.subModification.setAll({
      ...e,
      rect: s,
      edges: o,
      pageCoords: i,
      prevCoords: i,
      prevRect: s
    }), {
      delta: l
    } = c;
    if (c.changed) {
      const u = Math.abs(l.x) > Math.abs(l.y);
      a(t, u, c.coords, c.rect), _(i, c.coords);
    }
    return c.eventProps;
  },
  defaults: {
    ratio: "preserve",
    equalDelta: !1,
    modifiers: [],
    enabled: !1
  }
};
function Pr(e, t, n) {
  let {
    startCoords: i,
    edgeSign: o
  } = e;
  t ? n.y = i.y + (n.x - i.x) * o.y : n.x = i.x + (n.y - i.y) * o.x;
}
function Or(e, t, n, i) {
  let {
    startRect: o,
    startCoords: r,
    ratio: a,
    edgeSign: s
  } = e;
  if (t) {
    const c = i.width / a;
    n.y = r.y + (c - o.height) * s.y;
  } else {
    const c = i.height * a;
    n.x = r.x + (c - o.width) * s.x;
  }
}
var kr = Rt(_r, "aspectRatio");
function Ar(e) {
  let {
    rect: t,
    startOffset: n,
    state: i,
    interaction: o,
    pageCoords: r
  } = e;
  const {
    options: a
  } = i, {
    elementRect: s
  } = a, c = _({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }, a.offset || {});
  if (t && s) {
    const l = Yt(a.restriction, o, r);
    if (l) {
      const u = l.right - l.left - t.width, f = l.bottom - l.top - t.height;
      u < 0 && (c.left += u, c.right += u), f < 0 && (c.top += f, c.bottom += f);
    }
    c.left += n.left - t.width * s.left, c.top += n.top - t.height * s.top, c.right += n.right - t.width * (1 - s.right), c.bottom += n.bottom - t.height * (1 - s.bottom);
  }
  i.offset = c;
}
function Rr(e) {
  let {
    coords: t,
    interaction: n,
    state: i
  } = e;
  const {
    options: o,
    offset: r
  } = i, a = Yt(o.restriction, n, t);
  if (!a)
    return;
  const s = Ko(a);
  t.x = Math.max(Math.min(s.right - r.right, t.x), s.left + r.left), t.y = Math.max(Math.min(s.bottom - r.bottom, t.y), s.top + r.top);
}
function Yt(e, t, n) {
  return g.func(e) ? ue(e, t.interactable, t.element, [n.x, n.y, t]) : ue(e, t.interactable, t.element);
}
const Hr = {
  restriction: null,
  elementRect: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Ee = {
  start: Ar,
  set: Rr,
  defaults: Hr
};
var $r = Rt(Ee, "restrict");
const yi = {
  top: 1 / 0,
  left: 1 / 0,
  bottom: -1 / 0,
  right: -1 / 0
}, bi = {
  top: -1 / 0,
  left: -1 / 0,
  bottom: 1 / 0,
  right: 1 / 0
};
function Br(e) {
  let {
    interaction: t,
    startOffset: n,
    state: i
  } = e;
  const {
    options: o
  } = i;
  let r;
  if (o) {
    const a = Yt(o.offset, t, t.coords.start.page);
    r = Ce(a);
  }
  r = r || {
    x: 0,
    y: 0
  }, i.offset = {
    top: r.y + n.top,
    left: r.x + n.left,
    bottom: r.y - n.bottom,
    right: r.x - n.right
  };
}
function Lr(e) {
  let {
    coords: t,
    edges: n,
    interaction: i,
    state: o
  } = e;
  const {
    offset: r,
    options: a
  } = o;
  if (!n)
    return;
  const s = _({}, t), c = Yt(a.inner, i, s) || {}, l = Yt(a.outer, i, s) || {};
  Dn(c, yi), Dn(l, bi), n.top ? t.y = Math.min(Math.max(l.top + r.top, s.y), c.top + r.top) : n.bottom && (t.y = Math.max(Math.min(l.bottom + r.bottom, s.y), c.bottom + r.bottom)), n.left ? t.x = Math.min(Math.max(l.left + r.left, s.x), c.left + r.left) : n.right && (t.x = Math.max(Math.min(l.right + r.right, s.x), c.right + r.right));
}
function Dn(e, t) {
  for (const n of ["top", "left", "bottom", "right"])
    n in e || (e[n] = t[n]);
  return e;
}
const Wr = {
  inner: null,
  outer: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, ae = {
  noInner: yi,
  noOuter: bi,
  start: Br,
  set: Lr,
  defaults: Wr
};
var Fr = Rt(ae, "restrictEdges");
const Nr = _({
  get elementRect() {
    return {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1
    };
  },
  set elementRect(e) {
  }
}, Ee.defaults), jr = {
  start: Ee.start,
  set: Ee.set,
  defaults: Nr
};
var Xr = Rt(jr, "restrictRect");
const Yr = {
  width: -1 / 0,
  height: -1 / 0
}, Gr = {
  width: 1 / 0,
  height: 1 / 0
};
function qr(e) {
  return ae.start(e);
}
function Ur(e) {
  const {
    interaction: t,
    state: n,
    rect: i,
    edges: o
  } = e, {
    options: r
  } = n;
  if (!o)
    return;
  const a = wn(Yt(r.min, t, e.coords)) || Yr, s = wn(Yt(r.max, t, e.coords)) || Gr;
  n.options = {
    endOnly: r.endOnly,
    inner: _({}, ae.noInner),
    outer: _({}, ae.noOuter)
  }, o.top ? (n.options.inner.top = i.bottom - a.height, n.options.outer.top = i.bottom - s.height) : o.bottom && (n.options.inner.bottom = i.top + a.height, n.options.outer.bottom = i.top + s.height), o.left ? (n.options.inner.left = i.right - a.width, n.options.outer.left = i.right - s.width) : o.right && (n.options.inner.right = i.left + a.width, n.options.outer.right = i.left + s.width), ae.set(e), n.options = r;
}
const Vr = {
  min: null,
  max: null,
  endOnly: !1,
  enabled: !1
}, Kr = {
  start: qr,
  set: Ur,
  defaults: Vr
};
var Jr = Rt(Kr, "restrictSize");
function Zr(e) {
  const {
    interaction: t,
    interactable: n,
    element: i,
    rect: o,
    state: r,
    startOffset: a
  } = e, {
    options: s
  } = r, c = s.offsetWithOrigin ? ts(e) : {
    x: 0,
    y: 0
  };
  let l;
  if (s.offset === "startCoords")
    l = {
      x: t.coords.start.page.x,
      y: t.coords.start.page.y
    };
  else {
    const f = ue(s.offset, n, i, [t]);
    l = Ce(f) || {
      x: 0,
      y: 0
    }, l.x += c.x, l.y += c.y;
  }
  const {
    relativePoints: u
  } = s;
  r.offsets = o && u && u.length ? u.map((f, h) => ({
    index: h,
    relativePoint: f,
    x: a.left - o.width * f.x + l.x,
    y: a.top - o.height * f.y + l.y
  })) : [{
    index: 0,
    relativePoint: null,
    x: l.x,
    y: l.y
  }];
}
function Qr(e) {
  const {
    interaction: t,
    coords: n,
    state: i
  } = e, {
    options: o,
    offsets: r
  } = i, a = rn(t.interactable, t.element, t.prepared.name), s = _({}, n), c = [];
  o.offsetWithOrigin || (s.x -= a.x, s.y -= a.y);
  for (const u of r) {
    const f = s.x - u.x, h = s.y - u.y;
    for (let m = 0, x = o.targets.length; m < x; m++) {
      const T = o.targets[m];
      let y;
      g.func(T) ? y = T(f, h, t._proxy, u, m) : y = T, y && c.push({
        x: (g.number(y.x) ? y.x : f) + u.x,
        y: (g.number(y.y) ? y.y : h) + u.y,
        range: g.number(y.range) ? y.range : o.range,
        source: T,
        index: m,
        offset: u
      });
    }
  }
  const l = {
    target: null,
    inRange: !1,
    distance: 0,
    range: 0,
    delta: {
      x: 0,
      y: 0
    }
  };
  for (const u of c) {
    const f = u.range, h = u.x - s.x, m = u.y - s.y, x = Me(h, m);
    let T = x <= f;
    f === 1 / 0 && l.inRange && l.range !== 1 / 0 && (T = !1), (!l.target || (T ? (
      // is the closest target in range?
      l.inRange && f !== 1 / 0 ? (
        // the pointer is relatively deeper in this target
        x / f < l.distance / l.range
      ) : (
        // this target has Infinite range and the closest doesn't
        f === 1 / 0 && l.range !== 1 / 0 || // OR this target is closer that the previous closest
        x < l.distance
      )
    ) : (
      // The other is not in range and the pointer is closer to this target
      !l.inRange && x < l.distance
    ))) && (l.target = u, l.distance = x, l.range = f, l.inRange = T, l.delta.x = h, l.delta.y = m);
  }
  return l.inRange && (n.x = l.target.x, n.y = l.target.y), i.closest = l, l;
}
function ts(e) {
  const {
    element: t
  } = e.interaction;
  return Ce(ue(e.state.options.origin, null, null, [t])) || rn(e.interactable, t, e.interaction.prepared.name);
}
const es = {
  range: 1 / 0,
  targets: null,
  offset: null,
  offsetWithOrigin: !0,
  origin: null,
  relativePoints: null,
  endOnly: !1,
  enabled: !1
}, an = {
  start: Zr,
  set: Qr,
  defaults: es
};
var ns = Rt(an, "snap");
function is(e) {
  const {
    state: t,
    edges: n
  } = e, {
    options: i
  } = t;
  if (!n)
    return null;
  e.state = {
    options: {
      targets: null,
      relativePoints: [{
        x: n.left ? 0 : 1,
        y: n.top ? 0 : 1
      }],
      offset: i.offset || "self",
      origin: {
        x: 0,
        y: 0
      },
      range: i.range
    }
  }, t.targetFields = t.targetFields || [["width", "height"], ["x", "y"]], an.start(e), t.offsets = e.state.offsets, e.state = t;
}
function os(e) {
  const {
    interaction: t,
    state: n,
    coords: i
  } = e, {
    options: o,
    offsets: r
  } = n, a = {
    x: i.x - r[0].x,
    y: i.y - r[0].y
  };
  n.options = _({}, o), n.options.targets = [];
  for (const c of o.targets || []) {
    let l;
    if (g.func(c) ? l = c(a.x, a.y, t) : l = c, !!l) {
      for (const [u, f] of n.targetFields)
        if (u in l || f in l) {
          l.x = l[u], l.y = l[f];
          break;
        }
      n.options.targets.push(l);
    }
  }
  const s = an.set(e);
  return n.options = o, s;
}
const rs = {
  range: 1 / 0,
  targets: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Se = {
  start: is,
  set: os,
  defaults: rs
};
var ss = Rt(Se, "snapSize");
function as(e) {
  const {
    edges: t
  } = e;
  return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Se.start(e)) : null;
}
const ls = {
  start: as,
  set: Se.set,
  defaults: _(Zt(Se.defaults), {
    targets: void 0,
    range: void 0,
    offset: {
      x: 0,
      y: 0
    }
  })
};
var cs = Rt(ls, "snapEdges");
const oe = () => {
};
oe._defaults = {};
var Fe = {
  aspectRatio: kr,
  restrictEdges: Fr,
  restrict: $r,
  restrictRect: Xr,
  restrictSize: Jr,
  snapEdges: cs,
  snap: ns,
  snapSize: ss,
  spring: oe,
  avoid: oe,
  transform: oe,
  rubberband: oe
};
const us = {
  id: "modifiers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    e.usePlugin(Dr), e.usePlugin(zr), t.modifiers = Fe;
    for (const n in Fe) {
      const {
        _defaults: i,
        _methods: o
      } = Fe[n];
      i._methods = o, e.defaults.perAction[n] = i;
    }
  }
};
Mt.use(us);
var le = /* @__PURE__ */ function(e) {
  return e.touchAction = "touchAction", e.boxSizing = "boxSizing", e.noListeners = "noListeners", e;
}(le || {});
const Je = "[interact.js] ", Ze = {
  touchAction: "https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",
  boxSizing: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"
};
function fs(e) {
  let {
    logger: t
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    Interactable: n,
    defaults: i
  } = e;
  e.logger = t || console, i.base.devTools = {
    ignore: {}
  }, n.prototype.devTools = function(r) {
    return r ? (_(this.options.devTools, r), this) : this.options.devTools;
  };
  const {
    _onOff: o
  } = n.prototype;
  n.prototype._onOff = function(r, a, s, c, l) {
    if (g.string(this.target) || this.target.addEventListener)
      return o.call(this, r, a, s, c, l);
    g.object(a) && !g.array(a) && (c = s, s = null);
    const u = Nt(a, s, l);
    for (const f in u)
      fe(f, e.actions) || e.logger.warn(Je + `Can't add native "${f}" event listener to target without \`addEventListener(type, listener, options)\` prop.`);
    return o.call(this, r, u, c);
  };
}
const _n = [{
  name: le.touchAction,
  perform(e) {
    let {
      element: t
    } = e;
    return !!t && !ds(t, "touchAction", /pan-|pinch|none/);
  },
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, Ze.touchAction];
  },
  text: `Consider adding CSS "touch-action: none" to this element
`
}, {
  name: le.boxSizing,
  perform(e) {
    const {
      element: t
    } = e;
    return e.prepared.name === "resize" && t instanceof U.HTMLElement && !xi(t, "boxSizing", /border-box/);
  },
  text: 'Consider adding CSS "box-sizing: border-box" to this resizable element',
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, Ze.boxSizing];
  }
}, {
  name: le.noListeners,
  perform(e) {
    var t;
    const n = e.prepared.name;
    return !(((t = e.interactable) == null ? void 0 : t.events.types[`${n}move`]) || []).length;
  },
  getInfo(e) {
    return [e.prepared.name, e.interactable];
  },
  text: "There are no listeners set for this action"
}];
function xi(e, t, n) {
  const i = e.style[t] || kt.getComputedStyle(e)[t];
  return n.test((i || "").toString());
}
function ds(e, t, n) {
  let i = e;
  for (; g.element(i); ) {
    if (xi(i, t, n))
      return !0;
    i = At(i);
  }
  return !1;
}
const hs = "dev-tools", ps = {
  id: hs,
  install: fs,
  listeners: {
    "interactions:action-start": (e, t) => {
      let {
        interaction: n
      } = e;
      for (const i of _n) {
        const o = n.interactable && n.interactable.options;
        !(o && o.devTools && o.devTools.ignore[i.name]) && i.perform(n) && t.logger.warn(Je + i.text, ...i.getInfo(n));
      }
    }
  },
  checks: _n,
  CheckName: le,
  links: Ze,
  prefix: Je
};
Mt.use(ps);
function gs() {
  const { appContext: e, proxy: t } = Di(), n = e.config.globalProperties;
  return {
    proxy: t,
    appContext: e,
    globalProperties: n
  };
}
const vs = {
  name: "GridItem"
}, wi = /* @__PURE__ */ $n({
  ...vs,
  props: {
    isDraggable: { type: [Boolean, null], default: null },
    isResizable: { type: [Boolean, null], default: null },
    isBounded: { type: [Boolean, null], default: null },
    static: { type: Boolean, default: !1 },
    minH: { default: 1 },
    minW: { default: 1 },
    maxH: { default: 1 / 0 },
    maxW: { default: 1 / 0 },
    x: {},
    y: {},
    w: {},
    h: {},
    i: {},
    dragIgnoreFrom: { default: "a, button" },
    dragAllowFrom: { default: null },
    resizeIgnoreFrom: { default: "a, button" },
    preserveAspectRatio: { type: Boolean, default: !1 },
    dragOption: { default: () => ({}) },
    resizeOption: { default: () => ({}) }
  },
  emits: ["container-resized", "resize", "resized", "move", "moved"],
  setup(e, { expose: t, emit: n }) {
    const { proxy: i } = gs(), o = i == null ? void 0 : i.$parent, r = _i("eventBus"), a = n, s = e, c = O({}), l = O(1), u = O(100), f = O(30), h = O([10, 10]), m = O(1 / 0), x = O(null), T = O(null), y = O(1), C = O(!0), I = O(!0), M = O(!1), v = O(null), d = O(!1), D = O(null), w = O(NaN), B = O(NaN), it = O(NaN), L = O(NaN), V = O({}), k = O(!1), b = O(!1), R = O(!1), $ = O(null), J = O(null), Z = O(null), Q = O(null), z = O(s.x), rt = O(s.y), ot = O(s.w), K = O(s.h), lt = O(null), q = O(null), de = Ut(() => T.value && !s.static), De = Ut(() => (x.value || T.value) && !s.static), _e = Ut(() => navigator.userAgent.toLowerCase().indexOf("android") !== -1), ct = Ut(() => o != null && o.isMirrored ? !k.value : k.value), S = Ut(() => ({
      "vue-resizable": de.value,
      static: s.static,
      resizing: d.value,
      "vue-draggable-dragging": M.value,
      cssTransforms: C.value,
      "render-rtl": ct.value,
      "disable-userselect": M.value,
      "no-touch": _e.value && De.value
    })), H = Ut(() => ct.value ? "vue-resizable-handle vue-rtl-resizable-handle" : "vue-resizable-handle");
    N(
      () => s.isDraggable,
      (p) => {
        x.value = p;
      }
    ), N(
      () => s.static,
      () => {
        $t(), gt();
      }
    ), N(x, () => {
      $t();
    }), N(
      () => s.isResizable,
      (p) => {
        T.value = p;
      }
    ), N(
      () => s.isBounded,
      (p) => {
        lt.value = p;
      }
    ), N(T, () => {
      gt();
    }), N(f, () => {
      et(), yt();
    }), N(l, () => {
      gt(), et(), yt();
    }), N(u, () => {
      gt(), et();
    }), N(
      () => s.x,
      (p) => {
        z.value = p, et();
      }
    ), N(
      () => s.y,
      (p) => {
        rt.value = p, et();
      }
    ), N(
      () => s.h,
      (p) => {
        K.value = p, et();
      }
    ), N(
      () => s.w,
      (p) => {
        ot.value = p, et();
      }
    ), N(ct, () => {
      gt(), et();
    }), N(
      () => s.minH,
      () => {
        gt();
      }
    ), N(
      () => s.maxH,
      () => {
        gt();
      }
    ), N(
      () => s.minW,
      () => {
        gt();
      }
    ), N(
      () => s.maxW,
      () => {
        gt();
      }
    ), N(
      () => o == null ? void 0 : o.margin,
      (p) => {
        !p || p[0] == h.value[0] && p[1] == h.value[1] || (h.value = p.map((E) => Number(E)), et(), yt());
      }
    );
    function Y(p) {
      Et(p);
    }
    function ft(p) {
      pe();
    }
    function vt(p) {
      s.isDraggable === null && (x.value = p);
    }
    function bt(p) {
      s.isResizable === null && (T.value = p);
    }
    function xt(p) {
      s.isBounded === null && (lt.value = p);
    }
    function at(p) {
      y.value = p;
    }
    function W(p) {
      f.value = p;
    }
    function ut(p) {
      m.value = p;
    }
    function mt() {
      k.value = gn() === "rtl", pe();
    }
    function ht(p) {
      const E = p.toString();
      l.value = parseInt(E);
    }
    r.on("updateWidth", Y), r.on("compact", ft), r.on("setDraggable", vt), r.on("setResizable", bt), r.on("setBounded", xt), r.on("setTransformScale", at), r.on("setRowHeight", W), r.on("setMaxRows", ut), r.on("directionchange", mt), r.on("setColNum", ht), k.value = gn() === "rtl", Bn(() => {
      r.off("updateWidth", Y), r.off("compact", ft), r.off("setDraggable", vt), r.off("setResizable", bt), r.off("setBounded", xt), r.off("setTransformScale", at), r.off("setRowHeight", W), r.off("setMaxRows", ut), r.off("directionchange", mt), r.off("setColNum", ht), q.value && q.value.unset();
    }), Ln(() => {
      o != null && o.responsive && o.lastBreakpoint ? l.value = qe(o.lastBreakpoint, o == null ? void 0 : o.cols) : l.value = o == null ? void 0 : o.colNum, f.value = o == null ? void 0 : o.rowHeight, u.value = (o == null ? void 0 : o.width) !== null ? o == null ? void 0 : o.width : 100, h.value = (o == null ? void 0 : o.margin) !== void 0 ? o.margin : [10, 10], m.value = o == null ? void 0 : o.maxRows, s.isDraggable === null ? x.value = o == null ? void 0 : o.isDraggable : x.value = s.isDraggable, s.isResizable === null ? T.value = o == null ? void 0 : o.isResizable : T.value = s.isResizable, s.isBounded === null ? lt.value = o == null ? void 0 : o.isBounded : lt.value = s.isBounded, y.value = o == null ? void 0 : o.transformScale, C.value = o == null ? void 0 : o.useCssTransforms, I.value = o == null ? void 0 : o.useStyleCursor, et();
    });
    function et() {
      var F, X, A, G, Lt;
      s.x + s.w > l.value ? (z.value = 0, ot.value = s.w > l.value ? l.value : s.w) : (z.value = s.x, ot.value = s.w);
      let p = Ct(z.value, rt.value, ot.value, K.value);
      M.value && (p.top = (F = v.value) == null ? void 0 : F.top, ct.value ? p.right = (X = v.value) == null ? void 0 : X.left : p.left = (A = v.value) == null ? void 0 : A.left), d.value && (p.width = (G = D.value) == null ? void 0 : G.width, p.height = (Lt = D.value) == null ? void 0 : Lt.height);
      let E;
      C.value ? ct.value ? E = ji(p.top, p.right, p.width, p.height) : E = Ni(p.top, p.left, p.width, p.height) : ct.value ? E = Yi(p.top, p.right, p.width, p.height) : E = Xi(p.top, p.left, p.width, p.height), V.value = E;
    }
    function yt() {
      let p = {};
      for (let E of ["width", "height"]) {
        let X = V.value[E].match(/^(\d+)px$/);
        if (!X)
          return;
        p[E] = X[1];
      }
      a("container-resized", s.i, s.h, s.w, p.height, p.width);
    }
    function he(p) {
      var E, F, X;
      {
        if (s.static)
          return;
        const A = hn(p);
        if (A == null)
          return;
        const { x: G, y: Lt } = A, st = { width: 0, height: 0 };
        let j;
        switch (p.type) {
          case "resizestart": {
            gt(), $.value = ot.value, J.value = K.value, j = Ct(z.value, rt.value, ot.value, K.value), st.width = j.width, st.height = j.height, D.value = st, d.value = !0;
            break;
          }
          case "resizemove": {
            const dt = pn(it.value, L.value, G, Lt);
            ct.value ? st.width = Number((E = D.value) == null ? void 0 : E.width) - dt.deltaX / y.value : st.width = Number((F = D.value) == null ? void 0 : F.width) + dt.deltaX / y.value, st.height = Number((X = D.value) == null ? void 0 : X.height) + dt.deltaY / y.value, D.value = st;
            break;
          }
          case "resizeend": {
            j = Ct(z.value, rt.value, ot.value, K.value), st.width = j.width, st.height = j.height, D.value = null, d.value = !1;
            break;
          }
        }
        j = wt(st.height, st.width), j.w < s.minW && (j.w = s.minW), j.w > s.maxW && (j.w = s.maxW), j.h < s.minH && (j.h = s.minH), j.h > s.maxH && (j.h = s.maxH), j.h < 1 && (j.h = 1), j.w < 1 && (j.w = 1), it.value = G, L.value = Lt, (ot.value !== j.w || K.value !== j.h) && a("resize", s.i, j.h, j.w, st.height, st.width), p.type === "resizeend" && ($.value !== ot.value || J.value !== K.value) && a("resized", s.i, j.h, j.w, st.height, st.width);
        const ge = {
          eventType: p.type,
          i: s.i,
          x: z.value,
          y: rt.value,
          h: j.h,
          w: j.w
        };
        r.emit("resizeEvent", ge);
      }
    }
    function Gt(p) {
      var st, j, ge;
      if (s.static || d.value)
        return;
      const E = hn(p);
      if (E === null)
        return;
      const { x: F, y: X } = E;
      let A = { top: 0, left: 0 };
      switch (p.type) {
        case "dragstart": {
          Z.value = z.value, Q.value = rt.value;
          const dt = p.target;
          let Dt = dt.offsetParent.getBoundingClientRect(), St = dt.getBoundingClientRect();
          const Qt = St.left / y.value, te = Dt.left / y.value, Oe = St.right / y.value, ke = Dt.right / y.value, Ae = St.top / y.value, Re = Dt.top / y.value;
          ct.value ? A.left = (Oe - ke) * -1 : A.left = Qt - te, A.top = Ae - Re, v.value = A, M.value = !0;
          break;
        }
        case "dragend": {
          if (!M.value)
            return;
          const dt = p.target;
          let Dt = dt.offsetParent.getBoundingClientRect(), St = dt.getBoundingClientRect();
          const Qt = St.left / y.value, te = Dt.left / y.value, Oe = St.right / y.value, ke = Dt.right / y.value, Ae = St.top / y.value, Re = Dt.top / y.value;
          ct.value ? A.left = (Oe - ke) * -1 : A.left = Qt - te, A.top = Ae - Re, v.value = null, M.value = !1;
          break;
        }
        case "dragmove": {
          const dt = pn(w.value, B.value, F, X);
          if (ct.value ? A.left = Number((st = v.value) == null ? void 0 : st.left) - dt.deltaX / y.value : A.left = Number((j = v.value) == null ? void 0 : j.left) + dt.deltaX / y.value, A.top = Number((ge = v.value) == null ? void 0 : ge.top) + dt.deltaY / y.value, lt.value) {
            const St = p.target.offsetParent.clientHeight - nt(s.h, f.value, h.value[1]);
            A.top = pt(A.top, 0, St);
            const Qt = Ht(), te = u.value - nt(s.w, Qt, h.value[0]);
            A.left = pt(A.left, 0, te);
          }
          v.value = A;
          break;
        }
      }
      let G;
      ct.value, G = qt(A.top, A.left), w.value = F, B.value = X, (z.value !== G.x || rt.value !== G.y) && a("move", s.i, G.x, G.y), p.type === "dragend" && (Z.value !== z.value || Q.value !== rt.value) && a("moved", s.i, G.x, G.y);
      const Lt = {
        eventType: p.type,
        i: s.i,
        x: G.x,
        y: G.y,
        h: K.value,
        w: ot.value
      };
      r.emit("dragEvent", Lt);
    }
    function Ct(p, E, F, X) {
      const A = Ht();
      let G;
      return ct.value ? G = {
        right: Math.round(A * p + (p + 1) * h.value[0]),
        top: Math.round(f.value * E + (E + 1) * h.value[1]),
        // 0 * Infinity === NaN, which causes problems with resize constriants;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width: F === 1 / 0 ? F : Math.round(A * F + Math.max(0, F - 1) * h.value[0]),
        height: X === 1 / 0 ? X : Math.round(f.value * X + Math.max(0, X - 1) * h.value[1])
      } : G = {
        left: Math.round(A * p + (p + 1) * h.value[0]),
        top: Math.round(f.value * E + (E + 1) * h.value[1]),
        // 0 * Infinity === NaN, which causes problems with resize constriants;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width: F === 1 / 0 ? F : Math.round(A * F + Math.max(0, F - 1) * h.value[0]),
        height: X === 1 / 0 ? X : Math.round(f.value * X + Math.max(0, X - 1) * h.value[1])
      }, G;
    }
    function qt(p, E) {
      const F = Ht();
      let X = Math.round((E - h.value[0]) / (F + h.value[0])), A = Math.round((p - h.value[1]) / (f.value + h.value[1]));
      return X = Math.max(Math.min(X, l.value - ot.value), 0), A = Math.max(Math.min(A, m.value - K.value), 0), { x: X, y: A };
    }
    function Ht() {
      return (u.value - h.value[0] * (l.value + 1)) / l.value;
    }
    function nt(p, E, F) {
      return Number.isFinite(p) ? Math.round(E * p + Math.max(0, p - 1) * F) : p;
    }
    function pt(p, E, F) {
      return Math.max(Math.min(p, F), E);
    }
    function wt(p, E, F = !1) {
      const X = Ht();
      let A = Math.round((E + h.value[0]) / (X + h.value[0])), G = 0;
      return F ? G = Math.ceil((p + h.value[1]) / (f.value + h.value[1])) : G = Math.round((p + h.value[1]) / (f.value + h.value[1])), A = Math.max(Math.min(A, l.value - z.value), 0), G = Math.max(Math.min(G, m.value - rt.value), 0), { w: A, h: G };
    }
    function Et(p, E) {
      u.value = p, E != null && (l.value = E);
    }
    function pe(p) {
      et();
    }
    function $t() {
      if ((q.value === null || q.value === void 0) && (q.value = Mt(c.value), I.value || q.value.styleCursor(!1)), x.value && !s.static) {
        const p = {
          ignoreFrom: s.dragIgnoreFrom,
          allowFrom: s.dragAllowFrom,
          ...s.dragOption
        };
        q.value.draggable(p), b.value || (b.value = !0, q.value.on("dragstart dragmove dragend", function(E) {
          Gt(E);
        }));
      } else
        q.value.draggable({
          enabled: !1
        });
    }
    function gt() {
      if ((q.value === null || q.value === void 0) && (q.value = Mt(c.value), I.value || q.value.styleCursor(!1)), T.value && !s.static) {
        let p = Ct(0, 0, s.maxW, s.maxH), E = Ct(0, 0, s.minW, s.minH);
        const F = {
          // allowFrom: "." + this.resizableHandleClass.trim().replace(" ", "."),
          edges: {
            left: !0,
            right: "." + H.value.trim().replace(" ", "."),
            bottom: "." + H.value.trim().replace(" ", "."),
            top: !0
          },
          ignoreFrom: s.resizeIgnoreFrom,
          restrictSize: {
            min: {
              height: E.height * y.value,
              width: E.width * y.value
            },
            max: {
              height: p.height * y.value,
              width: p.width * y.value
            }
          },
          ...s.resizeOption
        };
        s.preserveAspectRatio && (F.modifiers = [
          // @ts-ignore
          Mt.modifiers.aspectRatio({
            ratio: "preserve"
          })
        ]), q.value.resizable(F), R.value || (R.value = !0, q.value.on("resizestart resizemove resizeend", function(X) {
          he(X);
        }));
      } else
        q.value.resizable({
          enabled: !1
        });
    }
    const Bt = Pi();
    function Pe() {
      $.value = ot.value, J.value = K.value;
      let p = Bt == null ? void 0 : Bt.default[0].elm.getBoundingClientRect(), E = wt(p.height, p.width, !0);
      if (E.w < s.minW && (E.w = s.minW), E.w > s.maxW && (E.w = s.maxW), E.h < s.minH && (E.h = s.minH), E.h > s.maxH && (E.h = s.maxH), E.h < 1 && (E.h = 1), E.w < 1 && (E.w = 1), (ot.value !== E.w || K.value !== E.h) && a("resize", s.i, E.h, E.w, p.height, p.width), $.value !== E.w || J.value !== E.h) {
        a("resized", s.i, E.h, E.w, p.height, p.width);
        const F = {
          eventType: "resizeend",
          i: s.i,
          x: z.value,
          y: rt.value,
          h: E.h,
          w: E.w
        };
        r.emit("resizeEvent", F);
      }
    }
    return t({
      autoSize: Pe,
      calcXY: qt,
      dragging: v,
      ...s
    }), (p, E) => (Ne(), je("div", {
      ref_key: "this$refsItem",
      ref: c,
      class: un(["vue-grid-item", S.value]),
      style: Xe(V.value)
    }, [
      Wn(p.$slots, "default", {
        style: Xe(V.value)
      }),
      de.value ? (Ne(), je("span", {
        key: 0,
        ref: "handle",
        class: un(H.value)
      }, null, 2)) : Oi("", !0)
    ], 6));
  }
});
function ms(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(t, n) {
    var i = e.get(t);
    i ? i.push(n) : e.set(t, [n]);
  }, off: function(t, n) {
    var i = e.get(t);
    i && (n ? i.splice(i.indexOf(n) >>> 0, 1) : e.set(t, []));
  }, emit: function(t, n) {
    var i = e.get(t);
    i && i.slice().map(function(o) {
      o(n);
    }), (i = e.get("*")) && i.slice().map(function(o) {
      o(t, n);
    });
  } };
}
function ys(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ei = { exports: {} }, bs = Ei.exports = {};
bs.forEach = function(e, t) {
  for (var n = 0; n < e.length; n++) {
    var i = t(e[n]);
    if (i)
      return i;
  }
};
var Si = Ei.exports, xs = function(e) {
  var t = e.stateHandler.getState;
  function n(a) {
    var s = t(a);
    return s && !!s.isDetectable;
  }
  function i(a) {
    t(a).isDetectable = !0;
  }
  function o(a) {
    return !!t(a).busy;
  }
  function r(a, s) {
    t(a).busy = !!s;
  }
  return {
    isDetectable: n,
    markAsDetectable: i,
    isBusy: o,
    markBusy: r
  };
}, ws = function(e) {
  var t = {};
  function n(a) {
    var s = e.get(a);
    return s === void 0 ? [] : t[s] || [];
  }
  function i(a, s) {
    var c = e.get(a);
    t[c] || (t[c] = []), t[c].push(s);
  }
  function o(a, s) {
    for (var c = n(a), l = 0, u = c.length; l < u; ++l)
      if (c[l] === s) {
        c.splice(l, 1);
        break;
      }
  }
  function r(a) {
    var s = n(a);
    s && (s.length = 0);
  }
  return {
    get: n,
    add: i,
    removeListener: o,
    removeAllListeners: r
  };
}, Es = function() {
  var e = 1;
  function t() {
    return e++;
  }
  return {
    generate: t
  };
}, Ss = function(e) {
  var t = e.idGenerator, n = e.stateHandler.getState;
  function i(r) {
    var a = n(r);
    return a && a.id !== void 0 ? a.id : null;
  }
  function o(r) {
    var a = n(r);
    if (!a)
      throw new Error("setId required the element to have a resize detection state.");
    var s = t.generate();
    return a.id = s, s;
  }
  return {
    get: i,
    set: o
  };
}, Ts = function(e) {
  function t() {
  }
  var n = {
    log: t,
    warn: t,
    error: t
  };
  if (!e && window.console) {
    var i = function(o, r) {
      o[r] = function() {
        var s = console[r];
        if (s.apply)
          s.apply(console, arguments);
        else
          for (var c = 0; c < arguments.length; c++)
            s(arguments[c]);
      };
    };
    i(n, "log"), i(n, "warn"), i(n, "error");
  }
  return n;
}, Ti = { exports: {} }, Ii = Ti.exports = {};
Ii.isIE = function(e) {
  function t() {
    var i = navigator.userAgent.toLowerCase();
    return i.indexOf("msie") !== -1 || i.indexOf("trident") !== -1 || i.indexOf(" edge/") !== -1;
  }
  if (!t())
    return !1;
  if (!e)
    return !0;
  var n = function() {
    var i, o = 3, r = document.createElement("div"), a = r.getElementsByTagName("i");
    do
      r.innerHTML = "<!--[if gt IE " + ++o + "]><i></i><![endif]-->";
    while (a[0]);
    return o > 4 ? o : i;
  }();
  return e === n;
};
Ii.isLegacyOpera = function() {
  return !!window.opera;
};
var zi = Ti.exports, Mi = { exports: {} }, Is = Mi.exports = {};
Is.getOption = zs;
function zs(e, t, n) {
  var i = e[t];
  return i == null && n !== void 0 ? n : i;
}
var Ms = Mi.exports, Pn = Ms, Cs = function(t) {
  t = t || {};
  var n = t.reporter, i = Pn.getOption(t, "async", !0), o = Pn.getOption(t, "auto", !0);
  o && !i && (n && n.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), i = !0);
  var r = On(), a, s = !1;
  function c(x, T) {
    !s && o && i && r.size() === 0 && f(), r.add(x, T);
  }
  function l() {
    for (s = !0; r.size(); ) {
      var x = r;
      r = On(), x.process();
    }
    s = !1;
  }
  function u(x) {
    s || (x === void 0 && (x = i), a && (h(a), a = null), x ? f() : l());
  }
  function f() {
    a = m(l);
  }
  function h(x) {
    var T = clearTimeout;
    return T(x);
  }
  function m(x) {
    var T = function(y) {
      return setTimeout(y, 0);
    };
    return T(x);
  }
  return {
    add: c,
    force: u
  };
};
function On() {
  var e = {}, t = 0, n = 0, i = 0;
  function o(s, c) {
    c || (c = s, s = 0), s > n ? n = s : s < i && (i = s), e[s] || (e[s] = []), e[s].push(c), t++;
  }
  function r() {
    for (var s = i; s <= n; s++)
      for (var c = e[s], l = 0; l < c.length; l++) {
        var u = c[l];
        u();
      }
  }
  function a() {
    return t;
  }
  return {
    add: o,
    process: r,
    size: a
  };
}
var ln = "_erd";
function Ds(e) {
  return e[ln] = {}, Ci(e);
}
function Ci(e) {
  return e[ln];
}
function _s(e) {
  delete e[ln];
}
var Ps = {
  initState: Ds,
  getState: Ci,
  cleanState: _s
}, ie = zi, Os = function(e) {
  e = e || {};
  var t = e.reporter, n = e.batchProcessor, i = e.stateHandler.getState;
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  function o(l, u) {
    function f() {
      u(l);
    }
    if (ie.isIE(8))
      i(l).object = {
        proxy: f
      }, l.attachEvent("onresize", f);
    else {
      var h = s(l);
      if (!h)
        throw new Error("Element is not detectable by this strategy.");
      h.contentDocument.defaultView.addEventListener("resize", f);
    }
  }
  function r(l) {
    var u = e.important ? " !important; " : "; ";
    return (l.join(u) + u).trim();
  }
  function a(l, u, f) {
    f || (f = u, u = l, l = null), l = l || {}, l.debug;
    function h(m, x) {
      var T = r(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]), y = !1, C = window.getComputedStyle(m), I = m.offsetWidth, M = m.offsetHeight;
      i(m).startSize = {
        width: I,
        height: M
      };
      function v() {
        function d() {
          if (C.position === "static") {
            m.style.setProperty("position", "relative", l.important ? "important" : "");
            var B = function(it, L, V, k) {
              function b($) {
                return $.replace(/[^-\d\.]/g, "");
              }
              var R = V[k];
              R !== "auto" && b(R) !== "0" && (it.warn("An element that is positioned static has style." + k + "=" + R + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + k + " will be set to 0. Element: ", L), L.style.setProperty(k, "0", l.important ? "important" : ""));
            };
            B(t, m, C, "top"), B(t, m, C, "right"), B(t, m, C, "bottom"), B(t, m, C, "left");
          }
        }
        function D() {
          y || d();
          function B(L, V) {
            if (!L.contentDocument) {
              var k = i(L);
              k.checkForObjectDocumentTimeoutId && window.clearTimeout(k.checkForObjectDocumentTimeoutId), k.checkForObjectDocumentTimeoutId = setTimeout(function() {
                k.checkForObjectDocumentTimeoutId = 0, B(L, V);
              }, 100);
              return;
            }
            V(L.contentDocument);
          }
          var it = this;
          B(it, function(V) {
            x(m);
          });
        }
        C.position !== "" && (d(), y = !0);
        var w = document.createElement("object");
        w.style.cssText = T, w.tabIndex = -1, w.type = "text/html", w.setAttribute("aria-hidden", "true"), w.onload = D, ie.isIE() || (w.data = "about:blank"), i(m) && (m.appendChild(w), i(m).object = w, ie.isIE() && (w.data = "about:blank"));
      }
      n ? n.add(v) : v();
    }
    ie.isIE(8) ? f(u) : h(u, f);
  }
  function s(l) {
    return i(l).object;
  }
  function c(l) {
    if (i(l)) {
      var u = s(l);
      u && (ie.isIE(8) ? l.detachEvent("onresize", u.proxy) : l.removeChild(u), i(l).checkForObjectDocumentTimeoutId && window.clearTimeout(i(l).checkForObjectDocumentTimeoutId), delete i(l).object);
    }
  }
  return {
    makeDetectable: a,
    addListener: o,
    uninstall: c
  };
}, ks = Si.forEach, As = function(e) {
  e = e || {};
  var t = e.reporter, n = e.batchProcessor, i = e.stateHandler.getState;
  e.stateHandler.hasState;
  var o = e.idHandler;
  if (!n)
    throw new Error("Missing required dependency: batchProcessor");
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  var r = u(), a = "erd_scroll_detection_scrollbar_style", s = "erd_scroll_detection_container";
  function c(v) {
    f(v, a, s);
  }
  c(window.document);
  function l(v) {
    var d = e.important ? " !important; " : "; ";
    return (v.join(d) + d).trim();
  }
  function u() {
    var v = 500, d = 500, D = document.createElement("div");
    D.style.cssText = l(["position: absolute", "width: " + v * 2 + "px", "height: " + d * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var w = document.createElement("div");
    w.style.cssText = l(["position: absolute", "width: " + v + "px", "height: " + d + "px", "overflow: scroll", "visibility: none", "top: " + -v * 3 + "px", "left: " + -d * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]), w.appendChild(D), document.body.insertBefore(w, document.body.firstChild);
    var B = v - w.clientWidth, it = d - w.clientHeight;
    return document.body.removeChild(w), {
      width: B,
      height: it
    };
  }
  function f(v, d, D) {
    function w(V, k) {
      k = k || function(R) {
        v.head.appendChild(R);
      };
      var b = v.createElement("style");
      return b.innerHTML = V, b.id = d, k(b), b;
    }
    if (!v.getElementById(d)) {
      var B = D + "_animation", it = D + "_animation_active", L = `/* Created by the element-resize-detector library. */
`;
      L += "." + D + " > div::-webkit-scrollbar { " + l(["display: none"]) + ` }

`, L += "." + it + " { " + l(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + B, "animation-name: " + B]) + ` }
`, L += "@-webkit-keyframes " + B + ` { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
`, L += "@keyframes " + B + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", w(L);
    }
  }
  function h(v) {
    v.className += " " + s + "_animation_active";
  }
  function m(v, d, D) {
    if (v.addEventListener)
      v.addEventListener(d, D);
    else if (v.attachEvent)
      v.attachEvent("on" + d, D);
    else
      return t.error("[scroll] Don't know how to add event listeners.");
  }
  function x(v, d, D) {
    if (v.removeEventListener)
      v.removeEventListener(d, D);
    else if (v.detachEvent)
      v.detachEvent("on" + d, D);
    else
      return t.error("[scroll] Don't know how to remove event listeners.");
  }
  function T(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[0];
  }
  function y(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[1];
  }
  function C(v, d) {
    var D = i(v).listeners;
    if (!D.push)
      throw new Error("Cannot add listener to an element that is not detectable.");
    i(v).listeners.push(d);
  }
  function I(v, d, D) {
    D || (D = d, d = v, v = null), v = v || {};
    function w() {
      if (v.debug) {
        var S = Array.prototype.slice.call(arguments);
        if (S.unshift(o.get(d), "Scroll: "), t.log.apply)
          t.log.apply(null, S);
        else
          for (var H = 0; H < S.length; H++)
            t.log(S[H]);
      }
    }
    function B(S) {
      function H(Y) {
        var ft = Y.getRootNode && Y.getRootNode().contains(Y);
        return Y === Y.ownerDocument.body || Y.ownerDocument.body.contains(Y) || ft;
      }
      return !H(S) || window.getComputedStyle(S) === null;
    }
    function it(S) {
      var H = i(S).container.childNodes[0], Y = window.getComputedStyle(H);
      return !Y.width || Y.width.indexOf("px") === -1;
    }
    function L() {
      var S = window.getComputedStyle(d), H = {};
      return H.position = S.position, H.width = d.offsetWidth, H.height = d.offsetHeight, H.top = S.top, H.right = S.right, H.bottom = S.bottom, H.left = S.left, H.widthCSS = S.width, H.heightCSS = S.height, H;
    }
    function V() {
      var S = L();
      i(d).startSize = {
        width: S.width,
        height: S.height
      }, w("Element start size", i(d).startSize);
    }
    function k() {
      i(d).listeners = [];
    }
    function b() {
      if (w("storeStyle invoked."), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var S = L();
      i(d).style = S;
    }
    function R(S, H, Y) {
      i(S).lastWidth = H, i(S).lastHeight = Y;
    }
    function $(S) {
      return T(S).childNodes[0];
    }
    function J() {
      return 2 * r.width + 1;
    }
    function Z() {
      return 2 * r.height + 1;
    }
    function Q(S) {
      return S + 10 + J();
    }
    function z(S) {
      return S + 10 + Z();
    }
    function rt(S) {
      return S * 2 + J();
    }
    function ot(S) {
      return S * 2 + Z();
    }
    function K(S, H, Y) {
      var ft = T(S), vt = y(S), bt = Q(H), xt = z(Y), at = rt(H), W = ot(Y);
      ft.scrollLeft = bt, ft.scrollTop = xt, vt.scrollLeft = at, vt.scrollTop = W;
    }
    function lt() {
      var S = i(d).container;
      if (!S) {
        S = document.createElement("div"), S.className = s, S.style.cssText = l(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), i(d).container = S, h(S), d.appendChild(S);
        var H = function() {
          i(d).onRendered && i(d).onRendered();
        };
        m(S, "animationstart", H), i(d).onAnimationStart = H;
      }
      return S;
    }
    function q() {
      function S() {
        var nt = i(d).style;
        if (nt.position === "static") {
          d.style.setProperty("position", "relative", v.important ? "important" : "");
          var pt = function(wt, Et, pe, $t) {
            function gt(Pe) {
              return Pe.replace(/[^-\d\.]/g, "");
            }
            var Bt = pe[$t];
            Bt !== "auto" && gt(Bt) !== "0" && (wt.warn("An element that is positioned static has style." + $t + "=" + Bt + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + $t + " will be set to 0. Element: ", Et), Et.style[$t] = 0);
          };
          pt(t, d, nt, "top"), pt(t, d, nt, "right"), pt(t, d, nt, "bottom"), pt(t, d, nt, "left");
        }
      }
      function H(nt, pt, wt, Et) {
        return nt = nt ? nt + "px" : "0", pt = pt ? pt + "px" : "0", wt = wt ? wt + "px" : "0", Et = Et ? Et + "px" : "0", ["left: " + nt, "top: " + pt, "right: " + Et, "bottom: " + wt];
      }
      if (w("Injecting elements"), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      S();
      var Y = i(d).container;
      Y || (Y = lt());
      var ft = r.width, vt = r.height, bt = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]), xt = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(H(-(1 + ft), -(1 + vt), -vt, -ft))), at = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), W = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), ut = l(["position: absolute", "left: 0", "top: 0"]), mt = l(["position: absolute", "width: 200%", "height: 200%"]), ht = document.createElement("div"), et = document.createElement("div"), yt = document.createElement("div"), he = document.createElement("div"), Gt = document.createElement("div"), Ct = document.createElement("div");
      ht.dir = "ltr", ht.style.cssText = bt, ht.className = s, et.className = s, et.style.cssText = xt, yt.style.cssText = at, he.style.cssText = ut, Gt.style.cssText = W, Ct.style.cssText = mt, yt.appendChild(he), Gt.appendChild(Ct), et.appendChild(yt), et.appendChild(Gt), ht.appendChild(et), Y.appendChild(ht);
      function qt() {
        var nt = i(d);
        nt && nt.onExpand ? nt.onExpand() : w("Aborting expand scroll handler: element has been uninstalled");
      }
      function Ht() {
        var nt = i(d);
        nt && nt.onShrink ? nt.onShrink() : w("Aborting shrink scroll handler: element has been uninstalled");
      }
      m(yt, "scroll", qt), m(Gt, "scroll", Ht), i(d).onExpandScroll = qt, i(d).onShrinkScroll = Ht;
    }
    function de() {
      function S(at, W, ut) {
        var mt = $(at), ht = Q(W), et = z(ut);
        mt.style.setProperty("width", ht + "px", v.important ? "important" : ""), mt.style.setProperty("height", et + "px", v.important ? "important" : "");
      }
      function H(at) {
        var W = d.offsetWidth, ut = d.offsetHeight, mt = W !== i(d).lastWidth || ut !== i(d).lastHeight;
        w("Storing current size", W, ut), R(d, W, ut), n.add(0, function() {
          if (mt) {
            if (!i(d)) {
              w("Aborting because element has been uninstalled");
              return;
            }
            if (!Y()) {
              w("Aborting because element container has not been initialized");
              return;
            }
            if (v.debug) {
              var et = d.offsetWidth, yt = d.offsetHeight;
              (et !== W || yt !== ut) && t.warn(o.get(d), "Scroll: Size changed before updating detector elements.");
            }
            S(d, W, ut);
          }
        }), n.add(1, function() {
          if (!i(d)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!Y()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          K(d, W, ut);
        }), mt && at && n.add(2, function() {
          if (!i(d)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!Y()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          at();
        });
      }
      function Y() {
        return !!i(d).container;
      }
      function ft() {
        function at() {
          return i(d).lastNotifiedWidth === void 0;
        }
        w("notifyListenersIfNeeded invoked");
        var W = i(d);
        if (at() && W.lastWidth === W.startSize.width && W.lastHeight === W.startSize.height)
          return w("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        if (W.lastWidth === W.lastNotifiedWidth && W.lastHeight === W.lastNotifiedHeight)
          return w("Not notifying: Size already notified");
        w("Current size not notified, notifying..."), W.lastNotifiedWidth = W.lastWidth, W.lastNotifiedHeight = W.lastHeight, ks(i(d).listeners, function(ut) {
          ut(d);
        });
      }
      function vt() {
        if (w("startanimation triggered."), it(d)) {
          w("Ignoring since element is still unrendered...");
          return;
        }
        w("Element rendered.");
        var at = T(d), W = y(d);
        (at.scrollLeft === 0 || at.scrollTop === 0 || W.scrollLeft === 0 || W.scrollTop === 0) && (w("Scrollbars out of sync. Updating detector elements..."), H(ft));
      }
      function bt() {
        if (w("Scroll detected."), it(d)) {
          w("Scroll event fired while unrendered. Ignoring...");
          return;
        }
        H(ft);
      }
      if (w("registerListenersAndPositionElements invoked."), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      i(d).onRendered = vt, i(d).onExpand = bt, i(d).onShrink = bt;
      var xt = i(d).style;
      S(d, xt.width, xt.height);
    }
    function De() {
      if (w("finalizeDomMutation invoked."), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var S = i(d).style;
      R(d, S.width, S.height), K(d, S.width, S.height);
    }
    function _e() {
      D(d);
    }
    function ct() {
      w("Installing..."), k(), V(), n.add(0, b), n.add(1, q), n.add(2, de), n.add(3, De), n.add(4, _e);
    }
    w("Making detectable..."), B(d) ? (w("Element is detached"), lt(), w("Waiting until element is attached..."), i(d).onRendered = function() {
      w("Element is now attached"), ct();
    }) : ct();
  }
  function M(v) {
    var d = i(v);
    d && (d.onExpandScroll && x(T(v), "scroll", d.onExpandScroll), d.onShrinkScroll && x(y(v), "scroll", d.onShrinkScroll), d.onAnimationStart && x(d.container, "animationstart", d.onAnimationStart), d.container && v.removeChild(d.container));
  }
  return {
    makeDetectable: I,
    addListener: C,
    uninstall: M,
    initDocument: c
  };
}, re = Si.forEach, Rs = xs, Hs = ws, $s = Es, Bs = Ss, Ls = Ts, kn = zi, Ws = Cs, _t = Ps, Fs = Os, Ns = As;
function An(e) {
  return Array.isArray(e) || e.length !== void 0;
}
function Rn(e) {
  if (Array.isArray(e))
    return e;
  var t = [];
  return re(e, function(n) {
    t.push(n);
  }), t;
}
function Hn(e) {
  return e && e.nodeType === 1;
}
var js = function(e) {
  e = e || {};
  var t;
  if (e.idHandler)
    t = {
      get: function(I) {
        return e.idHandler.get(I, !0);
      },
      set: e.idHandler.set
    };
  else {
    var n = $s(), i = Bs({
      idGenerator: n,
      stateHandler: _t
    });
    t = i;
  }
  var o = e.reporter;
  if (!o) {
    var r = o === !1;
    o = Ls(r);
  }
  var a = Pt(e, "batchProcessor", Ws({ reporter: o })), s = {};
  s.callOnAdd = !!Pt(e, "callOnAdd", !0), s.debug = !!Pt(e, "debug", !1);
  var c = Hs(t), l = Rs({
    stateHandler: _t
  }), u, f = Pt(e, "strategy", "object"), h = Pt(e, "important", !1), m = {
    reporter: o,
    batchProcessor: a,
    stateHandler: _t,
    idHandler: t,
    important: h
  };
  if (f === "scroll" && (kn.isLegacyOpera() ? (o.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), f = "object") : kn.isIE(9) && (o.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), f = "object")), f === "scroll")
    u = Ns(m);
  else if (f === "object")
    u = Fs(m);
  else
    throw new Error("Invalid strategy name: " + f);
  var x = {};
  function T(I, M, v) {
    function d(V) {
      var k = c.get(V);
      re(k, function(R) {
        R(V);
      });
    }
    function D(V, k, b) {
      c.add(k, b), V && b(k);
    }
    if (v || (v = M, M = I, I = {}), !M)
      throw new Error("At least one element required.");
    if (!v)
      throw new Error("Listener required.");
    if (Hn(M))
      M = [M];
    else if (An(M))
      M = Rn(M);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    var w = 0, B = Pt(I, "callOnAdd", s.callOnAdd), it = Pt(I, "onReady", function() {
    }), L = Pt(I, "debug", s.debug);
    re(M, function(k) {
      _t.getState(k) || (_t.initState(k), t.set(k));
      var b = t.get(k);
      if (L && o.log("Attaching listener to element", b, k), !l.isDetectable(k)) {
        if (L && o.log(b, "Not detectable."), l.isBusy(k)) {
          L && o.log(b, "System busy making it detectable"), D(B, k, v), x[b] = x[b] || [], x[b].push(function() {
            w++, w === M.length && it();
          });
          return;
        }
        return L && o.log(b, "Making detectable..."), l.markBusy(k, !0), u.makeDetectable({ debug: L, important: h }, k, function($) {
          if (L && o.log(b, "onElementDetectable"), _t.getState($)) {
            l.markAsDetectable($), l.markBusy($, !1), u.addListener($, d), D(B, $, v);
            var J = _t.getState($);
            if (J && J.startSize) {
              var Z = $.offsetWidth, Q = $.offsetHeight;
              (J.startSize.width !== Z || J.startSize.height !== Q) && d($);
            }
            x[b] && re(x[b], function(z) {
              z();
            });
          } else
            L && o.log(b, "Element uninstalled before being detectable.");
          delete x[b], w++, w === M.length && it();
        });
      }
      L && o.log(b, "Already detecable, adding listener."), D(B, k, v), w++;
    }), w === M.length && it();
  }
  function y(I) {
    if (!I)
      return o.error("At least one element is required.");
    if (Hn(I))
      I = [I];
    else if (An(I))
      I = Rn(I);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    re(I, function(M) {
      c.removeAllListeners(M), u.uninstall(M), _t.cleanState(M);
    });
  }
  function C(I) {
    u.initDocument && u.initDocument(I);
  }
  return {
    listenTo: T,
    removeListener: c.removeListener,
    removeAllListeners: c.removeAllListeners,
    uninstall: y,
    initDocument: C
  };
};
function Pt(e, t, n) {
  var i = e[t];
  return i == null && n !== void 0 ? n : i;
}
const Xs = /* @__PURE__ */ ys(js), Ys = {
  name: "GridLayout"
}, Gs = /* @__PURE__ */ $n({
  ...Ys,
  props: {
    autoSize: { type: Boolean, default: !0 },
    colNum: { default: 12 },
    rowHeight: { default: 100 },
    maxRows: { default: 1 / 0 },
    margin: { default: () => [10, 10] },
    isDraggable: { type: Boolean, default: !0 },
    isResizable: { type: Boolean, default: !0 },
    isMirrored: { type: Boolean, default: !1 },
    isBounded: { type: Boolean, default: !1 },
    useCssTransforms: { type: Boolean, default: !0 },
    verticalCompact: { type: Boolean, default: !0 },
    restoreOnDrag: { type: Boolean, default: !1 },
    layout: {},
    responsive: { type: Boolean, default: !1 },
    responsiveLayouts: { default: () => ({}) },
    transformScale: { default: 1 },
    breakpoints: { default: () => ({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }) },
    cols: { default: () => ({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }) },
    preventCollision: { type: Boolean, default: !1 },
    useStyleCursor: { type: Boolean, default: !0 }
  },
  emits: ["layout-created", "layout-before-mount", "layout-mounted", "layout-updated", "layout-ready", "update:layout", "breakpoint-changed"],
  setup(e, { expose: t, emit: n }) {
    const i = e, o = O(null), r = O({}), a = O(0), s = O(!1), c = O({ x: 0, y: 0, w: 0, h: 0, i: -1 }), l = O({}), u = O(null), f = O(null), h = O(null), m = O(), x = O({}), T = O(), y = ms();
    ki("eventBus", y);
    const C = n;
    function I(b) {
      if (!b)
        it();
      else {
        const { eventType: R, i: $, x: J, y: Z, h: Q, w: z } = b;
        it(R, $, J, Z, Q, z);
      }
    }
    function M(b) {
      if (!b)
        B();
      else {
        const { eventType: R, i: $, x: J, y: Z, h: Q, w: z } = b;
        B(R, $, J, Z, Q, z);
      }
    }
    y.on("resizeEvent", I), y.on("dragEvent", M), C("layout-created", i.layout), Bn(() => {
      y.off("resizeEvent", I), y.off("dragEvent", M), to("resize", D), h.value && h.value.uninstall(x.value);
    }), Ai(() => {
      C("layout-before-mount", i.layout);
    }), Ln(() => {
      C("layout-mounted", i.layout), Tt(function() {
        Gi(i.layout), f.value = i.layout, Tt(() => {
          V(), D(), Qi("resize", D), Kt(i.layout, i.verticalCompact), C("layout-updated", i.layout), d(), Tt(() => {
            h.value = Xs({
              strategy: "scroll",
              //<- For ultra performance.
              // See https://github.com/wnr/element-resize-detector/issues/110 about callOnAdd.
              callOnAdd: !1
            }), h.value.listenTo(x.value, function() {
              D();
            });
          });
        });
      });
    }), N(o, (b, R) => {
      Tt(() => {
        y.emit("updateWidth", b), R === null && Tt(() => {
          C("layout-ready", i.layout);
        }), d();
      });
    }), N(
      () => i.layout,
      () => {
        v();
      }
    ), N(
      () => i.layout.length,
      () => {
        v();
      }
    ), N(
      () => i.colNum,
      (b) => {
        y.emit("setColNum", b);
      }
    ), N(
      () => i.rowHeight,
      (b) => {
        y.emit("setRowHeight", b);
      }
    ), N(
      () => i.isDraggable,
      (b) => {
        y.emit("setDraggable", b);
      }
    ), N(
      () => i.isResizable,
      (b) => {
        y.emit("setResizable", b);
      }
    ), N(
      () => i.isBounded,
      (b) => {
        y.emit("setBounded", b);
      }
    ), N(
      () => i.transformScale,
      (b) => {
        y.emit("setTransformScale", b);
      }
    ), N(
      () => i.responsive,
      (b) => {
        b || (C("update:layout", f.value || []), y.emit("setColNum", i.colNum)), D();
      }
    ), N(
      () => i.maxRows,
      (b) => {
        y.emit("setMaxRows", b);
      }
    ), N(
      () => i.margin,
      () => {
        d();
      }
    );
    function v() {
      if (i.layout !== void 0 && f.value !== null) {
        if (i.layout.length !== f.value.length) {
          let b = k(i.layout, f.value);
          b.length > 0 && (i.layout.length > f.value.length ? f.value = f.value.concat(b) : f.value = f.value.filter((R) => !b.some(($) => R.i === $.i))), a.value = i.layout.length, V();
        }
        Kt(i.layout, i.verticalCompact), y.emit("updateWidth", o.value), d(), C("layout-updated", i.layout);
      }
    }
    function d() {
      r.value = {
        height: w()
      };
    }
    function D() {
      x.value !== null && x.value !== void 0 && (o.value = x.value.offsetWidth), y.emit("resizeEvent");
    }
    function w() {
      return i.autoSize ? Bi(i.layout) * (i.rowHeight + i.margin[1]) + i.margin[1] + "px" : "";
    }
    function B(b, R, $, J, Z, Q) {
      let z = fn(i.layout, R);
      z == null && (z = { x: 0, y: 0 }), b === "dragstart" && !i.verticalCompact && (m.value = i.layout.reduce(
        (ot, { i: K, x: lt, y: q }) => ({
          ...ot,
          [K]: { x: lt, y: q }
        }),
        {}
      )), b === "dragmove" || b === "dragstart" ? (c.value.i = R, c.value.x = z.x, c.value.y = z.y, c.value.w = Q, c.value.h = Z, Tt(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : Tt(function() {
        s.value = !1;
      });
      const rt = Ge(i.layout, z, $, J, !0, i.preventCollision);
      C("update:layout", rt), i.restoreOnDrag ? (z.static = !0, Kt(i.layout, i.verticalCompact, m.value), z.static = !1) : Kt(i.layout, i.verticalCompact), y.emit("compact"), d(), b === "dragend" && (m.value = void 0, C("layout-updated", rt));
    }
    function it(b, R, $, J, Z, Q) {
      let z = fn(i.layout, R);
      z == null && (z = { h: 0, w: 0 }), Q = Number(Q), Z = Number(Z);
      let rt;
      if (i.preventCollision) {
        const ot = Nn(i.layout, { ...z, w: Q, h: Z }).filter(
          (K) => K.i !== (z == null ? void 0 : z.i)
        );
        if (rt = ot.length > 0, rt) {
          let K = 1 / 0, lt = 1 / 0;
          ot.forEach((q) => {
            q.x > Number(z == null ? void 0 : z.x) && (K = Math.min(K, q.x)), q.y > Number(z == null ? void 0 : z.y) && (lt = Math.min(lt, q.y));
          }), Number.isFinite(K) && (z.w = K - z.x), Number.isFinite(lt) && (z.h = lt - z.y);
        }
      }
      rt || (z.w = Q, z.h = Z), b === "resizestart" || b === "resizemove" ? (c.value.i = R, c.value.x = $, c.value.y = J, c.value.w = z.w, c.value.h = z.h, Tt(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : Tt(function() {
        s.value = !1;
      }), i.responsive && L(), Kt(i.layout, i.verticalCompact), y.emit("compact"), d(), b === "resizeend" && C("layout-updated", i.layout);
    }
    function L() {
      let b = Vi(i.breakpoints, o.value), R = qe(b, i.cols);
      u.value != null && !l.value[u.value] && (l.value[u.value] = Ye(i.layout));
      let $ = Ki(
        f.value,
        l.value,
        i.breakpoints,
        b,
        u.value,
        R,
        i.verticalCompact
      );
      l.value[b] = $, u.value !== b && C("breakpoint-changed", b, $), C("update:layout", $), u.value = b, y.emit("setColNum", qe(b, i.cols));
    }
    function V() {
      l.value = Object.assign({}, i.responsiveLayouts);
    }
    function k(b, R) {
      let $ = b.filter(function(Z) {
        return !R.some(function(Q) {
          return Z.i === Q.i;
        });
      }), J = R.filter(function(Z) {
        return !b.some(function(Q) {
          return Z.i === Q.i;
        });
      });
      return $.concat(J);
    }
    return t({
      ...i,
      width: o,
      mergeStyle: r,
      lastLayoutLength: a,
      isDragging: s,
      placeholder: c,
      layouts: l,
      lastBreakpoint: u,
      originalLayout: f,
      erd: h,
      defaultGridItem: T,
      dragEvent: B
    }), (b, R) => (Ne(), je("div", {
      ref_key: "this$refsLayout",
      ref: x,
      class: "vue-grid-layout",
      style: Xe(r.value)
    }, [
      Wn(b.$slots, "default"),
      Ri(Hi(wi, {
        ref_key: "defaultGridItem",
        ref: T,
        class: "vue-grid-placeholder",
        x: c.value.x,
        y: c.value.y,
        w: c.value.w,
        h: c.value.h,
        i: c.value.i
      }, null, 8, ["x", "y", "w", "h", "i"]), [
        [$i, s.value]
      ])
    ], 4));
  }
}), qs = [Gs, wi], Vs = {
  install(e) {
    qs.forEach((t) => {
      e.component(t.name, t);
    });
  }
};
export {
  wi as GridItem,
  Gs as GridLayout,
  Vs as default
};
