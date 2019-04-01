const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

module.exports = {
	entry: "./src/index.js",
	mode: "production",
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			filename: "demo.html",
			template: "test/demo.html"
		}),
		new HtmlWebpackIncludeAssetsPlugin({
			assets: ["../node_modules/tinymce/tinymce.js"],
			append: false
		}),
		new HtmlWebpackIncludeAssetsPlugin({
			assets: ["../test/demo.js"],
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
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader"
					},
					{
						loader: "less-loader"
					}
				]
			}
		]
	}
};
