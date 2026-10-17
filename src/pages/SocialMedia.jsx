import React from 'react';
import './social-media.css';

const A = '/assets/';
const countries = ['Qatar', 'Bahrain', 'Kuwait', 'Saudi Arabia', 'United Arab Emirates', 'Oman', 'Other'];
const services = [
  {number:'01',symbol:'✦',title:'Content That Makes Them Hungry',description:'Thoughtful post designs, irresistible food features and visuals that look unmistakably yours.'},
  {number:'02',symbol:'▷',title:'Reels & Stories',description:'Short-form creative concepts and stories that bring your restaurant’s everyday moments to life.'},
  {number:'03',symbol:'▦',title:'Captions & Content Planning',description:'A clear posting calendar with engaging words, local relevance and less last-minute scrambling.'},
  {number:'04',symbol:'♡',title:'A Consistent Brand Presence',description:'A beautiful, recognizable feed across the social channels your diners already use.'},
];
const showcase = [
  {title:'The Signature Dish',type:'Food-first content',image:'gsm-sample-1.webp',description:'Make the food the main event.'},
  {title:'The Restaurant Story',type:'Atmosphere & storytelling',image:'gsm-sample-2.webp',description:'Help guests picture their next visit.'},
  {title:'The Fresh Moment',type:'Seasonal promotions',image:'gsm-sample-3.webp',description:'Give them something worth saving.'},
];

function Modal({children,title,onClose}) {
  const dialog=React.useRef(null);
  React.useEffect(()=>{
    const prior=document.activeElement,overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';dialog.current?.focus();
    const onKey=e=>{
      if(e.key==='Escape')onClose();
      if(e.key!=='Tab')return;
      const els=[...dialog.current.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled])')];
      if(!els.length)return;
      if(e.shiftKey && document.activeElement===els[0]){e.preventDefault();els.at(-1).focus();}
      else if(!e.shiftKey && document.activeElement===els.at(-1)){e.preventDefault();els[0].focus();}
    };
    document.addEventListener('keydown',onKey);
    return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=overflow;prior?.focus?.();};
  },[onClose]);
  return <div className="gsm-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <section role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={dialog} className="gsm-modal">
      <button className="gsm-modal-close" type="button" aria-label="Close" onClick={onClose}>×</button>{children}
    </section>
  </div>;
}

function SocialInquiry({onClose}) {
  const [data,setData] = React.useState({restaurant:'',name:'',email:'',phone:'',country:'Qatar',platform:'Instagram',details:'',website:''});
  const [sending,setSending]=React.useState(false),[finished,setFinished]=React.useState(false),[error,setError]=React.useState('');
  const change=e=>setData(v=>({...v,[e.target.name]:e.target.value}));
  const send=async(e)=>{
    e.preventDefault();setError('');
    if(!data.email.trim()&&!data.phone.trim()){setError('Please add your email or WhatsApp number.');return;}
    setSending(true);
    try{
      const response=await fetch('/api/inquiry',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({restaurant:data.restaurant,name:data.name,email:data.email,phone:data.phone,country:data.country,
          template:'Not sure yet',service:'Social Media',details:`Platform: ${data.platform}\n${data.details}`,website:data.website})
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.error||'Please try again.');
      setFinished(true);
    }catch(err){setError(err.message||'We couldn’t send that request.');}
    finally{setSending(false);}
  };
  return <Modal title="Social media inquiry" onClose={onClose}>
    {finished ? <div className="gsm-modal-success">
      <span className="gsm-label">MESSAGE RECEIVED</span><h2>Let’s make some waves.</h2>
      <p>Thank you for telling us about your restaurant. We’ll be in touch using the details you shared.</p>
      <button className="gsm-btn gsm-btn-gold" type="button" onClick={onClose}>Back to Marina <span>→</span></button>
    </div> : <>
      <span className="gsm-label">YOUR STORY STARTS HERE</span><h2>Tell Marina about your restaurant.</h2>
      <p className="gsm-form-intro">“A beautiful feed starts with a delicious little introduction.”</p>
      <form className="gsm-form" onSubmit={send}>
        <div className="gsm-fields"><label>Restaurant name *<input required maxLength={120} name="restaurant" value={data.restaurant} onChange={change} placeholder="Your restaurant"/></label>
        <label>Your name *<input required maxLength={120} name="name" value={data.name} onChange={change} placeholder="Your name"/></label></div>
        <div className="gsm-fields"><label>Email<input type="email" name="email" maxLength={200} value={data.email} onChange={change} placeholder="you@example.com"/></label>
        <label>WhatsApp number<input type="tel" name="phone" maxLength={35} value={data.phone} onChange={change} placeholder="+974 ..."/></label></div>
        <div className="gsm-fields"><label>Country<select name="country" value={data.country} onChange={change}>{countries.map(c=><option key={c}>{c}</option>)}</select></label>
        <label>Main platform<select name="platform" value={data.platform} onChange={change}>{['Instagram','Facebook','TikTok','Multiple platforms','Not sure yet'].map(v=><option key={v}>{v}</option>)}</select></label></div>
        <label>What would you like help with?<textarea rows={3} name="details" maxLength={1800} value={data.details} onChange={change} placeholder="Content creation, reels, brand consistency, upcoming promotions..."/></label>
        <label className="gsm-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} value={data.website} onChange={change} autoComplete="off"/></label>
        {error&&<p role="alert" className="gsm-error">{error} <a href="mailto:yalla@gulfsufri.com?subject=Social%20Media%20Inquiry">Email us instead</a></p>}
        <button type="submit" className="gsm-btn gsm-btn-gold gsm-submit" disabled={sending}>{sending?'Sending…':'Send My Inquiry'} <span>→</span></button>
        <small>We’ll only use this information to respond to your inquiry.</small>
      </form>
    </>}
  </Modal>;
}

