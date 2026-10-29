import React from 'react';
import { Link } from 'react-router-dom';

const WHOP_CHECKOUT = {
  'first-look': 'https://whop.com/checkout/plan_qMuMe3KczduYK',
  'one-time': {
    'first-bite': 'https://whop.com/checkout/plan_SXdo8nWLP7H7V',
    'main-course': 'https://whop.com/checkout/plan_ZQD8E8kGEv9FH',
    'full-sufra': 'https://whop.com/checkout/plan_39bbWZ35NJfS9'
  },
  'monthly': {
    'first-bite': 'https://whop.com/checkout/plan_Z5qke1c7SwN7H',
    'main-course': 'https://whop.com/checkout/plan_NSztjPcNnn2x9',
    'full-sufra': 'https://whop.com/checkout/plan_LKxqMam1CJIVo'
  }
};
import './pricing.css';

const oneTimePlans = [
  {
    id: 'first-bite',
    number: '01',
    eyebrow: 'THE FIRST BITE',
    name: 'The First Bite',
    subtitle: 'Your restaurant, ready to make a lovely first impression.',
    price: 'QAR 690',
    suffix: 'one-time',
    iconType: 'image',
    icon: '/assets/about-lamp.webp',
    features: [
      'Basic restaurant website (up to 6 pages)',
      'Premium digital menu included',
      'Mobile-friendly design',
      'Free foundational SEO',
      'Facebook & Instagram account setup',
      '2 branded launch posts + handover'
    ],
    cta: 'Get Started'
  },
  {
    id: 'main-course',
    number: '02',
    eyebrow: 'THE MAIN COURSE',
    name: 'The Main Course',
    subtitle: 'A complete digital home for growing restaurants.',
    price: 'QAR 1,490',
    suffix: 'one-time',
    badge: 'MOST POPULAR',
    featured: true,
    iconType: 'image',
    icon: '/assets/pricing-menu-card.png',
    features: [
      'Custom restaurant website (up to 6 pages)',
      'Premium digital menu included',
      'Free foundational SEO',
      'Contact or reservation inquiry setup',
      'Social media profile setup + 5 launch posts',
      'One Meta campaign setup (ad spend separate)',
      '2 months complimentary managed hosting'
    ],
    cta: 'Choose This Plan'
  },
  {
    id: 'full-sufra',
    number: '03',
    eyebrow: 'THE FULL SUFRA',
    name: 'The Full Sufra',
    subtitle: 'A richer launch experience for ambitious restaurants.',
    price: 'QAR 2,490',
    suffix: 'one-time',
    iconType: 'image',
    icon: '/assets/pricing-palace-icon.png',
    features: [
      'Advanced custom website (up to 8 pages)',
      'Premium QR digital menu + booking inquiry',
      'Free foundational SEO + analytics setup',
      'Facebook & Instagram setup + 8 launch posts',
      'One Meta launch campaign + 2 creatives',
      '2 months complimentary enhanced hosting',
      'Google Business Profile setup or optimization',
      'Priority launch handover (ad spend separate)'
    ],
    cta: 'Explore This Plan'
  }
];

const monthlyPlans = [
  {
    id: 'first-bite',
    number: '01',
    eyebrow: 'THE FIRST BITE',
    name: 'The First Bite',
    subtitle: 'Let us keep your restaurant looking fresh online.',
    price: 'QAR 490',
    suffix: '/ month',
    iconType: 'image',
    icon: '/assets/about-lamp.webp',
    features: [
      'Starter website + premium QR digital menu',
      'Free foundational SEO setup',
      '4 designed social posts per month',
      'Facebook & Instagram support',
      'Menu updates + basic website care'
    ],
    cta: 'Get Started'
  },
  {
    id: 'main-course',
    number: '02',
    eyebrow: 'THE MAIN COURSE',
    name: 'The Main Course',
    subtitle: 'A custom website and a steady social presence.',
    price: 'QAR 890',
    suffix: '/ month',
    badge: 'BEST VALUE',
    featured: true,
    iconType: 'image',
    icon: '/assets/pricing-menu-card.png',
    features: [
      'Custom website + premium QR digital menu',
      'Free foundational SEO setup',
      '8 designed posts + 4 edited Reels monthly',
      'Instagram & Facebook management',
      'Menu updates + website care',
      'Monthly performance summary'
    ],
    cta: 'Choose This Plan'
  },
  {
    id: 'full-sufra',
    number: '03',
    eyebrow: 'THE FULL SUFRA',
    name: 'The Full Sufra',
    subtitle: 'Your digital presence, content and ads — taken care of.',
    price: 'QAR 1,490',
    suffix: '/ month',
    iconType: 'image',
    icon: '/assets/pricing-palace-icon.png',
    badge: 'ADS MANAGEMENT INCLUDED',
    features: [
      'Advanced website + premium QR digital menu',
      'Free foundational SEO + website care',
      '12 designed posts + 6 edited Reels monthly',
      'Instagram & Facebook management',
      'One Meta campaign managed at no extra fee',
      'Google Business support + monthly report',
      'Ad spend paid separately to Meta'
    ],
    cta: 'Explore This Plan'
  }
];

