import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})


{/* <div className="upside-down">
      <h1 className="horror-text text-6xl">Blood Flow</h1>
      <h1 className="red-flow-text text-8xl">Pure Energy</h1>
      <h1 className="red-static-text">Static Red</h1>
      <button className="horror-btn">View My Work →</button>
    </div> */}