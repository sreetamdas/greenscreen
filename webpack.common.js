const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackRootPlugin = require("html-webpack-root-plugin");

module.exports = {
	entry: "./src/index.tsx",
	// devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts"],
		modules: [
			path.resolve(__dirname, "src"),
			path.resolve(__dirname, "node_modules"),
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			filename: "index.html", //relative to root of the application
		}),
		new HtmlWebpackRootPlugin(),
	],
};
