zk.load('zul.wgt',function(){zk._p=zkpi('zul.menu',true);try{




zul.menu.Menubar = zk.$extends(zul.Widget, {
	_orient: "horizontal",

	$define: {
		
		
		orient: function () {
			this.rerender();
		},
		
		
		scrollable: function (scrollable) {
			if (this.checkScrollable())
				this.rerender();	
		},
		
		
		autodrop: null
	},
	getZclass: function () {
		return this._zclass == null ? "z-menubar" +
				("vertical" == this.getOrient() ? "-ver" : "-hor") : this._zclass;
	},
	unbind_: function () {
		if (this.checkScrollable()) {
			var left = this.$n('left'),
				right = this.$n('right');
			if (left && right) {
				this.domUnlisten_(left, 'onClick', '_doScroll');
				this.domUnlisten_(left, 'onMouseover', '_onOver');
				this.domUnlisten_(left, 'onMouseout', '_onOut');
				this.domUnlisten_(right, 'onClick', '_doScroll');
				this.domUnlisten_(right, 'onMouseover', '_onOver');
				this.domUnlisten_(right, 'onMouseout', '_onOut');
			}
			zWatch.unlisten({onSize: this, onShow: this});
		}
		
		this._lastTarget = null;
		this.$supers(zul.menu.Menubar, 'unbind_', arguments);
	},
	bind_: function () {
		this.$supers(zul.menu.Menubar, 'bind_', arguments);
		if (this.checkScrollable()) {
			var left = this.$n('left'),
				right = this.$n('right');
			if (left && right) {
				this.domListen_(left, 'onClick', '_doScroll');
				this.domListen_(left, 'onMouseover', '_onOver');
				this.domListen_(left, 'onMouseout', '_onOut');
				this.domListen_(right, 'onClick', '_doScroll');
				this.domListen_(right, 'onMouseover', '_onOver');
				this.domListen_(right, 'onMouseout', '_onOut');
			}
			zWatch.listen({onSize: this, onShow: this});
		}
	},
	
	checkScrollable: function () {
		return this._scrollable && ("horizontal" == this.getOrient());
	},
	onSize: _zkf = function () {
		this._checkScrolling();
	},
	onShow: _zkf,
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		this._checkScrolling();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (!this.childReplacing_)
			this._checkScrolling();
	},
	_checkScrolling: function () {	
		if (!this.checkScrollable()) return;
		
		var node = this.$n();
		if (!node) return;
		jq(node).addClass(this.getZclass() + "-scroll");
		if (zk.ie6_) this._doFixWidth(node);
		
		var nodeWidth = zk(node).offsetWidth(),
			body = this.$n('body'),
			childs = jq(this.$n('cave')).children();
			totalWidth = 0;
		
		for (var i = childs.length; i-- ;)
			totalWidth += childs[i].offsetWidth;

		var fixedSize = nodeWidth -
						zk(this.$n('left')).offsetWidth() -
						zk(this.$n('right')).offsetWidth();
		if (this._scrolling) {
			if (totalWidth <= nodeWidth) {
				this._scrolling = false;
				body.scrollLeft = 0;
				if (zk.ie7_)
					zk(body).redoCSS();
			} else {
				body.style.width = jq.px0(fixedSize);
				this._fixScrollPos(node);
			}
			this._fixButtonPos(node);
		} else {
			if (totalWidth > nodeWidth) {
				this._scrolling = true;
				this._fixButtonPos(node);
				body.style.width = jq.px0(fixedSize);
			}
		}
	},
	_fixScrollPos: function () {
		var body = this.$n('body'),
			childs = jq(this.$n('cave')).children();
		if (childs[childs.length - 1].offsetLeft < body.scrollLeft) {
			var movePos = childs[childs.length - 1].offsetLeft;
			body.scrollLeft = movePos;
		}
	},
	_fixButtonPos: function (node) {
		var zcls = this.getZclass(),
			body = this.$n('body'),
			left = this.$n('left'),
			right = this.$n('right'),
			css = this._scrolling ? "addClass" : "removeClass";

		jq(node)[css](zcls + "-scroll");
		jq(body)[css](zcls + "-body-scroll");
		jq(left)[css](zcls + "-left-scroll");
		jq(right)[css](zcls + "-right-scroll");
	},
	_doFixWidth: function () {
		var node = this.$n(),
			width = node.style.width;
		if (zk.ie6_ && (!width || "auto" == width))
			this._forceStyle(node, "100%");
	},
	_forceStyle: function (node, value) {
		if (zk.parseInt(value) < 0)
			return;
		node.style.width = zk.ie6_ ? "0px" : "";
		node.style.width = value;
	},
	_onOver: function (evt) {
		if (!this.checkScrollable()) return;
		var evtNode = evt.domTarget,
			node = this.$n(),
			left = this.$n('left'),
			right = this.$n('right'),
			zcls = this.getZclass();

		if (left == evtNode) {
			jq(left).addClass(zcls + "-left-scroll-over");
		} else if (right == evtNode) {
			jq(right).addClass(zcls + "-right-scroll-over");
		}
	},
	_onOut: function (evt) {
		if (!this.checkScrollable()) return;
		var evtNode = evt.domTarget,
			node = this.$n(),
			left = this.$n('left'),
			right = this.$n('right'),
			zcls = this.getZclass();

	    if (left == evtNode) {
	    	jq(left).removeClass(zcls + "-left-scroll-over");
		} else if (right == evtNode) {
			jq(right).removeClass(zcls + "-right-scroll-over");
		}
	},
	_doScroll: function (evt) {
		var target = evt.domTarget;
		this._scroll(target.id.endsWith("left") ? "left" : "right");
	},
	_scroll: function (direction) {
		if (!this.checkScrollable() || this._runId) return;
		var self = this;
			body = this.$n('body'),
			currScrollLeft = body.scrollLeft,
			childs = jq(this.$n('cave')).children(),
			childLen = childs.length,
			movePos = 0;

		if (!childLen) return;
		switch (direction) {
		case "left":
			for (var i = 0; i < childLen; i++) {
				if (childs[i].offsetLeft >= currScrollLeft) {
					var preChild = childs[i].previousSibling;
					if (!preChild)	return;
					movePos = currScrollLeft - (currScrollLeft - preChild.offsetLeft);
					if (isNaN(movePos)) return;
					self._runId = setInterval(function () {
						if(!self._moveTo(body, movePos)){
							clearInterval(self._runId);
							self._runId = null;
						}
					}, 10);
					return;
				}
			}
			break;
		case "right":
			var currRight = currScrollLeft + body.offsetWidth;
			for (var i = 0; i < childLen; i++) {
				var currChildRight =  childs[i].offsetLeft + childs[i].offsetWidth;
				if (currChildRight > currRight) {
					movePos = currScrollLeft + (currChildRight - currRight);
					if (isNaN(movePos)) return;
					self._runId = setInterval(function () {
						if (!self._moveTo(body, movePos)) {
							clearInterval(self._runId);
							self._runId = null;
						}
					}, 10);
					return;
				}
			}
			break;
		}
	},
	_moveTo: function (body, moveDest) {
		var currPos = body.scrollLeft,
			step = 5;
		if (currPos == moveDest) return false;

		if (currPos > moveDest) {
			var setTo = currPos - step;
			body.scrollLeft = setTo < moveDest ?  moveDest : setTo;
			return true;
		} else {
			var setTo = currPos + step;
			body.scrollLeft = setTo > moveDest ? moveDest : setTo;
			return true;
		}
		return false;
	},
	insertChildHTML_: function (child, before, desktop) {
		if (before)
			jq(before.$n('chdextr') || before.$n()).before(
				this.encloseChildHTML_({child: child, vertical: 'vertical' == this.getOrient()}));
		else
			jq(this.$n('cave')).append(
				this.encloseChildHTML_({child: child, vertical: 'vertical' == this.getOrient()}));

		child.bind(desktop);
	},
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		jq(child.uuid + '-chdextr', zk).remove();
	},
	encloseChildHTML_: function (opts) {
		var out = opts.out || [],
			child = opts.child,
			isVert = opts.vertical;
		if (isVert) {
			out.push('<tr id="', child.uuid, '-chdextr"');
			if (child.getHeight())
				out.push(' height="', child.getHeight(), '"');
			out.push('>');
		}
		child.redraw(out);
		if (isVert)
			out.push('</tr>');
		if (!opts.out) return out.join('');
	}
});
zkreg('zul.menu.Menubar');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid;
	if ('vertical' == this.getOrient()) {
		out.push('<div', this.domAttrs_(), '><table id="', uuid, '-cave"',
				zUtl.cellps0, '>');
		for (var w = this.firstChild; w; w = w.nextSibling)
			this.encloseChildHTML_({out: out, child: w, vertical: true});
		out.push('</table></div>');
	} else {
		var zcls = this.getZclass();
		out.push('<div', this.domAttrs_(), '>')
		if (this.checkScrollable()) {
			out.push('<div id="', uuid, '-left" class="', zcls, '-left"></div>',
					'<div id="', uuid, '-right" class="', zcls, '-right"></div>',
					'<div id="', uuid, '-body" class="', zcls, '-body">',
					'<div id="', uuid, '-cnt" class="', zcls, '-cnt">');
		}
		out.push('<table', zUtl.cellps0, '>', '<tr valign="bottom" id="', uuid, '-cave">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</tr></table>');
		if (this.scrollable) {
			out.push('</div></div>');
		}
		out.push('</div>');
	}
}
;zkmld(zk._p.p.Menubar,zk._m);

