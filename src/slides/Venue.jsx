import React from 'react'
import { useNavigate } from 'react-router-dom'
import './venue.css'
import WeddingDate from './Date'
export default function Venue() {
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      navigate('/card')
    }, 10000)
  }, [])


  return (
    <div className='text-center'>
        <section className="container" id="venue">
        <h2 className="text-center p-2 pb-1 pt-5 fw-bolder">Save The Date</h2>
        <h3 className='fw-bolder'>Dawat-e-Walima</h3>
        <WeddingDate />
        <h1 className="text-center p-2 pb-1 fw-bolder">Venue</h1>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4939805716635!2d77.607446!3d23.079006099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c37005ada0f39%3A0x2691afb3e15ef33b!2sICONIC%20GREENS%20RESORT!5e0!3m2!1sen!2sin!4v1759773209007!5m2!1sen!2sin"
          id="map"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  )
}
