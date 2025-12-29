import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Energy Collective",
  description: "Subsurface Experts Network",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}

