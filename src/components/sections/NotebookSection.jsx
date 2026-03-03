import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const NoteCard = ({ index, note, expanded, onExpand, isExpanding }) => (
    <div className="bg-white p-6 rounded-xl border border-[#1B2A41]/10 hover:border-[#E29578] transition-colors relative group">
        <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-xs text-[#E29578] font-bold">{note.date}</span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#F9FAFB] text-[#1B2A41]/60">{note.tag}</span>
        </div>
        <h3 className="font-serif text-lg font-bold text-[#1B2A41] mb-2">{note.title}</h3>
        <p className="text-sm text-[#1B2A41]/60 font-light leading-relaxed mb-4">"{note.snippet}"</p>

        <button
            onClick={() => onExpand(index, note.title, note.snippet)}
            disabled={isExpanding}
            className="flex items-center gap-2 text-xs font-mono text-[#1B2A41]/40 hover:text-[#E29578] transition-colors"
        >
            {isExpanding ? (
                <><span className="animate-spin">✨</span> PROCESSING...</>
            ) : (
                <><Sparkles size={12} /> {expanded ? 'COLLAPSE' : 'EXPAND WITH AI'}</>
            )}
        </button>

        {expanded && typeof expanded === 'string' && (
            <div className="mt-4 pt-4 border-t border-[#1B2A41]/5 text-xs text-[#1B2A41]/80 leading-relaxed italic animate-in fade-in slide-in-from-top-2">
                {expanded}
            </div>
        )}
    </div>
);

const NotebookSection = ({ expandedNotes, expandingNoteId, handleExpandNote }) => {
    const featuredNotes = [
        { title: "Understanding Hadamard", date: "2025-01-15", tag: "Quantum", snippet: "It creates superposition, but mathematically it feels like a rotation in Hilbert space..." },
        { title: "Sunsets & Entropy", date: "2025-01-02", tag: "Reflection", snippet: "The gradient of colors is just distinct wavelengths diffusing... much like information loss." }
    ];

    return (
        <section id="notebook" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-[#1B2A41]">Research Notes</h2>
                    <Link
                        to="/publications"
                        className="flex items-center gap-2 text-xs font-mono text-[#1B2A41]/40 hover:text-[#E29578] transition-colors group"
                    >
                        <span className="uppercase tracking-wider font-bold">Publications</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
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
            </div>
        </section>
    );
};

export default NotebookSection;
