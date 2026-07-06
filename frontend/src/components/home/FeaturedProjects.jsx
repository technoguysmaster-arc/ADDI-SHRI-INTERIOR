// Stub — Full Swiper implementation after Step 4 screenshot
export default function FeaturedProjects() {
  return (
    <section className="section-pad">
      <div className="container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Real homes transformed by our designers</p>
          </div>
          <a href="/projects" className="btn-outline hidden md:inline-flex">View All Projects</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="card aspect-[4/3] bg-brand-lightGray animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  )
}
