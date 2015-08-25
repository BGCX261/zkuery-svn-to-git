zk.load('zk.fmt,zul.inp',function(){zk._p=zkpi('zul.db',true);try{
zk.fmt.Date = {
	checkDate : function (ary, txt) {
		if (txt.length)
			for (var j = ary.length; j--;) {
				var k = txt.indexOf(ary[j]);
				if (k >= 0)
					txt = txt.substring(0, k) + txt.substring(k + ary[j].length);
			}
		return txt;
	},
	digitFixed : function (val, digits) {
		var s = "" + val;
		for (var j = digits - s.length; --j >= 0;)
			s = "0" + s;
		return s;
	},
	_parseToken: function (token, ts, i, len) {
		if (len < 2) len = 2;
		if (token && token.length > len) {
			ts[i] = token.substring(len);
			return token.substring(0, len);
		}
		return token;
	},
	parseDate : function (txt, fmt, strict) {
		if (!fmt) fmt = "yyyy/MM/dd";
		var val = zUtl.today(true),
			y = val.getFullYear(),
			m = val.getMonth(),
			d = val.getDate(),
			hr = val.getHours(),
			min = val.getMinutes(),
			sec = val.getSeconds(),
			aa = fmt.indexOf('a'),
			hh = fmt.indexOf('h'),
			KK = fmt.indexOf('K'),
			hasAM = aa > -1,
			hasHour1 = hasAM ? hh > -1 || KK > -1 : false,
			isAM;

		var	ts = [], mindex = fmt.indexOf("MMM"),
			fmtlen = fmt.length, ary = [],
			
			isNumber = !isNaN(txt),
			tlen = txt.replace(/[^.]/g, '').length,
			flen = fmt.replace(/[^.]/g, '').length;
		for (var i = 0, j = txt.length; i < j; i++) {
			var c = txt.charAt(i),
				f = fmtlen > i ? fmt.charAt(i) : "";
			if (c.match(/\d/)) {
				ary.push(c);
			} else if ((mindex > -1 && mindex <= i ) || (aa > -1 && aa <= i)) {
				if (c.match(/\w/)) {
					ary.push(c);
				} else {
					if (c.charCodeAt() < 128 && (c.charCodeAt() != 46 ||
								tlen == flen || f.charCodeAt() == 46)) {
						if (ary.length) {
							ts.push(ary.join(""));
							ary = [];
						}
					} else
						ary.push(c);
				}
			} else if (ary.length) {
				ts.push(ary.join(""));
				ary = [];
			}
		}
		if (ary.length) ts.push(ary.join(""));
		for (var i = 0, j = 0, offs = 0, fl = fmt.length; j < fl; ++j) {
			var cc = fmt.charAt(j);
			if ((cc >= 'a' && cc <= 'z') || (cc >= 'A' && cc <= 'Z')) {
				var len = 1;
				for (var k = j; ++k < fl; ++len)
					if (fmt.charAt(k) != cc)
						break;

				var nosep; 
				if (k < fl) {
					var c2 = fmt.charAt(k);
					nosep = c2 == 'y' || c2 == 'M' || c2 == 'd' || c2 == 'E';
				}
				var token = isNumber ? ts[0].substring(j - offs, k - offs) : ts[i++];
				switch (cc) {
				case 'y':
					if (nosep) {
						if (len <= 3) len = 2;
						if (token && token.length > len) {
							ts[--i] = token.substring(len);
							token = token.substring(0, len);
						}
					}
					y = zk.parseInt(token);
					if (isNaN(y)) return null; 
					if (y < 100) y += y > 29 ? 1900 : 2000;
					break;
				case 'M':
					var mon = txt.substring(j).toLowerCase().trim(),
						mToken = token ? token.toLowerCase() : '';
					for (var index = zk.SMON.length; --index >= 0;) {
						var smon = zk.SMON[index].toLowerCase();
						if (mon.startsWith(smon) || (mToken && mToken.startsWith(smon))) {
							token = zk.SMON[index];
							m = index;
							break;
						}
					}
					if (len == 3 && token) {
						if (nosep)
							token = this._parseToken(mToken, ts, --i, token.length);
						break; 
					}else if (len <= 2) {
						if (nosep && token && token.length > 2) {
							ts[--i] = token.substring(2);
							token = token.substring(0, 2);
						}
						m = zk.parseInt(token) - 1;
						if (isNaN(m)) return null; 
					} else {
						for (var l = 0;; ++l) {
							if (l == 12) return null; 
							if (len == 3) {
								if (zk.SMON[l] == token) {
									m = l;
									break;
								}
							} else {
								if (token && zk.FMON[l].startsWith(token)) {
									m = l;
									break;
								}
							}
						}
					}
					break;
				case 'd':
					if (nosep)
						token = this._parseToken(token, ts, --i, len);
					d = zk.parseInt(token);
					if (isNaN(d)) return null; 
					break;
				case 'H':
					if (hasHour1)
						break;
					if (nosep)
						token = this._parseToken(token, ts, --i, len);
					hr = zk.parseInt(token);
					if (isNaN(hr)) return null; 
					break;
				case 'h':
					if (!hasHour1)
						break;
					if (nosep)
						token = this._parseToken(token, ts, --i, len);
					hr = zk.parseInt(token);
					if (hr == 12)
						hr = 0;
					if (isNaN(hr)) return null; 
					break;
				case 'K':
					if (!hasHour1)
						break;
					if (nosep)
						token = this._parseToken(token, ts, --i, len);
					hr = zk.parseInt(token);
					if (isNaN(hr)) return null; 
					hr %= 12;
					break;
				case 'k':
					if (hasHour1)
						break;
					if (nosep)
						token = this._parseToken(token, ts, --i, len);
					hr = zk.parseInt(token);
					if (hr == 24)
						hr = 0;
					if (isNaN(hr)) return null; 
					break;					
				case 'm':
					if (nosep)
						token = this._parseToken(token, ts, --i, len);
					min = zk.parseInt(token);
					if (isNaN(min)) return null; 
					break;
				case 's':
					if (nosep)
						token = this._parseToken(token, ts, --i, len);
					sec = zk.parseInt(token);
					if (isNaN(sec)) return null; 
					break;
				case 'a':
					if (!hasHour1)
						break;
					isAM = txt.substring(j).startsWith(zk.APM[0]);
					break
				
				}
				j = k - 1;
			} else offs++;
		}

		if (hasHour1 && isAM === false)
			hr += 12;
		var dt = new Date(y, m, d, hr, min, sec);
		if (strict) {
			if (dt.getFullYear() != y || dt.getMonth() != m || dt.getDate() != d ||
				dt.getHours() != hr || dt.getMinutes() != min || dt.getSeconds() != sec)
				return null; 

			txt = txt.trim();
			txt = this.checkDate(zk.FDOW, txt);
			txt = this.checkDate(zk.SDOW, txt);
			txt = this.checkDate(zk.S2DOW, txt);
			txt = this.checkDate(zk.FMON, txt);
			txt = this.checkDate(zk.SMON, txt);
			txt = this.checkDate(zk.S2MON, txt);
			txt = this.checkDate(zk.APM, txt);
			for (var j = txt.length; j--;) {
				var cc = txt.charAt(j);
				if ((cc > '9' || cc < '0') && fmt.indexOf(cc) < 0)
					return null; 
			}
		}
		return dt;
	},
	formatDate : function (val, fmt) {
		if (!fmt) fmt = "yyyy/MM/dd";

		var txt = "";
		for (var j = 0, fl = fmt.length; j < fl; ++j) {
			var cc = fmt.charAt(j);
			if ((cc >= 'a' && cc <= 'z') || (cc >= 'A' && cc <= 'Z')) {
				var len = 1;
				for (var k = j; ++k < fl; ++len)
					if (fmt.charAt(k) != cc)
						break;

				switch (cc) {
				case 'y':
					if (len <= 3) txt += this.digitFixed(val.getFullYear() % 100, 2);
					else txt += this.digitFixed(val.getFullYear(), len);
					break;
				case 'M':
					if (len <= 2) txt += this.digitFixed(val.getMonth()+1, len);
					else if (len == 3) txt += zk.SMON[val.getMonth()];
					else txt += zk.FMON[val.getMonth()];
					break;
				case 'd':
					txt += this.digitFixed(this.dayInMonth(val), len);
					break;
				case 'E':
					if (len <= 3) txt += zk.SDOW[(val.getDay() - zk.DOW_1ST) % 7];
					else txt += zk.FDOW[(val.getDay() - zk.DOW_1ST) % 7];
					break;
				case 'D':
					txt += this.dayInYear(val);
					break;
				case 'w':
					txt += this.weekInYear(val);
					break;
				case 'W':
					txt += this.weekInMonth(val);
					break;
				case 'G':
					txt += zk.ERA;
					break;
				case 'F':
					txt += this.dayOfWeekInMonth(val);
					break;
				case 'H':
					if (len <= 2) txt += this.digitFixed(val.getHours(), len);
					break;
				case 'k':
					var h = val.getHours();
					if (h == 0)
						h = '24';
					if (len <= 2) txt += this.digitFixed(h, len);
					break;
				case 'K':
					if (len <= 2) txt += this.digitFixed(val.getHours() % 12, len);
					break;
				case 'h':
					var h = val.getHours();
					h %= 12;
					if (h == 0)
						h = '12';
					if (len <= 2) txt += this.digitFixed(h, len);
					break;
				case 'm':
					if (len <= 2) txt += this.digitFixed(val.getMinutes(), len);
					break;
				case 's':
					if (len <= 2) txt += this.digitFixed(val.getSeconds(), len);
					break;
				case 'Z':
					txt += -(val.getTimezoneOffset()/60);
					break;
				case 'a':
					txt += zk.APM[val.getHours() > 11 ? 1 : 0];
					break;
				default:
					txt += '1';
					
					
				}
				j = k - 1;
			} else {
				txt += cc;
			}
		}
		return txt;
	},
	
	ms2day : function (t) {
		return Math.round(t / 86400000);
	},
	
	dayInYear : function (d, ref) {
		if (!ref) ref = new Date(d.getFullYear(), 0, 1);
		return this.digitFixed(1 + this._dayInYear(d, ref));
	},
	_dayInYear: function (d, ref) {
		return Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate())-ref)/864e5);
	},
	
	dayInMonth : function (d) {
		return d.getDate();
	},
	
	weekInYear : function (d, ref) {
		if (!ref) ref = new Date(d.getFullYear(), 0, 1);
		var wday = ref.getDay();
		if (wday == 7) wday = 0;
		return this.digitFixed(1 + Math.floor((this._dayInYear(d, ref) + wday) / 7));
	},
	
	weekInMonth : function (d) {
		return this.weekInYear(d, new Date(d.getFullYear(), d.getMonth(), 1));
	},
	
	dayOfWeekInMonth : function (d) {
		return this.digitFixed(1 + Math.floor(this._dayInYear(d, new Date(d.getFullYear(), d.getMonth(), 1)) / 7));
	}
};

