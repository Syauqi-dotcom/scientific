import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';
const heroPhoto = `${import.meta.env.BASE_URL}assets/foto (1).webp`;
const heroPhoto2 = `${import.meta.env.BASE_URL}assets/foto2.webp`;

// Atoms & Layout
import CustomCursor from './components/atoms/CustomCursor';
import Background from './components/atoms/Background';
import Navigation from './components/atoms/Navigation';
import TypeWriter from './components/atoms/TypeWriter';

// Sections
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import WorkSection from './components/sections/WorkSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ResearchNotesSection from './components/sections/ResearchNotesSection';
import GithubSection from './components/sections/GithubSection';
import Footer from './components/sections/Footer';

const Portfolio = ({ bgAnimationDisabled, toggleBgAnimation }) => {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollY, setScrollY] = useState(0);
    const [isNavHovered, setIsNavHovered] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            const sections = ['hero', 'about', 'work', 'experience', 'stack', 'github', 'contact'];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top >= 0 && el.getBoundingClientRect().top <= 300) {
                    setActiveSection(section);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen text-[#16161D] font-sans selection:bg-[#A3785B] selection:text-white">
            <CustomCursor />
            {/* Background canvas visible everywhere */}
            <Background scrollY={scrollY} disabled={bgAnimationDisabled} />
            <Navigation
                activeSection={activeSection}
                bgAnimationDisabled={bgAnimationDisabled}
                toggleBgAnimation={toggleBgAnimation}
                onHoverChange={setIsNavHovered}
            />

            {/* Main bordered frame */}
            <div className={`relative z-10 w-full min-h-screen pb-4 px-4 md:pb-6 md:px-6 transition-[padding] duration-500 ease-in-out ${isNavHovered ? 'pt-24 md:pt-[88px]' : 'pt-4 md:pt-6'}`}>
                <div className="min-h-[calc(100vh-2rem)] border-2 border-[#16161D]/15 rounded-lg relative bg-white/40 backdrop-blur-[1px]">
                    <main>
                        {/* Hero — light bg with photo, preserved */}
                        <HeroSection
                            tagline={<span>Hi! I'm, <TypeWriter text="Syauqi." speed={120} delay={800} className="italic text-[#A3785B]" cursorClassName="text-[#A3785B]/60 font-light" /></span>}
                            heroImage={heroPhoto}
                            heroBackImage={heroPhoto2}
                        />

                        {/* Editorial sections — Adi style, fully light-themed */}
                        <AboutSection />
                        <WorkSection />
                        <ExperienceSection />
                        <ResearchNotesSection />

                        {/* Preserved: GitHub Activity */}
                        <GithubSection />

                        {/* Preserved: Let's Connect terminal */}
                        <Footer />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
