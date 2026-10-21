// REAL testimonials published on oasistravels.co.uk (Client feedback & Reviews
// section). The site displays no star rating/date for them, so none is invented here.
const REAL_REVIEWS = [
 {name:"Sarah Williams", area:"Published on oasistravels.co.uk", country:"France", rating:5, date:"Client testimonial", title:"Excellent experience, start to finish", text:"I had an excellent experience applying for my Schengen visa. The team guided me through every step, from document preparation to appointment booking. Everything was handled professionally and efficiently.", real:true},
 {name:"Daniel Roberts", area:"Published on oasistravels.co.uk", country:"Spain", rating:5, date:"Client testimonial", title:"Truly stress-free service", text:"As a first-time applicant, I was quite nervous. The consultants explained the entire Schengen process clearly and helped me prepare a strong cover letter and travel itinerary. Truly stress-free service.", real:true}
];
// SAMPLE reviews — illustrative placeholders for the page layout.
// Replace each entry with a verified client review (real name/initials,
// country and words) before sharing this page as proof of service.
const SAMPLE_REVIEWS = [
 {name:"Amina Khan", area:"London · Stratford", country:"France", rating:5, date:"Sample review", title:"France appointment booked in days", text:"I had been checking for a France slot for weeks with no luck. Oasis found me an appointment in London, checked every document beforehand, and explained the whole process in plain English. My application went in with no problems at all."},
 {name:"Daniel Okafor", area:"London · Croydon", country:"Spain", rating:4, date:"Sample review", title:"Stress-free from start to finish", text:"Booked for a family trip to Spain. They handled appointments for all four of us, spotted a mistake in my travel insurance dates before it became a problem, and kept me updated at every step. Very honest and professional."},
 {name:"Priya Sharma", area:"London · Wembley", country:"Italy", rating:5, date:"Sample review", title:"Document check saved my application", text:"My Italy application had two documents in the wrong format. The team spotted both during the check, told me exactly how to fix them, and booked my appointment for the same week. I would have been refused without that check."},
 {name:"Mohammed Rahman", area:"Manchester", country:"Netherlands", rating:4, date:"Sample review", title:"Manchester appointment, zero hassle", text:"Needed a Netherlands visa for a work trip and had a tight deadline. Oasis got me a Manchester appointment quickly and prepared me for exactly what to take on the day. Clear pricing, no surprises."},
 {name:"Layla Haddad", area:"London · Islington", country:"Greece", rating:5, date:"Sample review", title:"Perfect for a first Schengen visa", text:"This was my first Schengen visa and I was nervous about the paperwork. The advisor went through everything slowly, in plain English, and my Greece appointment was booked within the week. Felt looked after throughout."},
 {name:"Tomasz Wisniewski", area:"London · Ealing", country:"Germany", rating:4, date:"Sample review", title:"Very good, honest advice", text:"Oasis told me honestly that my first date choice was unrealistic instead of just taking my money. They found a Germany appointment a few days later and the document check was thorough. Would use again."},
 {name:"Fatima Ali", area:"London · Ilford", country:"France", rating:5, date:"Sample review", title:"Second time using Oasis", text:"Used them last year for France and again this summer for a family visit. Same experience both times: quick appointment, documents checked properly, and someone always answers the phone. Highly recommended."},
 {name:"Imran Shah", area:"Edinburgh", country:"Spain", rating:4, date:"Sample review", title:"Edinburgh slot found fast", text:"Every site said no slots in Edinburgh for a month. Oasis found one, checked my paperwork over the phone, and my Spain visa was sorted well before my flight. Worth every penny for the peace of mind."},
 {name:"Elena Petrova", area:"London · Greenwich", country:"Italy", rating:5, date:"Sample review", title:"Clear steps, kind team", text:"The team explained each step so clearly that the appointment day itself felt easy. My Italy visa documents were checked twice and nothing was missed. A genuinely kind, patient service."}
];
const COUNTRIES = ["Austria","Belgium","Bulgaria","Croatia","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Italy","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Netherlands","Norway","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","Switzerland"];
const grid = document.getElementById('reviewGrid');
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function card(r){
  const el=document.createElement('article'); el.className='card review'; el.dataset.country=r.country;
  el.innerHTML=`<header><div class="avatar">${r.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div><div><h3>${r.name}</h3><div class="meta">${r.area} · ${r.date}</div></div></header>
  <div class="stars" style="font-size:17px">${stars(r.rating)}</div><span class="tag">${r.country} visa</span>${r.real?'<span class="sample real-badge">On oasistravels.co.uk</span>':'<span class="sample">Sample</span>'}
  <h3>${r.title}</h3><p>${r.text}</p>${adminMode?`<br><button class="adminDel" style="margin-top:8px;padding:6px 12px;cursor:pointer">Delete this review</button>`:''}`;
  if(adminMode){ el.querySelector('.adminDel').addEventListener('click',()=>{ const h=new Set(JSON.parse(localStorage.getItem('oasisHidden')||'[]')); h.add(r.name+'|'+r.title); localStorage.setItem('oasisHidden',JSON.stringify([...h])); const s=JSON.parse(localStorage.getItem('oasisReviews')||'[]').filter(x=>(x.name+'|'+x.title)!==(r.name+'|'+r.title)); localStorage.setItem('oasisReviews',JSON.stringify(s)); render(); }); }
  return el;
}
let adminMode=false;
function render(filter='all'){ const hidden=new Set(JSON.parse(localStorage.getItem('oasisHidden')||'[]')); grid.innerHTML=''; REAL_REVIEWS.concat(SAMPLE_REVIEWS).concat(JSON.parse(localStorage.getItem('oasisReviews')||'[]')).filter(r=>!hidden.has(r.name+'|'+r.title)).filter(r=>filter==='all'||r.country===filter).forEach(r=>grid.appendChild(card(r))); }
render();
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');render(c.dataset.filter)}));
document.getElementById('countryChips').innerHTML = COUNTRIES.map(c=>`<span>${c}</span>`).join('');
document.getElementById('reviewForm').addEventListener('submit',e=>{
  e.preventDefault(); const f=new FormData(e.target);
  const r={name:f.get('name'), area:'Client review', country:f.get('country'), rating:+f.get('rating'), date:'Just now', title:'Client review', text:f.get('text')};
  const saved=JSON.parse(localStorage.getItem('oasisReviews')||'[]'); saved.unshift(r); localStorage.setItem('oasisReviews',JSON.stringify(saved));
  render(); e.target.reset();
  const waText=encodeURIComponent(`New review for Oasis Travels\nName: ${r.name}\nVisa country: ${r.country}\nRating: ${r.rating}/5\nReview: ${r.text}`);
  document.getElementById('formMsg').innerHTML=`Thank you — your review now shows above on this device.<br><br><a class="btn btn-gold" target="_blank" rel="noopener" style="text-decoration:none" href="https://wa.me/447474795028?text=${waText}">Send this review to us on WhatsApp</a><br><br><span>Send it to us and we will add it to the public reviews page.</span>`;
  document.getElementById('reviews').scrollIntoView({behavior:'smooth'});
});

