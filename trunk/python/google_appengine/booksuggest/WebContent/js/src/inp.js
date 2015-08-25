zk.load('zul.wgt,zk.fmt',function(){zk._p=zkpi('zul.inp',true);try{



(function () {
	function _onChangeData(wgt, val, selbk) {
		var inf = {value: val,
			start: zk(wgt.getInputNode()).getSelectionRange()[0]}
		if (selbk) inf.bySelectBack =  true;
		return inf;
	}
	function _startOnChanging(wgt) {
		_stopOnChanging(wgt);
		wgt._tidChg = setTimeout(
			wgt.proxy(_onChanging), zul.inp.InputWidget.onChangingDelay);
	}
	function _stopOnChanging(wgt, onBlur) {
		if (wgt._tidChg) {
			clearTimeout(wgt._tidChg);
			wgt._tidChg = null;
		}
		if (onBlur) {
			if (zul.inp.InputWidget.onChangingForced && wgt.isListen("onChanging"))
				_onChanging.call(wgt, -1); 
			wgt._lastChg = wgt.valueEnter_ = wgt.valueSel_ = null;
		}
	}
	function _onChanging(timeout) {
		
		var inp = this.getInputNode(),
			val = this.valueEnter_ || inp.value;
		if (this._lastChg != val) {
			this._lastChg = val;
			var valsel = this.valueSel_;
			this.valueSel_ = null;
			this.fire('onChanging', _onChangeData(this, val, valsel == val),
				{ignorable:1}, timeout||5);
		}
	}
	var _keyIgnorable = zk.ie ? function () {return true;}:
		zk.opera ? function (code) {
			return code == 32 || code > 46; 
		}: function (code) {
			return code >= 32;
		}

var InputWidget =

zul.inp.InputWidget = zk.$extends(zul.Widget, {
	_maxlength: 0,
	_cols: 0,
	_tabindex: -1,
	_type: 'text',
	$define: {
		
		
		name: function (name) {
			var inp = this.getInputNode();
			if (inp)
				inp.name = name;
		},
		
		
		disabled: function (disabled) {
			var inp = this.getInputNode();
			if (inp) {
				inp.disabled = disabled;
				var zcls = this.getZclass(),
					fnm = disabled ? 'addClass': 'removeClass';
				jq(this.$n())[fnm](zcls + '-disd');
				jq(inp)[fnm](zcls + '-text-disd');
			}
		},
		
		
		readonly: function (readonly) {
			var inp = this.getInputNode();
			if (inp) {
				var zcls = this.getZclass(),
					fnm = readonly ? 'addClass': 'removeClass';
				
				inp.readOnly = readonly;
				jq(inp)[fnm](zcls + '-readonly');
				
				if (!this.inRoundedMold()) return;
				
				var btn = this.$n('btn');
				jq(btn)[fnm](zcls + '-btn-readonly');
				
				if (zk.ie6_)		
					jq(btn)[fnm](zcls + (this._buttonVisible ? '-btn-readonly':
													'-btn-right-edge-readonly'));
			}
		},
		
		
		cols: function (cols) {
			var inp = this.getInputNode();
			if (inp)
				if (this.isMultiline()) inp.cols = cols;
				else inp.size = cols;
		},
		
		
		maxlength: function (maxlength) {
			var inp = this.getInputNode();
			if (inp && !this.isMultiline())
				inp.maxLength = maxlength;
		},
		
		
		tabindex: function (tabindex) {
			var inp = this.getInputNode();
			if (inp)
				inp.tabIndex = tabindex;
		},
		
		
		inplace: function (inplace) {
			this.rerender();
		}
	},
	
	getInplaceCSS: function () {
		return this._inplace ? this.getZclass() + '-inplace' : '';
	},
	
	select: function (start, end) {
		zk(this.getInputNode()).setSelectionRange(start, end);
	},
	
	getType: function () {
		return this._type;
	},
	
	isMultiline: function() {
		return false;
	},
	
	inRoundedMold: function(){
		return this._mold == "rounded";
	},
	
	getValue: function () {
		return this._value;
	},
	
	setValue: function (value, fromServer) {
		var vi;
		if (fromServer) this.clearErrorMessage(true);
		else if (value == this._lastRawValVld) return; 
 		else {
 			vi = this._validate(value);
 			value = vi.value;
 		}

		
		
		if ((!vi || !vi.error) && (fromServer || this._value != value)) {
			this._value = value;
			var inp = this.getInputNode();
			if (inp) {
				inp.value = value = this.coerceToString_(value);
				if (fromServer)
					this._defValue = value; 
			}
		}
	},
	
	getInputNode: _zkf = function () {
		return this.$n('real') || this.$n();
	},
	getTextNode: _zkf,
	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments);
		if (!no || !no.text)
			attr += this.textAttrs_();
		return attr;
	},
	
	textAttrs_: function () {
		var html = '', v;
		if (this.isMultiline()) {
			v = this._cols;
			if (v > 0) html += ' cols="' + v + '"';
		} else {
			html += ' value="' + this._areaText() + '"';
			html += ' type="' + this._type + '"';
			v = this._cols;
			if (v > 0) html += ' size="' + v + '"';
			v = this._maxlength;
			if (v > 0) html += ' maxlength="' + v + '"';
		}
		v = this._tabindex;
		if (v >= 0) html += ' tabindex="' + v +'"';
		v = this._name;
		if (v) html += ' name="' + v + '"';
		if (this._disabled) html += ' disabled="disabled"';
		if (this._readonly) html += ' readonly="readonly"';
		
		var s = jq.filterTextStyle(this.domStyle_({width: true, height: true, top: true, left: true}));
		if (s) html += ' style="' + s + '"';
		
		return html;
	},
	_onChanging: _onChanging,
	_areaText: function () {
		return zUtl.encodeXML(this.coerceToString_(this._value));
	},
	
	setConstraint: function (cst) {
		if (typeof cst == 'string' && cst.charAt(0) != '[')
			this._cst = new zul.inp.SimpleConstraint(cst);
		else
			this._cst = cst;
		if (this._cst) delete this._lastRawValVld; 
	},
	
	getConstraint: function () {
		return this._cst;
	},
	doMouseOut_: function () {
		this._inplaceout = true;
		this.$supers('doMouseOut_', arguments);
		
	},
	doMouseOver_: function () {
		this._inplaceout = false;
		this.$supers('doMouseOver_', arguments);
	},
	doFocus_: function (evt) {
		this.$supers('doFocus_', arguments);

		if (evt.domTarget.tagName) { 
			var inp = this.getInputNode();
			this._lastChg = inp.value;

			jq(this.$n()).addClass(this.getZclass() + '-focus');
			if (this._inplace) {
				jq(this.getInputNode()).removeClass(this.getInplaceCSS());
				if (this._inplaceout === undefined)
					this._inplaceout = true;
			}
			
			
			if (this._errbox) {
				var self = this;
				setTimeout(function () {
					if (self._errbox)
						self._errbox.open(self, null, "end_before", {
							overflow: true
						});
				});
			}
		}
	},
	doBlur_: function (evt) {
		_stopOnChanging(this, true);
		
		jq(this.$n()).removeClass(this.getZclass() + '-focus');
		if (!zk.alerting && this.shallUpdate_(zk.currentFocus)) {
			this.updateChange_();
			this.$supers('doBlur_', arguments);
		}
		if (this._inplace && this._inplaceout) {
			jq(this.getInputNode()).addClass(this.getInplaceCSS());
		}
	},

	_doSelect: function (evt) { 
		if (this.isListen('onSelection')) {
			var inp = this.getInputNode(),
				sr = zk(inp).getSelectionRange(),
				b = sr[0], e = sr[1];
			this.fire('onSelection', {start: b, end: e,
				selected: inp.value.substring(b, e)});
		}
	},
	
	shallUpdate_: function (focus) {
		return !focus || !zUtl.isAncestor(this, focus);
	},
	
	getErrorMesssage: function () {
		return this._errmsg;
	},
	
	setErrorMessage: function (msg) {
		this.clearErrorMessage(true, true);
		this._markError(msg, null, true);
	},
	
	clearErrorMessage: function (revalidate, remainError) {
		var w = this._errbox;
		if (w) {
			this._errbox = null;
			w.destroy();
		}
		if (!remainError) {			
			var zcls = this.getZclass();
			this._errmsg = null;
			jq(this.getInputNode()).removeClass(zcls + "-text-invalid");
			if(zk.ie6_ && this.inRoundedMold())
				jq(this.$n('btn')).removeClass(zcls + "-btn-right-edge-invalid");
			
		}
		if (revalidate)
			delete this._lastRawValVld; 
	},
	
	coerceFromString_: function (value) {
		return value;
	},
	
	coerceToString_: function (value) {
		return value || '';
	},
	_markError: function (msg, val, noOnError) {
		this._errmsg = msg;
		
		var zcls = this.getZclass();
		if (this.desktop) { 
			jq(this.getInputNode()).addClass(zcls + "-text-invalid");
			if(zk.ie6_ && this.inRoundedMold() && !this._buttonVisible)
				jq(this.$n('btn')).addClass(zcls + "-btn-right-edge-invalid");

			var cst = this._cst, errbox;
			if (cst != "[c") {
				if (cst && (errbox = cst.showCustomError))
					errbox = errbox.call(cst, this, msg);

				if (!errbox) this._errbox = this.showError_(msg);
			}

			if (!noOnError)
				this.fire('onError', {value: val, message: msg});
		}
	},
	
	validate_: function (val) {
		var cst;
		if (cst = this._cst) {
			if (typeof cst == "string") return false; 
			var msg = cst.validate(this, val);
			if (!msg && cst.serverValidate) return false; 
			return msg;
		}
	},
	_validate: function (value) {
		zul.inp.validating = true;
		try {
			var val = value, msg;
			if (typeof val == 'string' || val == null) {
				val = this.coerceFromString_(val);
				if (val && (msg = val.error)) {
					this.clearErrorMessage(true);
					if (this._cst == "[c") 
						return {error: msg, server: true};
					this._markError(msg, val);
					return val;
				}
			}

			
			if (!this.desktop) this._errmsg = null;
			else {
				this.clearErrorMessage(true);
				msg = this.validate_(val);
				if (msg === false) {
					this._lastRawValVld = value; 
					return {value: val, server: true};
				}
				if (msg) {
					this._markError(msg, val);
					return {error: msg};
				} else
					this._lastRawValVld = value; 
			}
			return {value: val};
		} finally {
			zul.inp.validating = false;
		}
	},
	_shallIgnore: function (evt, keys) {
		var code = (zk.ie||zk.opera) ? evt.keyCode : evt.charCode;
		if (!evt.altKey && !evt.ctrlKey && _keyIgnorable(code)
		&& keys.indexOf(String.fromCharCode(code)) < 0) {
			evt.stop();
			return true;
		}
	},
	
	showError_: function (msg) {
		var eb = new zul.inp.Errorbox();
		eb.show(this, msg);
		return eb;
	},
	
	updateChange_: function () {
		if (zul.inp.validating) return false; 

		var inp = this.getInputNode(),
			value = inp.value;
		if (value == this._lastRawValVld)
			return false; 

		var wasErr = this._errmsg,
			vi = this._validate(value);
		if (!vi.error || vi.server) {
			var upd;
			if (!vi.error) {
				inp.value = value = this.coerceToString_(vi.value);
				
				
				upd = wasErr || value != this._defValue;
				if (upd) {
					this._value = vi.value; 
					this._defValue = value;
				}
			}
			if (upd || vi.server)
				this.fire('onChange', _onChangeData(this, value),
					vi.server ? {toServer:true}: null, 150);
		}
		return true;
	},
	_resetForm: function () {
		var inp = this.getInputNode();
		if (inp.value != inp.defaultValue) { 
			var wgt = this;
			setTimeout(function () {wgt.updateChange_();}, 0);
				
		}
	},

	
	focus: function (timeout) {
		if (this.isVisible() && this.canActivate({checkOnly:true})) {
			zk(this.getInputNode()).focus(timeout);
			return true;
		}
		return false;
	},
	domClass_: function (no) {
		var sc = this.$supers('domClass_', arguments),
			zcls = this.getZclass();
		if ((!no || !no.zclass) && this._disabled)
			sc += ' ' + zcls + '-disd';
		
		if ((!no || !no.input) && this._inplace)
			sc += ' ' + this.getInplaceCSS();
		return sc;
	},
	bind_: function () {
		this.$supers(InputWidget, 'bind_', arguments);
		var n = this.getInputNode(),
			zcls = this.getZclass();
		
		if (this._readonly)
			jq(n).addClass(zcls + '-readonly');
		
		if (this._disabled)
			jq(n).addClass(zcls + '-text-disd');
			
		this.domListen_(n, "onFocus", "doFocus_")
			.domListen_(n, "onBlur", "doBlur_")
			.domListen_(n, "onSelect");

		if (n = n.form)
			jq(n).bind("reset", this.proxy(this._resetForm));
	},
	unbind_: function () {
		this.clearErrorMessage(true);

		var n = this.getInputNode();
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_")
			.domUnlisten_(n, "onSelect");

		if (n = n.form)
			jq(n).unbind("reset", this.proxy(this._resetForm));

		this.$supers(InputWidget, 'unbind_', arguments);
	},
	doKeyDown_: function (evt) {
		var keyCode = evt.keyCode;
		if (this._readonly && keyCode == 8 && evt.target == this) {
			evt.stop(); 
			return;
		}
			
		if (!this._inplaceout)
			this._inplaceout = keyCode == 9;
		if (keyCode == 9 && !evt.altKey && !evt.ctrlKey && !evt.shiftKey
		&& this._tabbable) {
			var inp = this.getInputNode(),
				$inp = zk(inp),
				sr = $inp.getSelectionRange(),
				val = inp.value;
			val = val.substring(0, sr[0]) + '\t' + val.substring(sr[1]);
			inp.value = val;

			val = sr[0] + 1;
			$inp.setSelectionRange(val, val);

			evt.stop();
			return;
		}

		_stopOnChanging(this); 

		this.$supers('doKeyDown_', arguments);
	},
	doKeyUp_: function () {
		
		if (this.isMultiline()) {
			var maxlen = this._maxlength;
			if (maxlen > 0) {
				var inp = this.getInputNode(), val = inp.value;
				if (val != this._defValue && val.length > maxlen)
					inp.value = val.substring(0, maxlen);
			}
		}

		if (this.isListen("onChanging"))
			_startOnChanging(this);

		this.$supers('doKeyUp_', arguments);
	},
	afterKeyDown_: function (evt) {
		if (this._inplace) {
			if (!this._multiline && evt.keyCode == 13) {
				var $inp = jq(this.getInputNode()), inc = this.getInplaceCSS();
				if ($inp.toggleClass(inc).hasClass(inc)) 
					$inp.zk.setSelectionRange(0, $inp[0].value.length);
			} else
				jq(this.getInputNode()).removeClass(this.getInplaceCSS());
		}
		if (evt.keyCode != 13 || !this.isMultiline())
			this.$supers('afterKeyDown_', arguments);
	},
	beforeCtrlKeys_: function (evt) {
		this.updateChange_();
	}
},{
	
	onChangingDelay: 350,
	
	onChangingForced: true,
	_allowKeys: "0123456789"+zk.MINUS
});

})();


zul.inp.Errorbox = zk.$extends(zul.wgt.Popup, {
	$init: function () {
		this.$supers('$init', arguments);
		this.setWidth("260px");
		this.setSclass('z-errbox');
	},
	
	show: function (owner, msg) {
		this.parent = owner; 
		this.parent.__ebox = this;
		this.msg = msg;
		jq(document.body).append(this);
		this.open(owner, null, "end_before", {overflow:true});
		zWatch.listen({onHide: [this.parent, this.onParentHide]});
	},
	
	destroy: function () {
		if (this.parent) {
			zWatch.unlisten({onHide: [this.parent, this.onParentHide]});
			delete this.parent.__ebox;
		}
		this.close();
		this.unbind();
		jq(this).remove();
		this.parent = null;
	},
	onParentHide: function () {
		if (this.__ebox) {
			this.__ebox.setFloating_(false);
			this.__ebox.close();
		}
	},
	
	bind_: function () {
		this.$supers(zul.inp.Errorbox, 'bind_', arguments);

		var Errorbox = zul.inp.Errorbox;
		this._drag = new zk.Draggable(this, null, {
			starteffect: zk.$void,
			endeffect: Errorbox._enddrag,
			ignoredrag: Errorbox._ignoredrag,
			change: Errorbox._change
		});
		zWatch.listen({onScroll: this});
	},
	unbind_: function () {
		this._drag.destroy();
		zWatch.unlisten({onScroll: this});
		
		
		if (this.parent)
			zWatch.unlisten({onHide: [this.parent, this.onParentHide]});
		
		this.$supers(zul.inp.Errorbox, 'unbind_', arguments);
		this._drag = null;
	},
	
	onScroll: function (wgt) {
		if (wgt) { 
			this.position(this.parent, null, "end_before", {overflow:true});
			this._fixarrow();
		}
	},
	setDomVisible_: function (node, visible) {
		this.$supers('setDomVisible_', arguments);
		var stackup = this._stackup;
		if (stackup) stackup.style.display = visible ? '': 'none';
	},
	doMouseMove_: function (evt) {
		var el = evt.domTarget;
		if (el == this.$n('c')) {
			var y = evt.pageY,
				$el = jq(el),
				size = zk.parseInt($el.css('padding-right'))
				offs = $el.zk.revisedOffset();
			$el[y >= offs[1] && y < offs[1] + size ? 'addClass':'removeClass']('z-errbox-close-over');
		} else this.$supers('doMouseMove_', arguments);
	},
	doMouseOut_: function (evt) {
		var el = evt.domTarget;
		if (el == this.$n('c'))
			jq(el).removeClass('z-errbox-close-over');
		else
			this.$supers('doMouseOut_', arguments);
	},
	doClick_: function (evt) {
		var p = evt.domTarget;
		if (p == this.$n('c')) {
			if ((p = this.parent) && p.clearErrorMessage)
				p.clearErrorMessage(true, true);
			else
				zAu.wrongValue_(p, false);
		} else {
			this.$supers('doClick_', arguments);
			this.parent.focus(0);
		}
	},
	open: function () {
		this.$supers('open', arguments);
		this.setTopmost();
		this._fixarrow();
	},
	prologHTML_: function (out) {
		var id = this.uuid;
		out.push('<div id="', id);
		out.push('-a" class="z-errbox-left z-arrow" title="')
		out.push(zUtl.encodeXML(msgzk.GOTO_ERROR_FIELD));
		out.push('"><div id="', id, '-c" class="z-errbox-right z-errbox-close"><div class="z-errbox-center">');
		out.push(zUtl.encodeXML(this.msg, {multiline:true})); 
		out.push('</div></div></div>');
	},
	onFloatUp: function (ctl) {
		var wgt = ctl.origin;
		if (wgt == this) {
			this.setTopmost();
			return;
		}
		if (!wgt || wgt == this.parent || !this.isVisible())
			return;

		var top1 = this, top2 = wgt;
		while ((top1 = top1.parent) && !top1.isFloating_())
			;
		for (; top2 && !top2.isFloating_(); top2 = top2.parent)
			;
		if (top1 == top2) { 
			var n = wgt.$n();
			if (n) this._uncover(n);
		}
	},
	_uncover: function (el) {
		var elofs = zk(el).cmOffset(),
			node = this.$n(),
			nodeofs = zk(node).cmOffset();

		if (jq.isOverlapped(
		elofs, [el.offsetWidth, el.offsetHeight],
		nodeofs, [node.offsetWidth, node.offsetHeight])) {
			var parent = this.parent.$n(), y;
			var ptofs = zk(parent).cmOffset(),
				pthgh = parent.offsetHeight,
				ptbtm = ptofs[1] + pthgh;
			y = elofs[1] + el.offsetHeight <=  ptbtm ? ptbtm: ptofs[1] - node.offsetHeight;
				

			var ofs = zk(node).toStyleOffset(0, y);
			node.style.top = ofs[1] + "px";
			this._fixarrow();
		}
	},
	_fixarrow: function () {
		var parent = this.parent.$n(),
			node = this.$n(),
			arrow = this.$n('a'),
			ptofs = zk(parent).revisedOffset(),
			nodeofs = zk(node).revisedOffset();
		var dx = nodeofs[0] - ptofs[0], dy = nodeofs[1] - ptofs[1], dir;
		if (dx >= parent.offsetWidth - 2) {
			dir = dy < -10 ? "ld": dy >= parent.offsetHeight - 2 ? "lu": "l";
		} else if (dx < 0) {
			dir = dy < -10 ? "rd": dy >= parent.offsetHeight - 2 ? "ru": "r";
		} else {
			dir = dy < 0 ? "d": "u";
		}
		arrow.className = 'z-errbox-left z-arrow-' + dir;
	}
},{
	_enddrag: function (dg) {
		var errbox = dg.control;
		errbox.setTopmost();
		errbox._fixarrow();
	},
	_ignoredrag: function (dg, pointer, evt) {
		var c = dg.control.$n('c');
		return evt.domTarget == c && jq(c).hasClass('z-errbox-close-over');
	},
	_change: function (dg) {
		var errbox = dg.control,
			stackup = errbox._stackup;
		if (stackup) {
			var el = errbox.$n();
			stackup.style.top = el.style.top;
			stackup.style.left = el.style.left;
		}
		errbox._fixarrow();
	}
});

zkreg('zul.inp.Errorbox');

zul.inp.SimpleConstraint = zk.$extends(zk.Object, {
	
	$init: function (a, b, c) {
		if (typeof a == 'string') {
			this._flags = {};
			this._init(a);
		} else {
			this._flags = typeof a == 'number' ? this._cvtNum(a): a||{};
			this._regex = typeof b == 'string' ? new RegExp(b): b;
			this._errmsg = c; 
			if (this._flags.SERVER)
				this.serverValidate = true;
		}
	},	
	_init: function (cst) {
		l_out:
		for (var j = 0, k = 0, len = cst.length; k >= 0; j = k + 1) {
			for (;; ++j) {
				if (j >= len) return; 

				var cc = cst.charAt(j);
				if (cc == '/') {
					for (k = ++j;; ++k) { 
						if (k >= len) { 
							k = -1;
							break;
						}

						cc = cst.charAt(k);
						if (cc == '/') break; 
						if (cc == '\\') ++k; 
					}
					this._regex = new RegExp(k >= 0 ? cst.substring(j, k): cst.substring(j));
					continue l_out;
				}
				if (cc == ':') {
					this._errmsg = cst.substring(j + 1).trim();
					return; 
				}
				if (!zUtl.isChar(cc,{whitespace:1}))
					break;
			}

			var s;
			for (k = j;; ++k) {
				if (k >= len) {
					s = cst.substring(j);
					k = -1;
					break;
				}
				var cc = cst.charAt(k);
				if (cc == ',' || cc == ':' || cc == ';' || cc == '/') {
					if (this._regex && j == k) {
						j++;
						continue;
					}
					s = cst.substring(j, k);
					if (cc == ':' || cc == '/') --k;
					break;
				}
			}

			this.parseConstraint_(s.trim().toLowerCase());
		}
	},
	
	getFlags: function () {
		return tis._flags;
	},
	
	parseConstraint_: function (cst) {
		var f = this._flags;
		if (cst == "no positive")
			f.NO_POSITIVE = true;
		else if (cst == "no negative")
			f.NO_NEGATIVE = true;
		else if (cst == "no zero")
			f.NO_ZERO = true;
		else if (cst == "no empty")
			f.NO_EMPTY = true;
		else if (cst == "no future")
			f.NO_FUTURE = true;
		else if (cst == "no past")
			f.NO_PAST = true;
		else if (cst == "no today")
			f.NO_TODAY = true;
		else if (cst == "strict")
			f.STRICT = true;
		else if (cst == "server") {
			f.SERVER = true;
			this.serverValidate = true;
		} else if (zk.debugJS)
			zk.error("Unknown constraint: "+cst);
	},
	_cvtNum: function (v) { 
		var f = {};
		if (v & 1)
			f.NO_POSITIVE = f.NO_FUTURE = true;
		if (v & 2)
			f.NO_NEGATIVE = f.NO_PAST = true;
		if (v & 4)
			f.NO_ZERO = f.NO_TODAY = true;
		if (v & 0x100)
			f.NO_EMPTY = true;
		if (v & 0x200)
			f.STRICT = true;
		return f;
	},
	
	validate: function (wgt, val) {
		var f = this._flags,
			msg = this._errmsg;

		switch (typeof val) {
		case 'string':
			if (f.NO_EMPTY && (!val || !val.trim()))
				return msg || msgzul.EMPTY_NOT_ALLOWED;
			var regex = this._regex;
			if (regex && !regex.test(val))
				return msg || msgzul.ILLEGAL_VALUE;
			if (f.STRICT && val && wgt.validateStrict) {
				msg = wgt.validateStrict(val);
				if (msg) return msg;
			}
			return;
		case 'number':
			if (val > 0) {
				if (f.NO_POSITIVE) return msg || this._msgNumDenied();
			} else if (val == 0) {
				if (f.NO_ZERO) return msg || this._msgNumDenied();
			} else
				if (f.NO_NEGATIVE) return msg || this._msgNumDenied();
			return;
		}

		if (val && val.getFullYear) {
			var today = zUtl.today(),
				val = new Date(val.getFullYear(), val.getMonth(), val.getDate());
			if ((today - val)/ 86400000 < 0) {
				if (f.NO_FUTURE) return msg || this._msgDateDenied();
			} else if (val - today == 0) {
				if (f.NO_TODAY) return msg || this._msgDateDenied();
			} else
				if (f.NO_PAST) return msg || this._msgDateDenied();
			return;
		}

		if (val && val.compareTo) {
			var b = val.compareTo(0);
			if (b > 0) {
				if (f.NO_POSITIVE) return msg || this._msgNumDenied();
			} else if (b == 0) {
				if (f.NO_ZERO) return msg || this._msgNumDenied();
			} else
				if (f.NO_NEGATIVE) return msg || this._msgNumDenied();
			return;
		}

		if (!val && f.NO_EMPTY) return msg || msgzul.EMPTY_NOT_ALLOWED;
	},
	_msgNumDenied: function () {
		var f = this._flags,
			msg = this._errmsg;
		if (f.NO_POSITIVE)
			return msg || (f.NO_ZERO ?
				f.NO_NEGATIVE ? msgzul.NO_POSITIVE_NEGATIVE_ZERO: msgzul.NO_POSITIVE_ZERO:
				f.NO_NEGATIVE ? msgzul.NO_POSITIVE_NEGATIVE: msgzul.NO_POSITIVE);
		else if (f.NO_NEGATIVE)
			return msg || (f.NO_ZERO ? msgzul.NO_NEGATIVE_ZERO: msgzul.NO_NEGATIVE);
		else if (f.NO_ZERO)
			return msg || msgzul.NO_ZERO;
		return msg || msgzul.ILLEGAL_VALUE;
	},
	_msgDateDenied: function () {
		var f = this._flags,
			msg = this._errmsg;
		if (f.NO_FUTURE)
			return msg || (f.NO_TODAY ?
				f.NO_PAST ? NO_FUTURE_PAST_TODAY: msgzul.NO_FUTURE_TODAY:
				f.NO_PAST ? msgzul.NO_FUTURE_PAST: msgzul.NO_FUTURE);
		else if (f.NO_PAST)
			return msg || (f.NO_TODAY ? msgzul.NO_PAST_TODAY: msgzul.NO_PAST);
		else if (f.NO_TODAY)
			return msg || msgzul.NO_TODAY;
		return msg || msgzul.ILLEGAL_VALUE;
	}
});


zul.inp.SimpleSpinnerConstraint = zk.$extends(zul.inp.SimpleConstraint, {
	$define: {
		
		
		min: _zkf = function(){},
		
		
		max: _zkf
	},
	parseConstraint_: function(cst){
		var cstList = cst.replace(/ +/g,' ').split(/[, ]/),
			len = cstList.length,
			isSpinner;
		for(var i=0; i<len+1; i++){
			if (cstList[i] == 'min') {
				this._min = cstList[++i] * 1;
				isSpinner = true;
			} else if (cstList[i] == 'max') {
				this._max = cstList[++i] * 1;
				isSpinner = true;
			}
		}
		if (isSpinner) return;
		else
			return this.$supers('parseConstraint_', arguments);
	},
	validate: function (wgt, val) {
		switch (typeof val) {
			case 'number':
				if ((this._max && val > this._max) || (this._min && val < this._min)) {
					var msg = msgzul.OUT_OF_RANGE + ': ';
					msg += "(" + this._min != null ? this._max != null ?
							this._min + " ~ " + this._max: ">= " + this._min: "<= " + this._max + ")";
				}	
		}
		if(msg)
			return msg;
		else
			return this.$supers('validate',arguments);
	}
});


zul.inp.SimpleDateConstraint = zk.$extends(zul.inp.SimpleConstraint, {
	format: 'yyyyMMdd',
	parseConstraint_: function(constraint){
		if (constraint.startsWith("between")) {
			var j = constraint.indexOf("and", 7);
			if (j < 0 && zk.debugJS) 
				zk.error('Unknown constraint: ' + constraint);
			this._beg = new zk.fmt.Calendar().parseDate(constraint.substring(7, j), this.format);
			this._end = new zk.fmt.Calendar().parseDate(constraint.substring(j + 3), this.format);
			if (this._beg.getTime() > this._end.getTime()) {
				var d = this._beg;
				this._beg = this._end;
				this._end = d;
			}
				
			this._beg.setHours(0);
			this._beg.setMinutes(0);
			this._beg.setSeconds(0);
			this._beg.setMilliseconds(0);
			
			this._end.setHours(0);
			this._end.setMinutes(0);
			this._end.setSeconds(0);
			this._end.setMilliseconds(0);
			return;
		} else if (constraint.startsWith("before")) {
			this._end = new zk.fmt.Calendar().parseDate(constraint.substring(6), this.format);
			this._end.setHours(0);
			this._end.setMinutes(0);
			this._end.setSeconds(0);
			this._end.setMilliseconds(0);
			return;
		} else if (constraint.startsWith("after")) {
			this._beg = new zk.fmt.Calendar().parseDate(constraint.substring(5), this.format);
			this._beg.setHours(0);
			this._beg.setMinutes(0);
			this._beg.setSeconds(0);
			this._beg.setMilliseconds(0);
			return;
		}
		return this.$supers('parseConstraint_', arguments);
	},
	validate: function (wgt, val) {
		if (typeof val.getTime == 'function') {
			var v = new Date(val.getFullYear(), val.getMonth(), val.getDate());
			if (this._beg != null && this._beg.getTime() > v.getTime())
				return this.outOfRangeValue();
			if (this._end != null && this._end.getTime() < v.getTime())
				return this.outOfRangeValue();
		}
		return this.$supers('validate', arguments);
	},
	
	outOfRangeValue: function () {
		return msgzul.OUT_OF_RANGE + ': ' + (this._beg != null ? this._end != null ?
				new zk.fmt.Calendar().formatDate(this._beg, this.format) + " ~ "
					+ new zk.fmt.Calendar().formatDate(this._end, this.format) :
					">= " + new zk.fmt.Calendar().formatDate(this._beg, this.format):
					"<= " + new zk.fmt.Calendar().formatDate(this._end, this.format));
	}
});


zul.inp.Textbox = zk.$extends(zul.inp.InputWidget, {
	_value: '',
	_rows: 1,

	$define: {
		
		
		multiline: function () {
			this.rerender();
		},
		
		
		tabbable: null,
		
		
		rows: function (v) {
			var inp = this.getInputNode();
			if (inp && this.isMultiline())
				inp.rows = v;
		},
		
		
		type: function (type) {
			var inp = this.getInputNode();
			if (inp)
				inp.type = type;
		}
	},

	
	textAttrs_: function () {
		var html = this.$supers('textAttrs_', arguments);
		if (this._multiline)
			html += ' rows="' + this._rows + '"';
		return html;
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-textbox";
	}
});

zkreg('zul.inp.Textbox');zk._m={};
zk._m['default']=
function (out) {
	if(this.isMultiline()) 
		out.push('<textarea', this.domAttrs_(), '>', this._areaText(), '</textarea>');
	else
		out.push('<input', this.domAttrs_(), '/>');
}
;zkmld(zk._p.p.Textbox,zk._m);

zul.inp.FormatWidget = zk.$extends(zul.inp.InputWidget, {
	$define: { 
		
		
		format: function () {
			var inp = this.getInputNode();
			if (inp)
				inp.value = this.coerceToString_(this._value);
		}
	},
	setValue: function (val) {
		var args;
		if (val) {
			args = [];
			for (var j = arguments.length; --j > 0;)
				args.unshift(arguments[j]);

			args.unshift((typeof val == 'string') ? this.coerceFromString_(val) : val);
		} else
			args = arguments;
		this.$supers('setValue', args);
	}
});



zul.inp.Intbox = zk.$extends(zul.inp.FormatWidget, {
	
	intValue: function (){
		return this.$supers('getValue', arguments);
	},
	coerceFromString_: function (value) {
		if (!value) return null;

		var info = zk.fmt.Number.unformat(this._format, value),
			val = parseInt(info.raw, 10);
		
		if (isNaN(val) || (info.raw != ''+val && info.raw != '-'+val))
			return {error: zk.fmt.Text.format(msgzul.INTEGER_REQUIRED, value)};
		if (val > 2147483647 || val < -2147483648)
			return {error: zk.fmt.Text.format(msgzul.OUT_OF_RANGE+'(−2147483648 - 2147483647)')};

		if (info.divscale) val = Math.round(val / Math.pow(10, info.divscale));
		return val;
	},
	coerceToString_: function (value) {
		var fmt = this._format;
		return fmt ? zk.fmt.Number.format(fmt, value, this._rounding): value != null  ? ''+value: '';
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-intbox";
	},
	doKeyPress_: function(evt){
		if (!this._shallIgnore(evt, zul.inp.InputWidget._allowKeys))
			this.$supers('doKeyPress_', arguments);
	}
});
zkreg('zul.inp.Intbox');zk._m={};
zk._m['default']=
function (out) {
	out.push('<input', this.domAttrs_(), '/>');
}
;zkmld(zk._p.p.Intbox,zk._m);

zul.inp.Longbox = zk.$extends(zul.inp.FormatWidget, {
	
	coerceFromString_: function (value) {
		if (!value) return null;
	
		var info = zk.fmt.Number.unformat(this._format, value),
			val = new zk.Long(info.raw),
			sval = val.$toString();
		if (info.raw != sval && info.raw != '-'+sval) 
			return {error: zk.fmt.Text.format(msgzul.INTEGER_REQUIRED, value)};
		if (this._isOutRange(info.raw))
			return {error: zk.fmt.Text.format(msgzul.OUT_OF_RANGE+'(−9223372036854775808 - 9223372036854775807)')};
		return val;
	},
	coerceToString_: function(value) {
		var fmt = this._format;
		return value != null ? typeof value == 'string' ? value : 
			fmt ? zk.fmt.Number.format(fmt, value.$toString(), this._rounding) : value.$toLocaleString() : '';
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-longbox";
	},
	doKeyPress_: function(evt){
		if (!this._shallIgnore(evt, zul.inp.InputWidget._allowKeys))
			this.$supers('doKeyPress_', arguments);
	},
	_isOutRange: function(val) {
		var negative = val.charAt(0) == '-';
		if (negative)
			val = val.substring(1);
		if (val.length > 19)
			return true;
		if (val.length < 19)
			return false;
		var maxval = negative ? '9223372036854775808' : '9223372036854775807';
		for(var j=0; j < 19; ++j) {
			if (val.charAt(j) > maxval.charAt(j))
				return true;
			if (val.charAt(j) < maxval.charAt(j))
				return false;
		}
		return false;
	}
});
zkreg('zul.inp.Longbox');zk._m={};
zk._m['default']=[zk._p.p.Intbox,'default'];zkmld(zk._p.p.Longbox,zk._m);
(function () {
	var _allowKeys = zul.inp.InputWidget._allowKeys+zk.DECIMAL+zk.PERCENT+zk.GROUPING+'e';
		

zul.inp.Doublebox = zk.$extends(zul.inp.FormatWidget, {
	coerceFromString_: function (value) {
		if (!value) return null;

		var info = zk.fmt.Number.unformat(this._format, value),
			raw = info.raw,
			val = parseFloat(raw),
			valstr = ''+val,
			valind = valstr.indexOf('.'),
			rawind = raw.indexOf('.');
		
		if (rawind == 0) {
			raw = '0' + raw;
			++rawind;
		}
		
		if (rawind >= 0 && raw.substring(raw.substring(rawind+1)) && valind < 0) { 
			valind = valstr.length;
			valstr += '.';
		}

		var len = raw.length,	
			vallen = valstr.length;
		
		
		if (valind >=0 && valind < rawind) {
			vallen -= valind;
			len -= rawind;
			for(var zerolen = rawind - valind; zerolen-- > 0;)
				valstr = '0' + valstr;
		}
		
		
		if (vallen < len) {
			for(var zerolen = len - vallen; zerolen-- > 0;)
				valstr += '0';
		}
		
		if (isNaN(val) || (raw != valstr && raw != '-'+valstr && raw.indexOf('e') < 0)) 
			return {error: zk.fmt.Text.format(msgzul.NUMBER_REQUIRED, value)};

		if (info.divscale) val = val / Math.pow(10, info.divscale);
		return val;
	},
	_allzero: function(val) {
		for(var len= val.length; len-- > 0; )
			if (val.charAt(len) != '0') return false;
		return true;
	},
	coerceToString_: function(value) {
		var fmt = this._format;
		return value == null ? '' : fmt ? 
			zk.fmt.Number.format(fmt, value, this._rounding) : 
			zk.DECIMAL == '.' ? (''+value) : (''+value).replace('.', zk.DECIMAL);
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-doublebox";
	},
	doKeyPress_: function(evt){
		if (!this._shallIgnore(evt, _allowKeys))
			this.$supers('doKeyPress_', arguments);
	}
});

})();

zkreg('zul.inp.Doublebox');zk._m={};
zk._m['default']=[zk._p.p.Intbox,'default'];zkmld(zk._p.p.Doublebox,zk._m);
(function () {
	var _allowKeys = zul.inp.InputWidget._allowKeys+zk.DECIMAL+zk.PERCENT+zk.GROUPING;


zul.inp.Decimalbox = zk.$extends(zul.inp.FormatWidget, {
	coerceFromString_: function (value) {
		if (!value) return null;

		var info = zk.fmt.Number.unformat(this._format, value),
			val = new zk.BigDecimal(info.raw),
			sval = val.$toString();
		if (info.raw != sval && info.raw != '-'+sval) 
			return {error: zk.fmt.Text.format(msgzul.NUMBER_REQUIRED, value)};
		if (info.divscale) val.setPrecision(val.getPrecision() + info.divscale);
		return val;
	},
	coerceToString_: function(value) {
		var fmt = this._format;
		return value != null ? typeof value == 'string' ? value : 
			fmt ? zk.fmt.Number.format(fmt, value.$toString(), this._rounding) : value.$toLocaleString() : '';
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-decimalbox";
	},
	doKeyPress_: function(evt){
		if (!this._shallIgnore(evt, _allowKeys))
			this.$supers('doKeyPress_', arguments);
	}
});

})();

zkreg('zul.inp.Decimalbox');zk._m={};
zk._m['default']=[zk._p.p.Intbox,'default'];zkmld(zk._p.p.Decimalbox,zk._m);

zul.inp.ComboWidget = zk.$extends(zul.inp.InputWidget, {
	_buttonVisible: true,

	$define: {
		
		
		buttonVisible: function (v) {
			var n = this.$n('btn'),
				zcls = this.getZclass();
			if (n) {
				if (!this.inRoundedMold()) {
					jq(n)[v ? 'show': 'hide']();
					jq(this.getInputNode())[v ? 'removeClass': 'addClass'](zcls + '-right-edge');
				} else {
					var fnm = v ? 'removeClass': 'addClass';
					jq(n)[fnm](zcls + '-btn-right-edge');
					
					if (zk.ie6_) {						
						jq(n)[fnm](zcls + 
							(this._readonly ? '-btn-right-edge-readonly':'-btn-right-edge'));
						
						if (jq(this.getInputNode()).hasClass(zcls + "-text-invalid"))
							jq(n)[fnm](zcls + "-btn-right-edge-invalid");
					}
				}
				this.onSize();
			}
		},
		
		
		autodrop: null
	},
	setWidth: function () {
		this.$supers('setWidth', arguments);
		if (this.desktop) {
			this.onSize();
		}
	},
	onSize: _zkf = function () {
		var width = this.getWidth();
		if (!width || width.indexOf('%') != -1)
			this.getInputNode().style.width = '';
		this.syncWidth();
	},
	onShow: _zkf,
	
	onFloatUp: function (ctl) {
		if (jq(this.$n('pp')).is(':animated') || (!this._inplace && !this.isOpen()))
			return;
		var wgt = ctl.origin;
		if (!zUtl.isAncestor(this, wgt)) {
			if (this.isOpen())
				this.close({sendOnOpen: true});
			if (this._inplace) {
				var n = this.$n(),
					inplace = this.getInplaceCSS();
				
				if (jq(n).hasClass(inplace)) return;
				
				n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));
				jq(this.getInputNode()).addClass(inplace);
				jq(n).addClass(inplace);
				this.onSize();
				n.style.width = this.getWidth() || '';
			}
		}
	},
	onResponse: function (ctl, opts) {
		if (opts.rtags.onOpen && this.isOpen()) {
			if (zk.animating()) {
				var self = this;
				setTimeout(function() {self.onResponse(ctl, opts);}, 50);
				return;
			}
			var pp = this.$n('pp'),
				pz = this.getPopupSize_(pp);
			pp.style.height = pz[1];
			
			
			if (!zk.ie6_)
				pp.style.width = pz[0];
			this._fixsz(pz);
		}
	},
	
	setOpen: function (open, opts) {
		if (open) this.open(opts);
		else this.close(opts);
	},
	
	isOpen: function () {
		return this._open;
	},
	
	open: function (opts) {
		if (this._open) return;
		this._open = true;
		if (opts && opts.focus)
			this.focus();

		var pp = this.$n('pp'),
			inp = this.getInputNode();
		if (!pp) return;

		zWatch.fire('onFloatUp', this); 
		var topZIndex = this.setTopmost();

		var ppofs = this.getPopupSize_(pp);
		pp.style.width = ppofs[0];
		pp.style.height = "auto";
		pp.style.zIndex = topZIndex > 0 ? topZIndex : 1 ; 

		var pp2 = this.$n("cave");
		if (pp2) pp2.style.width = pp2.style.height = "auto";

		pp.style.position = "absolute"; 
		pp.style.display = "block";

		
		pp.style.visibility = "hidden";
		pp.style.left = "-10000px";

		
		
		
		
		
		var $pp = zk(pp);
		$pp.makeVParent();

		
		pp.style.left = "";
		this._fixsz(ppofs);
		$pp.position(inp, "after_start");
		pp.style.display = "none";
		pp.style.visibility = "";

		zk(pp).slideDown(this, {afterAnima: this._afterSlideDown});

		
		
		
		if (zk.gecko) {
			var rows = pp2 ? pp2.rows: null;
			if (rows) {
				var gap = pp.offsetHeight - pp.clientHeight;
				if (gap > 10 && pp.offsetHeight < 150) { 
					var hgh = 0;
					for (var j = rows.length; j--;)
						hgh += rows[j].offsetHeight;
					pp.style.height = (hgh + 20) + "px";
						
				}
			}
		}

		if (!this._shadow)
			this._shadow = new zk.eff.Shadow(pp,
				{left: -4, right: 4, top: -2, bottom: 3});

		if (opts && opts.sendOnOpen)
			this.fire('onOpen', {open:true, value: inp.value}, {rtags: {onOpen: 1}});
	},
	zsync: function () {
		this.$supers('zsync', arguments);
		if (!zk.css3 && this.isOpen() && this._shadow)
			this._shadow.sync();
	},
	_afterSlideDown: function (n) {
		if (this._shadow) this._shadow.sync();
	},
	
	close: function (opts) {
		if (!this._open) return;
		if (zk.animating()) {
			var self = this;
			setTimeout(function() {self.close(opts);}, 50);
			return;
		}
		this._open = false;
		if (opts && opts.focus)
			this.focus();

		var pp = this.$n('pp');
		if (!pp) return;

		pp.style.display = "none";
		zk(pp).undoVParent();
		if (this._shadow) {
			this._shadow.destroy();
			this._shadow = null;
		}
		var n = this.$n('btn');
		if (n) jq(n).removeClass(this.getZclass() + '-btn-over');

		if (opts && opts.sendOnOpen)
			this.fire('onOpen', {open:false, value: this.getInputNode().value}, {rtags: {onOpen: 1}});

		zWatch.fireDown("onHide", this);
	},
	_fixsz: function (ppofs) {
		var pp = this.$n('pp');
		if (!pp) return;

		var pp2 = this.$n('cave');
		if (ppofs[1] == "auto" && pp.offsetHeight > 250) {
			pp.style.height = "250px";
		} else if (pp.offsetHeight < 10) {
			pp.style.height = "10px"; 
		}

		if (ppofs[0] == "auto") {
			var cb = this.$n();
			if (pp.offsetWidth < cb.offsetWidth) {
				pp.style.width = cb.offsetWidth + "px";
				if (pp2) pp2.style.width = "100%";
					
					
			} else {
				var wd = jq.innerWidth() - 20;
				if (wd < cb.offsetWidth) wd = cb.offsetWidth;
				if (pp.offsetWidth > wd) pp.style.width = wd;
			}
		}
	},

	dnPressed_: zk.$void, 
	upPressed_: zk.$void, 
	otherPressed_: zk.$void, 
	
	enterPressed_: function (evt) {
		this.close({sendOnOpen:true});
		this.updateChange_();
		evt.stop();
	},
	
	escPressed_: function (evt) {
		this.close({sendOnOpen:true});
		evt.stop();
	},

	
	getPopupSize_: function (pp) {
		return ['auto', 'auto'];
	},

	
	redraw_: function (out) {
		var uuid = this.uuid,
			zcls = this.getZclass();
		out.push('<i', this.domAttrs_({text:true}), '><input id="',
			uuid, '-real" class="', zcls, '-inp" autocomplete="off"',
			this.textAttrs_(), '/><i id="', uuid, '-btn" class="',
			zcls, '-btn');

		if (this.inRoundedMold()) {
			if (!this._buttonVisible)
				out.push(' ', zcls, '-btn-right-edge');
			if (this._readonly)
				out.push(' ', zcls, '-btn-readonly');	
			if (zk.ie6_ && !this._buttonVisible && this._readonly)
				out.push(' ', zcls, '-btn-right-edge-readonly');
		} else if (!this._buttonVisible)
			out.push('" style="display:none');

		out.push('"></i>');

		this.redrawpp_(out);

		out.push('</i>');
	},
	
	redrawpp_: function (out) {
	},

	
	syncWidth: function () {
		var node = this.$n();
		if (!zk(node).isRealVisible() || (!this._inplace && !node.style.width))
			return;
		
		if (this._buttonVisible && this._inplace) {
			if (!node.style.width) {
				var $n = jq(node),
					inc = this.getInplaceCSS();
				$n.removeClass(inc);
				if (zk.opera)
					node.style.width = jq.px0(zk(node).revisedWidth(node.clientWidth) + zk(node).borderWidth());
				else
					node.style.width = jq.px0(zk(node).revisedWidth(node.offsetWidth));
				$n.addClass(inc);
			}
		}
		var inp = this.getInputNode();
		if (zk.ie6_)			
			inp.style.width = jq.px(0);
		var width = zk.opera ? zk(node).revisedWidth(node.clientWidth) + zk(node).borderWidth()
							 : zk(node).revisedWidth(node.offsetWidth),
			btn = this.$n('btn');
		inp.style.width = jq.px0(zk(inp).revisedWidth(width - (btn ? btn.offsetWidth : 0)));
	},
	doFocus_: function (evt) {
		var n = this.$n();
		if (this._inplace)
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));
			
		this.$supers('doFocus_', arguments);

		if (this._inplace) {
			if (jq(n).hasClass(this.getInplaceCSS())) {
				jq(n).removeClass(this.getInplaceCSS());
				this.onSize();
			}
		}
	},
	doBlur_: function (evt) {
		var n = this.$n();
		if (this._inplace && this._inplaceout) {
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));
		}
		this.$supers('doBlur_', arguments);
		if (this._inplace && this._inplaceout) {
			jq(n).addClass(this.getInplaceCSS());
			this.onSize();
			n.style.width = this.getWidth() || '';
		}
	},
	afterKeyDown_: function (evt) {
		if (this._inplace)
			jq(this.$n()).toggleClass(this.getInplaceCSS(),  evt.keyCode == 13 ? null : false);
			
		this.$supers('afterKeyDown_', arguments);
	},
	bind_: function () {
		this.$supers(zul.inp.ComboWidget, 'bind_', arguments);

		var btn = this.$n('btn'),
			inp = this.getInputNode();
			
		if (this._inplace)
			jq(inp).addClass(this.getInplaceCSS());
			
		if (btn) {
			this._auxb = new zul.Auxbutton(this, btn, inp);
			this.domListen_(btn, 'onClick', '_doBtnClick');
		}
		if (this._readonly && !this.inRoundedMold())
			jq(inp).addClass(this.getZclass() + '-right-edge');
		
		zWatch.listen({onSize: this, onShow: this, onFloatUp: this, onResponse: this});
		if (!zk.css3) jq.onzsync(this);
		
		this.setFloating_(true,{node:this.$n('pp')});
	},
	unbind_: function () {
		this.close();

		var btn = this.$n('btn');
		if (btn) {
			this._auxb.cleanup();
			this._auxb = null;
			this.domUnlisten_(btn, 'onClick', '_doBtnClick');
		}

		zWatch.unlisten({onSize: this, onShow: this, onFloatUp: this, onResponse: this});
		if (!zk.css3) jq.unzsync(this);
		
		this.$supers(zul.inp.ComboWidget, 'unbind_', arguments);
	},
	_doBtnClick: function (evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (!this._disabled && !zk.animating()) {		
			if (this._open) this.close({focus:true,sendOnOpen:true});
			else this.open({focus:true,sendOnOpen:true});	
		}
		evt.stop();
	},
	doKeyDown_: function (evt) {
		this._doKeyDown(evt);
		if (!evt.stopped)
			this.$supers('doKeyDown_', arguments);
	},
	doClick_: function (evt) {
		if (!this._disabled) {
			if (evt.domTarget == this.$n('pp'))
				this.close({
					focus: true,
					sendOnOpen: true
				});
			else if (this._readonly && !this.isOpen() && this._buttonVisible)
				this.open({
					focus: true,
					sendOnOpen: true
				});
			this.$supers('doClick_', arguments);
		}
	},
	_doKeyDown: function (evt) {
		var keyCode = evt.keyCode,
			bOpen = this._open;
		if (keyCode == 9 || (zk.safari && keyCode == 0)) { 
			if (bOpen) this.close({sendOnOpen:true});
			return;
		}

		if (evt.altKey && (keyCode == 38 || keyCode == 40)) {
			if (bOpen) this.close({sendOnOpen:true});
			else this.open({sendOnOpen:true});

			
			var opts = {propagation:true};
			if (zk.ie) opts.dom = true;
			evt.stop(opts);
			return;
		}

		
		if (bOpen && (keyCode == 13 || keyCode == 27)) { 
			if (keyCode == 13) this.enterPressed_(evt);
			else this.escPressed_(evt);
			return;
		}

		if (keyCode == 18 || keyCode == 27 || keyCode == 13
		|| (keyCode >= 112 && keyCode <= 123)) 
			return; 

		if (this._autodrop && !bOpen)
			this.open({sendOnOpen:true});

		if (keyCode == 38) this.upPressed_(evt);
		else if (keyCode == 40) this.dnPressed_(evt);
		else this.otherPressed_(evt);
	},
	onChildAdded_: _zkf = function (child) {
		if (this._shadow) this._shadow.sync();
	},
	onChildRemoved_: _zkf,
	onChildVisible_: _zkf
});



