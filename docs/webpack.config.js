var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    cache: true,
    watch: true,
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        all: "./app.tsx",
    },
    output: {
        path: __dirname + "/app_dist",
        filename: ("[name].js")
    },
    resolve: {
        extensions: ['.js', '.ts', ".tsx", ".less"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }
        ]
    }  
};
