import React from 'react';
import { RefreshCw, BookOpen, Music, Atom } from 'lucide-react';

const HeroSection = ({ tagline, onGenerateTagline, isGeneratingTagline }) => (
    <section id="hero" className="min-h-screen flex items-center relative pt-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center z-20">
            <div className="space-y-8">
                <div className="inline-block px-3 py-1 border border-[#1B2A41]/20 rounded-full text-[#1B2A41] font-mono text-xs bg-white/50 backdrop-blur-sm">
                    Path Seeker & Interest with Quantum Technology
                </div>

                <div className="relative">
                    <h1 className="font-serif text-5xl md:text-7xl leading-tight text-[#1B2A41] transition-all duration-500 min-h-[1.2em]">
                        {tagline}
                    </h1>
                    {/* Tagline Generator Button */}
                    <button
                        onClick={onGenerateTagline}
                        disabled={isGeneratingTagline}
                        className="absolute -right-8 top-2 p-2 rounded-full text-[#E29578] hover:bg-[#E29578]/10 hover:rotate-180 transition-all duration-500"
                        title="Rewrite Reality (AI)"
                    >
                        <RefreshCw size={20} className={isGeneratingTagline ? "animate-spin" : ""} />
                    </button>
                </div>

                <p className="text-lg md:text-xl text-[#1B2A41]/70 max-w-md font-light">
                    Hi, I'm <span className="text-[#1B2A41] font-bold bg-[#F4D35E]/30 px-1">Muhammad Syauqi</span>.
                    Information Engineering Student. Bridging the gap between sunset dreams and quantum realities.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <a href="#notebook" className="px-8 py-3 bg-[#1B2A41] text-white font-bold rounded-full hover:bg-[#E29578] transition-colors shadow-lg shadow-[#1B2A41]/20 flex items-center gap-2">
                        <BookOpen size={18} />
                        Read Notes
                    </a>
                    <a href="#spotify-zone" className="px-8 py-3 border-2 border-[#1B2A41]/20 rounded-full hover:border-[#1B2A41] text-[#1B2A41] transition-all flex items-center gap-2 bg-white/50">
                        <Music size={18} />
                        Listen
                    </a>
                </div>
            </div>

            {/* Abstract Hero Graphic - Colorful Atom */}
            <div className="relative hidden md:block h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                        <div className="absolute inset-0 border-2 border-[#1B2A41]/10 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 border-2 border-[#1B2A41]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-8 border-2 border-[#1B2A41]/30 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Atom size={64} className="text-[#E29578] animate-pulse" />
                        </div>
                        {/* Persamaan Matematika Melayang */}
                        <div className="absolute -top-10 -right-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#1B2A41]/10 font-mono text-xs text-[#1B2A41] shadow-sm animate-bounce" style={{ animationDelay: '1s' }}>
                            |ψ⟩ = α|0⟩ + β|1⟩
                        </div>
                        <div className="absolute bottom-0 -left-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#1B2A41]/10 font-mono text-xs text-[#E29578] shadow-sm animate-bounce" style={{ animationDelay: '0.5s' }}>
                            H = -∑ p(x) log p(x)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;
