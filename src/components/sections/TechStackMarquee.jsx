import React from 'react';

// Tech stack data with devicon CDN URLs
const row1Techs = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
    { name: 'Solidity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg' }
];

const row2Techs = [
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
    { name: 'Qiskit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/qiskit/qiskit-original.svg' },
];

const TechItem = ({ name, icon, index }) => (
    <div
        className="marquee-item group flex flex-col items-center gap-2 px-6 md:px-8 flex-shrink-0"
        style={{ animationDelay: `${index * 0.15}s` }}
    >
        <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-white/80 border border-[#16161D]/8 shadow-sm
                    group-hover:shadow-lg group-hover:shadow-[#A3785B]/20 group-hover:border-[#A3785B]/30 group-hover:scale-110
                    transition-all duration-300 ease-out md:backdrop-blur-sm marquee-float">
            <img
                src={icon}
                alt={name}
                className="w-7 h-7 md:w-8 md:h-8 object-contain grayscale opacity-60
                   group-hover:grayscale-0 group-hover:opacity-100
                   transition-all duration-300"
                loading="lazy"
            />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-[#A3785B]/0 group-hover:bg-[#A3785B]/5 transition-colors duration-300" />
        </div>
        <span className="text-[10px] md:text-xs font-mono text-[#16161D]/30 group-hover:text-[#A3785B] transition-colors duration-300 whitespace-nowrap">
            {name}
        </span>
    </div>
);

const MarqueeRow = ({ techs, direction = 'left', speed = 'normal', className = '' }) => {
    const animClass = direction === 'left' ? 'marquee-track' : 'marquee-track-reverse';
    const speedClass = speed === 'fast' ? 'marquee-fast' : speed === 'slow' ? 'marquee-slow' : '';

    return (
        <div className={`marquee-container overflow-hidden ${className}`}>
            <div className={`flex w-max ${animClass} ${speedClass}`}>
                {/* Render items twice for seamless loop */}
                {[...techs, ...techs].map((tech, i) => (
                    <TechItem key={`${tech.name}-${i}`} {...tech} index={i % techs.length} />
                ))}
            </div>
        </div>
    );
};

const TechStackMarquee = () => (
    <section className="hidden md:block py-16 md:py-24 relative overflow-hidden">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 mb-12 md:mb-16">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A3785B]/30 to-transparent" />
                <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[#16161D]/40 font-bold">
                    Languages & Tools
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A3785B]/30 to-transparent" />
            </div>
        </div>

        {/* Background gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#EFF1F3] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#EFF1F3] to-transparent z-10" />
        </div>

        {/* Marquee Rows — 2 rows, staggered speeds and directions */}
        <div className="space-y-6 md:space-y-8">
            {/* Row 1: Left scroll, medium speed — slightly tilted */}
            <div className="marquee-tilt-down">
                <MarqueeRow techs={row1Techs} direction="left" speed="normal" />
            </div>

            {/* Row 2: Right scroll, faster — center focus, bigger */}
            <div className="marquee-tilt-up">
                <MarqueeRow
                    techs={row2Techs}
                    direction="right"
                    speed="fast"
                    className="scale-105 opacity-90"
                />
            </div>
        </div>
    </section>
);

export default TechStackMarquee;
