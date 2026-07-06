import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronUp, FaChevronDown, FaBars, FaTimes, FaPhone, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'

// ── Design Ideas mega-menu data ─────────────────────────────────
const DESIGN_IDEAS_COL1 = [
  'Modular Kitchen Designs',
  'Wardrobe Designs',
  'Bathroom Designs',
  'Master Bedroom Designs',
  'Living Room Designs',
  'Pooja Room Designs',
  'TV Unit Designs',
  'False Ceiling Designs',
  'Kids Bedroom Designs',
  'Balcony Designs',
  'Dining Room Designs',
  'Foyer Designs',
  'Homes by Aadi Shri',
  'Home Office Designs',
]

const DESIGN_IDEAS_COL2 = [
  'Guest Bedroom Designs',
  'Window Designs',
  'Flooring Designs',
  'Wall Decor Designs',
  'Wall Paint Designs',
  'Home Wallpaper Designs',
  'Tile Designs',
  'Study Room Designs',
  'Kitchen Sinks',
  'Space Saving Designs',
  'Door Designs',
  'Staircase Designs',
  'Crockery Unit Designs',
  'Home Bar Designs',
]

// slugify helper
const toSlug = (str) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

// ── MegaMenu panel ───────────────────────────────────────────────
function DesignIdeasMegaMenu({ onClose }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[520px]
                 bg-white rounded-b-2xl shadow-mega border-t-2 border-brand-primary
                 py-6 px-8 z-50 animate-fade-in-up"
    >
      <div className="grid grid-cols-2 gap-x-8">
        {/* Column 1 */}
        <ul className="space-y-3">
          {DESIGN_IDEAS_COL1.map((item) => (
            <li key={item}>
              <Link
                to={`/design-ideas/${toSlug(item)}`}
                onClick={onClose}
                className="text-sm text-brand-darkGray hover:text-brand-primary
                           transition-colors duration-150 leading-snug block"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        {/* Column 2 */}
        <ul className="space-y-3">
          {DESIGN_IDEAS_COL2.map((item) => (
            <li key={item}>
              <Link
                to={`/design-ideas/${toSlug(item)}`}
                onClick={onClose}
                className="text-sm text-brand-darkGray hover:text-brand-primary
                           transition-colors duration-150 leading-snug block"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── Magazine dropdown data ──────────────────────────────────────
const MAGAZINE_ITEMS = [
  'Room Ideas',
  'Decor & Inspiration',
  'Ceiling Design',
  'Furniture Ideas',
  'Home Decor',
  'Lighting Ideas',
  'Wall Design Ideas',
  'Expert Advice',
  'Interior Advice',
  'Vastu Tips',
  'Home Organisation',
  'Materials Guide',
  'Home Renovation Ideas',
]

function MagazineMegaMenu({ onClose }) {
  const midPoint = Math.ceil(MAGAZINE_ITEMS.length / 2)
  const col1 = MAGAZINE_ITEMS.slice(0, midPoint)
  const col2 = MAGAZINE_ITEMS.slice(midPoint)

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[450px]
                 bg-white rounded-b-2xl shadow-mega border-t-2 border-brand-primary
                 py-6 px-7 z-50 animate-fade-in-up"
    >
      <div className="grid grid-cols-2 gap-x-6">
        <ul className="space-y-2.5">
          {col1.map((item) => (
            <li key={item}>
              <Link
                to="/coming-soon"
                onClick={onClose}
                className="text-sm text-brand-darkGray hover:text-brand-primary
                           transition-colors duration-150 block"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2.5">
          {col2.map((item) => (
            <li key={item}>
              <Link
                to="/coming-soon"
                onClick={onClose}
                className="text-sm text-brand-darkGray hover:text-brand-primary
                           transition-colors duration-150 block"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── Main Header ──────────────────────────────────────────────────
export default function Header() {
  const { user, logout, isAuthenticated } = useAuth()
  const [designOpen, setDesignOpen] = useState(false)
  const [magazineOpen, setMagazineOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDesignOpen, setMobileDesignOpen] = useState(false)
  const [mobileMagazineOpen, setMobileMagazineOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const designRef = useRef(null)
  const magazineRef = useRef(null)
  const userRef = useRef(null)

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega-menu / dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (designRef.current && !designRef.current.contains(e.target)) {
        setDesignOpen(false)
      }
      if (magazineRef.current && !magazineRef.current.contains(e.target)) {
        setMagazineOpen(false)
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
    { label: 'Home',     to: '/'        },
    { label: 'Projects', to: '/projects' },
    { label: 'About',    to: '/about'    },
    { label: 'Contact',  to: '/contact'  },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300
                    ${scrolled ? 'shadow-nav' : 'shadow-sm'}`}
      >
        {/* ── Main nav bar ── */}
        <div className="container-main flex items-center justify-between h-[64px]">

          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col leading-none"
            onMouseEnter={() => {
              setDesignOpen(false)
              setMagazineOpen(false)
              setUserDropdownOpen(false)
            }}
          >
            <span className="font-display text-lg font-bold text-brand-primary tracking-tight">
              AADI SHRI INTERIOR
            </span>
            <span className="text-[9px] text-brand-midGray tracking-widest uppercase font-medium">
              Complete Interior & Exterior Solutions
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* 1. Home */}
            <Link
              to="/"
              className="nav-link px-3 py-2 rounded-lg hover:bg-brand-cream text-sm"
              onMouseEnter={() => {
                setDesignOpen(false)
                setMagazineOpen(false)
                setUserDropdownOpen(false)
              }}
            >
              Home
            </Link>

            {/* 2. Projects */}
            <Link
              to="/projects"
              className="nav-link px-3 py-2 rounded-lg hover:bg-brand-cream text-sm"
              onMouseEnter={() => {
                setDesignOpen(false)
                setMagazineOpen(false)
                setUserDropdownOpen(false)
              }}
            >
              Projects
            </Link>

            {/* 3. Design Ideas with mega-menu */}
            <div
              ref={designRef}
              className="relative"
              onMouseEnter={() => {
                setDesignOpen(true)
                setMagazineOpen(false)
                setUserDropdownOpen(false)
              }}
              onMouseLeave={() => setDesignOpen(false)}
            >
              <button
                onClick={() => setDesignOpen(!designOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                            transition-colors duration-200 cursor-pointer
                            ${designOpen
                              ? 'text-brand-primary bg-brand-cream'
                              : 'text-brand-darkGray hover:text-brand-primary hover:bg-brand-cream'}`}
              >
                Design Ideas
                {designOpen
                  ? <FaChevronUp size={10} className="text-brand-primary" />
                  : <FaChevronDown size={10} />}
              </button>

              {/* Underline when open */}
              {designOpen && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full" />
              )}

              {/* Mega menu panel */}
              {designOpen && (
                <DesignIdeasMegaMenu onClose={() => setDesignOpen(false)} />
              )}
            </div>

            {/* 4. Magazine with dropdown */}
            <div
              ref={magazineRef}
              className="relative"
              onMouseEnter={() => {
                setMagazineOpen(true)
                setDesignOpen(false)
                setUserDropdownOpen(false)
              }}
              onMouseLeave={() => setMagazineOpen(false)}
            >
              <button
                onClick={() => setMagazineOpen(!magazineOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                            transition-colors duration-200 cursor-pointer
                            ${magazineOpen
                              ? 'text-brand-primary bg-brand-cream'
                              : 'text-brand-darkGray hover:text-brand-primary hover:bg-brand-cream'}`}
              >
                Magazine
                {magazineOpen
                  ? <FaChevronUp size={10} className="text-brand-primary" />
                  : <FaChevronDown size={10} />}
              </button>

              {/* Underline when open */}
              {magazineOpen && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full" />
              )}

              {/* Dropdown panel */}
              {magazineOpen && (
                <MagazineMegaMenu onClose={() => setMagazineOpen(false)} />
              )}
            </div>

            {/* 5. About */}
            <Link
              to="/about"
              className="nav-link px-3 py-2 rounded-lg hover:bg-brand-cream text-sm"
              onMouseEnter={() => {
                setDesignOpen(false)
                setMagazineOpen(false)
                setUserDropdownOpen(false)
              }}
            >
              About
            </Link>

            {/* 6. Contact */}
            <Link
              to="/contact"
              className="nav-link px-3 py-2 rounded-lg hover:bg-brand-cream text-sm"
              onMouseEnter={() => {
                setDesignOpen(false)
                setMagazineOpen(false)
                setUserDropdownOpen(false)
              }}
            >
              Contact
            </Link>
          </nav>

          {/* CTA + User Auth + mobile hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919507492111"
              className="hidden md:flex items-center gap-1.5 text-brand-primary
                         font-semibold text-sm hover:text-brand-primaryHov transition-colors"
              onMouseEnter={() => {
                setDesignOpen(false)
                setMagazineOpen(false)
                setUserDropdownOpen(false)
              }}
            >
              <FaPhone size={13} />
              95074 92111
            </a>

            {isAuthenticated ? (
              <div ref={userRef} className="relative hidden lg:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-cream hover:bg-brand-primary/10 transition-colors"
                  onMouseEnter={() => {
                    setDesignOpen(false)
                    setMagazineOpen(false)
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
                    {user?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-semibold text-brand-darkGray">
                    Hi, {user?.first_name || 'User'}
                  </span>
                  <FaChevronDown size={10} className="text-brand-midGray" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-mega border border-brand-border py-2 z-50 animate-fade-in-up">
                    <div className="px-4 py-2 border-b border-brand-border mb-1">
                      <p className="text-xs text-brand-midGray">Logged in as</p>
                      <p className="text-sm font-semibold text-brand-darkGray truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setUserDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <FaSignOutAlt size={14} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:inline-flex items-center gap-1.5 text-brand-darkGray hover:text-brand-primary font-semibold text-sm px-3 py-2 rounded-xl hover:bg-brand-cream transition-colors"
                onMouseEnter={() => {
                  setDesignOpen(false)
                  setMagazineOpen(false)
                  setUserDropdownOpen(false)
                }}
              >
                <FaUser size={13} />
                Sign In
              </Link>
            )}

            <Link
              to="/contact"
              className="btn-primary hidden md:inline-flex text-sm px-5 py-2.5"
              onMouseEnter={() => {
                setDesignOpen(false)
                setMagazineOpen(false)
                setUserDropdownOpen(false)
              }}
            >
              Free Quote
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center
                         rounded-xl hover:bg-brand-cream transition-colors"
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl
                          overflow-y-auto animate-fade-in-up pt-20 pb-8 px-6">
            <nav className="space-y-1">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 rounded-xl text-brand-darkGray font-medium
                             hover:bg-brand-cream hover:text-brand-primary transition-colors"
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Design Ideas accordion */}
              <div>
                <button
                  onClick={() => setMobileDesignOpen(!mobileDesignOpen)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl
                             text-brand-darkGray font-medium hover:bg-brand-cream
                             hover:text-brand-primary transition-colors"
                >
                  Design Ideas
                  {mobileDesignOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </button>
                {mobileDesignOpen && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-brand-primary/20 pl-3">
                    {[...DESIGN_IDEAS_COL1, ...DESIGN_IDEAS_COL2].sort().map((item) => (
                      <Link
                        key={item}
                        to={`/design-ideas/${toSlug(item)}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-brand-darkGray
                                   hover:text-brand-primary transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Magazine accordion */}
              <div>
                <button
                  onClick={() => setMobileMagazineOpen(!mobileMagazineOpen)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl
                             text-brand-darkGray font-medium hover:bg-brand-cream
                             hover:text-brand-primary transition-colors"
                >
                  Magazine
                  {mobileMagazineOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </button>
                {mobileMagazineOpen && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-brand-primary/20 pl-3">
                    {MAGAZINE_ITEMS.map((item) => (
                      <Link
                        key={item}
                        to="/coming-soon"
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-brand-darkGray
                                   hover:text-brand-primary transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="mt-8 space-y-3">
              {isAuthenticated ? (
                <div className="bg-brand-cream rounded-2xl p-4 text-center">
                  <p className="text-xs text-brand-midGray">Logged in as</p>
                  <p className="text-sm font-semibold text-brand-darkGray truncate mb-3">{user?.email}</p>
                  <button
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                    className="w-full btn-outline border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 py-2.5 justify-center"
                  >
                    <FaSignOutAlt size={14} className="mr-1 inline" />
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-outline w-full justify-center"
                >
                  <FaUser size={13} />
                  Sign In with Google
                </Link>
              )}
              <a href="tel:+919507492111" className="btn-outline w-full justify-center">
                <FaPhone size={13} />
                +91 95074 92111
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
