import React, { useState, useRef, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { CalendarDays, ChevronRight, Send } from 'lucide-react';
import profileData from '../../content/profile.json';
import { ScrollReveal } from '../../utils/useScrollReveal';
import SectionLabel from '../atoms/SectionLabel';

const COMMANDS = {
    help: () => [
        { type: 'system', text: 'Available commands:' },
        { type: 'system', text: '  contact   — Open contact form' },
        { type: 'system', text: '  socials   — Connect with me!!' },
        { type: 'system', text: '  play      — Play retro Dino game! 🦖' },
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

// ===== HIGH PERFORMANCE CANVAS RETRO DINO GAME =====
const DinoGame = ({ onExit }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('dino_canvas_highscore') || '0', 10);
    });
    const [gameOver, setGameOver] = useState(false);

    const onExitRef = useRef(onExit);
    useEffect(() => {
        onExitRef.current = onExit;
    }, [onExit]);

    const highScoreRef = useRef(highScore);
    useEffect(() => {
        highScoreRef.current = highScore;
    }, [highScore]);
    
    const gameStateRef = useRef({
        dinoY: 0,
        velocityY: 0,
        isJumping: false,
        obstacleX: 1000,
        speed: 5.0,
        score: 0,
        gameOver: false,
        frameCount: 0
    });

    const handleRestartRef = useRef(null);
    const handleJumpRef = useRef(null);

    const jump = () => {
        const state = gameStateRef.current;
        if (!state.isJumping && !state.gameOver) {
            state.velocityY = -10.5;
            state.isJumping = true;
        }
    };
    handleJumpRef.current = jump;

    const restart = () => {
        const state = gameStateRef.current;
        state.dinoY = 0;
        state.velocityY = 0;
        state.isJumping = false;
        state.obstacleX = 1000;
        state.speed = 5.0;
        state.score = 0;
        state.gameOver = false;
        setGameOver(false);
        setScore(0);
    };
    handleRestartRef.current = restart;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.key === ' ' || e.key === 'ArrowUp') {
                e.preventDefault();
                handleJumpRef.current();
            } else if (e.key === 'Escape') {
                onExitRef.current();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;

        const spriteScale = 2.5;
        
        // Exact pixel art layout of Chrome offline dino
        const DINO_RUN1 = [
            "00000111111",
            "00001111111",
            "00001110111",
            "00001111111",
            "00001111000",
            "00001111110",
            "11011111000",
            "11111111110",
            "01111111110",
            "00011111100",
            "00001111000",
            "00001101000",
            "00001001000",
            "00001100000"
        ];
        
        const DINO_RUN2 = [
            "00000111111",
            "00001111111",
            "00001110111",
            "00001111111",
            "00001111000",
            "00001111110",
            "11011111000",
            "11111111110",
            "01111111110",
            "00011111100",
            "00001111000",
            "00000101100",
            "00000100100",
            "00000000110"
        ];

        const CACTUS = [
            "00011000",
            "00011000",
            "01011010",
            "11011011",
            "11111111",
            "01111110",
            "00011000",
            "00011000",
            "00011000",
            "00011000",
            "00011000",
            "00011000"
        ];

        // Create cached canvas elements once
        const cachedSprites = {};
        const cacheSprite = (name, rows, w, h, color) => {
            const cacheCanvas = document.createElement('canvas');
            cacheCanvas.width = w * spriteScale;
            cacheCanvas.height = h * spriteScale;
            const cCtx = cacheCanvas.getContext('2d');
            cCtx.fillStyle = color;
            cCtx.beginPath();
            for (let r = 0; r < rows.length; r++) {
                const row = rows[r];
                for (let c = 0; c < row.length; c++) {
                    if (row[c] === '1') {
                        cCtx.rect(c * spriteScale, r * spriteScale, spriteScale, spriteScale);
                    }
                }
            }
            cCtx.fill();
            cachedSprites[name] = cacheCanvas;
        };

        // Cache the sprites on mount
        cacheSprite('dino_run1', DINO_RUN1, 11, 14, '#22c55e');
        cacheSprite('dino_run2', DINO_RUN2, 11, 14, '#22c55e');
        cacheSprite('cactus', CACTUS, 8, 12, '#22c55e');

        const render = () => {
            const state = gameStateRef.current;

            // Clear Screen
            ctx.fillStyle = '#111113';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update positions
            if (!state.gameOver) {
                state.frameCount++;
                
                state.dinoY -= state.velocityY;
                state.velocityY += 0.55; // Gravity
                if (state.dinoY <= 0) {
                    state.dinoY = 0;
                    state.velocityY = 0;
                    state.isJumping = false;
                }

                state.obstacleX -= state.speed;
                if (state.obstacleX < -30) {
                    state.obstacleX = canvas.width + Math.random() * 150;
                    state.score += 1;
                    setScore(state.score);
                    if (state.speed < 12) {
                        state.speed += 0.25;
                    }
                }

                // Hitbox calculations
                const dinoWidth = 11 * spriteScale;
                const dinoHeight = 14 * spriteScale;
                const dinoX = 60;
                const dinoYActual = canvas.height - 30 - state.dinoY - dinoHeight;

                const cactusWidth = 8 * spriteScale;
                const cactusHeight = 12 * spriteScale;
                const cactusX = state.obstacleX;
                const cactusYActual = canvas.height - 30 - cactusHeight;

                if (
                    dinoX + dinoWidth - 3 > cactusX &&
                    dinoX + 3 < cactusX + cactusWidth &&
                    dinoYActual + dinoHeight - 3 > cactusYActual &&
                    dinoYActual + 3 < cactusYActual + cactusHeight
                ) {
                    state.gameOver = true;
                    setGameOver(true);
                    setHighScore((h) => {
                        const newH = Math.max(h, state.score);
                        localStorage.setItem('dino_canvas_highscore', newH.toString());
                        return newH;
                    });
                }
            }

            // Draw Ground line
            ctx.strokeStyle = '#EFF1F3';
            ctx.globalAlpha = 0.15;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - 30);
            ctx.lineTo(canvas.width, canvas.height - 30);
            ctx.stroke();
            
            // Draw Ground dots using a single path call
            ctx.fillStyle = '#EFF1F3';
            ctx.globalAlpha = 0.1;
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i += 30) {
                const offset = (Math.floor(state.frameCount / 2) % 30);
                const xPos = (i - offset + canvas.width) % canvas.width;
                ctx.rect(xPos, canvas.height - 28, 3, 1.5);
                ctx.rect((xPos + 15) % canvas.width, canvas.height - 24, 1.5, 1.5);
            }
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // Draw animated Dino using cached sprite canvas
            const dinoHeight = 14 * spriteScale;
            const dinoYActual = canvas.height - 30 - state.dinoY - dinoHeight;
            const isSecondFrame = Math.floor(state.frameCount / 6) % 2 === 0;
            const dinoSpriteName = state.isJumping 
                ? 'dino_run1' 
                : (isSecondFrame ? 'dino_run1' : 'dino_run2');

            const dinoImg = cachedSprites[dinoSpriteName];
            if (dinoImg) {
                ctx.drawImage(dinoImg, 60, dinoYActual);
            }

            // Draw Cactus using cached sprite canvas
            const cactusImg = cachedSprites['cactus'];
            if (cactusImg) {
                const cactusHeight = 12 * spriteScale;
                const cactusYActual = canvas.height - 30 - cactusHeight;
                ctx.drawImage(cactusImg, state.obstacleX, cactusYActual);
            }

            // Score HUD on canvas
            ctx.fillStyle = '#EFF1F3';
            ctx.globalAlpha = 0.4;
            ctx.font = '10px monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`HI ${highScoreRef.current.toString().padStart(5, '0')}   ${state.score.toString().padStart(5, '0')}`, canvas.width - 20, 25);
            ctx.globalAlpha = 1.0;

            animationId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="relative bg-[#111113] rounded-lg overflow-hidden border border-[#EFF1F3]/10 flex flex-col items-center select-none">
            <canvas 
                ref={canvasRef} 
                width={1000} 
                height={160} 
                className="w-full bg-[#111113] block cursor-pointer"
                onClick={() => handleJumpRef.current()}
            />

            {gameOver && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                    <span className="text-red-400 font-mono font-bold tracking-widest text-sm uppercase">Game Over</span>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => handleRestartRef.current()}
                            className="px-4 py-2 bg-[#A3785B] text-[#16161D] font-mono font-bold text-xs rounded hover:bg-[#A3785B]/80 transition-colors uppercase tracking-widest"
                        >
                            Retry
                        </button>
                        <button 
                            onClick={onExit}
                            className="px-4 py-2 border border-[#EFF1F3]/20 text-[#EFF1F3]/60 font-mono font-bold text-xs rounded hover:text-[#EFF1F3] hover:border-[#EFF1F3]/40 transition-colors uppercase tracking-widest"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            )}

            {!gameOver && (
                <div className="w-full px-4 py-2 bg-[#16161D] border-t border-[#EFF1F3]/5 flex justify-between items-center text-[9px] font-mono text-[#EFF1F3]/30 uppercase tracking-widest">
                    <span>[SPACE / CLICK SCREEN TO JUMP]</span>
                    <button onClick={onExit} className="hover:text-red-400 transition-colors">ESC TO EXIT</button>
                </div>
            )}
        </div>
    );
};

