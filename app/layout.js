import { GameProvider } from "./_context/GameContext";
import "./globals.css";

export const metadata = {
  title: "Pig Game",
  description:
    "Exercise from The Complete JavaScript Course by Jonas Schmedtmann",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-pink-600 h-screen antialiased flex justify-center`}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
