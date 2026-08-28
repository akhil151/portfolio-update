const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Local placeholder/brand assets are SVGs we control; allow them through the optimizer.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
  },
};

export default nextConfig;
