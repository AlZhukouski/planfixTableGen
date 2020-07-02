(function (a, m, e) {
	function b(a, b, c, d) {
		for (var e = [], f = 0; f < a.length; f++) {
			var g = a[f];
			if (g) {
				var k = tinycolor(g), q = .5 > k.toHsl().l ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
				q += tinycolor.equals(b, g) ? " sp-thumb-active" : "";
				g = k.toString(d || "rgb");
				var p = A ? "background-color:" + k.toRgbString() : "filter:" + k.toFilter();
				e.push('<span title="' + g + '" data-color="' + k.toRgbString() + '" class="' + q + '"><span class="sp-thumb-inner" style="' + p + ';" /></span>')
			} else e.push('<span title="No Color Selected" data-color="" style="background-color:transparent;" class="sp-clear-display"></span>')
		}
		return "<div class='sp-cf " +
			c + "'>" + e.join("") + "</div>"
	}

	function d(a, b) {
		a = m.extend({}, r, a);
		a.callbacks = {
			move: q(a.move, b),
			change: q(a.change, b),
			show: q(a.show, b),
			hide: q(a.hide, b),
			beforeShow: q(a.beforeShow, b)
		};
		return a
	}

	function c(c, k) {
		function q() {
			J.showPaletteOnly && (J.showPalette = !0);
			if (J.palette) {
				Ba = J.palette.slice(0);
				ja = m.isArray(Ba[0]) ? Ba : [Ba];
				qa = {};
				for (var a = 0; a < ja.length; a++) for (var b = 0; b < ja[a].length; b++) {
					var c = tinycolor(ja[a][b]).toRgbString();
					qa[c] = !0
				}
			}
			Z.toggleClass("sp-flat", U);
			Z.toggleClass("sp-input-disabled", !J.showInput);
			Z.toggleClass("sp-alpha-enabled", J.showAlpha);
			Z.toggleClass("sp-clear-enabled", Ka);
			Z.toggleClass("sp-buttons-disabled", !J.showButtons);
			Z.toggleClass("sp-palette-disabled", !J.showPalette);
			Z.toggleClass("sp-palette-only", J.showPaletteOnly);
			Z.toggleClass("sp-initial-disabled", !J.showInitial);
			Z.addClass(J.className).addClass(J.containerClassName);
			ma()
		}

		function r() {
			if (fa && a.localStorage) {
				try {
					var b = a.localStorage[fa].split(",#");
					1 < b.length && (delete a.localStorage[fa], m.each(b, function (a, b) {
						x(b)
					}))
				} catch (ua) {
				}
				try {
					L =
						a.localStorage[fa].split(";")
				} catch (ua) {
				}
			}
		}

		function x(b) {
			if (N) {
				b = tinycolor(b).toRgbString();
				if (!qa[b] && -1 === m.inArray(b, L)) for (L.push(b); L.length > Ha;) L.shift();
				if (fa && a.localStorage) try {
					a.localStorage[fa] = L.join(";")
				} catch (ua) {
				}
			}
		}

		function y() {
			var a = [];
			if (J.showPalette) for (var b = 0; b < L.length; b++) {
				var c = tinycolor(L[b]).toRgbString();
				qa[c] || a.push(L[b])
			}
			return a.reverse().slice(0, J.maxSelectionSize)
		}

		function T() {
			var a = aa(), c = m.map(ja, function (c, d) {
				return b(c, a, "sp-palette-row sp-palette-row-" + d, J.preferredFormat)
			});
			r();
			L && c.push(b(y(), a, "sp-palette-row sp-palette-row-selection", J.preferredFormat));
			Pa.html(c.join(""))
		}

		function M() {
			if (J.showInitial) {
				var a = Ia, c = aa();
				Ca.html(b([a, c], c, "sp-palette-row-initial", J.preferredFormat))
			}
		}

		function Q() {
			(0 >= n || 0 >= Y || 0 >= V) && ma();
			Z.addClass("sp-dragging");
			sa = null;
			la.trigger("dragstart.spectrum", [aa()])
		}

		function K() {
			Z.removeClass("sp-dragging");
			la.trigger("dragstop.spectrum", [aa()])
		}

		function da() {
			var a = ba.val();
			null !== a && "" !== a || !Ka ? (a = tinycolor(a), a.ok ? (ca(a), ha(!0)) : ba.addClass("sp-validation-error")) :
				(ca(null), ha(!0))
		}

		function C() {
			ia ? I() : P()
		}

		function P() {
			var b = m.Event("beforeShow.spectrum");
			if (ia) ma(); else if (la.trigger(b, [aa()]), !1 !== S.beforeShow(aa()) && !b.isDefaultPrevented()) {
				for (b = 0; b < u.length; b++) u[b] && u[b].hide();
				ia = !0;
				m(Ta).bind("click.spectrum", I);
				m(a).bind("resize.spectrum", pa);
				La.addClass("sp-active");
				Z.removeClass("sp-hidden");
				ma();
				ea();
				Ia = aa();
				M();
				S.show(Ia);
				la.trigger("show.spectrum", [Ia])
			}
		}

		function I(b) {
			b && "click" == b.type && 2 == b.button || !ia || U || (ia = !1, m(Ta).unbind("click.spectrum",
				I), m(a).unbind("resize.spectrum", pa), La.removeClass("sp-active"), Z.addClass("sp-hidden"), tinycolor.equals(aa(), Ia) || (pb && "cancel" !== b ? ha(!0) : ca(Ia, !0)), S.hide(aa()), la.trigger("hide.spectrum", [aa()]))
		}

		function ca(a, b) {
			tinycolor.equals(a, aa());
			if (!a && Ka) Ja = !0; else {
				Ja = !1;
				var c = tinycolor(a);
				a = c.toHsv();
				H = a.h % 360 / 360;
				Aa = a.s;
				na = a.v;
				F = a.a
			}
			ea();
			c && c.ok && !b && (Va = cb || c.format)
		}

		function aa(a) {
			a = a || {};
			return Ka && Ja ? null : tinycolor.fromRatio({
				h: H,
				s: Aa,
				v: na,
				a: Math.round(100 * F) / 100
			}, {format: a.format || Va})
		}

		function ka() {
			ea();
			S.move(aa());
			la.trigger("move.spectrum", [aa()])
		}

		function ea() {
			ba.removeClass("sp-validation-error");
			oa();
			var a = tinycolor.fromRatio({h: H, s: 1, v: 1});
			Ea.css("background-color", a.toHexString());
			a = Va;
			!(1 > F) || 0 === F && "name" === a || "hex" !== a && "hex3" !== a && "hex6" !== a && "name" !== a || (a = "rgb");
			var b = aa({format: a}), c = "";
			Ga.removeClass("sp-clear-display");
			Ga.css("background-color", "transparent");
			if (!b && Ka) Ga.addClass("sp-clear-display"); else {
				c = b.toHexString();
				var d = b.toRgbString();
				A || 1 === b.alpha ? Ga.css("background-color",
					d) : (Ga.css("background-color", "transparent"), Ga.css("filter", b.toFilter()));
				if (J.showAlpha) {
					d = b.toRgb();
					d.a = 0;
					d = tinycolor(d).toRgbString();
					var e = "linear-gradient(left, " + d + ", " + c + ")";
					w ? wa.css("filter", tinycolor(d).toFilter({gradientType: 1}, c)) : (wa.css("background", "-webkit-" + e), wa.css("background", "-moz-" + e), wa.css("background", "-ms-" + e), wa.css("background", "linear-gradient(to right, " + d + ", " + c + ")"))
				}
				c = b.toString(a)
			}
			J.showInput && ba.val(c);
			J.showPalette && T();
			M()
		}

		function oa() {
			var a = Aa, b = na;
			Ka && Ja ?
				(ya.hide(), Oa.hide(), Qa.hide()) : (ya.show(), Oa.show(), Qa.show(), a *= Y, b = n - b * n, a = Math.max(-W, Math.min(Y - W, a - W)), b = Math.max(-W, Math.min(n - W, b - W)), Qa.css({
					top: b + "px",
					left: a + "px"
				}), ya.css({left: F * D - h / 2 + "px"}), Oa.css({top: H * V - ra + "px"}))
		}

		function ha(a) {
			var b = aa(), c = "";
			b && (c = b.toString(Va), x(b));
			Fa && la.val(c);
			Ia = b;
			a && (S.change(b), la.trigger("change", [b]))
		}

		function ma() {
			Y = Ea.width();
			n = Ea.height();
			W = Qa.height();
			Sa.width();
			V = Sa.height();
			ra = Oa.height();
			D = za.width();
			h = ya.width();
			U || (Z.css("position", "absolute"),
				Z.offset(g(Z, Ma)));
			oa();
			J.showPalette && T();
			la.trigger("reflow.spectrum")
		}

		function R() {
			I();
			ta = !0;
			la.attr("disabled", !0);
			Ma.addClass("sp-disabled")
		}

		var J = d(k, c), U = J.flat, N = J.showSelectionPalette, fa = J.localStorageKey;
		k = J.theme;
		var S = J.callbacks, pa = p(ma, 10), ia = !1, Y = 0, n = 0, W = 0, V = 0, D = 0, h = 0, ra = 0, H = 0, Aa = 0,
			na = 0, F = 1, Ba = [], ja = [], qa = {}, L = J.selectionPalette.slice(0), Ha = J.maxSelectionSize, sa = null,
			Ta = c.ownerDocument, la = m(c), ta = !1, Z = m(B, Ta).addClass(k), Ea = Z.find(".sp-color"),
			Qa = Z.find(".sp-dragger"), Sa = Z.find(".sp-hue"),
			Oa = Z.find(".sp-slider"), wa = Z.find(".sp-alpha-inner"), za = Z.find(".sp-alpha"),
			ya = Z.find(".sp-alpha-handle"), ba = Z.find(".sp-input"), Pa = Z.find(".sp-palette"), Ca = Z.find(".sp-initial"),
			Da = Z.find(".sp-cancel"), Ua = Z.find(".sp-clear"), va = Z.find(".sp-choose"), Fa = la.is("input");
		c = Fa && v && "color" === la.attr("type");
		var Ya = Fa && !U,
			La = Ya ? m("<div class='sp-replacer'><div class='sp-preview'><div class='sp-preview-inner'></div></div><div class='sp-dd'>&#9660;</div></div>").addClass(k).addClass(J.className).addClass(J.replacerClassName).attr(J.extraReplacerAttr) :
				m([]), Ma = Ya ? La : la, Ga = La.find(".sp-preview-inner"), Na = J.color || Fa && la.val(), Ia = !1,
			cb = J.preferredFormat, Va = cb, pb = !J.showButtons || J.clickoutFiresChange, Ja = !Na, Ka = J.allowEmpty && !c;
		(function () {
			function a(a) {
				a.data && a.data.ignore ? (ca(m(this).data("color")), ka()) : (ca(m(this).data("color")), ka(), ha(!0), I());
				return !1
			}

			w && Z.find("*:not(input)").attr("unselectable", "on");
			q();
			Ya && la.after(La).hide();
			Ka || Ua.hide();
			if (U) la.after(Z).hide(); else {
				var b = "parent" === J.appendTo ? la.parent() : m(J.appendTo);
				1 !== b.length &&
				(b = m("body"));
				b.append(Z)
			}
			r();
			Ma.bind("click.spectrum touchstart.spectrum", function (a) {
				ta || C();
				a.stopPropagation();
				m(a.target).is("input") || a.preventDefault()
			});
			(la.is(":disabled") || !0 === J.disabled) && R();
			Z.click(f);
			ba.change(da);
			ba.bind("paste", function () {
				setTimeout(da, 1)
			});
			ba.keydown(function (a) {
				13 == a.keyCode && da()
			});
			Da.text(J.cancelText);
			Da.bind("click.spectrum", function (a) {
				a.stopPropagation();
				a.preventDefault();
				I("cancel")
			});
			Ua.attr("title", J.clearText);
			Ua.bind("click.spectrum", function (a) {
				a.stopPropagation();
				a.preventDefault();
				Ja = !0;
				ka();
				U && ha(!0)
			});
			va.text(J.chooseText);
			va.bind("click.spectrum", function (a) {
				a.stopPropagation();
				a.preventDefault();
				ba.hasClass("sp-validation-error") || (ha(!0), I())
			});
			t(za, function (a, b, c) {
				F = a / D;
				Ja = !1;
				c.shiftKey && (F = Math.round(10 * F) / 10);
				ka()
			}, Q, K);
			t(Sa, function (a, b) {
				H = parseFloat(b / V);
				Ja = !1;
				J.showAlpha || (F = 1);
				ka()
			}, Q, K);
			t(Ea, function (a, b, c) {
				c.shiftKey ? sa || (sa = Math.abs(a - Aa * Y) > Math.abs(b - (n - na * n)) ? "x" : "y") : sa = null;
				c = !sa || "y" === sa;
				sa && "x" !== sa || (Aa = parseFloat(a / Y));
				c && (na = parseFloat((n -
					b) / n));
				Ja = !1;
				J.showAlpha || (F = 1);
				ka()
			}, Q, K);
			Na ? (ca(Na), ea(), Va = cb || tinycolor(Na).format, x(Na)) : ea();
			U && P();
			b = w ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
			Pa.delegate(".sp-thumb-el", b, a);
			Ca.delegate(".sp-thumb-el:nth-child(1)", b, {ignore: !0}, a)
		})();
		var Za = {
			show: P, hide: I, toggle: C, reflow: ma, option: function (a, b) {
				if (a === e) return m.extend({}, J);
				if (b === e) return J[a];
				J[a] = b;
				q()
			}, enable: function () {
				ta = !1;
				la.attr("disabled", !1);
				Ma.removeClass("sp-disabled")
			}, disable: R, set: function (a) {
				ca(a);
				ha()
			},
			get: aa, destroy: function () {
				la.show();
				Ma.unbind("click.spectrum touchstart.spectrum");
				Z.remove();
				La.remove();
				u[Za.id] = null
			}, container: Z
		};
		Za.id = u.push(Za) - 1;
		return Za
	}

	function g(a, b) {
		var c = a.outerWidth(), d = a.outerHeight(), e = b.outerHeight(), f = a[0].ownerDocument, g = f.documentElement;
		a = g.clientWidth + m(f).scrollLeft();
		f = g.clientHeight + m(f).scrollTop();
		b = b.offset();
		b.top += e;
		b.left -= Math.min(b.left, b.left + c > a && a > c ? Math.abs(b.left + c - a) : 0);
		b.top -= Math.min(b.top, b.top + d > f && f > d ? Math.abs(d + e - 0) : 0);
		return b
	}

	function k() {
	}

	function f(a) {
		a.stopPropagation()
	}

	function q(a, b) {
		var c = Array.prototype.slice, d = c.call(arguments, 2);
		return function () {
			return a.apply(b, d.concat(c.call(arguments)))
		}
	}

	function t(b, c, d, e) {
		function f(a) {
			a.stopPropagation && a.stopPropagation();
			a.preventDefault && a.preventDefault();
			a.returnValue = !1
		}

		function g(a) {
			if (p) {
				if (w && 9 > document.documentMode && !a.button) return k();
				var d = a.originalEvent.touches, e = Math.max(0, Math.min((d ? d[0].pageX : a.pageX) - r.left, u));
				d = Math.max(0, Math.min((d ? d[0].pageY : a.pageY) - r.top,
					t));
				x && f(a);
				c.apply(b, [e, d, a])
			}
		}

		function k() {
			p && (m(q).unbind(A), m(q.body).removeClass("sp-dragging"), e.apply(b, arguments));
			p = !1
		}

		c = c || function () {
		};
		d = d || function () {
		};
		e = e || function () {
		};
		var q = b.ownerDocument || document, p = !1, r = {}, t = 0, u = 0, x = "ontouchstart" in a, A = {};
		A.selectstart = f;
		A.dragstart = f;
		A["touchmove mousemove"] = g;
		A["touchend mouseup"] = k;
		m(b).bind("touchstart mousedown", function (a) {
			(a.which ? 3 == a.which : 2 == a.button) || p || !1 === d.apply(b, arguments) || (p = !0, t = m(b).height(), u = m(b).width(), r = m(b).offset(),
				m(q).bind(A), m(q.body).addClass("sp-dragging"), x || g(a), f(a))
		})
	}

	function p(a, b, c) {
		var d;
		return function () {
			var e = this, f = arguments, g = function () {
				d = null;
				a.apply(e, f)
			};
			c && clearTimeout(d);
			if (c || !d) d = setTimeout(g, b)
		}
	}

	var r = {
			beforeShow: k,
			move: k,
			change: k,
			show: k,
			hide: k,
			color: !1,
			flat: !1,
			showInput: !1,
			allowEmpty: !1,
			showButtons: !0,
			clickoutFiresChange: !1,
			showInitial: !1,
			showPalette: !1,
			showPaletteOnly: !1,
			showSelectionPalette: !0,
			localStorageKey: !1,
			appendTo: "body",
			maxSelectionSize: 7,
			cancelText: "cancel",
			chooseText: "choose",
			clearText: "Clear Color Selection",
			preferredFormat: !1,
			className: "",
			containerClassName: "",
			replacerClassName: "",
			showAlpha: !1,
			theme: "sp-light",
			palette: ["#ffffff #000000 #ff0000 #ff8000 #ffff00 #008000 #0000ff #4b0082 #9400d3".split(" ")],
			selectionPalette: [],
			disabled: !1,
			extraReplacerAttr: {}
		}, u = [], w = !!/msie/i.exec(a.navigator.userAgent), A = function () {
			var a = document.createElement("div").style;
			a.cssText = "background-color:rgba(0,0,0,.5)";
			return !!~("" + a.backgroundColor).indexOf("rgba") || !!~("" + a.backgroundColor).indexOf("hsla")
		}(),
		v = function () {
			var a = m("<input type='color' value='!' />")[0];
			return "color" === a.type && "!" !== a.value
		}(), B = function () {
			var a = "";
			if (w) for (var b = 1; 6 >= b; b++) a += "<div class='sp-" + b + "'></div>";
			return ["<div class='sp-container sp-hidden'><div class='sp-palette-container'><div class='sp-palette sp-thumb sp-cf'></div></div><div class='sp-picker-container'><div class='sp-top sp-cf'><div class='sp-fill'></div><div class='sp-top-inner'><div class='sp-color'><div class='sp-sat'><div class='sp-val'><div class='sp-dragger'></div></div></div></div><div class='sp-clear sp-clear-display'></div><div class='sp-hue'><div class='sp-slider'></div>",
				a, "</div></div><div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div></div><div class='sp-input-container sp-cf'><input class='sp-input' type='text' spellcheck='false'  /></div><div class='sp-initial sp-thumb sp-cf'></div><div class='sp-button-container sp-cf'><a class='sp-cancel' href='#'></a><button type='button' class='sp-choose'></button></div></div></div>"].join("")
		}();
	m.fn.spectrum = function (a, b) {
		if ("string" == typeof a) {
			var d = this, e = Array.prototype.slice.call(arguments,
				1);
			this.each(function () {
				var b = u[m(this).data("spectrum.id")];
				if (b) {
					var c = b[a];
					if (!c) throw Error("Spectrum: no such method: '" + a + "'");
					"get" == a ? d = b.get() : "container" == a ? d = b.container : "option" == a ? d = b.option.apply(b, e) : "destroy" == a ? (b.destroy(), m(this).removeData("spectrum.id")) : c.apply(b, e)
				}
			});
			return d
		}
		return this.spectrum("destroy").each(function () {
			var b = m.extend({}, a, m(this).data());
			b = c(this, b);
			m(this).data("spectrum.id", b.id)
		})
	};
	m.fn.spectrum.load = !0;
	m.fn.spectrum.loadOpts = {};
	m.fn.spectrum.draggable =
		t;
	m.fn.spectrum.defaults = r;
	m.spectrum = {};
	m.spectrum.localization = {};
	m.spectrum.palettes = {};
	m.fn.spectrum.processNativeColorInputs = function () {
		v || m("input[type=color]").spectrum({preferredFormat: "hex6"})
	};
	(function () {
		function b(a, e) {
			a = a ? a : "";
			e = e || {};
			if ("object" == typeof a && a.hasOwnProperty("_tc_id")) return a;
			a = c(a);
			var r = a.r, t = a.g, m = a.b, u = a.a, A = v(100 * u) / 100, Y = e.format || a.format;
			1 > r && (r = v(r));
			1 > t && (t = v(t));
			1 > m && (m = v(m));
			return {
				ok: a.ok, format: Y, _tc_id: w++, alpha: u, getAlpha: function () {
					return u
				}, setAlpha: function (a) {
					u =
						q(a);
					A = v(100 * u) / 100
				}, toHsv: function () {
					var a = f(r, t, m);
					return {h: 360 * a.h, s: a.s, v: a.v, a: u}
				}, toHsvString: function () {
					var a = f(r, t, m), b = v(360 * a.h), c = v(100 * a.s);
					a = v(100 * a.v);
					return 1 == u ? "hsv(" + b + ", " + c + "%, " + a + "%)" : "hsva(" + b + ", " + c + "%, " + a + "%, " + A + ")"
				}, toHsl: function () {
					var a = d(r, t, m);
					return {h: 360 * a.h, s: a.s, l: a.l, a: u}
				}, toHslString: function () {
					var a = d(r, t, m), b = v(360 * a.h), c = v(100 * a.s);
					a = v(100 * a.l);
					return 1 == u ? "hsl(" + b + ", " + c + "%, " + a + "%)" : "hsla(" + b + ", " + c + "%, " + a + "%, " + A + ")"
				}, toHex: function (a) {
					return g(r, t, m, a)
				},
				toHexString: function (a) {
					return "#" + this.toHex(a)
				}, toHex8: function () {
					return k(r, t, m, u)
				}, toHex8String: function () {
					return "#" + this.toHex8()
				}, toRgb: function () {
					return {r: v(r), g: v(t), b: v(m), a: u}
				}, toRgbString: function () {
					return 1 == u ? "rgb(" + v(r) + ", " + v(t) + ", " + v(m) + ")" : "rgba(" + v(r) + ", " + v(t) + ", " + v(m) + ", " + A + ")"
				}, toPercentageRgb: function () {
					return {r: v(100 * p(r, 255)) + "%", g: v(100 * p(t, 255)) + "%", b: v(100 * p(m, 255)) + "%", a: u}
				}, toPercentageRgbString: function () {
					return 1 == u ? "rgb(" + v(100 * p(r, 255)) + "%, " + v(100 * p(t, 255)) + "%, " +
						v(100 * p(m, 255)) + "%)" : "rgba(" + v(100 * p(r, 255)) + "%, " + v(100 * p(t, 255)) + "%, " + v(100 * p(m, 255)) + "%, " + A + ")"
				}, toName: function () {
					return 0 === u ? "transparent" : ma[g(r, t, m, !0)] || !1
				}, toFilter: function (a) {
					var c = "#" + k(r, t, m, u), d = c, f = e && e.gradientType ? "GradientType = 1, " : "";
					a && (d = b(a).toHex8String());
					return "progid:DXImageTransform.Microsoft.gradient(" + f + "startColorstr=" + c + ",endColorstr=" + d + ")"
				}, toString: function (a) {
					var b = !!a;
					a = a || this.format;
					var c = !1;
					b = !b && 1 > u && 0 < u && ("hex" === a || "hex6" === a || "hex3" === a || "name" === a);
					"rgb" === a && (c = this.toRgbString());
					"prgb" === a && (c = this.toPercentageRgbString());
					if ("hex" === a || "hex6" === a) c = this.toHexString();
					"hex3" === a && (c = this.toHexString(!0));
					"hex8" === a && (c = this.toHex8String());
					"name" === a && (c = this.toName());
					"hsl" === a && (c = this.toHslString());
					"hsv" === a && (c = this.toHsvString());
					return b ? this.toRgbString() : c || this.toHexString()
				}
			}
		}

		function c(a) {
			var b = {r: 0, g: 0, b: 0}, c = 1, d = !1, f = !1;
			if ("string" == typeof a) a:{
				a = a.replace(m, "").replace(u, "").toLowerCase();
				var g = !1;
				if (ha[a]) a = ha[a], g = !0; else if ("transparent" ==
					a) {
					a = {r: 0, g: 0, b: 0, a: 0, format: "name"};
					break a
				}
				var k;
				a = (k = R.rgb.exec(a)) ? {r: k[1], g: k[2], b: k[3]} : (k = R.rgba.exec(a)) ? {
					r: k[1],
					g: k[2],
					b: k[3],
					a: k[4]
				} : (k = R.hsl.exec(a)) ? {h: k[1], s: k[2], l: k[3]} : (k = R.hsla.exec(a)) ? {
					h: k[1],
					s: k[2],
					l: k[3],
					a: k[4]
				} : (k = R.hsv.exec(a)) ? {h: k[1], s: k[2], v: k[3]} : (k = R.hex8.exec(a)) ? {
					a: parseInt(k[1], 16) / 255,
					r: parseInt(k[2], 16),
					g: parseInt(k[3], 16),
					b: parseInt(k[4], 16),
					format: g ? "name" : "hex8"
				} : (k = R.hex6.exec(a)) ? {
						r: parseInt(k[1], 16),
						g: parseInt(k[2], 16),
						b: parseInt(k[3], 16),
						format: g ? "name" : "hex"
					} :
					(k = R.hex3.exec(a)) ? {
						r: parseInt(k[1] + "" + k[1], 16),
						g: parseInt(k[2] + "" + k[2], 16),
						b: parseInt(k[3] + "" + k[3], 16),
						format: g ? "name" : "hex"
					} : !1
			}
			if ("object" == typeof a) {
				if (a.hasOwnProperty("r") && a.hasOwnProperty("g") && a.hasOwnProperty("b")) b = a.g, d = a.b, b = {
					r: 255 * p(a.r, 255),
					g: 255 * p(b, 255),
					b: 255 * p(d, 255)
				}, d = !0, f = "%" === String(a.r).substr(-1) ? "prgb" : "rgb"; else if (a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("v")) {
					a.s = t(a.s);
					a.v = t(a.v);
					f = a.h;
					g = a.s;
					b = a.v;
					f = 6 * p(f, 360);
					g = p(g, 100);
					b = p(b, 100);
					d = A.floor(f);
					var r = f - d;
					f = b * (1 - g);
					k = b * (1 - r * g);
					g = b * (1 - (1 - r) * g);
					d %= 6;
					b = {r: 255 * [b, k, f, f, g, b][d], g: 255 * [g, b, b, k, f, f][d], b: 255 * [f, f, g, b, b, k][d]};
					d = !0;
					f = "hsv"
				} else a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("l") && (a.s = t(a.s), a.l = t(a.l), b = e(a.h, a.s, a.l), d = !0, f = "hsl");
				a.hasOwnProperty("a") && (c = a.a)
			}
			c = q(c);
			return {ok: d, format: a.format || f, r: B(255, ea(b.r, 0)), g: B(255, ea(b.g, 0)), b: B(255, ea(b.b, 0)), a: c}
		}

		function d(a, b, c) {
			a = p(a, 255);
			b = p(b, 255);
			c = p(c, 255);
			var d = ea(a, b, c), e = B(a, b, c), f = (d + e) / 2;
			if (d == e) var g = e =
				0; else {
				var k = d - e;
				e = .5 < f ? k / (2 - d - e) : k / (d + e);
				switch (d) {
					case a:
						g = (b - c) / k + (b < c ? 6 : 0);
						break;
					case b:
						g = (c - a) / k + 2;
						break;
					case c:
						g = (a - b) / k + 4
				}
				g /= 6
			}
			return {h: g, s: e, l: f}
		}

		function e(a, b, c) {
			function d(a, b, c) {
				0 > c && (c += 1);
				1 < c && --c;
				return c < 1 / 6 ? a + 6 * (b - a) * c : .5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
			}

			a = p(a, 360);
			b = p(b, 100);
			c = p(c, 100);
			if (0 === b) c = b = a = c; else {
				var e = .5 > c ? c * (1 + b) : c + b - c * b, f = 2 * c - e;
				c = d(f, e, a + 1 / 3);
				b = d(f, e, a);
				a = d(f, e, a - 1 / 3)
			}
			return {r: 255 * c, g: 255 * b, b: 255 * a}
		}

		function f(a, b, c) {
			a = p(a, 255);
			b = p(b, 255);
			c = p(c, 255);
			var d = ea(a, b, c), e =
				B(a, b, c), f = d - e;
			if (d == e) var g = 0; else {
				switch (d) {
					case a:
						g = (b - c) / f + (b < c ? 6 : 0);
						break;
					case b:
						g = (c - a) / f + 2;
						break;
					case c:
						g = (a - b) / f + 4
				}
				g /= 6
			}
			return {h: g, s: 0 === d ? 0 : f / d, v: d}
		}

		function g(a, b, c, d) {
			a = [r(v(a).toString(16)), r(v(b).toString(16)), r(v(c).toString(16))];
			return d && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("")
		}

		function k(a, b, c, d) {
			return [r(Math.round(255 * parseFloat(d)).toString(16)), r(v(a).toString(16)), r(v(b).toString(16)),
				r(v(c).toString(16))].join("")
		}

		function q(a) {
			a = parseFloat(a);
			if (isNaN(a) || 0 > a || 1 < a) a = 1;
			return a
		}

		function p(a, b) {
			var c = a;
			"string" == typeof c && -1 != c.indexOf(".") && 1 === parseFloat(c) && (a = "100%");
			c = "string" === typeof a && -1 != a.indexOf("%");
			a = B(b, ea(0, parseFloat(a)));
			c && (a = parseInt(a * b, 10) / 100);
			return 1E-6 > A.abs(a - b) ? 1 : a % b / parseFloat(b)
		}

		function r(a) {
			return 1 == a.length ? "0" + a : "" + a
		}

		function t(a) {
			1 >= a && (a = 100 * a + "%");
			return a
		}

		var m = /^[\s,#]+/, u = /\s+$/, w = 0, A = Math, v = A.round, B = A.min, ea = A.max, oa = A.random;
		b.fromRatio =
			function (a, c) {
				if ("object" == typeof a) {
					var d = {}, e;
					for (e in a) a.hasOwnProperty(e) && (d[e] = "a" === e ? a[e] : t(a[e]));
					a = d
				}
				return b(a, c)
			};
		b.equals = function (a, c) {
			return a && c ? b(a).toRgbString() == b(c).toRgbString() : !1
		};
		b.random = function () {
			return b.fromRatio({r: oa(), g: oa(), b: oa()})
		};
		b.desaturate = function (a, c) {
			c = 0 === c ? 0 : c || 10;
			a = b(a).toHsl();
			a.s -= c / 100;
			a.s = B(1, ea(0, a.s));
			return b(a)
		};
		b.saturate = function (a, c) {
			c = 0 === c ? 0 : c || 10;
			a = b(a).toHsl();
			a.s += c / 100;
			a.s = B(1, ea(0, a.s));
			return b(a)
		};
		b.greyscale = function (a) {
			return b.desaturate(a,
				100)
		};
		b.lighten = function (a, c) {
			c = 0 === c ? 0 : c || 10;
			a = b(a).toHsl();
			a.l += c / 100;
			a.l = B(1, ea(0, a.l));
			return b(a)
		};
		b.darken = function (a, c) {
			c = 0 === c ? 0 : c || 10;
			a = b(a).toHsl();
			a.l -= c / 100;
			a.l = B(1, ea(0, a.l));
			return b(a)
		};
		b.complement = function (a) {
			a = b(a).toHsl();
			a.h = (a.h + 180) % 360;
			return b(a)
		};
		b.triad = function (a) {
			var c = b(a).toHsl(), d = c.h;
			return [b(a), b({h: (d + 120) % 360, s: c.s, l: c.l}), b({h: (d + 240) % 360, s: c.s, l: c.l})]
		};
		b.tetrad = function (a) {
			var c = b(a).toHsl(), d = c.h;
			return [b(a), b({h: (d + 90) % 360, s: c.s, l: c.l}), b({
				h: (d + 180) % 360, s: c.s,
				l: c.l
			}), b({h: (d + 270) % 360, s: c.s, l: c.l})]
		};
		b.splitcomplement = function (a) {
			var c = b(a).toHsl(), d = c.h;
			return [b(a), b({h: (d + 72) % 360, s: c.s, l: c.l}), b({h: (d + 216) % 360, s: c.s, l: c.l})]
		};
		b.analogous = function (a, c, d) {
			c = c || 6;
			d = d || 30;
			var e = b(a).toHsl();
			d = 360 / d;
			a = [b(a)];
			for (e.h = (e.h - (d * c >> 1) + 720) % 360; --c;) e.h = (e.h + d) % 360, a.push(b(e));
			return a
		};
		b.monochromatic = function (a, c) {
			c = c || 6;
			var d = b(a).toHsv();
			a = d.h;
			var e = d.s;
			d = d.v;
			for (var f = [], g = 1 / c; c--;) f.push(b({h: a, s: e, v: d})), d = (d + g) % 1;
			return f
		};
		b.readability = function (a, c) {
			a =
				b(a).toRgb();
			c = b(c).toRgb();
			return {
				brightness: Math.abs((299 * a.r + 587 * a.g + 114 * a.b) / 1E3 - (299 * c.r + 587 * c.g + 114 * c.b) / 1E3),
				color: Math.max(a.r, c.r) - Math.min(a.r, c.r) + Math.max(a.g, c.g) - Math.min(a.g, c.g) + Math.max(a.b, c.b) - Math.min(a.b, c.b)
			}
		};
		b.readable = function (a, c) {
			a = b.readability(a, c);
			return 125 < a.brightness && 500 < a.color
		};
		b.mostReadable = function (a, c) {
			for (var d = null, e = 0, f = !1, g = 0; g < c.length; g++) {
				var k = b.readability(a, c[g]), p = 125 < k.brightness && 500 < k.color;
				k = k.brightness / 125 * 3 + k.color / 500;
				if (p && !f || p && f && k > e ||
					!p && !f && k > e) f = p, e = k, d = b(c[g])
			}
			return d
		};
		var ha = b.names = {
			aliceblue: "f0f8ff",
			antiquewhite: "faebd7",
			aqua: "0ff",
			aquamarine: "7fffd4",
			azure: "f0ffff",
			beige: "f5f5dc",
			bisque: "ffe4c4",
			black: "000",
			blanchedalmond: "ffebcd",
			blue: "00f",
			blueviolet: "8a2be2",
			brown: "a52a2a",
			burlywood: "deb887",
			burntsienna: "ea7e5d",
			cadetblue: "5f9ea0",
			chartreuse: "7fff00",
			chocolate: "d2691e",
			coral: "ff7f50",
			cornflowerblue: "6495ed",
			cornsilk: "fff8dc",
			crimson: "dc143c",
			cyan: "0ff",
			darkblue: "00008b",
			darkcyan: "008b8b",
			darkgoldenrod: "b8860b",
			darkgray: "a9a9a9",
			darkgreen: "006400",
			darkgrey: "a9a9a9",
			darkkhaki: "bdb76b",
			darkmagenta: "8b008b",
			darkolivegreen: "556b2f",
			darkorange: "ff8c00",
			darkorchid: "9932cc",
			darkred: "8b0000",
			darksalmon: "e9967a",
			darkseagreen: "8fbc8f",
			darkslateblue: "483d8b",
			darkslategray: "2f4f4f",
			darkslategrey: "2f4f4f",
			darkturquoise: "00ced1",
			darkviolet: "9400d3",
			deeppink: "ff1493",
			deepskyblue: "00bfff",
			dimgray: "696969",
			dimgrey: "696969",
			dodgerblue: "1e90ff",
			firebrick: "b22222",
			floralwhite: "fffaf0",
			forestgreen: "228b22",
			fuchsia: "f0f",
			gainsboro: "dcdcdc",
			ghostwhite: "f8f8ff",
			gold: "ffd700",
			goldenrod: "daa520",
			gray: "808080",
			green: "008000",
			greenyellow: "adff2f",
			grey: "808080",
			honeydew: "f0fff0",
			hotpink: "ff69b4",
			indianred: "cd5c5c",
			indigo: "4b0082",
			ivory: "fffff0",
			khaki: "f0e68c",
			lavender: "e6e6fa",
			lavenderblush: "fff0f5",
			lawngreen: "7cfc00",
			lemonchiffon: "fffacd",
			lightblue: "add8e6",
			lightcoral: "f08080",
			lightcyan: "e0ffff",
			lightgoldenrodyellow: "fafad2",
			lightgray: "d3d3d3",
			lightgreen: "90ee90",
			lightgrey: "d3d3d3",
			lightpink: "ffb6c1",
			lightsalmon: "ffa07a",
			lightseagreen: "20b2aa",
			lightskyblue: "87cefa",
			lightslategray: "789",
			lightslategrey: "789",
			lightsteelblue: "b0c4de",
			lightyellow: "ffffe0",
			lime: "0f0",
			limegreen: "32cd32",
			linen: "faf0e6",
			magenta: "f0f",
			maroon: "800000",
			mediumaquamarine: "66cdaa",
			mediumblue: "0000cd",
			mediumorchid: "ba55d3",
			mediumpurple: "9370db",
			mediumseagreen: "3cb371",
			mediumslateblue: "7b68ee",
			mediumspringgreen: "00fa9a",
			mediumturquoise: "48d1cc",
			mediumvioletred: "c71585",
			midnightblue: "191970",
			mintcream: "f5fffa",
			mistyrose: "ffe4e1",
			moccasin: "ffe4b5",
			navajowhite: "ffdead",
			navy: "000080",
			oldlace: "fdf5e6",
			olive: "808000",
			olivedrab: "6b8e23",
			orange: "ffa500",
			orangered: "ff4500",
			orchid: "da70d6",
			palegoldenrod: "eee8aa",
			palegreen: "98fb98",
			paleturquoise: "afeeee",
			palevioletred: "db7093",
			papayawhip: "ffefd5",
			peachpuff: "ffdab9",
			peru: "cd853f",
			pink: "ffc0cb",
			plum: "dda0dd",
			powderblue: "b0e0e6",
			purple: "800080",
			red: "f00",
			rosybrown: "bc8f8f",
			royalblue: "4169e1",
			saddlebrown: "8b4513",
			salmon: "fa8072",
			sandybrown: "f4a460",
			seagreen: "2e8b57",
			seashell: "fff5ee",
			sienna: "a0522d",
			silver: "c0c0c0",
			skyblue: "87ceeb",
			slateblue: "6a5acd",
			slategray: "708090",
			slategrey: "708090",
			snow: "fffafa",
			springgreen: "00ff7f",
			steelblue: "4682b4",
			tan: "d2b48c",
			teal: "008080",
			thistle: "d8bfd8",
			tomato: "ff6347",
			turquoise: "40e0d0",
			violet: "ee82ee",
			wheat: "f5deb3",
			white: "fff",
			whitesmoke: "f5f5f5",
			yellow: "ff0",
			yellowgreen: "9acd32"
		}, ma = b.hexNames = function (a) {
			var b = {}, c;
			for (c in a) a.hasOwnProperty(c) && (b[a[c]] = c);
			return b
		}(ha), R = {
			rgb: /rgb[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/,
			rgba: /rgba[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/,
			hsl: /hsl[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/,
			hsla: /hsla[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/,
			hsv: /hsv[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/,
			hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
			hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
			hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
		};
		a.tinycolor = b
	})();
	m(function () {
		m.fn.spectrum.load && m.fn.spectrum.processNativeColorInputs()
	})
})(window, jQuery);
(function (a, m) {
	var e = /[<>&\r\n"']/gm,
		b = {"<": "lt;", ">": "gt;", "&": "amp;", "\r": "#13;", "\n": "#10;", '"': "quot;", "'": "apos;"};
	a.extend({
		fileDownload: function (d, c) {
			function g() {
				if (-1 != document.cookie.indexOf(t.cookieName + "=" + t.cookieValue)) v.onSuccess(d), document.cookie = t.cookieName + "=; expires=" + (new Date(1E3)).toUTCString() + "; path=" + t.cookiePath, f(!1); else {
					if (x || B) try {
						var b = x ? x.document : k(B);
						if (b && null != b.body && b.body.innerHTML.length) {
							var c = !0;
							if (E && E.length) {
								var e = a(b.body).contents().first();
								e.length &&
								e[0] === E[0] && (c = !1)
							}
							if (c) {
								v.onFail(b.body.innerHTML, d);
								f(!0);
								return
							}
						}
					} catch (T) {
						v.onFail("", d);
						f(!0);
						return
					}
					setTimeout(g, t.checkInterval)
				}
			}

			function k(a) {
				a = a[0].contentWindow || a[0].contentDocument;
				a.document && (a = a.document);
				return a
			}

			function f(a) {
				setTimeout(function () {
					x && (u && x.close(), r && (x.focus(), a && x.close()))
				}, 0)
			}

			function q(a) {
				return a.replace(e, function (a) {
					return "&" + b[a]
				})
			}

			var t = a.extend({
				preparingMessageHtml: null,
				failMessageHtml: null,
				androidPostUnsupportedMessageHtml: "Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",
				dialogOptions: {modal: !0},
				prepareCallback: function (a) {
				},
				successCallback: function (a) {
				},
				failCallback: function (a, b) {
				},
				httpMethod: "GET",
				data: null,
				checkInterval: 100,
				cookieName: "fileDownload",
				cookieValue: "true",
				cookiePath: "/",
				popupWindowTitle: "Initiating file download...",
				encodeHTMLEntities: !0
			}, c), p = new a.Deferred;
			c = (navigator.userAgent || navigator.vendor || m.opera).toLowerCase();
			var r, u, w;
			/ip(ad|hone|od)/.test(c) ? r = !0 : -1 !== c.indexOf("android") ? u = !0 : w = /avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(c) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(c.substr(0,
					4));
			c = t.httpMethod.toUpperCase();
			if (u && "GET" !== c) return a().dialog ? a("<div>").html(t.androidPostUnsupportedMessageHtml).dialog(t.dialogOptions) : alert(t.androidPostUnsupportedMessageHtml), p.reject();
			var A = null, v = {
				onPrepare: function (b) {
					t.preparingMessageHtml ? A = a("<div>").html(t.preparingMessageHtml).dialog(t.dialogOptions) : t.prepareCallback && t.prepareCallback(b)
				}, onSuccess: function (a) {
					A && A.dialog("close");
					t.successCallback(a);
					p.resolve(a)
				}, onFail: function (b, c) {
					A && A.dialog("close");
					t.failMessageHtml &&
					a("<div>").html(t.failMessageHtml).dialog(t.dialogOptions);
					t.failCallback(b, c);
					p.reject(b, c)
				}
			};
			v.onPrepare(d);
			null !== t.data && "string" !== typeof t.data && (t.data = a.param(t.data));
			var B;
			if ("GET" === c) if (null !== t.data && (-1 !== d.indexOf("?") ? "&" !== d.substring(d.length - 1) && (d += "&") : d += "?", d += t.data), r || u) {
				var x = m.open(d);
				x.document.title = t.popupWindowTitle;
				m.focus()
			} else w ? m.location(d) : B = a("<iframe>").hide().prop("src", d).appendTo("body"); else {
				var y = "";
				null !== t.data && a.each(t.data.replace(/\+/g, " ").split("&"),
					function () {
						var a = this.split("="), b = t.encodeHTMLEntities ? q(decodeURIComponent(a[0])) : decodeURIComponent(a[0]);
						b && (a = t.encodeHTMLEntities ? q(decodeURIComponent(a[1])) : decodeURIComponent(a[1]), y += '<input type="hidden" name="' + b + '" value="' + a + '" />')
					});
				if (w) {
					var E = a("<form>").appendTo("body");
					E.hide().prop("method", t.httpMethod).prop("action", d).html(y)
				} else r ? (x = m.open("about:blank"), x.document.title = t.popupWindowTitle, w = x.document, m.focus()) : (B = a("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body"),
					w = k(B)), w.write("<html><head></head><body><form method='" + t.httpMethod + "' action='" + d + "'>" + y + "</form>" + t.popupWindowTitle + "</body></html>"), E = a(w).find("form");
				E.submit()
			}
			setTimeout(g, t.checkInterval);
			return p.promise()
		}
	})
})(jQuery, this);
var docCookies = {
	getItem: function (a) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
	}, setItem: function (a, m, e, b, d, c) {
		if (!a || /^(?:expires|max\-age|path|domain|secure)$/i.test(a)) return !1;
		var g = "";
		if (e) switch (e.constructor) {
			case Number:
				g = Infinity === e ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + e;
				break;
			case String:
				g = "; expires=" + e;
				break;
			case Date:
				g = "; expires=" + e.toUTCString()
		}
		document.cookie =
			encodeURIComponent(a) + "=" + encodeURIComponent(m) + g + (d ? "; domain=" + d : "") + (b ? "; path=" + b : "") + (c ? "; secure" : "");
		return !0
	}, removeItem: function (a, m, e) {
		if (!a || !this.hasItem(a)) return !1;
		document.cookie = encodeURIComponent(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (e ? "; domain=" + e : "") + (m ? "; path=" + m : "");
		return !0
	}, hasItem: function (a) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)
	}, keys: function () {
		for (var a = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g,
			"").split(/\s*(?:=[^;]*)?;\s*/), m = 0; m < a.length; m++) a[m] = decodeURIComponent(a[m]);
		return a
	}
};
var Prism = function () {
	var a = window, m = /\blang(?:uage)?-(?!\*)(\w+)\b/i, e = a.Prism = {
		util: {
			encode: function (a) {
				return a instanceof b ? new b(a.type, e.util.encode(a.content)) : "Array" === e.util.type(a) ? a.map(e.util.encode) : a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
			}, type: function (a) {
				return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]
			}, clone: function (a) {
				switch (e.util.type(a)) {
					case "Object":
						var b = {}, c;
						for (c in a) a.hasOwnProperty(c) && (b[c] = e.util.clone(a[c]));
						return b;
					case "Array":
						return a.slice()
				}
				return a
			}
		}, languages: {
			extend: function (a, b) {
				a = e.util.clone(e.languages[a]);
				for (var c in b) a[c] = b[c];
				return a
			}, insertBefore: function (a, b, d, f) {
				f = f || e.languages;
				var c = f[a], g = {}, k;
				for (k in c) if (c.hasOwnProperty(k)) {
					if (k == b) for (var r in d) d.hasOwnProperty(r) && (g[r] = d[r]);
					g[k] = c[k]
				}
				return f[a] = g
			}, DFS: function (a, b) {
				for (var c in a) b.call(a, c, a[c]), "Object" === e.util.type(a) && e.languages.DFS(a[c], b)
			}
		}, highlightAll: function (a, b) {
			for (var c = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),
						 d = 0, g; g = c[d++];) e.highlightElement(g, !0 === a, b)
		}, highlightElement: function (c, d, k) {
			for (var f, g, t = c; t && !m.test(t.className);) t = t.parentNode;
			t && (f = (t.className.match(m) || [, ""])[1], g = e.languages[f]);
			if (g && (c.className = c.className.replace(m, "").replace(/\s+/g, " ") + " language-" + f, t = c.parentNode, /pre/i.test(t.nodeName) && (t.className = t.className.replace(m, "").replace(/\s+/g, " ") + " language-" + f), t = c.textContent)) {
				var p = {element: c, language: f, grammar: g, code: t};
				e.hooks.run("before-highlight", p);
				d && a.Worker ? (c =
					new Worker(e.filename), c.onmessage = function (a) {
					p.highlightedCode = b.stringify(JSON.parse(a.data), f);
					e.hooks.run("before-insert", p);
					p.element.innerHTML = p.highlightedCode;
					k && k.call(p.element);
					e.hooks.run("after-highlight", p)
				}, c.postMessage(JSON.stringify({
					language: p.language,
					code: p.code
				}))) : (p.highlightedCode = e.highlight(p.code, p.grammar, p.language), e.hooks.run("before-insert", p), p.element.innerHTML = p.highlightedCode, k && k.call(c), e.hooks.run("after-highlight", p))
			}
		}, highlight: function (a, d, k) {
			a = e.tokenize(a,
				d);
			return b.stringify(e.util.encode(a), k)
		}, tokenize: function (a, b, d) {
			d = e.Token;
			var c = [a], g = b.rest;
			if (g) {
				for (var k in g) b[k] = g[k];
				delete b.rest
			}
			a:for (k in b) if (b.hasOwnProperty(k) && b[k]) {
				g = b[k];
				g = "Array" === e.util.type(g) ? g : [g];
				for (var p = 0; p < g.length; ++p) {
					var r = g[p], m = r.inside, w = !!r.lookbehind, A = 0;
					r = r.pattern || r;
					for (var v = 0; v < c.length; v++) {
						var B = c[v];
						if (c.length > a.length) break a;
						if (!(B instanceof d)) {
							r.lastIndex = 0;
							var x = r.exec(B);
							if (x) {
								w && (A = x[1].length);
								var y = x.index - 1 + A;
								x = x[0].slice(A);
								var E = y + x.length;
								y = B.slice(0, y + 1);
								B = B.slice(E + 1);
								E = [v, 1];
								y && E.push(y);
								x = new d(k, m ? e.tokenize(x, m) : x);
								E.push(x);
								B && E.push(B);
								Array.prototype.splice.apply(c, E)
							}
						}
					}
				}
			}
			return c
		}, hooks: {
			all: {}, add: function (a, b) {
				var c = e.hooks.all;
				c[a] = c[a] || [];
				c[a].push(b)
			}, run: function (a, b) {
				if ((a = e.hooks.all[a]) && a.length) for (var c = 0, d; d = a[c++];) d(b)
			}
		}
	}, b = e.Token = function (a, b) {
		this.type = a;
		this.content = b
	};
	b.stringify = function (a, d, k) {
		if ("string" == typeof a) return a;
		if ("[object Array]" == Object.prototype.toString.call(a)) return a.map(function (c) {
			return b.stringify(c,
				d, a)
		}).join("");
		k = {
			type: a.type,
			content: b.stringify(a.content, d, k),
			tag: "span",
			classes: ["token", a.type],
			attributes: {},
			language: d,
			parent: k
		};
		"comment" == k.type && (k.attributes.spellcheck = "true");
		e.hooks.run("wrap", k);
		var c = "", g;
		for (g in k.attributes) c += g + '="' + (k.attributes[g] || "") + '"';
		return "<" + k.tag + ' class="' + k.classes.join(" ") + '" ' + c + ">" + k.content + "</" + k.tag + ">"
	};
	if (!a.document) {
		if (!a.addEventListener) return a.Prism;
		a.addEventListener("message", function (b) {
			b = JSON.parse(b.data);
			a.postMessage(JSON.stringify(e.tokenize(b.code,
				e.languages[b.language])));
			a.close()
		}, !1);
		return a.Prism
	}
	var d = document.getElementsByTagName("script");
	if (d = d[d.length - 1]) e.filename = d.src, document.addEventListener && !d.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", e.highlightAll);
	return a.Prism
}();
"undefined" !== typeof module && module.exports && (module.exports = Prism);
Prism.languages.markup = {
	comment: /\x3c!--[\w\W]*?--\x3e/g,
	prolog: /<\?.+?\?>/,
	doctype: /<!DOCTYPE.+?>/,
	cdata: /<!\[CDATA\[[\w\W]*?]]\x3e/i,
	tag: {
		pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
		inside: {
			tag: {pattern: /^<\/?[\w:-]+/i, inside: {punctuation: /^<\/?/, namespace: /^[\w-]+?:/}},
			"attr-value": {pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi, inside: {punctuation: /=|>|"/g}},
			punctuation: /\/?>/g,
			"attr-name": {pattern: /[\w:-]+/g, inside: {namespace: /^[\w-]+?:/}}
		}
	},
	entity: /&#?[\da-z]{1,8};/gi
};
Prism.hooks.add("wrap", function (a) {
	"entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
});
Prism.languages.css = {
	comment: /\/\*[\w\W]*?\*\//g,
	atrule: {pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi, inside: {punctuation: /[;:]/g}},
	url: /url\((["']?).*?\1\)/gi,
	selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
	property: /(\b|\B)[\w-]+(?=\s*:)/ig,
	string: /("|')(\\?.)*?\1/g,
	important: /\B!important\b/gi,
	punctuation: /[\{\};:]/g,
	"function": /[-a-z0-9]+(?=\()/ig
};
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
	style: {
		pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/ig,
		inside: {
			tag: {pattern: /<style[\w\W]*?>|<\/style>/ig, inside: Prism.languages.markup.tag.inside},
			rest: Prism.languages.css
		}
	}
});
Prism.languages.clike = {
	comment: [{pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g, lookbehind: !0}, {
		pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
		lookbehind: !0
	}],
	string: /("|')(\\?.)*?\1/g,
	"class-name": {
		pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,
		lookbehind: !0,
		inside: {punctuation: /(\.|\\)/}
	},
	keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
	"boolean": /\b(true|false)\b/g,
	"function": {
		pattern: /[a-z0-9_]+\(/ig,
		inside: {punctuation: /\(/}
	},
	number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
	operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/g,
	ignore: /&(lt|gt|amp);/gi,
	punctuation: /[{}[\];(),.:]/g
};
Prism.languages.javascript = Prism.languages.extend("clike", {
	keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
	number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});
Prism.languages.insertBefore("javascript", "keyword", {
	regex: {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
		lookbehind: !0
	}
});
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
	script: {
		pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/ig,
		inside: {
			tag: {pattern: /<script[\w\W]*?>|<\/script>/ig, inside: Prism.languages.markup.tag.inside},
			rest: Prism.languages.javascript
		}
	}
});
Prism.languages.latex = {
	comment: /%.*?(\r?\n|$)$/m,
	string: /(\$)(\\?.)*?\1/g,
	punctuation: /[{}]/g,
	selector: /\\[a-z;,:\.]*/i
};
Prism.hooks.add("after-highlight", function (a) {
	var m = a.element.parentNode;
	if (m && /pre/i.test(m.nodeName) && -1 !== m.className.indexOf("line-numbers")) {
		var e = 1 + a.code.split("\n").length, b = Array(e);
		b = b.join("<span></span>");
		e = document.createElement("span");
		e.className = "line-numbers-rows";
		e.innerHTML = b;
		m.hasAttribute("data-start") && (m.style.counterReset = "linenumber " + (parseInt(m.getAttribute("data-start"), 10) - 1));
		a.element.appendChild(e)
	}
});
Prism.languages.TeX = {
	comment: /(?:^|[^\\])%[^%]*?$/m,
	builtin: {
		pattern: /\\[\w]+([{\[].*?[}\]](?=\s|$))*/gi,
		inside: {constant: /[\w,|\s-]+(?=[\]}])/gi, selector: /\\[\w]+/, punctuation: /[{}[\]]/gi}
	},
	regex: /(&amp;)/gi
};
Prism.languages.plain = {};
Prism.languages.markdown = {property: /([\*_]{1,2})(\w|\w[\s\w]*\w)\1/i};
Prism.languages.mediawiki = {
	important: /(\n\|-)|(^\{\|)|(\|\}$)/g,
	comment: /\n(?:((?:\||!)[^|]+)(?=[^\n]\|))|(?:\||!)\s/g
};
(function (a) {
	if (!a.observable) {
		a.observable = function (a) {
			var b = {}, d = [].slice;
			a.on = function (c, d) {
				"function" === typeof d && c.replace(/[^\s]+/g, function (a, c) {
					(b[a] = b[a] || []).push(d);
					d.typed = 0 < c
				});
				return a
			};
			a.off = function (c) {
				c.replace(/[^\s]+/g, function (a) {
					b[a] = []
				});
				"*" == c && (b = {});
				return a
			};
			a.one = function (b, d) {
				d && (d.one = !0);
				return a.on(b, d)
			};
			a.trigger = function (c) {
				for (var e = d.call(arguments, 1), k = b[c] || [], f = 0, q; q = k[f]; ++f) q.one && q.done || q.busy || (q.busy = !0, q.apply(a, q.typed ? [c].concat(e) : e), q.done = !0, q.busy =
					!1);
				return a
			};
			return a
		};
		var m = {};
		a.present = function (a, b) {
			m[a] = b
		};
		a.fn.present = function (a, b) {
			(b = m[a](this, b)) && this.data(a, b);
			return this
		}
	}
})("undefined" !== typeof exports ? exports : window.$ || (window.$ = {}));
(function (a) {
	a.present("SimpleMenu", function (m, e) {
		e = a.extend(!0, {menu_item_selector: "li", menu_item_id_attr: "id"}, e);
		var b = {};
		m = a(e.menu_item_selector, m);
		a.observable(b);
		m.mousedown(function (d) {
			1 == d.which && (d = a(this), b.trigger(d.attr(e.menu_item_id_attr), d), b.trigger("any_item_clicked", d))
		});
		return b
	})
})($);
(function (a) {
	a.present("SimpleDraggable", function (m, e) {
		function b(a) {
			p && 1 == a.which ? (p = !1, m.css({
				position: "absolute",
				"z-index": 1E3,
				top: k.top,
				left: k.left
			}), c.trigger("drag_start", a, k)) : 1 == a.which && (r.top = k.top, r.left = k.left, e.horizontal_enabled && (r.delta_x = a.pageX - f.left, r.left += a.pageX - f.left, g && (r.left = Math.max(g.left, Math.min(g.right, r.left)))), e.vertical_enabled && (r.top = a.pageY - f.top, g && (r.top = Math.max(g.top, Math.min(g.bottom, r.top)))), m.offset(r), c.trigger("drag_move", a, r));
			a.preventDefault();
			a.stopPropagation()
		}

		function d(b) {
			a(document).off("mousemove");
			a(document).off("mouseup");
			var d = b.pageX;
			g && (d = Math.max(g.left, Math.min(g.right, d)));
			d -= f.left;
			var e = {"z-index": q};
			"relative" != t && (e.position = t);
			m.css(e);
			c.trigger("drag_end", b, d)
		}

		e = a.extend(!0, {horizontal_enabled: !0, vertical_enabled: !1, bounds: null}, e);
		var c = {}, g = e.bounds, k = null, f = null, q = 0, t = "static", p = !0, r = {top: 0, left: 0, delta_x: 0};
		m.on("mousedown", function (e) {
			1 == e.which && c.can_start_drag() && (k = m.offset(), q = m.css("z-index"), t = m.css("position"),
				f = {top: e.pageY, left: e.pageX}, p = !0, a(document).on("mousemove", b).on("mouseup", d), e.preventDefault())
		});
		a.observable(c);
		c.can_start_drag = function () {
			return !0
		};
		c.setBounds = function (a) {
			g = a
		};
		return c
	})
})($);
(function (a) {
	function m(c) {
		var d = a(this);
		d.each(function () {
			var d = a(this), e = d.data("slider"), g = "object" === typeof c && c;
			e && !g && (g = {}, a.each(a.fn.slider.defaults, function (a) {
				g[a] = e[a]
			}));
			d.data("slider", new b(this, a.extend({}, a.fn.slider.defaults, g)))
		});
		return d
	}

	var e = {
			formatInvalidInputErrorMsg: function (a) {
				return "Invalid input value '" + a + "' passed in"
			},
			callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
		},
		b = function (b, d) {
			var c = this.element = a(b).hide();
			b = a(b)[0].style.width;
			var e = !1, g = this.element.parent();
			!0 === g.hasClass("slider") ? (e = !0, this.picker = g) : this.picker = a('<div class="slider"><div class="slider-track"><div class="slider-selection"></div><div class="slider-handle"></div><div class="slider-handle"></div></div><div id="tooltip" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div id="tooltip_min" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div id="tooltip_max" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>').insertBefore(this.element).append(this.element);
			if (this.id = this.element.data("slider-id") || d.id) this.picker[0].id = this.id;
			if ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch) this.touchCapable = !0;
			g = this.element.data("slider-tooltip") || d.tooltip;
			this.tooltip = this.picker.find("#tooltip");
			this.tooltipInner = this.tooltip.find("div.tooltip-inner");
			this.tooltip_min = this.picker.find("#tooltip_min");
			this.tooltipInner_min = this.tooltip_min.find("div.tooltip-inner");
			this.tooltip_max = this.picker.find("#tooltip_max");
			this.tooltipInner_max =
				this.tooltip_max.find("div.tooltip-inner");
			!0 === e && (this.picker.removeClass("slider-horizontal"), this.picker.removeClass("slider-vertical"), this.tooltip.removeClass("hide"), this.tooltip_min.removeClass("hide"), this.tooltip_max.removeClass("hide"));
			this.orientation = this.element.data("slider-orientation") || d.orientation;
			switch (this.orientation) {
				case "vertical":
					this.picker.addClass("slider-vertical");
					this.stylePos = "top";
					this.mousePos = "pageY";
					this.sizePos = "offsetHeight";
					this.tooltip.addClass("right")[0].style.left =
						"100%";
					this.tooltip_min.addClass("right")[0].style.left = "100%";
					this.tooltip_max.addClass("right")[0].style.left = "100%";
					break;
				default:
					this.picker.addClass("slider-horizontal").css("width", b), this.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this.tooltip.addClass("top")[0].style.top = -this.tooltip.outerHeight() - 24 + "px", this.tooltip_min.addClass("top")[0].style.top = -this.tooltip_min.outerHeight() - 14 + "px", this.tooltip_max.addClass("top")[0].style.top = -this.tooltip_max.outerHeight() -
						14 + "px"
			}
			var m = this;
			a.each("min max step precision value reversed handle".split(" "), function (a, b) {
				"undefined" !== typeof c.data("slider-" + b) ? m[b] = c.data("slider-" + b) : "undefined" !== typeof d[b] ? m[b] = d[b] : "undefined" !== typeof c.prop(b) ? m[b] = c.prop(b) : m[b] = 0
			});
			this.value instanceof Array ? e && !this.range ? this.value = this.value[0] : this.range = !0 : this.range && (this.value = [this.value, this.max]);
			this.selection = this.element.data("slider-selection") || d.selection;
			this.selectionEl = this.picker.find(".slider-selection");
			"none" === this.selection && this.selectionEl.addClass("hide");
			this.selectionElStyle = this.selectionEl[0].style;
			this.handle1 = this.picker.find(".slider-handle:first");
			this.handle1Stype = this.handle1[0].style;
			this.handle2 = this.picker.find(".slider-handle:last");
			this.handle2Stype = this.handle2[0].style;
			!0 === e && (this.handle1.removeClass("round triangle"), this.handle2.removeClass("round triangle hide"));
			switch (this.handle) {
				case "round":
					this.handle1.addClass("round");
					this.handle2.addClass("round");
					break;
				case "triangle":
					this.handle1.addClass("triangle"),
						this.handle2.addClass("triangle")
			}
			this.offset = this.picker.offset();
			this.size = this.picker[0][this.sizePos];
			this.formater = d.formater;
			this.tooltip_separator = d.tooltip_separator;
			this.tooltip_split = d.tooltip_split;
			this.setValue(this.value);
			this.handle1.on({keydown: a.proxy(this.keydown, this, 0)});
			this.handle2.on({keydown: a.proxy(this.keydown, this, 1)});
			if (this.touchCapable) this.picker.on({touchstart: a.proxy(this.mousedown, this)});
			this.picker.on({mousedown: a.proxy(this.mousedown, this)});
			"hide" === g ? (this.tooltip.addClass("hide"),
				this.tooltip_min.addClass("hide"), this.tooltip_max.addClass("hide")) : "always" === g ? (this.showTooltip(), this.alwaysShowTooltip = !0) : (this.picker.on({
				mouseenter: a.proxy(this.showTooltip, this),
				mouseleave: a.proxy(this.hideTooltip, this)
			}), this.handle1.on({
				focus: a.proxy(this.showTooltip, this),
				blur: a.proxy(this.hideTooltip, this)
			}), this.handle2.on({focus: a.proxy(this.showTooltip, this), blur: a.proxy(this.hideTooltip, this)}));
			(this.enabled = d.enabled && (void 0 === this.element.data("slider-enabled") || !0 === this.element.data("slider-enabled"))) ?
				this.enable() : this.disable();
			this.naturalArrowKeys = this.element.data("slider-naturalarrowkeys") || d.naturalarrowkeys
		};
	b.prototype = {
		constructor: b, over: !1, inDrag: !1, showTooltip: function () {
			!1 === this.tooltip_split ? this.tooltip.addClass("in") : (this.tooltip_min.addClass("in"), this.tooltip_max.addClass("in"));
			this.over = !0
		}, hideTooltip: function () {
			!1 === this.inDrag && !0 !== this.alwaysShowTooltip && (this.tooltip.removeClass("in"), this.tooltip_min.removeClass("in"), this.tooltip_max.removeClass("in"));
			this.over = !1
		},
		layout: function () {
			var a = this.reversed ? [100 - this.percentage[0], this.percentage[1]] : [this.percentage[0], this.percentage[1]];
			this.handle1Stype[this.stylePos] = a[0] + "%";
			this.handle2Stype[this.stylePos] = a[1] + "%";
			if ("vertical" === this.orientation) this.selectionElStyle.top = Math.min(a[0], a[1]) + "%", this.selectionElStyle.height = Math.abs(a[0] - a[1]) + "%"; else {
				this.selectionElStyle.left = Math.min(a[0], a[1]) + "%";
				this.selectionElStyle.width = Math.abs(a[0] - a[1]) + "%";
				var b = this.tooltip_min[0].getBoundingClientRect(), d =
					this.tooltip_max[0].getBoundingClientRect();
				b.right > d.left ? (this.tooltip_max.removeClass("top"), this.tooltip_max.addClass("bottom")[0].style.top = "18px") : (this.tooltip_max.removeClass("bottom"), this.tooltip_max.addClass("top")[0].style.top = "-30px")
			}
			this.range ? (this.tooltipInner.text(this.formater(this.value[0]) + this.tooltip_separator + this.formater(this.value[1])), this.tooltip[0].style[this.stylePos] = this.size * (a[0] + (a[1] - a[0]) / 2) / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() /
				2) + "px", this.tooltipInner_min.text(this.formater(this.value[0])), this.tooltipInner_max.text(this.formater(this.value[1])), this.tooltip_min[0].style[this.stylePos] = a[0] / 100 * this.size - ("vertical" === this.orientation ? this.tooltip_min.outerHeight() / 2 : this.tooltip_min.outerWidth() / 2) + "px", this.tooltip_max[0].style[this.stylePos] = a[1] / 100 * this.size - ("vertical" === this.orientation ? this.tooltip_max.outerHeight() / 2 : this.tooltip_max.outerWidth() / 2) + "px") : (this.tooltipInner.text(this.formater(this.value[0])),
				this.tooltip[0].style[this.stylePos] = this.size * a[0] / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px")
		}, mousedown: function (b) {
			if (!this.isEnabled()) return !1;
			this.touchCapable && "touchstart" === b.type && (b = b.originalEvent);
			this.triggerFocusOnHandle();
			this.offset = this.picker.offset();
			this.size = this.picker[0][this.sizePos];
			b = this.getPercentage(b);
			this.dragged = this.range ? Math.abs(this.percentage[0] - b) < Math.abs(this.percentage[1] - b) ? 0 : 1 : 0;
			this.percentage[this.dragged] =
				this.reversed ? 100 - b : b;
			this.layout();
			if (this.touchCapable) a(document).on({
				touchmove: a.proxy(this.mousemove, this),
				touchend: a.proxy(this.mouseup, this)
			});
			a(document).on({mousemove: a.proxy(this.mousemove, this), mouseup: a.proxy(this.mouseup, this)});
			this.inDrag = !0;
			b = this.calculateValue();
			this.element.trigger({type: "slideStart", value: b}).data("value", b).prop("value", b);
			this.setValue(b);
			return !0
		}, triggerFocusOnHandle: function (a) {
			0 === a && this.handle1.focus();
			1 === a && this.handle2.focus()
		}, keydown: function (a, b) {
			if (!this.isEnabled()) return !1;
			switch (b.which) {
				case 37:
				case 40:
					var c = -1;
					break;
				case 39:
				case 38:
					c = 1
			}
			if (c) return this.naturalArrowKeys && ("vertical" === this.orientation && !this.reversed || "horizontal" === this.orientation && this.reversed) && (c *= -1), b = this.percentage[a] + c * this.percentage[2], 100 < b ? b = 100 : 0 > b && (b = 0), this.dragged = a, this.adjustPercentageForRangeSliders(b), this.percentage[this.dragged] = b, this.layout(), a = this.calculateValue(), this.element.trigger({
				type: "slideStart",
				value: a
			}).data("value", a).prop("value", a), this.slide(a), this.element.trigger({
				type: "slideStop",
				value: a
			}).data("value", a).prop("value", a), !1
		}, mousemove: function (a) {
			if (!this.isEnabled()) return !1;
			this.touchCapable && "touchmove" === a.type && (a = a.originalEvent);
			a = this.getPercentage(a);
			this.adjustPercentageForRangeSliders(a);
			this.percentage[this.dragged] = this.reversed ? 100 - a : a;
			this.layout();
			a = this.calculateValue();
			this.slide(a);
			return !1
		}, slide: function (a) {
			this.setValue(a);
			this.element.trigger({
				type: "slide",
				value: this.range ? this.value : this.value[0]
			}).data("value", this.value).prop("value", this.value)
		},
		adjustPercentageForRangeSliders: function (a) {
			this.range && (0 === this.dragged && this.percentage[1] < a ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this.percentage[0] > a && (this.percentage[1] = this.percentage[0], this.dragged = 0))
		}, mouseup: function () {
			if (!this.isEnabled()) return !1;
			this.touchCapable && a(document).off({touchmove: this.mousemove, touchend: this.mouseup});
			a(document).off({mousemove: this.mousemove, mouseup: this.mouseup});
			this.inDrag = !1;
			!1 === this.over && this.hideTooltip();
			var b =
				this.calculateValue();
			this.layout();
			this.element.data("value", b).prop("value", b).trigger({type: "slideStop", value: b});
			return !1
		}, calculateValue: function () {
			if (this.range) {
				var a = [this.min, this.max];
				0 !== this.percentage[0] && (a[0] = Math.max(this.min, this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step), a[0] = this.applyPrecision(a[0]));
				100 !== this.percentage[1] && (a[1] = Math.min(this.max, this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step), a[1] = this.applyPrecision(a[1]));
				this.value = a
			} else a = this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, a < this.min ? a = this.min : a > this.max && (a = this.max), a = parseFloat(a), a = this.applyPrecision(a), this.value = [a, this.value[1]];
			return a
		}, applyPrecision: function (a) {
			var b = this.precision || this.getNumDigitsAfterDecimalPlace(this.step);
			return this.applyToFixedAndParseFloat(a, b)
		}, getNumDigitsAfterDecimalPlace: function (a) {
			return (a = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)) ? Math.max(0, (a[1] ? a[1].length : 0) - (a[2] ? +a[2] :
				0)) : 0
		}, applyToFixedAndParseFloat: function (a, b) {
			a = a.toFixed(b);
			return parseFloat(a)
		}, getPercentage: function (a) {
			!this.touchCapable || "touchstart" !== a.type && "touchmove" !== a.type || (a = a.touches[0]);
			a = 100 * (a[this.mousePos] - this.offset[this.stylePos]) / this.size;
			a = Math.round(a / this.percentage[2]) * this.percentage[2];
			return Math.max(0, Math.min(100, a))
		}, getValue: function () {
			return this.range ? this.value : this.value[0]
		}, setValue: function (a) {
			a || (a = 0);
			this.value = this.validateInputValue(a);
			this.range ? (this.value[0] =
				this.applyPrecision(this.value[0]), this.value[1] = this.applyPrecision(this.value[1]), this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = this.applyPrecision(this.value), this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.value[1] = "after" === this.selection ? this.max : this.min);
			this.diff = this.max - this.min;
			this.percentage = 0 < this.diff ? [100 * (this.value[0] - this.min) / this.diff,
				100 * (this.value[1] - this.min) / this.diff, 100 * this.step / this.diff] : [0, 0, 100];
			this.layout()
		}, validateInputValue: function (b) {
			if ("number" === typeof b) return b;
			if (b instanceof Array) return a.each(b, function (a, b) {
				if ("number" !== typeof b) throw Error(e.formatInvalidInputErrorMsg(b));
			}), b;
			throw Error(e.formatInvalidInputErrorMsg(b));
		}, destroy: function () {
			this.handle1.off();
			this.handle2.off();
			this.element.off().show().insertBefore(this.picker);
			this.picker.off().remove();
			a(this.element).removeData("slider")
		}, disable: function () {
			this.enabled =
				!1;
			this.handle1.removeAttr("tabindex");
			this.handle2.removeAttr("tabindex");
			this.picker.addClass("slider-disabled");
			this.element.trigger("slideDisabled")
		}, enable: function () {
			this.enabled = !0;
			this.handle1.attr("tabindex", 0);
			this.handle2.attr("tabindex", 0);
			this.picker.removeClass("slider-disabled");
			this.element.trigger("slideEnabled")
		}, toggle: function () {
			this.enabled ? this.disable() : this.enable()
		}, isEnabled: function () {
			return this.enabled
		}, setAttribute: function (a, b) {
			this[a] = b
		}, getAttribute: function (a) {
			return this[a]
		}
	};
	var d = {
		getValue: b.prototype.getValue,
		setValue: b.prototype.setValue,
		setAttribute: b.prototype.setAttribute,
		getAttribute: b.prototype.getAttribute,
		destroy: b.prototype.destroy,
		disable: b.prototype.disable,
		enable: b.prototype.enable,
		toggle: b.prototype.toggle,
		isEnabled: b.prototype.isEnabled
	};
	a.fn.slider = function (c) {
		if ("string" === typeof c && "refresh" !== c) {
			var g = Array.prototype.slice.call(arguments, 1);
			var k = c;
			if (d[k]) {
				var f = a(this).data("slider");
				if (!(f && f instanceof b)) throw Error(e.callingContextNotSliderInstance);
				g = d[k].apply(f, g);
				g = "undefined" === typeof g ? a(this) : g
			} else throw Error("method '" + k + "()' does not exist for slider.");
			return g
		}
		return m.call(this, c)
	};
	a.fn.slider.defaults = {
		min: 0,
		max: 10,
		step: 1,
		precision: 0,
		orientation: "horizontal",
		value: 5,
		range: !1,
		selection: "before",
		tooltip: "show",
		tooltip_separator: ":",
		tooltip_split: !1,
		handle: "round",
		reversed: !1,
		enabled: !0,
		formater: function (a) {
			return a
		}
	};
	a.fn.slider.Constructor = b
})(window.jQuery);
(function (a, m) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = m() : "function" == typeof define && define.amd ? define(m) : a.Popper = m()
})(this, function () {
	function a(a) {
		return a && "[object Function]" === {}.toString.call(a)
	}

	function m(a, b) {
		if (1 !== a.nodeType) return [];
		a = getComputedStyle(a, null);
		return b ? a[b] : a
	}

	function e(a) {
		return "HTML" === a.nodeName ? a : a.parentNode || a.host
	}

	function b(a) {
		if (!a) return document.body;
		switch (a.nodeName) {
			case "HTML":
			case "BODY":
				return a.ownerDocument.body;
			case "#document":
				return a.body
		}
		var c =
			m(a);
		return /(auto|scroll|overlay)/.test(c.overflow + c.overflowY + c.overflowX) ? a : b(e(a))
	}

	function d(a) {
		return 11 === a ? n : 10 === a ? W : n || W
	}

	function c(a) {
		if (!a) return document.documentElement;
		for (var b = d(10) ? document.body : null, e = a.offsetParent; e === b && a.nextElementSibling;) e = (a = a.nextElementSibling).offsetParent;
		return (b = e && e.nodeName) && "BODY" !== b && "HTML" !== b ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) && "static" === m(e, "position") ? c(e) : e : a ? a.ownerDocument.documentElement : document.documentElement
	}

	function g(a) {
		return null ===
		a.parentNode ? a : g(a.parentNode)
	}

	function k(a, b) {
		if (!(a && a.nodeType && b && b.nodeType)) return document.documentElement;
		var d = a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING, e = d ? a : b;
		d = d ? b : a;
		var h = document.createRange();
		h.setStart(e, 0);
		h.setEnd(d, 0);
		h = h.commonAncestorContainer;
		if (a !== h && b !== h || e.contains(d)) return a = h.nodeName, "BODY" === a || "HTML" !== a && c(h.firstElementChild) !== h ? c(h) : h;
		e = g(a);
		return e.host ? k(e.host, b) : k(a, g(b).host)
	}

	function f(a) {
		var b = "top" === (1 < arguments.length && void 0 !== arguments[1] ?
			arguments[1] : "top") ? "scrollTop" : "scrollLeft", c = a.nodeName;
		return "BODY" === c || "HTML" === c ? (c = a.ownerDocument.documentElement, (a.ownerDocument.scrollingElement || c)[b]) : a[b]
	}

	function q(a, b) {
		var c = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], d = f(b, "top"), e = f(b, "left");
		c = c ? -1 : 1;
		return a.top += d * c, a.bottom += d * c, a.left += e * c, a.right += e * c, a
	}

	function t(a, b) {
		b = "x" === b ? "Left" : "Top";
		var c = "Left" == b ? "Right" : "Bottom";
		return parseFloat(a["border" + b + "Width"], 10) + parseFloat(a["border" + c + "Width"], 10)
	}

	function p(a,
						 b, c, e) {
		return N(b["offset" + a], b["scroll" + a], c["client" + a], c["offset" + a], c["scroll" + a], d(10) ? c["offset" + a] + e["margin" + ("Height" === a ? "Top" : "Left")] + e["margin" + ("Height" === a ? "Bottom" : "Right")] : 0)
	}

	function r() {
		var a = document.body, b = document.documentElement, c = d(10) && getComputedStyle(b);
		return {height: p("Height", a, b, c), width: p("Width", a, b, c)}
	}

	function u(a) {
		return h({}, a, {right: a.left + a.width, bottom: a.top + a.height})
	}

	function w(a) {
		var b = {};
		try {
			if (d(10)) {
				b = a.getBoundingClientRect();
				var c = f(a, "top"), e = f(a, "left");
				b.top += c;
				b.left += e;
				b.bottom += c;
				b.right += e
			} else b = a.getBoundingClientRect()
		} catch (Ba) {
		}
		b = {left: b.left, top: b.top, width: b.right - b.left, height: b.bottom - b.top};
		e = "HTML" === a.nodeName ? r() : {};
		c = a.offsetWidth - (e.width || a.clientWidth || b.right - b.left);
		e = a.offsetHeight - (e.height || a.clientHeight || b.bottom - b.top);
		if (c || e) a = m(a), c -= t(a, "x"), e -= t(a, "y"), b.width -= c, b.height -= e;
		return u(b)
	}

	function A(a, c) {
		var e = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], h = d(10), f = "HTML" === c.nodeName,
			g = w(a), k = w(c), n = b(a),
			p = m(c), r = parseFloat(p.borderTopWidth, 10), t = parseFloat(p.borderLeftWidth, 10);
		e && "HTML" === c.nodeName && (k.top = N(k.top, 0), k.left = N(k.left, 0));
		g = u({top: g.top - k.top - r, left: g.left - k.left - t, width: g.width, height: g.height});
		if (g.marginTop = 0, g.marginLeft = 0, !h && f) f = parseFloat(p.marginTop, 10), p = parseFloat(p.marginLeft, 10), g.top -= r - f, g.bottom -= r - f, g.left -= t - p, g.right -= t - p, g.marginTop = f, g.marginLeft = p;
		return (h && !e ? c.contains(n) : c === n && "BODY" !== n.nodeName) && (g = q(g, c)), g
	}

	function v(a) {
		var b = 1 < arguments.length && void 0 !==
			arguments[1] && arguments[1], c = a.ownerDocument.documentElement, d = A(a, c),
			e = N(c.clientWidth, window.innerWidth || 0), h = N(c.clientHeight, window.innerHeight || 0), g = b ? 0 : f(c);
		b = b ? 0 : f(c, "left");
		return u({top: g - d.top + d.marginTop, left: b - d.left + d.marginLeft, width: e, height: h})
	}

	function B(a) {
		var b = a.nodeName;
		return "BODY" === b || "HTML" === b ? !1 : "fixed" === m(a, "position") || B(e(a))
	}

	function x(a) {
		if (!a || !a.parentElement || d()) return document.documentElement;
		for (a = a.parentElement; a && "none" === m(a, "transform");) a = a.parentElement;
		return a || document.documentElement
	}

	function y(a, c, d, h) {
		var f = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], g = {top: 0, left: 0},
			n = f ? x(a) : k(a, c);
		if ("viewport" === h) g = v(n, f); else {
			var p;
			"scrollParent" === h ? (p = b(e(c)), "BODY" === p.nodeName && (p = a.ownerDocument.documentElement)) : "window" === h ? p = a.ownerDocument.documentElement : p = h;
			f = A(p, n, f);
			"HTML" !== p.nodeName || B(n) ? g = f : (p = r(), n = p.height, p = p.width, g.top += f.top - f.marginTop, g.bottom = n + f.top, g.left += f.left - f.marginLeft, g.right = p + f.left)
		}
		return g.left += d,
			g.top += d, g.right -= d, g.bottom -= d, g
	}

	function E(a, b, c, d, e) {
		var f = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
		if (-1 === a.indexOf("auto")) return a;
		f = y(c, d, f, e);
		var g = {
			top: {width: f.width, height: b.top - f.top},
			right: {width: f.right - b.right, height: f.height},
			bottom: {width: f.width, height: f.bottom - b.bottom},
			left: {width: b.left - f.left, height: f.height}
		};
		f = Object.keys(g).map(function (a) {
			var b = g[a];
			return h({key: a}, g[a], {area: b.width * b.height})
		}).sort(function (a, b) {
			return b.area - a.area
		});
		var k = f.filter(function (a) {
			var b =
				a.height;
			return a.width >= c.clientWidth && b >= c.clientHeight
		});
		f = 0 < k.length ? k[0].key : f[0].key;
		k = a.split("-")[1];
		return f + (k ? "-" + k : "")
	}

	function O(a, b, c) {
		var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, e = d ? x(b) : k(b, c);
		return A(c, e, d)
	}

	function X(a) {
		var b = getComputedStyle(a), c = parseFloat(b.marginTop) + parseFloat(b.marginBottom);
		b = parseFloat(b.marginLeft) + parseFloat(b.marginRight);
		return {width: a.offsetWidth + b, height: a.offsetHeight + c}
	}

	function G(a) {
		var b = {
			left: "right", right: "left", bottom: "top",
			top: "bottom"
		};
		return a.replace(/left|right|bottom|top/g, function (a) {
			return b[a]
		})
	}

	function T(a, b, c) {
		c = c.split("-")[0];
		a = X(a);
		var d = {width: a.width, height: a.height}, e = -1 !== ["right", "left"].indexOf(c), h = e ? "top" : "left",
			f = e ? "left" : "top", g = e ? "height" : "width";
		return d[h] = b[h] + b[g] / 2 - a[g] / 2, d[f] = c === f ? b[f] - a[e ? "width" : "height"] : b[G(f)], d
	}

	function M(a, b) {
		return Array.prototype.find ? a.find(b) : a.filter(b)[0]
	}

	function Q(a, b, c) {
		if (Array.prototype.findIndex) return a.findIndex(function (a) {
			return a[b] === c
		});
		var d =
			M(a, function (a) {
				return a[b] === c
			});
		return a.indexOf(d)
	}

	function K(b, c, d) {
		return (void 0 === d ? b : b.slice(0, Q(b, "name", d))).forEach(function (b) {
			b["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
			var d = b["function"] || b.fn;
			b.enabled && a(d) && (c.offsets.popper = u(c.offsets.popper), c.offsets.reference = u(c.offsets.reference), c = d(c, b))
		}), c
	}

	function da(a, b) {
		return a.some(function (a) {
			var c = a.name;
			return a.enabled && c === b
		})
	}

	function C(a) {
		for (var b = [!1, "ms", "Webkit", "Moz", "O"], c = a.charAt(0).toUpperCase() +
			a.slice(1), d = 0; d < b.length; d++) {
			var e = b[d];
			e = e ? "" + e + c : a;
			if ("undefined" != typeof document.body.style[e]) return e
		}
		return null
	}

	function P(a) {
		return (a = a.ownerDocument) ? a.defaultView : window
	}

	function I(a, c, d, e) {
		var h = "BODY" === a.nodeName;
		a = h ? a.ownerDocument.defaultView : a;
		a.addEventListener(c, d, {passive: !0});
		h || I(b(a.parentNode), c, d, e);
		e.push(a)
	}

	function ca(a, b) {
		return P(a).removeEventListener("resize", b.updateBound), b.scrollParents.forEach(function (a) {
			a.removeEventListener("scroll", b.updateBound)
		}), b.updateBound =
			null, b.scrollParents = [], b.scrollElement = null, b.eventsEnabled = !1, b
	}

	function aa(a) {
		return "" !== a && !isNaN(parseFloat(a)) && isFinite(a)
	}

	function ka(a, b) {
		Object.keys(b).forEach(function (c) {
			var d = "";
			-1 !== "width height top right bottom left".split(" ").indexOf(c) && aa(b[c]) && (d = "px");
			a.style[c] = b[c] + d
		})
	}

	function ea(a, b) {
		Object.keys(b).forEach(function (c) {
			!1 === b[c] ? a.removeAttribute(c) : a.setAttribute(c, b[c])
		})
	}

	function oa(a, b, c) {
		var d = M(a, function (a) {
			return a.name === b
		});
		a = !!d && a.some(function (a) {
			return a.name ===
				c && a.enabled && a.order < d.order
		});
		if (!a) {
			var e = "`" + b + "`";
			console.warn("`" + c + "` modifier is required by " + e + " modifier in order to work, be sure to include it before " + e + "!")
		}
		return a
	}

	function ha(a) {
		var b = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], c = ra.indexOf(a);
		c = ra.slice(c + 1).concat(ra.slice(0, c));
		return b ? c.reverse() : c
	}

	function ma(a, b, c, d) {
		var e = [0, 0], h = -1 !== ["right", "left"].indexOf(d);
		a = a.split(/(\+|\-)/).map(function (a) {
			return a.trim()
		});
		d = a.indexOf(M(a, function (a) {
			return -1 !== a.search(/,|\s/)
		}));
		a[d] && -1 === a[d].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
		var f = /\s*,\s*|\s+/;
		a = -1 === d ? [a] : [a.slice(0, d).concat([a[d].split(f)[0]]), [a[d].split(f)[1]].concat(a.slice(d + 1))];
		return a = a.map(function (a, d) {
			var e = (1 === d ? !h : h) ? "height" : "width", f = !1;
			return a.reduce(function (a, b) {
				return "" === a[a.length - 1] && -1 !== ["+", "-"].indexOf(b) ? (a[a.length - 1] = b, f = !0, a) : f ? (a[a.length - 1] += b, f = !1, a) : a.concat(b)
			}, []).map(function (a) {
				var d = a.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
				var h = +d[1];
				d = d[2];
				if (h) if (0 === d.indexOf("%")) {
					switch (d) {
						case "%p":
							var f = b;
							break;
						default:
							f = c
					}
					h *= u(f)[e] / 100
				} else {
					if ("vh" === d || "vw" === d) h = (f = "vh" === d ? N(document.documentElement.clientHeight, window.innerHeight || 0) : N(document.documentElement.clientWidth, window.innerWidth || 0), f / 100 * h)
				} else h = a;
				return h
			})
		}), a.forEach(function (a, b) {
			a.forEach(function (c, d) {
				aa(c) && (e[b] += c * ("-" === a[d - 1] ? -1 : 1))
			})
		}), e
	}

	for (var R = Math.min, J = Math.round, U = Math.floor, N = Math.max, fa = "undefined" != typeof window && "undefined" != typeof document,
				 S = ["Edge", "Trident", "Firefox"], pa = 0, ia = 0; ia < S.length; ia += 1) if (fa && 0 <= navigator.userAgent.indexOf(S[ia])) {
		pa = 1;
		break
	}
	var Y = fa && window.Promise ? function (a) {
			var b = !1;
			return function () {
				b || (b = !0, window.Promise.resolve().then(function () {
					b = !1;
					a()
				}))
			}
		} : function (a) {
			var b = !1;
			return function () {
				b || (b = !0, setTimeout(function () {
					b = !1;
					a()
				}, pa))
			}
		}, n = fa && !(!window.MSInputMethodContext || !document.documentMode), W = fa && /MSIE 10/.test(navigator.userAgent),
		V = function () {
			function a(a, b) {
				for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable =
					c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c)
			}

			return function (b, c, d) {
				return c && a(b.prototype, c), d && a(b, d), b
			}
		}(), D = function (a, b, c) {
			return b in a ? Object.defineProperty(a, b, {
				value: c,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : a[b] = c, a
		}, h = Object.assign || function (a) {
			for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
			return a
		};
	fa = "auto-start auto auto-end top-start top top-end right-start right right-end bottom-end bottom bottom-start left-end left left-start".split(" ");
	var ra = fa.slice(3);
	S = function () {
		function c(b, d) {
			var e = this, f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
			if (!(this instanceof c)) throw new TypeError("Cannot call a class as a function");
			this.scheduleUpdate = function () {
				return requestAnimationFrame(e.update)
			};
			this.update = Y(this.update.bind(this));
			this.options = h({}, c.Defaults, f);
			this.state = {isDestroyed: !1, isCreated: !1, scrollParents: []};
			this.reference = b && b.jquery ? b[0] : b;
			this.popper = d && d.jquery ? d[0] : d;
			this.options.modifiers = {};
			Object.keys(h({},
				c.Defaults.modifiers, f.modifiers)).forEach(function (a) {
				e.options.modifiers[a] = h({}, c.Defaults.modifiers[a] || {}, f.modifiers ? f.modifiers[a] : {})
			});
			this.modifiers = Object.keys(this.options.modifiers).map(function (a) {
				return h({name: a}, e.options.modifiers[a])
			}).sort(function (a, b) {
				return a.order - b.order
			});
			this.modifiers.forEach(function (b) {
				b.enabled && a(b.onLoad) && b.onLoad(e.reference, e.popper, e.options, b, e.state)
			});
			this.update();
			var g = this.options.eventsEnabled;
			g && this.enableEventListeners();
			this.state.eventsEnabled =
				g
		}

		return V(c, [{
			key: "update", value: function () {
				if (!this.state.isDestroyed) {
					var a = {instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {}};
					a.offsets.reference = O(this.state, this.popper, this.reference, this.options.positionFixed);
					a.placement = E(this.options.placement, a.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
					a.originalPlacement = a.placement;
					a.positionFixed = this.options.positionFixed;
					a.offsets.popper =
						T(this.popper, a.offsets.reference, a.placement);
					a.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute";
					a = K(this.modifiers, a);
					this.state.isCreated ? this.options.onUpdate(a) : (this.state.isCreated = !0, this.options.onCreate(a))
				}
			}
		}, {
			key: "destroy", value: function () {
				return this.state.isDestroyed = !0, da(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom =
					"", this.popper.style.willChange = "", this.popper.style[C("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
			}
		}, {
			key: "enableEventListeners", value: function () {
				if (!this.state.eventsEnabled) {
					var a = this.reference, c = this.state;
					c.updateBound = this.scheduleUpdate;
					P(a).addEventListener("resize", c.updateBound, {passive: !0});
					a = b(a);
					this.state = (I(a, "scroll", c.updateBound, c.scrollParents), c.scrollElement = a, c.eventsEnabled = !0, c)
				}
			}
		}, {
			key: "disableEventListeners",
			value: function () {
				this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = ca(this.reference, this.state))
			}
		}]), c
	}();
	return S.Utils = ("undefined" == typeof window ? global : window).PopperUtils, S.placements = fa, S.Defaults = {
		placement: "bottom", positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function () {
		}, onUpdate: function () {
		}, modifiers: {
			shift: {
				order: 100, enabled: !0, fn: function (a) {
					var b = a.placement, c = b.split("-")[0];
					if (b = b.split("-")[1]) {
						var d = a.offsets, e = d.reference;
						d = d.popper;
						var f = -1 !== ["bottom", "top"].indexOf(c);
						c = f ? "left" : "top";
						f = f ? "width" : "height";
						e = {start: D({}, c, e[c]), end: D({}, c, e[c] + e[f] - d[f])};
						a.offsets.popper = h({}, d, e[b])
					}
					return a
				}
			}, offset: {
				order: 200, enabled: !0, fn: function (a, b) {
					var c;
					b = b.offset;
					var d = a.offsets, e = d.popper;
					d = d.reference;
					var h = a.placement.split("-")[0];
					return c = aa(+b) ? [+b, 0] : ma(b, e, d, h), "left" === h ? (e.top += c[0], e.left -= c[1]) : "right" === h ? (e.top += c[0], e.left += c[1]) : "top" === h ? (e.left += c[0], e.top -= c[1]) : "bottom" === h && (e.left += c[0], e.top += c[1]), a.popper =
						e, a
				}, offset: 0
			}, preventOverflow: {
				order: 300, enabled: !0, fn: function (a, b) {
					var d = b.boundariesElement || c(a.instance.popper);
					a.instance.reference === d && (d = c(d));
					var e = C("transform"), f = a.instance.popper.style, g = f.top, k = f.left, p = f[e];
					f.top = "";
					f.left = "";
					f[e] = "";
					var n = y(a.instance.popper, a.instance.reference, b.padding, d, a.positionFixed);
					f.top = g;
					f.left = k;
					f[e] = p;
					b.boundaries = n;
					var q = a.offsets.popper, r = {
						primary: function (a) {
							var c = q[a];
							return q[a] < n[a] && !b.escapeWithReference && (c = N(q[a], n[a])), D({}, a, c)
						}, secondary: function (a) {
							var c =
								"right" === a ? "left" : "top", d = q[c];
							return q[a] > n[a] && !b.escapeWithReference && (d = R(q[c], n[a] - ("right" === a ? q.width : q.height))), D({}, c, d)
						}
					};
					return b.priority.forEach(function (a) {
						var b = -1 === ["left", "top"].indexOf(a) ? "secondary" : "primary";
						q = h({}, q, r[b](a))
					}), a.offsets.popper = q, a
				}, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent"
			}, keepTogether: {
				order: 400, enabled: !0, fn: function (a) {
					var b = a.offsets, c = b.popper;
					b = b.reference;
					var d = a.placement.split("-")[0], e = -1 !== ["top", "bottom"].indexOf(d);
					d = e ? "right" : "bottom";
					var h = e ? "left" : "top";
					e = e ? "width" : "height";
					return c[d] < U(b[h]) && (a.offsets.popper[h] = U(b[h]) - c[e]), c[h] > U(b[d]) && (a.offsets.popper[h] = U(b[d])), a
				}
			}, arrow: {
				order: 500, enabled: !0, fn: function (a, b) {
					var c;
					if (!oa(a.instance.modifiers, "arrow", "keepTogether")) return a;
					b = b.element;
					if ("string" == typeof b) {
						if (b = a.instance.popper.querySelector(b), !b) return a
					} else if (!a.instance.popper.contains(b)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), a;
					var d = a.placement.split("-")[0],
						e = a.offsets, h = e.popper, f = e.reference, g = -1 !== ["left", "right"].indexOf(d);
					d = g ? "height" : "width";
					var k = g ? "Top" : "Left";
					e = k.toLowerCase();
					var p = g ? "left" : "top", n = g ? "bottom" : "right";
					g = X(b)[d];
					f[n] - g < h[e] && (a.offsets.popper[e] -= h[e] - (f[n] - g));
					f[e] + g > h[n] && (a.offsets.popper[e] += f[e] + g - h[n]);
					a.offsets.popper = u(a.offsets.popper);
					f = f[e] + f[d] / 2 - g / 2;
					var q = m(a.instance.popper);
					n = parseFloat(q["margin" + k], 10);
					k = parseFloat(q["border" + k + "Width"], 10);
					k = f - a.offsets.popper[e] - n - k;
					return k = N(R(h[d] - g, k), 0), a.arrowElement =
						b, a.offsets.arrow = (c = {}, D(c, e, J(k)), D(c, p, ""), c), a
				}, element: "[x-arrow]"
			}, flip: {
				order: 600, enabled: !0, fn: function (a, b) {
					if (da(a.instance.modifiers, "inner") || a.flipped && a.placement === a.originalPlacement) return a;
					var c = y(a.instance.popper, a.instance.reference, b.padding, b.boundariesElement, a.positionFixed),
						d = a.placement.split("-")[0], e = G(d), f = a.placement.split("-")[1] || "", g = [];
					switch (b.behavior) {
						case "flip":
							g = [d, e];
							break;
						case "clockwise":
							g = ha(d);
							break;
						case "counterclockwise":
							g = ha(d, !0);
							break;
						default:
							g =
								b.behavior
					}
					return g.forEach(function (k, n) {
						if (d !== k || g.length === n + 1) return a;
						d = a.placement.split("-")[0];
						e = G(d);
						var p = a.offsets.popper;
						k = a.offsets.reference;
						k = "left" === d && U(p.right) > U(k.left) || "right" === d && U(p.left) < U(k.right) || "top" === d && U(p.bottom) > U(k.top) || "bottom" === d && U(p.top) < U(k.bottom);
						var q = U(p.left) < U(c.left), r = U(p.right) > U(c.right), m = U(p.top) < U(c.top),
							t = U(p.bottom) > U(c.bottom);
						p = "left" === d && q || "right" === d && r || "top" === d && m || "bottom" === d && t;
						var u = -1 !== ["top", "bottom"].indexOf(d);
						q = !!b.flipVariations &&
							(u && "start" === f && q || u && "end" === f && r || !u && "start" === f && m || !u && "end" === f && t);
						(k || p || q) && (a.flipped = !0, (k || p) && (d = g[n + 1]), q && (f = "end" === f ? "start" : "start" === f ? "end" : f), a.placement = d + (f ? "-" + f : ""), a.offsets.popper = h({}, a.offsets.popper, T(a.instance.popper, a.offsets.reference, a.placement)), a = K(a.instance.modifiers, a, "flip"))
					}), a
				}, behavior: "flip", padding: 5, boundariesElement: "viewport"
			}, inner: {
				order: 700, enabled: !1, fn: function (a) {
					var b = a.placement, c = b.split("-")[0], d = a.offsets, e = d.popper;
					d = d.reference;
					var h =
						-1 !== ["left", "right"].indexOf(c), f = -1 === ["top", "left"].indexOf(c);
					return e[h ? "left" : "top"] = d[c] - (f ? e[h ? "width" : "height"] : 0), a.placement = G(b), a.offsets.popper = u(e), a
				}
			}, hide: {
				order: 800, enabled: !0, fn: function (a) {
					if (!oa(a.instance.modifiers, "hide", "preventOverflow")) return a;
					var b = a.offsets.reference, c = M(a.instance.modifiers, function (a) {
						return "preventOverflow" === a.name
					}).boundaries;
					if (b.bottom < c.top || b.left > c.right || b.top > c.bottom || b.right < c.left) {
						if (!0 === a.hide) return a;
						a.hide = !0;
						a.attributes["x-out-of-boundaries"] =
							""
					} else {
						if (!1 === a.hide) return a;
						a.hide = !1;
						a.attributes["x-out-of-boundaries"] = !1
					}
					return a
				}
			}, computeStyle: {
				order: 850, enabled: !0, fn: function (a, b) {
					var d = b.x, e = b.y, f = a.offsets.popper, g = M(a.instance.modifiers, function (a) {
						return "applyStyle" === a.name
					}).gpuAcceleration;
					void 0 !== g && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
					b = void 0 === g ? b.gpuAcceleration : g;
					g = c(a.instance.popper);
					var k = w(g);
					g = {position: f.position};
					var p = U(f.left);
					var n = J(f.top);
					var q = J(f.bottom);
					f = U(f.right);
					d = "bottom" === d ? "top" : "bottom";
					e = "right" === e ? "left" : "right";
					var r = C("transform");
					(n = "bottom" == d ? -k.height + q : n, k = "right" == e ? -k.width + f : p, b && r) ? (g[r] = "translate3d(" + k + "px, " + n + "px, 0)", g[d] = 0, g[e] = 0, g.willChange = "transform") : (g[d] = n * ("bottom" == d ? -1 : 1), g[e] = k * ("right" == e ? -1 : 1), g.willChange = d + ", " + e);
					return a.attributes = h({}, {"x-placement": a.placement}, a.attributes), a.styles = h({}, g, a.styles), a.arrowStyles = h({}, a.offsets.arrow, a.arrowStyles),
						a
				}, gpuAcceleration: !0, x: "bottom", y: "right"
			}, applyStyle: {
				order: 900, enabled: !0, fn: function (a) {
					return ka(a.instance.popper, a.styles), ea(a.instance.popper, a.attributes), a.arrowElement && Object.keys(a.arrowStyles).length && ka(a.arrowElement, a.arrowStyles), a
				}, onLoad: function (a, b, c, d, e) {
					d = O(e, b, a, c.positionFixed);
					a = E(c.placement, d, b, a, c.modifiers.flip.boundariesElement, c.modifiers.flip.padding);
					return b.setAttribute("x-placement", a), ka(b, {position: c.positionFixed ? "fixed" : "absolute"}), c
				}, gpuAcceleration: void 0
			}
		}
	},
		S
});
var hyperapp = function () {
	function a(b) {
		$jscomp.initSymbol();
		$jscomp.initSymbol();
		$jscomp.initSymbolIterator();
		a = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (a) {
			return typeof a
		} : function (a) {
			$jscomp.initSymbol();
			$jscomp.initSymbol();
			$jscomp.initSymbol();
			return a && "function" === typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
		};
		return a(b)
	}

	var m = {}, e = {}, b = [], d = b.map, c = Array.isArray,
		g = "undefined" !== typeof requestAnimationFrame ? requestAnimationFrame :
			setTimeout, k = function T(a) {
			var b = "";
			if ("string" === typeof a) return a;
			if (c(a) && 0 < a.length) for (var d = 0, e; d < a.length; d++) "" !== (e = T(a[d])) && (b += (b && " ") + e); else for (d in a) a[d] && (b += (b && " ") + d);
			return b
		}, f = function (a, b) {
			var c = {}, d;
			for (d in a) c[d] = a[d];
			for (d in b) c[d] = b[d];
			return c
		}, q = function M(a) {
			return a.reduce(function (a, b) {
				return a.concat(b && !0 !== b ? "function" === typeof b[0] ? [b] : M(b) : 0)
			}, b)
		}, t = function (a, b) {
			if (a !== b) for (var d in f(a, b)) {
				var e;
				if (e = a[d] !== b[d]) {
					e = a[d];
					var g = b[d];
					e = !(c(e) && c(g) && e[0] ===
						g[0] && "function" === typeof e[0])
				}
				if (e) return !0;
				b[d] = a[d]
			}
		}, p = function (a, b, c, d, e, g) {
			if ("key" !== b) if ("style" === b) for (var p in f(c, d)) c = null == d || null == d[p] ? "" : d[p], "-" === p[0] ? a[b].setProperty(p, c) : a[b][p] = c; else "o" === b[0] && "n" === b[1] ? ((a.actions || (a.actions = {}))[b = b.slice(2).toLowerCase()] = d) ? c || a.addEventListener(b, e) : a.removeEventListener(b, e) : !g && "list" !== b && b in a ? a[b] = null == d ? "" : d : null == d || !1 === d || "class" === b && !(d = k(d)) ? a.removeAttribute(b) : a.setAttribute(b, d)
		}, r = function da(a, b, c) {
			var d = a.props,
				e = 3 === a.type ? document.createTextNode(a.name) : (c = c || "svg" === a.name) ? document.createElementNS("http://www.w3.org/2000/svg", a.name, {is: d.is}) : document.createElement(a.name, {is: d.is}),
				f;
			for (f in d) p(e, f, null, d[f], b, c);
			d = 0;
			for (f = a.children.length; d < f; d++) e.appendChild(da(a.children[d] = A(a.children[d]), b, c));
			return a.node = e
		}, u = function (a) {
			return null == a ? null : a.key
		}, w = function ca(a, b, c, d, e, g) {
			if (c !== d) if (null != c && 3 === c.type && 3 === d.type) c.name !== d.name && (b.nodeValue = d.name); else if (null == c || c.name !== d.name) b =
				a.insertBefore(r(d = A(d), e, g), b), null != c && a.removeChild(c.node); else {
				var k, q;
				var m = c.props;
				var t = d.props;
				a = c.children;
				var w = d.children, v = 0, B = 0, x = a.length - 1, C = w.length - 1;
				g = g || "svg" === d.name;
				for (var K in f(m, t)) ("value" === K || "selected" === K || "checked" === K ? b[K] : m[K]) !== t[K] && p(b, K, m[K], t[K], e, g);
				for (; B <= C && v <= x && null != (k = u(a[v])) && k === u(w[B]);) ca(b, a[v].node, a[v], w[B] = A(w[B++], a[v++]), e, g);
				for (; B <= C && v <= x && null != (k = u(a[x])) && k === u(w[C]);) ca(b, a[x].node, a[x], w[C] = A(w[C--], a[x--]), e, g);
				if (v > x) for (; B <= C;) b.insertBefore(r(w[B] =
					A(w[B++]), e, g), (q = a[v]) && q.node); else if (B > C) for (; v <= x;) b.removeChild(a[v++].node); else {
					K = v;
					t = {};
					for (var y = {}; K <= x; K++) null != (k = a[K].key) && (t[k] = a[K]);
					for (; B <= C;) k = u(q = a[v]), m = u(w[B] = A(w[B], q)), y[k] || null != m && m === u(a[v + 1]) ? (null == k && b.removeChild(q.node), v++) : null == m || 1 === c.type ? (null == k && (ca(b, q && q.node, q, w[B], e, g), B++), v++) : (k === m ? (ca(b, q.node, q, w[B], e, g), y[m] = !0, v++) : null != (k = t[m]) ? (ca(b, b.insertBefore(k.node, q && q.node), k, w[B], e, g), y[m] = !0) : ca(b, q && q.node, null, w[B], e, g), B++);
					for (; v <= x;) null == u(q =
						a[v++]) && b.removeChild(q.node);
					for (K in t) null == y[K] && b.removeChild(t[K].node)
				}
			}
			return d.node = b
		}, A = function (a, b) {
			if (2 === a.type) {
				var c;
				if (!(c = !b)) a:{
					c = b.lazy;
					var d = a.lazy, e;
					for (e in c) if (c[e] !== d[e]) {
						c = !0;
						break a
					}
					for (e in d) if (c[e] !== d[e]) {
						c = !0;
						break a
					}
					c = void 0
				}
				a = (c && ((b = a.lazy.view(a.lazy)).lazy = a.lazy), b)
			}
			return a
		}, v = function (a, b, c, d, e, f) {
			return {name: a, props: b, children: c, node: d, type: f, key: e}
		}, B = function da(a) {
			return 3 === a.nodeType ? v(a.nodeValue, e, b, a, void 0, 3) : v(a.nodeName.toLowerCase(), e, d.call(a.childNodes,
				da), a, void 0, 1)
		};
	m.Lazy = function (a) {
		return {lazy: a, type: 2}
	};
	m.h = function (d, f) {
		for (var g, k = [], p = [], q = arguments.length; 2 < q--;) k.push(arguments[q]);
		for (; 0 < k.length;) if (c(g = k.pop())) for (q = g.length; 0 < q--;) k.push(g[q]); else !1 !== g && !0 !== g && null != g && p.push("object" === a(g) ? g : v(g, e, b, void 0, void 0, 3));
		f = f || e;
		return "function" === typeof d ? d(f, p) : v(d, f, p, void 0, f.key)
	};
	m.app = function (a) {
		var d = {}, f = !1, k = a.view, p = a.node, r = p && B(p), m = a.subscriptions, u = [], A = function (a) {
			y(this.actions[a.type], a)
		}, x = function (a) {
			if (d !==
				a) {
				d = a;
				if (m) {
					a = u;
					for (var b = q([m(d)]), c = y, e = 0, p, r, w = []; e < a.length || e < b.length; e++) p = a[e], r = b[e], w.push(r ? !p || r[0] !== p[0] || t(r[1], p[1]) ? [r[0], r[1], r[0](c, r[1]), p && p[2]()] : p : p && p[2]());
					u = w
				}
				k && !f && g(K, f = !0)
			}
			return d
		}, y = (a.middleware || function (a) {
			return a
		})(function (a, b) {
			return "function" === typeof a ? y(a(d, b)) : c(a) ? "function" === typeof a[0] ? y(a[0], "function" === typeof a[1] ? a[1](b) : a[1]) : (q(a.slice(1)).map(function (a) {
				a && a[0](y, a[1])
			}, x(a[0])), d) : x(a)
		}), K = function () {
			f = !1;
			p = w(p.parentNode, p, r, r = "string" === typeof (r =
				k(d)) ? v(r, e, b, void 0, void 0, 3) : r, A)
		};
		y(a.init)
	};
	var x = function (a, b) {
		return function (a) {
			return function (b) {
				return [a, {action: b}]
			}
		}(function (c, d) {
			var e = function (a) {
				c(d.action, a)
			};
			addEventListener(a, e, b || !1);
			return function () {
				removeEventListener(a, e)
			}
		})
	}, y = function (a) {
		return function (b) {
			return [a, {action: b}]
		}
	}(function (a, b) {
		var c = requestAnimationFrame(function ca(d) {
			c = requestAnimationFrame(ca);
			a(b.action, d)
		});
		return function () {
			cancelAnimationFrame(c)
		}
	});
	m.onAnimationFrame = y;
	y = x("mouseup");
	m.onMouseUp =
		y;
	y = x("mousedown");
	m.onMouseDown = y;
	y = x("mouseenter");
	m.onMouseEnter = y;
	y = x("mouseleave");
	m.onMouseLeave = y;
	y = x("mousemove");
	m.onMouseMove = y;
	y = x("mouseover");
	m.onMouseOver = y;
	y = x("mouseout");
	m.onMouseOut = y;
	y = x("touchstart");
	m.onTouchStart = y;
	y = x("touchmove");
	m.onTouchMove = y;
	y = x("touchend");
	m.onTouchEnd = y;
	y = x("keydown");
	m.onKeyDown = y;
	var E = x("keydown", !0);
	m.onKeyDownCaptured = E;
	x("keydown");
	m.onKeyDown = y;
	y = x("keyup");
	m.onKeyUp = y;
	y = x("focus");
	m.onFocus = y;
	x = x("blur");
	m.onBlur = x;
	var O = function (a) {
		return function (b) {
			return [a,
				b]
		}
	}(function (a, b) {
		b.preventDefault && b.event.preventDefault();
		b.stopPropagation && b.event.stopPropagation();
		void 0 != b.action && a(b.action, b.event)
	});
	m.eventOptions = O;
	m.preventDefault = function (a) {
		return function (b, c) {
			return [b, O({preventDefault: !0, action: a, event: c})]
		}
	};
	m.stopPropagation = function (a) {
		return function (b, c) {
			return [b, O({stopPropagation: !0, action: a, event: c})]
		}
	};
	m.eventKey = function (a) {
		return a.key
	};
	m.targetValue = function (a) {
		return a.target.value
	};
	m.targetChecked = function (a) {
		return a.target.checked
	};
	x = function (a) {
		return function (b, c) {
			return [a, {action: b, delay: c.delay}]
		}
	};
	y = x(function (a, b) {
		setTimeout(function () {
			a(b.action)
		}, b.delay)
	});
	m.timeout = y;
	x = x(function (a, b) {
		var c = setInterval(function () {
			a(b.action, Date.now())
		}, b.delay);
		return function () {
			clearInterval(c)
		}
	});
	m.interval = x;
	x = function (a) {
		return function (b) {
			return [a, b]
		}
	}(function (a, b) {
		var c = b.action, d = b.expect || "text";
		return fetch(b.url, b.options || {}).then(function (a) {
			if (!a.ok) throw a;
			return a
		}).then(function (a) {
			return a[d]()
		}).then(function (b) {
			a(c,
				b)
		}).catch(function (b) {
			a(c, b)
		})
	});
	m.request = x;
	return m
}();
!function (a, m) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = m() : "function" == typeof define && define.amd ? define(m) : (a = a || self).marked = m()
}(this, function () {
	function a(a, b) {
		for (var c = 0; c < b.length; c++) {
			var d = b[c];
			d.enumerable = d.enumerable || !1;
			d.configurable = !0;
			"value" in d && (d.writable = !0);
			Object.defineProperty(a, d.key, d)
		}
	}

	function m(a) {
		return w[a]
	}

	function e(a) {
		return a.replace(A, function (a, b) {
			return "colon" === (b = b.toLowerCase()) ? ":" : "#" === b.charAt(0) ? "x" === b.charAt(1) ? String.fromCharCode(parseInt(b.substring(2),
				16)) : String.fromCharCode(+b.substring(1)) : ""
		})
	}

	function b(a, b, c) {
		var d = a.length;
		if (0 === d) return "";
		for (var e = 0; e < d;) {
			var f = a.charAt(d - e - 1);
			if (f !== b || c) if (f === b || !c) break;
			e++
		}
		return a.substr(0, d - e)
	}

	function d(a, b, c) {
		var d = b.href;
		b = b.title ? Q(b.title) : null;
		return "!" !== a[0].charAt(0) ? {type: "link", raw: c, href: d, title: b, text: a[1]} : {
			type: "image",
			raw: c,
			text: Q(a[1]),
			href: d,
			title: b
		}
	}

	function c(a) {
		return a.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g,
			"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201c").replace(/"/g, "\u201d").replace(/\.{3}/g, "\u2026")
	}

	function g(a) {
		var b, c = "", d = a.length;
		for (b = 0; b < d; b++) {
			var e = a.charCodeAt(b);
			.5 < Math.random() && (e = "x" + e.toString(16));
			c += "&#" + e + ";"
		}
		return c
	}

	function k(a, b, c) {
		if (null == a) throw Error("marked(): input parameter is undefined or null");
		if ("string" != typeof a) throw Error("marked(): input parameter is of type " + Object.prototype.toString.call(a) + ", string expected");
		if (c || "function" == typeof b) {
			var d =
				function () {
					function d(a) {
						if (a) return b.highlight = e, c(a);
						try {
							var d = J.parse(h, b)
						} catch (na) {
							a = na
						}
						return b.highlight = e, a ? c(a) : c(null, d)
					}

					c || (c = b, b = null);
					b = U({}, k.defaults, b || {});
					N(b);
					var e = b.highlight, f = 0;
					try {
						var h = aa.lex(a, b)
					} catch (H) {
						return {v: c(H)}
					}
					var g = h.length;
					if (!e || 3 > e.length || (delete b.highlight, !g)) return {v: d()};
					for (; f < h.length; f++) !function (a) {
						"code" !== a.type ? --g || d() : e(a.text, a.lang, function (b, c) {
							return b ? d(b) : null == c || c === a.text ? --g || d() : (a.text = c, a.escaped = !0, void (--g || d()))
						})
					}(h[f]);
					return {v: void 0}
				}();
			if ("object" == typeof d) return d.v
		}
		try {
			return b = U({}, k.defaults, b || {}), N(b), J.parse(aa.lex(a, b), b)
		} catch (W) {
			if (W.message += "\nPlease report this to https://github.com/markedjs/marked.", (b || k.defaults).silent) return "<p>An error occurred:</p><pre>" + fa(W.message + "", !0) + "</pre>";
			throw W;
		}
	}

	var f, q = (function (a) {
			function b() {
				return {
					baseUrl: null,
					breaks: !1,
					gfm: !0,
					headerIds: !0,
					headerPrefix: "",
					highlight: null,
					langPrefix: "language-",
					mangle: !0,
					pedantic: !1,
					renderer: null,
					sanitize: !1,
					sanitizer: null,
					silent: !1,
					smartLists: !1,
					smartypants: !1,
					tokenizer: null,
					xhtml: !1
				}
			}

			a.exports = {
				defaults: b(), getDefaults: b, changeDefaults: function (b) {
					a.exports.defaults = b
				}
			}
		}(f = {exports: {}}), f.exports), t = (q.defaults, q.getDefaults, q.changeDefaults, /[&<>"']/), p = /[&<>"']/g,
		r = /[<>"']|&(?!#?\w+;)/, u = /[<>"']|&(?!#?\w+;)/g,
		w = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"},
		A = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, v = /(^|[^\[])\^/g, B = /[^\w:]/g,
		x = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i, y = {}, E = /^[^:]+:\/*[^/]*$/, O = /^([^:]+:)[\s\S]*$/,
		X = /^([^:]+:\/*[^/]*)[\s\S]*$/,
		G = function (a, b) {
			if (b) {
				if (t.test(a)) return a.replace(p, m)
			} else if (r.test(a)) return a.replace(u, m);
			return a
		};
	f = function (a) {
		for (var b, c, d = 1; d < arguments.length; d++) for (c in b = arguments[d]) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
		return a
	};
	var T = q.defaults, M = function (a, b) {
		a = a.replace(/\|/g, function (a, b, c) {
			for (a = !1; 0 <= --b && "\\" === c[b];) a = !a;
			return a ? "|" : " |"
		}).split(/ \|/);
		var c = 0;
		if (a.length > b) a.splice(b); else for (; a.length < b;) a.push("");
		for (; c < a.length; c++) a[c] = a[c].trim().replace(/\\\|/g,
			"|");
		return a
	}, Q = G, K = function () {
		function a(a) {
			this.options = a || T
		}

		var c = a.prototype;
		return c.space = function (a) {
			if (a = this.rules.block.newline.exec(a)) return 1 < a[0].length ? {type: "space", raw: a[0]} : {raw: "\n"}
		}, c.code = function (a, c) {
			if (a = this.rules.block.code.exec(a)) {
				var d = c[c.length - 1];
				if (d && "paragraph" === d.type) return c.pop(), d.text += "\n" + a[0].trimRight(), d.raw += "\n" + a[0], d;
				c = a[0].replace(/^ {4}/gm, "");
				return {type: "code", raw: a[0], codeBlockStyle: "indented", text: this.options.pedantic ? c : b(c, "\n")}
			}
		}, c.fences =
			function (a) {
				if (a = this.rules.block.fences.exec(a)) return {
					type: "code",
					raw: a[0],
					lang: a[2] ? a[2].trim() : a[2],
					text: a[3] || ""
				}
			}, c.heading = function (a) {
			if (a = this.rules.block.heading.exec(a)) return {type: "heading", raw: a[0], depth: a[1].length, text: a[2]}
		}, c.nptable = function (a) {
			if (a = this.rules.block.nptable.exec(a)) if (a = {
				type: "table",
				header: M(a[1].replace(/^ *| *\| *$/g, "")),
				align: a[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
				cells: a[3] ? a[3].replace(/\n$/, "").split("\n") : [],
				raw: a[0]
			}, a.header.length === a.align.length) {
				var b,
					c = a.align.length;
				for (b = 0; b < c; b++) /^ *-+: *$/.test(a.align[b]) ? a.align[b] = "right" : /^ *:-+: *$/.test(a.align[b]) ? a.align[b] = "center" : /^ *:-+ *$/.test(a.align[b]) ? a.align[b] = "left" : a.align[b] = null;
				c = a.cells.length;
				for (b = 0; b < c; b++) a.cells[b] = M(a.cells[b], a.header.length);
				return a
			}
		}, c.hr = function (a) {
			if (a = this.rules.block.hr.exec(a)) return {type: "hr", raw: a[0]}
		}, c.blockquote = function (a) {
			if (a = this.rules.block.blockquote.exec(a)) {
				var b = a[0].replace(/^ *> ?/gm, "");
				return {type: "blockquote", raw: a[0], text: b}
			}
		},
			c.list = function (a) {
				var b = this.rules.block.list.exec(a);
				if (b) {
					var c, d, e;
					a = b[0];
					var h = b[2], f = 1 < h.length;
					f = {type: "list", raw: a, ordered: f, start: f ? +h : "", loose: !1, items: []};
					for (var g = b[0].match(this.rules.block.item), k = !1, p = g.length, q = 0; q < p; q++) {
						var r = (a = b = g[q]).length;
						~(b = b.replace(/^ *([*+-]|\d+\.) */, "")).indexOf("\n ") && (r -= b.length, b = this.options.pedantic ? b.replace(/^ {1,4}/gm, "") : b.replace(new RegExp("^ {1," + r + "}", "gm"), ""));
						q !== p - 1 && (c = this.rules.block.bullet.exec(g[q + 1])[0], (1 < h.length ? 1 === c.length :
							1 < c.length || this.options.smartLists && c !== h) && (d = g.slice(q + 1).join("\n"), f.raw = f.raw.substring(0, f.raw.length - d.length), q = p - 1));
						r = k || /\n\n(?!\s*$)/.test(b);
						q !== p - 1 && (k = "\n" === b.charAt(b.length - 1), r = r || k);
						r && (f.loose = !0);
						var m = void 0;
						(e = /^\[[ xX]\] /.test(b)) && (m = " " !== b[1], b = b.replace(/^\[[ xX]\] +/, ""));
						f.items.push({raw: a, task: e, checked: m, loose: r, text: b})
					}
					return f
				}
			}, c.html = function (a) {
			if (a = this.rules.block.html.exec(a)) return {
				type: this.options.sanitize ? "paragraph" : "html",
				raw: a[0],
				pre: !this.options.sanitizer &&
					("pre" === a[1] || "script" === a[1] || "style" === a[1]),
				text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(a[0]) : Q(a[0]) : a[0]
			}
		}, c.def = function (a) {
			if (a = this.rules.block.def.exec(a)) return a[3] && (a[3] = a[3].substring(1, a[3].length - 1)), {
				tag: a[1].toLowerCase().replace(/\s+/g, " "),
				raw: a[0],
				href: a[2],
				title: a[3]
			}
		}, c.table = function (a) {
			var b = this.rules.block.table.exec(a);
			if (b && (a = {
				type: "table",
				header: M(b[1].replace(/^ *| *\| *$/g, "")),
				align: b[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
				cells: b[3] ?
					b[3].replace(/\n$/, "").split("\n") : []
			}, a.header.length === a.align.length)) {
				a.raw = b[0];
				var c = a.align.length;
				for (b = 0; b < c; b++) /^ *-+: *$/.test(a.align[b]) ? a.align[b] = "right" : /^ *:-+: *$/.test(a.align[b]) ? a.align[b] = "center" : /^ *:-+ *$/.test(a.align[b]) ? a.align[b] = "left" : a.align[b] = null;
				c = a.cells.length;
				for (b = 0; b < c; b++) a.cells[b] = M(a.cells[b].replace(/^ *\| *| *\| *$/g, ""), a.header.length);
				return a
			}
		}, c.lheading = function (a) {
			if (a = this.rules.block.lheading.exec(a)) return {
				type: "heading", raw: a[0], depth: "=" ===
				a[2].charAt(0) ? 1 : 2, text: a[1]
			}
		}, c.paragraph = function (a) {
			if (a = this.rules.block.paragraph.exec(a)) return {
				type: "paragraph",
				raw: a[0],
				text: "\n" === a[1].charAt(a[1].length - 1) ? a[1].slice(0, -1) : a[1]
			}
		}, c.text = function (a) {
			if (a = this.rules.block.text.exec(a)) return {type: "text", raw: a[0], text: a[0]}
		}, c.escape = function (a) {
			if (a = this.rules.inline.escape.exec(a)) return {type: "escape", raw: a[0], text: Q(a[1])}
		}, c.tag = function (a, b, c) {
			if (a = this.rules.inline.tag.exec(a)) return !b && /^<a /i.test(a[0]) ? b = !0 : b && /^<\/a>/i.test(a[0]) &&
				(b = !1), !c && /^<(pre|code|kbd|script)(\s|>)/i.test(a[0]) ? c = !0 : c && /^<\/(pre|code|kbd|script)(\s|>)/i.test(a[0]) && (c = !1), {
				type: this.options.sanitize ? "text" : "html",
				raw: a[0],
				inLink: b,
				inRawBlock: c,
				text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(a[0]) : Q(a[0]) : a[0]
			}
		}, c.link = function (a) {
			if (a = this.rules.inline.link.exec(a)) {
				a:{
					var b = a[2];
					if (-1 !== b.indexOf(")")) for (var c = b.length, e = 0, f = 0; f < c; f++) if ("\\" === b[f]) f++; else if ("(" === b[f]) e++; else if (")" === b[f] && 0 > --e) {
						b = f;
						break a
					}
					b = -1
				}
				-1 <
				b && (c = (0 === a[0].indexOf("!") ? 5 : 4) + a[1].length + b, a[2] = a[2].substring(0, b), a[0] = a[0].substring(0, c).trim(), a[3] = "");
				b = a[2];
				c = this.options.pedantic ? (c = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(b)) ? (b = c[1], c[3]) : "" : a[3] ? a[3].slice(1, -1) : "";
				return d(a, {
					href: (b = b.trim().replace(/^<([\s\S]*)>$/, "$1")) ? b.replace(this.rules.inline._escapes, "$1") : b,
					title: c ? c.replace(this.rules.inline._escapes, "$1") : c
				}, a[0])
			}
		}, c.reflink = function (a, b) {
			var c;
			if ((c = this.rules.inline.reflink.exec(a)) || (c = this.rules.inline.nolink.exec(a))) {
				a =
					(c[2] || c[1]).replace(/\s+/g, " ");
				if ((a = b[a.toLowerCase()]) && a.href) return d(c, a, c[0]);
				b = c[0].charAt(0);
				return {type: "text", raw: b, text: b}
			}
		}, c.strong = function (a) {
			if (a = this.rules.inline.strong.exec(a)) return {type: "strong", raw: a[0], text: a[4] || a[3] || a[2] || a[1]}
		}, c.em = function (a) {
			if (a = this.rules.inline.em.exec(a)) return {
				type: "em",
				raw: a[0],
				text: a[6] || a[5] || a[4] || a[3] || a[2] || a[1]
			}
		}, c.codespan = function (a) {
			if (a = this.rules.inline.code.exec(a)) return {type: "codespan", raw: a[0], text: Q(a[2].trim(), !0)}
		}, c.br = function (a) {
			if (a =
				this.rules.inline.br.exec(a)) return {type: "br", raw: a[0]}
		}, c.del = function (a) {
			if (a = this.rules.inline.del.exec(a)) return {type: "del", raw: a[0], text: a[1]}
		}, c.autolink = function (a, b) {
			var c, d;
			if (a = this.rules.inline.autolink.exec(a)) return d = "@" === a[2] ? "mailto:" + (c = Q(this.options.mangle ? b(a[1]) : a[1])) : c = Q(a[1]), {
				type: "link",
				raw: a[0],
				text: c,
				href: d,
				tokens: [{type: "text", raw: c, text: c}]
			}
		}, c.url = function (a, b) {
			if (a = this.rules.inline.url.exec(a)) {
				if ("@" === a[2]) var c = "mailto:" + (b = Q(this.options.mangle ? b(a[0]) : a[0]));
				else {
					for (; c = a[0], a[0] = this.rules.inline._backpedal.exec(a[0])[0], c !== a[0];) ;
					b = Q(a[0]);
					c = "www." === a[1] ? "http://" + b : b
				}
				return {type: "link", raw: a[0], text: b, href: c, tokens: [{type: "text", raw: b, text: b}]}
			}
		}, c.inlineText = function (a, b, c) {
			var d;
			if (a = this.rules.inline.text.exec(a)) return d = b ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(a[0]) : Q(a[0]) : a[0] : Q(this.options.smartypants ? c(a[0]) : a[0]), {
				type: "text",
				raw: a[0],
				text: d
			}
		}, a
	}(), da = {
		exec: function () {
		}
	}, C = function (a, b) {
		a = a.source || a;
		b = b ||
			"";
		var c = {
			replace: function (b, d) {
				return d = (d = d.source || d).replace(v, "$1"), a = a.replace(b, d), c
			}, getRegex: function () {
				return new RegExp(a, b)
			}
		};
		return c
	}, P = {
		newline: /^\n+/,
		code: /^( {4}[^\n]+\n*)+/,
		fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
		hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
		heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
		blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
		list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
		html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
		def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
		nptable: da,
		table: da,
		lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
		_paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
		text: /^[^\n]+/,
		_label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
		_title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
	};
	P.def = C(P.def).replace("label", P._label).replace("title", P._title).getRegex();
	P.bullet = /(?:[*+-]|\d{1,9}\.)/;
	P.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
	P.item = C(P.item, "gm").replace(/bull/g, P.bullet).getRegex();
	P.list = C(P.list).replace(/bull/g,
		P.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + P.def.source + ")").getRegex();
	P._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
	P._comment = /\x3c!--(?!-?>)[\s\S]*?--\x3e/;
	P.html = C(P.html, "i").replace("comment", P._comment).replace("tag", P._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
	P.paragraph = C(P._paragraph).replace("hr", P.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",
		P._tag).getRegex();
	P.blockquote = C(P.blockquote).replace("paragraph", P.paragraph).getRegex();
	P.normal = f({}, P);
	P.gfm = f({}, P.normal, {
		nptable: "^ *([^|\\n ].*\\|.*)\\n *([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
		table: "^ *\\|(.+)\\n *\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
	});
	P.gfm.nptable = C(P.gfm.nptable).replace("hr", P.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote",
		" {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", P._tag).getRegex();
	P.gfm.table = C(P.gfm.table).replace("hr", P.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html",
		"</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", P._tag).getRegex();
	P.pedantic = f({}, P.normal, {
		html: C("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", P._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
		def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
		heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
		fences: da,
		paragraph: C(P.normal._paragraph).replace("hr", P.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", P.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
	});
	var I = {
		escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
		autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
		url: da,
		tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
		link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
		reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
		nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
		strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
		em: /^_([^\s_])_(?!_)|^_([^\s_<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s*<\[])\*(?!\*)|^\*([^\s<"][\s\S]*?[^\s\[\*])\*(?![\]`punctuation])|^\*([^\s*"<\[][\s\S]*[^\s])\*(?!\*)/,
		code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
		br: /^( {2,}|\\)\n(?!\s*$)/,
		del: da,
		text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,
		_punctuation: "!\"#$%&'()*+\\-./:;<=>?@\\[^_{|}~"
	};
	I.em = C(I.em).replace(/punctuation/g, I._punctuation).getRegex();
	I._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
	I._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
	I._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
	I.autolink = C(I.autolink).replace("scheme", I._scheme).replace("email", I._email).getRegex();
	I._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
	I.tag = C(I.tag).replace("comment", P._comment).replace("attribute", I._attribute).getRegex();
	I._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
	I._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
	I._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
	I.link = C(I.link).replace("label", I._label).replace("href",
		I._href).replace("title", I._title).getRegex();
	I.reflink = C(I.reflink).replace("label", I._label).getRegex();
	I.normal = f({}, I);
	I.pedantic = f({}, I.normal, {
		strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
		em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
		link: C(/^!?\[(label)\]\((.*?)\)/).replace("label", I._label).getRegex(),
		reflink: C(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", I._label).getRegex()
	});
	I.gfm = f({}, I.normal, {
		escape: C(I.escape).replace("])", "~|])").getRegex(),
		_extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
		url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
		_backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
		del: /^~+(?=\S)([\s\S]*?\S)~+/,
		text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
	});
	I.gfm.url =
		C(I.gfm.url, "i").replace("email", I.gfm._extended_email).getRegex();
	I.breaks = f({}, I.gfm, {
		br: C(I.br).replace("{2,}", "*").getRegex(),
		text: C(I.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
	});
	var ca = q.defaults, aa = function () {
			function b(a) {
				this.tokens = [];
				this.tokens.links = Object.create(null);
				this.options = a || ca;
				this.options.tokenizer = this.options.tokenizer || new K;
				this.tokenizer = this.options.tokenizer;
				this.tokenizer.options = this.options;
				a = {block: P.normal, inline: I.normal};
				this.options.pedantic ?
					(a.block = P.pedantic, a.inline = I.pedantic) : this.options.gfm && (a.block = P.gfm, this.options.breaks ? a.inline = I.breaks : a.inline = I.gfm);
				this.tokenizer.rules = a
			}

			b.lex = function (a, c) {
				return (new b(c)).lex(a)
			};
			var d, e = b.prototype;
			return e.lex = function (a) {
				return a = a.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "), this.blockTokens(a, this.tokens, !0), this.inline(this.tokens), this.tokens
			}, e.blockTokens = function (a, b, c) {
				var d, e;
				void 0 === b && (b = []);
				void 0 === c && (c = !0);
				for (a = a.replace(/^ +$/gm, ""); a;) if (d = this.tokenizer.space(a)) a =
					a.substring(d.raw.length), d.type && b.push(d); else if (d = this.tokenizer.code(a, b)) a = a.substring(d.raw.length), b.push(d); else if (d = this.tokenizer.fences(a)) a = a.substring(d.raw.length), b.push(d); else if (d = this.tokenizer.heading(a)) a = a.substring(d.raw.length), b.push(d); else if (d = this.tokenizer.nptable(a)) a = a.substring(d.raw.length), b.push(d); else if (d = this.tokenizer.hr(a)) a = a.substring(d.raw.length), b.push(d); else if (d = this.tokenizer.blockquote(a)) a = a.substring(d.raw.length), d.tokens = this.blockTokens(d.text,
					[], c), b.push(d); else if (d = this.tokenizer.list(a)) {
					a = a.substring(d.raw.length);
					var f = d.items.length;
					for (e = 0; e < f; e++) d.items[e].tokens = this.blockTokens(d.items[e].text, [], !1);
					b.push(d)
				} else if (d = this.tokenizer.html(a)) a = a.substring(d.raw.length), b.push(d); else if (c && (d = this.tokenizer.def(a))) a = a.substring(d.raw.length), this.tokens.links[d.tag] || (this.tokens.links[d.tag] = {
					href: d.href,
					title: d.title
				}); else if (d = this.tokenizer.table(a)) a = a.substring(d.raw.length), b.push(d); else if (d = this.tokenizer.lheading(a)) a =
					a.substring(d.raw.length), b.push(d); else if (c && (d = this.tokenizer.paragraph(a))) a = a.substring(d.raw.length), b.push(d); else if (d = this.tokenizer.text(a)) a = a.substring(d.raw.length), b.push(d); else if (a) {
					a = "Infinite loop on byte: " + a.charCodeAt(0);
					if (this.options.silent) {
						console.error(a);
						break
					}
					throw Error(a);
				}
				return b
			}, e.inline = function (a) {
				var b, c, d, e, f = a.length;
				for (b = 0; b < f; b++) switch ((e = a[b]).type) {
					case "paragraph":
					case "text":
					case "heading":
						e.tokens = [];
						this.inlineTokens(e.text, e.tokens);
						break;
					case "table":
						e.tokens =
							{header: [], cells: []};
						var g = e.header.length;
						for (c = 0; c < g; c++) e.tokens.header[c] = [], this.inlineTokens(e.header[c], e.tokens.header[c]);
						g = e.cells.length;
						for (c = 0; c < g; c++) {
							var k = e.cells[c];
							e.tokens.cells[c] = [];
							for (d = 0; d < k.length; d++) e.tokens.cells[c][d] = [], this.inlineTokens(k[d], e.tokens.cells[c][d])
						}
						break;
					case "blockquote":
						this.inline(e.tokens);
						break;
					case "list":
						for (g = e.items.length, c = 0; c < g; c++) this.inline(e.items[c].tokens)
				}
				return a
			}, e.inlineTokens = function (a, b, d, e) {
				var f;
				void 0 === b && (b = []);
				void 0 === d &&
				(d = !1);
				for (void 0 === e && (e = !1); a;) if (f = this.tokenizer.escape(a)) a = a.substring(f.raw.length), b.push(f); else if (f = this.tokenizer.tag(a, d, e)) a = a.substring(f.raw.length), d = f.inLink, e = f.inRawBlock, b.push(f); else if (f = this.tokenizer.link(a)) a = a.substring(f.raw.length), "link" === f.type && (f.tokens = this.inlineTokens(f.text, [], !0, e)), b.push(f); else if (f = this.tokenizer.reflink(a, this.tokens.links)) a = a.substring(f.raw.length), "link" === f.type && (f.tokens = this.inlineTokens(f.text, [], !0, e)), b.push(f); else if (f = this.tokenizer.strong(a)) a =
					a.substring(f.raw.length), f.tokens = this.inlineTokens(f.text, [], d, e), b.push(f); else if (f = this.tokenizer.em(a)) a = a.substring(f.raw.length), f.tokens = this.inlineTokens(f.text, [], d, e), b.push(f); else if (f = this.tokenizer.codespan(a)) a = a.substring(f.raw.length), b.push(f); else if (f = this.tokenizer.br(a)) a = a.substring(f.raw.length), b.push(f); else if (f = this.tokenizer.del(a)) a = a.substring(f.raw.length), f.tokens = this.inlineTokens(f.text, [], d, e), b.push(f); else if (f = this.tokenizer.autolink(a, g)) a = a.substring(f.raw.length),
					b.push(f); else if (d || !(f = this.tokenizer.url(a, g))) if (f = this.tokenizer.inlineText(a, e, c)) a = a.substring(f.raw.length), b.push(f); else {
					if (a) {
						a = "Infinite loop on byte: " + a.charCodeAt(0);
						if (this.options.silent) {
							console.error(a);
							break
						}
						throw Error(a);
					}
				} else a = a.substring(f.raw.length), b.push(f);
				return b
			}, d = [{
				key: "rules", get: function () {
					return {block: P, inline: I}
				}
			}], d && a(b, d), b
		}(), ka = q.defaults, ea = function (a, c, d) {
			if (a) {
				try {
					var f = decodeURIComponent(e(d)).replace(B, "").toLowerCase()
				} catch (W) {
					return null
				}
				if (0 ===
					f.indexOf("javascript:") || 0 === f.indexOf("vbscript:") || 0 === f.indexOf("data:")) return null
			}
			c && !x.test(d) && (a = c, y[" " + a] || (E.test(a) ? y[" " + a] = a + "/" : y[" " + a] = b(a, "/", !0)), c = -1 === (a = y[" " + a]).indexOf(":"), d = "//" === d.substring(0, 2) ? c ? d : a.replace(O, "$1") + d : "/" === d.charAt(0) ? c ? d : a.replace(X, "$1") + d : a + d);
			try {
				d = encodeURI(d).replace(/%25/g, "%")
			} catch (W) {
				return null
			}
			return d
		}, oa = function () {
			function a(a) {
				this.options = a || ka
			}

			var b = a.prototype;
			return b.code = function (a, b, c) {
				b = (b || "").match(/\S*/)[0];
				if (this.options.highlight) {
					var d =
						this.options.highlight(a, b);
					null != d && d !== a && (c = !0, a = d)
				}
				return b ? '<pre><code class="' + this.options.langPrefix + G(b, !0) + '">' + (c ? a : G(a, !0)) + "</code></pre>\n" : "<pre><code>" + (c ? a : G(a, !0)) + "</code></pre>"
			}, b.blockquote = function (a) {
				return "<blockquote>\n" + a + "</blockquote>\n"
			}, b.html = function (a) {
				return a
			}, b.heading = function (a, b, c, d) {
				return this.options.headerIds ? "<h" + b + ' id="' + this.options.headerPrefix + d.slug(c) + '">' + a + "</h" + b + ">\n" : "<h" + b + ">" + a + "</h" + b + ">\n"
			}, b.hr = function () {
				return this.options.xhtml ? "<hr/>\n" :
					"<hr>\n"
			}, b.list = function (a, b, c) {
				var d = b ? "ol" : "ul";
				return "<" + d + (b && 1 !== c ? ' start="' + c + '"' : "") + ">\n" + a + "</" + d + ">\n"
			}, b.listitem = function (a) {
				return "<li>" + a + "</li>\n"
			}, b.checkbox = function (a) {
				return "<input " + (a ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
			}, b.paragraph = function (a) {
				return "<p>" + a + "</p>\n"
			}, b.table = function (a, b) {
				return "<table>\n<thead>\n" + a + "</thead>\n" + (b && "<tbody>" + b + "</tbody>") + "</table>\n"
			}, b.tablerow = function (a) {
				return "<tr>\n" + a + "</tr>\n"
			}, b.tablecell =
				function (a, b) {
					var c = b.header ? "th" : "td";
					return (b.align ? "<" + c + ' align="' + b.align + '">' : "<" + c + ">") + a + "</" + c + ">\n"
				}, b.strong = function (a) {
				return "<strong>" + a + "</strong>"
			}, b.em = function (a) {
				return "<em>" + a + "</em>"
			}, b.codespan = function (a) {
				return "<code>" + a + "</code>"
			}, b.br = function () {
				return this.options.xhtml ? "<br/>" : "<br>"
			}, b.del = function (a) {
				return "<del>" + a + "</del>"
			}, b.link = function (a, b, c) {
				if (null === (a = ea(this.options.sanitize, this.options.baseUrl, a))) return c;
				a = '<a href="' + G(a) + '"';
				return b && (a += ' title="' +
					b + '"'), a + (">" + c + "</a>")
			}, b.image = function (a, b, c) {
				if (null === (a = ea(this.options.sanitize, this.options.baseUrl, a))) return c;
				a = '<img src="' + a + '" alt="' + c + '"';
				return b && (a += ' title="' + b + '"'), a + (this.options.xhtml ? "/>" : ">")
			}, b.text = function (a) {
				return a
			}, a
		}(), ha = function () {
			function a() {
			}

			var b = a.prototype;
			return b.strong = function (a) {
				return a
			}, b.em = function (a) {
				return a
			}, b.codespan = function (a) {
				return a
			}, b.del = function (a) {
				return a
			}, b.html = function (a) {
				return a
			}, b.text = function (a) {
				return a
			}, b.link = function (a,
														b, c) {
				return "" + c
			}, b.image = function (a, b, c) {
				return "" + c
			}, b.br = function () {
				return ""
			}, a
		}(), ma = function () {
			function a() {
				this.seen = {}
			}

			return a.prototype.slug = function (a) {
				a = a.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
				if (this.seen.hasOwnProperty(a)) for (var b = a; this.seen[b]++, a = b + "-" + this.seen[b], this.seen.hasOwnProperty(a);) ;
				return this.seen[a] = 0, a
			}, a
		}(), R = q.defaults, J = function () {
			function a(a) {
				this.options =
					a || R;
				this.options.renderer = this.options.renderer || new oa;
				this.renderer = this.options.renderer;
				this.renderer.options = this.options;
				this.textRenderer = new ha;
				this.slugger = new ma
			}

			a.parse = function (b, c) {
				return (new a(c)).parse(b)
			};
			var b = a.prototype;
			return b.parse = function (a, b) {
				void 0 === b && (b = !0);
				var c, d, f, h, g, k, p, q = "", r = a.length;
				for (c = 0; c < r; c++) switch ((k = a[c]).type) {
					case "space":
						continue;
					case "hr":
						q += this.renderer.hr();
						continue;
					case "heading":
						q += this.renderer.heading(this.parseInline(k.tokens), k.depth, e(this.parseInline(k.tokens,
							this.textRenderer)), this.slugger);
						continue;
					case "code":
						q += this.renderer.code(k.text, k.lang, k.escaped);
						continue;
					case "table":
						var m = g = "";
						var t = k.header.length;
						for (d = 0; d < t; d++) m += this.renderer.tablecell(this.parseInline(k.tokens.header[d]), {
							header: !0,
							align: k.align[d]
						});
						g += this.renderer.tablerow(m);
						var n = "";
						t = k.cells.length;
						for (d = 0; d < t; d++) {
							m = "";
							var u = (h = k.tokens.cells[d]).length;
							for (f = 0; f < u; f++) m += this.renderer.tablecell(this.parseInline(h[f]), {
								header: !1,
								align: k.align[f]
							});
							n += this.renderer.tablerow(m)
						}
						q +=
							this.renderer.table(g, n);
						continue;
					case "blockquote":
						n = this.parse(k.tokens);
						q += this.renderer.blockquote(n);
						continue;
					case "list":
						f = k.ordered;
						u = k.start;
						h = k.loose;
						t = k.items.length;
						n = "";
						for (d = 0; d < t; d++) {
							var w = (g = k.items[d]).checked;
							var A = g.task;
							m = "";
							g.task && (p = this.renderer.checkbox(w), h ? "text" === g.tokens[0].type ? (g.tokens[0].text = p + " " + g.tokens[0].text, g.tokens[0].tokens && 0 < g.tokens[0].tokens.length && "text" === g.tokens[0].tokens[0].type && (g.tokens[0].tokens[0].text = p + " " + g.tokens[0].tokens[0].text)) : g.tokens.unshift({
								type: "text",
								text: p
							}) : m += p);
							m += this.parse(g.tokens, h);
							n += this.renderer.listitem(m, A, w)
						}
						q += this.renderer.list(n, f, u);
						continue;
					case "html":
						q += this.renderer.html(k.text);
						continue;
					case "paragraph":
						q += this.renderer.paragraph(this.parseInline(k.tokens));
						continue;
					case "text":
						for (n = k.tokens ? this.parseInline(k.tokens) : k.text; c + 1 < r && "text" === a[c + 1].type;) n += "\n" + ((k = a[++c]).tokens ? this.parseInline(k.tokens) : k.text);
						q += b ? this.renderer.paragraph(n) : n;
						continue;
					default:
						a = 'Token with "' + k.type + '" type was not found.';
						if (this.options.silent) return void console.error(a);
						throw Error(a);
				}
				return q
			}, b.parseInline = function (a, b) {
				b = b || this.renderer;
				var c, d, e = "", f = a.length;
				for (c = 0; c < f; c++) switch ((d = a[c]).type) {
					case "escape":
						e += b.text(d.text);
						break;
					case "html":
						e += b.html(d.text);
						break;
					case "link":
						e += b.link(d.href, d.title, this.parseInline(d.tokens, b));
						break;
					case "image":
						e += b.image(d.href, d.title, d.text);
						break;
					case "strong":
						e += b.strong(this.parseInline(d.tokens, b));
						break;
					case "em":
						e += b.em(this.parseInline(d.tokens, b));
						break;
					case "codespan":
						e += b.codespan(d.text);
						break;
					case "br":
						e +=
							b.br();
						break;
					case "del":
						e += b.del(this.parseInline(d.tokens, b));
						break;
					case "text":
						e += b.text(d.text);
						break;
					default:
						a = 'Token with "' + d.type + '" type was not found.';
						if (this.options.silent) return void console.error(a);
						throw Error(a);
				}
				return e
			}, a
		}(), U = f, N = function (a) {
			a && a.sanitize && !a.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
		},
		fa = G;
	f = q.getDefaults;
	var S = q.changeDefaults;
	q = q.defaults;
	return k.options = k.setOptions = function (a) {
		return U(k.defaults, a), S(k.defaults), k
	}, k.getDefaults = f, k.defaults = q, k.use = function (a) {
		var b = U({}, a);
		a.renderer && function () {
			function c(b) {
				var c = d[b];
				d[b] = function () {
					for (var e = arguments.length, f = Array(e), g = 0; g < e; g++) f[g] = arguments[g];
					e = a.renderer[b].apply(d, f);
					return !1 === e && (e = c.apply(d, f)), e
				}
			}

			var d = k.defaults.renderer || new oa, e;
			for (e in a.renderer) c(e);
			b.renderer = d
		}();
		a.tokenizer && function () {
			function c(b) {
				var c =
					d[b];
				d[b] = function () {
					for (var e = arguments.length, f = Array(e), g = 0; g < e; g++) f[g] = arguments[g];
					e = a.tokenizer[b].apply(d, f);
					return !1 === e && (e = c.apply(d, f)), e
				}
			}

			var d = k.defaults.tokenizer || new K, e;
			for (e in a.tokenizer) c(e);
			b.tokenizer = d
		}();
		k.setOptions(b)
	}, k.Parser = J, k.parser = J.parse, k.Renderer = oa, k.TextRenderer = ha, k.Lexer = aa, k.lexer = aa.lex, k.Tokenizer = K, k.Slugger = ma, k.parse = k
});
var ParseTable = function () {
	function a(a, b) {
		this.memo = {};
		this.lst = b.lst;
		this.idx = b.idx;
		this.hd = a;
		this.tl = b
	}

	function m(a, b) {
		this.memo = {};
		this.lst = a;
		this.idx = b
	}

	function e(a, b) {
		this.memo = {};
		this.lst = a;
		this.idx = b;
		this.hd = a.at(b)
	}

	function b(a, b) {
		return new (b < a.length ? e : m)(a, b)
	}

	function d(a) {
		return k(a, {
			memo: {}, target: a, tl: void 0, tail: function () {
				return this.tl || (this.tl = d(a.tail()))
			}
		})
	}

	function c() {
	}

	var g = {
		toString: function () {
			return "match failed"
		}
	}, k = function (a, b) {
		var c = function () {
		};
		c.prototype = a;
		a = new c;
		for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
		return a
	};
	a.prototype.head = function () {
		return this.hd
	};
	a.prototype.tail = function () {
		return this.tl
	};
	a.prototype.type = function () {
		return this.lst.constructor
	};
	a.prototype.upTo = function (a) {
		for (var b = [], c = this; c != a;) b.push(c.head()), c = c.tail();
		return this.type() == String ? b.join("") : b
	};
	m.prototype = k(a.prototype);
	m.prototype.head = function () {
		throw g;
	};
	m.prototype.tail = function () {
		throw g;
	};
	Array.prototype.at = function (a) {
		return this[a]
	};
	String.prototype.at = String.prototype.charAt;
	e.prototype = k(a.prototype);
	e.prototype.head = function () {
		return this.hd
	};
	e.prototype.tail = function () {
		return this.tl || (this.tl = b(this.lst, this.idx + 1))
	};
	Array.prototype.toOMInputStream = function () {
		return b(this, 0)
	};
	String.prototype.toOMInputStream = function () {
		return b(this, 0)
	};
	c.prototype.used = !1;
	var f = {
		_a: function (a) {
			var b = this.input.memo[a];
			if (void 0 == b) {
				var d = this.input, e = new c;
				if (void 0 === this[a]) throw'tried to apply undefined rule "' + a + '"';
				this.input.memo[a] = e;
				this.input.memo[a] = b = {
					ans: this[a].call(this),
					nextInput: this.input
				};
				if (e.used) for (e = this.input; ;) try {
					this.input = d;
					var f = this[a].call(this);
					if (this.input == e) throw g;
					b.ans = f;
					b.nextInput = this.input
				} catch (v) {
					if (v != g) throw v;
					break
				}
			} else if (b instanceof c) throw b.used = !0, g;
			this.input = b.nextInput;
			return b.ans
		}, _awa: function (a) {
			for (var b = this[a], c = b.length, d = arguments.length - 1; d >= c + 1; d--) this._prependInput(arguments[d]);
			return 0 == c ? b.call(this) : b.apply(this, Array.prototype.slice.call(arguments, 1, c + 1))
		}, _superApplyWithArgs: function (a, b) {
			for (var c = this[b],
						 d = c.length, e = arguments.length - 1; e >= d + 2; e--) a._prependInput(arguments[e]);
			return 0 == d ? c.call(a) : c.apply(a, Array.prototype.slice.call(arguments, 2, d + 2))
		}, _prependInput: function (b) {
			this.input = new a(b, this.input)
		}, memoizeParameterizedRules: function () {
			this._prependInput = function (b) {
				if (isImmutable(b)) {
					var c = this.input[getTag(b)];
					c || (c = new a(b, this.input), this.input[getTag(b)] = c)
				} else c = new a(b, this.input);
				this.input = c
			};
			this._awa = function (a) {
				for (var b = this[a].length, c = arguments.length - 1; c >= b + 1; c--) this._prependInput(arguments[c]);
				return 0 == b ? this._a(a) : this[a].apply(this, Array.prototype.slice.call(arguments, 1, b + 1))
			}
		}, _pred: function (a) {
			if (a) return !0;
			throw g;
		}, _not: function (a) {
			var b = this.input;
			try {
				a.call(this)
			} catch (u) {
				if (u != g) throw u;
				this.input = b;
				return !0
			}
			throw g;
		}, _lookahead: function (a) {
			var b = this.input;
			a = a.call(this);
			this.input = b;
			return a
		}, _or: function () {
			for (var a = this.input, b = 0; b < arguments.length; b++) try {
				return this.input = a, arguments[b].call(this)
			} catch (u) {
				if (u != g) throw u;
			}
			throw g;
		}, _xor: function (a) {
			for (var b = this.input,
						 c = 1, d, e; c < arguments.length;) {
				try {
					this.input = b;
					e = arguments[c].call(this);
					if (d) throw'more than one choice matched by "exclusive-OR" in ' + a;
					d = this.input
				} catch (v) {
					if (v != g) throw v;
				}
				c++
			}
			if (d) return this.input = d, e;
			throw g;
		}, disableXORs: function () {
			this._xor = this._or
		}, _opt: function (a) {
			var b = this.input;
			try {
				var c = a.call(this)
			} catch (w) {
				if (w != g) throw w;
				this.input = b
			}
			return c
		}, _many: function (a, b) {
			for (b = void 0 != b ? [b] : []; ;) {
				var c = this.input;
				try {
					b.push(a.call(this))
				} catch (w) {
					if (w != g) throw w;
					this.input = c;
					break
				}
			}
			return b
		},
		_many1: function (a) {
			return this._many(a, a.call(this))
		}, _form: function (a) {
			var b = this._a("any");
			if ("string" != typeof b && b.constructor !== Array) throw g;
			var c = this.input;
			this.input = b.toOMInputStream();
			a.call(this);
			this._a("end");
			this.input = c;
			return b
		}, _consumedBy: function (a) {
			var b = this.input;
			a.call(this);
			return b.upTo(this.input)
		}, _idxConsumedBy: function (a) {
			var b = this.input;
			a.call(this);
			return {fromIdx: b.idx, toIdx: this.input.idx}
		}, _interleave: function (a, b, c, d) {
			for (var e = this.input, f = [], k = 0; k < arguments.length; k +=
				2) f[k / 2] = "*" == arguments[k] || "+" == arguments[k] ? [] : void 0;
			for (; ;) {
				k = 0;
				for (var q = !0; k < arguments.length;) {
					if ("0" != arguments[k]) try {
						this.input = e;
						switch (arguments[k]) {
							case "*":
								f[k / 2].push(arguments[k + 1].call(this));
								break;
							case "+":
								f[k / 2].push(arguments[k + 1].call(this));
								arguments[k] = "*";
								break;
							case "?":
								f[k / 2] = arguments[k + 1].call(this);
								arguments[k] = "0";
								break;
							case "1":
								f[k / 2] = arguments[k + 1].call(this);
								arguments[k] = "0";
								break;
							default:
								throw"invalid mode '" + arguments[k] + "' in OMeta._interleave";
						}
						e = this.input;
						break
					} catch (y) {
						if (y !=
							g) throw y;
						q = q && ("*" == arguments[k] || "?" == arguments[k])
					}
					k += 2
				}
				if (k == arguments.length) {
					if (q) return f;
					throw g;
				}
			}
		}, _currIdx: function () {
			return this.input.idx
		}, any: function () {
			var a = this.input.head();
			this.input = this.input.tail();
			return a
		}, begin: function () {
			if (0 == this.input.idx) return !0;
			throw g;
		}, end: function () {
			return this._not(function () {
				return this._a("any")
			})
		}, pos: function () {
			return this.input.idx
		}, empty: function () {
			return !0
		}, apply: function (a) {
			return this._a(a)
		}, foreign: function (a, b) {
			a = k(a, {input: d(this.input)});
			b = a._a(b);
			this.input = a.input.target;
			return b
		}, exact: function (a) {
			if (a === this._a("any")) return a;
			throw g;
		}, "true": function () {
			var a = this._a("any");
			this._pred(!0 === a);
			return a
		}, "false": function () {
			var a = this._a("any");
			this._pred(!1 === a);
			return a
		}, undefined: function () {
			var a = this._a("any");
			this._pred(void 0 === a);
			return a
		}, number: function () {
			var a = this._a("any");
			this._pred("number" === typeof a);
			return a
		}, string: function () {
			var a = this._a("any");
			this._pred("string" === typeof a);
			return a
		}, "char": function () {
			var a =
				this._a("any");
			this._pred("string" === typeof a && 1 == a.length);
			return a
		}, space: function () {
			var a = this._a("char");
			this._pred(32 >= a.charCodeAt(0));
			return a
		}, spaces: function () {
			return this._many(function () {
				return this._a("space")
			})
		}, ws: function () {
			var a = this._a("char");
			this._pred(-1 != " \t\f\u00a0".indexOf(a));
			return a
		}, digit: function () {
			var a = this._a("char");
			this._pred("0" <= a && "9" >= a);
			return a
		}, lower: function () {
			var a = this._a("char");
			this._pred("a" <= a && "z" >= a);
			return a
		}, upper: function () {
			var a = this._a("char");
			this._pred("A" <= a && "Z" >= a);
			return a
		}, letter: function () {
			return this._or(function () {
				return this._a("lower")
			}, function () {
				return this._a("upper")
			})
		}, letterOrDigit: function () {
			return this._or(function () {
				return this._a("letter")
			}, function () {
				return this._a("digit")
			})
		}, firstAndRest: function (a, b) {
			return this._many(function () {
				return this._a(b)
			}, this._a(a))
		}, seq: function (a) {
			for (var b = 0; b < a.length; b++) this._awa("exact", a.at(b));
			return a
		}, notLast: function (a) {
			var b = this._a(a);
			this._lookahead(function () {
				return this._a(a)
			});
			return b
		}, listOf: function (a, b) {
			return this._or(function () {
				var c = this._a(a);
				return this._many(function () {
					this._awa("token", b);
					return this._a(a)
				}, c)
			}, function () {
				return []
			})
		}, token: function (a) {
			this._a("spaces");
			return this._awa("seq", a)
		}, fromTo: function (a, b) {
			return this._consumedBy(function () {
				this._awa("seq", a);
				this._many(function () {
					this._not(function () {
						this._awa("seq", b)
					});
					this._a("char")
				});
				this._awa("seq", b)
			})
		}, initialize: function () {
		}, _genericMatch: function (a, b, c, d) {
			void 0 == c && (c = []);
			b = [b];
			for (var e =
				0; e < c.length; e++) b.push(c[e]);
			c = k(this, {input: a});
			c.initialize();
			try {
				return 1 == b.length ? c._a.call(c, b[0]) : c._awa.apply(c, b)
			} catch (v) {
				if (v == g && void 0 != d) {
					a = c.input;
					if (void 0 != a.idx) {
						for (; void 0 != a.tl && void 0 != a.tl.idx;) a = a.tl;
						a.idx--
					}
					return d(c, a.idx)
				}
				throw v;
			}
		}, match: function (a, b, c, d) {
			return this._genericMatch([a].toOMInputStream(), b, c, d)
		}, matchAll: function (a, b, c, d) {
			return this._genericMatch(a.toOMInputStream(), b, c, d)
		}, createInstance: function () {
			var a = k(this);
			a.initialize();
			a.matchAll = function (a, b) {
				this.input =
					a.toOMInputStream();
				return this._a(b)
			};
			return a
		}
	}, q = k(f, {
		nl: function () {
			return function () {
				switch (this._a("any")) {
					case "\r\n":
						return "\r\n";
					case "\r":
						return "\r";
					case "\n":
						return "\n";
					default:
						throw g;
				}
			}.call(this)
		}, escPipe: function () {
			this._awa("exact", "\\");
			return this._awa("exact", "|")
		}, cell: function () {
			var a;
			return this._or(function () {
				return function () {
					return a = this._consumedBy(function () {
						return this._many1(function () {
							return function () {
								this._not(function () {
									return this._a("nl")
								});
								this._not(function () {
									return this._awa("exact",
										"|")
								});
								return this._or(function () {
									return this._a("escPipe")
								}, function () {
									return this._a("any")
								})
							}.call(this)
						})
					})
				}.call(this)
			}, function () {
				return function () {
					this._lookahead(function () {
						return this._awa("exact", "|")
					});
					return ""
				}.call(this)
			})
		}, row: function () {
			var a, b;
			return function () {
				this._opt(function () {
					return this._awa("exact", "|")
				});
				a = this._a("cell");
				b = this._many1(function () {
					this._awa("exact", "|");
					return this._a("cell")
				});
				this._opt(function () {
					return this._awa("exact", "|")
				});
				return [a].concat(b)
			}.call(this)
		},
		inside: function () {
			return this._or(function () {
				return function () {
					switch (this._a("any")) {
						case ":":
							return function () {
								this._many(function () {
									return this._awa("exact", "-")
								});
								this._awa("exact", ":");
								return "center"
							}.call(this);
						default:
							throw g;
					}
				}.call(this)
			}, function () {
				return function () {
					this._many1(function () {
						return this._awa("exact", "-")
					});
					this._awa("exact", ":");
					return "right"
				}.call(this)
			}, function () {
				return function () {
					this._opt(function () {
						return this._awa("exact", ":")
					});
					this._many1(function () {
						return this._awa("exact",
							"-")
					});
					return "left"
				}.call(this)
			})
		}, acell: function () {
			var a;
			return function () {
				this._many(function () {
					return this._a("ws")
				});
				a = this._a("inside");
				this._many(function () {
					return this._a("ws")
				});
				return a
			}.call(this)
		}, alignRow: function () {
			var a, b;
			return function () {
				this._opt(function () {
					return this._awa("exact", "|")
				});
				a = this._a("acell");
				b = this._many1(function () {
					this._awa("exact", "|");
					return this._a("acell")
				});
				this._opt(function () {
					return this._awa("exact", "|")
				});
				return {align: [a].concat(b)}
			}.call(this)
		}, rows: function () {
			var a,
				b, c;
			return this._or(function () {
				return function () {
					a = this._a("row");
					this._a("nl");
					b = this._a("alignRow");
					c = this._many1(function () {
						this._a("nl");
						return this._a("row")
					});
					return [a, b].concat(c)
				}.call(this)
			}, function () {
				return function () {
					a = this._a("row");
					c = this._many1(function () {
						this._a("nl");
						return this._a("row")
					});
					return [a].concat(c)
				}.call(this)
			})
		}, table: function () {
			var a = this._a("rows");
			this._a("end");
			return a
		}
	});
	f = k(f, {
		nl: function () {
			return function () {
				switch (this._a("any")) {
					case "\r\n":
						return "\r\n";
					case "\r":
						return "\r";
					case "\n":
						return "\n";
					default:
						throw g;
				}
			}.call(this)
		}, stop: function () {
			return this._awa("token", "|}")
		}, line: function () {
			var a;
			return function () {
				a = this._consumedBy(function () {
					return this._many(function () {
						return function () {
							this._not(function () {
								return this._a("nl")
							});
							return this._a("any")
						}.call(this)
					})
				});
				this._opt(function () {
					return this._a("nl")
				});
				return a
			}.call(this)
		}, caption: function () {
			this._awa("token", "|+");
			return this._a("line")
		}, attrVal: function () {
			var a;
			return this._or(function () {
				return function () {
					switch (this._a("any")) {
						case "'":
							return function () {
								a =
									this._consumedBy(function () {
										return this._many1(function () {
											return function () {
												this._not(function () {
													return this._awa("exact", "'")
												});
												return this._a("any")
											}.call(this)
										})
									});
								this._awa("exact", "'");
								return a
							}.call(this);
						case '"':
							return function () {
								a = this._consumedBy(function () {
									return this._many1(function () {
										return function () {
											this._not(function () {
												return this._awa("exact", '"')
											});
											return this._a("any")
										}.call(this)
									})
								});
								this._awa("exact", '"');
								return a
							}.call(this);
						default:
							throw g;
					}
				}.call(this)
			}, function () {
				return function () {
					return a =
						this._consumedBy(function () {
							return this._many1(function () {
								return function () {
									this._not(function () {
										return this._or(function () {
											a:switch (this._a("any")) {
												case "|":
													break a;
												default:
													throw g;
											}
											return "|"
										}, function () {
											return this._a("ws")
										}, function () {
											return this._a("nl")
										})
									});
									return this._a("any")
								}.call(this)
							})
						})
				}.call(this)
			})
		}, attrName: function () {
			var a;
			return function () {
				a = this._consumedBy(function () {
					return this._many1(function () {
						return this._or(function () {
							return this._a("letter")
						}, function () {
							a:switch (this._a("any")) {
								case "-":
									break a;
								default:
									throw g;
							}
							return "-"
						})
					})
				});
				this._awa("exact", "=");
				return a
			}.call(this)
		}, attr: function () {
			var a, b;
			return function () {
				this._many(function () {
					return this._a("ws")
				});
				a = this._a("attrName");
				b = this._a("attrVal");
				this._many(function () {
					return this._a("ws")
				});
				return [a, b]
			}.call(this)
		}, cellStyle: function () {
			var a;
			return function () {
				a = this._many1(function () {
					return this._a("attr")
				});
				this._awa("exact", "|");
				this._many(function () {
					return this._a("ws")
				});
				return a
			}.call(this)
		}, rowSep: function () {
			var a;
			return this._xor("WikiTableParser.rowSep",
				function () {
					return function () {
						this._awa("token", "|-");
						a = this._many(function () {
							return this._a("attr")
						});
						this._a("nl");
						return a
					}.call(this)
				}, function () {
					return this._form(function () {
					})
				})
		}, nlPiped: function () {
			this._a("nl");
			a:switch (this._a("any")) {
				case "|":
					var a = "|";
					break a;
				case "!":
					a = "!";
					break a;
				default:
					throw g;
			}
			return a
		}, cellStart: function () {
			a:switch (this._a("any")) {
				case "|":
					var a = "|";
					break a;
				case "!":
					a = "!";
					break a;
				default:
					throw g;
			}
			return "!" == a
		}, cell: function () {
			var a, b, c;
			return function () {
				this._not(function () {
					return this._or(function () {
							return this._a("stop")
						},
						function () {
							return this._a("rowSep")
						})
				});
				a = this._a("cellStart");
				this._many(function () {
					return this._a("ws")
				});
				b = this._opt(function () {
					return this._a("cellStyle")
				});
				c = this._consumedBy(function () {
					return this._many(function () {
						return function () {
							this._not(function () {
								return this._or(function () {
									return this._a("nlPiped")
								}, function () {
									return this._awa("token", "||")
								}, function () {
									return this._awa("token", "!!")
								})
							});
							return this._a("any")
						}.call(this)
					})
				});
				this._many(function () {
					return this._a("ws")
				});
				return {
					is_header: a,
					val: c, attr: b || []
				}
			}.call(this)
		}, row: function () {
			var a, b, c;
			return function () {
				a = this._opt(function () {
					return this._a("rowSep")
				});
				b = this._a("cell");
				c = this._many(function () {
					return function () {
						this._or(function () {
							return this._a("nl")
						}, function () {
							a:switch (this._a("any")) {
								case "|":
									var a = "|";
									break a;
								case "!":
									a = "!";
									break a;
								default:
									throw g;
							}
							return a
						});
						return this._a("cell")
					}.call(this)
				});
				return {attr: a || [], cells: [b].concat(c)}
			}.call(this)
		}, tail: function () {
			this._a("stop");
			return this._a("end")
		}, head: function () {
			var a;
			return function () {
				this._awa("token", "{|");
				a = this._many(function () {
					return this._a("attr")
				});
				this._a("nl");
				return a
			}.call(this)
		}, table: function () {
			var a, b, c;
			return function () {
				this._many(function () {
					return this._a("ws")
				});
				a = this._a("head");
				b = this._opt(function () {
					return this._a("caption")
				});
				c = this._many1(function () {
					return this._a("row")
				});
				this._opt(function () {
					return this._a("rowSep")
				});
				this._a("tail");
				return {tableAttr: a, caption: b || "", rows: c}
			}.call(this)
		}
	});
	var t = {markdown: q, wiki: f};
	return function (a, b) {
		return t[b].matchAll(a.trim(),
			"table", void 0, function (a, b) {
			}) || null
	}
}();
var wcwidth = function () {
	function a(a, d) {
		if (0 === a) return d.nul;
		if (32 > a || 127 <= a && 160 > a) return d.control;
		a:{
			d = 0;
			var b = m.length - 1;
			if (!(a < m[0][0] || a > m[b][1])) for (; b >= d;) {
				var e = Math.floor((d + b) / 2);
				if (a > m[e][1]) d = e + 1; else if (a < m[e][0]) b = e - 1; else {
					d = !0;
					break a
				}
			}
			d = !1
		}
		return d ? 0 : 1 + (4352 <= a && (4447 >= a || 9001 == a || 9002 == a || 11904 <= a && 42191 >= a && 12351 != a || 44032 <= a && 55203 >= a || 63744 <= a && 64255 >= a || 65040 <= a && 65049 >= a || 65072 <= a && 65135 >= a || 65280 <= a && 65376 >= a || 65504 <= a && 65510 >= a || 131072 <= a && 196605 >= a || 196608 <= a && 262141 >= a))
	}

	var m = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765,
			2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141,
			4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286,
			64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531], [68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]],
		e = {nul: 0, control: 0};
	return function (b) {
		a:{
			var d = 0;
			if ("string" !== typeof b) b = a(b, e); else {
				for (var c = 0; c < b.length; c++) {
					var g = b.charCodeAt(c);
					if (55296 <= g && 56319 >= g) {
						var k = b.charCodeAt(++c);
						56320 <= k && 57343 >= k ? g = 1024 * (g - 55296) + (k - 56320) + 65536 : c--
					}
					g =
						a(g, e);
					if (0 > g) {
						b = -1;
						break a
					}
					d += g
				}
				b = d
			}
		}
		return b
	}
}();
var GlobalMessageHub = $.observable({}), GlobalEvents = {STOP_EDITING_TABLE: "STOP_EDITING_TABLE"}, Keys = {
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	ALT: 18,
	ESC: 27,
	END: 35,
	HOME: 36,
	ARROW_LEFT: 37,
	ARROW_UP: 38,
	ARROW_RIGHT: 39,
	ARROW_DOWN: 40,
	DEL: 46,
	WIN: 91,
	RIGHT_ALT: 225
};
Array.max = function (a) {
	return Math.max.apply(Math, a)
};
Array.prototype.map || (Array.prototype.map = function (a) {
	if (void 0 === this || null === this) throw new TypeError;
	var m = Object(this), e = m.length >>> 0;
	if ("function" !== typeof a) throw new TypeError;
	for (var b = Array(e), d = 2 <= arguments.length ? arguments[1] : void 0, c = 0; c < e; c++) c in m && (b[c] = a.call(d, m[c], c, m));
	return b
});
Array.prototype.indexOf || (Array.prototype.indexOf = function (a, m) {
	if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');
	var e = this.length >>> 0;
	m = +m || 0;
	Infinity === Math.abs(m) && (m = 0);
	0 > m && (m += e, 0 > m && (m = 0));
	for (; m < e; m++) if (this[m] === a) return m;
	return -1
});
Array.prototype.diff = function (a) {
	return this.filter(function (m) {
		return 0 > a.indexOf(m)
	})
};
var htmlEncode = function () {
	function a(a) {
		return m[a] || a
	}

	var m = {"&": "&amp;", "<": "&lt;", ">": "&gt;"};
	return function (e) {
		return e.replace(/[&<>]/g, a)
	}
}(), htmlSubsetEncode = function () {
	function a(a) {
		return b[a] || a
	}

	function m(a) {
		return a.match(/(em)|(strong)|(a)|(br)/gi)
	}

	function e(b, c, g) {
		var d = [];
		if (!b) return d;
		g || (g = m);
		var f = b.childNodes.length;
		if (1 <= f) for (var q = 0; q < f; ++q) {
			var t = e(b.childNodes[q], !1, g);
			d = d.concat(t)
		} else d.push(b.textContent.replace(/[&<>]/g, a));
		b = b.nodeName;
		c || "#text" == b || (c = (g = g(b)) ? "<" :
			"&lt;", g = g ? ">" : "&gt;", d.splice(0, 0, c + b + g), c = b.match(/(br)/ig) ? "" : c + "/" + b + g, d.push(c));
		return d
	}

	var b = {"&": "&amp;", "<": "&lt;", ">": "&gt;"};
	return function (a, b) {
		var c = document.createElement("div");
		c.innerHTML = a.trim();
		return e(c, !0, b).join("")
	}
}(), htmlToHtmlSubset = function () {
	function a(a) {
		return a.match(/(em)|(strong)|(a)|(div)|(br)/gi)
	}

	return function (m) {
		m = htmlSubsetEncode(m, a);
		return m = m.replace(/(<div>(?!<br>))/ig, "<br>").replace(/<\/?div>/ig, "")
	}
}(), htmlDecode = function () {
	var a = $("<div>");
	return function (m) {
		return m ?
			a.html(m).text() : ""
	}
}();

function textToHTML(a) {
	return String(a).split("\n").map(htmlEncode).join("<br>").replace(/[ ]{2,}/g, function (a) {
		var e = [];
		for (a = a.length - 1; 0 <= a; --a) e.push("&nbsp;");
		return e.join("")
	}).replace(/<br>[ ]/g, "<br>&nbsp;")
}

function textToHTMLSubset(a) {
	a = String(a).split("\n").join("<br>");
	return htmlSubsetEncode(a)
}

var preventDefault = function (a) {
	a.preventDefault()
}, ZeroWidthSpace = "\u200b", Utils = Utils || {};
(function () {
	function a(a, b) {
		for (var c = [], d = 0; d < b; ++d) c.push(a);
		return c
	}

	function m(a, b) {
		var c = "", d = !0;
		b = b || "";
		for (var e = 0; e < a.length; ++e) d ? d = !1 : c += b, c += a[e];
		return c
	}

	function e(a) {
		if (void 0 == a) return "";
		var b = [], c;
		for (c in a) if (a.hasOwnProperty(c)) {
			var d = a[c];
			void 0 != d ? b.push(c.toString() + '="' + d.toString() + '"') : b.push(c.toString())
		}
		return 0 < b.length ? " " + b.join(" ") : ""
	}

	window.console || (window.console = {});
	window.console.log || (window.console.log = function () {
	});
	var b = function (a) {
		a = Number(a).toString(16);
		return 1 == a.length ? "0" + a : a
	}, d = /rgb\(([\d\s,.]+)\)/i;
	Utils.join_strings = function (a, b, d) {
		d = void 0 === d ? {} : d;
		var c = d.suffix || "", e = d.max_line_length || 120, g = d.lines_separator || "\n", k = d.prefix || "",
			m = k.length;
		a.forEach(function (c, d) {
			d = d + 1 < a.length ? b : "";
			m + c.length + d.length > e && (k += g, m = Math.max(0, g.length - 1));
			k += c + d;
			m += c.length + d.length
		});
		m + c.length > e && (k += g);
		return k += c
	};
	Utils.range = function (a, b, d) {
		var c = [];
		a = parseInt(a);
		if (!isNaN(a)) if (void 0 == b && (b = a, a = 0), void 0 == d && (d = 1), 0 < d) for (; a < b; a += d) c.push(a); else if (0 >
			d) for (; a > b; a += d) c.push(a);
		return c
	};
	Utils.repeat = a;
	Utils.join = m;
	Utils.ljust = function (b, d) {
		return b + m(a(" ", Math.max(0, d - b.length)))
	};
	Utils.freq_call_filter = function (a, b) {
		var c = (new Date).getTime();
		return function () {
			var d = (new Date).getTime(), e = d - c;
			c = d;
			e > b && a.apply(null, arguments)
		}
	};
	Utils.select_text = function (a) {
		var b = document;
		a = b.getElementById(a);
		if (b.body.createTextRange) b = b.body.createTextRange(), b.moveToElementText(a), b.select(); else if (window.getSelection) {
			var c = window.getSelection();
			b = b.createRange();
			b.selectNodeContents(a);
			c.removeAllRanges();
			c.addRange(b)
		}
	};
	Utils.format_attr = e;
	Utils.format_tag = function (a, b, d) {
		return "<" + a + e(d) + ">" + b + "</" + a + ">"
	};
	Utils.is_ctrl_key_combo = function (a, b) {
		return (a.ctrlKey || a.metaKey) && String.fromCharCode(a.which).toLowerCase() == b.toLowerCase()
	};
	Utils.get_compact_color_value = function (a) {
		var c = ("" + a).match(d);
		if (c && (c = c[1].split(/\s*,\s*/), 3 == c.length)) {
			a = b(c[0]);
			var e = b(c[1]);
			c = b(c[2]);
			return a[0] == a[1] && e[0] == e[1] && c[0] == c[1] ? ("#" + a[0] + e[0] + c[0]).toUpperCase() : ("#" +
				a + e + c).toUpperCase()
		}
		return a
	};
	Utils.normalize_json_string = function (a) {
		a = a.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
		return a = a.replace(/[\u0000-\u0019]+/g, "")
	}
})();
var PasteHelper = function () {
	function a() {
		c || (f = $("<div>", {contenteditable: !0}), f.css({
			position: "absolute",
			left: "0px",
			top: "0px",
			width: "1px",
			height: "1x",
			overflow: "hidden",
			"user-select": "text"
		}), f.on("paste", function (a) {
			return e(a.originalEvent, m)
		}), f.appendTo($("body")), c = !0)
	}

	function m() {
		f.html("").hide();
		window.scrollTo(k.left, k.top)
	}

	function e(a, c) {
		c = void 0 === c ? null : c;
		if (a && a.clipboardData && a.clipboardData.types && a.clipboardData.getData) {
			var e = a.clipboardData.types;
			if (e instanceof DOMStringList &&
				e.contains("text/html") || e.indexOf && -1 !== e.indexOf("text/html")) return c = a.clipboardData.getData("text/html"), e = a.clipboardData.getData("text/plain"), a.stopPropagation(), a.preventDefault(), d && (d(c, e), d = null), !1
		}
		b(a.target || a.srcElement, 1, c);
		return !0
	}

	function b(a, c, e) {
		if (a.childNodes && 0 < a.childNodes.length) {
			var f = a.innerHTML, k = a.innerText;
			e && e();
			g = null;
			d && (d(f, k), d = null)
		} else g = 150 > c ? setTimeout(function () {
			b(a, 2 * c, e)
		}, c) : null
	}

	var d = null, c = !1, g = null, k = null, f = null;
	return {
		start: function (b) {
			d = b;
			a();
			k = {
				left: window.scrollX,
				top: window.scrollY
			};
			f.css({left: window.scrollX + "px", top: window.scrollY + "px"});
			null != g && (window.clearTimeout(g), g = null);
			f.show();
			f.focus()
		}, handleDirectly: function (a, b) {
			d = b;
			var c = a.target || a.srcElement;
			e(a, function () {
				c.innerHTML = ""
			})
		}
	}
}();
var TableImport = TableImport || {};
(function () {
	function a(a) {
		var b = w(a), c = [];
		$(a).find("tr").each(function (a, d) {
			var e = w(d, b), f = [];
			$(d).find("td,th").each(function (b, d) {
				if (0 < a) for (b = c[c.length - 1]; f.length < b.length && 1 < b[f.length].rowspan;) {
					var g = b[f.length];
					f.push({value: "", style: g.style, colspan: 0, rowspan: g.rowspan - 1})
				}
				g = A(d, e);
				b = parseInt($(d).attr("colspan") || 1);
				var k = parseInt($(d).attr("rowspan") || 1), q = [], p = [];
				Markup.forEachLeafCharInNode(d, function (a, b, c) {
					q.push(a);
					p.push(c)
				});
				d = {
					value: q.join(""), style: g, per_char_markup: p, colspan: b,
					rowspan: k
				};
				f.push(d);
				if (1 < b) for (d = {value: "", style: g, colspan: 0, rowspan: k}, g = 1; g < b; ++g) f.push(d)
			});
			if (0 < a) for (d = c[c.length - 1]; f.length < d.length && 1 < d[f.length].rowspan;) {
				var g = d[f.length];
				f.push({value: "", style: g.style, colspan: 0, rowspan: g.rowspan - 1})
			}
			c.push(f)
		});
		return c
	}

	function m(a, b) {
		var c = [];
		a = a.trim();
		if (/<\w+[^>]*>/gi.test(a)) try {
			a = $(a).text()
		} catch (G) {
			a = a.replace(/(<([^>]+)>)/ig, "")
		}
		0 < a.length && (b = b ? /\s{1,}\t*|\t\s*/ : /\s{2,}\t*|\t\s*/, c = a.trim().split(b));
		return c
	}

	function e(a, b) {
		var c = [];
		a.forEach(function (a) {
			a =
				m(a, b);
			0 < a.length && c.push(a)
		});
		return c
	}

	function b(a) {
		if (0 == a.length) return {max: 0, min: 0};
		var b = a[0].length, c = b;
		a.forEach(function (a) {
			b = Math.max(b, a.length);
			c = Math.min(c, a.length)
		});
		return {max: b, min: c}
	}

	function d(b, c) {
		c = void 0 === c ? !1 : c;
		var d = null, e = document.createElement("iframe");
		if (e) {
			e.src = "javascript:undefined;";
			document.body.appendChild(e);
			var f = e.contentWindow.document;
			f.write(b);
			f.close();
			b = f.getElementsByTagName("table");
			1 <= b.length && (b = b[0], d = a(b), c && (v(e.contentWindow, b), c = document.adoptNode(b),
				d = [d, c]));
			document.body.removeChild(e)
		}
		return d
	}

	function c(a, b, c) {
		c = void 0 === c ? !1 : c;
		var d = [B, x, y];
		a = [a, b];
		for (var e = 0; e < a.length; ++e) for (var g = (a[e] || "").split(/\r?\n/).join(" "), k = 0; k < d.length; ++k) {
			var p = (0, d[k])(g, c);
			if (p) return p
		}
		d = [f, q];
		for (a = 0; a < d.length; ++a) if (e = d[a](b)) return x(e, c);
		return null
	}

	function g(a, c) {
		var d = [];
		c ? d = (c || "").split(/\r?\n/) : (a = $("<div>" + a + "</div>"), 0 < a.find("div").length ? a.find("div").each(function (a, b) {
			d.push($(b).text())
		}) : (a = a.html(), a = a.replace(/<br\/?>/ig, "\n"), a =
			a.replace(/&nbsp;/g, " "), d = (a || "").split(/\r?\n/)));
		a = e(d, !1);
		if (1 == b(a).max && 1 < a.length) {
			c = e(d, !0);
			var f = b(c);
			f.min == f.max && 1 < f.min && (a = c)
		}
		return a
	}

	function k(a) {
		a = ParseTable(a, "markdown");
		var b = null;
		a && (b = [], a.forEach(function (a) {
			a && a.hasOwnProperty("align") || b.push(a)
		}));
		return b
	}

	function f(a) {
		if (a = ParseTable(a.trim(), "markdown")) {
			var b = [], c = [];
			a.forEach(function (a, b) {
				a.hasOwnProperty("align") && (c = a.align)
			});
			a.forEach(function (a, d) {
				if (!a.hasOwnProperty("align")) {
					var e = 0 == d ? "th" : "td";
					a = a.map(function (a,
															b) {
						return "<" + e + (c.length > b ? ' style="text-align: ' + c[b] + ';"' : "") + ">" + a.trim() + "</" + e + ">"
					}).join("");
					b.push("<tr>" + a + "</tr>")
				}
			});
			return "<table>" + b.join("") + "</table>"
		}
		return null
	}

	function q(a) {
		a = ParseTable(a.trim(), "wiki");
		var b = function (a) {
			if (!a) return "";
			for (var b = [], c = 0; c < a.length; ++c) {
				var d = $jscomp.makeIterator(a[c]), e = d.next().value;
				d = d.next().value;
				-1 != "colspan|rowspan|style".indexOf(e) && b.push(e + '="' + d + '"')
			}
			return b.join(" ")
		};
		if (a && a.rows) {
			var c = [];
			a.rows.forEach(function (a, d) {
				d = a.cells.map(function (a,
																	c) {
					c = b(a.attr);
					var d = a.val.trim();
					a = a.is_header ? "th" : "td";
					return "<" + a + " " + c + ">" + d + "</" + a + ">"
				}).join("");
				a = b(a.attr);
				c.push("<tr " + a + ">" + d + "</tr>")
			});
			var d = c.join("");
			return "<table " + b(a.tableAttr) + ">" + d + "</table>"
		}
		return null
	}

	var t = function (a) {
			return !a || -1 !== (a || "").indexOf("none")
		}, p = function (a) {
			return !a || (a || "").match(/(rgba?\([0\s,]+\))|(transparent)/i)
		}, r = function (a, b, c) {
			b = void 0 === b ? t : b;
			c = void 0 === c ? null : c;
			return function (d, e, f) {
				d = d[a];
				var g = b(d);
				f[a] = g ? e[a] : c ? c(d) : d
			}
		}, u = [r("background-color",
		p, Utils.get_compact_color_value), r("color", p, Utils.get_compact_color_value), r("font-style"), r("font-weight"), r("text-align"), r("text-decoration"), r("vertical-align")],
		w = function (a, b) {
			b = void 0 === b ? {} : b;
			var c = {}, d = a.ownerDocument.defaultView;
			if (d && d.getComputedStyle) {
				var e = d.getComputedStyle(a);
				u.forEach(function (a) {
					return a(e, b, c)
				})
			}
			return c
		}, A = function (a, b) {
			b = void 0 === b ? {} : b;
			b = w(a, b);
			for (a = a.firstChild; a && 1 === a.nodeType;) b = w(a, b), a = a.firstChild;
			return b
		}, v = function (a, b) {
			if (a.getComputedStyle && b.dataset) {
				var c =
					a.getComputedStyle(b, null), d = {}, e;
				"" != (e = c.getPropertyValue("background-color")) && (d.backgroundColor = Utils.get_compact_color_value(e));
				e == c.getPropertyValue("color") != "" && (d.color = Utils.get_compact_color_value(e));
				e == c.getPropertyValue("font-style") != "" && (d.fontStyle = e);
				e == c.getPropertyValue("font-weight") != "" && (d.fontWeight = e);
				e == c.getPropertyValue("text-align") != "" && (d.textAlign = e);
				e == c.getPropertyValue("text-decoration") != "" && (d.textDecoration = e);
				e == c.getPropertyValue("vertical-align") != "" && (d.verticalAlign =
					e);
				b.dataset.computedStyle = JSON.stringify(d);
				b = $jscomp.makeIterator(b.childNodes);
				for (c = b.next(); !c.done; c = b.next()) c = c.value, 1 === c.nodeType && v(a, c)
			}
		}, B = function (a, b) {
			b = void 0 === b ? !1 : b;
			return (a = a.match(/<html[\s\S]*?>[\s\S]*?<\/html>/i)) ? d(a[0], b) : null
		}, x = function (a, b) {
			b = void 0 === b ? !1 : b;
			var c = a.match(/<table[\s\S]*?>[\s\S]*?<\/table>/i);
			return c ? (a = a.substring(0, c.index), c = c[0], a = a.match(/<style[\s\S]*?>[\s\S]*?<\/style>/i), d('<!doctype html><html>\n                                <head><meta charset="utf-8"></head>\n                                <body>' +
				(a ? a[0] : "") + c + "</body>\n                              </html>", b)) : null
		}, y = function (a, b) {
			b = void 0 === b ? !1 : b;
			var c = a.match(/<tr[\s\S]*?>[\s\S]*<\/tr>/i);
			return c ? (a = a.substring(0, c.index), c = c[0], a = a.match(/<style[\s\S]*?>[\s\S]*?<\/style>/i), d('<!doctype html><html>\n                                <head><meta charset="utf-8"></head>\n                                <body>' + (a ? a[0] : "") + "\n                                <table>" + c + "</table></body>\n                              </html>", b)) : null
		};
	TableImport.extractTableFromString =
		function (a, b) {
			return c(a, b) || k(b) || g(a, b)
		};
	TableImport.extractCellsFromString = m;
	TableImport.extractTableFromTableElement = c
})();
var TableModel = function () {
	function a(a) {
		this.value_ = a || "";
		this.rowspan_ = this.colspan_ = 1;
		this.per_char_markup_ids_ = [];
		a = this.value_.length;
		this.per_char_markup_ids_.length = a;
		for (var b = 0; b < a; ++b) this.per_char_markup_ids_[b] = 0;
		$.observable(this)
	}

	function m(a) {
		for (var b = [], c = 0, e = a.length, k = 0; k < e; ++k) if (k + 1 == e || a[k + 1] != a[k]) b.push(a[k]), b.push(k - c + 1), c = k + 1;
		return b
	}

	function e() {
		this.rows = [];
		this.col_count = this.row_count = 0;
		$.observable(this)
	}

	a.prototype.value = function () {
		if (1 <= arguments.length) {
			var a = this.value_;
			this.value_ = arguments[0];
			var d = this.value_.length;
			if (2 <= arguments.length && arguments[1]) {
				var c = arguments[1];
				if (c.length < d) {
					console.error("Too few markup ids");
					for (var e = c.length; e < d; ++e) c.push(c[0])
				}
				this.per_char_markup_ids_ = c.slice()
			} else for (this.per_char_markup_ids_.length = d, e = 0; e < d; ++e) this.per_char_markup_ids_[e] = 0;
			this.trigger("value_change", this.value_, a, this.per_char_markup_ids_);
			return a
		}
		return this.value_
	};
	a.prototype.colspan = function (a) {
		if (0 < arguments.length) {
			var b = this.colspan_;
			this.colspan_ =
				arguments[0];
			this.trigger("colspan_change", this.colspan_, b);
			return b
		}
		return this.colspan_
	};
	a.prototype.rowspan = function (a) {
		if (0 < arguments.length) {
			var b = this.rowspan_;
			this.rowspan_ = arguments[0];
			this.trigger("rowspan_change", this.rowspan_, b);
			return b
		}
		return this.rowspan_
	};
	a.create = function (b) {
		var d = new a;
		d.value(b);
		return d
	};
	a.prototype.isVisible = function () {
		return 0 < this.colspan() && 0 < this.rowspan()
	};
	a.prototype.setMarkupToDefault = function () {
		for (var a = this.per_char_markup_ids_, d = 0, c = a.length; d < c; ++d) a[d] =
			0
	};
	a.prototype.dump = function () {
		return {value: this.value(), cspan: this.colspan(), rspan: this.rowspan(), markup: m(this.per_char_markup_ids_)}
	};
	a.prototype.dumpTransposed = function () {
		return {value: this.value(), cspan: this.rowspan(), rspan: this.colspan(), markup: m(this.per_char_markup_ids_)}
	};
	a.prototype.load = function (a, d) {
		var b = void 0;
		if (a.markup) {
			b = a.markup;
			for (var e = [], k = 0; k + 1 < b.length; k += 2) for (var f = b[k], q = b[k + 1], m = 0; m < q; ++m) e.push(f);
			b = e
		}
		this.value(a.value, b);
		d.colspan || this.colspan(a.cspan);
		d.rowspan || this.rowspan(a.rspan)
	};
	e.prototype.dump = function () {
		var a = [];
		this.rows.forEach(function (b, c) {
			b = b.map(function (a) {
				return a.dump()
			});
			a.push(b)
		});
		return {rows: a}
	};
	e.prototype.dumpTransposed = function () {
		for (var a = [], d = 0; d < this.col_count; ++d) {
			for (var c = [], e = 0; e < this.row_count; ++e) c.push(this.rows[e][d].dumpTransposed());
			a.push(c)
		}
		return {rows: a}
	};
	e.prototype.load = function (a, d) {
		if (!a || !a.rows) throw"Invalid data format: rows expected";
		a = a.rows;
		var b = a[0].length;
		this.resize(1, b);
		for (var e = 0; e < a.length; ++e) {
			this.row_count <= e && this.insertEmptyRow();
			for (var k = a[e], f = this.rows[e], q = 0; q < b; ++q) f[q].load(k[q], d)
		}
	};
	e.prototype.insertRow = function (b, d) {
		if (0 != this.col_count && b.length != this.col_count) throw Error("Invalid number of cells in cells_data");
		void 0 == d && (d = this.row_count);
		if (d < this.row_count) for (var c = this.col_count - 1; 0 <= c; --c) this.splitCell(d, c);
		var e = [];
		c = 0;
		for (var k = b.length; c < k; ++c) e.push(new a(b[c]));
		this.rows.splice(d, 0, e);
		this.row_count += 1;
		this.col_count = e.length;
		this.trigger("row_inserted", d, e);
		this.trigger("state_change")
	};
	e.prototype.insertColumn =
		function (b, d, c) {
			var e = (b || c).length;
			if (0 != this.row_count && e != this.row_count) throw Error("Invalid number of cells in inserted column");
			void 0 == d && (d = this.col_count);
			if (d < this.col_count) {
				e = !1;
				for (var k = 0; k < this.row_count; ++k) 0 > this.rows[k][d].colspan() && (e = !0);
				if (e) for (k = this.row_count - 1; 0 <= k; --k) this.splitCell(k, d)
			}
			var f = [], q = 0;
			this.rows.forEach(function (e, g) {
				g = c ? c[g] : new a(b[g]);
				e.splice(d, 0, g);
				f.push(g);
				++q
			});
			this.col_count += 1;
			this.row_count = q;
			this.trigger("column_inserted", d, f);
			this.trigger("state_change")
		};
	e.prototype.insertEmptyColumn = function (a) {
		var b = this.rows.map(function () {
			return ""
		});
		this.insertColumn(b, a)
	};
	e.prototype.insertEmptyRow = function (a) {
		for (var b = [], c = 0, e = this.rows[0].length; c < e; ++c) b.push("");
		this.insertRow(b, a)
	};
	e.prototype.removeRow = function (a) {
		if (0 > a || a >= this.row_count) throw Error("Index out of bounds: " + a);
		if (1 != this.row_count) {
			for (var b = this.col_count - 1; 0 <= b; --b) this.splitCell(a, b);
			b = this.rows[a];
			this.rows.splice(a, 1);
			--this.row_count;
			this.trigger("row_removed", a, b);
			this.trigger("state_change")
		}
	};
	e.prototype.removeColumn = function (a) {
		if (0 > a || a >= this.col_count) throw Error("Index out of bounds: " + a);
		if (1 != this.col_count) {
			for (var b = [], c = this.row_count - 1; 0 <= c; --c) {
				this.splitCell(c, a);
				var e = this.rows[c];
				b.push(e[a]);
				e.splice(a, 1)
			}
			--this.col_count;
			b.reverse();
			this.trigger("column_removed", a, b);
			this.trigger("state_change");
			return b
		}
	};
	e.prototype.moveColumn = function (a, d) {
		var b = this.removeColumn(a);
		d > a && --d;
		this.insertColumn(null, d, b)
	};
	e.prototype.forEachCellInRow = function (a, d) {
		if (0 > a || a >= this.row_count) throw Error("Index out of bounds: " +
			a);
		this.rows[a].forEach(d)
	};
	e.prototype.forEachCellInColumn = function (a, d) {
		if (0 > a || a >= this.col_count) throw Error("Index out of bounds: " + a);
		for (var b = 0; b < this.row_count; ++b) d(this.rows[b][a], b)
	};
	e.prototype.forEachCellInRange = function (a, d, c, e, k) {
		for (; a <= c; ++a) for (var b = this.rows[a], g = d; g <= e; ++g) k(b[g], a, g)
	};
	e.prototype.forEachCell = function (a) {
		this.forEachCellInRange(0, 0, this.row_count - 1, this.col_count - 1, a)
	};
	e.prototype.getVisibleCellPos = function (a, d) {
		var b = this.getCell(a, d, !0);
		0 > b.rowspan() && (a += b.rowspan());
		0 > b.colspan() && (d += b.colspan());
		return {row: a, col: d}
	};
	e.prototype.getColumn = function (a) {
		var b = [];
		this.forEachCellInColumn(a, function (a) {
			b.push(a)
		});
		return b
	};
	e.prototype.getCell = function (a, d, c) {
		if (0 > a || a >= this.row_count) throw Error("Row index out of bounds: " + a);
		if (0 > d || d >= this.col_count) throw Error("Index out of bounds: " + d);
		var b = this.rows[a][d];
		b.isVisible() || c || (b = this.rows[a + Math.min(b.rowspan(), 0)][d + Math.min(b.colspan(), 0)]);
		return b
	};
	e.prototype.mergeCells = function (a, d, c, e) {
		var b = e - d + 1, f = c -
			a + 1;
		if (!(1 >= b && 1 >= f)) {
			for (var g = a; g <= c; ++g) {
				for (var m = d; m <= e; ++m) this.splitCell(g, m);
				var p = this.rows[g];
				for (m = d; m <= e; ++m) {
					var r = p[m];
					m == d ? r.colspan(b) : r.colspan(d - m);
					g == a ? r.rowspan(f) : r.rowspan(a - g)
				}
			}
			this.trigger("state_change")
		}
	};
	e.prototype.splitCell = function (a, d) {
		var b = this.rows[a][d], e = b.colspan(), k = b.rowspan();
		if (0 > e || 0 > k) 0 > e && (d += e), 0 > k && (a += k), this.splitCell(a, d); else if (1 < e || 1 < k) for (var f = a; f < a + k; ++f) for (var q = d; q < d + e; ++q) b = this.rows[f][q], b.colspan(1), b.rowspan(1);
		this.trigger("state_change")
	};
	e.prototype.resize = function (a, d) {
		void 0 == a && (a = this.row_count);
		void 0 == d && (d = this.col_count);
		if (0 >= d || 0 >= a) throw Error("Illegal arguments - row_count: " + a + " col_count: " + d);
		var b = {row_count: this.row_count, col_count: this.col_count}, e = {row_count: a, col_count: d};
		this.trigger("before_resize", b, e);
		var k = d - this.col_count;
		if (0 < k) for (d = 0; d < k; ++d) this.insertEmptyColumn(); else if (0 > k) for (d = 0; d < -k; ++d) this.removeColumn(this.col_count - 1);
		a -= this.row_count;
		if (0 < a) for (d = 0; d < a; ++d) this.insertEmptyRow(); else if (0 >
			a) for (d = 0; d < -a; ++d) this.removeRow(this.row_count - 1);
		this.trigger("after_resize", b, e)
	};
	e.prototype.toString = function () {
		return this.rows.map(function (a) {
			return a.map(function (a) {
				return a.value()
			}).join(", ")
		}).join("\n")
	};
	e.prototype.clear = function () {
		this.rows.forEach(function (a) {
			a.forEach(function (a) {
				a.value("")
			})
		});
		this.trigger("state_change")
	};
	e.prototype.reset = function () {
		for (var a = 0; a < this.row_count; ++a) for (var d = 0; d < this.col_count; ++d) this.splitCell(a, d);
		this.clear()
	};
	e.prototype.setRows = function (a) {
		var b =
			0;
		a.forEach(function (a) {
			b = Math.max(b, a.length)
		});
		this.resize(1, b);
		var c = this;
		a.forEach(function (a) {
			c.insertRow(a)
		});
		this.removeRow(0)
	};
	return e
}();
var CellStyle = function () {
	function a(e) {
		if (null == e || "object" != typeof e) return e;
		if (e instanceof Date) {
			var b = new Date;
			b.setTime(e.getTime());
			return b
		}
		if (e instanceof Array) {
			b = [];
			for (var d = 0, c = e.length; d < c; d++) b[d] = a(e[d]);
			return b
		}
		if (e instanceof Object) {
			b = {};
			for (d in e) e.hasOwnProperty(d) && (b[d] = a(e[d]));
			return b
		}
		throw Error("Unable to copy obj! Its type isn't supported.");
	}

	function m(e) {
		this.cell_dom = e;
		this.borders = "";
		this.font_style = {};
		this.bg_color = this.text_color = "";
		this.padding = a(m.Padding);
		this.border_color =
			"";
		this.mute = !1;
		m.Padding && this.cell_dom.find(".wrap > div").css("margin", m.Padding.top + "px " + m.Padding.right + "px");
		$.observable(this)
	}

	m.FontFamilies = {
		"ff-arial-black": '"Arial Black", Gadget, sans-serif !important;',
		"ff-arial": "Arial, Helvetica, sans-serif !important;",
		"ff-comic-sans-ms": '"Comic Sans MS", cursive, sans-serif !important;',
		"ff-courier-new": '"Courier New", Courier, monospace !important;',
		"ff-georgia": "Georgia, serif !important;",
		"ff-impact": "Impact, Charcoal, sans-serif !important;",
		"ff-lucida-console": '"Lucida Console", Monaco, monospace !important;',
		"ff-lucida-sans": '"Lucida Sans Unicode", "Lucida Grande", sans-serif !important;',
		"ff-palatino-linotype": '"Palatino Linotype", "Book Antiqua", Palatino, serif !important;',
		"ff-serif": "serif !important;",
		"ff-tahoma": "Tahoma, Geneva, sans-serif !important;",
		"ff-times-new-roman": '"Times New Roman", Times, serif !important;',
		"ff-trebuchet-ms": '"Trebuchet MS", Helvetica, sans-serif !important;',
		"ff-verdana": "Verdana, Geneva, sans-serif !important;"
	};
	m.Padding = {top: 10, bottom: 10, left: 5, right: 5};
	m.prototype.dump = function () {
		return {
			borders: this.borders,
			font_style: a(this.font_style),
			text_color: this.text_color,
			bg_color: this.bg_color,
			halign: this.getHorizontalAlign(),
			valign: this.getVerticalAlign(),
			padding: a(this.getPadding()),
			border_color: this.border_color
		}
	};
	m.prototype.toCSS = function () {
		var a = {};
		$.extend(a, this.fontStyleToCSS());
		$.extend(a, this.colorsToCSS());
		$.extend(a, this.textAlignToCSS());
		return a
	};
	m.prototype.load = function (a, b) {
		this.mute = !0;
		var d =
			function (a) {
				b.hasOwnProperty(a) || console.error("Unknown formatting option: " + a);
				return !0 === b[a]
			};
		void 0 != a.borders && d("borders") && this.setBorders(a.borders);
		var c = a.font_style;
		if (void 0 != c && d("font_style")) {
			for (var e in this.font_style) this.font_style.hasOwnProperty(e) && this.removeFontStyle(e);
			for (e in c) c.hasOwnProperty(e) && this.addFontStyle(e, c[e])
		}
		void 0 != a.text_color && d("text_color") && this.setTextColor(a.text_color);
		void 0 != a.bg_color && d("bg_color") && this.setBgColor(a.bg_color);
		void 0 != a.border_color &&
		d("border_color") && this.setBorderColor(a.border_color);
		void 0 != a.halign && this.setHorizontalAlign(a.halign);
		void 0 != a.valign && d("vertical_alignment") && this.setVerticalAlign(a.valign);
		a = a.padding;
		void 0 != a && a.hasOwnProperty("top") && a.hasOwnProperty("right") && this.setPadding(a.top, a.right);
		this.mute = !1;
		this.trigger("state_change")
	};
	m.prototype.maybeTrigger = function (a) {
		1 != this.mute && this.trigger(a)
	};
	m.prototype.setHorizontalAlign = function (a) {
		this.cell_dom.css("text-align", a);
		this.maybeTrigger("state_change")
	};
	m.HorizontalAlignValues = ["left", "center", "right"];
	m.VerticalAlignValues = ["top", "middle", "bottom"];
	m.prototype.getHorizontalAlign = function () {
		var a = this.cell_dom.css("text-align");
		a = Math.max(0, m.HorizontalAlignValues.indexOf(a));
		return m.HorizontalAlignValues[a]
	};
	m.prototype.getVerticalAlign = function () {
		var a = this.cell_dom.css("vertical-align");
		a = Math.max(0, m.VerticalAlignValues.indexOf(a));
		return m.VerticalAlignValues[a]
	};
	m.prototype.setVerticalAlign = function (a) {
		-1 == m.VerticalAlignValues.indexOf(a) &&
		(a = "top");
		this.cell_dom.css("vertical-align", a);
		this.maybeTrigger("state_change")
	};
	m.prototype.textAlignToCSS = function () {
		return {"text-align": this.getHorizontalAlign(), "vertical-align": this.getVerticalAlign()}
	};
	m.prototype.hasTextColor = function () {
		return this.text_color && "transparent" != this.text_color
	};
	m.prototype.setTextColor = function (a) {
		"transparent" == a && (a = "");
		this.text_color = a;
		this.cell_dom.css("color", a);
		this.maybeTrigger("state_change")
	};
	m.prototype.getTextColor = function () {
		return this.text_color
	};
	m.prototype.setPadding = function (a, b, d, c) {
		void 0 == b && (b = a);
		void 0 == d && (d = a);
		void 0 == c && (c = b);
		this.padding = {top: a, right: b, bottom: d, left: c};
		d = m.Padding;
		JSON.stringify(this.padding) !== JSON.stringify(d) && (m.Padding = this.padding, this.cell_dom.parents("table").find(".wrap > div").css("margin", a + "px " + b + "px"), this.maybeTrigger("state_change"), this.trigger("padding_change", this.padding))
	};
	m.prototype.clearPadding = function () {
		this.setPadding(10, 5, 10, 5)
	};
	m.prototype.getPadding = function () {
		return this.padding
	};
	m.prototype.clearTextColor = function () {
		this.cell_dom.css("color", "");
		this.text_color = "";
		this.maybeTrigger("state_change")
	};
	m.prototype.setBgColor = function (a) {
		"transparent" == a && (a = "");
		this.bg_color = a;
		this.cell_dom.css("background-color", a);
		this.maybeTrigger("state_change")
	};
	m.prototype.getBgColor = function () {
		return this.bg_color
	};
	m.prototype.hasBgColor = function () {
		return this.bg_color && "transparent" != this.bg_color
	};
	m.prototype.clearBgColor = function () {
		this.cell_dom.css("background-color", "");
		this.bg_color =
			"";
		this.maybeTrigger("state_change")
	};
	m.prototype.setBorderColor = function (a) {
		"transparent" == a && (a = "");
		this.border_color = a || "inherit";
		this.cell_dom.css("border-color", a);
		this.maybeTrigger("state_change")
	};
	m.prototype.getBorderColor = function () {
		return this.border_color
	};
	m.prototype.hasBorderColor = function () {
		return this.border_color && "transparent" != this.border_color
	};
	m.prototype.clearBorderColor = function () {
		this.cell_dom.css("border-color", "");
		this.border_color = "";
		this.maybeTrigger("state_change")
	};
	m.prototype.colorsToCSS =
		function () {
			var a = {};
			this.bg_color && "transparent" != this.bg_color && (a["background-color"] = this.bg_color);
			this.text_color && "transparent" != this.text_color && (a.color = this.text_color);
			this.border_color && "transparent" != this.border_color && (a["border-color"] = this.border_color);
			return a
		};
	m.prototype.setBorders = function (a) {
		if (!(0 < a.length) || a.match(/^[ltrb]+$/)) {
			var b = {l: "border_l", t: "border_t", r: "border_r", b: "border_b"}, d = this;
			d.borders.split("").forEach(function (a) {
				d.cell_dom.removeClass(b[a])
			});
			d.borders =
				a;
			d.borders.split("").forEach(function (a) {
				d.cell_dom.addClass(b[a])
			});
			this.maybeTrigger("state_change")
		}
	};
	m.prototype.addBorder = function (a) {
		a = a[0];
		-1 == this.borders.indexOf(a) && (this.borders += a, this.cell_dom.addClass("border_" + a));
		this.maybeTrigger("state_change")
	};
	m.prototype.removeBorder = function (a) {
		a = a[0];
		-1 != this.borders.indexOf(a) && (this.borders = this.borders.replace(a, ""), this.cell_dom.removeClass("border_" + a));
		this.maybeTrigger("state_change")
	};
	m.prototype.hasBorder = function (a) {
		return -1 != this.borders.indexOf(a[0])
	};
	m.prototype.toggleBorder = function (a) {
		0 < a.length && !a.match(/^[ltrb]+$/) || (-1 != this.borders.indexOf(a) ? this.setBorders(this.borders.replace(a, "")) : this.setBorders(this.borders + a))
	};
	m.prototype.reset = function (a) {
		var b = function (b) {
			return !a || !1 === a[b]
		};
		b("text_align") && this.setHorizontalAlign("left");
		b("vertical_alignment") && this.setVerticalAlign("top");
		b("borders") && this.setBorders("");
		if (b("font_style")) for (var d in this.font_style) this.removeFontStyle(d);
		b("text_color") && this.clearTextColor();
		b("bg_color") &&
		this.clearBgColor();
		this.clearPadding();
		b("border_color") && this.clearBorderColor()
	};
	m.prototype.addFontStyle = function (a, b) {
		"font-weight" == a && ("bold" == b ? (a = "bold", b = !0) : "italic" == b && (a = "italic", b = !0));
		if ("bold" == a) this.cell_dom.css("font-weight", "bold"); else if ("italic" == a) this.cell_dom.css("font-style", "italic"); else if ("underline" == a) this.cell_dom.css("text-decoration", "underline"); else if ("font-family" == a) {
			var d = this.font_style["font-family"];
			d && this.cell_dom.removeClass(d);
			this.cell_dom.addClass(b)
		} else "font-size" ==
		a && ("inherit" == b ? this.cell_dom.css("font-size", "100%") : this.cell_dom.css("font-size", b));
		this.font_style[a] = b || !0;
		this.maybeTrigger("state_change")
	};
	m.prototype.fontStyleToCSS = function () {
		var a = {}, b = this.font_style;
		b.hasOwnProperty("bold") && (a["font-weight"] = "bold");
		b.hasOwnProperty("italic") && (a["font-style"] = "italic");
		b.hasOwnProperty("underline") && (a["text-decoration"] = "underline");
		b.hasOwnProperty("font-size") && (a["font-size"] = "inherit" == b["font-size"] ? "100%" : b["font-size"]);
		b.hasOwnProperty("font-family") &&
		(a["font-family"] = m.FontFamilies[b["font-family"]]);
		return a
	};
	m.prototype.hasFontStyle = function (a) {
		return this.font_style.hasOwnProperty(a)
	};
	m.prototype.removeFontStyle = function (a) {
		this.hasFontStyle(a) && (delete this.font_style[a], "bold" == a ? this.cell_dom.css("font-weight", "normal") : "italic" == a ? this.cell_dom.css("font-style", "normal") : "underline" == a && this.cell_dom.css("text-decoration", "none"));
		this.maybeTrigger("state_change")
	};
	m.prototype.toggleFontStyle = function (a) {
		this.hasFontStyle(a) ? this.removeFontStyle(a) :
			this.addFontStyle(a)
	};
	m.prototype.setFromDict = function (a) {
		if (a["font-weight"]) {
			var b = a["font-weight"];
			b.match(/\d/) && (b = 400 < parseInt(b, 10) ? "bold" : "normal");
			this.addFontStyle("font-weight", b)
		}
		-1 !== (a["text-decoration"] || "").indexOf("underline") && this.addFontStyle("underline");
		a["background-color"] && this.setBgColor(a["background-color"]);
		a["text-align"] && this.setHorizontalAlign(a["text-align"]);
		a.color && this.setTextColor(a.color);
		"italic" === a["font-style"] && this.addFontStyle("italic");
		a["vertical-align"] &&
		this.setVerticalAlign(a["vertical-align"])
	};
	return m
}();
(function (a, m, e, b) {
	a.fn.borderEvents = function (b) {
		return this.each(function (c, d) {
			function e(a) {
				if (!b.deactivated && b.onBorderOver) {
					var c = m.outerWidth(), d = m.outerHeight(), e = m.offset(), f = a.pageX - e.left;
					e = a.pageY - e.top;
					var g = null;
					5 > f ? g = "left" : f > c - 5 ? g = "right" : 5 > e ? g = "top" : e > d - 5 && (g = "bottom");
					if (b.onBorderLeave && p && g != p) b.onBorderLeave(a, p, m);
					if (g) b.onBorderOver(a, g, m);
					p = g
				}
			}

			function f(a) {
				if (b.onBorderLeave && p) b.onBorderLeave(a, p, m);
				p = null
			}

			function g(a) {
				if (!b.deactivated && p && b.onBorderClick) b.onBorderClick(a,
					p, m)
			}

			var m = a(d), p = null;
			1 != m.data("borderEvents") && (m.mousemove(e).mouseleave(f).click(g), m.data("borderEvents", !0))
		})
	}
})(jQuery);
preventDefault = function (a) {
	a.preventDefault()
};
var Markup = function (a) {
	function m(a, b) {
		function c(a) {
			if (0 < w.length) {
				var b = document.createElement("p");
				w.forEach(function (a) {
					b.appendChild(a)
				});
				p.push(b);
				w = []
			}
			a && p.push(a)
		}

		var e = a.length, g = Markup.getByIds(b),
			m = ["backgroundColor", "color", "fontWeight", "fontStyle", "textDecoration"], p = [], r = -1, u = -1;
		if (e > g.length) throw"There are not enough markup instances for the text";
		for (var w = [], A = 0, v = {}, B = 0; B < e; v = {
			$jscomp$loop$prop$src_style$42: v.$jscomp$loop$prop$src_style$42,
			$jscomp$loop$prop$dest_style$43: v.$jscomp$loop$prop$dest_style$43
		},
			++B) if ("\n" == a[B]) {
			0 == w.length && w.push(document.createElement("br"));
			c();
			if (B + 1 == e) {
				var x = document.createElement("span");
				x.appendChild(document.createElement("br"));
				w.push(x);
				c()
			}
			A = B + 1
		} else if (g[B] && g[B].hasOwnProperty("img_src")) {
			x = g[B];
			A = document.createElement("img");
			A.src = x.img_src;
			A.alt = x.img_alt || "Image";
			var y = x.img_width;
			y && (A.width = y, A.style.width = y + "px", A.style.maxWidth = y + "px");
			if (y = x.img_height) A.height = y, A.style.height = y + "px", A.style.maxHeight = y + "px";
			for (w.push(A); B + 1 < e && b[B + 1].img_src ==
			x.img_src;) ++B;
			A = B + 1
		} else if (B + 1 == e || b[B + 1] != b[B] || "\n" == a[B + 1]) {
			A = a.substr(A, B + 1 - A);
			x = g[B];
			y = null;
			x && x.link_href && (y = document.createElement("a"), y.href = x.link_href, x.link_open_in_new_tab && (y.dataset.enableOpenInNewTab = x.link_open_in_new_tab), y.onclick = preventDefault, y.pointerEvents = "none");
			var E = document.createElement("span");
			v.$jscomp$loop$prop$src_style$42 = x && x.style;
			v.$jscomp$loop$prop$dest_style$43 = E.style;
			v.$jscomp$loop$prop$src_style$42 && m.forEach(function (a) {
				return function (b) {
					a.$jscomp$loop$prop$src_style$42.hasOwnProperty(b) &&
					(a.$jscomp$loop$prop$dest_style$43[b] = a.$jscomp$loop$prop$src_style$42[b])
				}
			}(v));
			E.innerHTML = d(A);
			null !== y ? (y.appendChild(E), w.push(y)) : w.push(E);
			A = B + 1;
			x && !0 === x.selected && (-1 == r && (r = p.length - 1), u = p.length)
		}
		c();
		return {nodes: p, selection_start: r, selection_end: u}
	}

	var e = [{}], b = {ImageCharRepr: "#"}, d = function () {
		function a(a) {
			return d[a] || a
		}

		function b(a) {
			var b = [];
			for (a = a.length - 1; 0 <= a; --a) b.push("&nbsp;");
			return b.join("")
		}

		var d = {"&": "&amp;", "<": "&lt;", ">": "&gt;"};
		return function (c) {
			return c.replace(/[&<>]/g,
				a).replace(/[ ]{2,}/g, b)
		}
	}();
	b.create = function (b) {
		b = a.extend(!0, {}, b);
		for (var c = -1, d = -1, f = 0, q = e.length; f < q && -1 == c; ++f) if (null === e[f]) d = f; else {
			var m = e[f];
			JSON.stringify(b) == JSON.stringify(m) && (c = f)
		}
		-1 == c && (-1 == d ? (e.push(b), c = e.length - 1) : (e[d] = b, c = d));
		return c
	};
	b.getById = function (a) {
		if (1 <= a && a < e.length) return e[a]
	};
	b.getByIds = function (a) {
		return a.map(function (a) {
			return b.getById(a)
		})
	};
	b.dump = function () {
		return {instances: e}
	};
	b.load = function (a) {
		e = a.instances || []
	};
	b.clear = function () {
		e = [{}]
	};
	b.clearUnused =
		function (a) {
			for (var b = 1; b < e.length; ++b) a.hasOwnProperty(b) || null === e[b] || (e[b] = null)
		};
	b.render = function (a, b, d) {
		for (a = m(a, b, d).nodes; d.firstChild;) d.removeChild(d.firstChild);
		for (b = 0; b < a.length; ++b) d.appendChild(a[b])
	};
	b.renderToString = function (a, e, k) {
		k = void 0 === k ? !0 : k;
		var c = [], g = a.length, m = Markup.getByIds(e);
		g > m.length && console.error("There are not enough markup instances for the text");
		for (var p = 0, r = 0; r < g; ++r) {
			var u = m[r < m.length ? r : 0];
			if ("\n" == a[r]) c.push("<br>"), p = r + 1; else if (a[r] == b.ImageCharRepr &&
				u && u.hasOwnProperty("img_src")) {
				var w = u.img_alt || "";
				c.push('<img src="' + u.img_src + '"' + (w ? ' alt="' + w + '"' : "") + (u.img_width ? ' width="' + u.img_width + '"' : "") + (u.img_height ? ' height="' + u.img_height + '"' : "") + ">")
			} else if (r + 1 == g || r + 1 < e.length && e[r + 1] != e[r] || "\n" == a[r + 1]) {
				p = a.substr(p, r + 1 - p);
				w = "";
				u && u.link_href && (w = '<a href="' + u.link_href + '"' + ("true" == u.link_open_in_new_tab ? ' target="_blank" rel="noopener noreferrer"' : "") + ">");
				var A = "";
				if (k && u && u.style) {
					var v = [];
					u.style.fontWeight && v.push("font-weight:" + u.style.fontWeight);
					u.style.fontStyle && v.push("font-style:" + u.style.fontStyle);
					u.style.textDecoration && v.push("text-decoration:" + u.style.textDecoration);
					u.style.color && v.push("color:" + Utils.get_compact_color_value(u.style.color));
					u.style.backgroundColor && v.push("background-color:" + Utils.get_compact_color_value(u.style.backgroundColor));
					1 <= v.length && (A = '<span style="' + v.join(";") + '">')
				}
				A = 1 <= A.length ? A + d(p) + "</span>" : d(p);
				1 <= w.length ? (c.push(w), c.push(A), c.push("</a>")) : c.push(A);
				p = r + 1
			}
		}
		return c.join("")
	};
	b.isInlineElement =
		function (a) {
			if (a.nodeType == Node.TEXT_NODE) return !0;
			var b = a.ownerDocument.defaultView;
			return (("getComputedStyle" in b ? b.getComputedStyle(a, "") : a.currentStyle).display || "").match(/inline/i)
		};
	b.forEachLeafCharInNode = function (c, d, e, f) {
		function g(c, q, p) {
			if (c) {
				p = a.extend(!0, {style: {}}, p);
				var t = c.style;
				if (t) for (var r = 0, u = f.length; r < u; ++r) {
					var w = f[r];
					t.hasOwnProperty(w) && (p.style[w] = c.style[w])
				}
				r = c.nodeName.toLowerCase();
				"a" == r && (p.link_href = c.href, p.link_open_in_new_tab = c.dataset.hasOwnProperty("enableOpenInNewTab") ?
					c.dataset.enableOpenInNewTab || !1 : !0);
				t = c.childNodes || [];
				if ("img" == r) p = {
					img_src: c.src,
					img_alt: c.alt,
					img_width: c.width,
					img_height: c.height
				}, d(b.ImageCharRepr, !1, p); else if ("br" == r && c.previousSibling && b.isInlineElement(c.previousSibling)) d("\n", !1, p); else if (3 == c.nodeType) for (q = !1, e && c.isSameNode(e.startContainer) && (q = k = !0), t = !1, e && c.isSameNode(e.endContainer) && (t = m = !0), c = c.textContent, r = c.length, u = 0; u < r; ++u) {
					w = (w = k && !q || q && u >= e.startOffset) && (!m || t && u < e.endOffset);
					var y = c[u];
					y != ZeroWidthSpace && d(y,
						w, p)
				} else {
					r = b.isInlineElement(c);
					!q && !r && c.previousSibling && b.isInlineElement(c.previousSibling) && d("\n", !1, p);
					u = 0;
					for (w = t.length; u < w; ++u) e && c.isSameNode(e.startContainer) && u >= e.startOffset && (k = !0), e && c.isSameNode(e.endContainer) && u >= e.endOffset && (m = !0), g(t[u], k && !m, p);
					q || r || !c.nextElementSibling || b.isInlineElement(c.nextElementSibling) || d("\n", !1, p)
				}
			}
		}

		f = void 0 === f ? null : f;
		var k = !1, m = !1;
		null === f && (f = ["fontWeight", "fontStyle", "textDecoration", "color", "backgroundColor"]);
		e && (e = e.cloneRange());
		g(c, !0,
			{})
	};
	return b
}(jQuery);
var SelectionPositionInfo = function () {
	var a = null, m = {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0};
	return {
		setRange: function (e) {
			if ((a = e) && a.getBoundingClientRect && (m = a.getBoundingClientRect(), 0 == m.top && 0 == m.bottom && a.startContainer)) {
				e = (0 < a.startContainer.childElementCount ? a.startContainer.lastChild : a.startContainer).getBoundingClientRect();
				var b = Math.min(20, e.bottom - e.top);
				m = {top: e.bottom - b, bottom: e.bottom, left: e.right - 1, right: e.right, width: 1, height: b}
			}
		}, getBoundingClientRect: function () {
			return m
		},
		getClientWidth: function () {
			return m.width
		}, getClientHeight: function () {
			return m.height
		}
	}
}, InsertLinkDialog = function () {
	function a() {
		var a = k.value.trim().replace(ZeroWidthSpace, ""), c = f.value.trim(), e;
		if (e = "" != a) e = document.createElement("a"), e.href = c, e = e.host && e.host != window.location.host;
		e ? (f.setCustomValidity && f.setCustomValidity(""), e = document.createElement("a"), e.href = c, e.textContent = a, e.pointerEvents = "none", e.onclick = preventDefault, e.dataset.enableOpenInNewTab = p.checked, d.deleteContents(), d.insertNode(e),
			d.collapse(), q && q(), b.close()) : f.setCustomValidity && f.setCustomValidity("Invalid link")
	}

	function m() {
		k = document.getElementById("insert-link-dialog__link-text");
		f = document.getElementById("insert-link-dialog__link-url");
		c = document.getElementById("insert-link-dialog");
		p = document.getElementById("insert-link-dialog__open-in-new-tab");
		f.addEventListener("keydown", function (b) {
			b.which == Keys.ENTER && (b.preventDefault(), b.stopPropagation(), a())
		});
		k.addEventListener("keydown", function (a) {
			a.which == Keys.ESC && (a.preventDefault(),
				b.close())
		});
		document.getElementById("insert-link-dialog__apply").onclick = function (b) {
			b.preventDefault();
			a()
		};
		document.getElementById("insert-link-dialog__cancel").onclick = function (a) {
			a.preventDefault();
			b.close()
		}
	}

	var e = SelectionPositionInfo(), b = {}, d = null, c = null, g = null, k = null, f = null, q = null, t = null,
		p = null, r = function (a) {
			c.contains(a.target) || c && (c.offsetWidth || c.offsetHeight || c.getClientRects().length) && b.close()
		}, u = function () {
			null != g && null != d && (e.setRange(d), g.scheduleUpdate())
		}, w = function (a) {
			if ("A" ==
				a.nodeName) return {href: a.href, open_in_new_tab: "true" == a.dataset.enableOpenInNewTab};
			var b = null;
			a = $jscomp.makeIterator(a.childNodes);
			for (var c = a.next(); !c.done && (c = c.value, 1 !== c.nodeType || (b = w(c), null == b)); c = a.next()) ;
			return b
		};
	b.show = function (a, v, B) {
		d = a;
		q = v;
		t = B;
		null != g && b.close();
		null == c && m();
		e.setRange(d);
		B = d.toString().trim().replace(ZeroWidthSpace, "");
		k.value = B;
		a = "";
		v = !0;
		d.startContainer && "" != B && (B = w(d.startContainer), null != B && (a = B.href, v = B.open_in_new_tab));
		f.value = a;
		p.checked = v;
		c.style.display =
			"block";
		g = new Popper(e, c, {placement: "top", positionFixed: !0, modifiers: {offset: {offset: "0,5"}}});
		setTimeout(function () {
			$(k).focus()
		}, 50);
		setTimeout(function () {
			document.addEventListener("click", r)
		}, 500);
		window.addEventListener("scroll", u);
		document.scrollingElement && document.scrollingElement.addEventListener("scroll", u)
	};
	b.close = function () {
		g && (window.removeEventListener("scroll", u), document.scrollingElement && document.scrollingElement.removeEventListener("scroll", u), document.removeEventListener("click",
			r), c.style.display = "none", g.destroy(), g = null, t && t());
		d = null
	};
	return b
}();
var icons_trie = {
	a: {
		d: {
			v: {
				e: {r: {t: {i: {s: {e: ["ment", 0], i: ["ng", 0]}, z: {i: ["ng", 0], e: ["ment", 0]}}, "#": 0}}},
				a: ["ncing", 361]
			},
			"#": -1,
			d: {r: {e: {s: {s: {"-": {b: ["ook", -2], c: ["ard", -3]}}}}}, i: ["tion", 640]},
			a: ["pt", 3],
			j: ["ust", -4],
			e: ["pt", 785]
		},
		l: {
			i: {g: {n: {"#": 3, "-": {c: ["enter", -6], j: ["ustify", -7], l: ["eft", -8], r: ["ight", -9]}}}, n: ["e", 3]},
			l: {e: {r: {g: {y: ["", 9], i: ["es", -10]}}}},
			t: ["er", 584]
		},
		i: {r: {"-": ["freshener", -5], h: ["eaded", 260], p: ["lane", 634]}, m: {"#": 438}},
		m: {
			b: {u: ["lance", -11], i: ["t", 221]}, e: ["rican-sign-language-interpreting",
				-12], p: {l: ["ify", 299], u: {l: {e: {"#": 930}, "#": 930}}, o: {u: {l: {e: {"#": 930}}}}}
		},
		n: {
			c: {h: {o: {r: {p: ["erson", 12], "#": -13, m: ["an", 12]}}}},
			g: {
				l: {
					e: {
						"-": {
							d: {
								o: {
									u: {
										b: {
											l: {
												e: {
													"-": {
														d: ["own", -14],
														l: ["eft", -15],
														r: ["ight", -16],
														u: ["p", -17]
													}
												}
											}
										}
									}, w: ["n", -18]
								}
							}, l: ["eft", -19], r: ["ight", -20], u: ["p", -21]
						}, "#": 347
					}
				}, r: ["y", -22]
			},
			k: ["h", -23],
			n: {o: {t: {a: {t: {e: {"#": 212}}}}}, u: ["lus", 685]},
			d: ["iron", 262],
			u: ["ran", 362],
			o: ["vulant", 631],
			s: ["wer", 679],
			a: ["tomy", 715]
		},
		p: {
			p: {
				l: {e: {"-": ["alt", -24], s: ["auce", 873]}}, r: ["ehend", 221],
				o: ["rtion", 716]
			}
		},
		r: {
			c: {h: {i: ["ve", -25], w: ["ay", -26], "#": 25}},
			r: {
				o: {
					w: {
						"-": {
							a: {
								l: {
									t: {
										"-": {
											c: {
												i: {
													r: {
														c: {
															l: {
																e: {
																	"-": {
																		d: ["own", -27],
																		l: ["eft", -28],
																		r: ["ight", -29],
																		u: ["p", -30]
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							},
							c: {i: {r: {c: {l: {e: {"-": {d: ["own", -31], l: ["eft", -32], r: ["ight", -33], u: ["p", -34]}}}}}}},
							d: ["own", -35],
							l: ["eft", -36],
							r: ["ight", -37],
							u: ["p", -38]
						}, s: {"-": {a: {l: {t: {"#": -39, "-": {h: ["", -40], v: ["", -41]}}}}}}
					}
				}, e: {s: {t: {"#": 161}}}
			},
			d: {o: {r: ["", 343], u: ["r", 343]}},
			o: ["use", 343],
			t: {i: {c: {u: {l: {a: {t: {e: ["", 485], i: {o: {n: ["", 485], "#": 485}}}}}}}}},
			u: ["gula", 688]
		},
		s: {
			s: {
				i: ["stive-listening-systems", -42],
				a: ["y", 161],
				u: ["re", 161],
				o: {c: ["iate", 513], r: ["t", 759]},
				e: ["t", 640]
			}, t: {e: {r: {i: {s: {k: {"#": -43}}}}}, a: ["tine", 43]}, c: ["ertain", 161]
		},
		t: {
			"#": -44,
			l: ["as", -45],
			o: ["m", -46],
			t: {a: ["ck", 343], r: {a: {c: {t: {e: ["r", 529], i: ["on", 529], o: ["r", 529]}}}}},
			a: ["raxis", 610]
		},
		u: {
			d: ["io-description", -47],
			t: {o: {b: ["us", 115], m: {o: ["bile", 133], a: ["ton", 687]}, "#": 133}},
			g: ["ury", 730]
		},
		w: {a: {r: {d: {i: ["ng", 47], "#": -48}}}},
		c: {
			c: {o: {l: ["ade", 47], u: ["nt", 449]}}, t: {
				"#": 637,
				i: ["notherapy", 668]
			}, k: ["nowledge", 672], e: ["", 785]
		},
		b: {
			s: {q: ["uatulate", 85], c: ["ond", 85]},
			r: {i: {d: {g: {m: ["ent", 132], e: {m: ["ent", 132], "#": 241}}}}},
			b: ["reviate", 241],
			o: ["de", 452]
		},
		g: ["ree", 161],
		h: ["ead", 361],
		f: {f: {e: {c: {t: {i: {o: {n: {a: ["teness", 442], "#": 442}}}}}}}},
		e: ["roplane", 634]
	},
	s: {
		e: {
			t: {"#": 3},
			a: {
				m: ["", 69],
				r: {c: {h: {"#": -709, "-": {d: ["ollar", -710], l: ["ocation", -711], m: ["inus", -712], p: ["lus", -713]}}}},
				l: ["", 784]
			},
			c: {u: {r: {i: ["ty", 152], e: ["", 639]}}},
			e: {"#": 161, k: ["", 708], d: ["ling", -714]},
			p: {
				a: {
					r: {
						a: {
							t: {
								e: {"#": 259},
								r: ["ix", 743]
							}
						}
					}
				}
			},
			x: ["less", 584],
			r: {e: ["nity", 610], v: ["er", -715]},
			n: {d: ["", 722], s: ["ation", 785], t: ["ence", 851]},
			w: ["er", 858]
		},
		t: {
			a: {
				r: {
					"#": -786,
					r: ["ing", 785],
					"-": {
						a: ["nd-crescent", -787],
						h: {a: {l: {f: {"#": -788, "-": ["alt", -789]}}}},
						o: {f: {"-": {d: ["avid", -790], l: ["ife", -791]}}}
					}
				}, y: {"#": 161}, c: ["k", 578], m: ["p", -785]
			},
			o: {
				p: {
					"#": -796,
					p: {a: {g: {e: {"#": 161}}}, e: ["r", 639], l: ["e", 639]},
					o: ["ver", 795],
					"-": ["circle", -797],
					w: ["atch", -798]
				}, n: ["e", 370], r: {
					y: ["", 449], a: {g: {e: {"#": 551}}}, e: {
						"#": -799, h: ["ouse", 798], "-": ["alt",
							-800]
					}, m: ["", 810]
				}, m: ["p", 784], c: {k: {"#": 798}}, o: ["l", 858]
			},
			r: {
				e: {a: {k: ["", 60], m: ["", -801]}, e: {t: {"-": ["view", -802], c: ["ar", 870]}}},
				i: {p: ["e", 60], k: {e: {"#": 210, t: ["hrough", -803]}}, n: ["g", 869]},
				a: {i: {n: ["", 341], g: {h: {t: {f: ["orward", 781], "#": 781}}}}, p: ["", 743]},
				o: {k: ["e", 743], o: ["pwafel", -804]}
			},
			i: {f: ["fly", 85], n: {g: {"#": 114, e: ["r", 241]}, k: ["er", 506]}, c: {k: {"#": 485, y: ["-note", -795]}}},
			e: {
				e: {r: {i: ["ng", 258], "#": 438}}, r: {n: ["", 648], e: ["otype", 784]}, l: ["lar", 785], p: {
					"-": {
						b: ["ackward", -792], f: ["orward",
							-793]
					}
				}, t: ["hoscope", -794]
			},
			u: ["mp", 784],
			y: ["lemark", 866]
		},
		p: {
			e: {
				c: {k: ["", 45], t: {e: ["r", 372], r: ["e", 372], a: ["cles", 379]}, s: ["", 379]},
				w: ["", 151],
				e: ["ch", 496],
				l: ["l-check", -777]
			},
			o: {i: {l: {"#": 48}}, o: ["k", 372], r: ["t", 637]},
			u: {e: ["", 151], n: ["k", 442]},
			r: {o: {c: {k: {e: {t: {"#": 208}}}}}, e: ["ad", 606], a: {y: ["-can", -781], i: ["n", 961]}},
			a: {n: {"#": 234, n: ["er", 961]}, t: ["e", 578], y: ["", 584], r: ["e", 703], "#": -775, c: ["e-shuttle", -776]},
			l: {i: {t: ["", 259], f: ["f", 485]}, o: {d: ["ge", 779], t: ["ch", -780]}},
			y: ["glass", 379],
			i: {
				r: ["it",
					442], e: ["l", 637], d: ["er", -778], n: {s: ["ter", 778], n: ["er", -779]}
			}
		},
		i: {
			s: ["ter", 48],
			c: ["k", 151],
			m: {u: {l: {a: {t: ["e", 228], c: {r: {u: {m: {"#": 475}}}}}}}, "-": ["card", -737]},
			l: ["ly", 260],
			g: {
				h: ["t", 578],
				n: {
					a: {l: {i: {s: {e: {"#": 730}}, z: {e: {"#": 730}}, n: {g: {"#": 730}}}, "#": -735}, t: ["ure", -736]},
					"#": -731,
					e: ["d", 730],
					b: ["oard", 730],
					"-": {i: ["n-alt", -732], l: ["anguage", -733], o: ["ut-alt", -734]}
				}
			},
			t: ["emap", -738],
			e: ["ve", 759]
		},
		h: {
			u: {n: ["", 57], t: ["tle-van", -730]},
			e: {e: {r: {"#": 84}, t: ["", 634]}, k: ["el-sign", -721], l: ["ve", 818]},
			a: {
				v: {e: {r: ["", 182], "#": 634}},
				d: {e: {"#": 372}},
				b: {u: {"#": 379}},
				k: ["e", 430],
				r: {e: {"#": -717, "-": {a: {l: {t: {"#": -718, "-": ["square", -719]}}}, s: ["quare", -720]}}},
				p: {e: {"#": 715, s: ["", -716]}},
				f: ["t", 861]
			},
			o: {
				r: {t: {e: {n: {e: ["d", 241], "#": 241}}}},
				o: ["t", 340],
				w: {"#": 677, e: ["r", -729]},
				a: ["l", 704],
				e: {"-": ["prints", -725], t: ["ree", 877]},
				p: {
					p: {i: {n: {g: {"-": {b: {a: {g: ["", -726], s: ["ket", -727]}}, c: ["art", -728]}}}}},
					"#": 798,
					w: ["orn", 855]
				}
			},
			i: {
				n: ["er", 579], m: ["mer", 637], t: {"#": 648, e: ["", 648]}, e: ["ld-alt", -722], p: {
					"#": -723,
					p: ["ing-fast", -724]
				}
			},
			r: {e: {d: {"#": 824}}}
		},
		a: {
			l: {o: ["on", 60], i: ["entian", 362], v: {a: ["ge", 703], e: ["", 703]}},
			v: {v: ["y", 221], e: ["", -704]},
			t: {
				i: {a: ["te", 338], s: {f: {y: {"#": 338, i: ["ng", 781]}}}},
				e: {"#": 338, l: {l: {i: {t: {e: {"#": -702, "-": ["dish", -703]}}}}}}
			},
			c: ["k", 343],
			g: ["", 349],
			w: {h: ["orse", 453], b: ["uck", 453]},
			m: {a: {r: {a: ["", 488], i: ["um", 752]}}},
			d: {"-": {c: ["ry", -700], t: ["ear", -701]}},
			p: ["", 855]
		},
		c: {
			r: {
				e: {w: {"#": 69, d: ["river", -706]}, e: {n: {"#": 82}}},
				i: {p: {t: {"#": 89}}},
				o: ["ll", -707],
				a: ["p", 873]
			},
			u: {
				t: {t: {l: {e: {b: {u: {t: {t: {"#": 212}}}}}}}},
				m: ["", 873]
			},
			o: {p: ["e", 221], t: ["ch", 234], u: ["r", 353], w: ["l", 363]},
			a: {r: ["per", 697], t: ["", 697]},
			h: {o: {o: {l: {"#": -705, i: ["ng", 704], t: ["ime", 704], h: ["ouse", 704]}}}},
			e: ["nt", 952]
		},
		u: {
			b: {
				t: {e: ["rfuge", 82], r: ["action", 561]},
				s: {
					t: {a: {n: {t: {i: {a: {t: ["ion", 161], l: ["", 781]}}}, c: ["e", 442]}}},
					c: {r: {i: {b: ["e", 730], p: ["t", -805]}}}
				},
				p: ["rogram", 658],
				r: ["outine", 658],
				w: ["ay", -806]
			},
			n: {t: ["an", 114], b: {u: ["rn", 114], a: ["the", 808]}, s: ["hine", 808], l: ["ight", 808], "#": -809},
			l: ["ly", 194],
			m: {
				m: {i: ["t", 237], a: ["tion", 640]},
				"#": 442
			},
			s: ["pension", 607],
			r: {r: ["ound", 685], p: {r: {i: {s: {a: ["l", 810], e: ["", -811]}}}}},
			p: {e: {r: {s: {t: ["ar", 785], c: ["ript", -810]}, i: ["or", 809]}}},
			i: {t: {c: {a: {s: {e: {"#": -807, "-": ["rolling", -808]}}}}}}
		},
		l: {
			a: {p: {"#": 85, d: ["ash", 85]}, s: {h: {"#": -744, e: ["d", 241]}}, n: ["t", 948]},
			i: {c: {e: {"#": 241}}, d: ["ers-h", -746]},
			u: {e: ["", 241], i: ["ce", 353]},
			e: {w: {"#": 241}, d: {g: ["e", 744], "#": 744}, i: ["gh", -745]}
		},
		m: {
			a: ["ck", 85], i: {l: {e: {"#": -747, "-": {b: ["eam", -748], w: ["ink", -749]}}, i: {n: {g: {"#": 391}}}}}, o: {
				g: {
					g: ["iness", 749],
					"#": -750
				}, k: {e: ["", 750], i: {n: {g: {"#": -751, "-": ["ban", -752]}}}}
			}, s: ["", -753]
		},
		w: {
			o: {t: {"#": 87}, r: ["dplay", 637]},
			e: {e: {p: {"#": 108}}, r: ["ve", 241]},
			a: {r: {m: {"#": 194}}, g: ["", 349], y: ["er", 693], t: ["chbook", -812]},
			i: {n: ["g", 241], m: {m: {e: ["r", -813], i: ["ng-pool", -814]}}}
		},
		k: {
			i: {
				r: {m: ["ish", 109], t: ["", 685]},
				p: ["", 241],
				m: ["", 634],
				i: {n: {g: {"#": -740, "-": ["nordic", -741]}}},
				"#": 739
			},
			y: ["rocket", 688],
			a: {t: {i: ["ng", -739], e: ["", 738]}},
			u: {l: {l: {"#": -742, "-": ["crossbones", -743]}}}
		},
		q: {
			u: {
				e: ["eze", 222], a: {
					b: ["", 270], r: {
						e: {
							"#": -782,
							l: ["y", 781], "-": {f: ["ull", -783], r: ["oot-alt", -784]}
						}
					}
				}, i: ["rt", 284]
			}
		},
		o: {
			f: ["a", 230],
			r: {
				c: ["erous", 528],
				t: {
					"#": -760,
					i: ["ng", 759],
					"-": {
						a: {
							l: {
								p: {
									h: {
										a: {
											"-": {
												d: {o: {w: {n: {"#": -761, "-": ["alt", -762]}}}},
												u: {p: {"#": -763, "-": ["alt", -764]}}
											}
										}
									}
								}
							},
							m: {
								o: {
									u: {
										n: {
											t: {
												"-": {
													d: {o: {w: {n: {"#": -765, "-": ["alt", -766]}}}},
													u: {p: {"#": -767, "-": ["alt", -768]}}
												}
											}
										}
									}
								}
							}
						},
						d: ["own", -769],
						n: {
							u: {
								m: {
									e: {
										r: {
											i: {
												c: {
													"-": {
														d: {o: {w: {n: {"#": -770, "-": ["alt", -771]}}}},
														u: {p: {"#": -772, "-": ["alt", -773]}}
													}
												}
											}
										}
									}
								}
							}
						},
						u: ["p", -774]
					}
				}
			},
			u: ["nd", 623],
			m: ["a", 715],
			l: {i: {d: {u: ["s", 743], "#": 781}}, a: {r: {"-": ["panel", -759], i: {s: ["e", 808], z: ["e", 808]}}}},
			c: {k: {"#": 757, s: ["", -758]}}
		},
		n: {
			i: ["p", 232],
			u: ["b", 241],
			o: {
				g: ["", 491],
				w: {
					b: {o: {a: {r: {d: {i: ["ng", -754], "#": 753}}}}, i: ["rd", 754]},
					f: ["lake", -755],
					m: ["an", -756],
					p: {l: {o: {w: ["", -757], u: ["gh", 756]}}}
				}
			},
			e: ["ak", 579]
		},
		d: ["-card", -708],
		y: {
			n: {
				a: ["gogue", -815],
				c: {"#": -816, h: {r: {o: {n: {i: {z: ["e", 815], s: ["e", 815]}}}}}, "-": ["alt", -817]}
			}, r: ["inge", -818]
		}
	},
	c: {
		o: {
			r: {
				r: {e: {c: ["t", 3], s: ["pond", 161]}, u: ["pt", 194]}, p: ["uscle", 45],
				n: {e: {r: {"#": 99}}}, o: ["nate", 237], e: ["", 442]
			},
			n: {
				f: {o: {r: {m: {"#": 3, a: ["tion", 715]}}}, i: {r: ["mation", 161], g: ["uration", 715]}},
				s: {t: {r: {u: {c: {t: {i: ["on", 111], "#": 111}}}, i: ["ct", 222]}}, o: ["rt", 697]},
				d: {e: ["nsation", 132], i: {t: {i: {o: {n: {"#": 161}}}}}},
				t: {
					r: {o: ["l", 161], a: {c: {t: {"#": 222}}}, i: ["bution", 716]},
					a: {i: {n: {"#": 161}}, c: ["t", 513]},
					o: ["ur", 715]
				},
				c: {i: ["erge-bell", -226], l: ["uding", 834]},
				n: {e: {c: {t: {i: ["on", 513], e: ["dness", 513], "#": 513}}, x: ["ion", 513]}},
				j: ["uration", 528],
				v: {
					e: ["nience", 682], u: ["lse",
						743]
				}
			},
			c: {k: {e: ["r", 48], t: ["ail", -205], "#": 411}},
			s: ["set", 48],
			d: {d: ["le", 48], i: ["fication", 205], e: {"#": -206, "-": ["branch", -207]}, s: ["wallop", 873]},
			p: {p: ["ice", 109], s: ["e", 109], y: {"#": -229, r: ["ight", -230]}},
			m: {
				b: ["ust", 114],
				p: {
					u: ["ter", 118],
					a: {c: {t: {"-": ["disc", -221], "#": 222}}, s: ["s", -222]},
					r: {e: {h: ["end", 221], s: {s: {"#": -223, "-": {a: {l: ["t", -224], r: ["rows-alt", -225]}}}}}},
					e: ["er", 291],
					o: ["se", 611]
				},
				m: {
					e: {
						n: {
							t: {
								a: {r: {y: {"#": 212}}}, "#": -213, "-": {
									a: ["lt", -214], d: {o: {l: ["lar", -215], t: ["s", -216]}}, m: ["edical",
										-217], s: ["lash", -218]
								}, s: {"#": -219, "-": ["dollar", -220]}
							}
						}
					}, i: ["ssion", 258], o: {n: ["place", 855], d: ["e", 858]}
				}
			},
			a: {c: {h: {"#": 115}}},
			f: ["fee", -208],
			g: {"#": -209, s: ["", -210]},
			i: {n: {s: ["", -211], "#": 210}, l: ["", 706]},
			l: {u: {m: {n: {s: ["", -212], "#": 211}}}, l: ["igate", 513]},
			o: {k: {i: {e: {"#": -227, "-": ["bite", -228]}}, y: ["", 226]}},
			u: {c: ["h", -231], n: {s: {e: {l: {l: ["ing", 258], i: ["ng", 258], "#": 258}}}}, r: ["se", 697]},
			v: ["er", 234]
		},
		h: {
			i: {l: {d: {"#": -183}}, m: ["e", 71], n: ["k", 161], t: ["", 161], p: {"#": 161}}, a: {
				r: {
					a: ["banc", 115], g: {
						i: ["ng-station",
							-157], e: {"#": 258}
					}, t: {"-": {a: ["rea", -158], b: ["ar", -159], l: ["ine", -160], p: ["ie", -161]}}, m: ["ing", 528]
				},
				i: {r: {m: ["an", 153], w: ["oman", 153], "#": -154, p: ["erson", 153]}},
				l: {k: {b: {o: {a: {r: {d: {"#": -155, "-": ["teacher", -156]}}}}}, "#": 379}},
				s: {e: {"#": 262}, s: ["is", 715]},
				n: {n: {e: {l: {i: {s: ["e", 438], z: ["e", 438]}}}}},
				w: ["", 639],
				m: ["pion", 785]
			}, u: {c: ["k", 151], r: ["ch", -184]}, e: {
				c: {
					k: {
						"#": -162,
						e: ["r", 161],
						o: ["ut", 161],
						"-": {c: ["ircle", -163], d: ["ouble", -164], s: ["quare", -165]}
					}
				},
				q: {u: {e: {"#": 161, r: ["", 161]}}},
				e: {
					s: {
						e: {
							"#": -166,
							f: ["lower", 165]
						}
					}
				},
				s: {
					s: {
						"#": -167,
						"-": {
							b: {i: ["shop", -168], o: ["ard", -169]},
							k: {i: ["ng", -170], n: ["ight", -171]},
							p: ["awn", -172],
							q: ["ueen", -173],
							r: ["ook", -174]
						}
					}
				},
				a: ["t", 166],
				v: {
					r: {
						o: {
							n: {
								"-": {
									c: {
										i: {
											r: {
												c: {
													l: {
														e: {
															"-": {
																d: ["own", -175],
																l: ["eft", -176],
																r: ["ight", -177],
																u: ["p", -178]
															}
														}
													}
												}
											}
										}
									}, d: ["own", -179], l: ["eft", -180], r: ["ight", -181], u: ["p", -182]
								}
							}
						}
					}
				},
				w: ["", 639]
			}, o: {c: ["olate", 207], p: ["per", 445], r: ["e", 827]}, r: ["onicle", 449]
		},
		e: {
			n: {s: ["or", 57], t: {e: {r: {i: ["ng", 258], "#": 304}}, r: {e: {"#": 304}, a: ["l", 488]}}}, r: {
				t: {
					i: {
						f: {
							i: {
								c: {
									a: {
										t: {
											e: ["",
												-153], i: ["on", 152]
										}
									}
								}
							}
						}
					}
				}
			}, l: ["luloid", 340], a: ["se", 795]
		},
		a: {
			k: ["e", 60],
			m: {
				p: {a: {n: ["a", 71], i: ["gn", 697]}, g: ["round", -130], s: ["ite", 129]},
				e: {r: {a: {"#": -128, "-": ["retro", -129]}}}
			},
			u: {t: {e: {r: {i: {z: ["e", 114], s: ["e", 114]}}}}},
			l: {
				c: ["ulator", -119],
				e: {
					n: {
						d: {
							a: {
								r: {
									"#": -120,
									"-": {
										a: ["lt", -121],
										c: ["heck", -122],
										d: ["ay", -123],
										m: ["inus", -124],
										p: ["lus", -125],
										t: ["imes", -126],
										w: ["eek", -127]
									}
								}
							}
						}
					}
				},
				l: {"#": 623}
			},
			n: {d: ["y-cane", -131], n: ["abis", -132], "#": 343, v: {a: {s: {"#": 644, s: ["", 644]}}}},
			p: {
				s: {
					u: {
						l: {
							i: {
								s: ["e", 132],
								z: ["e", 132]
							}, a: ["te", 132], e: {"#": 132, s: ["", -133]}
						}
					}
				}, "#": 237, e: ["r", 637]
			},
			r: {
				"#": -134,
				"-": {a: ["lt", -135], b: ["attery", -136], c: ["rash", -137], s: ["ide", -138]},
				a: {v: {a: {n: {"#": -139}}}},
				e: {
					t: {
						"-": {
							d: ["own", -140],
							l: ["eft", -141],
							r: ["ight", -142],
							s: {
								q: {
									u: {
										a: {
											r: {
												e: {
													"-": {
														d: ["own", -143],
														l: ["eft", -144],
														r: ["ight", -145],
														u: ["p", -146]
													}
												}
											}
										}
									}
								}
							},
							u: ["p", -147]
						}
					}
				},
				r: {o: ["t", -148], y: ["", 697]},
				t: {"-": {a: ["rrow-down", -149], p: ["lus", -150]}},
				d: ["inal", 488]
			},
			s: {
				h: ["-register", -151], t: {"#": 151, r: ["ate", 584]}, e: ["", 358], c: ["ade",
					728]
			},
			t: {"#": -152, c: ["h", 795]},
			d: ["", 262],
			v: ["alry", 453],
			y: ["", 488],
			b: ["", 828]
		},
		y: {c: {l: {e: {"#": 75}}}, p: ["her", 205]},
		r: {
			a: {
				m: {"#": 87},
				c: ["k", 161],
				w: ["", 232],
				b: {b: {y: ["", 234], e: ["d", 234]}},
				n: {k: {"#": 379}},
				p: {"#": 648, p: ["er", 858]}
			},
			e: {
				d: {e: {n: {t: {i: {a: {l: {s: ["", 152], "#": 152}}}}}}, i: ["t-card", -232]},
				s: ["t", 237],
				e: ["p", 579],
				a: ["ture", 861]
			},
			o: {
				p: {"#": -233, "-": ["alt", -234]},
				s: {s: {b: {r: {e: {e: {d: {i: ["ng", 234], "#": 234}}}}}, i: ["ng", 234], "#": -235, h: ["airs", -236]}},
				w: {i: ["ng", 236], "#": -237, n: {w: ["ork", 237], "#": -238}}
			},
			i: {s: ["scross", 234], m: ["son", 353]},
			u: ["tch", -239]
		},
		l: {
			a: {s: {h: ["", 109], s: {i: ["fy", 759], "#": 759}}},
			i: {
				n: ["ic-medical", -188],
				p: {b: {o: {a: {r: {d: {"#": -189, "-": {c: ["heck", -190], l: ["ist", -191]}}}}}}, "#": 232},
				c: ["k", 262]
			},
			o: {
				c: {k: {"#": -192}},
				n: {"#": 192, e: ["", -193]},
				s: {e: ["d-captioning", -194], u: ["re", 795]},
				u: {
					d: {
						"#": -195,
						"-": {
							d: ["ownload-alt", -196],
							m: {e: ["atball", -197], o: {o: {n: {"#": -198, "-": ["rain", -199]}}}},
							r: ["ain", -200],
							s: {h: ["owers-heavy", -201], u: {n: {"#": -202, "-": ["rain", -203]}}},
							u: ["pload-alt", -204]
						}
					}
				},
				a: ["k", 545]
			}
		},
		u: {
			t: {"#": -242, t: ["ing", 241]},
			r: {b: ["", 161], v: {e: {"#": 241}}, l: {"#": 520, i: ["cue", 706]}, r: ["ent", 800]},
			l: {t: {i: {v: {a: {t: {e: {"#": 232}}}}}}},
			b: {e: {"#": -240, s: ["", -241]}, "#": 240},
			s: ["tody", 428],
			d: ["", 639]
		},
		i: {
			r: {c: {l: {e: {"#": -185, "-": ["notch", -186]}}, u: {i: ["t", 184], l: ["ate", 184], m: ["navigate", 221]}}},
			t: ["y", -187],
			p: ["her", 205],
			n: ["ema", 340],
			v: {i: {l: {i: {s: {e: {"#": 704}}, z: {e: {"#": 704}}}}}}
		}
	},
	m: {
		a: {
			i: {n: ["stay", 12], z: ["e", 506], l: ["-bulk", -531]},
			s: {
				t: {e: ["rmind", 103], h: ["ead", 349]}, q: {
					u: {
						e: {
							r: ["ade",
								545], "#": 545
						}
					}
				}, k: ["", -546], s: ["", 578]
			},
			k: ["e", 111],
			r: {
				i: {j: ["uana", 131], h: ["uana", 131]},
				k: {"#": 161, i: ["ng", 539], e: ["r", -540]},
				r: ["ow", 442],
				"#": 540,
				s: {
					"#": -541,
					"-": {d: ["ouble", -542], s: {t: {r: {o: {k: {e: {"#": -543, "-": {h: ["", -544], v: ["", -545]}}}}}}}}
				}
			},
			c: ["hine", 133],
			t: {c: {h: {"#": 161}}},
			n: {
				a: ["gement", 258],
				u: {s: {"#": 428}, f: ["acture", 479]},
				p: ["ower", 428],
				o: {e: {u: {v: {r: {e: {"#": 438}}, e: ["r", 438]}}}},
				e: {u: {v: {e: {r: {"#": 438}}}}},
				l: {i: ["ke", 531], y: ["", 531]},
				f: ["ul", 531],
				s: ["ion", 730]
			},
			l: {
				l: {
					e: {
						t: ["", 411], u: ["s",
							411]
					}
				}, e: ["", -532], a: {r: {k: {y: ["", 952], e: ["y", 952]}}}
			},
			g: {i: {c: {a: ["l", 528], "#": -529}}, n: ["et", -530]},
			p: {
				"#": -533,
				p: ["ing", 532],
				"-": {
					m: {a: {r: {k: {e: {d: {"#": -534, "-": ["alt", -535]}, r: {"#": -536, "-": ["alt", -537]}}}}}},
					p: ["in", -538],
					s: ["igns", -539]
				}
			},
			v: {e: ["n", 785], i: ["n", 785]}
		},
		o: {
			l: {e: ["cule", 45], l: ["ycoddle", 48], d: {"#": 715}},
			t: {
				e: ["", 45],
				o: {
					r: {
						c: {o: ["ach", 115], a: ["r", 133], y: ["cle", -578]},
						b: {u: ["s", 115], i: ["ke", 577]},
						t: ["ruck", 879]
					}
				},
				t: ["le", 194],
				i: ["on", 662]
			},
			d: {e: {r: {a: {t: {e: {"#": 153}}}}}},
			w: ["n", 241],
			v: {i: ["e", 340], e: ["", 697]},
			b: {i: {l: {e: {"#": -566, "-": ["alt", -567]}}}, "#": 685},
			n: {
				e: {
					y: {
						"-": {
							b: {
								i: {
									l: {
										l: {
											"#": -568,
											"-": {a: ["lt", -569], w: {a: {v: {e: {"#": -570, "-": ["alt", -571]}}}}}
										}
									}
								}
							}, c: {h: {e: {c: {k: {"#": -572, "-": ["alt", -573]}}}}}
						}
					}
				}, u: ["ment", -574]
			},
			o: {n: {l: ["ight", 574], s: ["hine", 574], "#": -575}},
			r: ["tar-pestle", -576],
			s: ["que", -577],
			u: {n: {t: {a: ["in", -579], "#": 578}}, s: {e: {"#": -580, "-": ["pointer", -581]}}, l: {d: {"#": 715}}}
		},
		e: {
			a: {s: ["ure", 60], t: ["", 442], n: ["der", 952]},
			n: {
				t: ["ality", 103], "#": 428, a: ["ge", 452],
				o: ["rah", -553]
			},
			t: {
				r: {o: {p: ["olis", 186], "#": 805}, e: ["", 851]},
				h: {a: {m: {p: {h: {e: {t: {a: {m: {i: {n: {e: {"#": 379}}}}}}}}}}}, "#": 379},
				t: ["le", 442],
				e: {o: {r: {o: ["id", 554], "#": -555}}, r: ["", 851]}
			},
			m: {b: ["ranophone", 275], o: {r: {y: {"#": -552}, i: ["al", 573]}}},
			e: {t: {"#": 338}},
			s: {h: ["", 520], s: ["", 578], a: ["", 818]},
			d: {a: {l: {"#": -547, l: {i: {o: {n: {"#": 546}}}}}}, k: ["it", -548], i: ["cine", 582]},
			h: {"#": -549, "-": {b: ["lank", -550], r: ["olling-eyes", -551]}},
			r: ["cury", -554],
			l: ["t", 697]
		},
		i: {
			n: {
				d: ["", 103], o: ["r", 182], t: {"#": 210}, u: {
					s: {
						"#": -562,
						"-": {c: ["ircle", -563], s: ["quare", -564]}
					}
				}
			},
			c: {
				r: {
					o: {
						b: ["e", 110],
						c: ["hip", -556],
						p: {
							h: {
								o: {
									n: {
										e: {
											"#": -557,
											"-": {a: {l: {t: {"#": -558, "-": ["slash", -559]}}}, s: ["lash", -560]}
										}
									}
								}
							}
						},
						s: ["cope", -561]
					}
				}, k: ["le", 578]
			},
			s: ["t", 194],
			d: {d: {l: {e: {"#": 304}}}},
			t: {t: {"#": 428, e: ["n", -565]}},
			k: ["e", 556]
		},
		u: {
			f: ["fin", 370],
			t: ["ilate", 540],
			c: ["kle", 578],
			g: ["-hot", -582],
			s: ["ic", -583],
			l: ["tiplication", 851]
		}
	},
	l: {
		i: {
			n: {c: ["hpin", 12], g: ["", 108], k: {"#": -514, u: ["p", 513]}, e: ["ar", 697]},
			q: {u: {i: {d: {i: {s: ["er", 80], z: ["er", 80]}}}}},
			g: {
				h: {
					t: {
						h: ["eaded",
							260], b: ["ulb", -513]
					}
				}
			},
			f: {e: ["-ring", -512], t: ["", 952]},
			a: ["ison", 513],
			r: ["a-sign", -515],
			s: {t: {i: ["ng", 515], "#": -516, "-": {a: ["lt", -517], o: ["l", -518], u: ["l", -519]}}}
		},
		y: {n: ["chpin", 12], r: ["ic", 496]},
		a: {
			u: {
				r: ["els", 47],
				g: {h: {t: ["er", 500], "#": -501, "-": {b: ["eam", -502], s: ["quint", -503], w: ["ink", -504]}}}
			},
			y: {e: {r: {"#": 69, "-": ["group", -505]}}, o: ["ver", 795]},
			p: {"#": 184, t: {o: {p: {"#": -498, "-": {c: ["ode", -499], m: ["edical", -500]}}}}},
			n: {d: ["mark", -496], g: ["uage", -497]},
			d: ["der", 697],
			m: {"#": 697, e: ["", 781]},
			v: {
				i: ["sh",
					728], a: ["tory", 858], "#": 858
			},
			t: ["her", 743],
			s: {h: ["", 743], t: ["", 834]},
			b: {e: {l: {"#": 824}}, o: ["r", 827]},
			g: {g: {a: ["rd", 868], e: ["r", 868]}}
		},
		o: {
			v: {e: {"#": 69, r: ["", 307]}},
			g: {e: {"#": 99}},
			t: {"#": 184},
			u: {n: ["ge", 230], r: ["", 363]},
			p: ["", 232],
			d: ["ge", 315],
			w: {e: ["r", 363], "-": ["vision", -527]},
			c: {a: ["tion-arrow", -520], k: {"#": -521, "-": ["open", -522]}},
			n: {
				g: {
					"-": {
						a: {
							r: {
								r: {
									o: {
										w: {
											"-": {
												a: {
													l: {
														t: {
															"-": {
																d: ["own", -523],
																l: ["eft", -524],
																r: ["ight", -525],
																u: ["p", -526]
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			z: {e: {n: {g: {e: {"#": 631}}}}},
			o: {
				s: {
					e: {
						n: {
							e: ["ss",
								637], "#": 890
						}
					}
				}, k: {"#": 708, u: ["p", 708]}
			}
		},
		e: {
			d: ["ger", 89],
			g: {e: {r: {"#": 89, d: ["emain", 528]}}},
			a: {
				d: {"#": 153, i: ["ng", 785]},
				r: ["n", 161],
				f: {l: ["et", 354], "#": -506, a: ["ge", 505]},
				n: {i: ["ng", 515], "#": 515}
			},
			v: {e: {l: {"#": 353, "-": {d: ["own-alt", -510], u: ["p-alt", -511]}}}},
			m: ["on", -507],
			s: {s: {"-": {t: {h: {a: {n: {"#": -508, "-": ["equal", -509]}}}}}}}
		},
		u: {c: ["ubrate", 299], g: ["gage-cart", -528], n: ["ation", 574]}
	},
	b: {
		a: {
			c: {
				k: {
					b: ["one", 12],
					s: {p: {a: {c: {e: {r: ["", 50], "#": -51}}}}},
					"#": 51,
					w: {a: {r: {d: {"#": -52, s: ["", 51]}}}},
					g: ["round",
						245]
				}, o: ["n", -53]
			},
			b: {y: {"#": -49, "-": ["carriage", -50]}, e: ["", 48]},
			h: ["ai", -54],
			l: {
				a: {n: {c: {e: {"-": {s: {c: {a: {l: {e: {"#": -55, "-": {l: ["eft", -56], r: ["ight", -57]}}}}}}}}}}},
				k: ["", 161],
				l: {"#": 283, o: ["ck", 283], y: ["hoo", 639]}
			},
			n: {
				"#": -58,
				n: ["ing", 57],
				i: {s: {h: {"#": 57}}},
				d: {"-": ["aid", -59], "#": 184},
				g: {"#": 69},
				a: ["l", 855]
			},
			r: {
				c: ["ode", -60],
				"#": 60,
				s: ["", -61],
				r: {o: ["om", 60], i: {c: {a: {d: {e: {"#": 60}}}}}, e: ["l", 275]},
				f: ["", 151]
			},
			s: {e: {b: ["all-ball", -62], "#": 452}, k: ["etball-ball", -63], h: ["", 757]},
			t: {
				h: {
					r: {o: {o: {m: {"#": 63}}}},
					"#": -64, e: {"#": 63, r: ["", 812]}, t: ["ub", 63]
				},
				t: {
					e: {
						r: {
							y: {
								"-": {
									e: ["mpty", -65],
									f: ["ull", -66],
									h: ["alf", -67],
									q: ["uarter", -68],
									t: ["hree-quarters", -69]
								}
							}
						}
					}
				},
				r: ["achian", 362],
				c: ["h", 578]
			},
			d: ["ger", 110],
			u: ["lk", 161],
			f: ["fle", 234],
			p: {t: {i: {s: {t: {e: ["ry", 358], r: ["y", 358]}}}}},
			g: ["", 806]
		},
		l: {
			a: {c: {k: {b: {a: ["ll", 57], o: ["ard", 154]}, g: ["uard", 262]}}, s: ["t", 343]},
			o: {c: {k: {a: {d: {e: {"#": 60}}, g: ["e", 795]}, "#": 60}}, g: ["", -84], t: ["ch", 779]},
			e: {
				n: {d: {e: {r: {"#": -81, "-": ["phone", -82]}}}}, m: ["ish", 540], e: ["d", 697], s: ["s",
					730]
			},
			i: ["nd", -83],
			u: {f: ["f", 84], s: ["h", 353]}
		},
		e: {
			d: ["", -70],
			e: {r: ["", -71], f: ["burger", 410], p: ["er", 594]},
			l: {l: {"#": -72, "-": ["slash", -73]}, e: ["aguer", 110]},
			z: ["ier-curve", -74],
			f: ["og", 194],
			c: ["loud", 194],
			a: {t: {"#": 275}, r: ["ing", 438]},
			"#": 291,
			t: {"#": 637, o: ["ken", 734]},
			g: ["", 652],
			s: ["peak", 734]
		},
		o: {
			t: ["tom", 69],
			n: {k: {"#": 69}, e: {"#": -88}, g: ["", -89]},
			l: {d: {"#": -85, f: ["ace", 84]}, t: ["", -86], l: ["ock", 283]},
			m: {b: {a: ["rd", 86], "#": -87}},
			o: {
				k: {
					"#": -90, "-": {
						d: ["ead", -91], m: ["edical", -92], o: ["pen", -93], r: ["eader",
							-94]
					}, m: {a: {r: {k: {"#": -95, e: ["r", 94]}}}}, l: ["et", 354]
				}, b: {"#": 278, y: ["", 278]}, m: ["", 299], s: ["t", 447]
			},
			r: {d: {e: {r: {"-": {a: ["ll", -96], n: ["one", -97], s: ["tyle", -98]}, "#": 685}}}, e: ["", 855]},
			w: ["ling-ball", -99],
			x: {"#": -100, w: {o: {o: {d: {"#": 99}}}}, f: {u: {l: {"#": 99}}}, "-": ["open", -101], e: ["s", -102]},
			z: ["o", 151],
			u: ["nder", 262],
			s: {o: ["m", 442], s: ["", 784]},
			d: ["", 715],
			p: ["", 757],
			a: ["rd", 818]
		},
		u: {
			z: ["zer", 71],
			g: ["", -111],
			i: {l: {d: {i: ["ng", -112], "#": 111}}},
			l: {l: {h: ["orn", -113], s: ["eye", -114]}, b: ["", 512]},
			r: {
				n: {
					i: ["ng",
						114], "#": -115
				}, g: ["er", 410], d: ["en", 948], t: ["hen", 948]
			},
			s: {b: ["ar", 115], "#": -116, "-": ["alt", -117], i: ["ness-time", -118], s: ["", 491]},
			f: ["f", 307],
			c: ["k", 453],
			n: ["k", 697]
		},
		i: {
			b: ["le", -75],
			k: {e: {"#": 75}, i: ["ng", -77]},
			c: {y: {c: {l: {e: {"#": -76}}}}},
			n: ["oculars", -78],
			o: ["hazard", -79],
			r: ["thday-cake", -80],
			t: ["e", 114],
			v: ["ouac", 129],
			s: ["cuit", 226],
			l: {k: ["", 234], l: ["fold", 944]},
			d: ["", 637]
		},
		r: {
			a: {
				i: {l: ["le", -103], n: {p: ["ower", 103], "#": -104, i: ["ac", 103]}},
				g: {g: ["ing", 236], "#": 236},
				n: {d: {"#": 866, m: ["ark", 866]}}
			},
			e: {a: {d: ["-slice", -105], k: {"#": 161}}},
			i: {e: {f: {c: {a: {s: {e: {"#": -106, "-": ["medical", -107]}}}}}}, d: ["le", 161], n: ["g", 637]},
			o: {a: ["dcast-tower", -108], o: ["m", -109], w: ["se", 232], c: ["hure", 354]},
			u: {s: {h: {"#": -110, i: ["ng", 109], w: ["ood", 109]}}}
		}
	},
	g: {
		r: {
			o: {u: {n: ["d", 12], c: ["hy", 234]}, k: ["", 221], o: ["m", 869]},
			a: {n: ["t", 47], s: ["p", 221], z: ["e", 232], d: ["uation-cap", -388]},
			u: ["mpy", 234],
			e: {a: {t: {e: {r: {"-": {t: {h: {a: {n: {"#": -389, "-": ["equal", -390]}}}}}}}}}},
			i: {
				m: ["ace", -391],
				n: {
					n: {i: {n: {g: {"#": 391}}}}, "#": -392, "-": {
						a: ["lt",
							-393],
						b: {e: {a: {m: {"#": -394, "-": ["sweat", -395]}}}},
						h: ["earts", -396],
						s: {q: {u: {i: {n: {t: {"#": -397, "-": ["tears", -398]}}}}}, t: ["ars", -399]},
						t: {e: ["ars", -400], o: {n: {g: {u: {e: {"#": -401, "-": {s: ["quint", -402], w: ["ink", -403]}}}}}}},
						w: ["ink", -404]
					}
				},
				p: {
					"-": {
						h: ["orizontal", -405],
						l: {i: {n: {e: {s: {"#": -406, "-": ["vertical", -407]}}}}},
						v: ["ertical", -408]
					}, "#": 806
				}
			}
		},
		i: {
			n: ["mill", 60],
			b: ["e", 161],
			d: ["dy", 260],
			v: {e: {"#": 373}, i: {n: {g: {"#": 373}}}},
			f: {t: {"#": -374, s: ["", -375]}},
			s: ["t", 442]
		},
		o: {
			n: {g: ["", 71], d: ["ola", 133]}, b: ["ble",
				85], s: {s: {i: {p: {"#": 212}}}}, l: {f: ["-ball", -386], e: ["m", 687]}, p: ["uram", -387], "#": 697
		},
		e: {
			n: {i: {u: {s: {"#": 103}}}, d: ["erless", -372]},
			r: ["m", 110],
			l: {d: {e: ["d", 241], "#": 241}},
			m: {"#": -371, s: ["tone", 370]},
			s: ["tural", 730],
			a: {r: {i: ["ng", 869], "#": 869, t: ["rain", 869]}}
		},
		l: {
			i: ["tch", 110],
			o: {
				w: {"#": 114, e: ["r", 363]},
				s: {s: {"#": 212}},
				a: ["t", 236],
				b: {e: {"#": -381, "-": {a: {f: ["rica", -382], m: ["ericas", -383], s: ["ia", -384]}, e: ["urope", -385]}}}
			},
			a: {
				s: {
					s: {
						"-": {
							c: ["heers", -376], m: {a: {r: {t: {i: {n: {i: {"#": -377, "-": ["alt", -378]}}}}}}},
							w: ["hiskey", -379]
						}, "#": 379, e: ["s", -380], f: ["ul", 379]
					}
				}, z: ["e", 379]
			},
			u: ["e", 606]
		},
		a: {
			n: {j: ["a", 131], g: ["", 685]},
			s: {c: ["onade", 236], h: {"#": 241}, b: ["ag", 287], "-": ["pump", -369]},
			m: {e: ["pad", -368], b: {o: {g: ["e", 506], l: ["", 637]}, l: ["ing", 637]}, i: ["ng", 637]},
			v: ["el", -370],
			l: ["lery", 438],
			g: ["", 500]
		},
		u: {y: ["", 151], i: {d: {a: ["nce", 258], e: {"#": 438}}, t: ["ar", -409]}, t: ["ter", 858]},
		h: {o: {s: {t: {"#": -373, w: {r: {i: {t: {e: {r: ["", 372], "#": 372}}}}}}}}},
		y: ["re", 706]
	},
	k: {
		e: {
			y: {
				s: {t: {o: {n: {e: {"#": 12}}}}}, "#": -489, b: ["oard",
					-490]
			}, e: {p: {"#": 281}}, r: ["nel", 442]
		},
		n: {o: {w: ["", 69], c: ["koff", 192]}, i: ["ght", 453], e: ["ll", 685]},
		a: {t: ["", 151], a: ["ba", -488]},
		h: {a: {t: ["", 151], n: ["da", -491]}},
		i: {
			d: ["", 182],
			n: {d: {l: ["e", 343], "#": 759}},
			s: {s: {"#": -492, "-": {b: ["eam", -493], w: ["ink-heart", -494]}}},
			w: ["i-bird", -495],
			b: ["osh", 795]
		}
	},
	r: {
		a: {
			g: {i: ["ng", 21], "#": 824},
			i: {l: {c: ["ar", 133], "#": 869}, s: ["e", 343], n: ["bow", -671]},
			n: {g: {e: {"#": 221}}, d: ["om", -672]},
			t: {i: {o: {n: {a: {l: {i: {s: ["e", 241], z: ["e", 241]}}}}}, f: ["y", 730]}},
			f: ["t", 578],
			d: {
				i: {
					o: {
						t: ["herapy",
							668], a: ["ctivity", 668]
					}, a: {t: {i: {o: {n: {"#": -669, "-": ["alt", -670]}}}}}, u: ["s", 690]
				}
			},
			c: ["e", 697]
		},
		e: {
			a: {r: {w: {a: {r: {d: {"#": 51, s: ["", 51]}}}}}, c: {h: {"#": 221}}, d: ["", 677]},
			l: {e: {g: ["ate", 60], a: ["se", 284]}, a: ["te", 513], i: ["eve", 703]},
			t: {
				i: ["re", 69],
				c: ["h", 151],
				a: ["rd", 161],
				e: {n: {t: {i: {v: {e: ["ness", 551], i: ["ty", 551]}, o: ["n", 551]}}}},
				w: ["eet", -684]
			},
			s: {
				e: {r: ["ve", 89], a: ["rch", 708]},
				p: {o: {n: {s: ["e", 679], d: ["", 679]}}},
				t: ["room", -683],
				o: ["und", 685]
			},
			c: {
				o: {
					r: {d: {"#": 89, "-": ["vinyl", -674]}}, m: ["mendation", 604],
					n: ["struct", 675]
				}, k: ["oner", 118], r: ["eate", 637], e: {p: ["tion", 672], i: ["pt", -673]}, y: ["cle", -675]
			},
			g: {o: ["rge", 151], u: {r: ["gitate", 151], l: ["ate", 715]}, i: {s: {t: {e: {r: {"#": 315, e: ["d", -678]}}}}}},
			m: {
				a: {r: {k: {"#": 212}}, k: ["e", 675]},
				e: ["mbering", 551],
				o: {d: ["el", 675], v: ["e-format", -679]},
				i: ["t", 818]
			},
			p: {
				l: {i: ["cate", 228], e: ["te", 338], y: {"#": -680, "-": ["all", -681]}},
				r: {e: {s: {e: {n: {t: {"#": 532}}}}}, o: ["cess", 674]},
				o: {s: {i: ["tory", 573], e: ["", 610]}},
				u: ["blican", -682]
			},
			d: {
				a: {c: {t: {"#": 230}}}, u: ["ce", 241], d: {
					e: {
						n: {
							e: ["d",
								353], "#": 353
						}
					}
				}, "#": 353, o: {"#": -676, "-": ["alt", -677]}, e: ["em", 703]
			},
			e: ["fer", 485],
			u: ["se", 674],
			f: ["ashion", 675],
			v: ["erberate", 685]
		},
		i: {
			g: ["idly", 85],
			n: {g: {e: ["r", 192], l: {e: {t: {"#": 520}}}, "#": -686, i: ["ng", 685]}},
			v: ["al", 291],
			f: {f: {l: ["e", 505], "#": 505}},
			b: {b: {o: {n: {"#": -685}}}},
			c: ["k", 961]
		},
		o: {
			t: ["ary", 184],
			u: {n: {d: {a: ["bout", 184], "#": 184}}, t: {i: ["ne", 658], e: {"#": -690}}},
			o: {f: ["y", 184], t: ["er", 307]},
			a: {c: ["h", 184], s: ["t", 485], d: {"#": -687}},
			p: {e: {"#": 184, w: ["ay", 870]}, h: ["y", 184]},
			s: ["y", 353],
			v: ["ing",
				565],
			m: ["p", 637],
			l: {e: ["play", 637], l: {"#": 706}},
			b: ["ot", -688],
			c: ["ket", -689],
			q: ["uette", 688],
			e: ["ntgen", 690]
		},
		u: {
			n: {"#": 637, n: ["ing", -698]},
			b: {l: ["e-sign", -693], b: ["ish", 873]},
			l: {e: {"#": 693, r: {"#": -694, "-": {c: ["ombined", -695], h: ["orizontal", -696], v: ["ertical", -697]}}}},
			p: ["ee-sign", -699]
		},
		"#": 690,
		s: {s: {"#": -691, "-": ["square", -692]}}
	},
	w: {
		i: {
			l: ["d", 21],
			t: {"#": 103, c: ["hing", 528]},
			r: ["etap", 110],
			e: {n: {e: {r: {"#": 262, w: {u: {r: {s: {t: {"#": 262}}}}}}}}},
			n: {
				n: ["ow", 307], k: ["", 444], d: {
					e: ["r", 488],
					s: ["ock", 757],
					i: ["ng", 952],
					"#": -953,
					o: {w: {"-": {c: ["lose", -954], m: {a: ["ximize", -955], i: ["nimize", -956]}, r: ["estore", -957]}}}
				}, e: {"-": {b: ["ottle", -958], g: {l: {a: {s: {s: {"#": -959, "-": ["alt", -960]}}}}}}}
			},
			z: {a: {r: {d: {l: ["y", 528], "#": 528}}}, "#": 785},
			f: ["i", -952]
		},
		h: {
			e: {e: {l: {"#": 75, c: ["hair", -951]}}},
			i: {r: ["lybird", 445], p: ["", 743], z: {z: ["", 785], "#": 785}},
			o: {r: {l: {"#": 520}}, p: ["", 757]},
			a: ["p", 757]
		},
		a: {
			t: {c: ["h", 161], e: {r: {s: {h: {e: {d: {"#": 259}}}}, c: ["ourse", 800], "#": -947}}},
			y: ["", 258],
			r: {
				m: {
					n: ["ess", 442], h: ["eartedness",
						442]
				}, e: ["house", -946]
			},
			n: {d: {e: {r: {i: ["ng", 565], e: ["r", 777], "#": 952}}}},
			d: {"#": 578},
			g: ["er", 637],
			i: ["ter", 714],
			l: {k: {"#": 943, i: ["ng", -944]}, l: ["et", -945]},
			v: ["e-square", -948]
		},
		o: {
			r: {k: {"#": 232, f: ["orce", 428], i: ["ng", 697]}, l: ["d", 380], d: ["s", 496]},
			o: ["zy", 260],
			n: {d: ["er", 662], "-": ["sign", -961]}
		},
		e: {
			a: {k: ["ened", 241], r: {"#": 855, y: ["", 855]}, v: ["e", 952]},
			e: {n: {i: {e: {"#": 262}}}, w: ["ee", 946]},
			l: ["t", 743],
			i: {g: {h: {t: {"#": -949, i: {n: {g: ["", 948], e: ["ss", 948]}}, "-": ["hanging", -950]}}}}
		},
		r: {
			a: {
				i: ["th", 372],
				p: ["", 952]
			}, i: {t: {e: {"#": 611}}, n: ["g", 961], c: ["k", 961]}, e: {a: {k: ["", 637], t: ["he", 952]}, n: ["ch", -962]}
		}
	},
	t: {
		e: {
			m: {
				p: {
					e: {s: ["tuous", 21], r: {a: {t: {u: {r: {e: {"-": {h: ["igh", -832], l: ["ow", -833]}}}}}}}},
					l: ["e", 814]
				}
			},
			l: {
				a: ["mon", 44],
				e: {
					f: ["ax", 310],
					p: {h: {o: {n: {e: {"#": 623}}}}},
					c: {a: {s: {t: {i: {n: {g: {"#": 886}}}}}}},
					v: {i: {s: {i: {o: {n: {"#": 886}}}}}}
				},
				l: ["y", 886]
			},
			a: ["se", 110],
			s: {t: {i: {s: ["", 283], c: ["le", 283]}}},
			r: {m: {i: {n: {a: {t: {e: {"#": 343}}, l: ["", -835]}, o: ["logy", 496], u: ["s", 834]}}}},
			n: {
				d: {
					e: {r: {n: ["ess", 442], "#": 784}},
					"#": 697
				}, g: ["e", -834]
			},
			e: {m: ["", 800], t: {h: {"#": -830, "-": ["open", -831]}}},
			x: {t: {"-": {h: ["eight", -836], w: ["idth", -837]}}}
		},
		a: {
			p: {r: ["oom", 60], "#": 110, i: ["ng", 826], e: {"#": -827, l: ["ine", 826]}},
			n: ["", 114],
			b: {
				"#": 161,
				l: {e: {t: {"#": -821, "-": ["alt", -822], s: ["", -823]}, "#": -819, "-": ["tennis", -820]}},
				e: ["rnacle", 814],
				u: {l: {a: {r: {i: {z: ["e", 818], s: ["e", 818]}}, t: ["e", 818]}}}
			},
			l: {l: ["y", 161], e: {n: {t: {"#": 373}}}},
			i: {n: ["t", 194], l: {o: ["r", 241], "#": 262}},
			g: {"#": -825, s: ["", -826]},
			r: ["tar", 273],
			k: {e: {"#": 338}},
			c: ["hometer-alt",
				-824],
			t: {t: {e: {r: {"#": 824}}}},
			x: {"#": 827, i: {c: ["ab", 828], "#": -829}},
			s: {k: {"#": 827, s: ["", -828]}}
		},
		u: {b: {"#": 63, e: ["", 805]}, r: {k: ["ey", 86], n: {"#": 637}, d: ["", 648]}},
		o: {
			l: ["l", 71],
			w: ["er", 211],
			p: ["", 237],
			u: {c: {h: {"#": 291}}},
			a: ["d", 362],
			n: {a: ["lity", 488], e: ["", 853]},
			y: ["", 637],
			s: ["s", 743],
			o: {t: {h: {"#": -863}}, l: {b: ["ox", -861], "#": 861, s: ["", -862]}},
			g: {g: {l: {e: {"-": {o: {f: ["f", -857], n: ["", -858]}}}}}},
			i: {l: {e: {t: {t: ["e", 858], "#": -859, "-": ["paper", -860]}}}},
			r: {a: ["h", -864], i: ["i-gate", -865]}
		},
		h: {
			u: {
				n: ["derbolt",
					85], m: {b: {"#": 505, s: {"-": {d: ["own", -848], u: ["p", -849]}}, t: ["ack", -850]}}
			},
			i: {c: ["ket", 109], n: {n: ["ed", 241], "#": 241}},
			w: {a: {r: {t: {"#": 234, w: ["ise", 234]}}}},
			r: {
				u: ["m", 275],
				i: ["ve", 299],
				e: {a: {d: {"#": 684, b: ["are", 855]}}, s: ["h", 743]},
				a: ["sh", 743],
				o: ["ne", 858]
			},
			a: ["umaturgy", 528],
			o: ["rium", 837],
			"#": -838,
			"-": {l: {a: ["rge", -839], i: ["st", -840]}},
			e: {
				a: ["ter-masks", -841],
				r: {
					m: {
						o: {
							m: {
								e: {
									t: {
										e: {
											r: {
												"#": -842,
												"-": {
													e: ["mpty", -843],
													f: ["ull", -844],
													h: ["alf", -845],
													q: ["uarter", -846],
													t: ["hree-quarters", -847]
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		r: {
			a: {
				i: {
					n: {"#": -870},
					l: {"#": 262, e: ["r", -869]}
				},
				n: {
					s: {
						c: ["ript", 228],
						v: {e: {r: {s: {a: ["l", 234], e: ["", 234]}}}},
						p: ["ort", 722],
						g: {e: {n: {d: {e: {r: {e: ["d", 871], "#": -872, "-": ["alt", -873]}}}}}}
					}
				},
				v: ["erse", 234],
				c: {k: {"#": 234}, e: ["", 372], t: ["or", -866]},
				s: {h: {"#": -874, "-": {a: ["lt", -875], r: {e: {s: {t: {o: {r: {e: {"#": -876, "-": ["alt", -877]}}}}}}}}}},
				m: {p: ["", 447], c: ["ar", 870], w: ["ay", 870], "#": -871},
				d: ["emark", -867],
				f: ["fic-light", -868]
			},
			i: {
				m: {"#": 232, m: ["ed", 241]},
				u: ["mph", 236],
				c: {k: {l: ["e", 341], "#": 528}, e: ["", 444]},
				f: ["le", 637],
				t: ["e",
					855],
				p: ["e", 873]
			},
			e: {e: {t: ["op", 237], "#": -878}, n: ["d", 241], a: ["sure", 370]},
			o: {p: {e: {"#": 475}, h: ["y", -879]}, u: ["nce", 743], l: ["ley", 870]},
			u: {
				m: ["pery", 873],
				c: {
					k: {
						"#": -880,
						"-": {l: ["oading", -881], m: {o: {n: ["ster", -882], v: ["ing", -883]}}, p: ["ickup", -884]}
					}
				}
			}
		},
		i: {
			c: {k: {"#": 161, e: {r: ["", 442], t: {"#": 824, "-": ["alt", -851]}}}},
			d: ["dler", 182],
			k: ["e", 182],
			m: {e: {"#": 191, s: {"#": -852, "-": ["circle", -853]}, w: ["orn", 855]}},
			p: {"#": 237},
			e: ["", 513],
			l: ["t", 515],
			n: {
				t: {i: ["nnabulation", 685], "#": -854, "-": ["slash", -855]}, c: {
					t: {
						u: ["re",
							853], "#": 853
					}
				}, g: ["e", 853]
			},
			r: {e: {d: ["", -856], "#": 855}}
		},
		y: {k: ["e", 182], m: ["pan", 275], p: ["eface", 358]},
		w: {i: {n: {k: ["ling", 444], e: ["", 952]}, s: {t: {"#": 952}}}},
		s: ["hirt", -885],
		t: ["y", -886],
		v: ["", -887]
	},
	f: {
		u: {
			r: ["ious", 21],
			c: ["k", 69],
			s: ["sy", 234],
			l: {f: {i: {l: {"#": 338, l: ["", 338]}}}},
			e: ["l", 343],
			n: {
				n: ["el-dollar", -366],
				d: {a: ["mental", 488], "#": 798},
				c: {t: {i: {o: {n: {"#": 532, a: ["l", 697]}}}}},
				"#": 637
			},
			t: ["bol", -367],
			m: ["e", 750]
		},
		e: {
			a: {
				t: {
					h: {
						e: {
							r: {
								b: {e: ["d", 48], r: ["ained", 260]}, "#": -312, i: ["ng", 311], "-": ["alt",
									-313]
							}
						}
					}
				}
			},
			e: {b: ["leminded", 51], d: ["", 697]},
			m: ["ale", -314],
			r: {v: {o: {u: ["r", 343], r: ["", 343]}, e: ["ncy", 343], i: ["dness", 343]}}
		},
		o: {
			r: {
				b: {i: {d: {d: {a: ["nce", 57], i: ["ng", 57]}}}},
				e: {s: ["horten", 241], "#": 361, t: ["oken", 730]},
				r: {a: {d: {e: ["r", 361], "#": 361}, r: ["d", 361]}},
				w: {a: {r: {d: {"#": -362, s: ["", 361]}}}},
				t: ["h", 361],
				g: {e: {"#": 411}},
				m: {"#": 715}
			},
			g: ["", 194],
			i: ["l", 234],
			c: {u: {s: {"#": 258, s: ["ing", 258], i: ["ng", 258]}}},
			l: {
				d: {e: {r: {"#": -355, "-": {m: ["inus", -356], o: ["pen", -357], p: ["lus", -358]}, o: ["l", 873]}}}, i: {
					o: ["",
						505], a: ["ge", 505]
				}
			},
			n: {t: {"#": -359, "-": ["awesome-logo-full", -360]}, d: ["ness", 442]},
			u: {n: ["t", 358], r: ["square", 781]},
			o: ["tball-ball", -361]
		},
		l: {
			u: {n: ["k", 86], s: {h: {"#": 353, e: ["d", -354]}}, i: ["d", 565]},
			o: {u: ["rish", 299], c: ["k", 578], w: {"#": 697}, g: ["", 743]},
			e: {d: ["ge", 311], s: ["h", 715]},
			i: {c: {k: {"#": 340}}, p: ["", 505], r: ["t", 637]},
			a: {
				k: {"#": 343, e: ["", 754]},
				c: ["k", 343],
				m: {e: ["", 343], i: ["ng", 343]},
				g: {s: ["tone", 349], "#": -350, "-": {c: ["heckered", -351], u: ["sa", -352]}},
				s: {k: {"#": -353, f: ["ul", 352]}, h: ["", 444]},
				t: {
					"#": 634,
					u: ["s", 952]
				}
			}
		},
		a: {
			i: ["l", 86],
			n: {"#": -308, c: {y: {"#": 475}}},
			s: {t: {"-": {b: ["ackward", -309], f: ["orward", -310]}}},
			x: ["", -311],
			c: {s: ["imile", 310], e: {"#": 358}},
			m: ["ily", 452],
			g: ["", 855],
			t: ["igue", 855],
			r: {t: {i: ["ng", 952], "#": 952}}
		},
		i: {
			r: {
				e: {
					"#": -344,
					d: {o: ["g", 262], r: ["ake", 273]},
					"-": {a: ["lt", -345], e: ["xtinguisher", -346]},
					p: ["lug", 639]
				}, i: ["ng", 343], s: ["t-aid", -347]
			}, g: {u: {r: {e: {r: ["", 118], "#": 475}}}, h: ["ter-jet", -315]}, t: ["", 161], l: {
				e: {
					"#": -316, "-": {
						a: {l: ["t", -317], r: ["chive", -318], u: ["dio", -319]},
						c: {
							o: {
								d: ["e",
									-320], n: ["tract", -321]
							}, s: ["v", -322]
						},
						d: ["ownload", -323],
						e: {x: {c: ["el", -324], p: ["ort", -325]}},
						i: {m: {a: ["ge", -326], p: ["ort", -327]}, n: {v: {o: {i: {c: {e: {"#": -328, "-": ["dollar", -329]}}}}}}},
						m: {e: {d: {i: {c: {a: {l: {"#": -330, "-": ["alt", -331]}}}}}}},
						p: {d: ["f", -332], o: ["werpoint", -333], r: ["escription", -334]},
						s: ["ignature", -335],
						u: ["pload", -336],
						v: ["ideo", -337],
						w: ["ord", -338]
					}
				}, l: {i: ["ng", 338], "#": -339, "-": ["drip", -340]}, m: ["", -341], t: {r: ["ate", 341], e: ["r", -342]}
			}, n: {
				g: {e: {r: {p: ["rint", -343], m: ["ark", 342]}}}, i: ["sh",
					795], a: ["l", 834]
			}, s: {h: ["", -348], t: ["-raised", -349]}, d: ["dle", 637]
		},
		r: {
			y: ["", 182],
			a: {m: {e: {"#": 230}}, c: ["tion", 259], n: {k: {"#": 262, f: {u: {r: {t: {e: {r: {"#": 262}}}}}}}}},
			u: {s: ["trate", 234], m: ["p", 262]},
			o: {
				n: {t: {w: {a: {r: {d: {s: ["", 361], "#": 361}}}}}},
				g: ["", -363],
				w: {n: {"#": -364, "-": ["open", -365]}},
				l: ["ic", 637]
			}
		}
	},
	p: {
		a: {
			r: {
				t: {i: ["cle", 45], "#": 259, a: ["ke", 716]},
				a: {d: {i: {g: {m: {"#": 475}}}}, c: ["hute-box", -602], g: ["raph", -603]},
				k: {"#": 603, i: ["ng", -604]},
				c: ["el", 716]
			},
			m: {p: {e: ["r", 48], h: ["let", 354]}},
			c: {
				k: {
					a: {g: {e: {"#": 99}}},
					"#": 685
				}, i: ["fication", 610]
			},
			s: {t: {u: ["re", 232], a: ["farianism", -606], e: ["", -607]}, s: {"#": 428, e: ["l", 578], p: ["ort", -605]}},
			t: {e: {"#": 237}, h: ["", 689], t: ["ern", 715]},
			w: {l: ["", 262], "#": -610},
			i: {n: {t: {"#": 488, "-": {b: ["rush", -596], r: ["oller", -597]}}}},
			l: {m: {"#": 546}, l: {e: {t: {t: ["e", 597], "#": -599}}, "#": 855}, e: {t: {t: {e: {"#": -598}}}}},
			p: {e: {r: {"#": 585, "-": ["plane", -600], c: ["lip", -601]}}},
			g: ["er", -595],
			u: {s: {e: {"#": -608, "-": ["circle", -609]}}},
			d: {"#": 820},
			n: ["", 873]
		},
		r: {
			i: {
				z: {e: {"#": 47}}, m: {a: {l: ["", 488], "#": 785}},
				n: {t: ["", -658], c: ["ipal", 785]}, v: ["y", 858], c: ["k", 861]
			},
			e: {
				s: {
					e: {n: {t: {"#": 47}}, r: ["ve", 703]},
					i: ["dent", 153],
					s: ["", 222],
					c: {
						r: {
							i: {
								p: {
									t: {
										i: {
											o: {
												n: {
													"#": -655,
													"-": {b: {o: {t: {t: {l: {e: {"#": -656, "-": ["alt", -657]}}}}}}}
												}
											}
										}
									}
								}
							}
						}
					}
				}, v: {e: ["ntion", 60], a: ["il", 697], i: ["ew", 868], u: ["e", 868]}, i: ["ndication", 730], p: ["are", 869]
			},
			o: {
				h: ["ibition", 57],
				s: ["cription", 57],
				g: ["ress", 111],
				f: ["essorship", 153],
				v: ["oke", 343],
				t: {o: {t: {y: {p: {e: {"#": 475}}}}}},
				j: {e: {c: {t: {"#": 475, "-": ["diagram", -660], i: ["le", 688]}}}},
				c: {
					e: {
						d: {
							u: {
								r: {
									e: {
										"#": 658,
										s: ["", -659]
									}
								}
							}
						}, s: ["s", 658]
					}
				},
				r: ["ogue", 818]
			},
			u: {n: {e: {"#": 232}}},
			a: {y: {"#": -653, i: ["ng-hands", -654]}}
		},
		e: {
			d: {a: {l: {"#": 75}}},
			a: {r: ["l", 87], k: ["", 237], c: {e: {n: ["ik", 270], f: ["ulness", 610], "#": -611}}, l: ["", 685]},
			s: {t: {e: ["r", 110], l: ["e", 784]}},
			n: {
				n: ["ant", 237],
				i: ["tentiary", 611],
				"#": -612,
				"-": {a: ["lt", -613], f: ["ancy", -614], n: ["ib", -615], s: ["quare", -616]},
				c: {i: {l: {"-": {a: ["lt", -617], r: ["uler", -618]}}}}
			},
			e: {r: ["", 291], "#": 946},
			r: {
				m: ["eate", 341], c: {o: ["late", 341], e: {n: {t: {"#": -621, a: {g: {e: {"#": -622}}}}}}},
				s: {o: {n: {a: {"#": 475}, "-": ["booth", -623]}}, i: ["st", 697]}, e: ["grine", 565], i: ["od", 795]
			},
			c: {k: {"#": 578, e: ["r", 861]}},
			o: ["ple-carry", -619],
			p: ["per-hot", -620],
			l: ["t", 800],
			t: ["er", 861]
		},
		l: {
			a: {
				y: {s: ["cript", 89], p: ["en", 611], "#": -638, a: ["ct", 637], "-": ["circle", -639]},
				c: {e: {"#": 452, "-": ["of-worship", -634]}},
				t: ["e", 452],
				n: {e: {"#": -635, r: ["", 634], "-": {a: ["rrival", -636], d: ["eparture", -637]}, t: ["", 701]}}
			}, u: {
				n: {g: ["e", 270], k: ["", 270]}, m: {e: ["", 311], a: ["ge", 311]}, g: ["", -640], s: {
					"#": -641, "-": {
						c: ["ircle", -642], s: ["quare",
							-643]
					}
				}
			}, e: ["nty", 578], y: ["", 697], o: {u: ["ghshare", 716], w: ["share", 716], s: ["ive", 795]}
		},
		s: ["yche", 103],
		u: {
			k: ["e", 151],
			r: {g: {e: {"#": 151}}},
			t: {"#": 230, z: ["", 861]},
			m: ["p", 442],
			l: {s: {a: ["tion", 444], e: ["", 444]}, l: {u: ["late", 800], "#": 961}},
			s: {s: ["yfoot", 579], h: ["pin", 849]},
			n: ["ch", 639],
			b: ["lish", 657],
			z: ["zle-piece", -661],
			p: ["pet", 861]
		},
		i: {
			l: {l: {a: ["r", 211], s: ["", -632], "#": 631}, e: ["", 578]},
			n: {h: ["ead", 278], "#": 349},
			c: {t: {u: {r: {e: {"#": 340}}}}, "#": 340},
			t: ["h", 442],
			g: {g: ["y-bank", -631], e: ["onhole", 784]},
			z: ["za-slice",
				-633],
			d: ["dle", 946],
			s: ["s", 946]
		},
		o: {
			l: {l: {"#": -645, a: ["rd", 644], "-": ["h", -646]}, a: ["rity", 730], e: ["", 834]},
			p: ["ulist", 244],
			u: {n: {d: {i: ["ng", 411], "#": 411, "-": ["sign", -651]}}, r: ["", 800]},
			i: {n: {t: {"#": 438}}},
			t: {"#": 578, t: ["y", 858]},
			r: {t: {i: {o: {n: {"#": 621}}}, r: {a: {i: {t: {"#": -650, u: ["re", 649]}}, y: ["al", 649]}}}},
			s: {i: ["tive", 640], t: {a: ["ge", 784], p: ["one", 818]}},
			d: ["cast", -644],
			o: {"#": -647, "-": ["storm", -648], p: ["", -649]},
			w: ["er-off", -652],
			k: ["e", 868],
			c: ["ketbook", 944]
		},
		h: {
			o: {
				n: {
					e: {
						"#": -624, "-": {
							a: ["lt",
								-625], s: {l: ["ash", -626], q: {u: {a: {r: {e: {"#": -627, "-": ["alt", -628]}}}}}}, v: ["olume", -629]
						}
					}
				}, t: ["o-video", -630]
			}, i: {l: ["ia", 442], a: {l: {"#": 930}}}, y: ["sique", 715]
		},
		c: {t: {"#": 620}}
	},
	h: {
		o: {
			n: {o: {r: ["", 47], u: ["r", 47]}, k: ["", 151]},
			l: {d: {"#": 89}, l: ["y-berry", -452]},
			m: {b: ["re", 151], e: ["", -453]},
			u: {
				n: ["d", 262],
				s: {e: {"#": 452, h: ["old", 452], "-": ["damage", -466]}},
				r: {g: {l: {a: {s: {s: {"#": -462, "-": {e: ["nd", -463], h: ["alf", -464], s: ["tart", -465]}}}}}}}
			},
			t: {d: {o: {g: {"#": -460}}}, "-": ["tub", -459], e: ["l", -461], s: ["hot", 785]},
			c: ["key-puck", -451],
			r: {s: {e: {"#": -454, "-": ["head", -455]}}},
			s: {p: {i: {t: {a: {l: {"#": -456, "-": {a: ["lt", -457], s: ["ymbol", -458]}}}}}}, t: ["", 714]},
			o: {p: {l: ["a", 639], "#": 685}},
			i: ["st", 952]
		},
		u: {m: ["p", 69], n: {t: {"#": 697, i: ["ng", 708]}}},
		e: {
			a: {
				d: {
					"#": 103,
					e: ["r", 438],
					i: ["ng", -439],
					p: {h: {o: {n: {e: {"#": 439, s: {"#": -440, "-": ["alt", -441]}}}}}},
					s: {e: ["t", -442], t: ["one", 488]},
					l: ["iner", 785]
				},
				t: ["her", 108],
				p: {"#": 115},
				r: {t: {"#": -443, "-": ["broken", -444], b: ["eat", -445], s: ["ease", 610], y: ["", 781]}}
			}, m: {
				i: {
					p: {
						t: {
							e: {
								r: {
									a: ["n",
										110], o: ["n", 110]
								}
							}
						}
					}
				}, p: ["", 131]
			}, e: {l: {"#": 262}}, l: ["icopter", -446], s: ["itate", 607]
		},
		i: {
			t: {c: {h: {"#": 161}}},
			n: {d: {r: ["ance", 161], e: ["rance", 161]}, t: ["", 952]},
			g: ["hlighter", -447],
			k: {i: ["ng", -448], e: ["", 447]},
			p: {p: {o: {p: ["otamus", 448], "#": -449}}},
			s: ["tory", -450]
		},
		a: {
			l: {t: {"#": 161}, o: ["", 685], l: ["mark", 866]},
			n: {
				d: {
					i: ["cap", 161],
					"-": {
						h: {o: {l: {d: {i: {n: {g: {"#": -414, "-": {h: ["eart", -415], u: ["sd", -416]}}}}}}}},
						l: ["izard", -417],
						m: ["iddle-finger", -418],
						p: {
							a: ["per", -419], e: ["ace", -420], o: {
								i: {
									n: {
										t: {
											"-": {
												d: ["own",
													-421], l: ["eft", -422], r: ["ight", -423], u: ["p", -424]
											}, e: ["r", -425]
										}
									}
								}
							}
						},
						r: ["ock", -426],
						s: {c: ["issors", -427], p: ["ock", -428]}
					},
					w: ["riting", 428],
					s: {"#": -429, "-": ["helping", -430], h: {a: {k: {e: ["", -431], i: ["ng", 430]}}}},
					"#": 428,
					c: ["lasp", 430]
				}, u: ["kiah", -432]
			},
			r: {v: ["est", 232], d: ["-hat", -433]},
			c: {k: {"#": 241, n: ["eyed", 855]}},
			u: ["nt", 372],
			m: {b: ["urger", -411], m: {e: {r: {"#": -412, i: ["ng", 411]}}}, s: ["a", -413]},
			s: ["htag", -434],
			t: {"-": {c: {o: {w: {b: {o: {y: {"#": -435, "-": ["side", -436]}}}}}}, w: ["izard", -437]}, f: ["ul", 578]},
			b: ["itation", 452]
		},
		y: {
			b: {
				r: {
					i: {
						d: {
							i: {s: {a: ["tion", 234], e: ["", 234]}, z: {e: ["", 234], a: ["tion", 234], i: ["ng", 234]}},
							"#": 234
						}
					}
				}
			}, d: ["rargyrum", 553], p: ["e", 639]
		},
		"-": ["square", -410],
		d: ["d", -438],
		r: ["yvnia", -467]
	},
	i: {
		n: {
			d: {
				u: {l: ["ge", 48], e: {"#": 373}, s: {t: {r: {i: ["ousness", 479], y: ["", -480]}}}},
				i: {f: ["ferent", 243], t: ["e", 611], c: ["ate", 734]},
				e: {n: {t: {i: ["on", 478], a: ["tion", 478], u: ["re", 478], "#": -479}}}
			},
			f: {
				a: ["nt", 48], l: {a: ["te", 299], u: ["ence", 715]}, i: {r: ["mary", 455], n: ["ity", -481]}, o: {
					"#": -482, r: ["mation", 481],
					"-": ["circle", -483]
				}, e: ["rior", 804]
			},
			t: {
				e: {
					r: {
						c: {e: {p: {t: {"#": 110}}}},
						s: ["ect", 234],
						b: {r: {e: {e: {d: {"#": 234, i: ["ng", 234]}}}}},
						n: ["al", 452],
						i: ["or", 452],
						l: {a: ["ce", 520], o: ["ck", 520]},
						m: {i: {t: ["", 607], s: ["sion", 607]}},
						r: {u: ["ption", 607], o: {g: {a: {t: {i: {o: ["n", 662], v: ["e", 662]}, e: ["", 662]}}}}},
						v: ["iew", 662]
					}
				}
			},
			c: {i: ["nerate", 114], l: {i: {n: {a: ["tion", 515], e: ["", 697]}}}},
			s: {
				u: ["re", 161],
				c: ["ribe", 205],
				t: {r: {u: {c: ["tion", 258], m: ["ent", 861]}}, a: ["nt", 444]},
				o: ["late", 808]
			},
			p: {u: {t: {"#": 212}}},
			v: {e: {s: {t: {"#": 373}}}},
			w: ["ardness", 442],
			b: ["ox", -478],
			q: ["uiry", 662]
		},
		v: ["ory", 87],
		m: {
			p: {e: ["diment", 161], a: ["ir", 540], l: ["ore", 652], r: {e: {s: {s: {"#": 657, i: ["on", 784]}}}}},
			i: ["tate", 228],
			a: {g: {e: {"#": -476, s: ["", -477]}}}
		},
		s: ["sue", 241],
		g: {n: ["ore", 241], l: {u: ["", 474], o: ["o", -475]}},
		r: {i: ["s", 349], r: {a: ["diation", 668], i: ["gate", 946]}},
		c: {
			e: {"#": 379, "-": ["cream", -469]},
			i: {c: {l: {e: {"#": 469, s: ["", -470]}}}},
			o: {n: {"#": 470, s: ["", -471]}}
		},
		"-": ["cursor", -468],
		k: {o: {n: {"#": 470}}},
		d: {
			"-": {
				b: ["adge", -472], c: {
					a: {
						r: {
							d: {
								"#": -473, "-": ["alt",
									-474]
							}
						}
					}
				}
			}, e: ["ntify", 488]
		},
		t: {a: ["lic", -484], i: ["nerary", 689]},
		l: ["lusion", 528]
	},
	o: {
		s: {
			t: {r: {a: {c: {i: {s: ["e", 57], z: ["e", 57]}}}}},
			"#": 87,
			c: {u: {l: {a: {t: {i: ["on", 491], e: ["", 491]}}}}}
		},
		m: {n: ["ibus", 115], "#": -592},
		v: ["ercast", 194],
		b: {
			n: ["ubilate", 194],
			s: {c: ["ure", 194], e: ["ss", 372]},
			j: {e: {c: {t: {"-": {g: ["roup", -589], u: ["ngroup", -590]}}}}}
		},
		r: {b: {i: {t: {"#": 221, e: ["r", 701]}}, "#": 380}, c: ["his", 283]},
		p: {t: ["ic", 304], e: {r: {a: {t: {e: {"#": 520}, i: {o: ["n", 658], v: ["e", 697]}}}}}, p: ["ugn", 662]},
		c: {
			u: ["lus", 304], c: {
				u: ["py",
					338], l: {u: {s: {i: {v: ["e", 795], o: ["n", 795]}}}}
			}
		},
		n: {w: {a: {r: {d: {s: ["", 361], "#": 361}}}}},
		i: ["l-can", -591],
		t: ["ter", -593],
		u: {t: {d: ["ent", -594], w: ["ear", 855]}}
	},
	e: {
		x: {
			c: {
				l: {
					u: {d: {e: {"#": 60}}},
					a: {
						m: {a: {t: {i: {o: {n: {"#": -297, "-": {c: ["ircle", -298], t: ["riangle", -299]}}}}}}},
						i: ["ming", 296]
					}
				}, i: ["sion", 241], h: ["ange-alt", -296]
			},
			h: {a: {u: {s: {t: {"#": 284}}}}, i: {b: {i: {t: {o: ["r", 728], i: ["oner", 728]}}}}},
			p: {
				e: ["l", 284], o: {u: ["nd", 299], s: ["it", 299]}, a: {
					n: {d: {"#": -300, "-": {a: {l: ["t", -301], r: ["rows-alt", -302]}}}}, t: ["iate",
						299]
				}, l: {o: {r: ["e", 708], i: {t: {e: {r: {"#": 898}}}}}}
			},
			t: {
				e: {
					n: {d: {"#": 299}},
					r: {n: {a: {l: {"-": {l: {i: {n: {k: {"-": {a: ["lt", -303], s: ["quare-alt", -304]}}}}}}}}}}
				}
			},
			e: ["cute", 697]
		},
		f: {f: {"#": 69, i: {g: {y: {"#": 475}}}}},
		n: {
			c: {
				e: ["phalon", 103],
				o: {u: {n: {t: {e: {r: {"#": 109}}}}}},
				a: {m: ["pment", 129], p: ["sulate", 132]},
				i: {r: ["cle", 184], p: ["her", 205]},
				r: ["ypt", 205]
			},
			s: ["ure", 161],
			v: {
				e: {
					l: {
						o: {
							p: {
								e: {
									"#": -288,
									"-": {o: {p: {e: {n: {"#": -289, "-": ["text", -290]}}}}, s: ["quare", -291]}
								}
							}
						}
					}
				}, i: {s: {i: {o: {n: {"#": 475}}}}, r: ["on", 685]}
			},
			l: ["arge",
				299],
			k: ["indle", 343],
			d: {u: {e: {"#": 373}, r: ["e", 697]}, o: {w: {"#": 373, m: {e: {n: {t: {"#": 373}}}}}}, "#": 795},
			g: ["age", 520],
			q: ["uiry", 662],
			t: ["repot", 798]
		},
		d: {i: {f: ["ice", 111], t: {o: ["rial", 211], "#": -283}}, u: {c: {a: {t: {e: {"#": 704}}}}}},
		s: {t: {a: ["blish", 111], i: ["mator", 118]}, s: ["ence", 442], c: ["ape", 697]},
		m: {
			a: ["sculated", 241],
			p: {o: {w: {e: {r: {"#": 373}}}}, h: {a: {s: {i: {s: ["e", 889], z: ["e", 889]}}}}},
			b: {o: {d: ["iment", 715], s: ["s", 784]}, a: ["rk", 722]}
		},
		g: {g: {"#": -284, s: ["", 283], b: ["eater", 445]}},
		j: ["ect", -285],
		l: {
			l: {
				i: {
					p: {
						s: {
							i: {
								s: {
									"-": {
										h: ["",
											-286], v: ["", -287]
									}
								}
							}
						}
					}
				}
			}, a: ["borate", 299], i: ["cit", 343]
		},
		q: {u: {a: {l: {i: {s: ["e", 291], z: ["e", 291]}, s: ["", -292], "#": 291}, t: ["e", 291]}}},
		r: ["aser", -293],
		t: {h: ["ernet", -294], e: ["rnity", 480]},
		u: {r: ["o-sign", -295], p: ["hony", 582]},
		c: {p: ["honesis", 296], h: ["o", 685], o: {n: {o: {m: {i: {s: ["e", 703], z: ["e", 703]}}}}}},
		y: {e: {b: ["all", 304], "#": -305, "-": {d: ["ropper", -306], s: ["lash", -307]}, g: ["lasses", 379]}},
		v: {o: ["ke", 343], e: ["n", 353]},
		a: {r: {t: ["h", 380], p: {i: {e: {c: {e: {"#": 439}}}}, h: {o: {n: {e: {"#": 439}}}}}, m: ["ark", 866]}},
		p: {i: {t: {o: {m: {e: {"#": 475}}}}}}
	},
	d: {
		e: {
			b: {a: ["r", 60], o: ["ne", 87]},
			a: {d: ["bolt", 85], f: {"#": -244, e: ["n", 243]}, l: {"#": 428}},
			c: {a: ["mp", 85], e: ["ption", 528], o: {r: {a: {t: {i: {o: {n: {"#": 546}}}}}}}},
			l: {a: ["y", 161], e: {t: {i: ["on", 241], e: ["", 282]}}, i: ["ver", 703]},
			t: {e: {r: {r: ["ent", 161], m: {i: {n: {e: {"#": 161}}}}}, n: ["t", 262]}},
			f: {i: ["le", 194], e: {c: ["t", 540], r: ["", 818]}, l: ["ower", 540]},
			m: ["ocrat", -245],
			s: {k: ["top", -246], c: ["ribe", 488]},
			v: {o: ["tee", 307], e: ["lop", 869]},
			o: {x: {y: {e: {p: {h: {e: {d: {r: {i: {n: {e: {"#": 379}}}}}}}}}}}},
			n: {t: {"#": 478, i: ["tion", 829]}},
			p: {o: {t: {"#": 798}}}
		},
		o: {
			o: {r: {b: ["ell", 71], "-": {c: ["losed", -268], o: ["pen", -269]}}},
			g: {"#": -263},
			l: {l: {a: ["r-sign", -264], y: {"#": -265, "-": ["flatbed", -266]}, "#": 264}},
			n: {a: ["te", -267], j: ["on", 281]},
			t: ["-circle", -270],
			v: ["e", -271],
			w: ["nload", -272],
			p: {e: {"#": 278}},
			m: ["icile", 452],
			u: {b: {l: {e: {"#": 475}}, t: {f: ["ulness", 662], "#": 662}}, g: ["hnut", 685]}
		},
		i: {
			m: ["", 82],
			s: {
				g: {o: ["rge", 151], u: ["ise", 545]},
				c: {
					i: {p: {l: {i: {n: {e: {"#": 161}}}}}}, h: {a: {r: {g: {e: {"#": 284}}}}}, o: {
						v: ["er", 488],
						n: ["tinue", 795]
					}
				},
				r: ["egard", 241],
				u: ["nite", 259],
				s: {e: {v: ["er", 259], m: ["ble", 545]}},
				t: {a: ["ff", 313], i: ["nguish", 488]},
				p: ["lace", 343],
				m: ["iss", 343]
			},
			g: {"#": 221, i: ["tal-tachograph", -258]},
			a: {
				d: ["em", 237],
				g: {n: {o: {s: {i: {s: ["", 247], n: ["g", 247]}, e: {s: ["", -248], "#": 247}}}}, o: ["nal", 743]},
				p: ["hragm", 795]
			},
			c: {
				e: {
					"#": -249,
					"-": {
						d: {2: ["0", -250], 6: ["", -251]},
						f: {i: ["ve", -252], o: ["ur", -253]},
						o: ["ne", -254],
						s: ["ix", -255],
						t: {h: ["ree", -256], w: ["o", -257]}
					}
				}, k: ["", 861]
			},
			l: {u: ["te", 241], a: ["te", 299], i: ["gence", 479]},
			e: ["", 248],
			r: {e: {c: {t: {i: {o: {n: {s: ["", -259], "#": 258}}}, "#": 438}}}, t: ["", 648]},
			v: {i: ["de", -260], e: ["", 270]},
			z: ["zy", -261],
			d: ["dle", 637]
		},
		a: {s: ["h", 85], p: ["ple", 194], t: ["abase", -243], y: ["dream", 574], l: ["ly", 637], w: ["dler", 868]},
		u: {
			d: ["", 86],
			m: {m: ["y", 278], b: ["bell", -279], p: {s: {t: {e: {r: {"#": -280, "-": ["fire", -281]}}}}}},
			n: ["geon", -282],
			b: ["iousness", 662]
		},
		r: {
			u: {m: {"#": -276, f: ["ish", 275], "-": ["steelpan", -277], s: ["tick-bite", -278]}}, e: ["ss", 232], a: {
				f: ["ting-compass", -273], g: ["on", -274], w: {
					"-": ["polygon",
						-275], "#": 697
				}, m: ["a", 637]
			}, i: {b: ["ble", 341], f: ["t", 438]}, o: {o: ["p", 349], g: ["ue", 757], n: ["e", 868]}
		},
		h: ["armachakra", -247],
		n: ["a", -262],
		w: ["elling", 452]
	},
	j: {
		a: {
			z: {z: {"#": 69}},
			l: ["opy", 115],
			v: ["a", 207],
			c: {k: ["et", 237], t: ["itate", 743]},
			p: ["e", 500],
			d: {e: {"#": 639}}
		},
		i: {t: ["ney", 115], b: ["e", 161], f: ["fy", 444]},
		e: {w: ["el", 370], d: ["i", -485], s: ["t", 500]},
		u: {n: {c: {t: {u: ["re", 485], i: ["on", 485]}}, k: ["", 873]}},
		o: {
			i: {n: {t: ["", -486], "#": 485}},
			u: ["rnal-whills", -487],
			k: ["e", 500],
			b: ["", 827],
			h: ["n", 858],
			y: ["ride", 861]
		}
	},
	u: {
		n: {
			s: ["ighted", 82],
			r: {e: ["asoning", 82], a: ["vel", 697]},
			d: {
				e: {
					r: {
						c: ["ut", 241],
						p: ["ass", 805],
						g: ["round", 805],
						t: ["aking", 827],
						l: ["ine", -890],
						s: ["core", 889]
					}
				}, o: {"#": -891, "-": ["alt", -892]}
			},
			i: {t: ["e", 513], v: {e: {r: {s: {a: ["l-access", -893], i: ["ty", -894]}}}}},
			t: ["ie", 890],
			w: ["rap", 890],
			m: ["ake", 890],
			l: {i: ["nk", -895], o: {c: {k: {"#": -896, "-": ["alt", -897]}}}}
		},
		p: {c: ["huck", 151], l: ["oad", -898]},
		m: {b: {e: ["r", 207], r: {e: {l: {l: {a: {"#": -888, "-": ["beach", -889]}}}}}}},
		s: {
			e: {
				r: {
					"#": -899, "-": {
						a: {
							l: {
								t: {
									"#": -900, "-": ["slash",
										-901]
								}
							}, s: ["tronaut", -902]
						},
						c: {h: ["eck", -903], i: ["rcle", -904], l: ["ock", -905], o: ["g", -906]},
						e: ["dit", -907],
						f: ["riends", -908],
						g: ["raduate", -909],
						i: ["njured", -910],
						l: ["ock", -911],
						m: {d: ["", -912], i: ["nus", -913]},
						n: {i: ["nja", -914], u: ["rse", -915]},
						p: ["lus", -916],
						s: {e: ["cret", -917], h: ["ield", -918], l: ["ash", -919]},
						t: {a: ["g", -920], i: {e: ["", -921], m: ["es", -922]}}
					}, s: {"#": -923, "-": ["cog", -924]}
				}
			}
		},
		t: {e: {n: {s: {i: {l: {"-": ["spoon", -925], "#": 925, s: ["", -926]}}}}}},
		r: ["ine", 946]
	},
	v: {
		o: {
			l: {
				u: {
					m: {
						e: {
							"#": 89, "-": {
								d: ["own",
									-938], m: ["ute", -939], o: ["ff", -940], u: ["p", -941]
							}
						}
					}
				}, l: ["eyball-ball", -937]
			}, m: ["it", 151], i: ["cemail", -936], t: ["e-yea", -942]
		},
		a: {n: ["", 138], p: ["oring", 236], r: ["iety", 759]},
		e: {
			r: {i: ["fication", 161], t: ["iginous", 260]},
			e: ["r", 241],
			c: ["tor-square", -927],
			n: {u: {s: {"#": -928, "-": {d: ["ouble", -929], m: ["ars", -930]}}}}
		},
		i: {
			s: {u: {a: {l: {i: {z: {e: {"#": 475}}, s: {e: {"#": 475}}}}}}},
			r: {i: ["le", 531], g: ["ule", 743], t: ["uoso", 785]},
			t: ["iate", 540],
			d: {e: {o: {t: ["ape", 826], "#": -933, "-": ["slash", -934]}}},
			a: {l: {"#": -931, s: ["", -932]}},
			h: ["ara", -935]
		},
		r: ["-cardboard", -943]
	},
	n: {
		o: {
			u: ["s", 103],
			t: {
				i: {c: {e: {"#": 212}}},
				"-": ["equal", -587],
				e: {s: ["-medical", -588], c: ["ase", 944]},
				h: ["ingness", 952]
			},
			m: {e: ["nclature", 496], a: ["dic", 565]},
			s: ["e", 952]
		},
		e: {
			s: ["tling", 182],
			r: ["ve", 442],
			x: ["us", 513],
			g: ["ative", 561],
			t: ["work-wired", -584],
			u: ["ter", -585],
			w: {s: {p: {a: ["per", -586], r: ["int", 585]}}}
		},
		i: {p: ["per", 182], n: {n: ["y", 648], c: ["ompoop", 648]}},
		a: {m: {e: {"#": 247}}, t: {i: ["onal", 452], a: ["tor", 812]}, g: ["", 639]},
		u: {t: ["", 283], b: ["", 442], m: ["ber", 515]}
	},
	q: {
		a: ["t", 151],
		u: {
			a: {t: ["", 151], r: ["ter", 648]},
			e: {e: ["r", 234], r: ["y", 662], s: {t: {i: {o: {n: {"#": -663, "-": ["circle", -664]}}}}}},
			i: {c: ["ksilver", 553], d: {"#": 639, d: ["itch", -665]}, t: ["", 795]},
			o: {t: {e: {"-": {l: ["eft", -666], r: ["ight", -667]}}}},
			r: ["an", -668]
		},
		r: ["code", -662]
	},
	y: {o: {u: ["ngster", 182], k: ["e", 513]}, e: ["n-sign", -964], i: ["n-yang", -965]},
	x: ["-ray", -963]
};
var InsertIconDialog = function () {
	var a = hyperapp, m = a.h, e = a.app, b = Math.floor(300.5 / 60), d = function (a, b, c) {
		b = void 0 === b ? {} : b;
		c = void 0 === c ? "" : c;
		for (var e in a) if ("#" === e) {
			var f = a[e];
			0 > f && (b[-(f + 1)] = c)
		} else f = a[e], Array.isArray(f) ? 0 > f[1] && (b[-(f[1] + 1)] = c + e + f[0]) : d(a[e], b, c + e);
		return b
	}, c = function (a, b) {
		b = void 0 === b ? {} : b;
		if (Array.isArray(a)) a = a[1], b[Math.max(a, -(a + 1))] = !0; else if (a) for (var d in a) if ("#" === d) {
			var e = a[d];
			b[Math.max(e, -(e + 1))] = !0
		} else e = a[d], Array.isArray(e) ? (e = e[1], b[Math.max(e, -(e + 1))] = !0) :
			c(e, b);
		return b
	}, g = function (a, b) {
		if ("" == b || Array.isArray(a) && a[0].startsWith(b)) return a;
		var c = b[0];
		return a.hasOwnProperty(c) ? g(a[c], b.substring(1)) : null
	}, k = function () {
		var a = null;
		return function () {
			if (null === a) {
				var b = d(icons_trie);
				a = Object.values(b)
			}
			return a
		}
	}(), f = function (a, b) {
		b = b.target.scrollTop;
		return Object.assign({}, a, {top_row_index: Math.floor(b / 60), panel_scroll_top: b})
	}, q = function (a, b) {
		for (b = b.target; "I" != b.nodeName && 0 < b.childElementCount;) b = b.childNodes[0];
		if ("I" != b.nodeName) return a;
		b = b.classList;
		for (var c = null, d = 0; d < b.length; ++d) if (b[d].startsWith("fa-")) {
			c = b[d].substring(3);
			break
		}
		return Object.assign({}, a, {selected_icon: c})
	}, t = function (a, b) {
		b = void 0 === b ? {} : b;
		return m("i", {class: "fas fa-" + a, style: b})
	}, p = function (a, b) {
		b = b.target.value;
		var d = g(icons_trie, b);
		d = c(d);
		d = Object.keys(d);
		return Object.assign({}, a, {search_query: b, selected_icon_ids: d ? d : null})
	}, r = function (a, b) {
		return Object.assign({}, a, {selected_color: b.target.value})
	}, u = function (a) {
		return m("div", {style: {display: "inline-table", padding: "5px"}},
			m("label", {for: "icon-search-input", style: {display: "table-cell"}}, "Search: "), m("input", {
				type: "text",
				id: "icon-search-input",
				placeholder: "Enter search term...",
				oninput: p,
				style: {display: "table-cell", margin: 0}
			}, a.search_query))
	}, w = function (a) {
		setTimeout(function () {
			a.close_callback && a.close_callback({icon: a.selected_icon, color: a.selected_color})
		}, 10);
		return a
	}, A = function (a) {
		setTimeout(function () {
			a.close_callback && a.close_callback(null)
		}, 10);
		return a
	}, v = function (a) {
		for (var c = Math.ceil(350 / 60), d = a.top_row_index *
			b, e = k(), g = null !== a.selected_icon_ids ? a.selected_icon_ids.map(function (a) {
			return e[a]
		}) : e, p = 60 * Math.ceil(g.length / b), v = [], B = 0; B <= c; ++B) {
			for (var M = [], Q = 0; Q < b && d < g.length; ++Q, ++d) M.push(m("td", {}, t(g[d])));
			v.push(m("tr", {}, M))
		}
		c = m("table", {
			class: "icons-table",
			style: {"margin-top": Math.floor(60 * a.top_row_index) + "px"},
			onmousedown: q
		}, v);
		p = m("div", {style: {"box-sizing": "border-box", height: p + "px", width: "300px", overflow: "hidden"}}, c);
		p = m("div", {id: "preview-panel", style: {height: "350px", width: "320px"}, onscroll: f},
			p);
		c = u(a);
		p = m("div", {}, c, p);
		c = [];
		g = m("div", {id: "library-image-dialog__selected"}, m("div", {}, "Selected icon: ", m("div", {
			style: {
				margin: "15px auto",
				"text-align": "center"
			}
		}, a.selected_icon ? t(a.selected_icon, {
			color: a.selected_color,
			"font-size": "100px"
		}) : m("strong", {}, "Please, click on an image to select it"))));
		c.push(g);
		a = m("div", {style: {display: "inline-table"}}, m("label", {
			for: "library-image-dialog__selected-color",
			style: {display: "table-cell"}
		}, "Color: "), m("input", {
			type: "color", id: "library-image-dialog__selected-color",
			value: a.selected_color, onchange: r, style: {display: "table-cell", width: "100px", margin: "0 0 0 5px"}
		}));
		c.push(a);
		c.push(m("p", {
				style: {
					margin: "15px 0",
					"font-style": "italic",
					height: "150px",
					"overflow-y": "auto"
				}
			}, "Icons come from the amazing ", m("a", {
				href: "https://fontawesome.com/",
				title: "Font Awesome"
			}, "Font Awesome"), " \n               open source project.\n               They are available under Creative Commons license (CC BY 4.0)\n               which means that they can be used on your web projects\n               and sites free of charge, however an \n               ",
			m("a", {
				href: "https://creativecommons.org/licenses/by/4.0/",
				title: "CC BY 4.0 attribution"
			}, "attribution"), "\n               is required.\n               ", m("br"), '\n               Icons are inserted directly into the "src" attribute of the <img>\n               HTML tag. This means that there is no need to upload them\n               separately to your server. However, this method may not work\n               properly with some older browsers.\n               '));
		a = m("button", {class: "btn", onclick: A},
			"Cancel");
		g = m("button", {class: "btn btn-primary", onclick: w, style: {margin: "0 0 0 5px"}}, "Insert");
		c.push(m("div", {style: {"margin-top": "auto", "text-align": "right"}}, a, g));
		return m("div", {id: "library-image-dialog"}, p, m("div", {
			style: {
				display: "flex",
				"flex-direction": "column",
				"align-items": "stretch",
				margin: "0 0 0 15px",
				"max-width": "240px"
			}
		}, c))
	};
	return {
		init: function (a, b) {
			e({
				init: {
					top_row_index: 0,
					panel_scroll_top: 0,
					selected_icon_ids: null,
					search_query: "",
					selected_icon: null,
					selected_color: "#000000",
					close_callback: b
				},
				view: v, node: a, subscriptions: null
			})
		}
	}
}();
var InsertImageDialog = function () {
	function a(a) {
		var c = null != f;
		c || (f = document.getElementById("image-dialog"));
		if (!c || a) {
			var d = document.getElementById("image-dialog-body");
			2 <= d.childElementCount && d.removeChild(d.children[1]);
			c = document.createElement("div");
			d.appendChild(c);
			d = A;
			var e = "", g = "";
			a && (d.src = a.src, d.width = a.width, d.height = a.height, e = a.naturalHeight, g = a.naturalWidth, d.aspect_ratio = e ? g / e : 1, e = a.alt, g = d.src);
			a = {
				image: Object.assign({}, d, {keep_aspect_ratio: !0}), show_example_image: !0, img_partial_url: g,
				alt_text: e
			};
			b({init: a, view: M, node: c, subscriptions: null})
		}
		da(f, G)
	}

	var m = hyperapp, e = m.h, b = m.app, d = m.request, c = SelectionPositionInfo(), g = {}, k = null, f = null,
		q = null, t = null, p = null, r = null, u = function () {
			null != q && null != k && (c.setRange(k), q.scheduleUpdate())
		}, w = function (a, b) {
			b = b.target.value;
			a = Object.assign({}, a, {img_partial_url: b});
			var c = document.createElement("a");
			c.href = b;
			return c.host && c.host != window.location.host ? [a, Q(K, b)] : a
		}, A = {src: "/static/img/example-photo.jpg", width: 400, height: 300, aspect_ratio: 4 / 3}, v =
			function (a, b) {
				var c = b.width, d = b.height;
				b = b.keep_aspect_ratio;
				var e = a.image;
				if (e) {
					c = Math.min(+(c || 0), 1E4);
					d = Math.min(+(d || 0), 1E4);
					if (1 <= c) return d = e.keep_aspect_ratio ? Math.floor(c / e.aspect_ratio) : e.height, Object.assign({}, a, {
						image: Object.assign({}, a.image, {
							width: c,
							height: d
						})
					});
					if (1 <= d) return c = e.keep_aspect_ratio ? Math.floor(d * e.aspect_ratio) : e.width, Object.assign({}, a, {
						image: Object.assign({}, a.image, {
							width: c,
							height: d
						})
					});
					if (void 0 !== b) return v(Object.assign({}, a, {image: Object.assign({}, a.image, {keep_aspect_ratio: b})}),
						{width: e.width})
				}
				return a
			}, B = function (a) {
			switch (a) {
				case "%20":
					return " ";
				case "%3D":
					return "=";
				case "%3A":
					return ":";
				case "%2F":
					return "/"
			}
			return a.toLowerCase()
		}, x = function (a, b) {
			if (!b) return a;
			var c = a.icon_color;
			if ("string" !== typeof b) throw new TypeError("Expected a string, but received " + typeof b);
			65279 === b.charCodeAt(0) && (b = b.slice(1));
			c && (b = b.replace(/<path /g, '<path fill="' + c + '" '));
			b = b.replace(/"/g, "'");
			b = "data:image/svg+xml," + encodeURIComponent(b).replace(/%[\dA-F]{2}/g, B);
			c = {
				src: b, width: 100, height: 100,
				aspect_ratio: 1, keep_aspect_ratio: !0
			};
			return K(Object.assign({}, a, {img_partial_url: b}), c)
		}, y = function (a, b) {
			var c = "/static/icons/" + b.icon + ".svg";
			return [Object.assign({}, a, {icon_color: b.color}), d({url: c, action: x})]
		}, E = function (a) {
			if (null == r) {
				var b = document.createElement("div");
				b.style.position = "fixed";
				b.style.top = "0";
				b.style.left = "0";
				b.style.display = "none";
				r = b;
				var c = function () {
				};
				InsertIconDialog.init(r, function (a) {
					null != r && (document.getElementById("image-dialog").removeChild(r), r = null);
					c(a)
				});
				document.getElementById("image-dialog").appendChild(r);
				r.style.display = "flex";
				r.focus();
				return [Object.assign({}, a), [function (a, b) {
					c = function (c) {
						return a(b.action, c)
					}
				}, {action: y}]]
			}
			return a
		}, O = function (a) {
			var b = a.image, c = {src: b.src, style: {width: b.width + "px", height: b.height + "px"}};
			a.show_example_image && (c.title = "Photo by Joanna Kosinska on Unsplash");
			c = e("img", c);
			c = e("div", {id: "image-dialog__preview-box"}, c);
			var d = e("input", {
				id: "image-width", value: a.image.width, type: "number", min: 1, onInput: [v, function (a) {
					return {width: a.target.value}
				}], style: {"min-width": "70px"}
			});
			a = e("input", {
				id: "image-height", value: a.image.height, type: "number", min: 1, onInput: [v, function (a) {
					return {height: a.target.value}
				}], style: {"min-width": "70px"}
			});
			b = e("input", {
				id: "aspect-ratio",
				type: "checkbox",
				style: {"margin-left": 0, "margin-right": "5px", width: "auto"},
				checked: b.keep_aspect_ratio || !1,
				onchange: [v, function (a) {
					return {keep_aspect_ratio: a.target.checked}
				}]
			});
			b = e("div", {id: "image-dialog__props-panel"}, e("label", {
				"for": "image-width",
				class: "label-with-input"
			}, e("span", {}, "Width: "), d, e("abbr", {title: "Pixels"},
				"px")), e("label", {
				"for": "image-height",
				class: "label-with-input"
			}, e("span", {}, "Height: "), a, e("abbr", {title: "Pixels"}, "px")), e("label", {
				"for": "aspect-ratio",
				style: {display: "flex"}
			}, b, "Keep aspect ratio"), e("button", {
				class: "btn btn-default",
				onclick: E,
				style: {"margin-left": 0}
			}, "Icon from library..."));
			return e("div", {class: "image-dialog__row"}, c, b)
		}, X = function (a, b) {
			return Object.assign({}, a, {alt_text: b.target.value})
		}, G = function (a) {
			g.close();
			return a
		}, T = function (a) {
			var b = a.image, c = a.img_partial_url, d =
				a.alt_text, e = b.width;
			b = b.height;
			var f = document.createElement("img");
			f.src = c;
			f.alt = d || "";
			f.style.display = "block";
			0 < +e && (f.style.maxWidth = f.style.minWidth = e + "px", f.style.width = e + "px", f.width = +e);
			0 < +b && (f.style.maxHeight = f.style.minHeight = b + "px", f.style.height = b + "px", f.height = +b);
			k.deleteContents();
			k.insertNode(f);
			k.collapse();
			t && t();
			return G(a)
		}, M = function (a) {
			var b = e("input", {
				class: "form-control",
				id: "image-url",
				onInput: w,
				placeholder: "Address of the image, e.g. https://example.com/my-photo.jpg",
				style: {"min-width": "460px"},
				type: "url",
				value: a.img_partial_url
			});
			b = e("label", {class: "label-with-input", for: "image-url"}, e("span", {}, "Image URL"), b);
			b = e("div", {class: "image-dialog__row"}, b);
			var c = e("input", {
				class: "form-control",
				id: "image-alt",
				onInput: X,
				placeholder: "Text description of the image",
				style: {"min-width": "460px"},
				value: a.alt_text
			});
			c = e("label", {class: "label-with-input", for: "image-alt"}, e("span", {}, "Alt text"), c);
			c = e("div", {class: "image-dialog__row"}, c);
			var d = e("button", {class: "btn btn-default", onclick: G}, "Cancel"),
				f = e("button", {class: "btn btn-primary", disabled: "" == a.img_partial_url.trim(), onclick: T}, "Insert");
			d = e("div", {class: "image-dialog__row", style: {"justify-content": "flex-end"}}, d, f);
			a = [O(a), b, c, d];
			return e("div", {id: "image-dialog__body", class: "form-inline"}, a)
		}, Q = function () {
			var a = null;
			return function (b, c) {
				return [function (b, c) {
					a && (window.clearTimeout(a), a = null);
					a = window.setTimeout(function () {
						var a = new Image;
						a.onload = function () {
							b(c.action, {
								src: a.src, width: a.width, height: a.height, aspect_ratio: +a.height ? +a.width /
									+a.height : 1, keep_aspect_ratio: !0
							})
						};
						a.crossOrigin = "anonymous";
						a.src = c.src
					}, 500)
				}, {action: b, src: c}]
			}
		}(), K = function (a, b) {
			return Object.assign({}, a, {image: b, show_example_image: !1, alt_text: ""})
		}, da = function (a, b) {
			var c = document.createElement("div"), d = c.style;
			d.position = "fixed";
			d.left = 0;
			d.right = 0;
			d.top = 0;
			d.bottom = 0;
			d.zIndex = parseInt(a.style.zIndex) - 1;
			c.onmousedown = function (a) {
				c.remove();
				b()
			};
			a.insertAdjacentElement("beforebegin", c)
		};
	g.show = function (b, d, e, m) {
		g.close();
		k = b;
		t = d;
		p = e;
		c.setRange(k);
		a(m);
		f.style.display =
			"block";
		window.requestAnimationFrame(function () {
			q = new Popper(c, f, {placement: "top", positionFixed: !0, modifiers: {offset: {offset: "0,5"}}})
		});
		window.addEventListener("scroll", u);
		document.scrollingElement && document.scrollingElement.addEventListener("scroll", u)
	};
	g.close = function () {
		q && (window.removeEventListener("scroll", u), document.scrollingElement && document.scrollingElement.removeEventListener("scroll", u), f.style.display = "none", q.destroy(), q = null, p && p());
		k = null
	};
	return g
}();
var TablePreview = function () {
	var a = null, m = "", e = function () {
		return null != a && !a.closed
	};
	return {
		is_open: e, open: function () {
			if (!e()) {
				var b = window.screen.width, d = window.screen.height;
				a = window.open("", "Table preview", "width=" + Math.min(Math.max(640, b / 2), b) + ",height=" + Math.min(Math.max(480, d / 2), d) + ",scrollbars=1")
			}
		}, set_style: function (a) {
			m = a
		}, update: function (b) {
			if (e()) {
				b = '\n            <!doctype html><html>\n            <head>\n            <meta charset="utf-8"><title>Table preview</title>\n            ' + ('<style type="text/css">' +
					m + "</style>") + "\n            </head>\n            <body>" + b + "</body></html>";
				var d = a.document;
				d.open();
				d.write(b);
				d.close()
			}
		}
	}
}();
var MarkdownMarkupProcessingPlugin = function () {
	function a(a) {
		return a && "object" === typeof a && !Array.isArray(a)
	}

	function m(b, d) {
		for (var c = [], e = 1; e < arguments.length; ++e) c[e - 1] = arguments[e];
		if (!c.length) return b;
		e = c.shift();
		if (a(b) && a(e)) for (var g in e) if (a(e[g])) b.hasOwnProperty(g) || (b[g] = {}), m(b[g], e[g]); else {
			var t = {};
			Object.assign(b, (t[g] = e[g], t))
		}
		return m.apply(null, [b].concat($jscomp.arrayFromIterable(c)))
	}

	function e(a, g, k, f) {
		for (var c = 0; c < a.length; ++c) {
			var t = a[c], p = k.indexOf(t.raw), r = g + p, u = r + t.raw.length;
			if (d.hasOwnProperty(t.type)) for (var w = d[t.type], A = f, v = r; v < u; ++v) A[v] = m(A[v], w); else if ("link" == t.type) for (w = m({}, b, {
				link_href: t.href || "#",
				link_open_in_new_tab: !0
			}), A = f, v = r; v < u; ++v) A[v] = m(A[v], w);
			t.tokens && e(t.tokens, r, t.raw, f);
			k = k.substring(p + t.raw.length);
			g += p + t.raw.length
		}
	}

	var b = {style: {color: "#905"}}, d = {
		text: {style: {}},
		strong: {style: {fontWeight: "bold"}},
		em: {style: {fontStyle: "italic"}},
		codespan: {style: {color: "#905", backgroundColor: "#ddd"}}
	};
	return function (a, b) {
		for (var c = marked.lexer(a), d = 0; d < b.length; ++d) b[d] =
			{};
		e(c, 0, a, b);
		return b
	}
}(), TableView = function () {
	function a(a) {
		var b = this;
		b.cell = a;
		b.edit_in_progress = !1;
		b.ignore_model_change = !1;
		b.event_handlers_initialized = !1;
		var c = document.createElement("div");
		b.entry = $(c);
		c = document.createElement("div");
		c.className = "wrap";
		b.entry.appendTo(c);
		b.dom = $(document.createElement("TD"));
		b.dom.append(c);
		$.observable(b);
		b.entry.on("paste", function (a) {
			b.onPasteContent(a)
		});
		a.on("value_change", function (a, c, d) {
			b.ignore_model_change || (c = b.entry.get(0), Markup.render(a, d, c));
			b.trigger("state_change")
		});
		a.on("colspan_change", function (a) {
			0 < a && b.dom.attr("colspan", a);
			b.show()
		});
		a.on("rowspan_change", function (a) {
			0 < a && b.dom.attr("rowspan", a);
			b.show()
		});
		b.style = new CellStyle(this.dom);
		b.style.on("state_change", function () {
			b.trigger("state_change")
		});
		b.render()
	}

	function m() {
		if (window.getSelection) {
			var a = window.getSelection();
			0 < a.rangeCount && a.getRangeAt(0).collapse(!0)
		}
	}

	function e(a, b) {
		this.type = a;
		this.dom = $("<td>").addClass("aux-cell").addClass("aux-cell-" + a);
		this.index_view =
			$("<span>").addClass("index-view").appendTo(this.dom);
		this.size_handle = null;
		"column" == a && (this.size_handle = $("<div>").addClass("size-handle").appendTo(this.dom), this.size_handle.present("SimpleDraggable"), this.draggable = this.size_handle.data("SimpleDraggable"));
		this.is_draggable = "column" == a;
		"corner" == a && $("<i>").addClass("icon-unchecked").appendTo(this.index_view);
		this.is_draggable && (this.index_view.present("SimpleDraggable"), this.drag_handle = this.index_view.data("SimpleDraggable"));
		this.index = -1;
		$.observable(this);
		this.setIndex(b)
	}

	function b(b, d, g) {
		function f(a) {
			if (!n.isBorderEditEnabled()) {
				var b = function (b, c) {
					c = c || b.charCodeAt(0);
					return (a.ctrlKey || a.metaKey) && a.keyCode == c
				}, c = a.target.nodeName, d = P();
				a.shiftKey && a.keyCode == Keys.TAB ? (a.preventDefault(), oa()) : a.which == Keys.TAB ? (a.preventDefault(), ea()) : a.which >= Keys.ARROW_LEFT && a.which <= Keys.ARROW_DOWN ? 0 == d && (a.preventDefault(), c = b = 0, a.which == Keys.ARROW_LEFT ? b = -1 : a.which == Keys.ARROW_RIGHT ? b = 1 : a.which == Keys.ARROW_UP ? c = -1 : a.which == Keys.ARROW_DOWN &&
					(c = 1), a.shiftKey ? da(c, b, a.ctrlKey) : aa(c, b)) : a.which == Keys.ENTER ? (b = ca(), C() && !b.edit_in_progress && (b.startEditing(), a.preventDefault())) : b("V") ? n.pasteIntoSelectedCells() : b("B") ? (n.forEachSelectedCellView(function (a) {
					a.toggleFontStyle("fontWeight", "bold", "normal")
				}), a.preventDefault()) : b("I") ? (n.forEachSelectedCellView(function (a) {
					a.toggleFontStyle("fontStyle", "italic", "normal")
				}), a.preventDefault()) : b("U") ? (n.forEachSelectedCellView(function (a) {
					a.toggleFontStyle("textDecoration", "underline", "none")
				}),
					a.preventDefault()) : b("K") ? C() && (ca().insertLink(), a.preventDefault()) : b("M") ? C() && (ca().insertImage(), a.preventDefault()) : b("A") && !d ? (a.preventDefault(), X()) : b(0, Keys.HOME) && !d ? (a.preventDefault(), ha(), 0 < n.model.row_count && 0 < n.model.col_count && (T(), y(n.model.getCell(0, 0), 0, 0))) : a.which == Keys.DEL ? n.forEachSelectedCellView(function (a) {
					0 == a.edit_in_progress && a.cell.value("")
				}) : a.which == Keys.RIGHT_ALT ? a.preventDefault() : "TABLE" == c && (b("L") ? (n.forEachSelectedCellView(function (a) {
					a.style.setHorizontalAlign("left")
				}),
					a.preventDefault()) : b("E") ? (n.forEachSelectedCellView(function (a) {
					a.style.setHorizontalAlign("center")
				}), a.preventDefault()) : b("R") ? (n.forEachSelectedCellView(function (a) {
					a.style.setHorizontalAlign("right")
				}), a.preventDefault()) : C() && !a.ctrlKey && a.which != Keys.ESC && a.which != Keys.SHIFT && a.which != Keys.ALT && a.which != Keys.WIN && n.forEachSelectedCellView(function (a) {
					a.startEditing(!0)
				}))
			}
		}

		function q() {
			n.trigger("state_change")
		}

		function t(b) {
			b = new a(b);
			b.on("state_change", q);
			n.trigger("cell_created", b);
			return b
		}

		function w(a, b, c, d, e) {
			void 0 == d && (d = n.model.row_count - 1);
			var f = n.model.getVisibleCellPos(b, c), h = n.model.getCell(b, c);
			f.row == b && f.row + h.rowspan() - 1 <= d && ("right" == a && f.col + h.colspan() - 1 == c || "left" == a && f.col == c) && (e ? n.getCellView(f.row, f.col).style.addBorder(a) : n.getCellView(f.row, f.col).style.removeBorder(a))
		}

		function A(a, b, c, d, e) {
			void 0 == d && (d = n.model.col_count - 1);
			var f = n.model.getVisibleCellPos(b, c), h = n.model.getCell(b, c);
			f.col == c && f.col + h.colspan() - 1 <= d && ("top" == a && f.row == b || "bottom" == a && f.row + h.rowspan() -
				1 == b) && (e ? n.getCellView(f.row, f.col).style.addBorder(a) : n.getCellView(f.row, f.col).style.removeBorder(a))
		}

		function v(a, b) {
			var c = null;
			if ("row" == a) void 0 == b && (b = n.model.row_count), n.aux_cells.forEach(function (a) {
				a.onInsertRow(b)
			}), c = new e(a, b), c.dom.mousedown(function (a) {
				if (!c.dom.hasClass("aux-cell-selected") || 1 == a.which) {
					var b = ka(c.dom).row;
					O(b, 0, b, n.model.col_count - 1, a.ctrlKey)
				}
			}), n.aux_col_cells.splice(b, 0, c); else if ("column" == a) {
				if (null == n.aux_row) return;
				void 0 == b && (b = n.aux_row.find("td").length -
					1);
				n.aux_cells.forEach(function (a) {
					a.onInsertColumn(b)
				});
				c = new e(a, b);
				c.dom.mousedown(function (a) {
					if (!c.dom.hasClass("aux-cell-selected") || 1 == a.which) {
						var b = ka(c.dom).col;
						O(0, b, n.model.row_count - 1, b, a.ctrlKey)
					}
				});
				n.aux_row.find("td").eq(b).after(c.dom);
				n.aux_row_cells.splice(b, 0, c);
				if (n.column_resize_enabled) c.draggable.on("drag_start", function (a, b) {
					a = c;
					n.enableFixedLayout(!0);
					var d = a.dom.offset();
					n.aux_row_cells.indexOf(a);
					var e = a.size_handle.width();
					n.drag_start_pos = b;
					a.draggable.setBounds({
						left: d.left +
							20 - e + 1, right: d.left + 1E3
					});
					null == n.size_indicator && (n.size_indicator = $("<div>").addClass("size-tip").appendTo($("body")));
					a.size_handle.addClass("size-indicator").css({height: n.dom.height()})
				}).on("drag_end", function (a) {
					a = c;
					if (void 0 !== n.drag_start_pos) {
						var b = a.size_handle.offset().left - n.drag_start_pos.left, d = n.aux_row_cells.indexOf(a),
							e = n.getColumnWidths(!0)[d + 1];
						n.setSingleColumnWidth(d, Math.max(1, e + b));
						a.size_handle.css({position: "relative", top: 0, height: 20, left: 0}).removeClass("size-indicator");
						n.size_indicator.hide()
					}
				}).on("drag_move", function (a, b) {
					a = c;
					a = a.size_handle.offset().left - n.drag_start_pos.left + a.dom.width();
					n.size_indicator.text(a + "px").offset({
						left: b.left - n.size_indicator.width() / 2,
						top: b.top - n.size_indicator.height() - 5
					}).show()
				});
				c.drag_handle.can_start_drag = function () {
					var a = !0;
					n.model.forEachCellInColumn(c.index, function (b) {
						1 != b.colspan() && (a = !1)
					});
					return a
				};
				c.drag_handle.on("drag_start", function (a) {
					fa(c.index, c)
				}).on("drag_move", function (a, b) {
					if (n.dragged) {
						b = n.dragged.start_pos_left +
							b.delta_x;
						n.dragged.table.css({left: b + "px"});
						var c = b + n.dragged.column_width_px / 2, d = n.dragged.column_widths, e = 1;
						a = d.length - 1;
						for (var f = 0; f < d.length; ++f) {
							var h = d[f], g = e + h / 2;
							if (c <= e + h) {
								a = f - 1;
								b >= g && ++a;
								break
							}
							e += h + 1
						}
						b = n.dragged.spanned_columns;
						(a >= b.length || 1 == b[a]) && S(a)
					}
				}).on("drag_end", pa)
			} else "corner" == a && (c = new e(a), c.dom.mousedown(X));
			var d = $(document.createElement("col"));
			n.hasFixedLayout() && (d.width(20), n.dom.width(n.dom.width() + 20));
			"corner" == a ? n.colgroup.append(d) : "column" == a && n.colgroup.find("col").eq(b).after(d);
			return null != c ? (n.aux_cells.push(c), c.dom) : null
		}

		function B(a, b) {
			var c = null;
			n.aux_cells.forEach(function (d) {
				d.type == a && d.index == b && (c = d)
			});
			"row" == a ? (n.aux_cells.forEach(function (a) {
				a.onRemoveRow(b)
			}), n.aux_col_cells.splice(b, 1)) : "column" == a && (n.aux_cells.forEach(function (a) {
				a.onRemoveColumn(b)
			}), n.aux_row.find("td").eq(b + 1).remove(), n.aux_row_cells.splice(b, 1));
			if (null != c) {
				var d = 0, e = n.dom.width();
				"column" == a ? (d = n.colgroup.find("col").eq(b + 1).width(), n.colgroup.find("col").eq(b + 1).remove()) : "corner" ==
					a && (d = n.colgroup.find("col").eq(0).width(), n.colgroup.find("col").eq(0).remove());
				var f = n.aux_cells.indexOf(c);
				-1 != f && n.aux_cells.splice(f, 1);
				n.hasFixedLayout() && n.dom.css("width", e - d - 1)
			}
		}

		function x(a, b) {
			if (null == n.aux_row) {
				var c = $("<tr>");
				c.append(v("corner"));
				n.aux_row = c;
				for (var d = 1; d <= n.model.col_count; ++d) v("column");
				n.dom.append(c)
			}
			c = document.createElement("tr");
			c = $(c);
			d = v("row", a);
			c.append(d);
			d = 0;
			for (var e = b.length; d < e; ++d) {
				var f = b[d], g = t(f);
				c.append(g.dom);
				f.view = g
			}
			n.dom.find("tr").eq(a).after(c);
			n.selection_bounds = null
		}

		function y(a, b, c) {
			a.view && a.view.select() && (a.view.areEventHandlersInitialized() || a.view.initEventHandlers(), n.selection_bounds = null, n.aux_col_cells[b].dom.addClass("aux-cell-selected"), n.aux_row_cells[c].dom.addClass("aux-cell-selected"), n.trigger("cell_selected", a, b, c))
		}

		function E(a, b, c) {
			a.view.is_selected ? G(a, b, c) : y(a, b, c)
		}

		function O(a, b, d, e, f) {
			if (void 0 == d || d < a) d = a;
			if (void 0 == e || e < b) e = b;
			var h = y;
			f ? h = E : T();
			n.model.forEachCellInRange(a, b, d, e, h);
			a = window.scrollX;
			b = window.scrollY;
			m();
			c() || window.scrollTo(a, b);
			n.dom.focus()
		}

		function X() {
			O(0, 0, n.model.row_count - 1, n.model.col_count - 1)
		}

		function G(a, b, c) {
			if (a.view.unselect()) {
				n.selection_bounds = null;
				var d = !1, e = !1;
				Q(function (a, f, h) {
					f == b && (d = !0);
					h == c && (e = !0)
				});
				!d && b < n.aux_col_cells.length && n.aux_col_cells[b].dom.removeClass("aux-cell-selected");
				!e && c < n.aux_row_cells.length && n.aux_row_cells[c].dom.removeClass("aux-cell-selected");
				n.trigger("cell_unselected", a, b, c)
			}
		}

		function T() {
			var a = M();
			a && (n.model.forEachCellInRange(a.top, a.left,
				a.bottom, a.right, G), n.selected_cells = {});
			InsertLinkDialog.close()
		}

		function M() {
			if (null != n.selection_bounds) return n.selection_bounds;
			var a = n.model.col_count, b = -1, c = n.model.row_count, d = -1;
			n.model.forEachCell(function (e, f, h) {
				1 == e.view.is_selected && (h < a && (a = h), h > b && (b = h), f < c && (c = f), f > d && (d = f))
			});
			return a <= b && c <= d ? (n.selection_bounds = {left: a, right: b, top: c, bottom: d}, n.selection_bounds) : null
		}

		function Q(a, b) {
			n.model.forEachCell(function (c, d, e) {
				if (1 == c.view.is_selected) if (b) for (var f = d; f < d + c.rowspan(); ++f) for (var h =
					e; h < e + c.colspan(); ++h) a(n.model.getCell(f, h, !0), f, h); else a(c, d, e)
			})
		}

		function K(a, b, c) {
			a = Math.min(n.model.row_count - 1, a);
			b = Math.min(n.model.col_count - 1, b);
			var d = Math.max(0, Math.min(a, n.selection_root.row));
			a = Math.max(a, n.selection_root.row);
			var e = Math.max(0, Math.min(b, n.selection_root.col));
			b = Math.max(b, n.selection_root.col);
			var f = M();
			c || !f || e <= f.left && d <= f.top && b >= f.right && a >= f.bottom || T();
			n.model.forEachCellInRange(d, e, a, b, y)
		}

		function da(a, b, c) {
			var d = n.selection_root;
			if (d) {
				var e = M();
				K(a + (d.row ==
				e.top ? e.top <= e.bottom ? e.bottom : e.top : e.top <= e.bottom ? e.top : e.bottom), b + (d.col == e.left ? e.left <= e.right ? e.right : e.left : e.left <= e.right ? e.left : e.right), c)
			}
		}

		function C() {
			var a = M();
			return a && a.left == a.right && a.top == a.bottom
		}

		function P() {
			var a = !1;
			C() && n.forEachSelectedCellView(function (b) {
				a |= b.edit_in_progress
			});
			return a
		}

		function I() {
			var a = null, b = M();
			b && n.model.forEachCellInRange(b.top, b.left, b.bottom, b.right, function (b) {
				null == a && (a = b)
			});
			return a
		}

		function ca() {
			var a = I();
			return null == a ? null : a.view
		}

		function aa(a,
								b) {
			var c = n.model.getCell(0, 0);
			if (c.rowspan() != n.model.row_count || c.colspan() != n.model.col_count) {
				var d = M();
				c = d.left + b;
				d = d.top + a;
				0 > c ? (c = n.model.col_count - 1, --d) : c >= n.model.col_count && (c = 0, d += 1);
				0 > d ? d = n.model.row_count - 1 : d >= n.model.row_count && (d = 0);
				T();
				var e = n.model.getCell(d, c, !0);
				y(e, d, c);
				n.selection_root = {row: d, col: c};
				e.isVisible() || aa(a, b)
			}
		}

		function ka(a) {
			for (a = $(a); void 0 != a && a.get(0) && "td" != a.get(0).nodeName.toLowerCase();) a = a.parent();
			return {col: a.index() - 1, row: $(a.parent()).index() - 1}
		}

		function ea() {
			if (C()) {
				ha();
				var a = M();
				a.left < n.model.col_count - 1 ? aa(0, 1) : a.bottom < n.model.row_count - 1 ? aa(1, -n.model.col_count + 1) : (T(), y(n.model.getCell(0, 0), 0, 0));
				n.forEachSelectedCellView(function (a) {
					a.startEditing()
				})
			}
		}

		function oa() {
			C() && (ha(), aa(0, -1), n.forEachSelectedCellView(function (a) {
				a.startEditing()
			}))
		}

		function ha() {
			n.forEachSelectedCellView(function (a) {
				a.endEditing()
			})
		}

		function ma(a, b) {
			a = $(a);
			return a.prop("tagName") == b ? a : a.parents(b)
		}

		function R(a) {
			n.left_pressed = 1 == a.which;
			var b = ma(a.target, "TD");
			if (b && !b.hasClass("aux-cell") &&
				!n.isBorderEditEnabled() && 1 == a.which) {
				b = ka(a.target);
				var c = M();
				C() && c.left == b.col && c.top == b.row || (O(b.row, b.col, b.row, b.col, a.ctrlKey), C() && (n.selection_root = {
					row: b.row,
					col: b.col
				}, n.trigger("single_cell_selected", n.model.getCell(b.row, b.col), b.row, b.col)))
			}
		}

		function J(a) {
			var b = ma(a.target, "TD");
			if (b && !b.hasClass("aux-cell") && !n.isBorderEditEnabled() && n.left_pressed && !a.ctrlKey) {
				b = ka(a.target);
				var c = !1, d = n.selection_prev;
				null == n.selection_root && (n.selection_root = {row: b.row, col: b.col}, c = !0);
				!d || d.row ==
				b.row && d.col == b.col || (c = !0);
				c && K(b.row, b.col, a.ctrlKey);
				n.selection_prev = b
			}
		}

		function U(a) {
			var b = ma(a.target, "TD");
			if (b && !b.hasClass("aux-cell")) ca().onDblClick(a)
		}

		function N(a) {
			n.ignore_next_copy_event ? n.ignore_next_copy_event = !1 : $(document.activeElement).hasClass("tableview") ? (a.clipboardData.setData("text/html", n.getSelectedCellsAsHTML()), "cut" == a.type && n.clearSelectedCellsContents(), a.preventDefault()) : n.ignore_next_copy_event = !1
		}

		function fa(a, b) {
			n.dragged && (n.dragged.table.remove(), n.dragged =
				null);
			n.hasFixedLayout() && n.dom.css("table-layout", "auto");
			var c = ia(a), e = b.dom.position().left;
			c.css({top: b.dom.height() + 1 + "px", left: e + "px", width: "auto"});
			b = n.getColumnWidths(!0);
			var f = a < b.length ? b[a + 1] + "px" : "auto", g = a < b.length ? b[a + 1] : 0;
			c.find("td:first").css({width: f});
			d.append(c);
			Y(a + 1, {opacity: .3});
			for (var k = [], q = 0; q < n.model.col_count; ++q) k.push(!0);
			n.model.forEachCell(function (a, b, c) {
				0 > a.colspan() && (k[c] = !1)
			});
			n.dragged = {
				column_index: a, column_width: f, column_width_px: g, table: c, start_pos_left: e,
				column_widths: b, target_index: -1, spanned_columns: k
			}
		}

		function S(a) {
			var b = function (a) {
				Y(a, {"border-right-width": "1px", "border-right-color": "inherit"}, {
					"border-right-width": "1px",
					"border-right-color": "transparent"
				})
			};
			-1 == a && -1 != n.dragged.target_index ? (b(n.dragged.target_index), n.dragged.target_index = -1) : 0 <= a && a != n.dragged.target_index && (-1 != n.dragged.target_index && b(n.dragged.target_index), n.dragged.target_index = a, a != n.dragged.column_index && a != n.dragged.column_index + 1 && (Y(a, {
				"border-right-width": "50px",
				"border-right-style": "solid", "border-right-color": a >= n.model.col_count ? "#ddd" : "#f7f7f7"
			}), n.dragged.column_widths = n.getColumnWidths(!0)))
		}

		function pa() {
			if (n.dragged) {
				var a = n.dragged.column_index, b = n.dragged.target_index;
				Y(a + 1, {opacity: 1});
				S(-1);
				n.dragged.table.remove();
				n.dragged = null;
				a != b && -1 != b && n.model.moveColumn(a, b)
			}
		}

		function ia(a) {
			var b = n.dom.clone();
			b.find("tr:first").remove();
			b.find("tr").each(function (b, c) {
				$(c).find("td").not(":eq(" + (a + 1) + ")").remove()
			});
			b.addClass("table-fragment-ghost");
			return b
		}

		function Y(a, b, c) {
			0 < a && n.forEachCellViewInColumn(function (a, c, d) {
				a.dom.css(b)
			}, a - 1);
			n.dom.find("tr").each(function (d) {
				0 == d && c ? $(this).find("td").eq(a).css(c) : 0 == a && $(this).find("td").eq(a).css(b)
			})
		}

		g = g || {};
		var n = this;
		this.model = b;
		this.options = {};
		this.theme = this.style_class = null;
		this.dom;
		this.colgroup;
		this.left_pressed = !1;
		this.cell_border_events_options = {
			deactivated: !0, onBorderOver: function (a, b, c) {
				c.addClass("alert_border_" + b[0])
			}, onBorderLeave: function (a, b, c) {
				n.dom.css("cursor", "default");
				c.removeClass("alert_border_" + b[0])
			}, onBorderClick: function (a, b, c) {
				c = ka(c);
				c = n.model.getVisibleCellPos(c.row, c.col);
				var d = c.row, e = c.col;
				c = n.model.getCell(d, e);
				var f = !n.getCellView(d, e).style.hasBorder(b);
				if ("right" == b) for (b = d + c.rowspan() - 1, a.shiftKey && (d = 0, b = n.model.row_count - 1); d <= b; ++d) a = e + c.colspan() - 1, w("right", d, a, b, f); else if ("left" == b) for (b = d + c.rowspan() - 1, a.shiftKey && (d = 0, b = n.model.row_count - 1); d <= b; ++d) w("left", d, e, b, f); else if ("top" == b) for (b = e + c.colspan() - 1, a.shiftKey && (e = 0, b = n.model.col_count -
					1), a = e; a <= b; ++a) A("top", d, a, b, f); else if ("bottom" == b) for (b = e + c.colspan() - 1, a.shiftKey && (e = 0, b = n.model.col_count - 1), a = e; a <= b; ++a) e = d + c.rowspan() - 1, A("bottom", e, a, b, f)
			}
		};
		this.aux_row = null;
		this.aux_cells = [];
		this.aux_col_cells = [];
		this.aux_row_cells = [];
		this.selection_bounds = this.selection_prev = this.selection_root = null;
		this.selected_cells = {};
		this.size_indicator = null;
		this.column_resize_enabled = g.column_resize_enabled || !1;
		this.ignore_next_copy_event = !1;
		this.hasBorder = function (a, b, c, d) {
			if (0 > a || a >= n.model.row_count ||
				0 > b || b >= n.model.col_count) return !1;
			var e = n.model.getCell(a, b), f = n.model.getVisibleCellPos(a, b), h = n.getCellView(a, b);
			if ("top" == c && f.row == a && h.style.hasBorder("top") || "bottom" == c && f.row + e.rowspan() - 1 == a && h.style.hasBorder("bottom") || "left" == c && f.col == b && h.style.hasBorder("left") || "right" == c && f.col + e.colspan() - 1 == b && h.style.hasBorder("right")) return !0;
			if (!d) {
				if ("left" == c) return n.hasBorder(a, b - 1, "right", !0);
				if ("right" == c) return n.hasBorder(a, b + 1, "left", !0);
				if ("top" == c) return n.hasBorder(a - 1, b, "bottom",
					!0);
				if ("bottom" == c) return n.hasBorder(a + 1, b, "top", !0)
			}
			return !1
		};
		this.model.on("row_inserted", x);
		this.model.on("column_inserted", function (a, b) {
			v("column", a);
			n.dom.find("tr").each(function (c, d) {
				if (0 < c) {
					c = b[c - 1];
					var e = t(c);
					$(d).find("td").eq(a).after(e.dom);
					c.view = e
				}
			});
			n.selection_bounds = null
		});
		this.model.on("row_removed", function (a, b) {
			n.selection_bounds = null;
			B("row", a);
			b.forEach(function (b, c) {
				G(b, a, c);
				b.view && b.view.remove()
			});
			n.dom.find("tr").eq(a + 1).remove()
		});
		this.model.on("column_removed", function (a,
																							b) {
			n.selection_bounds = null;
			b.forEach(function (b, c) {
				G(b, c, a);
				b.view && b.view.remove()
			});
			B("column", a)
		});
		this.getCellView = function (a, b, c) {
			return n.model.getCell(a, b, c).view
		};
		n.selectCell = y;
		n.selectCells = O;
		n.selectAllCells = X;
		n.clearSelection = T;
		n.getSelectionBounds = M;
		n.forEachSelectedCell = Q;
		n.forSingleSelectedCellView = function (a) {
			C() && a(ca())
		};
		n.isSingleCellSelected = C;
		n.getSelectedCell = I;
		n.getSelectedCellView = ca;
		n.onCellPaste = function (a, b) {
			if (a = TableImport.extractTableFromString(a, b)) b = M(), n.importTable(a,
				b.top, b.left, !0)
		};
		n.importTable = function (a, b, c, d, e) {
			b = void 0 === b ? 0 : b;
			c = void 0 === c ? 0 : c;
			e = void 0 === e ? !0 : e;
			var f = n.model;
			if (void 0 === d || d) {
				var h = a.length, g = 0;
				a.forEach(function (a) {
					g = Math.max(g, a.length)
				});
				d = c + g;
				h = b + h;
				(h > f.row_count || d > f.col_count) && f.resize(Math.max(f.row_count, h), Math.max(f.col_count, d))
			}
			d = f.row_count;
			f = f.col_count;
			h = n.getFormattingOptions();
			for (var q = [], m = 0; m < a.length; ++m) for (var p = a[m], t = 0; t < p.length; ++t) if (m + b < d && t + c < f) {
				var r = p[t], u = "string" === typeof r, w = u ? r : r.value, v = u ? null : r.style,
					A = n.getCellView(m + b, t + c, !0), x = A.cell;
				if (r.hasOwnProperty("per_char_markup")) {
					var B = r.per_char_markup.map(Markup.create);
					x.value(w, B)
				} else x.value(w);
				v && e && A.style.setFromDict(v);
				A.style.reset(h);
				k && A.updateValueAndMarkup();
				w = u ? 1 : r.rowspan;
				r = u ? 1 : r.colspan;
				(1 < r || 1 < w) && 0 < Math.min(r, w) && q.push({
					top: m + b,
					bottom: m + b + w - 1,
					left: t + c,
					right: t + c + r - 1
				})
			}
			n.isFormattingOptionEnabled("rowspan") && n.isFormattingOptionEnabled("colspan") && q.forEach(function (a) {
				n.model.mergeCells(a.top, a.left, a.bottom, a.right)
			});
			this.selectCells(b,
				c)
		};
		n.onEditInProgressCellPaste = function (a, b) {
			a = $('<div style="white-space:pre">' + a + "</div>");
			var c = [], d = [];
			Markup.forEachLeafCharInNode(a.get(0), function (a, b, e) {
				c.push(a);
				a = Markup.create(e);
				d.push(a)
			}, null, ["fontWeight", "fontStyle", "textDecoration"]);
			for (var e = 0; e < c.length && c[e].match(/\s/g);) ++e;
			c = c.slice(e);
			for (d = d.slice(e); 0 < c.length && c[c.length - 1].match(/\s/g);) c.pop(), d.pop();
			var f = c;
			a = [];
			for (var g = e = 0, k = 0; g < f.length;) {
				if (e < c.length && c[e] == f[g]) for (k = d[e], ++e; e < c.length && c[e].match(/\s/g);) ++e;
				a.push(k);
				++g
			}
			f = f.join("");
			e = document.createElement("span");
			Markup.render(f, a, e);
			a = M();
			a = n.model.getCell(a.top, a.left, !0);
			b.deleteContents();
			b.insertNode(e);
			e = window.getSelection();
			e.removeAllRanges();
			e.addRange(b);
			b.collapse();
			a.view.entry.focus()
		};
		n.hasFixedLayout = function () {
			return "fixed" == n.dom.css("table-layout")
		};
		n.enableFixedLayout = function (a) {
			if (a && !n.hasFixedLayout()) {
				n.dom.width();
				var b = [], c = 0;
				n.dom.find("tr:first td").each(function (a, d) {
					b.push($(d).width());
					c += $(d).width()
				});
				c += b.length;
				n.dom.hide();
				n.dom.addClass("fixed-size");
				n.dom.css({"table-layout": "fixed", width: c});
				n.colgroup.find("col").each(function (a, c) {
					c = $(c);
					c.css({width: b[a] + 1})
				});
				n.dom.show()
			} else a || (n.dom.hide(), n.dom.removeClass("fixed-size"), n.dom.css({
				"table-layout": "auto",
				width: "auto"
			}), n.colgroup.find("col").each(function (a, b) {
				$(b).css({width: "auto"})
			}), n.dom.show())
		};
		n.getColumnWidths = function (a) {
			var b = [];
			n.dom.find("tr:first td").each(function (a, c) {
				b.push($(c).width())
			});
			return 1 == a ? b : b.slice(1)
		};
		n.setColumnWidth =
			function (a, b) {
				b += 1;
				n.colgroup.find("col").eq(a + 1).css({width: b})
			};
		n.setSingleColumnWidth = function (a, b) {
			n.dom.css({"table-layout": "fixed"});
			for (var c = n.dom.width(), d = n.getColumnWidths(!0), e = d[a + 1], f = 0; f < d.length; ++f) ;
			c += -e + b;
			n.dom.hide();
			n.dom.css({"table-layout": "fixed", width: c});
			n.setColumnWidth(a, b);
			n.dom.show()
		};
		(function () {
			n.dom = $("<table>", {"class": "tableview", tabindex: 1, cellspacing: 3});
			n.colgroup = $("<colgroup>").appendTo(n.dom);
			d = $(d) || $("body");
			d.append(n.dom);
			n.model.on("state_change", q);
			$.observable(n);
			n.dom.mousedown(R).mousemove(J).mouseup(function (a) {
				n.left_pressed = n.left_pressed && 1 != a.which
			}).dblclick(U).on("touchend", U).mouseleave(function (a) {
				n.left_pressed = !1
			}).keydown(f);
			GlobalMessageHub.on(GlobalEvents.STOP_EDITING_TABLE, function () {
				ha()
			});
			for (var a = 0; a < n.model.row_count; ++a) x(a, n.model.rows[a]);
			0 < n.model.row_count && 0 < n.model.col_count && y(n.model.getCell(0, 0), 0, 0);
			document.addEventListener("copy", N);
			document.addEventListener("cut", N)
		})()
	}

	var d = !1, c = function () {
		var a = void 0;
		return function () {
			if (void 0 == a) {
				var b = window.navigator.userAgent, c = b.indexOf("MSIE ");
				a = null != (0 < c || navigator.userAgent.match(/Trident.*rv:11\./) ? -1 != b.indexOf(".", c) ? parseInt(b.substring(c + 5, b.indexOf(".", c))) : 1 : null)
			}
			return a
		}
	}();
	a.prototype.render = function () {
		var a = this.cell.value();
		Markup.render(a, this.cell.per_char_markup_ids_, this.entry[0])
	};
	a.prototype.clearFormatting = function () {
		this.style.reset();
		this.cell.setMarkupToDefault();
		this.render()
	};
	a.read_only = !1;
	a.prototype.initEventHandlers = function () {
		var a =
			this, b = void 0;
		a.event_handlers_initialized || (a.entry.blur(function (a) {
			a.stopImmediatePropagation();
			a.preventDefault()
		}).keydown(function (e) {
			if (27 === e.which) {
				e.preventDefault();
				e = window.scrollX;
				var f = window.scrollY;
				a.endEditing();
				a.dom.parents("table").focus();
				m();
				c() || window.scrollTo(e, f)
			} else d && a.edit_in_progress && k && !c() && (b && window.clearTimeout(b), b = window.setTimeout(function () {
				a.updateValueAndMarkup()
			}, 20))
		}).on("mousedown mouseup mousemove click dblclick", function (b) {
			a.edit_in_progress && b.stopImmediatePropagation()
		}),
			a.event_handlers_initialized = !0)
	};
	a.prototype.areEventHandlersInitialized = function () {
		return self.event_handlers_initialized
	};
	a.prototype.editImage = function (a) {
		this.entry.addClass("entry-editing").attr("contenteditable", !0).focus();
		this.edit_in_progress = !0;
		var b = g(a), c = this;
		InsertImageDialog.show(b, function () {
			c.updateValueAndMarkup()
		}, function () {
			setTimeout(function () {
				c.edit_in_progress ? c.endEditing() : c.dom.parents("table").focus()
			}, 10)
		}, a)
	};
	a.prototype.onDblClick = function (b) {
		a.read_only || this.edit_in_progress ||
		!b.target || "IMG" != b.target.nodeName ? this.startEditing() : (b.preventDefault(), this.editImage(b.target))
	};
	a.prototype.onPasteContent = function (a) {
		var b = this.entry, c = b.text(), d = window.scrollX, e = window.scrollY;
		setTimeout(function () {
				window.scrollTo(d, e);
				var a = b.text(), f = a.length, g = "", k = "";
				if (0 < c.length) for (var q = 0; q <= c.length; ++q) {
					g = c.substr(0, q);
					k = c.substr(q);
					var m = a.substr(f - k.length);
					if (0 == a.indexOf(g) && m == k) {
						a = a.substr(q, f - c.length);
						break
					}
					k = g = ""
				}
				a = g + TableImport.extractCellsFromString(a) + k;
				b.html(a)
			},
			3)
	};
	a.prototype.show = function () {
		this.cell.isVisible() ? this.dom.css("display", "table-cell") : this.dom.css("display", "none")
	};
	a.prototype.dump = function () {
		return {style: this.style.dump()}
	};
	a.prototype.load = function (a, b) {
		a && this.style.load(a.style, b)
	};
	a.prototype.select = function () {
		return this.is_selected ? !1 : (this.dom.addClass("selected"), this.is_selected = !0)
	};
	a.prototype.unselect = function () {
		return this.is_selected ? (this.edit_in_progress && this.endEditing(), this.dom.removeClass("selected"), this.is_selected =
			!1, !0) : !1
	};
	a.prototype.getInnerHTML = function () {
		for (var a = this.entry[0]; a && !a.nodeName.match(/td|tr/i);) a = a.parentNode;
		return a ? a.outerHTML : ""
	};
	a.prototype.toggleFontStyle = function (a, b, c) {
		function e(c, d) {
			d && (c = $.extend(!0, {}, c), c.style[a] = c.style[a] == b ? "" : b, c.selected = !0);
			return c
		}

		function f(b) {
			b && b.hasOwnProperty("style") && b.style.hasOwnProperty(a) && (b = $.extend(!0, {}, b), delete b.style[a]);
			return b
		}

		function g(a) {
			var b = [], c = [], d = -1, e = 0;
			Markup.forEachLeafCharInNode(k.entry.get(0), function (f, g, k) {
				b.push(f);
				k = a(k, g);
				f = Markup.create(k);
				c.push(f);
				g && -1 == d && (d = e);
				++e
			}, q);
			var f = b.join("");
			k.cell.value(f, c)
		}

		var k = this;
		if (this.is_selected) if (!this.edit_in_progress || !d || !window.getSelection || window.getSelection && 0 == window.getSelection().rangeCount) "bold" == b || "italic" == b || "underline" == b ? (this.style.hasFontStyle(b) && g(f), this.style.toggleFontStyle(b)) : "color" == a ? (g(f), this.style.setTextColor(b)) : "backgroundColor" == a && (g(f), this.style.setBgColor(b)); else {
			c = c || "";
			var q = window.getSelection().getRangeAt(0);
			if (0 ==
				q.toString().length) {
				var m = q.endContainer;
				3 == m.nodeType && (m = m.parentNode);
				var t = document.createElement("span");
				t.style[a] = m.style && m.style[a] == b ? c : b;
				t.textContent = ZeroWidthSpace;
				q.insertNode(t);
				q.selectNode(t);
				q.collapse()
			} else g(e)
		}
	};
	a.prototype.insertLink = function () {
		if (d && this.is_selected && window.getSelection) {
			var a = window.getSelection(), b = null;
			0 == a.rangeCount ? (b = document.createRange(), b.selectNodeContents(this.entry[0]), a.removeAllRanges(), a.addRange(b)) : b = a.getRangeAt(0).cloneRange();
			0 == $(b.startContainer).parents(".wrap").length &&
			(b = document.createRange(), b.selectNodeContents(this.entry[0]), b.collapse(), a.removeAllRanges(), a.addRange(b));
			a = $(b.startContainer).parents("a");
			0 < a.length && b.selectNodeContents(a[0]);
			var c = this;
			InsertLinkDialog.show(b, function () {
				c.updateValueAndMarkup()
			}, function () {
				setTimeout(function () {
					c.edit_in_progress ? (c.entry.focus(), g(c.entry.get(0), !0)) : c.dom.parents("table").focus()
				}, 10)
			})
		}
	};
	a.prototype.insertImage = function () {
		if (d && this.is_selected && window.getSelection) {
			var a = window.getSelection(), b = null;
			0 == a.rangeCount ? (b = document.createRange(), a.addRange(b), b.selectNodeContents(this.entry.get(0)), b.collapse()) : b = a.getRangeAt(0).cloneRange();
			0 == b.toString().length && (a = document.createElement("span"), a.textContent = ZeroWidthSpace, b.selectNodeContents(this.entry.get(0)), b.collapse(), b.insertNode(a), b.selectNode(a));
			var c = this;
			InsertImageDialog.show(b, function () {
				c.updateValueAndMarkup()
			}, function () {
				setTimeout(function () {
						c.edit_in_progress ? (c.entry.focus(), g(c.entry.get(0), !0)) : c.dom.parents("table").focus()
					},
					10)
			})
		}
	};
	var g = function (a, b) {
		b = void 0 === b ? !1 : b;
		var c = window.getSelection ? window.getSelection() : null, d = null;
		c && c.removeAllRanges();
		document.body.createTextRange ? (d = document.body.createTextRange(), b ? (d.moveToElementText(a), d.collapse(!1), a = a.textContent.length, d.moveStart("character", a), d.moveEnd("character", a)) : d.moveToElementText(a), d.select()) : c && (d = document.createRange(), "IMG" == a.nodeName ? d.selectNode(a) : d.selectNodeContents(a), b && d.collapse(), c.addRange(d));
		return d
	};
	a.prototype.remove = function () {
		this.endEditing();
		this.dom.remove()
	};
	a.prototype.startEditing = function (b) {
		0 != a.read_only || this.edit_in_progress || (this.entry.addClass("entry-editing").attr("contenteditable", !0).focus(), b && this.entry.text(""), b = this.entry[0], g(b.lastChild || b, !0), this.edit_in_progress = !0)
	};
	var k = null;
	a.prototype.updateValueAndMarkup = function () {
		function a(a) {
			if (a) {
				var c = a.toString().length, d = a.cloneRange();
				d.selectNodeContents(b);
				d.setEnd(a.endContainer, a.endOffset);
				return c ? d.toString().length - c : d.toString().length
			}
			return -1
		}

		var b = this.entry[0],
			c = "undefined" != typeof window.getSelection ? window.getSelection() : null,
			d = c && 0 < c.rangeCount ? c.getRangeAt(0) : null;
		c = (this.edit_in_progress ? a(d) : -1) == (b.textContent || "").length;
		if (!this.edit_in_progress || c) {
			var e = [], m = [];
			Markup.forEachLeafCharInNode(b, function (a, b, c) {
				e.push(a);
				m.push(c)
			}, d);
			d = e.join("");
			k && (m = k(d, m));
			var w = m.map(Markup.create);
			this.ignore_model_change = !0;
			this.cell.value(d, w);
			Markup.render(d, w, b);
			this.ignore_model_change = !1;
			this.edit_in_progress && c && g(b.lastChild || b, !0)
		}
	};
	a.prototype.endEditing =
		function () {
			1 == this.edit_in_progress && (m(), this.entry.attr("contenteditable", !1).removeClass("entry-editing"), this.edit_in_progress = !1, this.updateValueAndMarkup())
		};
	e.prototype.setIndex = function (a) {
		if (a != this.index && "corner" != this.type) {
			this.index = a;
			if ("row" == this.type) a += 1; else {
				for (var b = 0 == a ? "A" : ""; 0 < a;) b = String.fromCharCode(Math.floor(65 + a % 26)) + b, a = Math.floor(a / 26);
				a = b
			}
			this.index_view.text(a)
		}
	};
	e.prototype.onRemoveRow = function (a) {
		"row" == this.type && this.index > a && this.setIndex(this.index - 1)
	};
	e.prototype.onInsertRow =
		function (a) {
			"row" == this.type && this.index >= a && this.setIndex(this.index + 1)
		};
	e.prototype.onInsertColumn = function (a) {
		"column" == this.type && this.index >= a && this.setIndex(this.index + 1)
	};
	e.prototype.onRemoveColumn = function (a) {
		"column" == this.type && this.index > a && this.setIndex(this.index - 1)
	};
	b.prototype.pasteIntoSelectedCells = function () {
		if (!this.getSelectedCellView().edit_in_progress) PasteHelper.start(this.onCellPaste); else if (window.getSelection && 0 < window.getSelection().rangeCount) {
			var a = window.getSelection().getRangeAt(0).cloneRange(),
				b = this;
			PasteHelper.start(function (c) {
				b.onEditInProgressCellPaste(c, a)
			})
		}
	};
	b.prototype.isSelectionRectangular = function () {
		var a = this.getSelectionBounds();
		if (!a) return !1;
		for (var b = a.top; b <= a.bottom; ++b) for (var c = a.left; c <= a.right; ++c) if (!this.model.getCell(b, c).view.is_selected) return !1;
		return !0
	};
	b.prototype.mergeSelectedCells = function () {
		if (this.isSelectionRectangular()) {
			var a = this.getSelectionBounds();
			this.clearSelection();
			this.model.mergeCells(a.top, a.left, a.bottom, a.right);
			this.selectCell(this.model.getCell(a.top,
				a.left), a.top, a.left)
		}
	};
	b.prototype.splitSelectedCell = function () {
		if (this.isSelectionRectangular()) {
			var a = this.getSelectionBounds(), b = this.model.getCell(a.top, a.left), c = b.rowspan();
			b = b.colspan();
			this.model.splitCell(a.top, a.left);
			this.selectCells(a.top, a.left, a.top + c - 1, a.left + b - 1);
			this.dom.parents("table").focus()
		}
	};
	b.prototype.forEachCellInColumn = function (a, b) {
		this.model.forEachCellInColumn(a, function (a) {
			b(a.view)
		})
	};
	b.prototype.forEachCellInRow = function (a, b) {
		this.model.forEachCellInRow(a, function (a,
																						 c) {
			b(a.view, c)
		})
	};
	b.prototype.forEachCellInRange = function (a, b, c, d, e) {
		this.model.forEachCellInRange(a, b, c, d, function (a, b, c) {
			e(a.view, b, c)
		})
	};
	b.prototype.forEachCell = function (a) {
		for (var b = 0; b < this.model.row_count; ++b) this.model.forEachCellInRow(b, function (c, d) {
			a(c.view, b, d)
		})
	};
	b.prototype.enableBorderEdit = function (a) {
		if (a) {
			this.dom.css("border-collapse", "separate");
			this.dom.css("border-spacing", 3);
			this.dom.addClass("border-edit");
			var b = this.cell_border_events_options;
			this.forEachCellView(function (a) {
				a.dom.borderEvents(b)
			})
		} else this.dom.css("border-collapse",
			"collapse"), this.dom.removeClass("border-edit");
		this.cell_border_events_options.deactivated = !a
	};
	b.prototype.isBorderEditEnabled = function () {
		return !this.cell_border_events_options.deactivated
	};
	b.prototype.forEachSelectedCellView = function (a, b, c) {
		this.forEachSelectedCell(function (b) {
			a(b.view)
		}, c)
	};
	b.prototype.forEachCellViewInRange = function (a, b, c, d, e, g) {
		g = g || !1;
		var f = [];
		e = Math.min(e + 1, this.model.col_count);
		for (d = Math.min(d + 1, this.model.row_count); b < d; ++b) for (var k = c; k < e; ++k) {
			var m = this.model.getCell(b,
				k, !0), q = 0, p = 0;
			0 == m.isVisible() && 0 == g && (p = Math.min(m.colspan(), 0), q = Math.min(m.rowspan(), 0));
			m = this.getCellView(b + q, k + p, g);
			-1 == f.indexOf(m) && (a(m, b, k), f.push(m))
		}
	};
	b.prototype.forEachCellView = function (a, b) {
		this.forEachCellViewInRange(a, 0, 0, this.model.row_count - 1, this.model.col_count - 1, b)
	};
	b.prototype.forEachCellViewInColumn = function (a, b, c) {
		this.forEachCellViewInRange(a, 0, b, this.model.row_count, b, c)
	};
	b.prototype.getSelectedCellsAsString = function () {
		var a = [], b = -1, c = [];
		this.forEachSelectedCell(function (d,
																			 e, f) {
			b != e && -1 != b && (a.push(c), c = []);
			b = e;
			c.push(d.value())
		});
		a.push(c);
		for (var d = [], e = 0; e < a.length; ++e) d.push(a[e].join("\t"));
		return d.join("\n")
	};
	b.prototype.getSelectedCellsAsHTML = function () {
		var a = [], b = -1, c = [];
		this.forEachSelectedCell(function (d, e, f) {
			b != e && -1 != b && (a.push(c), c = []);
			b = e;
			c.push(d.view.getInnerHTML())
		});
		a.push(c);
		for (var d = [], e = 0; e < a.length; ++e) d.push("<tr>" + a[e].join("") + "</tr>");
		return "<table>" + d.join("") + "</table>"
	};
	b.prototype.clearSelectedCellsContents = function () {
		this.forEachSelectedCell(function (a) {
			a.value("")
		});
		this.trigger("state_change")
	};
	b.prototype.reset = function (a, b) {
		a = void 0 === a ? 0 : a;
		b = void 0 === b ? 0 : b;
		Markup.clear();
		this.clearSelection();
		this.enableFixedLayout(!1);
		this.model.reset();
		0 < a && 0 < b && this.model.resize(a, b);
		this.model.forEachCellInRange(0, 0, this.model.row_count - 1, this.model.col_count - 1, function (a) {
			a.view.style.reset()
		});
		this.selectCells(0, 0, 0, 0);
		this.options = {};
		this.setTheme(null);
		this.trigger("onload")
	};
	b.prototype.clearFormatting = function () {
		null === this.getSelectionBounds() || this.isSingleCellSelected() ?
			(this.options = {}, this.setTheme(null), this.enableFixedLayout(!1), this.model.forEachCellInRange(0, 0, this.model.row_count - 1, this.model.col_count - 1, function (a) {
				a.view.clearFormatting()
			}), Markup.clear(), this.trigger("onload")) : this.forEachSelectedCellView(function (a) {
				a.clearFormatting()
			})
	};
	b.prototype.setStyleClass = function (a) {
		null != this.style_class && this.dom.removeClass(this.style_class);
		(this.style_class = a) && this.dom.addClass(a)
	};
	b.prototype.setTheme = function (a) {
		(this.theme = a) && this.isFormattingOptionEnabled("theme") ?
			this.setStyleClass(TableThemes.createTheme(a)) : this.setStyleClass(null);
		this.trigger("theme_set", a)
	};
	b.prototype.removeSelectedColumns = function () {
		var a = [];
		this.forEachSelectedCell(function (b, c, d) {
			-1 == a.indexOf(d) && a.push(d)
		});
		a.sort(function (a, b) {
			return a - b
		});
		for (var b = a.length - 1; 0 <= b; --b) this.model.removeColumn(a[b])
	};
	b.prototype.removeSelectedRows = function () {
		var a = [];
		this.forEachSelectedCell(function (b, c, d) {
			-1 == a.indexOf(c) && a.push(c)
		});
		a.sort(function (a, b) {
			return a - b
		});
		for (var b = a.length - 1; 0 <=
		b; --b) this.model.removeRow(a[b])
	};
	b.prototype.get_option = function (a, b) {
		return this.options.hasOwnProperty(a) ? this.options[a] : b
	};
	b.prototype.set_option = function (a, b) {
		this.options[a] = b;
		this.trigger("state_change")
	};
	b.prototype.get_or_set_option = function (a, b) {
		this.options.hasOwnProperty(a) || (this.options[a] = b, this.trigger("state_change"));
		return this.options[a]
	};
	b.prototype.dump = function () {
		for (var a = this.model.row_count, b = this.model.col_count, c = [], d = 0; d < a; ++d) {
			for (var e = [], g = 0; g < b; ++g) {
				var k = this.model.getCell(d,
					g, !0).view;
				k && e.push(k.dump())
			}
			c.push(e)
		}
		var m = {};
		this.model.forEachCell(function (a) {
			a = a.per_char_markup_ids_;
			for (var b = a.length - 1; 0 <= b; --b) m[a[b]] = !0
		});
		Markup.clearUnused(m);
		a = {
			rows_views: c,
			model: this.model.dump(),
			theme: this.theme,
			fixed_layout: this.hasFixedLayout(),
			markup: Markup.dump(),
			options: this.options
		};
		this.hasFixedLayout() && (a.col_widths = this.getColumnWidths());
		return a
	};
	b.prototype.dumpTransposed = function () {
		for (var a = this.model.row_count, b = this.model.col_count, c = [], d = 0; d < b; ++d) {
			for (var e =
				[], g = 0; g < a; ++g) {
				var k = this.model.getCell(g, d, !0).view;
				k && e.push(k.dump())
			}
			c.push(e)
		}
		return {
			rows_views: c,
			model: this.model.dumpTransposed(),
			theme: this.theme,
			fixed_layout: this.hasFixedLayout(),
			markup: Markup.dump(),
			options: this.options
		}
	};
	b.prototype.getFormattingOptions = function () {
		this.hasOwnProperty("formatting_options") || (this.formatting_options = {
			bg_color: !0,
			border_color: !0,
			borders: !0,
			colspan: !0,
			fixed_layout: !0,
			font_style: !0,
			rowspan: !0,
			text_color: !0,
			theme: !0,
			vertical_alignment: !0
		});
		return this.formatting_options
	};
	b.prototype.isFormattingOptionEnabled = function (a) {
		var b = this.getFormattingOptions();
		b.hasOwnProperty(a) || console.error("There is no formatting option named [" + a + "]");
		return !0 === b[a]
	};
	b.prototype.isFormattingOptionDisabled = function (a) {
		return !1 === this.isFormattingOptionEnabled(a)
	};
	b.prototype.setEnabledFormattingOptions = function (a) {
		for (var b = this.getFormattingOptions(), c = $jscomp.makeIterator(Object.entries(b)), d = c.next(); !d.done; d = c.next()) {
			d = $jscomp.makeIterator(d.value);
			var e = d.next().value;
			d.next();
			b[e] = a.includes(e)
		}
	};
	b.prototype.load = function (a) {
		var b = this.getFormattingOptions(), c = this.isFormattingOptionDisabled("colspan"),
			d = this.isFormattingOptionDisabled("rowspan");
		d = {colspan: c, rowspan: d};
		if (a && a.model && a.rows_views) {
			a.markup && Markup.load(a.markup);
			c = this.getSelectionBounds();
			this.model.load(a.model, d);
			d = this.model.row_count;
			for (var e = this.model.col_count, f = 0; f < d; ++f) for (var g = a.rows_views[f], k = 0; k < e; ++k) this.getCellView(f, k, !0).load(g[k], b);
			a.theme && this.setTheme(a.theme);
			if (1 == a.fixed_layout &&
				$.isArray(a.col_widths) && this.isFormattingOptionEnabled("fixed_layout")) {
				this.enableFixedLayout(!0);
				b = Math.min(a.col_widths.length, this.model.col_count);
				for (e = d = 0; e < b; ++e) d += a.col_widths[e];
				d += this.dom.find("col:first").width();
				this.dom.css({"table-layout": "fixed", width: d});
				for (e = 0; e < b; ++e) this.setColumnWidth(e, a.col_widths[e])
			}
			c && c.right < this.model.col_count && c.bottom < this.model.row_count ? this.selectCells(c.top, c.left, c.bottom, c.right) : this.selectCells(0, 0, 0, 0);
			this.options = "object" == typeof a.options ?
				a.options || {} : {};
			this.trigger("onload")
		}
	};
	b.prototype.transpose = function () {
		var a = this.dumpTransposed();
		this.load(a)
	};
	b.prototype.setReadOnly = function (b) {
		a.read_only = b
	};
	b.enableMarkupInCells = function (a) {
		d = a
	};
	b.setMarkupProcessingPlugin = function (a) {
		k = a
	};
	return b
}();
var TTable = function () {
	return function (a) {
		var m = new TableModel;
		m.insertRow(["Pet", "Name"]);
		m.insertColumn(["Age"]);
		m.insertRow(["Snake", "Jimmy", 2]);
		m.insertRow(["Cow", "Molly", 11], 1);
		var e = new TableView(m, a);
		m.insertRow(["Cat", "Jinks", 7], 2);
		m.rows[1][1].value = "Jolly";
		m.insertColumn(["Sex", "F", "M", "M"]);
		m.mergeCells(1, 0, 1, 1);
		m.splitCell(1, 0);
		m.mergeCells(1, 0, 2, 1);
		m.mergeCells(0, 0, 3, 1);
		m.splitCell(0, 0);
		m.mergeCells(0, 0, m.row_count - 1, m.col_count - 1);
		m.splitCell(0, 0);
		m.insertColumn(["x", "x", "x", "x"]);
		$('<button class="btn">Add Column</button>').appendTo($(a)).click(function () {
			m.insertEmptyColumn()
		});
		$('<button class="btn">Add Row</button>').appendTo($(a)).click(function () {
			m.insertEmptyRow()
		});
		$("<br/>").appendTo($(a));
		$("<button>Remove Row</button>").appendTo($(a)).click(function () {
			var a = e.selection;
			a && a.top == a.bottom && m.removeRow(a.top)
		});
		$("<button>Remove Column</button>").appendTo($(a)).click(function () {
			var a = e.selection;
			a && a.left == a.right && m.removeColumn(a.left)
		});
		$("<button>Merge</button>").appendTo($(a)).click(e.mergeSelectedCells.bind(e));
		$("<button>Split</button>").appendTo($(a)).click(e.splitSelectedCell.bind(e))
	}
}();
var TableThemes = function () {
	function a(b, c) {
		c = c || $.extend(!0, {}, k);
		for (var d in c) if (c.hasOwnProperty(d)) {
			var e = c[d];
			"object" == typeof e ? c[d] = a(b, e) : "string" == typeof e && "$" == e.substr(0, 1) && b.hasOwnProperty(e.substr(1)) && (c[d] = b[e.substr(1)])
		}
		return c
	}

	function m(a) {
		var b = 0;
		if (0 == a.length) return b;
		var c = 0;
		for (var d = a.length; c < d; c++) {
			var e = a.charCodeAt(c);
			b = (b << 5) - b + e;
			b |= 0
		}
		return b
	}

	function e(a) {
		for (var b = {}, c = 0; c < a.length; ++c) $.extend(!0, b, a[c]);
		return b
	}

	function b(a, c, d, e) {
		c = c || "";
		0 < c.length && (c += " ");
		var f = [];
		Object.keys(a).sort().forEach(function (d) {
			if ("_" != d[0] || a[d]._active && e) {
				var g = a[d];
				"object" == typeof g ? ("_" == d[0] && (d = d.substr(1)), g = b(g, null, !0), d = Utils.join_strings(g, "", {
					lines_separator: "\n  ",
					max_line_length: 120,
					prefix: "" + c + d + "{",
					suffix: "}"
				}), f.push(d)) : "_" != d[0] && f.push(d + ":" + g + ";")
			}
		});
		return d ? f : f.join("\n")
	}

	var d = {
		" ": {_active: !0, "border-collapse": "collapse", "border-spacing": 0},
		td: {
			"font-family": "Arial, sans-serif",
			"font-size": "14px",
			padding: "10px 5px",
			"border-style": "solid",
			"border-width": "0px",
			overflow: "hidden",
			"word-break": "normal"
		},
		th: {
			"font-family": "Arial, sans-serif",
			"font-size": "14px",
			"font-weight": "normal",
			padding: "10px 5px",
			"border-style": "solid",
			"border-width": "0px",
			overflow: "hidden",
			"word-break": "normal"
		},
		_row_odd_td: {_active: !1},
		"_tr:nth-child(odd) td": {_active: !1},
		"_tr:nth-child(2) td": {_active: !0},
		_col_even_td: {_active: !1},
		"_td:nth-child(odd)": {_active: !1},
		"_tr:hover td": {_active: !1}
	}, c = {
		"No borders": {" ": {border: "none"}},
		"All borders": {
			td: {"border-width": "1px", "border-color": "black"},
			th: {"border-width": "1px", "border-color": "black"}
		},
		Horizontal: {
			td: {"border-top-width": "1px", "border-bottom-width": "1px", "border-color": "black"},
			th: {"border-top-width": "1px", "border-bottom-width": "1px", "border-color": "black"}
		},
		Outer: {" ": {"border-width": "1px", "border-style": "solid", "border-color": "black"}}
	}, g = {
		"No alternate": {},
		"Alternate rows": {
			"_tr:nth-child(odd) td": {_active: !0},
			"_tr:nth-child(2) td": {_active: !0},
			_row_odd_td: {_active: !0}
		},
		"Alternate columns": {
			_col_even_td: {_active: !0}, "_td:nth-child(odd)": {_active: !0},
			"_tr:nth-child(2) td": {_active: !0}
		}
	}, k = {
		" ": {"border-color": "$border_color"},
		td: {"border-color": "$border_color", color: "$td_text_color", "background-color": "$td_bg_color"},
		th: {"border-color": "$border_color", color: "$th_text_color", "background-color": "$th_bg_color"},
		"_tr:nth-child(2) td": {color: "$th_text_color", "background-color": "$th_bg_color"},
		_row_odd_td: {"background-color": "$td_alt_bg_color"},
		_col_even_td: {"background-color": "$td_alt_bg_color"},
		"_td:nth-child(odd)": {"background-color": "$td_alt_bg_color"},
		"_tr:nth-child(odd) td": {"background-color": "$td_alt_bg_color"},
		"_tr:hover td": {"background-color": "$td_hover_bg_color", color: "$td_hover_text_color"}
	}, f = {
		Default: {},
		Light: a({
			border_color: "#ccc",
			td_text_color: "#333",
			td_bg_color: "#fff",
			th_text_color: "#333",
			th_bg_color: "#f0f0f0",
			td_alt_bg_color: "#f9f9f9",
			td_hover_bg_color: "#f0f0f0",
			td_hover_text_color: "#222"
		}),
		Orange: a({
			border_color: "#aaa",
			td_text_color: "#333",
			td_bg_color: "#fff",
			th_text_color: "#fff",
			th_bg_color: "#f38630",
			td_alt_bg_color: "#FCFBE3",
			td_hover_bg_color: "#FFC950",
			td_hover_text_color: "#222"
		}),
		Blue: a({
			border_color: "#9ABAD9",
			td_text_color: "#444",
			td_bg_color: "#EBF5FF",
			th_text_color: "#fff",
			th_bg_color: "#409cff",
			td_alt_bg_color: "#D2E4FC",
			td_hover_bg_color: "#FFCC00",
			td_hover_text_color: "#333"
		}),
		Violet: a({
			border_color: "#aabcfe",
			td_text_color: "#669",
			td_bg_color: "#e8edff",
			th_text_color: "#039",
			th_bg_color: "#b9c9fe",
			td_alt_bg_color: "#D2E4FC",
			td_hover_bg_color: "#d0dafd",
			td_hover_text_color: "#339"
		}),
		Green: a({
			border_color: "#bbb",
			td_text_color: "#594F4F",
			td_bg_color: "#E0FFEB",
			th_text_color: "#493F3F",
			th_bg_color: "#9DE0AD",
			td_alt_bg_color: "#C2FFD6",
			td_hover_bg_color: "#E5FCC2",
			td_hover_text_color: "#333"
		}),
		Solarized: a({
			border_color: "#93a1a1",
			td_text_color: "#002b36",
			td_bg_color: "#fdf6e3",
			th_text_color: "#fdf6e3",
			th_bg_color: "#657b83",
			td_alt_bg_color: "#eee8d5",
			td_hover_bg_color: "#cb4b16",
			td_hover_text_color: "fdf6e3"
		}),
		Vibrant: a({
			border_color: "#C44D58",
			td_text_color: "#002b36",
			td_bg_color: "#F9CDAD",
			th_text_color: "#fdf6e3",
			th_bg_color: "#FE4365",
			td_alt_bg_color: "#FFA4A0",
			td_hover_bg_color: "#cb4b16",
			td_hover_text_color: "fdf6e3"
		})
	}, q = {None: {}, Highlight: {_hover_theme: {_active: !0}}}, t = {};
	return {
		ColorThemes: f,
		BorderThemes: c,
		HoverThemes: q,
		"Alternate Rows/Columns Themes": g,
		combineThemes: e,
		createTheme: function (a) {
			var k = "theme" + Math.abs(m(JSON.stringify(a)));
			if (!t.hasOwnProperty(k)) {
				var p = [d];
				a.BorderTheme && p.push(c[a.BorderTheme]);
				a["Alternate Rows/Columns Theme"] && p.push(g[a["Alternate Rows/Columns Theme"]]);
				a.ColorTheme && p.push(f[a.ColorTheme]);
				a.HoverTheme && p.push(q[a.HoverTheme]);
				a = e(p);
				t[k] = a;
				a = b(a, "." + k, !1, !0);
				p = document.createElement("div");
				a = a.replace(/padding: 10px/, "padding: 0px");
				p.innerHTML = '&shy;<style type="text/css" media="screen">' + a + "</style>";
				document.body.appendChild(p.childNodes[1])
			}
			return k
		},
		getThemeById: function (a) {
			return t[a]
		},
		themeToStr: b
	}
}();
(function (a, m, e, b) {
	function d(b, d) {
		this.el = b;
		this.$el = a(b);
		this.max_rows = d.max_rows;
		this.max_cols = d.max_cols;
		this.max_visible_rows = d.max_visible_rows || 15;
		this.max_visible_cols = d.max_visible_cols || 15;
		this.$table = null;
		this.hover_range = {row: -1, col: -1};
		this.size = {rows: d.rows, cols: d.cols};
		this.select_size_callback = d.onSetSize;
		this.$el.data("SizeChooser", this);
		this.init()
	}

	d.prototype.init = function () {
		function b() {
			p.addClass("display-block")
		}

		function d() {
			p.removeClass("display-block")
		}

		function e(a) {
			13 == a.which &&
			(t.setSize(parseInt(t.rows_input.val()), parseInt(t.cols_input.val())), d())
		}

		for (var f = a("<div/>", {"class": "SizeChooser"}), m = a("<table/>").appendTo(f), t = this, p = t.$el.parents(".dropdown-menu"), r = 0; r < this.max_visible_rows; ++r) {
			for (var u = a("<tr/>"), w = 0; w < this.max_visible_cols; ++w) {
				var A = a("<td> </td>");
				u.append(A);
				A.mousemove(function (a) {
					t.onCellMousemove(a)
				})
			}
			m.append(u)
		}
		this.$table = m;
		this.$el.append(f);
		this.$size_form = a("<form/>").appendTo(f);
		this.rows_input = a("<input>").val(this.size.rows).keydown(e).on("focus",
			b).on("blur", d).appendTo(this.$size_form);
		this.$size_form.append(a("<span> x </span>"));
		this.cols_input = a("<input>").val(this.size.cols).keydown(e).on("focus", b).on("blur", d).appendTo(this.$size_form);
		this.setSize(this.size.rows, this.size.cols, !0);
		m.mousedown(function (a) {
			t.onMousedown(a)
		});
		m.mouseleave(function () {
			t.setSize(t.size.rows, t.size.cols, !0);
			t.setHoverRange(t.size.rows - 1, t.size.cols - 1)
		});
		this.rows_cache = null
	};
	d.prototype.forEachCell = function (b) {
		if (null == this.rows_cache) {
			var c = [];
			this.$table.find("tr").each(function (b,
																						d) {
				var e = [];
				a(d).find("td").each(function (a, b) {
					e.push(b)
				});
				c.push(e)
			});
			this.rows_cache = c
		}
		for (var d = 0; d < this.rows_cache.length; ++d) for (var e = this.rows_cache[d], m = 0; m < e.length; ++m) b(e[m], d, m)
	};
	d.prototype.onCellMousemove = function (b) {
		var c = b.target;
		for (c = a(c); "td" != c.get(0).nodeName.toLowerCase();) c = c.parent();
		b = c.index();
		c = a(c.parent()).index();
		this.setHoverRange(c, b)
	};
	d.prototype.onMousedown = function (a) {
		0 <= this.hover_range.col && 0 <= this.hover_range.row && this.setSize(this.hover_range.row + 1, this.hover_range.col +
			1)
	};
	d.prototype.setHoverRange = function (b, d) {
		if (this.hover_range.row != b || this.hover_range.col != d) this.forEachCell(function (c, e, g) {
			e <= b && g <= d ? a(c).addClass("SizeChooser-hover") : a(c).removeClass("SizeChooser-hover")
		}), this.hover_range.row = b, this.hover_range.col = d, this.rows_input.val(b + 1), this.cols_input.val(d + 1)
	};
	d.prototype.setSize = function (b, d, e) {
		b = b || this.size.rows;
		d = d || this.size.cols;
		b = Math.max(1, Math.min(this.max_rows, b));
		d = Math.max(1, Math.min(this.max_cols, d));
		this.forEachCell(function (c, e, g) {
			e <
			b && g < d ? a(c).addClass("SizeChooser-selected") : a(c).removeClass("SizeChooser-selected")
		});
		this.size.rows = b;
		this.size.cols = d;
		this.rows_input.val(b);
		this.cols_input.val(d);
		!e && this.select_size_callback && this.select_size_callback(b, d)
	};
	a.fn.SizeChooser = function (b) {
		return this.each(function () {
			a.data(this, "SizeChooser") || a.data(this, "SizeChooser", new d(this, b))
		})
	}
})(jQuery, window, document, void 0);
(function (a) {
	function m(e, b) {
		this.el = a(e);
		this.onChange = b.onChange;
		this.init()
	}

	m.prototype = {
		init: function () {
			var e = this, b = e.el, d = e.el.parents(".dropdown-menu");
			e.el.on("mouseenter", function () {
				d.addClass("display-block")
			}).on("mouseleave", function () {
				d.removeClass("display-block")
			});
			a("<label>").text("Horizontal spacing").appendTo(b);
			var c = a("<input/>", {
				type: "text",
				"data-slider-min": "0",
				"data-slider-max": "20",
				"data-slider-step": "1",
				"data-slider-value": 10
			}), g = a("<input/>", {
				type: "text", "data-slider-min": "0",
				"data-slider-max": "20", "data-slider-step": "1", "data-slider-value": 10
			}), k = null, f = null, m = function () {
				var a = c.slider("getValue"), b = g.slider("getValue");
				if (a != k || b != f) e.onChange(a, b);
				k = a;
				f = b
			};
			c.appendTo(b).slider().on("slide", m);
			a("<label>").text("Vertical spacing").appendTo(b);
			g.appendTo(b).slider().on("slide", m);
			e.input1 = c;
			e.input2 = g
		}, setHorizontalSpacing: function (a) {
			this.input1.slider("setValue", a)
		}, setVerticalSpacing: function (a) {
			this.input2.slider("setValue", a)
		}
	};
	a.fn.CellSpacingPanel = function (e) {
		return this.each(function () {
			a.data(this,
				"CellSpacingPanel") || a.data(this, "CellSpacingPanel", new m(this, e))
		})
	}
})(jQuery);
var Main = function () {
	var a = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,
		m = function (e) {
			var b, d = null, c = jQuery.trim(e + "");
			return c && !jQuery.trim(c.replace(a, function (a, c, e, m) {
				b && c && (d = 0);
				if (0 === d) return a;
				b = e || c;
				d += !m - !e;
				return ""
			})) ? Function("return " + c)() : jQuery.error("Invalid JSON: " + e)
		};
	return {
		init_table_from_json: function (a, b) {
			var d = null;
			try {
				d = jQuery.parseJSON(b)
			} catch (c) {
				try {
					d = m(b)
				} catch (g) {
				}
			}
			d && (d.rows && 0 < d.rows.length ?
				(a.reset(), a.model.setRows(d.rows)) : d.model && a.load(d))
		}
	}
}();
var MainUI = function (a, m) {
	function e(b, c) {
		this.table_view = b;
		this.table = b.model;
		this.options = c || {};
		this.persistence = new PersistenceHelper(b);
		this.observable = {};
		a.observable(this.observable);
		this.init()
	}

	e.prototype.init = function () {
		this.initFileMenu();
		this.initTableMenu();
		this.initColumnMenu();
		this.initRowMenu();
		this.initCellMenu();
		this.initToolbar();
		this.initResultControlPanel();
		this.initUndoRedo();
		this.initTableSave();
		this.initTableShare();
		this.initTableAutosave();
		this.initTableCellContextMenu();
		this.initColumnWidthDialog();
		a(".tableview").focus();
		this.persistence.run();
		a("pre:first").dblclick(function () {
			Utils.select_text("result-code")
		});
		this.init_table_context_menus();
		a("[rel=tooltip]").attr("data-container", "body").tooltip({placement: "top"});
		this.initEditorExpander();
		this.initTableImport()
	};
	e.prototype.initTableImport = function () {
		var b = a("#table_import_paste_target"), c = a("#import_pasted_dialog"), e = a("#import_pasted_with_style"), k = !1,
			f = null, q = null, t = this;
		c.on("hide", function () {
			k = !1;
			q = null;
			b.html("");
			m.getElementById("import_pasted").value =
				"";
			e.parent().hide()
		});
		var p = function (a) {
			if (a.dataset && a.dataset.computedStyle) {
				var b = JSON.parse(a.dataset.computedStyle), c = a.style, d;
				for (d in b) c[d] = b[d];
				a = $jscomp.makeIterator(a.childNodes);
				for (b = a.next(); !b.done; b = a.next()) b = b.value, 1 === b.nodeType && p(b)
			}
		}, r = function (a) {
			if (a.dataset && a.dataset.computedStyle) {
				var b = JSON.parse(a.dataset.computedStyle), c = a.style, d;
				for (d in b) c[d] = "unset";
				a = $jscomp.makeIterator(a.childNodes);
				for (b = a.next(); !b.done; b = a.next()) b = b.value, 1 === b.nodeType && r(b)
			}
		};
		e.change(function () {
			this.checked ?
				p(q) : r(q)
		});
		var u = function (a, c) {
			var d = TableImport.extractTableFromTableElement(a, c, !0);
			(k = null != d) ? (f = d[0], q = d[1], r(q), b[0].appendChild(q), e.prop("checked", !1).parent().show()) : (d = b[0], d.innerHTML = a || c, m.getElementById("import_pasted").value = d.innerText || d.textContent, q = f = null, e.parent().hide())
		};
		m.getElementById("import_pasted_form").addEventListener("submit", function (a) {
			if (k) {
				a.stopPropagation();
				a.preventDefault();
				c.modal("hide");
				e.parent().hide();
				a = t.table_view;
				var b = e.is(":checked");
				a.reset(1,
					1);
				a.importTable(f, 0, 0, !0, b);
				f = null
			}
		});
		b.on("paste", function (a) {
			PasteHelper.handleDirectly(a.originalEvent, u)
		})
	};
	e.prototype.initEditorExpander = function (b) {
		var c = a("#table_editor_expander");
		c.click(function () {
			c.hasClass("expanded") ? (c.removeClass("expanded"), a("#edited_table_container").css("max-height", "500px")) : (c.addClass("expanded"), a("#edited_table_container").css("max-height", "none"))
		});
		b = function () {
			var a = function () {
					500 < m.getElementById("edited_table_container").scrollHeight ? c.show() : c.hide()
				},
				b = null;
			return function () {
				null != b && (window.clearTimeout(b), b = null);
				b = setTimeout(a, 100)
			}
		}();
		this.table_view.on("state_change", b);
		b()
	};
	e.prototype.setSelColumnsHAlign = function (a) {
		var b = this.table_view, d = b.getSelectionBounds();
		if (d) {
			var e = d.right;
			for (d = d.left; d <= e; ++d) b.forEachCellInColumn(d, function (b) {
				b.style.setHorizontalAlign(a)
			})
		}
	};
	e.prototype.initFileMenu = function () {
		function b(b) {
			a("#message_dialog_body").html(b);
			a("#message_dialog").modal("show")
		}

		function c(b) {
			var c = a("#dropbox_load_table_dialog");
			b = b.map(function (a) {
				var b = a.path;
				a = new Date(a.modified);
				return '<li table-id="' + encodeURIComponent(b) + '"><span>' + b + "</span><span>" + a.toLocaleString() + "</span></li>"
			});
			b = a("<ul>").addClass("dropbox_file_list").html(b.join(""));
			var d = a("#dropbox_tables_list");
			d.children().remove();
			d.append(b);
			b.click(e);
			c.modal("show")
		}

		function e(b) {
			for (b = a(b.target); b && "LI" != b.get(0).nodeName;) b = b.parent();
			(b = b.attr("table-id")) && k(b)
		}

		function k(c) {
			c = "/dropbox_table_load/" + c;
			a("#dropbox_load_table_dialog").modal("hide");
			a.ajax({
				url: c, type: "GET", data: {}, success: function (a, b, c) {
					a = a.table;
					a = a.replace(/\r?\n|\r|\u000d|\u000a|\u2028|\u2029/g, "\\n");
					f.table_view.load(jQuery.parseJSON(a))
				}, error: function (a, c, d) {
					b("We are sorry, an unexpected error has occurred while loading the table.")
				}
			})
		}

		var f = this;
		a("#new_table_rows_input,#new_table_columns_input").keydown(function (a) {
			13 == a.which && a.preventDefault()
		});
		a("#create_new_table_btn").click(function (b) {
			b.preventDefault();
			var c = a("#new_table_rows_input");
			b = c.val();
			var d = /^[0-9]+$/.test(b) &&
				1 <= parseInt(b) && 1E3 >= parseInt(b);
			d ? c.parents(".control-group").removeClass("error") : c.parents(".control-group").addClass("error");
			c = a("#new_table_columns_input");
			var e = c.val(), g = /^[0-9]+$/.test(e) && 1 <= parseInt(e) && 20 >= parseInt(e);
			g ? c.parents(".control-group").removeClass("error") : c.parents(".control-group").addClass("error");
			d && g && (a("#new_table_dialog").modal("hide"), f.createNewTable(b, e))
		});
		a("#dropbox_connect").click(function () {
			window.location.replace("/dropbox-connect" + window.location.pathname)
		});
		a("#dropbox_disconnect").click(function () {
			window.location.replace("/dropbox-disconnect" + window.location.pathname)
		});
		a("#dropbox_table_save").click(function (c) {
			function d() {
				k.removeClass("loading2");
				g.find("span").text("Save");
				e.modal("hide")
			}

			c = f.table_view.dump();
			c = {table_to_save: JSON.stringify(c), table_name: a("#dropbox_table_name").val()};
			var e = a("#dropbox_save_table_dialog"), g = e.find("button:last"), k = g.find("div");
			k.addClass("loading2");
			g.find("span").text("Saving...");
			a.ajax({
				url: "/dropbox-table-save",
				type: "POST", data: c, success: function (a, c, e) {
					d();
					a.success ? b("Your table has been saved.") : b(a.error)
				}, error: function (a, b, c) {
					d()
				}
			})
		});
		a("#dropbox_table_load").click(function () {
			var d = a("<div>", {"class": "loading2"});
			a("#dropbox_tables_list").append(d);
			a("#dropbox_load_table_dialog").modal("show");
			a.ajax({
				url: "/dropbox_tables_list", type: "GET", data: {}, success: function (a, b, d) {
					c(a.files_list)
				}, error: function (a, c, d) {
					b("Can not load tables list from Dropbox")
				}
			})
		})
	};
	e.prototype.createNewTable = function (a, b) {
		this.table_view.reset();
		this.table.resize(a, b);
		this.unredo.clear()
	};
	e.prototype.initTableMenu = function () {
		function b(b) {
			b = b.offset();
			k || (k = a("<div>").attr({"class": "loading-indicator"}).appendTo(a("body")));
			k.css({left: b.left + "px", top: b.top + "px"}).show()
		}

		var c = this.table_view, e = this.table;
		a("#table_reset").click(function () {
			c.reset()
		});
		a("#table_clear_formatting").click(function () {
			c.clearFormatting()
		});
		a("#table_transpose").click(function () {
			c.transpose()
		});
		a("#table_add_all_borders").click(function (a) {
			var b = function (a) {
				a.style.setBorders("ltrb")
			};
			a.ctrlKey ? c.forEachSelectedCellView(b, null, !0) : c.forEachCellView(b, !0)
		});
		a("#table_add_vert_borders").click(function () {
			c.forEachCell(function (a) {
				a.style.setBorders("lr")
			})
		});
		a("#table_add_horizontal_borders").click(function () {
			c.forEachCell(function (a) {
				a.style.setBorders("tb")
			})
		});
		a("#table_remove_all_borders").click(function (a) {
			var b = function (a) {
				a.style.setBorders("")
			};
			a.ctrlKey ? c.forEachSelectedCellView(b, null, !0) : c.forEachCellView(b, !0)
		});
		var k = null;
		a(".table_size_chooser").SizeChooser({
			max_cols: 20,
			max_rows: 500, cols: e.col_count, rows: e.row_count, onSetSize: function (a, d) {
				400 < Math.max(e.col_count * e.row_count, a * d) ? (b(c.dom), window.setTimeout(function () {
					e.resize(a, d);
					k && k.hide()
				}, 100)) : e.resize(a, d)
			}
		});
		a("#table_resize").mouseover(function () {
			a(".table_size_chooser").data("SizeChooser").setSize(e.row_count, e.col_count, !0)
		});
		a("#cell-spacing-panel").CellSpacingPanel({
			onChange: function (a, b) {
				c.forEachCellView(function (c) {
					c.style.setPadding(b, a)
				})
			}
		});
		c.on("onload", function () {
			var b = c.getCellView(0, 0).style.getPadding(),
				d = a("#cell-spacing-panel").data("CellSpacingPanel");
			b && d && (void 0 != b.left && d.setHorizontalSpacing(b.left), void 0 != b.top && d.setVerticalSpacing(b.top))
		})
	};
	e.prototype.initColumnMenu = function () {
		var b = this.table_view, c = this.table;
		a("#col_insert_left").click(function () {
			var a = b.getSelectionBounds();
			a && c.insertEmptyColumn(a.left)
		});
		a("#col_insert_right").click(function () {
			var a = b.getSelectionBounds();
			a && c.insertEmptyColumn(a.right + 1)
		});
		a("#col_remove").click(function () {
			b.removeSelectedColumns()
		});
		var e = this;
		a("#col_align_left").click(function () {
			e.setSelColumnsHAlign("left")
		});
		a("#col_align_center").click(function () {
			e.setSelColumnsHAlign("center")
		});
		a("#col_align_right").click(function () {
			e.setSelColumnsHAlign("right")
		})
	};
	e.prototype.initRowMenu = function () {
		var b = this.table_view, c = this.table;
		a("#row_insert_below").click(function () {
			var a = b.getSelectionBounds();
			a && c.insertEmptyRow(a.bottom + 1)
		});
		a("#row_insert_above").click(function () {
			var a = b.getSelectionBounds();
			a && c.insertEmptyRow(a.top)
		});
		a("#row_remove").click(function () {
			var a =
				b.getSelectionBounds();
			if (a) {
				var d = a.bottom;
				for (a = a.top; d >= a; --d) c.removeRow(d)
			}
		})
	};
	e.prototype.initCellMenu = function () {
		var b = this.table_view;
		a("#cell_merge").click(b.mergeSelectedCells.bind(b));
		a("#cell_split").click(b.splitSelectedCell.bind(b))
	};
	e.prototype.setHorizontalAlignment = function (a) {
		var b = this.table_view;
		return function (c) {
			1 == c.which && (b.forEachSelectedCellView(function (b) {
				b.style.setHorizontalAlign(a)
			}), c.preventDefault())
		}
	};
	e.prototype.setVerticalAlignment = function (a) {
		var b = this.table_view;
		return function (c) {
			1 == c.which && (b.forEachSelectedCellView(function (b) {
				b.style.setVerticalAlign(a)
			}), c.preventDefault())
		}
	};
	e.prototype.initToolbar = function () {
		var b = this.table_view;
		a("#table_add_all_borders_btn").click(function (a) {
			var c = function (a) {
				a.style.setBorders("ltrb")
			};
			a.ctrlKey ? b.forEachCellView(c, !0) : b.forEachSelectedCellView(c, null, !0)
		});
		a("#table_remove_all_borders_btn").click(function (a) {
			var c = function (a) {
				a.style.setBorders("")
			};
			a.ctrlKey ? b.forEachCellView(c, !0) : b.forEachSelectedCellView(c,
				null, !0)
		});
		a("#table_merge_cells_btn").click(b.mergeSelectedCells.bind(b));
		a("#table_split_cells_btn").click(b.splitSelectedCell.bind(b));
		a("#edit_grid_btn").click(function () {
			b.isBorderEditEnabled() ? (b.enableBorderEdit(!1), a(this).removeClass("mode-active")) : (b.enableBorderEdit(!0), a(this).addClass("mode-active"))
		});
		a("#left_align_btn").mousedown(this.setHorizontalAlignment("left"));
		a("#right_align_btn").mousedown(this.setHorizontalAlignment("right"));
		a("#center_align_btn").mousedown(this.setHorizontalAlignment("center"));
		a("#vertical_align_top_btn").click(function () {
			b.forEachSelectedCellView(function (a) {
				a.style.setVerticalAlign("top")
			})
		});
		a("#vertical_align_middle_btn").click(function () {
			b.forEachSelectedCellView(function (a) {
				a.style.setVerticalAlign("middle")
			})
		});
		a("#vertical_align_bottom_btn").click(function () {
			b.forEachSelectedCellView(function (a) {
				a.style.setVerticalAlign("bottom")
			})
		});
		var c = function (a, c, d) {
			return function (e) {
				1 == e.which && (b.forEachSelectedCellView(function (b) {
					b.toggleFontStyle(a, c, d)
				}), e.preventDefault())
			}
		};
		a("#table_bold_font_btn").mousedown(c("fontWeight", "bold", "normal"));
		a("#table_italic_font_btn").mousedown(c("fontStyle", "italic", "normal"));
		a("#table_underline_btn").mousedown(c("textDecoration", "underline", "none"));
		a("#insert-link-button").mousedown(function (a) {
			1 == a.which && (b.forSingleSelectedCellView(function (a) {
				a.insertLink()
			}), a.preventDefault())
		});
		a("#insert-img-button").mousedown(function (a) {
			1 == a.which && (b.forSingleSelectedCellView(function (a) {
				a.insertImage()
			}), a.preventDefault())
		});
		c = "#ffffff;#ffccc9;#ffce93;#fffc9e;#ffffc7;#9aff99;#96fffb;#ECF4FF;#cbcefb;#efefef;#fd6864;#fe996b;#fffe65;#fcff2f;#67fd9a;#38fff8;rgb(218, 232, 252);#9698ed;#c0c0c0;#fe0000;#f8a102;#ffcc67;#f8ff00;#34ff34;#68cbd0;#34cdf9;#6665cd;#9b9b9b;#cb0000;#f56b00;#ffcb2f;#ffc702;#32cb00;#00d2cb;#3166ff;#6434fc;#656565;#9a0000;#ce6301;#cd9934;#999903;#009901;#329a9d;#3531ff;#6200c9;#343434;#680100;#963400;#986536;#646809;#036400;#34696d;#00009b;#303498;#000000;#330001;#643403;#663234;#343300;#013300;#003532;#010066;#340096".split(";");
		var e = a("#fg-color-picker");
		e.spectrum({
			color: "#000",
			showInput: !0,
			className: "color-picker",
			showInitial: !0,
			showPalette: !0,
			showSelectionPalette: !0,
			maxPaletteSize: 10,
			preferredFormat: "hex",
			localStorageKey: "tg.spectrum",
			change: function (a) {
				var c = a.toHexString();
				b.forEachSelectedCellView(function (a) {
					a.toggleFontStyle("color", c, "")
				})
			},
			palette: c,
			extraReplacerAttr: {rel: "tooltip", title: "Set text color of selected cells"}
		});
		var k = e.next().find(".sp-dd");
		k.after('<div class="side-icon"><i class="icon-font"></i> </div>');
		k.remove();
		var f = a("#bg-color-picker");
		f.spectrum({
			color: "#FFF",
			showInput: !0,
			className: "color-picker",
			showInitial: !0,
			showPalette: !0,
			showSelectionPalette: !0,
			maxPaletteSize: 10,
			preferredFormat: "hex",
			localStorageKey: "tg.spectrum",
			change: function (a) {
				var c = a.toHexString();
				b.forEachSelectedCellView(function (a) {
					a.toggleFontStyle("backgroundColor", c, "")
				})
			},
			palette: c,
			extraReplacerAttr: {rel: "tooltip", title: "Set background color of selected cells"}
		});
		k = f.next().find(".sp-dd");
		k.after('<div class="side-icon"><i class="icon-tint"></i> </div>');
		k.remove();
		var m = a("#border-color-picker");
		this.options.show_border_color_picker ? (m.spectrum({
			color: "transparent",
			showInput: !0,
			className: "color-picker",
			showInitial: !0,
			showPalette: !0,
			showSelectionPalette: !0,
			maxPaletteSize: 10,
			preferredFormat: "hex",
			localStorageKey: "tg.spectrum",
			change: function (a) {
				var c = a.toHexString();
				b.forEachSelectedCellView(function (a) {
					a.style.setBorderColor(c)
				})
			},
			palette: c,
			extraReplacerAttr: {rel: "tooltip", title: "Set border color of selected cells"}
		}), c = m.next().find(".sp-dd"), c.after('<div class="side-icon"><i class="icon-table"></i> </div>'),
			c.remove()) : m.remove();
		a("#color-clear").click(function () {
			b.forEachSelectedCellView(function (a) {
				a.style.clearBgColor();
				a.style.clearTextColor();
				a.style.clearBorderColor()
			})
		});
		var t = !1;
		a("#font-family-select").selectpicker();
		a("#font-family-select").change(function () {
			var c = a(this).val();
			!t && 0 < c.length && b.forEachSelectedCellView(function (a) {
				a.style.addFontStyle("font-family", c)
			})
		});
		b.on("single_cell_selected", function (b) {
			var c = b.view.style, d = c.font_style["font-family"] || "ff-serif";
			t = !0;
			a("#font-family-select").selectpicker("val",
				d);
			(d = c.bg_color) || (d = b.view.dom.css("background-color"));
			d && f.spectrum("set", d);
			(d = c.text_color) || (d = b.view.dom.css("color"));
			d && e.spectrum("set", d);
			(c = c.border_color) || (c = b.view.dom.css("border-color"));
			m.spectrum("set", c);
			t = !1
		});
		c = "xx-small x-small small medium large x-large xx-large".split(" ");
		k = [10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 36];
		for (var p = a("#font-size-select"), r = 0; r < k.length; ++r) p.append(a("<option/>").attr("value", k[r] + "px").addClass("font-size-" + k[r]).text(k[r] + "px"));
		p.append(a("<option/>").attr("value",
			"inherit").text("Default font size"));
		for (r = 0; r < c.length; ++r) p.append(a("<option/>").attr("value", c[r]).addClass("font-size-" + c[r]).text(c[r]));
		p.selectpicker();
		p.change(function () {
			if (!t) {
				var c = a(this).val();
				b.forEachSelectedCellView(function (a) {
					a.style.addFontStyle("font-size", c)
				})
			}
		});
		b.on("single_cell_selected", function (a) {
			a = a.view.style.font_style["font-size"] || "inherit";
			t = !0;
			p.selectpicker("val", a);
			t = !1
		});
		this.initThemeSelection()
	};
	e.prototype.initThemeSelection = function () {
		var b = this;
		b.theme_selector =
			{
				themes: {}, addTheme: function (a, b) {
					this.themes[a + "Theme"] = b;
					this.trigger("theme_added", a, b)
				}, setTheme: function (a) {
					this.themes = a;
					this.trigger("theme_set", a)
				}
			};
		a.observable(b.theme_selector);
		a("#theme-select").click(function () {
			b.showThemeChooser()
		})
	};
	e.prototype.showThemeChooser = function () {
		var b = this, c = {
			Default: "Transparent background",
			"No borders": "No borders",
			"All borders": "All borders",
			Horizontal: "Horizontal borders",
			Outer: "Border around table",
			"No alternate": "No stripes",
			"Alternate rows": "Horizontal stripes",
			"Alternate columns": "Vertical stripes"
		};
		if (!this.theme_chooser) {
			var e = a("#theme_dialog"), k = a("#theme_dialog__panels"), f = e.find(".tabs li"), m = [];
			a("#theme_dialog__close_btn").click(function () {
				b.table_view.setTheme(b.theme_selector.themes);
				e.hide()
			});
			f.each(function (b, c) {
				a(c).click(function () {
					for (var c = 0; c < m.length; ++c) c == b ? (m[c].show(), a(f[c]).addClass("is-active")) : (m[c].hide(), a(f[c]).removeClass("is-active"))
				})
			});
			["Color", "Border", "Alternate Rows/Columns "].forEach(function (d) {
				var e = d + "Theme", f =
					a("<div>").addClass("theme_dialog__panel").appendTo(k);
				0 == m.length && f.show();
				m.push(f);
				a.each(TableThemes[d + "Themes"], function (g, k) {
					var m = {};
					m[e] = g;
					var q = TableThemes.createTheme(m);
					k = a("<div>").addClass("example-table").appendTo(f);
					var p = a("<table>        <tr class='hide'><td></td><td></td><td></td><td></td><td></td></tr>        <tr><th style='display:none'></th><th>Company</th><th>Q1</th><th>Q2</th><th>Q3</th></tr>        <tr><td style='display:none'></td><td>Microsoft</td><td>20.3</td><td>30.5</td><td>23.5</td></tr>        <tr><td style='display:none'></td><td>Google</td><td>50.2</td><td>40.63</td><td>45.23</td></tr>        <tr><td style='display:none'></td><td>Apple</td><td>25.4</td><td>30.2</td><td>33.3</td></tr>        </table>").addClass(q).appendTo(k).click(function () {
						b.theme_selector.addTheme(d,
							g)
					});
					b.theme_selector.on("theme_added", function (a, b) {
						d == a ? g == b ? p.addClass("selected") : p.removeClass("selected") : (m[a + "Theme"] = b, a = TableThemes.createTheme(m), p.removeClass(q).addClass(a), q = a)
					});
					b.theme_selector.on("theme_set", function (b) {
						b[e] == g ? p.addClass("selected") : p.removeClass("selected");
						m = a.extend({}, b);
						m[e] = g;
						b = TableThemes.createTheme(m);
						p.removeClass(q).addClass(b);
						q = b
					});
					var r = c[g] || "&nbsp;";
					k.append(a("<p>").html(r))
				})
			});
			this.theme_chooser = e;
			b.theme_selector.setTheme(b.theme_selector.themes)
		}
		var t =
			a("#theme-select").offset();
		this.theme_chooser.css({left: a(".tableview").first().offset().left, top: t.top + 30}).fadeIn()
	};
	var b = function () {
		function b() {
			if (1 == m.queryCommandSupported("copy")) {
				var b = function (a) {
					null != k && k(a)
				};
				a(".copy-to-clipboard-workaround").on("click", b).css("display", "block");
				a(".with-zero-clipboard").on("click", b);
				f = !0
			}
		}

		var c = {}, e = null, k = null, f = !1;
		c.setOnCopyCallback = function (a) {
			k = a
		};
		c.init = function () {
			ZeroClipboard.config({swfPath: "/static/ZeroClipboard.swf"});
			e = new ZeroClipboard(a(".with-zero-clipboard"));
			e.on("copy", function (a) {
				null != k && k(a)
			});
			ZeroClipboard.on("error", function (c) {
				ZeroClipboard.destroy();
				a("#copy-to-clipboard").hide();
				e = null;
				b()
			})
		};
		c.setText = function (a, b) {
			if (null != e) ZeroClipboard.setData(b || "text/plain", a); else if (f) {
				b = m.createElement("textarea");
				b.style.position = "fixed";
				b.style.top = 0;
				b.style.left = 0;
				b.style.width = "2em";
				b.style.height = "2em";
				b.style.padding = 0;
				b.style.border = "none";
				b.style.outline = "none";
				b.style.boxShadow = "none";
				b.style.background = "transparent";
				b.value = a;
				m.body.appendChild(b);
				b.select();
				try {
					m.execCommand("copy")
				} catch (p) {
					console.log("Oops, unable to copy")
				}
				m.body.removeChild(b)
			}
		};
		return c
	}();
	e.prototype.initResultControlPanel = function () {
		var d = this;
		b.init();
		b.setOnCopyCallback(function (c) {
			c = a(c.target);
			var e = c.closest("[data-action-id]");
			if ((e = a(e).data("action-id")) || c.hasClass("copy-to-clipboard-workaround") || c.hasClass("with-zero-clipboard")) "cell_contents_cut" == e ? (c = d.table_view.getSelectedCellsAsHTML(), d.table_view.clearSelectedCellsContents(), b.setText(c, "text/html")) :
				"cell_contents_copy" == e ? (c = d.table_view.getSelectedCellsAsHTML(), b.setText(c, "text/html")) : (c = a("#result-code").text(), -1 != navigator.appVersion.indexOf("Win") && (c = c.replace(/\n/g, "\r\n")), b.setText(c)), c && (d.table_view.ignore_next_copy_event = !0)
		})
	};
	e.prototype.initUndoRedo = function () {
		var b = new UnReDo(this.table_view);
		this.unredo = b;
		b.addChange();
		a(m).keydown(function (a) {
			a.ctrlKey && 90 == a.which && "DIV" != a.target.nodeName ? b.undo() : a.ctrlKey && 89 == a.which && "DIV" != a.target.nodeName && b.redo()
		});
		a("#edit_undo").click(function () {
			b.undo()
		});
		a("#edit_redo").click(function () {
			b.redo()
		})
	};
	e.prototype.initTableSave = function () {
		var b = this;
		a("#table-name").keydown(function (a) {
			13 == a.which && a.preventDefault()
		});
		a("#table-save-link").click(function () {
			var c = JSON.stringify(b.table_view.dump());
			a("#table-save-data").val(c);
			c = a("#table-save-form").serialize();
			a.fileDownload("/table-save", {
				dialogOptions: {modal: !1},
				httpMethod: "POST",
				data: c,
				successCallback: function () {
					a("#save_table_dialog").modal("hide")
				}
			});
			return !1
		})
	};
	e.prototype.initTableAutosave = function () {
		function b() {
			a("#edit_autosave i").removeClass("icon-check-minus").addClass("icon-check")
		}

		function c() {
			a("#edit_autosave i").removeClass("icon-check").addClass("icon-check-minus")
		}

		var e = this, k = docCookies.getItem("tg-autosave"), f = null === k || "1" === k;
		f ? b() : c();
		a("#edit_autosave").click(function () {
			f ? (f = !1, docCookies.setItem("tg-autosave", "0", Infinity), DB("tg-table").put(""), e.persistence.disable(), c()) : (f = !0, docCookies.setItem("tg-autosave", "1", Infinity), e.persistence.enable(), b())
		});
		f && (k = PersistenceHelper.load(), null != k && this.table_view.load(k))
	};
	e.prototype.initTableCellContextMenu = function () {
		var a =
			this.table_view.dom;
		a.get(0).oncontextmenu = function () {
			return !1
		};
		a.contextmenu({target: "#table-cell-menu"})
	};
	e.prototype.init_table_context_menus = function () {
		function b() {
			a.each(a(".aux-cell-column"), function (b, c) {
				a(c).contextmenu({target: "#table-aux-col-menu"})
			})
		}

		function c() {
			a.each(a(".aux-cell-row"), function (b, c) {
				a(c).contextmenu({target: "#table-aux-row-menu"})
			})
		}

		var e = this, k = e.table_view, f = e.table_view.model;
		a("#table-aux-col-menu").present("SimpleMenu", {menu_item_id_attr: "data-menu-item-id"});
		var m = a("#table-aux-col-menu").data("SimpleMenu");
		m && (a('*[data-menu-item-id="add_to_the_left"]').click(function () {
			var a = k.getSelectionBounds();
			a && f.insertEmptyColumn(a.left)
		}), a('*[data-menu-item-id="add_to_the_right"]').click(function () {
			var a = k.getSelectionBounds();
			a && f.insertEmptyColumn(a.right + 1)
		}), a('*[data-menu-item-id="remove_column"]').click(function () {
			k.removeSelectedColumns()
		}), a('*[data-menu-item-id="set_column_width"]').click(function () {
			e.show_column_width_dialog()
		}), b());
		a("#table-aux-row-menu").present("SimpleMenu",
			{menu_item_id_attr: "data-menu-item-id"});
		if (m = a("#table-aux-row-menu").data("SimpleMenu")) a('*[data-menu-item-id="add_row_above"]').click(function () {
			var a = k.getSelectionBounds();
			a && f.insertEmptyRow(a.top)
		}), a('*[data-menu-item-id="add_row_below"]').click(function () {
			var a = k.getSelectionBounds();
			a && f.insertEmptyRow(a.bottom + 1)
		}), a('*[data-menu-item-id="remove_row"]').click(function () {
			k.removeSelectedRows()
		}), c();
		f.on("row_inserted", c);
		f.on("column_inserted", b);
		a('*[data-menu-item-id="cell_align_left"]').click(this.setHorizontalAlignment("left"));
		a('*[data-menu-item-id="cell_align_center"]').click(this.setHorizontalAlignment("center"));
		a('*[data-menu-item-id="cell_align_right"]').click(this.setHorizontalAlignment("right"));
		k.isFormattingOptionDisabled("vertical_alignment") ? (a('*[data-menu-item-id="cell_align_top"]').hide(), a('*[data-menu-item-id="cell_align_middle"]').hide(), a('*[data-menu-item-id="cell_align_bottom"]').hide()) : (a('*[data-menu-item-id="cell_align_top"]').click(this.setVerticalAlignment("top")), a('*[data-menu-item-id="cell_align_middle"]').click(this.setVerticalAlignment("middle")),
			a('*[data-menu-item-id="cell_align_bottom"]').click(this.setVerticalAlignment("bottom")))
	};
	e.prototype.initColumnWidthDialog = function () {
		function b() {
			for (var a = parseInt(k.val()), b = c.table_view, d = b.getSelectionBounds(), g = d.left; g <= d.right; ++g) b.setSingleColumnWidth(g, a);
			e.modal("hide")
		}

		var c = this, e = a("#column_width_dialog"), k = a('input[type="number"]', e);
		a('input[type="number"]', e).keydown(function (a) {
			13 == a.which && (a.preventDefault(), b())
		});
		a('input[type="submit"]', e).click(function (a) {
			a.preventDefault();
			b()
		})
	};
	e.prototype.show_column_width_dialog = function () {
		var b = a("#column_width_dialog");
		if (null != this.table_view.getSelectedCell()) {
			var c = this.table_view.getSelectionBounds();
			c = this.table_view.getColumnWidths()[c.left];
			a('input[type="number"]', b).val(c);
			b.modal("show")
		}
	};
	e.prototype.table_caption = function () {
		var b = function () {
			}, c = {on_caption_change: b, on_label_change: b, default_label: "tab:my-table", default_caption: ""}, e = !1,
			k = !1, f = a('<div id="table-caption-panel">');
		a("<label>").attr({"for": "table-caption"}).text("Table caption").appendTo(f);
		var m = a("<textarea>").attr({
			id: "table-caption",
			name: "table-caption",
			rows: 2,
			placeholder: "Enter table caption here",
			value: c.default_caption
		}).appendTo(f);
		a("<label>").attr({"for": "table-label"}).text("Label").appendTo(f);
		var t = a("<input>").attr({id: "table-label", name: "table-label", value: c.default_label}).appendTo(f),
			p = a("<span>").attr({"class": "muted"}).appendTo(f), r = function (a) {
				"" != a ? p.text(" Use \\ref{" + a + "} to refer to your table in LaTeX") : p.text("")
			};
		r(t.val());
		m.on("change", function () {
			if (!k) c.on_caption_change(m.val())
		});
		t.on("change", function () {
			c.set_label(t.val());
			var a = t.val();
			r(a);
			if (!k) c.on_label_change(a)
		});
		c.set_label = function (a) {
			a = (a || "").split("");
			for (var b = [], d = 0; d < a.length; ++d) {
				var e = a[d];
				null != e.match(/[a-zA-Z0-9_: -]/) && b.push(e)
			}
			a = b.join("") || c.default_label;
			k = !0;
			t.val(a);
			k = !1
		};
		c.set_caption = function (a) {
			k = !0;
			m.val(a);
			k = !1
		};
		c.show = function () {
			e || (a("#table_editor_expander").after(f), e = !0);
			f.show()
		};
		c.hide = function () {
			e && f.hide()
		};
		return c
	}();
	e.prototype.initTableShare = function () {
		function b(b) {
			a("#table-share-link-btn").hide();
			a("#share-table-error").text(b).show()
		}

		function c(c) {
			2E3 >= c.length ? (a("#table-share-data").val(c), c = a("#table-share-form").serialize(), a.ajax({
				url: "/table-share",
				type: "POST",
				data: c,
				success: function (c, d, e) {
					a("#table-share-link-btn").removeClass("btn-warning").addClass("btn-primary").hide();
					c.success && c.short_url ? (a("#share-table-link").attr("href", c.short_url).text(c.short_url), a("#share-table-result").show()) : b(c.error)
				},
				error: function (a, b, c) {
				}
			})) : b("We are sorry but only small tables can be shared")
		}

		var e = this.table_view;
		a("#share-table-btn").click(function () {
			a("#share-table-error").hide();
			a("#share-table-result").hide();
			a("#table-share-link-btn").removeClass("btn-warning").addClass("btn-primary").text("Get link to your table").show();
			a("#share_table_dialog").modal("show")
		});
		a("#table-share-link-btn").click(function () {
			a(this).removeClass("btn-info").addClass("btn-warning").text("Please wait...");
			var b = e.dump();
			CompressUtils.compress_str_64(JSON.stringify(b), c)
		});
		a("#share-table-link").click(function () {
			var b =
				a(this).attr("href");
			window.open(b, "_blank").focus()
		})
	};
	return e
}(jQuery, document);

function DB(a) {
	var m = window.localStorage || {};
	return {
		get: function () {
			return JSON.parse(m[a] || "{}")
		}, put: function (e) {
			m[a] = JSON.stringify(e)
		}
	}
}

function store_checkbox_state(a, m) {
	var e = DB(m);
	m = e.get();
	!0 !== m && !1 !== m || a.prop("checked", m);
	a.change(function () {
		var b = a.is(":checked");
		e.put(b)
	})
};var UnReDo = function () {
	function a(a) {
		var e = this;
		this.curr_state = null;
		this.undo_list = [];
		this.redo_list = [];
		this.table_view = a;
		this.ignore_next_change = !1;
		this.size_limit = 10;
		var b = null;
		a.on("state_change", function () {
			null != b && window.clearTimeout(b);
			b = setTimeout(function () {
				e.ignore_next_change || e.addChange();
				e.ignore_next_change = !1
			}, 600)
		})
	}

	a.prototype.addChange = function () {
		var a = this.table_view.dump();
		null == this.curr_state ? this.curr_state = a : (this.undo_list.length == this.size_limit && this.undo_list.splice(0,
			1), this.undo_list.push(this.curr_state), this.curr_state = a, this.redo_list.splice(0, this.redo_list.length))
	};
	a.prototype.undo = function () {
		0 != this.undo_list.length && (this.redo_list.push(this.curr_state), this.curr_state = this.undo_list.pop(), this.ignore_next_change = !0, this.table_view.load(this.curr_state))
	};
	a.prototype.redo = function () {
		0 != this.redo_list.length && (this.undo_list.push(this.curr_state), this.curr_state = this.redo_list.pop(), this.ignore_next_change = !0, this.table_view.load(this.curr_state))
	};
	a.prototype.clear =
		function () {
			this.undo_list.length = 0;
			this.redo_list.length = 0;
			this.curr_state = null
		};
	return a
}(), PersistenceHelper = function () {
	function a(a) {
		this.table_view = a;
		this.timeout = null;
		this.storage = DB("tg-table");
		this.enabled = !0
	}

	a.prototype.run = function () {
		null != this.timeout && window.clearInterval(this.timeout);
		this.save();
		var a = this;
		this.timeout = setInterval(function () {
			a.enabled && a.save()
		}, 4E3)
	};
	a.prototype.save = function () {
		var a = this.table_view.dump();
		this.storage.put(a)
	};
	a.load = function () {
		return DB("tg-table").get()
	};
	a.prototype.disable = function () {
		this.enabled = !1
	};
	a.prototype.enable = function () {
		this.enabled = !0
	};
	return a
}();
var HTMLExportOptions = {
	CENTERING: "Center table horizontally",
	ENABLE_SORT: "Enable table sorting",
	MAKE_RESPONSIVE: "Make table responsive",
	MAKE_FIRST_ROW_A_HEADER: "First row is a table header",
	STICKY_HEADER: "Keep header visible when scrolling the table"
}, HTMLExport = function () {
	function a(a) {
		for (var b = "", c = 0; c < a; c++) b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
		return b
	}

	function m(a, b) {
		var c = [], d = {}, e;
		for (e in a) {
			d.$jscomp$loop$prop$key$45 = e;
			if (a.hasOwnProperty(d.$jscomp$loop$prop$key$45) &&
				"_" != String(d.$jscomp$loop$prop$key$45).substr(0, 1)) {
				var f = a[d.$jscomp$loop$prop$key$45];
				Array.isArray(f) ? f.forEach(function (a) {
					return function (b) {
						c.push(a.$jscomp$loop$prop$key$45 + ":" + b)
					}
				}(d)) : c.push(d.$jscomp$loop$prop$key$45 + ":" + f)
			}
			d = {$jscomp$loop$prop$key$45: d.$jscomp$loop$prop$key$45}
		}
		c.sort();
		return b ? c.join(";") : Utils.join_strings(c, ";", {
			lines_separator: "\n  ",
			max_line_length: 120,
			prefix: "{",
			suffix: "}"
		})
	}

	function e(a) {
		if (null == a || "object" != typeof a) return a;
		if (a instanceof Date) {
			var b = new Date;
			b.setTime(a.getTime());
			return b
		}
		if (a instanceof Array) {
			b = [];
			for (var c = 0, d = a.length; c < d; c++) b[c] = e(a[c]);
			return b
		}
		if (a instanceof Object) {
			b = {};
			for (c in a) a.hasOwnProperty(c) && (b[c] = e(a[c]));
			return b
		}
		throw Error("Unable to copy obj! Its type isn't supported.");
	}

	function b(a, b) {
		var c = a.row_count, d = 1;
		a.forEachCellInRow(b, function (a) {
			c = Math.min(c, a.rowspan());
			d = Math.max(d, a.rowspan())
		});
		return [c, d]
	}

	function d(a, b) {
		for (var c = [], d = 0; d < b; ++d) c.push(a);
		return c
	}

	function c(a, b) {
		var c = "\n";
		a && (c += TableThemes.themeToStr(a,
			".tg") + "\n");
		for (var d in b) b.hasOwnProperty(d) && (c += d + b[d] + "\n");
		return c
	}

	function g(a) {
		return void 0 === a || a ? ".tg-sort-header::-moz-selection{background:0 0}.tg-sort-header::selection{background:0 0}.tg-sort-header{cursor:pointer}.tg-sort-header:after{content:'';float:right;margin-top:7px;border-width:0 5px 5px;border-style:solid;border-color:#404040 transparent;visibility:hidden}.tg-sort-header:hover:after{visibility:visible}.tg-sort-asc:after,.tg-sort-asc:hover:after,.tg-sort-desc:after{visibility:visible;opacity:.4}.tg-sort-desc:after{border-bottom:none;border-width:5px 5px 0}" :
			".tg-sort-header::-moz-selection{background:0 0}\n.tg-sort-header::selection{background:0 0}.tg-sort-header{cursor:pointer}\n.tg-sort-header:after{content:'';float:right;margin-top:7px;border-width:0 5px 5px;border-style:solid;\n  border-color:#404040 transparent;visibility:hidden}\n.tg-sort-header:hover:after{visibility:visible}\n.tg-sort-asc:after,.tg-sort-asc:hover:after,.tg-sort-desc:after{visibility:visible;opacity:.4}\n.tg-sort-desc:after{border-bottom:none;border-width:5px 5px 0}"
	}

	return function (k,
									 f, q, t, p) {
		q = q || !1;
		void 0 == t && (t = "\n");
		var r = k.model, u = "" == t ? 0 : 2, w = k.style_class || "", A = !f && w && -1 == w.indexOf("zerocss");
		f = {};
		var v = {}, B = {}, x = w ? e(TableThemes.getThemeById(w)) : null, y = k.getCellView(0, 0).style;
		x && y && (y = y.getPadding(), void 0 != y.top && (x.td.padding = y.top + "px " + y.left + "px", x.th.padding = y.top + "px " + y.left + "px"));
		var E = -1 != p.indexOf(HTMLExportOptions.STICKY_HEADER),
			O = -1 != p.indexOf(HTMLExportOptions.MAKE_FIRST_ROW_A_HEADER) || E;
		y = [];
		for (var X = 0; X < r.row_count; ++X) {
			var G = d(" ", 2 * u).join(""), T = [];
			r.forEachCellInRow(X, function (a, b) {
				if (a.isVisible()) {
					var c = 0 == X && O, d = {};
					1 == X % 2 && x && x.hasOwnProperty("_row_odd_td") && x._row_odd_td._active ? d = TableThemes.combineThemes([d, x._row_odd_td]) : 0 < X && 1 == b % 2 && x && x.hasOwnProperty("_col_even_td") && x._col_even_td._active && (d = TableThemes.combineThemes([d, x._col_even_td]));
					d = TableThemes.combineThemes([d, a.view.style.toCSS()]);
					c && E && (d.position = ["sticky", "-webkit-sticky"], d.top = "-1px", d["will-change"] = "transform");
					b = String;
					var e = JSON.stringify(d), f = 0;
					if (0 != e.length) {
						var g =
							0;
						for (var k = e.length; g < k; g++) {
							var p = e.charCodeAt(g);
							f = (f << 5) - f + p;
							f |= 0
						}
					}
					b = b(f);
					if (!v.hasOwnProperty(b)) {
						v[b] = d;
						e = Math.abs(b);
						e %= Math.pow(36, 4);
						f = "";
						for (g = 0; 4 > g; ++g) f += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[e % 36], e = Math.floor(e / 36);
						f = f.split("").reverse().join("");
						B[b] = "tg-" + f
					}
					e = {};
					A && !q && (e["class"] = B[b]);
					A && q && (d = TableThemes.combineThemes([x[c ? "th" : "td"], d]), e.style = m(d, !0));
					d = e;
					b = A;
					b = void 0 === b ? !0 : b;
					void 0 == d && (d = {});
					1 < a.colspan() && (d.colspan = a.colspan());
					1 < a.rowspan() &&
					(d.rowspan = a.rowspan());
					e = "";
					try {
						e = Markup.renderToString(a.value(), a.per_char_markup_ids_, b)
					} catch (ma) {
						e = textToHTML(a.value().toString())
					}
					a = Utils.format_tag(c ? "th" : "td", e, d);
					T.push(G + a)
				}
			});
			G = d(" ", u).join("");
			y.push([].concat([G + "<tr>"], T, [G + "</tr>"]).join(t))
		}
		u = O && 0 < y.length;
		r = $jscomp.makeIterator(b(r, 0));
		r.next();
		var M = r.next().value;
		r = u ? 0 : -1;
		M = u ? M - 1 : -1;
		u && (y[r] = "<thead>" + t + y[r], y[M] += t + "</thead>");
		y.length > M + 1 && (r = M + 1, y[r] = "<tbody>" + t + y[r], y[y.length - 1] += t + "</tbody>");
		var Q = -1 != p.indexOf(HTMLExportOptions.CENTERING);
		r = -1 != p.indexOf(HTMLExportOptions.MAKE_RESPONSIVE);
		p = -1 != p.indexOf(HTMLExportOptions.ENABLE_SORT);
		x && Q && (x[" "].margin = "0px auto");
		u = "";
		M = y.join(t);
		y = [""];
		var K = {};
		p && (K.id = "tg-" + a(5));
		if (A) {
			if (q) K.style = m(x[" "], !0), K["class"] = "tg"; else {
				for (var da in v) v.hasOwnProperty(da) && (u = m(v[da]), "{}" != u && (f[".tg ." + B[da]] = u));
				K["class"] = "tg";
				w = w.split("-");
				w = w[w.length - 1];
				u = c(x, f)
			}
			p && (u += g(q));
			r && (u += "@media screen and (max-width: 767px) {.tg {width: auto !important;}.tg col {width: auto !important;}.tg-wrap {overflow-x: auto;-webkit-overflow-scrolling: touch;" +
				(Q ? "margin: auto 0px;" : "") + "}}");
			"" != u && (u = Utils.format_tag("style", u, {type: "text/css"}))
		}
		if (k.hasFixedLayout()) {
			k = k.getColumnWidths();
			w = [];
			for (X = f = 0; X < k.length; ++X) k[X] += 1, w.push('<col style="width: ' + k[X] + 'px">'), f += k[X];
			y.push("<colgroup>");
			y.push(w.join(t));
			y.push("</colgroup>");
			K.style += ";table-layout: fixed; width: " + f.toFixed(0) + "px"
		}
		y.push(M);
		y.push("");
		k = Utils.format_tag("table", y.join(t), K);
		r && (k = Utils.format_tag("div", k, {"class": "tg-wrap"}));
		y = [];
		u && y.push(u);
		y.push(k);
		p && y.push('<script charset="utf-8">var TGSort=window.TGSort||function(n){"use strict";function r(n){return n?n.length:0}function t(n,t,e,o=0){for(e=r(n);o<e;++o)t(n[o],o)}function e(n){return n.split("").reverse().join("")}function o(n){var e=n[0];return t(n,function(n){for(;!n.startsWith(e);)e=e.substring(0,r(e)-1)}),r(e)}function u(n,r,e=[]){return t(n,function(n){r(n)&&e.push(n)}),e}var a=parseFloat;function i(n,r){return function(t){var e="";return t.replace(n,function(n,t,o){return e=t.replace(r,"")+"."+(o||"").substring(1)}),a(e)}}var s=i(/^(?:\\s*)([+-]?(?:\\d+)(?:,\\d{3})*)(\\.\\d*)?$/g,/,/g),c=i(/^(?:\\s*)([+-]?(?:\\d+)(?:\\.\\d{3})*)(,\\d*)?$/g,/\\./g);function f(n){var t=a(n);return!isNaN(t)&&r(""+t)+1>=r(n)?t:NaN}function d(n){var e=[],o=n;return t([f,s,c],function(u){var a=[],i=[];t(n,function(n,r){r=u(n),a.push(r),r||i.push(n)}),r(i)<r(o)&&(o=i,e=a)}),r(u(o,function(n){return n==o[0]}))==r(o)?e:[]}function v(n){if("TABLE"==n.nodeName){for(var a=function(r){var e,o,u=[],a=[];return function n(r,e){e(r),t(r.childNodes,function(r){n(r,e)})}(n,function(n){"TR"==(o=n.nodeName)?(e=[],u.push(e),a.push(n)):"TD"!=o&&"TH"!=o||e.push(n)}),[u,a]}(),i=a[0],s=a[1],c=r(i),f=c>1&&r(i[0])<r(i[1])?1:0,v=f+1,p=i[f],h=r(p),l=[],g=[],N=[],m=v;m<c;++m){for(var T=0;T<h;++T){r(g)<h&&g.push([]);var C=i[m][T],L=C.textContent||C.innerText||"";g[T].push(L.trim())}N.push(m-v)}t(p,function(n,t){l[t]=0;var a=n.classList;a.add("tg-sort-header"),n.addEventListener("click",function(){var n=l[t];!function(){for(var n=0;n<h;++n){var r=p[n].classList;r.remove("tg-sort-asc"),r.remove("tg-sort-desc"),l[n]=0}}(),(n=1==n?-1:+!n)&&a.add(n>0?"tg-sort-asc":"tg-sort-desc"),l[t]=n;var i,f=g[t],m=function(r,t){return n*f[r].localeCompare(f[t])||n*(r-t)},T=function(n){var t=d(n);if(!r(t)){var u=o(n),a=o(n.map(e));t=d(n.map(function(n){return n.substring(u,r(n)-a)}))}return t}(f);(r(T)||r(T=r(u(i=f.map(Date.parse),isNaN))?[]:i))&&(m=function(r,t){var e=T[r],o=T[t],u=isNaN(e),a=isNaN(o);return u&&a?0:u?-n:a?n:e>o?n:e<o?-n:n*(r-t)});var C,L=N.slice();L.sort(m);for(var E=v;E<c;++E)(C=s[E].parentNode).removeChild(s[E]);for(E=v;E<c;++E)C.appendChild(s[v+L[E-v]])})})}}n.addEventListener("DOMContentLoaded",function(){for(var t=n.getElementsByClassName("tg"),e=0;e<r(t);++e)try{v(t[e])}catch(n){}})}(document)\x3c/script>');
		return y.join(t)
	}
}();
var LaTeXExportOptions = {
	CAPTION_ABOVE: "Caption above",
	CAPTION_BELOW: "Caption below",
	CENTERING: "Center table horizontally",
	SCALE_TABLE: "Scale table to text width",
	LANDSCAPE_MODE: "Rotate table (landscape mode)",
	SPLIT_LONG_TABLE: "Split table in multiple pages",
	LONG_TABLE_REPEAT_HEADER: "Repeat header (top rows) on every page",
	LONG_TABLE_CONTINUED_HEADER: "Add table continuation header"
}, LaTeXExport = function () {
	function a(a, b) {
		if (!a) throw b || "Assertion failed";
	}

	function m(a, b) {
		var c = a.get_option("table_caption");
		a = a.get_option("table_label");
		b && (c = t(c));
		return ["\\caption{" + c + "}", "\\label{" + a + "}"]
	}

	function e(a, b) {
		a = m(a, b);
		a[1] += "\\\\";
		return a
	}

	function b(a, b) {
		for (var c = !1, d = 0; d < b.length && !c; ++d) b[d].val == a && (b[d].count += 1, c = !0);
		c || b.push({val: a, count: 1})
	}

	function d(a) {
		this.table_view = a;
		for (var b = this.table = a.model, c = p(function () {
			return p(0, b.col_count + 1)
		}, b.row_count), d = 0; d < b.row_count; ++d) for (var e = 0; e < b.col_count; ++e) {
			var f = b.getCell(d, e, !0);
			if (f.isVisible()) {
				var g = a.getCellView(d, e, !0).style, k = g.hasBorder("left");
				g = g.hasBorder("right");
				for (var m = 0; m < f.rowspan(); ++m) for (var q = d + m, r = 0; r < f.colspan(); ++r) {
					var v = e + r;
					c[q][v] |= k;
					c[q][v + 1] |= g
				}
			}
		}
		for (d = 0; d < b.row_count; ++d) for (e = 1; e < b.col_count; ++e) 0 < c[d][e - 1] && 0 < c[d][e] && (c[d][e] = 2);
		a = [];
		for (e = 0; e <= b.col_count; ++e) {
			f = !0;
			for (d = 0; d < b.row_count; ++d) f &= 0 < c[d][e];
			a.push(f)
		}
		this.vlines = c;
		this.continuous_vlines = a
	}

	function c(a) {
		this.table_view = a;
		this.table = a.model;
		this.colors_used = !1;
		var c = this.table, d = [], e = p(function () {
			return p(null, c.col_count)
		}, c.row_count);
		this.fg_colors =
			e;
		for (var f = 0; f < c.row_count; ++f) {
			for (var g = [], k = 0; k < c.col_count; ++k) {
				var m = a.getCellView(f, k, !1).style;
				m.hasBgColor() ? (g.push(m.getBgColor()), this.colors_used = !0) : g.push(null);
				m.hasTextColor() && (e[f][k] = m.getTextColor(), this.colors_used = !0)
			}
			d.push(g)
		}
		g = [];
		for (k = 0; k < c.col_count; ++k) {
			a = [];
			for (f = 0; f < c.row_count; ++f) b(d[f][k], a);
			e = null;
			m = !1;
			for (var q = 0; q < a.length; ++q) {
				var r = a[q];
				null == e ? e = r : r.count > e.count && (e = r);
				null == r.val && (m = !0)
			}
			g.push(null);
			!m && null != e && e.count >= c.row_count / 2 && (g[k] = e.val)
		}
		this.column_colors =
			g;
		g = [];
		for (f = 0; f < c.row_count; ++f) {
			a = [];
			for (k = 0; k < c.col_count; ++k) b(d[f][k], a);
			e = null;
			m = !1;
			for (q = 0; q < a.length; ++q) r = a[q], null == e ? e = r : r.count > e.count && (e = r), null == r.val && (m = !0);
			g.push(null);
			!m && null != e && e.count >= c.col_count / 2 && (g[f] = e.val)
		}
		this.row_colors = g;
		for (f = a = g = 0; f < c.row_count; ++f) for (k = 0; k < c.col_count; ++k) e = this.table.getCell(f, k), e = 1 < e.rowspan() || 1 < e.colspan(), (null == this.column_colors[k] || e || d[f][k] != this.column_colors[k]) && ++g, (null == this.row_colors[f] || e || d[f][k] != this.row_colors[f]) && ++a;
		if (a < g) for (k = 0; k < c.col_count; ++k) this.column_colors[k] = null; else for (f = 0; f < c.row_count; ++f) this.row_colors[f] = null
	}

	function g(a) {
		var b = 1;
		a.forEachCellInRow(0, function (c, d) {
			c = a.getCellView(0, d, !0);
			b = Math.max(b, c.cell.rowspan())
		});
		return Math.min(3, b)
	}

	function k(a, b, c) {
		var d = [], e = x.getColumnsVLines();
		b.forEach(function (a, b) {
			d.push(e[b]);
			d.push(c.addColumnColor(a[0], b))
		});
		d.push(e[e.length - 1]);
		return d.join("")
	}

	function f(a) {
		for (var b = [], c = 0, d = a.model.col_count; c < d; ++c) b.push(q(a, c));
		return b
	}

	function q(a,
						 b) {
		var c = {left: 0, center: 0, right: 0};
		a.forEachCellInColumn(b, function (a) {
			a.cell.isVisible() && (c[a.style.getHorizontalAlign()] += Math.max(0, a.cell.rowspan()))
		});
		return ["left", "center", "right"].sort(function (a, b) {
			return -(c[a] - c[b])
		})[0]
	}

	function t(a) {
		var b = /(?:(^|[^\\]))((?:\$[^\$]*?[^\\]\$)|(?:\$\$))/g, c = /(?:(^|[^\\]))(\\[(].*?[^\\]\\[)])/g;
		a = (a || "").split(/(?:(^|[^\\]))((?:\$[^\$]*?[^\\]\$)|(?:\$\$)|(?:\\[(].*?[^\\]\\[)]))/g);
		return $.map(a, function (a) {
			return 0 < a.length && (null !== a.match(b) || null !== a.match(c)) ?
				a : a.replace(/(\\?[&%_#\{\}\$\\\[\]<>\^~])(\s|$)?/g, function (a, b, c) {
					a = c;
					void 0 === a && (a = "{}", c = "");
					return "&" == b || "%" == b || "_" == b || "#" == b || "{" == b || "}" == b || "$" == b ? "\\" + b + c : "[" == b || "]" == b ? "{" + b + "}" + c : "\\" == b ? "\\textbackslash" + a : "\\\\" == b ? "\\textbackslash{}\\textbackslash" + a : "<" == b ? "\\textless" + a : "\\<" == b ? "\\textbackslash{}\\textless" + a : ">" == b ? "\\textgreater" + a : "\\>" == b ? "\\textbackslash{}\\textgreater" + a : "~" == b ? "$\\sim$" : "\\~" == b ? "\\textbackslash{}$\\sim$" : "^" == b ? "\\textasciicircum" + a : "\\^" == b ? "\\textbackslash{}\\textasciicircum" +
						a : b + c
				})
		}).join("")
	}

	function p(a, b) {
		var c = [];
		if ("function" == typeof a) for (var d = 0; d < b; ++d) c.push(a()); else for (d = 0; d < b; ++d) c.push(a);
		return c
	}

	function r(a, b, c) {
		for (var d = c[b], e = 1; e < a.colspan(); ++e) d += c[b + e];
		return d
	}

	function u(a, b, c) {
		var d = p(0, a.col_count), e = [];
		c = c || [];
		for (var f = {}, g = 0; g < a.row_count; f = {
			$jscomp$loop$prop$row_cells_width$47: f.$jscomp$loop$prop$row_cells_width$47,
			$jscomp$loop$prop$row_strings$48: f.$jscomp$loop$prop$row_strings$48,
			$jscomp$loop$prop$cell_index$49: f.$jscomp$loop$prop$cell_index$49
		},
			++g) if (f.$jscomp$loop$prop$row_cells_width$47 = p(0, a.col_count), e.push(f.$jscomp$loop$prop$row_cells_width$47), -1 == c.indexOf(g)) {
			f.$jscomp$loop$prop$row_strings$48 = b[g];
			f.$jscomp$loop$prop$cell_index$49 = 0;
			a.forEachCellInRow(g, function (a) {
				return function (b, c) {
					b = b.colspan();
					1 == b && (a.$jscomp$loop$prop$row_cells_width$47[c] = a.$jscomp$loop$prop$row_strings$48[a.$jscomp$loop$prop$cell_index$49].length);
					1 <= b && ++a.$jscomp$loop$prop$cell_index$49
				}
			}(f));
			for (var k = 0; k < f.$jscomp$loop$prop$row_cells_width$47.length; ++k) d[k] =
				Math.max(d[k], f.$jscomp$loop$prop$row_cells_width$47[k])
		}
		for (f = {$jscomp$loop$prop$r$32$51: 0}; f.$jscomp$loop$prop$r$32$51 < a.row_count; f = {
			$jscomp$loop$prop$r$32$51: f.$jscomp$loop$prop$r$32$51,
			$jscomp$loop$prop$cell_index$33$52: f.$jscomp$loop$prop$cell_index$33$52
		}, ++f.$jscomp$loop$prop$r$32$51) -1 == c.indexOf(f.$jscomp$loop$prop$r$32$51) && (f.$jscomp$loop$prop$cell_index$33$52 = 0, a.forEachCellInRow(f.$jscomp$loop$prop$r$32$51, function (a) {
			return function (c, f) {
				var g = c.colspan();
				if (1 < g) {
					var k = b[a.$jscomp$loop$prop$r$32$51][a.$jscomp$loop$prop$cell_index$33$52];
					[d, e[a.$jscomp$loop$prop$r$32$51]].forEach(function (a) {
						var b = k.length - r(c, f, a);
						b -= (g - 1) * E;
						if (0 < b) {
							var d = Math.floor(b / g);
							b %= g;
							for (var e = 0; e < g; ++e) a[f + e] += d, 0 < b && (a[f + e] += 1, --b)
						}
					})
				}
				1 <= g && a.$jscomp$loop$prop$cell_index$33$52++
			}
		}(f)));
		return {col_widths: d, per_row_col_widths: e}
	}

	function w(a) {
		var b = a.length;
		if (4 > b) return {narrow_rows: O(0, b), wide_rows: []};
		a = a.map(X);
		if (80 > Math.max.apply(Math, $jscomp.arrayFromIterable(a))) return {narrow_rows: O(0, b), wide_rows: []};
		var c = a.slice(0);
		c.sort(function (a, b) {
			return a -
				b
		});
		for (var d = c[b - 1], e = b - 1, f = b * d * d, g = b - 2; 0 <= g; --g) {
			var k = c[g];
			k = (g + 1) * k * k + (b - (g + 1)) * d * d;
			if (k < f) e = g, f = k; else break
		}
		b = c[e];
		c = [];
		d = [];
		for (e = 0; e < a.length; ++e) a[e] <= b ? c.push(e) : d.push(e);
		return {narrow_rows: c, wide_rows: d}
	}

	function A(a, b, c) {
		var d = null;
		if (c) {
			c = u(b, a).per_row_col_widths;
			c = w(c);
			var e = c.narrow_rows, f = c.wide_rows, g = u(b, a, f).col_widths, k = u(b, a, e).col_widths;
			d = function (a, b, c) {
				a = -1 !== f.indexOf(a) ? k : g;
				return r(c, b, a) + Math.max(0, c.colspan() - 1) * E
			}
		} else {
			var m = u(b, a).col_widths;
			d = function (a, b, c) {
				return r(c,
					b, m) + Math.max(0, c.colspan() - 1) * E
			}
		}
		return a.map(function (a, c) {
			var e = 0, f = [];
			b.forEachCellInRow(c, function (b, g) {
				1 <= b.colspan() && (b = d(c, g, b), f.push(G(a[e], b)), ++e)
			});
			return f
		})
	}

	function v(a, b, c, d) {
		if (-1 == a.indexOf(!1)) return b ? 0 == c ? " \\toprule" : c == d ? " \\bottomrule" : " \\midrule" : " \\hline";
		c = "";
		d = 0;
		for (var e = !1, f = b ? "\\cmidrule" : "\\cline", g = "", k = 0; k < a.length; ++k) !e && a[k] ? (d = k, e = !0, b && 0 < d && (g += "l")) : e && !a[k] && (b && k < a.length && (g += "r", g = "(" + g + ")"), c += " " + f + g + "{" + (d + 1) + "-" + k + "}", e = !1, g = "");
		e && (b && (g = "(" + g +
			")"), c += " " + f + g + "{" + (d + 1) + "-" + a.length + "} ");
		return c
	}

	d.prototype = {
		cellNeedsLeftBorder: function (a, b, c) {
			return 1 == this.vlines[a][b] && 0 == b && (0 == this.continuous_vlines[b] || c)
		}, cellNeedsRightBorder: function (a, b, c) {
			return 0 < this.vlines[a][b + 1] && (0 == this.continuous_vlines[b + 1] || c)
		}, getColumnsVLines: function () {
			return this.continuous_vlines.map(function (a) {
				return 1 == a ? "|" : ""
			})
		}
	};
	c.prototype = {
		addCellColorCode: function (a, b, c, d) {
			var e = this.table.getCell(b, c);
			if (e.isVisible()) {
				var f = this.fg_colors[b][c];
				f && (a =
					"{\\color" + this.genLaTeXColor(f) + " " + a + "}");
				e = 1 < e.rowspan() || 1 < e.colspan();
				f = this.table_view.getCellView(b, c, !0).style;
				f = f.hasBgColor() ? f.getBgColor() : null;
				c = this.column_colors[c];
				b = this.row_colors[b];
				f && (f != c && f != b || e) ? a = "\\cellcolor" + this.genLaTeXColor(f) + a : d && (f || c) && (a = "\\cellcolor" + this.genLaTeXColor(f || c) + a);
				return a
			}
		}, RGBColorRegex: /rgba?\(([\d\s,]+)\)/i, genLaTeXColor: function (b) {
			a(b);
			var c = function (a) {
				a = Number(a).toString(16);
				return 1 == a.length ? "0" + a : a
			};
			b = String(b);
			var d = null;
			"#" == b.substr(0,
				1) ? b = b.substr(1).toUpperCase() : null != (d = b.match(this.RGBColorRegex)) && (d = d[1].split(/\s*,\s*/), 3 <= d.length && (b = c(d[0]) + c(d[1]) + c(d[2])));
			return "[HTML]{" + b.toUpperCase() + "}"
		}, addColumnColor: function (b, c) {
			a(0 <= c && c < this.table.col_count);
			var d = b;
			(c = this.column_colors[c]) && (d = "\n>{\\columncolor" + this.genLaTeXColor(c) + "}" + b + " ");
			return d
		}, addRowColor: function (b, c) {
			a(0 <= c && c < this.table.row_count);
			var d = b;
			(c = this.row_colors[c]) && (d = "\\rowcolor" + this.genLaTeXColor(c) + " " + b);
			return d
		}, areColorsUsed: function () {
			return this.colors_used
		}
	};
	var B = null, x = null, y = function (a, b) {
		b |= 0;
		var c = a.join(" & ");
		return b && c.length > b ? a.map(function (a, b) {
			a = a.trim();
			return 0 == b ? a : "  " + a
		}).join(" &\n") : c
	}, E = 3, O = function (a, b) {
		for (var c = []; a < b; ++a) c.push(a);
		return c
	}, X = function (a) {
		return a.reduce(function (a, b) {
			return a + b
		}, 0)
	}, G = function (a, b) {
		return a + " ".repeat(Math.max(0, b - a.length))
	};
	return function (a, b, p, q, r, w) {
		b = b || !1;
		p = p || !1;
		q = q || !1;
		w = w || [];
		r = r || !1;
		var u = [], E = a.model, C = [], O = 0, G = [], K = f(a);
		B = new c(a);
		x = new d(a);
		for (var M = 0; M < E.row_count; ++M) {
			var Q = [],
				X = [], T = M == E.row_count - 1;
			E.forEachCellInRow(M, function (b, c) {
				var d = M, e = p;
				if (0 > b.colspan()) b = null; else {
					var f = b.rowspan(), h = 1 < f, g = !0;
					if (1 != b.rowspan()) if (g = !1, B.areColorsUsed()) if (1 < b.rowspan()) h = !1; else {
						var k = a.model.getCell(d, c);
						k.rowspan() == -b.rowspan() + 1 && (h = g = !0, f = -k.rowspan());
						d += b.rowspan();
						b = k
					} else 1 < b.rowspan() ? g = !0 : (k = a.model.getCell(d, c), d += b.rowspan(), b = k);
					k = a.getCellView(d, c, !0).style.getHorizontalAlign();
					var m = "";
					if (g) {
						m = b.isVisible() ? b.value().toString() : "";
						m = m.trim();
						e && (m = t(m));
						if (e =
							-1 != m.indexOf("\n")) g = k, m = m.split(/\n/g), g = g ? g[0] : "c", m = "\\begin{tabular}[c]{@{}" + g + "@{}}" + m.join("\\\\ ") + "\\end{tabular}";
						g = a.getCellView(d, c).style;
						var n = [];
						g.hasFontStyle("bold") && (m = "\\textbf{" + m + "}");
						g.hasFontStyle("italic") && (m = "\\textit{" + m + "}");
						!e && g.hasFontStyle("underline") && n.push("\\ul");
						1 <= n.length && (m = "{" + n.join(" ") + " " + m + "}")
					}
					e = d;
					g = a.model;
					0 > e || e >= g.row_count || 0 > c || c >= g.col_count ? e = !1 : (g = g.getCell(e, c, !0), n = a.getCellView(e, c).style.getHorizontalAlign(), e = 1 < g.colspan() || x.cellNeedsLeftBorder(e,
						c, !1) || x.cellNeedsRightBorder(e, c, !1) || n != K[c]);
					m = B.addCellColorCode(m, d, c, e);
					m.match(/^\s+$/) && (m = "~");
					h && (m = "\\multirow{" + f + "}{*}{" + m + "}");
					e ? (k = k[0], x.cellNeedsLeftBorder(d, c, !0) && (k = "|" + k), x.cellNeedsRightBorder(d, c, !0) && (k += "|"), m = "\\multicolumn{" + Math.max(1, b.colspan()) + "}{" + k + "}{" + m + "}") : 0 > b.rowspan() && (m = "");
					b = m
				}
				null != b && Q.push(b);
				X.push(a.hasBorder(M, c, "top"));
				T && G.push(a.hasBorder(M, c, "bottom"))
			});
			u.push(Q);
			var J = v(X, b, M, E.row_count);
			C.push(J);
			0 < J.length && ++O;
			T && (J = v(G, b, M + 1, E.row_count),
				C.push(J))
		}
		var U = k(a, K, B), N = [];
		-1 != w.indexOf(LaTeXExportOptions.LANDSCAPE_MODE) && N.push("\\begin{landscape}");
		var da = -1 != w.indexOf(LaTeXExportOptions.CENTERING);
		J = -1 != w.indexOf(LaTeXExportOptions.SPLIT_LONG_TABLE);
		var S = !J && -1 != w.indexOf(LaTeXExportOptions.SCALE_TABLE),
			pa = -1 != w.indexOf(LaTeXExportOptions.CAPTION_BELOW), ia = -1 != w.indexOf(LaTeXExportOptions.CAPTION_ABOVE),
			Y = J && -1 != w.indexOf(LaTeXExportOptions.LONG_TABLE_REPEAT_HEADER),
			n = J && -1 != w.indexOf(LaTeXExportOptions.LONG_TABLE_CONTINUED_HEADER);
		J || (N.push("\\begin{table}[]"), da && N.push("\\centering"), ia && (N = N.concat(m(a, p))));
		b && (U = "@{}" + U + "@{}");
		S && N.push("\\resizebox{\\textwidth}{!}{%");
		if (J) {
			var W = "\\begin{longtable}";
			da && (W += "[c]");
			N.push(W + ("{" + U + "}"));
			ia && (N = N.concat(e(a, p)))
		} else N.push("\\begin{tabular}{" + U + "}");
		var V = [], D = [], h = g(a);
		0 < C[0].length && D.push($.trim(C[0]));
		if (!q || r) u = A(u, E, r);
		u.forEach(function (a, b) {
			var c = b < h ? D : V;
			a = y(a, r ? 170 : 0);
			if (b + 1 < E.row_count || 0 != $.trim(C[b + 1]).length) a += " \\\\";
			var d = B.addRowColor("", b);
			0 < d.length &&
			c.push(d);
			a += C[b + 1];
			c.push(a)
		});
		J ? (N = N.concat(D), n ? (N.push("\\endfirsthead"), N.push("%"), N.push("\\multicolumn{" + E.col_count + "}{c}%"), N.push("{{\\bfseries Table \\thetable\\ continued from previous page}} \\\\"), Y && (N = N.concat(D))) : Y || (N.push("\\endfirsthead"), N.push("%")), N.push("\\endhead"), N.push("%"), q = v(G, b, E.row_count, E.row_count), !(2 * O > E.row_count) && 0 < q.length && (N.push(q.trim()), N.push("\\endfoot"), N.push("%"), N.push("\\endlastfoot"), N.push("%")), N = N.concat(V), pa && (N = N.concat(e(a, p))), N.push("\\end{longtable}")) :
			(N = N.concat(D), N = N.concat(V), N.push("\\end{tabular}"), S && (N[N.length - 1] += "%", N.push("}")), pa && (N = N.concat(m(a, p))), N.push("\\end{table}"));
		-1 != w.indexOf(LaTeXExportOptions.LANDSCAPE_MODE) && N.push("\\end{landscape}");
		O = N.join("\n");
		q = [];
		b && q.push("% \\usepackage{booktabs}");
		-1 != O.search("\\multirow") && q.push("% \\usepackage{multirow}");
		S && q.push("% \\usepackage{graphicx}");
		B.areColorsUsed() && (q.push("% \\usepackage[table,xcdraw]{xcolor}"), q.push('% If you use beamer only pass "xcolor=table" option, i.e. \\documentclass[xcolor=table]{beamer}'));
		-1 != O.search("\\ul ") && (q.push("% \\usepackage[normalem]{ulem}"), q.push("% \\useunder{\\uline}{\\ul}{}"));
		-1 != w.indexOf(LaTeXExportOptions.LANDSCAPE_MODE) && q.push("% \\usepackage{lscape}");
		J && (q.push("% \\usepackage{longtable}"), q.push("% Note: It may be necessary to compile the document several times to get a multi-page table to line up properly"));
		0 < q.length && (O = "% Please add the following required packages to your document preamble:\n" + q.join("\n") + "\n" + O);
		J && b && (O = O.replace(/\\\\ \\(midrule|cmidrule|bottomrule|toprule)/g,
			"\\\\* \\$1"));
		return O
	}
}();
var TextExport = function () {
	function a(a, b, c) {
		b = [];
		for (var d = 0; d < a.row_count + 1; ++d) b.push(g(c.EMPTY, a.col_count + 1));
		for (d = 0; d < a.row_count; ++d) for (var e = 0; e < a.col_count; ++e) {
			var f = a.getCell(d, e, !0), k = f.rowspan();
			f = f.colspan();
			if (!(1 > f || 1 > k)) {
				for (var m = 1; m < k; ++m) b[d + m][e] = u(c, b[d + m][e], c.VERTICAL), b[d + m][e + f] = u(c, b[d + m][e + f], c.VERTICAL);
				b[d][e] = u(c, b[d][e], c.TOP_LEFT);
				b[d][e + f] = u(c, b[d][e + f], c.TOP_RIGHT);
				b[d + k][e] = u(c, b[d + k][e], c.BOTTOM_LEFT);
				b[d + k][e + f] = u(c, b[d + k][e + f], c.BOTTOM_RIGHT)
			}
		}
		return b
	}

	function m(a,
						 b, c) {
		for (var d = 0; d < a.row_count; ++d) for (var e = 0; e < a.col_count; ++e) {
			var f = a.getCell(d, e, !0), k = f.rowspan();
			if (!(1 > f.colspan() || 1 > k)) {
				var m = b.getCellView(d, e).style.getVerticalAlign();
				if ("top" != m) {
					f = [];
					for (var p = 0; p < k; ++p) for (var q = c[d + p], r = 0; r < q.length; ++r) f.push(q[r][e]);
					q = f.length - 1;
					for (p = f.pop(); 0 < f.length && "" == f[f.length - 1];) f.pop();
					for (; 0 < f.length && "" == f[0];) f.shift();
					"bottom" == m ? (f = g("", q - f.length).concat(f), f.push(p)) : "middle" == m && (q -= f.length, m = Math.ceil(q / 2), q = g("", Math.floor(q / 2)), m = g("", m),
						f = q.concat(f).concat(m), f.push(p));
					for (m = p = 0; p < k; ++p) for (q = c[d + p], r = 0; r < q.length && m < f.length; ++r, ++m) q[r][e] = f[m]
				}
			}
		}
	}

	function e(a, b, c) {
		for (var d = c[b], e = 1; e < a.colspan(); ++e) d += c[b + e];
		return d += a.colspan() - 1
	}

	function b(a, b, c, e, f, k) {
		for (var m = 0 == b, p = e[b] + 1, q = [], r = 0; r < p; ++r) {
			var t = g("", c.length);
			q.push(t)
		}
		a.forEachCellInRow(b, function (r, t) {
			var w = !1, v = r.rowspan(), u = r.colspan();
			if (r.isVisible()) w = 1 == v, d(r).forEach(function (a, b) {
				b >= p || (q[b][t] = a)
			}); else if (0 < u && 0 > v) {
				var A = a.getCell(b, t), x = d(A), y = 0;
				for (r =
							 0; r < -v; ++r) y += e[b - (r + 1)] + 1;
				var B = Math.min(x.length, y + p);
				for (r = y; r < B; ++r) q[r - y][t] = x[r];
				A.rowspan() == -v + 1 && (w = !0)
			}
			if (w) {
				w = "";
				v = m ? f.HORIZONTAL_HEADER : f.HORIZONTAL;
				for (r = 0; r < u; ++r) 0 < r && (A = k[b + 1][t + r], " " == A && (A = v), w += A), w += g(v, c[t + r]).join("");
				q[p - 1][t] = w
			}
		});
		return q
	}

	function d(a) {
		a = a.value().toString();
		a = a.replace(/&nbsp;/ig, " ").replace(/\n$/, "");
		var b = [];
		a.split("\n").forEach(function (a) {
			b.push(" " + a + " ")
		});
		return b
	}

	function c(a) {
		var b = 0;
		d(a).forEach(function (a) {
			b = Math.max(b, wcwidth(a))
		});
		return b
	}

	function g(a, b) {
		for (var c = [], d = 0; d < b; ++d) c.push(a);
		return c
	}

	function k(a) {
		for (var b = g(0, a.col_count), d = 0; d < a.row_count; ++d) a.forEachCellInRow(d, function (a, d) {
			1 == a.colspan() && (a = c(a), b[d] = Math.max(b[d], a))
		});
		for (d = 0; d < a.row_count; ++d) a.forEachCellInRow(d, function (a, d) {
			if (!(1 >= a.colspan())) {
				var f = c(a) - e(a, d, b);
				if (0 < f) {
					var g = Math.floor(f / a.colspan());
					f %= a.colspan();
					for (var k = 0; k < a.colspan(); ++k) b[d + k] += g, 0 < f && (b[d + k] += 1, --f)
				}
			}
		});
		return b
	}

	function f(a) {
		for (var b = [], c = 0; c < a.row_count; ++c) {
			var e = 0;
			a.forEachCellInRow(c,
				function (a) {
					1 == a.rowspan() && (e = Math.max(e, d(a).length))
				});
			b.push(e)
		}
		for (c = 0; c < a.row_count; ++c) a.forEachCellInRow(c, function (a) {
			if (!(1 >= a.rowspan())) {
				for (var e = d(a).length, f = 0, g = 0; g < a.rowspan(); ++g) f += b[c + g];
				f += a.rowspan() - 1;
				g = e - f;
				if (0 < g) for (e = Math.floor(g / a.rowspan()), f = g % a.rowspan(), g = 0; g < a.rowspan(); ++g) b[c + g] += e, 0 < f && (b[c + g] += 1, --f)
			}
		});
		return b
	}

	function q(a, b, c) {
		"left" == c ? (c = wcwidth(a), c < b && (a += g(" ", b - c).join(""))) : "right" == c ? (c = wcwidth(a), c < b && (a = g(" ", b - c).join("") + a)) : "center" == c && (c = wcwidth(a),
			b -= c, 0 < b && (c = Math.floor(b / 2), a = g(" ", Math.floor(b / 2) + b % 2).join("") + a + g(" ", c).join("")));
		return a
	}

	var t = {
			EMPTY: " ",
			TOP_LEFT: "+",
			TOP_MIDDLE: "+",
			TOP_RIGHT: "+",
			MIDDLE: "+",
			MIDDLE_RIGHT: "+",
			MIDDLE_LEFT: "+",
			HORIZONTAL: "-",
			HORIZONTAL_HEADER: "-",
			VERTICAL: "|",
			BOTTOM_LEFT: "+",
			BOTTOM_MIDDLE: "+",
			BOTTOM_RIGHT: "+"
		}, p = {
			EMPTY: " ",
			TOP_LEFT: "+",
			TOP_MIDDLE: "+",
			TOP_RIGHT: "+",
			MIDDLE: "+",
			MIDDLE_RIGHT: "+",
			MIDDLE_LEFT: "+",
			HORIZONTAL: "-",
			HORIZONTAL_HEADER: "=",
			VERTICAL: "|",
			BOTTOM_LEFT: "+",
			BOTTOM_MIDDLE: "+",
			BOTTOM_RIGHT: "+"
		},
		r = {
			EMPTY: " ",
			TOP_LEFT: "\u2554",
			TOP_MIDDLE: "\u2566",
			TOP_RIGHT: "\u2557",
			MIDDLE: "\u256c",
			MIDDLE_RIGHT: "\u2563",
			MIDDLE_LEFT: "\u2560",
			HORIZONTAL: "\u2550",
			HORIZONTAL_HEADER: "\u2550",
			VERTICAL: "\u2551",
			BOTTOM_LEFT: "\u255a",
			BOTTOM_MIDDLE: "\u2569",
			BOTTOM_RIGHT: "\u255d"
		}, u = function () {
			var a = null, b = null;
			return function (c, d, e) {
				b !== c && (b = c, a = {}, a[b.TOP_RIGHT] = {}, a[b.TOP_RIGHT][b.TOP_LEFT] = b.TOP_MIDDLE, a[b.BOTTOM_LEFT] = {}, a[b.BOTTOM_LEFT][b.TOP_LEFT] = b.MIDDLE_LEFT, a[b.BOTTOM_LEFT][b.BOTTOM_RIGHT] = b.BOTTOM_MIDDLE,
					a[b.BOTTOM_LEFT][b.VERTICAL] = b.MIDDLE_LEFT, a[b.BOTTOM_RIGHT] = {}, a[b.BOTTOM_RIGHT][b.TOP_RIGHT] = b.MIDDLE_RIGHT, a[b.BOTTOM_RIGHT][b.BOTTOM_LEFT] = b.BOTTOM_MIDDLE, a[b.BOTTOM_RIGHT][b.VERTICAL] = b.MIDDLE_RIGHT, a[b.BOTTOM_MIDDLE] = {}, a[b.BOTTOM_MIDDLE][b.TOP_LEFT] = b.MIDDLE, a[b.BOTTOM_MIDDLE][b.TOP_RIGHT] = b.MIDDLE, a[b.MIDDLE_RIGHT] = {}, a[b.MIDDLE_RIGHT][b.TOP_LEFT] = b.MIDDLE, a[b.VERTICAL] = {}, a[b.VERTICAL][b.TOP_LEFT] = b.MIDDLE_RIGHT, a[b.VERTICAL][b.BOTTOM_LEFT] = b.MIDDLE_LEFT, a[b.VERTICAL][b.BOTTOM_RIGHT] = b.MIDDLE_RIGHT);
				return d == c.EMPTY ? e : a.hasOwnProperty(d) ? a[d][e] || d : d
			}
		}();
	return function (c, d) {
		var u = c.model, w = k(u), x = f(u), y = [], A = d.use_rest_syntax || !1,
			O = d.use_unicode_border_symbols ? r : A ? p : t, X = a(u, c, O), G = [];
		u.forEachCellInRow(0, function (a, b) {
			1 > a.colspan() || (a = e(a, b, w), G.push(g(O.HORIZONTAL, a).join("")))
		});
		d = O.TOP_LEFT + G.join(O.TOP_MIDDLE) + O.TOP_RIGHT;
		y.push(d);
		d = [];
		for (var T = 0; T < u.row_count; ++T) A = b(u, T, w, x, O, X), d.push(A);
		m(u, c, d);
		for (T = 0; T < u.row_count; ++T) {
			var M = d[T];
			M.forEach(function (a, b) {
				var d = [];
				a.forEach(function (a,
														b) {
					var f = u.getCell(T, b, !0);
					1 > f.colspan() || (f = e(f, b, w), b = c.getCellView(T, b).style, d.push(q(a, f, b.getHorizontalAlign())))
				});
				d.push();
				var f = (b = b >= M.length - 1) ? O.MIDDLE : O.VERTICAL;
				a = "";
				if (b) {
					for (b = 0; b < u.col_count;) f = u.getCell(T, b, !0), a += X[T + 1][b] + d.shift(), b += f.colspan();
					a += X[T + 1][u.col_count]
				} else a = O.VERTICAL + d.join(f) + O.VERTICAL;
				y.push(a)
			})
		}
		return y.join("\n")
	}
}();
var MarkdownExport = function () {
	function a(a) {
		return a.value().toString().replace(/&nbsp;/ig, " ").replace(/\n$/, "").replace(/^\|/, "\\|").replace(/([^\\])(?=\|)/g, "$&\\")
	}

	function m(a) {
		return function (b) {
			return a(b).replace(/\n/g, "<br>")
		}
	}

	function e(a) {
		return function (b) {
			return a(b).replace(/\n/g, " ")
		}
	}

	function b(a) {
		return p(a).split("\n").map(function (a) {
			return " " + a + " "
		})
	}

	function d(a, b, c) {
		for (var d = c[b], e = 1; e < a.colspan(); ++e) d += c[b + e];
		return d += a.colspan() - 1
	}

	function c(a, c, d, e) {
		var f = e[c];
		0 == c && ++f;
		for (var g = [], m = 0; m < f; ++m) {
			var p = k("", d.length);
			g.push(p)
		}
		a.forEachCellInRow(c, function (m, p) {
			var q = 0 == c;
			if (m.isVisible()) b(m).forEach(function (a, b) {
				b >= f || (g[b][p] = a)
			}); else if (0 < m.colspan() && 0 > m.rowspan()) {
				var r = a.getCell(c, p), t = b(r), u = 0;
				for (r = 0; r < -m.rowspan(); ++r) u += e[c - (r + 1)] + 1;
				var w = Math.min(t.length, u + f);
				for (r = u; r < w; ++r) g[r - u][p] = t[r]
			}
			if (q) {
				for (r = q = 0; r < m.colspan(); ++r) q += d[p + r];
				q += m.colspan() - 1;
				m = k("-", q).join("");
				g[f - 1][p] = m
			}
		});
		return g
	}

	function g(a) {
		var c = 0;
		b(a).forEach(function (a) {
			c = Math.max(c,
				wcwidth(a))
		});
		return c
	}

	function k(a, b) {
		for (var c = [], d = 0; d < b; ++d) c.push(a);
		return c
	}

	function f(a) {
		for (var b = k(0, a.col_count), c = 0; c < a.row_count; ++c) a.forEachCellInRow(c, function (a, c) {
			1 == a.colspan() && (a = g(a), b[c] = Math.max(b[c], a))
		});
		for (c = 0; c < a.row_count; ++c) a.forEachCellInRow(c, function (a, c) {
			if (!(1 >= a.colspan())) {
				var e = g(a) - d(a, c, b);
				if (0 < e) {
					var f = Math.floor(e / a.colspan());
					e %= a.colspan();
					for (var k = 0; k < a.colspan(); ++k) b[c + k] += f, 0 < e && (b[c + k] += 1, --e)
				}
			}
		});
		for (a = 0; a < b.length; ++a) b[a] = Math.max(b[a], 3);
		return b
	}

	function q(a) {
		for (var c = [], d = 0; d < a.row_count; ++d) {
			var e = 0;
			a.forEachCellInRow(d, function (a) {
				1 < a.rowspan() || (e = Math.max(e, b(a).length))
			});
			c.push(e)
		}
		for (d = 0; d < a.row_count; ++d) a.forEachCellInRow(d, function (a) {
			if (!(1 >= a.rowspan())) {
				for (var e = b(a).length, f = 0, g = 0; g < a.rowspan(); ++g) f += c[d + g];
				f += a.rowspan() - 1;
				g = e - f;
				if (0 < g) for (e = Math.floor(g / a.rowspan()), f = g % a.rowspan(), g = 0; g < a.rowspan(); ++g) c[d + g] += e, 0 < f && (c[d + g] += 1, --f)
			}
		});
		return c
	}

	function t(a, b, c, d, e) {
		if ("left" == c) {
			var f = wcwidth(a);
			f < b && (a += k(" ", b - f).join(""))
		} else "right" ==
		c ? (f = wcwidth(a), f < b && (a = k(" ", b - f).join("") + a)) : "center" == c && (f = wcwidth(a), b -= f, 0 < b && (f = Math.floor(b / 2), a = k(" ", Math.floor(b / 2) + b % 2).join("") + a + k(" ", f).join("")));
		1 == d && (a = "right" == c ? e ? "-:" : a.substring(0, a.length - 1) + ":" : "center" == c ? e ? ":-:" : ":" + a.substring(1, a.length - 1) + ":" : e ? "-" : a);
		return a
	}

	var p = e(a);
	return function (b, g, k, A) {
		p = A ? m(a) : e(a);
		var r = b.model, u = f(r);
		A = q(r);
		for (var w = [], y = 0; y < r.row_count; ++y) c(r, y, u, A).forEach(function (c, e) {
			var f = [], m = 0 == y && 1 == e;
			c.forEach(function (c, e) {
				var g = r.getCell(y,
					e, !0);
				if (!(1 > g.colspan())) {
					var p = d(g, e, u);
					1 == k && (p = a(g) + 1);
					e = b.getCellView(y, e).style;
					f.push(t(c, p, e.getHorizontalAlign(), m, k))
				}
			});
			f.push("");
			w.push("|" + f.join(g ? "\t|" : "|"))
		});
		return w.join("\n")
	}
}();
var MediaWikiExport = function () {
	function a(a) {
		var d = [], k = [];
		a.forEach(function (a, b) {
			var e = [];
			a.forEach(function (a, b) {
				e.push(c(a))
			});
			a = m(e, g);
			d.push(a);
			k.push(e)
		});
		var t = ['class="wikitable"'], p = m(d, g), r;
		for (r in g) p.hasOwnProperty(r) && p[r] == g[r] && delete p[r];
		p && (p = e(p), t.push(p));
		var u = [];
		a.forEach(function (a, c) {
			var f = e(d[c]);
			u.push(f ? "|- " + f : "|-");
			u.push(b(a, c, k[c]))
		});
		a = u ? u.join("\n") : "";
		return "{| " + t.join(" ") + "\n" + a + "\n|}"
	}

	function m(a, b) {
		if (!a || 0 == a.length) return {};
		var c = {}, d = {}, e = Object.assign({},
			b);
		Object.assign(e, a[0]);
		for (var f = 0; f < a.length; ++f) {
			var g = a[f], k;
			for (k in b) g.hasOwnProperty(k) || (g[k] = b[k]);
			for (var m in e) g.hasOwnProperty(m) || delete e[m];
			for (var v in g) if (g.hasOwnProperty(v)) {
				var B = g[v];
				if (c.hasOwnProperty(v)) {
					var x = c[v];
					x.hasOwnProperty(B) ? x[B] += 1 : x[B] = 1;
					x[B] > x[d[v]] && (d[v] = B)
				} else x = {}, c[v] = (x[B] = 1, x), d[v] = B
			}
		}
		for (var y in e) {
			b = d[y];
			for (c = 0; c < a.length; ++c) f = a[c], f[y] == b && delete f[y];
			e[y] = b
		}
		return e
	}

	function e(a) {
		var b = [], c;
		for (c in a) b.push(c + ":" + a[c] + ";");
		return 0 < b.length ?
			'style="' + b.join(" ") + '"' : ""
	}

	function b(a, b, c, e) {
		e = void 0 === e ? !1 : e;
		var f = [], g = 0 == b ? "! " : "| ";
		a.forEach(function (a, b) {
			a.isVisible() && f.push(g + d(a, c[b]))
		});
		return f.join(e ? " || " : "\n")
	}

	function d(a, b) {
		var c = a.value().toString();
		c = c.replace(/&nbsp;/g, " ");
		c = c.replace(/\r\n|\r|\n/g, "<br />");
		c = c.trim(c);
		var d = [];
		1 < a.rowspan() && d.push('rowspan="' + a.rowspan() + '"');
		1 < a.colspan() && d.push('colspan="' + a.colspan() + '"');
		(a = e(b)) && d.push(a);
		a = "";
		0 < d.length && (a = d.join(" ") + " | ");
		return a + c
	}

	function c(a) {
		a = a.view.style;
		var b = {}, c = a.getHorizontalAlign();
		"left" != c && (b["text-align"] = c);
		c = a.getVerticalAlign();
		"top" != c && (b["vertical-align"] = c);
		[a.fontStyleToCSS(), a.colorsToCSS()].forEach(function (a) {
			for (var c in a) if (a.hasOwnProperty(c)) {
				var d = a[c].replace(/"/g, "'");
				b[c] = d
			}
		});
		return b
	}

	var g = {"font-style": "normal", "font-weight": "normal", "text-align": "left"};
	return function (b) {
		return a(b.model.rows)
	}
}();
var init_latex_tables_ui = function (a) {
	function m() {
		GlobalMessageHub.trigger(GlobalEvents.STOP_EDITING_TABLE);
		var b = a("#latex_table_style").val();
		b = LaTeXExport(k, "booktabs" == b, a("#escape-special-tex-symbols").is(":checked"), a("#compress-tex-whitespace").is(":checked"), a("#compress-and-align-tex-whitespace").is(":checked"), f);
		a("#result-code").text(b);
		Prism.highlightElement(a("#result-code")[0])
	}

	function e() {
		q && (t(f, g) ? (q.table_caption.set_caption(k.get_option("table_caption")), q.table_caption.set_label(k.get_option("table_label")),
			q.table_caption.show()) : (k.set_option("table_caption", q.table_caption.default_caption), k.set_option("table_label", q.table_caption.default_label), q.table_caption.hide()))
	}

	function b() {
		k.on("onload", function () {
			q.table_caption.set_caption(k.get_or_set_option("table_caption", q.table_caption.default_caption));
			q.table_caption.set_label(k.get_or_set_option("table_label", q.table_caption.default_label))
		});
		q.table_caption.on_caption_change = function (a) {
			k.set_option("table_caption", a)
		};
		q.table_caption.on_label_change =
			function (a) {
				k.set_option("table_label", a)
			};
		e()
	}

	function d(b) {
		a("#escape-special-tex-symbols").change(m);
		store_checkbox_state(a("#escape-special-tex-symbols"), "tg-latex-escape-special-tex-symbols");
		var d = a("#compress-tex-whitespace");
		d.change(m);
		store_checkbox_state(d, "tg-latex-compress-tex-whitespace");
		d = a("#compress-and-align-tex-whitespace");
		d.change(m);
		store_checkbox_state(d, "tg-latex-compress-and-align-tex-whitespace");
		a('<button class="btn"><i class="icon-cogs"></i> Generate</button>').appendTo(a("#generate_table_panel")).click(m);
		a("#latex_table_style").selectpicker();
		a("#latex_table_style").change(function () {
			"booktabs" === a(this).val() && (b.forEachCellInRow(0, function (a) {
				a.style.setBorders("tb")
			}), b.forEachCellInRow(b.model.row_count - 1, function (a) {
				a.style.setBorders("b")
			}));
			m()
		});
		a("#show_example_btn").click(function () {
			c(b);
			m()
		});
		var k = !1, p = a("#multi-page-table-options"), q = !0, t = a("#extra-options"), B = DB("tg-latex-extra-options");
		t.selectpicker().change(function () {
			if (k) return !1;
			var b = a(this).val() || [], c = b.diff(f);
			f = b;
			c = 0 < c.length ?
				c[0] : null;
			var d = !1;
			if (-1 !== g.indexOf(c)) {
				var r = b.diff(g);
				r.push(c);
				k = !0;
				a(this).selectpicker("val", r);
				k = !1;
				d = !0;
				f = r
			}
			B.put(f);
			-1 !== b.indexOf(LaTeXExportOptions.SPLIT_LONG_TABLE) ? (q || (t.append(p), q = !0), c == LaTeXExportOptions.SPLIT_LONG_TABLE && (d = !0)) : (p.detach(), d = !0, q = !1);
			e();
			d && a(this).selectpicker("refresh");
			m()
		});
		d = B.get();
		a("#extra-options").selectpicker("val", d);
		a("#extra-options").selectpicker("refresh")
	}

	function c(a) {
		a.reset();
		var b = a.model;
		b.setRows([["Item", "", ""], ["Animal", "Description", "Price ($)"],
			["Gnat", "per gram", "13.65"], ["", "each", "0.01"], ["Gnu", "stuffed", "92.50"], ["Emu", "stuffed", "33.33"], ["Armadillo", "frozen", "8.99"]]);
		b.mergeCells(0, 0, 0, 1);
		a.forEachCellViewInRange(function (a) {
			a.style.setHorizontalAlign("right")
		}, 0, 2, 6, 2);
		a.getCellView(0, 0).style.setHorizontalAlign("center");
		a.clearSelection();
		a.forEachCellInRow(0, function (a) {
			a.style.setBorders("t")
		});
		a.forEachCellInRange(1, 0, 1, 1, function (a) {
			a.style.setBorders("t")
		});
		a.forEachCellInRow(2, function (a) {
			a.style.setBorders("t")
		});
		a.forEachCellInRow(6,
			function (a) {
				a.style.setBorders("b")
			})
	}

	var g = [LaTeXExportOptions.CAPTION_ABOVE, LaTeXExportOptions.CAPTION_BELOW], k = null, f = [], q,
		t = function (a, b) {
			return b.some(function (b) {
				return 0 <= a.indexOf(b)
			})
		};
	return function (a, c) {
		var e = new TableModel;
		e.insertRow([""]);
		e.resize(4, 5);
		k = new TableView(e, "#edited_table_container");
		k.setEnabledFormattingOptions("bg_color borders colspan font_style rowspan text_color".split(" "));
		d(k);
		q = new MainUI(k);
		b();
		a && Main.init_table_from_json(k, a);
		c && (c = Utils.normalize_json_string(c),
			k.load(jQuery.parseJSON(c)));
		m()
	}
}($);
var html_tables_ui = function (a) {
	function m(b, d, c) {
		function g() {
			GlobalMessageHub.trigger(GlobalEvents.STOP_EDITING_TABLE);
			var b = r.is(":checked");
			b = HTMLExport(f, p.is(":checked"), b, b ? "" : "\n", t);
			a("#result-code").text(b);
			32768 > b.length && Prism.highlightElement(a("#result-code")[0]);
			TablePreview.update(b)
		}

		var k = new TableModel;
		k.insertRow([""]);
		var f = new TableView(k, b, {column_resize_enabled: !0});
		f.setEnabledFormattingOptions("bg_color border_color borders colspan fixed_layout font_style rowspan text_color theme vertical_alignment".split(" "));
		var m = new MainUI(f, {show_border_color_picker: !0}), t = [];
		f.on("theme_set", function (a) {
			null == a ? f.setTheme({ColorTheme: "Default", BorderTheme: "All borders"}) : m.theme_selector.setTheme(a)
		});
		f.theme || f.setTheme({ColorTheme: "Default", BorderTheme: "All borders"});
		a('<button class="btn"><i class="icon-cogs"></i> Generate</button>').appendTo(a("#generate_table_panel")).click(g);
		b = a("<div/>", {"class": "tab-gen-opt-box"}).appendTo(a("#generate_table_panel"));
		var p = a('<input type="checkbox">');
		p.change(g);
		store_checkbox_state(p,
			"tg-html-do-not-generate-css");
		a("<label/>", {"class": "checkbox tab-gen-option"}).text("Do not generate CSS").append(p).appendTo(b);
		var r = a('<input type="checkbox">');
		store_checkbox_state(r, "tg-html-compact-mode");
		a("<label/>", {"class": "checkbox tab-gen-option"}).text("Compact mode").attr("title", "Useful for embedding tables into e-mails - puts styles inline & joins code into a single line").append(r).appendTo(b);
		r.change(g);
		a("#show_example_btn").click(function () {
			e(f);
			g()
		});
		d && Main.init_table_from_json(f,
			d);
		c && (c = Utils.normalize_json_string(c), f.load(jQuery.parseJSON(c)));
		a("#preview-table-btn").click(function () {
			TablePreview.open();
			g()
		});
		var u = DB("tg-html-extra-options");
		a("#extra-options").selectpicker().change(function () {
			t = a(this).val() || [];
			u.put(t);
			g()
		});
		d = [HTMLExportOptions.MAKE_FIRST_ROW_A_HEADER];
		c = u.get();
		d = 0 < c.length ? c : d;
		a("#extra-options").selectpicker("val", d);
		a("#extra-options").selectpicker("refresh");
		g()
	}

	function e(a) {
		a.reset();
		a.setTheme({
			ColorTheme: "Violet", BorderTheme: "All borders",
			"Alternate Rows/Columns Theme": "Alternate rows"
		});
		var b = a.model;
		b.setRows(["Results     ".split(" "), "No Competition John Adam Robert Paul".split(" "), "1 Swimming 1:30 2:05 1:15 1:41".split(" "), "2 Running 15:30 14:10 15:45 16:00".split(" "), "3 Shooting 70% 55% 90% 88%".split(" ")]);
		b.mergeCells(0, 0, 0, 5);
		a.forEachCellViewInRange(function (a) {
			a.style.setHorizontalAlign("right")
		}, 2, 2, 4, 5);
		a.getCellView(0, 0).style.setHorizontalAlign("center")
	}

	return function (a, d) {
		TableView.enableMarkupInCells(!0);
		m("#edited_table_container",
			a, d)
	}
}(jQuery);
var markdown_tables_ui = function (a) {
	function m(b, d, c) {
		function g() {
			GlobalMessageHub.trigger(GlobalEvents.STOP_EDITING_TABLE);
			var b = MarkdownExport(f, m.is(":checked"), t.is(":checked"), p.is(":checked"));
			a("#result-code").text(b);
			Prism.highlightElement(a("#result-code")[0]);
			TablePreview.is_open() && TablePreview.update(marked(b))
		}

		TableView.enableMarkupInCells(!0);
		TableView.setMarkupProcessingPlugin(MarkdownMarkupProcessingPlugin);
		var k = new TableModel;
		k.insertRow([""]);
		var f = new TableView(k, b);
		f.dom.addClass("markdown-table");
		f.setEnabledFormattingOptions([]);
		f.on("cell_created", function (a) {
			a.style.setBorders("lrtb")
		});
		k.resize(5, 5);
		k.removeRow(0);
		new MainUI(f);
		a('<button class="btn"><i class="icon-cogs"></i> Generate</button>').appendTo(a("#generate_table_panel")).click(g);
		b = a("<div/>", {"class": "tab-gen-opt-box"}).appendTo(a("#generate_table_panel"));
		var m = a('<input type="checkbox">');
		a("<label/>", {"class": "checkbox tab-gen-option"}).text("Put tabs between columns").attr("title", "Useful when your external editor supports elastic tabstops").append(m).appendTo(b).change(g);
		store_checkbox_state(m, "tg-markdown-put-tabs-between-columns");
		var t = a('<input type="checkbox">');
		a("<label/>", {"class": "checkbox tab-gen-option"}).text("Compact mode").attr("title", "Do not add extra spaces to align the cells").append(t).appendTo(b).change(g);
		store_checkbox_state(t, "tg-markdown-compact-mode");
		var p = a('<input type="checkbox">');
		a("<label/>", {"class": "checkbox tab-gen-option"}).text("Line breaks as <br>").attr("title", "Allows for a multiline string in a cell").append(p).appendTo(b).change(g);
		store_checkbox_state(p, "tg-markdown-newlines-as-br");
		a("#preview-table-btn").click(function () {
			TablePreview.set_style("\n            body {\n                font-family: -apple-system,Helvetica,Arial,sans-serif;\n                font-size: 16px;\n                line-height: 1.5;\n                word-wrap: break-word;\n                background: #F9F9F9;\n            }\n            a {\n                color: #0366d6;\n                text-decoration: none;\n            }\n            table { border-collapse: collapse;\n                    border-spacing: 0; }\n            td, th { border: 1px lightgray solid; \n                     padding: 6px 13px;}\n            code:not([class]) {\n                background-color: rgba(27,31,35,0.05);\n                border-radius: 3px;\n                font-size: 90%;\n                margin: 0;\n                padding: 0.2em 0.4em;\n            }\n            ");
			TablePreview.open();
			g()
		});
		a("#show_example_btn").click(function () {
			e(f);
			g()
		});
		d && Main.init_table_from_json(f, d);
		c && (c = Utils.normalize_json_string(c), f.load(jQuery.parseJSON(c)));
		g()
	}

	function e(a) {
		a.reset();
		a.model.setRows([["Tables", "Are", "Cool"], ["col 1 is", "left-aligned", "$1600"], ["col 2 is", "centered", "$12"], ["col 3 is", "right-aligned", "$1"]]);
		a.forEachCellViewInRange(function (a) {
			a.style.setHorizontalAlign("center")
		}, 0, 1, 3, 1);
		a.forEachCellViewInRange(function (a) {
				a.style.setHorizontalAlign("right")
			},
			0, 2, 3, 2)
	}

	return function (a, d) {
		m("#edited_table_container", a, d)
	}
}(jQuery);
(function () {
	setTimeout(function () {
		var a = document.getElementById("social-buttons__facebook");
		if (a) {
			var m = !0 === "href" in a.dataset ? a.dataset.href : window.location.href.replace(window.location.hash, ""),
				e = document.createElement("iframe");
			e.src = "https://www.facebook.com/plugins/like.php?href=" + m + "&width=100&layout=button_count&action=like&size=small&share=false&height=21&appId";
			e.style.border = "none";
			e.style.overflow = "hidden";
			e.width = 100;
			e.height = 21;
			e.scrolling = "no";
			e.frameBorder = 0;
			e.allowTransparency = !0;
			e.allow = "encrypted-media";
			a.appendChild(e)
		}
	}, 750)
})();
