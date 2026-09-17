function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,_=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[g("elementProperties")]=new Map,w[g("finalized")]=new Map,m?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const y=globalThis,x=t=>t,A=y.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,O=`<${P}>`,k=document,M=()=>k.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,j=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,V=k.createTreeWalker(k,129);function K(t,e){if(!j(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,h,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,h=r.exec(i),null!==h);)c=r.lastIndex,r===T?"!--"===h[1]?r=H:void 0!==h[1]?r=R:void 0!==h[2]?(L.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=z):void 0!==h[3]&&(r=z):r===z?">"===h[0]?(r=n??T,l=-1):void 0===h[1]?l=-2:(l=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?z:'"'===h[3]?D:I):r===D||r===I?r=z:r===H||r===R?r=T:(r=z,n=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+O:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,l]=J(t,e);if(this.el=Z.createElement(h,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=V.nextNode(),o++)}return V.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),U(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>j(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,s[i+r],e,r),a===B&&(a=this._$AH[r]),o||=!U(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Y{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===B)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=y.litHtmlPolyfillSupport;nt?.(Z,X),(y.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let rt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},ct=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return dt({...t,state:!0,attribute:!1})}const ut=1;class ft{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const _t=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ft{constructor(t){if(super(t),t.type!==ut||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return B}}),mt="humidifier-card",gt="humidifier-card-editor",$t=["power","mode","fan_level","light","sound","alarm","connection","fault"],vt={power:{domain:"switch",suffix:"_humidifier"},mode:{domain:"select",suffix:"_mode"},fan_level:{domain:"number",suffix:"_fan_level"},light:{domain:"switch",suffix:"_indicator_light"},sound:{domain:"switch",suffix:"_sound_buzzer"},alarm:{domain:"binary_sensor",suffix:"_alarm"},connection:{domain:"binary_sensor",suffix:"_connection_status"},fault:{domain:"sensor",suffix:"_device_fault"}},bt={power:"Humidifier",mode:"Mode",fan_level:"Fan level",light:"Indicator light",sound:"Sound (buzzer)",alarm:"Alarm",connection:"Connection",fault:"Device fault"},wt={light:{on:"mdi:lightbulb",off:"mdi:lightbulb-off-outline"},sound:{on:"mdi:volume-high",off:"mdi:volume-off"}},yt=new Set(["none","no_faults","no fault","ok","normal","0",""]),xt=new Set(["unavailable","unknown"]),At=[{name:"prefix",required:!0,selector:{text:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"compact",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"dim_when_off",selector:{boolean:{}}},{name:"hide",selector:{select:{multiple:!0,mode:"list",options:$t.map(t=>({value:t,label:bt[t]}))}}}],St={prefix:"Entity prefix (e.g. smart_humidifier)",name:"Name (optional)",icon:"Icon (optional)",compact:"Compact layout (two lines)",show_status:"Show status row",dim_when_off:"Grey out mode and fan level while the humidifier is off",hide:"Hide these controls"};let Et=class extends rt{constructor(){super(...arguments),this._valueChanged=t=>{t.stopPropagation();const e={...t.detail.value};e.name||delete e.name,e.icon||delete e.icon,e.hide?.length||delete e.hide,e.hide&&(e.hide=e.hide.filter(t=>$t.includes(t))),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}setConfig(t){this._config=t}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${At}
        .computeLabel=${t=>St[t.name]??t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:W}};t([dt({attribute:!1})],Et.prototype,"hass",void 0),t([pt()],Et.prototype,"_config",void 0),Et=t([ht(gt)],Et);const Ct=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
  :host {
    --hc-gap: 12px;
    --hc-active: var(--state-switch-active-color, var(--primary-color, #03a9f4));
    --hc-bad: var(--error-color, #db4437);
    --hc-good: var(--success-color, var(--label-badge-green, #43a047));
  }

  ha-card {
    display: flex;
    flex-direction: column;
    padding: var(--hc-gap) 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--hc-gap);
    padding: 4px 16px 12px;
  }

  .header ha-icon {
    --mdc-icon-size: 28px;
    color: var(--state-icon-color, var(--secondary-text-color));
    flex: 0 0 auto;
    transition: color 180ms ease-in-out;
  }

  .header ha-icon.on {
    color: var(--hc-active);
  }

  .title {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1 1 auto;
    cursor: pointer;
  }

  .title:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 2px;
    border-radius: 4px;
  }

  .name {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .summary {
    font-size: 13px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rows {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--hc-gap);
    min-height: 44px;
    padding: 2px 16px;
  }

  .row + .row {
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.15));
  }

  .row.disabled {
    opacity: 0.45;
    pointer-events: none;
  }

  .label {
    flex: 1 1 auto;
    font-size: 14px;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .unavailable {
    font-size: 13px;
    color: var(--secondary-text-color);
    font-style: italic;
  }

  ha-select {
    --mdc-menu-min-width: 140px;
    --mdc-typography-subtitle1-font-size: 14px;
    width: 150px;
    flex: 0 0 auto;
  }

  .slider-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 0 0 auto;
  }

  .value {
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
    min-width: 2.5ch;
    text-align: right;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 120px;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(127, 127, 127, 0.4));
    outline: none;
    margin: 0;
    cursor: pointer;
  }

  input[type='range']:disabled {
    cursor: default;
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

  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 14px;
    padding: 12px 16px 2px;
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  .chip ha-icon {
    --mdc-icon-size: 16px;
  }

  .chip.bad {
    color: var(--hc-bad);
    font-weight: 500;
  }

  .chip.good ha-icon {
    color: var(--hc-good);
  }

  /* ---------------------------------------------------------------- compact */

  ha-card.compact {
    padding: 8px 0;
  }

  ha-card.compact .header {
    padding: 4px 12px 8px;
    gap: 10px;
  }

  ha-card.compact .header ha-icon {
    --mdc-icon-size: 24px;
  }

  ha-card.compact .name {
    font-size: 15px;
  }

  .strip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    flex-wrap: wrap;
  }

  .strip ha-select {
    width: 124px;
    --mdc-menu-min-width: 124px;
  }

  .strip input[type='range'] {
    width: 84px;
  }

  .strip .slider-wrap {
    gap: 8px;
    flex: 1 1 auto;
    min-width: 120px;
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

  .status-compact {
    padding: 0;
    border-top: none;
    gap: 2px;
    flex: 0 0 auto;
    flex-wrap: nowrap;
  }

  .status-compact .chip ha-icon {
    --mdc-icon-size: 18px;
  }

  .warning {
    padding: 8px 16px;
    color: var(--hc-bad);
    font-size: 13px;
  }
`;let Pt=class extends rt{constructor(){super(...arguments),this._entities={},this._pending={},this._pendingTimers=new Map,this._warnedMissing=!1,this._titleKeydown=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._moreInfo(this._entities.power))},this._modeSelected=t=>{const e=this._entities.mode,i=this._stateObj("mode");if(!e||!i||!this.hass)return;const s=t.target.value;s&&s!==i.state&&(this._setPending("mode",s),this.hass.callService("select","select_option",{entity_id:e,option:s}))},this._fanInput=t=>{const e=Number(t.target.value);Number.isFinite(e)&&this._setPending("fan_level",e)},this._fanChange=t=>{const e=this._entities.fan_level;if(!e||!this.hass)return;const i=Number(t.target.value);Number.isFinite(i)&&(this._setPending("fan_level",i),this.hass.callService("number","set_value",{entity_id:e,value:i}))}}static getConfigElement(){return document.createElement(gt)}static getStubConfig(){return{prefix:"smart_humidifier"}}setConfig(t){!function(t){if(!t||"object"!=typeof t)throw new Error("humidifier-card: no configuration provided");if(t.hide&&!Array.isArray(t.hide))throw new Error("humidifier-card: `hide` must be a list of slot names");const e=(t.hide??[]).filter(t=>!$t.includes(t));if(e.length)throw new Error(`humidifier-card: unknown slot(s) in \`hide\`: ${e.join(", ")}. Valid slots: ${$t.join(", ")}`);const i=Object.keys(t.entities??{}).filter(t=>!$t.includes(t));if(i.length)throw new Error(`humidifier-card: unknown slot(s) in \`entities\`: ${i.join(", ")}. Valid slots: ${$t.join(", ")}`);if(!t.prefix&&!t.entities?.power)throw new Error("humidifier-card: set `prefix` (e.g. smart_humidifier) or at least `entities.power`")}(t),this._config={show_status:!0,dim_when_off:!1,compact:!1,...t},this._entities=function(t){const e=new Set(t.hide??[]),i={};for(const s of $t){if(e.has(s))continue;const n=t.entities?.[s];if(n)i[s]=n;else if(t.prefix){const{domain:e,suffix:n}=vt[s];i[s]=`${e}.${t.prefix}${n}`}}return i}(this._config),this._warnedMissing=!1,this._clearAllPending()}getCardSize(){if(this._config?.compact)return 2;const t=["mode","fan_level","light","sound"].filter(t=>this._entities[t]).length;return 1+Math.ceil(t/2)+(this._config?.show_status?1:0)}disconnectedCallback(){super.disconnectedCallback(),this._clearAllPending()}shouldUpdate(t){if(!this._config)return!1;if(t.size>1||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||Object.values(this._entities).some(t=>e.states[t]!==this.hass.states[t])}updated(t){super.updated(t),this._dropSettledPending(),this._warnAboutMissingEntities()}render(){if(!this._config||!this.hass)return W;const t=this._stateObj("power");if(!t)return F`<ha-card>
        <div class="warning">
          Entity <code>${this._entities.power??"(unset)"}</code> not found. Check the
          <code>prefix</code> in the card configuration.
        </div>
      </ha-card>`;const e="on"===t.state,i=this._isAvailable(t),s=!this._config.dim_when_off||e&&i;return this._config.compact?this._renderCompact(t,e,i,s):this._renderFull(t,e,i,s)}_renderHeaderIcon(t,e){return F`<ha-icon
      class=${_t({on:t&&e})}
      .icon=${this._config.icon??(t?"mdi:air-humidifier":"mdi:air-humidifier-off")}
    ></ha-icon>`}_renderPowerSwitch(t,e){return F`<ha-switch
      .checked=${t}
      .disabled=${!e}
      aria-label=${bt.power}
      @change=${t=>this._toggleSwitch("power",t)}
    ></ha-switch>`}_renderFull(t,e,i,s){return F`
      <ha-card>
        <div class="header">
          ${this._renderHeaderIcon(e,i)}
          <div
            class="title"
            tabindex="0"
            role="button"
            @click=${()=>this._moreInfo(this._entities.power)}
            @keydown=${this._titleKeydown}
          >
            <span class="name">${this._title(t)}</span>
            <span class="summary">${this._summary(t)}</span>
          </div>
          ${this._renderPowerSwitch(e,i)}
        </div>

        <div class="rows">
          ${this._renderModeRow(s)} ${this._renderFanRow(s)}
          ${this._renderSwitchRow("light")} ${this._renderSwitchRow("sound")}
        </div>

        ${this._config.show_status?this._renderStatus():W}
      </ha-card>
    `}_renderCompact(t,e,i,s){const n=[this._renderCompactMode(s),this._renderCompactFan(s),this._renderIconToggle("light"),this._renderIconToggle("sound")].filter(t=>t!==W);return F`
      <ha-card class="compact">
        <div class="header">
          ${this._renderHeaderIcon(e,i)}
          <div
            class="title"
            tabindex="0"
            role="button"
            @click=${()=>this._moreInfo(this._entities.power)}
            @keydown=${this._titleKeydown}
          >
            <span class="name">${this._title(t)}</span>
          </div>
          ${this._config.show_status?this._renderStatus(!0):W}
          ${this._renderPowerSwitch(e,i)}
        </div>
        ${n.length?F`<div class="strip">${n}</div>`:W}
      </ha-card>
    `}_renderCompactMode(t){const e=this._stateObj("mode");if(!e)return W;const i=this._isAvailable(e),s=e.attributes.options??[],n=this._pending.mode??e.state;return F`<ha-select
      naturalMenuWidth
      fixedMenuPosition
      aria-label=${bt.mode}
      .value=${s.includes(n)?n:""}
      .disabled=${!t||!i}
      @selected=${this._modeSelected}
      @click=${t=>t.stopPropagation()}
      @closed=${t=>t.stopPropagation()}
    >
      ${s.map(t=>F`<ha-list-item .value=${t}>${this._format(e,t)}</ha-list-item>`)}
    </ha-select>`}_renderCompactFan(t){const e=this._stateObj("fan_level");if(!e)return W;const i=this._isAvailable(e),s=Number(e.attributes.min??1),n=Number(e.attributes.max??3),o=Number(e.attributes.step??1),r=Number(this._pending.fan_level??e.state),a=Number.isFinite(r)?r:s;return F`<div class="slider-wrap">
      <input
        type="range"
        min=${s}
        max=${n}
        step=${o}
        .value=${String(a)}
        ?disabled=${!t||!i}
        aria-label=${bt.fan_level}
        @input=${this._fanInput}
        @change=${this._fanChange}
      />
      <span class="value">${i?a:"–"}</span>
    </div>`}_renderIconToggle(t){const e=this._stateObj(t);if(!e)return W;const i=this._isAvailable(e),s="on"===(this._pending[t]??e.state),n=wt[t];return F`<button
      class=${_t({"icon-toggle":!0,on:s&&i})}
      type="button"
      ?disabled=${!i}
      title=${bt[t]}
      aria-label=${bt[t]}
      aria-pressed=${String(s)}
      @click=${()=>this._setSwitch(t,!s)}
    >
      <ha-icon .icon=${s?n.on:n.off}></ha-icon>
    </button>`}_renderModeRow(t){const e=this._stateObj("mode");if(!e)return W;const i=this._isAvailable(e),s=e.attributes.options??[],n=this._pending.mode??e.state;return F`
      <div class=${_t({row:!0,disabled:!t&&i})}>
        <span class="label">${bt.mode}</span>
        ${i?F`<ha-select
                naturalMenuWidth
                fixedMenuPosition
                .value=${s.includes(n)?n:""}
                .disabled=${!t}
                @selected=${this._modeSelected}
                @click=${t=>t.stopPropagation()}
                @closed=${t=>t.stopPropagation()}
              >
                ${s.map(t=>F`<ha-list-item .value=${t}
                      >${this._format(e,t)}</ha-list-item
                    >`)}
              </ha-select>`:F`<span class="unavailable">Unavailable</span>`}
      </div>
    `}_renderFanRow(t){const e=this._stateObj("fan_level");if(!e)return W;if(!this._isAvailable(e))return F`<div class="row">
        <span class="label">${bt.fan_level}</span>
        <span class="unavailable">Unavailable</span>
      </div>`;const i=Number(e.attributes.min??1),s=Number(e.attributes.max??3),n=Number(e.attributes.step??1),o=Number(this._pending.fan_level??e.state),r=Number.isFinite(o)?o:i;return F`
      <div class=${_t({row:!0,disabled:!t})}>
        <span class="label">${bt.fan_level}</span>
        <div class="slider-wrap">
          <input
            type="range"
            min=${i}
            max=${s}
            step=${n}
            .value=${String(r)}
            ?disabled=${!t}
            aria-label=${bt.fan_level}
            @input=${this._fanInput}
            @change=${this._fanChange}
          />
          <span class="value">${r}</span>
        </div>
      </div>
    `}_renderSwitchRow(t){const e=this._stateObj(t);if(!e)return W;const i=this._isAvailable(e),s="on"===(this._pending[t]??e.state);return F`
      <div class="row">
        <span class="label">${bt[t]}</span>
        ${i?F`<ha-switch
                .checked=${s}
                aria-label=${bt[t]}
                @change=${e=>this._toggleSwitch(t,e)}
              ></ha-switch>`:F`<span class="unavailable">Unavailable</span>`}
      </div>
    `}_renderStatus(t=!1){const e=[],i=this._stateObj("connection");if(i){const s="on"===i.state;e.push(this._chip(this._entities.connection,s?"mdi:wifi":"mdi:wifi-off",this._isAvailable(i)?s?"Online":"Offline":"Unavailable",this._isAvailable(i)&&!s,s,t))}const s=this._stateObj("fault");if(s){const i=this._isAvailable(s)&&!yt.has(s.state.toLowerCase());e.push(this._chip(this._entities.fault,i?"mdi:alert-circle":"mdi:check-circle-outline",this._isAvailable(s)?i?this._format(s):"No fault":"Fault unknown",i,!i&&this._isAvailable(s),t))}const n=this._stateObj("alarm");if(n){const i="on"===n.state;e.push(this._chip(this._entities.alarm,i?"mdi:bell-ring":"mdi:bell-outline",this._isAvailable(n)?i?"Alarm":"No alarm":"Alarm unknown",i,!i&&this._isAvailable(n),t))}return e.length?F`<div class=${_t({status:!0,"status-compact":t})}>${e}</div>`:W}_chip(t,e,i,s,n,o=!1){return F`<span
      class=${_t({chip:!0,bad:s,good:n})}
      role="button"
      tabindex="0"
      title=${i}
      aria-label=${i}
      @click=${()=>this._moreInfo(t)}
      @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._moreInfo(t))}}
    >
      <ha-icon .icon=${e}></ha-icon>${o?W:i}
    </span>`}_toggleSwitch(t,e){this._setSwitch(t,!0===e.target.checked)}_setSwitch(t,e){const i=this._entities[t],s=this._stateObj(t);i&&s&&this.hass&&(this._setPending(t,e?"on":"off"),this.hass.callService("switch",e?"turn_on":"turn_off",{entity_id:i}))}_moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_stateObj(t){const e=this._entities[t];return e&&this.hass?this.hass.states[e]:void 0}_isAvailable(t){return!!t&&!xt.has(t.state)}_format(t,e){const i=e??t.state,s=this.hass?.formatEntityState;if(s)try{return s(t,i)}catch{}return function(t){const e=t.replace(/_/g," ").trim();return e.charAt(0).toUpperCase()+e.slice(1)}(i)}_title(t){return this._config?.name??t.attributes.friendly_name??"Humidifier"}_summary(t){if(!this._isAvailable(t))return"Unavailable";const e=["on"===t.state?"On":"Off"];if("on"===t.state){const t=this._stateObj("mode");this._isAvailable(t)&&e.push(this._format(t));const i=this._stateObj("fan_level");this._isAvailable(i)&&e.push(`Fan ${Number(i.state)}`)}return e.join(" · ")}_setPending(t,e){this._pending={...this._pending,[t]:e};const i=this._pendingTimers.get(t);i&&clearTimeout(i),this._pendingTimers.set(t,setTimeout(()=>this._clearPending(t),3e3))}_clearPending(t){const e=this._pendingTimers.get(t);if(e&&clearTimeout(e),this._pendingTimers.delete(t),t in this._pending){const e={...this._pending};delete e[t],this._pending=e}}_clearAllPending(){for(const t of this._pendingTimers.values())clearTimeout(t);this._pendingTimers.clear(),this._pending={}}_dropSettledPending(){for(const t of Object.keys(this._pending)){const e=this._stateObj(t);if(!e)continue;const i=this._pending[t];("number"==typeof i?Number(e.state)===i:e.state===i)&&this._clearPending(t)}}_warnAboutMissingEntities(){if(this._warnedMissing||!this.hass)return;this._warnedMissing=!0;const t=Object.entries(this._entities).filter(([,t])=>!(t in this.hass.states)).map(([t,e])=>`${t} -> ${e}`);t.length&&console.warn(`${mt}: entities not found and skipped:\n  ${t.join("\n  ")}`)}};Pt.styles=Ct,t([dt({attribute:!1})],Pt.prototype,"hass",void 0),t([pt()],Pt.prototype,"_config",void 0),t([pt()],Pt.prototype,"_entities",void 0),t([pt()],Pt.prototype,"_pending",void 0),Pt=t([ht(mt)],Pt),window.customCards=window.customCards??[],window.customCards.push({type:mt,name:"Humidifier Card",description:"Display and control an ESPHome humidifier exposed as switch/select/number entities.",preview:!1,documentationURL:"https://github.com/iharosi/humidifier-card"}),console.info(`%c ${mt.toUpperCase()} %c v0.2.0 `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{Pt as HumidifierCard};
