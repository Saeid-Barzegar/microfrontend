const { merge } = require("webpack-merge"); // to merge two webpack config files
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js"
      },
      // shared: ['react', 'react-dom'], // static
      shared: packageJson.dependencies, // dynamically gets all dependencies from package.json
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}


module.exports = merge(commonConfig, devConfig)