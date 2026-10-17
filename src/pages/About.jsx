import React from 'react';
import {Link} from 'react-router-dom';
import './about.css';

const A='/assets/';
const characters=[
  {name:'Jinni',personality:'The creative genie',service:'Restaurant Websites',copy:'Beautiful restaurant websites with a little attitude and a lot of attention to detail.',asset:'jinni-services.png',url:'/services/restaurant-websites',note:'Consider it granted.',theme:'jinni'},
  {name:'Tabikh',personality:'The wise old storyteller',service:'Digital Menus',copy:'An easier way to present delicious dishes, update menus and delight your guests.',asset:'tabikh-services.png',url:'/services/digital-menus',note:'A fine menu has a story.',theme:'tabikh'},
  {name:'Marina',personality:'The social spark',service:'Social Media',copy:'Thoughtful visuals and engaging content that show the personality behind the plate.',asset:'marina-services.png',url:'/services/social-media',note:'Make some waves.',theme:'marina'},
  {name:'Mummo',personality:'The timeless local guide',service:'Google Business',copy:'A clearer online presence so hungry guests can find the important details.',asset:'mummo-services.png',url:'/services/google-business',note:'Let them find you.',theme:'mummo'}
];
const beliefs=[
  {n:'01',title:'Restaurant first.',description:'We start with the guest experience, the menu, the atmosphere, and the people behind your restaurant.'},
  {n:'02',title:'Beautiful and useful.',description:'Pretty is good. Pretty that loads quickly, reads clearly and helps diners take action is even better.'},
  {n:'03',title:'No complicated talk.',description:'You should always know what we are creating, why it matters, and what happens next.'}
];
const steps=[
  {num:'01',title:'We listen',text:'Tell us about your restaurant, your goals, and what feels missing from your online presence.'},
  {num:'02',title:'We make it yours',text:'We plan and create the right digital experience around your identity—not a one-size-fits-all template.'},
  {num:'03',title:'We help you launch',text:'We prepare the deliverables, get you ready to go live, and discuss the support your restaurant needs.'}
];

