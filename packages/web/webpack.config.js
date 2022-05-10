const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill', path.resolve(__dirname, "src/index.tsx")
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'build.js',
    publicPath: './'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    port: 3420
  },
  resolve: {
    alias: {
      // Need to invoke as @core for imports to work in Jest
      "@core": path.resolve(__dirname, './src/core'),
      "app": path.resolve(__dirname, './src/app'),
      "activities": path.resolve(__dirname, './src/views/activities'),
      "contacts": path.resolve(__dirname, './src/views/contacts'),
      "inventory": path.resolve(__dirname, './src/views/inventory'),
      "recipes": path.resolve(__dirname, './src/views/recipes')
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
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
      template: 'public/index.html'
    }),
    new ESLintPlugin({ extensions: ['ts', 'tsx', 'js'] })
  ]
}