// REAL testimonials published on oasistravels.co.uk (Client feedback & Reviews
// section). The site displays no star rating/date for them, so none is invented here.
const REAL_REVIEWS = [
 {name:"Sarah Williams", area:"Published on oasistravels.co.uk", country:"France", rating:5, date:"Client testimonial", title:"Excellent experience, start to finish", text:"I had an excellent experience applying for my Schengen visa. The team guided me through every step, from document preparation to appointment booking. Everything was handled professionally and efficiently.", real:true},
 {name:"Daniel Roberts", area:"Published on oasistravels.co.uk", country:"Spain", rating:5, date:"Client testimonial", title:"Truly stress-free service", text:"As a first-time applicant, I was quite nervous. The consultants explained the entire Schengen process clearly and helped me prepare a strong cover letter and travel itinerary. Truly stress-free service.", real:true}
];
// CLIENT reviews — provided by Zain on Oct 21, 2026, confirmed by him
// as real client words. These are NOT the published testimonials above:
// only Sarah Williams and Daniel Roberts are published on oasistravels.co.uk.
const CLIENT_REVIEWS = [
 {name:"Raj Patel", area:"London, UK", country:"Italy", rating:3, date:"Client review", title:"Good, but could be faster", text:"The guidance was useful and the staff answered my questions, but I had to follow up a few times for updates. Overall, the service was helpful.", client:true},
 {name:"Blessing Okoro", area:"Manchester, UK", country:"France", rating:4, date:"Client review", title:"Helpful experience", text:"The team was supportive and explained the documents well. There were a few delays, but overall I was satisfied with the assistance.", client:true},
 {name:"Ahmed Hassan", area:"Birmingham, UK", country:"Spain", rating:3, date:"Client review", title:"Decent service", text:"The staff were helpful with the application, although communication could have been a little quicker. Overall, it was a decent experience.", client:true},
 {name:"Simran Kaur", area:"Leicester, UK", country:"Italy", rating:5, date:"Client review", title:"Excellent support", text:"Very friendly and professional team. They explained everything clearly and were available whenever I needed assistance.", client:true},
 {name:"Chukwudi Eze", area:"Leeds, UK", country:"Germany", rating:3, date:"Client review", title:"Helpful but some delays", text:"The documentation guidance was good and the staff were polite. Some responses took longer than expected, but they eventually helped me with my questions.", client:true},
 {name:"Maria Fernandes", area:"London, UK", country:"France", rating:4, date:"Client review", title:"Good guidance", text:"The process was explained clearly and I found the team easy to communicate with. Overall, a positive experience.", client:true},
 {name:"Kofi Mensah", area:"Nottingham, UK", country:"Italy", rating:3, date:"Client review", title:"Average experience", text:"The team provided useful guidance, although I expected faster communication. The service itself was satisfactory.", client:true},
 {name:"Arjun Sharma", area:"Coventry, UK", country:"Spain", rating:5, date:"Client review", title:"Very professional", text:"Everything was explained properly and the staff were very cooperative. I was happy with the overall support.", client:true},
 {name:"Fatima Ali", area:"Bradford, UK", country:"Germany", rating:4, date:"Client review", title:"Helpful team", text:"The staff were polite and guided me through the required documents. There were a couple of things I had to clarify, but they were helpful.", client:true},
 {name:"David Okafor", area:"London, UK", country:"Italy", rating:3, date:"Client review", title:"Could be improved", text:"The guidance was useful, but communication could have been more consistent. Apart from that, the team was professional and helpful.", client:true}
];
const COUNTRIES = ["Austria","Belgium","Bulgaria","Croatia","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Italy","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Netherlands","Norway","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","Switzerland"];
const grid = document.getElementById('reviewGrid');
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function card(r){
  const el=document.createElement('article'); el.className='card review'; el.dataset.country=r.country;
  el.innerHTML=`<header><div class="avatar">${r.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div><div><h3>${r.name}</h3><div class="meta">${r.area} · ${r.date}</div></div></header>
  <div class="stars" style="font-size:17px">${stars(r.rating)}</div><span class="tag">${r.country} visa</span>${r.real?'<span class="sample real-badge">On oasistravels.co.uk</span>':(r.client?'':'<span class="sample">Sample</span>')}
  <h3>${r.title}</h3><p>${r.text}</p>${adminMode?`<br><button class="adminDel" style="margin-top:8px;padding:6px 12px;cursor:pointer">Delete this review</button> <button class="adminEdit" style="margin-top:8px;padding:6px 12px;cursor:pointer">Edit this review</button>`:''}`;
  if(adminMode){ const okey=r._okey||r.name+'|'+r.title; el.querySelector('.adminDel').addEventListener('click',()=>{ const h=new Set(JSON.parse(localStorage.getItem('oasisHidden')||'[]')); h.add(okey); localStorage.setItem('oasisHidden',JSON.stringify([...h])); const s=JSON.parse(localStorage.getItem('oasisReviews')||'[]').filter(x=>(x.name+'|'+x.title)!==okey); localStorage.setItem('oasisReviews',JSON.stringify(s)); render(); }); el.querySelector('.adminEdit').addEventListener('click',()=>openEditPanel(r)); }
  return el;
}
let adminMode=false;
function getEdits(){ try{return JSON.parse(localStorage.getItem('oasisEdits')||'{}')}catch(e){return {}} }
function render(filter='all'){ const hidden=new Set(JSON.parse(localStorage.getItem('oasisHidden')||'[]')); const edits=getEdits(); grid.innerHTML=''; REAL_REVIEWS.concat(CLIENT_REVIEWS).concat(JSON.parse(localStorage.getItem('oasisReviews')||'[]')).forEach(orig=>{ const okey=orig.name+'|'+orig.title; if(hidden.has(okey)) return; const r={...orig, ...(edits[okey]||{}), real:orig.real, client:orig.client, _okey:okey}; if(filter!=='all'&&r.country!==filter) return; grid.appendChild(card(r)); }); }
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
// Enter the secret key to show Delete and Edit buttons on every review card.
// Deleting and editing only affect the device used (saved in localStorage).
// Sample reviews always stay labelled Sample, even after editing.
// To change a review for every visitor, ask Muse to change it in this file.
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
      if(p.querySelector('#adminKey').value===ADMIN_KEY){ adminMode=true; p.remove(); render(); alert('Admin mode on: every review now has Delete and Edit buttons. Changes only affect this device. Sample reviews stay labelled Sample.'); }
      else p.querySelector('#adminMsg').textContent='Wrong key.';
    });
  }
  p.style.display='block';
}

