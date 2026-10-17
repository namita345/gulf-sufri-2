import React from 'react';
import './digital-menu-hero-rebuilt.css';

/** A fresh, self-contained hero: built from the original standalone assets. */
export default function DigitalMenuHero({ onInquiry }) {
  return (
    <section className="gdm2-hero" aria-labelledby="gdm-title">
      <div className="gdm2-shell">
        <div className="gdm2-copy">
          <span className="gdm2-eyebrow"><span aria-hidden="true">✦</span> GULFSUFRA DIGITAL MENUS</span>
          <h1 id="gdm-title">Digital Menus<br />That Feel<br /><em>Like Magic.</em></h1>
          <p>Modern restaurants deserve more than paper menus. Create beautiful, easy-to-browse digital menus with QR access, instant updates and a presentation that delights every guest.</p>
          <div className="gdm2-actions">
            <button className="gdm2-primary" type="button" onClick={onInquiry}>Get Your Digital Menu <span aria-hidden="true">→</span></button>
            <a className="gdm2-secondary" href="#gdm-showroom"><span className="gdm2-arrow" aria-hidden="true">↗</span> Explore Menu Styles</a>
          </div>
          <div className="gdm2-trust" aria-label="Digital menu benefits">
            <span>✦ No app needed</span><span>✦ Always easy to update</span><span>✦ Made for restaurants</span>
          </div>
        </div>
        <div className="gdm2-art" aria-label="Tabikh presenting a magical digital restaurant menu">
          <img className="gdm2-tabikh" src="/assets/gdm-tabikh-hero.webp" alt="Tabikh, GulfSufra’s cheerful digital menu guide" width="1150" height="996" fetchPriority="high" />
          <img className="gdm2-book" src="/assets/gdm-book.webp" alt="Open enchanted emerald-and-gold restaurant digital menu book" width="1150" height="1150" fetchPriority="high" />
          <div className="gdm2-bubble">“A great meal brings people<br className="gdm2-bubble-break"/> together... and a beautiful menu<br className="gdm2-bubble-break"/> brings it to life!” <span aria-hidden="true">✦</span></div>
        </div>
      </div>
    </section>
  );
}
