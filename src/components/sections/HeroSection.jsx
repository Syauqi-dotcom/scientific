import React from 'react';
import { BookOpen, Github, Linkedin, Mail, Twitter } from 'lucide-react';
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
        <section id="hero" className="min-h-screen flex items-center relative pt-20 px-6 overflow-hidden">
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
                            href="#profile"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
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
        </section>
    );
};

export default HeroSection;
