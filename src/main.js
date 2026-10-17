import './style.css';
import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL, key=import.meta.env.VITE_SUPABASE_ANON_KEY;
const configured=!!(url&&key&&!url.includes('YOUR_PROJECT')&&!key.includes('YOUR_'));
const db=configured?createClient(url,key):null;
const state={page:'home',user:null,profile:null,properties:[],universities:[],slots:[],adverts:[],reviews:[],ownerProperties:[],view:'student',search:{university:'',room:'',minutes:'',budget:7000,nsfas:false,wifi:false,security:false,parking:false},selected:null};
const $=s=>document.querySelector(s), safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])), money=n=>'R'+Number(n||0).toLocaleString('en-ZA');
const icon=()=>'';
const cover=(p,i=0)=>p?.images?.[0] ? `<img src="${safe(p.images[0])}" alt="${safe(p.title)}" loading="lazy"/>` : `<div class="graphic-cover graphic-${i%5}"><span>PROPERTY PHOTO NOT AVAILABLE</span></div>`;

const CONTACT = {
  email: "hello@varsitystay.co.za",
   phone: "+27(79) 503 5111",
  instagram: "https://www.instagram.com/varsity_stay?vrfl=ZnNkbnZtOXR6aGhv&utm_source=qr",
  facebook: "https://www.facebook.com/share/19BF6oCaZr/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@varsitystay1?_r=1&_t=ZS-9AdcEgYfLz2",
  whatsapp: "https://whatsapp.com/channel/0029VbB4XuK89inm0VI6fT0C"
};

function contact() {
  const socialLinks = [
    {
      name: "Instagram",
      url: CONTACT.instagram,
    },
    {
      name: "Facebook",
      url: CONTACT.facebook,
    },
    {
      name: "TikTok",
      url: CONTACT.tiktok,
    },
    {
      name: "X / Twitter",
      url: CONTACT.twitter,
    },
    {
      name: "LinkedIn",
      url: CONTACT.linkedin,
    },
    {
      name: "WhatsApp",
      url: CONTACT.whatsapp,
    }
  ];

  return `
    <div class="contact-page">

      <section class="contact-hero">
        <div class="wrap">
          <p class="contact-eyebrow">
            VARSITYSTAY SUPPORT
          </p>

          <h1>Contact VarsityStay</h1>

          <p>
            Need help finding accommodation, listing a
            property, or using VarsityStay?
            We're here to help.
          </p>
        </div>
      </section>

      <section class="contact-section">
        <div class="wrap contact-columns">

          <div class="contact-details">
            <p class="contact-eyebrow">
              GET IN TOUCH
            </p>

            <h2>How can we help you?</h2>

            <p>
              Whether you're a student looking for a
              place to stay or a landlord wanting to
              advertise, we'd love to hear from you.
            </p>

            <div class="contact-detail">
              <h3>Email us</h3>

              <a href="mailto:${CONTACT.email}">
                ${CONTACT.email}
              </a>
            </div>

            <div class="contact-detail">
              <h3>Call or WhatsApp</h3>
              ${CONTACT.phone.trim() ? `<a href="tel:${safe(CONTACT.phone.replace(/[^+\d]/g,''))}">${safe(CONTACT.phone)}</a><p>For WhatsApp, use the link below once configured.</p>` : `<p>Cellphone number will be available soon.</p>`}
            </div>

            <div class="contact-detail">
              <h3>Follow VarsityStay</h3>

              <div class="contact-socials">
                ${socialLinks.map(social => `
                  ${
                    /^https?:\/\//i.test(social.url)
                      ? `
                        <a
                          href="${safe(social.url)}"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="contact-social"
                        >
                          

                          <span>${social.name}</span>
                        </a>
                      `
                      : `
                        <div class="contact-social disabled">
                          

                          <span>${social.name}</span>
                          <small>Coming soon</small>
                        </div>
                      `
                  }
                `).join("")}
              </div>
            </div>
          </div>

          <div class="contact-form-panel">
            <p class="contact-eyebrow">
              SEND AN ENQUIRY
            </p>

            <h2>Send us a message</h2>

            <form id="varsity-contact-form">

              <label for="contact-name">
                Full name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
              />

              <label for="contact-email">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />

              <label for="contact-subject">
                What is your enquiry about?
              </label>
              <select
                id="contact-subject"
                name="subject"
                required
              >
                <option value="Student accommodation">
                  Student accommodation
                </option>

                <option value="Landlord enquiry">
                  Landlord enquiry
                </option>

                <option value="Account support">
                  Account support
                </option>

                <option value="Advertising">
                  Advertising and partnerships
                </option>

                <option value="General enquiry">
                  General enquiry
                </option>
              </select>

              <label for="contact-message">
                Your message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                minlength="10"
                placeholder="How can we help?"
                required
              ></textarea>

              <button
                type="submit"
                class="contact-submit"
              >
                Open email to send →
              </button>

              <p class="contact-form-note">
                This opens your email application
                with your message ready to send.
              </p>

            </form>
          </div>
        </div>
      </section>

      <section class="contact-navigation">
        <div class="wrap">
          <p class="contact-eyebrow">
            EXPLORE VARSITYSTAY
          </p>

          <h2>Where would you like to go?</h2>

          <div class="contact-page-links">

            <a href="#home" data-nav="home">
              Home 
            </a>

            <a href="#discover" data-nav="discover">
              Find accommodation 
            </a>

            <a href="#universities" data-nav="universities">
              Browse universities 
            </a>

            <a href="#experiences" data-nav="experiences">
              Student experiences 
            </a>

            <a href="#complaints" data-nav="complaints">
              Complaints and support 
            </a>

            <a href="#landlord" data-nav="landlord">
              List your property 
            </a>

          </div>
        </div>
      </section>

    </div>
  `;
}

