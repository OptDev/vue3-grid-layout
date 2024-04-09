import './style.css';
import { getCurrentInstance as ji, defineComponent as Xn, inject as Xi, ref as O, computed as te, watch as F, onBeforeUnmount as Yn, onMounted as Gn, useSlots as Yi, openBlock as Je, createElementBlock as Ze, normalizeClass as yn, normalizeStyle as Qe, renderSlot as qn, createCommentVNode as Gi, provide as qi, onBeforeMount as Ui, nextTick as _t, withDirectives as Vi, createVNode as Ki, vShow as Ji } from "vue";
function Zi(e) {
  let t = 0, n;
  for (let i = 0, o = e.length; i < o; i++)
    n = e[i].y + e[i].h, n > t && (t = n);
  return t;
}
function tn(e) {
  const t = Array(e.length);
  for (let n = 0, i = e.length; n < i; n++)
    t[n] = Qi(e[n]);
  return t;
}
function Qi(e) {
  return JSON.parse(JSON.stringify(e));
}
function Un(e, t) {
  return !(e === t || e.x + e.w <= t.x || e.x >= t.x + t.w || e.y + e.h <= t.y || e.y >= t.y + t.h);
}
function ne(e, t, n) {
  const i = Kn(e), o = Jn(e), r = Array(e.length);
  for (let a = 0, s = o.length; a < s; a++) {
    let c = o[a];
    c.static || (c = to(i, c, t, n), i.push(c)), r[e.indexOf(c)] = c, c.moved = !1;
  }
  return r;
}
function to(e, t, n, i) {
  if (n)
    for (; t.y > 0 && !ve(e, t); )
      t.y--;
  else if (i) {
    const r = i[t.i].y;
    for (; t.y > r && !ve(e, t); )
      t.y--;
  }
  let o;
  for (; o = ve(e, t); )
    t.y = o.y + o.h;
  return t;
}
function eo(e, t) {
  const n = Kn(e);
  for (let i = 0, o = e.length; i < o; i++) {
    const r = e[i];
    if (r.x + r.w > t.cols && (r.x = t.cols - r.w), r.x < 0 && (r.x = 0, r.w = t.cols), !r.static)
      n.push(r);
    else
      for (; ve(n, r); )
        r.y++;
  }
  return e;
}
function bn(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (e[n].i === t)
      return e[n];
}
function ve(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (Un(e[n], t))
      return e[n];
}
function Vn(e, t) {
  return e.filter((n) => Un(n, t));
}
function Kn(e) {
  return e.filter((t) => t.static);
}
function en(e, t, n, i, o, r) {
  if (t.static)
    return e;
  const a = t.x, s = t.y, c = i && t.y > i;
  typeof n == "number" && (t.x = n), typeof i == "number" && (t.y = i), t.moved = !0;
  let l = Jn(e);
  c && (l = l.reverse());
  const u = Vn(l, t);
  if (r && u.length)
    return t.x = a, t.y = s, t.moved = !1, e;
  for (let d = 0, p = u.length; d < p; d++) {
    const y = u[d];
    y.moved || t.y > y.y && t.y - y.y > y.h / 4 || (y.static ? e = xn(e, y, t, o) : e = xn(e, t, y, o));
  }
  return e;
}
function xn(e, t, n, i) {
  if (i) {
    const r = {
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
      i: "-1"
    };
    if (r.y = Math.max(t.y - n.h, 0), !ve(e, r))
      return en(e, n, void 0, r.y, !1);
  }
  return en(e, n, void 0, n.y + 1, !1);
}
function no(e, t, n, i) {
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
function io(e, t, n, i) {
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
function oo(e, t, n, i) {
  return {
    top: e + "px",
    left: t + "px",
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function ro(e, t, n, i) {
  return {
    top: e + "px",
    right: t + "px",
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Jn(e) {
  return [].concat(e).sort(function(n, i) {
    return n.y === i.y && n.x === i.x ? 0 : n.y > i.y || n.y === i.y && n.x > i.x ? 1 : -1;
  });
}
function so(e, t) {
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
function wn(e) {
  return ao(e);
}
function ao(e) {
  const t = e.target, n = t.offsetParent || document.body, i = t.offsetParent === document.body ? { left: 0, top: 0 } : n.getBoundingClientRect(), o = e.clientX + n.scrollLeft - i.left, r = e.clientY + n.scrollTop - i.top;
  return { x: o, y: r };
}
function Ie(e, t, n, i) {
  return lo(e) ? {
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
function lo(e) {
  return typeof e == "number" && !isNaN(e);
}
function co(e, t) {
  const n = Zn(e);
  let i = n[0];
  for (let o = 1, r = n.length; o < r; o++) {
    const a = n[o];
    t > e[a] && (i = a);
  }
  return i;
}
function nn(e, t) {
  if (!t[e])
    throw new Error(
      "ResponsiveGridLayout: `cols` entry for breakpoint " + e + " is missing!"
    );
  return t[e];
}
function uo(e, t, n, i, o, r, a) {
  if (t[i])
    return tn(t[i]);
  let s = e;
  const c = Zn(n), l = c.slice(c.indexOf(i));
  for (let u = 0, d = l.length; u < d; u++) {
    const p = l[u];
    if (t[p]) {
      s = t[p];
      break;
    }
  }
  return s = tn(s || []), ne(eo(s, { cols: r }), a);
}
function Zn(e) {
  return Object.keys(e).sort(function(n, i) {
    return e[n] - e[i];
  });
}
let fo = "auto";
function ho() {
  return typeof document < "u";
}
function Qn() {
  return typeof window < "u";
}
function En() {
  return ho() ? typeof document.dir < "u" ? document.dir : document.getElementsByTagName("html")[0].getAttribute("dir") || "auto" : fo;
}
function po(e, t) {
  return Qn ? (window.addEventListener(e, t), !0) : (t(), !1);
}
function go(e, t) {
  Qn && window.removeEventListener(e, t);
}
const J = {
  init: vo,
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
function ee() {
}
function vo(e) {
  const t = e;
  J.document = t.document, J.DocumentFragment = t.DocumentFragment || ee, J.SVGElement = t.SVGElement || ee, J.SVGSVGElement = t.SVGSVGElement || ee, J.SVGElementInstance = t.SVGElementInstance || ee, J.Element = t.Element || ee, J.HTMLElement = t.HTMLElement || J.Element, J.Event = t.Event, J.Touch = t.Touch || ee, J.PointerEvent = t.PointerEvent || t.MSPointerEvent;
}
var ti = (e) => !!(e && e.Window) && e instanceof e.Window;
let ei, Nt;
function ni(e) {
  ei = e;
  const t = e.document.createTextNode("");
  t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), Nt = e;
}
typeof window < "u" && window && ni(window);
function Jt(e) {
  return ti(e) ? e : (e.ownerDocument || e).defaultView || Nt.window;
}
const mo = (e) => e === Nt || ti(e), yo = (e) => ke(e) && e.nodeType === 11, ke = (e) => !!e && typeof e == "object", ii = (e) => typeof e == "function", bo = (e) => typeof e == "number", xo = (e) => typeof e == "boolean", wo = (e) => typeof e == "string", Eo = (e) => {
  if (!e || typeof e != "object")
    return !1;
  const t = Jt(e) || Nt;
  return /object|function/.test(typeof Element) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
}, So = (e) => ke(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString()), To = (e) => ke(e) && typeof e.length < "u" && ii(e.splice);
var g = {
  window: mo,
  docFrag: yo,
  object: ke,
  func: ii,
  number: bo,
  bool: xo,
  string: wo,
  element: Eo,
  plainObject: So,
  array: To
};
const et = {
  init: Io,
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
function Io(e) {
  const t = J.Element, n = e.navigator || {};
  et.supportsTouch = "ontouchstart" in e || g.func(e.DocumentTouch) && J.document instanceof e.DocumentTouch, et.supportsPointerEvent = n.pointerEnabled !== !1 && !!J.PointerEvent, et.isIOS = /iP(hone|od|ad)/.test(n.platform), et.isIOS7 = /iP(hone|od|ad)/.test(n.platform) && /OS 7[^\d]/.test(n.appVersion), et.isIe9 = /MSIE 9/.test(n.userAgent), et.isOperaMobile = n.appName === "Opera" && et.supportsTouch && /Presto/.test(n.userAgent), et.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", et.pEventTypes = et.supportsPointerEvent ? J.PointerEvent === e.MSPointerEvent ? {
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
  } : null, et.wheelEvent = J.document && "onmousewheel" in J.document ? "mousewheel" : "wheel";
}
function Vt(e, t) {
  if (e.contains)
    return e.contains(t);
  for (; t; ) {
    if (t === e)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
function oi(e, t) {
  for (; g.element(e); ) {
    if (Zt(e, t))
      return e;
    e = Wt(e);
  }
  return null;
}
function Wt(e) {
  let t = e.parentNode;
  if (g.docFrag(t)) {
    for (; (t = t.host) && g.docFrag(t); )
      ;
    return t;
  }
  return t;
}
function Zt(e, t) {
  return Nt !== ei && (t = t.replace(/\/deep\//g, " ")), e[et.prefixedMatchesSelector](t);
}
function on(e, t, n) {
  for (; g.element(e); ) {
    if (Zt(e, t))
      return !0;
    if (e = Wt(e), e === n)
      return Zt(e, t);
  }
  return !1;
}
function Sn(e) {
  return e.correspondingUseElement || e;
}
function zo(e) {
  return e = e || Nt, {
    x: e.scrollX || e.document.documentElement.scrollLeft,
    y: e.scrollY || e.document.documentElement.scrollTop
  };
}
function cn(e) {
  const t = e instanceof J.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
  return t && {
    left: t.left,
    right: t.right,
    top: t.top,
    bottom: t.bottom,
    width: t.width || t.right - t.left,
    height: t.height || t.bottom - t.top
  };
}
function un(e) {
  const t = cn(e);
  if (!et.isIOS7 && t) {
    const n = zo(Jt(e));
    t.left += n.x, t.right += n.x, t.top += n.y, t.bottom += n.y;
  }
  return t;
}
function Tn(e) {
  return g.string(e) ? (J.document.querySelector(e), !0) : !1;
}
function _(e, t) {
  for (const i in t)
    e[i] = t[i];
  return e;
}
function be(e, t) {
  let n = !1;
  return function() {
    return n || (Nt.console.warn(t), n = !0), e.apply(this, arguments);
  };
}
function ri(e, t) {
  return e.name = t.name, e.axis = t.axis, e.edges = t.edges, e;
}
function Co(e) {
  const {
    Interactable: t
    // tslint:disable-line no-shadowed-variable
  } = e;
  t.prototype.getAction = function(i, o, r, a) {
    const s = Mo(this, o, r, a, e);
    return this.options.actionChecker ? this.options.actionChecker(i, o, s, this, a, r) : s;
  }, t.prototype.ignoreFrom = be(function(n) {
    return this._backCompatOption("ignoreFrom", n);
  }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = be(function(n) {
    return this._backCompatOption("allowFrom", n);
  }, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), t.prototype.actionChecker = _o, t.prototype.styleCursor = Do;
}
function Mo(e, t, n, i, o) {
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
function Do(e) {
  return g.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor;
}
function _o(e) {
  return g.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker;
}
var Po = {
  id: "auto-start/interactableMethods",
  install: Co
};
function Oo(e) {
  const {
    interactStatic: t,
    defaults: n
  } = e;
  e.usePlugin(Po), n.base.actionChecker = null, n.base.styleCursor = !0, _(n.perAction, {
    manualStart: !1,
    max: 1 / 0,
    maxPerElement: 1,
    allowFrom: null,
    ignoreFrom: null,
    // only allow left button by default
    // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
    mouseButtons: 1
  }), t.maxInteractions = (i) => ci(i, e), e.autoStart = {
    // Allow this many interactions to happen simultaneously
    maxInteractions: 1 / 0,
    withinInteractionLimit: Ae,
    cursorElement: null
  };
}
function Ro(e, t) {
  let {
    interaction: n,
    pointer: i,
    event: o,
    eventTarget: r
  } = e;
  if (n.interacting())
    return;
  const a = ai(n, i, o, r, t);
  li(n, a, t);
}
function ko(e, t) {
  let {
    interaction: n,
    pointer: i,
    event: o,
    eventTarget: r
  } = e;
  if (n.pointerType !== "mouse" || n.pointerIsDown || n.interacting())
    return;
  const a = ai(n, i, o, r, t);
  li(n, a, t);
}
function Ao(e, t) {
  const {
    interaction: n
  } = e;
  if (!n.pointerIsDown || n.interacting() || !n.pointerWasMoved || !n.prepared.name)
    return;
  t.fire("autoStart:before-start", e);
  const {
    interactable: i
  } = n, o = n.prepared.name;
  o && i && (i.options[o].manualStart || !Ae(i, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, i, n.element), ui(n, t)));
}
function Ho(e, t) {
  let {
    interaction: n
  } = e;
  const {
    interactable: i
  } = n;
  i && i.options.styleCursor && rn(n.element, "", t);
}
function si(e, t, n, i, o) {
  return t.testIgnoreAllow(t.options[e.name], n, i) && t.options[e.name].enabled && Ae(t, n, e, o) ? e : null;
}
function $o(e, t, n, i, o, r, a) {
  for (let s = 0, c = i.length; s < c; s++) {
    const l = i[s], u = o[s], d = l.getAction(t, n, e, u);
    if (!d)
      continue;
    const p = si(d, l, u, r, a);
    if (p)
      return {
        action: p,
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
function ai(e, t, n, i, o) {
  let r = [], a = [], s = i;
  function c(l) {
    r.push(l), a.push(s);
  }
  for (; g.element(s); ) {
    r = [], a = [], o.interactables.forEachMatch(s, c);
    const l = $o(e, t, n, r, a, i, o);
    if (l.action && !l.interactable.options[l.action.name].manualStart)
      return l;
    s = Wt(s);
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function li(e, t, n) {
  let {
    action: i,
    interactable: o,
    element: r
  } = t;
  i = i || {
    name: null
  }, e.interactable = o, e.element = r, ri(e.prepared, i), e.rect = o && i.name ? o.getRect(r) : null, ui(e, n), n.fire("autoStart:prepared", {
    interaction: e
  });
}
function Ae(e, t, n, i) {
  const o = e.options, r = o[n.name].max, a = o[n.name].maxPerElement, s = i.autoStart.maxInteractions;
  let c = 0, l = 0, u = 0;
  if (!(r && a && s))
    return !1;
  for (const d of i.interactions.list) {
    const p = d.prepared.name;
    if (d.interacting()) {
      if (c++, c >= s)
        return !1;
      if (d.interactable === e && (l += p === n.name ? 1 : 0, l >= r || d.element === t && (u++, p === n.name && u >= a)))
        return !1;
    }
  }
  return s > 0;
}
function ci(e, t) {
  return g.number(e) ? (t.autoStart.maxInteractions = e, this) : t.autoStart.maxInteractions;
}
function rn(e, t, n) {
  const {
    cursorElement: i
  } = n.autoStart;
  i && i !== e && (i.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = t, e.style.cursor = t, n.autoStart.cursorElement = t ? e : null;
}
function ui(e, t) {
  const {
    interactable: n,
    element: i,
    prepared: o
  } = e;
  if (!(e.pointerType === "mouse" && n && n.options.styleCursor)) {
    t.autoStart.cursorElement && rn(t.autoStart.cursorElement, "", t);
    return;
  }
  let r = "";
  if (o.name) {
    const a = n.options[o.name].cursorChecker;
    g.func(a) ? r = a(o, n, i, e._interacting) : r = t.actions.map[o.name].getCursor(o);
  }
  rn(e.element, r || "", t);
}
const fn = {
  id: "auto-start/base",
  before: ["actions"],
  install: Oo,
  listeners: {
    "interactions:down": Ro,
    "interactions:move": (e, t) => {
      ko(e, t), Ao(e, t);
    },
    "interactions:stop": Ho
  },
  maxInteractions: ci,
  withinInteractionLimit: Ae,
  validateAction: si
};
function Bo(e, t) {
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
    let d = i;
    const p = function(y) {
      if (y === n.interactable)
        return;
      const x = n.interactable.options.drag;
      if (!x.manualStart && y.testIgnoreAllow(x, d, i)) {
        const z = y.getAction(n.downPointer, n.downEvent, n, d);
        if (z && z.name === "drag" && Lo(u, y) && fn.validateAction(z, y, d, i, t))
          return y;
      }
    };
    for (; g.element(d); ) {
      const y = t.interactables.forEachMatch(d, p);
      if (y) {
        n.prepared.name = "drag", n.interactable = y, n.element = d;
        break;
      }
      d = Wt(d);
    }
  }
}
function Lo(e, t) {
  if (!t)
    return !1;
  const n = t.options.drag.startAxis;
  return e === "xy" || n === "xy" || n === e;
}
var No = {
  id: "auto-start/dragAxis",
  listeners: {
    "autoStart:before-start": Bo
  }
};
function Wo(e) {
  const {
    defaults: t
  } = e;
  e.usePlugin(fn), t.perAction.hold = 0, t.perAction.delay = 0;
}
function Ye(e) {
  const t = e.prepared && e.prepared.name;
  if (!t)
    return null;
  const n = e.interactable.options;
  return n[t].hold || n[t].delay;
}
const Fo = {
  id: "auto-start/hold",
  install: Wo,
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
      const n = Ye(t);
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
      Ye(t) > 0 && (t.prepared.name = null);
    }
  },
  getHoldDuration: Ye
};
var jo = {
  id: "auto-start",
  install(e) {
    e.usePlugin(fn), e.usePlugin(Fo), e.usePlugin(No);
  }
};
const fi = (e, t) => {
  for (const n of t)
    e.push(n);
  return e;
}, di = (e) => fi([], e), He = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (t(e[n], n, e))
      return n;
  return -1;
}, Me = (e, t) => e[He(e, t)];
function oe(e) {
  const t = {};
  for (const n in e) {
    const i = e[n];
    g.plainObject(i) ? t[n] = oe(i) : g.array(i) ? t[n] = di(i) : t[n] = i;
  }
  return t;
}
let In = 0, Pt, Ut;
function Xo(e) {
  if (Pt = e.requestAnimationFrame, Ut = e.cancelAnimationFrame, !Pt) {
    const t = ["ms", "moz", "webkit", "o"];
    for (const n of t)
      Pt = e[`${n}RequestAnimationFrame`], Ut = e[`${n}CancelAnimationFrame`] || e[`${n}CancelRequestAnimationFrame`];
  }
  Pt = Pt && Pt.bind(e), Ut = Ut && Ut.bind(e), Pt || (Pt = (t) => {
    const n = Date.now(), i = Math.max(0, 16 - (n - In)), o = e.setTimeout(() => {
      t(n + i);
    }, i);
    return In = n + i, o;
  }, Ut = (t) => clearTimeout(t));
}
var ie = {
  request: (e) => Pt(e),
  cancel: (e) => Ut(e),
  init: Xo
};
function Kt(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (o) => !0, i = arguments.length > 3 ? arguments[3] : void 0;
  if (i = i || {}, g.string(e) && e.search(" ") !== -1 && (e = zn(e)), g.array(e))
    return e.forEach((o) => Kt(o, t, n, i)), i;
  if (g.object(e) && (t = e, e = ""), g.func(t) && n(e))
    i[e] = i[e] || [], i[e].push(t);
  else if (g.array(t))
    for (const o of t)
      Kt(e, o, n, i);
  else if (g.object(t))
    for (const o in t) {
      const r = zn(o).map((a) => `${e}${a}`);
      Kt(r, t[o], n, i);
    }
  return i;
}
function zn(e) {
  return e.trim().split(/ +/);
}
function Cn(e, t) {
  for (const n of t) {
    if (e.immediatePropagationStopped)
      break;
    n(e);
  }
}
class hi {
  constructor(t) {
    this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = _({}, t || {});
  }
  fire(t) {
    let n;
    const i = this.global;
    (n = this.types[t.type]) && Cn(t, n), !t.propagationStopped && i && (n = i[t.type]) && Cn(t, n);
  }
  on(t, n) {
    const i = Kt(t, n);
    for (t in i)
      this.types[t] = fi(this.types[t] || [], i[t]);
  }
  off(t, n) {
    const i = Kt(t, n);
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
const Yo = ["webkit", "moz"];
function pi(e, t) {
  e.__set || (e.__set = {});
  for (const n in t)
    Yo.some((i) => n.indexOf(i) === 0) || typeof e[n] != "function" && n !== "__set" && Object.defineProperty(e, n, {
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
var $e = (e, t) => Math.sqrt(e * e + t * t);
function Ge(e, t) {
  e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
}
function Go(e, t, n) {
  e.page.x = n.page.x - t.page.x, e.page.y = n.page.y - t.page.y, e.client.x = n.client.x - t.client.x, e.client.y = n.client.y - t.client.y, e.timeStamp = n.timeStamp - t.timeStamp;
}
function qo(e, t) {
  const n = Math.max(t.timeStamp / 1e3, 1e-3);
  e.page.x = t.page.x / n, e.page.y = t.page.y / n, e.client.x = t.client.x / n, e.client.y = t.client.y / n, e.timeStamp = n;
}
function Uo(e) {
  e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
}
function gi(e) {
  return e instanceof J.Event || e instanceof J.Touch;
}
function _e(e, t, n) {
  return n = n || {}, e = e || "page", n.x = t[e + "X"], n.y = t[e + "Y"], n;
}
function Vo(e, t) {
  return t = t || {
    x: 0,
    y: 0
  }, et.isOperaMobile && gi(e) ? (_e("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : _e("page", e, t), t;
}
function Ko(e, t) {
  return t = t || {}, et.isOperaMobile && gi(e) ? _e("screen", e, t) : _e("client", e, t), t;
}
function Pe(e) {
  return g.number(e.pointerId) ? e.pointerId : e.identifier;
}
function Jo(e, t, n) {
  const i = t.length > 1 ? vi(t) : t[0];
  Vo(i, e.page), Ko(i, e.client), e.timeStamp = n;
}
function dn(e) {
  const t = [];
  return g.array(e) ? (t[0] = e[0], t[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (t[0] = e.touches[0], t[1] = e.changedTouches[0]) : e.touches.length === 0 && (t[0] = e.changedTouches[0], t[1] = e.changedTouches[1]) : (t[0] = e.touches[0], t[1] = e.touches[1]), t;
}
function vi(e) {
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
function Zo(e) {
  if (!e.length)
    return null;
  const t = dn(e), n = Math.min(t[0].pageX, t[1].pageX), i = Math.min(t[0].pageY, t[1].pageY), o = Math.max(t[0].pageX, t[1].pageX), r = Math.max(t[0].pageY, t[1].pageY);
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
function Qo(e, t) {
  const n = t + "X", i = t + "Y", o = dn(e), r = o[0][n] - o[1][n], a = o[0][i] - o[1][i];
  return $e(r, a);
}
function tr(e, t) {
  const n = t + "X", i = t + "Y", o = dn(e), r = o[1][n] - o[0][n], a = o[1][i] - o[0][i];
  return 180 * Math.atan2(a, r) / Math.PI;
}
function er(e) {
  return g.string(e.pointerType) ? e.pointerType : g.number(e.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][e.pointerType] : (
    // if the PointerEvent API isn't available, then the "pointer" must
    // be either a MouseEvent, TouchEvent, or Touch object
    /touch/.test(e.type || "") || e instanceof J.Touch ? "touch" : "mouse"
  );
}
function mi(e) {
  const t = g.func(e.composedPath) ? e.composedPath() : e.path;
  return [Sn(t ? t[0] : e.target), Sn(e.currentTarget)];
}
function fe() {
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
function nr(e) {
  var t;
  const n = [], i = {}, o = [], r = {
    add: a,
    remove: s,
    addDelegate: c,
    removeDelegate: l,
    delegateListener: u,
    delegateUseCapture: d,
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
  function a(p, y, x, z) {
    if (!p.addEventListener)
      return;
    const m = de(z);
    let D = Me(n, (C) => C.eventTarget === p);
    D || (D = {
      eventTarget: p,
      events: {}
    }, n.push(D)), D.events[y] || (D.events[y] = []), Me(D.events[y], (C) => C.func === x && ze(C.options, m)) || (p.addEventListener(y, x, r.supportsOptions ? m : m.capture), D.events[y].push({
      func: x,
      options: m
    }));
  }
  function s(p, y, x, z) {
    if (!p.addEventListener || !p.removeEventListener)
      return;
    const m = He(n, (v) => v.eventTarget === p), D = n[m];
    if (!D || !D.events)
      return;
    if (y === "all") {
      for (y in D.events)
        D.events.hasOwnProperty(y) && s(p, y, "all");
      return;
    }
    let C = !1;
    const M = D.events[y];
    if (M)
      if (x === "all") {
        for (let v = M.length - 1; v >= 0; v--) {
          const h = M[v];
          s(p, y, h.func, h.options);
        }
        return;
      } else {
        const v = de(z);
        for (let h = 0; h < M.length; h++) {
          const T = M[h];
          if (T.func === x && ze(T.options, v)) {
            p.removeEventListener(y, x, r.supportsOptions ? v : v.capture), M.splice(h, 1), M.length === 0 && (delete D.events[y], C = !0);
            break;
          }
        }
      }
    C && !Object.keys(D.events).length && n.splice(m, 1);
  }
  function c(p, y, x, z, m) {
    const D = de(m);
    if (!i[x]) {
      i[x] = [];
      for (const v of o)
        a(v, x, u), a(v, x, d, !0);
    }
    const C = i[x];
    let M = Me(C, (v) => v.selector === p && v.context === y);
    M || (M = {
      selector: p,
      context: y,
      listeners: []
    }, C.push(M)), M.listeners.push({
      func: z,
      options: D
    });
  }
  function l(p, y, x, z, m) {
    const D = de(m), C = i[x];
    let M = !1, v;
    if (C)
      for (v = C.length - 1; v >= 0; v--) {
        const h = C[v];
        if (h.selector === p && h.context === y) {
          const {
            listeners: T
          } = h;
          for (let w = T.length - 1; w >= 0; w--) {
            const H = T[w];
            if (H.func === z && ze(H.options, D)) {
              T.splice(w, 1), T.length || (C.splice(v, 1), s(y, x, u), s(y, x, d, !0)), M = !0;
              break;
            }
          }
          if (M)
            break;
        }
      }
  }
  function u(p, y) {
    const x = de(y), z = new ir(p), m = i[p.type], [D] = mi(p);
    let C = D;
    for (; g.element(C); ) {
      for (let M = 0; M < m.length; M++) {
        const v = m[M], {
          selector: h,
          context: T
        } = v;
        if (Zt(C, h) && Vt(T, D) && Vt(T, C)) {
          const {
            listeners: w
          } = v;
          z.currentTarget = C;
          for (const H of w)
            ze(H.options, x) && H.func(z);
        }
      }
      C = Wt(C);
    }
  }
  function d(p) {
    return u.call(this, p, !0);
  }
  return r;
}
class ir {
  constructor(t) {
    this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = t, pi(this, t);
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
function de(e) {
  return g.object(e) ? {
    capture: !!e.capture,
    passive: !!e.passive
  } : {
    capture: !!e,
    passive: !1
  };
}
function ze(e, t) {
  return e === t ? !0 : typeof e == "boolean" ? !!t.capture === e && !t.passive : !!e.capture == !!t.capture && !!e.passive == !!t.passive;
}
var or = {
  id: "events",
  install: nr
};
const rr = function(t) {
  return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t, this) : g.bool(t) ? (this.options.preventDefault = t ? "always" : "never", this) : this.options.preventDefault;
};
function sr(e, t, n) {
  const i = e.options.preventDefault;
  if (i !== "never") {
    if (i === "always") {
      n.preventDefault();
      return;
    }
    if (t.events.supportsPassive && /^touch(start|move)$/.test(n.type)) {
      const o = Jt(n.target).document, r = t.getDocOptions(o);
      if (!(r && r.events) || r.events.passive !== !1)
        return;
    }
    /^(mouse|pointer|touch)*(down|start)/i.test(n.type) || g.element(n.target) && Zt(n.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n.preventDefault();
  }
}
function ar(e) {
  let {
    interaction: t,
    event: n
  } = e;
  t.interactable && t.interactable.checkAndPreventDefault(n);
}
function lr(e) {
  const {
    Interactable: t
  } = e;
  t.prototype.preventDefault = rr, t.prototype.checkAndPreventDefault = function(n) {
    return sr(this, e, n);
  }, e.interactions.docEvents.push({
    type: "dragstart",
    listener(n) {
      for (const i of e.interactions.list)
        if (i.element && (i.element === n.target || Vt(i.element, n.target))) {
          i.interactable.checkAndPreventDefault(n);
          return;
        }
    }
  });
}
var cr = {
  id: "core/interactablePreventDefault",
  install: lr,
  listeners: ["down", "move", "up", "cancel"].reduce((e, t) => (e[`interactions:${t}`] = ar, e), {})
};
function yi(e, t, n) {
  return e === "parent" ? Wt(n) : e === "self" ? t.getRect(n) : oi(n, e);
}
function xe(e, t, n, i) {
  let o = e;
  return g.string(o) ? o = yi(o, t, n) : g.func(o) && (o = o(...i)), g.element(o) && (o = un(o)), o;
}
function Be(e) {
  return e && {
    x: "x" in e ? e.x : e.left,
    y: "y" in e ? e.y : e.top
  };
}
function ur(e) {
  return e && !("left" in e && "top" in e) && (e = _({}, e), e.left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
}
function Mn(e) {
  return e && !("x" in e && "y" in e) && (e = _({}, e), e.x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
}
function hn(e, t, n) {
  e.left && (t.left += n.x), e.right && (t.right += n.x), e.top && (t.top += n.y), e.bottom && (t.bottom += n.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
}
function pn(e, t, n) {
  const i = n && e.options[n], r = i && i.origin || e.options.origin, a = xe(r, e, t, [e && t]);
  return Be(a) || {
    x: 0,
    y: 0
  };
}
class bi {
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
Object.defineProperty(bi.prototype, "interaction", {
  get() {
    return this._interaction._proxy;
  },
  set() {
  }
});
const xi = {
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
class gn extends bi {
  constructor(t, n, i, o, r, a, s) {
    super(t), this.relatedTarget = null, this.screenX = void 0, this.screenY = void 0, this.button = void 0, this.buttons = void 0, this.ctrlKey = void 0, this.shiftKey = void 0, this.altKey = void 0, this.metaKey = void 0, this.page = void 0, this.client = void 0, this.delta = void 0, this.rect = void 0, this.x0 = void 0, this.y0 = void 0, this.t0 = void 0, this.dt = void 0, this.duration = void 0, this.clientX0 = void 0, this.clientY0 = void 0, this.velocity = void 0, this.speed = void 0, this.swipe = void 0, this.axes = void 0, this.preEnd = void 0, r = r || t.element;
    const c = t.interactable, l = (c && c.options || xi).deltaSource, u = pn(c, r, i), d = o === "start", p = o === "end", y = d ? this : t.prevEvent, x = d ? t.coords.start : p ? {
      page: y.page,
      client: y.client,
      timeStamp: t.coords.cur.timeStamp
    } : t.coords.cur;
    this.page = _({}, x.page), this.client = _({}, x.client), this.rect = _({}, t.rect), this.timeStamp = x.timeStamp, p || (this.page.x -= u.x, this.page.y -= u.y, this.client.x -= u.x, this.client.y -= u.y), this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.button = n.button, this.buttons = n.buttons, this.target = r, this.currentTarget = r, this.preEnd = a, this.type = s || i + (o || ""), this.interactable = c, this.t0 = d ? t.pointers[t.pointers.length - 1].downTime : y.t0, this.x0 = t.coords.start.page.x - u.x, this.y0 = t.coords.start.page.y - u.y, this.clientX0 = t.coords.start.client.x - u.x, this.clientY0 = t.coords.start.client.y - u.y, d || p ? this.delta = {
      x: 0,
      y: 0
    } : this.delta = {
      x: this[l].x - y[l].x,
      y: this[l].y - y[l].y
    }, this.dt = t.coords.delta.timeStamp, this.duration = this.timeStamp - this.t0, this.velocity = _({}, t.coords.velocity[l]), this.speed = $e(this.velocity.x, this.velocity.y), this.swipe = p || o === "inertiastart" ? this.getSwipe() : null;
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
Object.defineProperties(gn.prototype, {
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
class fr {
  constructor(t, n, i, o, r) {
    this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = t, this.pointer = n, this.event = i, this.downTime = o, this.downTarget = r;
  }
}
let dr = /* @__PURE__ */ function(e) {
  return e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = "", e;
}({}), hr = /* @__PURE__ */ function(e) {
  return e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = "", e;
}({}), pr = 0;
class gr {
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
    }, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = be(function(r) {
      this.move(r);
    }, "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
      // Starting InteractEvent pointer coordinates
      start: fe(),
      // Previous native pointer move event coordinates
      prev: fe(),
      // current native pointer move event coordinates
      cur: fe(),
      // Change in coordinates and time of the pointer
      delta: fe(),
      // pointer velocity
      velocity: fe()
    }, this._id = pr++;
    let {
      pointerType: n,
      scopeFire: i
    } = t;
    this._scopeFire = i, this.pointerType = n;
    const o = this;
    this._proxy = {};
    for (const r in dr)
      Object.defineProperty(this._proxy, r, {
        get() {
          return o[r];
        }
      });
    for (const r in hr)
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
    return this.interacting() || !this.pointerIsDown || this.pointers.length < (t.name === "gesture" ? 2 : 1) || !n.options[t.name].enabled ? !1 : (ri(this.prepared, t), this.interactable = n, this.element = i, this.rect = n.getRect(i), this.edges = this.prepared.edges ? _({}, this.prepared.edges) : {
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
    this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, a = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = $e(r, a) > this.pointerMoveTolerance);
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
    o || qo(this.coords.velocity, this.coords.delta), this._scopeFire("interactions:move", c), !o && !this.simulation && (this.interacting() && (c.type = null, this.move(c)), this.pointerWasMoved && Ge(this.coords.prev, this.coords.cur));
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
    (!t || !t.event) && Uo(this.coords.delta), t = _({
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
    const n = Pe(t);
    return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : He(this.pointers, (i) => i.id === n);
  }
  /** @internal */
  getPointerInfo(t) {
    return this.pointers[this.getPointerIndex(t)];
  }
  /** @internal */
  updatePointer(t, n, i, o) {
    const r = Pe(t);
    let a = this.getPointerIndex(t), s = this.pointers[a];
    return o = o === !1 ? !1 : o || /(down|start)$/i.test(n.type), s ? s.pointer = t : (s = new fr(r, t, n, null, null), a = this.pointers.length, this.pointers.push(s)), Jo(this.coords.cur, this.pointers.map((c) => c.pointer), this._now()), Go(this.coords.delta, this.coords.prev, this.coords.cur), o && (this.pointerIsDown = !0, s.downTime = this.coords.cur.timeStamp, s.downTarget = i, pi(this.downPointer, t), this.interacting() || (Ge(this.coords.start, this.coords.cur), Ge(this.coords.prev, this.coords.cur), this.downEvent = n, this.pointerWasMoved = !1)), this._updateLatestPointer(t, n, i), this._scopeFire("interactions:update-pointer", {
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
    return new gn(this, t, this.prepared.name, n, this.element, i, o);
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
    if (a && i === "move" && (hn(this.edges, a, this.coords.delta[this.interactable.options.deltaSource]), a.width = a.right - a.left, a.height = a.bottom - a.top), this._scopeFire(`interactions:before-action-${i}`, t) === !1)
      return !1;
    const c = t.iEvent = this._createPreparedEvent(n, i, o, r);
    return this._scopeFire(`interactions:action-${i}`, t), i === "start" && (this.prevEvent = c), this._fireEvent(c), this._scopeFire(`interactions:after-action-${i}`, t), !0;
  }
  /** @internal */
  _now() {
    return Date.now();
  }
}
const sn = {
  methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
  search(e) {
    for (const t of sn.methodOrder) {
      const n = sn[t](e);
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
          a = Wt(a);
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
        if (a.simulation && !Dn(a, t))
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
      if (Dn(i, t))
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
function Dn(e, t) {
  return e.pointers.some((n) => {
    let {
      id: i
    } = n;
    return i === t;
  });
}
const wi = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];
function vr(e) {
  const t = {};
  for (const r of wi)
    t[r] = Ei(r, e);
  const n = et.pEventTypes;
  let i;
  J.PointerEvent ? i = [{
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
  }), e.prevTouchTime = 0, e.Interaction = class extends gr {
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
            return Vt(c, a.downTarget);
          }) || r.removePointer(a.pointer, a.event);
  }
  e.usePlugin(cr);
}
function Ei(e, t) {
  return function(n) {
    const i = t.interactions.list, o = er(n), [r, a] = mi(n), s = [];
    if (/^touch/.test(n.type)) {
      t.prevTouchTime = t.now();
      for (const c of n.changedTouches) {
        const l = c, u = Pe(l), d = {
          pointer: l,
          pointerId: u,
          pointerType: o,
          eventType: n.type,
          eventTarget: r,
          curEventTarget: a,
          scope: t
        }, p = _n(d);
        s.push([d.pointer, d.eventTarget, d.curEventTarget, p]);
      }
    } else {
      let c = !1;
      if (!et.supportsPointerEvent && /mouse/.test(n.type)) {
        for (let l = 0; l < i.length && !c; l++)
          c = i[l].pointerType !== "mouse" && i[l].pointerIsDown;
        c = c || t.now() - t.prevTouchTime < 500 || // on iOS and Firefox Mobile, MouseEvent.timeStamp is zero if simulated
        n.timeStamp === 0;
      }
      if (!c) {
        const l = {
          pointer: n,
          pointerId: Pe(n),
          pointerType: o,
          eventType: n.type,
          curEventTarget: a,
          eventTarget: r,
          scope: t
        }, u = _n(l);
        s.push([l.pointer, l.eventTarget, l.curEventTarget, u]);
      }
    }
    for (const [c, l, u, d] of s)
      d[e](c, n, l, u);
  };
}
function _n(e) {
  const {
    pointerType: t,
    scope: n
  } = e, o = {
    interaction: sn.search(e),
    searchDetails: e
  };
  return n.fire("interactions:find", o), o.interaction || n.interactions.new({
    pointerType: t
  });
}
function qe(e, t) {
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
const mr = {
  id: "core/interactions",
  install: vr,
  listeners: {
    "scope:add-document": (e) => qe(e, "add"),
    "scope:remove-document": (e) => qe(e, "remove"),
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
  onDocSignal: qe,
  doOnInteractions: Ei,
  methodNames: wi
};
function we(e, t) {
  if (t.phaselessTypes[e])
    return !0;
  for (const n in t.map)
    if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases)
      return !0;
  return !1;
}
var Lt = /* @__PURE__ */ function(e) {
  return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
}(Lt || {});
class yr {
  /** @internal */
  get _defaults() {
    return {
      base: {},
      perAction: {},
      actions: {}
    };
  }
  constructor(t, n, i, o) {
    this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new hi(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || i, this._win = Jt(Tn(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = o, this.set(n);
  }
  setOnEvents(t, n) {
    return g.func(n.onstart) && this.on(`${t}start`, n.onstart), g.func(n.onmove) && this.on(`${t}move`, n.onmove), g.func(n.onend) && this.on(`${t}end`, n.onend), g.func(n.oninertiastart) && this.on(`${t}inertiastart`, n.oninertiastart), this;
  }
  updatePerActionListeners(t, n, i) {
    var o;
    const r = (o = this._actions.map[t]) == null ? void 0 : o.filterEventType, a = (s) => (r == null || r(s)) && we(s, this._actions);
    (g.array(n) || g.object(n)) && this._onOff(Lt.Off, t, n, void 0, a), (g.array(i) || g.object(i)) && this._onOff(Lt.On, t, i, void 0, a);
  }
  setPerAction(t, n) {
    const i = this._defaults;
    for (const o in n) {
      const r = o, a = this.options[t], s = n[r];
      r === "listeners" && this.updatePerActionListeners(t, a.listeners, s), g.array(s) ? a[r] = di(s) : g.plainObject(s) ? (a[r] = _(a[r] || {}, oe(s)), g.object(i.perAction[r]) && "enabled" in i.perAction[r] && (a[r].enabled = s.enabled !== !1)) : g.bool(s) && g.object(i.perAction[r]) ? a[r].enabled = s : a[r] = s;
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
    return t = t || (g.element(this.target) ? this.target : null), g.string(this.target) && (t = t || this._context.querySelector(this.target)), un(t);
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
    if (Tn(n) || g.object(n)) {
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
    return this._context === t.ownerDocument || Vt(this._context, t);
  }
  /** @internal */
  testIgnoreAllow(t, n, i) {
    return !this.testIgnore(t.ignoreFrom, n, i) && this.testAllow(t.allowFrom, n, i);
  }
  /** @internal */
  testAllow(t, n, i) {
    return t ? g.element(i) ? g.string(t) ? on(i, t, n) : g.element(t) ? Vt(t, i) : !1 : !1 : !0;
  }
  /** @internal */
  testIgnore(t, n, i) {
    return !t || !g.element(i) ? !1 : g.string(t) ? on(i, t, n) : g.element(t) ? Vt(t, i) : !1;
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
    const a = Kt(n, i, r);
    for (let s in a) {
      s === "wheel" && (s = et.wheelEvent);
      for (const c of a[s])
        we(s, this._actions) ? this.events[t === Lt.On ? "on" : "off"](s, c) : g.string(this.target) ? this._scopeEvents[t === Lt.On ? "addDelegate" : "removeDelegate"](this.target, this._context, s, c, o) : this._scopeEvents[t === Lt.On ? "add" : "remove"](this.target, s, c, o);
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
    return this._onOff(Lt.On, t, n, i);
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
    return this._onOff(Lt.Off, t, n, i);
  }
  /**
   * Reset the options of this Interactable
   *
   * @param {object} options The new settings to apply
   * @return {object} This Interactable
   */
  set(t) {
    const n = this._defaults;
    g.object(t) || (t = {}), this.options = oe(n.base);
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
class br {
  constructor(t) {
    this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = t, t.addListeners({
      "interactable:unset": (n) => {
        let {
          interactable: i
        } = n;
        const {
          target: o
        } = i, r = g.string(o) ? this.selectorMap[o] : o[this.scope.id], a = He(r, (s) => s === i);
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
      return Me(r, (a) => a._context === i && (o || a.inContext(t)));
  }
  forEachMatch(t, n) {
    for (const i of this.list) {
      let o;
      if ((g.string(i.target) ? (
        // target is a selector and the element matches
        g.element(t) && Zt(t, i.target)
      ) : (
        // target is the element
        t === i.target
      )) && // the element is in context
      i.inContext(t) && (o = n(i)), o !== void 0)
        return o;
    }
  }
}
function xr(e) {
  const t = (n, i) => {
    let o = e.interactables.getExisting(n, i);
    return o || (o = e.interactables.new(n, i), o.events.global = t.globalEvents), o;
  };
  return t.getPointerAverage = vi, t.getTouchBBox = Zo, t.getTouchDistance = Qo, t.getTouchAngle = tr, t.getElementRect = un, t.getElementClientRect = cn, t.matchesSelector = Zt, t.closest = oi, t.globalEvents = {}, t.version = "1.10.26", t.scope = e, t.use = function(n, i) {
    return this.scope.usePlugin(n, i), this;
  }, t.isSet = function(n, i) {
    return !!this.scope.interactables.get(n, i && i.context);
  }, t.on = be(function(i, o, r) {
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
    return we(i, this.scope.actions) ? this.globalEvents[i] ? this.globalEvents[i].push(o) : this.globalEvents[i] = [o] : this.scope.events.add(this.scope.document, i, o, {
      options: r
    }), this;
  }, "The interact.on() method is being deprecated"), t.off = be(function(i, o, r) {
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
    if (we(i, this.scope.actions)) {
      let a;
      i in this.globalEvents && (a = this.globalEvents[i].indexOf(o)) !== -1 && this.globalEvents[i].splice(a, 1);
    } else
      this.scope.events.remove(this.scope.document, i, o, r);
    return this;
  }, "The interact.off() method is being deprecated"), t.debug = function() {
    return this.scope;
  }, t.supportsTouch = function() {
    return et.supportsTouch;
  }, t.supportsPointerEvent = function() {
    return et.supportsPointerEvent;
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
class wr {
  constructor() {
    this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = et, this.defaults = oe(xi), this.Eventable = hi, this.actions = {
      map: {},
      phases: {
        start: !0,
        move: !0,
        end: !0
      },
      methodDict: {},
      phaselessTypes: {}
    }, this.interactStatic = xr(this), this.InteractEvent = gn, this.Interactable = void 0, this.interactables = new br(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = {
      list: [],
      map: {}
    }, this.onWindowUnload = (n) => this.removeDocument(n.target);
    const t = this;
    this.Interactable = class extends yr {
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
    return this.isInitialized ? this : Er(this, t);
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
      const o = this.listenerMaps.length, r = t.before.reduce((a, s) => (a[s] = !0, a[Pn(s)] = !0, a), {});
      for (; i < o; i++) {
        const a = this.listenerMaps[i].id;
        if (a && (r[a] || r[Pn(a)]))
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
    const i = Jt(t);
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
    const n = this.getDocIndex(t), i = Jt(t), o = this.documents[n].options;
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
function Er(e, t) {
  return e.isInitialized = !0, g.window(t) && ni(t), J.init(t), et.init(t), ie.init(t), e.window = t, e.document = t.document, e.usePlugin(mr), e.usePlugin(or), e;
}
function Pn(e) {
  return e && e.replace(/\/.*$/, "");
}
const Si = new wr(), Rt = Si.interactStatic, Sr = typeof globalThis < "u" ? globalThis : window;
Si.init(Sr);
Rt.use(jo);
function Tr(e) {
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
    P.isScrolling = !0, ie.cancel(P.i), e.autoScroll = P, P.interaction = e, P.prevTime = P.now(), P.i = ie.request(P.scroll);
  },
  stop() {
    P.isScrolling = !1, P.interaction && (P.interaction.autoScroll = null), ie.cancel(P.i);
  },
  // scroll the window by the values in scroll.x/y
  scroll() {
    const {
      interaction: e
    } = P, {
      interactable: t,
      element: n
    } = e, i = e.prepared.name, o = t.options[i].autoScroll, r = On(o.container, t, n), a = P.now(), s = (a - P.prevTime) / 1e3, c = o.speed * s;
    if (c >= 1) {
      const l = {
        x: P.x * c,
        y: P.y * c
      };
      if (l.x || l.y) {
        const u = Rn(r);
        g.window(r) ? r.scrollBy(l.x, l.y) : r && (r.scrollLeft += l.x, r.scrollTop += l.y);
        const d = Rn(r), p = {
          x: d.x - u.x,
          y: d.y - u.y
        };
        (p.x || p.y) && t.fire({
          type: "autoscroll",
          target: n,
          interactable: t,
          delta: p,
          interaction: e,
          container: r
        });
      }
      P.prevTime = a;
    }
    P.isScrolling && (ie.cancel(P.i), P.i = ie.request(P.scroll));
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
    } = t, l = t.prepared.name, u = s.options[l].autoScroll, d = On(u.container, s, c);
    if (g.window(d))
      a = n.clientX < P.margin, i = n.clientY < P.margin, o = n.clientX > d.innerWidth - P.margin, r = n.clientY > d.innerHeight - P.margin;
    else {
      const p = cn(d);
      a = n.clientX < p.left + P.margin, i = n.clientY < p.top + P.margin, o = n.clientX > p.right - P.margin, r = n.clientY > p.bottom - P.margin;
    }
    P.x = o ? 1 : a ? -1 : 0, P.y = r ? 1 : i ? -1 : 0, P.isScrolling || (P.margin = u.margin, P.speed = u.speed, P.start(t));
  }
};
function On(e, t, n) {
  return (g.string(e) ? yi(e, t, n) : e) || Jt(n);
}
function Rn(e) {
  return g.window(e) && (e = window.document.body), {
    x: e.scrollLeft,
    y: e.scrollTop
  };
}
const Ir = {
  id: "auto-scroll",
  install: Tr,
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
Rt.use(Ir);
function zr(e) {
  const {
    actions: t,
    Interactable: n,
    defaults: i
  } = e;
  n.prototype.draggable = De.draggable, t.map.drag = De, t.methodDict.drag = "draggable", i.actions.drag = De.defaults;
}
function Ue(e) {
  let {
    interaction: t
  } = e;
  if (t.prepared.name !== "drag")
    return;
  const n = t.prepared.axis;
  n === "x" ? (t.coords.cur.page.y = t.coords.start.page.y, t.coords.cur.client.y = t.coords.start.client.y, t.coords.velocity.client.y = 0, t.coords.velocity.page.y = 0) : n === "y" && (t.coords.cur.page.x = t.coords.start.page.x, t.coords.cur.client.x = t.coords.start.client.x, t.coords.velocity.client.x = 0, t.coords.velocity.page.x = 0);
}
function kn(e) {
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
const Cr = function(t) {
  return g.object(t) ? (this.options.drag.enabled = t.enabled !== !1, this.setPerAction("drag", t), this.setOnEvents("drag", t), /^(xy|x|y|start)$/.test(t.lockAxis) && (this.options.drag.lockAxis = t.lockAxis), /^(xy|x|y)$/.test(t.startAxis) && (this.options.drag.startAxis = t.startAxis), this) : g.bool(t) ? (this.options.drag.enabled = t, this) : this.options.drag;
}, De = {
  id: "actions/drag",
  install: zr,
  listeners: {
    "interactions:before-action-move": Ue,
    "interactions:action-resume": Ue,
    // dragmove
    "interactions:action-move": kn,
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
  draggable: Cr,
  beforeMove: Ue,
  move: kn,
  defaults: {
    startAxis: "xy",
    lockAxis: "xy"
  },
  getCursor() {
    return "move";
  },
  filterEventType: (e) => e.search("drag") === 0
};
Rt.use(De);
function Mr(e) {
  const {
    actions: t,
    browser: n,
    Interactable: i,
    // tslint:disable-line no-shadowed-variable
    defaults: o
  } = e;
  Ot.cursors = Or(n), Ot.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, i.prototype.resizable = function(r) {
    return _r(this, r, e);
  }, t.map.resize = Ot, t.methodDict.resize = "resizable", o.actions.resize = Ot.defaults;
}
function Dr(e) {
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
        c[l] = Pr(l, s.edges[l], a, t._latestPointer.eventTarget, i, o, s.margin || Ot.defaultMargin);
      c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
        name: "resize",
        edges: c
      });
    } else {
      const c = s.axis !== "y" && a.x > o.right - Ot.defaultMargin, l = s.axis !== "x" && a.y > o.bottom - Ot.defaultMargin;
      (c || l) && (e.action = {
        name: "resize",
        axes: (c ? "x" : "") + (l ? "y" : "")
      });
    }
    return e.action ? !1 : void 0;
  }
}
function _r(e, t, n) {
  return g.object(t) ? (e.options.resize.enabled = t.enabled !== !1, e.setPerAction("resize", t), e.setOnEvents("resize", t), g.string(t.axis) && /^x$|^y$|^xy$/.test(t.axis) ? e.options.resize.axis = t.axis : t.axis === null && (e.options.resize.axis = n.defaults.actions.resize.axis), g.bool(t.preserveAspectRatio) ? e.options.resize.preserveAspectRatio = t.preserveAspectRatio : g.bool(t.square) && (e.options.resize.square = t.square), e) : g.bool(t) ? (e.options.resize.enabled = t, e) : e.options.resize;
}
function Pr(e, t, n, i, o, r, a) {
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
    on(i, t, o)
  ) : !1;
}
function Or(e) {
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
function Rr(e) {
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
function kr(e) {
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
    previous: d
  } = n._rects;
  if (_(d, l), a) {
    if (_(l, s), r === "reposition") {
      if (l.top > l.bottom) {
        const p = l.top;
        l.top = l.bottom, l.bottom = p;
      }
      if (l.left > l.right) {
        const p = l.left;
        l.left = l.right, l.right = p;
      }
    }
  } else
    l.top = Math.min(s.top, c.bottom), l.bottom = Math.max(s.bottom, c.top), l.left = Math.min(s.left, c.right), l.right = Math.max(s.right, c.left);
  l.width = l.right - l.left, l.height = l.bottom - l.top;
  for (const p in l)
    u[p] = l[p] - d[p];
  i.edges = n.prepared.edges, i.rect = l, i.deltaRect = u;
}
function Ar(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.prepared.edges)
    return;
  const i = t;
  i.edges = n.prepared.edges, i.rect = n._rects.corrected, i.deltaRect = n._rects.delta;
}
function An(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.resizeAxes)
    return;
  const i = n.interactable.options, o = t;
  i.resize.square ? (n.resizeAxes === "y" ? o.delta.x = o.delta.y : o.delta.y = o.delta.x, o.axes = "xy") : (o.axes = n.resizeAxes, n.resizeAxes === "x" ? o.delta.y = 0 : n.resizeAxes === "y" && (o.delta.x = 0));
}
const Ot = {
  id: "actions/resize",
  before: ["actions/drag"],
  install: Mr,
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.resizeAxes = "xy";
    },
    "interactions:action-start": (e) => {
      Rr(e), An(e);
    },
    "interactions:action-move": (e) => {
      kr(e), An(e);
    },
    "interactions:action-end": Ar,
    "auto-start:check": Dr
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
    const o = Ot.cursors;
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
Rt.use(Ot);
var Hr = () => {
}, $r = () => {
}, Br = (e) => {
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
      const d = Math.round((i - s.x) / e[l]), p = Math.round((o - s.y) / e[u]);
      c[l] = Math.max(a.left, Math.min(a.right, d * e[l] + s.x)), c[u] = Math.max(a.top, Math.min(a.bottom, p * e[u] + s.y));
    }
    return c;
  };
  return n.grid = e, n.coordFields = t, n;
}, Lr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  edgeTarget: Hr,
  elements: $r,
  grid: Br
});
const Nr = {
  id: "snappers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    t.snappers = _(t.snappers || {}, Lr), t.createSnapGrid = t.snappers.grid;
  }
};
class Ti {
  constructor(t) {
    this.states = [], this.startOffset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = Ce(), this.edges = {
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
    } = this, r = Wr(o);
    this.prepareStates(r), this.startEdges = _({}, o.edges), this.edges = _({}, this.startEdges), this.startOffset = Fr(o.rect, n), this.startDelta = {
      x: 0,
      y: 0
    };
    const a = this.fillArg({
      phase: i,
      pageCoords: n,
      preEnd: !1
    });
    return this.result = Ce(), this.startAll(a), this.result = this.setAll(a);
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
    const s = o ? this.states.slice(o) : this.states, c = Ce(t.coords, t.rect);
    for (const p of s) {
      var l;
      const {
        options: y
      } = p, x = _({}, t.coords);
      let z = null;
      (l = p.methods) != null && l.set && this.shouldDo(y, i, n) && (t.state = p, z = p.methods.set(t), hn(t.edges, t.rect, {
        x: t.coords.x - x.x,
        y: t.coords.y - x.y
      })), c.eventProps.push(z);
    }
    _(this.edges, t.edges), c.delta.x = t.coords.x - t.pageCoords.x, c.delta.y = t.coords.y - t.pageCoords.y, c.rectDelta.left = t.rect.left - r.left, c.rectDelta.right = t.rect.right - r.right, c.rectDelta.top = t.rect.top - r.top, c.rectDelta.bottom = t.rect.bottom - r.bottom;
    const u = this.result.coords, d = this.result.rect;
    if (u && d) {
      const p = c.rect.left !== d.left || c.rect.right !== d.right || c.rect.top !== d.top || c.rect.bottom !== d.bottom;
      c.changed = p || u.x !== c.coords.x || u.y !== c.coords.y;
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
    for (const [d, p] of [[r, s], [o, c]])
      d.page.x += p.x, d.page.y += p.y, d.client.x += p.x, d.client.y += p.y;
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
    this.startOffset = t.startOffset, this.startDelta = t.startDelta, this.startEdges = t.startEdges, this.edges = t.edges, this.states = t.states.map((n) => oe(n)), this.result = Ce(_({}, t.result.coords), _({}, t.result.rect));
  }
  destroy() {
    for (const t in this)
      this[t] = null;
  }
}
function Ce(e, t) {
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
function Wr(e) {
  const t = e.interactable.options[e.prepared.name], n = t.modifiers;
  return n && n.length ? n : ["snap", "snapSize", "snapEdges", "restrict", "restrictEdges", "restrictSize"].map((i) => {
    const o = t[i];
    return o && o.enabled && {
      options: o,
      methods: o._methods
    };
  }).filter((i) => !!i);
}
function Fr(e, t) {
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
function Ft(e, t) {
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
function Ve(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  const i = n.modification.result;
  i && (t.modifiers = i.eventProps);
}
const jr = {
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
      t.modification = new Ti(t);
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
    "interactions:action-start": Ve,
    "interactions:action-move": Ve,
    "interactions:action-end": Ve,
    "interactions:after-action-start": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:after-action-move": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:stop": (e) => e.interaction.modification.stop(e)
  }
}, Xr = {
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
      const d = (l.left ? 1 : -1) * (l.top ? 1 : -1);
      t.edgeSign = {
        x: d,
        y: d
      };
    } else
      t.edgeSign = {
        x: l.left ? -1 : 1,
        y: l.top ? -1 : 1
      };
    if (a !== !1 && _(i, l), !(c != null && c.length))
      return;
    const u = new Ti(e.interaction);
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
    } = t, r = _({}, i), a = t.equalDelta ? Yr : Gr;
    if (_(e.edges, o), a(t, t.xIsPrimaryAxis, i, n), !t.subModification)
      return null;
    const s = _({}, n);
    hn(o, s, {
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
function Yr(e, t, n) {
  let {
    startCoords: i,
    edgeSign: o
  } = e;
  t ? n.y = i.y + (n.x - i.x) * o.y : n.x = i.x + (n.y - i.y) * o.x;
}
function Gr(e, t, n, i) {
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
var qr = Ft(Xr, "aspectRatio");
function Ur(e) {
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
    const l = Qt(a.restriction, o, r);
    if (l) {
      const u = l.right - l.left - t.width, d = l.bottom - l.top - t.height;
      u < 0 && (c.left += u, c.right += u), d < 0 && (c.top += d, c.bottom += d);
    }
    c.left += n.left - t.width * s.left, c.top += n.top - t.height * s.top, c.right += n.right - t.width * (1 - s.right), c.bottom += n.bottom - t.height * (1 - s.bottom);
  }
  i.offset = c;
}
function Vr(e) {
  let {
    coords: t,
    interaction: n,
    state: i
  } = e;
  const {
    options: o,
    offset: r
  } = i, a = Qt(o.restriction, n, t);
  if (!a)
    return;
  const s = ur(a);
  t.x = Math.max(Math.min(s.right - r.right, t.x), s.left + r.left), t.y = Math.max(Math.min(s.bottom - r.bottom, t.y), s.top + r.top);
}
function Qt(e, t, n) {
  return g.func(e) ? xe(e, t.interactable, t.element, [n.x, n.y, t]) : xe(e, t.interactable, t.element);
}
const Kr = {
  restriction: null,
  elementRect: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Oe = {
  start: Ur,
  set: Vr,
  defaults: Kr
};
var Jr = Ft(Oe, "restrict");
const Ii = {
  top: 1 / 0,
  left: 1 / 0,
  bottom: -1 / 0,
  right: -1 / 0
}, zi = {
  top: -1 / 0,
  left: -1 / 0,
  bottom: 1 / 0,
  right: 1 / 0
};
function Zr(e) {
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
    const a = Qt(o.offset, t, t.coords.start.page);
    r = Be(a);
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
function Qr(e) {
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
  const s = _({}, t), c = Qt(a.inner, i, s) || {}, l = Qt(a.outer, i, s) || {};
  Hn(c, Ii), Hn(l, zi), n.top ? t.y = Math.min(Math.max(l.top + r.top, s.y), c.top + r.top) : n.bottom && (t.y = Math.max(Math.min(l.bottom + r.bottom, s.y), c.bottom + r.bottom)), n.left ? t.x = Math.min(Math.max(l.left + r.left, s.x), c.left + r.left) : n.right && (t.x = Math.max(Math.min(l.right + r.right, s.x), c.right + r.right));
}
function Hn(e, t) {
  for (const n of ["top", "left", "bottom", "right"])
    n in e || (e[n] = t[n]);
  return e;
}
const ts = {
  inner: null,
  outer: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, me = {
  noInner: Ii,
  noOuter: zi,
  start: Zr,
  set: Qr,
  defaults: ts
};
var es = Ft(me, "restrictEdges");
const ns = _({
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
}, Oe.defaults), is = {
  start: Oe.start,
  set: Oe.set,
  defaults: ns
};
var os = Ft(is, "restrictRect");
const rs = {
  width: -1 / 0,
  height: -1 / 0
}, ss = {
  width: 1 / 0,
  height: 1 / 0
};
function as(e) {
  return me.start(e);
}
function ls(e) {
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
  const a = Mn(Qt(r.min, t, e.coords)) || rs, s = Mn(Qt(r.max, t, e.coords)) || ss;
  n.options = {
    endOnly: r.endOnly,
    inner: _({}, me.noInner),
    outer: _({}, me.noOuter)
  }, o.top ? (n.options.inner.top = i.bottom - a.height, n.options.outer.top = i.bottom - s.height) : o.bottom && (n.options.inner.bottom = i.top + a.height, n.options.outer.bottom = i.top + s.height), o.left ? (n.options.inner.left = i.right - a.width, n.options.outer.left = i.right - s.width) : o.right && (n.options.inner.right = i.left + a.width, n.options.outer.right = i.left + s.width), me.set(e), n.options = r;
}
const cs = {
  min: null,
  max: null,
  endOnly: !1,
  enabled: !1
}, us = {
  start: as,
  set: ls,
  defaults: cs
};
var fs = Ft(us, "restrictSize");
function ds(e) {
  const {
    interaction: t,
    interactable: n,
    element: i,
    rect: o,
    state: r,
    startOffset: a
  } = e, {
    options: s
  } = r, c = s.offsetWithOrigin ? ps(e) : {
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
    const d = xe(s.offset, n, i, [t]);
    l = Be(d) || {
      x: 0,
      y: 0
    }, l.x += c.x, l.y += c.y;
  }
  const {
    relativePoints: u
  } = s;
  r.offsets = o && u && u.length ? u.map((d, p) => ({
    index: p,
    relativePoint: d,
    x: a.left - o.width * d.x + l.x,
    y: a.top - o.height * d.y + l.y
  })) : [{
    index: 0,
    relativePoint: null,
    x: l.x,
    y: l.y
  }];
}
function hs(e) {
  const {
    interaction: t,
    coords: n,
    state: i
  } = e, {
    options: o,
    offsets: r
  } = i, a = pn(t.interactable, t.element, t.prepared.name), s = _({}, n), c = [];
  o.offsetWithOrigin || (s.x -= a.x, s.y -= a.y);
  for (const u of r) {
    const d = s.x - u.x, p = s.y - u.y;
    for (let y = 0, x = o.targets.length; y < x; y++) {
      const z = o.targets[y];
      let m;
      g.func(z) ? m = z(d, p, t._proxy, u, y) : m = z, m && c.push({
        x: (g.number(m.x) ? m.x : d) + u.x,
        y: (g.number(m.y) ? m.y : p) + u.y,
        range: g.number(m.range) ? m.range : o.range,
        source: z,
        index: y,
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
    const d = u.range, p = u.x - s.x, y = u.y - s.y, x = $e(p, y);
    let z = x <= d;
    d === 1 / 0 && l.inRange && l.range !== 1 / 0 && (z = !1), (!l.target || (z ? (
      // is the closest target in range?
      l.inRange && d !== 1 / 0 ? (
        // the pointer is relatively deeper in this target
        x / d < l.distance / l.range
      ) : (
        // this target has Infinite range and the closest doesn't
        d === 1 / 0 && l.range !== 1 / 0 || // OR this target is closer that the previous closest
        x < l.distance
      )
    ) : (
      // The other is not in range and the pointer is closer to this target
      !l.inRange && x < l.distance
    ))) && (l.target = u, l.distance = x, l.range = d, l.inRange = z, l.delta.x = p, l.delta.y = y);
  }
  return l.inRange && (n.x = l.target.x, n.y = l.target.y), i.closest = l, l;
}
function ps(e) {
  const {
    element: t
  } = e.interaction;
  return Be(xe(e.state.options.origin, null, null, [t])) || pn(e.interactable, t, e.interaction.prepared.name);
}
const gs = {
  range: 1 / 0,
  targets: null,
  offset: null,
  offsetWithOrigin: !0,
  origin: null,
  relativePoints: null,
  endOnly: !1,
  enabled: !1
}, vn = {
  start: ds,
  set: hs,
  defaults: gs
};
var vs = Ft(vn, "snap");
function ms(e) {
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
  }, t.targetFields = t.targetFields || [["width", "height"], ["x", "y"]], vn.start(e), t.offsets = e.state.offsets, e.state = t;
}
function ys(e) {
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
      for (const [u, d] of n.targetFields)
        if (u in l || d in l) {
          l.x = l[u], l.y = l[d];
          break;
        }
      n.options.targets.push(l);
    }
  }
  const s = vn.set(e);
  return n.options = o, s;
}
const bs = {
  range: 1 / 0,
  targets: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Re = {
  start: ms,
  set: ys,
  defaults: bs
};
var xs = Ft(Re, "snapSize");
function ws(e) {
  const {
    edges: t
  } = e;
  return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Re.start(e)) : null;
}
const Es = {
  start: ws,
  set: Re.set,
  defaults: _(oe(Re.defaults), {
    targets: void 0,
    range: void 0,
    offset: {
      x: 0,
      y: 0
    }
  })
};
var Ss = Ft(Es, "snapEdges");
const pe = () => {
};
pe._defaults = {};
var Ke = {
  aspectRatio: qr,
  restrictEdges: es,
  restrict: Jr,
  restrictRect: os,
  restrictSize: fs,
  snapEdges: Ss,
  snap: vs,
  snapSize: xs,
  spring: pe,
  avoid: pe,
  transform: pe,
  rubberband: pe
};
const Ts = {
  id: "modifiers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    e.usePlugin(jr), e.usePlugin(Nr), t.modifiers = Ke;
    for (const n in Ke) {
      const {
        _defaults: i,
        _methods: o
      } = Ke[n];
      i._methods = o, e.defaults.perAction[n] = i;
    }
  }
};
Rt.use(Ts);
var ye = /* @__PURE__ */ function(e) {
  return e.touchAction = "touchAction", e.boxSizing = "boxSizing", e.noListeners = "noListeners", e;
}(ye || {});
const an = "[interact.js] ", ln = {
  touchAction: "https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",
  boxSizing: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"
};
function Is(e) {
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
    const u = Kt(a, s, l);
    for (const d in u)
      we(d, e.actions) || e.logger.warn(an + `Can't add native "${d}" event listener to target without \`addEventListener(type, listener, options)\` prop.`);
    return o.call(this, r, u, c);
  };
}
const $n = [{
  name: ye.touchAction,
  perform(e) {
    let {
      element: t
    } = e;
    return !!t && !zs(t, "touchAction", /pan-|pinch|none/);
  },
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, ln.touchAction];
  },
  text: `Consider adding CSS "touch-action: none" to this element
`
}, {
  name: ye.boxSizing,
  perform(e) {
    const {
      element: t
    } = e;
    return e.prepared.name === "resize" && t instanceof J.HTMLElement && !Ci(t, "boxSizing", /border-box/);
  },
  text: 'Consider adding CSS "box-sizing: border-box" to this resizable element',
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, ln.boxSizing];
  }
}, {
  name: ye.noListeners,
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
function Ci(e, t, n) {
  const i = e.style[t] || Nt.getComputedStyle(e)[t];
  return n.test((i || "").toString());
}
function zs(e, t, n) {
  let i = e;
  for (; g.element(i); ) {
    if (Ci(i, t, n))
      return !0;
    i = Wt(i);
  }
  return !1;
}
const Cs = "dev-tools", Ms = {
  id: Cs,
  install: Is,
  listeners: {
    "interactions:action-start": (e, t) => {
      let {
        interaction: n
      } = e;
      for (const i of $n) {
        const o = n.interactable && n.interactable.options;
        !(o && o.devTools && o.devTools.ignore[i.name]) && i.perform(n) && t.logger.warn(an + i.text, ...i.getInfo(n));
      }
    }
  },
  checks: $n,
  CheckName: ye,
  links: ln,
  prefix: an
};
Rt.use(Ms);
function Ds() {
  const { appContext: e, proxy: t } = ji(), n = e.config.globalProperties;
  return {
    proxy: t,
    appContext: e,
    globalProperties: n
  };
}
const _s = {
  name: "GridItem"
}, Mi = /* @__PURE__ */ Xn({
  ..._s,
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
    const { proxy: i } = Ds(), o = i == null ? void 0 : i.$parent, r = Xi("eventBus"), a = n, s = e, c = O({}), l = O(1), u = O(100), d = O(30), p = O([10, 10]), y = O(1 / 0), x = O(null), z = O(null), m = O(1), D = O(!0), C = O(!0), M = O(!1), v = O(null), h = O(!1), T = O(null), w = O(NaN), H = O(NaN), nt = O(NaN), L = O(NaN), V = O({}), R = O(!1), b = O(!1), A = O(!1), $ = O(null), it = O(null), Y = O(null), G = O(null), I = O(s.x), tt = O(s.y), lt = O(s.w), ot = O(s.h), ut = O(null), K = O(null), Ee = te(() => z.value && !s.static), Le = te(() => (x.value || z.value) && !s.static), Ne = te(() => navigator.userAgent.toLowerCase().indexOf("android") !== -1), at = te(() => o != null && o.isMirrored ? !R.value : R.value), S = te(() => ({
      "vue-resizable": Ee.value,
      static: s.static,
      resizing: h.value,
      "vue-draggable-dragging": M.value,
      cssTransforms: D.value,
      "render-rtl": at.value,
      "disable-userselect": M.value,
      "no-touch": Ne.value && Le.value
    })), B = te(() => at.value ? "vue-resizable-handle vue-rtl-resizable-handle" : "vue-resizable-handle");
    F(
      () => s.isDraggable,
      (f) => {
        x.value = f;
      }
    ), F(
      () => s.static,
      () => {
        Yt(), mt();
      }
    ), F(x, () => {
      Yt();
    }), F(
      () => s.isResizable,
      (f) => {
        z.value = f;
      }
    ), F(
      () => s.isBounded,
      (f) => {
        ut.value = f;
      }
    ), F(z, () => {
      mt();
    }), F(d, () => {
      rt(), xt();
    }), F(l, () => {
      mt(), rt(), xt();
    }), F(u, () => {
      mt(), rt(), xt();
    }), F(
      () => s.x,
      (f) => {
        I.value = f, rt();
      }
    ), F(
      () => s.y,
      (f) => {
        tt.value = f, rt();
      }
    ), F(
      () => s.h,
      (f) => {
        ot.value = f, rt();
      }
    ), F(
      () => s.w,
      (f) => {
        lt.value = f, rt();
      }
    ), F(at, () => {
      mt(), rt();
    }), F(
      () => s.minH,
      () => {
        mt();
      }
    ), F(
      () => s.maxH,
      () => {
        mt();
      }
    ), F(
      () => s.minW,
      () => {
        mt();
      }
    ), F(
      () => s.maxW,
      () => {
        mt();
      }
    ), F(
      () => o == null ? void 0 : o.margin,
      (f) => {
        !f || f[0] == p.value[0] && f[1] == p.value[1] || (p.value = f.map((E) => Number(E)), rt(), xt());
      }
    );
    function q(f) {
      Dt(f);
    }
    function pt(f) {
      Te();
    }
    function Et(f) {
      s.isDraggable === null && (x.value = f);
    }
    function It(f) {
      s.isResizable === null && (z.value = f);
    }
    function zt(f) {
      s.isBounded === null && (ut.value = f);
    }
    function ct(f) {
      m.value = f;
    }
    function N(f) {
      d.value = f;
    }
    function ft(f) {
      y.value = f;
    }
    function St() {
      R.value = En() === "rtl", Te();
    }
    function gt(f) {
      const E = f.toString();
      l.value = parseInt(E);
    }
    r.on("updateWidth", q), r.on("compact", pt), r.on("setDraggable", Et), r.on("setResizable", It), r.on("setBounded", zt), r.on("setTransformScale", ct), r.on("setRowHeight", N), r.on("setMaxRows", ft), r.on("directionchange", St), r.on("setColNum", gt), R.value = En() === "rtl", Yn(() => {
      r.off("updateWidth", q), r.off("compact", pt), r.off("setDraggable", Et), r.off("setResizable", It), r.off("setBounded", zt), r.off("setTransformScale", ct), r.off("setRowHeight", N), r.off("setMaxRows", ft), r.off("directionchange", St), r.off("setColNum", gt), K.value && K.value.unset();
    }), Gn(() => {
      o != null && o.responsive && o.lastBreakpoint ? l.value = nn(o.lastBreakpoint, o == null ? void 0 : o.cols) : l.value = o == null ? void 0 : o.colNum, d.value = o == null ? void 0 : o.rowHeight, u.value = (o == null ? void 0 : o.width) !== null ? o == null ? void 0 : o.width : 100, p.value = (o == null ? void 0 : o.margin) !== void 0 ? o.margin : [10, 10], y.value = o == null ? void 0 : o.maxRows, s.isDraggable === null ? x.value = o == null ? void 0 : o.isDraggable : x.value = s.isDraggable, s.isResizable === null ? z.value = o == null ? void 0 : o.isResizable : z.value = s.isResizable, s.isBounded === null ? ut.value = o == null ? void 0 : o.isBounded : ut.value = s.isBounded, m.value = o == null ? void 0 : o.transformScale, D.value = o == null ? void 0 : o.useCssTransforms, C.value = o == null ? void 0 : o.useStyleCursor, rt();
    });
    function rt() {
      var W, j, k, U, qt;
      s.x + s.w > l.value ? (I.value = 0, lt.value = s.w > l.value ? l.value : s.w) : (I.value = s.x, lt.value = s.w);
      let f = jt(I.value, tt.value, lt.value, ot.value);
      M.value && (f.top = (W = v.value) == null ? void 0 : W.top, at.value ? f.right = (j = v.value) == null ? void 0 : j.left : f.left = (k = v.value) == null ? void 0 : k.left), h.value && (f.width = (U = T.value) == null ? void 0 : U.width, f.height = (qt = T.value) == null ? void 0 : qt.height);
      let E;
      D.value ? at.value ? E = io(f.top, f.right, f.width, f.height) : E = no(f.top, f.left, f.width, f.height) : at.value ? E = ro(f.top, f.right, f.width, f.height) : E = oo(f.top, f.left, f.width, f.height), V.value = E;
    }
    function xt() {
      let f = {};
      for (let E of ["width", "height"]) {
        let j = V.value[E].match(/^(\d+)px$/);
        if (!j)
          return;
        f[E] = j[1];
      }
      a("container-resized", s.i, s.h, s.w, f.height, f.width);
    }
    function Se(f) {
      var E, W, j, k, U, qt, re, se, ae, le, ce, yt, ue, wt, bt;
      {
        if (s.static)
          return;
        const At = wn(f);
        if (At == null)
          return;
        const { x: Tt, y: Ht } = At, Z = { width: 0, height: 0 };
        let X;
        switch (f.type) {
          case "resizestart": {
            if (mt(), $.value = lt.value, it.value = ot.value, X = jt(I.value, tt.value, lt.value, ot.value), Z.width = X.width, Z.height = X.height, T.value = Z, h.value = !0, f.edges.left) {
              h.value = !1;
              let Q = { ...f };
              Q.clientX = Q.client.x, Q.clientY = Q.client.y, Q.type = "dragstart", Ct(Q), h.value = !0;
            }
            break;
          }
          case "resizemove": {
            const Q = Ie(nt.value, L.value, Tt, Ht);
            if (f.edges.left && (Q.deltaX = -Q.deltaX), f.edges.bottom && !(f.edges.left || f.edges.right) ? Z.width = Number((E = T.value) == null ? void 0 : E.width) : at.value ? Z.width = Number((W = T.value) == null ? void 0 : W.width) - Q.deltaX / m.value : Z.width = Number((j = T.value) == null ? void 0 : j.width) + Q.deltaX / m.value, (f.edges.left || f.edges.right) && !f.edges.bottom ? Z.height = Number((k = T.value) == null ? void 0 : k.height) : Z.height = Number((U = T.value) == null ? void 0 : U.height) + Q.deltaY / m.value, T.value = Z, f.edges.left) {
              h.value = !1;
              let ht = { ...f };
              ht.clientX = ht.client.x, ht.clientY = ht.client.y, ht.type = "dragmove", Ct(ht), h.value = !0;
            }
            break;
          }
          case "resizeend": {
            const Q = Ie(nt.value, L.value, Tt, Ht);
            if (f.edges.bottom && !(f.edges.left || f.edges.right) ? Z.width = Number((qt = T.value) == null ? void 0 : qt.width) : at.value ? Z.width = Number((re = T.value) == null ? void 0 : re.width) - Q.deltaX / m.value : Z.width = Number((se = T.value) == null ? void 0 : se.width) + Q.deltaX / m.value, (f.edges.left || f.edges.right) && !f.edges.bottom ? Z.height = Number((ae = T.value) == null ? void 0 : ae.height) : Z.height = Number((le = T.value) == null ? void 0 : le.height) + Q.deltaY / m.value, T.value = null, h.value = !1, f.edges.left) {
              let ht = { ...f };
              ht.clientX = ht.client.x, ht.clientY = ht.client.y, ht.type = "dragend", Ct(ht);
            }
            break;
          }
        }
        X = Mt(Z.height, Z.width), X.w < s.minW && (X.w = s.minW), X.w > s.maxW && (X.w = s.maxW), X.h < s.minH && (X.h = s.minH), X.h > s.maxH && (X.h = s.maxH), X.h < 1 && (X.h = 1), X.w < 1 && (X.w = 1), nt.value = Tt, L.value = Ht;
        let dt = { top: 0, left: 0 };
        if (f.type == "resizestart" || f.type == "resizeend") {
          const Q = f.target;
          let je = Q.offsetParent.getBoundingClientRect(), Xe = Q.getBoundingClientRect();
          const $i = Xe.left / m.value, Bi = je.left / m.value, Li = Xe.right / m.value, Ni = je.right / m.value, Wi = Xe.top / m.value, Fi = je.top / m.value;
          at.value ? dt.left = (Li - Ni) * -1 : dt.left = $i - Bi, dt.top = Wi - Fi;
        } else if (f.type == "resizemove") {
          const Q = Ie(w.value, H.value, Tt, Ht);
          at.value ? dt.left = Number((ce = v.value) == null ? void 0 : ce.left) - Q.deltaX / m.value : dt.left = Number((yt = v.value) == null ? void 0 : yt.left) + Q.deltaX / m.value, (ue = f == null ? void 0 : f.edges) != null && ue.left ? dt.top = Number((wt = v.value) == null ? void 0 : wt.top) : dt.top = Number((bt = v.value) == null ? void 0 : bt.top) + Q.deltaY / m.value;
        }
        let Fe;
        at.value, Fe = kt(dt.top, dt.left), I.value = Fe.x, (lt.value !== X.w || ot.value !== X.h) && (a(
          "resize",
          s.i,
          X.h,
          X.w,
          Z.height,
          Z.width,
          I.value,
          // current X
          tt.value,
          // current Y
          Y.value,
          // previous X
          G.value,
          // previous Y
          f.interaction.prepared.edges
        ), Y.value = I.value, G.value = tt.value), f.type === "resizeend" && (a(
          "resized",
          s.i,
          X.h,
          X.w,
          Z.height,
          Z.width,
          I.value,
          // current X
          tt.value,
          // current Y
          Y.value,
          // previous X
          G.value,
          // previous Y
          f.interaction.prepared.edges
        ), Y.value = I.value, G.value = tt.value);
        const Hi = {
          eventType: f.type,
          i: s.i,
          x: I.value,
          y: tt.value,
          h: X.h,
          w: X.w
        };
        r.emit("resizeEvent", Hi);
      }
    }
    function Ct(f) {
      var re, se, ae, le, ce;
      if (s.static || h.value)
        return;
      const E = wn(f);
      if (E === null)
        return;
      const { x: W, y: j } = E;
      let k = { top: 0, left: 0 };
      switch (f.type) {
        case "dragstart": {
          Y.value = I.value, G.value = tt.value;
          const yt = f.target;
          let wt = yt.offsetParent.getBoundingClientRect(), bt = yt.getBoundingClientRect();
          const At = bt.left / m.value, Tt = wt.left / m.value, Ht = bt.right / m.value, Z = wt.right / m.value, X = bt.top / m.value, dt = wt.top / m.value;
          at.value ? k.left = (Ht - Z) * -1 : k.left = At - Tt, k.top = X - dt, v.value = k, M.value = !0;
          break;
        }
        case "dragend": {
          if (!M.value)
            return;
          const yt = f.target;
          let wt = yt.offsetParent.getBoundingClientRect(), bt = yt.getBoundingClientRect();
          const At = bt.left / m.value, Tt = wt.left / m.value, Ht = bt.right / m.value, Z = wt.right / m.value, X = bt.top / m.value, dt = wt.top / m.value;
          at.value ? k.left = (Ht - Z) * -1 : k.left = At - Tt, k.top = X - dt, v.value = null, M.value = !1;
          break;
        }
        case "dragmove": {
          const yt = Ie(w.value, H.value, W, j);
          if (at.value ? k.left = Number((re = v.value) == null ? void 0 : re.left) - yt.deltaX / m.value : k.left = Number((se = v.value) == null ? void 0 : se.left) + yt.deltaX / m.value, (ae = f == null ? void 0 : f.edges) != null && ae.left ? k.top = Number((le = v.value) == null ? void 0 : le.top) : k.top = Number((ce = v.value) == null ? void 0 : ce.top) + yt.deltaY / m.value, ut.value) {
            const bt = f.target.offsetParent.clientHeight - st(s.h, d.value, p.value[1]);
            k.top = vt(k.top, 0, bt);
            const At = Xt(), Tt = u.value - st(s.w, At, p.value[0]);
            k.left = vt(k.left, 0, Tt);
          }
          v.value = k;
          break;
        }
      }
      let U;
      at.value, U = kt(k.top, k.left), w.value = W, H.value = j, (I.value !== U.x || tt.value !== U.y) && a("move", s.i, U.x, U.y), f.type === "dragend" && (Y.value !== I.value || G.value !== tt.value) && a("moved", s.i, U.x, U.y);
      const qt = {
        eventType: f.type,
        i: s.i,
        x: U.x,
        y: U.y,
        h: ot.value,
        w: lt.value
      };
      r.emit("dragEvent", qt);
    }
    function jt(f, E, W, j) {
      const k = Xt();
      let U;
      return at.value ? U = {
        right: Math.round(k * f + (f + 1) * p.value[0]),
        top: Math.round(d.value * E + (E + 1) * p.value[1]),
        // 0 * Infinity === NaN, which causes problems with resize constriants;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width: W === 1 / 0 ? W : Math.round(k * W + Math.max(0, W - 1) * p.value[0]),
        height: j === 1 / 0 ? j : Math.round(d.value * j + Math.max(0, j - 1) * p.value[1])
      } : U = {
        left: Math.round(k * f + (f + 1) * p.value[0]),
        top: Math.round(d.value * E + (E + 1) * p.value[1]),
        // 0 * Infinity === NaN, which causes problems with resize constriants;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width: W === 1 / 0 ? W : Math.round(k * W + Math.max(0, W - 1) * p.value[0]),
        height: j === 1 / 0 ? j : Math.round(d.value * j + Math.max(0, j - 1) * p.value[1])
      }, U;
    }
    function kt(f, E) {
      const W = Xt();
      let j = Math.round((E - p.value[0]) / (W + p.value[0])), k = Math.round((f - p.value[1]) / (d.value + p.value[1]));
      return j = Math.max(Math.min(j, l.value - lt.value), 0), k = Math.max(Math.min(k, y.value - ot.value), 0), { x: j, y: k };
    }
    function Xt() {
      return (u.value - p.value[0] * (l.value + 1)) / l.value;
    }
    function st(f, E, W) {
      return Number.isFinite(f) ? Math.round(E * f + Math.max(0, f - 1) * W) : f;
    }
    function vt(f, E, W) {
      return Math.max(Math.min(f, W), E);
    }
    function Mt(f, E, W = !1) {
      const j = Xt();
      let k = Math.round((E + p.value[0]) / (j + p.value[0])), U = 0;
      return W ? U = Math.ceil((f + p.value[1]) / (d.value + p.value[1])) : U = Math.round((f + p.value[1]) / (d.value + p.value[1])), k = Math.max(Math.min(k, l.value - I.value), 0), U = Math.max(Math.min(U, y.value - tt.value), 0), { w: k, h: U };
    }
    function Dt(f, E) {
      u.value = f, E != null && (l.value = E);
    }
    function Te(f) {
      rt();
    }
    function Yt() {
      if ((K.value === null || K.value === void 0) && (K.value = Rt(c.value), C.value || K.value.styleCursor(!1)), x.value && !s.static) {
        const f = {
          ignoreFrom: s.dragIgnoreFrom,
          allowFrom: s.dragAllowFrom,
          ...s.dragOption
        };
        K.value.draggable(f), b.value || (b.value = !0, K.value.on("dragstart dragmove dragend", function(E) {
          Ct(E);
        }));
      } else
        K.value.draggable({
          enabled: !1
        });
    }
    function mt() {
      if ((K.value === null || K.value === void 0) && (K.value = Rt(c.value), C.value || K.value.styleCursor(!1)), z.value && !s.static) {
        let f = jt(0, 0, s.maxW, s.maxH), E = jt(0, 0, s.minW, s.minH);
        const W = {
          // allowFrom: "." + this.resizableHandleClass.trim().replace(" ", "."),
          edges: {
            left: !0,
            right: !0,
            bottom: !0,
            top: !1
          },
          ignoreFrom: s.resizeIgnoreFrom,
          restrictSize: {
            min: {
              height: E.height * m.value,
              width: E.width * m.value
            },
            max: {
              height: f.height * m.value,
              width: f.width * m.value
            }
          },
          ...s.resizeOption
        };
        s.preserveAspectRatio && (W.modifiers = [
          // @ts-ignore
          Rt.modifiers.aspectRatio({
            ratio: "preserve"
          })
        ]), K.value.resizable(W), A.value || (A.value = !0, K.value.on("resizestart resizemove resizeend", function(j) {
          Se(j);
        }));
      } else
        K.value.resizable({
          enabled: !1
        });
    }
    const Gt = Yi();
    function We() {
      $.value = lt.value, it.value = ot.value;
      let f = Gt == null ? void 0 : Gt.default[0].elm.getBoundingClientRect(), E = Mt(f.height, f.width, !0);
      if (E.w < s.minW && (E.w = s.minW), E.w > s.maxW && (E.w = s.maxW), E.h < s.minH && (E.h = s.minH), E.h > s.maxH && (E.h = s.maxH), E.h < 1 && (E.h = 1), E.w < 1 && (E.w = 1), (lt.value !== E.w || ot.value !== E.h) && a("resize", s.i, E.h, E.w, f.height, f.width), $.value !== E.w || it.value !== E.h) {
        a("resized", s.i, E.h, E.w, f.height, f.width);
        const W = {
          eventType: "resizeend",
          i: s.i,
          x: I.value,
          y: tt.value,
          h: E.h,
          w: E.w
        };
        r.emit("resizeEvent", W);
      }
    }
    return t({
      autoSize: We,
      calcXY: kt,
      dragging: v,
      ...s,
      styleObj: V
    }), (f, E) => (Je(), Ze("div", {
      ref_key: "this$refsItem",
      ref: c,
      class: yn(["vue-grid-item", S.value]),
      style: Qe(V.value)
    }, [
      qn(f.$slots, "default", {
        style: Qe(V.value)
      }),
      Ee.value ? (Je(), Ze("span", {
        key: 0,
        ref: "handle",
        class: yn(B.value)
      }, null, 2)) : Gi("", !0)
    ], 6));
  }
});
function Ps(e) {
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
function Os(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Di = { exports: {} }, Rs = Di.exports = {};
Rs.forEach = function(e, t) {
  for (var n = 0; n < e.length; n++) {
    var i = t(e[n]);
    if (i)
      return i;
  }
};
var _i = Di.exports, ks = function(e) {
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
}, As = function(e) {
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
}, Hs = function() {
  var e = 1;
  function t() {
    return e++;
  }
  return {
    generate: t
  };
}, $s = function(e) {
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
}, Bs = function(e) {
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
}, Pi = { exports: {} }, Oi = Pi.exports = {};
Oi.isIE = function(e) {
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
Oi.isLegacyOpera = function() {
  return !!window.opera;
};
var Ri = Pi.exports, ki = { exports: {} }, Ls = ki.exports = {};
Ls.getOption = Ns;
function Ns(e, t, n) {
  var i = e[t];
  return i == null && n !== void 0 ? n : i;
}
var Ws = ki.exports, Bn = Ws, Fs = function(t) {
  t = t || {};
  var n = t.reporter, i = Bn.getOption(t, "async", !0), o = Bn.getOption(t, "auto", !0);
  o && !i && (n && n.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), i = !0);
  var r = Ln(), a, s = !1;
  function c(x, z) {
    !s && o && i && r.size() === 0 && d(), r.add(x, z);
  }
  function l() {
    for (s = !0; r.size(); ) {
      var x = r;
      r = Ln(), x.process();
    }
    s = !1;
  }
  function u(x) {
    s || (x === void 0 && (x = i), a && (p(a), a = null), x ? d() : l());
  }
  function d() {
    a = y(l);
  }
  function p(x) {
    var z = clearTimeout;
    return z(x);
  }
  function y(x) {
    var z = function(m) {
      return setTimeout(m, 0);
    };
    return z(x);
  }
  return {
    add: c,
    force: u
  };
};
function Ln() {
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
var mn = "_erd";
function js(e) {
  return e[mn] = {}, Ai(e);
}
function Ai(e) {
  return e[mn];
}
function Xs(e) {
  delete e[mn];
}
var Ys = {
  initState: js,
  getState: Ai,
  cleanState: Xs
}, he = Ri, Gs = function(e) {
  e = e || {};
  var t = e.reporter, n = e.batchProcessor, i = e.stateHandler.getState;
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  function o(l, u) {
    function d() {
      u(l);
    }
    if (he.isIE(8))
      i(l).object = {
        proxy: d
      }, l.attachEvent("onresize", d);
    else {
      var p = s(l);
      if (!p)
        throw new Error("Element is not detectable by this strategy.");
      p.contentDocument.defaultView.addEventListener("resize", d);
    }
  }
  function r(l) {
    var u = e.important ? " !important; " : "; ";
    return (l.join(u) + u).trim();
  }
  function a(l, u, d) {
    d || (d = u, u = l, l = null), l = l || {}, l.debug;
    function p(y, x) {
      var z = r(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]), m = !1, D = window.getComputedStyle(y), C = y.offsetWidth, M = y.offsetHeight;
      i(y).startSize = {
        width: C,
        height: M
      };
      function v() {
        function h() {
          if (D.position === "static") {
            y.style.setProperty("position", "relative", l.important ? "important" : "");
            var H = function(nt, L, V, R) {
              function b($) {
                return $.replace(/[^-\d\.]/g, "");
              }
              var A = V[R];
              A !== "auto" && b(A) !== "0" && (nt.warn("An element that is positioned static has style." + R + "=" + A + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + R + " will be set to 0. Element: ", L), L.style.setProperty(R, "0", l.important ? "important" : ""));
            };
            H(t, y, D, "top"), H(t, y, D, "right"), H(t, y, D, "bottom"), H(t, y, D, "left");
          }
        }
        function T() {
          m || h();
          function H(L, V) {
            if (!L.contentDocument) {
              var R = i(L);
              R.checkForObjectDocumentTimeoutId && window.clearTimeout(R.checkForObjectDocumentTimeoutId), R.checkForObjectDocumentTimeoutId = setTimeout(function() {
                R.checkForObjectDocumentTimeoutId = 0, H(L, V);
              }, 100);
              return;
            }
            V(L.contentDocument);
          }
          var nt = this;
          H(nt, function(V) {
            x(y);
          });
        }
        D.position !== "" && (h(), m = !0);
        var w = document.createElement("object");
        w.style.cssText = z, w.tabIndex = -1, w.type = "text/html", w.setAttribute("aria-hidden", "true"), w.onload = T, he.isIE() || (w.data = "about:blank"), i(y) && (y.appendChild(w), i(y).object = w, he.isIE() && (w.data = "about:blank"));
      }
      n ? n.add(v) : v();
    }
    he.isIE(8) ? d(u) : p(u, d);
  }
  function s(l) {
    return i(l).object;
  }
  function c(l) {
    if (i(l)) {
      var u = s(l);
      u && (he.isIE(8) ? l.detachEvent("onresize", u.proxy) : l.removeChild(u), i(l).checkForObjectDocumentTimeoutId && window.clearTimeout(i(l).checkForObjectDocumentTimeoutId), delete i(l).object);
    }
  }
  return {
    makeDetectable: a,
    addListener: o,
    uninstall: c
  };
}, qs = _i.forEach, Us = function(e) {
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
    d(v, a, s);
  }
  c(window.document);
  function l(v) {
    var h = e.important ? " !important; " : "; ";
    return (v.join(h) + h).trim();
  }
  function u() {
    var v = 500, h = 500, T = document.createElement("div");
    T.style.cssText = l(["position: absolute", "width: " + v * 2 + "px", "height: " + h * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var w = document.createElement("div");
    w.style.cssText = l(["position: absolute", "width: " + v + "px", "height: " + h + "px", "overflow: scroll", "visibility: none", "top: " + -v * 3 + "px", "left: " + -h * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]), w.appendChild(T), document.body.insertBefore(w, document.body.firstChild);
    var H = v - w.clientWidth, nt = h - w.clientHeight;
    return document.body.removeChild(w), {
      width: H,
      height: nt
    };
  }
  function d(v, h, T) {
    function w(V, R) {
      R = R || function(A) {
        v.head.appendChild(A);
      };
      var b = v.createElement("style");
      return b.innerHTML = V, b.id = h, R(b), b;
    }
    if (!v.getElementById(h)) {
      var H = T + "_animation", nt = T + "_animation_active", L = `/* Created by the element-resize-detector library. */
`;
      L += "." + T + " > div::-webkit-scrollbar { " + l(["display: none"]) + ` }

`, L += "." + nt + " { " + l(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + H, "animation-name: " + H]) + ` }
`, L += "@-webkit-keyframes " + H + ` { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
`, L += "@keyframes " + H + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", w(L);
    }
  }
  function p(v) {
    v.className += " " + s + "_animation_active";
  }
  function y(v, h, T) {
    if (v.addEventListener)
      v.addEventListener(h, T);
    else if (v.attachEvent)
      v.attachEvent("on" + h, T);
    else
      return t.error("[scroll] Don't know how to add event listeners.");
  }
  function x(v, h, T) {
    if (v.removeEventListener)
      v.removeEventListener(h, T);
    else if (v.detachEvent)
      v.detachEvent("on" + h, T);
    else
      return t.error("[scroll] Don't know how to remove event listeners.");
  }
  function z(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[0];
  }
  function m(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[1];
  }
  function D(v, h) {
    var T = i(v).listeners;
    if (!T.push)
      throw new Error("Cannot add listener to an element that is not detectable.");
    i(v).listeners.push(h);
  }
  function C(v, h, T) {
    T || (T = h, h = v, v = null), v = v || {};
    function w() {
      if (v.debug) {
        var S = Array.prototype.slice.call(arguments);
        if (S.unshift(o.get(h), "Scroll: "), t.log.apply)
          t.log.apply(null, S);
        else
          for (var B = 0; B < S.length; B++)
            t.log(S[B]);
      }
    }
    function H(S) {
      function B(q) {
        var pt = q.getRootNode && q.getRootNode().contains(q);
        return q === q.ownerDocument.body || q.ownerDocument.body.contains(q) || pt;
      }
      return !B(S) || window.getComputedStyle(S) === null;
    }
    function nt(S) {
      var B = i(S).container.childNodes[0], q = window.getComputedStyle(B);
      return !q.width || q.width.indexOf("px") === -1;
    }
    function L() {
      var S = window.getComputedStyle(h), B = {};
      return B.position = S.position, B.width = h.offsetWidth, B.height = h.offsetHeight, B.top = S.top, B.right = S.right, B.bottom = S.bottom, B.left = S.left, B.widthCSS = S.width, B.heightCSS = S.height, B;
    }
    function V() {
      var S = L();
      i(h).startSize = {
        width: S.width,
        height: S.height
      }, w("Element start size", i(h).startSize);
    }
    function R() {
      i(h).listeners = [];
    }
    function b() {
      if (w("storeStyle invoked."), !i(h)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var S = L();
      i(h).style = S;
    }
    function A(S, B, q) {
      i(S).lastWidth = B, i(S).lastHeight = q;
    }
    function $(S) {
      return z(S).childNodes[0];
    }
    function it() {
      return 2 * r.width + 1;
    }
    function Y() {
      return 2 * r.height + 1;
    }
    function G(S) {
      return S + 10 + it();
    }
    function I(S) {
      return S + 10 + Y();
    }
    function tt(S) {
      return S * 2 + it();
    }
    function lt(S) {
      return S * 2 + Y();
    }
    function ot(S, B, q) {
      var pt = z(S), Et = m(S), It = G(B), zt = I(q), ct = tt(B), N = lt(q);
      pt.scrollLeft = It, pt.scrollTop = zt, Et.scrollLeft = ct, Et.scrollTop = N;
    }
    function ut() {
      var S = i(h).container;
      if (!S) {
        S = document.createElement("div"), S.className = s, S.style.cssText = l(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), i(h).container = S, p(S), h.appendChild(S);
        var B = function() {
          i(h).onRendered && i(h).onRendered();
        };
        y(S, "animationstart", B), i(h).onAnimationStart = B;
      }
      return S;
    }
    function K() {
      function S() {
        var st = i(h).style;
        if (st.position === "static") {
          h.style.setProperty("position", "relative", v.important ? "important" : "");
          var vt = function(Mt, Dt, Te, Yt) {
            function mt(We) {
              return We.replace(/[^-\d\.]/g, "");
            }
            var Gt = Te[Yt];
            Gt !== "auto" && mt(Gt) !== "0" && (Mt.warn("An element that is positioned static has style." + Yt + "=" + Gt + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + Yt + " will be set to 0. Element: ", Dt), Dt.style[Yt] = 0);
          };
          vt(t, h, st, "top"), vt(t, h, st, "right"), vt(t, h, st, "bottom"), vt(t, h, st, "left");
        }
      }
      function B(st, vt, Mt, Dt) {
        return st = st ? st + "px" : "0", vt = vt ? vt + "px" : "0", Mt = Mt ? Mt + "px" : "0", Dt = Dt ? Dt + "px" : "0", ["left: " + st, "top: " + vt, "right: " + Dt, "bottom: " + Mt];
      }
      if (w("Injecting elements"), !i(h)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      S();
      var q = i(h).container;
      q || (q = ut());
      var pt = r.width, Et = r.height, It = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]), zt = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(B(-(1 + pt), -(1 + Et), -Et, -pt))), ct = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), N = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), ft = l(["position: absolute", "left: 0", "top: 0"]), St = l(["position: absolute", "width: 200%", "height: 200%"]), gt = document.createElement("div"), rt = document.createElement("div"), xt = document.createElement("div"), Se = document.createElement("div"), Ct = document.createElement("div"), jt = document.createElement("div");
      gt.dir = "ltr", gt.style.cssText = It, gt.className = s, rt.className = s, rt.style.cssText = zt, xt.style.cssText = ct, Se.style.cssText = ft, Ct.style.cssText = N, jt.style.cssText = St, xt.appendChild(Se), Ct.appendChild(jt), rt.appendChild(xt), rt.appendChild(Ct), gt.appendChild(rt), q.appendChild(gt);
      function kt() {
        var st = i(h);
        st && st.onExpand ? st.onExpand() : w("Aborting expand scroll handler: element has been uninstalled");
      }
      function Xt() {
        var st = i(h);
        st && st.onShrink ? st.onShrink() : w("Aborting shrink scroll handler: element has been uninstalled");
      }
      y(xt, "scroll", kt), y(Ct, "scroll", Xt), i(h).onExpandScroll = kt, i(h).onShrinkScroll = Xt;
    }
    function Ee() {
      function S(ct, N, ft) {
        var St = $(ct), gt = G(N), rt = I(ft);
        St.style.setProperty("width", gt + "px", v.important ? "important" : ""), St.style.setProperty("height", rt + "px", v.important ? "important" : "");
      }
      function B(ct) {
        var N = h.offsetWidth, ft = h.offsetHeight, St = N !== i(h).lastWidth || ft !== i(h).lastHeight;
        w("Storing current size", N, ft), A(h, N, ft), n.add(0, function() {
          if (St) {
            if (!i(h)) {
              w("Aborting because element has been uninstalled");
              return;
            }
            if (!q()) {
              w("Aborting because element container has not been initialized");
              return;
            }
            if (v.debug) {
              var rt = h.offsetWidth, xt = h.offsetHeight;
              (rt !== N || xt !== ft) && t.warn(o.get(h), "Scroll: Size changed before updating detector elements.");
            }
            S(h, N, ft);
          }
        }), n.add(1, function() {
          if (!i(h)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!q()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          ot(h, N, ft);
        }), St && ct && n.add(2, function() {
          if (!i(h)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!q()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          ct();
        });
      }
      function q() {
        return !!i(h).container;
      }
      function pt() {
        function ct() {
          return i(h).lastNotifiedWidth === void 0;
        }
        w("notifyListenersIfNeeded invoked");
        var N = i(h);
        if (ct() && N.lastWidth === N.startSize.width && N.lastHeight === N.startSize.height)
          return w("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        if (N.lastWidth === N.lastNotifiedWidth && N.lastHeight === N.lastNotifiedHeight)
          return w("Not notifying: Size already notified");
        w("Current size not notified, notifying..."), N.lastNotifiedWidth = N.lastWidth, N.lastNotifiedHeight = N.lastHeight, qs(i(h).listeners, function(ft) {
          ft(h);
        });
      }
      function Et() {
        if (w("startanimation triggered."), nt(h)) {
          w("Ignoring since element is still unrendered...");
          return;
        }
        w("Element rendered.");
        var ct = z(h), N = m(h);
        (ct.scrollLeft === 0 || ct.scrollTop === 0 || N.scrollLeft === 0 || N.scrollTop === 0) && (w("Scrollbars out of sync. Updating detector elements..."), B(pt));
      }
      function It() {
        if (w("Scroll detected."), nt(h)) {
          w("Scroll event fired while unrendered. Ignoring...");
          return;
        }
        B(pt);
      }
      if (w("registerListenersAndPositionElements invoked."), !i(h)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      i(h).onRendered = Et, i(h).onExpand = It, i(h).onShrink = It;
      var zt = i(h).style;
      S(h, zt.width, zt.height);
    }
    function Le() {
      if (w("finalizeDomMutation invoked."), !i(h)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var S = i(h).style;
      A(h, S.width, S.height), ot(h, S.width, S.height);
    }
    function Ne() {
      T(h);
    }
    function at() {
      w("Installing..."), R(), V(), n.add(0, b), n.add(1, K), n.add(2, Ee), n.add(3, Le), n.add(4, Ne);
    }
    w("Making detectable..."), H(h) ? (w("Element is detached"), ut(), w("Waiting until element is attached..."), i(h).onRendered = function() {
      w("Element is now attached"), at();
    }) : at();
  }
  function M(v) {
    var h = i(v);
    h && (h.onExpandScroll && x(z(v), "scroll", h.onExpandScroll), h.onShrinkScroll && x(m(v), "scroll", h.onShrinkScroll), h.onAnimationStart && x(h.container, "animationstart", h.onAnimationStart), h.container && v.removeChild(h.container));
  }
  return {
    makeDetectable: C,
    addListener: D,
    uninstall: M,
    initDocument: c
  };
}, ge = _i.forEach, Vs = ks, Ks = As, Js = Hs, Zs = $s, Qs = Bs, Nn = Ri, ta = Fs, $t = Ys, ea = Gs, na = Us;
function Wn(e) {
  return Array.isArray(e) || e.length !== void 0;
}
function Fn(e) {
  if (Array.isArray(e))
    return e;
  var t = [];
  return ge(e, function(n) {
    t.push(n);
  }), t;
}
function jn(e) {
  return e && e.nodeType === 1;
}
var ia = function(e) {
  e = e || {};
  var t;
  if (e.idHandler)
    t = {
      get: function(C) {
        return e.idHandler.get(C, !0);
      },
      set: e.idHandler.set
    };
  else {
    var n = Js(), i = Zs({
      idGenerator: n,
      stateHandler: $t
    });
    t = i;
  }
  var o = e.reporter;
  if (!o) {
    var r = o === !1;
    o = Qs(r);
  }
  var a = Bt(e, "batchProcessor", ta({ reporter: o })), s = {};
  s.callOnAdd = !!Bt(e, "callOnAdd", !0), s.debug = !!Bt(e, "debug", !1);
  var c = Ks(t), l = Vs({
    stateHandler: $t
  }), u, d = Bt(e, "strategy", "object"), p = Bt(e, "important", !1), y = {
    reporter: o,
    batchProcessor: a,
    stateHandler: $t,
    idHandler: t,
    important: p
  };
  if (d === "scroll" && (Nn.isLegacyOpera() ? (o.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), d = "object") : Nn.isIE(9) && (o.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), d = "object")), d === "scroll")
    u = na(y);
  else if (d === "object")
    u = ea(y);
  else
    throw new Error("Invalid strategy name: " + d);
  var x = {};
  function z(C, M, v) {
    function h(V) {
      var R = c.get(V);
      ge(R, function(A) {
        A(V);
      });
    }
    function T(V, R, b) {
      c.add(R, b), V && b(R);
    }
    if (v || (v = M, M = C, C = {}), !M)
      throw new Error("At least one element required.");
    if (!v)
      throw new Error("Listener required.");
    if (jn(M))
      M = [M];
    else if (Wn(M))
      M = Fn(M);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    var w = 0, H = Bt(C, "callOnAdd", s.callOnAdd), nt = Bt(C, "onReady", function() {
    }), L = Bt(C, "debug", s.debug);
    ge(M, function(R) {
      $t.getState(R) || ($t.initState(R), t.set(R));
      var b = t.get(R);
      if (L && o.log("Attaching listener to element", b, R), !l.isDetectable(R)) {
        if (L && o.log(b, "Not detectable."), l.isBusy(R)) {
          L && o.log(b, "System busy making it detectable"), T(H, R, v), x[b] = x[b] || [], x[b].push(function() {
            w++, w === M.length && nt();
          });
          return;
        }
        return L && o.log(b, "Making detectable..."), l.markBusy(R, !0), u.makeDetectable({ debug: L, important: p }, R, function($) {
          if (L && o.log(b, "onElementDetectable"), $t.getState($)) {
            l.markAsDetectable($), l.markBusy($, !1), u.addListener($, h), T(H, $, v);
            var it = $t.getState($);
            if (it && it.startSize) {
              var Y = $.offsetWidth, G = $.offsetHeight;
              (it.startSize.width !== Y || it.startSize.height !== G) && h($);
            }
            x[b] && ge(x[b], function(I) {
              I();
            });
          } else
            L && o.log(b, "Element uninstalled before being detectable.");
          delete x[b], w++, w === M.length && nt();
        });
      }
      L && o.log(b, "Already detecable, adding listener."), T(H, R, v), w++;
    }), w === M.length && nt();
  }
  function m(C) {
    if (!C)
      return o.error("At least one element is required.");
    if (jn(C))
      C = [C];
    else if (Wn(C))
      C = Fn(C);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    ge(C, function(M) {
      c.removeAllListeners(M), u.uninstall(M), $t.cleanState(M);
    });
  }
  function D(C) {
    u.initDocument && u.initDocument(C);
  }
  return {
    listenTo: z,
    removeListener: c.removeListener,
    removeAllListeners: c.removeAllListeners,
    uninstall: m,
    initDocument: D
  };
};
function Bt(e, t, n) {
  var i = e[t];
  return i == null && n !== void 0 ? n : i;
}
const oa = /* @__PURE__ */ Os(ia), ra = {
  name: "GridLayout"
}, sa = /* @__PURE__ */ Xn({
  ...ra,
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
    const i = e, o = O(null), r = O({}), a = O(0), s = O(!1), c = O({ x: 0, y: 0, w: 0, h: 0, i: -1 }), l = O({}), u = O(null), d = O(null), p = O(null), y = O(), x = O({}), z = O(), m = Ps();
    qi("eventBus", m);
    const D = n;
    function C(b) {
      if (!b)
        nt();
      else {
        const { eventType: A, i: $, x: it, y: Y, h: G, w: I } = b;
        nt(A, $, it, Y, G, I);
      }
    }
    function M(b) {
      if (!b)
        H();
      else {
        const { eventType: A, i: $, x: it, y: Y, h: G, w: I } = b;
        H(A, $, it, Y, G, I);
      }
    }
    m.on("resizeEvent", C), m.on("dragEvent", M), D("layout-created", i.layout), Yn(() => {
      m.off("resizeEvent", C), m.off("dragEvent", M), go("resize", T), p.value && p.value.uninstall(x.value);
    }), Ui(() => {
      D("layout-before-mount", i.layout);
    }), Gn(() => {
      D("layout-mounted", i.layout), _t(function() {
        so(i.layout), d.value = i.layout, _t(() => {
          V(), T(), po("resize", T), ne(i.layout, i.verticalCompact), D("layout-updated", i.layout), h(), _t(() => {
            p.value = oa({
              strategy: "scroll",
              //<- For ultra performance.
              // See https://github.com/wnr/element-resize-detector/issues/110 about callOnAdd.
              callOnAdd: !1
            }), p.value.listenTo(x.value, function() {
              T();
            });
          });
        });
      });
    }), F(o, (b, A) => {
      _t(() => {
        m.emit("updateWidth", b), A === null && _t(() => {
          D("layout-ready", i.layout);
        }), h();
      });
    }), F(
      () => i.layout,
      () => {
        v();
      }
    ), F(
      () => i.layout.length,
      () => {
        v();
      }
    ), F(
      () => i.colNum,
      (b) => {
        m.emit("setColNum", b);
      }
    ), F(
      () => i.rowHeight,
      (b) => {
        m.emit("setRowHeight", b);
      }
    ), F(
      () => i.isDraggable,
      (b) => {
        m.emit("setDraggable", b);
      }
    ), F(
      () => i.isResizable,
      (b) => {
        m.emit("setResizable", b);
      }
    ), F(
      () => i.isBounded,
      (b) => {
        m.emit("setBounded", b);
      }
    ), F(
      () => i.transformScale,
      (b) => {
        m.emit("setTransformScale", b);
      }
    ), F(
      () => i.responsive,
      (b) => {
        b || (D("update:layout", d.value || []), m.emit("setColNum", i.colNum)), T();
      }
    ), F(
      () => i.maxRows,
      (b) => {
        m.emit("setMaxRows", b);
      }
    ), F(
      () => i.margin,
      () => {
        h();
      }
    );
    function v() {
      if (i.layout !== void 0 && d.value !== null) {
        if (i.layout.length !== d.value.length) {
          let b = R(i.layout, d.value);
          b.length > 0 && (i.layout.length > d.value.length ? d.value = d.value.concat(b) : d.value = d.value.filter((A) => !b.some(($) => A.i === $.i))), a.value = i.layout.length, V();
        }
        ne(i.layout, i.verticalCompact), m.emit("updateWidth", o.value), h(), D("layout-updated", i.layout);
      }
    }
    function h() {
      r.value = {
        height: w()
      };
    }
    function T() {
      x.value !== null && x.value !== void 0 && (o.value = x.value.offsetWidth), m.emit("resizeEvent");
    }
    function w() {
      return i.autoSize ? Zi(i.layout) * (i.rowHeight + i.margin[1]) + i.margin[1] + "px" : "";
    }
    function H(b, A, $, it, Y, G) {
      let I = bn(i.layout, A);
      I == null && (I = { x: 0, y: 0 }), b === "dragstart" && !i.verticalCompact && (y.value = i.layout.reduce(
        (lt, { i: ot, x: ut, y: K }) => ({
          ...lt,
          [ot]: { x: ut, y: K }
        }),
        {}
      )), b === "dragmove" || b === "dragstart" ? (c.value.i = A, c.value.x = I.x, c.value.y = I.y, c.value.w = G, c.value.h = Y, _t(function() {
        s.value = !0;
      }), m.emit("updateWidth", o.value)) : _t(function() {
        s.value = !1;
      });
      const tt = en(i.layout, I, $, it, !0, i.preventCollision);
      D("update:layout", tt), i.restoreOnDrag ? (I.static = !0, ne(i.layout, i.verticalCompact, y.value), I.static = !1) : ne(i.layout, i.verticalCompact), m.emit("compact"), h(), b === "dragend" && (y.value = void 0, D("layout-updated", tt));
    }
    function nt(b, A, $, it, Y, G) {
      let I = bn(i.layout, A);
      I == null && (I = { h: 0, w: 0 }), G = Number(G), Y = Number(Y);
      let tt;
      if (i.preventCollision) {
        const lt = Vn(i.layout, { ...I, w: G, h: Y }).filter(
          (ot) => ot.i !== (I == null ? void 0 : I.i)
        );
        if (tt = lt.length > 0, tt) {
          let ot = 1 / 0, ut = 1 / 0;
          lt.forEach((K) => {
            K.x > Number(I == null ? void 0 : I.x) && (ot = Math.min(ot, K.x)), K.y > Number(I == null ? void 0 : I.y) && (ut = Math.min(ut, K.y));
          }), Number.isFinite(ot) && (I.w = ot - I.x), Number.isFinite(ut) && (I.h = ut - I.y);
        }
      }
      tt || (I.w = G, I.h = Y), b === "resizestart" || b === "resizemove" ? (c.value.i = A, c.value.x = $, c.value.y = it, c.value.w = I.w, c.value.h = I.h, _t(function() {
        s.value = !0;
      }), m.emit("updateWidth", o.value)) : _t(function() {
        s.value = !1;
      }), i.responsive && L(), ne(i.layout, i.verticalCompact), m.emit("compact"), h(), b === "resizeend" && D("layout-updated", i.layout);
    }
    function L() {
      let b = co(i.breakpoints, o.value), A = nn(b, i.cols);
      u.value != null && !l.value[u.value] && (l.value[u.value] = tn(i.layout));
      let $ = uo(
        d.value,
        l.value,
        i.breakpoints,
        b,
        u.value,
        A,
        i.verticalCompact
      );
      l.value[b] = $, u.value !== b && D("breakpoint-changed", b, $), D("update:layout", $), u.value = b, m.emit("setColNum", nn(b, i.cols));
    }
    function V() {
      l.value = Object.assign({}, i.responsiveLayouts);
    }
    function R(b, A) {
      let $ = b.filter(function(Y) {
        return !A.some(function(G) {
          return Y.i === G.i;
        });
      }), it = A.filter(function(Y) {
        return !b.some(function(G) {
          return Y.i === G.i;
        });
      });
      return $.concat(it);
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
      originalLayout: d,
      erd: p,
      defaultGridItem: z,
      dragEvent: H
    }), (b, A) => (Je(), Ze("div", {
      ref_key: "this$refsLayout",
      ref: x,
      class: "vue-grid-layout",
      style: Qe(r.value)
    }, [
      qn(b.$slots, "default"),
      Vi(Ki(Mi, {
        ref_key: "defaultGridItem",
        ref: z,
        class: "vue-grid-placeholder",
        x: c.value.x,
        y: c.value.y,
        w: c.value.w,
        h: c.value.h,
        i: c.value.i
      }, null, 8, ["x", "y", "w", "h", "i"]), [
        [Ji, s.value]
      ])
    ], 4));
  }
}), aa = [sa, Mi], ca = {
  install(e) {
    aa.forEach((t) => {
      e.component(t.name, t);
    });
  }
};
export {
  Mi as GridItem,
  sa as GridLayout,
  ca as default
};
