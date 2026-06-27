import { REPO_BASE } from './lib/site.mjs';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? REPO_BASE : '',
  assetPrefix: isProd ? REPO_BASE : '',
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
