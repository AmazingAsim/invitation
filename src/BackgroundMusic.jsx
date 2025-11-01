import React, { useRef, useState } from "react";
import song from "./assects/song.mp3";
import "./backgroundMusic.css";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(false);

  const handleStart = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
    } catch {
      audio.muted = true;
      await audio.play();
      audio.muted = false;
    }

    setFade(true);
    setTimeout(() => setStarted(true), 800); // smooth fade-out
  };

  return (
    <>
      <audio ref={audioRef} src={song} loop preload="auto" />
      {!started && (
        <div className={`music-overlay ${fade ? "fade-out" : ""}`}>
          <div className="music-card">
            <h1 className="music-title">💐 Welcome to Our Celebration 💍</h1>
            <p className="music-sub">Click below to enter with love & melody</p>
            <button className="music-button" onClick={handleStart}>
              💖 Enter With Music
            </button>
            <button
              className="music-button-secondary"
              onClick={() => setStarted(true)}
            >
              Skip Music
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