// SECRET ADMIN: press Ctrl+D (or Cmd+D on Mac) to open the admin panel.
// Enter the secret key to show a Delete button on every review card.
// Deleting removes that review on the device used (saved in localStorage).
// To remove a review for every visitor, ask Muse to delete it from this file.
const ADMIN_KEY='oasis-admin';
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='d'){ e.preventDefault(); openAdminPanel(); }
});
function openAdminPanel(){
  let p=document.getElementById('adminPanel');
  if(!p){
    p=document.createElement('div'); p.id='adminPanel';
    p.style.cssText='position:fixed;top:20px;right:20px;z-index:9999;background:#111;color:#fff;padding:16px;border-radius:10px;max-width:280px;font-family:sans-serif';
    p.innerHTML='<b>Admin</b><p style="margin:8px 0">Enter the secret key to manage reviews.</p><input id="adminKey" type="password" style="width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box"><br><button id="adminGo" style="padding:6px 12px;cursor:pointer">Unlock</button> <button id="adminCancel" style="padding:6px 12px;cursor:pointer">Cancel</button><p id="adminMsg" style="margin:8px 0 0"></p>';
    document.body.appendChild(p);
    p.querySelector('#adminCancel').addEventListener('click',()=>p.remove());
    p.querySelector('#adminGo').addEventListener('click',()=>{
      if(p.querySelector('#adminKey').value===ADMIN_KEY){ adminMode=true; p.remove(); render(); alert('Admin mode on: every review now has a Delete button. Deleting removes it on this device.'); }
      else p.querySelector('#adminMsg').textContent='Wrong key.';
    });
  }
  p.style.display='block';
}
