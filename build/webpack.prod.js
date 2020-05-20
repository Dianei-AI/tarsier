const merge = require("webpack-merge");
const webpackCommonConfig = require("./webpack.common");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(webpackCommonConfig, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new webpack.DefinePlugin({
			"process.env": 'production'
		}),
		new MiniCssExtractPlugin({
			filename: "css/style.css",
			chunkFilename: "[id].css"
		})
	]
});