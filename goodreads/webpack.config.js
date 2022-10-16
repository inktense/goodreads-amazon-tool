const path = require('path')
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './index.ts',
    target: "node",
    externals: [nodeExternals()],
    optimization: {
        minimizer: [
         new TerserPlugin()
        ],
      },
    module: {
      // Use `ts-loader` on any file that ends in '.ts'
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: [
            [
            //   path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, '.webpack')
            ]
          ],
        },
      ],
    },
    // Bundle '.ts' files as well as '.js' files.
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
    path: path.join(__dirname, '.webpack'),
    filename: 'index.js'
    }
  };