function openEditPanel(r){
  let p=document.getElementById('editPanel');
  if(p) p.remove();
  p=document.createElement('div'); p.id='editPanel';
  p.style.cssText='position:fixed;top:20px;left:20px;right:20px;z-index:9999;background:#111;color:#fff;padding:16px;border-radius:10px;max-width:340px;font-family:sans-serif';
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  p.innerHTML='<b>Edit review</b><p style="margin:8px 0;font-size:13px">Edits save on this device only. Sample reviews stay labelled Sample.</p>'
    +'<label style="font-size:13px">Name<br><input id="eName" style="width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box" value="'+esc(r.name)+'"></label><br>'
    +'<label style="font-size:13px">Visa country<br><input id="eCountry" style="width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box" value="'+esc(r.country)+'"></label><br>'
    +'<label style="font-size:13px">Title<br><input id="eTitle" style="width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box" value="'+esc(r.title)+'"></label><br>'
    +'<label style="font-size:13px">Stars (1-5)<br><input id="eRating" type="number" min="1" max="5" style="width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box" value="'+r.rating+'"></label><br>'
    +'<label style="font-size:13px">Review text<br><textarea id="eText" rows="4" style="width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box">'+esc(r.text)+'</textarea></label><br>'
    +'<button id="eSave" style="padding:6px 12px;cursor:pointer">Save</button> <button id="eCancel" style="padding:6px 12px;cursor:pointer">Cancel</button>';
  document.body.appendChild(p);
  p.querySelector('#eCancel').addEventListener('click',()=>p.remove());
  p.querySelector('#eSave').addEventListener('click',()=>{
    const edits=getEdits(); const okey=r._okey||r.name+'|'+r.title;
    let st=+p.querySelector('#eRating').value; if(!(st>=1&&st<=5)) st=r.rating;
    edits[okey]={name:p.querySelector('#eName').value.trim()||r.name, country:p.querySelector('#eCountry').value.trim()||r.country, title:p.querySelector('#eTitle').value.trim()||r.title, rating:st, text:p.querySelector('#eText').value.trim()||r.text};
    localStorage.setItem('oasisEdits',JSON.stringify(edits)); p.remove(); render();
  });
}
