import "./globals.css";
import { APP } from "../lib/config";

export const metadata = {
  title: APP.name,
  description: APP.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "20px", borderBottom: "1px solid #1F2937" }}>
          <h1>{APP.name}</h1>
          <p style={{ color: "#9CA3AF" }}>{APP.tagline}</p>
        </header>
        <main style={{ padding: "40px" }}>{children}</main>
      </body>
    </html>
  );
}
