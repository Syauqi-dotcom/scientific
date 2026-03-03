import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, desc, tags, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl overflow-hidden border border-[#1B2A41]/10 hover:border-[#1B2A41]/30 transition-all hover:-translate-y-1 duration-300 shadow-sm hover:shadow-md p-6 h-full flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-xl font-bold text-[#1B2A41] group-hover:text-[#E29578] transition-colors">{title}</h3>
                <ExternalLink size={18} className="text-[#1B2A41]/40 group-hover:text-[#1B2A41] transition-colors" />
            </div>
            <p className="text-[#1B2A41]/60 text-sm mb-6 leading-relaxed font-light">
                {desc}
            </p>
        </div>
        <div className="flex gap-2 flex-wrap mt-auto">
            {tags.map(tech => (
                <span key={tech} className="text-xs font-mono px-2 py-1 bg-[#F9FAFB] rounded text-[#1B2A41]/70 border border-[#1B2A41]/5 group-hover:border-[#1B2A41]/20 transition-colors">
                    {tech}
                </span>
            ))}
        </div>
    </a>
);

const ProjectsSection = () => (
    <section id="projects" className="py-24 px-6 border-b border-[#1B2A41]/5 bg-[#FAFAF9]/30">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#1B2A41] mb-4">Selected Works</h2>
                    <p className="text-[#1B2A41]/60 font-light">Experiments where code meets the quantum realm.</p>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <Link to="/projects" className="text-[#E29578] hover:text-[#1B2A41] flex items-center gap-2 font-mono text-sm group transition-colors border-b border-[#E29578]/30 hover:border-[#1B2A41] pb-0.5">
                        VIEW ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="https://github.com/Syauqi-dotcom" target="_blank" rel="noopener noreferrer" className="text-[#1B2A41]/60 hover:text-[#E29578] flex items-center gap-2 font-mono text-sm group transition-colors border-b border-transparent hover:border-[#E29578] pb-0.5">
                        GITHUB <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                    title="Variational Quantum Eigensolver"
                    desc="Calculating the ground state energy of a hydrogen molecule using quantum computing algorithms."
                    tags={['Python', 'Qiskit', 'Chemistry']}
                    link="https://github.com/Syauqi-dotcom/BRIN-Internship-2026"
                />
                <ProjectCard
                    title="Bio-Battery Project"
                    desc="Indonesian Science Project Olympiad 2024. Utilizing coconut waste and tofu liquid waste."
                    tags={['Research', 'Experiment', 'Data Analysis']}
                    link="https://youtu.be/0rkcWSHBx_w?si=edwhKDT1nifmXj-f"
                />
                {/* Placeholder for symmetry or future projects */}
                <div className="hidden lg:flex items-center justify-center p-6 border border-dashed border-[#1B2A41]/10 rounded-xl text-[#1B2A41]/30 text-sm font-mono">
                    More experiments loading...
                </div>
                <Link
                    to="/projects"
                    className="hidden lg:flex items-center justify-center p-6 border border-dashed border-[#1B2A41]/10 rounded-xl text-[#1B2A41]/40 hover:text-[#E29578] hover:border-[#E29578]/30 text-sm font-mono transition-all group"
                >
                    View All Projects <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </section>
);

export default ProjectsSection;