const addons = [
  {
    title: 'Managed Hosting & Care',
    price: 'QAR 79 / month',
    detail: 'Optional for First Bite; Main Course includes the first 2 months complimentary.',
    icon: 'server'
  },
  {
    title: 'Enhanced Hosting & Care',
    price: 'QAR 129 / month',
    detail: 'Full Sufra includes its first 2 months complimentary.',
    icon: 'gear'
  },
  {
    title: 'On-Site Photos & Videos',
    price: 'QAR 750',
    detail: 'Professional content at your restaurant.',
    icon: 'camera'
  }
];

const compareColumns = [
  'The First Bite',
  'The Main Course',
  'The Full Sufra'
];

const compareRows = {
  'one-time': [
    ['Website', 'Basic · up to 6 pages', 'Custom · up to 6 pages', 'Advanced · up to 8 pages'],
    ['Premium QR Menu', '●', '●', '●'],
    ['Social Media', 'Setup + 2 posts', 'Setup + 5 posts', 'Setup + 8 posts'],
    ['Meta Ads', '—', 'Campaign setup', 'Launch campaign + 2 creatives'],
    ['Hosting Promotion', 'Optional', '2 months free', '2 months free']
  ],
  monthly: [
    ['Website + Premium QR Menu', '●', '●', '●'],
    ['Monthly Social Content', '4 posts', '8 posts + 4 Reels', '12 posts + 6 Reels'],
    ['Menu Updates + Website Care', '●', '●', '●'],
    ['Meta Ads Management', '—', '—', 'One campaign included'],
    ['Monthly Reporting', '—', 'Summary', 'Full report']
  ]
};

const faqItems = [
  ['Is the advertising budget included?', 'No. Meta ad spend is paid separately. Full Sufra Monthly includes management of one Meta campaign without an additional management fee.'],
  ['Do I have to use your hosting?', 'Not at all. If you already have hosting, we can work with that. Hosting is offered only if you want us to handle it.'],
  ['What does website maintenance include?', 'Maintenance covers backups, updates, security checks, and minor text or image edits within the agreed monthly scope.'],
  ['Can I upgrade or change my plan later?', 'Yes. You can start small and grow into a bigger package as your restaurant expands.'],
  ['What is the difference between one-time and monthly?', 'One-time means a defined setup and launch handover. Monthly means ongoing content, menu updates and website support. Monthly website delivery, cancellation and ownership terms are explained in your proposal. Monthly is not an installment plan.'],
  ['How does the QAR 99 First Look work?', 'We deliver a personalized website and digital menu concept preview within 7 days. It is not a finished site. Upgrade within 14 days after preview delivery and QAR 99 is credited toward your selected package.'],
  ['How long does the grand opening discount last?', 'These are proposed introductory launch prices. Your confirmed proposal specifies the final price, offer eligibility, duration and deliverables before payment.'],
  ['What happens after I make a payment?', 'After payment, we ask a few focused questions, collect the materials we need, and begin shaping everything around your restaurant.']
];

function BulletIcon({ type }) {
  if (type === 'restaurant') return <span className="gp-mini-icon">⌂</span>;
  if (type === 'fee') return <span className="gp-mini-icon">♥</span>;
  return <span className="gp-mini-icon">★</span>;
}

