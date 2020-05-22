const webpackCommonConfig = require("./webpack.common");
const merge = require('webpack-merge');
const webpack = require("webpack");

const webpackDevConfig = merge(webpackCommonConfig, {
	plugins: [
		new webpack.DefinePlugin({
			"process.env": 'dev'
		})
	]
});
module.exports = webpackDevConfig;