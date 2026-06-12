import React from 'react';
import { Terminal, GraduationCap, Briefcase } from 'lucide-react';
import { ScrollReveal } from '../../utils/useScrollReveal';
import SectionLabel from '../atoms/SectionLabel';
const brinLogo = `${import.meta.env.BASE_URL}assets/brin.png`;
const ugmLogo = `${import.meta.env.BASE_URL}assets/ugm.png`;
const sman3Logo = `${import.meta.env.BASE_URL}assets/sman3semarang.png`;

// Experience data with optional logo support
const experiences = [
    {
        title: "Badan Riset dan Inovasi Nasional (BRIN)",
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
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white border border-[#16161D]/10 flex items-center justify-center overflow-hidden group-hover:border-[#A3785B]/30 transition-colors shadow-sm p-1.5">
                {logo ? (
                    <img src={logo} alt={title} className="w-full h-full object-contain" />
                ) : (
                    <Briefcase size={18} className="text-[#16161D]/20 group-hover:text-[#A3785B]/50 transition-colors" />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row gap-1 md:items-baseline justify-between mb-1">
                    <h4 className="font-bold text-lg text-[#16161D] group-hover:text-[#A3785B] transition-colors leading-snug">{title}</h4>
                    <span className="font-mono text-xs text-[#16161D]/40 whitespace-nowrap">{year}</span>
                </div>
                <p className="text-[#16161D]/60 text-sm mb-2">{description}</p>
                {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-[#16161D]/5 px-2 py-0.5 rounded text-[#16161D]/60 border border-[#16161D]/10">
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
    <section id="profile" className="py-24 px-6 relative border-t border-[#16161D]/5">
        {/* Section number label */}
        <div className="max-w-6xl mx-auto mb-10">
            <ScrollReveal delay={0} direction="up">
                <SectionLabel index={0} label="About" />
            </ScrollReveal>
        </div>

        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-[#16161D]/10 p-8 md:p-12">
            <div className="grid md:grid-cols-12 gap-12">

                {/* Left Column: Education & Skills (5 cols) */}
                <div className="md:col-span-12 lg:col-span-5 space-y-12">
                    {/* Education */}
                    <div>
                        <ScrollReveal delay={0}>
                            <h3 className="font-serif text-2xl text-[#16161D] mb-6 flex items-center gap-3">
                                <GraduationCap className="text-[#A3785B]" size={24} />
                                Education
                            </h3>
                        </ScrollReveal>
                        <div className="space-y-6">
                            <ScrollReveal delay={0.1} direction="left">
                                <div className="relative pl-6 border-l-2 border-[#16161D]/10">
                                    <span className="font-mono text-xs text-[#A3785B] font-bold">2024 - Present</span>
                                    <h4 className="font-bold text-[#16161D] text-lg">Information Engineering Undergraduate</h4>
                                    <p className="text-[#16161D]/60 text-sm">Universitas Gadjah Mada</p>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.25} direction="left">
                                <div className="relative pl-6 border-l-2 border-[#16161D]/10">
                                    <span className="font-mono text-xs text-[#16161D]/40 font-bold">2021 - 2024</span>
                                    <h4 className="font-bold text-[#16161D] text-lg">Senior High School</h4>
                                    <p className="text-[#16161D]/60 text-sm">SMAN 3 Semarang</p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Skills / Toolkit */}
                    <div>
                        <ScrollReveal delay={0}>
                            <h3 className="font-serif text-2xl text-[#16161D] mb-6 flex items-center gap-3">
                                <Terminal className="text-[#A3785B]" size={24} />
                                Toolkit
                            </h3>
                        </ScrollReveal>
                        <div className="space-y-6">
                            <ScrollReveal delay={0.1} direction="up">
                                <div>
                                    <h4 className="font-mono text-xs text-[#16161D]/50 mb-3 uppercase tracking-wider font-bold">Best Tools Ever</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Python', 'Power BI', 'Solidity', 'TypeScript'].map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-[#EFF1F3] rounded border border-[#16161D]/10 text-xs font-mono text-[#16161D] hover:bg-[#16161D] hover:text-white transition-colors cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2} direction="up">
                                <div>
                                    <h4 className="font-mono text-xs text-[#16161D]/50 mb-3 uppercase tracking-wider font-bold">Scientific</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Qiskit', 'PyTorch', 'Scipy', 'TensorFlow'].map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-[#EFF1F3] rounded border border-[#16161D]/10 text-xs font-mono text-[#A3785B] hover:bg-[#A3785B] hover:text-white transition-colors cursor-default">
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
                            <h2 className="font-mono text-2xl uppercase tracking-widest text-[#A3785B] font-bold">Focus</h2>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-[#16161D]">Data Science, Generative AI, Quantum Computing</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Experience */}
                    <div>
                        <ScrollReveal delay={0}>
                            <h3 className="font-serif text-2xl text-[#16161D] mb-6 flex items-center gap-3">
                                <Briefcase className="text-[#A3785B]" size={24} />
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
                            <div className="h-px bg-[#16161D]/10 w-full mt-8" />
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </div>
    </section>
);

export default ProfileSection;
