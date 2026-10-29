// Cloudflare Worker entrypoint. Static pages are served by Workers Static Assets;
// only /api/* requests invoke this script before asset lookup.
const recipient='yalla@gulfsufri.com';
const countries=new Set(['Qatar','Bahrain','Kuwait','Saudi Arabia','United Arab Emirates','Oman','Other']);
const templates=new Set(['Not sure yet','The Spice House','Olive & Thyme','Al Yamama','Ocean Grill','Something custom','Classic Gulf','Modern Elegant','Modern Dark','Light & Fresh']);
const services=new Set(['Restaurant Websites','Digital Menus','Social Media','Google Business','General Inquiry','Package Consultation']);
const field=(v,max=250)=>typeof v==='string'?v.trim().slice(0,max):'';
const escapeHTML=v=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Allow':'POST','X-Content-Type-Options':'nosniff'}});

export default {
  async fetch(request,env){
    if(new URL(request.url).pathname!=='/api/inquiry')return json({error:'Not found.'},404);
    if(request.method!=='POST')return json({error:'Method not allowed.'},405);
    if(Number(request.headers.get('content-length'))>16000)return json({error:'Request too large.'},413);
    let body;
    try{body=await request.json()}catch{return json({error:'Invalid JSON.'},400)}
    if(!body||typeof body!=='object'||Array.isArray(body))return json({error:'Invalid inquiry.'},400);
    if(field(body.website,100))return json({ok:true});
    const restaurant=field(body.restaurant,120),name=field(body.name,120),email=field(body.email,200),phone=field(body.phone,35),country=field(body.country,50),template=field(body.template,60),details=field(body.details,2000),service=field(body.service,80)||'Restaurant Websites';
    if(!restaurant||!name||(!email&&!phone))return json({error:'Please include restaurant name, your name, and an email or WhatsApp number.'},400);
    if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:'Please enter a valid email address.'},400);
    if(phone&&!/^[+()\d .-]{6,35}$/.test(phone))return json({error:'Please check your WhatsApp number.'},400);
    if(!services.has(service)||!countries.has(country)||!templates.has(template))return json({error:'Please select an available country and template.'},400);
    if(!env.RESEND_API_KEY||!env.RESEND_FROM_EMAIL)return json({error:'Online submissions are not enabled yet. Please email yalla@gulfsufri.com directly.'},503);
    const fields=[['Service',service],['Restaurant',restaurant],['Contact',name],['Email',email||'Not supplied'],['WhatsApp',phone||'Not supplied'],['Country',country],['Preferred template',template],['Project notes',details||'None']];
    const html=`<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto"><h2 style="color:#073c32">New GulfSufra inquiry</h2><p>A restaurant owner submitted an inquiry form.</p><table style="width:100%;border-collapse:collapse">${fields.map(([label,value])=>`<tr><td style="padding:10px;border-bottom:1px solid #ddd;font-weight:bold;vertical-align:top">${escapeHTML(label)}</td><td style="padding:10px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHTML(value)}</td></tr>`).join('')}</table></div>`;
    try{
      const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.RESEND_FROM_EMAIL,to:[recipient],reply_to:email||undefined,subject:`New ${service} Inquiry — ${restaurant}`,html})});
      if(!res.ok){console.error('Resend inquiry failed',res.status);return json({error:'Your inquiry could not be delivered right now. Please try again or email yalla@gulfsufri.com.'},502)}
      return json({ok:true});
    }catch(error){console.error('Inquiry delivery error',String(error));return json({error:'Your inquiry could not be delivered right now. Please email yalla@gulfsufri.com.'},502)}
  }
};
