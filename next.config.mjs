/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Asegúrate de que las variables de entorno estén disponibles durante la construcción
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  }
  
  export default nextConfig
  
  