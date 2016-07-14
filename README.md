# learn webpack step by step

## 是什么?

新的前端打包工具。
把所有的前端资源当作模块, 都可以使用require来引入,通过不同的插件处理不同类型的文件, 最终生成目标文件。

## 安装

webpack使npm标准包 ,使用如下命令来安装
```
npm install webpack -g
```

## 如何使用

略过命令行添加n个参数的方式,我们通过配置文件来玩起来。
这一点它和grunt, gulp 一样, 我们在项目中新建一个配置文件,文件名如果是webpack.config.js
那么在你执行命令: webpack 的时候就不需要指定配置文件,它会默认找webpack.config.js这个配置文件。但是如果你不想使用这个文件名,
就需要在运行的时候指定配置文件名 webpack -config your_config_file.js




## 编写配置文件

> 使用webpack,初始工作就是编写我们的配置文件

1. entry  入口配置选项
    webpack打包的入口,分为三种情况
    ```
    //字符串: 对应我们只有一个入口文件(常用)
    entry: "index.js"

    //数组: 数组中的文件都会作为入口 但是会把最后一个导出
    entry: ["a.js", "b.js"]

    //3. 对象 多个入口  分析依赖  输出多个目标文件 使用webpack插件可以把共同的部分抽离成单个文件(常用)
    entry: {
        index: './app.js',
        bbb: './bbb.js'
    }
    ```

2. output   输出配置选项
    告诉webpack怎么把编译的结果输出(包括输出的位置和文件名)

    ```
    //输出配置项
        output: {
            path: './dist',//设置文件保存的位置, 如果不设置默认就是当前项目的根目录
            // 保存的文件名, []中可以使用的是webpack打包时候生成的两个变量
            //1. name=》entry中如果配置的是string或者是array 那么 name==main 如果是object 那么就是对应的key
            //2. id 是webpack打包生成的一个数字id
            filename: '[name].bundle.js'
            publicPath:
        }
    ```

3. module

    ```
    module:{
            //这里设置对各种资源进行处理的加载器
            loaders:[
                //对js或者是jsx文件进行jsx编译,然后使用babel将es6语法编译成es5语法
                {
                    test:/.jsx?$/, //匹配什么文件
                    include:[], //必须在什么文件夹下 没有可以不写
                    exclude:/node_moduls/,//不需要进行此loader进行处理的文件夹 (这个选项会提高编译的速度)
                    //使用的编译插件babel-loader (写成babel也可),最新版的babel需要在项目根路径下添加.baberlrc配置文件, 参考网址:https://github.com/babel/babel-loader
                    //两种配置参数的方式
                    // 1. 字符串"babel?presets[]=react,presets[]=es2015"
                    // 2. 设置query选项
                    loader:"babel-loader",
                    query:{
                        presets:['react','es2015']
                    }

                },


            ],
            //设置不用去使用loader去解析的路径 可以提高编译的性能
            //配置项是一个正则 或者是一个 正则数组
            noParse:/src/,
            //再使用loaders进行编译之前进行的预处理
            //常用来进行css,js的检测
            preLoaders:[
                {test: /\.(js|jsx)$/,
                         loader: 'eslint-loader',
                         include: [path.resolve(__dirname, "src/app")],
                         exclude: [nodeModulesPath]}
            ],
            //loaders处理完成之后进行的处理
            postLoaders:[]
        }
    ```


4. resovle 配置项

    我是没整出来 整出来的知道下 ^_^


5. cache 是否缓存

    默认是true

6. watch 开启检测 文件修改之后 就会重新编译

7. devtool debug模式



## 如何使用webpack-dev-server 实现自动刷新

1. iframe模式

> 只需要在之前打开的连接后面加上/webpack-dev-server/<path>
配置文件和命令行都不需要改变

2. inline 模式

> 1) 第一种方式 webpack-dev-server --inline
2) 第二种是在配置文件中修改, 但是并不是添加一个inline:true 的选项
 注意: 没有这个选项, 没有这个选项,没有这个选项
 在entry中新增
 ```
 entry: [
         'webpack/hot/dev-server',
         'webpack-dev-server/client?http://localhost:8080',
         "./src/index.js"

     ],

 plugins:[
    new webpack.HotModuleReplacementPlugin()
 ]

```

## 实现热更新(hot module replace)
1.命令行启动
```
webpack-dev-server --hot --inline
```

2. webpack-dev-server 除了在命令行中启动, 还可以作为express的中间件





