const path = require('path');

const ROOT = path.resolve(__dirname, '../');
const ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	mode: ENV || 'production',
	devtool: ENV === 'development' ? 'source-map' : undefined,
	context: ROOT,
	entry: `${ROOT}/src/index.jsx`,
	output: {
		path: `${ROOT}/docs`,
		filename: 'index.js.[contenthash].js',
	},
	resolve: {
		alias: {
			'@': `${ROOT}/src`,
			'common': `${ROOT}/src/views/mainScreen/common`,
			react: 'anujs/dist/ReactIE',
			api: `${ROOT}/src/utils/api`,
			'react-dom': 'anujs/dist/ReactIE',
			reactPropTypes: 'anujs/lib/ReactPropTypes',
			'create-react-class': 'anujs/lib/createClass',
			'@reach/router': `${ROOT}/patchs/Router`,
			redux: `${ROOT}/patchs/redux`,
			rematch: 'anujs/dist/Rematch',
		},
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							loose: true,
							modules: 'commonjs',
						}],
					],
					plugins: [
						['@babel/plugin-proposal-class-properties', {
							loose: true,
						}],
						['@babel/plugin-syntax-dynamic-import'],
					],
				},
			}],
		}, {
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							loose: true,
							modules: 'commonjs',
						}],
						['@babel/preset-react', {
							loose: true,
						}],
					],
					plugins: [
						['@babel/plugin-proposal-class-properties', {
							loose: true,
						}],
						['@babel/plugin-syntax-dynamic-import'],
					],
				},
			}],
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: true,
						localIdentName: '[local]-_-[hash:base64]',
					},
				},
			],
		}, {
			// .sass 解析
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ['style-loader', 'css-loader', 'sass-loader',
				{
					loader: 'sass-resources-loader',
					options: {
						resources: [
							// resolve方法第二个参数为scss配置文件地址，如果有多个，就进行依次添加即可
							path.resolve(__dirname, '../src/assets/css/configuration.scss'),
						],
					}
				}],
		}, {
			// 文件解析
			test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
			include: path.resolve(__dirname, 'src'),
			use: ['file-loader?name=assets/[name].[ext]'],
		},
			{
				// 图片解析
				test: /\.(png|jpg|gif)(\?|$)/,
				// include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: ENV === 'development' ? 20840 : 2084,
							name: 'assets/[name].[ext]'
						}
					}
				],
			},],
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					ie8: true,
				},
			}),
		],
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: ROOT,
			manifest: `${ROOT}/src/base.manifest.json`,
		}),
		new HtmlWebpackPlugin({
			template: `${ROOT}/src/index.html`,
		}),
		new UglifyJsPlugin({	// development
			uglifyOptions: {
				ie8: true,
				compress: false,
				mangle: false,
				output: {
					beautify: true,
				},
			},
		}),
		new CopyWebpackPlugin([{
			context: ROOT,
			from: 'src/static',
			to: 'static',
		}], {}),
	],
	devServer: {	// didn't work on IE8
		contentBase: `${ROOT}/docs`,
	},
};
