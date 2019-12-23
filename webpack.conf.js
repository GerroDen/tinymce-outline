const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin  = require("html-webpack-tags-plugin");

module.exports = function(env) {
	env = env || {};
	env.dev_mode = env.hasOwnProperty("dev_mode");
	return {
		entry: "./src/index.js",
		mode: "production",
		plugins: [
			new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				filename: "demo.html",
				template: "test/demo.html"
			}),
			new HtmlWebpackTagsPlugin({
				tags: ["tinymce/tinymce.js"],
				append: false
			}),
			new HtmlWebpackTagsPlugin({
				tags: ["demo.js"],
				append: true
			})
		],
		externals: {
			tinymce: "window.tinymce"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: [
								"@babel/plugin-transform-runtime",
								"@babel/plugin-transform-strict-mode"
							]
						}
					}
				},
				{
					test: /\.less$/,
					use: [
						"css-hot-loader",
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								sourceMap: env.dev_mode
							}
						},
						{
							loader: "less-loader",
							options: {
								sourceMap: env.dev_mode
							}
						}
					]
				}
			]
		},
		devtool: env.dev_mode ? "source-map" : false,
		cache: true
	};
};
