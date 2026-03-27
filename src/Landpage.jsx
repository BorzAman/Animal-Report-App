

import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "./authContext";
import {
  PawPrint,
  AlertTriangle,
  Menu,
  Map,
  Eye,
  Navigation,
  Rss,
  ArrowRight,
  MapPin,
  Verified,
  Droplets,
  Mountain,
  ShieldAlert,
  Clock,
  Smartphone,
  ChevronRight,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sample() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="dark bg-background-dark font-display text-gray-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/30">

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 glass-panel border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50 group-hover:bg-primary transition duration-300">
              <PawPrint className="text-primary group-hover:text-white transition duration-300" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Pashu<span className="text-primary">Jagarak</span>
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a onClick={() => { if (user) navigate('/home'); else navigate('/login') }} className="text-white hover:text-primary transition cursor-pointer">Home</a>
            <a onClick={() => { navigate('/map') }} className="text-gray-300 hover:text-primary transition cursor-pointer">Live Map</a>
            <a onClick={() => { if (user) navigate('/report-animal'); else navigate('/login') }} className="text-gray-300 hover:text-primary transition cursor-pointer">Report Animal</a>
            <a onClick={() => { navigate('/safety') }} className="text-gray-300 hover:text-primary transition cursor-pointer  ">Safety Guide</a>
          </div>

          <button className="hidden md:flex items-center gap-2 bg-primary/10 border border-primary/50 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300 group">
            <AlertTriangle size={18} />
            <span className="group-hover:animate-pulse">Emergency Contact</span>
          </button>

          <button className="md:hidden text-gray-300">
            <Menu size={24} />
          </button>

        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">

        {/* BACKGROUND LAYERS EXACT */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/80 to-background-dark"></div>
        <div className="absolute inset-0 bg-island-gradient"></div>

        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              High Wildlife Activity Detected
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">
              Stay Safe.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">
                Stay Alert.
              </span>
            </h1>

            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              Real-time monitoring and community reporting for local wildlife hazards. Join 10,000+ rangers and hikers staying safe today.
            </p>

            {/* BUTTONS EXACT */}
            <div className="flex gap-4 flex-wrap">

              <button onClick={() => { navigate('/login') }} className="group relative px-8 py-4 bg-primary rounded-xl font-bold overflow-hidden text-white shadow-[0_0_20px_rgba(238,43,43,0.4)] hover:shadow-[0_0_30px_rgba(238,43,43,0.6)] transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <div className="flex gap-3 relative items-center">
                  <Eye size={20} /> Report Sighting
                </div>
              </button>

              <button onClick={() => { navigate('/map') }} className="px-8 py-4 border-2 border-gray-700 hover:border-primary text-gray-300 hover:text-white rounded-xl flex gap-3 items-center transition-colors bg-surface-dark/50">
                <Map size={20} /> View Live Map
              </button>

            </div>

          </div>

          {/* FLOATING ISLAND */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center hidden md:flex">

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >

              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75"></div>

              {/* Main Circle Image */}
              <div className="relative w-[450px] h-[450px] rounded-full overflow-hidden island-shadow border-4 border-white/5 bg-surface-dark group">
                {/* Replaced generic surface with a map/radar abstraction */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-40 group-hover:scale-105 transition duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-primary/10 to-transparent mix-blend-overlay"></div>

                {/* Radar Scan Effect */}
                <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-spin opacity-30 origin-bottom-right"></div>
              </div>

              {/* FLOAT CARDS EXACT */}
              <FloatingCard delay={1} className="top-10 right-0 z-20" icon={<AlertTriangle className="text-primary" />} title="Grizzly Spotted" subtitle="Sector 4 • 2m ago" />
              <FloatingCard delay={2.5} className="bottom-20 left-0 border-yellow-500/50 z-20" icon={<Navigation className="text-yellow-500" />} title="Trail Closed" subtitle="Maintenance • 1h ago" />

              {/* LIVE TRACKING */}
              <div className="absolute top-1/2 -right-8 translate-y-12 glass-panel p-3 rounded-lg flex gap-2 items-center z-20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Live Tracking</span>
              </div>

              {/* SVG LINES */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#ee2b2b" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="80%" cy="20%" r="3" fill="#ee2b2b" />
                <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="#ee2b2b" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="20%" cy="70%" r="3" fill="#ee2b2b" />
              </svg>

            </motion.div>

          </div>

        </div>
      </main>

      {/* STATS STRIP */}
      <section className="border-y border-white/5 bg-surface-dark/50 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem number="1000+" label="Active Users" />
          <StatItem number="100+" label="Total Alerts" />
          <StatItem number="98%" label="Safe Zones" />
          <StatItem number="24/7" label="Ranger Support" />
        </div>
      </section>

      {/* RECENT ACTIVITY SECTION */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent <span className="text-primary">Activity</span></h2>
              <p className="text-gray-400">Live reports from the community and automated sensors.</p>
            </div>
            <button
              onClick={() => navigate('/cases/nearby')}
              className="hidden md:flex text-primary hover:text-white items-center gap-2 transition"
            >
              View All Reports <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ActivityCard
              image="https://images.unsplash.com/photo-1596707328221-83149d585461?auto=format&fit=crop&q=80&w=600"
              tag="Bear Activity"
              location="North Ridge Trail"
              time="12 mins ago"
              verified={true}
            />
            <ActivityCard
              image="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=600"
              tag="Elk Migration"
              location="Valley Stream"
              time="45 mins ago"
              verified={true}
            />
            <ActivityCard
              image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600"
              tag="Fallen Tree"
              location="Access Road B"
              time="2 hours ago"
              verified={false}
              severity="low"
            />
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 px-6 relative bg-surface-dark/30 border-t border-white/5">
        <div className="absolute inset-0 bg-island-gradient opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Designed for the <span className="text-primary">Wilderness</span></h2>
            <p className="text-gray-400">Advanced tools to keep you connected and aware, even when you're off the grid.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Rss size={24} />}
              title="Offline Sync"
              desc="Download maps and report caches to stay safe even without cellular signal."
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="Community Driven"
              desc="Alerts are verified by rangers and high-reputation hikers to ensure accuracy."
            />
            <FeatureCard
              icon={<ShieldAlert size={24} />}
              title="Predictive AI"
              desc="Our algorithm predicts wildlife movement patterns based on seasonal data."
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel border border-primary/20 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Safety in your <br />
                <span className="text-primary">Pocket.</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Get instant notifications, offline maps, and direct lines to emergency services. Download WildAlert today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button  
                onClick={() => alert("In Production..!")}
                className="flex items-center gap-3 bg-white text-background-dark px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                  <Smartphone size={20} /> App Store
                </button>
                <button 
                onClick={() => alert("In Production..!")}
                className="flex items-center gap-3 glass-panel border border-white/20 px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
                  Play Store
                </button>
              </div>
            </div>

            {/* Abstract Phone Mockup */}
            <div className="flex-1 w-full max-w-sm relative">
              <div className="absolute inset-0 bg-primary blur-[60px] opacity-20 animate-pulse"></div>
              <div className="relative border-8 border-gray-800 bg-background-dark rounded-[3rem] h-[500px] w-full shadow-2xl overflow-hidden flex flex-col">
                <div className="h-8 bg-gray-800 w-full absolute top-0 left-0 z-20 flex justify-center">
                  <div className="h-4 w-32 bg-black rounded-b-xl"></div>
                </div>
                <div className="flex-1 bg-surface-dark relative p-4 pt-12 space-y-4">
                  <div className="h-40 bg-gray-800/50 rounded-xl animate-pulse"></div>
                  <div className="h-20 bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="h-2 w-20 bg-primary/50 rounded mb-2"></div>
                    <div className="h-2 w-32 bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-20 bg-gray-800/50 rounded-xl p-4"></div>
                  {/* Floating Map Pin */}
                  <div className="absolute top-1/2 right-8 p-3 bg-primary rounded-full shadow-[0_0_15px_#ee2b2b]">
                    <MapPin className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/40 border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="text-primary" />
              <span className="font-bold text-xl">Wild<span className="text-primary">Alert</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dedicated to preserving the balance between human adventure and wildlife safety.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-primary cursor-pointer">Live Map</li>
              <li className="hover:text-primary cursor-pointer">Sightings</li>
              <li className="hover:text-primary cursor-pointer">Safety Guides</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-primary cursor-pointer">Become a Ranger</li>
              <li className="hover:text-primary cursor-pointer">Donations</li>
              <li className="hover:text-primary cursor-pointer">Events</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2024 WildAlert Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Twitter</span>
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function FloatingCard({ icon, title, subtitle, className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
      className={`absolute glass-panel p-4 rounded-xl border-l-4 border-primary shadow-lg backdrop-blur-md ${className}`}
    >
      <div className="flex gap-3 items-center">
        <div className="p-2 bg-background-dark/50 rounded-lg">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-100">{title}</h4>
          <p className="text-gray-400 text-xs">{subtitle || "Just now"}</p>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="text-center group cursor-default">
      <h3 className="text-3xl font-extrabold text-white group-hover:text-primary transition-colors duration-300">{number}</h3>
      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mt-1">{label}</p>
    </div>
  )
}

function ActivityCard({ image, tag, location, time, verified, severity = "high" }) {
  return (
    <div className="group glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition duration-300 hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img src={image} alt={tag} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold border border-white/10 text-white flex items-center gap-1">
          {verified && <Verified size={12} className="text-primary" />}
          {verified ? "Verified" : "Unverified"}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{tag}</h3>
          <div className={`w-2 h-2 rounded-full ${severity === 'high' ? 'bg-primary animate-pulse' : 'bg-yellow-500'}`}></div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
          <MapPin size={12} /> {location}
          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
          <Clock size={12} /> {time}
        </div>
        <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary text-xs font-bold transition border border-white/5">
          View Details
        </button>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/30 transition duration-300 group">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}