import './App.css';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import front from './assects/front.jpeg';
import back from './assects/back.jpeg';

function App() {
  const params = useParams();
  const guest = params.guest || 'Guest';
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // 🎆 Fireworks Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 5 + 2;
        this.life = 100;
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.speed *= 0.95;
        this.life--;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    let particles = [];
    const colors = ['#ff0043', '#14fc56', '#1e90ff', '#ffff00', '#ff8c00', '#ff00ff'];

    function createFirework(x, y) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    animate();

    // Launch fireworks on load
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createFirework(Math.random() * w, Math.random() * h / 2);
      }, i * 500);
    }

    // Fade out after 5s
    setTimeout(() => {
      canvas.style.transition = "opacity 1s ease";
      canvas.style.opacity = "0";
      setTimeout(() => (canvas.style.display = "none"), 1000);
    }, 5000);

    // Resize handling
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  // 📱 Card rotation logic
  useEffect(() => {
    const card = cardRef.current;
    if (window.innerWidth > 768) return;

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const deltaX = x - startPos.x;
      const deltaY = y - startPos.y;

      setRotation((prev) => ({
        x: Math.max(-10, Math.min(10, prev.x - deltaY * 0.5)),
        y: prev.y + deltaX * 0.5,
      }));

      setStartPos({ x, y });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      card.style.transition = "transform 0.5s ease";
      setTimeout(() => (card.style.transition = ""), 500);
    };

    card.addEventListener("touchstart", handleTouchStart);
    card.addEventListener("touchmove", handleTouchMove);
    card.addEventListener("touchend", handleTouchEnd);

    return () => {
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startPos]);

  return (
    <div className="App">
      {/* 🎆 Fireworks Canvas */}
      <canvas ref={canvasRef} className="fireworks-canvas"></canvas>

      <header>
        <h1>Dear! <br />{guest}</h1>
        <p>
          We’re delighted to have you here! <br />
          Your presence means the world to us as we begin a new chapter of love and togetherness.
        </p>
      </header>

      <div className="cardbox">
        <div
          className="card"
          ref={cardRef}
          style={{ transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)` }}
        >
          <div className="front cb">
            <img src={front} alt="" />
          </div>
          <div className="back cb">
            <img src={back} alt="" />
          </div>
        </div>
      </div>

      <p className="hint">✨ Swipe to rotate ✨</p>

      <section className="container mt-5 text-light" id="venue">
        <h2 className="display-1 text-light fw-bolder text-center">Venue</h2>
        <h3 className="fw-bolder text-light">ICONIC GREENS RESORT</h3>
        <p>
          ICONIC GREENS RESORT Resalpur jamuniya, Goharganj - Bhojpur Rd, Resalpur, Madhya Pradesh 464551
        </p>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4939805716635!2d77.607446!3d23.079006099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c37005ada0f39%3A0x2691afb3e15ef33b!2sICONIC%20GREENS%20RESORT!5e0!3m2!1sen!2sin!4v1759773209007!5m2!1sen!2sin"
          id="map"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}

export default App;
