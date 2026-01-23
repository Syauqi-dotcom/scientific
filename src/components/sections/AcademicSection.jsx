import React from 'react';

const AcademicSection = () => (
    <section id="academic" className="py-24 px-6 relative border-t border-[#1B2A41]/5 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl text-[#1B2A41] mb-4">Academic Trajectory</h2>
                <p className="text-[#1B2A41]/60 font-light">The formal pursuit of knowledge.</p>
            </div>

            <div className="space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-[#1B2A41]/10 md:left-1/2 md:-translate-x-1/2" />

                {/* Item 3 */}
                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    <div className="pl-16 md:pl-12 order-2">
                        <p className="text-sm text-[#1B2A41]/70 italic">"Bridging Classical Logic with Quantum Mechanics: My First Quantum Full Adder"</p>
                        <div className="mt-2 flex gap-2 md:justify-start flex-wrap">
                            <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Quantum Circuit</span>
                            <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Variational Quantum Eigensolver</span>
                            {/* <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Blockchain</span> */}
                        </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#1B2A41] rounded-full -translate-x-2 ring-4 ring-white z-10" />
                    <div className="pl-16 md:pl-12 order-2 md:order-1 md:text-right">
                        <span className="font-mono text-xs text-[#1B2A41]/40 mb-1 block font-bold">2026</span>
                        <h3 className="text-xl font-serif text-[#1B2A41]/80 font-bold">National Research and Innovation Agency (BRIN)</h3>
                        <p className="text-sm text-[#1B2A41]/60 mt-1">Internship Pusat Riset Fisika Kuantum</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    <div className="pl-16 md:pl-0 md:pr-12 md:text-right order-1">
                        <span className="font-mono text-xs text-[#E29578] mb-1 block font-bold">2024 - Present</span>
                        <h3 className="text-xl font-serif text-[#1B2A41] font-bold">Bachelor of Information Engineering</h3>
                        <p className="text-sm text-[#1B2A41]/60 mt-1">Universitas Gadjah Mada</p>
                    </div>
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#F4D35E] rounded-full -translate-x-2 ring-4 ring-white z-10" />
                    <div className="pl-16 md:pl-12 order-2">
                        <p className="text-sm text-[#1B2A41]/70 italic">"Newbie Path Seeker in Information Engineering."</p>
                        <div className="mt-2 flex gap-2 md:justify-start flex-wrap">
                            <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Quantum Computing</span>
                            <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Image Processing</span>
                            <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Deep Learning</span>
                            <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Machine Learning</span>
                            <span className="text-[10px] bg-[#1B2A41]/5 px-2 py-0.5 rounded text-[#1B2A41]/60 border border-[#1B2A41]/10">Blockchain</span>
                        </div>
                    </div>
                </div> 

                {/* Item 1 */}
                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    <div className="pl-16 md:pl-0 md:pr-12 md:text-right order-1 md:order-2">
                        <p className="text-sm text-[#1B2A41]/70 italic">"Where the fascination with physics began."</p>
                    </div>
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#1B2A41] rounded-full -translate-x-2 ring-4 ring-white z-10" />
                    <div className="pl-16 md:pl-12 order-2 md:order-1 md:text-right">
                        <span className="font-mono text-xs text-[#1B2A41]/40 mb-1 block font-bold">2021 - 2024</span>
                        <h3 className="text-xl font-serif text-[#1B2A41]/80 font-bold">Senior High School</h3>
                        <p className="text-sm text-[#1B2A41]/60 mt-1">SMAN 3 Semarang</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AcademicSection;
