import React from 'react';
import { BookOpen, Github, Linkedin, Mail, Twitter, ArrowDown } from 'lucide-react';
import PhotoDisplay from '../atoms/PhotoDisplay';
import profileData from '../../content/profile.json';

const heroFadeIn = (delay = 0) => ({
    opacity: 0,
    transform: 'translateY(24px)',
    animation: `heroEntrance 0.7s ease-out ${delay}s forwards`,
});

const HeroSection = ({ tagline, RightSideComponent, heroImage, heroBackImage }) => {
    const RightAsset = () => {
        if (heroImage) return <PhotoDisplay src={heroImage} backSrc={heroBackImage} />;
        if (RightSideComponent) return <RightSideComponent />;
        return null;
    };

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-between relative pt-20 overflow-hidden">
            {/* Main content */}
            <div className="flex-1 flex items-center px-6">
                <div className="max-w-9xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center z-20 md:pl-25">

                    {/* Left: Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A3785B] font-bold" style={heroFadeIn(0)}>
                                Portfolio
                            </span>
                            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-[#16161D]" style={heroFadeIn(0.2)}>
                                {tagline}
                            </h1>
                        </div>

                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-[#16161D]/60 font-light leading-relaxed max-w-md whitespace-pre-line" style={heroFadeIn(0.5)}>
                                {profileData.description}
                            </p>

                            <div className="flex items-center gap-5" style={heroFadeIn(0.8)}>
                                {profileData.socials.github && <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#16161D]/5 flex items-center justify-center text-[#16161D]/40 hover:bg-[#A3785B] hover:text-white transition-all duration-200"><Github size={18} /></a>}
                                {profileData.socials.linkedin && <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#16161D]/5 flex items-center justify-center text-[#16161D]/40 hover:bg-[#A3785B] hover:text-white transition-all duration-200"><Linkedin size={18} /></a>}
                                {profileData.socials.twitter && <a href={profileData.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#16161D]/5 flex items-center justify-center text-[#16161D]/40 hover:bg-[#A3785B] hover:text-white transition-all duration-200"><Twitter size={18} /></a>}
                                {profileData.socials.email && <a href={`mailto:${profileData.socials.email}`} className="w-10 h-10 rounded-full bg-[#16161D]/5 flex items-center justify-center text-[#16161D]/40 hover:bg-[#A3785B] hover:text-white transition-all duration-200"><Mail size={18} /></a>}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2" style={heroFadeIn(1.1)}>
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-8 py-3 bg-[#16161D] text-white font-bold rounded-full hover:bg-[#A3785B] transition-colors shadow-lg shadow-[#16161D]/10 flex items-center gap-2 text-xs tracking-widest uppercase"
                            >
                                View Profile
                            </a>
                            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-[#16161D]/20 rounded-full hover:border-[#A3785B] hover:text-[#A3785B] text-[#16161D] transition-all flex items-center gap-2 bg-transparent text-xs tracking-widest uppercase">
                                <BookOpen size={16} />
                                CV
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Photo Card */}
                    <div className="relative hidden md:flex items-center justify-center" style={heroFadeIn(0.4)}>
                        <RightAsset />
                    </div>
                </div>
            </div>

            {/* Bottom bar — scroll indicator + page number (reference style) */}
            <div className="w-full px-6 pb-8 pt-4 flex justify-between items-end z-20" style={heroFadeIn(1.4)}>
                {/* Left: scroll cue */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <div className="w-px h-12 bg-[#16161D]/20 group-hover:bg-[#A3785B] transition-colors" />
                    <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#16161D]/30 block">Scroll</span>
                        <ArrowDown size={12} className="text-[#16161D]/30 group-hover:text-[#A3785B] mt-1 transition-colors group-hover:translate-y-0.5" />
                    </div>
                </div>

                {/* Center: thin rule */}
                <div className="hidden md:block flex-1 mx-8 h-px bg-[#16161D]/8" />

                {/* Right: page indicator */}
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#16161D]/30">01</span>
                    <span className="w-4 h-px bg-[#16161D]/15" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#16161D]/20">04</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
