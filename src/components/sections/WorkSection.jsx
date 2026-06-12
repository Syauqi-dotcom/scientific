import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../atoms/SectionLabel';
import { ScrollReveal } from '../../utils/useScrollReveal';
import { getStoredProjects } from '../../utils/projectsStore';

gsap.registerPlugin(ScrollTrigger);

const WorkCard = ({ project, index }) => (
    <div className="flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[600px] h-full border-l border-[#16161D]/10 px-8 md:px-12 py-6 flex flex-col justify-between group">
        {/* Top metadata */}
        <div className="flex justify-between items-center w-full">
            <span className="font-mono text-xs text-[#A3785B] font-bold tracking-widest">
                {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs text-[#16161D]/40 tracking-wider">
                {project.date || '2026'}
            </span>
        </div>

        {/* Center content */}
        <div className="my-auto py-6">
            <span className="font-mono text-[10px] text-[#16161D]/40 uppercase tracking-widest block mb-3">
                {project.category || project.credit || 'Project'}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#16161D] mb-5 leading-tight group-hover:text-[#A3785B] transition-colors">
                {project.title}
            </h3>
            <p className="text-[#16161D]/65 text-sm md:text-base leading-relaxed mb-6 max-w-md font-light line-clamp-4">
                {project.overview}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {(project.tags || []).map(tag => (
                    <span key={tag} className="font-mono text-[10px] px-3 py-1 border border-[#16161D]/10 rounded-full text-[#16161D]/50 group-hover:border-[#A3785B]/20 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Bottom link */}
        {project.link ? (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#16161D]/50 hover:text-[#A3785B] transition-colors border-b border-[#16161D]/10 hover:border-[#A3785B]/50 pb-0.5 w-fit"
            >
                View repository ↗
            </a>
        ) : (
            <div className="h-[20px]" />
        )}
    </div>
);

const WorkSection = () => {
    const wrapperRef = useRef(null);
    const stickyRef = useRef(null);
    const trackRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [wrapperHeight, setWrapperHeight] = useState('100vh');

    useEffect(() => {
        const load = () => {
            const all = getStoredProjects();
            setProjects(all.filter(p => p.selected));
        };
        load();
        window.addEventListener('portfolio_projects_updated', load);
        return () => window.removeEventListener('portfolio_projects_updated', load);
    }, []);

    // Calculate the wrapper height so there's enough scroll distance
    useLayoutEffect(() => {
        if (projects.length === 0) return;
        const track = trackRef.current;
        if (!track) return;

        const calcHeight = () => {
            const scrollWidth = track.scrollWidth;
            const viewWidth = window.innerWidth;
            const extraScroll = Math.max(0, scrollWidth - viewWidth);
            // wrapper height = viewport height + extra horizontal distance
            setWrapperHeight(`${window.innerHeight + extraScroll}px`);
        };

        calcHeight();
        window.addEventListener('resize', calcHeight);
        return () => window.removeEventListener('resize', calcHeight);
    }, [projects]);

    // GSAP ScrollTrigger — no pin, just scrub the x transform
    useEffect(() => {
        if (projects.length === 0) return;
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        if (!wrapper || !track) return;

        const ctx = gsap.context(() => {
            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            });
        }, wrapper);

        // Refresh after fonts/images load
        const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, [projects]);

    if (projects.length === 0) return null;

    return (
        <section ref={wrapperRef} id="work" className="relative border-t border-[#16161D]/5" style={{ height: wrapperHeight }}>
            {/* Sticky viewport — stays on screen while user scrolls through the wrapper */}
            <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16 bg-[#EFF1F3]">

                {/* Header */}
                <div className="max-w-7xl mx-auto px-6 md:px-16 w-full flex-shrink-0">
                    <div className="grid md:grid-cols-[200px_1fr] gap-8 items-end">
                        <div className="pt-2">
                            <ScrollReveal delay={0}>
                                <SectionLabel index={1} label="Selected Work" />
                            </ScrollReveal>
                        </div>
                        <div>
                            <ScrollReveal delay={0.1} direction="up">
                                <h2 className="font-serif text-4xl md:text-5xl text-[#16161D] leading-tight">
                                    Things I've{' '}
                                    <span className="italic" style={{ color: '#A3785B' }}>shipped.</span>
                                </h2>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Horizontal track */}
                <div className="w-full flex-grow flex items-center overflow-hidden my-6">
                    <div
                        ref={trackRef}
                        className="flex h-[60vh] pl-6 md:pl-16 pr-32 will-change-transform"
                    >
                        {projects.map((project, idx) => (
                            <WorkCard key={project.id || idx} project={project} index={idx} />
                        ))}
                    </div>
                </div>

                {/* Footer label */}
                <div className="max-w-7xl mx-auto px-6 md:px-16 w-full flex justify-between items-center flex-shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#16161D]/35 animate-pulse">
                        Scroll down to slide →
                    </span>
                    <Link
                        to="/projects"
                        className="font-mono text-[11px] uppercase tracking-widest text-[#16161D]/50 hover:text-[#A3785B] transition-colors border-b border-[#16161D]/10 hover:border-[#A3785B]/50 pb-0.5"
                    >
                        View all projects ↗
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default WorkSection;
