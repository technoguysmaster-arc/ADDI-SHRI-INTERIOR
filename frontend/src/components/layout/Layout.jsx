import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import WhatsAppWidget from '../widgets/WhatsAppWidget'
import ChatWidget from '../widgets/ChatWidget'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[64px]">
        {/* pt-[64px] offsets the sticky header height */}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget />
      <ChatWidget />
    </div>
  )
}
