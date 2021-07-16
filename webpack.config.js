const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {

  mode: 'development',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3420
  },

  entry: ['babel-polyfill', path.resolve(__dirname, "src/index.tsx")],

  resolve: {
    alias: {
      "app": path.resolve(__dirname, './src/app'),
      "core": path.resolve(__dirname, './src/core'),
      "activities": path.resolve(__dirname, './src/packages/activities'),
      "contacts": path.resolve(__dirname, './src/packages/contacts'),
      "inventory": path.resolve(__dirname, './src/packages/inventory'),
      "recipes": path.resolve(__dirname, './src/packages/recipes')
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'build.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Organizer App',
      template: 'static/index.html'
    }),
    new ESLintPlugin({ extensions: ['ts', 'tsx', 'js'] })
  ],

}