const GithubSection = () => {
    const githubUrl = profileData.socials.github;
    const username = githubUrl.split('/').pop();

    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: `Welcome to syauqi-cli v1.0.0` },
        { type: 'system', text: `Type "help" for available commands.` },
    ]);
    const [activeForm, setActiveForm] = useState(null); // null | 'paper' | 'business' | 'dino'
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

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

        if (trimmed === 'dino' || trimmed === 'play') {
            setHistory([...newHistory, { type: 'system', text: 'Starting Dino Game...' }]);
            setActiveForm('dino');
            setInputValue('');
            return;
        }

        if (COMMANDS[trimmed]) {
            setHistory([...newHistory, ...COMMANDS[trimmed]()]);
        } else if (trimmed) {
            setHistory([...newHistory, { type: 'error', text: `Command not found: "${trimmed}". Try "help" or "play".` }]);
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
        <section id="github" className="py-32 border-t border-[#16161D]/5">
            <div className="max-w-6xl mx-auto space-y-12 px-6 md:px-16">
                
                {/* Split header */}
                <ScrollReveal delay={0} direction="up">
                    <div className="grid md:grid-cols-[200px_1fr] gap-12">
                        <div className="pt-1">
                            <SectionLabel index={4} label="GitHub" />
                        </div>
                        <div>
                            <h2 className="font-serif text-4xl md:text-5xl text-[#16161D] leading-tight mb-2">
                                Open source{' '}
                                <span className="italic" style={{ color: '#A3785B' }}>activity.</span>
                            </h2>
                            <p className="text-[#16161D]/45 text-sm font-light">Contributions &amp; commits across public repositories</p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Calendar Container */}
                <ScrollReveal delay={0.1} direction="up">
                    <div className="bg-white/80 rounded-2xl border border-[#16161D]/8 p-6 md:p-8 flex flex-col items-center shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg border" style={{ background: 'rgba(163,120,91,0.1)', borderColor: 'rgba(163,120,91,0.2)' }}>
                                <CalendarDays size={18} strokeWidth={1.5} style={{ color: '#A3785B' }} />
                            </div>
                            <h3 className="text-lg font-medium text-[#16161D]">Activity Calendar</h3>
                        </div>

                        <div className="w-full overflow-x-auto hide-scrollbar flex justify-center mb-6">
                            <div className="min-w-max pb-2">
                                <GitHubCalendar 
                                    username={username} 
                                    blockSize={12}
                                    blockMargin={4}
                                    fontSize={12}
                                    theme={{
                                        light: ['#ebedf0', '#cbd5e1', '#86efac', '#22c55e', '#16a34a'],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15} direction="up">
                    <div className="w-full">
                        <div className="rounded-xl overflow-hidden border border-[#16161D]/15 shadow-xl bg-[#111113] transition-all duration-500">

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
                                    {activeForm === 'dino' ? (
                                        <DinoGame onExit={() => setActiveForm(null)} />
                                    ) : (
                                        <>
                                            <div ref={scrollRef} className="px-5 py-4 max-h-[280px] overflow-y-auto font-mono text-sm space-y-1.5 hide-scrollbar animate-none">
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
                                                        placeholder='Type "help", "contact" or "play"...'
                                                        spellCheck={false}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default GithubSection;
