const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commongConfig = require("./webpack.common");
const packageJson = require("../package.json");


const productionConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/dashboard/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    })
  ]
}

module.exports = merge(commongConfig, productionConfig);