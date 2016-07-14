var webpack = require('webpack');
var fs = require('fs');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var complier = webpack(config)
//启动编译文件
complier.run(function (err, stat){
  fs.writeFile('./.log', stat, 'utf-8', function (err){
    if(err){
      console.log( '编译失败！')
    }else{
      console.log(' 编译成功， 详细信息: cat ./.log')
    }
  })
})

// 检测文件 变换了 就再次编译 (初始化的时候会启动一次，所以可以不需要上面的run)
complier.watch({
  aggregateTimeout: 300,//文件变化后多少毫秒再次编译 （对于强制保存）
},function (err, stats){
  fs.writeFile('./.log', stats, 'utf-8', function (err){
    if(err){
      console.log( '编译失败！')
    }else{
      console.log(' 编译成功， 详细信息: cat ./.log')
    }
  })
})
