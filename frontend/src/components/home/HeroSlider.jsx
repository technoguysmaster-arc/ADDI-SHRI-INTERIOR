// Stub — Full implementation after screenshot upload (Step 2)
export default function HeroSlider() {
  return (
    <section className="relative h-screen bg-gradient-to-br from-brand-secondary to-brand-primary/80 flex items-center justify-center">
      <div className="container-main text-center text-white">
        <p className="text-brand-accent font-semibold tracking-widest text-sm uppercase mb-4">
          A Complete Interior & Exterior Solutions
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          Design Your<br />Dream Space
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in-up">
          From modular kitchens to luxury living rooms — we craft spaces that inspire. Trusted by 500+ happy families.
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">
          <a href="/contact" className="btn-white">Get Free Consultation</a>
          <a href="/projects" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-primary">View Our Projects</a>
        </div>
      </div>
    </section>
  )
}
