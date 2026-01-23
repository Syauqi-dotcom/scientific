import React from 'react';
import { MessageCircle, Atom, X, Send } from 'lucide-react';

const ChatWidget = ({ isOpen, messages, input, isLoading, toggleOpen, onSubmit, setInput }) => (
    <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
            <button onClick={toggleOpen} className="group flex items-center justify-center w-14 h-14 rounded-full bg-[#E29578] text-[#1B2A41] shadow-xl hover:scale-110 transition-all duration-300 animate-bounce">
                <MessageCircle size={24} className="group-hover:hidden" />
                <Atom size={24} className="hidden group-hover:block animate-spin" />
            </button>
        )}

        {isOpen && (
            <div className="w-80 md:w-96 bg-[#1B2A41] border-2 border-[#F4D35E] rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 fade-in overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1B2A41]">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E29578] animate-pulse" />
                        <span className="font-serif text-[#F4D35E] font-bold">Quantum Muse</span>
                    </div>
                    <button onClick={toggleOpen}><X size={18} className="text-white/60 hover:text-white" /></button>
                </div>
                <div className="h-72 overflow-y-auto p-4 space-y-4 bg-black/20">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed font-mono ${msg.role === 'user' ? 'bg-[#E29578] text-[#1B2A41]' : 'bg-white/10 text-slate-200 border border-white/5'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && <div className="text-xs text-[#F4D35E] animate-pulse">Calculating wavefunction...</div>}
                </div>
                <form onSubmit={onSubmit} className="p-3 border-t border-white/10 bg-[#1B2A41] flex gap-2">
                    <input
                        value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask AI..."
                        className="flex-1 bg-black/30 border border-white/10 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-[#F4D35E]"
                    />
                    <button disabled={isLoading || !input.trim()} className="p-2 bg-[#F4D35E] rounded-full text-[#1B2A41] hover:bg-white transition-colors disabled:opacity-50"><Send size={14} /></button>
                </form>
            </div>
        )}
    </div>
);

export default ChatWidget;
