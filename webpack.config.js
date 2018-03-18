
   // console.log(__dirname);
   // in terminal:
   // node webpack.config.js

   const path = require('path'); // to access the nodes join function
   const ExtractTextPlugin = require('extract-text-webpack-plugin');

   module.exports = (env) => {

      const isProduction = env === 'production';
      const CSSExtract = new ExtractTextPlugin('styles.css');

      return {
         entry : {
            app: ['babel-polyfill', './src/app.js']
         },
         output   : {
            path     : path.resolve(__dirname, 'dist'),
            filename : 'app.js'
            // publicPath: 'dist/'
         },
         module: {
            rules:[
               {
                  test: /\.js$/,
                  loader:'babel-loader',
                  exclude: /node_modules/,
               },{
                  test:/\.s?css$/,
                  use: CSSExtract.extract({
                     use: [
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: true
                           }
                        },
                        {
                           loader:'sass-loader',
                           options: {
                              sourceMap: true
                           }
                        }
                     ]
                  })
               }
            ]
         },
         plugins: [
            CSSExtract
         ],
         devtool:isProduction ? 'source-map' : 'inline-source-map',
         devServer: {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true
            // publicPath: 'dist' //server the memory files from this directory
         }
      };
   };

   //loader