function AddonIcon({ type }) {
  if (type === 'server') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="12" y="12" width="40" height="12" rx="4" />
        <rect x="12" y="28" width="40" height="12" rx="4" />
        <rect x="12" y="44" width="40" height="8" rx="4" />
        <circle cx="20" cy="18" r="2.4" />
        <circle cx="20" cy="34" r="2.4" />
        <circle cx="20" cy="48" r="2.2" />
      </svg>
    );
  }
  if (type === 'gear') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M35 8h-6l-1.8 6.3a19 19 0 0 0-5.4 2.2l-5.8-2.8-4.2 4.2 2.8 5.8a19 19 0 0 0-2.2 5.4L8 29v6l6.3 1.8a19 19 0 0 0 2.2 5.4l-2.8 5.8 4.2 4.2 5.8-2.8a19 19 0 0 0 5.4 2.2L29 56h6l1.8-6.3a19 19 0 0 0 5.4-2.2l5.8 2.8 4.2-4.2-2.8-5.8a19 19 0 0 0 2.2-5.4L56 35v-6l-6.3-1.8a19 19 0 0 0-2.2-5.4l2.8-5.8-4.2-4.2-5.8 2.8a19 19 0 0 0-5.4-2.2L35 8Z" />
        <circle cx="32" cy="32" r="8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="10" y="18" width="44" height="30" rx="5" />
      <path d="M22 18l3-6h14l3 6" />
      <circle cx="23" cy="33" r="4" />
      <path d="M42 25l8 8-8 8" />
    </svg>
  );
}

function PlanIcon({ plan }) {
  if (plan.iconType === 'image') return <img src={plan.icon} alt="" loading="lazy" />;
  return (
    <div className="gp-bars-graphic" aria-hidden="true">
      <span />
      <span />
      <span />
      <i className="gp-palm" />
    </div>
  );
}

