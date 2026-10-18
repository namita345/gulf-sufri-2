import React from 'react';
import './digital-menus.css';
import './tabikh-process.css';
import DigitalMenuHero from './DigitalMenuHero.jsx';

const A='/assets/';
const templates=[
 {id:'classic',name:'Classic Gulf',sub:'Rich traditions, timeless elegance',image:'gdm-template-classic.webp',quip:'Ah, the classics. Good taste never goes out of style.'},
 {id:'elegant',name:'Modern Elegant',sub:'Clean, fresh and sophisticated',image:'gdm-template-elegant.webp',quip:'Modern, yes. But with proper manners. I approve.'},
 {id:'dark',name:'Modern Dark',sub:'Bold, contemporary and immersive',image:'gdm-template-dark.webp',quip:'Dark and mysterious! I used to have a library like that.'},
 {id:'fresh',name:'Light & Fresh',sub:'Bright, airy and inviting',image:'gdm-template-fresh.webp',quip:'So refreshing, even my old bones feel young again.'},
];
const features=[
 {title:'QR Menu Access',image:'gdm-feature-qr.webp',icon:'▦',desc:'Guests scan a QR code to discover your menu. No app download needed.'},
 {title:'Instant Updates',image:'gdm-feature-updates.webp',icon:'↻',desc:'Change dishes, prices and specials without printing new menus.'},
 {title:'Multi-Language Menus',image:'gdm-feature-language.webp',icon:'◎',desc:'Help international guests browse in their preferred language.'},
 {title:'Upsell Smarter',image:'gdm-feature-upsell.webp',icon:'↗',desc:'Highlight specials, add-ons and delicious recommendations.'},
];
const perks=[
 {icon:'♡',title:'Better Guest Experience',desc:'Appetizing photos, clear descriptions and effortless browsing.'},
 {icon:'⚙',title:'Easier Operations',desc:'Update menu details without managing another print run.'},
 {icon:'▤',title:'Reduce Print Costs',desc:'Save on recurring menu printing and paper waste.'},
 {icon:'✧',title:'Premium Brand Feel',desc:'A beautiful menu that feels unmistakably yours.'}
];
const countries=['Qatar','Bahrain','Kuwait','Saudi Arabia','United Arab Emirates','Oman','Other'];
function useReveal(){
 React.useEffect(()=>{
  const items=document.querySelectorAll('.gdm-page .gdm-reveal');
  if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('gdm-visible'));return;}
  const ob=new IntersectionObserver((entries)=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('gdm-visible');ob.unobserve(e.target)}},{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  items.forEach(el=>ob.observe(el));return()=>ob.disconnect();
 },[]);
}
function Overlay({children,onClose,label,className=''}){
 const ref=React.useRef(null);
 React.useEffect(()=>{
  const previous=document.activeElement,original=document.body.style.overflow;
  document.body.style.overflow='hidden';ref.current?.focus();
  const key=e=>{
   if(e.key==='Escape')onClose();
   if(e.key!=='Tab')return;
   const focusable=[...ref.current.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href]')];
   if(!focusable.length)return;
   if(e.shiftKey&&document.activeElement===focusable[0]){e.preventDefault();focusable.at(-1).focus();}
   if(!e.shiftKey&&document.activeElement===focusable.at(-1)){e.preventDefault();focusable[0].focus();}
  };
  document.addEventListener('keydown',key);return()=>{document.body.style.overflow=original;document.removeEventListener('keydown',key);previous?.focus?.()};
 },[onClose]);
 return <div className="gdm-modal-shade" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className={'gdm-dialog '+className} role="dialog" aria-modal="true" aria-label={label} ref={ref} tabIndex={-1}><button className="gdm-dialog-x" onClick={onClose} type="button" aria-label="Close dialog">×</button>{children}</section></div>;
}
function MenuInquiry({styleName,onClose}){
 const [data,setData]=React.useState({restaurant:'',name:'',email:'',phone:'',country:'Qatar',template:styleName||'Not sure yet',service:'Digital Menus',details:'',website:''});
 const [state,setState]=React.useState('idle'),[err,setErr]=React.useState('');
 const update=e=>setData(v=>({...v,[e.target.name]:e.target.value}));
 const submit=async(e)=>{
  e.preventDefault();setErr('');
  if(!data.email.trim()&&!data.phone.trim()){setErr('Please provide an email or WhatsApp number.');return;}
  setState('loading');
  try{
   const res=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
   const body=await res.json().catch(()=>({}));
   if(!res.ok)throw Error(body.error||'Unable to send your request.');
   setState('done');
  }catch(error){setErr(error.message||'Please try again.');setState('idle')}
 };
 return <Overlay onClose={onClose} label="Digital Menu inquiry form" className="gdm-inquiry-dialog">
  {state==='done'?<div className="gdm-inquiry-success"><span className="gdm-eyebrow">MESSAGE RECEIVED</span><h2>Beautiful. Your menu journey starts here.</h2><p>Thank you! We’ll get back to you using the contact details you provided.</p><button type="button" className="gdm-button gdm-button-gold" onClick={onClose}>Back to Tabikh →</button></div>:<>
   <span className="gdm-eyebrow">LET'S MAKE MENU MAGIC</span><h2>Tell Tabikh about your restaurant.</h2><p className="gdm-inquiry-intro">“A fine menu begins with a little conversation, habibi.”</p>
   <form className="gdm-inquiry-form" onSubmit={submit}>
    <div className="gdm-form-pair"><label>Restaurant name *<input required maxLength="120" name="restaurant" value={data.restaurant} onChange={update} placeholder="Your restaurant"/></label><label>Your name *<input required maxLength="120" name="name" value={data.name} onChange={update} placeholder="Your name"/></label></div>
    <div className="gdm-form-pair"><label>Email<input type="email" maxLength="200" name="email" value={data.email} onChange={update} placeholder="you@example.com"/></label><label>WhatsApp number<input maxLength="35" name="phone" type="tel" value={data.phone} onChange={update} placeholder="+974 ..."/></label></div>
    <div className="gdm-form-pair"><label>Country<select name="country" value={data.country} onChange={update}>{countries.map(x=><option key={x}>{x}</option>)}</select></label><label>Preferred menu style<select name="template" value={data.template} onChange={update}><option>Not sure yet</option>{templates.map(x=><option key={x.id}>{x.name}</option>)}<option>Something custom</option></select></label></div>
    <label>Tell us about your menu (optional)<textarea rows="3" maxLength="2000" name="details" value={data.details} onChange={update} placeholder="Cuisine, number of dishes, languages or anything we should know"/></label>
    <label className="gdm-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" onChange={update} value={data.website}/></label>
    {err&&<p className="gdm-form-error" role="alert">{err} <a href="mailto:yalla@gulfsufri.com?subject=Digital%20Menu%20Inquiry">Email us instead</a></p>}
    <button className="gdm-button gdm-button-gold gdm-submit" type="submit" disabled={state==='loading'}>{state==='loading'?'Sending…':'Send My Menu Wish'} <span>→</span></button>
    <small>We only use these details to reply to your inquiry.</small>
   </form>
  </>}
 </Overlay>;
}
const chapterDetails=[
 {title:'Share Your Menu',text:'Send us your dishes, photos and descriptions.',quip:'You bring the dishes. I shall keep the ancient recipes safely tucked away.',face:'gdm-tabikh-thinking.webp'},
 {title:'We Design & Build',text:'We design your menu and set up easy updates.',quip:'A little design magic, and not a dusty scroll in sight!',face:'gdm-tabikh-surprise.webp'},
 {title:'Launch & Scan',text:'Share your QR code and welcome your guests.',quip:'Three simple steps! I have seen recipes more complicated than that.',face:'gdm-tabikh-laugh.webp'}
];
function EnchantedProcess({onInquiry}){
 const [opened,setOpened]=React.useState(false);
 const [opening,setOpening]=React.useState(false);
 const [burst,setBurst]=React.useState(0);
 const timer=React.useRef(null);
 React.useEffect(()=>()=>window.clearTimeout(timer.current),[]);
 const openBook=()=>{
  if(opened||opening)return;
  setOpening(true);
  setBurst(v=>v+1);
  window.clearTimeout(timer.current);
  timer.current=window.setTimeout(()=>{setOpened(true);setOpening(false);},500);
 };
 const replay=()=>{window.clearTimeout(timer.current);setOpened(false);setOpening(false)};
 return <section id="gdm-process" className="gdm-shell gdm-panel gdm-process gdm-reveal gdm-story" aria-labelledby="gdm-process-title">
  <header className="gdm-story-heading">
   <span className="gdm-eyebrow">SIMPLE PROCESS</span>
   <h2 id="gdm-process-title">How Tabikh <em>Makes It Happen</em></h2>
   <p>Three little steps, one beautiful digital menu. Tabikh has a little magic to show you.</p>
  </header>
  <div className="gdm-story-steps" aria-label="Our three simple steps">
   {chapterDetails.map((step,i)=><article className="gdm-story-step" key={step.title}>
    <div className="gdm-story-icon"><img src={A+['gdm-process-share.webp','gdm-process-build.webp','gdm-process-scan.webp'][i]} alt="" loading="lazy"/></div>
    <div className="gdm-story-step-info"><span className="gdm-story-number">0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></div>
   </article>)}
  </div>
  <div className={'gdm-story-stage'+(opened?' is-open':'')+(opening?' is-opening':'')}>
   <div className="gdm-story-stage-copy">
    <span className="gdm-story-eyebrow">A LITTLE MAGIC FROM TABIKH</span>
    <h3>{opened?'Your next chapter begins here.':'The Enchanted Menu Book'}</h3>
    <p>{opened?'Your restaurant menu deserves its own beautiful story.':'An old book, a bright idea, and something wonderful inside. Tap to reveal the magic.'}</p>
   </div>
   <div className="gdm-story-stage-scene">
    <div className="gdm-story-book-holder">
     <div className="gdm-story-aura" aria-hidden="true"/>
     <button className="gdm-story-book-button" type="button" onClick={openBook} disabled={opened||opening} aria-label="Open Tabikh's floating enchanted book">
      <img src={A+'gdm-closed-enchanted-book.webp'} alt="Closed emerald and gold enchanted book"/>
     </button>
     <img className="gdm-story-open-book" src={A+'gdm-open-enchanted-book.webp'} alt={opened?'The enchanted book is open':''} aria-hidden={!opened}/>
     <div className="gdm-story-shimmer" aria-hidden="true" key={burst}><span/><span/><span/><span/><span/><span/><span/><span/></div>
    </div>
    <div className="gdm-story-guide">
     <div className="gdm-story-speech">{opened?'“And just like that, your menu has a little more magic!”':'“Ah, a curious visitor. Shall we open the book?”'}</div>
     <img src={A+(opened?'gdm-tabikh-laugh.webp':'gdm-tabikh-thinking.webp')} alt="Tabikh, your wise and funny menu guide"/>
    </div>
   </div>
   <div className="gdm-story-actions">
    {opened?<button className="gdm-story-secondary" type="button" onClick={replay}>↺ See the Magic Again</button>:<button className="gdm-story-primary" type="button" onClick={openBook} disabled={opening}>{opening?'Opening the Magic…':'✦ Open the Enchanted Book'}</button>}
    <button className="gdm-story-primary" type="button" onClick={onInquiry}>Create My Digital Menu →</button>
   </div>
  </div>
 </section>;
}

