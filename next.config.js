/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // WebXRに必要な実験的機能を有効化
    esmExternals: true,
  },
  // WebXRのためのHTTPS設定（開発時）
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  // Three.jsなどの大きなライブラリの最適化
  webpack: (config) => {
    config.externals = config.externals || [];
    return config;
  },
};

module.exports = nextConfig;
