import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // Asegúrate de que las siguientes opciones estén configuradas si las necesitas
  images: {
    domains: ["localhost", "your-supabase-project.supabase.co"], // Ajusta según tus necesidades
  },
  // Puedes agregar más configuraciones específicas de tu proyecto aquí
}

export default nextConfig

