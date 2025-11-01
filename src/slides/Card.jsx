import React from 'react'
import { useState,useEffect,useRef } from 'react';
import front from '../assects/front.jpeg';
import back from '../assects/back.jpeg';
export default function Card() {


      const cardRef = useRef(null);
      const canvasRef = useRef(null);
      const [rotation, setRotation] = useState({ x: 0, y: 0 });
      const [isDragging, setIsDragging] = useState(false);
      const [startPos, setStartPos] = useState({ x: 0, y: 0 });

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

      useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    class Confetti {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * -h; // start above the screen
        this.size = Math.random() * 10 + 6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.tilt = Math.random() * 10 - 10;
        this.tiltAngleIncrement = Math.random() * 0.08 + 0.04;
        this.tiltAngle = Math.random() * Math.PI;
        this.speed = Math.random() * 2 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 6 - 3;
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.tiltAngle) * 2;
        this.tiltAngle += this.tiltAngleIncrement;
        this.rotation += this.rotationSpeed;

        // reset when out of screen
        if (this.y > h + 20) this.reset();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
        ctx.restore();
      }
    }

    const colors = [
      '#FF0A47', '#14FC56', '#1E90FF', '#FFCE00',
      '#FF8C00', '#FF00FF', '#00FFFF', '#FF69B4', '#ADFF2F'
    ];

    const confettis = Array.from({ length: 200 }, () => new Confetti());

    function animate() {
      ctx.clearRect(0, 0, w, h);
      confettis.forEach(c => {
        c.update();
        c.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    // stop after 20 seconds with fade out
    setTimeout(() => {
      const fade = setInterval(() => {
        ctx.globalAlpha -= 0.02;
        if (ctx.globalAlpha <= 0) {
          clearInterval(fade);
          canvas.style.display = 'none';
        }
      }, 50);
    }, 20000);

    // handle resize
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
    return (
        <div className="card-container" id='cardcontainer'>
            <canvas ref={canvasRef} className="fireworks-canvas"></canvas>
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
        </div>
    )
}
