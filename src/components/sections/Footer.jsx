import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Instagram, ChevronRight, Send, MapPin } from 'lucide-react';
import profileData from '../../content/profile.json';

const COMMANDS = {
    help: () => [
        { type: 'system', text: 'Available commands:' },
        { type: 'system', text: '  contact   — Open contact form' },
        { type: 'system', text: '  socials   — Connect with me!!' },
        { type: 'system', text: '  about     — Just my Value Proposition' },
        { type: 'system', text: '  clear     — Clear terminal' },
    ],
    about: () => [
        { type: 'system', text: `>  ${profileData.authorName}` },
        { type: 'system', text: `  ${profileData.authorRole}` },
        { type: 'system', text: `  ${profileData.tagline}` },
    ],
    socials: () => [
        { type: 'link', text: '  GitHub', href: profileData.socials.github },
        { type: 'link', text: '  LinkedIn', href: profileData.socials.linkedin },
        { type: 'link', text: '  Instagram', href: profileData.socials.instagram },
        { type: 'link', text: '  Email', href: `mailto:${profileData.socials.email}` },
    ],
    paper: () => [
        { type: 'system', text: '> Academic / Paper Collaboration' },
        { type: 'link', text: `  📧 ${profileData.socials.email}`, href: `mailto:${profileData.socials.email}` },
    ],
    business: () => [
        { type: 'system', text: '> Business Inquiry' },
        { type: 'link', text: '  💬 Chat on WhatsApp', href: profileData.socials.whatsapp },
    ],
};

const TerminalLine = ({ line }) => {
    if (line.type === 'input') {
        return (
            <div className="flex items-center gap-2 text-[#A3785B]">
                <ChevronRight size={12} className="flex-shrink-0" />
                <span className="text-[#EFF1F3]/80">{line.text}</span>
            </div>
        );
    }
    if (line.type === 'link') {
        return (
            <a href={line.href} target="_blank" rel="noopener noreferrer"
                className="block text-[#A3785B] hover:text-[#EFF1F3] transition-colors pl-4 underline underline-offset-2 decoration-[#A3785B]/30 hover:decoration-[#A3785B]/50">
                {line.text}
            </a>
        );
    }
    if (line.type === 'success') {
        return <div className="text-emerald-400 pl-4">{line.text}</div>;
    }
    if (line.type === 'error') {
        return <div className="text-red-400/80 pl-4">{line.text}</div>;
    }
    return <div className="text-[#EFF1F3]/50 pl-4">{line.text}</div>;
};