function notify(msg,type='ok'){const t=document.createElement('div');t.className='toast '+type;t.textContent=msg;document.body.append(t);setTimeout(()=>t.remove(),4500)}
function paint(){document.title=`${state.page==='home'?'Find your place':state.page.replaceAll('-',' ')} · VarsityStay`;$('#app').innerHTML=`${header()}<main>${routes[state.page]?.()||home()}</main>${footer()}${modalShell()}`;attach();}
function nav(page){if(page==='admin'&&state.profile?.role!=='admin'){notify('Administrator access required.','err');return;}if(page==='complaints'&&!requireAccount('student','submit a complaint'))return;state.page=page;history.pushState({page},'',`#${page}`);window.scrollTo(0,0);paint();}
window.addEventListener('popstate',()=>{const requested=location.hash.slice(1)||'home';state.page=requested==='admin'&&state.profile?.role!=='admin'?'home':requested;paint()});
function header(){return `<header class="site-header"><div class="wrap nav"><a class="brand" href="#home" data-nav="home"><img class="site-logo header-logo" src="/logo.jpeg" alt="VarsityStay logo" width="44" height="44"/><span class="brand-name">
    Varsity<span class="brand-highlight">Stay</span>
  </span>
</a><nav class="main-nav"><a href="#discover" data-nav="discover" class="${state.page==='discover'?'active':''}">Explore stays</a><a href="#universities" data-nav="universities" class="${state.page==='universities'?'active':''}">Universities</a><a href="#experiences" data-nav="experiences" class="${state.page==='experiences'?'active':''}">Student voices</a><a href="#complaints" data-nav="complaints" class="${state.page==='complaints'?'active':''}">Complaints</a><a href="#contact" data-nav="contact" class="${state.page==='contact'?'active':''}">Contact</a>${state.profile?.role==='admin'?`<a href="#admin" data-nav="admin" class="${state.page==='admin'?'active':''}">Admin</a>`:''}</nav><div class="nav-actions"><button class="nav-landlord" data-nav="landlord">List your property ${icon('arrow-up-right',15)}</button>${state.user?`<button class="account-btn" data-nav="dashboard">${icon('user-round',16)} My account</button>`:`<button class="account-btn" data-modal="auth">Log in ${icon('arrow-right',15)}</button>`}<button class="mobile-menu" id="mobile-menu" aria-label="Toggle navigation menu">Menu</button></div></div><div class="mobile-nav" id="mobile-nav"><a href="#discover" data-nav="discover">Explore stays</a><a href="#universities" data-nav="universities">Universities</a><a href="#experiences" data-nav="experiences">Student voices</a><a href="#complaints" data-nav="complaints">Complaints</a><a href="#contact" data-nav="contact">Contact</a>${state.profile?.role==='admin'?`<a href="#admin" data-nav="admin">Admin dashboard</a>`:''}<a href="#landlord" data-nav="landlord">List a property</a><a href="#dashboard" data-nav="dashboard">Dashboard</a></div></header>`}
function footer(){return `<footer><div class="wrap footer-grid"><div><a class="brand footer-brand" href="#home" data-nav="home"><img class="site-logo header-logo" src="/logo.jpeg" alt="VarsityStay logo" width="44" height="44"/><span class="footer-wordmark">Varsity<span>Stay</span></span></a><p>Securing your Stay. Securing your Success.<br/>Helping students find better places to call home.</p></div><div><strong>Explore</strong><a href="#discover" data-nav="discover">Find accommodation</a><a href="#universities" data-nav="universities">Browse universities</a><a href="#experiences" data-nav="experiences">Student experiences</a></div><div><strong>For our community</strong><a href="#landlord" data-nav="landlord">List a property</a><a href="#complaints" data-nav="complaints">Report a concern</a><a href="#dashboard" data-nav="dashboard">Your dashboard</a></div><div><strong>Stay connected</strong><p>Built for the next generation of students and property partners.</p><a href="mailto:${safe(CONTACT.email)}">${safe(CONTACT.email)}</a>${CONTACT.phone.trim()?`<a href="tel:${safe(CONTACT.phone.replace(/[^+\d]/g,''))}">${safe(CONTACT.phone)}</a>`:''}</div></div><div class="wrap foot-bottom"><span>© ${new Date().getFullYear()} VarsityStay. All rights reserved.</span><span>Made for student life in South Africa </span></div></footer>`}
function selectUni(val=''){return `<option value="">Any university</option>${state.universities.map(u=>`<option value="${safe(u.id)}" ${val===u.id?'selected':''}>${safe(u.name)}</option>`).join('')}`}
function filterBlock(){const f=state.search;return `<form id="search-form" class="search-panel"><div class="search-eyebrow">${icon('map-pin',14)} YOUR NEXT CHAPTER STARTS HERE</div><div class="filters-row"><label>University<select name="university">${selectUni(f.university)}</select></label><label>Room type<select name="room"><option value="">Any room type</option>${['Single room','Shared room','Studio','Apartment','Bachelor','Ensuite'].map(v=>`<option ${f.room===v?'selected':''}>${v}</option>`).join('')}</select></label><label>Distance to campus<select name="minutes"><option value="">Any distance</option>${[5,10,15,20,30,45,60].map(m=>`<option value="${m}" ${String(f.minutes)===String(m)?'selected':''}>Within ${m} min</option>`).join('')}</select></label></div><div class="budget-block"><div class="budget-top"><span>${icon('wallet',15)} Monthly budget</span><strong id="budget-value">${money(f.budget)}</strong></div><input aria-label="Maximum monthly budget" id="budget" type="range" min="0" max="30000" step="500" value="${f.budget}"/><div class="budget-ends"><span>R0</span><span>R30,000</span></div></div><div class="amenity-row">${[['nsfas','NSFAS-friendly','graduation-cap'],['wifi','Wi-Fi included','wifi'],['security','24/7 security','shield-check'],['parking','Parking','car-front']].map(([id,l,ic])=>`<label class="pill-check"><input type="checkbox" name="${id}" ${f[id]?'checked':''}/>${icon(ic,14)} ${l}</label>`).join('')}</div><button class="btn primary search-btn">${icon('search',17)} Find my stay ${icon('arrow-up-right',17)}</button></form>`}
function home(){return `<section class="hero"><div class="wrap hero-layout"><div class="hero-copy"><div class="eyebrow"><span class="eyedot"></span> STUDENT ACCOMMODATION, MADE CLEAR </div><h1>Securing your Stay.<br/><em>Securing your Success.</em></h1><p>Find student accommodation near your campus. Compare rental prices, explore approved listings and connect with property owners — all in one place.</p><div class="hero-ctas"><button class="btn primary" data-nav="discover">Explore accommodation ${icon('arrow-up-right',17)}</button><button class="btn ghost" data-nav="landlord">I'm a landlord ${icon('arrow-right',16)}</button></div><div class="hero-trust"><span>${icon('badge-check',16)} Verified listings</span><span>${icon('users-round',16)} Student first</span><span>${icon('shield-check',16)} Safer decisions</span></div></div><div class="hero-right"><div class="search-card-head"><span>FIND YOUR FIT</span><span>${icon('sliders-horizontal',17)}</span></div>${filterBlock()}</div></div><div class="hero-bottomline"><span>BUILT FOR STUDENTS. BACKED BY COMMUNITY.</span><span>SCROLL TO EXPLORE ${icon('arrow-down',15)}</span></div></section>${adSection()}<section class="section light"><div class="wrap"><div class="section-heading"><div><div class="micro-label">YOUR PLACE, YOUR PACE</div><h2>Find a space that <em>feels right.</em></h2><p>Explore actual listings from property owners, with the details you need upfront.</p></div><button class="text-link" data-nav="discover">Browse all stays ${icon('arrow-up-right',18)}</button></div>${propertyGrid(state.properties.slice(0,3))}</div></section><section class="section how"><div class="wrap"><div class="section-heading"><div><div class="micro-label">THE SIMPLE WAY HOME</div><h2>Less searching. <em>More living.</em></h2></div></div><div class="steps-grid">${[['01','search','Explore stays','Filter by campus, monthly budget and the essentials that matter to you.'],['02','badge-check','Choose confidently','See details, viewing opportunities and listing verification status.'],['03','key-round','Make it yours','Get in touch, book a viewing or request a room — all in one place.']].map(([n,ic,t,d])=>`<article class="step"><span class="step-num">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div></div></section><section class="split-feature"><div class="wrap split-inner"><div><span class="micro-label on-dark">FOR THE PEOPLE BEHIND THE PROPERTIES</span><h2>Have a space?<br/><em>We have the students.</em></h2><p>Get your property in front of students actively looking for their next home. Manage your listings and enquiries from one dashboard.</p><button class="btn primary" data-nav="landlord">List your accommodation ${icon('arrow-up-right',17)}</button></div><div class="landlord-editorial"><strong>Trusted listings.<br/>Better enquiries.<br/>Practical management.</strong></div></div></section><section class="section light community-teaser"><div class="wrap callout-row"><div><div class="micro-label">HONEST STORIES. BETTER CHOICES.</div><h2>Real students. <em>Real experiences.</em></h2><p>Share what living somewhere was actually like — including places not listed with us. Your experience could help another student.</p><button class="btn dark" data-nav="experiences">Hear from students ${icon('arrow-up-right',17)}</button></div><div class="community-side-note"><span>STUDENT VOICES</span><strong>Know more before you move in.</strong><p>Practical experiences from students help others make informed accommodation choices.</p></div></div></section>`}
function adSection(){return `<section class="ads-section"><div class="wrap"><div class="ads-heading"><div><span class="micro-label">FEATURED SPACES</span><h2>In the spotlight<span class="orange">.</span></h2></div><span class="advert-tag">${icon('megaphone',16)} Sponsored placements</span></div><div class="ad-grid">${state.adverts.length?state.adverts.slice(0,2).map(a=>`<article class="ad-card">${a.image_url?`<img src="${safe(a.image_url)}" alt="Sponsored accommodation"/>`:''}<div class="ad-content"><span>SPONSORED PROPERTY</span><h3>${safe(a.headline)}</h3><p>${safe(a.description)}</p><button class="btn mini" data-open-property="${safe(a.property_id)}">Explore listing ${icon('arrow-right',15)}</button></div></article>`).join(''):`<div class="advert-empty"><span>ADVERTISING SPACE 01</span><h3>Make your property<br/>the first they see.</h3><p>Premium placements for verified accommodation partners.</p><button class="text-link" data-nav="landlord">Enquire about advertising ${icon('arrow-up-right',16)}</button></div><div class="advert-empty second"><span>ADVERTISING SPACE 02</span><h3>Put your best rooms<br/>in the spotlight.</h3><p>Reach students who are already looking for a place to stay.</p><button class="text-link" data-nav="landlord">Promote a property ${icon('arrow-up-right',16)}</button></div>`}</div></div></section>`}
function propertyGrid(arr){return arr.length?`<div class="property-grid">${arr.map((p,i)=>`<article class="property-card"><div class="property-cover">${cover(p,i)}<span class="verification ${p.verified?'yes':''}">${icon(p.verified?'badge-check':'clock-3',13)} ${p.verified?'Verified':'Pending verification'}</span><span class="price-tag">${money(p.monthly_rent)}<small>/mo</small></span></div><div class="property-body"><h3>${safe(p.title)}</h3><p class="location-line">${icon('map-pin',14)} ${safe(p.city||'South Africa')} ${p.walk_minutes!=null?` · ${p.walk_minutes} min to campus`:''}</p><p class="nsfas-label">${p.nsfas_friendly?'NSFAS-friendly':'Student accommodation'}</p><div class="property-chips"><span>${safe(p.room_type)}</span>${p.wifi?'<span>Wi-Fi</span>':''}${p.security?'<span>24/7 security</span>':''}${p.parking?'<span>Parking</span>':''}</div><p class="property-desc">${safe(p.description||'View details, availability and information about this accommodation.')}</p><div class="property-bottom"><button class="details-btn" data-open-property="${safe(p.id)}">View details ${icon('arrow-up-right',16)}</button><button class="btn primary small" data-book="${safe(p.id)}">${icon('calendar',15)} Book / enquire</button></div></div></article>`).join('')}</div>`:`<div class="empty-state">${icon('house-search',42)}<h3>No accommodations published yet</h3><p>Real properties will appear here once landlords create listings and the VarsityStay team approves them. We don't display invented listings.</p><button class="btn dark" data-nav="landlord">Be the first to list ${icon('arrow-up-right',16)}</button></div>`}
function pageHead(k,title,desc){return `<section class="interior-hero"><div class="wrap"><div class="micro-label on-dark">${k}</div><h1>${title}</h1><p>${desc}</p></div></section>`}
function discover(){const f=state.search;const found=state.properties.filter(p=>(!f.university||p.university_id===f.university)&&(!f.room||p.room_type===f.room)&&(!f.minutes||p.walk_minutes<=Number(f.minutes))&&Number(p.monthly_rent)<=Number(f.budget)&&(!f.nsfas||p.nsfas_friendly)&&(!f.wifi||p.wifi)&&(!f.security||p.security)&&(!f.parking||p.parking));return `${pageHead('FIND YOUR PLACE','Accommodation, <em>your way.</em>','Real listings. Thoughtful filters. Your next room is out there.')}<section class="section light"><div class="wrap discover-layout"><aside class="filters-aside">${filterBlock()}</aside><div class="results"><div class="results-head"><h2>Available stays <span>${found.length}</span></h2><p>Showing approved properties within your selected budget.</p></div>${propertyGrid(found)}</div></div></section>`}
function universities(){return `${pageHead('CAMPUS DIRECTORY','Start with <em>your university.</em>','Choose your campus to discover accommodations nearby.')}<section class="section light"><div class="wrap">${state.universities.length?`<div class="uni-grid">${state.universities.map((u,i)=>`<button class="uni-card" data-uni="${safe(u.id)}"><div class="uni-art graphic-${i%5}">${icon('graduation-cap',38)}<span>VARSITYSTAY / CAMPUS</span></div><div class="uni-content"><h3>${safe(u.name)}</h3><p>${icon('map-pin',14)} ${safe(u.city)}</p><div><span>${state.properties.filter(p=>p.university_id===u.id).length} published stays</span>${icon('arrow-up-right',18)}</div></div></button>`).join('')}</div>`:`<div class="empty-state">${icon('graduation-cap',40)}<h3>Our campus directory is being prepared</h3><p>Universities will appear here when an administrator adds them to the database.</p></div>`}</div></section>`}
function landlord(){return `${pageHead('FOR PROPERTY OWNERS','Your space. <em>Their next chapter.</em>','Put your accommodation in front of the students who need it.')}<section class="section light"><div class="wrap landlord-page"><div><div class="micro-label">PARTNER WITH VARSITYSTAY</div><h2>List confidently.<br/><em>Manage simply.</em></h2><p>Create a property profile, upload photos, show amenities, and manage requests in one place. All listings go through a review before going live.</p><div class="landlord-benefits">${[['eye','Find your audience','Reach students looking around your campus.'],['layout-dashboard','One dashboard','Keep your listings, enquiries and viewing times together.'],['badge-check','Earn trust','Apply for property verification through our team.']].map(([ic,t,d])=>`<div>${icon(ic,22)}<span><strong>${t}</strong><small>${d}</small></span></div>`).join('')}</div></div><div class="form-card"><span class="micro-label">GET STARTED</span><h3>Ready to list a property?</h3><p>Create a landlord account to submit your accommodation for approval.</p><button class="btn primary full" ${state.user?'data-nav="dashboard"':'data-modal="landlordAuth"'}>${state.user?'Open landlord dashboard':'Create landlord account'} ${icon('arrow-up-right',16)}</button><small>Listing submissions are reviewed before being publicly displayed.</small><div class="form-divider"></div><h4>Interested in featured placements?</h4><p>We have premium homepage advertising spaces for accommodation partners.</p><a href="mailto:${safe(CONTACT.email)}?subject=VarsityStay%20advertising%20enquiry" class="text-link">Ask about advertising ${icon('arrow-up-right',16)}</a></div></div></section>`}
function experiences(){return `${pageHead('THE STUDENT VOICE','Stayed somewhere?<br/><em>Tell the truth.</em>','Share honest experiences — even if the property has never been listed on VarsityStay.')}<section class="section light"><div class="wrap two-column"><div class="form-card"><div class="micro-label">SHARE YOUR EXPERIENCE</div><h2>Your story matters.</h2><form id="review-form" class="stack-form"><label>Experience type<select name="sentiment" required><option value="recommended">Good experience</option><option value="warning">Warn other students</option></select></label><label>Property / building name<input name="property_name" required maxlength="140" placeholder="Where did you stay?"/></label><label>Suburb / area<input name="area" required placeholder="e.g. Westdene, Bloemfontein"/></label><label>Nearest university<select name="university_id"><option value="">Select university (optional)</option>${state.universities.map(u=>`<option value="${u.id}">${safe(u.name)}</option>`).join('')}</select></label><label>Rating (1–5)<select name="rating" required>${[5,4,3,2,1].map(n=>`<option value="${n}">Rating ${n} of 5</option>`).join('')}</select></label><label>Your experience<textarea name="body" rows="5" minlength="25" required placeholder="What should other students know? Be factual and specific."></textarea></label><label>Landlord / manager contact <span class="private">PRIVATE · ONLY VARSITYSTAY STAFF</span><input name="manager_contact" placeholder="Contact number or email (optional)"/></label><label class="inline-check"><input type="checkbox" name="anonymous" checked/> Post anonymously</label><button class="btn primary full">Submit for review ${icon('arrow-up-right',16)}</button><small>Posts are moderated before publication. Contact details are never displayed publicly.</small></form></div><div><div class="micro-label">FROM OUR COMMUNITY</div><h2>Unfiltered perspectives.</h2>${state.reviews.length?`<div class="reviews">${state.reviews.map(r=>`<div class="review-card"><div><strong>${safe(r.property_name)}</strong><span>${r.rating}/5</span></div><p class="location-line">${icon('map-pin',13)} ${safe(r.area)}</p><span class="sentiment ${r.sentiment}">${r.sentiment==='warning'?'Warning to students':'Recommended'}</span><p>${safe(r.body)}</p><small>Posted ${r.anonymous?'anonymously': 'by a community member'} · Moderated review</small></div>`).join('')}</div>`:`<div class="empty-state compact">${icon('messages-square',35)}<h3>The conversation starts here</h3><p>Approved student experiences will appear here. Be the first to share yours.</p></div>`}</div></div></section>`}
function complaints(){return `${pageHead('YOUR VOICE MATTERS','Something wrong?<br/><em>Speak up.</em>','Report accommodation issues or unfair treatment privately to our team.')}<section class="section light"><div class="wrap two-column"><div class="form-card"><div class="micro-label">CONFIDENTIAL REPORT</div><h2>Submit a complaint.</h2><p>Please provide clear, accurate details so our team can review the concern.</p><form id="complaint-form" class="stack-form"><label>Type of concern<select name="category" required><option value="maintenance">Maintenance / repairs</option><option value="safety">Safety or security</option><option value="payment">Deposit / rent / payment</option><option value="misrepresentation">Misleading listing</option><option value="landlord">Landlord or management conduct</option><option value="other">Other</option></select></label><label>Accommodation / property name<input name="property_name" required maxlength="140" placeholder="Name of the accommodation"/></label><label>City / area<input name="area" required placeholder="City or suburb"/></label><label>Contact email<input type="email" name="contact_email" required placeholder="you@example.com"/></label><label>What happened?<textarea rows="6" name="description" required minlength="30" placeholder="Describe the issue, including dates and steps already taken."></textarea></label><label class="inline-check"><input type="checkbox" name="consent" required/> I confirm this report is accurate to the best of my knowledge.</label><button class="btn primary full">Submit complaint ${icon('arrow-up-right',16)}</button><small>Reports are not published. We cannot guarantee legal resolution or emergency response.</small></form></div><div class="guidance"><div class="micro-label">WHAT HAPPENS NEXT</div><h2>A better student living experience starts with being heard.</h2><div class="guidance-step"><b>01</b><div><h3>Send your report</h3><p>Tell us what happened and where. We store your report securely for review.</p></div></div><div class="guidance-step"><b>02</b><div><h3>We assess the concern</h3><p>Our team reviews the information and may contact you for clarification.</p></div></div><div class="guidance-step"><b>03</b><div><h3>We follow up where possible</h3><p>Issues may lead to a listing review, outreach or signposting to suitable support.</p></div></div><div class="safety-note">${icon('shield-alert',23)}<p><strong>Immediate danger?</strong> Contact local emergency services or campus security. VarsityStay is not an emergency service.</p></div></div></div></section>`}
function dashboard(){if(!state.user)return `${pageHead('YOUR SPACE','Welcome to <em>your dashboard.</em>','Log in to see your accommodation account.')}<div class="wrap section"><div class="empty-state">${icon('lock',36)}<h3>Please sign in first</h3><button class="btn primary" data-modal="auth">Log in or create account</button></div></div>`;const role=state.profile?.role||'student';if(role==='admin')return admin();return `${pageHead('YOUR ACCOUNT',`Hello, <em>${safe(state.profile?.full_name?.split(' ')[0]||'there')}.</em>`,'Everything you need to manage your VarsityStay experience.')}<section class="section light"><div class="wrap"><div class="dash-head"><span class="tag">${safe(role.toUpperCase())} ACCOUNT</span><button class="btn outline" id="logout">${icon('log-out',16)} Sign out</button></div>${role==='landlord'?landlordDash():studentDash()}</div></section>`}
function studentDash(){return `<div class="dash-grid"><div class="dash-side"><h3>${icon('house',18)} My stay</h3><a data-dash-tab="reservations">My reservations</a><a data-dash-tab="viewings">Viewing requests</a><a data-dash-tab="complaints">My complaints</a></div><div class="dash-main" id="dash-data"><h2>My stay</h2><p>View your reservations and accommodation requests.</p><div class="empty-state compact">${icon('calendar-days',36)}<h3>Your journey starts here</h3><p>Browse accommodation and request your first room.</p><button class="btn primary" data-nav="discover">Explore stays ${icon('arrow-right',16)}</button></div></div></div>`}
function landlordDash(){return `<div class="dash-grid"><div class="dash-side"><h3>${icon('building-2',18)} Portfolio</h3><a data-dash-tab="listings">My listings</a><a data-dash-tab="reservations">Room enquiries</a><a data-dash-tab="viewings">Viewing slots</a></div><div class="dash-main" id="dash-data"><div class="dash-main-heading"><div><h2>My properties</h2><p>Manage submissions, availability and enquiries.</p></div><button class="btn primary" data-modal="addListing">${icon('plus',16)} Add listing</button></div><div id="owner-listings"><p class="muted">Loading your listings…</p></div></div></div>`}
function modalShell(){return `<div class="modal-backdrop" id="modal" aria-hidden="true"><div class="modal-panel"><button class="modal-close" id="close-modal" aria-label="Close dialog">Close</button><div id="modal-content"></div></div></div>`}
const routes = {
  home,
  discover,
  universities,
  landlord,
  experiences,
  complaints,
  contact,
  admin,
  dashboard
};
function requireAccount(role,action){
  if(!state.user){notify(`Create an account or log in to ${action}.`,'err');openModal(role==='landlord'?'landlordAuth':'auth');return false}
  if(!state.user.email_confirmed_at){notify('Verify your email address before continuing.','err');return false}
  if(state.profile?.role!==role){notify(`A ${role} account is required to ${action}.`,'err');return false}
  return true
}
function openModal(kind,id){
if(kind==='book'&&!requireAccount('student','request a room or viewing'))return;
if(kind==='addListing'&&!requireAccount('landlord','list accommodation'))return;
const el=$('#modal');let html='';if(kind==='auth'||kind==='landlordAuth'){const isLand=kind==='landlordAuth';html=`<div class="micro-label">WELCOME TO VARSITYSTAY</div><h2 id="auth-title">${isLand?'Start listing':'Good to have you here.'}</h2><p>Create an account or sign in to continue.</p><div class="auth-toggle"><button type="button" data-auth-mode="login" class="selected">Log in</button><button type="button" data-auth-mode="signup">Create account</button></div><form id="auth-form" data-mode="login" class="stack-form"><div id="signup-only" hidden><label>Full name<input name="full_name" placeholder="Your name"/></label><label>I'm joining as<select name="role"><option value="student" ${isLand?'':'selected'}>Student</option><option value="landlord" ${isLand?'selected':''}>Landlord / property owner</option></select></label></div><label>Email address<input name="email" type="email" required autocomplete="email"/></label><label>Password<input name="password" type="password" minlength="8" required autocomplete="current-password"/></label><button class="btn primary full">Continue ${icon('arrow-right',16)}</button><small>New accounts must verify their email before signing in. Never share your password.</small></form>`}
else if(kind==='addListing'){html=`<div class="micro-label">LANDLORD PORTAL</div><h2>Add an accommodation.</h2><p>Listings are reviewed before they appear publicly.</p><form id="listing-form" class="stack-form"><label>Property name<input name="title" required maxlength="140" placeholder="e.g. Campus View Residence"/></label><label>Property description<textarea name="description" required rows="4" minlength="30"></textarea></label><div class="form-two"><label>City<input name="city" required placeholder="Bloemfontein"/></label><label>Area / suburb<input name="suburb" required placeholder="Westdene"/></label></div><label>University<select name="university_id" required><option value="">Select nearest university</option>${state.universities.map(u=>`<option value="${u.id}">${safe(u.name)}</option>`).join('')}</select></label><div class="form-two"><label>Monthly rent (ZAR)<input name="monthly_rent" type="number" min="100" required/></label><label>Walking time to campus (minutes)<input name="walk_minutes" type="number" min="0" max="240" required/></label></div><label>Room type<select name="room_type">${['Single room','Shared room','Studio','Apartment','Bachelor','Ensuite'].map(r=>`<option>${r}</option>`).join('')}</select></label><div class="form-two"><label>Available rooms<input name="available_rooms" type="number" min="0" required value="1"/></label><label>Property contact phone<input name="contact_phone" type="tel" required/></label></div><label>Street address<input name="address" required/></label><div class="checks"><label><input type="checkbox" name="nsfas_friendly"/> NSFAS-friendly</label><label><input type="checkbox" name="wifi"/> Wi-Fi</label><label><input type="checkbox" name="security"/> 24/7 security</label><label><input type="checkbox" name="parking"/> Parking</label></div><label>Property photos (up to 5 images, max 5 MB each)<input id="listing-images" type="file" accept="image/jpeg,image/png,image/webp" multiple/></label><button class="btn primary full">Submit for approval ${icon('arrow-right',16)}</button></form>`}
else if(kind==='property'||kind==='book'){const p=state.properties.find(x=>x.id===id);if(!p)return notify('Property not found','err');state.selected=id;html=`<div class="modal-photo">${cover(p)}</div><span class="micro-label">${p.verified?'VERIFIED':'LISTING DETAILS'}</span><h2>${safe(p.title)}</h2><p>${safe(p.city)} · ${p.walk_minutes} minutes to campus · ${money(p.monthly_rent)} / month</p><p>${safe(p.description)}</p><div class="detail-amenities">${[p.nsfas_friendly?'NSFAS-friendly':null,p.wifi?'Wi-Fi':null,p.security?'24/7 security':null,p.parking?'Parking':null].filter(Boolean).map(s=>`<span>${s}</span>`).join('')}</div>${kind==='property'?`<button class="btn primary full" data-book="${p.id}">Request a room or viewing ${icon('arrow-right',16)}</button>`:`<form class="stack-form" id="reservation-form"><label>Request type<select name="request_type"><option value="room">Reserve a room (request)</option><option value="viewing">Request a viewing</option></select></label><label>Message to property owner<textarea name="message" rows="3" placeholder="Introduce yourself and share your preferred move-in date."></textarea></label><button class="btn primary full">Send request ${icon('arrow-right',16)}</button><small>This sends a request only. No payment is collected at this stage.</small></form>`}`}
$('#modal-content').innerHTML=html;el.classList.add('shown');el.setAttribute('aria-hidden','false');}
function closeModal(){const el=$('#modal');el.classList.remove('shown');el.setAttribute('aria-hidden','true')}
function formObject(form){const f=new FormData(form);return Object.fromEntries(f.entries())}
function attach(){document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();nav(el.dataset.nav)}));document.querySelectorAll('[data-modal]').forEach(el=>el.addEventListener('click',()=>openModal(el.dataset.modal)));document.querySelectorAll('[data-open-property]').forEach(el=>el.addEventListener('click',()=>openModal('property',el.dataset.openProperty)));document.querySelectorAll('[data-book]').forEach(el=>el.addEventListener('click',()=>openModal('book',el.dataset.book)));document.querySelectorAll('[data-uni]').forEach(el=>el.addEventListener('click',()=>{state.search.university=el.dataset.uni;nav('discover')}));$('#mobile-menu')?.addEventListener('click',()=>$('#mobile-nav').classList.toggle('open'));$('#close-modal')?.addEventListener('click',closeModal);$('#modal')?.addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});document.querySelectorAll('#budget').forEach(el=>el.addEventListener('input',()=>{$('#budget-value').textContent=money(el.value);state.search.budget=+el.value}));$('#search-form')?.addEventListener('submit',e=>{e.preventDefault();const f=formObject(e.target);state.search={university:f.university,room:f.room,minutes:f.minutes,budget:+$('#budget').value,nsfas:!!f.nsfas,wifi:!!f.wifi,security:!!f.security,parking:!!f.parking};nav('discover')});$('#review-form')?.addEventListener('submit',reviewSubmit);$('#complaint-form')?.addEventListener('submit',complaintSubmit);$('#logout')?.addEventListener('click',async()=>{await db?.auth.signOut();state.user=null;state.profile=null;nav('home')});document.querySelectorAll('[data-dash-tab]').forEach(b=>b.addEventListener('click',()=>loadDashboardTab(b.dataset.dashTab)));if(state.page==='dashboard'&&state.profile?.role==='landlord')loadDashboardTab('listings');if(state.page==='admin'&&state.profile?.role==='admin')loadAdminData('properties')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-auth-mode]');if(b){const mode=b.dataset.authMode;$('#auth-form').dataset.mode=mode;$('#signup-only').hidden=mode!=='signup';document.querySelectorAll('[data-auth-mode]').forEach(x=>x.classList.toggle('selected',x===b));return}});
document.addEventListener('submit', async e => {
  if (e.target.id === 'auth-form') {
    e.preventDefault();
    if (!db) return notify('Add your Supabase credentials to .env.local first.', 'err');

    const form = e.target;
    const button = form.querySelector('button[type="submit"], button.btn');
    const mode = form.dataset.mode;
    const f = formObject(form);
    const email = String(f.email || '').trim().toLowerCase();
    if (button) button.disabled = true;

    try {
      if (mode === 'signup') {
        const { data, error } = await db.auth.signUp({
          email,
          password: f.password,
          options: {
            emailRedirectTo: `${window.location.origin}/#dashboard`,
            data: {
              full_name: String(f.full_name || '').trim(),
              role: f.role === 'landlord' ? 'landlord' : 'student'
            }
          }
        });
        if (error) return notify(error.message, 'err');

        // With Confirm Email enabled, Supabase normally returns no session.
        // Do not treat a signup response as proof of a verified email.
        if (data.session) await db.auth.signOut();
        state.user = null;
        state.profile = null;
        closeModal();
        notify('Check your email for a verification link before signing in.');
        window.alert(`Check your email\n\nWe sent a verification link to ${email}.\nOpen the link, then return to VarsityStay and log in. Check spam if needed.`);
        return;
      }

      const { data, error } = await db.auth.signInWithPassword({
        email,
        password: f.password
      });
      if (error) return notify(error.message, 'err');
      if (!data.user?.email_confirmed_at) {
        await db.auth.signOut();
        state.user = null;
        state.profile = null;
        return notify('Please verify your email before logging in.', 'err');
      }

      await initSession();
      closeModal();
      notify('Signed in successfully.');
      nav('dashboard');
    } catch (error) {
      notify(error?.message || 'Authentication failed. Please try again.', 'err');
    } finally {
      if (button) button.disabled = false;
    }
    return;
  }

if(e.target.id==='listing-form'){e.preventDefault();if(!requireAccount('landlord','list accommodation'))return;const f=formObject(e.target);const data={owner_id:state.user.id,title:f.title,description:f.description,city:f.city,suburb:f.suburb,university_id:f.university_id,monthly_rent:Number(f.monthly_rent),walk_minutes:Number(f.walk_minutes),room_type:f.room_type,available_rooms:Number(f.available_rooms),contact_phone:f.contact_phone,address:f.address,nsfas_friendly:!!f.nsfas_friendly,wifi:!!f.wifi,security:!!f.security,parking:!!f.parking,status:'pending'};const {data:listing,error}=await db.from('properties').insert(data).select('id').single();if(error)return notify(error.message,'err');const files=[...($('#listing-images')?.files||[])];for(const file of files.slice(0,5)){if(file.size>5*1024*1024||!['image/jpeg','image/png','image/webp'].includes(file.type)){notify('Skipped invalid or oversized image.','err');continue}const name=`${state.user.id}/${listing.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g,'_')}`;const {error:upError}=await db.storage.from('property-images').upload(name,file,{upsert:false,contentType:file.type});if(upError){notify(upError.message,'err');continue}const {data:pub}=db.storage.from('property-images').getPublicUrl(name);await db.from('property_images').insert({property_id:listing.id,url:pub.publicUrl,path:name})}closeModal();notify('Property submitted for review.');loadDashboardTab('listings')}
if(e.target.id==='reservation-form'){e.preventDefault();if(!requireAccount('student','request a room or viewing'))return;const f=formObject(e.target);const {error}=await db.from('reservations').insert({student_id:state.user.id,property_id:state.selected,request_type:f.request_type,message:f.message,status:'requested'});if(error)return notify(error.message,'err');closeModal();notify('Request sent. View its status in your dashboard.')}
});
async function reviewSubmit(e){e.preventDefault();if(!db)return notify('Connect your backend first.','err');if(!state.user)return openModal('auth');const f=formObject(e.target);const {error}=await db.from('student_reviews').insert({author_id:state.user.id,property_name:f.property_name,area:f.area,university_id:f.university_id||null,rating:+f.rating,sentiment:f.sentiment,body:f.body,anonymous:!!f.anonymous,manager_contact:f.manager_contact||null,status:'pending'});if(error)return notify(error.message,'err');e.target.reset();notify('Your experience was submitted for moderation.');}
async function complaintSubmit(e){e.preventDefault();if(!db)return notify('Connect your backend first.','err');if(!requireAccount('student','submit a complaint'))return;const f=formObject(e.target);const {error}=await db.from('complaints').insert({reporter_id:state.user.id,category:f.category,property_name:f.property_name,area:f.area,contact_email:f.contact_email,description:f.description,status:'new'});if(error)return notify(error.message,'err');e.target.reset();notify('Complaint securely submitted for review.');}
async function loadDashboardTab(tab){if(!db||!state.user)return;const c=$('#dash-data');if(!c)return;c.innerHTML='<p class="muted">Loading your account information…</p>';let r,html='';if(tab==='listings'&&state.profile?.role==='landlord'){r=await db.from('properties').select('id,title,status,monthly_rent,available_rooms,created_at').eq('owner_id',state.user.id).order('created_at',{ascending:false});state.ownerProperties=r.data||[];html=`<div class="dash-main-heading"><div><h2>My listings</h2><p>Properties awaiting review are not public.</p></div><button class="btn primary" data-modal="addListing">${icon('plus',16)} Add listing</button></div>${renderTable(r.data,['title','status','monthly_rent','available_rooms'])}`}
else if(tab==='reservations'){r=await db.from('reservations').select('id,request_type,status,created_at,properties(title)').eq(state.profile?.role==='landlord'?'landlord_id':'student_id',state.user.id).order('created_at',{ascending:false});html=`<h2>${state.profile?.role==='landlord'?'Room enquiries':'My reservations'}</h2>${renderTable((r.data||[]).map(x=>({...x,property:x.properties?.title})),['property','request_type','status','created_at'])}`}
else if(tab==='viewings'&&state.profile?.role==='landlord'){const own=await db.from('properties').select('id,title').eq('owner_id',state.user.id);state.ownerProperties=own.data||[];r=await db.from('viewing_slots').select('id,property_id,start_at,end_at,properties(title)').order('start_at',{ascending:false});html=`<h2>Viewing availability</h2><p>Publish real dates and time windows for your properties.</p><form id="viewing-form" class="stack-form viewing-inline"><label>Property<select name="property_id" required>${state.ownerProperties.map(p=>`<option value="${p.id}">${safe(p.title)}</option>`).join('')}</select></label><label>From<input type="datetime-local" name="start_at" required/></label><label>Until<input type="datetime-local" name="end_at" required/></label><button class="btn primary">Publish slot</button></form>${renderTable((r.data||[]).map(x=>({...x,property:x.properties?.title})),['property','start_at','end_at'])}`}
else if(tab==='complaints'){r=await db.from('complaints').select('property_name,category,status,created_at').eq('reporter_id',state.user.id);html=`<h2>My complaints</h2>${renderTable(r.data,['property_name','category','status','created_at'])}`}
else {r=await db.from('reservations').select('id,request_type,status,created_at,properties(title)').eq('student_id',state.user.id).eq('request_type','viewing');html=`<h2>My viewing requests</h2>${renderTable((r.data||[]).map(x=>({...x,property:x.properties?.title})),['property','status','created_at'])}`}
if(r?.error)html=`<div class="empty-state compact"><h3>Couldn't load information</h3><p>${safe(r.error.message)}</p></div>`;c.innerHTML=html;c.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal)));c.querySelector('#viewing-form')?.addEventListener('submit',async e=>{e.preventDefault();const f=formObject(e.target);if(new Date(f.end_at)<=new Date(f.start_at))return notify('The end time must be later than the start.','err');const {error}=await db.from('viewing_slots').insert({owner_id:state.user.id,property_id:f.property_id,start_at:new Date(f.start_at).toISOString(),end_at:new Date(f.end_at).toISOString()});if(error)return notify(error.message,'err');notify('Viewing availability published');loadDashboardTab('viewings')})}

