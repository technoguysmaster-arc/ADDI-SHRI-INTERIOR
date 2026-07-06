// Stub — Full Swiper testimonial carousel after Step 7 screenshot
const REVIEWS = [
  { name: 'Priya Sharma', city: 'Delhi', rating: 5, text: 'Absolutely stunning work! AADI SHRI INTERIOR transformed our 3BHK completely. The modular kitchen is a dream come true.' },
  { name: 'Rajesh Kumar', city: 'Noida', rating: 5, text: 'Professional team, on-time delivery, and quality that exceeded expectations. Highly recommend for anyone looking for premium interiors.' },
  { name: 'Anita Verma', city: 'Ghaziabad', rating: 5, text: 'The false ceiling and lighting design they did is breathtaking. Our living room looks like something out of a magazine now!' },
]

export default function Testimonials() {
  return (
    <section className="section-pad bg-brand-cream">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">500+ happy families across Delhi NCR</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(({ name, city, rating, text }) => (
            <div key={name} className="card p-6">
              <div className="flex text-yellow-400 mb-4">
                {'★'.repeat(rating)}
              </div>
              <p className="text-brand-darkGray text-sm leading-relaxed mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center font-bold text-brand-primary">
                  {name[0]}
                </div>
                <div>
                  <div className="font-semibold text-brand-secondary text-sm">{name}</div>
                  <div className="text-brand-midGray text-xs">{city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
