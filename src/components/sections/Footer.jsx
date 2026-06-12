import React, { useState } from 'react';
import { Github, Linkedin, Instagram, MapPin } from 'lucide-react';
import profileData from '../../content/profile.json';
import SectionLabel from '../atoms/SectionLabel';

const Footer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.open(`mailto:${profileData.socials.email}?subject=${subject}&body=${body}`, '_blank');
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSent(false), 3000);
    };

    const socialLinks = [
        { Icon: Github, href: profileData.socials.github, label: 'GitHub' },
        { Icon: Linkedin, href: profileData.socials.linkedin, label: 'LinkedIn' },
        { Icon: Instagram, href: profileData.socials.instagram, label: 'Instagram' },
    ];

    return (
        <section id="contact" className="pt-24 pb-8 border-t border-[#16161D]/5">
            <div className="max-w-3xl mx-auto px-6 md:px-16">

                {/* Section label */}
                <div className="mb-12">
                    <SectionLabel index={5} label="Contact" />
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-3 text-[#16161D]">Let's Connect.</h2>
                    <p className="text-[#16161D]/45 font-light text-sm flex items-center justify-center gap-2">
                        <MapPin size={14} style={{ color: '#A3785B' }} />
                        Based in Yogyakarta 
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A3785B] animate-pulse" />
                            <span className="text-[#16161D]/55 font-mono text-xs">Available for collaboration</span>
                        </span>
                    </p>
                </div>

                {/* Simple Interactive Contact Form - Soft Gray Theme */}
                <div className="bg-[#EFF1F3]/50 border border-[#16161D]/10 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto w-full text-left">
                    <h3 className="text-base font-medium text-[#16161D]/75 mb-6 font-sans">Send me a message</h3>
                    
                    {sent && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-lg text-xs font-mono">
                            ✓ Message drafted! Email client opened.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full bg-white border border-[#16161D]/10 rounded-lg px-4 py-3 text-[#16161D]/80 placeholder:text-[#16161D]/30 text-sm focus:outline-none focus:border-[#A3785B] transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
                                    className="w-full bg-white border border-[#16161D]/10 rounded-lg px-4 py-3 text-[#16161D]/80 placeholder:text-[#16161D]/30 text-sm focus:outline-none focus:border-[#A3785B] transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <textarea
                                required
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your Message"
                                className="w-full bg-white border border-[#16161D]/10 rounded-lg px-4 py-3 text-[#16161D]/80 placeholder:text-[#16161D]/30 text-sm focus:outline-none focus:border-[#A3785B] transition-colors resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#A3785B] hover:bg-[#A3785B]/90 text-[#16161D] font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg active:translate-y-0"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Social Links + Copyright */}
                <div className="flex flex-col items-center mt-12 gap-4">
                    <div className="flex justify-center gap-4">
                        {socialLinks.map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-full bg-[#16161D]/5 text-[#16161D]/60 hover:bg-[#A3785B] hover:text-white transition-all duration-300 hover:-translate-y-1"
                            >
                                <Icon size={18} />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#16161D]/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {label}
                                </span>
                            </a>
                        ))}
                    </div>
                    <div className="text-[#16161D]/30 font-mono text-[10px] tracking-wider">
                        © {new Date().getFullYear()} {profileData.authorName}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
