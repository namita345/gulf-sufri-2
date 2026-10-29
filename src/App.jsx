import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import RestaurantWebsites from './pages/RestaurantWebsites.jsx';
import DigitalMenus from './pages/DigitalMenus.jsx';
import SocialMedia from './pages/SocialMedia.jsx';
import GoogleBusiness from './pages/GoogleBusiness.jsx';
import About from './pages/About.jsx';
import {Legal} from './pages/PlaceholderPages.jsx';
import Pricing from './pages/Pricing.jsx';
import Contact from './pages/Contact.jsx';
import {Header,Footer} from './components/SiteShell.jsx';
function Layout(){const loc=useLocation(); React.useEffect(()=>{if(loc.hash){requestAnimationFrame(()=>document.getElementById(decodeURIComponent(loc.hash.slice(1)))?.scrollIntoView({behavior:"smooth",block:"start"}))}else{window.scrollTo(0,0)}},[loc.pathname,loc.hash]); return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/services/restaurant-websites" element={<RestaurantWebsites/>}/><Route path="/services/digital-menus" element={<DigitalMenus/>}/><Route path="/services/social-media" element={<SocialMedia/>}/><Route path="/services/google-business" element={<GoogleBusiness/>}/><Route path="/pricing" element={<Pricing/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Legal/>}/><Route path="/terms" element={<Legal terms/>}/></Routes><Footer/></>}
export { Layout };
export default function App(){return <BrowserRouter><Layout/></BrowserRouter>}
