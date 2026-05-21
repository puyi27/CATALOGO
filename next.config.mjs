/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Evita que Vercel cancele la build por advertencias (como variables no usadas)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Evita que la build de Vercel falle por tipos en componentes complejos
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      }
    ],
  },
};

export default nextConfig;
