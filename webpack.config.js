const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { scss } = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const sassOptions = { sassOptions: { includePaths: ['./theme', './node_modules'] } };

module.exports = {
  mode,
  entry: { bundle: ['./src/main.js'] },
  resolve: {
    alias: { svelte: path.resolve('node_modules', 'svelte') },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true,
            preprocess: require('svelte-preprocess')([scss()])
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          { loader: 'sass-loader', options: sassOptions }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|mp4|svg|ttf)$/,
        use: [{ loader: 'file-loader' }],
      },

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Svelte App'
    }),
  ],
  devtool: prod ? false : 'source-map'
};
