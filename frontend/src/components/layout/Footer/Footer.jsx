import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-secondary text-white">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-brand-primary mb-4">
              AADI SHRI INTERIOR
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A Complete Interior & Exterior Solutions. Transforming spaces into stunning living experiences since 2015.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary flex items-center justify-center transition-colors duration-200">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary flex items-center justify-center transition-colors duration-200">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary flex items-center justify-center transition-colors duration-200">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[['Home', '/'], ['Projects', '/projects'], ['About Us', '/about'], ['Contact', '/contact']].map(([label, href]) => (
                <li key={label}><a href={href} className="hover:text-brand-primary transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <FaPhone className="text-brand-primary mt-0.5 flex-shrink-0" />
                <span>+91 95074 92111</span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-brand-primary mt-0.5 flex-shrink-0" />
                <span>info@aadishriinterior.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-main py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© {year} AADI SHRI INTERIOR. All rights reserved.</span>
          <span>Made with ♥ in India</span>
        </div>
      </div>
    </footer>
  )
}