zul.inp.Combobox = zk.$extends(zul.inp.ComboWidget, {
	_autocomplete: true,

	$define: {
		
		
		autocomplete: null,
		
		repos: function () {
			if (this.desktop) {
				var n = this.getInputNode(),
					ofs;
				n.value = this.valueEnter_ != null ? this.valueEnter_ : this._value || '';
				
				
				if (zk.ie && n.value) {
					ofs = n.value.length;
					ofs = [ofs, ofs];
				}
				this._typeahead(this._bDel, ofs);
				this._bDel = null;
			}
			this._repos = false;
		}
	},
	setValue: function (val) {
		this.$supers('setValue', arguments);
		this._reIndex();
		this.valueEnter_ = null; 
	},
	_reIndex: function () {
		var value = this.getValue();
		if (!this._sel || value != this._sel.getLabel()) {
			if (this._sel) {
				var n = this._sel.$n();
				if (n) jq(n).removeClass(this._sel.getZclass() + '-seld');
			}
			this._sel = this._lastsel = null;
			for (var w = this.firstChild; w; w = w.nextSibling) {
				if (value == w.getLabel()) {
					this._sel = w;
					break;
				}
			}
		}
	},
	
	validateStrict: function (val) {
		return this._findItem(val, true) ? null: msgzul.VALUE_NOT_MATCHED;
	},
	_findItem: function (val, strict) {
		return this._findItem0(val, strict);
	},
	_findItem0: function (val, strict, startswith, excluding) {
		var fchild = this.firstChild;
		if (fchild && val) {
			val = val.toLowerCase();
			var sel = this._sel;
			if (!sel || sel.parent != this) sel = fchild;

			for (var item = excluding ? sel.nextSibling ? sel.nextSibling : fchild : sel;;) {
				if ((!strict || !item.isDisabled()) && item.isVisible()
				&& (startswith ? item.getLabel().toLowerCase().startsWith(val) : val == item.getLabel().toLowerCase()))
					return item;
				if (!(item = item.nextSibling)) item = fchild;
				if (item == sel) break;
			}
		}
	},
	_hilite: function (opts) {
		this._hilite2(
			this._findItem(this.getInputNode().value,
				this._isStrict() || (opts && opts.strict)), opts);
	},
	_hilite2: function (sel, opts) {
		if (!opts) opts = {};

		var oldsel = this._sel;
		this._sel = sel;

		if (oldsel && oldsel.parent == this) { 
			var n = oldsel.$n();
			if (n) jq(n).removeClass(oldsel.getZclass() + '-seld');
		}

		if (sel && !sel.isDisabled())
			jq(sel.$n()).addClass(sel.getZclass() + '-seld');

		if (opts.sendOnSelect && this._lastsel != sel) {
			this._lastsel = sel;
			if (sel) { 
				var inp = this.getInputNode(),
					val = sel.getLabel();
				this.valueEnter_ = inp.value = val;
				zk(inp).setSelectionRange(0, val.length);
			}

			if (opts.sendOnChange)
				this.$supers('updateChange_', []);
			this.fire('onSelect', {items: sel?[sel]:[], reference: sel});
				
				
				
		}
	},
	_isStrict: function () {
		var strict = this.getConstraint();
		return strict && strict._flags && strict._flags.STRICT;
	},

	
	open: function (opts) {
		this.$supers('open', arguments);
		this._hilite(); 
	},
	dnPressed_: function (evt) {
		this._updnSel(evt);
	},
	upPressed_: function (evt) {
		this._updnSel(evt, true);
	},
	_updnSel: function (evt, bUp) {
		var inp = this.getInputNode(),
			val = inp.value, sel, looseSel;
		if (val) {
			val = val.toLowerCase();
			var beg = this._sel,
				last = this._next(null, !bUp);
			if (!beg || beg.parent != this) beg = this._next(null, bUp);

			
			for (var item = beg;;) {
				if (!item.isDisabled() && item.isVisible()) {
					var label = item.getLabel().toLowerCase();
					if (val == label) {
						sel = item;
						break;
					} else if (!looseSel && label.startsWith(val)) {
						looseSel = item;
						break;
					}
				}
				if ((item = this._next(item, bUp)) == beg)
					break;
			}

			if (!sel)
				sel = looseSel;

			if (sel) { 
				var ofs = zk(inp).getSelectionRange();
				if (ofs[0] == 0 && ofs[1] == val.length) 
					sel = this._next(sel, bUp); 
			} else
				sel = this._next(null, bUp);
		} else
			sel = this._next(null, true);

		if (sel)
			zk(sel).scrollIntoView(this.$n('pp'));

		this._select(sel, {sendOnSelect:true});
		evt.stop();
	},
	_next: (function() {
		function getVisibleItemOnly(item, bUp, including) {
			var next = bUp ? 'previousSibling' : 'nextSibling';
			for (var n = including ? item : item[next]; n; n = n[next])
				if (!n.isDisabled())
					return n;
			return null;
		}
		return function(item, bUp) {
			if (item)
				item = getVisibleItemOnly(item, bUp);
			return item ? item : getVisibleItemOnly(
					bUp ? this.firstChild : this.lastChild, !bUp, true);
		};
	})(),
	_select: function (sel, opts) {
		var inp = this.getInputNode(),
			val = inp.value = sel ? sel.getLabel(): '';
		this.valueSel_ = val;
		this._hilite2(sel, opts);

		
		if (val)
			zk(inp).setSelectionRange(0, val.length);
	},
	otherPressed_: function (evt) {
		var wgt = this,
			keyCode = evt.keyCode,
			bDel;
		this._bDel = bDel = keyCode == 8  || keyCode == 46 ;
		if (this._readonly)
			switch (keyCode) {
			case 35:
			case 36:
				this._hilite2();
				this.getInputNode().value = '';
				
			case 37:
			case 39:
				this._updnSel(evt, keyCode == 37 || keyCode == 35);
				break;
			case 8:
				evt.stop();
				break;
			default:
				var v = String.fromCharCode(keyCode);
				var sel = this._findItem0(v, true, true, !!this._sel);
				if (sel)
					this._select(sel, {sendOnSelect: true});
			}
		else
			setTimeout(function () {wgt._typeahead(bDel);}, zk.opera || zk.safari ? 10 : 0);
			
	},
	_typeahead: function (bDel, ofs) {
		if (zk.currentFocus != this) return;
		var inp = this.getInputNode(),
			val = inp.value,
			ofs = ofs || zk(inp).getSelectionRange(),
			fchild = this.firstChild;
		this.valueEnter_ = val;
		if (!val || !fchild
		|| ofs[0] != val.length || ofs[0] != ofs[1]) 
			return this._hilite({strict:true});

		var sel = this._findItem(val, true);
		if (sel || bDel || !this._autocomplete)
			return this._hilite2(sel);

		
		val = val.toLowerCase();
		var sel = this._sel;
		if (!sel || sel.parent != this) sel = fchild;

		for (var item = sel;;) {
			if (!item.isDisabled() && item.isVisible()
			&& item.getLabel().toLowerCase().startsWith(val)) {
				inp.value = item.getLabel();
				zk(inp).setSelectionRange(val.length, inp.value.length);
				this._hilite2(item);
				return;
			}

			if (!(item = item.nextSibling)) item = fchild;
			if (item == sel) {
				this._hilite2(); 
				return;
			}
		}
	},
	updateChange_: function () {
		if (this.$supers('updateChange_', arguments)) {
			this._hilite({sendOnSelect:true});
			return true;
		}
		this.valueEnter_ = null;
	},
	unbind_: function () {
		this._hilite2();
		this._sel = this._lastsel = null;
		this.$supers(zul.inp.Combobox, 'unbind_', arguments);
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs ? zcs: "z-combobox" + (this.inRoundedMold() ? "-rounded": "");
	},

	redrawpp_: function (out) {
		var uuid = this.uuid;
		out.push('<div id="', uuid, '-pp" class="', this.getZclass(),
		'-pp" style="display:none" tabindex="-1"><table id="',
		uuid, '-cave"', zUtl.cellps0, '>');

		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);

		out.push('</table></div>');
	}
});
zkreg('zul.inp.Combobox');zk._m={};
zk._m['rounded']=
zul.inp.Combobox.prototype.redraw_
;zk._m['default']=[zk._p.p.Combobox,'rounded'];zkmld(zk._p.p.Combobox,zk._m);