export default function DigitalMenus(){
 const [inquiry,setInquiry]=React.useState(null);
 const [preview,setPreview]=React.useState(null);
 const [hovered,setHovered]=React.useState(null);
 const rail=React.useRef(null);
 useReveal();
 const closeInquiry=React.useCallback(()=>setInquiry(null),[]);
 const closePreview=React.useCallback(()=>setPreview(null),[]);
 const ask=(name='Not sure yet')=>{setPreview(null);setInquiry(name)};
 const scrollTemplates=(direction)=>rail.current?.scrollBy({left:direction*rail.current.clientWidth*.76,behavior:'smooth'});
 return <main className="gdm-page">
  <DigitalMenuHero onInquiry={()=>ask()}/>

  <div className="gdm-sections">
   <section className="gdm-shell gdm-panel gdm-features gdm-reveal" aria-labelledby="gdm-features-title">
    <div className="gdm-section-head gdm-features-head"><div><span className="gdm-eyebrow">WHY RESTAURANTS CHOOSE GULFSUFRA</span><h2 id="gdm-features-title">Powerful Features for<br/><em>Modern Dining Experiences</em></h2></div><p>Beautiful menus. Happier guests. Smoother operations. Everything your restaurant needs to deliver an unforgettable dining experience.</p></div>
    <div className="gdm-feature-grid">{features.map((f,i)=><article key={f.title} className="gdm-feature gdm-reveal" style={{'--gdm-delay':`${i*.1}s`}}><div className="gdm-feature-image"><img src={A+f.image} loading="lazy" alt={`${f.title} digital menu feature illustration`}/></div><div className="gdm-feature-bottom"><span className="gdm-feature-icon" aria-hidden="true">{f.icon}</span><div><h3>{f.title}</h3><p>{f.desc}</p></div></div></article>)}</div>
   </section>

   <section id="gdm-showroom" className="gdm-shell gdm-panel gdm-showroom gdm-reveal" aria-labelledby="gdm-templates-title">
    <div className="gdm-section-head gdm-showroom-head"><div><span className="gdm-eyebrow">BEAUTIFUL MENU STYLES</span><h2 id="gdm-templates-title">Templates for Every<br/><em>Taste and Tradition</em></h2></div><p>Choose a style that matches your restaurant’s personality. Every menu can be tailored to your colors, logo and dishes.</p><div className="gdm-rail-controls"><button type="button" onClick={()=>scrollTemplates(-1)} aria-label="Scroll templates left">←</button><button type="button" onClick={()=>scrollTemplates(1)} aria-label="Scroll templates right">→</button></div></div>
    <div className="gdm-template-rail" ref={rail}>{templates.map((t,i)=><article key={t.id} className={'gdm-template'+(hovered===t.id?' is-active':'')} onMouseEnter={()=>setHovered(t.id)} onMouseLeave={()=>setHovered(x=>x===t.id?null:x)} onFocusCapture={()=>setHovered(t.id)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHovered(x=>x===t.id?null:x)}}>
      <button className="gdm-template-image" type="button" onClick={()=>{if(window.matchMedia('(hover: none)').matches && hovered!==t.id){setHovered(t.id);return;}setPreview(t)}} aria-label={`Preview ${t.name} digital menu` }><img src={A+t.image} alt={`${t.name} mobile digital menu design`} loading="lazy"/><span className="gdm-template-view">Preview Menu ↗</span></button>
      <div className="gdm-template-info"><div><h3>{t.name}</h3><p>{t.sub}</p></div><button className="gdm-template-arrow" type="button" onClick={()=>setPreview(t)} aria-label={`Preview ${t.name}`}>→</button></div>
      <div className="gdm-tabikh-comment" aria-hidden="true"><img src={A+(i%2===0?'gdm-tabikh-thinking.webp':'gdm-tabikh-surprise.webp')} alt="" loading="lazy"/><p>{t.quip}</p></div>
      <button className="gdm-pick-style" type="button" onClick={()=>ask(t.name)}>I Want This Style ↗</button>
     </article>)}</div>
    <div className="gdm-showroom-foot"><span>Illustrative demo concepts, customized to suit your restaurant.</span><button type="button" className="gdm-text-button" onClick={()=>ask('Something custom')}>Want something unique? Let's create it →</button></div>
   </section>

   <EnchantedProcess onInquiry={()=>ask()} />

   <section className="gdm-shell gdm-panel gdm-perks gdm-reveal" aria-labelledby="gdm-perks-title"><div className="gdm-perks-intro"><span className="gdm-eyebrow">MORE THAN A MENU</span><h2 id="gdm-perks-title">A Smarter Way<br/><em>to Serve</em></h2><p>Beautiful menus are only the beginning. Give your team less hassle and your guests an experience worth remembering.</p></div><div className="gdm-perks-grid">{perks.map((perk,i)=><article key={perk.title} className="gdm-reveal" style={{'--gdm-delay':`${i*.09}s`}}><span className="gdm-perk-icon" aria-hidden="true">{perk.icon}</span><h3>{perk.title}</h3><p>{perk.desc}</p></article>)}</div></section>

   <section className="gdm-shell gdm-last gdm-reveal" aria-labelledby="gdm-last-title"><div className="gdm-last-background"/><div className="gdm-last-content"><span className="gdm-eyebrow">ONE LAST CHAPTER</span><h2 id="gdm-last-title">Bring Your Menu to Life<br/><em>with GulfSufra</em></h2><p>Your guests deserve a beautiful, easy-to-use menu. Let's make something memorable together.</p><div className="gdm-last-actions"><button type="button" className="gdm-button gdm-button-gold" onClick={()=>ask()}>Get Started Today <span>→</span></button><a href="#gdm-process" className="gdm-last-more">See How It Works ↗</a></div></div><img className="gdm-last-tabikh" src={A+'gdm-tabikh-laugh.webp'} alt="Tabikh invites you to create a digital menu" loading="lazy"/><div className="gdm-last-bubble">“Good food creates happy people. Let's make your menu magical together!” ✦</div></section>
  </div>
  {preview&&<Overlay onClose={closePreview} label={`${preview.name} digital menu preview`} className="gdm-preview-dialog"><div className="gdm-preview-copy"><span className="gdm-eyebrow">YOUR MENU, YOUR STYLE</span><h2>{preview.name}</h2><p>{preview.sub}. A design direction you can make your own.</p></div><img className="gdm-preview-image" src={A+preview.image} alt={`${preview.name} digital menu large preview`}/><div className="gdm-preview-footer"><span>Illustrative concept · Your menu will be customized</span><button type="button" className="gdm-button gdm-button-gold" onClick={()=>ask(preview.name)}>I Want This Style →</button></div></Overlay>}
  {inquiry!==null&&<MenuInquiry key={inquiry} styleName={inquiry} onClose={closeInquiry}/>}
 </main>;
}
