import React, { useState, useEffect } from 'react';
import { callGemini } from './utils/gemini';
import './index.css';

// Components
import CustomCursor from './components/atoms/CustomCursor';
import Background from './components/atoms/Background';
import Navigation from './components/atoms/Navigation';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import AcademicSection from './components/sections/AcademicSection';
import ProjectsSection from './components/sections/ProjectsSection';
import NotebookSection from './components/sections/NotebookSection';
import CassettePlayer from './components/sections/CassettePlayer';
import Footer from './components/sections/Footer';
import ChatWidget from './components/widgets/ChatWidget';

const Portfolio = () => {
    // Global State
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollY, setScrollY] = useState(0);

    // Feature State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([{ role: 'system', text: "Greetings. I am the Quantum Muse." }]);
    const [chatInput, setChatInput] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [expandedNotes, setExpandedNotes] = useState({});
    const [expandingNoteId, setExpandingNoteId] = useState(null);

    // Gemini Tagline State
    const [heroTagline, setHeroTagline] = useState(
        <span>Weaving Logic <br /> <span className="italic text-[#E29578] highlight-marker">into Art.</span></span>
    );
    const [isGeneratingTagline, setIsGeneratingTagline] = useState(false);

    // Scroll Handler
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            const sections = ['hero', 'about', 'academic', 'projects', 'notebook', 'contact'];
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
    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        const userMsg = chatInput;
        setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setChatInput("");
        setIsChatLoading(true);
        const reply = await callGemini(userMsg, "You are a quantum physics assistant for Syauqi. Keep it brief and scientific.");
        setChatMessages(prev => [...prev, { role: 'system', text: reply }]);
        setIsChatLoading(false);
    };

    const handleExpandNote = async (index, title, snippet) => {
        if (expandedNotes[index]) {
            setExpandedNotes(prev => { const n = { ...prev }; delete n[index]; return n; });
            return;
        }
        setExpandingNoteId(index);
        const text = await callGemini(`Expand note: "${title}" - "${snippet}" into a short poetic paragraph.`);
        setExpandedNotes(prev => ({ ...prev, [index]: text }));
        setExpandingNoteId(null);
    };

    const handleGenerateTagline = async () => {
        setIsGeneratingTagline(true);
        const text = await callGemini(
            "Generate a short, abstract, 3 word poetic tagline combining quantum physics and digital art. Return ONLY the text, no quotes."
        );
        // Wrap in JSX for styling consistency
        setHeroTagline(
            <span>{text}</span>
        );
        setIsGeneratingTagline(false);
    };

    return (
        <div className="relative min-h-screen text-[#1B2A41] font-sans selection:bg-[#E29578] selection:text-[#1B2A41]">
            <CustomCursor />
            <Background scrollY={scrollY} />
            <Navigation activeSection={activeSection} />

            <main>
                <HeroSection
                    tagline={heroTagline}
                    onGenerateTagline={handleGenerateTagline}
                    isGeneratingTagline={isGeneratingTagline}
                />
                <AboutSection />
                <AcademicSection />
                <ProjectsSection />
                <NotebookSection
                    expandedNotes={expandedNotes}
                    expandingNoteId={expandingNoteId}
                    handleExpandNote={handleExpandNote}
                />

                {/* Spotify Zone */}
                <section id="spotify-zone" className="py-24 border-t border-[#1B2A41]/5 bg-white/95 backdrop-blur-sm shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-serif text-3xl mb-4 text-[#1B2A41]">Audio Backdrop</h2>
                            <p className="text-[#1B2A41]/60 font-light">Lo-fi beats for deep work.</p>
                        </div>
                        <CassettePlayer />
                    </div>
                </section>

                <Footer />
            </main>

            <ChatWidget
                isOpen={isChatOpen}
                toggleOpen={() => setIsChatOpen(!isChatOpen)}
                messages={chatMessages}
                input={chatInput}
                setInput={setChatInput}
                onSubmit={handleChatSubmit}
                isLoading={isChatLoading}
            />


        </div>
    );
};

export default Portfolio;
