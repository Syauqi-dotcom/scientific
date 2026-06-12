import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import profileData from '../../content/profile.json';

const Navigation = ({ activeSection, hoverMode = true, onHoverChange, bgAnimationDisabled, toggleBgAnimation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        if (onHoverChange) {
            onHoverChange(isHovered);
        }
    }, [isHovered, onHoverChange]);

    const navLinks = [
        { to: '/#hero', label: 'About', isAnchorId: 'hero' },
        { to: '/projects', label: 'Projects' },
        { to: '/publications', label: 'Publications' },
    ];

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    // Always light theme navigation as the page is fully light-themed
    const navBg = 'bg-[#EFF1F3]/80 border-[#16161D]/8';
    const logoColor = 'text-[#16161D]';
    const linkBase = 'text-[#16161D]/60 hover:text-[#16161D]';
    const linkActive = 'text-[#A3785B]';
    const hamburgerColor = 'text-[#16161D]';

    return (
        <>
            {hoverMode && (
                <div
                    className={`fixed top-0 left-0 w-full h-8 z-[60] ${isHovered ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    onMouseEnter={() => setIsHovered(true)}
                />
            )}
            <nav
                className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ease-in-out ${navBg} ${hoverMode && !isHovered && !isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}
                onMouseEnter={() => hoverMode && setIsHovered(true)}
                onMouseLeave={() => hoverMode && setIsHovered(false)}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className={`font-serif text-xl md:text-2xl font-bold tracking-tighter hover:text-[#A3785B] transition-colors cursor-pointer ${logoColor}`}
                    >
                        {profileData.siteName}
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-8 font-mono text-[10px]">
                            {navLinks.map(({ to, label, isAnchorId }) => {
                                const isActive = isAnchorId
                                    ? isHome && (activeSection === isAnchorId || (isAnchorId === 'hero' && activeSection === 'about'))
                                    : location.pathname === to;

                                if (isAnchorId && isHome) {
                                    return (
                                        <button
                                            key={label}
                                            onClick={() => scrollTo(isAnchorId)}
                                            className={`uppercase tracking-wider font-bold transition-colors ${isActive ? linkActive : linkBase}`}
                                        >
                                            {label}
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={label}
                                        to={to}
                                        className={`uppercase tracking-wider font-bold transition-colors ${isActive ? linkActive : linkBase}`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                        {/* Divider */}
                        {toggleBgAnimation && <div className="h-4 w-px bg-[#16161D]/10" />}
                        {/* Toggle */}
                        {toggleBgAnimation && (
                            <div className="flex items-center gap-2 font-mono text-[10px]">
                                <span className="uppercase tracking-wider text-[#16161D]/50">Click and you will know</span>
                                <button
                                    onClick={toggleBgAnimation}
                                    className={`w-9 h-5 rounded-full relative transition-colors duration-300 cursor-pointer focus:outline-none ${!bgAnimationDisabled ? 'bg-[#A3785B]' : 'bg-[#16161D]/15'}`}
                                    aria-label="Toggle background animation"
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${!bgAnimationDisabled ? 'translate-x-4' : 'translate-x-0'}`}
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 -mr-2 z-50 ${hamburgerColor}`}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#EFF1F3]/97 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex flex-col space-y-8 font-mono text-center items-center">
                    {navLinks.map(({ to, label, isAnchorId }) => {
                        if (isAnchorId && isHome) {
                            return (
                                <button
                                    key={label}
                                    onClick={() => scrollTo(isAnchorId)}
                                    className="uppercase tracking-wider hover:text-[#A3785B] transition-colors text-lg font-bold text-[#16161D]"
                                >
                                    {label}
                                </button>
                            );
                        }
                        return (
                            <Link
                                key={label}
                                to={to}
                                onClick={() => setIsOpen(false)}
                                className="uppercase tracking-wider hover:text-[#A3785B] transition-colors text-lg font-bold text-[#16161D]"
                            >
                                {label}
                            </Link>
                        );
                    })}
                    {/* Mobile Toggle */}
                    {toggleBgAnimation && (
                        <div className="flex items-center gap-3 pt-6 border-t border-[#16161D]/10 w-full justify-center">
                            <span className="uppercase tracking-wider text-sm text-[#16161D]/60 font-bold">Click and you will know</span>
                            <button
                                onClick={toggleBgAnimation}
                                className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer focus:outline-none ${!bgAnimationDisabled ? 'bg-[#A3785B]' : 'bg-[#16161D]/15'}`}
                                aria-label="Toggle background animation"
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${!bgAnimationDisabled ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navigation;
