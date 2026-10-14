import React from 'react';
import { gsap } from 'gsap';
import EnchantedSmoke from './EnchantedSmoke.jsx';
import './restaurant-websites.css';

const A = '/assets/';
const TEMPLATES = [
  { id:'spice-house', name:'The Spice House', style:'Dark · Elegant · Bold', image:'template-spice-house.webp', description:'A dramatic, luxury look for destination dining and signature cuisine.', jinni:'jinni-template-spice.webp', quip:'Dark, dramatic, expensive-looking. Finally, a website with standards.' },
  { id:'olive-thyme', name:'Olive & Thyme', style:'Clean · Modern · Fresh', image:'template-olive-thyme.webp', description:'Sunlit, minimal design for modern cafés and Mediterranean concepts.', jinni:'jinni-template-olive.webp', quip:'Elegant. Minimal. See? You don’t need 47 colors to look expensive.' },
  { id:'al-yamama', name:'Al Yamama', style:'Traditional · Luxury · Warm', image:'template-al-yamama.webp', description:'Timeless Arabian hospitality, with rich green and golden details.', jinni:'jinni-template-yamama.webp', quip:'Traditional doesn’t mean outdated, darling. This isn’t 2009.' },
  { id:'ocean-grill', name:'Ocean Grill', style:'Modern · Clean · Coastal', image:'template-ocean-grill.webp', description:'Fresh ocean blue with refined seafood and coastal imagery.', jinni:'jinni-template-ocean.webp', quip:'Coastal luxury without the tacky clip-art fish. You’re welcome.' },
];

const FEATURES = [
  { number: '01', heading: 'Custom Design', text: "A website that feels like your restaurant, not everyone else’s.", image: 'jrw-wish-custom-design.webp' },
  { number: '02', heading: 'Online Reservations', text: 'Help diners book a table with just a few clicks.', image: 'jrw-wish-reservations.webp' },
  { number: '03', heading: 'Mobile Optimized', text: 'Beautiful, easy to use, on every screen.', image: 'jrw-wish-mobile.webp' },
  { number: '04', heading: 'FREE SEO Included', text: 'Essential on-page SEO setup at no extra cost.', image: 'jrw-wish-seo.webp' },
];

function LineIcon({name}) {
 const props={width:36,height:36,viewBox:'0 0 36 36',fill:'none',stroke:'currentColor',strokeWidth:1.75,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true};
 const paths={
 monitor:<><rect x="4" y="6" width="28" height="20" rx="2"/><path d="M13 31h10M18 26v5"/></>,
 calendar:<><rect x="5" y="8" width="26" height="23" rx="3"/><path d="M11 4v8M25 4v8M5 15h26M12 21h4M21 21h4M12 26h4"/></>,
 phone:<><rect x="11" y="3" width="14" height="30" rx="3"/><path d="M15 7h6M17 29h2"/></>,
 chart:<><path d="M5 29V20M13 29V16M21 29V11M29 29V5M3 32h30"/><path d="m5 15 8-5 8 2 9-8"/></>,
 chat:<><path d="M5 6h26v19H15l-8 6v-6H5Z"/><circle cx="12" cy="16" r="1"/><circle cx="18" cy="16" r="1"/><circle cx="24" cy="16" r="1"/></>,
 pen:<><path d="m7 27 3-9L25 3l8 8-15 15-9 3Z"/><path d="m20 8 8 8M8 29l-3 3M6 5l3 3M30 26l3 3"/></>,
 rocket:<><path d="M13 23c-1-8 5-17 18-19-1 13-11 20-19 19Z"/><path d="m18 18 6-6M12 16H5l-2 8 9-2M20 24l-2 9 8-3v-7M9 27l-4 4"/></>
 };
 return <svg {...props}>{paths[name]||paths.monitor}</svg>;
}

function Reveal({children,className='',style,...rest}) {
 const ref=React.useRef(null);
 const [visible,setVisible]=React.useState(false);
 React.useEffect(()=>{
  if (typeof window==='undefined'||!('IntersectionObserver' in window)){setVisible(true);return;}
  const ob=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){setVisible(true);ob.disconnect();}},{threshold:0.09});
  if(ref.current)ob.observe(ref.current);
  return()=>ob.disconnect();
 },[]);
 return <div {...rest} ref={ref} className={`jrw-reveal ${visible?'is-visible ':''}${className}`} style={style}>{children}</div>;
}

