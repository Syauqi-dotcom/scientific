import React from 'react';

/**
 * SectionLabel
 * Renders the numbered section indicator used throughout the landing page.
 * Format: "00 — SECTION NAME"
 */
const SectionLabel = ({ index, label, className = '' }) => {
    const num = String(index).padStart(2, '0');
    const accentColor = '#A3785B';
    const lineColor = 'rgba(22, 22, 29, 0.15)';
    const textColor = 'rgba(22, 22, 29, 0.4)';

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="font-mono text-[10px] font-bold tracking-[0.2em]" style={{ color: accentColor }}>
                {num}
            </span>
            <span className="w-6 h-px" style={{ backgroundColor: lineColor }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color: textColor }}>
                {label}
            </span>
        </div>
    );
};

export default SectionLabel;
