import React from 'react';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => (
    <section id="contact" className="py-24 px-6 border-t border-[#1B2A41]/10">
        <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-4 rounded-full bg-[#1B2A41]/5 mb-8">
                <Mail size={32} className="text-[#E29578]" />
            </div>
            <h2 className="font-serif text-5xl md:text-6xl mb-6 text-[#1B2A41]">Let's Connect.</h2>
            <a href="mailto:physicsuqi@gmail.com" className="text-xl md:text-2xl font-mono text-[#E29578] hover:text-[#1B2A41] border-b-2 border-[#E29578]/20 hover:border-[#1B2A41] transition-all pb-1">physicsuqi@gmail.com</a>
            <div className="flex justify-center gap-8 mt-12">
                {[Github, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 rounded-full bg-[#1B2A41] text-white hover:bg-[#E29578] transition-all hover:-translate-y-1 shadow-md"><Icon size={20} /></a>
                ))}
            </div>
            <div className="mt-16 text-[#1B2A41]/50 font-mono text-xs">
                © {new Date().getFullYear()} Muhammad Syauqi Fittuqo
            </div>
        </div>
    </section>
);

export default Footer;