zul.inp.Comboitem = zk.$extends(zul.LabelImageWidget, {
	$define: {
		
		
		disabled: function (v) {
			var n = this.$n();
			if (n) {
				var zcls = this.getZclass() + '-disd';
				v ? jq(n).addClass(zcls): jq(n).removeClass(zcls);
			}
		},
		
		
		description: _zkf = function () {
			this.rerender();
		},
		
		
		content: _zkf
	},

	
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {pre: 1});
	},
	doMouseOver_: function () {
		if (!this._disabled) {
			var n = this.$n(),
				$n = jq(n),
				zcls = this.getZclass();
			$n.addClass($n.hasClass(zcls + '-seld') ?
				zcls + "-over-seld": zcls + "-over");
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function () {
		if (!this._disabled) this._doMouseOut();
		this.$supers('doMouseOut_', arguments);
	},
	_doMouseOut: function () {
		var n = this.$n(),
			zcls = this.getZclass();
		jq(n).removeClass(zcls + '-over')
			.removeClass(zcls + '-over-seld');
	},

	doClick_: function (evt) {
		if (!this._disabled) {
			this._doMouseOut();

			this.parent._select(this, {sendOnSelect:true, sendOnChange: true});
			this.parent.close({sendOnOpen:true});
			
			
			this.parent._shallClose = true;
			evt.stop();
		}
	},

	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (this._disabled && (!no || !no.zclass)) {
			var zcls = this.getZclass();
			scls += ' ' + zcls + '-disd';
		}
		return scls;
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-comboitem";
	}
});

