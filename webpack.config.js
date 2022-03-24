const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const postcssCssVars = require("postcss-css-variables");
const postcssCustomMedia = require('postcss-custom-media');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const publicPath = '/';
const VERSION = require("./package.json").version;
const serviceUrl = process.env.SERVICE_URL || './';

module.exports = (env = {}) => {

  const dev = process.env.NODE_ENV === "development";

  return {
    entry: dev
        ? [
          "core-js/stable",
          "regenerator-runtime/runtime",
          "url-search-params-polyfill",
          "webpack-plugin-serve/client",
          "./src"
        ]
        : [
          "core-js/stable",
          "regenerator-runtime/runtime",
          "url-search-params-polyfill",
          "./src"
        ],
    resolve: {
      extensions: [".js", '.jsx', ".tsx", ".ts", ".json"],
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    devtool: dev ? 'eval-source-map' : 'source-map',
    mode: dev ? 'development' : 'production',
    output: dev ? { path: publicPath, publicPath } : {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[hash].js',
      publicPath
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)\/(?!(retail-shared)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['lodash'],
            }
          }
        },
        {
          test: /\.(sc|c)ss$/i,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options:{
                modules: {
                  localIdentName: dev ? '[name]__[local]' : '[hash:base64]',
                  exportLocalsConvention: 'camelCase'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options:{
                postcssOptions: {
                  ident: "postcss",
                  plugins: [
                    postcssCssVars,
                    postcssCustomMedia()
                  ]
                }
              }
            },
            'sass-loader'
          ],
          include: /\.module\.(sc|c)ss$/
        },
        {
          test: /\.(sc|c)ss$/i,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options:{
                postcssOptions: {
                  ident: "postcss",
                  plugins: [
                    postcssCssVars,
                    postcssCustomMedia()
                  ]
                }
              }
            },
            'sass-loader'
          ],
          exclude: /\.module\.(sc|c)ss$/
        },
        {
          test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)$/,
          type: 'asset/resource',
        }
      ],
    },

    devServer: {
      host: "localhost",
      historyApiFallback: true,
      static: "./dist",
      port: 8080
    },
    optimization: dev
        ? {}
        : {
          runtimeChunk: "single",
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all"
              }
            }
          },
          moduleIds: 'deterministic'
        },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        title: 'Registration',
        filename: 'index.html',
        template: 'src/index.ejs',
        templateParameters: {
          base: serviceUrl
        },
        favicon: "./res/images/icons/logo.jpg"
      }),
      new webpack.ContextReplacementPlugin(
          /moment[/\\]locale$/,
          /de/
      ),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'VERSION': JSON.stringify(VERSION)
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
      }),
      ...(dev
          ? [
            new Serve({port: 8800, progress: "minimal", waitForBuild: true})
          ]
          : [
            new MiniCssExtractPlugin({
              filename: "[name].[chunkhash].css",
              chunkFilename: "[id].[chunkhash].css"
            })
          ])
    ].concat([
      env.analyzeBundle && new BundleAnalyzerPlugin()
    ].filter(Boolean))
  }
};
