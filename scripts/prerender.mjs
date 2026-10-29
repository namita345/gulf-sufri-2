import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { origin, routes } from '../seo/routes.mjs';

const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(project,'dist');
const template=await fs.readFile(path.join(dist,'index.html'),'utf8');
const vite=await createServer({root:project,server:{middlewareMode:true,hmr:false},appType:'custom'});
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const jsonForHTML=value=>JSON.stringify(value).replace(/</g,'\\u003c');
const organization={
  '@context':'https://schema.org','@type':'Organization','@id':`${origin}/#organization`,
  name:'Gulf Sufra',url:origin,description:'Restaurant-focused digital agency offering websites, QR digital menus, social media marketing and Google Business Profile services.',
  areaServed:[{ '@type':'Country',name:'Qatar'},{'@type':'Country',name:'Bahrain'},{'@type':'Country',name:'Kuwait'}]
};
const serviceNames={
  '/services/restaurant-websites':'Restaurant Website Design',
  '/services/digital-menus':'Restaurant QR Code Digital Menus',
  '/services/social-media':'Restaurant Social Media Marketing',
  '/services/google-business':'Restaurant Google Business Profile Optimization'
};
try{
  const {Layout}=await vite.ssrLoadModule('/src/App.jsx');
  for(const route of routes){
    const canonical=origin+route.path;
    const body=renderToString(React.createElement(MemoryRouter,{initialEntries:[route.path]},React.createElement(Layout)));
    const jsonLd=route.path==='/' ? [organization,{'@context':'https://schema.org','@type':'WebSite',name:'Gulf Sufra',url:origin,publisher:{'@id':`${origin}/#organization`}}]
      :serviceNames[route.path] ? [organization,{'@context':'https://schema.org','@type':'Service',name:serviceNames[route.path],description:route.description,url:canonical,provider:{'@id':`${origin}/#organization`},areaServed:organization.areaServed}]
      : [];
    const seo=`<title>${escapeHTML(route.title)}</title><meta name="description" content="${escapeHTML(route.description)}"><link rel="canonical" href="${escapeHTML(canonical)}"><meta property="og:type" content="website"><meta property="og:site_name" content="Gulf Sufra"><meta property="og:title" content="${escapeHTML(route.title)}"><meta property="og:description" content="${escapeHTML(route.description)}"><meta property="og:url" content="${escapeHTML(canonical)}"><meta name="twitter:card" content="summary">${jsonLd.map(obj=>`<script type="application/ld+json">${jsonForHTML(obj)}</script>`).join('')}`;
    let output=template.replace(/<title>[\s\S]*?<\/title>/i,'').replace(/<meta\s+name="description"[^>]*>/i,'');
    output=output.replace('</head>',`${seo}</head>`).replace('<div id="root"></div>',`<div id="root" data-prerendered="true">${body}</div>`);
    // Cloudflare Pages serves /about from /about.html (no SPA fallback required).
    const target=route.path==='/' ? path.join(dist,'index.html') : path.join(dist,`${route.path.slice(1)}.html`);
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.writeFile(target,output);
    console.log(`Prerendered ${route.path} (${body.length} HTML characters)`);
  }
  await fs.writeFile(path.join(dist,'404.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page not found | Gulf Sufra</title><body><main><h1>Page not found</h1><p>This page does not exist.</p><a href="/">Return to Gulf Sufra</a></main></body></html>');
}finally{await vite.close()}
