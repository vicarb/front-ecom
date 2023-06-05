/** @type {import('next').NextConfig} */
const nextConfig = {
  //comment this part when deploying in vms
  // experimental: {
  //   appDir: true,
  // },
  // output: 'export',
  //
  // basePath:'/home',
  images: {
    domains: ['storage.googleapis.com'],
  },


};

module.exports = nextConfig;