zkreg('zul.inp.Comboitem');zk._m={};
zk._m['default']=
function (out) {
	var zcls = this.getZclass();
	out.push('<tr', this.domAttrs_({text:true}), '><td class="',
		zcls, '-img">', this.domImage_(), '</td><td class="',
		zcls, '-text">', this.domLabel_());

	var v;
	if (v = this._description)
		out.push('<br/><span class="', zcls, '-inner">',
			zUtl.encodeXML(v), '</span>');
	if (v = this._content)
		out.push('<span class="', zcls, '-cnt">', v, '</span>');

	out.push('</td></tr>');
}

;zkmld(zk._p.p.Comboitem,zk._m);

zul.inp.Bandbox = zk.$extends(zul.inp.ComboWidget, {
	
	getPopupSize_: function (pp) {
		var bp = this.firstChild, 
			w, h;
		if (bp) {
			w = bp._hflex == 'min' && bp._hflexsz ? jq.px0(bp._hflexsz) : bp.getWidth();
			h = bp._vflex == 'min' && bp._vflexsz ? jq.px0(bp._vflexsz) : bp.getHeight();
		}
		return [w||'auto', h||'auto'];
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-bandbox" + (this.inRoundedMold() ? "-rounded": "");
	},
	redrawpp_: function (out) {
		out.push('<div id="', this.uuid, '-pp" class="', this.getZclass(),
		'-pp" style="display:none" tabindex="-1">');

		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
	
		out.push('</div>');
	}
});

