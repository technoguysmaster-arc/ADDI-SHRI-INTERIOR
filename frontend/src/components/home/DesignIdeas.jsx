// Stub — will get real images after Step 6 screenshot
const ROOMS = [
  { label: 'Living Room', img: null },
  { label: 'Bedroom', img: null },
  { label: 'Kitchen', img: null },
  { label: 'Bathroom', img: null },
  { label: 'Dining Room', img: null },
  { label: 'Kids Room', img: null },
]

export default function DesignIdeas() {
  return (
    <section className="section-pad">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="section-title">Design Ideas by Room</h2>
          <p className="section-subtitle">Explore curated design styles for every space in your home</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ROOMS.map(({ label }) => (
            <div key={label}
                 className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-lightGray
                             hover:-translate-y-1 transition-transform duration-300 cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-dark flex items-end p-5">
                <span className="font-display text-xl font-semibold text-white">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
