import React from 'react';
import SectionLabel from '../atoms/SectionLabel';
import { ScrollReveal } from '../../utils/useScrollReveal';

const stackCategories = [
    {
        label: 'QUANTUM & SCIENTIFIC',
        accent: true,
        items: [
            'Qiskit / Qulacs',
            'VQE · QAOA algorithms',
            'NumPy · SciPy',
            'PyTorch · TensorFlow',
            'Pandas · Matplotlib',
            'Jupyter Notebooks',
        ],
    },
    {
        label: 'LANGUAGES & TOOLS',
        items: [
            'Python (primary)',
            'TypeScript · JavaScript',
            'C / C++',
            'Solidity',
            'Power BI',
            'Git · Docker',
        ],
    },
    {
        label: 'WEB & SYSTEMS',
        items: [
            'React · Next.js',
            'Vite · TailwindCSS',
            'Node.js',
            'PostgreSQL',
            'REST APIs',
            'Linux / Bash',
        ],
    },
    {
        label: 'AREAS OF FOCUS',
        items: [
            'Quantum Computing',
            'Generative AI',
            'Data Science',
            'Scientific Computing',
            'Full-Stack Development',
            'Open Source Research',
        ],
    },
];

const StackSection = () => (
    <section id="stack" className="bg-[#0c0c0e] py-32 border-t border-[#f0f0f0]/5">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
            <div className="grid md:grid-cols-[200px_1fr] gap-12 mb-16">
                <div className="pt-2">
                    <ScrollReveal delay={0}>
                        <SectionLabel index={3} label="Stack" dark />
                    </ScrollReveal>
                </div>
                <div>
                    <ScrollReveal delay={0.15} direction="up">
                        <h2 className="font-serif text-4xl md:text-5xl text-[#f0f0f0] leading-tight">
                            The tools I reach for, from{' '}
                            <span className="italic" style={{ color: '#A3785B' }}>tensors</span>{' '}
                            to production.
                        </h2>
                    </ScrollReveal>
                </div>
            </div>

            {/* 4-column grid */}
            <ScrollReveal delay={0.2} direction="up">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f0f0f0]/8 border border-[#f0f0f0]/8 rounded-lg overflow-hidden">
                    {stackCategories.map(({ label, items, accent }) => (
                        <div key={label} className="bg-[#0c0c0e] p-8">
                            <h4 className={`font-mono text-[10px] font-bold tracking-[0.2em] mb-6 ${accent ? 'text-[#A3785B]' : 'text-[#f0f0f0]/30'}`}>
                                {label}
                            </h4>
                            <ul className="space-y-3">
                                {items.map(item => (
                                    <li key={item} className="text-[#f0f0f0]/60 text-sm font-light leading-snug">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

export default StackSection;
