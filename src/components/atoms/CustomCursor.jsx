import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="fixed pointer-events-none z-50 mix-blend-difference hidden md:block"
            style={{ left: cursorPos.x, top: cursorPos.y, transform: 'translate(-50%, -50%)' }}
        >
            <div className="relative">
                <div className="w-3 h-3 bg-[#16161D] rounded-full opacity-80" />
                <div className="absolute w-8 h-8 border border-[#16161D] rounded-full opacity-20 animate-ping" style={{ animationDuration: '2s' }} />
            </div>
        </div>
    );
};

export default CustomCursor;
