export const metadata = {
  title: "Para Bruna",
  description: "Uma surpresa especial 💖",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
