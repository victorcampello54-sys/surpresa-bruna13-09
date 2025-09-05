"use client";
import { useState, useEffect, useRef } from "react";

export default function SurpresaBruna() {
  const [showMessage, setShowMessage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const photoRefs = useRef([]);
  const confettiRef = useRef(null);

  const photoFiles = [
    "/fotos/foto1.jpg",
    "/fotos/foto2.jpg",
    "/fotos/foto3.jpg",
    "/fotos/foto4.jpg",
    "/fotos/foto5.jpg",
    "/fotos/foto6.jpg",
    "/fotos/foto7.jpg",
    "/fotos/foto8.jpg",
    "/fotos/foto9.jpg",
    "/fotos/foto10.jpg",
  ];

  const heartPoint = (t) => {
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x: (x + 16) / 32 * 100, y: (1 - (y + 17) / 30) * 100 };
  };

  useEffect(() => {
    audioRef.current = new Audio("/musica.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Web Audio API para detectar batidas
    let audioCtx, analyser, source, dataArray;
    let animationFrame;

    const setupAudioAnalysis = () => {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaElementSource(audioRef.current);
      analyser = audioCtx.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      const detectBeat = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        if (avg > 100) { // threshold para batida
          photoRefs.current.forEach((p) => {
            if (!p) return;
            const scale = 1.08 + Math.random() * 0.02;
            const glow = "0 0 20px rgba(255,182,193,0.8)";
            p.style.transition = "transform 0.2s, box-shadow 0.2s";
            p.style.transform = `scale(${scale})`;
            p.style.boxShadow = glow;
            setTimeout(() => {
              p.style.transform = "scale(1)";
              p.style.boxShadow = "0 0 15px rgba(255,182,193,0.7)";
            }, 200);
          });
        }
        animationFrame = requestAnimationFrame(detectBeat);
      };
      detectBeat();
    };

    const intervalIds = [];

    // Fade-in inicial + pulso leve
    photoRefs.current.forEach((p, i) => {
      if (p) {
        p.style.opacity = 0;
        p.style.transform += " scale(0.5)";
        setTimeout(() => {
          p.style.transition = "all 1s ease-out";
          p.style.opacity = 1;
          p.style.transform = `translateY(0px) rotate(${p.dataset.rot}deg) scale(1)`;
          setInterval(() => {
            if (!p) return;
            const scale = 1 + Math.random() * 0.02;
            p.style.transform = `translateY(0px) rotate(${p.dataset.rot}deg) scale(${scale})`;
          }, 800 + i * 100);
        }, i * 100);
      }
    });

    // Confete de corações
    const createConfetti = () => {
      setInterval(() => {
        if (!confettiRef.current) return;
        const conf = document.createElement("div");
        conf.innerText = "💖";
        conf.style.position = "absolute";
        conf.style.fontSize = `${Math.random() * 20 + 10}px`;
        conf.style.left = `${Math.random() * 100}%`;
        conf.style.top = `-20px`;
        conf.style.opacity = Math.random();
        conf.style.transition = `all ${Math.random() * 5 + 5}s linear`;
        confettiRef.current.appendChild(conf);
        setTimeout(() => {
          conf.style.top = "110%";
        }, 50);
        setTimeout(() => conf.remove(), 6000);
      }, 400);
    };
    createConfetti();

    audioRef.current.addEventListener("play", () => {
      if (!audioCtx) setupAudioAnalysis();
    });
    audioRef.current.addEventListener("pause", () => {
      cancelAnimationFrame(animationFrame);
    });

    return () => {
      if (audioRef.current) audioRef.current.pause();
      intervalIds.forEach(clearInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-200 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-500 ${showMessage ? 'backdrop-blur-sm' : ''}`}>
      
      <div ref={confettiRef} className="pointer-events-none absolute inset-0 overflow-hidden"></div>

      {!showMessage ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold text-pink-800 mb-6 text-center drop-shadow transition-all duration-500">
            Para Bruna, com todo meu carinho ❤️
          </h1>

          <div className={`relative w-[320px] h-[320px] md:w-[520px] md:h-[520px] transition-all duration-500 ${showMessage ? 'opacity-50' : 'opacity-100'}`}>
            {photoFiles.map((src, i) => {
              const t = (i / photoFiles.length) * Math.PI * 2;
              const { x, y } = heartPoint(t);
              const size = i % 3 === 0 ? 80 : 70;
              const rot = (i % 2 === 0 ? -1 : 1) * (8 + (i * 13) % 12);

              return (
                <img
                  key={i}
                  src={src}
                  alt="nossa foto"
                  className="absolute rounded-md shadow-lg border transition-all duration-500"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `calc(${y}% - ${size / 2}px)`,
                    left: `calc(${x}% - ${size / 2}px)`,
                    boxShadow: "0 0 15px rgba(255,182,193,0.7)"
                  }}
                  data-rot={rot}
                  ref={(el) => (photoRefs.current[i] = el)}
                />
              );
            })}
          </div>

          <button
            onClick={() => setShowMessage(true)}
            className="mt-10 px-6 py-3 bg-pink-600 text-white rounded-2xl shadow-md hover:bg-pink-700 transition transform hover:scale-105"
          >
            💌 Abrir minha surpresa
          </button>
        </>
      ) : (
        <div className="text-center max-w-xl bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center transition-all duration-500">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">
            Minha mensagem para você 💖
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Bruna, cada momento com você é uma lembrança que quero guardar para sempre. 💕<br />
            Esse site é só um detalhe, mas ele representa tudo que sinto: carinho, amor e a vontade de estar ao seu lado em cada instante.
          </p>
          <button
            onClick={() => setShowMessage(false)}
            className="px-6 py-2 bg-pink-500 text-white rounded-2xl shadow-md hover:bg-pink-600 transition"
          >
            Voltar 💌
          </button>
        </div>
      )}

      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 px-4 py-2 rounded-full shadow-lg bg-white/80 backdrop-blur border hover:scale-105 transition"
      >
        {isPlaying ? "⏸ Pausar música" : "▶️ Tocar música"}
      </button>
    </div>
  );
}
