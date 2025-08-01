import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

const CursorEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crear partículas iniciales
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 30; // Menos partículas para ser más sutil

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          life: 1,
          maxLife: 1,
        });
      }
      particlesRef.current = particles;
    };

    createParticles();

    // Manejar movimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };

      // Crear onda ocasionalmente
      if (Math.random() < 0.1) {
        wavesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          opacity: 0.3,
          maxRadius: 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      particlesRef.current.forEach((particle) => {
        // Calcular distancia al cursor
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;

        // Aplicar fuerza de atracción suave si está cerca del cursor
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          
          particle.vx += Math.cos(angle) * force * 0.2;
          particle.vy += Math.sin(angle) * force * 0.2;
        }

        // Aplicar fricción
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mantener partículas en pantalla
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = "#FE5C02";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Efecto de brillo sutil cuando está cerca del cursor
        if (distance < 40) {
          ctx.save();
          ctx.globalAlpha = (40 - distance) / 40 * 0.2;
          ctx.fillStyle = "#FE5C02";
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Actualizar y dibujar ondas
      wavesRef.current = wavesRef.current.filter((wave) => {
        wave.radius += 2;
        wave.opacity -= 0.01;

        if (wave.opacity > 0) {
          ctx.save();
          ctx.strokeStyle = "#FE5C02";
          ctx.lineWidth = 1;
          ctx.globalAlpha = wave.opacity;
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        return wave.opacity > 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Ocultar en dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth > 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: "transparent" }}
    />
  );
};

export default CursorEffects; 