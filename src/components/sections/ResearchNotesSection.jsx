import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../../utils/useScrollReveal';
import SectionLabel from '../atoms/SectionLabel';

const notebookModules = import.meta.glob('../../content/notebook/*.json', { eager: true });
const notebookEntries = Object.values(notebookModules)
    .map(mod => mod.default || mod)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

const NoteCard = ({ index, note, expanded, onExpand, isExpanding }) => (
    <div className="bg-white/80 p-7 rounded-xl border border-[#16161D]/8 hover:border-[#A3785B]/40 transition-all duration-300 relative group flex flex-col justify-between h-full shadow-sm">
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-[#A3785B] font-bold tracking-widest">{note.date}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-[#16161D]/8 text-[#16161D]/45">
                    {note.tag}
                </span>
            </div>

            <h3 className="font-serif text-xl text-[#16161D] mb-3 group-hover:text-[#A3785B] transition-colors leading-snug">
                {note.title}
            </h3>
            <p className="text-sm text-[#16161D]/55 font-light leading-relaxed mb-5 italic">
                "{note.snippet}"
            </p>
        </div>

        <div>
            <button
                onClick={() => onExpand(index, note.explanation)}
                disabled={isExpanding}
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#16161D]/50 hover:text-[#A3785B] transition-colors"
            >
                {isExpanding ? (
                    <><span className="animate-spin">✨</span> PROCESSING...</>
                ) : (
                    <><Sparkles size={11} /> {expanded ? 'COLLAPSE' : 'MORE EXPLANATION'}</>
                )}
            </button>

            {expanded && typeof expanded === 'string' && (
                <div className="mt-4 pt-4 border-t border-[#16161D]/8 text-xs text-[#16161D]/60 leading-relaxed italic whitespace-pre-wrap animate-in fade-in slide-in-from-top-2">
                    {expanded}
                </div>
            )}
        </div>
    </div>
);

const ResearchNotesSection = () => {
    const [expandedNotes, setExpandedNotes] = useState({});
    const [expandingNoteId, setExpandingNoteId] = useState(null);
    const featuredNotes = notebookEntries.slice(0, 2);

    const handleExpandNote = async (index, explanation) => {
        if (expandedNotes[index]) {
            setExpandedNotes(prev => { const n = { ...prev }; delete n[index]; return n; });
            return;
        }
        setExpandingNoteId(index);
        await new Promise(r => setTimeout(r, 600));
        setExpandedNotes(prev => ({ ...prev, [index]: explanation || 'No explanation available.' }));
        setExpandingNoteId(null);
    };

    return (
        <section id="research" className="py-32 border-t border-[#16161D]/5">
            <div className="max-w-6xl mx-auto px-6 md:px-16">

                {/* Split header */}
                <ScrollReveal delay={0} direction="up">
                    <div className="grid md:grid-cols-[200px_1fr] gap-12 items-end mb-14">
                        <div className="pt-2">
                            <SectionLabel index={3} label="Research Notes" />
                        </div>
                        <div className="flex items-end justify-between">
                            <h2 className="font-serif text-4xl md:text-5xl text-[#16161D] leading-tight">
                                Notes from the{' '}
                                <span className="italic" style={{ color: '#A3785B' }}>frontier.</span>
                            </h2>
                            <Link
                                to="/publications"
                                className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#16161D]/50 hover:text-[#A3785B] transition-colors border-b border-[#16161D]/10 hover:border-[#A3785B]/50 pb-0.5 flex-shrink-0"
                            >
                                All publications <ArrowRight size={11} />
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-5">
                    {featuredNotes.map((note, idx) => (
                        <ScrollReveal key={idx} delay={0.1 * (idx + 1)} direction="up" className="h-full">
                            <NoteCard
                                index={idx}
                                note={note}
                                expanded={expandedNotes[idx]}
                                onExpand={handleExpandNote}
                                isExpanding={expandingNoteId === idx}
                            />
                        </ScrollReveal>
                    ))}
                </div>

                {/* Mobile publications link */}
                <div className="mt-8 flex md:hidden">
                    <Link
                        to="/publications"
                        className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#16161D]/50 hover:text-[#A3785B] transition-colors"
                    >
                        All publications <ArrowRight size={11} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ResearchNotesSection;
