const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        {
          loader: 'postcss-loader',
        }
      ]
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          }
        }
      }),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: ["react", "react-dom"],
};