zul.menu.Menu = zk.$extends(zul.LabelImageWidget, {
	$define: {
		
		
		content: function (content) {
			if (!content || content.length == 0) return;
			
			if (!this._contentHandler) {
				if (zk.feature.pe) {
					var self = this;
					zk.load('zkex.inp', null, function () { 
						self._contentHandler = new zkex.inp.ContentHandler(self, content);
					});
					return;
				}
				this._contentHandler = new zul.menu.ContentHandler(this, content);
			} else
				this._contentHandler.setContent(content);
		},
		image: function () {
			this.rerender();
		}
	},
	domContent_: function () {
		var label = zUtl.encodeXML(this.getLabel()),
			img = ['<span id="', this.uuid, '-img" class="', this.getZclass(), '-img"'];
			
		img.push(this._image ? ' style="background-image:url(' + this._image + ')"' : '', '></span>', label ? ' ' + label : '');
		return img.join('');
	},
	
	isTopmost: function () {
		return this._topmost;
	},
	beforeParentChanged_: function (newParent) {
		this._topmost = newParent && !(newParent.$instanceof(zul.menu.Menupopup));
		this.$supers("beforeParentChanged_", arguments);
	},
	getZclass: function () {
		return this._zclass == null ? "z-menu" : this._zclass;
	},
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments);
		return this.isTopmost() ?
			style + 'padding-left:4px;padding-right:4px;': style;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.menu.Menupopup)) {
			this.menupopup = child;

			if (this._contentHandler)
				this._contentHandler.destroy();
		}
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.menupopup) {
			this.menupopup = null;

			if (this._contentHandler)
				this._contentHandler.setContent(this._content);
		}
	},
	
	getMenubar: function () {
		for (var p = this.parent; p; p = p.parent)
			if (p.$instanceof(zul.menu.Menubar))
				return p;
		return null;
	},
	onShow: function () {
		if (this._contentHandler)
			this._contentHandler.onShow();
	},
	onFloatUp: function (ctl) {
		if (this._contentHandler)
			this._contentHandler.onFloatUp(ctl);
	},
	onHide: function () {
		if (this._contentHandler)
			this._contentHandler.onHide();
	},
	bind_: function () {
		this.$supers(zul.menu.Menu, 'bind_', arguments);

		var anc = this.$n('a'),
			type = this._contentType;
		if (!this.isTopmost()) {
			var	n = this.$n();
			this.domListen_(anc, "onFocus", "doFocus_")
				.domListen_(anc, "onBlur", "doBlur_")
				.domListen_(n, "onMouseOver")
				.domListen_(n, "onMouseOut");
		} else {
			this.domListen_(anc, "onMouseOver")
				.domListen_(anc, "onMouseOut");
		}

		if (this._contentHandler)
			this._contentHandler.bind();
	},
	unbind_: function () {
		if (!this.isTopmost()) {
			var anc = this.$n('a'),
				n = this.$n();
			this.domUnlisten_(anc, "onFocus", "doFocus_")
				.domUnlisten_(anc, "onBlur", "doBlur_")
				.domUnlisten_(n, "onMouseOver")
				.domUnlisten_(n, "onMouseOut");
		} else {
			var anc = this.$n('a');
			this.domUnlisten_(anc, "onMouseOver")
				.domUnlisten_(anc, "onMouseOut");
		}

		if (this._contentHandler)
			this._contentHandler.unbind();

		this.$supers(zul.menu.Menu, 'unbind_', arguments);
	},
	doClick_: function (evt) {		
		var node = this.$n();
		if (this.menupopup) {
			jq(this.$n('a')).addClass(this.getZclass() + '-body-seld');
			this.menupopup._shallClose = false;
			if (this.isTopmost())
				this.getMenubar()._lastTarget = this;
			if (this.isListen('onClick')) {
				var arrorWidth = 12, 
					clk = jq(node).find('TABLE'),
					offsetWidth = zk(clk).offsetWidth(),
					clickArea = offsetWidth - arrorWidth,
					ofs = zk(clk).revisedOffset(),
					clickOffsetX = evt.domEvent.clientX - ofs[0];

				if (clickOffsetX > clickArea) {
					this._togglePopup();
					Event.stop(evt);
				} else {
					jq(this.$n('a')).removeClass(this.getZclass() + '-body-seld');
					this.fireX(evt);
				}		
			} else {
				this._togglePopup();
			}
		} else {
			var content = this._contentHandler;
			if (content && !content.isOpen())
				content.onShow();
		}
	},
	doMouseOver_: function () {
		this.$supers('doMouseOver_', arguments);
		if (this.isTopmost()) return;

		var content = this._contentHandler;
		if (content && !content.isOpen())
			content.onShow();
	},
	_togglePopup: function () {
		if (!this.menupopup.isOpen())
			this.menupopup.open();
		else if (this.isTopmost()) 
			this.menupopup.close();
		else {
			var anc = this.menupopup.$n('a');
			if (anc) anc.focus(); 
		}			
	},
	_doMouseOver: function (evt) { 
		if (this.$class._isActive(this)) return;

		var	topmost = this.isTopmost();
		if (topmost && zk.ie && !jq.isAncestor(this.$n('a'), evt.domTarget))
				return; 

		if (this.menupopup)
			this.menupopup._shallClose = false;
		if (!topmost) {
			zWatch.fire('onFloatUp', this); 
			if (this.menupopup && !this.menupopup.isOpen()) this.menupopup.open();
		} else {
			var menubar = this.getMenubar();
			if (this.menupopup && menubar.isAutodrop()) {
				menubar._lastTarget = this;
				zWatch.fire('onFloatUp', this); 
				if (!this.menupopup.isOpen()) this.menupopup.open();
			} else {
				var target = menubar._lastTarget;
				if (target && target != this && menubar._lastTarget.menupopup
						&& menubar._lastTarget.menupopup.isVisible()) {
					menubar._lastTarget.menupopup.close({sendOnOpen:true});
					this.$class._rmActive(menubar._lastTarget);
					menubar._lastTarget = this;
					if (this.menupopup) this.menupopup.open();
				}
			}
		}
		this.$class._addActive(this);
	},
	_doMouseOut: function (evt) { 
		if (zk.ie && jq.isAncestor(this.$n('a'), evt.domEvent.relatedTarget || evt.domEvent.toElement))
			return; 
	
		var	topmost = this.isTopmost();
		if (topmost) {
			this.$class._rmActive(this);
			if (this.menupopup && this.getMenubar().isAutodrop()) {
				if (this.menupopup.isOpen())
					this.menupopup._shallClose = true; 
				zWatch.fire('onFloatUp', this, {timeout: 10}); 
			}
		} else if (!this.menupopup || !this.menupopup.isOpen())
			this.$class._rmActive(this);
	}
}, {
	_isActive: function (wgt) {
		var top = wgt.isTopmost(),
			n = top ? wgt.$n('a') : wgt.$n(),
			cls = wgt.getZclass() + (top ? '-body-over' : '-over');
		return jq(n).hasClass(cls);
	},
	_addActive: function (wgt) {
		var top = wgt.isTopmost(),
			n = top ? wgt.$n('a') : wgt.$n(),
			cls = wgt.getZclass() + (top ? '-body-over' : '-over');
		jq(n).addClass(cls);
		if (!top && wgt.parent.parent.$instanceof(zul.menu.Menu))
			this._addActive(wgt.parent.parent);
	},
	_rmActive: function (wgt) {
		var top = wgt.isTopmost(),
			n = top ? wgt.$n('a') : wgt.$n(),
			cls = wgt.getZclass() + (top ? '-body-over' : '-over');
		jq(n).removeClass(cls);
	}
});