const initialForm={restaurant:'',name:'',email:'',phone:'',country:'Qatar',template:'Not sure yet',details:'',website:''};
function InquiryModal({onClose,selectedTemplate}){
 const [form,setForm]=React.useState({...initialForm,template:selectedTemplate||'Not sure yet'});
 const [status,setStatus]=React.useState('idle');
 const [error,setError]=React.useState('');
 const closeRef=React.useRef(null);
 React.useEffect(()=>{
  const last=document.activeElement;
  const scroll=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeRef.current?.focus();
  const key=e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){
   const nodes=Array.from(document.querySelectorAll('.jrw-modal [href], .jrw-modal button:not([disabled]), .jrw-modal input:not([disabled]), .jrw-modal select:not([disabled]), .jrw-modal textarea:not([disabled])'));
   if(!nodes.length)return;
   const first=nodes[0],last=nodes[nodes.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }};
  document.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=scroll;document.removeEventListener('keydown',key);last?.focus?.();};
 },[onClose]);
 const update=e=>setForm(p=>({...p,[e.target.name]:e.target.value}));
 async function submit(e){
  e.preventDefault();setError('');
  if (!form.email.trim()&&!form.phone.trim()){setError('Enter an email address or WhatsApp number so we can reply.');return;}
  setStatus('sending');
  try {
   const resp=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
   const body=await resp.json().catch(()=>({}));
   if(!resp.ok)throw new Error(body.error||'Your inquiry could not be sent. Please try again.');
   setStatus('success');
  }catch(err){setError(err.message||'Something went wrong. Please try again.');setStatus('idle');}
 }
 return <div className="jrw-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <section className="jrw-modal" role="dialog" aria-modal="true" aria-labelledby="jrw-modal-title">
   <button ref={closeRef} className="jrw-modal-close" type="button" aria-label="Close inquiry form" onClick={onClose}>×</button>
   {status==='success'?<div className="jrw-form-success" role="status"><div className="jrw-success-mark">✓</div><span className="jrw-label">WISH RECEIVED</span><h2 id="jrw-modal-title">Your website wish is in good hands.</h2><p>Thanks for reaching out! We'll review your restaurant details and get back to you using the contact information you provided.</p><button type="button" className="jrw-btn jrw-btn-primary" onClick={onClose}>Back to the showroom <span>→</span></button></div>:<>
   <div className="jrw-modal-head"><span className="jrw-label">YOUR WEBSITE WISH</span><h2 id="jrw-modal-title">Let's make some magic.</h2><p>“Finally. Someone with excellent taste. Let's make your restaurant impossible to ignore.” — Jinni</p></div>
   <form className="jrw-form" onSubmit={submit}>
    <div className="jrw-form-grid"><label>Restaurant name <span>*</span><input name="restaurant" value={form.restaurant} onChange={update} required maxLength="120" placeholder="Your restaurant"/></label><label>Your name <span>*</span><input name="name" value={form.name} onChange={update} required maxLength="120" placeholder="Your full name"/></label></div>
    <div className="jrw-form-grid"><label>Email <small>(or WhatsApp)</small><input name="email" type="email" value={form.email} onChange={update} maxLength="200" placeholder="you@example.com"/></label><label>WhatsApp number <small>(or email)</small><input name="phone" type="tel" value={form.phone} onChange={update} maxLength="35" placeholder="+974 ..."/></label></div>
    <div className="jrw-form-grid"><label>Country<select name="country" value={form.country} onChange={update}>{['Qatar','Bahrain','Kuwait','Saudi Arabia','United Arab Emirates','Oman','Other'].map(c=><option key={c}>{c}</option>)}</select></label><label>Preferred style<select name="template" value={form.template} onChange={update}><option>Not sure yet</option>{TEMPLATES.map(t=><option key={t.id}>{t.name}</option>)}<option>Something custom</option></select></label></div>
    <label>Tell us a little about your restaurant <small>(optional)</small><textarea name="details" rows="3" value={form.details} onChange={update} maxLength="2000" placeholder="What kind of website are you imagining?"/></label>
    <div className="jrw-trap" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} value={form.website} onChange={update}/></label></div>
    {error&&<p className="jrw-form-error" role="alert">{error}</p>}
    <button type="submit" className="jrw-btn jrw-btn-primary jrw-submit" disabled={status==='sending'}>{status==='sending'?'Sending your inquiry…':'Send My Website Wish'} <span>→</span></button>
    <small className="jrw-privacy">We'll only use your details to respond to your inquiry.</small>
   </form></>}
  </section>
 </div>;
}

