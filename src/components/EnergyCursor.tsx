import React, { useEffect, useRef, useState } from "react";

interface EnergyParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  type: "core" | "trail" | "spark";
}

interface EnergyField {
  x: number;
  y: number;
  radius: number;
  intensity: number;
  maxRadius: number;
}

const EnergyCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<EnergyParticle[]>([]);
  const fieldsRef = useRef<EnergyField[]>([]);
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

    // Crear partículas de energía
    const createEnergyParticles = () => {
      const particles: EnergyParticle[] = [];
      const particleCount = 25;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          life: 1,
          maxLife: 1,
          type: Math.random() > 0.7 ? "spark" : "core",
        });
      }
      particlesRef.current = particles;
    };

    createEnergyParticles();

    // Manejar movimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };

      // Crear partículas de rastro
      const distance = Math.sqrt(
        Math.pow(e.clientX - prevX, 2) + Math.pow(e.clientY - prevY, 2)
      );
      
      if (distance > 5) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: prevX + (e.clientX - prevX) * (i / 3),
            y: prevY + (e.clientY - prevY) * (i / 3),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 1.5 + 0.3,
            opacity: 0.6,
            life: 1,
            maxLife: 1,
            type: "trail",
          });
        }
      }

      // Crear campo de energía ocasionalmente
      if (Math.random() < 0.05) {
        fieldsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          intensity: 0.4,
          maxRadius: 80,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Calcular distancia al cursor
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        // Aplicar fuerza de atracción si está cerca del cursor
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          
          particle.vx += Math.cos(angle) * force * 0.3;
          particle.vy += Math.sin(angle) * force * 0.3;
        }

        // Aplicar fricción
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mantener partículas en pantalla
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Actualizar vida para partículas de rastro
        if (particle.type === "trail") {
          particle.life -= 0.02;
          particle.opacity = particle.life;
        }

        // Dibujar partícula según su tipo
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === "spark") {
          // Partículas de chispa con gradiente
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          gradient.addColorStop(0, "#FE5C02");
          gradient.addColorStop(0.5, "#FF8C42");
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = "#FE5C02";
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Efecto de energía cuando está cerca del cursor
        if (distance < 30) {
          ctx.save();
          ctx.globalAlpha = (30 - distance) / 30 * 0.4;
          ctx.strokeStyle = "#FE5C02";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        return particle.life > 0;
      });

      // Actualizar y dibujar campos de energía
      fieldsRef.current = fieldsRef.current.filter((field) => {
        field.radius += 1.5;
        field.intensity -= 0.01;

        if (field.intensity > 0) {
          ctx.save();
          ctx.strokeStyle = "#FE5C02";
          ctx.lineWidth = 2;
          ctx.globalAlpha = field.intensity;
          ctx.beginPath();
          ctx.arc(field.x, field.y, field.radius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Campo interno
          ctx.globalAlpha = field.intensity * 0.5;
          ctx.beginPath();
          ctx.arc(field.x, field.y, field.radius * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        return field.intensity > 0;
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

export default EnergyCursor; 