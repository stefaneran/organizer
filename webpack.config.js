const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      "@containers": path.resolve(__dirname, './src/containers'),
      "@components": path.resolve(__dirname, './src/components'),
      "@data": path.resolve(__dirname, './src/data'),
      "@interfaces": path.resolve(__dirname, './src/interfaces'),
      "@mocks": path.resolve(__dirname, './src/mocks'),
      "@store": path.resolve(__dirname, './src/store'),
      "@utils": path.resolve(__dirname, './src/utils')
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'build.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Organizer App',
      template: 'static/index.html'
    })
  ],

}