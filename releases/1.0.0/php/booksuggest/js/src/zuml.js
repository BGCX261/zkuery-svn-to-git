zk.load('zul,zk.xml',function(){zk._n='zk.zuml';try{zk._p=zk.$package(zk._n,false,true);

(function () {
	function _innerText(node) {
		var txt = node.innerHTML,
			j = txt.indexOf('<!--');
		if (j >= 0)
			txt = txt.substring(j + 4, txt.lastIndexOf('-->'));
		txt = txt.trim();
		return txt ? '<div>' + txt.trim() + '</div>': null;
	}
	function _aftCreate(wgt, cwgts, node, opts) {
		var c;
		if (!wgt || !(c = wgt.firstChild))
			return;

		do {
			var sib = c.nextSibling;
			wgt.removeChild(c);
			cwgts.push(c);
			c = sib;
		} while (c);

		var l = cwgts.length;
		if (!opts || opts.replaceHTML !== false) {
			var ns = [node];
			if (l > 1) {
				var p = node.parentNode, sib = node.nextSibling;
				for (var j = l; --j > 0;) {
					var n = document.createElement('DIV');
					ns.push(n);
					p.insertBefore(n, sib);
				}
			}
			for (var j = 0; j < l; ++j)
				cwgts[j].replaceHTML(ns[j]);
		}

		return cwgts.length <= 1 ? cwgts[0]: cwgts;
	}
	function _getPkgs(e) {
		var pkgmap = {}, pkgs = []; 
		_getPkgs0(e, pkgmap);
		for (var p in pkgmap)
			pkgs.push(p);
		return pkgs.join(',');
	}
	function _getPkgs0(e, pkgmap) {
		var tn = e.tagName;
		if ("zk" != tn && "attribute" != tn) {
			if (!zk.Widget.getClass(tn)) { 
				var clsnm = zk.wgt.WidgetInfo.getClassName(tn);
				if (!clsnm) throw "Unknown tag: "+tn;

				var j = clsnm.lastIndexOf('.');
				if (j >= 0)
					pkgmap[clsnm.substring(0, j)] = true;
			}

			for (e = e.firstChild; e; e = e.nextSibling) {
				var nt = e.nodeType;
				if (nt == 1) _getPkgs0(e, pkgmap);
			}
		}
	}
	function _create(parent, e, args, cwgts) {
		if (!e) return null;

		var forEach = _eval(parent, e.getAttribute('forEach'), args);
		if (forEach != null) {
			var oldEach = window.each;
			for (var l = forEach.length, j = 0; j < l; j++) {
				window.each = forEach[j];
				_create0(parent, e, args, cwgts);
			}
			window.each = oldEach;
		} else
			_create0(parent, e, args, cwgts);
	}
	function _create0(parent, e, args, cwgts) {
		var ifc = _eval(parent, e.getAttribute('if'), args),
			unless = _eval(parent, e.getAttribute('unless'), args);
		if ((ifc == null || ifc) && (unless == null || !unless)) {
			var tn = e.tagName, wgt;
			if ("zk" == tn) {
				wgt = parent;
			} else if ("attribute" == tn) {
				var attnm = _eval(parent, e.getAttribute('name'), args);
				if (!attnm)
					throw "The name attribute required, "+e;
				parent.set(attnm, zk.xml.Utl.getElementValue(e));
				return;
			} else {
				var atts = e.attributes;

				wgt = zk.Widget.newInstance(tn)
				if (cwgts) cwgts.push(wgt);
				if (parent) parent.appendChild(wgt);

				for (var l = atts.length, j = 0; j < l; ++j) {
					var att = atts[j];
					wgt.set(att.name, _eval(wgt, att.value, args));
				}
			}

			var prolog;
			for (e = e.firstChild; e; e = e.nextSibling) {
				var nt = e.nodeType;
				if (nt == 1) {
					var ws = [];
					_create(wgt, e, args, ws);
					if (prolog && (ws = ws[0])) {
						ws.prolog = prolog;
						prolog = null;
					}
				} else if (nt == 3) {
					var txt = _eval(wgt, e.nodeValue, args);
					if (txt.trim().length) {
						var w = new zk.Native();
						w.prolog = txt;
						wgt.appendChild(w);
					} else if (wgt.blankPreserved)
						prolog = txt;
				}
			}
		}
	}
	function _eval(wgt, s, args) {
		if (s)
			for (var j = 0, k, l, t, last = s.length - 1, s2;;) {
				k = s.indexOf('${', j);
				if (k < 0) {
					if (s2) s = s2 + s.substring(j);
					break;
				}

				t = s.substring(j, k);
				l = s.indexOf('}', k + 2);
				if (l < 0) {
					s = s2 ? s2 + t: t; 
					break;
				}

				s2 = s2 ? s2 + t: t;
				t = s.substring(k + 2, l); 

				try {
					var fn = new Function('var _=arguments[0];return ' + t);
					t = wgt ? fn.call(wgt, args): fn(args);
				} catch (e) {
					throw 'Failed to evaluate '+t;
				}

				if (!s2 && l == last) return t; 

				if (t) s2 += t;

				j = l + 1;
			}
		return s;
	}

  zk.zuml.Parser = {
	create: function (parent, doc, args, fn) {
		if (typeof args == 'function' && !fn) {
			fn = args;
			args = null;
		}

		doc = (typeof doc == 'string' ? zk.xml.Utl.parseXML(doc): doc).documentElement;

		var cwgts = [];
		zk.load(_getPkgs(doc), function () {
			_create(parent, doc, args, cwgts);
			if (fn) fn(cwgts.length <= 1 ? cwgts[0]: cwgts);
		});
		return cwgts.length <= 1 ? cwgts[0]: cwgts;
	},
	createAt: function (node, opts, args, fn) {
		if (typeof args == 'function' && !fn) {
			fn = args;
			args = null;
		}

		node = jq(node)[0];
		var txt = _innerText(node);
		if (!txt) return;

		var cwgts = [],
			wgt = zk.zuml.Parser.create(null, txt, args,
				function (w) {
					w = _aftCreate(w, cwgts, node, opts);
					if (fn) fn(w);
				});
		return _aftCreate(wgt, cwgts, node, opts);
	}
  };
})();


}finally{zk.setLoaded(zk._n);}});zk.setLoaded('zk.zuml',1);