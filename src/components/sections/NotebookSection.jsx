import React from 'react';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';

const NoteCard = ({ index, note, expanded, onExpand, isExpanding }) => {
    const isEven = index % 2 === 0;
    const rotationClass = isEven ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0';
    const colorClass = isEven
        ? 'bg-[#FDF6E3] text-[#1B2A41] border border-[#1B2A41]/10 shadow-[4px_4px_0_#E29578]'
        : 'bg-[#1B2A41] text-white shadow-[4px_4px_0_#F4D35E]';
    const tagColor = isEven ? 'bg-[#1B2A41] text-white' : 'bg-white text-[#1B2A41]';
    const subTextColor = isEven ? 'text-[#1B2A41]/70' : 'text-slate-300';
    const buttonColor = isEven ? 'text-[#E29578] hover:text-[#1B2A41] border-[#1B2A41]/10' : 'text-[#F4D35E] hover:text-white border-white/10';

    return (
        <div className={`break-inside-avoid p-6 transition-all duration-300 transform ${rotationClass} ${colorClass}`}>
            <div className={`flex justify-between items-center mb-4 pb-2 border-b-2 border-dashed ${isEven ? 'border-[#1B2A41]/10' : 'border-white/20'}`}>
                <span className={`font-mono text-xs font-bold ${isEven ? 'text-[#E29578]' : 'text-[#F4D35E]'}`}>{note.date}</span>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${tagColor}`}>{note.tag}</span>
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">{note.title}</h3>
            <p className={`text-sm leading-relaxed mb-6 font-light ${subTextColor}`}>"{note.snippet}"</p>

            <button
                onClick={() => onExpand(index, note.title, note.snippet)}
                disabled={isExpanding}
                className={`flex items-center gap-2 text-xs font-mono w-full pt-4 border-t ${buttonColor}`}
            >
                {isExpanding ? (
                    <><span className="animate-spin">✨</span> PROCESSING...</>
                ) : (
                    <><Sparkles size={12} /> {expanded ? 'COLLAPSE' : 'EXPAND WITH AI'}</>
                )}
            </button>

            {expanded && typeof expanded === 'string' && (
                <div className={`mt-4 p-4 text-xs leading-relaxed italic animate-in fade-in slide-in-from-top-2 border-l-2 ${isEven ? 'bg-[#E29578]/10 border-[#E29578] text-[#1B2A41]' : 'bg-white/10 border-[#F4D35E] text-slate-200'}`}>
                    {expanded}
                </div>
            )}
        </div>
    );
};

const PublicationItem = ({ title, date, journal, link }) => (
    <a href={link} className="group block">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#1B2A41]/10 hover:bg-[#1B2A41]/5 transition-all px-4 -mx-4 rounded-lg">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[#E29578] bg-[#E29578]/10 px-2 py-0.5 rounded">{date}</span>
                    <span className="font-mono text-xs text-[#1B2A41]/50 flex items-center gap-1"><FileText size={10} /> {journal}</span>
                </div>
                <h4 className="font-serif text-xl text-[#1B2A41] group-hover:text-[#E29578] transition-colors">{title}</h4>
            </div>
            <div className="mt-4 md:mt-0 md:pl-8 flex items-center gap-2 text-[#1B2A41]/30 group-hover:text-[#E29578] transition-colors font-mono text-xs uppercase tracking-wider font-bold">
                Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </a>
);

const NotebookSection = ({ expandedNotes, expandingNoteId, handleExpandNote }) => {
    const featuredNotes = [
        { title: "Understanding Hadamard", date: "2025-01-15", tag: "Quantum", snippet: "It creates superposition, but mathematically it feels like a rotation in Hilbert space..." },
        { title: "Sunsets & Entropy", date: "2025-01-02", tag: "Reflection", snippet: "The gradient of colors is just distinct wavelengths diffusing... much like information loss." }
    ];

    const publications = [
        { title: "A Review on Quantum Teleportation Protocols", date: "2024-12-10", journal: "IEEE Quantum Week", link: "#" },
        { title: "Generative Adversarial Networks in Art", date: "2024-11-05", journal: "Digital Humanities Quarterly", link: "#" },
        { title: "Noise as a Creative Force", date: "2024-10-22", journal: "Medium", link: "#" },
        { title: "Simulating Entanglement on Classical Hardware", date: "2024-09-15", journal: "ArXiv Preprint", link: "#" }
    ];

    return (
        <section id="notebook" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="font-serif text-4xl mb-4 text-center text-[#1B2A41]">Research Log</h2>
                <p className="text-[#1B2A41]/60 font-light text-center mb-16 max-w-xl mx-auto">Raw thoughts, derivation scribbles, and formal publications.</p>

                {/* 1. Featured Notes (Grid - 2 Items Only) */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {featuredNotes.map((note, idx) => (
                        <NoteCard
                            key={idx}
                            index={idx}
                            note={note}
                            expanded={expandedNotes[idx]}
                            onExpand={handleExpandNote}
                            isExpanding={expandingNoteId === idx}
                        />
                    ))}
                </div>

                {/* 2. Publications List */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="font-mono text-sm uppercase tracking-widest text-[#1B2A41] font-bold">Recent Publications</h3>
                        <div className="h-[1px] flex-1 bg-[#1B2A41]/10"></div>
                    </div>

                    <div className="space-y-2">
                        {publications.map((pub, idx) => (
                            <PublicationItem key={idx} {...pub} />
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <a href="#" className="inline-flex items-center gap-2 text-sm font-mono text-[#1B2A41]/50 hover:text-[#E29578] transition-colors border-b border-transparent hover:border-[#E29578]">
                            VIEW ARCHIVE <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotebookSection;
