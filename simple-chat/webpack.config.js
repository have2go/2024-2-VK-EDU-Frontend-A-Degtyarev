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
        chat: "./chat/chat.js",
        chatList: "./chatList/chatList.js",
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
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: "chat/chat.html",
            template: "./chat/chat.html",
            chunks: ["chat"],
        }),
        new HTMLWebpackPlugin({
            filename: "chatList/chatList.html",
            template: "./chatList/chatList.html",
            chunks: ["chatList"],
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
        open: "/chatList/chatList.html",
    },
};
