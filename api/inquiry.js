// GulfSufra Restaurant Websites inquiry endpoint (Vercel Node Function).
// Set RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel project environment variables.
const recipient = 'yalla@gulfsufri.com';
const allowedCountries = new Set(['Qatar','Bahrain','Kuwait','Saudi Arabia','United Arab Emirates','Oman','Other']);
const allowedTemplates = new Set(['Not sure yet','The Spice House','Olive & Thyme','Al Yamama','Ocean Grill','Something custom','Classic Gulf','Modern Elegant','Modern Dark','Light & Fresh']);

const asString=(value,max=250)=>typeof value==='string'?value.trim().slice(0,max):'';
const escapeHtml=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 res.setHeader('Allow','POST');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed.'});
 const body=req.body||{};
 if(typeof body!=='object'||Array.isArray(body))return res.status(400).json({error:'Invalid inquiry.'});
 if(asString(body.website,100))return res.status(200).json({ok:true}); // Honeypot: silent spam rejection
 const restaurant=asString(body.restaurant,120),name=asString(body.name,120),email=asString(body.email,200),phone=asString(body.phone,35),country=asString(body.country,50),template=asString(body.template,60),details=asString(body.details,2000),service=asString(body.service,80)||'Restaurant Websites';
 if(!restaurant||!name||(!email&&!phone))return res.status(400).json({error:'Please include restaurant name, your name, and an email or WhatsApp number.'});
 if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({error:'Please enter a valid email address.'});
 if(phone&&!/^[+()\d .-]{6,35}$/.test(phone))return res.status(400).json({error:'Please check your WhatsApp number.'});
 if(!['Restaurant Websites','Digital Menus','Social Media','Google Business','General Inquiry','Package Consultation'].includes(service)||!allowedCountries.has(country)||!allowedTemplates.has(template))return res.status(400).json({error:'Please select an available country and template.'});
 const key=process.env.RESEND_API_KEY;
 const from=process.env.RESEND_FROM_EMAIL;
 if(!key||!from)return res.status(503).json({error:'Online submissions are not enabled yet. Please email yalla@gulfsufri.com directly.'});
 const fields=[['Service',service],['Restaurant',restaurant],['Contact',name],['Email',email||'Not supplied'],['WhatsApp',phone||'Not supplied'],['Country',country],['Preferred template',template],['Project notes',details||'None']];
 const html=`<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto"><h2 style="color:#073c32">New GulfSufra inquiry</h2><p>A restaurant owner submitted an inquiry form.</p><table style="width:100%;border-collapse:collapse">${fields.map(([label,value])=>`<tr><td style="padding:10px;border-bottom:1px solid #ddd;font-weight:bold;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')}</table></div>`;
 try{
  const response=await fetch('https://api.resend.com/emails',{
   method:'POST',
   headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
   body:JSON.stringify({from,to:[recipient],reply_to:email||undefined,subject:`New ${service} Inquiry — ${restaurant}`,html})
  });
  if(!response.ok){console.error('Resend returned',response.status,await response.text());return res.status(502).json({error:'Your inquiry could not be delivered right now. Please try again or email yalla@gulfsufri.com.'});}
  return res.status(200).json({ok:true});
 }catch(error){console.error('Inquiry delivery error:',error.message);return res.status(502).json({error:'Your inquiry could not be delivered right now. Please email yalla@gulfsufri.com.'});}
}
