import React, { useState } from 'react';
import { FileText, ArrowRight, BookOpen } from 'lucide-react';
import CustomCursor from '../components/atoms/CustomCursor';
import Background from '../components/atoms/Background';
import Navigation from '../components/atoms/Navigation';

const PublicationItem = ({ title, date, journal, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#16161D]/10 hover:bg-[#EFF1F3] transition-all px-6 -mx-6 rounded-lg">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[#16161D]/50">{date}</span>
                    <span className="font-mono text-xs text-[#A3785B] flex items-center gap-1">
                        <FileText size={10} /> {journal}
                    </span>
                </div>
                <h4 className="font-serif text-lg font-medium text-[#16161D] group-hover:text-[#A3785B] transition-colors leading-relaxed">
                    {title}
                </h4>
            </div>
            <div className="mt-3 md:mt-0 ml-4 text-[#16161D]/20 group-hover:text-[#A3785B] transition-colors">
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </a>
);

const PublicationsPage = ({ bgAnimationDisabled, toggleBgAnimation }) => {
    const [isNavHovered, setIsNavHovered] = useState(false);

    const publications = [
        {
            title: "BIO-KOTAK: Biobaterai Komposit Ampas Kelapa (Cocos nucifera) dan Limbah Cair Tahu sebagai Alternatif Sumber Listrik Portabel Terbarukan",
            date: "2024",
            journal: "Jurnal Unpad",
            link: "https://jurnal.unpad.ac.id/jukimpad/article/view/55901"
        },
    ];

    return (
        <div className="relative min-h-screen text-[#16161D] font-sans selection:bg-[#A3785B] selection:text-[#16161D]">
            <CustomCursor />
            <Background scrollY={0} disabled={bgAnimationDisabled} />

            {/* Main Navigation */}
            <Navigation
                hoverMode={true}
                onHoverChange={setIsNavHovered}
                bgAnimationDisabled={bgAnimationDisabled}
                toggleBgAnimation={toggleBgAnimation}
            />

            {/* Main bordered frame */}
            <div className={`relative z-10 w-full min-h-screen pb-4 px-4 md:pb-6 md:px-6 transition-all duration-500 ease-in-out ${isNavHovered ? 'pt-24 md:pt-[88px]' : 'pt-4 md:pt-6'}`}>
                <div className="min-h-[calc(100vh-2rem)] border-2 border-[#16161D]/15 rounded-lg overflow-hidden relative bg-white/40 backdrop-blur-[1px] p-8 md:p-12">
                    <main className="max-w-4xl mx-auto">

                        {/* Header */}
                        <div className="mb-16">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[#A3785B]/10 flex items-center justify-center">
                                    <BookOpen size={18} className="text-[#A3785B]" />
                                </div>
                                <span className="font-mono text-xs uppercase tracking-widest text-[#16161D]/40 font-bold">
                                    Academic Work
                                </span>
                            </div>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#16161D] mb-4 leading-tight">
                                Publications
                            </h1>
                            <p className="text-[#16161D]/50 font-light text-lg max-w-2xl leading-relaxed">
                                A collection of published research papers and academic contributions.
                            </p>
                            <div className="mt-6 h-px bg-gradient-to-r from-[#A3785B]/40 via-[#A3785B]/10 to-transparent"></div>
                        </div>

                        {/* Publications List */}
                        <div className="space-y-2">
                            {publications.map((pub, idx) => (
                                <PublicationItem key={idx} {...pub} />
                            ))}
                        </div>

                        {/* Footer note */}
                        <div className="mt-16 pt-8 border-t border-[#16161D]/5">
                            <p className="text-xs font-mono text-[#16161D]/30 text-center">
                                More publications coming soon.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PublicationsPage;