export default function About(){
 return <main className="gsa-page">
  <section className="gsa-hero" aria-labelledby="gsa-title">
   <div className="gsa-hero-scene" aria-hidden="true"/>
   <div className="gsa-wrap gsa-hero-layout">
    <div className="gsa-hero-copy">
     <span className="gsa-eyebrow gsa-hero-eyebrow"><span aria-hidden="true">✦</span> A LITTLE ABOUT GULFSUFRA</span>
     <h1 id="gsa-title">We Speak<br/><em>Restaurant.</em><br/>And Digital, Too.</h1>
     <p>Great food deserves a great first impression—online and off. We're a restaurant-focused digital agency making websites, menus, social media and Google presence feel a whole lot easier.</p>
     <div className="gsa-hero-actions">
      <Link className="gsa-btn gsa-btn-gold" to="/services">Explore Our Services <span aria-hidden="true">→</span></Link>
      <a className="gsa-btn gsa-btn-outline" href="#gsa-story">Get to Know Us <span aria-hidden="true">↗</span></a>
     </div>
     <div className="gsa-hero-foot"><span className="gsa-foot-spark">✦</span> Built for the restaurant world. Inspired by the Gulf.</div>
    </div>
    <div className="gsa-hero-visual" aria-label="Sufri, GulfSufra's cheerful mascot, welcoming restaurant owners">
      <div className="gsa-hero-window" aria-hidden="true"/>
      <img src={A+'sufri-presenting.webp'} alt="Sufri on his emerald-and-gold magic carpet" width="1210" height="920" fetchPriority="high"/>
      <div className="gsa-hero-bubble">“Ahlan, habibi! You handle the flavour. We handle the digital.” <span aria-hidden="true">✦</span></div>
    </div>
   </div>
  </section>

  <div className="gsa-page-body">
   <section className="gsa-wrap gsa-intro" id="gsa-story" aria-labelledby="gsa-story-title">
    <div className="gsa-intro-image"><img src={A+'services-golden-terrace.webp'} alt="Golden-hour Arabian Gulf restaurant terrace" loading="lazy"/><div className="gsa-image-note">GOOD FOOD. GREAT CONNECTIONS. <span>✦</span></div></div>
    <div className="gsa-intro-copy"><span className="gsa-eyebrow">WHY WE EXIST</span><h2 id="gsa-story-title">Restaurants make memories.<br/><em>We make them easier to find.</em></h2><p>Your restaurant is more than tables and a menu. It's the smell of something delicious, the warm welcome at the door, and the little moments guests remember.</p><p>We believe that feeling should carry through every digital touchpoint—from the first Google search to the menu someone opens at their table.</p><div className="gsa-intro-signoff"><span aria-hidden="true">✳</span> Your story should still feel like <strong>your</strong> story.</div></div>
   </section>

   <section className="gsa-wrap gsa-values gsa-panel" aria-labelledby="gsa-values-title">
    <div className="gsa-section-header"><div><span className="gsa-eyebrow">THE GULFSUFRA WAY</span><h2 id="gsa-values-title">A Little Magic.<br/><em>A Lot of Intention.</em></h2></div><p>No needless complexity, no generic restaurant experience. Just thoughtful digital work designed around what matters to your business.</p></div>
    <div className="gsa-values-grid">{beliefs.map(b=><article className="gsa-value" key={b.n}><span>{b.n}</span><div className="gsa-value-line" aria-hidden="true"/><h3>{b.title}</h3><p>{b.description}</p></article>)}</div>
   </section>

   <section className="gsa-wrap gsa-crew" id="gsa-crew" aria-labelledby="gsa-crew-title">
    <div className="gsa-section-header"><div><span className="gsa-eyebrow">OUR VERY UNUSUAL GUIDES</span><h2 id="gsa-crew-title">Meet the <em>Magic Makers.</em></h2></div><p>Four playful characters, four ways to help your restaurant shine. They're our brand's guides—each with a personality of their own.</p></div>
    <div className="gsa-crew-grid">{characters.map(c=><article className={'gsa-crew-card gsa-crew-'+c.theme} key={c.name}>
      <div className="gsa-crew-art"><img src={A+c.asset} alt={c.name+', GulfSufra '+c.personality} loading="lazy"/><span>{c.note}</span></div>
      <div className="gsa-crew-info"><span>{c.personality}</span><h3>{c.name}</h3><h4>{c.service}</h4><p>{c.copy}</p><Link to={c.url} aria-label={'Explore '+c.service}>Meet {c.name} <span aria-hidden="true">↗</span></Link></div>
    </article>)}</div>
   </section>

   <section className="gsa-wrap gsa-process gsa-panel" aria-labelledby="gsa-process-title">
    <div className="gsa-section-header"><div><span className="gsa-eyebrow">NO MYSTERIOUS SPELLS REQUIRED</span><h2 id="gsa-process-title">How We Make<br/><em>Things Happen.</em></h2></div><p>Simple conversations, a clear plan, and a result that feels unmistakably like your restaurant.</p></div>
    <div className="gsa-process-grid">{steps.map(s=><article key={s.num}><span className="gsa-process-number">{s.num}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
   </section>

   <section className="gsa-wrap gsa-region" aria-labelledby="gsa-region-title"><div className="gsa-region-copy"><span className="gsa-eyebrow">ROOTED IN THE RESTAURANT WORLD</span><h2 id="gsa-region-title">A Gulf State of <em>Mind.</em></h2><p>Different cuisines. Different traditions. The same love for hospitality. We design with restaurants in Qatar, Bahrain and Kuwait in mind, blending local flavour with modern digital experiences.</p><div className="gsa-regions"><span>Qatar</span><span>Bahrain</span><span>Kuwait</span></div></div><div className="gsa-region-photo" role="img" aria-label="Warm evening restaurant terrace looking toward the Gulf skyline"/></section>

   <section className="gsa-wrap gsa-cta" aria-labelledby="gsa-cta-title"><div className="gsa-cta-content"><span className="gsa-eyebrow">NOW, ABOUT YOUR RESTAURANT...</span><h2 id="gsa-cta-title">You've Got the Flavour.<br/><em>We've Got Ideas.</em></h2><p>Tell us what you're dreaming up. We'll help you find the digital solution that makes sense for your restaurant.</p><Link to="/contact" className="gsa-btn gsa-btn-gold">Let's Make Something Good <span aria-hidden="true">→</span></Link></div><img src={A+'sufri-approval.webp'} alt="Sufri giving a thumbs-up on his carpet" loading="lazy"/></section>
  </div>
 </main>;
}
