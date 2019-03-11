const path = require('path')
    //这个配置文件其实就是一个js文件，通过node中的模块操作向外暴露了一个配置对象

const htmlwebpackPlugin = require('html-webpack-plugin')
    //导入在内在中生成的html页面插件，只要是插件到一点要放到plugin节点中去
    //功能：在内存中根据指定的页面，生成一份内存中的首页，同时自动把打包好的bundle.js注入到页面底部
const vueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口，表示要使用webpack打包哪个文件
    output: {
        path: path.join(__dirname, './dist'), //指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' //这是指定输出的文件名称
    },
    plugins: [
        new htmlwebpackPlugin({ //创建一个在内存中生成html的插件
            template: path.join(__dirname, './src/index.html'), //指定模版页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' //指定生成的页面名称,最好是同名与模版页面
        }),
        new vueLoaderPlugin()
    ],
    module: { //用于配置所有第三方的加载器
        rules: [ //所有第三方加载器的匹配规则，使用正则方法
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            //配置处理第三方.css文件的第三方loader规则，并以从右到左的方式匹配
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' },
            //通过url-loader处理的图片，会被自动转成base64格式的字符串，如果有不需要自动转换的需要在后面加上参数，使用?和&传递
            //limit给定的值是图片的大小，单位是byte，如果给定的图片大于或等于给定的limit值，则不会被转为base64格式的字符串，为防止重名图片名字会被改变
            //name图片名字，[name].[ext]固定写法，意为原来的，[hash:8] 哈希值
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            //exclude排除匹配的内容，使用正则，用于将高级语法转成低级语法
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
            { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]
    },
    resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
            // "vue$": "vue/dist/vue.js"
        }
    }
}



//使用webpack-dev-server这个工具来实现自动打包编译的功能
//1.运行npm i webpack-dev-server这个工具来实现自动打包编译的功能 -D 把这个工具安装到本地开发依赖
//2.由于是局部安装的工具，没办法直接在powershell终端中使用（只有全局-g安装的工具才可以）
//3.如果想要使用，需要在packge.json文件中进行配置，并且必须局部安装一个webpack