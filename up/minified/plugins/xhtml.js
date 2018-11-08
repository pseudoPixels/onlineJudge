/*!pl SCEditor | (C) 2011-2013, Sam Clarke | sceditor.com/license */
(function(e){"use strict";e.sceditor.XHTMLSerializer=function(){var t,n,o,i,r,s,a,l,c,d,u=this,p={indentStr:"	"},f=[],h=0;t=function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};return e?e.replace(/[&<>"]/g,function(e){return t[e]||e}):""},n=function(e){return e.replace(/[\r\n]/,"").replace(/[^\S|\u00A0]+/g," ")},u.serialize=function(e,t){if(f=[],t)for(e=e.firstChild;e;)o(e),e=e.nextSibling;else o(e);return f.join("")},o=function(e,t){switch(e.nodeType){case 1:var n=e.nodeName.toLowerCase();"!"===n?a(e):r(e,t);break;case 3:l(e,t);break;case 4:s(e);break;case 8:a(e);break;case 9:case 11:i(e);break;case 2:case 5:case 6:case 7:case 10:case 12:}},i=function(e){var t;for(t=e.firstChild;t;)o(t),t=t.nextSibling},r=function(n,i){var r,s,a,l=n.nodeName.toLowerCase(),u=n.attributes.length,p=i||/pre(?:\-wrap)?$/i.test(e(n).css("whiteSpace")),f=!n.firstChild&&e.sceditor.XHTMLSerializer.emptyTags.indexOf("|"+l+"|")>-1;if(!e(n).hasClass("sceditor-ignore")){for(c("<"+l,!i&&d(n));u--;)s=n.attributes[u],(!e.sceditor.ie||s.specified)&&(a=8>e.sceditor.ie&&/style/i.test(s.name)?n.style.cssText:s.value,c(" "+s.name.toLowerCase()+'="'+t(a)+'"',!1));for(c(f?" />":">",!1),r=n.firstChild;r;)h++,o(r,p),r=r.nextSibling,h--;f||c("</"+l+">",!p&&d(n)&&n.firstChild&&d(n.firstChild))}},s=function(e){c("<![CDATA["+t(e.nodeValue)+"]]>")},a=function(e){c("<!-- "+t(e.nodeValue)+" -->")},l=function(e,o){var i=e.nodeValue;o||(i=n(i)),i&&c(t(i),!o&&d(e))},c=function(e,t){var n=h;if(t!==!1)for(f.length&&f.push("\n");n--;)f.push(p.indentStr);f.push(e)},d=function(t){var n=t.previousSibling;return 1!==t.nodeType&&n?!e.sceditor.dom.isInline(n):n||e.sceditor.dom.isInline(t.parentNode)?!e.sceditor.dom.isInline(t):!0}},e.sceditor.XHTMLSerializer.emptyTags="|area|base|basefont|br|col|frame|hr|img|input|isindex|link|meta|param|command|embed|keygen|source|track|wbr|",e.sceditor.plugins.xhtml=function(){var t,n,o,i,r,s,a,l=this,c={},d={};l.init=function(){e.isEmptyObject(e.sceditor.plugins.xhtml.converters||{})||e.each(e.sceditor.plugins.xhtml.converters,function(t,n){e.each(n.tags,function(e){c[e]||(c[e]=[]),c[e].push(n)})}),t(this)},t=function(t){var n={bold:{txtExec:["<strong>","</strong>"]},italic:{txtExec:["<em>","</em>"]},underline:{txtExec:['<span style="text-decoration: underline;">',"<span>"]},strike:{txtExec:['<span style="text-decoration: line-through;">',"<span>"]},subscript:{txtExec:["<sub>","</sub>"]},superscript:{txtExec:["<sup>","</sup>"]},left:{txtExec:['<div style="text-align: left;">',"<div>"]},center:{txtExec:['<div style="text-align: center;">',"<div>"]},right:{txtExec:['<div style="text-align: right;">',"<div>"]},justify:{txtExec:['<div style="text-align: justify;">',"<div>"]},font:{txtExec:function(t){var n=this;e.sceditor.command.get("font")._dropDown(n,t,function(e){n.insertText('<span style="font-family: '+e+';">',"</span>")})}},size:{txtExec:function(t){var n=this;e.sceditor.command.get("size")._dropDown(n,t,function(e){n.insertText('<span style="font-size: '+e+';">',"</span>")})}},color:{txtExec:function(t){var n=this;e.sceditor.command.get("color")._dropDown(n,t,function(e){n.insertText('<span style="color: '+e+';">',"</span>")})}},bulletlist:{txtExec:["<ul><li>","</li></ul>"]},orderedlist:{txtExec:["<ol><li>","</li></ol>"]},table:{txtExec:["<table><tr><td>","</td></tr></table>"]},horizontalrule:{txtExec:["<hr />"]},code:{txtExec:["<code>","</code>"]},image:{txtExec:function(e,t){var n=prompt(this._("Enter the image URL:"),t);n&&this.insertText('<img src="'+n+'" />')}},email:{txtExec:function(e,t){var n=t&&t.indexOf("@")>-1?null:t,o=prompt(this._("Enter the e-mail address:"),n?"":t),i=prompt(this._("Enter the displayed text:"),n||o)||o;o&&this.insertText('<a href="mailto:'+o+'">'+i+"</a>")}},link:{txtExec:function(e,t){var n=t&&t.indexOf("http://")>-1?null:t,o=prompt(this._("Enter URL:"),n?"http://":t),i=prompt(this._("Enter the displayed text:"),n||o)||o;o&&this.insertText('<a href="'+o+'">'+i+"</a>")}},quote:{txtExec:["<blockquote>","</blockquote>"]},youtube:{txtExec:function(t){var n=this;e.sceditor.command.get("youtube")._dropDown(n,t,function(e){n.insertText('<iframe width="560" height="315" src="http://www.youtube.com/embed/{id}?wmode=opaque" data-youtube-id="'+e+'" frameborder="0" allowfullscreen></iframe>')})}},rtl:{txtExec:['<div stlye="direction: rtl;">',"</div>"]},ltr:{txtExec:['<div stlye="direction: ltr;">',"</div>"]}};t.commands=e.extend(!0,{},n,t.commands)},l.signalToSource=function(t,o){return o=o.jquery?o[0]:o,n(o),r(o),a(o),(new e.sceditor.XHTMLSerializer).serialize(o,!0)},l.signalToWysiwyg=function(e){return e},l.convertTagTo=function(t,n){for(var o,i,r=t.attributes.length,s=t.ownerDocument.createElement(n);r--;)i=t.attributes[r],(!e.sceditor.ie||i.specified)&&(8>e.sceditor.ie&&/style/i.test(i.name)?t.style.cssText=t.style.cssText:s.setAttribute(i.name,i.value));for(;o=t.firstChild;)s.appendChild(o);return t.parentNode.replaceChild(s,t),s},o=function(t,n,o){c[t]&&e.each(c[t],function(i,r){r.tags[t]?e.each(r.tags[t],function(t,i){o.getAttributeNode&&(t=o.getAttributeNode(t),!t||8>e.sceditor.ie&&!t.specified||i&&0>e.inArray(t.value,i)||r.conv.call(l,o,n))}):r.conv&&r.conv.call(l,o,n)})},n=function(t){c&&e.sceditor.dom.traverse(t,function(t){var n=e(t),i=t.nodeName.toLowerCase();c&&(o("*",n,t),o(i,n,t))},!0)},i=function(t,n){var o=t.childNodes,r=t.nodeName.toLowerCase(),s=t.nodeValue,a=o.length;if(n&&"br"===r)return!0;if(e.sceditor.XHTMLSerializer.emptyTags.indexOf("|"+r+"|")>-1)return!1;if(s&&/\S|\u00A0/.test(s))return!1;for(;a--;)if(!i(o[a],!t.previousSibling&&!t.nextSibling))return!1;return!0},r=function(t){e.sceditor.dom.traverse(t,function(t){var n,o=i(t),r=t.nodeName.toLowerCase(),s=t.parentNode,a=t.nodeType,l=e.sceditor.plugins.xhtml.allowedTags,c=e.sceditor.plugins.xhtml.disallowedTags;if(3!==a&&(4===a?r="!cdata":("!"===r||8===a)&&(r="!comment"),o?n=!0:l&&l.length?n=0>e.inArray(r,l):c&&c.length&&(n=e.inArray(r,c)>-1),n)){for(;!o&&t.firstChild;)s.insertBefore(t.firstChild,t);s.removeChild(t)}},!0)},s=function(t,n){var o={};return t&&e.extend(o,t),n?(e.each(n,function(t,n){e.isArray(n)?o[t]=e.merge(o[t]||[],n):o[t]||(o[t]=null)}),o):o},a=function(t){var n,o,i,r,a,l,c=e.sceditor.plugins.xhtml.allowedAttribs,u=c&&!e.isEmptyObject(c),p=e.sceditor.plugins.xhtml.disallowedAttribs,f=p&&!e.isEmptyObject(p);d={},e.sceditor.dom.traverse(t,function(t){if(t.attributes&&(n=t.nodeName.toLowerCase(),r=t.attributes.length))for(d[n]||(d[n]=u?s(c["*"],c[n]):s(p["*"],p[n]));r--;)o=t.attributes[r],i=o.name,a=d[n][i],l=!1,u?l=null!==a&&(!e.isArray(a)||0>e.inArray(o.value,a)):f&&(l=null===a||e.isArray(a)&&e.inArray(o.value,a)>-1),l&&t.removeAttribute(i)})}},e.sceditor.plugins.xhtml.converters=[{tags:{"*":{width:null}},conv:function(e,t){t.css("width",t.attr("width")).removeAttr("width")}},{tags:{"*":{height:null}},conv:function(e,t){t.css("height",t.attr("height")).removeAttr("height")}},{tags:{li:{value:null}},conv:function(e,t){t.removeAttr("value")}},{tags:{"*":{text:null}},conv:function(e,t){t.css("color",t.attr("text")).removeAttr("text")}},{tags:{"*":{color:null}},conv:function(e,t){t.css("color",t.attr("color")).removeAttr("color")}},{tags:{"*":{face:null}},conv:function(e,t){t.css("fontFamily",t.attr("face")).removeAttr("face")}},{tags:{"*":{align:null}},conv:function(e,t){t.css("textAlign",t.attr("align")).removeAttr("align")}},{tags:{"*":{border:null}},conv:function(e,t){t.css("borderWidth",t.attr("border")).removeAttr("border")}},{tags:{applet:{name:null},img:{name:null},layer:{name:null},map:{name:null},object:{name:null},param:{name:null}},conv:function(e,t){t.attr("id")||t.attr("id",t.attr("name")),t.removeAttr("name")}},{tags:{"*":{vspace:null}},conv:function(e,t){t.css("marginTop",t.attr("vspace")-0).css("marginBottom",t.attr("vspace")-0).removeAttr("vspace")}},{tags:{"*":{hspace:null}},conv:function(e,t){t.css("marginLeft",t.attr("hspace")-0).css("marginRight",t.attr("hspace")-0).removeAttr("hspace")}},{tags:{hr:{noshade:null}},conv:function(e,t){t.css("borderStyle","solid").removeAttr("noshade")}},{tags:{"*":{nowrap:null}},conv:function(e,t){t.css("white-space","nowrap").removeAttr("nowrap")}},{tags:{big:null},conv:function(t){e(this.convertTagTo(t,"span")).css("fontSize","larger")}},{tags:{small:null},conv:function(t){e(this.convertTagTo(t,"span")).css("fontSize","smaller")}},{tags:{b:null},conv:function(t){e(this.convertTagTo(t,"strong"))}},{tags:{u:null},conv:function(t){e(this.convertTagTo(t,"span")).css("textDecoration","underline")}},{tags:{i:null},conv:function(t){e(this.convertTagTo(t,"em"))}},{tags:{s:null,strike:null},conv:function(t){e(this.convertTagTo(t,"span")).css("textDecoration","line-through")}},{tags:{dir:null},conv:function(e){this.convertTagTo(e,"ul")}},{tags:{center:null},conv:function(t){e(this.convertTagTo(t,"div")).css("textAlign","center")}},{tags:{font:{size:null}},conv:function(e,t){t.css("fontSize",t.css("fontSize")).removeAttr("size")}},{tags:{font:null},conv:function(e){this.convertTagTo(e,"span")}},{tags:{"*":{type:["_moz"]}},conv:function(e,t){t.removeAttr("type")}},{tags:{"*":{_moz_dirty:null}},conv:function(e,t){t.removeAttr("_moz_dirty")}},{tags:{"*":{_moz_editor_bogus_node:null}},conv:function(e,t){t.remove()}}],e.sceditor.plugins.xhtml.allowedAttribs={},e.sceditor.plugins.xhtml.disallowedAttribs={},e.sceditor.plugins.xhtml.allowedTags=[],e.sceditor.plugins.xhtml.disallowedTags=[]})(jQuery);