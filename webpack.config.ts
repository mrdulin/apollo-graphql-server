import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const config: webpack.Configuration = {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: {
    app: src
  },
  output: {
    path: dist,
    filename: '[name].js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(dist)],
  externals: [nodeExternals()]
};

export default config;
