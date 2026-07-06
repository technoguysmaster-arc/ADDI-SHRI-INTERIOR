const STATS = [
  { value: '500+', label: 'Happy Families' },
  { value: '10+',  label: 'Years Experience' },
  { value: '50+',  label: 'Expert Designers' },
  { value: '4.9★', label: 'Average Rating' },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-primary">
      <div className="container-main py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {STATS.map(({ value, label }) => (
            <div key={label} className="group">
              <div className="font-display text-4xl md:text-5xl font-bold mb-2 text-white">
                {value}
              </div>
              <div className="text-white/75 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