zul.menu.ContentHandler = zk.$extends(zk.Object, {
	 $init: function(wgt, content) {
	 	this.$supers('$init', arguments);
		this._wgt = wgt;
		this._content = content;
	 },
	 setContent: function (content) {
	 	if (this._content != content || !this._pp) {
			this._content = content;
			this._wgt.rerender();	
		}
	 },
	 redraw: function (out) {
	 	var wgt = this._wgt,
			zcls = wgt.getZclass();

	 	out.push('<div id="', wgt.uuid, '-cnt-pp" class="', zcls,
		'-cnt-pp" style="display:none"><div class="', zcls,'-cnt-body">', this._content, '</div></div>');
	 },
	 bind: function () {
	 	var wgt = this._wgt;
	 	if (!wgt.menupopup) {
			wgt.domListen_(wgt.$n(), 'onClick', 'onShow');
			zWatch.listen({onFloatUp: wgt, onHide: wgt});
		}
		
		this._pp = jq('#' + wgt.uuid + '-' + 'cnt-pp')[0];
	 },
	 unbind: function () {
	 	var wgt = this._wgt;
	 	if (!wgt.menupopup) {
			if (this._shadow) {
				this._shadow.destroy();
				this._shadow = null;
			}
			wgt.domUnlisten_(wgt.$n(), 'onClick', 'onShow');
			zWatch.unlisten({onFloatUp: wgt, onHide: wgt});
		}

		this._pp = null;
	 },
	 isOpen: function () {
		 var pp = this._pp;
		 return (pp && zk(pp).isVisible());
	 },
	 onShow: function () {
	 	var wgt = this._wgt,
			pp = this._pp;
		if (!pp) return;
			
		pp.style.width = pp.style.height = "auto";
		pp.style.position = "absolute";
		pp.style.overflow = "auto";
		pp.style.display = "block";
		pp.style.zIndex = "88000";
			
		jq(pp).zk.makeVParent();
		zk(pp).position(wgt.$n(), this.getPosition());
		this.syncShadow();
	 },
	 onHide: function () {
		var pp = this._pp;
		if (!pp || !zk(pp).isVisible()) return;

		pp.style.display = "none";
		jq(pp).zk.undoVParent();
		this.hideShadow();	
	 },
	 onFloatUp: function (ctl) {
		if (!zUtl.isAncestor(this._wgt, ctl.origin))
			this.onHide();
	 },
	 syncShadow: function () {
	 	if (!this._shadow)
			this._shadow = new zk.eff.Shadow(this._wgt.$n("cnt-pp"), {stackup:(zk.useStackup === undefined ? zk.ie6_: zk.useStackup)});
		this._shadow.sync();
	 },
	 hideShadow: function () {
	 	this._shadow.hide();
	 },
	 destroy: function () {
	 	this._wgt.rerender();
	 },
	 getPosition: function () {
	 	var wgt = this._wgt;
		if (wgt.isTopmost()) {
			var bar = wgt.getMenubar();
			if (bar)
				return 'vertical' == bar.getOrient() ? 'end_before' : 'after_start';
		}
		return 'end_before';
	}
});
zkreg('zul.menu.Menu');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		btn = zk.ie && !zk.ie8 ? 'input' : 'button',
		contentHandler = this._contentHandler;

	if (this.isTopmost()) {
		out.push('<td align="left"', this.domAttrs_(), '><table id="', uuid,
				'-a"', zUtl.cellps0, ' class="', zcls, '-body');

		if (this.getImage()) {
			out.push(' ', zcls, '-body');
			if (this.getLabel())
				out.push('-text');

			out.push('-img');
		}

		out.push('" style="width: auto;"><tbody><tr><td class="', zcls,
				'-inner-l"><span class="', zcls, '-space"></span></td><td class="', zcls,
				'-inner-m"><div><', btn, ' id="', uuid,
				'-b" type="button" class="', zcls, '-btn"');
		if (this.getImage())
			out.push(' style="background-image:url(', this.getImage(), ')"');

		out.push('>', zUtl.encodeXML(this.getLabel()), '&nbsp;</', btn, '>');

		if (this.menupopup)
			this.menupopup.redraw(out);
		else if (contentHandler)
			contentHandler.redraw(out);

		out.push('</div></td><td class="', zcls, '-inner-r"><span class="', zcls, '-space"></span></td></tr></tbody></table></td>');

	} else {
		out.push('<li', this.domAttrs_(), '><a href="javascript:;" id="', uuid,
				'-a" class="', zcls, '-cnt ', zcls, '-cnt-img">', this.domContent_(), '</a>');

		if (this.menupopup)
			this.menupopup.redraw(out);
		else if (contentHandler)
			contentHandler.redraw(out);

		out.push('</li>');
	}
}
;zkmld(zk._p.p.Menu,zk._m);

