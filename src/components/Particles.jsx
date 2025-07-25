import React, { useEffect } from 'react';

const createParticles = () => {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  const count = Math.floor(window.innerWidth / 12);
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.animationDuration = 10 + Math.random() * 20 + 's';
    p.style.opacity = 0.2 + Math.random() * 0.5;
    container.appendChild(p);
  }
};

const Particles = () => {
  useEffect(() => {
    createParticles();
    window.addEventListener('resize', createParticles);
    return () => window.removeEventListener('resize', createParticles);
  }, []);
  return <div className="floating-particles" id="particles"></div>;
};

export default Particles; 