import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/tienda-migue/", // Añadir esta línea con el nombre de tu repositorio
})