zul.menu.Menuitem = zk.$extends(zul.LabelImageWidget, {
	_value: "",

	$define: {
		
		
		checkmark: _zkf = function () {
			this.rerender();
		},
		
		
		disabled: _zkf,
		
		
		href: _zkf,
		
		
		value: null,
		
		
		checked: function (checked) {
			if (checked)
				this._checkmark = checked;
			var n = this.$n('a');
			if (n && !this.isTopmost() && !this.getImage()) {
				var zcls = this.getZclass(),
					$n = jq(n);
				$n.removeClass(zcls + '-cnt-ck')
					.removeClass(zcls + '-cnt-unck');
				if (this._checkmark)
					$n.addClass(zcls + (checked ? '-cnt-ck' : '-cnt-unck'));
			}
		},
		
		
		autocheck: null,
		
		
		target: function (target) {
			var anc = this.$n('a');
			if (anc) {
				if (this.isTopmost())
					anc = anc.parentNode;
				anc.target = this._target;
			}
		},
		
		
		upload: function (v) {
			var n = this.$n();
			if (n) {
				this._cleanUpld();
				if (v && v != 'false') this._initUpld();
			}
		}
	},
	
	isTopmost: function () {
		return this._topmost;
	},
	beforeParentChanged_: function (newParent) {
		this._topmost = newParent && !(newParent.$instanceof(zul.menu.Menupopup));
		this.$supers("beforeParentChanged_", arguments);
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var added = this.isDisabled() ? this.getZclass() + '-disd' : '';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	getZclass: function () {
		return this._zclass == null ? "z-menu-item" : this._zclass;
	},
	domContent_: function () {
		var label = zUtl.encodeXML(this.getLabel()),
			img = '<span class="' + this.getZclass() + '-img"' +
				(this._image ? ' style="background-image:url(' + this._image + ')"' : '')
				+ '></span>';
		return label ? img + ' ' + label: img;
	},
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments);
		return this.isTopmost() ?
			style + 'padding-left:4px;padding-right:4px;': style;
	},
	
	getMenubar: function () {
		for (var p = this.parent; p; p = p.parent)
			if (p.$instanceof(zul.menu.Menubar))
				return p;
		return null;
	},
	bind_: function () {
		this.$supers(zul.menu.Menuitem, 'bind_', arguments);

		if (!this.isDisabled()) {
			if (this.isTopmost()) {
				var anc = this.$n('a');
				this.domListen_(anc, "onFocus", "doFocus_")
					.domListen_(anc, "onBlur", "doBlur_");
			}
			if (this._upload) this._initUpld();
		}
	},
	unbind_: function () {
		if (!this.isDisabled()) {
			if (this._upload) this._cleanUpld();
			if (this.isTopmost()) {
				var anc = this.$n('a');
				this.domUnlisten_(anc, "onFocus", "doFocus_")
					.domUnlisten_(anc, "onBlur", "doBlur_");
			}
		}

		this.$supers(zul.menu.Menuitem, 'unbind_', arguments);
	},
	_initUpld: function () {
		zWatch.listen(zk.ie7_ ? {onShow: this, onSize: this} : {onShow: this});
		var v;
		if (v = this._upload)
			this._uplder = new zul.Upload(this, this.isTopmost() ? this.$n() : this.$n('a'), v);
	},
	_cleanUpld: function () {
		var v;
		if (v = this._uplder) {
			zWatch.unlisten(zk.ie7_ ? {onShow: this, onSize: this} : {onShow: this});
			this._uplder = null;
			v.destroy();
		}
	},
	onShow: _zkf = function () {
		if (this._uplder)
			this._uplder.sync();
	},
	onSize: zk.ie7_ ? _zkf : zk.$void, 
	doClick_: function (evt) {
		if (this._disabled)
			evt.stop();
		else {
			if (!this._canActivate(evt)) return;

			var topmost = this.isTopmost(),
				anc = this.$n('a');

			if (topmost) {
				jq(anc).removeClass(this.getZclass() + '-body-over');
				anc = anc.parentNode;
			}
			if (anc.href.startsWith('javascript:')) {
				if (this.isAutocheck()) {
					this.setChecked(!this.isChecked());
					this.fire('onCheck', this.isChecked());
				}
				this.fireX(evt);
			} else {
				if (zk.ie && topmost && this.$n().id != anc.id)
					zUtl.go(anc.href, {target: anc.target});
					
					
					
				if (zk.gecko3 && topmost && this.$n().id != anc.id) {				
					zUtl.go(anc.href, {target: anc.target});
					evt.stop();
					
				}
			}
			if (!topmost)
				for (var p = this.parent; p; p = p.parent)
					if (p.$instanceof(zul.menu.Menupopup))
						
						if (p.isOpen() && !this._uplder )							
							p.close({sendOnOpen:true});
						else break;
										
			this.$class._rmActive(this);
			this.$super('doClick_', evt, true);			
		}
	},
	_canActivate: function (evt) {
		return !this.isDisabled() && (!zk.ie || !this.isTopmost() || this._uplder
				|| jq.isAncestor(this.$n('a'), evt.domTarget));
	},
	doMouseOver_: function (evt) {
		if (!this.$class._isActive(this) && this._canActivate(evt)) {
			this.$class._addActive(this);
			zWatch.fire('onFloatUp', this); 
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		if (!this.isDisabled()) {
			var deact = !zk.ie;
			if (!deact) {
				var n = this.$n('a'),
					xy = zk(n).revisedOffset(),
					x = evt.pageX,
					y = evt.pageY,
					diff = this.isTopmost() ? 1 : 0;
				deact = x - diff <= xy[0] || x > xy[0] + n.offsetWidth
					|| y - diff <= xy[1] || y > xy[1] + n.offsetHeight + (zk.ie ? -1 : 0);
			}
			if (deact)
				this.$class._rmActive(this);
		}
		this.$supers('doMouseOut_', arguments);
	}
}, {
	_isActive: function (wgt) {
		var top = wgt.isTopmost(),
			n = top ? wgt.$n('a') : wgt.$n(),
			cls = wgt.getZclass() + (top ? '-body-over' : '-over');
		return jq(n).hasClass(cls);
	},
	_addActive: function (wgt) {
		var top = wgt.isTopmost(),
			n = top ? wgt.$n('a') : wgt.$n(),
			cls = wgt.getZclass() + (top ? '-body-over' : '-over');
		jq(n).addClass(cls);
		if (!top && wgt.parent.parent.$instanceof(zul.menu.Menu))
			this._addActive(wgt.parent.parent);
	},
	_rmActive: function (wgt) {
		var top = wgt.isTopmost(),
			n = top ? wgt.$n('a') : wgt.$n(),
			cls = wgt.getZclass() + (top ? '-body-over' : '-over');
		jq(n).removeClass(cls);
	}
});

