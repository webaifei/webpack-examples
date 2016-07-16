var path = require('path');var webpack = require('webpack')var ExtractTextPlugin = require('extract-text-webpack-plugin')console.log(process.env.ENV)console.log(JSON.stringify(process.env.ENV||'dev'))//console.log(process.env.ENV)module.exports = {    //1.字符串    //entry: "./app.js",    //2. 数组    //entry:["./common.js", "./app.js"],    //3. 对象 多个入口 多个入口 分析依赖  输出多个目标文件 使用webpack插件可以把共同的部分抽离成单个文件    entry: [        "./src/index.js"    ],    //输出配置项    output: {        //path: path.resolve((envTag == 'dev' ? './dist' : '../client')),//设置文件保存的位置, 如果不设置默认就是当前项目的根目录        path: path.resolve('./dist'),        // 保存的文件名, []中可以使用的是webpack打包时候生成的两个变量        //1. name=》entry中如果配置的是string或者是array 那么 name==main 如果是object 那么就是对应的key        //2. id 是webpack打包生成的一个数字        filename: '[name].bundle.js',        publicPath: ""    },    module: {        //这里设置对各种资源进行处理的加载器        loaders: [            //对js或者是jsx文件进行jsx编译,然后使用babel将es6语法编译成es5语法            {                test: /.jsx?$/,                exclude: /node_modules/,                loader: "babel-loader?presets[]=react,presets[]=es2015"            },            {                test: /\.scss$/,                loader:  ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")            }        ]        // 设置不去解析的文件件 提高编译性能        // 配置选项是 一个正则 或者是 一个正则数组        //noParse:/src/    },    //    plugins: [        new ExtractTextPlugin('../dist/style.css'),        new webpack.HotModuleReplacementPlugin(),        new webpack.DefinePlugin({            ENV: JSON.stringify(process.env.ENV||'dev'),            'config.debug':true,            'process.env.debug':"dev"        })    ],    // 设置之后 在文件修改之后 会自动编译    // watch:{    //     // 默认300ms    //     aggregateTimeout: 300    // },    //    //debug:true,    // 调试模式    //devtool:'#eval-source-map',    devServer:{        "contentBase":path.resolve('./dist'),        hot: true,        // 这里设置要进行代理的规则 具体需要看下node-http-proxy        proxy:{          "/banner/bannerList*":{            target:"https://s.jdpay.com/",            secure: false,            //可以通过rewrite来重新修改请求            rewrite: function (req){              console.log(req)            },            //通过这个可以自定义返回的数据            bypass: function (req, res, proxyOptions){            }          }        }    }}