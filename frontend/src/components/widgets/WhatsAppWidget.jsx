import { FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
const MESSAGE = encodeURIComponent('Hello! I am interested in your interior design services. Can you please share more details?')

export default function WhatsAppWidget() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-whatsapp
                 flex items-center justify-center shadow-lg
                 hover:scale-110 hover:shadow-xl
                 transition-all duration-250 animate-fade-in-up"
    >
      <FaWhatsapp size={28} className="text-white" />
    </a>
  )
}
