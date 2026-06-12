import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../../utils/useScrollReveal';
import SectionLabel from '../atoms/SectionLabel';

const notebookModules = import.meta.glob('../../content/notebook/*.json', { eager: true });
const notebookEntries = Object.values(notebookModules).map(mod => mod.default || mod).sort((a,b) => new Date(b.date) - new Date(a.date));

const NoteCard = ({ index, note, expanded, onExpand, isExpanding }) => (
    <div className="bg-white p-6 rounded-xl border border-[#16161D]/10 hover:border-[#A3785B] transition-colors relative group h-full flex flex-col justify-between">
        <div>
        <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-xs text-[#A3785B] font-bold">{note.date}</span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#EFF1F3] text-[#16161D]/60">{note.tag}</span>
        </div>
        <h3 className="font-serif text-lg font-bold text-[#16161D] mb-2">{note.title}</h3>
        <p className="text-sm text-[#16161D]/60 font-light leading-relaxed mb-4 whitespace-pre-wrap">"{note.snippet}"</p>

        </div>
        <div>
            <button
                onClick={() => onExpand(index, note.explanation)}
                disabled={isExpanding}
                className="flex items-center gap-2 text-xs font-mono text-[#16161D]/40 hover:text-[#A3785B] transition-colors mt-auto pt-2"
            >
                {isExpanding ? (
                    <><span className="animate-spin">✨</span> PROCESSING...</>
                ) : (
                    <><Sparkles size={12} /> {expanded ? 'COLLAPSE' : 'MORE EXPLANATION'}</>
                )}
            </button>

            {expanded && typeof expanded === 'string' && (
                <div className="mt-4 pt-4 border-t border-[#16161D]/5 text-xs text-[#16161D]/80 leading-relaxed italic animate-in fade-in slide-in-from-top-2 whitespace-pre-wrap">
                    {expanded}
                </div>
            )}
        </div>
    </div>
);

const NotebookSection = ({ expandedNotes, expandingNoteId, handleExpandNote }) => {
    const featuredNotes = notebookEntries.slice(0, 2);

    return (
        <section id="notebook" className="py-24 px-6 border-t border-[#16161D]/5">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal delay={0} direction="up">
                    <div className="grid md:grid-cols-[200px_1fr] gap-8 mb-12">
                        <div className="pt-1">
                            <SectionLabel index={2} label="Research Notes" />
                        </div>
                        <div className="flex items-center justify-between">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#16161D]">Research Notes</h2>
                            <Link
                                to="/publications"
                                className="flex items-center gap-2 text-xs font-mono text-[#16161D]/40 hover:text-[#A3785B] transition-colors group uppercase tracking-wider"
                            >
                                <span>Publications</span>
                                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
                <div className="grid md:grid-cols-2 gap-4">
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
            </div>
        </section>
    );
};

export default NotebookSection;