export default function SocialMedia(){
  const [inquiry,setInquiry]=React.useState(false);
  const [preview,setPreview]=React.useState(null);
  const closeInquiry=React.useCallback(()=>setInquiry(false),[]);
  const closePreview=React.useCallback(()=>setPreview(null),[]);
  return <main className="gsm-page">
    <section className="gsm-hero" aria-labelledby="gsm-title">
      <div className="gsm-shell gsm-hero-grid">
        <div className="gsm-hero-content">
          <span className="gsm-pill">✦ &nbsp; GULFSUFRA SOCIAL MEDIA</span>
          <h1 id="gsm-title">Your Food Deserves<br/><em>More Than</em><br/>a Quick Scroll.</h1>
          <p>From scroll-stopping posts to stories worth sharing, we create social content that captures your food, your atmosphere and the people behind it.</p>
          <div className="gsm-hero-actions"><button type="button" className="gsm-btn gsm-btn-gold" onClick={()=>setInquiry(true)}>Let's Make Waves <span>→</span></button><a href="#gsm-showcase" className="gsm-btn gsm-btn-outline">Explore Our Creative <span>↗</span></a></div>
          <div className="gsm-hero-platforms"><span>Made for restaurants across the Gulf</span><div><b>Instagram</b><i/> <b>Facebook</b><i/> <b>TikTok</b></div></div>
        </div>
        <div className="gsm-hero-art">
          <div className="gsm-post-peek gsm-post-back"><img src={A+'gsm-sample-2.webp'} alt="Example Gulf-inspired restaurant social-media post"/></div>
          <div className="gsm-post-peek gsm-post-front"><img src={A+'gsm-sample-1.webp'} alt="Example food-focused restaurant social-media creative"/></div>
          <img className="gsm-marina" src={A+'marina-services.png'} alt="Marina, GulfSufra's cheerful mermaid social-media guide" width={1327} height={1125} fetchPriority="high"/>
          <div className="gsm-marina-bubble">“Darling, your food is fabulous. Let's make sure everyone sees it!” <span>✦</span></div>
          <span className="gsm-art-spark" aria-hidden="true">✧</span>
        </div>
      </div>
    </section>

    <div className="gsm-sections">
      <section className="gsm-shell gsm-panel gsm-services" aria-labelledby="gsm-services-title">
        <div className="gsm-section-top"><div><span className="gsm-label">WHAT WE CREATE</span><h2 id="gsm-services-title">Beautiful Content.<br/><em>Real Restaurant Stories.</em></h2></div><p>Your restaurant has its own flavor. Your social presence should, too. Here’s how we bring your brand to the feed.</p></div>
        <div className="gsm-service-grid">{services.map(s=><article key={s.number} className="gsm-service-card"><div className="gsm-service-meta"><span>{s.number}</span><span className="gsm-service-symbol" aria-hidden="true">{s.symbol}</span></div><h3>{s.title}</h3><p>{s.description}</p></article>)}</div>
      </section>

      <section className="gsm-shell gsm-showcase" id="gsm-showcase" aria-labelledby="gsm-showcase-title">
        <div className="gsm-section-top"><div><span className="gsm-label">A LITTLE LOOK AT THE MAGIC</span><h2 id="gsm-showcase-title">Made to Stop<br/><em>the Scroll.</em></h2></div><p>Three ways great food can tell a story. Each example can be adapted to match your restaurant's personality.</p></div>
        <div className="gsm-showcase-grid">{showcase.map((item,i)=><article className="gsm-showcase-card" key={item.title}>
          <button type="button" className="gsm-showcase-image" aria-label={'Preview '+item.title} onClick={()=>setPreview(item)}><img src={A+item.image} alt={`${item.title} — illustrative restaurant social-media post`} loading="lazy"/><span>View Creative ↗</span></button>
          <div className="gsm-showcase-caption"><span>0{i+1} / {item.type}</span><h3>{item.title}</h3><p>{item.description}</p></div>
        </article>)}</div>
        <p className="gsm-demo-note">Illustrative creative concepts, not examples of completed client campaigns or verified engagement results.</p>
      </section>

      <section className="gsm-shell gsm-panel gsm-profile" aria-labelledby="gsm-profile-title"><div className="gsm-profile-copy"><span className="gsm-label">IT'S MORE THAN ONE PRETTY POST</span><h2 id="gsm-profile-title">A Feed That Feels<br/><em>Like Your Restaurant.</em></h2><p>Beautiful content is even better when everything feels connected. From your profile to your promotions, we bring your restaurant's look and voice together.</p><ul><li>Consistent colors, graphics and tone</li><li>Food photography and menu highlights</li><li>Seasonal promotions, launches and special moments</li><li>A recognizable look across social platforms</li></ul><button type="button" className="gsm-btn gsm-btn-gold" onClick={()=>setInquiry(true)}>Build My Social Presence <span>→</span></button></div>
        <div className="gsm-profile-visual"><img src={A+'social-mockup.webp'} alt="Illustrative restaurant Instagram profile with cohesive branded food posts" loading="lazy"/></div></section>

      <section className="gsm-shell gsm-panel gsm-process" id="gsm-process" aria-labelledby="gsm-process-title"><div className="gsm-process-head"><span className="gsm-label">EASY AS ONE, TWO, SEA</span><h2 id="gsm-process-title">How Marina<br/><em>Makes Waves.</em></h2><p>No complicated treasure maps here. Just a simple plan for beautiful, consistent content.</p></div>
        <div className="gsm-process-steps"><article><span>01</span><h3>Share Your Story</h3><p>We get to know your food, audience, brand and goals.</p></article><article><span>02</span><h3>We Create the Content</h3><p>We plan the creative direction, post designs and captions with you.</p></article><article><span>03</span><h3>Your Brand Shows Up</h3><p>With an agreed content plan, your restaurant stays present and recognizable.</p></article></div>
      </section>

      <section className="gsm-shell gsm-final" aria-labelledby="gsm-final-title"><div className="gsm-final-copy"><span className="gsm-label">READY TO MAKE A SPLASH?</span><h2 id="gsm-final-title">Let's Give Your Restaurant<br/><em>Something to Talk About.</em></h2><p>Your best dishes deserve more than a passing glance. Tell us about your restaurant and let’s make a feed worth following.</p><button type="button" className="gsm-btn gsm-btn-gold" onClick={()=>setInquiry(true)}>Get Started With Marina <span>→</span></button></div>
        <img src={A+'marina-services.png'} alt="Marina invites restaurants to grow their social presence" loading="lazy"/><div className="gsm-final-bubble">“Come on, darling. Let's make a splash!” ✦</div>
      </section>
    </div>
    {preview&&<Modal title={`${preview.title} creative preview`} onClose={closePreview}><div className="gsm-preview"><span className="gsm-label">ILLUSTRATIVE CONCEPT</span><h2>{preview.title}</h2><img src={A+preview.image} alt={preview.title}/><p>{preview.description} Each concept is adapted to your restaurant’s unique look and story.</p><button type="button" className="gsm-btn gsm-btn-gold" onClick={()=>{setPreview(null);setInquiry(true)}}>Create Content Like This <span>→</span></button></div></Modal>}
    {inquiry&&<SocialInquiry onClose={closeInquiry}/>}
  </main>;
}
