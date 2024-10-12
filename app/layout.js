import "./globals.css";

export const metadata = {
  title: "Pig Game",
  description:
    "Exercise from The Complete JavaScript Course by Jonas Schmedtmann",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