zkreg('zul.inp.Bandbox');zk._m={};
zk._m['rounded']=
zul.inp.Bandbox.prototype.redraw_
;zk._m['default']=[zk._p.p.Bandbox,'rounded'];zkmld(zk._p.p.Bandbox,zk._m);

zul.inp.Bandpopup = zk.$extends(zul.Widget, {
	
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-bandpopup";
	},
	afterChildrenMinFlex_: function(orient) {
		if (orient == 'w') {
			var bandbox = this.parent,
				pp = bandbox && bandbox.$n('pp');
			if (pp) {
				pp.style.width = jq.px0(this._hflexsz);
				zk(pp)._updateProp(['width']);
			}
		}
	}
});

zkreg('zul.inp.Bandpopup',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
}

;zkmld(zk._p.p.Bandpopup,zk._m);

zul.inp.Slider = zk.$extends(zul.Widget, {
	_orient: "horizontal",
	_curpos: 0,
	_maxpos: 100,
	_pageIncrement: 10,
	_slidingtext: "{0}",
	
	$define: {
		
		
		orient: function() {
			if (this.isVertical()) {
				this.setWidth("");
				this.setHeight("207px");
			} else {
				this.setWidth("207px");
				this.setHeight("");
			}
			this.rerender();
		},
		
		
		curpos: function() {
			if (this.desktop)
				this._fixPos();
		},
		
		
		maxpos: function() {
			if (this._curpos > this._maxpos) {
				this._curpos = this._maxpos;
				if (this.desktop) 
					this._fixPos();
			}
		},
		
		
		slidingtext: null,
		
		
		pageIncrement: null,
		
		
		name: function() {
			if (this.efield) 
				this.efield.name = this._name;
		}
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;
		
		var name = "z-slider";
		if (this.inScaleMold()) 
			return name + "-scale";
		else if (this.inSphereMold()) 
			return name + ("horizontal" == this._orient ? "-sphere-hor" : "-sphere-ver");
		else 
			return name + ("horizontal" == this._orient ? "-hor" : "-ver");
	},
	doMouseOver_: function(evt) {
		jq(this.$n("btn")).addClass(this.getZclass() + "-btn-over");
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function(evt) {
		jq(this.$n("btn")).removeClass(this.getZclass() + "-btn-over");
		this.$supers('doMouseOut_', arguments);
	},
	onup_: function(evt) {
		var btn = zul.inp.Slider.down_btn;
		if (btn) {
			var widget = zk.Widget.$(btn),
				zcls = widget.getZclass();
			jq(btn).removeClass(zcls + "-btn-drag").removeClass(zcls + "-btn-over");
		}
		
		zul.inp.Slider.down_btn = null;
		jq(document).unbind("mouseup", widget.onup_);
	},
	doMouseDown_: function(evt) {
		var btn = this.$n("btn");
		jq(btn).addClass(this.getZclass() + "-btn-drag");
		jq(document).mouseup(this.onup_);
		zul.inp.Slider.down_btn = btn;
		this.$supers('doMouseDown_', arguments);
	},
	_makeDraggable: function() {
		this._drag = new zk.Draggable(this, this.$n("btn"), {
			constraint: this._orient || "horizontal",
			starteffect: this._startDrag,
			change: this._dragging,
			endeffect: this._endDrag
		});
	},
	_snap: function(x, y) {
		var btn = this.$n("btn"), ofs = zk(this.$n()).cmOffset();
		ofs = zk(btn).toStyleOffset(ofs[0], ofs[1]);
		if (x <= ofs[0]) {
			x = ofs[0];
		} else {
			var max = ofs[0] + this._getWidth();
			if (x > max) 
				x = max;
		}
		if (y <= ofs[1]) {
			y = ofs[1];
		} else {
			var max = ofs[1] + this._getHeight();
			if (y > max) 
				y = max;
		}
		return [x, y];
	},
	_startDrag: function(dg) {
		var widget = dg.control;
		widget.$n('btn').title = ""; 
		widget.slidepos = widget._curpos;
		
		jq(document.body)
			.append('<div id="zul_slidetip" class="z-slider-pp"'
			+ 'style="position:absolute;display:none;z-index:60000;'
			+ 'background-color:white;border: 1px outset">' + widget.slidepos +
			'</div>');
		
		widget.slidetip = jq("#zul_slidetip")[0];
		if (widget.slidetip) {
			widget.slidetip.style.display = "block";
			zk(widget.slidetip).position(widget.$n(), widget.isVertical() ? "end_before" : "after_start");
		}
	},
	_dragging: function(dg) {
		var widget = dg.control,
			pos = widget._realpos();
		if (pos != widget.slidepos) {
			if (pos > widget._maxpos) 
				pos = widget._maxpos;
			widget.slidepos = pos;
			if (widget.slidetip) 
				widget.slidetip.innerHTML = widget._slidingtext.replace(/\{0\}/g, pos);
			widget.fire("onScrolling", pos);
		}
		widget._fixPos();
	},
	_endDrag: function(dg) {
		var widget = dg.control, pos = widget._realpos();
		
		widget.fire("onScroll", pos);
		
		widget._fixPos();
		jq(widget.slidetip).remove();
		widget.slidetip = null;
	},
	_realpos: function(dg) {
		var btnofs = zk(this.$n("btn")).cmOffset(), refofs = zk(this.getRealNode()).cmOffset(), maxpos = this._maxpos, pos;
		if (this.isVertical()) {
			var ht = this._getHeight();
			pos = ht ? Math.round(((btnofs[1] - refofs[1]) * maxpos) / ht) : 0;
		} else {
			var wd = this._getWidth();
			pos = wd ? Math.round(((btnofs[0] - refofs[0]) * maxpos) / wd) : 0;
		}
		return this._curpos = (pos >= 0 ? pos : 0);
	},
	_getWidth: function() {
		return this.getRealNode().clientWidth - this.$n("btn").offsetWidth + 7;
	},
	_getHeight: function() {
		return this.getRealNode().clientHeight - this.$n("btn").offsetHeight + 7;
	},
	_fixPos: _zkf = function() {
		var btn = this.$n("btn");
		if (this.isVertical()) {
			var ht = this._getHeight(), x = ht > 0 ? Math.round((this._curpos * ht) / this._maxpos) : 0, ofs = zk(this.getRealNode()).cmOffset();
			ofs = zk(btn).toStyleOffset(ofs[0], ofs[1]);
			ofs = this._snap(0, ofs[1] + x);
			btn.style.top = ofs[1] + "px";
		} else {
			var wd = this._getWidth(), x = wd > 0 ? Math.round((this._curpos * wd) / this._maxpos) : 0, ofs = zk(this.getRealNode()).cmOffset();
			ofs = zk(btn).toStyleOffset(ofs[0], ofs[1]);
			ofs = this._snap(ofs[0] + x, 0);
			btn.style.left = ofs[0] + "px";
		}
		btn.title = this._curpos;
		this.updateFormData(this._curpos);
	},
	onSize: _zkf,
	onShow: _zkf,
	
	inScaleMold: function() {
		return this.getMold() == "scale";
	},
	
	inSphereMold: function() {
		return this.getMold() == "sphere";
	},
	
	isVertical: function() {
		return "vertical" == this._orient;
	},
	updateFormData: function(val) {
		if (this._name) {
			val = val || 0;
			if (!this.efield) 
				this.efield = jq.newHidden(this._name, val, this.$n());
			else 
				this.efield.value = val;
		}
	},
	getRealNode: function () {
		return this.inScaleMold() ? this.$n("real") : this.$n();
	},
	bind_: function() {
		this.$supers(zul.inp.Slider, 'bind_', arguments);
		var inner = this.$n("inner");
		
		if (this.isVertical()) {
			this.$n("btn").style.top = "0px";
			var het = this.getRealNode().clientHeight;
			if (het > 0) 
				inner.style.height = (het + 7) + "px";
			else 
				inner.style.height = "214px";
		}
		this._makeDraggable();
		
		zWatch.listen({onSize: this, onShow: this});
		this.updateFormData(this._curpos);
	},
	unbind_: function() {
		this.efield = null;
		if (this._drag) {
			this._drag.destroy();
			this._drag = null;
		}
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(zul.inp.Slider, 'unbind_', arguments);
	}	
});
zkreg('zul.inp.Slider');zk._m={};
zk._m['scale']=

function (out) {
	var zcls = this.getZclass(),
		isScaleMold = this.inScaleMold() && !this.isVertical(),
		uuid = this.uuid;
		
	if(isScaleMold){
		out.push('<div id="', uuid, '" class="', zcls, '-tick">');
		this.uuid += '-real'; 
	}
	
	out.push('<div', this.domAttrs_(), '>');
	
	if(isScaleMold)
		this.uuid = uuid;
	
		out.push('<div id="', uuid, '-inner" class="', zcls, '-center">',
				'<div id="', uuid, '-btn" class="', zcls, '-btn">',
				'</div></div></div>');
	
	if(isScaleMold)
		out.push('</div>');
}
;zk._m['sphere']=[zk._p.p.Slider,'scale'];zk._m['default']=[zk._p.p.Slider,'scale'];zkmld(zk._p.p.Slider,zk._m);

zul.inp.Spinner = zk.$extends(zul.inp.FormatWidget, {
	_value: 0,
	_step: 1,
	_buttonVisible: true,
	$define: {
		
		
		step: _zkf = function(){},
		
		
		buttonVisible: function(v){			
			var n = this.$n("btn"),
				zcls = this.getZclass();
			if (!n) return;
			if (!this.inRoundedMold()) {
				jq(n)[v ? 'show': 'hide']();
				jq(this.getInputNode())[v ? 'removeClass': 'addClass'](zcls + '-right-edge');
			} else {
				var fnm = v ? 'removeClass': 'addClass';
				jq(n)[fnm](zcls + '-btn-right-edge');				
				
				if (zk.ie6_) {
					jq(n)[fnm](zcls + 
						(this._readonly ? '-btn-right-edge-readonly': '-btn-right-edge'));
						
					if (jq(this.getInputNode()).hasClass(zcls + "-text-invalid"))
							jq(n)[fnm](zcls + "-btn-right-edge-invalid");
				}
			}
			this.onSize();
			return;
		},
		
		
		min: _zkf = function(v){this._min = parseInt(v, 10);},
		
		
		max: _zkf
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-spinner" + (this.inRoundedMold() ? "-rounded": "");
	},
	isButtonVisible: function(){
		return _buttonVisible;
	},
	
	intValue: function (){
		return this.$supers('getValue', arguments);
	},
	setConstraint: function (constr){
		if(constr != null){
			var constraint = new zul.inp.SimpleSpinnerConstraint(constr);
			this._min = constraint._min;
			this._max = constraint._max;
			this.$supers('setConstraint', [constraint]);
		}else
			this.$supers('setConstraint', arguments);
	},
	coerceFromString_: function (value) {
		if (!value) return null;

		var info = zk.fmt.Number.unformat(this._format, value),
			val = parseInt(info.raw, 10);
		if (info.raw != ''+val && info.raw != '-'+val)
			return {error: zk.fmt.Text.format(msgzul.INTEGER_REQUIRED, value)};

		if (info.divscale) val = Math.round(val / Math.pow(10, info.divscale));
		return val;
	},
	coerceToString_: function (value) {
		var fmt = this._format;
		return fmt ? zk.fmt.Number.format(fmt, value, this._rounding): value != null ? ''+value: '';
	},
	onSize: _zkf = function () {
		var width = this.getWidth();
		if (!width || width.indexOf('%') != -1)
			this.getInputNode().style.width = '';
		this.syncWidth();
	},
	onShow: _zkf,
	onHide: zul.inp.Textbox.onHide,
	validate: zul.inp.Intbox.validate,
	doKeyPress_: function(evt){
		if (!this._shallIgnore(evt, zul.inp.InputWidget._allowKeys))
			this.$supers('doKeyPress_', arguments);
	},
	doKeyDown_: function(evt){
		var inp = this.inp;
		if (inp.disabled || inp.readOnly)
			return;
	
		switch (evt.keyCode) {
		case 38:
			this.checkValue();
			this._increase(true);
			evt.stop();
			return;
		case 40:
			this.checkValue();
			this._increase(false);
			evt.stop();
			return;
		}
		this.$supers('doKeyDown_', arguments);
	},
	ondropbtnup: function (evt) {
		jq(this._currentbtn).removeClass(this.getZclass() + "-btn-clk");
		this.domUnlisten_(document.body, "mouseup", "ondropbtnup");
		this._currentbtn = null;
	},
	_btnDown: function(evt){
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (this.inp && !this.inp.disabled && !zk.dragging) {
			if (this._currentbtn)
				this.ondropbtnup(evt);
			jq(btn).addClass(this.getZclass() + "-btn-clk");
			this.domListen_(document.body, "mouseup", "ondropbtnup");
			this._currentbtn = btn;
		}
		var inp = this.inp,
			btn = this.$n("btn");
			
		if(inp.disabled) return;

		this.checkValue();
		
		ofs = zk(btn).revisedOffset();
		
		if ((evt.pageY - ofs[1]) < btn.offsetHeight / 2) { 
			this._increase(true);
			this._startAutoIncProc(true);
		} else {	
			this._increase(false);
			this._startAutoIncProc(false);
		}
	},
	
	checkValue: function(){
		var inp = this.inp,
			min = this._min,
			max = this._max;

		if(!inp.value) {
			if(min && max)
				inp.value = (min<=0 && 0<=max) ? 0: min;
			else if (min)
				inp.value = min<=0 ? 0: min;
			else if (max)
				inp.value = 0<=max ? 0: max;
			else
				inp.value = 0;
		}
	},
	_btnUp: function(evt){
		if (this.inRoundedMold() && !this._buttonVisible) return;
		var inp = this.inp;
		if(inp.disabled) return;

		this._onChanging();
		this._stopAutoIncProc();
		
		if (zk.ie) {
			var len = inp.value.length;
			zk(inp).setSelectionRange(len, len);
		}
		inp.focus();
	},
	_btnOut: function(evt){
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (this.inp && !this.inp.disabled && !zk.dragging)
			jq(this.$n("btn")).removeClass(this.getZclass()+"-btn-over");
			
		var inp = this.inp;
		if(inp.disabled) return;

		this._stopAutoIncProc();
	},
	_btnOver: function(evt){
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (this.inp && !this.inp.disabled && !zk.dragging)
			jq(this.$n("btn")).addClass(this.getZclass()+"-btn-over");
	},
	_increase: function (is_add){
		var inp = this.inp,
			value = parseInt(inp.value, 10);
		if (is_add)
			result = value + this._step;
		else
			result = value - this._step;

		
		if ( result > Math.pow(2,31)-1 )	result = Math.pow(2,31)-1;
		else if ( result < -Math.pow(2,31) ) result = -Math.pow(2,31);

		if (this._max!=null && result > this._max) result = this._max;
		else if (this._min!=null && result < this._min) result = this._min;

		inp.value = result;
		
		this._onChanging();
		
	},
	_clearValue: function(){
		var real = this.inp;
		real.value = this._defValue = "";
		return true;
	},
	_startAutoIncProc: function (isup){
		var widget = this;
		if(this.timerId)
			clearInterval(this.timerId);

		this.timerId = setInterval(function(){widget._increase(isup)}, 200);
	},
	_stopAutoIncProc: function (){
		if(this.timerId)
			clearTimeout(this.timerId);

		this.timerId = null;
	},
	
	syncWidth: function () {
		var node = this.$n();
		if (!zk(node).isRealVisible() || (!this._inplace && !node.style.width))
			return;
		
		if (this._buttonVisible && this._inplace) {
			if (!node.style.width) {
				var $n = jq(node),
					inc = this.getInplaceCSS();
				$n.removeClass(inc);
				if (zk.opera)
					node.style.width = jq.px0(zk(node).revisedWidth(node.clientWidth) + zk(node).borderWidth());
				else
					node.style.width = jq.px0(zk(node).revisedWidth(node.offsetWidth));
				$n.addClass(inc);
			}
		} 
		var width = zk.opera ? zk(node).revisedWidth(node.clientWidth) + zk(node).borderWidth()
							 : zk(node).revisedWidth(node.offsetWidth),
			btn = this.$n('btn'),
			inp = this.getInputNode();
		inp.style.width = jq.px0(zk(inp).revisedWidth(width - (btn ? btn.offsetWidth : 0)));
	},
	doFocus_: function (evt) {
		var n = this.$n();
		if (this._inplace)
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));
			
		this.$supers('doFocus_', arguments);

		if (this._inplace) {
			if (jq(n).hasClass(this.getInplaceCSS())) {
				jq(n).removeClass(this.getInplaceCSS());
				this.onSize();
			}
		}
	},
	doBlur_: function (evt) {
		var n = this.$n();
		if (this._inplace && this._inplaceout) {
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));
		}
		this.$supers('doBlur_', arguments);
		if (this._inplace && this._inplaceout) {
			jq(n).addClass(this.getInplaceCSS());
			this.onSize();
			n.style.width = this.getWidth() || '';
		}
	},
	afterKeyDown_: function (evt) {
		if (this._inplace)
			jq(this.$n()).toggleClass(this.getInplaceCSS(),  evt.keyCode == 13 ? null : false);
			
		this.$supers('afterKeyDown_', arguments);
	},
	bind_: function () {
		this.$supers(zul.inp.Spinner, 'bind_', arguments); 
		this.timeId = null;
		var inp = this.inp = this.$n("real"),
			btn = this.$n("btn");
		zWatch.listen({onSize: this, onShow: this});
		
		if (this._inplace)
			jq(inp).addClass(this.getInplaceCSS());

		if (this._readonly && !this.inRoundedMold())
			jq(inp).addClass(this.getZclass() + '-right-edge');
		
		if(btn){
			this._auxb = new zul.Auxbutton(this, btn, inp);
			this.domListen_(btn, "onmousedown", "_btnDown");
			this.domListen_(btn, "onmouseup", "_btnUp");
			this.domListen_(btn, "onmouseout", "_btnOut");
			this.domListen_(btn, "mouseover", "_btnOver");
		}
		this.syncWidth();
	},
	unbind_: function () {
		if(this.timerId){
			clearTimeout(this.timerId);
			this.timerId = null;
		}
		zWatch.unlisten({onSize: this, onShow: this});
		var btn = this.$n("btn");
		if(btn){
			this._auxb.cleanup();
			this._auxb = null;
			this.domUnlisten_(btn, "onmousedown", "_btnDown");
			this.domUnlisten_(btn, "onmouseup", "_btnUp");
			this.domUnlisten_(btn, "onmouseout", "_btnOut");
			this.domUnlisten_(btn, "mouseover", "_btnOver");
		}
		this.$supers(zul.inp.Spinner, 'unbind_', arguments);
	}
	
});
zkreg('zul.inp.Spinner');zk._m={};
zk._m['rounded']=
function (out) {
	var zcls = this.getZclass(),
		uuid = this.uuid;
	
	out.push('<i', this.domAttrs_({text:true}), '>',
			'<input id="', uuid,'-real"', 'class="', zcls,'-inp"',
			this.textAttrs_(),'/>', '<i id="', uuid,'-btn"',
			'class="', zcls,'-btn ');
	
	if (this.inRoundedMold()) {
		if (!this._buttonVisible)
			out.push(' ', zcls, '-btn-right-edge');
		if (this._readonly)
			out.push(' ', zcls, '-btn-readonly');	
		if (zk.ie6_ && !this._buttonVisible && this._readonly)
			out.push(' ', zcls, '-btn-right-edge-readonly');
	} else if (!this._buttonVisible)
		out.push('" style="display:none"');	
	
	out.push('"></i></i>');
	
}