zk.fmt.Calendar = zk.$extends(zk.Object, {
	_offset: zk.YDELTA,
	$init: function (date) {
		this._date = date;
	},
	getTime: function () {
		return this._date;
	},
	setTime: function (date) {
		this._date = date;
	},
	setYearOffset: function (val) {
		this._offset = val;
	},
	getYearOffset: function () {
		return this._offset;
	},
	formatDate: function (val, fmt) {
		var d;
		if (this._offset) {
    		d = new Date(val);
    		d.setFullYear(d.getFullYear() + this._offset);
		}
		return zk.fmt.Date.formatDate(d || val, fmt);
	},
	parseDate: function (txt, fmt, strict) {
		var d = zk.fmt.Date.parseDate(txt, fmt, strict);
		if (this._offset && fmt) {
			var cnt = 0;
			for (var i = fmt.length; i--;)
				if (fmt.charAt(i) == 'y')
					cnt++;
			if (cnt > 3)
				d.setFullYear(d.getFullYear() - this._offset);
			else if (cnt) {
				var year = d.getFullYear();
				if (year < 2000)
					d.setFullYear(year + (Math.ceil(this._offset / 100) * 100 - this._offset));
				else
					d.setFullYear(year - (this._offset % 100));
			}
		}
		return d;
	},
	getYear: function () {
		return this._date.getFullYear() + this._offset;
	}
});




