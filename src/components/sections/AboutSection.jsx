import React from 'react';
import SectionLabel from '../atoms/SectionLabel';
import { ScrollReveal } from '../../utils/useScrollReveal';
import profileData from '../../content/profile.json';

const AboutSection = () => (
    <section id="about" className="py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[200px_1fr] gap-12">
                {/* Left: section label */}
                <div className="pt-2">
                    <ScrollReveal delay={0}>
                        <SectionLabel index={0} label="About" />
                    </ScrollReveal>
                </div>

                {/* Right: editorial bio */}
                <div>
                    <ScrollReveal delay={0.15} direction="up">
                        <p className="text-[#16161D] text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.2] mb-8">
                            {profileData.authorRole} at{' '}
                            <span className="italic text-[#16161D]/60">Universitas Gadjah Mada,</span>{' '}
                            working at the intersection of{' '}
                            <span className="italic" style={{ color: '#A3785B' }}>quantum computing</span>,
                            {' '}data science, and{' '}
                            <span className="italic" style={{ color: '#A3785B' }}>generative AI</span>.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3} direction="up">
                        <p className="text-[#16161D]/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            I implement quantum algorithms like VQE for real-world problems, build data-driven systems,
                            and explore the frontier of AI. When I'm not writing code, I'm tutoring physics
                            and preparing the next generation for national science olympiads.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.45} direction="up">
                        <div className="mt-12 flex gap-6 flex-wrap">
                            <a
                                href={profileData.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs uppercase tracking-widest text-[#16161D]/65 hover:text-[#A3785B] transition-colors border-b border-[#16161D]/10 hover:border-[#A3785B] pb-0.5"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href={`mailto:${profileData.socials.email}`}
                                className="font-mono text-xs uppercase tracking-widest text-[#16161D]/65 hover:text-[#A3785B] transition-colors border-b border-[#16161D]/10 hover:border-[#A3785B] pb-0.5"
                            >
                                Email ↗
                            </a>
                            <a
                                href="/CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs uppercase tracking-widest text-[#16161D]/65 hover:text-[#A3785B] transition-colors border-b border-[#16161D]/10 hover:border-[#A3785B] pb-0.5"
                            >
                                Resume ↗
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    </section>
);

export default AboutSection;
