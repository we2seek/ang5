const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const helpers = require('./helpers');
const path = require('path');

// const extractSass = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('src', 'tsconfig.json') }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },

            // {
            //     test: /\.css$/,
            //     exclude: helpers.root('src', 'app'),
            //     loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            // },
            // {
            //     test: /\.css$/,
            //     include: helpers.root('src', 'app'),
            //     loader: 'raw-loader'
            // },

            // {
            //     test: /\.scss$/,
            //     use: [{
            //         loader: "style-loader"
            //     }, {
            //         loader: "css-loader",
            //         options: {
            //             sourceMap: true,
            //             minimize: true
            //         }
            //     }, {
            //         loader: "sass-loader",
            //         options: {
            //             sourceMap: true
            //         }
            //     }]
            // },

            // loader config for angular component styles 
            {
                test: /\.(scss|css)$/,
                use: ['raw-loader', 'sass-loader'], // don't use css-loader for ng2 （unusual）
            },
            // loader config for global css files
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /src\/app/], 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },


        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            // For Angular 5, see also https://github.com/angular/angular/issues/20357#issuecomment-343683491
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};