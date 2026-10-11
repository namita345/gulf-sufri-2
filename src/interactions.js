export function initInteractions() {
const cards=[...document.querySelectorAll('.service-card')];
const poses={website:document.querySelector('.pose-website'),menu:document.querySelector('.pose-menu'),social:document.querySelector('.pose-social'),google:document.querySelector('.pose-google'),neutral:document.querySelector('.pose-neutral')};
const bubble=document.querySelector('.sufri-bubble');
const copy={
  neutral:{title:'Pick a service, Habibi.',text:'I’ll show you what we can do.'},
  website:{title:'Your restaurant deserves a website as good as your food.',text:'Beautiful, fast and built to turn visits into bookings.',cta:'Build My Website'},
  menu:{title:'No more boring PDFs, Habibi.',text:'Give every guest a beautiful menu they can open anywhere.',cta:'Get My Digital Menu'},
  social:{title:'Your food looks this good?',text:'Let’s make sure people see it — and remember it.',cta:'Grow My Social'},
  google:{title:'They’re searching for dinner.',text:'Let’s make sure your restaurant is the one they find.',cta:'Improve My Google Presence'}
};
function setHost(key){
  Object.entries(poses).forEach(([name,img])=>img&&img.classList.toggle('active',name===key));
  const c=copy[key]||copy.neutral;
  bubble.innerHTML='<strong>'+c.title+'</strong><span>'+c.text+'</span>'+(c.cta?'<a href="#contact">'+c.cta+' <i>→</i></a>':'');
}
cards.forEach(card=>{
  const key=card.dataset.service;
  const activate=()=>{cards.forEach(c=>c.classList.remove('is-hovered'));card.classList.add('is-hovered');setHost(key)};
  const reset=()=>{card.classList.remove('is-hovered');setHost('neutral')};
  card.addEventListener('mouseenter',activate);
  card.addEventListener('focusin',activate);
  card.addEventListener('mouseleave',reset);
  card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget))reset()});
});
setHost('neutral');

// Interactions for the new 
// Interactions for the new section only.
const plateRows=[...document.querySelectorAll('.plate-service')];
const plateBubble=document.querySelector('#plate-bubble-text');
const plateSufri=document.querySelector('.plate-sufri');
const plateLines={website:'Let’s give your restaurant a website worth visiting.',menu:'Your menu deserves to look as good as your food.',social:'Let’s give people a reason to crave your food.',google:'Let’s help hungry customers find you.',support:'You focus on the kitchen. I’ll watch over the digital side.'};
const platePoses={website:'//assets/sufri-presenting.png',menu:'//assets/sufri-thinking.png',social:'//assets/sufri-presenting.png',google:'//assets/sufri-approval.png',support:'//assets/sufri-thinking.png'};
function activatePlateRow(row){plateRows.forEach(item=>{const active=item===row;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active));});if(plateSufri){const next=platePoses[row.dataset.plateService]||plateSufri.dataset.defaultSrc;if(plateSufri.getAttribute('src')!==next){plateSufri.style.opacity='0';window.setTimeout(()=>{plateSufri.setAttribute('src',next);plateSufri.style.opacity='1';},140);}}if(plateBubble){plateBubble.style.opacity='0';window.setTimeout(()=>{plateBubble.textContent=plateLines[row.dataset.plateService]||plateLines.website;plateBubble.style.opacity='1';},120);}}
plateRows.forEach(row=>{row.addEventListener('mouseenter',()=>activatePlateRow(row));row.addEventListener('focus',()=>activatePlateRow(row));row.addEventListener('click',()=>activatePlateRow(row));});

}
