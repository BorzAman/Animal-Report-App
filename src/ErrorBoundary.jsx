"use client";

import React, { Component } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Terminal, RefreshCw } from "lucide-react";

// Custom SVG for the "Dead Animal" icon
const DeadRabbitIcon = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Ears */}
    <path d="M8 2v6" />
    <path d="M16 2v6" />
    {/* Head shape */}
    <path d="M12 8a7 7 0 0 0-7 7v1a7 7 0 0 0 7 7 7 7 0 0 0 7-7v-1a7 7 0 0 0-7-7z" />
    {/* Left Eye (X) */}
    <path d="M8 13l2 2" />
    <path d="M10 13l-2 2" />
    {/* Right Eye (X) */}
    <path d="M14 13l2 2" />
    <path d="M16 13l-2 2" />
    {/* Nose/Mouth */}
    <path d="M12 18v1" />
  </svg>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("System Failure:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#0a0a0a] font-display overflow-hidden relative">
          
          {/* --- AMBIENT GLOW EFFECTS --- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Center Red Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ee2b2b]/10 blur-[120px] rounded-full"></div>
            {/* Subtle Noise Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg"
          >
            {/* --- GLASS PANEL --- */}
            <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_0_50px_-20px_rgba(238,43,43,0.3)]">
              
              {/* Animated Top Warning Stripe */}
              <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#ee2b2b] to-transparent opacity-80 animate-shimmer"></div>
              </div>
              
              <div className="p-10 text-center">
                
                {/* --- ICON ANIMATION --- */}
                <div className="relative mx-auto mb-8 w-24 h-24 flex items-center justify-center">
                   {/* Pulsing Red Circle Background */}
                   <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
                   <div className="absolute inset-4 bg-red-500/20 rounded-full blur-md"></div>
                   
                   {/* Dead Rabbit Icon with Shake Effect */}
                   <motion.div 
                     animate={{ 
                       rotate: [0, -5, 5, -5, 0],
                       x: [0, -2, 2, -2, 0]
                     }}
                     transition={{ 
                       duration: 0.4, 
                       repeat: Infinity, 
                       repeatDelay: 3 
                     }}
                   >
                     <DeadRabbitIcon size={56} className="text-[#ee2b2b] drop-shadow-[0_0_15px_rgba(238,43,43,0.8)]" />
                   </motion.div>
                </div>

                {/* --- MAIN TEXT --- */}
                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                  System Malfunction
                </h2>
                <p className="text-red-400/80 text-sm font-medium tracking-wide uppercase mb-6">
                  Current Process Terminated
                </p>
                
                {/* Error Message Box */}
                <div className="px-5 py-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-8 relative group overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50"></div>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed relative z-10">
                    Uh-Oh. I guess we will have to report the app to developers now.
                  </p>
                </div>

                {/* --- TECHNICAL DETAILS (Stack Trace) --- */}
                <div className="mb-8 text-left">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">
                        <Terminal size={12} className="text-red-500" /> Error Log
                    </div>
                    <div className="bg-black/40 rounded-lg p-4 border border-white/5 overflow-hidden font-mono text-xs">
                        <code className="text-red-300/70 block whitespace-pre-wrap break-all leading-tight">
                            <span className="text-gray-600 select-none">$ </span>
                            {this.state.error?.toString() || "Unknown Error: Component tree collapsed."}
                        </code>
                    </div>
                </div>

                {/* --- ACTION BUTTONS --- */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => window.location.href = "mailto:sarveshsaste9@gmail.com?subject=App Crash Report"}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ee2b2b] hover:bg-red-600 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(238,43,43,0.3)] hover:shadow-[0_0_30px_rgba(238,43,43,0.5)] active:scale-95 cursor-pointer"
                  >
                    <AlertTriangle size={18} />
                    Report to Devs
                  </button>
                  
                  <button 
                    onClick={this.handleReload}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <RefreshCw size={18} />
                    Reboot App
                  </button>
                </div>

              </div>
              
              {/* Bottom Decorative Scan Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
            </div>

          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;