function PlanCard({ plan, queryType = 'one-time' }) {
  return (
    <article className={`gp-plan-card${plan.featured ? ' is-featured' : ''}`}>
      <div className="gp-plan-topline">
        <span className="gp-plan-micro">{plan.number} • {plan.eyebrow}</span>
        {plan.badge && <span className="gp-plan-badge">{plan.badge}</span>}
      </div>
      <div className="gp-plan-head">
        <div>
          <h3>{plan.name}</h3>
          <p className="gp-plan-subtitle">{plan.subtitle}</p>
        </div>
        <div className="gp-plan-art"><PlanIcon plan={plan} /></div>
      </div>
      <div className="gp-plan-price-row">
        <div className="gp-plan-price">{plan.price}</div>
        <small>{plan.suffix}</small>
      </div>
      <ul className="gp-feature-list">
        {plan.features.map((feature) => (
          <li key={feature}><span>✓</span>{feature}</li>
        ))}
      </ul>
      <a className={`gp-btn ${plan.featured ? 'gp-btn-gold' : 'gp-btn-outline'}`} href={WHOP_CHECKOUT[queryType][plan.id]}>{plan.cta} <i>→</i></a>
    </article>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = React.useState('one-time');
  const [monthlyPackage, setMonthlyPackage] = React.useState('490');
  const [adSpend, setAdSpend] = React.useState(500);
  const [profitPerOrder, setProfitPerOrder] = React.useState(35);

  const totalMonthlyCost = Number(monthlyPackage) + Number(adSpend);
  const ordersNeeded = Math.ceil(totalMonthlyCost / profitPerOrder);
  const ordersPerDay = Math.ceil(ordersNeeded / 30);

  const jumpTo = (type) => {
    setActiveTab(type);
  };

  return (
    <main className="gp-page">
      <section className="gp-hero">
        <div className="gp-shell gp-hero-shell">
          <div className="gp-hero-copy">
            <span className="gp-kicker">GRAND OPENING • INTRODUCTORY OFFERS</span>
            <div className="gp-launch-pill">✦ Special launch pricing on our restaurant packages</div>
            <h1>Choose Your <em>Recipe for Success.</em></h1>
            <p>
              Whether you're just getting started or ready to grow, we have the perfect mix of digital
              services to help your restaurant shine. Launch-friendly prices. Real value. Delicious results.
            </p>
            <div className="gp-hero-points">
              <span><BulletIcon type="restaurant" />Built for Restaurants</span>
              <span><BulletIcon type="fee" />No Hidden Fees</span>
              <span><BulletIcon type="mix" />Flexible Options</span>
            </div>
          </div>

          <div className="gp-hero-visual" aria-label="Sufri presenting pricing options">
            <img className="gp-sufri" src="/assets/pricing-sufri-chef.png" alt="Sufri on his magic carpet" />
            
            <div className="gp-speech-bubble">Good marketing is like a great meal... There's a perfect recipe for everyone!</div>
          </div>
        </div>
      </section>

      <div className="gp-body">
        <section className="gp-shell gp-first-look" aria-label="Seven-day First Look offer">
          <div>
            <span className="gp-kicker">NOT SURE YET? HAVE A LITTLE TASTE.</span>
            <h2>Your First Look at the Magic — <em>QAR 99.</em></h2>
            <p>Get a personalized website and premium QR menu concept preview within 7 days. Upgrade within 14 days of delivery and we'll credit your QAR 99 toward your package.</p>
            <small>A concept preview, not a completed website.</small>
          </div>
          <a className="gp-btn gp-btn-gold" href={WHOP_CHECKOUT['first-look']}>Show Me the Magic <i>→</i></a>
        </section>
        <section className="gp-tabs-wrap" aria-label="Choose how we help your restaurant">
          <div className="gp-shell">
          <div className="gp-tabs" role="tablist" aria-label="Pricing categories">
            <button className={activeTab === 'one-time' ? 'is-active' : ''} onClick={() => jumpTo('one-time')} role="tab" aria-selected={activeTab === 'one-time'}>
              <span className="gp-tab-icon">✦</span>
              <span>
                <strong>One-Time Magic</strong>
                <small>Do it for me once</small>
              </span>
            </button>
            <button className={activeTab === 'monthly' ? 'is-active' : ''} onClick={() => jumpTo('monthly')} role="tab" aria-selected={activeTab === 'monthly'}>
              <span className="gp-tab-icon">✦</span>
              <span>
                <strong>Monthly Momentum</strong>
                <small>Take care of me every month</small>
              </span>
            </button>
          </div>
          </div>
        </section>
        <section className="gp-shell gp-box gp-section gp-plans-section" id="gp-pricing-plans">
          <div className="gp-section-head">
            <div>
              <span className="gp-kicker">{activeTab === 'one-time' ? 'ONE-TIME SERVICES • GRAND OPENING PRICES' : 'MONTHLY SERVICES • FOUNDING RESTAURANT RATES'}</span>
              <h2>{activeTab === 'one-time' ? <>Set It Up. <em>Make It Yours.</em></> : <>We'll Keep the <em>Magic Going.</em></>}</h2>
            </div>
            <p>{activeTab === 'one-time' ? 'Website, premium QR menu, social profiles and launch content — one clear price, one happy handover.' : 'The same three restaurant packages, with ongoing content, website care and menu updates. No installment plan.'}</p>
          </div>
          <div className="gp-offer-banner"><strong>✦ Grand Opening Special</strong><span>{activeTab === 'one-time' ? 'Proposed launch prices start at QAR 690 — premium digital menu included in every plan.' : 'Proposed founding-restaurant rates start at QAR 490/month. Premium Meta Ads management included in Full Sufra; ad spend separate.'}</span></div>
          <div className="gp-card-grid three-up" key={activeTab}>
            {(activeTab === 'one-time' ? oneTimePlans : monthlyPlans).map(plan => <PlanCard key={plan.id} plan={plan} queryType={activeTab} />)}
          </div>
          <p className="gp-pricing-disclaimer">Proposed introductory prices, subject to confirmation before purchase. First Bite website has up to 6 basic pages, without a payment gateway or online checkout. Premium QR menus are included in every plan. One-time packages cover setup and limited launch work; monthly packages cover ongoing services, not installment payments. Main Course hosting: first 2 months free, then optional QAR 79/month. Full Sufra hosting: first 2 months free, then optional QAR 129/month. First Bite managed hosting: optional QAR 79/month from activation. Clients may use their own hosting. Ad spend, on-site production and additional revisions are separate. Monthly website delivery and ownership terms will be confirmed in writing before purchase.</p>
        </section>

        <section className="gp-shell gp-box gp-section gp-addons">
          <div className="gp-section-head compact">
            <div>
              <span className="gp-kicker">OPTIONAL ADD-ONS</span>
              <h2>Make It Even <em>Better.</em></h2>
            </div>
            <p>Add hosting or website maintenance based on your needs.</p>
          </div>
          <div className="gp-addon-grid">
            {addons.map((addon) => (
              <article className="gp-addon-card" key={addon.title}>
                <div className="gp-addon-icon"><AddonIcon type={addon.icon} /></div>
                <div>
                  <h3>{addon.title}</h3>
                  <strong>From {addon.price}</strong>
                  <p>{addon.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gp-shell gp-box gp-section">
          <div className="gp-section-head compact">
            <div>
              <span className="gp-kicker">QUICK COMPARISON</span>
              <h2>Find the Right <em>Mix for You.</em></h2>
            </div>
          </div>
          <div className="gp-compare-wrap">
            <table className="gp-compare-table">
              <thead>
                <tr>
                  <th></th>
                  {compareColumns.map((col, index) => (
                    <th key={col} className={index === 1 ? 'is-highlight' : ''}>
                      <span>{col}</span>
                      {index === 1 && <small>Most Popular</small>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows[activeTab].map((row) => (
                  <tr key={row[0]}>
                    <th>{row[0]}</th>
                    {row.slice(1).map((cell, idx) => (
                      <td key={idx} className={idx === 1 ? 'is-highlight' : ''}>{cell === '●' ? <span className="gp-check-dot">●</span> : cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="gp-shell gp-box gp-section gp-calculator">
          <div className="gp-calculator-art">
            <img src="/assets/pricing-marina-crab.png" alt="Marina and her crab helping with restaurant growth" />
            <div className="gp-thought">Let's do some quick math, habibi! See how many extra diners you need to make it a delicious success.</div>
          </div>
          <div className="gp-calculator-panel">
            <span className="gp-kicker">RESTAURANT GROWTH CALCULATOR</span>
            <h2>How Many Extra <em>Orders?</em></h2>
            <p>See how many additional orders you need to cover your monthly marketing investment. Ad spend is paid separately to the advertising platform.</p>
            <div className="gp-calc-row gp-top-calc">
              <label>
                <span>Monthly Package Fee</span>
                <select value={monthlyPackage} onChange={(e) => setMonthlyPackage(e.target.value)}>
                  <option value="490">The First Bite — QAR 490</option>
                  <option value="890">The Main Course — QAR 890</option>
                  <option value="1490">The Full Sufra — QAR 1,490</option>
                </select>
              </label>
              <div className="gp-calc-operator">+</div>
              <label>
                <span>Ad Spend (Estimated)</span>
                <div className="gp-calc-slider-control">
                  <strong>QAR {adSpend.toLocaleString()}</strong>
                  <input aria-label="Estimated monthly advertising spend in QAR" type="range" min="300" max="3000" step="100" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value))} />
                </div>
              </label>
              <div className="gp-calc-operator">=</div>
              <div className="gp-total-box">
                <span>Total Monthly Cost</span>
                <strong>QAR {totalMonthlyCost.toLocaleString()}</strong>
              </div>
            </div>
            <div className="gp-calc-row gp-bottom-calc">
              <label className="gp-slider-box">
                <span>Profit per Extra Order</span>
                <strong>QAR {profitPerOrder}</strong>
                <input type="range" min="15" max="100" step="5" value={profitPerOrder} onChange={(e) => setProfitPerOrder(Number(e.target.value))} />
              </label>
              <div className="gp-result-box">
                <span>You Need About</span>
                <strong>{ordersNeeded}</strong>
                <p>Extra Orders Per Month <small>({ordersPerDay} extra orders per day)</small></p>
              </div>
            </div>
            <p className="gp-calculator-disclaimer">This is a break-even illustration, not a prediction or guarantee of results. Profit per order means the amount left after variable costs.</p>
          </div>
        </section>

        <section className="gp-shell gp-section gp-simple-steps">
          <div className="gp-steps-topline">
            <div>
              <span className="gp-kicker">SIMPLE STEPS</span>
              <h2>From Click to <em>Delicious Results.</em></h2>
            </div>
            <p>Get started in just a few simple steps. Detailed questions come after payment.</p>
          </div>
          <div className="gp-step-row">
            <article><span className="gp-step-num">1</span><h3>Choose Your Plan</h3><p>Pick the perfect mix for your restaurant.</p></article>
            <i>→</i>
            <article><span className="gp-step-num">2</span><h3>Pay Securely</h3><p>Complete your payment online.</p></article>
            <i>→</i>
            <article><span className="gp-step-num">3</span><h3>Tell Us About You</h3><p>Answer a few questions after checkout.</p></article>
            <i>→</i>
            <article><span className="gp-step-num">4</span><h3>We Do the Magic</h3><p>Sit back while we bring your vision to life.</p></article>
          </div>
        </section>

        <section className="gp-shell gp-box gp-section gp-faq-cta">
          <div className="gp-faq-column">
            <span className="gp-kicker">GOOD QUESTIONS, GOOD ANSWERS</span>
            <h2>A Few Things <em>Worth Knowing.</em></h2>
            <p>Everything you need to know before getting started.</p>
          </div>
          <div className="gp-faq-list">
            {faqItems.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <div className="gp-side-cta">
            <span className="gp-kicker">READY TO GET STARTED?</span>
            <h3>Your Restaurant. <em>Your Perfect Mix.</em></h3>
            <p>Let's create a customised plan for your restaurant. Tell us a bit about your needs and we'll recommend the best options.</p>
            <Link className="gp-btn gp-btn-gold" to="/contact?pricing=tailored">Get My Tailored Quote <i>→</i></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