// ===== EMAIL FORM (Paper/Academic) =====
const PaperForm = ({ onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', institution: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`[Paper Collab] ${form.name} — ${form.institution}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nInstitution: ${form.institution}\n\n${form.message}`);
        window.open(`mailto:${profileData.socials.email}?subject=${subject}&body=${body}`, '_blank');
        setSent(true);
        setTimeout(() => { setSent(false); onClose(); }, 2000);
    };

    if (sent) return (
        <div className="py-3 text-emerald-400 font-mono text-sm animate-in fade-in duration-300">
            ✓ Email client opened. Lets connect on LinkedIn
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-3 pt-3 animate-in fade-in slide-in-from-top-2 duration-400">
            <div className="text-[9px] uppercase tracking-widest text-[#A3785B] font-mono font-bold">📄 Academic / Paper Collaboration</div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-[#A3785B]/50 transition-colors"
                        placeholder="your_name" />
                </div>
                <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Your Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-[#A3785B]/50 transition-colors"
                        placeholder="you@example.com" />
                </div>
            </div>
            <div>
                <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Institution / Affiliation</label>
                <input type="text" value={form.institution} onChange={e => setForm(p => ({ ...p, institution: e.target.value }))}
                    className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-[#A3785B]/50 transition-colors"
                    placeholder="Universitas / Lab name" />
            </div>
            <div>
                <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Research Topic / Message</label>
                <textarea required rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-[#A3785B]/50 transition-colors resize-none"
                    placeholder="Describe your idea or suggestion" />
            </div>
            <div className="flex justify-between items-center pt-1">
                <button type="button" onClick={onClose} className="text-[#EFF1F3]/30 hover:text-[#EFF1F3]/60 text-xs font-mono transition-colors">ESC to close</button>
                <button type="submit" className="flex items-center gap-2 bg-[#A3785B] hover:bg-[#A3785B]/80 text-[#16161D] font-mono text-xs font-bold px-4 py-2 rounded transition-all hover:-translate-y-0.5">
                    <Send size={12} /> SEND EMAIL
                </button>
            </div>
        </form>
    );
};

// ===== WHATSAPP TEMPLATE FORM (Business) =====
const BusinessForm = ({ onClose }) => {
    const [form, setForm] = useState({ name: '', company: '', topic: '', detail: '' });
    const [sent, setSent] = useState(false);

    const buildWAMessage = () =>
        `Halo Syauqi! \n\nSaya *${form.name || '[Nama]'}* dari *${form.company || '[Perusahaan/Institusi]'}*.\n\n *Keperluan:* ${form.topic || '[Topik]'}\n\n${form.detail || '[Detail singkat kebutuhan]'}\n\nMohon untuk dihubungi kembali, terima kasih! `;

    const handleSend = () => {
        const msg = encodeURIComponent(buildWAMessage());
        window.open(`${profileData.socials.whatsapp}?text=${msg}`, '_blank');
        setSent(true);
        setTimeout(() => { setSent(false); onClose(); }, 2000);
    };

    if (sent) return (
        <div className="py-3 text-emerald-400 font-mono text-sm animate-in fade-in duration-300">
            ✓ Opening WhatsApp...
        </div>
    );

    return (
        <div className="space-y-3 pt-3 animate-in fade-in slide-in-from-top-2 duration-400">
            <div className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono font-bold">💼 Business Inquiry</div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Your Name</label>
                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-emerald-400/40 transition-colors"
                        placeholder="Nuh Fikri" />
                </div>
                <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Company / Institution</label>
                    <input type="text" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                        className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-emerald-400/40 transition-colors"
                        placeholder="Company / Institution (PT. Sehat Kata Fikri)" />
                </div>
            </div>
            <div>
                <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Topic / Keperluan</label>
                <input type="text" value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
                    className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-emerald-400/40 transition-colors"
                    placeholder="Freelance project / collaboration " />
            </div>
            <div>
                <label className="text-[9px] uppercase tracking-widest text-[#EFF1F3]/30 font-mono mb-1 block">Detail singkat</label>
                <textarea rows={2} value={form.detail} onChange={e => setForm(p => ({ ...p, detail: e.target.value }))}
                    className="w-full bg-[#EFF1F3]/5 border border-[#EFF1F3]/10 rounded px-3 py-2 text-sm font-mono text-[#EFF1F3]/90 placeholder:text-[#EFF1F3]/20 focus:outline-none focus:border-emerald-400/40 transition-colors resize-none"
                    placeholder="Explain briefly..." />
            </div>

            <div className="flex justify-between items-center pt-1">
                <button type="button" onClick={onClose} className="text-[#EFF1F3]/30 hover:text-[#EFF1F3]/60 text-xs font-mono transition-colors">ESC to close</button>
                <button onClick={handleSend} className="flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/80 text-white font-mono text-xs font-bold px-4 py-2 rounded transition-all hover:-translate-y-0.5">
                    <Send size={12} /> SEND WA
                </button>
            </div>
        </div>
    );
};

const Footer = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: `Welcome to syauqi-cli v1.0.0` },
        { type: 'system', text: `Type "help" for available commands.` },
    ]);
    const [activeForm, setActiveForm] = useState(null); // null | 'paper' | 'business'
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    const socialLinks = [
        { Icon: Github, href: profileData.socials.github, label: 'GitHub' },
        { Icon: Linkedin, href: profileData.socials.linkedin, label: 'LinkedIn' },
        { Icon: Instagram, href: profileData.socials.instagram, label: 'Instagram' },
    ];

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        if (!activeForm) return;
        const onEsc = (e) => { if (e.key === 'Escape') setActiveForm(null); };
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, [activeForm]);
    const handleCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const newHistory = [...history, { type: 'input', text: cmd }];

        if (trimmed === 'clear') {
            setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
            setInputValue('');
            setActiveForm(null);
            return;
        }

        if (trimmed === 'contact') {
            setHistory([...newHistory,
            { type: 'system', text: 'Choose your contact type:' },
            { type: 'system', text: '  paper   — Academic / Paper collaboration' },
            { type: 'system', text: '  business  — Business inquiry' },
            ]);
            setInputValue('');
            return;
        }

        if (trimmed === 'paper') {
            setHistory([...newHistory, { type: 'system', text: 'Opening paper collaboration form...' }]);
            setActiveForm('paper');
            setInputValue('');
            return;
        }

        if (trimmed === 'business') {
            setHistory([...newHistory, { type: 'system', text: 'Opening business inquiry form...' }]);
            setActiveForm('business');
            setInputValue('');
            return;
        }

        if (COMMANDS[trimmed]) {
            setHistory([...newHistory, ...COMMANDS[trimmed]()]);
        } else if (trimmed) {
            setHistory([...newHistory, { type: 'error', text: `Command not found: "${trimmed}". Try "help".` }]);
        }
        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(inputValue);
        }
        if (e.key === 'Escape') {
            setActiveForm(null);
        }
    };

    return (
        <section id="contact" className="py-24 px-6 border-t border-[#16161D]/10">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-3 text-[#16161D]">Let's Connect.</h2>
                    <p className="text-[#16161D]/40 font-light text-sm flex items-center justify-center gap-2">
                        <MapPin size={14} className="text-[#A3785B]" />
                        Based in Yogyakarta 
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[#16161D]/60 font-mono text-xs">Available for collaboration</span>
                        </span>
                    </p>
                </div>

                {/* Terminal Window */}
                <div className="rounded-xl overflow-hidden border border-[#16161D]/10 shadow-xl bg-[#16161D] transition-all duration-500">

                    {/* Terminal Title Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#16161D] border-b border-[#EFF1F3]/5">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="font-mono text-[10px] text-[#EFF1F3]/30 uppercase tracking-widest">
                            syauqi-bash
                        </span>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="font-mono text-[10px] text-[#EFF1F3]/30 hover:text-[#A3785B] transition-colors uppercase tracking-widest"
                        >
                            {isExpanded ? '[ COLLAPSE ]' : '[ EXPAND ]'}
                        </button>
                    </div>

                    {/* Terminal Collapsed Preview */}
                    {!isExpanded && (
                        <div
                            className="px-5 py-4 cursor-pointer group"
                            onClick={() => setIsExpanded(true)}
                        >
                            <div className="flex items-center gap-2 font-mono text-sm">
                                <ChevronRight size={14} className="text-[#A3785B]" />
                                <span className="text-[#EFF1F3]/60 group-hover:text-[#EFF1F3]/90 transition-colors">
                                    syauqi-cli connect --help
                                </span>
                                <span className="w-2 h-4 bg-[#A3785B]/70 animate-pulse ml-0.5" />
                            </div>
                            <p className="text-[#EFF1F3]/40 font-mono text-sm mt-2 pl-5 italic">
                                I guess you are have an interest with me
                            </p>
                            <p className="text-[10px] font-mono text-[#EFF1F3]/20 mt-2 pl-5">
                                Click to open terminal and interact...
                            </p>
                        </div>
                    )}

                    {/* Terminal Expanded Body */}
                    {isExpanded && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <div ref={scrollRef} className="px-5 py-4 max-h-[280px] overflow-y-auto font-mono text-sm space-y-1.5 hide-scrollbar">
                                {history.map((line, i) => (
                                    <TerminalLine key={i} line={line} />
                                ))}

                                {/* Inline Forms */}
                                {activeForm === 'paper' && (
                                    <PaperForm onClose={() => setActiveForm(null)} />
                                )}
                                {activeForm === 'business' && (
                                    <BusinessForm onClose={() => setActiveForm(null)} />
                                )}
                            </div>

                            {/* Input Line — hidden when a form is open */}
                            {!activeForm && (
                                <div className="px-5 py-3 border-t border-[#EFF1F3]/5 flex items-center gap-2">
                                    <ChevronRight size={14} className="text-[#A3785B] flex-shrink-0" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent text-[#EFF1F3]/90 font-mono text-sm focus:outline-none placeholder:text-[#EFF1F3]/20 caret-[#A3785B]"
                                        placeholder='Type "help" or "contact"...'
                                        spellCheck={false}
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Social Links + Copyright */}
                <div className="flex flex-col items-center mt-12 gap-6">
                    <div className="flex justify-center gap-4">
                        {socialLinks.map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-full bg-[#16161D] text-white hover:bg-[#A3785B] transition-all duration-300 hover:-translate-y-1 shadow-md"
                            >
                                <Icon size={18} />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#16161D]/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
