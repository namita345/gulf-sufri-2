import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export function Header(){
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(()=>setMobileOpen(false),[location.pathname,location.hash]);
  const isActive = (path) => location.pathname === path;
  const services = [
    ['Restaurant Websites','restaurant-websites'],
    ['Digital Menus','digital-menus'],
    ['Social Media','social-media'],
    ['Google Business','google-business']
  ];
  return <header className="nav">
    <Link className="logo" to="/" aria-label="GulfSufra home"><img src="/assets/logo.png" alt="GulfSufra" /></Link>
    <button className="header-menu-toggle" type="button" aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?'✕':'☰'}<span className="sr-only">Toggle navigation</span></button>
    <nav id="main-navigation" className={mobileOpen?'nav-open':''} aria-label="Main navigation">
      <Link className={isActive('/')?'nav-active':''} aria-current={isActive('/')?'page':undefined} to="/">Home</Link>
      <div className="nav-services">
        <Link className={isActive('/services')?'nav-active services-trigger':'services-trigger'} aria-current={isActive('/services')?'page':undefined} to="/services">Services <span className="nav-chevron" aria-hidden="true">⌄</span></Link>
        <div className="services-dropdown">
          <div className="dropdown-heading">WHAT WE DO</div>
          {services.map(([name,slug],index)=><Link key={slug} to={'/services#'+slug}><span className="dropdown-number">0{index+1}</span><span>{name}</span><span className="dropdown-arrow" aria-hidden="true">↗</span></Link>)}
        </div>
      </div>
      <Link className={isActive('/about')?'nav-active':''} aria-current={isActive('/about')?'page':undefined} to="/about">About Us</Link>
      <Link className={isActive('/pricing')?'nav-active':''} aria-current={isActive('/pricing')?'page':undefined} to="/pricing">Pricing</Link>
      <Link className={isActive('/contact')?'nav-active':''} aria-current={isActive('/contact')?'page':undefined} to="/contact">Contact Us</Link>
    </nav>
    <div className="nav-right"><span>EN&nbsp; | &nbsp;عربي</span><Link className="btn gold" to="/contact">Get Started <i>→</i></Link></div>
  </header>
}
export function Footer(){return <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><img src="/assets/logo.png" alt="GulfSufra"/><p>Your restaurant. Our expertise.</p><p className="footer-intro">We take care of the digital side — so you can focus on what you do best: creating amazing food.</p></div><div><h4>Quick Links</h4><Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/services">Services</Link><Link to="/pricing">Pricing</Link><Link to="/contact">Contact Us</Link></div><div><h4>Our Services</h4><Link to="/services">Website Development</Link><Link to="/services">Digital Menu</Link><Link to="/services">Social Media Management</Link><Link to="/services">Google My Business</Link></div><div className="footer-contact"><h4>Contact Us</h4><a href="mailto:yalla@gulfsufri.com">yalla@gulfsufri.com</a><a href="mailto:support@gulfsufri.com">support@gulfsufri.com</a><a href="tel:+971500000000">+971 50 000 0000 (temporary)</a><Link className="footer-cta" to="/contact">Get Started Today →</Link></div></div><div className="footer-bottom"><span>© 2026 GulfSufra. All rights reserved.</span><div><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></div></div></footer>}
