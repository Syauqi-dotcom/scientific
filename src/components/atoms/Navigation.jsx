import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import profileData from '../../content/profile.json';

const Navigation = ({ activeSection, hoverMode = false, onHoverChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Effect to notify parent when hover state changes
    React.useEffect(() => {
        if (onHoverChange) {
            onHoverChange(isHovered);
        }
    }, [isHovered, onHoverChange]);

    const navLinks = [
        { to: '/', label: 'Home', isAnchor: true, section: 'hero' },
        { to: '/projects', label: 'Projects' },
        { to: '/publications', label: 'Publications' },
    ];

    return (
        <>
            {hoverMode && (
                <div 
                    className={`fixed top-0 left-0 w-full h-8 z-[60] ${isHovered ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    onMouseEnter={() => setIsHovered(true)}
                />
            )}
            <nav 
                className={`fixed top-0 w-full z-50 backdrop-blur-sm bg-white/70 border-b border-[#16161D]/5 transition-all duration-500 ease-in-out ${hoverMode && !isHovered && !isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}
                onMouseEnter={() => hoverMode && setIsHovered(true)}
                onMouseLeave={() => hoverMode && setIsHovered(false)}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="font-serif text-xl md:text-2xl font-bold tracking-tighter hover:text-[#A3785B] transition-colors cursor-pointer text-[#16161D]">
                        {profileData.siteName}
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
                                        className={`uppercase tracking-wider hover:text-[#A3785B] transition-colors text-[10px] font-bold ${isActive ? 'text-[#A3785B] border-b-2 border-[#A3785B]' : 'text-[#16161D]/60'}`}
                                    >
                                        {label}
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={label}
                                    to={to}
                                    className={`uppercase tracking-wider hover:text-[#A3785B] transition-colors text-[10px] font-bold ${isActive ? 'text-[#A3785B] border-b-2 border-[#A3785B]' : 'text-[#16161D]/60'}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#16161D] p-2 -mr-2 z-50">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex flex-col space-y-8 font-mono text-center">
                    {navLinks.map(({ to, label, isAnchor, section }) => {
                        const isActive = isAnchor
                            ? isHome && activeSection === (section || '')
                            : location.pathname === to;

                        if (isAnchor && isHome) {
                            return (
                                <a
                                    key={label}
                                    href="#"
                                    onClick={() => setIsOpen(false)}
                                    className={`uppercase tracking-wider hover:text-[#A3785B] transition-colors text-lg font-bold ${isActive ? 'text-[#A3785B]' : 'text-[#16161D]'}`}
                                >
                                    {label}
                                </a>
                            );
                        } else if (isAnchor && !isHome) {
                            return (
                                <Link
                                    key={label}
                                    to="/"
                                    onClick={() => setIsOpen(false)}
                                    className={`uppercase tracking-wider hover:text-[#A3785B] transition-colors text-lg font-bold ${isActive ? 'text-[#A3785B]' : 'text-[#16161D]'}`}
                                >
                                    {label}
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={label}
                                to={to}
                                onClick={() => setIsOpen(false)}
                                className={`uppercase tracking-wider hover:text-[#A3785B] transition-colors text-lg font-bold ${isActive ? 'text-[#A3785B]' : 'text-[#16161D]'}`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navigation;
