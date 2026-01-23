import React from 'react';

const CassettePlayer = () => (
    <div className="w-full max-w-md mx-auto bg-[#222] rounded-xl p-4 shadow-2xl relative overflow-hidden border-4 border-[#333] transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
        {/* Cassette Label / Decoration */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[#333] z-20 flex justify-between px-2 items-center">
            <div className="w-2 h-2 rounded-full bg-[#111]"></div>
            <div className="w-2 h-2 rounded-full bg-[#111]"></div>
        </div>

        <div className="relative z-10 bg-[#E29578] rounded-lg overflow-hidden border-2 border-[#111] shadow-inner h-[152px]"> {/* Standard embed height */}
            <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4JyS4fb?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Quantum Focus Playlist"
            ></iframe>
        </div>

        {/* Decorative 'Buttons' below */}
        <div className="mt-4 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="font-mono text-[10px] text-[#999]">STEREO SOUND</div>
            <div className="flex space-x-2">
                <div className="w-8 h-2 bg-[#111] rounded"></div>
                <div className="w-8 h-2 bg-[#111] rounded"></div>
            </div>
        </div>
    </div>
);

export default CassettePlayer;
