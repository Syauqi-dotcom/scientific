import React from 'react';
import { Terminal } from 'lucide-react';

const AboutSection = () => (
    <section id="about" className="py-24 px-6 relative bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 items-start">
                {/* Left Column: Narrative */}
                <div className="md:col-span-5 md:sticky md:top-32">
                    <h2 className="font-serif text-4xl mb-6 text-[#1B2A41]">Hai, Nice to meet you</h2>
                    <p className="text-[#1B2A41]/70 leading-relaxed font-light text-lg mb-8">
                        Welcome to my desk. I see equations as narratives. I spend my days bridging the gap between abstract quantum theory and practical AI implementation.
                        <br /><br />
                        My approach is minimalist yet dense with information, much like the entropy I study.
                    </p>

                    <div className="space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-[#E29578] mb-2 font-bold">Interest Areas</h3>
                        <ul className="space-y-3">
                            {[
                                'Quantum Information',
                                'Generative AI',
                                'Mathematical Modelling',
                                'Blockchain Development'
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-sm text-[#1B2A41]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#F4D35E]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Technical Toolkit (Card Style) */}
                <div className="md:col-span-7">
                    <div className="bg-white rounded-xl p-8 border border-[#1B2A41]/10 shadow-[8px_8px_0_#1B2A41] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#1B2A41] transition-all">
                        <div className="flex items-center gap-4 mb-8">
                            <Terminal className="text-[#E29578]" />
                            <h3 className="font-serif text-2xl text-[#1B2A41]">Technical Toolkit</h3>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="font-mono text-xs text-[#1B2A41]/50 mb-3 uppercase tracking-wider font-bold">Languages & Core</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Python',
                                        'C++',
                                        'Solidity',
                                        'TypeScript',
                                        'Node.JS'
                                    ].map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-[#F9FAFB] rounded border border-[#1B2A41]/10 text-xs font-mono text-[#1B2A41] hover:bg-[#1B2A41] hover:text-white transition-colors cursor-default">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-mono text-xs text-[#1B2A41]/50 mb-3 uppercase tracking-wider font-bold">Scientific Libraries</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Qiskit',
                                        'PyTorch',
                                        'Scipy',
                                        'TensorFlow'
                                    ].map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-[#F9FAFB] rounded border border-[#1B2A41]/10 text-xs font-mono text-[#E29578] hover:bg-[#E29578] hover:text-white transition-colors cursor-default">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AboutSection;
