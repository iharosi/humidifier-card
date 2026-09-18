function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,_=f?f.emptyScript:"",m=p.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[g("elementProperties")]=new Map,y[g("finalized")]=new Map,m?.({ReactiveElement:y}),(p.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+C,P=`<${O}>`,M=document,k=()=>M.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,j="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,z=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,W=M.createTreeWalker(M,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,h=r.exec(i),null!==h);)l=r.lastIndex,r===N?"!--"===h[1]?r=H:void 0!==h[1]?r=R:void 0!==h[2]?(L.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=z):void 0!==h[3]&&(r=z):r===z?">"===h[0]?(r=n??N,c=-1):void 0===h[1]?c=-2:(c=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?z:'"'===h[3]?D:I):r===D||r===I?r=z:r===H||r===R?r=N:(r=z,n=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+P:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,c]=K(t,e);if(this.el=Z.createElement(h,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),W.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===O)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);W.currentNode=s;let n=W.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=W.nextNode(),o++)}return W.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),T(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),o||=!T(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends Y{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??q)===F)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(Z,X),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let rt=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},lt=(t=ct,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return dt({...t,state:!0,attribute:!1})}const pt=1;class ft{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const _t=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ft{constructor(t){if(super(t),t.type!==pt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return F}}),mt="humidifier-card",gt="humidifier-card-editor",$t=["power","mode","fan_level","target_humidity","humidity","light","sound","connection","fault"],bt={power:{domain:"switch",suffix:"_humidifier"},mode:{domain:"select",suffix:"_mode"},fan_level:{domain:"number",suffix:"_fan_level"},target_humidity:{domain:"number",suffix:"_target_humidity"},humidity:{domain:"sensor",suffix:"_humidity"},light:{domain:"switch",suffix:"_indicator_light"},sound:{domain:"switch",suffix:"_sound_buzzer"},connection:{domain:"binary_sensor",suffix:"_connection_status"},fault:{domain:"sensor",suffix:"_device_fault"}},vt={power:"Humidifier",mode:"Mode",fan_level:"Fan level",target_humidity:"Target humidity",humidity:"Humidity",light:"Indicator light",sound:"Sound (buzzer)",connection:"Connection",fault:"Device fault"},yt={power:{on:"mdi:power",off:"mdi:power"},light:{on:"mdi:lightbulb",off:"mdi:lightbulb-off-outline"},sound:{on:"mdi:volume-high",off:"mdi:volume-off"}},wt=new Set(["none","no_faults","no fault","ok","normal","0",""]),xt=new Set(["unavailable","unknown"]),At=[{name:"prefix",required:!0,selector:{text:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"mode_on",selector:{text:{}}},{name:"show_status",selector:{boolean:{}}},{name:"dim_when_off",selector:{boolean:{}}},{name:"hide",selector:{select:{multiple:!0,mode:"list",options:$t.map(t=>({value:t,label:vt[t]}))}}}],Et={prefix:"Entity prefix (e.g. smart_humidifier)",name:"Name (optional)",icon:"Icon (optional)",mode_on:'Mode option that counts as "on" (optional)',show_status:"Show status row",dim_when_off:"Grey out mode and fan level while the humidifier is off",hide:"Hide these controls"};let St=class extends rt{constructor(){super(...arguments),this._valueChanged=t=>{t.stopPropagation();const e={...t.detail.value};e.name||delete e.name,e.icon||delete e.icon,e.mode_on||delete e.mode_on,e.hide?.length||delete e.hide,e.hide&&(e.hide=e.hide.filter(t=>$t.includes(t))),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}setConfig(t){this._config=t}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${At}
        .computeLabel=${t=>Et[t.name]??t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:q}};t([dt({attribute:!1})],St.prototype,"hass",void 0),t([ut()],St.prototype,"_config",void 0),St=t([ht(gt)],St);const Ct=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
  :host {
    --hc-active: var(--state-switch-active-color, var(--primary-color, #03a9f4));
    --hc-bad: var(--error-color, #db4437);
  }

  ha-card {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px 12px 8px;
  }

  .header > ha-icon {
    --mdc-icon-size: 26px;
    color: var(--state-icon-color, var(--secondary-text-color));
    flex: 0 0 auto;
    transition: color 180ms ease-in-out;
  }

  .header > ha-icon.on {
    color: var(--hc-active);
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    flex: 1 1 auto;
  }

  .name,
  .sub,
  .conn {
    cursor: pointer;
    border-radius: 4px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .name:focus-visible,
  .sub:focus-visible,
  .conn:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 2px;
  }

  .name {
    font-size: 15px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .sub {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  .sub.bad {
    color: var(--hc-bad);
    font-weight: 500;
  }

  .sub ha-icon {
    --mdc-icon-size: 15px;
  }

  .readout {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    font-size: 17px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
    cursor: pointer;
    border-radius: 4px;
  }

  .readout:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 2px;
  }

  .conn {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    color: var(--secondary-text-color);
  }

  .conn ha-icon {
    --mdc-icon-size: 20px;
  }

  .conn.bad {
    color: var(--hc-bad);
  }

  /* ------------------------------------------------------------ control strip */

  .strip {
    display: flex;
    align-items: center;
    gap: 8px 10px;
    padding: 0 12px;
    flex-wrap: wrap;
  }

  ha-select {
    width: 112px;
    flex: 0 0 auto;
    --mdc-menu-min-width: 112px;
    --mdc-typography-subtitle1-font-size: 14px;
  }

  .slider-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1 1 90px;
    min-width: 90px;
  }

  .value {
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
    min-width: 3ch;
    text-align: right;
  }

  /* ------------------------------------------------------------ target row */

  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px 0;
  }

  .row-label {
    font-size: 13px;
    color: var(--secondary-text-color);
    flex: 0 0 auto;
    white-space: nowrap;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    min-width: 60px;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(127, 127, 127, 0.4));
    outline: none;
    margin: 0;
    cursor: pointer;
  }

  input[type='range']:disabled {
    cursor: default;
    opacity: 0.45;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--hc-active);
    border: none;
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--hc-active);
    border: none;
    cursor: pointer;
  }

  input[type='range']:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 4px;
  }

  .icon-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--divider-color, rgba(127, 127, 127, 0.18));
    color: var(--secondary-text-color);
    cursor: pointer;
    flex: 0 0 auto;
    transition:
      background 160ms ease-in-out,
      color 160ms ease-in-out;
  }

  .icon-toggle ha-icon {
    --mdc-icon-size: 20px;
  }

  .icon-toggle.power {
    width: 40px;
    height: 40px;
  }

  .icon-toggle.power ha-icon {
    --mdc-icon-size: 24px;
  }

  .icon-toggle.on {
    background: var(--hc-active);
    color: var(--text-primary-color, #fff);
  }

  .icon-toggle:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .icon-toggle:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 2px;
  }

  .warning {
    padding: 8px 16px;
    color: var(--hc-bad);
    font-size: 13px;
  }
