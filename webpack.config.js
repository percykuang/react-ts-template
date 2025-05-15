const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { FriendlyConsolePlugin, BuildSuccessPlugin } = require('./plugins');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      publicPath: '/',
      clean: true,
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 3000,
      hot: true,
      historyApiFallback: true,
      client: {
        logging: 'warn', // 显示警告和错误
        overlay: {
          errors: true,
          warnings: true,
        },
      },
      // 禁用自动打开浏览器，避免每次都打开新窗口
      open: false,
    },
    stats: 'errors-only', // 只显示错误
    infrastructureLogging: {
      level: 'warn', // 只显示错误级别的日志
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        // 处理 .module.less 文件 (CSS Modules)
        {
          test: /\.module\.less$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                esModule: false,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        // 处理普通 .less 文件 (非 CSS Modules)
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
        // 处理 .module.css 文件 (CSS Modules)
        {
          test: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                esModule: false,
              },
            },
          ],
        },
        // 处理普通 .css 文件 (非 CSS Modules)
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: 'css/[name].[contenthash].css',
            }),
            // 在生产模式下使用 BuildSuccessPlugin 显示构建进度和成功信息
            new BuildSuccessPlugin(),
          ]
        : [
            // 在开发模式下使用 FriendlyConsolePlugin
            new FriendlyConsolePlugin(),
          ]),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
