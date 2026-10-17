import React from 'react';
import {Link} from 'react-router-dom';
import './pricing.css';

const packages = [
  {id:'foundation',name:'The First Course',eyebrow:'GET ONLINE BEAUTIFULLY',desc:'For restaurants building their digital presence, one strong first impression at a time.',features:['Restaurant website or digital menu','Design tailored to your restaurant','Mobile-friendly customer experience','Essential launch guidance'],note:'Choose your starting service',badge:null},
  {id:'growth',name:'The Main Course',eyebrow:'A MORE CONNECTED PRESENCE',desc:'For restaurants ready to connect their website, menus, and online discovery.',features:['A tailored mix of digital services','Consistent brand look across touchpoints','Google Business and menu opportunities','Practical guidance on what to prioritize'],note:'Build the mix that fits',badge:'POPULAR STARTING POINT'},
  {id:'partner',name:'The Full Sufra',eyebrow:'YOUR ONGOING DIGITAL PARTNER',desc:'For restaurants looking for joined-up creative, visibility, and continued support.',features:['Multi-service planning and delivery','Website, menus and content coordination','Social media and local visibility options','Support scope agreed around your needs'],note:'Let’s map out your needs',badge:null}
];
const services=[
  {name:'Restaurant Websites',detail:'A digital home that reflects your food and atmosphere.',path:'/services/restaurant-websites',art:'jinni-services.png'},
  {name:'Digital Menus',detail:'Beautiful, easily updated menus for your guests.',path:'/services/digital-menus',art:'tabikh-services.png'},
  {name:'Social Media',detail:'Creative content that brings your restaurant personality online.',path:'/services/social-media',art:'marina-services.png'},
  {name:'Google Business',detail:'Help guests find your essential business information.',path:'/services/google-business',art:'mummo-services.png'}
];
const questions=[
  ['Why don’t you show fixed prices?','Every restaurant starts at a different point. The final quote depends on the services, pages or content required, integrations, and level of support. We will confirm the scope and price before work begins.'],
  ['Can I book just one service?','Absolutely. Start with a website, digital menu, social media, or Google Business support. You do not need to choose a multi-service package.'],
  ['Is SEO included with restaurant websites?','Our restaurant website offering includes essential on-page SEO setup. Ongoing SEO campaigns or additional optimization can be discussed separately.'],
  ['Can we add services later?','Yes. We can plan your work in stages, starting with what will make the biggest difference to your restaurant.'],
  ['What happens after I request a quote?','Tell us a little about your restaurant and the services you have in mind. We will review your request and discuss scope, timelines, and pricing with you before any work starts.']
];
export default function Pricing(){
 return <main className="gsp-page">
  <section className="gsp-hero" aria-labelledby="gsp-title">
   <div className="gsp-shell gsp-hero-grid">
    <div className="gsp-hero-copy">
     <span className="gsp-kicker">✦ GULFSUFRA PRICING</span>
     <h1 id="gsp-title">Good Digital.<br/><em>Great Possibilities.</em><br/>Your Kind of Plan.</h1>
     <p>Big ambitions or a small first step? We help restaurants choose the right digital ingredients—and give you a quote based on what you actually need.</p>
     <div className="gsp-actions"><a className="gsp-btn gsp-btn-gold" href="#gsp-packages">Explore Packages <span aria-hidden="true">↓</span></a><Link className="gsp-text-link" to="/contact?plan=custom">Talk About My Restaurant <span aria-hidden="true">↗</span></Link></div>
     <div className="gsp-hero-signoff">No mystery fees here. Just a clear scope before we begin. <span aria-hidden="true">✧</span></div>
    </div>
    <div className="gsp-hero-art" aria-label="Sufri presents GulfSufra's digital solutions">
      <div className="gsp-art-glow" aria-hidden="true"/>
      <div className="gsp-art-panel"><span>MADE FOR RESTAURANTS</span><strong>Find your perfect<br/>digital mix.</strong><div className="gsp-mini-tags"><b>Websites</b><b>Menus</b><b>Social</b><b>Google</b></div></div>
      <img src="/assets/sufri-approval.webp" alt="Sufri celebrating on his emerald magic carpet" loading="eager"/>
      <div className="gsp-art-note">“A little of this, a little of that. Let's make it yours!”</div>
    </div>
   </div>
  </section>
  <div className="gsp-content">
   <section className="gsp-shell gsp-packages" id="gsp-packages" aria-labelledby="gsp-packages-title">
    <div className="gsp-heading"><div><span className="gsp-kicker">YOUR MENU OF POSSIBILITIES</span><h2 id="gsp-packages-title">Three Ways to <em>Get Started.</em></h2></div><p>These are flexible starting points, not fixed-price subscriptions. We’ll put together a quote once we know your restaurant’s goals.</p></div>
    <div className="gsp-package-grid">{packages.map((pkg,i)=><article className={'gsp-package '+(i===1?'gsp-featured':'')} key={pkg.id}>
      {pkg.badge&&<span className="gsp-package-badge">✦ {pkg.badge}</span>}
      <div className="gsp-package-top"><span className="gsp-package-number">0{i+1}</span><span className="gsp-package-eyebrow">{pkg.eyebrow}</span></div>
      <h3>{pkg.name}</h3><p className="gsp-package-desc">{pkg.desc}</p>
      <div className="gsp-price-label"><span>Custom quote</span><small>Based on your scope</small></div>
      <div className="gsp-package-line"/>
      <ul>{pkg.features.map(f=><li key={f}><span aria-hidden="true">✓</span>{f}</li>)}</ul>
      <Link className={'gsp-btn '+(i===1?'gsp-btn-gold':'gsp-btn-outline')} to={'/contact?plan='+pkg.id}>Discuss This Plan <span aria-hidden="true">→</span></Link>
      <small className="gsp-package-foot">{pkg.note}</small>
    </article>)}</div>
    <p className="gsp-package-disclaimer">✦ Package examples are illustrative. Deliverables, timelines, support, and pricing are confirmed individually in your proposal.</p>
   </section>
   <section className="gsp-shell gsp-pick gsp-panel" aria-labelledby="gsp-pick-title">
    <div className="gsp-heading"><div><span className="gsp-kicker">ONLY NEED ONE THING?</span><h2 id="gsp-pick-title">Pick Your <em>Own Ingredients.</em></h2></div><p>Not every restaurant needs a full package. Start with the service that matters most, then add more whenever you’re ready.</p></div>
    <div className="gsp-services-grid">{services.map(s=><Link to={s.path} className="gsp-service" key={s.name}><div className="gsp-service-image"><img src={'/assets/'+s.art} alt="" loading="lazy"/></div><div><h3>{s.name}</h3><p>{s.detail}</p><span>Explore service ↗</span></div></Link>)}</div>
   </section>
   <section className="gsp-shell gsp-steps" aria-labelledby="gsp-steps-title"><div className="gsp-heading"><div><span className="gsp-kicker">NO COMPLICATED MATH</span><h2 id="gsp-steps-title">From Hello to <em>Your Quote.</em></h2></div><p>Here’s how we keep the process simple and transparent.</p></div><div className="gsp-steps-grid"><article><span>01</span><h3>Tell us about your restaurant</h3><p>Share what you do, what you need, and what you’d like to achieve.</p></article><article><span>02</span><h3>We shape your scope</h3><p>We help identify the services and deliverables that suit your goals.</p></article><article><span>03</span><h3>You get a tailored quote</h3><p>Review the proposed work and cost before deciding how to proceed.</p></article></div></section>
   <section className="gsp-shell gsp-faq gsp-panel" aria-labelledby="gsp-faq-title"><div><span className="gsp-kicker">GOOD QUESTIONS, GOOD ANSWERS</span><h2 id="gsp-faq-title">A Few Things<br/><em>Worth Knowing.</em></h2><p>Still wondering about something? We’re happy to talk it through.</p></div><div className="gsp-faq-items">{questions.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
   <section className="gsp-shell gsp-final" aria-labelledby="gsp-final-title"><div><span className="gsp-kicker">LET'S COOK UP A PLAN</span><h2 id="gsp-final-title">Your Restaurant.<br/><em>Your Perfect Mix.</em></h2><p>Tell us where you want to go. We’ll work out the right digital recipe together.</p><Link className="gsp-btn gsp-btn-gold" to="/contact?plan=custom">Get My Tailored Quote <span aria-hidden="true">→</span></Link></div><img src="/assets/sufri-thinking.webp" alt="Sufri thinking of a great new idea" loading="lazy"/></section>
  </div>
 </main>;
}
