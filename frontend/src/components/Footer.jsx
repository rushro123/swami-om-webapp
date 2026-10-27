import { NavLink } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Home',     to: '/'      },
  { label: 'About Us', to: '/about' },
]

const s = {
  footer: {
    background: '#fff1ea',
    borderTop: '1px solid #e1bfb5',
    padding: '3rem 0 1.5rem',
    fontFamily: 'Noto Sans, sans-serif',
    color: '#59413a',
  },
  inner: { maxWidth: 1200, margin: '0 auto', padding: '0 2rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2.5rem',
  },
  brand: { display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' },
  heading: { fontFamily: 'Epilogue, sans-serif', fontWeight: 700, fontSize: 17, color: '#9b2f00' },
  subtitle: { fontSize: 10, color: '#7d5800', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' },
  colTitle: { fontFamily: 'Epilogue, sans-serif', fontWeight: 600, fontSize: 14, color: '#261910', marginBottom: '0.75rem' },
  link: { display: 'block', fontSize: 13, color: '#59413a', textDecoration: 'none', marginBottom: '0.4rem', transition: 'color 0.2s' },
  contactRow: { display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', fontSize: 13 },
  disclaimer: {
    background: '#ffeade', border: '1px solid #e1bfb5',
    borderRadius: '0.75rem', padding: '0.875rem',
    fontSize: 12, lineHeight: 1.6,
  },
  bottom: {
    borderTop: '1px solid #e1bfb5', paddingTop: '1rem',
    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
    alignItems: 'center', gap: '0.5rem',
    fontSize: 12, color: '#8d7168',
  },
}

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.grid}>
          {/* Brand */}
          <div>
            <div style={s.brand}>
              <img
                src="/Gemini_Generated_Image_rxijsrrxijsrrxij.svg"
                alt="Logo"
                style={{ height: 40, width: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ffdbd0' }}
              />
              <span>
                <div style={s.heading}>Swami Om</div>
                <div style={s.subtitle}>Tiffin Service · Pune</div>
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Wholesome homemade Maharashtrian vegetarian and non-vegetarian meals prepared daily with fresh produce, thoughtful spices, and traditional culinary warmth.
            </p>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 12, color: '#246131', fontWeight: 600 }}>
              ✓ 100% Homestyle Clean Cooking
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <div style={s.colTitle}>Quick Links</div>
            {QUICK_LINKS.map(l => (
              <NavLink key={l.to} to={l.to} style={s.link}>{l.label}</NavLink>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={s.colTitle}>Contact & Delivery</div>
            <div style={s.contactRow}><span>📞</span><span>+91 97633 55563</span></div>
            <div style={s.contactRow}><span>💬</span><span>WhatsApp: +91 97633 55563</span></div>
            <div style={s.contactRow}>
              <span>🕐</span>
              <span>Lunch: 11:30 AM – 2:30 PM<br/>Dinner: 7:00 PM – 10:00 PM</span>
            </div>
            <div style={s.contactRow}><span>📍</span><span> Pirangut, Pune · Delivery within 7 km</span></div>
            <div style={s.contactRow}><span>📍</span><span> Hadapsar, Pune · Delivery within 7 km</span></div>
          </div>

          {/* Disclaimer */}
          <div>
            <div style={s.colTitle}>Service Disclaimer</div>
            <div style={s.disclaimer}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Daily Changing Menus:</strong> Our tiffin dishes vary daily to ensure balanced nutrition and authentic freshness.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Veg & Non-Veg Options:</strong> Vegetarian and non-vegetarian meals are prepared fresh with menu ingredients clearly communicated. Please share dietary preferences when ordering.
              </p>
            </div>
          </div>
        </div>

        <div style={s.bottom}>
          <span>© 2024 Swami Om Tiffin Service. All rights reserved.</span>
          <span style={{ color: '#7d5800', fontWeight: 600 }}>Veg & Non-Veg Homestyle Comfort · Delivered Daily · Pune</span>
        </div>
      </div>
    </footer>
  )
}
