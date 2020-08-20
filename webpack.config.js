const DojoWebpackPlugin = require("dojo-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: __dirname,
    entry: {
        'index': ['src/demo/index.ts']
    },
    output: {
        path: path.join(__dirname, 'build')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                widgets: {
                    name: 'widgets',
                    test: /[\\/]widgets[\\/]/,
                },
                default: {
                    minChunks: 2,
                    priority: -20
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/.*node_modules.*/],
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [path.resolve(__dirname, "node_modules"), "node_modules"]
    },
    resolveLoader: {
        modules: ["node_modules"]
    },
    plugins: [
        new DojoWebpackPlugin({
            loaderConfig: require('./src/loaderConfig'),
            environment: { dojoRoot: "" },
            buildEnvironment: { dojoRoot: "node_modules" },
            locales: ["en"],
            noConsole: true,
            async: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                context: "node_modules",
                from: "dojo/resources/blank.gif",
                to: "dojo/resources"
            }]
        })
    ]
};
