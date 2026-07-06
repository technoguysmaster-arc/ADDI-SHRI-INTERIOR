import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center section-pad">
      <p className="font-display text-9xl font-bold text-brand-primary/20 mb-4">404</p>
      <h1 className="section-title mb-3">Page Not Found</h1>
      <p className="section-subtitle mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">Go Back Home</Link>
    </div>
  )
}
