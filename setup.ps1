# Create folders
New-Item -ItemType Directory -Force -Path app
New-Item -ItemType Directory -Force -Path lib
New-Item -ItemType Directory -Force -Path public

# package.json
@'
{
  "name": "energy-collective",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
'@ | Out-File -Encoding utf8 package.json

# next.config.js
@'
const nextConfig = {
  reactStrictMode: true
};
module.exports = nextConfig;
'@ | Out-File -Encoding utf8 next.config.js

# postcss.config.js
@'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'@ | Out-File -Encoding utf8 postcss.config.js

# tailwind.config.js
@'
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        surface: "#111827",
        accent: "#38BDF8"
      }
    }
  },
  plugins: [],
};
'@ | Out-File -Encoding utf8 tailwind.config.js

# globals.css
@'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0B0F14;
  color: #E5E7EB;
  font-family: Arial, Helvetica, sans-serif;
}
'@ | Out-File -Encoding utf8 app/globals.css

# config.ts
@'
export const APP = {
  name: "Energy Collective",
  tagline: "Subsurface Experts Network"
};
'@ | Out-File -Encoding utf8 lib/config.ts

# layout.tsx
@'
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
'@ | Out-File -Encoding utf8 app/layout.tsx

# page.tsx
@'
export default function Home() {
  return (
    <div>
      <h2>Find verified subsurface experts — fast.</h2>
      <p style={{ marginTop: "10px", color: "#9CA3AF" }}>
        Energy Collective is a curated network of subsurface specialists.
      </p>

      <div style={{ marginTop: "30px" }}>
        <button style={{
          padding: "12px 20px",
          backgroundColor: "#38BDF8",
          color: "#000",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}>
          Join as Expert
        </button>
      </div>
    </div>
  );
}
'@ | Out-File -Encoding utf8 app/page.tsx

# README.md
@'
# Energy Collective
Subsurface Experts Network
'@ | Out-File -Encoding utf8 README.md
