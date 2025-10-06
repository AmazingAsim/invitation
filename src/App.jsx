
import './App.css';
import { useParams } from 'react-router-dom';
import { useState,useRef,useEffect } from 'react';
function App() {
  const params = useParams();
  const guest = params.guest || 'Guest';

    const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;

    // Only enable manual rotation on small screens
    if (window.innerWidth > 768) return;

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartPos({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
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
      // smooth return to original
      card.style.transition = "transform 0.5s ease";
      // setRotation({ x: 0, y: 0 });
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
           <header>
               <h1 className='fw-bolder'>Dear! <br />{guest}</h1>
               <p>We’re delighted to have you here! <br /> Your presence means the world to us as we begin a new chapter of love and togetherness.</p>
           </header>
          <div class="cardbox">
       <div class="card" ref={cardRef}  style={{
          transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`
        }}>
            <div class="front cb">
                <img src="https://r1.ilikewallpaper.net/iphone-wallpapers/download-112427/Abs-of-Freedom-Eren-Yeager-Attack-on-Titan-Otaku-W_640.jpg" alt=""/>
            </div>
            <div class="back cb">
              <img src="https://i.pinimg.com/736x/83/01/9d/83019dcf646ae4258776fca83a10c0ae.jpg" alt=""/>
            </div>
       </div>
    </div>
    <p className="hint">✨ Swipe to rotate ✨</p>

      <section className='container mt-5 text-light' id='venue'>
           <h2 className='display-1 text-light fw-bolder text-center'>Venue</h2>
           <h3 className='fw-bolder text-light'>ICONIC GREENS RESORT</h3>
           <p>ICONIC GREENS RESORT Resalpur jamuniya, Goharganj - Bhojpur Rd, Resalpur, Madhya Pradesh 464551</p>
           <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4939805716635!2d77.607446!3d23.079006099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c37005ada0f39%3A0x2691afb3e15ef33b!2sICONIC%20GREENS%20RESORT!5e0!3m2!1sen!2sin!4v1759773209007!5m2!1sen!2sin" id='map'  allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </section>

    </div>
  );
}

export default App;
