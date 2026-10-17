import React from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import './contact.css';

const services=['Not sure yet','Restaurant Websites','Digital Menus','Social Media','Google Business','Several Services'];
const countries=['Qatar','Bahrain','Kuwait','Saudi Arabia','United Arab Emirates','Oman','Other'];
const plans={foundation:'The First Course',growth:'The Main Course',partner:'The Full Sufra',custom:'Custom package'};
function initialForm(plan){return {restaurant:'',name:'',email:'',phone:'',country:'Qatar',interest:'Not sure yet',plan:plans[plan]||'Not sure yet',message:'',website:''};}
export default function Contact(){
 const [params]=useSearchParams();
 const selectedPlan=params.get('plan')||'';
 const [form,setForm]=React.useState(()=>initialForm(selectedPlan));
 const [status,setStatus]=React.useState('idle');
 const [error,setError]=React.useState('');
 React.useEffect(()=>{if(plans[selectedPlan])setForm(f=>({...f,plan:plans[selectedPlan]}));},[selectedPlan]);
 const change=e=>{const {name,value}=e.target;setForm(f=>({...f,[name]:value}));if(error)setError('');};
 async function submit(e){
  e.preventDefault();
  if(!form.email.trim()&&!form.phone.trim()){setError('Please add your email or WhatsApp number so we can reply.');return;}
  setStatus('sending');setError('');
  const service = form.interest==='Several Services'||form.interest==='Not sure yet' ? (form.plan==='Not sure yet'?'General Inquiry':'Package Consultation') : form.interest;
  const notes=[form.plan!=='Not sure yet'?`Preferred package: ${form.plan}`:null,form.interest!=='Not sure yet'?`Interested in: ${form.interest}`:null,form.message].filter(Boolean).join('\n');
  const payload={restaurant:form.restaurant,name:form.name,email:form.email,phone:form.phone,country:form.country,service,template:'Not sure yet',details:notes,website:form.website};
  try{
   const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const result=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(result.error||'We could not send your message. Please try again.');
   setStatus('sent');
  }catch(err){setError(err.message||'Please try again later.');setStatus('idle');}
 }
 return <main className="gsc-page">
  <section className="gsc-hero" aria-labelledby="gsc-title">
   <div className="gsc-shell gsc-hero-grid">
    <div className="gsc-copy">
     <span className="gsc-kicker">✦ SAY AHLAN TO GULFSUFRA</span>
     <h1 id="gsc-title">Let's Talk<br/><em>Restaurant.</em><br/>We’re All Ears.</h1>
     <p>Building something new? Want to refresh your restaurant’s digital presence? Tell us what’s on your mind. No complicated forms, no confusing jargon.</p>
     <div className="gsc-reach"><span className="gsc-reach-icon" aria-hidden="true">✉</span><div><small>DROP US A LINE</small><a href="mailto:yalla@gulfsufri.com">yalla@gulfsufri.com</a></div></div>
     <p className="gsc-note">Serving restaurant ideas across Qatar, Bahrain, Kuwait, and beyond. <span aria-hidden="true">✦</span></p>
     <div className="gsc-sufri"><img src="/assets/sufri-presenting.webp" alt="Sufri welcoming restaurant owners"/><span>“Tell me about your restaurant, habibi!”</span></div>
    </div>
    <section className="gsc-card" id="gsc-form" aria-labelledby="gsc-form-title">
     {status==='sent' ? <div className="gsc-success" role="status"><span className="gsc-kicker">MESSAGE SENT ✦</span><h2>Yalla! We've got your message.</h2><p>Thanks for reaching out. We'll reply using the contact details you shared.</p><Link className="gsc-btn gsc-btn-gold" to="/services">Explore Our Services <span aria-hidden="true">→</span></Link></div> : <>
     <div className="gsc-form-head"><span className="gsc-kicker">YOUR NEXT CHAPTER STARTS HERE</span><h2 id="gsc-form-title">Tell Us Your <em>Big Idea.</em></h2><p>Just a few details and we'll know where to start.</p></div>
     <form onSubmit={submit} className="gsc-form">
      <div className="gsc-field-pair"><label>Your name <b>*</b><input name="name" value={form.name} onChange={change} autoComplete="name" placeholder="Your name" maxLength="120" required/></label><label>Restaurant name <b>*</b><input name="restaurant" value={form.restaurant} onChange={change} placeholder="Your restaurant" maxLength="120" required/></label></div>
      <div className="gsc-field-pair"><label>Email address<input name="email" type="email" value={form.email} onChange={change} autoComplete="email" placeholder="you@example.com" maxLength="200"/></label><label>WhatsApp / phone<input type="tel" name="phone" value={form.phone} onChange={change} autoComplete="tel" placeholder="+974 ..." maxLength="35"/></label></div>
      <div className="gsc-field-pair"><label>Country<select name="country" value={form.country} onChange={change}>{countries.map(s=><option key={s}>{s}</option>)}</select></label><label>What do you need?<select name="interest" value={form.interest} onChange={change}>{services.map(s=><option key={s}>{s}</option>)}</select></label></div>
      <label>Package or starting point<select name="plan" value={form.plan} onChange={change}><option>Not sure yet</option>{Object.values(plans).map(s=><option key={s}>{s}</option>)}</select></label>
      <label>Tell us a little more<textarea name="message" value={form.message} onChange={change} placeholder="What would you like us to create? What do you want to improve?" maxLength="1700" rows="4"/></label>
      <label className="gsc-honeypot" aria-hidden="true">Leave this blank<input name="website" value={form.website} onChange={change} tabIndex={-1} autoComplete="off"/></label>
      {error&&<div className="gsc-error" role="alert">{error} <a href="mailto:yalla@gulfsufri.com?subject=GulfSufra%20Inquiry">Email us instead ↗</a></div>}
      <div className="gsc-form-bottom"><button className="gsc-btn gsc-btn-gold" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send My Inquiry'} <span aria-hidden="true">→</span></button><small>We'll only use your details to reply to your inquiry.</small></div>
     </form></>}
    </section>
   </div>
  </section>
  <div className="gsc-body">
   <section className="gsc-shell gsc-next" aria-labelledby="gsc-next-title"><div><span className="gsc-kicker">WHAT HAPPENS NEXT?</span><h2 id="gsc-next-title">A Simple Hello.<br/><em>A Clear Way Forward.</em></h2><p>Whether you know exactly what you want or you're still figuring it out, we can start with a conversation.</p></div><div className="gsc-next-steps"><article><span>01</span><h3>Tell us your story</h3><p>Share your restaurant, goals, and what you're hoping to change.</p></article><article><span>02</span><h3>Let's shape the plan</h3><p>We discuss what makes sense and what the work could include.</p></article><article><span>03</span><h3>Decide together</h3><p>Review the agreed scope and next steps before we begin.</p></article></div></section>
   <section className="gsc-shell gsc-help" aria-labelledby="gsc-help-title"><div><span className="gsc-kicker">NOT SURE WHERE TO START?</span><h2 id="gsc-help-title">We've Got <em>Options.</em></h2><p>Explore what we can make for your restaurant, or see our suggested packages.</p></div><div className="gsc-help-actions"><Link to="/services" className="gsc-btn gsc-btn-gold">Explore Services <span aria-hidden="true">→</span></Link><Link to="/pricing" className="gsc-btn gsc-btn-outline">View Pricing <span aria-hidden="true">↗</span></Link></div></section>
  </div>
 </main>;
}
