var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    cache: true,
    watch: true,
    entry: {
        all: "./app.tsx",
    },
    output: {
        path: __dirname + "/../app_dist/",
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            }
        ]
    },
    plugins: [               
        new ExtractTextPlugin("[name].css")]
};
