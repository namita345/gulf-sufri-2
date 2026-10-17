import React from 'react';
import './google-business.css';

const ASSETS='/assets/';
const countries=['Qatar','Bahrain','Kuwait','Saudi Arabia','United Arab Emirates','Oman','Other'];
const benefits=[
  {n:'01',icon:'pin',title:'A Profile Worth Finding',desc:'Set up or refresh your restaurant’s Google Business Profile with the essentials that help people recognize your business.'},
  {n:'02',icon:'clock',title:'Details Diners Can Trust',desc:'Keep your location, hours, phone, website, menu and dining options organized and accurate.'},
  {n:'03',icon:'camera',title:'Photos That Tell Your Story',desc:'Showcase the dishes and atmosphere that make your place special, with thoughtful profile photos and updates.'},
  {n:'04',icon:'star',title:'Reviews & Reputation',desc:'Build a thoughtful approach to authentic guest feedback and professional review responses.'}
];
const details=[
  {key:'details',heading:'The essentials, beautifully in place.',tag:'01 / PROFILE DETAILS',body:'Restaurant name, category, opening hours, contact details, website, menus and useful attributes — checked for clarity and consistency.',items:['Business information','Menu and booking links','Relevant dining attributes']},
  {key:'photos',heading:'Let the food do the talking.',tag:'02 / PHOTOS & UPDATES',body:'Restaurant imagery and timely updates give guests a better sense of what awaits them before they visit.',items:['Atmosphere and food photos','Fresh announcements','A profile that feels current']},
  {key:'reputation',heading:'Make every conversation count.',tag:'03 / GUEST TRUST',body:'Thoughtful review responses can show future guests that your restaurant listens and cares. Reviews must always be authentic.',items:['Review response guidance','Reputation best practices','Honest, guest-first communication']}
];
const steps=[
  {n:'01',title:'We Explore',desc:'Tell us about your restaurant and share your current Google listing, if you have one.'},
  {n:'02',title:'We Refine',desc:'We review the profile, organize the details and prepare your photos, information and updates.'},
  {n:'03',title:'You Stay Discoverable',desc:'Keep information fresh with a clear plan for updates and genuine guest engagement.'}
];
const questions=[
  ['Do I need an existing Google Business Profile?', 'No. We can discuss setting up a new eligible profile or improving the one you already manage. Google may require verification before the profile can go live.'],
  ['Will you guarantee a number-one Google ranking?', 'No. Google determines local search rankings. We focus on useful, accurate business information and sound profile management, not ranking promises.'],
  ['Can you help with reviews?', 'We can help you plan courteous, professional replies and encourage genuine feedback appropriately. We never create or buy fake reviews.'],
  ['Can I update my menu and opening hours later?', 'Yes. Google Business Profile supports changes to many business details, subject to Google’s review and eligibility rules. We can discuss ongoing help with updates.']
];
function Icon({name,size=26}){
  const common={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true};
  if(name==='pin')return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if(name==='clock')return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>;
  if(name==='camera')return <svg {...common}><rect x="2.5" y="6" width="19" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M7 6 8.5 3.8h7L17 6"/></svg>;
  if(name==='star')return <svg {...common}><path d="m12 2 2.8 6.5 7 .7-5.3 4.8 1.5 7-6-3.6-6 3.6 1.5-7-5.3-4.8 7-.7z"/></svg>;
  if(name==='check')return <svg {...common}><path d="m4 12 5 5L20 6"/></svg>;
  if(name==='arrow')return <svg {...common}><path d="M4 12h16m-6-6 6 6-6 6"/></svg>;
  return null;
}
function Dialog({children,onClose,title}){
  const ref=React.useRef(null);
  React.useEffect(()=>{
    const last=document.activeElement, prior=document.body.style.overflow;
    document.body.style.overflow='hidden';ref.current?.focus();
    const keys=e=>{
      if(e.key==='Escape')onClose();
      if(e.key!=='Tab'||!ref.current)return;
      const els=[...ref.current.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href]')];
      if(!els.length)return;
      if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus()}
      else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus()}
    };
    document.addEventListener('keydown',keys);
    return()=>{document.body.style.overflow=prior;document.removeEventListener('keydown',keys);last?.focus?.()};
  },[onClose]);
  return <div className="gmb-dialog-shade" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="gmb-dialog"><button type="button" className="gmb-dialog-close" aria-label="Close inquiry" onClick={onClose}>×</button>{children}</section></div>
}
function Inquiry({onClose}){
  const [data,setData]=React.useState({restaurant:'',name:'',email:'',phone:'',country:'Qatar',profile:'I already have a listing',details:'',website:''});
  const [status,setStatus]=React.useState('idle'),[error,setError]=React.useState('');
  const change=e=>setData(p=>({...p,[e.target.name]:e.target.value}));
  const submit=async e=>{
    e.preventDefault();setError('');
    if(!data.email.trim()&&!data.phone.trim()){setError('Please add an email or WhatsApp number.');return;}
    setStatus('sending');
    try{
      const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({restaurant:data.restaurant,name:data.name,email:data.email,phone:data.phone,country:data.country,service:'Google Business',template:'Not sure yet',details:`Google listing: ${data.profile}\n${data.details}`,website:data.website})});
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.error||'Unable to send your inquiry.');
      setStatus('sent');
    }catch(err){setError(err.message||'Please try again.');setStatus('idle')}
  };
  return <Dialog title="Google Business inquiry" onClose={onClose}>
    {status==='sent'?<div className="gmb-sent"><span className="gmb-eyebrow">MESSAGE RECEIVED</span><h2>Well, look who’s on the map!</h2><p>Thanks for reaching out. We'll reply using the contact details you provided.</p><button className="gmb-button gmb-gold" type="button" onClick={onClose}>Back to Mummo <Icon name="arrow" size={18}/></button></div>:<>
      <span className="gmb-eyebrow">LET'S GET YOU FOUND</span><h2>Tell Mummo about your restaurant.</h2><p className="gmb-form-quip">“I've waited centuries to meet you. Let's not keep your customers waiting, too.”</p>
      <form className="gmb-form" onSubmit={submit}>
        <div className="gmb-form-pair"><label>Restaurant name *<input required name="restaurant" maxLength={120} value={data.restaurant} onChange={change} placeholder="Your restaurant"/></label><label>Your name *<input required name="name" maxLength={120} value={data.name} onChange={change} placeholder="Your name"/></label></div>
        <div className="gmb-form-pair"><label>Email<input name="email" type="email" maxLength={200} value={data.email} onChange={change} placeholder="you@example.com"/></label><label>WhatsApp number<input name="phone" type="tel" maxLength={35} value={data.phone} onChange={change} placeholder="+974 ..."/></label></div>
        <div className="gmb-form-pair"><label>Country<select name="country" value={data.country} onChange={change}>{countries.map(v=><option key={v}>{v}</option>)}</select></label><label>Google listing status<select name="profile" value={data.profile} onChange={change}><option>I already have a listing</option><option>I need a new profile</option><option>I'm not sure</option></select></label></div>
        <label>What would you like help with?<textarea rows={3} name="details" maxLength={1800} value={data.details} onChange={change} placeholder="Profile URL, opening hours, photos, reviews, or other goals..."/></label>
        <label className="gmb-honeypot" aria-hidden="true">Leave this blank<input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={change}/></label>
        {error&&<p className="gmb-form-error" role="alert">{error} <a href="mailto:yalla@gulfsufri.com?subject=Google%20Business%20Inquiry">Email us instead</a></p>}
        <button type="submit" disabled={status==='sending'} className="gmb-button gmb-gold gmb-submit">{status==='sending'?'Sending…':'Send My Inquiry'} <Icon name="arrow" size={18}/></button>
        <small>We only use these details to respond to your request.</small>
      </form>
    </>}
  </Dialog>
}
export default function GoogleBusiness(){
  const [inquiry,setInquiry]=React.useState(false);
  const [detail,setDetail]=React.useState(0);
  const [faq,setFaq]=React.useState(-1);
  const close=React.useCallback(()=>setInquiry(false),[]);
  return <main className="gmb-page">
    <section className="gmb-hero" aria-labelledby="gmb-title">
      <div className="gmb-shell gmb-hero-grid">
        <div className="gmb-hero-copy">
          <span className="gmb-pill">✦ GULFSUFRA GOOGLE BUSINESS</span>
          <h1 id="gmb-title">Hungry Guests<br/>Are Searching.<br/><em>Be the One<br/>They Find.</em></h1>
          <p>A beautiful restaurant deserves to be discovered. We help you create a clearer, more complete Google Business Profile so nearby diners can find your details and get to know your place.</p>
          <div className="gmb-actions"><button type="button" className="gmb-button gmb-gold" onClick={()=>setInquiry(true)}>Get Found on Google <Icon name="arrow" size={18}/></button><a href="#gmb-profile" className="gmb-button gmb-ghost">See What We Improve <span aria-hidden="true">↗</span></a></div>
          <div className="gmb-trust"><span><Icon name="check" size={16}/> Profile essentials</span><span><Icon name="check" size={16}/> Restaurant-focused</span><span><Icon name="check" size={16}/> Gulf markets</span></div>
        </div>
        <div className="gmb-hero-visual" aria-label="Mummo presents a sample restaurant Google Business listing">
          <div className="gmb-hero-glow" aria-hidden="true"/>
          <div className="gmb-hero-mock"><img src={ASSETS+'google-business-new.webp'} alt="Illustrative Google Business Profile example displayed on laptop and phone" width="1640" height="1024" fetchPriority="high"/></div>
          <small className="gmb-hero-illustrative">Illustrative profile concept</small>
          <img className="gmb-mummo" src={ASSETS+'mummo-services.png'} alt="Mummo, GulfSufra's cheerful mummy guide" width="1270" height="1215" fetchPriority="high"/>
          <div className="gmb-speech">“I've been around for centuries. Your restaurant shouldn't be hard to find!” <span>✦</span></div>
        </div>
      </div>
    </section>

    <div className="gmb-sections">
      <section className="gmb-shell gmb-panel" aria-labelledby="gmb-benefits-title">
        <div className="gmb-heading"><div><span className="gmb-eyebrow">BE SEEN FOR THE RIGHT REASONS</span><h2 id="gmb-benefits-title">A Better Profile.<br/><em>A Better First Impression.</em></h2></div><p>Before guests walk through your doors, your listing often introduces your restaurant. Let's make that introduction count.</p></div>
        <div className="gmb-benefits">{benefits.map(b=><article className="gmb-benefit" key={b.n}><div className="gmb-benefit-top"><span>{b.n}</span><i><Icon name={b.icon} size={27}/></i></div><h3>{b.title}</h3><p>{b.desc}</p></article>)}</div>
      </section>

      <section className="gmb-shell gmb-profile" id="gmb-profile" aria-labelledby="gmb-profile-title">
        <div className="gmb-heading gmb-profile-heading"><div><span className="gmb-eyebrow">THAT FIRST GOOGLE IMPRESSION</span><h2 id="gmb-profile-title">From a Search<br/><em>to Your Table.</em></h2></div><p>When someone discovers your restaurant, it's the small details that make the next step easy.</p></div>
        <div className="gmb-profile-display"><div className="gmb-profile-art"><img src={ASSETS+'google-business-new.webp'} alt="Illustrative restaurant Google listing displayed on desktop and mobile" loading="lazy"/><span>Sample concept · not a client listing</span></div><div className="gmb-profile-info"><span className="gmb-mini-label">WHAT WE PAY ATTENTION TO</span><div className="gmb-detail-tabs" role="tablist" aria-label="Profile focus areas">{details.map((d,i)=><button key={d.key} type="button" role="tab" aria-selected={detail===i} className={detail===i?'is-active':''} onClick={()=>setDetail(i)}>{['Details','Photos','Reputation'][i]}</button>)}</div><div className="gmb-detail-content" role="tabpanel"><small>{details[detail].tag}</small><h3>{details[detail].heading}</h3><p>{details[detail].body}</p><ul>{details[detail].items.map(item=><li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul></div><button className="gmb-text-cta" type="button" onClick={()=>setInquiry(true)}>Let's improve my listing <Icon name="arrow" size={17}/></button></div></div>
      </section>

      <section className="gmb-shell gmb-reasons gmb-panel" aria-labelledby="gmb-reasons-title"><div className="gmb-reasons-text"><span className="gmb-eyebrow">MORE THAN A MAP PIN</span><h2 id="gmb-reasons-title">Your Story Deserves<br/><em>to Show Up.</em></h2><p>Someone is searching for dinner, a family celebration or their next favourite spot. Clear business details, fresh photos and an authentic profile help them decide whether your place is right for them.</p><div className="gmb-reasons-pills"><span>Menus</span><span>Opening hours</span><span>Photos</span><span>Directions</span><span>Guest reviews</span></div></div><div className="gmb-reasons-visual"><div className="gmb-reasons-caption">A strong restaurant profile brings your information together.</div><img src={ASSETS+'google-business-mockup.webp'} alt="Illustrative Google restaurant profile example with food, map and restaurant information" loading="lazy"/></div></section>

      <section className="gmb-shell gmb-process" aria-labelledby="gmb-process-title"><div className="gmb-heading"><div><span className="gmb-eyebrow">MUMMO MAKES IT SIMPLE</span><h2 id="gmb-process-title">Three Steps.<br/><em>No Ancient Mystery.</em></h2></div><p>From your first hello to an organized Google Business Profile, we've kept the process straightforward.</p></div><div className="gmb-process-grid">{steps.map(s=><article key={s.n}><span className="gmb-step-number">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></article>)}</div></section>

      <section className="gmb-shell gmb-faq" aria-labelledby="gmb-faq-title"><div className="gmb-faq-intro"><span className="gmb-eyebrow">A FEW GOOD QUESTIONS</span><h2 id="gmb-faq-title">Answers Worth<br/><em>Unwrapping.</em></h2><p>All the practical details, without the ancient riddles.</p></div><div className="gmb-faq-list">{questions.map(([q,a],i)=><div className="gmb-faq-item" key={q}><button type="button" aria-expanded={faq===i} onClick={()=>setFaq(faq===i?-1:i)}>{q}<span aria-hidden="true">{faq===i?'−':'+'}</span></button>{faq===i&&<p>{a}</p>}</div>)}</div></section>

      <section className="gmb-shell gmb-final" aria-labelledby="gmb-final-title"><div className="gmb-final-copy"><span className="gmb-eyebrow">READY TO BE DISCOVERED?</span><h2 id="gmb-final-title">Put Your Restaurant<br/><em>On the Map.</em></h2><p>We'll help your Google listing look as inviting as your restaurant. Tell us what you're working with, and we'll take it from there.</p><button type="button" className="gmb-button gmb-gold" onClick={()=>setInquiry(true)}>Let's Get Found <Icon name="arrow" size={18}/></button></div><img src={ASSETS+'mummo-services.png'} alt="Mummo cheering you on" loading="lazy"/><div className="gmb-final-speech">“A little visibility goes a long way, habibi!”</div></section>
    </div>
    {inquiry&&<Inquiry onClose={close}/>}
  </main>;
}
