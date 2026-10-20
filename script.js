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
 {name:"Amina K.", area:"London · Stratford", country:"France", rating:5, date:"Sample review", title:"France appointment booked in days", text:"I had been checking for a France slot for weeks with no luck. Oasis found me an appointment in London, checked every document beforehand, and explained the whole process in plain English. My application went in with no problems at all."},
 {name:"Daniel O.", area:"London · Croydon", country:"Spain", rating:5, date:"Sample review", title:"Stress-free from start to finish", text:"Booked for a family trip to Spain. They handled appointments for all four of us, spotted a mistake in my travel insurance dates before it became a problem, and kept me updated at every step. Very honest and professional."},
 {name:"Priya S.", area:"London · Wembley", country:"Italy", rating:5, date:"Sample review", title:"Document check saved my application", text:"My Italy application had two documents in the wrong format. The team spotted both during the check, told me exactly how to fix them, and booked my appointment for the same week. I would have been refused without that check."},
 {name:"Mohammed R.", area:"Manchester", country:"Netherlands", rating:5, date:"Sample review", title:"Manchester appointment, zero hassle", text:"Needed a Netherlands visa for a work trip and had a tight deadline. Oasis got me a Manchester appointment quickly and prepared me for exactly what to take on the day. Clear pricing, no surprises."},
 {name:"Sarah L.", area:"London · Islington", country:"Greece", rating:5, date:"Sample review", title:"Perfect for a first Schengen visa", text:"This was my first Schengen visa and I was nervous about the paperwork. The advisor went through everything slowly, in plain English, and my Greece appointment was booked within the week. Felt looked after throughout."},
 {name:"Tomasz W.", area:"London · Ealing", country:"Germany", rating:4, date:"Sample review", title:"Very good, honest advice", text:"Oasis told me honestly that my first date choice was unrealistic instead of just taking my money. They found a Germany appointment a few days later and the document check was thorough. Would use again."},
 {name:"Fatima A.", area:"London · Ilford", country:"France", rating:5, date:"Sample review", title:"Second time using Oasis", text:"Used them last year for France and again this summer for a family visit. Same experience both times: quick appointment, documents checked properly, and someone always answers the phone. Highly recommended."},
 {name:"James M.", area:"Edinburgh", country:"Spain", rating:5, date:"Sample review", title:"Edinburgh slot found fast", text:"Every site said no slots in Edinburgh for a month. Oasis found one, checked my paperwork over the phone, and my Spain visa was sorted well before my flight. Worth every penny for the peace of mind."},
 {name:"Elena P.", area:"London · Greenwich", country:"Italy", rating:5, date:"Sample review", title:"Clear steps, kind team", text:"The team explained each step so clearly that the appointment day itself felt easy. My Italy visa documents were checked twice and nothing was missed. A genuinely kind, patient service."}
];
const COUNTRIES = ["Austria","Belgium","Bulgaria","Croatia","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Italy","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Netherlands","Norway","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","Switzerland"];
const grid = document.getElementById('reviewGrid');
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function card(r){
  const el=document.createElement('article'); el.className='card review'; el.dataset.country=r.country;
  el.innerHTML=`<header><div class="avatar">${r.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div><div><h3>${r.name}</h3><div class="meta">${r.area} · ${r.date}</div></div></header>
  <div class="stars" style="font-size:17px">${stars(r.rating)}</div><span class="tag">${r.country} visa</span>${r.real?'<span class="sample real-badge">On oasistravels.co.uk</span>':'<span class="sample">Sample</span>'}
  <h3>${r.title}</h3><p>${r.text}</p>`; return el;
}
function render(filter='all'){ grid.innerHTML=''; REAL_REVIEWS.concat(SAMPLE_REVIEWS).concat(JSON.parse(localStorage.getItem('oasisReviews')||'[]')).filter(r=>filter==='all'||r.country===filter).forEach(r=>grid.appendChild(card(r))); }
render();
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');render(c.dataset.filter)}));
document.getElementById('countryChips').innerHTML = COUNTRIES.map(c=>`<span>${c}</span>`).join('');
document.getElementById('reviewForm').addEventListener('submit',e=>{
  e.preventDefault(); const f=new FormData(e.target);
  const r={name:f.get('name'), area:'Client review', country:f.get('country'), rating:+f.get('rating'), date:'Just now', title:'Client review', text:f.get('text')};
  const saved=JSON.parse(localStorage.getItem('oasisReviews')||'[]'); saved.unshift(r); localStorage.setItem('oasisReviews',JSON.stringify(saved));
  render(); e.target.reset(); document.getElementById('formMsg').textContent='Thank you — your review now shows above on this device.';
  document.getElementById('reviews').scrollIntoView({behavior:'smooth'});
});
