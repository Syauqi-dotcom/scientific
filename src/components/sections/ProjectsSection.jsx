import React from 'react';
import { ArrowRight, ExternalLink, Atom } from 'lucide-react';

const ProjectCard = ({ title, desc, tags, gradient, iconColor }) => (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-[#1B2A41]/10 hover:border-[#E29578] transition-all hover:-translate-y-2 duration-300 shadow-xl">
        <div className={`h-48 ${gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4">
                <Atom size={48} className="text-white/20 group-hover:text-white/40 transition-all transform group-hover:rotate-45 duration-700" />
            </div>
        </div>
        <div className="p-8">
            <div className="flex justify-between items-start mb-4">
                <h3 className={`font-serif text-2xl text-[#1B2A41] group-hover:${iconColor} transition-colors`}>{title}</h3>
                <ExternalLink size={20} className="text-[#1B2A41]/40 group-hover:text-[#1B2A41] transition-colors" />
            </div>
            <p className="text-[#1B2A41]/60 text-sm mb-6 leading-relaxed">
                {desc}
            </p>
            <div className="flex gap-2 flex-wrap">
                {tags.map(tech => (
                    <span key={tech} className="text-xs font-mono px-2 py-1 bg-[#1B2A41]/5 rounded text-[#1B2A41]/70 border border-[#1B2A41]/5">{tech}</span>
                ))}
            </div>
        </div>
    </div>
);

const ProjectsSection = () => (
    <section id="projects" className="py-24 px-6 border-y border-[#1B2A41]/5">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <h2 className="font-serif text-4xl mb-2 text-[#1B2A41]">Selected Works</h2>
                    <p className="text-[#1B2A41]/60 font-light mb-4">Experiments where code meets the quantum realm.</p>
                </div>
                <a href="https://github.com/syauqi" className="text-[#E29578] hover:text-[#1B2A41] flex items-center gap-2 mt-4 md:mt-0 font-mono text-sm group transition-colors font-bold">
                    GITHUB REPO <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <ProjectCard
                    title="The Watercolor Qubit"
                    desc="Visualizing single-qubit rotations on a Bloch Sphere using artistic rendering shaders instead of standard wireframes."
                    tags={['Python', 'OpenGL', 'Qiskit']}
                    gradient="bg-gradient-to-r from-blue-900 to-[#1B2A41]"
                    iconColor="text-[#E29578]"
                />
                <ProjectCard
                    title="Entropy in Text"
                    desc="Analyzing poetry and prose to detect 'information density' using Shannon Entropy, visualized as abstract landscapes."
                    tags={['NLP', 'Python', 'Matplotlib']}
                    gradient="bg-gradient-to-r from-emerald-800 to-teal-900"
                    iconColor="text-[#F4D35E]"
                />
            </div>
        </div>
    </section>
);

export default ProjectsSection;
