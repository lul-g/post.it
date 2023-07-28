/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/app/page.tsx",
  //       headers: [
  //         {
  //           key: "Cache-control",
  //           value: "no-store",
  //         },
  //       ],
  //     },
  //     {
  //       source: "/app/posts/[id]",
  //       headers: [
  //         {
  //           key: "Cache-control",
  //           value: "no-store",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
