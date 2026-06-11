import React, { useEffect, useRef } from 'react';

// Theme colors (inlined after config/theme.js cleanup)
const THEME = {
    colors: {
        primary: '#16161D',
        secondary: '#A3785B',
        lines: 'rgba(27, 42, 65, 0.08)',
    },
};

const Background = ({ scrollY }) => {
    const canvasRef = useRef(null);
    const scrollRef = useRef(scrollY);

    // Keep scrollRef in sync without re-triggering effect
    useEffect(() => {
        scrollRef.current = scrollY;
    }, [scrollY]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particleCount = 80; // Balanced density
        const connectionDistance = 150;
        const mouseDistance = 200;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Particle Class
        class Particle {
            constructor() {
                this.baseX = Math.random() * width;
                this.baseY = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5 + 0.25; // Fine dots (1.0 - 2.5px)

                // PARALLAX DISABLED
                this.parallaxFactor = 0;
            }

            update(mouseX, mouseY, time) {
                // Movement
                this.baseX += this.vx;
                this.baseY += this.vy;

                // Bounce off edges (relative to base coordinates)
                if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
                if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

                // Parallax Base (Disabled)
                let visualY = this.baseY;
                let visualX = this.baseX;

                // WAVE INTERFERENCE 
                // if (mouseX != null && mouseY != null) {}
                return { x: visualX, y: visualY };
            }

            draw(visualX, visualY) {
                ctx.beginPath();
                ctx.arc(visualX, visualY, this.size, 0, Math.PI * 2);
                ctx.fillStyle = THEME.colors.primary;
                ctx.globalAlpha = 0.3; // Gentle opacity
                ctx.fill();
            }
        }

        // Initialize Particles
        let particles = [];
        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        // Resize Handler
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        // Mouse Tracker
        let mouseX = null;
        let mouseY = null;
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const handleMouseLeave = () => {
            mouseX = null;
            mouseY = null;
        };

        // Animation Loop
        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.05;

            // Get positions first
            const positions = particles.map(p => p.update(mouseX, mouseY, time));

            // Draw and Connect
            particles.forEach((p, index) => {
                const pos = positions[index];
                p.draw(pos.x, pos.y);

                // Draw Connections
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const pos2 = positions[j];

                    const dx = pos.x - pos2.x;
                    const dy = pos.y - pos2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();

                        let isEnergized = false;
                        if (mouseX != null && mouseY != null) {
                            const d1 = Math.sqrt(Math.pow(pos.x - mouseX, 2) + Math.pow(pos.y - mouseY, 2));
                            const d2 = Math.sqrt(Math.pow(pos2.x - mouseX, 2) + Math.pow(pos2.y - mouseY, 2));
                            if (d1 < 250 || d2 < 250) isEnergized = true;
                        }

                        if (isEnergized) {
                            ctx.strokeStyle = THEME.colors.secondary;
                            ctx.lineWidth = 1.2; // Fine lines
                            ctx.globalAlpha = (1 - (distance / connectionDistance)) * 0.5;
                        } else {
                            ctx.strokeStyle = THEME.colors.lines;
                            ctx.lineWidth = 0.8; // Very fine lines
                            ctx.globalAlpha = (1 - (distance / connectionDistance)) * 0.2;
                        }

                        ctx.moveTo(pos.x, pos.y);
                        ctx.lineTo(pos2.x, pos2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Setup
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#EFF1F3]">
            {/* Subtle Grid Texture Background */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: `
              linear-gradient(to right, ${THEME.colors.lines} 1px, transparent 1px),
              linear-gradient(to bottom, ${THEME.colors.lines} 1px, transparent 1px)
            `,
                    backgroundSize: '2rem 2rem',
                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                    opacity: 0.5
                }}
            />

            {/* Interactive Particle Network */}
            <canvas ref={canvasRef} className="absolute inset-0" />
        </div>
    );
};

export default Background;
