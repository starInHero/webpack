# webpack

```javascript
webpackConfig.rules = [{
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
```

## url-loader

url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

| Name | Type | Default | Description |
| :---: | :---: | :---: | :---: |
| limit | {number}  | undefined | Byte limit to inline files as Data URL |
|mimeType | {String} | extname | Specify MIME type for the file (Otherwise it's inferred from the file extension) |
| fallback | {String} | file-loader | Specify loader for the file when file is greater than the limit(in bytes)|

----

```javascript
externals: {
    jquery: 'jQuery'
}
```

防止将某些 import 的包打包到 bundle 中，而是在运行时（runtime）再去从外部获取这些*拓展依赖(external dependencies)。*

### String

属性名称是 jquery ，表示应该排除 ``import $ from jquery`` 中的 jquery 模块。为了替换这个模块，jQuery 的值将被用来检索一个全局的 jquery 变量。换句话说，当设置一个字符串时，它将被视为全局的。

----

```json
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
}
```

不希望使用 quiet 或 noInfo 这样的不显示信息，而是有不想得到全部的信息，只是想获取某部分 budle 的信息，使用 stats 选项是比较好的方式。

> 对于 webpack-dev-server，这个属性要放在 devServer 对象里
> 在使用 Node.js API 时，此选项无效。

#### Stats

object string

stats: 'error-only'

| Preset | Alternative | Description |
| :---: | :---: | :---: |
| "error-only" | none | 只在发生错误时输出 |
| "minimal" | none | 只有发生错误或有新的编译时输出 |
| "none" | false | 没有输出 |
| "normal" | true | 标准输出 |
| "verbose" | none | 全部输出 |

对于更精细的控制，下列这些选项可以准确的控制并展示你想要的信息。请注意，此对象中的所有选项都是可选的。

```javascript
module.exports = {
  //...
  stats: {
    // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
    all: undefined,

    // 添加资源信息
    assets: true,

    // 对资源按指定的字段进行排序
    // 你可以使用 `!field` 来反转排序。
    assetsSort: "field",

    // 添加构建日期和构建时间信息
    builtAt: true,

    // 添加缓存（但未构建）模块的信息
    cached: true,

    // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    cachedAssets: true,

    // 添加 children 信息
    children: true,

    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: true,

    // 添加 namedChunkGroups 信息
    chunkGroups: true,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: true,

    // 添加 chunk 和 chunk merge 来源的信息
    chunkOrigins: true,

    // 按指定的字段，对 chunk 进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    chunksSort: "field",

    // 用于缩短 request 的上下文目录
    context: "../src/",

    // `webpack --colors` 等同于
    colors: false,

    // 显示每个模块到入口起点的距离(distance)
    depth: false,

    // 通过对应的 bundle 显示入口起点
    entrypoints: false,

    // 添加 --env information
    env: false,

    // 添加错误信息
    errors: true,

    // 添加错误的详细信息（就像解析日志一样）
    errorDetails: true,

    // 将资源显示在 stats 中的情况排除
    // 这可以通过 String, RegExp, 获取 assetName 的函数来实现
    // 并返回一个布尔值或如下所述的数组。
    excludeAssets: "filter" | /filter/ | (assetName) => true | false |
      ["filter"] | [/filter/] | [(assetName) => true|false],

    // 将模块显示在 stats 中的情况排除
    // 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
    // 并返回一个布尔值或如下所述的数组。
    excludeModules: "filter" | /filter/ | (moduleSource) => true | false |
      ["filter"] | [/filter/] | [(moduleSource) => true|false],

    // 查看 excludeModules
    exclude: "filter" | /filter/ | (moduleSource) => true | false |
          ["filter"] | [/filter/] | [(moduleSource) => true|false],

    // 添加 compilation 的哈希值
    hash: true,

    // 设置要显示的模块的最大数量
    maxModules: 15,

    // 添加构建模块信息
    modules: true,

    // 按指定的字段，对模块进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    modulesSort: "field",

    // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
    moduleTrace: true,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: true,

    // 显示模块的导出
    providedExports: false,

    // 添加 public path 的信息
    publicPath: true,

    // 添加模块被引入的原因
    reasons: true,

    // 添加模块的源码
    source: true,

    // 添加时间信息
    timings: true,

    // 显示哪个模块导出被用到
    usedExports: false,

    // 添加 webpack 版本信息
    version: true,

    // 添加警告
    warnings: true,

    // 过滤警告显示（从 webpack 2.4.0 开始），
    // 可以是 String, Regexp, 一个获取 warning 的函数
    // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
    warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => true|false
  }
}
```

----

##### webpack-concat-plugin

want to concat the static files and inject into html without webpack JSONP code wrapper。

```javascript
const ConcatPlugin = require('webpack-concat-plugin');

new ConcatPlugin({
    ...see options
    // examples
    uglify: false,
    sourceMap: false,
    name: 'result',
    outputPath: 'path/to/output/',
    fileName: '[name].[hash:8].js',
    filesToConcat: ['jquery', './src/lib/**', './dep/dep.js', ['./some/**', '!./some/excludes/**']],
    attributes: {
        async: true
    }
});
```

### Options

#### uglify [boolean | object] default: false

if true the output file will be uglified
or set uglifyjs options to customize the output

#### sourceMap [boolean] default: false

if true,will output sourcemap

#### name[string] default: "result"**

it's useful when you want to inject to html-webpack-plugin manully

**publicPath [string|blooean] default: webpack's publicPath

if set,will be used as the public path of the script tag.
if set to false,will use relativePath.

#### outputPath[string]

if set,will be used as the output directory of the file.

#### fileName [string] default: [name].js

if set,will be used as the output fileName

#### filesToconcat[array] required

supported path patterns:

- normal path
- npm packages
- glob

**injectType["prepend"|"append"|"none"] default: "prepend" **

how to auto inject to html-webpack-plugin(only if html-webpack-plugin set inject option not to be false)

#### attributes[object]

if set,will be used as the extra attributes of the script tag.

----

##### CopyWebpackPlugin

copies individual files or entire diectories to the build directory.

```javascript
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
    }])
```

A pattern looks like: { from: 'source', to: 'dest' }

Or,in the simple case of just a from with default destination,you can use a string primitive instead of an object: 'source'

```javascript
new CopyWebpackPlugin([
            // {output}/file.txt
            { from: 'from/file.txt' },

            // equivalent
            'from/file.txt',

            // {output}/to/file.txt
            { from: 'from/file.txt', to: 'to/file.txt' },

            // {output}/to/directory/file.txt
            { from: 'from/file.txt', to: 'to/directory' },

            // Copy directory contents to {output}/
            { from: 'from/directory' },

            // Copy directory contents to {output}/to/directory/
            { from: 'from/directory', to: 'to/directory' },

            // Copy glob results to /absolute/path/
            { from: 'from/directory/**/*', to: '/absolute/path' },

            // Copy glob results (with dot files) to /absolute/path/
            {
                from: {
                    glob:'from/directory/**/*',
                    dot: true
                },
                to: '/absolute/path'
            },

            // Copy glob results, relative to context
            {
                context: 'from/directory',
                from: '**/*',
                to: '/absolute/path'
            },

            // {output}/file/without/extension
            {
                from: 'path/to/file.txt',
                to: 'file/without/extension',
                toType: 'file'
            },

            // {output}/directory/with/extension.ext/file.txt
            {
                from: 'path/to/file.txt',
                to: 'directory/with/extension.ext',
                toType: 'dir'
            }
        ], {
            ignore: [
                // Doesn't copy any files with a txt extension
                '*.txt',

                // Doesn't copy any file, even if they start with a dot
                '**/*',

                // Doesn't copy any file, except if they start with a dot
                { glob: '**/*', dot: false }
            ],

            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
        })
```

##### toTpe

| Name | Type | Default | Description |
| :---: | :---: | :---: | :---: |
| 'dir' | {string} | undefined | if from is derectory, to has no ectension or ends in '/' |
| 'file' | {string} | undefined | if to has extendsion or from is file |
| 'template' | {string} | undefined | if contains a template pattern |

#### ExtractTextWebpackPlugin

Extract text from a bundle,or bundles,into a separate file.

Usage

> :warning: Since webpack v4 the extract-text-webpack-plugin should not be used for css.Use mini-css-extract-plugin instead.

It moves all the required *.css modules in entry chunks into a seperate CSS file.So your styles are no longer inlined into the JS bundle,but in a separate CSS fil(Styles.css). If your total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle.

| Advantages | Caveats |
| :---: | :---: |
| Fewer style tages(older IE has a limit) | Additional HTTP request |
| CSS SourceMap(with devtool: "source-map" and extract-text-webpack-plugin?sourceMap) | longer compilation time |
| CSS requested in parallel | No runtime public path modifucation |
| CSS cached separate | No Hot Module Replacement | 
| Faster runtime (less code and DOM operations) | ... |

> :warning: ExtractTextPlugin generates a file per entry,so you must use [name], [id] or [contenthash] when using multiple entries.

#### extract

ExtractTextPlugin.extract(options: loader | object)

creates an extracting loader from an existing loader.Supports loaders of type { loader: [name]-loader -> {string}, options: {} -> {object}}.

| Name | Type | Description |
| :--: | :---: | :---: |
| options.use | {String}/{Array}/{Object} | Loader(s) that should be used for converting the resource to a CSS exporting module(required) |
| options.fallback | {String} / {Array} ? {Object} | loader(e.g 'style-loader' ) that should be used when the CSS is not extracted (i.e in an additional chunk when allChunks: false)|
| options.publicPath | { String } | Override the publicPath setting for this loader |

#### url Resolving

if you are finding that urls are not resolving properly when you run webpack. You can expand your loader functionality with options.The url: dalse property allows your poths resolved without any changes.

```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.export = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // if you are having trouble with url not resolving add this setting.
                                url: false,
                                minimize: true,
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
                })
            }
        ]
    }
}
```

#### Modify filename

filename parameter could be Function. It passes getPath to process the format like css/[name].css and returns the real file name, css/js/a.css. You can replace css/js woth css then you will get new path css/a.css.

```javascript
entry: {
    "js/a": "./a",
},
plugins: [
    new ExtractTextPlugin({
        filename: (getpath) => {
            return getPath('css/[name].css').replace('css/js', 'css');
        },
        allChunks: true
    })
]
```

----

```javascript
new webpack.DllReferencePlugin({
    context: path.join(__dirname, '../src'),
    /**
        * 在这里引入 manifest 文件
        */
    manifest: vendorManifest
})
```

[深入浅出的webpack构建工具---DllPlugin DllReferencePlugin提高构建速度(七)](http://www.cnblogs.com/tugenhua0707/p/9520780.html)

[Webpack DllPlugin 和 DllReferencePlugin](https://segmentfault.com/a/1190000009723203#articleHeader0)

DLLPlugin 和 DLLReferencePlugin 插件作用：

在使用 webpack 进行打包的时候，对于依赖的第三方库，比如 vue，vuex等这些不会修改的依赖，我们可以让它和我们自己编写的代码分开打包，这样做的好处是每次更改本地代码文件的时候，webpack 只需要打包自己项目本身的文件代码，而不会再去编译第三方库，那么第三方库第一次打包的时候只打包一次，以后只要不升级第三方包的时候，那么 webpack 就不会对这些库去打包，这样可以快速提高打包的速度。

分离编写的代码，webpack 社区提供了2种方案：

1. CommonsChunkPlugin

    每次打包的时候还是会去处理一些第三方依赖库，只是它能把第三方库文件和我们代码分开掉，生成一个独立的 js 文件。但是他还是不能提高打包的速度。

2. DLLPlugin

    能把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快。

    DLLPlugin 这个插件是在一个额外独立的 webpack 设置中创建一个只有 dll 的 bundle，也就是说我们在项目根目录下除了有 webpack.config.js，还会新建一个 webpack.dll.config.js 文件。 webpack.dll.config.js 作用是把所有的第三方库依赖打包到一个 bundle 的 dll 文件里面，还会生成一个名为 manifest.json 文件。
    该 manifest.json 的作用是用来让 DLLRefrencePlugin 映射到相关的依赖上去的。

3. DllReferencePlugin

    DllReferencePlugin 这个插件是在 webpack.config.js 中使用的，这个插件的作用是把刚刚在 webapck.dll.config.js 中打包生成的 dll 文件引用到需要的预编译的依赖上来。也就是说在 webpack.dll.config.js 中打包后比如会生成 vendor.dll.js 文件和 vendor-manifest.json 文件， wendor.dll.js 文件包含所有的第三方库文件，vendor-manifest.json 文件会包含所有库代码的一个索引，当在使用 webpack.config.js 文件打包 DLLRefencePlugin 插件的时候，会使用该 DLLReferencePlugin 插件读取 vendor-manifest.json 文件，看看是否有该第三方库。vendor-manifest.json 文件就是有一个第三方库的一个映射而已。

----

##### HtmlWebpackPlugin

The HtmlWebpackPlugin simplifies creation of HTML files to Serve your webpack bundles.This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you. supply your own template using lodash templates,or use your own loader.

###### webpack.config.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.export = {
    entry: 'index.js',
    output: {
        path: __dirpath + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
```

This will generate a file dist/index.html containing the following

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

```javascript
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
```

----

##### HtmlWebpackIncludeAssetsPlugin 的作用

```javascript
// 此处是将dll打包出来的包插入到html里
let appendAssertConfig = {
    assets: vendorDir,
    append: false
};
webpackConfig.plugins.push(new HtmlWebpackIncludeAssetsPlugin(appendAssertConfig));
```

##### Option

The available options are:

- jsExtensios: string or array

    Specifies the file extendsion to use to determine if asserts are script assets. Default is ['.js']

- assets: string or array or object
    Asserts that will be putput into your html-webpack-plugin template.
    To specify just one asset, simply pass a string or object. To specify multiple, pass an array of strings or objects.
    If the assert path is static and ends in one of the jsExtensions or cssExtensions values, simply use a string value.
    If the assert is not static or does not have a valid extension, you can instead pass an object with the asset href/src, type is one of js or css, and glob is a wildcard to use to match all files in the path(uses the glob package). The globPath can be used to simcify the directory from which the glob should search for filename matches (the default is to use pat within webpack's output directory).

    The attributes property may be used to add additional attributes to the link pr script element that is injected. The keys of this object are attrubute are attribute names and the values(string or boolean key values are allowed).

    The assetPath property may be used to specify the full path to the included asset. This can be useful as it will trigger a recompilation after the assets have changed when using webpack-dev-server or webpack-dev-middleware in development mode.

- append: boolean

    Specifying whether the assets should be prepended(false)before any existing assets, or appended(true)after them.