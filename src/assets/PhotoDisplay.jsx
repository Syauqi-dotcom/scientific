import React, { useState } from 'react';

const PhotoDisplay = ({ src, backSrc, alt = "Profile" }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-60 h-72 md:w-[280px] md:h-[350px] cursor-pointer group"
            style={{ perspective: '1200px' }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            {/* Floating shadow */}
            <div className="absolute inset-4 rounded-2xl bg-[#1B2A41]/8 blur-xl translate-y-4 transition-all duration-500 group-hover:translate-y-6 group-hover:blur-2xl" />

            {/* Card container */}
            <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden border border-white/60 shadow-2xl"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {src ? (
                        <img src={src} alt={alt} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-[#1B2A41]/5 flex items-center justify-center text-[#1B2A41]/20 font-mono text-xs">
                            NO IMAGE
                        </div>
                    )}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden border border-white/60 shadow-2xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {backSrc ? (
                        <img src={backSrc} alt={`${alt} - back`} className="w-full h-full object-cover" />
                    ) : (
                        <img src={src} alt={alt} className="w-full h-full object-cover scale-x-[-1]" />
                    )}
                    {/* Overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A41]/80 via-[#1B2A41]/20 to-transparent flex flex-col justify-end p-6">
                        <div className="space-y-2">
                            {/* <h3 className="font-serif text-xl text-white font-bold">Muhammad Syauqi</h3> */}
                            <p className="text-white/70 text-xs font-mono uppercase tracking-widest">
                                AI • Data Scientist • Software
                            </p>
                            <div className="h-px bg-white/20 w-16 mt-2" />
                            <p className="text-white/50 text-xs font-light italic">
                                "Just Need to Sleep btw"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#E29578]/20 group-hover:bg-[#E29578]/40 transition-colors duration-300" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#1B2A41]/10 group-hover:bg-[#1B2A41]/20 transition-colors duration-300" />
        </div>
    );
};

export default PhotoDisplay;
