import { Link } from 'react-router-dom'
import { Leaf, Award, Heart, Sprout, Users, Mail, Phone, ArrowRight, Quote } from 'lucide-react'
import { teamMembers, stats } from '../data/dummyData'

const values = [
  {
    icon: Leaf,
    title: 'Sustainability First',
    desc: 'Every plant, every design, every material we use follows eco-friendly practices.',
    accent: '#4ade80',
  },
  {
    icon: Heart,
    title: 'Passion for Plants',
    desc: 'We genuinely love plants and that passion shows in every project we undertake.',
    accent: '#f472b6',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    desc: 'Every plant is hand-inspected and every service is backed by our quality guarantee.',
    accent: '#fbbf24',
  },
  {
    icon: Sprout,
    title: 'Always Growing',
    desc: 'We constantly learn, innovate, and expand our knowledge in horticulture.',
    accent: '#34d399',
  },
]

const About = () => {
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
            Our Story
            <div className="w-12 h-[1px] bg-emerald-500/50" />
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-none">
            About <span className="text-emerald-400 italic">GreenScape</span>
          </h1>

          <p className="text-primary-200 text-lg max-w-2xl mx-auto font-medium">
            Rooted in passion, growing with purpose — Maharashtra's most trusted nursery and landscaping partner since 2010.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-10 mt-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-emerald-400">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300/70 mt-1">{stat.label}</p>
              </div>
            )).reduce((acc, el, i, arr) => {
              acc.push(el)
              if (i < arr.length - 1) acc.push(
                <div key={`div-${i}`} className="w-[1px] h-10 bg-white/10 hidden sm:block" />
              )
              return acc
            }, [])}
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="section-wrapper py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="flex items-center gap-2 mb-5 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <div className="w-8 h-[1px] bg-emerald-400" />
              Our Journey
            </div>
            <h2 className="text-5xl font-display font-black text-primary-950 mb-6 leading-tight">
              Rooted Since <span className="text-emerald-700">2010</span>
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed font-medium">
              <p>
                GreenScape Nursery began as a small family-owned plot in Green Valley with just 20 plant varieties and a big dream — to make every home greener and every life better.
              </p>
              <p>
                Over the years, we grew our nursery to house over 200 plant varieties, built a team of passionate horticulturists, and expanded our services to landscape design for hundreds of residential and commercial clients.
              </p>
              <p>
                Today, GreenScape is Maharashtra's most trusted nursery and landscaping partner — but we've never forgotten our roots. Every plant we sell and every garden we design carries the same love and care we started with.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-8 p-6 rounded-3xl border-l-4 border-emerald-500 relative"
              style={{ backgroundColor: 'rgba(13,51,17,0.06)' }}
            >
              <Quote className="w-6 h-6 text-emerald-500 mb-3 opacity-60" />
              <p className="text-primary-900 font-display font-bold italic text-lg leading-snug">
                "We don't just grow plants — we grow relationships, communities, and greener futures."
              </p>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mt-3">— Vikram Mehta, Founder</p>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
              alt="nursery"
              className="rounded-[2rem] shadow-xl h-52 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop"
              alt="garden"
              className="rounded-[2rem] shadow-xl h-52 w-full object-cover mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1604762524089-ce0f51bf34b1?w=400&h=300&fit=crop"
              alt="plants"
              className="rounded-[2rem] shadow-xl h-52 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
              alt="team"
              className="rounded-[2rem] shadow-xl h-52 w-full object-cover mt-4"
            />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24" style={{ backgroundColor: '#0d3311' }}>
        <div className="section-wrapper">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">
              <div className="w-10 h-[1px] bg-emerald-500/50" />
              What We Stand For
              <div className="w-10 h-[1px] bg-emerald-500/50" />
            </div>
            <h2 className="text-5xl font-display font-black text-white mb-4">Our Core Values</h2>
            <p className="text-primary-300 font-medium max-w-xl mx-auto">
              The principles that guide everything we grow and create
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group bg-white/5 hover:bg-white/10 rounded-[2rem] p-8 text-center transition-all duration-500 border border-white/10 hover:border-white/20 hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${v.accent}20` }}
                >
                  <v.icon className="w-8 h-8" style={{ color: v.accent }} />
                </div>
                <h3 className="font-display font-black text-white text-lg mb-3">{v.title}</h3>
                <p className="text-sm text-primary-300 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-wrapper py-28">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4 text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px]">
            <div className="w-10 h-[1px] bg-emerald-400" />
            Meet the Team
            <div className="w-10 h-[1px] bg-emerald-400" />
          </div>
          <h2 className="text-5xl font-display font-black text-primary-950 mb-4">The Green Experts</h2>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            Passionate professionals dedicated to bringing nature closer to your daily life
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="group bg-white rounded-[2.5rem] p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-500 border border-nature-50 hover:-translate-y-2"
            >
              {/* Avatar */}
              <div className="relative w-24 h-24 mx-auto mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-nature-100 group-hover:ring-emerald-400 transition-all duration-300"
                />
                <div
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#1b5e20' }}
                >
                  <Leaf className="w-4 h-4 text-emerald-300" />
                </div>
              </div>

              <h3 className="font-display font-black text-primary-950 text-lg mb-1">{member.name}</h3>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-3">{member.role}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="bg-emerald-900 py-20 text-white">
        <div className="section-wrapper flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-display font-black mb-4">Have a question?</h2>
            <p className="text-emerald-100 font-medium opacity-80 mb-8">
              We'd love to hear about your garden dreams. Reach out and let's create something beautiful together.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Phone className="w-4 h-4 text-emerald-400" /> +91 98765 43210
              </a>
              <a
                href="mailto:hello@greenscapenursery.com"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Mail className="w-4 h-4 text-emerald-400" /> Email Us
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-white text-primary-900 px-7 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex gap-8 shrink-0">
            <div className="text-center">
              <p className="text-5xl font-black text-emerald-400 mb-2">15+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Years Experience</p>
            </div>
            <div className="w-[1px] bg-emerald-800 self-stretch" />
            <div className="text-center">
              <p className="text-5xl font-black text-emerald-400 mb-2">5k+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
