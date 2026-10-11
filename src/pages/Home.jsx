import React, { useEffect } from 'react';
import '../../styles.css';
import { initInteractions } from '../interactions.js';

export default function Home() {
  useEffect(() => { initInteractions(); }, []);
  return (
    <>
<section className="hero" id="home">
<div className="hero-image"></div>
<div className="hero-shade"></div>
<div className="hero-content">
<p className="kicker">Restaurant Digital Solutions</p>
<h1>Make Your Restaurant<br/><span>Impossible to Miss.</span></h1>
<p className="lead">We build the website, menu, content and online presence that help hungry customers find you — and choose you.</p>
<div className="hero-actions">
<a className="btn gold big" href="#contact">Get Started <i>→</i></a>
<a className="story" href="#services"><b>▶</b> See What We Do</a>
</div>
</div>
<div className="sufri-hero">
<img alt="Sufri, GulfSufra's digital host" src="/assets/sufri.png"/>
<div className="bubble">
<strong>Ahlan, Habibi. I’m Sufri.</strong><br/>
      Welcome to GulfSufra!<br/>
      Let me show you around.
    </div>
</div>
</section>
<section className="services-showcase" id="services">
<div className="services-bg"></div>
<div className="services-content">
<div className="services-heading">
<p className="kicker">Our Services</p>
<h2>Everything Your Restaurant<br/><span>Needs to Grow Online.</span></h2>
<p>From a beautiful website to the way hungry customers find you, we handle the digital side so you can focus on the food.</p>
</div>
<div className="services-stage">
<div aria-live="polite" className="sufri-host">
<div className="sufri-poses">
<img alt="Sufri" className="sufri-pose pose-neutral active" src="/assets/sufri-neutral.png"/>
<img alt="Sufri showing a restaurant website" className="sufri-pose pose-website" src="/assets/sufri-website.png"/>
<img alt="Sufri showing a digital menu" className="sufri-pose pose-menu" src="/assets/sufri-menu.png"/>
<img alt="Sufri showing social media" className="sufri-pose pose-social" src="/assets/sufri-social.png"/>
<img alt="Sufri showing Google Business" className="sufri-pose pose-google" src="/assets/sufri-google.png"/>
</div>
<div className="sufri-bubble"><strong>Pick a service, Habibi.</strong><br/>I'll show you what we can do.</div>
</div>
<div className="service-grid">
<article className="service-card active" data-service="website">
<div className="service-tooltip">
<strong>Ready for a digital home?</strong>
<span>Your restaurant deserves a website as good as the experience inside.</span>
<a href="#contact">Build My Website <i>→</i></a>
</div>
<div className="card-visual"><img alt="Restaurant website example" src="/assets/website-mockup.png"/></div>
<div className="card-body"><span className="card-number">01</span><h3>Restaurant Websites</h3><p>Beautiful, modern websites that turn your restaurant into a destination.</p><span className="card-arrow">→</span></div>
</article>
<article className="service-card" data-service="menu">
<div className="service-tooltip">
<strong>Make your menu impossible to ignore.</strong>
<span>Give every guest a fast, beautiful menu they can open anywhere.</span>
<a href="#contact">Get My Digital Menu <i>→</i></a>
</div>
<div className="card-visual"><img alt="Digital menu example" src="/assets/menu-mockup.png"/></div>
<div className="card-body"><span className="card-number">02</span><h3>Digital Menus</h3><p>Interactive menus that look great, load fast and stay easy to update.</p><span className="card-arrow">→</span></div>
</article>
<article className="service-card" data-service="social">
<div className="service-tooltip">
<strong>Your food already looks this good.</strong>
<span>Let's make sure people stop scrolling and start craving.</span>
<a href="#contact">Grow My Social <i>→</i></a>
</div>
<div className="card-visual"><img alt="Restaurant social media example" src="/assets/social-mockup.png"/></div>
<div className="card-body"><span className="card-number">03</span><h3>Social Media</h3><p>Content that makes people stop scrolling and start talking about your food.</p><span className="card-arrow">→</span></div>
</article>
<article className="service-card" data-service="google">
<div className="service-tooltip">
<strong>They're searching. Be there.</strong>
<span>Show up when hungry customers are looking for somewhere to eat.</span>
<a href="#contact">Improve My Google Presence <i>→</i></a>
</div>
<div className="card-visual google-card-visual"><div className="google-mini"><b>G</b><strong>Your Restaurant</strong><span>4.8 ★★★★★</span><small>Restaurant · Open</small><div><em>⌖ Directions</em><em>⌕ Call</em><em>♡ Save</em></div></div></div>
<div className="card-body"><span className="card-number">04</span><h3>Google Business</h3><p>Get found, build trust and bring more diners through your doors.</p><span className="card-arrow">→</span></div>
</article>
</div>
</div>
<a aria-hidden="true" className="services-anchor" id="work"></a>
</div>
</section>
<section className="why-gulfsufra" id="why-gulfsufra">
<div className="why-gulfsufra-bg"></div><div className="why-gulfsufra-overlay"></div>
<div className="why-gulfsufra-inner">
<div className="why-gulfsufra-copy">
<p className="why-kicker"><span></span> WHY GULFSUFRA</p>
<h2>Built for Restaurants.<br/><em>By People Who Get It.</em></h2>
<p className="why-lead">We understand the restaurant industry — the long hours, the happy customers, and the constant need to get noticed. That’s why everything we build is designed to bring you more guests, more orders, and more growth.</p>
<div className="why-points">
<article className="why-point"><span className="why-icon">⌂</span><div><h3>Restaurant Focused</h3><p>Solutions built specifically for restaurants, not generic templates.</p></div></article>
<article className="why-point"><span className="why-icon">▥</span><div><h3>More Guests, More Sales</h3><p>Everything we do is designed to help you attract, engage and convert diners.</p></div></article>
<article className="why-point"><span className="why-icon">⚙</span><div><h3>All-in-One Support</h3><p>Website, menu, social media, Google Business — everything in one place, with a team that’s always here for you.</p></div></article>
<article className="why-point"><span className="why-icon">♡</span><div><h3>A Partner Who Cares</h3><p>Your success is our success. We treat your restaurant like it’s our own.</p></div></article>
</div>
<div className="why-actions"><a className="btn gold big" href="#contact">Get Started <i>→</i></a><a className="why-story" href="#contact"><b>▶</b> See How It Works</a></div>
</div>
<div className="why-gulfsufra-art">
<div className="why-sufri-wrap">
<img alt="Sufri presenting a restaurant website on a laptop" src="/assets/sufri-why-laptop-carpet.png"/>
<div className="why-sufri-bubble"><strong>I’ve worked with many<br/>restaurants like yours.</strong><span>I know what works!</span></div>
</div>
</div>
</div>
</section>
<section className="how-it-works" id="how-it-works">
<div aria-hidden="true" className="how-it-works-bg"></div>
<div className="how-it-works-inner">
<div className="how-it-works-intro">
<p className="kicker how-kicker">How It Works</p>
<h2>From Idea to<br/><span>Online.</span><br/><em>We Handle It.</em></h2>
<p className="how-lead">You run the restaurant. We take care of the digital side — from the first conversation to keeping everything running.</p>
<div className="how-actions">
<a className="btn gold big" href="#contact">Get Started <i>→</i></a>
<a className="how-story" href="#services"><b>▶</b> Explore Services</a>
</div>
</div>
<div className="how-steps">
<article className="how-step">
<div className="how-step-media"><div className="how-speech">First, tell me about your restaurant!</div><img alt="Welcoming Sufri inviting restaurant owners to get started" src="/assets/sufri-neutral.png"/></div>
<span className="how-step-number">01</span>
<div className="how-step-body"><span aria-hidden="true" className="how-step-icon"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24"><path d="M5 5.5h14v9H8l-3 3v-12Z"></path><path d="M8 9h8M8 12h5"></path></svg></span><h3>Tell Us About<br/>Your Restaurant</h3><p>We learn about your restaurant, your goals, your customers and what you need.</p></div>
</article>
<article className="how-step">
<div className="how-step-media"><div className="how-speech">Leave the digital side to me.</div><img alt="Sufri presenting a restaurant website and digital setup" src="/assets/sufri-website.png"/></div>
<span className="how-step-number">02</span>
<div className="how-step-body"><span aria-hidden="true" className="how-step-icon"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19 12a7 7 0 0 0-.2-1.7l1.6-1.2-1.7-2.9-1.9.8A7 7 0 0 0 15.3 6L15 4h-3l-.3 2a7 7 0 0 0-1.5 1l-1.9-.8-1.7 2.9 1.6 1.2A7 7 0 0 0 8 12c0 .6.1 1.2.2 1.7l-1.6 1.2 1.7 2.9 1.9-.8a7 7 0 0 0 1.5 1l.3 2h3l.3-2a7 7 0 0 0 1.5-1l1.9.8 1.7-2.9-1.6-1.2c.1-.5.2-1.1.2-1.7Z"></path></svg></span><h3>We Build &amp; Set<br/>Everything Up</h3><p>Website, menu, social presence, Google Business and whatever else your restaurant needs.</p></div>
</article>
<article className="how-step">
<div className="how-step-media"><div className="how-speech">You focus on the food. I’ll handle the rest!</div><img alt="Confident Sufri showing that the digital side is taken care of" src="/assets/sufri-approval.png"/></div>
<span className="how-step-number">03</span>
<div className="how-step-body"><span aria-hidden="true" className="how-step-icon"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24"><path d="M8 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16.5 12.5a3 3 0 1 0 0-6M3.5 20c.5-3 2.2-5 4.5-5s4 2 4.5 5M13 20c.4-2.2 1.7-3.7 3.5-3.7 2 0 3.2 1.5 3.8 3.7"></path></svg></span><h3>You Focus on<br/>the Food</h3><p>We keep your digital presence looking good, working properly and ready to bring you more customers.</p></div>
</article>
</div>
</div>
</section>
<section aria-labelledby="plate-title" className="plate-section" id="take-off-your-plate">
<div className="plate-inner">
<div className="plate-copy">
<p className="kicker plate-kicker">What We Take Off Your Plate</p>
<h2 id="plate-title">You Focus on<br/>the Food.<br/><span>We Handle the Digital.</span></h2>
<p className="plate-lead">From websites to social media, we take care of everything your restaurant needs online — so you can focus on what you do best: creating amazing food.</p>
<div aria-label="Digital services" className="plate-services" role="list">
<button aria-pressed="true" className="plate-service is-active" data-plate-service="website" role="listitem" type="button"><span aria-hidden="true" className="plate-icon"><svg viewbox="0 0 24 24"><rect height="13" rx="1.5" width="18" x="3" y="4"></rect><path d="M8 21h8M12 17v4"></path></svg></span><span className="plate-service-copy"><strong>Restaurant Websites</strong><small>Beautiful, mobile-friendly websites that showcase your food and turn visitors into customers.</small></span><span aria-hidden="true" className="plate-arrow">›</span></button>
<button aria-pressed="false" className="plate-service" data-plate-service="menu" role="listitem" type="button"><span aria-hidden="true" className="plate-icon"><svg viewbox="0 0 24 24"><rect height="19" rx="2" width="16" x="4" y="2.5"></rect><path d="M8 7h8M8 11h8M8 15h5"></path></svg></span><span className="plate-service-copy"><strong>Digital Menus</strong><small>Modern, easy-to-update menus with stunning food photos and a seamless browsing experience.</small></span><span aria-hidden="true" className="plate-arrow">›</span></button>
<button aria-pressed="false" className="plate-service" data-plate-service="social" role="listitem" type="button"><span aria-hidden="true" className="plate-icon"><svg viewbox="0 0 24 24"><rect height="18" rx="5" width="18" x="3" y="3"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r=".7"></circle></svg></span><span className="plate-service-copy"><strong>Social Media &amp; Content</strong><small>High-quality content and consistent posting that brings more people to your restaurant.</small></span><span aria-hidden="true" className="plate-arrow">›</span></button>
<button aria-pressed="false" className="plate-service" data-plate-service="google" role="listitem" type="button"><span aria-hidden="true" className="plate-icon"><svg viewbox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg></span><span className="plate-service-copy"><strong>Google Business Profile</strong><small>Help local customers find your restaurant and build a stronger online reputation.</small></span><span aria-hidden="true" className="plate-arrow">›</span></button>
<button aria-pressed="false" className="plate-service" data-plate-service="support" role="listitem" type="button"><span aria-hidden="true" className="plate-icon"><svg viewbox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M17 11h6"></path></svg></span><span className="plate-service-copy"><strong>Ongoing Digital Support</strong><small>We keep everything updated, so your online presence always looks its best.</small></span><span aria-hidden="true" className="plate-arrow">›</span></button>
</div>
</div>
<div className="plate-visual">
<div className="plate-orb plate-orb-one"></div><div className="plate-orb plate-orb-two"></div>
<div aria-live="polite" className="plate-bubble"><span className="plate-bubble-dot"></span><p id="plate-bubble-text">Let’s give your restaurant a website worth visiting.</p></div>
<div aria-hidden="true" className="plate-feature-icons"><span>⌘</span><span>◎</span><span>⌖</span><span>↗</span></div>
<img alt="Sufri in his thoughtful pose, seated on his emerald and gold carpet" className="plate-sufri" data-default-src="/assets/sufri-thinking.png" src="/assets/sufri-thinking.png"/>
<p className="plate-visual-note">One partner. Every digital detail.</p>
</div>
</div>
</section>
<section aria-labelledby="sufri-cta-title" className="sufri-cta-section" id="sufri-cta">
<div className="sufri-cta-card">
<div className="sufri-cta-copy">
<p className="sufri-cta-kicker">Still thinking about it?</p>
<h2 id="sufri-cta-title">Still not convinced?<br/><span>Hey Habibi, what’s holding you back?</span></h2>
<p className="sufri-cta-lead">Questions about pricing, results, or what your restaurant actually needs? That’s what we’re here for. Let’s clear things up — no pressure, no confusing jargon.</p>
<a className="sufri-cta-button" href="mailto:hello@gulfsufra.com?subject=Let%E2%80%99s%20talk%20to%20Sufri">Okay, Sufri. Let’s talk. <span aria-hidden="true">→</span></a>
<p className="sufri-cta-note">No pressure. Just answers.</p>
</div>
<div className="sufri-cta-art">
<div className="sufri-cta-bubble">Hey Habibi, what’s holding you back?</div>
<img alt="Sufri welcoming you with open hands, seated on his emerald and gold carpet" src="/assets/sufri-presenting.png"/>
</div>
<div aria-label="What you can expect" className="sufri-cta-promises">
<div><span aria-hidden="true" className="sufri-cta-promise-icon">✉</span><p><strong>Ask anything</strong><small>No question is too small.</small></p></div>
<div><span aria-hidden="true" className="sufri-cta-promise-icon">♡</span><p><strong>Get honest advice</strong><small>Clear and straightforward.</small></p></div>
<div><span aria-hidden="true" className="sufri-cta-promise-icon">⚙</span><p><strong>Find the right solution</strong><small>Based on your restaurant’s needs.</small></p></div>
</div>
</div>
</section>
    </>
  );
}
