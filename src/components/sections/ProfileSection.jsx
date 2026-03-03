import React from 'react';
import { Terminal, GraduationCap, Briefcase } from 'lucide-react';
import { ScrollReveal } from '../../utils/useScrollReveal';
import brinLogo from '../../assets/brin.png';
import ugmLogo from '../../assets/ugm.png';
import sman3Logo from '../../assets/sman3semarang.png';

// Experience data with optional logo support
const experiences = [
    {
        title: "National Research and Innovation Agency (BRIN)",
        year: "2026",
        description: "Research Intern at Pusat Riset Fisika Kuantum",
        tags: ['Quantum Circuit', 'VQE', 'Research'],
        logo: brinLogo,
    },
    {
        title: "Department of Electrical and Information Engineering",
        year: "2025 (odd Semester)",
        description: "Tutor Asistance of Physics, Wave, and Heat Transfer",
        tags: [],
        logo: ugmLogo,
    },
    {
        title: "SMAN 3 Semarang",
        year: "2023",
        description: "Coordinator of Physics Tutor for Preparing Olimpiade Sains Nasional (OSN) Physics",
        tags: [],
        logo: sman3Logo,
    },
];

const ExperienceItem = ({ title, year, description, tags, logo, index }) => (
    <ScrollReveal delay={0.1 * index} direction="up">
        <div className="group flex gap-5 items-start">
            {/* Logo Slot */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white border border-[#1B2A41]/10 flex items-center justify-center overflow-hidden group-hover:border-[#E29578]/30 transition-colors shadow-sm p-1.5">
                {logo ? (
                    <img src={logo} alt={title} className="w-full h-full object-contain" />
                ) : (
                    <Briefcase size={18} className="text-[#1B2A41]/20 group-hover:text-[#E29578]/50 transition-colors" />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row gap-1 md:items-baseline justify-between mb-1">
                    <h4 className="font-bold text-lg text-[#1B2A41] group-hover:text-[#E29578] transition-colors leading-snug">{title}</h4>
                    <span className="font-mono text-xs text-[#1B2A41]/40 whitespace-nowrap">{year}</span>
                </div>
                <p className="text-[#1B2A41]/60 text-sm mb-2">{description}</p>
                {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </ScrollReveal>
);

const ProfileSection = () => (
    <section id="profile" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-[#1B2A41]/10 p-8 md:p-12">
            <div className="grid md:grid-cols-12 gap-12">

                {/* Left Column: Education & Skills (5 cols) */}
                <div className="md:col-span-12 lg:col-span-5 space-y-12">
                    {/* Education */}
                    <div>
                        <ScrollReveal delay={0}>
                            <h3 className="font-serif text-2xl text-[#1B2A41] mb-6 flex items-center gap-3">
                                <GraduationCap className="text-[#E29578]" size={24} />
                                Education
                            </h3>
                        </ScrollReveal>
                        <div className="space-y-6">
                            <ScrollReveal delay={0.1} direction="left">
                                <div className="relative pl-6 border-l-2 border-[#1B2A41]/10">
                                    <span className="font-mono text-xs text-[#E29578] font-bold">2024 - Present</span>
                                    <h4 className="font-bold text-[#1B2A41] text-lg">Bachelor of Information Engineering</h4>
                                    <p className="text-[#1B2A41]/60 text-sm">Universitas Gadjah Mada</p>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.25} direction="left">
                                <div className="relative pl-6 border-l-2 border-[#1B2A41]/10">
                                    <span className="font-mono text-xs text-[#1B2A41]/40 font-bold">2021 - 2024</span>
                                    <h4 className="font-bold text-[#1B2A41] text-lg">Senior High School</h4>
                                    <p className="text-[#1B2A41]/60 text-sm">SMAN 3 Semarang</p>
                                    <p className="text-[#1B2A41]/50 text-xs italic mt-1">"Where the fascination with physics began."</p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Skills / Toolkit */}
                    <div>
                        <ScrollReveal delay={0}>
                            <h3 className="font-serif text-2xl text-[#1B2A41] mb-6 flex items-center gap-3">
                                <Terminal className="text-[#E29578]" size={24} />
                                Toolkit
                            </h3>
                        </ScrollReveal>
                        <div className="space-y-6">
                            <ScrollReveal delay={0.1} direction="up">
                                <div>
                                    <h4 className="font-mono text-xs text-[#1B2A41]/50 mb-3 uppercase tracking-wider font-bold">Languages</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Python', 'C++', 'Solidity', 'TypeScript', 'Node.JS'].map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-[#F9FAFB] rounded border border-[#1B2A41]/10 text-xs font-mono text-[#1B2A41] hover:bg-[#1B2A41] hover:text-white transition-colors cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2} direction="up">
                                <div>
                                    <h4 className="font-mono text-xs text-[#1B2A41]/50 mb-3 uppercase tracking-wider font-bold">Scientific</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Qiskit', 'PyTorch', 'Scipy', 'TensorFlow', 'PennyLane'].map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-[#F9FAFB] rounded border border-[#1B2A41]/10 text-xs font-mono text-[#E29578] hover:bg-[#E29578] hover:text-white transition-colors cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Right Column: Experience & Bio (7 cols) */}
                <div className="md:col-span-12 lg:col-span-7 space-y-12">
                    {/* Bio */}
                    <ScrollReveal delay={0} direction="right">
                        <div>
                            <h2 className="font-mono text-2xl uppercase tracking-widest text-[#E29578] font-bold">Focus</h2>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-[#1B2A41]">Data Science, Generative AI, Quantum Computing</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Experience */}
                    <div>
                        <ScrollReveal delay={0}>
                            <h3 className="font-serif text-2xl text-[#1B2A41] mb-6 flex items-center gap-3">
                                <Briefcase className="text-[#E29578]" size={24} />
                                Experiences & Projects
                            </h3>
                        </ScrollReveal>
                        <div className="space-y-6">
                            {experiences.map((exp, idx) => (
                                <ExperienceItem key={idx} {...exp} index={idx} />
                            ))}
                        </div>

                        {/* Divider */}
                        <ScrollReveal delay={0.4}>
                            <div className="h-px bg-[#1B2A41]/10 w-full mt-8" />
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </div>
    </section>
);

export default ProfileSection;
