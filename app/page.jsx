"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

export default function SurpresaBruna() {
  const [showMessage, setShowMessage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const photos = useMemo(() => [
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
  ], []);

  useEffect(() => {
    audioRef.current = new Audio("/musica/musica.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const heartPoint = (t) => {
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const nx = (x + 16) / 32;
    const ny = (y + 17) / 30;
    return { x: nx * 100, y: (1 - ny) * 100 };
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-200 flex flex-col items-center justify-center p-6 relative overflow-hidden ${showMessage ? 'backdrop-blur-sm' : ''}`}>
      {!showMessage ? (
        <>
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-pink-800 mb-6 text-center drop-shadow"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Para Bruna, com todo meu carinho ❤️
          </motion.h1>

          <div className="relative w-[320px] h-[320px] md:w-[520px] md:h-[520px]">
            {photos.map((src, i) => {
              const t = (i / photos.length) * Math.PI * 2;
              const { x, y } = heartPoint(t);
              const size = i % 3 === 0 ? "md:w-32 md:h-40 w-24 h-32" : "md:w-28 md:h-36 w-20 h-28";
              const rot = (i % 2 === 0 ? -1 : 1) * (8 + (i * 13) % 12);

              return (
                <motion.div
                  key={i}
                  className={`absolute ${size} bg-white shadow-lg rounded-sm border p-1 flex items-center justify-center select-none`}
                  style={{ top: `calc(${y}% - 40px)`, left: `calc(${x}% - 40px)`, transform: `rotate(${rot}deg)` }}
                  animate={isPlaying ? { y: [0, -5, 0], scale: [1, 1.05, 1] } : { y: 0, scale: 1 }}
                  transition={{ repeat: isPlaying ? Infinity : 0, duration: 2, ease: "easeInOut" }}
                >
                  <div className="bg-white w-full h-full rounded-sm overflow-hidden flex flex-col">
                    <img src={src} alt="nossa foto" className="w-full h-full object-cover" />
                    <div className="h-4 md:h-6 bg-white" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            onClick={() => setShowMessage(true)}
            className="mt-10 px-6 py-3 bg-pink-600 text-white rounded-2xl shadow-md hover:bg-pink-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clique aqui 💌
          </motion.button>
        </>
      ) : (
        <motion.div
          className="text-center max-w-xl bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">
            Minha mensagem para você 💖
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Bruna, cada momento com você é uma lembrança que quero guardar para sempre. 💕
            Esse site é só um detalhe, mas ele representa tudo que sinto: carinho, amor e a vontade de estar ao seu lado em cada instante.
          </p>
          <button
            onClick={() => setShowMessage(false)}
            className="px-6 py-2 bg-pink-500 text-white rounded-2xl shadow-md hover:bg-pink-600 transition"
          >
            Voltar 💌
          </button>
        </motion.div>
      )}

      <button
        onClick={toggleAudio}
        className="fixed bottom-5 right-5 px-4 py-2 rounded-full shadow-lg bg-white/80 backdrop-blur border hover:scale-105 transition"
        title="Tocar/Pausar música"
      >
        {isPlaying ? "⏸ Pausar música" : "▶️ Tocar música"}
      </button>
    </div>
  );
}
