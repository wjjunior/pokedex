import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push(
      // Rule for global LESS files
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          "css-loader",
          {
            loader: "postcss-loader", // Process Tailwind CSS directives
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // Rule for modular LESS files
      {
        test: /\.module\.less$/,
        use: [
          "css-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // Enable CSS Modules
            },
          },
          {
            loader: "postcss-loader", // Process Tailwind CSS directives
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    );

    return config;
  },
};

export default nextConfig;
