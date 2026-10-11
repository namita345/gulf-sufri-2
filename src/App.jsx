import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import {About,Services,Pricing,Contact,Legal} from './pages/PlaceholderPages.jsx';
import {Header,Footer} from './components/SiteShell.jsx';
function Layout(){const loc=useLocation(); React.useEffect(()=>{window.scrollTo(0,0)},[loc.pathname]); return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/pricing" element={<Pricing/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Legal/>}/><Route path="/terms" element={<Legal terms/>}/></Routes><Footer/></>}
export default function App(){return <BrowserRouter><Layout/></BrowserRouter>}
