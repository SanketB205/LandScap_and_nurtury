import { useState } from 'react'
import {
  MapPin, Phone, Mail, Clock, Send, Leaf, CheckCircle2, ArrowRight
} from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Nursery',
    value: '42 Garden Street, Green Valley, Maharashtra 411001',
    action: 'Get Directions',
    href: '#map',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 98765 43210',
    action: 'Call Now',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@greenscapenursery.com',
    action: 'Send Email',
    href: 'mailto:hello@greenscapenursery.com',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon–Sat: 9AM – 7PM\nSun: 10AM – 5PM',
    action: null,
    href: null,
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-nature-50/30">

      {/* ── Hero Header ── */}
      <section
        className="relative pt-32 pb-24 overflow-hidden text-white"
        style={{ backgroundColor: '#0d3311' }}
      >
        {/* Leaf texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        </div>
        {/* Glow blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent 70%)' }} />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #86efac, transparent 70%)' }} />

        <div className="section-wrapper relative z-10 text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-6 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">
            <div className="w-12 h-[1px] bg-emerald-500/50" />
            Let's Grow Together
            <div className="w-12 h-[1px] bg-emerald-500/50" />
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-none">
            Contact <span className="text-emerald-400 italic">Us</span>
          </h1>

          {/* Sub-heading */}
          <p className="text-primary-200 text-lg max-w-2xl mx-auto font-medium">
            Have a garden dream? A question about plants? Or just want to say hello? We'd love to hear from you.
          </p>

          {/* Quick contact pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:scale-105"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Phone className="w-4 h-4 text-emerald-400" /> +91 98765 43210
            </a>
            <a
              href="mailto:hello@greenscapenursery.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:scale-105"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Mail className="w-4 h-4 text-emerald-400" /> hello@greenscapenursery.com
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-wrapper py-24">
        <div className="grid lg:grid-cols-5 gap-14">

          {/* ── Left: Contact Info ── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">
                <div className="w-8 h-[1px] bg-emerald-400" />
                Get In Touch
              </div>
              <h2 className="text-4xl font-display font-black text-primary-950 mb-4 leading-tight">
                Let's Talk Plants!
              </h2>
              <p className="text-gray-500 leading-relaxed font-medium">
                Whether you have a question, want to book a landscaping service, or just want to chat about your next garden project — we're here for you.
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-[1.75rem] p-5 flex items-start gap-5 shadow-sm hover:shadow-xl transition-all duration-400 border border-nature-50"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#0d3311' }}
                  >
                    <info.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-primary-950 text-sm mb-1">{info.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{info.value}</p>
                    {info.action && info.href && (
                      <a
                        href={info.href}
                        className="inline-flex items-center gap-1 text-emerald-700 text-xs font-black uppercase tracking-wider mt-2 hover:gap-2 transition-all"
                      >
                        {info.action} <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-50 overflow-hidden">

              {/* Form header strip */}
              <div
                className="px-10 py-7 flex items-center gap-3"
                style={{ backgroundColor: '#0d3311' }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-400/20 flex items-center justify-center">
                  <Send className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="font-black text-white text-lg font-display">Send Us a Message</p>
                  <p className="text-emerald-300/70 text-xs font-medium">We'll reply within 24 hours</p>
                </div>
              </div>

              <div className="p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: 'rgba(13,51,17,0.08)' }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="font-display text-3xl font-black text-primary-950 mb-3">Message Sent!</h3>
                    <p className="text-gray-500 font-medium max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-black text-primary-900 uppercase tracking-widest mb-2 block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Priya Sharma"
                          className="w-full px-5 py-3.5 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all font-medium text-sm text-gray-800 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-black text-primary-900 uppercase tracking-widest mb-2 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="priya@example.com"
                          className="w-full px-5 py-3.5 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all font-medium text-sm text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Phone + Subject */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-black text-primary-900 uppercase tracking-widest mb-2 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-5 py-3.5 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all font-medium text-sm text-gray-800 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-black text-primary-900 uppercase tracking-widest mb-2 block">
                          Topic
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all font-medium text-sm text-gray-800"
                        >
                          <option value="">Select a topic</option>
                          <option value="plant-query">Plant Query</option>
                          <option value="landscaping">Landscaping Enquiry</option>
                          <option value="terrace">Terrace Garden</option>
                          <option value="order">Order Issue</option>
                          <option value="general">General Question</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-black text-primary-900 uppercase tracking-widest mb-2 block">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your project or question..."
                        className="w-full px-5 py-3.5 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all font-medium text-sm text-gray-800 placeholder-gray-400 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-primary-900/20 active:scale-95"
                      style={{ backgroundColor: '#1b5e20' }}
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ── Embedded Map View ── */}
        <div id="map" className="mt-20 rounded-[2.5rem] overflow-hidden shadow-sm border border-nature-100 bg-white p-2 scroll-mt-32">
           <iframe 
             src="https://maps.google.com/maps?width=100%25&amp;height=450&amp;hl=en&amp;q=Pune,Maharashtra+(GreenScape%20Nursery)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
             width="100%" 
             height="450" 
             style={{ border: 0, borderRadius: '2rem' }} 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="GreenScape Nursery Location"
           ></iframe>
        </div>
      </section>

      {/* ── Map / Location Strip ── */}
      <div
        className="py-14 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #0d3311 0%, #1b5e20 50%, #0d3311 100%)' }}
      >
        <div className="section-wrapper flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="font-black text-lg font-display">42 Garden Street, Green Valley</p>
              <p className="text-emerald-300/80 text-sm font-medium">Maharashtra 411001 · Map integration coming soon</p>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="text-center">
              <p className="text-3xl font-black text-emerald-400 mb-1">24h</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300/70">Response Time</p>
            </div>
            <div className="w-[1px] bg-white/10 self-stretch" />
            <div className="text-center">
              <p className="text-3xl font-black text-emerald-400 mb-1">Free</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300/70">Consultation</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact
