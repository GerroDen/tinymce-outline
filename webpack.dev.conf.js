const common = require("./webpack.conf");
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge.smart(
	common({
		dev_mode: true
	}),
	{
		devServer: {
			contentBase: [
				path.resolve(__dirname, "dist"),
				path.resolve(__dirname, "node_modules"),
				path.resolve(__dirname, "test")
			],
			compress: true,
			port: 9000
		}
	}
);
