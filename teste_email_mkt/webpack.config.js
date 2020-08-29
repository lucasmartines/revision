const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


process.env.NODE_ENV = 'development'


module.exports = {
  entry: './src/index.ts' ,
  mode:'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  plugins: [
    
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // 'style-loader'
          MiniCssExtractPlugin.loader
          ,'css-loader'
          ,'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
