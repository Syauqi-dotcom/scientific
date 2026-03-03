import React from 'react';
import { BookOpen, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import PhotoDisplay from '../../assets/PhotoDisplay';

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
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E29578] font-bold" style={heroFadeIn(0)}>
                            Portfolio
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-[#1B2A41]" style={heroFadeIn(0.2)}>
                            {tagline}
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <p className="text-lg md:text-xl text-[#1B2A41]/60 font-light leading-relaxed max-w-md" style={heroFadeIn(0.5)}>
                            Hi, I'm <strong className="text-[#1B2A41] font-medium">Muhammad Syauqi</strong>.
                            I'm a student of Information Engineering at Universitas Gadjah Mada.
                            Lets connect with me!
                        </p>

                        <div className="flex items-center gap-5" style={heroFadeIn(0.8)}>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1B2A41]/5 flex items-center justify-center text-[#1B2A41]/40 hover:bg-[#E29578] hover:text-white transition-all duration-200"><Github size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1B2A41]/5 flex items-center justify-center text-[#1B2A41]/40 hover:bg-[#E29578] hover:text-white transition-all duration-200"><Linkedin size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1B2A41]/5 flex items-center justify-center text-[#1B2A41]/40 hover:bg-[#E29578] hover:text-white transition-all duration-200"><Twitter size={18} /></a>
                            <a href="mailto:email@example.com" className="w-10 h-10 rounded-full bg-[#1B2A41]/5 flex items-center justify-center text-[#1B2A41]/40 hover:bg-[#E29578] hover:text-white transition-all duration-200"><Mail size={18} /></a>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2" style={heroFadeIn(1.1)}>
                        <a href="#profile" className="px-8 py-3 bg-[#1B2A41] text-white font-bold rounded-full hover:bg-[#E29578] transition-colors shadow-lg shadow-[#1B2A41]/10 flex items-center gap-2 text-xs tracking-widest uppercase">
                            View Profile
                        </a>
                        <a href="#notebook" className="px-8 py-3 border border-[#1B2A41]/20 rounded-full hover:border-[#E29578] hover:text-[#E29578] text-[#1B2A41] transition-all flex items-center gap-2 bg-transparent text-xs tracking-widest uppercase">
                            <BookOpen size={16} />
                            Read Notes
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
