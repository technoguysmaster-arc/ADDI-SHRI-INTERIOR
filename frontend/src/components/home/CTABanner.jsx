export default function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-brand-secondary to-brand-secondary/90 py-20">
      <div className="container-main text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
          Ready to Transform Your Space?
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
          Book a free consultation with our expert designers today. No obligation, just inspiration.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact" className="btn-primary text-base px-8 py-4">
            Book Free Consultation
          </a>
          <a href="tel:+919507492111" className="btn-white text-base px-8 py-4">
            Call Now: +91 95074 92111
          </a>
        </div>
      </div>
    </section>
  )
}
