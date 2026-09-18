/*! humidifier-card v0.6.1 | GPL-3.0-only | https://github.com/iharosi/humidifier-card */
function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,m=f?f.emptyScript:"",_=p.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[g("elementProperties")]=new Map,y[g("finalized")]=new Map,_?.({ReactiveElement:y}),(p.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,P=`<${C}>`,O=document,M=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,z=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=B(1),V=B(2),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Z=new WeakMap,J=O.createTreeWalker(O,129);function K(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=j;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===j?"!--"===l[1]?o=H:void 0!==l[1]?o=R:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=n??j,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?D:I):o===D||o===I?o=z:o===H||o===R?o=j:(o=z,n=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";r+=o===j?i+P:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=G.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[r++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?st:"@"===o[1]?nt:et}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),J.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);J.currentNode=s;let n=J.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new tt(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new rt(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=J.nextNode(),r++)}return J.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new G(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new tt(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Q(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Q(this,s[i+o],e,o),a===q&&(a=this._$AH[o]),r||=!T(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class nt extends et{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===q)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(G,tt),(x.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;let lt=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ct=at.litElementPolyfillSupport;ct?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},ut=(t=dt,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return pt({...t,state:!0,attribute:!1})}const mt=1,_t=t=>(...e)=>({_$litDirective$:t,values:e});let gt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const $t=_t(class extends gt{constructor(t){if(super(t),t.type!==mt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return q}}),bt="important",vt=" !"+bt,yt=_t(class extends gt{constructor(t){if(super(t),t.type!==mt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(vt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?bt:""):i[t]=s}}return q}}),xt="humidifier-card",wt="humidifier-card-editor",At=["power","mode","fan_level","target_humidity","humidity","light","sound","connection","fault"],Et={power:{domain:"switch",suffix:"_humidifier"},mode:{domain:"select",suffix:"_mode"},fan_level:{domain:"number",suffix:"_fan_level"},target_humidity:{domain:"number",suffix:"_target_humidity"},humidity:{domain:"sensor",suffix:"_humidity"},light:{domain:"switch",suffix:"_indicator_light"},sound:{domain:"switch",suffix:"_sound_buzzer"},connection:{domain:"binary_sensor",suffix:"_connection_status"},fault:{domain:"sensor",suffix:"_device_fault"}},St={power:"Humidifier",mode:"Mode",fan_level:"Fan level",target_humidity:"Target humidity",humidity:"Humidity",light:"Indicator light",sound:"Sound (buzzer)",connection:"Connection",fault:"Device fault"},kt={light:{on:"mdi:lightbulb",off:"mdi:lightbulb-off-outline"},sound:{on:"mdi:volume-high",off:"mdi:volume-off"}},Ct=[{max:30,label:"Dry",color:"#fb8c00"},{max:40,label:"Slightly dry",color:"#fdd835"},{max:60,label:"Comfortable",color:"#039be5"},{max:70,label:"Humid",color:"#3949ab"},{max:1/0,label:"Very humid",color:"#8e24aa"}],Pt={max:1/0,label:"Unknown",color:"var(--disabled-text-color, #9e9e9e)"},Ot=new Set(["none","no_faults","no fault","ok","normal","0",""]),Mt=new Set(["unavailable","unknown"]),Tt=[{name:"prefix",required:!0,selector:{text:{}}},{name:"name",selector:{text:{}}},{name:"mode_on",selector:{text:{}}},{name:"show_status",selector:{boolean:{}}},{name:"dim_when_off",selector:{boolean:{}}},{name:"hide",selector:{select:{multiple:!0,mode:"list",options:At.map(t=>({value:t,label:St[t]}))}}}],Nt={prefix:"Entity prefix (e.g. smart_humidifier)",name:"Name (optional)",mode_on:'Mode option that counts as "on" (optional)',show_status:"Show the device fault chip",dim_when_off:"Disable target, fan level and mode while the humidifier is off",hide:"Hide these controls"};let Ut=class extends lt{constructor(){super(...arguments),this._valueChanged=t=>{t.stopPropagation();const e={...t.detail.value};e.name||delete e.name,e.mode_on||delete e.mode_on,e.hide?.length||delete e.hide,e.hide&&(e.hide=e.hide.filter(t=>At.includes(t))),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}setConfig(t){this._config=t}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Tt}
        .computeLabel=${t=>Nt[t.name]??t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:W}};function jt(t,e,i){return Math.min(Math.max(t,e),i)}t([pt({attribute:!1})],Ut.prototype,"hass",void 0),t([ft()],Ut.prototype,"_config",void 0),Ut=t([ht(wt)],Ut);const Ht=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)})`
  :host {
    --hc-accent: var(--state-humidifier-on-color, var(--primary-color, #03a9f4));
    --hc-idle-color: var(--disabled-text-color, #9e9e9e);
    --hc-bad: var(--error-color, #db4437);
  }
  ha-card {
    display: block;
    padding: 12px 14px;
    overflow: hidden;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  /* -------- dial -------- */
  .visual {
    position: relative;
    width: 68px;
    height: 68px;
    flex: 0 0 68px;
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    place-items: center;
    background: radial-gradient(
      circle at 50% 50%,
      color-mix(in srgb, var(--hc-accent) 18%, transparent),
      transparent 70%
    );
    transition: background 0.4s ease;
  }
  .visual.off {
    background: none;
  }
  .visual:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 2px;
  }
  svg {
    width: 68px;
    height: 68px;
    display: block;
    position: relative;
  }
  .ring {
    fill: none;
    stroke: var(--divider-color, rgba(127, 127, 127, 0.25));
    stroke-width: 4;
  }
  .ring-value {
    fill: none;
    stroke: var(--hc-accent);
    stroke-width: 4;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 50px 50px;
    transition:
      stroke-dashoffset 0.5s ease,
      stroke 0.4s ease;
  }
  .target-mark {
    fill: var(--card-background-color, #fff);
    stroke: var(--hc-accent);
    stroke-width: 2.5;
    transition: stroke 0.4s ease;
  }
  .drop,
  .mist {
    fill: var(--hc-accent);
    transition: fill 0.4s ease;
  }
  .shine {
    fill: none;
    stroke: var(--card-background-color, #fff);
    stroke-width: 2.4;
    stroke-linecap: round;
    opacity: 0.7;
  }

  /* mist: droplets lifting off the water, faster at higher fan levels */
  .mist {
    opacity: 0;
  }
  .visual.on .mist {
    animation: mist calc(var(--spin, 2s) * 2) ease-out infinite;
  }
  .visual.on .mist:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.5);
  }
  .visual.on .mist:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 1);
  }
  .visual.on .mist:nth-of-type(4) {
    animation-delay: calc(var(--spin, 2s) * 1.5);
  }
  @keyframes mist {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    20% {
      opacity: 0.9;
    }
    70% {
      opacity: 0.45;
    }
    100% {
      transform: translateY(-26px);
      opacity: 0;
    }
  }

  /* -------- body -------- */
  .body {
    flex: 1;
    min-width: 0;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .name {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    cursor: pointer;
    border-radius: 4px;
  }
  .name:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 2px;
  }
  .pct {
    font-size: 15px;
    font-weight: 600;
    color: var(--hc-accent);
    font-variant-numeric: tabular-nums;
  }
  .pct.off {
    color: var(--secondary-text-color);
  }
  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 18px;
    margin: 6px 0 2px;
    background: none;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--hc-accent) var(--fill, 0%),
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
    );
  }
  input[type='range']::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--hc-accent) var(--fill, 0%),
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
    );
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -4px;
    border-radius: 50%;
    background: var(--hc-accent);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }
  input[type='range']::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 50%;
    background: var(--hc-accent);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }
  input[type='range']:disabled {
    opacity: 0.45;
    cursor: default;
  }
  input[type='range']:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* -------- chips -------- */
  .chips {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    line-height: 18px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--secondary-text-color);
    cursor: pointer;
    white-space: nowrap;
    min-width: 0;
  }
  .chip:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 1px;
  }
  .chip ha-icon {
    --mdc-icon-size: 14px;
    flex: 0 0 auto;
  }
  .chip span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip.status {
    flex: 0 1 auto;
  }
  .chip.bad {
    color: var(--hc-bad);
    background: color-mix(in srgb, var(--hc-bad) 12%, transparent);
    font-weight: 500;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: 0 0 8px;
  }
  .spacer {
    flex: 1;
  }

  /* -------- presets: fan levels and toggles -------- */
  .presets {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
  }
  .group {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  /* pushed right, and onto its own line on narrow cards rather than overflowing */
  .toggles {
    margin-left: auto;
  }
  .preset-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex: 0 0 auto;
  }
  .preset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    font: inherit;
    font-size: 11px;
    line-height: 18px;
    min-width: 26px;
    padding: 2px 7px;
    border-radius: 11px;
    color: var(--secondary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    cursor: pointer;
    flex: 0 0 auto;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }
  .preset.toggle {
    padding: 2px 6px;
  }
  .preset ha-icon {
    --mdc-icon-size: 14px;
  }
  .preset.active {
    background: var(--hc-accent);
    color: var(--text-primary-color, #fff);
  }
  .preset:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .preset:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 1px;
  }

  /* -------- power -------- */
  .power {
    flex: 0 0 auto;
    border: none;
    background: none;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
    transition:
      color 0.3s ease,
      background 0.3s ease;
  }
  .power.on {
    color: var(--hc-accent);
    background: color-mix(in srgb, var(--hc-accent) 16%, transparent);
  }
  .power:hover {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.18));
  }
  .power:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 1px;
  }
  .unavailable {
    opacity: 0.55;
    pointer-events: none;
  }

  .warning {
    padding: 8px 16px;
    color: var(--hc-bad);
    font-size: 13px;
  }
`,Rt=2*Math.PI*44;let zt=class extends lt{constructor(){super(...arguments),this._entities={},this._pending={},this._pendingTimers=new Map,this._warnedMissing=!1,this._togglePower=()=>{const t=this._stateObj("power");if(!t||!this._isAvailable(t))return;const e="on"===(this._pending.power??t.state);this._setSwitch("power",!e)}}static getConfigElement(){return document.createElement(wt)}static getStubConfig(){return{prefix:"smart_humidifier"}}setConfig(t){!function(t){if(!t||"object"!=typeof t)throw new Error("humidifier-card: no configuration provided");if(t.hide&&!Array.isArray(t.hide))throw new Error("humidifier-card: `hide` must be a list of slot names");const e=(t.hide??[]).filter(t=>!At.includes(t));if(e.length)throw new Error(`humidifier-card: unknown slot(s) in \`hide\`: ${e.join(", ")}. Valid slots: ${At.join(", ")}`);const i=Object.keys(t.entities??{}).filter(t=>!At.includes(t));if(i.length)throw new Error(`humidifier-card: unknown slot(s) in \`entities\`: ${i.join(", ")}. Valid slots: ${At.join(", ")}`);if(!t.prefix&&!t.entities?.power)throw new Error("humidifier-card: set `prefix` (e.g. smart_humidifier) or at least `entities.power`")}(t),this._config={show_status:!0,dim_when_off:!1,...t},this._entities=function(t){const e=new Set(t.hide??[]),i={};for(const s of At){if(e.has(s))continue;const n=t.entities?.[s];if(n)i[s]=n;else if(t.prefix){const{domain:e,suffix:n}=Et[s];i[s]=`${e}.${t.prefix}${n}`}}return i}(this._config),this._warnedMissing=!1,this._clearAllPending()}getCardSize(){return 3}disconnectedCallback(){super.disconnectedCallback(),this._clearAllPending()}shouldUpdate(t){if(!this._config)return!1;if(t.size>1||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||Object.values(this._entities).some(t=>e.states[t]!==this.hass.states[t])}updated(t){super.updated(t),this._dropSettledPending(),this._warnAboutMissingEntities()}render(){if(!this._config||!this.hass)return W;const t=this._stateObj("power");if(!t)return F`<ha-card>
        <div class="warning">
          Entity <code>${this._entities.power??"(unset)"}</code> not found. Check the
          <code>prefix</code> in the card configuration.
        </div>
      </ha-card>`;const e=this._isAvailable(t),i="on"===(this._pending.power??t.state),s=!this._config.dim_when_off||i&&e,n=this._stateObj("humidity"),r=this._isAvailable(n)?function(t){if(!t)return null;const e=Number.parseFloat(t.state);return Number.isNaN(e)?null:e}(n):null,o=null===(a=r)?Pt:Ct.find(t=>a<=t.max)??Pt;var a;const l=i?n?o.color:void 0:"var(--hc-idle-color)",c=this._numberInfo("target_humidity"),h=this._numberInfo("fan_level");return F`
      <ha-card
        class=${$t({unavailable:!e})}
        style=${yt(l?{"--hc-accent":l}:{})}
      >
        <div class="row">
          ${this._renderDial(i,r,c,h)}
          <div class="body">
            <div class="head">
              <div
                class="name"
                role="button"
                tabindex="0"
                @click=${()=>this._moreInfo(this._entities.power)}
                @keydown=${t=>this._activate(t,this._entities.power)}
              >
                ${this._config.name??t.attributes.friendly_name??St.power}
              </div>
              <div class=${$t({pct:!0,off:!i})}>
                ${this._headline(i,e,c)}
              </div>
              <button
                class=${$t({power:!0,on:i})}
                type="button"
                title=${St.power}
                aria-label=${St.power}
                aria-pressed=${String(i)}
                ?disabled=${!e}
                @click=${this._togglePower}
              >
                <ha-icon .icon=${"mdi:power"}></ha-icon>
              </button>
            </div>
            ${this._renderTargetSlider(c,s)}
            <div class="chips">
              ${this._renderHumidityChip(n,r,o.label,o.color)}
              <div class="spacer"></div>
              ${this._renderStatusChip()}
            </div>
            ${this._renderPresets(h,s)}
          </div>
        </div>
      </ha-card>
    `}_headline(t,e,i){return e?t?i?.available?`${i.value}${i.unit}`:"On":"Off":"–"}_renderDial(t,e,i,s){const n=3.2-(3.2-.55)*jt(s?.available&&s.max>s.min?(s.value-s.min)/(s.max-s.min)*100:50,1,100)/100,r=null===e?0:jt(e,0,100)/100;return F`
      <div
        class=${$t({visual:!0,on:t,off:!t})}
        style=${yt({"--spin":`${n.toFixed(2)}s`})}
        role="button"
        tabindex="0"
        title=${St.power}
        @click=${this._togglePower}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._togglePower())}}
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <clipPath id="disc"><circle cx="50" cy="50" r="36"></circle></clipPath>
          </defs>
          <circle class="ring" cx="50" cy="50" r=${44}></circle>
          ${V`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r=${44}
            stroke-dasharray=${Rt}
            stroke-dashoffset=${Rt*(1-r)}
          ></circle>`}
          ${i?.available?this._renderTargetMarker(i.value):W}
          <g clip-path="url(#disc)">
            <g class="mist"><circle cx="44" cy="40" r="3.2"></circle></g>
            <g class="mist"><circle cx="52" cy="38" r="2.6"></circle></g>
            <g class="mist"><circle cx="57" cy="41" r="3"></circle></g>
            <g class="mist"><circle cx="48" cy="39" r="2.2"></circle></g>
          </g>
          <path class="drop" d=${"M50 34 C57 43 63 49 63 56 A13 13 0 0 1 37 56 C37 49 43 43 50 34 Z"}></path>
          <path class="shine" d="M44.5 53 a6.5 6.5 0 0 0 3 7.5"></path>
        </svg>
      </div>
    `}_renderTargetMarker(t){const e=jt(t,0,100)/100*2*Math.PI-Math.PI/2,i=50+44*Math.cos(e),s=50+44*Math.sin(e);return V`<circle class="target-mark" cx=${i.toFixed(2)} cy=${s.toFixed(2)} r="4.5"></circle>`}_renderTargetSlider(t,e){if(!t)return W;const i=t.available&&e&&!this._modeIsOn(),s=t.max>t.min?(t.value-t.min)/(t.max-t.min)*100:0;return F`<input
      type="range"
      min=${t.min}
      max=${t.max}
      step=${t.step}
      .value=${String(t.value)}
      ?disabled=${!i}
      title=${St.target_humidity}
      aria-label=${St.target_humidity}
      style=${yt({"--fill":`${jt(s,0,100)}%`})}
      @input=${t=>this._numberInput("target_humidity",t)}
      @change=${t=>this._numberChange("target_humidity",t)}
    />`}_renderHumidityChip(t,e,i,s){if(!t)return W;const n=t.attributes.unit_of_measurement??"%";return F`
      <div
        class="chip humidity"
        role="button"
        tabindex="0"
        title=${St.humidity}
        @click=${()=>this._moreInfo(this._entities.humidity)}
        @keydown=${t=>this._activate(t,this._entities.humidity)}
      >
        <span class="dot" style=${yt({background:s})}></span>
        <span>
          ${null===e?`${St.humidity} ${this._format(t)}`:`${i} · ${Math.round(e)}${n}`}
        </span>
      </div>
    `}_renderStatusChip(){if(!this._config.show_status)return W;const t=this._stateObj("connection");if(t&&this._isAvailable(t)&&"on"!==t.state)return this._statusChip("connection","mdi:wifi-off","Offline",!0);const e=this._stateObj("fault");if(!e)return W;if(!this._isAvailable(e))return this._statusChip("fault","mdi:help-circle-outline","Fault unknown",!1);return!Ot.has(e.state.toLowerCase())?this._statusChip("fault","mdi:alert-circle",this._format(e),!0):this._statusChip("fault","mdi:check-circle-outline","No fault",!1)}_statusChip(t,e,i,s){const n=this._entities[t];return F`
      <div
        class=${$t({chip:!0,status:!0,bad:s})}
        role="button"
        tabindex="0"
        title=${St[t]}
        @click=${()=>this._moreInfo(n)}
        @keydown=${t=>this._activate(t,n)}
      >
        <ha-icon .icon=${e}></ha-icon>
        <span>${i}</span>
      </div>
    `}_renderPresets(t,e){const i=this._renderFanPills(t,e),s=[this._renderModePill(e),this._renderPill("light"),this._renderPill("sound")].filter(t=>t!==W);return i!==W||s.length?F`
      <div class="presets">
        ${i===W?W:F`<div class="group levels">${i}</div>`}
        ${s.length?F`<div class="group toggles">${s}</div>`:W}
      </div>
    `:W}_renderFanPills(t,e){if(!t||t.step<=0)return W;const i=[];for(let e=t.min;e<=t.max+1e-9;e+=t.step)i.push(Number(e.toFixed(4)));if(i.length>10)return W;const s=t.available&&e;return F`
      <ha-icon class="preset-icon" .icon=${"mdi:fan"} title=${St.fan_level}></ha-icon>
      ${i.map(e=>F`
          <button
            class=${$t({preset:!0,active:t.available&&t.value===e})}
            type="button"
            title=${`${St.fan_level} ${e}`}
            aria-label=${`${St.fan_level} ${e}`}
            aria-pressed=${String(t.value===e)}
            ?disabled=${!s}
            @click=${()=>this._setNumber("fan_level",e)}
          >
            ${e}
          </button>
        `)}
    `}_renderModePill(t){const e=this._stateObj("mode");if(!e)return W;const i=this._isAvailable(e),s=e.attributes.options??[],n=this._pending.mode??e.state,r=i?`${St.mode}: ${this._format(e,n)}`:St.mode,o=this._modeOnOption(s);if(o){const e=n===o,a=s.find(t=>t!==o);return F`<button
        class=${$t({preset:!0,toggle:!0,active:e&&i})}
        type="button"
        title=${r}
        aria-label=${r}
        aria-pressed=${String(e)}
        ?disabled=${!t||!i}
        @click=${()=>this._setMode(e?a:o)}
      >
        <ha-icon .icon=${"mdi:auto-mode"}></ha-icon>
      </button>`}const a=s[(s.indexOf(n)+1)%Math.max(s.length,1)];return F`<button
      class="preset"
      type="button"
      title=${r}
      aria-label=${r}
      ?disabled=${!t||!i||s.length<2}
      @click=${()=>this._setMode(a)}
    >
      ${i?this._format(e,n):St.mode}
    </button>`}_renderPill(t){const e=this._stateObj(t);if(!e)return W;const i=this._isAvailable(e),s="on"===(this._pending[t]??e.state),n=kt[t];return F`<button
      class=${$t({preset:!0,toggle:!0,active:s&&i})}
      type="button"
      title=${St[t]}
      aria-label=${St[t]}
      aria-pressed=${String(s)}
      ?disabled=${!i}
      @click=${()=>this._setSwitch(t,!s)}
    >
      <ha-icon .icon=${s?n.on:n.off}></ha-icon>
    </button>`}_activate(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._moreInfo(e))}_setSwitch(t,e){const i=this._entities[t],s=this._stateObj(t);i&&s&&this.hass&&(this._setPending(t,e?"on":"off"),this.hass.callService("switch",e?"turn_on":"turn_off",{entity_id:i}))}_setMode(t){const e=this._entities.mode;t&&e&&this.hass&&(this._setPending("mode",t),this.hass.callService("select","select_option",{entity_id:e,option:t}))}_numberInput(t,e){const i=Number(e.target.value);Number.isFinite(i)&&this._setPending(t,i)}_numberChange(t,e){this._setNumber(t,Number(e.target.value))}_setNumber(t,e){const i=this._entities[t];i&&this.hass&&Number.isFinite(e)&&(this._setPending(t,e),this.hass.callService("number","set_value",{entity_id:i,value:e}))}_moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_stateObj(t){const e=this._entities[t];return e&&this.hass?this.hass.states[e]:void 0}_isAvailable(t){return!!t&&!Mt.has(t.state)}_numberInfo(t){const e=this._stateObj(t);if(!e)return;const i=Number(e.attributes.min??0),s=Number(e.attributes.max??100),n=Number(this._pending[t]??e.state);return{entity:e,available:this._isAvailable(e),min:i,max:s,step:Number(e.attributes.step??1),unit:e.attributes.unit_of_measurement??"",value:Number.isFinite(n)?n:i}}_modeOnOption(t){return this._config.mode_on??(2===t.length?t[1]:void 0)}_modeIsOn(){const t=this._stateObj("mode");if(!t||!this._isAvailable(t))return!1;const e=t.attributes.options??[],i=this._modeOnOption(e);return!!i&&(this._pending.mode??t.state)===i}_format(t,e){const i=e??t.state,s=this.hass?.formatEntityState;if(s)try{return s(t,i)}catch{}const n=void 0===e?t.attributes.unit_of_measurement??"":"";return n?`${i}${n}`:function(t){const e=t.replace(/_/g," ").trim();return e.charAt(0).toUpperCase()+e.slice(1)}(i)}_setPending(t,e){this._pending={...this._pending,[t]:e};const i=this._pendingTimers.get(t);i&&clearTimeout(i),this._pendingTimers.set(t,setTimeout(()=>this._clearPending(t),3e3))}_clearPending(t){const e=this._pendingTimers.get(t);if(e&&clearTimeout(e),this._pendingTimers.delete(t),t in this._pending){const e={...this._pending};delete e[t],this._pending=e}}_clearAllPending(){for(const t of this._pendingTimers.values())clearTimeout(t);this._pendingTimers.clear(),this._pending={}}_dropSettledPending(){for(const t of Object.keys(this._pending)){const e=this._stateObj(t);if(!e)continue;const i=this._pending[t];("number"==typeof i?Number(e.state)===i:e.state===i)&&this._clearPending(t)}}_warnAboutMissingEntities(){if(this._warnedMissing||!this.hass)return;this._warnedMissing=!0;const t=Object.entries(this._entities).filter(([,t])=>!(t in this.hass.states)).map(([t,e])=>`${t} -> ${e}`);t.length&&console.warn(`${xt}: entities not found and skipped:\n  ${t.join("\n  ")}`)}};zt.styles=Ht,t([pt({attribute:!1})],zt.prototype,"hass",void 0),t([ft()],zt.prototype,"_config",void 0),t([ft()],zt.prototype,"_entities",void 0),t([ft()],zt.prototype,"_pending",void 0),zt=t([ht(xt)],zt),window.customCards=window.customCards??[],window.customCards.push({type:xt,name:"Humidifier Card",description:"Compact animated card for an ESPHome humidifier exposed as switch/select/number entities.",preview:!1,documentationURL:"https://github.com/iharosi/humidifier-card"}),console.info(`%c ${xt.toUpperCase()} %c v0.6.1 `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: #1c1c1c; font-weight: 700;");export{zt as HumidifierCard};
