const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    devtool: "source-map",
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    entry: {
        main: "./src/index.ts"
    },
    output: {
        path: path.join(__dirname, "dist"),
        library: "[name]",
        libraryTarget: "commonjs2",
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            src: path.resolve(__dirname, "src/")
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "tslint-loader"
                    }
                ]
            },
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: { loader: "awesome-typescript-loader" }
            },
            // addition - add source-map support
            {
                enforce: "pre",
                exclude: /node_modules/,
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};
