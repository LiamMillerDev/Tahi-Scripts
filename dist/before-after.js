class BeforeAfter{constructor(t){this.wrapper=t,this.beforeEl=this.wrapper.querySelector("[ts-before]"),this.afterEl=this.wrapper.querySelector("[ts-after]"),this.sliderEl=this.wrapper.querySelector("[ts-slider]"),this.beforeEl||console.warn("BeforeAfter: Missing [ts-before] element"),this.afterEl||console.warn("BeforeAfter: Missing [ts-after] element"),this.sliderEl||console.warn("BeforeAfter: Missing [ts-slider] element"),this.config={direction:this.wrapper.getAttribute("ts-direction")||"horizontal",initialPosition:parseInt(this.wrapper.getAttribute("ts-initial-position"))||50},this.state={isDragging:!1,position:this.config.initialPosition,bounds:null,initialized:!1},this.beforeEl&&this.afterEl&&this.sliderEl&&this.waitForImages().then((()=>{this.init()})).catch((t=>{console.warn("BeforeAfter: Error loading images -",t)}))}waitForImages(){return new Promise(((t,e)=>{const i=this.beforeEl.querySelector("img"),s=this.afterEl.querySelector("img");if(!i)return void e("Missing before image");if(!s)return void e("Missing after image");let n=0;const r=()=>{n++,2===n&&t()};i.complete?r():i.onload=r,s.complete?r():s.onload=r,setTimeout((()=>{n<2&&(console.warn("BeforeAfter: Image load timeout - proceeding anyway"),t())}),2e3)}))}init(){this.state.initialized||(this.state.initialized=!0,this.wrapper.style.position="relative",this.beforeEl.style.position="absolute",this.beforeEl.style.top="0",this.beforeEl.style.left="0",this.beforeEl.style.width="100%",this.beforeEl.style.height="100%",this.sliderEl.style.position="absolute",this.sliderEl.style.zIndex="2",this.updatePosition(this.config.initialPosition),this.bindEvents(),this.calculateBounds(),window.addEventListener("resize",this.handleResize.bind(this)))}bindEvents(){this.wrapper.addEventListener("mousedown",this.handleDragStart.bind(this)),document.addEventListener("mousemove",this.handleDrag.bind(this)),document.addEventListener("mouseup",this.handleDragEnd.bind(this)),this.wrapper.addEventListener("touchstart",this.handleDragStart.bind(this),{passive:!0}),document.addEventListener("touchmove",this.handleDrag.bind(this),{passive:!1}),document.addEventListener("touchend",this.handleDragEnd.bind(this)),this.wrapper.addEventListener("click",this.handleClick.bind(this)),this.wrapper.addEventListener("dblclick",this.handleReset.bind(this))}calculateBounds(){const t=this.wrapper.getBoundingClientRect();this.state.bounds={left:t.left,right:t.right,top:t.top,bottom:t.bottom,width:t.width,height:t.height}}handleResize(){this.calculateBounds(),this.updatePosition(this.state.position)}handleDragStart(t){t.target===this.sliderEl&&(this.state.isDragging=!0,this.wrapper.style.cursor="grabbing")}handleDrag(t){if(!this.state.isDragging)return;t.preventDefault();const e=this.calculatePosition(t);this.updatePosition(e)}handleDragEnd(){this.state.isDragging=!1,this.wrapper.style.cursor=""}handleClick(t){if(t.target===this.sliderEl)return;const e=this.calculatePosition(t);this.updatePosition(e)}handleReset(){this.updatePosition(this.config.initialPosition)}calculatePosition(t){const{bounds:e}=this.state,i=t.type.startsWith("touch"),s=i?t.touches[0].clientX:t.clientX,n=i?t.touches[0].clientY:t.clientY;let r;return r="horizontal"===this.config.direction?(s-e.left)/e.width*100:(n-e.top)/e.height*100,Math.max(0,Math.min(100,r))}updatePosition(t){this.state.position=t,requestAnimationFrame((()=>{"horizontal"===this.config.direction?(this.beforeEl.style.clipPath=`inset(0 ${100-t}% 0 0)`,this.sliderEl.style.left=`${t}%`,this.sliderEl.style.top="0"):(this.beforeEl.style.clipPath=`inset(0 0 ${100-t}% 0)`,this.sliderEl.style.top=`${t}%`,this.sliderEl.style.left="0")}))}destroy(){window.removeEventListener("resize",this.handleResize.bind(this)),this.wrapper.removeEventListener("mousedown",this.handleDragStart.bind(this)),document.removeEventListener("mousemove",this.handleDrag.bind(this)),document.removeEventListener("mouseup",this.handleDragEnd.bind(this)),this.wrapper.removeEventListener("touchstart",this.handleDragStart.bind(this)),document.removeEventListener("touchmove",this.handleDrag.bind(this)),document.removeEventListener("touchend",this.handleDragEnd.bind(this)),this.wrapper.removeEventListener("click",this.handleClick.bind(this)),this.wrapper.removeEventListener("dblclick",this.handleReset.bind(this)),this.wrapper=null,this.beforeEl=null,this.afterEl=null,this.sliderEl=null,this.state=null,this.config=null}}function initializeComparisons(){document.querySelectorAll('[ts-compare="true"]').forEach((t=>{t.beforeAfter||(t.beforeAfter=new BeforeAfter(t))}))}document.addEventListener("DOMContentLoaded",(()=>{initializeComparisons(),setTimeout(initializeComparisons,1e3)}));