// ADMIN: all writes are also restricted by database row-level security.
const adminStatusOptions={properties:['pending','published','rejected','archived'],reservations:['requested','accepted','declined','cancelled','awaiting_payment','confirmed'],complaints:['new','reviewing','resolved','closed']};
function admin(){
  if(!state.user||state.profile?.role!=='admin')return `${pageHead('RESTRICTED','Admin access only','Sign in with an authorised administrator account.')}<section class="section light"><div class="wrap"><button class="btn primary" data-modal="auth">Sign in</button></div></section>`;
  return `${pageHead('VARSITYSTAY ADMIN','Operations dashboard','Review property submissions, monitor accommodation requests and maintain accurate listing details.')}<section class="section light"><div class="wrap admin-shell"><div class="admin-tabs" role="group" aria-label="Administration sections"><button type="button" data-admin-tab="properties" class="selected">Property approvals</button><button type="button" data-admin-tab="reservations">Applications & enquiries</button><button type="button" data-admin-tab="complaints">Complaints</button></div><div id="admin-content" aria-live="polite"><p>Loading admin records…</p></div></div></section>`;
}
function adminSelect(current,options){return options.map(v=>`<option value="${safe(v)}" ${current===v?'selected':''}>${safe(v.replaceAll('_',' '))}</option>`).join('')}
function adminPropertyRow(p){return `<article class="admin-record"><div class="admin-record-head"><div><h3>${safe(p.title)}</h3><p>${safe(p.suburb)}, ${safe(p.city)} · Submitted ${safe(new Date(p.created_at).toLocaleDateString('en-ZA'))}</p></div><span class="admin-status">${safe(p.status)}</span></div><form class="admin-property-form" data-id="${safe(p.id)}"><div class="admin-form-grid"><label>Monthly rent (R)<input name="monthly_rent" type="number" min="0" step="0.01" value="${safe(p.monthly_rent)}" required></label><label>Available rooms<input name="available_rooms" type="number" min="0" step="1" value="${safe(p.available_rooms)}" required></label><label>Review status<select name="status">${adminSelect(p.status,adminStatusOptions.properties)}</select></label><label>Verification<select name="verified"><option value="false" ${!p.verified?'selected':''}>Not verified</option><option value="true" ${p.verified?'selected':''}>Verified</option></select></label></div><fieldset><legend>Utilities and amenities</legend><div class="admin-checks">${[['wifi','Wi-Fi'],['security','24/7 security'],['parking','Parking'],['nsfas_friendly','NSFAS-friendly']].map(([k,t])=>`<label><input type="checkbox" name="${k}" ${p[k]?'checked':''}> ${t}</label>`).join('')}</div></fieldset><label>Reason for change (required for audit)<textarea name="reason" rows="2" maxlength="500" minlength="5" required placeholder="e.g. Reviewed landlord documentation and confirmed new monthly rent"></textarea></label><button type="submit" class="btn primary">Save property changes</button></form></article>`}
function adminRequestRow(r){return `<article class="admin-record"><div class="admin-record-head"><div><h3>${safe(r.properties?.title||'Accommodation request')}</h3><p>${safe(r.request_type)} · ${safe(new Date(r.created_at).toLocaleString('en-ZA'))}</p><p>${safe(r.message||'No message provided')}</p></div><span class="admin-status">${safe(r.status)}</span></div><form class="admin-status-form" data-kind="reservations" data-id="${safe(r.id)}"><label>Application status<select name="status">${adminSelect(r.status,adminStatusOptions.reservations)}</select></label><label>Reason for change<textarea name="reason" minlength="5" maxlength="500" required></textarea></label><button type="submit" class="btn primary">Update application</button></form></article>`}
function adminComplaintRow(c){return `<article class="admin-record"><div class="admin-record-head"><div><h3>${safe(c.property_name)}</h3><p>${safe(c.category)} · ${safe(c.area)} · ${safe(new Date(c.created_at).toLocaleString('en-ZA'))}</p><p>${safe(c.description)}</p><p>Reply to: <a href="mailto:${safe(c.contact_email)}">${safe(c.contact_email)}</a></p></div><span class="admin-status">${safe(c.status)}</span></div><form class="admin-status-form" data-kind="complaints" data-id="${safe(c.id)}"><label>Complaint status<select name="status">${adminSelect(c.status,adminStatusOptions.complaints)}</select></label><label>Reason for change<textarea name="reason" minlength="5" maxlength="500" required></textarea></label><button type="submit" class="btn primary">Update complaint</button></form></article>`}
async function loadAdminData(kind='properties'){
  if(!db||state.profile?.role!=='admin')return;
  const root=$('#admin-content');if(!root)return;
  document.querySelectorAll('[data-admin-tab]').forEach(x=>x.classList.toggle('selected',x.dataset.adminTab===kind));
  root.innerHTML='<p>Loading records…</p>';
  let q;
  if(kind==='properties')q=db.from('properties').select('id,title,suburb,city,monthly_rent,available_rooms,status,verified,wifi,security,parking,nsfas_friendly,created_at').order('created_at',{ascending:false}).limit(100);
  else if(kind==='reservations')q=db.from('reservations').select('id,request_type,status,message,created_at,properties(title)').order('created_at',{ascending:false}).limit(100);
  else q=db.from('complaints').select('id,property_name,category,area,description,contact_email,status,created_at').order('created_at',{ascending:false}).limit(100);
  const {data,error}=await q;
  if(error){root.innerHTML=`<p role="alert">${safe(error.message)}. Apply the admin SQL migration if permissions are missing.</p>`;return}
  root.innerHTML=`<div class="admin-results-head"><h2>${kind==='properties'?'Property submissions':kind==='reservations'?'Accommodation applications':'Accommodation complaints'}</h2><p>Showing ${data.length} most recent records. All changes are audited.</p></div>${data.length?data.map(kind==='properties'?adminPropertyRow:kind==='reservations'?adminRequestRow:adminComplaintRow).join(''):'<div class="empty-state compact"><h3>No records yet</h3><p>New submissions will appear here.</p></div>'}`;
}
async function submitAdminUpdate(form){
  if(!db||state.profile?.role!=='admin')return notify('Administrator access required.','err');
  const values=formObject(form),id=form.dataset.id,kind=form.classList.contains('admin-property-form')?'properties':form.dataset.kind;
  const reason=String(values.reason||'').trim();if(reason.length<5)return notify('Enter a reason for this change.','err');
  const button=form.querySelector('button[type="submit"]');button.disabled=true;
  try{
    let payload;
    if(kind==='properties'){
      payload={monthly_rent:Number(values.monthly_rent),available_rooms:Number(values.available_rooms),status:values.status,verified:values.verified==='true',wifi:!!values.wifi,security:!!values.security,parking:!!values.parking,nsfas_friendly:!!values.nsfas_friendly};
      if(!Number.isFinite(payload.monthly_rent)||payload.monthly_rent<0||!Number.isInteger(payload.available_rooms)||payload.available_rooms<0||!adminStatusOptions.properties.includes(payload.status))throw new Error('Invalid property values.');
      if(payload.status==='published'&&!payload.verified)throw new Error('Verify the listing before publishing.');
    }else{
      if(!adminStatusOptions[kind]?.includes(values.status))throw new Error('Invalid status.');
      payload={status:values.status};
    }
    const {error}=await db.rpc('admin_update_record',{p_kind:kind,p_id:id,p_changes:payload,p_reason:reason});
    if(error)throw error;
    notify('Saved. Admin change logged.');
    await loadAdminData(kind);
    if(kind==='properties')await fetchPublic();
  }catch(err){notify(err.message||'Unable to save admin change.','err')}finally{button.disabled=false}
}
document.addEventListener('click',e=>{const tab=e.target.closest('[data-admin-tab]');if(tab&&state.profile?.role==='admin')loadAdminData(tab.dataset.adminTab)});
document.addEventListener('submit',e=>{if(e.target.matches('.admin-property-form,.admin-status-form')){e.preventDefault();submitAdminUpdate(e.target)}});

