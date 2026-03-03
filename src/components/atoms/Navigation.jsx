import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navigation = ({ activeSection }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const navLinks = [
        { to: '/', label: 'Home', isAnchor: true, section: 'hero' },
        { to: '/projects', label: 'Projects' },
        { to: '/publications', label: 'Publications' },
    ];

    return (
        <nav className="fixed top-0 w-full z-40 backdrop-blur-sm bg-white/70 border-b border-[#1B2A41]/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="font-serif text-xl md:text-2xl font-bold tracking-tighter hover:text-[#E29578] transition-colors cursor-pointer text-[#1B2A41]">
                    Syauqi-dotcom
                </Link>
                <div className="hidden md:flex space-x-8 font-mono text-sm">
                    {navLinks.map(({ to, label, isAnchor, section }) => {
                        const isActive = isAnchor
                            ? isHome && activeSection === (section || '')
                            : location.pathname === to;

                        if (isAnchor && isHome) {
                            return (
                                <a
                                    key={label}
                                    href="#"
                                    className={`uppercase tracking-wider hover:text-[#E29578] transition-colors text-[10px] font-bold ${isActive ? 'text-[#E29578] border-b-2 border-[#E29578]' : 'text-[#1B2A41]/60'}`}
                                >
                                    {label}
                                </a>
                            );
                        }

                        return (
                            <Link
                                key={label}
                                to={to}
                                className={`uppercase tracking-wider hover:text-[#E29578] transition-colors text-[10px] font-bold ${isActive ? 'text-[#E29578] border-b-2 border-[#E29578]' : 'text-[#1B2A41]/60'}`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
                <Menu className="md:hidden text-[#1B2A41]" />
            </div>
        </nav>
    );
};

export default Navigation;
