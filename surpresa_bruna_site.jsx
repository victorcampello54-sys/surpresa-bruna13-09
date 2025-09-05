import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SurpresaBruna() {
  const [showMessage, setShowMessage] = useState(false);

  // Substitua os links abaixo pelas fotos de vocês
  const photos = [
    "/fotos/foto1.jpg",
    "/fotos/foto2.jpg",
    "/fotos/foto3.jpg",
    "/fotos/foto4.jpg",
    "/fotos/foto5.jpg",
    "/fotos/foto6.jpg",
    "/fotos/foto7.jpg",
    "/fotos/foto8.jpg",
  ];

  useEffect(() => {
    const audio = new Audio("/musica/musica.mp3"); // Coloque aqui sua música
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {
      console.log("Autoplay bloqueado, será iniciado no clique");
    });
    return () => audio.pause();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-200 flex flex-col items-center justify-center p-6">
      {!showMessage ? (
        <>
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-pink-800 mb-6 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Para Bruna, com todo meu carinho ❤️
          </motion.h1>

          {/* Coração com polaroids */}
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            {photos.map((src, i) => (
              <motion.div
                key={i}
                className="absolute w-24 h-28 md:w-32 md:h-36 bg-white shadow-lg rounded-sm border p-1 flex items-center justify-center"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (10 + i * 3)}deg)`,
                  top: `${50 + 40 * Math.sin((i / photos.length) * Math.PI * 2)}%`,
                  left: `${50 + 40 * Math.cos((i / photos.length) * Math.PI * 2)}%`,
                  margin: "-50px",
                }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              >
                <img src={src} alt="nossa foto" className="w-full h-full object-cover rounded" />
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => setShowMessage(true)}
            className="mt-10 px-6 py-3 bg-pink-600 text-white rounded-2xl shadow-md hover:bg-pink-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            Clique aqui 💌
          </motion.button>
        </>
      ) : (
        <motion.div
          className="text-center max-w-xl bg-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">
            Minha mensagem para você 💖
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Bruna, cada momento com você é uma lembrança que quero guardar para sempre. 💕
            Esse site é só um detalhe, mas ele representa tudo que sinto: carinho, amor e a vontade de estar ao seu lado em cada instante.
          </p>
        </motion.div>
      )}
    </div>
  );
}
