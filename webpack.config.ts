import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const port = 3000;

const config: webpack.Configuration = {
  target: 'node',
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
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(dist)]
};

export default config;
