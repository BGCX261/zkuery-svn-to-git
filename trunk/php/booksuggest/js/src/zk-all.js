//ZK, Copyright 2009 Potix Corporation. Distributed under LGPL 3.0
//jQuery, Copyright 2009 John Resig
function $eval(s){return eval(s);}if(!window.zk){
(function( window, undefined ) {


var jQuery = function( selector, context ) {
		
		return new jQuery.fn.init( selector, context );
	},

	
	_jQuery = window.jQuery,

	



	
	document = window.document,

	
	rootjQuery,

	
	
	quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,

	
	isSimple = /^.[^:#\[\.,]*$/,

	
	rnotwhite = /\S/,

	
	rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,

	
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	
	userAgent = navigator.userAgent,

	
	browserMatch,
	
	
	readyBound = false,
	
	
	readyList = [],

	
	DOMContentLoaded,

	
	toString = Object.prototype.toString,
	hasOwnProperty = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	indexOf = Array.prototype.indexOf;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		var match, elem, ret, doc;

		
		if ( !selector ) {
			return this;
		}

		
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}
		
		
		if ( selector === "body" && !context ) {
			this.context = document;
			this[0] = document.body;
			this.selector = "body";
			this.length = 1;
			return this;
		}

		
		if ( typeof selector === "string" ) {
			
			match = quickExpr.exec( selector );

			
			if ( match && (match[1] || !context) ) {

				
				if ( match[1] ) {
					doc = (context ? context.ownerDocument || context : document);

					
					
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = buildFragment( [ match[1] ], [ doc ] );
						selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
					}
					
					return jQuery.merge( this, selector );
					
				
				} else {
					elem = document.getElementById( match[2] );

					if ( elem ) {
						
						
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			
			} else if ( !context && /^\w+$/.test( selector ) ) {
				this.selector = selector;
				this.context = document;
				selector = document.getElementsByTagName( selector );
				return jQuery.merge( this, selector );

			
			} else if ( !context || context.jquery ) {
				return (context || rootjQuery).find( selector );

			
			
			} else {
				return jQuery( context ).find( selector );
			}

		
		
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	
	selector: "",

	
	jquery: "1.4.2",

	
	length: 0,

	
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	
	
	get: function( num ) {
		return num == null ?

			
			this.toArray() :

			
			( num < 0 ? this.slice(num)[ 0 ] : this[ num ] );
	},

	
	
	pushStack: function( elems, name, selector ) {
		
		var ret = jQuery();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );
		
		} else {
			jQuery.merge( ret, elems );
		}

		
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		
		return ret;
	},

	
	
	
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},
	
	ready: function( fn ) {
		
		jQuery.bindReady();

		
		if ( jQuery.isReady ) {
			
			fn.call( document, jQuery );

		
		} else if ( readyList ) {
			
			readyList.push( fn );
		}

		return this;
	},
	
	eq: function( i ) {
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, +i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},
	
	end: function() {
		return this.prevObject || jQuery(null);
	},

	
	
	push: push,
	sort: [].sort,
	splice: [].splice
};


jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;

	
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		
		i = 2;
	}

	
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		
		if ( (options = arguments[ i ]) != null ) {
			
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				
				if ( target === copy ) {
					continue;
				}

				
				if ( deep && copy && ( jQuery.isPlainObject(copy) || jQuery.isArray(copy) ) ) {
					var clone = src && ( jQuery.isPlainObject(src) || jQuery.isArray(src) ) ? src
						: jQuery.isArray(copy) ? [] : {};

					
					target[ name ] = jQuery.extend( deep, clone, copy );

				
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {

		return jQuery;
	},
	
	

	isReady: (_jQuery&&_jQuery.isReady),

	
	
	ready: function() {
		
		if ( !jQuery.isReady ) {
			
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 13 );
			}

			
			jQuery.isReady = true;

			
			if ( readyList ) {
				
				var fn, i = 0;
				while ( (fn = readyList[ i++ ]) ) {
					fn.call( document, jQuery );
				}

				
				readyList = null;
			}

			
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
			}
		}
	},
	
	bindReady: function() {
		if ( readyBound ) {
			return;
		}

		readyBound = true;

		
		
		if ( document.readyState === "complete" ) {
			return jQuery.ready();
		}

		
		if ( document.addEventListener ) {
			
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			
			
			window.addEventListener( "load", jQuery.ready, false );

		
		} else if ( document.attachEvent ) {
			
			
			document.attachEvent("onreadystatechange", DOMContentLoaded);
			
			
			window.attachEvent( "onload", jQuery.ready );

			
			
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	
	
	
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

	isArray: function( obj ) {
		return toString.call(obj) === "[object Array]";
	},

	isPlainObject: function( obj ) {
		
		
		
		if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval ) {
			return false;
		}
		
		
		if ( obj.constructor
			&& !hasOwnProperty.call(obj, "constructor")
			&& !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
		
		
		
	
		var key;
		for ( key in obj ) {}
		
		return key === undefined || hasOwnProperty.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},
	
	error: function( msg ) {
		throw msg;
	},
	
	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		
		data = jQuery.trim( data );
		
		
		
		if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
			.replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {

			
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();

		} else {
			jQuery.error( "Invalid JSON: " + data );
		}
	},

	noop: function() {},

	
	globalEval: function( data ) {
		if ( data && rnotwhite.test(data) ) {
			
			
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";

			if ( jQuery.support.scriptEval ) {
				script.appendChild( document.createTextNode( data ) );
			} else {
				script.text = data;
			}

			
			
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},


	
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction(object);

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
			}
		}

		return object;
	},

	trim: function( text ) {
		return (text || "").replace( rtrim, "" );
	},

	
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			
			
			
			if ( array.length == null || typeof array === "string" || jQuery.isFunction(array) || (typeof array !== "function" && array.setInterval) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array ) {
		if ( array.indexOf ) {
			return array.indexOf( elem );
		}

		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length, j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		
		
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			if ( !inv !== !callback( elems[ i ], i ) ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	
	map: function( elems, callback, arg ) {
		var ret = [], value;

		
		
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			value = callback( elems[ i ], i, arg );

			if ( value != null ) {
				ret[ ret.length ] = value;
			}
		}

		return ret.concat.apply( [], ret );
	},

	
	guid: 1,

	proxy: function( fn, proxy, thisObject ) {
		if ( arguments.length === 2 ) {
			if ( typeof proxy === "string" ) {
				thisObject = fn;
				fn = thisObject[ proxy ];
				proxy = undefined;

			} else if ( proxy && !jQuery.isFunction( proxy ) ) {
				thisObject = proxy;
				proxy = undefined;
			}
		}

		if ( !proxy && fn ) {
			proxy = function() {
				return fn.apply( thisObject || this, arguments );
			};
		}

		
		if ( fn ) {
			proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
		}

		
		return proxy;
	},

	
	
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			/(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
			!/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
		  	[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	browser: {}
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}


if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

if ( indexOf ) {
	jQuery.inArray = function( elem, array ) {
		return indexOf.call( array, elem );
	};
}


rootjQuery = jQuery(document);


if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}


function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		
		
		document.documentElement.doScroll("left");
	} catch( error ) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	
	jQuery.ready();
}

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}



function access( elems, key, value, exec, fn, pass ) {
	var length = elems.length;
	
	
	if ( typeof key === "object" ) {
		for ( var k in key ) {
			access( elems, k, key[k], exec, fn, value );
		}
		return elems;
	}
	
	
	if ( value !== undefined ) {
		
		exec = !pass && exec && jQuery.isFunction(value);
		
		for ( var i = 0; i < length; i++ ) {
			fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
		}
		
		return elems;
	}
	
	
	return length ? fn( elems[0], key ) : undefined;
}

function now() {
	return (new Date).getTime();
}
(function() {

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + now();

	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0];

	
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		
		leadingWhitespace: div.firstChild.nodeType === 3,

		
		
		tbody: !div.getElementsByTagName("tbody").length,

		
		
		htmlSerialize: !!div.getElementsByTagName("link").length,

		
		
		style: /red/.test( a.getAttribute("style") ),

		
		
		hrefNormalized: a.getAttribute("href") === "/a",

		
		
		
		opacity: /^0.55$/.test( a.style.opacity ),

		
		
		cssFloat: !!a.style.cssFloat,

		
		
		
		checkOn: div.getElementsByTagName("input")[0].value === "on",

		
		
		optSelected: document.createElement("select").appendChild( document.createElement("option") ).selected,

		parentNode: div.removeChild( div.appendChild( document.createElement("div") ) ).parentNode === null,

		
		deleteExpando: true,
		checkClone: false,
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null
	};

	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e) {}

	root.insertBefore( script, root.firstChild );

	
	
	
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	
	
	try {
		delete script.test;
	
	} catch(e) {
		jQuery.support.deleteExpando = false;
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function click() {
			
			
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", click);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	div = document.createElement("div");
	div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";

	var fragment = document.createDocumentFragment();
	fragment.appendChild( div.firstChild );

	
	jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

	
	
	jQuery(function() {
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';

		div = null;
	});

	
	
	var eventSupported = function( eventName ) { 
		var el = document.createElement("div"); 
		eventName = "on" + eventName; 

		var isSupported = (eventName in el); 
		if ( !isSupported ) { 
			el.setAttribute(eventName, "return;"); 
			isSupported = typeof el[eventName] === "function"; 
		} 
		el = null; 

		return isSupported; 
	};
	
	jQuery.support.submitBubbles = eventSupported("submit");
	jQuery.support.changeBubbles = eventSupported("change");

	
	root = script = div = all = a = null;
})();

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	colspan: "colSpan",
	tabindex: "tabIndex",
	usemap: "useMap",
	frameborder: "frameBorder"
};
var expando = "jQuery" + now(), uuid = 0, windowData = {};

jQuery.extend({
	cache: {},
	
	expando:expando,

	
	
	noData: {
		"embed": true,
		"object": true,
		"applet": true
	},

	data: function( elem, name, data ) {
		if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ], cache = jQuery.cache, thisCache;

		if ( !id && typeof name === "string" && data === undefined ) {
			return null;
		}

		
		if ( !id ) { 
			id = ++uuid;
		}

		
		
		if ( typeof name === "object" ) {
			elem[ expando ] = id;
			thisCache = cache[ id ] = jQuery.extend(true, {}, name);

		} else if ( !cache[ id ] ) {
			elem[ expando ] = id;
			cache[ id ] = {};
		}

		thisCache = cache[ id ];

		
		if ( data !== undefined ) {
			thisCache[ name ] = data;
		}

		return typeof name === "string" ? thisCache[ name ] : thisCache;
	},

	removeData: function( elem, name ) {
		if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ], cache = jQuery.cache, thisCache = cache[ id ];

		
		if ( name ) {
			if ( thisCache ) {
				
				delete thisCache[ name ];

				
				if ( jQuery.isEmptyObject(thisCache) ) {
					jQuery.removeData( elem );
				}
			}

		
		} else {
			if ( jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];

			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );
			}

			
			delete cache[ id ];
		}
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		if ( typeof key === "undefined" && this.length ) {
			return jQuery.data( this[0] );

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
			}
			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else {
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function() {
				jQuery.data( this, key, value );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});
jQuery.extend({
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery.data( elem, type );

		
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery.data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ), fn = queue.shift();

		
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			
			
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function( i, elem ) {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},

	
	
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue( type, function() {
			var elem = this;
			setTimeout(function() {
				jQuery.dequeue( elem, type );
			}, time );
		});
	},

	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	}
});
var rclass = /[\n\t]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rspecialurl = /href|src|style/,
	rtype = /(button|input)/i,
	rfocusable = /(button|input|object|select|textarea)/i,
	rclickable = /^(a|area)$/i,
	rradiocheck = /radio|checkbox/;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name, fn ) {
		return this.each(function(){
			jQuery.attr( this, name, "" );
			if ( this.nodeType === 1 ) {
				this.removeAttribute( name );
			}
		});
	},

	addClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.addClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( value && typeof value === "string" ) {
			var classNames = (value || "").split( rspace );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className ) {
						elem.className = value;

					} else {
						var className = " " + elem.className + " ", setClass = elem.className;
						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
								setClass += " " + classNames[c];
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.removeClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			var classNames = (value || "").split(rspace);

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						var className = (" " + elem.className + " ").replace(rclass, " ");
						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[c] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value, isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.toggleClass( value.call(this, i, self.attr("class"), stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				
				var className, i = 0, self = jQuery(this),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					
					jQuery.data( this, "__className__", this.className );
				}

				
				this.className = this.className || value === false ? "" : jQuery.data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ";
		for ( var i = 0, l = this.length; i < l; i++ ) {
			if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		if ( value === undefined ) {
			var elem = this[0];

			if ( elem ) {
				if ( jQuery.nodeName( elem, "option" ) ) {
					return (elem.attributes.value || {}).specified ? elem.value : elem.text;
				}

				
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type === "select-one";

					
					if ( index < 0 ) {
						return null;
					}

					
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							
							value = jQuery(option).val();

							
							if ( one ) {
								return value;
							}

							
							values.push( value );
						}
					}

					return values;
				}

				
				if ( rradiocheck.test( elem.type ) && !jQuery.support.checkOn ) {
					return elem.getAttribute("value") === null ? "on" : elem.value;
				}
				

				
				return (elem.value || "").replace(rreturn, "");

			}

			return undefined;
		}

		var isFunction = jQuery.isFunction(value);

		return this.each(function(i) {
			var self = jQuery(this), val = value;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call(this, i, self.val());
			}

			
			
			if ( typeof val === "number" ) {
				val += "";
			}

			if ( jQuery.isArray(val) && rradiocheck.test( this.type ) ) {
				this.checked = jQuery.inArray( self.val(), val ) >= 0;

			} else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(val);

				jQuery( "option", this ).each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					this.selectedIndex = -1;
				}

			} else {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},
		
	attr: function( elem, name, value, pass ) {
		
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery(elem)[name](value);
		}

		var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc( elem ),
			
			set = value !== undefined;

		
		name = notxml && jQuery.props[ name ] || name;

		
		if ( elem.nodeType === 1 ) {
			
			var special = rspecialurl.test( name );

			
			
			if ( name === "selected" && !jQuery.support.optSelected ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}

			
			if ( name in elem && notxml && !special ) {
				if ( set ) {
					
					if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
						jQuery.error( "type property can't be changed" );
					}

					elem[ name ] = value;
				}

				
				if ( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) ) {
					return elem.getAttributeNode( name ).nodeValue;
				}

				
				
				if ( name === "tabIndex" ) {
					var attributeNode = elem.getAttributeNode( "tabIndex" );

					return attributeNode && attributeNode.specified ?
						attributeNode.value :
						rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							undefined;
				}

				return elem[ name ];
			}

			if ( !jQuery.support.style && notxml && name === "style" ) {
				if ( set ) {
					elem.style.cssText = "" + value;
				}

				return elem.style.cssText;
			}

			if ( set ) {
				
				elem.setAttribute( name, "" + value );
			}

			var attr = !jQuery.support.hrefNormalized && notxml && special ?
					
					elem.getAttribute( name, 2 ) :
					elem.getAttribute( name );

			
			return attr === null ? undefined : attr;
		}

		
		
		return jQuery.style( elem, name, value );
	}
});
var rnamespaces = /\.(.*)$/,
	fcleanup = function( nm ) {
		return nm.replace(/[^\w\s\.\|`]/g, function( ch ) {
			return "\\" + ch;
		});
	};


jQuery.event = {

	
	
	add: function( elem, types, handler, data ) {
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		
		
		if ( elem.setInterval && ( elem !== window && !elem.frameElement ) ) {
			elem = window;
		}

		var handleObjIn, handleObj;

		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		
		var elemData = jQuery.data( elem );

		
		
		if ( !elemData ) {
			return;
		}

		var events = elemData.events = elemData.events || {},
			eventHandle = elemData.handle, eventHandle;

		if ( !eventHandle ) {
			elemData.handle = eventHandle = function() {
				
				
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
					undefined;
			};
		}

		
		
		eventHandle.elem = elem;

		
		
		types = types.split(" ");

		var type, i = 0, namespaces;

		while ( (type = types[ i++ ]) ) {
			handleObj = handleObjIn ?
				jQuery.extend({}, handleObjIn) :
				{ handler: handler, data: data };

			
			if ( type.indexOf(".") > -1 ) {
				namespaces = type.split(".");
				type = namespaces.shift();
				handleObj.namespace = namespaces.slice(0).sort().join(".");

			} else {
				namespaces = [];
				handleObj.namespace = "";
			}

			handleObj.type = type;
			handleObj.guid = handler.guid;

			
			var handlers = events[ type ],
				special = jQuery.event.special[ type ] || {};

			
			if ( !handlers ) {
				handlers = events[ type ] = [];

				
				
				
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}
			
			if ( special.add ) { 
				special.add.call( elem, handleObj ); 

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			
			handlers.push( handleObj );

			
			jQuery.event.global[ type ] = true;
		}

		
		elem = null;
	},

	global: {},

	
	remove: function( elem, types, handler, pos ) {
		
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		var ret, type, fn, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
			elemData = jQuery.data( elem ),
			events = elemData && elemData.events;

		if ( !elemData || !events ) {
			return;
		}

		
		if ( types && types.type ) {
			handler = types.handler;
			types = types.type;
		}

		
		if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
			types = types || "";

			for ( type in events ) {
				jQuery.event.remove( elem, type + types );
			}

			return;
		}

		
		
		types = types.split(" ");

		while ( (type = types[ i++ ]) ) {
			origType = type;
			handleObj = null;
			all = type.indexOf(".") < 0;
			namespaces = [];

			if ( !all ) {
				
				namespaces = type.split(".");
				type = namespaces.shift();

				namespace = new RegExp("(^|\\.)" + 
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)")
			}

			eventType = events[ type ];

			if ( !eventType ) {
				continue;
			}

			if ( !handler ) {
				for ( var j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( all || namespace.test( handleObj.namespace ) ) {
						jQuery.event.remove( elem, origType, handleObj.handler, j );
						eventType.splice( j--, 1 );
					}
				}

				continue;
			}

			special = jQuery.event.special[ type ] || {};

			for ( var j = pos || 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( handler.guid === handleObj.guid ) {
					
					if ( all || namespace.test( handleObj.namespace ) ) {
						if ( pos == null ) {
							eventType.splice( j--, 1 );
						}

						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}

					if ( pos != null ) {
						break;
					}
				}
			}

			
			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					removeEvent( elem, type, elemData.handle );
				}

				ret = null;
				delete events[ type ];
			}
		}

		
		if ( jQuery.isEmptyObject( events ) ) {
			var handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			delete elemData.events;
			delete elemData.handle;

			if ( jQuery.isEmptyObject( elemData ) ) {
				jQuery.removeData( elem );
			}
		}
	},

	
	trigger: function( event, data, elem  ) {
		
		var type = event.type || event,
			bubbling = arguments[3];

		if ( !bubbling ) {
			event = typeof event === "object" ?
				
				event[expando] ? event :
				
				jQuery.extend( jQuery.Event(type), event ) :
				
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			
			if ( !elem ) {
				
				event.stopPropagation();

				
				if ( jQuery.event.global[ type ] ) {
					jQuery.each( jQuery.cache, function() {
						if ( this.events && this.events[type] ) {
							jQuery.event.trigger( event, data, this.handle.elem );
						}
					});
				}
			}

			

			
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
				return undefined;
			}

			
			event.result = undefined;
			event.target = elem;

			
			data = jQuery.makeArray( data );
			data.unshift( event );
		}

		event.currentTarget = elem;

		
		var handle = jQuery.data( elem, "handle" );
		if ( handle ) {
			handle.apply( elem, data );
		}

		var parent = elem.parentNode || elem.ownerDocument;

		
		try {
			if ( !(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ) {
				if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
					event.result = false;
				}
			}

		
		} catch (e) {}

		if ( !event.isPropagationStopped() && parent ) {
			jQuery.event.trigger( event, data, parent, true );

		} else if ( !event.isDefaultPrevented() ) {
			var target = event.target, old,
				isClick = jQuery.nodeName(target, "a") && type === "click",
				special = jQuery.event.special[ type ] || {};

			if ( (!special._default || special._default.call( elem, event ) === false) && 
				!isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()]) ) {

				try {
					if ( target[ type ] ) {
						
						old = target[ "on" + type ];

						if ( old ) {
							target[ "on" + type ] = null;
						}

						jQuery.event.triggered = true;
						target[ type ]();
					}

				
				} catch (e) {}

				if ( old ) {
					target[ "on" + type ] = old;
				}

				jQuery.event.triggered = false;
			}
		}
	},

	handle: function( event ) {
		var all, handlers, namespaces, namespace, events;

		event = arguments[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;

		
		all = event.type.indexOf(".") < 0 && !event.exclusive;

		if ( !all ) {
			namespaces = event.type.split(".");
			event.type = namespaces.shift();
			namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
		}

		var events = jQuery.data(this, "events"), handlers = events[ event.type ];

		if ( events && handlers ) {
			
			handlers = handlers.slice(0);

			for ( var j = 0, l = handlers.length; j < l; j++ ) {
				var handleObj = handlers[ j ];

				
				if ( all || namespace.test( handleObj.namespace ) ) {
					
					
					event.handler = handleObj.handler;
					event.data = handleObj.data;
					event.handleObj = handleObj;
	
					var ret = handleObj.handler.apply( this, arguments );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}

					if ( event.isImmediatePropagationStopped() ) {
						break;
					}
				}
			}
		}

		return event.result;
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ expando ] ) {
			return event;
		}

		
		
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ) {
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		
		if ( !event.target ) {
			event.target = event.srcElement || document; 
		}

		
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		
		if ( !event.relatedTarget && event.fromElement ) {
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
		}

		
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) ) {
			event.which = event.charCode || event.keyCode;
		}

		
		if ( !event.metaKey && event.ctrlKey ) {
			event.metaKey = event.ctrlKey;
		}

		
		
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

		return event;
	},

	
	guid: 1E8,

	
	proxy: jQuery.proxy,

	special: {
		ready: {
			
			setup: jQuery.bindReady,
			teardown: jQuery.noop
		},

		live: {
			add: function( handleObj ) {
				jQuery.event.add( this, handleObj.origType, jQuery.extend({}, handleObj, {handler: liveHandler}) ); 
			},

			remove: function( handleObj ) {
				var remove = true,
					type = handleObj.origType.replace(rnamespaces, "");
				
				jQuery.each( jQuery.data(this, "events").live || [], function() {
					if ( type === this.origType.replace(rnamespaces, "") ) {
						remove = false;
						return false;
					}
				});

				if ( remove ) {
					jQuery.event.remove( this, handleObj.origType, liveHandler );
				}
			}

		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				
				if ( this.setInterval ) {
					this.onbeforeunload = eventHandle;
				}

				return false;
			},
			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

var removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		elem.removeEventListener( type, handle, false );
	} : 
	function( elem, type, handle ) {
		elem.detachEvent( "on" + type, handle );
	};

jQuery.Event = function( src ) {
	
	if ( !this.preventDefault ) {
		return new jQuery.Event( src );
	}

	
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;
	
	} else {
		this.type = src;
	}

	
	
	this.timeStamp = now();

	
	this[ expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}



jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		
		
		if ( e.preventDefault ) {
			e.preventDefault();
		}
		
		e.returnValue = false;
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};



var withinElement = function( event ) {
	
	var parent = event.relatedTarget;

	
	
	try {
		
		while ( parent && parent !== this ) {
			parent = parent.parentNode;
		}

		if ( parent !== this ) {
			
			event.type = event.data;

			
			jQuery.event.handle.apply( this, arguments );
		}

	
	} catch(e) { }
},



delegate = function( event ) {
	event.type = event.data;
	jQuery.event.handle.apply( this, arguments );
};


jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		setup: function( data ) {
			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
		},
		teardown: function( data ) {
			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
		}
	};
});


if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function( data, namespaces ) {
			if ( this.nodeName.toLowerCase() !== "form" ) {
				jQuery.event.add(this, "click.specialSubmit", function( e ) {
					var elem = e.target, type = elem.type;

					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
						return trigger( "submit", this, arguments );
					}
				});
	 
				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
					var elem = e.target, type = elem.type;

					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
						return trigger( "submit", this, arguments );
					}
				});

			} else {
				return false;
			}
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialSubmit" );
		}
	};

}


if ( !jQuery.support.changeBubbles ) {

	var formElems = /textarea|input|select/i,

	changeFilters,

	getVal = function( elem ) {
		var type = elem.type, val = elem.value;

		if ( type === "radio" || type === "checkbox" ) {
			val = elem.checked;

		} else if ( type === "select-multiple" ) {
			val = elem.selectedIndex > -1 ?
				jQuery.map( elem.options, function( elem ) {
					return elem.selected;
				}).join("-") :
				"";

		} else if ( elem.nodeName.toLowerCase() === "select" ) {
			val = elem.selectedIndex;
		}

		return val;
	},

	testChange = function testChange( e ) {
		var elem = e.target, data, val;

		if ( !formElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		data = jQuery.data( elem, "_change_data" );
		val = getVal(elem);

		
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery.data( elem, "_change_data", val );
		}
		
		if ( data === undefined || val === data ) {
			return;
		}

		if ( data != null || val ) {
			e.type = "change";
			return jQuery.event.trigger( e, arguments[1], elem );
		}
	};

	jQuery.event.special.change = {
		filters: {
			focusout: testChange, 

			click: function( e ) {
				var elem = e.target, type = elem.type;

				if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
					return testChange.call( this, e );
				}
			},

			
			
			keydown: function( e ) {
				var elem = e.target, type = elem.type;

				if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					return testChange.call( this, e );
				}
			},

			
			
			
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery.data( elem, "_change_data", getVal(elem) );
			}
		},

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
			}

			return formElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialChange" );

			return formElems.test( this.nodeName );
		}
	};

	changeFilters = jQuery.event.special.change.filters;
}

function trigger( type, elem, args ) {
	args[0].type = type;
	return jQuery.event.handle.apply( elem, args );
}


if ( document.addEventListener ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
		jQuery.event.special[ fix ] = {
			setup: function() {
				this.addEventListener( orig, handler, true );
			}, 
			teardown: function() { 
				this.removeEventListener( orig, handler, true );
			}
		};

		function handler( e ) { 
			e = jQuery.event.fix( e );
			e.type = fix;
			return jQuery.event.handle.call( this, e );
		}
	});
}

jQuery.each(["bind", "one"], function( i, name ) {
	jQuery.fn[ name ] = function( type, data, fn ) {
		
		if ( typeof type === "object" ) {
			for ( var key in type ) {
				this[ name ](key, data, type[key], fn);
			}
			return this;
		}
		
		if ( jQuery.isFunction( data ) ) {
			fn = data;
			data = undefined;
		}

		var handler = name === "one" ? jQuery.proxy( fn, function( event ) {
			jQuery( this ).unbind( event, handler );
			return fn.apply( this, arguments );
		}) : fn;

		if ( type === "unload" && name !== "one" ) {
			this.one( type, data, fn );

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.add( this[i], type, handler, data );
			}
		}

		return this;
	};
});

jQuery.fn.extend({
	unbind: function( type, fn ) {
		
		if ( typeof type === "object" && !type.preventDefault ) {
			for ( var key in type ) {
				this.unbind(key, type[key]);
			}

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.remove( this[i], type, fn );
			}
		}

		return this;
	},
	
	delegate: function( selector, types, data, fn ) {
		return this.live( types, data, fn, selector );
	},
	
	undelegate: function( selector, types, fn ) {
		if ( arguments.length === 0 ) {
				return this.unbind( "live" );
		
		} else {
			return this.die( types, null, fn, selector );
		}
	},
	
	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			var event = jQuery.Event( type );
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}
	},

	toggle: function( fn ) {
		
		var args = arguments, i = 1;

		
		while ( i < args.length ) {
			jQuery.proxy( fn, args[ i++ ] );
		}

		return this.click( jQuery.proxy( fn, function( event ) {
			
			var lastToggle = ( jQuery.data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery.data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			
			event.preventDefault();

			
			return args[ lastToggle ].apply( this, arguments ) || false;
		}));
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

var liveMap = {
	focus: "focusin",
	blur: "focusout",
	mouseenter: "mouseover",
	mouseleave: "mouseout"
};

jQuery.each(["live", "die"], function( i, name ) {
	jQuery.fn[ name ] = function( types, data, fn, origSelector  ) {
		var type, i = 0, match, namespaces, preType,
			selector = origSelector || this.selector,
			context = origSelector ? this : jQuery( this.context );

		if ( jQuery.isFunction( data ) ) {
			fn = data;
			data = undefined;
		}

		types = (types || "").split(" ");

		while ( (type = types[ i++ ]) != null ) {
			match = rnamespaces.exec( type );
			namespaces = "";

			if ( match )  {
				namespaces = match[0];
				type = type.replace( rnamespaces, "" );
			}

			if ( type === "hover" ) {
				types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
				continue;
			}

			preType = type;

			if ( type === "focus" || type === "blur" ) {
				types.push( liveMap[ type ] + namespaces );
				type = type + namespaces;

			} else {
				type = (liveMap[ type ] || type) + namespaces;
			}

			if ( name === "live" ) {
				
				context.each(function(){
					jQuery.event.add( this, liveConvert( type, selector ),
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
				});

			} else {
				
				context.unbind( liveConvert( type, selector ), fn );
			}
		}
		
		return this;
	}
});

function liveHandler( event ) {
	var stop, elems = [], selectors = [], args = arguments,
		related, match, handleObj, elem, j, i, l, data,
		events = jQuery.data( this, "events" );

	
	if ( event.liveFired === this || !events || !events.live || event.button && event.type === "click" ) {
		return;
	}

	event.liveFired = this;

	var live = events.live.slice(0);

	for ( j = 0; j < live.length; j++ ) {
		handleObj = live[j];

		if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
			selectors.push( handleObj.selector );

		} else {
			live.splice( j--, 1 );
		}
	}

	match = jQuery( event.target ).closest( selectors, event.currentTarget );

	for ( i = 0, l = match.length; i < l; i++ ) {
		for ( j = 0; j < live.length; j++ ) {
			handleObj = live[j];

			if ( match[i].selector === handleObj.selector ) {
				elem = match[i].elem;
				related = null;

				
				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
				}

				if ( !related || related !== elem ) {
					elems.push({ elem: elem, handleObj: handleObj });
				}
			}
		}
	}

	for ( i = 0, l = elems.length; i < l; i++ ) {
		match = elems[i];
		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		if ( match.handleObj.origHandler.apply( match.elem, args ) === false ) {
			stop = false;
			break;
		}
	}

	return stop;
}

function liveConvert( type, selector ) {
	return "live." + (type && type !== "*" ? type + "." : "") + selector.replace(/\./g, "`").replace(/ /g, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	
	jQuery.fn[ name ] = function( fn ) {
		return fn ? this.bind( name, fn ) : this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});





if ( window.attachEvent && !window.addEventListener ) {
	window.attachEvent("onunload", function() {
		for ( var id in jQuery.cache ) {
			if ( jQuery.cache[ id ].handle ) {
				
				try {
					jQuery.event.remove( jQuery.cache[ id ].handle.elem );
				} catch(e) {}
			}
		}
	});
}

(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;





[0, 0].sort(function(){
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	var origContext = context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, extra, prune = true, contextXML = isXML(context),
		soFar = selector;
	
	
	while ( (chunker.exec(""), m = chunker.exec(soFar)) !== null ) {
		soFar = m[3];
		
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = m[3];
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}
	} else {
		
		
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			var ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			var ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				var cur = parts.pop(), pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort(sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					results.splice(i--, 1);
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice(1,1);

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null && set.length ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var filter = Expr.filter[ type ], found, item, left = match[1];
				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop, inplace);
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	
	order: [ "ID", "ZID", "NAME", "TAG", "ZTAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		
		ZID: /\$((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
		
		ZTAG: /^((?:[@\w\u00c0-\uFFFF\*-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},
	leftMatch: {},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isZTag = isPartStr && /@/.test(part),
				isZID = isPartStr && /\$/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					
					if (isZTag || isZID) {
						var w = zk.Widget.$(elem, {exact: 1});
						checkSet[i] = w && w[isZTag ? 'widgetName' : 'id'] == part.substring(1) ? elem : false;
					} else {
    					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
    						elem || false :
    						elem === part;
					}
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isZTag = isPartStr && /@/.test(part),
				isZID = isPartStr && /\$/.test(part);

			if ( isPartStr && !/\W/.test(part) ) {
				part = part.toLowerCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						
						
						if (isZTag || isZID) {
							var c = zk.Widget.$(elem, {exact: 1}),
								p = c ? c.parent : zk.Widget.$(elem.parentNode, {exact: 1});
							checkSet[i] = p && p[isZTag ? 'widgetName' : 'id'] == part.substring(1) ? p.$n() : false;
						} else {
    						checkSet[i] = isPartStr ?
    							elem.parentNode :
    							elem.parentNode === part;
						}
						
						
						if (!isPartStr && !checkSet[i]) {
							var p = zk.Widget.$(part, {exact: 1}),
								c = zk.Widget.$(elem, {exact: 1});
							if (p && c)
								checkSet[i] = p == c.parent;
						}
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				var nodeCheck = part = part.toLowerCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				var nodeCheck = part = part.toLowerCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		},
		
		ZID: function(match, context){
			return zk.Widget.getElementsById(match[1]);
		},
		
		ZTAG: function(match, context){
			return context == window ?
					zk.Widget.getElementsByName(match[1].substring(1)) :
					jq.grep(zk.Widget.getElementsByName(match[1].substring(1)), function (n) {
						return jq.isAncestor(context, n);
					});
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			return match[1].toLowerCase();
		},
		CHILD: function(match){
			if ( match[1] === "nth" ) {
				
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			
			
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 === i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					if ( type === "first" ) { 
						return true; 
					}
					node = elem;
				case 'last':
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first === 0 ) {
						return diff === 0;
					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		ZTAG: function(elem, match, i, curloop, inplace){
			var wgt = zk.Widget.$(elem, {exact: !inplace}) || false;
			return wgt && wgt.className.toLowerCase().endsWith(match[1].substring(1));
		},
		
		ZID: function(elem, match) {
			var wgt = zk.Widget.$(elem);
			return wgt ? wgt.id === match[1] : false;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name );
			
			if (!result) {
				var wgt = zk.Widget.$(elem, {exact: 1});
				if (wgt)
					result = wgt.get(name) || result;
			}	
			var value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, function(all, num){
		return "\\" + (num - 0 + 1);
	}));
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};





try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;


} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.compareDocumentPosition ? -1 : 1;
		}

		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		if ( !a.sourceIndex || !b.sourceIndex ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.sourceIndex ? -1 : 1;
		}

		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		if ( !a.ownerDocument || !b.ownerDocument ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.ownerDocument ? -1 : 1;
		}

		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}


function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		
		} else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		}
	}

	return ret;
}



(function(){
	
	var form = document.createElement("div"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<a name='" + id + "'/>";

	
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	
	
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
	root = form = null; 
})();

(function(){
	
	

	
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}

	div = null; 
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle, div = document.createElement("div");
		div.innerHTML = "<p class='TEST'></p>";

		
		
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function(query, context, extra, seed){
			context = context || document;

			
			
			if ( !seed && context.nodeType === 9 && !isXML(context) ) {
				try {
					return makeArray( context.querySelectorAll(query), extra );
				} catch(e){}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		div = null; 
	})();
}

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	
	
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null; 
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	
	var isZID = /\$/.test(cur),
		isZTag = /@/.test(cur),
		cacheElem;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			
			if (cur.indexOf("@") == 0 || cur.indexOf("$") == 0) {
				var wgt = zk.Widget.$(elem, {exact: 1}),
					fn = dir == "parentNode" ? "parent" : dir;
				while (wgt && (wgt = wgt[fn])) {
					elem = wgt.$n(); 
					if (elem) break;
				}
			} else
				elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					
					match = checkSet[elem.sizset] === 0 ? cacheElem : checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			
			if (match && (isZID || isZTag)) {
				var w = zk.Widget.$(checkSet[i], {exact: 1});
				if (w && w[isZID ? 'id' : 'widgetName'] == cur.substring(1)) {
					cacheElem = match;
					match = 0; 
				}
			}
			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ? function(a, b){
	return !!(a.compareDocumentPosition(b) & 16);
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	
	
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	
	
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};


jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = getText;
jQuery.isXMLDoc = isXML;
jQuery.contains = contains;

return;

window.Sizzle = Sizzle;

})();
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	
	rmultiselector = /,/,
	slice = Array.prototype.slice;


var winnow = function( elements, qualifier, keep ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return (elem === qualifier) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
	});
};

jQuery.fn.extend({
	find: function( selector ) {
		var ret = this.pushStack( "", "find", selector ), length = 0;

		for ( var i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				
				for ( var n = length; n < ret.length; n++ ) {
					for ( var r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},
	
	is: function( selector ) {
		return !!selector && jQuery.filter( selector, this ).length > 0;
	},

	closest: function( selectors, context ) {
		if ( jQuery.isArray( selectors ) ) {
			var ret = [], cur = this[0], match, matches = {}, selector;

			if ( cur && selectors.length ) {
				for ( var i = 0, l = selectors.length; i < l; i++ ) {
					selector = selectors[i];

					if ( !matches[selector] ) {
						matches[selector] = jQuery.expr.match.POS.test( selector ) ? 
							jQuery( selector, context || this.context ) :
							selector;
					}
				}

				while ( cur && cur.ownerDocument && cur !== context ) {
					for ( selector in matches ) {
						match = matches[selector];

						if ( match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match) ) {
							ret.push({ selector: selector, elem: cur });
							delete matches[selector];
						}
					}
					cur = cur.parentNode;
				}
			}

			return ret;
		}

		var pos = jQuery.expr.match.POS.test( selectors ) ? 
			jQuery( selectors, context || this.context ) : null;

		return this.map(function( i, cur ) {
			while ( cur && cur.ownerDocument && cur !== context ) {
				if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selectors) ) {
					return cur;
				}
				cur = cur.parentNode;
			}
			return null;
		});
	},
	
	
	
	index: function( elem ) {
		if ( !elem || typeof elem === "string" ) {
			return jQuery.inArray( this[0],
				
				
				elem ? jQuery( elem ) : this.parent().children() );
		}
		
		return jQuery.inArray(
			
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context || this.context ) :
				jQuery.makeArray( selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});



function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );
		
		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call(arguments).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return jQuery.find.matches(expr, elems);
	},
	
	dir: function( elem, dir, until ) {
		var matched = [], cur = elem[dir];
		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});
var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /(<([\w:]+)[^>]*?)\/>/g,
	rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnocache = /<script|<object|<embed|<option|<style/i,
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,  
	fcloseTag = function( all, front, tag ) {
		return rselfClosing.test( tag ) ?
			all :
			front + "></" + tag + ">";
	},
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ), contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		return this.each(function() {
			jQuery( this ).wrapAll( html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery(arguments[0]);
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery(arguments[0]).toArray() );
			return set;
		}
	},
	
	
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					 elem.parentNode.removeChild( elem );
				}
			}
		}
		
		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}
		
		return this;
	},

	clone: function( events ) {
		
		var ret = this.map(function() {
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				
				
				
				
				
				
				
				
				var html = this.outerHTML, ownerDocument = this.ownerDocument;
				if ( !html ) {
					var div = ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(rinlinejQuery, "")
					
					.replace(/=([^="'>\s]+\/)>/g, '="$1">')
					.replace(rleadingWhitespace, "")], ownerDocument)[0];
			} else {
				return this.cloneNode(true);
			}
		});

		
		if ( events === true ) {
			cloneCopyEvent( this, ret );
			cloneCopyEvent( this.find("*"), ret.find("*") );
		}

		
		return ret;
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		
		} else if ( typeof value === "string" && !rnocache.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, fcloseTag);

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery(this), old = self.html();
				self.empty().append(function(){
					return value.call( this, i, old );
				});
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			
			
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery(value).detach();
			}

			return this.each(function() {
				var next = this.nextSibling, parent = this.parentNode;

				jQuery(this).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value );
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, value = args[0], scripts = [], fragment, parent;

		
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = buildFragment( args, this, scripts );
			}
			
			fragment = results.fragment;
			
			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						i > 0 || results.cacheable || this.length > 1  ?
							fragment.cloneNode(true) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;

		function root( elem, cur ) {
			return jQuery.nodeName(elem, "table") ?
				(elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
				elem;
		}
	}
});

function cloneCopyEvent(orig, ret) {
	var i = 0;

	ret.each(function() {
		if ( this.nodeName !== (orig[i] && orig[i].nodeName) ) {
			return;
		}

		var oldData = jQuery.data( orig[i++] ), curData = jQuery.data( this, oldData ), events = oldData && oldData.events;

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( var type in events ) {
				for ( var handler in events[ type ] ) {
					jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
				}
			}
		}
	});
}

function buildFragment( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults,
		doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);

	
	
	
	
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		!rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

		cacheable = true;
		cacheresults = jQuery.fragments[ args[0] ];
		if ( cacheresults ) {
			if ( cacheresults !== 1 ) {
				fragment = cacheresults;
			}
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
}

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [], insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;
		
		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;
			
		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
				ret = ret.concat( elems );
			}
		
			return this.pushStack( ret, name, insert.selector );
		}
	};
});

jQuery.extend({
	clean: function( elems, context, fragment, scripts ) {
		context = context || document;

		
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [];

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			
			if ( typeof elem === "string" && !rhtml.test( elem ) ) {
				elem = context.createTextNode( elem );

			} else if ( typeof elem === "string" ) {
				
				elem = elem.replace(rxhtmlTag, fcloseTag);

				
				var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
					wrap = wrapMap[ tag ] || wrapMap._default,
					depth = wrap[0],
					div = context.createElement("div");

				
				div.innerHTML = wrap[1] + elem + wrap[2];

				
				while ( depth-- ) {
					div = div.lastChild;
				}

				
				if ( !jQuery.support.tbody ) {

					
					var hasBody = rtbody.test(elem),
						tbody = tag === "table" && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

							
							wrap[1] === "<table>" && !hasBody ?
								div.childNodes :
								[];

					for ( var j = tbody.length - 1; j >= 0 ; --j ) {
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
							tbody[ j ].parentNode.removeChild( tbody[ j ] );
						}
					}

				}

				
				if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
				}

				elem = div.childNodes;
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			for ( var i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				
				} else {
					if ( ret[i].nodeType === 1 ) {
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},
	
	cleanData: function( elems ) {
		var data, id, cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;
		
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			id = jq.nodeName(elem, "applet") ? '': elem[ jQuery.expando ];
				
			
			if ( id ) {
				data = cache[ id ];
				
				if ( data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						} else {
							removeEvent( elem, type, data.handle );
						}
					}
				}
				
				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}
				
				delete cache[ id ];
			}
		}
	}
});

var rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	ralpha = /alpha\([^)]*\)/,
	ropacity = /opacity=([^)]*)/,
	rfloat = /float/i,
	rdashAlpha = /-([a-z])/ig,
	rupper = /([A-Z])/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,

	cssShow = { position: "absolute", visibility: "hidden", display:"block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],

	
	getComputedStyle = document.defaultView && document.defaultView.getComputedStyle,
	
	styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat",
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn.css = function( name, value ) {
	return access( this, name, value, true, function( elem, name, value ) {
		if ( value === undefined ) {
			return jQuery.curCSS( elem, name );
		}
		
		if ( typeof value === "number" && !rexclude.test(name) ) {
			value += "px";
		}

		jQuery.style( elem, name, value );
	});
};

jQuery.extend({
	style: function( elem, name, value ) {
		
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		
		if ( (name === "width" || name === "height") && parseFloat(value) < 0 ) {
			value = undefined;
		}

		var style = elem.style || elem, set = value !== undefined;

		
		if ( !jQuery.support.opacity && name === "opacity" ) {
			if ( set ) {
				
				
				style.zoom = 1;

				
				var opacity = parseInt( value, 10 ) + "" === "NaN" ? "" : "alpha(opacity=" + value * 100 + ")";
				var filter = style.filter || jQuery.curCSS( elem, "filter" ) || "";
				style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : opacity;
			}

			return style.filter && style.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( ropacity.exec(style.filter)[1] ) / 100) + "":
				"";
		}

		
		if ( rfloat.test( name ) ) {
			name = styleFloat;
		}

		name = name.replace(rdashAlpha, fcamelCase);

		if ( set ) {
			style[ name ] = value;
		}

		return style[ name ];
	},

	css: function( elem, name, force, extra ) {
		if ( name === "width" || name === "height" ) {
			var val, props = cssShow, which = name === "width" ? cssWidth : cssHeight;

			function getWH() {
				val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

				if ( extra === "border" ) {
					return;
				}

				jQuery.each( which, function() {
					if ( !extra ) {
						val -= parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					}

					if ( extra === "margin" ) {
						val += parseFloat(jQuery.curCSS( elem, "margin" + this, true)) || 0;
					} else {
						val -= parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
					}
				});
			}

			if ( elem.offsetWidth !== 0 ) {
				getWH();
			} else {
				jQuery.swap( elem, props, getWH );
			}

			return Math.max(0, Math.round(val));
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style, filter;

		
		if ( !jQuery.support.opacity && name === "opacity" && elem.currentStyle ) {
			ret = ropacity.test(elem.currentStyle.filter || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				"";

			return ret === "" ?
				"1" :
				ret;
		}

		
		if ( rfloat.test( name ) ) {
			name = styleFloat;
		}

		if ( !force && style && style[ name ] ) {
			ret = style[ name ];

		} else if ( getComputedStyle ) {

			
			if ( rfloat.test( name ) ) {
				name = "float";
			}

			name = name.replace( rupper, "-$1" ).toLowerCase();

			var defaultView = elem.ownerDocument.defaultView;

			if ( !defaultView ) {
				return null;
			}

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle ) {
				ret = computedStyle.getPropertyValue( name );
			}

			
			if ( name === "opacity" && ret === "" ) {
				ret = "1";
			}

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(rdashAlpha, fcamelCase);

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			
			

			
			
			if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
				
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = camelCase === "fontSize" ? "1em" : (ret || 0);
				ret = style.pixelLeft + "px";

				
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	
	swap: function( elem, options, callback ) {
		var old = {};

		
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		
		for ( var name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth, height = elem.offsetHeight,
			skip = elem.nodeName.toLowerCase() === "tr";

		return width === 0 && height === 0 && !skip ?
			true :
			width > 0 && height > 0 && !skip ?
				false :
				jQuery.curCSS(elem, "display") === "none";
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}
var jsc = now(),
	rscript = /<script(.|\s)*?\/script>/gi,
	rselectTextarea = /select|textarea/i,
	rinput = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
	jsre = /=\?(&|$)/,
	rquery = /\?/,
	rts = /(\?|&)_=.*?(&|$)/,
	rurl = /^(\w+:)?\/\/([^\/?#]+)/,
	r20 = /%20/g,

	
	_load = jQuery.fn.load;

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" ) {
			return _load.call( this, url );

		
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		
		var type = "GET";

		
		if ( params ) {
			
			if ( jQuery.isFunction( params ) ) {
				
				callback = params;
				params = null;

			
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function( res, status ) {
				
				if ( status === "success" || status === "notmodified" ) {
					
					self.html( selector ?
						
						jQuery("<div />")
							
							
							.append(res.responseText.replace(rscript, ""))

							
							.find(selector) :

						
						res.responseText );
				}

				if ( callback ) {
					self.each( callback, [res.responseText, status, res] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function() {
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function() {
			return this.name && !this.disabled &&
				(this.checked || rselectTextarea.test(this.nodeName) ||
					rinput.test(this.type));
		})
		.map(function( i, elem ) {
			var val = jQuery(this).val();

			return val == null ?
				null :
				jQuery.isArray(val) ?
					jQuery.map( val, function( val, i ) {
						return { name: elem.name, value: val };
					}) :
					{ name: elem.name, value: val };
		}).get();
	}
});


jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function( i, o ) {
	jQuery.fn[o] = function( f ) {
		return this.bind(o, f);
	};
});

jQuery.extend({

	get: function( url, data, callback, type ) {
		
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		
		
		
		
		
		xhr: window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ?
			function() {
				return new window.XMLHttpRequest();
			} :
			function() {
				try {
					return new window.ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {}
			},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	
	lastModified: {},
	etag: {},

	ajax: function( origSettings ) {
		var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings);
		
		var jsonp, status, data,
			callbackContext = origSettings && origSettings.context || s,
			type = s.type.toUpperCase();

		
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		
		if ( s.dataType === "jsonp" ) {
			if ( type === "GET" ) {
				if ( !jsre.test( s.url ) ) {
					s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
				}
			} else if ( !s.data || !jsre.test(s.data) ) {
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			}
			s.dataType = "json";
		}

		
		if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
			jsonp = s.jsonpCallback || ("jsonp" + jsc++);

			
			if ( s.data ) {
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			}

			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			
			
			s.dataType = "script";

			
			window[ jsonp ] = window[ jsonp ] || function( tmp ) {
				data = tmp;
				success();
				complete();
				
				window[ jsonp ] = undefined;

				try {
					delete window[ jsonp ];
				} catch(e) {}

				if ( head ) {
					head.removeChild( script );
				}
			};
		}

		if ( s.dataType === "script" && s.cache === null ) {
			s.cache = false;
		}

		if ( s.cache === false && type === "GET" ) {
			var ts = now();

			
			var ret = s.url.replace(rts, "$1_=" + ts + "$2");

			
			s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
		}

		
		if ( s.data && type === "GET" ) {
			s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
		}

		
		if ( s.global && ! jQuery.active++ ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		
		var parts = rurl.exec( s.url ),
			remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);

		
		
		if ( s.dataType === "script" && type === "GET" && remote ) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			script.src = s.url;
			if ( s.scriptCharset ) {
				script.charset = s.scriptCharset;
			}

			
			if ( !jsonp ) {
				var done = false;

				
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						success();
						complete();

						
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
					}
				};
			}

			
			
			head.insertBefore( script, head.firstChild );

			
			return undefined;
		}

		var requestDone = false;

		
		var xhr = s.xhr();

		if ( !xhr ) {
			return;
		}

		
		
		if ( s.username ) {
			xhr.open(type, s.url, s.async, s.username, s.password);
		} else {
			xhr.open(type, s.url, s.async);
		}

		
		try {
			
			if ( s.data || origSettings && origSettings.contentType ) {
				xhr.setRequestHeader("Content-Type", s.contentType);
			}

			
			if ( s.ifModified ) {
				if ( jQuery.lastModified[s.url] ) {
					xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
				}

				if ( jQuery.etag[s.url] ) {
					xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
				}
			}

			
			
			if ( !remote ) {
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}

			
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e) {}

		
		if ( s.beforeSend && s.beforeSend.call(callbackContext, xhr, s) === false ) {
			
			if ( s.global && ! --jQuery.active ) {
				jQuery.event.trigger( "ajaxStop" );
			}

			
			xhr.abort();
			return false;
		}

		if ( s.global ) {
			trigger("ajaxSend", [xhr, s]);
		}

		
		var onreadystatechange = xhr.onreadystatechange = function( isTimeout ) {
			
			if ( !xhr || xhr.readyState === 0 || isTimeout === "abort" ) {
				
				
				if ( !requestDone ) {
					complete();
				}

				requestDone = true;
				if ( xhr ) {
					xhr.onreadystatechange = jQuery.noop;
				}

			
			} else if ( !requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout") ) {
				requestDone = true;
				xhr.onreadystatechange = jQuery.noop;

				status = isTimeout === "timeout" ?
					"timeout" :
					!jQuery.httpSuccess( xhr ) ?
						"error" :
						s.ifModified && jQuery.httpNotModified( xhr, s.url ) ?
							"notmodified" :
							"success";

				var errMsg;

				if ( status === "success" ) {
					
					try {
						
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch(err) {
						status = "parsererror";
						errMsg = err;
					}
				}

				
				if ( status === "success" || status === "notmodified" ) {
					
					if ( !jsonp ) {
						success();
					}
				} else {
					jQuery.handleError(s, xhr, status, errMsg);
				}

				
				complete();

				if ( isTimeout === "timeout" ) {
					xhr.abort();
				}

				
				if ( s.async ) {
					xhr = null;
				}
			}
		};

		
		
		try {
			var oldAbort = xhr.abort;
			xhr.abort = function() {
				if ( xhr ) {
					oldAbort.call( xhr );
				}

				onreadystatechange( "abort" );
			};
		} catch(e) { }

		
		if ( s.async && s.timeout > 0 ) {
			setTimeout(function() {
				
				if ( xhr && !requestDone ) {
					onreadystatechange( "timeout" );
				}
			}, s.timeout);
		}

		
		try {
			xhr.send( type === "POST" || type === "PUT" || type === "DELETE" ? s.data : null );
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
			
			complete();
		}

		
		if ( !s.async ) {
			onreadystatechange();
		}

		function success() {
			
			if ( s.success ) {
				s.success.call( callbackContext, data, status, xhr );
			}

			
			if ( s.global ) {
				trigger( "ajaxSuccess", [xhr, s] );
			}
		}

		function complete() {
			
			if ( s.complete ) {
				s.complete.call( callbackContext, xhr, status);
			}

			
			if ( s.global ) {
				trigger( "ajaxComplete", [xhr, s] );
			}

			
			if ( s.global && ! --jQuery.active ) {
				jQuery.event.trigger( "ajaxStop" );
			}
		}
		
		function trigger(type, args) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger(type, args);
		}

		
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		
		if ( s.error ) {
			s.error.call( s.context || s, xhr, status, e );
		}

		
		if ( s.global ) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );
		}
	},

	
	active: 0,

	
	httpSuccess: function( xhr ) {
		try {
			
			return !xhr.status && location.protocol === "file:" ||
				
				( xhr.status >= 200 && xhr.status < 300 ) ||
				xhr.status === 304 || xhr.status === 1223 || xhr.status === 0;
		} catch(e) {}

		return false;
	},

	
	httpNotModified: function( xhr, url ) {
		var lastModified = xhr.getResponseHeader("Last-Modified"),
			etag = xhr.getResponseHeader("Etag");

		if ( lastModified ) {
			jQuery.lastModified[url] = lastModified;
		}

		if ( etag ) {
			jQuery.etag[url] = etag;
		}

		
		return xhr.status === 304 || xhr.status === 0;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type") || "",
			xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.nodeName === "parsererror" ) {
			jQuery.error( "parsererror" );
		}

		
		
		if ( s && s.dataFilter ) {
			data = s.dataFilter( data, type );
		}

		
		if ( typeof data === "string" ) {
			
			if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
				data = jQuery.parseJSON( data );

			
			} else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
				jQuery.globalEval( data );
			}
		}

		return data;
	},

	
	
	param: function( a, traditional ) {
		var s = [];
		
		
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}
		
		
		if ( jQuery.isArray(a) || a.jquery ) {
			
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
			
		} else {
			
			
			for ( var prefix in a ) {
				buildParams( prefix, a[prefix] );
			}
		}

		
		return s.join("&").replace(r20, "+");

		function buildParams( prefix, obj ) {
			if ( jQuery.isArray(obj) ) {
				
				jQuery.each( obj, function( i, v ) {
					if ( traditional || /\[\]$/.test( prefix ) ) {
						
						add( prefix, v );
					} else {
						
						
						
						
						
						
						
						buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v );
					}
				});
					
			} else if ( !traditional && obj != null && typeof obj === "object" ) {
				
				jQuery.each( obj, function( k, v ) {
					buildParams( prefix + "[" + k + "]", v );
				});
					
			} else {
				
				add( prefix, obj );
			}
		}

		function add( key, value ) {
			
			value = jQuery.isFunction(value) ? value() : value;
			s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		}
	}
});
var elemdisplay = {},
	rfxtypes = /toggle|show|hide/,
	rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
	timerId,
	fxAttrs = [
		
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		
		[ "opacity" ]
	];

jQuery.fn.extend({
	show: function( speed, callback ) {
		if ( speed || speed === 0) {
			return this.animate( genFx("show", 3), speed, callback);

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var old = jQuery.data(this[i], "olddisplay");

				this[i].style.display = old || "";

				if ( jQuery.css(this[i], "display") === "none" ) {
					var nodeName = this[i].nodeName, display;

					if ( elemdisplay[ nodeName ] ) {
						display = elemdisplay[ nodeName ];

					} else {
						var elem = jQuery("<" + nodeName + " />").appendTo("body");

						display = elem.css("display");

						if ( display === "none" ) {
							display = "block";
						}

						elem.remove();

						elemdisplay[ nodeName ] = display;
					}

					jQuery.data(this[i], "olddisplay", display);
				}
			}

			
			
			for ( var j = 0, k = this.length; j < k; j++ ) {
				this[j].style.display = jQuery.data(this[j], "olddisplay") || "";
			}

			return this;
		}
	},

	hide: function( speed, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, callback);

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var old = jQuery.data(this[i], "olddisplay");
				if ( !old && old !== "none" ) {
					jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
				}
			}

			
			
			for ( var j = 0, k = this.length; j < k; j++ ) {
				this[j].style.display = "none";
			}

			return this;
		}
	},

	
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2);
		}

		return this;
	},

	fadeTo: function( speed, to, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete );
		}

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			var opt = jQuery.extend({}, optall), p,
				hidden = this.nodeType === 1 && jQuery(this).is(":hidden"),
				self = this;

			for ( p in prop ) {
				var name = p.replace(rdashAlpha, fcamelCase);

				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
					p = name;
				}

				if ( prop[p] === "hide" && hidden || prop[p] === "show" && !hidden ) {
					return opt.complete.call(this);
				}

				if ( ( p === "height" || p === "width" ) && this.style ) {
					
					opt.display = jQuery.css(this, "display");

					
					opt.overflow = this.style.overflow;
				}

				if ( jQuery.isArray( prop[p] ) ) {
					
					(opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
					prop[p] = prop[p][0];
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function( name, val ) {
				var e = new jQuery.fx( self, opt, name );

				if ( rfxtypes.test(val) ) {
					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]( prop );

				} else {
					var parts = rfxnum.exec(val),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat( parts[2] ),
							unit = parts[3] || "px";

						
						if ( unit !== "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						
						if ( parts[1] ) {
							end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			});

			
			return true;
		});
	},

	stop: function( clearQueue, gotoEnd ) {
		var timers = jQuery.timers;

		if ( clearQueue ) {
			this.queue([]);
		}

		this.each(function() {
			
			for ( var i = timers.length - 1; i >= 0; i-- ) {
				if ( timers[i].elem === this ) {
					if (gotoEnd) {
						
						timers[i](true);
					}

					timers.splice(i, 1);
				}
			}
		});

		
		if ( !gotoEnd ) {
			this.dequeue();
		}

		return this;
	}

});


jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, callback ) {
		return this.animate( props, speed, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;

		
		opt.old = opt.complete;
		opt.complete = function() {
			if ( opt.queue !== false ) {
				jQuery(this).dequeue();
			}
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig ) {
			options.orig = {};
		}
	}

});

jQuery.fx.prototype = {
	
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		
		if ( ( this.prop === "height" || this.prop === "width" ) && this.elem.style ) {
			this.elem.style.display = "block";
		}
	},

	
	cur: function( force ) {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	
	custom: function( from, to, unit ) {
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(jQuery.fx.tick, 13);
		}
	},

	
	show: function() {
		
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.show = true;

		
		
		
		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

		
		jQuery( this.elem ).show();
	},

	
	hide: function() {
		
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		
		this.custom(this.cur(), 0);
	},

	
	step: function( gotoEnd ) {
		var t = now(), done = true;

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			for ( var i in this.options.curAnim ) {
				if ( this.options.curAnim[i] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				if ( this.options.display != null ) {
					
					this.elem.style.overflow = this.options.overflow;

					
					var old = jQuery.data(this.elem, "olddisplay");
					this.elem.style.display = old ? old : this.options.display;

					if ( jQuery.css(this.elem, "display") === "none" ) {
						this.elem.style.display = "block";
					}
				}

				
				if ( this.options.hide ) {
					jQuery(this.elem).hide();
				}

				
				if ( this.options.hide || this.options.show ) {
					for ( var p in this.options.curAnim ) {
						jQuery.style(this.elem, p, this.options.orig[p]);
					}
				}

				
				this.options.complete.call( this.elem );
			}

			return false;

		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			
			var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
			var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
			this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timers = jQuery.timers;

		for ( var i = 0; i < timers.length; i++ ) {
			if ( !timers[i]() ) {
				timers.splice(i--, 1);
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},
		
	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},
	
	speeds: {
		slow: 600,
 		fast: 200,
 		
 		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style(fx.elem, "opacity", fx.now);
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}
if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		jQuery.offset.initialize();

		var offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop, left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
			}

			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {
	initialize: function() {
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.curCSS(body, "marginTop", true) ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed", checkDiv.style.top = "20px";
		
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden", innerDiv.style.position = "relative";
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		body = container = innerDiv = checkDiv = table = td = null;
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop, left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.curCSS(body, "marginTop",  true) ) || 0;
			left += parseFloat( jQuery.curCSS(body, "marginLeft", true) ) || 0;
		}

		return { top: top, left: left };
	},
	
	setOffset: function( elem, options, i ) {
		
		if ( /static/.test( jQuery.curCSS( elem, "position" ) ) ) {
			elem.style.position = "relative";
		}
		var curElem   = jQuery( elem ),
			curOffset = curElem.offset(),
			curTop    = parseInt( jQuery.curCSS( elem, "top",  true ), 10 ) || 0,
			curLeft   = parseInt( jQuery.curCSS( elem, "left", true ), 10 ) || 0;

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		var props = {
			top:  (options.top  - curOffset.top)  + curTop,
			left: (options.left - curOffset.left) + curLeft
		};
		
		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({
	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		
		offsetParent = this.offsetParent(),

		
		offset       = this.offset(),
		parentOffset = /^body|html$/i.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		
		
		
		offset.top  -= parseFloat( jQuery.curCSS(elem, "marginTop",  true) ) || 0;
		offset.left -= parseFloat( jQuery.curCSS(elem, "marginLeft", true) ) || 0;

		
		parentOffset.top  += parseFloat( jQuery.curCSS(offsetParent[0], "borderTopWidth",  true) ) || 0;
		parentOffset.left += parseFloat( jQuery.curCSS(offsetParent[0], "borderLeftWidth", true) ) || 0;

		
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!/^body|html$/i.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});



jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function(val) {
		var elem = this[0], win;
		
		if ( !elem ) {
			return null;
		}

		if ( val !== undefined ) {
			
			return this.each(function() {
				win = getWindow( this );

				if ( win ) {
					win.scrollTo(
						!i ? val : jQuery(win).scrollLeft(),
						 i ? val : jQuery(win).scrollTop()
					);

				} else {
					this[ method ] = val;
				}
			});
		} else {
			win = getWindow( elem );

			
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}
	};
});

function getWindow( elem ) {
	return ("scrollTo" in elem && elem.document) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	
	jQuery.fn["inner" + name] = function() {
		return this[0] ?
			jQuery.css( this[0], type, false, "padding" ) :
			null;
	};

	
	jQuery.fn["outer" + name] = function( margin ) {
		return this[0] ?
			jQuery.css( this[0], type, false, margin ? "margin" : "border" ) :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}
		
		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		return ("scrollTo" in elem && elem.document) ? 
			
			elem.document.compatMode === "CSS1Compat" && elem.document.documentElement[ "client" + name ] ||
			elem.document.body[ "client" + name ] :

			
			(elem.nodeType === 9) ? 
				
				Math.max(
					elem.documentElement["client" + name],
					elem.body["scroll" + name], elem.documentElement["scroll" + name],
					elem.body["offset" + name], elem.documentElement["offset" + name]
				) :

				
				size === undefined ?
					
					jQuery.css( elem, type ) :

					
					this.css( type, typeof size === "string" ? size : size + "px" );
	};

});



if (!_jQuery)
	window.jQuery = window.$ = jQuery;
window.jq = jQuery; 

})(window);


(zk = function (sel) {
	return jq(sel, zk).zk;
}).copy = function (dst, src, bu) {
	dst = dst || {};
	for (var p in src) {
		if (bu) bu[p] = dst[p];
		dst[p] = src[p];
	}
	return dst;
};

(function () {
	var _oid = 0,
		_statelesscnt = 0,
		_logmsg,
		_stamps = [];

	function newClass() {
		return function () {
			this.$oid = ++_oid;
			this.$init.apply(this, arguments);

			var ais = this._$ais;
			if (ais) {
				delete this._$ais;
				for (var j = ais.length; j--;)
					ais[j].call(this);
			}
		};
	}
	function def(nm, before, after) {
		return function (v, opts) {
			if (before) v = before.apply(this, arguments);
			var o = this[nm];
			this[nm] = v;
			if (after && (o !== v || (opts && opts.force)))
				after.apply(this, arguments);
			return this;
		};
	}
	function showprgbInit() {
		
		if (jq.isReady||zk.Page.contained.length)
			_showprgb(true, zk.pi ? 'z-initing': null);
		else
			setTimeout(showprgbInit, 10);
	}
	function showprgb() { 
		_showprgb();
	}
	function _showprgb(mask, icon) {
		if (zk.processing
		&& !jq("#zk_proc").length && !jq("#zk_showBusy").length)
			zUtl.progressbox("zk_proc", window.msgzk?msgzk.PLEASE_WAIT:'Processing...', mask, icon);
	}
	function wgt2s(w) {
		var s = w.className.substring(w.className.lastIndexOf('.') + 1);
		return w.id ? s + '@' + w.id: s + '#' + w.uuid;
	}
	function toLogMsg(ars, isDetailed) {
		var msg = [];
		for (var j = 0, len = ars.length; j < len; j++) {
			if (msg.length) msg.push(", ");
			var ar = ars[j];
			if (ar && (jq.isArray(ar) || ar.zk)) 
				msg.push('[' + toLogMsg(ar, isDetailed) + ']');
			else if (zk.Widget.isInstance(ar))
				msg.push(wgt2s(ar));
			else if (ar && ar.nodeType) {
				var w = zk.Widget.$(ar);
				if (w) msg.push(jq.nodeName(ar), ':', wgt2s(w));
				else msg.push(jq.nodeName(ar), '#', ar.id);
			} else if (isDetailed && ar && (typeof ar == 'object') && !ar.nodeType) {
				var s = ['{\n'];
				for (var v in ar) 
					s.push(v, ':', ar[v], ',\n');
				if (s[s.length - 1] == ',\n') 
					s.pop();
				s.push('\n}');
				msg.push(s.join(''));
			} else if (typeof ar == 'function') {
				var s = '' + ar,
					m = s.indexOf('{'),
					k = m < 0 ? s.indexOf('\n'): -1;
				msg.push(s.substring(0, m > 0 ? m: k > 0 ? k: s.length));
			} else
				msg.push('' + ar);
		}
		return msg.join('');
	}
	function doLog() {
		if (_logmsg) {
			var console = jq("#zk_log");
			if (!console.length) {
				jq(document.body).append(
	'<div id="zk_logbox" class="z-log">'
	+'<button onclick="jq(\'#zk_logbox\').remove()">X</button><br/>'
	+'<textarea id="zk_log" rows="10"></textarea></div>');
				console = jq("#zk_log");
			}
			console = console[0];
			console.value += _logmsg;
			console.scrollTop = console.scrollHeight;
			_logmsg = null;
		}
	}

	function _stampout() {
		if (zk.mounting)
			return zk.afterMount(_stampout);
		zk.stamp('ending');
		zk.stamp();
	}

	
	function _overrideSub(dstpt, nm, oldfn, newfn) {
		for (var sub = dstpt._$subs, j = sub ? sub.length: 0; --j >= 0;) {
			var subpt = sub[j];
			if (subpt[nm] === oldfn) {
				subpt[nm] = newfn;
				_overrideSub(subpt, nm, oldfn, newfn); 
			}
		}
	}


zk.copy(zk, {
	
	procDelay: 900,
	
	tipDelay: 800,
	
	resendDelay: -1,
	
	clickPointer: [0, 0],
	
	currentPointer: [0, 0],
	
	
	
	

	
	loading: 0,
	
	
	
	
	
	
	
	
	
	busy: 0,

	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	

	
	
	
	

	
	
	
	

	
	
	

	
	cut: function (props, nm) {
		var v;
		if (props) {
			v = props[nm];
			delete props[nm];
		}
		return v;
	},

	
	$package: function (name, end, wv) { 
		for (var j = 0, ref = window;;) {
			var k = name.indexOf('.', j),
				nm = k >= 0 ? name.substring(j, k): name.substring(j);
			var nxt = ref[nm], newpkg;
			if (newpkg = !nxt) nxt = ref[nm] = {};
			if (k < 0) {
				if (newpkg && end !== false) zk.setLoaded(name);
					
					
				if (wv) nxt.$wv = true; 
				return nxt;
			}
			ref = nxt;
			j = k + 1;
		}
	},
	
	
	$import: function (name, fn) {
		for (var j = 0, ref = window;;) {
			var k = name.indexOf('.', j),
				nm = k >= 0 ? name.substring(j, k): name.substring(j);
			var nxt = ref[nm];
			if (k < 0 || !nxt) {
				if (fn)
					if (nxt) fn(nxt);
					else
						zk.load(name.substring(0, name.lastIndexOf('.')),
							function () {fn(zk.$import(name));});
				return nxt;
			}
			ref = nxt;
			j = k + 1;
		}
	},

	
	$extends: function (superclass, members, staticMembers) {
		if (!superclass)
			throw 'unknown superclass';

		var jclass = newClass();

		var thispt = jclass.prototype,
			superpt = superclass.prototype,
			define = members['$define'];
		delete members['$define'];
		zk.copy(thispt, superpt); 
		zk.copy(thispt, members);

		for (var p in superclass) 
			if (p != 'prototype')
				jclass[p] = superclass[p];

		zk.copy(jclass, staticMembers);

		thispt.$class = jclass;
		thispt._$super = superpt;
		thispt._$subs = [];
		superpt._$subs.push(thispt);
			
		jclass.$class = zk.Class;
		jclass.superclass = superclass;

		zk.define(jclass, define);

		return jclass;
	},

	
	$default: function (opts, defaults) {
		opts = opts || {};
		for (var p in defaults)
			if (opts[p] === undefined)
				opts[p] = defaults[p];
		return opts;
	},

	
	
	override: function (dst, backup, src) {
		if (typeof backup == "string") {
			dst['$' + backup] = dst[backup];
			dst[backup] = src;
		} else
			for (var nm in src)
				_overrideSub(dst, nm, backup[nm] = dst[nm], dst[nm] = src[nm]);
		return dst;
	},

	
	define: function (klass, props) {
		for (var nm in props) {
			var nm1 = '_' + nm,
				nm2 = nm.charAt(0).toUpperCase() + nm.substring(1),
				pt = klass.prototype,
				after = props[nm], before = null;
			if (jq.isArray(after)) {
				before = after.length ? after[0]: null;
				after = after.length > 1 ? after[1]: null;
			}
			pt['set' + nm2] = def(nm1, before, after);
			pt['get' + nm2] = pt['is' + nm2] =
				new Function('return this.' + nm1 + ';');
		}
		return klass;
	},

	 
	$void: function () {},

	
	parseInt: function (v, b) {
		return v && !isNaN(v = parseInt(v, b || 10)) ? v: 0;
	},
	
	parseFloat: function (v) {
		return v && !isNaN(v = parseFloat(v)) ? v: 0;
	},

	
	
	set: function (o, name, value, extra) {
		if (typeof name == "string") {
			var m = o['set' + name.charAt(0).toUpperCase() + name.substring(1)];
			if (!m) o[name] = value;
			else if (arguments.length >= 4)
				m.call(o, value, extra);
			else
				m.call(o, value);
		} else 
			for (var j = 0, len = value.length, m, n, v; j < len;) {
				n = value[j++];
				m = name['get' + n.charAt(0).toUpperCase() + n.substring(1)];
				if (extra && !m && name[n] === undefined)
					continue;
				zk.set(o, n, m ? m.call(name): name[n]);
			}
		return o;
	},
	
	get: function (o, name) {
		var nm = name.charAt(0).toUpperCase() + name.substring(1);
			m = o['get' + nm];
		if (m) return m.call(o);
		m = o['is' + nm];
		if (m) return m.call(o);
		return o[name];
	},

	
	
	startProcessing: function (timeout) {
		zk.processing = true;
		setTimeout(jq.isReady ? showprgb: showprgbInit, timeout > 0 ? timeout: 0);
	},
	
	endProcessing: function () {
		zk.processing = false;
		zUtl.destroyProgressbox("zk_proc");
	},

	
	disableESC: function () {
		++zk._noESC;
	},
	
	enableESC: function () {
		--zk._noESC;
	},
	_noESC: 0, 

	
	
	error: function (msg) {
		new _zErb(msg);
	},
	
	errorDismiss: function () {
		_zErb.closeAll();
	},
	
	log: function (detailed) {		
		var msg = toLogMsg(
			(detailed !== zk) ? arguments :
				(function (args) {
					var a = [];
					for (var j = args.length; --j > 0;)
						a.unshift(args[j]);
					return a;
				})(arguments)
			, (detailed === zk)
		);
		_logmsg = (_logmsg ? _logmsg + msg: msg) + '\n';
		setTimeout(function(){jq(doLog);}, 300);
	},
	
	
	stamp: function (nm, noAutoLog) {
		if (nm) {
			if (!noAutoLog && !_stamps.length)
				setTimeout(_stampout, 0);
			_stamps.push({n: nm, t: zUtl.now()});
		} else if (_stamps.length) {
			var t0 = zk._t0;
			for (var inf; (inf = _stamps.shift());) {
				zk.log(inf.n + ': ' + (inf.t - zk._t0));
				zk._t0 = inf.t;
			}
			zk.log("total: " + (zk._t0 - t0));
		}
	},

	
	ajaxURI: function (uri, opts) {
		var ctx = zk.Desktop.$(opts?opts.desktop:null),
			au = opts && opts.au;
		ctx = (ctx ? ctx: zk)[au ? 'updateURI': 'contextURI'];
		if (!uri) return ctx;

		var abs = uri.charAt(0) == '/';
		if (au && !abs) {
			abs = true;
			uri = '/' + uri; 
		}

		var j = ctx.lastIndexOf(';'), k = ctx.lastIndexOf('?');
		if (j < 0 && k < 0) return abs ? ctx + uri: uri;

		if (k >= 0 && (j < 0 || k < j)) j = k;
		var prefix = abs ? ctx.substring(0, j): '';

		if (opts && opts.ignoreSession)
			return prefix + uri;

		var suffix = ctx.substring(j),
			l = uri.indexOf('?');
		return l >= 0 ?
			k >= 0 ?
			  prefix + uri.substring(0, l) + suffix + '&' + uri.substring(l+1):
			  prefix + uri.substring(0, l) + suffix + uri.substring(l):
			prefix + uri + suffix;
	},
	
	stateless: function (dtid, contextURI, updateURI, reqURI) {
		var Desktop = zk.Desktop, dt;
		dtid = dtid || ('z_auto' + _statelesscnt++);
		dt = Desktop.all[dtid];
		if (dt && !dt.stateless) throw "Desktop conflict";
		if (zk.updateURI == null)
			zk.updateURI = updateURI;
		if (zk.contextURI == null) 
			zk.contextURI = contextURI;
		return dt || new Desktop(dtid, contextURI, updateURI, reqURI, true);
	}
});


(function () {
	zk.agent = navigator.userAgent.toLowerCase();
	zk.safari = zk.agent.indexOf("safari") >= 0;
	zk.opera = zk.agent.indexOf("opera") >= 0;
	zk.gecko = zk.agent.indexOf("gecko/") >= 0 && !zk.safari && !zk.opera;
	var bodycls;
	if (zk.gecko) {
		var j = zk.agent.indexOf("firefox/");
		j = zk.parseInt(zk.agent.substring(j + 8));
		zk.gecko3 = j >= 3;
		zk.gecko2_ = !zk.gecko3;

		bodycls = 'gecko gecko' + j;
	} else if (zk.opera) {
		bodycls = 'opera';
	} else {
		var j = zk.agent.indexOf("msie ");
		zk.ie = j >= 0;
		if (zk.ie) {
			j = zk.parseInt(zk.agent.substring(j + 5));
			zk.ie7 = j >= 7; 
			zk.ie8c = j >= 8; 
			zk.ie8 = j >= 8 && document.documentMode >= 8; 
			zk.ie6_ = !zk.ie7;
			zk.ie7_ = zk.ie7 && !zk.ie8;
			bodycls = 'ie ie' + j;
		} else if (zk.safari)
			bodycls = 'safari';
	}
	if (zk.air = zk.agent.indexOf("adobeair") >= 0)
		bodycls = 'air';

	zk.css3 = !(zk.ie || zk.gecko2_ || zk.opera);
	
	if (bodycls)
		jq(function () {
			var n = document.body,
				cn = n.className;
			if (cn) cn += ' ';
			n.className = cn + bodycls;
		});
})();


	function getProxy(o, f) { 
		return function () {
				return f.apply(o, arguments);
			};
	}
zk.Object = function () {};

zk.Object.prototype = {
	
	$init: zk.$void,
	
	afterInit: function (f) {
		(this._$ais = this._$ais || []).unshift(f); 
	},
	
	$class: zk.Object,
	
	
	
	$instanceof: function () {
		for (var j = arguments.length, cls; j--;)
			if (cls = arguments[j]) {
				var c = this.$class;
				if (c == zk.Class)
					return this == zk.Object || this == zk.Class; 
				for (; c; c = c.superclass)
					if (c == cls)
						return true;
			}
		return false;
	},
	
	
	$super: function (arg0, arg1) {
		var args = [], bCls = typeof arg0 != "string";
		for (var j = arguments.length, end = bCls ? 1: 0; --j > end;)
			args.unshift(arguments[j]);
		return bCls ? this.$supers(arg0, arg1, args): this.$supers(arg0, args);
	},
	
	
	$supers: function (nm, args, argx) {
		var supers = this._$supers;
		if (!supers) supers = this._$supers = {};

		if (typeof nm != "string") { 
			var old = supers[args], p; 
			if (!(p = nm.prototype._$super) || !(nm = p[args])) 
				throw args + " not in superclass"; 

			supers[args] = p;
			try {
				return nm.apply(this, argx);
			} finally {
				supers[args] = old; 
			}
		}

		
		var old = supers[nm], m, p, oldmtd;
		if (old) {
			oldmtd = old[nm];
			p = old;
		} else {
			oldmtd = this[nm];
			p = this;
		}
		while (p = p._$super)
			if (oldmtd != p[nm]) {
				m = p[nm];
				if (m) supers[nm] = p;
				break;
			}

		if (!m)
			throw nm + " not in superclass";

		try {
			return m.apply(this, args);
		} finally {
			supers[nm] = old; 
		}
	},
	_$subs: [],

	
	proxy: function (f) {
		var fps = this._$proxies, fp;
		if (!fps) this._$proxies = fps = {};
		else if (fp = fps[f]) return fp;
		return fps[f] = getProxy(this, f);
	}
};

zk.Class = function () {}
zk.Class.superclass = zk.Object;
zk.Class.prototype.$class = zk.Class;

_zkf = {
	
	$class: zk.Class,
	
	isInstance: function (o) {
		return o && o.$instanceof && o.$instanceof(this);
	},
	
	isAssignableFrom: function (cls) {
		for (; cls; cls = cls.superclass)
			if (this == cls)
				return true;
		return false;
	},
	$instanceof: zk.Object.prototype.$instanceof
};
zk.copy(zk.Class, _zkf);
zk.copy(zk.Object, _zkf);


var _errs = [], _errcnt = 0;

_zErb = zk.$extends(zk.Object, {
	$init: function (msg) {
		var id = "zk_err" + _errcnt++,
			$id = '#' + id;
			x = (_errcnt * 5) % 50, y = (_errcnt * 5) % 50,
			html =
	'<div class="z-error" style="left:'+(jq.innerX()+x)+'px;top:'+(jq.innerY()+y)
	+'px;" id="'+id+'"><table cellpadding="2" cellspacing="2" width="100%"><tr>'
	+'<td align="right"><div id="'+id+'-p">';
	if (!zk.light)
		html += '<span class="btn" onclick="_zErb._redraw()">redraw</span>&nbsp;';
	html += '<span class="btn" onclick="_zErb._close(\''+id+'\')">close</span></div></td></tr>'
	+'<tr valign="top"><td class="z-error-msg">'+zUtl.encodeXML(msg, {multiline:true}) 
	+'</td></tr></table></div>';
		jq(document.body).append(html);

		this.id = id;
		_errs.push(this);

		try {
			var n;
			this.dg = new zk.Draggable(null, n = jq($id)[0], {
				handle: jq($id + '-p')[0], zIndex: n.style.zIndex,
				starteffect: zk.$void, starteffect: zk.$void,
				endeffect: zk.$void});
		} catch (e) {
		}
	},
	destroy: function () {
		_errs.$remove(this);
		if (this.dg) this.dg.destroy();
		jq('#' + this.id).remove();
	}
},{
	_redraw: function () {
		zk.errorDismiss();
		zAu.send(new zk.Event(null, 'redraw'));
	},
	_close: function (id) {
		for (var j = _errs.length; j--;) {
			var e = _errs[j];
			if (e.id == id) {
				_errs.splice(j, 1);
				e.destroy();
				return;
			}
		}
	},
	closeAll: function () {
		for (var j = _errs.length; j--;)
			_errs[j].destroy();
		_errs = [];
	}
});

})();


zk.copy(String.prototype, {
	startsWith: function (prefix) {
		return this.substring(0,prefix.length) == prefix;
	},
	endsWith: function (suffix) {
		return this.substring(this.length-suffix.length) == suffix;
	},
	trim: function () {
		return jq.trim(this);
	},
	$camel: function() {
		var parts = this.split('-'), len = parts.length;
		if (len == 1) return parts[0];

		var camelized = this.charAt(0) == '-' ?
			parts[0].charAt(0).toUpperCase() + parts[0].substring(1): parts[0];

		for (var i = 1; i < len; i++)
			camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
		return camelized;
	},
	$inc: function (diff) {
		return String.fromCharCode(this.charCodeAt(0) + diff)
	},
	$sub: function (cc) {
		return this.charCodeAt(0) - cc.charCodeAt(0);
	}
});

zk.copy(Array.prototype, {
	$indexOf: function (o) {
		return jq.inArray(o, this);
	},
	$contains: function (o) {
		return this.$indexOf(o) >= 0;
	},
	$equals: function (o) {
		if (jq.isArray(o) && o.length == this.length) {
			for (var j = this.length; j--;) {
				var e = this[j];
				if (e != o[j] && (!jq.isArray(e) || !e.$equals(o[j])))
					return false;
			}
			return true;
		}
	},
	$remove: function (o) {
		for (var ary = jq.isArray(o), j = 0, tl = this.length; j < tl; ++j) {
			if (o == this[j] || (ary && o.$equals(this[j]))) {
				this.splice(j, 1);
				return true;
			}
		}
		return false;
	},
	$clone: function() {
		return [].concat(this);
	}
});
if (!Array.prototype.indexOf)
	Array.prototype.indexOf = function (o) {
		for (var i = 0, len = this.length; i < len; i++)
			if (this[i] == o) return i;
		return -1;
	};

zk.light='1.0.0-RC';zk.spaceless=true;zAu={};

zjq = function (jq) { 
	this.jq = jq;
};
(function () {
	var _jq = {}, 
		
		_txtStyles = [
			'font-family', 'font-size', 'font-weight', 'font-style',
			'letter-spacing', 'line-height', 'text-align', 'text-decoration',
			'text-indent', 'text-shadow', 'text-transform', 'text-overflow',
			'direction', 'word-spacing', 'white-space'],
		_txtStylesCamel, _txtSizDiv, 
		_txtStyles2 = ["color", "background-color", "background"],
		_zsyncs = [],
		_pendzsync = 0,
		_vpId = 0, 
		_sbwDiv; 

	function _elmOfWgt(id, ctx) {
		var w = ctx && ctx !== zk ? zk.Widget.$(ctx): null, w2;
		return (w2=w||zk.Desktop.sync()) && (w2=w2.$f(id, !w)) ? w2.$n(): null;
	}
	function _ofsParent(el) {
		if (el.offsetParent) return el.offsetParent;
		if (el == document.body) return el;

		while ((el = el.parentNode) && el != document.body)
			if (el.style && jq(el).css('position') != 'static') 
				return el;

		return document.body;
	}
	function _zsync(org) {
		if (--_pendzsync <= 0)
			for (var j = _zsyncs.length; j--;)
				_zsyncs[j].zsync(org);
	}
	function _focus(n) {
		var w = zk.Widget.$(n);
		if (w) zk.currentFocus = w;
		try {
			n.focus();
		} catch (e) {
			setTimeout(function() {
				try {
					n.focus();
				} catch (e) {
					setTimeout(function() {try {n.focus();} catch (e) {}}, 100);
				}
			}, 0);
		} 
	}
	function _select(n) {
		try {
			n.select();
		} catch (e) {
			setTimeout(function() {
				try {n.select();} catch (e) {}
			}, 0);
		} 
	}

	function _dissel() {
		this.style.MozUserSelect = "none";
	}
	function _ensel() {
		this.style.MozUserSelect = "";
	}

	function _scrlIntoView(outer, inner, info) {
		if (outer && inner) {
			var ooft = zk(outer).revisedOffset(),
				ioft = info ? info.oft : zk(inner).revisedOffset(),		 
				top = ioft[1] - ooft[1] +
						(outer == (zk.safari ? document.body : document.body.parentNode)
								? 0 : outer.scrollTop),
				ih = info ? info.h : inner.offsetHeight,
				bottom = top + ih,
				updated;
			
			if ( outer.scrollTop > top) {
				outer.scrollTop = top;
				updated = true;
			} else if (bottom > outer.clientHeight + outer.scrollTop) {
				outer.scrollTop = !info ? bottom : bottom - (outer.clientHeight + (inner.parentNode == outer ? 0 : outer.scrollTop));
				updated = true;
			}
			if (updated || !info) {
				if (!info)
					info = {
						oft: ioft,
						h: inner.offsetHeight,
						el: inner
					};
				else info.oft = zk(info.el).revisedOffset();
			}
			outer.scrollTop = outer.scrollTop;
			return info; 
		}
	}

	function _cmOffset(el) {
		var t = 0, l = 0, operaBug;
		
		if (zk.gecko) {
			var p = el.parentNode;
			while (p && p != document.body) {
				var $p = jq(p),
					style = $p.css("position");
				if (style == "relative" || style == "absolute") {
					t += zk.parseInt($p.css("border-top-width"));
					l += zk.parseInt($p.css("border-left-width"));
				}
				p = p.offsetParent;
			}
		}

		do {
			
			var $el = jq(el);
			if ($el.css("position") == 'fixed') {
				t += jq.innerY() + el.offsetTop;
				l += jq.innerX() + el.offsetLeft;
				break;
			} else {
				
				
				if (zk.opera) {
					var nodenm = jq.nodeName(el);
					if (operaBug && nodenm == "div" && el.scrollTop != 0)
						t += el.scrollTop || 0;
					operaBug = nodenm == "span" || nodenm == "input";
				}
				t += el.offsetTop || 0;
				l += el.offsetLeft || 0;
				
				el = zk.gecko && el != document.body ?
					_ofsParent(el): el.offsetParent;
			}
		} while (el);
		return [l, t];
	}
	function _posOffset(el) {
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];

		var t = 0, l = 0;
		do {
			t += el.offsetTop  || 0;
			l += el.offsetLeft || 0;
			
			el = zk.gecko && el != document.body ?
				_ofsParent(el): el.offsetParent;
			if (el) {
				if(jq.nodeName(el, "body")) break;
				var p = jq(el).css('position');
				if (p == 'relative' || p == 'absolute') break;
			}
		} while (el);
		return [l, t];
	}
	function _addOfsToDim($this, dim, revised) {
		if (revised) {
			var ofs = $this.revisedOffset();
			dim.left = ofs[0];
			dim.top = ofs[1];
		} else {
			dim.left = $this.offsetLeft();
			dim.top = $this.offsetTop();
		}
		return dim;
	}

	
	var _rdcss = [];
	function _redoCSS0() {
		if (_rdcss.length) {
			for (var el; el = _rdcss.pop();)
				try {
					zjq._fixCSS(el);
				} catch (e) {
				}
		
			
			setTimeout(_redoCSS0);
		}
	}

zk.copy(zjq, {
	_fixCSS: function (el) { 
		el.className += ' ';
		if (el.offsetHeight)
			;
		el.className.trim();
	},
	_cleanVisi: function (n) { 
		n.style.visibility = "inherit";
	},
	_fixClick: zk.$void, 

	
	_setOuter: function (n, html) { 
		jq(n).replaceWith(html);
	},

	_src0: "" 
});


zk.override(jq.fn, _jq,  {
	
	

	init: function (sel, ctx) {
		if (ctx === zk) {
			if (typeof sel == 'string'
			&& zUtl.isChar(sel.charAt(0), {digit:1,upper:1,lower:1,'_':1})) {
				var el = document.getElementById(sel);
				if (!el || el.id == sel) {
					var ret = jq(el || []);
					ret.context = document;
					ret.selector = '#' + sel;
					ret.zk = new zjq(ret);
					return ret;
				}
				sel = '#' + sel;
			}
			ctx = null;
		}
		if (zk.Widget && zk.Widget.isInstance(sel))
			sel = sel.$n() || '#' + sel.uuid;
		var ret = _jq.init.call(this, sel, ctx);
		ret.zk = new zjq(ret);
		return ret;
	},
	
	replaceWith: function (w, desktop, skipper) {
		if (!zk.Widget.isInstance(w))
			return _jq.replaceWith.apply(this, arguments);

		var n = this[0];
		if (n) w.replaceHTML(n, desktop, skipper);
		return this;
	}

	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
});
jq.fn.init.prototype = jq.fn;

jq.each(['remove', 'empty', 'show', 'hide'], function (i, nm) {
	_jq[nm] = jq.fn[nm];
	jq.fn[nm] = function () {
		return !this.selector && this[0] === document ? this: _jq[nm].apply(this, arguments);
	};
});
jq.each(['before','after','append','prepend'], function (i, nm) {
	_jq[nm] = jq.fn[nm];
	jq.fn[nm] = function (w, desktop) {
		if (!zk.Widget.isInstance(w))
			return _jq[nm].apply(this, arguments);

		if (!this.length) return this;
		if (!zk.Desktop._ndt) zk.stateless();

		var ret = _jq[nm].call(this, w.redrawHTML_());
		if (!w.z_rod) {
			w.bind(desktop);
			zWatch.fireDown('beforeSize', w);
			zWatch.fireDown('onSize', w);
		}
		return ret;
	};
});


zjq.prototype = {
	
	

	
	cleanVisibility: function () {
		return this.jq.each(function () {
			zjq._cleanVisi(this);
		});
	},
	
	
	isVisible: function (strict) {
		var n = this.jq[0];
		return n && (!n.style || (n.style.display != "none" && (!strict || n.style.visibility != "hidden")));
	},
	
	isRealVisible: function (strict) {
		var n = this.jq[0];
		return n && this.isVisible(strict) && (n.offsetWidth > 0 || n.offsetHeight > 0);
	},

	
	scrollTo: function () {
		if (this.jq.length) {
			var pos = this.cmOffset();
			scrollTo(pos[0], pos[1]);
		}
		return this;
	},
	
	scrollIntoView: function (parent) {
		var n = this.jq[0];
		if (n) {
			parent = parent || document.body.parentNode;
			for (var p = n, c; (p = p.parentNode) && n != parent; n = p)
				c = _scrlIntoView(p, n, c);
		}
		return this;
	},

	
	isOverlapped: function (el) {
		var n = this.jq[0];
		if (n)
			return jq.isOverlapped(
				this.cmOffset(), [n.offsetWidth, n.offsetHeight],
				zk(el).cmOffset(), [el.offsetWidth, el.offsetHeight]);
	},

	
	sumStyles: function (areas, styles) {
		var val = 0;
		for (var i = 0, len = areas.length, $jq = this.jq; i < len; i++){
			 var w = zk.parseInt($jq.css(styles[areas.charAt(i)]));
			 if (!isNaN(w)) val += w;
		}
		return val;
	},

	
	setOffsetHeight: function (hgh) {
		var $jq = this.jq;
		hgh -= this.padBorderHeight()
			+ zk.parseInt($jq.css("margin-top"))
			+ zk.parseInt($jq.css("margin-bottom"));
		$jq[0].style.height = jq.px0(hgh);
		return this;
	},

	
	
	revisedOffset: function (ofs) {
		var el = this.jq[0];
		if(!ofs) {
			if (el.getBoundingClientRect){ 
				var elst, oldvisi;
				if (zk.ie && !zk.ie8 && el.style.display == "none") {
				
					oldvisi = (elst = el.style).visibility;
					elst.visibility = "hidden";
					elst.display = "";
				}

				var b = el.getBoundingClientRect();
				b = [b.left + jq.innerX() - el.ownerDocument.documentElement.clientLeft,
					b.top + jq.innerY() - el.ownerDocument.documentElement.clientTop];

				if (elst) {
					elst.display = "none";
					elst.visibility = oldvisi;
				}
				return b;
				
				
				
				
				
				
			}
			ofs = this.cmOffset();
		}
		var scrolls = zk(el.parentNode).scrollOffset();
		scrolls[0] -= jq.innerX(); scrolls[1] -= jq.innerY();
		return [ofs[0] - scrolls[0], ofs[1] - scrolls[1]];
	},
	
	revisedWidth: function (size, excludeMargin) {
		size -= this.padBorderWidth();
		if (size > 0 && excludeMargin)
			size -= this.sumStyles("lr", jq.margins);
		return size < 0 ? 0: size;
	},
	
	revisedHeight: function (size, excludeMargin) {
		size -= this.padBorderHeight();
		if (size > 0 && excludeMargin)
			size -= this.sumStyles("tb", jq.margins);
		return size < 0 ? 0: size;
	},
	
	borderWidth: function () {
		return this.sumStyles("lr", jq.borders);
	},
	
	borderHeight: function () {
		return this.sumStyles("tb", jq.borders);
	},
	
	paddingWidth: function () {
		return this.sumStyles("lr", jq.paddings);
	},
	
	paddingHeight: function () {
		return this.sumStyles("tb", jq.paddings);
	},
	
	padBorderWidth: function () {
		return this.borderWidth() + this.paddingWidth();
	},
	
	padBorderHeight: function () {
		return this.borderHeight() + this.paddingHeight();
	},
	 
	vflexHeight: function () {
		var el = this.jq[0],
			hgh = el.parentNode.clientHeight;
		if (zk.ie6_) { 
			var ref = el.parentNode,
				h = ref.style.height;
			if (h && h.endsWith("px")) {
				h = zk(ref).revisedHeight(zk.parseInt(h));
				if (h && h < hgh) hgh = h;
			}
		}

		for (var p = el; p = p.previousSibling;)
			if (p.offsetHeight && zk(p).isVisible())
				hgh -= p.offsetHeight; 
		for (var p = el; p = p.nextSibling;)
			if (p.offsetHeight && zk(p).isVisible())
				hgh -= p.offsetHeight; 
		return hgh;
	},
	
	cellIndex: function () {
		var cell = this.jq[0];
		return cell ? cell.cellIndex: 0;
	},
	
	ncols: function (visibleOnly) {
		var row = this.jq[0],
			cnt = 0, cells;
		if (row && (cells = row.cells))
			for (var j = 0, cl = cells.length; j < cl; ++j) {
				var cell = cells[j];
				if (!visibleOnly || zk(cell).isVisible()) {
					var span = cell.colSpan;
					if (span >= 1) cnt += span;
					else ++cnt;
				}
			}
		return cnt;
	},
	
	toStyleOffset: function (x, y) {
		var el = this.jq[0],
			oldx = el.style.left, oldy = el.style.top,
			resetFirst = zk.opera || zk.air || zk.ie8;
		
		
		
		
		
		
		if (resetFirst || el.style.left == "" || el.style.left == "auto")
			el.style.left = "0";
		if (resetFirst || el.style.top == "" || el.style.top == "auto")
			el.style.top = "0";

		var ofs1 = this.cmOffset(),
			x2 = zk.parseInt(el.style.left),
			y2 = zk.parseInt(el.style.top);
		ofs1 = [x - ofs1[0] + x2, y  - ofs1[1] + y2];

		el.style.left = oldx; el.style.top = oldy; 
		return ofs1;
	},
	
	center: function (flags) {
		var el = this.jq[0],
			wdgap = this.offsetWidth(),
			hghgap = this.offsetHeight();

		if ((!wdgap || !hghgap) && !this.isVisible()) {
			el.style.left = el.style.top = "-10000px"; 
			el.style.display = "block"; 
			wdgap = this.offsetWidth();
			hghgap = this.offsetHeight(),
			el.style.display = "none"; 
		}

		var left = jq.innerX(), top = jq.innerY();
		var x, y, skipx, skipy;

		wdgap = jq.innerWidth() - wdgap;
		if (!flags) x = left + wdgap / 2;
		else if (flags.indexOf("left") >= 0) x = left;
		else if (flags.indexOf("right") >= 0) x = left + wdgap - 1; 
		else if (flags.indexOf("center") >= 0) x = left + wdgap / 2;
		else {
			x = 0; skipx = true;
		}

		hghgap = jq.innerHeight() - hghgap;
		if (!flags) y = top + hghgap / 2;
		else if (flags.indexOf("top") >= 0) y = top;
		else if (flags.indexOf("bottom") >= 0) y = top + hghgap - 1; 
		else if (flags.indexOf("center") >= 0) y = top + hghgap / 2;
		else {
			y = 0; skipy = true;
		}

		if (x < left) x = left;
		if (y < top) y = top;

		var ofs = this.toStyleOffset(x, y);

		if (!skipx) el.style.left = jq.px(ofs[0]);
		if (!skipy) el.style.top =  jq.px(ofs[1]);
		return this;
	},
	
	
	position: function (dim, where, opts) {
		where = where || "overlap";
		if (dim.nodeType) 
			dim = zk(dim).dimension(true);
		var x = dim.left, y = dim.top,
			wd = this.dimension(), hgh = wd.height; 
		wd = wd.width;

		switch(where) {
		case "before_start":
			y -= hgh;
			break;
		case "before_end":
			y -= hgh;
			x += dim.width - wd;
			break;
		case "after_start":
			y += dim.height;
			break;
		case "after_end":
			y += dim.height;
			x += dim.width - wd;
			break;
		case "start_before":
			x -= wd;
			break;
		case "start_after":
			x -= wd;
			y += dim.height - hgh;
			break;
		case "end_before":
			x += dim.width;
			break;
		case "end_after":
			x += dim.width;
			y += dim.height - hgh;
			break;
		case "at_pointer":
			var offset = zk.currentPointer;
			x = offset[0];
			y = offset[1];
			break;
		case "after_pointer":
			var offset = zk.currentPointer;
			x = offset[0];
			y = offset[1] + 20;
			break;
		case "overlap_end":
			x += dim.width - wd;
			break; 
		case "overlap_before":
			y += dim.height - hgh;
			break; 
		case "overlap_after":
			x += dim.width - wd;
			y += dim.height - hgh;
			break;
		default: 
			
		}

		if (!opts || !opts.overflow) {
			var scX = jq.innerX(),
				scY = jq.innerY(),
				scMaxX = scX + jq.innerWidth(),
				scMaxY = scY + jq.innerHeight();

			if (x + wd > scMaxX) x = scMaxX - wd;
			if (x < scX) x = scX;
			if (y + hgh > scMaxY) y = scMaxY - hgh;
			if (y < scY) y = scY;
		}

		var el = this.jq[0],
			ofs = this.toStyleOffset(x, y);
		el.style.left = jq.px(ofs[0]);
		el.style.top = jq.px(ofs[1]);
		return this;
	},

	
	scrollOffset: function() {
		var el = this.jq[0],
			t = 0, l = 0;
		do {
			t += el.scrollTop  || 0;
			l += el.scrollLeft || 0;
			el = el.parentNode;
		} while (el);
		return [l, t];
	},
	
	cmOffset: function () {
		
		var el = this.jq[0];
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];

		
		if (!(zk.gecko || zk.safari)
		|| this.isVisible() || this.offsetWidth())
			return _cmOffset(el);

		el.style.display = "";
		var ofs = _cmOffset(el);
		el.style.display = "none";
		return ofs;
	},

	
	absolutize: function() {
		var el = this.jq[0];
		if (el.style.position == 'absolute') return this;

		var offsets = _posOffset(el),
			left = offsets[0], top = offsets[1],
			st = el.style;
		el._$orgLeft = left - parseFloat(st.left  || 0);
		el._$orgTop = top  - parseFloat(st.top || 0);
		st.position = 'absolute';
		st.top = jq.px(top);
		st.left = jq.px(left);
		return this;
	},
	
	relativize: function() {
		var el = this.jq[0];
		if (el.style.position == 'relative') return this;

		var st = el.style;
		st.position = 'relative';
		var top  = parseFloat(st.top  || 0) - (el._$orgTop || 0),
			left = parseFloat(st.left || 0) - (el._$orgLeft || 0);

		st.top = jq.px(top);
		st.left = jq.px(left);
		return this;
	},

	
	offsetWidth: function () {
		var el = this.jq[0];
		if (!zk.safari || !jq.nodeName(el, "tr")) return el.offsetWidth;

		var wd = 0;
		for (var cells = el.cells, j = cells.length; j--;)
			wd += cells[j].offsetWidth;
		return wd;
	},
	
	offsetHeight: function () {
		var el = this.jq[0];
		if (!zk.safari || !jq.nodeName(el, "tr")) return el.offsetHeight;

		var hgh = 0;
		for (var cells = el.cells, j = cells.length; j--;) {
			var h = cells[j].offsetHeight;
			if (h > hgh) hgh = h;
		}
		return hgh;
	},
	
	offsetTop: function () {
		var el = this.jq[0];
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];
		return el.offsetTop;
	},
	
	offsetLeft: function () {
		var el = this.jq[0];
		if (zk.safari && jq.nodeName(el, "tr") && el.cells.length)
			el = el.cells[0];
		return el.offsetLeft;
	},

	
	viewportOffset: function() {
		var t = 0, l = 0, el = this.jq[0], p = el;
		do {
			t += p.offsetTop  || 0;
			l += p.offsetLeft || 0;

			
			if (p.offsetParent==document.body)
			if (jq(p).css('position')=='absolute') break;

		} while (p = p.offsetParent);

		do {
			if (!zk.opera || jq.nodeName(el, 'body')) {
				t -= el.scrollTop  || 0;
				l -= el.scrollLeft || 0;
			}
		} while (el = el.parentNode);
		return [l, t];
	},
	
	textSize: function (txt) {
		if (!_txtSizDiv) {
			_txtSizDiv = document.createElement("div");
			_txtSizDiv.style.cssText = "left:-1000px;top:-1000px;position:absolute;visibility:hidden;border:none";
			document.body.appendChild(_txtSizDiv);

			_txtStylesCamel = [];
			for (var ss = _txtStyles, j = ss.length; j--;)
				_txtStylesCamel[j] = ss[j].$camel();
		}
		_txtSizDiv.style.display = 'none';
		var jq = this.jq;
		for (var ss = _txtStylesCamel, j = ss.length; j--;) {
			var nm = ss[j];
			_txtSizDiv.style[nm] = jq.css(nm);
		}

		_txtSizDiv.innerHTML = txt || jq[0].innerHTML;
		_txtSizDiv.style.display = '';
		return [_txtSizDiv.offsetWidth, _txtSizDiv.offsetHeight];
	},

	
	dimension: function (revised) {
		var display = this.jq.css('display');
		if (display != 'none' && display != null) 
			return _addOfsToDim(this,
				{width: this.offsetWidth(), height: this.offsetHeight()}, revised);

	
	
		var st = this.jq[0].style,
			backup = {};
		zk.copy(st, {
			visibility: 'hidden',
			position: 'absolute',
			display: 'block'
			}, backup);
		try {
			return _addOfsToDim(this,
				{width: this.offsetWidth(), height: this.offsetHeight()}, revised);
		} finally {
			zk.copy(st, backup);
		}
	},

	
	redoCSS: function (timeout) {
		for (var j = this.jq.length; j--;)
			_rdcss.push(this.jq[j]);
		setTimeout(_redoCSS0, timeout >= 0 ? timeout : 100);
		return this;
	},
	
	redoSrc: function () {
		for (var j = this.jq.length; j--;) {
			var el = this.jq[j],
				src = el.src;
			el.src = zjq._src0;
			el.src = src;
		}
		return this;
	},

	
	vparentNode: function (real) {
		var el = this.jq[0];
		if (el) {
			var v = el.z_vp; 
			if (v) return jq('#' + v)[0];
			v = el.z_vpagt;
			if (v && (v = jq('#' +v)[0]))
				return v.parentNode;
			if (real)
				return el.parentNode;
		}
	},
	
	makeVParent: function () {
		var el = this.jq[0],
			p = el.parentNode;
		if (el.z_vp || el.z_vpagt || p == document.body)
			return this; 

		var sib = el.nextSibling,
			agt = document.createElement("span");
		agt.id = el.z_vpagt = '_z_vpagt' + _vpId ++;
		agt.style.display = "none";
		if (sib) p.insertBefore(agt, sib);
		else p.appendChild(agt);

		el.z_vp = p.id; 
		document.body.appendChild(el);
		return this;
	},
	
	undoVParent: function () {
		var el = this.jq[0];
		if (el.z_vp || el.z_vpagt) {
			var p = el.z_vp,
				agt = el.z_vpagt,
				$agt = jq('#' + agt);
			el.z_vp = el.z_vpagt = null;
			agt = $agt[0];

			p = p ? jq('#' + p)[0]: agt ? agt.parentNode: null;
			if (p)
				if (agt) {
					p.insertBefore(el, agt);
					$agt.remove();
				} else
					p.appendChild(el);
		}
		return this;
	},

	
	
	focus: function (timeout) {
		var n = this.jq[0];
		if (!n || !n.focus) return false;
			

		if (!jq.nodeName(n, 'button', 'input', 'textarea', 'a', 'select', 'iframe'))
			return false;

		if (timeout >= 0) setTimeout(function() {_focus(n);}, timeout);
		else _focus(n);
		return true;
	},
	
	select: function (timeout) {
		var n = this.jq[0];
		if (!n || typeof n.select != 'function') return false;

		if (timeout >= 0) setTimeout(function() {_select(n);}, timeout);
		else _select(n);
		return true;
	},

	
	getSelectionRange: function() {
		var inp = this.jq[0];
		try {
			if (document.selection != null && inp.selectionStart == null) { 
				var range = document.selection.createRange();
				var rangetwo = inp.createTextRange();
				var stored_range = "";
				if(inp.type.toLowerCase() == "text"){
					stored_range = rangetwo.duplicate();
				}else{
					 stored_range = range.duplicate();
					 stored_range.moveToElementText(inp);
				}
				stored_range.setEndPoint('EndToEnd', range);
				var start = stored_range.text.length - range.text.length;
				return [start, start + range.text.length];
			} else { 
				return [inp.selectionStart, inp.selectionEnd];
			}
		} catch (e) {
			return [0, 0];
		}
	},
	
	setSelectionRange: function (start, end) {
		var inp = this.jq[0],
			len = inp.value.length;
		if (start == null || start < 0) start = 0;
		if (start > len) start = len;
		if (end == null || end > len) end = len;
		if (end < 0) end = 0;

		if (inp.setSelectionRange) {
			inp.setSelectionRange(start, end);
			inp.focus();
		} else if (inp.createTextRange) {
			var range = inp.createTextRange();
			if(start != end){
				range.moveEnd('character', end - range.text.length);
				range.moveStart('character', start);
			}else{
				range.move('character', start);
			}
			range.select();
		}
		return this;
	},

	
	
	disableSelection: function () {
		this.jq.each(_dissel);
		return this;
	},
	
	enableSelection: function () {
		this.jq.each(_ensel);
		return this;
	},

	
	setStyles: function (styles) {
		this.jq.css(styles);
		return this;
	},
	
	clearStyles: function () {
		var st = this.jq[0];
		if (st && (st=st.style))
			for (var nm in st)
				if ((!zk.ie || nm != "accelerator")
				&& st[nm] && typeof st[nm] == "string")
					try {
						st[nm] = "";
					} catch (e) { 
					}
		return this;
	}
};


zk.copy(jq, {
	
	
	nodeName: function (el) {
		var tag = el && el.nodeName ? el.nodeName.toLowerCase(): "",
			j = arguments.length;
		if (j <= 1)
			return tag;
		while (--j)
			if (tag == arguments[j].toLowerCase())
				return true;
		return false;
	},

	
	px: function (v) {
		return (v||0) + "px";
	},
	
	px0: function (v) {
		return Math.max(v||0, 0) + "px";
	},

	
	$$: function (id, subId) {
		return typeof id == 'string' ?
			id ? document.getElementsByName(id + (subId ? '-' + subId : '')): null: id;
	},

	
	isAncestor: function (p, c) {
		if (!p) return true;
		for (; c; c = zk(c).vparentNode(true))
			if (p == c)
				return true;
		return false;
	},
	
	innerX: function () {
		return window.pageXOffset
			|| document.documentElement.scrollLeft
			|| document.body.scrollLeft || 0;
	},
	
	innerY: function () {
		return window.pageYOffset
			|| document.documentElement.scrollTop
			|| document.body.scrollTop || 0;
	},
	
	innerWidth: function () {
		return typeof window.innerWidth == "number" ? window.innerWidth:
			document.compatMode == "CSS1Compat" ?
				document.documentElement.clientWidth: document.body.clientWidth;
	},
	
	innerHeight: function () {
		return typeof window.innerHeight == "number" ? window.innerHeight:
			document.compatMode == "CSS1Compat" ?
				document.documentElement.clientHeight: document.body.clientHeight;
	},
	
	pageWidth: function () {
		var a = document.body.scrollWidth, b = document.body.offsetWidth;
		return a > b ? a: b;
	},
	
	pageHeight: function () {
		var a = document.body.scrollHeight, b = document.body.offsetHeight;
		return a > b ? a: b;
	},

	
	margins: {l: "margin-left", r: "margin-right", t: "margin-top", b: "margin-bottom"},
	
	borders: {l: "border-left-width", r: "border-right-width", t: "border-top-width", b: "border-bottom-width"},
	
	paddings: {l: "padding-left", r: "padding-right", t: "padding-top", b: "padding-bottom"},

	
	scrollbarWidth: function () {
		if (!_sbwDiv) {
			_sbwDiv = document.createElement("div");
			_sbwDiv.style.cssText = "top:-1000px;left:-1000px;position:absolute;visibility:hidden;border:none;width:50px;height:50px;overflow:scroll;";
			document.body.appendChild(_sbwDiv);
		}
		return _sbwDiv.offsetWidth - _sbwDiv.clientWidth;
	},
	
	isOverlapped: function (ofs1, dim1, ofs2, dim2) {
		var o1x1 = ofs1[0], o1x2 = dim1[0] + o1x1,
			o1y1 = ofs1[1], o1y2 = dim1[1] + o1y1;
		var o2x1 = ofs2[0], o2x2 = dim2[0] + o2x1,
			o2y1 = ofs2[1], o2y2 = dim2[1] + o2y1;
		return o2x1 <= o1x2 && o2x2 >= o1x1 && o2y1 <= o1y2 && o2y2 >= o1y1;
	},

	
	clearSelection: function () {
		try{
			if (window["getSelection"]) {
				if (zk.safari) window.getSelection().collapse();
				else window.getSelection().removeAllRanges();
			} else if (document.selection) {
				if (document.selection.empty) document.selection.empty();
				else if (document.selection.clear) document.selection.clear();
			}
			return true;
		} catch (e){
			return false;
		}
	},

	
	
	filterTextStyle: function (style, plus) {
		if (typeof style == 'string') {
			var ts = "";
			if (style)
				for (var j = 0, k = 0; k >= 0; j = k + 1) {
					k = style.indexOf(';', j);
					var s = k >= 0 ? style.substring(j, k): style.substring(j),
						l = s.indexOf(':'),
						nm = l < 0 ? s.trim(): s.substring(0, l).trim();
					if (nm && (_txtStyles.$contains(nm)
					|| _txtStyles2.$contains(nm)
					|| (plus && plus.$contains(nm))))
						ts += s + ';';
				}
			return ts;
		}

		var ts = {};
		for (var nm in style)
			if (_txtStyles.$contains(nm) || _txtStyles2.$contains(nm)
			|| (plus && plus.$contains(nm)))
				ts[nm] = style[nm];
		return ts;
	},

	
	parseStyle: function (style) {
		var map = {};
		if (style) {
			var pairs = style.split(';');
			for (var j = 0, len = pairs.length; j < len;) {
				var v = pairs[j++].split(':'),
					nm = v.length > 0 ? v[0].trim(): '';
				if (nm)
					map[nm] = v.length > 1 ? v[1].trim(): '';
			}
		}
		return map;
	},

	
	newFrame: function (id, src, style) {
		if (!src) src = zjq._src0;
			

		var html = '<iframe id="'+id+'" name="'+id+'" src="'+src+'"';
		if (style == null) style = 'display:none';
		html += ' style="'+style+'"></iframe>';
		jq(document.body).append(html);
		return zk(id).jq[0];
	},
	
	newStackup: function (el, id, anchor) {
		el = jq(el||[], zk)[0];
		var ifr = document.createElement("iframe");
		ifr.id = id || (el ? el.id + "-ifrstk": 'z_ifrstk');
		ifr.style.cssText = "position:absolute;overflow:hidden;filter:alpha(opacity=0)";
		ifr.frameBorder = "no";
		ifr.tabIndex = -1;
		ifr.src = zjq._src0;
		if (el) {
			ifr.style.width = el.offsetWidth + "px";
			ifr.style.height = el.offsetHeight + "px";
			ifr.style.top = el.style.top;
			ifr.style.left = el.style.left;
			ifr.style.zIndex = el.style.zIndex;
			el.parentNode.insertBefore(ifr, anchor || el);
		}
		return ifr;
	},
	
	newHidden: function (nm, val, parent) {
		var inp = document.createElement("input");
		inp.type = "hidden";
		inp.name = nm;
		inp.value = val;
		if (parent) parent.appendChild(inp);
		return inp;
	},

	
	head: function () {
		return document.getElementsByTagName("head")[0] || document.documentElement;
	},

	
	
	confirm: function (msg) {
		zk.alerting = true;
		try {
			return confirm(msg);
		} finally {
			try {zk.alerting = false;} catch (e) {} 
		}
	},
	
	alert: function (msg) {
		zk.alerting = true;
		try {
			alert(msg);
		} finally {
			try {zk.alerting = false;} catch (e) {} 
		}
	},
	
	onzsync: function (obj) {
		_zsyncs.unshift(obj);
	},
	
	unzsync: function (obj) {
		_zsyncs.$remove(obj);
	},
	
	zsync: function (org) {
		++_pendzsync;
		setTimeout(function () {_zsync(org);}, 50);	
	},

	
	focusOut: zk.ie ? function () {
		window.focus();
	}: function () {
		var a = jq('#z_focusOut')[0];
		if (!a) {
			
			jq(document.body).append('<a href="javascript:;" style="position:absolute;'
					+ 'left:' + zk.clickPointer[0] + 'px;top:' + zk.clickPointer[1]
					+ 'px;" id="z_focusOut"/>');
			a = jq('#z_focusOut')[0];
		}
		a.focus();
		setTimeout(function () {jq(a).remove();}, 500);
	}

	
	
	
	
});


zk.copy(jq.Event.prototype, {
	
	stop: function () {
		this.preventDefault();
		this.stopPropagation();
	},
	
	mouseData: function () {
		return zk.copy({
			pageX: this.pageX, pageY: this.pageY
		}, this.metaData());
	},
	
	keyData: function () {
		return zk.copy({
			keyCode: this.keyCode,
			charCode: this.charCode
			}, this.metaData());
	},
	
	metaData: function () {
		var inf = {};
		if (this.altKey) inf.altKey = true;
		if (this.ctrlKey) inf.ctrlKey = true;
		if (this.shiftKey) inf.shiftKey = true;
		inf.which = this.which || 0;
		return inf;
	}
});


zk.copy(jq.Event, {
	
	fire: document.createEvent ? function (el, evtnm) {
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent(evtnm, false, false);
		el.dispatchEvent(evt);
	}: function (el, evtnm) {
		el.fireEvent('on' + evtnm);
	},
	
	stop: function (evt) {
		evt.stop();
	},
	
	filterMetaData: function (data) {
		var inf = {}
		if (data.altKey) inf.altKey = true;
		if (data.ctrlKey) inf.ctrlKey = true;
		if (data.shiftKey) inf.shiftKey = true;
		inf.which = data.which || 0;
		return inf;
	},
	
	zk: function (evt, wgt) {
		var type = evt.type,
			target = zk.Widget.$(evt) || wgt,
			data, opts;

		if (type.startsWith('mouse')) {
			if (type.length > 5)
				type = 'Mouse' + type.charAt(5).toUpperCase() + type.substring(6);
			data = evt.mouseData();
		} else if (type.startsWith('key')) {
			if (type.length > 3)
				type = 'Key' + type.charAt(3).toUpperCase() + type.substring(4);
			data = evt.keyData();
		} else if (type == 'dblclick') {
			data = evt.mouseData();
			opts = {ctl:true};
			type = 'DoubleClick';
		} else {
			if (type == 'click') {
				data = evt.mouseData();
				opts = {ctl:true};
			}
			type = type.charAt(0).toUpperCase() + type.substring(1);
		}
		return new zk.Event(target, 'on' + type, data, opts, evt);
	}
});
})();

if(zk.ie){

(function () {
	
	function containsScript(html) {
		if (html)
			for (var j = 0, len = html.length; (j = html.indexOf("</", j)) >= 0 && j + 8 < len;)
				if (html.substring(j += 2, j + 6).toLowerCase() == "script")
					return true;
	}
	function noSkipBfUnload() {
		zk.skipBfUnload = false;
	}

var _zjq = {};
zk.override(zjq, _zjq, {
	_fixCSS: function (el) {
		var zoom = el.style.zoom;
		el.style.zoom = 1;
		_zjq._fixCSS(el);
		setTimeout(function() {
			try {el.style.zoom = zoom;} catch (e) {}
		});
	}
});
zk.copy(zjq, {
	_src0: "javascript:false;",
		

	_fixIframe: function (el) { 
		try {
			if (jq.nodeName(el, 'iframe'))
				zk(el).redoSrc();
			else
				for (var ns = el.getElementsByTagName("iframe"), j = ns.length; j--;)
					zk(ns[j]).redoSrc();
		} catch (e) {
		}
	},

	_fixClick: function (evt) {
		
		
		if (zk.confirmClose)
			for (var n = evt.target; n; n = n.parentNode)
				if (jq.nodeName(n, "a", "area")) {
					if (n.href.indexOf("javascript:") >= 0) {
						zk.skipBfUnload = true;
						setTimeout(noSkipBfUnload, 0); 
					}
					return;
				}
	},

	_beforeOuter: zk.$void, 
	_afterOuter: zk.$void,

	_setOuter: function (el, html) {
		
		var done;
		try {
			
			
			
			
			
			
			if ((el = jq(el)[0]) && !jq.nodeName(el, "td", "th", "table", "tr",
			"caption", "tbody", "thead", "tfoot", "colgroup","col")
			&& !containsScript(html)) {
				var o = zjq._beforeOuter(el);

				jq.cleanData(el.getElementsByTagName("*"));
				jq.cleanData([el]);
				el.innerHTML = ""; 
				el.outerHTML = html;
				done = true;
				zjq._afterOuter(o);
				return;
			}
		} catch (e) {
		}
		if (!done)
			jq(el).replaceWith(html);
	}
});

	function _dissel() {
		this.onselectstart = _dissel0;
	}
	function _dissel0(evt) {
		evt = evt || window.event;
		var n = evt.srcElement;
		return jq.nodeName(n, "textarea", "input") && (n.type == "text" || n.type == "password");
	}
	function _ensel() {
		this.onselectstart = null;
	}
zk.copy(zjq.prototype, {
	disableSelection: function () {
		return this.jq.each(_dissel);
	},
	enableSelection: function () {
		return this.jq.each(_ensel);
	},

	cellIndex: function () {
		var cell = this.jq[0];
		if (cell) {
			var cells = cell.parentNode.cells;
			for(var j = 0, cl = cells.length; j < cl; j++)
				if (cells[j] == cell)
					return j;
		}
		return 0;
	}
});

})();

zk.override(jq.event, zjq._evt = {}, {
	fix: function (evt) {
		evt = zjq._evt.fix.apply(this, arguments);
		if (!evt.which && evt.button === 0)
			evt.which = 1; 
		return evt;
	}
});

if(zk.ie6_){

(function () {
	var _imgFiltered = [], 
		_IMGLD = 'DXImageTransform.Microsoft.AlphaImageLoader',
		_FILTER = "progid:" + _IMGLD + "(src='%1',sizingMethod='scale')",
		_inPrint,
		_jq$fn = {}, 
		_nodesToFix = []; 

	function _regexFormat(s) {
		var args = arguments;
		var regex = new RegExp("%([1-" + arguments.length + "])", "g");
		return String(s).replace(regex, function (match, index) {
			return index < args.length ? args[index] : match;
		});
	}
	function _regexEscape(s) {
		return String(s).replace(/([\/()[\]{}|*+-.,^$?\\])/g, "\\$1");
	}

	function _onpropchange() {
	 	if (!_inPrint && event.propertyName == "src"
	 	&& this.src.indexOf('spacer.gif') < 0)
	 		_fix(this);
	}
	function _fix(img) {
		var ni = new Image(img.width, img.height);
		ni.onload = function() {
			img.width = ni.width;
			img.height = ni.height;
			ni = null;
		};
		ni.src = img.src; 
		img._pngSrc = img.src; 
		_addFilter(img);
	}
	function _addFilter(img) {
		var filter = img.filters[_IMGLD];
		if (filter) {
			filter.src = img.src;
			filter.enabled = true;
		} else {
			img.runtimeStyle.filter = _regexFormat(_FILTER, img.src);
			_imgFiltered.push(img);
		}
		img.src = zk.SPACER_URI; 
	}
	function _rmFilter(img) {
		img.src = img._pngSrc;
		img.filters[_IMGLD].enabled = false;
	}

	
	function fixDom(n, nxt) { 
		var regex;
		if (regex = jq.IE6_ALPHAFIX) {
			if (typeof regex == 'string')
				regex = jq.IE6_ALPHAFIX
					= new RegExp(_regexEscape(regex) + "$", "i");

			if (!zk.SPACER_URI)
				zk.SPACER_URI = zk.ajaxURI('web/img/spacer.gif', {au:true});

			for (; n && n != nxt; n = n.nextSibling)
				if (n.nodeType == 1) {
					_nodesToFix.push(n);
					setTimeout(fixDom0, 50);
				}
		}
	}
	function fixDom0() {
		var n = _nodesToFix.shift();
		if (n) {
			
			var regex = jq.IE6_ALPHAFIX,
				imgs = n.getElementsByTagName("img");
			for (var j = imgs.length; j--; ) {
				var img = imgs[j], src = img.src,
					k = src.lastIndexOf(';');
				if (k >= 0) src = src.substring(0, k);
				if (regex.test(img.src)) {
					_fix(img);
					jq(img).bind("propertychange", _onpropchange);
				}
			}

			
			if (_nodesToFix.length) setTimeout(fixDom0, 50);
		}
	}

zk.override(jq.fn, _jq$fn, {
	before: function () {
		var e = this[0], ref;
		if (e) ref = e.previousSibling;

		ret = _jq$fn.before.apply(this, arguments);

		if (e) fixDom(ref ? ref.nextSibling:
			e.parentNode ? e.parentNode.firstChild: null, e);
			
		return ret;
	},
	after: function () {
		var e = this[0], ref;
		if (e) ref = e.nextSibling;

		ret = _jq$fn.after.apply(this, arguments);

		if (e) fixDom(e.nextSibling, ref);
		return ret;
	},
	append: function () {
		var e = this[0], ref;
		if (e) ref = e.lastChild;

		ret = _jq$fn.append.apply(this, arguments);

		if (e) fixDom(ref ? ref.nextSibling: e.firstChild);
		return ret;
	},
	prepend: function () {
		var e = this[0], ref;
		if (e) ref = e.firstChild;

		ret = _jq$fn.prepend.apply(this, arguments);

		if (e) fixDom(e.firstChild, ref);
		return ret;
	},
	replaceWith: function () {
		var e = this[0], ref, ref2, p;
		if (e) {
			p = e.parentNode;
			ref = e.previousSibling;
			ref2 = e.nextSibling;
		}

		ret = _jq$fn.replaceWith.apply(this, arguments);

		if (e)
			fixDom(ref ? ref.nextSibling: p ? p.firstChild: null, ref2);
			
		return ret;
	},
	html: function (content) {
		var e = content === undefined ? null: this[0];

		ret = _jq$fn.html.apply(this, arguments);

		if (e) fixDom(e.firstChild);
		return ret;
	},

	clone: function () {
		var clone = _jq$fn.clone.apply(this, arguments), n, nc;
		for (var j = 0; j < this.length; ++j) {
			n = this[j];
			if (jq.nodeName(n, "img") && n._pngSrc) {
				(nc = clone[j]).src = n._pngSrc;
				setTimeout(function() {_fix(nc);}, 0); 
			}
		}
		return clone;
	}
});

zk.copy(zjq, {
	
	_beforeOuter: function (e) {
		if (e)
			return {p: e.parentNode, ref: e.previousSibling, ref2: e.nextSibling};
	},
	_afterOuter: function (o) {
		if (o)
			fixDom(o.ref ? o.ref.nextSibling: o.p ? o.p.firstChild: null, o.ref2);
	}
});

jq(window).bind("beforeprint", function() {
		_inPrint = true;
		for (var ns = _imgFiltered, i = 0, len = ns.length; i < len; i++) {
			var n = ns[i];
			try {
				_rmFilter(n);
			} catch (e) {
				ns.splice(i--, 1); 
				len--;
			}
		}
	})
	.bind("afterprint", function() {
		for (var ns = _imgFiltered, i = 0, len = ns.length; i < len; i++)
			_addFilter(ns[i]);
		_inPrint = false;
	});

})();
}}else if(zk.opera){

zk.copy(zjq.prototype, {
	scrollOffset: function() {
		
		
		
		var el = this.jq[0],
			normaltag = !jq.nodeName(el, "tr", "img"),
			t = 0, l = 0;
		do {
			var tag = jq.nodeName(el);
			if (tag == 'body' || (normaltag && tag == 'div')) {
				t += el.scrollTop  || 0;
				l += el.scrollLeft || 0;
			}
			el = el.parentNode;
		} while (el);
		return [l, t];
	}
});

zk.copy(zjq, {
	_cleanVisi: function (n) {
		n.style.visibility = n.getElementsByTagName('input').length ? "visible": 'inherit';
			
	}
});
}else if(zk.safari){

(function () {
	function _dissel() {
		this.style.KhtmlUserSelect = "none";
	}
	function _ensel() {
		this.style.KhtmlUserSelect = "";
	}

zk.copy(zjq.prototype, {
	disableSelection: function () {
		return this.jq.each(_dissel);
	},
	enableSelection: function () {
		return this.jq.each(_ensel);
	}
});

zjq._sfKeys = {
	25: 9, 	   
	63232: 38, 
	63233: 40, 
	63234: 37, 
	63235: 39, 
	63272: 46, 
	63273: 36, 
	63275: 35, 
	63276: 33, 
	63277: 34  
};
zk.override(jq.event, zjq._evt = {}, {
	fix: function (evt) {
		evt = zjq._evt.fix.apply(this, arguments);
		var v = zjq._sfKeys[evt.keyCode];
		if (v) evt.keyCode = v;
		return evt;
	}
});

})();

}

(function () {

	function _addAnique(id, data) {
		var ary = zk._anique[id];
		if (!ary)
			ary = zk._anique[id] = [];
		ary.push(data);
	}
	function _doAnique(id) {
		var ary = zk._anique[id];
		if (ary) {
			var al = ary.length;
			while (al) {
				var data = ary.shift();
				if (jq(data.el).is(':animated')) {
					ary.unshift(data);
					break;
				}
				zk(data.el)[data.anima](data.wgt, data.opts);
				al--;
			}

			if (!al)
				delete zk._anique[id];
		}
	}

	function _saveProp(self, set) {
		var ele = self.jq;
		for(var i = set.length; i--;)
			if(set[i] !== null) ele.data("zk.cache."+set[i], ele[0].style[set[i]]);
		return self;
	}
	function _restoreProp(self, set) {
		var ele = self.jq;
		for(var i = set.length; i--;)
			if(set[i] !== null) ele.css(set[i], ele.data("zk.cache."+set[i]));
		return self;
	}
	function _checkAnimated(self, wgt, opts, anima) {
		if (self.jq.is(':animated')) {
			_addAnique(wgt.uuid, {el: self.jq[0], wgt: wgt, opts: opts, anima: anima});
			return true;
		}
		return false;
	}
	function _checkPosition(self, css) {
		var pos = self.jq.css('position');
		if (!pos || pos == 'static')
			css.position = 'relative';
		return self;
	}
	function _defAnimaOpts(self, wgt, opts, prop, mode) {
		jq.timers.push(function() {
			if (mode == 'hide')
				zWatch.fireDown('onHide', wgt);
			if (opts.beforeAnima)
				opts.beforeAnima.call(wgt, self);
		});

		var aftfn = opts.afterAnima;
		opts.afterAnima = function () {
			if (mode == 'hide') {
				self.jq.hide();
			} else {
				if (zk.ie) zk(self.jq[0]).redoCSS(); 
				zWatch.fireDown('onShow', wgt);
			}
			if (prop) _restoreProp(self, prop);
			if (aftfn) aftfn.call(wgt, self.jq.context);
			setTimeout(function () {
				_doAnique(wgt.uuid);
			});
		};
		return self;
	}


zk.copy(zk, {
	
	animating: function () {
		return !!jq.timers.length;
	},
	_anique: {}
});

zk.copy(zjq.prototype, {
	
	slideDown: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideDown'))
			return this;

		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'height', 'width', 'overflow', 'position'],
			anima = {},
			css = {overflow: 'hidden'},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			css.height = '0px';
			anima.height = jq.px0(dims.height);
			break;
		case 'b':
			css.height = '0px';
			css.top = jq.px(dims.top + dims.height);
			anima.height = jq.px0(dims.height);
			anima.top = jq.px(dims.top);
			break;
		case 'l':
			css.width = '0px';
			anima.width = jq.px0(dims.width);
			break;
		case 'r':
			css.width = '0px';
			css.left = jq.px(dims.left + dims.width);
			anima.width = jq.px0(dims.width);
			anima.left = jq.px(dims.left);
			break;
		}

		return _defAnimaOpts(this, wgt, opts, prop).jq.css(css).show().animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 400,
			complete: opts.afterAnima
		});
	},
	
	slideUp: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideUp'))
			return this;
		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'height', 'width', 'overflow', 'position'],
			anima = {},
			css = {overflow: 'hidden'},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			anima.height = 'hide';
			break;
		case 'b':
			css.height = jq.px0(dims.height);
			anima.height = 'hide';
			anima.top = jq.px(dims.top + dims.height);
			break;
		case 'l':
			anima.width = 'hide';
			break;
		case 'r':
			css.width = jq.px0(dims.width);
			anima.width = 'hide';
			anima.left = jq.px(dims.left + dims.width);
			break;
		}

		return _defAnimaOpts(this, wgt, opts, prop, 'hide').jq.css(css).animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 400,
			complete: opts.afterAnima
		});
	},
	
	slideOut: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideOut'))
			return this;
		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'position'],
			anima = {},
			css = {},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			anima.top = jq.px(dims.top - dims.height);
			break;
		case 'b':
			anima.top = jq.px(dims.top + dims.height);
			break;
		case 'l':
			anima.left = jq.px(dims.left - dims.width);
			break;
		case 'r':
			anima.left = jq.px(dims.left + dims.width);
			break;
		}

		return _defAnimaOpts(this, wgt, opts, prop, 'hide').jq.css(css).animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 500,
			complete: opts.afterAnima
		});
	},
	
	slideIn: function (wgt, opts) {
		if (_checkAnimated(this, wgt, opts, 'slideIn'))
			return this;
		var anchor = opts ? opts.anchor || 't': 't',
			prop = ['top', 'left', 'position'],
			anima = {},
			css = {},
			dims = this.dimension();

		opts = opts || {};
		_checkPosition(_saveProp(this, prop), css);

		switch (anchor) {
		case 't':
			css.top = jq.px(dims.top - dims.height);
			anima.top = jq.px(dims.top);
			break;
		case 'b':
			css.top = jq.px(dims.top + dims.height);
			anima.top = jq.px(dims.top);
			break;
		case 'l':
			css.left = jq.px(dims.left - dims.width);
			anima.left = jq.px(dims.left);
			break;
		case 'r':
			css.left = jq.px(dims.left + dims.width);
			anima.left = jq.px(dims.left);
			break;
		}

		return _defAnimaOpts(this, wgt, opts, prop).jq.css(css).show().animate(anima, {
			queue: false, easing: opts.easing, duration: opts.duration || 500,
			complete: opts.afterAnima
		});
	},
	_updateProp: function(prop) {
		_saveProp(this, prop);
	}
});
})();

(function () {
	var _drags = [],
		_dragging = {},
		_msdowning, 
		_stackup, _activedg, _timeout, _initPt, _dnEvt,
		_lastPt, _lastScrlPt;

	function _activate(dg, devt, pt) {
		_timeout = setTimeout(function () { 
			_timeout = null; 
			_activedg = dg; 
		}, dg.opts.delay);
		_initPt = pt;
	}
	function _deactivate() {
		_activedg = null;
		if (_dnEvt) setTimeout(function(){_dnEvt=null;}, 0);
	}

	function _docmousemove(devt) {
		if(!_activedg || _activedg.dead) return;

		var evt = jq.Event.zk(devt),
			pt = [evt.pageX, evt.pageY];
		
		
		if(_lastPt && _lastPt[0] == pt [0]
		&& _lastPt[1] == pt [1])
			return;

		_lastPt = pt;
		_activedg._updateDrag(pt, evt);
		devt.stop();
			
			
	}
	function _docmouseup(devt) {
		if(_timeout) { 
			clearTimeout(_timeout); 
			_timeout = null; 
		}
		if(!_activedg) return;

		_lastPt = null;
		var evt;
		_activedg._endDrag(evt = jq.Event.zk(devt));
		_activedg = null;
		if (evt.domStopped) devt.stop();
	}
	function _dockeypress(devt) {
		if(_activedg) _activedg._keypress(devt);
	}

	
	function _defStartEffect(dg) {
		var node = dg.node;
		node._$opacity = jq(node).css('opacity');
		_dragging[node] = true;
		new zk.eff.Opacity(node, {duration:0.2, from:node._$opacity, to:0.7}); 
	}
	function _defEndEffect(dg) {
		var node = dg.node,
			toOpacity = typeof node._$opacity == 'number' ? node._$opacity : 1.0;
		new zk.eff.Opacity(node, {duration:0.2, from:0.7,
			to:toOpacity, queue: {scope:'_draggable', position:'end'},
			afterFinish: function () { 
				delete _dragging[node];
			}
		});
	}
	function _defRevertEffect(dg, offset) {
		var dx, dy;
		if ((dx=offset[0]) || (dy=offset[1])) {
			var node = dg.node,
				orgpos = node.style.position,
				dur = Math.sqrt(Math.abs(dy^2)+Math.abs(dx^2))*0.02;
			new zk.eff.Move(node, { x: -dx, y: -dy,
				duration: dur, queue: {scope:'_draggable', position:'end'},
				afterFinish: function () {node.style.position = orgpos;}});
		}
	}


zk.Draggable = zk.$extends(zk.Object, {
	
	
	
	
	
	
	
	
	
	$init: function (control, node, opts) {
		if (!_stackup) {
		
			jq(_stackup = jq.newStackup(null, 'z_ddstkup')).hide();
			document.body.appendChild(_stackup);
		}

		this.control = control;
		this.node = node = node ? jq(node, zk)[0]: control.node || (control.$n ? control.$n() : null);
		if (!node)
			throw "Handle required for "+control;

		opts = zk.$default(opts, {

			scrollSensitivity: 20,
			scrollSpeed: 15,
			initSensitivity: 3,
			delay: 0,
			fireOnMove: true
		});

		if (opts.reverteffect == null)
			opts.reverteffect = _defRevertEffect;
		if (opts.endeffect == null) {
			opts.endeffect = _defEndEffect;
			if (opts.starteffect == null)
				opts.starteffect = _defStartEffect;
		}

		if(opts.handle) this.handle = jq(opts.handle, zk)[0];
		if(!this.handle) this.handle = node;

		if(opts.scroll && !opts.scroll.scrollTo && !opts.scroll.outerHTML) {
			opts.scroll = jq(opts.scroll, zk)[0];
			this._isScrollChild = zUtl.isAncestor(opts.scroll, node);
		}

		this.delta = this._currentDelta();
		this.opts = opts;
		this.dragging = false;   

		jq(this.handle).mousedown(this.proxy(this._mousedown));

		
		if(_drags.length == 0)
			jq(document).mouseup(_docmouseup)
				.mousemove(_docmousemove)
				.keypress(_dockeypress);
		_drags.push(this);
	},
	
	destroy: function () {
		jq(this.handle).unbind("mousedown", this.proxy(this._mousedown));

		
		_drags.$remove(this);
		if(_drags.length == 0)
			jq(document).unbind("mouseup", _docmouseup)
				.unbind("mousemove", _docmousemove)
				.unbind("keypress", _dockeypress);
		if (_activedg == this) 
			_activedg = null;

		this.node = this.control = this.handle = null;
		this.dead = true;
	},

	
	_currentDelta: function () {
		var $node = jq(this.node);
		return [zk.parseInt($node.css('left')), zk.parseInt($node.css('top'))];
	},

	_startDrag: function (evt) {
		zWatch.fire('onStartDrag', this, evt);

		
		zk(document.body).disableSelection(); 
		jq.clearSelection(); 
		if (this.opts.overlay) { 
			var stackup = document.createElement("div");
			document.body.appendChild(stackup);
			stackup.className = "z-dd-stackup";
			zk(stackup).disableSelection();
			var st = (this.stackup = stackup).style;
			st.width = jq.px0(jq.pageWidth());
			st.height = jq.px0(jq.pageHeight());
		}
		zk.dragging = this.dragging = true;

		var node = this.node,
			opt;
		if(opt = this.opts.ghosting)
			if (typeof opt == 'function') {
				this.delta = this._currentDelta();
				this.orgnode = this.node;

				var $node = zk(this.node),
					ofs = $node.cmOffset();
				this.z_scrl = $node.scrollOffset();
				this.z_scrl[0] -= jq.innerX(); this.z_scrl[1] -= jq.innerY();
					
				ofs[0] -= this.z_scrl[0]; ofs[1] -= this.z_scrl[1];

				node = this.node = opt(this, ofs, evt);
			} else {
				this._clone = jq(node).clone()[0];
				this.z_orgpos = node.style.position; 
				if (this.z_orgpos != 'absolute')
					jq(node).absolutize();
				node.parentNode.insertBefore(this._clone, node);
			}

		if (this.opts.stackup) {
			if (zk(_stackup).isVisible()) 
				this._stackup = jq.newStackup(node, node.id + '-ddstk');
			else {
				this._stackup = _stackup;
				this._syncStackup();
				node.parentNode.insertBefore(_stackup, node);
			}
		}

		this.orgZ = -1;
		if(opt = this.opts.zIndex) { 
			if (typeof opt == 'function')
				opt = opt(this);
			if (opt >= 0) {
				this.orgZ = zk.parseInt(jq(node).css('z-index'));
				node.style.zIndex = opt;
			}
		}

		if(this.opts.scroll) {
			if (this.opts.scroll == window) {
				var where = this._getWndScroll(this.opts.scroll);
				this.orgScrlLeft = where.left;
				this.orgScrlTop = where.top;
			} else {
				this.orgScrlLeft = this.opts.scroll.scrollLeft;
				this.orgScrlTop = this.opts.scroll.scrollTop;
			}
		}

		if(this.opts.starteffect)
			this.opts.starteffect(this, evt);
	},
	_syncStackup: function () {
		if (this._stackup) {
			var node = this.node,
				st = this._stackup.style;
			st.display = 'block';
			st.left = node.offsetLeft + "px";
			st.top = node.offsetTop + "px";
			st.width = node.offsetWidth + "px";
			st.height = node.offsetHeight + "px";
		}
	},

	_updateDrag: function (pt, evt) {
		if(!this.dragging) {
			var v = this.opts.initSensitivity;
			if (v && pt[0] <= _initPt[0] + v && pt[0] >= _initPt[0] - v
			&& pt[1] <= _initPt[1] + v && pt[1] >= _initPt[1] - v)
				return;
			this._startDrag(evt);
		}
		this._updateInnerOfs();

		this._draw(pt, evt);
		if (this.opts.change) this.opts.change(this, pt, evt);
		this._syncStackup();

		if(this.opts.scroll) {
			this._stopScrolling();

			var p;
			if (this.opts.scroll == window) {
				var o = this._getWndScroll(this.opts.scroll);
				p = [o.left, o.top, o.left + o.width, o.top + o.height];
			} else {
				p = zk(this.opts.scroll).viewportOffset();
				p[0] += this.opts.scroll.scrollLeft + this._innerOfs[0];
				p[1] += this.opts.scroll.scrollTop + this._innerOfs[1];
				p.push(p[0]+this.opts.scroll.offsetWidth);
				p.push(p[1]+this.opts.scroll.offsetHeight);
			}

			var speed = [0,0],
				v = this.opts.scrollSensitivity;
			if(pt[0] < (p[0]+v)) speed[0] = pt[0]-(p[0]+v);
			if(pt[1] < (p[1]+v)) speed[1] = pt[1]-(p[1]+v);
			if(pt[0] > (p[2]-v)) speed[0] = pt[0]-(p[2]-v);
			if(pt[1] > (p[3]-v)) speed[1] = pt[1]-(p[3]-v);
			this._startScrolling(speed);
		}

		
		if(navigator.appVersion.indexOf('AppleWebKit')>0) window.scrollBy(0,0);

		evt.stop();
	},

	_finishDrag: function (evt, success) {
		this.dragging = false;
		if (this.stackup) {
			jq(this.stackup).remove();
			delete this.stackup;
		}

		
		zk(document.body).enableSelection();
		setTimeout(jq.clearSelection, 0);

		var stackup = this._stackup;
		if (stackup) {
			if (stackup == _stackup) jq(stackup).hide();
			else jq(stackup).remove();
			delete this._stackup;
		}

		var node = this.node;
		if(this.opts.ghosting)
			if (typeof this.opts.ghosting == 'function') {
				if (this.opts.endghosting)
					this.opts.endghosting(this, this.orgnode);
				if (node != this.orgnode) {
					jq(node).remove();
					this.node = this.orgnode;
				}
				delete this.orgnode;
			} else {
				if (this.z_orgpos != "absolute") { 
					zk(this.node).relativize();
					node.style.position = this.z_orgpos;
				}
				jq(this._clone).remove();
				this._clone = null;
			}

		var pt = [evt.pageX, evt.pageY];
		var revert = this.opts.revert;
		if(revert && typeof revert == 'function')
			revert = revert(this, pt, evt);

		var d = this._currentDelta(),
			d2 = this.delta;
		if(revert && this.opts.reverteffect) {
			this.opts.reverteffect(this,
				[d[0]-this.delta[0], d[1]-this.delta[1]]);
		} else {
			this.delta = d;
		}

		if(this.orgZ != -1)
			node.style.zIndex = this.orgZ;

		if(this.opts.endeffect) 
			this.opts.endeffect(this, evt);

		var wgt = this.control;
		if (this.opts.fireOnMove && zk.Widget.isInstance(wgt)) {
			if (d[0] != d2[0] || d[1] != d2[1]) {
				wgt.fire('onMove', zk.copy({
					left: node.style.left,
					top: node.style.top
				}, evt.data), {ignorable: true});
			}
		}
		_deactivate(this);
		var self = this;
		setTimeout(function(){
			zk.dragging=false;
			zWatch.fire("onEndDrag", self, evt);
		}, 0);
			
	},

	_mousedown: function (devt) {
		var node = this.node,
			evt = jq.Event.zk(devt);
		if(_dragging[node] || evt.which != 1)
			return;

		var pt = [evt.pageX, evt.pageY];
		if (this.opts.ignoredrag && this.opts.ignoredrag(this, pt, evt)) {
			if (evt.domStopped) devt.stop();
			return;
		}

		if (zk.ie) { 
			if (_msdowning) return;
			_msdowning = true;
			setTimeout(function(){_msdowning = false;},0);
		}

		var pos = zk(node).cmOffset();
		this.offset = [pt[0] - pos[0], pt[1] - pos[1]];
		_activate(this, devt, pt);

		if ((zk.opera || zk.gecko) && !jq.nodeName(devt.target, "input")) {
			devt.stop();
			
			
			
			
			

			_dnEvt = jq.Event.zk(devt, this.control);
			
		}
	},
	_keypress: function (devt) {
		if(devt.keyCode == 27) {
			this._finishDrag(jq.Event.zk(devt), false);
			devt.stop();
		}
	},

	_endDrag: function (evt) {
		if(this.dragging) {
			this._stopScrolling();
			this._finishDrag(evt, true);
			evt.stop();
		} else
			_deactivate(this);
	},

	_draw: function (point, evt) {
		var node = this.node,
			$node = zk(node),
			pos = $node.cmOffset();
		if(this.opts.ghosting) {
			var r = $node.scrollOffset();
			pos[0] += r[0] - this._innerOfs[0]; pos[1] += r[1] - this._innerOfs[1];
		}

		var d = this._currentDelta();
		pos[0] -= d[0]; pos[1] -= d[1];

		if(this.opts.scroll && (this.opts.scroll != window && this._isScrollChild)) {
			pos[0] -= this.opts.scroll.scrollLeft-this.orgScrlLeft;
			pos[1] -= this.opts.scroll.scrollTop-this.orgScrlTop;
		}

		var p = [point[0]-pos[0]-this.offset[0],
			point[1]-pos[1]-this.offset[1]],
			snap = this.opts.snap;

		if(snap)
			if(typeof snap == 'function') {
				p = snap(this, p);
			} else {
				if(snap instanceof Array) {
					p = [Math.round(p[0]/snap[0])*snap[0],
						Math.round(p[1]/snap[1])*snap[1]];
				} else {
					p = [Math.round(p[0]/snap)*snap,
						Math.round(p[1]/snap)*snap];
				}
			}

		
		if (this.z_scrl) {
			p[0] -= this.z_scrl[0]; p[1] -= this.z_scrl[1];
		}

		var style = node.style;
		if (typeof this.opts.draw == 'function') {
			this.opts.draw(this, this.snap_(p), evt);
		} else if (typeof this.opts.constraint == 'function') {
			var np = this.opts.constraint(this, p, evt); 
			if (np) p = np;
			p = this.snap_(p);
			style.left = jq.px(p[0]);
			style.top  = jq.px(p[1]);
		} else {
			p = this.snap_(p);
			if((!this.opts.constraint) || (this.opts.constraint=='horizontal'))
				style.left = jq.px(p[0]);
			if((!this.opts.constraint) || (this.opts.constraint=='vertical'))
				style.top  = jq.px(p[1]);
		}

		if(style.visibility=="hidden") style.visibility = ""; 
	},

	_stopScrolling: function () {
		if(this.scrollInterval) {
			clearInterval(this.scrollInterval);
			this.scrollInterval = null;
			_lastScrlPt = null;
		}
	},
	_startScrolling: function (speed) {
		if(speed[0] || speed[1]) {
			this.scrollSpeed = [speed[0]*this.opts.scrollSpeed,speed[1]*this.opts.scrollSpeed];
			this.lastScrolled = new Date();
			this.scrollInterval = setInterval(this.proxy(this._scroll), 10);
		}
	},

	_scroll: function () {
		var current = new Date(),
			delta = current - this.lastScrolled;
		this.lastScrolled = current;
		if(this.opts.scroll == window) {
			if (this.scrollSpeed[0] || this.scrollSpeed[1]) {
				var o = this._getWndScroll(this.opts.scroll),
					d = delta / 1000;
				this.opts.scroll.scrollTo(o.left + d*this.scrollSpeed[0],
					o.top + d*this.scrollSpeed[1]);
			}
		} else {
			this.opts.scroll.scrollLeft += this.scrollSpeed[0] * delta / 1000;
			this.opts.scroll.scrollTop  += this.scrollSpeed[1] * delta / 1000;
		}

		this._updateInnerOfs();
		if (this._isScrollChild) {
			_lastScrlPt = _lastScrlPt || _lastPt;
			_lastScrlPt[0] += this.scrollSpeed[0] * delta / 1000;
			_lastScrlPt[1] += this.scrollSpeed[1] * delta / 1000;
			if (_lastScrlPt[0] < 0)
				_lastScrlPt[0] = 0;
			if (_lastScrlPt[1] < 0)
				_lastScrlPt[1] = 0;
			this._draw(_lastScrlPt);
		}

		if(this.opts.change) {
			var devt = window.event ? jq.event.fix(window.event): null,
				evt = devt ? jq.Event.zk(devt): null;
			this.opts.change(this,
				evt ? [evt.pageX, evt.pageY]: _lastPt, evt);
		}
	},

	_updateInnerOfs: function () {
		this._innerOfs = [jq.innerX(), jq.innerY()];
	},
	_getWndScroll: function (w) {
		var T, L, W, H,
			doc = w.document,
			de = doc.documentElement;
		if (de && de.scrollTop) {
			T = de.scrollTop;
			L = de.scrollLeft;
		} else if (w.document.body) {
			T = doc.body.scrollTop;
			L = doc.body.scrollLeft;
		}
		if (w.innerWidth) {
			W = w.innerWidth;
			H = w.innerHeight;
		} else if (de && de.clientWidth) {
			W = de.clientWidth;
			H = de.clientHeight;
		} else {
			W = doc.body.offsetWidth;
			H = doc.body.offsetHeight
		}
		return {top: T, left: L, width: W, height: H};
	},

	
	snap_: function (pos) {
		if (pos[1] < 0)
			pos[1] = 0;
		return pos;
	}

},{
	ignoreMouseUp: function () { 
		return zk.dragging ? true: _dnEvt;
	},
	ignoreClick: function () { 
		return zk.dragging;
	}
});
})();


(function() {

	var _defSKUOpts, _useSKU;
	function _getSKUOpts() {
		return _defSKUOpts
			|| (_defSKUOpts = {stackup: zk.eff.shallStackup()});
	}



zk.eff = {
	shallStackup: function () {
		return _useSKU;
	}
};

if (!zk.css3) {
	var _defShadowOpts = {left: 4, right: 4, top: 3, bottom: 3},
		_shadowEnding = zk.ie6_ ? '" class="z-shadow"></div>':
		'" class="z-shadow"><div class="z-shadow-tl"><div class="z-shadow-tr"></div></div>'
		+'<div class="z-shadow-cl"><div class="z-shadow-cr"><div class="z-shadow-cm">&#160;</div></div></div>'
		+'<div class="z-shadow-bl"><div class="z-shadow-br"></div></div></div>';

	
	zk.eff.Shadow = zk.$extends(zk.Object, {
		
		$init: function (element, opts) {
			opts = this.opts =
				zk.$default(zk.$default(opts, _defShadowOpts), _getSKUOpts());
			if (zk.ie6_) {
				opts.left -= 1;
				opts.right -= 8;
				opts.top -= 2;
				opts.bottom -= 6;
			}
	
			this.node = element;
			var sdwid = element.id + "-sdw";
			jq(element).before('<div id="' + sdwid + _shadowEnding);
			this.shadow = jq(sdwid, zk)[0];
		},
		
		destroy: function () {
			jq(this.shadow).remove();
			jq(this.stackup).remove();
			this.node = this.shadow = this.stackup = null;
		},
		
		hide: function(){
			jq(this.shadow).hide();
			jq(this.stackup).hide();
		},
		
		sync: function () {
			var node = this.node, $node = jq(node),
				shadow = this.shadow;
			if (!node || !$node.zk.isVisible(true)) {
				this.hide();
				return false;
			}
	
			for (var c = shadow;;) {
				if (!(c = c.nextSibling) || c.tagName) {
					if (c != node)
						node.parentNode.insertBefore(shadow, node);
					break;
				}
			}
	
			var opts = this.opts,
				l = node.offsetLeft, t = node.offsetTop,
				w = node.offsetWidth, h = node.offsetHeight,
				wd = Math.max(0, w - opts.left + opts.right),
				hgh = Math.max(0, h - opts.top + opts.bottom),
				st = shadow.style;
			st.left = jq.px(l + opts.left);
			st.top = jq.px(t + opts.top);
			st.width = jq.px0(wd);
			st.zIndex = zk.parseInt($node.css("zIndex"));
			st.display = "block";
			if (zk.ie6_) st.height = jq.px0(hgh);
			else {
				var cns = shadow.childNodes;
				cns[1].style.height = jq.px0(hgh - cns[0].offsetHeight - cns[2].offsetHeight);
			}
	
			var stackup = this.stackup;
			if(opts.stackup) {
				if(!stackup)
					stackup = this.stackup =
						jq.newStackup(node, node.id + '-sdwstk', shadow);
	
				st = stackup.style;
				st.left = jq.px(l);
				st.top = jq.px(t);
				st.width = jq.px0(w);
				st.height = jq.px0(h);
				st.zIndex = shadow.style.zIndex;
				st.display = "block";
			}
			return true;
		},
		
		getBottomElement: function () {
			return this.stackup || this.shadow;
		}
	});
} else {
	zk.eff.Shadow = zk.$extends(zk.Object, {
		$init: function (element, opts) {
			this.wgt = zk.Widget.$(element.id);
			this.opts = zk.$default(opts, _getSKUOpts());
			this.node = element;
		},
		destroy: function () {
			jq(this.stackup).remove();
			jq(this.node).removeClass(this.wgt.getZclass() + '-shadow');
			this.wgt = this.node = this.stackup = null;
		},
		hide: function(){
			jq(this.stackup).hide();
			jq(this.node).removeClass(this.wgt.getZclass() + '-shadow');
		},
		sync: function () {
			var node = this.node, $node = jq(node);
			if (!node || !$node.zk.isVisible(true)) {
				if (this.opts.stackup && node) {
					if (!this.stackup) 
						this.stackup = jq.newStackup(node, node.id + '-sdwstk', node);
				}
				this.hide();
				return false;
			}
			
			$node.addClass(this.wgt.getZclass() + '-shadow');
			
			var opts = this.opts,
				l = node.offsetLeft, t = node.offsetTop,
				w = node.offsetWidth, h = node.offsetHeight,
				stackup = this.stackup;
				
			if(opts.stackup) {
				if(!stackup)
					stackup = this.stackup =
						jq.newStackup(node, node.id + '-sdwstk', node);
	
				var st = stackup.style;
				st.left = jq.px(l);
				st.top = jq.px(t);
				st.width = jq.px0(w);
				st.height = jq.px0(h);
				st.zIndex = zk.parseInt($node.css("zIndex"));
				st.display = "block";
			}
			return true;
		},
		getBottomElement: function () {
			return this.stackup;
		}
	});
}

	
	
	function _syncPos() {
		var n = this.mask,
			ofs = zk(n).toStyleOffset(jq.innerX(), jq.innerY()),
			st = n.style;
		st.left = jq.px(ofs[0]);
		st.top = jq.px(ofs[1]);
		st.width = jq.px0(jq.innerWidth());
		st.height = jq.px0(jq.innerHeight());
		st.display = "block";

		if (n = this.stackup)
			zk.set(n.style, st, ["left", "top", "width", "height"]);
	}


zk.eff.FullMask = zk.$extends(zk.Object, {
	
	$init: function (opts) {
		opts = zk.$default(opts, _getSKUOpts());
		var mask = this.mask = jq(opts.mask||[], zk)[0];
		if (this.mask) {
			if (opts.anchor)
				opts.anchor.parentNode.insertBefore(mask, opts.anchor);
			if (opts.id) mask.id = opts.id;
			if (opts.zIndex != null) mask.style.zIndex = opts.zIndex;
			if (opts.visible == false) mask.style.display = 'none';
		} else {
			var maskId = opts.id || 'z_mask',
				html = '<div id="' + maskId + '" class="z-modal-mask"';
			if (opts.zIndex != null || opts.visible == false) {
				html += ' style="';
				if (opts.zIndex != null) html += 'z-index:' + opts.zIndex;
				if (opts.visible == false) html += ';display:none';
				html +='"';
			}

			html += '></div>'
			if (opts.anchor)
				jq(opts.anchor, zk).before(html);
			else
				jq(document.body).append(html);
			mask = this.mask = jq(maskId, zk)[0];
		}
		if (opts.stackup)
			this.stackup = jq.newStackup(mask, mask.id + '-mkstk');

		_syncPos.call(this);

		var f;
		jq(mask).click(jq.Event.stop); 
		jq(window).resize(f = this.proxy(_syncPos))
			.scroll(f);
	},
	
	destroy: function () {
		var mask = this.mask, f;
		jq(mask).unbind("click", jq.Event.stop)
			.remove()
		jq(window).unbind("resize", f = this.proxy(_syncPos))
			.unbind("scroll", f);
		jq(this.stackup).remove();
		this.mask = this.stackup = null;
	},
	
	hide: function () {
		this.mask.style.display = 'none';
		if (this.stackup) this.stackup.style.display = 'none';
	},
	
	sync: function (el) {
		if (!zk(el).isVisible(true)) {
			this.hide();
			return;
		}

		if (this.mask.nextSibling != el) {
			var p = el.parentNode;
			p.insertBefore(this.mask, el);
			if (this.stackup)
				p.insertBefore(this.stackup, this.mask);
		}

		var st = this.mask.style;
		st.display = 'block';
		st.zIndex = el.style.zIndex;
		if (this.stackup) {
			st = this.stackup.style;
			st.display = 'block';
			st.zIndex = el.style.zIndex;
		}
	}
});

 
zk.eff.Mask = zk.$extends(zk.Object, {
	
	$init: function(opts) {
		opts = opts || {};
		var $anchor = zk(opts.anchor);
		
		if (!$anchor.jq.length || !$anchor.isRealVisible(true)) return; 
		
		this._opts = opts;
		
		var maskId = opts.id || 'z_applymask',
			progbox = jq(maskId, zk)[0];
		
		if (progbox) return this;
		
		var msg = opts.message || ((window.msgzk?msgzk.LOADING:"Loading")+'...'),
			n = document.createElement("div");
		
		document.body.appendChild(n);
		var xy = opts.offset || $anchor.revisedOffset(), 
			w = opts.width || $anchor.offsetWidth(),
			h = opts.height || $anchor.offsetHeight();
		jq(n).replaceWith(
		'<div id="'+maskId+'" style="visibility:hidden">' 
		+ '<div class="z-apply-mask" style="display:block;top:' + xy[1]
		+ 'px;left:' + xy[0] + 'px;width:' + w + 'px;height:' + h + 'px;"></div>'
		+ '<div id="'+maskId+'-z_loading" class="z-apply-loading"><div class="z-apply-loading-indicator">'
		+ '<span class="z-apply-loading-icon"></span> '
		+ msg+ '</div></div></div>');
		
		this.mask = jq(maskId, zk)[0];
		this.wgt = zk.Widget.$(opts.anchor);
		if (this.wgt) {
			zWatch.listen( {
				onShow: [
					this.wgt, this.onShow
				],
				onHide: [
					this.wgt, this.onHide
				],
				onSize: [
					this.wgt, this.onSize
				]
			});
			this.wgt.__mask = this;
		}
		
		this.sync();
	},
	
	hide: function () {
		this.mask.style.display = 'none';
	},
	onHide: function () {
		this.__mask.hide();
	}, 
	
	sync: function () {
		var $anchor = zk(this._opts.anchor);
		
		if (!$anchor.isVisible(true)) {
			this.hide();
			return;
		}
		
		var opts = this._opts,
			st = this.mask.firstChild.style,
			xy = opts.offset || $anchor.revisedOffset(), 
			w = opts.width || $anchor.offsetWidth(),
			h = opts.height || $anchor.offsetHeight();

		st.top = jq.px(xy[1]);
		st.left = jq.px(xy[0]);
		st.width = jq.px(w);
		st.height = jq.px(h);
		
		var zi = $anchor.jq.offsetParent().css('z-index');
		
		if (zk.ie && !zk.ie8)
			zi = zi == 0 ? 1 : zi;
			
		st.zIndex = zi;
		this.mask.lastChild.style.zIndex = zi;
		
		this.mask.style.display = 'block';
		
		var loading = jq(this.mask.id+"-z_loading", zk)[0];
		if (loading) {
			if (loading.offsetHeight > h) 
				loading.style.height = jq.px0(zk(loading).revisedHeight(h));
			if (loading.offsetWidth > w)
				loading.style.width = jq.px0(zk(loading).revisedWidth(w));
			loading.style.top = jq.px0(xy[1] + ((h - loading.offsetHeight) /2)); 
			loading.style.left = jq.px0(xy[0] + ((w - loading.offsetWidth) /2));
		}
		
		this.mask.style.visibility = "";
	},
	onSize: _zkf = function () {
		this.__mask.sync();
	},
	onShow: _zkf,
	
	destroy: function () {
		jq(this.mask).remove();
		if (this.wgt) {
			zWatch.unlisten({onShow: [this.wgt, this.onShow],
			      			 onHide: [this.wgt, this.onHide],
			      			onSize: [this.wgt, this.onSize]});
			delete this.wgt.__mask;
		}
		this.mask = this.wgt = null;
	}
});

jq(function() {
	
	var _lastFloat, _autohideCnt = 0, _callback;

	function _onFloatUp(ctl) {
		var wgt = ctl.origin;
		++_autohideCnt;
		setTimeout(function () {
			if (!--_autohideCnt) {
				if (wgt) wgt = wgt.getTopWidget();
				if (wgt != _lastFloat) {
					_lastFloat = wgt
					zk.Widget._autohide();
				}
			}
		}, 120); 
	}
	function _autohide() {
		_lastFloat = false; 
		++_autohideCnt;
		setTimeout(function () {
			if (!--_autohideCnt)
				zk.Widget._autohide();
		}, 100); 
	}

	_useSKU = zk.useStackup;
	if (_useSKU == "auto" || (_callback = _useSKU == "auto/gecko")) {
		if (zk.gecko && _callback)
			_useSKU = false;
		else {
			_callback = zk.safari || zk.opera;
			_useSKU = !_callback || zk.ie6_;
		}
	} else if (_useSKU == null)
		_useSKU = zk.ie6_;

	if (_callback) {
		var w2hide = function (name) {
			if (name == 'onSize' || name == 'onMove'
			|| name == 'onShow' || name == 'onHide'
			|| name == 'onResponse')
				_autohide();
		};
		zk.override(zWatch, _callback = {}, {
			fire: function (name) {
				_callback.fire.apply(this, arguments);
				w2hide(name);
			},
			fireDown: function (name) {
				_callback.fireDown.apply(this, arguments);
				w2hide(name);
			}
		});
		zWatch.listen({onFloatUp: _onFloatUp});
	}
}); 

})();



zk.BigDecimal = zk.$extends(zk.Object, {
	_precision: 0,
	$define: {
		
		
		precision: null
	},
	
	$init: function (value) {
		value = value ? '' + value: '0';
		var jdot = -1;
		for (var j = 0, len = value.length; j < len; ++j) {
			var cc = value.charAt(j);
			if ((cc < '0' || cc > '9') && cc != '-' && cc != '+')
				if (jdot < 0 && cc == '.') {
					jdot = j;
				} else {
					value = value.substring(0, j);
					break;
				}
		}
		if (jdot >= 0) {
			value = value.substring(0, jdot) + value.substring(jdot + 1);
			this._precision = value.length - jdot;
			this._dot = true;
		}
		this._value = value;
	},
	
	$toString: function() { 
		if (this._value.length == 0) return ''; 
		var j = this._value.length - this._precision,
			valFixed = '';
		if (j < 0)
			for(var len = -j; len-- > 0;)
				valFixed += '0';
		return this._value.substring(0, j) + (this._dot || this._precision ? '.' + valFixed + this._value.substring(j) : '');
	},
	
	$toLocaleString: function() { 
		if (this._value.length == 0) return ''; 
		var j = this._value.length - this._precision;
		if (j <= 0) {
			var valFixed = '';
			for(var len = -j; len-- > 0;)
				valFixed += '0';
			return '0' + (this._precision ? zk.DECIMAL + valFixed + this._value : '');
		}
		return this._value.substring(0, j) + (this._precision ? zk.DECIMAL + this._value.substring(j) : '');
	}
});


zk.Long = zk.$extends(zk.Object, {
	
	$init: function (value) {
	
	
	
		value = value ? '' + value: '0';
		for (var j = 0, len = value.length; j < len; ++j) {
			var cc = value.charAt(j);
			if ((cc < '0' || cc > '9') && cc != '-' && cc != '+') {
				value = value.substring(0, j);
				break;
			}
		}
		this._value = value;
	},
	
	$toString: zkf = function() { 
		return this._value;
	},
	
	$toLocaleString: zkf
});


(function () {
	var _decs = {lt: '<', gt: '>', amp: '&', quot: '"'},
		_encs = {};
	for (var v in _decs)
		_encs[_decs[v]] = v;

	function _pathname(url) {
		var j = url.indexOf("//");
		if (j > 0) {
			j = url.indexOf("/", j + 2);
			if (j > 0) return url.substring(j);
		}
	}


zUtl = { 
	
    
	isChar: function (cc, opts) {
		return (opts.digit && cc >= '0' && cc <= '9')
			|| (opts.upper && cc >= 'A' && cc <= 'Z')
			|| (opts.lower && cc >= 'a' && cc <= 'z')
			|| (opts.whitespace && (cc == ' ' || cc == '\t' || cc == '\n' || cc == '\r'))
			|| opts[cc];
	},

	
	
	parseMap: function (text, separator, quote) {
		var map = {};
		if (text) {
			var ps = text.split(separator || ',');
			if (quote) {
				var tmp = [],
					re = new RegExp(quote, 'g'),
					key = '', t, pair;
				while((t = ps.shift()) !== undefined) {
					if ((pair = (key += t).match(re)) && pair.length != 1) {
						if (key)
							tmp.push(key);
						key = '';
					} else
						key += separator;
				}
				ps = tmp;
			}
			for (var len = ps.length; len--;) {
				var key = ps[len].trim(),
					index = key.indexOf('=');
				if (index != -1)
					map[key.substring(0, index)] = key.substring(index + 1, key.length).trim();
			}
		}
		return map;
	},

	
	encodeXML: function (txt, opts) {
		var out = "";
		txt = txt != null ? String(txt):'';
		var k = 0, tl = txt.length,
			pre = opts && opts.pre,
			multiline = pre || (opts && opts.multiline),
			maxlength = opts ? opts.maxlength : 0;

		if (!multiline && maxlength && tl > maxlength) {
			var j = maxlength;
			while (j > 0 && txt.charAt(j - 1) == ' ')
				--j;
			return txt.substring(0, j) + '...';
		}

		for (var j = 0; j < tl; ++j) {
			var cc = txt.charAt(j);
			if (cc == '\n') {
				if (multiline) {
					out += txt.substring(k, j) + "<br/>\n";
					k = j + 1;
				}
			} else if (cc == ' ' || cc == '\t') {
				if (pre) {
					out += txt.substring(k, j) + '&nbsp;';
					if (cc == '\t') out += '&nbsp;&nbsp;&nbsp;';
					k = j + 1;
				}
			} else {
				var enc = _encs[cc];
				if (enc) {
					out += txt.substring(k, j) + '&' + enc + ';';
					k = j + 1;
				}
			}
		}
		return !k ? txt:
			k < tl ? out + txt.substring(k): out;
	},
	
	decodeXML: function (txt) {
		var out = "";
		if (!txt) return out;

		var k = 0, tl = txt.length;
		for (var j = 0; j < tl; ++j) {
			var cc = txt.charAt(j);
			if (cc == '&') {
				var l = txt.indexOf(';', j + 1);
				if (l >= 0) {
					var dec = txt.charAt(j + 1) == '#' ?
						String.fromCharCode(txt.charAt(j + 2).toLowerCase() == 'x' ?
							parseInt(txt.substring(j + 3, l), 16):
							parseInt(txt.substring(j + 2, l), 10)):
						_decs[txt.substring(j + 1, l)];
					if (dec) {
						out += txt.substring(k, j) + dec;
						k = (j = l) + 1;
					}
				}
			}
		}
		return !k ? txt:
			k < tl ? out + txt.substring(k): out;
	},

	
 	cellps0: ' cellpadding="0" cellspacing="0" border="0"',
 	
 	img0: '<img style="height:0;width:0"/>',
 	
 	i0: '<i style="height:0;width:0"/>',
 
 	
	now: function () {
		return new Date().getTime();
	},
	
	today: function (full) {
		var d = new Date();
		return full ? d
			: new Date(d.getFullYear(), d.getMonth(), d.getDate());
	},

	
	isAncestor: function (p, c) {
		if (!p) return true;
		for (; c; c = c.getParent ? c.getParent(): c.parent)
			if (p == c)
				return true;
		return false;
	},

	
	
	progressbox: function (id, msg, mask, icon, _opts) {
		if (mask && zk.Page.contained.length) {
			for (var c = zk.Page.contained.length, e = zk.Page.contained[--c]; e; e = zk.Page.contained[--c]) {
				if (!e._applyMask)
					e._applyMask = new zk.eff.Mask({
						id: e.uuid + "-mask",
						message: msg,
						anchor: e.$n()
					});
			}
			return;
		}

		if (_opts && _opts.busy) {
			zk.busy++;
			jq.focusOut(); 
		}

		var x = jq.innerX(), y = jq.innerY(),
			style = ' style="left:'+x+'px;top:'+y+'px"',
			idtxt = id + '-t',
			idmsk = id + '-m',
			html = '<div id="'+id+'"';
		if (mask)
			html += '><div id="' + idmsk + '" class="z-modal-mask"'+style+'></div';
		html += '><div id="'+idtxt+'" class="z-loading"'+style
			+'><div class="z-loading-indicator"><span class="z-loading-icon"></span> '
			+msg+'</div></div>';
		if (icon)
			html += '<div class="' + icon + '"></div>';
		jq(document.body).append(html + '</div>');

		var $n = jq(id, zk),
			n = $n[0],
			$txt = jq(idtxt, zk),
			txt = $txt[0],
			st = txt.style;
		if (mask)
			n.z_mask = new zk.eff.FullMask({
				mask: jq(idmsk, zk)[0],
				zIndex: $txt.css('z-index') - 1
			});

		if (mask && $txt.length) { 
			st.left = jq.px((jq.innerWidth() - txt.offsetWidth) / 2 + x);
			st.top = jq.px((jq.innerHeight() - txt.offsetHeight) / 2 + y);
		} else {
			var pos = zk.progPos;
			if (pos) {
				var left,
					top,
					width = jq.innerWidth(),
					height = jq.innerHeight(),
					wdgap = width - zk(txt).offsetWidth(),
					hghgap = height - zk(txt).offsetHeight();

				if (pos.indexOf("mouse") >= 0) {
					var offset = zk.currentPointer;
					left = offset[0] + 10;
					top = offset[1] + 10;
				} else {
					if (pos.indexOf("left") >= 0) left = x;
					else if (pos.indexOf("right") >= 0)	left = x + wdgap -1;
					else if (pos.indexOf("center") >= 0) left = x + wdgap / 2;
					else left = 0;
					
					if (pos.indexOf("top") >= 0) top = y;
					else if (pos.indexOf("bottom") >= 0) top = y + hghgap - 1;
					else if (pos.indexOf("center") >= 0) top = y + hghgap / 2;
					else top = 0;
					
					left = left < x ? x : left;
					top = top < y ? y : top;
				}
				st.left = jq.px(left);
				st.top = jq.px(top);
			}
		}

		$n.zk.cleanVisibility();
	},
	
	destroyProgressbox: function (id, _opts) {
		if (_opts && _opts.busy && --zk.busy < 0)
			zk.busy = 0;
		var $n = jq(id, zk), n;
		if ($n.length) {
			if (n = $n[0].z_mask) n.destroy();
			$n.remove();
		}

		for (var c = zk.Page.contained.length, e = zk.Page.contained[--c]; e; e = zk.Page.contained[--c])
			if (e._applyMask) {
				e._applyMask.destroy();
				e._applyMask = null;
			}
	},

	
	
	go: function (url, opts) {
		opts = opts || {};
		if (opts.target) {
			open(url, opts.target);
		} else if (opts.overwrite) {
			location.replace(url ? url: location.href);
		} else {
			if (url) {
				location.href = url;

				if (!opts.reload)
					return;

				var j = url.indexOf('#'),
					un = j >= 0 ? url.substring(0, j): url,
					pn = _pathname(location.href);
				j = pn.indexOf('#');
				if (j >= 0) pn = pn.substring(0, j);
				if (pn != un)
					return;
				
			}
			location.reload();
		}
	},

	
	intsToString: function (ary) {
		if (!ary) return "";

		var sb = [];
		for (var j = 0, k = ary.length; j < k; ++j)
			sb.push(ary[j]);
		return sb.join();
	},
	
	stringToInts: function (text, defaultValue) {
		if (text == null)
			return null;

		var list = [];
		for (var j = 0;;) {
			var k = text.indexOf(',', j),
				s = (k >= 0 ? text.substring(j, k): text.substring(j)).trim();
			if (s.length == 0) {
				if (k < 0) break;
				list.push(defaultValue);
			} else
				list.push(zk.parseInt(s));

			if (k < 0) break;
			j = k + 1;
		}
		return list;
	},
	
	mapToString: function (map, assign, separator) {
		assign = assign || '=';
		separator = separator || ' ';
		var out = [];
		for (var v in map)
			out.push(separator, v, assign, map[v]);
		out[0] = '';
		return out.join('');
	},
	
	
	appendAttr: function (nm, val, force)  {
		return val || force ? ' ' + nm + '="' + val + '"': "";
	}
};

zk._t0 = zk._t1 = zUtl.now(); 
})();



zk.Event = zk.$extends(zk.Object, {
	
	
	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	

	
	$init: function (target, name, data, opts, domEvent) {
		this.currentTarget = this.target = target;
		this.name = name;
		this.data = data;
		if (data && typeof data == 'object' && !jq.isArray(data))
			zk.$default(this, data);

		this.opts = opts||{rtags:{}};
		if (this.domEvent = domEvent)
			this.domTarget = domEvent.target;
	},
	
	addOptions: function (opts) {
		this.opts = zk.copy(this.opts, opts);
	},
	
	stop: function (opts) {
		var b = !opts || !opts.revoke;
		if (!opts || opts.propagation) this.stopped = b;
		if (!opts || opts.dom) this.domStopped = b;
		if (opts && opts.au) this.auStopped = b;
	}
});

zWatch = (function () {
	var _visiEvts = {onSize: true, onShow: true, onHide: true, beforeSize: true},
		_watches = {}, 
		_dirty,
		_Gun = zk.$extends(zk.Object, {
			$init: function (name, xinfs, args, org) {
				this.name = name;
				this.xinfs = xinfs;
				this.args = args;
				this.origin = org;
			},
			fire: function (ref) {
				var infs, inf, xinf,
					name = this.name,
					xinfs = this.xinfs,
					args = this.args;
				if (ref) {
					for (var j = 0, l = xinfs.length; j < l; ++j)
						if (xinfs[j][0] == ref) {
							infs = xinfs[j][1]
							xinfs.splice(j, 1);
							_invoke(name, infs, ref, args);
						}
				} else
					while (xinf = xinfs.shift())
						_invoke(name, xinf[1], xinf[0], args);
			},
			fireDown: function (ref) {
				if (!ref || ref.bindLevel == null)
					this.fire(ref);

				(new _Gun(this.name, _visiChildSubset(this.name, this.xinfs, ref, true), this.args, this.origin))
				.fire();
			}
		});

	function _invoke(name, infs, o, args) {
		for (var j = 0, l = infs.length; j < l;)
			_fn(infs[j++], o, name).apply(o, args);
	}
	
	function _visible(name, c) {
		return c.isWatchable_ && c.isWatchable_(name); 
	}
	
	function _visibleChild(name, p, c) {
		if (_visible(name, c))
			for (; c; c = c.parent)
				if (p == c) return true;
		return false;
	}
	
	function _visiChildSubset(name, xinfs, p, remove) {
		var found = [], bindLevel = p.bindLevel;
		for (var j = xinfs.length; j--;) { 
			var xinf = xinfs[j],
				o = xinf[0],
				diff = bindLevel > o.bindLevel;
			if (diff) break;
			if ((p == o && _visible(name, o)) || _visibleChild(name, p, o)) {
				if (remove)
					xinfs.splice(j, 1);
				found.unshift(xinf); 
			}
		}
		return found;
	}
	function _visiSubset(name, xinfs) {
		xinfs = xinfs.$clone(); 
		if (_visiEvts[name])
			for (var j = xinfs.length; j--;)
				if (!_visible(name, xinfs[j][0]))
					xinfs.splice(j, 1);
		return xinfs;
	}
	function _target(inf) {
		return jq.isArray(inf) ? inf[0]: inf;
	}
	function _fn(inf, o, name) {
		var fn = jq.isArray(inf) ? inf[1]: o[name];
		if (!fn)
			throw (o.className || o) + ':' + name + " not found";
		return fn;
	}
	function _sync() {
		if (!_dirty) return;

		_dirty = false;
		for (var nm in _watches) {
			var wts = _watches[nm];
			if (wts.length && wts[0][0].bindLevel != null)
				wts.sort(_cmpLevel);
		}
	}
	function _cmpLevel(a, b) {
		return a[0].bindLevel - b[0].bindLevel;
	}
	function _zsync(name, org) {
		if (name == 'onSize' || name == 'onShow' || name == 'onHide')
			jq.zsync(org);
	}
	function _fire(name, org, opts, vararg) {
		var wts = _watches[name];
		if (wts && wts.length) {
			var down = opts && opts.down && org.bindLevel != null;
			if (down) _sync();

			var args = [],
				gun = new _Gun(name,
					down ? _visiChildSubset(name, wts, org): _visiSubset(name, wts),
					args, org);
			args.push(gun);
			for (var j = 2, l = vararg.length; j < l;) 
				args.push(vararg[j++]);

			if (opts && opts.timeout >= 0)
				setTimeout(function () {gun.fire();_zsync(name, org);}, opts.timeout);
			else {
				gun.fire();
				_zsync(name, org);
			}
		} else
			_zsync(name, org);
	}


  return {
  	
	listen: function (infs) {
		for (var name in infs) {
			var wts = _watches[name],
				inf = infs[name],
				o = _target(inf),
				xinf = [o, [inf]];
			if (wts) {
				var bindLevel = o.bindLevel;
				if (bindLevel != null)
					for (var j = wts.length;;) {
						if (--j < 0) {
							wts.unshift(xinf);
							break;
						}
						if (wts[j][0] == o) {
							wts[j][1].push(inf);
							break;
						}
						if (bindLevel >= wts[j][0].bindLevel) { 
							wts.splice(j + 1, 0, xinf);
							break;
						}
					}
				else
					for (var j = wts.length;;) {
						if (--j < 0) {
							wts.push(xinf);
							break;
						}
						if (wts[j][0] == o) {
							wts[j][1].push(inf);
							break;
						}
					}
			} else
				_watches[name] = [xinf];
		}
	},
	
	unlisten: function (infs) {
		for (var name in infs) {
			var wts = _watches[name];
			if (wts) {
				var inf = infs[name],
					o = _target(inf);
				for (var j = wts.length; j--;)
					if (wts[j][0] == o) {
						wts[j][1].$remove(inf);
						if (!wts[j][1].length)
							wts.splice(j, 1);
						break;
					}
			}
		}
	},
	
	unlistenAll: function (name) {
		delete _watches[name];
	},
	
	fire: function (name, org, opts) {
		_fire(name, org, opts, arguments);
	},
	
	fireDown: function (name, org, opts) {
		_fire(name, org, zk.copy(opts,{down:true}), arguments);
	},
	onBindLevelMove: function () { 
		_dirty = true;
	}
  };
})();
zWatch.listen({onBindLevelMove: zWatch});


(function () {
	var _binds = {}, 
		_globals = {}, 
		_floatings = [], 
		_nextUuid = 0,
		_domevtfnm = {}, 
		_domevtnm = {onDoubleClick: 'dblclick'}, 
		_wgtcls = {}, 
		_hidden = [], 
		_noChildCallback, _noParentCallback, 
		_syncdt = zUtl.now() + 60000; 

	
	function _isProlog(el) {
		var txt;
		return el && el.nodeType == 3 
			&& (txt=el.nodeValue) && !txt.trim().length;
	}

	
	function _domEvtInf(wgt, evtnm, fn) { 
		if (typeof fn != "function") {
			if (!fn && !(fn = _domevtfnm[evtnm]))
				_domevtfnm[evtnm] = fn = '_do' + evtnm.substring(2);

			var f = wgt[fn];
			if (!f)
				throw 'Listener ' + fn + ' not found in ' + wgt.className;
			fn = f;
		}

		var domn = _domevtnm[evtnm];
		if (!domn)
			domn = _domevtnm[evtnm] = evtnm.substring(2).toLowerCase();
		return [domn, _domEvtProxy(wgt, fn)];
	}
	function _domEvtProxy(wgt, f) {
		var fps = wgt._$evproxs, fp;
		if (!fps) wgt._$evproxs = fps = {};
		else if (fp = fps[f]) return fp;
		return fps[f] = _domEvtProxy0(wgt, f);
	}
	function _domEvtProxy0(wgt, f) {
		return function (devt) {
			var args = [], evt;
			for (var j = arguments.length; --j > 0;)
				args.unshift(arguments[j]);
			args.unshift(evt = jq.Event.zk(devt, wgt));

			switch (devt.type){
			case 'focus':
				if (wgt.canActivate()) {
					zk.currentFocus = wgt;
					zWatch.fire('onFloatUp', wgt); 
					break;
				}
				return; 
			case 'blur':
				
				
				if (!zk._cfByMD) zk.currentFocus = null;
				break;
			case 'click':
			case 'dblclick':
			case 'mouseup': 
				if (zk.Draggable.ignoreClick())
					return;
			}

			var ret = f.apply(wgt, args);
			if (ret === undefined) ret = evt.returnValue;
			if (evt.domStopped) devt.stop();
			return devt.type == 'dblclick' && ret === undefined ? false: ret;
		};
	}

	function _unlink(wgt, child) {
		var p = child.previousSibling, n = child.nextSibling;
		if (p) p.nextSibling = n;
		else wgt.firstChild = n;
		if (n) n.previousSibling = p;
		else wgt.lastChild = p;
		child.nextSibling = child.previousSibling = child.parent = null;

		--wgt.nChildren;
	}
	function _bind0(wgt) {
		_binds[wgt.uuid] = wgt;
		if (wgt.id)
			_addGlobal(wgt);
	}
	function _unbind0(wgt) {
		if (wgt.id)
			_rmGlobal(wgt);
		delete _binds[wgt.uuid];
		wgt.desktop = null;
		wgt.clearCache();
	}
	function _bindrod(wgt) {
		_bind0(wgt);
		if (!wgt.z_rod)
			wgt.z_rod = 9; 

		for (var child = wgt.firstChild; child; child = child.nextSibling)
			_bindrod(child);
	}
	function _unbindrod(wgt, nest) {
		_unbind0(wgt);

		if (!nest || wgt.z_rod === 9) { 
			delete wgt.z_rod;

			for (var child = wgt.firstChild; child; child = child.nextSibling)
				_unbindrod(child, true);
		}
	}

	function _fixBindLevel(wgt, v) {
		wgt.bindLevel = v++;
		for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
			_fixBindLevel(wgt, v);
	}

	function _addIdSpace(wgt) {
		if (wgt._fellows) wgt._fellows[wgt.id] = wgt;
		var p = wgt.parent;
		if (p) {
			p = p.$o();
			if (p) p._fellows[wgt.id] = wgt;
		}
	}
	function _rmIdSpace(wgt) {
		if (wgt._fellows) delete wgt._fellows[wgt.id];
		var p = wgt.parent;
		if (p) {
			p = p.$o();
			if (p) delete p._fellows[wgt.id];
		}
	}
	function _addIdSpaceDown(wgt) {
		var ow = wgt.parent;
		ow = ow ? ow.$o(): null;
		if (ow)
			_addIdSpaceDown0(wgt, ow);
	}
	function _addIdSpaceDown0(wgt, owner) {
		if (wgt.id) owner._fellows[wgt.id] = wgt;
		if (!wgt._fellows)
			for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
				_addIdSpaceDown0(wgt, owner);
	}
	function _rmIdSpaceDown(wgt) {
		var ow = wgt.parent;
		ow = ow ? ow.$o(): null;
		if (ow)
			_rmIdSpaceDown0(wgt, ow);
	}
	function _rmIdSpaceDown0(wgt, owner) {
		if (wgt.id)
			delete owner._fellows[wgt.id];
		if (!wgt._fellows)
			for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
				_rmIdSpaceDown0(wgt, owner);
	}
	
	function _addGlobal(wgt) {
		var gs = _globals[wgt.id];
		if (gs)
			gs.push(wgt);
		else
			_globals[wgt.id] = [wgt];
	}
	function _rmGlobal(wgt) {
		var gs = _globals[wgt.id];
		if (gs) {
			gs.$remove(wgt);
			if (!gs.length) delete _globals[wgt.id];
		}
	}
	function _fireClick(wgt, evt) {
		if (!wgt.shallIgnoreClick_(evt) && 
			!wgt.fireX(evt).stopped && evt.shallStop) {
			evt.stop();
			return false;	
		}
		return !evt.stopped;
	}

	
	
	function _dragCtl(wgt, invoke) {
		var p;
		return wgt && (p = wgt.parent) && p.dragControl && (!invoke || p.dragControl(wgt));
	}

	
	function _fixMinFlex(wgtn, o) {
		this.beforeMinFlex_(o);
		
		if (o == 'h') {
			if (this._vflexsz === undefined) { 
				this.setFlexSize_({height:'auto'});
				var cwgt = this.firstChild, 
					cwgtn = cwgt && cwgt.$n(),
					n = cwgtn ? cwgtn.parentNode : wgtn,
					c = n.firstChild,
					zkn = zk(n),
					ntop = n.offsetTop,
					noffParent = n.offsetParent,
					tp = zkn.sumStyles("t", jq.paddings), 
					tbp = tp + zkn.sumStyles("t", jq.borders),
					max = 0,
					vmax = 0,
					totalsz = 0;
				if (cwgt){ 
					for (; cwgt; cwgt = cwgt.nextSibling) {
						c = cwgt.$n();
						if (c) { 
							
							var zkc = zk(c),
								sameOffParent = c.offsetParent == noffParent,
								sz = 0;
							if (!cwgt.ignoreFlexSize_('h')) {
								sz = c.offsetTop - (sameOffParent ? ntop + tbp : tp); 
								if (cwgt._vflex == 'min') {
									if (zkc.isVisible()) {
										sz += cwgt._vflexsz === undefined ? _fixMinFlex.apply(cwgt, [c, o]) : cwgt._vflexsz;
										var tm = zkc.sumStyles("t", jq.margins);
										if (!zk.safari || tm >= 0)
											sz -= tm;
									} else
										sz += cwgt._vflexsz === undefined ? 0 : cwgt._vflexsz;
								} else {
									sz += c.offsetHeight;
									var bm = zkc.sumStyles("b", jq.margins);
									if (!zk.safari || bm >= 0)
										sz += bm;
								}
							}
							
							if (cwgt._maxFlexHeight && sz > vmax) 
								vmax = sz;
							else if (cwgt._sumFlexHeight) 
								totalsz += sz;
							else if (sz > max)
								max = sz;
						}
					}
				} else if (c) { 
					
					var ignore = this.ignoreChildNodeOffset_('h');
					for(; c; c = c.nextSibling) {
						var zkc = zk(c),
							sz = 0;
						if (ignore) {
							var el = c.firstChild,
								txt = el && el.nodeType == 3 ? el.nodeValue : null;
							if (txt) {
								var dim = zkc.textSize(txt);
								sz = dim[1]; 
								if (sz > max)
									max = sz;
							}
						} else {
							var sameOffParent = c.offsetParent == noffParent;
							sz = c.offsetHeight + c.offsetTop - (sameOffParent ? ntop + tbp : tp);
						}
						var bm = zkc.sumStyles(ignore ? "tb" : "b", jq.margins);
						
						if (!zk.safari || bm >= 0)
							sz += bm;
						if (sz > max)
							max = sz;
					}
				} else 
					max = n.offsetHeight - zkn.padBorderHeight();  

				if (vmax)
					totalsz += vmax;
				if (totalsz > max)
					max = totalsz;

				
				var pb = 0,
					precalc = false;
				while (n && n != wgtn) {
					if (!precalc)
						pb += zkn.padBorderHeight();
					else {
						pb += zkn.sumStyles("b", jq.paddings);
						pb += zkn.sumStyles("b", jq.borders);
					}
					var p = n.parentNode,
						ptop = p ? p.offsetTop : 0,
						poffParent = p ? p.offsetParent : null;
					precalc = n.offsetParent == poffParent; 
					pb += n.offsetTop;
					if (precalc)
						pb -= ptop;
					var bm = zkn.sumStyles("b", jq.margins);
					if (!zk.safari || bm >=0)
						pb += bm;
					n = p;
					zkn = zk(n);
				}
				if (!precalc)
					pb += zkn.padBorderHeight();
				else {
					pb += zkn.sumStyles("b", jq.paddings);
					pb += zkn.sumStyles("b", jq.borders);
				}
				var margin = zk(wgtn).sumStyles("tb", jq.margins);
				if (zk.safari && margin < 0) 
					margin = 0;
				sz = this.setFlexSize_({height:(max + pb + margin)});
				if (sz && sz.height >= 0)
					this._vflexsz = sz.height + margin;
				this.afterChildrenMinFlex_('h');
			}
			return this._vflexsz;
			
		} else if (o == 'w') {
			if (this._hflexsz === undefined) { 
				this.setFlexSize_({width:'auto'});
				var cwgt = this.firstChild, 
					cwgtn = cwgt && cwgt.$n(),
					n = cwgtn ? cwgtn.parentNode : wgtn,
					c = n.firstChild,
					zkn = zk(n),
					nleft = n.offsetLeft,
					noffParent = n.offsetParent,
					lp = zkn.sumStyles("l", jq.paddings), 
					lbp = lp + zkn.sumStyles("l", jq.borders), 
					max = 0,
					totalsz = 0;
				if (cwgt) { 
					for (; cwgt; cwgt = cwgt.nextSibling) {
						c = cwgt.$n();
						if (c) { 
							
							var zkc = zk(c),
								sameOffParent = c.offsetParent == noffParent,
								sz = 0;
							if (!cwgt.ignoreFlexSize_('w')) {
								sz = c.offsetLeft - (sameOffParent ?  nleft + lbp: lp);
								if (cwgt._hflex == 'min') {
									if (zkc.isVisible()) {
										sz += cwgt._hflexsz === undefined ? _fixMinFlex.apply(cwgt, [c, o]) : cwgt._hflexsz;
										var lm = zkc.sumStyles("l", jq.margins);
										if (!zk.safari || lm >= 0)
											sz -= lm;
									} else
										sz += cwgt._hflexsz === undefined ? 0 : cwgt._hflexsz;
								} else {
									sz += c.offsetWidth;
									var rm = zkc.sumStyles("r", jq.margins);
									if (!zk.safari || rm >= 0)
										sz += rm;
								}
								if (cwgt._sumFlexWidth) 
									totalsz += sz;
								else if (sz > max)
									max = sz;
							}
						}
					}
				} else if (c) { 
					
					var ignore = this.ignoreChildNodeOffset_('w');
					for(; c; c = c.nextSibling) {
						var zkc = zk(c),
							sz = 0;
						if (ignore) {
							var el = c.firstChild,
								txt = el && el.nodeType == 3 ? el.nodeValue : null;
							if (txt) {
								var dim = zkc.textSize(txt);
								sz = dim[0]; 
								if (sz > max)
									max = sz;
							}
						} else {
							var	sameOffParent = c.offsetParent == noffParent;
							sz = c.offsetWidth + c.offsetLeft - (sameOffParent ? nleft + lbp : lp);
						}
						var rm = zkc.sumStyles(ignore ? "lr" : "r", jq.margins);
						if (!zk.safari || rm >= 0)
							sz +=  rm;
						if (sz > max)
							max = sz;
					}
				} else 
					max = n.offsetWidth - zkn.padBorderWidth();
				
				if (totalsz > max)
					max = totalsz;
				
				
				var pb = 0,
					precalc = false;
				while (n && n != wgtn) {
					if (!precalc)
						pb += zkn.padBorderWidth();
					else {
						pb += zkn.sumStyles("r", jq.paddings);
						pb += zkn.sumStyles("r", jq.borders);
					}
					var p = n.parentNode,
						pleft = p ? p.offsetLeft : 0,
						poffParent = p ? p.offsetParent : null;
					precalc = n.offsetParent == poffParent; 
					pb += n.offsetLeft;
					if (precalc)
						pb -= pleft;
					var rm = zkn.sumStyles("r", jq.margins);
					if (!zk.safari || rm >= 0)
						pb += rm; 
					n = p;
					zkn = zk(n);
				}
				if (!precalc)
					pb += zkn.padBorderWidth();
				else {
					pb += zkn.sumStyles("r", jq.paddings);
					pb += zkn.sumStyles("r", jq.borders);
				}
					
				
				
				var ignoreMargin = this._isIgnoreMargin && this._isIgnoreMargin(), 
					margin = ignoreMargin ? 0 : zk(wgtn).sumStyles("lr", jq.margins);
				if (zk.safari && margin < 0)
					margin = 0;
				var sz = this.setFlexSize_({width:(max + pb + margin)}, ignoreMargin);
				if (sz && sz.width >= 0)
					this._hflexsz = sz.width + margin;
				this.afterChildrenMinFlex_('w');
			}
			return this._hflexsz;
		} else
			return 0;
	}
	
	
	function _fixFlexX(ctl, opts, resize) {
		
		if ((this._vflex === undefined || (this._vflexsz && this._vflex == 'min'))
			&& (this._hflex === undefined || (this._hflexsz && this._hflex == 'min'))) 
			return;
		
		
		if (resize) {
			_fixFlex.apply(this);
			return;
		}
		
		
		var r1 = p1 = this,
			j1 = -1;
		if (this._hflex == 'min' && this._hflexsz === undefined) {
			++j1;
			while ((p1 = p1.parent) && p1._hflex == 'min') {
				delete p1._hflexsz;
				r1 = p1;
				++j1;
			}
		}
		var r2 = p2 = this,
			j2 = -1;
		if (this._vflex == 'min' && this._vflexsz === undefined) {
			++j2;
			while ((p2 = p2.parent) && p2._vflex == 'min') {
				delete p2._vflexsz;
				r2 = p2;
				++j2;
			}
		}
		if (j1 > 0 || j2 > 0)
			zWatch.fireDown('onSize', j1 > j2 ? r1 : r2, null, true); 
		else
			_fixFlex.apply(r2);

	}
	
	function _fixFlex() {
		
		if ((this._vflex === undefined || (this._vflexsz && this._vflex == 'min'))
			&& (this._hflex === undefined || (this._hflexsz && this._hflex == 'min'))) 
			return;
		
		if (!this.parent.beforeChildrenFlex_(this)) { 
			return;
		}
		
		if (this._flexFixed || (!this._nvflex && !this._nhflex)) { 
			delete this._flexFixed;
			return;
		}
		
		this._flexFixed = true;
		
		var pretxt = false, 
			prevflex = false, 
			prehflex = false, 
			vflexs = [],
			vflexsz = 0,
			hflexs = [],
			hflexsz = 0,
			p = this.$n().parentNode,
			zkp = zk(p),
			psz = this.getParentSize_(p),
			hgh = psz.height,
			wdh = psz.width,
			c = p.firstChild;
		
		for (; c; c = c.nextSibling)
			if (c.nodeType != 3) break; 
		
		
		var oldPos;
		if (zk.ie6_ && jq.nodeName(p, 'div')) {
			oldPos = p.style.position;
			p.style.position = 'relative';
		}
		var ptop = p.offsetTop,
			pleft = p.offsetLeft,
			tp = zkp.sumStyles("t", jq.paddings), 
			tbp = zkp.sumStyles('t', jq.borders) + tp,
			lp = zkp.sumStyles("l", jq.paddings), 
			lbp = zkp.sumStyles('l', jq.borders) + lp, 
			segTop = 0,
			segLeft = 0,
			segBottom = segTop,
			segRight = segLeft;

		for (; c; c = c.nextSibling) {
			var zkc = zk(c);
			if (zkc.isVisible()) {
				
				if (c.nodeType === 3) { 
					pretxt = true;
					prevflex = prehflex = false;
					continue;
				}
				var offhgh = zkc.offsetHeight(),
					offwdh = offhgh > 0 ? zkc.offsetWidth() : 0, 
					sameOffParent = c.offsetParent === p.offsetParent, 
					offTop = c.offsetTop - (sameOffParent ? tbp + ptop : tp),
					offLeft = c.offsetLeft - (sameOffParent ?  lbp + pleft : lp),
					marginRight = offLeft + offwdh + zkc.sumStyles("r", jq.margins),
					marginBottom = offTop + offhgh + zkc.sumStyles("b", jq.margins);
					
				var cwgt = _binds[c.id];
				
				
				if (cwgt && cwgt._nhflex) {
					if (cwgt !== this)
						cwgt._flexFixed = true; 
					if (cwgt._hflex == 'min') {
						_fixMinFlex.apply(cwgt, [c, 'w']);
						
						offLeft = c.offsetLeft - (sameOffParent ? lbp + pleft : lp);
						offwdh = zkc.offsetWidth();
						marginRight = offLeft + offwdh + zkc.sumStyles('r', jq.margins);
						segRight = Math.max(segRight, marginRight);
						prehflex = false;
					} else {
						if (pretxt) {
							var txtmarginRight = offTop - zkc.sumStyles('l', jq.margins);
							segRight = Math.max(segRight, txtmarginRight);
						}
						if (!prehflex && segRight > segLeft) {
							wdh -= segRight - segLeft;
						}
						segLeft = segRight = marginRight;
						
						hflexs.push(cwgt);
						hflexsz += cwgt._nhflex;
						prehflex = true;
					}
				} else {
					segRight = Math.max(segRight, marginRight);
					prehflex = false;
				}
				
				
				if (cwgt && cwgt._nvflex) {
					if (cwgt !== this)
						cwgt._flexFixed = true; 
					if (cwgt._vflex == 'min') {
						_fixMinFlex.apply(cwgt, [c, 'h']);
						
						offTop = c.offsetTop - (sameOffParent ? tbp + ptop : tp);
						offhgh = zkc.offsetHeight();
						marginBottom = offTop + offhgh + zkc.sumStyles('b', jq.margins);
						segBottom = Math.max(segBottom, marginBottom);
						prevflex = false;
					} else {
						if (pretxt) {
							var txtmarginBottom = offTop - zkc.sumStyles('t', jq.margins);
							segBottom = Math.max(segBottom, txtmarginBottom);
						}
						if (!prevflex && segBottom > segTop) {
							hgh -= segBottom - segTop;
						}
						segTop = segBottom = marginBottom;
						
						vflexs.push(cwgt);
						vflexsz += cwgt._nvflex;
						prevflex = true;
					}
				} else {
					segBottom = Math.max(segBottom, marginBottom);
					prevflex = false;
				}
				pretxt = false;
			}
		}
		
		if (zk.ie6_ && jq.nodeName(p, 'div')) { 
			p.style.position = oldPos;
		}

		if (segBottom > segTop) {
			hgh -= segBottom - segTop;
		}
		if (segRight > segLeft) {
			wdh -= segRight - segLeft;
		}
		
		
		
		var lastsz = hgh > 0 ? hgh : 0;
		for (var j = vflexs.length - 1; j > 0; --j) {
			var cwgt = vflexs.shift(), 
				vsz = (cwgt._nvflex * hgh / vflexsz) | 0; 
			cwgt.setFlexSize_({height:vsz});
			cwgt._vflexsz = vsz;
			lastsz -= vsz;
		}
		
		if (vflexs.length) {
			var cwgt = vflexs.shift();
			cwgt.setFlexSize_({height:lastsz});
			cwgt._vflexsz = lastsz;
		}
		
		
		
		lastsz = wdh > 0 ? wdh : 0;
		for (var j = hflexs.length - 1; j > 0; --j) {
			var cwgt = hflexs.shift(), 
				hsz = (cwgt._nhflex * wdh / hflexsz) | 0; 
			cwgt.setFlexSize_({width:hsz});
			cwgt._hflexsz = hsz;
			lastsz -= hsz;
		}
		
		if (hflexs.length) {
			var cwgt = hflexs.shift();
			cwgt.setFlexSize_({width:lastsz});
			cwgt._hflexsz = lastsz;
		}
		
		
		this.parent.afterChildrenFlex_(this);
		this._flexFixed = false;
	}
	function _listenFlex(wgt) {
		if (!wgt._flexListened){
			zWatch.listen({onSize: [wgt, _fixFlexX], onShow: [wgt, _fixFlexX]});
			wgt._flexListened = true;
		}
	}
	function _unlistenFlex(wgt) {
		if (wgt._flexListened) {
			zWatch.unlisten({onSize: [wgt, _fixFlexX], onShow: [wgt, _fixFlexX]});
			delete wgt._flexListened;
		}
	}

	
	zk.DnD = { 
		
		getDrop: function (drag, pt, evt) {
			var wgt = evt.target;
			return wgt ? wgt.getDrop_(drag.control): null;
		},
		
		ghost: function (drag, ofs, msg) {
			if (msg != null)  {
				jq(document.body).append(
					'<div id="zk_ddghost" class="z-drop-ghost" style="position:absolute;top:'
					+ofs[1]+'px;left:'+ofs[0]+'px;"><div class="z-drop-cnt"><span id="zk_ddghost-img" class="z-drop-disallow"></span>&nbsp;'+msg+'</div></div>');
				drag._dragImg = jq("#zk_ddghost-img")[0];
				return jq("#zk_ddghost")[0];
			}

			var dgelm = jq(drag.node).clone()[0];
			dgelm.id = "zk_ddghost";
			zk.copy(dgelm.style, {
				position: "absolute", left: ofs[0] + "px", top: ofs[1] + "px"
			});
			document.body.appendChild(dgelm);
			return dgelm;
		}
	};
	function DD_cleanLastDrop(drag) {
		if (drag) {
			var drop;
			if (drop = drag._lastDrop) {
				drag._lastDrop = null;
				drop.dropEffect_();
			}
			drag._lastDropTo = null;
		}
	}
	function DD_pointer(evt) {
		return [evt.pageX + 10, evt.pageY + 5];
	}
	function DD_enddrag(drag, evt) {
		DD_cleanLastDrop(drag);
		var pt = [evt.pageX, evt.pageY],
			wgt = zk.DnD.getDrop(drag, pt, evt);
		if (wgt) wgt.onDrop_(drag, evt);
	}
	function DD_dragging(drag, pt, evt) {
		var dropTo;
		if (!evt || (dropTo = evt.domTarget) == drag._lastDropTo)
			return;

		var dropw = zk.DnD.getDrop(drag, pt, evt),
			found = dropw && dropw == drag._lastDrop;
		if (!found) {
			DD_cleanLastDrop(drag); 
			if (dropw) {
				drag._lastDrop = dropw;
				dropw.dropEffect_(true);
				found = true;
			}
		}

		var dragImg = drag._dragImg;
		if (dragImg)
			dragImg.className = found ? 'z-drop-allow': 'z-drop-disallow';

		drag._lastDropTo = dropTo; 
	}
	function DD_ghosting(drag, ofs, evt) {
		return drag.control.cloneDrag_(drag, DD_pointer(evt));
	}
	function DD_endghosting(drag, origin) {
		drag.control.uncloneDrag_(drag);
		drag._dragImg = null;
	}
	function DD_constraint(drag, pt, evt) {
		return DD_pointer(evt);
	}
	function DD_ignoredrag(drag, pt, evt) {
		return drag.control.ignoreDrag_(pt);
	}

	function _topnode(n) {
		for (var v; n && n != document.body; n = n.parentNode) 
			if ((v=n.style) && ((v=v.position) == 'absolute' || v == 'relative'))
				return n;
	}
	function _zIndex(n) {
		return n ? zk.parseInt(n.style.zIndex): 0;
	}

	function _getFirstNodeDown(wgt) {
		var n = wgt.$n();
		if (n) return n;
		for (var w = wgt.firstChild; w; w = w.nextSibling) {
			n = w.getFirstNode_();
			if (n) return n;
		}
	}
	
	function _floatVisibleDependent(self, wgt) {
		for (; wgt; wgt = wgt.parent)
			if (wgt == self) return true;
			else if (!wgt.isVisible()) break;
		return false;
	}

	
	function _topZIndex(wgt) {
		var zi = 1800; 
		for (var j = _floatings.length; j--;) {
			var w = _floatings[j].widget,
				wzi = zk.parseInt(w.getFloatZIndex_(_floatings[j].node));
			if (wzi >= zi && !zUtl.isAncestor(wgt, w) && w.isVisible())
				zi = wzi + 1;
		}
		return zi;
	}

	function _prepareRemove(wgt, ary) {
		for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling) {
			var n = wgt.$n();
			if (n) ary.push(n);
			else _prepareRemove(wgt, ary);
		}
	}

	
	function _rdrender(wgt) {
		if (wgt._z$rd) { 
			delete wgt._z$rd;
			wgt._norenderdefer = true;
			wgt.replaceHTML('#' + wgt.uuid, wgt.parent ? wgt.parent.desktop: null);
		}
	}

	var _dragoptions = {
		starteffect: zk.$void, 
		endeffect: DD_enddrag, change: DD_dragging,
		ghosting: DD_ghosting, endghosting: DD_endghosting,
		constraint: DD_constraint,
		ignoredrag: DD_ignoredrag,
		zIndex: 88800
	};

zk.Widget = zk.$extends(zk.Object, {
	_visible: true,
	
	nChildren: 0,
	
	bindLevel: -1,
	_mold: 'default',
	
	className: 'zk.Widget',
	
	widgetName: "widget",

	_floating: false,

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	

	
	

	
	$init: function (props) {
		this._asaps = {}; 
		this._lsns = {}; 
		this._bklsns = {}; 
		this._subnodes = {}; 
		this.effects_ = {};

		this.afterInit(function () {
			if (props) {
				var mold = props.mold;
				if (mold != null) {
					if (mold) this._mold = mold;
					delete props.mold; 
				}
				for (var nm in props)
					this.set(nm, props[nm]);
			}

			if ((zk.spaceless || this.rawId) && this.id)
				this.uuid = this.id; 
			if (!this.uuid)
				this.uuid = zk.Widget.nextUuid();
		});
	},

	$define: {
		
		
		mold: function () {
			this.rerender();
		},
		
		
		style: function () {
			this.updateDomStyle_();
		},
		
		
		sclass: function () {
			this.updateDomClass_();
		},
		
		
		zclass: function (){
			this.rerender();
		},
		
		
		width: function (v) {
			if (!this._nhflex) {
				var n = this.$n();
				if (n) n.style.width = v || '';
			}
		},
		
		
		height: function (v) {
			if (!this._nvflex) {
				var n = this.$n();
				if (n) n.style.height = v || '';
			}
		},
		
		
		left: function (v) {
			var n = this.$n();
			if (n) n.style.left = v || '';
		},
		
		
		top: function (v) {
			var n = this.$n();
			if (n) n.style.top = v || '';
		},
		
		
		tooltiptext: function (v) {
			var n = this.$n();
			if (n) n.title = v || '';
		},

		
		
		droppable: [
			function (v) {
				return v && "false" != v ? v: null;
			},
			function (v) {
				var dropTypes;
				if (v && v != "true") {
					dropTypes = v.split(',');
					for (var j = dropTypes.length; j--;)
						if (!(dropTypes[j] = dropTypes[j].trim()))
							dropTypes.splice(j, 1);
				}
				this._dropTypes = dropTypes;
			}
		],
		
		
		vflex: function(v) {
			this._nvflex = (true === v || 'true' == v) ? 1 : v == 'min' ? -65500 : zk.parseInt(v);
			if (this._nvflex < 0 && v != 'min')
				this._nvflex = 0;
			if (_binds[this.uuid] === this) { 
				if (!this._nvflex) {
					this.setFlexSize_({height: ''}); 
					delete this._vflexsz;
					if (!this._nhflex)
						_unlistenFlex(this);
				} else
					_listenFlex(this);
				zWatch.fireDown('onSize', this.parent);
			}
		},
		
		
		hflex: function(v) {
			this._nhflex = (true === v || 'true' == v) ? 1 : v == 'min' ? -65500 : zk.parseInt(v);
			if (this._nhflex < 0 && v != 'min')
				this._nhflex = 0; 
			if (_binds[this.uuid] === this) { 
				if (!this._nhflex) {
					this.setFlexSize_({width: ''}); 
					delete this._hflexsz;
					if (!this._nvflex)
						_unlistenFlex(this);
				} else
					_listenFlex(this);
				zWatch.fireDown('onSize', this.parent);
			}
		},
		
		
		 renderdefer: null
	},
	
	setDraggable: function (v) {
		if (!v && v != null) v = "false"; 
		this._draggable = v;

		if (this.desktop && !_dragCtl(this, true))
			if (v && v != "false") this.initDrag_();
			else this.cleanDrag_();
	},
	
	getDraggable: function () {
		var v = this._draggable;
		return v ? v: _dragCtl(this) ? "true": "false";
	},
	
	$o: function () {
		for (var w = this; w; w = w.parent)
			if (w._fellows) return w;
	},
	
	
	
	$f: function (id, global) {
		var f = this.$o();
		if (!arguments.length)
			return f ? f._fellows: {};
		for (var ids = id.split('/'), j = 0, len = ids.length; j < len; ++j) {
			id = ids[j];
			if (id) {
				if (f) f = f._fellows[id];
				if (!f && global && (f=_globals[id])) f = f[0];
				if (!f || zk.spaceless) break;
				global = false;
			}
		}
		return f;
	},
	
	getId: function () {
		return this.id;
	},
	
	setId: function (id) {
		if (id != this.id) {
			if (this.id) {
				_rmIdSpace(this);
				_rmGlobal(this); 
			}

			if (id && (zk.spaceless || this.rawId))
				this._setUuid(id);
			this.id = id;

			if (id) {
				_addIdSpace(this);
				if (this.desktop || this.z_rod)
					_addGlobal(this);
			}
		}
		return this;
	},
	_setUuid: function (uuid) { 
		if (!uuid)
			uuid = zk.Widget.nextUuid();
		if (uuid != this.uuid) {
			var n = this.$n();
			if (n) {
				
				if (!this.rawId)
					throw 'id immutable after bound'; 
				n.id = uuid;
				delete _binds[this.uuid];
				_binds[uuid] = this;
				this.clearCache();
			}
			this.uuid = uuid;
		}
	},

	
	
	set: function (name, value, extra) {
		var cc;
		if (name.length > 4 && name.startsWith('$$on')) {
			var cls = this.$class,
				ime = cls._importantEvts;
			(ime || (cls._importantEvts = {}))[name.substring(2)] = value;
		} else if (name.length > 3 && name.startsWith('$on'))
			this._asaps[name.substring(1)] = value;
		else if (name.length > 2 && name.startsWith('on')
		&& (cc = name.charAt(2)) >= 'A' && cc <= 'Z')
			this.setListener(name, value);
		else if (arguments.length >= 3)
			zk.set(this, name, value, extra);
		else
			zk.set(this, name, value);
		return this;
	},
	
	get: function (name) {
		return zk.get(this, name);
	},
	
	getChildAt: function (j) {
		if (j >= 0 && j < this.nChildren)
			for (var w = this.firstChild; w; w = w.nextSibling)
				if (--j < 0)
					return w;
	},
	
	getChildIndex: function () {
		var w = this.parent, j = 0;
		if (w)
			for (w = w.firstChild; w; w = w.nextSibling, ++j)
				if (w == this)
					return j;
		return 0;
	},
	
	setChildren: function (children) {
		if (children)
			for (var j = 0, l = children.length; j < l;)
				this.appendChild(children[j++]);
		return this;
	},
	
	
	appendChild: function (child, ignoreDom) {
		if (child == this.lastChild)
			return false;

		var oldpt;
		if ((oldpt = child.parent) != this)
			child.beforeParentChanged_(this);

		if (oldpt) {
			_noParentCallback = true;
			try {
				oldpt.removeChild(child);
			} finally {
				_noParentCallback = false;
			}
		}

		child.parent = this;
		var ref = this.lastChild;
		if (ref) {
			ref.nextSibling = child;
			child.previousSibling = ref;
			this.lastChild = child;
		} else {
			this.firstChild = this.lastChild = child;
		}
		++this.nChildren;

		_addIdSpaceDown(child);

		if (!ignoreDom)
			if (this.shallChildROD_(child))
				_bindrod(child);
			else {
				var dt = this.desktop;
				if (dt) this.insertChildHTML_(child, null, dt);
			}

		child.onParentChanged_(oldpt);
		if (!_noChildCallback)
			this.onChildAdded_(child);
		return true;
	},
	
	shallChildROD_: function (child) {
		return child.z_rod || this.z_rod;
	},
	
	
	insertBefore: function (child, sibling, ignoreDom) {
		if (!sibling || sibling.parent != this) {
			this.insertingBefore_ = true;
			try {
				return this.appendChild(child, ignoreDom);
			} finally {
				this.insertingBefore_ = false;
			}
		}

		if (child == sibling || child.nextSibling == sibling)
			return false;

		var oldpt;
		if ((oldpt = child.parent) != this)
			child.beforeParentChanged_(this);

		if (oldpt) {
			_noParentCallback = true;
			try {
				oldpt.removeChild(child);
			} finally {
				_noParentCallback = false;
			}
		}

		child.parent = this;
		var ref = sibling.previousSibling;
		if (ref) {
			child.previousSibling = ref;
			ref.nextSibling = child;
		} else this.firstChild = child;

		sibling.previousSibling = child;
		child.nextSibling = sibling;

		++this.nChildren;

		_addIdSpaceDown(child);

		if (!ignoreDom)
			if (this.shallChildROD_(child))
				_bindrod(child);
			else {
				var dt = this.desktop;
				if (dt) this.insertChildHTML_(child, sibling, dt);
			}

		child.onParentChanged_(oldpt);
		if (!_noChildCallback)
			this.onChildAdded_(child);
		return true;
	},
	
	
	removeChild: function (child, ignoreDom) {
		var oldpt;
		if (!(oldpt = child.parent))
			return false;
		if (this != oldpt)
			return false;

		
		if (child.z_rod)
			_unbindrod(child);
		else if (child.desktop)
			this.removeChildHTML_(child, ignoreDom);

		if (!_noParentCallback)
			child.beforeParentChanged_(null);

		_unlink(this, child);

		_rmIdSpaceDown(child);

		if (!_noParentCallback)
			child.onParentChanged_(oldpt);
		if (!_noChildCallback)
			this.onChildRemoved_(child);
		return true;
	},
	
	detach: function () {
		if (this.parent) this.parent.removeChild(this);
		else {
			var cf = zk.currentFocus;
			if (cf && zUtl.isAncestor(this, cf))
				zk.currentFocus = null;
			var n = this.$n();
			if (n) {
				this.unbind();
				jq(n).remove();
			}
		}
	},
	
	clear: function () {
		while (this.lastChild)
			this.removeChild(this.lastChild);
	},
	
	replaceWidget: function (newwgt) {
		var node = this.$n(),
			p = newwgt.parent = this.parent,
			s = newwgt.previousSibling = this.previousSibling;
		if (s) s.nextSibling = newwgt;
		else if (p) p.firstChild = newwgt;

		s = newwgt.nextSibling = this.nextSibling;
		if (s) s.previousSibling = newwgt;
		else if (p) p.lastChild = newwgt;

		_rmIdSpaceDown(this);
		_addIdSpaceDown(newwgt);

		var cf = zk.currentFocus;
		if (cf && zUtl.isAncestor(this, cf))
			zk.currentFocus = null;

		if (this.z_rod) {
			_unbindrod(this);
			_bindrod(newwgt);
		} else if (this.desktop) {
			var dt = newwgt.desktop || this.desktop;
			if (node) newwgt.replaceHTML(node, dt);
			else {
				this.unbind();
				newwgt.bind(dt);
			}

			_fixBindLevel(newwgt, p ? p.bindLevel + 1: 0);
			zWatch.fire('onBindLevelMove', newwgt);
		}

		if (p)
			p.onChildReplaced_(this, newwgt);

		this.parent = this.nextSibling = this.previousSibling = null;
	},
	
	replaceCavedChildren_: function (subId, wgts, tagBeg, tagEnd) {
		_noChildCallback = true; 
		try {
			
			var cave = this.$n(subId), fc, oldwgts = [];
			for (var w = this.firstChild; w;) {
				var sib = w.nextSibling;
				if (jq.isAncestor(cave, w.$n())) {
					if (!fc || fc == w) fc = sib;
					this.removeChild(w, true); 
					oldwgts.push(w);
				}
				w = sib;
			}

			
			for (var j = 0, len = wgts.length; j < len; ++j)
				this.insertBefore(wgts[j], fc, true); 
		} finally {
			_noChildCallback = false;
		}

		if (fc = this.desktop) {
			
			var out = [];
			if (tagBeg) out.push(tagBeg);
			for (var j = 0, len = wgts.length; j < len; ++j)
				wgts[j].redraw(out);
			if (tagEnd) out.push(tagEnd);

			
			jq(cave).html(out.join(''));

			
			for (var j = 0, len = wgts.length; j < len; ++j) {
				wgts[j].bind(fc);
				this.onChildReplaced_(oldwgts[j], wgts[j]);
			}
		}
	},

	
	beforeParentChanged_: function () {
	},
	
	onParentChanged_: function () {
	},

	
	
	isRealVisible: function (opts) {
		var dom = opts && opts.dom;
		for (var wgt = this; wgt; wgt = wgt.parent) {
			if (dom) {
				if (!zk(wgt.$n()).isVisible())
					return false;
			} else if (!wgt.isVisible())
				return false;

			
			var p = wgt.parent, n;
			if (p && p.isVisible() && (p=p.$n()) && (n=wgt.$n()))
				while ((n=zk(n).vparentNode(true)) && p != n)
					if ((n.style||{}).display == 'none')
						return false; 

			if (opts && opts.until == wgt)
				break;
		}
		return true;
	},
	
	
	isVisible: function (strict) {
		var visible = this._visible;
		if (!strict || !visible)
			return visible;
		var n = this.$n();
		return !n || zk(n).isVisible();
	},
	
	setVisible: function (visible) {
		if (this._visible != visible) {
			this._visible = visible;

			var p = this.parent, ocvCalled;
			if (this.desktop) {
				var parentVisible = !p || p.isRealVisible(),
					node = this.$n(),
					floating = this._floating;

				if (!parentVisible) {
					if (!floating) this.setDomVisible_(node, visible);
				} else if (visible) {
					var zi;
					if (floating)
						this.setZIndex(zi = _topZIndex(this), {fire:true});

					this.setDomVisible_(node, true);

					
					for (var j = 0, fl = _floatings.length; j < fl; ++j) {
						var w = _floatings[j].widget,
							n = _floatings[j].node;
						if (this == w)
							w.setDomVisible_(n, true, {visibility:1});
						else if (_floatVisibleDependent(this, w)) {
							zi = zi >= 0 ? ++zi: _topZIndex(w);
							w.setFloatZIndex_(n, zi);
							w.setDomVisible_(n, true, {visibility:1});
						}
					}

					if (ocvCalled = p) p.onChildVisible_(this);
						
					
					this.fire('onShow');
					if (!zk.animating())
						zWatch.fireDown('onShow', this);
				} else {
					this.fire('onHide');
					if (!zk.animating())
						zWatch.fireDown('onHide', this);

					for (var j = _floatings.length, bindLevel = this.bindLevel; j--;) {
						var w = _floatings[j].widget;
						if (bindLevel >= w.bindLevel)
							break; 
						if (_floatVisibleDependent(this, w))
							w.setDomVisible_(_floatings[j].node, false, {visibility:1});
					}

					this.setDomVisible_(node, false);
				}
			}
			if (p && !ocvCalled) p.onChildVisible_(this);
				
		}
		return this;
	},
	
	zsync: function () {
		for (var nm in this.effects_) {
			var ef = this.effects_[nm];
			if (ef && ef.sync) ef.sync();
		}
	},
	
	show: function () {return this.setVisible(true);},
	
	hide: function () {return this.setVisible(false);},
	
	setDomVisible_: function (n, visible, opts) {
		if (!opts || opts.display)
			n.style.display = visible ? '': 'none';
		if (opts && opts.visibility)
			n.style.visibility = visible ? 'visible': 'hidden';
	},
	
	onChildAdded_: function () {
	},
	
	onChildRemoved_: function () {
	},
	
	onChildReplaced_: function (oldc, newc) {
		this.childReplacing_ = true;
		try {
			if (oldc) this.onChildRemoved_(oldc);
			if (newc) this.onChildAdded_(newc);
		} finally {
			this.childReplacing_ = false;
		}
	},
	
	onChildVisible_: function () {
	},
	
	setTopmost: function () {
		if (!this.desktop) return -1;

		for (var wgt = this; wgt; wgt = wgt.parent)
			if (wgt._floating) {
				var zi = _topZIndex(wgt);
				for (var j = 0, fl = _floatings.length; j < fl; ++j) { 
					var w = _floatings[j].widget,
						n = _floatings[j].node;
					if (wgt == w)
						w.setFloatZIndex_(n, zi); 
					else if (zUtl.isAncestor(wgt, w) && w.isVisible())
						w.setFloatZIndex_(n, ++zi);
				}
				return zi;
			}
		return -1;
	},
	
	setFloatZIndex_: function (node, zi) {
		if (node != this.$n()) node.style.zIndex = zi; 
		else this.setZIndex(zi, {fire:true});
	},
	
	getFloatZIndex_: function (node) {
		return node != this.$n() ? node.style.zIndex: this._zIndex;
	},
	
	getTopWidget: function () {
		for (var wgt = this; wgt; wgt = wgt.parent)
			if (wgt._floating)
				return wgt;
	},
	
	isFloating_: function () {
		return this._floating;
	},
	
	setFloating_: function (floating, opts) {
		if (this._floating != floating) {
			if (floating) {
				
				var inf = {widget: this, node: opts && opts.node? opts.node: this.$n()},
					bindLevel = this.bindLevel;
				for (var j = _floatings.length;;) {
					if (--j < 0) {
						_floatings.unshift(inf);
						break;
					}
					if (bindLevel >= _floatings[j].widget.bindLevel) { 
						_floatings.splice(j + 1, 0, inf);
						break;
					}
				}
				this._floating = true;
			} else {
				for (var j = _floatings.length; j--;)
					if (_floatings[j].widget == this)
						_floatings.splice(j, 1);
				this._floating = false;
			}
		}
		return this;
	},

	
	getZIndex: _zkf = function () {
		return this._zIndex;
	},
	getZindex: _zkf,
	
	setZIndex: _zkf = function (zIndex, opts) {
		if (this._zIndex != zIndex) {
			this._zIndex = zIndex;
			var n = this.$n();
			if (n) {
				n.style.zIndex = zIndex = zIndex >= 0 ? zIndex: '';
				if (opts && opts.fire) this.fire('onZIndex', zIndex, {ignorable: true});
			}
		}
		return this;
	},
	setZindex: _zkf,

	
	getScrollTop: function () {
		var n = this.$n();
		return n ? n.scrollTop: 0;
	},
	
	getScrollLeft: function () {
		var n = this.$n();
		return n ? n.scrollLeft: 0;
	},
	
	setScrollTop: function (val) {
		var n = this.$n();
		if (n) n.scrollTop = val;
		return this;
	},
	
	setScrollLeft: function (val) {
		var n = this.$n();
		if (n) n.scrollLeft = val;
		return this;
	},
	
	scrollIntoView: function () {
		zk(this.$n()).scrollIntoView();
		return this;
	},

	
	redraw: function (out) {
		if (!this.deferRedraw_(out)) {
			var s = this.prolog;
			if (s) out.push(s);

			for (var p = this, mold = this._mold; p; p = p.superclass) {
				var f = p.$class.molds[mold];
				if (f) return f.apply(this, arguments);
			}
			throw "mold "+mold+" not found in "+this.className;
		}
	},
	
	deferRedraw_: function (out) {
		var delay;
		if ((delay = this._renderdefer) >= 0) {
			if (!this._norenderdefer) {
				this.z_rod = this._z$rd = true;
				out.push('<div', this.domAttrs_({domClass:1}), ' class="z-renderdefer"></div>');
				out = null; 

				var wgt = this;
				setTimeout(function () {_rdrender(wgt);}, delay);
				return true;
			}
			delete this._norenderdefer;
			delete this.z_rod;
		}
		return false;
	},
	
	forcerender: function () {
		_rdrender(this);
	},
	
	updateDomClass_: function () {
		if (this.desktop) {
			var n = this.$n();
			if (n) n.className = this.domClass_();
			this.zsync();
		}
	},
	
	updateDomStyle_: function () {
		if (this.desktop) {
			var s = jq.parseStyle(this.domStyle_()),
				n = this.$n();
			zk(n).clearStyles().jq.css(s);

			var t = this.getTextNode();
			if (t && t != n)
				zk(t).clearStyles().jq.css(jq.filterTextStyle(s));
			this.zsync();
		}
	},
	
	getTextNode: function () {
	},

	
	domStyle_: function (no) {
		var style = '';
		if (!this.isVisible() && (!no || !no.visible))
			style = 'display:none;';
		if (!no || !no.style) {
			var s = this.getStyle(); 
			if (s) {
				style += s;
				if (s.charAt(s.length - 1) != ';') style += ';';
			}
		}
		if (!no || !no.width) {
			var s = this.getWidth();
			if (s) style += 'width:' + s + ';';
		}
		if (!no || !no.height) {
			var s = this.getHeight();
			if (s) style += 'height:' + s + ';';
		}
		if (!no || !no.left) {
			var s = this.getLeft();
			if (s) style += 'left:' + s + ';';
		}
		if (!no || !no.top) {
			var s = this.getTop();
			if (s) style += 'top:' + s + ';';
		}
		if (!no || !no.zIndex) {
			var s = this.getZIndex();
			if (s >= 0) style += 'z-index:' + s + ';';
		}
		return style;
	},
	
	domClass_: function (no) {
		var scls = '';
		if (!no || !no.sclass) {
			var s = this.getSclass();
			if (s) scls = s;
		}
		if (!no || !no.zclass) {
			var s = this.getZclass();
			if (s) scls += (scls ? ' ': '') + s;
		}
		return scls;
	},
	
	domAttrs_: function (no) {
		var html = "", attrs;
		if (!no || !no.id)
			html += zUtl.appendAttr("id", this.uuid);
		if (!no || !no.domStyle)
			html += zUtl.appendAttr("style", this.domStyle_(no));
		if (!no || !no.domClass)
			html += zUtl.appendAttr("class", this.domClass_());
		if (!no || !no.tooltiptext)
			html += zUtl.appendAttr("title", this.domTooltiptext_());
		for (var nm in (attrs = this.domExtraAttrs))
			html += zUtl.appendAttr(nm, attrs[nm]);
		return html;
	},
	
	domTooltiptext_ : function () {
		return this.getTooltiptext();
	},
	
	domTextStyleAttr_: function () {
		var s = this.getStyle();
		return s ? zUtl.appendAttr("style", jq.filterTextStyle(s)): s;
	},

	
	replaceHTML: function (n, desktop, skipper) {
		if (!desktop) {
			desktop = this.desktop;
			if (!zk.Desktop._ndt) zk.stateless();
		}

		var cf = zk.currentFocus;
		if (cf && zUtl.isAncestor(this, cf)) {
			zk.currentFocus = null;
		} else
			cf = null;

		var p = this.parent;
		if (p) p.replaceChildHTML_(this, n, desktop, skipper);
		else {
			var oldwgt = this.getOldWidget_(n);
			if (oldwgt) oldwgt.unbind(skipper); 
			else if (this.z_rod) _unbindrod(this); 
			zjq._setOuter(n, this.redrawHTML_(skipper, true));
			this.bind(desktop, skipper);
		}

		if (!skipper) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}

		if (cf && cf.desktop && !zk.currentFocus) cf.focus();
		return this;
	},
	
	getOldWidget_: function (n) {
		return zk.Widget.$(n, {strict:true});
	},
	
	redrawHTML_: function (skipper, noprolog) {
		var out = [];
		this.redraw(out, skipper);
		if (noprolog && !this.rawId && this.prolog && out[0] == this.prolog)
			out[0] = '';
			
			
			
			
			
		return out.join('');
	},
	
	rerender: function (skipper) {
		if (this.desktop) {
			var n = this.$n();
			if (n) {
				var oldrod = this.z$rod;
				this.z$rod = false;
					

				if (skipper) {
					var skipInfo = skipper.skip(this);
					if (skipInfo) {
						this.replaceHTML(n, null, skipper);

						skipper.restore(this, skipInfo);

						zWatch.fireDown('onRestore', this);
							
						zWatch.fireDown('beforeSize', this);
						zWatch.fireDown('onSize', this);
					}
				} else
					this.replaceHTML(n);

				this.z$rod = oldrod;
			}
		}
		return this;
	},

	
	replaceChildHTML_: function (child, n, desktop, skipper) {
		var oldwgt = child.getOldWidget_(n);
		if (oldwgt) oldwgt.unbind(skipper); 
		else if (this.shallChildROD_(child))
			_unbindrod(child); 
		zjq._setOuter(n, child.redrawHTML_(skipper, true));
		child.bind(desktop, skipper);
	},
	
	insertChildHTML_: function (child, before, desktop) {
		var ben;
		if (before)
			before = before.getFirstNode_();
		if (!before)
			for (var w = this;;) {
				ben = w.getCaveNode();
				if (ben) break;

				var w2 = w.nextSibling;
				if (w2 && (before = w2.getFirstNode_()))
					break;

				if (!(w = w.parent)) {
					ben = document.body;
					break;
				}
			}

		if (before) {
			var sib = before.previousSibling;
			if (_isProlog(sib)) before = sib;
			jq(before).before(child.redrawHTML_());
		} else
			jq(ben).append(child.redrawHTML_());
		child.bind(desktop);
	},
	
	getCaveNode: function () {
		return this.$n('cave') || this.$n();
	},
	
	getFirstNode_: function () {
		for (var w = this; w; w = w.nextSibling) {
			var n = _getFirstNodeDown(w);
			if (n) return n;
		}
	},
	
	removeChildHTML_: function (child, ignoreDom) {
		var cf = zk.currentFocus;
		if (cf && zUtl.isAncestor(child, cf))
			zk.currentFocus = null;

		var n = child.$n();
		if (n) {
			var sib = n.previousSibling;
			if (child.prolog && _isProlog(sib))
				jq(sib).remove();
		} else
			_prepareRemove(child, n = []);

		child.unbind();

		if (!ignoreDom)
			child.removeHTML_(n);
	},
	
	removeHTML_: function (n) {
		jq(n).remove();
		this.clearCache();
	},
	
	
	$n: function (subId) {
		if (subId) {
			var n = this._subnodes[subId];
			if (!n && this.desktop) {
				n = jq(this.uuid + '-' + subId, zk)[0];
				this._subnodes[subId] = n ? n : 'n/a';
			}
			return n == 'n/a' ? null : n;
		}
		var n = this._node;
		if (!n && this.desktop && !this._nodeSolved) {
			this._node = n = jq(this.uuid, zk)[0];
			this._nodeSolved = true;
		}
		return n;
	},
	
	clearCache: function () {
		this._node = null;
		this._subnodes = {};
		this._nodeSolved = false;
	},
	
	getPage: function () {
		var page, dt;
		for (page = this.parent; page; page = page.parent)
			if (page.$instanceof(zk.Page))
				return page;

		return (page = (dt = this.desktop)._bpg) ?
			page: (dt._bpg = new zk.Body(dt));
	},

	
	bind: function (desktop, skipper) {
		if (this.z_rod) 
			_bindrod(this);
		else {
			var after = [], fn;
			this.bind_(desktop, skipper, after);
			while (fn = after.shift())
				fn();
		}
		return this;
	},
	
	unbind: function (skipper) {
		if (this.z_rod)
			_unbindrod(this);
		else {
			var after = [];
			this.unbind_(skipper, after);
			for (var j = 0, len = after.length; j < len;)
				after[j++]();
		}
		return this;
	},

	
	bind_: function (desktop, skipper, after) {
		_bind0(this);

		this.desktop = desktop || (desktop = zk.Desktop.$(this.parent));

		var p = this.parent;
		this.bindLevel = p ? p.bindLevel + 1: 0;

		var v = this._draggable;
		if (v && v != "false" && !_dragCtl(this))
			this.initDrag_();
		
		if (this._nvflex || this._nhflex)
			_listenFlex(this);

		for (var child = this.firstChild, nxt; child; child = nxt) {
			nxt = child.nextSibling;
				

			if (!skipper || !skipper.skipped(this, child))
				if (child.z_rod) _bindrod(child);
				else child.bind_(desktop, null, after); 
		}

		if (this.isListen('onBind')) {
			var self = this;
			zk.afterMount(function () {
				if (self.desktop) 
					self.fire('onBind');
			});
		}
	},

	
	unbind_: function (skipper, after) {
		_unbind0(this);
		_unlistenFlex(this);

		for (var child = this.firstChild, nxt; child; child = nxt) {
			nxt = child.nextSibling; 

			if (!skipper || !skipper.skipped(this, child))
				if (child.z_rod) _unbindrod(child);
				else child.unbind_(null, after); 
		}

		this.cleanDrag_(); 

		if (this.isListen('onUnbind')) {
			var self = this;
			zk.afterMount(function () {
				if (!self.desktop) 
					self.fire('onUnbind');
			});
		}

		for (var nm in this.effects_) {
			var ef = this.effects_[nm];
			if (ef) ef.destroy();
		}
		this.effects_ = {};
	},
	
	extraBind_: function (uuid, add) {
		if (add == false) delete _binds[uuid];
		else _binds[uuid] = this;
	},
	setFlexSize_: function(sz, ignoreMargins) {
		var n = this.$n(),
			zkn = zk(n);
		if (sz.height !== undefined) {
			if (sz.height == 'auto')
				n.style.height = '';
			else if (sz.height != '') 
				this.setFlexSizeH_(n, zkn, sz.height, ignoreMargins);
			else
				n.style.height = this._height || '';
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto')
				n.style.width = '';
			else if (sz.width != '') 
				this.setFlexSizeW_(n, zkn, sz.width, ignoreMargins);
			else
				n.style.width = this._width || '';
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	},
	setFlexSizeH_: function(n, zkn, height, ignoreMargins) {
		var h = zkn.revisedHeight(height, !ignoreMargins),
			newh = h,
			margins = zkn.sumStyles("tb", jq.margins);
		n.style.height = jq.px0(h);
		var newmargins = zkn.sumStyles("tb", jq.margins);
		if (h == jq(n).outerHeight(false)) 
			newh = height - ((zk.safari && newmargins >= 0 && newmargins < margins) ? newmargins : margins);
		else if (zk.safari && newmargins >= 0 && newmargins < margins)  
			newh = zkn.revisedHeight(height, !ignoreMargins);
		if (newh != h) 
			n.style.height = jq.px0(newh);
	},
	
	setFlexSizeW_: function(n, zkn, width, ignoreMargins) {
		var w = zkn.revisedWidth(width, !ignoreMargins),
			neww = w,
			margins = zkn.sumStyles("lr", jq.margins),
			pb = zkn.padBorderWidth();
		if (zk.safari && !ignoreMargins && width == (n.offsetWidth + margins)) 
			w = width - pb;
		n.style.width = jq.px0(w);
		if (w == jq(n).outerWidth(false)) 
			neww = w + pb;
		if (neww != w) 
			n.style.width = jq.px0(neww);
			 
	},
	beforeChildrenFlex_: function(kid) {
		
		return true; 
	},
	afterChildrenFlex_: function(kid) {
		
	},
	ignoreFlexSize_: function(attr) { 
		
		return false;
	},
	ignoreChildNodeOffset_: function(attr) { 
		
		return false;
	},
	beforeMinFlex_: function () {
		
	},
	afterChildrenMinFlex_: function() {
		
	},
	getParentSize_: function(p) {
		
		var zkp = zk(p);
		return zkp ? {height: zkp.revisedHeight(p.offsetHeight), width: zkp.revisedWidth(p.offsetWidth)} : {};
	},
	fixFlex_: function() {
		_fixFlex.apply(this);
	},
	fixMinFlex_: function(n, orient) { 
		_fixMinFlex.apply(this, arguments);
	},
	
	initDrag_: function () {
		this._drag = new zk.Draggable(this, this.getDragNode(), this.getDragOptions_(_dragoptions));
	},
	
	cleanDrag_: function () {
		var drag = this._drag;
		if (drag) {
			this._drag = null;
			drag.destroy();
		}
	},
	
	getDragNode: function () {
		return this.$n();
	},
	
	getDragOptions_: function (map) {
		return map;
	},
	
	ignoreDrag_: function (pt) {
		return false;
	},
	
	getDrop_: function (dragged) {
		if (this != dragged) {
			var dropType = this._droppable,
				dragType = dragged._draggable;
			if (dropType == 'true') return this;
			if (dropType && dragType != "true")
				for (var dropTypes = this._dropTypes, j = dropTypes.length; j--;)
					if (dragType == dropTypes[j])
						return this;
		}
		return this.parent ? this.parent.getDrop_(dragged): null;
	},
	
	dropEffect_: function (over) {
		jq(this.$n()||[])[over ? "addClass" : "removeClass"]("z-drag-over");
	},
	
	getDragMessage_: function () {
		if (jq.nodeName(this.getDragNode(), "tr", "td", "th")) {
			var n = this.$n('real') || this.getCaveNode();
			return n ? n.textContent || n.innerText || '': '';
		}
	},
	
	onDrop_: function (drag, evt) {
		var data = zk.copy({dragged: drag.control}, evt.data);
		this.fire('onDrop', data, null, 38);
	},
	
	cloneDrag_: function (drag, ofs) {
		

		var msg = this.getDragMessage_();
		if (typeof msg == "string" && msg.length > 9)
			msg = msg.substring(0, 9) + "...";

		var dgelm = zk.DnD.ghost(drag, ofs, msg);

		drag._orgcursor = document.body.style.cursor;
		document.body.style.cursor = "pointer";
		jq(this.getDragNode()).addClass('z-dragged'); 
		return dgelm;
	},
	
	uncloneDrag_: function (drag) {
		document.body.style.cursor = drag._orgcursor || '';

		jq(this.getDragNode()).removeClass('z-dragged');
	},

	
	focus: function (timeout) {
		var node;
		if (this.isVisible() && this.canActivate({checkOnly:true})
		&& (node = this.$n())) {
			if (zk(node).focus(timeout)) {
				this.setTopmost();
				return true;
			}
			for (var w = this.firstChild; w; w = w.nextSibling)
				if (w.isVisible() && w.focus(timeout))
					return true;
		}
		return false;
	},
	
	canActivate: function (opts) {
		if (zk.busy && (!opts || !opts.checkOnly)) { 
			jq.focusOut(); 
			return false;
		}

		var modal = zk.currentModal;
		if (modal && !zUtl.isAncestor(modal, this)) {
			if (!opts || !opts.checkOnly) {
				var cf = zk.currentFocus;
				
				if (cf && zUtl.isAncestor(modal, cf)) cf.focus(0);
				else modal.focus(0);
			}
			return false;
		}
		return true;
	},

	
	
	smartUpdate: function (nm, val, timeout) {
		zAu.send(new zk.Event(this, 'setAttr', [nm, val]),
			timeout >= 0 ? timeout: -1);
		return this;
	},

	
	
	fireX: function (evt, timeout) {
		var oldtg = evt.currentTarget;
		evt.currentTarget = this;
		try {
			var evtnm = evt.name,
				lsns = this._lsns[evtnm],
				len = lsns ? lsns.length: 0;
			if (len) {
				for (var j = 0; j < len;) {
					var inf = lsns[j++], o = inf[0];
					(inf[1] || o[evtnm]).call(o, evt);
					if (evt.stopped) return evt; 
				}
			}

			if (!evt.auStopped) {
				var toServer = evt.opts && evt.opts.toServer;
				if (toServer || (this.inServer && this.desktop)) {
					if (evt.opts.sendAhead) {
						this.sendAU_(evt, timeout >= 0 ? timeout : 38);
					} else {
						var asap = toServer || this._asaps[evtnm];
						if (asap == null) {
							var ime = this.$class._importantEvts;
							if (ime) {
								var ime = ime[evtnm];
								if (ime != null) 
									asap = ime;
							}
						}
						if (asap != null) 
							this.sendAU_(evt, asap ? timeout >= 0 ? timeout : 38 : -1);
					}
				}
			}
			return evt;
		} finally {
			evt.currentTarget = oldtg;
		}
	},
	
	beforeSendAU_: function (wgt, evt) {
		var en = evt.name;
		if (en == 'onClick' || en == 'onRightClick' || en == 'onDoubleClick')
			evt.shallStop = true;
	},
	
	sendAU_: function (evt, timeout, opts) {
		(evt.target||this).beforeSendAU_(this, evt);
		evt = new zk.Event(this, evt.name, evt.data, evt.opts, evt.domEvent);
			
		if (evt.opts.sendAhead) zAu.sendAhead(evt, timeout);
		else zAu.send(evt, timeout);
	},
	
	shallIgnoreClick_: function (evt) {
	},

	
	fire: function (evtnm, data, opts, timeout) {
		return this.fireX(new zk.Event(this, evtnm, data, opts), timeout);
	},
	
	listen: function (infs, priority) {
		priority = priority ? priority: 0;
		for (var evt in infs) {
			var inf = infs[evt];
			if (jq.isArray(inf)) inf = [inf[0]||this, inf[1]];
			else if (typeof inf == 'function') inf = [this, inf];
			else inf = [inf||this, null];
			inf.priority = priority;

			var lsns = this._lsns[evt];
			if (!lsns) this._lsns[evt] = [inf];
			else
				for (var j = lsns.length;;)
					if (--j < 0 || lsns[j].priority >= priority) {
						lsns.splice(j + 1, 0, inf);
						break;
					}
		}
		return this;
	},
	
	unlisten: function (infs) {
		l_out:
		for (var evt in infs) {
			var inf = infs[evt],
				lsns = this._lsns[evt], lsn;
			for (var j = lsns ? lsns.length: 0; j--;) {
				lsn = lsns[j];
				if (jq.isArray(inf)) inf = [inf[0]||this, inf[1]];
				else if (typeof inf == 'function') inf = [this, inf];
				else inf = [inf||this, null];
				if (lsn[0] == inf[0] && lsn[1] == inf[1]) {
					lsns.splice(j, 1);
					continue l_out;
				}
			}
		}
		return this;
	},
	
	isListen: function (evt, opts) {
		var v = this._asaps[evt];
		if (v) return true;
		if (opts && opts.asapOnly) {
			v = this.$class._importantEvts;
			return v && v[evt];
		}
		if (opts && opts.any) {
			if (v != null) return true;
			v = this.$class._importantEvts;
			if (v && v[evt] != null) return true;
		}

		var lsns = this._lsns[evt];
		return lsns && lsns.length;
	},
	
	setListeners: function (infs) {
		for (var evt in infs)
			this.setListener(evt, infs[evt]);
	},
	
	
	setListener: function (evt, fn) { 
		if (jq.isArray(evt)) {
			fn = evt[1];
			evt = evt[0]
		}

		var bklsns = this._bklsns,
			oldfn = bklsns[evt],
			inf = {};
		if (oldfn) { 
			delete bklsns[evt];
			inf[evt] = oldfn
			this.unlisten(inf);
		}
		if (fn) {
			inf[evt] = bklsns[evt]
				= typeof fn != 'function' ? new Function("var event=arguments[0];"+fn): fn;
			this.listen(inf);
		}
	},
	setOverride: function (nm, val) { 
		if (jq.isArray(nm)) {
			val = nm[1];
			nm = nm[0];
		}
		if (val) {
			var oldnm = '$' + nm;
			if (this[oldnm] == null && this[nm]) 
				this[oldnm] = this[nm];
			this[nm] = val;
				
		} else {
			var oldnm = '$' + nm;
			this[nm] = this[oldnm]; 
			delete this[oldnm];
		}
	},
	setOverrides: function (infs) { 
		for (var nm in infs)
			this.setOverride(nm, infs[nm]);
	},

	
	
	doSelect_: function(evt) {
		if (!evt.stopped) {
			var p = this.parent;
			if (p) p.doSelect_(evt);
		}
	},
	
	doClick_: function (evt) {
		if (_fireClick(this, evt)) {
			var p = this.parent;
			if (p) p.doClick_(evt);
		}
	},
	
	doDoubleClick_: function (evt) {
		if (_fireClick(this, evt)) {
			var p = this.parent;
			if (p) p.doDoubleClick_(evt);
		}
	},
	
	doRightClick_: function (evt) {
		if (_fireClick(this, evt)) {
			var p = this.parent;
			if (p) p.doRightClick_(evt);
		}
	},
	
	doMouseOver_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseOver_(evt);
		}
	},
	
	doMouseOut_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseOut_(evt);
		}
	},
	
	doMouseDown_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseDown_(evt);
		}
	},
	
	doMouseUp_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseUp_(evt);
		}
	},
	
	doMouseMove_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doMouseMove_(evt);
		}
	},

	
	doKeyDown_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doKeyDown_(evt);
		}
	},
	
	doKeyUp_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doKeyUp_(evt);
		}
	},
	
	doKeyPress_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doKeyPress_(evt);
		}
	},

	
	doFocus_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doFocus_(evt);
		}
	},
	
	doBlur_: function (evt) {
		if (!this.fireX(evt).stopped) {
			var p = this.parent;
			if (p) p.doBlur_(evt);
		}
	},

	
	
	domListen_: function (n, evtnm, fn) {
		if (!this.$weave) {
			var inf = _domEvtInf(this, evtnm, fn);
			jq(n, zk).bind(inf[0], inf[1]);
		}
		return this;
	},
	
	domUnlisten_: function (n, evtnm, fn) {
		if (!this.$weave) {
			var inf = _domEvtInf(this, evtnm, fn);
			jq(n, zk).unbind(inf[0], inf[1]);
		}
		return this;
	},
	
	fromPageCoord: function (x, y) {
		var ofs = zk(this).revisedOffset();
		return [x - ofs[0], y - ofs[1]];
	},
	
	isWatchable_: function (name) {
		var n;
		return (n=this.$n()) && zk(n).isRealVisible(name!='onShow');
		
		
	},
	toJSON: function () { 
		return this.uuid;
	}

}, {
	
	$: function (n, opts) {
		if (n && n.zk && n.zk.jq == n) 
			n = n[0];

		if (!n || zk.Widget.isInstance(n))
			return n;

		var wgt, id;
		if (typeof n == "string") {
		
			if ((id = n.charAt(0)) == '#') n = n.substring(1);
			else if (id == '$') {
				id = _globals[n.substring(1)];
				return id ? id[0]: null;
			}
			wgt = _binds[n]; 
			if (!wgt)
				wgt = (id = n.indexOf('-')) >= 0 ? _binds[n.substring(0, id)]: null;
			return wgt;
		}

		if (!n.nodeType) { 
			var e1, e2;
			n = ((e1 = n.originalEvent) ? e1.z$target:null)
				|| ((e1 = n.target) && (e2 = e1.z$proxy) ? e2: e1) || n; 
		}

		if (opts && opts.exact)
			return _binds[n.id];

		for (; n; n = zk(n).vparentNode(true)) {
			try {
				id = n.id || (n.getAttribute ? n.getAttribute("id") : '');
				if (id && typeof id == "string") {
					wgt = _binds[id]; 
					if (wgt)
						return wgt;

					var j = id.indexOf('-');
					if (j >= 0) {
						id = id.substring(0, j);
						wgt = _binds[id];
						if (wgt)
							if (opts && opts.child) {
								var n2 = wgt.$n();
								if (n2 && jq.isAncestor(n2, n))
									return wgt;
							} else
								return wgt;
					}
				}
			} catch (e) { 
			}
			if (opts && opts.strict) break;
		}
		return null;
	},

	
	mimicMouseDown_: function (wgt, noFocusChange) { 
		var modal = zk.currentModal;
		if (modal && !wgt) {
			var cf = zk.currentFocus;
			
			
			if (cf && zUtl.isAncestor(modal, cf)) cf.focus(0);
			else modal.focus(0);
		} else if (!wgt || wgt.canActivate()) {
			if (!noFocusChange) {
				zk.currentFocus = wgt;
				zk._cfByMD = true;
				setTimeout(function(){zk._cfByMD = false;}, 0);
					
			}

			if (wgt)
				zWatch.fire('onFloatUp', wgt); 
			else
				for (var dtid in zk.Desktop.all)
					zWatch.fire('onFloatUp', zk.Desktop.all[dtid]); 
		}
	},
	
	getElementsByName: function (name) {
		var els = [];
		for (var wid in _binds) {
			if (name == '*' || name == _binds[wid].widgetName) {
				var n = _binds[wid].$n();
				if (n) els.push(n);
			}
		}
		if (els.length)
			els.sort(function (a, b) {
				return zk.Widget.$(a).$oid - zk.Widget.$(b).$oid;
			});
		return els;
	},
	
	getElementsById: function (id) {
		var els = [];
		for (var n, wgts = _globals[id], i = wgts?wgts.length:0; i--;) {
			n = wgts[i].$n();
			if (n) els.unshift(n);
		}
		return els;
	},

	
	
	uuid: function (id) {
		var uuid = typeof id == 'object' ? id.id || '' : id,
			j = uuid.indexOf('-');
		return j >= 0 ? uuid.substring(0, j): id;
	},
	
	nextUuid: function () {
		return '_z_' + _nextUuid++;
	},

	
	isAutoId: function (id) {
		return !id || id.startsWith('_z_') || id.startsWith('z_');
	},

	
	register: function (clsnm, blankprev) {
		var cls = zk.$import(clsnm);
		cls.prototype.className = clsnm;
		var j = clsnm.lastIndexOf('.');
		if (j >= 0) clsnm = clsnm.substring(j + 1);
		_wgtcls[cls.prototype.widgetName = clsnm.toLowerCase()] = cls;
		if (blankprev) cls.prototype.blankPreserved = true;
	},
	
	getClass: function (wgtnm) {
		return _wgtcls[wgtnm];
	},
	
	newInstance: function (wgtnm, props) {
		var cls = _wgtcls[wgtnm];
		if (!cls)
			throw 'widget not found: '+wgtnm;
		return new cls(props);
	},

	_autohide: function () { 
		if (!_floatings.length) {
			for (var n; n = _hidden.shift();)
				n.style.visibility = n.getAttribute('z_ahvis')||'';
			return;
		}
		for (var tns = ['IFRAME', 'APPLET'], i = 2; i--;)
			l_nxtel:
			for (var ns = document.getElementsByTagName(tns[i]), j = ns.length; j--;) {
				var n = ns[j], $n = zk(n), visi;
				if ((!(visi=$n.isVisible(true)) && !_hidden.$contains(n))
				|| (!i && !n.getAttribute("z_autohide") && !n.getAttribute("z.autohide"))) 
					continue; 

				for (var tc = _topnode(n), k = _floatings.length; k--;) {
					var f = _floatings[k].node,
						tf = _topnode(f);
					if (tf == tc || _zIndex(tf) < _zIndex(tc) || !$n.isOverlapped(f))
						continue;

					if (visi) {
						_hidden.push(n);
						try {
							n.setAttribute('z_ahvis', n.style.visibility);
						} catch (e) {
						}
						n.style.visibility = 'hidden';
					}
					continue l_nxtel;
				}

				if (_hidden.$remove(n))
					n.style.visibility = n.getAttribute('z_ahvis')||'';
			}
	}
});


zk.RefWidget = zk.$extends(zk.Widget, {
	
	className: "zk.RefWidget",
	
	widgetName: "refWidget",
	bind_: function () {
		var w = zk.Widget.$(this.uuid);
		if (!w) throw 'illegal: '+w;

		var p, q;
		if (p = w.parent) 
			_unlink(p, w); 

		p = w.parent = this.parent,
		q = w.previousSibling = this.previousSibling;
		if (q) q.nextSibling = w;
		else if (p) p.firstChild = w;

		q = w.nextSibling = this.nextSibling;
		if (q) q.previousSibling = w;
		else if (p) p.lastChild = w;

		this.parent = this.nextSibling = this.previousSibling = null;

		_addIdSpaceDown(w); 

		
	}
});



zk.Desktop = zk.$extends(zk.Widget, {
	bindLevel: 0,
	
	className: "zk.Desktop",
	
	widgetName: "desktop",

	
	$init: function (dtid, contextURI, updateURI, reqURI, stateless) {
		this.$super('$init', {uuid: dtid}); 

		var Desktop = zk.Desktop, dts = Desktop.all, dt = zUtl.now();
		if (dt > _syncdt) { 
			_syncdt = dt + 60000;
			Desktop.sync();
		}

		this._aureqs = [];
		

		if (dt = dts[dtid]) {
			if (updateURI != null) dt.updateURI = updateURI;
			if (contextURI != null) dt.contextURI = contextURI;
		} else {
			this.uuid = this.id = dtid;
			this.updateURI = updateURI != null ? updateURI: zk.updateURI;
			this.contextURI = contextURI != null ? contextURI: zk.contextURI;
			this.requestPath = reqURI || '';
			this.stateless = stateless;
			dts[dtid] = this;
			++Desktop._ndt;
			if (!Desktop._dt) Desktop._dt = this; 
		}
	},
	_exists: function () {
		if (this._pguid) 
			for (var w = this.firstChild; w; w = w.nextSibling) 
				if (w.$n())
					return true;
	},
	bind_: zk.$void,
	unbind_: zk.$void,
	
	setId: zk.$void
},{
	
	$: function (dtid) {
		var Desktop = zk.Desktop, w;
		if (dtid) {
			if (Desktop.isInstance(dtid))
				return dtid;

			w = Desktop.all[dtid];
			if (w)
				return w;

			w = zk.Widget.$(dtid);
			for (; w; w = w.parent) {
				if (w.desktop)
					return w.desktop;
				if (w.$instanceof(Desktop))
					return w;
			}
			return null;
		}

		if (w = Desktop._dt)
			return w;
		for (dtid in Desktop.all)
			return Desktop.all[dtid];
	},
	
	all: {},
	_ndt: 0, 
	
	sync: function () {
		var Desktop = zk.Desktop, dts = Desktop.all, dt;
		if ((dt = Desktop._dt) && !dt._exists()) 
			Desktop._dt = null;
		for (var dtid in dts) {
			if (!(dt = dts[dtid])._exists()) { 
				delete dts[dtid];
				--Desktop._ndt;
			} else if (!Desktop._dt)
				Desktop._dt = dt;
		}
		return Desktop._dt;
	}
});
})();


zk.Page = zk.$extends(zk.Widget, {
	_style: "width:100%;height:100%",
	
	className: "zk.Page",
	
	widgetName: "page",

	
	$init: function (props, contained) {
		this._fellows = {};

		this.$super('$init', props);

		if (contained) zk.Page.contained.push(this);
	},
	
	redraw: function (out) {
		out.push('<div', this.domAttrs_(), '>');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</div>');
	}
},{
	
	contained: []
});
zk.Widget.register('zk.Page', true);


zk.Body = zk.$extends(zk.Page, {
	$init: function (dt) {
		this.$super('$init', {});
		this.desktop = dt;
	},
	$n: function (subId) {
		return subId ? null: document.body;
	},
	redraw: zk.$void
});

zk.Native = zk.$extends(zk.Widget, {
	
	className: "zk.Native",
	
	widgetName: "native",

	redraw: function (out) {
		var s = this.prolog;
		if (s) out.push(s);

		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);

		s = this.epilog;
		if (s) out.push(s);
	}
});


zk.Macro = zk.$extends(zk.Widget, {
	
	className: "zk.Macro",
	
	widgetName: "macro",
	_enclosingTag: "span",

	$define: {
		
		
		enclosingTag: function () {
			this.rerender();
		}
	},

	
	redraw: function (out) {
		out.push('<', this._enclosingTag, this.domAttrs_(), '>');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</', this._enclosingTag, '>');
	}
});


zk.Skipper = zk.$extends(zk.Object, {
	
	skipped: function (wgt, child) {
		return wgt.caption != child;
	},
	
	skip: function (wgt, skipId) {
		var skip = jq(skipId || (wgt.uuid + '-cave'), zk)[0];
		if (skip && skip.firstChild) {
			skip.parentNode.removeChild(skip);
				
			return skip;
		}
		return null;
	},
	
	restore: function (wgt, skip) {
		if (skip) {
			var loc = jq(skip.id, zk)[0];
			for (var el; el = skip.firstChild;) {
				skip.removeChild(el);
				loc.appendChild(el);

				if (zk.ie) zjq._fixIframe(el); 
			}
		}
	}
});


	
	

zk.Skipper.nonCaptionSkipper = new zk.Skipper();



zkreg = zk.Widget.register; 
function zkopt(opts) {
	for (var nm in opts) {
		var val = opts[nm];
		switch (nm) {
		case "pd": zk.procDelay = val; break;
		case "td": zk.tipDelay =  val; break;
		case "rd": zk.resendDelay = val; break;
		case "dj": zk.debugJS = val; break;
		case "kd": zk.keepDesktop = val; break;
		case "pf": zk.pfmeter = val; break;
		case "cd": zk.clickFilterDelay = val; break;
		case "ta": zk.timerAlive = val; break;
		case "to":
			zk.timeout = val;
			zAu._resetTimeout();
			break;
		case "ed":
			switch (val) {
			case 'e':
				zk.feature.ee = true;
			case 'p':
				zk.feature.pe = true;
			}
			break;
		case 'eu': zAu.setErrorURI(val); break;
		case 'ppos': zk.progPos = val; break;
		case 'eup': zAu.setPushErrorURI(val);
		}
	}
}


zk.copy(zk, (function() {
	var _loaded = {'zk': true}, 
		_xloadings = [], 
		_loadedsemis = [], 
		_afterLoadFronts = [],
		_afterLoads = [],
		_afterPkgLoad = {}, 
		_pkgdepend = {},
		_pkgver = {},
		_pkghosts = {}, _defhost = [],
		_loading = zk.copy({}, _loaded); 

	
	
	function markLoading(nm) {
		
		_loading[nm] = true;

		_xloadings.push(nm);
		if (updCnt() == 1) {
			zk.disableESC();
			setTimeout(prgbox, 380);
		}
	}
	function doLoad(pkg, dt) {
		if (!pkg || _loading[pkg])
			return !zk.loading && !_loadedsemis.length;
			

		markLoading(pkg);

		var modver = pkg.indexOf('.');
		if (modver) modver = zk.getVersion(pkg.substring(0, modver));
		if (!modver) modver = zk.build;

		var e = document.createElement("script"),
			uri = pkg + ".wpd",
			host = zk.getHost(pkg, true);
		e.type = "text/javascript";
		e.charset = "UTF-8";

		if (uri.charAt(0) != '/') uri = '/' + uri;

		if (host) uri = host + "/web/js" + uri;
		else {
			if (modver) uri = "/web/_zv" + modver + "/js" + uri;
			else uri = "/web/js" + uri;
			uri = zk.ajaxURI(uri, {desktop:dt,au:true});
		}

		e.src = uri;
		jq.head().appendChild(e);
		return false;
	}
	function doEnd(afs, wait) {
		for (var fn; fn = afs.shift();) {
			if (updCnt() || (wait && _loadedsemis.length)) {
				afs.unshift(fn);
				return;
			}
			fn();
		}
	}

	function loadmsg() {
		var msg = '';
		for (var j = _xloadings.length, k = 0; --j >=0;) {
			if (msg) msg += ', ';
			if (++k == 5) {
				k = 0;
				msg += '<br/>';
			}
			msg += _xloadings[j];
		}
		return msg;
	}
	function updCnt() {
		zk.loading = _xloadings.length;
		try {
			var n = jq("#zk_loadcnt")[0];
			if (n) n.innerHTML = loadmsg();
		} catch (ex) {
		}
		return zk.loading;
	}
	function prgbox() {
		if (zk.loading) {
			var n = jq("#zk_loadprog")[0];
			if (!n) {
				if (!jq.isReady)
					return setTimeout(prgbox, 10);
						

				zUtl.progressbox("zk_loadprog",
					(window.msgzk?msgzk.LOADING:"Loading")
					+' <span id="zk_loadcnt">'+loadmsg()+'</span>',
					true);
			}
		}
	}


  return { 
	setLoaded: _zkf = function (pkg, wait) { 
		_xloadings.$remove(pkg);
		_loading[pkg] = true;

		if (wait) {
			if (!_loaded[pkg]) _loadedsemis.push(pkg);
		} else {
			_loadedsemis.$remove(pkg);
			_loaded[pkg] = true;

			var afpk = _afterPkgLoad[pkg];
			if (afpk) {
				delete _afterPkgLoad[pkg];
				_afterLoadFronts.push.apply(_afterLoadFronts, afpk); 
			}

			var deps = _pkgdepend[pkg];
			if (deps) {
				delete _pkgdepend[pkg];
				for (var pn; pn = deps.unshift();)
					zk.load(pn);
			}
		}

		if (!updCnt()) {
			try {
				zk.enableESC();
				zUtl.destroyProgressbox("zk_loadprog");
			} catch (ex) {
			}
			doEnd(_afterLoadFronts);
			doEnd(_afterLoads, 1);
		}
	},
	
	setScriptLoaded: _zkf,

	
	isLoaded: function (pkg, loading) {
		return (loading && _loading[pkg]) || _loaded[pkg];
	},
	
	
	load: function (pkg, dt, func) {
		if (typeof dt == 'function')
			if (func) throw 'At most one function allowed';
			else {
				func = dt;
				dt = null;
			}

		if (func) zk.afterLoad(pkg, func, true);

		var loading;
		for (var pkgs = pkg.split(','), j = pkgs.length; j--;) {
			pkg = pkgs[j].trim();
			if (!doLoad(pkg, dt))
				loading = true;
		}
		return !loading;
	},

	
	loadScript: function (src, name, charset) {
		if (name)
			markLoading(name);

		var e = document.createElement("script");
		e.type = "text/javascript";
		e.charset = charset || "UTF-8";
		e.src = src;
		jq.head().appendChild(e);
		return this;
	},

	
	getVersion: function (pkg) {
		return _pkgver[pkg];
	},
	
	setVersion: function (pkg, ver) {
		_pkgver[pkg] = ver;
	},
	
	depends: function (a, b) {
		if (a && b) 
			if (_loaded[a]) zk.load(b);
			else {
				if (_pkgdepend[a]) _pkgdepend[a].push(b);
				else _pkgdepend[a] = [b];
			}
	},

	
	
	afterLoad: function (a, b, front) {
		if (typeof a == 'string') {
			if (!b) return true;

			for (var pkgs = a.split(','), j = pkgs.length; j--;) {
				var p = pkgs[j].trim();
				if (p && !_loaded[p]) {
					while (j--) {
						var p2 = pkgs[j].trim();
						if (p2 && !_loaded[p2]) { 
							var a1 = a, b1 = b;
							b = function () {
								zk.afterLoad(a1, b1, front); 
							};
							break;
						}
					}

					if (_afterPkgLoad[p]) _afterPkgLoad[p].push(b);
					else _afterPkgLoad[p] = [b];
					return false;
				}
			}

			
			a = b;
		}

		if (a) {
			if (zk.loading || _loadedsemis.length) {
				(front ? _afterLoadFronts: _afterLoads).push(a);
				return false;
			}
			a(); 
			return true;
		}
	},
	
	getHost: function (pkg, js) {
		for (var p in _pkghosts)
			if (pkg.startsWith(p))
				return _pkghosts[p][js ? 1: 0];
		return _defhost[js ? 1: 0];
	},
	
	setHost: function (host, updURI, pkgs) {
		var hostUpd = host + updURI;
		if (!_defhost.length)
			for (var scs = document.getElementsByTagName("script"), j = 0, len = scs.length;
			j < len; ++j) {
				var src = scs[j].src;
				if (src)
					if (src.startsWith(host)) {
						_defhost = [host, hostUpd];
						break;
					} else if (src.indexOf("/zk.wpd") >= 0)
						break;
			}
		for (var j = 0; j < pkgs.length; ++j)
			_pkghosts[pkgs[j]] = [host, hostUpd];
	}
  }
})());




function zkpi(nm, wv) {
	return {n: nm, p: zk.$package(nm, false, wv)};
}


function zkpb(pguid, dtid, contextURI, updateURI, reqURI, props) {
	zkx([0, pguid,
		zk.copy(props, {dt: dtid, cu: contextURI, uu: updateURI, ru: reqURI}),[]]);
}

zkpe = zk.$void;


function zkver(ver, build, ctxURI, updURI, modVers, opts) {
	zk.version = ver;
	zk.build = build;
	zk.contextURI = ctxURI;
	zk.updateURI = updURI;

	for (var nm in modVers)
		zk.setVersion(nm, modVers[nm]);

	zk.feature = {standard: true};
	zkopt(opts);
}


function zkmld(wgtcls, molds) {
	if (!wgtcls.superclass) {
		zk.afterLoad(function () {zkmld(wgtcls, molds);});
		return;
	}

	var ms = wgtcls.molds = {};
	for (var nm in molds) {
		var fn = molds[nm];
		ms[nm] = typeof fn == 'function' ? fn: fn[0].molds[fn[1]];
	}		
}


function zkamn(pkg, fn) {
	zk.load(pkg, function () {
		setTimeout(function(){
			zk.afterMount(fn);
		}, 20);
	});
}



function zkmprops(uuid, props) {
	
	var v = zk.cut(props, "z$ea");
	if (v) {
		var embed = jq(uuid, zk)[0];
		if (embed) {
			var val = [], n;
			while (n = embed.firstChild) {
				val.push(n);
				embed.removeChild(n);
			}
			props[v] = val;
		}
	}

	
	v = zk.cut(props, "z$al");
	if (v) {
		zk.afterLoad(function () {
			for (var p in v)
				props[p] = v[p](); 
		});
	}
}

(function () {
	var _wgts = [],
		_createInf0 = [], 
		_createInf1 = [], 
		_aftMounts = [], 
		_mntctx = {}, 
		_qfns = {}, 
		_paci = {s: 0, e: -1, f0: [], f1: []}; 

	
	
	
	
	
	
	
	_paci.i = setInterval(function () {
		var stateless;
		if ((zk.booted && !zk.mounting) || (stateless = _stateless()))
			if (stateless || _paci.s == _paci.e) { 
				clearInterval(_paci.i);
				var fs = _paci.f0.concat(_paci.f1);
				_paci = null;
				for (var f; f = fs.shift();)
					f();
			} else
				_paci.e = _paci.s;
	}, 25);
	
	zk._apac = function (fn, bCmd) {
		if (_paci)
			return _paci[bCmd ? "f0": "f1"].push(fn);
		fn();
	};
	function _stateless() {
		var dts = zk.Desktop.all;
		for (var dtid in dts)
			if (dts[dtid].stateless) return true;
	}



	
	

	zk.afterMount = function (fn) { 
		if (fn)  {
			if (zk.mounting)
				return _aftMounts.push(fn); 
			if (zk.loading)
				return zk.afterLoad(fn);
			if (!jq.isReady)
				return jq(fn);
			setTimeout(fn, 0);
		}
	};

	function _curdt() {
		return _mntctx.curdt || (_mntctx.curdt = zk.Desktop.$());
	}
	
	function mountpkg() {
		for (var j = _createInf0.length; j--;) {
			var inf = _createInf0[j];
			if (!inf.pked) { 
				inf.pked = true;
				pkgLoad(inf[0], inf[1]);
			}
		}
	}
	
	function pkgLoad(dt, wi) {
		
		var v = zk.cut(wi[2], "z$pk");
		if (v) zk.load(v);

		var type = wi[0];
		if (type) { 
			if (type === 1) 
				wi[0] = type = "zhtml.Widget";
			var j = type.lastIndexOf('.');
			if (j >= 0)
				zk.load(type.substring(0, j), dt);
		}

		for (var children = wi[3], j = children.length; j--;)
			pkgLoad(dt, children[j]);
	}
	
	function mtBL() {
		if (zk.loading) {
			zk.afterLoad(mtBL);
			return;
		}

		var inf = _createInf0.shift();
		if (inf) {
			_createInf1.push([inf[0], create(inf[3]||inf[0], inf[1], true), inf[2]]);
				
				
				
	
			if (_createInf0.length)
				return run(mtBL);
		}

		mtBL0();
	}
	function mtBL0() {
		for (;;) {
			if (_createInf0.length)
				return; 

			if (zk.loading) {
				zk.afterLoad(mtBL0);
				return;
			}

			var inf = _createInf1.shift();
			if (!inf) break;

			var wgt = inf[1];
			if (inf[2])
				wgt.bind(inf[0]); 
			else
				wgt.replaceHTML('#' + wgt.uuid, inf[0]);
		}

		mtBL1();
	}
	function mtBL1() {
		if (_createInf0.length || _createInf1.length)
			return; 

		zk.booted = true;
		zk.mounting = false;
		doAfterMount(mtBL1);
		_paci && ++_paci.s;
		zk.endProcessing();

		zk.bmk.onURLChange();
		if (zk.pfmeter) {
			var dts = zk.Desktop.all;
			for (var dtid in dts)
				zAu._pfdone(dts[dtid], dtid);
		}
	}

	
	function mtAU() {
		if (zk.loading) {
			zk.afterLoad(mtAU);
			return;
		}

		var inf = _createInf0.shift();
		if (inf) {
			var stub = inf[4][0], filter = inf[4][1],
				Widget = zk.Widget,
				old$, wgt;

			if (filter) {
				old$ = Widget.$;
				Widget.$ = function (n, opts) {
					return filter(old$(n, opts));
				}
			}
			try {
				wgt = create(null, inf[1]);
			} finally {
				if (filter) Widget.$ = old$;
			}

			stub(wgt);
			if (_createInf0.length)
				return run(mtAU); 
		}

		mtAU0();
	}
	function mtAU0() {
		zk.mounting = false;
		doAfterMount(mtAU0);

		zAu._doCmds(); 
		doAfterMount(mtAU0);
	}
	function doAfterMount(fnext) {
		for (var fn; fn = _aftMounts.shift();) {
			fn();
			if (zk.loading) {
				zk.afterLoad(fnext); 
				return true; 
			}
		}
	}

	function doAuCmds(cmds) {
		if (cmds && cmds.length)
			zk._apac(function () {
				for (var j = 0; j < cmds.length; j += 2)
					zAu.process(cmds[j], cmds[j + 1]);
			}, true);
	}

	
	function create(parent, wi, ignoreDom) {
		var wgt,
			type = wi[0],
			uuid = wi[1],
			props = wi[2]||{};
		if (type === 0) { 
			wgt = new zk.Page({uuid: uuid}, zk.cut(props, "ct"));
			wgt.inServer = true;
			if (parent) parent.appendChild(wgt, ignoreDom);
		} else {
			var cls = zk.$import(type),
				initOpts = {uuid: uuid},
				v = wi[4]; 
			if (!cls)
				throw 'Unknown widget: ' + type;
			if (v) initOpts.mold = v;
			wgt = new cls(initOpts);
			wgt.inServer = true;
			if (parent) parent.appendChild(wgt, ignoreDom);

			zkmprops(uuid, props);
		}

		for (var nm in props)
			wgt.set(nm, props[nm]);

		for (var j = 0, childs = wi[3], len = childs.length;
		j < len; ++j)
			create(wgt, childs[j]);
		return wgt;
	}

	
	function run(fn) {
		var t = zUtl.now(), dt = t - zk._t1;
		if (dt > 2500) { 
			zk._t1 = t;
			dt >>= 6;
			setTimeout(fn, dt < 10 ? dt: 10); 
				
		} else
			fn();
	}

  zk.copy(window, {
	
	zkdt: function (dtid, contextURI, updateURI, reqURI) {
		var dt = zk.Desktop.$(dtid);
		if (dt == null) {
			dt = new zk.Desktop(dtid, contextURI, updateURI, reqURI);
			if (zk.pfmeter) zAu._pfrecv(dt, dtid);
		} else {
			if (updateURI != null) dt.updateURI = updateURI;
			if (contextURI != null) dt.contextURI = contextURI;
			if (reqURI != null) dt.requestPath = reqURI;
		}
		_mntctx.curdt = dt;
		return dt;
	},

	
	zkx: function (wi, extra, aucmds, js) { 
		zk.mounting = true;

		if (js) jq.globalEval(js);
		doAuCmds(aucmds);

		var delay, mount = mtAU, owner;
		if (!extra || !extra.length) { 
			delay = extra;
			extra = null;
			mount = mtBL;
		}

		if (wi) {
			if (wi[0] === 0) { 
				var props = wi[2];
				zkdt(zk.cut(props, "dt"), zk.cut(props, "cu"), zk.cut(props, "uu"), zk.cut(props, "ru"))
					._pguid = wi[1];
				if (owner = zk.cut(props, "ow"))
					owner = zk.Widget.$(owner);
			}

			_createInf0.push([_curdt(), wi, _mntctx.binding, owner, extra]);

			mountpkg();
		}

		if (delay) setTimeout(mount, 0); 
		else run(mount);
	},
	
	zkx_: function (args, stub, filter) {
		zk._t1 = zUtl.now(); 
		args[1] = [stub, filter]; 
		zkx.apply(window, args);
	},

	
	
	zkq: function (id, fn) {
		_qfns[id] = fn;
	},
	
	zkqx: function (id) {
		var fn = _qfns[id];
		if (fn) {
			delete _qfns[id];
			fn(id);
		}	
	},

	
	zkac: function () {
		doAuCmds(arguments);
	},

	
	zkmb: function (binding) {
		zk.mounting = true;
		_mntctx.binding = binding;
		var t = 390 - (zUtl.now() - zk._t1); 
		zk.startProcessing(t > 0 ? t: 0);
	},
	
	zkme: function () {
		_wgts = [];
		_mntctx.curdt = null;
		_mntctx.binding = false;
	}
  });

})(window);


jq(function() {
	var _bfUploads = [],
		_reszInf = {},
		_oldBfUnload;

	
	zk.copy(zk, {
		
		beforeUnload: function (fn, opts) { 
			if (opts && opts.remove) _bfUploads.$remove(fn);
			else _bfUploads.push(fn);
		}
	});

	function _doEvt(wevt) {
		var wgt = wevt.target;
		if (wgt && !wgt.$weave) {
			var en = wevt.name;
			if (en == 'onClick' || en == 'onRightClick') {
				wgt.doSelect_(wevt);
				if (wevt.stopped)
					en = null; 
			}
			if (en)
				wgt['do' + en.substring(2) + '_'].call(wgt, wevt);
			if (wevt.domStopped)
				wevt.domEvent.stop();
		}
	}
	
	function _docMouseDown(evt, wgt, noFocusChange) {
		zk.clickPointer[0] = evt.pageX;
		zk.clickPointer[1] = evt.pageY;

		if (!wgt) wgt = evt.target;

		var target = evt.domTarget,
			body = document.body,
			old = zk.currentFocus;
		if ((target != body && target != body.parentNode) ||
				(evt.pageX < body.clientWidth && evt.pageY < body.clientHeight)) 
			zk.Widget.mimicMouseDown_(wgt, noFocusChange); 
			
		_doEvt(evt);
		
		
		if (old && zk.ie) {
			var n = jq(old)[0];
			if (n)
				setTimeout(function () {
					try {
						var cf = zk.currentFocus;
						if (cf != old && !n.offsetWidth && !n.offsetHeight)
							cf.focus();
					} catch (e) {}
				});
		}
	}
	
	function _docResize() {
		if (!_reszInf.time) return; 

		var now = zUtl.now();
		if (zk.mounting || zk.loading || now < _reszInf.time || zk.animating()) {
			setTimeout(_docResize, 10);
			return;
		}

		_reszInf.time = null; 
		_reszInf.lastTime = now + 1000;
			

		if (!zk.light) zAu._onClientInfo();

		_reszInf.inResize = true;
		try {
			zWatch.fire('beforeSize'); 
			zWatch.fire('onSize'); 
			_reszInf.lastTime = zUtl.now() + 8;
		} finally {
			_reszInf.inResize = false;
		}
	}

	jq(document)
	.keydown(function (evt) {
		var wgt = zk.Widget.$(evt, {child:true});
		if (wgt) {
			var wevt = new zk.Event(wgt, 'onKeyDown', evt.keyData(), null, evt);
			_doEvt(wevt);
			if (!wevt.stopped && wgt.afterKeyDown_) {
				wgt.afterKeyDown_(wevt);
    			if (wevt.domStopped)
    				wevt.domEvent.stop();
			}
		}

		if (evt.keyCode == 27
		&& (zk._noESC > 0 || (!zk.light && zAu.shallIgnoreESC()))) 
			return false; 
	})
	.keyup(function (evt) {
		var wgt = zk.keyCapture;
		if (wgt) zk.keyCapture = null;
		else wgt = zk.Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onKeyUp', evt.keyData(), null, evt));
	})
	.keypress(function (evt) {
		var wgt = zk.keyCapture;
		if (!wgt) wgt = zk.Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onKeyPress', evt.keyData(), null, evt));
	})
	.mousedown(function (evt) {
		var wgt = zk.Widget.$(evt, {child:true});
		_docMouseDown(
			new zk.Event(wgt, 'onMouseDown', evt.mouseData(), null, evt),
			wgt);
	})
	.mouseup(function (evt) {
		var e = zk.Draggable.ignoreMouseUp(), wgt;
		if (e === true)
			return; 

		if (e != null) {
			_docMouseDown(e, null, true); 

			
			if ((wgt = e.target) && wgt != zk.currentFocus)
				try {wgt.focus();} catch (e) {}
				
		}

		wgt = zk.mouseCapture;
		if (wgt) zk.mouseCapture = null;
		else wgt = zk.Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onMouseUp', evt.mouseData(), null, evt));
	})
	.mousemove(function (evt) {
		zk.currentPointer[0] = evt.pageX;
		zk.currentPointer[1] = evt.pageY;

		var wgt = zk.mouseCapture;
		if (!wgt) wgt = zk.Widget.$(evt, {child:true});
		_doEvt(new zk.Event(wgt, 'onMouseMove', evt.mouseData(), null, evt));
	})
	.mouseover(function (evt) {
		zk.currentPointer[0] = evt.pageX;
		zk.currentPointer[1] = evt.pageY;

		_doEvt(new zk.Event(zk.Widget.$(evt, {child:true}), 'onMouseOver', evt.mouseData(), {ignorable:1}, evt));
	})
	.mouseout(function (evt) {
		_doEvt(new zk.Event(zk.Widget.$(evt, {child:true}), 'onMouseOut', evt.mouseData(), {ignorable:1}, evt));
	})
	.click(function (evt) {
		if (zk.Draggable.ignoreClick()) return;

		zjq._fixClick(evt);

		if (evt.which == 1)
			_doEvt(new zk.Event(zk.Widget.$(evt, {child:true}),
				'onClick', evt.mouseData(), {ctl:true}, evt));
			
	})
	.dblclick(function (evt) {
		if (zk.Draggable.ignoreClick()) return;

		var wgt = zk.Widget.$(evt, {child:true});
		if (wgt) {
			var wevt = new zk.Event(wgt, 'onDoubleClick', evt.mouseData(), {ctl:true}, evt);
			_doEvt(wevt);
			if (wevt.domStopped)
				return false;
		}
	})
	.bind("contextmenu", function (evt) {
		zk.clickPointer[0] = evt.pageX;
		zk.clickPointer[1] = evt.pageY;

		var wgt = zk.Widget.$(evt, {child:true});
		if (wgt) {
			var wevt = new zk.Event(wgt, 'onRightClick', evt.mouseData(), {ctl:true}, evt);
			_doEvt(wevt);
			if (wevt.domStopped)
				return false;
		}
		return !zk.ie || evt.returnValue;
	});

	jq(window).resize(function () {
		if (zk.mounting)
			return; 

	
	
	
	
	
	
	
	

		var now = zUtl.now();
		if ((_reszInf.lastTime && now < _reszInf.lastTime) || _reszInf.inResize)
			return; 

		var delay = zk.ie ? 250: 50;
		_reszInf.time = now + delay - 1; 
		setTimeout(_docResize, delay);
	})
	.scroll(function () {
		zWatch.fire('onScroll'); 
	})
	.unload(function () {
		zk.unloading = true; 

		
		
		
		
		
		var bRmDesktop = !zk.opera && !zk.keepDesktop && !zk.light;
		if (bRmDesktop || zk.pfmeter) {
			try {
				var dts = zk.Desktop.all;
				for (var dtid in dts) {
					var dt = dts[dtid];
					jq.ajax(zk.$default({
						url: zk.ajaxURI(null, {desktop:dt,au:true}),
						data: {dtid: dtid, cmd_0: bRmDesktop?"rmDesktop":"dummy", opt_0: "i"},
						beforeSend: function (xhr) {
							if (zk.pfmeter) zAu._pfsend(dt, xhr, true);
						}
					}, zAu.ajaxSettings));
				}
			} catch (e) { 
			}
		}
	});

	_oldBfUnload = window.onbeforeunload;
	window.onbeforeunload = function () {
		if (!zk.skipBfUnload) {
			if (zk.confirmClose)
				return zk.confirmClose;

			for (var j = 0; j < _bfUploads.length; ++j) {
				var s = _bfUploads[j]();
				if (s) return s;
			}
		}

		if (_oldBfUnload) {
			var s = _oldBfUnload.apply(window, arguments);
			if (s) return s;
		}

		zk.unloading = true; 
		
	};
}); 












(function ($) {

    function f(n) {
        
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.valueOf() ? this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,

        meta = {    
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {






        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {



        var i,          
            k,          
            v,          
            length,
            mind = gap,
            partial,
            value = holder[key];



        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }




        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }



        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':



            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':





            return String(value);




        case 'object':




            if (!value) {
                return 'null';
            }




            partial = [];



            if (Object.prototype.toString.apply(value) === '[object Array]') {




                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }




                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }


                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }




            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }




        $.toJSON = function (value, replacer) {

            var i;
            gap = '';





            rep = replacer;





            return str('', {'': value});
        };

	$.evalJSON = function (s) {
		return (new Function('return (' + s +')'))(); 
		
	};

}(jq)); 

}(function(){zk._p=zkpi('zk.fmt',true);try{
(function () {
	function down(valStr, ri) {
		return valStr.substring(0, ri);
	}
	function up(valStr, ri) {
		var k = 1, val = '';
		for (var j = ri; k && --j >= 0;) {
			var ch = valStr.charAt(j);
			if (k == 1) {
				if (ch >= '0' && ch < '9') {
					ch = ch.$inc(1);
					k = 0;
				} else if (ch == '9')
					ch = '0';
			}
			val = ch + val;
		}
		if (j >= 0)
			val = valStr.substring(0, j) + val;
		return k ? '1'+val : val;
	}
zk.fmt.Number = {
	format: function (fmt, val, rounding) {
		if (val == null) return '';
		if (!fmt) return '' + val;
		
		var isMINUS;
		if (fmt.indexOf(';') != -1) {
			fmt = fmt.split(';');
			isMINUS = (''+val).charAt(0) == '-';
			fmt = fmt[isMINUS ? 1 : 0];
		}
		
		
		var efmt = this._escapeQuote(fmt);
		fmt = efmt.fmt;
		var pureFmtStr = efmt.pureFmtStr,
			ind = efmt.purejdot,
			fixed = ind >= 0 ? pureFmtStr.length - ind - 1 : 0,
			valStr = (val + '').replace(/[^0123456789.]/g, ''),
			indVal = valStr.indexOf('.'),
			valFixed = indVal >= 0 ? valStr.length - indVal - 1 : 0,
			shift = efmt.shift;
			
		if (shift > 0) {
			if (indVal >= 0) { 
				if (valFixed > shift) {
					valStr = valStr.substring(0, indVal) + valStr.substring(indVal+1, indVal+1+shift) + '.' + valStr.substring(indVal+1+shift);
					valFixed -= shift;
					indVal += shift;
				} else {
					valStr = valStr.substring(0, indVal) + valStr.substring(indVal+1);
					for(var len = shift - valFixed; len-- > 0;)
						valStr = valStr + '0';
					indVal = -1;
					valFixed = 0;
				}
			} else { 
				for(var len = shift; len-- > 0;)
					valStr = valStr + '0';
			}
		}
			
		
		if (valFixed <= fixed) {
			if (indVal == -1)
				valStr += '.';
			for(var len = fixed - valFixed; len-- > 0;)
				valStr = valStr + '0';
		} else { 
			var ri = indVal + fixed + 1;
			switch(rounding) {
				case 0: 
					valStr = up(valStr, ri);
					break;
				case 1: 
					valStr = down(valStr, ri);
					break;
				case 2: 
					valStr = val < 0 ? down(valStr, ri) : up(valStr, ri);
					break;
				case 3: 
					valStr = val >= 0 ? down(valStr, ri) : up(valStr, ri);
					break;
				case 4: 
					var h = Math.pow(10, valFixed - fixed) * 5,
						r = valStr.substring(indVal + fixed + 1) | 0;
					valStr = r < h ? down(valStr, ri) : up(valStr, ri);
					break;
				case 5: 
					var h = Math.pow(10, valFixed - fixed) * 5,
						r = valStr.substring(indVal + fixed + 1) | 0;
					valStr = r <= h ? down(valStr, ri) : up(valStr, ri);
					break;
				case 6: 
					
				default:
					var h = Math.pow(10, valFixed - fixed - 1) * 5,
						r = valStr.substring(indVal + fixed + 1) | 0;
					if (r == h) { 
						var evenChar = valStr.charAt(fixed == 0 ? indVal - 1 : indVal + fixed);
						valStr = (evenChar & 1) ? up(valStr, ri) : down(valStr, ri);
					} else
						valStr = r < h ? down(valStr, ri) : up(valStr, ri);
			}
		}
		var indFmt = efmt.jdot,
			pre = '', suf = '';
		
		
		indVal = valStr.indexOf('.');
		if (indVal == -1) 
			indVal = valStr.length;
		if (indFmt == -1) 
			indFmt = fmt.length;
		if (ind == -1)
			ind = pureFmtStr.length;
		
		
		var prefmt = indVal - ind;
		if (prefmt > 0) {
			var xfmt = '';
			for (var len = prefmt; --len >= 0; indFmt++)
				xfmt += '#';
		
			
    		var beg = this._extraFmtIndex(fmt);
    		prefmt += beg;
    		fmt = fmt.substring(0, beg) + xfmt + fmt.substring(beg, fmt.length);
		}
		for (var len = ind - indVal; --len >= 0; indVal++)
			valStr = '0' + valStr;
		
		var groupDigit = indFmt - fmt.substring(0, indFmt).lastIndexOf(',');
			
		for (var g = 1, i = indFmt - 1, j = indVal - 1; i >= 0 && j >= 0;) {
			if (g % groupDigit == 0 && pre.charAt(0) != ',') {
				pre = zk.GROUPING + pre;
				g++;
			}
			var fmtcc = fmt.charAt(i); 
			if (fmtcc == '#' || fmtcc == '0') {
				var cc = valStr.charAt(j);
				pre = (cc == '0' ? fmtcc : cc) + pre;
				i--;
				j--;
				g++;
			} else {
				var c = fmt.charAt(i);
				if (c != ',') {
					pre = c + pre;
					g++;
				}
				i--;
			}
		}
		if (j >= 0) 
			pre = valStr.substr(0, j + 1) + pre;
		
		
		var len = (indFmt < 0 ? fmt.length : indFmt) - (ind < 0 ? pureFmtStr.length : ind),
			prej = efmt.prej;
		if (len > 0) {
			var p = fmt.substring(prej, prefmt > 0 ? prefmt : len).replace(new RegExp("[#0.,]", 'g'), '');
			if (p)
				pre = p + pre;
		}
		
		for (var i = indFmt + 1, j = indVal + 1, fl = fmt.length, vl = valStr.length; i < fl; i++) {
			var fmtcc = fmt.charAt(i); 
			if (fmtcc == '#' || fmtcc == '0') {
				if (j < vl) {
					suf += valStr.charAt(j);
					j++;
				}
			} else
				suf += fmtcc == '%' ? zk.PERCENT : fmtcc;
		}
		if (j < valStr.length) 
			suf = valStr.substr(j, valStr.length);
		
		
		var e = -1;
		for (var m = suf.length, n = fmt.length; m > 0; --m) {
			var cc = suf.charAt(m-1),
				fmtcc = fmt.charAt(--n); 
			if (cc == '0' &&  fmtcc == '#') { 
				if (e < 0) e = m;
			} else if (e >= 0)
				break;
		}
		if (e >= 0)
			suf = suf.substring(0, m) + suf.substring(e);
		
		
		if (pre)
			pre = fmt.substring(0, prej) + this._removePrefixSharps(pre);
		if (!pre && fmt.charAt(indFmt+1) == '#')
			pre = '0';
		return (val < 0 && !isMINUS? zk.MINUS : '') + (suf ? pre + (/[\d]/.test(suf.charAt(0)) ? zk.DECIMAL : '') + suf : pre);
	},
	_escapeQuote: function (fmt) {
		
		var cc, q = -2, shift = 0, ret = '', jdot = -1, purejdot = -1, pure = '', prej= -1,
			validPercent = fmt ? !new RegExp('\(\'['+zk.PERCENT+'|'+zk.PER_MILL+']+\'\)', 'g').test(fmt) : true; 
			
		for (var j = 0, len = fmt.length; j < len; ++j) {
			cc = fmt.charAt(j);
			if (cc == '%' && validPercent)
				shift += 2;
			else if (cc == zk.PER_MILL && validPercent)
				shift += 3;
			
			if (cc == '\'') { 
				if (q >= 0) {
					ret += q == (j-1) ? '\'' : fmt.substring(q+1, j);
					q = -2;
				} else
					q = j; 
			} else if (q < 0) { 
				if (prej < 0 
					&& (cc == '#' || cc == '0' || cc == '.' || cc == '-' || cc == ',' || cc == 'E'))
					prej = ret.length;
					
				if (cc == '#' || cc == '0')
					pure += cc;
				else if(cc == '.') {
					if (purejdot < 0) 
						purejdot = pure.length;
					if (jdot < 0) 
						jdot = ret.length;
					pure += cc;
				}
				ret += cc;
			}
		}
		return {shift:shift, fmt:ret, pureFmtStr: pure, jdot:jdot, purejdot:purejdot, prej:prej};
	},
	_extraFmtIndex: function (fmt) {
		var j = 0;
		for(var len=fmt.length; j < len; ++j) {
			var c = fmt.charAt(j);
			if (c == '#' || c == '0' || c == ',')
				break;
		}
		return j;
	},	
	_removePrefixSharps: function (val) {
		var ret = '',
			sharp = true;
		for(var len = val.length, j=0; j < len; ++j) {
			var cc = val.charAt(j);
			if (sharp) {
				if (cc == '#' || cc == zk.GROUPING) continue;
				else if (/[\d]/.test(cc)) sharp = false; 
			}
			ret = ret + (cc == '#' ? '0' : cc);
		}
		return ret;
	},
	unformat: function (fmt, val) {
		if (!val) return {raw: val, divscale: 0};

		var divscale = 0, 
			minus, sb, cc, ignore,
			zkMinus = fmt ? zk.MINUS : '-',
			zkDecimal = fmt ? zk.DECIMAL : '.', 
			validPercent = fmt ? !new RegExp('\(\'['+zk.PERCENT+'|'+zk.PER_MILL+']+\'\)', 'g').test(fmt) : true; 
				
		for (var j = 0, len = val.length; j < len; ++j) {
			cc = val.charAt(j);
			ignore = true;

			
			if (cc == zk.PERCENT && validPercent) divscale += 2;
			else if (cc == zk.PER_MILL && validPercent) divscale += 3;
			else if (cc == '(') minus = true;
			else if (cc != '+') ignore = false;

			
			if (!ignore)
				ignore = (cc < '0' || cc > '9')
				&& cc != zkDecimal && cc != zkMinus && cc != '+'
				&& (zUtl.isChar(cc,{whitespace:1}) || cc == zk.GROUPING
					|| cc == ')' || (fmt && fmt.indexOf(cc) >= 0));
			if (ignore) {
				if (sb == null) sb = val.substring(0, j);
			} else {
				var c2 = cc == zkMinus ? '-':
					cc == zkDecimal ? '.':  cc;
				if (cc != c2 && sb == null)
					sb = val.substring(0, j);
				if (sb != null) sb += c2;
			}
		}
		if (sb == null) sb = val;
		if (minus) sb = '-' + sb;
		for (;;) {
			cc = sb.charAt(0);
			if (cc == '+')
				sb = sb.substring(1);
			else if (cc == '-' && sb.charAt(1) == '-')
				sb = sb.substring(2);
			else
				break;
		}

		
		
		for (var j = 0, k, len = sb.length; j < len; ++j) {
			cc = sb.charAt(j);
			if (cc > '0' && cc <= '9') {
				if (k !== undefined)
					sb = sb.substring(0, k) + sb.substring(j);
				break; 
			} else if (cc == '0') {
				if (k === undefined)
					k = j;
			} else if (k !== undefined) {
				if (cc == zkDecimal && j > ++k)
					sb = sb.substring(0, k) + sb.substring(j);
				break;
			} else if (cc == zkDecimal) { 
				break;
			}
		}
		return {raw: sb, divscale: divscale};
	}
};
})();


zk.fmt.Text = {
	format: function (msg) {
		var i = 0, sb = '';
		for (var j = 0, len = msg.length, cc, k; j < len; ++j) {
			cc = msg.charAt(j);
			if (cc == '\\') {
				if (++j >= len) break;
				sb += msg.substring(i, j);
				cc = msg.charAt(j);
				switch (cc) {
				case 'n': cc = '\n'; break;
				case 't': cc = '\t'; break;
				case 'r': cc = '\r'; break;
				}
				sb += cc;
				i = j + 1;
			} else if (cc == '{') {
				k = msg.indexOf('}', j + 1);
				if (k < 0) break;
				sb += msg.substring(i, j)
					+ arguments[zk.parseInt(msg.substring(j + 1, k)) + 1];
				i = j = k + 1;
			}
		}
		if (sb) sb += msg.substring(i);
		return sb || msg;
	}
};


}finally{zk.setLoaded(zk._p.n);}})();(function(){zk._p=zkpi('zk.xml',true);try{




zk.xml.Utl = {
	
	loadXML: function (url, callback) {
		var doc = document.implementation;
		if (doc && doc.createDocument) {
			doc = doc.createDocument('', '', null); 
			if (callback)
				doc.onload = function () {callback(doc);};
		} else {
			doc = new ActiveXObject("Microsoft.XMLDOM");
			if (callback)
				doc.onreadystatechange = function() {
					if (doc.readyState == 4) callback(doc);
				};
		}
		if (!callback) doc.async = false;
		doc.load(url);
		return doc;
	},
	
	parseXML: function (text) {
		if (typeof DOMParser != "undefined")
			return (new DOMParser()).parseFromString(text, "text/xml");
			
	
		doc = new ActiveXObject("Microsoft.XMLDOM"); 
		doc.async = false;
		doc.loadXML(text);
		return doc;
	},
	
	renType: function (url, type) {
		var j = url.lastIndexOf(';');
		var suffix;
		if (j >= 0) {
			suffix = url.substring(j);
			url = url.substring(0, j);
		} else
			suffix = "";

		j = url.lastIndexOf('.');
		if (j < 0) j = url.length; 
		var	k = url.lastIndexOf('-'),
			m = url.lastIndexOf('/'),
			ext = j <= m ? "": url.substring(j),
			pref = k <= m ? j <= m ? url: url.substring(0, j): url.substring(0, k);
		if (type) type = "-" + type;
		else type = "";
		return pref + type + ext + suffix;
	},

	
	getElementValue: function (el) {
		var txt = "";
		for (el = el.firstChild; el; el = el.nextSibling)
			if (el.data) txt += el.data;
		return txt;
	}
};

}finally{zk.setLoaded(zk._p.n);}})();(function(){zk._p=zkpi('zul',true);try{
(function () {
	var $alert = jq.alert,
		icons = {QUESTION: "z-msgbox z-msgbox-question",
			EXCLAMATION: "z-msgbox z-msgbox-exclamation",
			INFORMATION: "z-msgbox z-msgbox-information",
			ERROR: "z-msgbox z-msgbox-error",
			NONE: 'z-msgbox z-msgbox-none'
		};

	function newButton(nm, f) {
		return new zul.wgt.Button({
			label: msgzul[nm.toUpperCase()]||nm,
			listeners: {
				onClick: function (evt) {
					if (typeof f == 'function')
						f.call(this, evt);
					this.$o().detach();
				}
			}
		});
	}
	function getButtons(opts) {
		var btns = [];
		for (var nm in opts) {
			var f = opts[nm];
			btns.push(newButton(nm, typeof f == 'function' ? f: null));
		}
		if (!btns.length)
			btns.push(newButton('OK'));
		return btns;
	}

	jq.alert = function (msg, opts) {
		if (opts && opts.mode == 'os')
			return $alert(msg);

		opts = opts || {};
		zk.load("zul.wnd,zul.wgt,zul.box", function () {
			var wnd = new zul.wnd.Window({
				closable: true,
				width: '250pt',
				title: opts.title||'ZK',
				border: 'normal',
				children: [
					new zul.box.Box({
						mold: 'horizontal',
						children: [
							new zul.wgt.Div({sclass: icons[(opts.icon||'').toUpperCase()]||icons.INFORMATION}),
							new zul.wgt.Div({
								sclass: 'z-messagebox',
								width: '210pt',
								children: [
									new zul.wgt.Label({
										value: msg,
										multiline: true
									})
								]
							})
						]
					}),
					new zul.wgt.Separator({bar: true}),
					new zul.box.Box({
						mold: 'horizontal',
						style: 'margin-left:auto; margin-right:auto',
						children: getButtons(opts.button)
					})
				],
				mode: opts.mode||'modal'
			});

			var p = opts.desktop || zk.Desktop.$();
			if (p && (p = p.firstChild) && p.desktop)
				p.appendChild(wnd);
			else
				jq(document.body).append(wnd);
		});
  	};
	zAu.wrongValue_ = function(wgt, msg) {
		var efs = wgt.effects_;
		if (efs.errMesg) {
			efs.errMesg.destroy();
			delete efs.errMesg;
		}
		if (msg !== false) {
			efs.errMesg = {destroy: zk.$void};
			zk.load("zul.inp", function () {
				if (efs.errMesg) 
					(efs.errMesg = new zul.inp.Errorbox()).show(wgt, msg);
			});
		}
	};
})();





(function () {
	
	var _tt_inf, _tt_tmClosing, _tt_tip, _tt_ref, _tt_params;
	function _tt_beforeBegin(ref) {
		if (_tt_tip && !_tt_tip.isOpen()) { 
			_tt_clearOpening_();
			_tt_clearClosing_();
			_tt_tip = _tt_ref = null;
		}

		var overTip = _tt_tip && zUtl.isAncestor(_tt_tip, ref);
		if (overTip) _tt_clearClosing_(); 
		return !overTip;
	}
	function _tt_begin(tip, ref, params) {
		_tt_params = params;
		if (_tt_tip != tip) {
			_tt_close_();

			_tt_inf = {
				tip: tip, ref: ref,
				timer: setTimeout(_tt_open_, params.delay !== undefined ? params.delay : zk.tipDelay)
			};
		} else if (_tt_ref == ref)
			_tt_clearClosing_();
	}
	function _tt_end(ref) {
		if (_tt_ref == ref || _tt_tip == ref)
			_tt_tmClosing =
				setTimeout(_tt_close_, 100);
			
		else
			_tt_clearOpening_();
	}
	function _tt_clearOpening_() {
		var inf = _tt_inf;
		if (inf) {
			_tt_inf = null;
			clearTimeout(inf.timer);
		}
	}
	function _tt_clearClosing_() {
		var tmClosing = _tt_tmClosing;
		if (tmClosing) {
			_tt_tmClosing = null;
			clearTimeout(tmClosing);
		}
	}
	function _tt_open_() {
		var inf = _tt_inf;
		if (inf) {
			_tt_tip = inf.tip,
			_tt_ref = inf.ref;
			_tt_inf = null;
			var params = _tt_params,
				xy = params.x !== undefined ? [params.x, params.y]
							: zk.currentPointer;
			_tt_tip.open(_tt_ref, xy, params.position ? params.position : params.x === null ? "after_pointer" : null, {sendOnOpen:true});
		}
	}
	function _tt_close_() {
		_tt_clearOpening_();
		_tt_clearClosing_();

		var tip = _tt_tip;
		if (tip) {
			_tt_tip = _tt_ref = null;
			tip.close({sendOnOpen:true});
		}
	}


zul.Widget = zk.$extends(zk.Widget, {
	
	getContext: function () {
		return this._context;
	},
	
	
	setContext: function (context) {
		if (zk.Widget.isInstance(context))
			context = 'uuid(' + context.uuid + ')';
		this._context = context;
		return this;
	},
	
	getPopup: function () {
		return this._popup;
	},
	
	
	setPopup: function (popup) {
		if (zk.Widget.isInstance(popup))
			popup = 'uuid(' + popup.uuid + ')';
		this._popup = popup;
		return this;
	},
	
	getTooltip: function () {
		return this._tooltip;
	},
	
	
	setTooltip: function (tooltip) {
		if (zk.Widget.isInstance(tooltip))
			tooltip = 'uuid(' + tooltip.uuid + ')';
		this._tooltip = tooltip;
		return this;
	},
	
	getCtrlKeys: function () {
		return this._ctrlKeys;
	},
	
	setCtrlKeys: function (keys) {
		if (this._ctrlKeys == keys) return;
		if (!keys) {
			this._ctrlKeys = this._parsedCtlKeys = null;
			return;
		}

		var parsed = [{}, {}, {}, {}, {}], 
			which = 0;
		for (var j = 0, len = keys.length; j < len; ++j) {
			var cc = keys.charAt(j); 
			switch (cc) {
			case '^':
			case '$':
			case '@':
				if (which)
					throw "Combination of Shift, Alt and Ctrl not supported: "+keys;
				which = cc == '^' ? 1: cc == '@' ? 2: 3;
				break;
			case '#':
				var k = j + 1;
				for (; k < len; ++k) {
					var c2 = keys.charAt(k);
					if ((c2 > 'Z' || c2 < 'A') 	&& (c2 > 'z' || c2 < 'a')
					&& (c2 > '9' || c2 < '0'))
						break;
				}
				if (k == j + 1)
					throw "Unexpected character "+cc+" in "+keys;

				var s = keys.substring(j+1, k).toLowerCase();
				if ("pgup" == s) cc = 33;
				else if ("pgdn" == s) cc = 34;
				else if ("end" == s) cc = 35;
				else if ("home" == s) cc = 36;
				else if ("left" == s) cc = 37;
				else if ("up" == s) cc = 38;
				else if ("right" == s) cc = 39;
				else if ("down" == s) cc = 40;
				else if ("ins" == s) cc = 45;
				else if ("del" == s) cc = 46;
				else if (s.length > 1 && s.charAt(0) == 'f') {
					var v = zk.parseInt(s.substring(1));
					if (v == 0 || v > 12)
						throw "Unsupported function key: #f" + v;
					cc = 112 + v - 1;
				} else
					throw "Unknown #"+s+" in "+keys;

				parsed[which][cc] = true;
				which = 0;
				j = k - 1;
				break;
			default:
				if (!which || ((cc > 'Z' || cc < 'A') 
				&& (cc > 'z' || cc < 'a') && (cc > '9' || cc < '0')))
					throw "Unexpected character "+cc+" in "+keys;
				if (which == 3)
					throw "$a - $z not supported (found in "+keys+"). Allowed: $#f1, $#home and so on.";

				if (cc <= 'z' && cc >= 'a')
					cc = cc.toUpperCase();
				parsed[which][cc.charCodeAt(0)] = true;
				which = 0;
				break;
			}
		}

		this._parsedCtlKeys = parsed;
		this._ctrlKeys = keys;
		return this;
	},

	_parsePopParams: function (txt) {
		var params = {},
			index = txt.indexOf(','),
			start = txt.indexOf('='),
			t = txt;
		if (start != -1)
			t = txt.substring(0, txt.substring(0, start).lastIndexOf(','));
		
		if (index != -1) {
			params.id = t.substring(0, index).trim();
			var t2 = t.substring(index + 1, t.length);
			if (t2)
				params.position = t2.trim();				
			
			zk.copy(params, zUtl.parseMap(txt.substring(t.length, txt.length)));
		} else
			params.id = txt.trim();
		
		if (params.x)
			params.x = zk.parseInt(params.x);
		if (params.y)
			params.y = zk.parseInt(params.y);
		if (params.delay)
			params.delay = zk.parseInt(params.delay);
		return params;
	},
	
	doClick_: function (evt, popupOnly) {
		if (!this.shallIgnoreClick_(evt) && !evt.contextSelected) {
			var params = this._popup ? this._parsePopParams(this._popup) : {},
				popup = this._smartFellow(params.id);
			if (popup) {
				evt.contextSelected = true;
				
				
				var self = this,
					xy = params.x !== undefined ? [params.x, params.y]
							: [evt.pageX, evt.pageY];
				setTimeout(function() {
					popup.open(self, xy, params.position ? params.position : null, {sendOnOpen:true});
				}, 0);
				evt.stop({dom:true});
			}
		}
		if (popupOnly !== true)
			this.$supers('doClick_', arguments);
	},
	doRightClick_: function (evt) {
		if (!this.shallIgnoreClick_(evt) && !evt.contextSelected) {
			var params = this._context ? this._parsePopParams(this._context) : {},
				ctx = this._smartFellow(params.id);
			if (ctx) {
				evt.contextSelected = true;
				
				
				var self = this,
					xy = params.x !== undefined ? [params.x, params.y]
							: [evt.pageX, evt.pageY];
				setTimeout(function() {
					ctx.open(self, xy, params.position ? params.position : null, {sendOnOpen:true}); 
				}, 0);
				evt.stop({dom:true}); 
			}
		}
		this.$supers('doRightClick_', arguments);
	},
	doTooltipOver_: function (evt) {
		if (!evt._tiped && _tt_beforeBegin(this)) {
			var params = this._tooltip ? this._parsePopParams(this._tooltip) : {},
				tip = this._smartFellow(params.id);
			if (tip) {
				evt._tiped = true;
				_tt_begin(tip, this, params);
			}
		}
	},
	doTooltipOut_: function (evt) {
		_tt_end(this);
	},
	doMouseOver_: function (evt) {
		this.doTooltipOver_(evt);
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		this.doTooltipOut_(evt);
		this.$supers('doMouseOut_', arguments);
	},
	_smartFellow: function (id) {
		return id ? id.startsWith('uuid(') && id.endsWith(')') ?
			zk.Widget.$(id.substring(5, id.length - 1)):
			this.$f(id, true): null;
	},
	
	afterKeyDown_: function (evt) {
		var keyCode = evt.keyCode, evtnm = "onCtrlKey", okcancel;
		switch (keyCode) {
		case 13: 
			var target = evt.domTarget, tn = jq.nodeName(target);
			if (tn == "textarea" || (tn == "button"
			
			&& (!target.id || !target.id.endsWith('-a')))
			|| (tn == "input" && target.type.toLowerCase() == "button"))
				return; 
			okcancel = evtnm = "onOK";
			break;
		case 27: 
			okcancel = evtnm = "onCancel";
			break;
		case 16: 
		case 17: 
		case 18: 
			return;
		case 45: 
		case 46: 
			break;
		default:
			if ((keyCode >= 33 && keyCode <= 40) 
			|| (keyCode >= 112 && keyCode <= 123) 
			|| evt.ctrlKey || evt.altKey)
				break;
			return;
		}

		var target = evt.target, wgt = target;
		for (;; wgt = wgt.parent) {
			if (!wgt) return;
			if (!wgt.isListen(evtnm, {any:true})) continue;

			if (okcancel)
				break;

			var parsed = wgt._parsedCtlKeys;
			if (parsed
			&& parsed[evt.ctrlKey ? 1: evt.altKey ? 2: evt.shiftKey ? 3: 0][keyCode])
				break; 
		}

		for (var w = target;; w = w.parent) {
			if (w.beforeCtrlKeys_ && w.beforeCtrlKeys_(evt))
				return;

			if (w == wgt) break;
		}

		wgt.fire(evtnm, zk.copy({reference: target}, evt.data),
			{ctl: true});
		evt.stop();
		

		
		if (zk.ie && keyCode == 112) {
			zk._oldOnHelp = window.onhelp;
			window.onhelp = function () {return false;}
			setTimeout(function () {window.onhelp = zk._oldOnHelp; zk._oldOnHelp = null;}, 200);
		}
	},
	
	beforeCtrlKeys_: function (evt) {
	}
});

})();


zul.LabelImageWidget = zk.$extends(zul.Widget, {
	_label: '',

	$define: {
		
		
		label: function () {
			this.updateDomContent_();
		},
		
		
		image: function (v) {
			var n = this.getImageNode();
			if (n) n.src = v || '';
			else (this.desktop) 
				this.updateDomContent_();
		},
		
		
		hoverImage: null
	},
	
	updateDomContent_: function () {
		this.rerender();
	},
	
	domImage_: function () {
		var img = this._image;
		return img ? '<img src="' + img + '" align="absmiddle" />': '';
	},
	
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel());
	},
	
	domContent_: function () {
		var label = this.domLabel_(),
			img = this.domImage_();
		return img ? label ? img + ' ' + label: img: label;
	},
	doMouseOver_: function () {
		var himg = this._hoverImage;
		if (himg) {
			var n = this.getImageNode();
			if (n) n.src = himg;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function () {
		if (this._hoverImage) {
			var n = this.getImageNode();
			if (n) n.src = this._image;
		}
		this.$supers('doMouseOut_', arguments);
	},
	
	getImageNode: function () {
		if (!this._eimg && this._image) {
			var n = this.$n();
			if (n) this._eimg = jq(n).find('img:first')[0];
		}
		return this._eimg;
	},
	
	clearCache: function () {
		this._eimg = null;
		this.$supers('clearCache', arguments);
	}
});



zul.Auxbutton = zk.$extends(zk.Object, {
	
	$init: function (wgt, btn, ref) {
		this._wgt = wgt;
		this._btn = btn;
		this._ref = ref;

		var $btn = jq(btn);
		$btn.zk.disableSelection();

		if (!wgt.$weave)
			$btn.mouseover(this.proxy(this._domOver))
				.mouseout(this.proxy(this._domOut))
				.mousedown(this.proxy(this._domDown));
	},
	
	cleanup: function () {
		var $btn = jq(this._btn);

		$btn.zk.enableSelection();

		if (!this._wgt.$weave)
			$btn.unbind('mouseover', this.proxy(this._domOver))
				.unbind('mouseout', this.proxy(this._domOut))
				.unbind('mousedown', this.proxy(this._domDown));
	},
	_domOver: function () {
		var wgt = this._wgt,
			inp = wgt.getInputNode(),
			zcls = wgt.getZclass(),
			inRoundedMold = wgt.inRoundedMold();
		
		if (!wgt.isDisabled() && !zk.dragging) {
		
			if (inRoundedMold && !wgt._buttonVisible) return;
			
			jq(this._btn).addClass(zcls + "-btn-over");
			
			if (inRoundedMold && !jq(inp).hasClass(zcls + '-text-invalid'))
				jq(inp).addClass(zcls + "-inp-over");
		}
	},
	_domOut: function () {
		var wgt = this._wgt,
			zcls = wgt.getZclass();
		if (!wgt.isDisabled() && !zk.dragging) {
			jq(this._btn).removeClass(zcls + "-btn-over");
			jq(wgt.getInputNode()).removeClass(zcls + "-inp-over");
		}
	},
	_domDown: function () {
		var wgt = this._wgt,
			inp = wgt.getInputNode(),
			zcls = wgt.getZclass(),
			inRoundedMold = wgt.inRoundedMold();
			
		if (!wgt.isDisabled() && !zk.dragging) {
			var $Auxbutton = zul.Auxbutton,
				curab = $Auxbutton._curab;
			if (curab) curab._domUp();

			if (inRoundedMold && !wgt._buttonVisible) return;

			jq(this._btn).addClass(zcls + "-btn-clk");
			
			if (inRoundedMold && !wgt.isReadonly() && !jq(inp).hasClass(zcls + '-text-invalid'))
				jq(inp).addClass(zcls + "-inp-clk");			

			jq(document).mouseup(this.proxy(this._domUp));

			$Auxbutton._curab = this;
		}
	},
	_domUp: function () {
		var $Auxbutton = zul.Auxbutton,
			curab = $Auxbutton._curab;
		if (curab) {
			$Auxbutton._curab = null;
			var wgt = curab._wgt,
				zcls = wgt.getZclass();
				
			if (wgt.inRoundedMold() && !wgt._buttonVisible) return;
			
			jq(curab._btn).removeClass(zcls + "-btn-clk");
			jq(wgt.getInputNode()).removeClass(zcls + "-inp-clk");
			
			jq(document).unbind("mouseup", curab.proxy(this._domUp));
		}
	}
});


(function () {

	function _cancel(o, sid, finish) {
		var key = o.getKey(sid),
			uplder = o.uploaders[key];
		if (uplder)
			uplder.destroy(finish);
		delete o.uploaders[key];
	}
	function _parseMaxSize(val) {
		return val.indexOf("maxsize=") >= 0 ? val.match(new RegExp(/maxsize=([^,]*)/))[1] : '';
	}
	function _start(o, form, val) { 
		var key = o.getKey(o.sid),
			uplder = new zul.Uploader(o, key, form, val);
			
		zul.Upload.start(uplder);
		o.uploaders[key] = uplder;
		
		o.sid++;
		o.initContent();
	}

	function _onchange(evt) {
		var n = this,
			upload = n._ctrl,
			wgt = upload._wgt,
			dt = wgt.desktop,
			action = zk.ajaxURI('/upload', {desktop:dt,au:true}) + '?uuid=' + wgt.uuid + '&dtid=' + dt.uuid + '&sid=' + upload.sid
				+ (upload.maxsize !== '' ? '&maxsize=' + upload.maxsize : '')
				+ (upload.isNative ? '&native=true' : ''),
			form = n.form;
		form.action = action;
		
		
		var p = form.parentNode;
		p.parentNode.removeChild(p);
		_start(n._ctrl, form, n.value);		
	}


zul.Upload = zk.$extends(zk.Object, {
	sid: 0,
	uploaders: {},
	
	$init: function(wgt, parent, clsnm) {
		this.maxsize = _parseMaxSize(clsnm);
		this.isNative = clsnm.indexOf('native') != -1;
		this._clsnm = (this.maxsize || this.isNative) ? clsnm.split(',')[0] : clsnm;
		this._wgt = wgt;
		this._parent = parent;
		
		this.initContent();
	},
	
	sync: function () {
		var wgt = this._wgt,
			ref = wgt.$n(),
			parent = this._parent,
			outer = parent ? parent.lastChild : ref.nextSibling,
			inp = outer.firstChild.firstChild,
			refof = zk(ref).cmOffset(),
			outerof = jq(outer).css({top: '0', left: '0'}).zk.cmOffset(),
			diff = inp.offsetWidth - ref.offsetWidth,
			st = outer.style;
		st.top = refof[1] - outerof[1] + "px"; 
		st.left = refof[0] - outerof[0] - diff + "px";
		inp.style.height = ref.offsetHeight + 'px';
		inp.style.clip = 'rect(auto,auto,auto,' + diff + 'px)';
	},
	initContent: function () {
		var wgt = this._wgt,
			parent = this._parent,
			ref = wgt.$n(), dt = wgt.desktop,
			html = '<span class="z-upload"><form enctype="multipart/form-data" method="POST">'
				 + '<input name="file" type="file" hidefocus="true" style="height:'
				 + ref.offsetHeight + 'px"/></form></span>';
		
		if (parent) 
			jq(parent).append(html);
		else 
			jq(wgt).after(html);
			
		this.sync();
		
		var outer = this._outer = parent ? parent.lastChild : ref.nextSibling,
			inp = outer.firstChild.firstChild;
			
		inp.z$proxy = ref;
		inp._ctrl = this;
		
		jq(inp).change(_onchange);
	},
	
	destroy: function () {
		jq(this._outer).remove();
		this._wgt = this._parent = null;
		for (var v in this.uploaders) {
			var uplder = this.uploaders[v];
			if (uplder) {
				delete this.uploaders[v];
				uplder.destroy();
			}
		}
	},
	
	getKey: function (sid) {
		return (this._wgt ? this._wgt.uuid : '' )+ '_uplder_' + sid; 
	},
	
	cancel: function (sid) { 
		_cancel(this, sid);
	},
	
	finish: function (sid) {
		_cancel(this, sid, true);
	}
},{
	
	error: function (msg, uuid, sid) {
		var wgt = zk.Widget.$(uuid);
		if (wgt) {
			jq.alert(msg, {desktop: wgt.desktop, icon: 'ERROR'});
			zul.Upload.close(uuid, sid);
		}
	},
	
	close: function (uuid, sid) {
		var wgt = zk.Widget.$(uuid);
		if (!wgt || !wgt._uplder) return;
		wgt._uplder.cancel(sid);
	},
	
	sendResult: function (uuid, contentId, sid) {
		var wgt = zk.Widget.$(uuid);
		if (!wgt || !wgt._uplder) return;
		wgt._uplder.finish(sid);
		zAu.send(new zk.Event(wgt.desktop, "updateResult", {
			contentId: contentId,
			wid: wgt.uuid,
			sid: sid
		}));
	},
	
	isFinish: function (wgt) {
		for (var key = (typeof wgt == 'string' ? wgt : wgt.uuid) + '_uplder_',
				f = zul.Upload.files, i = f.length; i--;)
			if (f[0].id.startsWith(key))
				return false;
		return true;
	},
	
	start: function (uplder) {
		var files = zul.Upload.files;
		if (uplder)
			files.push(uplder);
		if (files[0] && !files[0].isStart) {
			files[0].isStart = true;
			files[0].start();
		}
	},
	
	destroy: function (uplder) {
		for (var files = zul.Upload.files, i = files.length; i--;) 
			if (files[i].id == uplder.id) {
				files.splice(i, 1);
				break;
			}
		zul.Upload.start();
	},
	files: []
});

zul.Uploader = zk.$extends(zk.Object, {
	
	$init: function (upload, id, form, flnm) {
		this.id = id;
		this.flnm = flnm;
		this._upload = upload;
		this._form = form;
		this._parent = form.parentNode;
		this._sid = upload.sid;
		this._wgt = upload._wgt;
		
		var viewer, self = this;
		if (upload._clsnm.startsWith('true')) viewer = new zul.UploadViewer(this, flnm);
		else
			zk.$import(upload._clsnm, function (cls) {
				viewer = new cls(self, flnm);
			});
		this.viewer = viewer;
	},
	
	getWidget: function () {
		return this._wgt;
	},
	
	destroy: function (finish) {
		this.end(finish);
		if (this._form) {
			jq(this._form.parentNode).remove();
			jq('#' + this.id + '_ifm').remove();
		}
		this._form = this._upload = this._wgt = null;
	},
	
	start: function () {
		var wgt = this._wgt,
			frameId = this.id + '_ifm';

		document.body.appendChild(this._parent);
		if (!jq('#' + frameId).length) 
			jq.newFrame(frameId);
		this._form.target = frameId;
		this._form.submit();
		this._form.style.display = "none";
		
		var uri = zk.ajaxURI('/upload', {desktop: wgt.desktop, au: true}),
			dtid = wgt.desktop.id,
			self = this,
			data = 'cmd=uploadInfo&dtid=' + dtid + '&wid=' + wgt.uuid + '&sid=' + this._sid;
		
		if (zul.Uploader._tmupload)
			clearInterval(zul.Uploader._tmupload);
		
		function t() {
			jq.ajax({
				type: 'POST',
				url: uri,
				data: data,
				success: function(data) {
					var d = data.split(',');
					if (data.startsWith('error:')) {
						zul.Uploader.clearInterval(self.id);
							var wgt = self.getWidget();
							if (wgt) {
								self.cancel();
								zul.Upload.error(data.substring(6, data.length), wgt.uuid, self._sid);
							}
					} else if (!self.update(zk.parseInt(d[0]), zk.parseInt(d[1])))
						zul.Uploader.clearInterval(self.id);
				},
				complete: function(req, status) {
					var v;
					if ((v = req.getResponseHeader("ZK-Error")) == "404" ||
							v == "410" || status == 'error' || status == 410) {
						zul.Uploader.clearInterval(self.id);
						var wgt = self.getWidget();
						if (wgt) {
							self.cancel();
							zul.Upload.error(msgzk.FAILED_TO_RESPONSE, wgt.uuid, self._sid);
						}
						return;
					}
				}
			});
		}
		t.id = this.id;
		
		zul.Uploader.clearInterval = function (id) {
			if (t.id == id) {
				clearInterval(zul.Uploader._tmupload);
				zul.Uploader._tmupload = undefined;
			}
		};
		zul.Uploader._tmupload = setInterval(t, 1000);
	},
	
	cancel: function () {
		zul.Uploader.clearInterval(this.id);
		if (this._upload)
			this._upload.cancel(this._sid);
	},
	
	update: function (sent, total) {
		var wgt = this.getWidget();
		if (!wgt || total <= 0) this.end();
		else if (zul.Uploader._tmupload) {
			if (sent >= 0 && sent <= 100)
				this.viewer.update(sent, total);
			return sent >= 0 && sent < 100;
		}
		return false;
	},
	
	end: function (finish) {
		this.viewer.destroy(finish);
		zul.Upload.destroy(this);
	}
});


	function _addUM(uplder, flnm) {
		var flman = zul.UploadViewer.flman;
		if (!flman || !flman.desktop) {
			if (flman) flman.detach();
			zul.UploadViewer.flman = flman = new zul.UploadManager();
			uplder.getWidget().getPage().appendChild(flman);
		}
		flman.removeFile(uplder);
		flman.addFile(uplder);
	}
	function _initUM(uplder, flnm) {
		if (zul.UploadManager)
			return _addUM(uplder, flnm);

		zk.load('zul.wgt,zul.box', function() {
			
			zul.UploadManager = zk.$extends(zul.wgt.Popup, {
				_files: {},
				$init: function () {
					this.$supers('$init', arguments);
					this.setSclass('z-fileupload-manager');
				},
				onFloatUp: function(ctl) {
					var wgt = ctl.origin;
					if (!this.isVisible()) 
						return;
					this.setTopmost();
				},
				
				getFileItem: function(id) {
					return this._files[id] || zk.Widget.$(id);
				},
				
				addFile: function(uplder) {
					var id = uplder.id,
						flnm = uplder.flnm,
						prog = this.getFileItem(id);
					if (!prog) {
						prog = new zul.wgt.Div({
							uuid: id,
							children: [new zul.wgt.Label({
								value: flnm + ':'
							}), new zul.box.Box({
								mold: 'horizontal',
								children: [new zul.wgt.Progressmeter({
									id: id,
									sclass: 'z-fileupload-progress'
								})
								, new zul.wgt.Div({
									sclass: 'z-fileupload-rm',
									listeners: {
										onClick: function () {
											var uuid = id.substring(0, id.indexOf('_uplder_'));
											zul.Uploader.clearInterval(id);
											var wgt = zk.Widget.$(uuid);
											if (wgt) wgt._uplder.cancel(id.substring(id.lastIndexOf('_')+1, id.length));
										}
									}
								})]
							}), new zul.wgt.Label({id: id + '_total'}), new zul.wgt.Separator()]
						});
						
						try {
							this.appendChild(prog);
						} catch (e) {}
						this._files[id] = prog;
					}
					return prog;
				},
				
				updateFile: function(uplder, val, total) {
					var id = uplder.id,
						prog = this.getFileItem(id);
					if (!prog) return;
					prog.$f(id).setValue(val);
					prog.$f(id + '_total').setValue(total);
				},
				
				removeFile: function(uplder) {
					var id = uplder.id,
						prog = this.getFileItem(id);
					if (prog) 
						prog.detach();
					delete this._files[id];
					var close = true;
					for (var p in this._files) 
						if (!(close = false)) 
							break;
					
					if (close) 
						this.close();
				},
				
				open: function(wgt, position) {
					this.$super('open', wgt, null, position || 'after_start', {
						sendOnOpen: false,
						disableMask: true
					});
				}
			});
			_addUM(uplder, flnm);
		});
	}

zul.UploadViewer = zk.$extends(zk.Object, {
	
	$init: function (uplder,  flnm) {
		this._uplder = uplder;
		_initUM(uplder, flnm);
	},
	
	update: function (sent, total) {
		var flman = zul.UploadViewer.flman;
		if (flman) {
			if (!flman.isOpen())
					flman.open(this._uplder.getWidget());
			flman.updateFile(this._uplder, sent, msgzk.FILE_SIZE+Math.round(total/1024)+msgzk.KBYTES);
		}
	},
	
	destroy: function () {
		var flman = zul.UploadViewer.flman;
		if (flman)
			flman.removeFile(this._uplder);
	}
});

})();


}finally{zk.setLoaded(zk._p.n);}})();zk.load('zul',function(){zk._p=zkpi('zul.wgt',true);try{




zul.wgt.A = zk.$extends(zul.LabelImageWidget, {
	_dir: "normal",
	_tabindex: -1,

	$define: {
		
		
		disabled: function () {
			this.rerender(); 
		},
		
		
		dir: _zkf = function () {
			var n = this.$n();
			if (n) n.innerHTML = this.domContent_();
		},
		
		
		href: function (v) {
			var n = this.$n();
			if (n) n.href = v || '';
		},
		
		
		target: function (v) {
			var n = this.$n();
			if (n) n.target = v || '';
		},
		
		
		tabindex: function (v) {
			var n = this.$n();
			if (n) n.tabIndex = v < 0 ? '' : v;
		}
	},

	
	getZclass: function(){
		var zcls = this._zclass;
		return zcls ? zcls : "z-a";
	},

	bind_: function(){
		this.$supers(zul.wgt.A, 'bind_', arguments);
		if (!this._disabled) {
			var n = this.$n();
			this.domListen_(n, "onFocus", "doFocus_")
				.domListen_(n, "onBlur", "doBlur_");
		}
	},
	unbind_: function(){
		var n = this.$n();
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_");

		this.$supers(zul.wgt.A, 'unbind_', arguments);
	},
	domContent_: function(){
		var label = zUtl.encodeXML(this.getLabel()), img = this.getImage();
		if (!img) 
			return label;
		
		img = '<img src="' + img + '" align="absmiddle" />';
		return this.getDir() == 'reverse' ? label + img : img + label;
	},
	domClass_: function(no){
		var scls = this.$supers('domClass_', arguments);
		if (this._disabled && (!no || !no.zclass)) {
			var s = this.getZclass();
			if (s) 
				scls += (scls ? ' ' : '') + s + '-disd';
		}
		return scls;
	},
	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments),
			v;
		if (v = this.getTarget())
			attr += ' target="' + v + '"';
		if (v = this.getTabindex()) 
			attr += ' tabIndex="' + v + '"';
		if (v = this.getHref()) 
			attr += ' href="' + v + '"';
		else 
			attr += ' href="javascript:;"';
		return attr;
	},
	doClick_: function(evt){
		if (this._disabled) 
			evt.stop(); 
		else {
			this.fireX(evt);
			if (!evt.stopped)
				this.$super('doClick_', evt, true);
		}
			
	}
});


zkreg('zul.wgt.A');zk._m={};
zk._m['default']=
function (out) {
	out.push('<a ', this.domAttrs_(), '>', this.domContent_(), '</a>');
}

;zkmld(zk._p.p.A,zk._m);

zul.wgt.Cell = zk.$extends(zul.Widget, {
	_colspan: 1,
	_rowspan: 1,
	_rowType: 0,
	_boxType: 1,
	
	$define: {
		
		
		colspan: function (v) {
			var n = this.$n();
			if (n)
				n.colSpan = v;
		},
		
		
		rowspan: function (v) {
			var n = this.$n();
			if (n)
				n.rowSpan = v;
		},
		
		
		align: function (v) {
			var n = this.$n();
			if (n)
				n.align = v;
		},
		
		
		valign: function (v) {
			var n = this.$n();
			if (n)
				n.valign = v;
		}
	},
	_getParentType: function () {
		var isRow = zk.isLoaded('zul.grid') && this.parent.$instanceof(zul.grid.Row);
		if (!isRow) {
			return zk.isLoaded('zul.box') && this.parent.$instanceof(zul.box.Box) ?
					this._boxType : null;
		}
		return this._rowType;
	},
	_getRowAttrs: function () {
		return this.parent._childAttrs(this, this.getChildIndex());
	},
	_getBoxAttrs: function () {
		return this.parent._childInnerAttrs(this);
	},
	
	domAttrs_: function (no) {
		var s = this.$supers('domAttrs_', arguments), v;	
		if ((v = this._colspan) != 1)
			s += ' colspan="' + v + '"';
		if ((v = this._rowspan) != 1)
			s += ' rowspan="' + v + '"';
		if ((v = this._align))
			s += ' align="' + v + '"';
		if ((v = this._valign))
			s += ' valign="' + v + '"';
			
		var m1, m2 = zUtl.parseMap(s, ' ', '"');		
		switch (this._getParentType()) {
		case this._rowType:
			m1 = zUtl.parseMap(this._getRowAttrs(), ' ', '"');
			break;
		case this._boxType:
			m1 = zUtl.parseMap(this._getBoxAttrs(), ' ', '"');
			break;
		}
		if (m1) zk.copy(m1, m2);
		return ' ' + zUtl.mapToString(m1);
	},
	getZclass: function () {
		return this._zclass == null ? "z-cell" : this._zclass;
	}
});
zkreg('zul.wgt.Cell');zk._m={};
zk._m['default']=
function (out) {
	out.push('<td', this.domAttrs_(), '>');
	for (var j = 0, w = this.firstChild; w; w = w.nextSibling, j++)
		w.redraw(out);
	out.push('</td>');
}

;zkmld(zk._p.p.Cell,zk._m);

zul.wgt.Div = zk.$extends(zul.Widget, {
	$define: {
		
		
		align: function (v) {
			var n = this.$n();
			if (n)
				n.align = v;
		}
	},
	
	domAttrs_: function(no) {
		var align = this._align,
			attr = this.$supers('domAttrs_', arguments);
		return align != null ? attr + ' align="' + align + '"' : attr;
	}
});

zkreg('zul.wgt.Div',true);zk._m={};
zk._m['default']=
zk.Page.prototype.redraw
;zkmld(zk._p.p.Div,zk._m);

zul.wgt.Span = zk.$extends(zul.Widget, {
});

zkreg('zul.wgt.Span',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<span', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</span>');
}
;zkmld(zk._p.p.Span,zk._m);

zul.wgt.Include = zk.$extends(zul.Widget, {
	_content: '',

	$define: {
		
		
		content: function (v) {
			var n = this.$n();
			if (n) {
				if (v && this._comment)
					v = '<!--\n' + v + '\n-->';
				n.innerHTML = v  || '';
			}
		},
		
		
		comment: null
	},

	
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments);
		if (!this.previousSibling && !this.nextSibling) {
		
			if ((!no || !no.width) && !this.getWidth())
				style += 'width:100%;';
			if ((!no || !no.height) && !this.getHeight())
				style += 'height:100%;';
		}
		return style;
	},
	bind_: function () {
		this.$supers(zul.wgt.Include, "bind_", arguments);
		var ctn;
		if (jq.isArray(ctn = this._content)) 
			for (var n = this.$n(), j = 0; j < ctn.length; ++j)
				n.appendChild(ctn[j]);
		zkqx(this.uuid); 
	},
	unbind_: function () {
		if (jq.isArray(this._content)) 
			for (var n = this.$n(); n.firstChild;)
				n.removeChild(n.firstChild);
		this.$supers(zul.wgt.Include, "unbind_", arguments);
	}
});

zkreg('zul.wgt.Include');zk._m={};
zk._m['default']=
function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	if (this._comment)
		out.push('<!--\n');
	if (!jq.isArray(this._content)) 
		out.push(this._content);
	if (this._comment)
		out.push('\n-->');
	out.push('</div>');
}

;zkmld(zk._p.p.Include,zk._m);

zul.wgt.Label = zk.$extends(zul.Widget, {
	_value: '',
	_maxlength: 0,

	$define: {
		
		
		value: _zkf = function () {
			var n = this.$n();
			if (n) n.innerHTML = this.getEncodedText();
		},
		
		
		multiline: _zkf,
		
		
		pre: _zkf,
		
		
		maxlength: _zkf
	},
	
	getEncodedText: function () {
		return zUtl.encodeXML(this._value, {multiline:this._multiline,pre:this._pre, maxlength: this._maxlength});
	},

	
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: "z-label";
	}
});

zkreg('zul.wgt.Label');zk._m={};
zk._m['default']=
function (out) {
	out.push('<span', this.domAttrs_(), '>', this.getEncodedText(), '</span>');
}
;zkmld(zk._p.p.Label,zk._m);
(function () {
	
	var _fixhgh = zk.ie ? function (btn) {
		if (btn.desktop && btn._mold == 'trendy') {
			var n = btn.$n(),
				box = btn.$n('box');
			box.rows[1].style.height = "";
			box.style.height = !n.style.height || n.style.height == "auto" ? "": "100%";			
			if (n.style.height && box.offsetHeight) {
				var cellHgh = zk.parseInt(jq(box.rows[0].cells[0]).css('height'));
				if (cellHgh != box.rows[0].cells[0].offsetHeight) {
					box.rows[1].style.height = jq.px0(box.offsetHeight -
						cellHgh - zk.parseInt(jq(box.rows[2].cells[0]).css('height')));
				}
			}
		}
	}: zk.$void;
	var _fixwidth = zk.ie ? function (btn) {
		if (btn.desktop && btn._mold == 'trendy') {
			var width = btn.$n().style.width;
			btn.$n('box').style.width = !width || width == "auto" ? "": "100%";
		}
	}: zk.$void;

var Button = 

zul.wgt.Button = zk.$extends(zul.LabelImageWidget, {
	_orient: "horizontal",
	_dir: "normal",
	_tabindex: -1,

	$define: {
		
		
		href: null,
		
		
		target: null,
		
		
		dir: _zkf = function () {
			this.updateDomContent_();
		},
		
		
		orient: _zkf,
		
		
		disabled: function (v) {
			if (this.desktop) {
				if (this._upload)
					this._cleanUpld();
				if (this._mold == "os") {
					var n = this.$n(),
						zclass = this.getZclass();
					if (zclass)
						jq(n)[(n.disabled = v) ? "addClass": "removeClass"](zclass + "-disd");
				} else
					this.rerender(); 
			}
		},
		image: function (v) {
			if (this._mold == 'trendy') {
				this.rerender();
			} else {				
				var n = this.getImageNode();
				if (n) 
					n.src = v || '';
			}
		},
		
		
		tabindex: function (v) {
			var n = this.$n();
			if (n) (this.$n('btn') || n).tabIndex = v >= 0 ? v: '';
		},
		
		
		autodisable: null,
		
		
		upload: function (v) {
			var n = this.$n();
			if (n && !this._disabled) {
				this._cleanUpld();
				if (v && v != 'false') this._initUpld();
			}
		}
	},

	
	setVisible: function (visible) {
		if (this._visible != visible) {
			this.$supers('setVisible', arguments);
			if (this._mold == 'trendy')
				this.rerender();
		}
		return this;
	},
	focus: function (timeout) {
		if (this.desktop && this.isVisible() && this.canActivate({checkOnly:true})) {
			zk(this.$n('btn')||this.$n()).focus(timeout);
			return true;
		}
		return false;
	},

	domContent_: function () {
		var label = zUtl.encodeXML(this.getLabel()),
			img = this.getImage();
		if (!img) return label;

		img = '<img src="' + img + '" align="absmiddle" />';
		var space = "vertical" == this.getOrient() ? '<br/>': ' ';
		return this.getDir() == 'reverse' ?
			label + space + img: img + space + label;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (this._disabled && (!no || !no.zclass)) {
			var s = this.getZclass();
			if (s) scls += (scls ? ' ': '') + s + '-disd';
		}
		return scls;
	},

	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: this._mold != 'trendy' ? "z-button-os": "z-button";
	},
	bind_: function () {
		this.$supers(Button, 'bind_', arguments);

		var n;
		if (this._mold != 'trendy') {
			n = this.$n();
		} else {
			if (this._disabled) return;

			zk(this.$n('box')).disableSelection();

			n = this.$n('btn');
			if (this._upload || zk.ie) zWatch.listen({onSize: this, onShow: this});
		}

		this.domListen_(n, "onFocus", "doFocus_")
			.domListen_(n, "onBlur", "doBlur_");

		if (!this._disabled && this._upload) this._initUpld();
	},
	unbind_: function () {
		if (!this._disabled && this._upload) this._cleanUpld();

		var trendy = this._mold == 'trendy',
			n = !trendy ? this.$n(): this.$n('btn');
		if (n) {
			this.domUnlisten_(n, "onFocus", "doFocus_")
				.domUnlisten_(n, "onBlur", "doBlur_");
		}
		if (this._upload || (zk.ie && trendy))
			zWatch.unlisten({onSize: this, onShow: this});

		this.$supers(Button, 'unbind_', arguments);
	},
	_initUpld: function () {
		var v;
		if (v = this._upload)
			this._uplder = new zul.Upload(this, null, v);
	},
	_cleanUpld: function () {
		var v;
		if (v = this._uplder) {
			this._uplder = null;
			v.destroy();
		}
	},

	
	setWidth: zk.ie ? function (v) {
		this.$supers('setWidth', arguments);
		_fixwidth(this);
	}: function () {
		this.$supers('setWidth', arguments);
	},
	
	setHeight: zk.ie ? function (v) {
		this.$supers('setHeight', arguments);
		_fixhgh(this);
	}: function () {
		this.$supers('setHeight', arguments);
	},

	onSize: _zkf = zk.ie ? function () {
		_fixhgh(this);
		_fixwidth(this);
		if (this._uplder)
			this._uplder.sync();
	} : function () {
		if (this._uplder)
			this._uplder.sync();
	},
	onShow: _zkf,
	doFocus_: function (evt) {
		if (this._mold == 'trendy')
			jq(this.$n('box')).addClass(this.getZclass() + "-focus");
		this.$supers('doFocus_', arguments);
	},
	doBlur_: function (evt) {
		if (this._mold == 'trendy')
			jq(this.$n('box')).removeClass(this.getZclass() + "-focus");
		this.$supers('doBlur_', arguments);
	},
	doClick_: function (evt) {
		if (!this._disabled) {
			var ads = this._autodisable, aded;
			if (ads) {
				ads = ads.split(',');
				for (var j = ads.length; j--;) {
					var ad = ads[j].trim();
					if (ad) {
						var perm;
						if (perm = ad.charAt(0) == '+')
							ad = ad.substring(1);
						ad = "self" == ad ? this: this.$f(ad);
						if (ad) {
							ad.setDisabled(true);
							if (this.inServer)
								if (perm)
									ad.smartUpdate('disabled', true);
								else if (!aded) aded = [ad];
								else aded.push(ad);
						}
					}
				}
			}
			if (aded) {
				aded = new zul.wgt.ADBS(aded);
				if (this.isListen('onClick', {asapOnly:true}))
					zWatch.listen({onResponse: aded});
				else
					setTimeout(function () {aded.onResponse();}, 800);
			}
			
			this.fireX(evt);

			if (!evt.stopped) {
				var href = this._href;
				if (href)
					zUtl.go(href, {target: this._target || (evt.data.ctrlKey ? '_blank' : '')});
				this.$super('doClick_', evt, true);
			}
		}
		
		
	},
	doMouseOver_: function () {
		if (!this._disabled)
			jq(this.$n('box')).addClass(this.getZclass() + "-over");
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		if (!this._disabled && this != Button._curdn
		&& !(zk.ie && jq.isAncestor(this.$n('box'), evt.domEvent.relatedTarget || evt.domEvent.toElement)))
			jq(this.$n('box')).removeClass(this.getZclass() + "-over");
		this.$supers('doMouseOut_', arguments);
	},
	doMouseDown_: function () {
		if (!this._disabled) {
			var zcls = this.getZclass();
			jq(this.$n('box')).addClass(zcls + "-clk")
				.addClass(zcls + "-over")
			if (!zk.ie || !this._uplder) zk(this.$n('btn')).focus(30);
				
		}

		zk.mouseCapture = this; 
		this.$supers('doMouseDown_', arguments);
	},
	doMouseUp_: function () {
		if (!this._disabled) {
			var zcls = this.getZclass();
			jq(this.$n('box')).removeClass(zcls + "-clk")
				.removeClass(zcls + "-over");
			if (zk.ie && this._uplder) zk(this.$n('btn')).focus(30);
		}
		this.$supers('doMouseUp_', arguments);
	},
	setFlexSize_: function(sz) { 
		var n = this.$n();
		if (sz.height !== undefined) {
			if (sz.height == 'auto')
				n.style.height = '';
			else if (sz.height != '')
				n.style.height = jq.px0(this._mold == 'trendy' ? zk(n).revisedHeight(sz.height, true) : sz.height);
			else
				n.style.height = this._height ? this._height : '';
			_fixhgh(this);
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto')
				n.style.width = '';
			else if (sz.width != '')
				n.style.width = jq.px0(this._mold == 'trendy' ? zk(n).revisedWidth(sz.width, true) : sz.width);
			else
				n.style.width = this._width ? this._width : '';
			_fixwidth(this);
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	}
});

zul.wgt.ADBS = zk.$extends(zk.Object, {
	$init: function (ads) {
		this._ads = ads;
	},
	onResponse: function () {
		for (var ads = this._ads, ad; ad = ads.shift();)
			ad.setDisabled(false);
		zWatch.unlisten({onResponse: this});
	}
});

})();

zkreg('zul.wgt.Button');zk._m={};
zk._m['os']=
function (out) {
	out.push('<button', this.domAttrs_());
	var tabi = this._tabindex;
	if (this._disabled) out.push(' disabled="disabled"');
	if (tabi >= 0) out.push(' tabindex="', tabi, '"');
	out.push('>', this.domContent_(), '</button>');
}
;zk._m['trendy']=
function (out) {
	var zcls = this.getZclass(),
		tabi = this._tabindex,
		uuid = this.uuid;
	tabi = tabi >= 0 ? ' tabindex="' + tabi + '"': '';

	var btn = '<button id="' + uuid + '-btn" class="' + zcls + '"',
		s = this.isDisabled();
	if (s) btn += ' disabled="disabled"';
	if (tabi && (zk.gecko || zk.safari)) btn += tabi;
	btn += '></button>';

	var wd = "100%", hgh = "100%";
	if (zk.ie && !zk.ie8) {
		
		if (!this._width) wd = "";
		if (!this._height) hgh = "";
	}
	out.push('<span', this.domAttrs_(), ' class="', zcls, '"',
			(!this.isVisible() ? ' style="display:none"' : ''),
			'><table id="', uuid, '-box" style="width:', wd, ';height:', hgh, '"', zUtl.cellps0,
			(tabi && !zk.gecko && !zk.safari ? tabi : ''),
			'><tr><td class="', zcls, '-tl">', (!zk.ie ? btn : ''),
			'</td><td class="', zcls, '-tm"></td>', '<td class="', zcls,
			'-tr"></td></tr>', '<tr><td class="', zcls, '-cl">',
			(zk.ie ? btn : ''),
			'</td><td class="', zcls, '-cm">', this.domContent_(),
			'</td><td class="', zcls, '-cr"><div></div></td></tr>',
			'<tr><td class="', zcls, '-bl"></td>',
			'<td class="', zcls, '-bm"></td>',
			'<td class="', zcls, '-br"></td></tr></table></span>');
}
;zk._m['default']=[zk._p.p.Button,'os'];zkmld(zk._p.p.Button,zk._m);

zul.wgt.Separator = zk.$extends(zul.Widget, {
	_orient: 'horizontal',

	$define: { 
		
		
		orient: _zkf = function () {
			this.updateDomClass_();
		},
		
		
		bar: _zkf,
		
		
		spacing: function () {
			this.updateDomStyle_();
		}
	},

	
	isVertical: function () {
		return this._orient == 'vertical';
	},

	
	bind_: function () {
		this.$supers(zul.wgt.Separator, 'bind_', arguments);

		var n;
		if (zk.ie && (n = this.$n()).offsetWidth <= 2)
			n.style.backgroundPosition = "left top"; 
	},

	getZclass: function () {
		var zcls = this._zclass,
			bar = this.isBar();
		return zcls ? zcls: "z-separator" +
			(this.isVertical() ? "-ver" + (bar ? "-bar" : "") :
				"-hor" + (bar ? "-bar" : ""))
	},
	domStyle_: function () {
		var s = this.$supers('domStyle_', arguments);
		if (!this._isPercentGecko()) return s;

		var v = zk.parseInt(this._spacing.substring(0, this._spacing.length - 1).trim());
		if (v <= 0) return s;
		v = v >= 2 ? (v / 2) + "%": "1%";

		return 'margin:' + (this.isVertical() ? '0 ' + v: v + ' 0')
			+ ';' + s;
	},
	getWidth: function () {
		var wd = this.$supers('getWidth', arguments);
		return !this.isVertical() || (wd != null && wd.length > 0)
			|| this._isPercentGecko() ? wd: this._spacing;
		
	},
	getHeight: function () {
		var hgh = this.$supers('getHeight', arguments);
		return this.isVertical() || (hgh != null && hgh.length > 0)
			|| this._isPercentGecko() ? hgh: this._spacing;
	},
	_isPercentGecko: function () {
		return zk.gecko && this._spacing != null && this._spacing.endsWith("%");
	}
});

zkreg('zul.wgt.Separator');zk._m={};
zk._m['default']=
function (out) {
	var tag = this.isVertical() ? 'span': 'div';
	out.push('<', tag, this.domAttrs_(), '>&nbsp;</', tag, '>');
}
;zkmld(zk._p.p.Separator,zk._m);

zul.wgt.Space = zk.$extends(zul.wgt.Separator, {
	_orient: 'vertical'
});
zkreg('zul.wgt.Space');zk._m={};
zk._m['default']=
zul.wgt.Separator.molds['default']
;zkmld(zk._p.p.Space,zk._m);

zul.wgt.Caption = zk.$extends(zul.LabelImageWidget, {
	
	domDependent_: true, 
	rerender: function () {
		if (this.parent && this.parent.$instanceof(zul.wgt.Groupbox)
				&& this.parent.isLegend())
			this.parent.rerender();
		else
			this.$supers('rerender', arguments);
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-caption";
	},
	domContent_: function () {
		var label = this.getLabel(),
			img = this.getImage(),
			title = this.parent ? this.parent._title: '';
		if (title) label = label ? title + ' - ' + label: title;
		label = zUtl.encodeXML(label);
		if (!img) return label;

		img = '<img src="' + img + '" align="absmiddle" />';
		return label ? img + ' ' + label: img;
	},
	doClick_: function () {
		if (this.parent.$instanceof(zul.wgt.Groupbox))
			this.parent.setOpen(!this.parent.isOpen());
		this.$supers('doClick_', arguments);
	},
	
	
	_isCollapsibleVisible: function () {
		var parent = this.parent;
		return parent.isCollapsible && parent.isCollapsible();
	},
	
	_isCloseVisible: function () {
		var parent = this.parent;
		return parent.isClosable && parent.isClosable();
	},
	
	_isMinimizeVisible: function () {
		var parent = this.parent;
		return parent.isMinimizable && parent.isMinimizable();
	},
	
	_isMaximizeVisible: function () {
		var parent = this.parent;
		return parent.isMaximizable && parent.isMaximizable();
	},
	
	
	
	_isIgnoreMargin: function () {
		var parent = this.parent;
		return zk.safari && parent && parent.$instanceof(zul.wgt.Groupbox) && parent.isLegend();  
	}
});
zkreg('zul.wgt.Caption',true);zk._m={};
zk._m['default']=
function (out) {
	var parent = this.parent;
	if (parent.isLegend && parent.isLegend()) {
		out.push('<legend', this.domAttrs_(), '><span>', this.domContent_());
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</span></legend>');
		return;
	}

	var zcls = this.getZclass(),
		cnt = this.domContent_(),
		puuid = parent.uuid,
		pzcls = parent.getZclass();
	out.push('<table', this.domAttrs_(), zUtl.cellps0,
			' width="100%"><tr valign="middle"><td align="left" class="',
			zcls, '-l">', (cnt?cnt:'&nbsp;'), 
			'</td><td align="right" class="', zcls,
			'-r" id="', this.uuid, '-cave">');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</td>');
	if (this._isCollapsibleVisible())
		out.push('<td width="16"><div id="', puuid, '-exp" class="',
				pzcls, '-icon ', pzcls, '-exp"></div></td>');
	if (this._isMinimizeVisible())
		out.push('<td width="16"><div id="', puuid, '-min" class="',
				pzcls, '-icon ', pzcls, '-min"></div></td>');
	if (this._isMaximizeVisible()) {
		out.push('<td width="16"><div id="', puuid, '-max" class="',
				pzcls, '-icon ', pzcls, '-max');
		if (parent.isMaximized())
			out.push(' ', pzcls, '-maximized');
		out.push('"></div></td>');
	}
	if (this._isCloseVisible())
		out.push('<td width="16"><div id="', puuid, '-close" class="',
				pzcls, '-icon ', pzcls, '-close"></div></td>');

	out.push('</tr></table>');
}
;zkmld(zk._p.p.Caption,zk._m);
(function () {
	var _domClick = zk.gecko2_ ? function (evt) {
		var e = evt.originalEvent;
		if (e) e.z$target = e.currentTarget;
			
			
			
			
	}: null;

	
	function _shallIgnore(evt) {
		var v = evt.domEvent;
		return v && jq.nodeName(v.target, "label");
	}

var Checkbox =

zul.wgt.Checkbox = zk.$extends(zul.LabelImageWidget, {
	_tabindex: -1,
	_checked: false,

	$define: {
		
		
		disabled: function (v) {
			var n = this.$n('real');
			if (n) n.disabled = v;
		},
		
		
		checked: function (v) {
			var n = this.$n('real');
			if (n) n.checked = v;
		},
		
		
		name: function (v) {
			var n = this.$n('real');
			if (n) n.name = v || '';
		},
		
		
		tabindex: function (v) {
			var n = this.$n('real');
			if (n) n.tabIndex = v >= 0 ? v: '';
		}
	},

	
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-checkbox";
	},
	contentAttrs_: function () {
		var html = '', v = this.getName(); 
		if (v)
			html += ' name="' + v + '"';
		if (this._disabled)
			html += ' disabled="disabled"';
		if (this._checked)
			html += ' checked="checked"';
		v = this._tabindex;
		if (v >= 0)
			html += ' tabindex="' + v + '"';
		return html;
	},
	bind_: function (desktop) {
		this.$supers(Checkbox, 'bind_', arguments);

		var n = this.$n('real');
		
		
		if (n.checked != n.defaultChecked)
			n.checked = n.defaultChecked;

		if (zk.gecko2_)
			jq(n).click(_domClick);
		this.domListen_(n, "onFocus", "doFocus_")
			.domListen_(n, "onBlur", "doBlur_");
	},
	unbind_: function () {
		var n = this.$n('real');
		
		if (zk.gecko2_)
			jq(n).unbind("click", _domClick);
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_");

		this.$supers(Checkbox, 'unbind_', arguments);
	},
	doSelect_: function (evt) {
		if (!_shallIgnore(evt))
			this.$supers("doSelect_", arguments);
	},
	doClick_: function (evt) {
		if (!_shallIgnore(evt)) {
			var real = this.$n('real'),
				checked = real.checked;
			if (checked != this._checked) 
				this.setChecked(checked) 
					.fire('onCheck', checked);
			if (zk.safari) jq(real).focus();
			return this.$supers('doClick_', arguments);
		}
	},
	beforeSendAU_: function (wgt, evt) {
		if (evt.name != "onClick") 
			this.$supers("beforeSendAU_", arguments);
	},
	getTextNode: function () {
		return jq(this.$n()).find('label:first')[0];
	}
});

})();
zkreg('zul.wgt.Checkbox');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass();
	out.push('<span', this.domAttrs_(), '>', '<input type="checkbox" id="', uuid,
			'-real"', this.contentAttrs_(), '/><label for="', uuid, '-real"',
			this.domTextStyleAttr_(), ' class="', zcls, '-cnt">', this.domContent_(),
			'</label></span>');	
}
;zkmld(zk._p.p.Checkbox,zk._m);

zul.wgt.Groupbox = zk.$extends(zul.Widget, {
	_open: true,
	_closable: true,

	$define: { 
		
		
		open: function (open, fromServer) {
			var node = this.$n();
			if (node && this._closable) {
				if (this.isLegend()) { 
					jq(node)[open ? 'removeClass': 'addClass'](this.getZclass() + "-colpsd");
					zWatch.fireDown(open ? 'onShow': 'onHide', this);
					if (zk.ie6_) 
						zk(this).redoCSS();
				} else {
					zk(this.getCaveNode())[open?'slideDown':'slideUp'](this);
				}
				if (!fromServer) this.fire('onOpen', {open:open});
			}
		},
		
		
		closable: _zkf = function () {
			this._updateDomOuter();
		},
		
		
		contentStyle: _zkf,
		
		
		contentSclass: _zkf
	},
	
	isLegend: function () {
		return this._mold == 'default';
	},

	_updateDomOuter: function () {
		this.rerender(zk.Skipper.nonCaptionSkipper);
	},
	_contentAttrs: function () {
		var html = ' class="', s = this._contentSclass;
		if (s) html += s + ' ';
		html += this.getZclass() + '-cnt"';

		s = this._contentStyle;
		if (!this.isLegend()) {
			if (this.caption) s = 'border-top:0;' + (s||'');
			if (!this._open) s = 'display:none;' + (s||'');
		}
		if (s) html += ' style="' + s + '"';
		return html;
	},
	_redrawCave: function (out, skipper) { 
		out.push('<div id="', this.uuid, '-cave"', this._contentAttrs(), '>');
	
		if (!skipper)
			for (var w = this.firstChild, cap = this.caption; w; w = w.nextSibling)
				if (w != cap)
					w.redraw(out);

		out.push('</div>');
	},

	setHeight: function () {
		this.$supers('setHeight', arguments);
		if (this.desktop) this._fixHgh();
	},
	_fixHgh: function () {
		var hgh = this.$n().style.height;
		if (hgh && hgh != "auto") {
			var n = this.$n('cave');
			if (n) {
				if (zk.ie6_) n.style.height = "";
				var fix = function() {
					n.style.height =
						zk(n).revisedHeight(zk(n).vflexHeight(), true)
						+ "px";
				};
				fix();
				if (zk.gecko) setTimeout(fix, 0);
					
					
			}
		}
	},

	
	onSize: _zkf = function () {
		this._fixHgh();
		if (!this.isLegend())
			setTimeout(this.proxy(this._fixShadow), 500);
			
	},
	onShow: _zkf,
	_fixShadow: function () {
		var sdw = this.$n('sdw');
		if (sdw)
			sdw.style.display =
				zk.parseInt(jq(this.$n('cave')).css("border-bottom-width")) ? "": "none";
				
	},
	updateDomStyle_: function () {
		this.$supers('updateDomStyle_', arguments);
		if (this.desktop) this.onSize();
	},

	
	focus: function (timeout) {
		if (this.desktop && this.isVisible() && this.canActivate({checkOnly:true})) {
			var cap = this.caption;
			for (var w = this.firstChild; w; w = w.nextSibling)
				if (w != cap && w.focus(timeout))
					return true;
			return cap && cap.focus(timeout);
		}
		return false;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls ? zcls: this.isLegend() ? "z-fieldset": "z-groupbox";
	},
	bind_: function () {
		this.$supers(zul.wgt.Groupbox, 'bind_', arguments);

		if (!this.isLegend())
			zWatch.listen({onSize: this, onShow: this});
	},
	unbind_: function () {
		if (!this.isLegend())
			zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(zul.wgt.Groupbox, 'unbind_', arguments);
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.wgt.Caption))
			this.caption = child;
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.caption)
			this.caption = null;
	},

	domClass_: function () {
		var html = this.$supers('domClass_', arguments);
		if (!this._open) {
			if (html) html += ' ';
			html += this.getZclass() + '-colpsd';
		}
		return html;
	}
});

zkreg('zul.wgt.Groupbox',true);zk._m={};
zk._m['3d']=
function (out, skipper) {	
	var	zcls = this.getZclass(),
		uuid = this.uuid,
		cap = this.caption;

	out.push('<div', this.domAttrs_(), '>');
	
	if (cap) {
		out.push('<div class="', zcls, '-tl"><div class="', zcls,
			'-tr"></div></div><div class="', zcls, '-hl"><div class="',
			zcls, '-hr"><div class="', zcls, '-hm"><div class="',
			zcls, '-header">');
		cap.redraw(out);
		out.push('</div></div></div></div>');
	}
	
	this._redrawCave(out, skipper);

	
	out.push('<div id="', uuid, '-sdw" class="', zcls, '-bl"><div class="',
		zcls, '-br"><div class="', zcls, '-bm"></div></div></div></div>');
}
;zk._m['default']=
function (out, skipper) {
	out.push('<fieldset', this.domAttrs_(), '>');
	
	var cap = this.caption;
	if (cap) cap.redraw(out);

	this._redrawCave(out, skipper);

	out.push('</fieldset>');
}
;zkmld(zk._p.p.Groupbox,zk._m);

zul.wgt.Html = zk.$extends(zul.Widget, {
	_content: '',
	$define: {
		
		
		content: function (v) {
			var n = this.$n();
			if (n) n.innerHTML = v|| '';
		}
	},
	bind_: function () {
		this.$supers(zul.wgt.Html, "bind_", arguments);
		if (jq.isArray(this._content)) 
			for (var ctn = this._content, n = this.$n(), j = 0; j < ctn.length; ++j)
				n.appendChild(ctn[j]);
	},
	unbind_: function () {
		if (jq.isArray(this._content)) 
			for (var n = this.$n(); n.firstChild;)
				n.removeChild(n.firstChild);
		this.$supers(zul.wgt.Html, "unbind_", arguments);
	}
});

zkreg('zul.wgt.Html');zk._m={};
zk._m['default']=
function (out) {
	out.push('<span', this.domAttrs_(), '>',
		(jq.isArray(this._content) ? "":this._content), '</span>');
}
;zkmld(zk._p.p.Html,zk._m);

zul.wgt.Popup = zk.$extends(zul.Widget, {
	_visible: false,
	
	isOpen: function () {
		return this.isVisible();
	},
	
	open: function (ref, offset, position, opts) {
		var posInfo = this._posInfo(ref, offset, position),
			node = this.$n(),
			$n = jq(node);
		$n.css({position: "absolute"}).zk.makeVParent();
		if (posInfo)
			$n.zk.position(posInfo.dim, posInfo.pos, opts);
		
		this.setVisible(true);
		this.setFloating_(true);
		this.setTopmost();
		
		if ((!opts || !opts.disableMask) && this.isListen("onOpen", {asapOnly:true})) {
			
			if (this.mask) this.mask.destroy(); 
			
			
			this.mask = new zk.eff.Mask({
				id: this.uuid + "-mask",
				anchor: node
			});
			
			
			
			zWatch.listen({onResponse: this});		
		}
		if (this.shallStackup_()) {
			if (!this._stackup)
				this._stackup = jq.newStackup(node, node.id + "-stk");
			else {
				var dst, src;
				(dst = this._stackup.style).top = (src = node.style).top;
				dst.left = src.left;
				dst.zIndex = src.zIndex;
				dst.display = "block";
			}
		}
		ref = zk.Widget.$(ref); 
		if (opts && opts.sendOnOpen) this.fire('onOpen', {open: true, reference: ref});
	},
	
	shallStackup_: function () {
		return zk.eff.shallStackup();
	},
	
	position: function (ref, offset, position, opts) {
		var posInfo = this._posInfo(ref, offset, position);
		if (posInfo)
			zk(this.$n()).position(posInfo.dim, posInfo.pos, opts);
	},
	_posInfo: function (ref, offset, position, opts) {
		var pos, dim;
		
		if (ref && position) {
			if (typeof ref == 'string')
				ref = zk.Widget.$(ref);
				
			if (ref) {
				var refn = zul.Widget.isInstance(ref) ? ref.$n() : ref;
				pos = position;
				dim = zk(refn).dimension(true);
			}
		} else if (jq.isArray(offset)) {
			dim = {
				left: zk.parseInt(offset[0]), top: zk.parseInt(offset[1]),
				width: 0, height: 0
			}
		}
		if (dim) return {pos: pos, dim: dim};
	},
	onResponse: function () {
		if (this.mask) this.mask.destroy();
		zWatch.unlisten({onResponse: this});
		this.mask = null;
	},
	
	close: function (opts) {
		if (this._stackup)
			this._stackup.style.display = "none";
		
		this.setVisible(false);
		zk(this.$n()).undoVParent();
		this.setFloating_(false);
		if (opts && opts.sendOnOpen) this.fire('onOpen', {open:false});
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-popup";
	},
	onFloatUp: function(ctl){
		if (!this.isVisible()) 
			return;
		var wgt = ctl.origin;
		
		for (var floatFound; wgt; wgt = wgt.parent) {
			if (wgt == this) {
				if (!floatFound) 
					this.setTopmost();
				return;
			}
			floatFound = floatFound || wgt.isFloating_();
		}
		this.close({sendOnOpen:true});
	},
	bind_: function () {
		this.$supers(zul.wgt.Popup, 'bind_', arguments);
		zWatch.listen({onFloatUp: this, onShow: this});
		this.setFloating_(true);
	},
	unbind_: function () {
		if (this._stackup) {
			jq(this._stackup).remove();
			this._stackup = null;
		}
		
		zWatch.unlisten({onFloatUp: this, onShow: this});
		this.setFloating_(false);
		this.$supers(zul.wgt.Popup, 'unbind_', arguments);
	},
	onShow: function () {
		this._fixWdh();
		this._fixHgh();
	},
	_offsetHeight: function () {
		var node = this.$n(),
			h = node.offsetHeight - 1, 
			tl = jq(node).find('> div:first-child')[0],
			bl = jq(node).find('> div:last')[0],
			n = this.getCaveNode().parentNode,
			bd = this.$n('body');
		
			h -= tl.offsetHeight;
			h -= bl.offsetHeight;
			h -= zk(n).padBorderHeight();
			h -= zk(bd).padBorderHeight();
		return h;
	},
	_fixHgh: function () {
		var hgh = this.$n().style.height,
			c = this.getCaveNode();
		if (zk.ie6_ && ((hgh && hgh != "auto" )|| c.style.height)) c.style.height = "0px";
		if (hgh && hgh != "auto")
			zk(c).setOffsetHeight(this._offsetHeight());
		else 
			c.style.height = "auto";
	},
	_fixWdh: zk.ie7_ ? function () {
		var node = this.$n(),
			wdh = node.style.width,
			cn = jq(node).children('div'),
			fir = cn[0],
			last = cn[cn.length - 1],
			n = this.$n('cave').parentNode;
		
		if (!wdh || wdh == "auto") { 
			var diff = zk(n.parentNode).padBorderWidth() + zk(n.parentNode.parentNode).padBorderWidth();
			if (fir) {
				fir.firstChild.style.width = jq.px0(n.offsetWidth - (zk(fir).padBorderWidth()
					+ zk(fir.firstChild).padBorderWidth() - diff));
			}
			if (last) {
				last.firstChild.style.width = jq.px0(n.offsetWidth - (zk(last).padBorderWidth()
					+ zk(last.firstChild).padBorderWidth() - diff));
			}
		} else {
			if (fir) fir.firstChild.style.width = "";
			if (last) last.firstChild.style.width = "";
		}
	}: zk.$void,
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		zWatch.fireDown('onShow', this);
	},
	prologHTML_: function (out) {
	},
	epilogHTML_: function (out) {
	}
});

zkreg('zul.wgt.Popup',true);zk._m={};
zk._m['default']=
function (out) {
	var zcls = this.getZclass();
    out.push('<div', this.domAttrs_(), '><div class="', zcls, '-tl"><div class="',
			 zcls, '-tr"></div></div>', '<div id="', this.uuid, '-body" class="',
			  zcls, '-cl"><div class="', zcls, '-cr"><div class="', zcls, '-cm">',
			   '<div id="', this.uuid, '-cave" class="', zcls, '-cnt">');
	this.prologHTML_(out);
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	this.epilogHTML_(out);
	out.push('</div></div></div></div><div class="', zcls, '-bl"><div class="',
			zcls, '-br"></div></div></div>');
}
;zkmld(zk._p.p.Popup,zk._m);

zul.wgt.Radio = zk.$extends(zul.wgt.Checkbox, {
	$define: {
		
		
		value: function (v) {
			var n = this.$n('real');
			if (n) n.value = v || '';
		}
	},
	
	getRadiogroup: function (parent) {
		var wgt = parent || this.parent;
		for (; wgt; wgt = wgt.parent)
			if (wgt.$instanceof(zul.wgt.Radiogroup)) return wgt;
		return null;
	},
	
	setChecked: _zkf = function (checked) {
		if (checked != this._checked) {
			this._checked = checked;
			var n = this.$n('real');
			if (n) {
				n.checked = checked || false;

				var group = this.getRadiogroup();
				if (group) {
					
					if (checked) {
						for (var items = group.getItems(), i = items.length; i--;) {
							if (items[i] != this) {
								items[i].$n('real').checked = false;
								items[i]._checked = false;
							}
						}
					}
					group._fixSelectedIndex();
				}
			}
		}
		return this;
	},
	
	setSelected: _zkf,
	
	isSelected: zul.wgt.Checkbox.prototype.isChecked,
	
	getName: function () {
		var group = this.getRadiogroup();
		return group != null ? group.getName(): this.uuid;
	},
	contentAttrs_: function () {
		var html = this.$supers('contentAttrs_', arguments);
		html += ' value="' + this.getValue() + '"';
		return html;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-radio";
	},
	beforeParentChanged_: function (newParent) {
		var oldParent = this.getRadiogroup(),
			newParent = newParent ? this.getRadiogroup(newParent) : null;
		if (oldParent != newParent) {
			if (oldParent && oldParent.$instanceof(zul.wgt.Radiogroup))
				oldParent._fixOnRemove(this); 
			if (newParent && newParent.$instanceof(zul.wgt.Radiogroup))
				newParent._fixOnAdd(this); 
		}
		this.$supers("beforeParentChanged_", arguments);
	}
});

zkreg('zul.wgt.Radio');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		rg = this.getRadiogroup();
	out.push('<span', this.domAttrs_(), '>', '<input type="radio" id="', uuid,
		'-real"', this.contentAttrs_(), '/><label for="', uuid, '-real"',
		this.domTextStyleAttr_(), ' class="', zcls, '-cnt">', this.domContent_(),
		'</label>', (rg && rg._orient == 'vertical' ? '<br/>' :''), '</span>');
}
;zkmld(zk._p.p.Radio,zk._m);

zul.wgt.Radiogroup = zk.$extends(zul.Widget, {
	_orient: 'horizontal',
	_jsel: -1,

	$define: { 
		
		
		orient: function () {
			this.rerender();
		},
		
		
		name: function (v) {
			for (var items = this.getItems(), i = items.length; i--;)
				items[i].setName(name);
		}
	},
	
	getItemAtIndex: function (index) {
		if (index < 0)
			return null;
		return this._getAt(this, {value: 0}, index);
	},
	
	getItemCount: function () {
		return this.getItems().length;
	},
	
	getItems: function () {
		return this._concatItem(this);
	},
	
	getSelectedIndex: function () {
		return this._jsel;
	},
	
	setSelectedIndex: function (jsel) {
		if (jsel < 0) jsel = -1;
		if (this._jsel != jsel) {
			if (jsel < 0) {
				getSelectedItem().setSelected(false);
			} else {
				getItemAtIndex(jsel).setSelected(true);
			}
		}
	},
	
	getSelectedItem: function () {
		return this._jsel >= 0 ? this.getItemAtIndex(this._jsel): null;
	},
	
	setSelectedItem: function (item) {
		if (item == null)
			this.setSelectedIndex(-1);
		else if (item.$instanceof(zul.wgt.Radio))
			item.setSelected(true);
	},
	appendItem: function (label, value) {
		var item = new zul.wgt.Radio();
		item.setLabel(label);
		item.setValue(value);
		this.appendChild(item);
		return item;
	},
	
	removeItemAt: function (index) {
		var item = this.getItemAtIndex(index);
		this.removeChild(item);
		return item;
	},

	
	_fixSelectedIndex: function () {
		this._jsel = this._fixSelIndex(this, {value: 0});
	},
	_concatItem: function (cmp) {
		var sum = [];
		for (var wgt = cmp.firstChild; wgt; wgt = wgt.nextSibling) {			
			if (wgt.$instanceof(zul.wgt.Radio)) 
				sum.push(wgt);
			else 
				if (!wgt.$instanceof(zul.wgt.Radiogroup)) { 
					sum = sum.concat(this._concatItem(wgt));
				}
		}
		return sum;
	},
	_getAt: function (cmp, cur, index) {
		for (var cnt = 0, wgt = cmp.firstChild; wgt; wgt = wgt.nextSibling) {
			if (wgt.$instanceof(zul.wgt.Radio)) {
				if (cnt.value++ == index) return wgt;
			} else if (!wgt.$instanceof(zul.wgt.Radiogroup)) {
				var r = this._getAt(wgt, cur, index);
				if (r != null) return r;
			}				
		}
		return null;
	},
	_fixOnAdd: function (child) {
		if (this._jsel >= 0 && child.isSelected()) {
			child.setSelected(false); 
		} else {
			this._fixSelectedIndex();
		}
	},
	_fixOnRemove: function (child) {
		if (child.isSelected()) {
			this._jsel = -1;
		} else if (this._jsel > 0) { 
			this._fixSelectedIndex();
		}
	},
	_fixSelIndex: function (cmp, cur) {
		for (var wgt = cmp.firstChild; wgt; wgt = wgt.nextSibling) {
			if (wgt.$instanceof(zul.wgt.Radio)) {
				if (wgt.isSelected())
					return cur.value;
				++cur.value;
			} else if (!wgt.$instanceof(zul.wgt.Radiogroup)) {
				var jsel = this._fixSelIndex(wgt, cur);
				if (jsel >= 0) return jsel;
			}
		}
		return -1;
	}
});

zkreg('zul.wgt.Radiogroup');zk._m={};
zk._m['default']=
function (out) {
	out.push('<span', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</span>');
}
;zkmld(zk._p.p.Radiogroup,zk._m);

zul.wgt.Toolbar = zk.$extends(zul.Widget, {
	_orient: "horizontal",
	_align: "start",

	$define: {
		
		
		align: _zkf = function () {
			this.rerender();
		},
		
		
		orient: _zkf
	},

	
	getZclass: function(){
		var zcls = this._zclass;
		return zcls ? zcls : "z-toolbar"
			+ (this.parent && zk.isLoaded('zul.tab') && this.parent.$instanceof(zul.tab.Tabbox) ? "-tabs" : "") 
			+ (this.inPanelMold() ? "-panel" : "");
	}, 
	
	inPanelMold: function(){
		return this._mold == "panel";
	},
	
	onChildAdded_: function(){
		this.$supers('onChildAdded_', arguments);
		if (this.inPanelMold()) 
			this.rerender();
	},
	onChildRemoved_: function(){
		this.$supers('onChildRemoved_', arguments);
		if (!this.childReplacing_ && this.inPanelMold())
			this.rerender();
	}
	
});

zkreg('zul.wgt.Toolbar',true);zk._m={};
zk._m['panel']=
function (out) {
	var zcls = this.getZclass();
	out.push('<div ', this.domAttrs_(), '>', '<div class="', zcls, '-body ',
				zcls, '-', this.getAlign(), '" >', '<table id="', this.uuid,
				'-cnt" class="', zcls, '-cnt"', zUtl.cellps0, '><tbody>');
	if ('vertical' != this.getOrient()) {
		out.push("<tr>");
		for (var w = this.firstChild; w; w = w.nextSibling) {
			out.push('<td class="', zcls, '-hor">');
			w.redraw(out);
			out.push("</td>");
		}
		out.push("</tr>");
	} else {
		for (var w = this.firstChild; w; w = w.nextSibling) {
			out.push('<tr><td class="', zcls, '-ver">');
			w.redraw(out);
			out.push('</td></tr>');
		}
	}
	out.push('</tbody></table><div class="z-clear"></div></div></div>');
}

;zk._m['default']=
function (out) {
	var zcls = this.getZclass(),
		space = 'vertical' != this.getOrient() ? '' : '<br/>';
		
	out.push('<div ', this.domAttrs_(), '>', '<div id="', this.uuid, '-cave"',
				' class="', zcls, "-body ", zcls, '-', this.getAlign(), '" >');
	
	for (var w = this.firstChild; w; w = w.nextSibling) {
		out.push(space);
		w.redraw(out);
	}
	out.push('</div><div class="z-clear"></div></div>');
}
;zkmld(zk._p.p.Toolbar,zk._m);

zul.wgt.Toolbarbutton = zk.$extends(zul.LabelImageWidget, {
	_orient: "horizontal",
	_dir: "normal",
	_tabindex: -1,

	$define: {
		
		
		disabled: function () {
			this.rerender(); 
		},
		
		
		href: null,
		
		
		target: null,
		
		
		dir: _zkf = function () {
			this.updateDomContent_();
		},
		
		
		orient: _zkf,
		
		
		tabindex: function (v) {
			var n = this.$n();
			if (n) n.tabIndex = v < 0 ? '' : v;
		},
		
		
		upload: function (v) {
			var n = this.$n();
			if (n && !this._disabled) {
				this._cleanUpld();
				if (v && v != 'false') this._initUpld();
			}
		}
	},

	
	getZclass: function(){
		var zcls = this._zclass;
		return zcls ? zcls : "z-toolbarbutton";
	},
	getTextNode: function () {
		return this.$n().firstChild.firstChild;
	},
	bind_: function(){
		this.$supers(zul.wgt.Toolbarbutton, 'bind_', arguments);
		if (!this._disabled) {
			var n = this.$n();
			this.domListen_(n, "onFocus", "doFocus_")
				.domListen_(n, "onBlur", "doBlur_");
		}
		if (!this._disabled && this._upload) this._initUpld();
	},
	unbind_: function(){
		if (!this._disabled && this._upload) this._cleanUpld();
		var n = this.$n();
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_");

		this.$supers(zul.wgt.Toolbarbutton, 'unbind_', arguments);
	},
	_initUpld: function () {
		var v;
		if (v = this._upload)
			this._uplder = new zul.Upload(this, null, v);
	},
	_cleanUpld: function () {
		var v;
		if (v = this._uplder) {
			this._uplder = null;
			v.destroy();
		}
	},
	domContent_: function(){
		var label = zUtl.encodeXML(this.getLabel()), img = this.getImage();
		if (!img)
			return label;

		img = '<img src="' + img + '" align="absmiddle" />';
		var space = "vertical" == this.getOrient() ? '<br/>' : '&nbsp;';
		return this.getDir() == 'reverse' ? label + space + img : img + space + label;
	},
	domClass_: function(no){
		var scls = this.$supers('domClass_', arguments);
		if (this._disabled && (!no || !no.zclass)) {
			var s = this.getZclass();
			if (s)
				scls += (scls ? ' ' : '') + s + '-disd';
		}
		return scls;
	},
	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments),
			v = this.getTabindex();
		if (v)
			attr += ' tabIndex="' + v + '"';
		return attr;
	},	
	doClick_: function(evt){
		if (!this.isDisabled()) {
			this.fireX(evt);

			if (!evt.stopped) {
				var href = this._href;
				if (href)
					zUtl.go(href, {target: this._target || (evt.data.ctrlKey ? '_blank' : '')});
				this.$super('doClick_', evt, true);
			}
		}
	},
	doMouseOver_: function (evt) {
		if (!this.isDisabled()) {
			jq(this).addClass(this.getZclass() + '-over');
			this.$supers('doMouseOver_', arguments);
		}
	},
	doMouseOut_: function (evt) {
		if (!this.isDisabled()) {
			jq(this).removeClass(this.getZclass() + '-over');
			this.$supers('doMouseOut_', arguments);
		}
	}
});

zkreg('zul.wgt.Toolbarbutton');zk._m={};
zk._m['default']=
function (out) {
	var zcls = this.getZclass();
	out.push('<div', this.domAttrs_(), '><div class="',
		zcls, '-body"><div ', this.domTextStyleAttr_(), 
		'class="', zcls, '-cnt">', this.domContent_(),
		'</div></div></div>');
}

;zkmld(zk._p.p.Toolbarbutton,zk._m);

zul.wgt.Image = zk.$extends(zul.Widget, {
	$define: {
		
		
		src: function (v) {
			var n = this.getImageNode();
			if (n) n.src = v || '';
		},
		
		
		hover: null,
		
		
		align: function (v) {
			var n = this.getImageNode();
			if (n) n.align = v || '';
		},
		
		
		border: function (v) {
			var n = this.getImageNode();
			if (n) n.border = v || '';
		},
		
		
		hspace: function (v) {
			var n = this.getImageNode();
			if (n) n.hspace = v;
		},
		
		
		vspace: function (v) {
			var n = this.getImageNode();
			if (n) n.vspace = v;
		}
	},
	
	getImageNode: function () {
		return this.$n();
	},

	
	doMouseOver_: function () {
		var hover = this._hover;
		if (hover) {
			var img = this.getImageNode();
			if (img) img.src = hover;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function () {
		if (this._hover) {
			var img = this.getImageNode();
			if (img) img.src = this._src || '';
		}
		this.$supers('doMouseOut_', arguments);
	},
	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments);
		if (!no || !no.content)
			attr += this.contentAttrs_();
		return attr;
	},
	
	contentAttrs_: function () {
		var attr = ' src="' + (this._src || '') + '"', v;
		if (v = this._align) 
			attr += ' align="' + v + '"';
		if (v = this._border) 
			attr += ' border="' + v + '"';
		if (v = this._hspace) 
			attr += ' hspace="' + v + '"';
		if (v = this._vspace) 
			attr += ' vspace="' + v + '"';
		return attr;
	}
});

zkreg('zul.wgt.Image');zk._m={};
zk._m['alphafix']=
function (out) {
	out.push('<image', this.domAttrs_(), '/>');
}
;zk._m['default']=[zk._p.p.Image,'alphafix'];zkmld(zk._p.p.Image,zk._m);

zul.wgt.Imagemap = zk.$extends(zul.wgt.Image, {
	bind_: function () {
		this.$supers(zul.wgt.Imagemap, 'bind_', arguments);

		if (!jq('#zk_hfr_')[0])
			jq.newFrame('zk_hfr_', null,
				zk.safari ? 'position:absolute;top:-1000px;left:-1000px;width:0;height:0;display:inline'
					: null);
			
			
	},

	
	getImageNode: function () {
		return this.$n("real");
	},
	getCaveNode: function () {
		return this.$n("map");
	},
	doClick_: function (evt) {
		
		
	},
	onChildAdded_: function () {
		this.$supers('onChildAdded_', arguments);
		if (this.desktop && this.firstChild == this.lastChild) 
			this._fixchd(true);
	},
	onChildRemoved_: function () {
		this.$supers('onChildRemoved_', arguments);
		if (this.desktop && !this.firstChild) 
			this._fixchd(false);
	},
	_fixchd: function (bArea) {
		var mapid = this.uuid + '-map';
		img = this.getImageNode();
		img.useMap = bArea ? '#' + mapid : '';
		img.isMap = !bArea;
	},
	contentAttrs_: function () {
		var attr = this.$supers('contentAttrs_', arguments);
		return attr +(this.firstChild ? ' usemap="#' + this.uuid + '-map"':
			' ismap="ismap"');
	},

	
	fromPageCoord: function (x, y) {
		
		var ofs = zk(this.getImageNode()).revisedOffset();
		return [x - ofs[0], y - ofs[1]];
	},

	_doneURI: function () {
		var Imagemap = zul.wgt.Imagemap,
			url = Imagemap._doneURI;
		return url ? url:
			Imagemap._doneURI = zk.IMAGEMAP_DONE_URI ? zk.IMAGEMAP_DONE_URI:
				zk.ajaxURI('/web/zul/html/imagemap-done.html', {desktop:this.desktop,au:true});
	}
},{
	
	onclick: function (href) {
		if (zul.wgt.Imagemap._toofast()) return;

		var j = href.indexOf('?');
		if (j < 0) return;

		var k = href.indexOf('?', ++j);
		if (k < 0 ) return;

		var id = href.substring(j, k),
			wgt = zk.Widget.$(id);
		if (!wgt) return; 

		j = href.indexOf(',', ++k);
		if (j < 0) return;

		wgt.fire('onClick', {
			x: zk.parseInt(href.substring(k, j)),
			y: zk.parseInt(href.substring(j + 1))
		}, {ctl:true});
	},
	_toofast: function () {
		if (zk.gecko) { 
			var Imagemap = zul.wgt.Imagemap,
				now = zUtl.now();
			if (Imagemap._stamp && now - Imagemap._stamp < 800)
				return true;
			Imagemap._stamp = now;
		}
		return false;
	}
});

zkreg('zul.wgt.Imagemap');zk._m={};
zk._m['alphafix']=
function (out) {
	var uuid = this.uuid, mapid = uuid + '-map';
	out.push('<span', this.domAttrs_({content:1}), '><a href="',
		this._doneURI(), '?', uuid, '" target="zk_hfr_"><img id="',
		uuid, '-real"', this.contentAttrs_(),
		'/></a><map name="', mapid, '" id="', mapid, '">');

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</map></span>');
}

;zk._m['default']=[zk._p.p.Imagemap,'alphafix'];zkmld(zk._p.p.Imagemap,zk._m);

zul.wgt.Area = zk.$extends(zk.Widget, {
	$define: {
		
		
		shape: function (v) {
			var n = this.$n();
			if (n) n.shape = v || '';
		},
		
		
		coords: function (coords) {
			var n = this.$n();
			if (n) n.coords = v || '';
		}
	},

	
	doClick_: function (evt) {
		if (zul.wgt.Imagemap._toofast()) return;

		var area = this.id || this.uuid;
		this.parent.fire('onClick', {area: area}, {ctl:true});
		evt.stop();
	},

	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments)
			+ ' href="javascript:;"', v;
		if (v = this._coords) 
			attr += ' coords="' + v + '"';
		if (v = this._shape) 
			attr += ' shape="' + v + '"';
		return attr;
	}
});

zkreg('zul.wgt.Area');zk._m={};
zk._m['default']=
function (out) {
	out.push('<area', this.domAttrs_(), '/>');
}
;zkmld(zk._p.p.Area,zk._m);

zul.wgt.Chart = zk.$extends(zul.wgt.Imagemap, {
});

zkreg('zul.wgt.Chart');zk._m={};
zk._m['default']=[zk._p.p.Imagemap,'alphafix'];zkmld(zk._p.p.Chart,zk._m);

zul.wgt.Captcha = zk.$extends(zul.wgt.Image, {
});

zkreg('zul.wgt.Captcha');zk._m={};
zk._m['default']=[zk._p.p.Image,'alphafix'];zkmld(zk._p.p.Captcha,zk._m);

zul.wgt.Progressmeter = zk.$extends(zul.Widget, {
	_value: 0,

	$define: {
		
		
		value: function () {
			if(this.$n()) 
				this._fixImgWidth();
		}
	},

	
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-progressmeter";
	},
	_fixImgWidth: _zkf = function() {
		var n = this.$n(), 
			img = this.$n("img");
		if (img) {
			if (zk.ie6_) img.style.width = ""; 
			img.style.width = Math.round((n.clientWidth * this._value) / 100) + "px";
		}
	},
	onSize: _zkf,
	onShow: _zkf,
	bind_: function () {
		this.$supers(zul.wgt.Progressmeter, 'bind_', arguments); 
		this._fixImgWidth(this._value);
		zWatch.listen({onSize: this, onShow: this});
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(zul.wgt.Progressmeter, 'unbind_', arguments);
	},
	setWidth : function (val){
		this.$supers('setWidth', arguments);
		this._fixImgWidth();
	}
});


zkreg('zul.wgt.Progressmeter');zk._m={};
zk._m['default']=
function (out) {
	out.push('<div', this.domAttrs_(), '><span id="',
			this.uuid,'-img"', 'class="', this.getZclass(),'-img"></span></div>');
}
;zkmld(zk._p.p.Progressmeter,zk._m);

zul.wgt.Fileupload = zk.$extends(zul.wgt.Button, {
});

zkreg('zul.wgt.Fileupload');
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.wgt',1);zk.load('zul,zul.wgt',function(){zk._p=zkpi('zul.box',true);try{



(function () {

	
	function _spacing0(spacing) {
		return spacing && spacing.startsWith('0')
			&& (spacing.length == 1 || zUtl.isChar(spacing.charAt(1),{digit:1}));
	}
	function _spacingHTML(box, child) {
		var oo = [],
			spacing = box._spacing,
			spacing0 = _spacing0(spacing),
			vert = box.isVertical(),
			spstyle = spacing ? (vert?'height:':'width:') + spacing: 'px';

		oo.push('<t', vert?'r':'d', ' id="', child.uuid,
			'-chdex2" class="', box.getZclass(), '-sep"');

		var s = spstyle;
		if (spacing0 || !child.isVisible()) s = 'display:none;' + s;
		if (s) oo.push(' style="', s, '"');

		oo.push('>', vert?'<td>':'', zUtl.i0, vert?'</td></tr>':'</td>');
		return oo.join('');
	}

	
	function _fixTd() {
		
		var vert = this.isVertical();
		if (this._isStretchAlign() || (vert && this._nhflex) || (!vert && this._nvflex)) {
			for(var child = this.firstChild; child; child = child.nextSibling) {
				if (child.isVisible()) {
					var c = child.$n();
					if (vert) {
						if (child._nhflex)
							child.setFlexSize_({width:'auto'});
						else if (c) {
									 
							var oldwidth= c.style.width;
							if (oldwidth) {
								var oldoffwidth= c.offsetWidth;
								c.style.width= ''; 
								if (c.offsetWidth > oldoffwidth)
									c.style.width= oldwidth;
							}
						}
						if (!child.$instanceof(zul.wgt.Cell) && this._nhflex) {
							var chdex = child.$n('chdex');
							chdex.style.width = '';
						}
					} else {
						if (child._nvflex)
							child.setFlexSize_({height:'auto'});
						else if (c) {
									 
							var oldheight= c.style.height;
							if (oldheight) {
								var oldoffheight = c.offsetHeight;
								c.style.height= ''; 
								if (c.offsetHeight > oldoffheight)
									c.style.height= oldheight;
							}
						}
						if (!child.$instanceof(zul.wgt.Cell) && this._nvflex) {
							var chdex = child.$n('chdex');
							chdex.style.height = '';
						}
					}
				}
			}
		}
		
		
		if (zk.safari && !vert && this.$n().style.height) {
			var td = this.$n('frame');
			td.style.height = '';
			
			var	hgh = td.offsetHeight;
			td.style.height = hgh+'px';
		}
	}

var Box =

zul.box.Box = zk.$extends(zul.Widget, {
	_mold: 'vertical',
	_align: 'start',
	_pack: 'start',

	$define: {
		
		
		align: 
		    _zkf = function () {
		    	this.rerender(); 
		    },
		
		
		pack: _zkf,
		
		
		spacing: _zkf,
		widths: _zkf = function (val) {
		    this._sizes = val;
		    this.rerender();
		}
	},
	setHeights: function (val) {
		this.setWidths(val);
	},
	getHeights: function () {
		return this.getWidths();
	},
	
	isVertical: function () {
		return 'vertical' == this._mold;
	},
	
	getOrient: function () {
		return this._mold;
	},

	
	getZclass: function () {
		var zcs = this._zclass;
		return zcs != null ? zcs: this.isVertical() ? "z-vbox" : "z-hbox";
	},

	onChildVisible_: function (child) {
		this.$supers('onChildVisible_', arguments);
		if (this.desktop) this._fixChildDomVisible(child, child._visible);
	},
	replaceChildHTML_: function (child) {
		this.$supers('replaceChildHTML_', arguments);
		this._fixChildDomVisible(child, child._visible);
	},
	_fixChildDomVisible: function (child, visible) {
		var n = this._chdextr(child);
		if (n) n.style.display = visible ? '': 'none';
		n = child.$n('chdex2');
		if (n) n.style.display = visible && !_spacing0(this._spacing) ? '': 'none';

		if (this.lastChild == child) {
			n = child.previousSibling;
			if (n) {
				n = n.$n('chdex2');
				if (n) n.style.display = visible ? '': 'none';
			}
		}
	},
	_chdextr: function (child) {
		return child.$n('chdex') || child.$n();
	},
	insertChildHTML_: function (child, before, desktop) {
		if (before) {
			jq(this._chdextr(before)).before(this.encloseChildHTML_(child));
		} else {
			var n = this.$n('real'), tbs = n.tBodies;
			if (!tbs || !tbs.length)
				n.appendChild(document.createElement("tbody"));
			jq(this.isVertical() ? tbs[0]: tbs[0].rows[0]).append(
				this.encloseChildHTML_(child, true));
		}
		child.bind(desktop);
	},
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		jq(child.uuid + '-chdex', zk).remove();
		jq(child.uuid + '-chdex2', zk).remove();
		var sib;
		if (this.lastChild == child && (sib = child.previousSibling)) 
			jq(sib.uuid + '-chdex2', zk).remove();
	},
	
	encloseChildHTML_: function (child, prefixSpace, out) {
		var oo = [],
			isCell = child.$instanceof(zul.wgt.Cell);
		if (this.isVertical()) {
			oo.push('<tr id="', child.uuid, '-chdex"',
				this._childOuterAttrs(child), '>');
				
			if (!isCell) {
				oo.push('<td', this._childInnerAttrs(child));
				
				var v = this.getAlign();
				if (v && v != 'stretch') oo.push(' align="', zul.box.Box._toHalign(v), '"');
				oo.push('>');
			}
				
			child.redraw(oo);
			
			if (!isCell) oo.push('</td>');
			
			oo.push('</tr>');

		} else {
			if (!isCell) {
				oo.push('<td id="', child.uuid, '-chdex"',
				this._childOuterAttrs(child),
				this._childInnerAttrs(child),
				'>');
			}
			child.redraw(oo);
			if (!isCell)
				oo.push('</td>');
		}
		
		if (child.nextSibling)
			oo.push(_spacingHTML(this, child));
		else if (prefixSpace) {
			var pre = child.previousSibling;
			if (pre) oo.unshift(_spacingHTML(this, pre));
		}
		
		if (!out) return oo.join('');

		for (var j = 0, len = oo.length; j < len; ++j)
			out.push(oo[j]);
	},
	_resetBoxSize: function () {
		var	vert = this.isVertical(),
			k = -1,
			szes = this._sizes;
		if (vert) {
			for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
				if (szes && !kid.$instanceof(zul.box.Splitter) && !kid.$instanceof(zul.wgt.Cell))
					++k;
				if (kid._nvflex) {
					kid.setFlexSize_({height:'', width:''});
					var chdex = kid.$n('chdex');
					if (chdex) {
						chdex.style.height = szes && k < szes.length ? szes[k] : '';
						chdex.style.width = '';
					}
				}
			}
		} else {
			for (var kid = this.firstChild; kid; kid = kid.nextSibling) {
				if (szes && !kid.$instanceof(zul.box.Splitter) && !kid.$instanceof(zul.wgt.Cell))
					++k;
				if (kid._nhflex) {
					kid.setFlexSize_({height:'', width:''});
					var chdex = kid.$n('chdex');
					if (chdex) {
						chdex.style.width = szes && k < szes.length ? szes[k] : '';
						chdex.style.height = '';
					}
				}
			}
		}
		
		var p = this.$n(),
			zkp = zk(p),
			offhgh = p.offsetHeight,
			offwdh = p.offsetWidth,
			curhgh = this._vflexsz !== undefined ? this._vflexsz - zkp.sumStyles("tb", jq.margins) : offhgh,
			curwdh = this._hflexsz !== undefined ? this._hflexsz - zkp.sumStyles("lr", jq.margins) : offwdh,
			hgh = zkp.revisedHeight(curhgh < offhgh ? curhgh : offhgh),
			wdh = zkp.revisedWidth(curwdh < offwdh ? curwdh : offwdh);
		return zkp ? {height: hgh, width: wdh} : {};
	},
	beforeChildrenFlex_: function(child) {
		if (child._flexFixed || (!child._nvflex && !child._nhflex)) { 
			delete child._flexFixed;
			return false;
		}
		
		child._flexFixed = true;
		
		var	vert = this.isVertical(),
			vflexs = [],
			vflexsz = vert ? 0 : 1,
			hflexs = [],
			hflexsz = !vert ? 0 : 1,
			p = child.$n('chdex').parentNode,
			zkp = zk(p),
			psz = this._resetBoxSize(),
			hgh = psz.height,
			wdh = psz.width,
			xc = p.firstChild,
			k = -1,
			szes = this._sizes;
		
		for (; xc; xc = xc.nextSibling) {
			var c = xc.id && xc.id.endsWith('-chdex') ? vert ? xc.firstChild.firstChild : xc.firstChild : xc,
				zkc = zk(c),
				fixedSize = false;
			if (zkc.isVisible()) {
				var j = c.id ? c.id.indexOf('-') : 1,
						cwgt = j < 0 ? zk.Widget.$(c.id) : null;

				if (szes && cwgt && !cwgt.$instanceof(zul.box.Splitter) && !cwgt.$instanceof(zul.wgt.Cell)) {
					++k;
					if (k < szes.length && szes[k] && ((vert && !cwgt._nvflex) || (!vert && !cwgt._nhflex))) {
						c = xc;
						zkc = zk(c);
						fixedSize = szes[k].endsWith('px');
					}
				}
				var offhgh = fixedSize && vert ? zk.parseInt(szes[k]) : 
						zk.ie && xc.id && xc.id.endsWith('-chdex2') && xc.style.height && xc.style.height.endsWith('px') ? 
						zk.parseInt(xc.style.height) : zkc.offsetHeight(),
					offwdh = fixedSize && !vert ? zk.parseInt(szes[k]) : zkc.offsetWidth(),
					cwdh = offwdh + zkc.sumStyles("lr", jq.margins),
					chgh = offhgh + zkc.sumStyles("tb", jq.margins);
				
				
				if (cwgt && cwgt._nvflex) {
					if (cwgt !== child)
						cwgt._flexFixed = true; 
					if (cwgt._vflex == 'min')
						cwgt.fixMinFlex_(c, 'h');
					else {
						vflexs.push(cwgt);
						if (vert) vflexsz += cwgt._nvflex;
					}
				} else if (vert) hgh -= chgh;
				
				
				if (cwgt && cwgt._nhflex) {
					if (cwgt !== child)
						cwgt._flexFixed = true; 
					if (cwgt._hflex == 'min')
						cwgt.fixMinFlex_(c, 'w');
					else {
						hflexs.push(cwgt);
						if (!vert) hflexsz += cwgt._nhflex;
					}
				} else if (!vert) wdh -= cwdh;
			}
		}

		
		
		var lastsz = hgh > 0 ? hgh : 0;
		for (var j = vflexs.length - 1; j > 0; --j) {
			var cwgt = vflexs.shift(), 
				vsz = (cwgt._nvflex * hgh / vflexsz) | 0, 
				offtop = cwgt.$n().offsetTop,
				isz = vsz - ((zk.ie && offtop > 0) ? (offtop * 2) : 0); 
			cwgt.setFlexSize_({height:isz});
			cwgt._vflexsz = vsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.height = jq.px0(zk(chdex).revisedHeight(vsz, true));
			}
			if (vert) lastsz -= vsz;
		}
		
		if (vflexs.length) {
			var cwgt = vflexs.shift(),
				offtop = cwgt.$n().offsetTop,
				isz = lastsz - ((zk.ie && offtop > 0) ? (offtop * 2) : 0);
			cwgt.setFlexSize_({height:isz});
			cwgt._vflexsz = lastsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.height = jq.px0(zk(chdex).revisedHeight(lastsz, true));
			}
		}
		
		
		
		lastsz = wdh > 0 ? wdh : 0;
		for (var j = hflexs.length - 1; j > 0; --j) {
			var cwgt = hflexs.shift(), 
				hsz = (cwgt._nhflex * wdh / hflexsz) | 0; 
			cwgt.setFlexSize_({width:hsz});
			cwgt._hflexsz = hsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.width = jq.px0(zk(chdex).revisedWidth(hsz, true));
			}
			if (!vert) lastsz -= hsz;
		}
		
		if (hflexs.length) {
			var cwgt = hflexs.shift();
			cwgt.setFlexSize_({width:lastsz});
			cwgt._hflexsz = lastsz;
			if (!cwgt.$instanceof(zul.wgt.Cell)) {
				var chdex = cwgt.$n('chdex');
				chdex.style.width = jq.px0(zk(chdex).revisedWidth(lastsz, true));
			}
		}
		
		
		child.parent.afterChildrenFlex_(child);
		child._flexFixed = false;
		
		return false; 
	},
	_childOuterAttrs: function (child) {
		var html = '';
		if (child.$instanceof(zul.box.Splitter))
			html = ' class="' + child.getZclass() + '-outer"';
		else if (this.isVertical()) {
			if (this._isStretchPack()) {
				var v = this._pack2; 
				html = ' valign="' + (v ? zul.box.Box._toValign(v) : 'top') + '"';
			} else html = ' valign="top"';
		} else
			return ''; 

		if (!child.isVisible()) html += ' style="display:none"';
		return html;
	},
	_childInnerAttrs: function (child) {
		var html = '',
			vert = this.isVertical(),
			$Splitter = zul.box.Splitter;
		if (child.$instanceof($Splitter))
			return vert ? ' class="' + child.getZclass() + '-outer-td"': '';
				

		if (this._isStretchPack()) {
			var v = vert ? this.getAlign() : this._pack2;
			if (v) html += ' align="' + zul.box.Box._toHalign(v) + '"';
		}
		
		var style = '', szes = this._sizes;
		if (szes) {
			for (var j = 0, len = szes.length, c = this.firstChild;
			c && j < len; c = c.nextSibling) {
				if (child == c) {
					style = (vert ? 'height:':'width:') + szes[j];
					break;
				}
				if (!c.$instanceof($Splitter))
					++j;
			}
		}

		if (!vert && !child.isVisible()) style += style ? ';display:none' : 'display:none';
		if (!vert) style += style ? ';height:100%' : 'height:100%';
		return style ? html + ' style="' + style + '"': html;
	},
	_isStretchPack: function() {
		
		
		return this._splitterKid || this._stretchPack;
	},
	_isStretchAlign: function() {
		return this._align == 'stretch';
	},
	
	_bindWatch: function () {
		if (!this._watchBound) {
			this._watchBound = true;
			zWatch.listen({onSize: this, onShow: this, onHide: this});
		}
	},
	_unbindWatch: function() {
		if (this._watchBound) {
			zWatch.unlisten({onSize: this, onShow: this, onHide: this});
			delete this._watchBound;
		}
	},
	bind_: function() {
		this.$supers(Box, 'bind_', arguments);
		this._bindFixTd();
		if (this._isStretchAlign())
			this._bindAlign();
		if (this._splitterKid)
			this._bindWatch();
	},
	unbind_: function () {
		this._unbindWatch();
		this._unbindAlign();
		this._unbindFixTd();
		this.$supers(Box, 'unbind_', arguments);
	},
	_bindAlign: function() {
		if (!this._watchAlign) {
			this._watchAlign = true;
			zWatch.listen({onSize: [this, this._fixAlign], onShow: [this, this._fixAlign], onHide: [this, this._fixAlign]});
		}
	},
	_unbindAlign: function() {
		if (this._watchAlign) {
			zWatch.unlisten({onSize: [this, this._fixAlign], onShow: [this, this._fixAlign], onHide: [this, this._fixAlign]});
			delete this._watchAlign;
		}
	},
	_fixAlign: function () {
		if (this._isStretchAlign()) {
			var vert = this.isVertical(),
				td = this.$n('frame'),
				zktd = zk(td),
				tdsz = vert ? zktd.revisedWidth(td.offsetWidth) : zktd.revisedHeight(td.offsetHeight);
			
			for(var child = this.firstChild; child; child = child.nextSibling) {
				if (child.isVisible()) {
					var c = child.$n();
					
					if (vert)
						c.style.width = zk(c).revisedWidth(tdsz, !zk.safari) + 'px';
					else 
						c.style.height = zk(c).revisedHeight(tdsz - ((zk.ie && c.offsetTop > 0) ? (c.offsetTop * 2) : 0), !zk.safari) + 'px';
				}
			}
		}
	},
	_bindFixTd: function() {
		if (!this._watchTd) {
			this._watchTd = true;
			zWatch.listen({onSize: [this, _fixTd], onShow: [this, _fixTd], onHide: [this, _fixTd]});
		}
	},
	_unbindFixTd: function() {
		if (this._watchTd) {
			zWatch.unlisten({onSize: [this, _fixTd], onShow: [this, _fixTd], onHide: [this, _fixTd]});
			delete this._watchTd;
		}
	},
	_configPack: function() {
		var v = this._pack;
		if (v) {
	    	var v = v.split(',');
	    	if (v[0].trim() == 'stretch') {
	    		this._stretchPack = true;
	    		this._pack2 = v.length > 1 ? v[1].trim() : null;
	    	} else {
	    		this._stretchPack = v.length > 1 && v[1].trim() == 'stretch';
	    		this._pack2 = v[0].trim();
	    	}
    	} else {
    		delete this._pack2;
    		delete this._stretchPack;
    	}
	},
	
	onSize: _zkf = function () {
		if (!this._splitterKid) return; 
		var vert = this.isVertical(), node = this.$n(), real = this.$n('real');
		real.style.height = real.style.width = '100%'; 
		
		
		
	
		
		
		

		
		
		

		var nd = vert ? real.rows: real.rows[0].cells,
			total = vert ? zk(real).revisedHeight(real.offsetHeight):
							zk(real).revisedWidth(real.offsetWidth);

		for (var i = nd.length; i--;) {
			var d = nd[i];
			if (zk(d).isVisible())
				if (vert) {
					var diff = d.offsetHeight;
					if(d.id && !d.id.endsWith("-chdex2")) { 
						
						if (d.cells.length) {
							var c = d.cells[0];
							c.style.height = zk(c).revisedHeight(i ? diff: total) + "px";
							d.style.height = ""; 
						} else {
							d.style.height = zk(d).revisedHeight(i ? diff: total) + "px";
						}
					}
					total -= diff;
				} else {
					var diff = d.offsetWidth;
					if(d.id && !d.id.endsWith("-chdex2")) 
						d.style.width = zk(d).revisedWidth(i ? diff: total) + "px";
					total -= diff;
				}
		}
	},
	onShow: _zkf,
	onHide: _zkf
},{ 
	_toValign: function (v) {
		return v ? "start" == v ? "top": "center" == v ? "middle":
			"end" == v ? "bottom": v: null;
	},
	_toHalign: function (v) {
		return v ? "start" == v ? "left": "end" == v ? "right": v: null;
	}
});

})();

zkreg('zul.box.Box');zk._m={};
zk._m['vertical']=
function (out) {
	delete this._splitterKid; 
	for (var w = this.firstChild; w; w = w.nextSibling)
		if (w.$instanceof(zul.box.Splitter)) {
			this._splitterKid = true;
			break;
		}
	this._configPack();
	
	out.push('<table', this.domAttrs_(), zUtl.cellps0, '><tr');
	
	if (!this._isStretchPack() && this._pack2) out.push(' valign="', zul.box.Box._toValign(this._pack2), '"');
	out.push('><td id="', this.uuid, '-frame" style="width:100%');
	
	
	
	if (zk.ie || zk.safari) out.push(';height:100%');
	out.push('"');
	
	var v = this.getAlign();
	if (v && v != 'stretch') out.push(' align="', zul.box.Box._toHalign(v), '"');
	out.push('><table id="', this.uuid, '-real"', zUtl.cellps0, 'style="text-align:left');
	if (v == 'stretch' || (zk.safari && (v == null || v == 'start'))) out.push(';width:100%');
	if (this._isStretchPack()) out.push(';height:100%');
	out.push('">');

	for (var w = this.firstChild; w; w = w.nextSibling)
		this.encloseChildHTML_(w, false, out);

	out.push('</table></td></tr></table>');
}
;zk._m['horizontal']=
function (out) {
	delete this._splitterKid; 
	for (var w = this.firstChild; w; w = w.nextSibling)
		if (w.$instanceof(zul.box.Splitter)) {
			this._splitterKid = true;
			break;
		}
	this._configPack();
	
	out.push('<table', this.domAttrs_(), zUtl.cellps0, '><tr');
	
	var	v = this.getAlign();
	if (v && v != 'stretch') out.push(' valign="', zul.box.Box._toValign(v), '"');
	
	
	out.push('><td id="', this.uuid, '-frame" style="width:100%;height:100%"');
	
	if (!this._isStretchPack() && this._pack2) out.push(' align="', zul.box.Box._toHalign(this._pack2), '"');
	out.push('><table id="', this.uuid, '-real"', zUtl.cellps0, 'style="text-align:left');
	if (v == 'stretch') out.push(';height:100%');
	if (this._isStretchPack()) out.push(';width:100%');

	
	out.push('"><tr valign="', v && v != 'stretch' ? zul.box.Box._toValign(v) : 'top', '">');
	
	for (var w = this.firstChild; w; w = w.nextSibling)
		this.encloseChildHTML_(w, false, out);

	out.push('</tr></table></td></tr></table>');
}
;zkmld(zk._p.p.Box,zk._m);

zul.box.Splitter = zk.$extends(zul.Widget, {
	_collapse: "none",
	_open: true,

	$define: {
		
		
		open: function(open, opts) {
			var node = this.$n();
			if (!node) return;
			var colps = this.getCollapse();
			if (!colps || "none" == colps) return; 

			var nd = this.$n('chdex'),
				vert = this.isVertical(),
				Splitter = this.$class,
				before = colps == "before",
				sib = before ? Splitter._prev(nd): Splitter._next(nd),
				sibwgt = zk.Widget.$(sib),
				fd = vert ? "height": "width", diff;
			if (sib) {
				if (!open)
					zWatch.fireDown('onHide', sibwgt);

				sibwgt.setDomVisible_(sib, open);
				sibwgt.parent._fixChildDomVisible(sibwgt, open);
				
				var c = vert && sib.cells.length ? sib.cells[0] : sib;
				diff = zk.parseInt(c.style[fd]);
				if (!before && sibwgt && !sibwgt.nextSibling) {
					var sp = this.$n('chdex2');
					if (sp) {
						sp.style.display = open ? '': 'none';
						diff += zk.parseInt(sp.style[fd]);
					}
				}
			}

			var sib2 = before ? Splitter._next(nd): Splitter._prev(nd);
			if (sib2) {
				var c = vert && sib2.cells.length ? sib2.cells[0] : sib2;
				diff = zk.parseInt(c.style[fd]) + (open ? -diff: diff);
				if (diff < 0) diff = 0;
				c.style[fd] = diff + "px";
			}
			if (sib && open)
				zWatch.fireDown('onShow', sibwgt);
			if (sib2)
				zWatch.fireDown('onSize', zk.Widget.$(sib2));

			node.style.cursor = !open ? "default" : vert ? "s-resize": "e-resize";
			this._fixNSDomClass();
			this._fixbtn();
			this._fixszAll();

			if (!opts || opts.sendOnOpen)
				this.fire('onOpen', {open:open});
				
		}
	},

	
	isVertical: function () {
		var p = this.parent;
		return !p || p.isVertical();
	},
	
	getOrient: function () {
		var p = this.parent;
		return p ? p.getOrient(): "vertical";
	},

	
	getCollapse: function () {
		return this._collapse;
	},
	
	setCollapse: function(collapse) {
		if (this._collapse != collapse) {
			var bOpen = this._open;
			if (!bOpen)
				this.setOpen(true, {sendOnOpen:false}); 

			this._collapse = collapse;
			if (this.desktop) {
				this._fixbtn();
				this._fixsz();
			}

			if (!bOpen)
				this.setOpen(false, {sendOnOpen:false});
		}
	},

	
	getZclass: function () {
		var zcls = this._zclass,
			name = this.getMold() == "os" ? "z-splitter-os" : "z-splitter";
			
		return zcls ? zcls:	name + (this.isVertical() ? "-ver" : "-hor");
	},
	setZclass: function () {
		this.$supers('setZclass', arguments);
		if (this.desktop)
			this._fixDomClass(true);
	},

	bind_: function () {
		this.$supers(zul.box.Splitter, 'bind_', arguments);

		var box = this.parent;
		if (box && !box._splitterKid) box._bindWatch();

		zWatch.listen({onSize: this, beforeSize: this, onShow: this});

		this._fixDomClass();
			

		var node = this.$n(),
			Splitter = this.$class,
			vert = this.isVertical(),
			btn = this.$n('btn');
		node.style.cursor = this.isOpen() ?
			vert ? "s-resize": "e-resize": "default";
		btn.style.cursor = "pointer";

		if (!this.$weave) {
			var $btn = jq(btn);
			if (zk.ie)
				$btn.mouseover(Splitter.onover)
					.mouseout(Splitter.onout);
			$btn.click(Splitter.onclick);
		}

		this._fixbtn();

		this._drag = new zk.Draggable(this, node, {
			constraint: this.getOrient(), ignoredrag: Splitter._ignoresizing,
			ghosting: Splitter._ghostsizing, overlay: true, zIndex: 12000,
			snap: Splitter._snap, endeffect: Splitter._endDrag});

		if (!this.isOpen()) {
			var nd = this.$n('chdex'),
				colps = this.getCollapse();
			if (!colps || "none" == colps) return; 

			var sib = colps == "before" ? Splitter._prev(nd): Splitter._next(nd);
			jq(sib).hide(); 
			var sibwgt = zk.Widget.$(sib);
			sibwgt.parent._fixChildDomVisible(sibwgt, false);

			this._fixNSDomClass();
		}
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, beforeSize: this, onShow: this});

		var Splitter = this.$class,
			btn = this.$n('btn');
		if (btn) {
			var $btn = jq(btn);
			if (zk.ie)
				$btn.unbind("mouseover", Splitter.onover)
					.unbind("mouseout", Splitter.onout);
			$btn.unbind("click", Splitter.onclick);
		}

		this._drag.destroy();
		this._drag = null;
		this.$supers(zul.box.Splitter, 'unbind_', arguments);
	},

	
	_fixDomClass: function (inner) {
		var node = this.$n(),
			p = node.parentNode;
		if (p) {
			var vert = this.isVertical(),
				zcls = this.getZclass();;
			if (vert) p = p.parentNode; 
			if (p && p.id.endsWith("-chdex")) {
				p.className = zcls + "-outer";
				if (vert)
					node.parentNode.className = zcls + "-outer-td";
			}
		}
		if (inner) this._fixbtn();
	},
	_fixNSDomClass: function () {
		jq(this.$n())
			[this.isOpen()?'removeClass':'addClass'](this.getZclass()+"-ns");
	},
	_fixbtn: function () {
		var $btn = jq(this.$n('btn')),
			colps = this.getCollapse();
		if (!colps || "none" == colps) {
			$btn.hide();
		} else {
			var zcls = this.getZclass(),
				before = colps == "before";
			if (!this.isOpen()) before = !before;

			if (this.isVertical()) {
				$btn.removeClass(zcls + "-btn-" + (before ? "b" : "t"));
				$btn.addClass(zcls + "-btn-" + (before ? "t" : "b"));
			} else {
				$btn.removeClass(zcls + "-btn-" + (before ? "r" : "l"));
				$btn.addClass(zcls + "-btn-" + (before ? "l" : "r"));
			}
			$btn.show();
		}
	},
	_fixsz: _zkf = function () {
		if (!this.isRealVisible()) return;

		var node = this.$n(), pn = node.parentNode;
		if (pn) {
			var btn = this.$n('btn'),
				bfcolps = "before" == this.getCollapse();
			if (this.isVertical()) {
				
				
				
				
				if (bfcolps) {
					pn.vAlign = "top";
					pn.style.backgroundPosition = "top left";
				} else {
					pn.vAlign = "bottom";
					pn.style.backgroundPosition = "bottom left";
				}

				node.style.width = ""; 
				node.style.width = pn.clientWidth + "px"; 
				btn.style.marginLeft = ((node.offsetWidth - btn.offsetWidth) / 2)+"px";
			} else {
				if (bfcolps) {
					pn.align = "left";
					pn.style.backgroundPosition = "top left";
				} else {
					pn.align = "right";
					pn.style.backgroundPosition = "top right";
				}

				node.style.height = ""; 
				node.style.height =
					(zk.safari ? pn.parentNode.clientHeight: pn.clientHeight)+"px";
					
				btn.style.marginTop = ((node.offsetHeight - btn.offsetHeight) / 2)+"px";
			}
		}
	},
	onShow: _zkf,
	onSize: _zkf,
	beforeSize: function () {
		this.$n().style[this.isVertical() ? "width": "height"] = "";
	},

	_fixszAll: function () {
		
		var box = this.parent;
		if (box) this.$class._fixKidSplts(box.$n());
		else this._fixsz();
	}
},{
	onclick: function (evt) {
		var wgt = zk.Widget.$(evt);
		jq(wgt.button).removeClass(wgt.getZclass() + "-btn-visi");
		wgt.setOpen(!wgt.isOpen());
	},

	
	_ignoresizing: function (draggable, pointer, evt) {
		var wgt = draggable.control;
		if (!wgt.isOpen() || wgt.button == evt.domTarget) return true;

		var run = draggable.run = {},
			node = wgt.$n(),
			nd = wgt.$n('chdex'),
			Splitter = zul.box.Splitter;
		run.prev = Splitter._prev(nd);
		run.next = Splitter._next(nd);
		run.prevwgt = wgt.previousSibling;
		run.nextwgt = wgt.nextSibling;
		run.z_offset = zk(node).cmOffset();
		return false;
	},
	_ghostsizing: function (draggable, ofs, evt) {
		var $node = zk(draggable.node);
		jq(document.body).append(
			'<div id="zk_ddghost" style="font-size:0;line-height:0;background:#AAA;position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$node.offsetWidth()+'px;height:'+$node.offsetHeight()
			+'px;"></div>');
		return jq("#zk_ddghost")[0];
	},
	_endDrag: function (draggable) {
		var wgt = draggable.control,
			vert = wgt.isVertical(),
			node = wgt.$n(),
			Splitter = zul.box.Splitter,
			flInfo = Splitter._fixLayout(wgt),
			run = draggable.run, diff, fd;

		if (vert) {
			diff = run.z_point[1];
			fd = "height";

			
			if (run.next && run.next.cells.length) run.next = run.next.cells[0];
			if (run.prev && run.prev.cells.length) run.prev = run.prev.cells[0];
		} else {
			diff = run.z_point[0];
			fd = "width";
		}
		if (!diff) return; 

		if (run.nextwgt) zWatch.fireDown('beforeSize', run.nextwgt);
		if (run.prevwgt) zWatch.fireDown('beforeSize', run.prevwgt);
		
		var ns = 0;
		if (run.next) {
			var s = zk.parseInt(run.next.style[fd]);
			s -= diff;
			if (s < 0) s = 0;
			run.next.style[fd] = s + "px";
		}
		if (run.prev) {
			var s = zk.parseInt(run.prev.style[fd]);
			s += diff;
			if (s < 0) s = 0;
			run.prev.style[fd] = s + "px";
		}

		if (run.nextwgt) zWatch.fireDown('onSize', run.nextwgt);
		if (run.prevwgt) zWatch.fireDown('onSize', run.prevwgt);

		Splitter._unfixLayout(flInfo);
			
			

		wgt._fixszAll();
			
		draggable.run = null;
	},
	_snap: function (draggable, pos) {
		var run = draggable.run,
			wgt = draggable.control,
			x = pos[0], y = pos[1];
		if (wgt.isVertical()) {
			if (y <= run.z_offset[1] - run.prev.offsetHeight) {
				y = run.z_offset[1] - run.prev.offsetHeight;
			} else {
				var max = run.z_offset[1] + run.next.offsetHeight - wgt.$n().offsetHeight;
				if (y > max) y = max;
			}
		} else {
			if (x <= run.z_offset[0] - run.prev.offsetWidth) {
				x = run.z_offset[0] - run.prev.offsetWidth;
			} else {
				var max = run.z_offset[0] + run.next.offsetWidth - wgt.$n().offsetWidth;
				if (x > max) x = max;
			}
		}
		run.z_point = [x - run.z_offset[0], y - run.z_offset[1]];

		return [x, y];
	},

	_next: function (n) {
		return jq(n).next().next()[0];
	},
	_prev: function (n) {
		return jq(n).prev().prev()[0];
	},

	_fixKidSplts: function (n) {
		if (zk(n).isVisible()) { 
			var wgt = n.z_wgt, 
				Splitter = zul.box.Splitter;
			if (wgt && wgt.$instanceof(Splitter))
				wgt._fixsz();

			for (n = n.firstChild; n; n = n.nextSibling)
				Splitter._fixKidSplts(n);
		}
	}
});

if (zk.ie) {
	zul.box.Splitter.onover = function (evt) {
		var wgt = zk.Widget.$(evt);
		$(wgt.button).addClass(wgt.getZclass() + '-btn-visi');
	};
	zul.box.Splitter.onout = function (evt) {
		var wgt = zk.Widget.$(evt);
		$(wgt.button).removeClass(wgt.getZclass() + '-btn-visi');
	};
}

if (zk.opera) { 
	zul.box.Splitter._fixLayout = function (wgt) {
		var box = wgt.parent.$n();
		if (box.style.tableLayout != "fixed") {
			var fl = [box, box.style.tableLayout];
			box.style.tableLayout = "fixed";
			return fl;
		}
	};
	zul.box.Splitter._unfixLayout = function (fl) {
		if (fl) fl[0].style.tableLayout = fl[1];
	};
} else
	zul.box.Splitter._fixLayout = zul.box.Splitter._unfixLayout = zk.$void;

zkreg('zul.box.Splitter');zk._m={};
zk._m['os']=
function (out) {
	out.push('<div', this.domAttrs_(), '><span id="',
			this.uuid, '-btn"></span></div>');
}
;zk._m['default']=[zk._p.p.Splitter,'os'];zkmld(zk._p.p.Splitter,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.box',1);zk.load('zul',function(){zk._p=zkpi('zul.mesh',true);try{




zul.mesh.MeshWidget = zk.$extends(zul.Widget, {
	_pagingPosition: "bottom",
	_prehgh: -1,
	
	$init: function () {
		this.$supers('$init', arguments);
		this.heads = [];
	},

	_innerWidth: "100%",
	_currentTop: 0,
	_currentLeft: 0,

	$define: {
		
		
		pagingPosition: _zkf = function () {
			this.rerender();
		},
		
		
		sizedByContent: _zkf,
		
		
		autopaging: _zkf,
		
		
		model: null,
		
		
		innerWidth: function (v) {
			if (v == null) this._innerWidth = v = "100%";
			if (this.eheadtbl) this.eheadtbl.style.width = v;
			if (this.ebodytbl) this.ebodytbl.style.width = v;
			if (this.efoottbl) this.efoottbl.style.width = v;
		}
	},
	
	getPageSize: function () {
		return this.paging.getPageSize();
	},
	
	setPageSize: function (pgsz) {
		this.paging.setPageSize(pgsz);
	},
	
	getPageCount: function () {
		return this.paging.getPageCount();
	},
	
	getActivePage: function () {
		return this.paging.getActivePage();
	},
	
	setActivePage: function (pg) {
		this.paging.setActivePage(pg);
	},
	
	inPagingMold: function () {
		return "paging" == this.getMold();
	},

	setHeight: function (height) {
		this.$supers('setHeight', arguments);
		if (this.desktop) {
			if (zk.ie6_ && this.ebody)
				this.ebody.style.height = height;
			
			this._setHgh(height);
			this.onSize();
		}
	},
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		if (this.eheadtbl) this.eheadtbl.style.width = "";
		if (this.efoottbl) this.efoottbl.style.width = "";
		if (this.desktop)
			this.onSize();
	},
	setStyle: function (style) {
		if (this._style != style) {
			this.$supers('setStyle', arguments);
			if (this.desktop)
				this.onSize();
		}
	},

	bind_: function () {
		this.$supers(zul.mesh.MeshWidget, 'bind_', arguments);
		if (this.isVflex()) {
			
			
			var hgh = this.$n().style.height;
			if (!hgh || hgh == "auto") this.$n().style.height = "99%"; 
		}
		this._bindDomNode();
		this._fixHeaders();
		if (this.ebody) {
			this.domListen_(this.ebody, 'onScroll');
			this.ebody.style.overflow = ''; 
			if (this.efrozen)
				this.ebody.style.overflowX = 'hidden'; 
		}
		zWatch.listen({onSize: this, onShow: this, beforeSize: this, onResponse: this});
	},
	unbind_: function () {
		if (this.ebody)
			this.domUnlisten_(this.ebody, 'onScroll');

		zWatch.unlisten({onSize: this, onShow: this, beforeSize: this, onResponse: this});
		
		this.$supers(zul.mesh.MeshWidget, 'unbind_', arguments);
	},
	clearCache: function () {
		this.$supers('clearCache', arguments);
		this.ebody = this.ehead = this.efoot = this.efrozen = this.ebodytbl
			= this.eheadtbl = this.efoottbl = this.ebodyrows
			= this.ehdfaker = this.ebdfaker = null;
	},

	onResponse: function () {
		if (this.desktop && this._shallSize) {
			this.$n()._lastsz = null; 
			this.onSize();
		}
	},
	_syncSize: function () {
		this._shallSize = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	_fixHeaders: function () {
		if (this.head && this.ehead) {
			var empty = true;
			var flex = false;
			for (var i = this.heads.length; i-- > 0;) {
				for (var w = this.heads[i].firstChild; w; w = w.nextSibling) {
					if (!flex && w._nhflex)
						flex = true;
					if (w.getLabel() || w.getImage()
							|| w.nChildren) {
						empty = false;
						break;
					}
				}
				if (!empty) break;
			}
			var old = this.ehead.style.display; 
			this.ehead.style.display = empty ? 'none' : '';
			
			if (empty && flex) 
				for (var w = this.head.firstChild; w; w = w.nextSibling)
					if (w._nhflex) w.fixFlex_();
			return old != this.ehead.style.display;
		}
		return false;
	},
	_adjFlexWidth: function () {
		if (!this.head) return;
		var hdfaker = this.ehdfaker,
			bdfaker = this.ebdfaker,
			ftfaker = this.eftfaker,
			head = this.head,
			headn = head.$n(),
			i = 0;
		for (var w = head.firstChild; w; w = w.nextSibling) {
			if (w._hflexWidth !== undefined) {
				var wd = w._hflexWidth;
				this._setFakerWd(i, wd, hdfaker, bdfaker, ftfaker, headn);
			}
			++i;
		}
	},
	_setFakerWd: function (i, wd, hdfaker, bdfaker, ftfaker, headn) {
		bdfaker.cells[i].style.width = zk(bdfaker.cells[i]).revisedWidth(wd) + "px";
		hdfaker.cells[i].style.width = bdfaker.cells[i].style.width;
		if (ftfaker) ftfaker.cells[i].style.width = bdfaker.cells[i].style.width;
		if (headn) {
			var cpwd = zk(headn.cells[i]).revisedWidth(zk.parseInt(hdfaker.cells[i].style.width));
			headn.cells[i].style.width = cpwd + "px";
			var cell = headn.cells[i].firstChild;
			cell.style.width = zk(cell).revisedWidth(cpwd) + "px";
		}
	},
	_bindDomNode: function () {
		for (var n = this.$n().firstChild; n; n = n.nextSibling)
			switch(n.id) {
			case this.uuid + '-head':
				this.ehead = n;
				this.eheadtbl = jq(n).find('>table:first')[0];
				break;
			case this.uuid + '-body':
				this.ebody = n;
				this.ebodytbl = jq(n).find('>table:first')[0];
				break;
			case this.uuid + '-foot':
				this.efoot = n;
				this.efoottbl = jq(n).find('>table:first')[0];
				break;
			case this.uuid + '-frozen':
				this.efrozen = n;
				break;
			}

		if (this.ebody) {
			
			var bds = this.ebodytbl.tBodies,
				ie7special = zk.ie7 && bds && bds.length == 1 && !this.ehead && !bds[0].id;
			if (!bds || !bds.length || (this.ehead && bds.length < 2 || ie7special)) {
				if (ie7special) 
					jq(bds[0]).remove();
				var out = [];
				if (this.domPad_ && !this.inPagingMold() && this._mold != 'select') this.domPad_(out, '-tpad');
				out.push('<tbody id="',this.uuid,'-rows"/>');
				if (this.domPad_ && !this.inPagingMold() && this._mold != 'select') this.domPad_(out, '-bpad');
				jq(this.ebodytbl ).append(out.join(''));
			}
			this._syncbodyrows();
		}
		if (this.ehead) {
			this.ehdfaker = this.eheadtbl.tBodies[0].rows[0];
			this.ebdfaker = this.ebodytbl.tBodies[0].rows[0];
			if (this.efoottbl)
				this.eftfaker = this.efoottbl.tBodies[0].rows[0];
		}
	},
	_syncbodyrows: function() {
		var bds = this.ebodytbl.tBodies;
		this.ebodyrows = this.ebodytbl.tBodies[bds.length > 2 ? this.ehead ? 2 : 1 : this.ehead ? 1 : 0].rows;
		
	},
	replaceHTML: function() { 
		var old = this._syncingbodyrows;
		this._syncingbodyrows = true;
		try {
			
			
			
			
			
			
			
			
			this.$supers(zul.mesh.MeshWidget, 'replaceHTML', arguments);
		} finally {
			this._syncingbodyrows = old;
		}
	},
	replaceChildHTML_: function() { 
		var old = this._syncingbodyrows;
		this._syncingbodyrows = true;
		try {
			this.$supers('replaceChildHTML_', arguments);
			this._syncbodyrows();
		} finally {
			this._syncingbodyrows = old;
		}
	},
	fireOnRender: function (timeout) {
		if (!this._pendOnRender) {
			this._pendOnRender = true;
			setTimeout(this.proxy(this._onRender), timeout ? timeout : 100);
		}
	},
	_doScroll: function () {
		if (!(this.fire('onScroll', this.ebody.scrollLeft).stopped)) {
			if (this.ehead) 
				this.ehead.scrollLeft = this.ebody.scrollLeft;
			if (this.efoot) 
				this.efoot.scrollLeft = this.ebody.scrollLeft;		
		}
		
		this._currentTop = this.ebody.scrollTop;
		this._currentLeft = this.ebody.scrollLeft;
		this.fire('onScrollPos', {top: this._currentTop, left: this._currentLeft});
		
		if (!this.paging)
			this.fireOnRender(zk.gecko ? 200 : 60);
	},
	_onRender: function () {
		this._pendOnRender = false;
		if (this._syncingbodyrows) {
			this.fireOnRender(zk.gecko ? 200 : 60); 
			return true;
		}
		
		var rows = this.ebodyrows;
		if (this.inPagingMold() && this._autopaging && rows && rows.length)
			if (this._fixPageSize(rows)) return; 
		
		if (!this.desktop || !this._model || !rows || !rows.length) return;

		
		
		var items = [],
			min = this.ebody.scrollTop, max = min + this.ebody.offsetHeight;
		for (var j = 0, it = this.getBodyWidgetIterator(), len = rows.length, w; (w = it.next()) && j < len; j++) {
			if (w.isVisible() && !w._loaded) {
				var row = rows[j], $row = zk(row),
					top = $row.offsetTop();
				
				if (top + $row.offsetHeight() < min) continue;
				if (top > max) break; 
				items.push(w);
			}
		}
		if (items.length)
			this.fire('onRender', {items: items}, {implicit:true});
	},
	_fixPageSize: function(rows) {
		var ebody = this.ebody;
		if (!ebody) return; 
		var max = ebody.offsetHeight;
		if (max == this._prehgh) return false; 
		this._prehgh = max;
		var ebodytbl = this.ebodytbl,
			etbparent = ebodytbl.offsetParent,
			etbtop = ebodytbl.offsetTop,
			hgh = 0, 
			row = null,
			j = 0;
		for (var it = this.getBodyWidgetIterator(), len = rows.length, w; (w = it.next()) && j < len; j++) {
			if (w.isVisible()) {
				row = rows[j];
				var top = row.offsetTop - (row.offsetParent == etbparent ? etbtop : 0);
				if (top > max) {
					--j;
					break;
				}
				hgh = top;
			}
		}
		if (row != null) { 
			if (top <= max) { 
				hgh = hgh + row.offsetHeight;
				j = Math.floor(j * max / hgh);
			}
			
			if (j == 0) j = 1; 
			if (j != this.getPageSize()) {
				this.fire('onChangePageSize', {size: j});
				return true;
			}
		}
		return false;
	},
	
	
	

	
	beforeSize: function () {
		
		var wd = zk.ie6_ ? this.getWidth() : this.$n().style.width;
		if (!wd || wd == "auto" || wd.indexOf('%') >= 0) {
			var n = this.$n();
			
			if (!zk.ie6_ && n._lastsz && n._lastsz.height == n.offsetHeight && n._lastsz.width == n.offsetWidth)
				return; 
				
			if (this.ebody) 
				this.ebody.style.width = "";
			if (this.ehead) 
				this.ehead.style.width = "";
			if (this.efoot) 
				this.efoot.style.width = "";
				
			n._lastsz = null;
		}
	},
	onSize: _zkf = function () {
		if (this.isRealVisible()) { 
			var n = this.$n();
			if (n._lastsz && n._lastsz.height == n.offsetHeight && n._lastsz.width == n.offsetWidth) {
				this.fireOnRender(155); 
				return; 
			}
				
			this._calcSize();
			this.fireOnRender(155);
			this.ebody.scrollTop = this._currentTop;
			this.ebody.scrollLeft = this._currentLeft;
			this._shallSize = false;
		}
	},
	onShow: _zkf,
	_vflexSize: function (hgh) {
		var n = this.$n();
		if (zk.ie6_) { 
			
			
			n.style.height = "";
			n.style.height = hgh;
		}
		
		var pgHgh = 0
		if (this.paging) {
			var pgit = this.$n('pgit'),
				pgib = this.$n('pgib');
			if (pgit) pgHgh += pgit.offsetHeight;
			if (pgib) pgHgh += pgib.offsetHeight;
		}
		return zk(n).revisedHeight(n.offsetHeight) - (this.ehead ? this.ehead.offsetHeight : 0)
			- (this.efoot ? this.efoot.offsetHeight : 0)
			- (this.efrozen ? this.efrozen.offsetHeight : 0)
			- pgHgh; 
	},
	setFlexSize_: function(sz) {
		var n = this.$n(),
			head = this.$n('head');
		if (sz.height !== undefined) {
			if (sz.height == 'auto') {
				n.style.height = '';
				if (head) head.style.height = '';
			} else
				return this.$supers('setFlexSize_', arguments);
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto') {
				if (this._hflex != 'min') n.style.width = '';
				if (head) head.style.width = '';
			} else
				return this.$supers('setFlexSize_', arguments);
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	},
	
	_setHgh: function (hgh) {
		if (this.isVflex() || (hgh && hgh != "auto" && hgh.indexOf('%') < 0)) {
			this.ebody.style.height = ''; 
			var h = this._vflexSize(hgh); 
			if (h < 0) h = 0;

			this.ebody.style.height = h + "px";
			
			if (zk.ie && this.ebody.offsetHeight) {} 
			
			
		} else {
			
			
			
			this.ebody.style.height = "";
			this.$n().style.height = hgh;
		}
	},
	
	_calcSize: function () {
		var n = this.$n();
		this._setHgh(n.style.height);
		
		
		
		
		
		
		var wd = n.style.width;
		if (!wd || wd == "auto" || wd.indexOf('%') >= 0) {
			wd = zk(n).revisedWidth(n.offsetWidth);
			if (wd < 0) 
				wd = 0;
			if (wd) 
				wd += "px";
		}
		if (wd) {
			this.ebody.style.width = wd;
			if (this.ehead) 
				this.ehead.style.width = wd;
			if (this.efoot) 
				this.efoot.style.width = wd;
		}
		
		
		var tblwd = this.ebody.clientWidth;
		if (zk.ie) {
			if (this.eheadtbl &&
			this.eheadtbl.offsetWidth !=
			this.ebodytbl.offsetWidth) 
				this.ebodytbl.style.width = ""; 
			if (tblwd && (this.ebody.offsetWidth == this.ebodytbl.offsetWidth) &&
			this.ebody.offsetWidth - tblwd > 11) { 
				if (--tblwd < 0) 
					tblwd = 0;
				this.ebodytbl.style.width = tblwd + "px";
			}
			
			var hgh = this.getHeight() || n.style.height; 
			if (!zk.ie8 && !this.isVflex() && (!hgh || hgh == "auto")) {
				hgh = this.ebody.offsetWidth - this.ebody.clientWidth;
				if (this.ebody.clientWidth && hgh > 11) 
					this.ebody.style.height = this.ebody.offsetHeight + jq.scrollbarWidth() + "px";
				
				
				tblwd = this.ebody.clientWidth;
			}
		}
		if (this.ehead) {
			if (tblwd) this.ehead.style.width = tblwd + 'px';
			if (this.isSizedByContent() && this.ebodyrows && this.ebodyrows.length)
				this.$class._adjHeadWd(this);
			else if (tblwd && this.efoot) this.efoot.style.width = tblwd + 'px';
		} else if (this.efoot) {
			if (tblwd) this.efoot.style.width = tblwd + 'px';
			if (this.efoottbl.rows.length && this.ebodyrows && this.ebodyrows.length)
				this.$class.cpCellWidth(this);
		}
		
		
		if (this._hflexsz === undefined && this._hflex == 'min' && this._width === undefined && n.offsetWidth > this.ebodytbl.offsetWidth) {
			n.style.width = this.ebodytbl.offsetWidth + 'px';
			this._hflexsz = n.offsetWidth;
		}
		
		n._lastsz = {height: n.offsetHeight, width: n.offsetWidth}; 
		
		
		if (zk.ie8 && this.isModel() && this.inPagingMold())
			zk(this).redoCSS();
	},
	domFaker_: function (out, fakeId, zcls) { 
		var head = this.head;
		out.push('<tbody style="visibility:hidden;height:0px"><tr id="',
				head.uuid, fakeId, '" class="', zcls, '-faker">');
		for (var w = head.firstChild; w; w = w.nextSibling)
			out.push('<th id="', w.uuid, fakeId, '"', w.domAttrs_(),
				 	'><div style="overflow:hidden"></div></th>');
		out.push('</tr></tbody>');
	},

	
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);

		if (child.$instanceof(this.getHeadWidgetClass()))
			this.head = child;
		else if (!child.$instanceof(zul.mesh.Auxhead))
			return;

		var nsib = child.nextSibling;
		if (nsib)
			for (var hds = this.heads, j = 0, len = hds.length; j < len; ++j)
				if (hds[j] == nsib) {
					this.heads.splice(j, 0, child);
					return; 
				}
		this.heads.push(child);
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);

		if (child == this.head) {
			this.head = null;
			this.heads.$remove(child);
		} else if (child.$instanceof(zul.mesh.Auxhead))
			this.heads.$remove(child);
	},
	
	beforeMinFlex_: function (orient) {
		if (this._hflexsz === undefined && this.isSizedByContent() && orient == 'w' && this.width === undefined)
			this._calcSize();
	}
}, { 
	_adjHeadWd: function (wgt) {
		var hdfaker = wgt.ehdfaker,
			bdfaker = wgt.ebdfaker,
			ftfaker = wgt.eftfaker;
		if (!hdfaker || !bdfaker || !hdfaker.cells.length
		|| !bdfaker.cells.length || !zk(hdfaker).isRealVisible()
		|| !wgt.getBodyWidgetIterator().hasNext()) return;
		
		var hdtable = wgt.ehead.firstChild, head = wgt.head.$n();
		if (!head) return; 
		if (zk.opera) {
			if (!hdtable.style.width) {
				var isFixed = true, tt = wgt.ehead.offsetWidth;
				for(var i = hdfaker.cells.length; i--;) {
					if (!hdfaker.cells[i].style.width || hdfaker.cells[i].style.width.indexOf("%") >= 0) {
						isFixed = false; 
						break;
					}
					tt -= zk.parseInt(hdfaker.cells[i].style.width);
				}
				if (!isFixed || tt >= 0) hdtable.style.tableLayout = "auto";
			}
		}
		
		
		var bdtable = wgt.ebody.firstChild,
			total = Math.max(hdtable.offsetWidth, bdtable.offsetWidth), 
			tblwd = Math.min(bdtable.parentNode.clientWidth, bdtable.offsetWidth);
			
		if (total == wgt.ebody.offsetWidth && 
			wgt.ebody.offsetWidth > tblwd && wgt.ebody.offsetWidth - tblwd < 20)
			total = tblwd;
			
		var xwds = wgt.$class._calcMinWd(wgt),
			wds = xwds.wds,
			width = xwds.width;
		if (!wgt.$n().style.width || width > total) {
			total = width;
			head.style.width = total + 'px';
		}
		
		var count = total;
		hdtable.style.width = total + "px";	
		
		if (bdtable) bdtable.style.width = hdtable.style.width;
		if (wgt.efoot) wgt.efoot.firstChild.style.width = hdtable.style.width;
		
		for (var i = bdfaker.cells.length; i--;) {
			if (!zk(hdfaker.cells[i]).isVisible()) continue;
			var wd = i != 0 ? wds[i] : count;
			bdfaker.cells[i].style.width = zk(bdfaker.cells[i]).revisedWidth(wd) + "px";
			hdfaker.cells[i].style.width = bdfaker.cells[i].style.width;
			if (ftfaker) ftfaker.cells[i].style.width = bdfaker.cells[i].style.width;
			var cpwd = zk(head.cells[i]).revisedWidth(zk.parseInt(hdfaker.cells[i].style.width));
			head.cells[i].style.width = cpwd + "px";
			var cell = head.cells[i].firstChild;
			cell.style.width = zk(cell).revisedWidth(cpwd) + "px";
			count -= wd;
		}
		
		
		if (total != hdtable.offsetWidth) {
			total = hdtable.offsetWidth;
			tblwd = Math.min(wgt.ebody.clientWidth, bdtable.offsetWidth);
			if (total == wgt.ebody.offsetWidth && 
				wgt.ebody.offsetWidth > tblwd && wgt.ebody.offsetWidth - tblwd < 20)
				total = tblwd;
				
			hdtable.style.width = total + "px";	
			if (bdtable) bdtable.style.width = hdtable.style.width;
			if (wgt.efoot) wgt.efoot.firstChild.style.width = hdtable.style.width;
		}
	},
	cpCellWidth: function (wgt) {
		var dst = wgt.efoot.firstChild.rows[0],
			srcrows = wgt.ebodyrows;
		if (!dst || !srcrows || !srcrows.length || !dst.cells.length)
			return;
		var ncols = dst.cells.length,
			src, maxnc = 0;
		for (var j = 0, it = wgt.getBodyWidgetIterator(), w; (w = it.next());) {
			if (!w.isVisible() || (wgt._modal && !w._loaded)) continue;

			var row = srcrows[j++], $row = zk(row),
				cells = row.cells, nc = $row.ncols(),
				valid = cells.length == nc && $row.isVisible();
				
			if (valid && nc >= ncols) {
				maxnc = ncols;
				src = row;
				break;
			}
			if (nc > maxnc) {
				src = valid ? row: null;
				maxnc = nc;
			} else if (nc == maxnc && !src && valid) {
				src = row;
			}
		}
		if (!maxnc) return;
	
		var fakeRow = !src;
		if (fakeRow) { 
			src = document.createElement("TR");
			src.style.height = "0px";
				
			for (var j = 0; j < maxnc; ++j)
				src.appendChild(document.createElement("TD"));
			srcrows[0].parentNode.appendChild(src);
		}
	
		
		
		for (var j = maxnc; j--;)
			dst.cells[j].style.width = "";
	
		var sum = 0;
		for (var j = maxnc; j--;) {
			var d = dst.cells[j], s = src.cells[j];
			if (zk.opera) {
				sum += s.offsetWidth;
				d.style.width = zk(s).revisedWidth(s.offsetWidth);
			} else {
				d.style.width = s.offsetWidth + "px";
				if (maxnc > 1) { 
					var v = s.offsetWidth - d.offsetWidth;
					if (v != 0) {
						v += s.offsetWidth;
						if (v < 0) v = 0;
						d.style.width = v + "px";
					}
				}
			}
		}
	
		if (zk.opera && wgt.isSizedByContent())
			dst.parentNode.parentNode.style.width = sum + "px";
	
		if (fakeRow)
			src.parentNode.removeChild(src);
	},
	_calcMinWd: function (wgt) {
		if (wgt.eheadtbl) {
			wgt.ehead.style.width = '';
			wgt.eheadtbl.width = '';
			wgt.eheadtbl.style.width = '';
		}
		
		if (wgt.head && wgt.head.$n())
			wgt.head.$n().style.width = '';
			
		if (wgt.efoottbl) {
			wgt.efoot.style.width = '';
			wgt.efoottbl.width = '';
			wgt.efoottbl.style.width = '';
		}
		
		if (wgt.ebodytbl) {
			wgt.ebody.style.width = '';
			wgt.ebodytbl.width = '';
			wgt.ebodytbl.style.width = '';
		}
		
		
		var hdfaker = wgt.ehdfaker,
			bdfaker = wgt.ebdfaker,
			ftfaker = wgt.eftfaker,
			head = wgt.head,
			headn = head ? head.$n() : null,
			wds = [],
			width = 0,
			w = head ? head = head.lastChild : null;
		for (var i = bdfaker.cells.length; i--;) {
			var wd = bdwd = bdfaker.cells[i].offsetWidth,
				hdwd = w ? (zk(w.$n('cave')).textSize()[0] + zk(w.$n()).padBorderWidth()) : 0,
				ftwd = ftfaker && zk(ftfaker.cells[i]).isVisible() ? ftfaker.cells[i].offsetWidth : 0;
			if (hdwd > wd) wd = hdwd;
			if (ftwd > wd) wd = ftwd;
			wds[i] = wd;
			width += wd;
			if (w) w = w.previousSibling;
		}
		if (wgt.eheadtbl)
			wgt.eheadtbl.width='100%';
		
		if (wgt.efoottbl)
			wgt.efoottbl.width='100%';
		
		if (wgt.ebodytbl)
			wgt.ebodytbl.width='100%';
		
		return {width: width, wds: wds};
	}
});



zul.mesh.HeadWidget = zk.$extends(zul.Widget, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onColSize: this}, -1000);
	},

	$define: {
		
		
		sizable: function () {
			this.rerender();
		}
	},

	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		if (!this.$instanceof(zul.mesh.Auxhead))
			for (var faker, fs = child.$class._faker, i = fs.length; i--;)
				jq(child.uuid + '-' + fs[i], zk).remove();
	},
	
	
	setVflex: function (v) { 
		v = false;
		this.$super(zul.mesh.HeadWidget, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(zul.mesh.HeadWidget, 'setHflex', v);
	},
	
	onColSize: function (evt) {
		var owner = this.parent;
		if (owner.isSizedByContent()) owner.$class._adjHeadWd(owner);
		evt.column._width = evt.width;
		owner._innerWidth = owner.eheadtbl.style.width;
		owner.fire('onInnerWidth', owner.eheadtbl.style.width);
		owner.fireOnRender(zk.gecko ? 200 : 60);
	},
	unbind_: function () {
		jq(this.hdfaker).remove();
		jq(this.bdfaker).remove();
		jq(this.ftfaker).remove();
		this.$supers(zul.mesh.HeadWidget, 'unbind_', arguments);
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (this.desktop) {
			if (this.parent._fixHeaders())
				this.parent.onSize();
		}
	},
	onChildRemoved_: function () {
		this.$supers('onChildRemoved_', arguments);
		if (this.desktop) {
			if (!this.childReplacing_ && this.parent._fixHeaders())
				this.parent.onSize();
		}
	},
	afterChildrenFlex_: function (hwgt) { 
		var wgt = this.parent;
		if (wgt && !wgt.isSizedByContent())
			wgt._adjFlexWidth();
	}
},{ 
	redraw: function (out) {
		out.push('<tr', this.domAttrs_(), ' align="left">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</tr>');
	}
});



zul.mesh.HeaderWidget = zk.$extends(zul.LabelImageWidget, {
	$define: {
    	
    	
		align: function (v) {
			this.updateMesh_('align', v);
		},
		
		
		valign: function (v) {
			this.updateMesh_('valign', v);
		},
		width: _zkf = function () {
			this.updateMesh_();
		},
		height: _zkf
	},
	
	updateMesh_: function (nm, val) { 
		if (this.desktop) {
			var wgt = this.getMeshWidget();
			if (wgt) {
				if (wgt._inUpdateMesh) {
					wgt._flexRerender = true; 
					return;
				}
				wgt._inUpdateMesh = true;
				try {
					for(var kid = this.parent.firstChild; kid; kid = kid.nextSibling)
						delete kid._hflexWidth;
					wgt.rerender(); 
					if (wgt._flexRerender) {
						try {
							wgt.rerender();
						} finally {
							delete wgt._flexRerender;
						}
					}
				} finally {
					delete wgt._inUpdateMesh;
				}
			}
		}
	},
	setFlexSize_: function (sz) {
		if (sz.width !== undefined && sz.width != 'auto' && sz.width != '') {
			
			
			this._hflexWidth = sz.width;
			return {width: sz.width};
		} else
			return this.$supers('setFlexSize_', arguments);
	},
	getParentSize_: function (p) {
		var wgt = this.getMeshWidget();
		if (zk(wgt.ehead).isVisible()) 
			return this.$supers('getParentSize_', arguments);
		else {
			var xp = wgt.$n();
			return {height: 0, width: zk(xp).revisedWidth(xp.offsetWidth)};
		}
	},
	domStyle_: function (no) {
		var style = '';
		if (this._hflexWidth) { 
			style = 'width:'+ this._hflexWidth+';';
			
			if (no) no.width = true;
			else no = {width:true};
		}
		if (zk.ie8 && this._align)
			style += 'text-align:' + this._align + ';';
		
		return style + this.$super('domStyle_', no);
	},
	
	getMeshWidget: function () {
		return this.parent ? this.parent.parent : null;
	},
	
	isSortable_: function () {
		return false;
	},
	
	getColAttrs: function () {
		return (this._align ? ' align="' + this._align + '"' : '')
			+ (this._valign ? ' valign="' + this._valign + '"' : '') ;
	},
	setVisible: function (visible) {
		if (this.isVisible() != visible) {
			this.$supers('setVisible', arguments);
			this.updateMesh_('visible', visible);
		}
	},
	domAttrs_: function (no) {
		var attrs = this.$supers('domAttrs_', arguments);
		return attrs + this.getColAttrs();
	},
	getTextNode: function () {
		return jq(this.$n()).find('>div:first')[0];
	},
	bind_: function () {
		this.$supers(zul.mesh.HeaderWidget, 'bind_', arguments);
		if (this.parent.isSizable()) this._initsz();
		this.fixedFaker_();
	},
	unbind_: function () {
		if (this._dragsz) {
			this._dragsz.destroy();
			this._dragsz = null;
		}
		this.$supers(zul.mesh.HeaderWidget, 'unbind_', arguments);
	},
	_initsz: function () {
		var n = this.$n();
		if (n && !this._dragsz) {
			var $Header = this.$class;
			this._dragsz = new zk.Draggable(this, null, {
				revert: true, constraint: "horizontal",
				ghosting: $Header._ghostsizing,
				endghosting: $Header._endghostsizing,
				snap: $Header._snapsizing,
				ignoredrag: $Header._ignoresizing,
				zIndex: 1000,
				endeffect: $Header._aftersizing
			});
		}
	},
	
	fixedFaker_: function () {
		var n = this.$n(),
			index = zk(n).cellIndex(),
			owner = this.getMeshWidget();
		for (var faker, fs = this.$class._faker, i = fs.length; i--;) {
			faker = owner['e' + fs[i]]; 
			if (faker && !this.$n(fs[i])) 
				faker[faker.cells.length > index ? "insertBefore" : "appendChild"]
					(this._createFaker(n, fs[i]), faker.cells[index]);
		}
	},
	_createFaker: function (n, postfix) {
		var t = document.createElement("th"), 
			d = document.createElement("div");
		t.id = n.id + "-" + postfix;
		t.className = n.className;
		t.style.cssText = n.style.cssText;
		d.style.overflow = "hidden";
		t.appendChild(d);
		return t;
	},
	doClick_: function (evt) {
		var wgt = zk.Widget.$(evt.domTarget),
			n = this.$n(),
			ofs = this._dragsz ? zk(n).revisedOffset() : false;
		if (!zk.dragging && (wgt == this || wgt.$instanceof(zul.wgt.Label)) && this.isSortable_() &&
		!jq.nodeName(evt.domTarget, "input") && (!this._dragsz || !this._insizer(evt.pageX - ofs[0]))) {
			this.fire('onSort');
			evt.stop();
		} else {
			if (jq.nodeName(evt.domTarget, "input"))
				evt.stop({propagation: true});
			this.$supers('doClick_', arguments);
		}
	},
	doDoubleClick_: function (evt) {
		if (this._dragsz) {
			var n = this.$n(),
				$n = zk(n),
				ofs = $n.revisedOffset();
			if (this._insizer(evt.pageX - ofs[0])) {
				var mesh = this.getMeshWidget(),
					max = zk(this.$n('cave')).textSize()[0],
					cIndex = $n.cellIndex();
				for (var rows = mesh.ebodyrows, len = rows.length; len--;) {
					var cell = rows[len].cells[cIndex], $c;
					if (cell && ($c = zk(cell)).isVisible()) {
						var size = $c.jq.find('div:first-child').zk.textSize();
						if (max < size[0])
							max = size[0];
					}
				}
				max += $n.padBorderWidth();
				this.$class._aftersizing({control: this, _zszofs: max + (this.isSortable_() ? 20 : 0)}, evt);
			} else
				this.$supers('doDoubleClick_', arguments);
		} else
			this.$supers('doDoubleClick_', arguments);
	},
	doMouseMove_: function (evt) {
		if (zk.dragging || !this.parent.isSizable()) return;
		var n = this.$n(),
			ofs = zk(n).revisedOffset(); 
		if (this._insizer(evt.pageX - ofs[0])) {
			jq(n).addClass(this.getZclass() + "-sizing");
		} else {
			jq(n).removeClass(this.getZclass() + "-sizing");
		}
	},
	doMouseOut_: function (evt) {
		if (this.parent.isSizable()) {
			var n = this.$n()
			jq(n).removeClass(this.getZclass() + "-sizing");
		}
	},
	ignoreDrag_: function (pt) {
		if (this.parent.isSizable()) {
			var n = this.$n(),
				ofs = zk(n).revisedOffset();
			return this._insizer(pt[0] - ofs[0]);
		}
		return false;
	},
	
	ignoreChildNodeOffset_: function(attr) {
		return true;
	},
	_insizer: function (x) {
		return x >= this.$n().offsetWidth - 10;
	}
}, { 
	_faker: ["hdfaker", "bdfaker", "ftfaker"],
	
	
	_ghostsizing: function (dg, ofs, evt) {
		var wgt = dg.control,
			el = wgt.getMeshWidget().eheadtbl,
			of = zk(el).revisedOffset(),
			n = wgt.$n();
		
		ofs[1] = of[1];
		ofs[0] += zk(n).offsetWidth();
		jq(document.body).append(
			'<div id="zk_hdghost" style="position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:3px;height:'+zk(el.parentNode.parentNode).offsetHeight()
			+'px;background:darkgray"></div>');
		return jq("#zk_hdghost")[0];
	},
	_endghostsizing: function (dg, origin) {
		dg._zszofs = zk(dg.node).revisedOffset()[0] - zk(origin).revisedOffset()[0];
	},
	_snapsizing: function (dg, pointer) {
		var n = dg.control.$n(), $n = zk(n),
			ofs = $n.revisedOffset();
		pointer[0] += $n.offsetWidth(); 
		if (ofs[0] + dg._zmin >= pointer[0])
			pointer[0] = ofs[0] + dg._zmin;
		return pointer;
	},
	_ignoresizing: function (dg, pointer, evt) {
		var wgt = dg.control,
			n = wgt.$n(), $n = zk(n),
			ofs = $n.revisedOffset(); 
			
		if (wgt._insizer(pointer[0] - ofs[0])) {
			dg._zmin = 10 + $n.padBorderWidth();
			return false;
		}
		return true;
	},
	_aftersizing: function (dg, evt) {
		var wgt = dg.control,
			n = wgt.$n(), $n = zk(n),
			owner = wgt.getMeshWidget(),
			wd = dg._zszofs,
			table = owner.eheadtbl,
			head = table.tBodies[0].rows[0], 
			rwd = $n.revisedWidth(wd),
			cells = head.cells,
			cidx = $n.cellIndex(),
			total = 0;
			
		for (var k = cells.length; k--;) {
			if (k !== cidx && zk(cells[k]).isVisible()) total += cells[k].offsetWidth;
		}

		
		
		if (owner.efoottbl) {
			owner.eftfaker.cells[cidx].style.width = wd + "px";
		}
		var fixed;
		if (owner.ebodytbl) {
			if (zk.opera && !owner.ebodytbl.style.tableLayout) {
				fixed = "auto";
				owner.ebodytbl.style.tableLayout = "fixed";
			}
			owner.ebdfaker.cells[cidx].style.width = wd + "px";
		}
		
		head.cells[cidx].style.width = wd + "px";
		n.style.width = rwd + "px";
		var cell = n.firstChild;
		cell.style.width = zk(cell).revisedWidth(rwd) + "px";
		
		table.style.width = total + wd + "px";
		if (owner.efoottbl)
			owner.efoottbl.style.width = table.style.width;
		
		if (owner.ebodytbl)
			owner.ebodytbl.style.width = table.style.width;
			
		if (zk.opera && fixed) owner.ebodytbl.style.tableLayout = fixed;
		
		wgt.parent.fire('onColSize', zk.copy({
			index: cidx,
			column: wgt,
			width: wd + "px"
		}, evt.data), null, 0);
		
		var mesh = wgt.getMeshWidget();
		
		
		mesh.$n()._lastsz = null;
		
		
		zWatch.fireDown('onSize', mesh);
	},

	redraw: function (out) {
		var uuid = this.uuid,
			zcls = this.getZclass();
		out.push('<th', this.domAttrs_(), '><div id="', uuid, '-cave" class="',
				zcls, '-cnt"', this.domTextStyleAttr_(), '>', this.domContent_());

		if (this.parent._menupopup && this.parent._menupopup != 'none')
			out.push('<a id="', uuid, '-btn"  href="javascript:;" class="', zcls, '-btn"></a>');
	
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</div></th>');	
	}
});



zul.mesh.SortWidget = zk.$extends(zul.mesh.HeaderWidget, {
	_sortDirection: "natural",
	_sortAscending: "none",
	_sortDescending: "none",

	$define: {
    	
    	
		sortDirection: function (v) {
			var n = this.$n();
			if (n) {
				var zcls = this.getZclass(),
					$n = jq(n);
				$n.removeClass(zcls + "-sort-dsc").removeClass(zcls + "-sort-asc");
				switch (v) {
				case "ascending":
					$n.addClass(zcls + "-sort-asc");
					break;
				case "descending":
					$n.addClass(zcls + "-sort-dsc");
					break;
				default: 
					$n.addClass(zcls + "-sort");
					break;
				}
			}
		},
		
		
		sortAscending: function (v) {
			if (!v) this._sortAscending = v = "none";
			var n = this.$n(),
				zcls = this.getZclass();
			if (n) {
				var $n = jq(n);
				if (v == "none") {
					$n.removeClass(zcls + "-sort-asc");
					if (this._sortDescending == "none")
						$n.removeClass(zcls + "-sort");					
				} else
					$n.addClass(zcls + "-sort");
			}
		},
		
		
		sortDescending: function (v) {
			if (!v) this._sortDescending = v = "none";
			var n = this.$n(),
				zcls = this.getZclass();
			if (n) {
				var $n = jq(n);
				if (v == "none") {
					$n.removeClass(zcls + "-sort-dsc");
					if (this._sortAscending == "none")
						$n.removeClass(zcls + "-sort");					
				} else
					$n.addClass(zcls + "-sort");
			}
		}
	},
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onSort: this}, -1000);
	},
	
	setSort: function (type) {
		if (type && type.startsWith('client')) {
			this.setSortAscending(type);
			this.setSortDescending(type);
		} else {
			this.setSortAscending('none');
			this.setSortDescending('none');
		}
	},
	isSortable_: function () {
		return this._sortAscending != "none" || this._sortDescending != "none";
	},
	
	sort: function (ascending, evt) {
		var dir = this.getSortDirection();
		if (ascending) {
			if ("ascending" == dir) return false;
		} else {
			if ("descending" == dir) return false;
		}

		var sorter = ascending ? this._sortAscending: this._sortDescending;
		if (sorter == "fromServer")
			return false;
		else if (sorter == "none") {
			evt.stop();
			return false;
		}
		
		var mesh = this.getMeshWidget();
		if (!mesh || mesh.isModel()) return false;
			
			
		var	body = this.getMeshBody();
		
		if (!body || body.hasGroup()) return false;
		
		var desktop = body.desktop,
			node = body.$n();
			
		evt.stop();
		try {
			body.unbind();
			var d = [], col = this.getChildIndex();
			for (var i = 0, z = 0, it = mesh.getBodyWidgetIterator(), w; (w = it.next()); z++) 
				for (var k = 0, cell = w.firstChild; cell; cell = cell.nextSibling, k++) 
					if (k == col) {
						d[i++] = {
							wgt: cell,
							index: z
						};
					}
			
			var dsc = dir == "ascending" ? -1 : 1, fn = this.sorting, isNumber = sorter == "client(number)";
			d.sort(function(a, b) {
				var v = fn(a.wgt, b.wgt, isNumber) * dsc;
				if (v == 0) {
					v = (a.index < b.index ? -1 : 1);
				}
				return v;
			});
			for (var i = 0, k = d.length; i < k; i++) {
				body.appendChild(d[i].wgt.parent);
			}
			this._fixDirection(ascending);
			
		} finally {
			body.replaceHTML(node, desktop);
		}
		return true;
	},
	
	sorting: function(a, b, isNumber) {
		var v1, v2;
		if (typeof a.getLabel == 'function')
			v1 = a.getLabel();
		else if (typeof a.getValue == 'function')
			v1 = a.getValue();
		else v1 = a;
		
		if (typeof b.getLabel == 'function')
			v2 = b.getLabel();
		else if (typeof b.getValue == 'function')
			v2 = b.getValue();
		else v2 = b;
		
		if (isNumber) return v1 - v2;
		return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
	},
	_fixDirection: function (ascending) {
		
		for (var w = this.parent.firstChild; w; w = w.nextSibling) {
			w.setSortDirection(
				w != this ? "natural": ascending ? "ascending": "descending");
		}
	},
	onSort: function (evt) {
		var dir = this.getSortDirection();
		if ("ascending" == dir) this.sort(false, evt);
		else if ("descending" == dir) this.sort(true, evt);
		else if (!this.sort(true, evt)) this.sort(false, evt);
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass(),
				added;
			if (this._sortAscending != "none" || this._sortDescending != "none") {
				switch (this._sortDirection) {
				case "ascending":
					added = zcls + "-sort-asc";
					break;
				case "descending":
					added = zcls + "-sort-dsc";
					break;
				default: 
					added = zcls + "-sort";
					break;
				}
			}
			return scls != null ? scls + (added ? ' ' + added : '') : added || '';
		}
		return scls;
	}
});


zul.mesh.Paging = zk.$extends(zul.Widget, {
	_pageSize: 20,
	_totalSize: 0,
	_pageCount: 1,
	_activePage: 0,
	_pageIncrement: 10,

	$define: { 
    	
    	
		totalSize: function () {
			this._updatePageNum();
			if (this._detailed) {
				if (this.isBothPaging()) this.rerender();
				else {
					var info = this.$n("info");
					if (info) info.innerHTML = this.infoText_();
				}
			}
		},
		
		
		pageIncrement: _zkf = function () {
			this.rerender();
		},
		
		
		detailed: _zkf,
		
		
		pageCount: _zkf, 
		
		
		activePage: _zkf,
		
		
		pageSize: function () {
			this._updatePageNum();
		},
		
		
		autohide: function () {
			if (this._pageCount == 1) this.rerender();
		}
	},
	setStyle: function () {
		this.$supers('setStyle', arguments);
		if (this.isBothPaging())
			this.parent.rerender();
	},
	setSclass: function () {
		this.$supers('setSclass', arguments);
		if (this.isBothPaging())
			this.parent.rerender();		
	},
	setWidth: function () {
		this.$supers('setWidth', arguments);
		if (this.isBothPaging())
			this.parent.rerender();		
	},
	setHeight: function () {
		this.$supers('setHeight', arguments);
		if (this.isBothPaging())
			this.parent.rerender();		
	},
	setLeft: function () {
		this.$supers('setLeft', arguments);
		if (this.isBothPaging())
			this.parent.rerender();		
	},
	setTop: function () {
		this.$supers('setTop', arguments);
		if (this.isBothPaging())
			this.parent.rerender();		
	},
	setTooltiptext: function () {
		this.$supers('setTooltiptext', arguments);
		if (this.isBothPaging())
			this.parent.rerender();		
	},
	replaceHTML: function () {
		if (this.isBothPaging())
			this.parent.rerender();
		else
			this.$supers('replaceHTML', arguments);
	},
	
	isBothPaging: function () {
		return this.parent && this.parent.getPagingPosition
					&& "both" == this.parent.getPagingPosition();
	},
	_updatePageNum: function () {
		var v = Math.floor((this._totalSize - 1) / this._pageSize + 1);
		if (v == 0) v = 1;
		if (v != this._pageCount) {
			this._pageCount = v;
			if (this._activePage >= this._pageCount)
				this._activePage = this._pageCount - 1;
			if (this.desktop && this.parent) {
				if (this.isBothPaging())
					this.parent.rerender();
				else {
					this.rerender();
					
					
					if (this.parent.$instanceof(zul.mesh.MeshWidget)) {
						var n = this.parent.$n();
						
						
						if (n && n._lastsz)
							n._lastsz = null;
						this.parent.onSize();
					}
				}
			}
		}
	},
	
	infoText_: function () {
		var lastItem = (this._activePage+1) * this._pageSize;
		return "[ " + (this._activePage * this._pageSize + 1) + ("os" != this.getMold() ?
			" - " + (lastItem > this._totalSize ? this._totalSize : lastItem) : "")+ " / " + this._totalSize + " ]";
	},
	_infoTags: function () {
		if (this._totalSize == 0)
			return "";
		var lastItem = (this._activePage+1) * this._pageSize,
			out = [];
		out.push('<div id="', this.uuid ,'-info" class="', this.getZclass(), '-info">', this.infoText_(), '</div>');
		return out.join('');
	},
	_innerTags: function () {
		var out = [];

		var half = this._pageIncrement / 2,
			begin, end = this._activePage + half - 1;
		if (end >= this._pageCount) {
			end = this._pageCount - 1;
			begin = end - this._pageIncrement + 1;
			if (begin < 0) begin = 0;
		} else {
			begin = this._activePage - half;
			if (begin < 0) begin = 0;
			end = begin + this._pageIncrement - 1;
			if (end >= this._pageCount) end = this._pageCount - 1;
		}
		var zcs = this.getZclass();
		if (this._activePage > 0) {
			if (begin > 0) 
				this.appendAnchor(zcs, out, msgzul.FIRST, 0);
			this.appendAnchor(zcs, out, msgzul.PREV, this._activePage - 1);
		}

		var bNext = this._activePage < this._pageCount - 1;
		for (; begin <= end; ++begin) {
			if (begin == this._activePage) {
				this.appendAnchor(zcs, out, begin + 1, begin, true);
			} else {
				this.appendAnchor(zcs, out, begin + 1, begin);
			}
		}

		if (bNext) {
			this.appendAnchor(zcs, out, msgzul.NEXT, this._activePage + 1);
			if (end < this._pageCount - 1) 
				this.appendAnchor(zcs, out, msgzul.LAST, this._pageCount - 1);
		}
		if (this._detailed)
			out.push('<span id="', this.uuid ,'-info">', this.infoText_(), "</span>");
		return out.join('');
	},
	appendAnchor: function (zclass, out, label, val, seld) {
		zclass += "-cnt" + (seld ? " " + zclass + "-seld" : "");
		out.push('<a class="', zclass, '" href="javascript:;" onclick="zul.mesh.Paging.go(this,',
				val, ')">', label, '</a>&nbsp;');
	},
	getZclass: function () {
		var added = "os" == this.getMold() ? "-os" : "";
		return this._zclass == null ? "z-paging" + added : this._zclass;
	},
	isVisible: function () {
		var visible = this.$supers('isVisible', arguments);
		return visible && (this._pageCount > 1 || !this._autohide);
	},
	bind_: function () {
		this.$supers(zul.mesh.Paging, 'bind_', arguments);
		if (this.getMold() == "os") return;
		var uuid = this.uuid,
			inputs = jq.$$(uuid, 'real'),
			zcls = this.getZclass(),
			Paging = this.$class;

		if (!this.$weave)
			for (var i = inputs.length; i--;)
				jq(inputs[i]).keydown(Paging._domKeyDown)
					.blur(Paging._domBlur);
		
		for (var postfix = ['first', 'prev', 'last', 'next'], k = postfix.length; k--; ) {
			var btn = jq.$$(uuid, postfix[k]);
			for (var j = btn.length; j--;) {
				if (!this.$weave)
					jq(btn[j]).mouseover(Paging._domMouseOver)
						.mouseout(Paging._domMouseOut)
						.mousedown(Paging._domMouseDown)
						.click(Paging['_dom' + postfix[k] + 'Click']);

				if (this._pageCount == 1)
					jq(btn[j]).addClass(zcls + "-btn-disd");
				else if (postfix[k] == 'first' || postfix[k] == 'prev') {
					if (this._activePage == 0) jq(btn[j]).addClass(zcls + "-btn-disd");
				} else if (this._activePage == this._pageCount - 1) {
					jq(btn[j]).addClass(zcls + "-btn-disd");
				}
			}
		}
	},
	unbind_: function () {
		if (this.getMold() != "os") {
			var uuid = this.uuid, inputs = jq.$$(uuid, 'real'), Paging = this.$class;
			
			for (var i = inputs.length; i--;)
				jq(inputs[i]).unbind("keydown", Paging._domKeyDown)
					.unbind("blur", Paging._domBlur);
			
			for (var postfix = ['first', 'prev', 'last', 'next'], k = postfix.length; k--;) {
				var btn = jq.$$(uuid, postfix[k]);
				for (var j = btn.length; j--;) {
					jq(btn[j]).unbind("mouseover", Paging._domMouseOver)
						.unbind("mouseout", Paging._domMouseOut)
						.unbind("mousedown", Paging._domMouseDown)
						.unbind("click", Paging['_dom' + postfix[k] + 'Click']);
				}
			}
		}
		this.$supers(zul.mesh.Paging, 'unbind_', arguments);
	}
}, { 
	
	go: function (anc, pgno) {
		var wgt = zk.Widget.isInstance(anc) ? anc : zk.Widget.$(anc);
		if (wgt && wgt.getActivePage() != pgno)
			wgt.fire('onPaging', pgno);
	},
	_domKeyDown: function (evt) {
		var inp = evt.target,
			wgt = zk.Widget.$(inp);
		if (inp.disabled || inp.readOnly)
			return;
	
		var code =evt.keyCode;
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
			break;		
		case 37:
			break;		
		case 38: case 33: 
			wgt.$class._increase(inp, wgt, 1);
			evt.stop();
			break;
		case 39:
			break;		
		case 40: case 34: 
			wgt.$class._increase(inp, wgt, -1);
			evt.stop();
			break;
		case 36:
			wgt.$class.go(wgt,0);
			evt.stop();
			break;
		case 35:
			wgt.$class.go(wgt, wgt._pageCount - 1);
			evt.stop();
			break;
		case 9: case 8: case 46: 
			break;
		case 13: 
			wgt.$class._increase(inp, wgt, 0);
			wgt.$class.go(wgt, inp.value-1);
			evt.stop();
			break;
		default:
			if (!(code >= 112 && code <= 123) 
			&& !evt.ctrlKey && !evt.altKey)
				evt.stop();
		}
	},
	_domBlur: function (evt) {
		var inp = evt.target,
			wgt = zk.Widget.$(inp);
		if (inp.disabled || inp.readOnly)
			return;
		
		wgt.$class._increase(inp, wgt, 0);
		wgt.$class.go(wgt, inp.value-1);
		evt.stop();
	},
	_increase: function (inp, wgt, add){
		var value = zk.parseInt(inp.value);
		value += add;
		if (value < 1) value = 1;
		else if (value > wgt._pageCount) value = wgt._pageCount;
		inp.value = value;
	},
	_domfirstClick: function (evt) {
		var wgt = zk.Widget.$(evt),
			zcls = wgt.getZclass();
		
		if (wgt.getActivePage() != 0) {
			wgt.$class.go(wgt, 0);
			var uuid = wgt.uuid;
			for (var postfix = ['first', 'prev'], k = postfix.length; k--;)
				for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
					jq(btn[i]).addClass(zcls + "-btn-disd");
		}
	},
	_domprevClick: function (evt) {		
		var wgt = zk.Widget.$(evt),
			ap = wgt.getActivePage(),
			zcls = wgt.getZclass();
		
		if (ap > 0) {
			wgt.$class.go(wgt, ap - 1);
			if (ap - 1 == 0) {
				var uuid = wgt.uuid;
				for (var postfix = ['first', 'prev'], k = postfix.length; k--;)
					for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
						jq(btn[i]).addClass(zcls + "-btn-disd");
			}
		}
	},
	_domnextClick: function (evt) {
		var wgt = zk.Widget.$(evt),
			ap = wgt.getActivePage(),
			pc = wgt.getPageCount(),
			zcls = wgt.getZclass();
		
		if (ap < pc - 1) {
			wgt.$class.go(wgt, ap + 1);
			if (ap + 1 == pc - 1) {
				var uuid = wgt.uuid;
				for (var postfix = ['last', 'next'], k = postfix.length; k--;)
					for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
						jq(btn[i]).addClass(zcls + "-btn-disd");
			}
		}
	},
	_domlastClick: function (evt) {
		var wgt = zk.Widget.$(evt),
			pc = wgt.getPageCount(),
			zcls = wgt.getZclass();
		
		if (wgt.getActivePage() < pc - 1) {
			wgt.$class.go(wgt, pc - 1);
			var uuid = wgt.uuid;
			for (var postfix = ['last', 'next'], k = postfix.length; k--;)
				for (var btn = jq.$$(uuid, postfix[k]), i = btn.length; i--;)
					jq(btn[i]).addClass(zcls + "-btn-disd");
		}
		
	},
	_domMouseOver: function (evt) {
		var target = evt.target,
			$table = jq(target).parents("table:first"),
			zcls = zk.Widget.$(target).getZclass();
		if (!$table.hasClass(zcls + "-btn-disd")) 
			$table.addClass(zcls + "-btn-over");
	},
	_domMouseOut: function (evt) {
		var target = evt.target,
			$table = jq(target).parents("table:first"),
			wgt = zk.Widget.$(target);
		if(!zk.ie || !jq.isAncestor($table[0], evt.relatedTarget || evt.toElement))
			$table.removeClass(wgt.getZclass() + "-btn-over");
	},
	_domMouseDown: function (evt) {		
		var target = evt.target,
			$table = jq(target).parents("table:first"),
			wgt = zk.Widget.$(target),
			zcls = wgt.getZclass();
		if (!$table.hasClass(zcls + "-btn-disd")) {
			$table.addClass(zcls + "-btn-clk");
			wgt.$class._downbtn = $table[0];
			jq(document).mouseup(wgt.$class._domMouseUp);
		}
	},
	_domMouseUp: function (evt) {
		if (zul.mesh.Paging._downbtn) {
			var zcls = zk.Widget.$(zul.mesh.Paging._downbtn).getZclass();
			jq(zul.mesh.Paging._downbtn).removeClass(zcls + "-btn-clk");
		}
		zul.mesh.Paging._downbtn = null;
		jq(document).unbind("mouseup", zul.mesh.Paging._domMouseUp);
	}
});

zkreg('zul.mesh.Paging');zk._m={};
zk._m['os']=
function (out) {
	if (this.getMold() == "os") {
		out.push('<div', this.domAttrs_(), '>', this._innerTags(), '</div>');
		return;
	}
	var uuid = this.uuid,
		zcls = this.getZclass();
	out.push('<div name="', uuid, '"', this.domAttrs_(), '>', '<table', zUtl.cellps0,
			'><tbody><tr><td><table id="', uuid, '-first" name="', uuid, '-first"',
			zUtl.cellps0, ' class="', zcls, '-btn"><tbody><tr>',
			'<td class="', zcls, '-btn-l"><i>&#160;</i></td>',
			'<td class="', zcls, '-btn-m"><em unselectable="on">',
			'<button type="button" class="', zcls, '-first"> </button></em></td>',
			'<td class="', zcls, '-btn-r"><i>&#160;</i></td></tr></tbody></table></td>',
			'<td><table id="', uuid, '-prev" name="', uuid, '-prev"', zUtl.cellps0,
			' class="', zcls, '-btn"><tbody><tr><td class="', zcls, '-btn-l"><i>&#160;</i></td>',
			'<td class="', zcls, '-btn-m"><em unselectable="on"><button type="button" class="',
			zcls, '-prev"> </button></em></td><td class="', zcls, '-btn-r"><i>&#160;</i></td>',
			'</tr></tbody></table></td><td><span class="', zcls, '-sep"></span></td>',
			'<td><span class="', zcls, '-text"></span></td><td><input id="',
			uuid, '-real" name="', uuid, '-real" type="text" class="', zcls,
			'-inp" value="', this.getActivePage() + 1, '" size="3"/></td>',
			'<td><span class="', zcls, '-text">/ ', this.getPageCount(), '</span></td>',
			'<td><span class="', zcls, '-sep"></span></td><td><table id="', uuid,
			'-next" name="', uuid, '-next"', zUtl.cellps0, ' class="', zcls, '-btn">',
			'<tbody><tr><td class="', zcls, '-btn-l"><i>&#160;</i></td><td class="',
			zcls, '-btn-m"><em unselectable="on"><button type="button" class="',
			zcls, '-next"> </button></em></td><td class="', zcls, '-btn-r"><i>&#160;</i></td>',
			'</tr></tbody></table></td><td><table id="', uuid, '-last" name="',
			uuid, '-last"', zUtl.cellps0, ' class="', zcls, '-btn"><tbody><tr>',
			'<td class="', zcls, '-btn-l"><i>&#160;</i></td><td class="', zcls,
			'-btn-m"><em unselectable="on"><button type="button" class="', zcls,
			'-last"> </button></em></td><td class="', zcls, '-btn-r"><i>&#160;</i></td>',
			'</tr></tbody></table></td></tr></tbody></table>');
			
	if (this.isDetailed()) out.push(this._infoTags());
	out.push('</div>');
}

;zk._m['default']=[zk._p.p.Paging,'os'];zkmld(zk._p.p.Paging,zk._m);

zul.mesh.Auxhead = zk.$extends(zul.mesh.HeadWidget, {
	
	getZclass: function () {
		return this._zclass == null ? "z-auxhead" : this._zclass;
	}
});

zkreg('zul.mesh.Auxhead');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), ' align="left">');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Auxhead,zk._m);

zul.mesh.Auxheader = zk.$extends(zul.mesh.HeaderWidget, {
	_colspan: 1,
	_rowspan: 1,

	$define: {
    	
    	
		colspan: function (v) {
			var n = this.$n();
			if (n)
				if (zk.ie) this.rerender(); 
				else n.colSpan = v;
		},
		
		
		rowspan: function (v) {
			var n = this.$n();
			if (n)
				if (zk.ie) this.rerender(); 
				else n.rowSpan = v;
		}
	},
	
	fixedFaker_: zk.$void, 
	
	domAttrs_: function () {
		var s = this.$supers('domAttrs_', arguments), v;
		if ((v = this._colspan) != 1)
			s += ' colspan="' + v + '"';
		if ((v = this._rowspan) != 1)
			s += ' rowspan="' + v + '"';
		return s;
	},
	getZclass: function () {
		return this._zclass == null ? "z-auxheader" : this._zclass;
	}
});
zkreg('zul.mesh.Auxheader',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<th', this.domAttrs_(), '><div id="', this.uuid, '-cave" class="',
	this.getZclass(), '-cnt"', this.domTextStyleAttr_(), '>', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Auxheader,zk._m);
(function () {
	function _colspan(c) { 
		var v = zk.Widget.$(c)._colspan;
		return v ? v: 1;
	}
	function _resetColspan(c) {
		c.colSpan = _colspan(c);
	}
	function _fixaux(cells, from, to) {
		for (var j = 0, k = 0, cl = cells.length; j < cl; ++j) {
			var ke = k + _colspan( zk.Widget.$(cells[j]));
			if (from >= k && ke > from) { 
				for (; j < cl && k < to; ++j, k = ke) {
					var cell = cells[j],
						ke = k + _colspan(cell),
						v = from - k, v2 = ke - to;
					v = (v > 0 ? v: 0) + (v2 > 0 ? v2: 0);
					if (v) {
						cell.colSpan = v;
						cell.style.display = "";
					} else {
						_resetColspan(cell);
						cell.style.display = "none";
					}
				}
				for (; j < cl; ++j) {
					var cell = cells[j];
					_resetColspan(cell);
					if (cell.style.display != "none")
						break; 
					cell.style.display = "";
				}
				return;
			}
			k = ke;
		}
	}


zul.mesh.Frozen = zk.$extends(zul.Widget, {
	_start: 0,
	
	$define: {
    	
    	
		columns: [function(v) {
			return v < 0 ? 0 : v;
		}, function(v) {
			if (this._columns) {
				if (this.desktop) {
					this.onShow();
					this.syncScorll();
				}
			} else this.rerender();
		}],
		
		
		start: function () {
			this.syncScorll();
		}
	},
	
	syncScorll: function () {
		var scroll = this.$n('scrollX');
		if (scroll)
			scroll.scrollLeft = this._start * 50;
	},
	getZclass: function () {
		return this._zclass == null ? "z-frozen" : this._zclass;
	},
	onShow: _zkf = function () {
		if (!this._columns) return;
		var bdfaker = this.parent.ebdfaker;
		if (!bdfaker) {
			bdfaker = this.parent.ebodyrows[0];
			if (bdfaker)
				bdfaker = bdfaker.$n();
		}
		if (bdfaker) {
			var leftWidth = 0;
			for (var i = this._columns, n = bdfaker.firstChild; n && i--; n = n.nextSibling)
				leftWidth += n.offsetWidth;

			this.$n('cave').style.width = jq.px0(leftWidth);
			var scroll = this.$n('scrollX'),
				width = this.parent.$n('body').offsetWidth;
				width -= leftWidth;
			scroll.style.width = jq.px0(width);
			var scrollScale = bdfaker.childNodes.length - this._columns - 1;
			scroll.firstChild.style.width = jq.px0(width + 50 * scrollScale);
			this.syncScorll();
		}
	},
	onSize: _zkf,
	_onScroll: function (evt) {
		if (!evt.data) return;
		this.setStart(this._start + 2);
		this.parent.ebody.scrollLeft = 0;
		evt.stop();
	},
	bind_: function () {
		this.$supers(zul.mesh.Frozen, 'bind_', arguments);
		zWatch.listen({onShow: this, onSize: this});
		var scroll = this.$n('scrollX'),
			gbody = this.parent.$n('body');

		this.$n().style.height = this.$n('cave').style.height = scroll.style.height
			 = scroll.firstChild.style.height = jq.px0(jq.scrollbarWidth());

		this.parent.listen({onScroll: this.proxy(this._onScroll)}, -1000);
		this.domListen_(scroll, 'onScroll');

		if (gbody)
			gbody.style.overflowX = 'hidden';
	},
	unbind_: function () {
		zWatch.unlisten({onShow: this, onSize: this});
		var p;
		if ((p = this.parent) && (p = p.$n('body')))
			p.style.overflowX = '';
		this.$supers(zul.mesh.Frozen, 'unbind_', arguments);
	},
	_doScroll: function (evt) {
		var scroll = this.$n('scrollX'),
			num = Math.ceil(scroll.scrollLeft / 50);
		if (this._lastScale == num)
			return;
		this._lastScale = num;
		this._doScrollNow(num);
		this.smartUpdate('start', num);
		this._start = num;
	},
	_doScrollNow: function (num) {
		var width = this.$n('cave').offsetWidth,
			mesh = this.parent,
			cnt = num,
			rows = mesh.ebodyrows;

		if (!mesh.head && (!rows || rows.length))
			return;

		if (mesh.head) {

			
			for (var faker, n = mesh.head.firstChild.$n('hdfaker'); n;
					n = n.nextSibling) {
				if (n.style.width.indexOf('px') == -1) {
					var sw = n.style.width = jq.px0(n.offsetWidth),
						wgt = zk.Widget.$(n);
					if ((faker = wgt.$n('bdfaker')))
						faker.style.width = sw;
					if ((faker = wgt.$n('ftfaker')))
						faker.style.width = sw;
				}
			}
			var colhead = mesh.head.getChildAt(this._columns).$n();
			for (var display, faker, index = this._columns,
					tail = mesh.head.nChildren - index,
					n = colhead;
					n; n = n.nextSibling, index++, tail--) {
				display = cnt-- <= 0 ? '' : 'none';
				if (n.style.display != display) {
					n.style.display = display;
					if ((faker = jq('#' + n.id + '-hdfaker')[0]))
						faker.style.display = display;
					if ((faker = jq('#' + n.id + '-bdfaker')[0]))
						faker.style.display = display;
					if ((faker = jq('#' + n.id + '-fdfaker')[0]))
						faker.style.display = display;

					
					for (var i = 0, rl = rows.length, cells;
					i < rl && (ofs = (cells = rows[i++].cells).length - tail) >= 0;)
						cells[ofs].style.display = display;
				}
			}

			
			for (var hdr = colhead.parentNode, hdrs = hdr.parentNode.rows,
				i = hdrs.length, r; i--;)
				if ((r = hdrs[i]) != hdr) 
					_fixaux(r.cells, this._columns, this._columns + num);

			for (var n = mesh.head.getChildAt(this._columns + num).$n('hdfaker');
					n; n = n.nextSibling)
				width += zk.parseInt(n.style.width);

		} else {
			
			
			for (var index = this._columns, c = rows[0].firstChild; c; c = c.nextSibling) {
				if (c.style.width.indexOf('px') == -1)
					c.style.width = jq.px0(zk(c).revisedWidth(c.offsetWidth));
			}

			for (var first = rows[0], display, index = this._columns,
					len = first.childNodes.length; index < len; index++) {
				display = cnt-- <= 0 ? '' : 'none';
				for (var r = first; r; r = r.nextSibling)
					r.cells[index].style.display = display;
			}

			for (var c = rows[0].cells[this._columns + num]; c; c = c.nextSibling)
				width += zk.parseInt(c.style.width);
		}

		width = jq.px0(width);
		if (mesh.eheadtbl)
			mesh.eheadtbl.style.width = width;
		if (mesh.ebodytbl)
			mesh.ebodytbl.style.width = width;
		if (mesh.efoottbl)
			mesh.efoottbl.style.width = width;
	}
});

})();
zkreg('zul.mesh.Frozen',true);zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass();
		
	out.push('<div', this.domAttrs_(), '><div id="', uuid, '-cave" class="', zcls,
			'-body">');
	
	for (var j = 0, w = this.firstChild; w; w = w.nextSibling, j++)
		w.redraw(out);
		
	out.push('</div><div id="', uuid, '-scrollX" class="', zcls, '-inner"><div></div></div>',
			'<div class="z-clear"></div></div>');
}

;zkmld(zk._p.p.Frozen,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.mesh',1);zk.load('zul.wgt',function(){zk._p=zkpi('zul.menu',true);try{




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
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.menu',1);zk.load('zul.mesh,zul.menu',function(){zk._p=zkpi('zul.grid',true);try{

zul.grid.Column = zk.$extends(zul.mesh.SortWidget, {
	
	getGrid: zul.mesh.HeaderWidget.prototype.getMeshWidget,

	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onGroup: this}, -1000);
	},
	
	getMeshBody: function () {
		var grid = this.getGrid();
		return grid ? grid.rows : null;  
	},
	
	group: function (ascending, evt) {
		var dir = this.getSortDirection();
		if (ascending) {
			if ("ascending" == dir) return false;
		} else {
			if ("descending" == dir) return false;
		}

		var sorter = ascending ? this._sortAscending: this._sortDescending;
		if (sorter == "fromServer")
			return false;
		else if (sorter == "none") {
			evt.stop();
			return false;
		}
		
		var mesh = this.getMeshWidget();
		if (!mesh || mesh.isModel() || !zk.feature.pe || !zk.isLoaded('zkex.grid')) return false;
			
			
		var	body = this.getMeshBody();
		if (!body) return false;
		evt.stop();
		
		var desktop = body.desktop,
			node = body.$n();
		try {
			body.unbind();
			if (body.hasGroup()) {
				for (var gs = body.getGroups(), len = gs.length; --len >= 0;) 
					body.removeChild(gs[len]);
			}
			
			var d = [], col = this.getChildIndex();
			for (var i = 0, z = 0, it = mesh.getBodyWidgetIterator(), w; (w = it.next()); z++) 
				for (var k = 0, cell = w.firstChild; cell; cell = cell.nextSibling, k++) 
					if (k == col) {
						d[i++] = {
							wgt: cell,
							index: z
						};
					}
			
			var dsc = dir == "ascending" ? -1 : 1, fn = this.sorting, isNumber = sorter == "client(number)";
			d.sort(function(a, b) {
				var v = fn(a.wgt, b.wgt, isNumber) * dsc;
				if (v == 0) {
					v = (a.index < b.index ? -1 : 1);
				}
				return v;
			});
			
			
			for (;body.firstChild;)
				body.removeChild(body.firstChild);
			
			for (var previous, row, index = this.getChildIndex(), i = 0, k = d.length; i < k; i++) {
				row = d[i];
				if (!previous || fn(previous.wgt, row.wgt, isNumber) != 0) {
					
					var group, cell = row.wgt.parent.getChildAt(index);
					if (cell && cell.$instanceof(zul.wgt.Label)) {
						group = new zkex.grid.Group();
						group.appendChild(new zul.wgt.Label({
							value: cell.getValue()
						}));
					} else {
						var cc = cell.firstChild;
						if (cc && cc.$instanceof(zul.wgt.Label)) {
							group = new zkex.grid.Group();
							group.appendChild(new zul.wgt.Label({
								value: cc.getValue()
							}));
						} else {
							group = new zkex.grid.Group();
							group.appendChild(new zul.wgt.Label({
								value: msgzul.GRID_OTHER
							}));
						}
					}
					body.appendChild(group);
				}
				body.appendChild(row.wgt.parent);
				previous = row;
			}
			this._fixDirection(ascending);
		} finally {
			body.replaceHTML(node, desktop);
		}
		return true;
	},
	setLabel: function (label) {
		this.$supers('setLabel', arguments);
		if (this.parent)
			this.parent._syncColMenu();
	},
	setVisible: function (visible) {
		if (this.isVisible() != visible) {
			this.$supers('setVisible', arguments);
			if (this.parent)
				this.parent._syncColMenu();
		}
	},
	
	onGroup: function (evt) {
		var dir = this.getSortDirection();
		if ("ascending" == dir) this.group(false, evt);
		else if ("descending" == dir) this.group(true, evt);
		else if (!this.group(true, evt)) this.group(false, evt);
	},
	getZclass: function () {
		return this._zclass == null ? "z-column" : this._zclass;
	},
	bind_: function () {
		this.$supers(zul.grid.Column, 'bind_', arguments);
		var n = this.$n();
		this.domListen_(n, "onMouseOver")
			.domListen_(n, "onMouseOut");
		var btn = this.$n('btn');
		if (btn)
			this.domListen_(btn, "onClick");
	},
	unbind_: function () {
		var n = this.$n();
		this.domUnlisten_(n, "onMouseOver")
			.domUnlisten_(n, "onMouseOut");
		var btn = this.$n('btn');
		if (btn)
			this.domUnlisten_(btn, "onClick");
		this.$supers(zul.grid.Column, 'unbind_', arguments);
	},
	_doMouseOver: function(evt) {
		if (this.parent._menupopup || this.parent._menupopup != 'none') {
			var btn = this.$n('btn'),
				n = this.$n();
			jq(n).addClass(this.getZclass() + "-over");
			if (btn) btn.style.height = n.offsetHeight - 1 + "px";
		}
	},
	_doMouseOut: function (evt) {
		if (this.parent._menupopup || this.parent._menupopup != 'none') {
			var btn = this.$n('btn'),
				n = this.$n(), $n = jq(n),
				zcls = this.getZclass();
			if (!$n.hasClass(zcls + "-visi") &&
				(!zk.ie || !jq.isAncestor(n, evt.domEvent.relatedTarget || evt.domEvent.toElement)))
					$n.removeClass(zcls + "-over");
		}
	},
	_doClick: function (evt) {
		if (this.parent._menupopup || this.parent._menupopup != 'none') {
			var pp = this.parent._menupopup,
				n = this.$n(),
				btn = this.$n('btn'),
				zcls = this.getZclass();
				
			jq(n).addClass(zcls + "-visi");
			
			if (pp == 'auto' && this.parent._mpop)
				pp = this.parent._mpop;
			else
				pp = this.$f(this.parent._menupopup);

			if (zul.menu.Menupopup.isInstance(pp)) {
				var ofs = zk(btn).revisedOffset(),
					asc = this.getSortAscending() != 'none',
					desc = this.getSortDescending() != 'none';
				if (pp.$instanceof(zul.grid.ColumnMenupopup)) {
					pp.getAscitem().setVisible(asc);
					pp.getDescitem().setVisible(desc);
					if (pp.getGroupitem()) 
						pp.getGroupitem().setVisible((asc || desc));
					
					var sep = pp.getDescitem().nextSibling;
					if (sep) 
						sep.setVisible((asc || desc));
				} else {
					pp.listen({onOpen: [this.parent, this.parent._onMenuPopup]});
				}
				pp.open(btn, [ofs[0], ofs[1] + btn.offsetHeight - 4], null, {sendOnOpen: true});
			}
			evt.stop(); 
		}
	}
});

zkreg('zul.grid.Column',true);zk._m={};
zk._m['default']=
zul.mesh.HeaderWidget.redraw
;zkmld(zk._p.p.Column,zk._m);

zul.grid.Columns = zk.$extends(zul.mesh.HeadWidget, {
	_menupopup: "none",
	_columnshide: true,
	_columnsgroup: true,

	$define: {
		
		
		columnshide: _zkf = function () {
			if (this.desktop)
				this._initColMenu();
		},
		
		
		columnsgroup: _zkf,
		
		
		menupopup: function () {
			if (this._menupopup != 'auto')
				this._mpop = null;
			this.rerender();		
		}
	},
	
	getGrid: function () {
		return this.parent;
	},
	rerender: function () {
		if (this.desktop) {
			if (this.parent)
				this.parent.rerender();
			else 
				this.$supers('rerender', arguments);
		}
		return this;
	},
	
	setPopup: function (mpop) {
		if (zk.Widget.isInstance(mpop)) {
			this._menupopup = mpop;
			this._mpop = null;
		}
		return this;
	},
	getZclass: function () {
		return this._zclass == null ? "z-columns" : this._zclass;
	},
	bind_: function (dt, skipper, after) {
		this.$supers(zul.grid.Columns, 'bind_', arguments);
		zWatch.listen({onResponse: this});
		var w = this;
		if (this._menupopup == 'auto') {
			after.push(function() {
				w._initColMenu();
			});
		}
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		if (this._mpop) {
			this._mpop.parent.removeChild(this._mpop);
			this._shallSync = this._mpop = null;			
		}
		this.$supers(zul.grid.Columns, 'unbind_', arguments);
	},
	onResponse: function () {
		if (this._shallSync)
			this.syncColMenu();
	},
	_syncColMenu: function () {
		this._shallSync = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		this._syncColMenu();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (!this.childReplacing_)
			this._syncColMenu();
	},
	_initColMenu: function () {
		if (this._mpop)
			this._mpop.parent.removeChild(this._mpop);
		this._mpop = new zul.grid.ColumnMenupopup({columns: this});
	},
	
	syncColMenu: function () {
		this._shallSync = false;
		if (this._mpop)
			this._mpop.syncColMenu();
		return this;
	},
	_onColVisi: function (evt) {
		var item = evt.currentTarget,
			pp = item.parent;
			
		pp.close({sendOnOpen: true});
		var checked = 0;
		for (var w = pp.firstChild; w; w = w.nextSibling) {
			if (w.$instanceof(zul.menu.Menuitem) && w.isChecked())
				checked++;
		}
		if (checked == 0)
			item.setChecked(true);
			
		var col = zk.Widget.$(item._col);
		if (col && col.parent == this)
			col.setVisible(item.isChecked());
	},
	_onGroup: function (evt) {
		this._mref.fire('onGroup');
	},
	_onAsc: function (evt) {
		if (this._mref.getSortDirection() != 'ascending')
			this._mref.fire('onSort');
	},
	_onDesc: function (evt) {
		if (this._mref.getSortDirection() != 'descending')
			this._mref.fire('onSort');
	},
	_onMenuPopup: function (evt) {
		if (this._mref) {
			var zcls = this._mref.getZclass(),
				n = this._mref.$n();
			jq(n).removeClass(zcls + '-visi').removeClass(zcls + '-over');
		}
		this._mref = evt.data.reference; 
	}
});

zul.grid.ColumnMenupopup = zk.$extends(zul.menu.Menupopup, {
	$define: {
		columns: null
	},
	
	$init: function () {
		this.$supers('$init', arguments);
		this.afterInit(this._init);
	},
	
	getAscitem: function () {
		return this._asc;
	},
	
	getDescitem: function () {
		return this._desc;
	},
	
	getGroupitem: function () {
		return this._group;
	},
	_init: function () {
		var w = this._columns,
			zcls = w.getZclass();

		this.listen({onOpen: [w, w._onMenuPopup]});
		
		if (zk.feature.pe && w.isColumnsgroup()) {
			if (!zk.isLoaded('zkex.grid'))
				zk.load('zkex.grid');
			var group = new zul.menu.Menuitem({label: msgzul.GRID_GROUP});
				group.setSclass(zcls + '-menu-grouping');
				group.listen({onClick: [w, w._onGroup]});
			this.appendChild(group);
			this._group = group;
		}
		var asc = new zul.menu.Menuitem({label: msgzul.GRID_ASC});
			asc.setSclass(zcls + '-menu-asc');
			asc.listen({onClick: [w, w._onAsc]});
		this._asc = asc;
		this.appendChild(asc);
		
		var desc = new zul.menu.Menuitem({label: msgzul.GRID_DESC});
		desc.setSclass(zcls + '-menu-dsc');
		desc.listen({onClick: [w, w._onDesc]});
		this._desc = desc;
		this.appendChild(desc);
		this.syncColMenu();
		w.getPage().appendChild(this);
	},
	
	syncColMenu: function () {
		var w = this._columns;
		for (var c = this.lastChild, p; c != this._desc;) {
			p = c.previousSibling
			this.removeChild(c);
			c = p;
		}
		if (w && w.isColumnshide()) {
			var sep = new zul.menu.Menuseparator();
			this.appendChild(sep);
			for (var item, c = w.firstChild; c; c = c.nextSibling) {
				item = new zul.menu.Menuitem({
					label: c.getLabel(),
					autocheck: true,
					checkmark: true,
					checked: c.isVisible()
				});
				item._col = c.uuid;
				item.listen({onClick: [w, w._onColVisi]});
				this.appendChild(item);
			}
		}
	}
});
zkreg('zul.grid.Columns');zk._m={};
zk._m['default']=
zul.mesh.HeadWidget.redraw

;zkmld(zk._p.p.Columns,zk._m);




zul.grid.Grid = zk.$extends(zul.mesh.MeshWidget, {
		
	getCell: function (row, col) {
		if (!this.rows) return null;
		if (rows.nChildren <= row) return null;

		var row = rows.getChildAt(row);
		return row.nChildren <= col ? null: row.getChildAt(col);
	},
	
	getOddRowSclass: function () {
		return this._scOddRow == null ? this.getZclass() + "-odd" : this._scOddRow;
	},
	
	setOddRowSclass: function (scls) {
		if (!scls) scls = null;
		if (this._scOddRow != scls) {
			this._scOddRow = scls;
			var n = this.$n();
			if (n && this.rows)
				this.rows.stripe();
		}
		return this;
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		if (this.rows)
			this.rows._syncStripe();
		return this;
	},
	
	getZclass: function () {
		return this._zclass == null ? "z-grid" : this._zclass;
	},
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling, !this.z_rod)) {
			this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child, !this.z_rod)) {
			if (!this.insertingBefore_)
				this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom, _noSync) {
		var isRows;
		if (child.$instanceof(zul.grid.Rows)) {
			this.rows = child;
			isRows = true;
		} else if (child.$instanceof(zul.grid.Columns)) 
			this.columns = child;
		else if (child.$instanceof(zul.grid.Foot)) 
			this.foot = child;
		else if (child.$instanceof(zul.mesh.Paging)) 
			this.paging = child;
		else if (child.$instanceof(zul.mesh.Frozen)) 
			this.frozen = child;

		if (!ignoreDom)
			this.rerender();
		if (!isRows && !_noSync)
			this._syncSize();  
	},
	onChildReplaced_: function (oldc, newc) {
		this.onChildRemoved_(oldc, true);
		this._fixOnAdd(newc, true); 
	},
	onChildRemoved_: function (child, _noSync) {
		this.$supers('onChildRemoved_', arguments);
		var isRows;
		if (child == this.rows) {
			this.rows = null;
			isRows = true;
		} else if (child == this.columns) 
			this.columns = null;
		else if (child == this.foot) 
			this.foot = null;
		else if (child == this.paging) 
			this.paging = null;
		else if (child == this.frozen) 
			this.frozen = null;

		if (!isRows && !_noSync)
			this._syncSize();
	},
	insertChildHTML_: function (child, before, desktop) {
		if (child.$instanceof(zul.grid.Rows)) {
			this.rows = child;
			var fakerows = this.$n('rows');
			if (fakerows) {
				jq(fakerows).replaceWith(child.redrawHTML_());
				child.bind(desktop);
				this.ebodyrows = child.$n().rows;
				return;
			} else {
				var tpad = this.$n('tpad');
				if (tpad) {
					jq(tpad).after(child.redrawHTML_());
					child.bind(desktop);
					this.ebodyrows = child.$n().rows;
					return;
				} else if (this.ebodytbl) {
					jq(this.ebodytbl).append(child.redrawHTML_());
					child.bind(desktop);
					this.ebodyrows = child.$n().rows;
					return;
				}
			}
		}

		this.rerender();
	},
	
	getHeadWidgetClass: function () {
		return zul.grid.Columns;
	},
	
	getBodyWidgetIterator: function () {
		return new zul.grid.RowIter(this);
	}
});

zul.grid.RowIter = zk.$extends(zk.Object, {
	
	$init: function (grid) {
		this.grid = grid;
	},
	_init: function () {
		if (!this._isInit) {
			this._isInit = true;
			this.p = this.grid.rows ? this.grid.rows.firstChild: null;
		}
	},
	 
	hasNext: function () {
		this._init();
		return this.p;
	},
	
	next: function () {
		this._init();
		var p = this.p;
		if (p) this.p = p.nextSibling;
		return p;
	}
});

zkreg('zul.grid.Grid');zk._m={};
zk._m['paging']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		wdAttr = this.getHflex() == 'min' ? '' : innerWidth == '100%' ? ' width="100%"' : '',
		wdStyle = innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos;

	out.push('<div', this.domAttrs_(), '>');

	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}

	if (this.columns) {
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
			'<table', wdAttr, zUtl.cellps0,
			' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');

	var hgh = this.getHeight();
	if (hgh) out.push(' style="height:', hgh, '"');
	
	out.push('><table', wdAttr, zUtl.cellps0);
	if (!this.isSizedByContent())
		out.push(' style="table-layout:fixed;', wdStyle,'"');		
	out.push('>');
	
	if (this.columns)
		this.domFaker_(out, '-bdfaker', zcls);

	if (this.rows) {
		if (this.domPad_ && !this.inPagingMold())
			this.domPad_(out, '-tpad');
		this.rows.redraw(out);
		if (this.domPad_ && !this.inPagingMold())
			this.domPad_(out, '-bpad');
	}
	
	out.push('</table></div>');
	
	if (this.foot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
			'<table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.columns) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.foot.redraw(out);
		out.push('</table></div>');
	}
	
	if (this.frozen) {
		out.push('<div id="', uuid, '-frozen" class="', zcls, '-frozen">');
		this.frozen.redraw(out);
		out.push('</div>');
	}
	
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}

;zk._m['default']=[zk._p.p.Grid,'paging'];zkmld(zk._p.p.Grid,zk._m);
(function () {
	function _isPE() {
		return zk.feature.pe && zk.isLoaded('zkex.grid');
	}

zul.grid.Row = zk.$extends(zul.Widget, {
	$define: {
		
		
		align: function (v) {
			var n = this.$n();
			if (n)
				n.align = v;
		},
		
		
		nowrap: function (v) {
			var n = this.$n();
			if (n)
				n.noWrap = v;
		},
		
		
		valign: function (v) {
			var n = this.$n();
			if (n)
				n.vAlign = v;
		}
	},
	
	getGrid: function () {
		return this.parent ? this.parent.parent : null;
	},	
	setVisible: function (visible) {
		if (this.isVisible() != visible) {
			this.$supers('setVisible', arguments);
			if (this.isStripeable_() && this.parent)
				this.parent.stripe();
		}
	},
	
	getSpans: function () {
		return zUtl.intsToString(this._spans);
	},
	
	setSpans: function (spans) {
		if (this.getSpans() != spans) {
			this._spans = zUtl.stringToInts(spans, 1);
			this.rerender();
		}
	},
	_getIndex: function () {
		return this.parent ? this.getChildIndex() : -1;
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass : "z-row";
	},
	
	getGroup: function () {
		
		if (_isPE() && this.parent && this.parent.hasGroup())
			for (var w = this.previousSibling; w; w = w.previousSibling)
				if (w.$instanceof(zkex.grid.Group)) return w;
				
		return null;
	},	
	setStyle: function (style) {
		if (this._style != style) {
			if (!zk._rowTime) zk._rowTime = zUtl.now();
			this._style = style;
			this.rerender();
		}
	},
	rerender: function () {
		if (this.desktop) {
			this.$supers('rerender', arguments);
			if (this.parent)
				this.parent._syncStripe();
		}
	},
	getSclass: function () {
		var sclass = this.$supers('getSclass', arguments);
		if (sclass != null) return sclass;

		var grid = this.getGrid();
		return grid ? grid.getSclass(): sclass;
	},
	_getChdextr: function (child) {
		return child.$n('chdextr') || child.$n();
	},
	insertChildHTML_: function (child, before, desktop) {
		var cls = !this.getGrid().isSizedByContent() ? 'z-overflow-hidden' : '';
		if (before)
			jq(this._getChdextr(before)).before(
				this.encloseChildHTML_({child: child, index: child.getChildIndex(),
						zclass: this.getZclass(), cls: cls}));
		else
			jq(this).append(
				this.encloseChildHTML_({child: child, index: child.getChildIndex(),
						zclass: this.getZclass(), cls: cls}));
		
		child.bind(desktop);
	},
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		jq(child.uuid + '-chdextr', zk).remove();
	},
	
	encloseChildHTML_: function (opts) {
		var out = opts.out || [],
			child = opts.child,
			isCell = child.$instanceof(zul.wgt.Cell);
		if (!isCell) {
			out.push('<td id="', child.uuid, '-chdextr"', this._childAttrs(child, opts.index),
				'>', '<div id="', child.uuid, '-cell" class="', opts.zclass, '-cnt ',
				opts.cls, '">');
		}
		child.redraw(out);
		if (!isCell) out.push('</div></td>');
		if (!opts.out) return out.join('');
	},
	_childAttrs: function (child, index) {
		var realIndex = index, span = 1;
		if (this._spans) {
			for (var j = 0, k = this._spans.length; j < k; ++j) {
				if (j == index) {
					span = this._spans[j];
					break;
				}
				realIndex += this._spans[j] - 1;
			}
		}

		var colattrs, visible, hgh,
			grid = this.getGrid();
		
		if (grid) {
			var cols = grid.columns;
			if (cols) {
				if (realIndex < cols.nChildren) {
					var col = cols.getChildAt(realIndex);
					colattrs = col.getColAttrs();
					visible = col.isVisible() ? '' : 'display:none';
					hgh = col.getHeight();
				}
			}
		}

		var style = this.domStyle_({visible:1, width:1, height:1}),
			isDetail = zk.isLoaded('zkex.grid') && child.$instanceof(zkex.grid.Detail);
		if (isDetail) {
			var wd = child.getWidth();
			if (wd) 
				style += "width:" + wd + ";";
		}

		if (visible || hgh) {
			style += visible;
			if (hgh)
				style += 'height:' + hgh + ';';
		}
		
		var clx = isDetail ? child.getZclass() + "-outer" : this.getZclass() + "-inner";
		
		if (!colattrs && !style && span === 1)
			return ' class="' + clx + '"';

		var attrs = colattrs ? colattrs : '';
		
		if (span !== 1)
			attrs += ' colspan="' + span + '"';
		return attrs + ' style="' + style + '"' + ' class="' + clx + '"';
	},
	
	isStripeable_: function () {
		return true;
	},
	
	domStyle_: function (no) {
		if ((_isPE() && (this.$instanceof(zkex.grid.Group) || this.$instanceof(zkex.grid.Groupfoot)))
				|| (no && no.visible))
			return this.$supers('domStyle_', arguments);
			
		var style = this.$supers('domStyle_', arguments),
			group = this.getGroup();
		return group && !group.isOpen() ? style + "display:none;" : style;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.grid.Detail))
			this.detail = child;
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.detail)
			this.detail = null;
	},
	doMouseOver_: function(evt) {
		if (zk.gecko && this._draggable
		&& !jq.nodeName(evt.domTarget, "input", "textarea")) {
			var n = this.$n();
			if (n) n.firstChild.style.MozUserSelect = "none";
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function(evt) {
		if (zk.gecko && this._draggable) {
			var n = this.$n();
			if (n) n.firstChild.style.MozUserSelect = "none";
		}
		this.$supers('doMouseOut_', arguments);
	},
	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments);
		if (this._align)
			attr += ' align="' + this._align + '"';
		if (this._valign)
			attr += ' valign="' + this._valign + '"';
		if (this._nowrap)
			attr += ' nowrap="nowrap"';
		return attr;
	},
	domClass_: function () {
		var cls = this.$supers('domClass_', arguments),
			grid = this.getGrid();
		if (grid && jq(this.$n()).hasClass(grid = grid.getOddRowSclass()))
			return cls + ' ' + grid; 
		return cls;
	}
});
})();
zkreg('zul.grid.Row');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	var	zcls = this.getZclass(),
		overflow = !this.getGrid().isSizedByContent() ? 'z-overflow-hidden' : '' ;
	for (var j = 0, w = this.firstChild; w; w = w.nextSibling, j++)
		this.encloseChildHTML_({child:w, index: j, zclass: zcls, cls: overflow, out: out});
	out.push('</tr>');	
}

;zkmld(zk._p.p.Row,zk._m);
(function () {

	function _isPE() {
		return zk.feature.pe && zk.isLoaded('zkex.grid');
	}

var Rows =

zul.grid.Rows = zk.$extends(zul.Widget, {
	_visibleItemCount: 0,
	$init: function () {
		this.$supers('$init', arguments);
		this._groupsInfo = [];
	},
	$define: {
		
		visibleItemCount: null
	},
	
	getGrid: function () {
		return this.parent;
	},
	
	getGroupCount: function () {
		return this._groupsInfo.length;
	},
	
	getGroups: function () {
		return this._groupsInfo.$clone();
	},
	
	hasGroup: function () {
		return this._groupsInfo.length;
	},
	getZclass: function () {
		return this._zclass == null ? "z-rows" : this._zclass;
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(Rows, 'bind_', arguments);
		zWatch.listen({onResponse: this});
		var w = this;
		after.push(zk.booted ? function(){setTimeout( function(){w.onResponse();},0)}: this.proxy(this.stripe));
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		this.$supers(Rows, 'unbind_', arguments);
	},
	onResponse: function () {
		if (this.desktop && this._shallStripe) { 
			this.stripe();
			this.getGrid().onSize();
		}
	},
	_syncStripe: function () {
		this._shallStripe = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	
	stripe: function () {
		var grid = this.getGrid(),
			scOdd = grid.getOddRowSclass();
		if (!scOdd) return;
		var n = this.$n();
		if (!n) return; 

		for (var j = 0, w = this.firstChild, even = !(this._offset & 1); w; w = w.nextSibling, ++j) {
			if (w.isVisible() && w.isStripeable_()) {
				
				for (;n.rows[j] && n.rows[j].id != w.uuid;++j);

				jq(n.rows[j])[even ? 'removeClass' : 'addClass'](scOdd);
				w.fire("onStripe");
				even = !even;
			}
		}
		this._shallStripe = false;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (_isPE() && child.$instanceof(zkex.grid.Group))
			this._groupsInfo.push(child);
		this._syncStripe();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (_isPE() && child.$instanceof(zkex.grid.Group))
			this._groupsInfo.$remove(child);
		if (!this.childReplacing_)
			this._syncStripe();
	}
});
})();
zkreg('zul.grid.Rows');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tbody', this.domAttrs_() , '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tbody>');	
}

;zkmld(zk._p.p.Rows,zk._m);

zul.grid.Foot = zk.$extends(zul.Widget, {
	
	getGrid: function () {
		return this.parent;
	},
	getZclass: function () {
		return this._zclass == null ? "z-foot" : _zclass;
	},
	
	setVflex: function (v) { 
		v = false;
		this.$super(zul.grid.Foot, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(zul.grid.Foot, 'setHflex', v);
	}
});
zkreg('zul.grid.Foot');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Foot,zk._m);

zul.grid.Footer = zk.$extends(zul.LabelImageWidget, {
	_span: 1,

	$define: {
		
		
		span: function (v) {
			var n = this.$n();
			if (n) n.colSpan = v;
		}
	},
	
	getGrid: function () {
		return this.parent ? this.parent.parent : null;
	},
	
	getColumn: function () {
		var grid = this.getGrid();
		if (grid) {
			var cs = grid.columns;
			if (cs)
				return cs.getChildAt(this.getChildIndex());
		}
		return null;
	},
	getZclass: function () {
		return this._zclass == null ? "z-footer" : this._zclass;
	},
	
	domAttrs_: function () {
		var head = this.getColumn(),
			added;
		if (head)
			added = head.getColAttrs();
		return this.$supers('domAttrs_', arguments)
			+ (this._span > 1 ? ' colspan="' + this._span + '"' : '')
			+ (added ? ' ' + added : '');
	}
});
zkreg('zul.grid.Footer',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass(), '-cnt">', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Footer,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.grid',1);zk.load('zul.wgt,zk.fmt',function(){zk._p=zkpi('zul.inp',true);try{



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
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.inp',1);zk.load('zk.fmt,zul.inp',function(){zk._p=zkpi('zul.db',true);try{
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
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.db',1);(function(){zk._p=zkpi('zul.utl',true);try{

zul.utl.Timer = zk.$extends(zk.Widget, {
	_running: true,
	_delay: 0,

	$define: {
    	
    	
		repeats: _zkf = function () {
			if (this.desktop) this._sync();
		},
		
		
		delay: _zkf,
		
		
		running: _zkf
	},
	
	play: function () {
		this.setRunning(true);
	},
	
	stop: function () {
		this.setRunning(false);
	},

	_sync: function () {
		this._stop();
		this._play();
	},
	_play: function () {
		if (this._running) {
			var fn = this.proxy(this._tmfn);
			if (this._repeats)
				this._iid = setInterval(fn, this._delay);
			else
				this._tid = setTimeout(fn, this._delay);
		}
	},
	_stop: function () {
		var id = this._iid;
		if (id) {
			this._iid = null;
			clearInterval(id)
		}
		id = this._tid;
		if (id) {
			this._tid = null;
			clearTimeout(id);
		}
	},
	_tmfn: function () {
		if (!this._repeats) this._running = false;
		this.fire('onTimer', null, {ignorable: true});
	},

	
	redraw: function () {
	},
	bind_: function () {
		this.$supers(zul.utl.Timer, 'bind_', arguments);
		if (this._running) this._play();
	},
	unbind_: function () {
		this._stop();
		this.$supers(zul.utl.Timer, 'unbind_', arguments);
	}
});

zkreg('zul.utl.Timer');




zul.utl.Iframe = zk.$extends(zul.Widget, {
	_scrolling: "auto",

	$define: {
		src: function (v) {
			var n = this.$n();
			if (n) n.src = v || '';
		},
		
		
		scrolling: function (v) {
			if (!v) this._scrolling = v = "auto";
			var n = this.$n();
			if (n) {
				if (zk.ie || zk.safari)
					this.rerender();
				else
					n.scrolling = v;
			}
		},
		
		
		align: function (v) {
			var n = this.$n();
			if (n) n.align = v || '';
		},
		
		
		name: function (v) {
			var n = this.$n();
			if (n) n.name = v || '';
		},
		
		
		autohide: function (v) {
			var n = this.$n();
			if (n) jq(n).attr('z_autohide', v);
		}
	},
	
	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments)
				+ ' src="' + (this._src || '') + '" frameborder="0"',
			v = this._scrolling;
		if ("auto" != v)
			attr += ' scrolling="' + ('true' == v ? 'yes': 'false' == v ? 'no': v) + '"';
		if (v = this._align) 
			attr += ' align="' + v + '"';
		if (v = this._name) 
			attr += ' name="' + v + '"';
		if (v = this._autohide) 
			attr += ' z_autohide="' + v + '"';
		return attr;
	}
});

zkreg('zul.utl.Iframe');zk._m={};
zk._m['default']=
function (out) {
	out.push('<iframe', this.domAttrs_(), '>', '</iframe>');
}
;zkmld(zk._p.p.Iframe,zk._m);
}finally{zk.setLoaded(zk._p.n);}})();zk.load('zul.mesh',function(){zk._p=zkpi('zul.sel',true);try{



(function() {
	function _shallIgnore(evt) {
		return !evt.domTarget || !evt.target.canActivate()
		|| (jq.nodeName(evt.domTarget, "input", "textarea",
			"button", "select", "option") && !evt.target.$instanceof(zul.sel.SelectWidget))
		|| (zk.isLoaded('zul.wgt') && evt.target.$instanceof(zul.wgt.Button, zul.wgt.Toolbarbutton));
	}
	function _beforeChildKey(wgt, evt) {
		return zAu.processing() || _shallIgnore(evt)
			|| (!wgt._focusItem && !wgt.getSelectedItem());
	}
	function _afterChildKey(evt) {
		switch (evt.data.keyCode) {
		case 33: 
		case 34: 
		case 38: 
		case 40: 
		case 37: 
		case 39: 
		case 32: 
		case 36: 
		case 35: 
			evt.stop();
			return false;
		}
		return true;
	}

	function _updHeaderCM(box) { 
		if (--box._nUpdHeaderCM <= 0 && box.desktop && box._headercm && box._multiple) {
			var zcls = zk.Widget.$(box._headercm).getZclass() + '-img-seld',
				$headercm = jq(box._headercm);
			var checked;
			for (var it = box.getBodyWidgetIterator(), w; (w = it.next());) 
				if (w.isVisible() && !w.isDisabled() && !w.isSelected()) {
					checked = false;
					break;
				} else
					checked = true;

			$headercm[checked ? "addClass": "removeClass"](zcls);
		}
	}

var SelectWidget =

zul.sel.SelectWidget = zk.$extends(zul.mesh.MeshWidget, {
	_rows: 0,
	$init: function () {
		this.$supers('$init', arguments);
		this._selItems = [];
	},
	$define: {
		
		
		rows: function (rows) {
			var n = this.$n();
			if (n) {
				n._lastsz = null;
				this.onSize();
			}
		},
		
		
		checkmark: function (checkmark) {
			if (this.desktop)
				this.rerender();
		},
		
		
		multiple: function (multiple) {
			if (!this._multiple && this._selItems.length) {
				var item = this.getSelectedItem();
				for (var it; (it = this._selItems.pop());) 
					if (it != item) {
						if (!this._checkmark)
							it._setSelectedDirectly(false);
						else it._selected = false;
					}
					
				this._selItems.push(item);
			}
			if (this._checkmark && this.desktop)
				this.rerender();
		},
		
		
		selectedIndex: [
			function (v) {
				return v < -1 || (!v && v !== 0) ? -1 : v;
			},
			function() {
				var selected = this._selectedIndex;
				this.clearSelection();
				this._selectedIndex = selected;
				if (selected > -1) {
					var w;
					for (var it = this.getBodyWidgetIterator(); selected-- >=0;)
						w = it.next();
					if (w) {
						this._selectOne(w, false);
						zk(w).scrollIntoView(this.ebody);
					}						
				}
			}
		],
		
		
		name: function () {
			if (this.destkop) this.updateFormData();	
		}
	},
	setChgSel: function (val) { 
		var sels = {};
		for (var j = 0;;) {
			var k = val.indexOf(',', j),
				s = (k >= 0 ? val.substring(j, k): val.substring(j)).trim();
			if (s) sels[s] = true;
			if (k < 0) break;
			j = k + 1;
		}
		for (var it = this.getBodyWidgetIterator(), w; (w = it.next());)
			this._changeSelect(w, sels[w.uuid] == true);
	},
	updateFormData: function () {
		if (this._name) {
			if (!this.efield) 
				this.efield = jq(this.$n()).append('<div style="display:none;"></div>').find('> div:last-child')[0];
			
			jq(this.efield).children().remove();
			
			
			var data = [],
				tmp = '<input type="hidden" name="' + this._name + '" value="';
			for (var i = 0, j = this._selItems.length; i < j; i++)
				data.push(tmp, this._selItems[i].getValue(), '"/>');
				
			jq(this.efield).append(data.join(''));
		} else if (this.efield) {
			jq(this.efield).remove();
			this.efield = null;
		}
	},
	
	setSelectedItem: function (item) {
		if (!item)
			this.clearSelection();
		else if (item = zk.Widget.$(item)) {
			this._selectOne(item, false);
			zk(item).scrollIntoView(this.ebody);
		}
	},
	
	getSelectedItem: function () {
		return this._selItems[0];
	},
	
	getSelectedItems: function () {
		
		return this._selItems.$clone();
	},
	setHeight: function (height) {
		if (!this._nvflex && this._height != height) {
			this._height = height;
			var n = this.$n();
			if (n) {
				n.style.height = height || '';
				this.onSize();
			}
		}
	},
	setVflex: function(v) {
		this.$supers('setVflex', arguments);
		if (this.desktop) this.onSize();
	},
	setHflex: function(v) {
		this.$supers('setHflex', arguments);
		if (this.desktop) this.onSize();
	},
	
	_calcSize: function () {
		var anchor, oldCSS;
		
		
		if (zk.ie8) {
			anchor = this.$n('a');
			oldCSS = anchor.style.display;
			anchor.style.display = "none";
		}
		
		
		if (zk.ie)
			this._syncFocus(this._focusItem);
			
		this._calcHgh();
		
		
		
		
		
		var n = this.$n(),
			wd = n.style.width;
		if (!wd || wd == "auto" || wd.indexOf('%') >= 0) {
			wd = zk(n).revisedWidth(n.offsetWidth);
			if (wd < 0) wd = 0;
			if (wd) wd += "px";
		}
		if (wd) {
			this.ebody.style.width = wd;
			if (this.ehead) this.ehead.style.width = wd;
			if (this.efoot) this.efoot.style.width = wd;
		}

		
		if (zk.safari)
			this.$n("a").style.display = 'none';
		
		
		var tblwd = this.ebody.clientWidth;
		
		if (zk.safari)
			this.$n("a").style.display = '';
		
		if (zk.ie) {
			if (this.eheadtbl &&
			this.eheadtbl.offsetWidth !=
			this.ebodytbl.offsetWidth) 
				this.ebodytbl.style.width = ""; 
			if (tblwd && (zk.ie8 || this.ebody.offsetWidth == this.ebodytbl.offsetWidth) &&
			this.ebody.offsetWidth - tblwd > 11) { 
				if (--tblwd < 0) 
					tblwd = 0;
				this.ebodytbl.style.width = tblwd + "px";
			}
		}
		if (this.ehead) {
			if (tblwd) this.ehead.style.width = tblwd + 'px';
			if (this.isSizedByContent() && this.ebodyrows && this.ebodyrows.length)
				this.$class._adjHeadWd(this);
			else if (tblwd && this.efoot) this.efoot.style.width = tblwd + 'px';
		} else if (this.efoot) {
			if (tblwd) this.efoot.style.width = tblwd + 'px';
			if (this.efoottbl.rows.length && this.ebodyrows && this.ebodyrows.length)
				this.$class.cpCellWidth(this);
		}
		
		
		if (this._hflexsz === undefined && this._hflex == 'min' && this._width === undefined && n.offsetWidth > this.ebodytbl.offsetWidth) {
			n.style.width = this.ebodytbl.offsetWidth + 'px';
			this._hflexsz = n.offsetWidth;
		}
		
		n._lastsz = {height: n.offsetHeight, width: n.offsetWidth}; 

		
		if (zk.ie8)
			anchor.style.display = oldCSS;
	},
	_calcHgh: function () {
		var rows = this.ebodyrows,
			n = this.$n(),
			hgh = n.style.height,
			isHgh = hgh && hgh != "auto" && hgh.indexOf('%') < 0;
		if (isHgh) {
			hgh = zk.parseInt(hgh);
			if (hgh) {
				hgh -= this._headHgh(0);
				if (hgh < 20) hgh = 20;
				var sz = 0;
				l_out:
				for (var h, j = 0, rl = rows.length; j < rl; ++sz, ++j) {
					
					var r;
					for (;; ++j) {
						if (j >= rl) break l_out;
						r = rows[j];
						if (zk(r).isVisible()) break;
					}

					var $r = zk(r);
					h = $r.offsetTop() + $r.offsetHeight();
					if (h >= hgh) {
						if (h > hgh + 2) ++sz; 
						break;
					}
				}
				sz = Math.ceil(sz && h ? (hgh * sz)/h: hgh/this._headHgh(20));

				this._visibleRows(sz);

                hgh -= (this.efoot ? this.efoot.offsetHeight : 0);
                this.ebody.style.height = (hgh < 0 ? 0 : hgh) + "px";

				
				if (zk.ie && this.ebody.offsetHeight) {} 
				
				
				return; 
			}
		}

		var nVisiRows = 0, nRows = this.getRows(), lastVisiRow, firstVisiRow, midVisiRow;
		for (var j = 0, rl = rows.length; j < rl; ++j) { 
			var r = rows[j];
			if (zk(r).isVisible()) {
				++nVisiRows;
				if (!firstVisiRow) firstVisiRow = r;

				if (nRows === nVisiRows) {
					midVisiRow = r;
					break;
					
					
				}
				lastVisiRow = r;
			}
		}

		hgh = 0;
		var diff = 2;
		if (!nRows) {
			if (this.isVflex()) {
				hgh = this._vflexSize(n.style.height);

				if (zk.ie && this._cachehgh != hgh) {
					hgh -= 1; 
					this._cachehgh = hgh;
				}
				if (hgh < 25) hgh = 25;

				var rowhgh = firstVisiRow ? zk(firstVisiRow).offsetHeight(): null;
				if (!rowhgh) rowhgh = this._headHgh(20);

				nRows = Math.round((hgh - diff)/ rowhgh);
			}
			this._visibleRows(nRows);
		}

		if (nRows) {
			if (!hgh) {
				if (!nVisiRows) hgh = this._headHgh(20) * nRows;
				else {
					var tpad = this.$n('tpad'),
						tpadhgh = (tpad ? tpad.offsetHeight : 0);
					if (nRows <= nVisiRows) {
						var $midVisiRow = zk(midVisiRow);
						hgh = $midVisiRow.offsetTop() + $midVisiRow.offsetHeight() - tpadhgh;
					} else {
						var $lastVisiRow = zk(lastVisiRow);
						hgh = $lastVisiRow.offsetTop() + $lastVisiRow.offsetHeight() - tpadhgh;
						hgh = Math.ceil((nRows * hgh) / nVisiRows);
					}
				}
				if (zk.ie) hgh += diff; 
			}

			this.ebody.style.height = hgh + "px";

			
			if (zk.ie && this.ebody.offsetHeight) {} 
			
			
			
			
			
			var h = n.style.height;
			if (!h || h == "auto") {
				
				
				
				if (zk.ie && !zk.ie8 && this.ebodytbl) {
					var ow = this.ebody.offsetWidth,
						cw = this.ebody.clientWidth,
						w = ow - cw;
					if (cw && w > 11) {
						if (ow == this.ebodytbl.offsetWidth)
							this.ebodytbl.style.width = jq.px0(zk(this.ebodytbl).revisedWidth(this.ebodytbl.offsetWidth - w));
					}
				}
				
				var oh = this.ebody.offsetHeight,
					ch = this.ebody.clientHeight;
				
				
				h = oh - ((!zk.safari || ch >= 0) ? ch : 0); 
				
				
				if (ch && h > 11)
					this.ebody.style.height = hgh + jq.scrollbarWidth() + "px";
			}
		} else {
			
			
			hgh = n.style.height;
			if (zk.ie && (!hgh || hgh == "auto")
			&& this.ebody.offsetWidth - this.ebody.clientWidth > 11) {
				if (!nVisiRows) this.ebody.style.height = ""; 
				else this.ebody.style.height =
						(this.ebody.offsetHeight * 2 - this.ebody.clientHeight) + "px";
			} else {
				this.ebody.style.height = "";
			}
			
			
			if (!hgh || hgh == "auto") {
				var oh = this.ebody.offsetHeight,
					ch = this.ebody.clientHeight;
				
				
				hgh = oh - ((!zk.safari || ch >= 0) ? ch : 0);
				
				
				if (ch && hgh > 11)
					this.ebody.style.height = oh + jq.scrollbarWidth() + "px";
			}
		}
	},
	
	_visibleRows: function (v) {
		if ("number" == typeof v) {
			this._visiRows = v;
		} else
			return this.getRows() || this._visiRows || 0;
	},
	
	_headHgh: function (defVal) {
		var hgh = this.ehead ? this.ehead.offsetHeight : 0;
		if (this.paging) {
			var pgit = this.$n('pgit'),
				pgib = this.$n('pgib');
			if (pgit) hgh += pgit.offsetHeight;
			if (pgib) hgh += pgib.offsetHeight;
		}
		return hgh ? hgh: defVal;
	},
	
	indexOfItem: function (item) {
		if (item.getMeshWidget() == this) {
			for (var i = 0, it = this.getBodyWidgetIterator(), w; (w = it.next()); i++)
				if (w == item) return i;
		}
		return -1;
	},
	toggleItemSelection: function (item) {
		if (item.isSelected()) this._removeItemFromSelection(item);
		else this._addItemToSelection(item);
		this.updateFormData();
	},
	
	selectItem: function (item) {
		if (!item)
			this.setSelectedIndex(-1);
		else if (this._multiple || !item.isSelected())
			this.setSelectedIndex(this.indexOfItem(item));
	},
	_addItemToSelection: function (item) {
		if (!item.isSelected()) {
			if (!this._multiple) {
				this._selectedIndex = this.indexOfItem(item);
			} else {
				var index = this.indexOfItem(item);
				if (index < this._selectedIndex || this._selectedIndex < 0) {
					this._selectedIndex = index;
				}
				item._setSelectedDirectly(true);
			}
			this._selItems.push(item);
		}
	},
	_removeItemFromSelection: function (item) {
		if (item.isSelected()) {
			if (!this._multiple) {
				this.clearSelection();
			} else {
				item._setSelectedDirectly(false);
				this._selItems.$remove(item);				
			}
		}
	},
	
	clearSelection: function () {
		if (this._selItems.length) {
			for(var item;(item = this._selItems.pop());)
				item._setSelectedDirectly(false);
			this._selectedIndex = -1;
			this._updHeaderCM();
		}
	},
	
	focus: function (timeout) {
		var btn;
		if (this.isVisible() && this.canActivate({checkOnly:true})
		&& (btn = this.$n('a'))) {
			if (this._focusItem) {
				for (var it = this.getBodyWidgetIterator(), w; (w = it.next());)
					if (this._isFocus(w)) {
						w.focus();
						break;
					}
			}
			zk(btn).focus(timeout);
			return true;
		}
		return false;
	},
	bind_: function () {
		this.$supers(SelectWidget, 'bind_', arguments);
		var btn = this.$n('a');
		if (btn)
			this.domListen_(btn, 'onFocus', 'doFocus_')
				.domListen_(btn, 'onKeyDown')
				.domListen_(btn, 'onBlur', 'doBlur_');
		this.updateFormData();
		this._updHeaderCM();
	},
	unbind_: function () {
		var btn = this.$n('a');
		if (btn)
			this.domUnlisten_(btn, 'onFocus', 'doFocus_')
				.domUnlisten_(btn, 'onKeyDown')
				.domUnlisten_(btn, 'onBlur', 'doBlur_');
		this.$supers(SelectWidget, 'unbind_', arguments);
	},
	clearCache: function () {
		this.$supers('clearCache', arguments);
		this.efield = null;
	},
	doFocus_: function (evt) {
		var row	= this._focusItem || this._lastSelectedItem;
		if (row) row._doFocusIn();
		this.$supers('doFocus_', arguments);
	},
	doBlur_: function (evt) {
		if (this._focusItem) {
			this._lastSelectedItem = this._focusItem;
			this._focusItem._doFocusOut();
		}
		this._focusItem = null;
		this.$supers('doBlur_', arguments);
	},
	
	shallIgnoreSelect_: function (evt) {
		
	},
	_doItemSelect: function (row, evt) { 
		
		
		
		
		if (zk.dragging || _shallIgnore(evt))
			return;
			
		if (this.shallIgnoreSelect_(evt))
			return;

		var	checkmark = evt.domTarget == row.$n('cm');
		if (checkmark) {
			
			this._syncFocus(row);
			
			if (this.isMultiple()) {
				this._toggleSelect(row, !row.isSelected(), evt);
			} else {
				this._select(row, evt);
			}
		} else {
		
		
		
			if ((zk.gecko || zk.safari) && row.isListen('onDoubleClick')) {
				var now = zUtl.now(), last = row._last;
				row._last = now;
				if (last && now - last < 900)
					return; 
			}
			this._syncFocus(row);
			if (this.isMultiple()) {
				if (evt.data.shiftKey)
					this._selectUpto(row, evt);
				else if (evt.data.ctrlKey)
					this._toggleSelect(row, !row.isSelected(), evt);
				else 
					this._select(row, evt);
			} else
				this._select(row, evt);

			
			row.focus();
			
			
			
		}
	},
	
	doKeyDown_: function (evt) {
		if (!_shallIgnore(evt)) {

		
		
		
		
			switch (evt.data.keyCode) {
			case 33: 
			case 34: 
			case 38: 
			case 40: 
			case 37: 
			case 39: 
			case 32: 
			case 36: 
			case 35: 
				if (!jq.nodeName(evt.domTarget, "a"))
					this.focus();
				if (evt.domTarget == this.$n('a')) {
					if (evt.target == this) 
						evt.target = this._focusItem || this.getSelectedItem() || this;
					this._doKeyDown(evt);
				}
				evt.stop();
				return false;
			}
		}

		if (!zk.gecko3 || !jq.nodeName(evt.domTarget, "input", "textarea"))
			zk(this.$n()).disableSelection();

		
		if (evt.target == this) 
			evt.target = this._focusItem || this.getSelectedItem() || this;
		this.$supers('doKeyDown_', arguments);
	},
	doKeyUp_: function (evt) {
		zk(this.$n()).enableSelection();
		evt.stop({propagation: true});
		this.$supers('doKeyUp_', arguments);
	},
	_doKeyDown: function (evt) { 
		if (_beforeChildKey(this, evt))
			return true;

		var row = this._focusItem || this.getSelectedItem(),
			data = evt.data,
			shift = data.shiftKey, ctrl = data.ctrlKey;
		if (shift && !this.isMultiple())
			shift = false; 

		var endless = false, step, lastrow;
		
		
		if (zk.safari && typeof data.keyCode == "string")
			data.keyCode = zk.parseInt(data.keyCode);
		switch (data.keyCode) {
		case 33: 
		case 34: 
			step = this._visibleRows();
			if (step == 0) step = 20;
			if (data.keyCode == 33)
				step = -step;
			break;
		case 38: 
		case 40: 
			step = data.keyCode == 40 ? 1: -1;
			break;
		case 32: 
			if (this.isMultiple()) this._toggleSelect(row, !row.isSelected(), evt);
			else this._select(row, evt);
			break;
		case 36: 
		case 35: 
			step = data.keyCode == 35 ? 1: -1;
			endless = true;
			break;
		case 37: 
			this._doLeft(row);
			break;
		case 39: 
			this._doRight(row);
			break;
		}

		if (step) {
			if (shift) this._toggleSelect(row, true, evt);
			var nrow = row.$n();
			for (;nrow && (nrow = step > 0 ? nrow.nextSibling: nrow.previousSibling);) {
				var r = zk.Widget.$(nrow);
				if (r.$instanceof(zul.sel.Treerow))
					r = r.parent;
				if (!r.isDisabled()) {
					if (shift) this._toggleSelect(r, true, evt);

					if (zk(nrow).isVisible()) {
						if (!shift) lastrow = r;
						if (!endless) {
							if (step > 0) --step;
							else ++step;
							if (step == 0) break;
						}
					}
				}
			}
		}
		if (lastrow) {
			if (ctrl) this._focus(lastrow);
			else this._select(lastrow, evt);
			this._syncFocus(lastrow);
			zk(lastrow).scrollIntoView(this.ebody); 
		}

		return _afterChildKey(evt);
	},
	_doKeyUp: function (evt) { 
		return _beforeChildKey(this, evt) || _afterChildKey(evt);
	},
	_doLeft: zk.$void,
	_doRight: zk.$void,
	
	_syncFocus: function (row) {
		var focusEl = this.$n('a'),
			offs, n;
		if (row && (n = row.$n())) {
			offs = zk(n).revisedOffset();
			offs = this._toStyleOffset(focusEl, offs[0] + this.ebody.scrollLeft, offs[1]);
		} else
			offs = [0, 0];
		focusEl.style.top = offs[1] + "px";
		focusEl.style.left = offs[0] + "px";
	},
	_toStyleOffset: function (el, x, y) {
		var ofs1 = zk(el).revisedOffset(),
			x2 = zk.parseInt(el.style.left), y2 = zk.parseInt(el.style.top);;
		return [x - ofs1[0] + x2, y  - ofs1[1] + y2];
	},
	
	_select: function (row, evt) {
		if (this._selectOne(row, true)) {
			
			this.fireOnSelect(row, evt);
		}
	},
	
	_selectUpto: function (row, evt) {
		if (row.isSelected()) {
			this._focus(row);
			return; 
		}

		var focusfound = false, rowfound = false;
		for (var it = this.getBodyWidgetIterator(), w; (w = it.next());) {
			if (w.isDisabled()) continue; 
			if (focusfound) {
				this._changeSelect(w, true);
				if (w == row)
					break;
			} else if (rowfound) {
				this._changeSelect(w, true);
				if (this._isFocus(w) || w == this._lastSelectedItem)
					break;
			} else {
				rowfound = w == row;
				focusfound = this._isFocus(w) || w == this._lastSelectedItem;
				if (rowfound || focusfound) {
					this._changeSelect(w, true);
					if (rowfound && focusfound)
						break;
				}
			}
		}

		this._focus(row);
		this.fireOnSelect(row, evt);
	},
	
	setSelectAll: _zkf = function (notify, evt) {
		for (var it = this.getBodyWidgetIterator(), w; (w = it.next());)
			if (!w.isDisabled())
				this._changeSelect(w, true);
		if (notify && evt !== true)
			this.fireOnSelect(this.getSelectedItem(), evt);
	},
	
	selectAll: _zkf,
	
	_selectOne: function (row, toFocus) {
		var selItem = this.getSelectedItem();
		if (this.isMultiple()) {
			if (row && toFocus) this._unsetFocusExcept(row);
			var changed = this._unsetSelectAllExcept(row);
			if (!changed && row && selItem == row) {
				if (toFocus) this._setFocus(row, true);
				return false; 
			}
		} else {
			if (selItem) {
				if (selItem == row) {
					if (toFocus) this._setFocus(row, true);
					return false; 
				}
				this._changeSelect(selItem, false);
				if (row)
					if(toFocus) this._setFocus(selItem, false);
			}
			if (row && toFocus) this._unsetFocusExcept(row);
		}
		
		if (row) {
			this._changeSelect(row, true);
			if (toFocus) this._setFocus(row, true);
		}
		return true;
	},
	
	_toggleSelect: function (row, toSel, evt) {
		if (!this.isMultiple()) {
			var old = this.getSelectedItem();
			if (row != old && toSel)
				this._changeSelect(row, false);
		}
		
		this._changeSelect(row, toSel);
		this._focus(row);

		
		this.fireOnSelect(row, evt);
	},
	fireOnSelect: function (reference, evt) {
		var data = [];
		
		for (var it = this.getSelectedItems(), j = it.length; j--;)
			if (it[j].isSelected())
				data.push(it[j]);
		var edata = evt.data, keep;
		if (this._multiple)
			keep = edata.ctrlKey || edata.shiftKey || (evt.domTarget.id ? evt.domTarget.id.endsWith('-cm') : false);

		this.fire('onSelect', zk.copy({items: data, reference: reference, clearFirst: !keep}, edata));
	},
	
	_focus: function (row) {
		if (this.canActivate({checkOnly:true})) {
			this._unsetFocusExcept(row);
			this._setFocus(row, true);
		}
	},
	
	_changeSelect: function (row, toSel) {
		var changed = row.isSelected() != toSel;
		if (changed) {
			row.setSelected(toSel);
			row._toggleEffect(true);
		}
		return changed;
	},
	_isFocus: function (row) {
		return this._focusItem == row;
	},
	
	_setFocus: function (row, toFocus) {
		var changed = this._isFocus(row) != toFocus;
		if (changed) {
			if (toFocus) {
				if (!row.focus()) {
					this.focus();
				}
				if (!this.paging && zk.gecko) 
					this.fireOnRender(5);
					
			}
		}
		if (!toFocus)
			row._doFocusOut();
		return changed;
	},
	
	_unsetSelectAllExcept: function (row) {
		var changed = false;
		for (var it = this.getSelectedItems(), j = it.length; j--;) {
			if (it[j] != row && this._changeSelect(it[j], false))
				changed = true;
		}
		return changed;
	},
	
	_unsetFocusExcept: function (row) {
		if (this._focusItem && this._focusItem != row) 
			this._setFocus(this._focusItem, false)
		else
			this._focusItem = null;
	},
	_updHeaderCM: function () { 
		if (this._headercm && this._multiple) {
			var box = this, v;
			this._nUpdHeaderCM = (v = this._nUpdHeaderCM) > 0 ? v + 1: 1;
			setTimeout(function () {_updHeaderCM(box);}, 100); 
		}
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (this.desktop && child.$instanceof(zul.sel.ItemWidget) && child.isSelected())
			this._syncFocus(child);
	}
});

})();



zul.sel.ItemWidget = zk.$extends(zul.Widget, {
	_checkable: true,
	$define: {
    	
    	
		checkable: function () {
			if (this.desktop)
				this.rerender();
		},
		
		
		disabled: function () {
			if (this.desktop)
				this.rerender();
		},
		
		
		value: null
	},
	
	setSelected: function (selected) {
		if (this._selected != selected) {
			var box = this.getMeshWidget();
			if (box)
				box.toggleItemSelection(this);
				
			this._setSelectedDirectly(selected);
		}
	},
	_setSelectedDirectly: function (selected) {
		var n = this.$n();
		if (n) {
			jq(n)[selected ? 'addClass' : 'removeClass'](this.getZclass() + '-seld');
			this._updHeaderCM();
		}
		this._selected = selected;
	},
	
	getLabel: function () {
		return this.firstChild ? this.firstChild.getLabel() : null; 
	},
	
	isSelected: function () {
		return this._selected;
	},
	
	isStripeable_: function () {
		return true;
	},
	
	getMeshWidget: function () {
		return this.parent;
	},
	_getVisibleChild: function (row) {
		for (var i = 0, j = row.cells.length; i < j; i++)
			if (zk(row.cells[i]).isVisible()) return row.cells[i];
		return row;
	},
	
	setVisible: function (visible) {
		if (this.isVisible() != visible) {
			this.$supers('setVisible', arguments);
			if (this.isStripeable_()) {
				var p = this.getMeshWidget();
				if (p) p.stripe();
			}
		}
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass(),
				added = this.isDisabled() ? zcls + '-disd' : this.isSelected() ? zcls + '-seld' : '';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	_toggleEffect: function (undo) {
		var n = this.$n(),
			zcls = this.getZclass();
		if (undo) {
			jq(n).removeClass(zcls + "-over-seld")
				.removeClass(zcls + "-over");
		} else {
			var $n = jq(n);
			$n.addClass($n.hasClass(zcls + "-seld") ? zcls + "-over-seld" : zcls + "-over");
		}
	},
	focus: function (timeout) {
		var mesh = this.getMeshWidget();
			mesh._focusItem = this;
		if (this.isVisible() && this.canActivate({checkOnly: true})) {
			this._doFocusIn();
			if (zk.currentFocus != mesh.$n('a'))
				zk(mesh.$n('a')).focus(timeout);
		}
		return false;
	},
	_doFocusIn: function () {
		var n = this.$n();
		if (n)
			jq(this._getVisibleChild(n)).addClass(this.getZclass() + "-focus");
		
		if (n = this.getMeshWidget())
			n._focusItem = this;			
	},
	_doFocusOut: function () {
		var n = this.$n();
		if (n) {
			var zcls = this.getZclass();
			jq(n).removeClass(zcls + "-focus");
			jq(n.cells).removeClass(zcls + "-focus");
		}
	},
	_updHeaderCM: function (bRemove) { 
		var box = this.getMeshWidget();
		if (box && box._headercm && box._multiple) {
			if (bRemove) {
				box._updHeaderCM();
				return;
			}

			var zcls = zk.Widget.$(box._headercm).getZclass() + '-img-seld',
				$headercm = jq(box._headercm);

			if (!this.isSelected())
				$headercm.removeClass(zcls);
			else if (!$headercm.hasClass(zcls))
				box._updHeaderCM(); 
		}
	},
	
	beforeParentChanged_: function (newp) {
		if (!newp) 
			this._updHeaderCM(true);
		this.$supers("beforeParentChanged_", arguments);
	},
	
	onParentChanged_: function () {
		if (this.parent) 
			this._updHeaderCM();
		this.$supers("onParentChanged_", arguments);
	},

	
	doSelect_: function(evt) {
		if (this.isDisabled()) return;
		if (!evt.itemSelected) {
			this.getMeshWidget()._doItemSelect(this, evt);
			evt.itemSelected = true;
		}
		this.$supers('doSelect_', arguments);
	},
	doMouseOver_: function(evt) {
		if (this.isDisabled()) return;
		this._toggleEffect();
		evt.stop();
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function(evt) {
		if (this.isDisabled() || (zk.ie &&
				jq.isAncestor(this.$n(), evt.domEvent.relatedTarget || evt.domEvent.toElement)))
			return;
			
		this._toggleEffect(true);
		evt.stop({propagation: true});
		this.$supers('doMouseOut_', arguments);
	},
	doKeyDown_: function (evt) {
		var mate = this.getMeshWidget();
		if (!zk.gecko3 || !jq.nodeName(evt.domTarget, "input", "textarea"))
			zk(mate.$n()).disableSelection();
		mate._doKeyDown(evt);
		this.$supers('doKeyDown_', arguments);
	},
	doKeyUp_: function (evt) {
		var mate = this.getMeshWidget();
		zk(mate.$n()).enableSelection();
		mate._doKeyUp(evt);
		this.$supers('doKeyUp_', arguments);
	}
});

(function () {

	var _inInsertBefore;
	function _isPE() {
		return zk.feature.pe && zk.isLoaded('zkex.sel');
	}

var Listbox =

zul.sel.Listbox = zk.$extends(zul.sel.SelectWidget, {
	_nrows: 0,
	$init: function () {
		this.$supers('$init', arguments);
		this._groupsInfo = [];
	},
	
	getGroupCount: function () {
		return this._groupsInfo.length;
	},
	
	getGroups: function () {
		return this._groupsInfo.$clone();
	},
	
	hasGroup: function () {
		return this._groupsInfo.length;
	},
	
	nextItem: function (p) {
		if (p)
			while ((p = p.nextSibling)
			&& !p.$instanceof(zul.sel.Listitem))
				;
		return p;
	},
	
	previousItem: function (p) {
		if (p)
			while ((p = p.previousSibling)
			&& !p.$instanceof(zul.sel.Listitem))
				;
		return p;
	},
	
	getOddRowSclass: function () {
		return this._scOddRow == null ? this.getZclass() + "-odd" : this._scOddRow;
	},
	
	setOddRowSclass: function (scls) {
		if (!scls) scls = null;
		if (this._scOddRow != scls) {
			this._scOddRow = scls;
			var n = this.$n();
			if (n && this.rows)
				this.stripe();
		}
		return this;
	},
	
	inSelectMold: function () {
		return "select" == this.getMold();
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(Listbox, 'bind_', arguments); 
		zWatch.listen({onResponse: this});
		this._shallStripe = true;
		var w = this;
		after.push(zk.booted ? function(){setTimeout(function(){w.onResponse();},0)}: this.proxy(this.stripe));
	},
	unbind_: function () {
		zWatch.unlisten({onResponse: this});
		this.$supers(Listbox, 'unbind_', arguments);
	},
	onResponse: function () {
		if (this.desktop && this._shallStripe) {
			this.stripe();
			if (this._shallSize)
				this.$supers('onResponse', arguments);
		}
	},
	_syncStripe: function () {
		this._shallStripe = true;
		if (!this.inServer && this.desktop)
			this.onResponse();
	},
	
	stripe: function () {
		var scOdd = this.getOddRowSclass();
		if (!scOdd) return;
		var odd = this._offset & 1;
		for (var j = 0, even = !odd, it = this.getBodyWidgetIterator(), w; (w = it.next()); j++) {
			if (w.isVisible() && w.isStripeable_()) {
				jq(w.$n())[even ? 'removeClass' : 'addClass'](scOdd);
				even = !even;
			}
		}
		this._shallStripe = false;
		return this;
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		this._syncStripe();		
		return this;
	},

	
	getCaveNode: function () {
		return this.$n('rows') || this.$n('cave');
	},	
	insertChildHTML_: function (child, before, desktop) {
		if (before = before && (!child.$instanceof(zul.sel.Listitem) || before.$instanceof(zul.sel.Listitem)) ? before.getFirstNode_(): null)
			jq(before).before(child.redrawHTML_());
		else
			jq(this.getCaveNode()).append(child.redrawHTML_());
		child.bind(desktop);
	},
	getZclass: function () {
		return this._zclass == null ? "z-listbox" : this._zclass;
	},
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling,
		ignoreDom || (!this.z_rod && !child.$instanceof(zul.sel.Listitem)))) {
			this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child,
		ignoreDom || (!this.z_rod && !child.$instanceof(zul.sel.Listitem)))) {
			if (!this.insertingBefore_)
				this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom, stripe) {
		var noRerender;
		if (child.$instanceof(zul.sel.Listitem)) {
			if (_isPE() && child.$instanceof(zkex.sel.Listgroup))
				this._groupsInfo.push(child);
			if (!this.firstItem || !this.previousItem(child))
				this.firstItem = child;
			if (!this.lastItem || !this.nextItem(child))
				this.lastItem = child;
			++this._nrows;
			
			if (child.isSelected() && !this._selItems.$contains(child))
				this._selItems.push(child);
			noRerender = stripe = true;
		} else if (child.$instanceof(zul.sel.Listhead)) {
			this.listhead = child;
		} else if (child.$instanceof(zul.mesh.Paging)) {
			this.paging = child;
		} else if (child.$instanceof(zul.sel.Listfoot)) {
			this.listfoot = child;
		} else if (child.$instanceof(zul.mesh.Frozen)) {
			this.frozen = child;
		}

		if (!ignoreDom && !noRerender)
				return this.rerender();
		if (stripe)
			this._syncStripe();
		if (!ignoreDom)
			this._syncSize();
	},
	removeChild: function (child, ignoreDom) {
		if (this.$super('removeChild', child, ignoreDom)) {
			this._fixOnRemove(child, ignoreDom);
			return true;
		}
	},
	_fixOnRemove: function (child, ignoreDom) {
		var stripe;
		if (child == this.listhead)
			this.listhead = null;
		else if (child == this.paging)
			this.paging = null;
		else if (child == this.frozen)
			this.frozen = null;
		else if (child == this.listfoot)
			this.listfoot = null;
		else if (!child.$instanceof(zul.mesh.Auxhead)) {
			if (child == this.firstItem) {
				for (var p = this.firstChild, Listitem = zul.sel.Listitem;
				p && !p.$instanceof(Listitem); p = p.nextSibling)
					;
				this.firstItem = p;
			}
			if (child == this.lastItem) {
				for (var p = this.lastChild, Listitem = zul.sel.Listitem;
				p && !p.$instanceof(Listitem); p = p.previousSibling)
					;
				this.lastItem = p;
			}
			if (_isPE() && child.$instanceof(zkex.sel.Listgroup))
				this._groupsInfo.$remove(child);
			--this._nrows;
			
			if (child.isSelected())
				this._selItems.$remove(child);
			stripe = true;
		}

		if (!ignoreDom) {
			if (stripe) this._syncStripe();
			this._syncSize();
		}
	},
	onChildReplaced_: function (oldc, newc) {
		this.$supers('onChildReplaced_', arguments);
		if ((oldc != null && oldc.$instanceof(zul.sel.Listitem))
		|| (newc != null && newc.$instanceof(zul.sel.Listitem)))
			this._syncStripe();
		this._syncSize();
	},
	
	getHeadWidgetClass: function () {
		return zul.sel.Listhead;
	},
	
	itemIterator: _zkf = function () {
		return new zul.sel.ItemIter(this);
	},
	
	getBodyWidgetIterator: _zkf
});

zul.sel.ItemIter = zk.$extends(zk.Object, {
	
	$init: function (box) {
		this.box = box;
	},
	_init: function () {
		if (!this._isInit) {
			this._isInit = true;
			this.p = this.box.firstItem;
		}
	},
	 
	hasNext: function () {
		this._init();
		return this.p;
	},
	
	next: function () {
		this._init();
		var p = this.p;
		if (p) this.p = p.parent.nextItem(p);
		return p;
	}
});

})();

zkreg('zul.sel.Listbox');zk._m={};
zk._m['paging']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		wdAttr = innerWidth == '100%' ? ' width="100%"' : '',
		wdStyle =  innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos,
		tag = zk.ie || zk.gecko ? "a" : "button";

	out.push('<div', this.domAttrs_(), '>');

	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}

	if(this.listhead){
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
			'<table', wdAttr, zUtl.cellps0,
			' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');

	var hgh = this.getHeight();
	if (hgh) out.push(' style="overflow:hidden;height:', hgh, '"');
	else if (this.getRows() > 1) out.push(' style="overflow:hidden;height:"', this.getRows() * 15, 'px"');
	
	out.push('><table', wdAttr, zUtl.cellps0, ' id="', uuid, '-cave"');
	if (!this.isSizedByContent())
		out.push(' style="table-layout:fixed;', wdStyle,'"');		
	out.push('>');
	
	if(this.listhead)
		this.domFaker_(out, '-bdfaker', zcls);

	if (this.domPad_ && !inPaging)
		this.domPad_(out, '-tpad');
	out.push('<tbody id="',uuid,'-rows">');
	for (var item = this.firstItem; item; item = this.nextItem(item))
		item.redraw(out);
	out.push('</tbody>');
	if (this.domPad_ && !inPaging)
		this.domPad_(out, '-bpad');
	
	out.push('</table><', tag, ' id="', uuid,
		'-a" tabindex="-1" onclick="return false;" href="javascript:;" class="z-focus-a"></',
		tag, '>', "</div>");

	if (this.listfoot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
			'<table', wdAttr, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.listhead) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.listfoot.redraw(out);
		out.push('</table></div>');
	}

	if (this.frozen) {
		out.push('<div id="', uuid, '-frozen" class="', zcls, '-frozen">');
		this.frozen.redraw(out);
		out.push('</div>');
	}
	
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}
;zk._m['default']=[zk._p.p.Listbox,'paging'];zkmld(zk._p.p.Listbox,zk._m);
(function () {

	function _isPE() {
		return zk.feature.pe && zk.isLoaded('zkex.sel');
	}

zul.sel.Listitem = zk.$extends(zul.sel.ItemWidget, {
	
	getListbox: zul.sel.ItemWidget.prototype.getMeshWidget,
	
	getListgroup: function () {
		
		if (_isPE() && this.parent && this.parent.hasGroup())
			for (var w = this.previousSibling; w; w = w.previousSibling)
				if (w.$instanceof(zkex.sel.Listgroup)) return w;
				
		return null;
	},
	
	setLabel: function (val) {
		this._autoFirstCell().setLabel(val);
	},
	
	setImage: function (val) {
		this._autoFirstCell().setImage(val);
	},
	_autoFirstCell: function () {
		if (!this.firstChild)
			this.appendChild(new zul.sel.Listcell());
		return this.firstChild;
	},
	
	getZclass: function () {
		return this._zclass == null ? "z-listitem" : this._zclass;
	},
	domStyle_: function (no) {
		if (_isPE() && (this.$instanceof(zkex.sel.Listgroup) || this.$instanceof(zkex.sel.Listgroupfoot))
				|| (no && no.visible))
			return this.$supers('domStyle_', arguments);
			
		var style = this.$supers('domStyle_', arguments),
			group = this.getListgroup();
		return group && !group.isOpen() ? style + "display:none;" : style;
	},
	domClass_: function () {
		var cls = this.$supers('domClass_', arguments),
			list = this.getListbox();
		if (list && jq(this.$n()).hasClass(list = list.getOddRowSclass()))
			return cls + ' ' + list; 
		return cls;
	},
	replaceWidget: function (newwgt) {
		this._syncListitems(newwgt);
		this.$supers('replaceWidget', arguments);
	},
	_syncListitems: function (newwgt) {
		var list = this.getListbox();
		if (list) {
			if (list.firstItem.uuid == newwgt.uuid)
				list.firstItem = newwgt;
			if (list.lastItem.uuid == newwgt.uuid)
				list.lastItem = newwgt;
			if (this.isSelected()) {
				var items = list._selItems;
				if (items && items.$remove(this))
					items.push(newwgt);
			}
		}
	}
});
})();
zkreg('zul.sel.Listitem');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Listitem,zk._m);
(function () {

	function _isPE() {
		return zk.feature.pe && zk.isLoaded('zkex.sel');
	}	

zul.sel.Listcell = zk.$extends(zul.LabelImageWidget, {
	_colspan: 1,
	$define: {
    	
    	
		colspan: [
			function (colspan) {
				return colspan > 1 ? colspan: 1;
			},
			function () {
				var n = this.$n();
				if (n) n.colSpan = this._colspan;
			}]
	},
	setLabel: function () {
		this.$supers('setLabel', arguments);
		if (this.desktop) {
    		if (_isPE() && this.parent.$instanceof(zkex.sel.Listgroup))
    			this.parent.rerender();
    		else if (this.parent.$instanceof(zul.sel.Option))
    			this.getListbox().rerender(); 
		}
	},
	
	getListbox: function () {
		var p = this.parent;
		return p ? p.parent: null;
	},

	
	getZclass: function () {
		return this._zclass == null ? "z-listcell" : this._zclass;
	},
	getTextNode: function () {
		return jq(this.$n()).find('>div:first')[0];
	},
	
	getMaxlength: function () {
		var box = this.getListbox();
		if (!box) return 0;
		if (box.getMold() == 'select')
			return box.getMaxlength();
		var lc = this.getListheader();
		return lc ? lc.getMaxlength() : 0;
	},
	
	getListheader: function () {
		var box = this.getListbox();
		if (box && box.listhead) {
			var j = this.getChildIndex();
			if (j < box.listhead.nChildren)
				return box.listhead.getChildAt(j);
		}
		return null;
	},
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	},
	domContent_: function () {
		var s1 = this.$supers('domContent_', arguments),
			s2 = this._colHtmlPre();
		return s1 ? s2 ? s2 + '&nbsp;' + s1: s1: s2;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (_isPE() && (!no || !no.zclass) && (this.parent.$instanceof(zkex.sel.Listgroup)
			|| this.parent.$instanceof(zkex.sel.Listgroupfoot))) {
			var zcls = this.parent.getZclass();
			scls += ' ' + zcls + '-inner';
		}
		return scls;
	},
	_colHtmlPre: function () {
		var s = '',
			box = this.getListbox(),
			zcls = this.parent.getZclass();
		if (box != null && this.parent.firstChild == this) {
			if (_isPE() && this.parent.$instanceof(zkex.sel.Listgroup)) {
				s = '<span id="' + this.parent.uuid + '-img" class="' + zcls + '-img ' + zcls
					+ '-img-' + (this.parent._open ? 'open' : 'close') + '"></span>';
			}
				
			if (box.isCheckmark()) {
				var item = this.parent,
					chkable = item.isCheckable(),
					multi = box.isMultiple(),
					img = zcls + '-img';
				s += '<span id="' + item.uuid + '-cm" class="' + img + ' ' + img
					+ (multi ? '-checkbox' : '-radio');
				
				if (!chkable || item.isDisabled())
					s += ' ' + img + '-disd';
				
				s += '"';
				if (!chkable)
					s += ' style="visibility:hidden"';
					
				s += '></span>';
			}
			if (s) return s;
		}
		return (!this.getImage() && !this.getLabel() && !this.firstChild) ? "&nbsp;": '';
	},
	doMouseOver_: function(evt) {
		if (zk.gecko && (this._draggable || this.parent._draggable)
		&& !jq.nodeName(evt.domTarget, "input", "textarea")) {
			var n = this.$n();
			if (n) n.firstChild.style.MozUserSelect = "none";
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function(evt) {
		if (zk.gecko && (this._draggable || this.parent._draggable)) {
			var n = this.$n();
			if (n) n.firstChild.style.MozUserSelect = "none";
		}
		this.$supers('doMouseOut_', arguments);
	},
	domAttrs_: function () {
		var head = this.getListheader(),
			added;
		if (head)
			added = head.getColAttrs();
		return this.$supers('domAttrs_', arguments)
			+ (this._colspan > 1 ? ' colspan="' + this._colspan + '"' : '')
			+ (added ? ' ' + added : '');
	},
	
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments),
			head = this.getListheader();
		if (head && !head.isVisible())
			style += "display:none;";
		return style;
	}
});
})();
zkreg('zul.sel.Listcell',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass() + '-cnt');

	var box = this.getListbox();
	if (box != null && !box.isSizedByContent())
		out.push(' z-overflow-hidden');

	out.push('"', this.domTextStyleAttr_(), '>', this.domContent_());

	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);

	out.push('</div></td>');
}

;zkmld(zk._p.p.Listcell,zk._m);

zul.sel.Listhead = zk.$extends(zul.mesh.HeadWidget, {
	
	getZclass: function () {
		return this._zclass == null ? "z-listhead" : this._zclass;
	}
});
zkreg('zul.sel.Listhead');zk._m={};
zk._m['default']=
zul.mesh.HeadWidget.redraw
;zkmld(zk._p.p.Listhead,zk._m);

zul.sel.Listheader = zk.$extends(zul.mesh.SortWidget, {
	
	getListbox: zul.mesh.HeaderWidget.prototype.getMeshWidget,
	
	getMeshBody: zul.mesh.HeaderWidget.prototype.getMeshWidget,
	
	$define: {
    	
    	
		maxlength: [function (v) {
			return !v || v < 0 ? 0 : v; 
		}, function () {
			if (this.desktop)
				this.updateCells_();
		}]
	},
	
	updateCells_: function () {
		var box = this.getListbox();
		if (box == null || box.getMold() == 'select')
			return;

		var jcol = this.getChildIndex();
		for (var it = this.getBodyWidgetIterator(), w; (w = it.next());)
			if (jcol < w.nChildren)
				return w.getChildAt(jcol).rerender();
	},
	
	getZclass: function () {
		return this._zclass == null ? "z-listheader" : this._zclass;
	},
	bind_: function () {
		this.$supers(zul.sel.Listheader, 'bind_', arguments);
		var cm = this.$n('cm');
		if (cm) {
			var box = this.getListbox();
			if (box) box._headercm = cm;
			this.domListen_(cm, 'onClick')
				.domListen_(cm, 'onMouseOver')
				.domListen_(cm, 'onMouseOut');
		}
	},
	unbind_: function () {
		var cm = this.$n('cm');
		if (cm) {
			var box = this.getListbox();
			if (box) box._headercm = null;
			this._checked = null;
			this.domUnlisten_(cm, 'onClick')
				.domUnlisten_(cm, 'onMouseOver')
				.domUnlisten_(cm, 'onMouseOut');
		}
		this.$supers(zul.sel.Listheader, 'unbind_', arguments);
	},
	_doMouseOver: function (evt) {
		 var cls = this._checked ? '-img-over-seld' : '-img-over';
		 jq(evt.domTarget).addClass(this.getZclass() + cls);
	},
	_doMouseOut: function (evt) {
		 var cls = this._checked ? '-img-over-seld' : '-img-over',
		 	$n = jq(evt.domTarget),
			zcls = this.getZclass();
		 $n.removeClass(zcls + cls);
		 if (this._checked)
		 	$n.addClass(zcls + '-img-seld');
	},
	_doClick: function (evt) {
		this._checked = !this._checked;
		var box = this.getListbox(),
			$n = jq(evt.domTarget),
			zcls = this.getZclass(); 
		if (this._checked) {
			$n.removeClass(zcls + '-img-over').addClass(zcls + '-img-over-seld');
			box.selectAll(true, evt)
		} else {
			$n.removeClass(zcls + '-img-over-seld')
				.removeClass(zcls + '-img-seld')
				.addClass(zcls + '-img-over');
			box._select(null, evt);
		}
	},
	
	doClick_: function (evt) {
		var box = this.getListbox();
		if (box && box._checkmark) {
			var n = evt.domTarget;
			if (n.id && n.id.endsWith("-cm"))
				return; 
		}
		this.$supers("doClick_", arguments);
	},
	
	domContent_: function () {
		var s = this.$supers('domContent_', arguments),
			box = this.getListbox();
		if (box != null && this.parent.firstChild == this 
		&& box._checkmark && box._multiple)
			s = '<span id="' + this.uuid + '-cm" class="' + this.getZclass() + '-img"></span>'
				+ (s ? '&nbsp;' + s:'');
		return s;
	}
});

zkreg('zul.sel.Listheader',true);zk._m={};
zk._m['default']=
zul.mesh.HeaderWidget.redraw
;zkmld(zk._p.p.Listheader,zk._m);

zul.sel.Listfoot = zk.$extends(zul.Widget, {
	
	getListbox: function () {
		return this.parent;
	},
	getZclass: function () {
		return this._zclass == null ? "z-listfoot" : this._zclass;
	},
	
	setVflex: function (v) { 
		v = false;
		this.$super(zul.sel.Listfoot, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(zul.sel.Listfoot, 'setHflex', v);
	}
});

zkreg('zul.sel.Listfoot');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Listfoot,zk._m);

zul.sel.Listfooter = zk.$extends(zul.LabelImageWidget, {
	_span: 1,

	$define: {
    	
    	
		span: function (v) {
			var n = this.$n();
			if (n) n.colSpan = v;
		}
	},

	
	getListbox: function () {
		return this.parent ? this.parent.parent : null;
	},
	
	getListheader: function () {
		var listbox = this.getListbox();
		if (listbox) {
			var cs = listbox.listhead;
			if (cs)
				return cs.getChildAt(this.getChildIndex());
		}
		return null;
	},
	getZclass: function () {
		return this._zclass == null ? "z-listfooter" : this._zclass;
	},
	
	domAttrs_: function () {
		var head = this.getListheader(),
			added;
		if (head)
			added = head.getColAttrs();
		return this.$supers('domAttrs_', arguments)
			+ (this._span > 1 ? ' colspan="' + this._span + '"' : '')
			+ (added ? ' ' + added : '');
	}
});

zkreg('zul.sel.Listfooter',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass(), '">', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Listfooter,zk._m);

zul.sel.Option = zk.$extends(zul.Widget, {
	$define: {
    	
    	
		disabled: function (disabled) {
			var n = this.$n();
			if (n) n.disabled = disabled ? 'disabled' : '';
		},
		
		
		value: null
	},
	setVisible: function (visible) {
		if (this._visible != visible) {
			this._visible = visible;
			if (this.desktop)
				this.parent.rerender();
		}
	},
	
	setSelected: function (selected) {
		if (this._selected != selected) {
			if (this.parent)
				this.parent.toggleItemSelection(this);
			this._setSelectedDirectly(selected);
		}
	},
	_setSelectedDirectly: function (selected) {
		var n = this.$n();
		if (n) n.selected = selected ? 'selected' : '';
		this._selected = selected;
	},
	
	isSelected: function () {
		return this._selected;
	},
	
	getLabel: function () {
		return this.firstChild ? this.firstChild.getLabel() : null; 
	},
	
	getMaxlength: function () {
		return this.parent ? this.parent.getMaxlength() : 0;
	},
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	},
	domAttrs_: function () {
		var value = this.getValue();
		return this.$supers('domAttrs_', arguments) + (this.isDisabled() ? ' disabled="disabled"' :'') +
		(this.isSelected() ? ' selected="selected"' : '') + (value ? ' value=' + value : '');
	},
	replaceWidget: function (newwgt) {
		this._syncItems(newwgt);
		this.$supers('replaceWidget', arguments);
	},
	_syncItems: function (newwgt) {
		if (this.parent && this.isSelected()) {
			var items = this.parent._selItems;
			if (items && items.$remove(this))
				items.push(newwgt);
		}
	}
});
zkreg('zul.sel.Option');zk._m={};
zk._m['select']=
function (out) {
	out.push('<option', this.domAttrs_(), '>', this.domLabel_(), '</option>');
}

;zkmld(zk._p.p.Option,zk._m);

zul.sel.Select = zk.$extends(zul.Widget, {
	_selectedIndex: -1,
	_tabindex: -1,
	_rows: 0,
	$init: function () {
		this.$supers('$init', arguments);
		this._selItems = [];
	},
	$define: {
		
		
		multiple: function (multiple) {
			var n = this.$n();
			if (n) n.multiple = multiple ? 'multiple' : '';
		},
		
		
		disabled: function (disabled) {
			var n = this.$n();
			if (n) n.disabled = disabled ? 'disabled' : '';
		},
		
		
		selectedIndex: function (selectedIndex) {
			var i = 0, j = 0, w, n = this.$n();
			this.clearSelection();
			for (w = this.firstChild; w && i < selectedIndex; w = w.nextSibling, i++) {
				if (!w.isVisible())
					j++;
			}
				
			selectedIndex -= j;
			if (n)
				n.selectedIndex = selectedIndex;

			if (selectedIndex > -1 && w) {
				w.setSelected(true);
				this._selItems.push(w);
			}
		},
		
		
		tabindex: function (tabindex) {
			var n = this.$n();
			if (n) n.tabindex = tabindex >= 0 ? tabindex: '';
		},
		
		
		name: function (name) {
			var n = this.$n();
			if (n) n.name = name;
		},
		
		
		rows: function (rows) {
			var n = this.$n();
			if (n) n.size = rows;
		},
		
		
		maxlength: function (maxlength) {
			if (this.desktop)
				this.rerender();
		}
	},
	
	toggleItemSelection: function (item) {
		if (item.isSelected()) this._removeItemFromSelection(item);
		else this._addItemToSelection(item);
	},
	
	selectItem: function (item) {
		if (!item)
			this.setSelectedIndex(-1);
		else if (this._multiple || !item.isSelected())
			this.setSelectedIndex(item.getChildIndex());
	},
	_addItemToSelection: function (item) {
		if (!item.isSelected()) {
			if (!this._multiple) {
				this.selectItem(item);
			} else {
				var index = item.getChildIndex();
				if (index < this._selectedIndex || this._selectedIndex < 0) {
					this._selectedIndex = index;
				}
				item._setSelectedDirectly(true);
				this._selItems.push(item);
			}
		}
	},
	_removeItemFromSelection: function (item) {
		if (item.isSelected()) {
			if (!this._multiple) {
				this.clearSelection();
			} else {
				item._setSelectedDirectly(false);
				this._selItems.$remove(item);				
			}
		}
	},
	
	clearSelection: function () {
		if (this._selItems.length) {
			var item;
			for(;(item = this._selItems.pop());)
				item._setSelectedDirectly(false);
			this._selectedIndex = -1;
		}
	},
	domAttrs_: function () {
		return this.$supers('domAttrs_', arguments)
			+ (this.isDisabled() ? ' disabled="disabled"' :'')
			+ (this.isMultiple() ? ' multiple="multiple"' : '')
			+ (this.getSelectedIndex() > -1 ? ' selectedIndex=' + this.getSelectedIndex() : '')
			+ (this.getTabindex() > -1 ? ' tabindex=' + this.getTabindex(): '')
			+ (this.getRows() > 0 ? ' size=' + this.getRows(): '')
			+ (this.getName() ? ' name="' + this.getName() + '"': '');
	},
	bind_: function () {
		this.$supers(zul.sel.Select, 'bind_', arguments);
		var n = this.$n();
		this.domListen_(n, 'onChange')
			.domListen_(n, 'onFocus', 'doFocus_')
			.domListen_(n, 'onBlur', 'doBlur_');
	},
	unbind_: function () {
		var n = this.$n();
		this.domUnlisten_(n, 'onChange')
			.domUnlisten_(n, 'onFocus', 'doFocus_')
			.domUnlisten_(n, 'onBlur', 'doBlur_')
			.$supers(zul.sel.Select, 'unbind_', arguments);
	},
	_doChange: function (evt) {		
		var data = [], reference, n = this.$n();
		if (this.isMultiple()) {
			var opts = n.options;
			for (var j = 0, ol = opts.length; j < ol; ++j) {
				var opt = opts[j],
					o = zk.Widget.$(opt.id);
				if (o) o.setSelected(opt.selected);
				if (opt.selected) {
					data.push(opt.id);
					if (!reference) reference = opt.id;
				}
			}
		} else {
			var opt = n.options[n.selectedIndex];
			this.setSelectedIndex(n.selectedIndex);
			data.push(opt.id);
			reference = opt.id;
		}
		
		this.fire('onSelect', {items: data, reference: reference});
	
		
		
	},
	doKeyUp_: function (evt) {
		if (zk.gecko || zk.safari) {
			if (this.isMultiple() || this.getSelectedIndex() === evt.domTarget.selectedIndex) 
				return; 
			this._doChange(evt);
		} else this.$supers('doKeyUp_', arguments);
	},
	onChildAdded_: function () {
		this.rerender();
	},
	onChildRemoved_: function () {
		if (!this.childReplacing_)
			this.rerender();
	}
});

zkreg('zul.sel.Select');zk._m={};
zk._m['select']=
function (out) {
	out.push('<select', this.domAttrs_(), '>');
	
	for (var w = this.firstChild; w; w = w.nextSibling)
		if (w.isVisible()) w.redraw(out);
		
	out.push('</select>');
}
;zkmld(zk._p.p.Select,zk._m);

zul.sel.Tree = zk.$extends(zul.sel.SelectWidget, {
	
	clear: function () {
		if (!this._treechildren || !this._treechildren.nChildren)
			return;
		for (var w = this._treechildren.firstChild; w; w = w.nextSibling)
			w.detach();
	},
	getZclass: function () {
		return this._zclass == null ? "z-tree" : this._zclass;
	},
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling, !this.z_rod)) {
			this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child, !this.z_rod)) {
			if (!this.insertingBefore_)
				this._fixOnAdd(child, ignoreDom, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom, _noSync) {
		if (child.$instanceof(zul.sel.Treecols))
			this.treecols = child;
		else if (child.$instanceof(zul.sel.Treefoot))
			this.treefoot = child;
		else if (child.$instanceof(zul.sel.Treechildren)) {
			this.treechildren = child;
			this._fixSelectedSet();
		} else if (child.$instanceof(zul.mesh.Paging))
			this.paging = child;
		if (!ignoreDom)
			this.rerender();
		if (!_noSync)
			this._syncSize();
	},
	onChildReplaced_: function (oldc, newc) {
		this.onChildRemoved_(oldc, true);
		this._fixOnAdd(newc, true);
	},
	onChildRemoved_: function (child, _noSync) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.treecols)
			this.treecols = null;
		else if (child == this.treefoot)
			this.treefoot = null;
		else if (child == this.treechildren) {
			this.treechildren = null;
			this._selItems = [];
			this._sel = null;
		} else if (child == this.paging)
			this.paging = null;

		if (!_noSync)
			this._syncSize();
	},
	_onTreeitemAdded: function (item) {
		this._fixNewChild(item);
		this._onTreechildrenAdded(item.treechildren);
	},
	_onTreeitemRemoved: function (item) {
		var fixSel, upperItem;
		if (item.isSelected()) {
			this._selItems.$remove(item);
			fixSel = this._sel == item;
			if (fixSel && !this._multiple) {
				this._sel = null;
			}
		}
		this._onTreechildrenRemoved(item.treechildren);
		if (fixSel) this._fixSelected();
		if (upperItem = item.previousSibling || item.getParentItem()) this._syncFocus(upperItem);
		else jq(this.$n('a')).offset({top: 0, left: 0});
	},
	_onTreechildrenAdded: function (tchs) {
		if (!tchs || tchs.parent == this)
			return; 

		
		for (var j = 0, items = tchs.getItems(), k = items.length; j < k; ++j)
			if (items[j]) this._fixNewChild(items[j]);
	},
	_onTreechildrenRemoved: function (tchs) {
		if (tchs == null || tchs.parent == this)
			return; 

		
		var item, fixSel;
		for (var j = 0, items = tchs.getItems(), k = items.length; j < k; ++j) {
			item = items[j];
			if (item.isSelected()) {
				this._selItems.$remove(item);
				if (this._sel == item) {
					if (!this._multiple) {
						this._sel = null;
						return; 
					}
					fixSel = true;
				}
			}
		}
		if (fixSel) this._fixSelected();
	},
	_fixNewChild: function (item) {
		if (item.isSelected()) {
			if (this._sel && !this._multiple) {
				item._selected = false;
				item.rerender();
			} else {
				if (!this._sel)
					this._sel = item;
				this._selItems.push(item);
			}
		}
	},
	_fixSelectedSet: function () {
		this._sel = null;
		this._selItems = [];
		for (var j = 0, items = this.getItems(), k = items.length; j < k; ++j) {
			if (items[j].isSelected()) {
				if (this._sel == null) {
					this._sel = items[j];
				} else if (!_multiple) {
					items[j]._selected = false;
					continue;
				}
				this._selItems.push(item);
			}
		}
	},
	_fixSelected: function () {
		var sel;
		switch (this._selItems.length) {
		case 1:
			sel = this._selItems[0];
		case 0:
			break;
		default:
			for (var j = 0, items = this.getItems(), k = items.length; j < k; ++j) {
				if (items[j].isSelected()) {
					sel = items[j];
					break;
				}
			}
		}

		if (sel != this._sel) {
			this._sel = sel;
			return true;
		}
		return false;
	},
	
	getHeadWidgetClass: function () {
		return zul.sel.Treecols;
	},
	
	itemIterator: _zkf = function () {
		return new zul.sel.TreeItemIter(this);
	},
	
	getBodyWidgetIterator: _zkf,

	
	getItems: function () {
		return this.treechildren ? this.treechildren.getItems(): [];
	},
	
	getItemCount: function () {
		return this.treechildren != null ? this.treechildren.getItemCount(): 0;
	},
	_doLeft: function (row) {
		if (row.isOpen()) {
			row.setOpen(false);
		}
	},
	_doRight: function (row) {
		if (!row.isOpen()) {
			row.setOpen(true);
		}
	},

	
	shallIgnoreSelect_: function (evt) {
		var n = evt.domTarget;
		return n && n.id && n.id.endsWith('-open');
	}
});

zul.sel.TreeItemIter = zk.$extends(zk.Object, {
	
	$init: function (tree) {
		this.tree = tree;
	},
	_init: function () {
		if (!this._isInit) {
			this._isInit = true;
			this.items = this.tree.getItems();
			this.length = this.items.length;
			this.cur = 0;
		}
	},
	 
	hasNext: function () {
		this._init();
		return this.cur < this.length;
	},
	
	next: function () {
		this._init();
		return this.items[this.cur++];
	}
});


zkreg('zul.sel.Tree');zk._m={};
zk._m['paging']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		innerWidth = this.getInnerWidth(),
		width = innerWidth == '100%' ? ' width="100%"' : '',
		wdStyle =  innerWidth != '100%' ? 'width:' + innerWidth : '',
		inPaging = this.inPagingMold(), pgpos,
		tag = zk.ie || zk.gecko ? 'a' : 'button';
		
	out.push('<div', this.domAttrs_(), '>');
	
	if (inPaging && this.paging) {
		pgpos = this.getPagingPosition();
		if (pgpos == 'top' || pgpos == 'both') {
			out.push('<div id="', uuid, '-pgit" class="', zcls, '-pgi-t">');
			this.paging.redraw(out);
			out.push('</div>');
		}
	}
	
	if (this.treecols) {
		out.push('<div id="', uuid, '-head" class="', zcls, '-header">',
				'<table', width, zUtl.cellps0,
				' style="table-layout:fixed;', wdStyle,'">');
		this.domFaker_(out, '-hdfaker', zcls);
		
		for (var hds = this.heads, j = 0, len = hds.length; j < len;)
			hds[j++].redraw(out);
	
		out.push('</table></div>');
	}
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"><table', width,
		zUtl.cellps0);
	
	if (!this.isSizedByContent())
		out.push(' style="table-layout:fixed;', wdStyle,'"');
		
	out.push('>');
	
	if (this.treecols)
		this.domFaker_(out, '-bdfaker', zcls);
		
	if (this.treechildren)
		this.treechildren.redraw(out);
	
	out.push('</table><', tag, ' id="', uuid,
		'-a" tabindex="-1" onclick="return false;" href="javascript:;" class="z-focus-a"></',
		tag, '>');
	out.push("</div>");
	
	if (this.treefoot) {
		out.push('<div id="', uuid, '-foot" class="', zcls, '-footer">',
				'<table', width, zUtl.cellps0, ' style="table-layout:fixed;', wdStyle,'">');
		if (this.treecols) 
			this.domFaker_(out, '-ftfaker', zcls);
			
		this.treefoot.redraw(out);
		out.push('</table></div>');
	}
	if (pgpos == 'bottom' || pgpos == 'both') {
		out.push('<div id="', uuid, '-pgib" class="', zcls, '-pgi-b">');
		this.paging.redraw(out);
		out.push('</div>');
	}
	out.push('</div>');
}

;zk._m['default']=[zk._p.p.Tree,'paging'];zkmld(zk._p.p.Tree,zk._m);

zul.sel.Treecol = zk.$extends(zul.mesh.HeaderWidget, {
	
	getTree: zul.mesh.HeaderWidget.prototype.getMeshWidget,
	$define: {
    	
    	
		maxlength: [function (v) {
			return !v || v < 0 ? 0 : v; 
		}, function () {
			if (this.desktop)
				this.updateCells_();
		}]
	},
	updateCells_: function () {
		var tree = this.getTree();
		if (tree)
			zul.sel.Treecol.updateCell(tree.treechildren, this.getChildIndex());			
	},
	getZclass: function () {
		return this._zclass == null ? "z-treecol" : this._zclass;
	}
}, {
	updateCell: function(tch, jcol) {
		if (!tch) 
			return;
		
		for (var w = tch.firstChild; w; w = w.nextSibling) {
			if (w.treerow) {
				if (jcol < w.treerow.nChildren) 
					w.treerow.getChildAt(jcol).rerender();
			}
			
			zul.sel.Treecol.updateCell(w.treechildren, jcol); 
		}
	}
});

zkreg('zul.sel.Treecol',true);zk._m={};
zk._m['default']=
function (out) {
	var zcls = this.getZclass();
	out.push('<th', this.domAttrs_(), '><div id="', this.uuid, '-cave" class="',
			zcls, '-cnt">', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></th>');	
}

;zkmld(zk._p.p.Treecol,zk._m);

zul.sel.Treecols = zk.$extends(zul.mesh.HeadWidget, {
	
	getTree: function () {
		return this.parent;
	},
	setVisible: function (visible) {
		if (this._visible != visible) {
			this.$supers('setVisible', arguments);
			this.getTree().rerender();
		}
	},
	getZclass: function () {
		return this._zclass == null ? "z-treecols" : this._zclass;
	}
});

zkreg('zul.sel.Treecols');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), ' align="left">');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Treecols,zk._m);

zul.sel.Treechildren = zk.$extends(zul.Widget, {
	
	getTree: function () {
		for (var wgt = this.parent; wgt; wgt = wgt.parent)
			if (wgt.$instanceof(zul.sel.Tree)) return wgt;
		return null;
	},
	
	getLinkedTreerow: function () {
		return this.parent && this.parent.$instanceof(zul.sel.Treeitem) ?
			this.parent.treerow: null;
	},
	
	insertBefore: function (child, sibling, ignoreDom) {
		var oldsib = this._fixBeforeAdd(child);

		if (this.$supers('insertBefore', arguments)) {
			this._fixOnAdd(oldsib, child, ignoreDom);
			return true;
		}
	},
	
	appendChild: function (child, ignoreDom) {
		var oldsib = this._fixBeforeAdd(child);

		if (this.$supers('appendChild', arguments)) {
			if (!this.insertingBefore_)
				this._fixOnAdd(oldsib, child, ignoreDom);
			return true;
		}
	},
	_fixBeforeAdd: function (child) {
		var p;
		if ((p=child.parent) && p.lastChild == child)
			return child.previousSibling;
	},
	_fixOnAdd: function (oldsib, child, ignoreDom) {
		if (!ignoreDom) {
			if (oldsib) oldsib._syncIcon();
			var p;
			if ((p=child.parent) && p.lastChild == child
        			&& (p=child.previousSibling))
				p._syncIcon();
		}
	},
	insertChildHTML_: function (child, before, desktop) {
		var ben;
		if (before)
			before = before.getFirstNode_();
		if (!before && !this.parent.$instanceof(zul.sel.Tree))
			ben = this.getCaveNode() || this.parent.getCaveNode();

		if (before)
			jq(before).before(child.redrawHTML_());
		else if (ben)
			jq(ben).after(child.redrawHTML_());
		else {
			if (this.parent.$instanceof(zul.sel.Tree))
				jq(this.parent.$n('rows')).append(child.redrawHTML_());
			else
				jq(this).append(child.redrawHTML_());
		}
		child.bind(desktop);
	},
	getCaveNode: function () {
		for (var cn, w = this.lastChild; w; w = w.previousSibling)
			if ((cn = w.getCaveNode())) {
				
				
				if (w.treechildren) {
					var _cn  = w.treechildren.getCaveNode();
					if (_cn)
						cn = _cn;
				}
				return cn;	
			}
	},
	isVisible: function () {
		if (!this.$supers('isVisible', arguments))
			return false;

		if (!this.parent) return false;
		if (!(this.parent.$instanceof(zul.sel.Treeitem)))
			return true;
		if (!this.parent.isOpen())
			return false;
		return !(this.parent.parent.$instanceof(zul.sel.Treechildren))
			|| this.parent.parent.isVisible(); 
	},
	
	getItems: function (items) {
		items = items || [];
		for (var w = this.firstChild; w; w = w.nextSibling) {
			items.push(w);
			if (w.treechildren) 
				w.treechildren.getItems(items);
		}
		return items;
	},
	
	getItemCount: function () {
		var sz = 0;
		for (var w = this.firstChild; w; w = w.nextSibling, ++sz)
			if (w.treechildren)
				sz += w.treechildren.getItemCount();
		return sz;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treechildren" : this._zclass;
	},
	beforeParentChanged_: function (newParent) {
		var oldtree = this.getTree();
		if (oldtree)
			oldtree._onTreechildrenRemoved(this);
			
		if (newParent) {
			var tree = newParent.$instanceof(zul.sel.Tree) ? newParent : newParent.getTree();
			if (tree) tree._onTreechildrenAdded(this);
		}
		this.$supers("beforeParentChanged_", arguments);
	},
	removeHTML_: function (n) {
		for (var cn, w = this.firstChild; w; w = w.nextSibling) {
			cn = w.$n();
			if (cn)
				w.removeHTML_(cn);
		}
		this.$supers('removeHTML_', arguments);
	},
	getOldWidget_: function (n) {
		var old = this.$supers('getOldWidget_', arguments);
		if (old && old.$instanceof(zul.sel.Treerow)) {
			var ti = old.parent;
			if (ti)
				return ti.treechildren;
			return null;
		}
		return old;
	},
	$n: function (nm) {
		if (this.firstChild)
			return nm ? this.firstChild.$n(nm) : this.firstChild.$n();
		return null;
	},
	replaceWidget: function (newwgt) {
		while (this.firstChild != this.lastChild)
			this.lastChild.detach();
		
		if (this.firstChild && this.firstChild.treechildren)
			this.firstChild.treechildren.detach();
		
		this.$supers('replaceWidget', arguments);
	}
});
zkreg('zul.sel.Treechildren');zk._m={};
zk._m['default']=
function (out) {
	if (this.parent.$instanceof(zul.sel.Tree)) {
		out.push('<tbody id="',this.parent.uuid,'-rows" ', this.domAttrs_(), '>');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</tbody>');
	} else
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
}

;zkmld(zk._p.p.Treechildren,zk._m);

zul.sel.Treeitem = zk.$extends(zul.sel.ItemWidget, {
	_open: true,
	_checkable: true,
	$define: {
    	
    	
		open: function (open, fromServer) {
			var img = this.$n('open');
			if (!img) return;
			var cn = img.className;
			img.className = open ? cn.replace('-close', '-open') : cn.replace('-open', '-close');
			this._showKids(open);
			zWatch.fireDown(open ? 'onShow': 'onHide', this);
			this.getMeshWidget().onSize();
			if (!fromServer) {
				var tree = this.getTree(),
					indemand = tree.inPagingMold() || tree.isModel();
				this.fire('onOpen', {open: open}, {toServer: indemand});
			}
			var tree = this.getTree();
			if (tree) {
				tree._syncFocus(this);
				tree.focus();
			}
		}
	},
	_showKids: function (open) {
		if (this.treechildren)
			for (var w = this.treechildren.firstChild; w; w = w.nextSibling) {
				w.$n().style.display = open ? '' : 'none';
				if (w.isOpen())
					w._showKids(open);
			}
	},
	isStripeable_: function () {
		return false;
	},
	
	getMeshWidget: _zkf = function () {
		for (var wgt = this.parent; wgt; wgt = wgt.parent)
			if (wgt.$instanceof(zul.sel.Tree)) return wgt;
		return null;		
	},
	
	getTree: _zkf,
	getZclass: function () {
		if (this.treerow) return this.treerow.getZclass();
		return null;
	},
	$n: function (nm) {
		if (this.treerow)
			return nm ? this.treerow.$n(nm) : this.treerow.$n() || jq(this.treerow.uuid, zk)[0];
		return null;
	},
	
	isContainer: function () {
		return this.treechildren != null;
	},
	
	isEmpty: function () {
		return !this.treechildren || !this.treechildren.nChildren;
	},
	
	getLevel: function () {
		var level = 0;
		for (var  item = this;; ++level) {
			if (!item.parent)
				break;

			item = item.parent.parent;
			if (!item || item.$instanceof(zul.sel.Tree))
				break;
		}
		return level;
	},
	
	getLabel: function () {
		var cell = this.getFirstCell();
		return cell ? cell.getLabel(): null;
	},
	
	setLabel: function (label) {
		this._autoFirstCell().setLabel(label);
	},
	
	getFirstCell: function () {
		return this.treerow ? this.treerow.firstChild : null;
	},
	_autoFirstCell: function () {
		if (!this.treerow)
			this.appendChild(new zul.sel.Treerow());

		var cell = this.treerow.firstChild;
		if (!cell) {
			cell = new zul.sel.Treecell();
			this.treerow.appendChild(cell);
		}
		return cell;
	},
	
	getImage: function () {
		var cell = this.getFirstCell();
		return cell ? cell.getImage(): null;
	},
	
	setImage: function (image) {
		this._autoFirstCell().setImage(image);
		return this;
	},
	
	getParentItem: function () {
		var p = this.parent && this.parent.parent ? this.parent.parent : null;
		return p && p.$instanceof(zul.sel.Treeitem) ? p : null;
	},
	setVisible: function (visible) {
		if (this._visible != visible) {
			this.$supers('setVisible', arguments);
			if (this.treerow) this.treerow.setVisible(visible);
		}
		return this;
	},
	
	beforeParentChanged_: function(newParent) {
		var oldtree = this.getTree();
		if (oldtree) 
			oldtree._onTreeitemRemoved(this);
		
		if (newParent) {
			var tree = newParent.getTree();
			if (tree) 
				tree._onTreeitemAdded(this);
		}
		this.$supers("beforeParentChanged_", arguments);
	},
	
	insertBefore: function (child, sibling, ignoreDom) {
		if (this.$super('insertBefore', child, sibling,
		ignoreDom || (!this.z_rod && child.$instanceof(zul.sel.Treechildren)))) {
			this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	
	appendChild: function (child, ignoreDom) {
		if (this.$super('appendChild', child,
		ignoreDom || (!this.z_rod && child.$instanceof(zul.sel.Treechildren)))) {
			if (!this.insertingBefore_)
				this._fixOnAdd(child, ignoreDom);
			return true;
		}
	},
	_fixOnAdd: function (child, ignoreDom) {
		if (child.$instanceof(zul.sel.Treerow)) 
			this.treerow = child;
		else if (child.$instanceof(zul.sel.Treechildren)) {
			this.treechildren = child;
			if (!ignoreDom && this.treerow) 
				this.rerender();
		}
	},
	onChildReplaced_: function (oldc, newc) {
		this.onChildRemoved_(oldc, true);
		this._fixOnAdd(newc, true);
	},
	onChildRemoved_: function(child, _noSync) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.treerow) 
			this.treerow = null;
		else if (child == this.treechildren) {
			this.treechildren = null;
			if (!_noSync) this._syncIcon(); 
		}
	},
	removeHTML_: function (n) {
		for (var cn, w = this.firstChild; w; w = w.nextSibling) {
			cn = w.$n();
			if (cn)
				w.removeHTML_(cn);
		}
		this.$supers('removeHTML_', arguments);
	},
	replaceWidget: function (newwgt) {
		this._syncSelectedItem(newwgt);
		if (this.treechildren)
			this.treechildren.detach();
		this.$supers('replaceWidget', arguments);
	},
	_syncSelectedItem: function (newwgt) {
		var tree = this.getTree();
		if (tree && this.isSelected()) {
			var items = tree._selItems;
			if (items && items.$remove(this))
				items.push(newwgt);
		}
	},
	_removeChildHTML: function (n) {
		for(var cn, w = this.firstChild; w; w = w.nextSibling) {
			if (w != this.treerow && (cn = w.$n()))
				w.removeHTML_(cn);
		}
	},
	insertChildHTML_: function (child, before, desktop) {
		if (before = before ? before.getFirstNode_(): null)
			jq(before).before(child.redrawHTML_());
		else
			jq(this.getCaveNode()).after(child.redrawHTML_());
				
		child.bind(desktop);
	},
	getOldWidget_: function (n) {
		var old = this.$supers('getOldWidget_', arguments);
		if (old && old.$instanceof(zul.sel.Treerow))
			return old.parent;
		return old;
	},
	replaceHTML: function (n, desktop, skipper) {
		this._removeChildHTML(n);
		this.$supers('replaceHTML', arguments);
	},
	_syncIcon: function () {
		if (this.desktop && this.treerow) {
			var i = this.treerow;
			if (i = i.firstChild)
				i._syncIcon();
			if (i = this.treechildren)
				for (i = i.firstChild; i; i = i.nextSibling)
					i._syncIcon();
		}
	}
});
zkreg('zul.sel.Treeitem');zk._m={};
zk._m['default']=
function (out) {
	if (this.treerow) this.treerow.redraw(out);
	if (this.treechildren) this.treechildren.redraw(out);
}

;zkmld(zk._p.p.Treeitem,zk._m);

zul.sel.Treerow = zk.$extends(zul.Widget, {
	
	getTree: function () {
		return this.parent ? this.parent.getTree() : null;
	},
	
	getLevel: function () {
		return this.parent ? this.parent.getLevel(): 0;
	},
	
	getLinkedTreechildren: function () {
		return this.parent ? this.parent.treechildren : null;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var added = this.parent ? this.parent.isDisabled() ? this.getZclass() + '-disd'
					: this.parent.isSelected() ? this.getZclass() + '-seld' : '' : '';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treerow" : this._zclass;
	},
	domTooltiptext_ : function () {
		return this._tooltiptext || this.parent._tooltiptext || this.parent.parent._tooltiptext;
	},
	
	isVisible: function () {
		if (!this.parent || !this.$supers('isVisible', arguments))
			return false;
		if (!this.parent.isVisible())
			return false;
		var child = this.parent.parent;
		return child && child.isVisible();
	},
	
	removeChild: function (child) {
		for (var w = child.firstChild; w;) {
			var n = w.nextSibling; 
			child.removeChild(w); 
			w = n;
		}
		this.$supers('removeChild', arguments);
	},

	
	doClick_: function(evt) {
		var ti = this.parent;
		if (ti.isDisabled()) return;
		if (evt.domTarget == this.$n('open')) {
			ti.setOpen(!ti._open);
			evt.stop();
		} else this.$supers('doClick_', arguments);
	}
});
zkreg('zul.sel.Treerow');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Treerow,zk._m);

zul.sel.Treecell = zk.$extends(zul.LabelImageWidget, {
	
	setWidth: zk.$void, 
	_colspan: 1,
	$init: function () {
		this.$supers('$init', arguments);
		this._skipper = new zul.sel.TCSkipper();
	},
	$define: {
    	
    	
		colspan: [
			function (colspan) {
				return colspan > 1 ? colspan: 1;
			},
			function () {
				var n = this.$n();
				if (n) n.colSpan = this._colspan;
			}]
	},
	
	getTree: function () {
		return this.parent ? this.parent.getTree() : null;
	},
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments),
			tc = this.getTreecol();
			return this.isVisible() && tc && !tc.isVisible() ? style +
				"display:none;" : style;
	},
	
	getTreecol: function () {
		var tree = this.getTree();
		if (tree && tree.treecols) {
			var j = this.getChildIndex();
			if (j < tree.treecols.nChildren)
				return tree.treecols.getChildAt(j);
		}
		return null;
	},
	
	getLevel: function () {
		return this.parent ? this.parent.getLevel(): 0;
	},
	
	getMaxlength: function () {
		var box = this.getTree();
		if (!box) return 0;
		var tc = this.getTreecol();
		return tc ? tc.getMaxlength() : 0;
	},
	domLabel_: function () {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	},
	getTextNode: function () {
		return this.getCaveNode();
	},
	domContent_: function () {
		var s1 = this.$supers('domContent_', arguments),
			s2 = this._colHtmlPre();
		return s1 ? s2 ? s2 + '&nbsp;' + s1: s1: s2;
	},
	_syncIcon: function () {
		this.rerender(this._skipper);
	},
	_colHtmlPre: function () {
		if (this.parent.firstChild == this) {
			var item = this.parent.parent,
				tree = item.getTree(),
				sb = [];
			if (tree) {
				if (tree.isCheckmark()) {
					var chkable = item.isCheckable(),
						multi = tree.isMultiple(),
						zcls = item.getZclass(),
						img = zcls + '-img';
					sb.push('<span id="', this.parent.uuid, '-cm" class="', img,
						' ', img, (multi ? '-checkbox' : '-radio'));
					
					if (!chkable || item.isDisabled())
						sb.push(' ', img, '-disd');
					
					sb.push('"');
					if (!chkable)
						sb.push(' style="visibility:hidden"');
						
					sb.push('></span>');
				}
			}
			var iconScls = tree ? tree.getZclass() : "",
				pitems = this._getTreeitems(item, tree);
			for (var j = 0, k = pitems.length; j < k; ++j)
				this._appendIcon(sb, iconScls,
					j == 0 || this._isLastVisibleChild(pitems[j]) ? zul.sel.Treecell.SPACER: zul.sel.Treecell.VBAR, false);

			if (item.isContainer()) {
				this._appendIcon(sb, iconScls,
					item.isOpen() ?
						pitems.length == 0 ? zul.sel.Treecell.ROOT_OPEN:
							 this._isLastVisibleChild(item) ? zul.sel.Treecell.LAST_OPEN: zul.sel.Treecell.TEE_OPEN:
						pitems.length == 0 ? zul.sel.Treecell.ROOT_CLOSE:
							this._isLastVisibleChild(item) ? zul.sel.Treecell.LAST_CLOSE: zul.sel.Treecell.TEE_CLOSE,
						true);
			} else {
				this._appendIcon(sb, iconScls,
					pitems.length == 0 ? zul.sel.Treecell.FIRSTSPACER:
						this._isLastVisibleChild(item) ? zul.sel.Treecell.LAST: zul.sel.Treecell.TEE, false);
			}
			return sb.join('');
		} else {
			
			
			return !this.getImage() && !this.getLabel()	&& !this.nChildren ? "&nbsp;": null;
		}
	},
	_isLastVisibleChild: function (item) {
		var parent = item.parent;
		for (var w = parent.lastChild; w; w = w.previousSibling)
			if (w.isVisible()) return w == item;
		return false;
	},
	_getTreeitems: function (item, tree) {
		var pitems = [];
		for (;;) {
			var tch = item.parent;
			if (!tch)
				break;
			item = tch.parent;
			if (!item || item == tree)
				break;
			pitems.unshift(item);
		}
		return pitems;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treecell" : this._zclass;
	},
	_appendIcon: function (sb, iconScls, name, button) {
		sb.push('<span class="');
		if (name == zul.sel.Treecell.TEE || name == zul.sel.Treecell.LAST || name == zul.sel.Treecell.VBAR || name == zul.sel.Treecell.SPACER) {
			sb.push(iconScls + "-line ", iconScls, '-', name, '"');
		} else {
			sb.push(iconScls + "-ico ", iconScls, '-', name, '"');
		}
		if (button) {
			var item = this.parent.parent;
			if (item && item.treerow)
				sb.push(' id="', item.treerow.uuid, '-open"');
		}

		sb.push('></span>');
	},
	getWidth: function() {
		var col = this.getTreecol();
		return col ? col.getWidth() : null;
	},
	domAttrs_: function () {
		var head = this.getTreecol(),
			added;
		if (head)
			added = head.getColAttrs();
		return this.$supers('domAttrs_', arguments)
			+ (this._colspan > 1 ? ' colspan="' + this._colspan + '"' : '')
			+ (added ? ' ' + added : '');
	},
	updateDomContent_: function () {
		this.$supers('updateDomContent_', arguments);
		if (this.parent)
			this.parent.clearCache();
	}
}, {
	ROOT_OPEN: "root-open",
	ROOT_CLOSE: "root-close",
	LAST_OPEN: "last-open",
	LAST_CLOSE: "last-close",
	TEE_OPEN: "tee-open",
	TEE_CLOSE: "tee-close",
	TEE: "tee",
	LAST: "last",
	VBAR: "vbar",
	SPACER: "spacer",
	FIRSTSPACER: "firstspacer"
});
zul.sel.TCSkipper = zk.$extends(zk.Skipper, {
	skipped: function () {
		return true;
	},
	restore: function (wgt, skip) {
		if (skip) {
			var loc = jq(skip.id, zk)[0];
			for (var el; el = skip.firstChild;) {
				skip.removeChild(el);
				if (el.id && el.id.indexOf('-') < 0) {
					loc.appendChild(el);
					if (zk.ie) zjq._fixIframe(el); 
				}
			}
		}
	}
});
zkreg('zul.sel.Treecell',true);zk._m={};
zk._m['default']=
function (out, skipper) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass() + '-cnt');

	var tree = this.getTree();
	if (tree != null && !tree.isSizedByContent())
		out.push(' z-overflow-hidden');

	out.push('"', this.domTextStyleAttr_(), '>', this.domContent_());

	if (!skipper)
    	for (var w = this.firstChild; w; w = w.nextSibling)
    		w.redraw(out);

	out.push('</div></td>');
}

;zkmld(zk._p.p.Treecell,zk._m);

zul.sel.Treefoot = zk.$extends(zul.Widget, {
	
	getTree: function () {
		return this.parent;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treefoot" : this._zclass;
	},
	
	setVflex: function (v) { 
		v = false;
		this.$super(zul.sel.Treefoot, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		v = false;
		this.$super(zul.sel.Treefoot, 'setHflex', v);
	}
});

zkreg('zul.sel.Treefoot');zk._m={};
zk._m['default']=
function (out) {
	out.push('<tr', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</tr>');
}

;zkmld(zk._p.p.Treefoot,zk._m);

zul.sel.Treefooter = zk.$extends(zul.LabelImageWidget, {
	_span: 1,

	$define: {
    	
    	
		span: function (v) {
			var n = this.$n();
			if (n) n.colSpan = v;
		}
	},
	
	getTree: function () {
		return this.parent ? this.parent.parent : null;
	},
	
	getTreecol: function () {
		var tree = this.getTree();
		if (tree) {
			var cs = tree.treecols;
			if (cs)
				return cs.getChildAt(this.getChildIndex());
		}
		return null;
	},
	getZclass: function () {
		return this._zclass == null ? "z-treefooter" : this._zclass;
	},
	
	domAttrs_: function () {
		var attr = this.$supers('domAttrs_', arguments);
		if (this._span > 1)
			attr += ' colSpan="' + this._span + '"';
		return attr;
	}
});

zkreg('zul.sel.Treefooter',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<td', this.domAttrs_(), '><div id="', this.uuid,
		'-cave" class="', this.getZclass(), '">', this.domContent_());
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div></td>');
}

;zkmld(zk._p.p.Treefooter,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.sel',1);zk.load('zul.wgt',function(){zk._p=zkpi('zul.wnd',true);try{



(function () {
	var _modals = [], _lastfocus;

	function _syncMaximized(wgt) {
		if (!wgt._lastSize) return;
		var node = wgt.$n(),
			floated = wgt._mode != 'embedded',
			$op = floated ? jq(node).offsetParent() : jq(node).parent(),
			s = node.style;

		
		var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth,
			sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
		if (!floated) {
			sw -= $op.zk.paddingWidth();
			sw = $op.zk.revisedWidth(sw);
			sh -= $op.zk.paddingHeight();
			sh = $op.zk.revisedHeight(sh);
		}

		s.width = jq.px0(sw);
		s.height = jq.px0(sh);
	}

	
	function _startmove(dg) {
		
		var el = dg.node;
		if(el.style.top && el.style.top.indexOf("%") >= 0)
			 el.style.top = el.offsetTop + "px";
		if(el.style.left && el.style.left.indexOf("%") >= 0)
			 el.style.left = el.offsetLeft + "px";
		zWatch.fire('onFloatUp', dg.control); 
	}
	function _ghostmove(dg, ofs, evt) {
		var wnd = dg.control,
			el = dg.node;
		wnd._hideShadow();
		var $el = jq(el),
			$top = $el.find('>div:first'),
			top = $top[0],
			header = $top.nextAll('div:first')[0],
			fakeT = jq(top).clone()[0],
			fakeH = jq(header).clone()[0];
		jq(document.body).prepend(
			'<div id="zk_wndghost" class="' + wnd.getZclass() + '-move-ghost" style="position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$el.zk.offsetWidth()+'px;height:'+$el.zk.offsetHeight()
			+'px;z-index:'+el.style.zIndex+'"><dl></dl></div>');
		dg._wndoffs = ofs;
		el.style.visibility = "hidden";
		var h = el.offsetHeight - top.offsetHeight - header.offsetHeight;
		el = jq("#zk_wndghost")[0];
		el.firstChild.style.height = jq.px0(zk(el.firstChild).revisedHeight(h));
		el.insertBefore(fakeT, el.firstChild);
		el.insertBefore(fakeH, el.lastChild);
		return el;
	}
	function _endghostmove(dg, origin) {
		var el = dg.node; 
		origin.style.top = jq.px(origin.offsetTop + el.offsetTop - dg._wndoffs[1]);
		origin.style.left = jq.px(origin.offsetLeft + el.offsetLeft - dg._wndoffs[0]);

		document.body.style.cursor = "";
	}
	function _ignoremove(dg, pointer, evt) {
		var el = dg.node,
			wgt = dg.control;
		switch (evt.domTarget) {
		case wgt.$n('close'):
		case wgt.$n('max'):
		case wgt.$n('min'):
			return true; 
		}
		if (!wgt.isSizable()
		|| (el.offsetTop + 4 < pointer[1] && el.offsetLeft + 4 < pointer[0]
		&& el.offsetLeft + el.offsetWidth - 4 > pointer[0]))
			return false; 
		return true;
	}
	function _aftermove(dg, evt) {
		dg.node.style.visibility = "";
		var wgt = dg.control;
		wgt.zsync();
		wgt._fireOnMove(evt.data);
	}

var Window =

zul.wnd.Window = zk.$extends(zul.Widget, {
	_mode: 'embedded',
	_border: 'none',
	_minheight: 100,
	_minwidth: 200,
	_shadow: true,

	$init: function () {
		if (!zk.light) this._fellows = {};

		this.$supers('$init', arguments);

		this.listen({onMaximize: this, onClose: this, onMove: this, onSize: this.onSizeEvent, onZIndex: this}, -1000);
		this._skipper = new zul.wnd.Skipper(this);
	},

	$define: { 
		
		
		mode: _zkf = function () {
			this._updateDomOuter();
		},
		
		
		title: _zkf,
		
		
		border: _zkf,
		
		
		closable: _zkf,
		
		
		sizable: function (sizable) {
			if (this.desktop) {
				if (sizable)
					this._makeSizer();
				else if (this._sizer) {
					this._sizer.destroy();
					this._sizer = null;
				}
			}
		},
		
		
		maximizable: _zkf,
		
		
		minimizable: _zkf,
		
		
		maximized: function (maximized, fromServer) {
			var node = this.$n();
			if (node) {
				var $n = zk(node),
					isRealVisible = this.isRealVisible();
				if (!isRealVisible && maximized) return;

				var l, t, w, h, s = node.style, cls = this.getZclass();
				if (maximized) {
					jq(this.$n('max')).addClass(cls + '-maxd');

					var floated = this._mode != 'embedded',
						$op = floated ? jq(node).offsetParent() : jq(node).parent();
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;

					
					s.top = "-10000px";
					s.left = "-10000px";

					
					var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth,
						sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
					if (!floated) {
						sw -= $op.zk.paddingWidth();
						sw = $n.revisedWidth(sw);
						sh -= $op.zk.paddingHeight();
						sh = $n.revisedHeight(sh);
					}
					s.width = jq.px0(sw);
					s.height = jq.px0(sh);
					this._lastSize = {l:l, t:t, w:w, h:h};

					
					s.top = "0";
					s.left = "0";
					
					
					w = s.width;
					h = s.height;
				} else {
					var max = this.$n('max'),
						$max = jq(max);
					$max.removeClass(cls + "-maxd").removeClass(cls + "-maxd-over");
					if (this._lastSize) {
						s.left = this._lastSize.l;
						s.top = this._lastSize.t;
						s.width = this._lastSize.w;
						s.height = this._lastSize.h;
						this._lastSize = null;
					}
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;

					var body = this.$n('cave');
					if (body)
						body.style.width = body.style.height = "";
				}
				if (!fromServer || isRealVisible) {
					this._visible = true;
					this.fire('onMaximize', {
						left: l,
						top: t,
						width: w,
						height: h,
						maximized: maximized,
						fromServer: fromServer
					});
				}
				if (isRealVisible) {
					this.__maximized = true;
					zWatch.fireDown('beforeSize', this);
					zWatch.fireDown('onSize', this);
				}
			}
		},
		
		
		minimized: function (minimized, fromServer) {
			if (this.isMaximized())
				this.setMaximized(false);

			var node = this.$n();
			if (node) {
				var s = node.style, l = s.left, t = s.top, w = s.width, h = s.height;
				if (minimized) {
					zWatch.fireDown('onHide', this);
					jq(node).hide();
				} else {
					jq(node).show();
					zWatch.fireDown('onShow', this);
				}
				if (!fromServer) {
					this._visible = false;
					this.zsync();
					this.fire('onMinimize', {
						left: s.left,
						top: s.top,
						width: s.width,
						height: s.height,
						minimized: minimized
					});
				}
			}
		},
		
		
		contentStyle: _zkf,
		
		
		contentSclass: _zkf,
		
		
		position: function () {
			this._updateDomPos(false, this.isVisible());
		},
		
		
		minheight: null, 
		
		
		minwidth: null, 
		
		
		shadow: function () {
			if (this._shadow) {
				this.zsync();
			} else if (this._shadowWgt) {
				this._shadowWgt.destroy();
				this._shadowWgt = null;
			}
		}
	},
	
	repos: function () {
		this._updateDomPos(false, this.isVisible());
	},
	
	doOverlapped: function () {
		this.setMode('overlapped');
	},
	
	doPopup: function () {
		this.setMode('popup');
	},
	
	doHighlighted: function () {
		this.setMode('highlighted');
	},
	
	doModal: function () {
		this.setMode('modal');
	},
	
	doEmbedded: function () {
		this.setMode('embedded');
	},

	_doOverlapped: function () {
		var pos = this.getPosition(),
			n = this.$n(),
			$n = zk(n);
		if (!pos && (!n.style.top || !n.style.left)) {
			var xy = $n.revisedOffset();
			n.style.left = jq.px(xy[0]);
			n.style.top = jq.px(xy[1]);
		} else if (pos == "parent")
			this._posByParent();

		$n.makeVParent();
		this.zsync();
		this._updateDomPos();
		this.setTopmost();
		this._makeFloat();
	},
	_doModal: function () {
		var pos = this.getPosition(),
			n = this.$n(),
			$n = zk(n);
		if (pos == "parent") this._posByParent();

		$n.makeVParent();
		this.zsync();
		this._updateDomPos(true);

		if (!pos) { 
			var top = zk.parseInt(n.style.top), y = jq.innerY();
			if (y) {
				var y1 = top - y;
				if (y1 > 100) n.style.top = jq.px0(top - (y1 - 100));
			} else if (top > 100)
				n.style.top = "100px";
		}

		
		var realVisible = this.isRealVisible();
		this.setTopmost();
		
		if (!this._mask) {
			var anchor = this._shadowWgt ? this._shadowWgt.getBottomElement(): null;
			this._mask = new zk.eff.FullMask({
				id: this.uuid + "-mask",
				anchor: anchor ? anchor: this.$n(),
				
				zIndex: this._zIndex,
				visible: realVisible
			});
		}
		if (realVisible) {
			zk.currentModal = this;
			var wnd = _modals[0], fc = zk.currentFocus;
			if (wnd) wnd._lastfocus = fc;
			else _lastfocus = fc;
			_modals.unshift(this);

			
			wnd = this;
			setTimeout(function () {
				if (!zUtl.isAncestor(wnd, zk.currentFocus))
					wnd.focus();
			}, 0);
		}

		this._makeFloat();
	},
	
	_posByParent: function () {
		var n = this.$n(),
			ofs = zk(zk(n).vparentNode(true)).revisedOffset();
		this._offset = ofs;
		n.style.left = jq.px(ofs[0] + zk.parseInt(this._left));
		n.style.top = jq.px(ofs[1] + zk.parseInt(this._top));
	},
	zsync: function () {
		this.$supers('zsync', arguments);
		if (this.desktop) {
			if (this._mode == 'embedded') {
				if (this._shadowWgt) {
					this._shadowWgt.destroy();
					this._shadowWgt = null;
				}
			} else if (this._shadow) {
				if (!this._shadowWgt)
					this._shadowWgt = new zk.eff.Shadow(this.$n(),
						{left: -4, right: 4, top: -2, bottom: 3});
				if (this.isMaximized() || this.isMinimized())
					this._hideShadow();
				else
					this._shadowWgt.sync();
			}
			if (this._mask && this._shadowWgt) {
				var n = this._shadowWgt.getBottomElement()||this.$n(); 
				if (n) this._mask.sync(n);
			}
		}
	},
	_hideShadow: function () {
		var shadow = this._shadowWgt;
		if (shadow) shadow.hide();
	},
	_makeSizer: function () {
		if (!this._sizer) {
			var Window = this.$class;
			this._sizer = new zk.Draggable(this, null, {
				stackup: true, draw: Window._drawsizing,
				initSensitivity: 0,
				starteffect: Window._startsizing,
				ghosting: Window._ghostsizing,
				endghosting: Window._endghostsizing,
				ignoredrag: Window._ignoresizing,
				endeffect: Window._aftersizing});
		}
	},
	_makeFloat: function () {
		var handle = this.$n('cap');
		if (handle && !this._drag) {
			handle.style.cursor = "move";
			var Window = this.$class;
			this._drag = new zk.Draggable(this, null, {
				handle: handle, stackup: true,
				fireOnMove: false,
				starteffect: _startmove,
				ghosting: _ghostmove,
				endghosting: _endghostmove,
				ignoredrag: _ignoremove,
				endeffect: _aftermove,
				zIndex: 99999 
			});
		}
	},
	_updateDomPos: function (force, posParent) {
		if (!this.desktop || this._mode == 'embedded')
			return;

		var n = this.$n(), pos = this._position;
		if (pos == "parent") {
			if (posParent)
				this._posByParent();
			return;
		}
		if (!pos && !force)
			return;

		var st = n.style;
		st.position = "absolute"; 
		var ol = st.left, ot = st.top;
		zk(n).center(pos);
		var sdw = this._shadowWgt;
		if (pos && sdw) {
			var opts = sdw.opts, l = n.offsetLeft, t = n.offsetTop;
			if (pos.indexOf("left") >= 0 && opts.left < 0)
				st.left = jq.px(l - opts.left);
			else if (pos.indexOf("right") >= 0 && opts.right > 0)
				st.left = jq.px(l - opts.right);
			if (pos.indexOf("top") >= 0 && opts.top < 0)
				st.top = jq.px(t - opts.top);
			else if (pos.indexOf("bottom") >= 0 && opts.bottom > 0)
				st.top = jq.px(t - opts.bottom);
		}
		this.zsync();
		if (ol != st.left || ot != st.top)
			this._fireOnMove();
	},

	_updateDomOuter: function () {
		this.rerender(this._skipper);
	},

	
	onClose: function () {
		if (!this.inServer) 
			this.parent.removeChild(this); 
	},
	onMove: function (evt) {
		this._left = evt.left;
		this._top = evt.top;
	},
	onMaximize: function (evt) {
		var data = evt.data;
		this._top = data.top;
		this._left = data.left;
		this._height = data.height;
		this._width = data.width;
	},
	onSizeEvent: function (evt) {
		var data = evt.data,
			node = this.$n(),
			s = node.style;
			
		this._hideShadow();
		if (data.width != s.width) {
			s.width = data.width;
			this._fixWdh();
		}	
		if (data.height != s.height) {
			s.height = data.height;
			this._fixHgh();
		}
				
		if (data.left != s.left || data.top != s.top) {
			s.left = data.left;
			s.top = data.top;
			this._fireOnMove(evt.keys);
		}
		
		this.zsync();
		var self = this;
		setTimeout(function() {
			zWatch.fireDown('beforeSize', self);
			zWatch.fireDown('onSize', self);
		}, zk.ie6_ ? 800: 0);
	},
	onZIndex: _zkf = function (evt) {
		this.zsync();
	},
	
	onResponse: _zkf,
	onShow: function (ctl) {
		var w = ctl.origin;
		if (this != w && this._mode != 'embedded'
		&& this.isRealVisible({until: w, dom: true})) {
			zk(this.$n()).cleanVisibility();
			this.zsync();
		}
		this.onSize(w);
	},
	onHide: function (ctl) {
		var w = ctl.origin;
		if (this != w && this._mode != 'embedded'
		&& this.isRealVisible({until: w, dom: true})) {
		
		
		
		
			this.$n().style.visibility = 'hidden';
			this.zsync();
		}
	},
	beforeSize: function() {
		
		if (this.isMaximized()&& !this.__maximized) 
			this.$n().style.width="";
	},
	onSize: function() {
		this._hideShadow();
		if (this.isMaximized()) {
			if (!this.__maximized)
				_syncMaximized(this);
			this.__maximized = false; 
		}
		this._fixHgh();
		this._fixWdh();
		if (this._mode != 'embedded') {
			this._updateDomPos();
			this.zsync();
		}
	},
	onFloatUp: function (ctl) {
		if (!this.isVisible() || this._mode == 'embedded')
			return; 

		var wgt = ctl.origin;
		if (this._mode == 'popup') {
			for (var floatFound; wgt; wgt = wgt.parent) {
				if (wgt == this) {
					if (!floatFound) this.setTopmost();
					return;
				}
				floatFound = floatFound || wgt.isFloating_();
			}
			this.setVisible(false);
			this.fire('onOpen', {open:false});
		} else
			for (; wgt; wgt = wgt.parent) {
				if (wgt == this) {
					this.setTopmost();
					return;
				}
				if (wgt.isFloating_())
					return;
			}
	},
	_fixWdh: zk.ie7_ ? function () {
		if (this._mode != 'embedded' && this._mode != 'popup' && this.isRealVisible()) {
			var n = this.$n(),
				cave = this.$n('cave').parentNode,
				wdh = n.style.width,
				$n = jq(n),
				$tl = $n.find('>div:first'),
				tl = $tl[0],
				hl = tl && this.$n("cap") ? $tl.nextAll('div:first')[0]: null,
				bl = $n.find('>div:last')[0];

			if (!wdh || wdh == "auto") {
				var $cavp = zk(cave.parentNode),
					diff = $cavp.padBorderWidth() + zk(cave.parentNode.parentNode).padBorderWidth();
				if (tl) tl.firstChild.style.width = jq.px0(cave.offsetWidth + diff);
				if (hl) hl.firstChild.firstChild.style.width = jq.px(cave.offsetWidth
					- (zk(hl).padBorderWidth() + zk(hl.firstChild).padBorderWidth() - diff));
				if (bl) bl.firstChild.style.width = jq.px0(cave.offsetWidth + diff);
			} else {
				if (tl) tl.firstChild.style.width = "";
				if (hl) hl.firstChild.style.width = "";
				if (bl) bl.firstChild.style.width = "";
			}
		}
	} : zk.$void,
	_fixHgh: function () {
		if (this.isRealVisible()) {
			var n = this.$n(),
				hgh = n.style.height,
				cave = this.$n('cave'),
				cvh = cave.style.height;

			if (zk.ie6_ && hgh && hgh != "auto" && hgh != '100%')
				cave.style.height = "0";

			if (hgh && hgh != "auto") {
				zk(cave).setOffsetHeight(this._offsetHeight(n));
			} else if (cvh && cvh != "auto") {
				if (zk.ie6_) cave.style.height = "0";
				cave.style.height = "";
			}
		}
	},
	_offsetHeight: function (n) {
		var h = n.offsetHeight - this._titleHeight(n);
		if(this._mode != 'embedded' && this._mode != 'popup') {
			var cave = this.$n('cave'),
				bl = jq(n).find('>div:last')[0],
				cap = this.$n("cap");
			h -= bl.offsetHeight;
			if (cave)
				h -= zk(cave.parentNode).padBorderHeight();
			if (cap)
				h -= zk(cap.parentNode).padBorderHeight();
		}
		return h - zk(n).padBorderHeight();
	},
	_titleHeight: function (n) {
		var cap = this.$n('cap'),
			$tl = jq(n).find('>div:first'), tl = $tl[0];
		return cap ? cap.offsetHeight + tl.offsetHeight:
			this._mode != 'embedded' && this._mode != 'popup' ?
				tl.offsetHeight: 0;
	},

	_fireOnMove: function (keys) {
		var pos = this._position, node = this.$n(),
			x = zk.parseInt(node.style.left),
			y = zk.parseInt(node.style.top);
		if (pos == 'parent') {
			var vp = zk(node).vparentNode();
			if (vp) {
				var ofs = zk(vp).revisedOffset();
				x -= ofs[0];
				y -= ofs[1];
			}
		}
		this.fire('onMove', zk.copy({
			left: x + 'px',
			top: y + 'px'
		}, keys), {ignorable: true});

	},
	
	setVisible: function (visible) {
		if (this._visible != visible) {
			if (this.isMaximized()) {
				this.setMaximized(false);
			} else if (this.isMinimized()) {
				this.setMinimized(false);
			}

			this.$supers('setVisible', arguments);

			if (visible)
				this._updateDomPos(false, true);
		}
	},
	setHeight: function (height) {
		this.$supers('setHeight', arguments);
		if (this.desktop) {
			this._fixHgh();
			this.zsync();

			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this); 
		}
	},
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		if (this.desktop) {
			this._fixWdh();
			this.zsync();

			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setTop: function () {
		this._hideShadow();
		this.$supers('setTop', arguments);
		this.zsync();

	},
	setLeft: function () {
		this._hideShadow();
		this.$supers('setLeft', arguments);
		this.zsync();
	},
	setZIndex: _zkf = function (zIndex) {
		var old = this._zIndex;
		this.$supers('setZIndex', arguments);
		if (old != zIndex) 
			this.zsync();
	},
	setZindex: _zkf,
	focus: function (timeout) {
		if (this.desktop && this.isVisible() && this.canActivate({checkOnly:true})) {
			var cap = this.caption;
			for (var w = this.firstChild; w; w = w.nextSibling)
				if (w != cap && w.focus(timeout))
					return true;
			return cap && cap.focus(timeout);
		}
		return false;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-window-" + this._mode;
	},

	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.wgt.Caption))
			this.caption = child;
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.caption)
			this.caption = null;
	},
	domStyle_: function (no) {
		var style = this.$supers('domStyle_', arguments);
		if ((!no || !no.visible) && this.isMinimized())
			style = 'display:none;'+style;
		if (this._mode != 'embedded')
			style = "position:absolute;"+style;
		return style;
	},

	bind_: function (desktop, skipper, after) {
		this.$supers(Window, 'bind_', arguments);

		var mode = this._mode;
		zWatch.listen({onSize: this, onShow: this});

		
		if (zk.ie6_)
			zWatch.listen({beforeSize: this});

		if (mode != 'embedded') {
			zWatch.listen({onFloatUp: this, onHide: this});
			this.setFloating_(true);

			if (mode == 'modal' || mode == 'highlighted') this._doModal();
			else this._doOverlapped();
		}
		
		if (this._sizable)
			this._makeSizer();
		this.domListen_(this.$n(), 'onMouseOver');
		
		if (this.isMaximizable() && this.isMaximized()) {
			var self = this;
			after.push(function() {
				self._maximized = false;
				self.setMaximized(true, true);				
			});
		}

		if (this._mode != 'embedded' && (!zk.css3)) {
			jq.onzsync(this); 
			zWatch.listen({onResponse: this});
		}
	},
	unbind_: function () {
		var node = this.$n();
		node.style.visibility = 'hidden'; 

		if (!zk.css3) jq.unzsync(this);

		
		if (this._shadowWgt) {
			this._shadowWgt.destroy();
			this._shadowWgt = null;
		}
		if (this._drag) {
			this._drag.destroy();
			this._drag = null;
		}
		if (this._sizer) {
			this._sizer.destroy();
			this._sizer = null;
		}

		if (this._mask) {
			this._mask.destroy();
			this._mask = null;
		}

		zk(node).undoVParent();
		zWatch.unlisten({
			onFloatUp: this,
			onSize: this,
			onShow: this,
			onHide: this,
			onResponse: this
		});
		if (zk.ie6_)
			zWatch.unlisten({beforeSize: this});
		this.setFloating_(false);

		_modals.$remove(this);
		if (zk.currentModal == this) {
			var wnd = zk.currentModal = _modals[0],
				fc = wnd ? wnd._lastfocus: _lastfocus;
			if (!wnd)
				_lastfocus = null;
			if (!fc || !fc.desktop)
				fc = wnd;
			if (fc)
				fc.focus();
		}
		this._lastfocus = null;

		this.domUnlisten_(this.$n(), 'onMouseOver');
		this.$supers(Window, 'unbind_', arguments);
	},
	_doMouseOver: function (evt) {
		if (this._sizer) {
			var n = this.$n(),
				c = this.$class._insizer(n, zk(n).revisedOffset(), evt.pageX, evt.pageY),
				handle = this._mode == 'embedded' ? false : this.$n('cap');
			if (!this.isMaximized() && c) {
				if (this.isMaximized()) return; 
				if (this._backupCursor == undefined)
					this._backupCursor = n.style.cursor;
				n.style.cursor = c == 1 ? 'n-resize': c == 2 ? 'ne-resize':
					c == 3 ? 'e-resize': c == 4 ? 'se-resize':
					c == 5 ? 's-resize': c == 6 ? 'sw-resize':
					c == 7 ? 'w-resize': 'nw-resize';
				if (handle) handle.style.cursor = "";
			} else {
				n.style.cursor = this._backupCursor || ''; 
				if (handle) handle.style.cursor = "move";
			}
		}
	},
	doClick_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			this.fire('onClose');
			break;
		case this.$n('max'):
			this.setMaximized(!this.isMaximized());
			break;
		case this.$n('min'):
			this.setMinimized(!this.isMinimized());
			break;
		default:
			this.$supers('doClick_', arguments);
			return;
		}
		evt.stop();
	},
	doMouseOver_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).addClass(this.getZclass() + '-close-over');
			break;
		case this.$n('max'):
			var zcls = this.getZclass(),
				added = this.isMaximized() ? ' ' + zcls + '-maxd-over' : '';
			jq(this.$n('max')).addClass(zcls + '-max-over' + added);
			break;
		case this.$n('min'):
			jq(this.$n('min')).addClass(this.getZclass() + '-min-over');
			break;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).removeClass(this.getZclass() + '-close-over');
			break;
		case this.$n('max'):
			var zcls = this.getZclass(),
				$max = jq(this.$n('max'));
			if (this.isMaximized())
				$max.removeClass(zcls + '-maxd-over');
			$max.removeClass(zcls + '-max-over');
			break;
		case this.$n('min'):
			jq(this.$n('min')).removeClass(this.getZclass() + '-min-over');
			break;
		}
		this.$supers('doMouseOut_', arguments);
	},
	
	afterChildrenMinFlex_: function (orient) {
		this.$supers('afterChildrenMinFlex_', arguments);
		if (this._mode == 'modal') { 
			this._updateDomPos(true); 
		}
	},
	
	afterChildrenFlex_: function (cwgt) {
		this.$supers('afterChildrenFlex_', arguments);
		if (this._mode == 'modal') {
			this._updateDomPos(true); 
		}
	}
},{ 
	
	_startsizing: function (dg) {
		zWatch.fire('onFloatUp', dg.control); 
	},
	_ghostsizing: function (dg, ofs, evt) {
		var wnd = dg.control,
			el = dg.node;
		wnd._hideShadow();
		wnd.setTopmost();
		var $el = jq(el);
		jq(document.body).append(
			'<div id="zk_ddghost" class="' + wnd.getZclass() + '-resize-faker"'
			+' style="position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$el.zk.offsetWidth()+'px;height:'+$el.zk.offsetHeight()
			+'px;z-index:'+el.style.zIndex+'"><dl></dl></div>');
		return jq('#zk_ddghost')[0];
	},
	_endghostsizing: function (dg, origin) {
		var el = dg.node; 
		if (origin) {
			dg.z_szofs = {
				top: el.offsetTop + 'px', left: el.offsetLeft + 'px',
				height: jq.px0(zk(el).revisedHeight(el.offsetHeight)),
				width: jq.px0(zk(el).revisedWidth(el.offsetWidth))
			};
		}
	},
	_insizer: function(node, ofs, x, y) {
		var r = ofs[0] + node.offsetWidth, b = ofs[1] + node.offsetHeight;
		if (x - ofs[0] <= 5) {
			if (y - ofs[1] <= 5)
				return 8;
			else if (b - y <= 5)
				return 6;
			else
				return 7;
		} else if (r - x <= 5) {
			if (y - ofs[1] <= 5)
				return 2;
			else if (b - y <= 5)
				return 4;
			else
				return 3;
		} else {
			if (y - ofs[1] <= 5)
				return 1;
			else if (b - y <= 5)
				return 5;
		}
	},
	_ignoresizing: function (dg, pointer, evt) {
		var el = dg.node,
			wgt = dg.control;
		if (wgt.isMaximized()) return true;

		var offs = zk(el).revisedOffset(),
			v = wgt.$class._insizer(el, offs, pointer[0], pointer[1]);
		if (v) {
			wgt._hideShadow();
			dg.z_dir = v;
			dg.z_box = {
				top: offs[1], left: offs[0] ,height: el.offsetHeight,
				width: el.offsetWidth, minHeight: zk.parseInt(wgt.getMinheight()),
				minWidth: zk.parseInt(wgt.getMinwidth())
			};
			dg.z_orgzi = el.style.zIndex;
			return false;
		}
		return true;
	},
	_aftersizing: function (dg, evt) {
		var wgt = dg.control,
			data = dg.z_szofs;
		wgt.fire('onSize', zk.copy(data, evt.keys), {ignorable: true});
		dg.z_szofs = null;
	},
	_drawsizing: function(dg, pointer, evt) {
		if (dg.z_dir == 8 || dg.z_dir <= 2) {
			var h = dg.z_box.height + dg.z_box.top - pointer[1];
			if (h < dg.z_box.minHeight) {
				pointer[1] = dg.z_box.height + dg.z_box.top - dg.z_box.minHeight;
				h = dg.z_box.minHeight;
			}
			dg.node.style.height = jq.px0(h);
			dg.node.style.top = jq.px(pointer[1]);
		}
		if (dg.z_dir >= 4 && dg.z_dir <= 6) {
			var h = dg.z_box.height + pointer[1] - dg.z_box.top;
			if (h < dg.z_box.minHeight)
				h = dg.z_box.minHeight;
			dg.node.style.height = jq.px0(h);
		}
		if (dg.z_dir >= 6 && dg.z_dir <= 8) {
			var w = dg.z_box.width + dg.z_box.left - pointer[0];
			if (w < dg.z_box.minWidth) {
				pointer[0] = dg.z_box.width + dg.z_box.left - dg.z_box.minWidth;
				w = dg.z_box.minWidth;
			}
			dg.node.style.width = jq.px0(w);
			dg.node.style.left = jq.px(pointer[0]);
		}
		if (dg.z_dir >= 2 && dg.z_dir <= 4) {
			var w = dg.z_box.width + pointer[0] - dg.z_box.left;
			if (w < dg.z_box.minWidth)
				w = dg.z_box.minWidth;
			dg.node.style.width = jq.px0(w);
		}
	}
});

zul.wnd.Skipper = zk.$extends(zk.Skipper, {
	$init: function (wnd) {
		this._w = wnd;
	},
	restore: function () {
		this.$supers('restore', arguments);
		var w = this._w;
		if (w._mode != 'embedded') {
			w._updateDomPos(); 
			w.zsync();
		}
	}
});
})();
zkreg('zul.wnd.Window',true);zk._m={};
zk._m['default']=
function (out, skipper) {
	var zcls = this.getZclass(),
		uuid = this.uuid,
		title = this.getTitle(),
		caption = this.caption,
		contentStyle = this.getContentStyle(),
		contentSclass = this.getContentSclass(),
		mode = this.getMode(),
		withFrame = 'embedded' != mode && 'popup' != mode,
		noborder = 'normal' != this.getBorder() ? '-noborder' : '';
		
	out.push('<div', this.domAttrs_(), '>');

	if (caption || title) {
		out.push('<div class="', zcls, '-tl"><div class="',
			zcls, '-tr"></div></div><div class="',
			zcls, '-hl"><div class="', zcls,
			'-hr"><div class="', zcls, '-hm"><div id="',
			uuid, '-cap" class="', zcls, '-header">');

		if (caption) caption.redraw(out);
		else {
			if (this.isClosable())
				out.push('<div id="', uuid, '-close" class="', zcls, '-icon ', zcls, '-close"></div>');
			if (this.isMaximizable()) {
				out.push('<div id="', uuid, '-max" class="', zcls, '-icon ', zcls, '-max');
				if (this.isMaximized())
					out.push(' ', zcls, '-maxd');
				out.push('"></div>');
			}
			if (this.isMinimizable())
				out.push('<div id="' + uuid, '-min" class="', zcls, '-icon ', zcls, '-min"></div>');
			out.push(zUtl.encodeXML(title));
		}
		out.push('</div></div></div></div>');
	} else if (withFrame)
		out.push('<div class="', zcls, '-tl', noborder,
				'"><div class="', zcls, '-tr', noborder, '"></div></div>');

	if (withFrame)
		out.push('<div class="', zcls, '-cl', noborder,
			'"><div class="', zcls, '-cr', noborder,
			'"><div class="', zcls, '-cm', noborder, '">');

	out.push('<div id="', uuid, '-cave" class="');
	if (contentSclass) out.push(contentSclass, ' ');
	out.push(zcls, '-cnt', noborder, '"');
	if (contentStyle) out.push(' style="', contentStyle, '"');
	out.push('>');

	if (!skipper)
		for (var w = this.firstChild; w; w = w.nextSibling)
			if (w != caption)
				w.redraw(out);

	out.push('</div>');

	if (withFrame)
		out.push('</div></div></div><div class="', zcls, '-bl', noborder,
			'"><div class="', zcls, '-br', noborder, '"></div></div>');

	out.push('</div>');
}
;zkmld(zk._p.p.Window,zk._m);

zul.wnd.Panel = zk.$extends(zul.Widget, {
	_border: "none",
	_title: "",
	_open: true,
	_minheight: 100,
	_minwidth: 200,

	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onMaximize: this, onClose: this, onMove: this, onSize: this.onSizeEvent}, -1000);
	},

	$define: {
		
		
		minheight: null, 
		
		
		minwidth: null, 
		
		
		sizable: function (sizable) {
			if (this.desktop) {
				if (sizable)
					this._makeSizer();
				else if (this._sizer) {
					this._sizer.destroy();
					this._sizer = null;
				}
			}
		},
		
		
		framable: _zkf = function () {
			this.rerender(); 
		},
		
		
		movable: _zkf,
		
		
		floatable: _zkf,
		
		
		maximizable: _zkf,
		
		
		minimizable: _zkf,
		
		
		collapsible: _zkf,
		
		
		closable: _zkf,
		
		
		border: _zkf,
		
		
		title: _zkf,
		
		
		open: function (open, fromServer) {
			var node = this.$n();
			if (node) {
				var zcls = this.getZclass(),
					$body = jq(this.$n('body'));
				if ($body[0] && !$body.is(':animated')) {
					if (open) {
						jq(node).removeClass(zcls + '-colpsd');
						$body.zk.slideDown(this);
					} else {
						jq(node).addClass(zcls + '-colpsd');
						this._hideShadow();
						
						if (zk.ie6_ && !node.style.width)
							node.runtimeStyle.width = "100%";
						$body.zk.slideUp(this);
					}
					if (!fromServer) this.fire('onOpen', {open:open});
				}
			}
		},
		
		
		maximized: function (maximized, fromServer) {
			var node = this.$n();
			if (node) {
				var $n = zk(node),
					isRealVisible = $n.isRealVisible();
				if (!isRealVisible && maximized) return;
	
				var l, t, w, h, s = node.style, cls = this.getZclass();
				if (maximized) {
					jq(this.$n('max')).addClass(cls + '-maxd');
					this._hideShadow();
	
					if (this.isCollapsible() && !this.isOpen()) {
						$n.jq.removeClass(cls + '-colpsd');
						var body = this.$n('body');
						if (body) body.style.display = "";
					}
					var floated = this.isFloatable(),
						$op = floated ? jq(node).offsetParent() : jq(node).parent();
					var sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
					
					if (zk.isLoaded('zkmax.layout') && this.parent.$instanceof(zkmax.layout.Portalchildren)) {
						var layout = this.parent.parent;
						if (layout.getMaximizedMode() == 'whole') {
							this._inWholeMode = true;
							var p = layout.$n();
							sh = zk.ie6_ && p.clientHeight == 0 ? p.offsetHeight - jq(p).zk.borderHeight() : p.clientHeight;
							node._scrollTop = p.parentNode.scrollTop; 
							p.parentNode.scrollTop = 0;
							$n.makeVParent();
							
							node._pos = node.style.position;
							node._ppos = p.style.position;
							node._zindex = node.style.zIndex;
							node.style.position = 'absolute';
							this.setFloating_(true);
							this.setTopmost();
							p.appendChild(node);
							p.style.position = 'relative';
							if (!p.style.height) {
								p.style.height = jq.px0(sh);
								node._pheight = true;
							}
						}
					}
					var floated = this.isFloatable(),
						$op = floated ? jq(node).offsetParent() : jq(node).parent();
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;
	
					
					s.top = "-10000px";
					s.left = "-10000px";
	
					
					var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth;
					
					if (!floated) {
						sw -= $op.zk.paddingWidth();
						sw = $n.revisedWidth(sw);
						sh -= $op.zk.paddingHeight();
						sh = $n.revisedHeight(sh);
					}
					s.width = jq.px0(sw);
					s.height = jq.px0(sh);
					this._lastSize = {l:l, t:t, w:w, h:h};
	
					
					s.top = "0";
					s.left = "0";

					
					w = s.width;
					h = s.height;
				} else {
					var max = this.$n('max'),
						$max = jq(max);
					$max.removeClass(cls + "-maxd").removeClass(cls + "-maxd-over");
					if (this._lastSize) {
						s.left = this._lastSize.l;
						s.top = this._lastSize.t;
						s.width = this._lastSize.w;
						s.height = this._lastSize.h;
						this._lastSize = null;
					}
					l = s.left;
					t = s.top;
					w = s.width;
					h = s.height;
					if (this.isCollapsible() && !this.isOpen()) {
						jq(node).addClass(cls + "-colpsd");
						var body = this.$n('body');
						if (body) body.style.display = "none";
					}
					var body = this.panelchildren ? this.panelchildren.$n() : null;
					if (body)
						body.style.width = body.style.height = "";
						
					if (this._inWholeMode) {
						$n.undoVParent();
						node.style.position = node._pos;
						node.style.zIndex = node._zindex;
						this.setFloating_(false);
						var p = this.parent.parent.$n();
						p.style.position = node._ppos;
						p.parentNode.scrollTop = node._scrollTop;
						if (node._pheight)
							p.style.height = "";
						node._scrollTop = node._ppos = node._zindex = node._pos = node._pheight = null;
						this._inWholeMode = false;
					}
				}
				if (!fromServer && isRealVisible) {
					this._visible = true;
					this.fire('onMaximize', {
						left: l,
						top: t,
						width: w,
						height: h,
						maximized: maximized,
						fromServer: fromServer
					});
				}
				if (isRealVisible) {
					this.__maximized = true;
					zWatch.fireDown('beforeSize', this);
					zWatch.fireDown('onSize', this);
				}
			}
		},
		
		
		minimized: function (minimized, fromServer) {
			if (this.isMaximized())
				this.setMaximized(false);
				
			var node = this.$n();
			if (node) {
				var s = node.style, l = s.left, t = s.top, w = s.width, h = s.height;
				if (minimized) {
					zWatch.fireDown('onHide', this);
					jq(node).hide();
				} else {
					jq(node).show();
					zWatch.fireDown('onShow', this);
				}
				if (!fromServer) {
					this._visible = false;
					this.fire('onMinimize', {
						left: s.left,
						top: s.top,
						width: s.width,
						height: s.height,
						minimized: minimized
					});
				}
			}
		}
	},

	
	setVisible: function (visible) {
		if (this._visible != visible) {
			if (this.isMaximized()) {
				this.setMaximized(false);
			} else if (this.isMinimized()) {
				this.setMinimized(false);
			}
			this.$supers('setVisible', arguments);
		}
	},
	setHeight: function () {
		this.$supers('setHeight', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setWidth: function () {
		this.$supers('setWidth', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setTop: function () {
		this._hideShadow();
		this.$supers('setTop', arguments);
		this.zsync();

	},
	setLeft: function () {
		this._hideShadow();
		this.$supers('setLeft', arguments);
		this.zsync();
	},
	updateDomStyle_: function () {
		this.$supers('updateDomStyle_', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	
	addToolbar: function (name, toolbar) {
		switch (name) {
			case 'tbar':
				this.tbar = toolbar;
				break;
			case 'bbar':
				this.bbar = toolbar;
				break;
			case 'fbar':
				this.fbar = toolbar;
				break;
			default: return false; 
		}
		return this.appendChild(toolbar);
	},
	
	onClose: function () {
		if (!this.inServer || !this.isListen('onClose', {asapOnly: 1})) 
			this.parent.removeChild(this); 
	},
	onMove: function (evt) {
		this._left = evt.left;
		this._top = evt.top;
	},
	onMaximize: function (evt) {
		var data = evt.data;
		this._top = data.top;
		this._left = data.left;
		this._height = data.height;
		this._width = data.width;
	},
	onSizeEvent: function (evt) {
		var data = evt.data,
			node = this.$n(),
			s = node.style;
			
		this._hideShadow();
		if (data.width != s.width) {
			s.width = data.width;
		}
		if (data.height != s.height) {
			s.height = data.height;
			this._fixHgh();
		}
				
		if (data.left != s.left || data.top != s.top) {
			s.left = data.left;
			s.top = data.top;
			
			this.fire('onMove', zk.copy({
				left: node.style.left,
				top: node.style.top
			}, evt.data), {ignorable: true});
		}
		
		this.zsync();
		var self = this;
		setTimeout(function() {
			zWatch.fireDown('beforeSize', self);
			zWatch.fireDown('onSize', self);
		}, zk.ie6_ ? 800: 0);
	},
	beforeSize: function() {
		
		if (this.isMaximized() && !this.__maximized)
			this.$n().style.width="";
	},
	
	onSize: _zkf = (function() {
		function syncMaximized (wgt) {
			if (!wgt._lastSize) return;
			var node = wgt.$n(),
				$n = zk(node),
				floated = wgt.isFloatable(),
				$op = floated ? jq(node).offsetParent() : jq(node).parent(),
				s = node.style;
		
			
			var sw = zk.ie6_ && $op[0].clientWidth == 0 ? $op[0].offsetWidth - $op.zk.borderWidth() : $op[0].clientWidth;
			if (!floated) {
				sw -= $op.zk.paddingWidth();
				sw = $n.revisedWidth(sw);
			}
			s.width = jq.px0(sw);
			if (wgt.isOpen()) {
				var sh = zk.ie6_ && $op[0].clientHeight == 0 ? $op[0].offsetHeight - $op.zk.borderHeight() : $op[0].clientHeight;
				if (!floated) {
					sh -= $op.zk.paddingHeight();
					sh = $n.revisedHeight(sh);
				}
				s.height = jq.px0(sh);
			}
		}
		return function(ctl) {
			this._hideShadow();
			if (this.isMaximized()) {
				if (!this.__maximized)
					syncMaximized(this);
				this.__maximized = false; 
			}
			
			if (this.tbar)
				ctl.fireDown(this.tbar);
			if (this.bbar)
				ctl.fireDown(this.bbar);
			if (this.fbar)
				ctl.fireDown(this.fbar);
			this._fixHgh();
			this.zsync();
		};
	})(),
	onShow: _zkf,
	onHide: function () {
		this._hideShadow();
	},
	_fixHgh: function () {
		var pc;
		if (!(pc=this.panelchildren) || pc.z_rod || !this.isRealVisible()) return;
		var n = this.$n(),
			body = pc.$n(),
			hgh = n.style.height;
		if (zk.ie6_ && ((hgh && hgh != "auto" )|| body.style.height)) body.style.height = "0";
		if (hgh && hgh != "auto")
			zk(body).setOffsetHeight(this._offsetHeight(n));
		if (zk.ie6_) zk(body).redoCSS();
	},
	_offsetHeight: function (n) {
		var h = n.offsetHeight - this._titleHeight(n);
		if (this.isFramable()) {
			var body = this.panelchildren.$n(),
				bl = jq(this.$n('body')).find(':last')[0],
				title = this.$n('cap');
			h -= bl.offsetHeight;
			if (body)
				h -= zk(body.parentNode).padBorderHeight();
			if (title)
				h -= zk(title.parentNode).padBorderHeight();
		}
		h -= zk(n).padBorderHeight();
		var tb = this.$n('tb'),
			bb = this.$n('bb'),
			fb = this.$n('fb');
		if (tb) h -= tb.offsetHeight;
		if (bb) h -= bb.offsetHeight;
		if (fb) h -= fb.offsetHeight;
		return h;
	},
	_titleHeight: function (n) {
		var isFramable = this.isFramable(),
			cap = this.$n('cap'),
			top = isFramable ? jq(n).find('> div:first-child')[0].offsetHeight: 0;
		return cap ? (isFramable ? jq(n).find('> div:first-child').next()[0]: cap).offsetHeight + top: top;
	},
	onFloatUp: function (ctl) {
		if (!this.isVisible() || !this.isFloatable())
			return; 

		for (var wgt = ctl.origin; wgt; wgt = wgt.parent) {
			if (wgt == this) {
				this.setTopmost();
				return;
			}
			if (wgt.isFloating_())
				return;
		}
	},
	getZclass: function () {
		return this._zclass == null ?  "z-panel" : this._zclass;
	},
	_makeSizer: function () {
		if (!this._sizer) {
			var Panel = this.$class;
			this._sizer = new zk.Draggable(this, null, {
				stackup: true, draw: Panel._drawsizing,
				starteffect: Panel._startsizing,
				ghosting: Panel._ghostsizing,
				endghosting: Panel._endghostsizing,
				ignoredrag: Panel._ignoresizing,
				endeffect: Panel._aftersizing});
		}
	},
	_initFloat: function () {
		var n = this.$n();
		if (!n.style.top || !n.style.left) {
			var xy = zk(n).revisedOffset();
			n.style.left = jq.px(xy[0]);
			n.style.top = jq.px(xy[1]);
		}

		n.style.position = "absolute";
		if (this.isMovable())
			this._initMove();

		this.zsync();

		if (this.isRealVisible())
			this.setTopmost();
	},
	_initMove: function (cmp) {
		var handle = this.$n('cap');
		if (handle && !this._drag) {
			handle.style.cursor = "move";
			var $Panel = this.$class;
			this._drag = new zk.Draggable(this, null, {
				handle: handle, stackup: true,
				starteffect: $Panel._startmove,
				ignoredrag: $Panel._ignoremove,
				endeffect: $Panel._aftermove});
		}
	},
	zsync: function () {
		this.$supers('zsync', arguments);

		if (!this.isFloatable()) {
			if (this._shadow) {
				this._shadow.destroy();
				this._shadow = null;
			}
		} else {
			var body = this.$n('body');
			if (body && zk(body).isRealVisible()) {
				if (!this._shadow) 
					this._shadow = new zk.eff.Shadow(this.$n(), {
						left: -4, right: 4, top: -2, bottom: 3
					});
					
				if (this.isMaximized() || this.isMinimized())
					this._hideShadow();
				else this._shadow.sync();
			}
		}
	},
	_hideShadow: function () {
		var shadow = this._shadow;
		if (shadow) shadow.hide();
	},
	
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.wnd.Panel, 'bind_', arguments);

		zWatch.listen({onSize: this, onShow: this, onHide: this});

		
		if (zk.ie6_)
			zWatch.listen({beforeSize: this});

		var uuid = this.uuid,
			$Panel = this.$class;

		if (this._sizable)
			this._makeSizer();
		
		this.domListen_(this.$n(), 'onMouseOver');
			
		if (this.isFloatable()) {
			zWatch.listen({onFloatUp: this});
			this.setFloating_(true);
			this._initFloat();
			if (!zk.css3)
				jq.onzsync(this); 
		}
		
		if (this.isMaximizable() && this.isMaximized()) {
			var self = this;
			after.push(function() {
				self._maximized = false;
				self.setMaximized(true, true);				
			});
		}
	},
	unbind_: function () {
		if (this._inWholeMode) {
			var node = this.$n();
			zk(node).undoVParent();
			var p = this.parent;
			if (p && (p = p.parent) && (p = p.$n())) {
				p.style.position = node._ppos;
				p.parentNode.scrollTop = node._scrollTop;
			}
			node._scrollTop = node._ppos = node._zindex = node._pos = null;
			this._inWholeMode = false;
		}
		zWatch.unlisten({onSize: this, onShow: this, onHide: this, onFloatUp: this});
		if (zk.ie6_)
			zWatch.unlisten({beforeSize: this});
		this.setFloating_(false);
		
		if (!zk.css3) jq.unzsync(this);

		if (this._shadow) {
			this._shadow.destroy();
			this._shadow = null;
		}
		if (this._drag) {
			this._drag.destroy();
			this._drag = null;
		}
		this.domUnlisten_(this.$n(), 'onMouseOver');
		this.$supers(zul.wnd.Panel, 'unbind_', arguments);
	},
	_doMouseOver: function (evt) {
		if (this._sizer) {
			var n = this.$n(),
				c = this.$class._insizer(n, zk(n).revisedOffset(), evt.pageX, evt.pageY),
				handle = this.isMovable() ? this.$n('cap') : false;
			if (!this.isMaximized() && this.isOpen() && c) {
				if (this._backupCursor == undefined)
					this._backupCursor = n.style.cursor;
				n.style.cursor = c == 1 ? 'n-resize': c == 2 ? 'ne-resize':
					c == 3 ? 'e-resize': c == 4 ? 'se-resize':
					c == 5 ? 's-resize': c == 6 ? 'sw-resize':
					c == 7 ? 'w-resize': 'nw-resize';
				if (handle) handle.style.cursor = "";
			} else {
				n.style.cursor = this._backupCursor;
				if (handle) handle.style.cursor = "move";
			}
		}
	},
	doClick_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			this.fire('onClose');
			break;
		case this.$n('max'):
			this.setMaximized(!this.isMaximized());
			break;
		case this.$n('min'):
			this.setMinimized(!this.isMinimized());
			break;
		case this.$n('exp'):
			var body = this.$n('body'),
				open = body ? zk(body).isVisible() : this.isOpen();
				
			
			if (!open == this.isOpen())
				this._open = open;
			this.setOpen(!open);
			break;
		default:
			this.$supers('doClick_', arguments);
			return;
		}
		evt.stop();
	},
	doMouseOver_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).addClass(this.getZclass() + '-close-over');
			break;
		case this.$n('max'):
			var zcls = this.getZclass(),
				added = this.isMaximized() ? ' ' + zcls + '-maxd-over' : '';
			jq(this.$n('max')).addClass(zcls + '-max-over' + added);
			break;
		case this.$n('min'):
			jq(this.$n('min')).addClass(this.getZclass() + '-min-over');
			break;
		case this.$n('exp'):
			jq(this.$n('exp')).addClass(this.getZclass() + '-exp-over');
			break;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('close'):
			jq(this.$n('close')).removeClass(this.getZclass() + '-close-over');
			break;
		case this.$n('max'):
			var zcls = this.getZclass(),
				$n = jq(this.$n('max'));
			if (this.isMaximized())
				$n.removeClass(zcls + '-maxd-over');
			$n.removeClass(zcls + '-max-over');
			break;
		case this.$n('min'):
			jq(this.$n('min')).removeClass(this.getZclass() + '-min-over');
			break;
		case this.$n('exp'):
			jq(this.$n('exp')).removeClass(this.getZclass() + '-exp-over');
			break;
		}
		this.$supers('doMouseOut_', arguments);
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass();
			var added = "normal" == this.getBorder() ? '' : zcls + '-noborder';
			if (added) scls += (scls ? ' ': '') + added;
			added = this.isOpen() ? '' : zcls + '-colpsd';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.wgt.Caption))
			this.caption = child;
		else if (child.$instanceof(zul.wnd.Panelchildren))
			this.panelchildren = child;
		else if (child.$instanceof(zul.wgt.Toolbar)) {
			if (this.firstChild == child || (this.nChildren == (this.caption ? 2 : 1)))
				this.tbar = child;
			else if (this.lastChild == child && child.previousSibling.$instanceof(zul.wgt.Toolbar))
				this.fbar = child;
			else if (child.previousSibling.$instanceof(zul.wnd.Panelchildren))
				this.bbar = child;
		}
		this.rerender();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.caption)
			this.caption = null;
		else if (child == this.panelchildren)
			this.panelchildren = null;
		else if (child == this.tbar)
			this.tbar = null;
		else if (child == this.bbar)
			this.bbar = null;
		else if (child == this.fbar)
			this.fbar = null;
		if (!this.childReplacing_)
			this.rerender();
	}
}, { 
	
	_startmove: function (dg) {
		dg.control._hideShadow();
		
		var el = dg.node;
		if(el.style.top && el.style.top.indexOf("%") >= 0)
			 el.style.top = el.offsetTop + "px";
		if(el.style.left && el.style.left.indexOf("%") >= 0)
			 el.style.left = el.offsetLeft + "px";
		
	},
	_ignoremove: function (dg, pointer, evt) {
		var wgt = dg.control;
		switch (evt.domTarget) {
		case wgt.$n('close'):
		case wgt.$n('max'):
		case wgt.$n('min'):
		case wgt.$n('exp'):
			return true; 
		}
		return false;
	},
	_aftermove: function (dg, evt) {
		dg.control.zsync();
	},
	
	_startsizing: zul.wnd.Window._startsizing,
	_ghostsizing: zul.wnd.Window._ghostsizing,
	_endghostsizing: zul.wnd.Window._endghostsizing,
	_insizer: zul.wnd.Window._insizer,
	_ignoresizing: function (dg, pointer, evt) {
		var el = dg.node,
			wgt = dg.control;
		if (wgt.isMaximized() || !wgt.isOpen()) return true;

		var offs = zk(el).revisedOffset(),
			v = wgt.$class._insizer(el, offs, pointer[0], pointer[1]);
		if (v) {
			wgt._hideShadow();
			dg.z_dir = v;
			dg.z_box = {
				top: offs[1], left: offs[0] ,height: el.offsetHeight,
				width: el.offsetWidth, minHeight: zk.parseInt(wgt.getMinheight()),
				minWidth: zk.parseInt(wgt.getMinwidth())
			};
			dg.z_orgzi = el.style.zIndex;
			return false;
		}
		return true;
	},
	_aftersizing: zul.wnd.Window._aftersizing,
	_drawsizing: zul.wnd.Window._drawsizing
});

zkreg('zul.wnd.Panel');zk._m={};
zk._m['default']=
function (out, skipper) {
	var zcls = this.getZclass(),
		uuid = this.uuid,
		title = this.getTitle(),
		caption = this.caption,
		framable = this.isFramable(),
		noborder = this.getBorder() != 'normal',
		noheader = !caption && !title;
		
	out.push('<div', this.domAttrs_(), '>');
	if (caption || title) {
		if (framable) {
			out.push('<div class="', zcls, '-tl"><div class="', zcls, '-tr"></div></div>');
			out.push('<div class="', zcls, '-hl"><div class="', zcls, '-hr"><div class="', zcls, '-hm">');
		}
		out.push('<div id="', uuid, '-cap" class="', zcls, '-header ');
			if (!framable && noborder) {
				out.push(zcls, '-header-noborder');		
			}
		out.push('">');
		if (!caption) {
			if (this.isClosable())
				out.push('<div id="', uuid, '-close" class="', zcls, '-icon ',
						zcls, '-close"></div>');
			if (this.isMaximizable()) {
				out.push('<div id="', uuid, '-max" class="', zcls, '-icon ', zcls, '-max');
				if (this.isMaximized())
					out.push(' ', zcls, '-maxd');
				out.push('"></div>');
			}
			if (this.isMinimizable())
				out.push('<div id="', uuid, '-min" class="', zcls, '-icon ',
						zcls, '-min"></div>');
			if (this.isCollapsible())
				out.push('<div id="', uuid, '-exp" class="', zcls, '-icon ',
						zcls, '-exp"></div>');
			out.push(zUtl.encodeXML(title));
		} else caption.redraw(out);
		
		out.push('</div>');
		
		if (framable) out.push('</div></div></div>');
	} else if (framable) {
		out.push('<div class="', zcls,'-tl"><div class="' ,zcls ,'-tr"></div></div>');		
	}
			
	
	out.push('<div id="', uuid, '-body" class="', zcls, '-body"');
	
	if (!this.isOpen()) out.push(' style="display:none;"');
	
	out.push('>');
	
	if (framable) {
		out.push('<div class="', zcls, '-cl"><div class="', zcls,
				'-cr"><div class="', zcls, '-cm');
		if (noheader) {
			out.push(' ', zcls, '-noheader');
		}
		out.push('">');		
	}
	if (this.tbar) {
		out.push('<div id="', uuid, '-tb" class="', zcls, '-top');
		
		if (noborder)
			out.push(' ', zcls, '-top-noborder');
		
		if (noheader)
			out.push(' ', zcls, '-noheader');
		
		out.push('">');
		this.tbar.redraw(out);
		out.push('</div>');
	}
	if (this.panelchildren)
		this.panelchildren.redraw(out);
		
	if (this.bbar) {
		out.push('<div id="', uuid, '-bb" class="', zcls, '-btm');
		
		if (noborder)
			out.push(' ', zcls, '-btm-noborder');
			
		if (noheader)
			out.push(' ', zcls, '-noheader');
		
		out.push('">');
		this.bbar.redraw(out);
		out.push('</div>');
	}
	
	if (framable) {
		out.push('</div></div></div><div class="', zcls, '-fl');
		
		if (!this.fbar) out.push(' ', zcls, '-nobtm2');
		
		out.push('"><div class="', zcls, '-fr"><div class="', zcls, '-fm">');
	}
	if (this.fbar) {
		out.push('<div id="', uuid, '-fb" class="', zcls, '-btm2">');
		this.fbar.redraw(out);
		out.push('</div>');
	}
	if (framable) out.push('</div></div></div><div class="', zcls ,'-bl"><div class="', zcls ,'-br"></div></div>');
	out.push('</div></div>');
}
;zkmld(zk._p.p.Panel,zk._m);

zul.wnd.Panelchildren = zk.$extends(zul.Widget, {
	
	setHeight: zk.$void,      
	
	setWidth: zk.$void,       

	
	getZclass: function () {
		return this._zclass == null ?  "z-panel-children" : this._zclass;
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var zcls = this.getZclass();
			var added = !this.parent.getTitle() && !this.parent.caption ?
				zcls + '-noheader' : '';				
			if (added) scls += (scls ? ' ': '') + added;
			added = this.parent.getBorder() == 'normal' ? '' : zcls + '-noborder';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	updateDomStyle_: function () {
		this.$supers('updateDomStyle_', arguments);
		if (this.desktop) {
			zWatch.fireDown('beforeSize', this.parent);
			zWatch.fireDown('onSize', this.parent);
		}
	}
});
zkreg('zul.wnd.Panelchildren',true);zk._m={};
zk._m['default']=
function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
}

;zkmld(zk._p.p.Panelchildren,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.wnd',1);zk.load('zul.wgt',function(){zk._p=zkpi('zul.tab',true);try{



zul.tab.Tabbox = zk.$extends(zul.Widget, {
	_orient: "horizontal",
	_tabscroll: true,

	$define: {
    	
    	
		tabscroll: _zkf = function () {
			this.rerender();
		},
		
		
		orient: _zkf,
		
		
		panelSpacing: _zkf
	},
	
	getTabs: function () {
		return this.tabs;
	},
	
	getTabpanels: function () {
		return this.tabpanels;
	},
	
	getToolbar: function () {
		return this.toolbar;
	},
	getZclass: function () {
		return this._zclass == null ? "z-tabbox" +
			( this.inAccordionMold() ? "-" + this.getMold() : this.isVertical() ? "-ver" : "") : this._zclass;
	},
	
	isHorizontal: function() {
		return "horizontal" == this.getOrient();
	},
	
	isVertical: function() {
		return "vertical" == this.getOrient();
	},
	
	inAccordionMold: function () {
		return this.getMold().indexOf("accordion") != -1;
	},
	
	getSelectedIndex: function() {
		return this._selTab ? this._selTab.getIndex() : -1 ;
	},
	
	setSelectedIndex: function(index) {
		if (this.tabs)
			this.setSelectedTab(this.tabs.getChildAt(index));
	},
	
	getSelectedPanel: function() {
		return this._selTab ? this._selTab.getLinkedPanel() : null;
	},
	
	setSelectedPanel: function(panel) {
		if (panel && panel.getTabbox() != this)
			return
		var tab = panel.getLinkedTab();
		if (tab)
			this.setSelectedTab(tab);
	},
	
	getSelectedTab: function() {
		return this._selTab;
	},
	
	setSelectedTab: function(tab) {
		if (typeof tab == 'string')
			tab = zk.Widget.$(tab);
		if (this._selTab != tab) {
			if (tab)
				tab.setSelected(true);
				
			this._selTab = tab;
		}
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.tab.Tabbox, 'bind_', arguments);
		
		
		this._scrolling = false;
		var tab = this._selTab;
		
		if (tab)
			after.push(function() {
				tab.setSelected(true);
			});
	},
	
	removeChildHTML_: function (child) {
		this.$supers('removeChildHTML_', arguments);
		if (this.isVertical() && child.$instanceof(zul.tab.Tabs))
			jq(child.uuid + '-line', zk).remove();
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.wgt.Toolbar))
			this.toolbar = child;
		else if (child.$instanceof(zul.tab.Tabs))
			this.tabs = child;
		else if (child.$instanceof(zul.tab.Tabpanels)) {
			this.tabpanels = child;
		}
		this.rerender();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.toolbar)
			this.toolbar = null;
		else if (child == this.tabs)
			this.tabs = null;
		else if (child == this.tabpanels)
			this.tabpanels = null;
		if (!this.childReplacing_)
			this.rerender();
	},
	setWidth: function (width) {
		this.$supers('setWidth', arguments);
		if (this.desktop)
			zWatch.fireDown('onSize', this);
	},
	setHeight: function (height) {
		this.$supers('setHeight', arguments);
		if (this.desktop)
			zWatch.fireDown('onSize', this);
	}
});

zkreg('zul.tab.Tabbox');zk._m={};
zk._m['accordion-lite']=
function (out) {
	out.push('<div ', this.domAttrs_(), '>');
	var tps = this.getTabpanels();
	if (tps) tps.redraw(out);
	out.push("</div>");
}
;zk._m['default']=
function (out) {
	out.push('<div ', this.domAttrs_(), '>');
	if (this.tabs) this.tabs.redraw(out);
	if (this.tabpanels) this.tabpanels.redraw(out);
	if (this.isVertical())
		out.push('<div class="z-clear"></div>');
	out.push("</div>");
}
;zk._m['accordion']=
function (out) {
	out.push('<div ', this.domAttrs_(), '>');
	var tps = this.getTabpanels();
	if (tps) tps.redraw(out);
	out.push("</div>");
}
;zkmld(zk._p.p.Tabbox,zk._m);

zul.tab.Tabs = zk.$extends(zul.Widget, {
	
	getTabbox: function() {
		return this.parent;
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;
			
		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tabs';
		return "z-tabs" + (tabbox.getMold() == "default" && tabbox.isVertical() ? '-ver' : '');
	},
	onSize: _zkf = function () {
		this._fixWidth();
		
		
		this._scrollcheck("init");
	},
	onShow: _zkf,
	insertChildHTML_: function (child, before, desktop) {
		var last = child.previousSibling;
		if (before) 
			jq(before).before(child.redrawHTML_());
		else if (last) 
			jq(last).after(child.redrawHTML_());
		else {
			var edge = this.$n('edge');
			if (edge) 
				jq(edge).before(child.redrawHTML_());
			else
				jq(this.getCaveNode()).append(child.redrawHTML_());
		}
		child.bind(desktop);
	},
	domClass_: function (no) {
		var zcls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var tbx = this.getTabbox(),
				added = tbx.isTabscroll() ? zcls + "-scroll" : "";
			if (added) zcls += (zcls ? ' ': '') + added;
		}
		return zcls;
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabs, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabs, 'setHflex', v);
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.tab.Tabs, 'bind_', arguments);
		zWatch.listen({onSize: this, onShow: this});

		for (var btn, key = ['right', 'left', 'down', 'up'], le = key.length; le--;)
			if ((btn = this.$n(key[le])))
				this.domListen_(btn, "onClick");
		
		
		this._inited = false;
		
		var self = this;
		after.push(
			function () {
				self._inited = true;
			}
		);
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(zul.tab.Tabs, 'unbind_', arguments);
	},
	_isInited: function () {
		return this._inited;
	},
	_scrollcheck: function(way, tb) {
		var tabbox = this.getTabbox();
		if (!this.desktop || !tabbox.isRealVisible() || !tabbox.isTabscroll())
			return;

		var tbsdiv = this.$n(),
			tbx = tabbox.$n();
		if (!tbsdiv || !tbx) return;	
		if (tabbox.isVertical()) {
			var header = this.$n("header"),
				headerOffsetHeight = header.offsetHeight,
				headerScrollTop = header.scrollTop,
				childHeight = 0;
				
			jq(this.$n("cave")).children().each(function () {
				childHeight += this.offsetHeight;
			});

			if (tabbox._scrolling) { 
				var btnsize = this._getArrowSize();
				if (tbsdiv.offsetHeight < btnsize)  return;
				
				var sel = tabbox.getSelectedTab(),
					node = tb ? tb.$n() : (sel ? sel.$n() : null),
					nodeOffsetTop = node ? node.offsetTop : 0,
					nodeOffsetHeight = node ? node.offsetHeight : 0;
					
				if (childHeight <= headerOffsetHeight + btnsize) {
					tabbox._scrolling = false;
					this._showbutton(false)
					header.style.height = jq.px0(tbx.offsetHeight-2);
					header.scrollTop = 0;
				}
				switch (way) {
				case "end":
					var d = childHeight - headerOffsetHeight - headerScrollTop;
					this._doScroll(d >= 0 ? "down" : "up", d >= 0 ? d : Math.abs(d));
					break;
				case "init":
				case "vsel":
					if (nodeOffsetTop < headerScrollTop) {
						this._doScroll("up", headerScrollTop - nodeOffsetTop);
					} else if (nodeOffsetTop + nodeOffsetHeight > headerScrollTop + headerOffsetHeight) {
						this._doScroll("down", nodeOffsetTop + nodeOffsetHeight - headerScrollTop - headerOffsetHeight);
					}
					break;
				}
			} else { 
				if (childHeight - (headerOffsetHeight - 10) > 0) {
					tabbox._scrolling = true;
					this._showbutton(true);
					var btnsize = this._getArrowSize(),
						temp = tbx.offsetHeight - btnsize;
					header.style.height = temp > 0 ? temp + "px" : "";
					if (way == "end") {
						var d = childHeight - headerOffsetHeight - headerScrollTop + 2;
						if (d >= 0)
							this._doScroll(this.uuid, "down", d);
					}
				}
			}
		} else if(!tabbox.inAccordionMold()) {
			var cave = this.$n("cave"),
				header = this.$n("header"),
			 	sel = tabbox.getSelectedTab(),
				node = tb ? tb.$n() : ( sel ? sel.$n() : null),
			 	nodeOffsetLeft = node ? node.offsetLeft : 0,
				nodeOffsetWidth = node ? node.offsetWidth : 0,
				headerOffsetWidth = header.offsetWidth,
				headerScrollLeft = header.scrollLeft,
				childWidth = 0,
				toolbar = tabbox.toolbar;

			jq(cave).children().each(function () {
				childWidth += this.offsetWidth;
			});
			
			if (toolbar)
				toolbar = toolbar.$n();
			if (tabbox._scrolling) { 
				var btnsize = this._getArrowSize();
				if (toolbar) {
					var outer, hgh;
						
					
					if (zk.gecko2_) {
						outer = toolbar.parentNode.parentNode;
						outer.style.height = '';
						hgh = outer.offsetHeight;
					}
					this.$n('right').style.right = toolbar.offsetWidth + 'px';
					if (zk.gecko2_)
						outer.style.height = jq.px0(zk(outer).revisedHeight(hgh));
				}
				
				if (tbsdiv.offsetWidth < btnsize) return;
				if (childWidth <= headerOffsetWidth + btnsize) {
					tabbox._scrolling = false;
					this._showbutton(false);
					header.style.width = jq.px0(tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0));
					header.scrollLeft = 0;
				}
				
				switch (way) {
				case "end":
					var d = childWidth - headerOffsetWidth - headerScrollLeft;
					this._doScroll(d >= 0 ? "right" : "left", d >= 0 ? d : Math.abs(d));
					break;
				case "init":
				case "sel":
					if (nodeOffsetLeft < headerScrollLeft) {
						this._doScroll("left", headerScrollLeft - nodeOffsetLeft);
					} else if (nodeOffsetLeft + nodeOffsetWidth > headerScrollLeft + headerOffsetWidth) {
						this._doScroll("right", nodeOffsetLeft + nodeOffsetWidth - headerScrollLeft - headerOffsetWidth);
					}
					break;
				}
			} else { 
				if (childWidth - (headerOffsetWidth - 10) > 0) {
					tabbox._scrolling = true;
					this._showbutton(true);
					var cave = this.$n("cave"),
						btnsize = this._getArrowSize(),
						temp = tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0) - btnsize;
					cave.style.width = "5555px";
					header.style.width = temp > 0 ? temp + "px" : "";
					
					if (toolbar) 
						this.$n('right').style.right = toolbar.offsetWidth + 'px';
					
					if (way == "sel") {
						if (nodeOffsetLeft < headerScrollLeft) {
							this._doScroll("left", headerScrollLeft - nodeOffsetLeft);
						} else if (nodeOffsetLeft + nodeOffsetWidth > headerScrollLeft + headerOffsetWidth) {
							this._doScroll("right", nodeOffsetLeft + nodeOffsetWidth - headerScrollLeft - headerOffsetWidth);
						}
					}
				}
			}
		}
	},
	_doScroll: function(to, move) {
		if (!this._doingScroll)
			this._doingScroll = {};
		if (move <= 0 || this._doingScroll[to])
			return;
		var step,
			self = this,
			header = this.$n("header");
		
		this._doingScroll[to] = move;
		
		step = move <= 60 ? 5 : (5 * (zk.parseInt(move / 60) + 1));
		var run = setInterval(function() {
			if (!move) {
				delete self._doingScroll[to];
				clearInterval(run);
				return;
			} else {
				
				move < step ? goscroll(header, to, move) : goscroll(header, to, step);
				move -= step;
				move = move < 0 ? 0 : move;
			}
		}, 10);
		
		goscroll = function(header, to, step) {
			switch (to) {
			case 'right':
				header.scrollLeft += step;
				break;
			case 'left':
				header.scrollLeft -= step;
				break;
			case 'up':
				header.scrollTop -= step;
				break;
			default:
				header.scrollTop += step;
			}
			header.scrollLeft = (header.scrollLeft <= 0 ? 0 : header.scrollLeft);
			header.scrollTop = (header.scrollTop <= 0 ? 0 : header.scrollTop);
		}
	},
	_getArrowSize: function() {
		var tabbox = this.getTabbox(),
			isVer = tabbox.isVertical(),
			btnA = isVer ? this.$n("up") : this.$n("left"),
			btnB = isVer ? this.$n("down") : this.$n("right");
		return btnA && btnB ?
			(isVer ? btnA.offsetHeight + btnB.offsetHeight : btnA.offsetWidth + btnB.offsetWidth) : 0;
	},
	_showbutton : function(show) {
		var tabbox = this.getTabbox(),
			zcls = this.getZclass();
		if (tabbox.isTabscroll()) {
			var header = this.$n("header");
				
			if (tabbox.isVertical()) {
				if (show) {
					jq(header).addClass(zcls + "-header-scroll");
					jq(this.$n("down")).addClass(zcls + "-down-scroll");
					jq(this.$n("up")).addClass(zcls + "-up-scroll");
				} else {
					jq(header).removeClass(zcls + "-header-scroll");
					jq(this.$n("down")).removeClass(zcls + "-down-scroll");
					jq(this.$n("up")).removeClass(zcls + "-up-scroll");
				}				
			}else {
				if (show) {
					jq(header).addClass(zcls + "-header-scroll");
					jq(this.$n("right")).addClass(zcls + "-right-scroll");
					jq(this.$n("left")).addClass(zcls + "-left-scroll");
				} else {
					jq(header).removeClass(zcls + "-header-scroll");
					jq(this.$n("right")).removeClass(zcls + "-right-scroll");
					jq(this.$n("left")).removeClass(zcls + "-left-scroll");
				}		
			}
		}
	},
	_doClick: function(evt) {
		var cave = this.$n("cave"),
			allTab =  jq(cave).children();
		
		if (!allTab.length) return; 
			
		var ele = evt.domTarget,
			move = 0,
			tabbox = this.getTabbox(),
			head = this.$n("header"),
			scrollLength = tabbox.isVertical() ? head.scrollTop : head.scrollLeft,
			offsetLength = tabbox.isVertical() ? head.offsetHeight : head.offsetWidth,
			plus = scrollLength + offsetLength;
		
		
		if (ele.id == this.uuid + "-right") {
			for (var i = 0, count = allTab.length; i < count; i++) {
				if (allTab[i].offsetLeft + allTab[i].offsetWidth > plus) {
					move = allTab[i].offsetLeft + allTab[i].offsetWidth - scrollLength - offsetLength;
					if (!move || isNaN(move))
						return;
					this._doScroll("right", move);
					return;
				}
			}
		} else if (ele.id == this.uuid + "-left") {
			for (var i = 0, count = allTab.length; i < count; i++) {
				if (allTab[i].offsetLeft >= scrollLength) {
					
					var tabli = jq(allTab[i]).prev("li")[0];
					if (!tabli)  return;
					move = scrollLength - tabli.offsetLeft;
					if (isNaN(move)) return;
					this._doScroll("left", move);
					return;
				};
			};
			move = scrollLength - allTab[allTab.length-1].offsetLeft;
			if (isNaN(move)) return;
			this._doScroll("left", move);
			return;
		} else if (ele.id == this.uuid + "-up") {
				for (var i = 0, count = allTab.length; i < count; i++) {
					if (allTab[i].offsetTop >= scrollLength) {
						var preli = jq(allTab[i]).prev("li")[0];
						if (!preli) return;
						move = scrollLength - preli.offsetTop ;
						this._doScroll("up", move);
						return;
					};
				};
				var preli = allTab[allTab.length-1];
				if (!preli) return;
				move = scrollLength - preli.offsetTop ;
				this._doScroll("up", move);
				return;
		} else if (ele.id == this.uuid + "-down") {
			for (var i = 0, count = allTab.length; i < count; i++) {
				if (allTab[i].offsetTop + allTab[i].offsetHeight > plus) {
					move = allTab[i].offsetTop + allTab[i].offsetHeight - scrollLength - offsetLength;
					if (!move || isNaN(move)) return ;
					this._doScroll("down", move);
					return;
				};
			};
		}
	},
	_fixWidth: function() {
		var tabs = this.$n();
		
		var	tabbox = this.getTabbox(),
			tbx = tabbox.$n(),
			cave = this.$n("cave"),
			head = this.$n("header"),
			l = this.$n("left"),
			r = this.$n("right"),
			btnsize = tabbox._scrolling ? l && r ? l.offsetWidth + r.offsetWidth : 0 : 0;
			this._fixHgh();
			if (this.parent.isVertical()) {
				var most = 0;
				
				if (tabs.style.width) {
					tabs._width = tabs.style.width;
					;
				} else {
					
					this._forceStyle(tabs, "w", tabs._width ? tabs._width : "50px");
				}
			} else if (!tabbox.inAccordionMold()) {
				if (tbx.offsetWidth < btnsize) 
					return;
				if (tabbox.isTabscroll()) {
					var toolbar = tabbox.toolbar;
					if (toolbar) 
						toolbar = toolbar.$n();
					if (!tbx.style.width) {
						this._forceStyle(tbx, "w", "100%");
						this._forceStyle(tabs, "w", jq.px0(jq(tabs).zk.revisedWidth(tbx.offsetWidth)));
						if (tabbox._scrolling) 
							this._forceStyle(head, "w", jq.px0(tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0) - btnsize));
						else 
							this._forceStyle(head, "w", jq.px0(jq(head).zk.revisedWidth(tbx.offsetWidth - (toolbar ? toolbar.offsetWidth : 0))));
					} else {
						this._forceStyle(tabs, "w", jq.px0(jq(tabs).zk.revisedWidth(tbx.offsetWidth)));
						this._forceStyle(head, "w", tabs.style.width);
						if (tabbox._scrolling) 
							this._forceStyle(head, "w", jq.px0(head.offsetWidth - (toolbar ? toolbar.offsetWidth : 0) - btnsize));
						else 
							this._forceStyle(head, "w", jq.px0(head.offsetWidth - (toolbar ? toolbar.offsetWidth : 0)));
					}
					if (toolbar && tabbox._scrolling) 
						this.$n('right').style.right = toolbar.offsetWidth + 'px';
				} else {
					if (!tbx.style.width) {
						if (tbx.offsetWidth) {
							var ofw = jq.px0(tbx.offsetWidth);
							this._forceStyle(tbx, "w", ofw);
							this._forceStyle(tabs, "w", ofw);	
						}
					} else {
						this._forceStyle(tabs, "w", jq.px0(tbx.offsetWidth));
					}
				}
			}
	},
	_fixHgh: function () {
		var tabs = this.$n(),
			tabbox = this.getTabbox(),
			tbx = tabbox.$n(),
			head = this.$n("header"),
			u = this.$n("up"),
			d = this.$n("down"),
			cave =  this.$n("cave"),
			btnsize = u && d ? isNaN(u.offsetHeight + d.offsetHeight) ? 0 : u.offsetHeight + d.offsetHeight : 0;
		
		
		if (tabbox.isVertical()) {
			var child = jq(tbx).children('div');
			allTab = jq(cave).children();
			if (tbx.style.height) {
				this._forceStyle(tabs, "h", jq.px0(jq(tabs).zk.revisedHeight(tbx.offsetHeight, true)));
			} else {
				this._forceStyle(tbx, "h", jq.px0(allTab.length * 35));
				this._forceStyle(tabs, "h", jq.px0(jq(tabs).zk.revisedHeight(tbx.offsetHeight, true)));
			}
			
			if (tabbox._scrolling) {
				this._forceStyle(head, "h", jq.px0(tabs.offsetHeight - btnsize));
			} else {
				this._forceStyle(head, "h", jq.px0(jq(head).zk.revisedHeight(tabs.offsetHeight, true)));
			}
			
			this._forceStyle(child[1], "h", jq.px0(jq(child[1]).zk.revisedHeight(tabs.offsetHeight, true)));
			
			this._forceStyle(child[2], "h", jq.px0(jq(child[1]).zk.revisedHeight(tabs.offsetHeight, true)));
		} else {
			if (head) 
				head.style.height = "";
		}
	},

	_forceStyle: function(node, attr, value) {
		if (!value)	return;
		switch (attr) {
		case "h":
			node.style.height = zk.ie6_ ? "0px" : ""; 
			node.style.height = value;
			break;
		case "w":
			node.style.width = zk.ie6_ ? "0px" : ""; 
			node.style.width = "";
			node.style.width = value;
			break;
		}
	},

	onChildRemoved_: function (child) {
		var p = this.parent;
		if (p && child == p._selTab)
			p._selTab = null;
		this._scrollcheck("init");
		this.$supers("onChildRemoved_", arguments);
	},
	onChildAdded_: function () {
		this._scrollcheck("init");
		this.$supers("onChildAdded_", arguments);
	},
	
	ignoreFlexSize_: function(attr) {
		var p = this.getTabbox();
		return (p.isVertical() && 'h' == attr)
			|| (p.isHorizontal() && 'w' == attr); 
	}
});
zkreg('zul.tab.Tabs');zk._m={};
zk._m['default']=
function (out) {
	var zcls = this.getZclass(),
		tbx = this.getTabbox(),
		uuid = this.uuid;
	out.push('<div ', this.domAttrs_(), '>');
	if (tbx.isVertical()) {
		out.push('<div id="', uuid, '-header" class="', zcls, '-header">',
				'<ul id="', uuid, '-cave" class="', zcls, '-cnt">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('<li id="', uuid, '-edge" class="', zcls, '-edge" ></li></ul></div>',
				'<div id="', uuid, '-up"> </div>',
				'<div id="', uuid, '-down"></div></div><div id="', uuid,
				'-line" class="', zcls, '-space" ></div>');
	} else {
		var hasToolbar = tbx.isTabscroll() && tbx.toolbar;
		if (hasToolbar) {
			out.push('<div class="', tbx.toolbar.getZclass(), '-outer">');
				tbx.toolbar.redraw(out);	
		}
		out.push('<div id="', uuid, '-right">', '</div>',
			'<div id="', uuid, '-left">', '</div>', '<div id="', uuid, '-header"',
			' class="', zcls, '-header" >', '<ul id="', uuid, '-cave"', 'class="', zcls, '-cnt">');
			for (var w = this.firstChild; w; w = w.nextSibling)
				w.redraw(out);
		out.push('<li id="', uuid, '-edge"', ' class="', zcls, '-edge" ></li>',
			'<div id="',uuid,'-clear" class="z-clear"> </div>',
			'</ul></div>');
		if (hasToolbar)	out.push('</div>');	
		out.push('<div id="', uuid, '-line"',
			' class="', zcls, '-space" ></div></div>');
	}
}
;zkmld(zk._p.p.Tabs,zk._m);

zul.tab.Tab = zk.$extends(zul.LabelImageWidget, {
	$init: function () {
		this.$supers('$init', arguments);
		this.listen({onClose: this}, -1000);
	},
	$define: {
		
		
		closable: _zkf = function() {
			this.rerender();
		},
		image: _zkf,
		
		
		disabled: _zkf,
		
		
		selected: function(selected) {
			this._sel();
		}
	},
	
	getTabbox: function() {
		return this.parent ? this.parent.parent : null;
	},
	
	getIndex: function() {
		return this.getChildIndex();
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;

		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tab';

		var mold = tabbox.getMold();
		return 'z-tab' + (mold == 'default' ? (tabbox.isVertical() ? '-ver': '') : '-' + mold);
	},
	
	getLinkedPanel: function() {
		var w;
		return (w = this.getTabbox()) && (w = w.getTabpanels()) ?
			w.getChildAt(this.getIndex()): null;
	},
	_doCloseClick : function(evt) {
		if (!this._disabled) {
			this.fire('onClose');
			evt.stop();
		}
	},
	_toggleBtnOver : function(evt) {
		jq(evt.domTarget).toggleClass(this.getZclass() + "-close-over");
	},
	_sel: function(notify, init) {
		var tabbox = this.getTabbox();
		if (!tabbox) return;

		var	tabs = this.parent,
			oldtab = tabbox._selTab;
		if (oldtab != this || init) {
			if (oldtab && oldtab != this)
				this._setSel(oldtab, false, false, init);
			this._setSel(this, true, notify, init);
		}
	},
	_setSel: function(tab, toSel, notify, init) {
		var tabbox = this.getTabbox(),
			zcls = this.getZclass(),
			panel = tab.getLinkedPanel(),
			bound = this.desktop;
		if (tab.isSelected() == toSel && notify)
			return;

		if (toSel)
			tabbox._selTab = tab; 
		tab._selected = toSel;
		
		if (!bound) return;
		
		if (toSel)
			jq(tab).addClass(zcls + "-seld");
		else
			jq(tab).removeClass(zcls + "-seld");

		if (panel)
			panel._sel(toSel, !init);

		if (!tabbox.inAccordionMold()) {
			var tabs = this.parent;
			if (tabs) tabs._fixWidth();
		}
		
		if (tab == this) {
			if (tabbox.isVertical())
				tabs._scrollcheck("vsel", this);
			else if (!tabbox.inAccordionMold())
				tabs._scrollcheck("sel", this);
		}
		
		if (notify)
			this.fire('onSelect', {items: [this], reference: this.uuid});
	},
	
	doClick_: function(evt) {
		if (this._disabled)
			return;
		this._sel(true);
		this.$supers('doClick_', arguments);
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var added = this.isDisabled() ? this.getZclass() + '-disd' : '';
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	domContent_: function () {
		var label = zUtl.encodeXML(this.getLabel()),
			img = this.getImage();
		if (!label) label = '&nbsp;';
		if (!img) return label;
		img = '<img src="' + img + '" align="absmiddle" class="' + this.getZclass() + '-img"/>';
		return label ? img + ' ' + label: img;
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tab, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tab, 'setHflex', v);
	},
	bind_: function (desktop, skipper, after) {
		this.$supers(zul.tab.Tab, 'bind_', arguments);
		var closebtn = this.$n('close'),
			tab = this;
		if (closebtn) {
			this.domListen_(closebtn, "onClick", '_doCloseClick');
			if (!closebtn.style.cursor)
				closebtn.style.cursor = "default";
			if (zk.ie6_)
				this.domListen_(closebtn, "onMouseOver", '_toggleBtnOver')
					.domListen_(closebtn, "onMouseOut", '_toggleBtnOver');
		}

		after.push(function () {tab.parent._fixHgh();});
			
			
		after.push(function () {
			zk.afterMount(function () {
    			if (tab.isSelected()) 
    				tab._sel(false, true);
			});
		});
	},
	unbind_: function () {
		var closebtn = this.$n('close');
		if (closebtn) {
			this.domUnlisten_(closebtn, "onClick", '_doCloseClick');
			if (zk.ie6_)
				this.domUnlisten_(closebtn, "onMouseOver", '_toggleBtnOver')
					.domUnlisten_(closebtn, "onMouseOut", '_toggleBtnOver');
		}
		this.$supers(zul.tab.Tab, 'unbind_', arguments);
	},
	
	onClose: function () {
		if (this.isSelected()) {
			var self = this,
				p = this.parent;
			
			
			setTimeout(function () {
    			if (!self.parent || self.parent != p)
    				return; 
    			for (var tab = self; tab = tab.nextSibling;)
    				if (!tab.isDisabled()) {
    					tab._sel(true);
    					return;
    				}
    			for (var tab = self; tab = tab.previousSibling;)
    				if (!tab.isDisabled()) {
    					tab._sel(true);
    					return;
    				}
    		});
		}
	}
});

zkreg('zul.tab.Tab',true);zk._m={};
zk._m['default']=
function (out) {
	var zcls = this.getZclass(),
		tbx = this.getTabbox(),
		uuid = this.uuid;
	if (tbx.inAccordionMold()) {
		if (tbx.getMold() == 'accordion-lite') {
			out.push('<div id="', this.uuid, '"', this.domAttrs_(), '>',
				'<div align="left" class="', zcls, '-header">');
			if (this.isClosable())
				out.push('<a id="', this.uuid, '-close" class="', zcls, '-close"></a>');

			out.push('<div href="javascript:;" id="', this.uuid, '-tl" class="', zcls, '-tl">',
					'<div class="', zcls, '-tr">',
					'<span class="', zcls, '-tm">',
					'<span class="', zcls, '-text">', this.domContent_(),
					'</span></span></div></div></div></div>');
		} else {
			if (tbx.getPanelSpacing() && this.getIndex())
				out.push('<div style="margin:0;display:list-item;width:100%;height:', tbx.getpanelSpacing(), ';"></div>');

			out.push('<div id="', this.uuid, '"', this.domAttrs_(), '>',
					'<div align="left" class="', zcls, '-header" >',
					'<div class="', zcls, '-tl" ><div class="', zcls, '-tr" ></div></div>',
					'<div class="', zcls, '-hl" >',
					'<div class="', zcls, '-hr" >',
					'<div class="', zcls, '-hm" >');
			if (this.isClosable())
				out.push('<a id="', this.uuid, '-close"  class="', zcls, '-close"></a>');

			out.push('<span class="', zcls, '-text">', this.domContent_(), '</span></div></div></div></div></div>');
		}
	} else {
		out.push('<li ', this.domAttrs_(), '>');
		if (this.isClosable())
			out.push('<a id="', uuid, '-close" class="', zcls, '-close"', 'onClick="return false;" ></a>');
		else if (tbx.isVertical())
			out.push('<a class="', zcls, '-noclose" ></a>');

		out.push('<div id="', uuid, '-hl" class="', zcls, '-hl"><div id="', uuid, '-hr" class="', zcls, '-hr">');
		if (this.isClosable())
			out.push('<div id="', uuid, '-hm" class="', zcls, '-hm ', zcls, '-hm-close">');
		else
			out.push('<div id="', uuid, '-hm" class="', zcls, '-hm ">');
		out.push('<span class="', zcls, '-text">', this.domContent_(), '</span></div></div></div></li>');
	}
}
;zkmld(zk._p.p.Tab,zk._m);

zul.tab.Tabpanels = zk.$extends(zul.Widget, {
	
	getTabbox: function() {
		return this.parent;
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;

		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tabpanels';

		var mold = tabbox.getMold();
		return 'z-tabpanels' + (mold == 'default' ? (tabbox.isVertical() ? '-ver': '') : '-' + mold);
	},
	setWidth: function (val) {
		var n = this.$n(),
			tabbox = this.getTabbox(),
			isVer = n && tabbox ? tabbox.isVertical() : false;
		if (isVer && !this.__width)
			n.style.width = '';

		this.$supers('setWidth', arguments);
		
		if (isVer) {
			if (n.style.width)
				this.__width = n.style.width;
				
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	setStyle: function (val) {
		var n = this.$n(),
			tabbox = this.getTabbox(),
			isVer = n && tabbox ? tabbox.isVertical() : false;
		if (isVer && !this.__width) {
			n.style.width = '';
		}
		this.$supers('setStyle', arguments);

		if (isVer) {
			if (n.style.width)
				this.__width = n.style.width;
				
			zWatch.fireDown('beforeSize', this);
			zWatch.fireDown('onSize', this);
		}
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanels, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanels, 'setHflex', v);
	},
	bind_: function () {
		this.$supers(zul.tab.Tabpanels, 'bind_', arguments);
		if (this.getTabbox().isVertical()) {
			this._zwatched = true;
			zWatch.listen({onSize: this, beforeSize: this, onShow: this});			
			var n = this.$n();
			if (n.style.width)
				this.__width = n.style.width;
		}
	},
	unbind_: function () {
		if (this._zwatched) {
			zWatch.unlisten({onSize: this, beforeSize: this, onShow: this});
			this._zwatched = false;
		}
		this.$supers(zul.tab.Tabpanels, 'unbind_', arguments);
	},
	onSize: _zkf = function () {
		var parent = this.parent.$n();
		if (this.__width || !zk(parent).isRealVisible())
			return;

		var width = parent.offsetWidth,
			n = this.$n();

		width -= jq(parent).find('>div:first')[0].offsetWidth
				+ jq(n).prev()[0].offsetWidth;

		n.style.width = jq.px0(zk(n).revisedWidth(width));
	},
	onShow: _zkf,
	beforeSize: function () {
		this.$n().style.width = this.__width || '';
	}
});
zkreg('zul.tab.Tabpanels');zk._m={};
zk._m['default']=
function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
}
;zkmld(zk._p.p.Tabpanels,zk._m);

zul.tab.Tabpanel = zk.$extends(zul.Widget, {
	
	getTabbox: function() {
		return this.parent ? this.parent.parent : null;
	},
	isVisible: function() {
		return this.$supers('isVisible', arguments) && this.isSelected();
	},
	getZclass: function() {
		if (this._zclass != null)
			return this._zclass;
			
		var tabbox = this.getTabbox();
		if (!tabbox) return 'z-tabpanel';
		
		var mold = tabbox.getMold();
		return 'z-tabpanel' + (mold == "default" ? (tabbox.isVertical() ? '-ver' : '') : '-' + mold);
	},
	
	getLinkedTab: function() {
		var tabbox =  this.getTabbox();
		if (!tabbox) return null;
		
		var tabs = tabbox.getTabs();
		return tabs ? tabs.getChildAt(this.getIndex()) : null;
	},
	
	getIndex:function() {
		return this.getChildIndex();
	},
	
	isSelected: function() {
		var tab = this.getLinkedTab();
		return tab && tab.isSelected();
	},
	_sel: function (toSel, animation) { 
		var accd = this.getTabbox().inAccordionMold();
		if (accd && animation) {
			var p = this.$n("real"); 
			zk(p)[toSel ? "slideDown" : "slideUp"](this);
		} else {
			var $pl = jq(accd ? this.$n("real") : this.$n()),
				vis = $pl.zk.isVisible();
			if (toSel) {
				if (!vis) {
					$pl.show();
					zWatch.fireDown('onShow', this);
				}
			} else if (vis) {
				zWatch.fireDown('onHide', this);
				$pl.hide();
			}
		}
	},
	_fixPanelHgh: function() {
		var tabbox = this.getTabbox();
		var tbx = tabbox.$n(),
		hgh = tbx.style.height;
		if (hgh && hgh != "auto") {
    		if (!tabbox.inAccordionMold()) {
        		var n = this.$n();
        		hgh = zk(n.parentNode).vflexHeight();
    			if (zk.ie8)
    				hgh -= 1; 
        		zk(n).setOffsetHeight(hgh);
        		if (zk.ie6_) {
        			var s = this.$n('cave').style,
        			z = s.zoom;
        			s.zoom = 1;
        			s.zoom = z;
        		}
    		} else {
    			var n = this.$n(),
    				hgh = zk(tbx).revisedHeight(tbx.offsetHeight);
    			hgh = zk(n.parentNode).revisedHeight(hgh);
    			for (var e = n.parentNode.firstChild; e; e = e.nextSibling)
    				if (e != n) hgh -= e.offsetHeight;
    			hgh -= n.firstChild.offsetHeight;
    			hgh = zk(n.lastChild).revisedHeight(hgh);
    			if (zk.ie8)
    				hgh -= 1; 
    			var cave = this.getCaveNode();
    			cave.style.height = jq.px0(hgh);
        		if (zk.ie && !zk.ie8) {
        			var s = cave.style,
        			z = s.zoom;
        			s.zoom = 1;
        			s.zoom = z;
        			s.overflow = 'hidden';
        		}
    		}
		}
	},
	domClass_: function () {
		var cls = this.$supers('domClass_', arguments);
		if (this.getTabbox().inAccordionMold())
			cls += ' ' + this.getZclass() + '-cnt';
		return cls;
	},
	onSize: _zkf = function() {
		this._fixPanelHgh();		
		if (zk.ie && !zk.ie8) zk(this.getTabbox().$n()).redoCSS(); 
	},
	onShow: _zkf,
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanel, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.tab.Tabpanel, 'setHflex', v);
	},
	bind_: function() {
		this.$supers(zul.tab.Tabpanel, 'bind_', arguments);
		if (this.getTabbox().isHorizontal()) {
			this._zwatched = true;
			zWatch.listen({onSize: this, onShow: this});
		}
	},
	unbind_: function () {
		if (this._zwatched) {
			zWatch.unlisten({onSize: this, onShow: this});
			this._zwatched = false;
		}
		this.$supers(zul.tab.Tabpanel, 'unbind_', arguments);
	}
});
zkreg('zul.tab.Tabpanel',true);zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		tabbox = this.getTabbox();
	if (tabbox.inAccordionMold()) {
		var tab = this.getLinkedTab();
		
		out.push('<div class="', zcls, '-outer" id="', uuid, '">');
		if (tab)
			tab.redraw(out);
		out.push('<div id="', uuid, '-real"', this.domAttrs_({id:1}), '>',
				'<div id="', uuid, '-cave">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		out.push('</div></div></div>');

	} else {
		out.push('<div', this.domAttrs_(), '>');
		if (tabbox.isHorizontal())
			out.push('<div id="', uuid, '-cave" class="', zcls, '-cnt">');
		for (var w = this.firstChild; w; w = w.nextSibling)
			w.redraw(out);
		if (tabbox.isHorizontal())
			out.push('</div>');
		out.push('</div>');
	}
}
;zkmld(zk._p.p.Tabpanel,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.tab',1);zk.load('zul',function(){zk._p=zkpi('zul.layout',true);try{



(function () {

	var _ambit = {
		'north': function (ambit, center, width, height) {
			ambit.w = width - ambit.w;
			center.y = ambit.ts;
			center.h -= ambit.ts;
		},
		'south': function (ambit, center, width, height) {
			ambit.w = width - ambit.w;
			ambit.y = height - ambit.y;
			center.h -= ambit.ts;
		},
		'east': function (ambit, center, width) {
			ambit.y += center.y;
			ambit.h = center.h - ambit.h;
			ambit.x = width - ambit.x;
			center.w -= ambit.ts;
		},
		'west': function (ambit, center) {
			ambit.y += center.y;
			ambit.h = center.h - ambit.h;
			center.x += ambit.ts;
			center.w -= ambit.ts;
		}
	};

var Borderlayout =

zul.layout.Borderlayout = zk.$extends(zul.Widget, {
	setResize: function () {
		this.resize();
	},
	
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		var BL = zul.layout.Borderlayout;
		if (child.getPosition() == BL.NORTH)
			this.north = child;
		else if (child.getPosition() == BL.SOUTH)
			this.south = child;
		else if (child.getPosition() == BL.CENTER)
			this.center = child;
		else if (child.getPosition() == BL.WEST)
			this.west = child;
		else if (child.getPosition() == BL.EAST)
			this.east = child;
		this.resize();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child == this.north)
			this.north = null;
		else if (child == this.south)
			this.south = null;
		else if (child == this.center)
			this.center = null;
		else if (child == this.west)
			this.west = null;
		else if (child == this.east)
			this.east = null;
		if (!this.childReplacing_)
			this.resize();
	},
	getZclass: function () {
		return this._zclass == null ? "z-borderlayout" : this._zclass;
	},
	bind_: function () {
		this.$supers(Borderlayout, 'bind_', arguments);
		zWatch.listen({onSize: this, onShow: this});
	},
	unbind_: function () {
		zWatch.unlisten({onSize: this, onShow: this});
		this.$supers(Borderlayout, 'unbind_', arguments);
	},
	
	afterChildrenFlex_: function () {
		
		
		if (this._isOnSize)
			this._resize(true);
	},
	
	afterChildrenMinFlex_: function() {
		
		
		if (!this._isOnSize) {
			this._resize(true);
			this._isOnSize = false;
		}
	},
	
	resize: function () {
		if (this.desktop)
			this._resize();
	},
	_resize: function (isOnSize) {
		this._isOnSize = isOnSize;
		if (!this.isRealVisible()) return;

		
		var rs = ['north', 'south', 'west', 'east'], k = rs.length; 
		for (var region, j = 0; j < k; ++j) {
			region = this[rs[j]];
			if (region && zk(region.$n()).isVisible()
				&& ((region._nvflex && region._vflexsz === undefined) 
						|| (region._nhflex && region._hflexsz === undefined)))
				return;	
						
						
						
						
		}

		var el = this.$n(),
			width = el.offsetWidth,
			height = el.offsetHeight,
			center = { 
				x: 0,
				y: 0,
				w: width,
				h: height
			};
		for (var region, ambit, margin,	j = 0; j < k; ++j) {
			region = this[rs[j]];
			if (region && zk(region.$n()).isVisible()) {
				ambit = region._ambit();
				_ambit[rs[j]](ambit, center, width, height);
				this._resizeWgt(region, ambit); 
			}
		}
		if (this.center && zk(this.center.$n()).isVisible()) {
			var mars = this.center.getCurrentMargins_();
			center.x += mars.left;
			center.y += mars.top;
			center.w -= mars.left + mars.right;
			center.h -= mars.top + mars.bottom;
			this._resizeWgt(this.center, center); 
		}
		this._isOnSize = false; 
	},
	_resizeWgt: function (wgt, ambit, ignoreSplit) {
		if (wgt._open) {
			if (!ignoreSplit && wgt.$n('split')) {
				wgt._fixSplit();
				 ambit = wgt._reszSplt(ambit);
			}
			zk.copy(wgt.$n('real').style, {
				left: jq.px(ambit.x),
				top: jq.px(ambit.y)
			});
			this._resizeBody(wgt, ambit);
		} else {
			wgt.$n('split').style.display = "none";
			var colled = wgt.$n('colled');
			if (colled) {
				var $colled = zk(colled);
				zk.copy(colled.style, {
					left: jq.px(ambit.x),
					top: jq.px(ambit.y),
					width: jq.px0($colled.revisedWidth(ambit.w)),
					height: jq.px0($colled.revisedHeight(ambit.h))
				});
			}
		}
	},
	_resizeBody: function (wgt, ambit) {
		ambit.w = Math.max(0, ambit.w);
		ambit.h = Math.max(0, ambit.h);
		var el = wgt.$n('real'),
			bodyEl = wgt.isFlex() && wgt.firstChild ?
						wgt.firstChild.$n() : wgt.$n('cave');
		if (!this._ignoreResize(el, ambit.w, ambit.h)) {
			ambit.w = zk(el).revisedWidth(ambit.w);
			el.style.width = jq.px0(ambit.w);
			ambit.w = zk(bodyEl).revisedWidth(ambit.w);
			bodyEl.style.width = jq.px0(ambit.w);

			ambit.h = zk(el).revisedHeight(ambit.h);
			el.style.height = jq.px0(ambit.h);
			ambit.h = zk(bodyEl).revisedHeight(ambit.h);
			if (wgt.$n('cap'))
				ambit.h = Math.max(0, ambit.h - wgt.$n('cap').offsetHeight);
			bodyEl.style.height = jq.px0(ambit.h);
			if (wgt.isAutoscroll()) { 
				bodyEl.style.overflow = "auto";
				bodyEl.style.position = "relative";
			} else {
				bodyEl.style.overflow = "hidden";
				bodyEl.style.position = "";
			}
			if (!this._isOnSize) {
				zWatch.fireDown('beforeSize', wgt);
				zWatch.fireDown('onSize', wgt);
			}
		}
	},
	_ignoreResize : function(el, w, h) { 
		if (el._lastSize && el._lastSize.width == w && el._lastSize.height == h) {
			return true;
		} else {
			el._lastSize = {width: w, height: h};
			return false;
		}
	},
	
	onSize: _zkf = function () {
		this._resize(true);
	},
	onShow: _zkf,
	isWatchable_: function(name) {
		
		return this.$supers('isWatchable_', arguments) || ((this._vflex=='min' || this._hflex=='min') && this.isRealVisible());
	}
}, {
	
	NORTH: "north",
	
	SOUTH: "south",
	
	EAST: "east",
	
	WEST: "west",
	
	CENTER: "center"
});

})();
zkreg('zul.layout.Borderlayout');zk._m={};
zk._m['default']=
function (out) {
	out.push('<div', this.domAttrs_(), '>');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
}

;zkmld(zk._p.p.Borderlayout,zk._m);

zul.layout.LayoutRegion = zk.$extends(zul.Widget, {
	_open: true,
	_border: "normal",
	_maxsize: 2000,
	_minsize: 0,

	$init: function () {
		this.$supers('$init', arguments);
		this._margins = [0, 0, 0, 0];
		this._cmargins = [5, 5, 5, 5];
	},

	$define: {
		
		
		flex: function () {
			this.rerender();
		},
		
		
		border: function (border) {
			if (!border || '0' == border)
				this._border = border = "none";
				
			if (this.desktop)
				(this.$n('real') || {})._lastSize = null;
				
			this.updateDomClass_();
		},
		
		
		title: function () {
			this.rerender();
		},
		
		
		splittable: function (splittable) {
			if (this.parent && this.desktop)
				this.parent.resize();
		},
		
		
		maxsize: null,
		
		
		minsize: null,
		
		
		collapsible: function (collapsible) {
			var btn = this.$n(this._open ? 'btn' : 'btned');
			if (btn)
				btn.style.display = collapsible ? '' : 'none';
		},
		
		
		autoscroll: function (autoscroll) {
			var cave = this.$n('cave');
			if (cave) {
				var bodyEl = this.isFlex() && this.firstChild ?
						this.firstChild.$n() : cave;
				if (autoscroll) {
					bodyEl.style.overflow = "auto";
					bodyEl.style.position = "relative";
					this.domListen_(bodyEl, "onScroll");
				} else {
					bodyEl.style.overflow = "hidden";
					bodyEl.style.position = "";
					this.domUnlisten_(bodyEl, "onScroll");
				}
			}
		},
		
		
		open: function (open, fromServer, nonAnima) {
			if (!this.$n() || !this.isCollapsible())
				return; 
	
			var colled = this.$n('colled'),
				real = this.$n('real');
			if (open) {
				
				if (fromServer) {
					
					
					if (!zk(this.$n()).isRealVisible()) {
						if (colled) {
							jq(real)[open ? 'show' : 'hide']();
							jq(colled)[!open ? 'show' : 'hide']();
						}
						return;
					}
					var s = this.$n('real').style;
					s.visibility = "hidden";
					s.display = "";
					this._syncSize(true);
					s.visibility = "";
					s.display = "none";
					this._open = true;
				}
				if (colled) {
					if (!nonAnima) 
						zk(colled).slideOut(this, {
							anchor: this.sanchor,
							duration: 200,
							afterAnima: this.$class.afterSlideOut
						});
					else {
						jq(real)[open ? 'show' : 'hide']();
						jq(colled)[!open ? 'show' : 'hide']();
						zWatch.fireDown(open ? 'onShow' : 'onHide', this);
					}
				}
			} else {
				if (colled && !nonAnima) 
					zk(real).slideOut(this, {
							anchor: this.sanchor,
							beforeAnima: this.$class.beforeSlideOut,
							afterAnima: this.$class.afterSlideOut
						});
				else {
					if (colled)
						jq(colled)[!open ? 'show' : 'hide']();
					jq(real)[open ? 'show' : 'hide']();
				}
			}
			if (nonAnima) this.parent.resize();
			if (!fromServer) this.fire('onOpen', {open:open});
		}
	},
	
	setVflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.layout.LayoutRegion, 'setVflex', v);
	},
	
	setHflex: function (v) { 
		if (v != 'min') v = false;
		this.$super(zul.layout.LayoutRegion, 'setHflex', v);
	},
	
	getCmargins: function () {
		return zUtl.intsToString(this._open ? this._margins : this._cmargins);
	},
	
	setCmargins: function (cmargins) {
		if (this.getCmargins() != cmargins) {
			this._cmargins = zUtl.stringToInts(cmargins, 0);
			if (this.parent && this.desktop)
				this.parent.resize();
		}
	},
	
	getCurrentMargins_: function () {
		return zul.layout.LayoutRegion._aryToObject(this._open ? this._margins : this._cmargins);
	},
	
	getMargins: function () {
		return zUtl.intsToString(this._margins);
	},
	
	setMargins: function (margins) {
		if (this.getMargins() != margins) {
			this._margins = zUtl.stringToInts(margins, 0);
			if (this.parent && this.desktop)
				this.parent.resize();
		}
	},
	domClass_: function (no) {
		var scls = this.$supers('domClass_', arguments);
		if (!no || !no.zclass) {
			var added = "normal" == this.getBorder() ? '' : this.getZclass() + "-noborder";
			if (added) scls += (scls ? ' ': '') + added;
		}
		return scls;
	},
	getZclass: function () {
		return this._zclass == null ? "z-" + this.getPosition() : this._zclass;
	},
	
	setWidth: function (width) {
		this._width = width;
		var real = this.$n('real');
		if (real) {
			real.style.width = width ? width : '';
			real._lastSize = null;
			this.parent.resize();
		}
		return this;
	},
	setHeight: function (height) {
		this._height = height;
		var real = this.$n('real');
		if (real) {
			real.style.height = height ? height : '';
			real._lastSize = null;
			this.parent.resize();
		}
		return this;
	},
	setVisible: function (visible) {
		if (this._visible != visible) {
			this.$supers('setVisible', arguments);
			var real = this.$n('real');
			if (real) {
				real.style.display = real.parentNode.style.display;
				this.parent.resize();
			}
		}
		return this;
	},
	
	setFlexSize_: function(sz) {
		var n = this.$n('real');
		if (sz.height !== undefined) {
			if (sz.height == 'auto')
				n.style.height = '';
			else if (sz.height == '')
				n.style.height = this._height ? this._height : '';
			else {
				var cave = this.$n('cave'),
					hgh = cave && this._vflex != 'min' ? (cave.offsetHeight + cave.offsetTop) : zk(n).revisedHeight(sz.height, true);   
				if (zk.ie) n.style.height = '';
				n.style.height = jq.px0(hgh);
			}
		}
		if (sz.width !== undefined) {
			if (sz.width == 'auto')
				n.style.width = '';
			else if (sz.width == '')
				n.style.width = this._width ? this._width : '';
			else {
				var wdh = zk(n).revisedWidth(sz.width, true);
				if (zk.ie) n.style.width = '';
				n.style.width = jq.px0(wdh);
			}
		}
		return {height: n.offsetHeight, width: n.offsetWidth};
	},
	updateDomClass_: function () {
		if (this.desktop) {
			var real = this.$n('real');
			if (real) {
				real.className = this.domClass_();
				if (this.parent) 
					this.parent.resize();
			}
		}
	},
	updateDomStyle_: function () {
		if (this.desktop) {
			var real = this.$n('real');
			if (real) {
				zk(real).clearStyles().jq.css(jq.parseStyle(this.domStyle_()));
				if (this.parent) 
					this.parent.resize();
			}
		}
	},
	onChildAdded_: function (child) {
		this.$supers('onChildAdded_', arguments);
		if (child.$instanceof(zul.layout.Borderlayout)) {
			this.setFlex(true);
			jq(this.$n()).addClass(this.getZclass() + "-nested");
		}
		
		
		(this.$n('real') || {})._lastSize = null;
		if (this.parent && this.desktop)
			this.parent.resize();
	},
	onChildRemoved_: function (child) {
		this.$supers('onChildRemoved_', arguments);
		if (child.$instanceof(zul.layout.Borderlayout)) {
			this.setFlex(false);
			jq(this.$n()).removeClass(this.getZclass() + "-nested");
		}
		
		
		(this.$n('real') || {})._lastSize = null;
		if (this.parent && this.desktop && !this.childReplacing_)
			this.parent.resize();
	},
	rerender: function () {
		this.$supers('rerender', arguments);
		if (this.parent)
			this.parent.resize();
		return this;
	},
	bind_: function(){
		this.$supers(zul.layout.LayoutRegion, 'bind_', arguments);
		if (this.getPosition() != zul.layout.Borderlayout.CENTER) {
			var split = this.$n('split');			
			if (split) {
				this._fixSplit();
				var vert = this._isVertical(),
					LR = this.$class;
				
				this._drag = new zk.Draggable(this, split, {
					constraint: vert ? 'vertical': 'horizontal',
					ghosting: LR._ghosting,
					snap: LR._snap,
					zIndex: 12000,
					overlay: true,
					ignoredrag: LR._ignoredrag,
					endeffect: LR._endeffect
				});
				
				if (!this._open) {
					var colled = this.$n('colled'),
						real = this.$n('real');
					if (colled)
						jq(colled).show();
					jq(real).hide();
				}
			}
		}
				
		var n = this.$n(),
			real = n.firstChild;
					
		if (this._open && !this.isVisible()) n.style.display = "none";
		
		if (this.isAutoscroll()) {
			var bodyEl = this.isFlex() && this.firstChild ?
					this.firstChild.$n() : this.$n('cave');
			this.domListen_(bodyEl, "onScroll");
		}
	},
	unbind_: function () {
		if (this.isAutoscroll()) {
			var bodyEl = this.isFlex() && this.firstChild ?
					this.firstChild.$n() : this.$n('cave');
			this.domUnlisten_(bodyEl, "onScroll");
		}
		if (this.$n('split')) {			
			if (this._drag) {
				this._drag.destroy();
				this._drag = null;
			}
		}
		this.$supers(zul.layout.LayoutRegion, 'unbind_', arguments);
	},
	doMouseOver_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('btn'):
			jq(this.$n('btn')).addClass(this.getZclass() + '-colps-over');
			break;
		case this.$n('btned'):
			jq(this.$n('btned')).addClass(this.getZclass() + '-exp-over');
			
		case this.$n('colled'):
			jq(this.$n('colled')).addClass(this.getZclass() + '-colpsd-over');
			break;
		case this.$n('splitbtn'):
			jq(this.$n('splitbtn')).addClass(this.getZclass() + '-splt-btn-over');
			break;
		}
		this.$supers('doMouseOver_', arguments);
	},
	doMouseOut_: function (evt) {
		switch (evt.domTarget) {
		case this.$n('btn'):
			jq(this.$n('btn')).removeClass(this.getZclass() + '-colps-over');
			break;
		case this.$n('btned'):
			jq(this.$n('btned')).removeClass(this.getZclass() + '-exp-over');
			
		case this.$n('colled'):
			jq(this.$n('colled')).removeClass(this.getZclass() + '-colpsd-over');
			break;
		case this.$n('splitbtn'):
			jq(this.$n('splitbtn')).removeClass(this.getZclass() + '-splt-btn-over');
			break;
		}
		this.$supers('doMouseOut_', arguments);		
	},
	doClick_: function (evt) {
		var target = evt.domTarget;
		switch (target) {
		case this.$n('btn'):
		case this.$n('btned'):
		case this.$n('splitbtn'):
			if (this._isSlide || zk.animating()) return;
			if (this.$n('btned') == target) {
				var s = this.$n('real').style;
				s.visibility = "hidden";
				s.display = "";
				this._syncSize(true);
				s.visibility = "";
				s.display = "none";
			}
			this.setOpen(!this._open);
			break;
		case this.$n('colled'):					
			if (this._isSlide) return;
			this._isSlide = true;
			var real = this.$n('real'),
				s = real.style;
			s.visibility = "hidden";
			s.display = "";
			this._syncSize();
			this._original = [s.left, s.top];
			this._alignTo();
			s.zIndex = 100;

			if (this.$n('btn'))
				this.$n('btn').style.display = "none"; 
			s.visibility = "";
			s.display = "none";
			zk(real).slideDown(this, {
				anchor: this.sanchor,
				afterAnima: this.$class.afterSlideDown
			});
			break;
		}
		this.$supers('doClick_', arguments);		
	},
	isWatchable_: function(name) {
		
		return this.$supers('isWatchable_', arguments) || ((this._vflex=='min' || this._hflex=='min') && this.isRealVisible());
	},
	_docClick: function (evt) {
		var target = evt.target;
		if (this._isSlide && !jq.isAncestor(this.$n('real'), target)) {
			if (this.$n('btned') == target) {
				this.$class.afterSlideUp.apply(this, [target]);
				this.setOpen(true, false, true);
			} else 
				if ((!this._isSlideUp && this.$class.uuid(target) != this.uuid) || !zk.animating()) {
					this._isSlideUp = true;
					zk(this.$n('real')).slideUp(this, {
						anchor: this.sanchor,
						afterAnima: this.$class.afterSlideUp
					});
				}
		}
	},
	_syncSize: function (inclusive) {
		var layout = this.parent,
			el = layout.$n(),
			width = el.offsetWidth,
			height = el.offsetHeight,
			center = {
				x: 0,
				y: 0,
				w: width,
				h: height
			};
		
		this._open = true;
		
		for (var region, ambit, margin,	rs = ['north', 'south', 'west', 'east'],
				j = 0, k = rs.length; j < k; ++j) {
			region = layout[rs[j]];
			if (region && (zk(region.$n()).isVisible()
			|| zk(region.$n('colled')).isVisible())) {
				var ignoreSplit = region == this,
					ambit = region._ambit(ignoreSplit),
					LR = this.$class;
				switch (rs[j]) {
				case 'north':
				case 'south':
					ambit.w = width - ambit.w;
					if (rs[j] == 'north') 
						center.y = ambit.ts;
					else
						ambit.y = height - ambit.y;
					center.h -= ambit.ts;
					if (ignoreSplit) {
						ambit.w = this.$n('colled').offsetWidth;
						if (inclusive) {
							var cmars = LR._aryToObject(this._cmargins);
							ambit.w += cmars.left + cmars.right;
						}
						layout._resizeWgt(region, ambit, true);
						this._open = false;
						return;
					}
					break;
				default:
					ambit.y += center.y;
					ambit.h = center.h - ambit.h;
					if (rs[j] == 'east')
						ambit.x = width - ambit.x;
					else center.x += ambit.ts;
					center.w -= ambit.ts;
					if (ignoreSplit) {
						ambit.h = this.$n('colled').offsetHeight;
						if (inclusive) {
							var cmars = LR._aryToObject(this._cmargins);
							ambit.h += cmars.top + cmars.bottom;
						}
						layout._resizeWgt(region, ambit, true);
						this._open = false;
						return;
					}
					break;
				}
			}
		}
	},
	_alignTo: function () {
		var from = this.$n('colled'),
			to = this.$n('real'),
			BL = zul.layout.Borderlayout;
		switch (this.getPosition()) {
		case BL.NORTH:
			to.style.top = jq.px(from.offsetTop + from.offsetHeight);
			to.style.left = jq.px(from.offsetLeft);
			break;
		case BL.SOUTH:
			to.style.top = jq.px(from.offsetTop - to.offsetHeight);
			to.style.left = jq.px(from.offsetLeft);
			break;
		case BL.WEST:
			to.style.left = jq.px(from.offsetLeft + from.offsetWidth);
			to.style.top = jq.px(from.offsetTop);
			break;
		case BL.EAST:
			to.style.left = jq.px(from.offsetLeft - to.offsetWidth);
			to.style.top = jq.px(from.offsetTop);
			break;
		}
	},
	_doScroll: function () {
		zWatch.fireDown('onScroll', this);
	},
	_fixSplit: function () {
		jq(this.$n('split'))[this._splittable ? 'show' : 'hide']();
	},
	_isVertical : function () {
		var BL = zul.layout.Borderlayout;
		return this.getPosition() != BL.WEST &&
				this.getPosition() != BL.EAST;
	},

	
	_ambit: function (ignoreSplit) {
		var ambit, mars = this.getCurrentMargins_(), region = this.getPosition();
		if (region && !this._open) {
			var colled = this.$n('colled');
			ambit = {
				x: mars.left,
				y: mars.top,
				w: colled ? colled.offsetWidth : 0,
				h: colled ? colled.offsetHeight : 0
			};
			ignoreSplit = true;
		} else {
			var pn = this.parent.$n(),
				w = this.getWidth() || '',
				h = this.getHeight() || '',
				pert;
			ambit = {
				x: mars.left,
				y: mars.top,
				w: (pert = w.indexOf('%')) > 0 ?
					Math.max(
						Math.floor(pn.offsetWidth * zk.parseInt(w.substring(0, pert)) / 100),
						0) : this.$n('real').offsetWidth, 
				h: (pert = h.indexOf('%')) > 0 ?
					Math.max(
						Math.floor(pn.offsetHeight * zk.parseInt(h.substring(0, pert)) / 100),
						0) : this.$n('real').offsetHeight
			};
		}
		var split = ignoreSplit ? {offsetHeight:0, offsetWidth:0}: this.$n('split') || {offsetHeight:0, offsetWidth:0};
		if (!ignoreSplit) this._fixSplit();

		this._ambit2(ambit, mars, split);
		return ambit;
	},
	_ambit2: zk.$void,

	_reszSplt: function (ambit) {
		var split = this.$n('split'),
			sbtn = this.$n('splitbtn');
		if (zk(split).isVisible()) {
			if (zk(sbtn).isVisible()) {
				if (this._isVertical()) 
					sbtn.style.marginLeft = jq.px0(((ambit.w - sbtn.offsetWidth) / 2));
				else
					sbtn.style.marginTop = jq.px0(((ambit.h - sbtn.offsetHeight) / 2));
			}
			zk.copy(split.style, this._reszSp2(ambit, {
				w: split.offsetWidth,
				h: split.offsetHeight
			}));
		}
		return ambit;
	},
	_reszSp2: zk.$void
},{
	_aryToObject: function (array) {
		return {top: array[0], left: array[1], right: array[2], bottom: array[3]};
	},
	
	
	beforeSlideOut: function (n) {
		var s = this.$n('colled').style;
		s.display = "";
		s.visibility = "hidden";
		s.zIndex = 1;
		this.parent.resize();
	},
	
	afterSlideOut: function (n) {
		if (this._open) 
			zk(this.$n('real')).slideIn(this, {
				anchor: this.sanchor,
				afterAnima: this.$class.afterSlideIn
			});
		else {
			var colled = this.$n('colled'),
				s = colled.style;
			s.zIndex = ""; 
			s.visibility = "";
			zk(colled).slideIn(this, {
				anchor: this.sanchor,				
				duration: 200
			});
		}
	},
	
	afterSlideIn: function (n) {
		this.parent.resize();
	},
	
	afterSlideDown: function (n) {
		jq(document).click(this.proxy(this._docClick));
	},
	
	afterSlideUp: function (n) {
		var s = n.style;
		s.left = this._original[0];
		s.top = this._original[1];
		n._lastSize = null;
		s.zIndex = "";
		if (this.$n('btn'))
			this.$n('btn').style.display = "";
		jq(document).unbind("click", this.proxy(this._docClick));
		this._isSlideUp = this._isSlide = false;
	},
	
	_ignoredrag: function (dg, pointer, evt) {
			var target = evt.domTarget,
				wgt = dg.control;
			if (!target || target != wgt.$n('split')) return true;
			if (wgt.isSplittable() && wgt._open) {			
				var BL = zul.layout.Borderlayout,
					pos = wgt.getPosition(),
					maxs = wgt.getMaxsize(),
					mins = wgt.getMinsize(),
					ol = wgt.parent,
					real = wgt.$n('real'),
					mars = zul.layout.LayoutRegion._aryToObject(wgt._margins),
					pbw = zk(real).padBorderWidth(),
					lr = pbw + (pos == BL.WEST ? mars.left : mars.right),
					tb = pbw + (pos == BL.NORTH ? mars.top : mars.bottom),
					min = 0,
					uuid = wgt.uuid;
				switch (pos) {
				case BL.NORTH:	
				case BL.SOUTH:
					var r = ol.center || (pos == BL.NORTH ? ol.south : ol.north);
					if (r) {
						if (BL.CENTER == r.getPosition()) {
							var east = ol.east,
								west = ol.west;
							maxs = Math.min(maxs, (real.offsetHeight + r.$n('real').offsetHeight)- min);
						} else {
							maxs = Math.min(maxs, ol.$n().offsetHeight
									- r.$n('real').offsetHeight - r.$n('split').offsetHeight
									- wgt.$n('split').offsetHeight - min); 
						}
					} else {
						maxs = ol.$n().offsetHeight - wgt.$n('split').offsetHeight;
					}
					break;				
				case BL.WEST:
				case BL.EAST:
					var r = ol.center || (pos == BL.WEST ? ol.east : ol.west);
					if (r) {
						if (BL.CENTER == r.getPosition()) {
							maxs = Math.min(maxs, (real.offsetWidth
									+ zk(r.$n('real')).revisedWidth(r.$n('real').offsetWidth))- min);
						} else {
							maxs = Math.min(maxs, ol.$n().offsetWidth
									- r.$n('real').offsetWidth - r.$n('split').offsetWidth - wgt.$n('split').offsetWidth - min); 
						}
					} else {
						maxs = ol.$n().offsetWidth - wgt.$n('split').offsetWidth;
					}
					break;						
				}
				var ofs = zk(real).cmOffset();
				dg._rootoffs = {
					maxs: maxs,
					mins: mins,
					top: ofs[1],
					left : ofs[0],
					right : real.offsetWidth,
					bottom: real.offsetHeight
				};
				return false;
			}
		return true;
	},
	_endeffect: function (dg, evt) {
		var wgt = dg.control,
			keys = "";
		if (wgt._isVertical())
			wgt.setHeight(dg._point[1] + 'px');
		else
			wgt.setWidth(dg._point[0] + 'px');

		
		wgt.$n().style.zIndex = '';
			
		dg._rootoffs = dg._point = null;

		wgt.parent.resize();
		wgt.fire('onSize', zk.copy({
			width: wgt.$n('real').style.width,
			height: wgt.$n('real').style.height
		}, evt.data));
	},
	_snap: function (dg, pointer) {
		var wgt = dg.control,
			x = pointer[0],
			y = pointer[1],
			BL = zul.layout.Borderlayout,
			split = wgt.$n('split'),
			b = dg._rootoffs, w, h;
		switch (wgt.getPosition()) {
		case BL.NORTH:
			if (y > b.maxs + b.top) y = b.maxs + b.top;
			if (y < b.mins + b.top) y = b.mins + b.top;
			w = x;
			h = y - b.top;
			break;				
		case BL.SOUTH:
			if (b.top + b.bottom - y - split.offsetHeight > b.maxs) {
				y = b.top + b.bottom - b.maxs - split.offsetHeight;
				h = b.maxs;
			} else if (b.top + b.bottom - b.mins - split.offsetHeight <= y) {
				y = b.top + b.bottom - b.mins - split.offsetHeight;
				h = b.mins;
			} else h = b.top - y + b.bottom - split.offsetHeight;
			w = x;
			break;
		case BL.WEST:
			if (x > b.maxs + b.left) x = b.maxs + b.left;
			if (x < b.mins + b.left) x = b.mins + b.left;
			w = x - b.left;
			h = y;
			break;		
		case BL.EAST:			
			if (b.left + b.right - x - split.offsetWidth > b.maxs) {
				x = b.left + b.right - b.maxs - split.offsetWidth;
				w = b.maxs;
			} else if (b.left + b.right - b.mins - split.offsetWidth <= x) {
				x = b.left + b.right - b.mins - split.offsetWidth;
				w = b.mins;
			} else w = b.left - x + b.right - split.offsetWidth;
			h = y;
			break;						
		}
		dg._point = [w, h];
		return [x, y];
	},
	_ghosting: function (dg, ofs, evt) {
		var el = dg.node, $el = zk(el);
		jq(document.body).prepend('<div id="zk_layoutghost" style="font-size:0;line-height:0;background:#AAA;position:absolute;top:'
			+ofs[1]+'px;left:'+ofs[0]+'px;width:'
			+$el.offsetWidth()+'px;height:'+$el.offsetHeight()
			+'px;cursor:'+el.style.cursor+';"></div>');
		return jq("#zk_layoutghost")[0];
	}
});

zkreg('zul.layout.LayoutRegion');zk._m={};
zk._m['default']=
function (out) {
	var uuid = this.uuid,
		zcls = this.getZclass(),
		noCenter = this.getPosition() != zul.layout.Borderlayout.CENTER,
		pzcls = this.parent.getZclass();
	out.push('<div id="', uuid,  '">', '<div id="', uuid, '-real"',
			this.domAttrs_({id: 1}), '>');
			
	if (this._title) {
		out.push('<div id="', uuid, '-cap" class="', zcls, '-header">');
		if (noCenter) {
			out.push('<div id="', uuid, '-btn" class="', pzcls,
					'-icon ', zcls, '-colps"');
			if (!this._collapsible)
				out.push(' style="display:none;"');
			out.push('></div>');
		}
		out.push(zUtl.encodeXML(this._title), '</div>');
	}
	out.push('<div id="', uuid, '-cave" class="', zcls, '-body">');
	
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	
	out.push('</div></div>');
	
	if (noCenter) {
		out.push('<div id="', uuid, '-split" class="', zcls, '-splt"><span id="'
			, uuid, '-splitbtn" class="', zcls, '-splt-btn"');
		if (!this._collapsible)
			out.push(' style="display:none;"');
		out.push('></span></div>', '<div id="', uuid, '-colled" class="', zcls,
				'-colpsd" style="display:none"><div id="',
				uuid, '-btned" class="', pzcls, '-icon ', zcls, '-exp"');
		if (!this._collapsible)
			out.push(' style="display:none;"');
				
		out.push('></div></div>');
	}
	out.push('</div>');
}
;zkmld(zk._p.p.LayoutRegion,zk._m);

zul.layout.North = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexHeight: true, 
	
	setWidth: zk.$void, 
	sanchor: 't',
	
	getPosition: function () {
		return zul.layout.Borderlayout.NORTH;
	},
	
	getSize: _zkf.prototype.getHeight,
	
	setSize: _zkf.prototype.setHeight,

	_ambit2: function (ambit, mars, split) {
		ambit.w = mars.left + mars.right;
		ambit.h += split.offsetHeight;
		ambit.ts = ambit.y + ambit.h + mars.bottom; 
	},
	_reszSp2: function (ambit, split) {
		ambit.h -= split.h;
		return {
		  	left: jq.px0(ambit.x),
			top: jq.px0(ambit.y + ambit.h),
			width: jq.px0(ambit.w)
		};
	}
});
zkreg('zul.layout.North');

zul.layout.South = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexHeight: true, 
	
	setWidth: zk.$void, 
	sanchor: 'b',
	
	getPosition: function () {
		return zul.layout.Borderlayout.SOUTH;
	},
	
	getSize: _zkf.prototype.getHeight,
	
	setSize: _zkf.prototype.setHeight,

	_ambit2: function (ambit, mars, split) {
		ambit.w = mars.left + mars.right;
		ambit.h += split.offsetHeight;
		ambit.ts = ambit.y + ambit.h + mars.bottom; 
		ambit.y = ambit.h + mars.bottom;
	},
	_reszSp2: function (ambit, split) {
		ambit.h -= split.h;
		ambit.y += split.h;
		return {
			left: jq.px0(ambit.x),
			top: jq.px0(ambit.y - split.h),
			width: jq.px0(ambit.w)
		};
	}
});
zkreg('zul.layout.South');

zul.layout.Center = zk.$extends(zul.layout.LayoutRegion, {
	_sumFlexWidth: true, 
	_maxFlexHeight: true, 
	
	
	setHeight: zk.$void,      
	
	setWidth: zk.$void,       
	
	setVisible: zk.$void,     
	
	getSize: zk.$void,        
	
	setSize: zk.$void,        
	
	setCmargins: zk.$void,    
	
	setSplittable: zk.$void,  
	
	setOpen: zk.$void,        
	
	setCollapsible: zk.$void, 
	
	setMaxsize: zk.$void,     
	
	setMinsize: zk.$void,     
	doMouseOver_: zk.$void,   
	doMouseOut_: zk.$void,    
	doClick_: zk.$void,       
	
	getPosition: function () {
		return zul.layout.Borderlayout.CENTER;
	}
});
zkreg('zul.layout.Center');

zul.layout.East = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexWidth: true, 
	_maxFlexHeight: true, 
	
	
	setHeight: zk.$void, 
	sanchor: 'r',

	$init: function () {
		this.$supers('$init', arguments);
		this.setCmargins("0,3,3,0");
	},
	
	getPosition: function () {
		return zul.layout.Borderlayout.EAST;
	},
	
	getSize: _zkf.prototype.getWidth,
	
	setSize: _zkf.prototype.setWidth,

	_ambit2: function (ambit, mars, split) {
		ambit.w += split.offsetWidth;
		ambit.h = mars.top + mars.bottom;
		ambit.ts = ambit.x + ambit.w + mars.right; 
		ambit.x = ambit.w + mars.right; 
	},
	_reszSp2: function (ambit, split) {
		ambit.w -= split.w;
		ambit.x += split.w;
		return {
			left: jq.px0(ambit.x - split.w),
			top: jq.px0(ambit.y),
			height: jq.px0(ambit.h)
		};
	}
});
zkreg('zul.layout.East');

zul.layout.West = zk.$extends(_zkf = zul.layout.LayoutRegion, {
	_sumFlexWidth: true, 
	_maxFlexHeight: true, 

	
	setHeight: zk.$void, 
	sanchor: 'l',
	
	$init: function () {
		this.$supers('$init', arguments);
		this.setCmargins("0,3,3,0");
	},
	
	getPosition: function () {
		return zul.layout.Borderlayout.WEST;
	},
	
	getSize: _zkf.prototype.getWidth,
	
	setSize: _zkf.prototype.setWidth,

	_ambit2: function (ambit, mars, split) {
		ambit.w += split.offsetWidth;
		ambit.h = mars.top + mars.bottom;
		ambit.ts = ambit.x + ambit.w + mars.right; 
	},
	_reszSp2: function (ambit, split) {
		ambit.w -= split.w;
		return {
			left: jq.px0(ambit.x + ambit.w),
			top: jq.px0(ambit.y),
			height: jq.px0(ambit.h)
		};
	}
});

zkreg('zul.layout.West');
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.layout',1);zk.load('zul',function(){zk._p=zkpi('zul.med',true);try{




zul.med.Applet = zk.$extends(zul.Widget, {
	$init: function() {
		this._params = {};
		this.$supers('$init', arguments);
	},

	$define: {
		
		
		code: _zkf = function () {
			this.rerender();
		},
		
		
		codebase: _zkf,
		
		
		archive: _zkf,
		
		
		mayscript: function (v) {
			var n;
			if (n = this.$n())
				n.mayscript = v;
		},
		
		
		align: function (v) {
			var n;
			if (n = this.$n())
				n.align = v;
		},
		
		
		hspace: function (v) {
			var n;
			if (n = this.$n())
				n.hspace = v;
		},
		
		
		vspace: function (v) {
			var n;
			if (n = this.$n())
				n.vspace = v;
		}
	},
	
	invoke: zk.ie ? function() {
		var n = this.$n(),
			len = arguments.length;
		if (n && len >= 1) {
			var single = len < 3,
				begin = single ? '(' : '([',
				end = single ? ')' : '])',
				expr = "n." + arguments[0] + begin;
			for (var j = 1; j < len;) {
				if (j != 1) expr += ',';
				var s = arguments[j++];
				expr += '"' + (s ? s.replace('"', '\\"'): '') + '"';
			}
			try {
				eval(expr + end);
			} catch (e) {
				zk.error("Failed to invoke applet's method: "+expr+'\n'+e.message);
			}
		}
	}: function(){
		var n = this.$n();
		if (n && arguments.length >= 1) {
			var fn = arguments[0],
				func = n[fn];
			if (!func) {
				zk.error("Method not found: "+fn);
				return;
			}
			try {
				var args = [],
					arrayArg = [];
				if (arguments.length < 3) {
					if (arguments[1]) 
						args.push(arguments[1]);
				} else {
					for (var j = 1, len = arguments.length; j < len;) 
						arrayArg.push(arguments[j++]);
					args.push(arrayArg);
				}
				func.apply(n, args);
			} catch (e) {
				zk.error("Failed to invoke applet's method: "+fn+'\n'+e.message);
			}
		}
	},
	
	getField: function (name) {
		var n = this.$n();
		return n ? n[name]: null;
	},
	
	setField: function (name, value) {
		var n = this.$n();
		if (n)
			try {
				n[name] = value;
			} catch(e) {
				zk.error("Failed to set applet's field: "+ name+'\n'+e.message);
			}
	},

	
	setParam: function (nm, val) {
		if (arguments.length == 1) {
			val = nm[1];
			nm = nm[0];
		}
		if (val != null) this._params[nm] = val;
		else delete this._params[nm];
	},

	
	domAttrs_: function(no){
		return this.$supers('domAttrs_', arguments)
				+ ' code="' + (this._code || '') + '"'
				+ ' codebase="' + (this._codebase || '') + '"'
				+ zUtl.appendAttr("archive", this._archive)
				+ zUtl.appendAttr("align", this._align)
				+ zUtl.appendAttr("hspace", this._hspace)
				+ zUtl.appendAttr("vspace", this._vspace)
				+ zUtl.appendAttr("mayscript", this._mayscript);
	},
	domStyle_: function (no) {
		return this.$supers('domStyle_', arguments)
			+ "visibility:visible;"; 
	},

	_outParamHtml: function (out) {
		var params = this._params;
		for (var nm in params)
			out.push('<param name="', zUtl.encodeXML(nm), '" value="', zUtl.encodeXML(params[nm]), '"/>');
	}
});

zkreg('zul.med.Applet');zk._m={};
zk._m['default']=
function (out) {
	out.push('<applet', this.domAttrs_(), '>');
	this._outParamHtml(out);
	out.push('</applet>');
}
;zkmld(zk._p.p.Applet,zk._m);
(function () {

	function _invoke(wgt, fn1, fn2, unbind) {
		
		if (unbind)
			_invoke2(wgt, fn1, fn2, unbind);
		else
			setTimeout(function () {
				_invoke2(wgt, fn1, fn2);
			}, 200);
	}
	function _invoke2(wgt, fn1, fn2, unbind) {
		var n = wgt.$n();
		if (n) {
			try { 
				n[fn1]();
			} catch (e) {
				try {
					n[fn2](); 
				} catch (e) {
					if (!unbind)
						jq.alert(msgzul.NO_AUDIO_SUPPORT+'\n'+e.message);
				}
			}
		}
	}

var Audio =

zul.med.Audio = zk.$extends(zul.Widget, {
	$define: {
		
		
		src: function () {
			this.rerender(); 
		},
		
		
		align: function (v) {
			var n = this.$n();
			if (n) n.align = v || '';
		},
		
		
		border: function (v) {
			var n = this.$n();
			if (n) n.border = v || '';
		},
		
		
		autostart: function (v) {
			var n = this.$n();
			if (n) n.autostart = v;
		},
		
		
		loop: function (v) {
			var n = this.$n();
			if (n) n.loop = v;
		}
	},
	
	play: function () {
		_invoke(this, 'play', 'Play');
	},
	
	stop: function (_unbind_) {
		_invoke(this, 'stop', 'Stop', _unbind_);
	},
	
	pause: function () {
		_invoke(this, 'pause', 'Pause');
	},

	unbind_: function () {
		this.stop(true);
		this.$supers(Audio, 'unbind_', arguments);
	},

	domAttrs_: function(no){
		var attr = this.$supers('domAttrs_', arguments)
				+ ' src="' + (this._src || '') + '"',
			v;
		if (v = this._align) 
			attr += ' align="' + v + '"';
		if (v = this._border) 
			attr += ' border="' + v + '"';
		if (v = this._autostart) 
			attr += ' autostart="' + v + '"';
		if (v = this._loop) 
			attr += ' loop="' + v + '"';
		return attr;
	}
});

})();
zkreg('zul.med.Audio');zk._m={};
zk._m['default']=
function (out) {
	out.push('<embed', this.domAttrs_(), ' mastersound enablejavascript="true"/>');
}
;zkmld(zk._p.p.Audio,zk._m);

zul.med.Flash = zk.$extends(zul.Widget, {
	_wmode: 'transparent',
	_quality: 'high',
	_autoplay: true,
	_loop: false,
	_version: '6,0,0,0',

	$define: {
		
		
		version: function () {
			this.rerender();
		},
		
		
		src: function (v) {
			var n = this._embedNode();
			if (n) n.movie = v || '';
		},
		
		
		wmode: function (wmode) {
			var n = this._embedNode();
			if (n) n.wmode = v || '';
		},
		
		
		bgcolor: function (v) {
			var n = this._embedNode();
			if (n) n.bgcolor = v || '';
		},
		
		
		quality: function (v) {
			var n = this._embedNode();
			if (n) n.quality = v || '';
		},
		
		
		autoplay: function (autoplay) {
			var n = this._embedNode();
			if (n) n.autoplay = v || '';
		},
		
		
		loop: function (v) {
			var n = this._embedNode();
			if (n) n.loop = v || '';
		}
	},

	
	setHeight: function (height) {
		this._height = height;
		var n = this._embedNode();
		if (n) n.height = height ? height: '';
	},
	setWidth: function (width) {
		this._width = width;
		var n = this._embedNode();
		if (n) n.width = width ? width: '';
	},

	_embedNode: function () {
		return this.$n('emb');
	}
});

zkreg('zul.med.Flash');zk._m={};
zk._m['default']=
function (out) {
	out.push('<div', this.domAttrs_({width:true,height:true}),
		'><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=',
		this._version, '" width="', this._width||'', '" height="', this._height||'',
		'"><param name="movie" value="', this._src,
		'"></param><param name="wmode" value="', this._wmode,
		'"></param><param name="quality" value="', this._quality,
		'"></param><param name="autoplay" value="', this._autoplay,
		'"></param><param name="loop" value="', this._loop,
		'"></param>');

	var bgc;
	if (bgc = this._bgcolor)
		out.push('<param name="bgcolor" value="', bgc, '"');

	out.push('<embed id="', this.uuid, '-emb" src="', this._src,
		'" type="application/x-shockwave-flash" wmode="', this._wmode,
		'" quality="', this._quality,
		'" autoplay="', this._autoplay,
		'" loop="', this._loop,
		'" width="', this._width||'', '" height="', this._height||'',
		'"');

	if (bgc) out.push(' bgcolor="', bgc, '"');

	out.push('></embed></object></div>');
}
;zkmld(zk._p.p.Flash,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.med',1);