export default function RestaurantWebsites(){
 const [preview,setPreview]=React.useState(null);
 const [activeTemplate,setActiveTemplate]=React.useState(null);
 const [lampStage,setLampStage]=React.useState(0);
 const [lampRun,setLampRun]=React.useState(0);
 const sceneRef=React.useRef(null);
 const lampRef=React.useRef(null);
 const jinniRef=React.useRef(null);
 const sequence=React.useRef(null);
 const hovering=React.useRef(null);
 React.useEffect(()=>()=>{
  sequence.current?.kill();
  hovering.current?.kill();
 },[]);
 const rubLamp=()=>{
  sequence.current?.kill();
  hovering.current?.kill();
  setLampRun(run=>run+1);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
   gsap.set(jinniRef.current,{clearProps:'all'});
   setLampStage(8);
   return;
  }
  setLampStage(1);
  // A single cancellable GSAP timeline controls the entire summoning.
  gsap.set(jinniRef.current,{autoAlpha:0,x:118,y:96,scale:.38,rotation:6,filter:'blur(9px)'});
  const tl=gsap.timeline({defaults:{overwrite:'auto'}});
  sequence.current=tl;
  tl.call(()=>setLampStage(2),null,.68) // smoke first
    .call(()=>setLampStage(3),null,1.70)
    .to(jinniRef.current,{
      autoAlpha:1,x:0,y:0,scale:1,rotation:0,filter:'blur(0px)',
      duration:1.4,ease:'power3.out'
    },1.70)
    .call(()=>setLampStage(4),null,3.09) // speech bubble
    .call(()=>setLampStage(5),null,3.25)
    .call(()=>setLampStage(6),null,3.60)
    .call(()=>setLampStage(7),null,3.95)
    .call(()=>{
      setLampStage(8);
      // Continue a very subtle hover above the smoke after emergence.
      hovering.current=gsap.to(jinniRef.current,{y:-8,duration:3.1,ease:'sine.inOut',repeat:-1,yoyo:true});
    },null,4.40);
 };
 const [inquiry,setInquiry]=React.useState(null);
 const closeInquiry=React.useCallback(()=>setInquiry(null),[]);
 const closePreview=React.useCallback(()=>setPreview(null),[]);
 React.useEffect(()=>{
  if(!preview)return;
  const onKey=e=>{if(e.key==='Escape')closePreview();};
  document.addEventListener('keydown',onKey);
  return()=>document.removeEventListener('keydown',onKey);
 },[preview,closePreview]);
 const ask=(t='Not sure yet')=>{setPreview(null);setInquiry(t);};
 return <main className="jrw-page">
  <section className="jrw-hero" aria-labelledby="jrw-title">
   <div className="jrw-hero-bg" aria-hidden="true"/>
   <div className="jrw-container jrw-hero-inner">
    <div className="jrw-hero-copy">
     <span className="jrw-label">RESTAURANT WEBSITES</span>
     <h1 id="jrw-title">Wish for a<br/>Restaurant Website?<br/><span>Consider it Granted!</span></h1>
     <p>Beautiful, high-performing restaurant websites that attract diners, take reservations and help your business grow — with <strong>FREE SEO</strong> included.</p>
     <div className="jrw-actions"><button className="jrw-btn jrw-btn-primary" type="button" onClick={()=>ask()}>Get Your Website <span>→</span></button><a className="jrw-btn jrw-btn-secondary" href="#jrw-templates">View Templates</a></div>
     <div className="jrw-proof" aria-label="Restaurant website demo styles and trust information">
      <img src={A+'jinni-portrait-placeholders.webp'} alt="Illustrative photorealistic hospitality portraits, not actual GulfSufra clients"/>
      <div className="jrw-proof-copy"><span>Made for restaurants across the Gulf.</span><small>See four demo styles below.</small><div className="jrw-rating"><span className="jrw-stars" aria-hidden="true">★★★★★</span><span>Trusted by clients</span></div></div>
     </div><small className="jrw-proof-disclaimer">Illustrative portraits and rating motif — add verified client photos and review data before publishing.</small>
    </div>
    <div className="jrw-hero-visual" aria-label="Jinni presents a restaurant website on laptop and mobile">
     <img className="jrw-jinni" src={A+'jinni-confident.webp'} alt="Jinni the website genie, confidently presenting"/>
     <div className="jrw-hero-bubble" aria-label="A message from Jinni"><strong>Hi, I'm Jinni!</strong><span>I turn boring websites into beautiful ones. You're welcome. ✨</span></div>
     <img className="jrw-devices" src={A+'jinni-jingle-devices.webp'} alt="Jingle sample restaurant website shown on desktop and phone"/>
     <img className="jrw-lamp" src={A+'jinni-gold-lamp.webp'} alt="" aria-hidden="true"/>
    </div>
   </div>
  </section>

  <section className="jrw-benefits jrw-wishes" aria-labelledby="jrw-wishes-title">
   <div className="jrw-wishes-panel">
    <Reveal className="jrw-wishes-heading">
     <span className="jrw-wishes-eyebrow">THE JINNI ADVANTAGE <span aria-hidden="true">✦</span></span>
     <h2 id="jrw-wishes-title">Four Wishes. <span>Zero Compromises.</span></h2>
     <p>Everything your restaurant needs to make a little magic online.</p>
    </Reveal>
    <div className="jrw-wishes-body">
     <div className="jrw-wishes-grid">
      {FEATURES.map((feature,i)=><Reveal className="jrw-wish" key={feature.number} style={{'--delay':`${i*.12}s`}}>
       <div className="jrw-wish-art"><img src={A+feature.image} alt="" loading="lazy" width="250" height="250"/></div>
       <div className="jrw-wish-number" aria-hidden="true"><span>{feature.number}</span><i/></div>
       <h3>{feature.heading}</h3>
       <p>{feature.text}</p>
      </Reveal>)}
     </div>
     <Reveal className="jrw-wishes-companion" style={{'--delay':'.38s'}}>
      <div className="jrw-wishes-quip">A stunning website nobody can find? Darling, that's just expensive wallpaper.<span aria-hidden="true"> ✦</span></div>
      <img className="jrw-wishes-jinni" src={A+'jrw-wish-jinni.webp'} alt="Jinni the website genie, smiling with a knowing expression and presenting the four wishes" loading="lazy" width="320" height="320"/>
     </Reveal>
    </div>
   </div>
  </section>

  <section id="jrw-templates" className="jrw-templates jrw-container">
   <Reveal className="jrw-templates-header"><div><span className="jrw-label">CHOOSE A STYLE THAT MATCHES YOUR RESTAURANT</span><h2>Beautiful Templates, <span>Made for You</span></h2><p>Four demo concepts, each ready to inspire a website customized to your restaurant and brand.</p></div><button type="button" className="jrw-btn jrw-btn-secondary jrw-header-cta" onClick={()=>ask()}>Create My Own Style <span>→</span></button></Reveal>
   <div className="jrw-template-grid">{TEMPLATES.map((t,i)=><Reveal
    key={t.id}
    className={`jrw-template-card${activeTemplate===t.id?' is-jinni-active':''}`}
    style={{'--delay':`${i*.11}s`}}
    onPointerEnter={e=>{if(e.pointerType==='mouse')setActiveTemplate(t.id);}}
    onPointerLeave={e=>{if(e.pointerType==='mouse')setActiveTemplate(current=>current===t.id?null:current);}}
    onFocusCapture={e=>{if(e.target.matches(':focus-visible'))setActiveTemplate(t.id);}}
    onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setActiveTemplate(current=>current===t.id?null:current);}}
    onClick={e=>{if(window.matchMedia('(hover: none)').matches&&!e.target.closest('button'))setActiveTemplate(current=>current===t.id?null:t.id);}}
   >
    <div className="jrw-template-visual">
     <button className="jrw-template-img" type="button"
      onClick={()=>{if(window.matchMedia('(hover: none)').matches&&activeTemplate!==t.id){setActiveTemplate(t.id);return;}setPreview(t);}}
      aria-label={activeTemplate===t.id?`Preview ${t.name} website demo`:`Explore ${t.name} website demo`}
      aria-expanded={activeTemplate===t.id} aria-controls={`jrw-template-magic-${t.id}`}>
      <img src={A+t.image} alt={`${t.name} demo restaurant website, desktop and mobile preview`} loading="lazy"/>
      <span className="jrw-image-hover">View Design ↗</span>
     </button>
     <div id={`jrw-template-magic-${t.id}`} className="jrw-template-magic">
      <span className="jrw-template-dust jrw-template-dust-one" aria-hidden="true">✦</span><span className="jrw-template-dust jrw-template-dust-two" aria-hidden="true">✧</span>
      <div className="jrw-template-jinni-frame"><img src={A+t.jinni} alt="" loading="lazy"/></div>
      <div className="jrw-template-quip">{t.quip}</div>
     </div>
     <div className="jrw-template-hover-actions">
      <button type="button" onClick={()=>setPreview(t)}>Preview Website ↗</button>
      <button type="button" onClick={()=>ask(t.name)}>I Want This Style →</button>
     </div>
    </div>
    <div className="jrw-template-body"><div><h3>{t.name}</h3><p>{t.style}</p></div><button type="button" className="jrw-template-arrow" onClick={()=>setPreview(t)} aria-label={`Explore ${t.name}`}>→</button></div>
    <button type="button" className="jrw-pick-style" onClick={()=>ask(t.name)}>I Want This Style ↗</button>
   </Reveal>)}</div>
   <p className="jrw-demo-disclosure">These are illustrative demo concepts, not examples of completed client projects.</p>
  </section>

  <section className={`jrw-process${lampStage>0?' is-magic-on':''}`} aria-labelledby="jrw-process-title"><div className="jrw-container jrw-process-inner">
   <Reveal className="jrw-process-heading"><span className="jrw-label">HOW JINNI MAKES IT HAPPEN</span><h2 id="jrw-process-title">A Simple <span>3-Step</span> Process</h2><p>“Three simple steps. And no, you don't need three wishes.”</p></Reveal>
   <div className="jrw-steps">
    {[
     {no:'01',icon:'chat',title:'Share Your Vision',text:'Tell us about your restaurant, style and requirements.'},
     {no:'02',icon:'pen',title:'We Design & Build',text:'We craft a customized website that feels like your brand.'},
     {no:'03',icon:'rocket',title:'Launch & Grow',text:'Your website goes live with essential on-page SEO setup.'}
    ].map((step,i)=><Reveal key={step.no} className={`jrw-step${lampStage>=i+5?' is-magic-lit':''}`} style={{'--delay':`${i*.17}s`}}><div className="jrw-step-symbol"><LineIcon name={step.icon}/><span>{step.no}</span></div><div><h3>{step.title}</h3><p>{step.text}</p></div>{i<2&&<span className="jrw-step-arrow" aria-hidden="true">⟶</span>}</Reveal>)}
    {lampStage>=5&&<span key={lampRun} className="jrw-process-gold-trail" aria-hidden="true"/>}
   </div>
   <div className={`jrw-lamp-experience${lampStage>0?' is-activated':''}${lampStage>=2?' is-smoking':''}${lampStage>=3?' is-jinni-awake':''}${lampStage>=4?' is-speaking':''}${lampStage>=8?' is-wish-ready':''}`}>
    <div ref={sceneRef} className="jrw-enchanted-stage">
     <div className="jrw-lamp-ambient" aria-hidden="true"/>
     <button
      type="button"
      className="jrw-lamp-button"
      ref={lampRef}
      onClick={rubLamp}
      aria-label={lampStage===0?'Rub the golden lamp to summon Jinni':'Replay Jinni’s magical lamp animation'}
     >
      <img src={A+'jinni-gold-lamp.webp'} alt="" width="220" height="220" loading="lazy"/>
      <span className="jrw-lamp-rub-hint" aria-hidden="true">✦</span>
     </button>
     <EnchantedSmoke active={lampStage>=2} run={lampRun} stageRef={sceneRef} lampRef={lampRef} jinniRef={jinniRef}/>
     <div className="jrw-summon-character" aria-hidden="true">
      <img ref={jinniRef} className="jrw-summon-jinni" src={A+'jrw-wish-jinni.webp'} alt="" width="300" height="300" loading="lazy"/>
      <span className="jrw-summon-stars" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ✦</span>
     </div>
     <div className="jrw-summon-message">
      <div className="jrw-summon-bubble" role="status" aria-live="polite">
       {lampStage>=8?"See? Three steps. It really wasn't that difficult, darling.":"Oh, you finally rubbed it. I was beginning to think you needed instructions."}
      </div>
      <button type="button" className="jrw-btn jrw-btn-primary jrw-summon-cta" onClick={()=>ask()} tabIndex={lampStage>=8?0:-1} aria-hidden={lampStage<8}>
       Grant My Website Wish <span aria-hidden="true">→</span>
      </button>
     </div>
     <div className="jrw-lamp-caption" role="status" aria-live="polite">
      {lampStage===0?'Go on, rub the lamp. I’m waiting.':lampStage<3?'The smoke is gathering…':lampStage<8?'Of course I made an entrance.':'Magic complete. Tap the lamp to watch again.'}
     </div>
    </div>
   </div>
  </div></section>

  <section className="jrw-final" aria-labelledby="jrw-final-title"><div className="jrw-container jrw-final-panel"><div className="jrw-final-image" aria-hidden="true"/>
   <button type="button" className="jrw-final-magical-lamp" onClick={()=>ask()} aria-label="Make your website wish — open the inquiry form">
    <span className="jrw-final-lamp-float" aria-hidden="true">
     <img src={A+'jinni-gold-lamp.webp'} alt="" width="220" height="220" loading="lazy"/>
     <span className="jrw-final-lamp-spark jrw-final-spark-one">✦</span>
     <span className="jrw-final-lamp-spark jrw-final-spark-two">✧</span>
     <span className="jrw-final-lamp-spark jrw-final-spark-three">✦</span>
     <span className="jrw-final-lamp-spark jrw-final-spark-four">✧</span>
    </span>
    <span className="jrw-final-lamp-tooltip" aria-hidden="true">One last wish, darling? Make it count.</span>
   </button>
   <div className="jrw-final-content"><span className="jrw-label">ONE LAST WISH?</span><h2 id="jrw-final-title">Ready to Get Your Restaurant Online?</h2><p>“You've admired my work long enough, darling. Shall we make yours?”</p><button type="button" className="jrw-btn jrw-btn-primary" onClick={()=>ask()}>Grant My Website Wish <span>→</span></button></div><span className="jrw-final-note">Your success is just a wish away ✧</span></div></section>

  {preview&&<div className="jrw-preview-overlay" onMouseDown={e=>{if(e.currentTarget===e.target)closePreview();}}><div className="jrw-preview-dialog" role="dialog" aria-modal="true" aria-label={`${preview.name} template preview`}><div className="jrw-preview-top"><div><h2>{preview.name}</h2><p>{preview.description}</p></div><button type="button" className="jrw-preview-close" onClick={closePreview} aria-label="Close preview">×</button></div><img src={A+preview.image} alt={`${preview.name} restaurant demo template large preview`}/><div className="jrw-preview-bottom"><span>Illustrative design concept · Can be customized for your restaurant</span><button type="button" className="jrw-btn jrw-btn-primary" onClick={()=>ask(preview.name)}>I Want This Style <span>→</span></button></div></div></div>}
  {inquiry!==null&&<InquiryModal key={inquiry} onClose={closeInquiry} selectedTemplate={inquiry}/>}
 </main>;
}
