import React, { useState, useEffect } from 'react';
import './index.css';
const heroPhoto = `${import.meta.env.BASE_URL}assets/foto (1).webp`;
const heroPhoto2 = `${import.meta.env.BASE_URL}assets/foto2.webp`;

// Components
import CustomCursor from './components/atoms/CustomCursor';
import Background from './components/atoms/Background';
import Navigation from './components/atoms/Navigation';
import HeroSection from './components/sections/HeroSection';
import ProfileSection from './components/sections/ProfileSection';
import ProjectsSection from './components/sections/ProjectsSection';
import GithubSection from './components/sections/GithubSection';
import NotebookSection from './components/sections/NotebookSection';
import Footer from './components/sections/Footer';
import TechStackMarquee from './components/sections/TechStackMarquee';
import TypeWriter from './components/atoms/TypeWriter';

const Portfolio = () => {
    // Global State
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollY, setScrollY] = useState(0);

    // Feature State
    const [expandedNotes, setExpandedNotes] = useState({});
    const [expandingNoteId, setExpandingNoteId] = useState(null);

    // Scroll Handler
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            const sections = ['hero', 'profile', 'projects', 'notebook', 'contact'];
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

    // Handlers

    const handleExpandNote = async (index, explanation) => {
        if (expandedNotes[index]) {
            setExpandedNotes(prev => { const n = { ...prev }; delete n[index]; return n; });
            return;
        }
        setExpandingNoteId(index);

        // Mempertahankan animasi efek loading spinner agar tetap terasa interaktif
        await new Promise(resolve => setTimeout(resolve, 600));

        setExpandedNotes(prev => ({ ...prev, [index]: explanation || "No explanation provided for this note yet." }));
        setExpandingNoteId(null);
    };

    return (
        <div className="relative min-h-screen text-[#16161D] font-sans selection:bg-[#A3785B] selection:text-[#16161D]">
            <CustomCursor />
            <Background scrollY={scrollY} />
            <Navigation activeSection={activeSection} />

            <main>
                <HeroSection
                    tagline={<span>Hi! I'm, <TypeWriter text="Syauqi." speed={120} delay={800} className="italic text-[#A3785B]" cursorClassName="text-[#A3785B]/60 font-light" /></span>}
                    heroImage={heroPhoto}
                    heroBackImage={heroPhoto2}
                />

                <ProfileSection />

                <TechStackMarquee />
                <ProjectsSection />
                <NotebookSection
                    expandedNotes={expandedNotes}
                    expandingNoteId={expandingNoteId}
                    handleExpandNote={handleExpandNote}
                />
                <GithubSection />
                <Footer />
            </main>
        </div>
    );
};

export default Portfolio;