zkreg('zul.menu.Menuitem');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		btn = zk.ie && !zk.ie8 ? 'input' : 'button',
		target = this.getTarget(),
		img = this.getImage();

	if (this.isTopmost()) {
		out.push('<td align="left"', this.domAttrs_(), '><a href="',
				this.getHref() ? this.getHref() : 'javascript:;', '"');
		if (target)
			out.push(' target="', target, '"');
		out.push(' class="', zcls, '-cnt"><table id="', uuid, '-a"', zUtl.cellps0,
				' class="', zcls, '-body');
		if (img) {
			out.push(' ', zcls, '-body');
			if (this.getLabel())
				out.push('-text');

			out.push('-img');
		}
		out.push('" style="width: auto;"><tbody><tr><td class="', zcls,
				'-inner-l"><span class="', zcls, '-space"></span></td><td class="', zcls,
				'-inner-m"><div><', btn, ' id="', uuid,
				'-b" type="button" class="', zcls, '-btn"');
		if (img)
			out.push(' style="background-image:url(', img, ')"');

		out.push('>', zUtl.encodeXML(this.getLabel()), '&nbsp;</', btn, '></div></td><td class="',
					zcls, '-inner-r"><span class="', zcls, '-space"></span></td></tr></tbody></table></a></td>');
	} else {
		out.push('<li', this.domAttrs_(), '>');
		var cls = zcls + '-cnt' +
				(!img && this.isCheckmark() ?
						' ' + zcls + (this.isChecked() ? '-cnt-ck' : '-cnt-unck') : '');
		out.push('<a href="', this.getHref() ? this.getHref() : 'javascript:;', '"');
		if (target)
			out.push(' target="', target, '"');
		out.push(' id="', uuid, '-a" class="', cls, '">', this.domContent_(), '</a></li>');
	}
}

