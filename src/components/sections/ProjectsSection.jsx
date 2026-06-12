import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import profileData from '../../content/profile.json';
import { ScrollReveal } from '../../utils/useScrollReveal';
import SectionLabel from '../atoms/SectionLabel';

const projectModules = import.meta.glob('../../content/projects/*.json', { eager: true });
const allProjects = Object.values(projectModules).map(mod => mod.default || mod).sort((a, b) => b.date - a.date);
const featuredProjects = allProjects.slice(0, 2);

const ProjectCard = ({ title, desc, tags, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-xl overflow-hidden border border-[#16161D]/10 hover:border-[#16161D]/30 transition-all hover:-translate-y-1 duration-300 shadow-sm hover:shadow-md p-6 h-full flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-xl font-bold text-[#16161D] group-hover:text-[#A3785B] transition-colors">{title}</h3>
                <ExternalLink size={18} className="text-[#16161D]/40 group-hover:text-[#16161D] transition-colors" />
            </div>
            <p className="text-[#16161D]/60 text-sm mb-6 leading-relaxed font-light whitespace-pre-wrap">
                {desc}
            </p>
        </div>
        <div className="flex gap-2 flex-wrap mt-auto">
            {tags.map(tech => (
                <span key={tech} className="text-xs font-mono px-2 py-1 bg-[#EFF1F3] rounded text-[#16161D]/70 border border-[#16161D]/5 group-hover:border-[#16161D]/20 transition-colors">
                    {tech}
                </span>
            ))}
        </div>
    </a>
);

const ProjectsSection = () => (
    <section id="projects" className="py-24 px-6 border-t border-[#16161D]/5">
        <div className="max-w-6xl mx-auto">

            {/* Split header: numbered label + title/links */}
            <ScrollReveal delay={0} direction="up">
                <div className="grid md:grid-cols-[200px_1fr] gap-8 mb-14">
                    <div className="pt-1">
                        <SectionLabel index={1} label="Selected Works" />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#16161D] mb-3">Selected Works</h2>
                            <p className="text-[#16161D]/50 font-light text-sm">{profileData.tagline}</p>
                        </div>
                        <div className="flex items-center gap-6 mt-4 md:mt-0 shrink-0">
                            <Link to="/projects" className="text-[#A3785B] hover:text-[#16161D] flex items-center gap-2 font-mono text-xs group transition-colors border-b border-[#A3785B]/30 hover:border-[#16161D] pb-0.5 uppercase tracking-wider">
                                View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="text-[#16161D]/50 hover:text-[#A3785B] flex items-center gap-2 font-mono text-xs group transition-colors border-b border-transparent hover:border-[#A3785B] pb-0.5 uppercase tracking-wider">
                                GitHub <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project, idx) => (
                    <ScrollReveal key={idx} delay={0.1 * (idx + 1)} direction="up" className="h-full">
                        <ProjectCard
                            title={project.title}
                            desc={project.overview}
                            tags={project.tags || []}
                            link={project.link}
                        />
                    </ScrollReveal>
                ))}
                {/* Placeholder for symmetry or future projects */}
                <ScrollReveal delay={0.1 * (featuredProjects.length + 1)} direction="up" className="h-full">
                    <div className="hidden lg:flex items-center justify-center p-6 border border-dashed border-[#16161D]/10 rounded-xl text-[#16161D]/30 text-sm font-mono h-full min-h-[160px]">
                        More experiments coming soon...
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
);

export default ProjectsSection;
