import { useEffect, useState, useRef, useCallback } from "react";

const AnimatedBackground = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Optimized mouse tracking with throttle
  useEffect(() => {
    let ticking = false;
    const move = (e) => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setMouse({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
          });
          ticking = false;
        });
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Optimized scroll tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optimized time animation
  useEffect(() => {
    let lastTime = 0;
    const animateTime = (currentTime) => {
      if (currentTime - lastTime > 16) { // ~60fps
        setTime((prev) => prev + 0.01);
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animateTime);
    };
    animationRef.current = requestAnimationFrame(animateTime);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Particle class
  class Particle {
    constructor(canvas) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.baseSpeedX = this.speedX;
      this.baseSpeedY = this.speedY;
      this.color = `hsl(210, 80%, ${60 + Math.random() * 20}%)`;
      this.canvas = canvas;
    }

    update(mouseX, mouseY, time) {
      // Natural movement with time
      this.x += this.speedX + Math.sin(time + this.y * 0.01) * 0.05;
      this.y += this.speedY + Math.cos(time + this.x * 0.01) * 0.05;

      // Mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        this.speedX = this.baseSpeedX + dx * force * 0.02;
        this.speedY = this.baseSpeedY + dy * force * 0.02;
      } else {
        this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
        this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
      }

      // Wrap around edges
      if (this.x > this.canvas.width) this.x = 0;
      if (this.x < 0) this.x = this.canvas.width;
      if (this.y > this.canvas.height) this.y = 0;
      if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Canvas setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let mouseX = window.innerWidth * mouse.x;
    let mouseY = window.innerHeight * mouse.y;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Adjust particle count based on screen size
      const particleCount = Math.min(
        300,
        Math.floor((canvas.width * canvas.height) / 5000)
      );
      
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from(
          { length: particleCount },
          () => new Particle(canvas)
        );
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Initialize particles
    if (particlesRef.current.length === 0) {
      const particleCount = Math.min(
        300,
        Math.floor((canvas.width * canvas.height) / 5000)
      );
      particlesRef.current = Array.from(
        { length: particleCount },
        () => new Particle(canvas)
      );
    }

    // Mouse position update
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update(mouseX, mouseY, time);
        particle.draw(ctx);
      });

      // Draw connections
      ctx.strokeStyle = "rgba(64, 156, 255, 0.1)";
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const alpha = 0.2 * (1 - distance / 100);
            ctx.strokeStyle = `rgba(64, 156, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mouse.x, mouse.y, time]);

  // Memoized star rendering
  const stars = useCallback(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const size = Math.random() * 2 + 0.3;
      return (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, 
              rgba(255, 255, 255, 0.9) 0%, 
              rgba(64, 156, 255, 0.6) 70%, 
              transparent 100%)`,
            opacity: Math.random() * 0.5 + 0.1,
            animation: `twinkle ${3 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 5}s`,
            transform: `translateY(${scrollY * 0.03}px)`,
            willChange: "transform, opacity",
          }}
        />
      );
    });
  }, [scrollY]);

  // Memoized shooting stars
  const shootingStars = useCallback(() => {
    return Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          width: "150px",
          height: "1px",
          top: `${10 + Math.random() * 80}%`,
          left: `${Math.random() * 100}%`,
          animation: `shoot ${4 + Math.random() * 4}s linear infinite ${i * 3}s`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-300/70 to-blue-500/50" />
      </div>
    ));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f2b] via-[#0c1a3a] to-[#102a5c]" />
      
      {/* Animated wave */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(64, 156, 255, 0.08) 40px,
            rgba(64, 156, 255, 0.08) 80px
          )`,
          animation: `wave 20s linear infinite`,
          willChange: "background-position",
        }}
      />

      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
      />

      {/* Stars */}
      {stars()}

      {/* Shooting stars */}
      {shootingStars()}

      {/* Mouse glow */}
      <div
        className="absolute w-[300px] h-[300px] transition-all duration-300"
        style={{
          left: `${mouse.x * 100}%`,
          top: `${mouse.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at center, rgba(64, 156, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: "left, top",
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,15,43,0.9)_100%)]" />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.1;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes shoot {
          0% { 
            opacity: 0;
            transform: translateX(0) translateY(0);
          }
          5% { opacity: 1; }
          100% { 
            transform: translateX(-800px) translateY(400px);
            opacity: 0;
          }
        }

        /* Performance optimizations */
        .pointer-events-none {
          pointer-events: none;
        }

        * {
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;