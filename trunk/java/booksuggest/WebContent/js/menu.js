zk.load('zul.wgt',function(){zk._p=zkpi('zul.menu',true);try{zul.menu.Menubar=zk.$extends(zul.Widget,{_orient:"horizontal",$define:{orient:function(){this.rerender()},scrollable:function(a){if(this.checkScrollable()){this.rerender()}},autodrop:null},getZclass:function(){return this._zclass==null?"z-menubar"+("vertical"==this.getOrient()?"-ver":"-hor"):this._zclass},unbind_:function(){if(this.checkScrollable()){var b=this.$n("left"),a=this.$n("right");if(b&&a){this.domUnlisten_(b,"onClick","_doScroll");this.domUnlisten_(b,"onMouseover","_onOver");this.domUnlisten_(b,"onMouseout","_onOut");this.domUnlisten_(a,"onClick","_doScroll");this.domUnlisten_(a,"onMouseover","_onOver");this.domUnlisten_(a,"onMouseout","_onOut")}zWatch.unlisten({onSize:this,onShow:this})}this._lastTarget=null;this.$supers(zul.menu.Menubar,"unbind_",arguments)},bind_:function(){this.$supers(zul.menu.Menubar,"bind_",arguments);if(this.checkScrollable()){var b=this.$n("left"),a=this.$n("right");if(b&&a){this.domListen_(b,"onClick","_doScroll");this.domListen_(b,"onMouseover","_onOver");this.domListen_(b,"onMouseout","_onOut");this.domListen_(a,"onClick","_doScroll");this.domListen_(a,"onMouseover","_onOver");this.domListen_(a,"onMouseout","_onOut")}zWatch.listen({onSize:this,onShow:this})}},checkScrollable:function(){return this._scrollable&&("horizontal"==this.getOrient())},onSize:_zkf=function(){this._checkScrolling()},onShow:_zkf,onChildAdded_:function(a){this.$supers("onChildAdded_",arguments);this._checkScrolling()},onChildRemoved_:function(a){this.$supers("onChildRemoved_",arguments);if(!this.childReplacing_){this._checkScrolling()}},_checkScrolling:function(){if(!this.checkScrollable()){return}var e=this.$n();if(!e){return}jq(e).addClass(this.getZclass()+"-scroll");if(zk.ie6_){this._doFixWidth(e)}var b=zk(e).offsetWidth(),a=this.$n("body"),f=jq(this.$n("cave")).children();totalWidth=0;for(var c=f.length;c--;){totalWidth+=f[c].offsetWidth}var d=b-zk(this.$n("left")).offsetWidth()-zk(this.$n("right")).offsetWidth();if(this._scrolling){if(totalWidth<=b){this._scrolling=false;a.scrollLeft=0;if(zk.ie7_){zk(a).redoCSS()}}else{a.style.width=jq.px0(d);this._fixScrollPos(e)}this._fixButtonPos(e)}else{if(totalWidth>b){this._scrolling=true;this._fixButtonPos(e);a.style.width=jq.px0(d)}}},_fixScrollPos:function(){var a=this.$n("body"),c=jq(this.$n("cave")).children();if(c[c.length-1].offsetLeft<a.scrollLeft){var b=c[c.length-1].offsetLeft;a.scrollLeft=b}},_fixButtonPos:function(d){var f=this.getZclass(),a=this.$n("body"),e=this.$n("left"),c=this.$n("right"),b=this._scrolling?"addClass":"removeClass";jq(d)[b](f+"-scroll");jq(a)[b](f+"-body-scroll");jq(e)[b](f+"-left-scroll");jq(c)[b](f+"-right-scroll")},_doFixWidth:function(){var b=this.$n(),a=b.style.width;if(zk.ie6_&&(!a||"auto"==a)){this._forceStyle(b,"100%")}},_forceStyle:function(a,b){if(zk.parseInt(b)<0){return}a.style.width=zk.ie6_?"0px":"";a.style.width=b},_onOver:function(b){if(!this.checkScrollable()){return}var a=b.domTarget,d=this.$n(),e=this.$n("left"),c=this.$n("right"),f=this.getZclass();if(e==a){jq(e).addClass(f+"-left-scroll-over")}else{if(c==a){jq(c).addClass(f+"-right-scroll-over")}}},_onOut:function(b){if(!this.checkScrollable()){return}var a=b.domTarget,d=this.$n(),e=this.$n("left"),c=this.$n("right"),f=this.getZclass();if(e==a){jq(e).removeClass(f+"-left-scroll-over")}else{if(c==a){jq(c).removeClass(f+"-right-scroll-over")}}},_doScroll:function(a){var b=a.domTarget;this._scroll(b.id.endsWith("left")?"left":"right")},_scroll:function(d){if(!this.checkScrollable()||this._runId){return}var b=this;body=this.$n("body"),currScrollLeft=body.scrollLeft,childs=jq(this.$n("cave")).children(),childLen=childs.length,movePos=0;if(!childLen){return}switch(d){case"left":for(var c=0;c<childLen;c++){if(childs[c].offsetLeft>=currScrollLeft){var f=childs[c].previousSibling;if(!f){return}movePos=currScrollLeft-(currScrollLeft-f.offsetLeft);if(isNaN(movePos)){return}b._runId=setInterval(function(){if(!b._moveTo(body,movePos)){clearInterval(b._runId);b._runId=null}},10);return}}break;case"right":var e=currScrollLeft+body.offsetWidth;for(var c=0;c<childLen;c++){var a=childs[c].offsetLeft+childs[c].offsetWidth;if(a>e){movePos=currScrollLeft+(a-e);if(isNaN(movePos)){return}b._runId=setInterval(function(){if(!b._moveTo(body,movePos)){clearInterval(b._runId);b._runId=null}},10);return}}break}},_moveTo:function(a,c){var e=a.scrollLeft,d=5;if(e==c){return false}if(e>c){var b=e-d;a.scrollLeft=b<c?c:b;return true}else{var b=e+d;a.scrollLeft=b>c?c:b;return true}return false},insertChildHTML_:function(c,a,b){if(a){jq(a.$n("chdextr")||a.$n()).before(this.encloseChildHTML_({child:c,vertical:"vertical"==this.getOrient()}))}else{jq(this.$n("cave")).append(this.encloseChildHTML_({child:c,vertical:"vertical"==this.getOrient()}))}c.bind(b)},removeChildHTML_:function(a){this.$supers("removeChildHTML_",arguments);jq(a.uuid+"-chdextr",zk).remove()},encloseChildHTML_:function(c){var b=c.out||[],d=c.child,a=c.vertical;if(a){b.push('<tr id="',d.uuid,'-chdextr"');if(d.getHeight()){b.push(' height="',d.getHeight(),'"')}b.push(">")}d.redraw(b);if(a){b.push("</tr>")}if(!c.out){return b.join("")}}});
zkreg('zul.menu.Menubar');zk._m={};
zk._m['default']=function(b){var c=this.uuid;if("vertical"==this.getOrient()){b.push("<div",this.domAttrs_(),'><table id="',c,'-cave"',zUtl.cellps0,">");for(var a=this.firstChild;a;a=a.nextSibling){this.encloseChildHTML_({out:b,child:a,vertical:true})}b.push("</table></div>")}else{var d=this.getZclass();b.push("<div",this.domAttrs_(),">");if(this.checkScrollable()){b.push('<div id="',c,'-left" class="',d,'-left"></div>','<div id="',c,'-right" class="',d,'-right"></div>','<div id="',c,'-body" class="',d,'-body">','<div id="',c,'-cnt" class="',d,'-cnt">')}b.push("<table",zUtl.cellps0,">",'<tr valign="bottom" id="',c,'-cave">');for(var a=this.firstChild;a;a=a.nextSibling){a.redraw(b)}b.push("</tr></table>");if(this.scrollable){b.push("</div></div>")}b.push("</div>")}};
;zkmld(zk._p.p.Menubar,zk._m);zul.menu.Menu=zk.$extends(zul.LabelImageWidget,{$define:{content:function(b){if(!b||b.length==0){return}if(!this._contentHandler){if(zk.feature.pe){var a=this;zk.load("zkex.inp",null,function(){a._contentHandler=new zkex.inp.ContentHandler(a,b)});return}this._contentHandler=new zul.menu.ContentHandler(this,b)}else{this._contentHandler.setContent(b)}},image:function(){this.rerender()}},domContent_:function(){var b=zUtl.encodeXML(this.getLabel()),a=['<span id="',this.uuid,'-img" class="',this.getZclass(),'-img"'];a.push(this._image?' style="background-image:url('+this._image+')"':"","></span>",b?" "+b:"");return a.join("")},isTopmost:function(){return this._topmost},beforeParentChanged_:function(a){this._topmost=a&&!(a.$instanceof(zul.menu.Menupopup));this.$supers("beforeParentChanged_",arguments)},getZclass:function(){return this._zclass==null?"z-menu":this._zclass},domStyle_:function(b){var a=this.$supers("domStyle_",arguments);return this.isTopmost()?a+"padding-left:4px;padding-right:4px;":a},onChildAdded_:function(a){this.$supers("onChildAdded_",arguments);if(a.$instanceof(zul.menu.Menupopup)){this.menupopup=a;if(this._contentHandler){this._contentHandler.destroy()}}},onChildRemoved_:function(a){this.$supers("onChildRemoved_",arguments);if(a==this.menupopup){this.menupopup=null;if(this._contentHandler){this._contentHandler.setContent(this._content)}}},getMenubar:function(){for(var a=this.parent;a;a=a.parent){if(a.$instanceof(zul.menu.Menubar)){return a}}return null},onShow:function(){if(this._contentHandler){this._contentHandler.onShow()}},onFloatUp:function(a){if(this._contentHandler){this._contentHandler.onFloatUp(a)}},onHide:function(){if(this._contentHandler){this._contentHandler.onHide()}},bind_:function(){this.$supers(zul.menu.Menu,"bind_",arguments);var b=this.$n("a"),a=this._contentType;if(!this.isTopmost()){var c=this.$n();this.domListen_(b,"onFocus","doFocus_").domListen_(b,"onBlur","doBlur_").domListen_(c,"onMouseOver").domListen_(c,"onMouseOut")}else{this.domListen_(b,"onMouseOver").domListen_(b,"onMouseOut")}if(this._contentHandler){this._contentHandler.bind()}},unbind_:function(){if(!this.isTopmost()){var a=this.$n("a"),b=this.$n();this.domUnlisten_(a,"onFocus","doFocus_").domUnlisten_(a,"onBlur","doBlur_").domUnlisten_(b,"onMouseOver").domUnlisten_(b,"onMouseOut")}else{var a=this.$n("a");this.domUnlisten_(a,"onMouseOver").domUnlisten_(a,"onMouseOut")}if(this._contentHandler){this._contentHandler.unbind()}this.$supers(zul.menu.Menu,"unbind_",arguments)},doClick_:function(h){var c=this.$n();if(this.menupopup){jq(this.$n("a")).addClass(this.getZclass()+"-body-seld");this.menupopup._shallClose=false;if(this.isTopmost()){this.getMenubar()._lastTarget=this}if(this.isListen("onClick")){var i=12,d=jq(c).find("TABLE"),f=zk(d).offsetWidth(),a=f-i,g=zk(d).revisedOffset(),b=h.domEvent.clientX-g[0];if(b>a){this._togglePopup();Event.stop(h)}else{jq(this.$n("a")).removeClass(this.getZclass()+"-body-seld");this.fireX(h)}}else{this._togglePopup()}}else{var e=this._contentHandler;if(e&&!e.isOpen()){e.onShow()}}},doMouseOver_:function(){this.$supers("doMouseOver_",arguments);if(this.isTopmost()){return}var a=this._contentHandler;if(a&&!a.isOpen()){a.onShow()}},_togglePopup:function(){if(!this.menupopup.isOpen()){this.menupopup.open()}else{if(this.isTopmost()){this.menupopup.close()}else{var a=this.menupopup.$n("a");if(a){a.focus()}}}},_doMouseOver:function(a){if(this.$class._isActive(this)){return}var b=this.isTopmost();if(b&&zk.ie&&!jq.isAncestor(this.$n("a"),a.domTarget)){return}if(this.menupopup){this.menupopup._shallClose=false}if(!b){zWatch.fire("onFloatUp",this);if(this.menupopup&&!this.menupopup.isOpen()){this.menupopup.open()}}else{var c=this.getMenubar();if(this.menupopup&&c.isAutodrop()){c._lastTarget=this;zWatch.fire("onFloatUp",this);if(!this.menupopup.isOpen()){this.menupopup.open()}}else{var d=c._lastTarget;if(d&&d!=this&&c._lastTarget.menupopup&&c._lastTarget.menupopup.isVisible()){c._lastTarget.menupopup.close({sendOnOpen:true});this.$class._rmActive(c._lastTarget);c._lastTarget=this;if(this.menupopup){this.menupopup.open()}}}}this.$class._addActive(this)},_doMouseOut:function(a){if(zk.ie&&jq.isAncestor(this.$n("a"),a.domEvent.relatedTarget||a.domEvent.toElement)){return}var b=this.isTopmost();if(b){this.$class._rmActive(this);if(this.menupopup&&this.getMenubar().isAutodrop()){if(this.menupopup.isOpen()){this.menupopup._shallClose=true}zWatch.fire("onFloatUp",this,{timeout:10})}}else{if(!this.menupopup||!this.menupopup.isOpen()){this.$class._rmActive(this)}}}},{_isActive:function(c){var b=c.isTopmost(),d=b?c.$n("a"):c.$n(),a=c.getZclass()+(b?"-body-over":"-over");return jq(d).hasClass(a)},_addActive:function(c){var b=c.isTopmost(),d=b?c.$n("a"):c.$n(),a=c.getZclass()+(b?"-body-over":"-over");jq(d).addClass(a);if(!b&&c.parent.parent.$instanceof(zul.menu.Menu)){this._addActive(c.parent.parent)}},_rmActive:function(c){var b=c.isTopmost(),d=b?c.$n("a"):c.$n(),a=c.getZclass()+(b?"-body-over":"-over");jq(d).removeClass(a)}});zul.menu.ContentHandler=zk.$extends(zk.Object,{$init:function(b,a){this.$supers("$init",arguments);this._wgt=b;this._content=a},setContent:function(a){if(this._content!=a||!this._pp){this._content=a;this._wgt.rerender()}},redraw:function(a){var c=this._wgt,b=c.getZclass();a.push('<div id="',c.uuid,'-cnt-pp" class="',b,'-cnt-pp" style="display:none"><div class="',b,'-cnt-body">',this._content,"</div></div>")},bind:function(){var a=this._wgt;if(!a.menupopup){a.domListen_(a.$n(),"onClick","onShow");zWatch.listen({onFloatUp:a,onHide:a})}this._pp=jq("#"+a.uuid+"-cnt-pp")[0]},unbind:function(){var a=this._wgt;if(!a.menupopup){if(this._shadow){this._shadow.destroy();this._shadow=null}a.domUnlisten_(a.$n(),"onClick","onShow");zWatch.unlisten({onFloatUp:a,onHide:a})}this._pp=null},isOpen:function(){var a=this._pp;return(a&&zk(a).isVisible())},onShow:function(){var b=this._wgt,a=this._pp;if(!a){return}a.style.width=a.style.height="auto";a.style.position="absolute";a.style.overflow="auto";a.style.display="block";a.style.zIndex="88000";jq(a).zk.makeVParent();zk(a).position(b.$n(),this.getPosition());this.syncShadow()},onHide:function(){var a=this._pp;if(!a||!zk(a).isVisible()){return}a.style.display="none";jq(a).zk.undoVParent();this.hideShadow()},onFloatUp:function(a){if(!zUtl.isAncestor(this._wgt,a.origin)){this.onHide()}},syncShadow:function(){if(!this._shadow){this._shadow=new zk.eff.Shadow(this._wgt.$n("cnt-pp"),{stackup:(zk.useStackup===undefined?zk.ie6_:zk.useStackup)})}this._shadow.sync()},hideShadow:function(){this._shadow.hide()},destroy:function(){this._wgt.rerender()},getPosition:function(){var b=this._wgt;if(b.isTopmost()){var a=b.getMenubar();if(a){return"vertical"==a.getOrient()?"end_before":"after_start"}}return"end_before"}});
zkreg('zul.menu.Menu');zk._m={};
zk._m['default']=function(a){var c=this.uuid,e=this.getZclass(),b=zk.ie&&!zk.ie8?"input":"button",d=this._contentHandler;if(this.isTopmost()){a.push('<td align="left"',this.domAttrs_(),'><table id="',c,'-a"',zUtl.cellps0,' class="',e,"-body");if(this.getImage()){a.push(" ",e,"-body");if(this.getLabel()){a.push("-text")}a.push("-img")}a.push('" style="width: auto;"><tbody><tr><td class="',e,'-inner-l"><span class="',e,'-space"></span></td><td class="',e,'-inner-m"><div><',b,' id="',c,'-b" type="button" class="',e,'-btn"');if(this.getImage()){a.push(' style="background-image:url(',this.getImage(),')"')}a.push(">",zUtl.encodeXML(this.getLabel()),"&nbsp;</",b,">");if(this.menupopup){this.menupopup.redraw(a)}else{if(d){d.redraw(a)}}a.push('</div></td><td class="',e,'-inner-r"><span class="',e,'-space"></span></td></tr></tbody></table></td>')}else{a.push("<li",this.domAttrs_(),'><a href="javascript:;" id="',c,'-a" class="',e,"-cnt ",e,'-cnt-img">',this.domContent_(),"</a>");if(this.menupopup){this.menupopup.redraw(a)}else{if(d){d.redraw(a)}}a.push("</li>")}};
;zkmld(zk._p.p.Menu,zk._m);zul.menu.Menuitem=zk.$extends(zul.LabelImageWidget,{_value:"",$define:{checkmark:_zkf=function(){this.rerender()},disabled:_zkf,href:_zkf,value:null,checked:function(b){if(b){this._checkmark=b}var d=this.$n("a");if(d&&!this.isTopmost()&&!this.getImage()){var c=this.getZclass(),a=jq(d);a.removeClass(c+"-cnt-ck").removeClass(c+"-cnt-unck");if(this._checkmark){a.addClass(c+(b?"-cnt-ck":"-cnt-unck"))}}},autocheck:null,target:function(b){var a=this.$n("a");if(a){if(this.isTopmost()){a=a.parentNode}a.target=this._target}},upload:function(a){var b=this.$n();if(b){this._cleanUpld();if(a&&a!="false"){this._initUpld()}}}},isTopmost:function(){return this._topmost},beforeParentChanged_:function(a){this._topmost=a&&!(a.$instanceof(zul.menu.Menupopup));this.$supers("beforeParentChanged_",arguments)},domClass_:function(c){var b=this.$supers("domClass_",arguments);if(!c||!c.zclass){var a=this.isDisabled()?this.getZclass()+"-disd":"";if(a){b+=(b?" ":"")+a}}return b},getZclass:function(){return this._zclass==null?"z-menu-item":this._zclass},domContent_:function(){var b=zUtl.encodeXML(this.getLabel()),a='<span class="'+this.getZclass()+'-img"'+(this._image?' style="background-image:url('+this._image+')"':"")+"></span>";return b?a+" "+b:a},domStyle_:function(b){var a=this.$supers("domStyle_",arguments);return this.isTopmost()?a+"padding-left:4px;padding-right:4px;":a},getMenubar:function(){for(var a=this.parent;a;a=a.parent){if(a.$instanceof(zul.menu.Menubar)){return a}}return null},bind_:function(){this.$supers(zul.menu.Menuitem,"bind_",arguments);if(!this.isDisabled()){if(this.isTopmost()){var a=this.$n("a");this.domListen_(a,"onFocus","doFocus_").domListen_(a,"onBlur","doBlur_")}if(this._upload){this._initUpld()}}},unbind_:function(){if(!this.isDisabled()){if(this._upload){this._cleanUpld()}if(this.isTopmost()){var a=this.$n("a");this.domUnlisten_(a,"onFocus","doFocus_").domUnlisten_(a,"onBlur","doBlur_")}}this.$supers(zul.menu.Menuitem,"unbind_",arguments)},_initUpld:function(){zWatch.listen(zk.ie7_?{onShow:this,onSize:this}:{onShow:this});var a;if(a=this._upload){this._uplder=new zul.Upload(this,this.isTopmost()?this.$n():this.$n("a"),a)}},_cleanUpld:function(){var a;if(a=this._uplder){zWatch.unlisten(zk.ie7_?{onShow:this,onSize:this}:{onShow:this});this._uplder=null;a.destroy()}},onShow:_zkf=function(){if(this._uplder){this._uplder.sync()}},onSize:zk.ie7_?_zkf:zk.$void,doClick_:function(a){if(this._disabled){a.stop()}else{if(!this._canActivate(a)){return}var b=this.isTopmost(),c=this.$n("a");if(b){jq(c).removeClass(this.getZclass()+"-body-over");c=c.parentNode}if(c.href.startsWith("javascript:")){if(this.isAutocheck()){this.setChecked(!this.isChecked());this.fire("onCheck",this.isChecked())}this.fireX(a)}else{if(zk.ie&&b&&this.$n().id!=c.id){zUtl.go(c.href,{target:c.target})}if(zk.gecko3&&b&&this.$n().id!=c.id){zUtl.go(c.href,{target:c.target});a.stop()}}if(!b){for(var d=this.parent;d;d=d.parent){if(d.$instanceof(zul.menu.Menupopup)){if(d.isOpen()&&!this._uplder){d.close({sendOnOpen:true})}else{break}}}}this.$class._rmActive(this);this.$super("doClick_",a,true)}},_canActivate:function(a){return !this.isDisabled()&&(!zk.ie||!this.isTopmost()||this._uplder||jq.isAncestor(this.$n("a"),a.domTarget))},doMouseOver_:function(a){if(!this.$class._isActive(this)&&this._canActivate(a)){this.$class._addActive(this);zWatch.fire("onFloatUp",this)}this.$supers("doMouseOver_",arguments)},doMouseOut_:function(c){if(!this.isDisabled()){var b=!zk.ie;if(!b){var g=this.$n("a"),e=zk(g).revisedOffset(),a=c.pageX,f=c.pageY,d=this.isTopmost()?1:0;b=a-d<=e[0]||a>e[0]+g.offsetWidth||f-d<=e[1]||f>e[1]+g.offsetHeight+(zk.ie?-1:0)}if(b){this.$class._rmActive(this)}}this.$supers("doMouseOut_",arguments)}},{_isActive:function(c){var b=c.isTopmost(),d=b?c.$n("a"):c.$n(),a=c.getZclass()+(b?"-body-over":"-over");return jq(d).hasClass(a)},_addActive:function(c){var b=c.isTopmost(),d=b?c.$n("a"):c.$n(),a=c.getZclass()+(b?"-body-over":"-over");jq(d).addClass(a);if(!b&&c.parent.parent.$instanceof(zul.menu.Menu)){this._addActive(c.parent.parent)}},_rmActive:function(c){var b=c.isTopmost(),d=b?c.$n("a"):c.$n(),a=c.getZclass()+(b?"-body-over":"-over");jq(d).removeClass(a)}});
zkreg('zul.menu.Menuitem');zk._m={};
zk._m['default']=function(c){var e=this.uuid,g=this.getZclass(),d=zk.ie&&!zk.ie8?"input":"button",f=this.getTarget(),b=this.getImage();if(this.isTopmost()){c.push('<td align="left"',this.domAttrs_(),'><a href="',this.getHref()?this.getHref():"javascript:;",'"');if(f){c.push(' target="',f,'"')}c.push(' class="',g,'-cnt"><table id="',e,'-a"',zUtl.cellps0,' class="',g,"-body");if(b){c.push(" ",g,"-body");if(this.getLabel()){c.push("-text")}c.push("-img")}c.push('" style="width: auto;"><tbody><tr><td class="',g,'-inner-l"><span class="',g,'-space"></span></td><td class="',g,'-inner-m"><div><',d,' id="',e,'-b" type="button" class="',g,'-btn"');if(b){c.push(' style="background-image:url(',b,')"')}c.push(">",zUtl.encodeXML(this.getLabel()),"&nbsp;</",d,'></div></td><td class="',g,'-inner-r"><span class="',g,'-space"></span></td></tr></tbody></table></a></td>')}else{c.push("<li",this.domAttrs_(),">");var a=g+"-cnt"+(!b&&this.isCheckmark()?" "+g+(this.isChecked()?"-cnt-ck":"-cnt-unck"):"");c.push('<a href="',this.getHref()?this.getHref():"javascript:;",'"');if(f){c.push(' target="',f,'"')}c.push(' id="',e,'-a" class="',a,'">',this.domContent_(),"</a></li>")}};
;zkmld(zk._p.p.Menuitem,zk._m);zul.menu.Menuseparator=zk.$extends(zul.Widget,{isPopup:function(){return this.parent&&this.parent.$instanceof(zul.menu.Menupopup)},getMenubar:function(){for(var a=this.parent;a;a=a.parent){if(a.$instanceof(zul.menu.Menubar)){return a}}return null},getZclass:function(){return this._zclass==null?"z-menu-separator":this._zclass},doMouseOver_:function(){zWatch.fire("onFloatUp",this);this.$supers("doMouseOver_",arguments)}});
zkreg('zul.menu.Menuseparator');zk._m={};
zk._m['default']=function(a){var b=this.isPopup()?"li":"td";a.push("<",b,this.domAttrs_(),'><span class="',this.getZclass(),'-inner">&nbsp;</span></',b,">")};
;zkmld(zk._p.p.Menuseparator,zk._m);zul.menu.Menupopup=zk.$extends(zul.wgt.Popup,{_curIndex:-1,_getCurrentIndex:function(){return this._curIndex},getZclass:function(){return this._zclass==null?"z-menu-popup":this._zclass},_isActiveItem:function(a){return a.isVisible()&&(a.$instanceof(zul.menu.Menu)||(a.$instanceof(zul.menu.Menuitem)&&!a.isDisabled()))},_currentChild:function(c){var c=c!=null?c:this._curIndex;for(var a=this.firstChild,b=-1;a;a=a.nextSibling){if(this._isActiveItem(a)&&++b===c){return a}}return null},_previousChild:function(b){b=b?b.previousSibling:this.lastChild;var a=this.lastChild==b;for(;b;b=b.previousSibling){if(this._isActiveItem(b)){this._curIndex--;return b}}if(a){return null}this.curIndex=0;for(b=this.firstChild;b;b=b.nextSibling){if(this._isActiveItem(b)){this._curIndex++}}return this._previousChild()},_nextChild:function(b){b=b?b.nextSibling:this.firstChild;var a=this.firstChild==b;for(;b;b=b.nextSibling){if(this._isActiveItem(b)){this._curIndex++;return b}}if(a){return null}this._curIndex=-1;return this._nextChild()},zsync:function(){this.$supers("zsync",arguments);if(!this._shadow){this._shadow=new zk.eff.Shadow(this.$n())}this._shadow.sync()},_hideShadow:function(){if(this._shadow){this._shadow.hide()}},close:function(){this.$supers("close",arguments);jq(this.$n()).hide();this._hideShadow();var b=this.parent;if(b.$instanceof(zul.menu.Menu)&&b.isTopmost()){jq(b.$n("a")).removeClass(b.getZclass()+"-body-seld")}var a=this._currentChild();if(a){a.$class._rmActive(a)}this._curIndex=-1;this.$class._rmActive(this)},open:function(c,d,a,b){if(this.parent.$instanceof(zul.menu.Menu)){if(!d){c=this.parent.$n("a");if(!a){if(this.parent.isTopmost()){a=this.parent.parent.getOrient()=="vertical"?"end_before":"after_start"}else{a="end_before"}}}}this.$super("open",c,d,a,b||{sendOnOpen:true,disableMask:true})},shallStackup_:function(){return false},setTopmost:function(){this.$supers("setTopmost",arguments);this.zsync()},onFloatUp:function(a){if(!this.isVisible()){return}var d=a.origin;if(this.parent.menupopup==this&&!this.parent.isTopmost()&&!this.parent.$class._isActive(this.parent)){this.close({sendOnOpen:true});return}for(var c,b=d;b;b=b.parent){if(b==this||(b.menupopup==this&&!this._shallClose)){if(!c){this.setTopmost()}return}c=c||b.isFloating_()}if(d&&d.$instanceof(zul.menu.Menu)){for(var c,b=this;b=b.parent;){if(b==d){if(this._shallClose){break}if(!c){this.setTopmost()}return}c=c||b.isFloating_()}}this.close({sendOnOpen:true})},onShow:function(){if(zk.ie7_){var a=this.$n();if(!a.style.width){var b=this.$n("cave");if(b.childNodes.length){a.style.width=b.offsetWidth+zk(a).padBorderWidth()+"px"}}}this.zsync();var c=this.$n("a");if(c){if(zk(c).isRealVisible()){c.focus()}}},onHide:function(){if(this.isOpen()){this.close()}this._hideShadow()},bind_:function(){this.$supers(zul.menu.Menupopup,"bind_",arguments);zWatch.listen({onHide:this,onResponse:this});if(!zk.css3){jq.onzsync(this)}},unbind_:function(){if(this.isOpen()){this.close()}if(this._shadow){this._shadow.destroy()}if(!zk.css3){jq.unzsync(this)}this._shadow=null;zWatch.unlisten({onHide:this,onResponse:this});this.$supers(zul.menu.Menupopup,"unbind_",arguments)},onResponse:function(){if(!this.isOpen()){return}if(zk.ie7_){var a=this.$n();a.style.width="";var b=this.$n("cave");if(b.childNodes.length){a.style.width=b.offsetWidth+zk(a).padBorderWidth()+"px"}}this.zsync();this.$supers("onResponse",arguments)},doKeyDown_:function(c){var b=this._currentChild(),e=c.keyCode;switch(e){case 38:case 40:if(b){b.$class._rmActive(b)}b=e==38?this._previousChild(b):this._nextChild(b);if(b){b.$class._addActive(b)}break;case 37:this.close();if(this.parent.$instanceof(zul.menu.Menu)&&!this.parent.isTopmost()){var a=this.parent.parent;if(a){var d=a.$n("a");if(d){d.focus()}}}break;case 39:if(b&&b.$instanceof(zul.menu.Menu)&&b.menupopup){b.menupopup.open()}break;case 13:if(b&&b.$instanceof(zul.menu.Menuitem)){b.doClick_(new zk.Event(b,"onClick",{}));zWatch.fire("onFloatUp",b);this.close({sendOnOpen:true})}break}c.stop();this.$supers("doKeyDown_",arguments)},doMouseOver_:function(a){this._shallClose=false;this.$supers("doMouseOver_",arguments)}},{_rmActive:function(a){if(a.parent.$instanceof(zul.menu.Menu)){a.parent.$class._rmActive(a.parent);if(!a.parent.isTopmost()){this._rmActive(a.parent.parent)}}}});
zkreg('zul.menu.Menupopup');zk._m={};
zk._m['default']=function(c){var d=this.uuid,e=this.getZclass(),b=zk.ie||zk.gecko?"a":"button";c.push("<div",this.domAttrs_(),"><",b,' id="',d,'-a" tabindex="-1" onclick="return false;" href="javascript:;"',' class="z-focus-a"></',b,'><ul class="',e,'-cnt" id="',d,'-cave">');for(var a=this.firstChild;a;a=a.nextSibling){a.redraw(c)}c.push("</ul></div>")};
;zkmld(zk._p.p.Menupopup,zk._m);
}finally{zk.setLoaded(zk._p.n);}});zk.setLoaded('zul.menu',1);