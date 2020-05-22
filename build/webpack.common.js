const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
function resolve(dir) {
	return path.resolve(__dirname, '../', dir);
}
module.exports = {
	context: resolve('./'),
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: resolve('lib'),
		publicPath: '/lib/',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': resolve('src')
		}
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					process.env.NODE_ENV === 'production'
						? MiniCssExtractPlugin.loader
						: {
								loader: 'style-loader',
								options: {
									sourceMap: true
								}
						  },
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [
					resolve('nodule_modules')
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				extractComments: true
			})
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new CopyPlugin([
			{ from: 'static/cornerstone/cornerstoneLoaderCodecs.min.js', to: 'cornerstone' },
			{ from: 'static/cornerstone/cornerstoneTools.min.js', to: 'cornerstone' },
			{ from: 'static/cornerstone/cornerstoneWebWorker.min.js', to: 'cornerstone' }
		])
	],
	node: { fs: 'empty' }
};
