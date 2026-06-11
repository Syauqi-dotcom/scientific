import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import TypeWriter from '../components/atoms/TypeWriter';
import Navigation from '../components/atoms/Navigation';
import profileData from '../content/profile.json';

// Load all projects dynamically from CMS JSON files
const projectModules = import.meta.glob('../content/projects/*.json', { eager: true });
const projects = Object.values(projectModules).map(mod => mod.default || mod).sort((a, b) => b.date - a.date);

// ========== Page Component ==========
const ProjectsPage = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isNavHovered, setIsNavHovered] = useState(false);

    const categories = ['All', 'Quantum', 'AI', 'Website', 'Other'];

    const filteredProjects = projects.filter(project => {
        const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery ||
            (project.title && project.title.toLowerCase().includes(searchLower)) ||
            (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchLower)));
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="h-screen w-screen overflow-hidden relative bg-[#EFF1F3] text-[#16161D] font-sans selection:bg-[#A3785B] selection:text-[#16161D]">
            
            <Navigation activeSection="projects" hoverMode={true} onHoverChange={setIsNavHovered} />

            {/* Main bordered frame */}
            <div className={`relative z-10 h-full w-full p-4 md:p-6 transition-all duration-500 ease-in-out ${isNavHovered ? 'pt-[80px] md:pt-[80px]' : 'pt-6'}`}>
                <div className="h-full w-full border-2 border-[#16161D]/15 rounded-lg flex flex-col md:flex-row overflow-hidden relative">

                    {/* === LEFT SIDEBAR === */}
                    <div className="w-full md:w-[320px] flex-shrink-0 flex flex-col justify-start md:justify-between p-6 md:p-10 relative z-20 border-b md:border-b-0 border-[#16161D]/10 md:border-r">
                        <div>
                            <Link to="/" className="block group">
                                <h1 className="font-serif text-2xl md:text-3xl text-[#16161D] font-light leading-tight group-hover:text-[#A3785B] transition-colors">
                                    {profileData.authorName.split(' ').map((part, i, a) => (
                                        <React.Fragment key={i}>
                                            {part}{i !== a.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </h1>
                                <p className="font-mono text-[10px] text-[#16161D]/40 mt-1 uppercase tracking-widest">
                                    {profileData.authorRole}
                                </p>
                            </Link>
                        </div>

                        {/* Preview image — appears in sidebar center when hovering a project */}
                        <div className="flex-1 flex-col items-center justify-center px-3 py-6 hidden md:flex">
                            <div
                                className="w-full max-w-[280px] aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-[#16161D]/8
                                           bg-white/60 backdrop-blur-sm transition-all duration-500"
                                style={{
                                    opacity: hoveredProject ? 1 : 0,
                                    transform: hoveredProject ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(10px)',
                                }}
                            >
                                {hoveredProject?.preview && (
                                    <img
                                        src={hoveredProject.preview}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Watermark Collaborate With */}
                            <div
                                className="mt-6 flex flex-col items-center transition-all duration-500 w-full max-w-[280px]"
                                style={{
                                    opacity: (hoveredProject && hoveredProject.collaborators) ? 1 : 0,
                                    transform: (hoveredProject && hoveredProject.collaborators) ? 'translateY(0)' : 'translateY(10px)',
                                    pointerEvents: (hoveredProject && hoveredProject.collaborators) ? 'auto' : 'none'
                                }}
                            >
                                <p className="font-mono text-[9px] text-[#16161D]/40 uppercase tracking-widest mb-4">
                                    Collaborate With :
                                </p>
                                <div className="flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    {hoveredProject?.collaborators?.map((logo, i) => (
                                        <img key={i} src={logo} alt="Collaborator" className="h-8 object-contain" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="hidden md:block font-mono text-[9px] text-[#16161D]/20 uppercase tracking-widest">
                            © {new Date().getFullYear()} {profileData.authorName}
                        </p>
                    </div>

                    {/* === MIDDLE ALIGNED PROJECT DESCRIPTION (Absolute) === */}
                    <div
                        className="absolute left-[280px] md:left-[320px] right-[40%] top-0 bottom-0 pointer-events-none hidden md:flex flex-col justify-center px-12 transition-all duration-500 z-10"
                        style={{
                            opacity: hoveredProject ? 1 : 0,
                            transform: hoveredProject ? 'translateY(0)' : 'translateY(15px)',
                        }}
                    >
                        {hoveredProject && (
                            <div className="max-w-md">
                                {/* <h3 className="font-serif text-[#16161D] text-2xl xl:text-3xl mb-4 leading-tight">
                                    {hoveredProject.title}
                                </h3> */}
                                <div className="flex flex-col gap-5 w-full">
                                    {hoveredProject.overview && (
                                        <div
                                            key={`overview-${hoveredProject.title}`}
                                            className="font-light text-[#16161D]/80 leading-relaxed border-l-[3px] border-[#16161D]/10 pl-5 text-sm xl:text-base whitespace-pre-wrap animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-both"
                                            style={{ animationDelay: '100ms' }}
                                        >
                                            {hoveredProject.overview}
                                        </div>
                                    )}
                                    {hoveredProject.development && (
                                        <div
                                            key={`dev-${hoveredProject.title}`}
                                            className="font-light text-[#16161D]/70 leading-relaxed border-l-[3px] border-[#A3785B]/50 pl-5 text-sm xl:text-base whitespace-pre-wrap animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-both"
                                            style={{ animationDelay: '250ms' }}
                                        >
                                            <div className="font-mono text-[10px] uppercase tracking-widest text-[#A3785B] mb-1.5 font-bold">Technology Development</div>
                                            {hoveredProject.development}
                                        </div>
                                    )}
                                    {hoveredProject.result && (
                                        <div
                                            key={`res-${hoveredProject.title}`}
                                            className="font-light text-[#16161D]/70 leading-relaxed border-l-[3px] border-[#16161D]/30 pl-5 text-sm xl:text-base whitespace-pre-wrap animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-both"
                                            style={{ animationDelay: '400ms' }}
                                        >
                                            <div className="font-mono text-[10px] uppercase tracking-widest text-[#16161D]/40 mb-1.5 font-bold">Result</div>
                                            {hoveredProject.result}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* === RIGHT: PROJECT LIST & FILTER BAR === */}
                    <div className="flex-1 flex overflow-hidden relative z-20">
                        {/* LIST AREA */}
                        <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col justify-start md:justify-center py-6 md:py-12 px-6 md:px-12 transition-all duration-500">
                            {filteredProjects.length === 0 ? (
                                <div className="text-right text-[#16161D]/40 font-mono text-sm uppercase tracking-widest animate-in fade-in duration-500">
                                    No projects found.
                                </div>
                            ) : (
                                <div className="space-y-0">
                                    {filteredProjects.map((project, index) => (
                                        <a
                                            key={project.title}
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block text-right py-3 md:py-4 border-b border-[#16161D]/5 last:border-b-0 cursor-pointer animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                            onMouseEnter={() => setHoveredProject(project)}
                                            onMouseLeave={() => setHoveredProject(null)}
                                        >
                                            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl xl:text-4xl font-thin text-[#16161D]/70
                                                        group-hover:text-[#A3785B] transition-all duration-400 leading-none">
                                                {project.title}
                                            </h2>
                                            <p className="font-mono text-[9px] text-[#16161D]/30 mt-1.5 uppercase tracking-wider font-light
                                                        group-hover:text-[#16161D]/50 transition-colors flex justify-end items-center gap-2">
                                                {project.category && (
                                                    <span className="text-[#A3785B]/70">{project.category}</span>
                                                )}
                                                {project.category && <span>/</span>}
                                                <span>{project.date}</span>
                                                <span>/</span>
                                                <span>{project.credit}</span>
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* INNOVATIVE SIDE FILTER BAR */}
                        <div className="w-12 md:w-16 flex-shrink-0 flex flex-col items-center py-12 border-l border-[#16161D]/5 bg-white/10 backdrop-blur-[2px]">
                            {/* Search Toggle */}
                            <div className="relative mb-12 flex flex-col items-center">
                                <button
                                    onClick={() => setIsSearchActive(!isSearchActive)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#16161D]/40 hover:text-[#A3785B] hover:bg-[#A3785B]/5 transition-all"
                                >
                                    {isSearchActive ? <X size={16} /> : <Search size={16} />}
                                </button>

                                {/* Expanding Search Input (Vertical/Rotated or just positioned absolutely) */}
                                <div
                                    className={`absolute top-10 right-0 md:right-full md:mr-2 bg-white/90 backdrop-blur-md border border-[#16161D]/10 rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top-right md:origin-top-right ${isSearchActive ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-48 px-4 py-2 text-sm font-mono text-[#16161D] bg-transparent outline-none placeholder:text-[#16161D]/30"
                                        autoFocus={isSearchActive}
                                    />
                                </div>
                            </div>

                            {/* Vertical Category Pills */}
                            <div className="flex flex-col gap-8 flex-1 justify-center">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`group relative flex items-center justify-center transition-all duration-300`}
                                        style={{ height: '80px' }}
                                    >
                                        <span
                                            className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 transform -rotate-90 whitespace-nowrap
                                                ${activeCategory === cat ? 'text-[#A3785B] font-bold' : 'text-[#16161D]/30 group-hover:text-[#16161D]/60'}
                                            `}
                                        >
                                            {cat}
                                        </span>
                                        {/* Active Indicator Line */}
                                        <div
                                            className={`absolute right-[-1px] w-[2px] bg-[#A3785B] transition-all duration-300 ease-out`}
                                            style={{
                                                height: activeCategory === cat ? '40px' : '0px',
                                                opacity: activeCategory === cat ? 1 : 0
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
