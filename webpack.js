const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const child = require('child_process');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackExcludeEmptyAssetsPlugin = require('html-webpack-exclude-empty-assets-plugin');
const ConcatPlugin = require('webpack-concat-plugin');
const HappyPack = require('happypack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 判断是否是生产环境
const isProd = process.env.NODE_ENV === 'prod';

const vendorManifestFilePosition = (isProd ?'../static':'../dist') + '/common/static/js/vendor-manifest.json';

try {
	const file = fs.readFileSync(path.join(vendorManifestFilePosition.slice(3)), 'utf8');
	console.log('dev-dll 压缩文件已完成');
	console.log('\r');
}
catch (e) {
	console.log('npm run dev-dll ------- 首先压缩dll');
	console.log('\r');
	try {
		child.execSync('npm run dev-dll');
	}
	catch (e) {
		console.log('npm run dev-dll ------- 失败，练习研发修改编译脚本');
		console.log('\r');
		console.log(e);
		process.exit(1);
	}
}

// 拿到写好的配置数据
const config = require('./config');
let entryConfig = {};

//单独构建某一个entry
console.log(process.env.WATCH_MODULE)
if(process.env.WATCH_MODULE){
	entryConfig = {
	    [process.env.WATCH_MODULE]:path.join(__dirname, config.entry[process.env.WATCH_MODULE])
	};
}else{
	// 此处处理entry的相对路径
	Object.keys(config.entry).map((key) => {
		entryConfig[key] = path.join(__dirname, config.entry[key]);
	});
}


const vendorManifest = require(vendorManifestFilePosition);


if (isProd) {
	console.log('=================当前模式是生产模式===================');
	console.log('\r');
} else {
	console.log('=================当前模式是开发模式===================');
	console.log('\r');
}

let webpackConfig = {
	entry: entryConfig,
	output: {
		path: path.resolve(__dirname, (isProd ?'../static':'../dist')),
		filename: '[name].js',
		publicPath: isProd?'https://www.lgstatic.com/pipline/static/':'/',
		chunkFilename:'lazy-components/[name].js'
	},
	watch: false,
	devtool: false,
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: ['happypack/loader?id=jsx'],
			exclude: /(node_modules|bower_components)/,
		}, {
			test: /\.(less|css)$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader", "less-loader"]
			})
		}, {
			test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 20,
					name: '[path][name].[ext]',
					context: 'src/'
				}
			}]
		}]
	},
	externals: {
		'pdfjs': 'PDFJS',
	},
	stats: {
		// minimal logging
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false,
		children: false
	},
	resolve: {
		extensions: ['.js', '.jsx', '.less']
	},
	plugins: [
		new webpack.ProvidePlugin({
		   'window.lgSa': path.join(__dirname, '../src/common/static/js/lgSaTrack.js'),
			lgSa: path.join(__dirname, '../src/common/static/js/lgSaTrack.js'),
			'window.lgjQuery': 'jquery'
		}),
		new ConcatPlugin({
			uglify: true,
			sourceMap: false,
			name: 'result',
			outputPath: 'common/static/js',
			fileName: 'global.js',
			filesToConcat: [
				path.join(__dirname, '../src/common/static/js/analytics.js'),
				path.join(__dirname, '../src/common/static/js/healthCheck.js'),
				path.join(__dirname, '../src/common/static/js/plat_tj.js')
			],
			attributes: {
				async: true
			}
		}),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, '../src/common/static/js/jquery.min.js'),
			to: path.join(__dirname, (isProd ?'../static':'../dist') + '/common/static/js/jquery.min.js')
		},{
			from: path.join(__dirname, '../src/common/static/js/pdfjs/'),
			to: path.join(__dirname, (isProd ?'../static':'../dist') + '/common/static/js/pdfjs/')
        },{
            from: path.join(__dirname, '../src/common/static/js/es6-promise.min.js'),
            to: path.join(__dirname, (isProd ?'../static':'../dist') + '/common/static/js/es6-promise.min.js')
		},{
			from: path.join(__dirname, '../src/common/static/js/At.js/'),
			to: path.join(__dirname, (isProd ?'../static':'../dist') + '/common/static/js/At.js/')
		},{
			from: path.join(__dirname, '../src/common/static/js/Caret.js/'),
			to: path.join(__dirname, (isProd ?'../static':'../dist') + '/common/static/js/Caret.js/')
		},{
			from: path.join(__dirname, '../src/common/static/js/datetimepicker/'),
			to: path.join(__dirname, (isProd ?'../static':'../dist') + '/common/static/js/datetimepicker/')
		}]),
		new ExtractTextPlugin("[name].css"),
		new webpack.DllReferencePlugin({
			context: path.join(__dirname, '../src'),
			/**
			 * 在这里引入 manifest 文件
			 */
			manifest: vendorManifest
		}),
		new HappyPack({
			// 用 id 标识 happypack 处理那一类文件
			id: 'jsx',
			threads: 4,
			loaders: [{
				// 'babel-loader?presets[]=env,presets[]=react,presets[]=stage-0'
				loader: 'babel-loader',
				options: {
					// presets: ['env', 'react', 'stage-0', {
					// 	modules: false
					// }]
					presets: [
						['env', {
							"modules": false,
							"loose": true
						}],
						"stage-0"
					],
					plugins: [
                        "transform-decorators-legacy",
                        "transform-object-rest-spread",
						"transform-class-properties",
						// "plugin-transform-runtime"
                    ]
				}
			}]
		})
	]
};

// 拿到配置里的common
let vendorDir = [
	'common/static/js/' + vendorManifest.name + '.js'
];
let a = false;
Object.keys(entryConfig).map((key) => {
	let htmlPath = path.join(__dirname, `../src/${key}`);

	let htmlWebpackConfig = {
		title: key,
		filename: key + '.html',
		template: path.join(__dirname, '../layout/base.js'),
		templateParameters: {
			html: htmlPath,
			baseDir: path.join(__dirname, '..')
		},
		chunks: key !== 'candidate-detail-share/page/main'?['instantMessaging/page/main', key]:[key],
		inject: 'body',
		hash: false,
		alwaysWriteToDisk: true,
		favicon: path.resolve(__dirname, '../src/common/static/favicon.ico')
	};
	// 此处是将dll打包出来的包插入到html里
	let appendAssertConfig = {
		assets: vendorDir,
		append: false
	};

	webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlWebpackConfig));
	// 此处是将dll打包出来的包插入到html里
	webpackConfig.plugins.push(new HtmlWebpackIncludeAssetsPlugin(appendAssertConfig));

});

webpackConfig.plugins.push(new HtmlWebpackExcludeEmptyAssetsPlugin());
webpackConfig.plugins.push(new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify('production')
}));
if(isProd){
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({           //清除打包后文件中的注释,和copyright信息
		output: {
			comments: false,
		},
		compress: {
			warnings: false
		}
	}));
}

webpackConfig.plugins.push(new HtmlWebpackHarddiskPlugin({
	outputPath: path.join(__dirname, (isProd ?'../template':'../dist'))
}));
module.exports = webpackConfig;
