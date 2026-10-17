import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export function Header(){
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(()=>{
    const sync=()=>setScrolled(window.scrollY>42);
    sync();
    window.addEventListener("scroll",sync,{passive:true});
    return()=>window.removeEventListener("scroll",sync);
  },[]);
  React.useEffect(()=>{setMobileOpen(false);setServicesOpen(false);},[location.pathname,location.hash]);
  const isActive = (path) => location.pathname === path || (path === '/services' && location.pathname.startsWith('/services/')); 
  const services = [
    ['Restaurant Websites','restaurant-websites','Beautiful websites that bring more diners.','websites'],
    ['Digital Menus','digital-menus','Modern menus for a seamless dining experience.','menus'],
    ['Social Media','social-media','Engaging content that grows your restaurant.','social'],
    ['Google Business','google-business','Get found, get reviews, get more customers.','google']
  ];
  const ServiceIcon = ({type}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type==='websites' && <><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></>}
    {type==='menus' && <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3.5h6M9 9h.01M12 9h4M9 13h.01M12 13h4M9 17h.01M12 17h4"/></>}
    {type==='social' && <><path d="M4 10h4l9-5v14l-9-5H4zM8 14l2 6h3M20 9a4 4 0 0 1 0 6"/></>}
    {type==='google' && <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/></>}
  </svg>;
  return <header className={`nav gulf-glass-nav${scrolled?" gulf-nav-scrolled":""}`}>
    <Link className="logo" to="/" aria-label="GulfSufra home"><img src="/assets/logo.webp" alt="GulfSufra" /></Link>
    <button className="header-menu-toggle" type="button" aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?'✕':'☰'}<span className="sr-only">Toggle navigation</span></button>
    <nav id="main-navigation" className={mobileOpen?'nav-open':''} aria-label="Main navigation">
      <Link className={isActive('/')?'nav-active':''} aria-current={isActive('/')?'page':undefined} to="/">Home</Link>
      <div className={"nav-services"+(servicesOpen?" is-open":"")} onMouseEnter={()=>setServicesOpen(true)} onMouseLeave={()=>setServicesOpen(false)} onKeyDown={e=>{if(e.key==="Escape")setServicesOpen(false)}}>
        <Link className={isActive('/services')?'nav-active services-trigger':'services-trigger'} aria-current={location.pathname==='/services'?'page':undefined} to="/services">Services</Link>
        <button className="services-dropdown-toggle" type="button" aria-label="Show Services options" aria-expanded={servicesOpen} aria-controls="services-submenu" onClick={()=>setServicesOpen(v=>!v)}><span className="nav-chevron" aria-hidden="true" /></button>
        <div id="services-submenu" className="services-dropdown">
          {services.map(([name,slug,description,icon])=><Link key={slug} to={slug==='restaurant-websites'?'/services/restaurant-websites':slug==='digital-menus'?'/services/digital-menus':slug==='social-media'?'/services/social-media':'/services/google-business'} className="service-menu-item"><span className="service-menu-icon"><ServiceIcon type={icon}/></span><span className="service-menu-copy"><strong>{name}</strong><small>{description}</small></span><span className="service-menu-arrow" aria-hidden="true">›</span></Link>)}
        </div>
      </div>
      <Link className={isActive('/about')?'nav-active':''} aria-current={isActive('/about')?'page':undefined} to="/about">About Us</Link>
      <Link className={isActive('/pricing')?'nav-active':''} aria-current={isActive('/pricing')?'page':undefined} to="/pricing">Pricing</Link>
      <Link className={isActive('/contact')?'nav-active':''} aria-current={isActive('/contact')?'page':undefined} to="/contact">Contact Us</Link>
      <Link className="nav-mobile-cta" to="/contact">Get Started <span aria-hidden="true">→</span></Link>
    </nav>
    <div className="nav-right"><span>EN&nbsp; | &nbsp;عربي</span><Link className="btn gold" to="/contact">Get Started <i>→</i></Link></div>
  </header>
}
export function Footer(){return <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><img src="/assets/logo.webp" alt="GulfSufra"/><p>Your restaurant. Our expertise.</p><p className="footer-intro">We take care of the digital side — so you can focus on what you do best: creating amazing food.</p></div><div><h4>Quick Links</h4><Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/services">Services</Link><Link to="/pricing">Pricing</Link><Link to="/contact">Contact Us</Link></div><div><h4>Our Services</h4><Link to="/services/restaurant-websites">Restaurant Websites</Link><Link to="/services/digital-menus">Digital Menu</Link><Link to="/services/social-media">Social Media Management</Link><Link to="/services/google-business">Google Business</Link></div><div className="footer-contact"><h4>Contact Us</h4><a href="mailto:yalla@gulfsufri.com">yalla@gulfsufri.com</a><a href="mailto:support@gulfsufri.com">support@gulfsufri.com</a><a href="tel:+971500000000">+971 50 000 0000 (temporary)</a><Link className="footer-cta" to="/contact">Get Started Today →</Link></div></div><div className="footer-bottom"><span>© 2026 GulfSufra. All rights reserved.</span><div><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></div></div></footer>}