(function () {
	
	var _doFocus = zk.gecko ? function (n, timeout) {
			if (timeout)
				setTimeout(function () {
					jq(n).focus();
				});
			else
				jq(n).focus();
		} : function (n) {
			jq(n).focus();
		};

	function _newDate(year, month, day, bFix) {
		var v = new Date(year, month, day);
		return bFix && v.getMonth() != month ?
			new Date(year, month + 1, 0): v; 
	}

var Renderer =

zul.db.Renderer = {
	
	cellHTML: function (cal, y, m, day, monthofs) {
		return '<a href="javascript:;">' + day + '</a>';
	},
	
	beforeRedraw: function (cal) {
	},
	
	disabled: function (cal, y, m, v, today) {
		var d = new Date(y, m, v, 0, 0, 0, 0);
		switch (cal._constraint) {
		case 'no today':
			return today - d == 0;
		case 'no past':
			return (d - today) / 86400000 < 0;
		case 'no future':
			return (today - d)/ 86400000 < 0;
		}
		var result = false;
		if (cal._beg && (result = (d - cal._beg) / 86400000 < 0))
			return result;
		if (cal._end && (result = (cal._end - d) / 86400000 < 0))
			return result;
		return result;
	}
};

var Calendar =

zul.db.Calendar = zk.$extends(zul.Widget, {
	_view : "day", 
	
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onChange: this}, -1000);
	},
	$define: {
		
		
		value: function() {
			this.rerender();
		},
		
		
		constraint: function() {
			var constraint = this._constraint || '';
			if (typeof this._constraint != 'string') return;
			if (constraint.startsWith("between")) {
				var j = constraint.indexOf("and", 7);
				if (j < 0 && zk.debugJS) 
					zk.error('Unknown constraint: ' + constraint);
				this._beg = new zk.fmt.Calendar().parseDate(constraint.substring(7, j), 'yyyyMMdd');
				this._end = new zk.fmt.Calendar().parseDate(constraint.substring(j + 3), 'yyyyMMdd');
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
			} else if (constraint.startsWith("before")) {
				this._end = new zk.fmt.Calendar().parseDate(constraint.substring(6), 'yyyyMMdd');
				this._end.setHours(0);
				this._end.setMinutes(0);
				this._end.setSeconds(0);
				this._end.setMilliseconds(0);
			} else if (constraint.startsWith("after")) {
				this._beg = new zk.fmt.Calendar().parseDate(constraint.substring(5), 'yyyyMMdd');
				this._beg.setHours(0);
				this._beg.setMinutes(0);
				this._beg.setSeconds(0);
				this._beg.setMilliseconds(0);
			}
		},
		
		
		name: function () {
			if (this.efield)
				this.efield.name = this._name;
		}
	},
	
	redraw: function () {
		Renderer.beforeRedraw(this);
		this.$supers("redraw", arguments);
	},
	onChange: function (evt) {
		this.updateFormData(evt.data.value);
	},
	doKeyDown_: function (evt) {
		var keyCode = evt.keyCode,
			ofs = keyCode == 37 ? -1 : keyCode == 39 ? 1 : keyCode == 38 ? -7 : keyCode == 40 ? 7 : 0;
		if (ofs) {
			this._shift(ofs);
		} else 
			this.$supers('doKeyDown_', arguments);
	},
	_shift: function (ofs) {
		var oldTime = this.getTime();	
		
		switch(this._view) {
		case 'month':
		case 'year':
			if (ofs == 7)
				ofs = 4;
			else if (ofs == -7)
				ofs = -4;
			break;
		case 'decade':
			if (ofs == 7)
				ofs = 4;
			else if (ofs == -7)
				ofs = -4;
			ofs *= 10;
			
			var y = oldTime.getFullYear();
			if (y + ofs < 1900 || y + ofs > 2100)
				return;

		}		
		this._shiftDate(this._view, ofs);
		var newTime = this.getTime();
		switch(this._view) {
		case 'day':
			if (oldTime.getYear() == newTime.getYear() &&
				oldTime.getMonth() == newTime.getMonth()) {
				this._markCal();
			} else 
				this.rerender();
			break;
		case 'month':
			if (oldTime.getYear() == newTime.getYear())
				this._markCal();
			else
				this.rerender();
			break;
		default:			
			this.rerender();

		}
	},
	
	getFormat: function () {
		return this._fmt || "yyyy/MM/dd";
	},
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-calendar";
	},
	updateFormData: function (val) {
		if (this._name) {
			val = val || '';
			if (!this.efield)
				this.efield = jq.newHidden(this._name, val, this.$n());
			else
				this.efield.value = val;
		}
	},
	bind_: function (){
		this.$supers(Calendar, 'bind_', arguments);
		var title = this.$n("title"),
			mid = this.$n("mid"),
			ly = this.$n("ly"),
			ry = this.$n("ry"),
			zcls = this.getZclass();
		jq(title).hover(
			function () {
				$(this).toggleClass(zcls + "-title-over");
			},
			function () {
			    $(this).toggleClass(zcls + "-title-over");
			}
		);
		if (this._view != 'decade') 
			this._markCal({timeout: true});
		else {
			var anc = jq(this.$n()).find('.' + zcls + '-seld')[0];
			if (anc)
				_doFocus(anc.firstChild, true);
		}

		this.domListen_(title, "onClick", '_changeView')
			.domListen_(mid, "onClick", '_clickDate')
			.domListen_(ly, "onClick", '_clickArrow')
			.domListen_(ry, "onClick", '_clickArrow')
			.domListen_(mid, "onMouseOver", '_doMouseEffect')
			.domListen_(mid, "onMouseOut", '_doMouseEffect');
		this.updateFormData(this._value || new zk.fmt.Calendar().formatDate(this.getTime(), this.getFormat()));
	},
	unbind_: function () {
		var title = this.$n("title"),
			mid = this.$n("mid"),
			ly = this.$n("ly"),
			ry = this.$n("ry");
		this.domUnlisten_(title, "onClick", '_changeView')
			.domUnlisten_(mid, "onClick", '_clickDate')
			.domUnlisten_(ly, "onClick", '_clickArrow')
			.domUnlisten_(ry, "onClick", '_clickArrow')
			.domUnlisten_(mid, "onMouseOver", '_doMouseEffect')
			.domUnlisten_(mid, "onMouseOut", '_doMouseEffect')
			.$supers(Calendar, 'unbind_', arguments);
		this.efield = null;
	},
	rerender: function () {
		if (this.desktop) {
			var s = this.$n().style,
				w = s.width,
				h = s.height;
			var result = this.$supers('rerender', arguments);
			s = this.$n().style;
			s.width = w;
			s.height = h;
			return result;
		}
	},
	_clickArrow: function (evt) {
		var node = evt.domTarget,
			ofs = node.id.indexOf("-ly") > 0 ? -1 : 1;
		if (jq(node).hasClass(this.getZclass() + (ofs == -1 ? '-left-icon-disd' : '-right-icon-disd')))
			return;
		switch(this._view) {
		case "day" :
			this._shiftDate("month", ofs);
			break;
		case "month" :
			this._shiftDate("year", ofs);
			break;
		case "year" :
			this._shiftDate("year", ofs*10);
			break;
		case "decade" :
			this._shiftDate("year", ofs*100);

		}
		this.rerender();
	},
	_doMouseEffect: function (evt) {
		var node = jq.nodeName(evt.domTarget, "td") ? evt.domTarget : evt.domTarget.parentNode,
			zcls = this.getZclass();
			
		if (jq(node).hasClass(zcls + '-disd'))
			return;
			
		if (jq(node).is("."+zcls+"-seld")) {
			jq(node).removeClass(zcls + "-over");
			jq(node).toggleClass(zcls + "-over-seld");
		}else {
			jq(node).toggleClass(zcls + "-over");
		}
	},
	
	getTime: function () {
		return this._value ? new zk.fmt.Calendar().parseDate(this._value, this.getFormat()) : zUtl.today(true);
	},
	_setTime: function (y, m, d, hr, mi) {
		var dateobj = this.getTime(),
			year = y != null ? y  : dateobj.getFullYear(),
			month = m != null ? m : dateobj.getMonth(),
			day = d != null ? d : dateobj.getDate();
		this._value = new zk.fmt.Calendar().formatDate(
			_newDate(year, month, day, true), this.getFormat());
		this.fire('onChange', {value: this._value});
	},
	_clickDate: function (evt) {
		var target = evt.domTarget, val;
		for (; target; target = target.parentNode)
			try { 
				if ((val = jq(target).attr("_dt")) !== undefined) {
					val = zk.parseInt(val);
					break;
				}
			} catch (e) {
				continue; 
			}
		this._chooseDate(target, val);
		evt.stop();
	},
	_chooseDate: function (target, val) {
		if (target && !jq(target).hasClass(this.getZclass() + '-disd')) {
			var cell = target,
				dateobj = this.getTime();
			switch(this._view) {
			case "day" :
				var oldTime = this.getTime();
				this._setTime(null, cell._monofs != null && cell._monofs != 0 ?
						dateobj.getMonth() + cell._monofs : null, val);
				var newTime = this.getTime();
				if (oldTime.getYear() == newTime.getYear() &&
					oldTime.getMonth() == newTime.getMonth()) {
						this._markCal();
				} else
					this.rerender();
				break;
			case "month" :
				this._setTime(null, val);
				this._setView("day");
				break;
			case "year" :
				this._setTime(val);
				this._setView("month");
				break;
			case "decade" :
				
				this._setTime(val);
				this._setView("year");

			}
		}
	},
	_shiftDate: function (opt, ofs) {
		var dateobj = this.getTime(),
			year = dateobj.getFullYear(),
			month = dateobj.getMonth(),
			day = dateobj.getDate(),
			nofix;
		switch(opt) {
		case "day" :
			day += ofs;
			nofix = true;
			break;
		case "month" :
			month += ofs;
			break;
		case "year" :
			year += ofs;
			break;
		case "decade" :
			year += ofs;

		}
		this._value = new zk.fmt.Calendar().formatDate(
			_newDate(year, month, day, !nofix), this.getFormat());
		this.fire('onChange', {value: this._value, shallClose: false});
	},
	_changeView : function (evt) {
		var tm = this.$n("tm"),
			ty = this.$n("ty"),
			tyd = this.$n("tyd");
		if (evt.domTarget == tm)
			this._setView("month");
		else if (evt.domTarget == ty)
			this._setView("year");
		else if (evt.domTarget == tyd )
			this._setView("decade");
		evt.stop();
	},
	_setView : function (view) {
		if (view != this._view) {
			this._view = view;
			this.rerender();
		}
	},
	_markCal: function (opts) {
		var	zcls = this.getZclass(),
		 	seldate = this.getTime(),
		 	m = seldate.getMonth(),
			d = seldate.getDate(),
			y = seldate.getFullYear(),
			last = new Date(y, m + 1, 0).getDate(), 
			prev = new Date(y, m, 0).getDate(), 
			v = new Date(y, m, 1).getDay()- zk.DOW_1ST,
			today = zUtl.today(true);

		
		for (var j = 0; j < 12; ++j) {
			var mon = this.$n("m" + j),
				year = this.$n("y" + j),
				yy = y % 10 + 1;
			if (mon) {
				if (m == j) {
					jq(mon).addClass(zcls+"-seld");
					jq(mon).removeClass(zcls+"-over");
					_doFocus(mon.firstChild, opts ? opts.timeout : false);
				} else
					jq(mon).removeClass(zcls+"-seld");
			}
			if (year) {
				if (yy == j) {
					jq(year).addClass(zcls+"-seld");
				    jq(year).removeClass(zcls+"-over");
					_doFocus(year.firstChild, opts ? opts.timeout : false);
				} else
					jq(year).removeClass(zcls+"-seld");
			}
		}

		if (v < 0) v += 7;
		for (var j = 0, cur = -v + 1; j < 6; ++j) {
			var week = this.$n("w" + j);
			if ( week != null) {
				for (var k = 0; k < 7; ++k, ++cur) {
					v = cur <= 0 ? prev + cur: cur <= last ? cur: cur - last;
					if (k == 0 && cur > last)
						week.style.display = "none";
					else {
						if (k == 0) week.style.display = "";
						var cell = week.cells[k],
							monofs = cur <= 0 ? -1: cur <= last ? 0: 1,
							bSel = cur == d;
						cell.style.textDecoration = "";
						cell._monofs = monofs;

						
						jq(cell).removeClass(zcls+"-over")
							.removeClass(zcls+"-over-seld");
						if (bSel)
							jq(cell).addClass(zcls+"-seld");
						else
							jq(cell).removeClass(zcls+"-seld");
						
						if (monofs)
							jq(cell).addClass("z-outside");
						else
							jq(cell).removeClass("z-outside");
							
						if (Renderer.disabled(this, y, m + monofs, v, today)) {
							jq(cell).addClass(zcls+"-disd");
						} else
							jq(cell).removeClass(zcls+"-disd");
						jq(cell).html(Renderer.cellHTML(this, y, m + monofs, v, monofs)).attr('_dt', v);
						if (bSel)
							_doFocus(cell.firstChild, opts ? opts.timeout : false);
					}
				}
			}
		}
	}
});
})();
zkreg('zul.db.Calendar');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		view = this._view,
		zcls = this.getZclass(),
		val = this.getTime(),
		m = val.getMonth(),
		d = val.getDate(),
		y = val.getFullYear(),
		ydelta = new zk.fmt.Calendar(val).getYear() - y, 
		yofs = y - (y % 10 + 1),
		ydec = zk.parseInt(y/100);
	out.push('<div id="', this.uuid, '"', this.domAttrs_(), '><table style="table-layout: fixed" width="100%"', zUtl.cellps0, '>',
			'<tr><td class="', zcls, '-tdl"><div  class="', zcls, '-left"><div id="', uuid, '-ly" class="', zcls, '-left-icon');

	if (view == 'decade' && ydec*100 == 1900)
		out.push(' ', zcls, '-left-icon-disd');
		
	out.push('"></div></div></td>',
				'<td><table class="', zcls, '-calctrl" width="100%" border="0" cellspacing="0" cellpadding="0">',
				'<tr><td id="', uuid, '-title">');
	switch(view) {
	case "day" :
		out.push('<span id="', uuid, '-tm" class="', zcls, '-ctrler">', zk.SMON[m], '</span>, <span id="', uuid, '-ty" class="', zcls, '-ctrler">', y + ydelta, '</span>');
		break;
	case "month" :
		out.push('<span id="', uuid, '-tm" class="', zcls, '-ctrler">', zk.SMON[m], '</span>, <span id="', uuid, '-ty" class="', zcls, '-ctrler">', y + ydelta, '</span>');
		break;
	case "year" :
		out.push('<span id="', uuid, '-tyd" class="', zcls, '-ctrler">', yofs + ydelta + 1, '-', yofs + ydelta + 10, '</span>');
		break;
	case "decade" :
		out.push('<span id="', uuid, '-tyd" class="', zcls, '-ctrler">', ydec*100 + ydelta, '-', ydec*100 + ydelta+ 99, '</span>');
		break;
	}
	out.push('</td></tr></table></td>',
		'<td class="', zcls, '-tdr"><div class="', zcls, '-right"><div id="', uuid, '-ry" class="', zcls, '-right-icon');
		
	if (view == 'decade' && ydec*100 == 2000)
		out.push(' ', zcls, '-right-icon-disd');
	
	out.push('"></div></div></td></tr>');
	
	switch(view) {
	case "day" :
		out.push('<tr><td colspan="3"><table id="', uuid, '-mid" class="', zcls, '-calday" width="100%" border="0" cellspacing="0" cellpadding="0">',
				'<tr class="', zcls, '-caldow">');
			var sun = (7 - zk.DOW_1ST) % 7, sat = (6 + sun) % 7;
			for (var j = 0 ; j < 7; ++j) {
				out.push('<td');
				if (j == sun || j == sat) out.push(' class="z-weekend"');
				out.push( '>' + zk.S2DOW[j] + '</td>');
			}
			out.push('</tr>');
			for (var j = 0; j < 6; ++j) { 
				out.push('<tr class="', zcls, '-caldayrow" id="', uuid, '-w', j, '" >');
				for (var k = 0; k < 7; ++k)
					out.push ('<td></td>');
				out.push('</tr>');
			}
		out.push('</table></td></tr>');
		break;
	case "month" :
		out.push('<tr><td colspan="3" ><table id="', uuid, '-mid" class="', zcls, '-calmon" width="100%" border="0" cellspacing="0" cellpadding="0">');
		for (var j = 0 ; j < 12; ++j) {
			if (!(j % 4)) out.push('<tr>');
			out.push('<td id="', uuid, '-m', j, '"_dt="', j ,'"><a href="javascript:;">', zk.SMON[j] + '</a></td>');
			if (!((j + 1) % 4)) out.push('</tr>');
		}
		out.push('</table></td></tr>');
		break;
	case "year" :
		out.push('<tr><td colspan="3" ><table id="', uuid, '-mid" class="', zcls, '-calyear" width="100%" border="0" cellspacing="0" cellpadding="0">');

		for (var j = 0 ; j < 12; ++j) {
			if (!(j % 4)) out.push('<tr>');
			out.push('<td _dt="', yofs ,'" id="', uuid, '-y', j, '" ><a href="javascript:;">', yofs + ydelta, '</a></td>');
			if (!((j + 1) % 4)) out.push('</tr>');
			yofs++;
		}
		out.push('</table></td></tr>');
		break;
	case "decade" :
		out.push('<tr><td colspan="3" ><table id="', uuid, '-mid" class="', zcls, '-calyear" width="100%" border="0" cellspacing="0" cellpadding="0">');
		var temp = ydec*100 - 10;
		for (var j = 0 ; j < 12; ++j, temp += 10) {
			if (!(j % 4)) out.push('<tr>');
			if (temp < 1900 || temp > 2090) {
				out.push('<td>&nbsp;</td>');
				if (j + 1 == 12)
					out.push('</tr>'); 
				continue;
			}
			
			out.push('<td _dt="', temp ,'" id="', uuid, '-de', j, '" class="', (y >= temp && y <= (temp + 9)) ? zcls + '-seld' : '', '"',
					' ><a href="javascript:;">', temp + ydelta, '-<br />', temp + ydelta + 9, '</a></td>');
			if (!((j + 1) % 4)) out.push('</tr>');
		}
		out.push('</tr></table></td></tr>');
		break;
	}
	out.push('</table></div>');
}
;zkmld(zk._p.p.Calendar,zk._m);
(function () {
	function _initPopup () {
		this._pop = new zul.db.CalendarPop();
		this._tm = new zul.db.CalendarTime();
		this.appendChild(this._pop);
		this.appendChild(this._tm);
	}
	function _reposition(wgt) {
		var db = wgt.$n();
		if (!db) return;
		var pp = wgt.$n("pp"),
			inp = wgt.getInputNode();

		if(pp) {
			zk(pp).position(inp, "after_start");
			wgt._pop.syncShadow();
			zk(inp).focus();
		}
	}

var Datebox =

zul.db.Datebox = zk.$extends(zul.inp.FormatWidget, {
	_buttonVisible: true,
	_lenient: true,
	$init: function() {
		this.$supers('$init', arguments);
		this.afterInit(_initPopup);
		this.listen({onChange: this}, -1000);
	},

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
		
		
		format: function () {
			if (this._pop) {
				this._pop.setFormat(this._format);
				if (this._value)
					this._value = this._pop.getTime();
			}
			var inp = this.getInputNode();
			if (inp)
				inp.value = this.coerceToString_(this._value);
		},
		
		
		constraint: function (cst) {
			if (typeof cst == 'string' && cst.charAt(0) != '[')
				this._cst = new zul.inp.SimpleDateConstraint(cst);
			else
				this._cst = cst;
			if (this._cst) delete this._lastRawValVld; 
			if (this._pop) {
				this._pop.setConstraint(this._constraint);
				this._pop.rerender();
			}
		},
		
		
		timeZone: function (timezone) {
			this._timezone = timezone;
			this._setTimeZonesIndex();
		},
		
		
		timeZonesReadonly: function (readonly) {
			var select = this.$n('dtzones');
			if (select) select.disabled = readonly ? "disabled" : "";
		},
		
		
		displayedTimeZones: function (dtzones) {
			this._dtzones = dtzones.split(",");
		},
		
		
		lenient: null
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
	_setTimeZonesIndex: function () {
		var select = this.$n('dtzones');
		if (select && this._timezone) {
			var opts = jq(select).children('option');
			for (var i = opts.length; i--;) {
				if (opts[i].text == this._timezone) select.selectedIndex = i;
			}
		}		
	},
	onSize: _zkf = function () {
		var width = this.getWidth();
		if (!width || width.indexOf('%') != -1)
			this.getInputNode().style.width = '';
		this.syncWidth();
	},
	onShow: _zkf,
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-datebox" + (this.inRoundedMold() ? "-rounded": "");
	},
	
	getRawText: function () {
		return this.coerceToString_(this._value);
	},
	
	getTimeFormat: function () {
		var fmt = this._format,
			aa = fmt.indexOf('a'),
			hh = fmt.indexOf('h'),
			KK = fmt.indexOf('K'),
			HH= fmt.indexOf('HH'),
			kk = fmt.indexOf('k'),
			mm = fmt.indexOf('m'),
			ss = fmt.indexOf('s'),
			hasAM = aa > -1,
			hasHour1 = hasAM ? hh > -1 || KK > -1 : false;

		if (hasHour1) {
			if ((hh != -1 && aa < hh) || (kk != -1 && aa < kk)) {
				var f = hh < KK ? 'a KK' : 'a hh';
				return f + (mm > -1 ? ':mm': '') + (ss > -1 ? ':ss': '');
			} else {
				var f = hh < KK ? 'KK' : 'hh';
				f = f + (mm > -1 ? ':mm': '') + (ss > -1 ? ':ss': '');
				return f + ' a';
			}
		} else {
			var f = HH < kk ? 'kk' : HH > -1 ? 'HH' : '';
			return f + (mm > -1 ? ':mm': '') + (ss > -1 ? ':ss': '');
		}
	},
	
	getDateFormat: function () {
		return this._format.replace(/[ahKHksm]/g, '');
	},
	
	setOpen: function(open) {
		this._open = open;
		var pp = this.$n("pp");
		if (pp) {
			if (!jq(pp).zk.isVisible()) this._pop.open();
			else this._pop.close();
		}
	},
	isOpen: function () {
		return this._pop && this._pop.isOpen();
	},
	coerceFromString_: function (val) {
		if (val) {
			var d = new zk.fmt.Calendar().parseDate(val, this.getFormat(), !this._lenient);
			if (!d) return {error: zk.fmt.Text.format(msgzul.DATE_REQUIRED + this._format)};
			return d;
		} else
			return val;
	},
	coerceToString_: function (val) {
		return val ? new zk.fmt.Calendar().formatDate(val, this.getFormat()) : '';
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
	doClick_: function (evt) {
		if (this._disabled) return;
		if (this._readonly && this._buttonVisible && this._pop)
			this._pop.open();
		this.$supers('doClick_', arguments);
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
	doKeyDown_: function (evt) {
		this._doKeyDown(evt);
		if (!evt.stopped)
			this.$supers('doKeyDown_', arguments);
	},
	_doKeyDown: function (evt) {
		var keyCode = evt.keyCode,
			bOpen = this._pop.isOpen();
		if (keyCode == 9 || (zk.safari && keyCode == 0)) { 
			if (bOpen) this._pop.close();
			return;
		}

		if (evt.altKey && (keyCode == 38 || keyCode == 40)) {
			if (bOpen) this._pop.close();
			else this._pop.open();

			
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
		
		if (this._pop.isOpen()) {
			var ofs = keyCode == 37 ? -1 : keyCode == 39 ? 1 : keyCode == 38 ? -7 : keyCode == 40 ? 7 : 0;
			if (ofs)
				this._pop._shift(ofs);
		}
	},
	
	enterPressed_: function (evt) {
		this._pop.close();
		this.updateChange_();
		evt.stop();
	},
	
	escPressed_: function (evt) {
		this._pop.close();
		evt.stop();
	},
	afterKeyDown_: function (evt) {
		if (this._inplace)
			jq(this.$n()).toggleClass(this.getInplaceCSS(),  evt.keyCode == 13 ? null : false);
			
		this.$supers('afterKeyDown_', arguments);
	},
	bind_: function (){
		this.$supers(Datebox, 'bind_', arguments);
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
			
		this.syncWidth();
		
		zWatch.listen({onSize: this, onShow: this});
		this._pop.setFormat(this.getDateFormat());
	},
	unbind_: function () {
		var btn = this.$n('btn');
		if (btn) {
			this._auxb.cleanup();
			this._auxb = null;
			this.domUnlisten_(btn, 'onClick', '_doBtnClick');
		}
			
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(Datebox, 'unbind_', arguments);
	},
	_doBtnClick: function (evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (!this._disabled)
			this.setOpen();
		evt.stop();
	},
	_doTimeZoneChange: function (evt) {
		var select = this.$n('dtzones'),
			timezone = select.value;
		if (!this.getValue()) {
			this.setValue(this._tm.getValue());
		}
		this.updateChange_();
		this.fire("onTimeZoneChange", {timezone: timezone}, {toServer:true}, 150);
		if (this._pop) this._pop.close();
	},
	onChange: function (evt) {
		if (this._pop)
			this._pop.setValue(evt.data.value);
	},
	
	getTimeZoneLabel: function () {
		return "";
	},

	redrawpp_: function (out) {
		out.push('<div id="', this.uuid, '-pp" class="', this.getZclass(),
			'-pp" style="display:none" tabindex="-1">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);

		this._redrawTimezone(out);
		out.push('</div>');
	},
	_redrawTimezone: function (out) {
		var timezones = this._dtzones;
		if (timezones) {
			var cls = this.getZclass();
			out.push('<div class="', cls, '-timezone">');
			out.push(this.getTimeZoneLabel());
			out.push('<select id="', this.uuid, '-dtzones" class="', cls, '-timezone-body">');
			for (var i = 0, len = timezones.length; i < len; i++)
				out.push('<option value="', timezones[i], '" class="', cls, '-timezone-item">', timezones[i], '</option>');
			out.push('</select><div>');
		}
	}
});

var CalendarPop =
zul.db.CalendarPop = zk.$extends(zul.db.Calendar, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onChange: this}, -1000);
	},
	setFormat: function (fmt) {
		if (fmt != this._fmt) {
			var old = this._fmt;
			this._fmt = fmt;
			if (this.getValue())
				this._value = new zk.fmt.Calendar().formatDate(new zk.fmt.Calendar().parseDate(this.getValue(), old), fmt);
		}
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		if (this.desktop) this.syncShadow();
	},
	close: function (silent) {
		var db = this.parent,
			pp = db.$n("pp");

		if (!pp || !zk(pp).isVisible()) return;
		if (this._shadow) this._shadow.hide();

		var zcls = db.getZclass();
		pp.style.display = "none";
		pp.className = zcls + "-pp";

		jq(pp).zk.undoVParent();

		var btn = this.$n("btn");
		if (btn)
			jq(btn).removeClass(zcls + "-btn-over");

		if (!silent)
			jq(db.getInputNode()).focus();
	},
	isOpen: function () {
		return zk(this.parent.$n("pp")).isVisible();
	},
	open: function() {
		var wgt = this.parent,
			db = wgt.$n(), pp = wgt.$n("pp");
		if (!db || !pp)
			return;
		this._setView("day");
		var zcls = wgt.getZclass();

		pp.className = db.className + " " + pp.className;
		jq(pp).removeClass(zcls);

		pp.style.width = pp.style.height = "auto";
		pp.style.position = "absolute"; 
		pp.style.overflow = "auto"; 
		pp.style.display = "block";
		pp.style.zIndex = "88000";

		
		
		jq(pp).zk.makeVParent();

		if (pp.offsetHeight > 200) {
			
			pp.style.width = "auto"; 
		} else if (pp.offsetHeight < 10) {
			pp.style.height = "10px"; 
		}
		if (pp.offsetWidth < db.offsetWidth) {
			pp.style.width = db.offsetWidth + "px";
		} else {
			var wd = jq.innerWidth() - 20;
			if (wd < db.offsetWidth)
				wd = db.offsetWidth;
			if (pp.offsetWidth > wd)
				pp.style.width = wd;
		}
		zk(pp).position(wgt.getInputNode(), "after_start");
		setTimeout(function() {
			_reposition(wgt);
		}, 150);
		
		
		var fmt = wgt.getTimeFormat(),
			value = wgt.getValue();

		if (value) {
			var calVal = new zk.fmt.Calendar().formatDate(value, this.getFormat());
			if (calVal)
				this.setValue(calVal);
		}

		if (fmt) {
			var tm = wgt._tm;
			tm.setVisible(true);
			tm.setFormat(fmt);
			tm.setValue(value || new Date());
			tm.onShow();
		} else {
			wgt._tm.setVisible(false);
		}
	},
	syncShadow: function () {
		if (!this._shadow)
			this._shadow = new zk.eff.Shadow(this.parent.$n('pp'), {
				left: -4, right: 4, top: 2, bottom: 3});
		this._shadow.sync();
	},
	onChange: function (evt) {
		var date = this.getTime(),
			oldDate = this.parent.getValue(),
			readonly = this.parent.isReadonly();
		if (oldDate) {
			
			
			this.parent._value = new Date(date.getFullYear(), date.getMonth(),
				date.getDate(), oldDate.getHours(),
				oldDate.getMinutes(), oldDate.getSeconds());
		} else
			this.parent._value = date;
		this.parent.getInputNode().value = evt.data.value = this.parent.getRawText();
		this.parent.fire(evt.name, evt.data);
		if (this._view == 'day' && evt.data.shallClose !== false) {
			this.close(readonly);
			this.parent._inplaceout = true;
		}
		if (!readonly)
			this.parent.focus();
		evt.stop();
	},
	onFloatUp: function (ctl) {
		if (!zUtl.isAncestor(this.parent, ctl.origin))
			this.close(true);
	},
	bind_: function () {
		this.$supers(CalendarPop, 'bind_', arguments);
		this._bindTimezoneEvt();

		zWatch.listen({onFloatUp: this});
	},
	unbind_: function () {
		zWatch.unlisten({onFloatUp: this});
		this._unbindfTimezoneEvt();
		if (this._shadow) {
			this._shadow.destroy();
			this._shadow = null;
		}
		this.$supers(CalendarPop, 'unbind_', arguments);
	},
	_bindTimezoneEvt: function () {
		var wgt = this.parent;
		var select = wgt.$n('dtzones');
		if (select) {
			select.disabled = wgt.isTimeZonesReadonly() ? "disable" : "";
			wgt.domListen_(select, 'onChange', '_doTimeZoneChange');
			wgt._setTimeZonesIndex();
		}
	},
	_unbindfTimezoneEvt: function () {
		var wgt = this.parent,
			select = wgt.$n('dtzones');
		if (select)
			wgt.domUnlisten_(select, 'onChange', '_doTimeZoneChange');
	},
	_setView: function (val) {
		if (this.parent.getTimeFormat())
			this.parent._tm.setVisible(val == 'day');
		this.$supers('_setView', arguments);
	}
});
zul.db.CalendarTime = zk.$extends(zul.inp.Timebox, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onChanging: this}, -1000);
	},
	onChanging: function (evt) {
		var date = this.coerceFromString_(evt.data.value),
			oldDate = this.parent.getValue();
		if (oldDate) {
			oldDate.setHours(date.getHours());
			oldDate.setMinutes(date.getMinutes());
			oldDate.setSeconds(date.getSeconds());
		} else
			this.parent._value = date;
		this.parent.getInputNode().value = evt.data.value = this.parent.getRawText();
		this.parent.fire(evt.name, evt.data);
		if (this._view == 'day' && evt.data.shallClose !== false) {
			this.close();
			this.parent._inplaceout = true;
		}
		evt.stop();
	}
});

})();

zkreg('zul.db.Datebox');zk._m={};
zk._m['rounded']=
zul.inp.ComboWidget.prototype.redraw_

;zk._m['default']=[zk._p.p.Datebox,'rounded'];zkmld(zk._p.p.Datebox,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.db',1);