import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const projects = [
    {
        title: 'Variational Quantum Eigensolver',
        date: '2026',
        credit: 'Research & Dev',
        link: 'https://github.com/Syauqi-dotcom/BRIN-Internship-2026',
        preview: '/scientific/projects/vqe.png',
    },
    {
        title: 'Bio-Battery Project',
        date: '2024',
        credit: 'Research & Experiment',
        link: 'https://youtu.be/0rkcWSHBx_w?si=edwhKDT1nifmXj-f',
        preview: '/scientific/projects/biobattery.png',
    },
    {
        title: 'Scientific Portfolio',
        date: '2025',
        credit: 'Design & Dev',
        link: 'https://github.com/Syauqi-dotcom/scientific',
        preview: '/scientific/projects/portfolio.png',
    },
];

const GridBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let mouseX = null;
        let mouseY = null;

        const CELL_SIZE = 40;
        const PRIMARY = '#1B2A41';
        const ACCENT = '#E29578';

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const handleMouseLeave = () => { mouseX = null; mouseY = null; };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.015;

            const cols = Math.ceil(canvas.width / CELL_SIZE) + 1;
            const rows = Math.ceil(canvas.height / CELL_SIZE) + 1;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * CELL_SIZE;
                    const y = row * CELL_SIZE;

                    const wave = Math.sin(col * 0.3 + time) * Math.cos(row * 0.2 + time * 0.7);
                    let alpha = 0.02 + wave * 0.01;

                    if (mouseX !== null && mouseY !== null) {
                        const dx = x + CELL_SIZE / 2 - mouseX;
                        const dy = y + CELL_SIZE / 2 - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 200) {
                            const intensity = 1 - dist / 200;
                            ctx.strokeStyle = ACCENT;
                            ctx.globalAlpha = intensity * 0.25;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
                        }
                    }

                    ctx.strokeStyle = PRIMARY;
                    ctx.globalAlpha = Math.max(0.025, alpha);
                    ctx.lineWidth = 0.5;
                    ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
                }
            }

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{ background: '#F9FAFB' }}
        />
    );
};


// ========== Page Component ==========
const ProjectsPage = () => {
    const [hoveredProject, setHoveredProject] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="h-screen w-screen overflow-hidden relative text-[#1B2A41] font-sans selection:bg-[#E29578] selection:text-[#1B2A41]">
            <GridBackground />

            {/* Main bordered frame */}
            <div className="relative z-10 h-full w-full p-4 md:p-6">
                <div className="h-full w-full border-2 border-[#1B2A41]/15 rounded-lg flex overflow-hidden">

                    {/* === LEFT SIDEBAR === */}
                    <div className="w-[280px] md:w-[320px] flex-shrink-0 flex flex-col justify-between p-8 md:p-10">
                        <div>
                            <Link to="/" className="block group">
                                <h1 className="font-serif text-2xl md:text-3xl text-[#1B2A41] font-light leading-tight group-hover:text-[#E29578] transition-colors">
                                    Muhammad<br />Syauqi
                                </h1>
                                <p className="font-mono text-[10px] text-[#1B2A41]/40 mt-1 uppercase tracking-widest">
                                    Student & Developer
                                </p>
                            </Link>

                            <nav className="mt-8 space-y-1.5">
                                <Link to="/" className="block font-mono text-xs text-[#1B2A41]/40 hover:text-[#E29578] transition-colors tracking-wide">
                                    Home
                                </Link>
                                <span className="block font-mono text-xs text-[#E29578] tracking-wide flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-[#E29578] inline-block" />
                                    Projects
                                </span>
                                <Link to="/publications" className="block font-mono text-xs text-[#1B2A41]/40 hover:text-[#E29578] transition-colors tracking-wide">
                                    Publications
                                </Link>
                            </nav>
                        </div>

                        {/* Preview image — appears in sidebar center when hovering a project */}
                        <div className="flex-1 flex items-center justify-center px-3 py-6">
                            <div
                                className="w-full max-w-[280px] aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-[#1B2A41]/8
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
                        </div>

                        <p className="font-mono text-[9px] text-[#1B2A41]/20 uppercase tracking-widest">
                            © {new Date().getFullYear()} Muhammad Syauqi Fittuqo
                        </p>
                    </div>

                    {/* === RIGHT: PROJECT LIST === */}
                    <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col justify-center py-8 md:py-12 pr-8 md:pr-12">
                        <div className="space-y-0">
                            {projects.map((project, index) => (
                                <a
                                    key={project.title}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block text-right py-3 md:py-4 border-b border-[#1B2A41]/5 last:border-b-0 cursor-pointer"
                                    onMouseEnter={() => setHoveredProject(project)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <h2 className="font-serif text-xl md:text-2xl lg:text-3xl xl:text-4xl font-thin text-[#1B2A41]/70
                                                  group-hover:text-[#E29578] transition-all duration-400 leading-none">
                                        {project.title}
                                    </h2>
                                    <p className="font-mono text-[9px] text-[#1B2A41]/30 mt-1.5 uppercase tracking-wider font-light
                                                 group-hover:text-[#1B2A41]/50 transition-colors">
                                        {project.date} / {project.credit}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