function renderTable(arr,fields){return arr?.length?`<div class="table-scroll"><table class="data-table"><thead><tr>${fields.map(f=>`<th>${f.replaceAll('_',' ')}</th>`).join('')}</tr></thead><tbody>${arr.map(x=>`<tr>${fields.map(f=>`<td>${f==='monthly_rent'?money(x[f]):f==='created_at'||f.endsWith('_at')?safe(x[f]&&new Date(x[f]).toLocaleString('en-ZA')):safe(x[f]??'—')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:`<div class="empty-state compact">${icon('inbox',32)}<h3>Nothing here yet</h3><p>Your account activity will appear here when it's available.</p></div>`}
async function initSession() {
  if (!db) return;
  const { data: { user }, error } = await db.auth.getUser();
  state.user = error || !user?.email_confirmed_at ? null : user;
  state.profile = null;
  if (!state.user) return;
  const { data } = await db.from('profiles').select('*').eq('id',user.id).maybeSingle();
  state.profile = data;
}
async function fetchPublic(){if(!db)return;const [p,u,a,r]=await Promise.all([db.from('properties').select('*,property_images(url)').eq('status','published').order('created_at',{ascending:false}),db.from('universities').select('*').eq('active',true).order('name'),db.from('advertisements').select('*').eq('status','active').lte('starts_on',new Date().toISOString().slice(0,10)).gte('ends_on',new Date().toISOString().slice(0,10)).order('priority',{ascending:false}),db.from('student_reviews').select('property_name,area,rating,sentiment,body,anonymous').eq('status','published').order('created_at',{ascending:false}).limit(10)]);state.properties=(p.data||[]).map(x=>({...x,images:(x.property_images||[]).map(i=>i.url)}));state.universities=u.data||[];state.adverts=a.data||[];state.reviews=r.data||[];}
(async()=>{await Promise.all([initSession(),fetchPublic()]);state.page=location.hash.slice(1)||'home';if(state.page==='admin'&&state.profile?.role!=='admin')state.page='home';paint()})();

document.addEventListener("submit", function (event) {
  if (event.target.id !== "varsity-contact-form") {
    return;
  }

  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);

  const name = data.get("name");
  const email = data.get("email");
  const subject = data.get("subject");
  const message = data.get("message");

  const emailSubject = encodeURIComponent(
    "VarsityStay Enquiry: " + subject
  );

  const emailBody = encodeURIComponent(
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Subject: " + subject + "\n\n" +
    "Message:\n" + message
  );

  window.location.href =
    "mailto:" + CONTACT.email +
    "?subject=" + emailSubject +
    "&body=" + emailBody;
});
