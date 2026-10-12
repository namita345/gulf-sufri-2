import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import {About,Pricing,Contact,Legal} from './pages/PlaceholderPages.jsx';
import {Header,Footer} from './components/SiteShell.jsx';
function Layout(){const loc=useLocation(); React.useEffect(()=>{if(loc.hash){requestAnimationFrame(()=>document.getElementById(decodeURIComponent(loc.hash.slice(1)))?.scrollIntoView({behavior:"smooth",block:"start"}))}else{window.scrollTo(0,0)}},[loc.pathname,loc.hash]); return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/pricing" element={<Pricing/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Legal/>}/><Route path="/terms" element={<Legal terms/>}/></Routes><Footer/></>}
export default function App(){return <BrowserRouter><Layout/></BrowserRouter>}