;zkmld(zk._p.p.Menuitem,zk._m);

zul.menu.Menuseparator = zk.$extends(zul.Widget, {
	
	isPopup: function () {
		return this.parent && this.parent.$instanceof(zul.menu.Menupopup);
	},
	
	getMenubar: function () {
		for (var p = this.parent; p; p = p.parent)
			if (p.$instanceof(zul.menu.Menubar))
				return p;
		return null;
	},
	getZclass: function () {
		return this._zclass == null ? "z-menu-separator" : this._zclass;
	},
	doMouseOver_: function () {
		zWatch.fire('onFloatUp', this); 
		this.$supers('doMouseOver_', arguments);
	}
});

zkreg('zul.menu.Menuseparator');zk._m={};
zk._m['default']=
function (out) {
	var tagnm = this.isPopup() ? "li" : "td";
	out.push('<',tagnm, this.domAttrs_(), '><span class="', this.getZclass(),
			'-inner">&nbsp;</span></',tagnm,'>');
}

;zkmld(zk._p.p.Menuseparator,zk._m);

zul.menu.Menupopup = zk.$extends(zul.wgt.Popup, {
	_curIndex: -1,

	_getCurrentIndex: function () {
		return this._curIndex;
	},
	getZclass: function () {
		return this._zclass == null ? "z-menu-popup" : this._zclass;
	},
	_isActiveItem: function (wgt) {
		return wgt.isVisible() && (wgt.$instanceof(zul.menu.Menu) || (wgt.$instanceof(zul.menu.Menuitem) && !wgt.isDisabled()));
	},
	_currentChild: function (index) {
		var index = index != null ? index : this._curIndex;
		for (var w = this.firstChild, k = -1; w; w = w.nextSibling)
			if (this._isActiveItem(w) && ++k === index)
				return w;
		return null;
	},
	_previousChild: function (wgt) {
		wgt = wgt ? wgt.previousSibling : this.lastChild;
		var lastChild = this.lastChild == wgt;
		for (; wgt; wgt = wgt.previousSibling)
			if (this._isActiveItem(wgt)) {
				this._curIndex--;
				return wgt;
			}
		if (lastChild) return null; 
		this.curIndex = 0;
		for (wgt = this.firstChild; wgt; wgt = wgt.nextSibling)
			if (this._isActiveItem(wgt)) this._curIndex++;
		return this._previousChild();
	},
	_nextChild: function (wgt) {
		wgt = wgt ? wgt.nextSibling : this.firstChild;
		var firstChild = this.firstChild == wgt;
		for (; wgt; wgt = wgt.nextSibling)
			if (this._isActiveItem(wgt)) {
				this._curIndex++;
				return wgt;
			}
		if (firstChild) return null; 
		this._curIndex = -1;
		return this._nextChild();
	},
	zsync: function () {
		this.$supers('zsync', arguments);

		if (!this._shadow)
			this._shadow = new zk.eff.Shadow(this.$n());
		this._shadow.sync();
	},
	_hideShadow: function () {
		if (this._shadow) this._shadow.hide();
	},
	close: function () {
		this.$supers('close', arguments);
		jq(this.$n()).hide(); 
		this._hideShadow();
		var menu = this.parent;
		if (menu.$instanceof(zul.menu.Menu) && menu.isTopmost())
			jq(menu.$n('a')).removeClass(menu.getZclass() + "-body-seld");

		var item = this._currentChild();
		if (item) item.$class._rmActive(item);
		this._curIndex = -1;
		this.$class._rmActive(this);
	},
	open: function (ref, offset, position, opts) {
		if (this.parent.$instanceof(zul.menu.Menu)) {
			if (!offset) {
				ref = this.parent.$n('a');
				if (!position)
					if (this.parent.isTopmost())
						position = this.parent.parent.getOrient() == 'vertical'
							? 'end_before' : 'after_start';
					else position = 'end_before';
			}
		}
		this.$super('open', ref, offset, position, opts || {sendOnOpen: true, disableMask: true});
			
	},
	shallStackup_: function () {
		return false;
	},
	setTopmost: function () {
		this.$supers('setTopmost', arguments);
		this.zsync();
	},
	onFloatUp: function(ctl) {
		if (!this.isVisible())
			return;

		var org = ctl.origin;
		if (this.parent.menupopup == this && !this.parent.isTopmost() && !this.parent.$class._isActive(this.parent)) {
			this.close({sendOnOpen:true});
			return;
		}

		
		for (var floatFound, wgt = org; wgt; wgt = wgt.parent) {
			if (wgt == this || (wgt.menupopup == this && !this._shallClose)) {
				if (!floatFound)
					this.setTopmost();
				return;
			}
			floatFound = floatFound || wgt.isFloating_();
		}

		
		if (org && org.$instanceof(zul.menu.Menu)) {
			for (var floatFound, wgt = this; wgt = wgt.parent;) {
				if (wgt == org) {
					if (this._shallClose)
						break; 
					if (!floatFound)
						this.setTopmost();
					return;
				}
				floatFound = floatFound || wgt.isFloating_();
			}

			
		}
		this.close({sendOnOpen:true});
	},
	onShow: function () {
		if (zk.ie7_) {
			var pp = this.$n();
			if (!pp.style.width) {
				var ul = this.$n('cave');
				if (ul.childNodes.length)
					pp.style.width = ul.offsetWidth + zk(pp).padBorderWidth() + "px";
			}
		}
		this.zsync();
		var anc = this.$n('a');
		if (anc) {
			if(zk(anc).isRealVisible())
				anc.focus();
		}
	},
	onHide: function () {
		if (this.isOpen())
			this.close();
		this._hideShadow();
	},
	bind_: function () {
		this.$supers(zul.menu.Menupopup, 'bind_', arguments);
		zWatch.listen({onHide: this, onResponse: this});
		if (!zk.css3) jq.onzsync(this);
	},
	unbind_: function () {
		if (this.isOpen())
			this.close();
		if (this._shadow)
			this._shadow.destroy();
		if (!zk.css3) jq.unzsync(this);
		this._shadow = null;
		zWatch.unlisten({onHide: this, onResponse: this});
		this.$supers(zul.menu.Menupopup, 'unbind_', arguments);
	},
	onResponse: function () {
		if (!this.isOpen())
			return; 
		if (zk.ie7_) {
			var pp = this.$n();
		
    		
    		pp.style.width = '';
    		
    		
    		var ul = this.$n('cave');
    		if (ul.childNodes.length) 
    			pp.style.width = ul.offsetWidth + zk(pp).padBorderWidth() + "px";
		}
		this.zsync();
		
		this.$supers('onResponse', arguments); 
	},
	doKeyDown_: function (evt) {
		var w = this._currentChild(),
			keyCode = evt.keyCode;
		switch (keyCode) {
		case 38: 
		case 40: 
			if (w) w.$class._rmActive(w);
			w = keyCode == 38 ? this._previousChild(w) : this._nextChild(w);
			if (w) w.$class._addActive(w);
			break;
		case 37: 
			this.close();

			if (this.parent.$instanceof(zul.menu.Menu) && !this.parent.isTopmost()) {
				var pp = this.parent.parent;
				if (pp) {
					var anc = pp.$n('a');
					if (anc) anc.focus();
				}
			}
			break;
		case 39: 
			if (w && w.$instanceof(zul.menu.Menu) && w.menupopup)
				w.menupopup.open();
			break;
		case 13: 
			if (w && w.$instanceof(zul.menu.Menuitem)) {
				
				w.doClick_(new zk.Event(w, 'onClick',{}));
				zWatch.fire('onFloatUp', w); 
				this.close({sendOnOpen:true});
			}
			break;
		}
		evt.stop();
		this.$supers('doKeyDown_', arguments);
	},
	doMouseOver_: function (evt) {
		this._shallClose = false;
		this.$supers('doMouseOver_', arguments);
	}
}, {
	_rmActive: function (wgt) {
		if (wgt.parent.$instanceof(zul.menu.Menu)) {
			wgt.parent.$class._rmActive(wgt.parent);
			if (!wgt.parent.isTopmost())
				this._rmActive(wgt.parent.parent);
		}
	}
});

zkreg('zul.menu.Menupopup');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		tags = zk.ie || zk.gecko ? 'a' : 'button';
	out.push('<div', this.domAttrs_(), '><', tags, ' id="', uuid,
			'-a" tabindex="-1" onclick="return false;" href="javascript:;"',
			' class="z-focus-a"></',
			tags, '><ul class="', zcls, '-cnt" id="', uuid, '-cave">');

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</ul></div>');
}

;zkmld(zk._p.p.Menupopup,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.menu',1);