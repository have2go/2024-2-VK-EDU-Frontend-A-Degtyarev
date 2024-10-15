"use strict";

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const SRC_PATH = path.resolve(__dirname, "src");
const BUILD_PATH = path.resolve(__dirname, "build");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    context: SRC_PATH,
    entry: {
        chat: "./chat.js",
        chatList: "./index.js",
        404: "./404.js",
    },
    output: {
        path: BUILD_PATH,
        filename: "[name].bundle.js",
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                include: SRC_PATH,
                use: [isDevelopment ? "style-loader" : MiniCSSExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.svg$/, // Правило для обработки SVG
                use: [
                    {
                        loader: "url-loader", // Обработчик для SVG
                        options: {
                            limit: 8192, // Если размер меньше 8kb, SVG будет встроен
                            name: "[name].[hash:8].[ext]", // Формат имени выходного файла
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: "chat.html",
            template: "./chat.html",
            chunks: ["chat"],
        }),
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            chunks: ["chatList"],
        }),
        new HTMLWebpackPlugin({
            filename: "404.html",
            template: "./404.html",
            chunks: ["404"],
        }),
        ...(!isDevelopment
            ? [
                  new MiniCSSExtractPlugin({
                      filename: "[name].css",
                  }),
              ]
            : []),
    ],
    devServer: {
        static: {
            directory: BUILD_PATH,
        },
        hot: true,
        port: 3000,
        open: "index.html",
    },
};
