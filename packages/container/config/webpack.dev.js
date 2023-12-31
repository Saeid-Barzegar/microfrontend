const { merge } = require("webpack-merge"); // to merge two webpack config files
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        authentication: "auth@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js"
      },
      // shared: ['react', 'react-dom'], // static
      shared: packageJson.dependencies, // dynamically gets all dependencies from package.json
    })
  ]
}


module.exports = merge(commonConfig, devConfig)