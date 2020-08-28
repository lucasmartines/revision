const path = require('path');

process.env.NODE_ENV = 'development'

console.log( process.env.NODE_ENV )


module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  },
  entry: './src/js/main.js' ,
  mode:'development',
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
           'style-loader'
          ,'css-loader'
          ,'sass-loader']
      },
    ],
  },
}