;zk._m['default']=[zk._p.p.Spinner,'rounded'];zkmld(zk._p.p.Spinner,zk._m);

zul.inp.Timebox = zk.$extends(zul.inp.FormatWidget, {
	LEGAL_CHARS: 'ahKHksm',
    
    MINUTE_FIELD: 1,
    
    SECOND_FIELD: 2,
    
    AM_PM_FIELD: 3,
    
    HOUR0_FIELD: 4,
    
    HOUR1_FIELD: 5,
    
    HOUR2_FIELD: 6,
    
    HOUR3_FIELD: 7,
	_buttonVisible: true,
	_format: 'HH:mm',
	$define: {
		
		
		buttonVisible: function(v){
			var n = this.$n('btn'),
				zcls = this.getZclass();
			if (n) {
				if (!this.inRoundedMold()) {
					jq(n)[v ? 'show': 'hide']();
					jq(this.getInputNode())[v ? 'removeClass': 'addClass'](zcls + '-right-edge');
				} else {
					var fnm = v ? 'removeClass': 'addClass';
					jq(n)[fnm](zcls + '-btn-right-edge');
					
					if (zk.ie6_) {
						jq(n)[fnm](zcls + 
							(this._readonly ? '-btn-right-edge-readonly': '-btn-right-edge'));
						
						if (jq(this.getInputNode()).hasClass(zcls + "-text-invalid"))
							jq(n)[fnm](zcls + "-btn-right-edge-invalid");
					}
				}
				this.onSize();
			}
		},
		format: function (fmt, fromServer) {
			this._parseFormat(fmt);
			var inp = this.getInputNode();
			if (inp) {
				inp.value = this.coerceToString_(this._value);
				if (fromServer)
					this._defValue = inp.value; 
			}
		}
	},
	setValue: function (val) {
		var args;
		if (val) {
			args = [];
			for (var j = arguments.length; --j > 0;)
				args.unshift(arguments[j]);

			args.unshift((typeof val == 'string') ? this.coerceFromString_(val) : val);
		} else
			args = arguments;
		this.$supers('setValue', args);
	},
	
	getRawText: function () {
		return this.coerceToString_(this._value);
	},
	_checkFormat: function (fmt) {
		var error, out = [];
		for (var i = 0, j = fmt.length; i < j; i++) {
			var c = fmt.charAt(i);
			switch (c) {
			case 'K':
			case 'h':
			case 'H':
			case 'k':
			case 'm':
			case 's':
				if (fmt.charAt(i+1) == c)
					i++;
				else
					error = true;
				out.push(c + c);
				break;
			default:
				out.push(c);
			}
		}
		if (error)
			return zk.fmt.Text.format(msgzul.DATE_REQUIRED + out.join(''));
	},
	_parseFormat: function (fmt) {
		var index = [];
		for (var i = 0, j = fmt.length; i < j; i++) {
			var c = fmt.charAt(i);
			switch (c) {
			case 'a':
				var len = zk.APM[0].length;
				index.push(new zul.inp.AMPMHandler([i, i + len - 1], this.AM_PM_FIELD));
				break;
			case 'K':
				var start = i,
					end = fmt.charAt(i+1) == 'K' ? ++i : i;
				index.push(new zul.inp.HourHandler2([start, end], this.HOUR3_FIELD));
				break;
			case 'h':
				var start = i,
					end = fmt.charAt(i+1) == 'h' ? ++i : i;
				index.push(new zul.inp.HourHandler([start, end], this.HOUR2_FIELD));
				break;
			case 'H':
				var start = i,
					end = fmt.charAt(i+1) == 'H' ? ++i : i;
				index.push(new zul.inp.HourInDayHandler([start, end], this.HOUR0_FIELD));
				break;;
			case 'k':
				var start = i,
					end = fmt.charAt(i+1) == 'k' ? ++i : i;
				index.push(new zul.inp.HourInDayHandler2([start, end], this.HOUR1_FIELD));
				break;
			case 'm':
				var start = i,
					end = fmt.charAt(i+1) == 'm' ? ++i : i;
				index.push(new zul.inp.MinuteHandler([start, end], this.MINUTE_FIELD));
				break;
			case 's':
				var start = i,
					end = fmt.charAt(i+1) == 's' ? ++i : i;
				index.push(new zul.inp.SecondHandler([start, end], this.SECOND_FIELD));
				break;
			default:
				var ary = [],
					start = i,
					end = i;

				while ((ary.push(c)) && ++end < j) {
					c = fmt.charAt(end);
					if (this.LEGAL_CHARS.indexOf(c) != -1) {
						end--;
						break;
					}
				}
				index.push({index: [start, end], format: (function (text) {
					return function() {
						return text;
					};
				})(ary.join(''))});
				i = end;
			}
		}
		for (var shift, i = 0, j = index.length; i < j; i++) {
			if (index[i].type == this.AM_PM_FIELD) {
				shift = index[i].index[1] - index[i].index[0];
				if (!shift) break; 
			} else if (shift) {
				index[i].index[0] += shift;
				index[i].index[1] += shift;
			}
		}
		this._fmthdler = index;

	},
	coerceToString_: function (date) {
		if (!this._fmthdler || (!this._changed && !date && arguments.length)) return '';
		var out = [];
		for (var i = 0, j = this._fmthdler.length; i < j; i++)
			out.push(this._fmthdler[i].format(date));
		return out.join('');
	},
	coerceFromString_: function (val) {
		if (!val) return null;


		var error;
		if ((error = this._checkFormat(this._format)))
			return {error: error};

		if (!this._fmthdler)
			this._parseFormat(this._format);

		var date = zUtl.today(true),
			hasAM, isAM, hasHour1,
			fmt = [];

		for (var i = 0, j = this._fmthdler.length; i < j; i++) {
			if (this._fmthdler[i].type == this.AM_PM_FIELD) {
				hasAM = true;
				isAM = this._fmthdler[i].unformat(date, val);
			} else if (this._fmthdler[i].type)
				fmt.push(this._fmthdler[i]);
		}

		if (hasAM) {
			for (var i = 0, j = fmt.length; i < j; i++) {
				if (fmt[i].type == this.HOUR2_FIELD || fmt[i].type == this.HOUR3_FIELD) {
					hasHour1 = true;
					break;
				}
			}
		}

		if (hasHour1) {
			for (var i = 0, j = fmt.length; i < j; i++) {
				if (fmt[i] != this.HOUR0_FIELD && fmt[i] != this.HOUR1_FIELD)
					date = fmt[i].unformat(date, val, isAM);
			}
		} else {
			for (var i = 0, j = fmt.length; i < j; i++) {
				if (fmt[i] != this.HOUR2_FIELD && fmt[i].type != this.HOUR3_FIELD)
					date = fmt[i].unformat(date, val);
			}
		}
		return date;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-timebox" + (this.inRoundedMold() ? "-rounded": "");
	},
	onSize: _zkf = function () {
		var width = this.getWidth(),
			inp = this.getInputNode();
		if (!width || width.indexOf('%') != -1)
			inp.style.width = '';

		if (inp && this._value && !inp.value) {
			if (!this._fmthdler)
				this._parseFormat(this._format);
			inp.value = this.coerceToString_(this._value);
		}

		this.syncWidth();
	},
	onShow: _zkf,
	onHide: zul.inp.Textbox.onHide,
	validate: zul.inp.Intbox.validate,
	doClick_: function(evt) {
		if (evt.domTarget == this.getInputNode())
			this._doCheckPos(this._getPos());
		this.$supers('doClick_', arguments);
	},
	doKeyPress_: function (evt) {
		if (zk.opera && evt.keyCode != 9) {
			evt.stop();
			return;
		}
		this.$supers('doKeyPress_', arguments);
	},
	doKeyDown_: function(evt) {
		var inp = this.getInputNode();
		if (inp.disabled || inp.readOnly)
			return;

		this.lastPos = this._getPos();
		var code = evt.keyCode;
		switch(code){
		case 48:case 96:
		case 49:case 97:
		case 50:case 98:
		case 51:case 99:
		case 52:case 100:
		case 53:case 101:
		case 54:case 102:
		case 55:case 103:
		case 56:case 104:
		case 57:case 105:
			code = code - (code>=96?96:48);
			this._doType(code);
			evt.stop();
			return;
		case 37:
			this._doLeft();
			evt.stop();
			return;
		case 38:
			this._doUp();
			evt.stop();
			return;
		case 39:
			this._doRight();
			evt.stop();
			return;
		case 40:
			this._doDown();
			evt.stop();
			return;
		case 46:
			this._doDel();
			evt.stop();
			return;
		case 8:
			this._doBack();
			evt.stop();
			return;
		case 9:
			
			break
		case 35:
		case 36:
			this._doCheckPos(code == 36 ? 0 : inp.value.length);
			evt.stop();
			return;
		case 13: case 27:
			break;
		default:
			if (!(code >= 112 && code <= 123) 
			&& !evt.ctrlKey && !evt.altKey)
				evt.stop();
		}
		this.$supers('doKeyDown_', arguments);
	},
	_dodropbtnup: function (evt) {
		jq(this._currentbtn).removeClass(this.getZclass() + "-btn-clk");
		this.domUnlisten_(document.body, "onMouseup", "_dodropbtnup");
		this._currentbtn = null;
	},
	_btnDown: function(evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		var inp = this.getInputNode(),
			btn = this.$n("btn");

		if(!inp || inp.disabled) return;
		if (this._currentbtn)
			this._dodropbtnup(evt);
		jq(btn).addClass(this.getZclass() + "-btn-clk");
		this.domListen_(document.body, "onMouseup", "_dodropbtnup");
		this._currentbtn = btn;

		if (!this._fmthdler)
			this._parseFormat(this._format);

		if (!inp.value)
			inp.value = this.coerceToString_();
			
		var ofs = zk(btn).revisedOffset();
		if ((evt.pageY - ofs[1]) < btn.offsetHeight / 2) { 
			this._doUp();
			this._startAutoIncProc(true);
		} else {
			this._doDown();
			this._startAutoIncProc(false);
		}
		
		
		this._lastPos = this._getPos();
		this._changed = true;
	},
	_btnUp: function(evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		var inp = this.getInputNode();
		if(inp.disabled || zk.dragging) return;

		this._onChanging();
		this._stopAutoIncProc();
		
		if ((zk.ie || zk.safari) && this._lastPos)
			zk(inp).setSelectionRange(this._lastPos, this._lastPos);

		inp.focus();
	},
	_btnOut: function(evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		var inp = this.getInputNode();
		if(!inp || inp.disabled || zk.dragging) return;

		jq(this.$n("btn")).removeClass(this.getZclass()+"-btn-over");
		this._stopAutoIncProc();
	},
	_btnOver: function(evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (this.getInputNode() && !this.getInputNode().disabled && !zk.dragging)
			jq(this.$n("btn")).addClass(this.getZclass()+"-btn-over");
	},
	_getPos: function () {
		return zk(this.getInputNode()).getSelectionRange()[1];
	},
	_doCheckPos: function (pos) {
		var inp = this.getInputNode();

		if (!this._fmthdler)
			this._parseFormat(this._format);

		for (var i = 0, j = this._fmthdler.length; i < j; i++) {
			var idx = this._fmthdler[i];
			if (idx.index[1] + 1 == pos) {
				if (idx.type) break;
				var end = i;
				while(this._fmthdler[++end]) {
					if (this._fmthdler[end].type == this.AM_PM_FIELD) {
						pos = this._fmthdler[end].index[1] + 1;
						break;
					} else if (this._fmthdler[end].type) {
						pos = this._fmthdler[end].index[0] + 1;
						break;
					}
				}
				break;
			} else if (idx.index[0] <= pos && idx.index[1] + 1 >= pos) {
				if (!idx.type) {
					var end = i;

					
					if (this._fmthdler[end + 1]) {
						while (this._fmthdler[++end]) {
							if (this._fmthdler[end].type) {
								pos = this._fmthdler[end].index[0] + 1;
								break;
							}
						}
					} else {
						while (this._fmthdler[--end]) {
							if (this._fmthdler[end].type) {
								pos = this._fmthdler[end].index[1] + 1;
								break;
							}
						}
					}
				}  else if (idx.type == this.AM_PM_FIELD) {
					pos = idx.index[1] + 1;
					break;
				} else {
					if (idx.index[0] == pos) pos++;
					break;
				}
			}
		}
		zk(inp).setSelectionRange(pos, pos);
		this.lastPos = pos;
	},
	_doLeft: function () {
		var inp = this.getInputNode(),
			pos = this.lastPos - 1,
			hdler = this.getTimeHandler();
		for (var i = 0, j = this._fmthdler.length; i < j; i++) {
			var idx = this._fmthdler[i];
			if (idx.index[0] == pos) {
				var end = i;
				pos++;
				while (this._fmthdler[--end]) {
					if (this._fmthdler[end].type) {
						pos = this._fmthdler[end].index[1] + 1;
						break;
					}
				}
				break;
			} else if (idx.index[0] < pos && idx.index[1] >= pos) {
				if (!idx.type || idx.type == this.AM_PM_FIELD) {
					var end = i;
					pos++;
					while (this._fmthdler[--end]) {
						if (this._fmthdler[end].type) {
							pos = this._fmthdler[end].index[1] + 1;
							break;
						}
					}
				} else
					break;
			}
		}
		if (hdler.type && hdler.type != this.AM_PM_FIELD) {
			if (pos <= hdler.index[0] || pos > hdler.index[1] + 1) {
				var val = inp.value, text = val.substring(hdler.index[0], hdler.index[1] + 1);
				text = text.replace(/ /g, '0');
				inp.value = val.substring(0, hdler.index[0]) + text + val.substring(hdler.index[1] + 1, val.length);
			}
		}

		zk(inp).setSelectionRange(pos, pos);
		this.lastPos = pos;
	},
	_doRight: function() {
		var inp = this.getInputNode(), pos = this.lastPos + 1, hdler = this.getTimeHandler();
		for (var i = 0, j = this._fmthdler.length; i < j; i++) {
			var idx = this._fmthdler[i];
			if (idx.index[1] + 2 == pos) {
				var end = i;
				pos--;
				while (this._fmthdler[++end]) {
					if (this._fmthdler[end].type == this.AM_PM_FIELD) {
						pos = this._fmthdler[end].index[1] + 1;
						break;
					} else if (this._fmthdler[end].type) {
						pos = this._fmthdler[end].index[0] + 1;
						break;	
					}
				}
				break;
			} else if (idx.index[0] < pos && idx.index[1] + 1 >= pos) {
				if (!idx.type || idx.type == this.AM_PM_FIELD) {
					var end = i;
					pos--;
					while (this._fmthdler[++end]) {
						if (this._fmthdler[end].type) {
							pos = this._fmthdler[end].index[0] + 1;
							break;
						}
					}
				} else
					break;
			}
		}
		if (hdler.type && hdler.type != this.AM_PM_FIELD) {
			if (pos <= hdler.index[0] || pos > hdler.index[1] + 1) {
				var val = inp.value, text = val.substring(hdler.index[0], hdler.index[1] + 1);
				text = text.replace(/ /g, '0');
				inp.value = val.substring(0, hdler.index[0]) + text + val.substring(hdler.index[1] + 1, val.length);
			}
		}
		zk(inp).setSelectionRange(pos, pos);

		this.lastPos = pos;
	},
	_doUp: function() {
		this._changed = true;
		this.getTimeHandler().increase(this, 1);
		this._onChanging();
	},
	_doDown: function() {
		this._changed = true;
		this.getTimeHandler().increase(this, -1);
		this._onChanging();
	},
	_doBack: function () {
		this._changed = true;
		this.getTimeHandler().deleteTime(this, true);
	},
	_doDel: function () {
		this._changed = true;
		this.getTimeHandler().deleteTime(this, false);
	},
	_doType: function (val) {
		this._changed = true;
		this.getTimeHandler().addTime(this, val);
	},
	getTimeHandler: function () {
		var pos = zk(this.getInputNode()).getSelectionRange();
		
		
		
		pos = pos[1] - pos[0] > 2 ? pos[0] : pos[1];
		for (var i = 0, f = this._fmthdler, j = f.length; i < j; i++) {
			if (!f[i].type) continue;
			if (f[i].index[0] < pos && f[i].index[1] + 1 >= pos)
				return f[i];
		}
		return this._fmthdler[0];
	},
	getNextTimeHandler: function (th) {
		var pos = th.index[1] + 1,
			lastHandler;
		for (var i = 0, f = this._fmthdler, j = f.length; i < j; i++) {
			if (!f[i].type || f[i].$instanceof(zul.inp.AMPMHandler)) continue;
			lastHandler = f[i];
			if (f[i] == th) continue;
			if (f[i].index[1] + 1 >= pos)
				return f[i];
		}
		return lastHandler;
	},
	_startAutoIncProc: function(up) {
		if (this.timerId)
			clearInterval(this.timerId);
		var self = this,
			fn = up ? '_doUp' : '_doDown';
		this.timerId = setInterval(function() {
			if ((zk.ie || zk.safari) && self._lastPos)
				zk(self.getInputNode()).setSelectionRange(self._lastPos, self._lastPos);
			self[fn]();
		}, 300);
	},
	_stopAutoIncProc: function() {
		if (this.timerId)
			clearTimeout(this.timerId);
		this.currentStep = this.defaultStep;
		this.timerId = null;
	},
	
	syncWidth: function () {
		var node = this.$n();
		if (!zk(node).isRealVisible() || (!this._inplace && !node.style.width))
			return;

		if (this._buttonVisible && this._inplace) {
			if (!node.style.width) {
				var $n = jq(node),
					inc = this.getInplaceCSS();
				$n.removeClass(inc);
				if (zk.opera)
					node.style.width = jq.px0(zk(node).revisedWidth(node.clientWidth) + zk(node).borderWidth());
				else
					node.style.width = jq.px0(zk(node).revisedWidth(node.offsetWidth));
				$n.addClass(inc);
			}
		}
		var width = zk.opera ? zk(node).revisedWidth(node.clientWidth) + zk(node).borderWidth()
							 : zk(node).revisedWidth(node.offsetWidth),
			btn = this.$n('btn'),
			inp = this.getInputNode();
		inp.style.width = jq.px0(zk(inp).revisedWidth(width - (btn ? btn.offsetWidth : 0)));
	},
	doFocus_: function (evt) {
		var n = this.$n(),
			inp = this.getInputNode(),
			selrng = zk(inp).getSelectionRange();
		if (this._inplace)
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));

		this.$supers('doFocus_', arguments);	

		if (!this._fmthdler)
			this._parseFormat(this._format);
			
		if (!inp.value)
			inp.value = this.coerceToString_();

		this._doCheckPos(this._getPos());
		
		
		if (selrng[0] !== selrng[1]) {
			zk(inp).setSelectionRange(selrng[0], selrng[1]);
			this.lastPos = selrng[1];
		}
		if (this._inplace) {
			if (jq(n).hasClass(this.getInplaceCSS())) {
				jq(n).removeClass(this.getInplaceCSS());
				this.onSize();
			}
		}
	},
	doBlur_: function (evt) {
		var n = this.$n();
		if (this._inplace && this._inplaceout) {
			n.style.width = jq.px0(zk(n).revisedWidth(n.offsetWidth));
		}
		
		
		if (!this.getValue() && !this._changed)
			this.getInputNode().value = this._lastRawValVld = '';
		
		this.$supers('doBlur_', arguments);
		if (this._inplace && this._inplaceout) {
			jq(n).addClass(this.getInplaceCSS());
			this.onSize();
			n.style.width = this.getWidth() || '';
		}
	},
	afterKeyDown_: function (evt) {
		if (this._inplace)
			jq(this.$n()).toggleClass(this.getInplaceCSS(),  evt.keyCode == 13 ? null : false);

		this.$supers('afterKeyDown_', arguments);
	},
	bind_: function () {
		this.$supers(zul.inp.Timebox, 'bind_', arguments);
		var inp = this.getInputNode(),
			btn = this.$n("btn");
		zWatch.listen({onSize: this, onShow: this});

		if (this._inplace)
			jq(inp).addClass(this.getInplaceCSS());

		if (this._readonly && !this.inRoundedMold())
			jq(inp).addClass(this.getZclass() + '-right-edge');
		
		if (btn) {
			this._auxb = new zul.Auxbutton(this, btn, inp);
			this.domListen_(btn, "onmousedown", "_btnDown");
			this.domListen_(btn, "onmouseup", "_btnUp");
			this.domListen_(btn, "onmouseout", "_btnOut");
			this.domListen_(btn, "mouseover", "_btnOver");
		}
		this.syncWidth();
	},
	unbind_: function () {
		if(this.timerId){
			clearTimeout(this.timerId);
			this.timerId = null;
		}
		zWatch.unlisten({onSize: this, onShow: this});
		var btn = this.$n("btn");
		if (btn) {
			this._auxb.cleanup();
			this._auxb = null;
			this.domUnlisten_(btn, "onmousedown", "_btnDown");
			this.domUnlisten_(btn, "onmouseup", "_btnUp");
			this.domUnlisten_(btn, "onmouseout", "_btnOut");
			this.domUnlisten_(btn, "mouseover", "_btnOver");
		}
		this._changed = false;
		this.$supers(zul.inp.Timebox, 'unbind_', arguments);
	}

});
zul.inp.TimeHandler = zk.$extends(zk.Object, {
	maxsize: 59,
	minsize: 0,
	digits: 2,
	$init: function (index, type) {
		this.index = index;
		this.type = type;
	},
	format: function (date) {
		return '00';
	},
	unformat: function (date, val) {
		return date;
	},
	increase: function (wgt, up) {
		var inp = wgt.getInputNode(),
			start = this.index[0],
			end = this.index[1] + 1,
			val = inp.value,
			text = val.substring(start, end);

		text = zk.parseInt(text.replace(/ /g, '0'));
		text += up;
		var max = this.maxsize + 1;
		if (text < this.minsize)
			text = this.maxsize;
		else if (text >= max)
			text = this.minsize;

		if (text < 10) text = "0" + text;
		inp.value = val.substring(0, start) + text + val.substring(end, val.length);

		zk(inp).setSelectionRange(start, end);
	},
	deleteTime: function (wgt, backspace) {
		var inp = wgt.getInputNode(),
			sel = zk(inp).getSelectionRange(),
			pos = sel[1],
			start = this.index[0],
			end = this.index[1] + 1,
			val = inp.value;
		if (sel[0] != sel[1]) {
			inp.value = val.substring(0, start) + '  ' + val.substring(end, val.length);
			pos = end;
		} else if (pos == start + 1) {
			if (backspace)
				inp.value = val.substring(0, start) + ' ' + val.substring(start + 1, val.length);
			else {
				inp.value = val.substring(0, start + 1) + ' ' + val.substring(start + 2, val.length);
				pos++;
			}
		} else if (backspace) {
			inp.value = val.substring(0, start) + ' ' + val.substring(start, start + 1) + val.substring(end, val.length);
		}

		zk(inp).setSelectionRange(pos, pos);
	},
	_addNextTime: function (wgt, num) {
		var NTH = wgt.getNextTimeHandler(this);
		if (NTH == this) return;
		zk(wgt.getInputNode()).setSelectionRange(NTH.index[0], NTH.index[1] + 1);
		NTH.addTime(wgt, num);
	},
	addTime: function (wgt, num) {
		var inp = wgt.getInputNode(),
			sel = zk(inp).getSelectionRange(),
			start = this.index[0],
			end = this.index[1] + 1,
			val = inp.value,
			text = val.substring(start, end);

		if (sel[1] - sel[0] > 2) {
			sel[1] = sel[0] + 2;
		}

		var seld = val.substring(sel[0], sel[1]);
		if (seld) {
			if (sel[1] - sel[0] > 1)
				seld = ' ' + num;
			inp.value = val.substring(0, sel[0]) + seld + val.substring(sel[1], val.length);
		} else {
			var text1 = '';
			if (sel[1] == end) {
				if (text.startsWith(' ')) {
					if (text.endsWith(' '))
						text1 = ' ' + num;
					else
						text1 = text.charAt(1) + num;
				} else if (text.endsWith(' ')) {
					text1 = text.charAt(0) + num;
				} else {
					this._addNextTime(wgt, num);
					return;
				}
			} else {
				if (text.startsWith(' '))
					text1 = num + text.charAt(1);
			}
			if (text1 && text1 != text) {
				if (zk.parseInt(text1) <= this.maxsize)
					inp.value = val.substring(0, start) + text1 + val.substring(end, val.length);
				else {
					inp.value = val.substring(0, start) + '0' + text.charAt(1) + val.substring(end, val.length);
					this._addNextTime(wgt, num);
					return;
				}
			}
		}
		zk(inp).setSelectionRange(sel[1], sel[1]);
	},
	getText: function (val) {
		var start = this.index[0],
			end = this.index[1] + 1;
		return val.substring(start, end);
	}
});
zul.inp.HourInDayHandler = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 23,
	minsize: 0,
	format: function (date) {
		if (!date) return '00';
		else {
			var h = date.getHours();
			if (h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val) {
		date.setHours(zk.parseInt(this.getText(val)));
		return date;
	}
});
zul.inp.HourInDayHandler2 = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 24,
	minsize: 1,
	format: function (date) {
		if (!date) return '24';
		else {
			var h = date.getHours();
			if (h == 0)
				h = '24';
			else if (h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val) {
		var hours = zk.parseInt(this.getText(val));
		if (hours == 24)
			hours = 0;
		date.setHours(hours);
		return date;
	}
});
zul.inp.HourHandler = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 12,
	minsize: 1,
	format: function (date) {
		if (!date) return '12';
		else {
			var h = date.getHours();
			h = (h % 12);
			if (h == 0)
				h = '12';
			else if (h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val, am) {
		var hours = zk.parseInt(this.getText(val));
		if (hours == 12)
			hours = 0;
		date.setHours(am ? hours : hours + 12);
		return date;
	}
});
zul.inp.HourHandler2 = zk.$extends(zul.inp.TimeHandler, {
	maxsize: 11,
	minsize: 0,
	format: function (date) {
		if (!date) return '00';
		else {
			var h = date.getHours();
			h = (h % 12);
			if (h < 10)
				h = '0' + h;
			return h.toString();
		}
	},
	unformat: function (date, val, am) {
		var hours = zk.parseInt(this.getText(val));
		date.setHours(am ? hours : hours + 12);
		return date;
	}
});
zul.inp.MinuteHandler = zk.$extends(zul.inp.TimeHandler, {
	format: function (date) {
		if (!date) return '00';
		else {
			var m = date.getMinutes();
			if (m < 10)
				m = '0' + m;
			return m.toString();
		}
	},
	unformat: function (date, val) {
		date.setMinutes(zk.parseInt(this.getText(val)));
		return date;
	}
});
zul.inp.SecondHandler = zk.$extends(zul.inp.TimeHandler, {
	format: function (date) {
		if (!date) return '00';
		else {
			var s = date.getSeconds();
			if (s < 10)
				s = '0' + s;
			return s.toString();
		}
	},
	unformat: function (date, val) {
		date.setSeconds(zk.parseInt(this.getText(val)));
		return date;
	}
});
zul.inp.AMPMHandler = zk.$extends(zul.inp.TimeHandler, {
	format: function (date) {
		if (!date)
			return zk.APM[0];
		var h = date.getHours();
		return zk.APM[h < 12 ? 0 : 1];
	},
	unformat: function (date, val) {
		return zk.APM[0] == this.getText(val);
	},
	deleteTime: zk.$void,
	addTime: zul.inp.TimeHandler.prototype._addNextTime,
	increase: function (wgt, up) {
		var inp = wgt.getInputNode(),
			start = this.index[0],
			end = this.index[1] + 1,
			val = inp.value,
			text = val.substring(start, end);

		text = zk.APM[0] == text ? zk.APM[1] : zk.APM[0];
		inp.value = val.substring(0, start) + text + val.substring(end, val.length);
		zk(inp).setSelectionRange(start, end);
	}
});
zkreg('zul.inp.Timebox');zk._m={};
zk._m['rounded']=[zk._p.p.Spinner,'rounded'];zk._m['default']=[zk._p.p.Spinner,'rounded'];zkmld(zk._p.p.Timebox,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.inp',1);