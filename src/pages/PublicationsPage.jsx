import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ArrowRight, BookOpen } from 'lucide-react';
import CustomCursor from '../components/atoms/CustomCursor';
import Background from '../components/atoms/Background';

const PublicationItem = ({ title, date, journal, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#1B2A41]/10 hover:bg-[#F9FAFB] transition-all px-6 -mx-6 rounded-lg">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[#1B2A41]/50">{date}</span>
                    <span className="font-mono text-xs text-[#E29578] flex items-center gap-1">
                        <FileText size={10} /> {journal}
                    </span>
                </div>
                <h4 className="font-serif text-lg font-medium text-[#1B2A41] group-hover:text-[#E29578] transition-colors leading-relaxed">
                    {title}
                </h4>
            </div>
            <div className="mt-3 md:mt-0 ml-4 text-[#1B2A41]/20 group-hover:text-[#E29578] transition-colors">
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </a>
);

const PublicationsPage = () => {
    const publications = [
        {
            title: "BIO-KOTAK: Biobaterai Komposit Ampas Kelapa (Cocos nucifera) dan Limbah Cair Tahu sebagai Alternatif Sumber Listrik Portabel Terbarukan",
            date: "2024",
            journal: "Jurnal Unpad",
            link: "https://jurnal.unpad.ac.id/jukimpad/article/view/55901"
        },
    ];

    return (
        <div className="relative min-h-screen text-[#1B2A41] font-sans selection:bg-[#E29578] selection:text-[#1B2A41]">
            <CustomCursor />
            <Background scrollY={0} />

            {/* Back Navigation */}
            <nav className="fixed top-0 w-full z-40 backdrop-blur-sm bg-white/70 border-b border-[#1B2A41]/5">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm font-mono text-[#1B2A41]/60 hover:text-[#E29578] transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-wider text-[10px] font-bold">Back to Home</span>
                    </Link>
                    <div className="font-serif text-xl font-bold tracking-tighter text-[#1B2A41]">
                        Syauqi-dotcom
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="pt-28 pb-24 px-6">
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-[#1B2A41]/10 p-8 md:p-12">

                    {/* Header */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#E29578]/10 flex items-center justify-center">
                                <BookOpen size={18} className="text-[#E29578]" />
                            </div>
                            <span className="font-mono text-xs uppercase tracking-widest text-[#1B2A41]/40 font-bold">
                                Academic Work
                            </span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2A41] mb-4 leading-tight">
                            Publications
                        </h1>
                        <p className="text-[#1B2A41]/50 font-light text-lg max-w-2xl leading-relaxed">
                            A collection of published research papers and academic contributions.
                        </p>
                        <div className="mt-6 h-px bg-gradient-to-r from-[#E29578]/40 via-[#E29578]/10 to-transparent"></div>
                    </div>

                    {/* Publications List */}
                    <div className="space-y-2">
                        {publications.map((pub, idx) => (
                            <PublicationItem key={idx} {...pub} />
                        ))}
                    </div>

                    {/* Footer note */}
                    <div className="mt-16 pt-8 border-t border-[#1B2A41]/5">
                        <p className="text-xs font-mono text-[#1B2A41]/30 text-center">
                            More publications coming soon.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PublicationsPage;
