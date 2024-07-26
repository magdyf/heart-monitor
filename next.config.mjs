/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/_next/static/media/',
            outputPath: `${isServer ? '../' : ''}static/media/`,
          },
        },
      ],
    });
    return config;
  },
}

export default nextConfig;
