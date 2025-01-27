import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Eliminamos la sección 'experimental' ya que 'appDir' ya no es necesario
  images: {
    domains: ["localhost", "your-supabase-project.supabase.co"], // Ajusta según tus necesidades
  },
  // Puedes agregar más configuraciones específicas de tu proyecto aquí
}

export default nextConfig

