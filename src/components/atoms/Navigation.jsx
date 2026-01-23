import React from 'react';
import { Menu } from 'lucide-react';

const Navigation = ({ activeSection }) => (
    <nav className="fixed top-0 w-full z-40 backdrop-blur-sm bg-white/70 border-b border-[#1B2A41]/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="font-serif text-xl md:text-2xl font-bold tracking-tighter hover:text-[#E29578] transition-colors cursor-pointer text-[#1B2A41]">
                Syauqi-dotcom
            </div>
            <div className="hidden md:flex space-x-8 font-mono text-sm">
                {['hero', 'about', 'academic', 'projects', 'notebook'].map((item) => (
                    <a
                        key={item}
                        href={`#${item}`}
                        className={`uppercase tracking-wider hover:text-[#E29578] transition-colors text-[10px] font-bold ${activeSection === item ? 'text-[#E29578] border-b-2 border-[#E29578]' : 'text-[#1B2A41]/60'}`}
                    >
                        {item === 'hero' ? 'Home' : item}
                    </a>
                ))}
            </div>
            <Menu className="md:hidden text-[#1B2A41]" />
        </div>
    </nav>
);

export default Navigation;