`;let Ot=class extends rt{constructor(){super(...arguments),this._entities={},this._pending={},this._pendingTimers=new Map,this._warnedMissing=!1,this._modeSelected=t=>{const e=this._stateObj("mode"),i=t.target.value;e&&i&&i!==e.state&&this._setMode(i)}}static getConfigElement(){return document.createElement(gt)}static getStubConfig(){return{prefix:"smart_humidifier"}}setConfig(t){!function(t){if(!t||"object"!=typeof t)throw new Error("humidifier-card: no configuration provided");if(t.hide&&!Array.isArray(t.hide))throw new Error("humidifier-card: `hide` must be a list of slot names");const e=(t.hide??[]).filter(t=>!$t.includes(t));if(e.length)throw new Error(`humidifier-card: unknown slot(s) in \`hide\`: ${e.join(", ")}. Valid slots: ${$t.join(", ")}`);const i=Object.keys(t.entities??{}).filter(t=>!$t.includes(t));if(i.length)throw new Error(`humidifier-card: unknown slot(s) in \`entities\`: ${i.join(", ")}. Valid slots: ${$t.join(", ")}`);if(!t.prefix&&!t.entities?.power)throw new Error("humidifier-card: set `prefix` (e.g. smart_humidifier) or at least `entities.power`")}(t),this._config={show_status:!0,dim_when_off:!1,...t},this._entities=function(t){const e=new Set(t.hide??[]),i={};for(const s of $t){if(e.has(s))continue;const n=t.entities?.[s];if(n)i[s]=n;else if(t.prefix){const{domain:e,suffix:n}=bt[s];i[s]=`${e}.${t.prefix}${n}`}}return i}(this._config),this._warnedMissing=!1,this._clearAllPending()}getCardSize(){return this._stateObj("target_humidity")?3:2}disconnectedCallback(){super.disconnectedCallback(),this._clearAllPending()}shouldUpdate(t){if(!this._config)return!1;if(t.size>1||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||Object.values(this._entities).some(t=>e.states[t]!==this.hass.states[t])}updated(t){super.updated(t),this._dropSettledPending(),this._warnAboutMissingEntities()}render(){if(!this._config||!this.hass)return q;const t=this._stateObj("power");if(!t)return B`<ha-card>
        <div class="warning">
          Entity <code>${this._entities.power??"(unset)"}</code> not found. Check the
          <code>prefix</code> in the card configuration.
        </div>
      </ha-card>`;const e="on"===t.state,i=this._isAvailable(t),s=!this._config.dim_when_off||e&&i,n=[this._renderToggle("power"),this._renderMode(s),this._renderNumber("fan_level",s),this._renderToggle("light"),this._renderToggle("sound")].filter(t=>t!==q);return B`
      <ha-card>
        <div class="header">
          <ha-icon
            class=${_t({on:e&&i})}
            .icon=${this._config.icon??(e?"mdi:air-humidifier":"mdi:air-humidifier-off")}
          ></ha-icon>
          <div class="title">
            <span
              class="name"
              role="button"
              tabindex="0"
              @click=${()=>this._moreInfo(this._entities.power)}
              @keydown=${t=>this._activate(t,this._entities.power)}
              >${this._title(t)}</span
            >
            ${this._renderSubline(t)}
          </div>
          ${this._renderHumidity()} ${this._renderConnection()}
        </div>
        ${n.length?B`<div class="strip">${n}</div>`:q}
        ${this._renderTargetRow(s)}
      </ha-card>
    `}_renderSubline(t){if(!this._isAvailable(t))return B`<span class="sub bad">Unavailable</span>`;const e=this._stateObj("fault");if(!this._config.show_status||!e)return B`<span class="sub">${this._summary(t)}</span>`;if(!this._isAvailable(e))return this._sublineFor(e,"Fault unknown",!1);const i=!wt.has(e.state.toLowerCase());return this._sublineFor(e,i?this._format(e):"No fault",i)}_sublineFor(t,e,i){return B`<span
      class=${_t({sub:!0,bad:i})}
      role="button"
      tabindex="0"
      title=${vt.fault}
      @click=${()=>this._moreInfo(t.entity_id)}
      @keydown=${e=>this._activate(e,t.entity_id)}
      >${i?B`<ha-icon .icon=${"mdi:alert-circle"}></ha-icon>`:q}${e}</span
    >`}_renderConnection(){const t=this._stateObj("connection");if(!this._config.show_status||!t)return q;const e=this._isAvailable(t),i="on"===t.state,s=e?i?"Online":"Offline":"Connection unknown";return B`<span
      class=${_t({conn:!0,bad:e&&!i})}
      role="button"
      tabindex="0"
      title=${s}
      aria-label=${s}
      @click=${()=>this._moreInfo(this._entities.connection)}
      @keydown=${t=>this._activate(t,this._entities.connection)}
    >
      <ha-icon .icon=${i?"mdi:wifi":"mdi:wifi-off"}></ha-icon>
    </span>`}_renderHumidity(){const t=this._stateObj("humidity");if(!t)return q;const e=this._isAvailable(t);return B`<span
      class="readout"
      role="button"
      tabindex="0"
      title=${vt.humidity}
      aria-label=${vt.humidity}
      @click=${()=>this._moreInfo(this._entities.humidity)}
      @keydown=${t=>this._activate(t,this._entities.humidity)}
      >${e?this._format(t):"–"}</span
    >`}_renderTargetRow(t){if(!this._stateObj("target_humidity"))return q;const e=this._renderNumber("target_humidity",t&&!this._modeIsOn());return e===q?q:B`<div class="row">
      <span class="row-label">${vt.target_humidity}</span>
      ${e}
    </div>`}_modeIsOn(){const t=this._stateObj("mode");if(!t||!this._isAvailable(t))return!1;const e=t.attributes.options??[],i=this._modeOnOption(e);return!!i&&(this._pending.mode??t.state)===i}_renderToggle(t){const e=this._stateObj(t);if(!e)return q;const i=this._isAvailable(e),s="on"===(this._pending[t]??e.state),n=yt[t];return B`<button
      class=${_t({"icon-toggle":!0,power:"power"===t,on:s&&i})}
      type="button"
      ?disabled=${!i}
      title=${vt[t]}
      aria-label=${vt[t]}
      aria-pressed=${String(s)}
      @click=${()=>this._setSwitch(t,!s)}
    >
      <ha-icon .icon=${s?n.on:n.off}></ha-icon>
    </button>`}_renderMode(t){const e=this._stateObj("mode");if(!e)return q;const i=e.attributes.options??[],s=this._modeOnOption(i);return s?this._renderModeToggle(e,i,s,t):this._renderModeSelect(e,i,t)}_modeOnOption(t){return this._config.mode_on??(2===t.length?t[1]:void 0)}_renderModeToggle(t,e,i,s){const n=this._isAvailable(t),o=this._pending.mode??t.state,r=o===i,a=e.find(t=>t!==i),h=n?`${vt.mode}: ${this._format(t,o)}`:vt.mode;return B`<button
      class=${_t({"icon-toggle":!0,on:r&&n})}
      type="button"
      ?disabled=${!s||!n}
      title=${h}
      aria-label=${h}
      aria-pressed=${String(r)}
      @click=${()=>this._setMode(r?a:i)}
    >
      <ha-icon .icon=${"mdi:auto-mode"}></ha-icon>
    </button>`}_renderModeSelect(t,e,i){const s=this._isAvailable(t),n=this._pending.mode??t.state;return B`<ha-select
      naturalMenuWidth
      fixedMenuPosition
      aria-label=${vt.mode}
      .value=${e.includes(n)?n:""}
      .disabled=${!i||!s}
      @selected=${this._modeSelected}
      @click=${t=>t.stopPropagation()}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.map(e=>B`<ha-list-item .value=${e}>${this._format(t,e)}</ha-list-item>`)}
    </ha-select>`}_renderNumber(t,e){const i=this._stateObj(t);if(!i)return q;const s=this._isAvailable(i),n=Number(i.attributes.min??0),o=Number(i.attributes.max??100),r=Number(i.attributes.step??1),a=i.attributes.unit_of_measurement??"",h=Number(this._pending[t]??i.state),c=Number.isFinite(h)?h:n;return B`<div class="slider-wrap">
      <input
        type="range"
        min=${n}
        max=${o}
        step=${r}
        .value=${String(c)}
        ?disabled=${!e||!s}
        aria-label=${vt[t]}
        @input=${e=>this._numberInput(t,e)}
        @change=${e=>this._numberChange(t,e)}
      />
      <span class="value">${s?`${c}${a}`:"–"}</span>
    </div>`}_activate(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._moreInfo(e))}_setSwitch(t,e){const i=this._entities[t],s=this._stateObj(t);i&&s&&this.hass&&(this._setPending(t,e?"on":"off"),this.hass.callService("switch",e?"turn_on":"turn_off",{entity_id:i}))}_setMode(t){const e=this._entities.mode;t&&e&&this.hass&&(this._setPending("mode",t),this.hass.callService("select","select_option",{entity_id:e,option:t}))}_numberInput(t,e){const i=Number(e.target.value);Number.isFinite(i)&&this._setPending(t,i)}_numberChange(t,e){const i=this._entities[t];if(!i||!this.hass)return;const s=Number(e.target.value);Number.isFinite(s)&&(this._setPending(t,s),this.hass.callService("number","set_value",{entity_id:i,value:s}))}_moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_stateObj(t){const e=this._entities[t];return e&&this.hass?this.hass.states[e]:void 0}_isAvailable(t){return!!t&&!xt.has(t.state)}_format(t,e){const i=e??t.state,s=this.hass?.formatEntityState;if(s)try{return s(t,i)}catch{}const n=void 0===e?t.attributes.unit_of_measurement??"":"";return n?`${i}${n}`:function(t){const e=t.replace(/_/g," ").trim();return e.charAt(0).toUpperCase()+e.slice(1)}(i)}_title(t){return this._config?.name??t.attributes.friendly_name??"Humidifier"}_summary(t){const e=["on"===t.state?"On":"Off"];if("on"===t.state){const t=this._stateObj("mode");this._isAvailable(t)&&e.push(this._format(t));const i=this._stateObj("fan_level");this._isAvailable(i)&&e.push(`Fan ${Number(i.state)}`)}return e.join(" · ")}_setPending(t,e){this._pending={...this._pending,[t]:e};const i=this._pendingTimers.get(t);i&&clearTimeout(i),this._pendingTimers.set(t,setTimeout(()=>this._clearPending(t),3e3))}_clearPending(t){const e=this._pendingTimers.get(t);if(e&&clearTimeout(e),this._pendingTimers.delete(t),t in this._pending){const e={...this._pending};delete e[t],this._pending=e}}_clearAllPending(){for(const t of this._pendingTimers.values())clearTimeout(t);this._pendingTimers.clear(),this._pending={}}_dropSettledPending(){for(const t of Object.keys(this._pending)){const e=this._stateObj(t);if(!e)continue;const i=this._pending[t];("number"==typeof i?Number(e.state)===i:e.state===i)&&this._clearPending(t)}}_warnAboutMissingEntities(){if(this._warnedMissing||!this.hass)return;this._warnedMissing=!0;const t=Object.entries(this._entities).filter(([,t])=>!(t in this.hass.states)).map(([t,e])=>`${t} -> ${e}`);t.length&&console.warn(`${mt}: entities not found and skipped:\n  ${t.join("\n  ")}`)}};Ot.styles=Ct,t([dt({attribute:!1})],Ot.prototype,"hass",void 0),t([ut()],Ot.prototype,"_config",void 0),t([ut()],Ot.prototype,"_entities",void 0),t([ut()],Ot.prototype,"_pending",void 0),Ot=t([ht(mt)],Ot),window.customCards=window.customCards??[],window.customCards.push({type:mt,name:"Humidifier Card",description:"Display and control an ESPHome humidifier exposed as switch/select/number entities.",preview:!1,documentationURL:"https://github.com/iharosi/humidifier-card"}),console.info(`%c ${mt.toUpperCase()} %c v0.5.0 `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{Ot as HumidifierCard};
